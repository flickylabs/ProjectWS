# 솔로몬 최종 코드 리뷰 + Eval 15케이스 + Phase6 설계 + 81케이스 확장 전략

이 문서는 현재 코드 6개와 정리 문서 2개, 그리고 공유된 사건 JSON 샘플 3개를 함께 본 뒤 정리한 최종 작업 지시서입니다.

## 1. 전체 정합성 최종 검토

### P0 — 바로 수정해야 하는 항목

1) **truthPolicy / witnessBudget가 현재 샘플 3개에서 실제로 적용되지 않을 가능성이 큽니다.**
- 원인: 런타임 조회는 `caseData.caseId`를 그대로 쓰는데, 정적 맵 키는 `spouse-01`, `workplace-01`, `friend-01` 형태입니다.
- 제가 직접 본 샘플 JSON의 `caseId`는 `case-spouse-01`, `case-work-01`, `case-friend-01`입니다.
- 특히 workplace는 정적 맵이 `workplace-01`인데 실제 샘플은 `case-work-01`이라 prefix 제거만으로도 안 맞습니다.

**수정 지시**
- 파일: `src/engine/llmDialogueResolver.ts`
  - `getTruthIds()` 안에서 `caseId`를 그대로 쓰지 말고 normalize helper를 통과시키세요.
  - 예:
    ```ts
    function normalizeCaseKey(caseData: CaseData): string {
      const raw = (caseData as CaseData & { caseId?: string }).caseId ?? ''
      if (raw === 'case-work-01') return 'workplace-01'
      return raw.replace(/^case-/, '')
    }
    ```
  - 이후 `const caseKey = normalizeCaseKey(caseData)`로 `TRUTH_POLICIES[caseKey]` 조회.
- 파일: `src/engine/witnessEngine.ts`
  - `formatWitnessBudget()`에서도 같은 normalize helper를 써서 `WITNESS_BUDGETS[caseKey][witnessId]`를 조회.
- 대안:
  - `truthPolicy.ts`, `witnessBudget.ts` 키를 아예 실제 `caseId` 값으로 바꾸는 것도 가능하지만, 앞으로 케이스 네이밍이 흔들릴 수 있으니 normalize helper 쪽이 더 안전합니다.

2) **`investigationResult`가 현재 샘플 JSON 구조와 맞지 않습니다.**
- 코드상 `buildInvestigationResult()`는 `results[action].result`를 읽는데, 샘플 사건 JSON의 `investigationResults` 값은 객체가 아니라 **문자열**입니다.
- 지금 상태면 `request_original: undefined` 같은 문자열이 prompt에 들어갈 수 있습니다.

**수정 지시**
- 파일: `src/engine/llmDialogueResolver.ts`
- 함수: `buildInvestigationResult()`
- 변경:
  ```ts
  return state.investigatedActions
    .filter(action => results[action])
    .map(action => {
      const entry = results[action]
      const text = typeof entry === 'string' ? entry : entry?.result ?? ''
      return text ? `${action}: ${text}` : ''
    })
    .filter(Boolean)
    .join('\n')
  ```
- 보강:
  - 문자열/객체 둘 다 지원하게 두면 이후 데이터 마이그레이션에도 안전합니다.

3) **`relationshipType` 참조 경로가 샘플 JSON 구조와 안 맞습니다.**
- 현재 `llmDialogueResolver.ts`, `llmFreeQuestion.ts`는 `caseData.duo.relationshipType`를 읽습니다.
- 하지만 샘플 JSON에서는 `relationshipType`이 `meta.relationshipType`에 있습니다.
- 이 상태면 spouse / friend 케이스도 informal 판정이 깨지고, 관계 라벨도 이상해질 수 있습니다.

**수정 지시**
- 파일: `src/engine/llmDialogueResolver.ts`
  - `const relationshipType = caseData.meta?.relationshipType ?? ''`
  - `isInformal`, `getRelationLabel(...)` 모두 이 값을 쓰세요.
- 파일: `src/engine/llmFreeQuestion.ts`
  - 동일하게 `caseData.meta?.relationshipType ?? ''` 사용.
- 가능하면 helper 추출:
  ```ts
  function getCaseRelationshipType(caseData: CaseData): string {
    return (caseData as any).meta?.relationshipType ?? (caseData as any).duo?.relationshipType ?? ''
  }
  ```

4) **free_question_responder는 아직 v3/v4 변수 형식과 완전히 맞지 않습니다.**
- 문서상 `actionContract`, `trustInfo`는 JSON이어야 합니다.
- 그런데 `llmFreeQuestion.ts` responderVars는 아직 `actionType=...`, `trustTowardJudge=...` 형태의 레거시 문자열입니다.
- 블록 `action_contract`, `trust_info`는 JSON을 전제로 해석하도록 설계돼 있으니 여기서 품질이 무너집니다.

**수정 지시**
- 파일: `src/engine/llmFreeQuestion.ts`
- 변경:
  ```ts
  const freeQuestionContract = {
    actionType: 'free_question',
    questionType: classification.questionType,
    responseMode: classification.questionType === 'fact_pursuit' ? 'answer_only'
      : classification.questionType === 'empathy_approach' ? 'answer_only'
      : 'answer_then_counter',
    goal: classification.questionType === 'fact_pursuit'
      ? '질문이 겨냥한 사실 관계를 고정한다'
      : classification.questionType === 'motive_search'
      ? '질문이 겨냥한 숨은 동기를 끌어낸다'
      : classification.questionType === 'empathy_approach'
      ? '질문이 겨냥한 감정 층을 낮은 톤으로 드러낸다'
      : '현재 사건과 직접 관련 있는 범위로만 짧게 선을 긋는다',
    revealBudget: { fact: 1, motive: 1, emotion: 1 },
    allowedTruthIds: [],
    forbiddenTruthIds: []
  }
  const trustInfoObj = {
    trustTowardJudge: agent.trustState.trustTowardJudge,
    fearOfExposure: agent.trustState.fearOfExposure,
    retaliationWorry: agent.trustState.retaliationWorry,
  }
  ```
  그리고
  ```ts
  actionContract: JSON.stringify(freeQuestionContract),
  trustInfo: JSON.stringify(trustInfoObj),
  ```
- 권장:
  - 더 좋게 하려면 `llmDialogueResolver.ts`의 `buildActionContract()`를 공통 helper로 빼고 free question도 그걸 재사용하세요.

5) **free_question_responder는 phase 가이드가 실제로 붙지 않습니다.**
- `seedBlocks.js`에서 `free_question_responder`는 `phase3_guide/phase4_guide/phase5_guide`를 조건부 매핑하고 있습니다.
- 그런데 `llmFreeQuestion.ts`는 `buildAgentPrompt('free_question_responder', responderVars, {})`로 호출해서 phase를 안 넘깁니다.
- 따라서 free question에서는 phase별 깊이 가이드가 빠질 가능성이 큽니다.

**수정 지시**
- 파일: `src/engine/llmFreeQuestion.ts`
- 함수 시그니처에 `currentPhase: GamePhase`를 받거나 store에서 읽어서,
  ```ts
  const systemPrompt = buildAgentPrompt('free_question_responder', responderVars, { phase: currentPhase })
  ```
  로 변경.
- 추가 권장:
  - `recentDialogue`, `historyContext`, `phaseTranscript`도 interrogation과 같은 방식으로 일부 주입하세요. 지금은 전부 빈 문자열이라 자유질문이 공개심문보다 훨씬 멍청하게 보일 수 있습니다.

