/**
 * ClaimPolicyV2 / ResponseBlueprint 입력 스키마 초안
 * ---------------------------------------------------
 * 목적:
 * - publicClaim의 "완성된 한국어 문장" 문제를 제거한다.
 * - 의미(ClaimAtom)와 표현(slot/tell/archetype)을 분리한다.
 * - 기존 ClaimPolicy / ResponseBlueprint와 하위 호환 경로를 유지한다.
 *
 * 사용 원칙:
 * 1) claimAtoms가 있으면 prompt에는 publicClaim 문자열을 절대 넣지 않는다.
 * 2) allowedClaimAtoms / forbiddenClaimAtoms는 "문장"이 아니라 ClaimAtom.id[] 로 취급한다.
 * 3) slotSelections가 이번 턴 surface를 결정한다.
 * 4) publicClaim은 legacy fallback / board summary 용도로만 남긴다.
 */

// 기존 스키마 import 가 가능하면 재사용하고, 아니면 아래 타입을 그대로 복사해도 됨.
import type {
  AttackVector,
  DefenseMode,
  ResponseBlueprint as LegacyResponseBlueprint,
  ClaimPolicy as LegacyClaimPolicy,
  Stance,
} from './renewal-schemas'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 0. 공통 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type LieState = 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5'

export type EmotionalLeakRisk = 'none' | 'low' | 'mid' | 'high'

export type EmotionTier = 'calm' | 'agitated' | 'explosive' | 'shutdown'

export type SubAction =
  | 'fact_pursuit'
  | 'motive_search'
  | 'empathy_approach'
  | 'evidence_present'

export type QuestionAudience = 'judge' | 'opponent'

export type ResponseMode = 'answer_only' | 'answer_then_counter'

export type ClaimAtomId = string

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. ClaimAtom — 의미 단위 원자
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 주의:
// - factText는 "발화문"이 아니라 의미 라벨이다.
// - 예: "공동계좌 송금 사실 인정", "용도 설명 유보", "상대의 무단 열람 문제 제기"
// - "9월 20일 기준으로 말씀드리면" 같은 화법은 절대 넣지 않는다.

export type ClaimAtomTag =
  | 'act'                // 무엇을 했는지
  | 'timeline'           // 언제/어떤 순서로
  | 'motive'             // 왜 그랬는지
  | 'emotion'            // 어떤 심정이었는지
  | 'rule'               // 약속/절차/원칙
  | 'evidence'           // 증거와 직접 연결되는 주장
  | 'context'            // 잘린 맥락/배경 설명
  | 'identity'           // 사람/기관/관계의 정체
  | 'responsibility'     // 책임 범위/과실 배분
  | 'relationship'       // 관계 감정/호칭 맥락
  | 'counter'            // 역공/되묻기용
  | 'self_justification' // 자기 합리화
  | 'harm'               // 피해/부담/결과
  | 'fear'               // 두려움
  | 'shame'              // 수치심
  | 'privacy'            // 사생활/취득 경위
  | 'admission'          // 이미 인정된 사실
  | 'denial'             // 부정의 대상
  | 'uncertainty'        // 기억 흐림/범위 유보
  | 'quote'              // 메시지/발화 인용
  | 'threshold'          // 100만원 이상, 50만원 이상 등 기준선
  | 'beneficiary'        // 돈/행위의 실제 대상
  | 'location'           // 장소 관련
  | 'institution'        // 기관/센터/병원 등
  | 'legacy_sentence'    // v1 fallback 합성 atom

export interface AmountSlot {
  exact?: string            // "2,800,000원"
  rounded?: string          // "280만원"
  neutral: string           // "해당 금액" | "그 돈"
  thresholdExact?: string   // "100만원 이상"
  thresholdNeutral?: string // "기준 금액"
}

export interface TimeSlot {
  dateExact?: string        // "9월 20일"
  timeExact?: string        // "오후 2시 03분"
  dateTimeExact?: string    // "9월 20일 오후 2시 03분"
  period?: string           // "추석 연휴 직전"
  neutral: string           // "그날" | "그 시점"
}

export interface PersonSlot {
  fullName?: string         // "최민정"
  judgeRef?: string         // "제 남편" | "제 누나" | "제 동생"
  directRef?: string        // "자기" | "누나" | "도현아"
  angryRef?: string         // "한지석 씨" | "도현!"
  role?: string             // "상담팀장" | "제3자"
  neutral?: string          // "그 사람"
}

