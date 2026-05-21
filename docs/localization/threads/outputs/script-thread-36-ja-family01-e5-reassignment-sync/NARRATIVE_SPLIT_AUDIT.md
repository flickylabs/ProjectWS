# Narrative split audit

Forbidden d-2 JA lexemes checked: `自筆`, `手書き`, `90:10`, `90対10`, `90`, `偽造`, `自分の取り分を減ら`, `取り分`, `シェア`, `下書き`, `練習本`, `60に減ら`.

Scoped d-2 forbidden-lexeme hits: 0.

| # | Anchor | Layer | Audit result |
|---|---|---|---|
| 1 | `d-2.truthDescription` | generated case | Procedural only: `午前 1 次受付`, `午後の修正受付`, `進行圧力`, `母の状態が不安定`. No self-draft / 90:10 / forgery language. |
| 2 | `d-2.verdictOptions.truth` | generated case | Verdict explains the 60:40 public notarized result through reception and correction stages. No hidden self-draft ratio. |
| 3 | `truthTable.t-2` | generated case | Truth row now states d-2 as public notarization procedure intervention. No d-5 evidence trace. |
| 4 | `combinationLab.outputs.dc-2` | generated case | Discovery text shifted to `公証手続への介入`, `午前 1 次受付`, `午後の修正受付`, `母の状態`, `ジョンフの催促`. |
| 5 | `scriptedText a|d-2|S3|fact_pursuit` | scriptedText | A-side doubt is procedural: `公証手続に弟が深く介入`, `進行を急かした責任`. |
| 6 | `scriptedText b|d-2|S3|motive_search` | scriptedText | B-side admission uses `午後の修正段階`, `進行を急かした`, `母の状態と進行圧力`. |
| 7 | `interrogation_answers a-d-2-S5-fact_pursuit-changed_direction-v1` | scriptedAngles | Cross-reference stays procedural: `弟が進行を急かし午後修正へ持ち込んだ方向`. |
| 8 | `special_scripts d-2 confessions` | scriptedAngles sidecar | Four confession strings use `午後の修正公証`, `進行を急かした`, `手続介入の責任`. |
| 9 | `d-5.truthDescription` | generated case | Required d-5 hard-evidence trace present: `自筆下書きに残した 90:10` -> `公証 60:40`. |
| 10 | `truth-leak-matrix d-2/d-5 JA` | non-dialogue matrix | d-2 JA hidden entries are procedural only; d-5 JA hidden entries hold the self-draft 90 -> notarized 60 shrink narrative. |

Additional cross-dispute guard:

- d-1, d-3, and d-4 touched cross-reference text did not newly acquire 自筆 / 90:10 / 偽造 equivalents.
- d-5 is the only updated anchor layer that intentionally carries the 90:10 -> 60:40 narrative.
