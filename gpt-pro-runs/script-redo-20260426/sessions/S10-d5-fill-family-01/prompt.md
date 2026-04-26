# S10 — family-01 d-5 cells 신규 작성 (5 채널)

## 작업 목표
**family-01 d-5 dispute에 대한 5 채널 entries 신규 작성**.

이전 GPT 작업이 spouse 매트릭스 (d-1, d-2, h-d3, h-d4)를 그대로 사용해 family-01의 d-5 cells가 누락됨. 이를 채워 넣음.

## ⚠️ 절대 강조 (이전 잘못 재발 방지)

**family-01 case data dispute = `d-1, d-2, d-3, d-4, d-5` (5 disputes)**.
**spouse-01의 `h-d3`, `h-d4` 사용 절대 금지**. 이번 작업은 오직 `d-5`만.

이전 잘못 패턴:
- ❌ S5 family contradiction_pursuit가 `a|h-d3|S1` 류 spouse 매트릭스 사용 → 627 P0
- ✅ 이번 d-5 작업은 `a|d-5|S1` 류 family 5번째 dispute 정확 사용

## family-01 d-5 dispute 의미 (case data)

```json
{
  "id": "d-5",
  "name": "어머니 이용의 진짜 주체",
  "truth": true,
  "truthDescription": "A는 B가 어머니를 이용했다고 단정했지만, 진실은 둘 다 어머니를 있는 그대로 두지 못했다. A는 유산을 당연시했고, B는 어머니 뜻을 고쳐 형을 보호하려 했다.",
  "quadrant": "both",
  "requiredEvidence": ["e-6", "e-7"],
  "correctResponsibility": {"a": 50, "b": 50},
  "ambiguity": "high",
  "weight": "high",
  "mediationLink": "어머니의 진정한 뜻과 두 아들의 책임",
  "legitimacyIssue": false,
  "judgmentStatement": "둘 다 어머니의 뜻을 자기 방식으로 해석했고, 어머니를 있는 그대로 두지 못했다.",
  "hidden": true
}
```

### 핵심 사실
- **양측 책임 (50:50)** — A 50% / B 50%
- **A 책임**: 유산을 당연시 / B에 대한 단정 / 어머니의 진짜 뜻을 자기 기준으로 해석
- **B 책임**: 어머니 뜻을 고쳐서 (90→60 변경) 형을 보호하려 함 / 어머니의 진짜 뜻을 자기 판단으로 바꿈
- **숨겨진 진실 (hidden=true)**: S3+ 이상에서 점진적 노출
- **연결 증거**: e-6 (20년 송금) + e-7 (어머니 일기장)
- **mediation**: 어머니의 진정한 뜻 / 두 아들의 책임

## family-01 사건 핵심 (절대 충돌 금지)

### 인물
- **A 윤태성** (48, 주방가구 공장 대표) — **confrontational** (강하고 단정적)
- **B 윤정후** (44, 자동차부품 가게) — **affect_flattening** (침착, 평면)

### 유서 비율 (★★★)
- **원본 유서 (어머니 진짜 뜻)**: B 90% / A 10%
- **조작된 유서 (B가 변경)**: **A 40% / B 60%**
- **B가 자기 몫 90% → 60%로 줄임**. 절대 반대 X.

### 사건 핵심 fact
- 출생 비밀 (어머니 일기장 / A 배다른 자식 / 회사 대표 노출 위기)
- B 20년 매월 80~150만원 어머니 통장 보탬 (사실은 B 돈)
- A 공장 부도 시 1억 넘는 돈 B가 막음
- B의 동기: "60:40이면 형이 분해도 법정까지는 안 간다"

## 작업 매트릭스 (정확한 cell key 명시)

