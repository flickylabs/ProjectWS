/**
 * partnership-07 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { partnership07V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-07/partnership-07-v2-atoms'
import { partnership07TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-07/partnership-07-tells-beats'
import { partnership07V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-07/partnership-07-v3-game-loop-data'

export function registerPartnership07Data(): void {
  console.log('[Renewal] partnership-07 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('partnership-07', (partnership07V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('partnership-07', 'a', (partnership07TellsBeats as any).executableTells.a)
  registerExecutableTells('partnership-07', 'b', (partnership07TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(partnership07V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('partnership-07', (partnership07TellsBeats as any).beatScripts)

  console.log('[Renewal] partnership-07 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
