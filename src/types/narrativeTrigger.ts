/**
 * Core System Narrative Trigger Layer
 *
 * 권위 메모리: feedback-new-dispute-evidence-narrative-justification
 *
 * 각 emergence (locked evidence unlock / hidden dispute emerge / dossier card surface /
 * witness first-call)에 narrative wrapper layer를 부착한다. legacy mechanical 조건이
 * 만족된 상태에서, multi-trigger 후보들이 평가되어 첫 만족 후보가 fire한다.
 * (First-Fired-Wins) — 한 trigger로 emergence가 일어나면 나머지 후보는 영구 disabled.
 *
 * Brief 참조: docs/design/core-narrative-cycle1-spouse01-e5-emergence-20260524/
 */

import { z } from 'zod'

// ─────────────────────────────────────────────────────────────────────────────
// Trigger types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * narrative trigger 후보 타입.
 * Cycle 1: 4종 (3 권장 + 1 fallback)
 * Cycle 2: +cascade_from_card (사건 카드 인과 chain) — [[design_narrative_cascade_from_card]]
 */
export const NarrativeTriggerTypeSchema = z.enum([
  'npc_interjection',      // 상대측 NPC 끼어듦 → 판사 reactive
  'combination_result',    // 증거 조합 결과 → 판사 query → 답변 중 발동
  'emotional_outburst',    // NPC 격앙/동요 → 돌발 발화
  'judge_auto_mention',    // N턴 fallback — 판사 자발 (Loose 세팅 안전망)
  'cascade_from_card',     // 이전 사건 카드/증거 fire 후 자연 연속 등장 (Cycle 2 신규)
])
export type NarrativeTriggerType = z.infer<typeof NarrativeTriggerTypeSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Preconditions (OR/AND 묶음)
// ─────────────────────────────────────────────────────────────────────────────

const LieStateThresholdSchema = z.enum(['S0+', 'S1+', 'S2+', 'S3+', 'S4+', 'S5+'])
export type LieStateThreshold = z.infer<typeof LieStateThresholdSchema>

const PartyEmotionalPhaseSchema = z.enum(['defensive', 'confident', 'shaken', 'angry', 'resigned'])

/** AND 묶음 — 모든 조건 만족 필요. */
export const NarrativeTriggerPreconditionsSchema = z.object({
  /** dispute별 최소 lieState. 다중 dispute 시 모두 만족 필요 (AND). */
  disputeLieState: z.record(z.string(), LieStateThresholdSchema).optional(),
  /** 파티별 distrust 최소값 (0~100). partial — 명시된 파티만 평가. */
  partyDistrust: z.object({
    a: z.object({ min: z.number().min(0).max(100) }).optional(),
    b: z.object({ min: z.number().min(0).max(100) }).optional(),
  }).optional(),
  /** 파티별 emotional phase — 배열 중 하나 만족 (파티 내 OR, 파티 간 AND). partial — 명시된 파티만 평가. */
  partyPhase: z.object({
    a: z.array(PartyEmotionalPhaseSchema).optional(),
    b: z.array(PartyEmotionalPhaseSchema).optional(),
  }).optional(),
  /** 활성 액션 context — 특정 액션 직후만 유효. 매칭 패턴 (예: 'evidence_present.b.d-1', 'question.fact_pursuit.consecutive2+'). */
  contextAction: z.string().optional(),
  /** legacy 조건 만족 후 N턴 대기. judge_auto_mention fallback 전용. */
  turnsAfterEligible: z.number().int().nonnegative().optional(),
  /**
   * cascade_from_card 전용 (Cycle 2) — 본 trigger 발동 전 fire 되어야 할 이전
   * 카드/증거 ID. dossierCardId 또는 evidenceId 통합. 미fire 상태면 본 trigger
   * 평가 skip. [[design_narrative_cascade_from_card]]
   */
  requirePriorCardFired: z.string().min(1).optional(),
})
export type NarrativeTriggerPreconditions = z.infer<typeof NarrativeTriggerPreconditionsSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Trigger candidate
// ─────────────────────────────────────────────────────────────────────────────

export const NarrativeTriggerCandidateSchema = z.object({
  /** 후보 고유 ID (emergence-id-via-trigger-type 형식 권장). */
  id: z.string().min(1),
  type: NarrativeTriggerTypeSchema,
  /** 발동 주체 — npc_interjection / emotional_outburst 의 발설자. */
  source: z.enum(['a', 'b', 'judge']).optional(),
  /**
   * Preconditions — 단일 객체 (AND) 또는 배열 (배열 간 OR, 객체 내 AND).
   * 예: [{disputeLieState:{'d-1':'S2+'}}, {partyDistrust:{a:{min:50}}}] → "둘 중 하나만 만족"
   */
  preconditions: z.union([
    NarrativeTriggerPreconditionsSchema,
    z.array(NarrativeTriggerPreconditionsSchema).min(1),
  ]),
  /** combination_result 전용 — 트리거가 되는 조합 recipe id. */
  recipeId: z.string().optional(),
  /** narrative 시퀀스의 ScriptedText id 배열. */
  scriptedRefs: z.array(z.string().min(1)).min(1),
  /** VFX 강도. 등재 시 컷씬/팝업 연출 프로필. */
  /**
   * VFX 강도 — 등재 시 컷씬/팝업 연출 프로필.
   *
   *  - 'standard' : 기본 popup/lightning (1초 내외)
   *  - 'emphasis' : 강조 popup + 화면 살짝 어두워짐 (2~3초)
   *  - 'cutscene_dual_emergence' : 컷씬급 (evidence + dispute 동시 emergence 전용).
   *      화면 전환 레터박스 + 카메라 한 박자 지연 + 두 카드 동시 소극 (4~5초). MAJOR_CUTSCENES 큐.
   */
  vfxProfile: z.enum(['standard', 'emphasis', 'cutscene_dual_emergence']).default('standard').optional(),
})
export type NarrativeTriggerCandidate = z.infer<typeof NarrativeTriggerCandidateSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Runtime state (per emergence — first-fired-wins tracking)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Per-emergence runtime state — `firedTrigger` set 시 해당 emergence는 영구
 * narrative-resolved 상태로, 나머지 trigger 후보 평가 skip.
 *
 * 적용 위치: EvidenceRuntimeState (그리고 추후 dispute/dossier/witness 상태).
 */
export interface NarrativeTriggerState {
  /** 등재 시 fire된 trigger id. 한 번 set되면 나머지 후보 영구 disabled. */
  firedTrigger?: string
  /** legacy 조건 만족 turn 기록 (N턴 fallback 계산용). */
  legacyEligibleTurn?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Fire result
// ─────────────────────────────────────────────────────────────────────────────

export interface NarrativeTriggerFireResult {
  /** 발동된 trigger id. */
  triggerId: string
  /** narrative 시퀀스 (재생 순서). */
  scriptedSequence: string[]
  /** VFX 프로필. */
  vfxProfile: 'standard' | 'emphasis' | 'cutscene_dual_emergence'
  /** 발동된 trigger 타입 (telemetry/observation 용). */
  triggerType: NarrativeTriggerType
}
