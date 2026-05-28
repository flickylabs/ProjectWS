/**
 * spouse-01 — Core Narrative Wrapper Layer (Cycle 2 + Cycle 3)
 *
 * 권위: [[design_core_narrative_cycle_procedure]] / [[feedback_new_dispute_evidence_narrative_justification]]
 * Brief:
 *   - Cycle 2 (자금 line): docs/design/core-narrative-cycle2-spouse01-money-line-20260524/
 *   - Cycle 3 (외도 line): docs/design/core-narrative-cycle3-spouse01-affair-line-20260524/
 *
 * Cycle 1 (e-5): spouse-01.case.ts 내부 직접 부착 (Phase 4-foundation 시점).
 * Cycle 2 (8 emergence): 자금 line — dc-3 / e-7 / dc-7 / e-6 / dc-4 / w-3 / h-d3 / w-2(h-d3).
 * Cycle 3 (4 emergence): 외도 line — e-4 / dc-1 / w-1 / dc-2.
 *
 * 본 파일에 응집 — case.ts에서 import 후 각 entity의 narrativeTriggers field에 할당.
 * 각 emergence × multi-trigger candidate. First-Fired-Wins + judge_auto_mention fallback.
 */

import type { NarrativeTriggerCandidate } from '../../types/narrativeTrigger'

