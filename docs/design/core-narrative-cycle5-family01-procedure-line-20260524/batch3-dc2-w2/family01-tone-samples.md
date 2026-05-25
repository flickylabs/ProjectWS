# family-01 Tone Reference for GPT Pro — Cycle 5

`gpt-pro-brief.md` 작성 시 기존 `src/data/scriptedText/family-01.json` 의 6 채널 발췌. 톤·구조·태그 일관성 reference.

영구 저장 파일 X — 일회성 GPT Pro upload 용.

---

## 채널 빈도 (총 18 channel)

```
186 evidence_present       — 증거 제시 시 NPC 대답
180 interrogation          — 일반 심문 NPC 대답
 48 judge_question         — 판사 직접 질문
 33 dossier                — 단서 관련 NPC 대답
 33 judge_evidence_combo   — 판사 증거 조합 기반 질문  ★ 본 cycle 핵심
 32 contradiction_pursuit  — 모순 추궁
 18 trust_action           — 신뢰 액션 반응
 16 interjection           — NPC 끼어들기  ★ 본 cycle 핵심
 12 evidence_discovery     — 증거 발견 narrative
 12 judge_contradiction    — 판사 모순 지적
 11 system_message         — 시스템
  9 witness                — 증인 발화
  9 judge_witness_summon   — 판사 증인 호출  ★ 본 cycle 핵심
  8 mediation              — 조정
  8 emotional_overload     — 감정 격앙 발화  ★ 본 cycle 핵심
  6 rapport_milestone      — 친밀 마일스톤
  6 contradict_milestone   — 모순 마일스톤
  5 aftermath              — 후일담
```

본 cycle의 신규 채널 = `emergence_narrative` (Cycle 1에서 spouse-01에 신설된 channel). family-01도 동일 channel 추가 예정.

---

## Channel 1: `judge_question` — 판사 직접 질문 (Trigger의 "판사 등록 선언" 톤 reference)

### Sample 1 — `judgeq-d-1-fact_pursuit-1-v1`

```json
{
  "id": "judgeq-d-1-fact_pursuit-1-v1",
  "text": "윤정후 씨, 유서가 작성되던 무렵 어머니를 얼마나 자주 찾아뵈었는지부터 말씀해 주십시오.",
  "behaviorHint": "표면 사실부터 고정한다. 누가 언제 무엇을 봤는지 기초 순서를 세우는 질문이다.",
  "tags": [
    "channel:judge_question", "speaker:judge", "speakerRole:judge",
    "listener:party", "listenerRole:party", "address:toParty",
    "scope:judge_only", "revealScope:judge_only",
    "register:formal", "honorific:formal", "audience:single",
    "tense:present", "relationship:family",
    "callTerm:윤정후_씨", "callTermState:defined",
    "targetParty:b", "mentionTarget:dispute",
    "emotion:measured", "continuity:question",
    "reveal:none", "disclosure:guarded",
    "responseMode:judge_formal_prompt",
    "questionType:fact_pursuit", "depth:1", "disputeId:d-1"
  ]
}
```

### Sample 2 — `judgeq-d-1-fact_pursuit-2-v1`

```json
{
  "id": "judgeq-d-1-fact_pursuit-2-v1",
  "text": "윤정후 씨, 어머니께 유서 내용을 읽어드린 횟수와 그 이유는 무엇입니까.",
  "behaviorHint": "정황을 이루는 세부 조각으로 좁혀 묻는다. 시점과 행동을 갈라 흔들리는 부분을 찾는다."
}
```

**톤 요약 — 판사:**
- 종결: `…주십시오`, `…습니까`, `…말씀해 주시겠습니까`
- 호명: `윤태성 씨` / `윤정후 씨` (한 호명 일관)
- emotion: measured (격앙 X)
- 단정 회피, 사실 확인 형식
- relationship: family (spouse-01의 'spouse'와 다름)

---

