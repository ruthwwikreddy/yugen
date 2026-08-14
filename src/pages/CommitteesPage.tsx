import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { CommitteeFilter, CommitteeGrid } from '../components/yugen/CommitteeCard'
import { EARLY_BIRD_REGISTER_PATH, isApplyOpen } from '../config/features'
import { getCommittees, getCommitteeTypes } from '../lib/yugen'

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
