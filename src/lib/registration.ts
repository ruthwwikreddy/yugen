import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore'
import { db, firebaseEnabled } from './firebase'
import { isFirestoreDisabledError } from './firebase-errors'
import {
  buildRegistrationUpiUri,
  buildUpiPaymentNote,
  formatRegistrationIdDisplay,
  normalizeRegistrationRef,
} from './upi'
import { PAYMENT_CONFIG } from '../config/payment'
import { getFlowBySlug, type FlowConfig } from '../config/registrations'
import type {
  CreateRegistrationResult,
  Registration,
  RegistrationInput,
  RegistrationStatus,
  RegistrationUpdate,
} from './registration-types'
import {
  deleteLocalRegistration,
  getLocalRegistration,
  inputToStored,
  listLocalRegistrations,
  markLocalSynced,
  normalizeStored,
  saveLocalRegistration,
  storedToRegistration,
  updateLocalRegistration,
  updateLocalStatus,
  type StoredRegistration,
} from './registration-storage'

export type { Registration, RegistrationInput, RegistrationStatus, RegistrationUpdate, CreateRegistrationResult }

export const EARLY_BIRD_AMOUNT = PAYMENT_CONFIG.earlyBirdAmount
export const UPI_ID = PAYMENT_CONFIG.upiId
export const UPI_PAYEE_NAME = PAYMENT_CONFIG.payeeName

const COLLECTION = 'registrations'
const ID_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateRegistrationId(flow: FlowConfig) {
  let suffix = ''
  for (let i = 0; i < 6; i++) {
    suffix += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)]
  }
  // Keep legacy EB format for early bird backward compat
  if (flow.slug === 'delegate-r1-early-bird') {
    return `YG6-EB-${suffix}`
  }
  return `YG6-${flow.idPrefix}-${suffix}`
}

export function buildUpiUri(registrationId: string, amount = EARLY_BIRD_AMOUNT) {
  return buildRegistrationUpiUri(registrationId, {
    vpa: UPI_ID,
    payeeName: UPI_PAYEE_NAME,
    amount,
  })
}

export { buildUpiPaymentNote, formatRegistrationIdDisplay, normalizeRegistrationRef }

function sanitizeInput(input: RegistrationInput): RegistrationInput {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    school: input.school.trim(),
    grade: input.grade,
    committeePreference: (input.committeePreference || '').trim(),
    committeePreference2: (input.committeePreference2 || '').trim(),
    committeePreference3: (input.committeePreference3 || '').trim(),
    experience: input.experience,
    experienceDetails: (input.experienceDetails || '').trim(),
    awardsAndAchievements: (input.awardsAndAchievements || '').trim(),
    dietaryNotes: (input.dietaryNotes || '').trim(),
    countryPreference: (input.countryPreference || '').trim(),
    portfolioPreference: (input.portfolioPreference || '').trim(),
    whyJoin: (input.whyJoin || '').trim(),
    availability: (input.availability || '').trim(),
    portfolioUrl: (input.portfolioUrl || '').trim(),
  }
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T
}

function toFirestorePayload(stored: StoredRegistration) {
  return stripUndefined({
    id: stored.id,
    flowSlug: stored.flowSlug,
    flowType: stored.flowType,
    round: stored.round,
    name: stored.name,
    email: stored.email,
    phone: stored.phone,
    school: stored.school,
    grade: stored.grade,
    committeePreference: stored.committeePreference,
    committeePreference2: stored.committeePreference2,
    committeePreference3: stored.committeePreference3,
    experience: stored.experience,
    experienceDetails: stored.experienceDetails,
    awardsAndAchievements: stored.awardsAndAchievements,
    dietaryNotes: stored.dietaryNotes,
    countryPreference: stored.countryPreference,
    portfolioPreference: stored.portfolioPreference,
    whyJoin: stored.whyJoin,
    availability: stored.availability,
    portfolioUrl: stored.portfolioUrl,
    adminNotes: stored.adminNotes ?? '',
    amount: stored.amount,
    paymentRequired: stored.paymentRequired,
    tier: stored.tier,
    status: stored.status,
    allocationStatus: stored.allocationStatus,
    allocatedCommittee: stored.allocatedCommittee,
    allocatedCountry: stored.allocatedCountry,
    allocationNotes: stored.allocationNotes,
    createdAt: serverTimestamp(),
    paidAt: stored.paidAtMs ? new Date(stored.paidAtMs) : null,
    allocatedAt: stored.allocatedAtMs ? new Date(stored.allocatedAtMs) : null,
  })
}

