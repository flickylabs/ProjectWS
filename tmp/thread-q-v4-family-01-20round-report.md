# Thread-Q V4 Test Report: family-01

## 요약
- 요청 기준: 20회 종합 검증
- 실제 재실행: `focus11` 1런 (`1201`)
- 결과: `FAIL`
- 핵심 블로커: hidden 해금 순차성 붕괴, `d-5` AND 조건 실패, 증거 국소 해금 실패

## 실행 근거
- 산출 JSON: `tmp/family-01-focus11.json`
- 콘솔 로그: `tmp/family-01-focus11-rerun.out.log`
- phase 경로: `phase0 -> phase1 -> phase3 -> phase6 -> phase7 -> result`

## Level 1~3 자동화
- PASS: `scriptedMissCount = 0`
- PASS: `seriousErrors = []`, `typeErrorLike = []`
- PASS: 초기 UI는 `d-1`만 표시
- FAIL: `afterD1Ui.hotbarDisputeNames`에 이미 `d-4`, `d-5` 계열 제목이 동시 노출
  - `60:40 유서 조작은 자기 몫을 늘리려 한 조작인가, 줄이려 한 조작인가`
  - `A의 출생 비밀을 B는 왜 알고도 숨겼는가`
- FAIL: `e-1` 제시 직후 `e-4`가 열림 (`unlockedAfterE1 = ["e-1","e-2","e-3","e-4"]`)

## Level 4 NPC 품질
- PASS: `b|e-1|mid|both` ScriptedText 실제 적중
- WARN: 일부 대사에 형태 오염 흔적이 남아 있음
  - `어머상대방이 먼저 꺼내시면`
- FAIL: hidden 쟁점이 너무 이르게 노출되어 Truth Throttle 품질 평가 자체가 무의미해짐

## Level 5 게임플레이 / emergence / 증거
- FAIL: 기대 체인 `d-2 -> d-3 -> d-4 -> d-5`가 유지되지 않음
- FAIL: `d5VisibilityAfterD3 = "emerged"`로, `d-3 S3 AND d-4 S2` 이전에 `d-5`가 발현됨
- FAIL: `afterD2Ui` 시점에 hotbar/ribbon에 거의 전 쟁점이 노출
- FAIL: `e-4` 제시 한 번에 `e-5`, `e-6`까지 동시 해금
- FAIL: `e-7`은 끝까지 잠김 (`attempted = false`)
- PASS: 판결까지는 완주 (`verdictMode = normal`)

## 발견된 이슈
1. `FAIL` 엔진/Thread G: hidden 쟁점 순차 발현이 무너져 `afterD1Ui`부터 후속 쟁점이 동시 노출.
2. `FAIL` 엔진/Thread G: `d-5` AND 조건이 작동하지 않아 `d5VisibilityAfterD3 = "emerged"` 상태가 됨.
3. `FAIL` 엔진/Thread G: 증거 국소 해금이 실패해 `e-1 -> e-4`, `e-4 -> e-5/e-6` 식의 조기 연쇄 해금 발생.
4. `WARN` ScriptedText/Thread W: `어머상대방이` 같은 텍스트 오염 잔존.

## 최종 판정
- `FAIL`
- 근거: emergence 순차성, AND 조건, 증거 해금 체인 3축이 모두 기준 미달.
