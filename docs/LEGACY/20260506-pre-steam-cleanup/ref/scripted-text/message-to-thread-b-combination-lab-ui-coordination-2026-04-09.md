# Thread B Coordination Note — Combination Lab UI

## 배경

Thread A에서 조합 실험실 V2.1의 데이터/store 최소 경로를 만들었고, 확인용으로 기존 쟁점 보드 안에 최소 UI를 붙였습니다.  
다만 UI 주 작업은 Thread B 범위이므로, 이 메모는 충돌 방지와 인계용입니다.

## Thread A가 이번에 건드린 UI 파일

- [D:\ProjectWS\src\components\discovery\DisputeBoard.tsx](D:/ProjectWS/src/components/discovery/DisputeBoard.tsx)
  - 기존 비교 보관함 아래에 `CombinationLabPanel` 삽입
- [D:\ProjectWS\src\components\discovery\CombinationLabPanel.tsx](D:/ProjectWS/src/components/discovery/CombinationLabPanel.tsx)
  - 신규 추가
  - 최소 조합 실험실 패널

## UI 외 핵심 계약 파일

이쪽은 Thread B가 UI를 바꾸더라도 가급적 유지/반영해야 하는 data/store 계약입니다.

- [D:\ProjectWS\src\types\case.ts](D:/ProjectWS/src/types/case.ts)
  - `combinationLab?: CombinationLabConfig`
- [D:\ProjectWS\src\store\slices\combinationLabSlice.ts](D:/ProjectWS/src/store/slices/combinationLabSlice.ts)
  - 조합 실행과 결과 적용의 핵심
- [D:\ProjectWS\src\store\useGameStore.ts](D:/ProjectWS/src/store/useGameStore.ts)
  - `initCombinationLab(caseData)`
- [D:\ProjectWS\src\store\slices\evidenceSlice.ts](D:/ProjectWS/src/store/slices/evidenceSlice.ts)
  - `addDerivedEvidence`, `patchEvidenceDefinition`
- [D:\ProjectWS\src\store\slices\discoverySlice.ts](D:/ProjectWS/src/store/slices/discoverySlice.ts)
  - `upsertDisputeVisibility`

## 현재 UI에서 가능한 최소 기능

- 분석 포인트 표시
- 3슬롯 선택 트레이
- 증거/노트/파생 노드 선택
- recipe 미리보기
- 조합 실행
- 시스템 로그 기록

## 아직 Thread B가 확장해야 할 부분

- `QuestionSelector`가 `combinationLabRuntime.unlockedQuestions`를 실제 질문 목록에 반영
- `EvidencePresenter`에서 조합 가능한 증거 추천/고정 UX 강화
- `WitnessSection`이 `unlockedWitnessAngles`를 반영
- `Phase6_Mediation`가 `unlockedMediationHints`를 반영
- derived dispute를 `DisputeBoard`에서 시각적으로 구분
- 결과 패널을 현재 임시 텍스트 미리보기에서 더 풍부한 카드형 UI로 승격

## 충돌 방지 메모

- Thread A가 넣은 [D:\ProjectWS\src\components\discovery\CombinationLabPanel.tsx](D:/ProjectWS/src/components/discovery/CombinationLabPanel.tsx)은 임시 최소 구현입니다.
- Thread B가 더 적합한 위치/레이아웃/스타일로 바꾸는 것은 괜찮습니다.
- 다만 아래 store 계약은 유지해 주세요.
  - `useGameStore.getState().canRunCombinationRecipe(recipeId)`
  - `useGameStore.getState().getAvailableCombinationRecipes()`
  - `useGameStore.getState().runCombinationRecipe(recipeId)`
  - `combinationLabRuntime.analysisPoints`
  - `combinationLabRuntime.discoveredNodeIds`

## 데이터 시범 사건

- [D:\ProjectWS\src\data\cases\generated\headline-01.json](D:/ProjectWS/src/data/cases/generated/headline-01.json)
  - 실제 `combinationLab` 데이터가 들어가 있는 현재 기준 파일럿

## 설계 참고 문서

- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-design.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-design.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-headline-01-pilot.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-headline-01-pilot.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-ui-expansion-plan.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-ui-expansion-plan.md)

