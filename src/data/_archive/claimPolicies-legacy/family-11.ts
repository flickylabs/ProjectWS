/**
 * family-11 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family11V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-11/family-11-v2-atoms'
import { family11TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-11/family-11-tells-beats'
import { family11V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-11/family-11-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './family-11-structure-v2.json'

export function registerFamily11Data(): void {
  console.log('[Renewal] family-11 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('family-11', (family11V2Atoms as any).claimPolicies)

  registerExecutableTells('family-11', 'a', (family11TellsBeats as any).executableTells.a)
  registerExecutableTells('family-11', 'b', (family11TellsBeats as any).executableTells.b)

  registerV3GameLoopData(family11V3GameLoopData as any)

  registerBeatScripts('family-11', (family11TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] family-11 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
