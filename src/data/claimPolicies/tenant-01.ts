/**
 * tenant-01 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { tenant01V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-01/tenant-01-v2-atoms'
import { tenant01TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-01/tenant-01-tells-beats'
import { tenant01V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-01/tenant-01-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './tenant-01-structure-v2.json'

export function registerTenant01Data(): void {
  console.log('[Renewal] tenant-01 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('tenant-01', (tenant01V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('tenant-01', 'a', (tenant01TellsBeats as any).executableTells.a)
  registerExecutableTells('tenant-01', 'b', (tenant01TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(tenant01V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('tenant-01', (tenant01TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] tenant-01 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
