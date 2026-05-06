/**
 * 재작업 폴더 준비 스크립트
 * - 기존 결과에서 6건씩 분할 추출
 * - 원본 케이스 JSON 복사
 * - 회차별 프롬프트 생성
 */
const fs = require('fs')
const path = require('path')

const BASE = path.join(__dirname, '..')
const REWORK = path.join(BASE, '재작업')

// ── 세션 정의 ──
const sessions = [
  { id: 1, label: 'workplace_01to06', srcSession: 4, type: 'workplace', range: [1, 6], heavy: true },
  { id: 2, label: 'workplace_07to12', srcSession: 4, type: 'workplace', range: [7, 12], heavy: true },
  { id: 3, label: 'neighbor_01to06', srcSession: 5, type: 'neighbor', range: [1, 6], heavy: true },
  { id: 4, label: 'neighbor_07to12', srcSession: 5, type: 'neighbor', range: [7, 12], heavy: true },
  { id: 5, label: 'partnership_01to06', srcSession: 6, type: 'partnership', range: [1, 6], heavy: true },
  { id: 6, label: 'partnership_07to12', srcSession: 6, type: 'partnership', range: [7, 12], heavy: true },
  { id: 7, label: 'tenant_01to06', srcSession: 7, type: 'tenant', range: [1, 6], heavy: true },
  { id: 8, label: 'tenant_07to12', srcSession: 7, type: 'tenant', range: [7, 12], heavy: true },
  { id: 9, label: 'S1toS3_truthCategory_및_S1누락', srcSession: null, type: null, range: null, heavy: false },
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

// ── 메인 ──
for (const sess of sessions) {
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
  } else {
    // 9회차: S1~S3 truthCategory + S1 truthPolicy 누락
    // truthCategory 발췌
    for (const [sn, type] of [[1, 'spouse'], [2, 'family'], [3, 'friend']]) {
      const full = loadResult(sn)
      const tc = { truthCategory: full.truthCategory || {} }
      fs.writeFileSync(
        path.join(dir, `현재결과_${type}_truthCategory.json`),
        JSON.stringify(tc, null, 2),
        'utf-8'
      )
    }
    // S1 truthPolicy에서 누락 케이스 발췌
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
    // 누락 케이스 원본 복사
    const srcDir = path.join(BASE, 'Session1_전달')
    for (const cid of missingCases) {
      const src = path.join(srcDir, `${cid}.json`)
      if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dir, `${cid}.json`))
    }
  }

  console.log(`✓ ${folderName} 준비 완료`)
}

console.log('\n모든 폴더 준비 완료!')
