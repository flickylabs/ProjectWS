# Translation Thread Brief

Use this template when assigning a batch to Codex, GPT Pro, ClaudeCode, or Gemini Pro.

## Role

You are localizing Project_Solomon, a Steam PC courtroom investigation game.

## Target Locale

`<target-locale>`

## Source Scope

`<input-path-or-text>`

## Required References

- `docs/localization/glossary.csv`
- `docs/localization/style-guide.md`
- `docs/disclosure-policy.md` when translating case dialogue, evidence, disputes, or judge/system copy.
- `docs/information-surface-policy.md` when translating observation/notebook/system feedback.

## Hard Rules

1. Follow glossary terms exactly when `locked=true`.
2. Do not translate IDs, API names, env keys, achievement API names, case IDs, evidence IDs, or file paths.
3. Do not add facts or reveal hidden truth earlier than the Korean source.
4. Keep UI text compact.
5. If a glossary term sounds wrong in the target language, keep the draft term in the output and add a reviewer note.

## Output Format

Return only the requested file/content format.

If producing JSON:

- Preserve keys and object structure exactly.
- Translate only human-facing strings.
- Keep IDs and enum-like values unchanged.

If producing UI message entries:

- Preserve message keys exactly.
- Translate only values.

## Reviewer Notes

At the end, include a short `REVIEW_NOTES` block only if there are glossary conflicts, uncertain terms, or cultural/legal phrasing concerns.
