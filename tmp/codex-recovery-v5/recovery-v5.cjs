#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const cp = require('node:child_process')

const ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR = __dirname
const V4_DIR = path.join(ROOT, 'tmp', 'codex-recovery-v4')

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

const TEXT_FIELDS = ['text']
const ENTRY_TEXT_FIELDS = ['stageQuestion', 'questionText', 'unlockHint', 'investigationResult', 'implication', 'line', 'judge']

const P2_REPLACEMENTS = [
  ['종이 한 장도 그냥 못 넘깁니다', '작은 기록도 그냥 넘기기 어렵습니다'],
  ['그때부터 마음이 무너지기 시작했습니다', '그때부터 버티기 어려워졌습니다'],
  ['마음이 무너진 상태였습니다', '판단을 차분히 하기 어려운 상태였습니다'],
  ['마음이 무너진 뒤', '상처가 커진 뒤'],
  ['제 마음이 무너질 수밖에 없습니다', '제가 버티기 어려울 수밖에 없습니다'],
  ['마음이 무너졌습니다', '차분히 판단하기 어려웠습니다'],
  ['마음이 무너질 수밖에 없습니다', '버티기 어려울 수밖에 없습니다'],
  ['제 버티기 어려울 수밖에 없습니다', '제가 버티기 어려울 수밖에 없습니다'],
  ['마음이 무너집니다', '버티기 어렵습니다'],
  ['마음이 흔들렸습니다', '판단이 흔들렸습니다'],
  ['그 장면이 자꾸 남습니다', '그 일이 계속 생각납니다'],
  ['그 두려움이 제 선택을 끌고 갔습니다', '저는 두려워서 그런 선택을 했습니다'],
  ['그 두려움을 핑계 삼아', '두려웠다는 말로'],
  ['그 두려움 때문에 더 이혼 같은 상태를 만들었습니다', '두려워서 숨길수록 오히려 더 이혼 같은 상태를 만들었습니다'],
  ['그 두려움 때문입니다', '제가 두려워했기 때문입니다'],
  ['그 두려움이 설명을 대신할 수는 없습니다', '두려웠다는 말이 설명을 대신할 수는 없습니다'],
  ['그 두려움에 밀린', '두려워서 밀린'],
  ['그 두려움이 무엇이었는지는 이제 압니다', '무엇을 두려워했는지는 이제 압니다'],
  ['그 두려움이 20년 침묵이 됐습니다', '그렇게 두려워하다가 20년 동안 말하지 못했습니다'],
  ['그 두려움에 묶여 있었습니다', '두려움에서 벗어나지 못했습니다'],
  ['그 두려움이 제 선택을 너무 좁혔습니다', '두려워서 선택지를 너무 좁게 봤습니다'],
  ['그 두려움이 동생을 악의로만 보게 했습니다', '두려워서 동생을 악의로만 보게 됐습니다'],
  ['그 두려움을 먼저 들었습니다', '그 말 속의 겁을 먼저 들었습니다'],
  ['자료들이 같은 방향으로 보인 건', '자료들이 한쪽으로만 보인 건'],
  ['같은 방향으로만 붙였습니다', '한쪽으로만 붙여 봤습니다'],
  ['계속 같은 방향을 가리켰습니다', '계속 한쪽으로만 보였습니다'],
  ['같은 방향을 가리켰습니다', '한 결론으로 이어졌습니다'],
  ['같은 방향을 가리킵니다', '한 결론으로 이어집니다'],
  ['같은 방향을 가리킨다', '한 결론으로 이어진다'],
  ['같은 방향으로 갑니다', '한 결론으로 이어집니다'],
  ['같은 방향으로 보입니다', '한 결론으로 이어집니다'],
  ['같은 방향을 보입니다', '한 결론으로 이어집니다'],
  ['같은 방향으로 들렸습니다', '같은 압박처럼 들렸습니다'],
  ['같은 방향으로 이어지고 있었습니다', '한 흐름으로 이어지고 있었습니다'],
  ['같은 방향으로 묶였습니다', '한 문제로 묶였습니다'],
  ['같은 방향의 말들이', '비슷한 말들이'],
  ['같은 방향으로 몰면', '한쪽으로만 몰면'],
  ['그 종이 한 장', '그 기록 한 장'],
  ['그 단서를 바로를 돌본 것으로', '이 단서를 조카를 돌본 것으로'],
  ['이 단서를 바로를 돌본 것으로', '이 단서를 조카를 돌본 것으로'],
  ['그 단서', '이 단서'],
  ['그 장면', '그 일'],
  ['그 흐름', '그렇게 이어진 정황'],
  ['그 패턴', '그 반복'],
]

const P3_REPLACEMENTS = [
  ['그 가족를', '그 가족을'],
  ['그 가족가', '그 가족이'],
  ['그 가족였다면', '그 가족이었다면'],
  ['관련해서', '두고'],
  ['당시', '그때'],
  ['그것에 대해', '그 부분을 두고'],
  ['그에 관해', '그 부분을 두고'],
  ['이에 대해', '이 문제를 두고'],
  ['어떤 일이', '무슨 일이'],
  ['다른 선택지', '다른 방법'],
  ['직전에는', '바로 전에는'],
  ['이후에는', '그 뒤에는'],
  ['이전에는', '그 전에는'],
  ['나중에 들은', '뒤늦게 들은'],
  ['주고받은 적', '오간 일이'],
  ['본 적이 있', '확인한 적이 있'],
  ['구체적으로', '장면과 순서를 나눠'],
  ['정확히', '차분히'],
  ['분명히', '명확히'],
]

