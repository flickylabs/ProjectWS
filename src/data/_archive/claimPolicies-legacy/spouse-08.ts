/**
 * spouse-08 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse08V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-08/spouse-08-v2-atoms'
import { spouse08TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-08/spouse-08-tells-beats'
import { spouse08V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-08/spouse-08-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './spouse-08-structure-v2.json'

export function registerSpouse08Data(): void {
  console.log('[Renewal] spouse-08 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-08', (spouse08V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-08', 'a', (spouse08TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-08', 'b', (spouse08TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse08V3GameLoopData as any)

  registerBeatScripts('spouse-08', (spouse08TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] spouse-08 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
