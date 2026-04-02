/**
 * family-04 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family04V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-04/family-04-v2-atoms'
import { family04TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-04/family-04-tells-beats'
import { family04V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-04/family-04-v3-game-loop-data'

export function registerFamily04Data(): void {
  console.log('[Renewal] family-04 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('family-04', (family04V2Atoms as any).claimPolicies)

  registerExecutableTells('family-04', 'a', (family04TellsBeats as any).executableTells.a)
  registerExecutableTells('family-04', 'b', (family04TellsBeats as any).executableTells.b)

  registerV3GameLoopData(family04V3GameLoopData as any)

  registerBeatScripts('family-04', (family04TellsBeats as any).beatScripts)

  console.log('[Renewal] family-04 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
