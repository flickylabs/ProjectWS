# Thread: JA_UI_TRANSLATION Restart

Target: ClaudeCode

You are continuing UI localization for `Project_Solomon`, but public branding has changed. Treat this file as the active restart prompt and ignore older Thread-02 assumptions that conflict with it.

## Target Locale

`ja`

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

Do not use these as public Japanese titles:

- `ソロモン法廷`
- `プロジェクト・ソロモン`

## Scope

Audit and propose Japanese translations for current PC UI i18n namespace keys only.

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

## Japanese Rules

- Use natural game UI Japanese, not literal Korean word order.
- Keep labels compact for tabs, buttons, badges, and Steam Deck layouts.
- Avoid over-formal legalese unless the string is clearly part of courtroom flavor.
- Use Japanese punctuation and full-width colon in the locked brand title.
- Use glossary terms exactly when `locked=true`.
- If a locked glossary term sounds wrong, keep it and add a note.
- Preserve interpolation placeholders exactly, such as `{count}`, `{name}`, `{message}`.

## Output Location

Write your output files under:

- `docs/localization/threads/outputs/restart-thread-02-ja-ui/`

If you cannot write files in your environment, return the same content in the chat using the filenames below.

## Required Output Files

### `MESSAGE_PATCH_PROPOSAL.ts`

Provide a full Japanese replacement proposal for the current namespace message values.

Use this shape:

```ts
export const jaMessagePatch = {
  common: {
    'common.example': '例'
  }
} as const
```

Do not include unrelated locales.

### `COVERAGE_REPORT.csv`

Columns:

```csv
namespace,key,current_ja,proposed_ja,status,notes
```

Use statuses:

- `ok`
- `changed`
- `needs_codex_refactor`
- `needs_native_review`

### `SOURCE_STRING_MAP.csv`

Columns:

```csv
source_file,source_text,proposed_key,japanese_text,notes
```

Use this only for static UI strings that are not already covered by current i18n keys.

### `LONG_TEXT_RISKS.csv`

Columns:

```csv
key_or_source,japanese_text,risk,shorter_alternative,notes
```

### `GLOSSARY_AUDIT.csv`

Columns:

```csv
term_id,source_ko,current_glossary_ja,used_translation,issue,recommendation
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
