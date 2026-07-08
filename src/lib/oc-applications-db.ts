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
import type {
  OCApplication,
  OCApplicationInput,
  OCApplicationUpdate,
  CreateOCApplicationResult,
  OCApplicationStatus,
} from './oc-applications'
import { getFlowBySlug } from '../config/registrations'

const COLLECTION = 'oc_applications'
const ID_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateOCApplicationId(flowSlug: string): string {
  const flow = getFlowBySlug(flowSlug)
  const prefix = flow?.idPrefix ?? 'OC'
  let suffix = ''
  for (let i = 0; i < 6; i++) {
    suffix += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)]
  }
  return `YG6-${prefix}-${suffix}`
}

function sanitizeOCInput(input: OCApplicationInput): OCApplicationInput {
  return {
    roleId: input.roleId.trim(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    school: input.school.trim(),
    grade: input.grade.trim(),
    experience: input.experience.trim(),
    whyJoin: input.whyJoin.trim(),
    relevantSkills: input.relevantSkills.trim(),
    availability: input.availability.trim(),
    previousMunExperience: input.previousMunExperience.trim(),
    portfolioUrl: input.portfolioUrl?.trim() ?? '',
  }
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T
}

function toFirestorePayload(data: Partial<OCApplication> & { id: string }) {
  return stripUndefined({
    id: data.id,
    flowSlug: data.flowSlug,
    flowType: data.flowType,
    round: data.round,
    roleId: data.roleId,
    roleTitle: data.roleTitle,
    department: data.department,
    name: data.name,
    email: data.email,
    phone: data.phone,
    school: data.school,
    grade: data.grade,
    experience: data.experience,
    whyJoin: data.whyJoin,
    relevantSkills: data.relevantSkills,
    availability: data.availability,
    previousMunExperience: data.previousMunExperience,
    portfolioUrl: data.portfolioUrl,
    adminNotes: data.adminNotes ?? '',
    status: data.status,
    interviewScheduled: data.interviewScheduled,
    interviewDate: data.interviewDate,
    createdAt: data.createdAt ?? serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export function formatOCApplication(docData: Record<string, unknown>, id: string): OCApplication {
  return {
    id,
    flowSlug: String(docData.flowSlug ?? 'oc-r1'),
    flowType: 'oc',
    round: Number(docData.round ?? 1),
    roleId: String(docData.roleId ?? ''),
    roleTitle: String(docData.roleTitle ?? ''),
    department: String(docData.department ?? ''),
    name: String(docData.name ?? ''),
    email: String(docData.email ?? ''),
    phone: String(docData.phone ?? ''),
    school: String(docData.school ?? ''),
    grade: String(docData.grade ?? ''),
    experience: String(docData.experience ?? ''),
    whyJoin: String(docData.whyJoin ?? ''),
    relevantSkills: String(docData.relevantSkills ?? ''),
    availability: String(docData.availability ?? ''),
    previousMunExperience: String(docData.previousMunExperience ?? ''),
    portfolioUrl: String(docData.portfolioUrl ?? ''),
    adminNotes: String(docData.adminNotes ?? ''),
    status: (docData.status as OCApplicationStatus) ?? 'pending',
    interviewScheduled: Boolean(docData.interviewScheduled ?? false),
    interviewDate: (docData.interviewDate as string | undefined) ?? undefined,
    createdAt: (docData.createdAt as Timestamp | null) ?? null,
    updatedAt: (docData.updatedAt as Timestamp | null) ?? null,
  }
}

async function cloudWrite(data: Partial<OCApplication> & { id: string }): Promise<{ ok: boolean; warning?: string }> {
  if (!firebaseEnabled || !db) {
    return { ok: false, warning: 'Firebase not configured — saved locally only.' }
  }
  try {
    await setDoc(doc(db, COLLECTION, data.id), toFirestorePayload(data))
    return { ok: true }
  } catch (err) {
    if (isFirestoreDisabledError(err)) {
      return {
        ok: false,
        warning:
          'Firestore is not enabled on your Firebase project yet. Application saved locally — enable Firestore in Firebase console.',
      }
    }
    return { ok: false, warning: undefined }
  }
}

export async function createOCApplication(
  flowSlug: string,
  _roleId: string,
  roleTitle: string,
  department: string,
  input: OCApplicationInput,
): Promise<CreateOCApplicationResult> {
  const flow = getFlowBySlug(flowSlug)
  if (!flow || !flow.active) {
    throw new Error('This application round is not open.')
  }

  const clean = sanitizeOCInput(input)
  let id = generateOCApplicationId(flowSlug)

  if (firebaseEnabled && db) {
    for (let attempt = 0; attempt < 5; attempt++) {
      const existing = await getDoc(doc(db, COLLECTION, id)).catch(() => null)
      if (!existing?.exists()) break
      id = generateOCApplicationId(flowSlug)
    }
  }

  const application: OCApplication = {
    id,
    flowSlug,
    flowType: 'oc',
    round: flow.round,
    roleId: clean.roleId,
    roleTitle,
    department,
    name: clean.name,
    email: clean.email,
    phone: clean.phone,
    school: clean.school,
    grade: clean.grade,
    experience: clean.experience,
    whyJoin: clean.whyJoin,
    relevantSkills: clean.relevantSkills,
    availability: clean.availability,
    previousMunExperience: clean.previousMunExperience,
    portfolioUrl: clean.portfolioUrl || '',
    adminNotes: '',
    status: 'pending',
    interviewScheduled: false,
    createdAt: null,
    updatedAt: null,
  }

  const cloud = await cloudWrite(application)

  return {
    id,
    application,
    cloudSynced: cloud.ok,
    warning: cloud.warning,
  }
}

export async function getOCApplication(id: string): Promise<OCApplication | null> {
  if (!firebaseEnabled || !db) return null

  try {
    const snap = await getDoc(doc(db, COLLECTION, id))
    if (!snap.exists()) return null
    return formatOCApplication(snap.data(), snap.id)
  } catch {
    return null
  }
}

export async function updateOCApplication(id: string, patch: OCApplicationUpdate): Promise<void> {
  if (!firebaseEnabled || !db) return

  const clean: OCApplicationUpdate = { ...patch }
  if (patch.name) clean.name = patch.name.trim()
  if (patch.email) clean.email = patch.email.trim().toLowerCase()
  if (patch.phone) clean.phone = patch.phone.trim()
  if (patch.school) clean.school = patch.school.trim()
  if (patch.grade) clean.grade = patch.grade.trim()
  if (patch.experience) clean.experience = patch.experience.trim()
  if (patch.whyJoin) clean.whyJoin = patch.whyJoin.trim()
  if (patch.relevantSkills) clean.relevantSkills = patch.relevantSkills.trim()
  if (patch.availability) clean.availability = patch.availability.trim()
  if (patch.previousMunExperience) clean.previousMunExperience = patch.previousMunExperience.trim()
  if (patch.portfolioUrl !== undefined) clean.portfolioUrl = patch.portfolioUrl.trim()

  const updates: Record<string, unknown> = stripUndefined({ ...clean })
  updates.updatedAt = serverTimestamp()

  try {
    await updateDoc(doc(db, COLLECTION, id), updates)
  } catch {
    throw new Error('Failed to update application')
  }
}

export async function updateOCApplicationStatus(id: string, status: OCApplicationStatus): Promise<void> {
  await updateOCApplication(id, { status })
}

export async function scheduleInterview(id: string, date: string): Promise<void> {
  await updateOCApplication(id, { interviewScheduled: true, interviewDate: date, status: 'interview-scheduled' })
}

export async function acceptOCApplication(id: string, adminNotes?: string): Promise<void> {
  await updateOCApplication(id, { status: 'accepted', adminNotes })
}

export async function rejectOCApplication(id: string, adminNotes?: string): Promise<void> {
  await updateOCApplication(id, { status: 'rejected', adminNotes })
}

export async function waitlistOCApplication(id: string, adminNotes?: string): Promise<void> {
  await updateOCApplication(id, { status: 'waitlisted', adminNotes })
}

export async function deleteOCApplication(id: string): Promise<void> {
  if (!firebaseEnabled || !db) return

  try {
    await deleteDoc(doc(db, COLLECTION, id))
  } catch {
    throw new Error('Failed to delete application')
  }
}

export async function listOCApplications(filters?: {
  status?: OCApplicationStatus
  round?: number
  department?: string
}): Promise<OCApplication[]> {
  if (!firebaseEnabled || !db) return []

  try {
    let q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    const applications = snap.docs.map((d) => formatOCApplication(d.data(), d.id))

    if (filters) {
      return applications.filter((app) => {
        if (filters.status && app.status !== filters.status) return false
        if (filters.round && app.round !== filters.round) return false
        if (filters.department && app.department !== filters.department) return false
        return true
      })
    }

    return applications
  } catch {
    return []
  }
}

export async function getOCApplicationsByRound(round: number): Promise<OCApplication[]> {
  return listOCApplications({ round })
}

export async function getOCApplicationsByStatus(status: OCApplicationStatus): Promise<OCApplication[]> {
  return listOCApplications({ status })
}

export async function getOCApplicationsByDepartment(department: string): Promise<OCApplication[]> {
  return listOCApplications({ department })
}

export function getOCApplicationStats(applications: OCApplication[]) {
  return {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    underReview: applications.filter((a) => a.status === 'under-review').length,
    interviewScheduled: applications.filter((a) => a.status === 'interview-scheduled').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
    waitlisted: applications.filter((a) => a.status === 'waitlisted').length,
  }
}
