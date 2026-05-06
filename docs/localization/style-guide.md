# Localization Style Guide

## Global Principles

- Source locale is `ko`. Fallback locale is also `ko`.
- Keep product names, IDs, API names, achievement IDs, case IDs, file paths, and env keys unchanged.
- Translate meaning and game function, not Korean sentence shape.
- UI labels should be short enough for fixed PC panels and Steam Deck.
- Dialogue may be idiomatic, but must preserve evidence gating and hidden-truth policy.
- Do not add new facts, motives, legal claims, or emotional interpretation during translation.

## Glossary Priority

When a glossary entry exists, use it unless the target-language reviewer marks it `needs-rework`.

Priority order:

1. `locked=true` glossary term.
2. Reviewed locale term.
3. Draft glossary term.
4. Translator proposal with a note.

## English

- Prefer clear game UI language over formal legalese.
- Use title case for major UI labels and achievement names.
- Avoid overusing `court` where `case`, `hearing`, or `verdict` is clearer.
- Keep party labels neutral: `Party A`, `Party B`, `Witness`, `Judge`.

## Japanese

- Use natural game UI Japanese, not literal Korean legal phrasing.
- Keep labels compact for UI panels.
- Default player-role term: `裁判官`.
- Use `尋問` for interrogation/questioning context unless a softer UI label is needed.

## Simplified Chinese

- Use Simplified Chinese only for `zh-CN`.
- Keep labels compact and direct.
- Default player-role term: `裁判官`.
- Use `讯问` for interrogation/questioning context and `调解` for mediation.

## Korean Source Maintenance

- Korean source text should remain natural and non-translationese.
- Keep the existing truth-disclosure rules intact:
  - Do not expose hidden truth in judge/system/dossier text before the allowed stage.
  - Preserve `surfaceName`, `surfaceText`, and evidence-stage distinctions.

## Review Checklist

- Glossary terms match `glossary.csv`.
- No stable IDs are translated.
- UI strings fit compact PC panels.
- Case dialogue preserves speaker intent and information boundaries.
- Target text does not sound machine-translated.
- Notes are added for terms that need native review.
