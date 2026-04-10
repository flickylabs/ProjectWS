# CT → 스레드 B: Home/Intro 전면 재작업 + 메인 레이아웃 피드백

> 발신: CT
> 수신: 스레드 B (PC UI)
> 일시: 2026-04-08
> 중요도: Critical — 이전 피드백 전부 대체

---

## 핵심 원칙 (반드시 지킬 것)

### 1. 모바일 컴포넌트를 PC에 import하지 마라

모바일 컴포넌트(`SessionSelect`, `CaseMap`, `HistoryPanel`, `IntroSlides` 등)를 PC에서 직접 가져다 쓰면 **모바일 UI가 PC 화면에 그대로 뜬다**. 이러면 PC 전용 UI를 만든 의미가 없다.

**금지:**
```typescript
// ❌ 절대 이렇게 하지 말 것
import SessionSelect from '../components/phase/SessionSelect'
import CaseMap from '../components/phase/CaseMap'
import IntroSlides from '../components/layout/IntroSlides'
```

**해야 할 것:**
```
src/components/pc/ 아래에 PC 전용 화면을 만든다.
모바일의 '메뉴 구조와 동선'만 참고하고, UI는 PC 디자인 언어로 새로 짠다.
```

### 2. 모바일에서 참고하는 것은 "위상(계층/동선)"뿐이다

모바일 Home의 메뉴 계층:
```
Home
├── 사건 시작 → SessionSelect(세션 유형 선택) → CaseMap(사건 선택) → 게임
├── 리더보드
├── 내 기록
├── 프로필
├── 설정
├── 공지 / 우편함
└── 리소스 (조사토큰/스킬)
```

이 **동선과 메뉴 항목이 PC에도 존재해야 한다**는 것이 요구 사항이다.
하지만 각 화면의 UI는 PC 프로토타입의 디자인 언어(dark theme, gold accent, SVG 아이콘, 3컬럼 등)로 새로 만든다.

### 3. Intro/Home의 메시지는 모바일과 동일하게

게임 내 텍스트(태그라인, 온보딩 문구 등)는 모바일과 통일한다. **레이아웃이 아니라 문구만.**

모바일 정본 (`src/components/layout/IntroSlides.tsx:6~28`, `src/app/App.tsx:354~358`):
- 타이틀: **"솔로몬"**
- 태그라인: **"현대판 솔로몬이 되어 판결을 내려보세요!"**
- 부제: **"사회·경험 기반 모의 재판 게임"**
- 온보딩 슬라이드:
  1. "현대판 솔로몬이 되어 판결을 내려보세요!"
  2. "사람들 사이의 갈등 — 누가 옳고 누가 그른지, 답은 단순하지 않습니다."
  3. "심문하고, 증거를 들이밀고, 숨겨진 진실을 밝혀내세요."
  4. "당신의 첫 번째 사건이 기다리고 있습니다."

이 문구를 PC 전용 온보딩/홈에서 **PC 레이아웃으로** 표현한다.

---

## 현재 문제 (전부 수정 필요)

### 문제 1: Home에서 Stage 1이 바로 보인다

Home 화면이 곧바로 게임 시작 화면처럼 보인다. Home은 **로비**여야 한다. 사건 선택, 내 기록, 리더보드 등 여러 메뉴 중 하나를 골라 들어가는 곳이다.

### 문제 2: "사건 시작" 누르면 모바일 UI로 넘어간다

모바일 `SessionSelect`를 import해서 쓰면 모바일 레이아웃이 그대로 뜬다. PC 전용 세션 선택 화면이 필요하다.

### 문제 3: FeatureCard/summary/READY DESK 등 개발 용어가 게임 UI에 있다

플레이어는 "심문 중심 진행", "증거 대면 복구", "READY DESK" 같은 개발 용어에 관심 없다.

---

## PC Home 재설계

### 화면 구성

