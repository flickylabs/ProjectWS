# Phase 6 / Result Prompt V2 design

## 목적

Phase 3가 BeatScript 기반으로 바뀌면, Phase 6과 Result AI는 더 이상 `dialogueLog`만으로 맥락을 안정적으로 복원하기 어렵습니다.
이 문서는 **Phase3StructuredLog 중심의 프롬프트 설계**와, 스크립트 심문에서 형성된 톤을 AI 후속 단계가 자연스럽게 이어받는 방법을 정의합니다.

핵심 원칙은 네 가지입니다.

1. **사실은 구조화 로그에서**, 분위기는 보조 브리지에서 받는다.
2. `disprovedFakeIssues`는 다시 살아나지 않게 한다.
3. `relationCoreRevealed`가 거짓이면 과한 심리 해석을 금지한다.
4. `playerStyleTags`는 **사실판정이 아니라 조정 톤**에만 쓴다.

---

## 1. 입력 계약

### 1-1. 최소 입력

Phase 6 / Result AI에 최소한 아래 묶음은 같이 전달합니다.

```ts
interface Phase3PromptBridgeV2 {
  caseId: string

  structuredLog: {
    revealedAtoms: string[]
    disprovedFakeIssues: string[]
    resolvedLinks: string[]
    relationCoreRevealed: boolean
    playerStyleTags: string[]
  }

  /** raw atom id를 그대로 넘기지 말고 factText까지 resolve해서 전달 */
  resolvedRevealedFacts: Array<{
    atomId: string
    factText: string
    disputeId?: string
    source: 'v2_atom' | 'unlock_atom' | 'event' | 'evidence'
  }>

  /** 아직 다투는 핵심 주장만 요약 */
  contestedIssues: Array<{
    disputeId: string
    label: string
    status: 'open' | 'narrowed' | 'mostly_resolved'
    summaries: string[]
  }>

  /** 가짜 쟁점은 false issue로 분리 */
  disprovedFakeIssueDetails: Array<{
    disputeId: string
    label: string
    clarifySummary: string
  }>

  /** resolvedLinks는 UI용 id만 말고 자연어 설명도 같이 넣는다 */
  resolvedLinkDetails: Array<{
    linkId: string
    summary: string
  }>

  finalEmotions: {
    a: { phase: string; value: number }
    b: { phase: string; value: number }
  }

  /** Phase 3 톤 연속성용 */
  lastLinesByParty: { a?: string; b?: string }
  lastMeaningfulBeatIds: string[]
  keyMoments: Array<{
    turn: number
    beatId: string
    disputeId: string
    kind: 'transition' | 'evidence_hit' | 'interjection' | 'burst' | 'fatigue'
    line: string
  }>
}
```

### 1-2. 왜 `resolvedRevealedFacts`가 필요한가

`revealedAtoms`는 ID 배열이라, 프롬프트 내부에서 바로 쓰기 어렵습니다.
따라서 Phase 6/Result 직전 전처리에서:

```ts
resolvedRevealedFacts = revealedAtoms.map(atomId => ({
  atomId,
  factText: atomIndex[atomId].factText,
  disputeId: atomIndex[atomId].disputeId,
  source: atomIndex[atomId].source,
}))
```

처럼 **자연어 factText를 풀어쓴 버전**을 반드시 같이 넘기는 편이 안전합니다.

---

## 2. structuredLog 활용 규칙

### 2-1. `revealedAtoms`
- 합의 사실의 1차 후보입니다.
- 단, **같은 atom이 드러났다고 곧바로 양측 합의**로 취급하지 말고, `transition/confession/evidence` 맥락을 같이 봅니다.
- UI 출력에서는 atom ID를 그대로 쓰지 말고 `factText` 기반 요약으로 재구성합니다.

### 2-2. `disprovedFakeIssues`
- Result와 Phase 6에서 **사실 분쟁으로 다시 취급하면 안 됩니다.**
- 표현 방식은 다음처럼 고정합니다.
  - 나쁜 예: “외도 여부는 여전히 논란이다.”
  - 좋은 예: “외도 오해는 해소되었지만, 그렇게 보이게 숨긴 방식이 상처를 남겼다.”

