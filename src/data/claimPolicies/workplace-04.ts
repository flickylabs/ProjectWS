/**
 * workplace-04 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { workplace04V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-04/workplace-04-v2-atoms'
import { workplace04TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-04/workplace-04-tells-beats'
import { workplace04V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-04/workplace-04-v3-game-loop-data'

export function registerWorkplace04Data(): void {
  console.log('[Renewal] workplace-04 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('workplace-04', (workplace04V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('workplace-04', 'a', (workplace04TellsBeats as any).executableTells.a)
  registerExecutableTells('workplace-04', 'b', (workplace04TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(workplace04V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('workplace-04', (workplace04TellsBeats as any).beatScripts)

  console.log('[Renewal] workplace-04 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
