/**
 * tenant-02 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { tenant02V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-02/tenant-02-v2-atoms'
import { tenant02TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-02/tenant-02-tells-beats'
import { tenant02V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/tenant-02/tenant-02-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './tenant-02-structure-v2.json'

export function registerTenant02Data(): void {
  console.log('[Renewal] tenant-02 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('tenant-02', (tenant02V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('tenant-02', 'a', (tenant02TellsBeats as any).executableTells.a)
  registerExecutableTells('tenant-02', 'b', (tenant02TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(tenant02V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('tenant-02', (tenant02TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] tenant-02 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
