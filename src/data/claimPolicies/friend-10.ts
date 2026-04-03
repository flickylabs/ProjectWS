/**
 * friend-10 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend10V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-10/friend-10-v2-atoms'
import { friend10TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-10/friend-10-tells-beats'
import { friend10V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-10/friend-10-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './friend-10-structure-v2.json'

export function registerFriend10Data(): void {
  console.log('[Renewal] friend-10 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-10', (friend10V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-10', 'a', (friend10TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-10', 'b', (friend10TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend10V3GameLoopData as any)

  registerBeatScripts('friend-10', (friend10TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] friend-10 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
