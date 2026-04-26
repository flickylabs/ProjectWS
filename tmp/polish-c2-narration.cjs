// C2 묘사 자연체 폴리싱 — claude-polish-candidates-v5.json 기반
// 변환 매핑 3종을 ScriptedText 3 사건에 globalReplace로 적용.
// 적용 대상: variantKey 메타로 검증 후 일치 entries만 변환.

const fs = require('fs')
const path = require('path')

const CANDIDATES = require('../tmp/codex-recovery-v5/claude-polish-candidates-v5.json')
const candidates = (Array.isArray(CANDIDATES) ? CANDIDATES : CANDIDATES.candidates)
  .filter((c) => c.caseId && c.categoryFlag === 'C2_narration_naturalness')

// 변환 매핑 (사용자 모범 기반)
const MAPPINGS = [
  ['정리된 어투로 피해자 위치를 세우지만 손끝이 굳는다', '본인이 피해자 입장이라는 것을 내세우지만 손끝이 흔들린다'],
  ['상처받은 위치를 세우되', '상처받은 입장을 내세우되'],
  ['마지막 단어를 작게 줄인다', '말 끝을 흐린다'],
]

function transform(text) {
  if (!text || typeof text !== 'string') return { changed: false, text }
  let out = text
  let changed = false
  for (const [before, after] of MAPPINGS) {
    if (out.includes(before)) {
      out = out.split(before).join(after)
      changed = true
    }
  }
  return { changed, text: out }
}

const cases = ['spouse-01', 'family-01', 'friend-01']
const stats = { total: 0, changedEntries: 0, byCase: {}, byField: {}, mappingHits: {} }
MAPPINGS.forEach(([b]) => stats.mappingHits[b] = 0)

for (const caseId of cases) {
  const filePath = path.resolve(__dirname, `../src/data/scriptedText/${caseId}.json`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(raw)
  let caseChanges = 0

  function walkAndPatch(o) {
    if (!o) return
    if (Array.isArray(o)) { o.forEach(walkAndPatch); return }
    if (typeof o === 'object') {
      // text / behaviorHint 필드 변환
      for (const field of ['text', 'behaviorHint']) {
        if (typeof o[field] === 'string') {
          const r = transform(o[field])
          if (r.changed) {
            // 어느 매핑이 hit했는지 tally
            for (const [before] of MAPPINGS) {
              if (o[field].includes(before)) stats.mappingHits[before]++
            }
            o[field] = r.text
            caseChanges++
            stats.changedEntries++
            stats.byField[field] = (stats.byField[field] || 0) + 1
          }
        }
      }
      for (const k of Object.keys(o)) walkAndPatch(o[k])
    }
  }
  walkAndPatch(data)
  stats.byCase[caseId] = caseChanges
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

stats.total = stats.changedEntries
stats.candidatesCount = candidates.length

console.log(JSON.stringify(stats, null, 2))
fs.writeFileSync(
  path.resolve(__dirname, 'polish-c2-narration-result.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), stats, mappings: MAPPINGS }, null, 2),
  'utf8',
)
