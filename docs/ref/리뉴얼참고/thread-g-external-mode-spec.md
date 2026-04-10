# Thread G External Mode Spec

Date: 2026-04-10
Purpose: Define the official CLI contract for `external_scripted_json` and `validate-only` in the Thread G pipeline.

## Scope

Included:
- `scripts/generic-case-run-pipeline.cjs`
- `scripts/run-parallel-case-batch.cjs`
- `scripts/lib/run-staged-pipeline.cjs`
- `scripts/case-stage2-scripted-bootstrap.cjs`
- `scripts/lib/compile-scripted-bundle.cjs`

Excluded:
- Phase 1 / Phase 2 external payload injection
- Partial merge modes
- Structure-only modes

## Principles

- External scripted injection is entered only by explicit `--mode external_scripted_json`.
- `auto` mode never switches to external JSON just because `src/data/scriptedText/external/{caseId}.json` exists.
- External input must already be a complete `ScriptedTextBundle` JSON produced by Thread W.
- External input must still pass stage2b, stage2c, and stage3 validation.
- `--validate-only` validates already materialized assets only.
- `--validate-only` cannot be combined with `--mode` overrides or `--external-input`.

## Input Contract

The external JSON must match the `ScriptedTextBundle` structure defined in [scriptedText.ts](D:/ProjectWS/src/types/scriptedText.ts#L135).

Required fields include:
- `schemaVersion`
- `caseId`
- `coverage`
- `channels`
- `tags` on each variant
- `sourceRefs` on each variant

Notes:
- External mode skips metadata enrichment, semantic normalization, and release hotfix steps.
- Thread W must therefore provide validator-ready final bundle data.

## Single-case CLI

Default generation:

```bash
node scripts/generic-case-run-pipeline.cjs --case spouse-05
```

Explicit external mode with default external path:

```bash
node scripts/generic-case-run-pipeline.cjs --case spouse-05 --mode external_scripted_json
```

Default lookup path:
- `src/data/scriptedText/external/{caseId}.json`

Explicit external file:

```bash
node scripts/generic-case-run-pipeline.cjs --case spouse-05 --mode external_scripted_json --external-input tmp/thread-g-external-input/spouse-05.json
```

Explicit external directory:

```bash
node scripts/generic-case-run-pipeline.cjs --case spouse-05 --mode external_scripted_json --external-input tmp/thread-g-external-input
```

Directory resolution rule:
- `{external-input}/{caseId}.json`

Validate-only:

```bash
node scripts/generic-case-run-pipeline.cjs --case spouse-05 --validate-only
```

Validate-only behavior:
- Skip generation steps.
- Run validation steps only.
- Current step set: `stage1b`, `stage2b`, `stage2c`, `stage3`.
- Requires existing `src/data/cases/generated/{caseId}.json`.
- Requires existing `src/data/scriptedText/{caseId}.json`.

Unsupported combinations:
- `--validate-only --mode external_scripted_json`
- `--validate-only --external-input ...`

## Parallel Batch CLI

Default batch:

```bash
node scripts/run-parallel-case-batch.cjs --cases spouse-05 tenant-02
```

External batch:

```bash
node scripts/run-parallel-case-batch.cjs --cases spouse-05 tenant-02 --mode external_scripted_json --external-input src/data/scriptedText/external
```

Batch recommendation:
- Use a directory path for `--external-input` in batch mode.

Expected files:
- `src/data/scriptedText/external/spouse-05.json`
- `src/data/scriptedText/external/tenant-02.json`

Validate-only batch:

```bash
node scripts/run-parallel-case-batch.cjs --cases spouse-11 headline-02 --validate-only
```

Validate-only batch rules:
- Each child runner receives `PIPELINE_VALIDATE_ONLY=1`.
- Each case runs validation steps only.
- `validateOnly: true` cases cannot carry `mode` overrides or `externalInput`.

## Manifest Format

Existing string-array manifest format is still valid:

```json
{
  "cases": ["spouse-05", "tenant-02"]
}
```

Expanded object format is also valid:

```json
{
  "mode": "external_scripted_json",
  "externalInput": "src/data/scriptedText/external",
  "validateOnly": false,
  "cases": [
    "spouse-05",
    {
      "caseId": "tenant-02",
      "mode": "external_scripted_json",
      "externalInput": "tmp/thread-g-external-input/tenant-02.json"
    },
    {
      "caseId": "headline-02",
      "validateOnly": true
    }
  ]
}
```

Manifest rules:
- `externalInput` is allowed only when `mode=external_scripted_json`.
- Case objects may override manifest-level defaults.
- `autoDiscoverRunners` may still be combined with explicit cases.
- `validateOnly: true` cannot be combined with mode overrides or external input.

## Status Recording

`run-staged-pipeline.cjs` records:
- `activeWorkstream.mode`
- `activeWorkstream.inputPath`
- `activeWorkstream.validateOnly`
- Stage2 step `mode`
- Stage2 step `inputPath`

Status file locations:
- `tmp/pipeline-status/{caseId}.json`
- Custom path via `PIPELINE_STATUS_PATH`

## Operational Notes

- External mode currently targets stage2 scripted bundle injection only.
- Phase 1 / Phase 2 external payload support is a v2 task.
- `validate-only` does not perform temporary no-write validation against an external JSON payload.
