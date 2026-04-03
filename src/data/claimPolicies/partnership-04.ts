/**
 * partnership-04 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { partnership04V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-04/partnership-04-v2-atoms'
import { partnership04TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-04/partnership-04-tells-beats'
import { partnership04V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-04/partnership-04-v3-game-loop-data'

export function registerPartnership04Data(): void {
  console.log('[Renewal] partnership-04 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('partnership-04', (partnership04V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('partnership-04', 'a', (partnership04TellsBeats as any).executableTells.a)
  registerExecutableTells('partnership-04', 'b', (partnership04TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(partnership04V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('partnership-04', (partnership04TellsBeats as any).beatScripts)

  console.log('[Renewal] partnership-04 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
