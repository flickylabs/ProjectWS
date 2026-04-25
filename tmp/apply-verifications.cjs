/* eslint-disable */
// Phase G-2 — 검증 에이전트 결과 적용 (12건 재정정)
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const verification = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/verification-result.json'), 'utf-8'))

const byCase = {}
for (const c of verification.concerns) {
  if (!c.improvedText) continue
  byCase[c.caseId] ??= []
  byCase[c.caseId].push({ id: c.id, improvedText: c.improvedText })
}

let totalApplied = 0
const summary = []
for (const [caseId, items] of Object.entries(byCase)) {
  const targetFile = path.join(ROOT, `src/data/scriptedText/${caseId}.json`)
  const data = JSON.parse(fs.readFileSync(targetFile, 'utf-8'))

  const map = Object.create(null)
  for (const it of items) map[it.id] = it.improvedText

  let applied = 0
  const seen = new Set()
  function visit(node) {
    if (Array.isArray(node)) { node.forEach(visit); return }
    if (node && typeof node === 'object') {
      if (typeof node.id === 'string' && typeof node.text === 'string' && map[node.id] && !seen.has(node.id)) {
        node.text = map[node.id]
        seen.add(node.id)
        applied++
      }
      for (const v of Object.values(node)) visit(v)
    }
  }
  visit(data)

  fs.writeFileSync(targetFile, JSON.stringify(data, null, 2) + '\n', 'utf-8')
  totalApplied += applied
  summary.push({ caseId, applied, requested: items.length, missing: items.length - applied })
  console.log(`[${caseId}] verification applied=${applied}/${items.length}`)
}
console.log(`\nTotal: ${totalApplied} verifications applied`)
fs.writeFileSync(path.join(__dirname, 'apply-verifications-summary.json'), JSON.stringify(summary, null, 2), 'utf-8')
