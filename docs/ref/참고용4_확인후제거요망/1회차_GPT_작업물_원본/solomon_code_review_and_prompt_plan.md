# 솔로몬 코드 실사 기반 리뷰 + 프롬프트 리뉴얼 제안
이 문서는 `/에이전트_참고자료`에 포함된 실제 코드, 타입, 사건 JSON을 기준으로 작성한 코드 정합성 리뷰와 프롬프트 리뉴얼 제안이다.
특히 `수정방향.md`의 제안 중 타당한 것과, 실제 코드상 더 급한 문제를 분리해 정리했다.
## 1. 결론 요약
- `ActionContract`, `skillOverlay`, `evidenceAxis`, 자유질문 2콜 분리는 **수용이 맞다**.
- 다만 현재 AI 품질 저하의 더 직접적인 원인은 **프롬프트 내용보다 조립/주입 로직의 정합성 문제**다.
- 출시 버전 기준 우선순위는 다음 순서가 맞다.
  1. 조립 버그/스코프 누출 수정
  2. ActionContract + trustInfo + evidenceAxis 주입
  3. 에이전트 분리
  4. 출력 검증기/재시도
  5. 사건 데이터 세분화(`truth atoms`, `witness budget`, visibility)
## 2. 코드 기준으로 더 시급한 문제
### Phase 가이드 조건값 불일치
- 문제: `server/seedBlocks.js`의 `ai_agent_blocks.condition_value`는 `Phase3_Interrogation`, `Phase4_Evidence`, `Phase5_ReExamination`인데, `types/game.ts`의 `GamePhase` 실제 값은 `phase3`, `phase4`, `phase5`다. `llmDialogueResolver.ts`는 `buildAgentPrompt('interrogation', vars, { phase: currentPhase })`로 enum 값을 그대로 넘긴다. 제공된 코드 기준으로는 Phase 가이드 블록이 아예 안 붙을 가능성이 높다.
- 권장 수정: 조건값을 enum key가 아니라 실제 enum value(`phase3`, `phase4`, `phase5`)로 통일해야 한다. 이건 프롬프트 품질 이전의 기능 버그다.
### free_question 에이전트의 필수 변수 누락
- 문제: `server/seedBlocks.js`에서 `free_question`은 `character_base`, `naming_rules`, `free_question_rules`를 사용한다. 그런데 `server/llmFreeQuestion.ts`의 `fqVars`에는 `relationship`, `context`, `formalityGuide`가 없다. 결과적으로 `{relationship}`, `{context}`, `{formalityGuide}`가 프롬프트에 그대로 남을 수 있다.
- 권장 수정: 자유질문 프롬프트를 2콜로 나누기 전에, 먼저 현재 agent 변수 누락을 막아야 한다. 최소한 `relationship`, `context`, `formalityGuide`를 채우거나, free_question용 캐릭터 블록을 별도로 만들어야 한다.
### trust_action에 disputeId가 없음
- 문제: `types/dialogue.ts`에서 `trust_action`은 `actionType`과 `target`만 있고 `disputeId`가 없다. 그래서 `llmDialogueResolver.ts`에서 비공개 보호/분리심문 프롬프트는 쟁점 컨텍스트 없이 생성된다.
- 권장 수정: 신뢰 액션은 반드시 `disputeId` 또는 `focusedDisputeId`를 가져야 한다. 그래야 '어느 비밀을 더 말할지'가 정해진다. 지금 구조로는 비공개 응답이 뭉개질 수밖에 없다.
### 증거/대화 컨텍스트가 현재 쟁점 기준으로 필터링되지 않음
- 문제: `llmDialogueResolver.ts`는 `presentedEvidence`를 `presented === true` 전체로 모으고, 최근 대화도 단순히 `slice(-8)`로 가져온다. 현재 쟁점과 무관한 증거/대화가 prompt에 섞일 수 있다.
- 권장 수정: 현재 쟁점 관련 증거, 현재 대상이 실제로 본 증거, 현재 쟁점과 연결된 최근 대화만 넣어야 한다. 그렇지 않으면 LLM이 다른 쟁점을 섞어 말한다.
### 제시 대상 필터 미적용
- 문제: `EvidenceRuntimeState`에는 `presentedTo`가 있는데, 프롬프트 조립 시 이 정보가 쓰이지 않는다. 즉 A에게만 제시된 증거가 B의 prompt에도 들어갈 수 있다.
- 권장 수정: 프롬프트용 evidenceInfo는 `presentedTo.includes(target)` 기준으로 필터링해야 한다.
### 비공개 대화 가시성 필터 미적용
- 문제: `DialogueEntry`에는 `isConfidential?: boolean`이 있지만, `llmDialogueResolver.ts`의 recent dialogue 조립은 이를 고려하지 않는다.
- 권장 수정: 상대에게 비공개였던 대화가 prompt에 섞이면 confidential_protection이 무력화된다. visibility 필터는 2차 작업이 아니라 즉시 반영 항목이다.
### investigationResults는 이미 데이터에 있는데 런타임에서 안 씀
- 문제: `수정방향.md`는 evidence 조사 결과를 JSON에 추가하자고 했지만, 샘플 사건 3개는 이미 `investigationResults`를 가지고 있다. 문제는 `engine/evidenceEngine.ts`와 prompt 조립 흐름 어디에서도 이 결과를 읽지 않는다는 점이다.
- 권장 수정: 이 항목은 '데이터 추가'보다 '데이터 연결'이 핵심이다. `evidence_investigate` 후 UI/프롬프트/판결 엔진이 이 결과를 실제로 소비하도록 바꿔야 한다.
### 증거 조합(combination) 기획은 있으나 제공 자료 기준으로 연결 흔적이 약함
- 문제: `engine/evidenceEngine.ts`에 `checkCombinations()`가 있으나 제공된 코드 범위에서는 사용처가 보이지 않는다.
- 권장 수정: 증거 조합이 실제로 hard upgrade를 일으키는지 연결 확인이 필요하다. 미연결이면 evidence phase 체감이 크게 떨어진다.
### 문서/타입/사건 JSON의 enum taxonomy가 어긋남
- 문제: `types/case.ts`의 `EvidenceType`, `Completeness`, `Provenance`는 실제 사건 JSON 값(`email`, `document`, `access_log`, `institutional_note`, `receipt`, `platform_log`, `cropped`, `platform`, `personal_device`, `mixed`)과 다르다.
- 권장 수정: 프롬프트의 evidenceAxis를 generic하게 짜기보다, 먼저 데이터 타입을 실제 JSON에 맞춰 통일하거나 매핑 레이어를 만들어야 한다.
### Prompt 조립 결과의 검증 부재
- 문제: `agentManager.ts`는 단순 `replaceAll`만 하고 누락 변수, 남은 placeholder, 조건 블록 미적용을 검증하지 않는다. `parseLLMResponse()`도 regex JSON 파싱에 의존한다.
- 권장 수정: 출시 품질 기준이라면 `missing variables`, `unresolved placeholders`, `schema validation`, `1회 재시도`는 필수다.
### judgeQuestion을 LLM이 같이 쓰는 구조
- 문제: `resolveLLMDialogue()`는 액션 버튼형 질문에서도 judgeQuestion과 npcResponse를 한 번에 생성한다.
- 권장 수정: 자유질문을 제외한 액션 버튼형 질문은 엔진 템플릿이 기본이 되어야 한다. judgeQuestion을 LLM 자유 생성에 맡기면 액션 체감이 흐려진다.
## 3. `수정방향.md`에 대한 내 판단
- **ActionContract 신설**: 전면 수용. 현재 `question_type_guide`만으로는 fact/motive/empathy의 차이가 너무 약하다. 또한 현재 prompt에는 trust 수치, allowed truth, response mode가 없다.
- **dialogue_rules 완화 + responseMode 우선**: 전면 수용. 현 규칙은 공개 심문 한 패턴에 과도하게 최적화되어 있다. 분리심문/비공개/즉답요구에서 부자연스럽다.
- **output_json_npc 확장**: 전면 수용. 최소 `stance`, `responseMode`, `mentionedTruthIds`는 있어야 후처리와 eval이 가능하다.
- **skill_overlay 블록**: 전면 수용. 현재 trust_action user prompt만으로는 separation/confidential의 차이가 충분히 살아나기 어렵다.
- **evidence_axis 블록**: 전면 수용. 현재 evidence reaction은 증거 속성 차이를 못 쓴다.
- **증거 조사 결과 사전 구조화**: 부분 수정 후 수용. 샘플 사건은 이미 구조화돼 있다. 추가 작성보다 런타임 연결이 우선이다.
- **증인 fact budget**: 수용. 다만 1차는 `canState/uncertain/forbidden`을 새로 다 쓰는 대신, 기존 `knowledgeScope + witnessProfile + bias + distortionRisk`로부터 budget을 파생 생성해도 된다.
- **세션 시작 시 프롬프트 버전 스냅샷**: 전면 수용. 이건 품질 관리와 재현성 차원에서 필수다.
- **에이전트 분리**: 수용. 다만 실질적으로는 9개가 맞다. `phase1_generator`, `phase2_generator`를 유지하면 총 9개이며, 런타임 에이전트만 세면 7개다.
- **자유질문 2콜**: 전면 수용. 현재 free_question은 분류와 답변을 한 번에 하고, 게다가 grounding 변수도 부족하다.
- **judgeQuestion 하이브리드 유지**: 부분 반박. 액션 버튼형 질문은 엔진 템플릿이 1차, LLM은 npcResponse 중심이 더 낫다. judgeQuestion LLM 생성은 기본 비활성 권장.
- **few-shot을 question_type_guide 확장으로만 처리**: 부분 반박. 공개 심문용은 그 방식으로 충분하지만, `evidence_reaction`과 `interrogation_private`는 짧은 agent 전용 예시가 별도로 필요하다.
- **server authoritative 반박**: 부분 동의. 전체 authoritative는 과할 수 있다. 그러나 최소한 `session event log + prompt snapshot + eval log`는 서버에 남기는 편이 출시 운영에는 유리하다.
- **11단계 파이프라인 과잉**: 조정 수용. 11단계 전체보다 `ActionContract 생성`과 `응답 검증/재시도` 추가가 우선이다.
- **visibility 시스템 보류**: 부분 반박. 풀스펙 visibility는 2차여도 되지만, confidential 대화/증거의 prompt 가시성 필터는 지금 바로 들어가야 한다.
- **temperature 0.75 전후**: 조정 필요. 구조화가 들어간 뒤 다시 내려야 한다. 현재 추천은 public 0.68, private 0.60, evidence 0.58, classifier 0.10, responder 0.68, witness 0.62, analysis 0.25 정도다.
## 4. 출시 기준 권장 아키텍처
### 4-1. 에이전트 구성
총 9개를 권장한다.
1. `interrogation_public`
2. `interrogation_private`
3. `evidence_reaction`
4. `free_question_classifier`
5. `free_question_responder`
6. `witness_testimony`
7. `testimony_analysis`
8. `phase1_generator`
9. `phase2_generator`
### 4-2. 최소 파이프라인
1. 플레이어 액션 정규화
2. 현재 쟁점 결정
3. `ActionContract` 생성
4. prompt 조립
5. LLM 호출
6. schema validation / unresolved fact check / 1회 재시도
7. 상태 반영
8. 이벤트 로그 저장
### 4-3. 지금 추가해야 하는 런타임 필드
- `actionContract` — actionType, responseMode, goal, revealBudget, allowedTruthIds, forbiddenTruthIds, shouldCounterOpponent, askYesNoFirst
- `trustInfo` — trustTowardJudge, fearOfExposure, retaliationWorry, confessionLikelihood
- `skillOverlay` — separation/confidential/immediate_answer/evasion_reading 등
- `evidenceAxis` — reliability/completeness/provenance/legitimacy/type/investigationSummary
- `focusedDisputeContext` — 현재 쟁점 전용 recent dialogue, evidence, transcript
- `visibilityFilter` — confidential line 제외 규칙
## 5. 데이터 모델에서 꼭 바꿔야 하는 점
### 5-1. Truth granularity
현재 샘플 사건의 `truthTable`은 사건당 5개 안팎이고, 사실 하나가 꽤 긴 문장이다. `allowedTruthIds`만으로 revealBudget을 세밀하게 제어하기엔 너무 거칠다.
권장안은 둘 중 하나다.
- `truthTable`을 `truth atoms`로 세분화한다.
- 또는 `disputes[].revealSteps`를 별도로 둔다.
예시:
```json
{
  "disputes": [
    {
      "id": "d-1",
      "name": "지석의 비밀 송금 280만원",
      "revealSteps": [
        { "id": "d1-r1", "layer": "fact", "text": "280만원을 보낸 건 맞다." },
        { "id": "d1-r2", "layer": "fact", "text": "수신인은 최민정이다." },
        { "id": "d1-r3", "layer": "motive", "text": "추석 연휴 간병 예약금이었다." },
        { "id": "d1-r4", "layer": "emotion", "text": "장모 상태를 말하면 더 커질까 봐 숨겼다." }
      ]
    }
  ]
}
```
### 5-2. Witness budget
기존 `knowledgeScope`는 유지하되, 출시 버전에는 아래 구조를 추가하는 편이 좋다.
```json
{
  "canState": ["직접 아는 사실"],
  "uncertain": ["정확히 모르는 점"],
  "forbidden": ["이 증인이 알 수 없는 점"]
}
```
### 5-3. Evidence taxonomy 통일
실제 JSON 값 기준으로 enum을 다시 정리하는 편이 낫다.
- type: `bank | chat | email | document | access_log | institutional_note | platform_log | receipt | sns | contract`
- completeness: `original | partial | cropped`
- provenance: `institutional | platform | personal_device | mixed | third_party | anonymous`
- legitimacy: `lawful | privacy_concern | unlawful`
## 6. 코드에 바로 넣을 수 있는 핵심 프롬프트 블록
### action_contract_v2
```text
## 이번 턴 액션 계약
{actionContract}

규칙:
- 이번 턴에는 `allowedTruthIds` 또는 `revealBudget`이 허용하는 범위 안에서만 새로운 사실을 꺼낸다.
- `forbiddenTruthIds`에 해당하는 사실은 직접/간접/비유 형태로도 누설하지 않는다.
- responseMode가 다른 규칙보다 우선한다.
- 이번 턴의 목표(goal)와 무관한 다른 쟁점으로 넘어가지 않는다.
- 같은 말 반복보다, 허용된 범위 안에서 한 단계 더 깊은 정보를 낸다.
```
### response_mode_rules_v2
```text
## 응답 모드
- answer_only: 재판관에게만 답한다. 상대를 직접 부르거나 공격하지 않는다.
- answer_then_counter: 재판관에게 먼저 답한 뒤, 필요할 때만 상대에게 짧게 한마디 한다.
- private_confession: 재판관에게만 낮고 솔직하게 말한다. 상대가 듣는다는 전제의 말은 하지 않는다.
- yes_no_first: 첫 문장은 반드시 "예", "아니요", "모르겠습니다" 중 하나로 시작한다. 그 뒤 해명은 최대 1문장.
- evidence_rebuttal: 지금 보인 증거에 대한 반응이 최우선이다. 진본성, 맥락, 취득 경위, 의미를 구분해서 반응한다.

중요:
- 한 답변 안에 재판관과 상대를 반드시 모두 넣을 필요는 없다.
- 현재 모드가 answer_only, private_confession, yes_no_first이면 상대 직접 호명은 기본 금지다.
```
### trust_state_v2
```text
## 현재 신뢰 상태
{trustInfo}

해석 규칙:
- trustTowardJudge가 높을수록 재판관에게는 방어보다 설명을 택할 수 있다.
- fearOfExposure가 높으면 사실을 알아도 축소/완곡/회피할 수 있다.
- retaliationWorry가 높으면 상대가 듣는 상황에서 특히 솔직해지기 어렵다.
- confidential/separation이 걸린 상태라면 retaliationWorry 감소 효과를 반영하되, 허용되지 않은 비밀까지 자동 고백하지는 마라.
```
### evidence_axis_v2
```text
## 현재 제시된 증거의 성격
{evidenceAxis}

반응 원칙:
- reliability=hard 이고 completeness=original 이면, 무작정 부정하지 말고 의미/맥락/정당화 쪽으로 이동하라.
- completeness=cropped 또는 partial 이면, 빠진 맥락과 잘린 부분을 지적할 수 있다.
- provenance=institutional 또는 platform 이면, 조작 주장보다 해석 다툼이 더 자연스럽다.
- provenance=personal_device 이고 legitimacy=privacy_concern 이면, 취득 경위와 사생활 침해 우려를 강하게 문제 삼을 수 있다.
- provenance=mixed 이면, 일부는 맞고 일부는 연결이 과장됐다고 반응할 수 있다.
- 증거가 불리하더라도 다른 쟁점으로 도망치지 말고, 지금 증거에 직접 반응하라.
```
### question_type_guide_v2
```text
## 질문 유형별 응답 차이

### 사실 추궁 fact_pursuit
- 날짜, 시간, 금액, 행위, 순서를 우선한다.
- 짧고 단정적이어야 한다.
- 동기와 감정은 필요할 때만 최소한으로 덧붙인다.
좋은 예:
- "재판관님, 280만원을 보낸 건 맞습니다. 다만 용도는 제가 오해받는 것과 다릅니다."
나쁜 예:
- "제가 왜 그랬는지부터 말씀드리면..."  ← 동기 탐색으로 흐름 이탈

### 동기 탐색 motive_search
- 왜 숨겼는지, 왜 그렇게 행동했는지, 누구를 의식했는지에 답한다.
- 자기정당화, 수치심, 체면, 관계 유지 동기가 자연스럽다.
좋은 예:
- "재판관님, 그 말을 꺼내면 일이 더 커질 것 같아 숨겼습니다."
나쁜 예:
- "9월 20일 14시 3분에 송금했습니다." ← 사실 추궁만 반복

### 공감 접근 empathy_approach
- 방어를 잠시 낮추고 사정, 심정, 두려움을 말할 수 있다.
- 하지만 trustInfo와 allowedTruth 범위를 넘는 갑작스러운 전면 자백은 금지다.
좋은 예:
- "재판관님, 그때는 들키는 것보다 설명하는 게 더 무서웠습니다."
나쁜 예:
- "네, 전부 제가 잘못했습니다." ← 단계 비약
```
### output_json_npc_v2
```text
## 출력 형식
반드시 JSON 객체 하나만 출력한다. 설명문, 코드펜스, 머리말 금지.

{
  "judgeQuestion": "엔진이 비워두면 보조용으로만 사용될 질문",
  "npcResponse": "NPC 대사",
  "behaviorHint": "행동/표정 묘사",
  "stance": "deny|hedge|partial_admit|admit|reframe",
  "responseMode": "answer_only|answer_then_counter|private_confession|yes_no_first|evidence_rebuttal",
  "mentionedTruthIds": ["t-1"],
  "requestedFollowup": "다음 턴에 유도하면 좋은 포인트 한 줄"
}

규칙:
- npcResponse는 자연스러운 한국어 2~3문장.
- 괄호 행동묘사는 behaviorHint로만 보낸다.
- mentionedTruthIds에는 실제로 발화에 반영한 truth id만 넣는다.
- stance는 발화의 중심 태도를 하나로 고른다.
- judgeQuestion은 액션 버튼형 심문에서는 엔진 템플릿을 덮어쓰지 못하게 짧게만 쓴다. 비워도 된다.
```
### free_question_classifier_rules_v2
```text
당신은 자유질문 분류기다. 답변을 생성하지 말고 분류만 하라.

입력:
- 플레이어 자유질문
- 쟁점 목록
- 증거 목록
- 최근 대화 일부

출력 JSON:
{
  "questionType": "fact_pursuit|motive_search|empathy_approach|irrelevant",
  "primaryDisputeId": "d-1 또는 null",
  "secondaryDisputeId": "d-2 또는 null",
  "mentionedEvidenceIds": ["e-1"],
  "confidence": 0.0,
  "reasonShort": "한 줄 근거"
}

규칙:
- 질문이 두 쟁점을 섞으면 primary/secondary를 분리한다.
- 특정 증거를 직접 가리키면 mentionedEvidenceIds에 넣는다.
- 사건과 무관하면 irrelevant로 둔다.
- JSON 외 텍스트 금지.
```
### free_question_responder_rules_v2
```text
당신은 자유질문 응답기다.
분류 결과를 따르되, 캐릭터 몰입과 현재 상태를 유지한다.

규칙:
- classifier가 잡아준 primaryDisputeId를 중심으로 답한다.
- secondaryDisputeId는 끌려가야 할 때만 아주 약하게 언급한다.
- 최근 대화, 신뢰 상태, 현재 lie state와 충돌하지 않게 답한다.
- 분류 결과가 irrelevant면 억지로 핵심 비밀을 꺼내지 말고 경계하거나 되묻는다.
```
### witness_budget_rules_v2
```text
## 증인 발언 예산
{witnessBudget}

규칙:
- canState에 있는 것만 단정할 수 있다.
- uncertain은 추정임을 표시해야 한다.
- forbidden은 절대 단정하지 않는다.
- bias와 distortionRisk는 사실의 선택과 강조에만 반영하고, 존재하지 않는 사실을 만들지는 않는다.
```
## 7. 코드 수정 우선순위
1. `seedBlocks.js` phase 조건값을 `phase3/phase4/phase5`로 수정
2. `llmFreeQuestion.ts`에 `relationship`, `context`, `formalityGuide` 추가 또는 free_question 전용 캐릭터 블록 분리
3. `types/dialogue.ts`의 `trust_action`에 `disputeId` 추가
4. `llmDialogueResolver.ts`에서 evidenceInfo를 `presentedTo.includes(target)` + current dispute 기준으로 필터링
5. `recentDialogue`/`phaseTranscript`에서 confidential entry와 무관 쟁점 entry 제외
6. `trustInfo`, `actionContract`, `skillOverlay`, `evidenceAxis` 변수 생성 함수 추가
7. `resolveLLMDialogue()`를 `interrogation_public / interrogation_private / evidence_reaction`로 라우팅
8. `llmFreeQuestion.ts`를 classifier/responder 2콜로 분리
9. `parseLLMResponse()` 앞단에 schema validator + 1회 재시도 추가
10. `investigationResults`와 `evidenceCombinations`를 실제 플레이 흐름에 연결
11. judgeQuestion은 자유질문 외에는 엔진 템플릿 우선으로 전환
## 8. 권장 temperature
- interrogation_public: 0.68
- interrogation_private: 0.60
- evidence_reaction: 0.58
- free_question_classifier: 0.10
- free_question_responder: 0.68
- witness_testimony: 0.62
- testimony_analysis: 0.25
- phase1_generator: 0.82
- phase2_generator: 0.80
## 9. 마지막 판단
외부 에이전트의 방향성은 대체로 맞다. 다만 실제 코드 기준으로 보면, 프롬프트 문안 고도화보다 먼저 잡아야 할 것은 **조립 정합성, 현재 쟁점/대상/비공개 스코프 필터, trust/evidence state 주입 부족, free_question 변수 누락**이다.
즉 출시 버전에서는 '프롬프트를 더 잘 쓰는 것'만으로는 부족하고, **프롬프트가 받는 컨텍스트의 품질을 먼저 정상화**해야 한다.
