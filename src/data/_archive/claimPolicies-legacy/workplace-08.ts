/**
 * workplace-08 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { workplace08V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-08/workplace-08-v2-atoms'
import { workplace08TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-08/workplace-08-tells-beats'
import { workplace08V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-08/workplace-08-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './workplace-08-structure-v2.json'

export function registerWorkplace08Data(): void {
  console.log('[Renewal] workplace-08 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('workplace-08', (workplace08V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('workplace-08', 'a', (workplace08TellsBeats as any).executableTells.a)
  registerExecutableTells('workplace-08', 'b', (workplace08TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(workplace08V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('workplace-08', (workplace08TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] workplace-08 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
