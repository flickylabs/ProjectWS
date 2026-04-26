# S3 — 재판관 4 채널 전면 재정비 (friend-01)

## 작업 목표
**friend-01의 재판관 4 채널 모든 variants 자연체로 재정비**.

(S1 spouse-01 prompt 참조 — 동일 구조. 사건 정보만 friend-01로 변경)

## 입력 source
- `01-case-friend-01.json` — 사건 정의
- `02-scriptedText-friend-01-judge.json` — **현재 재판관 4 채널 (480 variants)**
- `04-story-v2-3cases.md` — friend 사건 핵심 스토리
- `05-user-pattern-correction.md` / `06-korean-quality-rules.md` / `07-mistake-patterns.md`

## friend-01 사건 핵심 (절대 충돌 금지)

### 인물
- **A 송다은** (31, 온라인 쇼핑몰 CS) — **premature_summary** (빠른 결론, 확인 전 단정)
- **B 최수민** (31, 필라테스 강사) — **affect_flattening** (침착, 평면, 감정 안 드러냄)

### 핵심 사실
1. A는 결혼 3주 앞두고 예비신랑 휴대전화에 B 연락 발견 → "또 손댄다" 단톡방 폭로
2. **예비신랑이 먼저 B에게 찝적댐** (술자리 후 연락, 둘이 보자 등). B는 "A 남자친구잖아, 하지 마"로 선 그음.
3. **B가 예비신랑에게 연락한 진짜 이유**: A 아버지가 예비신랑에게 돈 갈취 접근 정황 포착 (물증 X).
4. **과거 손절 원인도 A 아버지**: A 아버지가 B에게 사기. B는 차마 못 말하고 A는 "B가 돈 때문에 변했다"고 오해.
5. A 아버지가 과거 B에게 한 짓을 이번엔 예비신랑에게 하려는 것. B는 같은 패턴 알아본 것.

### 5 disputes
- d-1: B의 연락 빈도 (집착 vs 경고)
- d-2: B 의도 (유혹 vs 보호)
- d-3: A 아버지 과거 사기 (B에게)
- d-4: 예비신랑 선 넘은 메시지
- d-5: 같은 패턴 반복 (책임 분배)

### 7 evidences (subjectParty)
- e-1 연락 기록 (b)
- e-2 단톡방 캡처 (a)
- e-3 과거 카톡 (both)
- e-4 예비신랑 메시지 (b)
- e-5 송다은 씨 아버지 문자 (both)
- e-6 과거 송금 기록 (b)
- e-7 대조표 (both)

### 3 witnesses (실명 — case data에서 확인)

⚠️ **재판관이 증인을 부를 때 "증인 씨" 절대 X**.

## 채널 카운트
- judge_question: 48 cells × 5v = 240
- judge_contradiction: 12 cells × 5v = 60
- judge_evidence_combo: 27 cells × 5v = 135
- judge_witness_summon: 9 cells × 5v = 45
- **합계: 480 variants**

## 9차원 + 사용자 모범 4

(S1 동일)

특히:
- **A 송다은 premature_summary**: "기록을 보자마자 집착이라고 받아들였습니다", 빠른 단정
- **B 최수민 affect_flattening**: "다은이에게 말하지 못했습니다", "악역이 되는 게 익숙해서가 아니라", 침묵

## 출력 포맷

`output/judge-rewrite-friend-01.json` — S1 동일 구조

## 검증 체크리스트 (제출 전)

- [ ] 변수 치환 패턴 0건
- [ ] judge_evidence_combo가 두 증거 함의 본문에 녹음 (dc 카드 9종 사건 의미 정확)
- [ ] 사용자 모범 4 patch 적용
- [ ] 증인 실명 사용, "증인 씨" 0건
- [ ] 호칭 "송다은 씨" / "최수민 씨"
- [ ] 합니다체
- [ ] premature_summary vs affect_flattening 차별화
- [ ] **사건 설정 정확**:
  - 예비신랑이 먼저 찝적댐 (B 가해자 X)
  - A 아버지가 과거 사기 + 현재 예비신랑에게 돈 갈취
  - B 출생 비밀 X (이는 family-01 사건. friend-01과 혼입 절대 X)
- [ ] Truth Throttle (S0~S2에서 "9일", "11번", "아버지 돈", "사기" 노출 X)
