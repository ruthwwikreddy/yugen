import { getAllocatableCommittees } from './yugen'

export type PortfolioSlotType = 'country' | 'leader' | 'portfolio'

export type PortfolioSlot = {
  id: string
  label: string
  type: PortfolioSlotType
  committeeId: string
  tags?: string[]
}

function slot(
  committeeId: string,
  label: string,
  type: PortfolioSlotType,
  tags?: string[],
): PortfolioSlot {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return {
    id: `${committeeId}-${slug}`,
    label,
    type,
    committeeId,
    tags,
  }
}

function countrySlots(committeeId: string, countries: string[]): PortfolioSlot[] {
  return countries.map((c) => slot(committeeId, c, 'country', [c]))
}

/** Lok Sabha — Indian political leaders, ministers, opposition, CMs, and key MPs */
const LOK_SABHA_LEADERS: { name: string; role: string; tags?: string[] }[] = [
  { name: 'Narendra Modi', role: 'Prime Minister', tags: ['BJP', 'Gujarat', 'cabinet'] },
  { name: 'Om Birla', role: 'Speaker of the Lok Sabha', tags: ['BJP', 'Rajasthan'] },
  { name: 'Rahul Gandhi', role: 'Leader of the Opposition', tags: ['Congress', 'Kerala', 'Wayanad'] },
  { name: 'Mallikarjun Kharge', role: 'Leader of Congress in Lok Sabha', tags: ['Congress', 'Karnataka'] },
  { name: 'Rajnath Singh', role: 'Minister of Defence', tags: ['BJP', 'cabinet', 'Uttar Pradesh'] },
  { name: 'Amit Shah', role: 'Minister of Home Affairs', tags: ['BJP', 'cabinet', 'Gujarat'] },
  { name: 'S. Jaishankar', role: 'Minister of External Affairs', tags: ['BJP', 'cabinet'] },
  { name: 'Nirmala Sitharaman', role: 'Minister of Finance', tags: ['BJP', 'cabinet', 'Rajya Sabha'] },
  { name: 'Nitin Gadkari', role: 'Minister of Road Transport & Highways', tags: ['BJP', 'cabinet', 'Maharashtra'] },
  { name: 'Piyush Goyal', role: 'Minister of Commerce & Industry', tags: ['BJP', 'cabinet'] },
  { name: 'Ashwini Vaishnaw', role: 'Minister of Railways & IT', tags: ['BJP', 'cabinet', 'Odisha'] },
  { name: 'Dharmendra Pradhan', role: 'Minister of Education', tags: ['BJP', 'cabinet', 'Odisha'] },
  { name: 'Bhupender Yadav', role: 'Minister of Environment & Forests', tags: ['BJP', 'cabinet', 'Rajasthan'] },
  { name: 'Hardeep Singh Puri', role: 'Minister of Petroleum & Natural Gas', tags: ['BJP', 'cabinet'] },
  { name: 'Sarbananda Sonowal', role: 'Minister of Ports & Shipping', tags: ['BJP', 'cabinet', 'Assam'] },
  { name: 'Giriraj Singh', role: 'Minister of Rural Development', tags: ['BJP', 'cabinet', 'Bihar'] },
  { name: 'Narayan Rane', role: 'Minister of MSME', tags: ['BJP', 'cabinet', 'Maharashtra'] },
  { name: 'Pralhad Joshi', role: 'Minister of Coal & Mines', tags: ['BJP', 'cabinet', 'Karnataka'] },
  { name: 'Kiren Rijiju', role: 'Minister of Earth Sciences', tags: ['BJP', 'cabinet', 'Arunachal Pradesh'] },
  { name: 'Smriti Irani', role: 'Minister of Women & Child Development', tags: ['BJP', 'cabinet'] },
  { name: 'Anurag Thakur', role: 'Minister of Youth Affairs & Sports', tags: ['BJP', 'cabinet', 'Himachal Pradesh'] },
  { name: 'G Kishan Reddy', role: 'Minister of Tourism & Culture', tags: ['BJP', 'cabinet', 'Telangana'] },
  { name: 'Arjun Ram Meghwal', role: 'Minister of Law & Justice', tags: ['BJP', 'cabinet', 'Rajasthan'] },
  { name: 'Jitendra Singh', role: 'Minister of Science & Technology', tags: ['BJP', 'cabinet', 'Jammu & Kashmir'] },
  { name: 'Rameshwar Teli', role: 'Minister of Labour & Employment', tags: ['BJP', 'cabinet', 'Assam'] },
  { name: 'Meenakshi Lekhi', role: 'Minister of State for External Affairs', tags: ['BJP', 'cabinet', 'Delhi'] },
  { name: 'V Muraleedharan', role: 'Minister of State for External Affairs', tags: ['BJP', 'cabinet', 'Kerala'] },
  { name: 'JP Nadda', role: 'Minister of Health & Family Welfare', tags: ['BJP', 'cabinet', 'Rajya Sabha'] },
  { name: 'Mansukh Mandaviya', role: 'Minister of Chemicals & Fertilizers', tags: ['BJP', 'cabinet', 'Gujarat'] },
  { name: 'Yogi Adityanath', role: 'Chief Minister of Uttar Pradesh', tags: ['BJP', 'CM', 'Uttar Pradesh'] },
  { name: 'Bhagwant Mann', role: 'Chief Minister of Punjab', tags: ['AAP', 'CM', 'Punjab'] },
  { name: 'Himanta Biswa Sarma', role: 'Chief Minister of Assam', tags: ['BJP', 'CM', 'Assam'] },
  { name: 'Mohan Yadav', role: 'Chief Minister of Madhya Pradesh', tags: ['BJP', 'CM', 'Madhya Pradesh'] },
  { name: 'Eknath Shinde', role: 'Chief Minister of Maharashtra', tags: ['Shiv Sena', 'CM', 'Maharashtra'] },
  { name: 'Pinarayi Vijayan', role: 'Chief Minister of Kerala', tags: ['CPI(M)', 'CM', 'Kerala'] },
  { name: 'Siddaramaiah', role: 'Chief Minister of Karnataka', tags: ['Congress', 'CM', 'Karnataka'] },
  { name: 'Revanth Reddy', role: 'Chief Minister of Telangana', tags: ['Congress', 'CM', 'Telangana'] },
  { name: 'Pushkar Singh Dhami', role: 'Chief Minister of Uttarakhand', tags: ['BJP', 'CM', 'Uttarakhand'] },
  { name: 'Nayab Singh Saini', role: 'Chief Minister of Haryana', tags: ['BJP', 'CM', 'Haryana'] },
  { name: 'Bhajan Lal Sharma', role: 'Chief Minister of Rajasthan', tags: ['BJP', 'CM', 'Rajasthan'] },
  { name: 'Vishnu Deo Sai', role: 'Chief Minister of Chhattisgarh', tags: ['BJP', 'CM', 'Chhattisgarh'] },
  { name: 'Akhilesh Yadav', role: 'Samajwadi Party Leader', tags: ['SP', 'opposition', 'Uttar Pradesh'] },
  { name: 'Mamata Banerjee', role: 'Trinamool Congress Leader', tags: ['TMC', 'opposition', 'West Bengal'] },
  { name: 'M K Stalin', role: 'Chief Minister of Tamil Nadu', tags: ['DMK', 'CM', 'Tamil Nadu'] },
  { name: 'Arvind Kejriwal', role: 'Aam Aadmi Party Leader', tags: ['AAP', 'opposition', 'Delhi'] },
  { name: 'Sharad Pawar', role: 'NCP (SP) Leader', tags: ['NCP', 'opposition', 'Maharashtra'] },
  { name: 'Nitish Kumar', role: 'Chief Minister of Bihar', tags: ['JD(U)', 'CM', 'Bihar'] },
  { name: 'Tejashwi Yadav', role: 'Deputy Chief Minister of Bihar', tags: ['RJD', 'opposition', 'Bihar'] },
  { name: 'Chandrababu Naidu', role: 'Chief Minister of Andhra Pradesh', tags: ['TDP', 'CM', 'Andhra Pradesh'] },
  { name: 'K Chandrashekar Rao', role: 'BRS Leader', tags: ['BRS', 'opposition', 'Telangana'] },
  { name: 'Mehbooba Mufti', role: 'PDP Leader', tags: ['PDP', 'opposition', 'Jammu & Kashmir'] },
  { name: 'Farooq Abdullah', role: 'National Conference Leader', tags: ['NC', 'opposition', 'Jammu & Kashmir'] },
  { name: 'Asaduddin Owaisi', role: 'AIMIM Leader', tags: ['AIMIM', 'opposition', 'Hyderabad'] },
  { name: 'Sitaram Yechury', role: 'CPI(M) General Secretary', tags: ['CPI(M)', 'opposition', 'Rajya Sabha'] },
  { name: 'Shashi Tharoor', role: 'Congress MP', tags: ['Congress', 'MP', 'Kerala'] },
  { name: 'Supriya Sule', role: 'NCP (SP) MP', tags: ['NCP', 'MP', 'Maharashtra'] },
  { name: 'Mahua Moitra', role: 'Trinamool Congress MP', tags: ['TMC', 'MP', 'West Bengal'] },
  { name: 'Derek O\'Brien', role: 'Trinamool Congress MP', tags: ['TMC', 'MP', 'Rajya Sabha'] },
  { name: 'Raghav Chadha', role: 'AAP MP', tags: ['AAP', 'MP', 'Rajya Sabha'] },
  { name: 'Sanjay Singh', role: 'AAP MP', tags: ['AAP', 'MP', 'Rajya Sabha'] },
  { name: 'Varun Gandhi', role: 'BJP MP', tags: ['BJP', 'MP', 'Uttar Pradesh'] },
  { name: 'Manish Tewari', role: 'Congress MP', tags: ['Congress', 'MP', 'Punjab'] },
  { name: 'Kanimozhi', role: 'DMK MP', tags: ['DMK', 'MP', 'Tamil Nadu'] },
  { name: 'Dayanidhi Maran', role: 'DMK MP', tags: ['DMK', 'MP', 'Tamil Nadu'] },
  { name: 'Tiruchi Siva', role: 'DMK MP', tags: ['DMK', 'MP', 'Rajya Sabha'] },
  { name: 'Jayant Chaudhary', role: 'RLD Leader', tags: ['RLD', 'opposition', 'Uttar Pradesh'] },
  { name: 'Hans Raj Hans', role: 'BJP MP', tags: ['BJP', 'MP', 'Delhi'] },
]

