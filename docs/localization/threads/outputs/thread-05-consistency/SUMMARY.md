# Thread-05 (Glossary Consistency Review) Summary

**Updated 2026-05-06 with PROJECT_CONTROL_TOWER decisions.**

## Inputs validated

- Thread-01 (EN UI) — 7 files, 504 keys, 520 KO strings, 33 source files scanned
- Thread-02 (JA UI) — 7 files, 825 keys, 791 KO strings (≈470 distinct), 36 source files
- Thread-03 (zh-CN UI) — 7 files, 282 keys, 297 KO strings, 35 source files
- Thread-04 (Layout audit) — 6 files, 19 risks (P0:5 P1:10 P2:4)

## Coverage gap (P0)

zh-CN scope is significantly narrower than EN / JA:

- Thread-03 produced 282 keys vs Thread-01 504 / Thread-02 825 — roughly half.
- Thread-03 GLOSSARY_AUDIT marks 39 entries unused (vs EN 21 / JA 23).
- Missing zh-CN coverage on: solution / evidence_phase / re_examination_phase / mediation_phase / testimony / contradiction_pursuit / dossier / notebook / record_summary / hotbar / 8 of 10 perk-related rows / trait / clearance.

Thread-03 must re-run with the same source-area inventory used by Thread-02 before zh-CN integration.

## PROJECT_CONTROL_TOWER decisions applied (2026-05-06)

10 control-tower decisions resolved 9 of the 10 prior open questions plus established a new brand title structure:

| # | Decision |
|---|---|
| Brand | Public title = brand_title + brand_subtitle (locked, 4 locales each). KO=솔로몬의 딜레마: 진실의 재판 / EN=Verdict Zero: Trial of Truth / JA=ソロモンのジレンマ：真実の裁き / zh-CN=真相裁决：零点审判. Project_Solomon kept as internal codename only. |
| 1 | clearance split into permission_level + clearance_rate (EN: Completion Rate / Completion). |
| 3 | dossier deprecated user-facing. Replacements per surface: Records / Case File / Decisive Question / Notes. |
| 4 | 봉합 (Closure) and 화해 (Reconciliation) kept distinct. EN axis label `Reconcile` → `Closure`. |
| 5 | Eyebrow uppercase + letter-spacing English-only. Strip on ko/ja/zh-CN. |
| 6 | KO 타이틀 → 칭호 rename. |
| 7 | objection split: UI noun 异议 + spoken bark 反对！. |
| 8 | zh-CN 체념 = 认命 (NOT 放弃). |
| 9 | EN pretrial_phase = Opening Statements. |
| 10 | EN re_examination_phase = Final Interrogation. |

## Findings counts (revised)

- Total cross-thread findings: 41 (P0:13 P1:21 P2:7) — 9 marked RESOLVED 2026-05-06
- Glossary patches proposed: ~96 row changes (16 modify + ~80 new). Glossary grows from 70 to ~150 rows.
- Long-text recommendations: 49 (added 12 brand-title rows)
- KO source-side cleanups identified: 11
- Open items still requiring user decision: 9 (down from 10) — all linguistic verification of recommended translations

## Top P0 risks for review (revised)

1. **KO source duplications propagate to all locales** — 11 conflicts. KO-side cleanup PR is the prerequisite for everything else.

2. **Brand title structure refactor** — All 4 ad-hoc title literals (`솔로몬의 딜레마` / `Solomon's Dilemma` / `ソロモンのジレンマ` / `所罗门的法庭`) must be replaced with the new 4-row glossary structure. zh-CN Thread-03 must re-emit with `真相裁决：零点审판`.

3. **EN axis label `Reconcile` rename to `Closure`** — Existing `judgeDesk.axes.reconcile = Reconcile` was the EN translation for 봉합. PROJECT_CONTROL_TOWER decision 4 keeps 봉합 (Closure) and 화해 (Reconciliation) distinct, freeing up `Reconcile/Reconciliation` for 화해. Thread-01 EN values must be updated.

4. **Score-axis name collision (탐구 / 판결 / 해결)** — 3 new disambiguating glossary rows required (score_axis_insight / score_axis_authority / score_axis_wisdom). JA / zh-CN values are proposals pending native review.

5. **Composed-string template refactor (BLOCKING)** — All four threads independently flagged the same 8 call sites. Codex must convert to `t(key, params)`.

6. **Numeric step prefix (01 / 02 / 03 / 04)** — Drop on EN / JA / zh-CN, keep on KO.

7. **Hotbar overflow** — Apply Thread-04 CSS + EN compact aliases.

## Files written

- `docs/localization/threads/outputs/thread-05-consistency/CONSISTENCY_FINDINGS.csv` (41 rows, 9 marked RESOLVED)
- `docs/localization/threads/outputs/thread-05-consistency/GLOSSARY_PATCHES.csv` (~250 rows — 16 modify + ~80 new × 3 locales)
- `docs/localization/threads/outputs/thread-05-consistency/FINAL_NORMALIZED_TERMS.csv` (~120 rows — full glossary cross-locale view + brand structure top section)
- `docs/localization/threads/outputs/thread-05-consistency/LONG_TEXT_RECOMMENDATIONS.csv` (53 rows — added 12 brand-title rows)
- `docs/localization/threads/outputs/thread-05-consistency/IMPLEMENTATION_NOTES_FOR_CODEX.md` (10-step PR ordering + control-tower mapping)
- `docs/localization/threads/outputs/thread-05-consistency/SUMMARY.md` (this file)

## Open questions for user (9 remaining — all linguistic verification)

1. **axis_resolution_pole** translations — EN `Closure`, JA `収拾`, zh-CN `弥合` are Thread-05 recommendations. Native review needed.
2. **score_axis_* JA / zh-CN** — 洞察 / 権威 / 知恵 / 智慧 etc. are proposals. Verify with native reviewers.
3. **emotion_resigned JA** — `諦観` recommended; alt `諦め`.
4. **trust_state_*** values — Trust meter bucket labels (3 × 4 locales).
5. **rarity_common JA** — `コモン` (loanword) vs `一般` (kanji).
6. **lie_state_s1 KR** — `동요` shares lemma with emotion_shaken. Verify intentional.
7. **case_file usage scope** — Confirm if any UI surface needs Case File beyond Records / Decisive Question / Notes.
8. **fragment_reconciliation 화해 조각** — Verify KR doesn't conflict with any other surface.
9. **fragment_severity 엄정 vs axis_severity_pole 엄격** — Confirm KR cleanup keeps 엄정 reserved for fragment after axis adopts 엄격.

## Recommended next actions

10-step PR plan in [`IMPLEMENTATION_NOTES_FOR_CODEX.md`](IMPLEMENTATION_NOTES_FOR_CODEX.md):

- PR-A: KO source cleanup + brand title split (prerequisite)
- PR-B: Glossary updates from GLOSSARY_PATCHES.csv (96 row changes)
- PR-C: Composed-string template refactor (BLOCKING)
- PR-D: messages.ts namespace split
- PR-E: KO + EN values land (with brand_full_title + axis label corrections)
- PR-F: Layout / CSS patches (eyebrow rule MANDATORY now)
- PR-G: Re-run Thread-03 with full coverage (BLOCKING for zh-CN merge)
- PR-H: JA values land (brand_full_title applied)
- PR-I: zh-CN values land
- PR-J: Out-of-scope follow-ups

## Disclosure-policy clearance

PASS for Thread-05 review scope. No hidden-truth surfacing introduced. After PRs A through I, run `npm run check:policy` to verify none of the new translations leak truth lexemes — special attention to new `objection_bark` dialogue keys.
