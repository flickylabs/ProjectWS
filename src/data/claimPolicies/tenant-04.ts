/**
 * tenant-04 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { tenant04V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-04/tenant-04-v2-atoms'
import { tenant04TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-04/tenant-04-tells-beats'
import { tenant04V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-04/tenant-04-v3-game-loop-data'

export function registerTenant04Data(): void {
  console.log('[Renewal] tenant-04 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('tenant-04', (tenant04V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('tenant-04', 'a', (tenant04TellsBeats as any).executableTells.a)
  registerExecutableTells('tenant-04', 'b', (tenant04TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(tenant04V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('tenant-04', (tenant04TellsBeats as any).beatScripts)

  console.log('[Renewal] tenant-04 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
