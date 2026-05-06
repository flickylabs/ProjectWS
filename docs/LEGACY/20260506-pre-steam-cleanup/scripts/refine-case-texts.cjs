/**
 * 사건 JSON 텍스트 정제 파이프라인
 *
 * 단계:
 * 1. extract  — JSON에서 텍스트 필드만 추출 → _texts.json 생성
 * 2. (Claude가 _texts.json을 다듬음)
 * 3. apply    — 다듬어진 _texts.json을 원본 JSON에 삽입
 *
 * 사용법:
 *   node scripts/refine-case-texts.js extract spouse-01
 *   node scripts/refine-case-texts.js apply spouse-01
 *   node scripts/refine-case-texts.js extract-all
 *   node scripts/refine-case-texts.js status
 */

const fs = require('fs')
const path = require('path')

const CASES_DIR = path.join(__dirname, '..', 'src', 'data', 'cases', 'generated')
const TEXTS_DIR = path.join(__dirname, '..', 'src', 'data', 'cases', 'refined')

// 추출할 텍스트 필드 정의
const TEXT_FIELDS = [
  // meta
  { path: 'meta.anchorTruth', label: '앵커 진실' },
  { path: 'meta.emotionalBait', label: '감정 미끼' },
  { path: 'meta.resolutionDilemma', label: '해결 딜레마' },
  // duo
  { path: 'duo.partyA.speechStyle', label: 'A 말투' },
  { path: 'duo.partyA.fear', label: 'A 두려움' },
  { path: 'duo.partyB.speechStyle', label: 'B 말투' },
  { path: 'duo.partyB.fear', label: 'B 두려움' },
  // context
  { path: 'context.description', label: '배경 설명' },
  { path: 'context.triggerAmplifier', label: '촉발 요인' },
]

// 배열 필드
const ARRAY_TEXT_FIELDS = [
  { basePath: 'duo.partyA.verbalTells', field: 'pattern', label: 'A 말버릇' },
  { basePath: 'duo.partyB.verbalTells', field: 'pattern', label: 'B 말버릇' },
  { basePath: 'duo.relationshipLedger', field: 'description', label: '과거 이력' },
  { basePath: 'duo.socialGraph', field: 'knowledgeScope', label: '제3자 정보' },
  { basePath: 'disputes', field: 'name', label: '쟁점명' },
  { basePath: 'disputes', field: 'truthDescription', label: '쟁점 진실' },
  { basePath: 'evidence', field: 'description', label: '증거 설명' },
]

// investigationResults (6개씩)
const IR_KEYS = ['request_original', 'check_metadata', 'restore_context', 'verify_source', 'check_edits', 'question_acquisition']
const IR_LABELS = { request_original: '원본 확인', check_metadata: '메타데이터', restore_context: '맥락 복원', verify_source: '출처 검증', check_edits: '편집 확인', question_acquisition: '취득 경위' }

function getNestedValue(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj)
}

function setNestedValue(obj, path, value) {
  const keys = path.split('.')
  const last = keys.pop()
  const target = keys.reduce((o, k) => o[k], obj)
  target[last] = value
}

function extractTexts(caseData) {
  const texts = { caseId: caseData.caseId, fields: {}, arrays: {}, investigationResults: {} }

  // 단일 필드
  for (const { path, label } of TEXT_FIELDS) {
    const value = getNestedValue(caseData, path)
    if (value) texts.fields[path] = { label, original: value, refined: value }
  }

  // 배열 필드
  for (const { basePath, field, label } of ARRAY_TEXT_FIELDS) {
    const arr = getNestedValue(caseData, basePath)
    if (!arr || !Array.isArray(arr)) continue
    texts.arrays[basePath + '.' + field] = arr.map((item, i) => ({
      label: `${label} [${i}]`,
      id: item.id || `${i}`,
      original: item[field] || '',
      refined: item[field] || '',
    }))
  }

  // investigationResults
  const evidence = caseData.evidence || []
  for (const ev of evidence) {
    if (!ev.investigationResults) continue
    const irTexts = {}
    for (const key of IR_KEYS) {
      if (ev.investigationResults[key]) {
        irTexts[key] = {
          label: IR_LABELS[key],
          original: ev.investigationResults[key],
          refined: ev.investigationResults[key],
        }
      }
    }
    if (Object.keys(irTexts).length > 0) {
      texts.investigationResults[ev.id] = { name: ev.name, items: irTexts }
    }
  }

  return texts
}

function applyTexts(caseData, texts) {
  const result = JSON.parse(JSON.stringify(caseData)) // deep clone

  // 단일 필드
  for (const [path, { refined }] of Object.entries(texts.fields)) {
    if (refined) setNestedValue(result, path, refined)
  }

  // 배열 필드
  for (const [key, items] of Object.entries(texts.arrays)) {
    const parts = key.split('.')
    const field = parts.pop()
    const basePath = parts.join('.')
    const arr = getNestedValue(result, basePath)
    if (!arr) continue
    for (let i = 0; i < items.length && i < arr.length; i++) {
      if (items[i].refined) arr[i][field] = items[i].refined
    }
  }

  // investigationResults
  for (const [evId, { items }] of Object.entries(texts.investigationResults)) {
    const ev = result.evidence?.find(e => e.id === evId)
    if (!ev || !ev.investigationResults) continue
    for (const [key, { refined }] of Object.entries(items)) {
      if (refined) ev.investigationResults[key] = refined
    }
  }

  return result
}

