#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const cp = require('node:child_process')

const ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR = __dirname

const CASE_IDS = ['spouse-01', 'family-01', 'friend-01']
const EXPECTED_COUNTS = {
  'spouse-01': 4677,
  'family-01': 5172,
  'friend-01': 5082,
}
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

const NPC_CHANNELS = new Set([
  'interrogation',
  'evidence_present',
  'dossier',
  'contradiction_pursuit',
  'interjection',
  'emotional_overload',
  'trust_action',
  'rapport_milestone',
  'contradict_milestone',
])

const SELF_TERMS = {
  'spouse-01': ['형', '조카', '친형', '삼촌'],
  'family-01': ['정후', '동생', '어머니', '아버지'],
  'friend-01': ['수민', '다은', '예비신랑'],
}

const UNNATURAL_PATTERNS = [
  ['spouse_surface_child_to_family', /중학생\s+그 가족|그 가족이\s+라면|(^|[^가-힣])제\s+그 가족|그 가족\s+쪽를/u],
  ['bad_particle_closing_document', /해지\s*서류(을|은|과)/u],
  ['bad_replacement_inside_word', /균그쪽|비그쪽|유그쪽|진행그쪽/u],
  ['bad_family_particle', /그 가족를|그 가족가|그 가족였다/u],
]

function abs(relPath) {
  return path.join(ROOT, relPath)
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function readCurrent(caseId) {
  return readJson(abs(TARGET_REL[caseId]))
}

function readOriginal(caseId) {
  const raw = cp.execFileSync('git', ['show', `HEAD:${TARGET_REL[caseId]}`], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 80 * 1024 * 1024,
  })
  return JSON.parse(raw)
}

function entryKey(entry) {
  return entry.key || entry.id || entry.disputeId || entry.dossierCardId || entry.witnessId || 'entry'
}

function variantKey(caseId, channel, entry, variant) {
  return `${caseId}::${channel}::${entryKey(entry)}::${variant.id || 'variant'}`
}

function walkVariants(bundle, callback) {
  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    for (const entry of payload.entries || []) {
      for (const variant of entry.variants || []) {
        callback({ channel, entry, variant })
      }
    }
  }
}

function variantIndex(bundle) {
  const index = new Map()
  walkVariants(bundle, ({ channel, entry, variant }) => {
    index.set(`${channel}::${entryKey(entry)}::${variant.id || 'variant'}`, { channel, entry, variant })
  })
  return index
}

function countVariants(bundle) {
  let total = 0
  const byChannel = {}
  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    const count = (payload.entries || []).reduce((sum, entry) => sum + (entry.variants || []).length, 0)
    byChannel[channel] = count
    total += count
  }
  return { total, byChannel }
}

function findTag(variant, prefix) {
  return Array.isArray(variant.tags)
    ? variant.tags.find((tag) => String(tag).startsWith(prefix))
    : undefined
}

function stageMeta(channel, entry, variant) {
  const tagText = Array.isArray(variant.tags) ? variant.tags.join('|') : ''
  const haystack = [
    channel,
    entry.key,
    entry.id,
    entry.lieState,
    entry.lieBand,
    entry.truthLevel,
    entry.stage,
    entry.investigationStage,
    variant.id,
    tagText,
  ].filter(Boolean).join('|')

  const sMarkers = [...haystack.matchAll(/(?:^|[^A-Za-z0-9])S([0-9])(?:[^A-Za-z0-9]|$)/g)].map((m) => Number(m[1]))
  const stageMarkers = [...haystack.matchAll(/stage\s*([0-9])/gi)].map((m) => Number(m[1]))
  const tagLieBand = findTag(variant, 'lieBand:')
  const tagReveal = findTag(variant, 'reveal:')

  const lieBand = entry.lieBand
    || (tagLieBand ? tagLieBand.split(':')[1] : null)
    || (/\blate\b/i.test(haystack) ? 'late' : null)
    || (/\bearly\b/i.test(haystack) ? 'early' : null)
    || (/\bmid\b/i.test(haystack) ? 'mid' : null)

  return {
    lieState: entry.lieState || (sMarkers.length ? `S${Math.max(...sMarkers)}` : null),
    lieStateNumber: sMarkers.length ? Math.max(...sMarkers) : null,
    lieBand,
    truthLevel: entry.truthLevel || (tagReveal ? tagReveal.split(':')[1] : null),
    investigationStage: stageMarkers.length ? Math.max(...stageMarkers) : null,
  }
}

