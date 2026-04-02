/**
 * spouse-03 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse03V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-03/spouse-03-v2-atoms'
import { spouse03TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-03/spouse-03-tells-beats'
import { spouse03V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-03/spouse-03-v3-game-loop-data'

export function registerSpouse03Data(): void {
  console.log('[Renewal] spouse-03 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-03', (spouse03V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-03', 'a', (spouse03TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-03', 'b', (spouse03TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse03V3GameLoopData as any)

  registerBeatScripts('spouse-03', (spouse03TellsBeats as any).beatScripts)

  console.log('[Renewal] spouse-03 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
