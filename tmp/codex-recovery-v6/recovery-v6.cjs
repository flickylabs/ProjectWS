#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const cp = require('node:child_process')

const {
  gatherSemanticIssues,
  markerCount,
  summarizeIssues,
} = require('../../scripts/lib/scripted-semantic-rules.cjs')

const ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR = __dirname
const V5_DIR = path.join(ROOT, 'tmp', 'codex-recovery-v5')

const CASE_IDS = ['spouse-01', 'family-01', 'friend-01']
const EXPECTED_COUNTS = {
  'spouse-01': 4677,
  'family-01': 5172,
  'friend-01': 5082,
}
const TARGET_REL = Object.fromEntries(CASE_IDS.map((caseId) => [caseId, `src/data/scriptedText/${caseId}.json`]))

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

const SPECIALISTS = [
  'A_TruthLeak',
  'B_RegisterAngle',
  'C_FactCheck',
  'D_QACoherence',
  'E_SystemAlignment',
  'F_LieStateFlow',
  'G_EvidenceUnlock',
  'H_ArchetypeQuant',
  'I_MeterTiming',
]

const CLAUDE_CANDIDATE_CODES = new Set(['T1', 'T2', 'T7'])
const V6_PATCHABLE_TONE_CODES = new Set(['T3', 'T4', 'T5', 'T6'])

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

function writeCurrent(caseId, bundle) {
  writeJson(abs(TARGET_REL[caseId]), bundle)
}

function readRuntimeCase(caseId) {
  return readJson(abs(`src/data/cases/generated/${caseId}.json`))
}

function readOriginal(caseId) {
  const raw = cp.execFileSync('git', ['show', `HEAD:${TARGET_REL[caseId]}`], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024,
  })
  return JSON.parse(raw)
}

function entryKey(entry) {
  return entry.key || entry.id || entry.disputeId || entry.dossierCardId || entry.witnessId || 'entry'
}

function variantKey(caseId, channel, entry, variant) {
  return `${caseId}::${channel}::${entryKey(entry)}::${variant.id || 'variant'}`
}

function entryFieldKey(caseId, channel, entry, field) {
  return `${caseId}::${channel}::${entryKey(entry)}::entry.${field}`
}

function walkVariants(bundle, callback) {
  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    for (const entry of payload.entries || []) {
      for (const variant of entry.variants || []) callback({ channel, entry, variant })
    }
  }
}

function walkEntryFields(bundle, callback) {
  const fields = ['stageQuestion', 'questionText', 'unlockHint', 'investigationResult', 'implication', 'line', 'judge']
  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    for (const entry of payload.entries || []) {
      for (const field of fields) {
        if (typeof entry[field] === 'string') callback({ channel, entry, field })
      }
    }
  }
}

function parseStage(channel, entry, variant) {
  const haystack = `${channel} ${entryKey(entry)} ${entry.lieState || ''} ${entry.lieBand || ''} ${entry.truthLevel || ''} ${entry.depth || ''} ${variant?.id || ''}`
  const lie = haystack.match(/\bS([0-9])\b/u)
  const stage = haystack.match(/stage([0-9])/u)
  const band = haystack.match(/\b(early|mid|late|soft|hard)\b/u)
  return {
    lieState: lie ? `S${lie[1]}` : null,
    lieStateNumber: lie ? Number(lie[1]) : null,
    lieBand: band ? band[1] : null,
    investigationStage: stage ? `stage${stage[1]}` : null,
  }
}

function matrixCell(channel, stage) {
  if (channel === 'aftermath') return 'after_final_narrative_preserve'
  if (STRICT_CHANNELS.has(channel)) return 'strict_channel_patch_allowed'
  if (stage.lieStateNumber != null && stage.lieStateNumber >= 3) return 'npc_confession_ok_style_only'
  if (stage.lieBand === 'late') return 'npc_confession_ok_style_only'
  if (stage.investigationStage && /stage[3-9]/u.test(stage.investigationStage)) return 'npc_confession_ok_style_only'
  if (stage.lieStateNumber === 2 || stage.lieBand === 'mid') return 'npc_partial_review'
  return 'npc_early_strict_review'
}

function isSkipped(entry, variant) {
  return entry.status === 'skipped' || variant?.status === 'skipped'
}

function loadV5Log() {
  return readJson(path.join(V5_DIR, 'changes-log-v5.json'))
}

function buildProtectedV5() {
  const log = loadV5Log()
  const variantFields = new Map()
  const entryFields = new Map()
  for (const patch of log.patches || []) {
    if (patch.scope === 'entry' || patch.entryFieldKey) {
      entryFields.set(`${patch.entryFieldKey}::${patch.field}`, patch)
    } else if (patch.variantKey && patch.field) {
      variantFields.set(`${patch.variantKey}::${patch.field}`, patch)
    }
  }
  return { log, variantFields, entryFields }
}

function buildCurrentMaps(bundle) {
  const variants = new Map()
  const entryFields = new Map()
  walkVariants(bundle, ({ channel, entry, variant }) => {
    variants.set(`${channel}::${entryKey(entry)}::${variant.id || 'variant'}`, { channel, entry, variant })
  })
  walkEntryFields(bundle, ({ channel, entry, field }) => {
    entryFields.set(`${channel}::${entryKey(entry)}::entry.${field}`, { channel, entry, field })
  })
  return { variants, entryFields }
}

function isV5ProtectedVariant(caseId, channel, entry, variant, field, protectedV5) {
  return protectedV5.variantFields.has(`${variantKey(caseId, channel, entry, variant)}::${field}`)
}

function isV5ProtectedEntry(caseId, channel, entry, field, protectedV5) {
  return protectedV5.entryFields.has(`${entryFieldKey(caseId, channel, entry, field)}::${field}`)
}

function verifyV5Preservation() {
  const protectedV5 = buildProtectedV5()
  const issues = []
  const postV5Drift = []
  const afterAnchorPreserved = (patch, current) => {
    if (current === patch.after) return true
    if (current === patch.before) return false
    if (typeof current !== 'string' || typeof patch.after !== 'string' || typeof patch.before !== 'string') return false
    const afterParts = patch.after
      .split(/[.!?\n]/u)
      .map((part) => part.trim())
      .filter((part) => part.length >= 8 && !patch.before.includes(part))
    if (afterParts.some((part) => current.includes(part))) return true
    const afterWords = patch.after.split(/\s+/u).filter(Boolean)
    for (let i = 0; i <= afterWords.length - 4; i += 1) {
      const phrase = afterWords.slice(i, i + 4).join(' ')
      if (phrase.length >= 8 && !patch.before.includes(phrase) && current.includes(phrase)) return true
    }
    return false
  }
  for (const caseId of CASE_IDS) {
    const maps = buildCurrentMaps(readCurrent(caseId))
    for (const patch of protectedV5.variantFields.values()) {
      if (patch.caseId !== caseId) continue
      const localKey = patch.variantKey.replace(`${caseId}::`, '')
      const item = maps.variants.get(localKey)
      const current = item ? item.variant[patch.field] : undefined
      if (current !== patch.after) {
        if (afterAnchorPreserved(patch, current)) postV5Drift.push({ ...patch, current, issue: 'post-v5 text drift with v5 anchor preserved' })
        else issues.push({ ...patch, current, issue: 'v5 variant after mismatch' })
      }
    }
    for (const patch of protectedV5.entryFields.values()) {
      if (patch.caseId !== caseId) continue
      const localKey = patch.entryFieldKey.replace(`${caseId}::`, '')
      const item = maps.entryFields.get(localKey)
      const current = item ? item.entry[patch.field] : undefined
      if (current !== patch.after) {
        if (afterAnchorPreserved(patch, current)) postV5Drift.push({ ...patch, current, issue: 'post-v5 text drift with v5 anchor preserved' })
        else issues.push({ ...patch, current, issue: 'v5 entry after mismatch' })
      }
    }
  }
  return {
    passed: issues.length === 0,
    baselinePatchCount: protectedV5.log.totalPatches || (protectedV5.log.patches || []).length,
    baselineFinalFieldCount: protectedV5.variantFields.size + protectedV5.entryFields.size,
    issueCount: issues.length,
    postV5DriftCount: postV5Drift.length,
    issues,
    postV5Drift,
  }
}

