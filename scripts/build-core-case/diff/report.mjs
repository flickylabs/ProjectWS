/**
 * diff report — Authority derive 결과 vs 기존 파일 비교.
 *
 * 출력:
 *   tmp/core-case-derive/{caseId}/_diff/
 *     _summary.md        layer별 high-level 요약 (counts + 주요 추가/삭제 항목)
 *     {layer}.before.json   기존 파일 snapshot (없으면 '{}' empty)
 *     {layer}.after.json    derived 결과 snapshot
 *
 * 사용자 review 방식:
 *   1. _summary.md 먼저 읽기
 *   2. 상세 변경은 `git diff --no-index {layer}.before.json {layer}.after.json`
 *      또는 IDE compare view
 */

import path from 'node:path'
import fs from 'node:fs/promises'

/** 두 객체에서 added/removed/modified 키를 비교. depth=1만 본다. */
function topLevelDiff(before, after) {
  const beforeKeys = new Set(Object.keys(before ?? {}))
  const afterKeys = new Set(Object.keys(after ?? {}))
  const added = [...afterKeys].filter((k) => !beforeKeys.has(k))
  const removed = [...beforeKeys].filter((k) => !afterKeys.has(k))
  const modified = []
  for (const k of beforeKeys) {
    if (!afterKeys.has(k)) continue
    const b = before[k]
    const a = after[k]
    if (JSON.stringify(b) !== JSON.stringify(a)) modified.push(k)
  }
  return { added, removed, modified }
}

/** disputes / evidence / dossierCards 같은 array 영역의 ID diff. */
function arrayIdDiff(before, after, idKey = 'id') {
  const beforeIds = new Set((before ?? []).map((x) => x?.[idKey]).filter(Boolean))
  const afterIds = new Set((after ?? []).map((x) => x?.[idKey]).filter(Boolean))
  const added = [...afterIds].filter((id) => !beforeIds.has(id))
  const removed = [...beforeIds].filter((id) => !afterIds.has(id))
  const beforeById = new Map((before ?? []).map((x) => [x?.[idKey], x]))
  const afterById = new Map((after ?? []).map((x) => [x?.[idKey], x]))
  const modified = []
  for (const id of beforeIds) {
    if (!afterIds.has(id)) continue
    if (JSON.stringify(beforeById.get(id)) !== JSON.stringify(afterById.get(id))) {
      modified.push(id)
    }
  }
  return { added, removed, modified }
}

function fmtList(arr, max = 10) {
  if (!arr || arr.length === 0) return '(none)'
  if (arr.length <= max) return arr.join(', ')
  return arr.slice(0, max).join(', ') + ` ... +${arr.length - max}`
}

function summarizeLayer(layer, targetPath, derived, existing) {
  const lines = []
  lines.push(`## ${layer} — \`${targetPath}\``)
  lines.push('')

  if (existing == null) {
    lines.push(`(no existing file — derived produces a new file)`)
    lines.push('')
    return lines.join('\n')
  }

  // top-level keys
  const top = topLevelDiff(existing, derived)
  lines.push(`**Top-level keys**`)
  lines.push(`- added: ${fmtList(top.added)}`)
  lines.push(`- removed: ${fmtList(top.removed)}`)
  lines.push(`- modified: ${fmtList(top.modified)}`)
  lines.push('')

  // Layer-specific deep dives
  if (layer === 'L1') {
    summarizeL1(lines, existing, derived)
  } else if (layer === 'L3') {
    summarizeL3(lines, existing, derived)
  } else if (layer === 'L4') {
    summarizeL4(lines, existing, derived)
  } else if (layer === 'L5') {
    summarizeL5(lines, existing, derived)
  }

  return lines.join('\n')
}

