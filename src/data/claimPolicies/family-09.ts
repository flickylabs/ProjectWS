/**
 * family-09 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family09V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-09/family-09-v2-atoms'
import { family09TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-09/family-09-tells-beats'
import { family09V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-09/family-09-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './family-09-structure-v2.json'

export function registerFamily09Data(): void {
  console.log('[Renewal] family-09 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('family-09', (family09V2Atoms as any).claimPolicies)

  registerExecutableTells('family-09', 'a', (family09TellsBeats as any).executableTells.a)
  registerExecutableTells('family-09', 'b', (family09TellsBeats as any).executableTells.b)

  registerV3GameLoopData(family09V3GameLoopData as any)

  registerBeatScripts('family-09', (family09TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] family-09 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
