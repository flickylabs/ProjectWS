/**
 * partnership-01 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { partnership01V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-01/partnership-01-v2-atoms'
import { partnership01TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-01/partnership-01-tells-beats'
import { partnership01V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-01/partnership-01-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './partnership-01-structure-v2.json'

export function registerPartnership01Data(): void {
  console.log('[Renewal] partnership-01 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('partnership-01', (partnership01V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('partnership-01', 'a', (partnership01TellsBeats as any).executableTells.a)
  registerExecutableTells('partnership-01', 'b', (partnership01TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(partnership01V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('partnership-01', (partnership01TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] partnership-01 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