const DISEC_COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'France', 'Russia', 'China', 'Pakistan',
  'Israel', 'Iran', 'North Korea', 'South Korea', 'Japan', 'Germany', 'Brazil', 'Canada',
  'Australia', 'Saudi Arabia', 'Turkey', 'Ukraine', 'Egypt', 'South Africa', 'Nigeria',
  'Indonesia', 'Vietnam', 'Syria', 'Iraq', 'Libya', 'Yemen', 'Afghanistan', 'Mexico',
  'Argentina', 'Poland', 'Sweden', 'Switzerland', 'Norway', 'Netherlands', 'Italy',
  'Spain', 'Belgium', 'Bangladesh', 'Myanmar', 'Philippines', 'Thailand', 'Malaysia',
]

const UNHRC_COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'France', 'Germany', 'China', 'Russia',
  'Brazil', 'South Africa', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Myanmar', 'Afghanistan',
  'Israel', 'Palestine', 'Iran', 'Iraq', 'Syria', 'Yemen', 'Sudan', 'South Sudan',
  'Ethiopia', 'Eritrea', 'Nigeria', 'Democratic Republic of the Congo', 'Rwanda',
  'Venezuela', 'Cuba', 'Nicaragua', 'Colombia', 'Mexico', 'Canada', 'Australia',
  'Japan', 'South Korea', 'Indonesia', 'Philippines', 'Turkey', 'Saudi Arabia',
  'United Arab Emirates', 'Qatar', 'Egypt', 'Morocco', 'Algeria', 'Tunisia',
]

