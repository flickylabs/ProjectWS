# 스레드 A — 증거 시스템 데이터 완성

> 담당: 6건(family-01, friend-01, neighbor-01, partnership-01, tenant-01, workplace-01)의 증거 데이터 완성
> 주 도구: GPT Pro (데이터 생성) + 자체 검증
> 산출물: 수정된 6개 case JSON

---

## 1. 배경 — 이번에 바뀐 것

### 증거가 더 이상 "바로 보이지 않는다"
이전: 증거를 열면 이름/설명이 바로 보임 → 진실이 즉시 드러남
이후: 3단계 공개 구조

```
[1단계: 표면] surfaceName만 보임 ("은행 이체 내역서")
     ↓ 조사 (돋보기)
[2단계: 조사 결과] investigationResults 하나씩 공개
     ↓ 조사를 더 하면
[3단계: 전체] 실제 name/description 공개 ("공동계좌→최민정 280만원 이체 내역")
```

### 증거 조사가 심문과 연결된다
조사할수록 더 날카로운 심문 질문이 해금된다.
이것이 `investigationStages` — **이번 작업의 핵심**.

```
[증거 e-1 열람] → stage 0 질문: "이 거래에 대해 설명하십시오" (기본)
[1회 조사]     → stage 1 질문: "본인이 직접 실행한 건가요?" (속성 추궁)
[2회 조사]     → stage 2 질문: "이체 전 특정 기관에 전화했습니다" (결정적)
```

### 카드는 "오토 정답지"
카드(DossierCard)를 사용하면 증거 조사 전단계를 자동으로 스킵하고 최적 질문을 바로 실행한다.
즉, 수동 경로(조사→심문)의 정답이 카드 경로.

---

## 2. 이번 작업: investigationStages 생성

### 대상
6건 × 6개 증거 = 36개 증거, 각 3단계 = **108개 질문**

### 완성 템플릿 (spouse-01)

spouse-01의 e-1 (은행 이체 내역서) 예시:

```json
"investigationStages": [
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
      "text": "이체 직전 특정 기관에 두 차례 전화한 기록이 있습니다. 이 통화의 목적을 설명하십시오.",
      "attackVector": "authenticity"
    }
  }
]
```

### 작성 규칙

**stage 0 (열람만으로 가능한 질문)**
- 증거의 존재를 확인하는 수준
- 진실 노출 제로 — "이것이 있다"는 사실만 추궁
- 예: "이 거래에 대해 설명하십시오", "이 문서를 본 적이 있습니까?"

**stage 1 (1회 조사 후 해금)**
- 조사로 발견한 구체적 속성(시각, 주체, 형식)을 추궁
- 결론은 내리지 않되, 단서를 제시
- revealKey: 보통 `check_metadata` 또는 `request_original`
- 예: "이 캡처가 새벽 시간에 생성된 이유를 설명하십시오"

**stage 2 (2회 조사 후 해금)**
- 조사로 발견한 숨겨진 맥락/관계를 정면으로 들이밀며 설명 요구
- 핵심 진실에 근접하되 직접 말하지는 않음
- revealKey: 보통 `restore_context` 또는 `check_edits`
- 예: "대화의 위아래를 의도적으로 잘라낸 것으로 확인됩니다. 왜 전체를 제출하지 않았습니까?"

**공통 규칙**
- 재판관 말투: 합니다체 ("~하십시오", "~입니까?")
- 25~60자
- 각 질문에 `attackVector` 배정: `context` / `identity` / `authenticity` / `legality`
- revealKey는 해당 증거의 `investigationResults` 키와 일치해야 함

### attackVector 선택 기준
- `context`: 상황/배경/시간 관계를 추궁할 때
- `identity`: 인물/주체/역할을 추궁할 때
- `authenticity`: 진위/조작/원본 여부를 추궁할 때
- `legality`: 취득 과정/적법성을 추궁할 때

---

## 3. 부가 작업: requiredLieState 정교화

현재 6건에 자동 배정된 상태:
- requires 있는 증거 + hard → S3
- requires 있는 증거 + soft → S2

이것을 **사건 맥락에 맞게 조정**한다.

기준:
- 결정적 진실을 드러내는 증거 → S3 (충분히 심문한 후에야 접근)
- 맥락을 확장하는 보조 증거 → S2
- 의심을 유발하는 출발점 → 게이팅 없음

---

## 4. 작업 방법

