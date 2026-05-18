# GPT Pro 5.5 Translation Brief: Non-Dialogue Text

Use `translation_priority_inventory.csv` as the source inventory for the first pass. Use `non_dialogue_text_inventory.csv` only as an audit/backstop if you need to inspect lower-priority hardcoded source literals.

## Goal

Rewrite non-dialogue localization for English, Japanese, and Simplified Chinese so it reads like native UI/game text, not literal Korean courtroom machine translation.

Character A/B dialogue scripts are intentionally out of scope. Do not rewrite party A/B spoken dialogue unless a row is explicitly included in this CSV.

## Columns

- `id`: stable row identifier.
- `category`: source category.
- `source`: source file or folder.
- `case_id`: empty for global UI, otherwise active case id.
- `key_path`: source key/path.
- `ko`: Korean source/fallback text.
- `en`, `ja`, `zh-CN`: current translations to review and replace.
- `notes`: extraction context.

## Translation Rules

1. Preserve placeholders exactly, including braces: `{count}`, `{party}`, `{name}`, `{phase}`, etc.
2. Preserve stable IDs, case IDs, speaker IDs, evidence IDs, and schema terms when they appear in `key_path`; translate only visible text columns.
3. Translate by function and local convention, not by Korean literal wording.
   - Korean `블랙박스` for a car recording device should become context-appropriate terms such as `dashcam` in English, `ドライブレコーダー` in Japanese, and `行车记录仪` in Simplified Chinese.
   - `오피스텔` needs locale-aware handling. In English, use `officetel` only if the Korean setting matters; otherwise clarify as `studio apartment/officetel` on first use where needed.
   - `재판관` in this game is closer to a neutral adjudicator/judge. Choose one term per locale and keep it consistent.
4. UI labels should be concise. System and judge text can be natural but should stay clear and controlled.
5. Evidence names should sound like in-game evidence objects, not legal pleadings.
6. Avoid over-formal legalese unless the Korean source is explicitly formal.
7. Keep tone consistent with a serious courtroom mystery game.

## Deliverable

Return a CSV with the same row order and the same columns, replacing only `en`, `ja`, and `zh-CN`. If a source row needs a Korean wording fix, add a short reviewer note separately rather than changing `ko`.
