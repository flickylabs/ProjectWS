# Thread-QW QA 2차 최종 보고서 — 2026-04-22

> 발신: Thread QW (Quality Writing)
> 수신: CT (Control Tower)
> 베이스 커밋: `2dbfdd1`
> 브랜치: `main`
> 검증 대상: **spouse-01 / family-01 / friend-01** (활성 3건)

---

## 종합 판정: **PASS** (수정 적용 후)

1차 QA 이후 제기된 두 이슈(화자 톤 오염 / 맥락·단계별 자연스러움)를 전수 검증한 결과, **치명적 이슈 1건**을 발견·수정했고 나머지는 전부 PASS.

---

## 라운드별 요약

| R | 항목 | 판정 | severity |
|---|---|---|---|
| R1 | 시스템 서술체 침투 NPC 대사 | PASS | none |
| R2 | judgeHint 톤 (15건 전수) | PASS | none |
| R3 | combinationComments 톤 (18건 전수) | PASS | none |
| R4 | 시스템 메시지 서술체 | PASS | none (WARN 위생 1건) |
| R5 | 심문 유형별 응답 톤 정합 | PASS | none |
| R6 | Truth Throttle 점진적 공개 | FAIL→수정완료 | **critical** |
| R7 | investigationStages 공개 곡선 | PASS | none |
| R8 | 쟁점 emerge 직후 NPC 반응 | PASS | none |
| R9 | 증인 vague/partial/full 계단 | PASS | none |
| R10 | R1~R9 발견 건 일괄 수정 | 완료 | — |
| R11 | 금지 패턴 최종 스캔 | PASS (0건) | none |

---

## Phase A — 화자 톤 오염 (R1~R4)

### 총평: **전면 PASS**

1차 QA 이후 화자 분기/NPC 대사/재판관 톤이 모두 규칙을 준수하는 상태로 유지됨.

- 활성 3건의 text 필드에서 서술체 침투·관찰문·4번째 벽 **0건**
- judgeHint 15개 전수 합니다체 + 당사자 1인칭 섞임 0건
- combinationComments 18개 전수 재판관 합니다체, 간접 화법 유지
- 시스템 메시지(코드/scriptedText) 모두 역할 분기 일관

### WARN 1건 (영향 없음)
- scriptedText의 `system_message_v2` 섹션 `behaviorHint` 필드에 "UI가 플레이어에게 답답한 줄다리기 구간임을 짧게 알려 준다."류 메타 지시문 **39건** 존재
- 타입 정의/로더 모두 해당 섹션을 사용하지 않음 → **dead data, UI 미노출**
- 데이터 위생 차원의 정리 권고 (다음 케이스 생성 가이드 반영 가능)

---

## Phase B — 맥락·단계별 자연스러움 (R5~R9)

### 총평: **PASS + 1건 critical 수정**

#### R6 FAIL → 수정 완료
**파일**: `src/data/claimPolicies/spouse-01-structure-v2.json`
**문제**: 1차 QA의 17건 금액 체계 수정에서 이 파일이 **전체적으로 누락됨**. `registerStructureV2()`로 런타임에 로드되며 `TruthReveal`, `FactChecklist`, `DiscoveryBoard` UI에 반영되므로 노출 시 A/B 금액이 뒤바뀌어 몰입 붕괴.

**올바른 체계** (cases/generated/spouse-01.json meta.anchorTruth와 일치):
- A(박지연): 공동 적금 **3,000만원** 해지
- B(이준호): 개인 비자금 **2,000만원** 현금 전달

**수정 10곳**: d-2 블록 `3,000만원`→`2,000만원` (라인 75, 81, 83, 96, 117, 141, 201), h-d3 블록 `2,000만원`→`3,000만원` (라인 170, 172, 186). 상세는 `qw-20260422-r2-r10.md` 참조.

**검증**:
- 수정 후 grep 재확인 — 방향 일관
- `npx tsc -b --force` 통과

---

## R11 금지 패턴 최종 스캔

| 패턴군 | 히트 | 판정 |
|---|---|---|
| 번역체 9패턴 | 0 | ✓ |
| 관찰문+인용 결합 | 1 | 허용 (단어 1개 인용은 정상 화법) |
| 4번째 벽 | 0 | ✓ |

---

## 수정 파일 목록

- `src/data/claimPolicies/spouse-01-structure-v2.json` (10건)

---

## Q 2차로 위임할 항목

**없음** — 이번 2차 QW 검증에서 엔진 로직·상태 관리 이상은 발견되지 않음. R6 수정은 순수 데이터 교정으로 완료.

---

## 후속 권고 (선택 사항)

1. **system_message_v2 dead data 정리**: scriptedText의 `behaviorHint` "UI가 플레이어에게~" 39건은 향후 로더가 붙을 경우 노출될 위험이 있으므로 제거 또는 자연 대사로 재작성 권고.
2. **구조 일관성 검증 자동화**: `cases/generated/*/meta.anchorTruth`와 `claimPolicies/*-structure-v2.json` 간 숫자·실명 일관성을 검증하는 테스트 스크립트 추가 권고 (이번 건처럼 산발 수정 시 누락 방지).

---

## 최종 판정: **PASS**

- Phase A 화자 톤 오염 0건
- Phase B 맥락·단계별 위반 1건 발견 즉시 수정 완료
- 빌드 통과
- 3사건 활성 파일 일관성 회복
