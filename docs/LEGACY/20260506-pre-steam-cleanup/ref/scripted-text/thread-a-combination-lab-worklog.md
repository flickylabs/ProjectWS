# Thread A Combination Lab Worklog

## 운영 원칙

- 이 문서는 Thread A의 조합 실험실 관련 변경을 누적 기록하는 로그다.
- CT 보고 시 이 문서를 기준으로 최근 변경을 묶어서 전달한다.
- UI 관련 변경은 스레드B와 충돌 위험이 있으므로, 이 문서와 별도로 스레드B 공유 메모도 함께 유지한다.

## 2026-04-09 22:06 +09:00

### 이번 라운드 목표

- 조합 실험실을 `unlock-only`에서 `upgrade / reframe / split / merge`까지 확장
- `headline-01`에 실제 `combinationLab` 데이터 주입
- 기존 UI를 새로 만드는 대신, 현재 비교/쟁점 보드 위에 최소 조합 패널을 붙이는 방향으로 시범 구현

### 설계 문서 추가

- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2-design.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2-design.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2-headline-01-pilot.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2-headline-01-pilot.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-design.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-design.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-headline-01-pilot.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-headline-01-pilot.md)
- [D:\ProjectWS\docs\ref\리뉴얼참고\combination-lab-v2_1-ui-expansion-plan.md](D:/ProjectWS/docs/ref/리뉴얼참고/combination-lab-v2_1-ui-expansion-plan.md)

### 타입 / 데이터 계층 변경

- [D:\ProjectWS\src\types\case.ts](D:/ProjectWS/src/types/case.ts)
  - `CombinationLabNodeType`
  - `CombinationLabResultKind`
  - `CombinationLabNode`
  - `CombinationLabEffect`
  - `CombinationLabOutput`
  - `CombinationLabRecipe`
  - `CombinationLabConfig`
  - `CaseData.combinationLab?`
- [D:\ProjectWS\src\data\cases\generated\headline-01.json](D:/ProjectWS/src/data/cases/generated/headline-01.json)
  - `combinationLab` 실제 authoring 삽입
  - 현재 값: `nodes 25 / outputs 12 / recipes 12 / analysisPointsBase 8`

### store / reducer 계층 변경

- [D:\ProjectWS\src\store\slices\combinationLabSlice.ts](D:/ProjectWS/src/store/slices/combinationLabSlice.ts)
  - 조합 실험실 전용 runtime state
  - `initCombinationLab`
  - `getAvailableCombinationRecipes`
  - `canRunCombinationRecipe`
  - `runCombinationRecipe`
- [D:\ProjectWS\src\store\useGameStore.ts](D:/ProjectWS/src/store/useGameStore.ts)
  - slice 등록
  - 사건 초기화 시 `initCombinationLab(caseData)` 실행
  - persisted partialize에 `combinationLabRuntime` 추가
- [D:\ProjectWS\src\store\slices\evidenceSlice.ts](D:/ProjectWS/src/store/slices/evidenceSlice.ts)
  - `addDerivedEvidence`
  - `patchEvidenceDefinition`
- [D:\ProjectWS\src\store\slices\discoverySlice.ts](D:/ProjectWS/src/store/slices/discoverySlice.ts)
  - `upsertDisputeVisibility`

### 현재 store에서 실제 반영되는 결과

- 새 노트 해금
- 새 질문 해금
- 새 진술 해금
- 새 증인 각도 해금
- 새 조정 힌트 해금
- 파생 증거 추가
- 증거 승격/재프레임 기록
- 파생 쟁점 추가
- 쟁점 업그레이드/재프레임/분할/병합 기록

### UI 계층 변경

- [D:\ProjectWS\src\components\discovery\CombinationLabPanel.tsx](D:/ProjectWS/src/components/discovery/CombinationLabPanel.tsx)
  - 3슬롯 조합 트레이
  - 분석 포인트 표시
  - 증거/노트/파생 노드 선택
  - recipe 미리보기
  - 조합 실행
- [D:\ProjectWS\src\components\discovery\DisputeBoard.tsx](D:/ProjectWS/src/components/discovery/DisputeBoard.tsx)
  - 기존 비교 보관함 아래에 `CombinationLabPanel` 삽입

### 현재 headline-01 파일럿에서 authoring된 조합 효과 종류

- `unlock_note`
- `unlock_question`
- `unlock_statement`
- `unlock_witness_angle`
- `upgrade_evidence`
- `upgrade_dispute`
- `reframe_dispute`
- `reframe_evidence`
- `split_dispute`
- `merge_disputes`

### 이번 라운드 확인 결과

- `headline-01` combinationLab 입력/출력 참조 누락: `0`
- `headline-01` 조합 데이터 요약:
  - caseId: `case-headline-01`
  - analysisPoints: `8`
  - nodes: `25`
  - outputs: `12`
  - recipes: `12`

### 주의사항

- 전역 타입체크/빌드는 현재 워크스페이스의 기존 문제로 깨끗하게 돌지 않는다.
- 이번 변경분 자체는 데이터 정합성, 참조 무결성, 개별 타입 수준에서 확인했다.
- UI는 스레드B 작업 범위와 충돌할 가능성이 있으므로, 이후 UI 변경은 스레드B 메모를 같이 갱신해야 한다.

### 다음 후속 작업 후보

- `QuestionSelector`에 `unlockedQuestions` 실제 주입
- `WitnessSection`에 `unlockedWitnessAngles` 반영
- `Phase6_Mediation`에 `unlockedMediationHints` 반영
- derived dispute를 보드에서 별도 스타일로 표시
- 다른 사건에 대한 `combinationLab` 자동 생성 규칙 추가

