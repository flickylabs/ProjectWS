// C3 명시 매핑 + C4 ScriptedText 폴리싱
// - C3: "안 쓰는" → "사용하지 않는" (4건, spouse-01)
// - C4: "그 정도는 확인됩니다" → "그 정도는 알 수 있습니다" (1건, family-01 witness)
//
// C3의 "일상 어휘/간접 화법 후보" 487건은 의미 분석 깊은 영역이라 본 스크립트에서 X
// (사용자 spot check + 패턴 발견 시 추가 처리)

const fs = require('fs')
const path = require('path')

const MAPPINGS = [
  // C3 — 사용자 명시 매핑
  ['안 쓰는', '사용하지 않는'],
  // C4 — 증인 발화의 시스템 톤 ("확인됩니다") → 자연 직설
  ['그 정도는 확인됩니다', '그 정도는 알 수 있습니다'],
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
const stats = { total: 0, byCase: {}, mappingHits: {} }
MAPPINGS.forEach(([b]) => stats.mappingHits[b] = 0)

for (const caseId of cases) {
  const filePath = path.resolve(__dirname, `../src/data/scriptedText/${caseId}.json`)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  let caseChanges = 0

  function walkAndPatch(o) {
    if (!o) return
    if (Array.isArray(o)) { o.forEach(walkAndPatch); return }
    if (typeof o === 'object') {
      for (const field of ['text', 'behaviorHint']) {
        if (typeof o[field] === 'string') {
          const r = transform(o[field])
          if (r.changed) {
            for (const [before] of MAPPINGS) {
              if (o[field].includes(before)) stats.mappingHits[before]++
            }
            o[field] = r.text
            caseChanges++
            stats.total++
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

console.log(JSON.stringify(stats, null, 2))
fs.writeFileSync(
  path.resolve(__dirname, 'polish-c3-c4-lexicon-result.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), stats, mappings: MAPPINGS }, null, 2),
  'utf8',
)
