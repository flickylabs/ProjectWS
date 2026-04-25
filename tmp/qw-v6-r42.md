# QW V6 R42: 하드코딩 조사 전수 재확인

## 실행
- src/**/*.{ts,tsx} 전수 `${*name*}[과와이가]` 패턴 grep

## 결과
- **0 match** — R17~R34 수정으로 모든 위험 지점 처리됨

## 추가 확인: `${name}은/는/을/를` 잔여 여부
- 이전 R19/R20 스캔에서 파악된 건들:
  - components/pc/feedback/DiscoveryFeedbackWatcher.tsx: `${partyName}의` (safe)
  - components/pc/hotbar/PCActionsPanel.tsx: `${...name}의` (safe)
  - engine/llmDialogueResolver.ts: `${myName}이다` (copula, safe)
- 남은 하드코딩은 모두 `의/에/에게/도/만/씨/건/"" (무조사)` → 안전

## 결론
- 활성 3사건 runtime 영향 기준: **조사 하드코딩 버그 0건 남음**
- generic-phase1.ts (비활성): `${dispute.name}은` 4곳 — CT 판단 대기

## 라운드 판정: **PASS**