function summarizeL1(lines, before, after) {
  // disputes / evidence / witnesses (in duo.socialGraph) / dossierCards (combinationLab.nodes derived_note)
  const dDiff = arrayIdDiff(before.disputes, after.disputes)
  lines.push(`**disputes**`)
  lines.push(`- added: ${fmtList(dDiff.added)}`)
  lines.push(`- removed: ${fmtList(dDiff.removed)}`)
  lines.push(`- modified: ${fmtList(dDiff.modified)}`)
  lines.push('')

  const eDiff = arrayIdDiff(before.evidence, after.evidence)
  lines.push(`**evidence**`)
  lines.push(`- added: ${fmtList(eDiff.added)}`)
  lines.push(`- removed: ${fmtList(eDiff.removed)}`)
  lines.push(`- modified: ${fmtList(eDiff.modified)}`)
  lines.push('')

  const wDiff = arrayIdDiff(before.duo?.socialGraph, after.duo?.socialGraph)
  lines.push(`**witnesses (duo.socialGraph)**`)
  lines.push(`- added: ${fmtList(wDiff.added)}`)
  lines.push(`- removed: ${fmtList(wDiff.removed)}`)
  lines.push(`- modified: ${fmtList(wDiff.modified)}`)
  lines.push('')

  // combinationLab.outputs (dossier cards)
  const dcDiff = arrayIdDiff(before.combinationLab?.outputs, after.combinationLab?.outputs)
  lines.push(`**combinationLab.outputs (dossier cards)**`)
  lines.push(`- added: ${fmtList(dcDiff.added)}`)
  lines.push(`- removed: ${fmtList(dcDiff.removed)}`)
  lines.push(`- modified: ${fmtList(dcDiff.modified)}`)
  lines.push('')

  const rDiff = arrayIdDiff(before.combinationLab?.recipes, after.combinationLab?.recipes)
  lines.push(`**combinationLab.recipes**`)
  lines.push(`- added: ${fmtList(rDiff.added)}`)
  lines.push(`- removed: ${fmtList(rDiff.removed)}`)
  lines.push(`- modified: ${fmtList(rDiff.modified)}`)
  lines.push('')

  // caseId rename
  if (before.caseId !== after.caseId) {
    lines.push(`**caseId**: \`${before.caseId}\` → \`${after.caseId}\``)
    lines.push('')
  }
}

function summarizeL3(lines, before, after) {
  const dcDiff = arrayIdDiff(before.dossierCards, after.dossierCards)
  lines.push(`**dossierCards**`)
  lines.push(`- added: ${fmtList(dcDiff.added)}`)
  lines.push(`- removed: ${fmtList(dcDiff.removed)}`)
  lines.push(`- modified: ${fmtList(dcDiff.modified)}`)
  lines.push('')

  const tbDiff = arrayIdDiff(before.transitionBeats, after.transitionBeats)
  lines.push(`**transitionBeats**`)
  lines.push(`- added: ${fmtList(tbDiff.added)}`)
  lines.push(`- removed: ${fmtList(tbDiff.removed)}`)
  lines.push(`- modified: ${fmtList(tbDiff.modified)}`)
  lines.push('')

  const epDiff = arrayIdDiff(before.evidenceProgressions, after.evidenceProgressions, 'evidenceId')
  lines.push(`**evidenceProgressions**`)
  lines.push(`- added: ${fmtList(epDiff.added)}`)
  lines.push(`- removed: ${fmtList(epDiff.removed)}`)
  lines.push(`- modified: ${fmtList(epDiff.modified)}`)
  lines.push('')

  const llDiff = arrayIdDiff(before.leadLines, after.leadLines)
  lines.push(`**leadLines**`)
  lines.push(`- added: ${fmtList(llDiff.added)}`)
  lines.push(`- removed: ${fmtList(llDiff.removed)}`)
  lines.push(`- modified: ${fmtList(llDiff.modified)}`)
  lines.push('')

  const hdpDiff = arrayIdDiff(before.hiddenDisputePlans, after.hiddenDisputePlans, 'disputeId')
  lines.push(`**hiddenDisputePlans**`)
  lines.push(`- added: ${fmtList(hdpDiff.added)}`)
  lines.push(`- removed: ${fmtList(hdpDiff.removed)}`)
  lines.push(`- modified: ${fmtList(hdpDiff.modified)}`)
  lines.push('')

  // caseId
  if (before.caseId !== after.caseId) {
    lines.push(`**caseId**: \`${before.caseId}\` → \`${after.caseId}\``)
    lines.push('')
  }
}

