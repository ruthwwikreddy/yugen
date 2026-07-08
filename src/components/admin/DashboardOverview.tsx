import { formatInr, formatTimestamp, STATUS_COLORS, STATUS_LABELS, type RegistrationStats } from '../../lib/admin-utils'
import { EARLY_BIRD_AMOUNT } from '../../lib/registration'
import type { Registration, RegistrationStatus } from '../../lib/registration'

function StatCard({
  label,
  value,
  sub,
  accent,
  highlight,
}: {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        highlight
          ? 'border-amber-500/40 bg-amber-950/20'
          : accent
            ? 'border-yugen-strong bg-surface-raised'
            : 'border-yugen bg-surface'
      }`}
    >
      <p className="label-caps">{label}</p>
      <p className="mt-2 font-display text-3xl uppercase">{value}</p>
      {sub && <p className="mt-1 text-xs text-dim">{sub}</p>}
    </div>
  )
}

function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

function BarRow({ label, count, max }: { label: string; count: number; max: number }) {
  const pct = max > 0 ? (count / max) * 100 : 0
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-muted">{label}</span>
        <span className="text-dim">{count}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-yugen-border">
        <div className="h-full rounded-full bg-yugen-white transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

type DashboardOverviewProps = {
  stats: RegistrationStats
  onSelectRegistration: (r: Registration) => void
  onGoToRegistrations: () => void
  onAcceptPayment: (id: string) => void
  onRejectPayment: (id: string) => void
}

export function DashboardOverview({
  stats,
  onSelectRegistration,
  onGoToRegistrations,
  onAcceptPayment,
  onRejectPayment,
}: DashboardOverviewProps) {
  const topSchools = Object.entries(stats.bySchool).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const maxSchool = topSchools[0]?.[1] ?? 1
  const grades = Object.entries(stats.byGrade).sort((a, b) => Number(a[0]) - Number(b[0]))
  const maxGrade = Math.max(...grades.map(([, c]) => c), 1)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total" value={stats.total} sub={`${stats.schools} schools`} accent />
        <StatCard label="Pending" value={stats.pending} sub={formatInr(stats.pending * EARLY_BIRD_AMOUNT)} />
        <StatCard label="Awaiting verify" value={stats.paid} sub="Paid · needs review" highlight={stats.paid > 0} />
        <StatCard label="Verified" value={stats.verified} sub={formatInr(stats.revenueVerified)} accent />
        <StatCard label="Rejected" value={stats.rejected} sub="Payment declined" />
      </div>

      {(stats.paid > 0 || stats.pending > 0) && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/10 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-heading font-semibold">Payment review queue</h2>
              <p className="mt-1 text-xs text-dim">{stats.paid} paid awaiting verification · {stats.pending} not yet paid</p>
            </div>
            <button type="button" onClick={onGoToRegistrations} className="btn-ghost text-xs">
              All registrations →
            </button>
          </div>
          <div className="divide-y divide-yugen/50">
            {stats.pendingPayments.length === 0 ? (
              <p className="py-4 text-sm text-dim">No items in queue.</p>
            ) : (
              stats.pendingPayments.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <button type="button" onClick={() => onSelectRegistration(r)} className="min-w-0 text-left hover:underline">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-dim">{r.id} · {r.school} · {formatInr(r.amount)}</p>
                  </button>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={r.status} />
                    {r.status === 'paid' && (
                      <>
                        <button type="button" onClick={() => onAcceptPayment(r.id)} className="rounded-full bg-yugen-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-yugen-black">
                          Accept
                        </button>
                        <button type="button" onClick={() => onRejectPayment(r.id)} className="rounded-full border border-red-500/50 px-3 py-1 text-[10px] uppercase tracking-wider text-red-300">
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-yugen bg-surface p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading font-semibold">Recent registrations</h2>
            <button type="button" onClick={onGoToRegistrations} className="text-xs text-muted hover:text-yugen-white">
              View all →
            </button>
          </div>
          {stats.recent.length === 0 ? (
            <p className="text-sm text-dim">No registrations yet.</p>
          ) : (
            <div className="divide-y divide-yugen">
              {stats.recent.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelectRegistration(r)}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left transition-colors hover:bg-surface-raised"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{r.name}</p>
                    <p className="truncate text-xs text-dim">{r.school} · {r.id}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge status={r.status} />
                    <p className="mt-1 text-[10px] text-dim">{formatTimestamp(r.createdAt)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-yugen bg-surface p-5">
            <h2 className="font-heading font-semibold">Revenue</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Confirmed</span>
                <span className="font-semibold">{formatInr(stats.revenueVerified)}</span>
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
          </div>

          <div className="rounded-xl border border-yugen bg-surface p-5">
            <h2 className="font-heading font-semibold">Status breakdown</h2>
            <div className="mt-4 space-y-3">
              {(['pending', 'paid', 'verified', 'rejected'] as RegistrationStatus[]).map((s) => (
                <BarRow key={s} label={STATUS_LABELS[s]} count={stats[s]} max={stats.total || 1} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-yugen bg-surface p-5">
          <h2 className="font-heading font-semibold">By school</h2>
          <div className="mt-4 space-y-3">
            {topSchools.length === 0 ? (
              <p className="text-sm text-dim">No data yet.</p>
            ) : (
              topSchools.map(([school, count]) => (
                <BarRow key={school} label={school} count={count} max={maxSchool} />
              ))
            )}
          </div>
        </div>
        <div className="rounded-xl border border-yugen bg-surface p-5">
          <h2 className="font-heading font-semibold">By grade</h2>
          <div className="mt-4 space-y-3">
            {grades.length === 0 ? (
              <p className="text-sm text-dim">No data yet.</p>
            ) : (
              grades.map(([grade, count]) => (
                <BarRow key={grade} label={`Grade ${grade}`} count={count} max={maxGrade} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
