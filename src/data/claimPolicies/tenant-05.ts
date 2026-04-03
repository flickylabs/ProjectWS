/**
 * tenant-05 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { tenant05V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-05/tenant-05-v2-atoms'
import { tenant05TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-05/tenant-05-tells-beats'
import { tenant05V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-05/tenant-05-v3-game-loop-data'

export function registerTenant05Data(): void {
  console.log('[Renewal] tenant-05 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('tenant-05', (tenant05V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('tenant-05', 'a', (tenant05TellsBeats as any).executableTells.a)
  registerExecutableTells('tenant-05', 'b', (tenant05TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(tenant05V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('tenant-05', (tenant05TellsBeats as any).beatScripts)

  console.log('[Renewal] tenant-05 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
