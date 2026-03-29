
# 솔로몬 GDD 분석 및 AI/시스템 재설계 제안

이 문서는 업로드된 GDD(`solomon-overview.html`, `solomon-mechanics.html`, `solomon-ai.html`, `solomon-generator.html`, `solomon-case.html`, `solomon-production.html`, `solomon-server.html`, `solomon-admin.html`)를 바탕으로 정리한 설계 보완안이다.

---

## 1. 현재 게임에 대한 압축 이해

솔로몬은 **두 AI 당사자를 심문해 사실·책임·해결책을 판결하는 생활형 갈등 심문 추리 게임**이다.

핵심 차별점은 아래 5개다.

1. **진실 3층 구조**
   - 실제 진실
   - 각자의 인지/오해
   - 법정에서의 발언

2. **3층 데이터 구조**
   - DuoSeed: 반복 등장 인물쌍
   - ContextSeed: 이번 판의 압박
   - CaseSeed: 이번 사건

3. **거짓말 엔진**
   - Lie Type x Lie Motive
   - dispute 단위 S0~S5 상태 머신
   - 압박 루트 / 신뢰 루트

4. **증거 4축**
   - 신뢰도 / 완전성 / 출처성 / 정당성

5. **판결 구조**
   - 사실 인정
   - 책임 배분
   - 해결책/중재안
   - 권위/통찰/지혜 평가

---

## 2. 가장 큰 구조적 문제

### 문제 1. 목표 설계와 현재 구현 설명이 다르다
GDD 목표는 `DuoSeed + ContextSeed + CaseSeed` 기반의 반절차/동적 사건 생성인데, 실제 구현 설명은 **84개 정적 JSON 사건 + Phase 1/2 스크립트 사전 생성 + Phase 3~5 런타임 LLM** 구조에 가깝다.

즉 지금 구조는 **절차적 사건 생성 게임의 외형을 가진, 큐레이션형 사건집**에 가깝다.

### 문제 2. 액션이 많지만 “액션 계약(Action Contract)”이 없다
심문/증거/스킬/증인/중재안이 모두 존재하지만,
- 어떤 액션이
- 어떤 상태를 바꾸고
- 어떤 정보만 공개 가능하며
- 어떤 답변 모드로 말해야 하는지

를 하나의 구조체로 고정하지 않았다.

그 결과 LLM이 액션 차이를 “프롬프트 문장 뉘앙스”만으로 추정한다.

### 문제 3. 현재 프롬프트는 “상태 전달”은 되지만 “발언 계획”이 약하다
현재 블록은 `knownFacts`, `disputeInfo`, `emotionInfo`, `evidenceInfo`, `recentDialogue`, `historyContext` 위주다.  
하지만 실제로 AI가 똑똑해 보이려면 매 턴 아래가 필요하다.

- 이번 턴의 **행동 목적**
- 이번 턴에서 **드러낼 수 있는 정보의 상한**
- 절대 말하면 안 되는 **금지 영역**
- 이 액션에서의 **답변 포맷**
- 상대가 끼어들 수 있는지 여부
- 답변이 **공개 발언인지 / 비공개 진술인지**
- 답변이 **사실 답변 / 의미 재프레이밍 / 감정 고백 / 법적 정당성 항변** 중 무엇인지

### 문제 4. 웹 어드민은 아직 “프롬프트 문자열 관리 UI”에 머물러 있다
실제로 필요한 것은 단순 텍스트 편집기가 아니라 다음이다.

- Agent 버전 관리
- Block 조합 미리보기
- Data Field 샘플 주입
- 액션/위상/스킬/증거 상태에 따른 Prompt Preview
- 응답 샘플 A/B 비교
- 세션 재현
- 실패 로그 회귀 테스트
- 버전 고정/카나리 배포

### 문제 5. 평가 루프가 없다
“AI가 똑똑해 보이는가”는 감성 평가로 끝나면 절대 안정화되지 않는다.  
액션별/Phase별/역할별 **golden eval set**이 반드시 있어야 한다.

---

## 3. 추천 목표 아키텍처

### 3-1. 콘텐츠 파이프라인과 세션 파이프라인을 분리

