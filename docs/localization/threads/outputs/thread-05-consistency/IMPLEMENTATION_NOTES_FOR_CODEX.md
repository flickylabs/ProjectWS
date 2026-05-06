# IMPLEMENTATION_NOTES_FOR_CODEX — Thread-05 Glossary Consistency Review

**Updated 2026-05-06 with PROJECT_CONTROL_TOWER decisions.**

This thread is a review across Threads 01 (EN) / 02 (JA) / 03 (zh-CN) / 04 (Layout). It does not produce new translations of its own. Codex should treat the artefacts in this directory as the **single source of truth** when integrating those four threads.

## 0. PROJECT_CONTROL_TOWER decisions applied

The following 10 control-tower decisions are reflected in the artefacts. No further user approval required for these items.

| # | Decision | Where reflected |
|---|---|---|
| 1 | clearance split: `permission_level` (security) + `clearance_rate` (completion %). EN prefers `Completion Rate` (compact `Completion`). | GLOSSARY_PATCHES rows clearance / permission_level / clearance_rate |
| 2 | Brand title structure: `internal_project_name` + `brand_title` + `brand_subtitle` + `brand_full_title` (all locked). zh-CN = 真相裁决：零点审判. | GLOSSARY_PATCHES brand_* rows + FINAL_NORMALIZED_TERMS top section |
| 3 | dossier deprecated user-facing. Replacements: Records / Case File / Decisive Question / Notes per surface. | GLOSSARY_PATCHES dossier deprecation + decisive_question / case_file / records / notes new rows |
| 4 | 봉합 (Closure) and 화해 (Reconciliation) kept distinct. Existing EN UI label `judgeDesk.axes.reconcile = Reconcile` must be renamed `Closure` to free `Reconciliation` for 화해. | GLOSSARY_PATCHES axis_resolution_pole + fragment_reconciliation rows |
| 5 | Eyebrow uppercase + letter-spacing English-only. Strip on ko/ja/zh-CN. Global letter-spacing remains 0 unless justified. | CONSISTENCY_FINDINGS eyebrow row + CSS patch in PR-F |
| 6 | KO 타이틀 → 칭호 rename across judge-progression surfaces. | GLOSSARY_PATCHES judge_title row |
| 7 | objection split: UI noun `异议` (zh-CN) + spoken bark `反对！` (zh-CN dialogue). NOT 我提出异议 for compact UI. | GLOSSARY_PATCHES objection + objection_bark rows |
| 8 | zh-CN 체념 = 认命 (NOT 放弃). 默许 only for tacit-permission. | GLOSSARY_PATCHES emotion_resigned zh-CN row |
| 9 | EN pretrial_phase = Opening Statements. | GLOSSARY_PATCHES pretrial_phase EN row |
| 10 | EN re_examination_phase = Final Interrogation. | GLOSSARY_PATCHES re_examination_phase EN row |

## 1. Brand title structure (NEW critical detail)

The brand structure splits into 4 distinct locked rows. UI surfaces consume them as follows:

| Surface | Key | Glossary value |
|---|---|---|
| `home.gameTitle` (home hero) | `t('home.gameTitle')` | `brand_full_title` value |
| `splash.title` (optional split rendering) | `t('splash.title')` | `brand_title` value |
| `splash.subtitle` (optional split rendering) | `t('splash.subtitle')` | `brand_subtitle` value |
| `settings.about.credits` (credits header) | prefix with `brand_full_title` | `brand_full_title` value |
| Steam app metadata / package.json `name` / repo identifier | `internal_project_name` | `Project_Solomon` (locked, never localized) |

**Storage decision**: Store `brand_full_title` as a single complete string per locale (do NOT compute at runtime). KO/EN use Roman colon `:`. JA/zh-CN use full-width colon `：`. Per-locale punctuation is part of the locked value.

