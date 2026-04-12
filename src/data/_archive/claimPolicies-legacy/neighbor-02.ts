/**
 * neighbor-02 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor02V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-02/neighbor-02-v2-atoms'
import { neighbor02TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-02/neighbor-02-tells-beats'
import { neighbor02V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-02/neighbor-02-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './neighbor-02-structure-v2.json'

export function registerNeighbor02Data(): void {
  console.log('[Renewal] neighbor-02 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-02', (neighbor02V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-02', 'a', (neighbor02TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-02', 'b', (neighbor02TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor02V3GameLoopData as any)

  registerBeatScripts('neighbor-02', (neighbor02TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] neighbor-02 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