```
┌──────────────────────────────────────────────────────────────┐
│ [👑 이름 · 명성]  [🔍12 ⚡3]           [🎵] [📢] [📨] [⚙️] │ ← 헤더
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                        ⚖️                                    │
│                      솔로몬                                   │
│            현대판 솔로몬이 되어 판결을 내려보세요!               │
│            사회·경험 기반 모의 재판 게임                        │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐   │
│   │                                                      │   │
│   │   ⚖️ 사건 시작                                       │   │
│   │   세션 유형을 선택하고 사건에 도전하세요                 │   │
│   │                                                      │   │
│   │   [무작위] [부부] [가족] [직장] [이웃]                  │   │
│   │   [동업] [세입자] [헤드라인]                            │   │
│   │                                                      │   │
│   └──────────────────────────────────────────────────────┘   │
│                                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│   │ 🏆       │  │ 📊       │  │ 🏛️       │  │ 📋       │   │
│   │ 리더보드  │  │ 내 기록   │  │ 재판관    │  │ 캠페인   │   │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  시즌 2 · 23일 남음                        ● AI 연결됨       │ ← 하단
└──────────────────────────────────────────────────────────────┘
```

### 동선 상세

#### "사건 시작" 영역

카테고리 버튼을 클릭하면 **PC 전용 사건 선택 화면**으로 전환된다 (모바일 CaseMap이 아님).

```
Home → [부부 클릭] → PC 전용 사건 목록 화면
                      ├── 사건 카드들 (이름 vs 이름, 난이도, 쟁점 수)
                      ├── 사건 클릭 → 게임 시작
                      └── 뒤로가기 → Home
```

PC 사건 목록은 `getAllCases()`를 가져와서 PC 디자인 언어(dark card, gold accent, SVG 아이콘)로 렌더링한다. 모바일 `CaseMap` 컴포넌트를 쓰지 않는다.

#### 하단 메뉴 카드들

각각 클릭 시 **PC 전용 화면**으로 전환된다:
- 리더보드 → PC 전용 리더보드 (데이터는 동일한 store/API 사용)
- 내 기록 → PC 전용 히스토리 (localStorage의 `solomon-history` 사용)
- 재판관 → PC 전용 재판관 프로필 (localStorage의 `solomon-judge-drift` 사용)
- 캠페인 → PC 전용 캠페인 맵 (`src/data/campaign.ts` 사용)

**초기에는 이 화면들의 상세 구현보다 Home의 메뉴 배치와 동선이 우선이다.** 리더보드/내기록/재판관/캠페인 카드를 클릭하면 일단 "준비 중" placeholder를 보여주고, 사건 시작 동선만 먼저 완성하면 된다.

#### 헤더 아이콘들

- 프로필: 클릭 → PC 전용 프로필 화면 (또는 드로어)
- 리소스: 표시만 (충전 팝업은 후순위)
- BGM/공지/우편함/설정: 클릭 → PC 전용 패널/모달 (초기에는 placeholder)

### 온보딩 (첫 방문)

`hasSeenIntro()` 체크 → false면 PC 전용 온보딩 표시.
모바일 `IntroSlides` 컴포넌트를 쓰지 말고, PC 화면 크기에 맞는 온보딩을 만든다.
문구는 모바일과 동일 (위의 4개 슬라이드).

---

## 메인 게임 화면 (PCCourtLayout) 의견

메인 레이아웃은 현재 구조가 대체로 맞다. 미세 조정만:

### 좌패널 (400px) — "사건 대시보드"
- **순서 변경**: 미터 → 쟁점 → 증거 (미터가 "지금 상황" 즉시 파악에 더 중요)
- **재판관 성향 섹션 제거** → Home의 재판관 카드로 이동 (게임 중에는 불필요)

### 중앙 — "법정"
- Phase 1/2 자동 재생 시 **"클릭하여 다음 진술" 또는 "Space로 다음"** 힌트를 하단에 표시
- watermark(300px 저울) — opacity를 0.01로 더 낮추거나 크기를 줄이는 것 고려

### 우패널 (380px) — "수사 노트"
- **비교 트레이를 오버레이로 분리** — 우패널이 좁으므로, 비교 모드 진입 시 중앙 영역 위에 오버레이
- **타임라인은 기본 접힌 상태** — 노트가 더 중요하므로 공간 확보

