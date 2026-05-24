# spouse-01 Tone Reference for GPT Pro — Cycle 1

`gpt-pro-brief.md` 작성 시 기존 spouse-01.json의 4 채널 발췌. 톤·구조·태그 일관성 reference.

영구 저장 파일 X — 일회성 GPT Pro upload 용.

---

## 채널 빈도 (총 14 channel)

```
1470 evidence_present       — 증거 제시 시 NPC 대답
1440 interrogation          — 일반 심문 NPC 대답
 320 contradiction_pursuit  — 모순 추궁
 240 judge_question         — 판사 직접 질문
 240 dossier                — 도시카드 관련
 180 trust_action_response  — 신뢰 액션 반응
 160 interjection           — NPC 끼어들기  ★ Cycle 1 핵심
 120 judge_evidence_combo   — 판사 증거 조합 기반 질문  ★ Cycle 1 핵심
  90 witness                — 증인 발화
  80 mediation              — 조정
  80 emotional_overload     — 감정 격앙 발화  ★ Cycle 1 핵심
  60 judge_contradiction    — 판사 모순 지적
  55 system_message         — 시스템
  45 judge_witness_summon   — 판사 증인 호출
```

---

## Channel 1: `judge_question` — 판사 직접 질문 (Trigger 1/2/3/Fallback 의 "판사 등재 선언" 톤 reference)

### Sample 1 — `judgeq-h-d3-fact_pursuit-1-v1`

```json
{
  "id": "judgeq-h-d3-fact_pursuit-1-v1",
  "text": "박지연 씨, 공동 적금 해지가 이루어진 날 은행에 갔던 사람이 누구였는지부터 말씀해 주십시오.",
  "behaviorHint": "표면 사실을 확인한다. 공동 적금 해지의 절차와 책임을 좁힌다. 기초 질문으로 출발한다.",
  "tags": [
    "channel:judge_question", "speaker:judge", "speakerRole:judge",
    "listener:party", "listenerRole:party", "address:toParty",
    "scope:judge_only", "revealScope:judge_only",
    "register:formal", "honorific:formal", "audience:single",
    "tense:present", "relationship:spouse",
    "callTerm:박지연_씨", "callTermState:defined",
    "counterpartyRef:박지연_씨", "counterpartyRefState:defined",
    "targetParty:a", "mentionTarget:dispute",
    "emotion:measured", "continuity:question",
    "reveal:none", "revealGuard:open", "disclosure:guarded",
    "responseMode:judge_formal_prompt",
    "questionType:fact_pursuit", "depth:1", "disputeId:h-d3"
  ]
}
```

### Sample 2 — 동일 key의 v3 (B 대상)

```json
{
  "id": "judgeq-h-d3-fact_pursuit-1-v3",
  "text": "이준호 씨, 공동 적금 해지 연락을 처음 들은 때가 언제였고, 그때 동의하신 적이 있었습니까."
}
```

**톤 요약 — 판사:**
- 종결: `…주십시오`, `…습니까`, `…말씀해 주시겠습니까`
- 호명: `박지연 씨` / `이준호 씨` (한 호명 일관)
- emotion: measured (격앙 X)
- 단정 회피, 사실 확인 형식

---

## Channel 2: `interjection` — NPC 끼어들기 (Trigger 1 핵심 reference)

### Sample 1 — `interject-a-d-1-minor-v1`

```json
{
  "id": "interject-a-d-1-minor-v1",
  "text": "잠깐만요, 재판관님. 제 남편이 지금 제가 괜히 단정한 것처럼 말씀하시는데, 그때 보인 정황이 하나가 아니었습니다.",
  "behaviorHint": "참다가도 더는 넘길 수 없다는 듯 낮게 끊어 들어온다. 감정은 눌러도 서운함은 숨기지 못한다."
}
```

### Sample 2 — `interject-a-d-1-minor-v2`

```json
{
  "id": "interject-a-d-1-minor-v2",
  "text": "그 정황을 단순한 오해로 정리할 수는 없습니다. 같은 장소, 같은 시간, 같은 번호가 계속 겹쳤습니다."
}
```

### Sample 3 — `interject-a-d-1-minor-v3`

```json
{
  "id": "interject-a-d-1-minor-v3",
  "text": "제 남편 말씀대로 단순한 일이었다면, 왜 그 정도로 숨겼는지부터 짚어야 합니다."
}
```

**톤 요약 — A 끼어들기:**
- 시작: `잠깐만요, 재판관님.` / `…재판관님,` / `제 남편이 지금…`
- 종결: `…습니다`, `…할 수는 없습니다`, `…짚어야 합니다`
- emotion: 격앙 절제 (감정 누르되 서운함 드러남)
- 호명: `제 남편` (배우자 지칭), `재판관님`
- 직접 호명 X (NPC 본인은 1인칭)
- behaviorHint: "참다가도 끊어 들어온다", "낮게", "감정은 눌러도"