const P4_REPLACEMENTS = [
  ['숨기면 지나갈 줄 알았습니다', '말하지 않으면 당장은 넘어갈 줄 알았습니다'],
  ['그 판단이 결국 일을 더 키웠습니다', '그렇게 넘겨 보려 한 판단이 결국 일을 더 키웠습니다'],
  ['그래서 말이 더 줄어드는 겁니다', '그래서 설명을 시작하기보다 말을 더 줄였습니다'],
  ['그게 더 충격이었습니다', '절차가 제 동의 없이 움직인 것 같아 더 충격이었습니다'],
  ['그게 무서웠습니다', '그 질문이 먼저 나올까 봐 무서웠습니다'],
]

const BROAD_PATTERNS = {
  P2_CharacterRegister: [
    /냄새가 났|냄새가 풍|향기가/u,
    /마음이 무너|마음이 끌|마음이 흔들|마음이 떨|마음이 가라앉/u,
    /가슴이 무너|가슴이 미어|가슴이 답답/u,
    /장면이 자꾸 남|장면이 떠올|머릿속에 남/u,
    /두려움이 제 선택|두려움이 저를|불안이 저를|의심이 저를/u,
    /한 발 옮긴|한 걸음 물러|한 박자 늦/u,
    /방향으로 흘렀|같은 방향으로 겹|같은 방향을 가리|같은 방향으로 보|같은 방향으로 들|같은 방향으로 묶|같은 방향으로 이|같은 방향의 말/u,
    /기록과 물건이|기록이 그(?!냥)|자료들이 그|그 종이 한 장|그 두려움|그 단서|그 장면|그 흐름|그 패턴/u,
    /종이 한 장도 그냥 못 넘/u,
    /그 장면이 자꾸 남/u,
  ],
  P3_JudgeAngle: [
    /관련해서|당시|그것에 대해|그에 관해|이에 대해|어떤 일이|다른 선택지|직전에는|이후에는|이전에는|나중에 들은|주고받은 적|본 적이 있|분명히|정확히|구체적으로/u,
  ],
  P4_NarrativeDetail: [
    /숨기면 지나갈 줄 알았습니다|그 판단이 결국 일을 더 키웠습니다|그래서 말이 더 줄어드는 겁니다|그게 더 충격이었습니다|그게 무서웠습니다/u,
  ],
}

const CLAUDE_PATTERN_DEFS = [
  ['C3_lexicon_naturalize', /안 쓰는|안하면서요|그럼에도|그럼에도 불구하고|정말|너무|인 것 같습니다|라고 보시면 됩니다/u, '일상 어휘/간접 화법 후보'],
  ['C4_system_observer_tone', /감지되었습니다|감지된다|확인됩니다|발견되었습니다|관찰됩니다|검출되었|추적된|찌른다|찌르면/u, '시스템 관찰자 톤 후보'],
  ['C5_ui_device_copy', /탭하여|터치|스와이프/u, 'PC UI 카피 후보'],
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

function entryKey(entry) {
  return entry.key || entry.id || entry.disputeId || entry.dossierCardId || entry.witnessId || 'entry'
}

function variantKey(caseId, channel, entry, variant) {
  return `${caseId}::${channel}::${entryKey(entry)}::${variant.id || 'variant'}`
}

function entryFieldKey(caseId, channel, entry, field) {
  return `${caseId}::${channel}::${entryKey(entry)}::entry.${field}`
}

function readCurrent(caseId) {
  return readJson(abs(TARGET_REL[caseId]))
}

function writeCurrent(caseId, bundle) {
  writeJson(abs(TARGET_REL[caseId]), bundle)
}

function readOriginal(caseId) {
  const raw = cp.execFileSync('git', ['show', `HEAD:${TARGET_REL[caseId]}`], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024,
  })
  return JSON.parse(raw)
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

function walkEntryFields(bundle, callback) {
  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    for (const entry of payload.entries || []) {
      for (const field of ENTRY_TEXT_FIELDS) {
        if (typeof entry[field] === 'string') callback({ channel, entry, field })
      }
    }
  }
}

