# Stage 1 정적 검증 보고서

> 작성: 스레드 E (통합 품질 테스트)
> 일시: 2026-04-04
> 에이전트: 29개 병렬 실행

---

## 1. 검증 범위

| 그룹 | 테스트 | 대상 | 에이전트 수 |
|------|--------|------|------------|
| A | Phase 1/2 스크립트 스캔 | 7건 × 14파일 | 7 |
| B | v2-atoms Truth Throttle | 7건 | 7 |
| C | V3 BeatScript/Dossier/Witness | spouse-01 4세션 | 4 |
| D | 증거 데이터 정적 검증 | 7건 × 42증거 | 7 |
| E | 코드 엔진 로직 | 8파일 | 4 |
| **합계** | | | **29** |

---

## 2. 전체 결과 요약

| 심각도 | 발견 건수 | 교정 완료 | 잔여 |
|--------|----------|----------|------|
| **CRITICAL** | 3 | 1 (교정 중) | 2 |
| **HIGH** | 21 | 8 (교정 중) | 13 |
| MEDIUM | ~30 | 0 | ~30 |
| LOW | ~25 | 0 | ~25 |

---

## 3. CRITICAL 위반 (3건)

### C-1. spouse-01 Phase 2 — 금지어 "동생 월세" 직접 노출
- **파일**: `src/data/dialogues/phase2/spouse-01.json`
- **위치**: speaker b 대사
- **원문**: `"동생 월세가 급해서 부탁한 거지"`
- **규칙**: d-4 핵심 진실이 Phase 2에서 자발적 노출 → 탐문 흐름 붕괴
- **교정**: `"급한 사정이 있어서 부탁한 거지"` → **교정 완료**

### C-2. spouse-01 v2-atoms d-1/S0 — 정확 금액+날짜 노출
- **파일**: `src/data/claimPolicies/spouse-01-v2-atoms.json`
- **위치**: d-1/S0 `fallbackPublicClaim`
- **원문**: `"9월 20일 기준으로 2,800,000원이 움직인 사실만으로"`
- **규칙**: S0에서 정확 날짜+금액 금지
- **교정**: `"해당 금액이 움직인 사실만으로"` → **교정 대기**

### C-3. spouse-01 v2-atoms d-3/S0 — 실명 "최민정" 직접 노출
- **파일**: `src/data/claimPolicies/spouse-01-v2-atoms.json`
- **위치**: d-3/S0 `fallbackPublicClaim`
- **원문**: `"최민정 씨를 그저 '낯선 여자'로 부르며"`
- **규칙**: S0에서 실명 금지
- **교정**: `"그 사람을 그저 '낯선 여자'로 단정하며"` → **교정 대기**

---

## 4. HIGH 위반 (21건)

### Group A — Phase 1/2 스크립트 (3건 + 1건 교정됨)

| # | 사건 | 위치 | 내용 | 상태 |
|---|------|------|------|------|
| H-A1 | spouse-01 | Phase2 idx2 | "거잖아" 비격식 종결어미 | **교정 중** |
| H-A2 | family-01 | Phase1 idx2 | "카드대금" anchorTruth 동기 조기 노출 | **교정 중** |
| H-A3 | friend-01 | Phase2 idx3 | "차액이 크지 않은데" 핵심 반전 암시 | **교정 중** |
| H-A4 | neighbor-01 | Phase2 idx4 | "증거라고요?" 합니다체 위반 | **이미 교정됨** |

### Group B — v2-atoms (10건)

| # | 사건 | 위치 | 내용 | 상태 |
|---|------|------|------|------|
| H-B1~8 | spouse-01 | d-1/S1, d-3/S2, d-5a/S2, d-4/S0/S1/S2, d-2/S1, d-5b/S0 fallbackPublicClaim | 정확 금액(280만/150만) 및 실명 조기 노출 (8건) | **교정 대기** (구조적 패턴 — fallbackPublicClaim 전면 교정 필요) |
| H-B9 | family-01 | d1.card_insurance_paid_first S2 | S2 suppression 위반 — 개인 지출 동기 노출 | 교정 대기 |
| H-B10 | family-01 | d3.noninheritance_ack S4/S5 | "이수진" 미등록 인물 실명 | 교정 대기 |

### Group C — V3 BeatScript (1건)

| # | 세션 | 위치 | 내용 | 상태 |
|---|------|------|------|------|
| H-C1 | sessions 3-4 | e-6 stage0 | truthLevel "partial" → "hint" 필요 (stage0 상한 위반) | 교정 대기 |

### Group D — 증거 데이터 (3건)

| # | 사건 | 위치 | 내용 | 상태 |
|---|------|------|------|------|
| H-D1 | spouse-01 | e-2 name/description | "재가돌봄센터 간병 예약 확인서" + description에 anchorTruth 완전 폭로 | 교정 대기 |
| H-D2 | family-01 | e-6 surfaceDescription | "실제 부담 가능 금액이 산출" → d-4 진실 직접 암시 | 교정 대기 |
| H-D3 | workplace-01 | e-6 requiredLieState | S3 → e-3과 동일, 최종 증거 차별화 실패 (S4 필요) | 교정 대기 |

