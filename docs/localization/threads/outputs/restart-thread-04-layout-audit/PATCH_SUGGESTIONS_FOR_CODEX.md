# PATCH_SUGGESTIONS_FOR_CODEX — Restart Thread-04 Layout Audit

Audit-only proposal pass. **Do not modify production files until PROJECT_CONTROL_TOWER explicitly requests integration.** All paths below are reference targets, not direct edits.

The new locked brand titles (KO `솔로몬의 딜레마: 진실의 재판`, EN `Verdict Zero: Trial of Truth`, JA `ソロモンのジレンマ：真実の裁き`, zh-CN `真相裁决：零点审判`) are already present in `commonMessages` — patches below assume those values stay locked.

Apply in the listed order. Earlier patches reduce surface for later ones.

---

## P0-1. Locale-aware text-wrap base

File: [`src/app/pc.css`](../../../../src/app/pc.css) — insert near the top, after the existing `:root` / `body.pc-mode` block (before line ~60).

```css
/* === i18n base — keep CJK-friendly default, override per locale === */
body.pc-mode {
  word-break: keep-all;
  overflow-wrap: anywhere;
}
html[lang^="en"] body.pc-mode {
  word-break: normal;
  overflow-wrap: break-word;
  hyphens: auto;
}
html[lang^="ja"] body.pc-mode,
html[lang^="zh"] body.pc-mode {
  letter-spacing: 0;
}
html[lang^="ja"] body.pc-mode { line-break: strict; }
```

Single block fixes the EN long-word overflow majority without rewriting the existing 80+ `word-break: keep-all` rules.

---

## P0-2. Scope uppercase / wide tracking eyebrow rule to EN only

File: [`src/app/pc.css`](../../../../src/app/pc.css) at the existing rule on lines ~4565-4574.

Current:

```css
body.pc-mode .pc-intro__brand-copy,
body.pc-mode .pc-home-v2__eyebrow,
body.pc-mode .pc-depth-header__copy > span,
body.pc-mode .pc-panel-card-v2__eyebrow,
body.pc-mode .pc-mode-card__badge,
body.pc-mode .pc-stage-preview-v2__eyebrow {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
```

Replace with:

```css
body.pc-mode .pc-intro__brand-copy,
body.pc-mode .pc-home-v2__eyebrow,
body.pc-mode .pc-depth-header__copy > span,
body.pc-mode .pc-panel-card-v2__eyebrow,
body.pc-mode .pc-mode-card__badge,
body.pc-mode .pc-stage-preview-v2__eyebrow {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: none;
}
html[lang^="en"] body.pc-mode .pc-intro__brand-copy,
html[lang^="en"] body.pc-mode .pc-home-v2__eyebrow,
html[lang^="en"] body.pc-mode .pc-depth-header__copy > span,
html[lang^="en"] body.pc-mode .pc-panel-card-v2__eyebrow,
html[lang^="en"] body.pc-mode .pc-mode-card__badge,
html[lang^="en"] body.pc-mode .pc-stage-preview-v2__eyebrow {
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
```

The same approach for `.pc-splash__sub` (line ~4389):

```css
body.pc-mode .pc-splash__sub { letter-spacing: 0.04em; }
html[lang^="en"] body.pc-mode .pc-splash__sub { letter-spacing: 0.16em; }
```

Inline English literal eyebrows (`RESULT DOSSIER`, `VERDICT STUDIO`, `GENERAL MODE`, `JUDGE PROFILE`, `JUDGE AXES`, `PLAY HISTORY`, `JUDGE DESK`, `DISPLAY`, `AUDIO`, `GAMEPLAY`, `LIVE`, `SETTINGS`, `SCOREBOARD`, `HALL OF FAME`) stay as-is — they are intentional brand constants and only render uppercase under the EN-scoped rule above.

---

## P0-3. Hero h1 controlled wrap

File: [`src/app/pc.css`](../../../../src/app/pc.css) at the existing `.pc-home-v2__hero h1` rule on lines ~4719-4728.

