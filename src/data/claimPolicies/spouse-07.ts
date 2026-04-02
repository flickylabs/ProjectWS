/**
 * spouse-07 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse07V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-07/spouse-07-v2-atoms'
import { spouse07TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-07/spouse-07-tells-beats'
import { spouse07V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-07/spouse-07-v3-game-loop-data'

export function registerSpouse07Data(): void {
  console.log('[Renewal] spouse-07 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-07', (spouse07V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-07', 'a', (spouse07TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-07', 'b', (spouse07TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse07V3GameLoopData as any)

  registerBeatScripts('spouse-07', (spouse07TellsBeats as any).beatScripts)

  console.log('[Renewal] spouse-07 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
