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
  deleteLocalRegistration,
  getLocalRegistration,
  inputToStored,
  listLocalRegistrations,
  markLocalSynced,
  saveLocalRegistration,
  storedToRegistration,
  updateLocalRegistration,
  updateLocalStatus,
  type StoredRegistration,
} from './registration-storage'

export const EARLY_BIRD_AMOUNT = Number(import.meta.env.VITE_EARLY_BIRD_AMOUNT) || 1200
export const UPI_ID = import.meta.env.VITE_UPI_ID ?? ''
export const UPI_PAYEE_NAME = import.meta.env.VITE_UPI_PAYEE_NAME ?? 'Yugen Summit'

export type RegistrationStatus = 'pending' | 'paid' | 'verified' | 'rejected'

export type Registration = {
  id: string
  name: string
  email: string
  phone: string
  school: string
  grade: string
  committeePreference: string
  experience: string
  dietaryNotes: string
  adminNotes: string
  amount: number
  tier: 'early-bird'
  status: RegistrationStatus
  createdAt: Timestamp | null
  paidAt: Timestamp | null
}

export type RegistrationInput = Omit<
  Registration,
  'id' | 'amount' | 'tier' | 'status' | 'createdAt' | 'paidAt' | 'adminNotes'
>

export type RegistrationUpdate = Partial<RegistrationInput> & {
  adminNotes?: string
  status?: RegistrationStatus
}

export type CreateRegistrationResult = {
  id: string
  registration: Registration
  cloudSynced: boolean
  warning?: string
}

const COLLECTION = 'registrations'
const ID_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateRegistrationId() {
  let suffix = ''
  for (let i = 0; i < 6; i++) {
    suffix += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)]
  }
  return `YG6-EB-${suffix}`
}

export function buildUpiUri(registrationId: string) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE_NAME,
    am: EARLY_BIRD_AMOUNT.toFixed(2),
    cu: 'INR',
    tn: `Yugen6 ${registrationId}`,
  })
  return `upi://pay?${params.toString()}`
}

function sanitizeInput(input: RegistrationInput): RegistrationInput {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    school: input.school.trim(),
    grade: input.grade,
    committeePreference: (input.committeePreference || '').trim(),
    experience: input.experience,
    dietaryNotes: (input.dietaryNotes || '').trim(),
  }
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T
}

function toFirestorePayload(stored: StoredRegistration) {
  return stripUndefined({
    id: stored.id,
    name: stored.name,
    email: stored.email,
    phone: stored.phone,
    school: stored.school,
    grade: stored.grade,
    committeePreference: stored.committeePreference,
    experience: stored.experience,
    dietaryNotes: stored.dietaryNotes,
    adminNotes: stored.adminNotes ?? '',
    amount: stored.amount,
    tier: stored.tier,
    status: stored.status,
    createdAt: serverTimestamp(),
    paidAt: stored.paidAtMs ? new Date(stored.paidAtMs) : null,
  })
}

export function formatRegistration(docData: Record<string, unknown>, id: string): Registration {
  return {
    id,
    name: String(docData.name ?? ''),
    email: String(docData.email ?? ''),
    phone: String(docData.phone ?? ''),
    school: String(docData.school ?? ''),
    grade: String(docData.grade ?? ''),
    committeePreference: String(docData.committeePreference ?? ''),
    experience: String(docData.experience ?? ''),
    dietaryNotes: String(docData.dietaryNotes ?? ''),
    adminNotes: String(docData.adminNotes ?? ''),
    amount: Number(docData.amount ?? EARLY_BIRD_AMOUNT),
    tier: 'early-bird',
    status: (docData.status as RegistrationStatus) ?? 'pending',
    createdAt: (docData.createdAt as Timestamp | null) ?? null,
    paidAt: (docData.paidAt as Timestamp | null) ?? null,
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

export async function createRegistration(input: RegistrationInput): Promise<CreateRegistrationResult> {
  const clean = sanitizeInput(input)
  let id = generateRegistrationId()

  if (firebaseEnabled && db) {
    for (let attempt = 0; attempt < 5; attempt++) {
      const existing = await getDoc(doc(db, COLLECTION, id)).catch(() => null)
      if (!existing?.exists()) break
      id = generateRegistrationId()
    }
  }

  const stored = inputToStored(id, clean, EARLY_BIRD_AMOUNT)
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
  if (local) return storedToRegistration(local)

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

export async function rejectPayment(id: string, adminNotes?: string) {
  if (adminNotes) {
    await updateRegistration(id, { status: 'rejected', adminNotes })
  } else {
    await updateRegistrationStatus(id, 'rejected')
  }
}

export async function updateRegistration(id: string, patch: RegistrationUpdate) {
  const clean: RegistrationUpdate = { ...patch }
  if (patch.name) clean.name = patch.name.trim()
  if (patch.email) clean.email = patch.email.trim().toLowerCase()
  if (patch.phone) clean.phone = patch.phone.trim()
  if (patch.school) clean.school = patch.school.trim()
  if (patch.committeePreference !== undefined) clean.committeePreference = patch.committeePreference.trim()
  if (patch.dietaryNotes !== undefined) clean.dietaryNotes = patch.dietaryNotes.trim()

  updateLocalRegistration(id, clean)

  if (!firebaseEnabled || !db) return

  const updates: Record<string, unknown> = stripUndefined({ ...clean })
  if (clean.status === 'paid' || clean.status === 'verified') {
    updates.paidAt = serverTimestamp()
  }
  if (clean.status === 'pending' || clean.status === 'rejected') {
    updates.paidAt = null
  }

  try {
    await updateDoc(doc(db, COLLECTION, id), updates)
    markLocalSynced(id)
  } catch {
    // local already updated
  }
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
  const local = listLocalRegistrations()
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
      await setDoc(doc(db, COLLECTION, stored.id), toFirestorePayload(stored), { merge: true })
      markLocalSynced(stored.id)
      synced++
    } catch {
      // skip
    }
  }
  return synced
}