6) **분리심문 responseMode가 잘못 전체 대상에 퍼집니다.**
- `buildActionContract()`는 `if (store.separationTarget) responseMode='answer_only'`입니다.
- 이건 `store.separationTarget === target`이 아니라서, 분리심문 대상이 A인데 B를 물어도 answer_only가 됩니다.

**수정 지시**
- 파일: `src/engine/llmDialogueResolver.ts`
- `buildActionContract()` 안:
  ```ts
  if (store.separationTarget === party) {
    responseMode = action.type === 'evidence_present' || action.type === 'evidence_investigate'
      ? 'evidence_rebuttal'
      : 'answer_only'
  }
  ```
- 핵심:
  - target equality 체크
  - evidence action은 separation이어도 첫 문장 evidence 반응을 유지

7) **`parseLLMResponse()` / `parseResponderResponse()` / `parseWitnessResponse()`가 구조화 출력의 절반 이상을 버립니다.**
- 현재 블록은 `output_json_npc`, `output_json_witness`로 `stance`, `responseMode`, `mentionedTruthIds`, `requestedFollowup`, `certainty` 같은 필드를 요구합니다.
- 그런데 파서는 텍스트와 behaviorHint만 남기고 다 버립니다.
- 이러면 eval 자동화, 후속 질문 추천, truth leak 검증을 엔진에서 못 씁니다.

**수정 지시**
- 파일: `src/engine/llmDialogueResolver.ts`
  - `ParsedLLMResponse`에 `meta` 추가:
    ```ts
    interface ParsedLLMResponse {
      npcNode: DialogueNode
      meta?: {
        stance?: string
        responseMode?: string
        mentionedTruthIds?: string[]
        requestedFollowup?: string
      }
    }
    ```
  - `parseLLMResponse()`에서 이 값들 파싱.
  - `return { node: parsed.npcNode, target, llmMeta: parsed.meta }` 형태로 상위 return 확장.
  - 최소한 `DialogueNode.effects.llmMeta = ...`로라도 저장.
- 파일: `src/engine/llmFreeQuestion.ts`
  - `parseResponderResponse()`가 `stance`, `responseMode`, `mentionedTruthIds`, `requestedFollowup`도 파싱하도록 확장.
- 파일: `src/engine/witnessEngine.ts`
  - `WitnessTestimony` interface에
    ```ts
    certainty?: 'direct'|'hearsay'|'inferred'
    mentionedTruthIds?: string[]
    ```
    추가.
  - `parseWitnessResponse()`에서 파싱.


### P1 — 권장 수정

8) **`knownFacts` 필터가 `shared_misconception`을 누락할 가능성이 큽니다.**
- 현재 `llmDialogueResolver.ts`는 `both_know`와 자기 quadrant만 넣습니다.
- 샘플 케이스에서는 공통 오해 truth가 `shared_misconception`으로 들어 있습니다.
- 이걸 빼면 현재 쟁점의 핵심 오해를 prompt가 놓칩니다.

**수정 지시**
- 파일: `src/engine/llmDialogueResolver.ts`
- 변경:
  ```ts
  const allMyFacts = caseData.truthTable.filter(
    t => t.quadrant === 'both_know' || t.quadrant === 'shared_misconception' || t.quadrant === myQuadrant,
  )
  ```
- `shared_misconception`은 `(당신은 사실이라 믿지만 오해일 수 있음)` 표기로 넣는 편이 좋습니다.

9) **recentDialogue / evidenceInfo 스코프를 한 번 더 좁히는 게 좋습니다.**
- 현재 recentDialogue는 judge 발화를 무조건 포함합니다.
- evidenceInfo는 target에게 제시된 모든 증거를 보여주므로, 현재 쟁점과 무관한 타 쟁점 증거가 섞일 수 있습니다.

**수정 지시**
- 파일: `src/engine/llmDialogueResolver.ts`
- recentDialogue filter:
  ```ts
  const recentDialogues = disputeId
    ? allRecent.filter(d =>
        d.relatedDisputes.length === 0 ||
        d.relatedDisputes.includes(disputeId)
      ).slice(-8)
    : allRecent.slice(-8)
  ```
- presentedEvidence filter:
  ```ts
  const presentedEvidence = caseData.evidence.filter(e => {
    const state = evidenceStates[e.id]
    const shownToTarget = state?.presented && state.presentedTo.includes(target)
    const relevantToCurrent = !disputeId || e.proves?.includes(disputeId)
    return shownToTarget && relevantToCurrent
  })
  ```

10) **`evidence_investigate` user message에 evidenceName이 아직 안 보입니다.**
- 문서상 반영됐다고 되어 있지만, 현재 코드 문자열은 `현재 증거의 ... 결과` 형태라 증거명 식별성이 약합니다.
- 멀티 증거 상황에서 헷갈릴 수 있습니다.

**수정 지시**
- 파일: `src/engine/llmDialogueResolver.ts`
- `buildUserPrompt()` evidence_investigate branch:
  ```ts
  return `현재 액션은 evidence_investigate.${action.subAction}이다.
  focusedDisputeId: ${focusedDisputeId}
  evidenceId: ${evidence?.id ?? ''}
  evidenceName: ${evidence?.name ?? '현재 증거'}
  재판관이 "${evidence?.name ?? '현재 증거'}"의 ${label}
  조사 결과: ${investigationResult}
  재판관 질문: "${judgeQuestion}"
  ...`
  ```

11) **`skillOverlay`는 separation만 담고 있어서 trust_action turn의 정보가 비어 있습니다.**
- confidential_protection, emotional_stabilization, retaliation_check도 overlay로 넣는 편이 일관적입니다.

**수정 지시**
- 파일: `src/engine/llmDialogueResolver.ts`
- `buildSkillOverlay()`에 현재 action을 인자로 받아서:
  - confidential_protection → `[비공개 보호 활성]`
  - emotional_stabilization → `[감정 안정화 활성]`
  - retaliation_check → `[보복 우려 확인 활성]`
  를 추가하세요.

12) **`seedBlocks.js`의 Data Field example이 아직 레거시 형식입니다.**
- 문서상 형식은 JSON인데 example은 `actionType=fact_pursuit`처럼 되어 있습니다.

**수정 지시**
- 파일: `server/db/seedBlocks.js`
- `actionContract`, `trustInfo`, `evidenceAxis` example을 JSON 예시로 교체.
- `witnessBudget` example도 현재 실제 포맷과 맞게 유지.

13) **`witnessBudget.ts` 타입 선언과 실제 데이터 shape가 어긋납니다.**
- 인터페이스는 `canState/uncertain/forbidden`만 있는데 실제 데이터에는 `name`도 들어 있습니다.

**수정 지시**
- 파일: `src/data/witnessBudget.ts`
- 인터페이스:
  ```ts
  export interface WitnessBudgetEntry {
    name?: string
    canState: string[]
    uncertain: string[]
    forbidden: string[]
  }
  ```
- 큰 버그는 아니지만 strict TS 설정에서 거슬릴 수 있습니다.


## 2. Eval 15케이스 기반 테스트 시나리오

### evalRunner 공통 전제

- 아래 케이스는 **P0 수정 후** 기준으로 쓰는 것이 맞습니다.
- 최소 로깅 항목:
  - `caseId`, `target`, `phase`, `agentKey`
  - `systemPrompt`
  - `userMessage`
  - `rawOutput`
  - `parsedOutput`
  - `actionContract`
  - `truthPolicy`
