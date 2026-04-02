/**
 * family-03 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family03V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-03/family-03-v2-atoms'
import { family03TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-03/family-03-tells-beats'
import { family03V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-03/family-03-v3-game-loop-data'

export function registerFamily03Data(): void {
  console.log('[Renewal] family-03 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('family-03', (family03V2Atoms as any).claimPolicies)

  registerExecutableTells('family-03', 'a', (family03TellsBeats as any).executableTells.a)
  registerExecutableTells('family-03', 'b', (family03TellsBeats as any).executableTells.b)

  registerV3GameLoopData(family03V3GameLoopData as any)

  registerBeatScripts('family-03', (family03TellsBeats as any).beatScripts)

  console.log('[Renewal] family-03 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
