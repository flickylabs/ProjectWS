# S5 — family-01 S8 tonePatch 재작업

## 작업 목표
**기존 family-01 S8 tonePatch 64건 폐기 → 사건 비율 정확 반영하여 재작업**.

## 입력 source
- `01-case-family-01.json` — 사건 정의
- `03-scriptedText-family-01-full.json` — **현재 통합본 ScriptedText** (5,172v / 18ch — patch.before base)
- `04-story-v2-3cases.md` — family 사건 핵심 (★ 비율)
- `06-korean-quality-rules.md` / `07-mistake-patterns.md`

## ⚠️ family-01 사건 핵심 (절대 충돌 금지)

(S2 prompt와 동일 — 다시 강조)

### 유서 비율 (★★★)
- **원본 유서**: B 90% / A 10%
- **조작된 유서 (B가 변경)**: **A 40% / B 60%**
- **B가 자기 몫 90% → 60%로 줄임**

### B가 자기 몫 줄인 이유
- A의 출생 비밀 (어머니 일기장)
- A 회사 대표 → 비밀 노출 시 경영권 위기
- B 판단: "60:40이면 형이 분해도 법정까지 안 간다"

### B의 20년 누적
- 어머니 통장에 매달 80~150만 원 (총 20년)
- A 공장 부도 시 1억 넘는 돈 대신 막음

### ⚠️ 절대 금지 (이전 GPT 산출물 잘못)
- ❌ "유서에는 제가 60, 제 동생이 40" (A 60? **잘못**)
- ❌ "그래서 90을 40으로 낮췄습니다" (B 40? **잘못**)
- ❌ "원래 90대10을 형 60, 제 40으로 바꿨습니다" (B 40? **잘못**)
- ❌ "형에게 60, 제게 40이면" (**잘못**)

### ✅ 정확한 패턴
- ✅ "유서에는 제 몫이 제 동생보다 작게 적혀 있었습니다" (A 발언)
- ✅ "그래서 90을 60으로 낮췄습니다" (B 발언 — B 자기 몫 90→60)
- ✅ "제 몫을 90에서 60으로 줄이고, 형에게 40을 남겼습니다" (B 발언)
- ✅ "마지막 문서에는 제 몫이 더 작게 남아 있었습니다" (A 발언)

## 폐기되는 기존 (참고 — 절대 답습 X)
- 위치: `gpt-pro-runs/judge-messages-v3/_master/assets-family-01/.../S8/output/S08-family-01-aftermath-tone-patch.json`
- 기존 64 patches 모두 잘못:
  - 사건 비율 반대 (A 60 / B 40)
  - dossier 19건 id 형식 잘못 (`b-dc2-q1-...` ← 실제 `dc-2-b-q1-...`)
  - before 본문 0/64 일치 (모두 미스매치)

## 작업 절차

### 1단계: 통합본에서 실제 text 확인 (필수)
- `03-scriptedText-family-01-full.json` 읽음
- 각 patch 작성 시 **현재 text를 정확히 base로 사용**
- dossier id 형식 확인: `dc-{n}-{party}-q{m}-{lieBand}-v{n}` (party 가운데)

### 2단계: 사건 설정 충돌 검출
다음 패턴이 있는 variant를 찾아서 보정:
- "60대40", "60:40" 본문 → A 40 / B 60 표현으로 수정 (B 자기 몫 줄임 강조)
- "제 몫이 더 크" → "제 몫이 더 작" (A 발언 시) 또는 그대로 유지 (B 발언 시)
- "형에게 60" → "제게 40" 또는 "형에게 40" (A vs B 시점 분리)

### 3단계: Truth Throttle 보정
- S0~S2: 구체 비율 노출 X. "제 몫이 작게/크게", "어머니 몫이 분배가 이상하게"
- S3~S5: 구체 비율 노출 OK. "90을 60으로", "A 40 B 60"

### 4단계: archetype 톤 보강
- A 윤태성 confrontational: 강하고 단정적
- B 윤정후 affect_flattening: 침착, 평면

## 채널별 patch 분포 (참고)
- interrogation: 42건
- evidence_present: 14건
- dossier: 19건 ★ id 형식 fix 필수
- 기타: 8건

## 출력 포맷

`output/S08-family-01-aftermath-tone-patch-v2.json`:

```json
{
  "session": "S5-family-s8-tonepatch-v2",
  "caseId": "family-01",
  "version": "v2",
  "generatedAt": "2026-04-26T...",
  "notes": "기존 64건 폐기 후 사건 비율 정확히 반영 + dossier id 형식 정정 (dc-{n}-{party}-q{m}-{lieBand}-v{n})",
  "tonePatch": [
    {
      "id": "a-d-1-S0-fact-pursuit-v1",
      "channel": "interrogation",
      "before": "{현재 family-01.json의 정확한 text}",
      "after": "{보정 — 사건 비율 정확}",
      "reason": "S0 truth throttle / B 60 A 40 정확 반영"
    },
    ...
  ]
}
```

## 검증 체크리스트 (제출 전)

- [ ] **모든 before 본문이 03-scriptedText-family-01-full.json의 실제 text와 정확히 일치**
- [ ] **사건 비율 A 40 / B 60 일관**, "B가 자기 몫 90→60 줄임" 명확
- [ ] dossier patch id 형식 `dc-{n}-{party}-q{m}-{lieBand}-v{n}`
- [ ] interrogation/evidence_present 등 다른 채널 id 형식 정확
- [ ] Truth Throttle 단계별 정보 노출 정확
- [ ] confrontational vs affect_flattening 차별화
- [ ] 사용자 모범 4 patch 일관 적용
- [ ] 직접 인용 + 시스템 관찰 결합 0건
