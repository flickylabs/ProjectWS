/**
 * Solomon 리뉴얼 핵심 타입 정의
 * ─────────────────────────────────
 * 기존 타입(agent.ts, case.ts, character.ts)과 병행.
 * 엔진이 의미를 결정하고 LLM은 연기만 하는 구조의 기반.
 */

import type { LieState } from './agent'
import type { PartyId } from './game'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. ResponseBlueprint — 룰 엔진이 LLM에게 내리는 발화 지시서
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type Stance =
  | 'deny'        // 완전 부정
  | 'hedge'       // 얼버무리기
  | 'partial'     // 부분 인정
  | 'blame'       // 전가/반격
  | 'emotional'   // 감정 호소
  | 'confess'     // 고백/시인

export type DefenseMode =
  | 'flat_denial'          // "그런 적 없습니다"
  | 'context_attack'       // "맥락이 잘렸잖아요"
  | 'legality_attack'      // "불법으로 얻은 거 아닙니까"
  | 'authenticity_attack'  // "조작된 겁니다" (identity 포함)
  | 'counterattack'        // "상대가 더 문제입니다"
  | 'silence'              // 묵비/회피
  | 'concession'           // 양보/인정

export interface ResponseBlueprint {
  /** 이번 턴에 집중할 쟁점 */
  focusDisputeId: string
  /** 발화 태도 */
  stance: Stance
  /** 방어 방식 */
  defenseMode: DefenseMode
  /** 이번 턴에 말해도 되는 주장 원자 */
  allowedClaimAtoms: string[]
  /** 절대 말하면 안 되는 사실 원자 */
  forbiddenClaimAtoms: string[]
  /** 이번 턴에 반드시 발현할 verbalTell */
  mustUseTell?: string
  /** 응답에 포함하면 안 되는 단어/표현 */
  bannedLexemes?: string[]
  /** 목표 문장 수 */
  sentenceCount: 1 | 2 | 3
  /** 되묻기 여부 */
  shouldCounterQuestion: boolean
  /** 감정 힌트 (행동 묘사용) */
  emotionHint?: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. ClaimPolicy — NPC가 "알고 있되 숨기는" 구조
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ClaimPolicy {
  disputeId: string
  state: LieState
  /** 지금 법정에서 공개적으로 주장하는 것 */
  publicClaim: string[]
  /** NPC가 실제로 알고 있는 진실 — LLM에게 항상 제공 */
  privateKnowledge: string[]
  /** 이 상태에서 절대 꺼내지 않을 사실 */
  suppressions: string[]
  /** 감정적 실수로 누설될 위험도 */
  emotionalLeakRisk: 'none' | 'low' | 'mid' | 'high'
  /** 이 상태에서 발현 가능한 verbalTell ID 목록 */
  tellPool: string[]
}

/** caseId → partyId → disputeId → state → ClaimPolicy */
export type CaseClaimPolicies = Record<
  string,
  Record<'a' | 'b', Record<string, Record<LieState, ClaimPolicy>>>
>

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. RuntimeStartBridge — Phase 1~2 → Phase 3 상태 연결
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface RuntimeStartBridge {
  caseId: string
  disputeId: string
  /** Phase 3 시작 시의 거짓말 상태 */
  phase3StartState: 'S0' | 'S1' | 'S2' | 'S3'
  /** Phase 1~2에서 이미 공개적으로 인정한 사실 */
  alreadyPubliclyAdmitted: string[]
  /** 플레이어가 Phase 1~2에서 알게 된 핵심 정보 */
  playerKnownHooks: string[]
  /** Phase 1~2에서 자주 드러난 tell 편향 */
  carryOverTellBias?: string[]
}

export interface CaseBridge {
  caseId: string
  bridges: {
    party: PartyId
    entries: RuntimeStartBridge[]
  }[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. EvidenceChallenge — 증거 방어선 붕괴 메커닉
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type AttackVector = 'authenticity' | 'context' | 'legality' | 'identity'

export type InvestigationAction =
  | 'request_original'
  | 'restore_context'
  | 'verify_source'
  | 'question_acquisition'
  | 'check_edits'
  | 'check_metadata'

export interface EvidenceChallenge {
  evidenceId: string
  /** 관련 쟁점 */
  disputeIds: string[]
  /** 공격 가능한 벡터 */
  attackVectors: AttackVector[]
  /** 조사 액션별 봉쇄하는 방어 벡터 */
  resolvedBy: Partial<Record<InvestigationAction, AttackVector[]>>
  /** 모든 attackVector 봉쇄 시 강제 효과 */
  whenAllResolved: {
    forceDefenseMode?: 'concession' | 'silence'
    minLieAdvance?: 1 | 2
  }
  /** 봉쇄되는 NPC 주장 */
  blockedClaims?: string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. ExecutableVerbalTell — 검증 가능한 말버릇 규칙
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type TellTrigger = 'lying' | 'cornered' | 'emotional' | 'avoiding' | 'shame' | 'hurt' | 'defensive'

export type SentenceShape =
  | 'number_first'    // 숫자/금액/시각으로 시작
  | 'question_end'    // 의문형으로 끝남
  | 'enumeration'     // 나열형
  | 'echo_repeat'     // 상대 말 되풀이
  | 'conditional'     // 조건문
  | 'self_reference'  // 자기 경험 언급

export type TellCadence =
  | 'every_turn'
  | 'once_every_2_turns'
  | 'max_once_per_turn'
  | 'on_trigger_only'

export interface ExecutableVerbalTell {
  id: string
  appliesWhen: TellTrigger[]
  /** 텍스트에 포함되어야 하는 어휘 훅 */
  lexicalHooks: string[]
  /** 문장 구조 규칙 */
  sentenceShape?: SentenceShape
  /** 발현 빈도 제한 */
  cadence: TellCadence
  /** 세부 수치 정밀도 */
  numericGranularity?: 'exact_amount_or_minute' | 'round_number' | 'percentage'
  /** 되묻기 tell: 두 번째 문장 필수 여부 */
  requiresSecondSentence?: boolean
  /** 원본 설명문 (참고용) */
  originalPattern: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. BeatScript — 핵심 대사 사전 생성
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type BeatType = 'deny' | 'hedge' | 'partial' | 'blame' | 'emotional' | 'confession' | 'evidence_hit'

/** Truth Throttle 수준 — 대사 내 진실 노출 정도 */
export type TruthLevel = 'none' | 'hint' | 'partial' | 'full'

export interface BeatScript {
  caseId: string
  party: PartyId
  disputeId: string
  beatType: BeatType
  /** 핵심 대사 (1~3문장, 캐릭터 목소리 반영) */
  line: string
  /** 행동 힌트 (연출용) */
  behaviorHint: string
  /** 적용되는 lie state 범위 */
  applicableStates: LieState[]
  /** 특정 증거 제시 후에만 사용 */
  afterEvidence?: string
}

/** V3 확장 BeatScript — LLM 100% 대체용 */
export interface BeatScriptV3 extends BeatScript {
  /** 이 대사가 대응하는 질문 유형 (미지정 시 모든 질문에 범용) */
  questionType?: QuestionType
  /** 이 대사가 대응하는 증거 조사 단계 번호 (investigationStages 연계) */
  afterInvestigationStage?: number
  /** 같은 조건에서의 대체 대사 (반복 방지, 최소 2개 권장) */
  alternatives?: string[]
  /** 진실 노출 수준 — Truth Throttle 검증용 */
  truthLevel: TruthLevel
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. 성과 조건 (Readiness / Verdict Eligibility)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type VerdictMode = 'normal' | 'forced_incomplete'

export interface ReadinessState {
  crackedDisputeCount: number      // S2+ 쟁점 수
  resolvedDisputeCount: number     // S4+ 또는 Discovery resolved 쟁점 수
  investigationSuccessCount: number // attackVector 봉쇄 성공 횟수
  fullCollapseCount: number        // EvidenceChallenge 완전 봉쇄 횟수
  hiddenDisputeRevealCount: number // 숨겨진 쟁점 발현 횟수
  confessionCount: number          // S5 고백 횟수
  readinessScore: number           // 가중 점수
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. EmotionTier — Blueprint 매트릭스용 감정 단계
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type EmotionTier = 'calm' | 'agitated' | 'explosive' | 'shutdown'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. Blueprint 생성 입력 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type QuestionType = 'fact_pursuit' | 'motive_search' | 'empathy_approach' | 'evidence_present'

export interface BlueprintInput {
  lieState: LieState
  emotionTier: EmotionTier
  /** 봉쇄된 방어 벡터 수 (0~4) */
  evidenceBlockedVectors: number
  /** 아직 사용 가능한 방어 벡터 목록 */
  availableAttackVectors: AttackVector[]
  questionType: QuestionType
  trustTowardJudge: number
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. DossierCard — 증거 묶음 플레이 카드
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface DossierChallengeQuestion {
  id: string
  text: string
  /** 스포일러 없는 힌트 텍스트 (잠겨 있을 때 표시) */
  lockedHint?: string
  attackVector: AttackVector
  /** 이 질문이 공개되려면 대상 파티의 관련 dispute lieState가 이 값 이상이어야 함 */
  requiredLieState?: 'S0' | 'S1' | 'S2' | 'S3' | 'S4'
  onSuccess: {
    blockVector: AttackVector
    revealAtom?: string
    lieAdvance?: boolean
  }
  /** V3: 카드 질문에 대한 NPC 스크립트 응답 (LLM 대체용) */
  scriptedResponse?: {
    npcResponse: string
    behaviorHint: string
    truthLevel: TruthLevel
  }
}

export interface DossierChallenge {
  targetParty: PartyId
  questions: DossierChallengeQuestion[]
}

export interface DossierCard {
  id: string
  name: string
  description: string
  evidenceIds: string[]
  relatedDisputes: string[]
  subjectParty: 'a' | 'b' | 'both'
  challenges: DossierChallenge[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. StateUnlockAtom — state 진입 시 해금되는 원자
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface StateUnlockAtom {
  id: string
  factText: string
  tags: string[]
  unlockedAtState: LieState
  slots: Record<string, Record<string, string>>
  stanceHints: Stance[]
}

/** party → disputeId → state → atoms */
export type StateUnlockAtomMap = Record<
  'a' | 'b',
  Record<string, Partial<Record<LieState, StateUnlockAtom[]>>>
>

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12. EventText — 게임 이벤트 사전 작성 텍스트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ContradictionEvent {
  id: string
  statementA: string
  statementB: string
  options: {
    point_out: { label: string; effect: string }
    let_go: { label: string; effect: string }
  }
  npcReaction: string
}

export interface InterjectionEvent {
  id: string
  interruptor: PartyId
  interjectionLine: string
  options: {
    allow: { label: string; effect: string }
    block: { label: string; effect: string }
  }
}

export interface EmotionalOutburstEvent {
  id: string
  party: PartyId
  outburstLine: string
  options: {
    press: { label: string; effect: string }
    calm: { label: string; effect: string }
  }
}

export interface GameEventTexts {
  contradictions: ContradictionEvent[]
  interjections: InterjectionEvent[]
  emotionalOutbursts: EmotionalOutburstEvent[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 13. TransitionBeat — 전이 앵커 (강제 삽입 대사)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface TransitionBeat {
  id: string
  caseId: string
  party: PartyId
  disputeId: string
  fromState: LieState
  toState: LieState
  primaryBeatType: BeatType
  secondaryBeatType?: BeatType
  line: string
  behaviorHint: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 14. V3 Game Loop 통합 데이터
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface V3GameLoopData {
  caseId: string
  dossierCards: DossierCard[]
  stateUnlockAtoms: StateUnlockAtomMap
  events: GameEventTexts
  transitionBeats: TransitionBeat[]
}
