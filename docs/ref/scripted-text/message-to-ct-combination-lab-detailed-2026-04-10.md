# CT Detailed Report — Combination Lab V2.1 Progress

이 문서는 Thread A가 진행한 `조합 실험실 V2.1` 작업의 상세 보고입니다.  
핵심은 `기존 evidenceCombinations 기반 조합`을 유지하면서, `unlock-only`가 아니라 `upgrade / reframe / split / merge`까지 가능한 구조를 실제 데이터와 store에 연결한 것입니다.

## 1. 이번 라운드에서 실제 완료한 범위

### 1-1. 설계 문서 정리

아래 문서를 추가했습니다.

- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2-design.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2-design.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2-headline-01-pilot.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2-headline-01-pilot.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-design.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-design.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-headline-01-pilot.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-headline-01-pilot.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-ui-expansion-plan.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-ui-expansion-plan.md)

### 1-2. 타입 계층 추가

- [D:\ProjectWS\src\types\case.ts](D:/ProjectWS/src/types/case.ts)

추가된 타입:

- `CombinationLabNodeType`
- `CombinationLabResultKind`
- `CombinationLabNode`
- `CombinationLabEffect`
- `CombinationLabOutput`
- `CombinationLabRecipe`
- `CombinationLabConfig`
- `CaseData.combinationLab?`

중요한 점:

- 기존 `evidenceCombinations`는 유지
- `combinationLab`는 optional 확장 필드로 추가
- 기존 케이스를 깨지 않는 방향으로 삽입

### 1-3. headline-01 파일럿 데이터 authoring

- [D:\ProjectWS\src\data\cases\generated\headline-01.json](D:/ProjectWS/src/data/cases/generated/headline-01.json)

현재 값:

- caseId: `case-headline-01`
- `analysisPointsBase`: `8`
- `nodes`: `25`
- `outputs`: `12`
- `recipes`: `12`

현재 `outputKinds`:

- `unlock_note`
- `unlock_question`
- `unlock_statement`
- `unlock_witness_angle`
- `upgrade_evidence`
- `upgrade_question`
- `upgrade_dispute`
- `reframe_evidence`
- `reframe_dispute`
- `split_dispute`
- `merge_disputes`

즉, 단순 unlock이 아니라:

- 기존 질문을 더 고급 질문으로 바꾸고
- 기존 증거를 승격하고
- 기존 쟁점을 분할/재프레임하고
- 상위 메타 쟁점으로 병합하는 흐름까지 authoring됨

## 2. store/runtime 연결

### 2-1. 신규 slice

- [D:\ProjectWS\src\store\slices\combinationLabSlice.ts](D:/ProjectWS/src/store/slices/combinationLabSlice.ts)

추가된 핵심 기능:

- `initCombinationLab(caseData)`
- `getCombinationNode(nodeId)`
- `getCombinationOutput(outputId)`
- `canRunCombinationRecipe(recipeId)`
- `getAvailableCombinationRecipes()`
- `runCombinationRecipe(recipeId)`

runtime state:

- `analysisPoints`
- `discoveredNodeIds`
- `appliedRecipeIds`
- `unlockedNotes`
- `unlockedQuestions`
- `unlockedStatements`
- `unlockedWitnessAngles`
- `unlockedMediationHints`
- `evidenceTransforms`
- `disputeTransforms`
- `history`

### 2-2. 기존 slice 확장

- [D:\ProjectWS\src\store\slices\evidenceSlice.ts](D:/ProjectWS/src/store/slices/evidenceSlice.ts)
  - `addDerivedEvidence`
  - `patchEvidenceDefinition`
- [D:\ProjectWS\src\store\slices\discoverySlice.ts](D:/ProjectWS/src/store/slices/discoverySlice.ts)
  - `upsertDisputeVisibility`

### 2-3. store 등록 / 초기화

- [D:\ProjectWS\src\store\useGameStore.ts](D:/ProjectWS/src/store/useGameStore.ts)

반영 사항:

- `CombinationLabSlice`를 `GameStore`에 병합
- `initializeCase()`에서 `initCombinationLab(caseData)` 호출
- persisted partialize에 `combinationLabRuntime` 저장

## 3. 현재 실제로 되는 결과

지금 `runCombinationRecipe()`로 반영 가능한 것:

