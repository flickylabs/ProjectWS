# Disclosure Policy JSON Schema Draft

**Status**: Tier 1 draft schema. Human-authored policy data only.
**Runtime**: Do not import from runtime code before Tier 3 approval.
**Baseline**: `baseline-pre-policy-v1` (`a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3`)

This schema is the machine-readable companion to `docs/disclosure-policy.md`.
It is not a generated policy engine, and it must not rewrite case data or
ScriptedText. It exists so validation scripts can compare authored policy
against case data, ScriptedText, and future spot-check patterns.

## Top-Level Shape

```json
{
  "caseId": "spouse-01",
  "sourceCaseId": "case-spouse-01",
  "schemaVersion": "tier1-disclosure-policy-draft-v1",
  "baselineTargetSha": "a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3",
  "generatedAt": "2026-04-27",
  "runtimeImportAllowed": false,
  "draftStatus": "schema-draft",
  "surfaceMap": {},
  "forbiddenLexemes": {},
  "channelAuthority": {},
  "lieStateGate": {},
  "uiSurfaceMap": {},
  "discoveryText": {},
  "issueProgression": {},
  "crossCheck": {}
}
```

## Field Rules

### `surfaceMap`

Maps case facts to the safe surface form a non-revealing channel may use.

Required groups:

- `evidence`: each evidence item, keyed by evidence ID.
- `disputes`: each dispute, keyed by dispute ID.
- `witnesses`: witness or witness-like evidence, keyed by witness ID.

Evidence entries should include:

```json
{
  "evidenceId": "e-4",
  "name": "형 문자 스레드",
  "surfaceName": "발신자 미상 문자",
  "surfaceDescription": "safe description",
  "descriptionTruth": ["형", "조카 학교 알림"],
  "truthLexemes": ["형", "조카"],
  "sourceRefs": ["src/data/cases/generated/spouse-01.json:evidence.e-4"]
}
```

### `forbiddenLexemes`

Lists truth lexemes that must not appear in protected channels before their
explicit gate is satisfied.

Required groups:

- `globalTruthLexemes`: complete truth list for the case.
- `surfaceOnlyChannels`: per-channel lists for judge/system/dossier channels.
- `nonConfessionNpcBeforeS5`: NPC truth terms blocked before confession unless
  the channel is explicitly player-discovered and stage-gated.
- `allowedSurfaceSubstitutes`: safe replacements.

### `channelAuthority`

Defines what each channel is allowed to know.

Required groups:

- `surfaceOnly`: judge/system/dossier channels.
- `lieStateDriven`: NPC channels where truth access depends on lieState.
- `playerDiscovered`: evidence and discovery text surfaced by direct player action.
- `freeAfterVerdict`: post-verdict channels.

Each channel entry should include:

```json
{
  "channel": "judge_question",
  "authority": "surface-only",
  "truthLexemePolicy": "blocked",
  "evidenceStagePolicy": "does-not-expand-authority"
}
```

### `lieStateGate`

Defines the Truth Throttle and NPC-specific access to truth.

Required groups:

- `truthThrottle`: S0-S5 general rules.
- `channelMatrix`: channel group x lieState policy.
- `npcPolicies`: party-specific S0-S5 policy.

Important distinction:

- `lieState` describes how honest an NPC is in its own speech.
- `truthStage` describes how far a dispute has progressed.
- They are related but not the same axis.

### `uiSurfaceMap`

Protects UI-facing fields from P7 leaks.

Required groups:

- `fieldPolicy`: general rule for each field family.
- `entries`: concrete replacements or gates for known case data fields.
- `unresolvedExposure`: fields that need runtime UI path confirmation.

Recommended field families:

- `dossierLabel`
- `dossierSummary`
- `dossierNoteText`
- `evidenceCardLabel`
- `evidenceCardName`
- `evidenceCardStageSummary`
- `judgeHint`
- `recommendedMoment`
- `purpose`
- `successConditionSummary`
- `successEffects`

If a field is only internal and never rendered, mark it as `exposure:
"unknown-internal-candidate"` instead of forcing a runtime fix.

### `discoveryText`

Classifies combination/discovery text by route and stage.

Each entry should include:

```json
{
  "id": "combine-2",
  "sourceText": "truth-bearing text",
  "route": "evidence_combine",
  "gate": {
    "allowedChannels": ["player_discovered"],
    "requiredEvidenceStages": {"e-1": "Context", "e-4": "Original"},
    "requiredTruthStage": {"d-1": 3},
    "autoSurfaceAllowed": false
  },
  "surfaceFallback": "safe text before gate"
}
```

### `issueProgression`

Defines gameplay progression by dispute.

This is the key design axis for making the game feel intentional rather than
like repeated button pressing.

Required concepts:

- `statementFracture`: the contradiction or shift the player is attacking.
- `truthStage`: dispute progress from surface claim to established truth.
- `validActions`: which interrogation/action types are meaningful at this stage.
- `failureResponse`: what happens if the player pushes without support.
- `successUnlocks`: evidence, witness, dossier, or dispute revealed by success.

Stage entries should include:

```json
{
  "stage": 2,
  "name": "모호한 가족 사정",
  "surfaceClaim": "B has a private reason",
  "hiddenTruth": "not public in protected channels",
  "entryConditions": [],
  "allowedDisclosure": [],
  "forbiddenDisclosure": [],
  "validActions": ["motive_search", "empathy_approach"],
  "requiredEvidence": ["e-4"],
  "requiredWitness": [],
  "meterTriggers": {},
  "failureResponse": {},
  "successUnlocks": []
}
```

## Validation Expectations

Tier 1 only requires JSON validity and human review. Tier 2 will add scripts
that compare this policy against case data and ScriptedText.

Minimum checks for every change:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/data/disclosurePolicy/spouse-01.json','utf8'))"
node tmp/detect-truth-leak.cjs
```

The policy JSON must not be imported from:

- `src/engine/**`
- `src/components/**`
- `src/hooks/**`

