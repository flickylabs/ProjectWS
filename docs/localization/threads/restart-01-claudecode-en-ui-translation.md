# Thread: EN_UI_TRANSLATION Restart

Target: ClaudeCode

You are continuing UI localization for `Project_Solomon`, but public branding has changed. Treat this file as the active restart prompt and ignore older Thread-01 assumptions that conflict with it.

## Target Locale

`en`

## Control Context

`PROJECT_CONTROL_TOWER` is the source of truth for integration. Do not directly modify production files unless PROJECT_CONTROL_TOWER explicitly asks you to. Produce a reviewable output package only.

Current repo path:

- `d:\ProjectWS`

## Current Implementation Shape

The i18n map has been split into namespaces. Read these files first:

- `src/i18n/messages/common.ts`
- `src/i18n/messages/settings.ts`
- `src/i18n/messages/home.ts`
- `src/i18n/messages/court.ts`
- `src/i18n/messages/verdict.ts`
- `src/i18n/messages/profile.ts`
- `src/i18n/messages/index.ts`
- `src/i18n/locales.ts`
- `src/i18n/index.tsx`

Glossary/reference files:

- `docs/localization/glossary.csv`
- `docs/localization/style-guide.md`
- `docs/disclosure-policy.md`
- `docs/information-surface-policy.md`

## Locked Brand Rules

Use these exactly:

- Internal/dev-only project name: `Project_Solomon`
- Korean public full title: `솔로몬의 딜레마: 진실의 재판`
- English public full title: `Verdict Zero: Trial of Truth`
- Japanese public full title: `ソロモンのジレンマ：真実の裁き`
- Simplified Chinese public full title: `真相裁决：零点审判`

Do not use these as public English titles:

- `Project Solomon`
- `Solomon's Dilemma`
- `Solomon Court`

## Scope

Audit and propose English translations for current PC UI i18n namespace keys only.

Include:

- all keys in `src/i18n/messages/*.ts`
- any remaining static human-facing PC UI strings you find in the source areas below

Do not translate:

- case dialogue JSON
- case content JSON
- character backstories
- evidence body text
- scripted dialogue
- IDs, enum values, action IDs, case IDs, evidence IDs
- achievement API names
- env keys
- file paths

## Source Areas To Inspect For Missed UI Strings

- `src/app/PCApp.tsx`
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

## English Rules

- Use concise Steam PC UI language.
- Prefer clear gameplay wording over formal legalese.
- Use Title Case for major screen labels, buttons, tabs, and panel titles.
- Keep button labels short.
- Use glossary terms exactly when `locked=true`.
- If a locked glossary term sounds wrong, keep it and add a note.
- Flag strings likely to overflow in compact panels, tabs, badges, and Steam Deck layouts.
- Preserve interpolation placeholders exactly, such as `{count}`, `{name}`, `{message}`.

## Output Location

Write your output files under:

- `docs/localization/threads/outputs/restart-thread-01-en-ui/`

If you cannot write files in your environment, return the same content in the chat using the filenames below.

## Required Output Files

### `MESSAGE_PATCH_PROPOSAL.ts`

Provide a full English replacement proposal for the current namespace message values.

Use this shape:

```ts
export const enMessagePatch = {
  common: {
    'common.example': 'Example'
  }
} as const
```

Do not include unrelated locales.

### `COVERAGE_REPORT.csv`

Columns:

```csv
namespace,key,current_en,proposed_en,status,notes
```

Use statuses:

- `ok`
- `changed`
- `needs_codex_refactor`
- `needs_native_review`

### `SOURCE_STRING_MAP.csv`

Columns:

```csv
source_file,source_text,proposed_key,english_text,notes
```

Use this only for static UI strings that are not already covered by current i18n keys.

### `LONG_TEXT_RISKS.csv`

Columns:

```csv
key_or_source,english_text,risk,shorter_alternative,notes
```

### `GLOSSARY_AUDIT.csv`

Columns:

```csv
term_id,source_ko,current_glossary_en,used_translation,issue,recommendation
```

### `SUMMARY.md`

Include:

- total keys reviewed
- changed keys
- missed static strings found
- P0/P1 risks
- anything PROJECT_CONTROL_TOWER must decide

## Final Reminder

Do not edit `src/data/**`. Do not edit Steam, Electron, server, or Railway files. This is a UI localization proposal pass only.
