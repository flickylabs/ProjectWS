# Stage 3 크로스 체크 보고서

> 작성: 스레드 E (통합 품질 테스트)
> 일시: 2026-04-04

---

## 1. 테스트 3-1: 진실 공개 타임라인 일관성

7건 각각에 대해 "플레이어가 언제 무엇을 알 수 있는지" 확인.

### spouse-01 진실 공개 타임라인

| 채널 | 노출 정보 | 조기 노출 여부 |
|------|-----------|---------------|
| 1. Phase 1/2 | 큰돈 이동, 새벽 문자, 낯선 여자 → 의혹 제기만 | ✅ 안전 |
| 2. 증거 surfaceName | "은행 이체 내역서", "예약 확인 문서" | ✅ 안전 (Stage 1에서 교정 완료) |
| 3. NPC S0-S1 | "해당 금액", "그 사람" | ✅ 안전 (fallbackPublicClaim 교정 완료) |
| 4. NPC S2 | "가족 일", "개인 사정" hint 수준 | ✅ 안전 (S2→hint 교정 완료) |
| 5. 증거 조사 stage 0-1 | 이체 사실 확인, 메타데이터 | ✅ 안전 |
| 6. 증인 vague | "뭔가 혼자 챙기는 눈치" | ✅ 안전 |
| 7. DossierCard q1 | hint 수준 scriptedResponse | ✅ 안전 |
| 8. NPC S3 | "집안 어른 돌봄 공백" partial 수준 | ✅ 적절 |
| 9. 증인 partial | "돌봄 관련 기관 견적" | ✅ 적절 (정식명칭 회피) |
| 10. DossierCard q2-q3 | partial→full 공개 | ✅ 적절 |
| 11. NPC S5 confession | 전면 공개 | ✅ 적절 |

**spouse-01: 채널 간 조기 노출 없음. PASS.**

### 나머지 6건 요약

| 사건 | 조기 노출 | 판정 |
|------|-----------|------|
| family-01 | Phase1에서 "카드대금" 제거됨 → 안전 | **PASS** |
| friend-01 | Phase2에서 "차액" 제거됨 → 안전 | **PASS** |
| neighbor-01 | anchorTruth("우수관 역류") Phase1/2 미노출 | **PASS** |
| partnership-01 | 금액 3종 S0-S2 완전 차단 | **PASS** |
| tenant-01 | "5일" S0-S1 미노출, S3부터 공개 | **PASS** |
| workplace-01 | "관리자 토큰" Phase1/2 미노출 | **PASS** |

---

## 2. 테스트 3-2: NPC 응답 일관성 (V3 vs LLM) — spouse-01

### 금액 숨김 일관성
- V3 BeatScript none/hint: 구체 금액 0건 → PASS
- LLM 경로 S0-S2: "상당한 금액" 일관 → PASS
- **일관성: PASS**

### Tell 표현 일관성
- V3 beat의 over_precision tell: 시각("14시 03분") 사용
- LLM 프롬프트의 tell 지시: 동일 패턴
- **일관성: PASS**

### 호칭 일관성
- V3 beat: "제 아내" (재판관 대상), "자기야" (상대 직접)
- LLM 경로: 동일 호칭 사용
- **일관성: PASS**

---

## 3. 특별 체크 결과

### 체크 A: S2 대사 다양성
- spouse-01 S2 hedge beat 수: 쟁점별 2개씩, alternatives 포함 총 ~12개
- 20턴 중 S2 체류 3-4턴 동안 반복 없음
- **판정: 충분**

### 체크 B: 금액 숨김 자연스러움
- "상당한 금액" 2-3회 반복되나 맥락 상이 (d-1 송금 vs d-5 약속 위반)
- over_precision tell의 시각 정밀("14시 03분")은 유지 → tell 인식 가능
- **판정: 자연스러움 확인**

### 체크 C: DossierCard q3 극적 효과
- q3 scriptedResponse: 전면 인정 + 구체적 사실 공개
- 감정적 무게: "더 이상 숨기지 않겠습니다" 등 적절한 감정선
- 시스템 이벤트 추가 가능 구간: q3 응답 직후 (v3GameLoopLoader에서 처리)
- **판정: 품질 확인, 이벤트 구현은 향후 작업**

---

## 4. Stage 3 결론

**7건 모두 크로스 체크 PASS.**

채널 간 진실 노출 타이밍 일관성 확인, V3/LLM 경로 간 호칭/금액/tell 일관성 확인 완료.
