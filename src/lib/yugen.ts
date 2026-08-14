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
  studyGuideUrls?: string[]
  studyGuideStatus: 'available' | 'coming-soon'
  status: 'announcing-soon' | 'live'
  chairs: CommitteeChair[]
  subRoles?: { label: string; capacity: string }[]
}

export type GalleryItem = {
  id: string
  src: string
  alt: string
  caption?: string
}

export type OCRole = {
  id: string
  title: string
  department: string
  description: string
  requirements: string[]
  responsibilities: string[]
  availableRounds: number[]
  capacity?: number
}

export type OCRoundConfig = {
  round: number
  title: string
  description: string
  startDate?: string
  endDate?: string
  status: 'upcoming' | 'open' | 'closed' | 'archived'
}

export const YUGEN = {
  name: 'Yūgen Summit 6.0',
  shortName: 'Yūgen',
  edition: '6.0',
  tagline: 'Making Every Voice Matter',
  status: 'coming-soon' as const,
  teaserStack: ['BACK', 'BACK', 'BACK'],
  teaserPunch: 'WE ARE BACK',
  dates: '22 and 23 August 2026',
  datesHero: '22 & 23 AUGUST 2026',
  venue: 'DDMS AMS P. Obul Reddy Public School',
  venueShort: 'DDMS AMS PORPS',
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
    { label: 'Committees', value: '7' },
    { label: 'Delegates', value: 'TBA' },
    { label: 'Schools', value: 'TBA' },
  ],
  about: {
    headline: 'Six editions in. The next chapter is on the way.',
    paragraphs: [
      'Yūgen Summit is Hyderabad\'s premier inter-school Model United Nations conference, hosted at DDMS AMS P. Obul Reddy Public School. For six editions, we\'ve brought together delegates who believe every voice matters — in committee rooms, in caucus, and beyond.',
      'Yūgen 6.0 continues that legacy. Join us on 22 and 23 August 2026 at DDMS AMS P. Obul Reddy Public School — follow @yugenporps for the latest.',
    ],
    letterFromSG: {
      signatory: 'Secretary General',
      signatoryName: 'Dhruv Reddy',
      paragraphs: [
        'On behalf of the Yūgen Summit secretariat, welcome to the sixth edition of our conference at DDMS AMS P. Obul Reddy Public School.',
        'Yūgen has always been about one thing: making every voice matter. Whether you are a first-time delegate or a seasoned chair, we are building an experience that challenges, includes, and inspires.',
        'We look forward to welcoming you to the summit in August.',
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
  gallery: [
    { id: '0386bda9-72e8-42d4-8ed5-734a64c30abe', src: '/gallery/0386bda9-72e8-42d4-8ed5-734a64c30abe.JPG', alt: 'Yūgen Summit moments' },
    { id: '05887dad-6903-4973-804f-6eb7e88f031f', src: '/gallery/05887dad-6903-4973-804f-6eb7e88f031f.JPG', alt: 'Yūgen Summit moments' },
    { id: '05ff34b1-6349-47e1-a741-9585da8d9f61', src: '/gallery/05ff34b1-6349-47e1-a741-9585da8d9f61.JPG', alt: 'Yūgen Summit moments' },
    { id: '0a4f54a5-9bfc-42fa-96e5-847496f8ce23', src: '/gallery/0a4f54a5-9bfc-42fa-96e5-847496f8ce23.JPG', alt: 'Yūgen Summit moments' },
    { id: '0cb62a54-23a3-4bcf-9852-ef898998d591', src: '/gallery/0cb62a54-23a3-4bcf-9852-ef898998d591.JPG', alt: 'Yūgen Summit moments' },
    { id: '0cffa298-c44a-4e1f-9f12-4e5853bcdc30', src: '/gallery/0cffa298-c44a-4e1f-9f12-4e5853bcdc30.JPG', alt: 'Yūgen Summit moments' },
    { id: '0e9fd4e3-ad92-48cf-8013-0fc8c33c28ce', src: '/gallery/0e9fd4e3-ad92-48cf-8013-0fc8c33c28ce.JPG', alt: 'Yūgen Summit moments' },
    { id: '15341119-5603-4cb9-a86b-690a165618f1', src: '/gallery/15341119-5603-4cb9-a86b-690a165618f1.JPG', alt: 'Yūgen Summit moments' },
    { id: '1729c581-52d2-4d0c-b021-be1b7568f73b', src: '/gallery/1729c581-52d2-4d0c-b021-be1b7568f73b.JPG', alt: 'Yūgen Summit moments' },
    { id: '183085c7-6097-4d7b-82dc-294099016d16', src: '/gallery/183085c7-6097-4d7b-82dc-294099016d16.JPG', alt: 'Yūgen Summit moments' },
    { id: '224feb38-a306-4712-ac71-bae17117f7e2', src: '/gallery/224feb38-a306-4712-ac71-bae17117f7e2.JPG', alt: 'Yūgen Summit moments' },
    { id: '231472c7-0254-43af-aabc-4196ae360dec', src: '/gallery/231472c7-0254-43af-aabc-4196ae360dec.JPG', alt: 'Yūgen Summit moments' },
    { id: '24a3d81f-da2a-496a-ad2b-615315e416eb', src: '/gallery/24a3d81f-da2a-496a-ad2b-615315e416eb.JPG', alt: 'Yūgen Summit moments' },
    { id: '2ab92f0e-b712-445f-b2f0-f715a24f3777', src: '/gallery/2ab92f0e-b712-445f-b2f0-f715a24f3777.JPG', alt: 'Yūgen Summit moments' },
    { id: '2ba2b7c6-15fb-44f1-b1a6-f65c1c305fb4', src: '/gallery/2ba2b7c6-15fb-44f1-b1a6-f65c1c305fb4.JPG', alt: 'Yūgen Summit moments' },
    { id: '2dfe4016-3dd8-49e5-852e-9f89a68b82c5', src: '/gallery/2dfe4016-3dd8-49e5-852e-9f89a68b82c5.JPG', alt: 'Yūgen Summit moments' },
    { id: '2f8719de-de63-4bf0-abb2-11ac8f69ec40', src: '/gallery/2f8719de-de63-4bf0-abb2-11ac8f69ec40.JPG', alt: 'Yūgen Summit moments' },
    { id: '31901faf-ecab-4b82-9347-f09a13d7d1be', src: '/gallery/31901faf-ecab-4b82-9347-f09a13d7d1be.JPG', alt: 'Yūgen Summit moments' },
    { id: '365cb692-c306-4647-b8a4-803d665e0c9d', src: '/gallery/365cb692-c306-4647-b8a4-803d665e0c9d.JPG', alt: 'Yūgen Summit moments' },
    { id: '3a508a4d-57c5-40d4-b196-be9c164a0a4d', src: '/gallery/3a508a4d-57c5-40d4-b196-be9c164a0a4d.JPG', alt: 'Yūgen Summit moments' },
    { id: '3b091657-93ab-41cd-b1d6-aeaa272367f2', src: '/gallery/3b091657-93ab-41cd-b1d6-aeaa272367f2.JPG', alt: 'Yūgen Summit moments' },
    { id: '4307c2a0-f7ef-4874-86cd-e503367af1b9', src: '/gallery/4307c2a0-f7ef-4874-86cd-e503367af1b9.JPG', alt: 'Yūgen Summit moments' },
    { id: '44d292d9-b2a2-45f6-aff6-e6af21335b03', src: '/gallery/44d292d9-b2a2-45f6-aff6-e6af21335b03.JPG', alt: 'Yūgen Summit moments' },
    { id: '44e2594b-ff9d-4239-af41-bcc078ff82b6', src: '/gallery/44e2594b-ff9d-4239-af41-bcc078ff82b6.JPG', alt: 'Yūgen Summit moments' },
    { id: '45324398-d931-420e-9b84-da04e39c2b10', src: '/gallery/45324398-d931-420e-9b84-da04e39c2b10.JPG', alt: 'Yūgen Summit moments' },
    { id: '45434017-9b5c-4bd0-9929-a7267841f3fb', src: '/gallery/45434017-9b5c-4bd0-9929-a7267841f3fb.JPG', alt: 'Yūgen Summit moments' },
    { id: '4d13ac2f-2a19-438d-b5dc-d39f4123bb7b', src: '/gallery/4d13ac2f-2a19-438d-b5dc-d39f4123bb7b.JPG', alt: 'Yūgen Summit moments' },
    { id: '5176ff91-a2f9-4cfd-8869-1393d822bafa', src: '/gallery/5176ff91-a2f9-4cfd-8869-1393d822bafa.JPG', alt: 'Yūgen Summit moments' },
    { id: '56578912-5db3-40c6-907c-481712366086', src: '/gallery/56578912-5db3-40c6-907c-481712366086.JPG', alt: 'Yūgen Summit moments' },
    { id: '596aa2bc-82ef-48a8-aa84-105ddcdd765b', src: '/gallery/596aa2bc-82ef-48a8-aa84-105ddcdd765b.JPG', alt: 'Yūgen Summit moments' },
    { id: '59f7dd8f-44fd-4946-acf2-08fb4fc2de8e', src: '/gallery/59f7dd8f-44fd-4946-acf2-08fb4fc2de8e.JPG', alt: 'Yūgen Summit moments' },
    { id: '5b9a843c-dd6b-47e7-9ee7-7434f1e1e400', src: '/gallery/5b9a843c-dd6b-47e7-9ee7-7434f1e1e400.JPG', alt: 'Yūgen Summit moments' },
    { id: '5fdd4250-a262-484a-a68d-2c8a8b649c40', src: '/gallery/5fdd4250-a262-484a-a68d-2c8a8b649c40.JPG', alt: 'Yūgen Summit moments' },
    { id: '621b4892-b40a-4174-b663-e25ad6e0162c', src: '/gallery/621b4892-b40a-4174-b663-e25ad6e0162c.JPG', alt: 'Yūgen Summit moments' },
    { id: '6410c900-14d0-4def-a55a-d058fd606805', src: '/gallery/6410c900-14d0-4def-a55a-d058fd606805.JPG', alt: 'Yūgen Summit moments' },
    { id: '69fe3eb7-6036-4383-b031-22201d71b52a', src: '/gallery/69fe3eb7-6036-4383-b031-22201d71b52a.JPG', alt: 'Yūgen Summit moments' },
    { id: '6b0a37fc-f896-40dd-8ec6-322d1d578c52', src: '/gallery/6b0a37fc-f896-40dd-8ec6-322d1d578c52.JPG', alt: 'Yūgen Summit moments' },
    { id: '6f412ea5-248d-41bf-a798-95776968e541', src: '/gallery/6f412ea5-248d-41bf-a798-95776968e541.JPG', alt: 'Yūgen Summit moments' },
    { id: '6fa8a12d-f264-4974-8a81-c149c8642cc1', src: '/gallery/6fa8a12d-f264-4974-8a81-c149c8642cc1.JPG', alt: 'Yūgen Summit moments' },
    { id: '6fc7ae53-8c62-46fc-a395-5a19d9eaa1de', src: '/gallery/6fc7ae53-8c62-46fc-a395-5a19d9eaa1de.JPG', alt: 'Yūgen Summit moments' },
    { id: '7230d44b-889b-4cb3-847c-fef6f9f3ee9c', src: '/gallery/7230d44b-889b-4cb3-847c-fef6f9f3ee9c.JPG', alt: 'Yūgen Summit moments' },
    { id: '778c7b16-e8df-46f2-a01e-90e5e0eb52ee', src: '/gallery/778c7b16-e8df-46f2-a01e-90e5e0eb52ee.JPG', alt: 'Yūgen Summit moments' },
    { id: '7b512408-d4ad-49e2-818a-71aa463d2565', src: '/gallery/7b512408-d4ad-49e2-818a-71aa463d2565.JPG', alt: 'Yūgen Summit moments' },
    { id: '7f50d5b2-3ab0-49af-b213-aa246ee3cdb3', src: '/gallery/7f50d5b2-3ab0-49af-b213-aa246ee3cdb3.JPG', alt: 'Yūgen Summit moments' },
    { id: '8bee46d7-18f8-4ea8-9be7-0c4783a65333', src: '/gallery/8bee46d7-18f8-4ea8-9be7-0c4783a65333.JPG', alt: 'Yūgen Summit moments' },
    { id: '8d8ff648-1711-457d-a6bf-8a395a2c6e2d', src: '/gallery/8d8ff648-1711-457d-a6bf-8a395a2c6e2d.JPG', alt: 'Yūgen Summit moments' },
    { id: '94d14303-4d9c-4057-a5a6-5e74a147b091', src: '/gallery/94d14303-4d9c-4057-a5a6-5e74a147b091.JPG', alt: 'Yūgen Summit moments' },
    { id: '98543599-1196-46b7-b463-f4c9963ab1cd', src: '/gallery/98543599-1196-46b7-b463-f4c9963ab1cd.JPG', alt: 'Yūgen Summit moments' },
    { id: '9b373c72-e413-4cec-ac0a-623a4f8c4d38', src: '/gallery/9b373c72-e413-4cec-ac0a-623a4f8c4d38.JPG', alt: 'Yūgen Summit moments' },
    { id: '9f3ec699-6435-45f7-8b10-fa6318edb92a', src: '/gallery/9f3ec699-6435-45f7-8b10-fa6318edb92a.JPG', alt: 'Yūgen Summit moments' },
    { id: 'a311373a-5eb1-468d-be33-a8adaee6bc38', src: '/gallery/a311373a-5eb1-468d-be33-a8adaee6bc38.JPG', alt: 'Yūgen Summit moments' },
    { id: 'a6a48054-ddc4-4631-bd51-1ecd48f3de2e', src: '/gallery/a6a48054-ddc4-4631-bd51-1ecd48f3de2e.JPG', alt: 'Yūgen Summit moments' },
    { id: 'a76570ae-4345-4961-aa2d-3931a0e662d9', src: '/gallery/a76570ae-4345-4961-aa2d-3931a0e662d9.JPG', alt: 'Yūgen Summit moments' },
    { id: 'b00bbbad-844d-439f-be7f-2c91aeecc954', src: '/gallery/b00bbbad-844d-439f-be7f-2c91aeecc954.JPG', alt: 'Yūgen Summit moments' },
    { id: 'b038446e-77c1-4a5a-b01e-50cbd4c8ca57', src: '/gallery/b038446e-77c1-4a5a-b01e-50cbd4c8ca57.JPG', alt: 'Yūgen Summit moments' },
    { id: 'b26a91ef-662e-47e0-b5ff-ef5f97b3a7cd', src: '/gallery/b26a91ef-662e-47e0-b5ff-ef5f97b3a7cd.JPG', alt: 'Yūgen Summit moments' },
    { id: 'b3c8e491-f258-4b9d-b2fc-0f740dd0bb41', src: '/gallery/b3c8e491-f258-4b9d-b2fc-0f740dd0bb41.JPG', alt: 'Yūgen Summit moments' },
    { id: 'b6c525f3-6fe5-469c-b5b7-7a1598f58cc5', src: '/gallery/b6c525f3-6fe5-469c-b5b7-7a1598f58cc5.JPG', alt: 'Yūgen Summit moments' },
    { id: 'bc37c137-ec96-4134-ab75-d99af575f358', src: '/gallery/bc37c137-ec96-4134-ab75-d99af575f358.JPG', alt: 'Yūgen Summit moments' },
    { id: 'c63a57d2-96f7-4f32-8913-3acb9196b719', src: '/gallery/c63a57d2-96f7-4f32-8913-3acb9196b719.JPG', alt: 'Yūgen Summit moments' },
    { id: 'cff60823-0bd7-4d70-9193-f7f76aa22fcc', src: '/gallery/cff60823-0bd7-4d70-9193-f7f76aa22fcc.JPG', alt: 'Yūgen Summit moments' },
    { id: 'd5d60bd6-5414-48e1-9451-9b5a2cb00cff', src: '/gallery/d5d60bd6-5414-48e1-9451-9b5a2cb00cff.JPG', alt: 'Yūgen Summit moments' },
    { id: 'd7ea3b18-54f1-4ff5-bc36-7d844499a35a', src: '/gallery/d7ea3b18-54f1-4ff5-bc36-7d844499a35a.JPG', alt: 'Yūgen Summit moments' },
    { id: 'dc122956-783a-457d-8867-a3acc1ed20ca', src: '/gallery/dc122956-783a-457d-8867-a3acc1ed20ca.JPG', alt: 'Yūgen Summit moments' },
    { id: 'dc324bee-47aa-4809-a498-c8b7ddd7446d', src: '/gallery/dc324bee-47aa-4809-a498-c8b7ddd7446d.JPG', alt: 'Yūgen Summit moments' },
    { id: 'ddc049c2-0294-4ef3-9beb-e5364851d1b1', src: '/gallery/ddc049c2-0294-4ef3-9beb-e5364851d1b1.JPG', alt: 'Yūgen Summit moments' },
    { id: 'ec33438c-2ab9-4968-840d-b1d290fce218', src: '/gallery/ec33438c-2ab9-4968-840d-b1d290fce218.JPG', alt: 'Yūgen Summit moments' },
    { id: 'ed3f405e-9bbb-4ec2-9aa7-7671d4a5cc39', src: '/gallery/ed3f405e-9bbb-4ec2-9aa7-7671d4a5cc39.JPG', alt: 'Yūgen Summit moments' },
    { id: 'eeda77ae-2361-45c0-9f21-ac3f18f0e268', src: '/gallery/eeda77ae-2361-45c0-9f21-ac3f18f0e268.JPG', alt: 'Yūgen Summit moments' },
    { id: 'ef76e10a-f432-4772-bfca-eacb9d7b61ec', src: '/gallery/ef76e10a-f432-4772-bfca-eacb9d7b61ec.JPG', alt: 'Yūgen Summit moments' },
    { id: 'f51c93a1-bbdb-4a98-89d4-ad04f147a130', src: '/gallery/f51c93a1-bbdb-4a98-89d4-ad04f147a130.JPG', alt: 'Yūgen Summit moments' },
    { id: 'fdc0f3ae-8c3c-41b7-ae15-9be5efad8017', src: '/gallery/fdc0f3ae-8c3c-41b7-ae15-9be5efad8017.JPG', alt: 'Yūgen Summit moments' },
  ] as GalleryItem[],
  schedule: [
    {
      day: 'Day 1 — 22 August 2026',
      items: [
        { time: '8:00 - 9:30', title: 'Registrations' },
        { time: '9:30 - 10:30', title: 'Opening Ceremony' },
        { time: '10:30 - 11:00', title: 'Break' },
        { time: '11:00 - 1:00', title: 'Committee Session 1' },
        { time: '1:00 - 1:45', title: 'Lunch (in committee)' },
        { time: '1:45 - 3:00', title: 'Committee Session 2' },
        { time: '3:00 - 3:15', title: 'Break' },
        { time: '3:15 - 4:30', title: 'Committee Session 3' },
        { time: '4:30 onwards', title: 'Dispersal' },
      ],
    },
    {
      day: 'Day 2 — 23 August 2026',
      items: [
        { time: '7:00 - 7:45', title: 'Breakfast' },
        { time: '8:00 - 10:30', title: 'Committee Session 4' },
        { time: '10:30 - 10:45', title: 'Break' },
        { time: '10:45 - 11:45', title: 'Committee Session 5 (UNHRC, UNSC, IP, CCC)' },
        { time: '10:45 - 12:30', title: 'Committee Session 5 (AIPPM, DISEC, CCPCJ)' },
        { time: '11:45 - 12:30', title: 'Lunch (UNHRC, UNSC, IP, CCC)' },
        { time: '12:30 - 1:15', title: 'Lunch (AIPPM, DISEC, CCPCJ)' },
        { time: '12:30 - 3:00', title: 'Committee Session 6 (UNHRC, UNSC, IP, CCC)' },
        { time: '1:15 - 3:00', title: 'Committee Session 6 (AIPPM, DISEC, CCPCJ)' },
        { time: '3:00 - 4:30', title: 'Closing Ceremony' },
        { time: '4:30 onwards', title: 'Dispersal' },
      ],
    },
  ] as { day: string; items: { time: string; title: string; location?: string }[] }[],
  dressCode: [
    { title: 'Day 1: Western Formals', description: 'Suits, blazers, formal shirts, trousers, and corporate/formal dresses.' },
    { title: 'Day 2: Indian Traditionals', description: 'Kurtas, sherwanis, sarees, salwars, or other elegant traditional attire.' },
  ],
  committees: [
    {
      id: 'aippm',
      acronym: 'AIPPM',
      name: 'All India Political Parties Meet',
      type: 'Indian Committee',
      topic:
        'Deliberation on the impact of the Foreign Contribution Regulations on NGOs and civil society operations in India, while balancing national security and economic growth, with special emphasis on the Foreign Contribution (Regulation) Amendment Bill, 2026.',
      topicExpanded:
        'AIPPM will deliberate the impact of the Foreign Contribution Regulations on NGOs and civil society operations in India, balancing national security and economic growth, with special emphasis on the Foreign Contribution (Regulation) Amendment Bill, 2026. Party portfolios and position paper requirements publish with the study guide.',
      difficulty: 'Beginner-Friendly',
      delegateCapacity: 'TBA',
      portfolioRequired: true,
      portfolioNote: 'TBA — position paper requirements publish with the study guide.',
      venue: 'Main Block Auditorium',
      studyGuideUrl: '/papers/YUGEN-PROPS MUN 2026- AIPPM BG.pdf',
      studyGuideStatus: 'available',
      status: 'live',
      chairs: [
        { name: 'Charan Teja', role: 'Speaker', initials: 'CT', image: '/ebs/charan tejh.png' },
        { name: 'Tanish Manem', role: 'Deputy Speaker', initials: 'TM', image: '/ebs/tanish.png' },
        { name: 'Bani Saxena', role: 'Co-Scribe', initials: 'BS', image: '/ebs/bani.png' },
        { name: 'Rishith Balakrishnan', role: 'Co-Scribe', initials: 'RB', image: '/ebs/rishit.png' },
      ],
    },
    {
      id: 'ip',
      acronym: 'IP',
      name: 'International Press',
      type: 'International Press',
      topic: 'Coverage brief announcing soon',
      topicExpanded: 'IP corps briefing, beat assignments, and portfolio requirements publish with the study guide.',
      difficulty: 'TBA',
      delegateCapacity: 'TBA',
      portfolioRequired: true,
      portfolioNote: 'TBA — journalism portfolio requirements.',
      venue: '11-H',
      studyGuideUrls: [
        '/papers/ip jounlism.pdf',
        '/papers/BACKGROUND GUIDE FOR IP PHOTOJOURNALISM..pdf',
      ],
      studyGuideStatus: 'available',
      status: 'live',
      chairs: [
        { name: 'Shreyal Kothapalli', role: 'IP Head', initials: 'SK', image: '/ebs/shreyal.png' },
        { name: 'Tvisha Nahata', role: 'Director of Photography', initials: 'TN', image: '/ebs/tvisha.png' },
        { name: 'Prasatti Burli', role: 'Editor-in-Chief', initials: 'PB', image: '/ebs/prasati.png' },
      ],
    },
    {
      id: 'unhrc',
      acronym: 'UNHRC',
      name: 'UN Human Rights Council',
      type: 'UNHRC',
      topic:
        'Deliberation on Safeguarding Human Rights in the Context of Climate Change, Environmental Degradation, and Loss of Livelihoods.',
      topicExpanded:
        'Final agenda for the UN Human Rights Council — set by the EB: Deliberation on Safeguarding Human Rights in the Context of Climate Change, Environmental Degradation, and Loss of Livelihoods. Country allocations, position paper format, and background materials publish with the study guide.',
      difficulty: 'Beginner-Friendly',
      delegateCapacity: 'TBA',
      portfolioRequired: true,
      portfolioNote: 'TBA — position paper requirements publish with the study guide.',
      venue: 'Indoor Sports Complex',
      studyGuideStatus: 'coming-soon',
      status: 'live',
      chairs: [
        { name: 'Neela Siddhartha', role: 'Chairperson', initials: 'NS', image: '/ebs/siddartha.png' },
        { name: 'Lalitaanjali', role: 'Co-Vice Chairperson', initials: 'LA', image: '/ebs/anjali.png' },
        { name: 'Nandini Thakur', role: 'Co-Vice Chairperson', initials: 'NT', image: '/ebs/nandini.png' },
      ],
    },
    {
      id: 'disec',
      acronym: 'DISEC',
      name: 'Disarmament and International Security Committee',
      type: 'DISEC',
      topic:
        'Deliberation on safeguarding critical undersea and maritime infrastructure against hybrid threats, with special emphasis on threats to undersea communication cables.',
      topicExpanded:
        'Chairs will deliberate on safeguarding critical undersea and maritime infrastructure against hybrid threats, with special emphasis on threats to undersea communication cables. Agenda set by the DISEC Executive Board. Background guide, delegate allocations, and position paper requirements publish with the study guide.',
      difficulty: 'Beginner-Friendly',
      delegateCapacity: 'TBA',
      portfolioRequired: true,
      portfolioNote: 'TBA — position paper requirements publish with the study guide.',
      venue: '12-H',
      studyGuideUrl: '/papers/DISEC_BG_PORPS MUN 6.pdf',
      studyGuideStatus: 'available',
      status: 'live',
      chairs: [
        { name: 'Shyam Vasavi', role: 'Chairperson', initials: 'SV', image: '/ebs/shyam.png' },
        { name: 'Rithvik', role: 'Vice Chairperson', initials: 'RI', image: '/ebs/rithik.png' },
        { name: 'Shrikar', role: 'Rapporteur', initials: 'SH', image: '/ebs/shrikar.png' },
      ],
    },
    {
      id: 'unsc',
      acronym: 'UNSC',
      name: 'UN Security Council',
      type: 'UNSC',
      topic: 'UNSC Summit Meeting',
      topicExpanded:
        'UNSC agenda — UNSC Summit Meeting. Freeze date: 30 January 1992. The Security Council convenes in the immediate aftermath of the Soviet Union\'s dissolution to address the resulting security vacuum across Eastern Europe and Central Asia, the future of nuclear stockpiles on former Soviet territory, and the framework for collective security in the post-Cold War order. Country allocations, position paper format, and background materials publish with the study guide.',
      difficulty: 'Intermediate',
      delegateCapacity: 'TBA',
      portfolioRequired: true,
      portfolioNote: 'TBA — position paper requirements publish with the study guide.',
      venue: '11-D',
      studyGuideUrl: '/papers/YUGEN 6.0 UNSC BG (2).pdf',
      studyGuideStatus: 'available',
      status: 'live',
      chairs: [
        { name: 'Kumara Shivanand', role: 'Chairperson', initials: 'KS', image: '/ebs/shivanand.png' },
        { name: 'Advay', role: 'Vice Chairperson', initials: 'AD', image: '/ebs/advay.png' },
        { name: 'Mahesh', role: 'Rapporteur', initials: 'MA', image: '/ebs/mahesh.png' },
      ],
    },
    {
      id: 'ccpcj',
      acronym: 'CCPCJ',
      name: 'Commission on Crime Prevention and Criminal Justice',
      type: 'CCPCJ',
      topic:
        'Combating Illicit Trafficking of Drugs, Firearms, and Wildlife in Central Africa through Strengthened Regional Law Enforcement Cooperation.',
      topicExpanded:
        'CCPCJ agenda: Combating Illicit Trafficking of Drugs, Firearms, and Wildlife in Central Africa through Strengthened Regional Law Enforcement Cooperation. Background guide, country portfolios, and position paper requirements publish with the study guide.',
      difficulty: 'Intermediate',
      delegateCapacity: 'TBA',
      portfolioRequired: true,
      portfolioNote: 'TBA — position paper requirements publish with the study guide.',
      venue: '12-D',
      studyGuideStatus: 'coming-soon',
      status: 'live',
      chairs: [
        { name: 'Kingshuk', role: 'Chairperson', initials: 'KI', image: '/ebs/kingshuk.png' },
        { name: 'Kautilya', role: 'Vice Chairperson', initials: 'KA', image: '/ebs/kautilya.png' },
        { name: 'Venya Reddy', role: 'Rapporteur', initials: 'VR', image: '/ebs/venya.png' },
      ],
    },
    {
      id: 'ccc',
      acronym: 'CCC',
      name: 'Continental Crisis Committee',
      type: 'Crisis',
      topic: 'The Suez Crisis.',
      topicExpanded:
        'CCC agenda — The Suez Crisis. Freeze date: 1 November 1956. The arc, directives, character briefs, and portfolio requirements publish with the full crisis roster.',
      difficulty: 'Advanced',
      delegateCapacity: '10',
      portfolioRequired: true,
      portfolioNote: 'TBA — crisis portfolio format announcing soon.',
      venue: '12-A',
      studyGuideUrl: '/papers/YUGEN_CCC.pdf',
      studyGuideStatus: 'available',
      status: 'live',
      chairs: [
        { name: 'Ayaan Khan', role: 'Moderator', initials: 'AK', image: '/ebs/ayaan.png' },
        { name: 'Adhrit Gande', role: 'Deputy Moderator', initials: 'AG', image: '/ebs/adhrit.png' },
      ],
    },
  ] as Committee[],
  secretariat: [
    { name: 'Dhruv Reddy', role: 'Secretary General', initials: 'DR' },
    { name: 'Dhara Agarwal', role: 'Deputy Secretary General', initials: 'DA' },
    { name: 'Yashish Royal V.', role: 'Director General', initials: 'YRV' },
    { name: 'Samhitha Kaluri', role: 'Chargé d\'Affaires', initials: 'SK' },
    { name: 'Satya Gunnam', role: 'Chargé d\'Affaires', initials: 'SG' },
  ] as { name: string; role: string; initials: string; image?: string }[],
  team: {
    usgs: [
      { role: 'OC Head & Logistics', name: 'Jyotsna Sunkara', initials: 'JS' },
      { role: 'OC Head & Logistics', name: 'Abhirami V.', initials: 'AV' },
      { role: 'USG Public Relations & Marketing', name: 'Yashvi Mehta', initials: 'YM' },
      { role: 'USG Public Relations & Marketing', name: 'Lakshya Puppala', initials: 'LP' },
      { role: 'USG Finance', name: 'Maanas Majethia', initials: 'MM' },
      { role: 'USG Finance', name: 'Saanvi Poddichetty', initials: 'SP' },
      { role: 'USG OC Photography', name: 'Aryan Shekhawat', initials: 'AS' },
      { role: 'USG Design & Tech', name: 'Ruthwik Reddy', initials: 'RR' },
      { role: 'USG Design & Tech', name: 'Ridhi', initials: 'R' },
    ] as { role: string; name: string; initials: string; image?: string }[],
    eb: [] as { role: string; committee: string; name: string; initials: string; image?: string }[],
  },
  resources: [
    {
      id: 'aippm-bg',
      title: 'AIPPM — Background Guide',
      description: 'Deliberation on the Foreign Contribution Regulations and the FC(R) Amendment Bill, 2026.',
      type: 'pdf',
      url: '/papers/YUGEN-PROPS MUN 2026- AIPPM BG.pdf',
      status: 'available',
    },
    {
      id: 'ip-journalism',
      title: 'IP — Journalism Coverage Brief',
      description: 'Coverage brief for the International Press corps at Yūgen 6.0.',
      type: 'pdf',
      url: '/papers/ip jounlism.pdf',
      status: 'available',
    },
    {
      id: 'ip-photojournalism',
      title: 'IP — Photojournalism Background Guide',
      description: 'Photojournalism background guide for the International Press corps.',
      type: 'pdf',
      url: '/papers/BACKGROUND GUIDE FOR IP PHOTOJOURNALISM..pdf',
      status: 'available',
    },
    {
      id: 'disec-bg',
      title: 'DISEC — Background Guide',
      description: 'Safeguarding critical undersea and maritime infrastructure against hybrid threats.',
      type: 'pdf',
      url: '/papers/DISEC_BG_PORPS MUN 6.pdf',
      status: 'available',
    },
    {
      id: 'unsc-bg',
      title: 'UNSC — Background Guide',
      description: 'Security Council agenda and background materials for Yūgen 6.0.',
      type: 'pdf',
      url: '/papers/YUGEN 6.0 UNSC BG (2).pdf',
      status: 'available',
    },
    {
      id: 'ccc-bg',
      title: 'CCC — Background Guide',
      description: 'The Suez Crisis — arc, directives, and crisis roster for the Continental Crisis Committee.',
      type: 'pdf',
      url: '/papers/YUGEN_CCC.pdf',
      status: 'available',
    },
    {
      id: 'unhrc-bg',
      title: 'UNHRC — Background Guide',
      description: 'Background guide for the UN Human Rights Council — publishing when confirmed.',
      type: 'pdf',
      status: 'coming-soon',
    },
    {
      id: 'ccpcj-bg',
      title: 'CCPCJ — Background Guide',
      description: 'Background guide for the Commission on Crime Prevention and Criminal Justice — publishing when confirmed.',
      type: 'pdf',
      status: 'coming-soon',
    },
  ] as {
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
    { q: 'When will Yūgen 6.0 take place?', a: 'Yūgen Summit 6.0 will take place on 22 and 23 August 2026.' },
    { q: 'How do I register?', a: 'This site is a showcase build — all delegate registration is handled by the Yūgen Summit secretariat directly. Email hello@yugenporps.in for queries.' },
    { q: 'Is Yūgen open to all schools?', a: 'TBA — add eligibility criteria (inter-school, grade levels, etc.) when confirmed by the organizing committee.' },
    { q: 'Can I register as an individual delegate?', a: 'TBA — add individual vs school delegation policy when registration details are finalized.' },
    { q: 'What committees will be offered?', a: 'The full committee roster and agendas are announcing soon. Check /committees for placeholder cards until then.' },
    { q: 'What is the dress code?', a: 'The dress code for Day 1 is Western Formals (suits, blazers, trousers, formal shirts, or formal dresses) and Day 2 is Indian Traditionals (kurtas, sherwanis, sarees, salwars, or elegant traditional attire).' },
    { q: 'Are study guides provided?', a: 'Study guides for each committee will be available on /resources when committees are announced.' },
    { q: 'What are the delegate fees?', a: 'Pricing tiers are shared with partner schools directly by the secretariat.' },
    { q: 'Is accommodation provided?', a: 'TBA — see /accommodation for travel and hotel guidance for outstation delegations when published.' },
    { q: 'How do I apply to chair or join the IP?', a: 'Chair and International Press positions are filled through invited applications by the secretariat.' },
    { q: 'What is the refund policy?', a: 'Refund terms are published by the secretariat. See /refund for the current policy framework.' },
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
  ocRoles: [
    {
      id: 'usg-delegate-affairs',
      title: 'USG Delegate Affairs',
      department: 'Delegate Affairs',
      description: 'Manage delegate registrations, communications, and experience.',
      requirements: ['Strong communication skills', 'Experience with event coordination', 'Available for pre-conference planning'],
      responsibilities: ['Handle delegate queries', 'Coordinate registration process', 'Manage delegate check-in', 'Support delegate experience'],
      availableRounds: [1, 2],
      capacity: 1,
    },
    {
      id: 'usg-logistics',
      title: 'USG Logistics',
      department: 'Logistics',
      description: 'Coordinate venue setup, materials, and conference operations.',
      requirements: ['Organizational skills', 'Physical availability during conference', 'Attention to detail'],
      responsibilities: ['Venue preparation', 'Material management', 'Coordinate with school administration', 'On-site logistics support'],
      availableRounds: [1, 2],
      capacity: 1,
    },
    {
      id: 'usg-marketing',
      title: 'USG Marketing',
      department: 'Marketing',
      description: 'Lead social media, promotions, and brand communications.',
      requirements: ['Social media experience', 'Content creation skills', 'Creative mindset'],
      responsibilities: ['Manage social media accounts', 'Create promotional content', 'Coordinate with design team', 'Engage with schools'],
      availableRounds: [1, 2],
      capacity: 1,
    },
    {
      id: 'usg-operations',
      title: 'USG Operations',
      department: 'Operations',
      description: 'Oversee conference operations and team coordination.',
      requirements: ['Leadership experience', 'Problem-solving skills', 'Available throughout planning phase'],
      responsibilities: ['Coordinate department heads', 'Manage timeline', 'Resolve operational issues', 'Support secretariat'],
      availableRounds: [1],
      capacity: 1,
    },
    {
      id: 'delegate-affairs-member',
      title: 'Delegate Affairs Member',
      department: 'Delegate Affairs',
      description: 'Support delegate communications and registration management.',
      requirements: ['Good communication skills', 'Team player', 'Responsive'],
      responsibilities: ['Respond to delegate emails', 'Assist with registration', 'Support check-in process', 'Help during conference'],
      availableRounds: [1, 2],
      capacity: 3,
    },
    {
      id: 'logistics-member',
      title: 'Logistics Member',
      department: 'Logistics',
      description: 'Assist with venue setup, materials, and on-site operations.',
      requirements: ['Reliable', 'Available for physical work', 'Detail-oriented'],
      responsibilities: ['Set up committee rooms', 'Manage materials', 'On-site support', 'Clean-up coordination'],
      availableRounds: [1, 2],
      capacity: 4,
    },
    {
      id: 'marketing-member',
      title: 'Marketing Member',
      department: 'Marketing',
      description: 'Support social media, content creation, and promotions.',
      requirements: ['Social media savvy', 'Creative', 'Good writing skills'],
      responsibilities: ['Create social posts', 'Design graphics', 'Engage with followers', 'Support promotional campaigns'],
      availableRounds: [1, 2],
      capacity: 3,
    },
  ] as OCRole[],
  ocRounds: [
    {
      round: 1,
      title: 'Round 1 - Core Team',
      description: 'Applications for USG positions and core team members. Priority given to experienced candidates.',
      startDate: '2026-07-01',
      endDate: '2026-07-31',
      status: 'open',
    },
    {
      round: 2,
      title: 'Round 2 - Extended Team',
      description: 'Applications for supporting team members. Open to all enthusiastic candidates.',
      startDate: '2026-08-01',
      endDate: '2026-08-31',
      status: 'upcoming',
    },
  ] as OCRoundConfig[],
  press: {
    intro: 'Media inquiries, press passes, and brand assets for Yūgen Summit 6.0.',
    contact: 'hello@yugenporps.in',
    kit: [] as { title: string; url?: string; status: 'available' | 'coming-soon' }[],
  },
  venueDetail: {
    address: 'DDMS AMS P. Obul Reddy Public School, Road No. 45, Jubilee Hills, Hyderabad, Telangana 500033',
    mapUrl: 'https://maps.google.com/?q=AMS+P.+OBUL+REDDY+PUBLIC+SCHOOL',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.443474306602!2d78.40697357593329!3d17.4384757013299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9139c427fdbf%3A0x419e21c70fe21903!2sAMS%20P.OBUL%20REDDY%20PUBLIC%20SCHOOL!5e0!3m2!1sen!2sin!4v1784643567730!5m2!1sen!2sin',
    parking: 'Parking instructions for faculty advisors and delegates available at campus entrance',
    accessibility: 'Accessible campus facilities available throughout conference venues',
    committeeRooms: 'Room assignments publish with the final committee roster',
    campusMapUrl: '',
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
    status: 'closed' as const,
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
      { label: 'Portfolio Guide', href: '/portfolio-guide' },
      { label: 'Delegate Guide', href: '/delegates' },
      { label: 'Resources', href: '/resources' },
      { label: 'Awards', href: '/awards' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Accommodation', href: '/accommodation' },
    ],
    org: [
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

const CRISIS_CHAIRS: CommitteeChair[] = [
  { name: 'TBA', role: 'Crisis Director', initials: 'CD' },
  { name: 'TBA', role: 'Deputy Director', initials: 'DD' },
]

const IP_CHAIRS: CommitteeChair[] = [{ name: 'TBA', role: 'Editor-in-Chief', initials: 'EC' }]

function defaultCommittee(
  partial: Pick<Committee, 'id' | 'acronym' | 'name' | 'type'> &
    Partial<
      Pick<
        Committee,
        | 'topic'
        | 'topicExpanded'
        | 'difficulty'
        | 'delegateCapacity'
        | 'portfolioRequired'
        | 'portfolioNote'
        | 'chairs'
        | 'venue'
        | 'studyGuideStatus'
        | 'status'
      >
    >,
): Committee {
  return {
    topic: 'Agenda announcing soon',
    topicExpanded: `The full agenda for ${partial.name} publishes when the Yūgen 6.0 organizing committee confirms the council lineup.`,
    difficulty: 'TBA',
    delegateCapacity: 'TBA',
    portfolioRequired: true,
    portfolioNote: 'TBA — position paper requirements publish with the study guide.',
    venue: 'TBA — room assignment',
    studyGuideStatus: 'coming-soon',
    status: 'announcing-soon',
    chairs: DEFAULT_CHAIRS,
    ...partial,
  }
}

/** Yūgen 6.0 committee roster — replace via YUGEN.committees when overriding */
export const DEFAULT_COMMITTEES: Committee[] = [
  defaultCommittee({
    id: 'aippm',
    acronym: 'AIPPM',
    name: 'All India Political Parties Meet',
    type: 'Indian Committee',
    topic:
      'Deliberation on the impact of the Foreign Contribution Regulations on NGOs and civil society operations in India, while balancing national security and economic growth, with special emphasis on the Foreign Contribution (Regulation) Amendment Bill, 2026.',
    topicExpanded:
      'AIPPM will deliberate the impact of the Foreign Contribution Regulations on NGOs and civil society operations in India, balancing national security and economic growth, with special emphasis on the Foreign Contribution (Regulation) Amendment Bill, 2026. Party portfolios and position paper requirements publish with the study guide.',
    venue: 'Main Block Auditorium',
  }),
  defaultCommittee({
    id: 'ip',
    acronym: 'IP',
    name: 'International Press',
    type: 'International Press',
    topic: 'Coverage brief announcing soon',
    topicExpanded: 'IP corps briefing, beat assignments, and portfolio requirements publish with the study guide.',
    portfolioNote: 'TBA — journalism portfolio requirements.',
    venue: '11-H',
    chairs: IP_CHAIRS,
  }),
  defaultCommittee({
    id: 'unhrc',
    acronym: 'UNHRC',
    name: 'UN Human Rights Council',
    type: 'UNHRC',
    topic:
      'Deliberation on Safeguarding Human Rights in the Context of Climate Change, Environmental Degradation, and Loss of Livelihoods.',
    topicExpanded:
      'UNHRC final agenda (set by the EB): Deliberation on Safeguarding Human Rights in the Context of Climate Change, Environmental Degradation, and Loss of Livelihoods. Country allocations and position paper format publish with the study guide.',
    venue: 'Indoor Sports Complex',
  }),
  defaultCommittee({
    id: 'disec',
    acronym: 'DISEC',
    name: 'Disarmament and International Security Committee',
    type: 'DISEC',
    topic:
      'Deliberation on safeguarding critical undersea and maritime infrastructure against hybrid threats, with special emphasis on threats to undersea communication cables.',
    topicExpanded:
      'DISEC agenda: Deliberation on safeguarding critical undersea and maritime infrastructure against hybrid threats, with special emphasis on threats to undersea communication cables. Agenda set by the DISEC Executive Board. Background guide, delegate allocations, and position paper requirements publish with the study guide.',
    difficulty: 'Beginner-Friendly',
    venue: '12-H',
  }),
  defaultCommittee({
    id: 'unsc',
    acronym: 'UNSC',
    name: 'UN Security Council',
    type: 'UNSC',
    topic: 'UNSC Summit Meeting',
    topicExpanded:
      'UNSC agenda — UNSC Summit Meeting. Freeze date: 30 January 1992. The Security Council convenes in the immediate aftermath of the Soviet Union\'s dissolution to address the resulting security vacuum across Eastern Europe and Central Asia, the future of nuclear stockpiles on former Soviet territory, and the framework for collective security in the post-Cold War order. Country allocations, position paper format, and background materials publish with the study guide.',
    venue: '11-D',
  }),
  defaultCommittee({
    id: 'ccpcj',
    acronym: 'CCPCJ',
    name: 'Commission on Crime Prevention and Criminal Justice',
    type: 'CCPCJ',
    topic:
      'Combating Illicit Trafficking of Drugs, Firearms, and Wildlife in Central Africa through Strengthened Regional Law Enforcement Cooperation.',
    topicExpanded:
      'CCPCJ agenda: Combating Illicit Trafficking of Drugs, Firearms, and Wildlife in Central Africa through Strengthened Regional Law Enforcement Cooperation. Background guide and country portfolios publish with the study guide.',
    venue: '12-D',
  }),
  defaultCommittee({
    id: 'ccc',
    acronym: 'CCC',
    name: 'Continental Crisis Committee',
    type: 'Crisis',
    delegateCapacity: '10',
    topic: 'The Suez Crisis.',
    topicExpanded:
      'CCC agenda — The Suez Crisis. Freeze date: 1 November 1956. The arc, directives, character briefs, and portfolio requirements publish with the full crisis roster.',
    portfolioNote: 'TBA — crisis portfolio format announcing soon.',
    venue: '12-A',
    chairs: CRISIS_CHAIRS,
  }),
]

/** PNG logo assets in `/public/` — filenames only for email base URLs */
export const YUGEN_LOGO = {
  white: '/logo-white@2x.png',
  white2x: '/logo-white@2x.png',
  dark: '/logo-white@2x.png',
  dark2x: '/logo-white@2x.png',
  emailLight: 'logo-white@2x.png',
  emailDark: 'logo-white@2x.png',
  favicon32: '/logo-white@2x.png',
  appleTouch: '/logo-white@2x.png',
  full: '/logo-white@2x.png',
  full512: '/logo-white@2x.png',
} as const

export const YUGEN_SEO = {
  title: 'Yūgen Summit 6.0 — 22 & 23 August 2026 | P. Obul Reddy Public School',
  description:
    'Yūgen Summit 6.0 at PORPS, Hyderabad — Making Every Voice Matter. The conference will take place on 22 and 23 August 2026.',
  siteUrl: 'https://yugen.ruthwikreddy.live',
  ogImage: '/og-image.png',
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
  '/portfolio-guide',
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

/** Press corps and other committees excluded from delegate allocation flows */
export const NON_DELEGATE_COMMITTEE_IDS: readonly string[] = ['ip']

export function getAllocatableCommittees(): Committee[] {
  return getCommittees().filter((c) => !NON_DELEGATE_COMMITTEE_IDS.includes(c.id))
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
