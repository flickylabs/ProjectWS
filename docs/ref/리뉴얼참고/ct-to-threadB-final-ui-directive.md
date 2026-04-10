# CT → 스레드 B: PC UI 최종 지시

> 발신: CT
> 수신: 스레드 B (PC UI)
> 일시: 2026-04-09
> 중요도: **최우선 — 현재 PC UI가 사용 불가능한 상태**

---

## 현재 상태 판정: 불합격

스크린샷 기준, PC Home 화면이 **텍스트만 나열된 상태**입니다. 프로토타입(`pc-prototype/index.html`)의 디자인이 전혀 반영되지 않았습니다.

구체적 문제:
- 프로토타입의 CSS 스타일(dark theme, gold accent, 패널, 카드, 간격)이 Home 화면에 적용되지 않음
- SVG 아이콘이 텍스트로 대체되어 있음
- 카테고리 선택이 줄글 형태
- "모바일 동선만 참고하고, PC에서는 별도의 사건 목록 화면으로 이어집니다" 같은 **개발 문구가 UI에 노출**
- DEV TEST가 별도 섹션으로 남아있음 (필터 방식으로 변경 지시했으나 미반영)
- 헤더/본문/하단 구분이 없이 흘러감

## 요구 사항

**`pc-prototype/index.html`을 브라우저에서 열어보세요.** 그것이 목표 디자인입니다.

### 1. 프로토타입 CSS/SVG가 모든 PC 화면에 적용되어야 함

프로토타입의 CSS(`PCPrototypeStyle`)와 SVG(`PCSvgDefs`)가 이미 `pc-main.tsx`에서 로드되고 있을 것입니다. **Home 화면에서도 이 스타일이 적용**되어야 합니다.

Home 화면이 프로토타입의 `.app` 클래스 바깥에서 렌더링되고 있다면, Home 전용 CSS를 프로토타입 디자인 언어(색상 토큰, 폰트, 간격)에 맞춰 작성해야 합니다.

### 2. 개발 문구 전부 제거

UI에 다음과 같은 문구가 있으면 전부 제거:
- "모바일 동선만 참고하고~"
- "PC에서는 별도의 사건 목록 화면으로 이어집니다"
- "준비 중인 PC 전용~"
- "PC 전용 화면으로 정리할 예정입니다"
- 기타 개발자에게 보여주는 안내성 문구

**플레이어가 보는 화면에 개발 용어가 있으면 안 됩니다.**

### 3. DEV TEST → 필터 방식

`ct-to-threadB-devtest-correction.md`에 지시한 대로:
- 별도 DEV TEST 섹션 제거
- PCCaseBrowser 내에 `[DEV: 완성 케이스만]` 토글 필터 추가
- 게임 플레이는 동일한 UI/경로

### 4. 최소 사이즈 대응

`min-width: 1280px`, `min-height: 720px`, `overflow: auto` — 모든 PC 화면에 공통 적용.

### 5. 이전 피드백 문서 전체 목록

아래 문서들의 지시 사항이 현재 PC UI에 반영되어야 합니다:

| 문서 | 핵심 지시 |
|------|----------|
| `ct-to-threadB-current-status-and-tasks.md` | 증거 해금/잠금 UI, Phase별 액션 제한, store 함수 호출 확인 |
| `ct-to-threadB-engine-data-alignment.md` | 엔진 데이터 연동 (해금 알림, LieState 힌트, 조합 발동) |
| `ct-to-threadB-devtest-correction.md` | DEV TEST → 필터 방식 |
| `ct-to-threadB-intro-and-layout-feedback.md` | Home 메뉴 위상 정리, 메시지 모바일 통일, 모바일 컴포넌트 import 금지 |

---

## 현재 가장 중요한 것

**디자인입니다.** 기능 연결이나 세부 인터랙션 이전에, 화면을 열었을 때 **프로토타입과 비슷한 수준의 비주얼**이 나와야 합니다.

프로토타입의 색상 토큰:
```css
--gold: #d4a24e;   --gold-l: #e8c172;  --gold-d: #8b6914;
--bg: #07070c;     --p1: #0c0c14;      --p2: #111119;
--p3: #18181f;     --p4: #1f1f28;      --p5: #282832;
--t1: #dcdce0;     --t2: #8b8b9a;      --t3: #4e4e5c;
--blue: #5b8def;   --red: #e06060;     --green: #5cc97a;
```

이 토큰을 Home/CaseBrowser/CaseBriefing 등 모든 PC 화면에 일관되게 적용해 주세요.
