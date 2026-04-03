/**
 * partnership-05 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { partnership05V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-05/partnership-05-v2-atoms'
import { partnership05TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-05/partnership-05-tells-beats'
import { partnership05V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-05/partnership-05-v3-game-loop-data'

export function registerPartnership05Data(): void {
  console.log('[Renewal] partnership-05 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('partnership-05', (partnership05V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('partnership-05', 'a', (partnership05TellsBeats as any).executableTells.a)
  registerExecutableTells('partnership-05', 'b', (partnership05TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(partnership05V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('partnership-05', (partnership05TellsBeats as any).beatScripts)

  console.log('[Renewal] partnership-05 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
