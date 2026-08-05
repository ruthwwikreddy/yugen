import { useMemo, useState } from 'react'
import { formatTimestamp, STATUS_COLORS, STATUS_LABELS } from '../../lib/admin-utils'
import type { Registration, RegistrationStatus } from '../../lib/registration'

function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

type RegistrationsPanelProps = {
  registrations: Registration[]
  onSelect: (r: Registration) => void
  onEdit: (r: Registration) => void
  onAccept: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
  onBulkAccept: (ids: string[]) => void
  onBulkReject: (ids: string[]) => void
  onBulkDelete: (ids: string[]) => void
  onExport: () => void
  onAdd: () => void
  onImport?: () => void
}

export function RegistrationsPanel({
  registrations,
  onSelect,
  onEdit,
  onAccept,
  onReject,
  onDelete,
  onBulkAccept,
  onBulkReject,
  onBulkDelete,
  onExport,
  onAdd,
  onImport,
}: RegistrationsPanelProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<RegistrationStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = registrations.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false
      if (!q) return true
      return (
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.school.toLowerCase().includes(q)
      )
    })

    list = [...list].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      const aTime = a.createdAt?.toMillis() ?? 0
      const bTime = b.createdAt?.toMillis() ?? 0
      return sortBy === 'newest' ? bTime - aTime : aTime - bTime
    })

    return list
  }, [registrations, search, statusFilter, sortBy])

  const allSelected = filtered.length > 0 && filtered.every((r) => selectedIds.has(r.id))

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((r) => r.id)))
    }
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selected = [...selectedIds]

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ID, name, email, school…"
          className="input-touch w-full flex-1 rounded-lg border border-yugen bg-surface px-4 py-3 focus:border-yugen-strong focus:outline-none sm:py-2.5 sm:text-sm"
        />
        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RegistrationStatus | 'all')}
            className="input-touch rounded-lg border border-yugen bg-surface px-3 py-3 sm:py-2.5 sm:text-sm"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Awaiting verify</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="input-touch rounded-lg border border-yugen bg-surface px-3 py-3 sm:py-2.5 sm:text-sm"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex">
          <button type="button" onClick={onAdd} className="btn-primary w-full sm:w-auto">
            + Add
          </button>
          {onImport && (
            <button
              type="button"
              onClick={onImport}
              className="rounded-lg border border-yugen-strong bg-surface px-3 py-2.5 text-xs font-semibold text-yugen-white hover:bg-surface-raised sm:py-2"
            >
              📥 Import Forms
            </button>
          )}
          <button type="button" onClick={onExport} className="btn-ghost w-full sm:w-auto">
            Export
          </button>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-yugen-strong bg-surface-raised px-4 py-3">
          <span className="text-xs text-muted">{selected.length} selected</span>
          <button type="button" onClick={() => onBulkAccept(selected)} className="rounded-full bg-yugen-white px-3 py-1 text-[10px] font-semibold uppercase text-yugen-black">
            Verify all
          </button>
          <button type="button" onClick={() => onBulkReject(selected)} className="rounded-full border border-red-500/50 px-3 py-1 text-[10px] uppercase text-red-300">
            Reject all
          </button>
          <button type="button" onClick={() => onBulkDelete(selected)} className="rounded-full border border-yugen px-3 py-1 text-[10px] uppercase text-muted">
            Delete all
          </button>
          <button type="button" onClick={() => setSelectedIds(new Set())} className="ml-auto text-xs text-dim hover:text-yugen-white">
            Clear
          </button>
        </div>
      )}

      <p className="text-xs text-dim">Showing {filtered.length} of {registrations.length}</p>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-yugen bg-surface px-4 py-12 text-center">
            <p className="font-heading font-semibold">No registrations</p>
            <p className="mt-1 text-sm text-dim">Add one manually or wait for delegate sign-ups.</p>
            <button type="button" onClick={onAdd} className="btn-primary mt-4 inline-flex">
              Add registration
            </button>
          </div>
        ) : (
          filtered.map((r) => (
            <article
              key={r.id}
              className="rounded-xl border border-yugen bg-surface p-4"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.has(r.id)}
                  onChange={() => toggleOne(r.id)}
                  className="mt-1 h-5 w-5 shrink-0 rounded"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <button type="button" onClick={() => onSelect(r)} className="text-left">
                      <p className="font-medium">{r.name}</p>
                      <p className="mt-0.5 break-all font-mono text-[10px] text-dim">{r.id}</p>
                    </button>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted">{r.school} · Grade {r.grade}</p>
                  <p className="mt-1 truncate text-xs text-dim">{r.email}</p>
                  <p className="mt-1 text-[10px] text-dim">{formatTimestamp(r.createdAt)}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {r.status === 'paid' && (
                      <>
                        <button type="button" onClick={() => onAccept(r.id)} className="btn-primary min-h-10 text-[10px]">
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => onReject(r.id)}
                          className="min-h-10 rounded-full border border-red-500/40 text-[10px] uppercase text-red-300"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button type="button" onClick={() => onSelect(r)} className="btn-ghost min-h-10 text-[10px]">
                      View
                    </button>
                    <button type="button" onClick={() => onEdit(r)} className="btn-ghost min-h-10 text-[10px]">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-yugen md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="border-b border-yugen bg-surface-raised">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded" />
                </th>
                <th className="px-4 py-3 label-caps">ID</th>
                <th className="px-4 py-3 label-caps">Delegate</th>
                <th className="px-4 py-3 label-caps">School</th>
                <th className="px-4 py-3 label-caps">Grade</th>
                <th className="px-4 py-3 label-caps">Status</th>
                <th className="px-4 py-3 label-caps">Registered</th>
                <th className="px-4 py-3 label-caps">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yugen">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <p className="font-heading font-semibold">No registrations</p>
                    <p className="mt-1 text-sm text-dim">Add one manually or wait for delegate sign-ups.</p>
                    <button type="button" onClick={onAdd} className="btn-primary mt-4 inline-flex">
                      Add registration
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="bg-surface transition-colors hover:bg-surface-raised">
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selectedIds.has(r.id)} onChange={() => toggleOne(r.id)} className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => onSelect(r)} className="font-mono text-xs hover:underline">
                        {r.id}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => onSelect(r)} className="text-left hover:underline">
                        <p className="font-medium">{r.name}</p>
                        <p className="text-xs text-dim">{r.email}</p>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-muted">{r.school}</td>
                    <td className="px-4 py-3 text-muted">{r.grade}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-dim">{formatTimestamp(r.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {r.status === 'paid' && (
                          <>
                            <button type="button" onClick={() => onAccept(r.id)} className="rounded border border-yugen-strong px-2 py-0.5 text-[10px] uppercase hover:bg-yugen-white hover:text-yugen-black">
                              Accept
                            </button>
                            <button type="button" onClick={() => onReject(r.id)} className="rounded border border-red-500/40 px-2 py-0.5 text-[10px] uppercase text-red-300">
                              Reject
                            </button>
                          </>
                        )}
                        <button type="button" onClick={() => onEdit(r)} className="rounded border border-yugen px-2 py-0.5 text-[10px] uppercase text-muted hover:text-yugen-white">
                          Edit
                        </button>
                        <button type="button" onClick={() => onDelete(r.id)} className="rounded border border-yugen px-2 py-0.5 text-[10px] uppercase text-dim hover:text-red-300">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
