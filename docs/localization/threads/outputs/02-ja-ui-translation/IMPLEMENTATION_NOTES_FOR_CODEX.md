# JA UI Translation — Implementation Notes for Codex

## 1. String concatenation → template interpolation (P1)

Several spots build sentences via JS concatenation that won't survive translation. Convert to single template strings using `t(key, values)` per the existing API ([src/i18n/index.tsx:18](src/i18n/index.tsx#L18)).

| Location | Current pattern | Proposed key | Notes |
|---|---|---|---|
| [src/components/pc/verdict/PCVerdictScreen.tsx:162-165](src/components/pc/verdict/PCVerdictScreen.tsx#L162-L165) | `이 쟁점은 사실과 다릅니다 — ${otherParty} 측 주장이 맞습니다` | `pc.verdict.fact.option1` (`{partyName}` interpolation) | Korean order does not survive in JA. Single template wins. |
| [src/components/pc/verdict/PCVerdictScreen.tsx:696-700](src/components/pc/verdict/PCVerdictScreen.tsx#L696-L700) | 5 responsibility-direction labels concatenated with party name prefix | `pc.verdict.responsibility.{aMajor,aGreater,balanced,bGreater,bMajor}` with `{partyA}` / `{partyB}` | Apply `t(key, { partyA: caseData.duo.partyA.name, partyB: caseData.duo.partyB.name })`. |
| [src/components/pc/layout/PCRecordSummary.tsx:63-70](src/components/pc/layout/PCRecordSummary.tsx#L63-L70) | `partyName + ' 측 주장 지지'` | `pc.record.judgment.{believeA,believeB}` with `{partyA}` / `{partyB}` | |
| [src/components/pc/home/PCHomeScreen.tsx:911](src/components/pc/home/PCHomeScreen.tsx#L911) | `본 사건은 {A}와(과) {B}의 {relation} 분쟁으로, ...` | `pc.result.lead.before` with `{partyA}` / `{partyB}` / `{relation}` | Verify all three params are interpolated. |
| [src/components/pc/profile/PCJudgeProgressionPanel.tsx:553](src/components/pc/profile/PCJudgeProgressionPanel.tsx#L553) | `'두 슬롯이 모두 사용 중입니다.' + ' ' + title + '을(를) 어느 슬롯에 장착할지 선택하세요.'` | `pc.profile.equipDialog.body` with `{title}` | Drop the KO particle adjustment 을(를) — JA does not need it. |
| [src/components/pc/progression/PCJudgeProgressionShared.tsx:97](src/components/pc/progression/PCJudgeProgressionShared.tsx#L97) | `name + ' 필요'` | `pc.perk.required` with `{name}` | |

## 2. Hoist mapping objects through `useI18n()`

Multiple components keep their own KO `as const` mapping objects that ship as translation-blind hardcoded strings.

| File | Map | Replacement strategy |
|---|---|---|
| [src/components/pc/hotbar/PCBottomDock.tsx](src/components/pc/hotbar/PCBottomDock.tsx) | `EMOTION_LABELS`, `TYPE_LABELS` | Replace with `t('pc.emotion.<emotion>')` / `t('pc.evidenceType.<type>')` accessor — same enum keys map to localized labels. |
| [src/components/pc/layout/PCDialogueLog.tsx](src/components/pc/layout/PCDialogueLog.tsx) | emotion + speaker maps | Use `pc.emotion.*` and `pc.speaker.*`. |
| [src/components/pc/panels/PCImportantNotesSection.tsx](src/components/pc/panels/PCImportantNotesSection.tsx) | speaker name map | Use `pc.speaker.*`. |
| [src/components/pc/panels/PCLeftPanel.tsx](src/components/pc/panels/PCLeftPanel.tsx) | `TYPE_LABELS` (evidence types) | Use `pc.evidenceType.*`. |
| [src/components/pc/layout/PCCourtLayout.tsx](src/components/pc/layout/PCCourtLayout.tsx) | `PHASE_LABELS` | Use `pc.phase.*`. |
| [src/components/pc/verdict/PCVerdictScreen.tsx](src/components/pc/verdict/PCVerdictScreen.tsx) | `LIE_STATE_LABEL` | Use `pc.lieState.s0..s5`. |
| [src/components/pc/result/PCClearanceDetailPopup.tsx](src/components/pc/result/PCClearanceDetailPopup.tsx) | `CATEGORY_LABELS` | Use `pc.clearance.cat.*`. |
| [src/components/pc/observation/JudgeObservationHistoryDrawer.tsx](src/components/pc/observation/JudgeObservationHistoryDrawer.tsx) | observation/notebook filter maps | Use `pc.observation.filter.*` / `pc.notebook.filter.*`. |
| [src/components/pc/progression/PCJudgeProgressionShared.tsx](src/components/pc/progression/PCJudgeProgressionShared.tsx) | fragment + trait maps | Use `pc.fragment.*` (+ `.short`) / `pc.trait.*`. |

These maps currently produce a 4× string-table cost (one copy per file × KO duplication). Replacing them with `t()` reduces redundancy and keeps localization complete.

## 3. Split `messages.ts` by namespace (recommended)

Adding ~470 keys to a single `as const` object will explode IDE autocompletion latency and `MessageKey` union evaluation. Suggested split:

```
src/i18n/
  index.tsx
  locales.ts
  messages.ts             ← thin re-export layer
  messages/
    home.ts               ← pc.home.*
    common.ts             ← pc.common.*
    intro.ts              ← pc.intro.*
    case.ts               ← pc.case.* / pc.relationship.* / pc.session.* / pc.difficulty.*
    settings.ts           ← pc.settings.*
    result.ts             ← pc.result.* / pc.fragmentOverlay.* / pc.clearance.*
    verdict.ts            ← pc.verdict.* / pc.lieState.*
    profile.ts            ← pc.profile.* / pc.perk.* / pc.trait.* / pc.fragment.*
    court.ts              ← pc.court.* / pc.phase.* / pc.token.* / pc.combo.* / pc.action.*
    dock.ts               ← pc.dock.* / pc.emotion.* / pc.evidenceType.*
    actions.ts            ← pc.actions.* / pc.deferredVerdict.*
    panels.ts             ← pc.panels.* / pc.notes.* / pc.speaker.*
    layout.ts             ← pc.dialogue.* / pc.dispute.* / pc.gameplay.* / pc.interaction.* / pc.record.* (+ pc.verdict.advance.*)
    observation.ts        ← pc.observation.* / pc.notebook.*
    testConsole.ts        ← pc.testConsole.*
```

The `MessageKey` type can be derived from a union of all namespace types via `keyof typeof homeMessages | keyof typeof verdictMessages | …`.

## 4. Borderline scripted system messages

These look like dialogue lines but are static UI flavor pushed via `setDialogue` — they are NOT case content. Translate them, but verify with `npm run check:policy` (disclosure-policy) afterwards because they are routed through the dialogue channel.

- `pc.actions.objection.dialogue` (`'이의 있습니다.'`)
- `pc.actions.demand.dialogue` (`'즉답을 요구합니다.'`)
- `pc.actions.system.shaken` (`'{partyName}의 반응이 흔들립니다.'`)
- All `pc.combo.summary.*` (12 strings) — system feedback overlay
- `pc.dialogue.empty`, `pc.dialogue.contradiction.body`

If any of these contain hidden-truth lexemes after translation, re-run `npm run check:policy` and surface the policy hit.

## 5. Out-of-scope (not in this batch)

- **PCGameplayOverlay.tsx** transition body text (`TRANSITION_META.title/body`) and per-evidence-result descriptors. These read like in-character flavor copy and may overlap with disclosure-policy hidden-truth gating. Recommend a separate `JA_SYSTEM_FEEDBACK` thread once UI scope ships. Lines [src/components/pc/layout/PCGameplayOverlay.tsx:14-29](src/components/pc/layout/PCGameplayOverlay.tsx#L14-L29) and [src/components/pc/layout/PCGameplayOverlay.tsx:48-64](src/components/pc/layout/PCGameplayOverlay.tsx#L48-L64).
- **caseData**-driven strings (party names, dispute titles, evidence body). Handled by case JSON localization separately.
- **Console/debug strings** inside `if (import.meta.env.DEV)` blocks. Excluded except `PCTestConsole` itself, which ships gated by `VITE_PC_TEST_CONSOLE`.
- **Achievement UI** — not encountered in source areas listed by the brief; confirm there is no separate achievement screen worth scanning.

## 6. KO source inconsistencies to flag back to CT

Fixing these in the KO source first will shrink the EN/JA/zh-CN tables by ~20 rows.

| KO term A | KO term B (synonym) | Recommendation | Affected keys |
|---|---|---|---|
| 법정 장악 | 법정 지배력 | Canonicalize to 법정 장악 | `pc.profile.resource.control`, `pc.token.control`, `pc.token.button.control`, `pc.action.special.controlUse`, `pc.testConsole.resource.control` |
| 조사 토큰 | 조사 자원 | Canonicalize to 조사 토큰 | `pc.token.button.investigation` (only mismatch — all other usages already 조사 토큰) |
| 자유심문 (glossary) | 자유 질문 (UI) | These are different concepts (mode vs slot) — keep both, but add 자유 질문 as a glossary entry (see GLOSSARY_DELTA) | `pc.dock.free.title`, `pc.dock.slot.free` |
| 기록 요약 (glossary) | 기록 정리 (UI) | Update glossary KO source to 기록 정리; UI is correct | `pc.record.title`, `pc.court.recordSummary`, `pc.token.recovery.records.title` |
| 증거 단계 (glossary) | 조사 단계 (UI in PCInteractionPanel) | Different concept — add `investigation_stage` as new glossary entry | `pc.interaction.investigation.stage`, `pc.interaction.investigation.locked` |

## 7. CSS / layout risks

- **Resolution buckets**: verify on M (900–1079px) and S (768–899px) at minimum — Steam Deck is XS class.
- **`pc.verdict.responsibility.*`**: party names ≥ 6 JA chars push the 2-line cap. `.pc-verdict-screen__responsibility-option` likely needs `text-wrap: balance` or +1 line allowance.
- **`pc.dock.special.{...}.cta`**: keep `⚡-1` / `⚖️-1` glyphs verbatim. Make sure `t()` does not strip emoji. Verify font fallback covers `⚖️` on Windows builds; use system emoji font if missing.
- **`pc.intro.slide*.body`**: `.pc-splash` line-height may need `1.6` for JA. Check that Hiragana/Katakana/Kanji fall through to `Noto Sans JP` if `Pretendard` does not cover.
- **`document.documentElement.lang = locale`** is already set in [src/i18n/index.tsx:50](src/i18n/index.tsx#L50). No CSS change needed for `lang` selectors unless you add JA-specific tracking (`letter-spacing`).

## 8. `messages.ts` size

After this batch:
- ~470 new keys × ~50 bytes/locale × 4 locales = ~90 KB string table.
- Recommend: namespace split (item 3 above) + tree-shake unused locales at build time if Steam release ships a single locale per region.

## 9. Recheck items after applying translations

1. `npm run check:policy` — surface-only hidden-truth lexeme leak detection. Translations of `pc.combo.summary.*` and `pc.dialogue.contradiction.body` route through dialogue channel.
2. `npm run qa:fast` — type check + tests.
3. Visual QA on L / M / S / XS buckets for the P1 strings listed in [LINE_WRAP_RISKS.md](docs/localization/threads/outputs/02-ja-ui-translation/LINE_WRAP_RISKS.md).
4. Confirm `localStorage.getItem(LOCALE_STORAGE_KEY)` round-trip — manual change to `ja` should persist.
5. Confirm Steam Deck rendering of the verdict responsibility row with longest known party name.

## 10. PR slicing recommendation

Do not land all 470 keys in one PR. Suggested split:

1. **PR-1** — Infrastructure: split `messages.ts` into namespace files; adopt template-interpolation refactors from item 1; no visible KO change.
2. **PR-2** — Add JA values for `pc.common`, `pc.home`, `pc.case`, `pc.relationship`, `pc.session`, `pc.difficulty`, `pc.intro`, `pc.lobby`. Wire `t()` calls in PCHomeScreen / PCIntroSlides / PCLobbyOverlay / PCCaseBrowser / PCCaseBrief.
3. **PR-3** — `pc.settings.*`. Wire PCSettingsPanel.
4. **PR-4** — `pc.verdict.*`, `pc.lieState.*`, `pc.result.*`, `pc.clearance.*`, `pc.fragmentOverlay.*`. Wire PCVerdictScreen + PCResultScreen + overlays.
5. **PR-5** — `pc.profile.*`, `pc.perk.*`, `pc.trait.*`, `pc.fragment.*`. Wire PCJudgeProgressionPanel + sub-panels.
6. **PR-6** — `pc.court.*`, `pc.phase.*`, `pc.token.*`, `pc.combo.*`, `pc.dock.*`, `pc.emotion.*`, `pc.evidenceType.*`, `pc.actions.*`, `pc.deferredVerdict.*`. Wire PCCourtLayout + PCBottomDock + PCActionsPanel.
7. **PR-7** — `pc.panels.*`, `pc.notes.*`, `pc.speaker.*`, `pc.dialogue.*`, `pc.dispute.*`, `pc.gameplay.*`, `pc.interaction.*`, `pc.record.*`, `pc.verdict.advance.*`. Wire PCLeftPanel / PCRightPanel / PCImportantNotesSection / PCCaseTimelineSection / PCDialogueLog / PCDisputeRibbon / PCGameplayOverlay / PCInteractionPanel / PCRecordSummary / verdictAdvancePrompt.
8. **PR-8** — `pc.observation.*`, `pc.notebook.*`, `pc.testConsole.*`. Wire JudgeObservationSection / JudgeNotebookSection / JudgeObservationHistoryDrawer / PCTestConsole.

Each PR should run `npm run qa:fast` and `npm run check:policy`. PR-2 onwards should also include a manual JA spot-check of the screens it touches.
