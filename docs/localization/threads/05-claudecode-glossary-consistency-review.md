# Thread: GLOSSARY_CONSISTENCY_REVIEW

Target: ClaudeCode

You are reviewing cross-language localization consistency for Project_Solomon, a Steam PC courtroom investigation game.

## When To Run This

Run this after these thread outputs are available:

- `EN_UI_TRANSLATION`
- `JA_UI_TRANSLATION`
- `ZH_CN_UI_TRANSLATION`
- optionally `I18N_LAYOUT_AUDIT`

## Required References

Read these first:

- `docs/localization/glossary.csv`
- `docs/localization/style-guide.md`
- `docs/localization/translation-queue.csv`

## Inputs

Use the outputs from:

- English UI translation thread
- Japanese UI translation thread
- Simplified Chinese UI translation thread
- Layout audit thread, if available

## Scope

Review consistency and risk. Do not translate large new surfaces from scratch.

## Task

1. Compare all proposed translations against `glossary.csv`.
2. Identify inconsistent translations of the same Korean source term.
3. Identify target-language terms that sound unnatural or too literal.
4. Identify strings that are too long for likely UI containers.
5. Propose glossary patches only when needed.
6. Propose final normalized translations for conflicts.
7. Flag issues Codex should resolve during implementation.

## Rules

- Do not rewrite all translations.
- Focus on conflicts, risk, and glossary updates.
- Preserve IDs and message keys exactly.
- If a glossary term is `locked=true`, recommend changing the translation output rather than changing the glossary.
- If a glossary term is `status=draft`, you may recommend glossary changes with reasons.

## Output Format

Return exactly these sections.

### CONSISTENCY_FINDINGS

| priority | locale | key/source | issue | recommendation |
| --- | --- | --- | --- | --- |

Priority values:

- P0: must fix before integration
- P1: should fix before release
- P2: polish/native review

### GLOSSARY_PATCHES

| id | locale | current | proposed | reason | confidence |
| --- | --- | --- | --- | --- | --- |

### FINAL_NORMALIZED_TERMS

| source term/id | en | ja | zh-CN | notes |
| --- | --- | --- | --- | --- |

### LONG_TEXT_RECOMMENDATIONS

| key/source | locale | current proposal | shorter alternative | notes |
| --- | --- | --- | --- | --- |

### IMPLEMENTATION_NOTES_FOR_CODEX

- Changes Codex should apply to `glossary.csv`, `messages.ts`, component structure, or CSS.
