# S11 — friend-01 d-5 cells 신규 작성 (5 채널)

## 작업 목표
**friend-01 d-5 dispute에 대한 5 채널 entries 신규 작성**.

(S10 family-01 prompt와 동일 구조. 사건 정보만 friend-01로 변경)

## ⚠️ 절대 강조 (이전 잘못 재발 방지)

**friend-01 case data dispute = `d-1, d-2, d-3, d-4, d-5` (5 disputes)**.
**spouse-01의 `h-d3`, `h-d4` 사용 절대 금지**. 이번 작업은 오직 `d-5`만.

이전 잘못 패턴:
- ❌ S5 friend contradiction_pursuit가 `a|h-d3|S1` 류 spouse 매트릭스 사용 → 627 P0
- ✅ 이번 d-5 작업은 `a|d-5|S1` 류 friend 5번째 dispute 정확 사용

## friend-01 d-5 dispute 의미 (case data)

```json
{
  "id": "d-5",
  "name": "단톡방 매도와 명예훼손",
  "truth": true,
  "truthDescription": "A가 확인 없이 단톡방에서 B를 매도했고, B는 또 악역을 자처하는 구조가 반복됐다. 두 사람 모두 확인 전에 단정한 책임이 있다.",
  "quadrant": "both",
  "requiredEvidence": ["e-2", "e-7"],
  "correctResponsibility": {"a": 60, "b": 40},
  "ambiguity": "high",
  "weight": "high",
  "judgmentStatement": "먼저 단정하고 공개한 쪽의 책임이 더 크지만 침묵으로 반복을 허용한 쪽도 책임이 있다.",
  "hidden": true
}
```

### 핵심 사실
- **A 60% / B 40%** (먼저 공개 단정한 A 책임 더 크지만 B 침묵 책임도)
- **A 책임**: 확인 없이 단톡방 매도 / 명예훼손
- **B 책임**: 또 혼자 악역을 자처 / 침묵으로 반복 허용 / 진실 안 말함
- **숨겨진 진실 (hidden=true)**: S3+ 점진 노출
- **연결 증거**: e-2 (단톡방 캡처) + e-7 (대조표)

## friend-01 사건 핵심 (절대 충돌 금지)

### 인물
- **A 송다은** (31, 온라인 쇼핑몰 CS) — **premature_summary** (빠른 결론, 확인 전 단정)
- **B 최수민** (31, 필라테스 강사) — **affect_flattening** (침착, 평면, 감정 안 드러냄)

### 사건 핵심 fact
- 예비신랑이 먼저 B에게 찝적댐 (술자리 후 연락)
- B가 예비신랑에게 연락한 진짜 이유: A 아버지 돈 갈취 접근 정황
- 과거 손절 원인도 A 아버지 사기 (B가 차마 못 말함)
- 같은 패턴 반복: 아버지 → B → 예비신랑

### ⚠️ 절대 금지
- **family-01 사건 정보 절대 X**: 출생 비밀 / 유서 / 60:40 비율 / 어머니 일기장 / 윤태성 / 윤정후
- **spouse-01 사건 정보 절대 X**: 시댁 갈등 / 위임장 / 형 빚 / 박지연 / 이준호

## 작업 매트릭스 (정확한 cell key 명시)

(S10 family-01 prompt와 동일)

### 1. contradiction_pursuit (8 cells × 10 variants = 80v)
```
a|d-5|S1, a|d-5|S2, a|d-5|S3, a|d-5|S4
b|d-5|S1, b|d-5|S2, b|d-5|S3, b|d-5|S4
```

### 2. interjection (4 cells × 10v = 40v)
```
a|d-5|minor, a|d-5|major
b|d-5|minor, b|d-5|major
```

### 3. emotional_overload (2 cells × 10v = 20v)
```
a|d-5
b|d-5
```

### 4. judge_question (12 cells × 5v = 60v)
```
d-5|fact_pursuit|1, d-5|fact_pursuit|2, d-5|fact_pursuit|3, d-5|fact_pursuit|4
d-5|motive_search|1, d-5|motive_search|2, d-5|motive_search|3, d-5|motive_search|4
d-5|empathy_approach|1, d-5|empathy_approach|2, d-5|empathy_approach|3, d-5|empathy_approach|4
```

### 5. judge_contradiction (3 cells × 5v = 15v)
```
d-5|soft, d-5|mid, d-5|hard
```

### 합계: 29 cells / 215 variants

## 9차원 검토 가이드

특히:
- **A 송다은 premature_summary** — "기록을 보자마자 집착이라고 받아들였습니다", 빠른 단정
  - d-5 톤: "단톡방에 올린 건 너무 빨랐습니다", "확인 전에 결론 냈습니다"
- **B 최수민 affect_flattening** — "다은이에게 말하지 못했습니다", 침착 평면
  - d-5 톤: "또 혼자 악역이 되는 게 익숙해서가 아니라", "침묵이 반복을 허용했습니다"

(S10 동일 — 9차원 / 사용자 모범 4 / Truth Throttle / 잘못 패턴 #1~#8)

## Truth Throttle (lieState 단계별)

- S0~S1 (NPC):
  - A: "수민 씨가 잘못한 게 맞다", 단정 유지
  - B: "그럴 수 있다고 봅니다", 모호
- S2:
  - A: "확인이 부족했을 수 있습니다", 일부 인정
  - B: "말 못 한 부분이 있었습니다"
- S3+:
  - A: "확인 없이 단톡방에 올렸습니다", 책임 인정
  - B: "또 혼자 악역을 자처했습니다", 침묵 책임 인정
- S4: 감정 호소 + 책임 인정

## 출력 포맷

`output/d5-fill-friend-01.json` (S10 동일 구조)

## 검증 체크리스트 (제출 전 필수)

- [ ] **모든 cell key가 d-5** (h-d3/h-d4/d-1/d-2/d-3/d-4 0건)
- [ ] **5 채널 정확히 29 cells / 215 variants 모두 채움**
- [ ] variant id 형식 정확
- [ ] disputeId 필드 = "d-5" 모두 일관
- [ ] **호칭 "송다은 씨" / "최수민 씨"** (제 친구 X via 재판관)
- [ ] premature_summary vs affect_flattening 차별화
- [ ] Truth Throttle (S0~S2에서 "9일", "11번", "아버지 돈", "사기" 노출 X)
- [ ] 사용자 모범 4 patch 일관 적용
- [ ] 직접 인용 + 시스템 관찰 결합 0건
- [ ] 변수 치환 패턴 0건
- [ ] 5 variants/cell 다양성
- [ ] **family-01 사건 정보 (출생 비밀 / 유서 / 60:40) 절대 혼입 0건**

## source 참조

- `01-case-friend-01.json` — 사건 정의 (특히 disputes[4] = d-5)
- `03-scriptedText-friend-01-full.json` — 다른 채널의 d-1~d-4 본문 톤 참조
- `04-story-v2-3cases.md` — friend 사건 핵심
- `05-user-pattern-correction.md` / `06-korean-quality-rules.md` / `07-mistake-patterns.md`