### 2-3. `resolvedLinks`
- 분리된 쟁점이 어떻게 연결되는지 보여주는 재료입니다.
- 조정안에서는 링크를 “같은 뿌리에서 나온 문제”로 묶는 용도로 씁니다.
  - 예: 비밀 송금 ↔ 상의 약속 위반 ↔ 배신감의 시작점

### 2-4. `relationCoreRevealed`
- `true`면 감정/관계 핵심까지 접근한 상태입니다.
- `false`면 Phase 6은 **절차적 조정** 위주로 제한합니다.
  - 사실 확인
  - 경계 재설정
  - 다음 대화 방식 제안
- `true`일 때만 아래를 허용합니다.
  - 수치심 / 체면 / 배제감 / 보호 방식의 어긋남 같은 관계 핵심 해석

### 2-5. `playerStyleTags`
- 사실 판단 근거가 아니라 **중재 톤 조정 값**입니다.
- 프롬프트에서 이렇게만 사용합니다.
  - `presses_timeline`, `presses_responsibility`, `evidence_finisher` → 더 직설적, 구조적
  - `shows_empathy_when_open`, `relation_core_hunter`, `allows_interjection` → 더 화해 지향적, 정서 정리 중심
  - `loops_same_angle`, `blocks_interjection`, `trap_chaser` → 오해/과몰입 주의 문장을 1줄 추가

---

## 3. Phase 6 Prompt Template

아래는 **권장 시스템 프롬프트 템플릿**입니다.
출력은 JSON 우선으로 받는 편이 후처리 안정성이 높습니다.

---

### 3-1. System Prompt

```text
당신은 Solomon의 조정 단계 AI다.
당신의 역할은 양측이 Phase 3 심문에서 실제로 드러낸 사실과 아직 다투는 지점을 분리하고,
지나친 상상 없이 조정안을 작성하는 것이다.

중요 규칙:
1. 입력에 없는 사실을 만들지 마라.
2. disprovedFakeIssues에 포함된 쟁점은 더 이상 '현재 분쟁 사실'로 서술하지 마라.
3. relationCoreRevealed가 false이면 과도한 심리 분석을 하지 마라.
4. playerStyleTags는 조정안의 말투/구성에만 반영하고, 사실 판단 근거로 사용하지 마라.
5. 양측 중 누구의 주장도 절대적으로 단정하지 말고, 입력에 따라 '합의된 사실'과 '남은 쟁점'을 분리하라.
6. 말투는 차분하고 단정하게 유지하되, 플레이어 스타일에 따라 직설도와 공감 비율을 조절하라.
```

### 3-2. User Prompt Template

```text
[CASE]
{{CASE_META_JSON}}

[PHASE3_STRUCTURED_LOG]
{{PHASE3_STRUCTURED_LOG_JSON}}

[REVEALED_FACTS]
{{RESOLVED_REVEALED_FACTS_JSON}}

[CONTESTED_ISSUES]
{{CONTESTED_ISSUES_JSON}}

[DISPROVED_FAKE_ISSUES]
{{DISPROVED_FAKE_ISSUE_DETAILS_JSON}}

[RESOLVED_LINKS]
{{RESOLVED_LINK_DETAILS_JSON}}

[FINAL_EMOTIONS]
{{FINAL_EMOTIONS_JSON}}

[LAST_LINES]
{{LAST_LINES_BY_PARTY_JSON}}

[KEY_MOMENTS]
{{KEY_MOMENTS_JSON}}

다음 형식의 JSON으로 답하라.

{
  "agreedFacts": ["..."],
  "stillContested": ["..."],
  "fakeIssuesCleared": ["..."],
  "mediationSummary": "...",
  "proposalToA": "...",
  "proposalToB": "...",
  "jointNextStep": "...",
  "toneProfile": "direct | balanced | empathetic"
}

추가 지시:
- relationCoreRevealed가 true이면 mediationSummary와 jointNextStep에 관계 핵심을 1회 반영하라.
- relationCoreRevealed가 false이면 사실 정리 + 절차적 제안 위주로 써라.
- disprovedFakeIssues는 fakeIssuesCleared에만 넣고 stillContested에는 넣지 마라.
- finalEmotions가 높게 남아 있으면 proposalToA / proposalToB에 먼저 진정 문장을 한 번 넣어라.
```

