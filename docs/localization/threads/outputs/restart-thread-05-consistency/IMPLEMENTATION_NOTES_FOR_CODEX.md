# IMPLEMENTATION_NOTES_FOR_CODEX — Restart Thread-05 Consistency Review

This is a reviewable proposal package only. Do not modify production files unless PROJECT_CONTROL_TOWER explicitly authorizes.

The restart pass cross-validated 4 thread outputs against the **already-applied** glossary state (137 rows) and 6 namespace-split message files. The previous Thread-05 PR-A through PR-D (KO source cleanup + glossary patches + composed-string refactor + namespace split) appear to have landed already — most of the prior consistency work is now in production.

Below is grouped by integration layer. Apply within each section in any order; cross-section ordering is documented at the end.

---

## 1. Glossary changes (`docs/localization/glossary.csv`)

Apply [`GLOSSARY_PATCHES.csv`](GLOSSARY_PATCHES.csv). Total: ~14 patches (mostly note/status updates + 3 new rows + 1 forbidden-list row).

### Status / note updates (no value change)

- `court_simulation` — note column update: `Title Case in body; ALL-CAPS in genre eyebrows (EN only).` Justifies the existing splash.subtitle EN ALL-CAPS rendering.
- `verdict` — note column update for zh-CN: `zh-CN renders 判决 in record/static contexts, 裁决 in process/action contexts (brand-aligned). Single zh-CN value cannot capture this nuance — call sites override to 裁决 when the action sense applies.`
- `score_axis_insight` / `score_axis_authority` / `score_axis_wisdom` — promote EN status from `needs-rework` → `draft` (Thread-01 confirms high confidence). JA + zh-CN remain `needs-rework` pending native review.
- `project_solomon` — note column reinforcement: `DEPRECATED for user-facing UI. Engine/dev legacy alias only. Linter must reject any user-facing key whose value contains the literal "Project Solomon" (with space).`

### New rows

- `season` — KR `시즌` / EN `Season` / JA `シーズン` / zh-CN `赛季`. Distinct from `session` (one play session). Used in lobby category grouping.
- `forbidden_brand_alternates` — locked=true linter-enforcement marker. Stores forbidden public-title candidates as a comment-only row. Forbidden: EN `Project Solomon` / `Solomon's Dilemma` / `Solomon Court`; JA `ソロモン法廷`; zh-CN `所罗门的法庭` / `所罗门的两难` / `所罗门困境`.
- `demand_bark` — KR `즉답을 요구합니다` / EN `Answer me!` / JA `即答してください！` / zh-CN `请立即回答！`. Mirrors objection_bark pattern. In-character spoken bark distinct from demand_answer (UI noun).
- `slip` — KR `실수` / EN `Slip` / JA `失言` / zh-CN `失言`. Used in `pc.judgeHistoryDrawer.filter.slip`. Verify with native review.

---

## 2. Message value changes (`src/i18n/messages/*.ts`)

### Apply Thread-01 EN patches (23 changed + 5 needs_native_review)

Detailed in [`COVERAGE_REPORT.csv`](../restart-thread-01-en-ui/COVERAGE_REPORT.csv). Highlights:

- Title Case fixes for major UI labels (Display Language / Current Language / Combinable Item Details / Proceed Anyway / Hide Verdict Button / Keep Investigating).
- Em-dash typography on combo / verdict factOption keys.
- Typographic apostrophe `'` on `partyClaimCorrect` + `recordSummary.moreConvincing`.
- `pc.notes.unseen`: `unseen` → `unverified` (matches KO 미확인).
- `pc.combo.ready` / `.potential`: drops redundant `available now` / `keep investigating` suffix.
- `pc.verdictAdvance.minimumVisible` opener smoothing: `Verdict requires` → `A verdict needs`.
- `pc.verdictAdvance.hidden.body` mirror: `unrevealed disputes remain` → `disputes remain hidden`.
- `pc.verdict.responsibility.major`: `Major` → `Primary` (closer to KO 주요 + reads cleaner alongside `Greater`).
- `pc.profile.fragments.needCount` noun-first: `Need at least {count}` → `At least {count} required`.

### Apply Thread-02 JA patches (7 changed)

Detailed in [restart-thread-02-ja-ui/COVERAGE_REPORT.csv](../restart-thread-02-ja-ui/COVERAGE_REPORT.csv). Highlights:

