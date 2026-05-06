# Codex 작업 지시

## 작업 요약
18개 파일에서 `GamePhase.Phase0_CaseIntro` 같은 legacy enum 참조를 `Phase.Briefing` 같은 새 alias로 일괄 교체합니다.

## 먼저 읽을 파일 (순서대로)
1. `src/types/game.ts` — `Phase` const 정의 확인 (파일 하단)
2. `docs/requests/codex-phase-alias/메시지.md` — 교체 규칙 + 대상 파일 18개 목록 + 주의사항

## 교체 매핑 (6종)

```
GamePhase.Phase0_CaseIntro       →  Phase.Briefing
GamePhase.Phase1_InitialStatement →  Phase.Pretrial
GamePhase.Phase3_Interrogation   →  Phase.Interrogation
GamePhase.Phase6_Mediation       →  Phase.Mediation
GamePhase.Phase7_Verdict         →  Phase.Verdict
GamePhase.Result                 →  Phase.Result
```

## 교체하지 않는 것
- `GamePhase.Phase2_Rebuttal`, `Phase4_Evidence`, `Phase5_ReExamination` — deprecated fallback으로 남겨둠
- `enum GamePhase { ... }` 정의 자체
- `game.ts`의 `Phase` const 정의 자체
- `GamePhase`를 **타입**으로 사용하는 곳 (예: `phase: GamePhase`)

## 각 파일에서 할 일
1. import에 `Phase` 추가: `import { GamePhase }` → `import { GamePhase, Phase }`
2. 위 6종 매핑에 해당하는 모든 참조를 교체 (값 비교, Record 키, switch/case 포함)

## 대상 파일 (18개)
```
src/app/App.tsx
src/app/PCApp.tsx
src/utils/constants.ts
src/api/settingsManager.ts
src/store/slices/phaseSlice.ts
src/components/actions/ActionPanel.tsx
src/components/court/PartyStatusBar.tsx
src/components/layout/Tutorial.tsx
src/components/layout/TopBar.tsx
src/components/layout/PhaseTransition.tsx
src/components/layout/PhaseIndicator.tsx
src/components/layout/CourtHeader.tsx
src/components/pc/layout/PCCourtLayout.tsx
src/components/pc/panels/PCRightPanel.tsx
src/components/pc/hotbar/PCBottomDock.tsx
src/components/pc/hotbar/PCActionsPanel.tsx
src/components/phase/Phase6_Mediation.tsx
src/engine/llmDialogueResolver.ts
```

## 빌드 확인
`npx tsc -b --force` 통과 필수.
기존 로직 변경 금지 — import 추가 + 이름 교체만 수행.