export function formatRegistration(docData: Record<string, unknown>, id: string): Registration {
  const amount = Number(docData.amount ?? EARLY_BIRD_AMOUNT)
  return {
    id,
    flowSlug: String(docData.flowSlug ?? 'delegate-r1-early-bird'),
    flowType: (docData.flowType as Registration['flowType']) ?? 'delegate',
    round: Number(docData.round ?? 1),
    name: String(docData.name ?? ''),
    email: String(docData.email ?? ''),
    phone: String(docData.phone ?? ''),
    school: String(docData.school ?? ''),
    grade: String(docData.grade ?? ''),
    committeePreference: String(docData.committeePreference ?? ''),
    committeePreference2: String(docData.committeePreference2 ?? ''),
    committeePreference3: String(docData.committeePreference3 ?? ''),
    experience: String(docData.experience ?? ''),
    experienceDetails: String(docData.experienceDetails ?? ''),
    awardsAndAchievements: String(docData.awardsAndAchievements ?? ''),
    dietaryNotes: String(docData.dietaryNotes ?? ''),
    countryPreference: String(docData.countryPreference ?? ''),
    portfolioPreference: String(docData.portfolioPreference ?? ''),
    whyJoin: String(docData.whyJoin ?? ''),
    availability: String(docData.availability ?? ''),
    portfolioUrl: String(docData.portfolioUrl ?? ''),
    adminNotes: String(docData.adminNotes ?? ''),
    amount,
    paymentRequired: docData.paymentRequired !== undefined ? Boolean(docData.paymentRequired) : amount > 0,
    tier: String(docData.tier ?? 'early-bird'),
    status: (docData.status as RegistrationStatus) ?? 'pending',
    allocationStatus: (docData.allocationStatus as Registration['allocationStatus']) ?? 'unallocated',
    allocatedCommittee: (docData.allocatedCommittee as string | undefined) ?? undefined,
    allocatedCountry: (docData.allocatedCountry as string | undefined) ?? undefined,
    allocationNotes: (docData.allocationNotes as string | undefined) ?? undefined,
    createdAt: (docData.createdAt as Timestamp | null) ?? null,
    paidAt: (docData.paidAt as Timestamp | null) ?? null,
    allocatedAt: (docData.allocatedAt as Timestamp | null | undefined) ?? undefined,
  }
}

async function cloudWrite(stored: StoredRegistration): Promise<{ ok: boolean; warning?: string }> {
  if (!firebaseEnabled || !db) {
    return { ok: false, warning: 'Firebase not configured — saved locally only.' }
  }
  try {
    await setDoc(doc(db, COLLECTION, stored.id), toFirestorePayload(stored))
    markLocalSynced(stored.id)
    return { ok: true }
  } catch (err) {
    if (isFirestoreDisabledError(err)) {
      return {
        ok: false,
        warning:
          'Firestore is not enabled on your Firebase project yet. Registration saved locally — enable Firestore in Firebase console.',
      }
    }
    return { ok: false, warning: undefined }
  }
}

