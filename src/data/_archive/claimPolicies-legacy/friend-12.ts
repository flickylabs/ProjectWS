/**
 * friend-12 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { friend12V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-12/friend-12-v2-atoms'
import { friend12TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-12/friend-12-tells-beats'
import { friend12V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/friend-12/friend-12-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './friend-12-structure-v2.json'

export function registerFriend12Data(): void {
  console.log('[Renewal] friend-12 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('friend-12', (friend12V2Atoms as any).claimPolicies)

  registerExecutableTells('friend-12', 'a', (friend12TellsBeats as any).executableTells.a)
  registerExecutableTells('friend-12', 'b', (friend12TellsBeats as any).executableTells.b)

  registerV3GameLoopData(friend12V3GameLoopData as any)

  registerBeatScripts('friend-12', (friend12TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] friend-12 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
