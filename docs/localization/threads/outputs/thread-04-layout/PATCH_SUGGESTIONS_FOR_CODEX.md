# PATCH_SUGGESTIONS_FOR_CODEX

Concise, surgical patches. Apply in the listed order — earlier patches reduce the surface for later ones. **Do not rewrite working v3 panels**, do not introduce new layouts, do not touch the existing 80+ `word-break: keep-all` rules unless explicitly listed below.

## P0 patches

### P0-1. Locale-aware text-wrap base

File: `src/app/pc.css` — insert near the top (after the existing `:root` / `body.pc-mode` block, before the first `body.pc-mode ::-webkit-scrollbar` rule around line 60).

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

### P0-2. Hotbar slot label clamp

File: `src/app/pc.css` — extend the existing `.pc-play-hbar .slot-nm` rule at line 9470.

```css
body.pc-mode .pc-play-hbar .slot-nm {
  font-size: 10px !important;
  line-height: 1.15 !important;
  font-weight: 800 !important;
  color: var(--pc-text-dim) !important;
  text-align: center !important;
  /* NEW */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 100%;
}
body.pc-mode .pc-play-hbar .slot { min-height: 62px !important; }
html[lang^="ja"] body.pc-mode .pc-play-hbar .slot-nm,
html[lang^="zh"] body.pc-mode .pc-play-hbar .slot-nm { font-size: 11px !important; }
```

### P0-3. Hotbar special-btn — icon-only below 1320px

File: `src/app/pc.css` — modify the existing `.pc-play-hbar .hotbar-special-btn` rules around line 24180 and inside the `@media (max-width: 1320px)` block around line 24247 / line 24582.

```css
/* >= 1320px: raise max-width so EN labels fit */
body.pc-mode .pc-play-hbar .hotbar-special-btn { max-width: 120px !important; }

/* < 1320px: collapse the inner span; keep icon + kbd; rely on title= */
@media (max-width: 1320px) {
  body.pc-mode .pc-play-hbar .hotbar-special-btn { max-width: 56px !important; padding-inline: 6px !important; }
  body.pc-mode .pc-play-hbar .hotbar-special-btn span { display: none !important; }
}
```

The `title=` attribute is already populated in `PCBottomDock.tsx:478-486`, so accessibility is preserved.

### P0-4. Drop numeric prefix on result / verdict / history tabs

Files:

- `src/components/pc/result/PCResultScreen.tsx:27-32` — replace the `TABS` array with `t()`-driven labels.
- `src/components/pc/verdict/PCVerdictScreen.tsx:38-43` — replace the `STEPS` array with `t()`-driven labels.
- `src/components/pc/home/PCHomeScreen.tsx:48-53` — replace `HISTORY_RESULT_TABS` similarly.

Step 1, extend `src/i18n/messages.ts` with new keys:

```ts
'result.tab.result': '01 결과 확인',     // ko keeps prefix
'result.tab.verdict': '02 판결 선고',
'result.tab.epilogue': '03 후일담',
'result.tab.bonus': '04 보너스',
'verdict.step.fact': '01 쟁점 판단',
'verdict.step.responsibility': '02 안건 책임',
'verdict.step.solution': '03 해결안',
'verdict.step.confirm': '04 판결문',
```

EN / JA / zh-CN entries omit the numeric prefix:
- en: `Result` / `Verdict` / `Epilogue` / `Bonus`; `Disputes` / `Responsibility` / `Solution` / `Verdict`.
- ja: `結果` / `判決` / `後日談` / `ボーナス`; `争点判断` / `責任配分` / `解決案` / `判決文`.
- zh-CN: `结果` / `判决` / `后日谈` / `奖励`; `争点判断` / `责任分配` / `解决方案` / `判决文`.

Step 2, replace the array literals with:

```ts
const TABS: { id: ResultTab; label: string }[] = [
  { id: 'result', label: t('result.tab.result') },
  // ...
]
```

Use `useI18n().t` inside the component (the arrays must move into the function body or a memoized factory).

### P0-5. Hall-of-fame / leaderboard ellipsis

File: `src/app/pc.css` — extend the `.pc-ranking-row-v2` rules around line 510.

