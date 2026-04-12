/**
 * neighbor-03 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor03V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-03/neighbor-03-v2-atoms'
import { neighbor03TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-03/neighbor-03-tells-beats'
import { neighbor03V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-03/neighbor-03-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './neighbor-03-structure-v2.json'

export function registerNeighbor03Data(): void {
  console.log('[Renewal] neighbor-03 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-03', (neighbor03V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-03', 'a', (neighbor03TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-03', 'b', (neighbor03TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor03V3GameLoopData as any)

  registerBeatScripts('neighbor-03', (neighbor03TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] neighbor-03 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
