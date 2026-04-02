/**
 * neighbor-06 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor06V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-06/neighbor-06-v2-atoms'
import { neighbor06TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-06/neighbor-06-tells-beats'
import { neighbor06V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-06/neighbor-06-v3-game-loop-data'

export function registerNeighbor06Data(): void {
  console.log('[Renewal] neighbor-06 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-06', (neighbor06V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-06', 'a', (neighbor06TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-06', 'b', (neighbor06TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor06V3GameLoopData as any)

  registerBeatScripts('neighbor-06', (neighbor06TellsBeats as any).beatScripts)

  console.log('[Renewal] neighbor-06 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
