import rawAllocations from '../data/allocationsData.json'

export type PublicAllocation = {
  id: string
  committeeId: string
  committeeAcronym: string
  committeeName: string
  portfolio: string
  partyCountry: string
  delegateName: string
  institution: string
  status: 'allocated' | 'vacant'
}

export const PUBLIC_ALLOCATIONS: PublicAllocation[] = rawAllocations as PublicAllocation[]

export function getAllocationsByCommittee(committeeId: string): PublicAllocation[] {
  if (committeeId === 'all') return PUBLIC_ALLOCATIONS
  return PUBLIC_ALLOCATIONS.filter((a) => a.committeeId === committeeId)
}

export function searchPublicAllocations(query: string, committeeId: string = 'all'): PublicAllocation[] {
  const list = getAllocationsByCommittee(committeeId)
  if (!query.trim()) return list
  
  const q = query.trim().toLowerCase()
  return list.filter(
    (a) =>
      a.delegateName.toLowerCase().includes(q) ||
      a.portfolio.toLowerCase().includes(q) ||
      a.partyCountry.toLowerCase().includes(q) ||
      a.institution.toLowerCase().includes(q) ||
      a.committeeAcronym.toLowerCase().includes(q) ||
      a.committeeName.toLowerCase().includes(q)
  )
}