#### A. 콘텐츠 파이프라인 (오프라인/사전 생성)
- DuoSeed 생성/보정
- ContextSeed 풀 관리
- CaseSeed 생성
- 사건 검증
- 증거 의존성 그래프 검증
- 쟁점별 reveal ladder 생성
- witness fact budget 생성
- mediation option 생성

#### B. 세션 파이프라인 (런타임)
1. 플레이어 액션 입력
2. 액션 정규화(Action Contract 생성)
3. 룰 엔진 상태 전이 계산
4. 이번 턴 허용 정보/금지 정보 계산
5. Prompt Assembly
6. LLM 호출(구조화 출력)
7. 응답 검증/보정
8. 세션 이벤트 저장
9. Claim Graph / 점수 / UI 상태 갱신

---

## 4. 런타임에 꼭 추가해야 할 핵심 구조체

## 4-1. ActionContract
```ts
type ActionType =
  | "fact_pursuit"
  | "motive_search"
  | "empathy_approach"
  | "free_question"
  | "evidence_present"
  | "evidence_confront"
  | "evidence_subaction"
  | "objection"
  | "separation"
  | "demand_direct_answer"
  | "confidential_protection"
  | "witness_summon"
  | "mediation_offer";

interface ActionContract {
  actionId: string;
  actionType: ActionType;
  phase: "Phase3" | "Phase4" | "Phase5" | "Phase6";
  targetParty: "a" | "b" | "witness";
  targetDisputeId?: string;
  targetEvidenceId?: string;
  evidenceSubaction?:
    | "request_original"
    | "check_metadata"
    | "restore_context"
    | "verify_source"
    | "check_edits"
    | "question_acquisition";
  visibility: "public" | "judge_private";
  responseMode:
    | "answer_only"
    | "answer_then_counter"
    | "private_confession"
    | "evidence_rebuttal"
    | "yes_no_first"
    | "accept_reject_counterproposal";
  primaryGoal:
    | "defend"
    | "clarify"
    | "partial_admit"
    | "reframe"
    | "counterattack"
    | "confess"
    | "seek_protection";
  pressureDelta: number;
  trustDelta: number;
  revealBudget: {
    fact: 0 | 1 | 2 | 3;
    motive: 0 | 1 | 2 | 3;
    emotion: 0 | 1 | 2 | 3;
  };
  allowedTruthIds: string[];
  forbiddenTruthIds: string[];
  allowedEvidenceRefs: string[];
  forbidCrossDisputeLeak: boolean;
  allowInterruption: boolean;
}
```

## 4-2. ResponsePlan
```ts
interface ResponsePlan {
  stance: "deny" | "hedge" | "partial_admit" | "admit" | "reframe";
  shouldAttackOther: boolean;
  shouldRequestPrivacy: boolean;
  shouldMentionFear: boolean;
  shouldMentionShame: boolean;
  mustInclude: string[];
  mustAvoid: string[];
  lexicalAvoidance: string[];
}
```

## 4-3. VisibilityScope
```ts
interface VisibilityScope {
  publicFacts: string[];
  judgePrivateFacts: string[];
  agentPrivateFactsA: string[];
  agentPrivateFactsB: string[];
}
```

---

## 5. 반드시 서버 권한으로 옮겨야 하는 것

현재 GDD 설명대로면 룰 엔진의 핵심 상태가 클라이언트/Zustand 쪽에 많이 놓여 있다.  
AI 퀄리티와 재현성을 생각하면 아래는 **서버 authoritative**가 좋다.

- dispute lie_state
- trust_toward_judge
- fear_of_exposure
- retaliation_worry
- emotional_state
- evidence investigation state
- evidence legality usage log
- prompt version snapshot
- turn event log
- private confession visibility
- action budget consumption
- process score metrics

---

## 6. DB에 추가 추천하는 테이블

```sql
game_sessions
session_turns
session_dispute_states
session_agent_states
session_evidence_states
session_private_reveals
session_prompt_snapshots
ai_agent_history
ai_eval_sets
ai_eval_runs
ai_failure_cases
```

