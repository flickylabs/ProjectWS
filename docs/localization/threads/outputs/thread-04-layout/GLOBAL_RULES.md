# GLOBAL_RULES — i18n Layout Conventions

These are global CSS / component conventions Project Solomon's PC UI should adopt before EN / JA / zh-CN strings ship. They are additive — none require touching the existing 80+ `word-break: keep-all` rules.

The `<html lang>` is already wired by [`src/i18n/index.tsx`](../../../../src/i18n/index.tsx) (`document.documentElement.lang = locale`), so locale-aware CSS works without extra plumbing.

## 1. Locale-aware text-wrap base

Add near the top of [`src/app/pc.css`](../../../../src/app/pc.css), after the existing `:root` / `body.pc-mode` block:

```css
/* CJK-friendly default (ko / ja / zh) */
body.pc-mode {
  word-break: keep-all;
  overflow-wrap: anywhere;
}

/* English: allow long words to break and soft-hyphenate */
html[lang^="en"] body.pc-mode {
  word-break: normal;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* Neutralize wide letter-spacing for CJK runs */
html[lang^="ja"] body.pc-mode,
html[lang^="zh"] body.pc-mode {
  letter-spacing: 0;
}
```

This single block fixes the majority of P1 EN overflow risks without rewriting the 80+ existing `word-break: keep-all` rules.

## 2. Always-on `min-width: 0` on flex/grid children

Any flex or grid child that contains text should have `min-width: 0`. Without this, fixed-width siblings (rank badges, score columns, icons) will push the text container off-screen instead of shrinking it. Apply specifically to:

- `.pc-ranking-row-v2 *`
- `.pc-result-hero__meta-card *`
- `.pc-history-case-option *`
- `.hotbar-special-btn *`
- `.pc-settings-sidebar__item *`

## 3. Pair `white-space: nowrap` with ellipsis fallback

The codebase has 49 `white-space: nowrap` rules and 22 `text-overflow: ellipsis` rules — the gap is the risk. Anywhere `nowrap` exists on a label that may be localized, also set:

```css
overflow: hidden;
text-overflow: ellipsis;
min-width: 0;
```

Auditable target list: every match for `white-space:\s*nowrap` in `pc.css` lines 663, 804, 1003, 1322, 4725, 4914, 5330, 7313, 7405, 8024, 10603, 10639, 10666, 11092, 14114, 15591, 15945, 19034, 19354, 22324, 24145, 24318.

## 4. Two-line label clamp for compact controls

For "icon + label" controls under ~88px wide, prefer a 2-line clamp over forced single-line. Recipe:

```css
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
line-height: 1.15;
```

Apply to `.slot-nm`, `.pc-axis-row__pole`, `.pc-settings-sidebar__label` (only when sidebar is narrowed).

## 5. CJK font-size floor

The codebase has 100+ instances of `font-size: 9px` / `10px`. Korean Hangul reads at 10px on 1080p+ but JA kanji and zh-CN hanzi do not, especially on Steam Deck (1280×800, ~155 PPI handheld). Floor compact-UI text to 11px for `ja` and `zh-CN`:

```css
html[lang^="ja"] body.pc-mode .slot-nm,
html[lang^="ja"] body.pc-mode .hotbar-special-btn,
html[lang^="ja"] body.pc-mode .pc-language-selector__label,
html[lang^="zh"] body.pc-mode .slot-nm,
html[lang^="zh"] body.pc-mode .hotbar-special-btn,
html[lang^="zh"] body.pc-mode .pc-language-selector__label {
  font-size: 11px;
}
```

Avoid global font shrinking and viewport-based scaling — cover targeted hotspots only.

## 6. Numeric step prefixes are KO-only

The pattern `01 결과 확인` / `02 판결 선고` / `01 쟁점 판단` doubles label length when translated. Treat the numeric prefix as KO-only and source labels via `t()`. Other locales use noun-only labels:

| ko | en | ja | zh-CN |
| --- | --- | --- | --- |
| 01 결과 확인 | Result | 結果 | 结果 |
| 02 판결 선고 | Verdict | 判決 | 判决 |
| 03 후일담 | Epilogue | 後日談 | 后日谈 |
| 04 보너스 | Bonus | ボーナス | 奖励 |

## 7. Eyebrow / kicker labels

Codebase has 78+ `text-transform: uppercase` rules with `letter-spacing: 0.12em-0.22em`. Two acceptable approaches:

- **A (recommended):** keep eyebrows in English regardless of locale ("RESULT DOSSIER", "JUDGE PROFILE", "GENERAL MODE") — treat as branding constants. Document in `style-guide.md`.
- **B:** drop `text-transform: uppercase` and reduce `letter-spacing` to `0.04em` for non-Latin runs, scoped via `html[lang]:not([lang^="en"])`.

## 8. Modal / button minimum widths

Confirm-style buttons (Yes / No, Keep / Revert) need a minimum visual weight regardless of locale. Add to `.pc-inline-button` when used inside `.pc-resolution-confirm__actions`, `.pc-question-choice` footers, etc.:

```css
min-width: 96px;
padding-inline: 18px;
```

## 9. Steam Deck breakpoint

The hotbar already steps at 1320px. Add a Steam-Deck-tuned breakpoint that further compacts the special row to icon-only (label stays in `title=`):

```css
@media (max-width: 1280px) and (max-height: 900px) {
  body.pc-mode .pc-play-hbar .hotbar-special-btn span { display: none; }
  body.pc-mode .pc-play-hbar .hotbar-special-btn { max-width: 44px; padding-inline: 6px; }
  body.pc-mode .pc-play-hbar .char-info { display: none; }
  body.pc-mode .pc-play-hbar .slot { min-height: 60px; }
}
```

## 10. Forbidden patterns (re-stating the brief)

- Global font shrink across the app.
- Viewport-width-based font scaling (no `clamp(…vw…)` for body text).
- Broad visual redesigns of working v3 panels.
- Hiding critical labels without a `title=` / tooltip fallback.
