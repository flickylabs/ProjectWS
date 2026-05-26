/**
 * family-01 — Core Narrative Wrapper Layer
 *
 * 권위: [[design_core_narrative_cycle_procedure]] / [[feedback_new_dispute_evidence_narrative_justification]]
 *
 * Cycle 5 (Line A 절차/판단) — 5 emergence × multi-trigger candidate.
 *   Brief: docs/design/core-narrative-cycle5-family01-procedure-line-20260524/
 *   - dc-1 / w-1 / d-2 / dc-2 / w-2
 *   - cascade chain: dc-1 → w-1 / dc-1 → d-2 / d-2 → dc-2 → w-2
 *   - 2026-05-26 폴리싱: e-3 (전 요양보호사 음성증언) 폐기 — w-1 (전 요양보호사 최복순) 증인과 동일 인물 중복 영역.
 *     동일 사실은 w-1 testimony.byDispute['d-1']로 단일화.
 *
 * Cycle 6 (Line B 20년 돈) — 2 emergence × multi-trigger candidate.
 *   Brief: docs/design/core-narrative-cycle6-family01-money-line-20260524/
 *   - d-3 + dc-3 **통합 event** (5 trigger) — d-3에만 narrativeTriggers 부착, dc-3 force-unlock
 *   - w-3 "박순애" (3 trigger)
 *   - cascade chain: dc-2 → d-3+dc-3 → w-3
 */

import type { NarrativeTriggerCandidate } from '../../types/narrativeTrigger'

// ─────────────────────────────────────────────────────────────────────────────
// dc-1 "말년의 종이" (CoreDossierCard) — 3 trigger candidates
// (combo-1 — outburst / fallback. 2026-05-27 trigger 재편성: dc1-via-a-interject
//  폐기 — contextAction 없는 broad 패턴, d-1 S1+ 도달만으로 발동했던 영역.
//  cascade chain + combo + judge_auto fallback 만으로 충분.)
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
// w-1 "최복순" (CoreWitness) — 2 trigger candidates
// (2026-05-27 trigger 재편성: w1-via-b-interject 폐기 — contextAction + partyPhase
//  모두 없는 broad 패턴, d-1 S2+ 도달만으로 발동했던 영역.
//  cascade priorCard + judge_auto fallback 만으로 충분.)
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
// d-2 "공증 절차의 개입" (CoreDispute) — 3 trigger candidates
// (2026-05-27 trigger 재편성: d2-via-a-interject 폐기 — contextAction 없는 broad
//  패턴, d-1 S2+ 도달만으로 발동했던 영역. dc-1 cascade priorCard 자연 흐름 +
//  outburst + judge_auto fallback 만으로 충분.)
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
// e-3 (전 요양보호사 음성증언) — 2026-05-26 폴리싱 폐기.
// w-1 (전 요양보호사 최복순) 증인과 동일 인물 중복 영역. 동일 사실 영역은
// w-1 narrativeTriggers + testimony.byDispute['d-1']로 단일화.
// ─────────────────────────────────────────────────────────────────────────────

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
// w-2 "김영수" (CoreWitness) — 2 trigger candidates
// (2026-05-27 trigger 재편성: w2-via-b-interject 폐기 — contextAction + partyPhase
//  모두 없는 broad 패턴, d-2 S2+ 도달만으로 발동했던 영역.
//  cascade priorCard + judge_auto fallback 만으로 충분.)
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

// ─────────────────────────────────────────────────────────────────────────────
// Cycle 7 — Line C (비밀+최종) — 6 emergence × 26 trigger candidates
//
// cascade chain: dc-3 → d-4 → e-7 → dc-4 → d-5 → e-5 → dc-5
// 본 cycle 영역에서 그룹 1 (출생 비밀) / 그룹 4 (친자 양보) / 그룹 5 (보호 명분) surface 시작.
// 그룹 3 (자필 90:10 정확 수치) 절대 X (d-5 S5 봉인 영역).
// ─────────────────────────────────────────────────────────────────────────────

