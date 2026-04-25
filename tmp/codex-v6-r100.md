# Codex V6 R100: 종합 QA 완료 체크포인트

## 실행
- 정적 스캔: engine 인벤토리, UI→engine import 맵, stale test 점검
- 커맨드:
  - `npx tsc -b --force`
  - `npm run build`
  - `node tests/stage1-deep-audit.cjs`
  - `node tests/v2-atoms-audit.cjs`
  - `node tests/v3-engine-test.cjs`
  - `node tests/v2-fatigue-bypass-test.cjs`
  - `node tests/v2-misconception-freequestion-test.cjs`
  - `node tests/stress-test-20rounds.cjs`
  - `node tests/run-84-headless.cjs --case spouse-01`
  - `node tests/run-84-headless.cjs --case family-01`
  - `node tests/run-84-headless.cjs --case friend-01`
- 로그: `tmp/codex-v6-*.log`

## 발견
- critical: 0
- major: 2
- minor/warn: build chunk warning, custom verbalTell warning, phase2 missing warning, some evidence cross-ref warning
- 상위 3건:
  - stale test: `tests/stage1-deep-audit.cjs`가 spouse의 1-based stage를 FAIL로 오판
  - stale test: `tests/v2-fatigue-bypass-test.cjs`가 구 spouse schema/사라진 file을 강가정
  - UI leak: `PCDialogueLog`/`DialogueLog`의 `_usedContradictions` 전역 Set가 새 플레이로 누수 가능

## QW 이월
- spouse-01 turn 17/18: S5 scripted response 문장 수/구체성 부족
- family-01 turn 17/18: S5 scripted response 문장 수/구체성 부족
- friend-01 turn 17/18: S5 scripted response 문장 수/구체성 부족

## 수정
- `tests/stage1-deep-audit.cjs`: stage sequence 0/1/2, 1/2/3 동시 허용
- `tests/v2-fatigue-bypass-test.cjs`: 현행 spouse structure/game-events 기준으로 기대값 갱신
- `src/components/pc/layout/PCDialogueLog.tsx`: 케이스 전환/로그 reset 시 `_usedContradictions.clear()`
- `src/components/court/DialogueLog.tsx`: 동일 reset 보강
- 빌드/타입 통과: ✓
- 회귀: 해당 테스트 전부 재실행 ✓

## CT 검토 요청
- 작업 중 `family-01.json`, `friend-01.json`이 외부에서 1/2/3 stage로 변경됨. 현재 테스트는 양쪽 numbering 모두 허용하도록 맞췄지만, 데이터 기준을 하나로 통일할지 CT 판단 필요
- `docs/ref/리뉴얼참고/full-playthrough-results.json`, `stress-test-results.json`이 테스트 중 갱신됨. 산출물 유지 여부 확인 필요

## 다음 라운드로 이월
- QW scripted S5 품질 보강
- build chunk 경고 대응 (`engine`/`index` 분할)