function isStrictChannel(channel) {
  return STRICT_CHANNELS.has(channel)
}

function isNpcChannel(channel) {
  return NPC_CHANNELS.has(channel)
}

function isNpcOkStage(channel, entry, variant) {
  if (!isNpcChannel(channel)) return false
  const meta = stageMeta(channel, entry, variant)
  return (meta.lieStateNumber !== null && meta.lieStateNumber >= 3)
    || meta.lieBand === 'late'
    || (meta.investigationStage !== null && meta.investigationStage >= 3)
    || meta.truthLevel === 'full'
}

function matrixCell(channel, entry, variant) {
  const meta = stageMeta(channel, entry, variant)
  if (isStrictChannel(channel)) return { cell: 'strict_always_patchable', meta }
  if (channel === 'aftermath') return { cell: 'after_final_narrative_preserve', meta }
  if (isNpcChannel(channel) && isNpcOkStage(channel, entry, variant)) return { cell: 'npc_confession_ok_preserve', meta }
  if (isNpcChannel(channel) && (meta.lieState === 'S0' || meta.lieState === 'S1' || meta.lieBand === 'early')) return { cell: 'npc_early_strict_review', meta }
  if (isNpcChannel(channel) && (meta.lieState === 'S2' || meta.lieBand === 'mid')) return { cell: 'npc_partial_review', meta }
  if (isNpcChannel(channel)) return { cell: 'npc_unmarked_review', meta }
  return { cell: 'unmapped_review', meta }
}

function classifyChange(caseId, channel, entry, variant) {
  const { cell, meta } = matrixCell(channel, entry, variant)
  if (isStrictChannel(channel)) {
    return {
      category: 'A',
      action: 'preserve',
      reason: 'Strict judge/system/mediation/evidence-discovery channel may be patched regardless of stage.',
      cell,
      meta,
    }
  }
  if (channel === 'aftermath') {
    return {
      category: 'B',
      action: 'rollback',
      reason: 'Aftermath is post-verdict narrative and must preserve final truth wording.',
      cell,
      meta,
    }
  }
  if (isNpcChannel(channel) && isNpcOkStage(channel, entry, variant)) {
    return {
      category: 'B',
      action: 'rollback',
      reason: 'NPC S3+/late/stage3 is normal confession progression; truth lexemes are gameplay content, not leaks.',
      cell,
      meta,
    }
  }
  if (isNpcChannel(channel)) {
    return {
      category: 'C',
      action: 'review_rollback',
      reason: 'NPC early/partial change reviewed against validated original throttle; rollback avoids self-voice and particle damage.',
      cell,
      meta,
    }
  }
  return {
    category: 'C',
    action: 'review_rollback',
    reason: 'Unmapped non-strict channel; rollback conservatively.',
    cell,
    meta,
  }
}

function changedFields(currentVariant, originalVariant) {
  const fields = []
  if ((currentVariant.text || '') !== (originalVariant.text || '')) fields.push('text')
  if ((currentVariant.behaviorHint || '') !== (originalVariant.behaviorHint || '')) fields.push('behaviorHint')
  return fields
}