- 새 노트 해금
- 새 질문 해금
- 새 진술 해금
- 새 증인 각도 해금
- 새 조정 힌트 해금
- 파생 증거 추가
- 기존 증거 승격 / 재프레임 기록
- 파생 쟁점 추가
- 기존 쟁점 업그레이드 / 재프레임 / 분할 / 병합 기록

즉, 이번 단계는 “설계 문서만 작성”이 아니라 최소 store 동작까지 연결된 상태입니다.

## 4. UI 관련 현재 상태

UI는 Thread B 범위와 충돌 위험이 있어서, Thread A는 최소 기능만 넣었습니다.

추가/수정 파일:

- [D:\ProjectWS\src\components\discovery\CombinationLabPanel.tsx](D:/ProjectWS/src/components/discovery/CombinationLabPanel.tsx)
- [D:\ProjectWS\src\components\discovery\DisputeBoard.tsx](D:/ProjectWS/src/components/discovery/DisputeBoard.tsx)

현재 가능한 최소 기능:

- 분석 포인트 표시
- 3슬롯 조합 트레이
- 증거/노트/파생 노드 선택
- matching recipe 미리보기
- 조합 실행
- 시스템 로그 기록

UI 주의:

- 이 부분은 “최소 작동 확인용”
- 최종 UX/layout 확장은 Thread B에서 가져가는 게 맞다고 판단

관련 인계 문서:

- [D:\ProjectWS\docs\ref\scripted-text\message-to-thread-b-combination-lab-ui-coordination-2026-04-09.md](D:/ProjectWS/docs/ref/scripted-text/message-to-thread-b-combination-lab-ui-coordination-2026-04-09.md)
- [D:\ProjectWS\docs\ref\scripted-text\message-to-thread-b-combination-lab-ui-handoff-2026-04-09.md](D:/ProjectWS/docs/ref/scripted-text/message-to-thread-b-combination-lab-ui-handoff-2026-04-09.md)

## 5. 데이터 정합성 확인

현재 확인한 것:

- `headline-01`의 `combinationLab` 입력/출력 참조 누락: `0`
- `recipes[*].inputs`가 모두 `nodes`에 존재
- `recipes[*].outputId`가 모두 `outputs`에 존재

즉, 최소한 데이터 authoring 무결성은 확인된 상태입니다.

## 6. 아직 남은 것

이번 라운드에서 아직 완전히 안 끝난 부분:

1. `QuestionSelector`에 `unlockedQuestions` 실제 반영
2. `WitnessSection`에 `unlockedWitnessAngles` 반영
3. `Phase6_Mediation`에 `unlockedMediationHints` 반영
4. derived dispute를 `DisputeBoard`에서 별도 스타일로 노출
5. `EvidencePresenter`와의 더 자연스러운 연결
6. 다른 사건에 대한 `combinationLab` 자동 생성 규칙

즉, 지금 상태는:

- 데이터 구조: 있음
- 파일럿 케이스 데이터: 있음
- store 최소 동작: 있음
- UI 최소 동작: 있음
- 전체 UX 통합: 아직 아님

## 7. 검증 / 주의사항

주의할 점:

- 전역 타입체크와 전체 빌드는 현재 워크스페이스의 기존 문제들 때문에 깨끗하게 돌지 않음
- 대표적으로 `PCHomeScreen.tsx` 및 프로젝트 tsconfig/JSON import 관련 기존 오류가 있음
- 따라서 이번 라운드는:
  - 개별 타입/데이터 무결성
  - 파일 단위 논리 점검
  - `headline-01` authoring 정합성
  를 기준으로 진행함

이 점 때문에 CT 검토 시에는 “조합 실험실 변경 자체”와 “기존 워크스페이스 타입/빌드 문제”를 분리해서 봐야 합니다.

## 8. CT가 우선 확인하면 좋은 것

1. `headline-01`의 `combinationLab` authoring 구조가 사건 흐름과 잘 맞는지
2. `CombinationLabResultKind` 체계가 충분한지
3. `runCombinationRecipe()`의 결과 적용 범위가 현재 우선순위에 맞는지
4. Thread B가 UI 확장을 이어받기 좋은 형태인지
5. 이후 `100+ 사건 자동 조합망 생성`으로 확장할 때 현재 타입 구조가 버틸지

## 9. 참고 로그

- 누적 변경 로그:
  - [D:\ProjectWS\docs\ref\scripted-text\thread-a-combination-lab-worklog.md](D:/ProjectWS/docs/ref/scripted-text/thread-a-combination-lab-worklog.md)