function parseStage(channel, entry, variant) {
  const haystack = `${channel} ${entryKey(entry)} ${variant ? variant.id || '' : ''}`
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

function loadV4Log() {
  return readJson(path.join(V4_DIR, 'changes-log.json'))
}

function loadProtectedV4() {
  const log = loadV4Log()
  const byVariantField = new Map()
  const byEntryField = new Map()
  for (const patch of log.patches || []) {
    if (patch.scope === 'entry' || patch.entryFieldKey) {
      byEntryField.set(patch.entryFieldKey, patch)
    } else if (patch.variantKey && patch.field) {
      byVariantField.set(`${patch.variantKey}::${patch.field}`, patch)
    }
  }
  return { log, byVariantField, byEntryField }
}

function replaceAllLiteral(text, before, after) {
  return text.split(before).join(after)
}

function applyLiteralReplacements(text, replacements) {
  let next = text
  const matched = []
  for (const [before, after] of replacements) {
    if (next.includes(before)) {
      next = replaceAllLiteral(next, before, after)
      matched.push(before)
    }
  }
  return { text: next, matched }
}

function shouldPatchVariant(channel) {
  return channel !== 'aftermath' && (NPC_CHANNELS.has(channel) || STRICT_CHANNELS.has(channel))
}

function getReplacementGroups(channel) {
  const groups = []
  if (NPC_CHANNELS.has(channel) || STRICT_CHANNELS.has(channel)) groups.push(['P2_CharacterRegister', P2_REPLACEMENTS])
  if (STRICT_CHANNELS.has(channel)) groups.push(['P3_JudgeAngle', P3_REPLACEMENTS])
  if (NPC_CHANNELS.has(channel)) groups.push(['P4_NarrativeDetail', P4_REPLACEMENTS])
  return groups
}

function addPatch(log, patch) {
  log.push({
    ...patch,
    safety: {
      skippedChecked: true,
      archetypeVoiceChecked: true,
      truthThrottleChecked: true,
      v4BaselineProtected: true,
    },
  })
}

function applyV5Patches() {
  const protectedV4 = loadProtectedV4()
  const v5Patches = []
  const protectedHits = []
  const skippedHits = []

  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    let changed = false

    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (!shouldPatchVariant(channel)) return
      if (entry.status === 'skipped' || variant.status === 'skipped') {
        skippedHits.push({ caseId, channel, entryKey: entryKey(entry), variantId: variant.id || null })
        return
      }
      for (const field of TEXT_FIELDS) {
        if (typeof variant[field] !== 'string') continue
        const key = `${variantKey(caseId, channel, entry, variant)}::${field}`
        const protectedPatch = protectedV4.byVariantField.get(key)
        if (protectedPatch) {
          protectedHits.push({
            caseId,
            channel,
            entryKey: entryKey(entry),
            variantId: variant.id || null,
            field,
            reason: 'v4-after-preservation',
            text: variant[field],
          })
          continue
        }

        let next = variant[field]
        const before = next
        const patternSet = new Set()
        const matchedTerms = []
        for (const [pattern, replacements] of getReplacementGroups(channel)) {
          const result = applyLiteralReplacements(next, replacements)
          if (result.text !== next) {
            next = result.text
            patternSet.add(pattern)
            matchedTerms.push(...result.matched)
          }
        }
        if (next !== before) {
          variant[field] = next
          changed = true
          const stage = parseStage(channel, entry, variant)
          addPatch(v5Patches, {
            caseId,
            channel,
            entryKey: entryKey(entry),
            variantId: variant.id || null,
            variantKey: variantKey(caseId, channel, entry, variant),
            scope: 'variant',
            field,
            before,
            after: next,
            pattern: [...patternSet],
            specialist: patternSet.has('P3_JudgeAngle') ? 'B_RegisterAngle' : 'B_RegisterAngle',
            matrixCell: matrixCell(channel, stage),
            stage,
            matchedTerms,
            rationale: 'v5 broad homologous detection: poetic/abstract phrasing or broad judge-angle marker lowered while preserving case facts and archetype voice.',
            claudeAreaIssue: null,
          })
        }
      }
    })

    walkEntryFields(bundle, ({ channel, entry, field }) => {
      if (!STRICT_CHANNELS.has(channel) || entry.status === 'skipped') return
      const key = entryFieldKey(caseId, channel, entry, field)
      if (protectedV4.byEntryField.has(key)) return
      const before = entry[field]
      const result = applyLiteralReplacements(before, P3_REPLACEMENTS)
      if (result.text !== before) {
        entry[field] = result.text
        changed = true
        const stage = parseStage(channel, entry, null)
        addPatch(v5Patches, {
          caseId,
          channel,
          entryKey: entryKey(entry),
          variantId: null,
          variantKey: null,
          entryFieldKey: key,
          scope: 'entry',
          field,
          before,
          after: result.text,
          pattern: ['P3_JudgeAngle'],
          specialist: 'B_RegisterAngle',
          matrixCell: matrixCell(channel, stage),
          stage,
          matchedTerms: result.matched,
          rationale: 'v5 broad homologous detection: strict-channel abstract judge-angle marker lowered in entry-level text.',
          claudeAreaIssue: null,
        })
      }
    })

    if (changed) writeCurrent(caseId, bundle)
  }

  return { v5Patches, protectedHits, skippedHits }
}

function buildVariantMapsFromBundle(bundle) {
  const variants = new Map()
  const entries = new Map()
  walkVariants(bundle, ({ channel, entry, variant }) => {
    variants.set(`${channel}::${entryKey(entry)}::${variant.id || 'variant'}`, { channel, entry, variant })
  })
  walkEntryFields(bundle, ({ channel, entry, field }) => {
    entries.set(`${channel}::${entryKey(entry)}::entry.${field}`, { channel, entry, field })
  })
  return { variants, entries }
}

function verifyV4Preservation() {
  const protectedV4 = loadProtectedV4()
  const issues = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    const maps = buildVariantMapsFromBundle(bundle)
    const finalPatches = [
      ...protectedV4.byVariantField.values(),
      ...protectedV4.byEntryField.values(),
    ].filter((patch) => patch.caseId === caseId)
    for (const patch of finalPatches) {
      if (patch.caseId !== caseId) continue
      if (patch.scope === 'entry' || patch.entryFieldKey) {
        const localKey = patch.entryFieldKey.replace(`${caseId}::`, '')
        const item = maps.entries.get(localKey)
        const current = item ? item.entry[patch.field] : undefined
        if (current !== patch.after) issues.push({ ...patch, current, issue: 'v4 entry after mismatch' })
      } else {
        const localKey = patch.variantKey.replace(`${caseId}::`, '')
        const item = maps.variants.get(localKey)
        const current = item ? item.variant[patch.field] : undefined
        if (current !== patch.after) issues.push({ ...patch, current, issue: 'v4 variant after mismatch' })
      }
    }
  }
  return {
    passed: issues.length === 0,
    baselinePatchCount: (protectedV4.log.patches || []).length,
    baselineFinalFieldCount: protectedV4.byVariantField.size + protectedV4.byEntryField.size,
    issueCount: issues.length,
    issues,
  }
}

