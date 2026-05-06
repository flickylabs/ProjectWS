# Restart Thread-05 (Glossary Consistency Review) Summary

**Date: 2026-05-06.** Cross-validation pass over restart Thread-01 / 02 / 03 / 04 against the **already-applied** glossary state (137 rows) and 6 namespace-split message files.

## Input files checked

| Thread | Files | Notes |
|---|---|---|
| Thread-01 (EN UI) | 6 files in `restart-thread-01-en-ui/` | 55 keys reviewed: 32 ok / 23 changed / 5 needs_native_review / 0 needs_codex_refactor |
| Thread-02 (JA UI) | 6 files in `restart-thread-02-ja-ui/` | 55 keys: 41 ok / 7 changed / 7 needs_native_review / 0 refactor |
| Thread-03 (zh-CN UI) | 6 files in `restart-thread-03-zh-cn-ui/` | 55 keys: 49 ok / 6 changed; ~250 hardcoded uncovered flagged |
| Thread-04 (Layout audit) | 5 files in `restart-thread-04-layout-audit/` | 18 components, 26 risks (P0:8 P1:14 P2:4) |
| Glossary baseline | `docs/localization/glossary.csv` (137 rows) | Up from 70 — most prior Thread-05 patches landed |
| Namespace-split messages | `src/i18n/messages/{common,settings,home,court,verdict,profile}.ts` | Split landed (PR-D from prior cycle) |

## Total findings by priority

| Priority | Count | Notes |
|---|---|---|
| **P0** | **8** | All blocking — see Blocking Issues below |
| P1 | 19 | Should fix before release |
| P2 | 14 | Polish / native review / nice-to-have |
| **Total** | **41** | — |

## Blocking issues (P0)

1. **brand_full_title verification** — PASS. All 4 locales render the locked brand title in 4 surface keys. No fix needed (potential DRY refactor noted).
2. **pcHomeShared.ts:134 brand collision** — Hardcoded KO `현대판 솔로몬이 되어` outside i18n bypasses brand-rule enforcement. EN/zh-CN MUST avoid Solomon (KO/JA may keep). Promote PC_HOME_INTRO_SLIDES (8 strings) to i18n.
3. **Numeric step prefix conflict** — Thread-01 SOURCE_STRING_MAP keeps `01 Result / 02 Verdict / ...` for EN. Thread-04 P0-4 says drop the numeric prefix on en/ja/zh-CN. **Direct conflict** — recommend Thread-04 path.
4. **PCSettingsPanel CATEGORIES sidebar** — 9 hardcoded KO sidebar items + `준비 중` badge. Most-visible bug after language switch.
5. **PCSettingsPanel AboutSection** — Only credits.title + credits.description localized; 정보/버전/빌드/엔진/크레딧/라이선스 still KO.
6. **PCVerdictScreen + PCBottomDock zero t() calls** — STEPS / footer / hotbar slots / special / advance banner all inline KO. Most-played in-play surface unlocalized.
7. **CSS eyebrow rule violates RESOLVED 5** — `.pc-css :4565-4574` applies uppercase + 0.2em tracking to all locales. Distorts hangul/kana/hanzi. Already-resolved decision (English-only uppercase eyebrow) being violated in current CSS.
8. **.pc-home-v2__hero h1 nowrap** — EN brand title (28 chars) clips on Steam Deck 1280×800 because of white-space:nowrap.
9. **PCApp splash language fallback** — PCLanguageSelector removed; first-launch users with mismatched browser locale stuck. Decision required.

(P0-2 through P0-9 are all addressable via Thread-04 [`PATCH_SUGGESTIONS_FOR_CODEX.md`](../restart-thread-04-layout-audit/PATCH_SUGGESTIONS_FOR_CODEX.md) P0-1 through P0-8.)

## Glossary patch count

**14 patches total** in [`GLOSSARY_PATCHES.csv`](GLOSSARY_PATCHES.csv):

| Type | Count | Items |
|---|---|---|
| Note column update (no value change) | 4 | court_simulation / verdict (zh-CN process/record split note) / project_solomon (deprecation note) |
| Status promotion (needs-rework → draft) | 3 | score_axis_insight / score_axis_authority / score_axis_wisdom EN values |
| Status remain needs-rework | 6 | score_axis_* JA + zh-CN (pending native review) |
| New row | 4 | season / forbidden_brand_alternates (linter) / demand_bark / slip |

The previous Thread-05 cycle's heavy glossary patches (96 row changes) have already been applied; this restart pass produces only incremental updates.

