#!/usr/bin/env node
/**
 * apply-hd4-scripted-text — GPT Pro batch 시안을 spouse-01.json에 적용
 *
 * 입력: GPT가 작성한 batch별 JSON 파일 (text + behaviorHint만 채움, tags X)
 * 처리:
 *   1. 입력 JSON parse
 *   2. 각 entry에 대해 h-d3의 대응 entry를 template으로 찾기 (같은 channel, 비슷한 questionType/party/lieState)
 *   3. h-d3 tags 영역 그대로 복사 + disputeId / key / id만 h-d4로 교체
 *   4. spouse-01.json의 해당 channel.entries 끝에 신규 entry 추가
 *
 * Usage:
 *   node scripts/apply-hd4-scripted-text.cjs --input tmp/gpt-batch-1.json --dry-run
 *   node scripts/apply-hd4-scripted-text.cjs --input tmp/gpt-batch-1.json --write
 *
 * Cycle 4 plot revision (h-d4 / e-8 / e-9 / dc-8) 영역 전용 helper.
 */

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const SPOUSE_JSON = path.join(ROOT, 'src/data/scriptedText/spouse-01.json')

function parseArgs(argv) {
  const args = { input: null, write: false, dryRun: true }
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--input') args.input = argv[++i]
    else if (a === '--write') {
      args.write = true
      args.dryRun = false
    } else if (a === '--dry-run') args.dryRun = true
  }
  if (!args.input) {
    console.error('Usage: node scripts/apply-hd4-scripted-text.cjs --input <gpt-batch.json> [--dry-run|--write]')
    process.exit(1)
  }
  return args
}

/**
 * dispute 기반 channel template 찾기 — disputeId='h-d3' + 같은 party + 같은 lieState + 같은 questionType
 * (interrogation / judge_question / judge_evidence_combo / judge_contradiction / contradiction_pursuit /
 *  evidence_present / mediation / aftermath 등)
 */
function findHd3Template(channel, entries, target) {
  const exact = entries.find(
    (e) =>
      e.disputeId === 'h-d3' &&
      e.party === target.party &&
      e.lieState === target.lieState &&
      e.questionType === target.questionType,
  )
  if (exact) return exact

  const sameLieState = entries.find(
    (e) => e.disputeId === 'h-d3' && e.party === target.party && e.lieState === target.lieState,
  )
  if (sameLieState) return sameLieState

  const sameParty = entries.find(
    (e) => e.disputeId === 'h-d3' && e.party === target.party,
  )
  if (sameParty) return sameParty

  return entries.find((e) => e.disputeId === 'h-d3') ?? null
}

/**
 * dossier 채널 template — dossierCard 기반 (dc-3 또는 dc-4를 dc-8 template으로 사용)
 * dossier entry 형식: { key: 'dc-N.b.qN|lieBand', dossierCardId, questionId, questionText, targetParty, requiredLieState, lieBand, ... }
 * GPT 시안의 input questionId (예: 'dc-8.b.q1')에서 lieBand (early/mid/late)를 매칭.
 */
function findDossierTemplate(entries, gptEntry) {
  // GPT input의 questionId나 key에서 lieBand 추출 (early/mid/late)
  const lieBand = gptEntry.lieBand || extractLieBandFromKey(gptEntry.key) || 'mid'
  const targetParty = gptEntry.targetParty || gptEntry.party || 'b'

  // dc-3 dossier card의 동일 lieBand entry를 1순위 — dc-8과 가장 유사한 challenge 패턴 (B 측, h-d4 link)
  const preferred = entries.find(
    (e) =>
      e.dossierCardId === 'dc-3' &&
      e.targetParty === targetParty &&
      e.lieBand === lieBand &&
      e.questionId === 'dc-3.b.q1',
  )
  if (preferred) return preferred

  // fallback — dc-4 dossier card (h-d3 link, B 측 X but A 측)
  const fallback = entries.find(
    (e) => e.dossierCardId === 'dc-3' && e.lieBand === lieBand,
  ) || entries.find((e) => e.dossierCardId === 'dc-3')
  return fallback ?? null
}

function extractLieBandFromKey(key) {
  if (!key) return null
  const parts = key.split('|')
  const last = parts[parts.length - 1]
  if (last === 'early' || last === 'mid' || last === 'late') return last
  return null
}

