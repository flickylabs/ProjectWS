# Project Control Tower

This document defines the role of the main Codex coordination thread.

## Main Thread Role

Thread name:

- `PROJECT_CONTROL_TOWER`

Target:

- Codex

Responsibilities:

- Overall Steam release readiness management.
- Localization management across glossary, UI translation, layout QA, and later case-content localization.
- Case generation management across generator rebuild, Korean pilot cases, QA, and runtime promotion.
- Integration of outputs from ClaudeCode, GPT Pro, Gemini Pro, and additional Codex worker threads.
- Final code/documentation application and validation.
- Build, QA, and release command coordination.

## Subthread Ownership

Subthreads may produce proposals, drafts, audits, or implementation patches, but `PROJECT_CONTROL_TOWER` remains responsible for:

- Deciding whether an output is ready to apply.
- Reconciling conflicts between threads.
- Updating source-of-truth documents.
- Running or requesting final validation.
- Preventing unrelated dirty worktree changes from being reverted or overwritten.

## Current Subthread Families

| Family | Example thread | Target | Controlled by |
| --- | --- | --- | --- |
| Localization | `EN_UI_TRANSLATION`, `JA_UI_TRANSLATION`, `ZH_CN_UI_TRANSLATION` | ClaudeCode | `PROJECT_CONTROL_TOWER` |
| Localization Review | `GLOSSARY_CONSISTENCY_REVIEW`, `I18N_LAYOUT_AUDIT` | ClaudeCode | `PROJECT_CONTROL_TOWER` |
| Case Generation | `CASE_GENERATOR_REBUILD` | Codex | `PROJECT_CONTROL_TOWER` |
| Code Integration | Implementation/refactor/build validation threads | Codex | `PROJECT_CONTROL_TOWER` |

## Promotion Rule

Drafts from worker threads should not be treated as production-ready until reviewed by `PROJECT_CONTROL_TOWER`.

Examples:

- Translation proposals are not final until integrated into `src/i18n/messages.ts` and visually/build validated.
- Case drafts are not runtime data until promoted from `tmp/case-generation/` into `src/data/**`.
- Glossary suggestions are not canonical until applied to `docs/localization/glossary.csv` and validated with `npm run localization:glossary`.