export interface RelationSlot {
  judgeRef?: string         // "제 아내" | "제 남편" | "제 누나"
  directRef?: string        // "자기" | "누나" | "도현아"
  neutral: string           // "상대" | "그쪽"
}

export interface PlaceSlot {
  exact?: string            // "상담동 후문"
  category?: string         // "센터 쪽" | "그 골목"
  neutral: string           // "그곳"
}

export interface EvidenceSlot {
  fullName?: string         // "재가돌봄센터 간병 예약 확인서"
  shortName?: string        // "예약서"
  neutral: string           // "그 자료" | "그 증거"
}

export interface MessageSlot {
  quoteExact?: string       // "조용한 데서 보죠"
  quoteShort?: string       // "그 문장"
  neutral: string           // "그 대화" | "그 표현"
}

export interface RuleSlot {
  exact?: string            // "100만원 이상은 반드시 상의"
  shortName?: string        // "사전 상의 약속"
  neutral: string           // "그 약속" | "그 기준"
}

export interface ActionSlot {
  exact?: string            // "공동계좌 송금" | "새벽 열람"
  neutral: string           // "그 일" | "그 선택"
}

export interface ClaimAtomSlots {
  amount?: AmountSlot
  time?: TimeSlot
  person?: PersonSlot
  relation?: RelationSlot
  place?: PlaceSlot
  evidence?: EvidenceSlot
  message?: MessageSlot
  rule?: RuleSlot
  action?: ActionSlot
  beneficiary?: PersonSlot
}

export type SlotPath =
  | 'amount.exact'
  | 'amount.rounded'
  | 'amount.neutral'
  | 'amount.thresholdExact'
  | 'amount.thresholdNeutral'
  | 'time.dateExact'
  | 'time.timeExact'
  | 'time.dateTimeExact'
  | 'time.period'
  | 'time.neutral'
  | 'person.fullName'
  | 'person.judgeRef'
  | 'person.directRef'
  | 'person.angryRef'
  | 'person.role'
  | 'person.neutral'
  | 'relation.judgeRef'
  | 'relation.directRef'
  | 'relation.neutral'
  | 'place.exact'
  | 'place.category'
  | 'place.neutral'
  | 'evidence.fullName'
  | 'evidence.shortName'
  | 'evidence.neutral'
  | 'message.quoteExact'
  | 'message.quoteShort'
  | 'message.neutral'
  | 'rule.exact'
  | 'rule.shortName'
  | 'rule.neutral'
  | 'action.exact'
  | 'action.neutral'
  | 'beneficiary.fullName'
  | 'beneficiary.judgeRef'
  | 'beneficiary.directRef'
  | 'beneficiary.angryRef'
  | 'beneficiary.role'
  | 'beneficiary.neutral'

export interface ClaimAtom {
  /** 정책 내부 고유 ID. allowedClaimAtoms 에서는 이 ID를 사용한다. */
  id: ClaimAtomId

  /** 한국어 의미 라벨. 완성된 대사문 금지. */
  factText: string

  /** answerFocus / subAction 선택의 주 기준 */
  tags: ClaimAtomTag[]

  /** 이번 원자가 surface에서 참조할 수 있는 slot 후보 */
  slots?: ClaimAtomSlots

  /** 특정 stance에서 특히 잘 맞는 atom이면 힌트로 사용 */
  stanceHints?: Stance[]

  /** 특정 subAction 에서만 열리도록 좁히고 싶을 때 사용 */
  usableInSubActions?: SubAction[]

  /** 특정 evidence 제시 이후에만 개방되는 atom */
  requiresEvidenceIds?: string[]

  /** 최근 turn에서 반복되면 페널티를 크게 줄 atom */
  repeatPenalty?: number

  /** admission floor에 의해 재부정 금지되는 atom인지 */
  isAdmissionSafe?: boolean