Replace `white-space: nowrap;` with:

```css
body.pc-mode .pc-home-v2__hero h1 {
  margin: 0;
  font-size: clamp(44px, 4.6vw, 64px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--pc-text);
  text-shadow: 0 2px 18px rgba(212, 162, 78, 0.18);
  /* CHANGED */
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;
  max-width: min(1100px, calc(100% - 200px));
  text-align: center;
}
html[lang^="en"] body.pc-mode .pc-home-v2__hero h1 {
  letter-spacing: -0.02em;
}
```

EN `Verdict Zero: Trial of Truth` (28 chars) now wraps to 2 lines on Steam Deck if needed.

---

## P0-4. Settings sidebar — translate labels + clamp layout

File: [`src/components/pc/settings/PCSettingsPanel.tsx`](../../../../src/components/pc/settings/PCSettingsPanel.tsx) lines 38-53. Move `CATEGORIES` into the function body so `t()` is in scope, or build the array via a helper that takes `t`.

```tsx
const CATEGORIES = [
  { id: 'display',       labelKey: 'settings.category.display',       iconId: 'i-eye',     status: 'ready' },
  { id: 'audio',         labelKey: 'settings.category.audio',         iconId: 'i-bolt',    status: 'ready' },
  { id: 'gameplay',      labelKey: 'settings.category.gameplay',      iconId: 'i-gavel',   status: 'ready' },
  { id: 'data',          labelKey: 'settings.category.data',          iconId: 'i-doc',     status: 'ready' },
  { id: 'language',      labelKey: 'settings.category.language',      iconId: 'i-chat',    status: 'ready' },
  { id: 'accessibility', labelKey: 'settings.category.accessibility', iconId: 'i-heart',   status: 'preview' },
  { id: 'controls',      labelKey: 'settings.category.controls',      iconId: 'i-hand',    status: 'preview' },
  { id: 'account',       labelKey: 'settings.category.account',       iconId: 'i-person',  status: 'preview' },
  { id: 'about',         labelKey: 'settings.category.about',         iconId: 'i-bulb',    status: 'ready' },
] as const
// inside the JSX: <span>{t(cat.labelKey)}</span>  …  <span>{t('settings.category.preview')}</span>
```

Add to [`src/i18n/messages/settings.ts`](../../../../src/i18n/messages/settings.ts):

```ts
"settings.category.display"
"settings.category.audio"
"settings.category.gameplay"
"settings.category.data"
"settings.category.language"
"settings.category.accessibility"
"settings.category.controls"
"settings.category.account"
"settings.category.about"
"settings.category.preview"     // '준비 중' / 'Coming Soon' / '近日公開' / '即将推出'
```

CSS layout guard at [`pc.css`](../../../../src/app/pc.css) line ~20896:

