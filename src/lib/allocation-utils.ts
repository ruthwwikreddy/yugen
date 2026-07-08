import type { Registration } from './registration'
import type { Committee } from './yugen'
import { getCommittees } from './yugen'

export type CommitteeAllocationStats = {
  committee: Committee
  allocated: number
  allocatedDelegates: Registration[]
  preferenceCount: number
}

export function getCommitteePreferences(reg: Pick<Registration, 'committeePreference' | 'committeePreference2' | 'committeePreference3'>): string[] {
  return [reg.committeePreference, reg.committeePreference2, reg.committeePreference3].filter(Boolean)
}

export function matchesAnyCommitteePreference(
  reg: Pick<Registration, 'committeePreference' | 'committeePreference2' | 'committeePreference3'>,
  committee: Committee,
): boolean {
  return getCommitteePreferences(reg).some((pref) => matchesCommittee(pref, committee))
}

export function formatCommitteePreferencesDisplay(
  reg: Pick<Registration, 'committeePreference' | 'committeePreference2' | 'committeePreference3'>,
  committees: Committee[],
): string {
  const prefs = getCommitteePreferences(reg)
  if (!prefs.length) return '—'
  return prefs
    .map((p) => committees.find((c) => matchesCommittee(p, c))?.acronym ?? p)
    .join(' → ')
}

export function getCommitteeAllocationStats(registrations: Registration[]): CommitteeAllocationStats[] {
  const committees = getCommittees()
  return committees.map((committee) => ({
    committee,
    allocated: registrations.filter((r) => matchesCommittee(r.allocatedCommittee, committee)).length,
    allocatedDelegates: registrations.filter(
      (r) => r.allocationStatus === 'allocated' && matchesCommittee(r.allocatedCommittee, committee)
    ),
    preferenceCount: registrations.filter((r) => matchesAnyCommitteePreference(r, committee)).length,
  }))
}

export function matchesCommittee(value: string | undefined, committee: Committee): boolean {
  if (!value?.trim()) return false
  const normalized = value.trim().toLowerCase()
  return (
    normalized === committee.name.toLowerCase() ||
    normalized === committee.id.toLowerCase() ||
    normalized === committee.acronym.toLowerCase() ||
    committee.name.toLowerCase().includes(normalized) ||
    normalized.includes(committee.name.toLowerCase())
  )
}

export function filterByCommittee(registrations: Registration[], committeeId: string | 'all'): Registration[] {
  if (committeeId === 'all') return registrations
  const committee = getCommittees().find((c) => c.id === committeeId)
  if (!committee) return registrations
  return registrations.filter(
    (r) =>
      matchesCommittee(r.allocatedCommittee, committee) ||
      matchesAnyCommitteePreference(r, committee)
  )
}

export function parseCommitteeCapacity(capacity: string): number | null {
  const n = parseInt(capacity, 10)
  return Number.isFinite(n) && n > 0 ? n : null
}

export function searchAllocations(registrations: Registration[], query: string): Registration[] {
  const q = query.trim().toLowerCase()
  if (!q) return registrations
  return registrations.filter((r) =>
    [r.id, r.name, r.email, r.school, r.grade, r.committeePreference, r.committeePreference2, r.committeePreference3, r.countryPreference, r.portfolioPreference, r.experienceDetails, r.awardsAndAchievements, r.allocatedCommittee, r.allocatedCountry, r.allocationNotes]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(q))
  )
}

export type AllocationSort = 'name' | 'school' | 'committee' | 'status' | 'newest' | 'preference'

export function sortAllocations(registrations: Registration[], sortBy: AllocationSort): Registration[] {
  const list = [...registrations]
  list.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'school':
        return a.school.localeCompare(b.school) || a.name.localeCompare(b.name)
      case 'committee':
        return (a.allocatedCommittee ?? '').localeCompare(b.allocatedCommittee ?? '') || a.name.localeCompare(b.name)
      case 'status':
        return a.allocationStatus.localeCompare(b.allocationStatus) || a.name.localeCompare(b.name)
      case 'preference':
        return (a.committeePreference ?? '').localeCompare(b.committeePreference ?? '') || a.name.localeCompare(b.name)
      case 'newest':
      default: {
        const aTime = a.allocatedAt?.toMillis() ?? a.createdAt?.toMillis() ?? 0
        const bTime = b.allocatedAt?.toMillis() ?? b.createdAt?.toMillis() ?? 0
        return bTime - aTime
      }
    }
  })
  return list
}

export function getCommitteeForRegistration(
  registrations: Registration[],
  committee: Committee
): {
  allocated: Registration[]
  preferences: Registration[]
  unallocatedPreferences: Registration[]
  remaining: number | null
} {
  const capacity = parseCommitteeCapacity(committee.delegateCapacity)
  const allocated = registrations.filter(
    (r) => r.allocationStatus === 'allocated' && matchesCommittee(r.allocatedCommittee, committee)
  )
  const preferences = registrations.filter((r) => matchesAnyCommitteePreference(r, committee))
  const unallocatedPreferences = preferences.filter((r) => r.allocationStatus !== 'allocated')
  return {
    allocated,
    preferences,
    unallocatedPreferences,
    remaining: capacity !== null ? Math.max(0, capacity - allocated.length) : null,
  }
}
