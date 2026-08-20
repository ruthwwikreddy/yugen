import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { CommitteeFilter, CommitteeGrid } from '../components/yugen/CommitteeCard'
import { EARLY_BIRD_REGISTER_PATH, isApplyOpen } from '../config/features'
import { getCommittees, getCommitteeTypes, YUGEN } from '../lib/yugen'

export function CommitteesPage() {
  const committees = getCommittees()
  const types = getCommitteeTypes()
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(
    () => (filter === 'All' ? committees : committees.filter((c) => c.type === filter)),
    [committees, filter],
  )

  return (
    <Shell>
      <SEO
        title="Committees | Yūgen Summit 6.0"
        description="Yūgen Summit 6.0 committees — councils, agendas, executive boards, and study guides. Announcing soon at PORPS, Hyderabad."
        path="/committees"
      />
      <div className="section-padding mx-auto max-w-7xl">
        <span className="coming-soon-pill">Committees</span>
        <h1 className="mt-6 section-title">Councils &amp; agendas</h1>
        <p className="mt-4 max-w-xl text-muted">
          Explore councils, agendas, executive boards, and study guides for Yūgen Summit 6.0.
        </p>

        <div className="mt-10">
          <CommitteeFilter types={types} active={filter} onChange={setFilter} />
        </div>

        <div className="mt-8">
          <CommitteeGrid committees={filtered} />
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-sm text-muted">No committees in this category yet.</p>
        )}

        <div className="mt-12 rounded-xl border border-yugen bg-surface-raised p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="label-caps text-green-400">WhatsApp Groups</p>
              <h2 className="mt-2 font-heading text-lg font-bold">Join your committee group</h2>
              <p className="mt-1 text-sm text-muted">{YUGEN.whatsapp.description}</p>
            </div>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-green-400" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {YUGEN.whatsapp.groups.map((group) => (
              <a
                key={group.id}
                href={group.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/8 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-green-400 transition-all hover:border-green-400/50 hover:bg-green-500/15 hover:text-green-300"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {group.acronym}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link to={EARLY_BIRD_REGISTER_PATH} className="btn-primary">Register as delegate</Link>
          <Link to="/resources" className="btn-ghost">Resources &amp; study guides</Link>
          {isApplyOpen() && (
            <Link to="/apply" className="btn-ghost">Apply to chair</Link>
          )}
          <Link to="/" className="btn-ghost">← Home</Link>
        </div>
      </div>
    </Shell>
  )
}