```
brand_full_title.ko = "솔로몬의 딜레마: 진실의 재판"
brand_full_title.en = "Verdict Zero: Trial of Truth"
brand_full_title.ja = "ソロモンのジレンマ：真実の裁き"
brand_full_title.zh-CN = "真相裁决：零点审判"
```

**REJECTED candidates** (do not use anywhere):
- EN: `Project Solomon` (public-facing), `Solomon's Dilemma`, `Solomon Court`
- ja: `ソロモン法廷` (drop from credits)
- zh-CN: `所罗门的法庭`, `所罗门的两难`

## 2. PR ordering (10 steps)

Apply in this order. Each step unblocks the next.

### PR-A — Source-side cleanup (Korean) + brand split

1. **Brand title split** — replace ad-hoc title literals with new keys:
   - [PCApp.tsx:132](src/app/PCApp.tsx#L132) hardcoded `솔로몬의 딜레마` → `t('home.gameTitle')`
   - Settings credits `솔로몬 법정` → `t('settings.about.credits.title')` referencing `brand_full_title`
   - Splash if currently uses `Project Solomon` → split into `t('splash.title')` + `t('splash.subtitle')` or render `t('home.gameTitle')` directly
   - `package.json` `name` field → keep as `project_solomon` (internal_project_name); add a comment noting this is locked
2. **KR canonicalizations**:
   - 법정 장악 ↔ 법정 지배력 → 법정 장악
   - 조사 토큰 ↔ 조사 자원 → 조사 토큰
   - 기록 요약 (glossary KR) → 기록 정리 (UI canonical)
   - 엄격 ↔ 엄정 → 엄격 (axis pole), 엄정 (fragment label only)
   - 심판 축 ↔ 판결(균형) → 판결 균형
   - 타이틀 → 칭호 (judge progression)
3. Add `자유 질문 / 조사 단계 / 결정적 질문` as the canonical KR labels for new glossary rows (already used in UI; just confirm they remain).

### PR-B — Glossary updates (`docs/localization/glossary.csv`)

Apply [`GLOSSARY_PATCHES.csv`](GLOSSARY_PATCHES.csv).

- **Existing rows modified**: 16 (clearance rename, record_summary KR/EN/JA/zh-CN, solution JA, investigation_token zh-CN, trust zh-CN, 4× phase EN renames, 8× phase suffix drops, dossier deprecation)
- **New rows added**: ~80 (4× brand structure + permission_level + clearance_rate + court_control + free_question + investigation_stage + decisive_question + case_file + judge_fragment + judge_title + 3× score_axis_* + 4× special-action + 1 objection + 1 objection_bark + truth_progress + combination + records + notes + 3× trust_state_* + 4× rarity_* + 5× emotion_* + 6× lie_state_s* + 9× fragment_* + 6× axis_*_pole + 10× relationship_*)

Glossary grows from 70 to ~150 rows.

### PR-C — Composed-string template refactor (BLOCKING)

Convert call sites listed in CONSISTENCY_FINDINGS row "composed-string template refactor".

Specific targets:
- [PCImportantNotesSection.tsx ~L147](src/components/pc/panels/PCImportantNotesSection.tsx) + [PCLeftPanel.tsx ~L117](src/components/pc/panels/PCLeftPanel.tsx) — `(미확인 항목 N개)` → `t('pc.notes.unseen', { count })`
- `pcHomeShared.ts` — `${moreCount}외 ...` → `t('pc.common.moreCount', { count })`
- [PCHomeScreen.tsx ~L645](src/components/pc/home/PCHomeScreen.tsx) — `${seconds}초 후 ...` → `t('pc.home.resolutionConfirm.body', { count: seconds })`
- `verdictAdvancePrompt.ts` — drop `bodyHead/bodyMid/bodyTail` keys, use single template `pc.verdictAdvance.modal.body` with `{revealed, hidden}`
- [PCRecordSummary.tsx ~L63](src/components/pc/layout/PCRecordSummary.tsx) — `${partyName} 측의 주장이...` → `t('pc.recordSummary.moreConvincing', { party: partyName })`
- [PCVerdictScreen.tsx:162-165](src/components/pc/verdict/PCVerdictScreen.tsx) + [:696-700](src/components/pc/verdict/PCVerdictScreen.tsx#L696-L700) — party-name interpolation
- [PCJudgeProgressionPanel.tsx:553](src/components/pc/profile/PCJudgeProgressionPanel.tsx#L553) — drop KO particle 을(를)
- [PCJudgeProgressionShared.tsx:97](src/components/pc/progression/PCJudgeProgressionShared.tsx#L97) — `name + ' 필요'` → `t('pc.perk.required', { name })`

Block JA + zh-CN value PRs until this is merged.

### PR-D — messages.ts namespace split

Per Thread-02 §3 spec. Split into `src/i18n/messages/{home,common,intro,case,settings,result,verdict,profile,court,dock,actions,panels,layout,observation,testConsole}.ts` namespace files. Re-export from `src/i18n/messages.ts`.

### PR-E — KO + EN values land

- Apply Thread-01 MESSAGE_KEY_PROPOSALS.ts.
- **Override Thread-01 EN values per Thread-05 decisions**:
  - `home.gameTitle` = `Verdict Zero: Trial of Truth` (was `Solomon's Dilemma`)
  - `splash.title` = `Verdict Zero` (split rendering option) or use full title
  - `splash.subtitle` = `Trial of Truth` or current `COURT SIMULATION GAME` eyebrow if kept
  - Drop `01 / 02 / 03 / 04` numeric prefix from result.tab.* and verdict.step.*
  - Switch hotbar slot/special-btn to compact aliases at narrow buckets (Facts/Motive/Empathy/Free Q/Evidence/Witness, Separate/Confidential/Immediate)
  - Result donut clearance label = `Completion Rate` (compact: `Completion`) — NOT `Clearance`
  - judgeDesk.axes.reconcile = `Closure` — NOT `Reconcile` (frees Reconcile/Reconciliation for 화해 fragment)
  - Pretrial phase = `Opening Statements` (was `Pretrial Phase`)
  - Re-examination phase = `Final Interrogation` (was `Re-examination Phase`)
  - Drop `Dossier` user-facing — replace with surface-specific `Records / Case File / Decisive Question / Notes`

### PR-F — Layout / CSS patches (Thread-04 P0 + P1 + Thread-05 eyebrow rule)

- Apply Thread-04 [`PATCH_SUGGESTIONS_FOR_CODEX.md`](../thread-04-layout/PATCH_SUGGESTIONS_FOR_CODEX.md) P0-1 through P1-7.
- **Update Thread-04 P2-1 eyebrow CSS to be MANDATORY (was optional)** per PROJECT_CONTROL_TOWER decision 5:

```css
html[lang]:not([lang^="en"]) body.pc-mode [class*="__eyebrow"],
html[lang]:not([lang^="en"]) body.pc-mode [class*="__kicker"] {
  text-transform: none;
  letter-spacing: 0.04em;
}
```

- Critical: P0-1 locale-aware text-wrap base, P0-2 hotbar slot 2-line clamp, P0-3 special-btn icon-only collapse, P0-4 numeric-prefix drop, P0-5 hall-of-fame ellipsis.
- Brand title containers: ensure title + subtitle layout fits home/splash/store-like surfaces. Apply `min-width: 0; overflow-wrap: anywhere` on the hero copy block to handle JA/zh-CN density.

### PR-G — Re-run Thread-03 with full coverage (BLOCKING for zh-CN merge)

- Thread-03 covered 282 keys vs Thread-01's 504 and Thread-02's 825. 39 glossary entries marked unused.
- Use Thread-02 SOURCE_STRING_MAP.csv as master KO key list.
- Fill zh-CN values for every key Thread-02 covered.
- **zh-CN home_brand**: `home.gameTitle` MUST be `真相裁决：零点审判` (reject `所罗门的法庭` and `所罗门的两难`).
- Apply zh-CN-specific decisions from PROJECT_CONTROL_TOWER:
  - emotion_resigned = `认命` (NOT `放弃`)
  - objection UI noun = `异议`, dialogue bark = `反对！`
  - investigation_token = `调查点数` (NOT `调查代币`)
  - trust = `信任` (NOT `信任度`)

### PR-H — JA values land

- Apply Thread-02 MESSAGE_KEY_PROPOSALS.ts.
- **JA home_brand**: `home.gameTitle` = `ソロモンのジレンマ：真実の裁き` (full-width colon).
- Verify hoisted maps from Thread-02 §2 are converted to `t()` accessors.

### PR-I — zh-CN values land

- Apply expanded Thread-03 output.
- Run `npm run check:policy` after.

### PR-J — Out-of-scope follow-ups

- Solution category labels (14 entries) need design sign-off before any locale ships.
- PCGameplayOverlay transition body text → JA_SYSTEM_FEEDBACK follow-up thread.
- Spoken in-character lines wired via `objection_bark` style — already covered in PR-B.

## 3. KO source canonicalization summary

| Conflict | Canonical | Affected files |
|---|---|---|
| 법정 장악 ↔ 법정 지배력 | 법정 장악 | PCCourtLayout.tsx:319+458, PCInteractionPanel.tsx:685, plus token / profile / testConsole resource labels |
| 조사 토큰 ↔ 조사 자원 | 조사 토큰 | PCCourtLayout token button |
| 기록 요약 ↔ 기록 정리 | 기록 정리 | Glossary KR field is wrong; UI is correct |
| 자유심문 (mode) vs 자유 질문 (slot) | Both — different concepts | Add `free_question` glossary row alongside `free_interrogation` |
| 증거 단계 (gauge) vs 조사 단계 (panel) | Both — different concepts | Add `investigation_stage` glossary row alongside `evidence_stage` |
| 엄격 ↔ 엄정 | 엄격 (axis pole), 엄정 (fragment-only) | PCHomeScreen verdict-axis pole vs PCJudgeProgressionShared trait |
| 심판 축 ↔ 판결(균형) | 판결 균형 | PCTraitEnhancePanel vs PCHomeScreen |
| 봉합 vs 화해 | DISTINCT (PROJECT_CONTROL_TOWER 4) | 봉합 = axis_resolution_pole / 화해 = fragment_reconciliation |
| 타이틀 → 칭호 | 칭호 (PROJECT_CONTROL_TOWER 6) | PCJudgeProgressionPanel and all judge-progression surfaces |
| 솔로몬의 딜레마 / 솔로몬 법정 / Project Solomon (public title) | brand_full_title structure (PROJECT_CONTROL_TOWER 2) | All title surfaces |
| 클리어런스 (permission) ↔ 클리어율 (completion %) | Two distinct concepts (PROJECT_CONTROL_TOWER 1) | result-screen donut renders 클리어율; rename glossary clearance → permission_level |

## 4. Glossary changes summary (numeric)

- **Modify existing rows**: 16
- **Add new rows**: ~80 (including 4× brand structure)
- **Total glossary impact**: ~96 row changes
- **Glossary size**: 70 → ~150 rows

## 5. CSS / layout integration

The Thread-04 [`PATCH_SUGGESTIONS_FOR_CODEX.md`](../thread-04-layout/PATCH_SUGGESTIONS_FOR_CODEX.md) is the authoritative CSS spec. Three places depend on translation values:

- **P0-2 hotbar slot** — also needs Thread-01 EN compact aliases as new t() keys.
- **P0-3 hotbar special-btn** — title= attribute already populated; relies on `kbd` shortcuts (Q/W/E) for accessibility.
- **P0-4 numeric prefix drop** — extend `messages.ts` per Thread-04 §P0-4 spec, or use Thread-05 [`FINAL_NORMALIZED_TERMS.csv`](FINAL_NORMALIZED_TERMS.csv) row "result.tab.* / verdict.step.* numeric prefix" verbatim.
- **P2-1 eyebrow** — now MANDATORY per PROJECT_CONTROL_TOWER decision 5 (was optional in Thread-04).

## 6. Disclosure-policy verification

All 3 translation threads cleared their static UI scope as policy-compliant:

- Thread-01: no hidden-truth lexeme leaks.
- Thread-02: §4 flagged scripted system messages straddling UI/dialogue boundary — must run `npm run check:policy` after JA value PR.
- Thread-03: §7 explicit clearance — UI chrome only.

Thread-05 confirms no new policy concerns introduced. After PRs A through I, run:

```
npm run check:policy
```

Special attention to:
- `pc.combo.summary.*` (12 strings)
- `pc.dialogue.contradiction.body`
- `pc.dialogue.empty`
- `pc.actions.system.shaken`
- New `objection_bark` keys

## 7. Open items still requiring user decision

After PROJECT_CONTROL_TOWER decisions resolved 9 of 10 prior open questions, only the following remain. Each is `requires_user_decision=true` in [`GLOSSARY_PATCHES.csv`](GLOSSARY_PATCHES.csv).

1. **axis_resolution_pole linguistic verification** — EN `Closure`, JA `収拾`, zh-CN `弥合` are recommendations. Native review needed before lock.
2. **score_axis_* JA / zh-CN values** — `洞察 / 権威 / 知恵 / 智慧` etc. are proposals. Verify with JA / zh-CN native reviewers before lock.
3. **emotion_resigned JA** — `諦観` recommended; alt `諦め`. Native review.
4. **trust_state_* values** — Trust meter bucket labels (3 entries × 4 locales). Proposals only.
5. **rarity_common JA** — `コモン` (loanword) vs `一般` (kanji). Verify with JA team.
6. **lie_state_s1 KR** — `동요` shares lemma with emotion_shaken. Verify intentional.
7. **case_file usage** — Confirm if any UI surface needs Case File beyond Records / Decisive Question / Notes.
8. **fragment_reconciliation KR vs axis_resolution_pole KR overlap** — 화해 vs 봉합 confirmed distinct, but verify fragment_reconciliation 화해 조각 KR doesn't conflict with any other surface.
9. **fragment_severity KR** — Uses 엄정. Confirm KR cleanup keeps 엄정 reserved for fragment after axis_severity_pole adopts 엄격.

## 8. Verification commands

After all PRs land:

```
npm run qa:fast               # type check + tests
npm run check:policy          # disclosure-policy lexeme leak detection
npm run validate:glossary     # if/when scripts/validate-glossary.mjs is wired (untracked file detected)
```

Visual QA per Thread-04 [`VISUAL_QA_NOTES.md`](../thread-04-layout/VISUAL_QA_NOTES.md): 14 screens × 3 resolutions × 3 locales = 126 captures.

Additional brand title visual QA targets:
- Home hero (4 locales × 3 resolutions = 12 captures) — verify title + subtitle stacking
- Splash screen (4 locales × 3 resolutions = 12 captures)
- Settings credits (4 locales × 1 default = 4 captures)
- Steam Deck home (4 locales = 4 captures)

## 9. Source files referenced by this review

- Thread-01 outputs: [`docs/localization/threads/outputs/01-en-ui-translation/`](../01-en-ui-translation/)
- Thread-02 outputs: [`docs/localization/threads/outputs/02-ja-ui-translation/`](../02-ja-ui-translation/)
- Thread-03 outputs: [`docs/localization/threads/outputs/03-zh-cn-ui-translation/`](../03-zh-cn-ui-translation/)
- Thread-04 outputs: [`docs/localization/threads/outputs/thread-04-layout/`](../thread-04-layout/)
- Glossary baseline: [`docs/localization/glossary.csv`](../../glossary.csv)
- Style guide: [`docs/localization/style-guide.md`](../../style-guide.md)
- PROJECT_CONTROL_TOWER decisions: 2026-05-06 (in conversation history)
