import { Link } from 'react-router-dom'
import type { Committee } from '../../lib/yugen'
import { YUGEN } from '../../lib/yugen'

interface CommitteeCardProps {
  committee: Committee
  compact?: boolean
}

export function CommitteeCard({ committee, compact = false }: CommitteeCardProps) {
  const isPlaceholder = committee.status === 'announcing-soon'

  return (
    <Link
      to={`/committees/${committee.id}`}
      className="group block overflow-hidden rounded-lg border border-yugen bg-surface-raised transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
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
        <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-accent opacity-0 transition-opacity group-hover:opacity-100">
          View committee →
        </p>
        {(() => {
          const waGroup = YUGEN.whatsapp.groups.find(
            (g) => g.id === committee.id || g.acronym.toLowerCase() === committee.acronym.toLowerCase()
          )
          return waGroup ? (
            <a
              href={waGroup.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[9px] font-medium uppercase tracking-wider text-green-400 transition-colors hover:border-green-400/60 hover:bg-green-500/20"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join WhatsApp group
            </a>
          ) : null
        })()}
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
              ? 'border-accent bg-accent text-yugen-white'
              : 'border-yugen text-yugen-muted hover:border-accent hover:text-accent-light'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  )
}
