import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { RegistrationFormFields } from '../components/yugen/RegistrationFormFields'
import { UpiPaymentStep } from '../components/yugen/UpiPaymentStep'
import { RegistrationConfirmStep } from '../components/yugen/RegistrationConfirmStep'
import {
  RegistrationBanner,
  RegistrationLoading,
  RegistrationStepper,
  CopyButton,
} from '../components/yugen/RegistrationWizard'
import { getRegistration, formatRegistrationIdDisplay, type Registration } from '../lib/registration'
import { firebaseEnabled } from '../lib/firebase'
import {
  getActiveSession,
  saveActiveSession,
  updateSessionStep,
} from '../lib/registration-session'

type Step = 'form' | 'payment' | 'confirm'

function stepFromPath(pathStep?: string): Step {
  if (pathStep === 'payment') return 'payment'
  if (pathStep === 'confirm') return 'confirm'
  return 'form'
}

export function EarlyBirdRegisterPage() {
  const { registrationId, step: pathStep } = useParams<{ registrationId?: string; step?: string }>()
  const navigate = useNavigate()
  const step = stepFromPath(pathStep)
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(step !== 'form')
  const [warning, setWarning] = useState('')
  const [cloudSynced, setCloudSynced] = useState(true)

  useEffect(() => {
    if (step === 'form') {
      setLoading(false)
      return
    }

    if (!registrationId) {
      navigate('/register/early-bird', { replace: true })
      return
    }

    const session = getActiveSession()
    if (session?.id === registrationId) {
      setRegistration(session.registration)
      setWarning(session.warning ?? '')
      setCloudSynced(session.registration.status !== 'pending' || !session.warning)
      setLoading(false)
    }

    let cancelled = false
    setLoading(true)

    getRegistration(registrationId)
      .then((data) => {
        if (cancelled) return
        if (data) {
          setRegistration(data)
        } else if (!session || session.id !== registrationId) {
          navigate('/register/early-bird', { replace: true })
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [registrationId, step, navigate])

  function handleFormSuccess(result: { id: string; registration: Registration; warning?: string }) {
    saveActiveSession({
      id: result.id,
      flowSlug: result.registration.flowSlug,
      step: 'payment',
      registration: result.registration,
      warning: result.warning,
    })
    if (result.warning) setWarning(result.warning)
    setCloudSynced(result.registration ? !result.warning : true)
    setRegistration(result.registration)
    navigate(`/register/early-bird/${result.id}/payment`, { replace: true })
  }

  function handlePaid(synced: boolean) {
    if (!registrationId || !registration) return
    const updated = { ...registration, status: 'paid' as const }
    setRegistration(updated)
    setCloudSynced(synced)
    updateSessionStep('confirm', updated)
    navigate(`/register/early-bird/${registrationId}/confirm`, { replace: true })
  }

  const stepNumber = step === 'form' ? 1 : step === 'payment' ? 2 : 3

  return (
    <Shell>
      <SEO
        title="Internal Registration | Yūgen Summit 6.0"
        description="Register for Yūgen Summit 6.0 internal registration at ₹1,000. UPI or cash payment with instant registration ID."
        path="/register/early-bird"
      />

      <div className="section-padding mx-auto max-w-2xl overflow-x-hidden">
        <Link
          to="/register"
          className="label-caps inline-flex min-h-11 items-center text-muted transition-colors hover:text-yugen-white"
        >
          ← Registration
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <span className="coming-soon-pill mt-4 sm:mt-6">Internal · Round 1</span>
          <h1 className="mt-3 font-display text-3xl uppercase tracking-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Register
          </h1>
        </motion.div>

        <div className="mt-6 sm:mt-8">
          <RegistrationStepper current={stepNumber} />
        </div>

        {warning && step !== 'form' && (
          <div className="mt-6">
            <RegistrationBanner type="warning" message={warning} onDismiss={() => setWarning('')} />
          </div>
        )}

        {!firebaseEnabled && step === 'form' && (
          <div className="mt-6">
            <RegistrationBanner
              type="info"
              message="Firebase env vars missing — registration will save locally on this device."
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {loading && step !== 'form' ? (
            <RegistrationLoading message="Loading your registration…" />
          ) : (
            <motion.div
              key={step + (registrationId ?? '')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 pb-28 sm:mt-10 sm:pb-0"
            >
              {step === 'form' && (
                <div className="overflow-visible rounded-2xl border border-yugen bg-surface-raised p-4 sm:p-6 md:p-8">
                  <p className="label-caps">Step 1</p>
                  <h2 className="mt-1 font-heading text-xl font-bold">Delegate information</h2>
                  <p className="mt-2 text-sm text-muted">Takes about 2 minutes. All fields marked * are required.</p>
                  <div className="mt-6">
                    <RegistrationFormFields onSuccess={handleFormSuccess} />
                  </div>
                </div>
              )}

              {step === 'payment' && registrationId && (
                <>
                  {registration?.paymentMethod === 'cash' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-5 pb-28 sm:space-y-6 sm:pb-2"
                    >
                      {registration?.name && (
                        <p className="text-sm leading-relaxed text-muted">
                          Almost there, <span className="text-yugen-white">{registration.name}</span> — complete your cash payment at school.
                        </p>
                      )}

                      <div className="rounded-2xl border border-yugen-strong bg-surface-raised p-5 sm:p-6">
                        <p className="label-caps">Step 2 · Cash payment</p>
                        <h2 className="mt-1 font-heading text-xl font-bold sm:text-2xl">
                          Pay ₹1,000 at school
                        </h2>
                        <p className="mt-3 text-sm text-muted">
                          Visit the registration desk at PORPS with your registration ID to complete payment.
                        </p>
                      </div>

                      <div className="rounded-xl border border-yugen-strong bg-surface p-4 sm:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="min-w-0">
                            <p className="label-caps">Your registration ID</p>
                            <p className="mt-2 break-all font-mono text-xl tracking-wider sm:text-2xl md:text-3xl">{formatRegistrationIdDisplay(registrationId)}</p>
                          </div>
                          <CopyButton text={formatRegistrationIdDisplay(registrationId)} label="Copy ID" className="btn-ghost w-full sm:w-auto" />
                        </div>
                      </div>

                      <div className="mobile-sticky-bar -mx-4 sm:!static sm:mx-0">
                        <button
                          type="button"
                          onClick={() => handlePaid(true)}
                          className="btn-primary w-full"
                        >
                          I've paid at school →
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <UpiPaymentStep
                      registrationId={registrationId}
                      delegateName={registration?.name}
                      onPaid={handlePaid}
                    />
                  )}
                </>
              )}

              {step === 'confirm' && registration && (
                <RegistrationConfirmStep registration={registration} cloudSynced={cloudSynced} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  )
}
