/**
 * neighbor-10 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor10V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-10/neighbor-10-v2-atoms'
import { neighbor10TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-10/neighbor-10-tells-beats'
import { neighbor10V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-10/neighbor-10-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './neighbor-10-structure-v2.json'

export function registerNeighbor10Data(): void {
  console.log('[Renewal] neighbor-10 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-10', (neighbor10V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-10', 'a', (neighbor10TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-10', 'b', (neighbor10TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor10V3GameLoopData as any)

  registerBeatScripts('neighbor-10', (neighbor10TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] neighbor-10 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
