import { Navigate, useParams } from 'react-router-dom'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { CommitteeDetailContent } from '../components/yugen/CommitteeDetailContent'
import { getCommitteeById } from '../lib/yugen'

export function CommitteeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const committee = id ? getCommitteeById(id) : undefined

  if (!committee) {
    return <Navigate to="/committees" replace />
  }

  return (
    <Shell>
      <SEO
        title={`${committee.acronym !== 'TBA' ? committee.acronym : committee.name} | Yūgen Summit 6.0`}
        description={`${committee.name} — ${committee.topic}. ${committee.type} at Yūgen Summit 6.0, PORPS Hyderabad.`}
        path={`/committees/${committee.id}`}
      />
      <div className="section-padding mx-auto max-w-4xl">
        <CommitteeDetailContent committee={committee} />
      </div>
    </Shell>
  )
}
