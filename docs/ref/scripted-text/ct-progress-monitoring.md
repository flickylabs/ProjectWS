# CT Progress Monitoring

Use this file if console encoding makes Korean paths inconvenient.

- Machine-readable status:
  - [codex-progress-status.json](/d:/ProjectWS/tmp/codex-progress-status.json)
- Human-readable status:
  - [codex-progress-status.md](/d:/ProjectWS/tmp/codex-progress-status.md)
- Primary CT guide:
  - [message-to-claudecode-ct-progress-monitoring.md](/d:/ProjectWS/docs/ref/리뉴얼참고/message-to-claudecode-ct-progress-monitoring.md)
- Current headline handoff:
  - [message-to-claudecode-ct-headline-01-handoff.md](/d:/ProjectWS/docs/ref/리뉴얼참고/message-to-claudecode-ct-headline-01-handoff.md)

## Fast check
1. Open [codex-progress-status.json](/d:/ProjectWS/tmp/codex-progress-status.json).
2. Check `activeWorkstream`.
3. Open the latest referenced log file under `tmp/`.

## Current workstream
- `parallel staged generation batch`
- Default batch manifest:
  - [parallel-default.json](/d:/ProjectWS/scripts/manifests/parallel-default.json)
- Salvage pilot batch manifest:
  - [salvage-pilots.json](/d:/ProjectWS/scripts/manifests/salvage-pilots.json)
- Latest batch summary:
  - [pipeline-batch-status.json](/d:/ProjectWS/tmp/pipeline-batch-status.json)
- Recent validated cases:
  - [headline-01-stage3-validate.txt](/d:/ProjectWS/tmp/headline-01-stage3-validate.txt)
  - [headline-02-stage3-validate.txt](/d:/ProjectWS/tmp/headline-02-stage3-validate.txt)
  - [spouse-11-stage3-validate.txt](/d:/ProjectWS/tmp/spouse-11-stage3-validate.txt)

## Re-run batch
```powershell
node scripts/run-parallel-case-batch.cjs --manifest scripts/manifests/parallel-default.json
```

```powershell
node scripts/run-parallel-case-batch.cjs --manifest scripts/manifests/salvage-pilots.json
```

## PowerShell
```powershell
Get-Content tmp/codex-progress-status.json | ConvertFrom-Json | Format-List
```

```powershell
Get-Content tmp/headline-01-stage3-validate.txt -TotalCount 80
```

```powershell
Get-Content tmp/pipeline-batch-status.json -TotalCount 200
```
