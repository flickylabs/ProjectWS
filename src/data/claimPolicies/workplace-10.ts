/**
 * workplace-10 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { workplace10V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-10/workplace-10-v2-atoms'
import { workplace10TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-10/workplace-10-tells-beats'
import { workplace10V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-10/workplace-10-v3-game-loop-data'

export function registerWorkplace10Data(): void {
  console.log('[Renewal] workplace-10 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('workplace-10', (workplace10V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('workplace-10', 'a', (workplace10TellsBeats as any).executableTells.a)
  registerExecutableTells('workplace-10', 'b', (workplace10TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(workplace10V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('workplace-10', (workplace10TellsBeats as any).beatScripts)

  console.log('[Renewal] workplace-10 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