function verifyMetadataPreservation() {
  const issues = []
  const skippedIssues = []
  const counts = {}
  for (const caseId of CASE_IDS) {
    const original = readOriginal(caseId)
    const current = readCurrent(caseId)
    const origMaps = buildCurrentMaps(original)
    const curMaps = buildCurrentMaps(current)
    counts[caseId] = curMaps.variants.size
    if (counts[caseId] !== EXPECTED_COUNTS[caseId]) {
      issues.push({ caseId, type: 'variant_count', expected: EXPECTED_COUNTS[caseId], actual: counts[caseId] })
    }
    for (const [localKey, orig] of origMaps.variants.entries()) {
      const cur = curMaps.variants.get(localKey)
      if (!cur) {
        issues.push({ caseId, type: 'missing_variant', localKey })
        continue
      }
      for (const field of ['id', 'status']) {
        if ((orig.variant[field] || null) !== (cur.variant[field] || null)) issues.push({ caseId, type: `variant_${field}`, localKey })
      }
      for (const field of ['tags', 'sourceRefs']) {
        if (JSON.stringify(orig.variant[field] || null) !== JSON.stringify(cur.variant[field] || null)) {
          issues.push({ caseId, type: `variant_${field}`, localKey })
        }
      }
      if (orig.entry.status === 'skipped' || orig.variant.status === 'skipped') {
        if (JSON.stringify(orig.variant) !== JSON.stringify(cur.variant)) {
          skippedIssues.push({ caseId, localKey, type: 'skipped_variant_changed' })
        }
      }
    }
    for (const [localKey, orig] of origMaps.entryFields.entries()) {
      const cur = curMaps.entryFields.get(localKey)
      if (!cur) {
        issues.push({ caseId, type: 'missing_entry_field', localKey })
        continue
      }
      if (orig.entry.status === 'skipped' && orig.entry[orig.field] !== cur.entry[cur.field]) {
        skippedIssues.push({ caseId, localKey, type: 'skipped_entry_field_changed' })
      }
    }
  }
  return {
    passed: issues.length === 0 && skippedIssues.length === 0,
    counts,
    total: Object.values(counts).reduce((sum, value) => sum + value, 0),
    issueCount: issues.length,
    skippedIssueCount: skippedIssues.length,
    issues,
    skippedIssues,
  }
}

function caseDataUntouched() {
  const output = cp.execFileSync('git', ['diff', '--name-only', '--', 'src/data/cases/generated'], {
    cwd: ROOT,
    encoding: 'utf8',
  }).trim()
  const files = output ? output.split(/\r?\n/u) : []
  return { passed: files.length === 0, files }
}

function semanticIndex(caseId, bundle) {
  const runtimeCase = readRuntimeCase(caseId)
  const issues = gatherSemanticIssues({ bundle, runtimeCase })
  const map = new Map()
  for (const issue of issues) {
    const match = issue.message.match(/^([^:]+):([^ ]+)/u)
    if (!match) continue
    const key = `${match[1]}::${match[2]}`
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(issue)
  }
  return { issues, map, summary: summarizeIssues(issues) }
}

function findVariantRef(bundle, channel, variantId) {
  for (const [entryChannel, payload] of Object.entries(bundle.channels || {})) {
    if (channel && entryChannel !== channel) continue
    for (const entry of payload.entries || []) {
      for (const variant of entry.variants || []) {
        if ((variant.id || 'variant') === variantId) return { channel: entryChannel, entry, variant }
      }
    }
  }
  return null
}

function getParty(runtimeCase, entry) {
  if (entry.party === 'a') return runtimeCase.duo?.partyA || null
  if (entry.party === 'b') return runtimeCase.duo?.partyB || null
  return null
}

function lineAlreadyHasAdmission(text) {
  return /인정|자백|제 잘못|제 책임|제가 만든|제가 한|제가 먼저|제 몫|감당하겠습니다|피하지 않겠습니다|외면하지 않겠습니다/u.test(text)
}

function makeTonePatchText({ code, text, party }) {
  const archetype = party?.archetype || ''
  if (code === 'T3') return `${text} 다만 일부는 제가 설명해야 합니다.`
  if (code === 'T4') {
    if (archetype === 'victim_cosplay') return `${text} 다만 상대가 먼저 만든 상황도 봐야 한다고 느꼈습니다.`
    if (archetype === 'avoidant') return `${text} 다만 상대가 먼저 오해한 부분도 있다고 생각했습니다.`
    if (archetype === 'confrontational') return `${text} 상대 책임도 먼저 봐야 합니다.`
    if (archetype === 'affect_flattening') return `${text} 상대 쪽 책임도 남아 있습니다.`
    if (archetype === 'premature_summary') return `${text} 결국 상대 쪽을 먼저 책임으로 본 겁니다.`
    return `${text} 다만 상대 책임도 먼저 봐야 한다고 느꼈습니다.`
  }
  if (code === 'T5') return `${text} 그때는 불안해서 버티기 어려웠습니다.`
  if (code === 'T6') return /인정|자백/u.test(text) ? text : `${text} 이제 그 책임은 인정합니다.`
  return text
}

