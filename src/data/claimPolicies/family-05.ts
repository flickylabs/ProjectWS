/**
 * family-05 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family05V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-05/family-05-v2-atoms'
import { family05TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-05/family-05-tells-beats'
import { family05V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-05/family-05-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './family-05-structure-v2.json'

export function registerFamily05Data(): void {
  console.log('[Renewal] family-05 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('family-05', (family05V2Atoms as any).claimPolicies)

  registerExecutableTells('family-05', 'a', (family05TellsBeats as any).executableTells.a)
  registerExecutableTells('family-05', 'b', (family05TellsBeats as any).executableTells.b)

  registerV3GameLoopData(family05V3GameLoopData as any)

  registerBeatScripts('family-05', (family05TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] family-05 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
