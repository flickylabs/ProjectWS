#!/usr/bin/env node
/**
 * build-core-case — Authority(src/data/coreCases/{caseId}.case.ts) → 11 derived layer
 *
 * usage:
 *   npx tsx scripts/build-core-case.mjs --case spouse-01 --dry-run
 *   npx tsx scripts/build-core-case.mjs --case spouse-01 --write
 *
 * tsx loader 필수 (.ts Authority + zod schema 로드용).
 *
 * 출력:
 *   --dry-run: tmp/core-case-derive/{caseId}/ 에 derived 결과 + _diff/ 에 layer별 unified diff
 *   --write: 실제 derived 파일 덮어쓰기 + _diff/ summary 출력
 *
 * Layer 매핑:
 *   L1 → src/data/cases/generated/{caseId}.json (legacy runtime case data)
 *   L3 → src/data/claimPolicies/{caseId}-v3-game-loop-data.json (v3 game loop)
 *   L4 → src/data/disclosurePolicy/{caseId}.json (lie state gate + lexeme policy)
 *   L5 → docs/localization/non-dialogue-extract/truth-leak-matrix.json (case별 merge)
 *
 * derive 원칙 (hybrid merge):
 *   Authority가 schema fields 권위. 단 rich rendering content (evidence.viewerData,
 *   evidence.meta, evidence.investigationResults, events.{contradictions,interjections,
 *   emotionalOutbursts}, stateUnlockAtoms, evidenceProgressions의 단계 description 보강 등)는
 *   layer-specific authored content이므로 기존 파일에서 보존한다. derive는 Authority + 보존
 *   블록을 머지한다.
 */

import path from 'node:path'
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import url from 'node:url'

import { loadAuthority } from './build-core-case/loadAuthority.mjs'
import { deriveLegacyCaseJson } from './build-core-case/derive/legacyCaseJson.mjs'
import { deriveClaimPolicyV3 } from './build-core-case/derive/claimPolicyV3.mjs'
import { deriveDisclosurePolicy } from './build-core-case/derive/disclosurePolicy.mjs'
import { deriveTruthLeakMatrix } from './build-core-case/derive/truthLeakMatrix.mjs'
import { writeDiffReport } from './build-core-case/diff/report.mjs'

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..')

function parseArgs(argv) {
  const args = { case: null, dryRun: false, write: false, layers: null }
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i]
    if (a === '--case') {
      args.case = argv[++i]
    } else if (a === '--dry-run') {
      args.dryRun = true
    } else if (a === '--write') {
      args.write = true
    } else if (a === '--layers') {
      args.layers = argv[++i].split(',').map((s) => s.trim())
    } else if (a === '--help' || a === '-h') {
      printHelp()
      process.exit(0)
    } else {
      console.error(`unknown arg: ${a}`)
      printHelp()
      process.exit(2)
    }
  }
  if (!args.case) {
    console.error('--case <id> required (e.g. spouse-01)')
    process.exit(2)
  }
  if (!args.dryRun && !args.write) {
    args.dryRun = true
  }
  if (args.dryRun && args.write) {
    console.error('--dry-run and --write are mutually exclusive')
    process.exit(2)
  }
  return args
}

function printHelp() {
  console.log(`usage:
  npx tsx scripts/build-core-case.mjs --case <id> --dry-run
  npx tsx scripts/build-core-case.mjs --case <id> --write
  npx tsx scripts/build-core-case.mjs --case <id> --dry-run --layers L1,L3,L4,L5

options:
  --case <id>     case id (e.g. spouse-01)
  --dry-run       output to tmp/core-case-derive/<caseId>/ + diff reports (default)
  --write         overwrite actual derived files
  --layers ...    subset of L1,L3,L4,L5 (default: all)`)
}

const LAYER_TARGETS = {
  L1: (caseId) => path.join('src/data/cases/generated', `${caseId}.json`),
  L3: (caseId) => path.join('src/data/claimPolicies', `${caseId}-v3-game-loop-data.json`),
  L4: (caseId) => path.join('src/data/disclosurePolicy', `${caseId}.json`),
  L5: () => 'docs/localization/non-dialogue-extract/truth-leak-matrix.json',
}

async function readJsonIfExists(absPath) {
  if (!existsSync(absPath)) return null
  const raw = await fs.readFile(absPath, 'utf8')
  return JSON.parse(raw)
}

