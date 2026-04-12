/**
 * workplace-09 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { workplace09V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-09/workplace-09-v2-atoms'
import { workplace09TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-09/workplace-09-tells-beats'
import { workplace09V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-09/workplace-09-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './workplace-09-structure-v2.json'

export function registerWorkplace09Data(): void {
  console.log('[Renewal] workplace-09 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('workplace-09', (workplace09V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('workplace-09', 'a', (workplace09TellsBeats as any).executableTells.a)
  registerExecutableTells('workplace-09', 'b', (workplace09TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(workplace09V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('workplace-09', (workplace09TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] workplace-09 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