### 1. contradiction_pursuit (8 cells × 10 variants = 80 variants)
```
a|d-5|S1, a|d-5|S2, a|d-5|S3, a|d-5|S4
b|d-5|S1, b|d-5|S2, b|d-5|S3, b|d-5|S4
```
각 cell:
- `key`: 위와 정확히 일치
- `party`: "a" 또는 "b"
- `disputeId`: "d-5"
- `lieState`: "S1"/"S2"/"S3"/"S4"
- `variants`: 10개 (id 패턴 `contra-{a|b}-d-5-S{n}-v{1~10}`)

### 2. interjection (4 cells × 10 variants = 40 variants)
```
a|d-5|minor, a|d-5|major
b|d-5|minor, b|d-5|major
```
- 발동 조건: 모순 추궁 시 / minor=가벼운 / major=강한
- variants 10개 (id `interject-{a|b}-d-5-{minor|major}-v{1~10}`)

### 3. emotional_overload (2 cells × 10 variants = 20 variants)
```
a|d-5
b|d-5
```
- 감정 폭발 (격앙 / 체념 등)
- variants 10개 (id `overload-{a|b}-d-5-v{1~10}`)

### 4. judge_question (12 cells × 5 variants = 60 variants)
```
d-5|fact_pursuit|1, d-5|fact_pursuit|2, d-5|fact_pursuit|3, d-5|fact_pursuit|4
d-5|motive_search|1, d-5|motive_search|2, d-5|motive_search|3, d-5|motive_search|4
d-5|empathy_approach|1, d-5|empathy_approach|2, d-5|empathy_approach|3, d-5|empathy_approach|4
```
- `disputeId`: "d-5"
- `questionType`: "fact_pursuit" / "motive_search" / "empathy_approach"
- `depth`: 1/2/3/4
- variants 5개 (id `judgeq-d-5-{questionType}-{depth}-v{1~5}`)

### 5. judge_contradiction (3 cells × 5 variants = 15 variants)
```
d-5|soft, d-5|mid, d-5|hard
```
- `disputeId`: "d-5"
- `tone`: "soft" / "mid" / "hard"
- variants 5개 (id `judgec-d-5-{tone}-v{1~5}`)

### 합계
- **29 cells / 215 variants**

## 9차원 검토 가이드 (모든 variants)

각 variant 작성 시:

1. **모순/추궁 종류** — 사실 / 입장 / 인지 단계 변화 (d-5는 책임 분배 / 인지 단계 핵심)
2. **NPC archetype 톤**:
   - A 윤태성 confrontational — 강하고 단정적, "둘 다 책임" 인정 어려움
   - B 윤정후 affect_flattening — 침착 평면, "둘 다 잘못" 차분히 인정
3. **lieState 단계** (S1~S4 별 톤 차이)
4. **추궁 차원** — 정보 / 동기 / 책임 / 인지
5. **NPC 발언 본질** (직접 인용 X but 본질 정확)
6. **인지 변화 단계** — A: "B가 잘못 → 둘 다 잘못 인정" / B: "보호하려 함 → 어머니 뜻 무시 인정"
7. **호칭** — 재판관 → "윤태성 씨" / "윤정후 씨" (제 형/동생 X via 재판관)
8. **합니다체 유지** (재판관 발언)
9. **간접 인용** (직접 인용 + 시스템 관찰 결합 절대 금지)

## 사용자 모범 patch 4 (필수 일관 적용)

| Patch | 차원 |
|---|---|
| 1 | "쪽이었는데" → "주장이었는데" (인지 단계 약화) |
| 2 | "무엇을 알고" → "왜 그렇게 확신하고" (정보 → 동기) |
| 3 | "흐리면" → "밝히지 않으면" (추상 → 직접 행동) |
| 4 | "{X} 돌봄/지원" → "{X}을 돌본/도운 것" (명사형 → 동사형) |

## Truth Throttle (lieState 단계별)

