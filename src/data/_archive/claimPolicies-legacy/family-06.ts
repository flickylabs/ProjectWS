/**
 * family-06 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family06V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-06/family-06-v2-atoms'
import { family06TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-06/family-06-tells-beats'
import { family06V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-06/family-06-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './family-06-structure-v2.json'

export function registerFamily06Data(): void {
  console.log('[Renewal] family-06 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('family-06', (family06V2Atoms as any).claimPolicies)

  registerExecutableTells('family-06', 'a', (family06TellsBeats as any).executableTells.a)
  registerExecutableTells('family-06', 'b', (family06TellsBeats as any).executableTells.b)

  registerV3GameLoopData(family06V3GameLoopData as any)

  registerBeatScripts('family-06', (family06TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] family-06 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
