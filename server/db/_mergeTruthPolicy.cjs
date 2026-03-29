/**
 * 9종 보강 데이터 통합 병합 스크립트
 * 사용법: node server/db/_mergeTruthPolicy.cjs [--batch-dir <dir>] [--rework-dir <dir>]
 *
 * 배치 폴더의 모든 JSON(Session 결과 + 재작업 결과)을 읽어서:
 *   - truthPolicies  → src/data/truthPolicy.ts
 *   - witnessBudgets → src/data/witnessBudget.ts
 *   - 나머지 7종     → src/data/caseEnrichmentData.ts
 *     (personalityTags, contentTags, truthCategory, actionAffinity,
 *      optimalPath, narrativeExpansion, witnessSpeechSample)
 *
 * 병합 우선순위: 원본 Session → 재작업 결과 (rework이 원본을 덮어씀)
 */
const fs = require('fs')
const path = require('path')

// ── 경로 설정 ──

const ROOT = path.resolve(__dirname, '../..')
const DEFAULT_BATCH_DIR = path.join(ROOT, 'docs/ref/참고용4_확인후제거요망/4회차_요청7_배치작업')
const DEFAULT_REWORK_DIR = path.join(DEFAULT_BATCH_DIR, '재작업')

const TRUTH_FILE = path.join(ROOT, 'src/data/truthPolicy.ts')
const WITNESS_FILE = path.join(ROOT, 'src/data/witnessBudget.ts')
const ENRICHMENT_FILE = path.join(ROOT, 'src/data/caseEnrichmentData.ts')

// CLI 인자 파싱
const args = process.argv.slice(2)
function getArg(name) {
  const idx = args.indexOf(name)
  return idx >= 0 && idx + 1 < args.length ? args[idx + 1] : null
}

const BATCH_DIR = getArg('--batch-dir') || DEFAULT_BATCH_DIR
const REWORK_DIR = getArg('--rework-dir') || DEFAULT_REWORK_DIR

// ── 9종 데이터 키 ──

const ALL_ENRICHMENT_KEYS = [
  'truthPolicies',
  'witnessBudgets',
  'personalityTags',
  'contentTags',
  'truthCategory',
  'actionAffinity',
  'optimalPath',
  'narrativeExpansion',
  'witnessSpeechSample',
]

// caseEnrichmentData.ts에 들어갈 7종 (truthPolicies, witnessBudgets 제외)
const ENRICHMENT_ONLY_KEYS = ALL_ENRICHMENT_KEYS.filter(
  k => k !== 'truthPolicies' && k !== 'witnessBudgets'
)

// ── 유틸 ──

function tryParseJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (e) {
    console.warn(`  [WARN] JSON 파싱 실패: ${filePath} — ${e.message}`)
    return null
  }
}

/** 배치 형식인지 확인 (최소 1개의 9종 키가 있으면 배치) */
function isBatchFormat(obj) {
  if (!obj || typeof obj !== 'object') return false
  return ALL_ENRICHMENT_KEYS.some(k => k in obj)
}

/**
 * 하위 단위 깊은 병합 (caseId 레벨까지)
 * batch[section][caseId] = value 형태를 merged[section][caseId]에 덮어씀
 */
function deepMergeBatch(target, source) {
  for (const section of ALL_ENRICHMENT_KEYS) {
    if (!source[section]) continue
    if (!target[section]) target[section] = {}
    for (const [caseId, val] of Object.entries(source[section])) {
      target[section][caseId] = val
    }
  }
}

// ── 1단계: 원본 Session 결과 수집 ──

console.log('=== 1단계: 원본 Session 결과 수집 ===')

const merged = {}
ALL_ENRICHMENT_KEYS.forEach(k => { merged[k] = {} })

// Session*_결과 폴더 탐색
const sessionDirs = fs.readdirSync(BATCH_DIR)
  .filter(d => /^Session\d+_결과$/.test(d))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0])
    const numB = parseInt(b.match(/\d+/)[0])
    return numA - numB
  })

let originalCount = 0
for (const dir of sessionDirs) {
  const fullDir = path.join(BATCH_DIR, dir)
  const stat = fs.statSync(fullDir)
  if (!stat.isDirectory()) continue

  const jsonFiles = fs.readdirSync(fullDir).filter(f => f.endsWith('.json'))
  for (const file of jsonFiles) {
    const data = tryParseJson(path.join(fullDir, file))
    if (!data || !isBatchFormat(data)) continue

    deepMergeBatch(merged, data)
    originalCount++
    console.log(`  [원본] ${dir}/${file}`)
  }
}

console.log(`  원본 파일 ${originalCount}개 처리 완료`)

// 각 섹션의 케이스 수 집계
for (const key of ALL_ENRICHMENT_KEYS) {
  const count = Object.keys(merged[key] || {}).length
  if (count > 0) console.log(`    ${key}: ${count}건`)
}