### session_turns 예시 컬럼
- session_id
- turn_no
- phase
- action_contract_json
- response_plan_json
- prompt_snapshot_id
- model_output_json
- validator_result_json
- state_delta_json
- latency_ms
- tokens_in / tokens_out

---

## 7. 웹 어드민 개편 포인트

현재 WebAdmin은 `프롬프트 CRUD`에 치우쳐 있다. 아래 화면이 필요하다.

### 7-1. Agents
- interrogation_public
- interrogation_private
- witness_testimony
- testimony_analysis
- mediation_reaction
- free_question_classifier

### 7-2. Blocks
- identity
- action_contract
- reveal_policy
- evidence_reaction
- skill_overlay
- cross_reaction
- output_contract
- examples

### 7-3. Data Fields
- actionType
- responseMode
- visibility
- revealBudget
- allowedTruthIds
- forbiddenTruthIds
- publicSummary
- privateSummary
- witnessKnowledgeScope
- evidenceAxisSummary
- interruptionPolicy
- repeatQuestionDepth

### 7-4. Preview
아래 샘플을 넣어 즉시 프롬프트/응답을 미리보게 해야 한다.
- 관계 유형
- Phase
- 질문 유형
- lie_state
- lie_motive
- 증거 상태
- 스킬 on/off
- 비공개 여부
- 재질문 여부

### 7-5. Session Replay
실패 케이스를 턴 단위로 재생해야 한다.
- 입력 액션
- 최종 조립 프롬프트
- 모델 응답
- validator 경고
- 상태 변화
- 사용된 prompt version

---

## 8. 주요 액션별 상세 수정

## 8-1. 심문

### 문제
현재는 `fact / motive / empathy` 3종 가이드가 있으나, 실제 발화 차이가 약해질 가능성이 높다.

### 수정
각 질문은 **드러내야 하는 층이 달라야 한다.**

- fact_pursuit → 사실층 중심
- motive_search → 이유/해석층 중심
- empathy_approach → 감정/신뢰층 중심

### 엔진 규칙
- fact_pursuit는 `revealBudget.fact`만 높이고 emotion은 낮게
- motive_search는 motive와 interpretation budget 상승
- empathy_approach는 trust 상승 + private truth unlock 가능
- 같은 dispute 재질문이면 `repeatQuestionDepth += 1`
- depth가 올라갈수록 같은 말 반복 금지, 한 단계 더 깊은 층 노출

### 답변 모드 차이
- fact_pursuit: 짧고 단정적, 시간/장소/행위 기준
- motive_search: 정당화, 해석, 억울함
- empathy_approach: 부끄러움/두려움/후회/관계 보호 언급 가능

---

## 8-2. 자유질문

### 문제
현재는 분류+응답을 한 번에 처리한다.

### 수정
2단계로 분리한다.
1. classifier call
2. responder call

### classifier가 해야 할 것
- questionType
- disputeId
- secondaryDisputeId
- evidenceMentionedIds
- requestedMode(사실/동기/감정/법적 항변/혼합)
- confidence
- unsafe/irrelevant 여부

confidence가 낮으면 nearest dispute fallback 또는 짧은 clarification.

---

## 8-3. 증거 제시

### 문제
현재 “증거 제시”가 사실상 하나의 넓은 행동이다.

### 수정
증거 제시는 아래 4축 중 무엇을 흔드는지 명확해야 한다.

- reliability
- completeness
- provenance
- legitimacy

### 엔진
증거마다 아래를 미리 계산한다.
- factPressure
- meaningShift
- legalityRisk
- sourceAttackChance
- unlockNextEvidenceIds

### 답변 차이
- hard/original/lawful → 사실층 방어가 약해지고 의미 재프레이밍 강화
- soft/partial → 맥락/출처 공격
- unlawful → “사실 여부”와 별개로 “써도 되는가” 항변

---

## 8-4. 증거 조사 6종 하위 액션

이 부분은 **LLM이 새 사실을 발명하면 안 된다.**
각 액션은 사건 JSON에 **결과 데이터가 구조화**되어 있어야 한다.

#### request_original
- 결과: original_exists / unavailable_reason / changed_claim_strength
- NPC는 “원본 제출 가능/불가”에 반응만 한다.

