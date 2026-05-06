#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CASE_DIR = path.join(ROOT, 'src', 'data', 'cases', 'generated')
const SCRIPTED_DIR = path.join(ROOT, 'src', 'data', 'scriptedText')
const DOCS_REF_DIR = path.join(ROOT, 'docs', 'ref')
const OUT_JSON = path.join(ROOT, 'docs', 'ref', 'scripted-text', '84-scripted-text-input-inventory.json')
const OUT_MD = path.join(ROOT, 'docs', 'ref', 'scripted-text', '84-scripted-text-input-inventory.md')

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      walk(full, files)
    } else {
      files.push(full)
    }
  }
  return files
}

function toPosix(value) {
  return value.replace(/\\/g, '/')
}

function rel(value) {
  return toPosix(path.relative(ROOT, value))
}

function byBasename(files, target) {
  return files.find((file) => path.basename(file) === target) || null
}

function buildRecord(caseId, refFiles) {
  const scriptedPath = path.join(SCRIPTED_DIR, `${caseId}.json`)
  const casePath = path.join(CASE_DIR, `${caseId}.json`)
  const v3GameLoop = byBasename(refFiles, `${caseId}-v3-game-loop-data.json`)
  const dossier = byBasename(refFiles, `dossier-${caseId}.json`)
  const evidence = byBasename(refFiles, `evidence-${caseId}.json`)

  return {
    caseId,
    category: caseId.split('-')[0],
    caseJson: fs.existsSync(casePath) ? rel(casePath) : null,
    scriptedText: fs.existsSync(scriptedPath) ? rel(scriptedPath) : null,
    v3GameLoop: v3GameLoop ? rel(v3GameLoop) : null,
    dossierJson: dossier ? rel(dossier) : null,
    evidenceJson: evidence ? rel(evidence) : null,
  }
}

function renderMarkdown(records) {
  const lines = [
    '# 84 Scripted Text Input Inventory',
    '',
    `Updated: ${new Date().toISOString()}`,
    '',
    `- Cases: ${records.length}`,
    `- Existing scripted bundles: ${records.filter((record) => record.scriptedText).length}`,
    `- V3 game loop JSON found: ${records.filter((record) => record.v3GameLoop).length}`,
    `- Dossier JSON found: ${records.filter((record) => record.dossierJson).length}`,
    `- Evidence JSON found: ${records.filter((record) => record.evidenceJson).length}`,
    '',
    '| Case | Scripted | V3 | Dossier | Evidence |',
    '| --- | --- | --- | --- | --- |',
  ]

  for (const record of records) {
    lines.push(`| ${record.caseId} | ${record.scriptedText ? 'yes' : 'no'} | ${record.v3GameLoop ? 'yes' : 'no'} | ${record.dossierJson ? 'yes' : 'no'} | ${record.evidenceJson ? 'yes' : 'no'} |`)
  }

  const missingDossier = records.filter((record) => !record.dossierJson).map((record) => record.caseId)
  const missingEvidence = records.filter((record) => !record.evidenceJson).map((record) => record.caseId)

  lines.push('')
  lines.push('## Gaps')
  lines.push('')
  lines.push(`- Missing dossier JSON: ${missingDossier.length ? missingDossier.join(', ') : 'none'}`)
  lines.push(`- Missing evidence JSON: ${missingEvidence.length ? missingEvidence.join(', ') : 'none'}`)

  return `${lines.join('\n')}\n`
}

function main() {
  const refFiles = walk(DOCS_REF_DIR)
  const records = fs
    .readdirSync(CASE_DIR)
    .filter((name) => name.endsWith('.json'))
    .map((name) => name.replace(/\.json$/u, ''))
    .sort()
    .map((caseId) => buildRecord(caseId, refFiles))

  fs.writeFileSync(OUT_JSON, `${JSON.stringify(records, null, 2)}\n`, 'utf8')
  fs.writeFileSync(OUT_MD, renderMarkdown(records), 'utf8')

  console.log(`[inventory-scripted-text-inputs] cases=${records.length}`)
  console.log(`[inventory-scripted-text-inputs] scripted=${records.filter((record) => record.scriptedText).length}`)
  console.log(`[inventory-scripted-text-inputs] v3=${records.filter((record) => record.v3GameLoop).length}`)
  console.log(`[inventory-scripted-text-inputs] dossier=${records.filter((record) => record.dossierJson).length}`)
  console.log(`[inventory-scripted-text-inputs] evidence=${records.filter((record) => record.evidenceJson).length}`)
}

main()