export async function createRegistration(
  flowSlug: string,
  input: RegistrationInput,
): Promise<CreateRegistrationResult> {
  const flow = getFlowBySlug(flowSlug)
  if (!flow || !flow.active) {
    throw new Error('This registration round is not open.')
  }

  const clean = sanitizeInput(input)
  let id = generateRegistrationId(flow)

  if (firebaseEnabled && db) {
    for (let attempt = 0; attempt < 5; attempt++) {
      const existing = await getDoc(doc(db, COLLECTION, id)).catch(() => null)
      if (!existing?.exists()) break
      id = generateRegistrationId(flow)
    }
  }

  const stored = inputToStored(id, clean, flow)
  saveLocalRegistration(stored)

  const cloud = await cloudWrite(stored)
  const registration = storedToRegistration(stored)

  return {
    id,
    registration,
    cloudSynced: cloud.ok,
    warning: cloud.warning,
  }
}

export async function getRegistration(id: string): Promise<Registration | null> {
  const local = getLocalRegistration(id)
  if (local) return storedToRegistration(normalizeStored(local))

  if (!firebaseEnabled || !db) return null

  try {
    const snap = await getDoc(doc(db, COLLECTION, id))
    if (!snap.exists()) return null
    return formatRegistration(snap.data(), snap.id)
  } catch {
    return null
  }
}

export async function markRegistrationPaid(id: string): Promise<{ cloudSynced: boolean }> {
  updateLocalStatus(id, 'paid')
  const local = getLocalRegistration(id)

  if (!firebaseEnabled || !db || !local) {
    return { cloudSynced: false }
  }

  try {
    await updateDoc(doc(db, COLLECTION, id), {
      status: 'paid',
      paidAt: serverTimestamp(),
    })
    markLocalSynced(id)
    return { cloudSynced: true }
  } catch {
    return { cloudSynced: false }
  }
}

export async function updateRegistrationStatus(id: string, status: RegistrationStatus) {
  updateLocalStatus(id, status)

  if (!firebaseEnabled || !db) return

  const updates: Record<string, unknown> = { status }
  if (status === 'paid' || status === 'verified') {
    updates.paidAt = serverTimestamp()
  }
  if (status === 'pending' || status === 'rejected') {
    updates.paidAt = null
  }

  try {
    await updateDoc(doc(db, COLLECTION, id), updates)
    markLocalSynced(id)
  } catch {
    // local already updated
  }
}

export async function acceptPayment(id: string) {
  await updateRegistrationStatus(id, 'verified')
}

export async function acceptApplication(id: string) {
  await updateRegistrationStatus(id, 'verified')
}

export async function rejectPayment(id: string, adminNotes?: string) {
  if (adminNotes) {
    await updateRegistration(id, { status: 'rejected', adminNotes })
  } else {
    await updateRegistrationStatus(id, 'rejected')
  }
}

export async function rejectApplication(id: string, adminNotes?: string) {
  await rejectPayment(id, adminNotes)
}

export async function updateRegistration(id: string, patch: RegistrationUpdate) {
  const clean: RegistrationUpdate = { ...patch }
  if (patch.name) clean.name = patch.name.trim()
  if (patch.email) clean.email = patch.email.trim().toLowerCase()
  if (patch.phone) clean.phone = patch.phone.trim()
  if (patch.school) clean.school = patch.school.trim()
  if (patch.committeePreference !== undefined) clean.committeePreference = patch.committeePreference.trim()
  if (patch.committeePreference2 !== undefined) clean.committeePreference2 = patch.committeePreference2.trim()
  if (patch.committeePreference3 !== undefined) clean.committeePreference3 = patch.committeePreference3.trim()
  if (patch.experienceDetails !== undefined) clean.experienceDetails = patch.experienceDetails.trim()
  if (patch.awardsAndAchievements !== undefined) clean.awardsAndAchievements = patch.awardsAndAchievements.trim()
  if (patch.dietaryNotes !== undefined) clean.dietaryNotes = patch.dietaryNotes.trim()
  if (patch.countryPreference !== undefined) clean.countryPreference = patch.countryPreference.trim()
  if (patch.portfolioPreference !== undefined) clean.portfolioPreference = patch.portfolioPreference.trim()
  if (patch.whyJoin !== undefined) clean.whyJoin = patch.whyJoin.trim()
  if (patch.availability !== undefined) clean.availability = patch.availability.trim()
  if (patch.portfolioUrl !== undefined) clean.portfolioUrl = patch.portfolioUrl.trim()

  updateLocalRegistration(id, clean)

  if (!firebaseEnabled || !db) return

  const updates: Record<string, unknown> = stripUndefined({ ...clean })
  if (clean.status === 'paid' || clean.status === 'verified') {
    updates.paidAt = serverTimestamp()
  }
  if (clean.status === 'pending' || clean.status === 'rejected') {
    updates.paidAt = null
  }
  if (clean.allocationStatus === 'allocated') {
    updates.allocatedAt = serverTimestamp()
  }
  if (clean.allocationStatus === 'unallocated' || clean.allocationStatus === 'waitlisted') {
    updates.allocatedAt = null
  }

  try {
    await updateDoc(doc(db, COLLECTION, id), updates)
    markLocalSynced(id)
  } catch {
    // local already updated
  }
}

