import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import QRCode from 'react-qr-code'
import {
  buildUpiPaymentNote,
  buildUpiUri,
  EARLY_BIRD_AMOUNT,
  formatRegistrationIdDisplay,
  markRegistrationPaid,
  UPI_ID,
  UPI_PAYEE_NAME,
} from '../../lib/registration'
import { buildRegistrationUpiUri, isValidUpiVpa, UPI_APP_LINKS, type UpiAppScheme } from '../../lib/upi'
import { CopyButton, RegistrationBanner } from './RegistrationWizard'

type UpiPaymentStepProps = {
  registrationId: string
  delegateName?: string
  onPaid: (cloudSynced: boolean) => void
}

function useQrSize() {
  const [size, setSize] = useState(240)

  useEffect(() => {
    function update() {
      const w = window.innerWidth
      setSize(Math.min(280, Math.max(200, w - 96)))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return size
}

export function UpiPaymentStep({ registrationId, delegateName, onPaid }: UpiPaymentStepProps) {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')
  const [syncWarning, setSyncWarning] = useState('')
  const [noteCopied, setNoteCopied] = useState(false)
  const qrSize = useQrSize()

  const displayId = formatRegistrationIdDisplay(registrationId)
  const upiNote = buildUpiPaymentNote(registrationId)
  const upiValid = Boolean(UPI_ID) && isValidUpiVpa(UPI_ID)

  const upiUri = useMemo(() => {
    if (!upiValid) return ''
    try {
      return buildUpiUri(registrationId)
    } catch {
      return ''
    }
  }, [registrationId, upiValid])

  async function handlePaid() {
    setStatus('loading')
    const result = await markRegistrationPaid(registrationId)
    if (!result.cloudSynced) {
      setSyncWarning('Payment recorded locally. Cloud sync pending — your ID is still valid.')
    }
    onPaid(result.cloudSynced)
  }

  function openUpiApp(scheme: UpiAppScheme = 'upi') {
    if (!upiValid) return
    try {
      const uri =
        scheme === 'upi'
          ? upiUri
          : buildRegistrationUpiUri(registrationId, {
              vpa: UPI_ID,
              payeeName: UPI_PAYEE_NAME,
              amount: EARLY_BIRD_AMOUNT,
            }, scheme)
      if (uri) window.location.href = uri
    } catch {
      /* ignore */
    }
  }

  async function copyNoteFirst() {
    await navigator.clipboard.writeText(upiNote)
    setNoteCopied(true)
    setTimeout(() => setNoteCopied(false), 2500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 pb-28 sm:space-y-6 sm:pb-2"
    >
      {delegateName && (
        <p className="text-sm leading-relaxed text-muted">
          Almost there, <span className="text-yugen-white">{delegateName}</span> — complete your UPI payment below.
        </p>
      )}

      {/* Required note — must be visible before scanning */}
      <div className="rounded-2xl border-2 border-yellow-500/40 bg-yellow-500/10 p-4 sm:p-5">
        <p className="label-caps text-yellow-200">Required · payment note / remark</p>
        <p className="mt-2 text-xs leading-relaxed text-yellow-100/80">
          Most UPI apps do <strong className="text-yellow-50">not</strong> auto-fill the remark for person-to-person
          payments. Copy this note first, then paste it into the remark field after scanning.
        </p>
        <div className="mt-4 rounded-xl border border-yellow-500/30 bg-yugen-black/60 p-4">
          <p className="break-all font-mono text-lg font-bold tracking-wider text-yugen-white sm:text-xl md:text-2xl">{upiNote}</p>
          <p className="mt-2 text-[11px] text-yellow-100/60">Registration ID: {displayId}</p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button type="button" onClick={copyNoteFirst} className="btn-primary w-full">
            {noteCopied ? 'Note copied ✓' : '1. Copy payment note'}
          </button>
          <CopyButton text={displayId} label="Copy full ID" className="btn-ghost w-full" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-yugen bg-surface-raised">
        <div className="border-b border-yugen bg-surface px-4 py-4 sm:px-6">
          <p className="label-caps">Step 2 · UPI payment</p>
          <h2 className="mt-1 font-heading text-xl font-bold sm:text-2xl">
            Pay ₹{EARLY_BIRD_AMOUNT.toLocaleString('en-IN')}
          </h2>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {!UPI_ID ? (
            <RegistrationBanner type="error" message="UPI ID is not configured. Contact the secretariat." />
          ) : !upiValid ? (
            <RegistrationBanner
              type="error"
              message={`UPI ID "${UPI_ID}" looks invalid. Expected format: name@bank (e.g. 9876543210@ybl).`}
            />
          ) : !upiUri ? (
            <RegistrationBanner type="error" message="Could not generate payment QR. Contact the secretariat." />
          ) : (
            <div className="flex flex-col items-center gap-5 sm:gap-6">
              <ol className="w-full space-y-2 rounded-xl border border-yugen bg-yugen-black p-4 text-xs leading-relaxed text-muted">
                <li>
                  <span className="text-yugen-white">1.</span> Tap <strong className="text-yugen-white">Copy payment note</strong>{' '}
                  above
                </li>
                <li>
                  <span className="text-yugen-white">2.</span> Scan the QR or open your UPI app
                </li>
                <li>
                  <span className="text-yugen-white">3.</span> Paste <strong className="font-mono text-yugen-white">{upiNote}</strong>{' '}
                  into the remark / note field if empty
                </li>
                <li>
                  <span className="text-yugen-white">4.</span> Confirm ₹{EARLY_BIRD_AMOUNT.toLocaleString('en-IN')} and pay
                </li>
              </ol>

              <div className="w-full max-w-[min(100%,280px)] rounded-2xl bg-white p-3 shadow-lg shadow-black/20 sm:max-w-[min(100%,300px)] sm:p-6">
                <QRCode
                  value={upiUri}
                  size={qrSize}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#000000"
                  title={`Pay ₹${EARLY_BIRD_AMOUNT} to ${UPI_PAYEE_NAME}`}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                />
              </div>

              <p className="text-center text-xs text-dim">
                Amount & payee pre-fill from QR · remark usually needs manual paste
              </p>

              <div className="grid w-full gap-3 rounded-xl border border-yugen bg-yugen-black p-4 text-sm">
                <Row label="Amount" value={`₹${EARLY_BIRD_AMOUNT.toLocaleString('en-IN')}`} bold />
                <Row label="Payee" value={UPI_PAYEE_NAME} />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-dim">UPI ID</p>
                    <p className="break-all font-mono text-xs">{UPI_ID}</p>
                  </div>
                  <CopyButton text={UPI_ID} label="Copy UPI ID" className="btn-ghost w-full sm:w-auto" />
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <button type="button" onClick={() => openUpiApp('upi')} className="btn-primary w-full">
                  Open UPI app
                </button>
                <CopyButton text={upiNote} label="Copy note again" className="btn-ghost w-full" />
              </div>

              <div className="grid w-full grid-cols-3 gap-2">
                {UPI_APP_LINKS.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => openUpiApp(app.id)}
                    className="btn-ghost min-h-11 w-full px-1.5 text-[11px] sm:px-2 sm:text-[10px]"
                  >
                    {app.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-yugen-strong bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="label-caps">Your registration ID</p>
            <p className="mt-2 break-all font-mono text-xl tracking-wider sm:text-2xl md:text-3xl">{displayId}</p>
          </div>
          <CopyButton text={displayId} label="Copy ID" className="btn-ghost w-full sm:w-auto" />
        </div>
      </div>

      <div className="mobile-sticky-bar -mx-4 sm:!static sm:mx-0">
        <button
          type="button"
          onClick={handlePaid}
          disabled={status === 'loading' || !upiUri}
          className="btn-primary w-full disabled:opacity-50"
        >
          {status === 'loading' ? 'Processing…' : "I've completed payment →"}
        </button>
      </div>

      {syncWarning && <RegistrationBanner type="warning" message={syncWarning} />}
    </motion.div>
  )
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="shrink-0 text-dim">{label}</span>
      <span className={`text-right ${bold ? 'font-semibold' : ''}`}>{value}</span>
    </div>
  )
}
