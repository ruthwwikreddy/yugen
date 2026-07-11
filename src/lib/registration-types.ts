import type { FlowType, PaymentMethod } from '../config/registrations'

export type RegistrationStatus = 'pending' | 'paid' | 'verified' | 'rejected'

export type AllocationStatus = 'unallocated' | 'allocated' | 'waitlisted'

export type Registration = {
  id: string
  flowSlug: string
  flowType: FlowType
  round: number
  name: string
  email: string
  phone: string
  school: string
  grade: string
  committeePreference: string
  committeePreference2: string
  committeePreference3: string
  experience: string
  experienceDetails: string
  awardsAndAchievements: string
  dietaryNotes: string
  countryPreference: string
  portfolioPreference: string
  whyJoin: string
  availability: string
  portfolioUrl: string
  adminNotes: string
  amount: number
  paymentRequired: boolean
  paymentMethod?: PaymentMethod
  tier: string
  status: RegistrationStatus
  allocationStatus: AllocationStatus
  allocatedCommittee?: string
  allocatedCountry?: string
  allocationNotes?: string
  createdAt: import('firebase/firestore').Timestamp | null
  paidAt: import('firebase/firestore').Timestamp | null
  allocatedAt?: import('firebase/firestore').Timestamp | null
}

export type RegistrationInput = {
  name: string
  email: string
  phone: string
  school: string
  grade: string
  committeePreference?: string
  committeePreference2?: string
  committeePreference3?: string
  experience: string
  experienceDetails?: string
  awardsAndAchievements?: string
  dietaryNotes?: string
  countryPreference?: string
  portfolioPreference?: string
  whyJoin?: string
  availability?: string
  portfolioUrl?: string
  paymentMethod?: PaymentMethod
}

export type RegistrationUpdate = Partial<RegistrationInput> & {
  adminNotes?: string
  status?: RegistrationStatus
  allocationStatus?: AllocationStatus
  allocatedCommittee?: string
  allocatedCountry?: string
  allocationNotes?: string
}

export type CreateRegistrationResult = {
  id: string
  registration: Registration
  cloudSynced: boolean
  warning?: string
}