export async function allocateCommittee(
  id: string,
  committee: string,
  country?: string,
  notes?: string,
): Promise<void> {
  await updateRegistration(id, {
    allocationStatus: 'allocated',
    allocatedCommittee: committee,
    allocatedCountry: country,
    allocationNotes: notes,
  })
}

export async function waitlistDelegate(id: string, notes?: string): Promise<void> {
  await updateRegistration(id, {
    allocationStatus: 'waitlisted',
    allocatedCommittee: undefined,
    allocatedCountry: undefined,
    allocationNotes: notes,
  })
}

export async function deallocateDelegate(id: string): Promise<void> {
  await updateRegistration(id, {
    allocationStatus: 'unallocated',
    allocatedCommittee: undefined,
    allocatedCountry: undefined,
    allocationNotes: undefined,
  })
}

export async function deleteRegistration(id: string) {
  deleteLocalRegistration(id)

  if (!firebaseEnabled || !db) return

  try {
    await deleteDoc(doc(db, COLLECTION, id))
  } catch {
    // local already deleted
  }
}

export async function listRegistrations(): Promise<Registration[]> {
  const local = listLocalRegistrations().map(normalizeStored)
  const byId = new Map<string, Registration>(local.map((r) => [r.id, storedToRegistration(r)]))

  if (!firebaseEnabled || !db) {
    return [...byId.values()]
  }

  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    for (const d of snap.docs) {
      byId.set(d.id, formatRegistration(d.data(), d.id))
    }
  } catch {
    try {
      const snap = await getDocs(collection(db, COLLECTION))
      for (const d of snap.docs) {
        byId.set(d.id, formatRegistration(d.data(), d.id))
      }
    } catch {
      // use local only
    }
  }

  return [...byId.values()].sort((a, b) => {
    const aTime = local.find((r) => r.id === a.id)?.createdAtMs ?? a.createdAt?.toMillis() ?? 0
    const bTime = local.find((r) => r.id === b.id)?.createdAtMs ?? b.createdAt?.toMillis() ?? 0
    return bTime - aTime
  })
}

export async function syncPendingToCloud(): Promise<number> {
  if (!firebaseEnabled || !db) return 0

  let synced = 0
  for (const stored of listLocalRegistrations()) {
    if (stored.syncedToCloud) continue
    try {
      await setDoc(doc(db, COLLECTION, normalizeStored(stored).id), toFirestorePayload(normalizeStored(stored)), {
        merge: true,
      })
      markLocalSynced(stored.id)
      synced++
    } catch {
      // skip
    }
  }
  return synced
}

export function getFlowLabel(reg: Registration): string {
  const flow = getFlowBySlug(reg.flowSlug)
  if (flow) return flow.eyebrow
  return `${reg.flowType} · Round ${reg.round}`
}
