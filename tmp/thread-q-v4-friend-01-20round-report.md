# Thread-Q V4 Test Report: friend-01

## 요약
- 요청 기준: 20회 종합 검증
- 실제 재실행: `focus11` 1런 (`1202`)
- 결과: `FAIL`
- 핵심 블로커: sequential emergence 붕괴, 증거 체인 전면 정지, 강제 불완전 판결

## 실행 근거
- 산출 JSON: `tmp/friend-01-focus11.json`
- 콘솔 로그: `tmp/friend-01-focus11-rerun.out.log`
- phase 경로: `phase0 -> phase1 -> phase3 -> phase6 -> phase7 -> result`

## Level 1~3 자동화
- PASS: `scriptedMissCount = 0`
- PASS: `seriousErrors = []`, `typeErrorLike = []`
- PASS: 초기 UI는 `d-1`만 표시
- PASS: `d5VisibilityAfterD3 = "hidden"`, `d5VisibilityAfterD4 = "hidden"`로 조기 발현은 막힘
- FAIL: `afterD2Ui.hotbarDisputeNames`에 `d-3`, `d-4`가 동시에 노출되어 순차 해금이 무너짐
  - `A 아버지는 예비신랑에게 돈을 떯어내려 접근하고 있었는가`
  - `과거 손절 사건의 진짜 원인은 B의 변심이었는가, A 아버지의 사기였는가`

## Level 4 NPC 품질
- PASS: interrogations는 ScriptedText 적중 유지
- WARN: 오탈자/형태 문제 잔존
  - `돈을 떯어내려`
  - `답할 수 있은 성질이 아닙니다`
- FAIL: hidden 체인이 무너져 대사 품질 전수 판정 이전에 구조 FAIL

## Level 5 게임플레이 / emergence / 증거
- FAIL: 기대 체인 `d-2 -> d-3 -> d-4 -> d-5` 중 `d-2 -> (d-3,d-4 동시)` 형태로 흐름 붕괴
- FAIL: `e-4`, `e-5`, `e-6` 모두 끝까지 잠김
  - `attempted = false`
  - `evidenceFinal.unlocked = ["e-1","e-2","e-3"]`
- FAIL: 최종 판결이 `forced_incomplete`
- PASS: `d-5`는 최종 snapshot 기준 여전히 `hidden`이라 AND 조건의 "조기 발현 금지" 한 점만 유지

## 발견된 이슈
1. `FAIL` 엔진/Thread G: `afterD2Ui`에서 `d-3`, `d-4`가 동시에 발현되어 순차 emergence 실패.
2. `FAIL` 엔진/Thread G: 증거 체인이 전혀 연결되지 않아 `e-4/e-5/e-6`이 모두 잠금 상태 유지.
3. `FAIL` 엔진/Thread G: turn/evidence progression 부족으로 `forced_incomplete` 판결에 머무름.
4. `WARN` ScriptedText/Thread W: `떯어내려`, `있은 성질` 등 텍스트 품질 문제 잔존.

## 최종 판정
- `FAIL`
- 근거: emergence와 evidence unlock이 모두 기준 미달이고 완전 판결 경로도 확보되지 않음.
