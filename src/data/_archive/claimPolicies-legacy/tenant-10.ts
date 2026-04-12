/**
 * tenant-10 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { tenant10V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-10/tenant-10-v2-atoms'
import { tenant10TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-10/tenant-10-tells-beats'
import { tenant10V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-10/tenant-10-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './tenant-10-structure-v2.json'

export function registerTenant10Data(): void {
  console.log('[Renewal] tenant-10 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('tenant-10', (tenant10V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('tenant-10', 'a', (tenant10TellsBeats as any).executableTells.a)
  registerExecutableTells('tenant-10', 'b', (tenant10TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(tenant10V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('tenant-10', (tenant10TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] tenant-10 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
