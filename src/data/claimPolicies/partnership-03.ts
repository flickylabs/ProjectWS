/**
 * partnership-03 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { partnership03V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-03/partnership-03-v2-atoms'
import { partnership03TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-03/partnership-03-tells-beats'
import { partnership03V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-03/partnership-03-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './partnership-03-structure-v2.json'

export function registerPartnership03Data(): void {
  console.log('[Renewal] partnership-03 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('partnership-03', (partnership03V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('partnership-03', 'a', (partnership03TellsBeats as any).executableTells.a)
  registerExecutableTells('partnership-03', 'b', (partnership03TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(partnership03V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('partnership-03', (partnership03TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] partnership-03 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
