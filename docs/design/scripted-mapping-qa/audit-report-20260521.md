# Scripted Interrogation Mapping QA Audit Report

Date: 2026-05-21
Scope: active cases only (`spouse-01`, `family-01`, `friend-01`)
Commit under audit: `a065436a` (`fix(dispatch): keep mapped free interrogation on scripted path`)

## Summary

The spouse-01 B + d-2 no-response issue was not a data mapping gap. The KO scripted data, angle catalog, angle answer mappings, localized overlays, and disclosure policy shape all pass coverage checks.

Root cause was runtime flow: a mapped free-interrogation `case_dispatch` action carried `freeInterrogation` metadata, and `tryScriptedDialoguePath()` returned `null` before attempting `getScriptedInterrogation()`. Because `handleQuestion()` also disables the V2 scripted/beat branch for free-interrogation input, the action fell through to the LLM-only path. If the LLM returned no usable node or failed, the player saw no NPC answer even though a scripted response existed.

## Data Audit

| Case | Disputes | Scripted entries | Scripted variants | Angle catalog | Angle answers | Angle answer variants | Judge questions | Disclosure dispute policies |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `spouse-01` | 4 | 144/144 | 1,440 | 22 | 792/792 | 7,920 | 132 | 4 |
| `family-01` | 5 | 180/180 | 1,800 | 26 | 936/936 | 9,360 | 156 | 5 |
| `friend-01` | 5 | 180/180 | 1,800 | 20 | 720/720 | 6,300 | 120 | 5 |

Spouse-01 B/d-2 targeted check:

- Base scriptedText key `b|d-2|S0|fact_pursuit` exists and has 10 variants.
- Angle answers for `party=b`, `disputeId=d-2`: 90 entries.
- Angle answer variants for `party=b`, `disputeId=d-2`: 900 variants.
- B/d-2 angle ids: `general`, `cash_withdrawal`, `private_fund_boundary`, `recipient_reason`, `consent_boundary`.

No KO data edits were required. Therefore EN/JA/ZH-CN sync policy did not require content additions. The verifier still checks overlay key and variant-id parity for scriptedText and scriptedAngles.

## Reproduction

Reproduction path for the reported no-response:

1. In spouse-01 Phase 3, target B (`b`) and focus d-2.
2. Submit a free-interrogation question that maps to `case_dispatch`, for example a d-2 fact/motive/empathy question.
3. `resolveFreeInterrogation()` returns a `question` action with `target=b`, `disputeId=d-2`, `questionType`, `answerAngles`, and `freeInterrogation` metadata.
4. `handleQuestion()` adds the raw free question as judge dialogue and sets `isFreeInterrogation=true`.
5. Because `isFreeInterrogation=true`, the V2 scripted/beat branch is disabled.
6. `resolveAndApply()` calls `resolveLLMDialogue()`.
7. Before the fix, `tryScriptedDialoguePath()` exited immediately on `getFreeInterrogationMeta(action)`, so it never looked up the existing `b|d-2|S0|fact_pursuit` scripted answer.
8. If LLM resolution produced no node or errored, `resolveAndApply()` showed the LLM error path and did not add a B response.

## Fix

Changed `src/engine/llmDialogueResolver.ts`:

- Removed the unconditional free-interrogation scripted-path bypass.
- Kept an explicit action type guard: only `question` and `evidence_present` can enter scripted dialogue lookup.
- Mapped free-interrogation actions remain eligible for scripted lookup after policy/context routing has already resolved a concrete party, dispute, and question type.

Safety boundary:

- `off_topic`, `public_info`, `gameplay_help`, `leak_probe`, and unmapped free questions still do not become `case_dispatch` actions.
- The change affects only mapped `question` actions that already carry concrete runtime fields.
- Regular scripted question flow is unchanged except for keeping the existing explicit action type guard.

## Verifier

Added `scripts/verify-scripted-mapping.cjs`.

It checks:

- Active cases only: `spouse-01`, `family-01`, `friend-01`.
- All party x dispute x S0-S5 x questionType base scriptedText entries exist and contain visible variants.
- Base variant tag consistency for `channel`, `questionType`, `stance`, `register`, `disclosure`, `responseMode`.
- Angle catalog references active disputes.
- Judge question coverage for party x dispute x questionType x angle.
- Interrogation answer coverage for party x dispute x lieState x questionType x angle.
- EN/JA/ZH-CN overlay key and variant-id parity for scriptedText and scriptedAngles.
- Disclosure policy dispute/evidence shape.
- Runtime guard: mapped free-interrogation actions must not be blocked before scripted lookup.

## Verification

Post-commit verification for `a065436a`:

- `npm run qa:fast`: PASS, static P0=0, route P0=0, combined P0=0.
- `npm run qa:cutscene`: PASS, P0=0. Existing P1 count: 159.
- `./node_modules/.bin/tsc -b --force`: PASS.
- `node scripts/verify-scripted-mapping.cjs`: PASS.

## Regression Risk

Risk is low and localized to mapped free-interrogation question actions. The free-interrogation policy layer still blocks non-case-dispatch routes before dispatch. The verifier now prevents a recurrence of the exact bypass by failing if `tryScriptedDialoguePath()` again returns early on `getFreeInterrogationMeta(action)`.
