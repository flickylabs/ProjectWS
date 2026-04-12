/**
 * neighbor-07 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor07V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-07/neighbor-07-v2-atoms'
import { neighbor07TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-07/neighbor-07-tells-beats'
import { neighbor07V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-07/neighbor-07-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './neighbor-07-structure-v2.json'

export function registerNeighbor07Data(): void {
  console.log('[Renewal] neighbor-07 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-07', (neighbor07V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-07', 'a', (neighbor07TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-07', 'b', (neighbor07TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor07V3GameLoopData as any)

  registerBeatScripts('neighbor-07', (neighbor07TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] neighbor-07 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