function summarizeL4(lines, before, after) {
  // surfaceMap.evidence / disputes / witnesses
  const seDiff = topLevelDiff(before.surfaceMap?.evidence, after.surfaceMap?.evidence)
  lines.push(`**surfaceMap.evidence**`)
  lines.push(`- added: ${fmtList(seDiff.added)}`)
  lines.push(`- removed: ${fmtList(seDiff.removed)}`)
  lines.push(`- modified: ${fmtList(seDiff.modified)}`)
  lines.push('')

  const sdDiff = topLevelDiff(before.surfaceMap?.disputes, after.surfaceMap?.disputes)
  lines.push(`**surfaceMap.disputes**`)
  lines.push(`- added: ${fmtList(sdDiff.added)}`)
  lines.push(`- removed: ${fmtList(sdDiff.removed)}`)
  lines.push(`- modified: ${fmtList(sdDiff.modified)}`)
  lines.push('')

  const swDiff = topLevelDiff(before.surfaceMap?.witnesses, after.surfaceMap?.witnesses)
  lines.push(`**surfaceMap.witnesses**`)
  lines.push(`- added: ${fmtList(swDiff.added)}`)
  lines.push(`- removed: ${fmtList(swDiff.removed)}`)
  lines.push(`- modified: ${fmtList(swDiff.modified)}`)
  lines.push('')

  // forbiddenLexemes.globalTruthLexemes — array diff
  const beforeFLG = new Set(before.forbiddenLexemes?.globalTruthLexemes ?? [])
  const afterFLG = new Set(after.forbiddenLexemes?.globalTruthLexemes ?? [])
  const flgAdded = [...afterFLG].filter((x) => !beforeFLG.has(x))
  const flgRemoved = [...beforeFLG].filter((x) => !afterFLG.has(x))
  lines.push(`**forbiddenLexemes.globalTruthLexemes**`)
  lines.push(`- added (${flgAdded.length}): ${fmtList(flgAdded, 15)}`)
  lines.push(`- removed (${flgRemoved.length}): ${fmtList(flgRemoved, 15)}`)
  lines.push('')

  // discoveryText.entries
  const dtDiff = topLevelDiff(before.discoveryText?.entries, after.discoveryText?.entries)
  lines.push(`**discoveryText.entries**`)
  lines.push(`- added: ${fmtList(dtDiff.added)}`)
  lines.push(`- removed: ${fmtList(dtDiff.removed)}`)
  lines.push(`- modified: ${fmtList(dtDiff.modified)}`)
  lines.push('')

  // issueProgression.disputes
  const ipDiff = topLevelDiff(before.issueProgression?.disputes, after.issueProgression?.disputes)
  lines.push(`**issueProgression.disputes**`)
  lines.push(`- added: ${fmtList(ipDiff.added)}`)
  lines.push(`- removed: ${fmtList(ipDiff.removed)}`)
  lines.push(`- modified: ${fmtList(ipDiff.modified)}`)
  lines.push('')
}

