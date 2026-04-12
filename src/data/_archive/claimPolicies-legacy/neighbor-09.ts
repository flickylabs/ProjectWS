/**
 * neighbor-09 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { neighbor09V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-09/neighbor-09-v2-atoms'
import { neighbor09TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-09/neighbor-09-tells-beats'
import { neighbor09V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/neighbor-09/neighbor-09-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './neighbor-09-structure-v2.json'

export function registerNeighbor09Data(): void {
  console.log('[Renewal] neighbor-09 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('neighbor-09', (neighbor09V2Atoms as any).claimPolicies)

  registerExecutableTells('neighbor-09', 'a', (neighbor09TellsBeats as any).executableTells.a)
  registerExecutableTells('neighbor-09', 'b', (neighbor09TellsBeats as any).executableTells.b)

  registerV3GameLoopData(neighbor09V3GameLoopData as any)

  registerBeatScripts('neighbor-09', (neighbor09TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] neighbor-09 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
