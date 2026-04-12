/**
 * friend-05 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend05V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-05/friend-05-v2-atoms'
import { friend05TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-05/friend-05-tells-beats'
import { friend05V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-05/friend-05-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './friend-05-structure-v2.json'

export function registerFriend05Data(): void {
  console.log('[Renewal] friend-05 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-05', (friend05V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-05', 'a', (friend05TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-05', 'b', (friend05TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend05V3GameLoopData as any)

  registerBeatScripts('friend-05', (friend05TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] friend-05 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