## Channel 2: `interjection` — NPC 끼어들기 (Trigger T2 npc_interjection 핵심 reference)

### Sample 1 — `interject-a-d-1-minor-v1`

```json
{
  "id": "interject-a-d-1-minor-v1",
  "text": "잠깐만요, 재판관님. 제 동생은 어머니가 마지막까지 또렷하셨다는 식으로 말하지만, 말년 모습은 그런 말로 정리될 만큼 간단하지 않았습니다.",
  "behaviorHint": "낮게 끊어들지만 곧 장남의 자리를 앞세운다. 시선은 재판관에게 고정돼 있다.",
  "tags": [
    "channel:interjection", "speaker:a", "speakerRole:party",
    "listener:judge", "listenerRole:judge", "address:toJudge",
    "scope:judge_only", "register:formal", "honorific:formal",
    "audience:single", "tense:present", "relationship:family",
    "callTerm:재판관님",
    "counterpartyRef:제_동생", "counterpartyRefState:defined",
    "emotion:tense", "continuity:interjection",
    "reveal:none", "disclosure:guarded"
  ]
}
```

### Sample 2 — `interject-a-d-1-major-v1` (격앙)

```json
{
  "id": "interject-a-d-1-major-v1",
  "text": "재판관님, 저건 너무 좋은 쪽으로만 말한 겁니다! 어머니 곁에서 누가 말을 얹었는지 봐야 합니다!",
  "behaviorHint": "목소리가 커지고 상대를 향한 분노가 먼저 튀어나온다. 시선은 재판관에게 고정돼 있다."
}
```

**톤 요약 — 윤태성(A) 끼어들기:**
- A 본인 시점에서 윤정후 = "제 동생" (판사 대상) / 직접 호명 시 "정후야" 또는 격앙 "윤정후!"
- 격앙 톤 = 느낌표 + 짧은 단정형
- 회피 톤 = "…하지만" 형식으로 한 발 물러섬
- 자기 정체성 보호 frame: "장남으로서" / "내가 모시고 산"

---

## Channel 3: `judge_evidence_combo` — 판사 증거 조합 기반 질문 (Trigger T1 combination_result reference)

### Sample 1 — `judgeec-dc-1-b-q1-soft-v1`

```json
{
  "id": "judgeec-dc-1-b-q1-soft-v1",
  "text": "유서 사본과 말년 방문기록, 최복순 씨의 음성증언을 함께 보면 방문이 늘어난 시기와 종이를 읽어드린 장면이 겹칩니다. 윤정후 씨, 왜 윤태성 씨가 오기 전에 마치려 했는지 순서대로 말씀해 주십시오.",
  "behaviorHint": "재판관이 말년의 종이 콤보를 차분히 제시한다. 증거의 연결을 먼저 설명하게 하는 톤이다.",
  "tags": [
    "channel:judge_evidence_combo", "speaker:judge", "speakerRole:judge",
    "listener:party", "listenerRole:party", "address:toParty",
    "scope:judge_only", "register:formal", "honorific:formal",
    "audience:single", "tense:present", "relationship:family"
  ]
}
```

### Sample 2 — mid (좀 더 압박)

```json
{
  "id": "judgeec-dc-1-b-q1-mid-v1",
  "text": "방문기록과 최복순 씨 증언을 나란히 보면 단순 문병으로 보기 어렵습니다. 윤정후 씨, 종이를 읽어드린 이유와 윤태성 씨를 피한 이유를 나누어 말씀해 주십시오.",
  "behaviorHint": "재판관이 말년의 종이 콤보의 방향을 분명히 짚는다. 더 미루지 못하게 하는 톤이다."
}
```

**톤 요약 — 판사 조합 query:**
- 조합 결과 사실 정리 + 질문 분리
- "X와 Y를 함께 보면..." / "X와 Y를 나란히 보면..."
- 단정 회피, 자료 기반 질문

---

## Channel 4: `emotional_overload` — 감정 격앙 발화 (Trigger T3 emotional_outburst reference)

