/**
 * spouse-10 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse10V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-10/spouse-10-v2-atoms'
import { spouse10TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-10/spouse-10-tells-beats'
import { spouse10V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-10/spouse-10-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './spouse-10-structure-v2.json'

export function registerSpouse10Data(): void {
  console.log('[Renewal] spouse-10 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-10', (spouse10V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-10', 'a', (spouse10TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-10', 'b', (spouse10TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse10V3GameLoopData as any)

  registerBeatScripts('spouse-10', (spouse10TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] spouse-10 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
