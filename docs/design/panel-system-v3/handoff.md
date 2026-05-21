# Panel System v3 — 이관 컨텍스트

작성일: 2026-05-22
이관 시점 main HEAD: `63a15d20` (origin/main 동기화)

## 0. 한 줄 요약

PC 모달/패널 디자인 시스템을 **5단 width → 2단 (640/760)** + **헤더 1행 패턴 통일** + **panel-pin marker 시스템** + **evidence 발언대 버튼 게임 정확 복원**으로 재정립. mockup HTML 완성 (`tmp/panel-system-v1.html`), 코드 적용은 미진행.

## 1. 이관 자료

| 파일 | 역할 |
|---|---|
| `tmp/panel-system-v1.html` | v3.2 mockup — 브라우저로 열어 시각 확인 |
| `tmp/screenshot-panel-mockup.cjs` | playwright 캡처 스크립트 (gitignored) |
| `tmp/panel-mockup-screenshots/` | tier별 PNG 캡처 7장 |
| `docs/design/panel-system-v3/handoff.md` | 본 문서 |
| `src/app/pc.css` Track A 통일 블록 (line ~24326) | 적용 대상 — 헤더 layout |
| `src/components/pc/layout/PCInteractionPanel.tsx` | 적용 대상 — interaction card 구조 |
| `src/components/pc/hotbar/PCBottomDock.tsx` | 적용 대상 — question-choice header |
| `pc-prototype/index.html` line 1260·1268·1562 | i-eye / i-doc / i-witness SVG 정의 (mockup에서 그대로 추출) |

## 2. 사용자 합의 사항 (변경 금지 영역)

### 2.1 Width 2-tier
- **640px** — popup (alert, modal)
- **760px** — structural (dispute, witness, evidence, contrast)
- 이전 5단(600/640/760/880/960)을 2단으로 통합. evidence는 880→760, contrast는 960→760으로 좁아짐.

### 2.2 Typography 통일
모든 panel 공통:
- Subtitle/eyebrow: `11px / 800 / uppercase / 0.12em / rgba(232, 193, 114, 0.78)` gold
- Title: `18px / 850 / -0.01em / var(--pc-text)` warm white
- Body: `13px / 400 / 1.58 / var(--pc-text-dim)`
- Button: `13px / 700 / 1.45`
- Tag chip: `10.5px / 800 / 0.06em`

이전에 popup만 22px/14.5px이던 부분을 structural과 일치시킴. body 색상 `#9ea1a8` (blue-grey) → `var(--pc-text-dim)` (`#b5a888` warm beige). 사용자 보고: "푸른 계열 안 어울림".

### 2.3 헤더 1행 패턴 (모든 패널)
```css
.panel-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  min-height: 56px;
  padding: 16px 20px;
}
.panel-header__left  { grid-column: 1; justify-self: start; }
.panel-header__title { grid-column: 2; justify-self: center; }
.panel-header__right { grid-column: 3; justify-self: end; }
```

- LEFT: subtitle/eyebrow/tags
- CENTER: title (1fr/1fr 대칭으로 viewport 정중앙)
- RIGHT: close × 또는 빈 칸 (popup)

### 2.4 Panel-pin marker 시스템
패널 type별 마름모(45deg 회전) 핀 — **`.panel` 외부에 sibling**으로 배치하여 `overflow: hidden`에 영향 안 받음.

```css
.panel-wrap { position: relative; }
.panel-pin {
  position: absolute;
  top: -18px;
  left: 50%;
  width: 24px; height: 24px;
  transform: translateX(-50%) rotate(45deg);
  border-radius: 4px;
  border: 1px solid rgba(212, 162, 78, 0.55);
  background: linear-gradient(135deg, #1d1d25, #0f1118);
  z-index: 3;
}
.panel-pin > span,
.panel-pin > img,
.panel-pin > svg {
  display: block;
  transform: rotate(-45deg);  /* 내부 콘텐츠 정면 정렬 */
}

/* 패널 윗쪽 영역 확장 — pin 중앙이 패널 안쪽에 들어오게 */
.panel {
  margin-top: -12px;   /* 시각적 top edge 12px 위로 */
  padding-top: 12px;   /* content는 동일 절대 위치 유지 */
}
```

#### Pin 매핑 (패널 type 식별)
| Tier | Pin 내용 |
|---|---|
| Popup Alert (info) | `−` (minus glyph) |
| Popup Modal (state_change) | `+` (plus glyph) |
| Dispute Selector | `<img src="/icons/ornament/scale-balance.png">` 저울 PNG |
| Witness Summon | `<svg><use href="#i-witness"/></svg>` 핫바 증인 SVG |
| Evidence Detail | `<svg><use href="#i-doc"/></svg>` 증거 수첩 SVG |
| Contrast Modal | `<svg><use href="#i-eye"/></svg>` 재판관의 관찰 SVG |

