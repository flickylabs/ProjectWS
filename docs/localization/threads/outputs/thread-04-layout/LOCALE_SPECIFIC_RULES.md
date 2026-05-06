# LOCALE_SPECIFIC_RULES

Only the rules that the global locale-aware base in [GLOBAL_RULES.md](./GLOBAL_RULES.md) cannot cover. Each locale should be selected via `html[lang^="…"]` (already wired through `I18nProvider`).

## en

- **Word breaking:** apply `word-break: normal; overflow-wrap: break-word; hyphens: auto;` so legalese ("Confidential Protection", "Investigation Token", "Re-examination Phase") can break inside fixed widths. Already part of GLOBAL_RULES §1.
- **Compact glossary aliases:** several controls cannot fit the canonical English term. Add short aliases used only in the compact context, surfaced via `t()` keys:
  - hotbar slots: `Facts` / `Motive` / `Empathy` / `Free Q` / `Evidence` / `Witness`
  - hotbar special: `Separate` / `Confidential` / `Immediate`
  - test console resource head: `Token` / `Skill` / `Court`
- **Tabs / steps:** drop the numeric prefix. Use noun-only labels (`Result`, `Verdict`, `Epilogue`, `Bonus`).
- **Confirm buttons:** Yes / No should still be at least 96px wide via the `.pc-inline-button` rule from GLOBAL_RULES §8 — don't let them shrink to chiclets.
- **Advance banner:** condense to a single short sentence ("Ready: Verdict phase") instead of repeating "Advance to Verdict" twice.

## ja

- **Tracking:** force `letter-spacing: 0` for any element whose ko version uses `letter-spacing: 0.04em+`. Already part of GLOBAL_RULES §1.
- **Line breaks:** add `line-break: strict;` so line breaks don't fall inside 熟語 (kanji compounds). Combine with `overflow-wrap: anywhere` for safety.
- **Font size floor:** 11px (no kanji below 11px). Already part of GLOBAL_RULES §5.
- **UI verb selection:** prefer `尋問` (per style guide) but allow `質問` for the 4-char hotbar slot label `自由 質問` to keep the slot compact.
- **Eyebrow labels:** prefer the "keep eyebrows English-only" path (GLOBAL_RULES §7 option A) — `RESULT DOSSIER` translates poorly and the wide tracking distorts kana.

## zh-CN

- **Tracking:** force `letter-spacing: 0` for the same reason as ja.
- **Line breaks:** `word-break: keep-all; overflow-wrap: anywhere;` is the right baseline (CJK punctuation supplies break opportunities).
- **Font size floor:** 11px. Already part of GLOBAL_RULES §5.
- **Glossary terms:** `讯问` for interrogation, `调解` for mediation, per style guide. Propagate to all hotbar / verdict / result labels.
- **Eyebrow labels:** same recommendation as ja — keep English or strip the uppercase + tracking.
- **Numbers:** the existing numeric step prefix `01` reads fine in zh-CN, but the noun-only form (`结果 / 判决 / 后日谈 / 奖励`) is shorter and recommended for narrow chips.

## ko (source maintenance)

No new rules required — KO is the source and the existing `word-break: keep-all` baseline is correct. Two cleanups worth doing:

- Replace the inline Korean string literals in the `STEPS` / `TABS` / `MANAGEMENT_TABS` arrays with `t()` keys so the same arrays render correctly in other locales.
- Audit `pc.css` `text-transform: uppercase` rules and decide which eyebrows are branding (English forever) vs. translatable.
