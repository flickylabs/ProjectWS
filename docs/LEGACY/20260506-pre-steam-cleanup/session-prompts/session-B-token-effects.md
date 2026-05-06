# Session B: 토큰 소비 이펙트 (Phase 2)

■ 브랜치: codex/ui-handoff-freeze-20260411
■ 커밋: e27963d
■ 참조: CLAUDE.md

## 선행 작업 (Session A에서 완료)
- TokenSpendEffect 컴포넌트가 이미 존재: src/components/pc/effects/TokenSpendEffect.tsx
- spend() 시 pc:token-spend 이벤트 발화: src/store/slices/resourceSlice.ts
- 플로팅 "-1" CSS 애니메이션: src/app/pc.css (pc-token-float-up)
- PCCourtLayout에 TokenSpendEffect 마운트 완료

## 작업 범위

### 2-1. 플로팅 텍스트 개선
- 현재: 우상단 고정 위치에 표시
- 변경: **소비가 발생한 토큰 아이콘 근처**에서 떠오르게 변경
- 토큰 아이콘 위치를 이벤트 detail에 포함하거나, 토큰 종류별 고정 위치 설정

### 2-2. 토큰 아이콘 pulse 애니메이션
- 소비 시 해당 토큰 아이콘에 `pc-token-pulse` CSS 클래스 적용 → 0.3초 후 제거
- @keyframes: scale(1) → scale(0.7) → scale(1)
- 토큰이 표시되는 곳: PCBottomDock 또는 PCRightPanel 상단

### 2-3. 조합 성공 이펙트
- src/components/discovery/CombinationLabPanel.tsx의 handleRun 성공 시
- 또는 src/components/pc/panels/PCRightPanel.tsx의 handleCombinationAttempt 성공 시
- 화면 중앙에 결과 카드 팝업 (기존 토스트 대신 또는 추가로)
- 조합된 2개 아이콘 → 화살표 → 결과 라벨 + 요약
- Web Audio로 짧은 성공음 재생 (soundEngine.ts에 playCombinationSuccess 추가)

### 2-4. DossierCard 해금 이펙트
- DossierCard(dc-*) 해금 시 금색 빛 이펙트
- "결정적 질문 해금" 텍스트 배너 (1.5초 표시 후 fade out)
- 위치: 화면 상단 중앙

### 2-5. 법정 지배력 사용 이펙트
- courtControl 소비 시 (분리심문/비공개보호/즉답요구)
- 화면 전체 살짝 어두워짐 (overlay opacity 0→0.3→0, 0.5초)
- Web Audio로 망치 소리 재생 (soundEngine.ts에 playCourtControl 추가)

## 수정 대상 파일
- src/components/pc/effects/TokenSpendEffect.tsx (개선)
- src/app/pc.css (애니메이션 추가)
- src/engine/soundEngine.ts (사운드 추가)
- src/components/pc/panels/PCRightPanel.tsx (조합 이펙트 호출)
- src/components/pc/layout/PCCourtLayout.tsx (법정 지배력 이펙트)

## 건드리면 안 되는 파일
- src/store/slices/* (슬라이스 구조 변경 금지)
- src/hooks/useActionDispatch.ts (Session A에서 완료)
- src/components/pc/minigame/* (Session C/D/E 관할)

## 검증
- npx tsc -b --force PASS
- npm run build PASS
- 완료 후 커밋 메시지: "feat: Session B — 토큰 소비 이펙트 5종"
