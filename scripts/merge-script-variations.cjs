/**
 * GPT Pro 변주 세트를 기존 scriptedText 번들에 병합
 * Usage: node scripts/merge-script-variations.cjs spouse-01
 */
const fs = require('fs')
const path = require('path')

const caseId = process.argv[2]
if (!caseId) {
  console.error('Usage: node scripts/merge-script-variations.cjs <caseId>')
  process.exit(1)
}

const bundlePath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', `${caseId}.json`)
const variationPath = path.join(__dirname, '..', 'src', 'data', 'scriptVariations', `${caseId}.json`)

if (!fs.existsSync(bundlePath)) {
  console.error(`Bundle not found: ${bundlePath}`)
  process.exit(1)
}
if (!fs.existsSync(variationPath)) {
  console.error(`Variation set not found: ${variationPath}`)
  process.exit(1)
}

const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf-8'))
const variations = JSON.parse(fs.readFileSync(variationPath, 'utf-8'))

const scripts = variations.scripts
const patterns = variations.patterns

let added = 0
let skipped = 0

for (const [fullKey, script] of Object.entries(scripts)) {
  // fullKey: "a:d-1:S0:fact_pursuit:hard:v1"
  const parts = fullKey.split(':')
  const variantId = parts.pop() // "v1"
  const baseKey = parts.join(':') // "a:d-1:S0:fact_pursuit:hard"

  // 기존 번들에서 해당 baseKey 엔트리 찾기
  const channel = bundle.channels?.interrogation
  if (!channel) continue

  let entry = channel.entries.find(e => e.key === baseKey)

  if (!entry) {
    // 새 엔트리 생성
    const [party, disputeId, lieState, questionType, tone] = parts
    entry = {
      key: baseKey,
      party,
      disputeId,
      lieState,
      questionType,
      tone: tone || 'mid',
      variants: [],
    }
    channel.entries.push(entry)
  }

  // 중복 체크
  const existing = entry.variants.find(v => v.id === variantId)
  if (existing) {
    skipped++
    continue
  }

  const patternInfo = patterns[variantId]
  entry.variants.push({
    id: variantId,
    text: script.text,
    behaviorHint: patternInfo ? patternInfo.name : '',
    tags: [variantId, patternInfo?.name || ''].filter(Boolean),
  })
  added++
}

fs.writeFileSync(bundlePath, JSON.stringify(bundle, null, 2), 'utf-8')
console.log(`Merged ${added} variants into ${bundlePath} (${skipped} duplicates skipped)`)
