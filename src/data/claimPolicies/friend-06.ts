/**
 * friend-06 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend06V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-06/friend-06-v2-atoms'
import { friend06TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-06/friend-06-tells-beats'
import { friend06V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-06/friend-06-v3-game-loop-data'

export function registerFriend06Data(): void {
  console.log('[Renewal] friend-06 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-06', (friend06V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-06', 'a', (friend06TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-06', 'b', (friend06TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend06V3GameLoopData as any)

  registerBeatScripts('friend-06', (friend06TellsBeats as any).beatScripts)

  console.log('[Renewal] friend-06 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