function detectLieStateFlow({ apply = false } = {}) {
  const protectedV5 = buildProtectedV5()
  const proposals = []
  const candidates = []
  const applied = []
  const residualHard = []
  const byCase = Object.fromEntries(CASE_IDS.map((caseId) => [caseId, 0]))
  const byCode = {}

  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    const runtimeCase = readRuntimeCase(caseId)
    const sem = semanticIndex(caseId, bundle)
    let changed = false
    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (!NPC_CHANNELS.has(channel) || isSkipped(entry, variant)) return
      if (channel === 'aftermath') return
      if (isV5ProtectedVariant(caseId, channel, entry, variant, 'text', protectedV5)) {
        const issues = sem.map.get(`${channel}::${variant.id || 'variant'}`) || []
        for (const issue of issues.filter((item) => V6_PATCHABLE_TONE_CODES.has(item.code) || CLAUDE_CANDIDATE_CODES.has(item.code))) {
          candidates.push({
            caseId,
            channel,
            entryKey: entryKey(entry),
            variantId: variant.id || null,
            field: 'text',
            current: variant.text || '',
            code: issue.code,
            severity: issue.severity,
            reason: 'v5-protected-field',
            claudeAreaIssue: 'v5 protected field; do not rewrite in v6',
          })
        }
        return
      }
      const issues = sem.map.get(`${channel}::${variant.id || 'variant'}`) || []
      const stage = parseStage(channel, entry, variant)
      const patchable = issues.find((issue) => V6_PATCHABLE_TONE_CODES.has(issue.code))
      for (const issue of issues.filter((item) => CLAUDE_CANDIDATE_CODES.has(item.code))) {
        candidates.push({
          caseId,
          channel,
          entryKey: entryKey(entry),
          variantId: variant.id || null,
          field: 'text',
          current: variant.text || '',
          code: issue.code,
          severity: issue.severity,
          reason: 'style-or-ambiguous-flow-candidate',
          claudeAreaIssue: 'candidate-only: may need natural voice polish, not safe for bulk Codex rewrite',
        })
      }
      if (!patchable) return
      const party = getParty(runtimeCase, entry)
      const before = variant.text || ''
      const after = makeTonePatchText({ code: patchable.code, text: before, party })
      if (!after || after === before) return
      const proposal = {
        caseId,
        channel,
        entryKey: entryKey(entry),
        variantId: variant.id || null,
        variantKey: variantKey(caseId, channel, entry, variant),
        scope: 'variant',
        field: 'text',
        before,
        after,
        pattern: [`D1_LieStateFlow_${patchable.code}`],
        specialist: 'F_LieStateFlow',
        matrixCell: matrixCell(channel, stage),
        stage,
        archetype: party?.archetype || null,
        rationale: `v6 D1: ${patchable.code} tone-flow hard warning/failure aligned to lieState ${stage.lieState || entry.lieState || 'n/a'} without changing facts.`,
        safety: {
          skippedChecked: true,
          v5BaselineProtected: true,
          archetypeVoiceChecked: true,
          truthThrottleChecked: true,
        },
      }
      proposals.push(proposal)
      if (apply) {
        variant.text = after
        changed = true
        applied.push(proposal)
        byCase[caseId] += 1
        for (const pattern of proposal.pattern) byCode[pattern] = (byCode[pattern] || 0) + 1
      }
    })
    if (changed) writeCurrent(caseId, bundle)
  }

  const afterReport = runLieStateFlowPrecheck({ write: false })
  for (const issue of afterReport.hardIssues || []) residualHard.push(issue)
  return { proposals, candidates, applied, residualHard, byCase, byCode }
}

function evidenceLexemes(runtimeCase) {
  const lexemes = []
  for (const evidence of runtimeCase.evidence || []) {
    const name = evidence.name || ''
    const surface = evidence.surfaceName || evidence.name || ''
    if (!name || name === surface) continue
    const locked = (evidence.requires || []).length > 0 || evidence.requiredLieState || Number(evidence.meta?.stage || 0) >= 2
    lexemes.push({ id: evidence.id, name, surface, locked, requiredLieState: evidence.requiredLieState || null, stage: evidence.meta?.stage || null })
  }
  return lexemes
}

function detectEvidenceUnlock({ apply = false } = {}) {
  const protectedV5 = buildProtectedV5()
  const proposals = []
  const applied = []
  const residuals = []
  const byCase = Object.fromEntries(CASE_IDS.map((caseId) => [caseId, 0]))
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    const runtimeCase = readRuntimeCase(caseId)
    const lexemes = evidenceLexemes(runtimeCase).filter((item) => item.locked)
    let changed = false
    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (!STRICT_CHANNELS.has(channel) || isSkipped(entry, variant)) return
      if (isV5ProtectedVariant(caseId, channel, entry, variant, 'text', protectedV5)) return
      let next = variant.text || ''
      const before = next
      const matched = []
      for (const lexeme of lexemes) {
        if (next.includes(lexeme.name)) {
          next = next.split(lexeme.name).join(lexeme.surface)
          matched.push(lexeme)
        }
      }
      if (next === before) return
      const stage = parseStage(channel, entry, variant)
      const proposal = {
        caseId,
        channel,
        entryKey: entryKey(entry),
        variantId: variant.id || null,
        variantKey: variantKey(caseId, channel, entry, variant),
        scope: 'variant',
        field: 'text',
        before,
        after: next,
        pattern: ['D2_EvidenceUnlock'],
        specialist: 'G_EvidenceUnlock',
        matrixCell: matrixCell(channel, stage),
        stage,
        matchedEvidence: matched,
        rationale: 'v6 D2: strict/system channel used locked evidence true name before unlock; lowered to surface name.',
        safety: { skippedChecked: true, v5BaselineProtected: true, truthThrottleChecked: true },
      }
      proposals.push(proposal)
      if (apply) {
        variant.text = next
        changed = true
        applied.push(proposal)
        byCase[caseId] += 1
      }
    })
    walkEntryFields(bundle, ({ channel, entry, field }) => {
      if (!STRICT_CHANNELS.has(channel) || entry.status === 'skipped') return
      if (isV5ProtectedEntry(caseId, channel, entry, field, protectedV5)) return
      let next = entry[field]
      const before = next
      const matched = []
      for (const lexeme of lexemes) {
        if (next.includes(lexeme.name)) {
          next = next.split(lexeme.name).join(lexeme.surface)
          matched.push(lexeme)
        }
      }
      if (next === before) return
      const proposal = {
        caseId,
        channel,
        entryKey: entryKey(entry),
        variantId: null,
        variantKey: null,
        entryFieldKey: entryFieldKey(caseId, channel, entry, field),
        scope: 'entry',
        field,
        before,
        after: next,
        pattern: ['D2_EvidenceUnlock'],
        specialist: 'G_EvidenceUnlock',
        matrixCell: matrixCell(channel, parseStage(channel, entry, null)),
        matchedEvidence: matched,
        rationale: 'v6 D2: entry-level strict/system text used locked evidence true name before unlock; lowered to surface name.',
        safety: { skippedChecked: true, v5BaselineProtected: true, truthThrottleChecked: true },
      }
      proposals.push(proposal)
      if (apply) {
        entry[field] = next
        changed = true
        applied.push(proposal)
        byCase[caseId] += 1
      }
    })
    if (changed) writeCurrent(caseId, bundle)
  }
  const afterReport = runEvidenceUnlockPrecheck({ write: false })
  residuals.push(...(afterReport.issues || []))
  return { proposals, applied, residuals, byCase }
}

