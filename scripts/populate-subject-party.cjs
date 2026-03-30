/**
 * 모든 사건 JSON의 evidence에 subjectParty 필드를 자동 세팅.
 * dispute.quadrant에서 추론:
 * - a_only → 'a'
 * - b_only → 'b'
 * - both_know, shared_misconception, 기타 → 'both'
 *
 * evidence.proves에 여러 쟁점이 있으면:
 * - 모두 a_only → 'a'
 * - 모두 b_only → 'b'
 * - 섞여있으면 → 'both'
 */
const fs = require('fs')
const path = require('path')

const casesDir = path.join(__dirname, '..', 'src', 'data', 'cases', 'generated')
const files = fs.readdirSync(casesDir).filter(f => f.endsWith('.json'))

let totalCases = 0
let totalEvidence = 0
let stats = { a: 0, b: 0, both: 0 }

for (const file of files) {
  const filePath = path.join(casesDir, file)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  if (!data.evidence || !data.disputes) continue
  totalCases++

  const disputeMap = {}
  for (const d of data.disputes) {
    disputeMap[d.id] = d.quadrant || 'both_know'
  }

  let modified = false
  for (const ev of data.evidence) {
    const quadrants = ev.proves.map(p => disputeMap[p] || 'both_know')

    let subject
    const allA = quadrants.every(q => q === 'a_only')
    const allB = quadrants.every(q => q === 'b_only')

    if (allA) subject = 'a'
    else if (allB) subject = 'b'
    else subject = 'both'

    if (ev.subjectParty !== subject) {
      ev.subjectParty = subject
      modified = true
    }
    stats[subject]++
    totalEvidence++
  }

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
  }
}

console.log(`처리 완료: ${totalCases}개 사건, ${totalEvidence}개 증거`)
console.log(`  A 주체: ${stats.a}건 | B 주체: ${stats.b}건 | 양쪽: ${stats.both}건`)
