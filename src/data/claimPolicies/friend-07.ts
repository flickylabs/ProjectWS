/**
 * friend-07 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend07V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-07/friend-07-v2-atoms'
import { friend07TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-07/friend-07-tells-beats'
import { friend07V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-07/friend-07-v3-game-loop-data'

export function registerFriend07Data(): void {
  console.log('[Renewal] friend-07 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-07', (friend07V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-07', 'a', (friend07TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-07', 'b', (friend07TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend07V3GameLoopData as any)

  registerBeatScripts('friend-07', (friend07TellsBeats as any).beatScripts)

  console.log('[Renewal] friend-07 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
