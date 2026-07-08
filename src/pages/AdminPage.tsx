import { useCallback, useEffect, useMemo, useState } from 'react'
import { SEO } from '../components/yugen/SEO'
import { AdminLayout, type AdminNav } from '../components/admin/AdminLayout'
import { AdminLogin } from '../components/admin/AdminLogin'
import { ToastProvider, useToast } from '../components/admin/Toast'
import { ConfirmDialog } from '../components/admin/ConfirmDialog'
import { RegistrationFormModal } from '../components/admin/RegistrationFormModal'
import { isAdminAuthed, setAdminAuthed } from '../lib/admin-utils'
import { DashboardOverview } from '../components/admin/DashboardOverview'
import { RegistrationsPanel } from '../components/admin/RegistrationsPanel'
import { RegistrationDetailPanel } from '../components/admin/RegistrationDetailPanel'
import { computeStats, exportRegistrationsCsv } from '../lib/admin-utils'
import {
  acceptPayment,
  createRegistration,
  deleteRegistration,
  listRegistrations,
  rejectPayment,
  updateRegistration,
  updateRegistrationStatus,
  type Registration,
  type RegistrationInput,
  type RegistrationStatus,
} from '../lib/registration'
import { firebaseEnabled } from '../lib/firebase'

type ConfirmState = {
  title: string
  message: string
  destructive?: boolean
  action: () => Promise<void>
}

