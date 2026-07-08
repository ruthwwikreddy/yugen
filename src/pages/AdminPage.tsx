import { useCallback, useEffect, useMemo, useState } from 'react'
import { SEO } from '../components/yugen/SEO'
import { AdminLayout, type AdminNav } from '../components/admin/AdminLayout'
import { AdminLogin } from '../components/admin/AdminLogin'
import { ToastProvider, useToast } from '../components/admin/Toast'
import { ConfirmDialog } from '../components/admin/ConfirmDialog'
import { RegistrationFormModal } from '../components/admin/RegistrationFormModal'
import { AllocationModal } from '../components/admin/AllocationModal'
import { isAdminAuthed, setAdminAuthed } from '../lib/admin-utils'
import { DashboardOverview } from '../components/admin/DashboardOverview'
import { RegistrationsPanel } from '../components/admin/RegistrationsPanel'
import { RegistrationDetailPanel } from '../components/admin/RegistrationDetailPanel'
import { AllocationsPanel } from '../components/admin/AllocationsPanel'
import { RevenuePanel } from '../components/admin/RevenuePanel'
import { AdminSettingsPanel } from '../components/admin/AdminSettingsPanel'
import { computeStats, exportAllocationsCsv, exportRegistrationsCsv } from '../lib/admin-utils'
import {
  acceptPayment,
  allocateCommittee,
  createRegistration,
  deallocateDelegate,
  deleteRegistration,
  listRegistrations,
  rejectPayment,
  updateRegistration,
  updateRegistrationStatus,
  waitlistDelegate,
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
  const [allocationModal, setAllocationModal] = useState<Registration | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
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
        const result = await createRegistration('delegate-r1-early-bird', data)
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

  async function handleAllocate(id: string, committee: string, country?: string, notes?: string) {
    await allocateCommittee(id, committee, country, notes)
    patchLocal(id, { allocationStatus: 'allocated' as const, allocatedCommittee: committee, allocatedCountry: country, allocationNotes: notes })
    toast(`Allocated to ${committee}`, 'success')
  }

  async function handleWaitlist(id: string, notes?: string) {
    await waitlistDelegate(id, notes)
    patchLocal(id, { allocationStatus: 'waitlisted' as const, allocatedCommittee: undefined, allocatedCountry: undefined, allocationNotes: notes })
    toast('Added to waitlist', 'info')
  }

  async function handleDeallocate(id: string) {
    await deallocateDelegate(id)
    patchLocal(id, { allocationStatus: 'unallocated' as const, allocatedCommittee: undefined, allocatedCountry: undefined, allocationNotes: undefined })
    toast('Allocation removed', 'success')
  }

  function handleSelectId(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function handleSelectAll(filteredIds?: string[]) {
    const ids = filteredIds ?? registrations.filter((r) => r.status === 'verified').map((r) => r.id)
    if (ids.length === 0) {
      setSelectedIds([])
      return
    }
    setSelectedIds((prev) =>
      ids.every((id) => prev.includes(id)) ? [] : ids
    )
  }

  function handleSignOut() {
    setAdminAuthed(false)
    setAuthed(false)
    setSelected(null)
  }

  const isInitialLoad = loading && registrations.length === 0

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
        stats={stats}
      >
        {!firebaseEnabled && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-sm text-muted">
            Firebase not configured — using local storage. Add <code className="text-yugen-white">VITE_FIREBASE_*</code> env variables.
          </div>
        )}

        {loadError && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-200">{loadError}</div>
        )}

        {isInitialLoad && !loadError && (
          <div className="admin-loading flex flex-col items-center justify-center gap-4 py-24">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-yugen border-t-yugen-white" />
            <p className="text-sm text-dim">Loading dashboard…</p>
          </div>
        )}

        {!isInitialLoad && activeNav === 'overview' && (
          <DashboardOverview
            stats={stats}
            onSelectRegistration={setSelected}
            onGoToRegistrations={() => setActiveNav('registrations')}
            onGoToAllocations={() => setActiveNav('allocations')}
            onGoToRevenue={() => setActiveNav('revenue')}
            onAcceptPayment={handleAccept}
            onRejectPayment={handleReject}
          />
        )}

        {!isInitialLoad && activeNav === 'registrations' && (
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

        {!isInitialLoad && activeNav === 'allocations' && (
          <AllocationsPanel
            registrations={registrations.filter((r) => r.status === 'verified')}
            onSelect={setSelected}
            onAllocate={(id) => {
              const reg = registrations.find((r) => r.id === id)
              if (reg) setAllocationModal(reg)
            }}
            selectedIds={selectedIds}
            onSelectId={handleSelectId}
            onSelectAll={(filteredIds) => handleSelectAll(filteredIds)}
            onExport={() => {
              exportAllocationsCsv(registrations.filter((r) => r.status === 'verified'))
              toast('Allocations CSV exported', 'success')
            }}
          />
        )}

        {!isInitialLoad && activeNav === 'revenue' && (
          <RevenuePanel
            registrations={registrations}
            onExport={() => {
              exportRegistrationsCsv(registrations)
              toast('CSV exported', 'success')
            }}
          />
        )}

        {!isInitialLoad && activeNav === 'settings' && <AdminSettingsPanel />}
      </AdminLayout>

      <RegistrationDetailPanel
        registration={selected}
        onClose={() => setSelected(null)}
        onEdit={(r) => setFormModal({ mode: 'edit', reg: r })}
        onAccept={handleAccept}
        onReject={handleReject}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onAllocate={() => selected && setAllocationModal(selected)}
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

      {allocationModal && (
        <AllocationModal
          registration={allocationModal}
          onClose={() => setAllocationModal(null)}
          onAllocate={(committee, country, notes) => handleAllocate(allocationModal.id, committee, country, notes)}
          onWaitlist={(notes) => handleWaitlist(allocationModal.id, notes)}
          onDeallocate={() => handleDeallocate(allocationModal.id)}
          onEmailCopied={(format) => toast(`${format === 'html' ? 'HTML' : 'Plain text'} copied to clipboard`, 'success')}
        />
      )}
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
