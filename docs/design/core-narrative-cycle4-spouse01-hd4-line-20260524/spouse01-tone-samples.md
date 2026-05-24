# spouse-01 emergence_narrative Tone Reference for GPT Pro — Cycle 4

`gpt-pro-brief.md` 작성 시 기존 spouse-01.json `emergence_narrative` 13 entry 발췌 + 본 cycle 영역 특수성.
일회성 GPT Pro upload용 (영구 저장 X).

---

## 채널 entry 현황 (총 13 entry / 154 variant, 본 cycle 후 17 entry / ~205 variant)

```
Cycle 1: emerge-e-5 (17 variants)
Cycle 2: emerge-dc-3 / emerge-e-7 / emerge-dc-7 / emerge-e-6 / emerge-dc-4 / emerge-w-3 / emerge-h-d3 / emerge-w-2-hd3 (8 entry / 97 variants)
Cycle 3: emerge-e-4 / emerge-dc-1 / emerge-w-1 / emerge-dc-2 (4 entry / 51 variants)
Cycle 4 (본 batch): emerge-e-8 / emerge-e-9 / emerge-dc-8 / emerge-h-d4 (예정 4 entry / 51 variants)
```

---

## Sample 1 — Cycle 2 combination_result (재판관 query — dc-8 4-a reference)

```json
{
  "id": "emerge-dc3-via-combo-judge-query-v1",
  "text": "이준호 씨, 발신자 미상 문자와 개인 계좌 출금 내역을 함께 보겠습니다. 두 자료의 시기가 맞물리는 만큼, 이 별도 계좌가 어떤 성격의 계좌였는지 말씀해 주십시오.",
  "behaviorHint": "자료의 연결점을 차분히 짚으며 이준호에게 계좌 성격을 설명하게 한다."
}
```

**적용 톤 (재판관 combination_result query):**
- 구조: `{name} 씨, {증거1}과 {증거2}를 함께 보겠습니다. {겹치는 부분}이 있는 만큼, {질문}.`
- 종결: `…말씀해 주십시오`, `…설명해 주십시오`
- emotion: measured, 자료 인용 후 질문

---

## Sample 2 — Cycle 2 NPC b-response (회피 회피 톤)

```json
{
  "id": "emerge-dc3-via-combo-b-response-v1",
  "text": "그 계좌는… 제가 개인적으로 따로 관리하던 통장입니다. 자세한 사용처까지 지금 말씀드리기는 어렵습니다.",
  "behaviorHint": "잠깐 멈칫한 뒤 계좌 존재만 인정하고, 사용처는 더 말하지 않으려 한다."
}
```

**적용 톤 (B 회피 response):**
- 시작: `그건…`, `그 X는…` (말끝 끊김)
- 종결: `…말씀드리기 어렵습니다`, `…자세한 건…`
- emotion: 회피·체념, 사실 일부만 인정

---

## Sample 3 — Cycle 3 cascade_from_card (재판관 cascade mention — e-8/e-9/dc-8/h-d4 cascade entry reference)

```json
{
  "id": "emerge-e7-via-cascade-judge-mention-v1",
  "text": "앞서 등재된 [이준호의 비밀 개인 계좌]로 남편 측 자금 흐름은 한 차례 정리됐습니다. 이제 공동 적금 해지 절차 문서를 본 법정에 제출해 주십시오.",
  "behaviorHint": "한쪽 자금 흐름이 정리된 직후, 다른 자금 흐름의 절차 문서로 시선을 옮긴다."
}
```

**적용 톤 (재판관 cascade mention):**
- 구조: `앞서 등재된 [{prior entity}]가/이/로 {연결고리}. {새 entity surface 요청}.`
- 종결: `…제출해 주십시오`, `…확인하겠습니다`, `…정합니다`
- emotion: measured, 분석적
- **반드시 prior entity 직접 reference** (대괄호 표기) — `[이준호의 비밀 개인 계좌]`, `[휴대폰 의학 검색 기록]` 등

---

## Sample 4 — Cycle 2 NPC b-interject (B 자기 surface형 끼어들기)

