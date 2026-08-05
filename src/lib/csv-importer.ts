import type { RegistrationInput, RegistrationStatus } from './registration'
import { prepareMunExperienceForSubmit } from './registration'

const DEFAULT_SCHOOL = 'DDMS AMS P. Obul Reddy Public School'

export type FieldKey =
  | 'name'
  | 'email'
  | 'phone'
  | 'school'
  | 'grade'
  | 'section'
  | 'role'
  | 'committeePreference'
  | 'committeePreference2'
  | 'committeePreference3'
  | 'countryPreference'
  | 'portfolioPreference'
  | 'portfolioPreference2'
  | 'portfolioPreference3'
  | 'experienceDetails'
  | 'dietaryNotes'
  | 'whyJoin'
  | 'portfolioUrl'
  | 'status'
  | 'adminNotes'
  | 'ignore'

export type FieldDefinition = {
  key: FieldKey
  label: string
  required?: boolean
  description: string
}

export const IMPORT_FIELDS: FieldDefinition[] = [
  { key: 'name', label: 'Full Name', required: true, description: 'Delegate / Applicant Name' },
  { key: 'email', label: 'Email Address', required: true, description: 'Contact email' },
  { key: 'phone', label: 'Phone / WhatsApp', required: true, description: 'Phone number' },
  { key: 'school', label: 'School / Institution', required: false, description: 'Defaults to DDMS AMS PORPS if blank' },
  { key: 'grade', label: 'Grade / Class', required: false, description: 'Grade (e.g. 10)' },
  { key: 'section', label: 'Section', required: false, description: 'Section (e.g. A, B, C)' },
  { key: 'role', label: 'Role / Category', required: false, description: 'Role (e.g. Delegate, EB)' },
  { key: 'committeePreference', label: '1st Committee Preference', required: false, description: 'First committee choice' },
  { key: 'portfolioPreference', label: '1st Portfolio Choice', required: false, description: 'Portfolio for Committee 1' },
  { key: 'committeePreference2', label: '2nd Committee Preference', required: false, description: 'Second committee choice' },
  { key: 'portfolioPreference2', label: '2nd Portfolio Choice', required: false, description: 'Portfolio for Committee 2' },
  { key: 'committeePreference3', label: '3rd Committee Preference', required: false, description: 'Third committee choice' },
  { key: 'portfolioPreference3', label: '3rd Portfolio Choice', required: false, description: 'Portfolio for Committee 3' },
  { key: 'countryPreference', label: 'Country / Portfolio Preference', required: false, description: 'General country preference' },
  { key: 'experienceDetails', label: 'Previous MUN Experience', required: false, description: 'Past conferences & awards' },
  { key: 'dietaryNotes', label: 'Dietary / Special Notes', required: false, description: 'Dietary requirements' },
  { key: 'whyJoin', label: 'Statement / Why Join', required: false, description: 'Why joining or motivation' },
  { key: 'portfolioUrl', label: 'Portfolio URL / Resume', required: false, description: 'Link to portfolio or profile' },
  { key: 'status', label: 'Payment / Verification Status', required: false, description: 'Status in Google Sheet' },
  { key: 'adminNotes', label: 'Admin Notes', required: false, description: 'Internal remarks or payment ref' },
  { key: 'ignore', label: '— Ignore Column —', required: false, description: 'Do not import this column' },
]

/** Parse a CSV/TSV string into rows of string arrays */
export function parseCsvOrTsv(rawText: string): string[][] {
  const lines = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
  const rows: string[][] = []

  for (let l = 0; l < lines.length; l++) {
    const line = lines[l].trim()
    if (!line) continue

    const delimiter = line.includes('\t') ? '\t' : ','

    const row: string[] = []
    let inQuotes = false
    let currentCell = ''

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      if (char === '"' || char === "'") {
        if (inQuotes && line[i + 1] === char) {
          currentCell += char
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === delimiter && !inQuotes) {
        row.push(currentCell.trim())
        currentCell = ''
      } else {
        currentCell += char
      }
    }
    row.push(currentCell.trim())

    if (row.some((cell) => cell.length > 0)) {
      rows.push(row)
    }
  }

  return rows
}

