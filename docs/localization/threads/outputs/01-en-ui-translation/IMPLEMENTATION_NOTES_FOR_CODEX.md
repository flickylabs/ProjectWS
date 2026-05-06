# IMPLEMENTATION_NOTES_FOR_CODEX — Thread 01-en-ui-translation

Hand-off notes for Codex when applying this translation package.

## 1. Where to add the keys

- Append all keys from `MESSAGE_KEY_PROPOSALS.ts` to
  [`src/i18n/messages.ts`](src/i18n/messages.ts).
- The current `MessageKey` type derives from `keyof typeof ko`, so:
  1. First grow the `ko` map with the verified Korean source text from
     `SOURCE_STRING_MAP.csv` (column `source_text`).
  2. Mirror keys for `en` / `ja` / `zh-CN` (their values come from each
     locale’s thread output).
  3. The `ja` and `zh-CN` rows must exist for every key — fall back to
     the EN value if the locale thread is not yet applied (engine already
     has `messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key`,
     so technically a missing key is OK, but TypeScript will fail —
     supply the EN string in `ja` / `zh-CN` until those threads land).

## 2. Module-level constants that must move into component scope

These exist as bare module constants today and must be converted to
component-scoped `useMemo` getters before they can be translated:

- [`PHASE_LABELS`](src/components/pc/layout/PCCourtLayout.tsx#L26-L37)
- [`STEPS`](src/components/pc/verdict/PCVerdictScreen.tsx#L38-L43)
- [`SORTS`](src/components/pc/home/PCHomeScreen.tsx#L41-L46)
- [`HISTORY_RESULT_TABS`](src/components/pc/home/PCHomeScreen.tsx#L48-L53)
- [`EMOTION_LABELS`](src/components/pc/hotbar/PCBottomDock.tsx#L24-L30)
  (also in [PCDialogueLog.tsx:16-21](src/components/pc/layout/PCDialogueLog.tsx#L16-L21))
- [`LIE_STATE_LABEL`](src/components/pc/verdict/PCVerdictScreen.tsx#L29-L36)
- [`TYPE_LABELS`](src/components/pc/hotbar/PCBottomDock.tsx#L32-L37)
  (also in [PCLeftPanel.tsx:16-44](src/components/pc/panels/PCLeftPanel.tsx#L16-L44))
- [`SOLUTION_CATEGORY_LABELS`](src/components/pc/verdict/PCVerdictScreen.tsx#L104-L119)
- [`CATEGORIES`](src/components/pc/settings/PCSettingsPanel.tsx#L37-L52)
- [`CATEGORY_LABEL`](src/components/pc/observation/JudgeNotebookSection.tsx#L18-L22)
  (and the parallel map in [JudgeObservationHistoryDrawer.tsx:21-44](src/components/pc/observation/JudgeObservationHistoryDrawer.tsx#L21-L44))

After translation, **extract the duplicated label maps** (`EMOTION_LABELS`,
`LIE_STATE_LABEL`, `TYPE_LABELS`) into a shared `src/i18n/labels.ts`
helper to avoid drift. Each helper takes `t` and returns the localised
label per key.

## 3. Centralised seam: PCInteractionPanel `COPY` constant

[PCInteractionPanel.tsx:84-123](src/components/pc/layout/PCInteractionPanel.tsx#L84-L123)
already centralises 40+ strings into a `COPY` object (with escaped
unicode literals). The cleanest patch:

1. Replace the entire `COPY` object with a `useI18n()` call inside the
   component.
2. Replace every `COPY.x` reference with `t('interaction.x')` using the
   keys in `MESSAGE_KEY_PROPOSALS.ts`.
3. Functions that build payloads (`buildCaseSummaryPayload`,
   `buildPartyPayload`, `buildDisputePayload`, `buildEvidenceSelectionPayload`,
   `buildEvidencePromptPayload`, `buildDisputePickerPayload`) currently
   read from the module-level `COPY` — refactor them to take `t` as a
   parameter, or move them into the component closure.

Do **not** translate strings inside `addDialogue({ speaker: 'system'|'judge', text: '...' })`
calls in this file (e.g. `COPY.judgeObjection`, `COPY.immediateDemand`).
Those go into the dialogue stream and are out of scope for the static-UI
thread — flagged in `LONG_TEXT_RISKS.md`.

## 4. Korean postposition helpers must be gated by locale

[engine/koreanPostposition.ts](src/engine/koreanPostposition.ts) provides
`pp이가`, `pp과와`, `pp은는`. Used in:

- [PCVerdictScreen.tsx](src/components/pc/verdict/PCVerdictScreen.tsx) (verdict prose)
- [PCResultScreen.tsx](src/components/pc/result/PCResultScreen.tsx) (epilogue prose)
- [PCRightPanel.tsx](src/components/pc/panels/PCRightPanel.tsx) (witness combination notif)

For non-`ko` locales, gate calls with `locale === 'ko'` and concatenate
plainly. Most of the verdict/result *prose* is dynamic and out of scope
for this UI thread, but if the prose happens to land in EN before the
dialogue thread lands, ensure no `pp이가` is invoked.

## 5. ICU-style interpolation

The current `formatMessage` helper at
[src/i18n/index.tsx:16-22](src/i18n/index.tsx#L16-L22) supports `{name}`
placeholders. All proposed keys with parameters use this format.

Refactor inline string concatenations:

- `${score}점` → `t('common.scorePoints', { score })`
- `${count}개` → `t('common.unit.count', { count })` (add to messages
  if not present)
- `Phase ${num} - ${label}` → `t('phase.pillFormat', { num, label })`

## 6. Hotbar / dispute-ribbon / chip width

English expansion is the biggest layout risk. After applying:

- Add a per-locale CSS scope to [`pc.css`](src/app/pc.css):
  ```css
  [lang="en"] .slot-nm {
    font-size: 10.5px;
    letter-spacing: -0.01em;
  }
  [lang="en"] .hotbar-special-btn span {
    font-size: 10px;
  }
  [lang="en"] .pc-dispute-ribbon__chip-title {
    max-width: 220px;
  }
  ```
- The language attribute is already set on `<html lang>` from
  [src/i18n/index.tsx:50](src/i18n/index.tsx#L50), so the `[lang="en"]`
  selector works without extra wiring.

## 7. Aria-label parity

Several `aria-label="설정"` etc. in the codebase duplicate the visible
text. Codex should pass the same translated string to both — most
proposals reuse a single key (e.g. `settingsFull.title` for both the
visible heading and the aria attribute on the dialog wrapper).

## 8. Strings in dialogue/system channels (DO NOT translate in this thread)

These appear in component code but flow into the `dialogueLog` (in-game
chat). They straddle the UI/dialogue boundary — leave them in Korean
for this thread and flag in the dialogue thread:

- [PCActionsPanel.tsx:208](src/components/pc/hotbar/PCActionsPanel.tsx#L208) — `'쟁점과 직접 연결되지 않는 질문입니다.'`
- [PCActionsPanel.tsx:246](src/components/pc/hotbar/PCActionsPanel.tsx#L246) — Judge presents-evidence prose
- [PCActionsPanel.tsx:301](src/components/pc/hotbar/PCActionsPanel.tsx#L301) — `'이의 있습니다.'`
- [PCActionsPanel.tsx:344](src/components/pc/hotbar/PCActionsPanel.tsx#L344) — `'즉답을 요구합니다.'`
- [PCInteractionPanel.tsx:746](src/components/pc/layout/PCInteractionPanel.tsx#L746) — `증인 소환: ${name}`
- Several PCRightPanel.tsx entries that build `addDialogue({ speaker: 'system' })` notifications.

If the dialogue thread is also targeting `en`, those strings will be
wired through that thread’s translation pipeline; do not also wire them
here.

## 9. Solution category translations need design sign-off

The 14 entries in `verdict.solutionCategory.*` (gameplay buckets like
`공동재산회복`, `신뢰순서분리`) are gameplay solution categories — not pure UI
labels. Translations are proposed; **do not auto-apply** without a
design/QA pass. Listed in `LONG_TEXT_RISKS.md` and `GLOSSARY_DELTA.csv`
notes for reviewer attention.

## 10. Source-side cleanup (file a follow-up issue)

`법정 장악` and `법정 지배력` are used interchangeably for the same resource
(`court.controlValue`). The EN translation collapses both to
`Court Control`, but the Korean source should be unified. This is **not
a translation thread fix** — it’s a source-side normalization Codex
should track separately.

Specific call sites:
- [PCCourtLayout.tsx:319](src/components/pc/layout/PCCourtLayout.tsx#L319) — `법정 장악`
- [PCCourtLayout.tsx:458](src/components/pc/layout/PCCourtLayout.tsx#L458) — `법정 지배력`
- [PCInteractionPanel.tsx:685](src/components/pc/layout/PCInteractionPanel.tsx#L685) — `법정 지배력이 부족합니다.`

## 11. CSS-only changes Codex should make

After translation, run a visual pass and add:

1. `[lang="en"]` width overrides for `.slot-nm`, `.hotbar-special-btn span`,
   `.pc-dispute-ribbon__chip-title`, `.pc-target-info-drawer__col-h`.
2. `text-overflow: ellipsis; overflow: hidden; white-space: nowrap;` on
   `.pc-mode-card__title`, `.pc-session-card-v2__main h3`.
3. Larger min-height on `.pc-dispute-ribbon__popover` so 3-line EN body
   does not push the evidence list below the fold.

## 12. Achievement / Steam strings

Achievement API names are locked — never translate. Display names go
through Steamworks itself; this thread does not surface any achievement
labels in the UI.

## 13. Hidden-truth / surface-text policy verification

Verified — no proposed EN string surfaces hidden truth ahead of the
Korean source:

- `verdict.fact.locked` keeps the abstract gating message.
- `witness.card.maskedName` keeps `???`.
- `disputeRibbon.popoverDefault` stays generic.
- `result.findingLabel.opponentTrue` stays abstract (`Their claim judged true`).

Codex should re-verify with the disclosure-policy reviewer before merge.
