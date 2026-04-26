# S6 — friend-01 S8 dossier tonePatch 재작업

## 작업 목표
**기존 friend-01 S8 dossier tonePatch 14건 폐기 → S4 expanded 본문 base로 정확한 patch 재작업**.

## 입력 source
- `01-case-friend-01.json` — 사건 정의
- `03-scriptedText-friend-01-full.json` — **현재 통합본 ScriptedText** (5,082v / 18ch — patch.before base)
- `04-story-v2-3cases.md` — friend 사건 핵심
- `06-korean-quality-rules.md` / `07-mistake-patterns.md`

## ⚠️ friend-01 사건 핵심 (절대 충돌 금지)

(S3 prompt와 동일)

### 인물
- **A 송다은** (31, 온라인 쇼핑몰 CS) — premature_summary
- **B 최수민** (31, 필라테스 강사) — affect_flattening

### 핵심 사실
1. A는 결혼 3주 앞두고 예비신랑에게 B 연락 발견 → 단톡방 폭로
2. **예비신랑이 먼저 B에게 찝적댐**
3. **B가 예비신랑에게 연락한 진짜 이유**: A 아버지 돈 갈취 접근 정황
4. **과거 손절도 A 아버지 사기**가 원인. B는 차마 못 말함.
5. 같은 패턴 반복 (아버지 → B → 예비신랑)

### dossier 9 questions × 3 lieBand = 27 cells
각 cell × 10 variants = 270 dossier variants

## 폐기되는 기존 (참고 — 절대 답습 X)
- 위치: `gpt-pro-runs/judge-messages-v3/_master/assets-friend-01/.../S8/output/s08_friend01_aftermath_tone_patch.json` (dossier 14건)
- 기존 잘못:
  1. **id 형식 오류** — `{party}-dc{n}-...` ← 실제 형식 `dc-{n}-{party}-...`
  2. **본문 base 불일치** — S4 expanded 이전 (200~300자 상세) 본문 가리킴
  3. 통합 데이터 (S4 expanded 50~100자 간결) 본문과 정합 0건

## dossier id 형식 (필수 준수)
- ✅ 정확: `dc-1-a-q1-early-v1`, `dc-3-b-q1-mid-v2`, `dc-5-a-q1-late-v3`
- ❌ 잘못: `a-dc1-q1-early-v1`, `b-dc3-q1-mid-v2`

## 작업 절차

### 1단계: S4 expanded 본문 base 확인 (필수)
- `03-scriptedText-friend-01-full.json` dossier entries 직접 read
- 각 cell의 actual text 확인 후 patch 작성

### 2단계: 보정 대상 선정
S4 expanded 본문 중에서 다음 차원이 약한 것을 보정:
- Truth Throttle 위반 (S0~S2에서 너무 구체)
- 사용자 모범 4 patch 미적용
- archetype 톤 약함 (premature_summary / affect_flattening 차별 부족)
- 사건 설정 누락 ("아버지 돈 갈취" / "예비신랑 선 넘은 메시지" 등 핵심 fact 미반영)

### 3단계: tonePatch 작성

각 patch:
```json
{
  "id": "dc-1-a-q1-early-v1",
  "channel": "dossier",
  "before": "{현재 friend-01.json dossier의 정확한 text}",
  "after": "{보정 — 사용자 모범 4 + 사건 설정 정확}",
  "reason": "{보정 차원 명시}"
}
```

## dossier 카드 (case data 확인 후 매핑)
- dc-1: 단톡방 폭로 시작 — A 빠른 단정
- dc-2: B 침묵 / 해명 못한 이유
- dc-3: A 아버지 과거 사기 (B에게)
- dc-4: 예비신랑 선 넘은 메시지
- dc-5: 같은 패턴 반복 (A 아버지 → 예비신랑)
- dc-6~9: case data 확인 후 매핑

## 9차원 + 사용자 모범 4 (S1 동일)

특히:
- **A 송다은 premature_summary**: "기록을 보자마자 집착이라고 받아들였습니다", 빠른 단정
- **B 최수민 affect_flattening**: "다은이에게 말하지 못했습니다", "악역이 되는 게 익숙해서가 아니라"

## 출력 포맷

`output/s08-friend01-dossier-tonepatch-v2.json`:

```json
{
  "session": "S6-friend-s8-dossier-v2",
  "caseId": "friend-01",
  "version": "v2",
  "channel": "dossier",
  "generatedAt": "2026-04-26T...",
  "notes": "기존 14건 dossier patch 폐기 후 S4 expanded 본문 base로 재작업. id 형식 정정 (dc-{n}-{party}-q{m}-{lieBand}-v{n}).",
  "tonePatch": [
    {
      "id": "dc-1-a-q1-early-v1",
      "channel": "dossier",
      "before": "...",
      "after": "...",
      "reason": "..."
    },
    ...
  ]
}
```

## 검증 체크리스트 (제출 전)

- [ ] **모든 before 본문이 03-scriptedText-friend-01-full.json dossier의 실제 text와 정확히 일치**
- [ ] patch id 형식 `dc-{n}-{party}-q{m}-{lieBand}-v{n}` (party 가운데)
- [ ] 사건 설정 정확:
  - 예비신랑이 먼저 찝적댐 (B 가해자 X)
  - A 아버지가 과거 사기 + 현재 예비신랑에게 돈 갈취
  - **B 출생 비밀 절대 X** (이는 family-01 사건)
- [ ] A premature_summary / B affect_flattening 차별화
- [ ] Truth Throttle 단계 정확
- [ ] 사용자 모범 4 patch 일관
