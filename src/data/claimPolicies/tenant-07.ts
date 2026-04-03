/**
 * tenant-07 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { tenant07V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-07/tenant-07-v2-atoms'
import { tenant07TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-07/tenant-07-tells-beats'
import { tenant07V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-07/tenant-07-v3-game-loop-data'

export function registerTenant07Data(): void {
  console.log('[Renewal] tenant-07 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('tenant-07', (tenant07V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('tenant-07', 'a', (tenant07TellsBeats as any).executableTells.a)
  registerExecutableTells('tenant-07', 'b', (tenant07TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(tenant07V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('tenant-07', (tenant07TellsBeats as any).beatScripts)

  console.log('[Renewal] tenant-07 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
