/**
 * One-off: spouse-01 Core Case Authority schema + cross-ref validation.
 * Phase 1 검증용. build step (build-core-case.cjs)에 통합 예정.
 */

import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

// register TS loader for .ts imports
try {
  register('ts-node/esm', pathToFileURL('./'))
} catch {
  // fallback: rely on tsx if invoked via `npx tsx`
}

const mod = await import('../src/data/coreCases/spouse-01.case.ts')
const authority = mod.spouse01CaseAuthority
const { parseCoreCaseAuthority, validateCoreCaseReferences } = await import('../src/types/coreCase.ts')

try {
  const parsed = parseCoreCaseAuthority(authority)
  const issues = validateCoreCaseReferences(parsed)
  const errors = issues.filter((i) => i.severity === 'error')
  const warns = issues.filter((i) => i.severity === 'warn')

  console.log(`✓ schema parse + cross-ref PASS`)
  console.log(`  errors=${errors.length}  warns=${warns.length}`)
  if (warns.length) {
    console.log(`\nwarnings:`)
    for (const w of warns) console.log(`  [${w.area}] ${w.message}`)
  }
  console.log(`\nshape summary:`)
  console.log(`  disputes=${parsed.disputes.length}`)
  console.log(`  evidence=${parsed.evidence.length}`)
  console.log(`  witnesses=${parsed.witnesses.length}`)
  console.log(`  dossierCards=${parsed.dossierCards.length}`)
  console.log(`  combinationRecipes=${parsed.combinationRecipes.length}`)
  console.log(`  authorityPlacements=${parsed.authorityPlacements.length}`)
  console.log(`  timeline=${parsed.timeline.length}`)
  console.log(`  truthTable=${parsed.truthTable.length}`)
  console.log(`  relationshipLedger=${parsed.relationshipLedger.length}`)
} catch (err) {
  console.error('✗ validation FAILED')
  console.error(err.message ?? err)
  process.exit(1)
}