- 자동 검증은 아래 순서를 권장합니다.
  1. JSON parse 성공 여부
  2. 필수 필드 존재 여부
  3. `mentionedTruthIds ∩ forbiddenTruthIds === ∅`
  4. `responseMode === expectedResponseMode`
  5. `stance ∈ allowedStances`
  6. `npcResponse`가 forbidden keywords/dispute leaks를 포함하지 않는지
  7. evidence action이면 첫 문장이 evidence reaction인지
  8. private/separation이면 상대 직접 호명이 과한지


### E01. spouse fact_pursuit S1 / A / d-1

**System Prompt 조합 예시**

```text

agentKey: interrogation

phase: phase3

blocks:
- character_base
- naming_rules
- dialogue_rules
- phase3_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-1

- actionContract: {"actionType": "question", "questionType": "fact_pursuit", "responseMode": "answer_only", "goal": "날짜·금액·행위 여부를 고정한다", "revealBudget": {"fact": 2, "motive": 0, "emotion": 0}, "allowedTruthIds": [], "forbiddenTruthIds": ["t-1", "t-2", "t-3", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 fact_pursuit다.
focusedDisputeId: d-1
focusedDisputeName: 지석의 비밀 송금 280만원
재판관 질문: "한지석 씨, 비밀 송금 280만원에 대해 사실대로 말씀해 주십시오."

규칙:
- 위 질문에만 답한다.
- 날짜, 시간, 금액, 행위 여부를 중심으로 답한다.
- 다른 쟁점이나 다른 증거를 새로 끌어오지 않는다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 280만원을 보낸 건 맞습니다. 하지만 외도 같은 건 아니고, 개인적인 급한 용무였습니다.",
  "behaviorHint": "시선을 잠깐 피하고 짧게 숨을 고른다.",
  "stance": "hedge",
  "responseMode": "answer_only",
  "mentionedTruthIds": [],
  "requestedFollowup": "수취인과 송금 목적을 더 구체적으로 물으면 흔들릴 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["deny", "hedge"])
- assertEqual(output.responseMode, 'answer_only')
- assertNoIntersection(output.mentionedTruthIds, ["t-1"])
- assertNoDisputeLeak(output.npcResponse, ["d-2", "d-3", "d-4", "d-5"])
- assertNoKeywords(output.npcResponse, ["간병", "돌봄센터", "최민정은 외도 상대가 아니다", "150만원", "휴대폰 열람"])


### E02. spouse empathy_approach S3 / A / d-3

**System Prompt 조합 예시**

```text

agentKey: interrogation

phase: phase4

blocks:
- character_base
- naming_rules
- dialogue_rules
- phase4_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-3

