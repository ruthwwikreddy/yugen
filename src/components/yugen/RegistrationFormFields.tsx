import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllocatableCommittees, YUGEN } from '../../lib/yugen'
import {
  createRegistration,
  prepareMunExperienceForSubmit,
  type Registration,
  type RegistrationInput,
} from '../../lib/registration'
import { friendlyFirebaseError } from '../../lib/firebase-errors'
import { MUN_COUNTRIES, POPULAR_COUNTRIES } from '../../lib/mun-countries'
import { RegistrationBanner } from './RegistrationWizard'
import { SearchSelect } from './SearchSelect'

const inputClass =
  'input-touch w-full rounded-xl border border-yugen bg-yugen-black px-4 py-3.5 text-yugen-white placeholder:text-dim transition-colors focus:border-yugen-strong focus:outline-none focus:ring-1 focus:ring-yugen-strong/30 sm:text-sm'

const GRADES = ['8', '9', '10', '11', '12']

const FLOW_SLUG = 'delegate-r1-internal'

type FormState = Omit<RegistrationInput, 'experience' | 'awardsAndAchievements'> & {
  committeePreference: string
  committeePreference2: string
  committeePreference3: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  school: '',
  grade: '',
  committeePreference: '',
  committeePreference2: '',
  committeePreference3: '',
  experienceDetails: '',
  countryPreference: '',
  portfolioUrl: '',
  dietaryNotes: '',
  paymentMethod: 'upi',
}

type RegistrationFormFieldsProps = {
  onSuccess: (result: { id: string; registration: Registration; warning?: string }) => void
}