function summarizeL5(lines, before, after) {
  // matrix has top-level case IDs as keys
  const beforeCases = Object.keys(before).filter((k) => !k.startsWith('_'))
  const afterCases = Object.keys(after).filter((k) => !k.startsWith('_'))
  lines.push(`**Cases in matrix**`)
  lines.push(`- before: ${beforeCases.join(', ')}`)
  lines.push(`- after: ${afterCases.join(', ')}`)
  lines.push('')

  // diff for each case
  for (const caseId of afterCases) {
    if (!before[caseId]) {
      lines.push(`**${caseId}**: new case in matrix`)
      lines.push('')
      continue
    }
    const dDiff = topLevelDiff(before[caseId], after[caseId])
    if (dDiff.added.length === 0 && dDiff.removed.length === 0 && dDiff.modified.length === 0) {
      lines.push(`**${caseId}**: (no changes)`)
      lines.push('')
      continue
    }
    lines.push(`**${caseId} disputes**`)
    lines.push(`- added: ${fmtList(dDiff.added)}`)
    lines.push(`- removed: ${fmtList(dDiff.removed)}`)
    lines.push(`- modified: ${fmtList(dDiff.modified)}`)
    lines.push('')
  }
}

function fmtBytes(n) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(2)} MB`
}

/**
 * @param {Array<{layer:string, targetPath:string, derived:any, existing:any}>} layerResults
 * @param {string} tmpDir
 * @param {string} rootDir
 */
export async function writeDiffReport(layerResults, tmpDir, rootDir) {
  const diffDir = path.join(tmpDir, '_diff')
  await fs.mkdir(diffDir, { recursive: true })

  const summaryLines = []
  summaryLines.push(`# Core Case Derive — Diff Summary`)
  summaryLines.push('')
  summaryLines.push(`Generated by: \`scripts/build-core-case.mjs\``)
  summaryLines.push('')
  summaryLines.push(`Layers: ${layerResults.map((l) => l.layer).join(', ')}`)
  summaryLines.push('')

  for (const { layer, targetPath, derived, existing } of layerResults) {
    const beforeFile = path.join(diffDir, `${layer}.before.json`)
    const afterFile = path.join(diffDir, `${layer}.after.json`)
    const beforeRaw = JSON.stringify(existing ?? {}, null, 2) + '\n'
    const afterRaw = JSON.stringify(derived, null, 2) + '\n'
    await fs.writeFile(beforeFile, beforeRaw, 'utf8')
    await fs.writeFile(afterFile, afterRaw, 'utf8')

    const sizeBefore = Buffer.byteLength(beforeRaw, 'utf8')
    const sizeAfter = Buffer.byteLength(afterRaw, 'utf8')
    const sizeDelta = sizeAfter - sizeBefore

    summaryLines.push(`---`)
    summaryLines.push('')
    summaryLines.push(summarizeLayer(layer, targetPath, derived, existing))
    summaryLines.push('')
    summaryLines.push(
      `**Size**: ${fmtBytes(sizeBefore)} → ${fmtBytes(sizeAfter)} (Δ ${sizeDelta >= 0 ? '+' : ''}${fmtBytes(Math.abs(sizeDelta))})`,
    )
    summaryLines.push('')
    summaryLines.push(
      `**Detailed diff**:  \`git diff --no-index ${path.relative(rootDir, beforeFile)} ${path.relative(rootDir, afterFile)}\``,
    )
    summaryLines.push('')
  }

  const summaryPath = path.join(diffDir, '_summary.md')
  await fs.writeFile(summaryPath, summaryLines.join('\n'), 'utf8')

  // Console summary (short)
  for (const { layer, targetPath, derived, existing } of layerResults) {
    if (existing == null) {
      console.log(`  ${layer} ${targetPath}: NEW FILE`)
      continue
    }
    const top = topLevelDiff(existing, derived)
    const changes =
      top.added.length === 0 && top.removed.length === 0 && top.modified.length === 0
        ? '(no top-level changes)'
        : `+${top.added.length}/-${top.removed.length}/~${top.modified.length}`
    console.log(`  ${layer} ${targetPath}: ${changes}`)
  }
  console.log(`\n→ full summary: ${path.relative(rootDir, summaryPath)}`)
}
