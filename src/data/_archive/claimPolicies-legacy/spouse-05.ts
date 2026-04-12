/**
 * spouse-05 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse05V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-05/spouse-05-v2-atoms'
import { spouse05TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-05/spouse-05-tells-beats'
import { spouse05V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-05/spouse-05-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './spouse-05-structure-v2.json'

export function registerSpouse05Data(): void {
  console.log('[Renewal] spouse-05 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-05', (spouse05V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-05', 'a', (spouse05TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-05', 'b', (spouse05TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse05V3GameLoopData as any)

  registerBeatScripts('spouse-05', (spouse05TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] spouse-05 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
