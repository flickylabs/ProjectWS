/**
 * ClaimPolicyV2 — 의미 원자(atom) + slot 기반 구조
 * ─────────────────────────────────
 * publicClaim(완성 문장)을 대체.
 * 의미(factText)와 표현(slot)을 분리하여
 * archetype/tell/answerFocus가 서로 충돌하지 않게 한다.
 *
 * 설계: GPT Pro (claimpolicy_v2_blueprint_input_draft.ts)
 * 구현: Claude Code
 */

import type { LieState } from './agent'
import type { Stance, QuestionType, DefenseMode, AttackVector, EmotionTier } from './renewal'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Claim Atom
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type ClaimAtomId = string

export type ClaimAtomTag =
  | 'act'                // 무엇을 했는지
  | 'timeline'           // 언제/순서
  | 'motive'             // 왜 그랬는지
  | 'emotion'            // 어떤 심정이었는지
  | 'rule'               // 약속/절차/원칙
  | 'evidence'           // 증거 연결
  | 'context'            // 맥락/배경
  | 'identity'           // 사람/기관 정체
  | 'responsibility'     // 책임 배분
  | 'relationship'       // 관계 감정
  | 'counter'            // 역공/되묻기
  | 'self_justification' // 자기 합리화
  | 'harm'               // 피해/부담
  | 'fear'               // 두려움
  | 'shame'              // 수치심
  | 'privacy'            // 사생활
  | 'admission'          // 이미 인정된 사실
  | 'denial'             // 부정 대상
  | 'uncertainty'        // 유보/흐림
  | 'quote'              // 인용
  | 'threshold'          // 기준선 (100만원 등)
  | 'beneficiary'        // 대상자
  | 'institution'        // 기관/센터
  | 'location'           // 장소/위치
  | 'legacy_sentence'    // v1 fallback 합성

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Slots — 표현 레이어
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface AmountSlot {
  exact?: string            // "2,800,000원"
  rounded?: string          // "280만원"
  neutral: string           // "해당 금액" | "그 돈"
}

export interface TimeSlot {
  dateExact?: string        // "9월 20일"
  timeExact?: string        // "오후 2시 03분"
  dateTimeExact?: string    // "9월 20일 14시 03분"
  period?: string           // "추석 연휴 직전"
  neutral: string           // "그날" | "그 시점"
}

export interface PersonSlot {
  fullName?: string         // "최민정"
  judgeRef?: string         // "제 남편" | "제 아내"
  directRef?: string        // "자기" | "누나"
  angryRef?: string         // "한지석 씨!" | "오세린 씨!"
  role?: string             // "상담팀장"
  neutral: string           // "그 사람" | "상대"
}

export interface EvidenceSlot {
  fullName?: string         // "재가돌봄센터 간병 예약 확인서"
  shortName?: string        // "예약서"
  neutral: string           // "그 자료"
}

export interface MessageSlot {
  quoteExact?: string       // "조용한 데서 보죠"
  quoteShort?: string       // "그 문장"
  neutral: string           // "그 대화"
}

export interface RuleSlot {
  exact?: string            // "100만원 이상은 반드시 상의"
  shortName?: string        // "사전 상의 약속"
  neutral: string           // "그 약속"
}

export interface ActionSlot {
  exact?: string            // "공동계좌 송금"
  neutral: string           // "그 일"
}

export interface PlaceSlot {
  exact?: string            // "모텔가 인근 골목"
  shortName?: string        // "그 골목"
  neutral: string           // "그곳"
}

export interface ThresholdSlot {
  thresholdExact?: string   // "100만원"
  thresholdNeutral?: string // "기준선"
  neutral: string           // "그 금액 기준"
}

export interface ClaimAtomSlots {
  amount?: AmountSlot
  time?: TimeSlot
  person?: PersonSlot
  relation?: PersonSlot     // 상대 호칭용
  evidence?: EvidenceSlot
  message?: MessageSlot
  rule?: RuleSlot
  action?: ActionSlot
  place?: PlaceSlot
  threshold?: ThresholdSlot
  beneficiary?: PersonSlot
}

