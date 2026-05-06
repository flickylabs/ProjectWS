# Project_Solomon Localization Plan

## Target locales

| Code | Language | Notes |
| --- | --- | --- |
| `ko` | Korean | Source language and fallback locale. |
| `en` | English | First full non-Korean release target. |
| `ja` | Japanese | Steam page and in-game text target. |
| `zh-CN` | Simplified Chinese | Initial Chinese target. Add `zh-TW` only if Traditional Chinese is produced separately. |

## Current implementation

- Shared i18n runtime: `src/i18n/`
- Locale persistence: `localStorage["solomon.locale"]`
- Browser language detection: Korean, English, Japanese, and Chinese are mapped to the closest supported locale.
- PC Steam entry points are wrapped by `I18nProvider`.
- The PC Steam shell now has a language selector and localized splash/auth/session-prep copy.
- Localization management files live under `docs/localization/`.
- Glossary source of truth: `docs/localization/glossary.csv`.

## Rollout order

1. Shell UI
   - Splash, Steam auth, loading states, settings, result shell, debug/test console.
   - Keep text in `src/i18n/messages.ts` while the string count is small.

2. PC gameplay UI
   - Hotbar labels, panel headings, action names, tooltips, result/verdict summaries.
   - Prefer message keys for static UI copy.
   - Keep computed Korean grammar helpers isolated until non-Korean phrasing replaces them.

3. Case content
   - Case metadata, character bios, evidence, claims, scripted dialogue, event text.
   - Do not force this into `messages.ts`; content needs locale-specific JSON files.
   - Recommended structure:
     - `src/data/localized/<caseId>/ko.json`
     - `src/data/localized/<caseId>/en.json`
     - `src/data/localized/<caseId>/ja.json`
     - `src/data/localized/<caseId>/zh-CN.json`

4. LLM prompts and server content
   - Pass the selected locale with API calls that generate or polish text.
   - Add locale-specific prompt blocks instead of translating generated Korean output after the fact.

5. Steam metadata
   - Store page short/long descriptions, tags, screenshots with localized captions, achievements, and news/event copy.

## Rules

- `ko` remains the fallback when a key or content file is missing.
- Do not translate stable IDs, Steam achievement API names, case IDs, evidence IDs, or save-game schema keys.
- Check `docs/localization/glossary.csv` before translating any UI, case, Steam, or prompt text.
- English, Japanese, and Chinese content should be authored or edited as native text, not direct machine translation of Korean courtroom phrasing.
- UI text should use concise labels. Case dialogue can be more idiomatic and culture-aware.

## Next concrete tasks

1. Migrate PC home/settings/result/verdict static labels to `t(...)`.
2. Add an extraction/check script that fails when Korean UI literals remain in PC components outside approved content files.
3. Define localized case-content JSON schema and convert one small case as a pilot.
4. Add `locale` to LLM request payloads and prompt selection.
