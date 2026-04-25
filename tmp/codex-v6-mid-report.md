# Codex V6 Mid Report

## 현황
- 엔진/UI/build/type 범위 내 critical 0
- stale test 2건 발견: `stage1-deep-audit`, `v2-fatigue-bypass-test`
- UI state leak 1건 발견: 대화 로그의 `_usedContradictions` 전역 Set가 케이스 전환/재시작 후에도 잔존

## 조치
- `tests/stage1-deep-audit.cjs`: 0/1/2와 1/2/3 stage 번호 모두 허용
- `tests/v2-fatigue-bypass-test.cjs`: 현행 spouse 구조/`game-events` 기준으로 기대값 갱신
- `src/components/pc/layout/PCDialogueLog.tsx`
- `src/components/court/DialogueLog.tsx`
  - 케이스 변경 또는 대화 로그 초기화 시 `_usedContradictions.clear()` 추가

## 남은 리스크
- active 3사건의 S5 scripted text 품질 FAIL 6응답 / 11 rule hits → QW 이월
- build chunk 경고 유지 (`index` 약 1.5MB, `engine` 약 4.5MB)
- 작업 중 `family-01.json`, `friend-01.json`이 외부에서 1/2/3 stage로 바뀜. 수동 수정하지 않음.
