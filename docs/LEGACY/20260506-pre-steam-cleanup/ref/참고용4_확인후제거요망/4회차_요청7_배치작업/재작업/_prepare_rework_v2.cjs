/**
 * 재작업 폴더 준비 v2
 * - 10~15회차: S1~S3 heavy 재작업 추가
 * - 16회차: S1 truthPolicy 누락 (경량)
 * - 기존 1~8회차 폴더는 건드리지 않음
 * - 기존 9회차 폴더는 삭제 (16회차로 대체)
 */
const fs = require('fs')
const path = require('path')

const BASE = path.join(__dirname, '..')
const REWORK = path.join(BASE, '재작업')

// ── 신규 세션 정의 ──
const newSessions = [
  { id: 10, label: 'spouse_01to06', srcSession: 1, type: 'spouse', range: [1, 6], heavy: true },
  { id: 11, label: 'spouse_07to12', srcSession: 1, type: 'spouse', range: [7, 12], heavy: true },
  { id: 12, label: 'family_01to06', srcSession: 2, type: 'family', range: [1, 6], heavy: true },
  { id: 13, label: 'family_07to12', srcSession: 2, type: 'family', range: [7, 12], heavy: true },
  { id: 14, label: 'friend_01to06', srcSession: 3, type: 'friend', range: [1, 6], heavy: true },
  { id: 15, label: 'friend_07to12', srcSession: 3, type: 'friend', range: [7, 12], heavy: true },
  { id: 16, label: 'spouse_truthPolicy_누락', srcSession: null, type: null, range: null, heavy: false },
]

// ── 결과 JSON 로드 & 분할 ──
function loadResult(sessionNum) {
  const dir = path.join(BASE, `Session${sessionNum}_결과`)
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
  if (files.length === 0) throw new Error(`No result file in Session${sessionNum}`)
  return JSON.parse(fs.readFileSync(path.join(dir, files[0]), 'utf-8'))
}

function extractCases(fullResult, type, start, end) {
  const subset = {}
  const caseIds = []
  for (let i = start; i <= end; i++) {
    caseIds.push(`${type}-${String(i).padStart(2, '0')}`)
  }
  for (const [section, data] of Object.entries(fullResult)) {
    if (typeof data === 'object' && !Array.isArray(data)) {
      subset[section] = {}
      for (const [key, val] of Object.entries(data)) {
        if (caseIds.includes(key)) {
          subset[section][key] = val
        }
      }
    }
  }
  return subset
}

// ── S1 spouse용 특별 프롬프트 (forbidden/uncertain 제외) ──
const S1_PROMPT_NOTE = `
> **S1 (spouse) 특이사항**: forbidden/uncertain은 원본이 양호(전건 고유)하므로 교체 대상에서 제외합니다.
> 교체 대상은 4종: actionAffinity hint/reaction, witnessSpeechSample, truthCategory, personalityTags
`

// ── 메인 ──
for (const sess of newSessions) {
  const folderName = `${sess.id}회차_${sess.label}`
  const dir = path.join(REWORK, folderName)
  fs.mkdirSync(dir, { recursive: true })

  if (sess.heavy) {
    // 원본 케이스 JSON 복사
    const srcDir = path.join(BASE, `Session${sess.srcSession}_전달`)
    for (let i = sess.range[0]; i <= sess.range[1]; i++) {
      const fname = `${sess.type}-${String(i).padStart(2, '0')}.json`
      const src = path.join(srcDir, fname)
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(dir, fname))
      }
    }

    // 현재 결과 발췌
    const fullResult = loadResult(sess.srcSession)
    const subset = extractCases(fullResult, sess.type, sess.range[0], sess.range[1])
    fs.writeFileSync(
      path.join(dir, `현재결과_${sess.label}.json`),
      JSON.stringify(subset, null, 2),
      'utf-8'
    )

    // 레퍼런스 복사
    const refSrc = path.join(REWORK, '레퍼런스_spouse-01.json')
    if (fs.existsSync(refSrc)) {
      fs.copyFileSync(refSrc, path.join(dir, '레퍼런스_spouse-01.json'))
    }

  } else {
    // 16회차: S1 truthPolicy 누락만
    const s1 = loadResult(1)
    const missingCases = ['spouse-05', 'spouse-07', 'spouse-08', 'spouse-10', 'spouse-11']
    const tpSubset = {}
    for (const cid of missingCases) {
      if (s1.truthPolicies?.[cid]) tpSubset[cid] = s1.truthPolicies[cid]
    }
    fs.writeFileSync(
      path.join(dir, '현재결과_spouse_truthPolicy_누락.json'),
      JSON.stringify({ truthPolicies: tpSubset }, null, 2),
      'utf-8'
    )
    // 원본 복사
    const srcDir = path.join(BASE, 'Session1_전달')
    for (const cid of missingCases) {
      const src = path.join(srcDir, `${cid}.json`)
      if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dir, `${cid}.json`))
    }
    // 레퍼런스 복사
    const refSrc = path.join(REWORK, '레퍼런스_spouse-01.json')
    if (fs.existsSync(refSrc)) {
      fs.copyFileSync(refSrc, path.join(dir, '레퍼런스_spouse-01.json'))
    }
  }

  console.log(`✓ ${folderName} 준비 완료`)
}

console.log('\n10~16회차 폴더 준비 완료!')
console.log('다음 단계: 프롬프트 생성 (_generate_prompts_v2.cjs)')