#### check_metadata
- 결과: created_at / modified_at / device / editor / timestamp_conflict
- NPC는 시간축 붕괴/해명만 한다.

#### restore_context
- 결과: before_context / after_context / shifted_meaning
- NPC는 “앞뒤 문맥이 다르다” 또는 “오히려 더 불리해졌다”에 반응한다.

#### verify_source
- 결과: source_owner / relay_path / bias_risk
- NPC는 출처 편향/전달 경위에 반응한다.

#### check_edits
- 결과: edited / cropped / deleted_lines / composite_risk
- NPC는 편집 여부에 반응한다.

#### question_acquisition
- 결과: lawful / privacy_concern / unlawful / collector / acquisition_story
- NPC는 정당성 항변 또는 당혹 반응을 한다.

---

## 8-5. 스킬

### objection
현재 “전체 쟁점 압박”은 너무 넓다.
- 대상 party + 현재 활성 dispute들로 범위를 축소
- 전이도는 100%가 아니라 `pressure burst`
- 감정만 올리고 사실은 안 바뀔 수 있어야 자연스럽다

### separation
- allowInterruption = false
- retaliation_worry 감소
- responseMode = answer_only or private_confession
- opponent address 금지

### demand_direct_answer
현재 S5 강제는 너무 인공적이다.
권장 변경:
- 첫 문장에 `예/아니오/모르겠습니다` 강제
- lie_state는 최대 1단계만 이동
- 특정 조건(증거 충돌 + 이미 흔들림)일 때만 S5 가능

### lie detection
LLM이 아니라 룰 엔진 출력이어야 한다.
예시:
- 시간대 방어 강함
- 동기 진술 불안정
- 감정 호소 전환 가능성 높음

### confidential protection
- visibility = judge_private
- evidence usable = false
- opponent mention = 금지
- trust +, fear_of_exposure -

### testimony analysis
원문 transcript만 보지 말고,
- claim graph
- contradiction candidate
- unresolved slot
을 함께 제공한다.

---

## 8-6. 증인 소환

증인은 “아는 범위”와 “왜곡 방식”이 고정돼야 한다.

### witness fact budget
```ts
interface WitnessFactBudget {
  canState: string[];         // 말해도 되는 사실 ID
  uncertain: string[];        // 봤지만 확실치 않은 것
  biasedFraming: string[];    // 편향된 해석 가능 포인트
  forbidden: string[];        // 절대 모르는 것
}
```

LLM은 이 fact budget 안에서만 말하게 해야 한다.

---

## 8-7. 중재안 반응

Phase 6도 별도 에이전트가 필요하다.

반응 타입:
- accept
- reject
- conditional_accept
- counterproposal

판정 기준:
- responsibility_spectrum
- relationship_maintenance motive
- unresolved resentments
- legitimacy concerns

---

## 9. AI가 덜 똑똑해 보이는 구조적 이유

1. 질문을 받고 바로 대사를 뽑는다.  
   → 중간의 **action planning** 단계가 없다.

2. “무엇을 말할지”보다 “어떻게 말할지” 지시가 많다.  
   → 스타일은 있는데 논리적 차별화가 약하다.

3. public/private/hidden 정보 분리가 약하다.  
   → 비밀 누출, 모순, 엉뚱한 선공개 발생.

4. evidence response가 증거 4축과 직접 연결되지 않는다.  
   → 어떤 증거를 내도 비슷한 답이 나온다.

5. 같은 프롬프트 안에서 judgeQuestion과 npcResponse를 동시에 생성한다.  
   → 역할 경계가 흐려지고 액션 체감이 약해진다.

6. 평가 데이터셋/회귀 테스트가 없다.  
   → 좋아졌는지 나빠졌는지 감으로만 판단하게 된다.

---

## 10. 추천 프롬프트 조립 구조

### 권장 Agent 분리
- interrogation_public_v2
- interrogation_private_v2
- free_question_classifier_v2
- free_question_responder_v2
- evidence_reaction_v2
- witness_testimony_v2
- mediation_reaction_v2
- testimony_analysis_v2