  /** legacy publicClaim에서 합성된 atom 여부 */
  source?: 'v2' | 'legacy_publicClaim'
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. ClaimPolicyV2
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ClaimPolicyV2 extends Omit<LegacyClaimPolicy, 'publicClaim'> {
  /**
   * V2 핵심 데이터. prompt에는 이 atom만 주입한다.
   * claimAtoms가 존재하면 publicClaim 문자열은 prompt에 넣지 않는다.
   */
  claimAtoms: ClaimAtom[]

  /**
   * 하위 호환용.
   * - 기존 Board 요약이나 구 경로 fallback 용도로만 유지.
   * - claimAtoms가 있을 때 V2 prompt에는 절대 넣지 않는다.
   */
  publicClaim?: string[]

  /**
   * 하위 호환용 별칭이 필요하면 publicClaim 대신 이 필드 사용 가능.
   * migration 중 혼동을 줄이려면 이 필드를 권장.
   */
  fallbackPublicClaim?: string[]

  /** schema 구분 */
  schemaVersion: 'v2'
}

export type AnyClaimPolicy = LegacyClaimPolicy | ClaimPolicyV2

export interface NormalizedClaimPolicyV2 {
  disputeId: string
  state: LieState
  claimAtoms: ClaimAtom[]
  privateKnowledge: string[]
  suppressions: string[]
  emotionalLeakRisk: EmotionalLeakRisk
  tellPool: string[]
  compatMode: 'v2' | 'legacy'
  legacyPublicClaim?: string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. slot surface 선택 규칙
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type SlotSurfaceMode =
  | 'exact'
  | 'rounded'
  | 'neutral'
  | 'thresholdExact'
  | 'thresholdNeutral'
  | 'dateExact'
  | 'timeExact'
  | 'dateTimeExact'
  | 'period'
  | 'judgeRef'
  | 'directRef'
  | 'angryRef'
  | 'role'
  | 'fullName'
  | 'category'
  | 'shortName'
  | 'quoteExact'
  | 'quoteShort'

export type SlotFamily =
  | 'amount'
  | 'time'
  | 'person'
  | 'relation'
  | 'place'
  | 'evidence'
  | 'message'
  | 'rule'
  | 'action'
  | 'beneficiary'

export interface SlotSelectionRule {
  family: SlotFamily
  defaultMode: SlotSurfaceMode
  /** tell/archetype/evidence 상황에서 더 강한 mode로 승격 */
  promoteWhen?: {
    mustUseTellIds?: string[]
    subActions?: SubAction[]
    audience?: QuestionAudience[]
  }
  /** 반복 억제, 호칭 안정화 등을 위해 약한 mode로 강등 */
  suppressWhen?: {
    mustNotUseTellIds?: string[]
    subActions?: SubAction[]
    audience?: QuestionAudience[]
    responseMode?: ResponseMode[]
  }
}

export const DEFAULT_SLOT_SELECTION_RULES: SlotSelectionRule[] = [
  {
    family: 'amount',
    defaultMode: 'neutral',
    promoteWhen: {
      mustUseTellIds: ['over_precision', 'receipt_stack'],
      subActions: ['evidence_present'],
    },
  },
  {
    family: 'time',
    defaultMode: 'neutral',
    promoteWhen: {
      mustUseTellIds: ['over_precision', 'receipt_stack'],
      subActions: ['evidence_present', 'fact_pursuit'],
    },
  },
  {
    family: 'person',
    defaultMode: 'judgeRef',
    suppressWhen: {
      audience: ['judge'],
      responseMode: ['answer_only'],
    },
  },
  {
    family: 'relation',
    defaultMode: 'judgeRef',
    suppressWhen: {
      audience: ['judge'],
      responseMode: ['answer_only'],
    },
  },
  {
    family: 'message',
    defaultMode: 'neutral',
    promoteWhen: {
      subActions: ['evidence_present'],
    },
  },
  {
    family: 'evidence',
    defaultMode: 'shortName',
    promoteWhen: {
      subActions: ['evidence_present'],
    },
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. subAction → atom 선택 규칙
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface SubActionAtomRule {
  primaryTags: ClaimAtomTag[]
  secondaryTags: ClaimAtomTag[]
  avoidTags?: ClaimAtomTag[]

  /** 턴당 우선 뽑을 핵심 atom 수 */
  coreAtomCount: 1 | 2

  /** 해당 subAction에서 기본 slot surface 선호 */
  preferredSlotModes: Partial<Record<SlotFamily, SlotSurfaceMode>>

  /** exact 숫자/시각 노출을 기본 허용할지 */
  allowExactAmountByDefault: boolean
  allowExactTimeByDefault: boolean
}

export const SUBACTION_ATOM_RULES: Record<SubAction, SubActionAtomRule> = {
  fact_pursuit: {
    primaryTags: ['act', 'timeline', 'rule'],
    secondaryTags: ['evidence', 'responsibility', 'threshold'],
    avoidTags: ['emotion', 'fear', 'shame'],
    coreAtomCount: 2,
    preferredSlotModes: {
      amount: 'neutral',
      time: 'neutral',
      person: 'judgeRef',
      relation: 'judgeRef',
      message: 'neutral',
    },
    allowExactAmountByDefault: false,
    allowExactTimeByDefault: false,
  },

  motive_search: {
    primaryTags: ['motive', 'self_justification', 'responsibility'],
    secondaryTags: ['act', 'fear', 'shame', 'harm'],
    avoidTags: ['timeline'],
    coreAtomCount: 2,
    preferredSlotModes: {
      amount: 'neutral',
      time: 'neutral',
      person: 'judgeRef',
      relation: 'judgeRef',
      message: 'neutral',
    },
    allowExactAmountByDefault: false,
    allowExactTimeByDefault: false,
  },

  empathy_approach: {
    primaryTags: ['emotion', 'fear', 'shame', 'relationship', 'harm'],
    secondaryTags: ['motive', 'responsibility'],
    avoidTags: ['rule', 'timeline', 'counter'],
    coreAtomCount: 2,
    preferredSlotModes: {
      amount: 'neutral',
      time: 'neutral',
      person: 'judgeRef',
      relation: 'judgeRef',
      message: 'neutral',
    },
    allowExactAmountByDefault: false,
    allowExactTimeByDefault: false,
  },

  evidence_present: {
    primaryTags: ['evidence', 'context', 'identity', 'quote'],
    secondaryTags: ['act', 'timeline', 'rule', 'privacy'],
    avoidTags: ['emotion'],
    coreAtomCount: 2,
    preferredSlotModes: {
      amount: 'exact',
      time: 'dateExact',
      person: 'judgeRef',
      relation: 'judgeRef',
      evidence: 'fullName',
      message: 'quoteShort',
    },
    allowExactAmountByDefault: true,
    allowExactTimeByDefault: true,
  },
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. ResponseBlueprint 생성 입력
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 기존 ResponseBlueprint는 "결과물"이다.
// 아래 타입은 엔진이 atom을 선택하기 전에 필요한 입력 컨텍스트다.

export interface ResponseBlueprintBuildInputV2 {
  caseId: string
  party: 'a' | 'b'
  focusDisputeId: string

  // 상태 입력
  lieState: LieState
  stance: Stance
  defenseMode: DefenseMode
  emotionTier: EmotionTier
  trustTowardJudge: number
  availableAttackVectors: AttackVector[]

  // 질문 입력
  subAction: SubAction
  audience: QuestionAudience
  responseMode: ResponseMode
  evidenceId?: string

  // 데이터
  claimPolicy: NormalizedClaimPolicyV2

  // bridge / admission floor
  alreadyPubliclyAdmittedAtomIds?: ClaimAtomId[]

  // evidence/appraisal 반영
  blockedClaimAtomIds?: ClaimAtomId[]

  // 반복 방지
  recentlyUsedAtomIds?: ClaimAtomId[]
  recentlyUsedSlotPaths?: SlotPath[]
  recentlyUsedOpeners?: string[]

  // tell 연동
  mustUseTell?: string

  // 호칭/관계 안정화
  relationOverrides?: Partial<Record<SlotPath, string>>
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. atom selection 결과물 (ResponseBlueprint 직전 단계)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface AtomSelection {
  atomId: ClaimAtomId
  score: number
  selectedTags: ClaimAtomTag[]
}

export interface SlotSelection {
  atomId: ClaimAtomId
  slotPath: SlotPath
  value: string
}

export interface BlueprintAtomPlan {
  answerFocus: SubAction
  selectedAtoms: AtomSelection[]
  forbiddenAtomIds: ClaimAtomId[]
  slotSelections: SlotSelection[]
}

/**
 * 기존 ResponseBlueprint와의 최소 변경 버전.
 * 핵심 차이:
 * - allowedClaimAtoms / forbiddenClaimAtoms 는 이제 string 문장이 아니라 ClaimAtom.id[]
 * - slotSelections가 이번 턴의 표면화를 고정한다.
 */
export interface ResponseBlueprintV2
  extends Omit<LegacyResponseBlueprint, 'allowedClaimAtoms' | 'forbiddenClaimAtoms'> {
  allowedClaimAtoms: ClaimAtomId[]
  forbiddenClaimAtoms: ClaimAtomId[]
  answerFocus: SubAction
  slotSelections: SlotSelection[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. 하위 호환 전략
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface LegacyAtomSynthesisOptions {
  /** legacy publicClaim를 임시 atom으로 바꿀 때 태그를 추론할지 */
  enableRegexTagGuessing?: boolean
  /** legacy path에서는 exact 숫자를 중립화할지 */
  neutralizeNumbers?: boolean
}

/**
 * 하위 호환 규칙
 * 1) claimAtoms가 있으면 V2 path 사용
 * 2) claimAtoms가 없고 publicClaim만 있으면 legacy atom 합성
 * 3) legacy atom 합성 시 factText는 "문장"이 아니라 최대한 중립 의미 라벨로 바꾼다.
 * 4) 단, 이 경우도 quality guarantee는 낮으므로 compatMode='legacy'로 표시한다.
 */
export declare function normalizeClaimPolicyV2(
  policy: AnyClaimPolicy,
  options?: LegacyAtomSynthesisOptions,
): NormalizedClaimPolicyV2

/**
 * legacy publicClaim -> atom 합성 예시
 * - 입력: ["공동계좌에서 2,800,000원을 보낸 건 제가 맞습니다."]
 * - 출력:
 *   id: "legacy:d-1:0"
 *   factText: "송금 사실 인정"
 *   tags: ['act', 'admission', 'legacy_sentence']
 *   slots.amount.neutral = '해당 금액'
 *   slots.amount.exact = '2,800,000원'
 */
export declare function synthesizeLegacyAtoms(
  publicClaim: string[],
  options?: LegacyAtomSynthesisOptions,
): ClaimAtom[]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. 선택 알고리즘 시그니처
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 권장 점수 규칙
 * - primary tag: +100
 * - secondary tag: +40
 * - blocked / suppression / admission conflict: -INF
 * - recently used same atom: -60
 * - recently used same exact slot: -40
 * - evidence-linked atom and matching evidenceId: +35
 * - mustUseTell 없이 exact amount/time 사용 필요 atom: -25
 */
export declare function buildBlueprintAtomPlan(
  input: ResponseBlueprintBuildInputV2,
): BlueprintAtomPlan

/**
 * slot 선택 규칙
 * - fact_pursuit: amount/time는 기본 neutral. mustUseTell이 over_precision일 때만 exact 승격.
 * - motive_search: act는 유지하되 motive/self_justification atom을 먼저 고른다.
 * - empathy_approach: emotion/fear/shame atom 우선, amount/time exact는 기본 금지.
 * - evidence_present: evidence/context/identity atom 우선, message.shortQuote / evidence.fullName 허용.
 * - audience='judge' 이고 responseMode='answer_only' 면 person.directRef / angryRef 금지.
 */
export declare function resolveSlotSelections(
  input: ResponseBlueprintBuildInputV2,
  selectedAtomIds: ClaimAtomId[],
): SlotSelection[]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. 예시 atom
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const EXAMPLE_D1_TRANSFER_ACK: ClaimAtom = {
  id: 'd1.transfer_ack',
  factText: '공동계좌 송금 사실 인정',
  tags: ['act', 'admission'],
  slots: {
    amount: {
      exact: '2,800,000원',
      rounded: '280만원',
      neutral: '해당 금액',
    },
    time: {
      dateExact: '9월 20일',
      neutral: '그날',
    },
    action: {
      exact: '공동계좌 송금',
      neutral: '그 일',
    },
  },
  stanceHints: ['hedge', 'partial', 'confess'],
  repeatPenalty: 40,
  isAdmissionSafe: true,
  source: 'v2',
}

export const EXAMPLE_D1_PURPOSE_WITHHOLD: ClaimAtom = {
  id: 'd1.purpose_withhold',
  factText: '송금 용도 설명 유보',
  tags: ['motive', 'uncertainty', 'self_justification'],
  slots: {
    amount: {
      exact: '2,800,000원',
      rounded: '280만원',
      neutral: '그 돈',
    },
    action: {
      neutral: '그 송금',
    },
  },
  stanceHints: ['hedge', 'partial'],
  repeatPenalty: 60,
  source: 'v2',
}

export const EXAMPLE_D1_RELATION_REF: ClaimAtom = {
  id: 'd1.partner_reference',
  factText: '배우자 관점 언급',
  tags: ['relationship', 'counter'],
  slots: {
    relation: {
      judgeRef: '제 남편',
      directRef: '자기',
      neutral: '상대',
    },
  },
  stanceHints: ['blame', 'partial'],
  repeatPenalty: 20,
  source: 'v2',
}