### Sample 1 — A 격앙 (윤태성)

```json
{
  "id": "overload-a-d-1-v1",
  "text": "…어머니 말년 얘기는 더는 바로 못 하겠습니다. 제가 놓친 것까지 같이 올라옵니다. 잠시 뒤 다시 말씀드리겠습니다.",
  "behaviorHint": "목이 잠기다가도 형이라는 체면이 올라와 말끝이 거칠어진다. 시선은 재판관에게 고정돼 있다.",
  "tags": [
    "channel:emotional_overload", "speaker:a", "speakerRole:party",
    "listener:judge", "listenerRole:judge", "address:toJudge",
    "scope:judge_only", "register:formal", "honorific:formal",
    "audience:single", "tense:present", "relationship:family",
    "emotion:overwhelmed"
  ]
}
```

### Sample 2 — B 격앙 (윤정후, affect_flattening)

```json
{
  "id": "overload-b-d-1-v1",
  "text": "…어머니를 이용했다는 말은 바로 견디기 어렵습니다. 숨 고르고 다시 말씀드리겠습니다.",
  "behaviorHint": "평평하던 목소리가 잠깐 갈라지고, 다시 누르려는 침묵이 따른다. 시선은 재판관에게 고정돼 있다."
}
```

**톤 요약 — emotional_overload:**
- 시작 부호 `…` (말 못 잇는 표시)
- A: 큰 감정 → 자기 보호 frame
- B: 누르려는 톤 → 잠시 갈라짐
- 끝맺음 "…다시 말씀드리겠습니다" 류

---

## Channel 5: `dossier` — 단서 관련 NPC 대답 (challenge 답변 reference — Trigger의 NPC 답변 톤)

### Sample 1 — B dossier 답변 early

```json
{
  "id": "dc-1-b-q1-early-v1",
  "text": "방문이 늘어난 건 맞습니다. 다만 형을 밀어내려던 게 아니라 어머니가 오래 버티기 어려워 서둘렀습니다.",
  "behaviorHint": "대답 전 한 박자 멈추고 서류 끝을 본다.",
  "tags": [
    "channel:dossier", "speaker:b", "speakerRole:party",
    "listener:judge", "listenerRole:judge", "address:toJudge",
    "scope:judge_only", "register:formal", "honorific:formal",
    "audience:single", "tense:present", "relationship:family"
  ]
}
```

### Sample 2 — mid

```json
{
  "id": "dc-1-b-q1-mid-v1",
  "text": "형이 오면 어머니가 먼저 긴장하셨습니다. 그래서 저는 공증 이야기를 길게 붙잡지 않으려 했습니다.",
  "behaviorHint": "말을 고르다 한 번 숨을 길게 내쉰다."
}
```

**톤 요약 — B 단서 답변:**
- 짧고 사실 위주
- "맞습니다. 다만…" 형식
- 본인 시점에서 윤태성 = "형" (NPC 본인 발화 시) / 판사 대상 "저희 형"

---

## Channel 6: `judge_witness_summon` — 판사 증인 호출 (Trigger T1 cascade_from_card "w-1 호출" reference)

### Sample 1 — soft

```json
{
  "id": "judgew-w-1-soft-v1",
  "text": "최복순 씨를 부르겠습니다. 말년 방문이 늘어난 시기와 종이를 읽어드린 장면을 순서대로 확인하겠습니다.",
  "behaviorHint": "재판관이 최복순 증인을 차분히 부른다. 증언이 닿는 쟁점을 먼저 밝히는 톤이다.",
  "tags": [
    "channel:judge_witness_summon", "speaker:judge", "speakerRole:judge",
    "listener:party", "listenerRole:party", "address:toParty",
    "scope:judge_only", "register:formal", "honorific:formal",
    "audience:both", "tense:present", "relationship:family"
  ]
}
```

### Sample 2 — mid (방향 명시)

