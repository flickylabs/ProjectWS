/**
 * neighbor-12 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor12V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-12/neighbor-12-v2-atoms'
import { neighbor12TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-12/neighbor-12-tells-beats'
import { neighbor12V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-12/neighbor-12-v3-game-loop-data'

export function registerNeighbor12Data(): void {
  console.log('[Renewal] neighbor-12 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-12', (neighbor12V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-12', 'a', (neighbor12TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-12', 'b', (neighbor12TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor12V3GameLoopData as any)

  registerBeatScripts('neighbor-12', (neighbor12TellsBeats as any).beatScripts)

  console.log('[Renewal] neighbor-12 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
