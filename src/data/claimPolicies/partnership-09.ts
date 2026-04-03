/**
 * partnership-09 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { partnership09V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-09/partnership-09-v2-atoms'
import { partnership09TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-09/partnership-09-tells-beats'
import { partnership09V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-09/partnership-09-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './partnership-09-structure-v2.json'

export function registerPartnership09Data(): void {
  console.log('[Renewal] partnership-09 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('partnership-09', (partnership09V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('partnership-09', 'a', (partnership09TellsBeats as any).executableTells.a)
  registerExecutableTells('partnership-09', 'b', (partnership09TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(partnership09V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('partnership-09', (partnership09TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] partnership-09 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
