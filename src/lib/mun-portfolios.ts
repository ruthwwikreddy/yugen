/** Common MUN portfolio / cabinet positions — grouped for browse UX */
export const MUN_PORTFOLIO_GROUPS = [
  {
    label: 'Head of Government & State',
    options: [
      'Prime Minister / Head of Government',
      'President / Head of State',
      'Vice President / Deputy Head of State',
      'Chief Justice / Supreme Court',
      'Speaker of Parliament',
      'Leader of Opposition',
    ],
  },
  {
    label: 'Ambassadors & Diplomats',
    options: [
      'Ambassador / Permanent Representative',
      'Deputy Ambassador',
      'Minister of External Affairs',
      'Minister of Foreign Affairs',
    ],
  },
  {
    label: 'Cabinet Ministers',
    options: [
      'Minister of Defence',
      'Minister of Finance / Treasury',
      'Minister of Economy / Commerce',
      'Minister of Health',
      'Minister of Education',
      'Minister of Environment',
      'Minister of Energy',
      'Minister of Agriculture',
      'Minister of Justice / Attorney General',
      'Minister of Interior / Home Affairs',
      'Minister of Labour / Employment',
      'Minister of Transport',
      'Minister of Science & Technology',
      'Minister of Culture & Tourism',
      'Minister of Women & Child Development',
      'Minister of Social Welfare',
      'Minister of Housing & Urban Development',
      'Minister of Water Resources',
      'Minister of Information & Broadcasting',
      'Minister of Trade & Industry',
      'Minister of Rural Development',
      'Minister of Petroleum & Natural Gas',
      'Minister of Communications',
      'Minister of Minority Affairs',
      'Minister of Tribal Affairs',
      'Minister of Youth Affairs & Sports',
      'Minister of Micro, Small & Medium Enterprises',
      'Minister of Civil Aviation',
      'Minister of Railways',
      'Minister of Ports & Shipping',
      'Minister of Mines & Minerals',
      'Minister of Textiles',
      'Minister of Food Processing',
      'Minister of Chemicals & Fertilizers',
      'Minister of Consumer Affairs',
      'Minister of Corporate Affairs',
      'Minister of Cooperation',
      'Minister of Earth Sciences',
      'Minister of Parliamentary Affairs',
      'Minister of Personnel & Public Grievances',
      'Minister of Power',
      'Minister of Skill Development',
      'Minister of Statistics & Programme Implementation',
      'Minister of Steel',
      'Minister of Heavy Industries',
      'Minister of Panchayati Raj',
      'Minister of Development of North Eastern Region',
      'Cabinet Member (General)',
    ],
  },
  {
    label: 'UN & International Organizations',
    options: [
      'UN Secretary-General',
      'UN Deputy Secretary-General',
      'UN High Commissioner for Human Rights',
      'UN Special Envoy',
      'UNICEF Executive Director',
      'WHO Director-General',
      'UNESCO Director-General',
      'UNHCR High Commissioner',
      'WFP Executive Director',
      'IAEA Director General',
      'IMF Managing Director',
      'World Bank President',
      'WTO Director-General',
    ],
  },
  {
    label: 'Regional & Multilateral Bodies',
    options: [
      'NATO Secretary General',
      'EU High Representative',
      'EU Commissioner',
      'ASEAN Secretary-General',
      'African Union Chairperson',
      'OIC Secretary General',
      'Arab League Secretary General',
      'G7 Sherpa',
      'G20 Sherpa',
      'BRICS Sherpa',
    ],
  },
  {
    label: 'UN Bodies & Courts',
    options: [
      'Security Council President',
      'Security Council Member',
      'General Assembly President',
      'ECOSOC President',
      'ICJ Judge',
      'ICC Prosecutor',
    ],
  },
  {
    label: 'Crisis & Special Roles',
    options: ['Crisis Director', 'Crisis Deputy Director'],
  },
  {
    label: 'General Delegates',
    options: [
      'Delegate (General Assembly)',
      'Delegate (Specialized Agency)',
      'Observer State Representative',
      'NGO Representative',
      'Press / Media Delegate',
    ],
  },
] as const

/** Shown first when the dropdown opens with no search query */
export const POPULAR_PORTFOLIOS = [
  'Minister of Foreign Affairs',
  'Ambassador / Permanent Representative',
  'Minister of Defence',
  'Minister of Finance / Treasury',
  'Prime Minister / Head of Government',
  'Minister of Environment',
  'UN Secretary-General',
  'Security Council Member',
  'Delegate (General Assembly)',
  'Deputy Ambassador',
] as const

/** Flat list for validation and backward compatibility — no duplicate "No preference" */
export const MUN_PORTFOLIOS = MUN_PORTFOLIO_GROUPS.flatMap((g) => g.options)

export type MunPortfolio = (typeof MUN_PORTFOLIOS)[number]

export function filterPortfolios(query: string, limit = 50): string[] {
  const q = query.trim().toLowerCase()
  if (!q) return [...MUN_PORTFOLIOS].slice(0, limit)
  return MUN_PORTFOLIOS.filter((p) => p.toLowerCase().includes(q)).slice(0, limit)
}
