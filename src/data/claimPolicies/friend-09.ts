/**
 * friend-09 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend09V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-09/friend-09-v2-atoms'
import { friend09TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-09/friend-09-tells-beats'
import { friend09V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-09/friend-09-v3-game-loop-data'

export function registerFriend09Data(): void {
  console.log('[Renewal] friend-09 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-09', (friend09V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-09', 'a', (friend09TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-09', 'b', (friend09TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend09V3GameLoopData as any)

  registerBeatScripts('friend-09', (friend09TellsBeats as any).beatScripts)

  console.log('[Renewal] friend-09 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
