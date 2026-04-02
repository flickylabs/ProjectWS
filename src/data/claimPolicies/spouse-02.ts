/**
 * spouse-02 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse02V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-02/spouse-02-v2-atoms'
import { spouse02TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-02/spouse-02-tells-beats'
import { spouse02V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-02/spouse-02-v3-game-loop-data'

export function registerSpouse02Data(): void {
  console.log('[Renewal] spouse-02 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-02', (spouse02V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-02', 'a', (spouse02TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-02', 'b', (spouse02TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse02V3GameLoopData as any)

  registerBeatScripts('spouse-02', (spouse02TellsBeats as any).beatScripts)

  console.log('[Renewal] spouse-02 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
