/**
 * spouse-04 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse04V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-04/spouse-04-v2-atoms'
import { spouse04TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-04/spouse-04-tells-beats'
import { spouse04V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-04/spouse-04-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './spouse-04-structure-v2.json'

export function registerSpouse04Data(): void {
  console.log('[Renewal] spouse-04 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-04', (spouse04V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-04', 'a', (spouse04TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-04', 'b', (spouse04TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse04V3GameLoopData as any)

  registerBeatScripts('spouse-04', (spouse04TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] spouse-04 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
