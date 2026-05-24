/**
 * family-01 — Core Narrative Wrapper Layer
 *
 * 권위: [[design_core_narrative_cycle_procedure]] / [[feedback_new_dispute_evidence_narrative_justification]]
 *
 * Cycle 5 (Line A 절차/판단) — 6 emergence × multi-trigger candidate.
 *   Brief: docs/design/core-narrative-cycle5-family01-procedure-line-20260524/
 *   - dc-1 / w-1 / d-2 / e-3 / dc-2 / w-2
 *   - cascade chain: dc-1 → w-1 / dc-1 → d-2 → e-3 / d-2 → dc-2 → w-2
 *
 * Cycle 6 (Line B 20년 돈) — 2 emergence × multi-trigger candidate.
 *   Brief: docs/design/core-narrative-cycle6-family01-money-line-20260524/
 *   - d-3 + dc-3 **통합 event** (5 trigger) — d-3에만 narrativeTriggers 부착, dc-3 force-unlock
 *   - w-3 "박순애" (3 trigger)
 *   - cascade chain: dc-2 → d-3+dc-3 → w-3
 */

import type { NarrativeTriggerCandidate } from '../../types/narrativeTrigger'

// ─────────────────────────────────────────────────────────────────────────────
// dc-1 "말년의 종이" (CoreDossierCard) — 4 trigger candidates
// (combo-1 / combo-11 — 두 recipe candidate 분리, npc / outburst / fallback)
// ─────────────────────────────────────────────────────────────────────────────