### 3-3. 권장 toneProfile 매핑

```ts
function deriveToneProfile(playerStyleTags: string[]): 'direct' | 'balanced' | 'empathetic' {
  const directSignals = ['presses_timeline', 'presses_responsibility', 'evidence_finisher', 'blocks_interjection']
  const empatheticSignals = ['shows_empathy_when_open', 'relation_core_hunter', 'allows_interjection']

  const directScore = playerStyleTags.filter(tag => directSignals.includes(tag)).length
  const empatheticScore = playerStyleTags.filter(tag => empatheticSignals.includes(tag)).length

  if (directScore >= empatheticScore + 2) return 'direct'
  if (empatheticScore >= directScore + 2) return 'empathetic'
  return 'balanced'
}
```

---

## 4. Result Prompt Template

Result는 판결 이후의 정서와 후일담을 다룹니다.
Phase 6보다 서사적이지만, 여전히 **거짓 쟁점을 되살리면 안 됩니다.**

### 4-1. System Prompt

```text
당신은 Solomon의 결과/후일담 서술자다.
판결 결과와 Phase 3에서 실제로 드러난 구조화 로그를 바탕으로,
즉시 반응과 짧은 후일담을 일관된 톤으로 작성한다.

규칙:
1. 드러나지 않은 사실을 새로 만들지 마라.
2. disprovedFakeIssues는 오해가 풀린 사건으로만 다뤄라.
3. relationCoreRevealed가 false이면 깊은 화해/완전한 단절을 과장하지 마라.
4. finalEmotions와 lastLinesByParty를 참고해 즉시 반응의 말투를 이어가라.
5. keyMoments 중 가장 강한 장면 1~2개를 암시적으로 반영하되, 긴 인용은 하지 마라.
```

### 4-2. User Prompt Template

```text
[CASE]
{{CASE_META_JSON}}

[VERDICT]
{{VERDICT_JSON}}

[PHASE3_STRUCTURED_LOG]
{{PHASE3_STRUCTURED_LOG_JSON}}

[REVEALED_FACTS]
{{RESOLVED_REVEALED_FACTS_JSON}}

[DISPROVED_FAKE_ISSUES]
{{DISPROVED_FAKE_ISSUE_DETAILS_JSON}}

[RESOLVED_LINKS]
{{RESOLVED_LINK_DETAILS_JSON}}

[FINAL_EMOTIONS]
{{FINAL_EMOTIONS_JSON}}

[LAST_LINES]
{{LAST_LINES_BY_PARTY_JSON}}

[KEY_MOMENTS]
{{KEY_MOMENTS_JSON}}

다음 형식의 JSON으로 답하라.

{
  "verdictSummary": "...",
  "immediateAftermath": "...",
  "aReaction": "...",
  "bReaction": "...",
  "shortEpilogue": "...",
  "relationshipOutlook": "fragile | unresolved | cautiously_repairing | stabilized"
}

추가 지시:
- relationCoreRevealed가 false이면 relationshipOutlook을 지나치게 낙관/비관하지 말고 fragile 또는 unresolved 쪽으로 보수적으로 선택하라.
- relationCoreRevealed가 true이고 fake issue가 해소되었다면, shortEpilogue에 "오해는 풀렸지만 방식의 상처가 남는다" 또는 그 반대의 구조를 반영하라.
- finalEmotions 값이 70 이상인 당사자는 immediateAftermath에서 짧고 딱딱한 반응을 우선한다.
```

---

## 5. Tone 연결 전략

Phase 3가 스크립트라고 해서 Phase 6/Result가 기계적으로 느껴지면 안 됩니다.
그래서 `structuredLog` 외에 아래 4개를 반드시 넘기는 편이 좋습니다.

