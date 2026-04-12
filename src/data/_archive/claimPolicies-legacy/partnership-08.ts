/**
 * partnership-08 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { partnership08V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-08/partnership-08-v2-atoms'
import { partnership08TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-08/partnership-08-tells-beats'
import { partnership08V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-08/partnership-08-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './partnership-08-structure-v2.json'

export function registerPartnership08Data(): void {
  console.log('[Renewal] partnership-08 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('partnership-08', (partnership08V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('partnership-08', 'a', (partnership08TellsBeats as any).executableTells.a)
  registerExecutableTells('partnership-08', 'b', (partnership08TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(partnership08V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('partnership-08', (partnership08TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] partnership-08 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
