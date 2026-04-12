const fs = require('fs')
const path = require('path')

const warningsPath = path.join(__dirname, 'spouse01-warnings.txt')
const bundlePath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-01.json')

const input = fs.readFileSync(warningsPath, 'utf8')
const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'))
const entryMap = new Map((bundle.channels?.interrogation?.entries || []).map((entry) => [entry.key, entry]))
const keys = [...new Set([...input.matchAll(/interrogation \/ ([^ ]+) \/ /g)].map((match) => match[1]))]

console.log(`warning groups ${keys.length}`)
for (const key of keys) {
  const entry = entryMap.get(key)
  if (!entry) continue
  console.log(`\n## ${key} [${entry.stanceHint}/${entry.truthLevel}]`)
  for (const variant of entry.variants || []) {
    console.log(`${variant.id}: ${variant.text}`)
  }
}
