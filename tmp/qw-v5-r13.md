# QW V5 R13: 3사건 증거뷰어 + 판결/결과 검증

---

## 증거뷰어 데이터 완전성

| 사건 | evidence | viewerData | 완전성 |
|------|----------|-----------|--------|
| spouse-01 | 7/7 | 7/7 | ✅ PASS |
| friend-01 | 7/7 | 7/7 | ✅ PASS |
| family-01 | 7/7 | 7/7 | ✅ PASS |

### spouse-01 세부 확인 (R4에서 완료)
- 영수증 5장: 신한카드 일관 ✅
- GPS 로그: 호수 참조 0건 ✅
- 통화/계좌/카톡: 스토리 일치 ✅

---

## 판결 데이터 완전성

| 항목 | spouse-01 | friend-01 | family-01 |
|------|-----------|-----------|-----------|
| disputes | 4 (0 missing judgment) | 5 (0 missing) | 5 (0 missing) |
| truthTable | 5 | 5 | 5 |
| solutions | 3 | 3 | 3 |
| evidenceCombinations | 5 | 4 | **0 (undefined)** |
| combinationLab | ✅ | ✅ | ✅ |

### NOTE: family-01 evidenceCombinations 누락
- caseLoader가 `?? []`로 기본값 처리 → **런타임 에러 없음**
- combinationLab은 존재 (nodes/outputs/recipes)
- 증거 조합 기능이 작동하지만 기존 `evidenceCombinations` 필드는 미정의
- **엔진 코드 문제 아님** — 데이터 갭. CT 보고용 NOTE

---

## UI 컴포넌트 존재 확인

| 컴포넌트 | 파일 | 상태 |
|----------|------|------|
| FactChecklist | verdict/FactChecklist.tsx | ✅ SwipeButton 3지선다 |
| ResponsibilitySlider | verdict/ResponsibilitySlider.tsx | ✅ tiltAngle 저울 |
| Aftermath | result/Aftermath.tsx | ✅ scripted + LLM + template fallback |
| verdictEngine | engine/verdictEngine.ts | ✅ insight/authority/wisdom 3축 |

---

## verdictEngine 3축 채점

| 축 | 항목 | 검증 |
|----|------|------|
| 통찰(insight) | 사실 판단 + 쟁점 가중치 + 책임 정확도 | ✅ |
| 권위(authority) | 기본70 + 재판 통제 + 증거 적법성 | ✅ |
| 지혜(wisdom) | 기본50 + 해결안 + 극단 판결 보정 | ✅ |

---

## R13 종합

| 항목 | 판정 |
|------|------|
| 3사건 viewerData 완전성 | ✅ PASS |
| 판결 disputes/truth/solutions | ✅ PASS |
| UI 컴포넌트 | ✅ PASS |
| verdictEngine 3축 | ✅ PASS |
| family-01 evidenceCombinations | ⚠️ NOTE (런타임 안전, 데이터 갭) |

**R13 판정: PASS (NOTE 1건 — CT 보고)**
