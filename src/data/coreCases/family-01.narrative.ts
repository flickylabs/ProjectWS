/**
 * family-01 — Core Narrative Wrapper Layer (Cycle 5 — Line A 절차/판단)
 *
 * 권위: [[design_core_narrative_cycle_procedure]] / [[feedback_new_dispute_evidence_narrative_justification]]
 * Brief: docs/design/core-narrative-cycle5-family01-procedure-line-20260524/
 *
 * Cycle 5 (Line A 절차/판단) — 6 emergence × multi-trigger candidate. First-Fired-Wins +
 * judge_auto_mention fallback.
 *
 * 6 emergence:
 *   - dc-1 "말년의 종이" (DossierCard) — 4 trigger
 *   - w-1  "최복순" (Witness) — 3 trigger
 *   - d-2  "공증 절차의 개입" (Dispute) — 4 trigger
 *   - e-3  "전 요양보호사 음성증언" (Evidence) — 4 trigger
 *   - dc-2 "수정된 유언장" (DossierCard) — 4 trigger
 *   - w-2  "김영수" (Witness) — 3 trigger
 *
 * cascade chain: dc-1 → w-1 / dc-1 → d-2 → e-3 / d-2 → dc-2 → w-2
 *   - w-1 cascade priorCard:dc-1
 *   - d-2 cascade priorCard:dc-1
 *   - e-3 cascade priorCard:dc-1
 *   - dc-2 cascade priorCard:d-2 (dispute → dossier 첫 사용 사례)
 *   - w-2 cascade priorCard:dc-2
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
