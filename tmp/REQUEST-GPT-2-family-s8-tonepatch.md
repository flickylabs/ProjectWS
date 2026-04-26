# GPT Pro 의뢰 — family-01 S8 tonePatch 재작업

## 작업 목표
**기존 family-01 S8 tonePatch 64건 폐기 → 재작업**. 사건 비율을 정확히 반영한 신규 tonePatch 생성.

## ⚠️ 가장 중요한 사건 설정 (절대 충돌 금지)

### family-01 사건 — "치매 어머니의 유서"
- **A 윤태성** (48, 주방가구 공장 대표) — confrontational
- **B 윤정후** (44, 자동차부품 가게) — affect_flattening

### 유서 비율 (★ 가장 중요)
- **원본 유서 (어머니 진짜 뜻)**: B 90% / A 10%
- **조작된 유서 (B가 직접 변경)**: **A 40% / B 60%**
- **B가 자기 몫을 90% → 60%로 줄임**. A에게 30% 양보.

### B가 자기 몫 줄인 이유
- A의 **출생 비밀**: A도 배다른 자식. 어머니 일기장에 기록.
- A가 회사 대표라 출생 비밀 노출 시 **경영권 위기**.
- B 판단: "60:40이면 형이 분해도 법정까지는 안 간다. 90:10이면 무조건 법정 가서 일기장이 터진다."

### B의 20년 누적 사정
- 어머니 통장에 매달 80~150만 원 보탬 (총 20년).
- A 공장 부도 위기 시 1억 넘는 돈 대신 막아줌.
- 어머니가 "내 돈"이라며 A에게 전달.

### ⚠️ 절대 금지 패턴 (이전 GPT 산출물 잘못)
- ❌ "유서에는 제가 60, 제 동생이 40으로 적혀 있었습니다" (A가 60? 잘못)
- ❌ "그래서 90을 40으로 낮췄습니다" (B 90 → 40? 잘못)
- ❌ "원래 90대10을 형 60, 제 40으로 바꿨습니다" (B 40? 잘못)
- ❌ "형에게 60, 제게 40이면" (A 60 / B 40? 잘못)

### ✅ 정확한 패턴
- ✅ "유서에는 제 몫이 제 동생보다 작게 적혀 있었습니다" (A 발언 — A 40 / B 60)
- ✅ "그래서 90을 60으로 낮췄습니다" (B 발언 — B 자기 몫을 90 → 60)
- ✅ "제 몫을 90에서 60으로 줄이고, 형에게 40을 남겼습니다" (B 발언)
- ✅ "마지막 문서에는 제 몫이 더 작게 남아 있었습니다" (A 발언)

## 폐기되는 기존 tonePatch 분석

### 위치
`gpt-pro-runs/judge-messages-v3/_master/assets-family-01/gpt-pro-package/sessions/S8-aftermath-correction/output/S08-family-01-aftermath-tone-patch.json`

기존 64 patches:
- interrogation: 42건
- evidence_present: 14건
- dossier: 19건 (id 형식 잘못: `b-dc2-q1-early-v1` ← 실제 형식은 `dc-2-b-q1-early-v1`)
- 기타: 8건

### 기존 잘못 (재작업 시 절대 반복 금지)
1. **사건 비율 반대** — A 60 / B 40으로 잘못 설정
2. **dossier id 형식 오류** — `{party}-dc{n}-q{m}-...` ← 실제 형식 `dc-{n}-{party}-q{m}-...`
3. **before 본문 미스매치** — 통합 후 데이터와 0/64 일치

## 작업 절차

### 1단계: 기존 통합 데이터 확인 (필수)
대상: `src/data/scriptedText/family-01.json` 의 다음 채널/cells

각 cell의 현재 text를 정확히 읽어와서 patch 작성:
```javascript
// 검증용 코드
const data = require('src/data/scriptedText/family-01.json');
// dossier id 형식 확인
data.channels.dossier.entries[0].variants[0].id
// → "dc-1-b-q1-early-v1" 형식
```