### 2.5 Evidence 발언대 버튼 (screenshot 8 정확 복원)
```css
/* row */
.ev-present-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 14px 20px 18px; }
/* A button (LEFT 박지연): portrait left, text right */
.ev-present-btn.is-a {
  border-left: 3px solid rgba(91, 141, 239, 0.85);
  box-shadow: -3px 0 18px -2px rgba(91, 141, 239, 0.28);
}
/* B button (RIGHT 이준호): text left, portrait right — mirror via row-reverse */
.ev-present-btn.is-b {
  border-right: 3px solid rgba(224, 96, 96, 0.85);
  box-shadow: 3px 0 18px -2px rgba(224, 96, 96, 0.28);
  flex-direction: row-reverse;
}
.ev-present-btn.is-mismatch {
  opacity: 0.42; cursor: not-allowed;
  filter: grayscale(0.8); border-style: dashed;
}
```
- 단순 1행 텍스트: "박지연 (대상 아님)" / "이준호에게 제시"
- 36×36 원형 portrait (실제 게임은 PNG, mockup은 radial gradient silhouette)
- 실제 game 클래스: `pc-ev-detail__present-btn.is-a` / `.is-b` (이미 존재)

### 2.6 Evidence 헤더 — '증거' label + 컴팩트 tags
```html
<div class="panel-header__left">
  <div class="evidence-tag-group">
    <span class="evidence-tag-label">증거</span>
    <div class="evidence-tag-chips">
      <span class="panel-tag tag--compact">기록</span>
      <span class="panel-tag tag--compact">보통</span>
      <span class="panel-tag tag--compact">기관</span>
    </div>
  </div>
</div>
```
- `.evidence-tag-label` — 10.5px / 800 / uppercase / gold (subtitle 같은 톤)
- `.panel-tag.tag--compact` — `padding: 1px 7px; border-radius: 5px; line-height: 1.3` (세로 음영 minimal)
- 3 tags 간격 4px (compact 묶음)

### 2.7 주요 쟁점 inline + 조사 단계 좌측 정렬
```css
.ev-section--inline {
  display: grid;
  grid-template-columns: 1fr auto 1fr;  /* label LEFT · content TRUE center · spacer */
  align-items: baseline;
  gap: 12px;
  padding: 8px 20px;
}
.ev-section--inline .label { grid-column: 1; justify-self: start; margin-bottom: 0; }
.ev-section--inline .focus { grid-column: 2; padding: 0; }
```
- 주요 쟁점: label "주요 쟁점" 좌측, content "오피스텔 방문과 새벽 전화" 진짜 중앙
- 조사 단계: label도 좌측 정렬 (주요 쟁점과 같은 열 정합)

### 2.8 Witness — subtitle 완전 제거
"적절한 시점에 소환해야 핵심 증언을 들을 수 있습니다" 안내문 삭제. title "증인 소환"만 헤더에 노출. body의 witness card 정보로 충분.

### 2.9 Info-only modal에 [확인 Space]
- contrast modal처럼 액션 버튼 없이 정보만 노출하는 경우 dismiss row 추가
- popup feedback의 [확인 Space] 패턴을 structural에도 일관 적용
- contrast modal의 경우 `popup-dismiss-row { padding-top: 6px }` (기본 16px → 줄여서 dismiss 버튼 위로)

### 2.10 Close 버튼 rotate(45deg) 제거 (이미 commit 18cd5dee 적용 완료)
`pc-question-choice__close`의 legacy `transform: rotate(45deg)`로 × → + 변형되던 버그. Track A 통일 rule에 `transform: none !important` 명시.

## 3. 적용 우선순위 (작업 roadmap)

### Step 1 — pc.css Track A header 재작업
파일: `src/app/pc.css` (line ~24326 Track A 통일 블록)

```css
/* 헤더 layout 재정의 */
body.pc-mode .pc-interaction-card__header,
body.pc-mode .pc-question-choice__header,
body.pc-mode .pc-dialogue-popup__header-row {
  display: grid !important;
  grid-template-columns: 1fr auto 1fr !important;
  align-items: center !important;
  gap: 16px !important;
  min-height: 56px !important;
  padding: 16px 20px !important;
}
/* 자식 슬롯 — 새 BEM 클래스 추가 또는 기존 매핑 */
body.pc-mode .pc-interaction-card__header > .pc-interaction-card__header-left,
body.pc-mode .pc-question-choice__header > .pc-question-choice__header-left {
  grid-column: 1; justify-self: start;
}
body.pc-mode .pc-interaction-card__title,
body.pc-mode .pc-question-choice__title {
  grid-column: 2; justify-self: center;
  /* 18px/850/center 통일 — 기존 rule에 이미 18/850 있음 */
}
body.pc-mode .pc-interaction-card__close,
body.pc-mode .pc-question-choice__close {
  grid-column: 3; justify-self: end;
}

/* Width 2-tier */
body.pc-mode .pc-interaction-card,
body.pc-mode .pc-question-choice__panel {
  width: min(760px, calc(100vw - 48px)) !important;
  max-width: min(760px, calc(100vw - 48px)) !important;
}
/* evidence detail 변형 — 760으로 통합 (이전 880) */
body.pc-mode .pc-interaction-card:has(.pc-ev-detail) {
  width: min(760px, calc(100vw - 48px)) !important;
  max-width: min(760px, calc(100vw - 48px)) !important;
}
/* contrast 변형 — 760으로 통합 (이전 960) */
body.pc-mode .pc-interaction-card.pc-interaction-card--contrast {
  width: min(760px, calc(100vw - 48px)) !important;
  max-width: min(760px, calc(100vw - 48px)) !important;
}

/* 패널 윗쪽 확장 — pin 중앙 캡처 */
body.pc-mode .pc-interaction-card,
body.pc-mode .pc-question-choice__panel {
  margin-top: -12px !important;
  padding-top: 12px !important;
}
```

