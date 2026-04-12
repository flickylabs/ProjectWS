# ScriptedText V4 출력 포맷

> GPT Pro가 출력해야 하는 JSON 형식 규격

---

## 채널별 출력 포맷

### 1. interrogation (심문 대사)

각 entry = 1개 party × 1개 dispute × 1개 lieState × 1개 questionType

```json
{
  "key": "a|d-1|S0|fact_pursuit",
  "party": "a",
  "disputeId": "d-1",
  "lieState": "S0",
  "questionType": "fact_pursuit",
  "stanceHint": "deny",
  "truthLevel": "none",
  "variants": [
    {
      "id": "v1",
      "text": "재판관님, 손절한 사람이 왜 제 예비신랑한테까지...",
      "behaviorHint": "과거를 끌어와 상대를 프레이밍하며 확신에 차 있다."
    },
    {
      "id": "v2",
      "text": "...",
      "behaviorHint": "..."
    },
    {
      "id": "v3",
      "text": "...",
      "behaviorHint": "..."
    },
    {
      "id": "v4",
      "text": "...",
      "behaviorHint": "..."
    },
    {
      "id": "v5",
      "text": "...",
      "behaviorHint": "..."
    }
  ]
}
```

**stanceHint 값**: deny | hedge | partial | blame | emotional | confess | answer
**truthLevel 값**: none | hint | partial | full
**lieState 값**: S0, S1, S2, S3, S4, S5
**questionType 값**: fact_pursuit, motive_search, empathy_approach

#### stanceHint x truthLevel 가이드

| lieState | stanceHint | truthLevel |
|----------|-----------|------------|
| S0 | deny | none |
| S1 | hedge | hint |
| S2 | hedge 또는 partial | hint 또는 partial |
| S3 | partial | partial |
| S4 | emotional 또는 blame | partial |
| S5 | confess | full |

---

### 2. evidence_present (증거 제시 대사)

LieBand = S0~S1 -> "early", S2~S3 -> "mid", S4~S5 -> "late"

```json
{
  "key": "b|e-1|early|self",
  "party": "b",
  "evidenceId": "e-1",
  "lieBand": "early",
  "subjectRole": "self",
  "stanceHint": "hedge",
  "truthLevel": "hint",
  "variants": [
    {
      "id": "v1",
      "text": "...",
      "behaviorHint": "..."
    },
    { "id": "v2", "text": "...", "behaviorHint": "..." },
    { "id": "v3", "text": "...", "behaviorHint": "..." },
    { "id": "v4", "text": "...", "behaviorHint": "..." },
    { "id": "v5", "text": "...", "behaviorHint": "..." }
  ]
}
```

**subjectRole 값**:
- `self` — 본인이 관련된 증거 (핵심 반응)
- `other` — 상대가 관련된 증거
- `both` — 양쪽 모두 관련
- `institutional` — 기관/제3자 증거

#### 증거별 subjectRole 매핑

| 증거 | A에게 제시 시 | B에게 제시 시 |
|------|-------------|-------------|
| e-1 연락 기록 | other | self |
| e-2 단톡방 캡처 | self | other |
| e-3 과거 카톡 | both | both |
| e-4 예비신랑 메시지 | other | self |
| e-5 아버지-예비신랑 문자 | both (아버지 노출) | self |
| e-6 송금 영수증 | both (아버지 사기 노출) | self |
| e-7 대조표 | both | both |

---

### 3. witness (증인 증언)

```json
{
  "key": "w-1|vague",
  "witnessId": "w-1",
  "depth": "vague",
  "stanceHint": "answer",
  "truthLevel": "hint",
  "variants": [
    {
      "id": "v1",
      "text": "...",
      "behaviorHint": "..."
    },
    { "id": "v2", "text": "...", "behaviorHint": "..." },
    { "id": "v3", "text": "...", "behaviorHint": "..." }
  ]
}
```

**depth**: vague -> partial -> full (점진적으로 구체적)
**variant 수**: 3개

---

### 4. dossier (도시에 카드 대사)

```json
{
  "key": "b|dc-1|early",
  "party": "b",
  "dossierQuestionId": "dc-1",
  "lieBand": "early",
  "stanceHint": "hedge",
  "truthLevel": "hint",
  "variants": [
    { "id": "v1", "text": "...", "behaviorHint": "..." },
    { "id": "v2", "text": "...", "behaviorHint": "..." },
    { "id": "v3", "text": "...", "behaviorHint": "..." }
  ]
}
```

**variant 수**: 3개

---

### 5. aftermath (후일담)

```json
{
  "key": "a_primary_fault",
  "resultClass": "a_primary_fault",
  "variants": [
    { "id": "v1", "text": "..." },
    { "id": "v2", "text": "..." }
  ]
}
```

**resultClass 값**: a_primary_fault | b_primary_fault | shared_fault | protective_resolution | procedural_caution
**variant 수**: 2개
**화자**: 내레이터 (3인칭 관찰 시점)
**behaviorHint 불필요**

---

### 6. system_message (시스템 메시지)

```json
{
  "key": "interrogation|repeat_warning",
  "context": "interrogation",
  "eventType": "repeat_warning",
  "variants": [
    { "id": "v1", "text": "..." },
    { "id": "v2", "text": "..." }
  ]
}
```

---

## 전체 출력 래퍼

각 세션의 출력은 아래 형태로 감싸주세요:

```json
{
  "session": "session-N-description",
  "channel": "interrogation",
  "entries": [
    { ... entry 1 ... },
    { ... entry 2 ... },
    ...
  ]
}
```

---

## 메타데이터 태그에 대해

**variant의 tags와 sourceRefs는 생성하지 않아도 됩니다.**
후처리 스크립트가 key 정보를 기반으로 자동 주입합니다.

GPT Pro가 집중해야 하는 것:
1. **text** — 대사 내용 (품질의 핵심)
2. **behaviorHint** — 캐릭터 연기 지시 (1~2문장)
3. **stanceHint / truthLevel** — entry 수준 메타데이터

---

## 네이밍 규칙

- party: "a" (송다은), "b" (최수민)
- disputeId: "d-1", "d-2", "d-3", "d-4", "d-5"
- evidenceId: "e-1" ~ "e-7"
- witnessId: "w-1", "w-2", "w-3"
- lieState: "S0" ~ "S5"
- lieBand: "early" (S0~S1), "mid" (S2~S3), "late" (S4~S5)
