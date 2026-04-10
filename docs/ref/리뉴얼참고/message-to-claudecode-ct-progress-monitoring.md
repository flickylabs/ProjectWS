# Message To ClaudeCode CT: Progress Monitoring Contract

## Purpose
- This file defines how CT should inspect Codex progress without relying on chat UI refresh.
- Treat workspace files as the source of truth when UI looks stale.

## Primary status file
- Machine-readable status:
  - [codex-progress-status.json](/d:/ProjectWS/tmp/codex-progress-status.json)
- Human-readable summary:
  - [codex-progress-status.md](/d:/ProjectWS/tmp/codex-progress-status.md)

## What CT should check first
1. Open [codex-progress-status.json](/d:/ProjectWS/tmp/codex-progress-status.json).
2. Read:
   - `updatedAt`
   - `activeWorkstream.status`
   - `activeWorkstream.currentStep`
   - `activeWorkstream.steps[*].status`
   - `lastKnownValidation`
3. If a step has a `logPath`, open that log next.

## Current workstream
- `headline-01 staged generation`
- Stage order:
  1. `bootstrap_generate`
  2. `refine_scripted`
  3. `validate_scripted`

## PowerShell checks
```powershell
Get-Content tmp/codex-progress-status.json | ConvertFrom-Json | Format-List
```

```powershell
Get-Content tmp/headline-01-stage3-validate.txt -TotalCount 80
```

```powershell
Get-ChildItem tmp | Sort-Object LastWriteTime -Descending | Select-Object -First 20 Name,LastWriteTime
```

## Interpretation rules
- If `updatedAt` is recent and `currentStep` changes, Codex is actively progressing.
- If chat UI looks frozen but `tmp/*.txt` logs or the status file have newer timestamps, assume the client is stale, not the workspace.
- If a step is `completed` and the next is not started, CT can still verify artifacts from the listed file paths immediately.
- If `status` is `blocked`, look at `blockingIssues` in the JSON and the referenced log file before escalating.

## Artifact paths CT should trust
- Specs for handoff:
  - [case-authoring-spec-v1.md](/d:/ProjectWS/docs/ref/리뉴얼참고/case-authoring-spec-v1.md)
  - [runtime-case-data-spec-v1.md](/d:/ProjectWS/docs/ref/리뉴얼참고/runtime-case-data-spec-v1.md)
  - [script-authoring-contract-v1.md](/d:/ProjectWS/docs/ref/리뉴얼참고/script-authoring-contract-v1.md)
- Runtime/code alignment:
  - [character.ts](/d:/ProjectWS/src/types/character.ts)
  - [caseLoader.ts](/d:/ProjectWS/src/data/cases/caseLoader.ts)
- Active scripted output:
  - [headline-01.json](/d:/ProjectWS/src/data/scriptedText/headline-01.json)

## Operational note
- Codex will update the status JSON at stage boundaries.
- CT should prefer file timestamps and status JSON over chat responsiveness.
