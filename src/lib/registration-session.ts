import type { Registration } from './registration'

const SESSION_KEY = 'yugen-active-registration'

export type ActiveSession = {
  id: string
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
