# QW V5 R8: friend-01 전 구간 심층 검증

**대상**: friend-01 (송다은 vs 최수민) — 전 Phase
**파일**: scriptedText/friend-01.json (1,186 variants, 6채널)

---

## ScriptedText 6채널 + LLM fallback 구조

| 채널 | entries | variants | 비고 |
|------|---------|----------|------|
| interrogation | 180 | 900 | 2×5×6×3 완벽 매트릭스 |
| evidence_present | 42 | 210 | 7ev × 2party × 3timing |
| dossier | 9 | 27 | 3 DossierCard × 3 stage |
| witness | 9 | 27 | 3 witness × 3 depth |
| aftermath | 5 | 10 | 5 결과 시나리오 |
| system_message | 6 | 12 | 반복경고/증거/도시에 |

**구조 판정: PASS**

---

## 축1 의미: LieState S0→S5 전이 (b|d-4 샘플)

| State | 대사 | Truth Throttle |
|-------|------|---------------|
| S0 | "예전 일은 끝난 일입니다" | 완전 부정 ✅ |
| S1 | "그때도 돈 문제는 있었습니다" | 일부 인정 ✅ |
| S2 | "다은이 아버지가 제 돈을 가져간 게 맞습니다" | 구체적 인정 ✅ |
| S3 | "빌린다더니 안 갚았고, 투자라더니 거짓이었습니다" | 사기 구체화 ✅ |
| S4 | "말하면 '아빠가 사기꾼이다'가 됩니다. 차마 못 말했습니다" | 감정적 이유 공개 ✅ |
| S5 | "차라리 제가 변한 사람처럼 보이는 게 낫다고 생각했습니다" | 자기희생 자백 ✅ |

**판정: PASS** — 점진적 정보 공개 우수

---

## 축2 내용: 사건 정합성

### Disputes (5개)

| ID | judgment | anchorTruth 일치 |
|----|----------|----------------|
| d-1 | B 연락 = 경고, 방식 적절성 별도 | ✅ |
| d-2 | 예비신랑 먼저 선 넘음 | ✅ |
| d-3 | A 아버지 돈 접근 패턴 반복 | ✅ |
| d-4 | 과거 손절 = A 아버지 사기, B 침묵 = 보호 | ✅ |
| d-5 | 먼저 단정한 쪽 > 침묵한 쪽 | ✅ |

### Solutions (3개)
- 연락의도확인 / 과거청산 / 명예회복 — 사건 맥락 적합 ✅

**판정: PASS**

---

## Aftermath (5 entries)

- a_primary_fault: 낙인 먼저 찍은 송다은 주 책임 ✅
- b_primary_fault: 우회 연락 방식의 오해 ✅
- shared_fault: 양쪽 잘못된 방식 ✅
- protective_resolution: 보호 동기 인정 + 직면 권고 ✅
- procedural_caution: 명예훼손 위험 + 우회 연락 지적 ✅

**판정: PASS** — 품질 우수

---

## R8 종합

| 항목 | 판정 |
|------|------|
| ScriptedText 구조 | ✅ PASS |
| LieState 전이 품질 | ✅ PASS |
| 사건 정합성 | ✅ PASS |
| Aftermath 품질 | ✅ PASS |
| 호칭/존칭 | ✅ PASS (R2에서 확인 완료) |

**R8 판정: PASS**
