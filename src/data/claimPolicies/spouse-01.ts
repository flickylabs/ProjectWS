/**
 * spouse-01 전체 리뉴얼 데이터 등록
 * Session 1: ClaimPolicy V1 + Bridge + EvidenceChallenge
 * Session 2: ExecutableVerbalTell + BeatScript
 * V2: ClaimPolicyV2 atom 데이터 (V1을 대체)
 * V3: DossierCard + StateUnlockAtom + EventText + TransitionBeat
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerExecutableTells } from '../executableTellLoader'
import { registerBridge } from '../../engine/bridgeEngine'
import { registerEvidenceChallenges } from '../../engine/evidenceChallengeEngine'
import { registerV3GameLoopData, registerBeatScripts } from '../../engine/v3GameLoopLoader'
import { registerStructureV2, registerBeatsV2 } from '../../engine/v2DataLoader'
import session1 from './spouse-01-data.json'
import session2 from './spouse-01-tells-beats.json'
import v2Atoms from './spouse-01-v2-atoms.json'
import structureV2 from './spouse-01-structure-v2.json'
import beatsV2 from './spouse-01-beats-v2-full.json'
import { spouse01V3GameLoopData } from '../../../docs/ref/리뉴얼참고/spouse-01-v3-game-loop-data'
import { spouse01V3Supplement } from '../../../docs/ref/리뉴얼참고/gpt-session1/output/spouse-01-v3-supplement'

export function registerSpouse01Data(): void {
  console.log('[Renewal] spouse-01 리뉴얼 데이터 등록 시작')

  // V2 atom 데이터가 있으면 V1 대신 V2 등록 (claimAtoms 필드 포함)
  registerClaimPolicies('spouse-01', v2Atoms.claimPolicies as any)

  // Bridge
  registerBridge({
    caseId: 'spouse-01',
    bridges: session1.bridges as any,
  })

  // EvidenceChallenge
  registerEvidenceChallenges('spouse-01', session1.evidenceChallenges as any)

  // ExecutableVerbalTell
  registerExecutableTells('spouse-01', 'a', session2.executableTells.a as any)
  registerExecutableTells('spouse-01', 'b', session2.executableTells.b as any)

  // V3 Game Loop Data (DossierCard + StateUnlockAtom + EventText + TransitionBeat)
  // 1차 + 2차(supplement) 머지
  const mergedV3 = {
    ...spouse01V3GameLoopData,
    transitionBeats: [
      ...spouse01V3GameLoopData.transitionBeats,
      ...(spouse01V3Supplement as any).transitionBeats,
    ],
    events: {
      contradictions: [
        ...spouse01V3GameLoopData.events.contradictions,
        ...(spouse01V3Supplement as any).events.contradictions,
      ],
      interjections: [
        ...spouse01V3GameLoopData.events.interjections,
        ...(spouse01V3Supplement as any).events.interjections,
      ],
      emotionalOutbursts: [
        ...spouse01V3GameLoopData.events.emotionalOutbursts,
        ...(spouse01V3Supplement as any).events.emotionalOutbursts,
      ],
    },
  }
  registerV3GameLoopData(mergedV3 as any)

  // BeatScript 런타임 fallback 등록
  registerBeatScripts('spouse-01', session2.beatScripts as any)

  // V2 Structure + BeatScript V2 등록
  registerStructureV2(structureV2 as any)
  registerBeatsV2(beatsV2 as any)

  console.log('[Renewal] spouse-01 등록 완료: V2 + Bridge + EvidenceChallenge + Tell + V3 GameLoop + BeatFallback + StructureV2 + BeatsV2')
}

/** Session 2 beat 데이터 직접 접근용 */
export function getSpouse01Beats() {
  return session2.beatScripts
}
