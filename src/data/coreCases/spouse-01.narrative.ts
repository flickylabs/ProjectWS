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
  {
    id: 'dc3-via-a-interject',
    type: 'npc_interjection',
    source: 'a',
    preconditions: [
      { disputeLieState: { 'd-2': 'S1+' }, contextAction: 'evidence_present.b' },
      { partyDistrust: { a: { min: 50 } }, contextAction: 'evidence_present.b' },
    ],
    scriptedRefs: [
      'emerge-dc3-via-a-interject-v1',
      'emerge-dc3-via-a-interject-judge-react-v1',
      'emerge-dc3-via-a-interject-a-response-v1',
      'emerge-dc3-via-a-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
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
  {
    id: 'e4-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'e-3',
      disputeLieState: { 'd-1': 'S1+' },
    },
    scriptedRefs: [
      'emerge-e4-via-cascade-judge-mention-v1',
      'emerge-e4-via-cascade-b-response-v1',
      'emerge-e4-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e4-via-a-interject',
    type: 'npc_interjection',
    source: 'a',
    preconditions: [
      { disputeLieState: { 'd-1': 'S1+' }, contextAction: 'evidence_present.b' },
      { partyDistrust: { a: { min: 50 } }, contextAction: 'evidence_present.b' },
    ],
    scriptedRefs: [
      'emerge-e4-via-a-interject-v1',
      'emerge-e4-via-a-interject-judge-react-v1',
      'emerge-e4-via-a-interject-a-response-v1',
      'emerge-e4-via-a-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e4-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-1': 'S1+' },
      partyPhase: { b: ['defensive', 'shaken'] },
    },
    scriptedRefs: [
      'emerge-e4-via-b-interject-v1',
      'emerge-e4-via-b-interject-a-pursue-v1',
      'emerge-e4-via-b-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
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
]