```css
body.pc-mode .pc-ranking-row-v2 { min-width: 0; }
body.pc-mode .pc-ranking-row-v2__copy { min-width: 0; flex: 1 1 0; overflow: hidden; }
body.pc-mode .pc-ranking-row-v2__copy strong {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
body.pc-mode .pc-ranking-row-v2__copy span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## P1 patches

### P1-1. Steam-Deck-tuned breakpoint

File: `src/app/pc.css` — append after the existing `@media (max-width: 1320px)` block.

```css
@media (max-width: 1280px) and (max-height: 900px) {
  body.pc-mode .pc-play-hbar .char-info { display: none !important; }
  body.pc-mode .pc-play-hbar .hotbar-special-btn { max-width: 44px !important; padding-inline: 6px !important; }
  body.pc-mode .pc-play-hbar .hotbar-special-btn span { display: none !important; }
  body.pc-mode .pc-play-hbar .slot-key { transform: scale(0.85); }
}
```

### P1-2. AxisRow poles clamp

File: `src/app/pc.css` — find `.pc-axis-row__pole` and add:

```css
body.pc-mode .pc-axis-row__pole {
  max-width: 6em;
  text-align: center;
  line-height: 1.1;
  font-size: 11px;
}
```

### P1-3. Settings sidebar `__label` defensive ellipsis

File: `src/app/pc.css` — extend `.pc-settings-sidebar__item` and `.pc-settings-sidebar__label` rules around line 20865.

```css
body.pc-mode .pc-settings-sidebar__item { min-width: 0; }
body.pc-mode .pc-settings-sidebar__label {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
html[lang]:not([lang^="ko"]) body.pc-mode .pc-settings-sidebar__badge { font-size: 0; padding: 4px; border-radius: 50%; width: 8px; height: 8px; }
html[lang]:not([lang^="ko"]) body.pc-mode .pc-settings-sidebar__badge::before { content: ""; }
```

The `title=` on the parent button (already present) carries the "Coming Soon" hint when the badge collapses to a dot.

### P1-4. ResolutionConfirm modal buttons

File: `src/app/pc.css` — append near the existing `.pc-resolution-confirm__actions` rule.

```css
body.pc-mode .pc-resolution-confirm__actions .pc-inline-button {
  min-width: 96px;
  padding-inline: 18px;
}
```

### P1-5. Advance banner wrap + sentence

File: `src/components/pc/hotbar/PCBottomDock.tsx:281-285` — shorten the sentence so EN doesn't repeat the verb. Replace:

```tsx
const advanceLabel = currentPhase === Phase.Interrogation
  ? '판결 단계로 진행'
  : currentPhase === GamePhase.Phase4_Evidence
    ? '최종 심문 단계로'
    : '다음 단계로 진행'
```

with `t()`-driven labels and a separate "ready" sentence. Add to `messages.ts`:

```ts
'phase.advance.ready': '진행할 수 있습니다',          // ko
'phase.advance.label.toVerdict': '판결 단계로 진행',
'phase.advance.label.toReexam': '최종 심문 단계로',
'phase.advance.label.next': '다음 단계로 진행',
```

EN: `'phase.advance.ready': 'Ready'`, `'phase.advance.label.toVerdict': 'Advance to Verdict'`, etc.

File: `src/app/pc.css` — `.pc-advance-banner` (line 13972).

```css
body.pc-mode .pc-advance-banner { flex-wrap: wrap; gap: 8px; }
body.pc-mode .pc-advance-banner__text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### P1-6. Result hero meta cards

File: `src/app/pc.css` — extend the `.pc-result-hero__meta-card` block at line 1143.

```css
body.pc-mode .pc-result-hero__meta-card { min-width: 0; }
body.pc-mode .pc-result-hero__meta-card span {
  font-size: 11px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
body.pc-mode .pc-result-hero__meta-card strong {
  overflow-wrap: anywhere;
  line-height: 1.2;
}
```

### P1-7. Emotion chips on their own line

File: `src/app/pc.css` — find `.char-info` / `.char-emo` rules and add (only for EN):

```css
html[lang^="en"] body.pc-mode .char-info {
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}
html[lang^="en"] body.pc-mode .char-emo { font-size: 10px; }
```

## P2 patches

### P2-1. Eyebrow letter-spacing for non-Latin

File: `src/app/pc.css` — append a single rule:

```css
html[lang]:not([lang^="en"]) body.pc-mode [class*="__eyebrow"],
html[lang]:not([lang^="en"]) body.pc-mode [class*="__kicker"] {
  text-transform: none;
  letter-spacing: 0.04em;
}
```

### P2-2. getRating overflow guard

File: `src/app/pc.css` — find `.pc-result-hero__rating` and append:

```css
body.pc-mode .pc-result-hero__rating {
  text-align: center;
  max-width: 100%;
  overflow-wrap: anywhere;
}
```

### P2-3. Test console resource head ellipsis

File: `src/components/pc/debug/PCTestConsole.tsx:184-191` — add to the inline `resourceHead` style:

```ts
resourceHead: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  marginBottom: 8,
  fontSize: 13,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
},
```

Also shorten resource labels via glossary (Token / Skill / Court).

### P2-4. PCInteractionPanel actions

File: `src/components/pc/layout/PCInteractionPanel.tsx` — when building action labels, drop the `⚡-1` / `⚖️-1` emoji prefixes and render the symbol via `<PCSvgIcon>` so the label string itself is translatable.

## Out-of-scope reminders

- Do not change the v3 panel layouts (left/right panels, court layout).
- Do not touch the dialogue bubble flow; it already uses `word-break: keep-all` + `overflow-wrap: break-word` correctly at lines 18289 and 18455.
- Do not add new media queries below 1024px — Steam build minimum target is 1280×800.