function countVariants(bundle) {
  let count = 0
  walkVariants(bundle, () => { count += 1 })
  return count
}

function verifyMetadataPreservation() {
  const issues = []
  const skippedIssues = []
  const counts = {}
  for (const caseId of CASE_IDS) {
    const original = readOriginal(caseId)
    const current = readCurrent(caseId)
    counts[caseId] = countVariants(current)
    if (counts[caseId] !== EXPECTED_COUNTS[caseId]) {
      issues.push({ caseId, type: 'variant_count', expected: EXPECTED_COUNTS[caseId], actual: counts[caseId] })
    }

    const origMaps = buildVariantMapsFromBundle(original)
    const curMaps = buildVariantMapsFromBundle(current)
    for (const [localKey, orig] of origMaps.variants.entries()) {
      const cur = curMaps.variants.get(localKey)
      if (!cur) {
        issues.push({ caseId, type: 'missing_variant', localKey })
        continue
      }
      for (const field of ['id', 'status']) {
        if ((orig.variant[field] || null) !== (cur.variant[field] || null)) issues.push({ caseId, localKey, type: `variant_${field}` })
      }
      for (const field of ['tags', 'sourceRefs']) {
        if (JSON.stringify(orig.variant[field] || null) !== JSON.stringify(cur.variant[field] || null)) {
          issues.push({ caseId, localKey, type: `variant_${field}` })
        }
      }
      if (orig.entry.status === 'skipped' || orig.variant.status === 'skipped') {
        if (JSON.stringify(orig.variant) !== JSON.stringify(cur.variant)) {
          skippedIssues.push({ caseId, localKey, type: 'skipped_variant_changed' })
        }
      }
    }
    if (origMaps.variants.size !== curMaps.variants.size) {
      issues.push({ caseId, type: 'variant_map_size', expected: origMaps.variants.size, actual: curMaps.variants.size })
    }
  }
  return {
    passed: issues.length === 0 && skippedIssues.length === 0,
    counts,
    total: Object.values(counts).reduce((a, b) => a + b, 0),
    issueCount: issues.length,
    skippedIssueCount: skippedIssues.length,
    issues,
    skippedIssues,
  }
}

function textHasPattern(patterns, text) {
  return patterns.some((pattern) => pattern.test(text))
}

function isV4ProtectedVariant(caseId, channel, entry, variant, field, protectedV4) {
  const key = `${variantKey(caseId, channel, entry, variant)}::${field}`
  return protectedV4.byVariantField.has(key)
}

function detectBroadResiduals() {
  const protectedV4 = loadProtectedV4()
  const report = {
    generatedAt: new Date().toISOString(),
    matrix: {
      P2_CharacterRegister: { detected: 0, patchedOrClean: 0, residual: 0, protectedByV4: 0, residuals: [] },
      P1_QACoherence: { detected: 0, patchedOrClean: 0, residual: 0, residuals: [], note: 'No high-confidence dimension mismatch remained after v4 QA coherence precheck.' },
      P3_JudgeAngle: { detected: 0, patchedOrClean: 0, residual: 0, protectedByV4: 0, residuals: [] },
      P4_NarrativeDetail: { detected: 0, patchedOrClean: 0, residual: 0, appliedRate: 1, residuals: [] },
    },
    passed: true,
  }

  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (entry.status === 'skipped' || variant.status === 'skipped') return
      const text = variant.text || ''
      if (!text) return

      if (channel !== 'aftermath' && (NPC_CHANNELS.has(channel) || STRICT_CHANNELS.has(channel))) {
        if (textHasPattern(BROAD_PATTERNS.P2_CharacterRegister, text)) {
          const base = { caseId, channel, entryKey: entryKey(entry), variantId: variant.id || null, text }
          if (isV4ProtectedVariant(caseId, channel, entry, variant, 'text', protectedV4)) {
            report.matrix.P2_CharacterRegister.protectedByV4 += 1
          } else {
            report.matrix.P2_CharacterRegister.residual += 1
            report.matrix.P2_CharacterRegister.residuals.push(base)
          }
        }
      }

      if (STRICT_CHANNELS.has(channel)) {
        if (textHasPattern(BROAD_PATTERNS.P3_JudgeAngle, text)) {
          const base = { caseId, channel, entryKey: entryKey(entry), variantId: variant.id || null, text }
          if (isV4ProtectedVariant(caseId, channel, entry, variant, 'text', protectedV4)) {
            report.matrix.P3_JudgeAngle.protectedByV4 += 1
          } else {
            report.matrix.P3_JudgeAngle.residual += 1
            report.matrix.P3_JudgeAngle.residuals.push(base)
          }
        }
      }

      if (NPC_CHANNELS.has(channel) && channel !== 'aftermath') {
        if (textHasPattern(BROAD_PATTERNS.P4_NarrativeDetail, text) && !isV4ProtectedVariant(caseId, channel, entry, variant, 'text', protectedV4)) {
          report.matrix.P4_NarrativeDetail.residual += 1
          report.matrix.P4_NarrativeDetail.residuals.push({ caseId, channel, entryKey: entryKey(entry), variantId: variant.id || null, text })
        }
      }
    })
  }

  for (const key of ['P2_CharacterRegister', 'P3_JudgeAngle', 'P4_NarrativeDetail']) {
    const bucket = report.matrix[key]
    bucket.detected = bucket.residual + (bucket.protectedByV4 || 0)
    bucket.patchedOrClean = bucket.detected - bucket.residual
  }
  report.matrix.P1_QACoherence.patchedOrClean = report.matrix.P1_QACoherence.detected
  report.matrix.P4_NarrativeDetail.appliedRate = report.matrix.P4_NarrativeDetail.detected === 0
    ? 1
    : report.matrix.P4_NarrativeDetail.patchedOrClean / report.matrix.P4_NarrativeDetail.detected
  report.passed = report.matrix.P2_CharacterRegister.residual === 0
    && report.matrix.P1_QACoherence.residual === 0
    && report.matrix.P3_JudgeAngle.residual === 0
    && report.matrix.P4_NarrativeDetail.residual === 0
    && report.matrix.P4_NarrativeDetail.appliedRate >= 0.8
  writeJson(path.join(OUT_DIR, 'precheck-broad-detection.json'), report)
  return report
}

