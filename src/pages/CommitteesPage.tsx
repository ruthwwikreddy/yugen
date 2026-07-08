import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { ComingSoonBlock } from '../components/yugen/ComingSoonBlock'
import { CommitteeFilter, CommitteeGrid } from '../components/yugen/CommitteeCard'
import { getCommittees, getCommitteeTypes, YUGEN } from '../lib/yugen'

export function CommitteesPage() {
  const committees = getCommittees()
  const types = getCommitteeTypes()
  const [filter, setFilter] = useState('All')
  const usingDefaults = YUGEN.committees.length === 0

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
          Explore councils, agendas, executive boards, and study guides. Final topics and roster announcing soon.
        </p>

        {usingDefaults && (
          <div className="mt-8">
            <ComingSoonBlock
              eyebrow="Roster"
              title="Final councils announcing soon"
              description="Agendas, study guides, and chair roster publish when the organizing committee locks details. Cards below are structural placeholders."
              compact
            />
          </div>
        )}

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
          <Link to="/resources" className="btn-ghost">Resources &amp; study guides</Link>
          <Link to="/apply" className="btn-ghost">Apply to chair</Link>
          <Link to="/" className="btn-ghost">← Home</Link>
        </div>
      </div>
    </Shell>
  )
}
