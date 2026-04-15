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

export function registerFamily01Data(): void {
  console.log('[Renewal] family-01 data registration start')

  const runtimeV3Data = ensureV3RuntimeGameLoopData(runtimeCase as any, {
    caseId: 'family-01',
    dossierCards: (dossierData as any).dossierCards,
    events: gameEvents,
    transitionBeats: (gameEvents as any).transitionBeats,
  } as any)
  registerClaimPolicies('family-01', buildV3FallbackClaimPolicies(runtimeCase as any, runtimeV3Data as any))
  registerV3GameLoopData(runtimeV3Data as any)

  registerStructureV2(structureV2 as any)

  console.log('[Renewal] family-01 registration complete (v3 fallback + DossierCards)')
}
