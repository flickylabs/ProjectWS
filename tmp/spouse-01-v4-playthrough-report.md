# spouse-01 V4 헤드리스 플레이스루 결과

- 대상: `spouse-01` / `case-spouse-01`
- 기준 아티팩트: `tmp/spouse-01-v4-playthrough.json`
- 실행 수: 10회
- 실행 일시: 2026-04-12

## 총괄

- 10회 전부 완료
- `[Scripted miss]` 총 0건
- `TypeError` / `undefined` 계열 총 0건
- Scripted hit 총 125건
- 실제 관측된 완전 판결 경로는 회차 9에서만 확인

## 회차별 결과

| 회차 | 전략 | 결과 | 비고 |
|---|---|---|---|
| 1 | `d-1 fact_pursuit` 반복 | FAIL | 11턴 후 `d-1=S0`, S5 도달 실패 |
| 2 | `d-1 empathy_approach` 반복 | FAIL | 11턴 후 `d-1=S0`, S5 도달 실패 |
| 3 | 번갈아 심문 | FAIL | `b:d-1=S0`, `a:h-d3=S1`, 양측 S3+ 실패 |
| 4 | `e-1 -> e-7` 제시 | PARTIAL | `e-1`~`e-4`만 실질 검증, `e-5`~`e-7` 해금 실패 |
| 5 | 6개 레시피 전부 실행 | FAIL | `combine-1`만 성공, 나머지 전부 `recipe_locked` |
| 6 | 숨은 쟁점 연쇄 | FAIL | `h-d3=visible`, `h-d4=hidden` 유지 |
| 7 | 증인 `w-1/w-2/w-3` | FAIL | 3명 모두 `vague` 깊이만 확인 |
| 8 | 최소 턴 판결 진입 | FAIL | 7턴 후에도 `phase3` 유지, 판결 UI 진입 실패 |
| 9 | 최대 턴 강제 판결 | PASS | `phase6 -> phase7 -> result`, `forced_incomplete`, 총점 76 |
| 10 | 끼어들기 유도 | FAIL | interjection / counter-question 발생 없음 |

## 상세 메모

### 회차 1
- 경로: `phase0 -> phase1 -> phase3`
- 턴: 11
- `d-1` 최종 상태: `S0`

### 회차 2
- 경로: `phase0 -> phase1 -> phase3`
- 턴: 11
- `d-1` 최종 상태: `S0`

### 회차 3
- 경로: `phase0 -> phase1 -> phase3`
- 턴: 12
- `b:d-1=S0`, `a:h-d3=S1`

### 회차 4
- 경로: `phase0 -> phase1 -> phase3 -> phase6`
- 턴: 20
- 해금 확인: `e-1`, `e-2`, `e-3`, `e-4`
- 제시 확인:
  - `e-1` 제시 반응 존재
  - `e-2` 제시 반응 존재
  - `e-3` 제시 시 `e-4` 해금
  - `e-4` 제시 반응 존재
  - `e-5`~`e-7` 미해금

### 회차 5
- 경로: `phase0 -> phase1 -> phase3 -> phase6`
- 턴: 16
- 레시피 결과:
  - `combine-1`: 성공, `L-1`
  - `combine-2`~`combine-6`: 전부 `recipe_locked`
- Dossier 질문: 실행 불가

### 회차 6
- 경로: `phase0 -> phase1 -> phase3 -> phase6`
- 턴: 16
- discovery:
  - `d-1=visible`
  - `d-2=visible`
  - `h-d3=visible`
  - `h-d4=hidden`

### 회차 7
- 경로: `phase0 -> phase1 -> phase3 -> phase6`
- 턴: 19
- 증인 결과:
  - `w-1`: expected `vague`, 2문장
  - `w-2`: expected `vague`, 1문장
  - `w-3`: expected `vague`, 1문장

### 회차 8
- 경로: `phase0 -> phase1 -> phase3`
- 턴: 7
- 판결 UI 진입 실패

### 회차 9
- 경로: `phase0 -> phase1 -> phase3 -> phase6 -> phase7 -> result`
- 턴: 16
- 강제 판결 성공
- 판결 단계 기록: `fact -> solution -> confirm`
- 점수:
  - `insight=56`
  - `authority=83`
  - `wisdom=90`
  - `total=76`

### 회차 10
- 경로: `phase0 -> phase1 -> phase3`
- 턴: 4
- interjection 이벤트 기록 없음

## 핵심 이슈

1. `d-1` LieState가 반복 심문으로 전이되지 않음
2. `e-5`~`e-7` 해금 체인이 막혀 있음
3. 조합 레시피 2~6 접근 불가
4. `h-d4`가 연쇄적으로 열리지 않음
5. 증인 깊이가 전부 `vague`에 머묾
6. 최소 턴 판결 진입 실패
7. 끼어들기 유도 실패

## 판정

- 기능 안정성: PASS
  - Scripted fallback 없음
  - 런타임 에러 없음
- 게임플레이 기대 충족: FAIL
  - 10개 전략 중 1개만 목표 달성
  - 핵심 progression 루프가 막혀 있음