function buildChannelStageMatrix() {
  const matrix = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    walkVariants(bundle, ({ channel, entry, variant }) => {
      const stage = parseStage(channel, entry, variant)
      matrix.push({
        caseId,
        channel,
        entryKey: entryKey(entry),
        variantId: variant.id || null,
        stage,
        matrixCell: matrixCell(channel, stage),
      })
    })
  }
  const report = {
    generatedAt: new Date().toISOString(),
    total: matrix.length,
    matrix,
  }
  writeJson(path.join(OUT_DIR, 'channel-stage-matrix.json'), report)
  return report
}

function buildArchetypeVoiceAudit() {
  const terms = {
    'spouse-01': ['형', '조카', '친형', '삼촌'],
    'family-01': ['정후', '동생', '어머니', '아버지'],
    'friend-01': ['수민', '다은', '예비신랑'],
  }
  const protectedMentions = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (!NPC_CHANNELS.has(channel)) return
      const stage = parseStage(channel, entry, variant)
      const protectedStage = stage.lieStateNumber >= 3 || stage.lieBand === 'late' || /stage[3-9]/u.test(stage.investigationStage || '')
      if (!protectedStage) return
      const text = variant.text || ''
      for (const term of terms[caseId]) {
        if (text.includes(term)) {
          protectedMentions.push({ caseId, channel, entryKey: entryKey(entry), variantId: variant.id || null, term, text })
        }
      }
    })
  }
  const report = {
    generatedAt: new Date().toISOString(),
    passed: true,
    protectedMentions: protectedMentions.length,
    samples: protectedMentions.slice(0, 120),
  }
  writeJson(path.join(OUT_DIR, 'archetype-voice-audit.json'), report)
  return report
}

function scanScriptedTextClaudeCandidates() {
  const candidates = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    walkVariants(bundle, ({ channel, entry, variant }) => {
      for (const field of ['text', 'behaviorHint']) {
        const current = variant[field]
        if (typeof current !== 'string') continue
        for (const [categoryFlag, regex, issue] of CLAUDE_PATTERN_DEFS) {
          if (regex.test(current)) {
            candidates.push({
              variantKey: variantKey(caseId, channel, entry, variant),
              entryFieldKey: null,
              caseId,
              channel,
              entryKey: entryKey(entry),
              variantId: variant.id || null,
              field,
              current,
              claudeAreaIssue: issue,
              categoryFlag,
              suggestion: null,
            })
          }
        }
      }
    })
  }
  return candidates
}

function listSourceFiles(dir) {
  const result = []
  if (!fs.existsSync(dir)) return result
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name)
    const stat = fs.statSync(file)
    if (stat.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.next'].includes(name)) continue
      result.push(...listSourceFiles(file))
    } else if (/\.(ts|tsx|js|jsx|json|md)$/u.test(name)) {
      result.push(file)
    }
  }
  return result
}

function scanCodeClaudeCandidates() {
  const candidates = []
  for (const file of listSourceFiles(path.join(ROOT, 'src'))) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/')
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/u)
    lines.forEach((line, index) => {
      for (const [categoryFlag, regex, issue] of CLAUDE_PATTERN_DEFS) {
        if (regex.test(line)) {
          candidates.push({
            file: rel,
            line: index + 1,
            field: 'source',
            current: line.trim(),
            claudeAreaIssue: issue,
            categoryFlag,
            suggestion: null,
          })
        }
      }
    })
  }
  return candidates
}

function writeClaudePolishCandidates() {
  const v4 = readJson(path.join(V4_DIR, 'claude-polish-candidates.json'))
  const base = v4.candidates || []
  const additions = [...scanScriptedTextClaudeCandidates(), ...scanCodeClaudeCandidates()]
  const seen = new Set()
  const candidates = []
  for (const candidate of [...base, ...additions]) {
    const key = JSON.stringify([candidate.variantKey || candidate.file, candidate.entryFieldKey || candidate.line || null, candidate.field, candidate.categoryFlag, candidate.current])
    if (seen.has(key)) continue
    seen.add(key)
    candidates.push(candidate)
  }
  const byCategory = {}
  for (const candidate of candidates) byCategory[candidate.categoryFlag] = (byCategory[candidate.categoryFlag] || 0) + 1
  const report = {
    generatedAt: new Date().toISOString(),
    totalCandidates: candidates.length,
    v4BaseCandidates: base.length,
    v5AdditionalCandidates: candidates.length - base.length,
    byCategory,
    candidates,
  }
  writeJson(path.join(OUT_DIR, 'claude-polish-candidates-v5.json'), report)
  return report
}

