import { FEATURES } from './features'

export type FlowType = 'delegate' | 'oc' | 'chair' | 'ip'
export type FlowCategory = 'register' | 'apply'
export type RegistrationType = 'internal' | 'external'
export type PaymentMethod = 'upi' | 'cash'

export type FlowConfig = {
  slug: string
  type: FlowType
  registrationType: RegistrationType
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
  paymentMethods?: PaymentMethod[]
}

export const REGISTRATION_FLOWS: FlowConfig[] = [
  {
    slug: 'delegate-r1-internal',
    type: 'delegate',
    registrationType: 'internal',
    round: 1,
    category: 'register',
    title: 'Internal Registration',
    subtitle: 'Round 1 internal delegate registration for PORPS students.',
    eyebrow: 'Internal · Round 1 · PORPS',
    amount: 1000,
    paymentRequired: true,
    active: true,
    idPrefix: 'INT',
    tier: 'internal',
    seoDescription: 'Register for Yūgen Summit 6.0 internal delegate Round 1.',
    paymentMethods: ['upi', 'cash'],
  },
  {
    slug: 'delegate-r1-external',
    type: 'delegate',
    registrationType: 'external',
    round: 1,
    category: 'register',
    title: 'External Registration',
    subtitle: 'Round 1 external delegate registration.',
    eyebrow: 'External · Round 1',
    amount: 1200,
    paymentRequired: true,
    active: false,
    comingSoon: true,
    idPrefix: 'EXT',
    tier: 'external',
    seoDescription: 'Register for Yūgen Summit 6.0 external delegate Round 1.',
    paymentMethods: ['upi'],
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
