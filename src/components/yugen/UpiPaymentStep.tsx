import { useState } from 'react'
import { motion } from 'framer-motion'
import QRCode from 'react-qr-code'
import {
  buildUpiUri,
  EARLY_BIRD_AMOUNT,
  markRegistrationPaid,
  UPI_ID,
  UPI_PAYEE_NAME,
} from '../../lib/registration'
import { CopyButton, RegistrationBanner } from './RegistrationWizard'

type UpiPaymentStepProps = {
  registrationId: string
  delegateName?: string
  onPaid: (cloudSynced: boolean) => void
}

export function UpiPaymentStep({ registrationId, delegateName, onPaid }: UpiPaymentStepProps) {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')
  const [syncWarning, setSyncWarning] = useState('')
  const upiUri = buildUpiUri(registrationId)
  const upiNote = `Yugen6 ${registrationId}`

  async function handlePaid() {
    setStatus('loading')
    const result = await markRegistrationPaid(registrationId)
    if (!result.cloudSynced) {
      setSyncWarning('Payment recorded locally. Cloud sync pending — your ID is still valid.')
    }
    onPaid(result.cloudSynced)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {delegateName && (
        <p className="text-sm text-muted">
          Almost there, <span className="text-yugen-white">{delegateName}</span> — complete your UPI payment below.
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-yugen bg-surface-raised">
        <div className="border-b border-yugen bg-surface px-6 py-4">
          <p className="label-caps">Step 2 · UPI payment</p>
          <h2 className="mt-1 font-heading text-2xl font-bold">
            Pay ₹{EARLY_BIRD_AMOUNT.toLocaleString('en-IN')}
          </h2>
        </div>

        <div className="p-6 md:p-8">
          {!UPI_ID ? (
            <RegistrationBanner
              type="error"
              message="UPI ID is not configured. Contact the secretariat."
            />
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="relative rounded-2xl bg-white p-6 shadow-lg shadow-black/20">
                <QRCode value={upiUri} size={240} />
              </div>

              <div className="grid w-full max-w-sm gap-3 rounded-xl border border-yugen bg-yugen-black p-4 text-sm">
                <Row label="Amount" value={`₹${EARLY_BIRD_AMOUNT.toLocaleString('en-IN')}`} bold />
                <Row label="Payee" value={UPI_PAYEE_NAME} />
                <Row label="UPI ID" value={UPI_ID} mono />
                <div className="flex items-center justify-between gap-2 border-t border-yugen pt-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-dim">Payment note</p>
                    <p className="font-mono text-sm">{upiNote}</p>
                  </div>
                  <CopyButton text={upiNote} label="Copy" />
                </div>
              </div>

              <a
                href={upiUri}
                className="btn-ghost w-full max-w-sm justify-center text-center"
              >
                Open in UPI app
              </a>

              <p className="max-w-sm text-center text-xs text-dim">
                Do not change the amount or payment note — the note contains your registration ID for verification.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-yugen-strong bg-surface p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label-caps">Your registration ID</p>
            <p className="mt-2 font-mono text-2xl tracking-wider md:text-3xl">{registrationId}</p>
          </div>
          <CopyButton text={registrationId} label="Copy ID" />
        </div>
      </div>

      <button
        type="button"
        onClick={handlePaid}
        disabled={status === 'loading' || !UPI_ID}
        className="btn-primary w-full py-4 disabled:opacity-50"
      >
        {status === 'loading' ? 'Processing…' : "I've completed payment →"}
      </button>

      {syncWarning && <RegistrationBanner type="warning" message={syncWarning} />}
    </motion.div>
  )
}

function Row({ label, value, bold, mono }: { label: string; value: string; bold?: boolean; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-dim">{label}</span>
      <span className={`text-right ${bold ? 'font-semibold' : ''} ${mono ? 'font-mono text-xs' : ''}`}>{value}</span>
    </div>
  )
}