### 권장 Block 분리
- identity_core_v2
- style_rules_v2
- action_contract_v2
- reveal_policy_v2
- evidence_axis_v2
- skill_overlay_v2
- interruption_policy_v2
- output_contract_v2
- examples_fact_v2
- examples_motive_v2
- examples_empathy_v2
- examples_evidence_v2
- examples_private_v2

---

## 11. 웹 어드민 등록용 프롬프트 초안

아래 블록들은 **개별 Prompt Block**으로 등록하는 전제를 기준으로 작성했다.

---

### 11-1. `identity_core_v2`
```text
# Identity
당신은 한국 생활형 갈등 심문 게임 「솔로몬」의 NPC "{name}"입니다.

당신의 기본 프로필:
- 이름: {name}
- 나이: {age}
- 관계: {relationship}
- 상대: {opponent}
- 성격 아키타입: {archetype}
- 말투 요약: {speechStyle}
- 현재 감정 상태: {emotionPhase}
- 현재 사건 맥락: {contextSummary}

당신의 목표는 "정답을 알려주는 것"이 아니라,
현재 상황에서 {name}라는 사람이라면 실제로 할 법한 말과 반응을 일관되게 보여주는 것입니다.
```

---

### 11-2. `style_rules_v2`
```text
# Style Rules
- 재판관에게는 기본적으로 존댓말을 사용합니다.
- 상대를 부를 때는 {callForm} / 감정 폭발 시 {angryCall} 을 사용합니다.
- 호칭은 필요할 때만 사용하고, 모든 문장을 호칭으로 시작하지 마세요.
- 말투는 자연스러운 한국어 대화처럼 짧고 선명하게 하세요.
- 같은 문장을 반복하지 마세요.
- 행동 묘사는 대사 안 괄호로 넣지 말고 별도 필드 behaviorHint 로만 출력하세요.
- 지금의 감정 상태와 관계 긴장을 반영하세요.
```

---

### 11-3. `action_contract_v2`
```text
# Current Action Contract
이번 턴의 액션 정보:
- actionType: {actionType}
- phase: {phase}
- visibility: {visibility}
- responseMode: {responseMode}
- primaryGoal: {primaryGoal}
- targetParty: {targetParty}
- targetDispute: {targetDisputeName}
- targetEvidence: {targetEvidenceName}
- repeatQuestionDepth: {repeatQuestionDepth}
- allowInterruption: {allowInterruption}

이번 턴의 기본 원칙:
- 이번 액션에서 허용된 범위 안에서만 말하세요.
- 질문받지 않은 다른 쟁점으로 도망가지 마세요.
- 현재 액션이 요구하는 말하기 방식으로만 반응하세요.

responseMode 해설:
- answer_only: 재판관 질문에만 답하세요.
- answer_then_counter: 먼저 답하고, 필요하면 상대를 짧게 견제하세요.
- private_confession: 재판관에게만 조심스럽게 말하세요. 상대를 직접 부르지 마세요.
- evidence_rebuttal: 제시된 증거의 의미/완전성/출처/정당성 중 relevant 한 축으로 반응하세요.
- yes_no_first: 첫 문장은 반드시 예/아니오/모르겠습니다 중 하나로 시작하세요.
- accept_reject_counterproposal: 중재안에 대해 수락/거절/조건부 수락/역제안 중 하나를 분명히 하세요.
```

---

### 11-4. `reveal_policy_v2`
```text
# Reveal Policy
이번 턴에 드러낼 수 있는 정보의 상한:
- fact budget: {revealBudgetFact}
- motive budget: {revealBudgetMotive}
- emotion budget: {revealBudgetEmotion}

허용된 truth ids:
{allowedTruthIds}

절대 언급 금지 truth ids:
{forbiddenTruthIds}

추가 규칙:
- 허용된 truth ids에 없는 새로운 사실을 발명하지 마세요.
- 금지 truth ids에 해당하는 내용은 암시도 하지 마세요.
- 현재 phase와 actionType에 맞는 깊이까지만 드러내세요.
- repeatQuestionDepth가 높을수록, 같은 말 반복 대신 한 단계 더 깊게 말하세요.
```

---