function buildEffectiveCategorization() {
  const changes = []
  const summary = {}
  for (const caseId of CASE_IDS) {
    const current = readCurrent(caseId)
    const original = readOriginal(caseId)
    const currentIndex = variantIndex(current)
    const originalIndex = variantIndex(original)
    summary[caseId] = { A: 0, B: 0, C: 0, total: 0, byChannel: {}, byCell: {} }

    for (const [localKey, currentItem] of currentIndex.entries()) {
      const originalItem = originalIndex.get(localKey)
      if (!originalItem) continue
      const fields = changedFields(currentItem.variant, originalItem.variant)
      if (!fields.length) continue

      const classification = classifyChange(caseId, currentItem.channel, currentItem.entry, currentItem.variant)
      summary[caseId][classification.category] += 1
      summary[caseId].total += 1
      summary[caseId].byChannel[currentItem.channel] = (summary[caseId].byChannel[currentItem.channel] || 0) + 1
      summary[caseId].byCell[classification.cell] = (summary[caseId].byCell[classification.cell] || 0) + 1

      changes.push({
        variantKey: variantKey(caseId, currentItem.channel, currentItem.entry, currentItem.variant),
        caseId,
        channel: currentItem.channel,
        entryKey: entryKey(currentItem.entry),
        variantId: currentItem.variant.id || null,
        changedFields: fields,
        category: classification.category,
        action: classification.action,
        reason: classification.reason,
        matrixCell: classification.cell,
        stage: classification.meta,
        before: originalItem.variant.text || '',
        after: currentItem.variant.text || '',
        behaviorHintBefore: originalItem.variant.behaviorHint || null,
        behaviorHintAfter: currentItem.variant.behaviorHint || null,
      })
    }
  }

  summary.total = CASE_IDS.reduce((acc, caseId) => {
    for (const key of ['A', 'B', 'C', 'total']) acc[key] = (acc[key] || 0) + summary[caseId][key]
    return acc
  }, {})
  return { generatedAt: new Date().toISOString(), summary, effectiveVariantChanges: changes }
}

function classifyAvailablePatchRecords() {
  const records = []
  const files = []
  for (let round = 1; round <= 5; round += 1) {
    files.push({ stage: `round-${round}`, file: path.join(ROOT, 'tmp', 'codex-recovery', `round-${round}`, 'coordinated-patches.json') })
  }
  files.push({ stage: 'final-hardening-last-run', file: path.join(ROOT, 'tmp', 'codex-recovery', 'final-hardening', 'coordinated-patches.json') })

  const currentByCase = Object.fromEntries(CASE_IDS.map((caseId) => [caseId, variantIndex(readCurrent(caseId))]))
  for (const source of files) {
    if (!fs.existsSync(source.file)) continue
    const patches = readJson(source.file)
    if (!Array.isArray(patches)) continue
    for (const patch of patches) {
      const parts = String(patch.variantKey || '').split('::')
      const [caseId, channel, patchEntryKey, variantId] = parts
      const localKey = `${channel}::${patchEntryKey}::${variantId}`
      const item = currentByCase[caseId]?.get(localKey)
      const classification = item
        ? classifyChange(caseId, item.channel, item.entry, item.variant)
        : { category: 'C', action: 'review_rollback', reason: 'Patch target no longer found in current index.', cell: 'missing', meta: {} }
      records.push({
        source: source.stage,
        variantKey: patch.variantKey,
        caseId,
        channel,
        entryKey: patchEntryKey,
        variantId,
        category: classification.category,
        action: classification.action,
        reason: classification.reason,
        matrixCell: classification.cell,
        stage: classification.meta,
        before: patch.before,
        after: patch.after,
        behaviorHintBefore: patch.behaviorHintBefore,
        behaviorHintAfter: patch.behaviorHintAfter,
      })
    }
  }
  const summary = records.reduce((acc, record) => {
    acc.total += 1
    acc[record.category] = (acc[record.category] || 0) + 1
    return acc
  }, { total: 0, A: 0, B: 0, C: 0 })
  return {
    note: 'Final-hardening intermediate patch files were overwritten by the previous runner; this list contains all recoverable patch records plus effective current-vs-HEAD diff categorization.',
    recoveredPatchRecords: summary,
    records,
  }
}

