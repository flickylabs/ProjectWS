/**
 * workplace-11 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { workplace11V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-11/workplace-11-v2-atoms'
import { workplace11TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-11/workplace-11-tells-beats'
import { workplace11V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-11/workplace-11-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './workplace-11-structure-v2.json'

export function registerWorkplace11Data(): void {
  console.log('[Renewal] workplace-11 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('workplace-11', (workplace11V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('workplace-11', 'a', (workplace11TellsBeats as any).executableTells.a)
  registerExecutableTells('workplace-11', 'b', (workplace11TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(workplace11V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('workplace-11', (workplace11TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] workplace-11 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