```json
{
  "id": "emerge-hd3-via-b-interject-v1",
  "text": "재판관님, 한 가지 더 짚어야 합니다. 별도 계좌 이야기만으로는 설명되지 않는, 저희 부부 공동 적금의 큰 잔액 변화가 있었습니다.",
  "behaviorHint": "말을 끊되 흥분을 누르고 단호하게 꺼낸다. 새로 확인한 자금 흐름을 법정에 올려놓는 느낌이다."
}
```

**적용 톤 (B 끼어들기 — h-d4 emergence b-outburst와 다름. 본 sample은 firm 톤):**
- 시작: `재판관님, …`, `한 가지 더 짚어야 합니다…`
- 종결: `…있었습니다`, `…보입니다`
- emotion: firm (격앙 절제, 단호)
- **본 cycle h-d4 4-b outburst는 emotion: charged + broken (자백 폭발, 단어 surface — 본 sample보다 강한 톤)**

---

## Sample 5 — Cycle 2 combo a-response (체념 톤 — h-d4 4-b 자기 인정 후속 reference)

```json
{
  "id": "emerge-dc4-via-combo-a-response-v1",
  "text": "그 돈은… 결국 돌아오지 않았습니다. 제가 믿었던 곳도, 약속했던 수익도 전부 사라졌습니다.",
  "behaviorHint": "목소리가 낮아지고 끝을 흐린다. 변명보다 체념이 먼저 나오며, 더 숨길 힘이 빠진 상태다."
}
```

**적용 톤 (체념 자기 인정):**
- 시작: `그 X는…`
- 종결: `…사라졌습니다`, `…잃었습니다`, `…이상 말씀드리기 어렵습니다`
- emotion: broken (체념·자기 인정)
- **본 cycle h-d4 4-b b-admit-more entry에 적용 — "그게 제 잘못입니다" 책임 self-admission 톤**

---

## Sample 6 — Cycle 2 cascade judge_decree (cascade chain 종결 — h-d4 4-a judge_decree reference)

```json
{
  "id": "emerge-e7-via-cascade-judge-decree-v1",
  "text": "본 법정에 [공동 적금 해지 서류]를 정식 등재합니다.",
  "behaviorHint": "공동 적금 해지 절차를 검증할 핵심 문서로 등재한다."
}
```

**적용 톤 (judge_decree — 모든 emergence 마지막 단계):**
- 구조: `본 법정에 [{새 entity 자연 명칭}]을 정식 등재합니다.` 또는 `본 법정에 [{쟁점}] 쟁점을 정식 부상시킵니다.`
- 종결: `…등재합니다`, `…부상시킵니다`, `…정합니다`
- emotion: measured (확정·격식)

---

## 본 cycle 영역 특수 톤 — 추가 reference

### A-1. 외도 frame 강화 a-interject (e-8 / e-9 / dc-8 a-react / h-d4 a-confront)

기존 spouse-01.json `interjection` 채널에서 reference:

```json
{
  "id": "interject-a-d-1-minor-v1",
  "text": "잠깐만요, 재판관님. 제 남편이 지금 제가 괜히 단정한 것처럼 말씀하시는데, 그때 보인 정황이 하나가 아니었습니다.",
  "behaviorHint": "참다가도 더는 넘길 수 없다는 듯 낮게 끊어 들어온다. 감정은 눌러도 서운함은 숨기지 못한다."
}
```

**본 cycle A 외도 frame 강화 적용:**
- e-8 4-b a-interject: "남편 휴대폰에 산부인과 검색이 한두 번이 아닙니다. 형 일로 모은 돈이라면서…" — 외도 단정 강화
- e-9 4-b a-interject: "수익자 칸이 공란이었어요. 누구를 위해 알아본 건지…" — 수익자 외도 frame 정점
- dc-8 4-a a-react: "이건 외도 상대 임신을 대비한 준비가 분명합니다." — h-d4 직전 외도 frame 최정점
- h-d4 4-c a-confront: "자기야, 그럼 이건 다 뭐야? 외도가 아니라면 도대체 뭐였어?" — frame 충돌 직면 + **부부 직접 발화 (반말 + "자기야")**

### A-2. B 자기 자백 폭발 (h-d4 4-b 단독 — 가장 민감)

기존 `emotional_overload` 채널에서 reference:

