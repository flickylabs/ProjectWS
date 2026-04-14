# Thread-Q V5 Full Test Report

## 기준

- 실행 기준일: `2026-04-14`
- 기준 커밋: `c193f03`
- 기준 브랜치: `codex/ui-handoff-freeze-20260411`
- 대상 사건: `spouse-01`, `friend-01`, `family-01`
- 검증 범위: Thread Q 전담 항목인 구조 정합성, 데이터 참조 무결성, 코드 로직, 런타임 검증

## 최종 판정

- `PASS (Thread Q 기준)`
- Level 1~5 중 구조/참조/엔진/런타임 차단 이슈는 모두 해소됨
- 잔여 경고는 3사건 공통 `S5` 텍스트 품질 항목뿐이며, 이는 Thread `QW` 관할로 보고만 수행

## 수정 사항

1. Witness depth 체인 누락 수정
- 파일: `src/data/witnessTestimonyData/spouse-01.ts:174`, `src/data/witnessTestimonyData/spouse-01.ts:183`
- 내용: `w2-hd3-signature-doubt`에 `prevSlotRequired: 'w2-hd3-savings-cancel'` 추가
- 효과: depth 3 witness slot이 선행 슬롯 없이 열릴 수 있던 구조적 리스크 제거

2. Scripted dossier alias 보정 추가
- 파일: `src/engine/scriptedTextLoader.ts:256`, `src/engine/scriptedTextLoader.ts:267`, `src/engine/scriptedTextLoader.ts:359`, `src/engine/scriptedTextLoader.ts:372`
- 내용: `dossier-*`와 legacy `dc-*` 간 후보 ID를 함께 조회하도록 보강
- 효과: friend/family dossier scripted 응답 miss 가능성 제거

3. Headless 검증 하네스 보강
- 파일: `tests/playthrough-runner.cjs:21`, `tests/playthrough-runner.cjs:47`, `tests/playthrough-runner.cjs:439`, `tests/playthrough-runner.cjs:591`, `tests/playthrough-runner.cjs:612`
- 파일: `tests/run-84-headless.cjs:193`, `tests/run-playthrough.cjs:77`
- 내용: scriptedText 로더 연결, `evidenceId` 전달, 금액 검출 정규식 보강
- 효과: 검증 도구가 실제 scripted 우선 경로를 반영하도록 정합화

4. 비PC 모순 추궁 1회 제한 수정
- 파일: `src/components/court/DialogueLog.tsx:12`, `src/components/court/DialogueLog.tsx:17`, `src/components/court/DialogueLog.tsx:27`, `src/components/court/DialogueLog.tsx:36`
- 파일: `src/components/court/DialogueEntry.tsx:11`, `src/components/court/DialogueEntry.tsx:96`
- 내용: `entry.id` 기준 사용 이력 저장, 재클릭 차단, 사용 후 disabled 처리
- 효과: PC 경로와 비PC 경로의 contradiction 정책 정합성 확보

## 구조/로직 검증 결과

### Phase A

- Level 1: `tests/thread-q-v5-audit.cjs --json` 기준 3사건 전부 `PASS`
- Level 2: witness chain, prevSlotRequired, prevChoiceRequired 검증 후 `PASS`
- Level 3: spouse viewerData 구조 `PASS`
- 근거 코드
- `src/engine/witnessTestimonyResolver.ts:60`
- `src/engine/witnessTestimonyResolver.ts:65`
- `src/engine/witnessTestimonyResolver.ts:77`
- `src/engine/witnessTestimonyResolver.ts:98`
- `src/data/cases/caseLoader.ts:392`
- `src/components/pc/evidence/PCEvidenceViewer.tsx:60`
- `src/components/pc/evidence/PCEvidenceViewer.tsx:97`

### Phase B

- 끼어들기 로직: `src/engine/interjectionV2.ts:181` 기반 평가 흐름 정상
- `S5` 도달 시 끼어들기 차단: `src/engine/interjectionV2.ts:284`
- 끼어들기 종료 후 target 복원: `src/hooks/useActionDispatch.ts:235`
- phase advance / turn 증가 / mediation 강제 전이 조건 검토 완료
- verdict / profile drift 계산 로직 검토 완료
- 근거 코드
- `src/store/slices/phaseSlice.ts:30`
- `src/store/slices/phaseSlice.ts:62`
- `src/store/slices/phaseSlice.ts:89`
- `src/engine/verdictEngine.ts:22`
- `src/engine/judgeProfileEngine.ts:62`
- `src/engine/judgeProfileEngine.ts:239`

### Phase C

- `node tests/run-84-headless.cjs --case spouse-01`
- 결과: `PASS 18 / WARN 2 / ERR 0`
- `node tests/run-84-headless.cjs --case friend-01`
- 결과: `PASS 18 / WARN 2 / ERR 0`
- `node tests/run-84-headless.cjs --case family-01`
- 결과: `PASS 18 / WARN 2 / ERR 0`
- 공통점: 구조/엔진/런타임 오류 `0`, `S5` 텍스트 품질 경고 `2`만 남음

## 검증 명령 결과

- `node tests/thread-q-v5-audit.cjs --json` → `PASS`
- `node tests/run-84-headless.cjs --case spouse-01` → `PASS 18 / WARN 2 / ERR 0`
- `node tests/run-84-headless.cjs --case friend-01` → `PASS 18 / WARN 2 / ERR 0`
- `node tests/run-84-headless.cjs --case family-01` → `PASS 18 / WARN 2 / ERR 0`
- `npx tsc -b --force` → `PASS`
- `npm run build` → `PASS`

## 잔여 이슈

1. `spouse-01`, `friend-01`, `family-01` 공통으로 `S5` 응답이 4문장 기준을 못 채우거나 구체적 금액을 포함하지 않는 경고가 남아 있음
- 분류: `텍스트 품질`
- 관할: Thread `QW`
- 처리: 이번 Thread Q 보고서에서는 `FAIL/WARN` 보고만 수행, 직접 수정하지 않음

2. `npm run build`는 성공했지만 아래 경고가 남아 있음
- CSS `@import` 순서 경고
- ineffective dynamic import 경고
- large chunk 경고
- 분류: 빌드 경고
- 영향: 이번 V5 3사건 구조·로직 검증의 차단 이슈는 아님

## 결론

- Thread Q 범위에서 확인된 구조/참조/엔진/런타임 문제는 모두 해소됨
- 최종 상태는 `PASS`
- 후속 작업이 필요하다면 대상은 Thread `QW`의 `S5` 한국어/서술 품질 보강뿐임