- S0~S1 (NPC): "그쪽 일", "그 부분", 모호 표현
- S2 (NPC): 일부 인정, 약칭
- S3+ (NPC): 구체적 인정 ("어머니 뜻을 제 식으로 해석", "유산을 당연시")
- S4 (NPC): 감정 호소 + 책임 인정 + 진실 전부 노출 가능
- 재판관: lieState 무관, 단계별 압박 (judge_question depth 1~4 / judge_contradiction soft/mid/hard)

## 메인 잘못 패턴 #1~#8 회피

특히:
- **#1 데이터 직접 read 검증**: case data d-5 dispute 정의 + 다른 채널의 d-1~d-4 본문 톤 참조
- **#2 임의 정보 작성 X**: 위 case data + family 사건 메모 외 정보 X
- **#3 다른 사건 정보 혼입 X**: spouse / friend 인물/사실 절대 X
- **#4 신규 작성 vs 보완**: 이번은 신규 작성 (d-5 cells가 없음)
- **#6 9차원 정확성**
- **#8 사건 설정 일치**: A 40 / B 60 비율, 출생 비밀, 20년 지원, 1억 막음 정확

## 출력 포맷

`output/d5-fill-family-01.json`:

```json
{
  "caseId": "family-01",
  "session": "S10-d5-fill",
  "version": "v1",
  "generatedAt": "2026-04-26T...",
  "notes": "family-01 d-5 dispute 5 채널 신규 작성 (이전 누락 보완)",
  "channels": {
    "contradiction_pursuit": {
      "entries": [
        {
          "key": "a|d-5|S1",
          "party": "a",
          "disputeId": "d-5",
          "lieState": "S1",
          "variants": [
            {
              "id": "contra-a-d-5-S1-v1",
              "text": "...",
              "behaviorHint": "...",
              "tags": [...],
              "sourceRefs": ["dispute:d-5"]
            },
            ... (10 variants)
          ]
        },
        ... (8 cells)
      ]
    },
    "interjection": { "entries": [...] },
    "emotional_overload": { "entries": [...] },
    "judge_question": { "entries": [...] },
    "judge_contradiction": { "entries": [...] }
  }
}
```

## 검증 체크리스트 (제출 전 필수)

- [ ] **모든 cell key가 d-5 (h-d3/h-d4 절대 X)**
- [ ] **사건 비율 A 40 / B 60 정확** (반대 패턴 0건)
- [ ] **5 채널 정확히 29 cells / 215 variants 모두 채움**:
  - contradiction_pursuit: 8 cells × 10v
  - interjection: 4 cells × 10v
  - emotional_overload: 2 cells × 10v
  - judge_question: 12 cells × 5v
  - judge_contradiction: 3 cells × 5v
- [ ] variant id 형식 정확 (`contra-a-d-5-S1-v1` / `judgeq-d-5-fact_pursuit-1-v1` 등)
- [ ] disputeId 필드 = "d-5" 모두 일관
- [ ] **호칭 "윤태성 씨" / "윤정후 씨"** (제 형/동생 X via 재판관)
- [ ] confrontational vs affect_flattening 차별화
- [ ] Truth Throttle (S0~S2에서 비율 노출 X)
- [ ] 사용자 모범 4 patch 일관 적용
- [ ] 직접 인용 + 시스템 관찰 결합 0건
- [ ] 변수 치환 패턴 0건 (judge_evidence_combo는 이번 작업 영역 X 그러나 judge_question/contradiction에서도 변수 치환 X)
- [ ] 5 variants/cell 다양성 (단조 X)
- [ ] **다른 사건 (spouse/friend) 인물/사실 혼입 0건**

## source 참조

- `01-case-family-01.json` — 사건 정의 (특히 disputes[4] = d-5)
- `03-scriptedText-family-01-full.json` — 다른 채널의 d-1~d-4 본문 (톤 참조)
- `04-story-v2-3cases.md` — family 사건 핵심
- `05-user-pattern-correction.md` — 사용자 모범 patch 4
- `06-korean-quality-rules.md` — 한국어 품질 규칙
- `07-mistake-patterns.md` — 잘못 패턴 #1~#8
