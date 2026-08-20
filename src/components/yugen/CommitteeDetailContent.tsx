import { Link } from 'react-router-dom'
import { TornCardTop } from './TornEdge'
import type { Committee, CommitteeChair } from '../../lib/yugen'

function ChairCard({ chair, committeeName }: { chair: CommitteeChair; committeeName: string }) {
  return (
    <article className="overflow-hidden rounded-lg border border-yugen bg-yugen-black">
      <TornCardTop />
      <div className="bg-surface-raised px-4 pb-5 pt-1">
        <div className="relative mx-auto aspect-[3/4] max-w-[180px] overflow-hidden bg-yugen-black">
          {chair.image ? (
            <img src={chair.image} alt={chair.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-4xl uppercase text-yugen-white/20">{chair.initials}</span>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          {chair.name === 'TBA' && <span className="coming-soon-pill text-[8px]">TBA</span>}
          <p className="mt-2 font-heading text-xs font-bold uppercase tracking-wide">{chair.role}</p>
          <p className="mt-1 text-[11px] text-dim">{chair.name}</p>
          <p className="mt-1 text-[10px] text-dim/80">{committeeName}</p>
        </div>
      </div>
    </article>
  )
}

interface CommitteeDetailContentProps {
  committee: Committee
}

export function CommitteeDetailContent({ committee }: CommitteeDetailContentProps) {
  const isAnnouncing = committee.status === 'announcing-soon'
  const isIP = committee.id === 'ip'
  const agendaLabel = isIP ? 'Coverage brief' : 'Agenda'

  return (
    <>
      <div className="border-b border-yugen pb-10">
        <Link to="/committees" className="label-caps hover:text-yugen-white">
          ← All committees
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="label-caps">{committee.type}</span>
          {isAnnouncing && <span className="coming-soon-pill">Announcing soon</span>}
        </div>

        <p className={`mt-6 font-display text-[clamp(3rem,10vw,5rem)] uppercase leading-none ${committee.acronym === 'TBA' ? 'text-yugen-white/50' : 'text-yugen-white'}`}>
          {committee.acronym}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold md:text-4xl">{committee.name}</h1>
        <p className="mt-6 text-xl text-muted">{committee.topic}</p>
      </div>

      <section className="mt-12">
        <h2 className="label-caps mb-4">{agendaLabel}</h2>
        <div className="rounded-lg border border-yugen bg-surface-raised p-6 md:p-8">
          <p className="leading-relaxed text-muted">
            {committee.topicExpanded ?? committee.topic}
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="label-caps mb-4">Committee info</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Difficulty', value: committee.difficulty },
            { label: 'Capacity', value: committee.delegateCapacity },
            { label: 'Portfolios', value: committee.portfolioRequired ? 'Required' : 'Not required' },
            { label: 'Venue', value: committee.venue ?? 'TBA' },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-yugen bg-surface p-5">
              <p className="label-caps">{item.label}</p>
              <p className="mt-2 font-heading text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
        {committee.subRoles && committee.subRoles.length > 0 && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {committee.subRoles.map((role) => (
              <div
                key={role.label}
                className="flex items-center justify-between rounded-lg border border-yugen bg-surface-raised p-4"
              >
                <p className="font-heading text-sm font-semibold">{role.label}</p>
                <p className="font-display text-2xl uppercase tracking-tight">{role.capacity}</p>
              </div>
            ))}
          </div>
        )}
        {committee.portfolioNote && (
          <p className="mt-4 text-sm text-dim">{committee.portfolioNote}</p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="label-caps mb-6">Executive board</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {committee.chairs.map((chair) => (
            <ChairCard key={`${chair.role}-${chair.initials}`} chair={chair} committeeName={committee.name} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="label-caps mb-4">Study guide</h2>
        <div className="flex flex-col gap-4 rounded-lg border border-yugen bg-surface-raised p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading font-bold">{committee.name} — Study Guide</p>
            <p className="mt-1 text-sm text-muted">
              {committee.studyGuideStatus === 'available'
                ? committee.studyGuideUrls && committee.studyGuideUrls.length > 1
                  ? `${committee.studyGuideUrls.length} background guides available for this committee.`
                  : 'Download the background guide for this committee.'
                : 'Background guide publishes when the agenda is confirmed.'}
            </p>
          </div>
          {committee.studyGuideStatus === 'available' && committee.studyGuideUrl ? (
            <div className="flex flex-wrap gap-3 shrink-0">
              <a href={committee.studyGuideUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Open in new tab
              </a>
              <a href={committee.studyGuideUrl} download className="btn-primary">
                Download PDF
              </a>
            </div>
          ) : (
            <span className="coming-soon-pill shrink-0">Coming soon</span>
          )}
        </div>
        {committee.studyGuideStatus === 'available' && (committee.studyGuideUrl || (committee.studyGuideUrls && committee.studyGuideUrls.length > 0)) && (
          <div className="mt-4 space-y-6">
            {((committee.studyGuideUrls && committee.studyGuideUrls.length > 0) ? committee.studyGuideUrls : [committee.studyGuideUrl!]).map((url, idx, arr) => {
              const fileName = decodeURIComponent(url.split('/').pop() ?? '')
              const prettyName = fileName
                .replace(/\.pdf$/i, '')
                .replace(/\.+$/, '')
                .replace(/[_-]+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
              const label = arr.length > 1 ? `${committee.name} — Guide ${idx + 1} of ${arr.length}${prettyName ? ` · ${prettyName}` : ''}` : `${committee.name} study guide preview`
              return (
                <div key={url} className="overflow-hidden rounded-lg border border-yugen bg-yugen-black">
                  <iframe
                    src={url}
                    title={label}
                    className="h-[640px] w-full"
                    loading="lazy"
                  />
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section className="mt-12 rounded-xl border border-yugen bg-surface p-8">
        <p className="label-caps font-semibold text-accent-light">Allocations & Roster</p>
        <h2 className="mt-3 font-heading text-2xl font-bold">Check your allocation for {committee.acronym}</h2>
        <p className="mt-2 text-sm text-muted">
          View all assigned portfolios, delegate names, countries/parties, and open seats for {committee.name}.
        </p>
        <div className="mt-6">
          <Link to={`/allocations?committee=${committee.id}`} className="btn-primary">
            View {committee.acronym} Allocations →
          </Link>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-yugen bg-surface p-8">
        <p className="label-caps">Showcase</p>
        <h2 className="mt-3 font-heading text-2xl font-bold">Explore this committee</h2>
        <p className="mt-2 text-sm text-muted">
          This site previews the Yūgen 6.0 committee line-up. Allocations and committee preferences are managed by the secretariat directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/committees" className="btn-primary">Browse all committees</Link>
          <Link to="/resources" className="btn-ghost">All resources</Link>
          <Link to="/contact" className="btn-ghost">Contact secretariat</Link>
        </div>
      </section>
    </>
  )
}
