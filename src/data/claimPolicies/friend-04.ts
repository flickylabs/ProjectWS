/**
 * friend-04 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend04V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-04/friend-04-v2-atoms'
import { friend04TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-04/friend-04-tells-beats'
import { friend04V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-04/friend-04-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './friend-04-structure-v2.json'

export function registerFriend04Data(): void {
  console.log('[Renewal] friend-04 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-04', (friend04V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-04', 'a', (friend04TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-04', 'b', (friend04TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend04V3GameLoopData as any)

  registerBeatScripts('friend-04', (friend04TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] friend-04 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
