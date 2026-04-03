/**
 * workplace-05 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { workplace05V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-05/workplace-05-v2-atoms'
import { workplace05TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-05/workplace-05-tells-beats'
import { workplace05V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-05/workplace-05-v3-game-loop-data'

export function registerWorkplace05Data(): void {
  console.log('[Renewal] workplace-05 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('workplace-05', (workplace05V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('workplace-05', 'a', (workplace05TellsBeats as any).executableTells.a)
  registerExecutableTells('workplace-05', 'b', (workplace05TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(workplace05V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('workplace-05', (workplace05TellsBeats as any).beatScripts)

  console.log('[Renewal] workplace-05 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
