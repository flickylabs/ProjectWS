/**
 * family-01 데이터 등록 (v3 fallback + DossierCards)
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerV3GameLoopData } from '../../engine/v3GameLoopLoader'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import runtimeCase from '../cases/generated/family-01.json'
import structureV2 from './family-01-structure-v2.json'
import dossierData from './family-01-dossier-cards.json'
import { buildV3FallbackClaimPolicies } from './v3FallbackClaimPolicies'
import { ensureV3RuntimeGameLoopData } from './v3FallbackGameLoopData'
import gameEvents from './family-01-game-events.json'
import v2Atoms from './family-01-v2-atoms.json'
import type { UnsafeAny } from '../../types/lint'


export function registerFamily01Data(): void {
  console.log('[Renewal] family-01 data registration start')

  const runtimeV3Data = ensureV3RuntimeGameLoopData(runtimeCase as UnsafeAny, {
    caseId: 'family-01',
    dossierCards: (dossierData as UnsafeAny).dossierCards,
    events: gameEvents,
    transitionBeats: (gameEvents as UnsafeAny).transitionBeats,
  } as UnsafeAny)
  registerClaimPolicies('family-01', buildV3FallbackClaimPolicies(runtimeCase as UnsafeAny, runtimeV3Data as UnsafeAny))
  // v2-atoms 신규 데이터로 fallback을 덮어씀 (R5 WARN 해소)
  registerClaimPolicies('family-01', (v2Atoms as UnsafeAny).claimPolicies)
  registerV3GameLoopData(runtimeV3Data as UnsafeAny)

  registerStructureV2(structureV2 as UnsafeAny)

  console.log('[Renewal] family-01 registration complete (v3 fallback + DossierCards)')
}
