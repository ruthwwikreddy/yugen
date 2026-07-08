import type { Registration } from './registration-types'
import type { FlowConfig } from '../config/registrations'

const SESSION_KEY = 'yugen-active-flow-session'

export type ActiveSession = {
  id: string
  flowSlug: string
  step: 'payment' | 'confirm'
  registration: Registration
  warning?: string
}

export function saveActiveSession(session: ActiveSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getActiveSession(): ActiveSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ActiveSession
  } catch {
    return null
  }
}

export function clearActiveSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

export function updateSessionStep(step: 'payment' | 'confirm', registration?: Registration) {
  const current = getActiveSession()
  if (!current) return
  saveActiveSession({
    ...current,
    step,
    registration: registration ?? current.registration,
  })
}

export type FlowStep = 'form' | 'payment' | 'confirm'

export function getStepsForFlow(flow: FlowConfig): { num: number; label: string; short: string; key: FlowStep }[] {
  if (flow.paymentRequired) {
    return [
      { num: 1, label: 'Details', short: 'Info', key: 'form' },
      { num: 2, label: 'Payment', short: 'Pay', key: 'payment' },
      { num: 3, label: 'Confirm', short: 'Done', key: 'confirm' },
    ]
  }
  return [
    { num: 1, label: 'Application', short: 'Apply', key: 'form' },
    { num: 2, label: 'Confirm', short: 'Done', key: 'confirm' },
  ]
}

export function stepFromPath(pathStep: string | undefined, _paymentRequired: boolean): FlowStep {
  if (pathStep === 'payment') return 'payment'
  if (pathStep === 'confirm') return 'confirm'
  return 'form'
}

export function stepNumber(step: FlowStep, paymentRequired: boolean): number {
  if (!paymentRequired) {
    return step === 'form' ? 1 : 2
  }
  return step === 'form' ? 1 : step === 'payment' ? 2 : 3
}

export function nextStepAfterForm(flow: FlowConfig): FlowStep {
  return flow.paymentRequired ? 'payment' : 'confirm'
}
