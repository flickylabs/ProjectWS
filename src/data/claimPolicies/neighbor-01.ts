/**
 * neighbor-01 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor01V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-01/neighbor-01-v2-atoms'
import { neighbor01TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-01/neighbor-01-tells-beats'
import { neighbor01V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-01/neighbor-01-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './neighbor-01-structure-v2.json'

export function registerNeighbor01Data(): void {
  console.log('[Renewal] neighbor-01 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-01', (neighbor01V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-01', 'a', (neighbor01TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-01', 'b', (neighbor01TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor01V3GameLoopData as any)

  registerBeatScripts('neighbor-01', (neighbor01TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] neighbor-01 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
