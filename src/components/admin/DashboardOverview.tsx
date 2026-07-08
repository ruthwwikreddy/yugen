import { EARLY_BIRD_AMOUNT } from '../../lib/registration'
import type { Registration, RegistrationStatus } from '../../lib/registration'
import { formatInr, formatTimestamp, type RegistrationStats } from '../../lib/admin-utils'
import {
  AdminAlert,
  AdminBarRow,
  AdminCard,
  AdminProgressRing,
  AdminQuickAction,
  AdminStatCard,
  AdminStatusBadge,
} from './admin-ui'

type DashboardOverviewProps = {
  stats: RegistrationStats
  onSelectRegistration: (r: Registration) => void
  onGoToRegistrations: () => void
  onGoToAllocations: () => void
  onGoToRevenue: () => void
  onAcceptPayment: (id: string) => void
  onRejectPayment: (id: string) => void
}

export function DashboardOverview({
  stats,
  onSelectRegistration,
  onGoToRegistrations,
  onGoToAllocations,
  onGoToRevenue,
  onAcceptPayment,
  onRejectPayment,
}: DashboardOverviewProps) {
  const topSchools = Object.entries(stats.bySchool).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const maxSchool = topSchools[0]?.[1] ?? 1
  const grades = Object.entries(stats.byGrade).sort((a, b) => Number(a[0]) - Number(b[0]))
  const maxGrade = Math.max(...grades.map(([, c]) => c), 1)
  const unallocated = Math.max(0, stats.verified - stats.allocated - stats.waitlisted)
  const conversion = stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <AdminQuickAction
          label="Action needed"
          description="Review paid registrations"
          value={stats.paid}
          onClick={onGoToRegistrations}
          highlight={stats.paid > 0}
        />
        <AdminQuickAction
          label="Allocations"
          description="Assign verified delegates"
          value={unallocated}
          onClick={onGoToAllocations}
          highlight={unallocated > 0}
        />
        <AdminQuickAction
          label="Revenue"
          description="View collected fees"
          value={formatInr(stats.revenueVerified)}
          onClick={onGoToRevenue}
        />
      </div>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <AdminStatCard label="Total" value={stats.total} sub={`${stats.schools} schools`} accent onClick={onGoToRegistrations} />
        <AdminStatCard label="Pending" value={stats.pending} sub={formatInr(stats.pending * EARLY_BIRD_AMOUNT)} />
        <AdminStatCard label="Awaiting verify" value={stats.paid} sub="Paid · needs review" highlight="amber" onClick={onGoToRegistrations} />
        <AdminStatCard label="Verified" value={stats.verified} sub={formatInr(stats.revenueVerified)} accent />
        <AdminStatCard label="Allocated" value={stats.allocated} sub={`${stats.waitlisted} waitlisted`} onClick={onGoToAllocations} />
        <AdminStatCard label="Revenue" value={formatInr(stats.revenueVerified)} sub={`${conversion}% conversion`} highlight="green" onClick={onGoToRevenue} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <AdminCard title="Allocation progress" description="Verified delegates with committee assignments" className="lg:col-span-1">
          <AdminProgressRing
            value={stats.allocated}
            max={Math.max(stats.verified, 1)}
            label="Committees assigned"
            sub="delegates allocated"
          />
          {unallocated > 0 && (
            <div className="mt-4">
              <AdminAlert tone="amber">
              <span className="font-medium text-amber-100">{unallocated}</span> verified delegate{unallocated === 1 ? '' : 's'} still need allocation.
              </AdminAlert>
            </div>
          )}
        </AdminCard>

        <AdminCard
          title="Recent registrations"
          description="Latest sign-ups across all schools"
          className="lg:col-span-2"
          action={
            <button type="button" onClick={onGoToRegistrations} className="btn-ghost text-[10px]">
              View all
            </button>
          }
        >
          {stats.recent.length === 0 ? (
            <p className="text-sm text-dim">No registrations yet.</p>
          ) : (
            <div className="divide-y divide-yugen">
              {stats.recent.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelectRegistration(r)}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left transition-colors first:pt-0 last:pb-0 hover:opacity-80"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{r.name}</p>
                    <p className="truncate text-xs text-dim">{r.school} · {r.id}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <AdminStatusBadge status={r.status} />
                    <p className="mt-1 text-[10px] text-dim">{formatTimestamp(r.createdAt)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </AdminCard>
      </div>

      {(stats.paid > 0 || stats.pending > 0) && (
        <AdminCard
          title="Payment review queue"
          description={`${stats.paid} paid awaiting verification · ${stats.pending} not yet paid`}
          action={
            <button type="button" onClick={onGoToRegistrations} className="btn-ghost text-[10px]">
              Open registrations
            </button>
          }
          className="border-amber-500/25"
        >
          <div className="divide-y divide-yugen/50">
            {stats.pendingPayments.length === 0 ? (
              <p className="text-sm text-dim">No items in queue.</p>
            ) : (
              stats.pendingPayments.map((r) => (
                <div key={r.id} className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" onClick={() => onSelectRegistration(r)} className="min-w-0 text-left hover:underline">
                    <p className="font-medium">{r.name}</p>
                    <p className="break-all text-xs text-dim sm:truncate">{r.id} · {r.school} · {formatInr(r.amount)}</p>
                  </button>
                  <div className="flex flex-wrap items-center gap-2">
                    <AdminStatusBadge status={r.status} />
                    {r.status === 'paid' && (
                      <>
                        <button type="button" onClick={() => onAcceptPayment(r.id)} className="btn-primary min-h-10 px-4 text-[10px] sm:min-h-0">
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => onRejectPayment(r.id)}
                          className="min-h-10 rounded-full border border-red-500/50 px-4 py-2 text-[10px] uppercase tracking-wider text-red-300 sm:min-h-0"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </AdminCard>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <AdminCard title="Revenue snapshot">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Confirmed</span>
              <span className="font-semibold text-green-300">{formatInr(stats.revenueVerified)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">In pipeline</span>
              <span>{formatInr(stats.revenuePending)}</span>
            </div>
            <div className="flex justify-between border-t border-yugen pt-3">
              <span className="text-muted">Per delegate</span>
              <span>{formatInr(EARLY_BIRD_AMOUNT)}</span>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Status breakdown">
          <div className="space-y-3">
            {(['pending', 'paid', 'verified', 'rejected'] as RegistrationStatus[]).map((s) => (
              <AdminBarRow key={s} label={s === 'paid' ? 'Awaiting verify' : s.charAt(0).toUpperCase() + s.slice(1)} count={stats[s]} max={stats.total || 1} />
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Top schools">
          {topSchools.length === 0 ? (
            <p className="text-sm text-dim">No data yet.</p>
          ) : (
            <div className="space-y-3">
              {topSchools.map(([school, count]) => (
                <AdminBarRow key={school} label={school} count={count} max={maxSchool} />
              ))}
            </div>
          )}
        </AdminCard>
      </div>

      {grades.length > 0 && (
        <AdminCard title="By grade">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grades.map(([grade, count]) => (
              <AdminBarRow key={grade} label={`Grade ${grade}`} count={count} max={maxGrade} />
            ))}
          </div>
        </AdminCard>
      )}
    </div>
  )
}
