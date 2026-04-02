/**
 * family-01 전체 리뉴얼 데이터 등록
 * Session 3: ClaimPolicy V1 + Bridge + EvidenceChallenge
 * Session 1 Round2: ExecutableVerbalTell + BeatScript
 * Session 2 Round2: V2 ClaimPolicy Atom + V3 Game Loop
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerBridge } from '../../engine/bridgeEngine'
import { registerEvidenceChallenges } from '../../engine/evidenceChallengeEngine'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { registerStructureV2, registerBeatsV2 } from '../../engine/v2DataLoader'
import session3 from './family-01-data.json'
import { family01TellsBeats } from '../../../docs/ref/리뉴얼참고/gpt-session1/output/family-01-tells-beats'
import { family01V2Atoms } from '../../../docs/ref/리뉴얼참고/gpt-session2/output/family-01-v2-atoms'
import { family01V3GameLoopData } from '../../../docs/ref/리뉴얼참고/gpt-session2/output/family-01-v3-game-loop-data'
import structureV2 from './family-01-structure-v2.json'
import beatsV2 from './family-01-beats-v2-full.json'

export function registerFamily01Data(): void {
  console.log('[Renewal] family-01 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터 (V1 ClaimPolicy를 대체)
  registerClaimPolicies('family-01', (family01V2Atoms as any).claimPolicies)

  // Bridge
  registerBridge({
    caseId: 'family-01',
    bridges: session3.bridges as any,
  })

  // EvidenceChallenge
  registerEvidenceChallenges('family-01', session3.evidenceChallenges as any)

  // ExecutableVerbalTell
  registerExecutableTells('family-01', 'a', (family01TellsBeats as any).executableTells.a)
  registerExecutableTells('family-01', 'b', (family01TellsBeats as any).executableTells.b)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  registerV3GameLoopData(family01V3GameLoopData as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('family-01', (family01TellsBeats as any).beatScripts)

  // V2 Structure + BeatScript V2 등록
  registerStructureV2(structureV2 as any)
  registerBeatsV2(beatsV2 as any)

  console.log('[Renewal] family-01 등록 완료: V2 + Bridge + EvidenceChallenge + Tell + V3 GameLoop + BeatFallback + StructureV2 + BeatsV2')
}
