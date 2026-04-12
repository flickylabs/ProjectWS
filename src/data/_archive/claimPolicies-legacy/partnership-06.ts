/**
 * partnership-06 리뉴얼 데이터 등록
 * GPT Batch: V2 ClaimAtom + ExecutableVerbalTell + BeatScript + V3 GameLoop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { partnership06V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-06/partnership-06-v2-atoms'
import { partnership06TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-06/partnership-06-tells-beats'
import { partnership06V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-batch/partnership-06/partnership-06-v3-game-loop-data'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import structureV2 from './partnership-06-structure-v2.json'

export function registerPartnership06Data(): void {
  console.log('[Renewal] partnership-06 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터
  registerClaimPolicies('partnership-06', (partnership06V2Atoms as any).claimPolicies)

  // ExecutableVerbalTell
  registerExecutableTells('partnership-06', 'a', (partnership06TellsBeats as any).executableTells.a)
  registerExecutableTells('partnership-06', 'b', (partnership06TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(partnership06V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('partnership-06', (partnership06TellsBeats as any).beatScripts)


  // V2 Structure 등록
  registerStructureV2(structureV2 as any)
  console.log('[Renewal] partnership-06 등록 완료: V2 + Tell + V3 GameLoop + BeatFallback + StructureV2')
}
