/**
 * friend-01 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend01V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-v2-atoms'
import { friend01TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-tells-beats'
import { friend01V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-v3-game-loop-data'

export function registerFriend01Data(): void {
  console.log('[Renewal] friend-01 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-01', (friend01V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-01', 'a', (friend01TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-01', 'b', (friend01TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend01V3GameLoopData as any)

  registerBeatScripts('friend-01', (friend01TellsBeats as any).beatScripts)

  console.log('[Renewal] friend-01 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