export function RegistrationFormFields({ onSuccess }: RegistrationFormFieldsProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormState>(initialForm)

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
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

    if (!form.grade) {
      setStatus('error')
      setError('Please select your grade')
      return
    }

    if (!form.committeePreference || !form.committeePreference2 || !form.committeePreference3) {
      setStatus('error')
      setError('Please select all three committee preferences')
      return
    }

    const prefs = [form.committeePreference, form.committeePreference2, form.committeePreference3]
    if (new Set(prefs).size !== 3) {
      setStatus('error')
      setError('Each committee preference must be different')
      return
    }

    if (!form.experienceDetails?.trim()) {
      setStatus('error')
      setError('Please enter your MUN experience')
      return
    }

    if (form.portfolioUrl?.trim()) {
      try {
        new URL(form.portfolioUrl.trim())
      } catch {
        setStatus('error')
        setError('Portfolio link must be a valid URL (include https://)')
        return
      }
    }

    try {
      const munExperience = prepareMunExperienceForSubmit(form.experienceDetails ?? '')
      const result = await createRegistration(FLOW_SLUG, { ...form, ...munExperience })
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

  const committees = getAllocatableCommittees()

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onSubmit={handleSubmit}
      className="space-y-5 sm:space-y-6"
    >
      <div className="grid min-w-0 gap-5 md:grid-cols-2">
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

      </div>

      <Field
        label="Committee preferences"
        id="reg-committee-1"
        required
        hint="Pick three different committees in order."
      >
        <div className="space-y-3 min-w-0">
          {(['committeePreference', 'committeePreference2', 'committeePreference3'] as const).map((key, i) => (
            <select
              key={key}
              id={i === 0 ? 'reg-committee-1' : undefined}
              required
              value={form[key]}
              onChange={(e) => updateField(key, e.target.value)}
              className={inputClass}
            >
              <option value="">{i === 0 ? '1st choice' : `${i + 1}${i === 1 ? 'nd' : 'rd'} choice`}</option>
              {committees.map((c) => (
                <option key={c.id} value={c.name} disabled={[form.committeePreference, form.committeePreference2, form.committeePreference3].some((v, j) => v === c.name && (['committeePreference', 'committeePreference2', 'committeePreference3'] as const)[j] !== key)}>
                  {c.acronym} — {c.name}
                </option>
              ))}
            </select>
          ))}
        </div>
      </Field>

      <div className="min-w-0">
        <p className="label-caps mb-1">Preferences</p>
        <p className="mb-3 text-xs text-dim">
          Optional — final allocation at Secretariat discretion.{' '}
          <Link
            to="/portfolio-guide"
            className="text-yugen-white underline underline-offset-2 hover:no-underline"
          >
            Browse portfolios →
          </Link>
        </p>
        <Field label="Country preference" id="reg-country" hint="Optional">
          <SearchSelect
            id="reg-country"
            value={form.countryPreference ?? ''}
            onChange={(v) => updateField('countryPreference', v)}
            options={MUN_COUNTRIES}
            featuredOptions={POPULAR_COUNTRIES}
            featuredLabel="Common countries"
            placeholder="Search countries…"
            emptyLabel="No preference"
            showSelected={false}
          />
        </Field>
      </div>

      <Field label="Portfolio link" id="reg-portfolio-url" hint="Optional">
        <input
          id="reg-portfolio-url"
          type="url"
          inputMode="url"
          value={form.portfolioUrl ?? ''}
          onChange={(e) => updateField('portfolioUrl', e.target.value)}
          placeholder="https://…"
          className={inputClass}
        />
      </Field>

      <Field
        label="MUN experience"
        id="reg-exp-details"
        required
        hint="One entry per line: Conference / Year / Awards (if any)"
      >
        <textarea
          id="reg-exp-details"
          required
          rows={5}
          value={form.experienceDetails ?? ''}
          onChange={(e) => updateField('experienceDetails', e.target.value)}
          placeholder={'Yūgen Summit / 2025 / Best Delegate\nHyderabad MUN / 2024\nFirst MUN — no awards yet'}
          className={inputClass}
        />
      </Field>

      <Field label="Dietary / accessibility" id="reg-dietary" hint="Optional">
        <textarea
          id="reg-dietary"
          rows={3}
          value={form.dietaryNotes ?? ''}
          onChange={(e) => updateField('dietaryNotes', e.target.value)}
          placeholder="Any requirements"
          className={inputClass}
        />
      </Field>

      <Field label="Payment method" id="reg-payment" required>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => updateField('paymentMethod', 'upi')}
            className={`rounded-lg border p-3 text-left transition-colors ${
              form.paymentMethod === 'upi'
                ? 'border-accent bg-accent/10 text-accent-light'
                : 'border-yugen bg-surface hover:border-yugen-strong'
            }`}
          >
            <p className="font-body text-sm font-medium">UPI</p>
            <p className="mt-1 text-xs text-dim">Pay via QR code</p>
          </button>
          <button
            type="button"
            onClick={() => updateField('paymentMethod', 'cash')}
            className={`rounded-lg border p-3 text-left transition-colors ${
              form.paymentMethod === 'cash'
                ? 'border-accent bg-accent/10 text-accent-light'
                : 'border-yugen bg-surface hover:border-yugen-strong'
            }`}
          >
            <p className="font-body text-sm font-medium">Cash</p>
            <p className="mt-1 text-xs text-dim">Pay at school</p>
          </button>
        </div>
      </Field>

      <div className="rounded-xl border border-yugen-strong bg-gradient-to-br from-surface-raised to-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-caps">Internal fee</p>
            <p className="mt-1 font-display text-3xl uppercase sm:text-4xl">₹1,000</p>
          </div>
          <p className="text-xs text-dim sm:text-right">
            PORPS students · Round 1
          </p>
        </div>
      </div>

      <div className="mobile-sticky-bar -mx-4 sm:!static sm:mx-0">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full disabled:opacity-50"
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
      </div>

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
  hint,
  children,
}: {
  label: string
  id: string
  required?: boolean
  hint?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="label-caps mb-1 block">
        {label}
        {required && <span className="text-dim"> *</span>}
      </label>
      {hint && <p className="mb-1.5 text-xs text-dim break-words">{hint}</p>}
      {children}
    </div>
  )
}
