/**
 * tenant-12 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { tenant12V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-12/tenant-12-v2-atoms'
import { tenant12TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-12/tenant-12-tells-beats'
import { tenant12V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-12/tenant-12-v3-game-loop-data'

export function registerTenant12Data(): void {
  console.log('[Renewal] tenant-12 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('tenant-12', (tenant12V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('tenant-12', 'a', (tenant12TellsBeats as any).executableTells.a)
  registerExecutableTells('tenant-12', 'b', (tenant12TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(tenant12V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('tenant-12', (tenant12TellsBeats as any).beatScripts)

  console.log('[Renewal] tenant-12 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback')
}
