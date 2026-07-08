import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { STATUS_COLORS, STATUS_LABELS, formatInr } from '../../lib/admin-utils'
import type { RegistrationStatus } from '../../lib/registration'

export function AdminAtmosphere({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="hero-grid absolute inset-0 opacity-[0.04]" />
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-grain absolute inset-0 opacity-60" />
      <div className="hero-spotlight absolute inset-0" />
    </div>
  )
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-yugen bg-surface">
      <AdminAtmosphere />
      <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div>
          {eyebrow && <p className="label-caps">{eyebrow}</p>}
          <h2 className={`font-heading text-2xl font-bold tracking-tight sm:text-3xl ${eyebrow ? 'mt-2' : ''}`}>
            {title}
          </h2>
          {description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}

export function AdminStatCard({
  label,
  value,
  sub,
  highlight,
  accent,
  onClick,
}: {
  label: string
  value: string | number
  sub?: string
  highlight?: 'amber' | 'green' | 'neutral'
  accent?: boolean
  onClick?: () => void
}) {
  const highlightClass =
    highlight === 'amber'
      ? 'border-amber-500/35 bg-amber-950/15'
      : highlight === 'green'
        ? 'border-green-500/35 bg-green-950/15'
        : accent
          ? 'border-yugen-strong bg-surface-raised'
          : 'border-yugen bg-surface'

  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`admin-stat-card rounded-2xl border p-5 text-left ${highlightClass} ${onClick ? 'cursor-pointer hover:border-yugen-strong' : ''}`}
    >
      <p className="label-caps">{label}</p>
      <p className="mt-2 font-display text-3xl uppercase leading-none">{value}</p>
      {sub && <p className="mt-2 text-xs leading-relaxed text-dim">{sub}</p>}
    </Tag>
  )
}

export function AdminCard({
  title,
  description,
  action,
  children,
  className = '',
}: {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-2xl border border-yugen bg-surface ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-yugen px-5 py-4">
          <div>
            <h3 className="font-heading font-semibold">{title}</h3>
            {description && <p className="mt-1 text-xs text-dim">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  )
}

export function AdminStatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

export function AdminBarRow({ label, count, max }: { label: string; count: number; max: number }) {
  const pct = max > 0 ? (count / max) * 100 : 0
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs">
        <span className="truncate pr-3 text-muted">{label}</span>
        <span className="shrink-0 text-dim">{count}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-yugen-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-yugen-white"
        />
      </div>
    </div>
  )
}

export function AdminEmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-yugen bg-surface/50 px-6 py-14 text-center">
      <AdminAtmosphere />
      <div className="relative">
        <p className="font-heading text-lg font-semibold">{title}</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-dim">{description}</p>
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  )
}

export function AdminQuickAction({
  label,
  description,
  value,
  onClick,
  highlight,
}: {
  label: string
  description: string
  value?: string | number
  onClick: () => void
  highlight?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`admin-quick-action group rounded-2xl border p-5 text-left transition-colors ${
        highlight
          ? 'border-amber-500/35 bg-amber-950/10 hover:border-amber-500/50'
          : 'border-yugen bg-surface hover:border-yugen-strong hover:bg-surface-raised'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label-caps">{label}</p>
          <p className="mt-2 font-heading text-base font-semibold">{description}</p>
        </div>
        {value !== undefined && (
          <span className="font-display text-2xl uppercase leading-none text-yugen-white/90">{value}</span>
        )}
      </div>
      <p className="mt-3 text-xs text-dim transition-colors group-hover:text-muted">Open →</p>
    </button>
  )
}

export function AdminProgressRing({
  value,
  max,
  label,
  sub,
}: {
  value: number
  max: number
  label: string
  sub?: string
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  const r = 36
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 shrink-0">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-lg uppercase">{pct}%</span>
      </div>
      <div>
        <p className="font-heading font-semibold">{label}</p>
        <p className="mt-1 text-sm text-muted">
          {value} of {max} {sub ?? 'complete'}
        </p>
      </div>
    </div>
  )
}

export function AdminAlert({
  tone,
  children,
}: {
  tone: 'amber' | 'red' | 'neutral'
  children: ReactNode
}) {
  const toneClass =
    tone === 'amber'
      ? 'border-amber-500/30 bg-amber-950/15 text-muted'
      : tone === 'red'
        ? 'border-red-500/30 bg-red-950/15 text-red-200'
        : 'border-yugen bg-surface text-muted'

  return <div className={`rounded-xl border px-4 py-3 text-sm ${toneClass}`}>{children}</div>
}

export { formatInr }