// ── 2단계: 재작업 결과 덮어쓰기 ──

console.log('\n=== 2단계: 재작업 결과 병합 ===')

let reworkCount = 0

if (fs.existsSync(REWORK_DIR)) {
  const reworkDirs = fs.readdirSync(REWORK_DIR)
    .filter(d => {
      const full = path.join(REWORK_DIR, d)
      return fs.statSync(full).isDirectory() && !d.startsWith('_')
    })
    .sort((a, b) => {
      // 숫자 회차 기준 정렬
      const numA = parseInt(a.match(/^(\d+)/)?.[1] || '999')
      const numB = parseInt(b.match(/^(\d+)/)?.[1] || '999')
      return numA - numB
    })

  for (const dir of reworkDirs) {
    const fullDir = path.join(REWORK_DIR, dir)
    // 재작업 결과 파일 탐색: '재작업결과_*.json' 또는 '*_result.json'
    const jsonFiles = fs.readdirSync(fullDir).filter(f => f.endsWith('.json'))

    // 우선순위: 재작업결과 > redo_result 파일 (현재결과/레퍼런스/validation 제외)
    const reworkFiles = jsonFiles.filter(f =>
      f.includes('재작업결과') || f.includes('_result.')
    )

    if (reworkFiles.length > 0) {
      for (const file of reworkFiles) {
        const data = tryParseJson(path.join(fullDir, file))
        if (!data || !isBatchFormat(data)) continue

        deepMergeBatch(merged, data)
        reworkCount++
        console.log(`  [재작업] ${dir}/${file}`)
      }
    }
    // 현재결과 파일은 원본 Session에서 이미 수집된 것의 부분집합이므로 무시
  }
}

console.log(`  재작업 파일 ${reworkCount}개 처리 완료`)

// 최종 집계
console.log('\n=== 최종 집계 ===')
for (const key of ALL_ENRICHMENT_KEYS) {
  const count = Object.keys(merged[key] || {}).length
  if (count > 0) console.log(`  ${key}: ${count}건`)
}

// ── 3단계: truthPolicy.ts 생성 ──

console.log('\n=== 3단계: truthPolicy.ts 생성 ===')

const truthPolicies = merged.truthPolicies || {}

// states_full만 추출 (TRUTH_POLICIES 형식)
const tpData = {}
for (const [caseKey, parties] of Object.entries(truthPolicies)) {
  tpData[caseKey] = {}
  for (const [party, disputes] of Object.entries(parties)) {
    tpData[caseKey][party] = {}
    for (const [dId, d] of Object.entries(disputes)) {
      tpData[caseKey][party][dId] = d.states_full || d
    }
  }
}

let tpOut = `/**\n * 사건별 진실 공개 정책 (truthPolicy)\n * 자동 생성 — ${Object.keys(tpData).length}개 사건\n */\n\n`
tpOut += `export interface TruthPolicyEntry {\n  allowed: string[]\n  forbidden: string[]\n}\n\n`
tpOut += `export type LieStateKey = "S0" | "S1" | "S2" | "S3" | "S4" | "S5"\n\n`
tpOut += `export const TRUTH_POLICIES: Record<string, Record<string, Record<string, Record<LieStateKey, TruthPolicyEntry>>>> = ${JSON.stringify(tpData, null, 2)}\n\n`
tpOut += `export function getFallbackPolicy(\n  allTruthIds: string[],\n  anchorTruthIds: string[],\n  lieState: LieStateKey,\n): TruthPolicyEntry {\n`
tpOut += `  const stateNum = parseInt(lieState.slice(1))\n`
tpOut += `  if (stateNum <= 1) return { allowed: [], forbidden: [...allTruthIds] }\n`
tpOut += `  if (stateNum <= 3) return { allowed: allTruthIds.filter(id => !anchorTruthIds.includes(id)), forbidden: [...anchorTruthIds] }\n`
tpOut += `  if (stateNum === 4) return { allowed: allTruthIds.filter(id => !anchorTruthIds.includes(id)), forbidden: [...anchorTruthIds] }\n`
tpOut += `  return { allowed: [...allTruthIds], forbidden: [] }\n`
tpOut += `}\n`

fs.writeFileSync(TRUTH_FILE, tpOut, 'utf-8')
console.log(`Written: ${TRUTH_FILE} (${Object.keys(tpData).length}건)`)

// ── 4단계: witnessBudget.ts 생성 ──

console.log('\n=== 4단계: witnessBudget.ts 생성 ===')

const witnessBudgets = merged.witnessBudgets || {}

let wbOut = `/**\n * 증인별 증언 범위 예산 (witnessBudget)\n * 자동 생성 — ${Object.keys(witnessBudgets).length}개 사건\n */\n\n`
wbOut += `export interface WitnessBudgetEntry {\n  canState: string[]\n  uncertain: string[]\n  forbidden: string[]\n}\n\n`
wbOut += `export const WITNESS_BUDGETS: Record<string, Record<string, WitnessBudgetEntry>> = ${JSON.stringify(witnessBudgets, null, 2)}\n`

