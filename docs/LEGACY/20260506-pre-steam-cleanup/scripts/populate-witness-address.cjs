/**
 * 253명 증인의 addressA/addressB를 자동 생성.
 * 증인 이름의 괄호 안 관계 + 사건 관계 유형에서 추론.
 */
const fs = require('fs')
const path = require('path')

const casesDir = path.join(__dirname, '..', 'src', 'data', 'cases', 'generated')
const files = fs.readdirSync(casesDir).filter(f => f.endsWith('.json')).sort()

function inferAddress(witnessName, partyName, partyAge, relType) {
  const givenName = partyName.length > 1 ? partyName.slice(1) : partyName
  const relMatch = witnessName.match(/\((.+?)\)/)
  const rel = relMatch?.[1] ?? ''

  // "~의 어머니" 패턴 — 특정 당사자의 부모인 경우에만 "우리" 사용
  const possessiveMatch = rel.match(/(.+?)의\s*/)
  const possessiveName = possessiveMatch?.[1] ?? ''

  // 가족 관계 — 증인이 부모/조부모
  if (rel.includes('어머니') || rel.includes('엄마') || rel.includes('아버지') || rel.includes('아빠')) {
    // "세린의 어머니" → 세린에게만 "우리 세린", 지석에게는 "지석씨"
    if (possessiveName && !partyName.includes(possessiveName) && !givenName.includes(possessiveName)) {
      return `${givenName}씨`
    }
    return `우리 ${givenName}`
  }
  if (rel.includes('할머니') || rel.includes('할아버지')) {
    if (possessiveName && !partyName.includes(possessiveName) && !givenName.includes(possessiveName)) {
      return `${givenName}씨`
    }
    return `우리 ${givenName}`
  }

  // 가족 — 형제자매
  if (rel.includes('누나') || rel.includes('언니')) return givenName
  if (rel.includes('형') || rel.includes('오빠')) return givenName
  if (rel.includes('동생')) return givenName

  // 배우자 관계
  if (rel.includes('남편') || rel.includes('아내') || rel.includes('배우자')) return givenName

  // 친구
  if (rel.includes('친구') || rel.includes('절친') || rel.includes('소꿉')) return givenName

  // 직장 관계
  if (rel.includes('상사') || rel.includes('팀장') || rel.includes('부장') || rel.includes('과장') || rel.includes('대표')) {
    return `${givenName}씨`
  }
  if (rel.includes('동료') || rel.includes('동기') || rel.includes('선배') || rel.includes('후배')) {
    return `${givenName}씨`
  }
  if (rel.includes('직원') || rel.includes('비서') || rel.includes('매니저')) return `${givenName}씨`

  // 이웃 관계
  if (rel.includes('이웃') || rel.includes('주민') || rel.includes('동대표') || rel.includes('경비')) {
    return `${partyName}씨`
  }
  if (rel.includes('관리') || rel.includes('시설')) return `${partyName}씨`

  // 전문가/제3자
  if (rel.includes('변호사') || rel.includes('의사') || rel.includes('교수') || rel.includes('상담')) {
    return `${partyName}씨`
  }
  if (rel.includes('사회복지') || rel.includes('요양') || rel.includes('간호') || rel.includes('보호사')) {
    return `${partyName}씨`
  }

  // 사건 관계 유형 기반 폴백
  if (relType === 'spouse' || relType === 'friend') return `${givenName}씨`
  if (relType === 'family') return `${givenName}씨`

  // 기본
  return `${partyName}씨`
}

let totalWitnesses = 0
let updated = 0

for (const file of files) {
  const filePath = path.join(casesDir, file)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  if (!data.duo?.socialGraph) continue

  const relType = data.meta?.relationshipType ?? data.duo.relationshipType ?? ''
  const nameA = data.duo.partyA.name
  const nameB = data.duo.partyB.name
  const ageA = data.duo.partyA.age ?? 0
  const ageB = data.duo.partyB.age ?? 0

  let modified = false
  for (const tp of data.duo.socialGraph) {
    totalWitnesses++
    if (!tp.addressA) {
      tp.addressA = inferAddress(tp.name, nameA, ageA, relType)
      modified = true
      updated++
    }
    if (!tp.addressB) {
      tp.addressB = inferAddress(tp.name, nameB, ageB, relType)
      modified = true
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
  }
}

console.log(`완료: ${totalWitnesses}명 중 ${updated}명 호칭 생성`)
