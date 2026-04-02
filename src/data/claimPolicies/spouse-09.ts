/**
 * spouse-09 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse09V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-09/spouse-09-v2-atoms'
import { spouse09TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-09/spouse-09-tells-beats'
import { spouse09V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-09/spouse-09-v3-game-loop-data'

export function registerSpouse09Data(): void {
  console.log('[Renewal] spouse-09 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-09', (spouse09V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-09', 'a', (spouse09TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-09', 'b', (spouse09TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse09V3GameLoopData as any)

  registerBeatScripts('spouse-09', (spouse09TellsBeats as any).beatScripts)

  console.log('[Renewal] spouse-09 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
