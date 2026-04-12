# spouse-01 V4 헤드리스 플레이스루 재검증 결과

- 대상: `spouse-01` / `case-spouse-01`
- 기준 아티팩트: `tmp/spouse-01-v4-playthrough.json`
- 재검증 사유:
  - `lieConfigA`에 `d-1`, `d-2` 추가
  - `lieConfigB`에 `h-d3` 추가
  - transition trigger를 `direct_question`, `motive_question`, `empathy_question`, `hard_evidence`로 정리

## 총괄

- 10회 전부 완료
- Scripted hit 총 `166`
- `[Scripted miss]` 총 `5`
- `TypeError` / `undefined` 총 `0`
- 강제 판결 경로는 여전히 정상
- LieState 전이는 일부 개선됨

## 핵심 변화

- 회차 1:
  - 이전 `d-1=S0`
  - 현재 `d-1=S1`
- 회차 3:
  - 이전 `A/B S3+` 전혀 실패
  - 현재 `A:d-1=S3`, `B:d-1=S2`
- 회차 6:
  - 이전 숨은 쟁점 연쇄 완전 정지
  - 현재 `A:d-1=S1`, `A:d-2=S1`, `A:h-d3=S1`까지 일부 전이
  - 단, `h-d4`는 여전히 `hidden`

## 회차별 결과

| 회차 | 전략 | 결과 | 메모 |
|---|---|---|---|
| 1 | A만 `d-1 fact_pursuit` 반복 | PARTIAL | `S1`까지 전이, `S5` 실패 |
| 2 | B만 `d-1 empathy_approach` 반복 | FAIL | `S0` 유지 |
| 3 | A/B 번갈아 심문 | PARTIAL | `A:S3`, `B:S2` |
| 4 | `e-1 -> e-7` 제시 | FAIL | `e-4`까지만 확인, Scripted miss `3` |
| 5 | 조합 6개 실행 | PARTIAL | `combine-1`, `combine-2`, `combine-6` 성공, 나머지 잠김, Scripted miss `1` |
| 6 | 숨은 쟁점 연쇄 | FAIL | `h-d3`까지만 일부 진입, `h-d4` hidden 유지 |
| 7 | 증인 전부 소환 | FAIL | 세 증인 모두 `vague`, Scripted miss `1` |
| 8 | 최소 턴 판결 진입 | FAIL | `phase3`에서 멈춤 |
| 9 | 최대 턴 강제 판결 | PASS | `phase6 -> phase7 -> result`, 총점 `76` |
| 10 | 끼어들기 유도 | PARTIAL | interjection은 없고 contradiction 이벤트만 발생 |

## 회차별 상세

### 회차 1
- 경로: `phase0 -> phase1 -> phase3`
- 턴: `11`
- 목표: A `d-1` S5
- 결과: `S1`

### 회차 2
- 경로: `phase0 -> phase1 -> phase3`
- 턴: `11`
- 목표: B `d-1` S5
- 결과: `S0`

### 회차 3
- 경로: `phase0 -> phase1 -> phase3`
- 턴: `12`
- 결과:
  - A `d-1=S3`
  - B `d-1=S2`

### 회차 4
- 경로: `phase0 -> phase1 -> phase3 -> phase6`
- 턴: `20`
- 확인된 제시:
  - `e-1`
  - `e-2`
  - `e-3`
  - `e-4`
- 미도달:
  - `e-5`
  - `e-6`
  - `e-7`

### 회차 5
- 경로: `phase0 -> phase1 -> phase3 -> phase6`
- 턴: `16`
- 조합 결과:
  - `combine-1` 성공
  - `combine-2` 성공
  - `combine-6` 성공
  - `combine-3`, `combine-4`, `combine-5` 잠김
- Dossier 질문은 여전히 열리지 않음

### 회차 6
- 경로: `phase0 -> phase1 -> phase3 -> phase6`
- 턴: `16`
- discovery:
  - `d-1=visible`
  - `d-2=visible`
  - `h-d3=visible`
  - `h-d4=hidden`
- LieState:
  - A: `d-1=S1`, `d-2=S1`, `h-d3=S1`, `h-d4=S0`
  - B: 전부 `S0`

### 회차 7
- 경로: `phase0 -> phase1 -> phase3 -> phase6`
- 턴: `19`
- 증인 결과:
  - `w-1`: `vague`
  - `w-2`: `vague`
  - `w-3`: `vague`

### 회차 8
- 경로: `phase0 -> phase1 -> phase3`
- 턴: `7`
- 최소 턴 판결 진입 실패

### 회차 9
- 경로: `phase0 -> phase1 -> phase3 -> phase6 -> phase7 -> result`
- 턴: `16`
- `forced_incomplete`
- 판결 단계 기록:
  - `fact`
  - `solution`
  - `confirm`
- 총점: `76`

### 회차 10
- 경로: `phase0 -> phase1 -> phase3`
- 턴: `4`
- interjection 미발생
- contradiction 계열 이벤트만 기록됨

## 판정

- 개선 확인:
  - LieState 전이가 완전 정지 상태에서는 벗어남
  - 일부 조합 레시피가 열림
- 미해결:
  - empathy 루트는 여전히 전이 실패
  - 숨은 쟁점 연쇄가 `h-d4`까지 이어지지 않음
  - 증거 체인 `e-5`~`e-7` 실패
  - witness depth 확장 실패
  - 최소 턴 판결 진입 실패
  - interjection 유도 실패
  - Scripted miss `5`건 재발

- 종합 판정: `CONDITIONAL`이 아니라 여전히 `FAIL`
