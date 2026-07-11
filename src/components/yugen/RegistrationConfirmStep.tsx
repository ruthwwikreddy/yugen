import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Registration } from '../../lib/registration'
import { YUGEN } from '../../lib/yugen'
import { CopyButton } from './RegistrationWizard'

type RegistrationConfirmStepProps = {
  registration: Registration
  cloudSynced?: boolean
}

export function RegistrationConfirmStep({ registration, cloudSynced }: RegistrationConfirmStepProps) {
  const [savedHint, setSavedHint] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="space-y-5 pb-6 sm:space-y-6 sm:pb-4"
    >
      <div className="overflow-hidden rounded-2xl border border-yugen-strong bg-surface-raised">
        <div className="border-b border-yugen bg-yugen-white px-4 py-3 text-center sm:px-6">
          <p className="font-heading text-xs font-bold uppercase tracking-wider text-yugen-black sm:text-sm">
            ✓ Registration submitted
          </p>
        </div>

        <div className="p-5 text-center sm:p-8">
          <p className="label-caps">Step 3 · Save this screen</p>
          <h2 className="mt-3 font-display text-2xl uppercase tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Screenshot this
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Keep a screenshot of your registration ID. The secretariat matches UPI payments using this ID.
          </p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-yugen-strong bg-yugen-black p-5 sm:mt-10 sm:p-8"
          >
            <p className="label-caps">Registration ID</p>
            <p className="mt-3 break-all font-mono text-2xl tracking-wider sm:text-3xl md:text-4xl">{registration.id}</p>
            <div className="mt-4 flex justify-center">
              <CopyButton text={registration.id} label="Copy ID" className="btn-ghost w-full max-w-xs sm:w-auto" />
            </div>

            <div className="mt-6 space-y-2.5 border-t border-yugen pt-5 text-left text-sm sm:mt-8 sm:pt-6">
              <InfoRow label="Name" value={registration.name} />
              <InfoRow label="School" value={registration.school} />
              <InfoRow label="Email" value={registration.email} breakAll />
              <InfoRow label="Amount" value={`₹${registration.amount.toLocaleString('en-IN')} · Early bird`} />
              <InfoRow label="Status" value={registration.status} capitalize />
            </div>
          </motion.div>

          {!cloudSynced && (
            <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-dim">
              Saved on this device. Cloud sync will complete once Firestore is enabled.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-yugen bg-surface p-4 text-sm text-muted sm:p-5">
        <p className="font-heading font-semibold text-yugen-white">What happens next</p>
        <ul className="mt-3 space-y-2 leading-relaxed">
          <li>— We verify your UPI payment against ID <span className="break-all font-mono text-yugen-white">{registration.id}</span></li>
          <li>— Confirmation will be sent to {registration.email}</li>
          <li>— Questions? Email {YUGEN.email}</li>
        </ul>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
        <button
          type="button"
          onClick={() => setSavedHint(true)}
          className="btn-primary w-full sm:w-auto"
        >
          {savedHint ? "Great — you're all set" : "I've saved my ID"}
        </button>
        <Link to="/register" className="btn-ghost w-full sm:w-auto">
          Back to registration
        </Link>
        <a
          href={YUGEN.social.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost w-full sm:w-auto"
        >
          {YUGEN.social.instagram}
        </a>
      </div>
    </motion.div>
  )
}

function InfoRow({
  label,
  value,
  capitalize,
  breakAll,
}: {
  label: string
  value: string
  capitalize?: boolean
  breakAll?: boolean
}) {
  return (
    <p className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
      <span className="shrink-0 text-dim">{label}:</span>
      <span className={`${capitalize ? 'capitalize' : ''} ${breakAll ? 'break-all' : ''} text-yugen-white`}>
        {value}
      </span>
    </p>
  )
}
