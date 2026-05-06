# Implementation Notes for Codex — zh-CN PC UI

This is a translation **proposal** package. No source files were edited. Codex applies the changes.

## 1. messages.ts schema

The current `src/i18n/messages.ts` derives `MessageKey` from a single `ko` const literal, so every locale must contain every key. Adding ~280 keys means ko/en/ja must be filled in lock-step.

**Recommendation:** split `messages.ts` into per-surface files (e.g. `src/i18n/messages/pc-home.ts`, `pc-settings.ts`, `pc-result.ts`, `pc-verdict.ts`, `pc-actions.ts`, `pc-interaction.ts`, `pc-gameplay.ts`, `pc-observation.ts`, `pc-progression.ts`, `pc-common.ts`) and merge them into the locale records. Otherwise `messages.ts` becomes >1000 lines and rebases will conflict.

Existing keys must be preserved verbatim:

- `app.title`
- `splash.subtitle`
- `language.selectorLabel` / `language.selectorTitle`
- `steam.authRequired.title` / `steam.authRequired.description` / `steam.authRequired.retry` / `steam.authFailedFallback`
- `session.preparing.title` / `session.preparing.description`

## 2. P0 composed-string refactors (BLOCKING)

These five Korean source patterns concatenate prefixes/suffixes around runtime values. Direct key replacement breaks Chinese word order. **Refactor the call sites** to use the templated keys before applying translations.

### 2.1 PCImportantNotesSection.tsx + PCLeftPanel.tsx — `(미확인 항목 N개)`

Current pattern (~line 147 / line 117):
```
<span>(미확인 항목 {unseenCount}개)</span>
```
Replace with:
```tsx
<span>{t('pc.notes.unseen', { count: unseenCount })}</span>
```
Key: `pc.notes.unseen = '（未确认条目 {count} 项）'`

### 2.2 pcHomeShared.ts — `${moreCount}외 ...`

Wherever the bare suffix `외` is interpolated (e.g. `${count}외 ${name}`), replace with `t('pc.common.moreCount', { count })` rendering `等 N 项` and rewrite the surrounding string. KO `외` and CN `等...项` use opposite positions.

### 2.3 PCHomeScreen.tsx — resolution confirm body

Current at ~line 645:
```
<p>{seconds}초 후 이전 해상도로 돌아갑니다.</p>
```
Replace with:
```tsx
<p>{t('pc.home.resolutionConfirm.body', { count: seconds })}</p>
```
Key: `pc.home.resolutionConfirm.body = '{count} 秒后将自动恢复原分辨率。'`

### 2.4 verdictAdvancePrompt.ts — modal body

Current pattern composes 3 fragments with counts inserted between them. Replace with a single template:

```ts
t('pc.verdictAdvance.modal.body', { revealed, hidden })
```
Key: `pc.verdictAdvance.modal.body = '当前已揭示的争议点 {revealed} 项，仍有 {hidden} 项未揭示。是否仍要直接进入判决？'`

The previous `bodyHead` / `bodyMid` / `bodyTail` keys are **not** part of the proposal — drop them.

### 2.5 PCRecordSummary.tsx — moreConvincing

Current at ~line 63: `${partyName} 측의 주장이 더 설득력 있다고 판단했습니다.`

Replace with:
```tsx
t('pc.recordSummary.moreConvincing', { party: partyName })
```
Key: `pc.recordSummary.moreConvincing = '判定 {party} 一方的主张更具说服力。'`

## 3. PCVerdictScreen solution category lookup

The file has a record mapping no-space form (e.g. `공동재산회복`) → displayed form (e.g. `공동 재산 회복`). The no-space keys are **data identifiers — DO NOT translate them**. Keep them as the canonical lookup keys; route the displayed value through `t(`pc.verdict.solution.${id}`)`.

The id list is fixed (see SOURCE_STRING_MAP / MESSAGE_KEY_PROPOSALS for all 14).

## 4. CSS / layout risks (verify in visual QA)

