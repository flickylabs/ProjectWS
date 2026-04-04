/**
 * v2-atoms S0-S2 neutral화 자동 교정 스크립트
 *
 * 77건(-02~-12) gpt-batch v2-atoms에서:
 * - S0: fullName → "그 사람"/judgeRef/관계표현
 * - S0: exact 금액 → "해당 금액"
 * - S0: rounded 금액 → "해당 금액"
 * - S0: exact 시간 → "그날"/"그때"
 * - S1: fullName → 성씨+" 씨"
 * - S1: exact 금액 → "적지 않은 돈"
 * - "특정 X" 패턴 → 중립 표현
 */

const fs = require('fs')
const path = require('path')

const CATEGORIES = ['family', 'friend', 'neighbor', 'partnership', 'spouse', 'tenant', 'workplace']
const BATCH_DIR = path.join(__dirname, '..', 'docs', 'ref', '리뉴얼참고', 'gpt-batch')

// 한국 성씨 목록
const KOREAN_SURNAMES = new Set([
  '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',
  '한', '오', '서', '신', '권', '황', '안', '송', '류', '전',
  '홍', '고', '문', '양', '손', '배', '백', '허', '유', '남',
  '심', '노', '하', '곽', '성', '차', '주', '우', '구', '민',
  '진', '나', '변', '제', '엄', '원', '천', '방', '공',
  '현', '함', '여', '추', '탁', '도', '소', '석', '선', '설',
  '마', '길', '연', '위', '표', '명', '기', '반', '왕', '금',
  '옥', '육', '인', '맹', '피', '감', '태', '봉', '사', '빈',
  '남궁', '제갈', '독고', '사공', '선우', '황보'
])

const NEUTRAL_NAMES = new Set([
  '그 사람', '상대방', '상대', '당사자', '관계자', '그곳', '기관',
  '해당 금액', '적지 않은 돈', '큰돈', '그 돈', '그날', '그때',
  '가족', '배우자', '동생', '형', '누나', '언니', '오빠', '아버지', '어머니',
  '아들', '딸', '친구', '이웃', '동업자', '세입자', '집주인', '동료', '팀장',
  '윗집', '아랫집', '옆집', '가족 외 배우자'
])

const AMOUNT_PATTERN = /[\d,]+원|\d+만\s*원|\d+천\s*원|\d+백\s*원/
const TIME_EXACT_PATTERN = /\d+시\s*\d*분|\d+초|\d+분\s*(전체|녹취|통화|녹음|클립)|\d{1,2}월\s*\d{1,2}일/
const SPECIFIC_X = /특정\s*(기관|인|금액|사람|곳|업체|단체)/g

function isRealName(name) {
  if (!name || typeof name !== 'string') return false
  if (NEUTRAL_NAMES.has(name)) return false
  if (name.length === 1) return false
  if (/^.{1,2}\s*씨$/.test(name)) return false
  if (/^(제|내|우리)\s/.test(name)) return false
  const firstChar = name.charAt(0)
  const firstTwo = name.substring(0, 2)
  if ((KOREAN_SURNAMES.has(firstChar) || KOREAN_SURNAMES.has(firstTwo)) && name.length >= 2 && name.length <= 4) {
    return true
  }
  return false
}

function getSurname(name) {
  if (!name) return '그'
  const firstTwo = name.substring(0, 2)
  if (KOREAN_SURNAMES.has(firstTwo)) return firstTwo
  return name.charAt(0)
}

function neutralizeSlot(slotVal, state, slotKey) {
  if (!slotVal || typeof slotVal !== 'object') return 0
  let fixes = 0

  // fullName 교정
  if (slotVal.fullName && isRealName(slotVal.fullName)) {
    if (state === 'S0') {
      // S0: judgeRef가 있으면 그걸 쓰고, 없으면 "그 사람"
      const replacement = slotVal.judgeRef && !isRealName(slotVal.judgeRef)
        ? slotVal.judgeRef
        : '그 사람'
      slotVal.fullName = replacement
      fixes++
    } else if (state === 'S1') {
      // S1: 성씨 + " 씨"
      const surname = getSurname(slotVal.fullName)
      slotVal.fullName = `${surname} 씨`
      fixes++
    }
  }

  // role 교정 (S0-S1에서 구체적 직함)
  if (slotVal.role && (state === 'S0' || state === 'S1')) {
    if (/팀장|부장|과장|대리|사원|법무사|변호사|의사|교수|센터장|관장|실장|원장/.test(slotVal.role)) {
      slotVal.role = '관계자'
      fixes++
    }
  }

  // exact 금액 교정
  if (slotVal.exact && AMOUNT_PATTERN.test(slotVal.exact)) {
    if (state === 'S0') {
      slotVal.exact = '해당 금액'
      fixes++
    } else if (state === 'S1') {
      slotVal.exact = '적지 않은 돈'
      fixes++
    }
  }

  // rounded 금액 교정 (S0만)
  if (slotVal.rounded && AMOUNT_PATTERN.test(slotVal.rounded) && state === 'S0') {
    slotVal.rounded = '해당 금액'
    fixes++
  }

  // exact 시간 교정 (S0만 - S1은 시각 허용)
  if (slotVal.exact && TIME_EXACT_PATTERN.test(slotVal.exact) && state === 'S0') {
    // 이미 금액으로 교정됐으면 스킵
    if (slotVal.exact !== '해당 금액' && slotVal.exact !== '적지 않은 돈') {
      slotVal.exact = slotVal.neutral || '그때'
      fixes++
    }
  }

  return fixes
}