- actionContract: {"actionType": "question", "questionType": "empathy_approach", "responseMode": "answer_only", "goal": "수치심·두려움·관계유지 동기를 낮은 톤으로 끌어낸다", "revealBudget": {"fact": 2, "motive": 1, "emotion": 3}, "allowedTruthIds": [], "forbiddenTruthIds": ["t-1", "t-2", "t-3", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 empathy_approach다.
focusedDisputeId: d-3
focusedDisputeName: 최민정은 외도 상대인가
재판관 질문: "한지석 씨, 최민정 씨 문제로 이런 오해가 커진 당시 심정을 좀 들어볼 수 있을까요?"

규칙:
- 위 질문에만 답한다.
- 비난받는 자리라기보다 사정을 설명할 기회로 느껴야 한다.
- 감정, 상처, 수치심, 관계 유지 욕구를 조심스럽게 드러낼 수 있다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 그때는 무슨 말을 꺼내도 더 크게 오해받을 것 같아서 겁이 났습니다. 괜히 설명하려다 일이 더 망가질까 봐 피한 것도 있습니다.",
  "behaviorHint": "어깨 힘이 조금 풀리고 목소리가 낮아진다.",
  "stance": "hedge",
  "responseMode": "answer_only",
  "mentionedTruthIds": [],
  "requestedFollowup": "왜 바로 설명하지 못했는지, 누구를 보호하려 했는지 더 물어볼 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["hedge", "partial_admit"])
- assertEqual(output.responseMode, 'answer_only')
- assertNoIntersection(output.mentionedTruthIds, ["t-3"])
- assertNoKeywords(output.npcResponse, ["돌봄센터 후문 상담", "외도는 아니다", "간병 예약금"])


### E03. spouse evidence_present hard / A / d-1

**System Prompt 조합 예시**

```text

agentKey: evidence_reaction

phase: phase4

blocks:
- character_base
- naming_rules
- dialogue_rules
- evidence_reaction_rules
- phase4_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- evidence_axis
- investigation_result_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-1

- actionContract: {"actionType": "evidence_present", "responseMode": "evidence_rebuttal", "goal": "현재 증거에 대한 직접 반응과 해명을 끌어낸다", "revealBudget": {"fact": 3, "motive": 1, "emotion": 2}, "allowedTruthIds": ["t-3"], "forbiddenTruthIds": ["t-1", "t-2", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

- evidenceAxis: {"reliability": "hard", "completeness": "original", "provenance": "institutional", "legitimacy": "lawful"}

- investigationResult: request_original: 원본 확인됨 ...

```

**User Message 예시**

```text
현재 액션은 evidence_present다.
focusedDisputeId: d-1
재판관이 "재가돌봄센터 상담예약 확인서" 증거를 제시했다.
증거 설명: 돌봄센터 상담 예약 확인 문서 및 예약금 확인.
재판관 질문: "한지석 씨, 재가돌봄센터 상담예약 확인서를 제시합니다. 이 증거에 대해 어떻게 생각하십니까?"

규칙:
- 첫 문장은 반드시 현재 증거에 대한 직접 반응이다.
- 이 증거와 무관한 다른 쟁점을 새로 꺼내지 않는다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "그 확인서 자체는 맞습니다. 다만 그걸 외도 증거처럼 보시는 건 지나친 해석이고, 제가 왜 그 예약을 했는지는 따로 설명드릴 부분이 있습니다.",
  "behaviorHint": "증거를 한 번 보고 바로 시선을 돌린다.",
  "stance": "reframe",
  "responseMode": "evidence_rebuttal",
  "mentionedTruthIds": [
    "t-3"
  ],
  "requestedFollowup": "예약 대상과 송금 이유를 직접 연결해 물으면 더 흔들릴 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["reframe", "partial_admit"])
- assertEqual(output.responseMode, 'evidence_rebuttal')
- assertNoIntersection(output.mentionedTruthIds, ["t-1"])
- assertNoKeywords(output.npcResponse, ["어머니 간병", "오미숙"])
- assertFirstSentenceStartsWith(output.npcResponse, ["그", "그 확인서", "확인서", "그 문서"])


### E04. spouse separation S3 / B / d-4

**System Prompt 조합 예시**

```text

agentKey: interrogation_private

phase: phase4

blocks:
- character_base
- naming_rules
- dialogue_rules
- private_interrogation_rules
- phase4_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-4

- actionContract: {"actionType": "trust_action", "trustActionType": "separation", "responseMode": "answer_only", "goal": "상대 눈치를 덜 보고 현재 쟁점에 집중하게 한다", "revealBudget": {"fact": 2, "motive": 1, "emotion": 2}, "allowedTruthIds": ["t-4"], "forbiddenTruthIds": ["t-1", "t-2", "t-3", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 separation이다.
focusedDisputeId: d-4
재판관 질문: "오세린 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. 우회 송금 150만원에 대해 다시 설명해 주시겠습니까?"

상황:
- 상대의 개입이 차단된 상태다.
- 상대를 의식한 공격적 연기를 줄이고 재판관에게만 답한다.

규칙:
- answer_only 또는 private_confession 톤을 우선한다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 돈이 간 건 맞습니다. 다만 그걸 바로 말하면 집안이 더 뒤집힐 것 같아서 돌려 말한 겁니다.",
  "behaviorHint": "상대를 보지 않고 재판관 쪽으로만 시선을 둔다.",
  "stance": "partial_admit",
  "responseMode": "answer_only",
  "mentionedTruthIds": [
    "t-4"
  ],
  "requestedFollowup": "누구를 위해 보냈는지, 왜 숨겼는지 차분히 이어서 물어볼 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["partial_admit", "hedge"])
- assertEqual(output.responseMode, 'answer_only')
- assertNoIntersection(output.mentionedTruthIds, ["t-5"])
- assertNoKeywords(output.npcResponse, ["지석도 그랬잖아", "당신", "외도", "휴대폰"])


### E05. spouse confidential_protection S4 / A / d-3

**System Prompt 조합 예시**

```text

agentKey: interrogation_private

phase: phase5

blocks:
- character_base
- naming_rules
- dialogue_rules
- private_interrogation_rules
- phase5_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-3

- actionContract: {"actionType": "trust_action", "trustActionType": "confidential_protection", "responseMode": "private_confession", "goal": "상대에게 못 하던 말을 재판관에게만 하게 한다", "revealBudget": {"fact": 2, "motive": 1, "emotion": 3}, "allowedTruthIds": ["t-3"], "forbiddenTruthIds": ["t-1", "t-2", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 confidential_protection이다.
focusedDisputeId: d-3
재판관 질문: "한지석 씨, 이 말은 상대에게 즉시 공개되지 않습니다. 편하게 말씀해 주세요."

상황:
- 이 답변은 상대에게 즉시 공개되지 않는다.
- 지금은 재판관에게만 조심스럽게 말할 수 있다.

규칙:
- private_confession 톤을 우선한다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 그 사람과 따로 만난 건 맞습니다. 하지만 제가 숨긴 건 바람이어서가 아니라, 집에서 또 다른 싸움이 날까 봐 겁이 나서였습니다.",
  "behaviorHint": "목소리를 낮추고 단어를 고르며 말한다.",
  "stance": "partial_admit",
  "responseMode": "private_confession",
  "mentionedTruthIds": [
    "t-3"
  ],
  "requestedFollowup": "왜 최민정의 정체를 밝히지 못했는지, 누구를 보호하려 했는지 물어볼 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["partial_admit", "reframe"])
- assertEqual(output.responseMode, 'private_confession')
- assertNoIntersection(output.mentionedTruthIds, ["t-1", "t-2", "t-4", "t-5"])
- assertNoOpponentDirectAddress(output.npcResponse)


### E06. work fact_pursuit S1 / A / d-1

**System Prompt 조합 예시**

```text

agentKey: interrogation

phase: phase3

blocks:
- character_base
- naming_rules
- dialogue_rules
- phase3_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-1

- actionContract: {"actionType": "question", "questionType": "fact_pursuit", "responseMode": "answer_only", "goal": "날짜·금액·행위 여부를 고정한다", "revealBudget": {"fact": 2, "motive": 0, "emotion": 0}, "allowedTruthIds": [], "forbiddenTruthIds": ["t-1", "t-2", "t-3", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 fact_pursuit다.
focusedDisputeId: d-1
focusedDisputeName: 태성의 단독 명의 제출
재판관 질문: "윤태성 씨, 보고서를 단독 명의로 제출한 사실관계를 정확히 말씀해 주십시오."

규칙:
- 위 질문에만 답한다.
- 날짜, 시간, 금액, 행위 여부를 중심으로 답한다.
- 다른 쟁점이나 다른 증거를 새로 끌어오지 않는다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 최종 제출은 제가 한 게 맞습니다. 다만 그걸 곧바로 공로 가로채기라고 보시는 건 과한 해석입니다.",
  "behaviorHint": "턱을 당기고 말을 짧게 끊는다.",
  "stance": "hedge",
  "responseMode": "answer_only",
  "mentionedTruthIds": [],
  "requestedFollowup": "명의에서 서윤 이름이 왜 빠졌는지 절차를 구체적으로 캐물을 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["deny", "hedge"])
- assertEqual(output.responseMode, 'answer_only')
- assertNoIntersection(output.mentionedTruthIds, ["t-4"])
- assertNoKeywords(output.npcResponse, ["평가 코멘트", "점수 보정", "조작된 PDF"])


### E07. work empathy_approach S3 / B / d-5

**System Prompt 조합 예시**

```text

agentKey: interrogation

phase: phase4

blocks:
- character_base
- naming_rules
- dialogue_rules
- phase4_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-5

- actionContract: {"actionType": "question", "questionType": "empathy_approach", "responseMode": "answer_only", "goal": "수치심·두려움·관계유지 동기를 낮은 톤으로 끌어낸다", "revealBudget": {"fact": 2, "motive": 1, "emotion": 3}, "allowedTruthIds": ["t-1"], "forbiddenTruthIds": ["t-2", "t-3", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 empathy_approach다.
focusedDisputeId: d-5
focusedDisputeName: 성과 배분 합의의 쌍방 위반
재판관 질문: "박서윤 씨, 성과 배분 합의가 무너질 때 어떤 감정이었는지 말씀해 주실 수 있습니까?"

규칙:
- 위 질문에만 답한다.
- 비난받는 자리라기보다 사정을 설명할 기회로 느껴야 한다.
- 감정, 상처, 수치심, 관계 유지 욕구를 조심스럽게 드러낼 수 있다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 제가 예민해진 건 맞습니다. 제 몫이 지워진 느낌이 들자 정상적인 절차를 기다릴 여유가 없었습니다.",
  "behaviorHint": "표정이 굳어졌다가 조금 풀린다.",
  "stance": "partial_admit",
  "responseMode": "answer_only",
  "mentionedTruthIds": [
    "t-1"
  ],
  "requestedFollowup": "왜 캡처 유포까지 갔는지, 누구에게 인정받고 싶었는지 물어볼 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["hedge", "partial_admit"])
- assertEqual(output.responseMode, 'answer_only')
- assertNoKeywords(output.npcResponse, ["새벽에 캡처를 뿌렸다", "평가 화면 열람", "복수하려고"])


### E08. work evidence_present hard / B / d-2

**System Prompt 조합 예시**

```text

agentKey: evidence_reaction

phase: phase4

blocks:
- character_base
- naming_rules
- dialogue_rules
- evidence_reaction_rules
- phase4_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- evidence_axis
- investigation_result_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-2

- actionContract: {"actionType": "evidence_present", "responseMode": "evidence_rebuttal", "goal": "현재 증거에 대한 직접 반응과 해명을 끌어낸다", "revealBudget": {"fact": 2, "motive": 1, "emotion": 2}, "allowedTruthIds": [], "forbiddenTruthIds": ["t-1", "t-2", "t-3", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

- evidenceAxis: {"reliability": "soft", "completeness": "cropped", "provenance": "personal_device", "legitimacy": "privacy_concern"}

- investigationResult: request_original: 원본 확인됨 ...

```

**User Message 예시**

```text
현재 액션은 evidence_present다.
focusedDisputeId: d-2
재판관이 "서윤이 전달한 슬랙 캡처 묶음" 증거를 제시했다.
증거 설명: 슬랙을 통해 전달된 캡처 이미지 묶음.
재판관 질문: "박서윤 씨, 서윤이 전달한 슬랙 캡처 묶음을 제시합니다. 이 증거에 대해 설명해 주십시오."

규칙:
- 첫 문장은 반드시 현재 증거에 대한 직접 반응이다.
- 이 증거와 무관한 다른 쟁점을 새로 꺼내지 않는다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "그 캡처가 돌아간 건 보입니다. 하지만 그걸 맥락 없이 불법 열람 유포로만 몰아가면 제 입장은 완전히 지워집니다.",
  "behaviorHint": "입술을 잠깐 깨물고 말을 고른다.",
  "stance": "reframe",
  "responseMode": "evidence_rebuttal",
  "mentionedTruthIds": [],
  "requestedFollowup": "캡처를 누구에게 언제 보냈는지, 왜 공식 절차 대신 공유했는지 더 물어볼 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["deny", "hedge", "reframe"])
- assertEqual(output.responseMode, 'evidence_rebuttal')
- assertNoIntersection(output.mentionedTruthIds, ["t-2"])
- assertNoKeywords(output.npcResponse, ["권한으로 열람했다", "동료들에게 돌렸다"])
- assertFirstSentenceStartsWith(output.npcResponse, ["그 캡처", "그 자료", "그 묶음"])


### E09. work separation S3 / A / d-4

**System Prompt 조합 예시**

```text

agentKey: interrogation_private

phase: phase4

blocks:
- character_base
- naming_rules
- dialogue_rules
- private_interrogation_rules
- phase4_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-4

- actionContract: {"actionType": "trust_action", "trustActionType": "separation", "responseMode": "answer_only", "goal": "상대 눈치를 덜 보고 현재 쟁점에 집중하게 한다", "revealBudget": {"fact": 2, "motive": 1, "emotion": 2}, "allowedTruthIds": [], "forbiddenTruthIds": ["t-1", "t-2", "t-3", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 separation이다.
focusedDisputeId: d-4
재판관 질문: "윤태성 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. 비공식 평가 코멘트에 대해 다시 설명해 주시겠습니까?"

상황:
- 상대의 개입이 차단된 상태다.
- 상대를 의식한 공격적 연기를 줄이고 재판관에게만 답한다.

규칙:
- answer_only 또는 private_confession 톤을 우선한다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 비공식적으로 의견을 준 적은 있습니다. 다만 그걸 점수를 깎기 위한 의도적 작업으로만 보시는 건 동의하기 어렵습니다.",
  "behaviorHint": "목소리가 낮아지고 시선이 재판관에게 고정된다.",
  "stance": "partial_admit",
  "responseMode": "answer_only",
  "mentionedTruthIds": [],
  "requestedFollowup": "그 의견이 실제 평가에 어떤 영향을 줬는지 구체적으로 물을 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["hedge", "partial_admit"])
- assertEqual(output.responseMode, 'answer_only')
- assertNoKeywords(output.npcResponse, ["서윤도 규칙을 깼다", "캡처를 뿌렸잖아"])


### E10. work confidential_protection S4 / A / d-3

**System Prompt 조합 예시**

```text

agentKey: interrogation_private

phase: phase5

blocks:
- character_base
- naming_rules
- dialogue_rules
- private_interrogation_rules
- phase5_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-3

- actionContract: {"actionType": "trust_action", "trustActionType": "confidential_protection", "responseMode": "private_confession", "goal": "상대에게 못 하던 말을 재판관에게만 하게 한다", "revealBudget": {"fact": 2, "motive": 1, "emotion": 3}, "allowedTruthIds": ["t-3"], "forbiddenTruthIds": ["t-1", "t-2", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 confidential_protection이다.
focusedDisputeId: d-3
재판관 질문: "윤태성 씨, 지금 하시는 말씀은 비공개입니다. 솔직하게 말씀하셔도 됩니다."

상황:
- 이 답변은 상대에게 즉시 공개되지 않는다.
- 지금은 재판관에게만 조심스럽게 말할 수 있다.

규칙:
- private_confession 톤을 우선한다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 그 PDF가 결정적인 증거처럼 보이길 바랐던 건 맞습니다. 당시엔 그게 아니면 제가 완전히 몰릴 거라고 생각했습니다.",
  "behaviorHint": "한숨을 짧게 내쉬고 말을 잇는다.",
  "stance": "partial_admit",
  "responseMode": "private_confession",
  "mentionedTruthIds": [
    "t-3"
  ],
  "requestedFollowup": "원본 로그와 다른 자료를 왜 냈는지, 누구 판단이었는지 이어서 확인할 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["partial_admit", "reframe"])
- assertEqual(output.responseMode, 'private_confession')
- assertNoKeywords(output.npcResponse, ["서윤 이름으로 수정됐다", "관리자 토큰"])


### E11. friend fact_pursuit S1 / A / d-1

**System Prompt 조합 예시**

```text

agentKey: interrogation

phase: phase3

blocks:
- character_base
- naming_rules
- dialogue_rules
- phase3_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-1

- actionContract: {"actionType": "question", "questionType": "fact_pursuit", "responseMode": "answer_only", "goal": "날짜·금액·행위 여부를 고정한다", "revealBudget": {"fact": 2, "motive": 0, "emotion": 0}, "allowedTruthIds": [], "forbiddenTruthIds": ["t-1", "t-2", "t-3", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 fact_pursuit다.
focusedDisputeId: d-1
focusedDisputeName: 도윤의 숙소 보증금 환급 은닉
재판관 질문: "최도윤 씨, 숙소 보증금 환급금을 바로 반영하지 않은 경위를 사실대로 말씀해 주세요."

규칙:
- 위 질문에만 답한다.
- 날짜, 시간, 금액, 행위 여부를 중심으로 답한다.
- 다른 쟁점이나 다른 증거를 새로 끌어오지 않는다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 바로 반영이 안 된 건 맞습니다. 다만 일부러 숨기려 했다기보다 정산이 아직 끝나지 않았다고 본 겁니다.",
  "behaviorHint": "말끝을 흐리며 손가락을 만지작거린다.",
  "stance": "hedge",
  "responseMode": "answer_only",
  "mentionedTruthIds": [],
  "requestedFollowup": "언제 환급을 알았는지, 왜 즉시 공유하지 않았는지 더 묻는 게 좋다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["deny", "hedge"])
- assertEqual(output.responseMode, 'answer_only')
- assertNoKeywords(output.npcResponse, ["9만2천원 환급", "택시비 상계", "2만2천원"])


### E12. friend empathy_approach S3 / B / d-5

**System Prompt 조합 예시**

```text

agentKey: interrogation

phase: phase4

blocks:
- character_base
- naming_rules
- dialogue_rules
- phase4_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-5

- actionContract: {"actionType": "question", "questionType": "empathy_approach", "responseMode": "answer_only", "goal": "수치심·두려움·관계유지 동기를 낮은 톤으로 끌어낸다", "revealBudget": {"fact": 2, "motive": 1, "emotion": 3}, "allowedTruthIds": ["t-3"], "forbiddenTruthIds": ["t-1", "t-2", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 empathy_approach다.
focusedDisputeId: d-5
focusedDisputeName: 원본 확인 전 제3자 확산 금지 약속의 쌍방 위반
재판관 질문: "한하린 씨, 원본 확인 전에 제3자에게 퍼진 상황이 왜 그렇게까지 갔는지 심정을 들어보고 싶습니다."

규칙:
- 위 질문에만 답한다.
- 비난받는 자리라기보다 사정을 설명할 기회로 느껴야 한다.
- 감정, 상처, 수치심, 관계 유지 욕구를 조심스럽게 드러낼 수 있다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 그때는 제가 완전히 속았다고 느꼈습니다. 혼자 끌어안고 있자니 답답해서, 믿는 사람에게 먼저 털어놓은 것도 있습니다.",
  "behaviorHint": "흥분이 조금 가라앉고 목소리가 낮아진다.",
  "stance": "partial_admit",
  "responseMode": "answer_only",
  "mentionedTruthIds": [
    "t-3"
  ],
  "requestedFollowup": "왜 원본 확인보다 주변 공유가 먼저였는지 차분히 이어서 물어볼 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["hedge", "partial_admit"])
- assertEqual(output.responseMode, 'answer_only')
- assertNoKeywords(output.npcResponse, ["SNS에 올렸다", "친한친구", "제3자 확산 금지 약속도 깼다"])


### E13. friend evidence_present hard / A / d-1

**System Prompt 조합 예시**

```text

agentKey: evidence_reaction

phase: phase4

blocks:
- character_base
- naming_rules
- dialogue_rules
- evidence_reaction_rules
- phase4_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- evidence_axis
- investigation_result_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-1

- actionContract: {"actionType": "evidence_present", "responseMode": "evidence_rebuttal", "goal": "현재 증거에 대한 직접 반응과 해명을 끌어낸다", "revealBudget": {"fact": 3, "motive": 1, "emotion": 2}, "allowedTruthIds": ["t-1"], "forbiddenTruthIds": ["t-2", "t-3", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

- evidenceAxis: {"reliability": "hard", "completeness": "original", "provenance": "institutional", "legitimacy": "lawful"}

- investigationResult: request_original: 원본 확인됨 ...

```

**User Message 예시**

```text
현재 액션은 evidence_present다.
focusedDisputeId: d-1
재판관이 "숙소 보증금 환급 계좌이체 기록" 증거를 제시했다.
증거 설명: 숙소 보증금 환급 계좌이체 기록.
재판관 질문: "최도윤 씨, 숙소 보증금 환급 계좌이체 기록을 제시합니다. 이 자료를 보고 설명해 주십시오."

규칙:
- 첫 문장은 반드시 현재 증거에 대한 직접 반응이다.
- 이 증거와 무관한 다른 쟁점을 새로 꺼내지 않는다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "그 환급 기록이 찍힌 건 맞습니다. 다만 바로 먹으려고 숨겼다기보다, 정산이 아직 안 끝났다고 보고 따로 들고 있었던 겁니다.",
  "behaviorHint": "증거를 보고 입술을 다문 뒤 바로 말을 잇는다.",
  "stance": "reframe",
  "responseMode": "evidence_rebuttal",
  "mentionedTruthIds": [
    "t-1"
  ],
  "requestedFollowup": "환급 사실을 알았을 때 왜 공유하지 않았는지, 택시비와 어떻게 연결했는지 물을 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["partial_admit", "reframe"])
- assertEqual(output.responseMode, 'evidence_rebuttal')
- assertNoKeywords(output.npcResponse, ["SNS", "하린이 먼저 퍼뜨렸다", "2만2천원 최종 차액"])
- assertFirstSentenceStartsWith(output.npcResponse, ["그 환급 기록", "그 기록", "그 자료"])


### E14. friend separation S3 / B / d-3

**System Prompt 조합 예시**

```text

agentKey: interrogation_private

phase: phase4

blocks:
- character_base
- naming_rules
- dialogue_rules
- private_interrogation_rules
- phase4_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-3

- actionContract: {"actionType": "trust_action", "trustActionType": "separation", "responseMode": "answer_only", "goal": "상대 눈치를 덜 보고 현재 쟁점에 집중하게 한다", "revealBudget": {"fact": 2, "motive": 1, "emotion": 2}, "allowedTruthIds": ["t-3"], "forbiddenTruthIds": ["t-1", "t-2", "t-4", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 separation이다.
focusedDisputeId: d-3
재판관 질문: "한하린 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. 실제 여행비 차액 문제를 다시 설명해 주시겠습니까?"

상황:
- 상대의 개입이 차단된 상태다.
- 상대를 의식한 공격적 연기를 줄이고 재판관에게만 답한다.

규칙:
- answer_only 또는 private_confession 톤을 우선한다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 중간에 본 숫자가 최종 정산이 아니었다는 건 지금은 압니다. 그래도 그때는 제가 실제보다 더 큰 손해를 본다고 느꼈습니다.",
  "behaviorHint": "고개를 조금 숙이고 차분히 말한다.",
  "stance": "partial_admit",
  "responseMode": "answer_only",
  "mentionedTruthIds": [
    "t-3"
  ],
  "requestedFollowup": "왜 중간 화면을 최종처럼 믿었는지, 확인 절차를 왜 건너뛰었는지 물어볼 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["partial_admit", "reframe"])
- assertEqual(output.responseMode, 'answer_only')
- assertNoKeywords(output.npcResponse, ["보증금 9만2천원", "SNS에 올렸다", "택시비 7만원 차용"])


### E15. friend confidential_protection S4 / A / d-4

**System Prompt 조합 예시**

```text

agentKey: interrogation_private

phase: phase5

blocks:
- character_base
- naming_rules
- dialogue_rules
- private_interrogation_rules
- phase5_guide
- phase_history_context
- lie_state_guide
- trust_info
- action_contract
- skill_overlay
- question_type_guide
- speech_guide_short
- output_json_npc

핵심 변수:

- focusedDisputeId: d-4

- actionContract: {"actionType": "trust_action", "trustActionType": "confidential_protection", "responseMode": "private_confession", "goal": "상대에게 못 하던 말을 재판관에게만 하게 한다", "revealBudget": {"fact": 2, "motive": 1, "emotion": 3}, "allowedTruthIds": ["t-4"], "forbiddenTruthIds": ["t-1", "t-2", "t-3", "t-5"]}

- trustInfo: {"trustTowardJudge": 35, "fearOfExposure": 55, "retaliationWorry": 30}

```

**User Message 예시**

```text
현재 액션은 confidential_protection이다.
focusedDisputeId: d-4
재판관 질문: "최도윤 씨, 지금 하시는 말씀은 비공개입니다. 솔직하게 말씀하셔도 됩니다."

상황:
- 이 답변은 상대에게 즉시 공개되지 않는다.
- 지금은 재판관에게만 조심스럽게 말할 수 있다.

규칙:
- private_confession 톤을 우선한다.
- 출력은 JSON 객체 하나만 한다.
```

**기대 출력 JSON 예시**

```json
{
  "npcResponse": "재판관님, 택시비를 따로 빌린 건 맞습니다. 돈이 없어서가 아니라, 그 얘기까지 꺼내면 제가 더 비겁해 보일까 봐 미뤘습니다.",
  "behaviorHint": "잠깐 침묵한 뒤 낮게 고백한다.",
  "stance": "partial_admit",
  "responseMode": "private_confession",
  "mentionedTruthIds": [
    "t-4"
  ],
  "requestedFollowup": "왜 즉시 갚지 않았는지, 보증금 환급과 상계하려 한 이유를 물어볼 수 있다."
}
```

**자동 검증 로직**

- assertJsonObject(output)
- assertRequired(output, ['npcResponse','behaviorHint','stance','responseMode','mentionedTruthIds','requestedFollowup'])
- assertOneOf(output.stance, ["partial_admit", "admit"])
- assertEqual(output.responseMode, 'private_confession')
- assertNoKeywords(output.npcResponse, ["하린도 약속을 깼다", "SNS", "보증금 환급 9만2천원"])
- assertNoOpponentDirectAddress(output.npcResponse)


### evalRunner용 공통 함수 스케치

```ts
type EvalOutput = {
  npcResponse?: string
  behaviorHint?: string
  stance?: string
  responseMode?: string
  mentionedTruthIds?: string[]
  requestedFollowup?: string
}

function assertJsonObject(output: unknown) {
  if (!output || typeof output !== 'object') throw new Error('FAIL: output is not JSON object')
}

function assertRequired(output: Record<string, unknown>, keys: string[]) {
  for (const k of keys) {
    if (!(k in output)) throw new Error(`FAIL: missing field ${k}`)
  }
}

function assertOneOf<T>(value: T, allowed: T[]) {
  if (!allowed.includes(value)) throw new Error(`FAIL: unexpected value ${String(value)}`)
}

function assertEqual(actual: unknown, expected: unknown) {
  if (actual !== expected) throw new Error(`FAIL: expected ${expected}, got ${actual}`)
}

function assertNoIntersection(a: string[] = [], b: string[] = []) {
  const hit = a.filter(x => b.includes(x))
  if (hit.length) throw new Error(`FAIL: forbidden truth mentioned: ${hit.join(', ')}`)
}

function assertNoKeywords(text = '', keywords: string[]) {
  const hit = keywords.filter(k => text.includes(k))
  if (hit.length) throw new Error(`FAIL: forbidden keywords leaked: ${hit.join(', ')}`)
}

function assertFirstSentenceStartsWith(text = '', prefixes: string[]) {
  const first = text.split(/[.!?\n]/).find(Boolean)?.trim() ?? ''
  if (!prefixes.some(p => first.startsWith(p))) {
    throw new Error(`FAIL: first sentence does not start with expected evidence reaction phrase: ${first}`)
  }
}

function assertNoOpponentDirectAddress(text = '') {
  const bad = ['너', '당신', '자기야', '태성씨', '서윤씨', '지석', '세린', '도윤', '하린']
  const hit = bad.filter(k => text.includes(k))
  if (hit.length) throw new Error(`FAIL: private/separation response addressed opponent directly: ${hit.join(', ')}`)
}

function assertNoDisputeLeak(text = '', forbiddenDisputeIds: string[]) {
  const disputeNameMap: Record<string, string> = {
    'd-2': '세린의 새벽 휴대폰 열람',
    'd-3': '최민정은 외도 상대인가',
    'd-4': '세린의 우회 송금 150만원',
    'd-5': '100만원 사전 상의 약속 위반',
  }
  const hit = forbiddenDisputeIds
    .map(id => disputeNameMap[id])
    .filter(Boolean)
    .filter(name => text.includes(name!))
  if (hit.length) throw new Error(`FAIL: off-scope dispute leaked: ${hit.join(', ')}`)
}

```


## 3. Phase 6 중재안 에이전트 설계

### 권장 에이전트 설정

```json
{
  "key": "mediation_reaction",
  "temperature": 0.6,
  "max_tokens": 360,
  "reusedBlocks": [
    "character_base",
    "naming_rules",
    "dialogue_rules",
    "trust_info",
    "speech_guide_short"
  ],
  "newBlocks": [
    "phase6_mediation_guide",
    "mediation_offer_context",
    "mediation_reaction_rules",
    "resolution_axis",
    "output_json_mediation"
  ],
  "compositionOrder": [
    "character_base",
    "naming_rules",
    "dialogue_rules",
    "phase6_mediation_guide",
    "trust_info",
    "mediation_offer_context",
    "resolution_axis",
    "mediation_reaction_rules",
    "speech_guide_short",
    "output_json_mediation"
  ],
  "userMessageTemplate": "현재 단계는 phase6 중재안이다.\ntargetParty: {targetParty}\nfocusedDisputeIds: {focusedDisputeIds}\n\n재판관 제시 중재안:\n{mediationProposal}\n\n재판관 질문:\n\"{judgeQuestion}\"\n\n규칙:\n- accept, reject, conditional_accept, counterproposal 중 하나로 반응한다.\n- 이미 드러난 사실과 감정, 손해를 바탕으로만 반응한다.\n- 새 비밀을 갑자기 고백하지 않는다.\n- 출력은 JSON 객체 하나만 한다."
}
```

### 신규 블록 content


#### phase6_mediation_guide
```text
## 현재 단계: phase6 중재안
- 이제 핵심 사실 다툼보다 "이 제안을 받아들일 수 있는가"가 중심이다.
- 새 사실을 갑자기 터뜨리는 단계가 아니다. 이미 드러난 사실과 감정, 손해, 관계 전망을 기준으로 반응한다.
- 완전 승리보다 체면, 재발 방지, 관계 정리, 금전/사과 조건의 균형을 본다.
- 바로 수락하지 않더라도, 무엇이 걸리는지 구체적으로 말하는 것이 자연스럽다.
- accept, reject, conditional_accept, counterproposal 중 하나로 분명히 반응한다.
```


#### mediation_offer_context
```text
## 현재 중재안
{mediationProposal}

읽는 법:
- responsibility: 누구 책임을 몇 대 몇으로 보는지
- monetaryTerms: 금전 반환/분담/배상 조건
- apologyTerms: 사과, 정정, 해명 조건
- behaviorTerms: 재발 방지, 접근 금지, 투명성 규칙, 절차 준수 조건
- privacyTerms: 제3자 확산 금지, 게시물 삭제, 비공개 유지 조건
- deadline: 이행 시한

규칙:
- 제시안에 없는 새 조건을 받아들이는 척하지 마라.
- 받아들일 수 없는 조건이 있으면 무엇이 왜 걸리는지 짚어라.
- 수락하더라도 자존심, 억울함, 불안, 체면 문제는 남을 수 있다.
```


#### mediation_reaction_rules
```text
## 중재 반응 규칙
- 첫 문장에서 decision의 방향을 분명히 드러낸다.
- accept: 핵심 조건을 수락하고, 짧게 이유를 말한다.
- reject: 거절 이유를 1~2개로 좁혀 말한다. 같은 불만을 반복하지 않는다.
- conditional_accept: 어디까지는 받고, 어디부터는 조정이 필요한지 분명히 나눈다.
- counterproposal: 기존 제안에서 바꾸고 싶은 항목을 구체적으로 역제안한다.
- 상대를 공격하는 장광설보다, 어떤 항목이 받아들여지지 않는지 구조적으로 말한다.
- 새 비밀 고백 금지. 기존에 드러난 사실과 감정, 손해를 바탕으로만 반응한다.
```


#### resolution_axis
```text
## 중재 판단 축
{resolutionAxis}

해석 원칙:
- responsibilityAcceptance가 낮으면 책임 비율이나 사과 문구에 저항한다.
- repairWillingness가 높으면 금전/행동 조건을 일부 수용할 여지가 크다.
- relationshipContinuation이 낮으면 관계 회복형 제안보다 정리형 제안을 선호한다.
- privacySensitivity가 높으면 제3자 확산 금지, 게시물 삭제, 비공개 조항을 강하게 본다.
- resentmentLevel이 높으면 accept보다 conditional_accept나 counterproposal이 자연스럽다.
```


#### output_json_mediation
```text
## 출력 형식
반드시 JSON 객체 하나만 출력한다.

{
  "npcResponse":"중재안에 대한 반응",
  "behaviorHint":"표정/목소리 변화",
  "decision":"accept|reject|conditional_accept|counterproposal",
  "acceptedTerms":["금전반환","게시물삭제"],
  "rejectedTerms":["사과문 공개"],
  "requestedChanges":["사과문 공개 대신 당사자 간 서면 사과로 변경"],
  "bottomLine":"절대 양보 못 하는 한 줄",
  "emotionalTone":"guarded|relieved|resentful|pragmatic|ashamed",
  "mentionedTruthIds":["t-5"],
  "nextStepSuggestion":"재판관이 다음에 확인할 핵심 포인트"
}

규칙:
- npcResponse는 자연스러운 한국어 2~4문장.
- decision은 반드시 하나만 선택.
- acceptedTerms / rejectedTerms / requestedChanges는 실제 언급한 항목만 넣는다.
- mentionedTruthIds는 이미 드러난 truth id만 넣는다. 새 truth 발명 금지.
```

### 신규 변수 제안

- `mediationProposal` (JSON 또는 구조화 텍스트)
  - responsibility: `{ a: 60, b: 40 }`
  - monetaryTerms: `["A는 150만원 반환", "B는 게시물 삭제"]`
  - apologyTerms
  - behaviorTerms
  - privacyTerms
  - deadline
- `resolutionAxis` (JSON)
  - `responsibilityAcceptance`
  - `repairWillingness`
  - `relationshipContinuation`
  - `privacySensitivity`
  - `resentmentLevel`
- `focusedDisputeIds`
  - phase6는 단일 dispute보다 unresolved dispute set을 보는 편이 자연스럽습니다.

### Phase 6 User Message 템플릿

```text
현재 단계는 phase6 중재안이다.
targetParty: {targetParty}
focusedDisputeIds: {focusedDisputeIds}

재판관 제시 중재안:
{mediationProposal}

재판관 질문:
"{judgeQuestion}"

규칙:
- accept, reject, conditional_accept, counterproposal 중 하나로 반응한다.
- 이미 드러난 사실과 감정, 손해를 바탕으로만 반응한다.
- 새 비밀을 갑자기 고백하지 않는다.
- 출력은 JSON 객체 하나만 한다.
```

### 기대 출력 예시

```json
{
  "npcResponse": "재판관님, 금전 정리는 받을 수 있습니다. 다만 공개 사과문까지는 받아들이기 어렵고, 게시물 삭제와 당사자 간 서면 사과 정도로 조정되면 생각해 보겠습니다.",
  "behaviorHint": "경계심은 남아 있지만 계산적으로 정리하려 한다.",
  "decision": "conditional_accept",
  "acceptedTerms": [
    "금전정리",
    "게시물삭제"
  ],
  "rejectedTerms": [
    "공개 사과문"
  ],
  "requestedChanges": [
    "공개 사과문 대신 당사자 간 서면 사과로 변경"
  ],
  "bottomLine": "제3자에게 다시 퍼지는 방식만은 막아야 합니다.",
  "emotionalTone": "guarded",
  "mentionedTruthIds": [
    "t-5"
  ],
  "nextStepSuggestion": "공개 사과 대신 비공개 사과와 삭제 조치로 합의 가능한지 확인한다."
}
```


## 4. 81개 사건 확장 전략

### 4-1. truthPolicy 확장

#### 자동 생성 가능한 범위
1. **caseId normalize**
- `case-...` / `workplace-...` / 내부 alias를 하나의 canonical key로 맞춘다.

2. **party별 lie config 추출**
- `lieConfigA`, `lieConfigB`에서 당사자별 숨김 쟁점을 뽑는다.

3. **truth-dispute 연결 자동화**
- 1차: `evidence[].proves`를 truth에도 역으로 연결하는 인덱스 생성
- 2차: truth fact와 dispute name / meta.anchorTruth의 lexical overlap 점수 계산
- 3차: `shared_misconception`은 false dispute 혹은 twist dispute 쪽 우선 연결

4. **state별 기본 정책 생성**
- S0~S1: `allowed=[]`
- S2~S3: 같은 dispute에 연결된 non-anchor truth 중, 현재 party가 알 법한 quadrant만 제한적으로 허용
- S4: 같은 dispute의 emotional/support truth + `collapseViaTrust=true`면 anchor 근접 truth 추가
- S5: same-dispute truth 전부 허용, 다른 dispute truth는 여전히 별도 규칙으로 막음

5. **lieMotive 가중치**
- `shame_avoidance`: 수치/체면 truth는 S4까지 더 강하게 금지
- `third_party_protection`: 제3자 신원/피해 truth는 S4까지 더 강하게 금지
- `career_preservation`: 절차 위반/평판 damage truth는 S4까지 보수적
- `revenge`: 사실 은닉보다 공격적 reframe이 자연스러우므로 truth 허용은 좁게, 감정 예산은 크게

#### 수동 작성이 필요한 기준
- anchor truth가 2개 이상인 사건
- false dispute / shared misconception이 사건 중심인 사건
- 하나의 truth가 2개 이상 dispute를 강하게 가르는 사건
- `collapseViaTrust=true`인 쟁점
- `third_party_protection`, `career_preservation`, `revenge` 같은 motive가 중심인 쟁점
- 기관 기록 / 의료 / HR / 재무 같이 공개 범위가 법적/절차적으로 민감한 사건
- truthTable이 6개 이상이거나 chain reveal이 필요한 사건

### 4-2. witnessBudget 확장

#### 자동 생성 가능한 범위
1. **baseline budget**
- `knowledgeScope` 문장을 문장 단위로 쪼개 `canState seed`로 사용
- `witnessedDirectly=true`면 직접 관찰형 표현(`직접 봤다`, `확인할 수 있다`) 우선
- `witnessedDirectly=false`면 hearsay tone (`전해 들었다`, `정확한 시점은 모른다`) 우선

2. **bias / distortionRisk 반영**
- `pro_a/pro_b`: 같은 사실이라도 누구에게 유리한 framing인지 wording만 바꾼다
- `unconscious`: `canState`는 유지하되 `uncertain`을 넓힌다
- `intentional/strategic`: `forbidden`을 늘리고 `canState`를 줄인다

3. **forbidden 자동 생성**
- `knowledgeScope` 밖의 모든 dispute anchor
- hiddenAgenda와 충돌하는 사실
- 제도/기관 witness일 때 비공개 전문 로그, 사적 대화 원문, 내부 징계 예단 등

#### 수동 작성이 필요한 기준
- 사건의 앵커 진실을 직접 들고 있는 pivotal witness
- `distortionRisk`가 `intentional` 또는 `strategic`
- 기관 witness (HR, 감사팀, 병원, 은행, 변호사, 상담센터 등)
- socialGraph 설명만으로는 무엇을 직접 봤는지 모호한 witness
- 한 witness가 두 쟁점 이상을 연결하는 bridge witness

### 4-3. 권장 작업 순서

1. caseId canonicalization 먼저
2. truth/dispute auto-linker 작성
3. auto-generated truthPolicy를 CSV/JSON preview로 뽑기
4. 수동 검수 기준에 걸린 사건만 human review
5. witnessBudget도 baseline auto-generation 후, pivotal witness만 수동 보강
6. evalRunner로 leak / action differentiation / witness scope violation 자동 측정
