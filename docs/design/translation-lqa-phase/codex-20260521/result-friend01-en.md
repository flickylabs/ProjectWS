# friend-01 EN Witness/Cutscene Sync Result

## Scope

- Branch: `codex/witness-cutscene-friend-en`
- Baseline: `afbc7c4b`
- Primary request: `docs/design/translation-lqa-phase/codex-20260521-witness-family-cutscene-multilang.md`
- Requested thread path `docs/design/translation-lqa-phase/codex-20260521/thread-friend01-en.md` was not present in this worktree; existing friend-01 EN thread context was reviewed at `docs/design/translation-lqa-phase/thread-phase2-fix-friend01-en.md`.

## Changes

- Updated `FRIEND_01_OVERLAYS.en` in `src/data/witnessTestimonyData/localized.ts` for the 12 requested friend-01 witness slots.
- Preserved friendly-name tone with `Daeun` / `Sumin`, and aligned key witness phrases: `I would have hit on her by now`, `She's playing hard to get. She'll come around in the end.`, `older man`, `younger woman`, `cut ties`, and `unreasonable request`.
- Replaced `slip_explosive.phase2.en` in `src/data/cutsceneText/friend-01/d-1.json` through `d-5.json` with the requested `It's just that...` trailing-ellipsis tone.
- Kept d-1 through d-4 in Choi Sumin's perspective and d-5 in Song Daeun's confession perspective.
- Reviewed `src/data/scriptedText/friend-01.en.json` and `src/data/cases/generated/friend-01.en.json` against the changed KO mirror areas. Applied two generated-case EN mirror fixes: `Daeun's fiance` instead of `my fiance` for Sumin's routine, and `took on the villain's role herself` for Sumin's agency.

## Validation

`node_modules` was absent, so `npm ci` was run first from the existing lockfile to make the requested checks executable.

| Command | Result |
|---|---|
| `npx tsc -b --noEmit` | PASS |
| `npm run qa:fast` | PASS, static P0=0, route P0=0, combined P0=0 |
| `node scripts/detect-truth-leak.cjs` | PASS, truth leak findings: 0 |

## Safety

- Edited only friend-01 EN data plus this result document.
- Did not edit KO, JA, ZH-CN, spouse, family, glossary, or truth-leak matrix files.
- No origin push performed.