function AdminPageContent() {
  const { toast } = useToast()
  const [authed, setAuthed] = useState(isAdminAuthed)
  const [activeNav, setActiveNav] = useState<AdminNav>('overview')
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [selected, setSelected] = useState<Registration | null>(null)
  const [formModal, setFormModal] = useState<{ mode: 'add' | 'edit'; reg?: Registration } | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)
    setLoadError('')
    try {
      const data = await listRegistrations()
      setRegistrations(data)
      setSelected((prev) => (prev ? data.find((r) => r.id === prev.id) ?? null : null))
    } catch {
      setLoadError('Could not load registrations. Check Firestore rules and connection.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed) loadData()
  }, [authed, loadData])

  const stats = useMemo(() => computeStats(registrations), [registrations])

  function patchLocal(id: string, patch: Partial<Registration>) {
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
    setSelected((prev) => (prev?.id === id ? { ...prev, ...patch } : prev))
  }

  function removeLocal(id: string) {
    setRegistrations((prev) => prev.filter((r) => r.id !== id))
    setSelected((prev) => (prev?.id === id ? null : prev))
  }

  async function handleStatusChange(id: string, status: RegistrationStatus) {
    await updateRegistrationStatus(id, status)
    patchLocal(id, { status })
    toast(`Status updated to ${status}`, 'success')
  }

  async function handleAccept(id: string) {
    await acceptPayment(id)
    patchLocal(id, { status: 'verified' })
    toast('Payment accepted — registration verified', 'success')
  }

  async function handleReject(id: string) {
    await rejectPayment(id)
    patchLocal(id, { status: 'rejected' })
    toast('Payment rejected', 'info')
  }

  function askConfirm(state: ConfirmState) {
    setConfirm(state)
  }

  async function runConfirm() {
    if (!confirm) return
    setConfirmLoading(true)
    try {
      await confirm.action()
    } catch {
      toast('Action failed', 'error')
    } finally {
      setConfirmLoading(false)
      setConfirm(null)
    }
  }

  function handleDelete(id: string) {
    const reg = registrations.find((r) => r.id === id)
    askConfirm({
      title: 'Delete registration',
      message: `Permanently delete ${reg?.name ?? id}? This cannot be undone.`,
      destructive: true,
      action: async () => {
        await deleteRegistration(id)
        removeLocal(id)
        toast('Registration deleted', 'success')
      },
    })
  }

  function handleBulkAccept(ids: string[]) {
    askConfirm({
      title: 'Verify payments',
      message: `Accept and verify ${ids.length} registration(s)?`,
      action: async () => {
        for (const id of ids) await acceptPayment(id)
        setRegistrations((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, status: 'verified' as const } : r)))
        toast(`${ids.length} registration(s) verified`, 'success')
      },
    })
  }

  function handleBulkReject(ids: string[]) {
    askConfirm({
      title: 'Reject payments',
      message: `Reject ${ids.length} registration(s)?`,
      destructive: true,
      action: async () => {
        for (const id of ids) await rejectPayment(id)
        setRegistrations((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, status: 'rejected' as const } : r)))
        toast(`${ids.length} registration(s) rejected`, 'info')
      },
    })
  }

  function handleBulkDelete(ids: string[]) {
    askConfirm({
      title: 'Delete registrations',
      message: `Permanently delete ${ids.length} registration(s)? This cannot be undone.`,
      destructive: true,
      action: async () => {
        for (const id of ids) await deleteRegistration(id)
        setRegistrations((prev) => prev.filter((r) => !ids.includes(r.id)))
        setSelected(null)
        toast(`${ids.length} registration(s) deleted`, 'success')
      },
    })
  }

  async function handleFormSubmit(data: RegistrationInput & { adminNotes?: string }) {
    setFormLoading(true)
    try {
      if (formModal?.mode === 'add') {
        const result = await createRegistration(data)
        setRegistrations((prev) => [result.registration, ...prev])
        toast(`Created ${result.id}`, 'success')
        if (result.warning) toast(result.warning, 'info')
      } else if (formModal?.reg) {
        await updateRegistration(formModal.reg.id, data)
        patchLocal(formModal.reg.id, { ...data, adminNotes: data.adminNotes ?? '' })
        toast('Registration updated', 'success')
      }
      setFormModal(null)
    } catch {
      toast('Could not save registration', 'error')
    } finally {
      setFormLoading(false)
    }
  }

  function handleSignOut() {
    setAdminAuthed(false)
    setAuthed(false)
    setSelected(null)
  }

  if (!authed) {
    return (
      <>
        <SEO title="Admin | Yūgen Summit" description="Registration admin" path="/admin" />
        <AdminLogin onSuccess={() => setAuthed(true)} />
      </>
    )
  }

  return (
    <>
      <SEO title="Admin | Yūgen Summit" description="Registration admin" path="/admin" />
      <AdminLayout
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onSignOut={handleSignOut}
        onRefresh={loadData}
        onAdd={() => setFormModal({ mode: 'add' })}
        refreshing={loading}
      >
        {!firebaseEnabled && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-sm text-muted">
            Firebase not configured — using local storage. Add <code className="text-yugen-white">VITE_FIREBASE_*</code> env variables.
          </div>
        )}

        {loadError && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-200">{loadError}</div>
        )}

        {loading && registrations.length === 0 && !loadError && (
          <div className="flex items-center gap-3 text-sm text-dim">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-yugen border-t-yugen-white" />
            Loading dashboard…
          </div>
        )}

        {activeNav === 'overview' && (
          <DashboardOverview
            stats={stats}
            onSelectRegistration={setSelected}
            onGoToRegistrations={() => setActiveNav('registrations')}
            onAcceptPayment={handleAccept}
            onRejectPayment={handleReject}
          />
        )}

        {activeNav === 'registrations' && (
          <RegistrationsPanel
            registrations={registrations}
            onSelect={setSelected}
            onEdit={(r) => setFormModal({ mode: 'edit', reg: r })}
            onAccept={handleAccept}
            onReject={handleReject}
            onDelete={handleDelete}
            onBulkAccept={handleBulkAccept}
            onBulkReject={handleBulkReject}
            onBulkDelete={handleBulkDelete}
            onExport={() => {
              exportRegistrationsCsv(registrations)
              toast('CSV exported', 'success')
            }}
            onAdd={() => setFormModal({ mode: 'add' })}
          />
        )}
      </AdminLayout>

      <RegistrationDetailPanel
        registration={selected}
        onClose={() => setSelected(null)}
        onEdit={(r) => setFormModal({ mode: 'edit', reg: r })}
        onAccept={handleAccept}
        onReject={handleReject}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <RegistrationFormModal
        open={formModal !== null}
        mode={formModal?.mode ?? 'add'}
        initial={formModal?.reg}
        loading={formLoading}
        onClose={() => setFormModal(null)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={confirm !== null}
        title={confirm?.title ?? ''}
        message={confirm?.message ?? ''}
        destructive={confirm?.destructive}
        loading={confirmLoading}
        onConfirm={runConfirm}
        onCancel={() => setConfirm(null)}
      />
    </>
  )
}

export function AdminPage() {
  return (
    <ToastProvider>
      <AdminPageContent />
    </ToastProvider>
  )
}
