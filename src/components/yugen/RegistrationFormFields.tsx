import { useState, type FormEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'
import { createRegistration, EARLY_BIRD_AMOUNT, type Registration } from '../../lib/registration'
import { friendlyFirebaseError } from '../../lib/firebase-errors'
import { RegistrationBanner } from './RegistrationWizard'

const inputClass =
  'w-full rounded-xl border border-yugen bg-yugen-black px-4 py-3.5 text-sm text-yugen-white placeholder:text-dim transition-colors focus:border-yugen-strong focus:outline-none focus:ring-1 focus:ring-yugen-strong/30'

const GRADES = ['8', '9', '10', '11', '12']
const EXPERIENCE = ['First MUN', '1–3 conferences', '4+ conferences']

type RegistrationFormFieldsProps = {
  onSuccess: (result: { id: string; registration: Registration; warning?: string }) => void
}

export function RegistrationFormFields({ onSuccess }: RegistrationFormFieldsProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    grade: '',
    committeePreference: '',
    experience: '',
    dietaryNotes: '',
  })

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 15) {
      setStatus('error')
      setError('Enter a valid 10–15 digit phone number')
      return
    }

    if (!form.grade || !form.experience) {
      setStatus('error')
      setError('Please select your grade and MUN experience')
      return
    }

    try {
      const result = await createRegistration(form)
      onSuccess({
        id: result.id,
        registration: result.registration,
        warning: result.warning,
      })
    } catch (err) {
      setStatus('idle')
      setError(friendlyFirebaseError(err))
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" id="reg-name" required>
          <input
            id="reg-name"
            required
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Your full name"
            className={inputClass}
          />
        </Field>

        <Field label="Email" id="reg-email" required>
          <input
            id="reg-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@school.edu"
            className={inputClass}
          />
        </Field>

        <Field label="Phone (WhatsApp)" id="reg-phone" required>
          <input
            id="reg-phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="10-digit mobile"
            className={inputClass}
          />
        </Field>

        <Field label="School" id="reg-school" required>
          <input
            id="reg-school"
            required
            value={form.school}
            onChange={(e) => updateField('school', e.target.value)}
            placeholder="School name"
            className={inputClass}
          />
        </Field>

        <Field label="Grade / class" id="reg-grade" required>
          <select
            id="reg-grade"
            required
            value={form.grade}
            onChange={(e) => updateField('grade', e.target.value)}
            className={inputClass}
          >
            <option value="">Select grade</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
        </Field>

        <Field label="MUN experience" id="reg-experience" required>
          <select
            id="reg-experience"
            required
            value={form.experience}
            onChange={(e) => updateField('experience', e.target.value)}
            className={inputClass}
          >
            <option value="">Select experience</option>
            {EXPERIENCE.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Committee preference" id="reg-committee">
        <input
          id="reg-committee"
          value={form.committeePreference}
          onChange={(e) => updateField('committeePreference', e.target.value)}
          placeholder="e.g. UNSC, DISEC — optional"
          className={inputClass}
        />
      </Field>

      <Field label="Dietary / accessibility notes" id="reg-dietary">
        <textarea
          id="reg-dietary"
          rows={3}
          value={form.dietaryNotes}
          onChange={(e) => updateField('dietaryNotes', e.target.value)}
          placeholder="Optional"
          className={inputClass}
        />
      </Field>

      <div className="rounded-xl border border-yugen-strong bg-gradient-to-br from-surface-raised to-surface p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="label-caps">Early bird fee</p>
            <p className="mt-1 font-display text-4xl uppercase">₹{EARLY_BIRD_AMOUNT.toLocaleString('en-IN')}</p>
          </div>
          <p className="text-right text-xs text-dim">
            Round 1
            <br />
            UPI on next step
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full py-4 text-xs disabled:opacity-50"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-3 w-3 animate-spin rounded-full border border-yugen-black/30 border-t-yugen-black" />
            Creating registration…
          </span>
        ) : (
          'Continue to payment →'
        )}
      </button>

      {status === 'error' && error && (
        <RegistrationBanner
          type="error"
          message={`${error} Need help? Email ${YUGEN.email}`}
          onDismiss={() => {
            setStatus('idle')
            setError('')
          }}
        />
      )}
    </motion.form>
  )
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string
  id: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="label-caps mb-2 block">
        {label}
        {required && <span className="text-dim"> *</span>}
      </label>
      {children}
    </div>
  )
}