### 핫바
- Phase 3~5 직접 실행 구조 — 현재 구현 승인

---

---

## Part 5: 창 크기 대응 — 최소 사이즈 + 스크롤 (Critical)

### 현재 문제

프로토타입 CSS에서 `.app { height: 100vh }`만 지정되어 있고, `min-height`/`min-width`가 없다. 창 모드에서 브라우저를 줄이면 **하단 핫바가 잘려서 보이지 않는다.** `overflow: hidden`이라 스크롤도 안 됨.

### 해결

`pc.css`에 다음을 추가:

```css
/* PC 앱 최소 크기 — 이 이하로 줄이면 스크롤 허용 */
body.pc-mode .app {
  min-width: 1280px;
  min-height: 720px;
}

/* body에서 overflow: hidden 제거 → 최소 크기 이하일 때 스크롤 */
body.pc-mode {
  overflow: auto;  /* hidden → auto */
}
```

기준:
- **최소 해상도: 1280×720** (Steam 최소 권장)
- 1280×720 이상이면 `100vh` 꽉 채움 (현재와 동일)
- 그 이하로 줄이면 스크롤이 생겨서 잘리지 않음

### Home 화면도 동일

`pc-landing`, `pc-briefing` 등도 `min-height: 100vh` 대신:

```css
body.pc-mode .pc-landing {
  min-height: max(100vh, 720px);
}
body.pc-mode .pc-briefing {
  min-height: max(100vh, 720px);
}
```

### 패널 비율 고정

좌패널(400px)과 우패널(380px)은 고정이므로 중앙만 유동인데, 중앙이 너무 좁아지면 말풍선이 깨진다. 중앙 최소 폭을 지정:

```css
body.pc-mode .center {
  min-width: 500px;
}
```

따라서 좌(400) + 중앙(500) + 우(380) = **최소 1280px**.

---

## 작업 순서

| 순서 | 항목 | 설명 |
|------|------|------|
| 1 | **창 크기 대응** | `min-width: 1280px`, `min-height: 720px`, `overflow: auto`. 이거 먼저 해야 작업 중 확인이 가능 |
| 2 | **Home 전면 재작업** | FeatureCard/summary/READY DESK 전부 제거. 위 레이아웃대로 재구성. 모바일 컴포넌트 import 금지 |
| 3 | **PC 전용 사건 선택 화면** | 카테고리 선택 후 사건 카드 목록. `getAllCases()` + PC 디자인 |
| 4 | **PC 전용 온보딩** | 첫 방문 시 4슬라이드 (문구는 모바일 동일, UI는 PC 전용) |
| 5 | **하단 메뉴 placeholder** | 리더보드/내기록/재판관/캠페인 → "준비 중" 카드 |
| 6 | 좌패널 순서 변경 | 미터→쟁점→증거 |
| 7 | 비교 트레이 오버레이 분리 | 우패널에서 빼기 |

1번부터 시작. 2~4를 한 묶음으로 진행해 주세요.

---

## Part 6: 게임 로직 연결 문제 (Critical)

현재 PC 버전에서 게임 플레이 시 여러 상태가 제대로 작동하지 않고 있다.

### 문제 1: 모든 화면에서 비율이 넘어간다 (Critical — 최우선)

사건 선택 화면뿐만 아니라 **Home, Case Briefing, 메인 게임, 결과 화면 등 PC 앱 전체**에서 창을 줄이면 하단이 잘린다. Part 5의 최소 사이즈(1280×720) + `overflow: auto` 대응이 **PC 앱의 모든 화면에 공통 적용**되어야 한다.

적용 대상 (빠짐없이):
- `body.pc-mode` — 전역 `overflow: auto`
- `.app` (메인 게임) — `min-width: 1280px; min-height: 720px`
- `.pc-landing` (Home) — `min-height: max(100vh, 720px)`
- `.pc-briefing` (Case Briefing) — `min-height: max(100vh, 720px)`
- 사건 선택 화면 — `min-height: max(100vh, 720px)` + 내부 카드 영역 스크롤
- Result 화면 — `min-height: max(100vh, 720px)`
- Phase 6/7 전체화면 — `min-height: max(100vh, 720px)`