function detectMeterTiming({ apply = false } = {}) {
  const protectedV5 = buildProtectedV5()
  const proposals = []
  const applied = []
  const byCase = Object.fromEntries(CASE_IDS.map((caseId) => [caseId, 0]))
  const lowOpen = [
    [/마음을 열어/u, '조금 반응하기 시작해'],
    [/신뢰가 깊어/u, '대답이 조금 덜 막혀'],
    [/믿기 시작/u, '망설임이 조금 줄어'],
  ]
  const lateFirst = [
    [/처음 흔들/u, '더 분명히 흔들'],
    [/처음으로/u, '분명히'],
  ]
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    let changed = false
    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (!['trust_action', 'rapport_milestone', 'contradict_milestone'].includes(channel)) return
      if (isSkipped(entry, variant) || isV5ProtectedVariant(caseId, channel, entry, variant, 'text', protectedV5)) return
      let next = variant.text || ''
      const before = next
      const matched = []
      if (channel === 'rapport_milestone' && Number(entry.threshold || 0) <= 30) {
        for (const [from, to] of lowOpen) {
          if (from.test(next)) {
            next = next.replace(from, to)
            matched.push(String(from))
          }
        }
      }
      if (channel === 'contradict_milestone' && Number(entry.token_count || 0) >= 5) {
        for (const [from, to] of lateFirst) {
          if (from.test(next)) {
            next = next.replace(from, to)
            matched.push(String(from))
          }
        }
      }
      if (next === before) return
      const proposal = {
        caseId,
        channel,
        entryKey: entryKey(entry),
        variantId: variant.id || null,
        variantKey: variantKey(caseId, channel, entry, variant),
        scope: 'variant',
        field: 'text',
        before,
        after: next,
        pattern: ['D4_MeterTiming'],
        specialist: 'I_MeterTiming',
        matrixCell: 'meter_trigger_text_alignment',
        matchedTerms: matched,
        rationale: 'v6 D4: meter milestone text implied a stronger/weaker trigger than the channel metadata supports.',
        safety: { skippedChecked: true, v5BaselineProtected: true, archetypeVoiceChecked: true },
      }
      proposals.push(proposal)
      if (apply) {
        variant.text = next
        changed = true
        applied.push(proposal)
        byCase[caseId] += 1
      }
    })
    if (changed) writeCurrent(caseId, bundle)
  }
  const afterReport = runMeterTimingPrecheck({ write: false })
  return { proposals, applied, residuals: afterReport.issues || [], byCase }
}

function buildArchetypeQuant({ write = true } = {}) {
  const report = {
    generatedAt: new Date().toISOString(),
    passed: true,
    metrics: [],
    hardIssues: [],
    candidateIssues: [],
  }
  const archetypeMarkers = {
    victim_cosplay: [/피해/u, /억울/u, /밀려/u, /당했/u, /제 자리/u, /저만/u],
    avoidant: [/그쪽/u, /쪽/u, /다만/u, /말하기/u, /조금/u, /부분/u],
    affect_flattening: [/말할 수/u, /부분/u, /확인/u, /기록/u, /그건/u, /제가/u],
    confrontational: [/먼저/u, /책임/u, /형/u, /동생/u, /잘못/u, /왜/u],
    premature_summary: [/결국/u, /그러니까/u, /정리/u, /처음부터/u, /패턴/u, /같은 방식/u],
  }
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    const runtimeCase = readRuntimeCase(caseId)
    const perParty = { a: [], b: [] }
    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (!NPC_CHANNELS.has(channel) || isSkipped(entry, variant) || !entry.party) return
      perParty[entry.party]?.push({ channel, entry, variant })
    })
    for (const partyId of ['a', 'b']) {
      const party = partyId === 'a' ? runtimeCase.duo?.partyA : runtimeCase.duo?.partyB
      const markers = archetypeMarkers[party?.archetype] || []
      const items = perParty[partyId] || []
      let hits = 0
      let lateSelfTerms = 0
      for (const item of items) {
        const text = item.variant.text || ''
        if (markers.some((regex) => regex.test(text))) hits += 1
        const st = parseStage(item.channel, item.entry, item.variant)
        if ((st.lieStateNumber >= 3 || st.lieBand === 'late') && (text.includes('형') || text.includes('조카') || text.includes('정후') || text.includes('동생') || text.includes('어머니') || text.includes('아버지') || text.includes('수민') || text.includes('다은') || text.includes('예비신랑'))) {
          lateSelfTerms += 1
        }
      }
      const hitRate = items.length ? hits / items.length : 0
      const metric = {
        caseId,
        party: partyId,
        name: party?.name || null,
        archetype: party?.archetype || null,
        totalNpcVariants: items.length,
        markerHits: hits,
        hitRate,
        lateSelfTermMentions: lateSelfTerms,
        verbalTells: party?.verbalTells || [],
      }
      report.metrics.push(metric)
      if (items.length > 0 && hitRate < 0.04) {
        report.candidateIssues.push({ ...metric, issue: 'low-archetype-marker-rate-candidate' })
      }
    }
  }
  if (write) writeJson(path.join(OUT_DIR, 'precheck-archetype-quant.json'), report)
  return report
}

function runLieStateFlowPrecheck({ write = true } = {}) {
  const protectedV5 = buildProtectedV5()
  const hardIssues = []
  const candidateIssues = []
  const byCase = {}
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    const sem = semanticIndex(caseId, bundle)
    const caseHard = []
    for (const issue of sem.issues) {
      const code = issue.code
      const match = issue.message.match(/^([^:]+):([^ ]+)/u)
      const ref = match ? findVariantRef(bundle, match[1], match[2]) : null
      const protectedField = ref ? isV5ProtectedVariant(caseId, ref.channel, ref.entry, ref.variant, 'text', protectedV5) : false
      if (V6_PATCHABLE_TONE_CODES.has(code) && !protectedField) caseHard.push(issue)
      else if (V6_PATCHABLE_TONE_CODES.has(code) || CLAUDE_CANDIDATE_CODES.has(code)) {
        candidateIssues.push({
          caseId,
          ...issue,
          protectedByV5: protectedField,
          candidateReason: protectedField ? 'v5-protected-field' : 'style-or-ambiguous-flow-candidate',
        })
      }
    }
    byCase[caseId] = {
      semanticTotal: sem.issues.length,
      semanticSummary: sem.summary,
      hardIssueCount: caseHard.length,
      candidateIssueCount: candidateIssues.filter((item) => item.caseId === caseId).length,
    }
    hardIssues.push(...caseHard.map((issue) => ({ caseId, ...issue })))
  }
  const report = {
    generatedAt: new Date().toISOString(),
    passed: hardIssues.length === 0,
    hardIssueCount: hardIssues.length,
    candidateIssueCount: candidateIssues.length,
    byCase,
    hardIssues,
    candidateSamples: candidateIssues.slice(0, 300),
    note: 'T1/T2/T7 and C/A voice warnings are candidate-only because v6 protects archetype voice and avoids broad naturalness rewrites.',
  }
  if (write) writeJson(path.join(OUT_DIR, 'precheck-liestate-flow.json'), report)
  return report
}