### GPT Pro에 전달할 것
각 사건별로:
1. `src/data/cases/generated/{case}.json` — 증거 6개의 name, description, investigationResults 전체
2. 이 문서 (작성 규칙)
3. spouse-01 완성 예시

### GPT Pro에 요청할 것
"각 증거의 investigationResults를 읽고, stage 0/1/2 질문을 작성하라. 규칙을 정확히 따라라."

### 검증 기준
- [ ] stage 0 질문에 진실 노출 없음
- [ ] stage 1 질문이 조사 결과를 근거로 함
- [ ] stage 2 질문이 핵심에 근접하되 직접 답을 말하지 않음
- [ ] 모든 질문이 합니다체, 25~60자
- [ ] revealKey가 investigationResults에 실재하는 키
- [ ] attackVector가 4종 중 하나

---

## 5. 산출물 형식

각 사건별로 다음 형태의 JSON 데이터를 제출:

```json
{
  "case": "friend-01",
  "evidenceStages": {
    "e-1": [
      { "stage": 0, "revealKey": "request_original", "question": { "text": "...", "attackVector": "context" } },
      { "stage": 1, "revealKey": "check_metadata", "question": { "text": "...", "attackVector": "identity" } },
      { "stage": 2, "revealKey": "restore_context", "question": { "text": "...", "attackVector": "authenticity" } }
    ],
    "e-2": [ ... ],
    ...
  }
}
```

컨트롤 타워가 이것을 받아서 case JSON에 통합한다.

---

## 6. 직접 수행 가이드

### 추천 방식: 에이전트 병렬 + 교차 검증

품질 최대화를 위해 다음 3단계로 진행한다.

#### 1단계: 데이터 생성 (에이전트 병렬)
- 6건을 2~3건씩 묶어 에이전트를 병렬 생성한다.
- 각 에이전트에 전달할 내용:
  - 해당 사건의 evidence 배열 (name, description, investigationResults 전체)
  - spouse-01 완성 예시 (6개 증거의 investigationStages)
  - 섹션 2의 작성 규칙 전문
- 에이전트 프롬프트 예시:
```
다음 사건의 증거 6개에 investigationStages를 작성하라.

[규칙]
(섹션 2의 작성 규칙을 그대로 복사)

[완성 예시 — spouse-01 e-1]
(spouse-01의 e-1 investigationStages를 그대로 복사)

[대상 — {case}]
(해당 사건의 evidence 배열을 복사)

각 증거별로 stage 0/1/2 질문을 작성하고, JSON 형식으로 출력하라.
```

#### 2단계: 교차 검증 (별도 에이전트)
- 1단계 산출물을 **별도 검증 에이전트**에 전달한다.
- 검증 에이전트 프롬프트:
```
다음 investigationStages 데이터를 검증하라.

[검증 기준]
- stage 0 질문에 진실이 노출되는가? (기관명, 인물명, 금액, 서비스명)
- stage 1 질문이 해당 revealKey의 investigationResults 내용을 근거로 하는가?
- stage 2 질문이 핵심에 근접하되 직접 답을 말하지 않는가?
- 모든 질문이 합니다체이고 25~60자인가?
- revealKey가 실존하는 investigationResults 키인가?
- attackVector가 context/identity/authenticity/legality 중 하나인가?

문제가 있으면 구체적으로 지적하고 수정안을 제시하라.
```

#### 3단계: 문제 수정
- 검증에서 발견된 문제를 수정 에이전트 또는 직접 수정한다.
- 수정 후 다시 검증 에이전트를 돌린다 (2~3회 반복 가능).

### GPT Pro 활용 시
- GPT Pro에 전달할 파일을 사건별 폴더로 구성:
```
gpt-session-A1/
  mission-rules.md          ← 섹션 2 작성 규칙
  spouse-01-example.json    ← spouse-01 evidence (investigationStages 포함)
  family-01-evidence.json   ← 대상 사건의 evidence 배열만 추출
  prompt.md                 ← "이 규칙과 예시에 따라 작성하라"
```
- GPT 결과를 받으면 반드시 검증 에이전트를 돌린다.

### 주의
- **직접 작성하더라도 반드시 별도 검증 단계를 거쳐라.** 작성자와 검증자가 같은 컨텍스트에서 동시에 작업하면 실수를 놓친다.
- 에이전트를 "작성용"과 "검증용"으로 분리하는 것이 핵심.
