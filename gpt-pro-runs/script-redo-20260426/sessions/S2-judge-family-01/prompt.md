# S2 — 재판관 4 채널 전면 재정비 (family-01)

## 작업 목표
**family-01의 재판관 4 채널 모든 variants 자연체로 재정비**.

(S1 spouse-01 prompt 참조 — 동일 구조. 사건 정보만 family-01로 변경)

## 입력 source
- `01-case-family-01.json` — 사건 정의
- `02-scriptedText-family-01-judge.json` — **현재 재판관 4 채널 (510 variants)**
- `04-story-v2-3cases.md` — family 사건 핵심 스토리
- `05-user-pattern-correction.md` / `06-korean-quality-rules.md` / `07-mistake-patterns.md`

## ⚠️ family-01 사건 핵심 (절대 충돌 금지)

### 인물
- **A 윤태성** (48, 주방가구 공장 대표) — **confrontational** (강하고 단정적)
- **B 윤정후** (44, 자동차부품 가게) — **affect_flattening** (침착, 평면적)

### 유서 비율 (★★★ 가장 중요)
- **원본 유서 (어머니 진짜 뜻)**: B 90% / A 10%
- **조작된 유서 (B가 직접 변경)**: **A 40% / B 60%**
- **B가 자기 몫을 90% → 60%로 줄임**. A에게 30% 양보.

### B가 자기 몫 줄인 이유
- A의 **출생 비밀** (A도 배다른 자식, 어머니 일기장 기록).
- A가 회사 대표라 출생 비밀 노출 시 경영권 위기.
- B 판단: "60:40이면 형이 분해도 법정까지는 안 간다."

### B의 20년 누적 사정
- 어머니 통장에 매달 80~150만 원 보탬 (총 20년)
- A 공장 부도 위기 시 1억 넘는 돈 대신 막아줌

### ⚠️ 절대 금지 패턴
- ❌ "유서에는 제가 60, 제 동생이 40으로 적혀 있었습니다" (A 60? **잘못**)
- ❌ "그래서 90을 40으로 낮췄습니다" (B 90→40? **잘못**)
- ❌ "원래 90대10을 형 60, 제 40으로 바꿨습니다" (B 40? **잘못**)
- ❌ "형에게 60, 제게 40이면" (A 60 / B 40? **잘못**)

### ✅ 정확한 패턴
- ✅ "유서에는 제 몫이 제 동생보다 작게 적혀 있었습니다" (A 발언 — A 40 / B 60)
- ✅ "그래서 90을 60으로 낮췄습니다" (B 발언 — B 자기 몫을 90 → 60)
- ✅ "제 몫을 90에서 60으로 줄이고, 형에게 40을 남겼습니다" (B 발언)

### 5 disputes
- d-1: 유서 신뢰성 (어머니 판단 능력)
- d-2: 누가 유서를 조작했나
- d-3: B 방문 빈도 (동생 영향)
- d-4: B 자기 몫 줄인 동기 (출생 비밀)
- d-5: 책임 분배

### 7 evidences (subjectParty)
- e-1 60:40 유서 사본 (both)
- e-2 요양원 방문기록 (b)
- e-3 전 요양보호사 음성증언 (b)
- e-4 공증사무실 스캔 보관본 (b)
- e-5 어머니 서랍 원본 유서 (b)
- e-6 20년 송금 내역 (b)
- e-7 어머니 일기장 (both)

### 3 witnesses (실명 — 02-scriptedText에서 확인)
- w-1, w-2, w-3 → 각 실명 사용 (case data에서 확인)

⚠️ **재판관이 증인을 부를 때 "증인 씨" 절대 X**.

## 채널별 작업 가이드

(S1 spouse-01 prompt 채널별 가이드 동일 — judge_question / judge_contradiction / judge_evidence_combo / judge_witness_summon)

### family-01 dossierCard 11종 (S6 dossier 카드 매트릭스)
- judge_evidence_combo cells는 dossierCard 기반
- 각 dossierCard의 사건 의미 정확 반영
- (case data `combinationLab.nodes` 또는 dossier-cards.json 확인)

### 채널 카운트
- judge_question: 48 cells × 5v = 240
- judge_contradiction: 12 cells × 5v = 60
- judge_evidence_combo: 33 cells × 5v = 165
- judge_witness_summon: 9 cells × 5v = 45
- **합계: 510 variants**

## 9차원 + 사용자 모범 4

(S1 동일)

특히:
- **A 윤태성 confrontational**: "우연으로 보기엔 너무 맞아떨어진다", 강한 단정
- **B 윤정후 affect_flattening**: "그렇게 보이실 수 있습니다", 침착, 감정 평면

## 출력 포맷

`output/judge-rewrite-family-01.json` — S1 동일 구조

## 검증 체크리스트 (제출 전)

- [ ] **유서 비율 A 40 / B 60 일관** (반대 패턴 0건)
- [ ] B가 자기 몫 90→60 줄임 표현 정확
- [ ] 변수 치환 패턴 0건
- [ ] judge_evidence_combo가 두 증거 함의 본문에 녹음 (dc 카드 11종 사건 의미 정확)
- [ ] 사용자 모범 4 patch 적용
- [ ] 증인 실명 사용, "증인 씨" 0건
- [ ] 호칭 "윤태성 씨" / "윤정후 씨" (제 형/동생 X via 재판관)
- [ ] 합니다체
- [ ] confrontational vs affect_flattening 차별화
- [ ] Truth Throttle (S0~S2에서 "60", "40", "90", "출생 비밀" 노출 X)
