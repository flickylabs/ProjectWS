# Localization Workspace

This folder is the source of truth for Project_Solomon localization management.

## Files

- `glossary.csv`: canonical term glossary. Use this before translating UI, case content, Steam copy, prompts, or achievements.
- `style-guide.md`: language and tone rules.
- `thread-brief-template.md`: prompt template for external translation/review threads.
- `translation-queue.csv`: batch tracker for Codex, GPT Pro, ClaudeCode, and Gemini Pro work.
- `script-localization-architecture.md`: control-tower draft for script/dialogue sidecar storage and validation.

## Tool Labels

Use these labels consistently in task records:

- `Codex`
- `GPT Pro`
- `ClaudeCode`
- `Gemini Pro`

If Claude Web is used instead of Claude Code, still record the owner as `ClaudeCode` because the review expectation is identical for this project.

## Workflow

1. Add or update glossary terms first.
2. Run `npm run localization:glossary`.
3. Create a queue row in `translation-queue.csv`.
4. Send `thread-brief-template.md` plus the relevant source file and glossary rows to the assigned thread.
5. Save the returned output under the agreed output path.
6. Review against `style-guide.md`.
7. Mark the queue row `reviewed` or `needs-rework`.

## Locale Codes

- `ko`: Korean source and fallback.
- `en`: English.
- `ja`: Japanese.
- `zh-CN`: Simplified Chinese.

Do not introduce `zh` as a generic locale. Use `zh-CN` unless Traditional Chinese is explicitly added later.
