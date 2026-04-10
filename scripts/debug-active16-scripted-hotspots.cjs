#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const caseId = process.argv[2]
if (!caseId) {
  console.error('usage: node scripts/debug-active16-scripted-hotspots.cjs <caseId>')
  process.exit(1)
}

const filePath = path.join(root, 'src', 'data', 'scriptedText', `${caseId}.json`)
const text = fs.readFileSync(filePath, 'utf8')

const checks = [
  { name: 'bad_particle_hotspot', re: /A측가|A측와|B측가|B측와|제 아내은|제 아내이|제 남편는|제 남편가|회의을|과에는|와에는/gu },
  { name: 'analysis_tone', re: /세 갈래|결과 쪽|경위 쪽|분리해서 봐야|축으로 봐야|이 단계에서 필요한 건/gu },
]

for (const check of checks) {
  console.log(`\n[${check.name}]`)
  const matches = [...text.matchAll(check.re)]
  for (const match of matches.slice(0, 40)) {
    const idx = match.index || 0
    const start = Math.max(0, idx - 50)
    const end = Math.min(text.length, idx + 120)
    console.log(`- ${match[0]} :: ${text.slice(start, end).replace(/\\n/g, ' ')}`)
  }
  if (matches.length > 40) console.log(`... ${matches.length - 40} more`)
}
