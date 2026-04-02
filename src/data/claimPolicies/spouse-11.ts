/**
 * spouse-11 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse11V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-11/spouse-11-v2-atoms'
import { spouse11TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-11/spouse-11-tells-beats'
import { spouse11V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-11/spouse-11-v3-game-loop-data'

export function registerSpouse11Data(): void {
  console.log('[Renewal] spouse-11 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-11', (spouse11V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-11', 'a', (spouse11TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-11', 'b', (spouse11TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse11V3GameLoopData as any)

  registerBeatScripts('spouse-11', (spouse11TellsBeats as any).beatScripts)

  console.log('[Renewal] spouse-11 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
