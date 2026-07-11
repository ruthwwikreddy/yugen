import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { EARLY_BIRD_REGISTER_PATH } from '../config/features'
import {
  filterPortfolioSlots,
  groupSlotsByCommittee,
  SLOT_TYPE_LABELS,
  type PortfolioSlotType,
} from '../lib/portfolio-guide'
import { getAllocatableCommittees } from '../lib/yugen'

const TYPE_BADGE_CLASS: Record<PortfolioSlotType, string> = {
  country: 'border-yugen-strong bg-surface-raised text-yugen-white',
  leader: 'border-yugen-strong bg-yugen-white/10 text-yugen-white',
  portfolio: 'border-yugen bg-surface text-muted',
}

function PortfolioSlotCard({ slot, index }: { slot: { id: string; label: string; type: PortfolioSlotType }; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.015, 0.4) }}
      className="flex items-center justify-between gap-3 rounded-lg border border-yugen bg-surface-raised px-4 py-3 transition-colors hover:border-yugen-strong"
    >
      <p className="text-sm font-medium text-yugen-white">{slot.label}</p>
      <span
        className={`label-caps shrink-0 rounded-full border px-2.5 py-1 text-[9px] tracking-widest ${TYPE_BADGE_CLASS[slot.type]}`}
      >
        {SLOT_TYPE_LABELS[slot.type]}
      </span>
    </motion.article>
  )
}

export function PortfolioGuidePage() {
  const committees = getAllocatableCommittees()
  const [query, setQuery] = useState('')
  const [committeeFilter, setCommitteeFilter] = useState<string>('all')

  const filtered = useMemo(
    () => filterPortfolioSlots(query, committeeFilter),
    [query, committeeFilter],
  )

  const grouped = useMemo(() => groupSlotsByCommittee(filtered), [filtered])

  const totalCount = filtered.length
  const hasFilters = query.trim().length > 0 || committeeFilter !== 'all'

  return (
    <Shell>
      <SEO
        title="Portfolio Guide | Yūgen Summit 6.0"
        description="Browse executive allocations and available portfolios by committee before registering for Yūgen Summit 6.0 — countries, leaders, and roles across all councils."
        path="/portfolio-guide"
      />
      <div className="section-padding mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="coming-soon-pill">Portfolio guide</span>
          <h1 className="mt-6 section-title">Executive allocations</h1>
          <p className="mt-4 max-w-xl text-muted">
            Browse portfolios by committee before you apply. Search by country, leader, or committee — final allocation is at the discretion of the Secretariat.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <div className="relative max-w-xl">
            <label htmlFor="portfolio-search" className="sr-only">
              Search country, leader, or committee
            </label>
            <input
              id="portfolio-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country, leader, or committee…"
              className="input-touch w-full rounded-xl border border-yugen bg-yugen-black py-3.5 pl-4 pr-10 text-yugen-white placeholder:text-dim transition-colors focus:border-yugen-strong focus:outline-none focus:ring-1 focus:ring-yugen-strong/30 sm:text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dim transition-colors hover:text-yugen-white"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by committee">
            <button
              type="button"
              onClick={() => setCommitteeFilter('all')}
              className={`rounded-full border px-4 py-2 label-caps text-[10px] transition-colors ${
                committeeFilter === 'all'
                  ? 'border-yugen-strong bg-yugen-white text-yugen-black'
                  : 'border-yugen bg-surface text-muted hover:border-yugen-strong hover:text-yugen-white'
              }`}
            >
              All
            </button>
            {committees.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCommitteeFilter(c.id)}
                className={`rounded-full border px-4 py-2 label-caps text-[10px] transition-colors ${
                  committeeFilter === c.id
                    ? 'border-yugen-strong bg-yugen-white text-yugen-black'
                    : 'border-yugen bg-surface text-muted hover:border-yugen-strong hover:text-yugen-white'
                }`}
              >
                {c.acronym}
              </button>
            ))}
          </div>

          {hasFilters && (
            <p className="text-sm text-dim">
              {totalCount === 0
                ? 'No portfolios match your search.'
                : `${totalCount} portfolio${totalCount === 1 ? '' : 's'} found`}
            </p>
          )}
        </div>

        {totalCount === 0 ? (
          <div className="mt-16 rounded-xl border border-yugen bg-surface-raised p-10 text-center">
            <p className="font-heading text-lg font-bold text-yugen-white">No portfolios found</p>
            <p className="mt-2 text-sm text-muted">
              Try a different search term or clear your committee filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setCommitteeFilter('all')
              }}
              className="btn-ghost mt-6"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-12 space-y-14">
            {grouped.map((group) => (
              <section key={group.committeeId} aria-labelledby={`committee-${group.committeeId}`}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-yugen pb-4">
                  <h2 id={`committee-${group.committeeId}`} className="font-display text-2xl uppercase tracking-wide text-yugen-white sm:text-3xl">
                    {group.acronym}
                  </h2>
                  <p className="text-sm text-muted">{group.name}</p>
                  <span className="label-caps ml-auto text-[9px]">
                    {group.slots.length} slot{group.slots.length === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.slots.map((slot, i) => (
                    <PortfolioSlotCard key={slot.id} slot={slot} index={i} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-xl border border-yugen-strong bg-gradient-to-br from-surface-raised to-surface p-6 sm:p-8">
          <p className="label-caps">Ready to register?</p>
          <p className="mt-2 max-w-lg text-muted">
            Early bird registration is open. Rank your committee preferences and note your preferred country or portfolio on the form — allocations are confirmed after review.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to={EARLY_BIRD_REGISTER_PATH} className="btn-primary">
              Register now
            </Link>
            <Link to="/committees" className="btn-ghost">
              View committees
            </Link>
            <Link to="/" className="btn-ghost">
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </Shell>
  )
}
