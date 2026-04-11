import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerV3GameLoopData } from '../../engine/v3GameLoopLoader'
import runtimeCase from '../cases/generated/spouse-v3-01.json'
import v3GameLoopData from '../../../docs/ref/리뉴얼참고/spouse-v3-01-v3-game-loop-data.json'
import { buildV3FallbackClaimPolicies } from './v3FallbackClaimPolicies'
import { ensureV3RuntimeGameLoopData } from './v3FallbackGameLoopData'

export function registerSpouseV301Data(): void {
  const runtimeV3Data = ensureV3RuntimeGameLoopData(runtimeCase as any, v3GameLoopData as any)
  console.log('[Renewal] spouse-v3-01 data registration start')
  registerClaimPolicies('spouse-v3-01', buildV3FallbackClaimPolicies(runtimeCase as any, runtimeV3Data as any))
  registerV3GameLoopData(runtimeV3Data as any)
  console.log('[Renewal] spouse-v3-01 registration complete: ClaimPolicies + V3 GameLoop')
}