const SPECPOL_COUNTRIES = [
  'India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Bhutan', 'Maldives',
  'Palestine', 'Israel', 'Morocco', 'Algeria', 'Western Sahara', 'Egypt', 'Libya',
  'South Africa', 'Kenya', 'Nigeria', 'Ghana', 'France', 'United Kingdom', 'United States',
  'China', 'Russia', 'Indonesia', 'Malaysia', 'Philippines', 'Australia', 'New Zealand',
  'Cuba', 'Venezuela', 'Brazil', 'Argentina', 'Chile', 'Mexico', 'Portugal', 'Spain',
  'Netherlands', 'Belgium', 'Germany', 'Japan', 'South Korea', 'Turkey', 'Iran',
  'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Syria', 'Iraq', 'Afghanistan',
]

const ECOSOC_COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'France', 'Germany', 'China', 'Japan',
  'Brazil', 'South Africa', 'Nigeria', 'Kenya', 'Ethiopia', 'Egypt', 'Bangladesh',
  'Pakistan', 'Indonesia', 'Philippines', 'Vietnam', 'Thailand', 'Malaysia', 'Singapore',
  'Australia', 'Canada', 'Mexico', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Turkey',
  'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Israel', 'Iran', 'Russia', 'Ukraine',
  'Poland', 'Sweden', 'Norway', 'Netherlands', 'Italy', 'Spain', 'Belgium', 'Switzerland',
]