function applyRollback(categorization) {
  const rollbackKeys = new Set(
    categorization.effectiveVariantChanges
      .filter((change) => change.category === 'B' || change.category === 'C')
      .map((change) => change.variantKey),
  )
  const applied = []
  const summary = { B: 0, C: 0, total: 0, byCase: {}, byChannel: {} }

  for (const caseId of CASE_IDS) {
    const current = readCurrent(caseId)
    const original = readOriginal(caseId)
    const originalIndex = variantIndex(original)

    walkVariants(current, ({ channel, entry, variant }) => {
      const key = variantKey(caseId, channel, entry, variant)
      if (!rollbackKeys.has(key)) return
      const originalItem = originalIndex.get(`${channel}::${entryKey(entry)}::${variant.id || 'variant'}`)
      if (!originalItem) return
      const classification = classifyChange(caseId, channel, entry, variant)
      const fields = changedFields(variant, originalItem.variant)
      if (!fields.length) return

      const beforeText = variant.text || ''
      const beforeHint = variant.behaviorHint || null
      if (fields.includes('text')) variant.text = originalItem.variant.text
      if (fields.includes('behaviorHint')) {
        if (Object.prototype.hasOwnProperty.call(originalItem.variant, 'behaviorHint')) {
          variant.behaviorHint = originalItem.variant.behaviorHint
        } else {
          delete variant.behaviorHint
        }
      }

      applied.push({
        variantKey: key,
        caseId,
        channel,
        entryKey: entryKey(entry),
        variantId: variant.id || null,
        category: classification.category,
        action: classification.action,
        reason: classification.reason,
        matrixCell: classification.cell,
        stage: classification.meta,
        restoredFields: fields,
        beforeRollbackText: beforeText,
        restoredText: originalItem.variant.text || '',
        beforeRollbackBehaviorHint: beforeHint,
        restoredBehaviorHint: originalItem.variant.behaviorHint || null,
      })
      summary[classification.category] += 1
      summary.total += 1
      summary.byCase[caseId] = (summary.byCase[caseId] || 0) + 1
      summary.byChannel[channel] = (summary.byChannel[channel] || 0) + 1
    })

    writeJson(abs(TARGET_REL[caseId]), current)
  }

  return {
    generatedAt: new Date().toISOString(),
    policy: 'Rollback B and reviewed C non-strict NPC/aftermath changes to HEAD original; preserve A strict-channel patches.',
    summary,
    applied,
  }
}

function buildChannelStageMatrix() {
  const matrix = {}
  for (const caseId of CASE_IDS) {
    const current = readCurrent(caseId)
    const original = readOriginal(caseId)
    const originalIndex = variantIndex(original)
    matrix[caseId] = {}
    walkVariants(current, ({ channel, entry, variant }) => {
      const localKey = `${channel}::${entryKey(entry)}::${variant.id || 'variant'}`
      const originalItem = originalIndex.get(localKey)
      const { cell, meta } = matrixCell(channel, entry, variant)
      matrix[caseId][channel] ||= {}
      matrix[caseId][channel][cell] ||= {
        total: 0,
        changedFromOriginal: 0,
        stages: {},
      }
      const bucket = matrix[caseId][channel][cell]
      bucket.total += 1
      const stageLabel = meta.lieState || meta.lieBand || (meta.investigationStage ? `stage${meta.investigationStage}` : meta.truthLevel || 'unmarked')
      bucket.stages[stageLabel] = (bucket.stages[stageLabel] || 0) + 1
      if (originalItem && changedFields(variant, originalItem.variant).length) bucket.changedFromOriginal += 1
    })
  }
  return { generatedAt: new Date().toISOString(), matrix }
}

function textFields(variant) {
  return [
    ['text', variant.text || ''],
    ['behaviorHint', variant.behaviorHint || ''],
  ]
}

