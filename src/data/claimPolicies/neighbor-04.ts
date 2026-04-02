/**
 * neighbor-04 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor04V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-04/neighbor-04-v2-atoms'
import { neighbor04TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-04/neighbor-04-tells-beats'
import { neighbor04V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-04/neighbor-04-v3-game-loop-data'

export function registerNeighbor04Data(): void {
  console.log('[Renewal] neighbor-04 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-04', (neighbor04V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-04', 'a', (neighbor04TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-04', 'b', (neighbor04TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor04V3GameLoopData as any)

  registerBeatScripts('neighbor-04', (neighbor04TellsBeats as any).beatScripts)

  console.log('[Renewal] neighbor-04 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
