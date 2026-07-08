export type OCApplicationStatus = 'pending' | 'under-review' | 'interview-scheduled' | 'accepted' | 'rejected' | 'waitlisted'

export type OCRole = {
  id: string
  title: string
  department: string
  description: string
  requirements: string[]
  responsibilities: string[]
  availableRounds: number[]
  capacity?: number
  currentApplicants?: number
}

export type OCApplication = {
  id: string
  flowSlug: string
  flowType: 'oc'
  round: number
  roleId: string
  roleTitle: string
  department: string
  name: string
  email: string
  phone: string
  school: string
  grade: string
  experience: string
  whyJoin: string
  relevantSkills: string
  availability: string
  previousMunExperience: string
  portfolioUrl?: string
  adminNotes: string
  status: OCApplicationStatus
  interviewScheduled?: boolean
  interviewDate?: string
  createdAt: import('firebase/firestore').Timestamp | null
  updatedAt: import('firebase/firestore').Timestamp | null
}

export type OCApplicationInput = {
  roleId: string
  name: string
  email: string
  phone: string
  school: string
  grade: string
  experience: string
  whyJoin: string
  relevantSkills: string
  availability: string
  previousMunExperience: string
  portfolioUrl?: string
}

export type OCApplicationUpdate = Partial<OCApplicationInput> & {
  adminNotes?: string
  status?: OCApplicationStatus
  interviewScheduled?: boolean
  interviewDate?: string
}

export type CreateOCApplicationResult = {
  id: string
  application: OCApplication
  cloudSynced: boolean
  warning?: string
}

export type OCRoundConfig = {
  round: number
  title: string
  description: string
  startDate?: string
  endDate?: string
  status: 'upcoming' | 'open' | 'closed' | 'archived'
  roles: OCRole[]
}

export function getOCApplicationStatusLabel(status: OCApplicationStatus): string {
  const labels: Record<OCApplicationStatus, string> = {
    'pending': 'Pending Review',
    'under-review': 'Under Review',
    'interview-scheduled': 'Interview Scheduled',
    'accepted': 'Accepted',
    'rejected': 'Rejected',
    'waitlisted': 'Waitlisted',
  }
  return labels[status] || status
}

export function getOCStatusColor(status: OCApplicationStatus): string {
  const colors: Record<OCApplicationStatus, string> = {
    'pending': 'text-yellow-400',
    'under-review': 'text-blue-400',
    'interview-scheduled': 'text-purple-400',
    'accepted': 'text-green-400',
    'rejected': 'text-red-400',
    'waitlisted': 'text-orange-400',
  }
  return colors[status] || 'text-gray-400'
}

export function isOCApplicationRoundOpen(role: OCRole, currentRound: number): boolean {
  return role.availableRounds.includes(currentRound)
}

export function getOCApplicationProgress(status: OCApplicationStatus): number {
  const progress: Record<OCApplicationStatus, number> = {
    'pending': 10,
    'under-review': 30,
    'interview-scheduled': 50,
    'accepted': 100,
    'rejected': 0,
    'waitlisted': 70,
  }
  return progress[status] || 0
}
