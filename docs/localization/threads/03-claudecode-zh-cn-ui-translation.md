# Thread: ZH_CN_UI_TRANSLATION

Target: ClaudeCode

You are localizing Project_Solomon, a Steam PC courtroom investigation game.

## Target Locale

`zh-CN`

## Project Context

Project_Solomon is a PC/Electron Steam release built with Vite + React. The current source language is Korean. The localization system has started but only the PC shell is partially translated.

Current i18n implementation:

- `src/i18n/messages.ts`
- `src/i18n/locales.ts`
- `src/i18n/index.tsx`
- `src/components/pc/i18n/PCLanguageSelector.tsx`
- `src/app/PCApp.tsx`

## Required References

Read these first:

- `docs/localization/glossary.csv`
- `docs/localization/style-guide.md`
- `docs/localization/thread-brief-template.md`
- `docs/disclosure-policy.md`
- `docs/information-surface-policy.md`

## Source Areas To Inspect

Inspect static human-facing PC UI strings in:

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
- `src/app/PCApp.tsx`

## Scope

Translate static PC UI strings only.

Do not translate:

- Case dialogue JSON
- Case content JSON
- Character backstories
- Evidence body text
- Scripted dialogue
- IDs
- enum values
- action IDs
- case IDs
- evidence IDs
- achievement API names
- env keys
- file paths

## Simplified Chinese Rules

- Use Simplified Chinese only.
- Keep UI labels compact and direct.
- Avoid Traditional Chinese characters.
- Prefer natural game UI phrasing over literal Korean sentence shape.
- Use glossary terms exactly when `locked=true`.
- If a glossary term feels too literal or unnatural, keep it for now and add a note.

Default glossary expectations:

- `재판관` = `裁判官`
- `쟁점` = `争议点`
- `증거` = `证据`
- `심문` = `讯问`
- `판결` = `判决`
- `조사 토큰` = `调查代币`
- `스킬 포인트` = `技能点`

## Task

1. Identify static human-facing Korean UI strings in the source areas.
2. Propose stable message keys for `src/i18n/messages.ts`.
3. Provide Simplified Chinese translations for each key.
4. Preserve the original Korean source text in the map so Codex can apply changes safely.
5. Flag readability or layout risks.
6. Flag glossary issues.

Do not edit files directly unless explicitly asked. Return the proposed translation package.

## Output Format

Return exactly these sections.

### MESSAGE_KEY_PROPOSALS

```ts
{
  'pc.example.key': '简体中文文本'
}
```

### SOURCE_STRING_MAP

| source file | source text | proposed key | Simplified Chinese text | notes |
| --- | --- | --- | --- | --- |

### READABILITY_RISKS

| key/source | Simplified Chinese text | why risky | shorter alternative |
| --- | --- | --- | --- |

### GLOSSARY_NOTES

- List uncertain glossary terms or suggested glossary changes.

### IMPLEMENTATION_NOTES_FOR_CODEX

- Mention any component structure or CSS risks Codex should address while applying translations.