function runStageAwarePrecheck(options = {}) {
  const issues = []
  const counts = {}
  const remainingChanges = []
  const unnaturalHits = []

  for (const caseId of CASE_IDS) {
    const current = readCurrent(caseId)
    const original = readOriginal(caseId)
    const currentIndex = variantIndex(current)
    const originalIndex = variantIndex(original)
    const count = countVariants(current)
    counts[caseId] = count

    if (count.total !== EXPECTED_COUNTS[caseId]) {
      issues.push({ severity: 'FAIL', type: 'variant_count', caseId, expected: EXPECTED_COUNTS[caseId], actual: count.total })
    }

    for (const [localKey, originalItem] of originalIndex.entries()) {
      const currentItem = currentIndex.get(localKey)
      if (!currentItem) {
        issues.push({ severity: 'FAIL', type: 'missing_variant', caseId, localKey })
        continue
      }
      for (const field of ['id', 'tags', 'sourceRefs', 'status']) {
        if (JSON.stringify(originalItem.variant[field]) !== JSON.stringify(currentItem.variant[field])) {
          issues.push({ severity: 'FAIL', type: 'metadata_changed', caseId, localKey, field })
        }
      }
      for (const field of ['key', 'status']) {
        if (JSON.stringify(originalItem.entry[field]) !== JSON.stringify(currentItem.entry[field])) {
          issues.push({ severity: 'FAIL', type: 'entry_metadata_changed', caseId, localKey, field })
        }
      }

      const fields = changedFields(currentItem.variant, originalItem.variant)
      if (fields.length) {
        const classification = classifyChange(caseId, currentItem.channel, currentItem.entry, currentItem.variant)
        remainingChanges.push({
          variantKey: variantKey(caseId, currentItem.channel, currentItem.entry, currentItem.variant),
          caseId,
          channel: currentItem.channel,
          entryKey: entryKey(currentItem.entry),
          variantId: currentItem.variant.id || null,
          changedFields: fields,
          category: classification.category,
          matrixCell: classification.cell,
        })
        if (classification.category !== 'A') {
          issues.push({
            severity: 'FAIL',
            type: 'non_strict_patch_remaining',
            variantKey: variantKey(caseId, currentItem.channel, currentItem.entry, currentItem.variant),
            caseId,
            channel: currentItem.channel,
            matrixCell: classification.cell,
            stage: classification.meta,
            changedFields: fields,
          })
        }
      }
    }

    for (const [localKey, currentItem] of currentIndex.entries()) {
      if (!originalIndex.has(localKey)) {
        issues.push({ severity: 'FAIL', type: 'new_variant', caseId, localKey })
      }
      for (const [field, value] of textFields(currentItem.variant)) {
        for (const [code, pattern] of UNNATURAL_PATTERNS) {
          if (pattern.test(value)) {
            const hit = {
              severity: 'FAIL',
              type: 'unnatural_surface_token',
              code,
              variantKey: variantKey(caseId, currentItem.channel, currentItem.entry, currentItem.variant),
              caseId,
              channel: currentItem.channel,
              field,
              value,
            }
            unnaturalHits.push(hit)
            issues.push(hit)
          }
        }
      }
    }
  }

  counts.total = CASE_IDS.reduce((sum, caseId) => sum + counts[caseId].total, 0)
  if (counts.total !== Object.values(EXPECTED_COUNTS).reduce((sum, count) => sum + count, 0)) {
    issues.push({ severity: 'FAIL', type: 'total_variant_count', actual: counts.total })
  }

  const report = {
    generatedAt: new Date().toISOString(),
    passed: !issues.some((issue) => issue.severity === 'FAIL'),
    counts,
    remainingChanges: {
      total: remainingChanges.length,
      byCategory: remainingChanges.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1
        return acc
      }, {}),
      samples: remainingChanges.slice(0, 50),
    },
    unnaturalHits,
    issues,
  }
  if (options.write !== false) writeJson(path.join(OUT_DIR, 'precheck-stage-aware.json'), report)
  return report
}