/**
 * tags 영역의 dispute / dossier 라벨을 h-d3/dc-3 → h-d4/dc-8 로 교체
 */
function rewriteTags(tags, mode) {
  if (!Array.isArray(tags)) return tags
  return tags.map((t) => {
    if (typeof t !== 'string') return t
    if (mode === 'dossier') {
      // dc-3 → dc-8, questionId:dc-3.b.q1 → dc-8.b.q1 등
      return t.replace(/dc-3/g, 'dc-8')
    }
    // dispute 기반 채널 (interrogation 등)
    return t.replace(/h-d3/g, 'h-d4')
  })
}

/**
 * GPT 시안 entry를 spouse-01.json 형식 entry로 변환
 * channel에 따라 dispute / dossier / evidence_present template 분기
 */
function buildEntry(channel, entries, gptEntry) {
  if (channel === 'dossier') {
    return buildDossierEntry(entries, gptEntry)
  }
  if (channel === 'evidence_present') {
    return buildEvidencePresentEntry(entries, gptEntry)
  }
  if (channel === 'judge_question') {
    return buildJudgeQuestionEntry(entries, gptEntry)
  }
  return buildDisputeEntry(channel, entries, gptEntry)
}

/**
 * judge_question 채널 전용 — entry는 disputeId + questionType + depth 형식.
 * variants는 a/b/both target 섞임 가능. variant.tags의 targetParty token으로 호명 결정.
 */
function buildJudgeQuestionEntry(entries, gptEntry) {
  const questionType = gptEntry.questionType ?? 'fact_pursuit'
  const depth = gptEntry.depth ?? 1
  // h-d3의 같은 questionType + depth template
  const template = entries.find(
    (e) => e.disputeId === 'h-d3' && e.questionType === questionType && e.depth === depth,
  ) ?? entries.find((e) => e.disputeId === 'h-d3' && e.questionType === questionType)
    ?? entries.find((e) => e.disputeId === 'h-d3')
  if (!template) {
    throw new Error(`[judge_question] no h-d3 template for questionType=${questionType} depth=${depth}`)
  }

  const newEntry = {
    key: gptEntry.key,
    disputeId: 'h-d4',
    questionType,
    depth,
    truthLevel: gptEntry.truthLevel ?? template.truthLevel,
    variants: gptEntry.variants.map((v, idx) => {
      const templateVariant = template.variants[idx] ?? template.variants[0]
      const targetParty = v.targetParty ?? 'a'
      return {
        id: v.id,
        text: v.text,
        behaviorHint: v.behaviorHint ?? '',
        tags: rewriteJudgeQuestionTags(templateVariant.tags, targetParty, depth),
        sourceRefs: ['dispute:h-d4'],
      }
    }),
  }
  return newEntry
}

/**
 * judge_question tags rewrite — disputeId / depth / targetParty / callTerm / counterpartyRef 정확 교체
 */
function rewriteJudgeQuestionTags(tags, targetParty, depth) {
  if (!Array.isArray(tags)) return tags
  const partyName = targetParty === 'a' ? '박지연_씨' : (targetParty === 'b' ? '이준호_씨' : '두_분')
  return tags.map((t) => {
    if (typeof t !== 'string') return t
    let s = t.replace(/h-d3/g, 'h-d4')
    if (s.startsWith('targetParty:')) s = `targetParty:${targetParty}`
    else if (s.startsWith('callTerm:')) s = `callTerm:${partyName}`
    else if (s.startsWith('counterpartyRef:')) s = `counterpartyRef:${partyName}`
    else if (s.startsWith('depth:')) s = `depth:${depth}`
    return s
  })
}

