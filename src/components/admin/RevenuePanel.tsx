import { formatInr } from '../../lib/admin-utils'
import { EARLY_BIRD_AMOUNT } from '../../lib/registration'
import type { Registration } from '../../lib/registration'
import { AdminCard, AdminStatCard, AdminStatusBadge } from './admin-ui'

type RevenuePanelProps = {
  registrations: Registration[]
  onExport: () => void
}

export function RevenuePanel({ registrations, onExport }: RevenuePanelProps) {
  const verified = registrations.filter((r) => r.status === 'verified')
  const paid = registrations.filter((r) => r.status === 'paid')
  const pending = registrations.filter((r) => r.status === 'pending')
  const rejected = registrations.filter((r) => r.status === 'rejected')

  const revenueVerified = verified.length * EARLY_BIRD_AMOUNT
  const revenuePending = (paid.length + pending.length) * EARLY_BIRD_AMOUNT
  const totalPotential = registrations.length * EARLY_BIRD_AMOUNT
  const conversion = registrations.length > 0 ? ((verified.length / registrations.length) * 100).toFixed(1) : '0'

  const recentPayments = [...verified, ...paid]
    .sort((a, b) => {
      const aTime = a.paidAt?.toMillis() ?? a.createdAt?.toMillis() ?? 0
      const bTime = b.paidAt?.toMillis() ?? b.createdAt?.toMillis() ?? 0
      return bTime - aTime
    })
    .slice(0, 10)

  return (
    <div className="space-y-6">
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Collected" value={formatInr(revenueVerified)} sub={`${verified.length} verified`} highlight="green" />
        <AdminStatCard label="In pipeline" value={formatInr(revenuePending)} sub={`${paid.length + pending.length} pending`} highlight={paid.length + pending.length > 0 ? 'amber' : 'neutral'} />
        <AdminStatCard label="Potential" value={formatInr(totalPotential)} sub={`${registrations.length} total`} accent />
        <AdminStatCard label="Conversion" value={`${conversion}%`} sub="Verified rate" />
      </div>

      <AdminCard title="Payment status">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard status="pending" count={pending.length} amount={pending.length * EARLY_BIRD_AMOUNT} />
          <StatusCard status="paid" count={paid.length} amount={paid.length * EARLY_BIRD_AMOUNT} />
          <StatusCard status="verified" count={verified.length} amount={verified.length * EARLY_BIRD_AMOUNT} />
          <StatusCard status="rejected" count={rejected.length} amount={rejected.length * EARLY_BIRD_AMOUNT} />
        </div>
      </AdminCard>

      <AdminCard
        title="Recent payments"
        action={
          <button type="button" onClick={onExport} className="btn-ghost text-[10px]">
            Export CSV
          </button>
        }
      >
        {recentPayments.length === 0 ? (
          <p className="text-sm text-dim">No payments yet.</p>
        ) : (
          <div className="space-y-3">
            {recentPayments.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-4 rounded-xl border border-yugen bg-surface-raised p-4">
                <div className="min-w-0">
                  <p className="font-medium">{r.name}</p>
                  <p className="truncate text-xs text-dim">{r.school} · {r.id}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-semibold">{formatInr(r.amount)}</p>
                  <AdminStatusBadge status={r.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      <AdminCard title="Summary">
        <div className="space-y-2 text-sm">
          <SummaryRow label="Total registrations" value={String(registrations.length)} />
          <SummaryRow label="Verified (collected)" value={`${verified.length} (${formatInr(revenueVerified)})`} accent="green" />
          <SummaryRow label="Awaiting verification" value={`${paid.length} (${formatInr(paid.length * EARLY_BIRD_AMOUNT)})`} accent="amber" />
          <SummaryRow label="Pending payment" value={`${pending.length} (${formatInr(pending.length * EARLY_BIRD_AMOUNT)})`} />
          <SummaryRow label="Total potential revenue" value={formatInr(totalPotential)} bold />
          <SummaryRow label="Collection rate" value={`${totalPotential > 0 ? ((revenueVerified / totalPotential) * 100).toFixed(1) : 0}%`} />
        </div>
      </AdminCard>
    </div>
  )
}

function StatusCard({
  status,
  count,
  amount,
}: {
  status: Registration['status']
  count: number
  amount: number
}) {
  const labels: Record<Registration['status'], string> = {
    pending: 'Pending',
    paid: 'Awaiting verify',
    verified: 'Verified',
    rejected: 'Rejected',
  }

  return (
    <div className="rounded-xl border border-yugen bg-surface-raised p-4">
      <p className="label-caps">{labels[status]}</p>
      <p className="mt-2 font-display text-3xl uppercase">{count}</p>
      <p className="mt-1 text-sm text-muted">{formatInr(amount)}</p>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  accent,
  bold,
}: {
  label: string
  value: string
  accent?: 'green' | 'amber'
  bold?: boolean
}) {
  const valueClass =
    accent === 'green' ? 'text-green-400' : accent === 'amber' ? 'text-amber-300' : bold ? 'font-bold' : ''

  return (
    <div className="flex justify-between gap-4 border-b border-yugen/50 py-2 last:border-0">
      <span className="text-muted">{label}</span>
      <span className={`text-right ${valueClass}`}>{value}</span>
    </div>
  )
}