- `home.tagline`: `裁き手` → `裁判官` AND `真実` → `真相` (glossary alignment).
- `pc.verdictAdvance.conditionsMissing`: `真実` → `真相` (glossary truth = 真相 + disclosure-policy lexicon).
- `pc.combo.ready`: 接続可能 → 連結できます (natural game-UI collocation) + ASCII hyphen → em-dash.
- `pc.combo.potential`: 듯 nuance via `ようです` + tighter phrasing.
- `pc.combo.readyMaterialsNotice`: 準備できました → 揃いました.
- `pc.verdict.factOption.partyClaimCorrectWithContradiction`: ASCII hyphen → em-dash.
- `pc.verdict.responsibility.similar`: 近い責任 → 同等の責任.

### Apply Thread-02 JA needs_native_review (7 patches)

Defer to a native review pass. Apply changed patches first; needs_native_review patches can ship with the review pass:

- `steam.authRequired.description`: 確認してから → 確認のうえ; もう一度 → 再度.
- `pc.resolutionConfirm.rollback`: 前 → 元.
- `pc.verdictAdvance.minimumVisible`: 進行できます → 進められます.
- `pc.verdictAdvance.hidden.body`: 明らかな → 明らかになっている.
- `pc.verdict.responsibility.major`: 主な → 主たる.

### Apply Thread-03 zh-CN patches (6 changed)

Detailed in [restart-thread-03-zh-cn-ui/COVERAGE_REPORT.csv](../restart-thread-03-zh-cn-ui/COVERAGE_REPORT.csv). Highlights:

- `home.tagline`: 审判者 → 裁판官 (glossary alignment, needs_native_review for marketing tone).
- `home.countdown.ready`: 即将恢复 → 即将补充 (KO 충전 = recharge, not recover).
- `pc.combo.ready` / `.potential` / `pc.verdict.factOption.partyClaimCorrectWithContradiction`: ASCII hyphen → em-dash for CJK polish.

### NEW — composed-string template refactor for hardcoded toasts (Thread-02 P1)

9 hardcoded KO literals still ship raw (P1 — JA/zh-CN players see KO):

- [PCInteractionPanel.tsx — showToast × 2](src/components/pc/layout/PCInteractionPanel.tsx)
- [PCRightPanel.tsx — showToast × 4](src/components/pc/panels/PCRightPanel.tsx)
- [useActionDispatch.ts — × 2](src/hooks/useActionDispatch.ts)
- [resourceSlice.ts — × 2](src/state/slices/resourceSlice.ts)

Wire via new namespace `pc.toast.*` + `pc.dialogue.system.*` + `pc.resource.recovery.*.failure`. Mapping in Thread-02 SOURCE_STRING_MAP.csv.

### NEW — promote PC_HOME_INTRO_SLIDES to i18n (Thread-01 P0 brand collision)

Hardcoded KO `현대판 솔로몬이 되어 갈등을 해결해주세요.` at [pcHomeShared.ts:134](src/components/pc/home/pcHomeShared.ts) bypasses brand-rule enforcement for non-KO locales. Promote 8 strings (4 slide titles + 4 slide bodies) to keys `pc.home.intro.slide.{digitalCourt|conflict|interrogation|ready}.{title|body}`.

EN values (brand-clean — no Solomon) per Thread-01 SOURCE_STRING_MAP. KO/JA values may keep Solomon metaphor (brand rule allows). zh-CN values must avoid 所罗门 (Thread-03 to provide brand-clean copy).

### RESOLVE numeric step prefix conflict

Thread-01 SOURCE_STRING_MAP proposes `01 Result / 02 Verdict / ...` for EN. Thread-04 P0-4 says drop the numeric prefix on en/ja/zh-CN.

**Resolution: drop the numeric prefix on en/ja/zh-CN, KO retains.** Update Thread-01 EN proposals before applying:
- `pc.resultTab.{result|verdict|epilogue|bonus}` = `Result / Verdict / Epilogue / Bonus`
- `pc.verdict.step.{fact|responsibility|solution|confirm}` = `Disputes / Responsibility / Solution / Verdict`

Same drop applies to JA (`結果 / 判決 / 後日談 / ボーナス` etc.) and zh-CN (`结果 / 判决 / 后日谈 / 奖励` etc.) when those values land.

### NEW — DRY-collapse 4 duplicate full-title keys (Thread-01 question 4)

`app.title`, `brand.fullTitle`, `home.gameTitle`, `settings.about.credits.title` all carry the same locked `Verdict Zero: Trial of Truth`. Refactor 3 of them to read from `brand.fullTitle` to enforce single source of truth. TS pattern: define the value once in `messages/common.ts`, reference from other namespace files.

---

## 3. Component / CSS changes