### Step 2 — panel-pin 시스템 도입
새 CSS 클래스 `.pc-panel-pin` 추가. PCInteractionPanel / PCBottomDock의 outer wrapper에서 `.pc-panel-pin`을 panel 외부 sibling으로 렌더링.

```css
body.pc-mode .pc-panel-pin {
  position: absolute;
  top: -18px; left: 50%;
  width: 24px; height: 24px;
  transform: translateX(-50%) rotate(45deg);
  border-radius: 4px;
  border: 1px solid rgba(212, 162, 78, 0.55);
  background: linear-gradient(135deg, #1d1d25, #0f1118);
  color: var(--pc-gold-light);
  z-index: 3;
  display: grid; place-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.55);
}
body.pc-mode .pc-panel-pin > span,
body.pc-mode .pc-panel-pin > img,
body.pc-mode .pc-panel-pin > svg {
  display: block;
  transform: rotate(-45deg);
}
body.pc-mode .pc-panel-pin > svg {
  width: 13px; height: 13px;
}
```

PCInteractionPanel의 outer `.pc-interaction-overlay` wrapper에 `position: relative` 추가, panel 외부에 `.pc-panel-pin` 렌더링.

### Step 3 — PCBottomDock question-choice
- subtitle "심문 방식" / "동기 탐색 방식" / "공감 접근 방식" 추가 (현재는 title만)
- 기존 icon (⚖ 등) → `.pc-panel-pin`으로 이동 (헤더 안쪽 icon 제거)
- 헤더 구조 1행 grid로

### Step 4 — PCInteractionPanel evidence 변형
- `EvidenceDetailSection` header 좌측에 `<span class="evidence-tag-label">증거</span>` 추가
- evidence meta tags를 `evidence-tag-chips` 그룹으로 감쌈
- `.panel-tag` 또는 새 `.evidence-tag` 클래스에 compact 스타일 적용
- "주요 쟁점" 섹션 → `display: grid; grid-template-columns: 1fr auto 1fr` 변경
- "조사 단계" label 좌측 정렬
- 발언대 버튼: `pc-ev-detail__present-btn.is-b`에 `flex-direction: row-reverse` 추가 (mirror layout)
- 패널 외부에 i-doc pin 추가

### Step 5 — Witness summon
- PCInteractionPanel witness 변형의 subtitle 안내문 제거
- 패널 외부에 i-witness pin 추가

### Step 6 — Contrast modal
- 액션 없는 contrast 변형에 자동 [확인 Space] dismiss row 추가
- `popup-dismiss-row` padding-top 줄임
- 패널 외부에 i-eye pin 추가

### Step 7 — EventFeedbackCard (popup alert/modal)
- typography 통일: title 22→18, body 14.5→13, eyebrow 13→11
- body color `#9ea1a8` → `var(--pc-text-dim)`
- 헤더 layout을 1행 grid로 (eyebrow LEFT, title CENTER, empty RIGHT)
- alert에 `−` pin, modal에 `+` pin 추가 (현재 diamond 위치 변경)

## 4. 검증

```bash
./node_modules/.bin/tsc -b --force      # PASS 유지
npm run qa:fast                          # static P0=0 / route P0=0
npm run qa:cutscene                      # P0=0
node scripts/detect-truth-leak.cjs --strict   # 0 유지
node scripts/verify-scripted-mapping.cjs      # PASS
```

## 5. 영구 학습 영역

본 라운드 완료 시 memory 갱신 후보:
- `design_panel_width_hierarchy.md` → v3 (2-tier 640/760으로 갱신)
- `design_panel_header_pattern.md` (신규) — 1fr/auto/1fr grid 패턴
- `design_panel_pin_system.md` (신규) — marker 시스템 + per-type icon 매핑
- `design_evidence_present_buttons.md` (신규) — is-a/is-b mirror layout

## 6. 이전 commit 기록 (본 mockup 작업 직전)

| commit | 내용 |
|---|---|
| `c87efe5a` | truth: witness condition → first-class breakthrough route |
| `de8350ab` | hotbar: drop auto-generated judge questions, use scripted only |
| `18cd5dee` | panel: unify width hierarchy + remove close-button rotation (v1 — 5-tier base) |
| `94c92274` | scripted: translationese v3 phase 3 — 8 templates, 366 variants |
| `63a15d20` | docs: translationese v3p3 multilang sync brief |

이관 시점에서 origin/main과 working tree 모두 clean.
