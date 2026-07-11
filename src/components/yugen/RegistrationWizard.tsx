import { useState } from 'react'
import { motion } from 'framer-motion'

const STEPS_PAID = [
  { num: 1, label: 'Details', short: 'Info' },
  { num: 2, label: 'Payment', short: 'Pay' },
  { num: 3, label: 'Confirm', short: 'Done' },
]

const STEPS_FREE = [
  { num: 1, label: 'Application', short: 'Apply' },
  { num: 2, label: 'Confirm', short: 'Done' },
]

type RegistrationStepperProps = {
  current: number
  sticky?: boolean
  paymentRequired?: boolean
}

export function RegistrationStepper({ current, sticky = true, paymentRequired = true }: RegistrationStepperProps) {
  const STEPS = paymentRequired ? STEPS_PAID : STEPS_FREE
  const total = STEPS.length
  return (
    <div
      className={
        sticky
          ? 'sticky top-[4.5rem] z-10 -mx-4 border-b border-yugen/60 bg-yugen-black/90 px-4 py-3 backdrop-blur-md sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none'
          : 'mt-8'
      }
    >
      <div className="flex min-w-0 items-center justify-between gap-1">
        {STEPS.map((step, i) => {
          const done = current > step.num
          const active = current === step.num
          return (
            <div key={step.num} className="flex min-w-0 flex-1 items-center">
              <div className="flex min-w-0 flex-col items-center gap-1.5 sm:gap-2">
                <motion.div
                  animate={{
                    scale: active ? 1.08 : 1,
                    backgroundColor: done || active ? '#ffffff' : 'transparent',
                    color: done || active ? '#000000' : 'rgba(255,255,255,0.35)',
                  }}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-xs font-semibold sm:h-9 sm:w-9 ${
                    done || active ? 'border-yugen-white' : 'border-yugen'
                  }`}
                >
                  {done ? '✓' : step.num}
                </motion.div>
                <span
                  className={`hidden max-w-full truncate text-center text-[10px] uppercase tracking-wider sm:block ${
                    active ? 'text-yugen-white' : 'text-dim'
                  }`}
                >
                  {step.label}
                </span>
                <span
                  className={`max-w-full truncate text-center text-[9px] uppercase tracking-wider sm:hidden ${
                    active ? 'text-yugen-white' : 'text-dim'
                  }`}
                >
                  {step.short}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-1 mb-4 h-px flex-1 bg-yugen-border sm:mx-2 sm:mb-5">
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
      <p className="mt-3 text-center text-xs text-dim sm:hidden">Step {current} of {total}</p>
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
    <div className={`rounded-xl border px-4 py-3.5 text-sm leading-relaxed ${styles[type]}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 flex-1">{message}</p>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="touch-target flex shrink-0 items-center justify-center text-dim hover:text-yugen-white"
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export function CopyButton({
  text,
  label = 'Copy',
  className = 'btn-ghost min-h-11 text-[11px] sm:min-h-0 sm:text-[10px]',
}: {
  text: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className={className}
    >
      {copied ? 'Copied ✓' : label}
    </button>
  )
}