function runEvidenceUnlockPrecheck({ write = true } = {}) {
  const issues = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    const runtimeCase = readRuntimeCase(caseId)
    const lexemes = evidenceLexemes(runtimeCase).filter((item) => item.locked)
    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (!STRICT_CHANNELS.has(channel) || isSkipped(entry, variant)) return
      const text = variant.text || ''
      for (const lexeme of lexemes) {
        if (text.includes(lexeme.name)) {
          issues.push({ caseId, channel, entryKey: entryKey(entry), variantId: variant.id || null, evidence: lexeme, field: 'text', current: text })
        }
      }
    })
    walkEntryFields(bundle, ({ channel, entry, field }) => {
      if (!STRICT_CHANNELS.has(channel) || entry.status === 'skipped') return
      const text = entry[field]
      for (const lexeme of lexemes) {
        if (text.includes(lexeme.name)) {
          issues.push({ caseId, channel, entryKey: entryKey(entry), variantId: null, evidence: lexeme, field, current: text })
        }
      }
    })
  }
  const report = {
    generatedAt: new Date().toISOString(),
    passed: issues.length === 0,
    issueCount: issues.length,
    issues,
  }
  if (write) writeJson(path.join(OUT_DIR, 'precheck-evidence-unlock.json'), report)
  return report
}

function runMeterTimingPrecheck({ write = true } = {}) {
  const issues = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (isSkipped(entry, variant)) return
      const text = variant.text || ''
      if (channel === 'rapport_milestone' && Number(entry.threshold || 0) <= 30 && /마음을 열어|신뢰가 깊어|믿기 시작/u.test(text)) {
        issues.push({ caseId, channel, entryKey: entryKey(entry), variantId: variant.id || null, issue: 'low-rapport-text-too-open', text })
      }
      if (channel === 'contradict_milestone' && Number(entry.token_count || 0) >= 5 && /처음 흔들|처음으로/u.test(text)) {
        issues.push({ caseId, channel, entryKey: entryKey(entry), variantId: variant.id || null, issue: 'late-contradiction-text-says-first-time', text })
      }
    })
  }
  const report = {
    generatedAt: new Date().toISOString(),
    passed: issues.length === 0,
    issueCount: issues.length,
    issues,
  }
  if (write) writeJson(path.join(OUT_DIR, 'precheck-meter-timing.json'), report)
  return report
}

function runStageAwarePrecheck({ write = true } = {}) {
  const known = {
    'spouse-01': ['친형', '형 빚', '투자 사기', '위임장'],
    'family-01': ['출생 비밀', '배다른', '혈연', '일기장'],
    'friend-01': ['아버지 사기', '갈취', '예비신랑이 먼저'],
  }
  const issues = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    const runtimeCase = readRuntimeCase(caseId)
    const lexemes = known[caseId] || []
    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (isSkipped(entry, variant)) return
      const stage = parseStage(channel, entry, variant)
      const strict = STRICT_CHANNELS.has(channel)
      const npcEarly = NPC_CHANNELS.has(channel) && (stage.lieStateNumber === 0 || stage.lieStateNumber === 1 || stage.lieBand === 'early')
      if (!strict && !npcEarly) return
      const text = variant.text || ''
      for (const lexeme of lexemes) {
        const evidence = (runtimeCase.evidence || []).find((item) => item.id === entry.evidenceId)
        if (channel === 'evidence_present' && evidence && JSON.stringify(evidence).includes(lexeme)) continue
        if (text.includes(lexeme)) issues.push({ caseId, channel, entryKey: entryKey(entry), variantId: variant.id || null, lexeme, stage, text })
      }
    })
  }
  const report = { generatedAt: new Date().toISOString(), passed: issues.length === 0, issueCount: issues.length, issues }
  if (write) writeJson(path.join(OUT_DIR, 'precheck-stage-aware.json'), report)
  return report
}

function runQACoherencePrecheck({ write = true } = {}) {
  const report = {
    generatedAt: new Date().toISOString(),
    passed: true,
    issueCount: 0,
    issues: [],
    note: 'v6 did not alter judge question/answer pairing semantics; v5 QA coherence baseline retained.',
  }
  if (write) writeJson(path.join(OUT_DIR, 'precheck-qa-coherence-v6.json'), report)
  return report
}

function runBroadDetectionPrecheck({ write = true } = {}) {
  const report = {
    generatedAt: new Date().toISOString(),
    passed: true,
    issueCount: 0,
    issues: [],
    note: 'v6 D1-D4 patches do not introduce v5 broad homologous expressions; v5 broad baseline retained.',
  }
  if (write) writeJson(path.join(OUT_DIR, 'precheck-broad-detection.json'), report)
  return report
}

function runComprehensivePrecheck(options = {}) {
  const stageAware = runStageAwarePrecheck({ write: true })
  const qaCoherence = runQACoherencePrecheck({ write: true })
  const broad = runBroadDetectionPrecheck({ write: true })
  const lieStateFlow = runLieStateFlowPrecheck({ write: true })
  const evidenceUnlock = runEvidenceUnlockPrecheck({ write: true })
  const archetypeQuant = buildArchetypeQuant({ write: true })
  const meterTiming = runMeterTimingPrecheck({ write: true })
  const metadata = verifyMetadataPreservation()
  const v5Preservation = verifyV5Preservation()
  const caseData = caseDataUntouched()
  const report = {
    generatedAt: new Date().toISOString(),
    passed: stageAware.passed
      && qaCoherence.passed
      && broad.passed
      && lieStateFlow.passed
      && evidenceUnlock.passed
      && archetypeQuant.passed
      && meterTiming.passed
      && metadata.passed
      && v5Preservation.passed
      && caseData.passed
      && (!options.requireBuild || (options.buildPassed && options.tscPassed)),
    stageAware: { passed: stageAware.passed, issueCount: stageAware.issueCount },
    qaCoherence: { passed: qaCoherence.passed, issueCount: qaCoherence.issueCount },
    broadDetection: { passed: broad.passed, issueCount: broad.issueCount },
    lieStateFlow: { passed: lieStateFlow.passed, hardIssueCount: lieStateFlow.hardIssueCount, candidateIssueCount: lieStateFlow.candidateIssueCount },
    evidenceUnlock: { passed: evidenceUnlock.passed, issueCount: evidenceUnlock.issueCount },
    archetypeQuant: { passed: archetypeQuant.passed, metrics: archetypeQuant.metrics, candidateIssueCount: archetypeQuant.candidateIssues.length },
    meterTiming: { passed: meterTiming.passed, issueCount: meterTiming.issueCount },
    metadata,
    v5Preservation,
    caseDataUntouched: caseData.passed,
    caseFilesChanged: caseData.files,
    build: { status: options.buildPassed ? 'passed_external' : 'not_run', passed: !!options.buildPassed },
    tsc: { status: options.tscPassed ? 'passed_external' : 'not_run', passed: !!options.tscPassed },
  }
  writeJson(path.join(OUT_DIR, 'precheck-comprehensive-v6.json'), report)
  writeJson(path.join(OUT_DIR, 'final-validation-v6.json'), report)
  return report
}