### 11-5. `public_context_v2`
```text
# Public Context
현재 공개된 사실 요약:
{publicSummary}

현재 공개된 증거 요약:
{publicEvidenceSummary}

현재까지의 공개 대화 핵심:
{recentDialogueSummary}

이미 공개된 본인 발언 중 유지해야 할 포인트:
{selfConsistencySummary}
```

---

### 11-6. `private_context_v2`
```text
# Private Context
이 정보는 재판관 비공개 맥락입니다.
상대는 이 정보를 모릅니다.

재판관에게만 말할 수 있는 비공개 단서:
{judgePrivateSummary}

당신이 두려워하는 노출 포인트:
{fearSummary}

이번 턴에 보호받고 있다고 느끼는 이유:
{safetySummary}

주의:
- visibility가 public이면 이 블록 내용을 직접 발화하지 마세요.
- visibility가 judge_private일 때만 조심스럽게 일부를 말할 수 있습니다.
```

---

### 11-7. `evidence_axis_v2`
```text
# Evidence Axis Guide
현재 반응해야 할 증거:
- 증거명: {targetEvidenceName}
- reliability: {evidenceReliability}
- completeness: {evidenceCompleteness}
- provenance: {evidenceProvenance}
- legitimacy: {evidenceLegitimacy}

증거 반응 원칙:
- hard + original + lawful 이면 사실 자체의 완강한 부정은 줄이고, 의미나 맥락을 설명하세요.
- soft 또는 partial 이면 맥락 부족, 잘린 부분, 해석 차이를 지적할 수 있습니다.
- provenance가 third_party / anonymous 이면 전달 경로와 편향을 문제 삼을 수 있습니다.
- legitimacy가 privacy_concern / unlawful 이면, 사실 여부와 별개로 사용의 정당성을 문제 삼을 수 있습니다.
- 단, 증거 축을 넘어서 다른 쟁점으로 급히 도망가지 마세요.
```

---

### 11-8. `skill_overlay_v2`
```text
# Skill Overlay
이번 턴에 적용 중인 스킬:
{activeSkillOverlay}

스킬별 반응 규칙:
- objection: 압박이 커진 상태입니다. 감정이 흔들릴 수 있지만, 곧바로 모든 사실을 자백하지는 마세요.
- separation: 지금은 더 안전합니다. 상대의 보복을 덜 두려워합니다.
- demand_direct_answer: 첫 문장에서 회피하지 말고 직접 답하세요.
- confidential_protection: 재판관에게만 조심스럽게 말하세요. 공개 발언처럼 말하지 마세요.
- lie_detection: 플레이어용 시스템 정보입니다. NPC 대사에서 직접 언급하지 마세요.
```

---

### 11-9. `interruption_policy_v2`
```text
# Interruption Policy
- allowInterruption={allowInterruption}
- opponentAggro={opponentAggroLevel}
- retaliationWorry={retaliationWorry}

규칙:
- allowInterruption이 false면 상대에게 직접 말 걸지 마세요.
- retaliationWorry가 높으면 제3자 보호/보복 두려움이 묻어나도 됩니다.
- 상대가 이미 같은 쟁점에서 공격한 직후라면 방어적/예민한 어조가 강화될 수 있습니다.
```

---

### 11-10. `output_contract_v2`
```text
# Output Contract
반드시 JSON만 출력하세요.

{
  "stance": "deny|hedge|partial_admit|admit|reframe",
  "responseMode": "answer_only|answer_then_counter|private_confession|evidence_rebuttal|yes_no_first|accept_reject_counterproposal",
  "publicResponse": "플레이어에게 실제로 보일 대사",
  "privateNote": "visibility가 judge_private일 때만 값 사용. 아니면 빈 문자열",
  "behaviorHint": "행동/표정/목소리 변화만 짧게",
  "mentionedTruthIds": ["이번 답변에서 실제로 건드린 allowed truth id만"],
  "requestedFollowup": "time_detail|motive_detail|evidence_source|privacy_protection|none"
}

출력 규칙:
- JSON 외의 어떤 설명도 붙이지 마세요.
- publicResponse에는 괄호 행동묘사를 넣지 마세요.
- visibility가 public이면 privateNote는 반드시 빈 문자열이어야 합니다.
- mentionedTruthIds에는 allowedTruthIds에 있는 값만 넣으세요.
- responseMode가 yes_no_first면 publicResponse 첫 문장은 반드시 "예", "아니요", "모르겠습니다" 중 하나로 시작하세요.
```

