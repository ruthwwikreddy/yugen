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
      className="space-y-6"
    >
      <div className="overflow-hidden rounded-2xl border border-yugen-strong bg-surface-raised">
        <div className="border-b border-yugen bg-yugen-white px-6 py-3 text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-wider text-yugen-black">
            ✓ Registration submitted
          </p>
        </div>

        <div className="p-8 text-center">
          <p className="label-caps">Step 3 · Save this screen</p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-tight md:text-5xl">Screenshot this</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">
            Keep a screenshot of your registration ID. The secretariat matches UPI payments using this ID.
          </p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-10 max-w-md rounded-2xl border-2 border-yugen-strong bg-yugen-black p-8"
          >
            <p className="label-caps">Registration ID</p>
            <p className="mt-3 font-mono text-3xl tracking-wider md:text-4xl">{registration.id}</p>
            <div className="mt-4 flex justify-center">
              <CopyButton text={registration.id} label="Copy ID" />
            </div>

            <div className="mt-8 space-y-2.5 border-t border-yugen pt-6 text-left text-sm">
              <InfoRow label="Name" value={registration.name} />
              <InfoRow label="School" value={registration.school} />
              <InfoRow label="Email" value={registration.email} />
              <InfoRow label="Amount" value={`₹${registration.amount.toLocaleString('en-IN')} · Early bird`} />
              <InfoRow label="Status" value={registration.status} capitalize />
            </div>
          </motion.div>

          {!cloudSynced && (
            <p className="mx-auto mt-4 max-w-md text-xs text-dim">
              Saved on this device. Cloud sync will complete once Firestore is enabled.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-yugen bg-surface p-5 text-sm text-muted">
        <p className="font-heading font-semibold text-yugen-white">What happens next</p>
        <ul className="mt-3 space-y-2">
          <li>— We verify your UPI payment against ID <span className="font-mono text-yugen-white">{registration.id}</span></li>
          <li>— Confirmation will be sent to {registration.email}</li>
          <li>— Questions? Email {YUGEN.email}</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setSavedHint(true)
          }}
          className="btn-primary"
        >
          {savedHint ? 'Great — you\'re all set' : 'I\'ve saved my ID'}
        </button>
        <Link to="/register" className="btn-ghost">
          Back to registration
        </Link>
        <a href={YUGEN.social.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          {YUGEN.social.instagram}
        </a>
      </div>
    </motion.div>
  )
}

function InfoRow({ label, value, capitalize }: { label: string; value: string; capitalize?: boolean }) {
  return (
    <p>
      <span className="text-dim">{label}:</span>{' '}
      <span className={capitalize ? 'capitalize text-yugen-white' : 'text-yugen-white'}>{value}</span>
    </p>
  )
}
