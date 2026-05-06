# Thread: I18N_LAYOUT_AUDIT Restart

Target: ClaudeCode

You are auditing the current Steam PC UI for multilingual layout risks after the i18n namespace split and language selector integration. Treat this file as the active restart prompt and ignore older Thread-04 assumptions that conflict with it.

## Target Locales

- `ko`
- `en`
- `ja`
- `zh-CN`

## Control Context

`PROJECT_CONTROL_TOWER` is the source of truth for integration. Do not directly modify production files unless PROJECT_CONTROL_TOWER explicitly asks you to. Produce a reviewable output package only.

Current repo path:

- `d:\ProjectWS`

## Required References

Read these first:

- `docs/localization/glossary.csv`
- `docs/localization/style-guide.md`
- `src/i18n/messages/common.ts`
- `src/i18n/messages/settings.ts`
- `src/i18n/messages/home.ts`
- `src/i18n/messages/court.ts`
- `src/i18n/messages/verdict.ts`
- `src/i18n/messages/profile.ts`
- `src/i18n/index.tsx`
- `src/app/pc.css`
- `src/components/pc/`

## Locked Brand Rules

Use these exact public full titles when estimating title length:

- Korean: `솔로몬의 딜레마: 진실의 재판`
- English: `Verdict Zero: Trial of Truth`
- Japanese: `ソロモンのジレンマ：真実の裁き`
- Simplified Chinese: `真相裁决：零点审判`

Only English may keep uppercase eyebrow/label styling when it is deliberate branding. Non-English uppercase-transform surfaces must be flagged for removal or locale-specific override.

## Source Areas To Audit

Focus on:

- `src/app/PCApp.tsx`
- `src/app/pc.css`
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

## Task

1. Find places where localized text may overflow, clip, overlap, or distort layout.
2. Check the real current message keys in `src/i18n/messages/*.ts`, not older thread output.
3. Focus especially on:
   - language selector controls
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
   - brand/title surfaces
4. Recommend practical CSS/component rules.
5. Consider locale-specific behavior only when needed.
6. Do not propose a broad redesign unless the current structure is clearly unsafe.

## Preferred Fix Patterns

Prefer:

- `min-width: 0`
- `max-width`
- `overflow-wrap`
- `text-overflow`
- two-line button labels where appropriate
- shorter message variants
- stable icon-only controls with tooltip/title fallback
- responsive grid changes for Steam Deck
- locale-specific compact classes only where justified
- removing `text-transform: uppercase` for non-English locales

Avoid:

- shrinking all text globally
- viewport-width based font scaling
- broad visual redesigns
- hiding critical labels without tooltip/title fallback

## Output Location

Write your output files under:

- `docs/localization/threads/outputs/restart-thread-04-layout-audit/`

If you cannot write files in your environment, return the same content in the chat using the filenames below.

## Required Output Files

### `LAYOUT_RISKS.csv`

Columns:

```csv
priority,file_or_component,risk,affected_locales,recommendation
```

Priority values:

- `P0`: likely breakage or overlap
- `P1`: likely overflow/clipping
- `P2`: polish/readability risk

### `SCREEN_SURFACE_INVENTORY.csv`

Columns:

```csv
screen_or_component,text_surface,source_keys,layout_constraint,notes
```

### `PATCH_SUGGESTIONS_FOR_CODEX.md`

Provide concise implementation guidance. Do not provide a full rewrite.

### `VISUAL_QA_NOTES.md`

List screens/components that must be screenshot-tested after Codex applies changes.

### `SUMMARY.md`

Include:

- total risks by priority
- top P0/P1 risks
- CSS/component changes recommended first
- anything PROJECT_CONTROL_TOWER must decide

## Final Reminder

Do not edit `src/data/**`. Do not edit Steam, Electron, server, or Railway files. This is a layout audit proposal pass only.
