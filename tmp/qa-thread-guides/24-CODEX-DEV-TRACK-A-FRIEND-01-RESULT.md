# 24-CODEX-DEV-TRACK-A-FRIEND-01-RESULT

Codex-Dev Track A result for `friend-01` exhaustive `qa_focus_review` D/P1.

## Entry Guard

- Worktree: `D:/ProjectWS-main-temp`
- Entry HEAD: `fe182b7 docs(qa-guide): apply bulk QA guide updates and add future bulk PASTE template`
- Git state: detached `HEAD`; allowed 5 known-dirty packet docs preserved untouched.
- `tmp/qa-route-simulator-results/`: clean.
- Baseline tags present: `baseline-pre-policy-v3`, `baseline-pre-policy-v3-stage1`, `baseline-pre-policy-v3-stage2`.

## Source-Of-Truth Check

- Runtime/simulator reads the target response from `src/data/scriptedText/friend-01.json`.
- The target path is `channels.evidence_present.entries[key=b|e-1|early|self].variants[id=b-e-1-early-self-v1]`.
- `src/data/cases/generated/friend-01.json` does not feed the variant text. It supplies the d-1/e-1 focus metadata used by the simulator detector and runtime display-name context.
- `src/data/scriptedText/friend-01.json` is historically generated/merged GPT Pro content; its notes name `assemble-family-friend-bundles.cjs`, but that script's original `docs/ref/리뉴얼참고/gpt-pro-prompts-friend/output` source path is not present in this worktree.
- Preserved GPT Pro artifacts under `gpt-pro-runs/judge-messages-v3/_master/assets-friend-01/gpt-pro-package/` and `gpt-pro-runs/atom-script-tone-review/input/source/friend-01-extracted.json` contain the candidate replacement text.

Decision: patch the effective runtime source file only, using an existing GPT Pro-authored adjacent variant as the replacement text. No generated case data, runtime hook, simulator, manifest, disclosure policy, or claim policy file was edited.

## GPT Pro Routing

Prompt packet used for selection/validation:

```text
Revise only friend-01 scriptedText evidence_present b|e-1|early|self variant b-e-1-early-self-v1.
The current text "연락한 건 맞습니다." is too short and deterministically trips qa_focus_review for d-1 because it can be read as another dispute focus.
Keep B/최수민's early hedge voice, formal answer to the judge, and e-1 contact-log meaning.
Do not reveal d-2 선넘는 메시지, d-3 아버지 돈 접근, d-4 과거 사기, or d-5 단톡방 매도.
Prefer a record-focused line that stays on d-1/e-1 and matches surrounding variants.
```

Selected GPT Pro output excerpt:

```json
{
  "id": "b-e-1-early-self-v2",
  "text": "최근 9일 동안 전화도 했고 문자도 보냈습니다. 기록 그대로입니다.",
  "behaviorHint": "기록의 디테일을 건조하게 짚고 더는 설명하지 않는다."
}
```

Meaning-fidelity spot check:

- Preserves B's admission that the contact record is real.
- Keeps the answer on e-1 / d-1 contact-record focus.
- Does not introduce d-2/d-3/d-4/d-5 hidden-truth content.
- Avoids the detector's previous false focus token from `"연락한 건 맞습니다."`.

Deviation: no new external GPT Pro web session was launched from this environment. The applied line is reused from preserved GPT Pro-authored project artifacts rather than authored by Codex.

## Diff Surface

- `src/data/scriptedText/friend-01.json`
  - `b-e-1-early-self-v1`
  - before: `연락한 건 맞습니다.`
  - after: `최근 9일 동안 전화도 했고 문자도 보냈습니다. 기록 그대로입니다.`

Validation artifacts were written to `tmp/codex-dev-track-a-friend-01/` and left untracked.

## Before / After

Baseline reference: post-S7 result `tmp/qa-thread-guides/18-CODEX-DEV-S7-RESULT.md`.

| Run | Before | After |
|---|---:|---:|
| `friend-01` exhaustive total findings | 603 | 544 |
| `friend-01` exhaustive `qa_focus_review` | 59 | 0 |
| `friend-01` exhaustive hard findings | 0 | 0 |

After category distribution:

| Result dir | Category counts |
|---|---|
| `friend-01-normal` | `evidence_investigate_no_npc_followup=3`, `safe_fallback_used=7`, `system_only_action_no_npc_followup=1`, `qa_annotation_only_action=2` |
| `friend-01-exhaustive` | `evidence_investigate_no_npc_followup=401`, `system_only_action_no_npc_followup=143`, `qa_focus_review=0` |
| `spouse-01-normal` | `evidence_investigate_no_npc_followup=4`, `safe_fallback_used=3`, `system_only_action_no_npc_followup=1`, `qa_annotation_only_action=2` |
| `family-01-normal` | `safe_fallback_used=5`, `evidence_investigate_no_npc_followup=2`, `qa_annotation_only_action=2` |

## Validation

Static:

- `node --check scripts/qa-route-simulator.cjs` PASS
- `npx eslint scripts/qa-route-simulator.cjs` PASS
- `npx tsc -b --force` PASS
- `npm run build:pc` PASS
  - Existing Vite chunk/dynamic-import/plugin timing warnings only; exit code 0.

Targeted simulator:

- `node scripts/qa-route-simulator.cjs --case friend-01 --result-dir tmp/codex-dev-track-a-friend-01/friend-01-normal` PASS: routes 4, actions 20, findings 13, hard 0.
- `node scripts/qa-route-simulator.cjs --exhaustive --case friend-01 --max-depth=5 --max-states=240 --max-routes=480 --max-actions-per-state=36 --result-dir tmp/codex-dev-track-a-friend-01/friend-01-exhaustive` PASS: routes 480, actions 1156, findings 544, hard 0, `qa_focus_review=0`.
- `node scripts/qa-route-simulator.cjs --case spouse-01 --result-dir tmp/codex-dev-track-a-friend-01/spouse-01-normal` PASS: routes 4, actions 24, findings 10, hard 0.
- `node scripts/qa-route-simulator.cjs --case family-01 --result-dir tmp/codex-dev-track-a-friend-01/family-01-normal` PASS: routes 4, actions 20, findings 9, hard 0.

## Status

- Track A `friend-01` D/P1 fix: PASS.
- Push: not performed.
- Known-dirty packet docs and preserved untracked helper/log artifacts: not touched.
