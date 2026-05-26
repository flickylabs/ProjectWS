/**
 * friend-01 — Core Narrative Wrapper Layer (Cycle 7 Line A+B + Cycle 8b Line C + Cycle 9 Line D)
 *
 * 권위: [[design_core_narrative_cycle_procedure]] / [[feedback_new_dispute_evidence_narrative_justification]]
 * Brief: docs/design/core-narrative-cycle7-friend01-lineAB-20260524/ + docs/design/core-narrative-cycle8b-friend01-lineC-20260525/ + docs/design/core-narrative-cycle9-friend01-lineD-20260525/
 *
 * Cycle 7 (Line A + B): 5 emergence × multi-trigger candidate.
 *   - dc-1 "단톡방 글의 근거" (label 변경 commit 081e8dbc)
 *   - dc-2 "먼저 넘은 선"
 *   - e-4 "예비신랑의 선 넘는 메시지와 최수민의 거절 답장"
 *   - w-1 "김세라 (단톡방 동조자)"
 *   - w-2 "박준혁 (예비신랑 회사 후배)" — Cycle 7 dc-2 영역 4 trigger
 *
 * Cycle 8b (Line C 아버지/사기 — plot revision base b77a27c5 후): 7 emergence + w-2 확장.
 *   - e-5 "예비신랑 회사 단톡 떠벌림 + 9일간 차단 메시지" (plot revision 자료 교체)
 *   - dc-3 "같은 부탁"
 *   - d-3 "아버지의 돈 접근 패턴" (hidden)
 *   - e-6 "과거 송금 영수증 + 문자"
 *   - dc-4 "손절의 이유" (label 변경 — 기존 "손절의 값")
 *   - d-4 "과거 손절과 아버지의 사기" (hidden, legitimacyIssue)
 *   - w-3 "오미경 (분식집 사장, pro_b)"
 *   - w-2 확장 — dc-3 영역 cascade + combo trigger 2개 추가
 *
 * Cycle 9 (Line D 종합 — friend-01 narrative wrapper 영역 마지막 cycle): 3 emergence × 4 trigger = 12 trigger candidate.
 *   - e-7 "과거/현재 대조표" — cascade priorCard d-4 / w-3 + b outburst (1문장) + fallback
 *   - d-5 "단톡방 매도와 명예훼손" (hidden) — cascade priorCard e-7 / dc-4 + a npc_interjection + fallback
 *   - dc-5 "낙인의 순서" — cascade priorCard d-5 + combine-7 (e-2+e-7) + a outburst + fallback
 *
 * First-Fired-Wins + judge_auto_mention fallback (turnsAfterEligible: 5).
 * 캐릭터 frame (Cycle 8b 핵심):
 *   - B (affect_flattening): 자제 톤. b-outburst trigger 사용 X. b-submit "어쩔 수 없이 단답" frame.
 *   - A (premature_summary): 결론 먼저 + 부정 외침. a-outburst 격앙 부정 frame.
 * 정책: `feedback_judge_dispassionate_action_focused` (Cycle 7 도입) + `design_friend01_truth_disclosure_policy` (그룹 2/3/4 surface tier 단계별).
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
  {
    id: 'dc2-via-combo-stmt-b-silence',
    type: 'combination_result',
    recipeId: 'combine-9',
    preconditions: {
      disputeLieState: { 'd-2': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc2-via-combo-stmt-b-silence-judge-query-v1',
      'emerge-dc2-via-combo-stmt-b-silence-b-context-v1',
      'emerge-dc2-via-combo-stmt-b-silence-a-react-v1',
      'emerge-dc2-via-combo-stmt-b-silence-judge-decree-v1',
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
      requirePriorCardFired: 'e-1',
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
    preconditions: { turnsAfterEligible: 3 },
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
      disputeLieState: { 'd-1': 'S2+' },
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
    preconditions: { turnsAfterEligible: 3 },
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
// w-2 "박준혁 (예비신랑 회사 후배 + B 필라테스 수강생, neutral + accurate)" (CoreWitness)
// Cycle 7 dc-2 영역 4 candidates + Cycle 8b dc-3 영역 2 candidates (확장) = 총 6 candidates
// First-Fired-Wins — w-2 emergence per entity 한 번 fire되면 모든 후보 disabled
// ─────────────────────────────────────────────────────────────────────────────

export const w2NarrativeTriggers: NarrativeTriggerCandidate[] = [
  // Cycle 7 dc-2 영역 4 candidates
  {
    id: 'w2-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-2',
      disputeLieState: { 'd-2': 'S2+' },
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
    preconditions: { turnsAfterEligible: 3 },
    scriptedRefs: [
      'emerge-w2-via-fallback-judge-mention-v1',
      'emerge-w2-via-fallback-a-react-v1',
      'emerge-w2-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  // Cycle 8b dc-3 영역 2 candidates (확장) — w-2.unlockedByDossier ['dc-2','dc-3'] 확장 권위
  {
    id: 'w2-via-cascade-dc3',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-3',
      disputeLieState: { 'd-3': 'S0+' },
    },
    scriptedRefs: [
      'emerge-w2-via-cascade-dc3-judge-decree-v1',
      'emerge-w2-via-cascade-dc3-a-react-v1',
      'emerge-w2-via-cascade-dc3-b-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w2-via-combo-dc3',
    type: 'combination_result',
    recipeId: 'combine-3',
    preconditions: {
      disputeLieState: { 'd-3': 'S0+' },
    },
    scriptedRefs: [
      'emerge-w2-via-combo-dc3-judge-mention-v1',
      'emerge-w2-via-combo-dc3-a-react-v1',
      'emerge-w2-via-combo-dc3-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Cycle 8b — Line C 아버지 돈 line (plot revision base b77a27c5)
// 7 emergence × 4 trigger candidate
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// e-5 "예비신랑 회사 단톡 떠벌림 + 9일간 차단 메시지" (CoreEvidence) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const e5NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'e5-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-2',
      disputeLieState: { 'd-2': 'S3+' },
    },
    scriptedRefs: [
      'emerge-e5-via-cascade-judge-mention-v1',
      'emerge-e5-via-cascade-b-submit-v1',
      'emerge-e5-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e5-via-npc-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-2': 'S2+' },
      contextAction: 'question.fact_pursuit.a',
    },
    scriptedRefs: [
      'emerge-e5-via-npc-b-interject-v1',
      'emerge-e5-via-npc-a-react-v1',
      'emerge-e5-via-npc-judge-mention-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e5-via-outburst-a',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      partyPhase: { a: ['shaken', 'angry'] },
      disputeLieState: { 'd-2': 'S2+' },
    },
    scriptedRefs: [
      'emerge-e5-via-outburst-a-confess-v1',
      'emerge-e5-via-outburst-judge-catch-v1',
      'emerge-e5-via-outburst-judge-mention-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'e5-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 3 },
    scriptedRefs: [
      'emerge-e5-via-fallback-judge-query-v1',
      'emerge-e5-via-fallback-b-submit-v1',
      'emerge-e5-via-fallback-judge-mention-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// dc-3 "같은 부탁" (CoreDossierCard) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const dc3NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc3-via-combo',
    type: 'combination_result',
    recipeId: 'combine-3',
    preconditions: {
      disputeLieState: { 'd-3': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc3-via-combo-judge-query-v1',
      'emerge-dc3-via-combo-b-context-v1',
      'emerge-dc3-via-combo-a-react-v1',
      'emerge-dc3-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc3-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'e-5',
      disputeLieState: { 'd-3': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc3-via-cascade-judge-decree-v1',
      'emerge-dc3-via-cascade-b-react-v1',
      'emerge-dc3-via-cascade-judge-decree-v2',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc3-via-outburst-a',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      partyPhase: { a: ['shaken'] },
      disputeLieState: { 'd-3': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc3-via-outburst-a-deny-v1',
      'emerge-dc3-via-outburst-judge-catch-v1',
      'emerge-dc3-via-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc3-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-dc3-via-fallback-judge-query-v1',
      'emerge-dc3-via-fallback-b-context-v1',
      'emerge-dc3-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc3-via-combo-stmt-b-silence',
    type: 'combination_result',
    recipeId: 'combine-10',
    preconditions: {
      disputeLieState: { 'd-3': 'S1+' },
    },
    scriptedRefs: [
      'emerge-dc3-via-combo-stmt-b-silence-judge-query-v1',
      'emerge-dc3-via-combo-stmt-b-silence-b-context-v1',
      'emerge-dc3-via-combo-stmt-b-silence-a-react-v1',
      'emerge-dc3-via-combo-stmt-b-silence-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// d-3 "아버지의 돈 접근 패턴" (CoreDispute, hidden) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const d3NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'd3-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-3',
      disputeLieState: { 'd-2': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d3-via-cascade-judge-decree-v1',
      'emerge-d3-via-cascade-a-react-v1',
      'emerge-d3-via-cascade-b-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd3-via-combo',
    type: 'combination_result',
    recipeId: 'combine-3',
    preconditions: {
      disputeLieState: { 'd-2': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d3-via-combo-judge-mention-v1',
      'emerge-d3-via-combo-a-react-v1',
      'emerge-d3-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'd3-via-outburst-a',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      partyPhase: { a: ['shaken', 'angry'] },
      disputeLieState: { 'd-2': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d3-via-outburst-a-deny-v1',
      'emerge-d3-via-outburst-judge-catch-v1',
      'emerge-d3-via-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'd3-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 4 },
    scriptedRefs: [
      'emerge-d3-via-fallback-judge-mention-v1',
      'emerge-d3-via-fallback-a-react-v1',
      'emerge-d3-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// e-6 "과거 송금 영수증 + 문자" (CoreEvidence) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const e6NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'e6-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'd-3',
      disputeLieState: { 'd-3': 'S3+' },
    },
    scriptedRefs: [
      'emerge-e6-via-cascade-judge-mention-v1',
      'emerge-e6-via-cascade-b-submit-v1',
      'emerge-e6-via-cascade-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e6-via-npc-b-interject',
    type: 'npc_interjection',
    source: 'b',
    preconditions: {
      disputeLieState: { 'd-3': 'S2+' },
      contextAction: 'question.fact_pursuit.a',
    },
    scriptedRefs: [
      'emerge-e6-via-npc-b-interject-v1',
      'emerge-e6-via-npc-a-react-v1',
      'emerge-e6-via-npc-judge-mention-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'e6-via-outburst-a',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      partyPhase: { a: ['shaken', 'angry'] },
      disputeLieState: { 'd-3': 'S2+' },
    },
    scriptedRefs: [
      'emerge-e6-via-outburst-a-confess-v1',
      'emerge-e6-via-outburst-judge-catch-v1',
      'emerge-e6-via-outburst-judge-mention-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'e6-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 4 },
    scriptedRefs: [
      'emerge-e6-via-fallback-judge-query-v1',
      'emerge-e6-via-fallback-b-submit-v1',
      'emerge-e6-via-fallback-judge-mention-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// dc-4 "손절의 이유" (CoreDossierCard, label 변경: 기존 "손절의 값") — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const dc4NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc4-via-combo',
    type: 'combination_result',
    recipeId: 'combine-4',
    preconditions: {
      disputeLieState: { 'd-4': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc4-via-combo-judge-query-v1',
      'emerge-dc4-via-combo-b-context-v1',
      'emerge-dc4-via-combo-a-react-v1',
      'emerge-dc4-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc4-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'e-6',
      disputeLieState: { 'd-4': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc4-via-cascade-judge-decree-v1',
      'emerge-dc4-via-cascade-b-react-v1',
      'emerge-dc4-via-cascade-judge-decree-v2',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'dc4-via-outburst-a',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      partyPhase: { a: ['shaken', 'angry'] },
      disputeLieState: { 'd-4': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc4-via-outburst-a-deny-v1',
      'emerge-dc4-via-outburst-judge-catch-v1',
      'emerge-dc4-via-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc4-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-dc4-via-fallback-judge-query-v1',
      'emerge-dc4-via-fallback-b-context-v1',
      'emerge-dc4-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// d-4 "과거 손절과 아버지의 사기" (CoreDispute, hidden, legitimacyIssue) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const d4NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'd4-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-4',
      disputeLieState: { 'd-3': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d4-via-cascade-judge-decree-v1',
      'emerge-d4-via-cascade-a-react-v1',
      'emerge-d4-via-cascade-b-react-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'd4-via-combo',
    type: 'combination_result',
    recipeId: 'combine-4',
    preconditions: {
      disputeLieState: { 'd-3': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d4-via-combo-judge-mention-v1',
      'emerge-d4-via-combo-a-react-v1',
      'emerge-d4-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'd4-via-outburst-a',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      partyPhase: { a: ['shaken', 'angry'] },
      disputeLieState: { 'd-3': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d4-via-outburst-a-deny-v1',
      'emerge-d4-via-outburst-judge-catch-v1',
      'emerge-d4-via-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'd4-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-d4-via-fallback-judge-mention-v1',
      'emerge-d4-via-fallback-a-react-v1',
      'emerge-d4-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// w-3 "오미경 (분식집 사장, pro_b + accurate)" (CoreWitness) — 4 candidates
// ─────────────────────────────────────────────────────────────────────────────

export const w3NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'w3-via-cascade',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-4',
      disputeLieState: { 'd-4': 'S0+' },
    },
    scriptedRefs: [
      'emerge-w3-via-cascade-judge-decree-v1',
      'emerge-w3-via-cascade-a-react-v1',
      'emerge-w3-via-cascade-b-react-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w3-via-combo',
    type: 'combination_result',
    recipeId: 'combine-4',
    preconditions: {
      disputeLieState: { 'd-4': 'S0+' },
    },
    scriptedRefs: [
      'emerge-w3-via-combo-judge-mention-v1',
      'emerge-w3-via-combo-a-react-v1',
      'emerge-w3-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
  {
    id: 'w3-via-judge-auto',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 3 },
    scriptedRefs: [
      'emerge-w3-via-fallback-judge-mention-v1',
      'emerge-w3-via-fallback-a-react-v1',
      'emerge-w3-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ═════════════════════════════════════════════════════════════════════════════
// Cycle 9 (Line D 종합 — friend-01 narrative wrapper 영역 마지막 cycle)
// 3 emergence × 4 trigger = 12 trigger candidate / 36 KO entry
// cascade chain: d-4/w-3 → e-7 → d-5 → dc-5 (사건 종결)
// 진실 노출 정책: 그룹 5 (확인 없이 매도 / 명예훼손 / 먼저 낙인 / B 또 악역 / 반복 침묵) surface tier 단독
// ═════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// e-7 "과거/현재 대조표" (CoreEvidence) — 4 candidates
// requires e-4 + e-5 + e-6 + S3 / proves d-5 + d-1
// ─────────────────────────────────────────────────────────────────────────────

export const e7NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'e7-via-cascade-d4',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'd-4',
      disputeLieState: { 'd-4': 'S3+' },
    },
    scriptedRefs: [
      'emerge-e7-via-cascade-d4-judge-decree-v1',
      'emerge-e7-via-cascade-d4-a-react-v1',
      'emerge-e7-via-cascade-d4-b-react-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'e7-via-cascade-w3',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'w-3',
      disputeLieState: { 'd-4': 'S3+' },
    },
    scriptedRefs: [
      'emerge-e7-via-cascade-w3-judge-mention-v1',
      'emerge-e7-via-cascade-w3-b-submit-v1',
      'emerge-e7-via-cascade-w3-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'e7-via-outburst-b',
    type: 'emotional_outburst',
    source: 'b',
    preconditions: {
      partyPhase: { b: ['shaken'] },
      disputeLieState: { 'd-4': 'S3+' },
    },
    scriptedRefs: [
      'emerge-e7-via-outburst-b-surface-v1',
      'emerge-e7-via-outburst-judge-catch-v1',
      'emerge-e7-via-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'e7-via-fallback',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 4 },
    scriptedRefs: [
      'emerge-e7-via-fallback-judge-query-v1',
      'emerge-e7-via-fallback-b-submit-v1',
      'emerge-e7-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// d-5 "단톡방 매도와 명예훼손" (CoreDispute, hidden) — 4 candidates
// unlock: d-3 S3 + d-4 S3 또는 dc-4 success effect (unlock_dispute d-5)
// ─────────────────────────────────────────────────────────────────────────────

export const d5NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'd5-via-cascade-e7',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'e-7',
      disputeLieState: { 'd-4': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d5-via-cascade-e7-judge-decree-v1',
      'emerge-d5-via-cascade-e7-a-react-v1',
      'emerge-d5-via-cascade-e7-b-react-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'd5-via-cascade-dc4',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'dc-4',
      disputeLieState: { 'd-3': 'S3+', 'd-4': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d5-via-cascade-dc4-judge-mention-v1',
      'emerge-d5-via-cascade-dc4-a-react-v1',
      'emerge-d5-via-cascade-dc4-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'd5-via-npc-a',
    type: 'npc_interjection',
    source: 'a',
    preconditions: {
      partyPhase: { a: ['shaken', 'defensive'] },
      disputeLieState: { 'd-3': 'S3+', 'd-4': 'S3+' },
    },
    scriptedRefs: [
      'emerge-d5-via-npc-a-defend-v1',
      'emerge-d5-via-npc-judge-catch-v1',
      'emerge-d5-via-npc-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'd5-via-fallback',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-d5-via-fallback-judge-mention-v1',
      'emerge-d5-via-fallback-a-react-v1',
      'emerge-d5-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// dc-5 "낙인의 순서" (CoreDossierCard, linkedParty 'a') — 4 candidates
// 종결 단서 — friend-01 narrative wrapper 영역 마지막 entry
// ─────────────────────────────────────────────────────────────────────────────

export const dc5NarrativeTriggers: NarrativeTriggerCandidate[] = [
  {
    id: 'dc5-via-cascade-d5',
    type: 'cascade_from_card',
    preconditions: {
      requirePriorCardFired: 'd-5',
    },
    scriptedRefs: [
      'emerge-dc5-via-cascade-d5-judge-decree-v1',
      'emerge-dc5-via-cascade-d5-a-react-v1',
      'emerge-dc5-via-cascade-d5-b-react-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc5-via-combo',
    type: 'combination_result',
    recipeId: 'combine-7',
    preconditions: {
      disputeLieState: { 'd-5': 'S0+' },
    },
    scriptedRefs: [
      'emerge-dc5-via-combo-judge-mention-v1',
      'emerge-dc5-via-combo-a-react-v1',
      'emerge-dc5-via-combo-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc5-via-outburst-a',
    type: 'emotional_outburst',
    source: 'a',
    preconditions: {
      partyPhase: { a: ['shaken'] },
      disputeLieState: { 'd-5': 'S2+' },
    },
    scriptedRefs: [
      'emerge-dc5-via-outburst-a-defend-v1',
      'emerge-dc5-via-outburst-judge-catch-v1',
      'emerge-dc5-via-outburst-judge-decree-v1',
    ],
    vfxProfile: 'emphasis',
  },
  {
    id: 'dc5-via-fallback',
    type: 'judge_auto_mention',
    preconditions: { turnsAfterEligible: 5 },
    scriptedRefs: [
      'emerge-dc5-via-fallback-judge-mention-v1',
      'emerge-dc5-via-fallback-a-react-v1',
      'emerge-dc5-via-fallback-judge-decree-v1',
    ],
    vfxProfile: 'standard',
  },
]
