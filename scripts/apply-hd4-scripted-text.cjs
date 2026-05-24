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
 * h-d3 template 찾기 — disputeId='h-d3' + 같은 party + 같은 lieState + 같은 questionType (또는 가능한 한 가장 가까운 매치)
 */
function findHd3Template(channel, entries, target) {
  // 1. exact match (party + lieState + questionType)
  const exact = entries.find(
    (e) =>
      e.disputeId === 'h-d3' &&
      e.party === target.party &&
      e.lieState === target.lieState &&
      e.questionType === target.questionType,
  )
  if (exact) return exact

  // 2. partial — same disputeId + same party + same lieState (any questionType)
  const sameLieState = entries.find(
    (e) => e.disputeId === 'h-d3' && e.party === target.party && e.lieState === target.lieState,
  )
  if (sameLieState) return sameLieState

  // 3. fallback — same disputeId + same party (any lieState)
  const sameParty = entries.find(
    (e) => e.disputeId === 'h-d3' && e.party === target.party,
  )
  if (sameParty) return sameParty

  // 4. last resort — any h-d3 entry
  return entries.find((e) => e.disputeId === 'h-d3') ?? null
}

/**
 * tags 영역의 dispute: 라벨을 h-d3 → h-d4로 교체
 */
function rewriteTags(tags) {
  if (!Array.isArray(tags)) return tags
  return tags.map((t) => (typeof t === 'string' ? t.replace(/h-d3/g, 'h-d4') : t))
}

/**
 * GPT 시안 entry를 spouse-01.json 형식 entry로 변환
 */
function buildEntry(channel, entries, gptEntry) {
  const target = {
    party: gptEntry.party,
    lieState: gptEntry.lieState,
    questionType: gptEntry.questionType,
  }
  const template = findHd3Template(channel, entries, target)
  if (!template) {
    throw new Error(`[${channel}] no h-d3 template found for party=${target.party} lieState=${target.lieState} questionType=${target.questionType}`)
  }

  // 신규 entry — template metadata 복사 + GPT 영역으로 덮어쓰기
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
        tags: rewriteTags(templateVariant.tags),
        sourceRefs: ['dispute:h-d4'],
      }
    }),
  }
  return newEntry
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
