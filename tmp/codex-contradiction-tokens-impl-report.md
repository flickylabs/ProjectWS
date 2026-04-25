# Codex 모순 토큰 쟁점별 분리 구현 보고

## 기준
- 작업 기준 베이스: `cb36c16`
- 구현 지시: `docs/ref/리뉴얼참고/ct-to-codex-contradiction-tokens-impl.md`
- 설계 근거: `docs/ref/리뉴얼참고/plan-contradiction-tokens-split.md`
- 적용 결정: 타입 안 A / severity 안 A / 마이그레이션 안 X

## 실제 코드 변경
- `src/engine/questionEffectEngine.ts`
  - `QuestionMeterState`에 `contradictionTokensByDispute` 추가
  - `createInitialMeterState()` 초기화 추가
  - `deriveGlobalContradictionTokens()` 추가
  - `resolveFactPursuit()`를 쟁점별 토큰 기준으로 전환
  - `applyMeterUpdate()`에 `disputeId`를 추가하고 `fact_pursuit`/`empathy_approach`를 쟁점별 SoT 기준으로 갱신
  - 글로벌 `contradictionTokens`는 `max(byDispute)`로 재계산
  - `getMeterEffects()`에 선택적 `disputeId` 지원 추가
- `src/store/useGameStore.ts`
  - 구 세이브 호환용 `ensureQuestionMeterState()` 추가
  - zustand `persist.merge`에서 `contradictionTokensByDispute` 누락 시 `{}` 보정
- `src/engine/gameEventTriggerEngine.ts`
  - `checkContradiction()`의 조건/severity/event index를 모두 `focusDisputeId` 기준 토큰으로 전환
- `src/components/pc/panels/PCRightPanel.tsx`
  - 현재 `activeDispute` 기준 pip/count 표시로 전환
- `src/components/actions/QuestionSelector.tsx`
  - `lastFocusedDisputeId` 기준 쟁점 토큰으로 `computeEffectiveness()` 계산

## 미변경 유지
- `src/hooks/useActionDispatch.ts`
  - 모듈 레벨 `_contradictionTokens`는 전이 트리거용이므로 유지
- `src/components/pc/hotbar/PCBottomDock.tsx`
  - 글로벌 집계값 표시 의도 유지
- `src/engine/meterStagingV2.ts`
  - dossier HUD 글로벌 집계 유지
- `src/components/actions/ActionPanel.tsx`
  - dossier 해금/요약의 글로벌 집계 유지
- 텍스트 콘텐츠/QW 영역 로직 수정 없음

## 검증 결과
- `npx tsc -b --force`: PASS
- `npm run build`: PASS
- `node tests/run-84-headless.cjs --case spouse-01`: PASS
- `node tests/run-84-headless.cjs --case friend-01`: PASS
- `node tests/run-84-headless.cjs --case family-01`: PASS
- `node tests/stress-test-20rounds.cjs`: PASS

## 확인된 주의사항
- 수동 UI 확인은 이번 세션에서 미실행
- `npm run build`는 기존과 동일하게 chunk size warning을 출력함
- 헤드리스 실행 시 아래 transcript 산출물이 갱신됨
  - `docs/ref/리뉴얼참고/full-playthrough-results.json`
  - `docs/ref/리뉴얼참고/stress-test-results.json`
  - `tests/transcripts/_summary.json`
  - `tests/transcripts/spouse-01.json`
  - `tests/transcripts/friend-01.json`
  - `tests/transcripts/family-01.json`
- 위 transcript 변경은 테스트 산출물이며 구현 코드 변경 범위 밖임

## 현재 코드 diff 요약
- 변경 파일 5개
- 코드 diff: 84 insertions / 19 deletions

## 판단
- 구조 변경, 저장소 호환, 엔진 쓰기, 이벤트 severity, UI 읽기까지 지시 범위를 모두 반영함
- 현재 상태는 CT의 단계별 커밋 분할 대상으로 넘길 수 있음
