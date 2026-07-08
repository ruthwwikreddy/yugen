import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { YUGEN } from '../lib/yugen'
import { getFlowBySlug } from '../config/registrations'
import { createOCApplication, getOCApplication } from '../lib/oc-applications-db'
import type { OCApplication, OCApplicationInput } from '../lib/oc-applications'
import { firebaseEnabled } from '../lib/firebase'

type Step = 'role-selection' | 'form' | 'confirm'

function stepFromPath(pathStep?: string): Step {
  if (pathStep === 'form') return 'form'
  if (pathStep === 'confirm') return 'confirm'
  return 'role-selection'
}

export function OCApplicationPage() {
  const { flowSlug, applicationId, step: pathStep } = useParams<{ flowSlug?: string; applicationId?: string; step?: string }>()
  const navigate = useNavigate()
  const step = stepFromPath(pathStep)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [application, setApplication] = useState<OCApplication | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')
  const [cloudSynced, setCloudSynced] = useState(true)

  const flow = flowSlug ? getFlowBySlug(flowSlug) : null
  const currentRound = flow?.round ?? 1
  const roundConfig = YUGEN.ocRounds.find((r) => r.round === currentRound)

  useEffect(() => {
    if (!flowSlug || !flow) {
      navigate('/apply', { replace: true })
      return
    }

    if (!flow.active) {
      setError('This application round is not currently open.')
      return
    }

    if (step === 'role-selection') {
      setLoading(false)
      return
    }

    if (!applicationId) {
      navigate(`/apply/${flowSlug}`, { replace: true })
      return
    }

    setLoading(true)
    getOCApplication(applicationId)
      .then((data) => {
        if (data) {
          setApplication(data)
          setSelectedRole(data.roleId)
        } else {
          navigate(`/apply/${flowSlug}`, { replace: true })
        }
      })
      .catch(() => {
        setError('Failed to load application')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [flowSlug, flow, applicationId, step, navigate])

  function handleRoleSelect(roleId: string) {
    setSelectedRole(roleId)
    navigate(`/apply/${flowSlug}/form`, { replace: true })
  }

  async function handleFormSubmit(formData: Omit<OCApplicationInput, 'roleId'>) {
    if (!selectedRole || !flow) return

    setSubmitting(true)
    setError('')

    try {
      const role = YUGEN.ocRoles.find((r) => r.id === selectedRole)
      if (!role) {
        throw new Error('Invalid role selected')
      }

      const result = await createOCApplication(
        flow.slug,
        selectedRole,
        role.title,
        role.department,
        { ...formData, roleId: selectedRole }
      )

      setApplication(result.application)
      setCloudSynced(result.cloudSynced)
      setWarning(result.warning ?? '')
      navigate(`/apply/${flowSlug}/${result.id}/confirm`, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application')
    } finally {
      setSubmitting(false)
    }
  }

  const availableRoles = YUGEN.ocRoles.filter((role) =>
    role.availableRounds.includes(currentRound)
  )

  const stepNumber = step === 'role-selection' ? 1 : step === 'form' ? 2 : 3

  return (
    <Shell>
      <SEO
        title={`${flow?.title || 'OC Application'} | Yūgen Summit 6.0`}
        description={flow?.seoDescription || 'Apply to join the Yūgen Summit organizing committee.'}
        path={`/apply/${flowSlug}`}
      />

      <div className="section-padding mx-auto max-w-2xl">
        <Link
          to="/apply"
          className="label-caps inline-flex min-h-11 items-center text-muted transition-colors hover:text-yugen-white"
        >
          ← Apply
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <span className="coming-soon-pill mt-4 sm:mt-6">
            {roundConfig?.title || `Round ${currentRound}`}
          </span>
          <h1 className="mt-3 font-display text-4xl uppercase tracking-tight sm:mt-4 sm:text-5xl md:text-6xl">
            {flow?.title || 'OC Application'}
          </h1>
          {flow?.subtitle && (
            <p className="mt-3 text-sm text-muted">{flow.subtitle}</p>
          )}
        </motion.div>

        {roundConfig && (
          <div className="mt-6 rounded-lg border border-yugen bg-surface p-4">
            <p className="text-sm text-muted">
              <span className="font-bold text-yugen-white">Status:</span>{' '}
              {roundConfig.status === 'open' ? (
                <span className="text-green-400">Open for applications</span>
              ) : roundConfig.status === 'upcoming' ? (
                <span className="text-yellow-400">Opening soon</span>
              ) : (
                <span className="text-red-400">Closed</span>
              )}
              {roundConfig.startDate && roundConfig.endDate && (
                <span className="ml-4">
                  {roundConfig.startDate} – {roundConfig.endDate}
                </span>
              )}
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= stepNumber ? 'bg-yugen' : 'bg-yugen/20'
              }`}
            />
          ))}
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {warning && step !== 'role-selection' && (
          <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-950/20 p-4 text-sm text-amber-200">
            {warning}
          </div>
        )}

        {!firebaseEnabled && step === 'form' && (
          <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-950/20 p-4 text-sm text-amber-200">
            Firebase env vars missing — application will save locally on this device.
          </div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <div className="mt-10 flex items-center gap-3 text-sm text-dim">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-yugen border-t-yugen-white" />
              Loading…
            </div>
          ) : (
            <motion.div
              key={step + (applicationId ?? '')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              {step === 'role-selection' && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-yugen bg-surface-raised p-4 sm:p-6 md:p-8">
                    <p className="label-caps">Step 1</p>
                    <h2 className="mt-1 font-heading text-xl font-bold">Select a role</h2>
                    <p className="mt-2 text-sm text-muted">
                      Choose the department and role you want to apply for. Each role has specific requirements and responsibilities.
                    </p>
                  </div>

                  {availableRoles.length === 0 ? (
                    <div className="rounded-lg border border-yugen bg-surface p-6 text-center text-muted">
                      No roles available for this round. Check back later for Round 2.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {availableRoles.map((role) => (
                        <button
                          key={role.id}
                          onClick={() => handleRoleSelect(role.id)}
                          className="w-full rounded-lg border border-yugen bg-surface-raised p-4 text-left transition-colors hover:border-yugen-white hover:bg-surface"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-heading font-bold">{role.title}</h3>
                              <p className="mt-1 text-xs text-muted">{role.department}</p>
                              <p className="mt-2 text-sm text-muted">{role.description}</p>
                              {role.capacity && (
                                <p className="mt-2 text-xs text-dim">Capacity: {role.capacity}</p>
                              )}
                            </div>
                            <span className="text-yugen">→</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {step === 'form' && selectedRole && (
                <OCApplicationForm
                  roleId={selectedRole}
                  onSubmit={handleFormSubmit}
                  submitting={submitting}
                />
              )}

              {step === 'confirm' && application && (
                <OCApplicationConfirm
                  application={application}
                  cloudSynced={cloudSynced}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  )
}

function OCApplicationForm({
  roleId,
  onSubmit,
  submitting,
}: {
  roleId: string
  onSubmit: (data: Omit<OCApplicationInput, 'roleId'>) => void
  submitting: boolean
}) {
  const role = YUGEN.ocRoles.find((r) => r.id === roleId)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    grade: '',
    experience: '',
    whyJoin: '',
    relevantSkills: '',
    availability: '',
    previousMunExperience: '',
    portfolioUrl: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="rounded-2xl border border-yugen bg-surface-raised p-4 sm:p-6 md:p-8">
      <p className="label-caps">Step 2</p>
      <h2 className="mt-1 font-heading text-xl font-bold">Application form</h2>
      <p className="mt-2 text-sm text-muted">
        Applying for: <span className="font-bold text-yugen-white">{role?.title}</span>
      </p>

      {role && (
        <div className="mt-4 rounded-lg border border-yugen/30 bg-surface p-4">
          <h3 className="font-heading text-sm font-bold">Requirements</h3>
          <ul className="mt-2 space-y-1 text-xs text-muted">
            {role.requirements.map((req, i) => (
              <li key={i}>• {req}</li>
            ))}
          </ul>
          <h3 className="mt-3 font-heading text-sm font-bold">Responsibilities</h3>
          <ul className="mt-2 space-y-1 text-xs text-muted">
            {role.responsibilities.map((resp, i) => (
              <li key={i}>• {resp}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="label-caps">Full name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field mt-1"
            placeholder="Your full name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-caps">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field mt-1"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="label-caps">Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field mt-1"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-caps">School *</label>
            <input
              type="text"
              required
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="input-field mt-1"
              placeholder="Your school name"
            />
          </div>
          <div>
            <label className="label-caps">Grade *</label>
            <input
              type="text"
              required
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="input-field mt-1"
              placeholder="e.g., 12th grade"
            />
          </div>
        </div>

        <div>
          <label className="label-caps">Relevant experience *</label>
          <textarea
            required
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="input-field mt-1 min-h-[100px]"
            placeholder="Describe any relevant experience (MUN, leadership, event organization, etc.)"
          />
        </div>

        <div>
          <label className="label-caps">Previous MUN experience *</label>
          <textarea
            required
            value={formData.previousMunExperience}
            onChange={(e) => setFormData({ ...formData, previousMunExperience: e.target.value })}
            className="input-field mt-1 min-h-[80px]"
            placeholder="List any MUN conferences you've attended or organized"
          />
        </div>

        <div>
          <label className="label-caps">Why do you want to join? *</label>
          <textarea
            required
            value={formData.whyJoin}
            onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
            className="input-field mt-1 min-h-[100px]"
            placeholder="Tell us why you're interested in this role and what you'll bring to the team"
          />
        </div>

        <div>
          <label className="label-caps">Relevant skills *</label>
          <textarea
            required
            value={formData.relevantSkills}
            onChange={(e) => setFormData({ ...formData, relevantSkills: e.target.value })}
            className="input-field mt-1 min-h-[80px]"
            placeholder="Skills that make you a good fit for this role"
          />
        </div>

        <div>
          <label className="label-caps">Availability *</label>
          <textarea
            required
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="input-field mt-1 min-h-[80px]"
            placeholder="Your availability for pre-conference planning and during the conference"
          />
        </div>

        <div>
          <label className="label-caps">Portfolio URL (optional)</label>
          <input
            type="url"
            value={formData.portfolioUrl}
            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
            className="input-field mt-1"
            placeholder="Link to portfolio, LinkedIn, or relevant work"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full"
        >
          {submitting ? 'Submitting…' : 'Submit application'}
        </button>
      </form>
    </div>
  )
}

function OCApplicationConfirm({
  application,
  cloudSynced,
}: {
  application: OCApplication
  cloudSynced: boolean
}) {
  const role = YUGEN.ocRoles.find((r) => r.id === application.roleId)

  return (
    <div className="rounded-2xl border border-yugen bg-surface-raised p-4 sm:p-6 md:p-8">
      <p className="label-caps">Step 3</p>
      <h2 className="mt-1 font-heading text-xl font-bold">Application submitted</h2>

      {!cloudSynced && (
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-950/20 p-4 text-sm text-amber-200">
          Your application was saved locally. It will sync when Firebase is configured.
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div>
          <p className="label-caps">Application ID</p>
          <p className="mt-1 font-mono text-yugen-white">{application.id}</p>
        </div>

        <div>
          <p className="label-caps">Role</p>
          <p className="mt-1 font-bold text-yugen-white">{role?.title || application.roleTitle}</p>
          <p className="text-sm text-muted">{application.department}</p>
        </div>

        <div>
          <p className="label-caps">Applicant</p>
          <p className="mt-1 font-bold text-yugen-white">{application.name}</p>
          <p className="text-sm text-muted">{application.email}</p>
          <p className="text-sm text-muted">{application.school}</p>
        </div>

        <div>
          <p className="label-caps">Status</p>
          <p className="mt-1 text-green-400">Pending review</p>
          <p className="mt-2 text-xs text-muted">
            We'll review your application and contact you for an interview if selected.
          </p>
        </div>
      </div>

      <Link to="/apply" className="btn-ghost mt-8 inline-flex">
        Back to applications
      </Link>
    </div>
  )
}
