import fs from 'fs'
import path from 'path'

if (!fs.existsSync('./src/data')) {
  fs.mkdirSync('./src/data', { recursive: true })
}

const parseCsv = (content) => {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0)
  const parseLine = (line) => {
    const result = []
    let cur = '',
      inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const c = line[i]
      if (c === '"') {
        inQuotes = !inQuotes
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim())
        cur = ''
      } else {
        cur += c
      }
    }
    result.push(cur.trim())
    return result
  }
  return lines.map(parseLine)
}

// Section headers / row-level labels to skip
const SKIP_LABELS = new Set([
  'portfolio',
  'country',
  'ans',
  'permanent members',
  'non-permanent members',
  'observers',
  'observer states',
])

const dir = './public/allocations'
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.csv'))

const committeeMap = {
  AIPPM: { id: 'aippm', acronym: 'AIPPM', name: 'All India Political Parties Meet' },
  CCC: { id: 'ccc', acronym: 'CCC', name: 'Continental Crisis Committee' },
  CCPCJ: { id: 'ccpcj', acronym: 'CCPCJ', name: 'Commission on Crime Prevention and Criminal Justice' },
  DISEC: { id: 'disec', acronym: 'DISEC', name: 'Disarmament and International Security Committee' },
  IP: { id: 'ip', acronym: 'IP', name: 'International Press' },
  'UNHRC': { id: 'unhrc', acronym: 'UNHRC', name: 'UN Human Rights Council' },
  UNSC: { id: 'unsc', acronym: 'UNSC', name: 'UN Security Council' },
}

const allocations = []

files.forEach((file) => {
  let committeeInfo = null
  for (const [key, info] of Object.entries(committeeMap)) {
    if (file.includes(key)) {
      committeeInfo = info
      break
    }
  }
  if (!committeeInfo) return

  const content = fs.readFileSync(path.join(dir, file), 'utf8')
  const rows = parseCsv(content)

  rows.forEach((r, idx) => {
    // Always skip header row
    if (idx === 0) return

    let portfolio = '',
      partyCountry = '',
      delegateName = '',
      institution = ''

    if (committeeInfo.id === 'aippm') {
      portfolio = r[0] || ''
      partyCountry = r[1] || ''
      delegateName = r[2] || ''
      institution = r[3] || ''
    } else if (committeeInfo.id === 'ccc') {
      portfolio = r[0] || ''
      partyCountry = r[1] || ''
      delegateName = r[2] || ''
      institution = r[3] || ''
    } else {
      // ccpcj, disec, ip, unhrc, unsc — all use col0=portfolio, col1=name, col2=institution
      portfolio = r[0] || ''
      delegateName = r[1] || ''
      institution = r[2] || ''
    }

    // Skip section headers and empty portfolios
    if (!portfolio) return
    if (SKIP_LABELS.has(portfolio.toLowerCase())) return

    allocations.push({
      id: committeeInfo.id + '-' + idx,
      committeeId: committeeInfo.id,
      committeeAcronym: committeeInfo.acronym,
      committeeName: committeeInfo.name,
      portfolio: portfolio.trim(),
      partyCountry: partyCountry.trim(),
      delegateName: delegateName.trim(),
      institution: institution.trim(),
      status: delegateName.trim() ? 'allocated' : 'vacant',
    })
  })
})

// Summary
const byCommittee = {}
allocations.forEach((a) => {
  if (!byCommittee[a.committeeAcronym]) byCommittee[a.committeeAcronym] = { total: 0, filled: 0, vacant: 0 }
  byCommittee[a.committeeAcronym].total++
  if (a.status === 'allocated') byCommittee[a.committeeAcronym].filled++
  else byCommittee[a.committeeAcronym].vacant++
})

console.log('\nPer-committee allocation counts:')
for (const [acronym, s] of Object.entries(byCommittee)) {
  console.log(`  ${acronym}: ${s.total} portfolios (${s.filled} filled, ${s.vacant} vacant)`)
}
console.log(`\nTotal: ${allocations.length} portfolios`)

fs.writeFileSync('./src/data/allocationsData.json', JSON.stringify(allocations, null, 2))
console.log('Wrote src/data/allocationsData.json')