Apply Thread-04 [`PATCH_SUGGESTIONS_FOR_CODEX.md`](../restart-thread-04-layout-audit/PATCH_SUGGESTIONS_FOR_CODEX.md) in the listed order. Highlights:

### P0 — required for any locale switch to render correctly

- **P0-1** locale-aware text-wrap base (`html[lang^="en"]` word-break / overflow-wrap; `html[lang^="ja"|"zh"]` letter-spacing 0)
- **P0-2** scope eyebrow `text-transform:uppercase + letter-spacing:0.2em` to `html[lang^="en"]` only — the only fix for the `RESOLVED 5` rule (English-only uppercase eyebrow) currently being violated in CSS
- **P0-3** `.pc-home-v2__hero h1` controlled wrap (drop `white-space:nowrap`; allow 2-line on Steam Deck)
- **P0-4** PCSettingsPanel CATEGORIES sidebar → 10 `settings.category.*` keys + label clamp
- **P0-5** PCSettingsPanel AboutSection → ~10 `settings.about.*` keys
- **P0-6** PCVerdictScreen STEPS + footer → `verdict.step.*` + `verdict.footer.*` keys + flex-wrap on footer
- **P0-7** PCBottomDock hotbar slots / special / advance / overlay / emotion → new `hotbar.*` namespace + 2-line clamp on `.slot-nm` + icon-only collapse on `.hotbar-special-btn` below 1320px
- **P0-8** PCApp splash language fallback — DECISION REQUIRED. Recommend Option A (small icon-only selector inside `.pc-splash__content`)

### P1 — required for production polish

- **P1-1** PCIntroSlides — translate buttons + flex-wrap brand band
- **P1-2** PCHomeScreen — migrate ModeCard / DepthHeader / InfoCard / desk tabs + AxisRow poles + leaderboard rows ellipsis
- **P1-3** PCResultScreen — TABS + rating + meta cards + CSS guards
- **P1-4** PCCourtLayout — `court.phase.*` keys + nowrap+ellipsis on `.pc-play-phase`
- **P1-5** PCInteractionPanel — `interactionPanel.action.*` keys + drop emoji prefixes (render via `<PCSvgIcon>`)
- **P1-6** ScreenPresetConfirmModal — `pc.resolutionConfirm.{title|confirm|cancel}` + min-width:96px on inline buttons
- **P1-7** Steam Deck breakpoint (`@media (max-width:1280px) and (max-height:900px)`)

### P2 — polish

- **P2-1** PCTestConsole — `debug.testConsole.*` keys + EN compact (Token/Skill/Court)
- **P2-2** JudgeObservationSection — decouple stringly-typed Set keys from labels
- **P2-3** CJK font-size floor (`html[lang^=ja|zh]` slot-nm / hotbar-special-btn / settings sidebar badge → 11px)

---

## 4. Native-review-only items

These items ship as proposals and require a native reviewer pass before lock. Do NOT block PROJECT_CONTROL_TOWER integration on them — apply current values now and revisit during native pass.

### EN

- `pc.verdict.responsibility.similar` (`Comparable responsibility on both sides`) — Thread-01 needs_native_review: KO 비슷한 책임 nuance.
- `pc.combo.potential` reframing (`{count} leads still missing — keep investigating`) — Thread-01 needs_native_review.
- `pc.home.intro.slide.*.title|body` (8 entries) — Thread-01 needs_native_review on brand-clean replacements.
- `settings.about.credits.description` rewording — Thread-01 needs_native_review.
- Solution category labels (14 entries `verdict.solutionCategory.*`) — design sign-off required (out of locale review scope).

### JA

- 7 needs_native_review patches (see section 2 above).
- `axis_resolution_pole` JA value `収拾` — confirm vs `鎮静` / `弥縫`.
- `score_axis_insight/authority/wisdom` JA values `洞察 / 権威 / 知恵` — confirm.
- `rarity_common` JA `コモン` (loanword) vs `一般` (kanji).
- `emotion_resigned` JA `諦観` vs `諦め`.
- `trust_state_*` JA values.
- `slip` JA value `失言`.

### zh-CN

- `home.tagline` 化身现代裁판官… marketing tone.
- `axis_resolution_pole` zh-CN value `弥合` — confirm vs `平息`.
- `score_axis_insight/authority/wisdom` zh-CN values `洞察 / 权威 / 智慧` — confirm.
- `trust_state_*` zh-CN values.
- `slip` zh-CN value `失言`.
- `pc.gameplay.*` cut-in body literary→game-UI polish (Thread-03 LONG_TEXT_RISKS rows 13-17).

### KO source cleanup (file separately, non-translation)

