/**
 * family-10 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { family10V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-10/family-10-v2-atoms'
import { family10TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-10/family-10-tells-beats'
import { family10V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/family-10/family-10-v3-game-loop-data'

export function registerFamily10Data(): void {
  console.log('[Renewal] family-10 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('family-10', (family10V2Atoms as any).claimPolicies)

  registerExecutableTells('family-10', 'a', (family10TellsBeats as any).executableTells.a)
  registerExecutableTells('family-10', 'b', (family10TellsBeats as any).executableTells.b)

  registerV3GameLoopData(family10V3GameLoopData as any)

  registerBeatScripts('family-10', (family10TellsBeats as any).beatScripts)

  console.log('[Renewal] family-10 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
