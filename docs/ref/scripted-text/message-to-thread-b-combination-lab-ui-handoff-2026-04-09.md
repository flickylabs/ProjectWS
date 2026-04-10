# Thread B Handoff — Combination Lab UI Coordination

Thread A에서 조합 실험실 V2.1의 데이터/store 최소 경로를 먼저 넣었습니다.  
UI는 Thread B 주 작업 범위라, 아래 내용을 기준으로 충돌 없이 이어서 확장해 주세요.

## 이번에 Thread A가 실제로 반영한 것

- 타입/데이터 계약 추가
  - [D:\ProjectWS\src\types\case.ts](D:/ProjectWS/src/types/case.ts)
  - `CaseData.combinationLab?`
- store/runtime 최소 경로 추가
  - [D:\ProjectWS\src\store\slices\combinationLabSlice.ts](D:/ProjectWS/src/store/slices/combinationLabSlice.ts)
  - [D:\ProjectWS\src\store\useGameStore.ts](D:/ProjectWS/src/store/useGameStore.ts)
  - [D:\ProjectWS\src\store\slices\evidenceSlice.ts](D:/ProjectWS/src/store/slices/evidenceSlice.ts)
  - [D:\ProjectWS\src\store\slices\discoverySlice.ts](D:/ProjectWS/src/store/slices/discoverySlice.ts)
- 시범 데이터 추가
  - [D:\ProjectWS\src\data\cases\generated\headline-01.json](D:/ProjectWS/src/data/cases/generated/headline-01.json)
  - `combinationLab` 실제 authoring 포함
- 최소 UI 삽입
  - [D:\ProjectWS\src\components\discovery\CombinationLabPanel.tsx](D:/ProjectWS/src/components/discovery/CombinationLabPanel.tsx)
  - [D:\ProjectWS\src\components\discovery\DisputeBoard.tsx](D:/ProjectWS/src/components/discovery/DisputeBoard.tsx)

## 현재 최소 UI에서 되는 것

- 분석 포인트 표시
- 3슬롯 선택 트레이
- 증거/노트/파생 노드 선택
- recipe 미리보기
- 조합 실행
- 시스템 로그 기록

## Thread B가 이어서 확장해야 할 핵심

1. 현재 임시 패널을 Thread B 기준 레이아웃/스타일로 재배치
2. `QuestionSelector`에 `combinationLabRuntime.unlockedQuestions` 반영
3. `WitnessSection` 또는 관련 UI에 `unlockedWitnessAngles` 반영
4. `Phase6_Mediation`에 `unlockedMediationHints` 반영
5. 파생 쟁점/재프레임/분할/병합 결과를 `DisputeBoard`에서 더 잘 보이게 시각화
6. `EvidencePresenter`와 연결해서 증거-노트-파생노드 흐름을 더 자연스럽게 만들기

## 유지해 주세요

아래 계약은 가능한 유지해 주세요.

- `useGameStore.getState().canRunCombinationRecipe(recipeId)`
- `useGameStore.getState().getAvailableCombinationRecipes()`
- `useGameStore.getState().runCombinationRecipe(recipeId)`
- `combinationLabRuntime.analysisPoints`
- `combinationLabRuntime.discoveredNodeIds`
- `combinationLabRuntime.unlockedQuestions`
- `combinationLabRuntime.unlockedWitnessAngles`
- `combinationLabRuntime.unlockedMediationHints`

즉, UI는 바꿔도 되지만 store API는 가급적 그대로 물고 가는 쪽이 좋습니다.

## 설계 참고 문서

- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-design.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-design.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-headline-01-pilot.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-headline-01-pilot.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-ui-expansion-plan.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-ui-expansion-plan.md)
- [D:\ProjectWS\docs\ref\scripted-text\message-to-thread-b-combination-lab-ui-coordination-2026-04-09.md](D:/ProjectWS/docs/ref/scripted-text/message-to-thread-b-combination-lab-ui-coordination-2026-04-09.md)
- [D:\ProjectWS\docs\ref\scripted-text\thread-a-combination-lab-worklog.md](D:/ProjectWS/docs/ref/scripted-text/thread-a-combination-lab-worklog.md)

## 주의

- 현재 `CombinationLabPanel`은 Thread A의 최소 기능 구현입니다.
- Thread B가 더 적절한 위치, 상호작용 방식, 패널 구조로 바꾸는 것은 괜찮습니다.
- 다만 `headline-01` 파일럿 데이터와 store 결과 적용 흐름은 이미 연결돼 있으므로, UI 변경 시 해당 경로를 깨지 않도록 해 주세요.

