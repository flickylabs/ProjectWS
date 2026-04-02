/**
 * friend-02 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend02V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-02/friend-02-v2-atoms'
import { friend02TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-02/friend-02-tells-beats'
import { friend02V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-02/friend-02-v3-game-loop-data'

export function registerFriend02Data(): void {
  console.log('[Renewal] friend-02 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-02', (friend02V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-02', 'a', (friend02TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-02', 'b', (friend02TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend02V3GameLoopData as any)

  registerBeatScripts('friend-02', (friend02TellsBeats as any).beatScripts)

  console.log('[Renewal] friend-02 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
