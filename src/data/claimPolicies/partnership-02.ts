/**
 * partnership-02 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { partnership02V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-02/partnership-02-v2-atoms'
import { partnership02TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-02/partnership-02-tells-beats'
import { partnership02V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-02/partnership-02-v3-game-loop-data'

export function registerPartnership02Data(): void {
  console.log('[Renewal] partnership-02 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('partnership-02', (partnership02V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('partnership-02', 'a', (partnership02TellsBeats as any).executableTells.a)
  registerExecutableTells('partnership-02', 'b', (partnership02TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(partnership02V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('partnership-02', (partnership02TellsBeats as any).beatScripts)

  console.log('[Renewal] partnership-02 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