```css
body.pc-mode .pc-settings-sidebar__item { min-width: 0; }
body.pc-mode .pc-settings-sidebar__label {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

Also localize `aria-label="설정"`, `aria-label="닫기 (Esc)"`, `title="닫기 (Esc)"` via `settings.title` / `settings.close.aria`.

---

## P0-5. Settings → About — translate version/credits/license literals

File: [`src/components/pc/settings/PCSettingsPanel.tsx`](../../../../src/components/pc/settings/PCSettingsPanel.tsx) lines 501-538.

Add to [`settings.ts`](../../../../src/i18n/messages/settings.ts):

```ts
"settings.about.title"            // '정보' / 'About' / '情報' / '关于'
"settings.about.description"      // '버전 · 크레딧 · 라이선스' / 'Version · Credits · License' …
"settings.about.versionGroup"     // '버전' / 'Version' / 'バージョン' / '版本'
"settings.about.versionBuildLabel"  // '빌드' / 'Build' …
"settings.about.versionBuildValue"  // 'v0.x — 개발 중 (PC 베타)' …
"settings.about.engineLabel"      // '엔진' / 'Engine' …
"settings.about.engineValue"      // 'React 19 · TypeScript 5.9 · Vite 8' (locale-neutral; keep)
"settings.about.creditsGroup"     // '크레딧' / 'Credits' / 'クレジット' / '制作'
"settings.about.licenseGroup"     // '라이선스' / 'License' / 'ライセンス' / '许可证'
"settings.about.licensePlaceholder"  // '오픈소스 라이브러리 · 폰트 · 에셋 정보 (개발 중)' …
```

Replace the literals; no layout change required.

Also localize the three `<PreviewSection>` usages (lines 115-117) by passing keys instead of inline ko.

---

## P0-6. Verdict screen — translate STEPS + footer

File: [`src/components/pc/verdict/PCVerdictScreen.tsx`](../../../../src/components/pc/verdict/PCVerdictScreen.tsx).

Add a verdict messages namespace (extend [`verdict.ts`](../../../../src/i18n/messages/verdict.ts)):

```ts
"verdict.shell.eyebrow"         // 'VERDICT STUDIO' for en, '판결 작업실' for ko etc — or keep as English brand and skip
"verdict.shell.title"           // '최종 판결' / 'Final Verdict' / '最終判決' / '最终判决'
"verdict.shell.meta.disputes"   // '쟁점' / 'Disputes' / '争点' / '争议点'
"verdict.shell.meta.solutions"  // '해결책' / 'Solutions' / '解決策' / '解决方案'
"verdict.shell.meta.turns"      // '턴' / 'Turns' / 'ターン' / '回合'

"verdict.step.fact"            // ko '01 쟁점 판단' / en 'Disputes' / ja '争点判断' / zh '争点判断'
"verdict.step.responsibility"  // ko '02 안건 책임' / en 'Responsibility' …
"verdict.step.solution"        // ko '03 해결안' / en 'Solution'
"verdict.step.confirm"         // ko '04 판결문' / en 'Verdict'

