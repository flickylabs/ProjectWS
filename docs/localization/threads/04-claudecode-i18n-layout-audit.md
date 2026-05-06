# Thread: I18N_LAYOUT_AUDIT

Target: ClaudeCode

You are auditing Project_Solomon's Steam PC UI for multilingual layout risks before wider localization is applied.

## Target Locales

- `ko`
- `en`
- `ja`
- `zh-CN`

## Project Context

Project_Solomon is a PC/Electron Steam release built with Vite + React. English strings may become much longer than Korean. Japanese and Simplified Chinese may need different line-wrap behavior and font handling. Steam Deck compatibility matters.

## Required References

Read these first:

- `docs/localization/glossary.csv`
- `docs/localization/style-guide.md`
- `src/i18n/`
- `src/app/pc.css`
- `src/components/pc/`

## Source Areas To Audit

Focus on:

- `src/components/pc/home/`
- `src/components/pc/settings/`
- `src/components/pc/result/`
- `src/components/pc/verdict/`
- `src/components/pc/debug/`
- `src/components/pc/hotbar/`
- `src/components/pc/panels/`
- `src/components/pc/layout/`
- `src/components/pc/observation/`
- `src/components/pc/progression/`
- `src/components/pc/profile/`
- `src/components/pc/i18n/`
- `src/app/PCApp.tsx`
- `src/app/pc.css`

## Task

1. Find places where localized text may overflow, clip, overlap, or distort layout.
2. Focus especially on:
   - fixed-width buttons
   - segmented controls
   - tabs
   - card headers
   - badges
   - tooltips
   - result panels
   - verdict panels
   - hotbar labels
   - test console controls
   - modal buttons
3. Recommend practical CSS/component rules.
4. Consider locale-specific behavior only when needed.
5. Do not propose a broad redesign unless the current structure is clearly unsafe.

## Preferred Fix Patterns

Prefer:

- `min-width: 0`
- `max-width`
- `overflow-wrap`
- `text-overflow`
- two-line button labels where appropriate
- shorter message variants
- stable icon-only controls with tooltips
- responsive grid changes for Steam Deck
- locale-specific compact classes only where justified

Avoid:

- shrinking all text globally
- viewport-width based font scaling
- broad visual redesigns
- hiding critical labels without tooltip/title fallback

## Output Format

Return exactly these sections.

### LAYOUT_RISK_TABLE

| priority | file/component | risk | affected locales | recommendation |
| --- | --- | --- | --- | --- |

Priority values:

- P0: likely breakage or overlap
- P1: likely overflow/clipping
- P2: polish/readability risk

### GLOBAL_RULES

- Recommended global CSS/component conventions.

### LOCALE_SPECIFIC_RULES

- en:
- ja:
- zh-CN:

### PATCH_SUGGESTIONS_FOR_CODEX

- Concise implementation guidance. Do not provide a full rewrite.

### VISUAL_QA_NOTES

- Screens/components that must be screenshot-tested after Codex applies changes.
