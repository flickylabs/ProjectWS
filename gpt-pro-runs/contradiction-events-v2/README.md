# GPT Pro 의뢰 — Contradiction/Conflict Events V2

> **목적**: 모순 시스템을 V2로 재설계 (`ContradictionEventV2` + `ConflictEventV2`). 사건당 단일 캐릭터 진술 변화(모순) 24개 + 양측 주장 충돌(의견 충돌) 6~8개.
>
> **작성**: 2026-04-25 3차 사이클 (분석 에이전트 결과)
> **상태**: 의뢰 패키지 초안 — 사용자가 GPT Pro로 의뢰 후 산출물 검토 + Claude 보정 후 적용

## 의뢰 대상

활성 사건 3건 한정 (메모리 `project_active_cases.md` 정책):
- spouse-01 (이준호×박지연)
- family-01 (윤정후×윤태성)
- friend-01 (송다은×최수민)

## 핵심 변경 (V1 → V2)

### V1 결함 (현재)
- `ContradictionEvent.statementA/B`가 화자 메타 없이 사전 작성
- 양측 주장(A의 의심 + B의 자백)을 같이 모달에 표시 → **lieState ≤ S2에서 자백 본문 누설 (스포일러)**
- 트리거 조건이 양측 주장 충돌 = "의견 충돌"인데 "모순"으로 처리

### V2 설계
- **모순** = 같은 캐릭터 진술 변화만 (`previousStatement` + `currentStatement`, 동일 화자)
- **의견 충돌** = 양측 주장 상충 (`ConflictEventV2` 별도 카테고리, 극단적 상황만)
- `spoilerLevel` 메타 (`safe` / `partial` / `full`) — lieState 매핑

## 패키지 파일

- `01-types.md` — TypeScript 타입 정의 (ContradictionEventV2, ConflictEventV2, GameEventTextsV2)
- `02-spec-spouse-01.yaml` — spouse-01 의뢰 패키지 (정식 예시)
- `03-spec-family-01.yaml` — family-01 의뢰 패키지
- `04-spec-friend-01.yaml` — friend-01 의뢰 패키지
- `05-lint-rules.md` — 데이터 검증 규칙 R1~R7

## 마이그레이션 단계 (M1~M7)

| 단계 | 작업 | 파일 |
|---|---|---|
| M1 | V2 타입 추가 | `src/types/renewal.ts` |
| M2 | 로더 어댑터 | `src/engine/v3GameLoopLoader.ts` (`getContradictionV2`, `legacyToConflictV2`) |
| M3 | 트리거 엔진 분기 | `src/engine/gameEventTriggerEngine.ts` (V2 풀 우선, V1 폴백) |
| M4 | `checkConflict()` 신설 | 동일 (`opinion_conflict` 트리거) |
| M5 | UI 통합 | `GameEventModal.tsx` ContradictionModal V2 + ConflictModal 신설 |
| M6 | 데이터 채우기 | `src/data/claimPolicies/{caseId}-game-events.json` V2 키 주입 |
| M7 | V1 삭제 | 활성 3건 V2 검증 통과 후 V1 인터페이스 제거 |

## 의뢰 절차

1. 사용자가 GPT Pro에 패키지 1건씩 의뢰 (spouse-01 → family-01 → friend-01)
2. 산출물 검토 (Claude로 한국어 보정 + 게임 디자인 검증)
3. M6 단계로 데이터 적용
4. M3·M4·M5 코드 변경

## 작업 시간 추정

- GPT Pro 의뢰 + 검수: 사건당 1시간 × 3 = 3시간
- 코드 마이그레이션 (M1~M5, M7): 4시간
- 데이터 적용 (M6): 1시간
- 통합 검증: 1.5시간
- **총 ~10시간**

## 단기 임시 조치 (현재 적용)

V2 도입 전까지 Path A (`gameEventTriggerEngine.checkContradiction`)는 **비활성화**됨 (return null 추가). Path B (`useActionDispatch.notifyLieTransition`의 contradictionMeta) 단일 모순 path로 운영.

→ 이 임시 조치로 사용자 결함(스포일러 누설, false positive) 즉시 차단. V2 적용 시 Path A를 `checkConflict()`로 재활용 가능.