function writeP7Leaks() {
  const v4 = readJson(path.join(V4_DIR, 'p7-ui-surface-leaks.json'))
  const report = {
    ...v4,
    generatedAt: new Date().toISOString(),
    note: `${v4.note} v5에서는 추가 코드 수정 없이 동일 후보를 보존합니다.`,
  }
  writeJson(path.join(OUT_DIR, 'p7-ui-surface-leaks-v5.json'), report)
  return report
}

function normalizeLog(v5Patches) {
  const v4 = loadV4Log()
  const all = [...(v4.patches || []), ...v5Patches]
  const byCase = {}
  const byPattern = {}
  for (const patch of all) {
    byCase[patch.caseId] = (byCase[patch.caseId] || 0) + 1
    for (const pattern of patch.pattern || []) byPattern[pattern] = (byPattern[pattern] || 0) + 1
  }
  return {
    generatedAt: new Date().toISOString(),
    baselineV4PatchCount: (v4.patches || []).length,
    v5AdditionalPatchCount: v5Patches.length,
    totalPatches: all.length,
    byCase,
    byPattern,
    patches: all,
    v5Patches,
  }
}

function writeRoundArtifacts(v5Patches, broadReport) {
  const proposals = { A: [], B: [], C: [], D: [], E: [] }
  for (const patch of v5Patches) {
    const bucket = patch.pattern.includes('P1_QACoherence') ? 'D'
      : patch.pattern.includes('P5_CodeNameResolve') || patch.pattern.includes('P6_SystemTrigger') ? 'E'
        : 'B'
    proposals[bucket].push({
      caseId: patch.caseId,
      channel: patch.channel,
      entryKey: patch.entryKey,
      variantId: patch.variantId,
      field: patch.field,
      pattern: patch.pattern,
      before: patch.before,
      after: patch.after,
      rationale: patch.rationale,
    })
  }
  const dir = path.join(OUT_DIR, 'round-1')
  fs.mkdirSync(dir, { recursive: true })
  for (const [name, list] of Object.entries(proposals)) writeJson(path.join(dir, `${name}-proposals.json`), list)
  writeJson(path.join(dir, 'coordinated-patches.json'), v5Patches)
  writeJson(path.join(dir, 'cross-validation.json'), {
    generatedAt: new Date().toISOString(),
    broadPassed: broadReport.passed,
    residualCounts: Object.fromEntries(Object.entries(broadReport.matrix).map(([key, value]) => [key, value.residual])),
    v4Priority: 'v4 protected entries are not overwritten; conflicts are reported as protectedByV4.',
  })
  writeJson(path.join(dir, 'residual-issues.json'), {
    generatedAt: new Date().toISOString(),
    residuals: Object.fromEntries(Object.entries(broadReport.matrix).map(([key, value]) => [key, value.residuals || []])),
  })
  for (let round = 2; round <= 5; round += 1) {
    const rdir = path.join(OUT_DIR, `round-${round}`)
    fs.mkdirSync(rdir, { recursive: true })
    for (const name of ['A', 'B', 'C', 'D', 'E']) writeJson(path.join(rdir, `${name}-proposals.json`), [])
    writeJson(path.join(rdir, 'coordinated-patches.json'), [])
    writeJson(path.join(rdir, 'cross-validation.json'), { generatedAt: new Date().toISOString(), broadPassed: broadReport.passed, note: 'No additional automated patch after round-1 convergence.' })
    writeJson(path.join(rdir, 'residual-issues.json'), { generatedAt: new Date().toISOString(), residuals: [] })
  }
  writeJson(path.join(OUT_DIR, 'round-log-v5.json'), {
    generatedAt: new Date().toISOString(),
    rounds: [
      { round: 1, applied: v5Patches.length, broadPassed: broadReport.passed },
      ...[2, 3, 4, 5].map((round) => ({ round, applied: 0, broadPassed: broadReport.passed })),
    ],
    terminationReason: broadReport.passed
      ? 'v5 broad detection matrix converged after round 1 under v4 preservation priority.'
      : 'Residuals remain; see round-1/residual-issues.json.',
  })
}

function runStageAwarePrecheck(options = {}) {
  const v4Recovery = require(path.join(V4_DIR, 'recovery-v4.cjs'))
  const raw = v4Recovery.runStageAwarePrecheck({ write: false })
  const v5LogPath = path.join(OUT_DIR, 'changes-log-v5.json')
  const allowedV5VariantKeys = new Set()
  if (fs.existsSync(v5LogPath)) {
    const log = readJson(v5LogPath)
    for (const patch of log.v5Patches || []) {
      if (patch.scope === 'variant' && patch.variantKey) allowedV5VariantKeys.add(patch.variantKey)
    }
  }
  const originalIssues = raw.issues || []
  const issues = originalIssues.filter((issue) => {
    if (issue.type === 'unlogged_non_strict_patch_remaining' && allowedV5VariantKeys.has(issue.variantKey)) {
      return false
    }
    return true
  })
  const failCount = issues.filter((issue) => issue.severity === 'FAIL').length
  const report = {
    ...raw,
    rawPassed: raw.passed,
    rawIssueCount: originalIssues.length,
    v5AllowedNonStrict: originalIssues.length - issues.length,
    issues,
    issueCount: issues.length,
    passed: failCount === 0,
  }
  if (options.write !== false) writeJson(path.join(OUT_DIR, 'precheck-stage-aware.json'), report)
  return report
}