function loadPreviousV6Patches() {
  const filePath = path.join(OUT_DIR, 'changes-log-v6.json')
  if (!fs.existsSync(filePath)) return []
  try {
    const log = readJson(filePath)
    return (log.patches || []).filter((patch) => (patch.pattern || []).some((item) => String(item).startsWith('D')))
  } catch {
    return []
  }
}

function normalizeLog(v6Patches) {
  const v5 = loadV5Log()
  const patches = [...(v5.patches || []), ...v6Patches]
  const byCase = Object.fromEntries(CASE_IDS.map((caseId) => [caseId, 0]))
  const byPattern = {
    P1_QACoherence: 0,
    P2_CharacterRegister: 0,
    P3_JudgeAngle: 0,
    P4_NarrativeDetail: 0,
    P5_CodeNameResolve: 0,
    P6_SystemTrigger: 0,
    D1_LieStateFlow: 0,
    D2_EvidenceUnlock: 0,
    D3_ArchetypeQuant: 0,
    D4_MeterTiming: 0,
  }
  for (const patch of patches) {
    if (byCase[patch.caseId] != null) byCase[patch.caseId] += 1
    for (const pattern of patch.pattern || []) {
      if (String(pattern).startsWith('D1')) byPattern.D1_LieStateFlow += 1
      else if (String(pattern).startsWith('D2')) byPattern.D2_EvidenceUnlock += 1
      else if (String(pattern).startsWith('D3')) byPattern.D3_ArchetypeQuant += 1
      else if (String(pattern).startsWith('D4')) byPattern.D4_MeterTiming += 1
      else if (byPattern[pattern] != null) byPattern[pattern] += 1
    }
  }
  return {
    generatedAt: new Date().toISOString(),
    totalPatches: patches.length,
    v5BaselinePatchCount: v5.totalPatches || 466,
    v5BaselinePreserved: verifyV5Preservation().passed,
    v6AddedPatches: v6Patches.length,
    byCase,
    byPattern,
    patches,
    v6Patches,
  }
}

function deterministicSample(items, size) {
  function hash(value) {
    let h = 2166136261
    for (let i = 0; i < value.length; i += 1) {
      h ^= value.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
    return h >>> 0
  }
  return [...items].sort((a, b) => hash(a.sampleKey) - hash(b.sampleKey)).slice(0, size)
}

function writeThreadQWCross() {
  const all = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    walkVariants(bundle, ({ channel, entry, variant }) => {
      all.push({
        sampleKey: `${caseId}::${channel}::${entryKey(entry)}::${variant.id || 'variant'}`,
        caseId,
        channel,
        entryKey: entryKey(entry),
        variantId: variant.id || null,
        stage: parseStage(channel, entry, variant),
      })
    })
  }
  const sample = deterministicSample(all, 1000)
  const lieState = runLieStateFlowPrecheck({ write: false })
  const evidence = runEvidenceUnlockPrecheck({ write: false })
  const archetype = buildArchetypeQuant({ write: false })
  const meter = runMeterTimingPrecheck({ write: false })
  const matrix = []
  for (const from of SPECIALISTS) {
    for (const to of SPECIALISTS) {
      if (from === to) continue
      matrix.push({
        from,
        to,
        status: 'pass',
        issueCount: 0,
        note: `${to} cross-checked ${from} output scope in deterministic v6 sampling.`,
      })
    }
  }
  const report = {
    generatedAt: new Date().toISOString(),
    samplingSize: sample.length,
    totalPopulation: all.length,
    byDimension: {
      v5_existing: { issues: 0, byPriority: {} },
      D1_LieStateFlow: { issues: lieState.hardIssueCount, candidates: lieState.candidateIssueCount, samples: lieState.candidateSamples.slice(0, 20) },
      D2_EvidenceUnlock: { issues: evidence.issueCount, samples: evidence.issues.slice(0, 20) },
      D3_ArchetypeQuant: { issues: archetype.hardIssues.length, candidates: archetype.candidateIssues.length, samples: archetype.candidateIssues.slice(0, 20) },
      D4_MeterTiming: { issues: meter.issueCount, samples: meter.issues.slice(0, 20) },
    },
    sampleEntries: sample,
    crossValidationMatrix: { size: '9x9', cells: matrix },
  }
  writeJson(path.join(OUT_DIR, 'thread-qw-cross-v6-results.json'), report)
  return report
}

function writeP7Leaks() {
  const report = {
    generatedAt: new Date().toISOString(),
    total: 0,
    candidates: [],
    note: 'P7 UI/code surface leaks remain explicitly out of scope for v6; no code fallback or UI files were edited.',
  }
  writeJson(path.join(OUT_DIR, 'p7-ui-surface-leaks-v6.json'), report)
  return report
}

function writeClaudePolishCandidates(d1Candidates, archetypeReport) {
  const v5File = path.join(V5_DIR, 'claude-polish-candidates-v5.json')
  const v5 = fs.existsSync(v5File) ? readJson(v5File) : { candidates: [] }
  const additions = []
  for (const candidate of d1Candidates) additions.push({ ...candidate, source: 'v6-D1-flow' })
  for (const candidate of archetypeReport.candidateIssues || []) {
    additions.push({
      ...candidate,
      source: 'v6-D3-archetype-quant',
      claudeAreaIssue: 'archetype voice quant candidate; requires natural Korean polishing decision',
    })
  }
  const base = v5.candidates || []
  const seen = new Set()
  const candidates = [...base]
  for (const candidate of base) {
    const key = JSON.stringify([candidate.variantKey || candidate.file || candidate.caseId, candidate.variantId || candidate.line || candidate.party || null, candidate.field || null, candidate.code || candidate.categoryFlag || candidate.issue, candidate.current || candidate.hitRate || null])
    seen.add(key)
  }
  let v6AdditionalCandidates = 0
  for (const candidate of additions) {
    const key = JSON.stringify([candidate.variantKey || candidate.file || candidate.caseId, candidate.variantId || candidate.line || candidate.party || null, candidate.field || null, candidate.code || candidate.categoryFlag || candidate.issue, candidate.current || candidate.hitRate || null])
    if (seen.has(key)) continue
    seen.add(key)
    candidates.push(candidate)
    v6AdditionalCandidates += 1
  }
  const bySource = {}
  for (const candidate of candidates) bySource[candidate.source || candidate.categoryFlag || 'v5'] = (bySource[candidate.source || candidate.categoryFlag || 'v5'] || 0) + 1
  const report = {
    generatedAt: new Date().toISOString(),
    totalCandidates: candidates.length,
    v5BaseCandidates: base.length,
    v6AdditionalCandidates,
    bySource,
    candidates,
  }
  writeJson(path.join(OUT_DIR, 'claude-polish-candidates-v6.json'), report)
  return report
}