### Group E — 코드 엔진 (4건)

| # | 파일 | 내용 | 상태 |
|---|------|------|------|
| H-E1 | blueprintPromptBuilderV2.ts | getTruthThrottle S2→partial 매핑 (결정2 위반) | **교정 중** |
| H-E2 | evidenceSlice.ts | investigateEvidence 후 checkUnlocks 미호출 | **교정 중** |
| H-E3 | witnessEngine.ts | 기관 증인 예외(결정4) 미구현 | **교정 중** |
| H-E4 | meterStagingV2.ts | DossierUnlockReason 타입 유니온 stale | 교정 대기 |

---

## 5. MEDIUM 위반 주요 항목 (~30건)

### 공통 패턴

1. **v2-atoms fallbackPublicClaim 구조적 문제**: slots는 정확히 추상화되었으나 fallbackPublicClaim이 동일 수준을 따르지 않음 (spouse-01 집중)
2. **증거 질문 revealKey 역전**: e-2/e-3/e-4/e-6에서 질문이 해당 stage의 revealKey 결론을 사전 선언 (workplace-01 집중)
3. **해요체 패턴 누락**: `볼게요`, `드릴게요`, `어때요` 미변환 (llmDialogueResolver.ts)
4. **이름 누출**: judgeQuestionEngine extractDisputeSubject 주제격 조사(은/는) 미처리
5. **surfaceName/surfaceDescription 안전성**: 일부 증거에서 진실 방향 암시

---

## 6. 사건별 종합 판정

| 사건 | CRITICAL | HIGH | MEDIUM | LOW | 판정 |
|------|----------|------|--------|-----|------|
| spouse-01 | **3** | **10** | ~10 | ~5 | **FAIL** |
| family-01 | 0 | **3** | ~5 | ~3 | **FAIL** |
| friend-01 | 0 | **1** | ~4 | ~3 | **CONDITIONAL** |
| neighbor-01 | 0 | 0 (교정됨) | ~4 | ~6 | **CONDITIONAL PASS** |
| partnership-01 | 0 | 0 | ~2 | ~3 | **PASS** |
| tenant-01 | 0 | 0 | ~4 | ~3 | **CONDITIONAL PASS** |
| workplace-01 | 0 | **1** | ~8 | ~3 | **CONDITIONAL** |

---

## 7. 코드 엔진 종합 판정

| 파일 | HIGH | MEDIUM | 판정 |
|------|------|--------|------|
| blueprintPromptBuilderV2.ts | **1** (S2→partial) | 0 | **FAIL** |
| evidenceSlice.ts | **1** (checkUnlocks 미호출) | 1 | **FAIL** |
| witnessEngine.ts | **1** (결정4 미구현) | 1 | **FAIL** |
| meterStagingV2.ts | 0 | **1** (타입 stale) | **CONDITIONAL** |
| judgeQuestionEngine.ts | 0 | **1** (이름 누출) | **CONDITIONAL** |
| llmDialogueResolver.ts | 0 | **1** (패턴 누락) | **CONDITIONAL** |
| useActionDispatch.ts | 0 | **1** (disputeNames) | **CONDITIONAL** |
| v3GameLoopLoader.ts | 0 | **1** (relatedDisputes 가드) | **CONDITIONAL** |

---

## 8. 교정 우선순위

### 즉시 교정 (CRITICAL + HIGH 코드)
1. ~~spouse-01 Phase2 "동생 월세"~~ → 교정 중
2. spouse-01 v2-atoms fallbackPublicClaim 전면 교정 (C-2, C-3, H-B1~8)
3. ~~blueprintPromptBuilderV2 S2→hint~~ → 교정 중
4. ~~evidenceSlice checkUnlocks~~ → 교정 중
5. ~~witnessEngine 결정4~~ → 교정 중

### 1차 교정 (HIGH 데이터)
6. family-01 Phase1 "카드대금" → 교정 중
7. friend-01 Phase2 "차액" → 교정 중
8. spouse-01 증거 e-2 name/description
9. family-01 v2-atoms S2 suppression + 미등록 인물
10. V3 e-6 stage0 truthLevel
11. family-01 증거 e-6 surfaceDescription
12. workplace-01 증거 e-6 requiredLieState

### 2차 교정 (MEDIUM)
- 증거 질문 패턴 개선
- 해요체 패턴 추가
- judgeQuestion 이름 누출 수정
- 기타 MEDIUM 항목들

---

## 9. Stage 1 결론

**현재 상태: FAIL — CRITICAL 3건 + HIGH 21건 존재**

교정 작업 진행 중. 교정 완료 후 재검증 예정.
교정 범위가 넓어 spouse-01 v2-atoms fallbackPublicClaim은 별도 교정 에이전트가 필요합니다.