const FCC_ROLES = [
  'UN Secretary-General',
  'NATO Secretary General',
  'EU High Representative',
  'US President',
  'Russian President',
  'Chinese Premier',
  'Indian Prime Minister',
  'UK Prime Minister',
  'French President',
  'German Chancellor',
  'Japanese Prime Minister',
  'Brazilian President',
  'South African President',
  'UAE Foreign Minister',
  'Saudi Energy Minister',
  'Israeli Defence Minister',
  'Iranian Foreign Minister',
  'Ukrainian President',
  'Turkish President',
  'Pakistani Prime Minister',
  'Tech Industry CEO',
  'Global Health Director',
  'Climate Envoy',
  'Intelligence Agency Director',
  'Military Joint Chiefs Chair',
]

function buildSlots(): PortfolioSlot[] {
  const lokSabha = LOK_SABHA_LEADERS.map(({ name, role, tags }) =>
    slot('lok-sabha', name, 'leader', [role, ...(tags ?? [])]),
  )

  return [
    ...countrySlots('disec', DISEC_COUNTRIES),
    ...countrySlots('unhrc', UNHRC_COUNTRIES),
    ...countrySlots('specpol', SPECPOL_COUNTRIES),
    ...countrySlots('ecosoc', ECOSOC_COUNTRIES),
    ...FCC_ROLES.map((r) => slot('fcc', r, 'portfolio', [r])),
    ...lokSabha,
  ]
}

export const PORTFOLIO_SLOTS: PortfolioSlot[] = buildSlots()

export function getPortfolioSlots(): PortfolioSlot[] {
  return PORTFOLIO_SLOTS
}

export function getPortfolioCountsByCommittee(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const s of PORTFOLIO_SLOTS) {
    counts[s.committeeId] = (counts[s.committeeId] ?? 0) + 1
  }
  return counts
}

export function filterPortfolioSlots(
  query: string,
  committeeId?: string | null,
): PortfolioSlot[] {
  const q = query.trim().toLowerCase()
  let results = PORTFOLIO_SLOTS

  if (committeeId && committeeId !== 'all') {
    results = results.filter((s) => s.committeeId === committeeId)
  }

  if (!q) return results

  return results.filter((s) => {
    const haystack = [s.label, s.type, s.committeeId, ...(s.tags ?? [])]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

export function groupSlotsByCommittee(
  slots: PortfolioSlot[],
): { committeeId: string; acronym: string; name: string; slots: PortfolioSlot[] }[] {
  const committees = getAllocatableCommittees()
  const byId = new Map<string, PortfolioSlot[]>()

  for (const s of slots) {
    const list = byId.get(s.committeeId) ?? []
    list.push(s)
    byId.set(s.committeeId, list)
  }

  return committees
    .filter((c) => byId.has(c.id))
    .map((c) => ({
      committeeId: c.id,
      acronym: c.acronym,
      name: c.name,
      slots: byId.get(c.id) ?? [],
    }))
}

export const SLOT_TYPE_LABELS: Record<PortfolioSlotType, string> = {
  country: 'Country',
  leader: 'Leader',
  portfolio: 'Portfolio',
}
