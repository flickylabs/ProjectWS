#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR = __dirname
const CASE_IDS = ['spouse-01', 'family-01', 'friend-01']
const TARGET_REL = Object.fromEntries(
  CASE_IDS.map((caseId) => [caseId, `src/data/scriptedText/${caseId}.json`]),
)
const STRICT_CHANNELS = new Set([
  'judge_question',
  'judge_contradiction',
  'judge_evidence_combo',
  'judge_witness_summon',
  'system_message',
  'mediation',
  'evidence_discovery',
])

const REPLACEMENTS = [
  [/균그쪽/g, '균형'],
  [/해지 서류을/g, '해지 서류를'],
  [/해지 서류은/g, '해지 서류는'],
  [/해지 서류과/g, '해지 서류와'],
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function entryKey(entry) {
  return entry.key || entry.id || entry.disputeId || entry.dossierCardId || entry.witnessId || 'entry'
}

function variantKey(caseId, channel, entry, variant) {
  return `${caseId}::${channel}::${entryKey(entry)}::${variant.id || 'variant'}`
}

function clean(value) {
  let next = value
  for (const [pattern, replacement] of REPLACEMENTS) {
    next = next.replace(pattern, replacement)
  }
  return next
}

const applied = []
for (const caseId of CASE_IDS) {
  const filePath = path.join(ROOT, TARGET_REL[caseId])
  const bundle = readJson(filePath)
  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    if (!STRICT_CHANNELS.has(channel)) continue
    for (const entry of payload.entries || []) {
      for (const variant of entry.variants || []) {
        for (const field of ['text', 'behaviorHint']) {
          if (typeof variant[field] !== 'string') continue
          const before = variant[field]
          const after = clean(before)
          if (after === before) continue
          variant[field] = after
          applied.push({
            variantKey: variantKey(caseId, channel, entry, variant),
            caseId,
            channel,
            entryKey: entryKey(entry),
            variantId: variant.id || null,
            field,
            before,
            after,
          })
        }
      }
    }
  }
  writeJson(filePath, bundle)
}

const report = {
  generatedAt: new Date().toISOString(),
  policy: 'Strict-channel surface cleanup only; no NPC confession/OK-stage text touched.',
  appliedCount: applied.length,
  applied,
}
writeJson(path.join(OUT_DIR, 'strict-surface-cleanup.json'), report)
console.log(JSON.stringify({ applied: applied.length }, null, 2))