export const dc1NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc1-via-combo-1',
    type: 'combination_result',
    recipeId: 'combine-1',
    preconditions: {
      disputeLieState: { 'd-1': 'S1+' },
    },
    scriptedRefs: [
      'emerge-dc1-via-combo-judge-decree-v1',
      'emerge-dc1-via-combo-b-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc1-via-combo-11',
    type: 'combination_result',
    recipeId: 'combine-11',
    preconditions: {
      disputeLieState: { 'd-1': 'S1+' },
    },
    scriptedRefs: [
      'emerge-dc1-via-combo-judge-decree-v1',
      'emerge-dc1-via-combo-b-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc1-via-a-interject',
    type: 'npc_interjection',
    source: 'a',
    preconditions: [
      { disputeLieState: { 'd-1': 'S1+' } },
      { partyDistrust: { a: { min: 50 } } },
    ],
    scriptedRefs: [
      'emerge-dc1-via-a-interject-v1',
      'emerge-dc1-via-a-interject-judge-react-v1',
      'emerge-dc1-via-a-interject-a-response-v1',
      'emerge-dc1-via-a-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc1-via-b-outburst',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-1': 'S1+' },
      partyPhase: { b: ['defensive', 'shaken'] },
    },
    scriptedRefs: [
      'emerge-dc1-via-b-outburst-v1',
      'emerge-dc1-via-b-outburst-judge-react-v1',
      'emerge-dc1-via-b-outburst-b-response-v1',
      'emerge-dc1-via-b-outburst-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc1-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 8 },
    scriptedRefs: [
      'emerge-dc1-via-judge-auto-decree-v1',
      'emerge-dc1-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// w-1 "최복순" (CoreWitness) — 3 trigger candidates
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
      'emerge-w1-via-cascade-judge-summon-v1',
      'emerge-w1-via-cascade-a-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w1-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-1': 'S2+' },
    },
    scriptedRefs: [
      'emerge-w1-via-b-interject-v1',
      'emerge-w1-via-b-interject-judge-react-v1',
      'emerge-w1-via-b-interject-judge-summon-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w1-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-w1-via-judge-auto-summon-v1',
      'emerge-w1-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// d-2 "공증 절차의 개입" (CoreDispute) — 4 trigger candidates
// ─────────────────────────────────────────────────────────────────────────────

export const d2NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'd2-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      disputeLieState: { 'd-1': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d2-via-cascade-judge-decree-v1',
      'emerge-d2-via-cascade-a-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd2-via-a-interject',
    type: 'npc_interjection',
    source: 'a',
    preconditions: [
      { disputeLieState: { 'd-1': 'S2+' } },
      { partyDistrust: { a: { min: 50 } }, disputeLieState: { 'd-1': 'S1+' } },
    ],
    scriptedRefs: [
      'emerge-d2-via-a-interject-v1',
      'emerge-d2-via-a-interject-judge-react-v1',
      'emerge-d2-via-a-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd2-via-b-outburst',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-1': 'S2+' },
      partyPhase: { b: ['defensive', 'shaken'] },
    },
    scriptedRefs: [
      'emerge-d2-via-b-outburst-v1',
      'emerge-d2-via-b-outburst-judge-react-v1',
      'emerge-d2-via-b-outburst-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd2-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 7 },
    scriptedRefs: [
      'emerge-d2-via-judge-auto-decree-v1',
      'emerge-d2-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// e-3 "전 요양보호사 음성증언" (CoreEvidence) — 4 trigger candidates
// ─────────────────────────────────────────────────────────────────────────────

export const e3NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'e3-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-1': 'S1+' },
    },
    scriptedRefs: [
      'emerge-e3-via-b-interject-v1',
      'emerge-e3-via-b-interject-judge-react-v1',
      'emerge-e3-via-b-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e3-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      disputeLieState: { 'd-1': 'S1+' },
    },
    scriptedRefs: [
      'emerge-e3-via-cascade-judge-decree-v1',
      'emerge-e3-via-cascade-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e3-via-combo',
    type: 'combination_result',
    preconditions: {
      contextAction: 'evidence_analyze.b.e-2',
      disputeLieState: { 'd-1': 'S1+' },
    },
    scriptedRefs: [
      'emerge-e3-via-combo-judge-decree-v1',
      'emerge-e3-via-combo-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e3-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 6 },
    scriptedRefs: [
      'emerge-e3-via-judge-auto-decree-v1',
      'emerge-e3-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// dc-2 "수정된 유언장" (CoreDossierCard) — 4 trigger candidates
// (cascade priorCard:d-2 — dispute → dossier 첫 사용)
// ─────────────────────────────────────────────────────────────────────────────

export const dc2NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc2-via-combo',
    type: 'combination_result',
    recipeId: 'combine-5',
    preconditions: {
      disputeLieState: { 'd-2': 'S1+' },
    },
    scriptedRefs: [
      'emerge-dc2-via-combo-judge-decree-v1',
      'emerge-dc2-via-combo-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc2-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'd-2',
      disputeLieState: { 'd-2': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc2-via-cascade-judge-decree-v1',
      'emerge-dc2-via-cascade-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc2-via-b-outburst',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-2': 'S2+' },
      partyPhase: { b: ['defensive', 'shaken'] },
    },
    scriptedRefs: [
      'emerge-dc2-via-b-outburst-v1',
      'emerge-dc2-via-b-outburst-judge-react-v1',
      'emerge-dc2-via-b-outburst-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc2-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 6 },
    scriptedRefs: [
      'emerge-dc2-via-judge-auto-decree-v1',
      'emerge-dc2-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// w-2 "김영수" (CoreWitness) — 3 trigger candidates
// ─────────────────────────────────────────────────────────────────────────────

export const w2NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'w2-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-2',
      disputeLieState: { 'd-2': 'S2+' },
    },
    scriptedRefs: [
      'emerge-w2-via-cascade-judge-summon-v1',
      'emerge-w2-via-cascade-a-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w2-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-2': 'S2+' },
    },
    scriptedRefs: [
      'emerge-w2-via-b-interject-v1',
      'emerge-w2-via-b-interject-judge-react-v1',
      'emerge-w2-via-b-interject-judge-summon-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w2-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-w2-via-judge-auto-summon-v1',
      'emerge-w2-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Cycle 6 — Line B (20년 돈) — 2 emergence × 8 trigger candidates
// ─────────────────────────────────────────────────────────────────────────────

// d-3 "오래된 지원의 출처" (CoreDispute) — 5 trigger candidates
//
// 통합 event 패턴 (사용자 결정): d-3 trigger fire 시 narrative entry text가 dc-3 등록 announcement 포함.
// dc-3 mechanical unlock은 caller (useActionDispatch)가 d-3 fire 시 force-unlock 처리. dc-3.narrativeTriggers는 미부착.
// cascade priorCard:dc-2 (Cycle 5 마지막 단서 → Cycle 6 첫 쟁점, 자연 후속)
export const d3NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'd3-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-2',
      disputeLieState: { 'd-2': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d3-dc3-via-cascade-judge-decree-v1',
      'emerge-d3-dc3-via-cascade-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd3-via-combo',
    type: 'combination_result',
    recipeId: 'combine-6',
    preconditions: {
      disputeLieState: { 'd-2': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d3-dc3-via-combo-judge-decree-v1',
      'emerge-d3-dc3-via-combo-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd3-via-a-interject',
    type: 'npc_interjection',
    source: 'a',
    preconditions: [
      { disputeLieState: { 'd-2': 'S3+' }, partyPhase: { a: ['defensive', 'shaken'] } },
      { disputeLieState: { 'd-2': 'S3+' }, partyDistrust: { a: { min: 40 } } },
    ],
    scriptedRefs: [
      'emerge-d3-dc3-via-a-interject-v1',
      'emerge-d3-dc3-via-a-interject-judge-react-v1',
      'emerge-d3-dc3-via-a-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd3-via-b-outburst',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-2': 'S3+' },
      partyPhase: { b: ['defensive', 'shaken'] },
    },
    scriptedRefs: [
      'emerge-d3-dc3-via-b-outburst-v1',
      'emerge-d3-dc3-via-b-outburst-judge-react-v1',
      'emerge-d3-dc3-via-b-outburst-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd3-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 8 },
    scriptedRefs: [
      'emerge-d3-dc3-via-judge-auto-decree-v1',
      'emerge-d3-dc3-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// w-3 "박순애" (CoreWitness, 어머니의 오랜 지인) — 3 trigger candidates
export const w3NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'w3-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-3',
      disputeLieState: { 'd-3': 'S2+' },
    },
    scriptedRefs: [
      'emerge-w3-via-cascade-judge-summon-v1',
      'emerge-w3-via-cascade-a-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w3-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-3': 'S2+' },
      partyPhase: { b: ['defensive', 'resigned'] },
    },
    scriptedRefs: [
      'emerge-w3-via-b-interject-v1',
      'emerge-w3-via-b-interject-judge-react-v1',
      'emerge-w3-via-b-interject-judge-summon-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w3-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-w3-via-judge-auto-summon-v1',
      'emerge-w3-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]