---

## Channel 3: `judge_evidence_combo` — 판사 조합 기반 질문 (Trigger 2 핵심 reference)

### Sample 1 — `judgecombo-dc-1-b-q1-soft-v1`

```json
{
  "id": "judgecombo-dc-1-b-q1-soft-v1",
  "text": "이준호 씨, GPS 좌표와 발신자 미상 문자를 함께 보겠습니다. 두 자료의 시간대와 장소가 겹치는 만큼, 그 오피스텔 안에 누가 있었는지 들려주시겠습니까.",
  "behaviorHint": "사건카드 단서 확인 뒤 증거 조합의 의미를 재판관이 정리한다."
}
```

### Sample 2 — `judgecombo-dc-1-b-q1-soft-v2`

```json
{
  "id": "judgecombo-dc-1-b-q1-soft-v2",
  "text": "이준호 씨, GPS에 남은 정차 주소와 발신자 미상 문자가 같은 장소에서 겹칩니다. 그날 그곳에서 누구를 챙기고 계셨습니까."
}
```

**톤 요약 — 판사 조합 query:**
- 구조: `{name} 씨, {증거1}과 {증거2}를 함께 보겠습니다. {겹치는 부분}이 있는 만큼, {질문}.`
- 또는: `{증거1}에 {기록 A}, {증거2}에 {기록 B}이 같은 {축}에서 겹칩니다. {질문}.`
- 종결: `…들려주시겠습니까`, `…말씀해 주시겠습니까`, `…챙기고 계셨습니까`
- 단정 회피, 자료 인용 후 질문
- 톤: soft (격식 + 부드러움)

---

## Channel 4: `emotional_overload` — 감정 격앙 발화 (Trigger 3 핵심 reference)

### Sample 1 — `overload-a-d-1-v1`

```json
{
  "id": "overload-a-d-1-v1",
  "text": "…더는 말씀 못 드리겠습니다. 지금은 제가 뭘 믿었는지, 왜 그토록 흔들렸는지가 같이 올라옵니다. (두 턴 후) …죄송합니다. 다시 말씀드리겠습니다.",
  "behaviorHint": "목이 잠기고 눈물이 먼저 차오른다. 억울함보다 흔들린 자기 모습이 더 크게 올라온다."
}
```

### Sample 2 — `overload-a-d-1-v2`

```json
{
  "id": "overload-a-d-1-v2",
  "text": "됐습니다. 또 제가 미친 사람처럼 보이는 얘기라면 더는 못 하겠습니다! (두 턴 후) …감정이 앞섰습니다. 이어서 말씀드리겠습니다.",
  "behaviorHint": "버티던 화가 갑자기 앞으로 튄다. 상처를 방어하려는 분노가 먼저 나간다."
}
```

**톤 요약 — emotional_overload:**
- 구조: `{격앙 발화}! (두 턴 후) …{시인/복원}.`
- 시작: `…더는…`, `됐습니다`, `잠깐만요…`
- 발화 중 `!` 또는 `…` 빈번 사용
- behaviorHint: "버티던 화가 갑자기 앞으로 튄다", "목이 잠기고 눈물이 먼저"

---

## 캐릭터 voice 요약

| Party | 호명 | 종결 | 격앙 시 |
|---|---|---|---|
| A (박지연) | 박지연 씨 (3rd) / 저 (1st) | `…습니다`, `…요` (감정) | 절제→폭발 (서운함+분노) |
| B (이준호) | 이준호 씨 (3rd) / 저 (1st) | `…니다`, `…만요` (회피체) | 회피→격항의→체념 |
| Judge | 재판관님 (자기 ref X, 1st 생략) | `…주십시오`, `…습니까` | measured (격앙 X) |

전자 자기지시 정책: NPC 1인칭에 "본인/자신" X → "저/제"
판사: 단정 회피, 사실 확인 형식

---

## tag 일관성 권위

emergence narrative 신규 entry tag set은 위 sample들과 일관 (단, 채널만 `channel:emergence_narrative` 신규).

핵심 tag (필수):
- `channel:emergence_narrative` (신규)
- `speaker:{a|b|judge}` + `speakerRole:{party|judge}`
- `listener:{judge|party|all}` + `listenerRole`
- `register:formal` + `honorific:formal`
- `relationship:spouse`
- `callTerm:{박지연_씨|이준호_씨|재판관님|none}` + `callTermState:{defined|none}`
- `emotion:{measured|charged|broken|tense}`
- `trigger:{npc_interjection|combination_result|emotional_outburst|judge_auto_mention}`
- `emergence:e-5`

기존 entry tag set 그대로 유지 (위 sample 참조).