- Hotbar subtitles in PCActionsPanel.tsx are sized for ~24-char Korean. Several CN translations land at 22+ chars. Verify with `data-screen-bucket=sm` (1366×768) before merge.
- Resolution preset dropdown: KR `Auto (자동 감지)` → CN `自动 (Auto)` reverses the order; verify dropdown width.
- Settings nav rail (`辅助功能` / `游戏玩法`): 4-char items match KR width well, no overflow expected.
- PCInteractionPanel modal labels are tight at 1280-wide; if QA shows overflow, drop `点` from `当前争议点` → `当前争议` for tighter labels.
- pc.gameplay.held.body and pc.gameplay.statementCollapse.body are 25–33 chars in single-modal cut-ins; verify wrap and consider the shorter alternatives in READABILITY_RISKS.md.

## 5. Hardcoded Korean still present in PCApp.tsx

PCApp.tsx contains a hardcoded `솔로몬의 딜레마` literal at line 132 (splash) — replace with `t('splash.title')` once the new key lands. Other splash/loading copy is already wired through `t()`.

## 6. Out-of-scope (do NOT touch)

- Scripted dialogue files under `src/data/dialogues/`
- Case content JSON under `src/data/cases/`
- Evidence / dispute / character names in case data
- `pcHotbarConfig.ts` action IDs (internal action keys; not UI text)
- IDs / enum values / case_id / API names / env keys / file paths

## 7. Disclosure-policy clearance

None of the extracted UI strings name truth content from the active 3 cases (spouse-01 / family-01 / friend-01). The translations are surface-level UI chrome (buttons, headers, empty states, settings labels, generic gameplay cut-ins). The truth-leak guard does not gate this batch.

The `pc.gameplay.*` cut-in bodies are abstract narration about lie-state behavior (e.g. "对方陈述大幅动摇") and never name specific case truths — confirmed compliant with `docs/disclosure-policy.md` §2.1 (judge / system / dossier surface-only constraint).

## 8. Korean source maintenance flagged

Two minor KR inconsistencies surfaced during the inspection sweep:

- `엄격` (PCHomeScreen verdict-axis pole) vs `엄정` (PCJudgeProgressionShared trait) — same conceptual axis, two KR words.
- `심판 축` (PCTraitEnhancePanel) vs `판결(균형)` (PCHomeScreen) — same axis, two KR phrases.

Recommend a small KR cleanup pass before shipping zh-CN to lock terminology before JA/CN diverge further.

## 9. New glossary additions to consider (not in DELTA because no existing row)

These are concepts the UI uses but the glossary doesn't yet track. They are not GLOSSARY_DELTA candidates per the schema (which only modifies existing draft rows), but they should be added as new rows:

| KR | Proposed CN | reason |
| --- | --- | --- |
| 봉합 (resolution axis pole) | 调和 | "Reconciliation/patching" not "缝合" (suture). |
| 체념 (emotion meter) | 放弃 (or 默许) | Resigned acceptance — pick a 2-char meter label. |
| 법정 장악 (resource) | 法庭掌控 | New PC-only resource not in glossary. |
| 이의 있습니다 (action call) | 反对！ (or 我提出异议。) | Picked dramatic tone; product can choose formal register. |
| 화해 (trait pole) | 调和 | Same CN as 봉합 — verify if disambiguation needed. |
| 클리어율 (clear rate) | 完成度 | Distinct from glossary `클리어런스` → `权限等级`. Different concept. |
| 시즌 (lobby category) | 赛季 | Different from `세션` → `会话`. |
| 칭호 / 타이틀 (progression) | 称号 | Used implicitly across profile tabs. |

Recommend the glossary owner add these rows with `status=draft` so future translation threads can audit them.

## 10. Locale plumbing already correct

`src/i18n/locales.ts` already contains `zh-CN` with native name 简体中文 and a `normalizeLocale` branch on `zh*`. No locale plumbing work is needed — only fill the dictionary.