```json
{
  "id": "judgew-w-1-mid-v1",
  "text": "최복순 씨의 직접 증언을 듣겠습니다. 윤정후 씨의 방문과 종이 낭독이 단순 도움인지 따져 보겠습니다.",
  "behaviorHint": "재판관이 최복순 증언의 필요성을 분명히 제시한다. 갈린 진술을 정리하는 톤이다."
}
```

**톤 요약 — 판사 증인 호출:**
- "X 씨를 부르겠습니다" / "X 씨의 직접 증언을 듣겠습니다"
- 호출 이유(어느 쟁점) 한 문장 첨부
- audience:both (양측 모두 청중)

---

## Channel 7: `witness` — 증인 발화 (w-1 사용 시 톤 reference)

### Sample 1 — vague

```json
{
  "id": "w-1-vague-v1",
  "text": "작은아들분이 자주 오신 건 맞습니다. 어머님이 그분을 보고 조금 편해 보인 날도 있었습니다.",
  "behaviorHint": "두 손을 모으고 본 장면만 조심스럽게 말한다.",
  "tags": [
    "channel:witness", "speaker:w-1", "speakerRole:witness",
    "listener:judge", "listenerRole:judge", "address:toJudge",
    "scope:judge_only", "register:formal", "honorific:formal",
    "audience:single", "tense:present", "relationship:family"
  ]
}
```

**톤 요약 — w-1 (최복순) 증언:**
- 본인 시점에서 윤정후 = "작은아들분" / 윤태성 = "큰아들분"
- 조심스러운 fact-only 톤
- "맞습니다. ~한 날도 있었습니다" 형식
- callTerms.fromA = "큰아들분", fromB = "작은아들분"

---

## 캐릭터 callTerms 권위 ([src/data/coreCases/family-01.case.ts](../../src/data/coreCases/family-01.case.ts))

### partyA (윤태성)
- `toPartner`: "정후야"
- `toJudge`: "제 동생"
- `angry`: "윤정후!"
- 본인 호명 (외부 시점): "윤태성 씨"

### partyB (윤정후)
- `toPartner`: "형"
- `toJudge`: "저희 형"
- `angry`: "윤태성!"
- 본인 호명 (외부 시점): "윤정후 씨"

### partyA → 어머니 = "어머니" / "우리 어머니" (본인 시점)
### partyB → 어머니 = "어머니" (본인 시점)
### 판사 → 어머니 = "윤태성 씨/윤정후 씨 모친" or "어머님" (제3자 시점)

### witness 호명
- w-1 최복순: fromA="큰아들분", fromB="작은아들분"
- w-2 김영수: fromA="큰아들분", fromB="서류 제출자분"

---

## 본인 가족 호칭 정책 ([[feedback_family_address_speaker_perspective]])

family-01은 형제 사건이라 시댁/처가 X. 다만 부모 영역 동일 원칙:

- 본인이 "어머니"(자기 어머니) 호칭: **OK** (자기 시점)
- A → A 어머니: "어머니" / "우리 어머니"
- B → A 어머니: "어머니" (같은 어머니)
- 판사 → A의 어머니: 외부 시점이므로 "윤태성 씨 모친" / "어머님" 권장

본 cycle Line A에서 가족 호칭 영역은 단순 (양 형제가 같은 어머니에 대해 말함). 시점 어색함 위험 낮음.

---

## 자기지시 정책 ([[feedback_self_reference_speaker_context]])

- NPC 1인칭 자기 발화에 **"본인" X** → "저/제"
- 단, 제3자(판사)가 NPC 가리킬 때는 "본인" / "당사자" 자연

예:
- ✗ B(윤정후) 본인 발화: "본인은 어머니에게 종이를 읽어드린 것뿐입니다"
- ✓ B(윤정후) 본인 발화: "저는 어머니에게 종이를 읽어드린 것뿐입니다"
- ✓ 판사 → A에게 B 가리킴: "윤정후 씨 본인이 어떻게 답변하실지 들어보겠습니다"