function buildEvidencePresentEntry(entries, gptEntry) {
  // GPT input의 evidenceId 또는 key에서 추출
  const evidenceId = gptEntry.evidenceId || extractEvidenceIdFromKey(gptEntry.key)
  if (!evidenceId) {
    throw new Error(`[evidence_present] evidenceId not found in entry: ${gptEntry.key}`)
  }
  // lieBand 정규화 — S0~S5 형식 또는 early/mid/late 형식 모두 지원
  const lieBand = gptEntry.lieBand || normalizeLieBand(gptEntry.key, gptEntry.lieState)
  const party = gptEntry.party

  // 같은 party + 같은 lieBand + B subject (e-8/e-9는 B subject) 인 evidence template 찾기
  // 1순위 e-5 (B subject, h-d4 영역 인접), fallback e-3/e-7
  const candidates = ['e-5', 'e-3', 'e-7', 'e-4']
  let template = null
  for (const candId of candidates) {
    template = entries.find(
      (e) => (e.evidenceId === candId || e.key?.startsWith(`${party}|${candId}|`)) &&
        e.lieBand === lieBand && (e.party === party || e.key?.startsWith(`${party}|`))
    )
    if (template) break
  }
  if (!template) {
    // last resort — same party + same lieBand any evidence
    template = entries.find((e) => e.party === party && e.lieBand === lieBand)
  }
  if (!template) {
    throw new Error(`[evidence_present] no template found for party=${party} lieBand=${lieBand}`)
  }

  const newEntry = {
    key: gptEntry.key,
    party,
    evidenceId,
    lieBand,
    subjectRole: gptEntry.subjectRole ?? template.subjectRole,
    stanceHint: gptEntry.stanceHint ?? template.stanceHint,
    truthLevel: gptEntry.truthLevel ?? template.truthLevel,
    subjectParty: gptEntry.subjectParty ?? template.subjectParty ?? 'b',
    variants: gptEntry.variants.map((v, idx) => {
      const templateVariant = template.variants[idx] ?? template.variants[0]
      return {
        id: v.id,
        text: v.text,
        behaviorHint: v.behaviorHint ?? '',
        tags: rewriteTagsForEvidence(templateVariant.tags, template.evidenceId || extractEvidenceIdFromKey(template.key), evidenceId),
        sourceRefs: [`evidence:${evidenceId}`],
      }
    }),
  }
  return newEntry
}

function extractEvidenceIdFromKey(key) {
  if (!key) return null
  // 'b|e-8|mid' → 'e-8'
  const m = key.match(/^[ab]\|(e-\d+)\|/)
  return m ? m[1] : null
}

function normalizeLieBand(key, lieState) {
  // key에 early/mid/late 있으면 그대로
  if (key) {
    const last = key.split('|').pop()
    if (last === 'early' || last === 'mid' || last === 'late') return last
  }
  // lieState → lieBand 매핑 (S0/S1=early, S2/S3=mid, S4/S5=late)
  if (lieState) {
    const n = Number(String(lieState).replace('S', ''))
    if (n <= 1) return 'early'
    if (n <= 3) return 'mid'
    return 'late'
  }
  return 'mid'
}

function rewriteTagsForEvidence(tags, fromEvidenceId, toEvidenceId) {
  if (!Array.isArray(tags) || !fromEvidenceId) return tags
  return tags.map((t) => {
    if (typeof t !== 'string') return t
    return t.replace(new RegExp(fromEvidenceId, 'g'), toEvidenceId)
  })
}

function buildDisputeEntry(channel, entries, gptEntry) {
  const target = {
    party: gptEntry.party,
    lieState: gptEntry.lieState,
    questionType: gptEntry.questionType,
  }
  const template = findHd3Template(channel, entries, target)
  if (!template) {
    throw new Error(`[${channel}] no h-d3 template found for party=${target.party} lieState=${target.lieState} questionType=${target.questionType}`)
  }

  const newEntry = {
    key: gptEntry.key,
    party: gptEntry.party,
    disputeId: 'h-d4',
    lieState: gptEntry.lieState,
    questionType: gptEntry.questionType ?? template.questionType,
    stanceHint: gptEntry.stanceHint ?? template.stanceHint,
    truthLevel: gptEntry.truthLevel ?? template.truthLevel,
    variants: gptEntry.variants.map((v, idx) => {
      const templateVariant = template.variants[idx] ?? template.variants[0]
      return {
        id: v.id,
        text: v.text,
        behaviorHint: v.behaviorHint ?? '',
        tags: rewriteTags(templateVariant.tags, 'dispute'),
        sourceRefs: ['dispute:h-d4'],
      }
    }),
  }
  return newEntry
}