export type SlotFamily = keyof ClaimAtomSlots
export type SlotSurfaceMode = 'exact' | 'rounded' | 'neutral' | 'dateExact' | 'timeExact' | 'dateTimeExact' | 'period' | 'judgeRef' | 'directRef' | 'angryRef' | 'role' | 'fullName' | 'shortName' | 'quoteExact' | 'quoteShort' | 'thresholdExact' | 'thresholdNeutral'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ClaimAtom 인터페이스
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ClaimAtom {
  /** 고유 ID — allowedClaimAtoms에서 이 ID 사용 */
  id: ClaimAtomId
  /** 의미 라벨 (완성 문장 금지) */
  factText: string
  /** answerFocus / subAction 선택 기준 */
  tags: ClaimAtomTag[]
  /** 표현 slot */
  slots?: ClaimAtomSlots
  /** 특정 stance에 잘 맞는 atom */
  stanceHints?: Stance[]
  /** 특정 subAction에서만 열리는 atom */
  usableInSubActions?: QuestionType[]
  /** 특정 증거 제시 후에만 개방 */
  requiresEvidenceIds?: string[]
  /** 반복 페널티 */
  repeatPenalty?: number
  /** admission floor에 의해 재부정 금지 */
  isAdmissionSafe?: boolean
  /** 데이터 출처 */
  source?: 'v2' | 'legacy_publicClaim'
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ClaimPolicyV2
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ClaimPolicyV2 {
  disputeId: string
  state: LieState
  /** V2 핵심 데이터 */
  claimAtoms: ClaimAtom[]
  /** 실제 알고 있는 진실 */
  privateKnowledge: string[]
  /** 절대 꺼내지 않을 사실 */
  suppressions: string[]
  /** 감정 누설 위험도 */
  emotionalLeakRisk: 'none' | 'low' | 'mid' | 'high'
  /** 발현 가능 tell */
  tellPool: string[]
  /** legacy 호환용 (Board 요약, fallback) */
  publicClaim?: string[]
  /** legacy fallback: publicClaim을 합성할 수 없을 때의 대체 문장 */
  fallbackPublicClaim?: string[]
  /** 스키마 버전 */
  schemaVersion: 'v2'
}

/** 정규화된 V2 (legacy 합성 포함) */
export interface NormalizedClaimPolicyV2 {
  disputeId: string
  state: LieState
  claimAtoms: ClaimAtom[]
  privateKnowledge: string[]
  suppressions: string[]
  emotionalLeakRisk: 'none' | 'low' | 'mid' | 'high'
  tellPool: string[]
  compatMode: 'v2' | 'legacy'
  legacyPublicClaim?: string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SubAction → Atom 선택 규칙
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface SubActionAtomRule {
  primaryTags: ClaimAtomTag[]
  secondaryTags: ClaimAtomTag[]
  avoidTags?: ClaimAtomTag[]
  coreAtomCount: 1 | 2
  preferredSlotModes: Partial<Record<SlotFamily, SlotSurfaceMode>>
  allowExactAmountByDefault: boolean
  allowExactTimeByDefault: boolean
}

export const SUBACTION_ATOM_RULES: Record<QuestionType, SubActionAtomRule> = {
  fact_pursuit: {
    primaryTags: ['act', 'timeline', 'rule'],
    secondaryTags: ['evidence', 'responsibility', 'threshold'],
    avoidTags: ['emotion', 'fear', 'shame'],
    coreAtomCount: 2,
    preferredSlotModes: { amount: 'neutral', time: 'neutral', person: 'judgeRef', relation: 'judgeRef' },
    allowExactAmountByDefault: false,
    allowExactTimeByDefault: false,
  },
  motive_search: {
    primaryTags: ['motive', 'self_justification', 'responsibility'],
    secondaryTags: ['act', 'fear', 'shame', 'harm'],
    avoidTags: ['timeline'],
    coreAtomCount: 2,
    preferredSlotModes: { amount: 'neutral', time: 'neutral', person: 'judgeRef', relation: 'judgeRef' },
    allowExactAmountByDefault: false,
    allowExactTimeByDefault: false,
  },
  empathy_approach: {
    primaryTags: ['emotion', 'fear', 'shame', 'relationship', 'harm'],
    secondaryTags: ['motive', 'responsibility'],
    avoidTags: ['rule', 'timeline', 'counter'],
    coreAtomCount: 2,
    preferredSlotModes: { amount: 'neutral', time: 'neutral', person: 'judgeRef', relation: 'judgeRef' },
    allowExactAmountByDefault: false,
    allowExactTimeByDefault: false,
  },
  evidence_present: {
    primaryTags: ['evidence', 'context', 'identity', 'quote'],
    secondaryTags: ['act', 'timeline', 'rule', 'privacy'],
    avoidTags: ['emotion'],
    coreAtomCount: 2,
    preferredSlotModes: { amount: 'exact', time: 'dateExact', evidence: 'fullName', message: 'quoteShort' },
    allowExactAmountByDefault: true,
    allowExactTimeByDefault: true,
  },
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Slot Selection (턴별 결과)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface SlotSelection {
  atomId: ClaimAtomId
  family: SlotFamily
  mode: SlotSurfaceMode
  value: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Atom Plan (blueprint 직전 단계)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface AtomSelection {
  atomId: ClaimAtomId
  score: number
  selectedTags: ClaimAtomTag[]
}

export interface BlueprintAtomPlan {
  answerFocus: QuestionType
  selectedAtoms: AtomSelection[]
  forbiddenAtomIds: ClaimAtomId[]
  slotSelections: SlotSelection[]
}
