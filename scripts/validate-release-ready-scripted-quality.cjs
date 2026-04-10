#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const manifestPath = path.join(root, 'src', 'data', 'cases', 'refined', 'manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')).refined || []

const checks = [
  { id: 'generic_side_ref', re: /\bA측\b|\bB측\b/gu },
  { id: 'bad_particle_hotspot', re: /A측가|A측와|B측가|B측와|제 아내은|제 아내이|제 남편는|제 남편가|회의을|과에는|와에는/gu },
  { id: 'scaffold_phrase', re: /한 줄로 엮어야 판단이 맞습니다|표면만 보면|결과 문장으로만 접으면|같은 시간선에 놓아야/gu },
  { id: 'analysis_tone', re: /세 갈래|결과 쪽|경위 쪽|분리해서 봐야|축으로 봐야|이 단계에서 필요한 건/gu },
]

const issues = []
for (const caseId of manifest) {
  const filePath = path.join(root, 'src', 'data', 'scriptedText', `${caseId}.json`)
  const text = fs.readFileSync(filePath, 'utf8')
  const caseIssues = []
  for (const check of checks) {
    const matches = text.match(check.re)
    if (matches?.length) {
      caseIssues.push({ check: check.id, count: matches.length })
    }
  }
  if (caseIssues.length) {
    issues.push({ caseId, issues: caseIssues })
  }
}

const report = {
  scanned: manifest.length,
  flagged: issues.length,
  cases: issues,
}
const outPath = path.join(root, 'tmp', 'release-ready-scripted-quality-report-2026-04-10.json')
fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8')
console.log(JSON.stringify({ scanned: manifest.length, flagged: issues.length, outPath }, null, 2))