- `법정 장악 ↔ 법정 지배력` — same court-control resource. Canonicalize to `법정 장악`. Thread-01 §10 + Thread-04 P2 row 25 (PCTestConsole inline literal) + Thread-02.
- `lie_state_s1` (`동요`) shares lemma with `emotion_shaken` (`동요`) — verify intentional.
- `타이틀 → 칭호` rename across judge-progression surfaces (already in glossary; verify no stale `타이틀` literals remain in source).

---

## 5. Cross-section ordering (recommended PR sequence)

Each step unblocks the next.

1. **Glossary updates** (section 1) — 14 patches; small, low-risk PR.
2. **CSS i18n base + eyebrow scope** (P0-1, P0-2) — single CSS PR. Fixes the most-visible CSS rule violations across all locales without touching components.
3. **Composed-string + EN value patches** (Thread-01 23 changed) — single i18n PR. No new keys, just value updates.
4. **JA + zh-CN value patches** (Thread-02 7 changed + Thread-03 6 changed) — single i18n PR.
5. **Hardcoded toast/dialogue migration** (section 2 NEW) — adds `pc.toast.*` namespace + wires call sites.
6. **PC_HOME_INTRO_SLIDES promotion** (Thread-01 P0 brand collision) — adds 8 keys + brand-clean translations.
7. **Numeric step prefix resolution** — applies the drop on en/ja/zh-CN values (small i18n PR).
8. **PCSettingsPanel migration** (Thread-04 P0-4 + P0-5) — sidebar + AboutSection.
9. **PCVerdictScreen migration** (Thread-04 P0-6) — STEPS + footer.
10. **PCBottomDock migration** (Thread-04 P0-7) — hotbar + emotion + advance banner.
11. **Splash language fallback** (Thread-04 P0-8) — DECISION REQUIRED before this step.
12. **PCHomeScreen + PCResultScreen + PCCourtLayout + PCInteractionPanel migrations** (Thread-04 P1-1 through P1-5).
13. **DRY-collapse 4 full-title keys** — small refactor.
14. **Steam Deck breakpoint + CJK font-size floor** (Thread-04 P1-7 + P2-3).
15. **JudgeObservationSection decouple** (Thread-04 P2-2) — flagged for sequencing because Set lookups break on translation.
16. **Native-review pass** (section 4) — ships per locale as native reviewers complete.

---

## 6. Verification commands

After each PR:

```
npm run qa:fast               # type check + tests
npm run check:policy          # disclosure-policy lexeme leak detection
```

Special attention after PC_HOME_INTRO_SLIDES promotion + JA value PR + zh-CN value PR — `npm run check:policy` catches truth-lexeme leakage in dialogue-channel strings (objection_bark, demand_bark, combo summary).

Visual QA per Thread-04 [`VISUAL_QA_NOTES.md`](../restart-thread-04-layout-audit/VISUAL_QA_NOTES.md). 18 components × 4 locales × 3 resolutions ≈ 216 captures.

---

## 7. Open decisions for PROJECT_CONTROL_TOWER

These require explicit user / control-tower approval before integration:

1. **Numeric step prefix** (Thread-04 Q3): drop on en/ja/zh-CN, KO retains? — recommend YES.
2. **Splash language fallback** (Thread-04 P0-8 + Q1): Option A (in-screen icon selector) or Option B (launcher / Steam locale handoff)? — recommend Option A.
3. **EN brand eyebrow strategy** (Thread-04 Q2): keep English-only uppercase brand constants (RESULT DOSSIER / VERDICT STUDIO / etc.) as-is, with non-EN strip per P0-2? — recommend YES (matches RESOLVED decision 5).
4. **ModeCard NORMAL MODE badge vs season.name** (Thread-04 Q4): split classes (`__badge--brand` for EN constants + `__badge--locale` for season.name)? — recommend split.
5. **Compact hotbar aliases storage** (Thread-04 Q5): glossary `compact` column or t() suffix keys? — recommend t() suffix keys (`hotbar.slot.fact.compact`); JA + zh-CN do not need compact aliases.
6. **Migration sequence for stringly-typed keys** (Thread-04 Q6): PC_HOME_INTRO_SLIDES → EMOTION_LABELS / TYPE_LABELS → observation Set? — recommend YES (this order).
7. **Steam Deck minimum confirmation** (Thread-04 Q7): 1280×800 absolute minimum, no 1024×768 target? — recommend confirm 1280×800 minimum.
8. **forbidden_brand_alternates linter** — wire into `scripts/validate-glossary.mjs` (already untracked in repo)? Builds reject any user-facing key whose value contains forbidden literals.