**원칙**: PC 앱 내 모든 최상위 컨테이너에 `min-width: 1280px; min-height: 720px`을 공통 적용. 이보다 작아지면 스크롤, 이보다 크면 꽉 채움.

### 문제 2: 모든 증거/노트가 처음부터 전부 해금 상태로 보인다

**원인 분석 완료.** 이건 PC UI 문제가 아니라 **데이터 문제**다.

headline-01의 증거 6개 중 5개가 `requires: []`로 되어 있어서, `createInitialEvidenceStates()`에서 초기 `unlocked: true`가 된다. 이건 엔진의 정상 동작이다.

```
e-1: requires: []  → 초기 해금 ✓
e-2: requires: []  → 초기 해금 ✓
e-3: requires: []  → 초기 해금 ✓
e-4: requires: []  → 초기 해금 ✓
e-5: requires: []  → 초기 해금 ✓
e-6: requires: ["e-1","e-5"]  → 잠금 (조건부 해금)
```

그러나 **게임 디자인상 처음부터 5개가 다 보이면 탐색의 재미가 없다.**
이건 스레드 A(스크립트)에 데이터 수정을 요청할 사항이다 — **PC UI에서 추가 필터링을 하지 말 것.** 엔진 로직(`requires` 기반)이 정답이고, 데이터 쪽에서 `requires`를 제대로 설정해야 한다.

**스레드 B는 현재 엔진 로직을 그대로 따르면 된다:**
- `unlocked: true`인 증거만 표시
- `surfacedIds` / `dimmedIds` 구분 그대로 사용
- 증거 해금 조건은 데이터와 엔진이 결정. UI에서 임의로 숨기지 말 것

### 문제 3: 사용할 수 있는 액션들이 Phase/상황에 맞게 제한되지 않는다

PC 핫바에서 Phase 3~5 액션이 구분 없이 다 활성화되고 있다면, `currentPhase`와 `resources`를 체크해서 제한해야 한다.

**엔진에 이미 있는 제한 로직들:**
- `computeEffectiveness()` — 질문 유형별 효과성 (strong/normal/weak)
- `resources.investigationTokens` — 조사 토큰 부족 시 증거 조사 불가
- `resources.skillPoints` — 스킬 포인트 부족 시 특수 행동 불가
- Phase 구분: Phase 3=심문, Phase 4=증거, Phase 5=재심문

핫바 슬롯에서 실행 전에 체크해야 하는 것:
```typescript
// 질문 실행 전
if (resources.investigationTokens < 1) → 비활성 + "토큰 부족" 표시
if (fatigue.isStalemate) → 경고 표시

// 증거 제시 전
if (!evidenceStates[id]?.unlocked) → 비활성
if (evidenceStates[id]?.presented && presentedTo.includes(targetParty)) → "이미 제시됨" 표시

// 특수 행동 전
if (resources.skillPoints < 1) → 비활성
```

### 문제 4: 증거가 연결되지 않는다

증거 제시/조사 시 실제 엔진 함수가 호출되는지 확인 필요:

```typescript
// 증거 제시 → store.presentEvidence(evidenceId, targetParty)
// 증거 조사 → store.investigateEvidence(evidenceId, subAction)
// 증거 뷰어 열기 → store.setPendingEvidenceView(evidenceId)
```

핫바에서 증거 슬롯 실행 시 이 store 함수들을 호출하고 있는지 확인할 것. 호출하지 않으면 게임 상태가 변하지 않아 "증거가 연결 안 됨"처럼 보인다.

### 요약: 스레드 B가 해야 할 것 vs CT/스레드 A가 할 것

| 항목 | 누가 |
|------|------|
| 사건 선택 화면 비율 수정 | 스레드 B |
| 증거 `requires` 데이터 보강 | CT → 스레드 A에 요청 |
| Phase별 액션 제한 UI 반영 | 스레드 B |
| 리소스 부족 시 비활성 표시 | 스레드 B |
| 증거 제시/조사 시 store 함수 호출 확인 | 스레드 B |
