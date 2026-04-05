# Thread A 77건 확장 미션 — investigationStages 생성

> 작성: 2026-04-05 (CT)
> 상태: Stage-1 7건 PASS 완료 → 77건 확장 착수
> 선행: 7건 investigationStages 108개 질문 전수 검증 통과

---

## 1. 미션 개요

Stage-1에서 완성한 7건(-01)의 investigationStages를 기준으로,
나머지 **77건(-02~-12)**의 case JSON에 investigationStages를 생성한다.

- 대상: 7 카테고리 x 11건 = 77건
- 각 증거마다 stage 0/1/2 = 3단계 질문
- 도구: GPT Pro 세션 B (한 번에 4건씩)

---

## 2. investigationStages 구조

```typescript
investigationStages: {
  stage: number       // 0, 1, 2
  revealKey: string   // "request_original", "check_metadata", "restore_context"
  question: {
    text: string      // 심문 질문 (25~60자, 합니다체)
    attackVector: string // context | identity | authenticity | legality | timeline
  }
}[]
```

### 기준본 (spouse-01 e-1)

```json
[
  {
    "stage": 0,
    "revealKey": "request_original",
    "question": {
      "text": "공동계좌에서 상당한 금액이 이체된 사실을 인정하십니까?",
      "attackVector": "context"
    }
  },
  {
    "stage": 1,
    "revealKey": "check_metadata",
    "question": {
      "text": "이 이체를 본인이 직접 실행했다는 점에 대해 설명하십시오.",
      "attackVector": "identity"
    }
  },
  {
    "stage": 2,
    "revealKey": "restore_context",
    "question": {
      "text": "이체 직전 기관에 두 차례 전화한 기록이 있습니다. 이 통화의 목적을 설명하십시오.",
      "attackVector": "authenticity"
    }
  }
]
```

### revealKey 배정 패턴 (7건 실적)

| stage | revealKey | 비율 |
|-------|-----------|------|
| 0 | `request_original` | 36/36 (100%) |
| 1 | `check_metadata` | 36/36 (100%) |
| 2 | `restore_context` | 30/36 (83%) |
| 2 | `check_edits` | 6/36 (17%) — 크롭/편집이 핵심인 증거 |

### attackVector 선택 기준

| 값 | 의미 | 주로 쓰이는 stage |
|----|------|-------------------|
| `context` | 상황/배경/시간 관계 | stage 0, 1 |
| `identity` | 인물/주체/역할 | stage 1 |
| `authenticity` | 진위/조작/원본 여부 | stage 2 |
| `legality` | 취득 과정/적법성 | 제한적 |
| `timeline` | 시간 순서/선후관계 | stage 1, 2 |

---

## 3. 질문 작성 규칙 (7건)

1. **stage 0 = 경미한 압박 포함** — "설명하십시오" 지향, "알고 계셨습니까?" 지양
2. **revealKey 순서 고정**: `request_original` → `check_metadata` → `restore_context` (또는 `check_edits`)
3. **"특정 X" 패턴 금지** → "해당 X" 또는 구체적 중립 표현 사용
4. **anchorTruth 핵심 키워드 직접 노출 금지** — 인물 실명, 기관 정식명, 정확한 금액 등
5. **각 stage는 이전 stage보다 핵심에 더 접근** — 단계적 압박 에스컬레이션
6. **attackVector**: 질문 성격에 맞게 5종 중 선택
7. **번역체 금지** — 다음 9패턴 사용 불가:
   - "~된 것으로 생각됩니다"
   - "~의 존재를 알고 계셨습니까?"
   - "~에 대하여 어떻게 생각하십니까?"
   - "~하는 것이 사실입니까?"
   - "~라고 말씀하신 것입니까?"
   - "~인 것으로 보입니다"
   - "~할 수 있었던 것입니까?"
   - "~였다는 것을 인정하십니까?"
   - "~에 관하여 진술하십시오"

### 추가 규칙 (7건 검증에서 확인된 사항)

- 합니다체 ("~하십시오", "~입니까?")
- 25~60자
- stage 0: 진실 노출 제로 — 증거의 존재만 확인
- stage 1: 조사 결과(check_metadata)를 근거로 속성 추궁
- stage 2: 숨겨진 맥락/관계를 들이밀며 설명 요구, 답 직접 말하지 않음

---

## 4. GPT Pro 세션 구성

### 입력

각 배치마다:
- case JSON의 `evidence` 배열 (name, description, investigationResults, anchorTruth)
- case JSON의 `disputes` 배열
- case JSON의 `context.description`

### 출력

증거별 investigationStages 배열:
```json
{
  "evidenceId": "e-1",
  "investigationStages": [
    { "stage": 0, "revealKey": "request_original", "question": { "text": "...", "attackVector": "context" } },
    { "stage": 1, "revealKey": "check_metadata", "question": { "text": "...", "attackVector": "identity" } },
    { "stage": 2, "revealKey": "restore_context", "question": { "text": "...", "attackVector": "authenticity" } }
  ]
}
```

### 배치 크기

한 번에 **4건**씩 (사건당 증거 수가 많으므로).

---

## 5. GPT Pro 프롬프트 (복사 가능)

아래 프롬프트를 GPT Pro 세션 B에 그대로 복사해서 사용한다.

