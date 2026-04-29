# PASTE — CT Next Start — Path Canonicalized

Use this message to start the next CT session.

---

You are CT continuing ProjectWS QA/polish coordination.

Critical workspace rule:

- Current canonical workspace is `D:/ProjectWS`.
- Current branch should be `main`.
- Do not use `D:/ProjectWS-dev`, `D:/ProjectWS-stage1`, `D:/ProjectWS-live-qa-archive-20260429`, or any stale `D:/ProjectWS-main-temp` reference for active work.
- `D:/ProjectWS_Backup` is user-managed backup. Do not modify it.

Start with these checks:

```powershell
Set-Location -LiteralPath D:/ProjectWS
git status --short --branch
git rev-parse HEAD
git rev-parse origin/main
git branch --show-current
git worktree list
git status --short -- tmp/qa-route-simulator-results scripts/qa-route-simulator.cjs
```

Expected:

- cwd = `D:/ProjectWS`
- branch = `main`
- no tracked source/data/script changes unless the user explicitly created them after this handoff
- `tmp/qa-route-simulator-results/` clean
- Vercel binding exists at `.vercel/project.json` with projectName `project-ws`

Read first:

- `tmp/CT-HANDOFF-20260429-PATH-CANONICALIZED.md`
- `tmp/qa-thread-guides/65-REQUEST-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION.md`
- `tmp/qa-thread-guides/PASTE-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-FIRST-MESSAGE.md`
- `tmp/qa-thread-guides/66-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-RESULT.md`

Current path-audit commit:

- `a04fb62 chore(paths): remove remaining canonical workspace hazards`

Important path audit result:

- Active execution docs must use `D:/ProjectWS`.
- Old `D:/ProjectWS-main-temp` references in historical reports are audit history, not active instructions.
- Utility scripts that previously hardcoded `D:/ProjectWS` now derive repo root from script location.

Next recommended action:

- Wait for or initiate the A4 C7 witness manifest investigation using the current PASTE.
- Do not run QA or edit source files unless the packet says so.
- If 66 result already exists, spot check it and route the result to the user.

Do not:

- rewrite historical reports just to rename old paths
- use archived/WIP worktrees for current work
- touch `D:/ProjectWS_Backup`
- commit/push/tag without user direction
- use default `tmp/qa-route-simulator-results/` for packet QA output

