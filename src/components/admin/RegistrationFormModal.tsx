import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { getCommittees } from '../../lib/yugen'
import { EARLY_BIRD_AMOUNT, type Registration, type RegistrationInput } from '../../lib/registration'
import { MUN_COUNTRIES } from '../../lib/mun-countries'
import { MUN_PORTFOLIOS } from '../../lib/mun-portfolios'
import { SearchSelect } from '../yugen/SearchSelect'

const inputClass =
  'w-full rounded-lg border border-yugen bg-yugen-black px-4 py-2.5 text-sm text-yugen-white placeholder:text-dim focus:border-yugen-strong focus:outline-none'

const GRADES = ['8', '9', '10', '11', '12']
const EXPERIENCE = ['First MUN', '1–3 conferences', '4+ conferences']

const emptyForm: RegistrationInput = {
  name: '',
  email: '',
  phone: '',
  school: '',
  grade: '',
  committeePreference: '',
  committeePreference2: '',
  committeePreference3: '',
  experience: '',
  experienceDetails: '',
  awardsAndAchievements: '',
  countryPreference: '',
  portfolioPreference: '',
  portfolioUrl: '',
  dietaryNotes: '',
}

type RegistrationFormModalProps = {
  open: boolean
  mode: 'add' | 'edit'
  initial?: Registration | null
  loading?: boolean
  onClose: () => void
  onSubmit: (data: RegistrationInput & { adminNotes?: string }) => void
}

export function RegistrationFormModal({
  open,
  mode,
  initial,
  loading,
  onClose,
  onSubmit,
}: RegistrationFormModalProps) {
  const [form, setForm] = useState<RegistrationInput>(emptyForm)
  const [adminNotes, setAdminNotes] = useState('')

  useEffect(() => {
    if (!open) return
    if (initial && mode === 'edit') {
      setForm({
        name: initial.name,
        email: initial.email,
        phone: initial.phone,
        school: initial.school,
        grade: initial.grade,
        committeePreference: initial.committeePreference,
        committeePreference2: initial.committeePreference2,
        committeePreference3: initial.committeePreference3,
        experience: initial.experience,
        experienceDetails: initial.experienceDetails,
        awardsAndAchievements: initial.awardsAndAchievements,
        countryPreference: initial.countryPreference,
        portfolioPreference: initial.portfolioPreference,
        portfolioUrl: initial.portfolioUrl,
        dietaryNotes: initial.dietaryNotes,
      })
      setAdminNotes(initial.adminNotes ?? '')
    } else {
      setForm(emptyForm)
      setAdminNotes('')
    }
  }, [open, initial, mode])

  if (!open) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit({ ...form, adminNotes })
  }

  const committees = getCommittees()

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 pt-[10vh]">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl rounded-2xl border border-yugen bg-surface p-6 shadow-2xl"
        >
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="label-caps">{mode === 'add' ? 'New registration' : 'Edit registration'}</p>
              <h2 className="mt-1 font-heading text-xl font-semibold">
                {mode === 'add' ? 'Add delegate manually' : initial?.id}
              </h2>
            </div>
            <button type="button" onClick={onClose} className="rounded-lg border border-yugen px-2 py-1 text-xs text-muted">
              Close
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-caps mb-1.5 block">Full name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="label-caps mb-1.5 block">Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="label-caps mb-1.5 block">Phone</label>
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="label-caps mb-1.5 block">School</label>
              <input required value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="label-caps mb-1.5 block">Grade</label>
              <select required value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className={inputClass}>
                <option value="" disabled>Select</option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>Grade {g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-caps mb-1.5 block">Experience</label>
              <select required value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className={inputClass}>
                <option value="" disabled>Select</option>
                {EXPERIENCE.map((x) => (
                  <option key={x} value={x}>{x}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <label className="label-caps block">Committee preferences</label>
            {(['committeePreference', 'committeePreference2', 'committeePreference3'] as const).map((key, i) => (
              <select key={key} value={form[key] ?? ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputClass}>
                <option value="">{i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : 'rd'} choice</option>
                {committees.map((c) => (
                  <option key={c.id} value={c.name}>{c.acronym} — {c.name}</option>
                ))}
              </select>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-caps mb-1.5 block">Country preference</label>
              <SearchSelect
                value={form.countryPreference ?? ''}
                onChange={(v) => setForm({ ...form, countryPreference: v })}
                options={MUN_COUNTRIES}
                placeholder="Search countries…"
                inputClassName={inputClass}
              />
            </div>
            <div>
              <label className="label-caps mb-1.5 block">Portfolio preference</label>
              <SearchSelect
                value={form.portfolioPreference ?? ''}
                onChange={(v) => setForm({ ...form, portfolioPreference: v })}
                options={MUN_PORTFOLIOS}
                placeholder="Search portfolios…"
                inputClassName={inputClass}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="label-caps mb-1.5 block">Portfolio link</label>
            <input type="url" value={form.portfolioUrl ?? ''} onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })} className={inputClass} placeholder="https://…" />
          </div>

          <div className="mt-4">
            <label className="label-caps mb-1.5 block">Experience details</label>
            <textarea rows={2} value={form.experienceDetails ?? ''} onChange={(e) => setForm({ ...form, experienceDetails: e.target.value })} className={inputClass} />
          </div>

          <div className="mt-4">
            <label className="label-caps mb-1.5 block">Awards & achievements</label>
            <textarea rows={2} value={form.awardsAndAchievements ?? ''} onChange={(e) => setForm({ ...form, awardsAndAchievements: e.target.value })} className={inputClass} />
          </div>

          <div className="mt-4">
            <label className="label-caps mb-1.5 block">Dietary / notes</label>
            <textarea rows={2} value={form.dietaryNotes ?? ''} onChange={(e) => setForm({ ...form, dietaryNotes: e.target.value })} className={inputClass} />
          </div>

          <div className="mt-4">
            <label className="label-caps mb-1.5 block">Admin notes</label>
            <textarea rows={2} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} placeholder="Internal notes, rejection reason…" className={inputClass} />
          </div>

          {mode === 'add' && (
            <p className="mt-4 text-xs text-dim">Fee: ₹{EARLY_BIRD_AMOUNT.toLocaleString('en-IN')} · Status will be pending</p>
          )}

          <div className="mt-6 flex gap-3">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
              {loading ? 'Saving…' : mode === 'add' ? 'Create registration' : 'Save changes'}
            </button>
          </div>
        </motion.form>
      </div>
    </>
  )
}
