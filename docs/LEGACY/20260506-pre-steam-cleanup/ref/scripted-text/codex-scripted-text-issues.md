# Codex Scripted Text Issues

Updated: 2026-04-07

## Open

- Shell-based inline Korean rewrites are unsafe in this environment. Direct PowerShell/inline Node injection has previously degraded Korean literals into `?` or mojibake. Workaround: write UTF-8 `.cjs` helpers or use `apply_patch` directly for content edits.

- The 84-case scale-out path is not implemented yet. `spouse-01` is now the clean baseline, but the repo still needs a controlled generation/apply/validation loop for the remaining cases.

- `tests/validate-scripted-text.cjs` has an `A1` false-positive edge case around Korean amount detection. Phrases like `메일이 원인`, `메일 원본`, or similar `...일/이 + 원...` sequences can be misread as amount-like patterns. Current workaround: avoid those exact surfaces in scripted text or rephrase them. Longer-term fix should happen inside validator regex design, not per-case text hacks.

## Closed

- Strict validation loop was re-established after the validator restore.

- `src/data/scriptedText/spouse-01.json` is now validator-clean. Current status: `node tests/validate-scripted-text.cjs --case spouse-01` returns `PASS`.

- `src/data/scriptedText/spouse-02.json` is now validator-clean. Current status: `node tests/validate-scripted-text.cjs --case spouse-02` returns `PASS`.

- `spouse-02` blocking issues were cleared through a staged repair loop:
  - witness channel fully rewritten in formal Korean
  - judge-facing partner references normalized to `toJudge`
  - `evidence_present` direct reaction coverage restored
  - `interrogation` sentence-count, leak, and D2 clusters reduced iteratively until full pass

- The earlier `interrogation` `D2` warning cluster for `spouse-01` was reduced to zero by targeted variant rewrites plus an `S5` structure/amount compliance pass.

- Deterministic draft generation for `witness`, `aftermath`, and `system_message` was created for all 84 cases under `docs/ref/scripted-text/deterministic-drafts/`.