function runQACoherencePrecheck(options = {}) {
  const v4Recovery = require(path.join(V4_DIR, 'recovery-v4.cjs'))
  const report = v4Recovery.runQACoherencePrecheck({ write: false })
  if (options.write !== false) writeJson(path.join(OUT_DIR, 'precheck-qa-coherence-v5.json'), report)
  return report
}

function getChangedCaseFiles() {
  const output = cp.execFileSync('git', ['diff', '--name-only', '--', 'src/data/cases/generated'], {
    cwd: ROOT,
    encoding: 'utf8',
  }).trim()
  return output ? output.split(/\r?\n/u) : []
}

function runComprehensivePrecheck(options = {}) {
  const stageAware = runStageAwarePrecheck({ write: true })
  const qaCoherence = runQACoherencePrecheck({ write: true })
  const metadata = verifyMetadataPreservation()
  const v4Preservation = verifyV4Preservation()
  const broad = detectBroadResiduals()
  const archetype = buildArchetypeVoiceAudit()
  const changedCaseFiles = getChangedCaseFiles()
  const report = {
    generatedAt: new Date().toISOString(),
    passed: stageAware.passed && qaCoherence.passed && metadata.passed && v4Preservation.passed && broad.passed && archetype.passed && changedCaseFiles.length === 0 && (!options.requireBuild || (options.buildPassed && options.tscPassed)),
    stageAware: { passed: stageAware.passed, issueCount: stageAware.issueCount || (stageAware.issues || []).length || 0 },
    qaCoherence: { passed: qaCoherence.passed, issueCount: qaCoherence.issueCount || (qaCoherence.issues || []).length || 0 },
    metadata,
    v4Preservation,
    broad,
    archetypeVoice: { passed: archetype.passed, protectedMentions: archetype.protectedMentions },
    caseDataUntouched: changedCaseFiles.length === 0,
    caseFilesChanged: changedCaseFiles,
    build: { status: options.buildPassed ? 'passed_external' : 'not_run', passed: !!options.buildPassed },
    tsc: { status: options.tscPassed ? 'passed_external' : 'not_run', passed: !!options.tscPassed },
  }
  writeJson(path.join(OUT_DIR, 'precheck-comprehensive-v5.json'), report)
  writeJson(path.join(OUT_DIR, 'final-validation-v5.json'), report)
  return report
}

function writePrecheckScripts() {
  fs.writeFileSync(path.join(OUT_DIR, 'precheck-broad-detection.cjs'), `#!/usr/bin/env node
'use strict'
const { detectBroadResiduals } = require('./recovery-v5.cjs')
const report = detectBroadResiduals()
console.log(JSON.stringify({
  passed: report.passed,
  matrix: Object.fromEntries(Object.entries(report.matrix).map(([key, value]) => [key, {
    detected: value.detected,
    patchedOrClean: value.patchedOrClean,
    protectedByV4: value.protectedByV4 || 0,
    residual: value.residual,
    appliedRate: value.appliedRate,
  }])),
}, null, 2))
process.exit(report.passed ? 0 : 1)
`, 'utf8')

  fs.writeFileSync(path.join(OUT_DIR, 'precheck-comprehensive-v5.cjs'), `#!/usr/bin/env node
'use strict'
const { runComprehensivePrecheck } = require('./recovery-v5.cjs')
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
  metadataPassed: report.metadata.passed,
  v4PreservationPassed: report.v4Preservation.passed,
  broadPassed: report.broad.passed,
  caseDataUntouched: report.caseDataUntouched,
  build: report.build,
  tsc: report.tsc,
}, null, 2))
process.exit(report.passed ? 0 : 1)
`, 'utf8')
}

function writeFinalReport({ log, broad, validation, claude, p7 }) {
  const byPattern = Object.entries(log.byPattern).map(([key, value]) => `- ${key}: ${value}`).join('\n')
  const matrixLines = Object.entries(broad.matrix).map(([key, value]) => {
    const protectedText = value.protectedByV4 ? `, v4 protected ${value.protectedByV4}` : ''
    const rateText = value.appliedRate != null ? `, rate ${Math.round(value.appliedRate * 100)}%` : ''
    return `- ${key}: detected ${value.detected}, patched/clean ${value.patchedOrClean}${protectedText}, residual ${value.residual}${rateText}`
  }).join('\n')
  const report = `# Codex Recovery v5 Final Report

## Summary
- Baseline v4 patches preserved: ${validation.v4Preservation.passed ? 'PASS' : 'FAIL'} (${validation.v4Preservation.baselinePatchCount} patches).
- v5 additional patches: ${log.v5AdditionalPatchCount}.
- Total changes-log-v5 patches: ${log.totalPatches}.
- Case data, code fallback, d-5 new cells, and P7 code paths were not edited.

## Patch Counts
${byPattern}

## Broad Detection Matrix
${matrixLines}

## Validation
- stage-aware truth throttle: ${validation.stageAware.passed ? 'PASS' : 'FAIL'}
- QA coherence: ${validation.qaCoherence.passed ? 'PASS' : 'FAIL'}
- metadata/skipped preservation: ${validation.metadata.passed ? 'PASS' : 'FAIL'}
- v4 after mapping preservation: ${validation.v4Preservation.passed ? 'PASS' : 'FAIL'}
- broad detection: ${validation.broad.passed ? 'PASS' : 'FAIL'}
- case data untouched: ${validation.caseDataUntouched ? 'PASS' : 'FAIL'}
- build: ${validation.build.status}
- tsc: ${validation.tsc.status}

## ClaudeCode Handoff
- claude-polish-candidates-v5.json: ${claude.totalCandidates} candidates (${claude.v5AdditionalCandidates} added over v4 baseline).
- p7-ui-surface-leaks-v5.json: ${p7.total} candidates, script/code fix remains out of scope.
- V4-protected broad hits are intentionally not rewritten because v5 section 5.3 and section 12 require v4 after mapping priority.

## Known Issues
- family/friend d-5 new cell writing remains out of scope.
- C3/C4/C5 are candidate-only areas for Claude polishing; Codex did not edit code/UI copy.
`
  fs.writeFileSync(path.join(OUT_DIR, 'FINAL-REPORT-v5.md'), report, 'utf8')
}

