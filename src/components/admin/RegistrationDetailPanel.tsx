import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildUpiPaymentNote, buildUpiUri, formatRegistrationIdDisplay, type Registration, type RegistrationStatus } from '../../lib/registration'
import { formatInr, formatTimestamp } from '../../lib/admin-utils'
import { formatCommitteePreferencesDisplay } from '../../lib/allocation-utils'
import { getCommittees } from '../../lib/yugen'
import { AdminAtmosphere, AdminStatusBadge } from './admin-ui'

type RegistrationDetailPanelProps = {
  registration: Registration | null
  onClose: () => void
  onEdit: (r: Registration) => void
  onAccept: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: RegistrationStatus) => void
  onAllocate?: () => void
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-yugen py-3 text-sm last:border-0">
      <span className="shrink-0 text-dim">{label}</span>
      <span className="text-right text-yugen-white">{value || '—'}</span>
    </div>
  )
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) {
    return (
      <div className="border-b border-yugen py-3 text-sm last:border-0">
        <span className="text-dim">{label}</span>
        <p className="mt-1 text-yugen-white">—</p>
      </div>
    )
  }
  return (
    <div className="border-b border-yugen py-3 text-sm last:border-0">
      <span className="text-dim">{label}</span>
      <p className="mt-1 whitespace-pre-wrap text-yugen-white">{value}</p>
    </div>
  )
}

export function RegistrationDetailPanel({
  registration,
  onClose,
  onEdit,
  onAccept,
  onReject,
  onDelete,
  onStatusChange,
  onAllocate,
}: RegistrationDetailPanelProps) {
  const [copied, setCopied] = useState<string | null>(null)

  async function copy(text: string, key: string) {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <AnimatePresence>
      {registration && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-yugen bg-surface shadow-2xl"
          >
            <div className="relative overflow-hidden border-b border-yugen px-5 py-4">
              <AdminAtmosphere className="opacity-40" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="label-caps">Registration detail</p>
                  <p className="mt-1 font-mono text-lg">{registration.id}</p>
                </div>
                <button type="button" onClick={onClose} className="btn-ghost px-3 py-1 text-xs">
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4">
                <AdminStatusBadge status={registration.status} />
              </div>

              {registration.status === 'paid' && (
                <div className="mb-4 flex gap-2">
                  <button type="button" onClick={() => onAccept(registration.id)} className="btn-primary flex-1 text-[10px]">
                    Accept payment
                  </button>
                  <button
                    type="button"
                    onClick={() => onReject(registration.id)}
                    className="flex-1 rounded-full border border-red-500/50 px-3 py-2 text-[10px] uppercase tracking-wider text-red-300"
                  >
                    Reject
                  </button>
                </div>
              )}

              <div className="rounded-2xl border border-yugen bg-surface-raised p-4">
                <p className="label-caps">Delegate</p>
                <p className="mt-2 font-heading text-xl font-semibold">{registration.name}</p>
                <p className="mt-1 text-sm text-muted">{registration.school} · Grade {registration.grade}</p>
              </div>

              {registration.status === 'verified' && (
                <div className="mt-4 rounded-2xl border border-yugen bg-yugen-black p-4">
                  <p className="label-caps">Allocation</p>
                  <p className="mt-2 text-sm capitalize text-yugen-white">{registration.allocationStatus}</p>
                  {registration.allocatedCommittee && (
                    <p className="mt-1 text-sm text-muted">{registration.allocatedCommittee}{registration.allocatedCountry ? ` · ${registration.allocatedCountry}` : ''}</p>
                  )}
                  {onAllocate && (
                    <button type="button" onClick={onAllocate} className="btn-primary mt-4 w-full text-[10px]">
                      {registration.allocationStatus === 'allocated' ? 'Manage allocation' : 'Allocate committee'}
                    </button>
                  )}
                </div>
              )}

              <div className="mt-4 rounded-2xl border border-yugen bg-yugen-black p-4">
                <p className="label-caps">UPI payment note</p>
                <p className="mt-2 font-mono text-sm font-semibold">{buildUpiPaymentNote(registration.id)}</p>
                <p className="mt-1 text-xs text-dim">Full ID: {formatRegistrationIdDisplay(registration.id)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={() => copy(buildUpiPaymentNote(registration.id), 'note')} className="btn-ghost text-[10px]">
                    {copied === 'note' ? 'Copied' : 'Copy note'}
                  </button>
                  <button type="button" onClick={() => copy(registration.id, 'id')} className="btn-ghost text-[10px]">
                    {copied === 'id' ? 'Copied' : 'Copy ID'}
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <DetailRow label="Email" value={registration.email} />
                <DetailRow label="Phone" value={registration.phone} />
                <DetailRow label="Experience level" value={registration.experience} />
                <DetailRow
                  label="Committee prefs."
                  value={formatCommitteePreferencesDisplay(registration, getCommittees())}
                />
                <DetailBlock label="MUN experience" value={registration.experienceDetails} />
                <DetailBlock label="Awards & achievements" value={registration.awardsAndAchievements} />
                <DetailRow label="Country preference" value={registration.countryPreference} />
                <DetailRow label="Portfolio preference" value={registration.portfolioPreference} />
                <DetailRow label="Portfolio link" value={registration.portfolioUrl} />
                <DetailRow label="Dietary / notes" value={registration.dietaryNotes} />
                <DetailRow label="Admin notes" value={registration.adminNotes} />
                <DetailRow label="Amount" value={formatInr(registration.amount)} />
                <DetailRow label="Registered" value={formatTimestamp(registration.createdAt)} />
                <DetailRow label="Paid at" value={formatTimestamp(registration.paidAt)} />
              </div>

              <div className="mt-4">
                <label className="label-caps mb-2 block">Change status</label>
                <select
                  value={registration.status}
                  onChange={(e) => onStatusChange(registration.id, e.target.value as RegistrationStatus)}
                  className="input-field"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Awaiting verify</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <a href={`mailto:${registration.email}`} className="btn-ghost text-center text-xs">Email</a>
                <a href={`https://wa.me/${registration.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-ghost text-center text-xs">
                  WhatsApp
                </a>
                <button type="button" onClick={() => onEdit(registration)} className="btn-ghost text-xs">Edit</button>
                <button type="button" onClick={() => onDelete(registration.id)} className="btn-danger text-xs">
                  Delete
                </button>
              </div>
            </div>

            <div className="safe-bottom border-t border-yugen p-4 text-[10px] text-dim">
              UPI: {buildUpiUri(registration.id).slice(0, 48)}…
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
