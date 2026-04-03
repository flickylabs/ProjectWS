/**
 * neighbor-08 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor08V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-08/neighbor-08-v2-atoms'
import { neighbor08TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-08/neighbor-08-tells-beats'
import { neighbor08V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-08/neighbor-08-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './neighbor-08-structure-v2.json'

export function registerNeighbor08Data(): void {
  console.log('[Renewal] neighbor-08 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-08', (neighbor08V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-08', 'a', (neighbor08TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-08', 'b', (neighbor08TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor08V3GameLoopData as any)

  registerBeatScripts('neighbor-08', (neighbor08TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] neighbor-08 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
