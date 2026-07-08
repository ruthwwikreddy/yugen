import type { Registration, RegistrationInput, RegistrationStatus, RegistrationUpdate } from './registration'

const STORAGE_KEY = 'yugen-registrations-v1'

export type StoredRegistration = Registration & {
  createdAtMs: number
  paidAtMs: number | null
  syncedToCloud: boolean
}

function readAll(): Record<string, StoredRegistration> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
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

export function inputToStored(id: string, input: RegistrationInput, amount: number): StoredRegistration {
  return {
    id,
    ...input,
    committeePreference: input.committeePreference || '',
    dietaryNotes: input.dietaryNotes || '',
    adminNotes: '',
    amount,
    tier: 'early-bird',
    status: 'pending',
    createdAt: null,
    paidAt: null,
    createdAtMs: Date.now(),
    paidAtMs: null,
    syncedToCloud: false,
  }
}

export function storedToRegistration(reg: StoredRegistration): Registration {
  return {
    id: reg.id,
    name: reg.name,
    email: reg.email,
    phone: reg.phone,
    school: reg.school,
    grade: reg.grade,
    committeePreference: reg.committeePreference,
    experience: reg.experience,
    dietaryNotes: reg.dietaryNotes,
    adminNotes: reg.adminNotes ?? '',
    amount: reg.amount,
    tier: reg.tier,
    status: reg.status,
    createdAt: null,
    paidAt: null,
  }
}
