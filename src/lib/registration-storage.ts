import type { FlowConfig } from '../config/registrations'
import type { Registration, RegistrationInput, RegistrationStatus, RegistrationUpdate } from './registration-types'

const STORAGE_KEY = 'yugen-registrations-v2'

export type StoredRegistration = Registration & {
  createdAtMs: number
  paidAtMs: number | null
  allocatedAtMs: number | null
  syncedToCloud: boolean
}

function readAll(): Record<string, StoredRegistration> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      // migrate v1 if present
      const legacy = localStorage.getItem('yugen-registrations-v1')
      if (legacy) {
        const parsed = JSON.parse(legacy) as Record<string, StoredRegistration>
        writeAll(parsed)
        return parsed
      }
      return {}
    }
    return JSON.parse(raw) as Record<string, StoredRegistration>
  } catch {
    return {}
  }
}

function writeAll(data: Record<string, StoredRegistration>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function saveLocalRegistration(reg: StoredRegistration) {
  const all = readAll()
  all[reg.id] = reg
  writeAll(all)
}

export function getLocalRegistration(id: string): StoredRegistration | null {
  return readAll()[id] ?? null
}

export function listLocalRegistrations(): StoredRegistration[] {
  return Object.values(readAll()).sort((a, b) => b.createdAtMs - a.createdAtMs)
}

export function deleteLocalRegistration(id: string) {
  const all = readAll()
  delete all[id]
  writeAll(all)
}

export function updateLocalRegistration(id: string, patch: RegistrationUpdate) {
  const all = readAll()
  const reg = all[id]
  if (!reg) return
  Object.assign(reg, patch)
  if (patch.status === 'paid' || patch.status === 'verified') {
    reg.paidAtMs = Date.now()
  }
  if (patch.status === 'pending' || patch.status === 'rejected') {
    reg.paidAtMs = null
  }
  all[id] = reg
  writeAll(all)
}

export function updateLocalStatus(id: string, status: RegistrationStatus) {
  updateLocalRegistration(id, { status })
}

export function markLocalSynced(id: string) {
  const all = readAll()
  const reg = all[id]
  if (!reg) return
  reg.syncedToCloud = true
  all[id] = reg
  writeAll(all)
}

export function inputToStored(
  id: string,
  input: RegistrationInput,
  flow: FlowConfig,
): StoredRegistration {
  return {
    id,
    flowSlug: flow.slug,
    flowType: flow.type,
    round: flow.round,
    name: input.name,
    email: input.email,
    phone: input.phone,
    school: input.school,
    grade: input.grade,
    committeePreference: input.committeePreference ?? '',
    committeePreference2: input.committeePreference2 ?? '',
    committeePreference3: input.committeePreference3 ?? '',
    experience: input.experience,
    experienceDetails: input.experienceDetails ?? '',
    awardsAndAchievements: input.awardsAndAchievements ?? '',
    dietaryNotes: input.dietaryNotes ?? '',
    countryPreference: input.countryPreference ?? '',
    portfolioPreference: input.portfolioPreference ?? '',
    whyJoin: input.whyJoin ?? '',
    availability: input.availability ?? '',
    portfolioUrl: input.portfolioUrl ?? '',
    adminNotes: '',
    amount: flow.amount,
    paymentRequired: flow.paymentRequired,
    tier: flow.tier,
    status: 'pending',
    allocationStatus: 'unallocated',
    allocatedCommittee: undefined,
    allocatedCountry: undefined,
    allocationNotes: undefined,
    createdAt: null,
    paidAt: null,
    allocatedAt: undefined,
    createdAtMs: Date.now(),
    paidAtMs: null,
    allocatedAtMs: null,
    syncedToCloud: false,
  }
}

export function storedToRegistration(reg: StoredRegistration): Registration {
  return {
    id: reg.id,
    flowSlug: reg.flowSlug ?? 'delegate-r1-early-bird',
    flowType: reg.flowType ?? 'delegate',
    round: reg.round ?? 1,
    name: reg.name,
    email: reg.email,
    phone: reg.phone,
    school: reg.school,
    grade: reg.grade,
    committeePreference: reg.committeePreference ?? '',
    committeePreference2: reg.committeePreference2 ?? '',
    committeePreference3: reg.committeePreference3 ?? '',
    experience: reg.experience,
    experienceDetails: reg.experienceDetails ?? '',
    awardsAndAchievements: reg.awardsAndAchievements ?? '',
    dietaryNotes: reg.dietaryNotes ?? '',
    countryPreference: reg.countryPreference ?? '',
    portfolioPreference: reg.portfolioPreference ?? '',
    whyJoin: reg.whyJoin ?? '',
    availability: reg.availability ?? '',
    portfolioUrl: reg.portfolioUrl ?? '',
    adminNotes: reg.adminNotes ?? '',
    amount: reg.amount,
    paymentRequired: reg.paymentRequired ?? true,
    tier: reg.tier ?? 'early-bird',
    status: reg.status,
    allocationStatus: reg.allocationStatus ?? 'unallocated',
    allocatedCommittee: reg.allocatedCommittee,
    allocatedCountry: reg.allocatedCountry,
    allocationNotes: reg.allocationNotes,
    createdAt: null,
    paidAt: null,
    allocatedAt: reg.allocatedAt,
  }
}

/** Backfill legacy docs missing flow fields */
export function normalizeStored(reg: StoredRegistration): StoredRegistration {
  return {
    ...reg,
    flowSlug: reg.flowSlug ?? 'delegate-r1-early-bird',
    flowType: reg.flowType ?? 'delegate',
    round: reg.round ?? 1,
    paymentRequired: reg.paymentRequired ?? reg.amount > 0,
    whyJoin: reg.whyJoin ?? '',
    availability: reg.availability ?? '',
    portfolioUrl: reg.portfolioUrl ?? '',
    adminNotes: reg.adminNotes ?? '',
    committeePreference2: reg.committeePreference2 ?? '',
    committeePreference3: reg.committeePreference3 ?? '',
    experienceDetails: reg.experienceDetails ?? '',
    awardsAndAchievements: reg.awardsAndAchievements ?? '',
    countryPreference: reg.countryPreference ?? '',
    portfolioPreference: reg.portfolioPreference ?? '',
  }
}
