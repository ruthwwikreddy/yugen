import { Link } from 'react-router-dom'
import type { Committee } from '../../lib/yugen'

interface CommitteeCardProps {
  committee: Committee
  compact?: boolean
}

export function CommitteeCard({ committee, compact = false }: CommitteeCardProps) {
  const isPlaceholder = committee.status === 'announcing-soon'

  return (
    <Link
      to={`/committees/${committee.id}`}
      className="group block overflow-hidden rounded-lg border border-yugen bg-surface-raised transition-colors hover:border-yugen-strong"
    >
      <div className={compact ? 'p-5' : 'p-6'}>
        <div className="flex items-start justify-between gap-3">
          <span className="label-caps text-[9px]">{committee.type}</span>
          {isPlaceholder && <span className="coming-soon-pill text-[8px]">Soon</span>}
        </div>
        <p className={`mt-4 font-display uppercase tracking-tight ${committee.acronym === 'TBA' ? 'text-yugen-white/40' : 'text-yugen-white'} ${compact ? 'text-2xl' : 'text-3xl'}`}>
          {committee.acronym}
        </p>
        <p className={`mt-2 font-heading font-semibold text-yugen-white ${compact ? 'text-sm' : 'text-base'}`}>
          {committee.name}
        </p>
        <p className={`mt-2 text-dim ${compact ? 'text-xs' : 'text-sm'}`}>{committee.topic}</p>
        {!compact && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-yugen px-2 py-0.5 text-[9px] uppercase tracking-wider text-dim">
              {committee.difficulty}
            </span>
            <span className="rounded-full border border-yugen px-2 py-0.5 text-[9px] uppercase tracking-wider text-dim">
              {committee.delegateCapacity} delegates
            </span>
          </div>
        )}
        <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-dim opacity-0 transition-opacity group-hover:opacity-100">
          View committee →
        </p>
      </div>
    </Link>
  )
}

interface CommitteeGridProps {
  committees: Committee[]
  compact?: boolean
}

export function CommitteeGrid({ committees, compact = false }: CommitteeGridProps) {
  return (
    <div className={`grid gap-4 ${compact ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
      {committees.map((c) => (
        <CommitteeCard key={c.id} committee={c} compact={compact} />
      ))}
    </div>
  )
}

interface CommitteeFilterProps {
  types: string[]
  active: string
  onChange: (type: string) => void
}

export function CommitteeFilter({ types, active, onChange }: CommitteeFilterProps) {
  const options = ['All', ...types]

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`rounded-full border px-4 py-1.5 font-body text-[10px] font-medium uppercase tracking-[0.16em] transition-colors ${
            active === type
              ? 'border-yugen-strong bg-yugen-white text-yugen-black'
              : 'border-yugen text-yugen-muted hover:border-yugen-strong hover:text-yugen-white'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  )
}