function buildDossierEntry(entries, gptEntry) {
  const template = findDossierTemplate(entries, gptEntry)
  if (!template) {
    throw new Error(`[dossier] no dc-3 template found for ${gptEntry.key}`)
  }

  // GPT 시안의 questionId / questionText / lieBand 사용. 없으면 key에서 추출.
  const questionId = gptEntry.questionId || extractQuestionIdFromKey(gptEntry.key)
  const lieBand = gptEntry.lieBand || extractLieBandFromKey(gptEntry.key) || template.lieBand

  const newEntry = {
    key: gptEntry.key,
    dossierCardId: 'dc-8',
    questionId,
    questionText: gptEntry.questionText ?? template.questionText,
    targetParty: gptEntry.targetParty ?? template.targetParty ?? 'b',
    requiredLieState: gptEntry.requiredLieState ?? template.requiredLieState,
    lieBand,
    stanceHint: gptEntry.stanceHint ?? template.stanceHint,
    truthLevel: gptEntry.truthLevel ?? template.truthLevel,
    variants: gptEntry.variants.map((v, idx) => {
      const templateVariant = template.variants[idx] ?? template.variants[0]
      return {
        id: v.id,
        text: v.text,
        behaviorHint: v.behaviorHint ?? '',
        tags: rewriteTags(templateVariant.tags, 'dossier'),
        sourceRefs: ['dossier:dc-8'],
      }
    }),
  }
  return newEntry
}

function extractQuestionIdFromKey(key) {
  if (!key) return null
  // 'dc-8.b.q1|early' → 'dc-8.b.q1'
  const m = key.match(/^(dc-[\w.-]+\.[ab]\.q\d+)/)
  return m ? m[1] : null
}

function main() {
  const args = parseArgs(process.argv)
  const gptInput = JSON.parse(fs.readFileSync(args.input, 'utf8'))
  const targetChannel = gptInput.channel
  if (!targetChannel) {
    console.error(`input JSON has no "channel" field. Expected one of: interrogation, judge_question, judge_evidence_combo, judge_contradiction, evidence_present, dossier, contradiction_pursuit, mediation, aftermath`)
    process.exit(1)
  }

  const spouseJson = JSON.parse(fs.readFileSync(SPOUSE_JSON, 'utf8'))
  const channelNode = spouseJson.channels[targetChannel]
  if (!channelNode || !Array.isArray(channelNode.entries)) {
    console.error(`channel "${targetChannel}" not found or no .entries[] array`)
    process.exit(1)
  }
  const entries = channelNode.entries

  console.log(`▼ applying batch=${gptInput.batch ?? '?'} channel=${targetChannel} entries=${gptInput.entries?.length ?? 0}`)
  console.log(`▼ existing channel entries: ${entries.length}`)

  const addedKeys = []
  for (const gptEntry of gptInput.entries || []) {
    // dedupe — 이미 같은 key 있으면 skip
    const existing = entries.find((e) => e.key === gptEntry.key)
    if (existing) {
      console.log(`  ↺ skip (already exists): ${gptEntry.key}`)
      continue
    }
    try {
      const newEntry = buildEntry(targetChannel, entries, gptEntry)
      entries.push(newEntry)
      addedKeys.push(gptEntry.key)
      console.log(`  ✓ added: ${gptEntry.key} (${newEntry.variants.length} variants)`)
    } catch (err) {
      console.error(`  ✗ failed: ${gptEntry.key} — ${err.message}`)
    }
  }

  if (args.dryRun) {
    console.log(`\n▼ DRY RUN — ${addedKeys.length} entries would be added. No file written.`)
    console.log(`   (re-run with --write to apply)`)
    return
  }

  fs.writeFileSync(SPOUSE_JSON, JSON.stringify(spouseJson, null, 2) + '\n', 'utf8')
  console.log(`\n✓ wrote ${addedKeys.length} entries to ${path.relative(ROOT, SPOUSE_JSON)}`)
  console.log(`   keys: ${addedKeys.join(', ')}`)
  console.log(`\n▼ next steps:`)
  console.log(`   1. npx tsc --noEmit`)
  console.log(`   2. npm run -s qa:fast`)
  console.log(`   3. node scripts/detect-truth-leak.cjs --strict`)
}

main()