// ─────────────────────────────────────────────────────────────────────────────
// dc-3 "이준호의 비밀 개인 계좌" (CoreDossierCard) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const dc3NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc3-via-combo',
    type: 'combination_result',
    recipeId: 'combine-4',
    preconditions: {
      disputeLieState: { 'd-2': 'S1+' },
    },
    scriptedRefs: [
      'emerge-dc3-via-combo-judge-query-v1',
      'emerge-dc3-via-combo-b-response-v1',
      'emerge-dc3-via-combo-a-react-v1',
      'emerge-dc3-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc3-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-cash-clue',
      disputeLieState: { 'd-2': 'S1+' },
    },
    scriptedRefs: [
      'emerge-dc3-via-cascade-judge-mention-v1',
      'emerge-dc3-via-cascade-b-response-v1',
      'emerge-dc3-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  /**
   * 2026-05-27 trigger 재편성 — `dc3-via-a-interject` 폐기 (Issue 2 안 A).
   *
   * 폐기 이유: precondition = `evidence_present.b` (어떤 evidence 든) + 자금 사용처 S1+ —
   *   broad 패턴. 「영수증 묶음 5장」을 박지연(b)에게 제시하는 시점 등 의도 외 시점에도
   *   부적절 발동 가능. ScriptedText (`emerge-dc3-via-a-interject-*-v1`) 4개는 본 thread
   *   trigger 폐기 후 ledger 정리 (다음 스크립트 thread 안내용).
   */
  {
    id: 'dc3-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-dc3-via-judge-auto-decree-v1',
      'emerge-dc3-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// e-7 "공동 적금 해지 서류" (CoreEvidence) — 4 candidates
// (cascade mention / cascade analysis / npc / fallback — combo는 분석 액션 cascade로 흡수)
// ─────────────────────────────────────────────────────────────────────────────

export const e7NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'e7-via-cascade-mention',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-3',
      disputeLieState: { 'h-d3': 'S1+' },
    },
    scriptedRefs: [
      'emerge-e7-via-cascade-judge-mention-v1',
      'emerge-e7-via-cascade-b-response-v1',
      'emerge-e7-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e7-via-cascade-analysis',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-3',
      contextAction: 'evidence_analyze.b.e-5',
      disputeLieState: { 'h-d3': 'S1+' },
    },
    scriptedRefs: [
      'emerge-e7-via-cascade-analysis-judge-query-v1',
      'emerge-e7-via-cascade-analysis-b-acknowledge-v1',
      'emerge-e7-via-cascade-analysis-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e7-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'h-d3': 'S1+' },
      partyPhase: { b: ['defensive', 'confident', 'shaken', 'angry'] },
    },
    scriptedRefs: [
      'emerge-e7-via-b-interject-v1',
      'emerge-e7-via-b-interject-judge-react-v1',
      'emerge-e7-via-b-interject-b-elaborate-v1',
      'emerge-e7-via-b-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e7-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      disputeLieState: { 'h-d3': 'S2+' },
      turnsAfterEligible: 3,
    },
    scriptedRefs: [
      'emerge-e7-via-judge-auto-decree-v1',
      'emerge-e7-via-judge-auto-a-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// dc-7 "공동 적금 2,000만 원의 해지" (CoreDossierCard) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const dc7NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc7-via-combo',
    type: 'combination_result',
    recipeId: 'combine-5',
    preconditions: {
      disputeLieState: { 'h-d3': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc7-via-combo-judge-query-v1',
      'emerge-dc7-via-combo-a-response-v1',
      'emerge-dc7-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc7-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'e-7',
      disputeLieState: { 'h-d3': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc7-via-cascade-judge-mention-v1',
      'emerge-dc7-via-cascade-a-response-v1',
      'emerge-dc7-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc7-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      requirePriorCardFired: 'e-7',
      disputeLieState: { 'h-d3': 'S1+' },
      partyPhase: { b: ['defensive', 'confident', 'shaken', 'angry'] },
    },
    scriptedRefs: [
      'emerge-dc7-via-b-interject-v1',
      'emerge-dc7-via-b-interject-judge-react-v1',
      'emerge-dc7-via-b-interject-b-elaborate-v1',
      'emerge-dc7-via-b-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc7-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      requirePriorCardFired: 'e-7',
      turnsAfterEligible: 4,
    },
    scriptedRefs: [
      'emerge-dc7-via-judge-auto-decree-v1',
      'emerge-dc7-via-judge-auto-a-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// e-6 "투자방 텔레그램 + 송금 기록" (CoreEvidence) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const e6NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'e6-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-7',
      disputeLieState: { 'h-d3': 'S2+' },
    },
    scriptedRefs: [
      'emerge-e6-via-cascade-judge-query-v1',
      'emerge-e6-via-cascade-a-response-v1',
      'emerge-e6-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e6-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      requirePriorCardFired: 'dc-7',
      partyPhase: { b: ['defensive', 'confident', 'shaken', 'angry'] },
    },
    scriptedRefs: [
      'emerge-e6-via-b-interject-v1',
      'emerge-e6-via-b-interject-judge-react-v1',
      'emerge-e6-via-b-interject-a-response-v1',
      'emerge-e6-via-b-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e6-via-a-outburst',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      requirePriorCardFired: 'dc-7',
      partyPhase: { a: ['shaken', 'angry', 'resigned'] },
    },
    scriptedRefs: [
      'emerge-e6-via-a-outburst-v1',
      'emerge-e6-via-a-outburst-judge-catch-v1',
      'emerge-e6-via-a-outburst-a-admit-v1',
      'emerge-e6-via-a-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'e6-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      requirePriorCardFired: 'dc-7',
      turnsAfterEligible: 3,
    },
    scriptedRefs: [
      'emerge-e6-via-judge-auto-decree-v1',
      'emerge-e6-via-judge-auto-a-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// dc-4 "돌이키고 싶은 2,000만 원" (CoreDossierCard) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const dc4NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc4-via-combo',
    type: 'combination_result',
    recipeId: 'combine-3',
    preconditions: {
      disputeLieState: { 'h-d3': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc4-via-combo-judge-query-v1',
      'emerge-dc4-via-combo-a-response-v1',
      'emerge-dc4-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc4-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'e-6',
      disputeLieState: { 'h-d3': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc4-via-cascade-judge-mention-v1',
      'emerge-dc4-via-cascade-a-response-v1',
      'emerge-dc4-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc4-via-a-outburst',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      requirePriorCardFired: 'e-6',
      partyPhase: { a: ['shaken', 'resigned'] },
    },
    scriptedRefs: [
      'emerge-dc4-via-a-outburst-v1',
      'emerge-dc4-via-a-outburst-judge-catch-v1',
      'emerge-dc4-via-a-outburst-a-admit-v1',
      'emerge-dc4-via-a-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc4-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      requirePriorCardFired: 'e-6',
      turnsAfterEligible: 3,
    },
    scriptedRefs: [
      'emerge-dc4-via-judge-auto-decree-v1',
      'emerge-dc4-via-judge-auto-a-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// w-3 "박미라" (CoreWitness, 호출 가능 surface) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const w3NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'w3-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-4',
      disputeLieState: { 'h-d3': 'S3+' },
    },
    scriptedRefs: [
      'emerge-w3-via-cascade-judge-mention-v1',
      'emerge-w3-via-cascade-a-acknowledge-v1',
      'emerge-w3-via-cascade-judge-summon-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w3-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      requirePriorCardFired: 'dc-4',
      partyPhase: { b: ['defensive', 'confident', 'shaken', 'angry'] },
    },
    scriptedRefs: [
      'emerge-w3-via-b-interject-v1',
      'emerge-w3-via-b-interject-judge-react-v1',
      'emerge-w3-via-b-interject-a-response-v1',
      'emerge-w3-via-b-interject-judge-summon-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w3-via-a-outburst',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      requirePriorCardFired: 'dc-4',
      partyPhase: { a: ['shaken', 'angry', 'resigned'] },
    },
    scriptedRefs: [
      'emerge-w3-via-a-outburst-v1',
      'emerge-w3-via-a-outburst-judge-catch-v1',
      'emerge-w3-via-a-outburst-a-admit-v1',
      'emerge-w3-via-a-outburst-judge-summon-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'w3-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      requirePriorCardFired: 'dc-4',
      disputeLieState: { 'h-d3': 'S3+' },
      turnsAfterEligible: 4,
    },
    scriptedRefs: [
      'emerge-w3-via-judge-auto-summon-v1',
      'emerge-w3-via-judge-auto-a-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// h-d3 "공동 적금 2,000만원 해지 경위" (CoreDispute, hidden) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const hd3NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'hd3-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-2': 'S2+' },
      partyPhase: { b: ['defensive', 'confident', 'shaken', 'angry'] },
      contextAction: 'question.fact_pursuit.a.d-2',
    },
    scriptedRefs: [
      'emerge-hd3-via-b-interject-v1',
      'emerge-hd3-via-b-interject-judge-react-v1',
      'emerge-hd3-via-b-interject-b-response-v1',
      'emerge-hd3-via-b-interject-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'hd3-via-combo',
    type: 'combination_result',
    recipeId: 'combine-5',
    preconditions: {
      disputeLieState: { 'd-2': 'S2+' },
    },
    scriptedRefs: [
      'emerge-hd3-via-combo-judge-query-v1',
      'emerge-hd3-via-combo-a-response-v1',
      'emerge-hd3-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'hd3-via-a-outburst',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      disputeLieState: { 'd-2': 'S3+' },
      partyPhase: { a: ['shaken', 'angry'] },
      contextAction: 'question.fact_pursuit.a',
    },
    scriptedRefs: [
      'emerge-hd3-via-a-outburst-v1',
      'emerge-hd3-via-a-outburst-judge-catch-v1',
      'emerge-hd3-via-a-outburst-a-admit-v1',
      'emerge-hd3-via-a-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'hd3-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      disputeLieState: { 'd-2': 'S4+' },
      turnsAfterEligible: 4,
    },
    scriptedRefs: [
      'emerge-hd3-via-judge-auto-decree-v1',
      'emerge-hd3-via-judge-auto-a-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// w-2 "은행 직원" h-d3 영역 (CoreWitness) — 3 candidates
// ⚠ w-2는 d-2 영역(별도 cycle)과 h-d3 영역(본 cycle) 두 분기. 본 narrativeTriggers는
//   h-d3 영역 호출 분기 narrative만 부착.
// ─────────────────────────────────────────────────────────────────────────────

export const w2NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'w2-hd3-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-7',
      disputeLieState: { 'h-d3': 'S2+' },
    },
    scriptedRefs: [
      'emerge-w2hd3-via-cascade-judge-mention-v1',
      'emerge-w2hd3-via-cascade-a-acknowledge-v1',
      'emerge-w2hd3-via-cascade-judge-summon-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w2-hd3-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      requirePriorCardFired: 'dc-7',
      partyPhase: { b: ['defensive', 'confident', 'shaken', 'angry'] },
    },
    scriptedRefs: [
      'emerge-w2hd3-via-b-interject-v1',
      'emerge-w2hd3-via-b-interject-judge-react-v1',
      'emerge-w2hd3-via-b-interject-b-elaborate-v1',
      'emerge-w2hd3-via-b-interject-judge-summon-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w2-hd3-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      requirePriorCardFired: 'dc-7',
      turnsAfterEligible: 2,
    },
    scriptedRefs: [
      'emerge-w2hd3-via-judge-auto-summon-v1',
      'emerge-w2hd3-via-judge-auto-a-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ═════════════════════════════════════════════════════════════════════════════
// Cycle 3 — 외도 line (d-1 영역) — 4 emergence
// e-4 (발신자 미상 문자) / dc-1 (오피스텔의 사람들) / w-1 (오피스텔 경비) / dc-2 (시댁 얘기만 나오면 싸움)
//
// Brief: docs/design/core-narrative-cycle3-spouse01-affair-line-20260524/
// 권위: [[design_spouse01_truth_disclosure_policy]] (친형/조카/회생 keyword 절대 surface X)
//      / [[feedback_family_address_speaker_perspective]] (B 발화에 "시댁" X, "우리 집/형/형네" 자연)
//
// 외도 line cascade chain:
//   e-3 (initial) → e-4 → dc-1 → w-1 / dc-1 → dc-2 (cross-line: d-1 + d-2)
// ═════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// e-4 "발신자 미상 문자" (CoreEvidence) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const e4NarrativeTriggers: NarrativeTriggerCandidate[] = [
  /**
   * 2026-05-26 Step 5 sub-thread (C-2 재설계) — e-3 통화기록 stage 2 (발신자 미상 번호
   * 인지) 도달 후 player가 e-3을 b(이준호)에게 제시하는 시점에 발동되는 5단계 narrative.
   * 박지연 a interjection으로 휴대폰 본 사실 폭로 → e-4 (발신자 미상 문자) 정식 등재.
   * stage 2 gate는 useActionDispatch.evidence_present.b.e-3 처리 영역에서 검사.
   */
  {
    id: 'e4-via-e3-stage2',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'e-3',
      contextAction: 'evidence_present.b.e-3',
      disputeLieState: { 'd-1': 'S1+' },
    },
    scriptedRefs: [
      'emerge-e4-via-e3-stage2-judge-q1-v1',
      'emerge-e4-via-e3-stage2-b-hedge-v1',
      'emerge-e4-via-e3-stage2-a-reveal-v1',
      'emerge-e4-via-e3-stage2-b-confess-v1',
      'emerge-e4-via-e3-stage2-judge-q2-v1',
    ],
    vfxProfile: 'standard',
  },
  /**
   * 2026-05-27 trigger 재편성 — `e4-via-a-interject` + `e4-via-b-interject` 둘 다 폐기
   *   (Issue 1 안 B — 사용자 명시 회귀 해결).
   *
   * 폐기 이유:
   *  - `e4-via-a-interject`: precondition = 외도 의심 S1+ + `evidence_present.b` (어떤
   *    evidence 든) — broad 패턴. 「영수증 묶음 5장」(e-1) stage 1 시점에 박지연(b)에게
   *    영수증을 제시하면 외도 의심 S1+ + evidence_present.b 만족 → 부적절 발동 (사용자
   *    명시 회귀).
   *  - `e4-via-b-interject`: precondition = 외도 의심 S1+ + 박지연 감정 단계만 (contextAction
   *    없음) — 가장 broad. 어느 시점에든 발동 가능.
   *
   * 잔존 candidate: `e4-via-e3-stage2` (「통화기록」 stage 2 cascade) + `e4-via-judge-auto`
   *   (재판관 자동 fallback). 「발신자 미상 문자」는 「통화기록」 cascade 경로로만 자연
   *   등장 (다른 evidence 제시 시 부적절 발동 X).
   *
   * ScriptedText (`emerge-e4-via-a-interject-*-v1` 4개 + `emerge-e4-via-b-interject-*-v1`
   *   3개) 는 본 thread 폐기 후 ledger 정리 (다음 스크립트 thread 안내용).
   */
  {
    id: 'e4-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      disputeLieState: { 'd-1': 'S1+' },
      turnsAfterEligible: 5,
    },
    scriptedRefs: [
      'emerge-e4-via-judge-auto-decree-v1',
      'emerge-e4-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// dc-1 "오피스텔의 사람들" (CoreDossierCard) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const dc1NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc1-via-combo',
    type: 'combination_result',
    recipeId: 'combine-1',
    preconditions: {
      disputeLieState: { 'd-1': 'S1+' },
    },
    scriptedRefs: [
      'emerge-dc1-via-combo-judge-query-v1',
      'emerge-dc1-via-combo-b-response-v1',
      'emerge-dc1-via-combo-a-react-v1',
      'emerge-dc1-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc1-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'e-4',
      disputeLieState: { 'd-1': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc1-via-cascade-judge-mention-v1',
      'emerge-dc1-via-cascade-a-response-v1',
      'emerge-dc1-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc1-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-1': 'S2+' },
      partyPhase: { b: ['defensive', 'shaken'] },
    },
    scriptedRefs: [
      'emerge-dc1-via-b-interject-v1',
      'emerge-dc1-via-b-interject-judge-react-v1',
      'emerge-dc1-via-b-interject-b-elaborate-v1',
      'emerge-dc1-via-b-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc1-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      disputeLieState: { 'd-1': 'S2+' },
      turnsAfterEligible: 4,
    },
    scriptedRefs: [
      'emerge-dc1-via-judge-auto-decree-v1',
      'emerge-dc1-via-judge-auto-a-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// w-1 "오피스텔 경비" (CoreWitness, 호출 가능 surface) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const w1NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'w1-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      disputeLieState: { 'd-1': 'S2+' },
    },
    scriptedRefs: [
      'emerge-w1-via-cascade-judge-mention-v1',
      'emerge-w1-via-cascade-a-acknowledge-v1',
      'emerge-w1-via-cascade-judge-summon-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w1-via-a-interject',
    type: 'npc_interjection',
    source: 'a',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      partyPhase: { a: ['shaken', 'angry'] },
    },
    scriptedRefs: [
      'emerge-w1-via-a-interject-v1',
      'emerge-w1-via-a-interject-judge-react-v1',
      'emerge-w1-via-a-interject-a-confirm-v1',
      'emerge-w1-via-a-interject-judge-summon-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w1-via-b-outburst',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      partyPhase: { b: ['shaken', 'resigned'] },
    },
    scriptedRefs: [
      'emerge-w1-via-b-outburst-v1',
      'emerge-w1-via-b-outburst-judge-catch-v1',
      'emerge-w1-via-b-outburst-b-admit-v1',
      'emerge-w1-via-b-outburst-judge-summon-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'w1-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      disputeLieState: { 'd-1': 'S3+' },
      turnsAfterEligible: 4,
    },
    scriptedRefs: [
      'emerge-w1-via-judge-auto-summon-v1',
      'emerge-w1-via-judge-auto-a-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// dc-2 "시댁 얘기만 나오면 싸움" (CoreDossierCard, cross-line: d-1 + d-2) — 4 candidates
// ⚠ cross-line — 외도 line 동기 frame이면서 자금 line의 출금 동기에도 영향.
// ─────────────────────────────────────────────────────────────────────────────

export const dc2NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc2-via-combo',
    type: 'combination_result',
    recipeId: 'combine-6',
    preconditions: {
      disputeLieState: { 'd-1': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc2-via-combo-judge-query-v1',
      'emerge-dc2-via-combo-b-response-v1',
      'emerge-dc2-via-combo-a-react-v1',
      'emerge-dc2-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc2-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      disputeLieState: { 'd-1': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc2-via-cascade-judge-mention-v1',
      'emerge-dc2-via-cascade-a-response-v1',
      'emerge-dc2-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc2-via-b-outburst',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      partyPhase: { b: ['shaken', 'angry'] },
      contextAction: 'question.motive_search.b',
    },
    scriptedRefs: [
      'emerge-dc2-via-b-outburst-v1',
      'emerge-dc2-via-b-outburst-judge-catch-v1',
      'emerge-dc2-via-b-outburst-b-admit-v1',
      'emerge-dc2-via-b-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc2-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      disputeLieState: { 'd-1': 'S3+' },
      turnsAfterEligible: 4,
    },
    scriptedRefs: [
      'emerge-dc2-via-judge-auto-decree-v1',
      'emerge-dc2-via-judge-auto-a-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    /** 2026-05-27 신설 (Issue 8 안 A) — 비자금 사용처(d-2) line 진행 중 「시댁 얘기」
     *  cascade. cross-line link (d-1 + d-2) narrative 의도 반영. 기존 candidate 4개
     *  모두 외도 의심(d-1) 의존 → 비자금 사용처 line 진행 시점에는 발동 X 였음.
     *
     *  본 candidate: 「이준호의 비밀 개인 계좌」(dc-3) 등장 + 비자금 사용처 S2+ 도달 시
     *  자연 cascade. ScriptedText (다음 thread): "비밀 계좌 추적 중 박지연이 다시
     *  시댁 화제로 격앙" 등 의도. scriptedRefs 는 기존 cascade ref 재활용 (다음 thread
     *  에서 d-2 line 분기 ref 등록 + 변경). */
    id: 'dc2-via-cascade-d2-progression',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-3',
      disputeLieState: { 'd-2': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc2-via-cascade-judge-mention-v1',
      'emerge-dc2-via-cascade-a-response-v1',
      'emerge-dc2-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ═════════════════════════════════════════════════════════════════════════════
// Cycle 4 — h-d4 line (비자금의 원래 목적 = 박지연 난임 치료비) — 4 emergence
// e-8 (종합산부인과 주차 영수증) / e-9 (예비 부모 정서 자가진단 + 상담소 예약) / dc-8 (이준호의 또 다른 침묵) / h-d4 (쟁점)
// 2026-05-25 폴리싱: e-8/e-9 자료 본질 교체 (휴대폰 검색 → 주차 영수증 / 보험 견적 → 자가진단·예약)
//
// Brief: docs/design/core-narrative-cycle4-spouse01-hd4-line-20260524/
// 권위: [[design_spouse01_truth_disclosure_policy]] (박지연 난임/치료비 단어는 h-d4
//      b-outburst 1 entry에만 surface — 가장 위험 영역)
//      / [[feedback_judge_dispassionate_action_focused]] (Cycle 7 도입 — 평가 어휘 회피)
//
// h-d4 cascade chain (가장 긴 chain, 4단계):
//   dc-3 (Cycle 2) → e-8 → e-9 → dc-8 → h-d4
//
// 모든 emergence는 d-2 S5 자백 (비자금 사용처 = 형) 전제.
// frame 충돌: A 외도 frame 강화 (e-8→e-9→dc-8) → h-d4에서 결정적 역전 (난임 치료비 진실)
// 책임 비중: B 70 / A 30 (B 침묵·독단 우위, A 화제 회피 일부 책임)
// ═════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// e-8 "종합산부인과병원 주차 영수증 묶음" (CoreEvidence) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const e8NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'e8-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-3',
      disputeLieState: { 'd-2': 'S5+' },
    },
    scriptedRefs: [
      'emerge-e8-via-cascade-judge-mention-v1',
      'emerge-e8-via-cascade-b-response-v1',
      'emerge-e8-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e8-via-a-interject',
    type: 'npc_interjection',
    source: 'a',
    preconditions: {
      disputeLieState: { 'd-2': 'S5+' },
      partyDistrust: { a: { min: 50 } },
      contextAction: 'question.fact_pursuit.b',
    },
    scriptedRefs: [
      'emerge-e8-via-a-interject-v1',
      'emerge-e8-via-a-interject-judge-react-v1',
      'emerge-e8-via-a-interject-a-response-v1',
      'emerge-e8-via-a-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e8-via-b-outburst',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-2': 'S5+' },
      partyPhase: { b: ['shaken', 'angry'] },
    },
    scriptedRefs: [
      'emerge-e8-via-b-outburst-v1',
      'emerge-e8-via-b-outburst-judge-catch-v1',
      'emerge-e8-via-b-outburst-b-admit-v1',
      'emerge-e8-via-b-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'e8-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: {
      requirePriorCardFired: 'dc-3',
      disputeLieState: { 'd-2': 'S5+' },
      turnsAfterEligible: 5,
    },
    scriptedRefs: [
      'emerge-e8-via-judge-auto-decree-v1',
      'emerge-e8-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