```
너는 솔로몬 법정 게임의 증거 조사 단계 설계 전문가다.
각 사건의 case JSON을 받아서, 모든 증거에 대해 3단계 investigationStages를 생성해.

[구조]
각 증거마다:
- stage 0: 표면 확인 + 경미한 압박 ("~에 대해 설명하십시오")
- stage 1: 중간 추궁 — 맥락 연결, 시점 확인
- stage 2: 핵심 추궁 — 결정적 질문

[revealKey]
- stage 0: "request_original"
- stage 1: "check_metadata"
- stage 2: "restore_context"
  (크롭/편집이 핵심 발견인 증거만 "check_edits")

[attackVector 선택]
- context: 상황/맥락
- identity: 누가/관련자
- authenticity: 진위/조작
- legality: 법적 의미
- timeline: 시간 순서

[질문 규칙]
- 합니다체 ("~하십시오", "~입니까?")
- 25~60자
- stage 0: 경미한 압박, 진실 노출 제로
- stage 1: 조사 결과를 근거로 속성 추궁
- stage 2: 핵심에 근접하되 직접 답을 말하지 않음
- 각 stage는 이전보다 핵심에 더 접근

[금지]
- "특정 X" 패턴 → "해당 X" 사용
- anchorTruth 핵심 키워드(인물 실명, 기관 정식명, 정확한 금액) 직접 노출
- "~의 존재를 알고 계셨습니까?" 같은 수동 표현
- 번역체 ("~된 것으로 생각됩니다", "~인 것으로 보입니다" 등)

[기준본 예시 — spouse-01 e-1]
[
  { "stage": 0, "revealKey": "request_original", "question": { "text": "공동계좌에서 상당한 금액이 이체된 사실을 인정하십니까?", "attackVector": "context" } },
  { "stage": 1, "revealKey": "check_metadata", "question": { "text": "이 이체를 본인이 직접 실행했다는 점에 대해 설명하십시오.", "attackVector": "identity" } },
  { "stage": 2, "revealKey": "restore_context", "question": { "text": "이체 직전 기관에 두 차례 전화한 기록이 있습니다. 이 통화의 목적을 설명하십시오.", "attackVector": "authenticity" } }
]

[출력 형식]
각 증거별로:
{
  "evidenceId": "e-1",
  "investigationStages": [...]
}

지금부터 사건 JSON을 보내줄게. 각 사건의 모든 증거에 대해 생성해줘.
```

---

## 6. 검증 체크리스트 (각 배치 완료 후)

- [ ] 모든 증거에 stage 0/1/2 3단계 존재
- [ ] stage 0 질문에 경미한 압박 포함 ("설명하십시오" 류)
- [ ] "특정 X" 0건
- [ ] anchorTruth 핵심 키워드 직접 노출 0건
- [ ] 번역체 0건 (9패턴)
- [ ] revealKey 순서 정확 (request_original → check_metadata → restore_context/check_edits)
- [ ] attackVector 적절성 (5종 중 하나)
- [ ] 합니다체 25~60자
- [ ] stage 2가 답을 직접 말하지 않음

---

## 7. 산출물

### 최종 목표
77건 case JSON(`src/data/cases/generated/{case}.json`)에 investigationStages 삽입 완료.

### 중간 산출물
배치별로 다음 형태의 JSON을 `thread-A/output/` 에 저장:
```json
{
  "case": "family-02",
  "evidenceStages": {
    "e-1": [ { "stage": 0, ... }, { "stage": 1, ... }, { "stage": 2, ... } ],
    "e-2": [ ... ],
    ...
  }
}
```

### 완료 보고
모든 배치 완료 후 CT에 보고. CT가 case JSON에 병합한다.

---

## 8. 배치 일정

| 배치 | 사건 | 건수 |
|------|------|------|
| 1 | family-02, family-03, family-04, family-05 | 4 |
| 2 | family-06, family-07, family-08, family-09 | 4 |
| 3 | family-10, family-11, family-12, friend-02 | 4 |
| 4 | friend-03, friend-04, friend-05, friend-06 | 4 |
| 5 | friend-07, friend-08, friend-09, friend-10 | 4 |
| 6 | friend-11, friend-12, neighbor-02, neighbor-03 | 4 |
| 7 | neighbor-04, neighbor-05, neighbor-06, neighbor-07 | 4 |
| 8 | neighbor-08, neighbor-09, neighbor-10, neighbor-11 | 4 |
| 9 | neighbor-12, partnership-02, partnership-03, partnership-04 | 4 |
| 10 | partnership-05, partnership-06, partnership-07, partnership-08 | 4 |
| 11 | partnership-09, partnership-10, partnership-11, partnership-12 | 4 |
| 12 | spouse-02, spouse-03, spouse-04, spouse-05 | 4 |
| 13 | spouse-06, spouse-07, spouse-08, spouse-09 | 4 |
| 14 | spouse-10, spouse-11, spouse-12, tenant-02 | 4 |
| 15 | tenant-03, tenant-04, tenant-05, tenant-06 | 4 |
| 16 | tenant-07, tenant-08, tenant-09, tenant-10 | 4 |
| 17 | tenant-11, tenant-12, workplace-02, workplace-03 | 4 |
| 18 | workplace-04, workplace-05, workplace-06, workplace-07 | 4 |
| 19 | workplace-08, workplace-09, workplace-10, workplace-11 | 4 |
| 20 | workplace-12 | 1 |
| **합계** | | **77건** |

---

## 9. 참조 파일

| 파일 | 용도 |
|------|------|
| `docs/ref/리뉴얼참고/thread-packages/thread-A/mission.md` | Stage-1 원본 미션 |
| `docs/ref/리뉴얼참고/thread-packages/thread-A/output/*.json` | 7건 완성 산출물 (기준본) |
| `docs/ref/리뉴얼참고/stage1-master-guide-for-expansion.md` | 마스터 가이드 |
| `src/data/cases/generated/{case}.json` | 입력 데이터 |