"verdict.footer.prev"           // '이전 단계' / 'Previous'
"verdict.footer.next"           // '다음 단계' / 'Next'
"verdict.footer.confirm"        // '판결 확정' / 'Confirm verdict' / '判決確定' / '确定判决'
"verdict.footer.recording"      // '판결 기록 중...' / 'Recording…' / '判決記録中…' / '正在记录…'
"verdict.footer.judgeAllFirst"  // '모든 쟁점을 먼저 판단하세요 ({done}/{total})' …
```

Replace `STEPS` array and footer literals with `t('verdict.step.fact')` etc.

CSS guard at [`pc.css`](../../../../src/app/pc.css) lines ~1190-1250 (`.pc-verdict-step-link` / `.pc-verdict-rail__chip`):

```css
body.pc-mode .pc-verdict-step-link,
body.pc-mode .pc-verdict-rail__chip {
  min-width: 0;
  overflow-wrap: break-word;
}
```

Footer button growth — primary button in EN can hit 30+ chars; let it grow:

```css
body.pc-mode .pc-verdict-footer { gap: 12px; flex-wrap: wrap; }
body.pc-mode .pc-verdict-footer__button { flex: 1 1 auto; max-width: min(360px, 100%); }
```

---

## P0-7. Hotbar — translate slots, special actions, advance banner, overlay

File: [`src/components/pc/hotbar/PCBottomDock.tsx`](../../../../src/components/pc/hotbar/PCBottomDock.tsx).

Add a `hotbar` namespace (new file `src/i18n/messages/hotbar.ts` and register in `index.ts`):

```ts
"hotbar.slot.factPursuit"        // '사실 추궁' / 'Facts' / '事実追及' / '事实追问'
"hotbar.slot.motiveSearch"       // '동기 탐색' / 'Motive' / '動機探索' / '动机探查'
"hotbar.slot.empathyApproach"    // '공감 접근' / 'Empathy' / '共感' / '共情'
"hotbar.slot.freeQuestion"       // '자유 질문' / 'Free Q' / '自由質問' / '自由提问'
"hotbar.slot.evidencePresent"    // '증거 제시' / 'Evidence' / '証拠提示' / '提交证据'
"hotbar.slot.witnessSummon"      // '증인 소환' / 'Witness' / '証人召喚' / '传唤证人'
"hotbar.special.separation"      // '분리 심문' / 'Separate' / '分離尋問' / '分别讯问'
"hotbar.special.confidential"    // '비공개 보호' / 'Confidential' / '非公開保護' / '保密保护'
"hotbar.special.immediate"       // '즉답 요구' / 'Immediate' / '即答要求' / '即时回答'
"hotbar.questionChoice.titleFact"      // '사실 추궁 - 모순에 집중하기' (with full text per locale)
"hotbar.questionChoice.titleMotive"
"hotbar.questionChoice.titleEmpathy"
"hotbar.questionChoice.titleFree"      // '자유 질문 - 복합적 접근 시도'
"hotbar.questionChoice.titleEvidence"
"hotbar.questionChoice.hintDispute"    // '쟁점을 선택하세요' / 'Choose a dispute'
"hotbar.questionChoice.hintQuestion"   // '질문을 선택하세요'
"hotbar.questionChoice.hintEvidence"   // '제시할 증거를 선택하세요'
"hotbar.questionChoice.noEvidence"     // '해금된 증거가 없습니다'
"hotbar.questionChoice.fallbackQuestion"  // '기본 질문으로 진행'
"hotbar.questionChoice.disputeBack"    // '쟁점 다시 선택'
"hotbar.advance.ready"           // '진행할 수 있습니다' / 'Ready'
"hotbar.advance.toVerdict"       // '판결 단계로 진행' / 'Advance to Verdict'
"hotbar.advance.toReexam"        // '최종 심문 단계로' / 'To Re-examination'
"hotbar.advance.toNext"          // '다음 단계로 진행' / 'Next phase'
"hotbar.witness.title"           // '증인 소환'
"hotbar.witness.subtitle"        // '적절한 시점에 소환해야 핵심 증언을 들을 수 있습니다'
"hotbar.emotion.defensive"       // '경계' / 'Defensive' / '警戒' / '警惕'
"hotbar.emotion.confident"
"hotbar.emotion.shaken"
"hotbar.emotion.angry"
"hotbar.emotion.resigned"
```

Replace inline literals with `t()`. Then apply the CSS clamps:

```css
body.pc-mode .pc-play-hbar .slot-nm {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.15;
}
body.pc-mode .pc-play-hbar .slot { min-height: 62px !important; }
html[lang^="ja"] body.pc-mode .pc-play-hbar .slot-nm,
html[lang^="zh"] body.pc-mode .pc-play-hbar .slot-nm { font-size: 11px !important; }

/* Hotbar special-btn — wider above 1320px, icon-only below */
body.pc-mode .pc-play-hbar .hotbar-special-btn { max-width: 120px !important; }
@media (max-width: 1320px) {
  body.pc-mode .pc-play-hbar .hotbar-special-btn { max-width: 56px !important; padding-inline: 6px !important; }
  body.pc-mode .pc-play-hbar .hotbar-special-btn span { display: none !important; }
}

