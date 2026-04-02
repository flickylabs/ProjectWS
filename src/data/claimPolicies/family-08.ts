/**
 * family-08 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family08V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-08/family-08-v2-atoms'
import { family08TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-08/family-08-tells-beats'
import { family08V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-08/family-08-v3-game-loop-data'

export function registerFamily08Data(): void {
  console.log('[Renewal] family-08 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('family-08', (family08V2Atoms as any).claimPolicies)

  registerExecutableTells('family-08', 'a', (family08TellsBeats as any).executableTells.a)
  registerExecutableTells('family-08', 'b', (family08TellsBeats as any).executableTells.b)

  registerV3GameLoopData(family08V3GameLoopData as any)

  registerBeatScripts('family-08', (family08TellsBeats as any).beatScripts)

  console.log('[Renewal] family-08 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
