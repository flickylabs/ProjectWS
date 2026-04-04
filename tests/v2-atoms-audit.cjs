/**
 * v2-atoms S0-S2 neutral화 검증 스크립트
 *
 * 77건(-02~-12) gpt-batch v2-atoms에서 Stage-1 규칙 위반을 검출합니다.
 *
 * 검증 규칙:
 * - S0: slots.*.fullName은 "그 사람"/"상대방"/"동생" 등 관계 표현만 허용 (2글자 이상 실명 금지)
 * - S0: slots.*.exact는 구체적 금액/시간 금지
 * - S1: slots.*.fullName은 성씨(1글자)까지만 허용
 * - S1: slots.*.exact 구체적 금액 금지
 * - S0-S1: slots.*.role은 구체적 직함 금지
 * - S0-S1: 기관명 금지
 * - 전체: "사전 상의", "특정 X" 패턴, 번역체 9패턴 검출
 */

const fs = require('fs')
const path = require('path')

const CATEGORIES = ['family', 'friend', 'neighbor', 'partnership', 'spouse', 'tenant', 'workplace']
const BATCH_DIR = path.join(__dirname, '..', 'docs', 'ref', '리뉴얼참고', 'gpt-batch')

// 한국 성씨 목록 (2글자 성씨 포함)
const KOREAN_SURNAMES = new Set([
  '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',
  '한', '오', '서', '신', '권', '황', '안', '송', '류', '전',
  '홍', '고', '문', '양', '손', '배', '백', '허', '유', '남',
  '심', '노', '하', '곽', '성', '차', '주', '우', '구', '민',
  '진', '나', '변', '제', '엄', '원', '천', '방', '공', '강',
  '현', '함', '여', '추', '탁', '도', '소', '석', '선', '설',
  '마', '길', '연', '위', '표', '명', '기', '반', '왕', '금',
  '옥', '육', '인', '맹', '피', '감', '태', '봉', '사', '빈',
  '남궁', '제갈', '독고', '사공', '선우', '황보'
])

// neutral로 인정되는 표현
const NEUTRAL_NAMES = new Set([
  '그 사람', '상대방', '상대', '당사자', '관계자', '그곳', '기관',
  '해당 금액', '적지 않은 돈', '큰돈', '그 돈', '그날', '그때',
  '가족', '배우자', '동생', '형', '누나', '언니', '오빠', '아버지', '어머니',
  '아들', '딸', '친구', '이웃', '동업자', '세입자', '집주인', '동료', '팀장',
  '윗집', '아랫집', '옆집', '가족 외 배우자'
])

// 금액 패턴
const AMOUNT_PATTERN = /[\d,]+원|\d+만\s*원|\d+천\s*원|\d+백\s*원/

// 시간 패턴 (구체적)
const TIME_EXACT_PATTERN = /\d+시\s*\d*분|\d+초|\d+분\s*(전체|녹취|통화|녹음|클립)|\d{1,2}월\s*\d{1,2}일/

// 번역체 패턴
const TRANSLATION_PATTERNS = [
  /된 것으로 생각됩니다/,
  /인 측면이 있었습니다/,
  /여러 가지.*얽혀/,
  /간과하게 된/,
  /하는 바입니다/,
  /에 기인/,
  /부득이하게/,
  /해당 건에 대해서는/,
  /인지하고 있습니다/,
]

// "사전 상의" 패턴
const PRIOR_CONSULT = /사전.*상의|사전.*협의/

// "특정 X" 패턴
const SPECIFIC_X = /특정\s*(기관|인|금액|사람|곳|업체|단체)/

function isRealName(name) {
  if (!name || typeof name !== 'string') return false
  if (NEUTRAL_NAMES.has(name)) return false
  // 1글자 성씨는 OK
  if (name.length === 1) return false
  // "X 씨" 패턴은 OK
  if (/^.{1,2}\s*씨$/.test(name)) return false
  // 관계 표현은 OK
  if (/^(제|내|우리)\s/.test(name)) return false
  // 2글자 이상이고 한국 이름 패턴이면 실명으로 간주
  const firstChar = name.charAt(0)
  const firstTwo = name.substring(0, 2)
  if ((KOREAN_SURNAMES.has(firstChar) || KOREAN_SURNAMES.has(firstTwo)) && name.length >= 2 && name.length <= 4) {
    return true
  }
  return false
}

