# Thread E 심층 테스트 v2 최종 보고서

> 작성일: 2026-04-05
> 테스트 모델: gpt-4o
> 대상: 7건 Stage-1 (-01) × 3회 반복 = 21회 플레이스루

---

## 종합 결과

| 사건 | 1회차 | 2회차 | 3회차 | 최종 |
|------|-------|-------|-------|------|
| spouse-01 | PASS (19턴, W:0) | PASS (19턴, W:0) | PASS (19턴, W:0) | **PASS** |
| family-01 | PASS (17턴, W:0) | PASS (17턴, W:0) | PASS (17턴, W:0) | **PASS** |
| friend-01 | PASS (24턴, W:0) | PASS (24턴, W:0) | PASS (24턴, W:0) | **PASS** |
| neighbor-01 | PASS (20턴, W:0) | PASS (20턴, W:0) | PASS (20턴, W:0) | **PASS** |
| partnership-01 | PASS (20턴, W:0) | PASS (20턴, W:0) | PASS (20턴, W:0) | **PASS** |
| tenant-01 | PASS (20턴, W:0) | PASS (20턴, W:0) | PASS (20턴, W:0) | **PASS** |
| workplace-01 | PASS (20턴, W:0) | PASS (20턴, W:0) | PASS (20턴, W:0) | **PASS** |

**총 420턴: PASS 420 / FAIL 0 / CRITICAL 0 / WARN 1**

WARN 1건: workplace-01 1회차 #17 — 박서윤 S3 blame에서 "큰돈을 송금" 표현 (금전 무관 사건에서 금전 은유 사용, hallucination 경미)

---

## 사전 작업 (테스트 전 수정)

### 자동 검증 스크립트 (stage1-deep-audit.cjs) 결과
- 초기 실행: 97 FAIL, 28 WARN
- Triage 결과: 진짜 이슈 21건, 오탐 79건 (B1/B2/B3 anchorTruth 키워드 매칭 과탐 53건, D2 S3+ 허용범위 26건)

### 데이터 교정 21건

| 카테고리 | 건수 | 교정 내용 |
|----------|------|-----------|
| D2 (S2 "사전 상의") | 11필드 | spouse-01 v2-atoms d-1/d-5 S2 → "미리 의논/얘기" |
| E3 (수동 표현) | 10건 | 6건 stage0 질문 "알고 계셨습니까" → "설명해 보십시오" (spouse/family/friend/neighbor/tenant/workplace) + friend 추가 3건 + tenant 추가 1건 |
| D3 ("특정 X") | 1건 | neighbor-01 e-6 "504호 특정 문구" → "504호 관련 문구" |

### Phase 1/2 스크립트 교정 5건

| 파일 | 교정 내용 | 심각도 |
|------|-----------|--------|
| phase1/family-01.json | "그 돈 안 옮겼으면 그 돈 안 옮겼으면" 중복 제거 | CRITICAL |
| phase2/friend-01.json | "따지면 따지고 보면" 중복 제거 | FAIL |
| phase2/tenant-01.json | "집주인분, 퇴거 당일" → "상우씨, 퇴거 당일" (toPartner 호칭 교정) | FAIL |
| phase1/workplace-01.json | "이라뇨?... 이라고요?" → "이란 말입니까?" (해요체 → 합니다체) | FAIL |
| phase2/workplace-01.json | "다르다고요?" → "다르단 말입니까?" (해요체 → 합니다체) | FAIL |

---

## STEP 0 사전 확인 (4/4 PASS)

| # | 항목 | 결과 |
|---|------|------|
| 1 | koreanPostposition.ts + fixPostpositions() | PASS — 4파이프라인 통합 확인 (llmDialogueResolver ×2, llmFreeQuestion ×1, useActionDispatch ×1) |
| 2 | 재판관 시점 가드 ("제 아내/남편" 금지) | PASS — llmDialogueResolver L726-740 포괄적 가드 |
| 3 | freeQuestionV2 archetype 전달 (180패턴) | PASS — archetype → renderResponse() → tonePatterns 연동 |
| 4 | v2-atoms S0-S1 neutral화 | PASS — claimAtoms/fallbackPublicClaim 중립화 확인 |

---

## 검증 채널별 결과 (11개)

| # | 채널 | 1회차 | 2회차 | 3회차 | 판정 |
|---|------|-------|-------|-------|------|
| 1 | NPC 대사 (심문 응답) | PASS | PASS | PASS | **PASS** |
| 2 | 재판관 질문 | PASS | PASS | PASS | **PASS** |
| 3 | 증거 조사 질문/답변 | PASS | PASS | PASS | **PASS** |
| 4 | DossierCard | N/A (시나리오 미포함) | - | - | — |
| 5 | 증인 증언 | N/A (시나리오 미포함) | - | - | — |
| 6 | 시스템 메시지 | PASS | PASS | PASS | **PASS** |
| 7 | 끼어들기 | N/A | - | - | — |
| 8 | 자유 질문 | N/A (시나리오 미포함) | - | - | — |
| 9 | 후일담 | N/A (시나리오 미포함) | - | - | — |
| 10 | Phase 1/2 스크립트 | PASS (정적 검증 5건 교정 후) | - | - | **PASS** |
| 11 | 모순 추궁 | N/A (시나리오 미포함) | - | - | — |

