# Thread 02 (JA UI Translation) — Summary

## Counts

- **Source files scanned**: 36 (home/, settings/, result/, verdict/, debug/, hotbar/, panels/, layout/, observation/, progression/, profile/, app/PCApp.tsx)
- **Korean strings extracted**: 791 occurrences (~470 distinct KO strings; the rest are duplicate (file × KO) pairs)
- **Proposed message keys**: 825 (`pc.*` namespace, fresh additions on top of the 9 existing keys in [src/i18n/messages.ts](src/i18n/messages.ts))
- **Long-text risks flagged**: 22 (P0:0  P1:9  P2:13)
- **Glossary audit (76 rows = 69 existing + 7 new-coverage)**:
  - clean: 40
  - needs-normalization: 6
  - locked-violation: 0
  - unused: 23
  - new-coverage: 7
- **Glossary delta proposals**: 28 rows (high:14  medium:13  low:1) — covers 1 modification (solution) + 1 KO-source normalization (record_summary) + 7 new entries across locales

## Files written

- [docs/localization/threads/outputs/02-ja-ui-translation/MESSAGE_KEY_PROPOSALS.ts](docs/localization/threads/outputs/02-ja-ui-translation/MESSAGE_KEY_PROPOSALS.ts)
- [docs/localization/threads/outputs/02-ja-ui-translation/SOURCE_STRING_MAP.csv](docs/localization/threads/outputs/02-ja-ui-translation/SOURCE_STRING_MAP.csv)
- [docs/localization/threads/outputs/02-ja-ui-translation/LINE_WRAP_RISKS.md](docs/localization/threads/outputs/02-ja-ui-translation/LINE_WRAP_RISKS.md)
- [docs/localization/threads/outputs/02-ja-ui-translation/GLOSSARY_AUDIT.csv](docs/localization/threads/outputs/02-ja-ui-translation/GLOSSARY_AUDIT.csv)
- [docs/localization/threads/outputs/02-ja-ui-translation/GLOSSARY_DELTA.csv](docs/localization/threads/outputs/02-ja-ui-translation/GLOSSARY_DELTA.csv)
- [docs/localization/threads/outputs/02-ja-ui-translation/IMPLEMENTATION_NOTES_FOR_CODEX.md](docs/localization/threads/outputs/02-ja-ui-translation/IMPLEMENTATION_NOTES_FOR_CODEX.md)
- [docs/localization/threads/outputs/02-ja-ui-translation/SUMMARY.md](docs/localization/threads/outputs/02-ja-ui-translation/SUMMARY.md)

## Top 3 risks for review

1. **Template-interpolation refactor required (P1)**. Six locations in code build sentences via `+` concatenation that does not survive translation: verdict responsibility (5 keys), verdict fact options 1/3 (party-name suffix), record judgment direction (believeA/B), home result lead sentence, equip-dialog body, and perk-required suffix. Codex must convert these to `t(key, { partyA, partyB, partyName, title, name, relation })` BEFORE wiring JA values, or the JA labels render in wrong order. Details: [IMPLEMENTATION_NOTES_FOR_CODEX.md §1](docs/localization/threads/outputs/02-ja-ui-translation/IMPLEMENTATION_NOTES_FOR_CODEX.md).
2. **KO source inconsistencies inflate every locale's table**. KO source uses two names for the same resource (법정 장악 ↔ 법정 지배력) and the same investigation token (조사 토큰 ↔ 조사 자원), and renders the panel title differently from glossary (기록 정리 vs 기록 요약). Each unfixed inconsistency forces every locale (en/ja/zh-CN) to handle 2 strings instead of 1. Recommend KO canonicalization first — see [IMPLEMENTATION_NOTES_FOR_CODEX.md §6](docs/localization/threads/outputs/02-ja-ui-translation/IMPLEMENTATION_NOTES_FOR_CODEX.md).
3. **7 new glossary entries needed**. PC UI introduces concepts that do not exist in `glossary.csv`: `court_control` (法廷掌握), `free_question` (自由質問, distinct from `free_interrogation` 自由尋問), `investigation_stage` (調査ステージ, distinct from `evidence_stage` 証拠段階), `decisive_question` (決定的質問, supersedes `dossier` 調書 in actual UI), `judge_fragment` (判決の欠片), `judge_title` (称号), and possibly `investigation_resource` (synonym to drop). 6 of these are high-confidence additions used 2–11× each. Without them, EN/JA/zh-CN translators in parallel threads will pick divergent terms. See [GLOSSARY_DELTA.csv](docs/localization/threads/outputs/02-ja-ui-translation/GLOSSARY_DELTA.csv).

## Open questions for user

1. **Branding scope**: Should JA in-game title render as `ソロモンのジレンマ` (PCHomeScreen hero) and `ソロモン法廷` (settings credit) while `pc.app.title` keeps `Project Solomon` (currently locked in glossary)? Confirm whether Steam store branding overrides this.
2. **`퍼크` term**: Glossary draft is `パーク` (kept in proposals). Some native JA reviewers may prefer `特性` for slot copy. Lock or keep draft?
3. **`솔로몬 법정` (game in-tagline)**: Currently rendered `ソロモン法廷`. Alternative: `ソロモンの法廷`. Native review preference?
4. **`봉합` axis right pole**: Rendered `修復` (restoration). Alternatives: `融和`, `仲裁`. Native review preferred — this is part of the judge axis triplet (原則 ↔ 修復) and changes the gameplay-axis identity.
5. **KO source normalization**: Will CT canonicalize `법정 장악`/`법정 지배력` and `조사 토큰`/`조사 자원` before this batch lands, or do localized files need to track both?
6. **`record_summary` glossary patch**: Glossary KO source = `기록 요약`, but UI uses `기록 정리`. Update glossary KO → 기록 정리 (and JA → `記録の整理`)?
7. **`PCGameplayOverlay.tsx` transition + evidence-result body strings**: Out of scope per brief, but they ship to players. Spin off a `JA_SYSTEM_FEEDBACK` thread post-batch?
