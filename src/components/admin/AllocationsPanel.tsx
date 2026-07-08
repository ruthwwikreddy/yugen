import { useMemo, useState } from 'react'
import type { Registration } from '../../lib/registration'
import {
  filterByCommittee,
  formatCommitteePreferencesDisplay,
  getCommitteeAllocationStats,
  getCommitteeForRegistration,
  getCommitteePreferences,
  parseCommitteeCapacity,
  searchAllocations,
  sortAllocations,
  type AllocationSort,
} from '../../lib/allocation-utils'
import { ALLOCATION_STATUS_COLORS, ALLOCATION_STATUS_LABELS, formatTimestamp } from '../../lib/admin-utils'
import type { Committee } from '../../lib/yugen'
import { getCommittees } from '../../lib/yugen'
import { AdminBarRow, AdminCard, AdminEmptyState, AdminProgressRing, AdminStatCard } from './admin-ui'

type AllocationsPanelProps = {
  registrations: Registration[]
  onSelect: (registration: Registration) => void
  onAllocate: (id: string) => void
  selectedIds: string[]
  onSelectId: (id: string) => void
  onSelectAll: (filteredIds: string[]) => void
  onExport: () => void
}

type StatusFilter = 'all' | 'allocated' | 'unallocated' | 'waitlisted'
type ViewMode = 'overview' | 'master' | 'committees'

