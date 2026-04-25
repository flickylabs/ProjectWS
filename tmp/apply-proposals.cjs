/* eslint-disable */
// Phase G — GPT Pro 산출물 자동 적용
// proposals-{caseId}.json items.id 매칭 → ScriptedText entry.text 교체
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const cases = ['spouse-01', 'family-01', 'friend-01']
const proposalDir = path.join(ROOT, 'gpt-pro-runs/atom-script-tone-review/input/output')
const targetDir = path.join(ROOT, 'src/data/scriptedText')

const summary = []

for (const caseId of cases) {
  const proposalFile = path.join(proposalDir, `proposals-${caseId}.json`)
  const targetFile = path.join(targetDir, `${caseId}.json`)
  if (!fs.existsSync(proposalFile)) {
    console.error(`[skip] missing proposals: ${proposalFile}`)
    continue
  }
  if (!fs.existsSync(targetFile)) {
    console.error(`[skip] missing target: ${targetFile}`)
    continue
  }

  const proposals = JSON.parse(fs.readFileSync(proposalFile, 'utf-8'))
  const data = JSON.parse(fs.readFileSync(targetFile, 'utf-8'))

  const proposalById = Object.create(null)
  for (const item of proposals.items ?? []) {
    if (item && item.id && typeof item.suggestion === 'string') {
      proposalById[item.id] = item
    }
  }
  const totalProposals = Object.keys(proposalById).length

  let applied = 0
  const seenIds = new Set()
  const sampleApplied = []

  function visit(node) {
    if (Array.isArray(node)) { for (const v of node) visit(v); return }
    if (node && typeof node === 'object') {
      if (typeof node.id === 'string' && typeof node.text === 'string' && proposalById[node.id]) {
        const prop = proposalById[node.id]
        if (!seenIds.has(node.id)) {
          if (sampleApplied.length < 3) {
            sampleApplied.push({ id: node.id, before: node.text, after: prop.suggestion })
          }
          seenIds.add(node.id)
          node.text = prop.suggestion
          applied += 1
        }
      }
      for (const v of Object.values(node)) visit(v)
    }
  }
  visit(data)

  const notFound = []
  for (const id of Object.keys(proposalById)) {
    if (!seenIds.has(id)) notFound.push(id)
  }

  fs.writeFileSync(targetFile, JSON.stringify(data, null, 2) + '\n', 'utf-8')

  summary.push({ caseId, applied, totalProposals, notFound: notFound.length, missingIds: notFound, samples: sampleApplied })
  console.log(`[${caseId}] applied=${applied}/${totalProposals}, notFound=${notFound.length}`)
  if (sampleApplied.length > 0) {
    console.log(`  sample[0]: ${sampleApplied[0].id}`)
    console.log(`    before: ${sampleApplied[0].before.slice(0, 60)}`)
    console.log(`    after : ${sampleApplied[0].after.slice(0, 60)}`)
  }
  if (notFound.length > 0) {
    console.log(`  missing ids (first 5): ${notFound.slice(0, 5).join(', ')}`)
  }
}

fs.writeFileSync(path.join(__dirname, 'apply-proposals-summary.json'), JSON.stringify(summary, null, 2), 'utf-8')
console.log('\nSummary saved to tmp/apply-proposals-summary.json')