### 2단계: 사건 설정 충돌 검출
다음 패턴이 있는 variant를 찾아서 보정:
- "60대40", "60:40" 본문 → A 40 / B 60 표현으로 수정 (B 자기 몫 줄임 강조)
- "제 몫이 더 크" → "제 몫이 더 작" (A 발언 시) 또는 그대로 유지 (B 발언 시)
- "형에게 60" → "제게 40" 또는 "형에게 40" (A vs B 시점 분리)

### 3단계: Truth Throttle 강화 보정
기존 Truth Throttle에 따라:
- S0~S2: 구체 비율 노출 X. "제 몫이 작게/크게", "어머니 몫이 분배가 이상하게"
- S3~S5: 구체 비율 노출 OK. "90을 60으로", "A 40 B 60"

## 9차원 검토 가이드

각 patch 작성 시 다음 9차원 모두 반영:

1. **모순/추궁 종류** — 사실 변화 / 입장 / 인지 단계 변화
2. **NPC archetype**:
   - A 윤태성 confrontational — 강하고 단정적, "우연으로 보기엔 너무 맞아떨어진다"
   - B 윤정후 affect_flattening — 침착하고 평면적, "그렇게 보이실 수 있습니다"
3. **lieState 단계** (S0~S5)
4. **추궁 차원** — 정보 / 동기 / 책임 / 인지
5. **공개 가능 정보** — Truth Throttle 단계 반영
6. **인지 변화 단계** — A: "확신 → 정황 해석 → 인정" / B: "오해 → 사정 → 자백"
7. **호칭 규칙** — 재판관 → "윤태성 씨" / "윤정후 씨" (절대 "제 형/동생" X via 재판관)
8. **합니다체 유지**
9. **간접 인용**

## 잘못 패턴 #1~#8 회피

(GPT-1 의뢰서 동일 — 특히 #2 임의 정보 / #6 9차원 정확성 / #8 사건 설정 일치)

## 출력 포맷

### 산출물: `S08-family-01-aftermath-tone-patch-v2.json`

```json
{
  "session": "S8",
  "caseId": "family-01",
  "version": "v2",
  "generatedAt": "2026-04-26T...",
  "notes": "기존 64건 폐기 후 사건 비율 정확히 반영하여 재작업",
  "aftermathEntries": [/* 기존 5 entries 유지 또는 보강 */],
  "tonePatch": [
    {
      "id": "a-d-1-S0-fact-pursuit-v1",
      "channel": "interrogation",
      "before": "{현재 family-01.json에 있는 정확한 text}",
      "after": "{보정된 text — 사건 비율 정확}",
      "reason": "S0 단계 truth throttle / B 60 A 40 정확 반영"
    },
    ...
  ]
}
```

## 검증 체크리스트 (제출 전 필수)

- [ ] **모든 before 본문이 현재 `src/data/scriptedText/family-01.json`의 실제 text와 정확히 일치**
- [ ] **사건 비율 A 40 / B 60 일관**. "B가 자기 몫 90 → 60으로 줄임" 명확
- [ ] dossier patch id 형식 `dc-{n}-{party}-q{m}-{lieBand}-v{n}` (party 가운데)
- [ ] interrogation/evidence_present 등 다른 채널 id 형식 정확
- [ ] Truth Throttle 단계별 정보 노출 정확
- [ ] 윤태성 (confrontational) vs 윤정후 (affect_flattening) archetype 차이 표현
- [ ] 사용자 모범 4 patch 일관 적용
- [ ] 직접 인용 + 시스템 관찰 결합 0건

## 메모리 참조
- 사건 설정: `memory/story_v2_confirmed_3cases.md` family 섹션
- 메인 잘못 패턴 #8: `memory/feedback_revision_meaning_over_form.md` 사건 설정 일치 검증
