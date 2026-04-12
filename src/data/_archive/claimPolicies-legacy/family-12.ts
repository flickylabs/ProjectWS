/**
 * family-12 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family12V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-12/family-12-v2-atoms'
import { family12TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-12/family-12-tells-beats'
import { family12V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-12/family-12-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './family-12-structure-v2.json'

export function registerFamily12Data(): void {
  console.log('[Renewal] family-12 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('family-12', (family12V2Atoms as any).claimPolicies)

  registerExecutableTells('family-12', 'a', (family12TellsBeats as any).executableTells.a)
  registerExecutableTells('family-12', 'b', (family12TellsBeats as any).executableTells.b)

  registerV3GameLoopData(family12V3GameLoopData as any)

  registerBeatScripts('family-12', (family12TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] family-12 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
