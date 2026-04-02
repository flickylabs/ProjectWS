/**
 * neighbor-11 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor11V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-11/neighbor-11-v2-atoms'
import { neighbor11TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-11/neighbor-11-tells-beats'
import { neighbor11V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-11/neighbor-11-v3-game-loop-data'

export function registerNeighbor11Data(): void {
  console.log('[Renewal] neighbor-11 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-11', (neighbor11V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-11', 'a', (neighbor11TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-11', 'b', (neighbor11TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor11V3GameLoopData as any)

  registerBeatScripts('neighbor-11', (neighbor11TellsBeats as any).beatScripts)

  console.log('[Renewal] neighbor-11 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
