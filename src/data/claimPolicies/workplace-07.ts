/**
 * workplace-07 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { workplace07V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-07/workplace-07-v2-atoms'
import { workplace07TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-07/workplace-07-tells-beats'
import { workplace07V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/workplace-07/workplace-07-v3-game-loop-data'

export function registerWorkplace07Data(): void {
  console.log('[Renewal] workplace-07 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('workplace-07', (workplace07V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('workplace-07', 'a', (workplace07TellsBeats as any).executableTells.a)
  registerExecutableTells('workplace-07', 'b', (workplace07TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(workplace07V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('workplace-07', (workplace07TellsBeats as any).beatScripts)

  console.log('[Renewal] workplace-07 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
