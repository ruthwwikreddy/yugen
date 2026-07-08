import { useState } from 'react'
import { motion } from 'framer-motion'
import { buildUpiUri } from '../../lib/registration'
import { formatInr, formatTimestamp, STATUS_COLORS, STATUS_LABELS } from '../../lib/admin-utils'
import type { Registration, RegistrationStatus } from '../../lib/registration'

type RegistrationDetailPanelProps = {
  registration: Registration | null
  onClose: () => void
  onEdit: (r: Registration) => void
  onAccept: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: RegistrationStatus) => void
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-yugen py-3 text-sm last:border-0">
      <span className="shrink-0 text-dim">{label}</span>
      <span className="text-right text-yugen-white">{value || '—'}</span>
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
}: RegistrationDetailPanelProps) {
  const [copied, setCopied] = useState<string | null>(null)

  if (!registration) return null

  const r = registration
  const upiNote = `Yugen6 ${r.id}`

  async function copy(text: string, key: string) {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-yugen bg-surface shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-yugen px-5 py-4">
          <div>
            <p className="label-caps">Registration detail</p>
            <p className="mt-1 font-mono text-lg">{r.id}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg border border-yugen px-2 py-1 text-xs text-muted hover:text-yugen-white">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="mb-4">
            <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider ${STATUS_COLORS[r.status]}`}>
              {STATUS_LABELS[r.status]}
            </span>
          </div>

          {(r.status === 'paid' || r.status === 'pending') && (
            <div className="mb-4 flex gap-2">
              {r.status === 'paid' && (
                <>
                  <button type="button" onClick={() => onAccept(r.id)} className="btn-primary flex-1 text-[10px]">
                    Accept payment
                  </button>
                  <button
                    type="button"
                    onClick={() => onReject(r.id)}
                    className="flex-1 rounded-full border border-red-500/50 px-3 py-2 text-[10px] uppercase tracking-wider text-red-300"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          )}

          <div className="rounded-xl border border-yugen bg-surface-raised p-4">
            <p className="label-caps">Delegate</p>
            <p className="mt-2 font-heading text-xl font-semibold">{r.name}</p>
            <p className="mt-1 text-sm text-muted">{r.school} · Grade {r.grade}</p>
          </div>

          <div className="mt-4 rounded-xl border border-yugen bg-yugen-black p-4">
            <p className="label-caps">UPI payment note</p>
            <p className="mt-2 font-mono text-sm">{upiNote}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => copy(upiNote, 'note')} className="btn-ghost text-[10px]">
                {copied === 'note' ? 'Copied' : 'Copy note'}
              </button>
              <button type="button" onClick={() => copy(r.id, 'id')} className="btn-ghost text-[10px]">
                {copied === 'id' ? 'Copied' : 'Copy ID'}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <DetailRow label="Email" value={r.email} />
            <DetailRow label="Phone" value={r.phone} />
            <DetailRow label="Experience" value={r.experience} />
            <DetailRow label="Committee pref." value={r.committeePreference} />
            <DetailRow label="Dietary / notes" value={r.dietaryNotes} />
            <DetailRow label="Admin notes" value={r.adminNotes} />
            <DetailRow label="Amount" value={formatInr(r.amount)} />
            <DetailRow label="Registered" value={formatTimestamp(r.createdAt)} />
            <DetailRow label="Paid at" value={formatTimestamp(r.paidAt)} />
          </div>

          <div className="mt-4">
            <label className="label-caps mb-2 block">Change status</label>
            <select
              value={r.status}
              onChange={(e) => onStatusChange(r.id, e.target.value as RegistrationStatus)}
              className="w-full rounded-lg border border-yugen bg-yugen-black px-3 py-2 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="paid">Awaiting verify</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <a href={`mailto:${r.email}`} className="btn-ghost text-center text-xs">Email</a>
            <a href={`https://wa.me/${r.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-ghost text-center text-xs">
              WhatsApp
            </a>
            <button type="button" onClick={() => onEdit(r)} className="btn-ghost text-xs">Edit</button>
            <button type="button" onClick={() => onDelete(r.id)} className="rounded-full border border-red-500/40 px-3 py-2 text-[10px] uppercase text-red-300">
              Delete
            </button>
          </div>
        </div>

        <div className="border-t border-yugen p-4 text-[10px] text-dim">
          UPI: {buildUpiUri(r.id).slice(0, 48)}…
        </div>
      </motion.aside>
    </>
  )
}