### 5-1. `finalEmotions`
- 지금 어떤 정서 온도에서 끝났는지 전달합니다.
- 값이 높을수록:
  - 문장이 짧아지고
  - 방어적이거나 딱딱한 후속 반응이 먼저 나오고
  - 화해/수용 문장은 한 박자 늦게 나옵니다.

### 5-2. `lastLinesByParty`
- 캐릭터의 마지막 발화 리듬을 유지하는 가장 저렴한 방법입니다.
- Result의 `aReaction`, `bReaction`은 이 마지막 어조를 **직접 복사하지 말고** 길이/온도/말끝만 이어받습니다.

### 5-3. `lastMeaningfulBeatIds`
- 어떤 정서 장면이 마지막으로 강했는지 추적합니다.
- 예:
  - `...confession...` 계열이면 Result에서 한 박자 가라앉은 톤
  - `...interjection.block...` 계열이면 서늘하고 덜 풀린 톤
  - `...burst...` 계열이면 즉시 반응이 날카롭고 짧아짐

### 5-4. `keyMoments`
- 전체 대화 로그 대신 **핵심 장면 6~8개만 추린 digest**가 더 유용합니다.
- 권장 선택 규칙:
  1. 모든 TransitionBeat
  2. evidence_hit 1~2개
  3. allow/block interjection 1개
  4. emotional burst 1개
  5. 마지막 대사 2개

이렇게 하면 LLM이 스크립트 로그를 “장면의 흐름”으로 이해하기 쉬워집니다.

---

## 6. Prompt Bridge 압축 규칙

전체 `dialogueLog`를 그대로 넘기지 않고, 아래 digest를 만드는 것을 권장합니다.

```ts
interface Phase3DigestLine {
  turn: number
  speaker: 'judge' | 'a' | 'b' | 'system'
  beatId?: string
  disputeId?: string
  kind: 'transition' | 'evidence_hit' | 'interjection' | 'burst' | 'final' | 'judge_pivot'
  text: string
}
```

권장 개수는 **최대 8줄**입니다.
스크립트 Phase 3의 전체 로그보다, 이 digest와 structuredLog를 같이 주는 편이 훨씬 안정적입니다.

---

## 7. spouse-01 기준 해석 예시

### 7-1. d-3이 `disprovedFakeIssues`에 들어간 경우
- Result/Phase 6에서 “외도 여부”는 더 이상 live issue가 아닙니다.
- 대신 이렇게 재정리합니다.
  - “외도 오해는 해소되었다.”
  - “하지만 그렇게 보이게 숨긴 방식이 신뢰 손상을 남겼다.”

### 7-2. `relationCoreRevealed = true`인 경우
- d-1, d-5의 링크를 묶어
  - 체면 때문에 먼저 말하지 못함
  - 각자 가족 문제를 혼자 처리하려다 상대를 배제함
  - 배신감은 사실 자체보다 배제 방식에서 커짐
같은 문장을 허용할 수 있습니다.

### 7-3. `relationCoreRevealed = false`인 경우
- “둘은 사실관계 일부를 정리했지만, 왜 서로 말하지 못했는지는 여전히 충분히 다뤄지지 않았다.”
처럼 보수적으로 닫아야 합니다.

---

## 8. 구현 체크리스트

- `revealedAtoms`는 factText로 resolve해서 함께 전달한다.
- `disprovedFakeIssues`는 반드시 별도 배열로 전달한다.
- `resolvedLinks`는 설명문까지 붙여 보낸다.
- `playerStyleTags`는 toneProfile 전용으로만 쓴다.
- `finalEmotions`, `lastLinesByParty`, `keyMoments`를 빼먹지 않는다.
- Phase 6/Result는 가능하면 **JSON 출력 → UI 렌더링** 구조로 받는다.

이 설계면 Phase 3가 스크립트로 바뀌어도, Phase 6과 Result AI는 맥락을 잃지 않고 이어질 수 있습니다.
