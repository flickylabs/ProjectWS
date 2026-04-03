/**
 * workplace-02 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { workplace02V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-02/workplace-02-v2-atoms'
import { workplace02TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-02/workplace-02-tells-beats'
import { workplace02V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-02/workplace-02-v3-game-loop-data'

export function registerWorkplace02Data(): void {
  console.log('[Renewal] workplace-02 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('workplace-02', (workplace02V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('workplace-02', 'a', (workplace02TellsBeats as any).executableTells.a)
  registerExecutableTells('workplace-02', 'b', (workplace02TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(workplace02V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('workplace-02', (workplace02TellsBeats as any).beatScripts)

  console.log('[Renewal] workplace-02 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
