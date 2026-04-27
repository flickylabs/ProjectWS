# Screenshots

Preview-mode UI screenshot artifacts:

- `free-interrogation-preview-pc.png`
- `free-interrogation-preview-pc-phase3-flagged.png`

Capture command used in this workspace:

```powershell
$env:VITE_FREE_INTERROGATION_MODE='preview'
npm run dev:pc -- --host 127.0.0.1 --port 5182
```

The default `off` mode intentionally hides the free interrogation UI.
