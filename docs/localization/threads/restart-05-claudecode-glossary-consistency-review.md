# Thread: GLOSSARY_CONSISTENCY_REVIEW Restart

Target: ClaudeCode

Run this only after the restart outputs from Thread 01 through Thread 04 are available. Treat this file as the active restart prompt and ignore older Thread-05 assumptions that conflict with it.

## Control Context

`PROJECT_CONTROL_TOWER` is the source of truth for integration. Do not directly modify production files unless PROJECT_CONTROL_TOWER explicitly asks you to. Produce a reviewable output package only.

Current repo path:

- `d:\ProjectWS`

## Inputs

Use these restart outputs:

- `docs/localization/threads/outputs/restart-thread-01-en-ui/`
- `docs/localization/threads/outputs/restart-thread-02-ja-ui/`
- `docs/localization/threads/outputs/restart-thread-03-zh-cn-ui/`
- `docs/localization/threads/outputs/restart-thread-04-layout-audit/`

Required references:

- `docs/localization/glossary.csv`
- `docs/localization/style-guide.md`
- `src/i18n/messages/common.ts`
- `src/i18n/messages/settings.ts`
- `src/i18n/messages/home.ts`
- `src/i18n/messages/court.ts`
- `src/i18n/messages/verdict.ts`
- `src/i18n/messages/profile.ts`

## Locked Brand Rules

These are already decided and should not be reopened unless a native review finds a serious launch risk:

- Internal/dev-only project name: `Project_Solomon`
- Korean public full title: `솔로몬의 딜레마: 진실의 재판`
- English public full title: `Verdict Zero: Trial of Truth`
- Japanese public full title: `ソロモンのジレンマ：真実の裁き`
- Simplified Chinese public full title: `真相裁决：零点审判`

Reject these public title candidates:

- EN: `Project Solomon`, `Solomon's Dilemma`, `Solomon Court`
- JA: `ソロモン法廷`
- zh-CN: `所罗门的法庭`, `所罗门的两难`

## Already Resolved Decisions

Do not reopen these unless there is a concrete contradiction in the new thread outputs:

- `clearance` is split into `permission_level` and `clearance_rate`.
- `dossier` is deprecated; use the more specific records/case-file/notes/question terms.
- `봉합` and `화해` are distinct concepts.
- English-only uppercase eyebrow is allowed; non-English uppercase transform should be stripped or overridden.
- Korean `타이틀` source term was renamed to `칭호` for judge progression rank/title.
- `objection` is split between UI noun and bark/dialogue usage.
- zh-CN resigned/fatalistic emotion should prefer `认命`.
- EN `pretrial_phase` is `Opening Statements`.
- EN `re_examination_phase` is `Final Interrogation`.

## Scope

Review consistency and integration risk across restart Thread 01 through Thread 04. Do not translate large new surfaces from scratch.

## Task

1. Compare proposed translations against `docs/localization/glossary.csv`.
2. Identify inconsistent translations of the same source term or message key.
3. Identify target-language terms that sound unnatural or too literal.
4. Identify strings that are too long for likely UI containers.
5. Propose glossary patches only when needed.
6. Propose final normalized translations for conflicts.
7. Flag issues Codex should resolve during implementation.
8. Keep script/dialogue localization out of this review unless a UI term directly conflicts with the script glossary.

## Output Location

Write your output files under:

- `docs/localization/threads/outputs/restart-thread-05-consistency/`

If you cannot write files in your environment, return the same content in the chat using the filenames below.

## Required Output Files

### `CONSISTENCY_FINDINGS.csv`

Columns:

```csv
priority,locale,key_or_source,issue,recommendation
```

Priority values:

- `P0`: must fix before integration
- `P1`: should fix before release
- `P2`: polish/native review

### `GLOSSARY_PATCHES.csv`

Columns:

```csv
term_id,locale,current,proposed,reason,confidence
```

### `FINAL_NORMALIZED_TERMS.csv`

Columns:

```csv
source_term_or_id,en,ja,zh_cn,notes
```

### `LONG_TEXT_RECOMMENDATIONS.csv`

Columns:

```csv
key_or_source,locale,current_proposal,shorter_alternative,notes
```

### `IMPLEMENTATION_NOTES_FOR_CODEX.md`

Provide a concrete PR/order list for PROJECT_CONTROL_TOWER. Separate:

- glossary changes
- message value changes
- component/CSS changes
- native-review-only items

### `SUMMARY.md`

Include:

- input files checked
- total findings by priority
- blocking issues
- glossary patch count
- user decisions needed

## Final Reminder

Do not edit `src/data/**`. Do not edit Steam, Electron, server, or Railway files. This is a consistency review pass only.
