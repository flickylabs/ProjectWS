# S9 — 잘못 패턴 #6 보정 (friend-01)

## 작업 목표
**friend-01 통합본에서 잘못 패턴 #6 차원 보정**.

(S7 spouse-01 prompt 참조 — 동일 절차. 사건 정보만 friend-01로 변경)

## 입력 source
- `01-case-friend-01.json`
- `03-scriptedText-friend-01-full.json` — **현재 통합본** (5,082v / 18ch)
- `04-story-v2-3cases.md`
- `05-user-pattern-correction.md` ★ / `06-korean-quality-rules.md` / `07-mistake-patterns.md`

## ⚠️ friend-01 사건 핵심 (절대 충돌 금지)

### 인물
- A 송다은 premature_summary
- B 최수민 affect_flattening

### 사건 사실
- 예비신랑이 먼저 B에게 찝적댐
- A 아버지가 과거 B에게 사기 + 현재 예비신랑에게 돈 갈취
- B는 차마 못 말함 → A는 "B가 돈 때문에 변했다" 오해
- 같은 패턴 반복

### ⚠️ 절대 금지
- **B 출생 비밀 X** (이는 family-01 사건. friend-01과 혼입 절대 X)
- **유서 / 60:40 X** (이는 family-01 사건)

## 검출 결과 (참고)
이전 메인 검출 결과:
- noun_action: 8건
- weak_쪽: 101건 (대부분 NPC voice 보존 대상)
- 합계: 109건

## 9차원 검토 가이드

(S7 동일)

특히:
- **A 송다은 premature_summary**: "기록을 보자마자 집착이라고 받아들였습니다", 빠른 단정
- **B 최수민 affect_flattening**: "다은이에게 말하지 못했습니다", "악역이 되는 게 익숙해서가 아니라", 침묵

## 사용자 모범 4 patch (필수 일관)

(S7 동일)

## 작업 절차 (S7 동일)

## 출력 포맷

`output/correction-pattern6-friend-01.json` — S7 동일 구조

## 검증 체크리스트 (제출 전)

- [ ] **모든 before 본문이 03-scriptedText-friend-01-full.json의 실제 text와 정확히 일치**
- [ ] noun_action 보정 모두 동사형 자연체
- [ ] weak_쪽 NPC voice 보존 항목 skipped 분류 + 이유 명시 (특히 affect_flattening 침묵 톤)
- [ ] 사용자 모범 4 patch 적용
- [ ] archetype 차별화 (송다은 빠른 단정 / 최수민 침묵)
- [ ] **사건 설정 정확**:
  - 예비신랑이 먼저 찝적댐 (B 가해자 X)
  - A 아버지가 과거 사기 + 현재 예비신랑 돈 갈취
  - **family-01 사건 정보 (출생 비밀 / 유서 / 60:40) 절대 혼입 X**
- [ ] Truth Throttle (S0~S2에서 "9일", "11번", "아버지 돈", "사기" 노출 X)
- [ ] 글자수 ±5 편차 내