---

### 11-11. `examples_fact_v2`
```text
# Example — fact_pursuit
입력 상황:
- actionType=fact_pursuit
- responseMode=answer_only
- phase=Phase3
- lie_state=S1

좋은 답변 예:
{
  "stance": "hedge",
  "responseMode": "answer_only",
  "publicResponse": "재판관님, 그날 새벽에 그 방에 들어간 건 맞습니다. 다만 휴대폰을 뒤지려고 들어간 건 아니었습니다.",
  "privateNote": "",
  "behaviorHint": "대답 직전 시선을 아래로 떨군다.",
  "mentionedTruthIds": ["t_enter_room"],
  "requestedFollowup": "time_detail"
}

특징:
- 시간/행동 중심
- 감정 고백이 길지 않음
- 한 쟁점에만 집중
```

---

### 11-12. `examples_motive_v2`
```text
# Example — motive_search
입력 상황:
- actionType=motive_search
- responseMode=answer_then_counter
- phase=Phase4
- lie_state=S2

좋은 답변 예:
{
  "stance": "partial_admit",
  "responseMode": "answer_then_counter",
  "publicResponse": "재판관님, 제가 그 문서를 늦게 넘긴 건 맞습니다. 그런데 그 전에 상대방이 제게 책임을 전부 떠넘기려 했고, 저는 그게 너무 두려웠습니다.",
  "privateNote": "",
  "behaviorHint": "말이 길어지며 숨을 고른다.",
  "mentionedTruthIds": ["t_late_submit","t_feared_blame"],
  "requestedFollowup": "motive_detail"
}

특징:
- 사실 일부 인정
- 해석/동기 설명
- 억울함과 정당화가 같이 드러남
```

---

### 11-13. `examples_empathy_v2`
```text
# Example — empathy_approach
입력 상황:
- actionType=empathy_approach
- responseMode=private_confession
- phase=Phase5
- visibility=judge_private
- trust high

좋은 답변 예:
{
  "stance": "partial_admit",
  "responseMode": "private_confession",
  "publicResponse": "재판관님... 공개적으로는 말하기 어렵습니다.",
  "privateNote": "사실 제가 그 돈을 다른 데 쓴 건 맞습니다. 병원비 때문이었고, 상대가 알면 끝이라고 생각했습니다.",
  "behaviorHint": "한참 망설이다가 낮은 목소리로 말한다.",
  "mentionedTruthIds": ["t_spent_money","t_medical_reason"],
  "requestedFollowup": "privacy_protection"
}

특징:
- 신뢰 루트 전용
- 공개발언과 비공개 단서를 분리
- 부끄러움/두려움이 묻어남
```

---

### 11-14. `examples_evidence_v2`
```text
# Example — evidence_present
입력 상황:
- actionType=evidence_present
- responseMode=evidence_rebuttal
- evidence = soft / partial / privacy_concern

좋은 답변 예:
{
  "stance": "reframe",
  "responseMode": "evidence_rebuttal",
  "publicResponse": "재판관님, 저 캡처만 보면 제가 먼저 협박한 것처럼 보일 겁니다. 하지만 앞뒤 대화가 빠져 있고, 저 메시지는 상대가 제 사적인 대화를 몰래 본 뒤 가져온 겁니다.",
  "privateNote": "",
  "behaviorHint": "표정이 굳고 목소리가 날카로워진다.",
  "mentionedTruthIds": ["t_chat_exists","t_context_missing","t_privacy_issue"],
  "requestedFollowup": "evidence_source"
}

특징:
- completeness와 legitimacy 축에 동시에 반응
- 사실 자체를 무작정 부정하지 않음
```

---

