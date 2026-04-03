/**
 * partnership-11 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { partnership11V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-11/partnership-11-v2-atoms'
import { partnership11TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-11/partnership-11-tells-beats'
import { partnership11V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-11/partnership-11-v3-game-loop-data'

export function registerPartnership11Data(): void {
  console.log('[Renewal] partnership-11 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('partnership-11', (partnership11V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('partnership-11', 'a', (partnership11TellsBeats as any).executableTells.a)
  registerExecutableTells('partnership-11', 'b', (partnership11TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(partnership11V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('partnership-11', (partnership11TellsBeats as any).beatScripts)

  console.log('[Renewal] partnership-11 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
