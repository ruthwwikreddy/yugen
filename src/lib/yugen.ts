export type CommitteeChair = {
  name: string
  role: string
  initials: string
  image?: string
}

export type Committee = {
  id: string
  acronym: string
  name: string
  type: string
  topic: string
  topicExpanded?: string
  difficulty: string
  delegateCapacity: string
  portfolioRequired: boolean
  portfolioNote?: string
  venue?: string
  studyGuideUrl?: string
  studyGuideStatus: 'available' | 'coming-soon'
  status: 'announcing-soon' | 'live'
  chairs: CommitteeChair[]
}

export const YUGEN = {
  name: 'Yūgen Summit 6.0',
  shortName: 'Yūgen',
  edition: '6.0',
  tagline: 'Making Every Voice Matter',
  status: 'coming-soon' as const,
  teaserStack: ['BACK', 'BACK', 'BACK'],
  teaserPunch: 'WE ARE BACK',
  dates: 'Coming soon',
  datesHero: 'COMING SOON',
  venue: 'P. Obul Reddy Public School',
  venueShort: 'PORPS',
  city: 'Hyderabad',
  country: 'India',
  timezone: 'Asia/Kolkata',
  social: {
    instagram: '@yugenporps',
    instagramUrl: 'https://instagram.com/yugenporps',
  },
  email: 'hello@yugenporps.in',
  brand: {
    black: '#000000',
    surface: '#0A0A0A',
    surfaceRaised: '#111111',
    white: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.55)',
    dim: 'rgba(255, 255, 255, 0.35)',
    border: 'rgba(255, 255, 255, 0.12)',
    borderStrong: 'rgba(255, 255, 255, 0.22)',
  },
  stats: [
    { label: 'Edition', value: '6.0' },
    { label: 'Committees', value: 'TBA' },
    { label: 'Delegates', value: 'TBA' },
    { label: 'Schools', value: 'TBA' },
  ],
  about: {
    headline: 'Six editions in. The next chapter is on the way.',
    paragraphs: [
      'Yūgen Summit is Hyderabad\'s premier inter-school Model United Nations conference, hosted at P. Obul Reddy Public School. For six editions, we\'ve brought together delegates who believe every voice matters — in committee rooms, in caucus, and beyond.',
      'Yūgen 6.0 continues that legacy. Dates, committees, and registration details drop here first — follow @yugenporps for the latest.',
    ],
    letterFromSG: {
      signatory: 'Secretary General',
      signatoryName: 'TBA',
      paragraphs: [
        'On behalf of the Yūgen Summit secretariat, welcome to the sixth edition of our conference at P. Obul Reddy Public School.',
        'Yūgen has always been about one thing: making every voice matter. Whether you are a first-time delegate or a seasoned chair, we are building an experience that challenges, includes, and inspires.',
        'The full letter from our Secretary General publishes when the secretariat roster is confirmed.',
      ],
    },
  },
  legacy: {
    headline: 'Five editions. One standard.',
    description: 'Past Yūgen summits set the bar for delegate experience in Hyderabad. Final numbers for 6.0 publish when confirmed.',
    editions: [
      { edition: '5.0', year: 'TBA', delegates: 'TBA', committees: 'TBA', schools: 'TBA', highlight: 'TBA — add highlight from Yūgen 5.0' },
      { edition: '4.0', year: 'TBA', delegates: 'TBA', committees: 'TBA', schools: 'TBA', highlight: 'TBA — add highlight from Yūgen 4.0' },
      { edition: '3.0', year: 'TBA', delegates: 'TBA', committees: 'TBA', schools: 'TBA', highlight: 'TBA — add highlight from Yūgen 3.0' },
    ],
  },
  gallery: [] as { id: string; src: string; alt: string; caption?: string }[],
  schedule: [] as { day: string; items: { time: string; title: string; location?: string }[] }[],
  dressCode: [] as { title: string; description: string }[],
  committees: [] as Committee[],
  secretariat: [
    { name: 'TBA', role: 'Secretary General', initials: 'SG' },
    { name: 'TBA', role: 'Deputy Secretary General', initials: 'DSG' },
    { name: 'TBA', role: 'Director General', initials: 'DG' },
    { name: 'TBA', role: 'USG Communications', initials: 'UC' },
  ] as { name: string; role: string; initials: string; image?: string }[],
  team: {
    usgs: [
      { role: 'USG Delegate Affairs', name: 'TBA', initials: 'UDA' },
      { role: 'USG Logistics', name: 'TBA', initials: 'UL' },
      { role: 'USG Marketing', name: 'TBA', initials: 'UM' },
      { role: 'USG Operations', name: 'TBA', initials: 'UO' },
    ] as { role: string; name: string; initials: string; image?: string }[],
    eb: [] as { role: string; committee: string; name: string; initials: string; image?: string }[],
  },
  resources: [] as {
    id: string
    title: string
    description: string
    type: 'pdf' | 'link'
    url?: string
    status: 'available' | 'coming-soon'
  }[],
  delegatesGuide: {
    intro: 'Everything delegates and faculty advisors need before Yūgen 6.0. Full handbook publishes when registration opens.',
    sections: [
      { title: 'What to bring', items: ['TBA — school ID', 'TBA — stationery', 'TBA — formal attire', 'TBA — laptop (if applicable)'] },
      { title: 'Code of conduct', items: ['TBA — respect in committee', 'TBA — plagiarism policy', 'TBA — campus rules', 'TBA — social media guidelines'] },
      { title: 'Registration process', items: ['School and individual delegate flows publish when registration opens on Gathrly', 'UPI and Razorpay payment options via our event technology partner', 'QR gate check-in at PORPS on conference day', 'Confirmation timeline and receipts sent through the Gathrly organizer dashboard'] },
    ],
  },
  faq: [
    { q: 'When will Yūgen 6.0 take place?', a: 'Dates are coming soon. Join the notify list or follow @yugenporps — we announce here first.' },
    { q: 'When does registration open?', a: 'Registration is not live yet. When it opens, delegate slots and UPI payment will run on Gathrly — our event registration technology partner. Use the Get Notified form and we will email you the moment registration goes live.' },
    { q: 'Is Yūgen open to all schools?', a: 'TBA — add eligibility criteria (inter-school, grade levels, etc.) when confirmed by the organizing committee.' },
    { q: 'Can I register as an individual delegate?', a: 'TBA — add individual vs school delegation policy when registration details are finalized.' },
    { q: 'What committees will be offered?', a: 'The full committee roster and agendas are announcing soon. Check /committees for placeholder cards until then.' },
    { q: 'What is the dress code?', a: 'Western formal and session-specific guidelines publish before registration. See /delegates for the full handbook when live.' },
    { q: 'Are study guides provided?', a: 'Study guides for each committee will be available on /resources when committees are announced.' },
    { q: 'What are the delegate fees?', a: 'Pricing tiers publish when registration opens. Early bird, standard, and late fees will be listed on /register.' },
    { q: 'Is accommodation provided?', a: 'TBA — see /accommodation for travel and hotel guidance for outstation delegations when published.' },
    { q: 'How do I apply to chair or join the IP?', a: 'Chair and International Press applications open on /apply. Details drop with the secretariat announcement.' },
    { q: 'What is the refund policy?', a: 'Refund terms publish alongside registration. See /refund for the current policy framework.' },
    { q: 'How do I contact the secretariat?', a: 'Email hello@yugenporps.in or use the form on /contact.' },
  ],
  sponsors: [
    { name: 'Gathrly', tier: 'partner', url: 'https://www.gathrly.in/' },
  ] as { name: string; tier: 'title' | 'gold' | 'silver' | 'partner'; logo?: string; url?: string }[],
  awards: [] as { name: string; description: string; criteria?: string }[],
  apply: [
    { id: 'chair', title: 'Chair Applications', description: 'Lead a committee at Yūgen 6.0. Requirements and form publish soon.', status: 'coming-soon' as const },
    { id: 'ip', title: 'International Press', description: 'Join the Yūgen IP corps. Portfolio requirements announcing soon.', status: 'coming-soon' as const },
    { id: 'oc', title: 'Organizing Committee', description: 'USG and department roles fill through internal OC recruitment.', status: 'coming-soon' as const },
  ],
  press: {
    intro: 'Media inquiries, press passes, and brand assets for Yūgen Summit 6.0.',
    contact: 'hello@yugenporps.in',
    kit: [] as { title: string; url?: string; status: 'available' | 'coming-soon' }[],
  },
  venueDetail: {
    address: 'TBA — P. Obul Reddy Public School full address',
    mapUrl: '' as string,
    parking: 'TBA — parking instructions for faculty advisors and delegates',
    accessibility: 'TBA — accessibility information for campus venues',
    committeeRooms: 'TBA — room assignments publish with the committee roster',
    campusMapUrl: '' as string,
  },
  accommodation: {
    intro: 'Guidance for outstation delegations attending Yūgen 6.0 in Hyderabad.',
    hotels: [] as { name: string; distance?: string; contact?: string; notes?: string }[],
    travel: [
      { title: 'By air', description: 'TBA — nearest airport and typical travel time to PORPS' },
      { title: 'By train', description: 'TBA — nearest railway station and connectivity' },
      { title: 'Local transport', description: 'TBA — cab, metro, and campus arrival instructions' },
    ],
  },
  pricing: [] as { tier: string; price: string; note: string; features: string[] }[],
  registration: {
    status: 'coming-soon' as const,
    path: '/register',
  },
  nav: [
    { label: 'About', href: '/about' },
    { label: 'Committees', href: '/committees' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Resources', href: '/resources' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  footerLinks: {
    event: [
      { label: 'About', href: '/about' },
      { label: 'Schedule', href: '/schedule' },
      { label: 'Committees', href: '/committees' },
      { label: 'Team', href: '/team' },
      { label: 'Venue', href: '/venue' },
      { label: 'Gallery', href: '/gallery' },
    ],
    delegates: [
      { label: 'Register', href: '/register' },
      { label: 'Delegate Guide', href: '/delegates' },
      { label: 'Resources', href: '/resources' },
      { label: 'Awards', href: '/awards' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Accommodation', href: '/accommodation' },
    ],
    org: [
      { label: 'Apply', href: '/apply' },
      { label: 'Sponsors', href: '/sponsors' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
} as const

const DEFAULT_CHAIRS: CommitteeChair[] = [
  { name: 'TBA', role: 'Chair', initials: 'CH' },
  { name: 'TBA', role: 'Vice-Chair', initials: 'VC' },
]

/** Placeholder roster — replace entire array in YUGEN.committees when councils are confirmed */
export const DEFAULT_COMMITTEES: Committee[] = [
  {
    id: 'committee-i',
    acronym: 'TBA',
    name: 'Committee I',
    type: 'Security Council',
    topic: 'Agenda announcing soon',
    topicExpanded: 'The full agenda for Committee I publishes when the Yūgen 6.0 organizing committee confirms the council lineup. Study guide and portfolio requirements will appear on this page.',
    difficulty: 'TBA',
    delegateCapacity: 'TBA',
    portfolioRequired: true,
    portfolioNote: 'TBA — position paper requirements publish with the study guide.',
    venue: 'TBA — room assignment',
    studyGuideStatus: 'coming-soon',
    status: 'announcing-soon',
    chairs: DEFAULT_CHAIRS,
  },
  {
    id: 'committee-ii',
    acronym: 'TBA',
    name: 'Committee II',
    type: 'General Assembly',
    topic: 'Agenda announcing soon',
    topicExpanded: 'Committee II agenda and background guide drop here first. Follow @yugenporps for the reveal.',
    difficulty: 'TBA',
    delegateCapacity: 'TBA',
    portfolioRequired: true,
    portfolioNote: 'TBA — portfolio guidelines coming soon.',
    venue: 'TBA — room assignment',
    studyGuideStatus: 'coming-soon',
    status: 'announcing-soon',
    chairs: DEFAULT_CHAIRS,
  },
  {
    id: 'committee-iii',
    acronym: 'TBA',
    name: 'Committee III',
    type: 'General Assembly',
    topic: 'Agenda announcing soon',
    topicExpanded: 'Full topic brief and committee overview publish with the final roster.',
    difficulty: 'TBA',
    delegateCapacity: 'TBA',
    portfolioRequired: true,
    portfolioNote: 'TBA',
    venue: 'TBA — room assignment',
    studyGuideStatus: 'coming-soon',
    status: 'announcing-soon',
    chairs: DEFAULT_CHAIRS,
  },
  {
    id: 'committee-iv',
    acronym: 'TBA',
    name: 'Committee IV',
    type: 'Specialized Agency',
    topic: 'Agenda announcing soon',
    topicExpanded: 'Specialized agency mandate and agenda announcing soon for Yūgen 6.0.',
    difficulty: 'TBA',
    delegateCapacity: 'TBA',
    portfolioRequired: true,
    portfolioNote: 'TBA',
    venue: 'TBA — room assignment',
    studyGuideStatus: 'coming-soon',
    status: 'announcing-soon',
    chairs: DEFAULT_CHAIRS,
  },
  {
    id: 'committee-v',
    acronym: 'TBA',
    name: 'Committee V',
    type: 'Human Rights',
    topic: 'Agenda announcing soon',
    topicExpanded: 'Human rights council agenda and study materials publish when committees are locked.',
    difficulty: 'TBA',
    delegateCapacity: 'TBA',
    portfolioRequired: true,
    portfolioNote: 'TBA',
    venue: 'TBA — room assignment',
    studyGuideStatus: 'coming-soon',
    status: 'announcing-soon',
    chairs: DEFAULT_CHAIRS,
  },
  {
    id: 'committee-vi',
    acronym: 'TBA',
    name: 'Committee VI',
    type: 'Indian Committee',
    topic: 'Agenda announcing soon',
    topicExpanded: 'Indian committee simulation topic and procedure notes announcing soon.',
    difficulty: 'TBA',
    delegateCapacity: 'TBA',
    portfolioRequired: true,
    portfolioNote: 'TBA',
    venue: 'TBA — room assignment',
    studyGuideStatus: 'coming-soon',
    status: 'announcing-soon',
    chairs: DEFAULT_CHAIRS,
  },
  {
    id: 'committee-vii',
    acronym: 'TBA',
    name: 'Committee VII',
    type: 'Crisis',
    topic: 'Agenda announcing soon',
    topicExpanded: 'Crisis committee arc, directives, and portfolio requirements publish with the full roster.',
    difficulty: 'TBA',
    delegateCapacity: 'TBA',
    portfolioRequired: true,
    portfolioNote: 'TBA — crisis portfolio format announcing soon.',
    venue: 'TBA — room assignment',
    studyGuideStatus: 'coming-soon',
    status: 'announcing-soon',
    chairs: [{ name: 'TBA', role: 'Crisis Director', initials: 'CD' }, { name: 'TBA', role: 'Deputy Director', initials: 'DD' }],
  },
  {
    id: 'committee-viii',
    acronym: 'TBA',
    name: 'Committee VIII',
    type: 'International Press',
    topic: 'Coverage brief announcing soon',
    topicExpanded: 'IP corps briefing, beat assignments, and application details publish on /apply.',
    difficulty: 'TBA',
    delegateCapacity: 'TBA',
    portfolioRequired: true,
    portfolioNote: 'TBA — journalism portfolio requirements on /apply.',
    venue: 'TBA — press room',
    studyGuideStatus: 'coming-soon',
    status: 'announcing-soon',
    chairs: [{ name: 'TBA', role: 'Editor-in-Chief', initials: 'EC' }],
  },
]

export const YUGEN_SEO = {
  title: 'Yūgen Summit 6.0 — Coming Soon | P. Obul Reddy Public School',
  description:
    'Yūgen Summit 6.0 at PORPS, Hyderabad — Making Every Voice Matter. Dates, committees, and registration coming soon.',
  siteUrl: 'https://yugen.ruthwikreddy.live',
  ogImage: '/image.png',
}

export const SITE_ROUTES = [
  '/',
  '/about',
  '/register',
  '/committees',
  '/schedule',
  '/team',
  '/resources',
  '/delegates',
  '/faq',
  '/awards',
  '/apply',
  '/sponsors',
  '/press',
  '/venue',
  '/accommodation',
  '/gallery',
  '/contact',
  '/privacy',
  '/terms',
  '/refund',
] as const

/** Default resource placeholders — replace URLs when PDFs are ready */
export const DEFAULT_RESOURCES: typeof YUGEN.resources = [
  { id: 'rop', title: 'Rules of Procedure', description: 'Yūgen Summit rules of procedure for all committees.', type: 'pdf', status: 'coming-soon' },
  { id: 'pog', title: 'Points of Information Guide', description: 'How to raise POIs, motions, and caucus effectively.', type: 'pdf', status: 'coming-soon' },
  { id: 'handbook', title: 'Delegate Handbook', description: 'Full delegate handbook for Yūgen 6.0.', type: 'pdf', status: 'coming-soon' },
  { id: 'study-guides', title: 'Committee Study Guides', description: 'Per-committee study guides — one PDF per council.', type: 'pdf', status: 'coming-soon' },
]

/** Default awards placeholders */
export const DEFAULT_AWARDS: typeof YUGEN.awards = [
  { name: 'Best Delegate', description: 'TBA — awarded per committee. Criteria publish with committee announcements.', criteria: 'TBA' },
  { name: 'High Commendation', description: 'TBA — second-tier delegate recognition per committee.', criteria: 'TBA' },
  { name: 'Special Mention', description: 'TBA — third-tier delegate recognition per committee.', criteria: 'TBA' },
  { name: 'Best Position Paper', description: 'TBA — portfolio and position paper criteria.', criteria: 'TBA' },
  { name: 'Best IP Correspondent', description: 'TBA — International Press awards when IP applications open.', criteria: 'TBA' },
]

/** Default press kit placeholders */
export const DEFAULT_PRESS_KIT: typeof YUGEN.press.kit = [
  { title: 'Brand logo pack', status: 'coming-soon' },
  { title: 'Press release — Yūgen 6.0 announcement', status: 'coming-soon' },
  { title: 'Event fact sheet', status: 'coming-soon' },
  { title: 'High-resolution photos', status: 'coming-soon' },
  { title: 'Event technology partner — Gathrly', url: 'https://www.gathrly.in/event-technology', status: 'available' },
]

/** Placeholder gallery slots until photos are added to YUGEN.gallery */
export const GALLERY_PLACEHOLDERS = [
  { id: 'g1', label: 'Opening Ceremony' },
  { id: 'g2', label: 'Committee Session' },
  { id: 'g3', label: 'Caucus' },
  { id: 'g4', label: 'Closing Ceremony' },
  { id: 'g5', label: 'Secretariat' },
  { id: 'g6', label: 'Delegate Portrait' },
]

export const LEGAL = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'June 2026',
    sections: [
      {
        heading: 'Information we collect',
        body: 'When you submit our notify form, we collect your name and email address to send updates about Yūgen Summit 6.0. We do not sell or share your data with third parties for marketing purposes.',
      },
      {
        heading: 'How we use your data',
        body: 'Your information is used solely to communicate event updates, registration openings, and relevant announcements about Yūgen Summit at PORPS.',
      },
      {
        heading: 'Data retention',
        body: 'We retain notify-list data until the conclusion of Yūgen 6.0 or until you request removal. Contact us at hello@yugenporps.in to delete your information.',
      },
      {
        heading: 'Contact',
        body: 'For privacy inquiries, email hello@yugenporps.in.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'June 2026',
    sections: [
      {
        heading: 'Acceptance',
        body: 'By accessing yugenporps.in, you agree to these terms. This site is operated by the Yūgen Summit organizing committee at P. Obul Reddy Public School. The website was designed and built by Ruthwik Reddy.',
      },
      {
        heading: 'Event information',
        body: 'All dates, committees, pricing, and schedules published before official confirmation are subject to change. Final details will be announced on this site and @yugenporps.',
      },
      {
        heading: 'Registration',
        body: 'Registration terms, refund eligibility, and delegate conduct policies will be published when registration opens for Yūgen 6.0. Delegate registration, payments, and QR check-in are powered by Gathrly, our premium event technology partner headquartered in Hyderabad.',
      },
      {
        heading: 'Contact',
        body: 'Questions about these terms: hello@yugenporps.in.',
      },
    ],
  },
  refund: {
    title: 'Refund Policy',
    updated: 'June 2026',
    sections: [
      {
        heading: 'Registration not yet open',
        body: 'Registration for Yūgen Summit 6.0 has not opened. Refund terms will be published alongside pricing when registration goes live.',
      },
      {
        heading: 'When registration opens',
        body: 'Refund windows, processing timelines, and eligibility criteria will be clearly stated on the registration page before payment. All refunds will be processed per the policy active at the time of your registration.',
      },
      {
        heading: 'Contact',
        body: 'Refund inquiries once registration is live: hello@yugenporps.in.',
      },
    ],
  },
}

export function getResources() {
  return YUGEN.resources.length > 0 ? YUGEN.resources : DEFAULT_RESOURCES
}

export function getAwards() {
  return YUGEN.awards.length > 0 ? YUGEN.awards : DEFAULT_AWARDS
}

export function getPressKit() {
  return YUGEN.press.kit.length > 0 ? YUGEN.press.kit : DEFAULT_PRESS_KIT
}

export function getGalleryItems() {
  if (YUGEN.gallery.length > 0) return YUGEN.gallery
  return GALLERY_PLACEHOLDERS.map((p) => ({
    id: p.id,
    src: '',
    alt: p.label,
    caption: p.label,
  }))
}

export function getPricing() {
  if (YUGEN.pricing.length > 0) return YUGEN.pricing
  return [
    { tier: 'Early bird', price: '₹1,200', note: 'Round 1 · live now', features: ['₹1,200 delegate fee', 'UPI payment via site', 'Registration ID for confirmation'] },
    { tier: 'Standard', price: 'TBA', note: 'Price drops soon', features: ['TBA — delegate fee', 'TBA — closing date', 'TBA — inclusions'] },
    { tier: 'Late', price: 'TBA', note: 'Price drops soon', features: ['TBA — delegate fee', 'TBA — closing date', 'TBA — inclusions'] },
  ]
}

export function getCommittees(): Committee[] {
  return YUGEN.committees.length > 0 ? YUGEN.committees : DEFAULT_COMMITTEES
}

export function getCommitteeById(id: string): Committee | undefined {
  return getCommittees().find((c) => c.id === id)
}

export function getCommitteeTypes(): string[] {
  return [...new Set(getCommittees().map((c) => c.type))]
}

export function getExecutiveBoard() {
  if (YUGEN.team.eb.length > 0) return YUGEN.team.eb
  return getCommittees().flatMap((c) =>
    c.chairs.map((ch) => ({
      role: ch.role,
      committee: c.name,
      name: ch.name,
      initials: ch.initials,
      image: ch.image,
    })),
  )
}