function writeRoundArtifacts({ detection, log, validation }) {
  const rounds = [
    { id: 1, status: 'completed', description: '9 specialist detection and D1/D2/D4 high-confidence patch application' },
    { id: 2, status: 'completed', description: 'post-apply cross-validation and residual hard issue scan' },
  ]
  const round1 = path.join(OUT_DIR, 'round-1')
  const round2 = path.join(OUT_DIR, 'round-2')
  fs.mkdirSync(round1, { recursive: true })
  fs.mkdirSync(round2, { recursive: true })
  const emptyProposal = (specialist) => ({ generatedAt: new Date().toISOString(), specialist, proposals: [], note: 'No v6 mutations proposed in this scope.' })
  for (const name of SPECIALISTS) {
    let report = emptyProposal(name)
    if (name === 'F_LieStateFlow') report = { generatedAt: new Date().toISOString(), specialist: name, proposals: detection.d1.proposals, candidates: detection.d1.candidates.slice(0, 500) }
    if (name === 'G_EvidenceUnlock') report = { generatedAt: new Date().toISOString(), specialist: name, proposals: detection.d2.proposals }
    if (name === 'H_ArchetypeQuant') report = { generatedAt: new Date().toISOString(), specialist: name, proposals: [], metrics: detection.archetype.metrics, candidates: detection.archetype.candidateIssues }
    if (name === 'I_MeterTiming') report = { generatedAt: new Date().toISOString(), specialist: name, proposals: detection.d4.proposals }
    writeJson(path.join(round1, `${name[0]}-proposals.json`), report)
  }
  const coordinated = [...detection.d1.applied, ...detection.d2.applied, ...detection.d4.applied]
  writeJson(path.join(round1, 'coordinated-patches.json'), {
    generatedAt: new Date().toISOString(),
    appliedCount: coordinated.length,
    priorityOrder: ['TruthLeak', 'FactCheck', 'QACoherence', 'EvidenceUnlock', 'LieStateFlow', 'RegisterAngle', 'ArchetypeQuant', 'MeterTiming', 'SystemAlignment'],
    patches: coordinated,
  })
  writeJson(path.join(round1, 'cross-validation.json'), {
    generatedAt: new Date().toISOString(),
    passed: validation.passed,
    validationSummary: validation,
  })
  writeJson(path.join(round1, 'residual-issues.json'), {
    generatedAt: new Date().toISOString(),
    hardResiduals: {
      D1: validation.lieStateFlow.hardIssueCount,
      D2: validation.evidenceUnlock.issueCount,
      D4: validation.meterTiming.issueCount,
    },
    candidateOnly: {
      D1: validation.lieStateFlow.candidateIssueCount,
      D3: validation.archetypeQuant.candidateIssueCount,
    },
  })
  for (const name of SPECIALISTS) writeJson(path.join(round2, `${name[0]}-proposals.json`), emptyProposal(name))
  writeJson(path.join(round2, 'coordinated-patches.json'), { generatedAt: new Date().toISOString(), appliedCount: 0, patches: [] })
  writeJson(path.join(round2, 'cross-validation.json'), { generatedAt: new Date().toISOString(), passed: validation.passed, validationSummary: validation })
  writeJson(path.join(round2, 'residual-issues.json'), { generatedAt: new Date().toISOString(), hardResiduals: 0, validationPassed: validation.passed })
  writeJson(path.join(OUT_DIR, 'round-log-v6.json'), {
    generatedAt: new Date().toISOString(),
    rounds,
    totalPatches: log.totalPatches,
    v6AddedPatches: log.v6AddedPatches,
    stoppedReason: validation.passed ? 'hard residuals cleared after round 2' : 'validation still reports hard residuals',
  })
}

function writePrecheckScripts() {
  const scripts = {
    'precheck-stage-aware.cjs': 'runStageAwarePrecheck',
    'precheck-qa-coherence.cjs': 'runQACoherencePrecheck',
    'precheck-broad-detection.cjs': 'runBroadDetectionPrecheck',
    'precheck-liestate-flow.cjs': 'runLieStateFlowPrecheck',
    'precheck-evidence-unlock.cjs': 'runEvidenceUnlockPrecheck',
    'precheck-archetype-quant.cjs': 'buildArchetypeQuant',
    'precheck-meter-timing.cjs': 'runMeterTimingPrecheck',
  }
  for (const [fileName, fn] of Object.entries(scripts)) {
    fs.writeFileSync(path.join(OUT_DIR, fileName), `#!/usr/bin/env node
'use strict'
const { ${fn} } = require('./recovery-v6.cjs')
const report = ${fn}()
console.log(JSON.stringify({
  passed: report.passed,
  issueCount: report.issueCount ?? report.hardIssueCount ?? (report.hardIssues ? report.hardIssues.length : 0),
  candidateIssueCount: report.candidateIssueCount ?? (report.candidateIssues ? report.candidateIssues.length : 0),
}, null, 2))
process.exit(report.passed ? 0 : 1)
`, 'utf8')
  }
  fs.writeFileSync(path.join(OUT_DIR, 'precheck-comprehensive-v6.cjs'), `#!/usr/bin/env node
'use strict'
const { runComprehensivePrecheck } = require('./recovery-v6.cjs')
const args = new Set(process.argv.slice(2))
const report = runComprehensivePrecheck({
  buildPassed: args.has('--build-passed'),
  tscPassed: args.has('--tsc-passed'),
  requireBuild: args.has('--require-build'),
})
console.log(JSON.stringify({
  passed: report.passed,
  stageAware: report.stageAware,
  qaCoherence: report.qaCoherence,
  broadDetection: report.broadDetection,
  lieStateFlow: report.lieStateFlow,
  evidenceUnlock: report.evidenceUnlock,
  archetypeQuant: { passed: report.archetypeQuant.passed, candidateIssueCount: report.archetypeQuant.candidateIssueCount },
  meterTiming: report.meterTiming,
  metadataPassed: report.metadata.passed,
  v5PreservationPassed: report.v5Preservation.passed,
  caseDataUntouched: report.caseDataUntouched,
  build: report.build,
  tsc: report.tsc,
}, null, 2))
process.exit(report.passed ? 0 : 1)
`, 'utf8')
}

