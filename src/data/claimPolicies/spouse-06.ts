/**
 * spouse-06 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse06V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-06/spouse-06-v2-atoms'
import { spouse06TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-06/spouse-06-tells-beats'
import { spouse06V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-06/spouse-06-v3-game-loop-data'

export function registerSpouse06Data(): void {
  console.log('[Renewal] spouse-06 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-06', (spouse06V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-06', 'a', (spouse06TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-06', 'b', (spouse06TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse06V3GameLoopData as any)

  registerBeatScripts('spouse-06', (spouse06TellsBeats as any).beatScripts)

  console.log('[Renewal] spouse-06 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