fs.writeFileSync(WITNESS_FILE, wbOut, 'utf-8')
console.log(`Written: ${WITNESS_FILE} (${Object.keys(witnessBudgets).length}건)`)

// ── 5단계: caseEnrichmentData.ts 생성 ──

console.log('\n=== 5단계: caseEnrichmentData.ts 생성 ===')

// caseId 단위로 7종 데이터를 CaseEnrichment 구조로 재편
// 모든 7종에서 등장하는 caseId를 수집
const allCaseIds = new Set()
for (const key of ENRICHMENT_ONLY_KEYS) {
  if (merged[key]) {
    Object.keys(merged[key]).forEach(id => allCaseIds.add(id))
  }
}

const enrichmentByCaseId = {}
for (const caseId of [...allCaseIds].sort()) {
  const entry = {}

  // personalityTags: { a: [...], b: [...] }
  if (merged.personalityTags?.[caseId]) {
    entry.personalityTags = merged.personalityTags[caseId]
  }

  // contentTags: { "d-1": [...], ... }
  if (merged.contentTags?.[caseId]) {
    entry.contentTags = merged.contentTags[caseId]
  }

  // truthCategory: { "t-1": "core_fact", ... }
  if (merged.truthCategory?.[caseId]) {
    entry.truthCategory = merged.truthCategory[caseId]
  }

  // actionAffinity: { "d-1": { bestAction, worstAction, actionScores, ... } }
  if (merged.actionAffinity?.[caseId]) {
    entry.actionAffinity = merged.actionAffinity[caseId]
  }

  // optimalPath: { "d-1": { requiredActions, bonusActions, ... } }
  if (merged.optimalPath?.[caseId]) {
    entry.optimalPath = merged.optimalPath[caseId]
  }

  // narrativeExpansion: { "d-3": { category, deeperReveal, unlockHint, impactDisputes } }
  if (merged.narrativeExpansion?.[caseId]) {
    entry.narrativeExpansion = merged.narrativeExpansion[caseId]
  }

  // witnessSpeechSample: { "tp-1": [...], ... }
  if (merged.witnessSpeechSample?.[caseId]) {
    entry.witnessSpeechSample = merged.witnessSpeechSample[caseId]
  }

  if (Object.keys(entry).length > 0) {
    enrichmentByCaseId[caseId] = entry
  }
}

// 통계 출력
const enrichmentStats = {}
for (const key of ENRICHMENT_ONLY_KEYS) {
  enrichmentStats[key] = 0
}
for (const entry of Object.values(enrichmentByCaseId)) {
  for (const key of ENRICHMENT_ONLY_KEYS) {
    if (entry[key]) enrichmentStats[key]++
  }
}

console.log(`  총 ${Object.keys(enrichmentByCaseId).length}건 사건 보강 데이터:`)
for (const [key, count] of Object.entries(enrichmentStats)) {
  console.log(`    ${key}: ${count}건`)
}

// TypeScript 파일 생성
let enOut = `/**\n`
enOut += ` * 사건 보강 데이터 (7종)\n`
enOut += ` * 자동 생성 — ${Object.keys(enrichmentByCaseId).length}개 사건\n`
enOut += ` *\n`
enOut += ` * 포함 데이터:\n`
enOut += ` *   personalityTags, contentTags, truthCategory,\n`
enOut += ` *   actionAffinity, optimalPath, narrativeExpansion, witnessSpeechSample\n`
enOut += ` *\n`
enOut += ` * 사용법:\n`
enOut += ` *   import { CASE_ENRICHMENT_DATA } from './caseEnrichmentData'\n`
enOut += ` *   import { registerAllEnrichments } from './caseEnrichment'\n`
enOut += ` *   registerAllEnrichments(CASE_ENRICHMENT_DATA)\n`
enOut += ` */\n\n`
enOut += `import type { CaseEnrichment } from './caseEnrichment'\n\n`
enOut += `export const CASE_ENRICHMENT_DATA: Record<string, CaseEnrichment> = ${JSON.stringify(enrichmentByCaseId, null, 2)}\n`

fs.writeFileSync(ENRICHMENT_FILE, enOut, 'utf-8')
console.log(`\nWritten: ${ENRICHMENT_FILE}`)

// ── 완료 ──

console.log('\n=== 완료 ===')
console.log(`  truthPolicy.ts      : ${Object.keys(tpData).length}건`)
console.log(`  witnessBudget.ts    : ${Object.keys(witnessBudgets).length}건`)
console.log(`  caseEnrichmentData.ts: ${Object.keys(enrichmentByCaseId).length}건 (7종)`)
console.log('\nRun `npx tsc --noEmit` to verify.')
