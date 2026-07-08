/**
 * Payment config for early bird UPI.
 * Env vars override defaults. UPI ID is public (embedded in QR codes).
 */
const envUpiId = String(import.meta.env.VITE_UPI_ID ?? '').trim()
const envPayeeName = String(import.meta.env.VITE_UPI_PAYEE_NAME ?? '').trim()

export const PAYMENT_CONFIG = {
  upiId: envUpiId || '7842906633@ybl',
  payeeName: envPayeeName || 'Ruthwik Reddy',
  earlyBirdAmount: Number(import.meta.env.VITE_EARLY_BIRD_AMOUNT) || 1200,
} as const
