# Thread: EN_UI_TRANSLATION

Target: ClaudeCode

You are localizing Project_Solomon, a Steam PC courtroom investigation game.

## Target Locale

`en`

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

## English Rules

- Use concise Steam PC UI language.
- Prefer clear gameplay wording over formal legalese.
- Use Title Case for major screen labels, buttons, tabs, and panel titles.
- Keep button labels short.
- Watch for English expansion. If a string may overflow, provide a shorter alternative.
- Use glossary terms exactly when `locked=true`.
- If a glossary term sounds wrong, keep it for now and add a note.

Default glossary expectations:

- `재판관` = `Judge`
- `쟁점` = `Dispute`
- `증거` = `Evidence`
- `심문` = `Interrogation`
- `판결` = `Verdict`
- `조사 토큰` = `Investigation Token`
- `스킬 포인트` = `Skill Point`

## Task

1. Identify static human-facing Korean UI strings in the source areas.
2. Propose stable message keys for `src/i18n/messages.ts`.
3. Provide English translations for each key.
4. Preserve the original Korean source text in the map so Codex can apply changes safely.
5. Flag long-text or layout risks.
6. Flag glossary issues.

Do not edit files directly unless explicitly asked. Return the proposed translation package.

## Output Format

Return exactly these sections.

### MESSAGE_KEY_PROPOSALS

```ts
{
  'pc.example.key': 'English text'
}
```

### SOURCE_STRING_MAP

| source file | source text | proposed key | English text | notes |
| --- | --- | --- | --- | --- |

### LONG_TEXT_RISKS

| key/source | English text | why risky | shorter alternative |
| --- | --- | --- | --- |

### GLOSSARY_NOTES

- List uncertain glossary terms or suggested glossary changes.

### IMPLEMENTATION_NOTES_FOR_CODEX

- Mention any component structure or CSS risks Codex should address while applying translations.