// CLI
const [,, command, caseArg] = process.argv

if (!fs.existsSync(TEXTS_DIR)) fs.mkdirSync(TEXTS_DIR, { recursive: true })

switch (command) {
  case 'extract': {
    if (!caseArg) { console.error('Usage: node refine-case-texts.js extract <case-name>'); process.exit(1) }
    const jsonPath = path.join(CASES_DIR, `${caseArg}.json`)
    if (!fs.existsSync(jsonPath)) { console.error(`파일 없음: ${jsonPath}`); process.exit(1) }
    const caseData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    const texts = extractTexts(caseData)
    const outPath = path.join(TEXTS_DIR, `${caseArg}_texts.json`)
    fs.writeFileSync(outPath, JSON.stringify(texts, null, 2), 'utf8')
    const fieldCount = Object.keys(texts.fields).length
    const arrayCount = Object.values(texts.arrays).reduce((s, a) => s + a.length, 0)
    const irCount = Object.values(texts.investigationResults).reduce((s, e) => s + Object.keys(e.items).length, 0)
    console.log(`✓ 추출 완료: ${outPath}`)
    console.log(`  단일 필드 ${fieldCount}개 + 배열 필드 ${arrayCount}개 + 조사결과 ${irCount}개 = 총 ${fieldCount + arrayCount + irCount}개 텍스트`)
    break
  }

  case 'apply': {
    if (!caseArg) { console.error('Usage: node refine-case-texts.js apply <case-name>'); process.exit(1) }
    const jsonPath = path.join(CASES_DIR, `${caseArg}.json`)
    const textsPath = path.join(TEXTS_DIR, `${caseArg}_texts.json`)
    if (!fs.existsSync(textsPath)) { console.error(`다듬어진 텍스트 없음: ${textsPath}`); process.exit(1) }
    const caseData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    const texts = JSON.parse(fs.readFileSync(textsPath, 'utf8'))
    const refined = applyTexts(caseData, texts)
    // 백업
    const backupPath = path.join(TEXTS_DIR, `${caseArg}_backup.json`)
    fs.writeFileSync(backupPath, JSON.stringify(caseData, null, 2), 'utf8')
    // 적용
    fs.writeFileSync(jsonPath, JSON.stringify(refined, null, 2), 'utf8')
    // manifest 업데이트
    const manifestPath = path.join(TEXTS_DIR, 'manifest.json')
    const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : { refined: [] }
    if (!manifest.refined.includes(caseArg)) {
      manifest.refined.push(caseArg)
      manifest.refined.sort()
    }
    manifest.lastUpdated = new Date().toISOString().slice(0, 10)
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')
    console.log(`✓ 적용 완료: ${jsonPath}`)
    console.log(`  백업: ${backupPath}`)
    console.log(`  manifest: ${manifest.refined.length}개 정제 완료`)
    break
  }

  case 'extract-all': {
    const files = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.json'))
    for (const file of files) {
      const name = file.replace('.json', '')
      const caseData = JSON.parse(fs.readFileSync(path.join(CASES_DIR, file), 'utf8'))
      const texts = extractTexts(caseData)
      fs.writeFileSync(path.join(TEXTS_DIR, `${name}_texts.json`), JSON.stringify(texts, null, 2), 'utf8')
      const total = Object.keys(texts.fields).length
        + Object.values(texts.arrays).reduce((s, a) => s + a.length, 0)
        + Object.values(texts.investigationResults).reduce((s, e) => s + Object.keys(e.items).length, 0)
      console.log(`✓ ${name}: ${total}개 텍스트`)
    }
    break
  }

  case 'status': {
    const caseFiles = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.json'))
    const textFiles = fs.existsSync(TEXTS_DIR) ? fs.readdirSync(TEXTS_DIR).filter(f => f.endsWith('_texts.json')) : []
    console.log(`\n사건 파일: ${caseFiles.length}개`)
    console.log(`추출 완료: ${textFiles.length}개`)
    console.log(`\n상태:`)
    for (const file of caseFiles) {
      const name = file.replace('.json', '')
      const hasTexts = textFiles.includes(`${name}_texts.json`)
      console.log(`  ${hasTexts ? '✓' : '·'} ${name}`)
    }
    break
  }

  default:
    console.log(`
사건 JSON 텍스트 정제 도구

사용법:
  node scripts/refine-case-texts.js extract <case-name>    텍스트 추출
  node scripts/refine-case-texts.js apply <case-name>      다듬은 텍스트 적용
  node scripts/refine-case-texts.js extract-all            전체 추출
  node scripts/refine-case-texts.js status                 현황 확인
`)
}