## User decisions needed

8 decisions for PROJECT_CONTROL_TOWER (detailed in [`IMPLEMENTATION_NOTES_FOR_CODEX.md`](IMPLEMENTATION_NOTES_FOR_CODEX.md) §7):

1. **Numeric step prefix** — drop on en/ja/zh-CN, KO retains? — recommend YES.
2. **Splash language fallback** — in-screen icon selector vs launcher handoff? — recommend in-screen.
3. **EN brand eyebrow strategy** — keep English-only uppercase, scope rest via P0-2 CSS? — recommend YES.
4. **ModeCard NORMAL MODE badge vs season.name** — split CSS classes? — recommend split.
5. **Compact hotbar aliases storage** — glossary column or t() suffix keys? — recommend t() suffix keys.
6. **Stringly-typed key migration sequence** — PC_HOME_INTRO_SLIDES → EMOTION_LABELS / TYPE_LABELS → observation Set? — recommend YES (this order).
7. **Steam Deck minimum confirmation** — 1280×800 absolute, no 1024×768 target? — recommend confirm 1280×800 minimum.
8. **forbidden_brand_alternates linter wiring** — into `scripts/validate-glossary.mjs`? — recommend YES.

## Confirmed alignment with RESOLVED decisions (no contradictions found)

All 9 prior PROJECT_CONTROL_TOWER resolved decisions hold:

- ✅ clearance split (permission_level + clearance_rate=Completion Rate)
- ✅ dossier deprecated (engine-internal only; UI uses Records / Case File / Decisive Question / Notes)
- ✅ 봉합 (Closure) and 화해 (Reconciliation) distinct
- ✅ English-only uppercase eyebrow (Thread-04 P0 still flags as needing CSS scope fix; not a contradiction, just an implementation gap)
- ✅ KO 타이틀 → 칭호 rename (judge_title row applied)
- ✅ objection split (UI noun 异议 + bark 反对！) — Thread-03 adds verb-button form 提出异议 as a 3-tier extension, not a contradiction
- ✅ zh-CN 体念 → 认命 (emotion_resigned row applied)
- ✅ EN pretrial_phase = Opening Statements (applied)
- ✅ EN re_examination_phase = Final Interrogation (applied)
- ✅ Brand 4-row structure (internal_project_name + brand_title + brand_subtitle + brand_full_title) all locked, all locales correct in current i18n

## Files written

- `docs/localization/threads/outputs/restart-thread-05-consistency/CONSISTENCY_FINDINGS.csv` (41 rows)
- `docs/localization/threads/outputs/restart-thread-05-consistency/GLOSSARY_PATCHES.csv` (14 rows)
- `docs/localization/threads/outputs/restart-thread-05-consistency/FINAL_NORMALIZED_TERMS.csv` (~120 rows — full glossary cross-locale view + brand structure + 4 critical message values)
- `docs/localization/threads/outputs/restart-thread-05-consistency/LONG_TEXT_RECOMMENDATIONS.csv` (50 rows)
- `docs/localization/threads/outputs/restart-thread-05-consistency/IMPLEMENTATION_NOTES_FOR_CODEX.md` (4 sections — glossary / message values / component-CSS / native-review-only + ordering + decisions)
- `docs/localization/threads/outputs/restart-thread-05-consistency/SUMMARY.md` (this file)

## Recommended next actions

16-step PR sequence in [`IMPLEMENTATION_NOTES_FOR_CODEX.md`](IMPLEMENTATION_NOTES_FOR_CODEX.md) §5. Critical path:

1. Glossary updates (small)
2. CSS i18n base + eyebrow scope (Thread-04 P0-1 + P0-2)
3. Composed-string + EN value patches
4. JA + zh-CN value patches
5. Hardcoded toast/dialogue migration
6. PC_HOME_INTRO_SLIDES promotion (P0 brand collision)
7. Numeric step prefix resolution
8-10. PCSettingsPanel + PCVerdictScreen + PCBottomDock migrations
11. Splash language fallback (DECISION REQUIRED before this step)
12-14. PCHomeScreen / PCResultScreen / PCCourtLayout / PCInteractionPanel migrations + breakpoints
15. JudgeObservationSection decouple
16. Native-review pass

## Disclosure-policy clearance

PASS for Thread-05 review scope. No hidden-truth surfacing introduced. After PRs land, run `npm run check:policy` — special attention to new `objection_bark` / `demand_bark` dialogue keys and `pc.combo.summary.*` system feedback strings.
