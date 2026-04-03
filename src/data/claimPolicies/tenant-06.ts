/**
 * tenant-06 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { tenant06V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-06/tenant-06-v2-atoms'
import { tenant06TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-06/tenant-06-tells-beats'
import { tenant06V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-06/tenant-06-v3-game-loop-data'

export function registerTenant06Data(): void {
  console.log('[Renewal] tenant-06 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('tenant-06', (tenant06V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('tenant-06', 'a', (tenant06TellsBeats as any).executableTells.a)
  registerExecutableTells('tenant-06', 'b', (tenant06TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(tenant06V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('tenant-06', (tenant06TellsBeats as any).beatScripts)

  console.log('[Renewal] tenant-06 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