// d-4 "가족 기록과 침묵의 이유" (CoreDispute) — 5 trigger candidates
// Batch 1. cascade priorCard:dc-3 (Cycle 6 마지막 단서)
export const d4NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'd4-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-3',
      disputeLieState: { 'd-3': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d4-via-cascade-judge-decree-v1',
      'emerge-d4-via-cascade-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd4-via-combo',
    type: 'combination_result',
    recipeId: 'combine-4',
    preconditions: {
      disputeLieState: { 'd-3': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d4-via-combo-judge-decree-v1',
      'emerge-d4-via-combo-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd4-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-3': 'S3+' },
      partyPhase: { b: ['defensive', 'resigned'] },
    },
    scriptedRefs: [
      'emerge-d4-via-b-interject-v1',
      'emerge-d4-via-b-interject-judge-react-v1',
      'emerge-d4-via-b-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd4-via-a-outburst',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      disputeLieState: { 'd-3': 'S3+' },
      partyPhase: { a: ['shaken'] },
    },
    scriptedRefs: [
      'emerge-d4-via-a-outburst-v1',
      'emerge-d4-via-a-outburst-judge-react-v1',
      'emerge-d4-via-a-outburst-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd4-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 8 },
    scriptedRefs: [
      'emerge-d4-via-judge-auto-decree-v1',
      'emerge-d4-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// e-7 "오래된 노트 사본" (CoreEvidence, lockedName=어머니 일기장) — 4 trigger candidates
// Batch 1. cascade priorCard:d-4
export const e7NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'e7-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'd-4',
      disputeLieState: { 'd-4': 'S2+' },
    },
    scriptedRefs: [
      'emerge-e7-via-cascade-judge-decree-v1',
      'emerge-e7-via-cascade-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e7-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-4': 'S2+' },
      partyPhase: { b: ['defensive', 'resigned'] },
    },
    scriptedRefs: [
      'emerge-e7-via-b-interject-v1',
      'emerge-e7-via-b-interject-judge-react-v1',
      'emerge-e7-via-b-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e7-via-b-outburst',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-4': 'S2+' },
      partyPhase: { b: ['shaken'] },
    },
    scriptedRefs: [
      'emerge-e7-via-b-outburst-v1',
      'emerge-e7-via-b-outburst-judge-react-v1',
      'emerge-e7-via-b-outburst-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e7-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 6 },
    scriptedRefs: [
      'emerge-e7-via-judge-auto-decree-v1',
      'emerge-e7-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// dc-4 "감춘 이유" (CoreDossierCard) — 5 trigger candidates
// Batch 2. cascade priorCard:d-4 + combo 다중 recipe (combine-4 / combine-7) — Cycle 5 dc1 패턴 따라 두 candidate 분리, 동일 scriptedRefs 공유
export const dc4NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc4-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'd-4',
      disputeLieState: { 'd-4': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc4-via-cascade-judge-decree-v1',
      'emerge-dc4-via-cascade-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc4-via-combo-4',
    type: 'combination_result',
    recipeId: 'combine-4',
    preconditions: {
      disputeLieState: { 'd-4': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc4-via-combo-judge-decree-v1',
      'emerge-dc4-via-combo-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc4-via-combo-7',
    type: 'combination_result',
    recipeId: 'combine-7',
    preconditions: {
      disputeLieState: { 'd-4': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc4-via-combo-judge-decree-v1',
      'emerge-dc4-via-combo-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc4-via-b-outburst',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-4': 'S2+' },
      partyPhase: { b: ['shaken'] },
    },
    scriptedRefs: [
      'emerge-dc4-via-b-outburst-v1',
      'emerge-dc4-via-b-outburst-judge-react-v1',
      'emerge-dc4-via-b-outburst-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc4-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 6 },
    scriptedRefs: [
      'emerge-dc4-via-judge-auto-decree-v1',
      'emerge-dc4-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// d-5 "어머니의 숨겨진 마음" (CoreDispute) — 5 trigger candidates
// Batch 2. cascade priorCard 다중 (dc-4 메인 / e-7 차선) — 두 cascade candidate
export const d5NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'd5-via-cascade-dc4',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-4',
      disputeLieState: { 'd-4': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d5-via-cascade-judge-decree-v1',
      'emerge-d5-via-cascade-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd5-via-cascade-e7',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'e-7',
      disputeLieState: { 'd-4': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d5-via-cascade-e7-judge-decree-v1',
      'emerge-d5-via-cascade-e7-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd5-via-a-interject',
    type: 'npc_interjection',
    source: 'a',
    preconditions: [
      { disputeLieState: { 'd-4': 'S3+' }, partyPhase: { a: ['defensive', 'shaken'] } },
      { disputeLieState: { 'd-4': 'S3+' }, partyDistrust: { a: { min: 30 } } },
    ],
    scriptedRefs: [
      'emerge-d5-via-a-interject-v1',
      'emerge-d5-via-a-interject-judge-react-v1',
      'emerge-d5-via-a-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd5-via-b-outburst',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-4': 'S3+' },
      partyPhase: { b: ['defensive', 'shaken'] },
    },
    scriptedRefs: [
      'emerge-d5-via-b-outburst-v1',
      'emerge-d5-via-b-outburst-judge-react-v1',
      'emerge-d5-via-b-outburst-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd5-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 8 },
    scriptedRefs: [
      'emerge-d5-via-judge-auto-decree-v1',
      'emerge-d5-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// e-5 "자필 메모 사본" (CoreEvidence, lockedName=어머니 자필 유언장 연습본) — 4 trigger candidates
// Batch 3. cascade priorCard:dc-4. S5 봉인 영역 — 정확 수치 surface는 별도 mechanism (narrativeTrigger 영역 X)
export const e5NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'e5-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-4',
      disputeLieState: { 'd-5': 'S3+' },
    },
    scriptedRefs: [
      'emerge-e5-via-cascade-judge-decree-v1',
      'emerge-e5-via-cascade-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e5-via-combo',
    type: 'combination_result',
    recipeId: 'combine-2',
    preconditions: {
      disputeLieState: { 'd-5': 'S3+' },
    },
    scriptedRefs: [
      'emerge-e5-via-combo-judge-decree-v1',
      'emerge-e5-via-combo-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e5-via-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-5': 'S3+' },
      partyPhase: { b: ['defensive', 'shaken'] },
    },
    scriptedRefs: [
      'emerge-e5-via-b-interject-v1',
      'emerge-e5-via-b-interject-judge-react-v1',
      'emerge-e5-via-b-interject-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e5-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 6 },
    scriptedRefs: [
      'emerge-e5-via-judge-auto-decree-v1',
      'emerge-e5-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]

// dc-5 "어머니의 뜻" (CoreDossierCard, 최종 종합 단서) — 4 trigger candidates
// Batch 3. cascade priorCard:d-5. 양측 책임축 종합 — A "장남 당연시 frame 책임 인식 첫 진입" outburst
export const dc5NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc5-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'd-5',
      disputeLieState: { 'd-5': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc5-via-cascade-judge-decree-v1',
      'emerge-dc5-via-cascade-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc5-via-combo',
    type: 'combination_result',
    recipeId: 'combine-2',
    preconditions: {
      disputeLieState: { 'd-5': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc5-via-combo-judge-decree-v1',
      'emerge-dc5-via-combo-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc5-via-a-outburst',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      disputeLieState: { 'd-5': 'S2+' },
      partyPhase: { a: ['shaken', 'resigned'] },
    },
    scriptedRefs: [
      'emerge-dc5-via-a-outburst-v1',
      'emerge-dc5-via-a-outburst-judge-react-v1',
      'emerge-dc5-via-a-outburst-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc5-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 6 },
    scriptedRefs: [
      'emerge-dc5-via-judge-auto-decree-v1',
      'emerge-dc5-via-judge-auto-b-respond-v1',
    ],
    vfxProfile: 'standard',
  },
]