```json
{
  "id": "overload-a-d-1-v1",
  "text": "…더는 말씀 못 드리겠습니다. 지금은 제가 뭘 믿었는지, 왜 그토록 흔들렸는지가 같이 올라옵니다. (두 턴 후) …죄송합니다. 다시 말씀드리겠습니다.",
  "behaviorHint": "목이 잠기고 눈물이 먼저 차오른다. 억울함보다 흔들린 자기 모습이 더 크게 올라온다."
}
```

**본 cycle B 자백 폭발 적용 (h-d4 4-b b-outburst-v1 — 단어 surface 영역):**
- 구조: B → A 직접 발화 (반말) + 진실 단어 surface ("난임 진단", "출산 화제", "의사 친구", "치료비")
- 시작: "자기야…", "그 돈은 처음엔 자기 거였어…"
- 종결: "…한 거야", "…모은 돈이야"
- emotion: charged → broken (격앙 후 체념)
- behaviorHint: "오랫동안 안에 가두었던 말이 한 번에 쏟아진다", "목소리가 떨리고 시선은 박지연을 향한다"

---

## 캐릭터 voice 요약 (본 cycle 적용)

| Party | 호명 | 종결 | 본 cycle 영역 특수성 |
|---|---|---|---|
| A (박지연) | 박지연 씨 (3rd) / 저 (1st) | `…습니다`, `…요` (감정) | **외도 frame 강화 정점 (e-8 → e-9 → dc-8) → h-d4 frame 직면** |
| B (이준호) | 이준호 씨 (3rd) / 저 (1st) | `…니다`, `…만요` (회피체) | **회피→자기방어→체념→자백 폭발 (h-d4 4-b만)**. 4-b에서 부부 직접 "자기야" 반말 surface |
| 재판관 | 재판관님 (자기 ref X) | `…주십시오`, `…습니까` | measured, 평가 어휘 회피, frame 충돌 직접 mention |

### 부부 직접 발화 (h-d4 4-b + 4-c 영역 — emergence narrative 첫 적용)

기존 spouse-01.json 전체에 "자기야" / "자기" 호칭 부부 발화 entry는 S5 자백 영역 cascade 후 영역에 다수 존재. 본 emergence narrative 채널에는 본 cycle 4-b/4-c가 첫 적용.

| 화자 | 호칭 | 1인칭 | 종결 |
|---|---|---|---|
| A → B | 자기 / 자기야 | 나 (1st) | `…야?`, `…지?`, `…어` |
| B → A | 자기 / 자기야 | 나 / 저 (혼용) | `…어`, `…야`, `…거야` |

---

## tag 일관성 권위

emergence narrative 신규 entry tag set은 위 sample들과 일관 (단, 채널 `channel:emergence_narrative` 유지).

핵심 tag (필수):
- `channel:emergence_narrative`
- `caseId:spouse-01`
- `speaker:{a|b|judge}` + `speakerRole:{party|judge}`
- `listener:{judge|a|b|all}` + `listenerRole:{judge|party|all}`
- `address:{toParty|toJudge|toAll}`
- `audience:{single|both|all}`
- `register:formal` + `honorific:formal` (대부분 — h-d4 4-b/4-c 영역만 register:casual + honorific:casual 검토)
- `relationship:spouse`
- `callTerm:{박지연_씨|이준호_씨|재판관님|자기|none}` + `callTermState:{defined|none}`
- `judgeAddress:재판관님` (NPC가 재판관 부를 때)
- `emotion:{measured|firm|charged|broken|tense}` (h-d4 4-b만 charged→broken)
- `continuity:{interjection|response|reactive_query|query|decree|outburst|cascade_mention}`
- `reveal:{none|partial|surface|full}` (h-d4 4-b만 reveal:full)
- `disclosure:{guarded|opening|disclosed}` (h-d4 4-b만 disclosed)
- `trigger:{npc_interjection|combination_result|emotional_outburst|judge_auto_mention|cascade_from_card}`
- `emergence:{e-8|e-9|dc-8|h-d4}`
- **cascade_from_card 전용**: `priorCard:{dc-3|e-8|e-9|dc-8}`
- **combination_result 전용**: `comboRecipeId:combine-7` (dc-8 4-a만)

기존 entry tag set 그대로 유지 (위 sample 참조).