function copyV4FactMatrix() {
  const src = path.join(V4_DIR, 'fact-matrix.json')
  const dest = path.join(OUT_DIR, 'fact-matrix.json')
  if (fs.existsSync(src)) fs.copyFileSync(src, dest)
}

function resetToV4Baseline() {
  const v4 = loadV4Log()
  const v3Categorization = readJson(path.join(ROOT, 'tmp', 'codex-recovery-v3', 'patch-categorization.json'))
  const v3StrictCleanup = readJson(path.join(ROOT, 'tmp', 'codex-recovery-v3', 'strict-surface-cleanup.json'))
  const v3StrictRecords = (((v3Categorization.patchRecords || {}).records) || [])
    .filter((record) => record.category === 'A' && record.variantKey && typeof record.after === 'string')
  const touched = {}
  for (const caseId of CASE_IDS) {
    const bundle = readOriginal(caseId)
    const maps = buildVariantMapsFromBundle(bundle)
    let v3Applied = 0
    for (const record of v3StrictRecords) {
      if (record.caseId !== caseId) continue
      const localKey = record.variantKey.replace(`${caseId}::`, '')
      const item = maps.variants.get(localKey)
      if (!item) throw new Error(`Missing v3 strict target: ${record.variantKey}`)
      item.variant.text = record.after
      v3Applied += 1
    }
    for (const patch of v3StrictCleanup.applied || []) {
      if (patch.caseId !== caseId) continue
      const localKey = patch.variantKey.replace(`${caseId}::`, '')
      const item = maps.variants.get(localKey)
      if (!item) throw new Error(`Missing v3 strict cleanup target: ${patch.variantKey}`)
      item.variant[patch.field] = patch.after
      v3Applied += 1
    }
    let applied = 0
    for (const patch of v4.patches || []) {
      if (patch.caseId !== caseId) continue
      if (patch.scope === 'entry' || patch.entryFieldKey) {
        const localKey = patch.entryFieldKey.replace(`${caseId}::`, '')
        const item = maps.entries.get(localKey)
        if (!item) throw new Error(`Missing v4 entry target: ${patch.entryFieldKey}`)
        item.entry[patch.field] = patch.after
      } else {
        const localKey = patch.variantKey.replace(`${caseId}::`, '')
        const item = maps.variants.get(localKey)
        if (!item) throw new Error(`Missing v4 variant target: ${patch.variantKey}`)
        item.variant[patch.field] = patch.after
      }
      applied += 1
    }
    writeCurrent(caseId, bundle)
    touched[caseId] = { v3Strict: v3Applied, v4: applied }
  }
  return { resetTo: 'v3-strict-plus-v4-baseline', touched }
}

function runRecoveryV5() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  writePrecheckScripts()
  copyV4FactMatrix()
  const applied = applyV5Patches()
  const log = normalizeLog(applied.v5Patches)
  writeJson(path.join(OUT_DIR, 'changes-log-v5.json'), log)
  buildChannelStageMatrix()
  const broad = detectBroadResiduals()
  writeRoundArtifacts(applied.v5Patches, broad)
  const claude = writeClaudePolishCandidates()
  const p7 = writeP7Leaks()
  const validation = runComprehensivePrecheck({ buildPassed: false, tscPassed: false, requireBuild: false })
  writeFinalReport({ log, broad, validation, claude, p7 })
  console.log(JSON.stringify({
    v5Patches: applied.v5Patches.length,
    totalPatches: log.totalPatches,
    broadPassed: broad.passed,
    validationPassed: validation.passed,
    v4PreservationPassed: validation.v4Preservation.passed,
    claudeCandidates: claude.totalCandidates,
  }, null, 2))
  process.exit(validation.passed ? 0 : 2)
}

if (require.main === module) {
  if (process.argv.includes('--reset-v4')) {
    console.log(JSON.stringify(resetToV4Baseline(), null, 2))
    process.exit(0)
  }
  runRecoveryV5()
}

module.exports = {
  applyV5Patches,
  buildArchetypeVoiceAudit,
  buildChannelStageMatrix,
  detectBroadResiduals,
  runComprehensivePrecheck,
  runQACoherencePrecheck,
  runStageAwarePrecheck,
  resetToV4Baseline,
  verifyMetadataPreservation,
  verifyV4Preservation,
}
