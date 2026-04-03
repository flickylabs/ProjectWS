/**
 * neighbor-05 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor05V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-05/neighbor-05-v2-atoms'
import { neighbor05TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-05/neighbor-05-tells-beats'
import { neighbor05V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-05/neighbor-05-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './neighbor-05-structure-v2.json'

export function registerNeighbor05Data(): void {
  console.log('[Renewal] neighbor-05 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-05', (neighbor05V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-05', 'a', (neighbor05TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-05', 'b', (neighbor05TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor05V3GameLoopData as any)

  registerBeatScripts('neighbor-05', (neighbor05TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] neighbor-05 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
