/**
 * friend-11 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend11V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-11/friend-11-v2-atoms'
import { friend11TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-11/friend-11-tells-beats'
import { friend11V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-11/friend-11-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './friend-11-structure-v2.json'

export function registerFriend11Data(): void {
  console.log('[Renewal] friend-11 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-11', (friend11V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-11', 'a', (friend11TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-11', 'b', (friend11TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend11V3GameLoopData as any)

  registerBeatScripts('friend-11', (friend11TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] friend-11 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
