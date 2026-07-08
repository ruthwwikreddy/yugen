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
            <img src={chair.image} alt={chair.name} className="h-full w-full object-cover grayscale" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-4xl uppercase text-yugen-white/20">{chair.initials}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
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
        <h2 className="label-caps mb-4">Agenda</h2>
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
                ? 'Download the background guide for this committee.'
                : 'Background guide publishes when the agenda is confirmed.'}
            </p>
          </div>
          {committee.studyGuideStatus === 'available' && committee.studyGuideUrl ? (
            <a href={committee.studyGuideUrl} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
              Download PDF
            </a>
          ) : (
            <span className="coming-soon-pill shrink-0">Coming soon</span>
          )}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-yugen bg-surface p-8">
        <p className="label-caps">Registration</p>
        <h2 className="mt-3 font-heading text-2xl font-bold">Delegate registration opens soon</h2>
        <p className="mt-2 text-sm text-muted">
          Committee preferences are collected during registration. Get notified when slots open.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/register" className="btn-primary">Get notified</Link>
          <Link to="/resources" className="btn-ghost">All resources</Link>
          <Link to="/apply" className="btn-ghost">Apply to chair</Link>
        </div>
      </section>
    </>
  )
}
