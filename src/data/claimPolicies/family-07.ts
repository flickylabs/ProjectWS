/**
 * family-07 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family07V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-07/family-07-v2-atoms'
import { family07TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-07/family-07-tells-beats'
import { family07V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-07/family-07-v3-game-loop-data'

export function registerFamily07Data(): void {
  console.log('[Renewal] family-07 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('family-07', (family07V2Atoms as any).claimPolicies)

  registerExecutableTells('family-07', 'a', (family07TellsBeats as any).executableTells.a)
  registerExecutableTells('family-07', 'b', (family07TellsBeats as any).executableTells.b)

  registerV3GameLoopData(family07V3GameLoopData as any)

  registerBeatScripts('family-07', (family07TellsBeats as any).beatScripts)

  console.log('[Renewal] family-07 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