function auditAtom(atom, state, caseId, party, disputeId) {
  const violations = []

  if (!atom.slots) return violations

  for (const [slotKey, slotVal] of Object.entries(atom.slots)) {
    if (!slotVal || typeof slotVal !== 'object') continue

    // fullName 체크
    if (slotVal.fullName && (state === 'S0' || state === 'S1')) {
      if (isRealName(slotVal.fullName)) {
        violations.push({
          atomId: atom.id,
          state,
          field: `slots.${slotKey}.fullName`,
          current: slotVal.fullName,
          expected: state === 'S0' ? '그 사람/관계표현' : `${slotVal.fullName.charAt(0)} 씨`,
          severity: 'HIGH',
        })
      }
    }

    // exact 금액 체크
    if (slotVal.exact && (state === 'S0' || state === 'S1')) {
      if (AMOUNT_PATTERN.test(slotVal.exact)) {
        violations.push({
          atomId: atom.id,
          state,
          field: `slots.${slotKey}.exact`,
          current: slotVal.exact,
          expected: '해당 금액/적지 않은 돈',
          severity: 'HIGH',
        })
      }
    }

    // exact 시간 체크 (S0만 - S1은 날짜/시각 허용)
    if (slotVal.exact && state === 'S0') {
      if (TIME_EXACT_PATTERN.test(slotVal.exact)) {
        violations.push({
          atomId: atom.id,
          state,
          field: `slots.${slotKey}.exact`,
          current: slotVal.exact,
          expected: '그날/그때/추상적 표현',
          severity: 'MEDIUM',
        })
      }
    }

    // rounded 금액 체크 (S0에서는 금지)
    if (slotVal.rounded && state === 'S0') {
      if (AMOUNT_PATTERN.test(slotVal.rounded)) {
        violations.push({
          atomId: atom.id,
          state,
          field: `slots.${slotKey}.rounded`,
          current: slotVal.rounded,
          expected: '해당 금액',
          severity: 'HIGH',
        })
      }
    }

    // role 체크 (S0-S1에서 구체적 직함 금지)
    if (slotVal.role && (state === 'S0' || state === 'S1')) {
      // "상담팀장", "법무사", "센터장" 등 구체적 직함
      if (/팀장|부장|과장|대리|사원|법무사|변호사|의사|교수|센터장|관장|실장|원장/.test(slotVal.role)) {
        violations.push({
          atomId: atom.id,
          state,
          field: `slots.${slotKey}.role`,
          current: slotVal.role,
          expected: '관계자',
          severity: 'MEDIUM',
        })
      }
    }
  }

  // factText 내 번역체/금지어 체크
  const textFields = [atom.factText, atom.fallbackPublicClaim].filter(Boolean)
  for (const text of textFields) {
    if (PRIOR_CONSULT.test(text)) {
      violations.push({
        atomId: atom.id, state,
        field: 'factText/fallbackPublicClaim',
        current: text.substring(0, 50),
        expected: '"사전 상의/협의" 제거',
        severity: 'MEDIUM',
      })
    }
    if (SPECIFIC_X.test(text)) {
      violations.push({
        atomId: atom.id, state,
        field: 'factText/fallbackPublicClaim',
        current: text.substring(0, 50),
        expected: '"특정 X" 제거',
        severity: 'MEDIUM',
      })
    }
  }

  return violations
}

function auditFile(filePath, caseId) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const allViolations = []

  const policies = data.claimPolicies
  if (!policies) return { caseId, violations: [], atomCount: 0 }

  let atomCount = 0

  for (const [party, disputes] of Object.entries(policies)) {
    for (const [disputeId, states] of Object.entries(disputes)) {
      for (const [state, stateData] of Object.entries(states)) {
        const atoms = stateData.claimAtoms || []
        atomCount += atoms.length

        for (const atom of atoms) {
          const v = auditAtom(atom, state, caseId, party, disputeId)
          allViolations.push(...v)
        }

        // publicClaim 텍스트도 체크
        const publicClaims = stateData.publicClaim || []
        for (const claim of publicClaims) {
          if ((state === 'S0' || state === 'S1') && AMOUNT_PATTERN.test(claim)) {
            allViolations.push({
              atomId: `${party}.${disputeId}.publicClaim`,
              state, field: 'publicClaim',
              current: claim.substring(0, 60),
              expected: '금액 제거',
              severity: 'MEDIUM',
            })
          }
        }
      }
    }
  }

  return { caseId, violations: allViolations, atomCount }
}

// 실행
console.log('=== v2-atoms S0-S2 neutral화 검증 ===\n')

let totalViolations = 0
let totalAtoms = 0
const summaryByCase = []
const summaryBySeverity = { HIGH: 0, MEDIUM: 0 }

for (const cat of CATEGORIES) {
  for (let i = 2; i <= 12; i++) {
    const num = String(i).padStart(2, '0')
    const caseId = `${cat}-${num}`
    const filePath = path.join(BATCH_DIR, caseId, `${caseId}-v2-atoms.json`)

    if (!fs.existsSync(filePath)) {
      console.log(`[SKIP] ${caseId}: 파일 없음`)
      continue
    }

    try {
      const result = auditFile(filePath, caseId)
      totalAtoms += result.atomCount
      totalViolations += result.violations.length

      for (const v of result.violations) {
        summaryBySeverity[v.severity] = (summaryBySeverity[v.severity] || 0) + 1
      }

      if (result.violations.length > 0) {
        summaryByCase.push({
          caseId,
          count: result.violations.length,
          highCount: result.violations.filter(v => v.severity === 'HIGH').length,
        })

        // 상위 3건만 출력
        console.log(`[FAIL] ${caseId}: ${result.violations.length}건 위반 (atoms: ${result.atomCount})`)
        for (const v of result.violations.slice(0, 3)) {
          console.log(`  ${v.severity} ${v.state} ${v.atomId} | ${v.field}: "${v.current}" → ${v.expected}`)
        }
        if (result.violations.length > 3) {
          console.log(`  ... +${result.violations.length - 3}건`)
        }
      } else {
        console.log(`[PASS] ${caseId} (atoms: ${result.atomCount})`)
      }
    } catch (err) {
      console.log(`[ERROR] ${caseId}: ${err.message}`)
    }
  }
}

console.log('\n=== 종합 ===')
console.log(`총 atoms: ${totalAtoms}`)
console.log(`총 위반: ${totalViolations}`)
console.log(`  HIGH: ${summaryBySeverity.HIGH || 0}`)
console.log(`  MEDIUM: ${summaryBySeverity.MEDIUM || 0}`)
console.log(`위반 사건: ${summaryByCase.length}건 / 77건`)
console.log('')

if (summaryByCase.length > 0) {
  console.log('=== 사건별 위반 수 (내림차순) ===')
  summaryByCase.sort((a, b) => b.count - a.count)
  for (const s of summaryByCase) {
    console.log(`  ${s.caseId}: ${s.count}건 (HIGH: ${s.highCount})`)
  }
}
