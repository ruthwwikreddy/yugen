/** UPI deep-link helpers — tuned for GPay, PhonePe, Paytm tn/tr prefill. */

export type UpiPaymentParams = {
  vpa: string
  payeeName: string
  amount: number
  note: string
  transactionRef?: string
  currency?: string
}

export type UpiAppScheme = 'upi' | 'gpay' | 'phonepe' | 'paytm'

/** Digits, letters, dots, hyphens before @; bank handle after @ (e.g. 7842906633@ybl). */
const UPI_VPA_PATTERN = /^[a-z0-9._-]+@[a-z0-9._-]+$/i

const SCHEME_PREFIX: Record<UpiAppScheme, string> = {
  upi: 'upi://pay?',
  gpay: 'tez://upi/pay?',
  phonepe: 'phonepe://pay?',
  paytm: 'paytmmp://pay?',
}

/** Percent-encode a UPI query value (%20 for spaces, not +). */
export function encodeUpiValue(value: string): string {
  return encodeURIComponent(value.trim())
}

/** Always encode tn/tr — Google Pay rejects or ignores unencoded values. */
export function encodeUpiNote(value: string): string {
  const trimmed = value.trim().slice(0, 50)
  if (!trimmed) return ''
  return encodeUpiValue(trimmed)
}

export function isValidUpiVpa(vpa: string): boolean {
  return UPI_VPA_PATTERN.test(vpa.trim())
}

/** Compact note for UPI QR — alphanumeric only, no hyphens/spaces (best tn prefill rate). */
export function buildUpiPaymentNote(registrationId: string): string {
  return registrationId.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
}

/** Human-readable ID shown alongside the compact payment note. */
export function formatRegistrationIdDisplay(registrationId: string): string {
  return registrationId.trim().toUpperCase()
}

/** Normalize any note/ID for admin matching (YG6-EB-ABC123 ≡ YG6EBABC123). */
export function normalizeRegistrationRef(value: string): string {
  return value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
}

/** Build NPCI upi://pay URI. Includes tr + tn + mode=04 (intent) for max compatibility. */
export function buildUpiPayUri(params: UpiPaymentParams, scheme: UpiAppScheme = 'upi'): string {
  const vpa = params.vpa.trim()
  if (!vpa) {
    throw new Error('UPI ID is not configured')
  }

  const amount = Number(params.amount)
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Invalid payment amount')
  }

  const noteRaw = params.note.trim().slice(0, 50)
  const note = encodeUpiNote(noteRaw)
  const tr = encodeUpiNote((params.transactionRef ?? params.note).trim().slice(0, 50))
  const payeeName = params.payeeName.trim().slice(0, 99)
  const currency = (params.currency ?? 'INR').toUpperCase()

  // NPCI order: pa → pn → tr → tn → am → cu → mode
  const query = [
    `pa=${encodeUpiValue(vpa)}`,
    payeeName ? `pn=${encodeUpiValue(payeeName)}` : '',
    tr ? `tr=${tr}` : '',
    note ? `tn=${note}` : '',
    `am=${amount.toFixed(2)}`,
    `cu=${currency}`,
    'mode=04',
  ]
    .filter(Boolean)
    .join('&')

  return `${SCHEME_PREFIX[scheme]}${query}`
}

export function buildRegistrationUpiUri(
  registrationId: string,
  options: { vpa: string; payeeName: string; amount: number },
  scheme: UpiAppScheme = 'upi',
): string {
  const note = buildUpiPaymentNote(registrationId)
  return buildUpiPayUri(
    {
      vpa: options.vpa,
      payeeName: options.payeeName,
      amount: options.amount,
      note,
      transactionRef: note,
    },
    scheme,
  )
}

export const UPI_APP_LINKS: { id: UpiAppScheme; label: string }[] = [
  { id: 'gpay', label: 'Google Pay' },
  { id: 'phonepe', label: 'PhonePe' },
  { id: 'paytm', label: 'Paytm' },
]
