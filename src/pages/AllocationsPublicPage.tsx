import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { getCommittees } from '../lib/yugen'
import {
  PUBLIC_ALLOCATIONS,
  searchPublicAllocations,
} from '../lib/public-allocations'

export function AllocationsPublicPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCommittee = searchParams.get('committee') || 'all'
  const [selectedCommittee, setSelectedCommittee] = useState<string>(initialCommittee)
  const [searchQuery, setSearchQuery] = useState('')

  const committees = useMemo(() => getCommittees(), [])

  const filteredAllocations = useMemo(() => {
    return searchPublicAllocations(searchQuery, selectedCommittee)
  }, [searchQuery, selectedCommittee])

  const stats = useMemo(() => {
    const total = PUBLIC_ALLOCATIONS.length
    const filled = PUBLIC_ALLOCATIONS.filter((a) => a.status === 'allocated').length
    const vacant = total - filled
    return { total, filled, vacant }
  }, [])

  const handleCommitteeChange = (committeeId: string) => {
    setSelectedCommittee(committeeId)
    if (committeeId === 'all') {
      searchParams.delete('committee')
    } else {
      searchParams.set('committee', committeeId)
    }
    setSearchParams(searchParams)
  }

  return (
    <Shell>
      <SEO
        title="Delegate Allocations | Yūgen Summit 6.0"
        description="Search and view portfolio allocations for Yūgen Summit 6.0 delegates across all committees."
        path="/allocations"
      />

      <div className="section-padding mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="coming-soon-pill">Yūgen Summit 6.0</span>
            <h1 className="mt-4 section-title">Committee Allocations</h1>
            <p className="mt-2 text-muted max-w-2xl">
              Search by delegate name, portfolio, country/party, or institution to find your assigned committee seat.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/committees" className="btn-ghost text-xs">
              View Committees →
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-yugen bg-surface-raised p-4 text-center">
            <p className="text-2xl font-display text-yugen-white font-bold">{stats.filled}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Delegates Allocated</p>
          </div>
          <div className="rounded-xl border border-yugen bg-surface-raised p-4 text-center">
            <p className="text-2xl font-display text-accent-light font-bold">{stats.total}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Total Portfolios</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-xl border border-yugen bg-surface-raised p-4 text-center">
            <p className="text-2xl font-display text-dim font-bold">{stats.vacant}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Open / Unassigned</p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search delegate, portfolio, or school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-yugen bg-surface px-4 py-3 text-sm text-yugen-white placeholder-dim focus:border-accent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-dim hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Committee Tabs */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              type="button"
              onClick={() => handleCommitteeChange('all')}
              className={`rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCommittee === 'all'
                  ? 'bg-accent text-yugen-black'
                  : 'border border-yugen bg-surface text-muted hover:text-white'
              }`}
            >
              All Councils
            </button>
            {committees.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleCommitteeChange(c.id)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCommittee === c.id
                    ? 'bg-accent text-yugen-black'
                    : 'border border-yugen bg-surface text-muted hover:text-white'
                }`}
              >
                {c.acronym}
              </button>
            ))}
          </div>
        </div>

        {/* Allocations Table / Grid */}
        <div className="mt-6">
          {filteredAllocations.length === 0 ? (
            <div className="rounded-2xl border border-yugen bg-surface-raised p-12 text-center">
              <p className="text-lg font-bold text-yugen-white">No matching allocations found</p>
              <p className="mt-2 text-sm text-muted">
                Try adjusting your search terms or selecting a different committee.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-yugen bg-surface-raised">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-yugen bg-yugen-black text-xs font-semibold uppercase tracking-wider text-muted">
                    <tr>
                      <th className="px-5 py-4">Committee</th>
                      <th className="px-5 py-4">Portfolio / Position</th>
                      <th className="px-5 py-4">Party / Country</th>
                      <th className="px-5 py-4">Delegate Name</th>
                      <th className="px-5 py-4">Institution / School</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-yugen/40 text-muted">
                    {filteredAllocations.map((alloc) => {
                      const isVacant = alloc.status === 'vacant'
                      return (
                        <tr
                          key={alloc.id}
                          className="transition-colors hover:bg-surface/80"
                        >
                          <td className="whitespace-nowrap px-5 py-4">
                            <span className="inline-flex items-center rounded-md border border-yugen bg-yugen-black px-2.5 py-1 text-xs font-bold text-yugen-white">
                              {alloc.committeeAcronym}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-semibold text-yugen-white">
                            {alloc.portfolio}
                          </td>
                          <td className="px-5 py-4 text-xs text-dim">
                            {alloc.partyCountry || '—'}
                          </td>
                          <td className="px-5 py-4 font-medium">
                            {isVacant ? (
                              <span className="italic text-dim/60">Unassigned / Vacant</span>
                            ) : (
                              <span className="text-accent-light font-semibold">{alloc.delegateName}</span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-xs text-dim">
                            {alloc.institution || '—'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Shell>
  )
}
