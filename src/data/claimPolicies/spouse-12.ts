/**
 * spouse-12 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { spouse12V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-12/spouse-12-v2-atoms'
import { spouse12TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-12/spouse-12-tells-beats'
import { spouse12V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/spouse-12/spouse-12-v3-game-loop-data'

export function registerSpouse12Data(): void {
  console.log('[Renewal] spouse-12 리뉴얼 데이터 등록 시작')

  registerClaimPolicies('spouse-12', (spouse12V2Atoms as any).claimPolicies)

  registerExecutableTells('spouse-12', 'a', (spouse12TellsBeats as any).executableTells.a)
  registerExecutableTells('spouse-12', 'b', (spouse12TellsBeats as any).executableTells.b)

  registerV3GameLoopData(spouse12V3GameLoopData as any)

  registerBeatScripts('spouse-12', (spouse12TellsBeats as any).beatScripts)

  console.log('[Renewal] spouse-12 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
