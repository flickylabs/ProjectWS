# GPT Pro 의뢰 — friend-01 S8 dossier tonePatch 재작업

## 작업 목표
**기존 friend-01 S8 dossier tonePatch 14건 폐기 → 재작업**. S4 expanded 본문을 base로 정확한 patch 생성.

## ⚠️ 사건 설정 (절대 충돌 금지)

### friend-01 사건 — "손절한 절친"
- **A 송다은** (31, 온라인 쇼핑몰 CS) — premature_summary
- **B 최수민** (31, 필라테스 강사) — affect_flattening

### 핵심 사실
1. A는 결혼 3주 앞두고 예비신랑 휴대전화에 B 연락 발견 → "또 손댄다" 단톡방 폭로
2. **예비신랑이 먼저 B에게 찝적댐** (술자리 후 연락, 둘이 보자 등). B는 "A 남자친구잖아, 하지 마"로 선 그음.
3. **B가 예비신랑에게 연락한 진짜 이유**: A 아버지가 예비신랑에게 돈 갈취 접근 정황 포착 (물증 X).
4. **과거 손절 원인도 A 아버지**: A 아버지가 B에게 사기. B는 차마 못 말하고 A는 "B가 돈 때문에 변했다"고 오해.
5. A 아버지가 과거 B에게 한 짓을 이번엔 예비신랑에게 하려는 것. B는 같은 패턴 알아본 것.
6. B는 또 혼자 악역. 같은 패턴 반복.

### 캐릭터 archetype
- **A 송다은 premature_summary**: 빠른 결론, 확인 전 단정. "기록만 보고 집착으로 못 박았다"
- **B 최수민 affect_flattening**: 침착하고 평면적. 감정 드러내지 않음. "다은이에게 말하지 못했습니다"

## 폐기되는 기존 tonePatch 분석

### 위치
`gpt-pro-runs/judge-messages-v3/_master/assets-friend-01/gpt-pro-package/sessions/S8-aftermath-correction/output/s08_friend01_aftermath_tone_patch.json`

dossier 14 patches 모두 적용 안 됨 (id + 본문 둘 다 잘못):
- patch id 형식: `a-dc1-q1-early-v1` / `b-dc4-q1-mid-v1` (party 앞)
- 실제 통합 데이터 id 형식: `dc-1-a-q1-early-v1` / `dc-4-b-q1-mid-v1` (party 가운데)
- patch.before = 200~300자 상세 본문 (S4 expanded 이전 버전)
- 통합 데이터 actual = 50~100자 간결 본문 (S4 expanded 적용된 신규 본문)

### 기존 잘못 (재작업 시 절대 반복 금지)
1. **id 형식 오류** — `{party}-dc{n}-...` ← 실제 형식 `dc-{n}-{party}-...`
2. **본문 base 불일치** — S4 expanded 이전 본문 가리킴

## 작업 절차

### 1단계: S4 expanded 본문 base 확인
- 기존 통합본의 dossier 27 cells × 10 variants = 270 variants는 모두 S4 expanded 출신
- patch 작성 시 **반드시 현재 `src/data/scriptedText/friend-01.json` dossier entries의 실제 text를 base로 사용**

### 2단계: 보정 대상 선정
S4 expanded 본문 중에서 다음 차원이 약한 것을 보정:
- Truth Throttle 위반 (S0~S2에서 너무 구체)
- 사용자 모범 4 patch 미적용 (인지 단계 / 동기 추궁 / 직접 행동 / 동사형 자연체)
- archetype 톤 약함 (premature_summary / affect_flattening 차별화 부족)
- 사건 설정 누락 ("아버지 돈 갈취" / "예비신랑 선 넘은 메시지" 등 핵심 fact 미반영)

### 3단계: tonePatch 작성

각 patch는 다음 구조:
```json
{
  "id": "dc-1-a-q1-early-v1",
  "channel": "dossier",
  "before": "{현재 friend-01.json dossier entries의 정확한 text}",
  "after": "{보정 — 사용자 모범 4 patch + 사건 설정 정확}",
  "reason": "{보정 차원 명시 — Truth Throttle / archetype / 인지 단계 등}"
}
```

## dossier 27 cells 매트릭스

friend-01 dossier:
- 9 questions × 3 lieBand (early/mid/late) = 27 cells
- 각 cell × 10 variants = 270 variants

### dossier 카드 (9개) 의미
- dc-1: 단톡방 폭로 시작 — A의 빠른 단정
- dc-2: B의 침묵 / 해명 못한 이유
- dc-3: A 아버지 과거 사기 (B에게)
- dc-4: 예비신랑 선 넘은 메시지
- dc-5: 같은 패턴 반복 (A 아버지 → 예비신랑)
- dc-6~9: case data 확인 후 매핑

## 9차원 검토 가이드

각 patch 작성 시 다음 9차원 모두 반영:

1. **모순/추궁 종류**
2. **NPC archetype 톤**:
   - A 송다은 premature_summary — "기록을 보자마자 집착이라고 받아들였습니다"
   - B 최수민 affect_flattening — "다은이에게 말하지 못했습니다", "악역이 되는 게 익숙해서가 아니라"
3. **lieState 단계** (S0~S5)
4. **추궁 차원** — 정보 / 동기 / 책임 / 인지
5. **공개 가능 정보** — Truth Throttle
6. **인지 변화 단계** — A: "확실 → 정황 해석 → 인정" / B: "침묵 → 사정 → 자백"
7. **호칭 규칙** — 재판관 → "송다은 씨" / "최수민 씨"
8. **합니다체 유지**
9. **간접 인용**

## 사용자 모범 patch 4

| Patch | 잘못 → 보정 |
|---|---|
| 1 | "쪽이었는데" → "주장이었는데" (인지 단계 약화) |
| 2 | "무엇을 알고" → "왜 그렇게 확신하고" (정보 → 동기) |
| 3 | "흐리면" → "밝히지 않으면" (추상 → 직접 행동) |
| 4 | "{X} 돌봄/지원" → "{X}을 돌본/도운 것이라고" (명사형 → 동사형) |

## 잘못 패턴 #1~#8 회피

(GPT-1 동일)

## 출력 포맷

### 산출물: `s08_friend01_dossier_tonepatch_v2.json`

```json
{
  "session": "S8",
  "caseId": "friend-01",
  "version": "v2",
  "channel": "dossier",
  "generatedAt": "2026-04-26T...",
  "notes": "기존 14건 dossier patch 폐기 후 S4 expanded 본문 base로 재작업. id 형식 정정 (dc-{n}-{party}-q{m}-{lieBand}-v{n}).",
  "tonePatch": [
    {
      "id": "dc-1-a-q1-early-v1",
      "channel": "dossier",
      "before": "{현재 friend-01.json의 정확한 dossier text}",
      "after": "{보정된 text}",
      "reason": "..."
    },
    ...
  ]
}
```

## 검증 체크리스트 (제출 전 필수)

- [ ] **모든 before 본문이 현재 `src/data/scriptedText/friend-01.json` dossier entries의 실제 text와 정확히 일치**
- [ ] patch id 형식 `dc-{n}-{party}-q{m}-{lieBand}-v{n}` (party 가운데)
- [ ] 사건 설정 정확 (A 아버지 돈 갈취 / 예비신랑 / 같은 패턴 반복)
- [ ] A premature_summary / B affect_flattening 차별화
- [ ] Truth Throttle 단계 정확
- [ ] 사용자 모범 4 patch 일관 적용

## 메모리 참조
- `memory/story_v2_confirmed_3cases.md` friend 섹션
- `memory/feedback_revision_meaning_over_form.md`