function fixSpecificX(text) {
  if (!text || typeof text !== 'string') return { text, fixed: false }
  const replacements = {
    '특정 기관': '기관',
    '특정인': '그 사람',
    '특정 금액': '해당 금액',
    '특정 사람': '그 사람',
    '특정 곳': '그곳',
    '특정 업체': '업체',
    '특정 단체': '단체',
  }
  let fixed = false
  let result = text
  for (const [from, to] of Object.entries(replacements)) {
    if (result.includes(from)) {
      result = result.replace(new RegExp(from, 'g'), to)
      fixed = true
    }
  }
  return { text: result, fixed }
}

function fixFile(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  let totalFixes = 0

  const policies = data.claimPolicies
  if (!policies) return { fixes: 0 }

  for (const [party, disputes] of Object.entries(policies)) {
    for (const [disputeId, states] of Object.entries(disputes)) {
      for (const [state, stateData] of Object.entries(states)) {
        // S0, S1만 교정 (S2는 별도 판단 필요하므로 여기선 S0-S1만)
        if (state !== 'S0' && state !== 'S1') continue

        const atoms = stateData.claimAtoms || []
        for (const atom of atoms) {
          if (!atom.slots) continue
          for (const [slotKey, slotVal] of Object.entries(atom.slots)) {
            totalFixes += neutralizeSlot(slotVal, state, slotKey)
          }

          // factText "특정 X" + "사전 상의" 교정
          if (atom.factText) {
            const r = fixSpecificX(atom.factText)
            if (r.fixed) { atom.factText = r.text; totalFixes++ }
            if (/사전\s*상의|사전\s*협의/.test(atom.factText)) {
              atom.factText = atom.factText
                .replace(/사전\s*상의/g, '미리 알리기')
                .replace(/사전\s*협의/g, '미리 상의')
              totalFixes++
            }
          }
          // fallbackPublicClaim "특정 X" + "사전 상의" 교정
          if (atom.fallbackPublicClaim) {
            const r = fixSpecificX(atom.fallbackPublicClaim)
            if (r.fixed) { atom.fallbackPublicClaim = r.text; totalFixes++ }
            if (/사전\s*상의|사전\s*협의/.test(atom.fallbackPublicClaim)) {
              atom.fallbackPublicClaim = atom.fallbackPublicClaim
                .replace(/사전\s*상의/g, '미리 알리기')
                .replace(/사전\s*협의/g, '미리 상의')
              totalFixes++
            }
          }
        }

        // publicClaim 금액 교정 (S0-S1)
        if (stateData.publicClaim && (state === 'S0' || state === 'S1')) {
          for (let i = 0; i < stateData.publicClaim.length; i++) {
            const claim = stateData.publicClaim[i]
            if (AMOUNT_PATTERN.test(claim)) {
              const replacement = state === 'S0' ? '해당 금액' : '적지 않은 돈'
              stateData.publicClaim[i] = claim.replace(AMOUNT_PATTERN, replacement)
              totalFixes++
            }
            // "사전 상의/협의" 교정
            if (/사전\s*상의|사전\s*협의/.test(stateData.publicClaim[i])) {
              stateData.publicClaim[i] = stateData.publicClaim[i]
                .replace(/사전\s*상의/g, '미리 알리기')
                .replace(/사전\s*협의/g, '미리 상의')
              totalFixes++
            }
            const r = fixSpecificX(stateData.publicClaim[i])
            if (r.fixed) { stateData.publicClaim[i] = r.text; totalFixes++ }
          }
        }
      }
    }
  }

  return { data, fixes: totalFixes }
}

// 실행
const DRY_RUN = process.argv.includes('--dry-run')
const WRITE = process.argv.includes('--write')

console.log(`=== v2-atoms S0-S1 자동 교정 ${DRY_RUN ? '(DRY RUN)' : WRITE ? '(WRITE MODE)' : '(PREVIEW)'} ===\n`)

let totalFiles = 0
let totalFixes = 0
let fixedFiles = 0

for (const cat of CATEGORIES) {
  for (let i = 2; i <= 12; i++) {
    const num = String(i).padStart(2, '0')
    const caseId = `${cat}-${num}`
    const filePath = path.join(BATCH_DIR, caseId, `${caseId}-v2-atoms.json`)

    if (!fs.existsSync(filePath)) continue
    totalFiles++

    const result = fixFile(filePath)
    totalFixes += result.fixes

    if (result.fixes > 0) {
      fixedFiles++
      console.log(`[FIX] ${caseId}: ${result.fixes}건 교정`)

      if (WRITE && result.data) {
        fs.writeFileSync(filePath, JSON.stringify(result.data, null, 2), 'utf-8')
        console.log(`  → 파일 저장 완료`)
      }
    } else {
      console.log(`[OK]  ${caseId}: 교정 불필요`)
    }
  }
}

console.log(`\n=== 결과 ===`)
console.log(`검사 파일: ${totalFiles}`)
console.log(`교정 파일: ${fixedFiles}`)
console.log(`총 교정: ${totalFixes}건`)
if (!WRITE) {
  console.log(`\n실제 저장하려면: node tests/v2-atoms-auto-fix.cjs --write`)
}
