/**
 * 84개 사건의 증거 subjectParty를 자동 수정.
 *
 * 수정 기준:
 * 1. proves가 한쪽 lieConfig의 쟁점만 → 해당 파티로 변경 (확실한 건)
 * 2. 양쪽 다 proves하지만 description에 한쪽만 언급 → "검토 필요"로 로그만 (자동 수정 안 함)
 *
 * spouse-01은 이미 수동 수정했으므로 스킵.
 */
const fs = require('fs')
const path = require('path')

const CASES_DIR = path.join(__dirname, '..', 'src', 'data', 'cases', 'generated')

let totalFixed = 0
let totalReviewNeeded = 0

const files = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.json')).sort()

for (const file of files) {
  const filePath = path.join(CASES_DIR, file)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw)

  const partyAName = data.duo.partyA.name
  const partyBName = data.duo.partyB.name

  const aDisputeIds = new Set((data.lieConfigA || []).map(lc => lc.disputeId))
  const bDisputeIds = new Set((data.lieConfigB || []).map(lc => lc.disputeId))

  let modified = false

  for (const ev of data.evidence || []) {
    const desc = (ev.description || '') + ' ' + (ev.name || '')
    const provesA = ev.proves.some(dId => aDisputeIds.has(dId))
    const provesB = ev.proves.some(dId => bDisputeIds.has(dId))
    const mentionsA = desc.includes(partyAName) || desc.includes(partyAName.slice(1))
    const mentionsB = desc.includes(partyBName) || desc.includes(partyBName.slice(1))

    const current = ev.subjectParty || 'both'

    // Case 1: 한쪽 쟁점만 proves → 확실히 해당 파티
    if (provesA && !provesB && current !== 'a') {
      ev.subjectParty = 'a'
      modified = true
      totalFixed++
    } else if (provesB && !provesA && current !== 'b') {
      ev.subjectParty = 'b'
      modified = true
      totalFixed++
    }
    // Case 2: 양쪽 다 proves하지만 description에 한쪽만 → 로그만
    else if (provesA && provesB && current === 'both') {
      if (mentionsA && !mentionsB) {
        totalReviewNeeded++
      } else if (mentionsB && !mentionsA) {
        totalReviewNeeded++
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`✅ ${file} — 수정됨`)
  }
}

console.log(`\n=== 결과 ===`)
console.log(`자동 수정: ${totalFixed}건`)
console.log(`수동 검토 필요 (both 유지, description 편향): ${totalReviewNeeded}건`)