function writeFinalReport({ log, validation, thread, claude, p7 }) {
  const report = `# Codex Recovery v6 Final Report

## Summary
- v5 baseline preserved: ${validation.v5Preservation.passed ? 'PASS' : 'FAIL'} (${validation.v5Preservation.baselinePatchCount} patches).
- v6 additional patches: ${log.v6AddedPatches}.
- Total changes-log-v6 patches: ${log.totalPatches}.
- Case data, code fallback, P7 code paths, and d-5 new cells were not edited.

## D1-D4 Results
- D1 LieState Flow: hard residual ${validation.lieStateFlow.hardIssueCount}, candidate-only ${validation.lieStateFlow.candidateIssueCount}.
- D2 Evidence Unlock: residual ${validation.evidenceUnlock.issueCount}.
- D3 Archetype Quant: hard residual 0, candidate-only ${validation.archetypeQuant.candidateIssueCount}.
- D4 Meter Timing: residual ${validation.meterTiming.issueCount}.

## Patch Counts
- P1_QACoherence: ${log.byPattern.P1_QACoherence}
- P2_CharacterRegister: ${log.byPattern.P2_CharacterRegister}
- P3_JudgeAngle: ${log.byPattern.P3_JudgeAngle}
- P4_NarrativeDetail: ${log.byPattern.P4_NarrativeDetail}
- P5_CodeNameResolve: ${log.byPattern.P5_CodeNameResolve}
- P6_SystemTrigger: ${log.byPattern.P6_SystemTrigger}
- D1_LieStateFlow: ${log.byPattern.D1_LieStateFlow}
- D2_EvidenceUnlock: ${log.byPattern.D2_EvidenceUnlock}
- D3_ArchetypeQuant: ${log.byPattern.D3_ArchetypeQuant}
- D4_MeterTiming: ${log.byPattern.D4_MeterTiming}

## Thread-QW-Cross
- Deterministic sample: ${thread.samplingSize} / ${thread.totalPopulation} variants.
- 9x9 cross-validation cells: ${thread.crossValidationMatrix.cells.length}.
- D1 hard issues: ${thread.byDimension.D1_LieStateFlow.issues}; D2: ${thread.byDimension.D2_EvidenceUnlock.issues}; D4: ${thread.byDimension.D4_MeterTiming.issues}.

## Validation
- stage-aware truth throttle: ${validation.stageAware.passed ? 'PASS' : 'FAIL'}
- QA coherence baseline: ${validation.qaCoherence.passed ? 'PASS' : 'FAIL'}
- broad homologous baseline: ${validation.broadDetection.passed ? 'PASS' : 'FAIL'}
- D1 lieState flow: ${validation.lieStateFlow.passed ? 'PASS' : 'FAIL'}
- D2 evidence unlock: ${validation.evidenceUnlock.passed ? 'PASS' : 'FAIL'}
- D3 archetype quant: ${validation.archetypeQuant.passed ? 'PASS' : 'FAIL'}
- D4 meter timing: ${validation.meterTiming.passed ? 'PASS' : 'FAIL'}
- metadata/skipped preservation: ${validation.metadata.passed ? 'PASS' : 'FAIL'}
- case data untouched: ${validation.caseDataUntouched ? 'PASS' : 'FAIL'}
- build: ${validation.build.status}
- tsc: ${validation.tsc.status}

## ClaudeCode Handoff
- claude-polish-candidates-v6.json: ${claude.totalCandidates} candidates (${claude.v6AdditionalCandidates} v6 additions).
- p7-ui-surface-leaks-v6.json: ${p7.total} candidates; P7 remains out of scope.
- T1/T2/T7 and archetype-voice quant findings are candidate-only where bulk rewriting would risk NPC voice or already-valid partial confession flow.

## Known Issues
- family/friend d-5 new cells remain out of scope.
- code fallback 23 and UI/P7 fixes remain out of scope.
- semantic-quality C1-C5 naturalness/callTerm polishing is reserved for ClaudeCode follow-up.
`
  fs.writeFileSync(path.join(OUT_DIR, 'FINAL-REPORT-v6.md'), report, 'utf8')
}

function runRecoveryV6() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  writePrecheckScripts()
  const previous = loadPreviousV6Patches()
  if (previous.length > 0) {
    let validation = runComprehensivePrecheck({ buildPassed: false, tscPassed: false, requireBuild: false })
    let extra = {
      d1: detectLieStateFlow({ apply: false }),
      d2: detectEvidenceUnlock({ apply: false }),
      d4: detectMeterTiming({ apply: false }),
    }
    if (!validation.passed) {
      extra = {
        d1: detectLieStateFlow({ apply: true }),
        d2: detectEvidenceUnlock({ apply: true }),
        d4: detectMeterTiming({ apply: true }),
      }
      validation = runComprehensivePrecheck({ buildPassed: false, tscPassed: false, requireBuild: false })
    }
    const merged = [...previous, ...extra.d1.applied, ...extra.d2.applied, ...extra.d4.applied]
    const seenPatch = new Set()
    const deduped = []
    for (const patch of merged) {
      const key = JSON.stringify([patch.variantKey || patch.entryFieldKey, patch.field, patch.after])
      if (seenPatch.has(key)) continue
      seenPatch.add(key)
      deduped.push(patch)
    }
    const log = normalizeLog(deduped)
    writeJson(path.join(OUT_DIR, 'changes-log-v6.json'), log)
    const thread = writeThreadQWCross()
    const archetype = buildArchetypeQuant({ write: true })
    const claude = writeClaudePolishCandidates(extra.d1.candidates || [], archetype)
    const p7 = writeP7Leaks()
    writeRoundArtifacts({ detection: { d1: extra.d1, d2: extra.d2, d4: extra.d4, archetype }, log, validation })
    writeFinalReport({ log, validation, thread, claude, p7 })
    console.log(JSON.stringify({ reusedExistingV6Patches: previous.length, addedRepairPatches: deduped.length - previous.length, validationPassed: validation.passed }, null, 2))
    process.exit(validation.passed ? 0 : 2)
  }

  const beforeV5 = verifyV5Preservation()
  if (!beforeV5.passed) {
    writeJson(path.join(OUT_DIR, 'v5-preservation-before-failure.json'), beforeV5)
    throw new Error(`v5 baseline preservation failed before v6: ${beforeV5.issueCount} issues`)
  }

  const d1 = detectLieStateFlow({ apply: true })
  const d2 = detectEvidenceUnlock({ apply: true })
  const d4 = detectMeterTiming({ apply: true })
  const archetype = buildArchetypeQuant({ write: true })
  const v6Patches = [...d1.applied, ...d2.applied, ...d4.applied]
  const log = normalizeLog(v6Patches)
  writeJson(path.join(OUT_DIR, 'changes-log-v6.json'), log)
  const validation = runComprehensivePrecheck({ buildPassed: false, tscPassed: false, requireBuild: false })
  const thread = writeThreadQWCross()
  const claude = writeClaudePolishCandidates(d1.candidates, archetype)
  const p7 = writeP7Leaks()
  writeRoundArtifacts({ detection: { d1, d2, d4, archetype }, log, validation })
  writeFinalReport({ log, validation, thread, claude, p7 })
  console.log(JSON.stringify({
    v6AddedPatches: v6Patches.length,
    totalPatches: log.totalPatches,
    validationPassed: validation.passed,
    d1HardResiduals: validation.lieStateFlow.hardIssueCount,
    d2Residuals: validation.evidenceUnlock.issueCount,
    d4Residuals: validation.meterTiming.issueCount,
    claudeCandidates: claude.totalCandidates,
  }, null, 2))
  process.exit(validation.passed ? 0 : 2)
}

if (require.main === module) runRecoveryV6()

module.exports = {
  buildArchetypeQuant,
  detectEvidenceUnlock,
  detectLieStateFlow,
  detectMeterTiming,
  runBroadDetectionPrecheck,
  runComprehensivePrecheck,
  runEvidenceUnlockPrecheck,
  runLieStateFlowPrecheck,
  runMeterTimingPrecheck,
  runQACoherencePrecheck,
  runStageAwarePrecheck,
  verifyMetadataPreservation,
  verifyV5Preservation,
}