/** Context-aware guess for Google Sheet headers */
export function guessFieldMapping(headerName: string, colIdx?: number): FieldKey {
  const h = headerName.toLowerCase().replace(/[^a-z0-9]/g, ' ')

  if (h === 'name' || h.includes('full name') || h.includes('applicant') || h.includes('delegate name')) {
    return 'name'
  }
  if (h.includes('email') || h.includes('mail')) {
    return 'email'
  }
  if (h.includes('phone') || h.includes('whatsapp') || h.includes('contact') || h.includes('mobile') || h.includes('number')) {
    return 'phone'
  }
  if (h.includes('school') || h.includes('institution') || h.includes('college') || h.includes('organization')) {
    return 'school'
  }
  if (h.includes('section')) {
    return 'section'
  }
  if (h.includes('grade') || h.includes('class') || h.includes('standard') || h.includes('year')) {
    return 'grade'
  }
  if (h.includes('role')) {
    return 'role'
  }

  // Committee preferences
  if (
    h.includes('committee preference 1') ||
    h.includes('committee 1') ||
    h.includes('1st committee') ||
    h.includes('preference 1')
  ) {
    return 'committeePreference'
  }
  if (
    h.includes('committee preference 2') ||
    h.includes('committee 2') ||
    h.includes('2nd committee') ||
    h.includes('preference 2')
  ) {
    return 'committeePreference2'
  }
  if (
    h.includes('committee preference 3') ||
    h.includes('committee 3') ||
    h.includes('3rd committee') ||
    h.includes('preference 3')
  ) {
    return 'committeePreference3'
  }

  // Portfolio preferences (often repeated per committee)
  if (h.includes('portfolio')) {
    if (colIdx !== undefined) {
      if (colIdx <= 9) return 'portfolioPreference'
      if (colIdx <= 11) return 'portfolioPreference2'
      return 'portfolioPreference3'
    }
    return 'portfolioPreference'
  }

  if (h.includes('country') || h.includes('nation')) {
    return 'countryPreference'
  }
  if (h.includes('experience') || h.includes('past mun') || h.includes('conference') || h.includes('achievement') || h.includes('award')) {
    return 'experienceDetails'
  }
  if (h.includes('diet') || h.includes('food')) {
    return 'dietaryNotes'
  }
  if (h.includes('why') || h.includes('statement') || h.includes('sop')) {
    return 'whyJoin'
  }
  if (h.includes('url') || h.includes('link') || h.includes('drive')) {
    return 'portfolioUrl'
  }
  if (h.includes('status') || h.includes('payment status')) {
    return 'status'
  }
  if (h.includes('notes') || h.includes('remark') || h.includes('transaction')) {
    return 'adminNotes'
  }

  return 'ignore'
}

export type ParsedImportItem = {
  raw: Record<string, string>
  input: RegistrationInput
  status: RegistrationStatus
  adminNotes: string
  valid: boolean
  errors: string[]
  warnings: string[]
}

/** Convert parsed CSV rows and column map into array of ParsedImportItem */
export function buildImportItems(
  headers: string[],
  rows: string[][],
  columnMap: Record<number, FieldKey>,
  defaultStatus: RegistrationStatus = 'verified'
): ParsedImportItem[] {
  return rows.map((row) => {
    const raw: Record<string, string> = {}
    const fields: Record<string, string> = {}
    const adminNoteParts: string[] = []

    headers.forEach((h, colIdx) => {
      const val = (row[colIdx] ?? '').trim()
      raw[h] = val
      const fieldKey = columnMap[colIdx]

      if (fieldKey && fieldKey !== 'ignore' && val) {
        if (fieldKey === 'status') {
          fields.statusOverride = val
        } else if (fieldKey === 'adminNotes') {
          adminNoteParts.push(val)
        } else if (fieldKey === 'section') {
          fields.section = val
        } else if (fieldKey === 'role') {
          adminNoteParts.push(`Role: ${val}`)
        } else {
          fields[fieldKey] = val
        }
      }
    })

    const name = fields.name ?? ''
    const email = fields.email ?? ''
    const phone = fields.phone ?? ''
    
    // Default school to venue name if blank
    const school = fields.school || DEFAULT_SCHOOL

    // Combine Grade & Section if section present
    let grade = fields.grade ?? ''
    if (fields.section) {
      grade = grade ? `${grade}-${fields.section}` : fields.section
    }

    // Combine portfolio choices into country/portfolio preference text
    const portfolioChoices = [fields.portfolioPreference, fields.portfolioPreference2, fields.portfolioPreference3]
      .filter(Boolean)
      .join(' | ')

    const countryPreference = fields.countryPreference || portfolioChoices

    const errors: string[] = []
    const warnings: string[] = []

    if (!name) errors.push('Missing name')
    if (!email) {
      errors.push('Missing email')
    } else if (!email.includes('@')) {
      warnings.push('Invalid email format')
    }

    const expDetails = fields.experienceDetails ?? ''
    const munExp = prepareMunExperienceForSubmit(expDetails)

    let itemStatus: RegistrationStatus = defaultStatus
    if (fields.statusOverride) {
      const s = fields.statusOverride.toLowerCase()
      if (s.includes('verif') || s.includes('paid') || s.includes('yes') || s.includes('success')) {
        itemStatus = 'verified'
      } else if (s.includes('reject')) {
        itemStatus = 'rejected'
      } else if (s.includes('pend')) {
        itemStatus = 'pending'
      }
    }

    const input: RegistrationInput = {
      name,
      email,
      phone,
      school,
      grade,
      committeePreference: fields.committeePreference ?? '',
      committeePreference2: fields.committeePreference2 ?? '',
      committeePreference3: fields.committeePreference3 ?? '',
      experience: munExp.experience,
      experienceDetails: munExp.experienceDetails,
      awardsAndAchievements: munExp.awardsAndAchievements ?? '',
      countryPreference,
      portfolioPreference: portfolioChoices,
      dietaryNotes: fields.dietaryNotes ?? '',
      whyJoin: fields.whyJoin ?? '',
      portfolioUrl: fields.portfolioUrl ?? '',
    }

    return {
      raw,
      input,
      status: itemStatus,
      adminNotes: adminNoteParts.join(' · '),
      valid: errors.length === 0,
      errors,
      warnings,
    }
  })
}