async function writeJson(absPath, data) {
  await fs.mkdir(path.dirname(absPath), { recursive: true })
  await fs.writeFile(absPath, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

async function main() {
  const args = parseArgs(process.argv)
  const caseId = args.case

  // 1. Authority load + schema parse + cross-ref
  console.log(`▼ loading Authority for case=${caseId}`)
  const { authority, validation } = await loadAuthority(caseId, ROOT)
  console.log(
    `✓ Authority parsed (disputes=${authority.disputes.length} evidence=${authority.evidence.length} witnesses=${authority.witnesses.length} dossierCards=${authority.dossierCards.length})`,
  )
  if (validation.warns.length) {
    console.log(`  ⚠ ${validation.warns.length} warns (cross-ref):`)
    for (const w of validation.warns.slice(0, 5)) console.log(`     [${w.area}] ${w.message}`)
    if (validation.warns.length > 5) console.log(`     ... +${validation.warns.length - 5} more`)
  }

  // 2. 각 layer derive
  const wantedLayers = new Set(args.layers ?? ['L1', 'L3', 'L4', 'L5'])
  const tmpDir = path.join(ROOT, 'tmp/core-case-derive', caseId)

  /** @type {Array<{layer:string, targetPath:string, derived:any, existing:any}>} */
  const layerResults = []

  if (wantedLayers.has('L1')) {
    const targetRel = LAYER_TARGETS.L1(caseId)
    const targetAbs = path.join(ROOT, targetRel)
    const existing = await readJsonIfExists(targetAbs)
    const derived = deriveLegacyCaseJson(authority, existing)
    layerResults.push({ layer: 'L1', targetPath: targetRel, derived, existing })
  }
  if (wantedLayers.has('L3')) {
    const targetRel = LAYER_TARGETS.L3(caseId)
    const targetAbs = path.join(ROOT, targetRel)
    const existing = await readJsonIfExists(targetAbs)
    const derived = deriveClaimPolicyV3(authority, existing)
    layerResults.push({ layer: 'L3', targetPath: targetRel, derived, existing })
  }
  if (wantedLayers.has('L4')) {
    const targetRel = LAYER_TARGETS.L4(caseId)
    const targetAbs = path.join(ROOT, targetRel)
    const existing = await readJsonIfExists(targetAbs)
    const derived = deriveDisclosurePolicy(authority, existing)
    layerResults.push({ layer: 'L4', targetPath: targetRel, derived, existing })
  }
  if (wantedLayers.has('L5')) {
    const targetRel = LAYER_TARGETS.L5(caseId)
    const targetAbs = path.join(ROOT, targetRel)
    const existing = await readJsonIfExists(targetAbs)
    const derived = deriveTruthLeakMatrix(authority, existing)
    layerResults.push({ layer: 'L5', targetPath: targetRel, derived, existing })
  }

  // 3. dry-run: tmp dir에 derived + diff report 출력
  if (args.dryRun) {
    console.log(`\n▼ dry-run output dir: ${path.relative(ROOT, tmpDir)}`)
    // 기존 tmp dir 청소
    await fs.rm(tmpDir, { recursive: true, force: true })

    for (const { layer, targetPath, derived } of layerResults) {
      const outAbs = path.join(tmpDir, targetPath)
      await writeJson(outAbs, derived)
      console.log(`  ✓ wrote ${path.relative(ROOT, outAbs)}`)
    }

    // diff report
    console.log(`\n▼ diff report (Authority derive vs existing)\n`)
    await writeDiffReport(layerResults, tmpDir, ROOT)
    console.log(`\n→ detailed unified diff: ${path.relative(ROOT, path.join(tmpDir, '_diff'))}/`)
    console.log(`→ next: review diff, then re-run with --write to apply`)
  }

  // 4. write: 실제 파일 덮어쓰기
  if (args.write) {
    console.log(`\n▼ writing derived files to actual paths`)
    for (const { layer, targetPath, derived } of layerResults) {
      const outAbs = path.join(ROOT, targetPath)
      await writeJson(outAbs, derived)
      console.log(`  ✓ wrote ${targetPath}`)
    }
    // 동시에 tmp 영역에도 diff report 남김 (사용자 사후 검토용)
    await fs.rm(tmpDir, { recursive: true, force: true })
    for (const { layer, targetPath, derived } of layerResults) {
      const outAbs = path.join(tmpDir, targetPath)
      await writeJson(outAbs, derived)
    }
    await writeDiffReport(layerResults, tmpDir, ROOT)
    console.log(`\n→ diff report (for post-review): ${path.relative(ROOT, path.join(tmpDir, '_diff'))}/`)
  }
}

main().catch((err) => {
  console.error('✗ build-core-case FAILED')
  console.error(err.stack ?? err.message ?? err)
  process.exit(1)
})
