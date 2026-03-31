/**
 * 84개 사건의 증거 귀속성 + 증인-truth 매칭을 분석하는 스크립트.
 *
 * 판단 기준:
 * 1. 증거 귀속성 (subjectParty):
 *    - evidence.description에 특정 캐릭터 이름만 언급 → 해당 캐릭터 전용
 *    - evidence.proves[]가 한쪽 lieConfig에만 있는 쟁점만 포함 → 해당 캐릭터 전용
 *    - 양쪽 다 관련 → both 유지
 *
 * 2. 증인-truth 매칭:
 *    - witness.knowledgeScope의 키워드가 truthTable.fact와 매칭되는지 확인
 *
 * 출력: 수정이 필요한 사건별 리포트
 */

const fs = require('fs')
const path = require('path')

const CASES_DIR = path.join(__dirname, '..', 'src', 'data', 'cases', 'generated')

function analyzeCase(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw)
  const fileName = path.basename(filePath)

  const partyAName = data.duo.partyA.name
  const partyBName = data.duo.partyB.name

  // lieConfig에서 각 파티의 쟁점 ID 추출
  const aDisputeIds = new Set((data.lieConfigA || []).map(lc => lc.disputeId))
  const bDisputeIds = new Set((data.lieConfigB || []).map(lc => lc.disputeId))

  const issues = []

  // ── 1. 증거 귀속성 분석 ──
  for (const ev of data.evidence || []) {
    const desc = ev.description || ''
    const name = ev.name || ''
    const combined = desc + ' ' + name

    // 증거가 proves하는 쟁점이 한쪽 lieConfig에만 있는지 확인
    const provesA = ev.proves.some(dId => aDisputeIds.has(dId))
    const provesB = ev.proves.some(dId => bDisputeIds.has(dId))

    // description에서 캐릭터 이름 언급 확인
    const mentionsA = combined.includes(partyAName) || combined.includes(partyAName.slice(1))
    const mentionsB = combined.includes(partyBName) || combined.includes(partyBName.slice(1))

    // 판단
    let suggestedParty = ev.subjectParty || 'both'
    let reason = ''

    if (provesA && !provesB) {
      // A의 쟁점만 증명 → A 전용 가능성
      if (mentionsA && !mentionsB) {
        suggestedParty = 'a'
        reason = `A(${partyAName})의 쟁점만 proves + 설명에 A만 언급`
      } else if (!mentionsB) {
        suggestedParty = 'a'
        reason = `A의 쟁점만 proves`
      }
    } else if (provesB && !provesA) {
      if (mentionsB && !mentionsA) {
        suggestedParty = 'b'
        reason = `B(${partyBName})의 쟁점만 proves + 설명에 B만 언급`
      } else if (!mentionsA) {
        suggestedParty = 'b'
        reason = `B의 쟁점만 proves`
      }
    } else {
      // 양쪽 다 proves하지만, description이 한쪽만 언급하면 확인 필요
      if (mentionsA && !mentionsB) {
        reason = `양쪽 쟁점 proves하지만 설명에 A(${partyAName})만 언급 — 검토 필요`
      } else if (mentionsB && !mentionsA) {
        reason = `양쪽 쟁점 proves하지만 설명에 B(${partyBName})만 언급 — 검토 필요`
      }
    }

    if (suggestedParty !== (ev.subjectParty || 'both') || reason.includes('검토')) {
      issues.push({
        type: 'evidence',
        id: ev.id,
        name: ev.name,
        current: ev.subjectParty || '(없음)',
        suggested: suggestedParty,
        reason,
      })
    }
  }

  // ── 2. 증인-truth 매칭 분석 ──
  const witnesses = data.duo.socialGraph || []
  const truthTable = data.truthTable || []
  const activeWitnesses = witnesses.filter(w =>
    (data.activeThirdParties || []).includes(w.id)
  )

  for (const w of activeWitnesses) {
    const scope = w.knowledgeScope || ''
    const matchedTruths = []

    for (let i = 0; i < truthTable.length; i++) {
      const truth = truthTable[i]
      const truthId = truth.id || `t-${i + 1}`

      // 키워드 매칭
      const keywords = truth.fact
        .replace(/[은는이가을를의에서로도만~,.!?'"]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length >= 3)

      const matchCount = keywords.filter(kw => scope.includes(kw)).length
      const matchRatio = keywords.length > 0 ? matchCount / keywords.length : 0

      if (matchRatio >= 0.3) {
        matchedTruths.push({ truthId, fact: truth.fact.slice(0, 50), matchRatio: Math.round(matchRatio * 100) })
      }
    }

    issues.push({
      type: 'witness_truth',
      witnessId: w.id,
      witnessName: w.name,
      matchedTruths,
      scope: scope.slice(0, 80),
    })
  }

  return { fileName, partyAName, partyBName, issues }
}

// 실행
const files = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.json')).sort()

let totalEvidenceIssues = 0
let totalWitnessMappings = 0

for (const file of files) {
  const result = analyzeCase(path.join(CASES_DIR, file))
  const evIssues = result.issues.filter(i => i.type === 'evidence')
  const witnessMappings = result.issues.filter(i => i.type === 'witness_truth')

  if (evIssues.length > 0 || witnessMappings.some(w => w.matchedTruths.length > 0)) {
    console.log(`\n=== ${result.fileName} (A: ${result.partyAName} / B: ${result.partyBName}) ===`)

    for (const issue of evIssues) {
      console.log(`  [증거 ${issue.id}] "${issue.name}" : ${issue.current} → ${issue.suggested} | ${issue.reason}`)
      totalEvidenceIssues++
    }

    for (const wm of witnessMappings) {
      if (wm.matchedTruths.length > 0) {
        console.log(`  [증인 ${wm.witnessId}] ${wm.witnessName}`)
        for (const mt of wm.matchedTruths) {
          console.log(`    → ${mt.truthId} (${mt.matchRatio}%): ${mt.fact}...`)
        }
        totalWitnessMappings++
      }
    }
  }
}

console.log(`\n=== 총계 ===`)
console.log(`증거 귀속 수정 필요: ${totalEvidenceIssues}건`)
console.log(`증인-truth 매칭 존재: ${totalWitnessMappings}건`)
