# spouse-01 V4 3차 헤드리스 플레이스루 결과

- 대상: `spouse-01` / `case-spouse-01`
- 원본 산출물: [D:\ProjectWS\tmp\spouse-01-v4-playthrough.json](D:\ProjectWS\tmp\spouse-01-v4-playthrough.json)
- 실행 기준:
  - `lieStateMachine.ts`: question trigger 폴백 전이 추가
  - `useActionDispatch.ts`: empathy S0~S2 확률 상향 + 3회 실패 후 보장
- 참고:
  - 이번 재실행 전에 하네스가 잘못된 엔트리와 분리 store를 잡고 있던 문제를 바로잡음
  - 실제 PC 앱 store/dispatch 기준으로 10회 재실행함

## 총평

- 10회 전부 완료
- `[Scripted miss]` 총 `6`
- `[Scripted]` hit 총 `166`
- `TypeError` / `undefined` 총 `0`
- 회차 2는 수정 효과 확인
- 회차 1, 6은 여전히 실패
- 종합 판정: `FAIL`

## 집중 체크

### 회차 1: `fact_pursuit` 반복

- 경로: `phase0 -> phase1 -> phase3`
- 턴 수: `11`
- 결과: `d-1` 최종 `S0`
- 판단:
  - `S1 이후 계속 전이` 검증 실패
  - contradiction 이벤트는 누적되지만 LieState가 최종적으로 밀리지 않음

### 회차 2: `empathy_approach` 반복

- 경로: `phase0 -> phase1 -> phase3`
- 턴 수: `6`
- 결과: `B:d-1 = S5`
- 판단:
  - `S0에서 움직이는지` 검증 통과
  - 이번 3차 수정의 직접 효과가 확인된 회차

### 회차 6: 숨은 쟁점 연쇄

- 경로: `phase0 -> phase1 -> phase3 -> phase6`
- 턴 수: `16`
- 결과:
  - `h-d3 = visible`
  - `h-d4 = hidden`
  - 최종 LieState는 A/B 전부 `S0`
- 판단:
  - `h-d4까지 열리는지` 검증 실패

## 회차별 요약

| 회차 | 전략 | 결과 |
|---|---|---|
| 1 | A만 `d-1 fact_pursuit` 반복 | FAIL, 최종 `S0` |
| 2 | B만 `d-1 empathy_approach` 반복 | PASS, 최종 `S5` |
| 3 | A/B 번갈아 심문 | PARTIAL, `A:S1 / B:S4` |
| 4 | `e-1 -> e-7` 순차 제시 | FAIL, `e-4`까지만 해금/제시, miss `3` |
| 5 | 조합 6개 전부 실행 | FAIL, `combine-1`만 성공, dossier 없음, miss `1` |
| 6 | `d-1 -> d-2 -> h-d3 -> h-d4` | FAIL, `h-d4` 미해금 |
| 7 | 증인 전부 소환 | FAIL, 전부 `vague`, `h-d4`는 우회적으로만 emerged, miss `2` |
| 8 | 최소 턴 판결 진입 | FAIL, `phase3`에 머묾 |
| 9 | 최대 턴 강제 판결 | PASS, `phase6 -> phase7 -> result`, 총점 `76` |
| 10 | 끼어들기 유도 | FAIL, interjection 미발생, contradiction만 누적 |

## 주요 관찰

- LieState:
  - empathy 루트는 확실히 풀림
  - fact 루트는 contradiction가 쌓여도 state push가 안 되는 구간이 남아 있음
- 증거 체인:
  - 현재 해금 상한이 사실상 `e-4` 근처에서 멈춤
- 조합:
  - `combine-1`만 안정적으로 성공
  - 나머지 레시피는 여전히 `recipe_locked`
- 증인:
  - 깊이 확장이 되지 않아 `vague` 고정
- 판결:
  - 강제 판결 경로는 정상
  - 최소 턴 정상 판결 진입은 여전히 실패
- 런타임 안정성:
  - 치명적 JS 에러는 없음
  - 대신 스크립트 miss 6건이 남아 있음

## 결론

- 회차 2는 개선 확인
- 하지만 release 관점에서는 핵심 게이트가 아직 남아 있음:
  - 회차 1 LieState 진행 실패
  - 회차 6 숨은 쟁점 연쇄 실패
  - 증거/조합/증인/최소 판결/끼어들기 미해결
- 현재 상태 판정은 `FAIL`
