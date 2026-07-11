import { useState } from 'react'
import { getAllocatableCommittees } from '../../lib/yugen'
import type { Registration } from '../../lib/registration'
import { MUN_COUNTRIES, POPULAR_COUNTRIES } from '../../lib/mun-countries'
import { SearchSelect } from '../yugen/SearchSelect'
import { AllocationEmailPreview } from './AllocationEmailPreview'

type AllocationModalProps = {
  registration: Registration
  onClose: () => void
  onAllocate: (committee: string, country?: string, notes?: string) => void
  onWaitlist: (notes?: string) => void
  onDeallocate: () => void
  onEmailCopied?: (format: 'plain' | 'html') => void
}

export function AllocationModal({
  registration,
  onClose,
  onAllocate,
  onWaitlist,
  onDeallocate,
  onEmailCopied,
}: AllocationModalProps) {
  const [committee, setCommittee] = useState(registration.allocatedCommittee || '')
  const [country, setCountry] = useState(registration.allocatedCountry || '')
  const [notes, setNotes] = useState(registration.allocationNotes || '')
  const [waitlistNotes, setWaitlistNotes] = useState('')
  const [mode, setMode] = useState<'allocate' | 'waitlist' | 'deallocate' | 'email'>('allocate')
  const [loading, setLoading] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  const committees = getAllocatableCommittees().map((c) => ({
    id: c.id,
    name: c.name,
    acronym: c.acronym,
    type: c.type,
  }))

  const emailData = {
    delegateName: registration.name,
    delegateEmail: registration.email,
    committee,
    country: country || undefined,
    notes: notes || undefined,
    registrationId: registration.id,
    school: registration.school,
  }

  async function handleAllocate() {
    setLoading(true)
    try {
      await onAllocate(committee, country || undefined, notes || undefined)
      setJustSaved(true)
      setMode('email')
    } finally {
      setLoading(false)
    }
  }

  async function handleWaitlist() {
    setLoading(true)
    try {
      await onWaitlist(waitlistNotes || undefined)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  async function handleDeallocate() {
    setLoading(true)
    try {
      await onDeallocate()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 sm:items-center sm:p-4">
      <div className="flex max-h-[95dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-yugen bg-surface-raised sm:rounded-2xl">
        <div className="relative shrink-0 overflow-hidden border-b border-yugen px-6 py-5">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="hero-grid absolute inset-0 opacity-50" />
            <div className="hero-vignette absolute inset-0" />
          </div>
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="label-caps">Delegate allocation</p>
              <h2 className="mt-1 font-heading text-xl font-bold">Committee Allocation</h2>
              <p className="mt-1 text-sm text-dim">{registration.name} · {registration.id}</p>
            </div>
            <button type="button" onClick={onClose} className="btn-ghost shrink-0 px-3 py-1">
              ✕
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <div className="grid gap-3 rounded-xl border border-yugen bg-surface p-4 sm:grid-cols-2">
            <InfoRow label="Delegate" value={registration.name} />
            <InfoRow label="Email" value={registration.email} />
            <InfoRow label="School" value={registration.school} />
            <InfoRow
              label="Status"
              value={registration.allocationStatus}
              accent={
                registration.allocationStatus === 'allocated'
                  ? 'text-green-400'
                  : registration.allocationStatus === 'waitlisted'
                    ? 'text-yellow-400'
                    : undefined
              }
            />
            {registration.allocatedCommittee && (
              <InfoRow label="Current committee" value={registration.allocatedCommittee} className="sm:col-span-2" />
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-b border-yugen pb-4">
            {(['allocate', ...(committee ? (['email'] as const) : []), 'waitlist', ...(registration.allocationStatus === 'allocated' ? (['deallocate'] as const) : [])] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setMode(tab)}
                className={`flex-1 min-w-[5.5rem] rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                  mode === tab
                    ? tab === 'deallocate'
                      ? 'bg-red-500 text-white'
                      : 'bg-yugen text-yugen-black'
                    : 'bg-surface text-muted hover:text-yugen-white'
                }`}
              >
                {tab === 'email' ? 'Email' : tab}
              </button>
            ))}
          </div>

          {mode === 'allocate' && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="label-caps">Committee *</label>
                <select
                  value={committee}
                  onChange={(e) => setCommittee(e.target.value)}
                  className="input-field mt-1"
                  required
                >
                  <option value="">Select committee</option>
                {committees.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.acronym !== 'TBA' ? `${c.acronym} — ` : ''}{c.name} ({c.type})
                  </option>
                ))}
                </select>
              </div>

              <div>
                <label className="label-caps">Country (optional)</label>
                <SearchSelect
                  value={country}
                  onChange={setCountry}
                  options={MUN_COUNTRIES}
                  featuredOptions={POPULAR_COUNTRIES}
                  featuredLabel="Common countries"
                  placeholder="Search countries…"
                  emptyLabel="No country assigned"
                  showSelected={false}
                  className="mt-1"
                  inputClassName="input-field mt-0"
                />
                {registration.countryPreference && (
                  <p className="mt-1.5 text-xs text-dim">
                    Delegate preference: {registration.countryPreference}
                  </p>
                )}
              </div>

              <div>
                <label className="label-caps">Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-field mt-1 min-h-[80px]"
                  placeholder="Internal notes for this allocation"
                />
              </div>

              <button
                type="button"
                onClick={handleAllocate}
                disabled={!committee || loading}
                className="btn-primary w-full"
              >
                {loading ? 'Saving…' : 'Save allocation & preview email'}
              </button>
            </div>
          )}

          {mode === 'email' && committee && (
            <div className="mt-6 space-y-4">
              {justSaved && (
                <div className="rounded-xl border border-green-500/30 bg-green-950/20 px-4 py-3">
                  <p className="text-sm text-green-200">
                    Allocation saved. Preview the email below, then copy or open your mail client to send.
                  </p>
                </div>
              )}
              <AllocationEmailPreview data={emailData} onCopied={onEmailCopied} />
            </div>
          )}

          {mode === 'waitlist' && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="label-caps">Waitlist notes</label>
                <textarea
                  value={waitlistNotes}
                  onChange={(e) => setWaitlistNotes(e.target.value)}
                  className="input-field mt-1 min-h-[80px]"
                  placeholder="Reason for waitlisting or additional notes"
                />
              </div>
              <button type="button" onClick={handleWaitlist} disabled={loading} className="btn-primary w-full">
                {loading ? 'Saving…' : 'Add to waitlist'}
              </button>
            </div>
          )}

          {mode === 'deallocate' && (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-muted">
                This removes the delegate&apos;s committee allocation and sets them back to unallocated.
              </p>
              <button type="button" onClick={handleDeallocate} disabled={loading} className="btn-danger w-full">
                {loading ? 'Removing…' : 'Remove allocation'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({
  label,
  value,
  accent,
  className = '',
}: {
  label: string
  value: string
  accent?: string
  className?: string
}) {
  return (
    <div className={className}>
      <p className="label-caps">{label}</p>
      <p className={`mt-1 text-sm font-medium capitalize ${accent ?? 'text-yugen-white'}`}>{value}</p>
    </div>
  )
}
