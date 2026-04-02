/**
 * family-02 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family02V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-02/family-02-v2-atoms'
import { family02TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-02/family-02-tells-beats'
import { family02V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-02/family-02-v3-game-loop-data'

export function registerFamily02Data(): void {
  console.log('[Renewal] family-02 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('family-02', (family02V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('family-02', 'a', (family02TellsBeats as any).executableTells.a)
  registerExecutableTells('family-02', 'b', (family02TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(family02V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('family-02', (family02TellsBeats as any).beatScripts)

  console.log('[Renewal] family-02 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
