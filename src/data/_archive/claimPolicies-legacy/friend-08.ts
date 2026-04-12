/**
 * friend-08 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend08V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-08/friend-08-v2-atoms'
import { friend08TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-08/friend-08-tells-beats'
import { friend08V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-08/friend-08-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './friend-08-structure-v2.json'

export function registerFriend08Data(): void {
  console.log('[Renewal] friend-08 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-08', (friend08V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-08', 'a', (friend08TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-08', 'b', (friend08TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend08V3GameLoopData as any)

  registerBeatScripts('friend-08', (friend08TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] friend-08 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
