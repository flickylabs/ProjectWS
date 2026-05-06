# Localization Thread Handoffs

Use these files as copy-paste prompts for parallel localization sessions.

## Current Restart Set

The active UI localization handoffs are now the `restart-*` files. The original numbered files are kept as historical prompts only.

Run these first:

| Thread name | Target | Purpose | File |
| --- | --- | --- | --- |
| `EN_UI_TRANSLATION` | ClaudeCode | English PC UI translation proposal after namespace split | `restart-01-claudecode-en-ui-translation.md` |
| `JA_UI_TRANSLATION` | ClaudeCode | Japanese PC UI translation proposal after namespace split | `restart-02-claudecode-ja-ui-translation.md` |
| `ZH_CN_UI_TRANSLATION` | ClaudeCode | Full Simplified Chinese PC UI translation rerun after partial first pass | `restart-03-claudecode-zh-cn-ui-translation.md` |
| `I18N_LAYOUT_AUDIT` | ClaudeCode | Multilingual UI overflow/layout risk audit after language selector integration | `restart-04-claudecode-i18n-layout-audit.md` |

Run this only after the four outputs above are ready:

| Thread name | Target | Purpose | File |
| --- | --- | --- | --- |
| `GLOSSARY_CONSISTENCY_REVIEW` | ClaudeCode | Cross-language consistency review for restart outputs | `restart-05-claudecode-glossary-consistency-review.md` |

## Thread Registry

| Thread name | Target | Purpose | File |
| --- | --- | --- | --- |
| `EN_UI_TRANSLATION` | ClaudeCode | English PC UI translation draft | `01-claudecode-en-ui-translation.md` |
| `JA_UI_TRANSLATION` | ClaudeCode | Japanese PC UI translation draft | `02-claudecode-ja-ui-translation.md` |
| `ZH_CN_UI_TRANSLATION` | ClaudeCode | Simplified Chinese PC UI translation draft | `03-claudecode-zh-cn-ui-translation.md` |
| `I18N_LAYOUT_AUDIT` | ClaudeCode | Multilingual UI overflow/layout risk audit | `04-claudecode-i18n-layout-audit.md` |
| `GLOSSARY_CONSISTENCY_REVIEW` | ClaudeCode | Cross-language glossary and output consistency review | `05-claudecode-glossary-consistency-review.md` |
| `PROJECT_CONTROL_TOWER` | Codex | Overall localization control, accepted-output integration, build/QA checks | Main coordination thread |

## Model Label Rule

If Claude Web is used instead of Claude Code, still record the work as `ClaudeCode`.

## Recommended Order

1. Copy the restart prompts into `EN_UI_TRANSLATION`, `JA_UI_TRANSLATION`, and `ZH_CN_UI_TRANSLATION` and run them in parallel.
2. Copy the restart prompt into `I18N_LAYOUT_AUDIT` and run it in parallel with the translation threads.
3. After the four restart outputs are ready, copy the restart prompt into `GLOSSARY_CONSISTENCY_REVIEW`.
4. Return all outputs to `PROJECT_CONTROL_TOWER` for integration.

## Script Translation Line

Script/dialogue localization should be handled separately from this UI restart set.

Planned script threads:

- `SCRIPT_EN`
- `SCRIPT_JA`
- `SCRIPT_ZH_CN`
- `SCRIPT_LOCALIZATION_REVIEW`

Use these handoff files:

| Thread name | Target | Purpose | File |
| --- | --- | --- | --- |
| `SCRIPT_EN` | ClaudeCode | English script surface intake, glossary candidates, and pilot samples | `script-01-claudecode-en-script-intake.md` |
| `SCRIPT_JA` | ClaudeCode | Japanese script surface intake, glossary candidates, and pilot samples | `script-02-claudecode-ja-script-intake.md` |
| `SCRIPT_ZH_CN` | ClaudeCode | Simplified Chinese script surface intake, glossary candidates, and pilot samples | `script-03-claudecode-zh-cn-script-intake.md` |
| `SCRIPT_LOCALIZATION_REVIEW` | ClaudeCode | Cross-language script intake review and go/no-go for bulk translation | `script-04-claudecode-script-localization-review.md` |

Run `SCRIPT_EN`, `SCRIPT_JA`, and `SCRIPT_ZH_CN` in parallel now, but keep them limited to intake plus pilot samples. Run `SCRIPT_LOCALIZATION_REVIEW` only after the three script intake outputs are ready. Do not feed full script translation outputs into `GLOSSARY_CONSISTENCY_REVIEW`; use `SCRIPT_LOCALIZATION_REVIEW` for script-scale consistency and only escalate shared glossary conflicts back to PROJECT_CONTROL_TOWER.