function buildArchetypeVoiceAudit() {
  const cases = {}
  const missing = []
  const preservedSamples = []
  for (const caseId of CASE_IDS) {
    const current = readCurrent(caseId)
    const original = readOriginal(caseId)
    const currentIndex = variantIndex(current)
    const terms = SELF_TERMS[caseId]
    cases[caseId] = Object.fromEntries(terms.map((term) => [term, { originalOkStageOccurrences: 0, currentOkStageOccurrences: 0, lostVariants: 0 }]))

    const originalIndex = variantIndex(original)
    for (const [localKey, originalItem] of originalIndex.entries()) {
      const currentItem = currentIndex.get(localKey)
      if (!currentItem) continue
      if (!isNpcOkStage(originalItem.channel, originalItem.entry, originalItem.variant)) continue
      const beforeText = `${originalItem.variant.text || ''} ${originalItem.variant.behaviorHint || ''}`
      const afterText = `${currentItem.variant.text || ''} ${currentItem.variant.behaviorHint || ''}`
      for (const term of terms) {
        const beforeCount = (beforeText.match(new RegExp(term, 'g')) || []).length
        const afterCount = (afterText.match(new RegExp(term, 'g')) || []).length
        cases[caseId][term].originalOkStageOccurrences += beforeCount
        cases[caseId][term].currentOkStageOccurrences += afterCount
        if (beforeCount > afterCount) {
          cases[caseId][term].lostVariants += 1
          missing.push({
            caseId,
            term,
            variantKey: variantKey(caseId, currentItem.channel, currentItem.entry, currentItem.variant),
            beforeText: originalItem.variant.text || '',
            afterText: currentItem.variant.text || '',
          })
        } else if (beforeCount > 0 && preservedSamples.length < 30) {
          preservedSamples.push({
            caseId,
            term,
            variantKey: variantKey(caseId, currentItem.channel, currentItem.entry, currentItem.variant),
          })
        }
      }
    }
  }
  return {
    generatedAt: new Date().toISOString(),
    passed: missing.length === 0,
    cases,
    missing,
    preservedSamples,
  }
}

function writePrecheckScript() {
  const body = `#!/usr/bin/env node
'use strict'

const { runStageAwarePrecheck } = require('./recovery-v3.cjs')

const report = runStageAwarePrecheck({ write: true })
console.log(JSON.stringify({
  passed: report.passed,
  totalVariants: report.counts.total,
  remainingChanges: report.remainingChanges,
  unnaturalHits: report.unnaturalHits.length,
  failCount: report.issues.filter((issue) => issue.severity === 'FAIL').length,
}, null, 2))
process.exit(report.passed ? 0 : 1)
`
  fs.writeFileSync(path.join(OUT_DIR, 'precheck-stage-aware.cjs'), body, 'utf8')
}

function runRecoveryV3() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  writePrecheckScript()

  const categorization = buildEffectiveCategorization()
  const patchRecords = classifyAvailablePatchRecords()
  writeJson(path.join(OUT_DIR, 'patch-categorization.json'), {
    generatedAt: new Date().toISOString(),
    appliedPatchCountFromRoundLog: 877,
    limitation: 'The previous final-hardening runner overwrote intermediate hardening patch files. Therefore this file contains all recoverable patch records and the authoritative current-vs-HEAD effective variant diff classification.',
    patchRecords,
    effectiveDiffs: categorization,
  })

  const rollback = applyRollback(categorization)
  writeJson(path.join(OUT_DIR, 'rollback-applied.json'), rollback)
  writeJson(path.join(OUT_DIR, 'channel-stage-matrix.json'), buildChannelStageMatrix())
  writeJson(path.join(OUT_DIR, 'archetype-voice-audit.json'), buildArchetypeVoiceAudit())

  const precheck = runStageAwarePrecheck({ write: true })
  console.log(JSON.stringify({
    rollback: rollback.summary,
    precheckPassed: precheck.passed,
    remainingChanges: precheck.remainingChanges,
    unnaturalHits: precheck.unnaturalHits.length,
  }, null, 2))
  process.exit(precheck.passed ? 0 : 2)
}

if (require.main === module) {
  runRecoveryV3()
}

module.exports = {
  buildArchetypeVoiceAudit,
  buildChannelStageMatrix,
  buildEffectiveCategorization,
  classifyAvailablePatchRecords,
  runStageAwarePrecheck,
}
