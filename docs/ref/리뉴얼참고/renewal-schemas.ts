/**
 * Solomon 리뉴얼 핵심 스키마 정의
 * ─────────────────────────────────
 * 기존 84개 사건 데이터(캐릭터/쟁점/증거/truthTable)는 유지하고,
 * 아래 5개 레이어를 **덧씌워** 엔진 구조를 전환한다.
 *
 * 작성: Claude Code (2026-04-01)
 * 용도: GPT에게 데이터 생성 요청 시 참조 스키마
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. ResponseBlueprint — 룰 엔진이 LLM에게 내리는 발화 지시서
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 엔진이 매 턴 생성. LLM은 이 blueprint를 받아 연기만 한다.
// → GPT가 생성할 필요 없음. 엔진 코드에서 런타임 생성.

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
  | 'authenticity_attack'  // "조작된 겁니다"
  | 'counterattack'        // "상대가 더 문제입니다"
  | 'silence'              // 묵비/회피
  | 'concession'           // 양보/인정

export interface ResponseBlueprint {
  /** 이번 턴에 집중할 쟁점 */
  focusDisputeId: string
  /** 발화 태도 */
  stance: Stance
  /** 방어 방식 (stance의 구체적 실행 모드) */
  defenseMode: DefenseMode
  /** 이번 턴에 말해도 되는 주장 원자 (publicClaim에서 선택) */
  allowedClaimAtoms: string[]
  /** 절대 말하면 안 되는 사실 원자 */
  forbiddenClaimAtoms: string[]
  /** 이번 턴에 반드시 발현할 verbalTell (없으면 자유) */
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
// 기존 truthPolicy(allowed/forbidden ID)를 대체.
// GPT가 사건별 × 당사자별 × 쟁점별 × 상태별로 생성해야 함.

export interface ClaimPolicy {
  disputeId: string
  state: 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5'

  /**
   * 지금 법정에서 공개적으로 주장하는 것.
   * 한국어 자연문 배열. LLM이 이 범위 안에서만 발언.
   * 예: ["송금 사실만으로 부정한 의도를 단정할 수 없다"]
   */
  publicClaim: string[]

  /**
   * NPC가 실제로 알고 있는 진실.
   * LLM에게 항상 제공 — "알면서 숨기는 연기"의 재료.
   * 예: ["280만원은 간병 예약금이다"]
   */
  privateKnowledge: string[]

  /**
   * 이 상태에서 절대 꺼내지 않을 사실.
   * forbiddenClaimAtoms 생성의 원천. bannedLexemes로도 변환.
   * 예: ["간병 예약금", "사전 상의 약속 위반"]
   */
  suppressions: string[]

  /**
   * 감정적 실수로 누설될 위험도.
   * emotionEngine의 slipChance 계산에 활용.
   */
  emotionalLeakRisk: 'none' | 'low' | 'mid' | 'high'

  /**
   * 이 상태에서 발현 가능한 verbalTell ID 목록.
   * ResponseBlueprint의 mustUseTell 후보군.
   */
  tellPool: string[]
}

/**
 * 사건 단위 ClaimPolicy 래퍼.
 * 기존 TRUTH_POLICIES 구조와 대응:
 * caseId → partyId → disputeId → state → ClaimPolicy
 */
export type CaseClaimPolicies = Record<
  string,  // caseId (e.g., "spouse-01")
  Record<
    'a' | 'b',  // partyId
    Record<
      string,  // disputeId (e.g., "d-1")
      Record<'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5', ClaimPolicy>
    >
  >
>

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. RuntimeStartBridge — Phase 1~2 → Phase 3 상태 연결
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Phase 1~2 스크립트에서 이미 인정/언급된 사실을 반영하여
// Phase 3 시작 시 lieState를 자연스럽게 설정.
// GPT가 Phase 1 스크립트를 분석하여 사건별로 생성.

export interface RuntimeStartBridge {
  caseId: string
  disputeId: string

  /**
   * Phase 3 시작 시의 거짓말 상태.
   * Phase 1에서 이미 인정한 쟁점은 S0이 아닌 S1~S2로 시작.
   * 예: spouse-01의 d-1은 송금 사실을 인정했으므로 S2.
   */
  phase3StartState: 'S0' | 'S1' | 'S2' | 'S3'

  /**
   * Phase 1~2에서 이미 공개적으로 인정한 사실.
   * 이걸 Phase 3에서 다시 부정하면 모순 → LLM에게 전달하여 방지.
   */
  alreadyPubliclyAdmitted: string[]

  /**
   * 플레이어가 Phase 1~2에서 알게 된 핵심 정보.
   * 재판관 질문 생성 시 "이미 아는 것"으로 참조.
   */
  playerKnownHooks: string[]

  /**
   * Phase 1~2에서 자주 드러난 tell 편향.
   * Phase 3 초반 tell 선택에 가중치 부여.
   */
  carryOverTellBias?: string[]
}

/**
 * 사건 단위 브리지.
 * 각 사건의 모든 dispute × 양측 당사자에 대해 정의.
 */
