#!/usr/bin/env node
/**
 * Cycle 7 — family-01 Line C (비밀+최종) narrative entries apply script.
 *
 * 1. 3 batch result JSON 정독 (output-cycle7-batch{1,2,3}-*.json)
 * 2. tag normalize (Cycle 6 apply 패턴 동일):
 *    - case:family-01 → caseId:family-01
 *    - scope:judge_only → scope:all_present
 *    - revealScope:judge_only → revealScope:all_present
 *    - firstFiredWins:true → 제거
 *    - emergenceType:* → 제거
 *    - targetDispute:X → disputeId:X
 *    - targetClue:X → dossierCardId:X
 *    - targetEvidence:X → evidenceId:X
 *    - clueLabel:Y → 제거
 *    - priorCard:X / linkedParty:b/both / source:a/b / recipeId:X → 유지
 * 3. variants을 6 entry key (emerge-d-4 / emerge-e-7 / emerge-dc-4 / emerge-d-5 / emerge-e-5 / emerge-dc-5)
 *    로 그룹화. 각 key entry에 id link 추가:
 *      - emerge-d-4: disputeId:'d-4'
 *      - emerge-e-7: evidenceId:'e-7', disputeId:'d-4'
 *      - emerge-dc-4: dossierCardId:'dc-4', disputeId:'d-4'
 *      - emerge-d-5: disputeId:'d-5'
 *      - emerge-e-5: evidenceId:'e-5', disputeId:'d-5'
 *      - emerge-dc-5: dossierCardId:'dc-5', disputeId:'d-5'
 * 4. src/data/scriptedText/family-01.json emergence_narrative.entries 배열에 append.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const REPO_ROOT = resolve(import.meta.dirname, '..')
const APPLY_FILE = resolve(REPO_ROOT, 'src/data/scriptedText/family-01.json')
const BATCH_FILES = [
  'docs/design/core-narrative-cycle7-family01-line-c-20260525/batch1-d4-e7/result/output-cycle7-batch1-d4-e7.json',
  'docs/design/core-narrative-cycle7-family01-line-c-20260525/batch2-dc4-d5/result/output-cycle7-batch2-dc4-d5.json',
  'docs/design/core-narrative-cycle7-family01-line-c-20260525/batch3-e5-dc5/result/output-cycle7-batch3-e5-dc5.json',
].map((p) => resolve(REPO_ROOT, p))

// 6 entry key 정의 (key → {emergence id, link 영역})
const ENTRY_KEYS = {
  'emerge-d-4': { emergenceId: 'd-4', link: { disputeId: 'd-4' } },
  'emerge-e-7': { emergenceId: 'e-7', link: { evidenceId: 'e-7', disputeId: 'd-4' } },
  'emerge-dc-4': { emergenceId: 'dc-4', link: { dossierCardId: 'dc-4', disputeId: 'd-4' } },
  'emerge-d-5': { emergenceId: 'd-5', link: { disputeId: 'd-5' } },
  'emerge-e-5': { emergenceId: 'e-5', link: { evidenceId: 'e-5', disputeId: 'd-5' } },
  'emerge-dc-5': { emergenceId: 'dc-5', link: { dossierCardId: 'dc-5', disputeId: 'd-5' } },
}

function normalizeTag(t) {
  if (t === 'case:family-01') return 'caseId:family-01'
  if (t === 'scope:judge_only') return 'scope:all_present'
  if (t === 'revealScope:judge_only') return 'revealScope:all_present'
  if (t === 'firstFiredWins:true') return null
  if (t.startsWith('emergenceType:')) return null
  if (t.startsWith('clueLabel:')) return null
  if (t.startsWith('targetDispute:')) return 'disputeId:' + t.slice('targetDispute:'.length)
  if (t.startsWith('targetClue:')) return 'dossierCardId:' + t.slice('targetClue:'.length)
  if (t.startsWith('targetEvidence:')) return 'evidenceId:' + t.slice('targetEvidence:'.length)
  return t
}

function normalizeVariant(v) {
  const seen = new Set()
  const out = []
  for (const t of v.tags) {
    const n = normalizeTag(t)
    if (n === null) continue
    if (seen.has(n)) continue
    seen.add(n)
    out.push(n)
  }
  return { id: v.id, text: v.text, behaviorHint: v.behaviorHint, tags: out }
}

function emergenceIdFromVariantId(id) {
  // emerge-d4-via-... → d-4
  // emerge-e7-via-... → e-7
  // emerge-dc4-via-... → dc-4
  // emerge-d5-via-... → d-5
  // emerge-e5-via-... → e-5
  // emerge-dc5-via-... → dc-5
  const m = id.match(/^emerge-(dc\d|d\d|e\d)-via-/)
  if (!m) throw new Error(`Cannot parse emergence id from: ${id}`)
  const raw = m[1] // e.g. 'd4', 'dc4', 'e7'
  if (raw.startsWith('dc')) return 'dc-' + raw.slice(2)
  return raw[0] + '-' + raw.slice(1)
}

function main() {
  // 1. read batches + normalize
  const grouped = {}
  for (const key of Object.keys(ENTRY_KEYS)) grouped[key] = []

  for (const file of BATCH_FILES) {
    const raw = readFileSync(file, 'utf8')
    const arr = JSON.parse(raw)
    for (const v of arr) {
      const eid = emergenceIdFromVariantId(v.id)
      const entryKey = `emerge-${eid}`
      if (!grouped[entryKey]) throw new Error(`Unknown entry key derived: ${entryKey} (variant ${v.id})`)
      grouped[entryKey].push(normalizeVariant(v))
    }
  }

  // 2. build entry objects (6개)
  const newEntries = []
  for (const [key, meta] of Object.entries(ENTRY_KEYS)) {
    const variants = grouped[key]
    if (variants.length === 0) {
      console.warn(`[warn] entry ${key} 영역 variants 0 — skip`)
      continue
    }
    newEntries.push({
      key,
      ...meta.link,
      variants,
    })
  }

  console.log(`[info] grouped variants:`)
  for (const e of newEntries) console.log(`  ${e.key}: ${e.variants.length} variants`)
  const total = newEntries.reduce((s, e) => s + e.variants.length, 0)
  console.log(`[info] total: ${total} variants across ${newEntries.length} entry keys`)

  // 3. append to family-01.json emergence_narrative.entries
  const applyRaw = readFileSync(APPLY_FILE, 'utf8')
  const apply = JSON.parse(applyRaw)
  const channel = apply.channels?.emergence_narrative
  if (!channel) throw new Error('emergence_narrative channel not found in family-01.json')
  const existingKeys = new Set(channel.entries.map((e) => e.key))
  for (const e of newEntries) {
    if (existingKeys.has(e.key)) throw new Error(`Entry key ${e.key} already exists — abort`)
  }
  channel.entries.push(...newEntries)

  // 4. write back (preserve formatting: 2-space indent, sort keys NO — preserve order)
  writeFileSync(APPLY_FILE, JSON.stringify(apply, null, 2) + '\n', 'utf8')
  console.log(`[ok] appended ${total} variants to ${APPLY_FILE}`)
}

main()
