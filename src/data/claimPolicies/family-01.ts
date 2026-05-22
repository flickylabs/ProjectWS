/**
 * family-01 데이터 등록 (v3 fallback + Structure V2)
 *
 * 2026-05-23 코어 시스템 Phase 3 마이그레이션 — family-01-v3-game-loop-data.json이
 * Authority(src/data/coreCases/family-01.case.ts) 에서 derive되어 spouse-01과 동일 패턴으로 import.
 * 기존 family-01-dossier-cards.json은 deprecated (v3 안에 통합됨).
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerV3GameLoopData } from '../../engine/v3GameLoopLoader'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import runtimeCase from '../cases/generated/family-01.json'
import v3GameLoopData from './family-01-v3-game-loop-data.json'
import structureV2 from './family-01-structure-v2.json'
import gameEvents from './family-01-game-events.json'
import v2Atoms from './family-01-v2-atoms.json'
import { buildV3FallbackClaimPolicies } from './v3FallbackClaimPolicies'
import { ensureV3RuntimeGameLoopData } from './v3FallbackGameLoopData'
import type { UnsafeAny } from '../../types/lint'


export function registerFamily01Data(): void {
  console.log('[Renewal] family-01 data registration start')

  const v3WithEvents = { ...v3GameLoopData, events: gameEvents } as UnsafeAny
  const runtimeV3Data = ensureV3RuntimeGameLoopData(runtimeCase as UnsafeAny, v3WithEvents)
  registerClaimPolicies('family-01', buildV3FallbackClaimPolicies(runtimeCase as UnsafeAny, runtimeV3Data as UnsafeAny))
  // v2-atoms 신규 데이터로 fallback을 덮어씀 (R5 WARN 해소)
  registerClaimPolicies('family-01', (v2Atoms as UnsafeAny).claimPolicies)
  registerV3GameLoopData(runtimeV3Data as UnsafeAny)

  registerStructureV2(structureV2 as UnsafeAny)

  console.log('[Renewal] family-01 registration complete')
}
