/**
 * tenant-03 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { tenant03V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-03/tenant-03-v2-atoms'
import { tenant03TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-03/tenant-03-tells-beats'
import { tenant03V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-03/tenant-03-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './tenant-03-structure-v2.json'

export function registerTenant03Data(): void {
  console.log('[Renewal] tenant-03 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('tenant-03', (tenant03V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('tenant-03', 'a', (tenant03TellsBeats as any).executableTells.a)
  registerExecutableTells('tenant-03', 'b', (tenant03TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(tenant03V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('tenant-03', (tenant03TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] tenant-03 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