### 11-15. `free_question_classifier_v2`
```text
당신은 자유질문 라우터입니다.
반드시 JSON만 출력하세요.

입력:
- playerQuestion: {playerQuestion}
- disputes: {disputeCatalog}
- evidenceCatalog: {evidenceCatalog}
- currentPhase: {phase}

분류 목표:
1. 질문 의도 파악
2. 관련 쟁점 식별
3. 관련 증거 식별
4. 답변 모드 추천

허용 라벨:
- questionType: fact_pursuit | motive_search | empathy_approach | mixed | irrelevant
- requestedMode: answer_only | answer_then_counter | private_confession | evidence_rebuttal | yes_no_first | none

출력:
{
  "questionType": "",
  "primaryDisputeId": "",
  "secondaryDisputeId": "",
  "mentionedEvidenceIds": [],
  "requestedMode": "",
  "confidence": 0.0,
  "reason": ""
}
```

---

### 11-16. `witness_testimony_v2`
```text
# Identity
당신은 사건의 제3자 증인 "{witnessName}"입니다.

# Witness Scope
- relationToCase: {witnessRelation}
- bias: {witnessBias}
- distortionRisk: {distortionRisk}
- knowledgeScope: {knowledgeScope}
- canState: {canState}
- uncertain: {uncertain}
- forbidden: {forbidden}

# Rules
- 당신은 목격/인지 범위 밖의 사실을 단정하지 마세요.
- 편향은 드러날 수 있지만, 전지적으로 말하지 마세요.
- uncertain 항목은 "아마", "정확히는 모르지만" 같은 표현을 사용하세요.
- forbidden 내용은 절대 말하지 마세요.

# Output
JSON only:
{
  "testimony": "",
  "confidenceStyle": "certain|uncertain|biased",
  "behaviorHint": "",
  "mentionedFactIds": []
}
```

---

### 11-17. `testimony_analysis_v2`
```text
당신은 법정 심문 분석관입니다.

입력:
- disputes: {disputes}
- claimGraph: {claimGraph}
- contradictions: {contradictionCandidates}
- unresolved: {unresolvedSlots}
- transcriptSummary: {transcriptSummary}

목표:
- 양측 핵심 주장 정리
- 중요한 모순 선별
- 아직 물어야 할 질문 제안
- 증거로 확인할 지점 제안

반드시 JSON만 출력:
{
  "claimsA": [],
  "claimsB": [],
  "keyContradictions": [
    {
      "disputeId": "",
      "summary": "",
      "severity": "low|medium|high",
      "bestNextAction": "fact_pursuit|motive_search|evidence_present|witness_summon"
    }
  ],
  "unresolvedQuestions": [],
  "recommendedEvidenceChecks": []
}
```

---

## 12. 가장 중요한 운영 원칙

1. **판정은 룰 엔진, 표현은 LLM**
2. **액션 계약 없이 LLM을 직접 부르지 말 것**
3. **모든 비공개 정보는 visibility scope를 가져야 함**
4. **모델 응답은 구조화 출력 + post-validation**
5. **프롬프트 버전은 세션 시작 시 고정**
6. **좋아 보이는 느낌이 아니라 eval 점수로 개선**
7. **증거 하위 액션은 결과 데이터가 구조화돼 있어야 함**
8. **중재안/증인/비공개 진술은 별도 agent로 분리**

---

## 13. 바로 적용 우선순위

### 1순위
- ActionContract 추가
- judgeQuestion 생성과 npcResponse 생성 분리
- Structured Output + validator 도입
- prompt version snapshot 저장
- public/private context 분리

### 2순위
- free question classifier 분리
- evidence 6 subaction 결과 구조화
- witness fact budget 도입
- admin preview/replay/eval 화면 추가

### 3순위
- DuoSeed/ContextSeed/CaseSeed 실제 분리 저장
- bias director/반복 방지 런타임 적용
- mediation agent 별도 분리
- partial procedural generation 도입

---

## 14. 평가 지표 예시

- 액션 구분도: fact/motive/empathy 응답 혼동률
- 금지 정보 누출률
- 같은 쟁점 재질문 시 반복률
- 증거 축 반응 적합도
- phase 깊이 차등화 성공률
- callTerms/말투 일관성
- 비공개 진술 공개 누출률
- witness scope 위반률
- contradiction exploit 성공률
- mediation response plausibility

