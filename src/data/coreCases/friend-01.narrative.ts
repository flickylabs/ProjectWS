/**
 * friend-01 — Core Narrative Wrapper Layer (Cycle 7 — Line A + B)
 *
 * 권위: [[design_core_narrative_cycle_procedure]] / [[feedback_new_dispute_evidence_narrative_justification]]
 * Brief: docs/design/core-narrative-cycle7-friend01-lineAB-20260524/
 *
 * Cycle 7 (Line A + B): 5 emergence × multi-trigger candidate.
 *   - dc-1 "단톡방 글의 근거" (label 변경 commit 081e8dbc)
 *   - dc-2 "먼저 넘은 선"
 *   - e-4 "예비신랑의 선 넘는 메시지와 최수민의 거절 답장"
 *   - w-1 "김세라 (단톡방 동조자)"
 *   - w-2 "박준혁 (예비신랑 회사 후배)"
 *
 * Cycle 8 (Line C 아버지/사기) + Cycle 9 (Line D 종합) 영역은 별도 cycle.
 *
 * First-Fired-Wins + judge_auto_mention fallback (turnsAfterEligible: 5).
 * 신규 정책 (Cycle 7 도입): `feedback_judge_dispassionate_action_focused`.
 */

import type { NarrativeTriggerCandidate } from '../../types/narrativeTrigger'

// ─────────────────────────────────────────────────────────────────────────────
// dc-1 "단톡방 글의 근거" (CoreDossierCard) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const dc1NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc1-via-combo',
    type: 'combination_result',
    recipeId: 'combine-1',
    preconditions: {
      disputeLieState: { 'd-1': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc1-via-combo-judge-query-v1',
      'emerge-dc1-via-combo-a-response-v1',
      'emerge-dc1-via-combo-b-react-v1',
      'emerge-dc1-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc1-via-npc-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-1': 'S0+' },
      contextAction: 'question.fact_pursuit.a',
    },
    scriptedRefs: [
      'emerge-dc1-via-npc-b-interject-v1',
      'emerge-dc1-via-npc-judge-query-v1',
      'emerge-dc1-via-npc-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc1-via-outburst-a',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      partyPhase: { a: ['shaken', 'angry'] },
      disputeLieState: { 'd-1': 'S1+' },
    },
    scriptedRefs: [
      'emerge-dc1-via-outburst-a-confess-v1',
      'emerge-dc1-via-outburst-judge-catch-v1',
      'emerge-dc1-via-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc1-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-dc1-via-fallback-judge-query-v1',
      'emerge-dc1-via-fallback-a-response-v1',
      'emerge-dc1-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// dc-2 "먼저 넘은 선" (CoreDossierCard) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const dc2NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc2-via-combo',
    type: 'combination_result',
    recipeId: 'combine-2',
    preconditions: {
      disputeLieState: { 'd-2': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc2-via-combo-judge-query-v1',
      'emerge-dc2-via-combo-a-response-v1',
      'emerge-dc2-via-combo-b-react-v1',
      'emerge-dc2-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc2-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      disputeLieState: { 'd-1': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc2-via-cascade-judge-decree-v1',
      'emerge-dc2-via-cascade-b-submit-v1',
      'emerge-dc2-via-cascade-judge-decree-v2',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc2-via-npc-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-2': 'S0+' },
      contextAction: 'question.fact_pursuit.a',
    },
    scriptedRefs: [
      'emerge-dc2-via-npc-b-interject-v1',
      'emerge-dc2-via-npc-judge-query-v1',
      'emerge-dc2-via-npc-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc2-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-dc2-via-fallback-judge-query-v1',
      'emerge-dc2-via-fallback-b-submit-v1',
      'emerge-dc2-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// e-4 "예비신랑의 선 넘는 메시지와 최수민의 거절 답장" (CoreEvidence) — 4 candidates
// (e-4는 dc-2 입력 증거 — 거의 동시 surface. combo trigger도 별도 entry 보유)
// ─────────────────────────────────────────────────────────────────────────────

export const e4NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'e4-via-combo',
    type: 'combination_result',
    recipeId: 'combine-2',
    preconditions: {
      disputeLieState: { 'd-2': 'S0+' },
    },
    scriptedRefs: [
      'emerge-e4-via-combo-judge-mention-v1',
      'emerge-e4-via-combo-b-context-v1',
      'emerge-e4-via-combo-a-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e4-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-1',
      disputeLieState: { 'd-1': 'S0+' },
    },
    scriptedRefs: [
      'emerge-e4-via-cascade-judge-request-v1',
      'emerge-e4-via-cascade-b-submit-v1',
      'emerge-e4-via-cascade-judge-mention-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e4-via-outburst-b',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      partyPhase: { b: ['shaken', 'angry'] },
      disputeLieState: { 'd-2': 'S0+' },
    },
    scriptedRefs: [
      'emerge-e4-via-outburst-b-confess-v1',
      'emerge-e4-via-outburst-judge-request-v1',
      'emerge-e4-via-outburst-judge-mention-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'e4-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-e4-via-fallback-judge-request-v1',
      'emerge-e4-via-fallback-b-submit-v1',
      'emerge-e4-via-fallback-judge-mention-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// w-1 "김세라 (단톡방 동조자, pro_a + strategic)" (CoreWitness) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const w1NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'w1-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-1',
    },
    scriptedRefs: [
      'emerge-w1-via-cascade-judge-decree-v1',
      'emerge-w1-via-cascade-a-react-v1',
      'emerge-w1-via-cascade-b-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w1-via-combo',
    type: 'combination_result',
    recipeId: 'combine-8',
    preconditions: {
      disputeLieState: { 'd-5': 'S0+' },
    },
    scriptedRefs: [
      'emerge-w1-via-combo-judge-mention-v1',
      'emerge-w1-via-combo-a-react-v1',
      'emerge-w1-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w1-via-npc-b-context',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-1': 'S1+' },
      contextAction: 'question.fact_pursuit.b',
    },
    scriptedRefs: [
      'emerge-w1-via-npc-b-context-v1',
      'emerge-w1-via-npc-judge-decree-v1',
      'emerge-w1-via-npc-a-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w1-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-w1-via-fallback-judge-mention-v1',
      'emerge-w1-via-fallback-a-react-v1',
      'emerge-w1-via-fallback-b-react-v1',
      'emerge-w1-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// w-2 "박준혁 (예비신랑 회사 후배, neutral + accurate)" (CoreWitness) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const w2NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'w2-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-2',
    },
    scriptedRefs: [
      'emerge-w2-via-cascade-judge-decree-v1',
      'emerge-w2-via-cascade-a-react-v1',
      'emerge-w2-via-cascade-b-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w2-via-combo',
    type: 'combination_result',
    recipeId: 'combine-2',
    preconditions: {
      disputeLieState: { 'd-2': 'S0+' },
    },
    scriptedRefs: [
      'emerge-w2-via-combo-judge-mention-v1',
      'emerge-w2-via-combo-a-react-v1',
      'emerge-w2-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w2-via-npc-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-2': 'S0+' },
      contextAction: 'question.fact_pursuit.a',
    },
    scriptedRefs: [
      'emerge-w2-via-npc-a-claim-v1',
      'emerge-w2-via-npc-b-interject-v1',
      'emerge-w2-via-npc-judge-decree-v1',
      'emerge-w2-via-npc-a-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w2-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-w2-via-fallback-judge-mention-v1',
      'emerge-w2-via-fallback-a-react-v1',
      'emerge-w2-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]
