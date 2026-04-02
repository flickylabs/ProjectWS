/**
 * friend-03 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend03V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-03/friend-03-v2-atoms'
import { friend03TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-03/friend-03-tells-beats'
import { friend03V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-03/friend-03-v3-game-loop-data'

export function registerFriend03Data(): void {
  console.log('[Renewal] friend-03 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-03', (friend03V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-03', 'a', (friend03TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-03', 'b', (friend03TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend03V3GameLoopData as any)

  registerBeatScripts('friend-03', (friend03TellsBeats as any).beatScripts)

  console.log('[Renewal] friend-03 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
