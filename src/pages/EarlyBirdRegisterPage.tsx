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
} from '../components/yugen/RegistrationWizard'
import { getRegistration, EARLY_BIRD_AMOUNT, type Registration } from '../lib/registration'
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
        title="Early Bird Registration | Yūgen Summit 6.0"
        description={`Register for Yūgen Summit 6.0 early bird at ₹${EARLY_BIRD_AMOUNT}. UPI payment with instant registration ID.`}
        path="/register/early-bird"
      />

      <div className="section-padding mx-auto max-w-2xl">
        <Link
          to="/register"
          className="label-caps inline-flex min-h-11 items-center text-muted transition-colors hover:text-yugen-white"
        >
          ← Registration
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <span className="coming-soon-pill mt-4 sm:mt-6">Early bird · Round 1</span>
          <h1 className="mt-3 font-display text-4xl uppercase tracking-tight sm:mt-4 sm:text-5xl md:text-6xl">
            Register
          </h1>
        </motion.div>

        <RegistrationStepper current={stepNumber} />

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
              className="mt-10"
            >
              {step === 'form' && (
                <div className="rounded-2xl border border-yugen bg-surface-raised p-4 sm:p-6 md:p-8">
                  <p className="label-caps">Step 1</p>
                  <h2 className="mt-1 font-heading text-xl font-bold">Delegate information</h2>
                  <p className="mt-2 text-sm text-muted">Takes about 2 minutes. All fields marked * are required.</p>
                  <div className="mt-6">
                    <RegistrationFormFields onSuccess={handleFormSuccess} />
                  </div>
                </div>
              )}

              {step === 'payment' && registrationId && (
                <UpiPaymentStep
                  registrationId={registrationId}
                  delegateName={registration?.name}
                  onPaid={handlePaid}
                />
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
