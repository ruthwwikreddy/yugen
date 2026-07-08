import { EARLY_BIRD_AMOUNT, type Registration, type RegistrationStatus } from './registration'

export const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? ''

const ADMIN_SESSION_KEY = 'yugen-admin-auth'

export function isAdminAuthed() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
}

export function setAdminAuthed(value: boolean) {
  if (value) sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
  else sessionStorage.removeItem(ADMIN_SESSION_KEY)
}

export type RegistrationStats = {
  total: number
  pending: number
  paid: number
  verified: number
  rejected: number
  revenueVerified: number
  revenuePending: number
  schools: number
  byGrade: Record<string, number>
  bySchool: Record<string, number>
  recent: Registration[]
  pendingPayments: Registration[]
}

export function computeStats(registrations: Registration[]): RegistrationStats {
  const byGrade: Record<string, number> = {}
  const bySchool: Record<string, number> = {}

  let pending = 0
  let paid = 0
  let verified = 0
  let rejected = 0

  for (const r of registrations) {
    if (r.status === 'pending') pending++
    if (r.status === 'paid') paid++
    if (r.status === 'verified') verified++
    if (r.status === 'rejected') rejected++

    byGrade[r.grade] = (byGrade[r.grade] ?? 0) + 1
    bySchool[r.school] = (bySchool[r.school] ?? 0) + 1
  }

  const pendingPayments = registrations.filter((r) => r.status === 'paid' || r.status === 'pending')

  return {
    total: registrations.length,
    pending,
    paid,
    verified,
    rejected,
    revenueVerified: verified * EARLY_BIRD_AMOUNT,
    revenuePending: (paid + pending) * EARLY_BIRD_AMOUNT,
    schools: Object.keys(bySchool).length,
    byGrade,
    bySchool,
    recent: registrations.slice(0, 8),
    pendingPayments: pendingPayments.slice(0, 10),
  }
}

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatTimestamp(ts: Registration['createdAt']) {
  if (!ts) return '—'
  return ts.toDate().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateShort(ts: Registration['createdAt']) {
  if (!ts) return '—'
  return ts.toDate().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short' })
}

export function exportRegistrationsCsv(registrations: Registration[]) {
  const headers = [
    'ID', 'Name', 'Email', 'Phone', 'School', 'Grade', 'Experience',
    'Committee', 'Dietary', 'Admin Notes', 'Amount', 'Status', 'Created', 'Paid At',
  ]

  const rows = registrations.map((r) => [
    r.id, r.name, r.email, r.phone, r.school, r.grade, r.experience,
    r.committeePreference, r.dietaryNotes, r.adminNotes,
    String(r.amount), r.status, formatTimestamp(r.createdAt), formatTimestamp(r.paidAt),
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `yugen-registrations-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export const STATUS_LABELS: Record<RegistrationStatus, string> = {
  pending: 'Pending payment',
  paid: 'Awaiting verification',
  verified: 'Verified',
  rejected: 'Rejected',
}

export const STATUS_COLORS: Record<RegistrationStatus, string> = {
  pending: 'border-yugen text-dim bg-surface',
  paid: 'border-amber-500/50 text-amber-200 bg-amber-950/30',
  verified: 'border-yugen-strong bg-yugen-white text-yugen-black',
  rejected: 'border-red-500/40 text-red-300 bg-red-950/30',
}
