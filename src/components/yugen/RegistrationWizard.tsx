import { motion } from 'framer-motion'

const STEPS = [
  { num: 1, label: 'Details' },
  { num: 2, label: 'Payment' },
  { num: 3, label: 'Confirm' },
]

type RegistrationStepperProps = {
  current: number
}

export function RegistrationStepper({ current }: RegistrationStepperProps) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, i) => {
          const done = current > step.num
          const active = current === step.num
          return (
            <div key={step.num} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{
                    scale: active ? 1.05 : 1,
                    backgroundColor: done || active ? '#ffffff' : 'transparent',
                    color: done || active ? '#000000' : 'rgba(255,255,255,0.35)',
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold ${
                    done || active ? 'border-yugen-white' : 'border-yugen'
                  }`}
                >
                  {done ? '✓' : step.num}
                </motion.div>
                <span className={`text-[10px] uppercase tracking-wider ${active ? 'text-yugen-white' : 'text-dim'}`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-2 mb-5 h-px flex-1 bg-yugen-border">
                  <motion.div
                    className="h-full bg-yugen-white"
                    initial={{ width: '0%' }}
                    animate={{ width: current > step.num ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function RegistrationLoading({ message = 'Loading…' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-yugen-border border-t-yugen-white" />
      <p className="mt-4 text-sm text-muted">{message}</p>
    </div>
  )
}

type RegistrationBannerProps = {
  type: 'warning' | 'error' | 'info'
  message: string
  onDismiss?: () => void
}

export function RegistrationBanner({ type, message, onDismiss }: RegistrationBannerProps) {
  const styles = {
    warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-100',
    error: 'border-red-500/30 bg-red-500/10 text-red-100',
    info: 'border-yugen-strong bg-surface-raised text-muted',
  }

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles[type]}`}>
      <div className="flex items-start justify-between gap-3">
        <p>{message}</p>
        {onDismiss && (
          <button type="button" onClick={onDismiss} className="shrink-0 text-dim hover:text-yugen-white">
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text)
      }}
      className="btn-ghost text-[10px]"
    >
      {label}
    </button>
  )
}
