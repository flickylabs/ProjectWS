/**
 * spouse-01 데이터 등록 (v3 fallback + Structure V2)
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerV3GameLoopData } from '../../engine/v3GameLoopLoader'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import runtimeCase from '../cases/generated/spouse-01.json'
import v3GameLoopData from './spouse-01-v3-game-loop-data.json'
import structureV2 from './spouse-01-structure-v2.json'
import gameEvents from './spouse-01-game-events.json'
import v2Atoms from './spouse-01-v2-atoms.json'
import { buildV3FallbackClaimPolicies } from './v3FallbackClaimPolicies'
import { ensureV3RuntimeGameLoopData } from './v3FallbackGameLoopData'
import type { UnsafeAny } from '../../types/lint'


export function registerSpouse01Data(): void {
  console.log('[Renewal] spouse-01 data registration start')

  const v3WithEvents = { ...v3GameLoopData, events: gameEvents } as UnsafeAny
  const runtimeV3Data = ensureV3RuntimeGameLoopData(runtimeCase as UnsafeAny, v3WithEvents)
  registerClaimPolicies('spouse-01', buildV3FallbackClaimPolicies(runtimeCase as UnsafeAny, runtimeV3Data as UnsafeAny))
  // v2-atoms 신규 데이터로 fallback을 덮어씀 (R5 WARN 해소)
  registerClaimPolicies('spouse-01', (v2Atoms as UnsafeAny).claimPolicies)
  registerV3GameLoopData(runtimeV3Data as UnsafeAny)

  registerStructureV2(structureV2 as UnsafeAny)

  console.log('[Renewal] spouse-01 registration complete')
}
