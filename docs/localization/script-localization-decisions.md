# Script Localization Decisions

Status: active decisions for the first script localization architecture pass.
Date: 2026-05-06

## Locked Decisions

1. Storage uses sibling locale sidecars.
   - KO source stays canonical and unchanged unless a separate content fix is approved.
   - Locale files live beside the KO file:
     - `spouse-01.en.json`
     - `spouse-01.ja.json`
     - `spouse-01.zh-CN.json`

2. Locale sidecars are overlays, not complete replacements.
   - IDs, keys, channel metadata, lie states, dispute IDs, and tags remain locale-invariant.
   - Locale sidecars replace player-facing text fields only.
   - Missing locale entries silently fall back to KO at runtime.

3. `evidence.name` is not localized for v1.
   - `surfaceName` and other surface-safe UI fields are localized.
   - Truth/internal names remain KO until locale-side Tier 3 guard exists.

4. Tag values remain KO runtime control signals.
   - Localized rendering should use an i18n message map.
   - Do not mutate tag values in script JSON.

5. `behaviorHint` is not included in the first bulk translation pass.
   - Audit showed it is displayed in some UI paths and also used in matching/LLM context.
   - v1 script sidecars translate `text` first.
   - A separate behavior-hint pass must decide whether to hide, generically localize, or fully translate hints per surface.

6. Active mediation scope is only the versioned v3 active files.
   - `spouse-v3-01.json`
   - `family-v3-01.json`
   - `friend-v3-01.json`
   - Other mediation files are legacy unless explicitly promoted.

7. `angle_catalog.keywords[]` remains KO for v1.
   - Runtime classification reads keywords.
   - Locale keyword siblings may be added later, but the KO matcher list must not be overwritten.

8. Disclosure policy must grow locale guard blocks before bulk translation.
   - `localePolicy.forbiddenLexemes.en|ja|zh-CN`
   - `localePolicy.paraphraseLexemes.en|ja|zh-CN`
   - `localePolicy.uiSurfaceMap.en|ja|zh-CN`

## First Implementation Scope

- Add locale policy schema placeholders to active disclosure policy JSON files.
- Add script glossary seed rows.
- Add sidecar extraction and validation tooling.
- Add runtime sidecar merge support for ScriptedText and ScriptedAngle text surfaces.
- Keep KO source data intact except for explicitly approved phase1 leak-softening edits.