export function AllocationsPanel({
  registrations,
  onSelect,
  onAllocate,
  selectedIds,
  onSelectId,
  onSelectAll,
  onExport,
}: AllocationsPanelProps) {
  const [view, setView] = useState<ViewMode>('master')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [committeeFilter, setCommitteeFilter] = useState<string | 'all'>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<AllocationSort>('name')
  const [expandedCommittee, setExpandedCommittee] = useState<string | null>(null)

  const committees = getCommittees()
  const committeeStats = useMemo(() => getCommitteeAllocationStats(registrations), [registrations])

  const filtered = useMemo(() => {
    let list = filterByCommittee(registrations, committeeFilter)
    if (statusFilter !== 'all') list = list.filter((r) => r.allocationStatus === statusFilter)
    list = searchAllocations(list, search)
    return sortAllocations(list, sortBy)
  }, [registrations, committeeFilter, statusFilter, search, sortBy])

  const counts = useMemo(
    () => ({
      allocated: registrations.filter((r) => r.allocationStatus === 'allocated').length,
      unallocated: registrations.filter((r) => r.allocationStatus === 'unallocated').length,
      waitlisted: registrations.filter((r) => r.allocationStatus === 'waitlisted').length,
    }),
    [registrations]
  )

  const allSelected = filtered.length > 0 && filtered.every((r) => selectedIds.includes(r.id))

  const views: { id: ViewMode; label: string }[] = [
    { id: 'master', label: 'Full list' },
    { id: 'overview', label: 'Overview' },
    { id: 'committees', label: 'By committee' },
  ]

  const statusFilters: { id: StatusFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: registrations.length },
    { id: 'allocated', label: 'Allocated', count: counts.allocated },
    { id: 'unallocated', label: 'Unallocated', count: counts.unallocated },
    { id: 'waitlisted', label: 'Waitlisted', count: counts.waitlisted },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
        <AdminStatCard label="Verified" value={registrations.length} sub="Eligible delegates" accent />
        <AdminStatCard label="Allocated" value={counts.allocated} highlight="green" />
        <AdminStatCard label="Unallocated" value={counts.unallocated} highlight={counts.unallocated > 0 ? 'amber' : 'neutral'} />
        <AdminStatCard label="Waitlisted" value={counts.waitlisted} />
        <AdminStatCard label="Committees" value={committees.length} sub="Active councils" />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-wider ${
                view === v.id ? 'bg-yugen-white text-yugen-black' : 'border border-yugen text-muted hover:text-yugen-white'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onExport} className="btn-ghost text-xs">
            Export CSV
          </button>
        </div>
      </div>

      <Toolbar
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        statusFilters={statusFilters}
        statusFilter={statusFilter}
        onStatusFilter={setStatusFilter}
        committeeFilter={committeeFilter}
        committees={committees}
        onCommitteeFilter={setCommitteeFilter}
        onClearFilters={() => {
          setCommitteeFilter('all')
          setStatusFilter('all')
          setSearch('')
        }}
      />

      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-yugen-strong bg-surface-raised px-4 py-3">
          <span className="text-xs text-muted">{selectedIds.length} selected</span>
          <button
            type="button"
            onClick={() => onAllocate(selectedIds[0])}
            className="btn-primary px-4 py-2 text-[10px]"
          >
            Allocate selected
          </button>
          <button type="button" onClick={() => onSelectAll([])} className="btn-ghost ml-auto text-[10px]">
            Clear selection
          </button>
        </div>
      )}

      {view === 'overview' && (
        <OverviewView
          committeeStats={committeeStats}
          registrations={registrations}
          committeeFilter={committeeFilter}
          onSelectCommittee={setCommitteeFilter}
          onSelect={onSelect}
          onAllocate={onAllocate}
        />
      )}

      {view === 'committees' && (
        <CommitteesView
          committees={committees}
          registrations={registrations}
          expandedCommittee={expandedCommittee}
          onToggleExpand={setExpandedCommittee}
          onSelect={onSelect}
          onAllocate={onAllocate}
        />
      )}

      {view === 'master' && (
        <AdminCard
          title="Allocation master list"
          description={`${filtered.length} delegate${filtered.length === 1 ? '' : 's'} · all verified registrations`}
          action={
            <label className="flex cursor-pointer items-center gap-2 text-xs text-dim">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => onSelectAll(filtered.map((r) => r.id))}
                className="h-4 w-4 rounded border-yugen bg-yugen-black"
              />
              Select all
            </label>
          }
        >
          {filtered.length === 0 ? (
            <AdminEmptyState
              title="No delegates match"
              description="Adjust filters or verify more registrations to begin allocating."
            />
          ) : (
            <>
              <div className="space-y-3 md:hidden">
                {filtered.map((r) => (
                  <AllocationMobileCard
                    key={r.id}
                    registration={r}
                    committees={committees}
                    selected={selectedIds.includes(r.id)}
                    onSelectId={onSelectId}
                    onSelect={onSelect}
                    onAllocate={onAllocate}
                  />
                ))}
              </div>
              <div className="hidden overflow-hidden rounded-xl border border-yugen md:block">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px] text-left text-sm">
                    <thead className="border-b border-yugen bg-surface-raised">
                      <tr>
                        <th className="px-4 py-3">
                          <input type="checkbox" checked={allSelected} onChange={() => onSelectAll(filtered.map((r) => r.id))} className="rounded" />
                        </th>
                        <th className="px-4 py-3 label-caps">Delegate</th>
                        <th className="px-4 py-3 label-caps">School</th>
                        <th className="px-4 py-3 label-caps">Grade</th>
                        <th className="px-4 py-3 label-caps">Preferences</th>
                        <th className="px-4 py-3 label-caps">Committee</th>
                        <th className="px-4 py-3 label-caps">Country</th>
                        <th className="px-4 py-3 label-caps">Status</th>
                        <th className="px-4 py-3 label-caps">Allocated</th>
                        <th className="px-4 py-3 label-caps">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yugen">
                      {filtered.map((r) => (
                        <AllocationTableRow
                          key={r.id}
                          registration={r}
                          committees={committees}
                          selected={selectedIds.includes(r.id)}
                          onSelectId={onSelectId}
                          onSelect={onSelect}
                          onAllocate={onAllocate}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </AdminCard>
      )}
    </div>
  )
}

function Toolbar({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  statusFilters,
  statusFilter,
  onStatusFilter,
  committeeFilter,
  committees,
  onCommitteeFilter,
  onClearFilters,
}: {
  search: string
  onSearchChange: (v: string) => void
  sortBy: AllocationSort
  onSortChange: (v: AllocationSort) => void
  statusFilters: { id: StatusFilter; label: string; count: number }[]
  statusFilter: StatusFilter
  onStatusFilter: (v: StatusFilter) => void
  committeeFilter: string | 'all'
  committees: Committee[]
  onCommitteeFilter: (v: string | 'all') => void
  onClearFilters: () => void
}) {
  const hasFilters = committeeFilter !== 'all' || statusFilter !== 'all' || search.trim().length > 0

  return (
    <div className="space-y-3 rounded-2xl border border-yugen bg-surface p-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search name, ID, school, committee, country…"
          className="input-field flex-1"
        />
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value as AllocationSort)} className="input-field lg:w-48">
          <option value="name">Sort: Name A–Z</option>
          <option value="school">Sort: School</option>
          <option value="committee">Sort: Committee</option>
          <option value="status">Sort: Status</option>
          <option value="preference">Sort: Preference</option>
          <option value="newest">Sort: Recently allocated</option>
        </select>
        <select
          value={committeeFilter}
          onChange={(e) => onCommitteeFilter(e.target.value)}
          className="input-field lg:w-56"
        >
          <option value="all">All committees</option>
          {committees.map((c) => (
            <option key={c.id} value={c.id}>
              {c.acronym} — {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {statusFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onStatusFilter(f.id)}
            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${
              statusFilter === f.id ? 'bg-yugen-white text-yugen-black' : 'border border-yugen text-muted hover:text-yugen-white'
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
        {hasFilters && (
          <button type="button" onClick={onClearFilters} className="btn-ghost ml-auto text-[10px]">
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

function OverviewView({
  committeeStats,
  registrations,
  committeeFilter,
  onSelectCommittee,
  onSelect,
  onAllocate,
}: {
  committeeStats: ReturnType<typeof getCommitteeAllocationStats>
  registrations: Registration[]
  committeeFilter: string | 'all'
  onSelectCommittee: (id: string | 'all') => void
  onSelect: (r: Registration) => void
  onAllocate: (id: string) => void
}) {
  const allocatedPct = registrations.length > 0
    ? Math.round((registrations.filter((r) => r.allocationStatus === 'allocated').length / registrations.length) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <AdminCard title="Progress" className="lg:col-span-1">
          <AdminProgressRing
            value={registrations.filter((r) => r.allocationStatus === 'allocated').length}
            max={Math.max(registrations.length, 1)}
            label="Allocation progress"
            sub="delegates assigned"
          />
          <p className="mt-4 text-sm text-muted">{allocatedPct}% of verified delegates have a committee.</p>
        </AdminCard>
        <AdminCard title="Committee fill" description="Allocated vs capacity" className="lg:col-span-2">
          <div className="space-y-4">
            {committeeStats.map(({ committee, allocated }) => {
              const cap = parseCommitteeCapacity(committee.delegateCapacity)
              return (
                <AdminBarRow
                  key={committee.id}
                  label={`${committee.acronym} · ${committee.name}${cap ? ` (${allocated}/${cap})` : ` (${allocated})`}`}
                  count={allocated}
                  max={cap ?? Math.max(allocated, 1, ...committeeStats.map((s) => s.allocated))}
                />
              )
            })}
          </div>
        </AdminCard>
      </div>

      <AdminCard title="All committees" description="Click to filter the master list">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {committeeStats.map(({ committee, allocated, preferenceCount, allocatedDelegates }) => (
            <CommitteeCard
              key={committee.id}
              committee={committee}
              allocated={allocated}
              preferenceCount={preferenceCount}
              active={committeeFilter === committee.id}
              onClick={() => onSelectCommittee(committeeFilter === committee.id ? 'all' : committee.id)}
              delegates={allocatedDelegates}
              onSelect={onSelect}
              onAllocate={onAllocate}
            />
          ))}
        </div>
      </AdminCard>
    </div>
  )
}

function CommitteesView({
  committees,
  registrations,
  expandedCommittee,
  onToggleExpand,
  onSelect,
  onAllocate,
}: {
  committees: Committee[]
  registrations: Registration[]
  expandedCommittee: string | null
  onToggleExpand: (id: string | null) => void
  onSelect: (r: Registration) => void
  onAllocate: (id: string) => void
}) {
  return (
    <div className="space-y-4">
      {committees.map((committee) => {
        const { allocated, unallocatedPreferences, remaining } = getCommitteeForRegistration(registrations, committee)
        const cap = parseCommitteeCapacity(committee.delegateCapacity)
        const open = expandedCommittee === committee.id
        const full = cap !== null && allocated.length >= cap

        return (
          <div key={committee.id} className="overflow-hidden rounded-2xl border border-yugen bg-surface">
            <button
              type="button"
              onClick={() => onToggleExpand(open ? null : committee.id)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left hover:bg-surface-raised"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="label-caps">{committee.acronym}</span>
                  {full && (
                    <span className="rounded-full border border-amber-500/40 bg-amber-950/20 px-2 py-0.5 text-[10px] uppercase text-amber-200">
                      Full
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-heading text-lg font-semibold">{committee.name}</h3>
                <p className="mt-1 text-sm text-dim">{committee.type}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider">
                  <span className="rounded-full border border-green-500/30 bg-green-950/20 px-2 py-0.5 text-green-300">
                    {allocated.length} allocated
                  </span>
                  {cap !== null && (
                    <span className="rounded-full border border-yugen px-2 py-0.5 text-muted">
                      {remaining} slots left
                    </span>
                  )}
                  {unallocatedPreferences.length > 0 && (
                    <span className="rounded-full border border-yugen px-2 py-0.5 text-muted">
                      {unallocatedPreferences.length} pref waiting
                    </span>
                  )}
                </div>
                {cap !== null && (
                  <div className="mt-4">
                    <AdminBarRow label="Capacity" count={allocated.length} max={cap} />
                  </div>
                )}
              </div>
              <span className="shrink-0 pt-1 font-display text-3xl uppercase leading-none">{allocated.length}</span>
            </button>

            {open && (
              <div className="border-t border-yugen bg-surface-raised/50">
                <div className="grid gap-6 p-5 lg:grid-cols-2">
                  <RosterSection
                    title="Allocated delegates"
                    empty="No delegates allocated yet."
                    delegates={allocated}
                    onSelect={onSelect}
                    onAllocate={onAllocate}
                  />
                  <RosterSection
                    title="Preference queue"
                    empty="No pending preferences for this committee."
                    delegates={unallocatedPreferences}
                    onSelect={onSelect}
                    onAllocate={onAllocate}
                    showPref
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function RosterSection({
  title,
  empty,
  delegates,
  onSelect,
  onAllocate,
  showPref,
}: {
  title: string
  empty: string
  delegates: Registration[]
  onSelect: (r: Registration) => void
  onAllocate: (id: string) => void
  showPref?: boolean
}) {
  return (
    <div>
      <p className="label-caps">{title}</p>
      {delegates.length === 0 ? (
        <p className="mt-3 text-sm text-dim">{empty}</p>
      ) : (
        <div className="mt-3 divide-y divide-yugen rounded-xl border border-yugen bg-surface">
          {delegates.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <button type="button" onClick={() => onSelect(r)} className="min-w-0 text-left hover:underline">
                <p className="font-medium">{r.name}</p>
                <p className="truncate text-xs text-dim">
                  {r.school} · Grade {r.grade}
                  {r.allocatedCountry ? ` · ${r.allocatedCountry}` : ''}
                  {showPref && getCommitteePreferences(r).length > 0
                    ? ` · ${formatCommitteePreferencesDisplay(r, getCommittees())}`
                    : ''}
                </p>
              </button>
              <button type="button" onClick={() => onAllocate(r.id)} className="btn-ghost shrink-0 text-[10px]">
                {r.allocationStatus === 'allocated' ? 'Manage' : 'Allocate'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CommitteeCard({
  committee,
  allocated,
  preferenceCount,
  active,
  onClick,
  delegates,
  onSelect,
  onAllocate,
}: {
  committee: Committee
  allocated: number
  preferenceCount: number
  active: boolean
  onClick: () => void
  delegates: Registration[]
  onSelect: (r: Registration) => void
  onAllocate: (id: string) => void
}) {
  const cap = parseCommitteeCapacity(committee.delegateCapacity)

  return (
    <div
      className={`rounded-xl border transition-all ${
        active ? 'border-yugen-strong bg-surface-raised ring-1 ring-yugen-white/15' : 'border-yugen bg-surface'
      }`}
    >
      <button type="button" onClick={onClick} className="w-full p-4 text-left">
        <div className="flex items-start justify-between gap-2">
          <span className="label-caps">{committee.acronym}</span>
          <span className="font-display text-2xl uppercase leading-none">{allocated}{cap ? `/${cap}` : ''}</span>
        </div>
        <p className="mt-2 font-heading text-sm font-semibold leading-snug">{committee.name}</p>
        <p className="mt-1 text-xs text-dim">{committee.type}</p>
        {cap !== null && (
          <div className="mt-3">
            <AdminBarRow label="Filled" count={allocated} max={cap} />
          </div>
        )}
        {preferenceCount > 0 && (
          <p className="mt-2 text-[10px] uppercase tracking-wider text-dim">{preferenceCount} preference{preferenceCount === 1 ? '' : 's'}</p>
        )}
      </button>
      {delegates.length > 0 && (
        <div className="border-t border-yugen px-4 py-3">
          <p className="label-caps mb-2">Roster</p>
          <div className="space-y-2">
            {delegates.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-2 text-xs">
                <button type="button" onClick={() => onSelect(r)} className="truncate hover:underline">
                  {r.name}{r.allocatedCountry ? ` · ${r.allocatedCountry}` : ''}
                </button>
                <button type="button" onClick={() => onAllocate(r.id)} className="shrink-0 text-dim hover:text-yugen-white">
                  →
                </button>
              </div>
            ))}
            {delegates.length > 4 && <p className="text-[10px] text-dim">+{delegates.length - 4} more</p>}
          </div>
        </div>
      )}
    </div>
  )
}

function AllocationTableRow({
  registration: r,
  committees,
  selected,
  onSelectId,
  onSelect,
  onAllocate,
}: {
  registration: Registration
  committees: Committee[]
  selected: boolean
  onSelectId: (id: string) => void
  onSelect: (r: Registration) => void
  onAllocate: (id: string) => void
}) {
  const prefsDisplay = formatCommitteePreferencesDisplay(r, committees)

  return (
    <tr className="bg-surface transition-colors hover:bg-surface-raised">
      <td className="px-4 py-3">
        <input type="checkbox" checked={selected} onChange={() => onSelectId(r.id)} className="rounded" />
      </td>
      <td className="px-4 py-3">
        <button type="button" onClick={() => onSelect(r)} className="text-left hover:underline">
          <p className="font-medium">{r.name}</p>
          <p className="font-mono text-[10px] text-dim">{r.id}</p>
          <p className="text-xs text-dim">{r.email}</p>
        </button>
      </td>
      <td className="px-4 py-3 text-muted">{r.school}</td>
      <td className="px-4 py-3 text-muted">{r.grade}</td>
      <td className="px-4 py-3 text-xs text-muted">{prefsDisplay}</td>
      <td className="px-4 py-3 text-sm">{r.allocatedCommittee ?? '—'}</td>
      <td className="px-4 py-3 text-sm text-muted">{r.allocatedCountry ?? '—'}</td>
      <td className="px-4 py-3">
        <AllocationBadge status={r.allocationStatus} />
      </td>
      <td className="px-4 py-3 text-xs text-dim">{formatTimestamp(r.allocatedAt)}</td>
      <td className="px-4 py-3">
        <button type="button" onClick={() => onAllocate(r.id)} className="btn-primary px-3 py-1 text-[10px]">
          {r.allocationStatus === 'allocated' ? 'Manage' : 'Allocate'}
        </button>
      </td>
    </tr>
  )
}

function AllocationMobileCard({
  registration: r,
  committees,
  selected,
  onSelectId,
  onSelect,
  onAllocate,
}: {
  registration: Registration
  committees: Committee[]
  selected: boolean
  onSelectId: (id: string) => void
  onSelect: (r: Registration) => void
  onAllocate: (id: string) => void
}) {
  const prefsDisplay = formatCommitteePreferencesDisplay(r, committees)

  return (
    <article className="rounded-xl border border-yugen bg-surface p-4">
      <div className="flex items-start gap-3">
        <input type="checkbox" checked={selected} onChange={() => onSelectId(r.id)} className="mt-1 h-4 w-4 rounded" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <button type="button" onClick={() => onSelect(r)} className="text-left">
              <p className="font-medium">{r.name}</p>
              <p className="font-mono text-[10px] text-dim">{r.id}</p>
            </button>
            <AllocationBadge status={r.allocationStatus} />
          </div>
          <p className="mt-2 text-sm text-muted">{r.school} · Grade {r.grade}</p>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="col-span-2">
              <dt className="text-dim">Preferences</dt>
              <dd className="text-muted">{prefsDisplay}</dd>
            </div>
            <div>
              <dt className="text-dim">Committee</dt>
              <dd className="text-yugen-white">{r.allocatedCommittee ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-dim">Country</dt>
              <dd className="text-muted">{r.allocatedCountry ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-dim">Allocated</dt>
              <dd className="text-muted">{formatTimestamp(r.allocatedAt)}</dd>
            </div>
          </dl>
          <button type="button" onClick={() => onAllocate(r.id)} className="btn-primary mt-4 w-full text-[10px]">
            {r.allocationStatus === 'allocated' ? 'Manage allocation' : 'Allocate committee'}
          </button>
        </div>
      </div>
    </article>
  )
}

function AllocationBadge({ status }: { status: Registration['allocationStatus'] }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${ALLOCATION_STATUS_COLORS[status]}`}>
      {ALLOCATION_STATUS_LABELS[status]}
    </span>
  )
}
