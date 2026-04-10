# CT → 스레드 B: 통합 피드백 (2026-04-09)

> 발신: CT
> 수신: 스레드 B (PC UI)
> 일시: 2026-04-09
> **이 문서가 이전의 모든 ct-to-threadB-*.md를 대체합니다.**

---

## 현재 상태 확인

### 반영 완료 (확인됨)
- Home depth 구조 (허브 → 일반/시즌/내정보/리더보드/기록/설정)
- 프로토타입 톤 (다크 글래스, 골드 액센트, 앰비언트)
- Case Briefing 비주얼 (얼굴 대치, 메타 카드)
- 핫바 직접 액션 (슬롯 실행, Phase별 탭 잠금, 리소스 부족 잠금)
- 증거 해금/잠금 UI (좌패널 잠금 수 표시, 호버 연동)
- DEV 필터 → CaseBrowser 내부
- 미터→쟁점→증거 순서
- localhost 로딩 문제 해결 (Tailwind 스캔 범위)
- 타입 체크 PASS, 빌드 PASS

### 확인 안 됨 / 미반영
- 최소 사이즈 1280×720 (하단 잘림 여전히 발생)
- 게임 플레이 진입 (사건 선택 후 Phase 전환 안 됨)

---

## 긴급 이슈 (이것부터 먼저)

### Blocker: 사건 선택 후 게임이 진행되지 않음

사건을 선택하고 Case Briefing까지는 진입하지만, **다음 Phase로 넘어가지 않습니다.**

확인 필요:
1. `PCCaseBriefing`에서 "재판 진행" 버튼의 `onClick` → `advancePhase(GamePhase.Phase1_InitialStatement)` 호출이 실제로 동작하는지
2. `useGameStore.getState().currentPhase`가 전환 후 바뀌는지
3. Phase 전환 시 Home depth state(`showCaseBrowser`, `activeView` 등)와 충돌하지 않는지
4. `getActionPanel(GamePhase.Phase1_InitialStatement)`이 정상 반환하는지 (null이면 Phase 1 대사 재생 안 됨)
5. 브라우저 콘솔 에러 전문

**가능성 높은 원인**: Home depth 구조 변경에서 `PCApp.tsx`의 Phase 라우팅 조건이 영향받았을 수 있습니다. `caseData`가 있고 `currentPhase`가 바뀌었는데도 여전히 Home 뷰를 보여주고 있다면, 라우팅 우선순위 문제입니다.

### 하단 잘림

모든 PC 화면의 최상위 컨테이너에 아래가 적용되어 있는지 **재확인**:

```css
body.pc-mode {
  overflow: auto;  /* hidden이면 안 됨 */
}

.app,
.pc-home,
.pc-lobby-shell,
.pc-brief-v2,
.pc-hub, .pc-depth-normal, .pc-depth-season, .pc-depth-profile,
/* 신규 추가된 모든 depth 컨테이너 */ {
  min-width: 1280px;
  min-height: 720px;
}
```

Home depth로 새로 추가된 화면(세션 목록, 내 정보 등)에도 `min-height`가 빠져있으면 잘립니다.

---

## 완료 후 남은 작업 (우선순위 순)

### 1. 시각 스모크 (Blocker 해결 후)

게임 플레이가 되면, 아래를 브라우저에서 직접 확인:
- Home 허브 → 일반 모드 → 세션 → 사건 리스트 → 게임 시작 **끊김 없이 연결**
- Home 허브 → 시즌 모드 → 사건 리스트 → 게임 시작
- Home → 내 정보 / 리더보드 / 판결 기록 / 설정 **각각 진입 + 뒤로가기**
- 1280×720 창 크기에서 **모든 화면 하단 안 잘림**

### 2. 엔진 데이터 연동 확인

이전에 전달한 `ct-to-threadB-engine-data-alignment.md` 항목들:

| 항목 | 확인 |
|------|------|
| 잠긴 증거 숨김/잠금 표시 | 반영됨 — 재확인 |
| 새 증거 해금 알림 | 미확인 — `presentEvidence()` 반환값 `newlyUnlocked` 감지 후 토스트/glow |
| LieState 전이 힌트 | 미확인 — "증거 제시 필요" 등 다음 조건 표시 |
| 증거 조합 발동 알림 | 미확인 — 조합 발동 시 연출 |
| 증거 제시/조사 시 store 함수 호출 | 핫바에서 호출 중 — 실제 동작 확인 필요 |

### 3. 시즌 모드 데이터

현재 시즌 모드에 할당할 사건 목록:
- 스레드 A가 Wave A 10건 생성 중 (workplace-new-02 완료, 나머지 9건 병렬 진행)
- 완료되면 시즌 모드에 매핑 필요
- 지금은 "준비 중" 표시로 충분

---

## 작업 순서

| 순서 | 항목 |
|------|------|
| **1** | **Blocker: 게임 플레이 진입 수정** |
| **2** | **하단 잘림 수정** |
| **3** | 시각 스모크 (전체 동선 확인) |
| **4** | 엔진 데이터 연동 (해금 알림, 전이 힌트, 조합 알림) |
| **5** | 시즌 모드 데이터 매핑 (Wave A 완료 후) |

1번이 해결되어야 나머지 전부 확인 가능합니다.