/* Advance banner wrap */
body.pc-mode .pc-advance-banner { flex-wrap: wrap; gap: 8px; }
body.pc-mode .pc-advance-banner__text { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

---

## P0-8. PCApp splash — language fallback for first launch

PROJECT_CONTROL_TOWER decision required. Two acceptable options:

- **A.** Re-introduce a small fixed selector (icon-only, `position: fixed; top:max(12px, env(safe-area-inset-top)); right: …`) inside `.pc-splash__content` and `.pc-loading-screen__card` so users can switch language before reaching Settings.
- **B.** Persist locale via the launcher / Steam locale handoff so first launch already matches the player's chosen language.

Audit recommendation: A is cheaper; minimum patch is a 36px gear icon that opens the Settings panel in language-only mode.

---

## P1-1. PCIntroSlides — translate buttons + brand band wrap

File: [`src/components/pc/home/PCIntroSlides.tsx`](../../../../src/components/pc/home/PCIntroSlides.tsx) lines 51-89.

Add `intro.skip / intro.prev / intro.next / intro.enter` keys and migrate buttons. Slide content (`PC_HOME_INTRO_SLIDES`) is shared with `pcHomeShared.ts` — that file's keys also need a translation pass (out of scope for this layout audit but flagged).

CSS layout guard at [`pc.css`](../../../../src/app/pc.css) `.pc-intro__brand`:

```css
body.pc-mode .pc-intro__brand { flex-wrap: wrap; min-width: 0; gap: 8px; }
body.pc-mode .pc-intro__brand-name,
body.pc-mode .pc-intro__brand-copy,
body.pc-mode .pc-intro__brand-kicker {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

---

## P1-2. PCHomeScreen — migrate ModeCard / DepthHeader / InfoCard / desk tabs

Migrate inline ko literals into `home.*` keys. Highlights:

- `home.mode.general` / `home.mode.season` (replaces inline `'일반 모드 >' / '시즌 모드 >'`).
- `home.mode.normalBadge` (replaces literal `'NORMAL MODE'` — keep in EN by setting that string for all locales for now, but route through `t()` so future change is non-breaking).
- `home.judgeDesk.title`, `home.judgeDesk.tab.profile / .history / .progression`.
- `home.history.tab.general / .season`.
- `home.leaderboard.title / .scoreboardTitle / .hallOfFameTitle / .seasonRank`.
- `home.settings.section.display / .audio / .gameplay / .live` titles + `home.settings.* row labels`.
- `home.axisRow.label.inquiry / .judgment / .resolution` + `home.axisRow.pole.logic / .intuition / .strict / .lenient / .principle / .reconcile`.

CSS guard at [`pc.css`](../../../../src/app/pc.css):

```css
body.pc-mode .pc-mode-card__title { word-break: keep-all; overflow-wrap: break-word; max-width: 100%; }
body.pc-mode .pc-axis-row__pole { max-width: 6em; text-align: center; line-height: 1.1; font-size: 11px; }
body.pc-mode .pc-ranking-row-v2 { min-width: 0; }
body.pc-mode .pc-ranking-row-v2__copy { min-width: 0; flex: 1 1 0; overflow: hidden; }
body.pc-mode .pc-ranking-row-v2__copy strong,
body.pc-mode .pc-ranking-row-v2__copy span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

---

## P1-3. PCResultScreen — TABS + rating + meta cards

Translate the `TABS` array and `getRating()` via `result.tab.*` and `result.rating.*` keys (KO keeps the `01 ` prefix; non-KO uses noun-only).

CSS guard:

```css
body.pc-mode .pc-result-tab { min-width: 0; overflow-wrap: break-word; }
body.pc-mode .pc-result-step-link { min-width: 0; overflow-wrap: break-word; }
body.pc-mode .pc-result-hero__rating { text-align: center; max-width: 100%; overflow-wrap: anywhere; }
body.pc-mode .pc-result-hero__meta-card { min-width: 0; }
body.pc-mode .pc-result-hero__meta-card span { font-size: 11px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
body.pc-mode .pc-result-hero__meta-card strong { overflow-wrap: anywhere; line-height: 1.2; }
```

---

## P1-4. PCCourtLayout — phase pill labels

File: [`src/components/pc/layout/PCCourtLayout.tsx`](../../../../src/components/pc/layout/PCCourtLayout.tsx) lines 27-38.

Move `PHASE_LABELS` into the component body and wire via `t('court.phase.briefing')` etc. Add to [`court.ts`](../../../../src/i18n/messages/court.ts):

```ts
"court.phase.briefing"
"court.phase.pretrial"
"court.phase.interrogation"
"court.phase.mediation"
"court.phase.verdict"
"court.phase.result"
```

CSS guard at `.pc-play-phase` (line ~1512):

```css
body.pc-mode .pc-play-phase { white-space: nowrap; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
```

---

## P1-5. PCInteractionPanel — translate action labels + drop emoji prefixes

File: [`src/components/pc/layout/PCInteractionPanel.tsx`](../../../../src/components/pc/layout/PCInteractionPanel.tsx).

Move action labels into `interactionPanel.action.*` keys and remove the inline `⚡-1` / `⚖️-1` prefixes — render the symbol via `<PCSvgIcon>` next to the label so the translatable string is just the verb.

---

## P1-6. ScreenPresetConfirmModal — buttons + body

Already uses `pc.resolutionConfirm.rollback`. Add:

```ts
"pc.resolutionConfirm.title"      // '지금 해상도를 유지하시겠습니까?' …
"pc.resolutionConfirm.confirm"    // '예' / 'Keep' / 'はい' / '保留'
"pc.resolutionConfirm.cancel"     // '아니요' / 'Revert' / 'いいえ' / '撤销'
```

CSS: bump button minimum width.

```css
body.pc-mode .pc-resolution-confirm__actions .pc-inline-button { min-width: 96px; padding-inline: 18px; }
```

---

## P1-7. Steam Deck breakpoint

Append after the existing `@media (max-width: 1320px)` block:

```css
@media (max-width: 1280px) and (max-height: 900px) {
  body.pc-mode .pc-play-hbar .char-info { display: none !important; }
  body.pc-mode .pc-play-hbar .hotbar-special-btn { max-width: 44px !important; padding-inline: 6px !important; }
  body.pc-mode .pc-play-hbar .hotbar-special-btn span { display: none !important; }
  body.pc-mode .pc-play-hbar .slot-key { transform: scale(0.85); }
  body.pc-mode .pc-home-v2__title-row { gap: 16px; }
  body.pc-mode .pc-home-v2__title-scale { width: 36px !important; height: 36px !important; }
}
```

---

## P2-1. PCTestConsole

Wrap in `debug.testConsole.*` keys and shorten EN resource labels (Token / Skill / Court). Add the inline `min-width: 0` + ellipsis to `resourceHead`.

---

## P2-2. JudgeObservationSection

Replace string-literal Set keys (`LOW_VALUE_OBSERVATION_TITLES`, `IMPORTANT_EVENT_OBSERVATION_TITLES`) with stable internal ids. Localize the rendered title separately via `observation.event.*` keys. Out of layout scope; flag for follow-up so PROJECT_CONTROL_TOWER can sequence it before any locale ships.

---

## P2-3. CJK font-size floor

```css
html[lang^="ja"] body.pc-mode .slot-nm,
html[lang^="ja"] body.pc-mode .hotbar-special-btn,
html[lang^="ja"] body.pc-mode .pc-settings-sidebar__badge,
html[lang^="zh"] body.pc-mode .slot-nm,
html[lang^="zh"] body.pc-mode .hotbar-special-btn,
html[lang^="zh"] body.pc-mode .pc-settings-sidebar__badge {
  font-size: 11px;
}
```

---

## Forbidden patterns (re-stating the brief)

- Global font shrink across the app.
- Viewport-width-based font scaling (no `clamp(…vw…)` for body text).
- Broad visual redesigns of working v3 panels.
- Hiding critical labels without a `title=` / tooltip fallback.
- Edits to `src/data/**`, Steam, Electron, server, or Railway files.

---

## Out-of-scope follow-ups (tag for PROJECT_CONTROL_TOWER)

- `PC_HOME_INTRO_SLIDES` content (kicker/title/body) localization.
- `EMOTION_LABELS` / `TYPE_LABELS` / observation Sets — stringly-typed keys conflict with translation.
- Case meta titles (`caseData.meta.title`) — reside in `src/data/**` (out of edit scope).
