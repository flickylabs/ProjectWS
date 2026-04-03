/**
 * workplace-12 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { workplace12V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-12/workplace-12-v2-atoms'
import { workplace12TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-12/workplace-12-tells-beats'
import { workplace12V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-12/workplace-12-v3-game-loop-data'

export function registerWorkplace12Data(): void {
  console.log('[Renewal] workplace-12 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('workplace-12', (workplace12V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('workplace-12', 'a', (workplace12TellsBeats as any).executableTells.a)
  registerExecutableTells('workplace-12', 'b', (workplace12TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(workplace12V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('workplace-12', (workplace12TellsBeats as any).beatScripts)

  console.log('[Renewal] workplace-12 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