**채널 4/5/7/8/9/11은 런타임 테스트 시나리오에 미포함 — 77건 확장 배치 후 통합 테스트에서 별도 검증 필요.**

---

## 검증 기준별 결과

### A. 화자 시점/호칭 — **PASS**
- 420턴 전 턴 honorific=ok 자동 검증 통과
- 재판관: "이름 씨" 일관 (한지석 씨, 오세린 씨, 윤서아 씨 등)
- 당사자→재판관: toJudge 값 정확 ("제 아내", "제 남편", "옆집 분", "제 동업자", "세입자분", "제 부하직원")
- 당사자간: toPartner 값 정확 ("자기", "누나", "서준씨", "팀장님" 등)
- **"제 아내이", "제 아내에게" 등 이전 테스트 문제 0건 재현**

### B. 한국어 품질 — **PASS**
- 번역체 9패턴: 0건
- "사전 상의/협의" (S0-S2): 0건 (교정 완료)
- 해요체 잔존: 0건 (Phase 1/2 교정 완료)
- 합니다체 일관성: 전 턴 준수
- 같은 표현 2턴 연속: 0건
- 조사 오류: 0건

### C. Truth Throttle — **PASS**
- S0-S1: 구체적 금액/인물명/기관명 0건
- S2: 성씨까지만, 대략적 금액만 ("적지 않은 돈", "상당한 금액")
- S3-S4: 점진적 구체화 ("1,800만원", "장모님 쪽")
- S5: 전체 구체적 진실 (금액+인물+기관+목적) 완전 공개
- 감정 변화 곡선: S0 방어적 → S2 불편 → S3 blame → S4 감정적 → S5 고백 — 자연스러움

### D. 캐릭터성/몰입감 — **PASS**
- archetype 차별화 확인:
  - avoidant (한지석, 서도윤, 이주연): 우회적, "순서가 있어서", 말 길어짐 ✅
  - confrontational (오세린, 정하린, 정한결, 윤해나): 짧고 날카롭게, 역공 ✅
  - calculated (이서준, 최상우): 논리적, 감정 배제 ✅
  - victim_cosplay (윤서아): "저만 이런 취급" ✅
- tell 발현: 자연스러운 삽입 (기계적 아님)

### E. 게임 로직 — **PASS**
- lieState 전이: 정상 (S1→S2→S3→S4→S5)
- 증거 제시 후 반응: 증거에 맞는 구체적 응답
- 쟁점 커버리지: 모든 사건에서 d-1, d-2 + 추가 쟁점 커버

### F. Hallucination — **PASS (WARN 1)**
- 사건 데이터에 없는 사실 생성: 0건
- 금전 무관 사건 금전 표현: WARN 1건 (workplace-01 #17 "큰돈 송금" — S3 blame 맥락 혼동)
- 존재하지 않는 인물 언급: 0건

---

## 패턴 분석

### 가장 안정적인 사건
- neighbor-01: 3회 모두 완벽 동일 구조, 0 WARN
- partnership-01: 3회 모두 완벽 동일 구조, 0 WARN
- tenant-01: 3회 모두 완벽 동일 구조, 0 WARN

### 77건 확장 시 주의사항
1. **workplace 카테고리**: S3 blame 상태에서 다른 사건 맥락이 혼입될 가능성. 프롬프트에 "이 사건은 금전 분쟁이 아닙니다" 가드 추가 권장
2. **friend 카테고리**: 24턴으로 가장 김. 5개 쟁점 모두 커버 시 tell 빈도 관리 필요
3. **DossierCard/증인/자유질문/후일담/모순추궁**: 이번 테스트에서 미커버. 77건 배치 후 별도 채널 검증 필요

---

## 최종 판정

```
PASS = CRITICAL 0건 AND FAIL 0건 AND WARN ≤ 5건
```

| 기준 | 결과 |
|------|------|
| CRITICAL | **0건** |
| FAIL | **0건** |
| WARN | **1건** (≤ 5) |
| 총 턴 | **420턴** |

## **최종 판정: PASS — 77건 확장 배치 착수 가능**

---

## 수정 파일 목록 (이번 세션에서 직접 수정)

```
[데이터 — case JSON]
src/data/cases/generated/spouse-01.json (e-3, e-6 stage0 질문)
src/data/cases/generated/family-01.json (e-6 stage0 질문)
src/data/cases/generated/friend-01.json (e-2 stage0 + 추가 3건 stage0 질문)
src/data/cases/generated/neighbor-01.json (e-3 stage0 질문 + e-6 "특정 X")
src/data/cases/generated/tenant-01.json (추가 1건 stage0 질문)
src/data/cases/generated/workplace-01.json (e-3 stage0 질문)

[데이터 — v2-atoms]
src/data/claimPolicies/spouse-01-v2-atoms.json (S2 "사전 상의" 11필드 교정)

[데이터 — Phase 1/2 스크립트]
src/data/dialogues/phase1/family-01.json (텍스트 중복 제거)
src/data/dialogues/phase2/friend-01.json (텍스트 중복 제거)
src/data/dialogues/phase2/tenant-01.json (호칭 교정)
src/data/dialogues/phase1/workplace-01.json (해요체 → 합니다체)
src/data/dialogues/phase2/workplace-01.json (해요체 → 합니다체)
```
