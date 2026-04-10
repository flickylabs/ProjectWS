# CT → 스레드 B: 플레이 진입 불가 + 하단 잘림 (긴급)

> 발신: CT
> 수신: 스레드 B (PC UI)
> 일시: 2026-04-09
> 중요도: **Blocker — 게임 플레이가 안 됨**

---

## 이슈 1: 사건 진입 후 다음으로 넘어가지 않음 (Blocker)

### 현상
- 사건 선택 → Case Briefing 진입까지는 됨
- Case Briefing에서 "재판 진행" 클릭 → **Phase 1로 넘어가지 않음**
- 또는 Phase 1 진입 후 대사가 진행되지 않음

### 확인 필요 사항

1. **Case Briefing → Phase 1 전환 버튼 동작 확인**
   - `PCApp.tsx`의 `PCCaseBriefing`에서 `advancePhase(GamePhase.Phase1_InitialStatement)` 호출이 정상인지
   - 버튼 `onClick`이 실제로 연결되어 있는지

2. **Phase 1 자동 재생 동작 확인**
   - Phase 1 진입 시 `AutoDialoguePhase`가 마운트되는지
   - `getActionPanel(GamePhase.Phase1_InitialStatement)`이 null을 반환하고 있지는 않은지
   - Phase 1 스크립트 로드 실패 → fallback도 실패하는 경우인지

3. **콘솔 에러 확인**
   - 브라우저 콘솔에서 Phase 전환 시점의 에러/경고를 전부 캡처

4. **store 상태 확인**
   - `useGameStore.getState().currentPhase`가 전환 후 실제로 바뀌는지
   - `useGameStore.getState().caseData`가 null이 아닌지

### 가능성 높은 원인

최근 Home depth 구조 변경에서 **PCApp.tsx의 Phase 라우팅**이 영향받았을 수 있습니다. 특히:
- `PCCaseBriefing`이 `caseData`를 정상 참조하는지
- Phase 전환 시 Home depth state와 충돌하지 않는지
- `advancePhase` 호출이 Home 뷰 state를 리셋하는지

---

## 이슈 2: 하단 잘림 여전히 발생

### 현상
- 특정 화면(사건 리스트, 메인 플레이)에서 하단이 잘려서 안 보임

### 확인 필요

모든 PC 화면의 최상위 컨테이너에 아래가 적용되어 있는지 재확인:

```css
body.pc-mode {
  overflow: auto;    /* hidden이면 안 됨 */
}

/* 모든 최상위 컨테이너 */
.app,
.pc-home,
.pc-lobby-shell,
.pc-brief-v2,
/* 기타 PC 전체화면 컨테이너 */ {
  min-width: 1280px;
  min-height: 720px;
}
```

특히 **새로 추가된 depth 화면들**(일반 모드 세션 목록, 사건 리스트, 내 정보 등)에도 `min-height`가 적용되어 있는지 확인.

---

## 우선순위

| 순서 | 이슈 | 이유 |
|------|------|------|
| **1** | **플레이 진입 불가** | 게임이 안 됨 — 다른 모든 작업보다 우선 |
| **2** | 하단 잘림 | 사용성 문제 |

**이슈 1을 먼저 해결해 주세요.** 콘솔 에러와 함께 원인/수정 내용을 보고해 주세요.
