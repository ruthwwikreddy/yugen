/** Feature flags — flip to re-enable hidden surfaces without deleting code. */
export const FEATURES = {
  /** Delegate early bird registration (only open registration flow) */
  earlyBirdRegistration: true,
  /** Chair & International Press applications on /apply */
  applyApplications: false,
  /** OC application flows, routes, and apply-page OC card */
  ocApplications: false,
} as const

export const EARLY_BIRD_REGISTER_PATH = '/register/early-bird'

export function isApplyOpen(): boolean {
  return FEATURES.applyApplications || FEATURES.ocApplications
}

export function isOCFlow(type: string): boolean {
  return type === 'oc'
}

export function isApplyFlow(type: string): boolean {
  return type === 'chair' || type === 'ip' || type === 'oc'
}
