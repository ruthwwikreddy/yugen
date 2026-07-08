import { FEATURES } from './features'

export type FlowType = 'delegate' | 'oc' | 'chair' | 'ip'
export type FlowCategory = 'register' | 'apply'

export type FlowConfig = {
  slug: string
  type: FlowType
  round: number
  category: FlowCategory
  title: string
  subtitle: string
  eyebrow: string
  amount: number
  paymentRequired: boolean
  active: boolean
  comingSoon?: boolean
  /** Used in ID generation — keep short */
  idPrefix: string
  tier: string
  seoDescription: string
}

export const REGISTRATION_FLOWS: FlowConfig[] = [
  {
    slug: 'delegate-r1-early-bird',
    type: 'delegate',
    round: 1,
    category: 'register',
    title: 'Early Bird Registration',
    subtitle: 'Round 1 delegate registration with UPI payment.',
    eyebrow: 'Delegate · Round 1 · Early bird',
    amount: 1200,
    paymentRequired: true,
    active: true,
    idPrefix: 'EB',
    tier: 'early-bird',
    seoDescription: 'Register for Yūgen Summit 6.0 early bird delegate Round 1.',
  },
]

export function getFlowBySlug(slug: string): FlowConfig | undefined {
  return REGISTRATION_FLOWS.find((f) => f.slug === slug)
}

export function getActiveFlows(category: FlowCategory): FlowConfig[] {
  return REGISTRATION_FLOWS.filter((f) => f.category === category && f.active && isFlowVisible(f))
}

export function getFlowsByCategory(category: FlowCategory): FlowConfig[] {
  return REGISTRATION_FLOWS.filter((f) => f.category === category && isFlowVisible(f))
}

function isFlowVisible(flow: FlowConfig): boolean {
  if (flow.type === 'delegate') return flow.active && FEATURES.earlyBirdRegistration
  if (flow.type === 'oc') return FEATURES.ocApplications
  if (flow.type === 'chair' || flow.type === 'ip') return FEATURES.applyApplications
  return flow.active
}

export function getFlowBasePath(flow: FlowConfig): string {
  return flow.category === 'register' ? `/register/${flow.slug}` : `/apply/${flow.slug}`
}

/** Legacy early-bird URL → new slug */
export const LEGACY_EARLY_BIRD_SLUG = 'delegate-r1-early-bird'