export interface CaseBridge {
  caseId: string
  bridges: {
    party: 'a' | 'b'
    entries: RuntimeStartBridge[]
  }[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. EvidenceChallenge — 증거 방어선 붕괴 메커닉
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 기존 EvidenceNode를 확장. 각 증거가 어떤 방어를 공격하고,
// 어떤 조사 결과가 어떤 방어를 봉쇄하는지 명시.
// GPT가 사건별 증거 데이터를 분석하여 생성.

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

  /** 이 증거가 관련된 쟁점들 */
  disputeIds: string[]

  /**
   * 이 증거로 공격할 수 있는 벡터들.
   * 증거를 처음 제시했을 때, NPC가 이 벡터들 중 하나로 방어 가능.
   * 예: 잘린 캡처본 → ['context', 'legality']
   */
  attackVectors: AttackVector[]

  /**
   * 조사 액션별 봉쇄하는 방어 벡터.
   * 조사 완료 시 해당 벡터로의 방어가 불가능해짐.
   * 예: restore_context → 'context' 방어 봉쇄
   */
  resolvedBy: Partial<Record<InvestigationAction, AttackVector[]>>

  /**
   * 모든 attackVector가 봉쇄되었을 때의 강제 효과.
   * 더 이상 방어할 수 없으므로 concession/silence 강제 또는 lie state 강제 진행.
   */
  whenAllResolved: {
    /** NPC의 defenseMode를 강제로 전환 */
    forceDefenseMode?: 'concession' | 'silence'
    /** 최소 lie state 진행 단계 수 */
    minLieAdvance?: 1 | 2
  }

  /**
   * 이 증거가 봉쇄하는 NPC 주장.
   * 조사 결과에 따라 NPC가 더 이상 할 수 없는 주장 목록.
   * ResponseBlueprint의 forbiddenClaimAtoms에 합산.
   */
  blockedClaims?: string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. ExecutableVerbalTell — 검증 가능한 말버릇 규칙
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 기존 VerbalTell(설명문)을 대체.
// 런타임에서 post-process가 검증/강제할 수 있는 구조.
// GPT가 기존 tell 설명문을 분석하여 변환.

export interface ExecutableVerbalTell {
  /** 고유 ID (기존 type 필드와 동일) */
  id: string

  /** 이 tell이 발현되는 상황 */
  appliesWhen: Array<'lying' | 'cornered' | 'emotional' | 'avoiding' | 'shame' | 'hurt' | 'defensive'>

  /**
   * 텍스트에 포함되어야 하는 어휘 훅.
   * post-process에서 이 단어 중 최소 1개가 있는지 검증.
   * 예: ["기준으로", "정확히", "딱", "시 분"]
   */
  lexicalHooks: string[]

  /**
   * 문장 구조 규칙.
   * - 'number_first': 숫자/금액/시각으로 시작
   * - 'question_end': 의문형으로 끝남
   * - 'enumeration': 나열형 (A, B, C를 ~)
   * - 'echo_repeat': 상대 말 되풀이
   * - 'conditional': 조건문 ("만약 ~라면")
   * - 'self_reference': 자기 경험 언급 ("제가 ~했을 때")
   */
  sentenceShape?: 'number_first' | 'question_end' | 'enumeration' | 'echo_repeat' | 'conditional' | 'self_reference'

  /**
   * 발현 빈도 제한.
   * - 'every_turn': 매 턴 (강한 tell)
   * - 'once_every_2_turns': 2턴에 1회
   * - 'max_once_per_turn': 최대 1회 (되묻기 등)
   * - 'on_trigger_only': mustUseTell일 때만
   */
  cadence: 'every_turn' | 'once_every_2_turns' | 'max_once_per_turn' | 'on_trigger_only'

  /**
   * (선택) 세부 수치 정밀도.
   * over_precision 같은 tell에서 사용.
   */
  numericGranularity?: 'exact_amount_or_minute' | 'round_number' | 'percentage'

  /**
   * (선택) 되묻기 tell에서: 두 번째 문장이 필수인지.
   */
  requiresSecondSentence?: boolean

  /**
   * 원본 설명문 (참고용, 런타임에서는 미사용).
   * 기존 VerbalTell.pattern 값을 보존.
   */
  originalPattern: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. Beat Script — 핵심 대사 사전 생성 (Phase C)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 각 사건 × 핵심 쟁점 × 상태별 핵심 대사.
// 런타임에서 LLM이 실패하거나, 클라이맥스 턴에서 사용.
// Phase C에서 GPT가 생성. 우선 파일럿 2사건만.

export type BeatType = 'deny' | 'hedge' | 'partial' | 'blame' | 'confession' | 'evidence_hit'

export interface BeatScript {
  caseId: string
  party: 'a' | 'b'
  disputeId: string
  beatType: BeatType

  /** 핵심 대사 (1~3문장, 캐릭터 목소리 반영) */
  line: string

  /** 행동 힌트 (연출용) */
  behaviorHint: string

  /** 이 beat가 적용되는 lie state 범위 */
  applicableStates: Array<'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5'>

  /** (선택) 특정 증거 제시 후에만 사용 */
  afterEvidence?: string
}
