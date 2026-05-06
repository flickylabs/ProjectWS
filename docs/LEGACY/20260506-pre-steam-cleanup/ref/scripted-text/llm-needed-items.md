# LLM-Needed Items

Updated: 2026-04-07

## Primary LLM-Or-Manual Channels

- `interrogation`
  - Lie-state disclosure control is the core requirement.
  - The text must track speaker identity, target reference, honorific level, timing of truth release, and pairwise variant distance.
  - This is the least safe channel for template-only generation.

- `evidence_present`
  - The speaker must react to the exact evidence, not just the dispute in general.
  - Subject-role framing (`self`, `other`, `both`, `institutional`) changes the language materially.
  - Early/mid/late disclosure tone is highly case-sensitive.

- `dossier`
  - The line has to answer the exact dossier question, not merely the surrounding dispute.
  - Unlock stage, implied accusation, and target party all change the needed nuance.
  - Deterministic text is likely to sound generic or evasive in the wrong way.

## Hybrid: Script First, Review Required

- `witness`
  - Baseline scaffolds can be generated from `socialGraph` metadata.
  - `vague` and some `partial` lines are safe to pre-script.
  - `full` depth testimony should still be reviewed or rewritten because certainty, bias, and observation limits matter.

- `aftermath`
  - Rule-based drafts are possible and already generated.
  - Final release quality still benefits from review so the resolution fits the emotional shape of each case.

- `system_message`
  - Deterministic templates are safe and already generated.
  - Final tuning is optional, not mandatory.

## Already Scriptable Without LLM

- Coverage manifests
- Channel key generation
- Variant id generation
- Witness id extraction from `socialGraph`
- Dossier question id extraction from v3 game loop JSON
- Deterministic `system_message` drafts
- Deterministic `aftermath` drafts
- Deterministic witness scaffolds

## Supporting Files

- `docs/ref/scripted-text/84-scripted-text-rollout-plan.md`
- `docs/ref/scripted-text/84-scripted-text-input-inventory.md`
- `docs/ref/scripted-text/codex-scripted-text-issues.md`
