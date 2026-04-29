# CT-HANDOFF-20260429-PATH-CANONICALIZED

Purpose: preserve the canonical workspace decision after the ProjectWS path cleanup and prevent future CT/Dev/QA sessions from using archived or WIP worktrees by accident.

## 1. Canonical Folders

- Dev + Live-QA workspace: `D:/ProjectWS`
- Git branch for current work: `main`
- Remote branch: `origin/main`
- Vercel project binding: `D:/ProjectWS/.vercel/project.json`
  - projectName: `project-ws`
  - production URL: `https://project-ws.vercel.app`
- User-managed backup: `D:/ProjectWS_Backup`
  - Do not modify or use as an active workspace.

Non-canonical folders:

- `D:/ProjectWS-dev`: preserved WIP worktree on `wip/phase-b-route-simulator-20260427`; do not use for Live-QA, Vercel, or current Track A packets.
- `D:/ProjectWS-live-qa-archive-20260429`: historical archive of the old `ProjectWS-main-temp` state; read-only reference only.
- `D:/ProjectWS-stage1`: historical detached worktree; not active.
- `D:/ProjectWS-codex-p1-bugfix`: old bugfix worktree; not active for current QA/polish.

## 2. Current Path Audit Result

Path audit commit:

- `a04fb62 chore(paths): remove remaining canonical workspace hazards`

What it fixed:

- Active A4 C7 witness manifest PASTE now expects `D:/ProjectWS` and `main`.
- The old `D:/ProjectWS`-as-wrong-worktree wording was removed from that active PASTE.
- Archived/dev worktrees are stop conditions:
  - `D:/ProjectWS-dev`
  - `D:/ProjectWS-stage1`
  - `D:/ProjectWS-live-qa-archive-20260429`
  - stale `D:/ProjectWS-main-temp`
- Eight legacy utility scripts no longer hardcode `D:/ProjectWS`; they derive repo root from `__dirname`.

Scripts changed:

- `scripts/refresh-pc-evidence-media.cjs`
- `scripts/report-missing-evidence-media.cjs`
- `scripts/split-full-ready-manifest.cjs`
- `scripts/sync-scripted-refined-manifest.cjs`
- `scripts/validate-phase-dialogue-quality.cjs`
- `scripts/validate-phase-script-coverage.cjs`
- `scripts/validate-release-ready-manifest.cjs`
- `scripts/verify-scripted-key-coverage.cjs`

Validation completed:

- `node --check` passed for all 8 changed scripts.
- `git diff --check` passed before commit.

## 3. Historical References

Old `D:/ProjectWS-main-temp` references still exist in historical reports and old request docs, especially under `tmp/qa-thread-guides` and `docs/ref`.

Do not rewrite those historical files just to rename paths. They are audit records of where the work originally happened.

Operational rule:

- Current and future execution instructions must use `D:/ProjectWS`.
- Historical reports may keep the old path if they are describing past execution.

## 4. Current Active Packet

A4 C7 witness manifest investigation is the next prepared Track A item.

Files:

- Request: `tmp/qa-thread-guides/65-REQUEST-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION.md`
- Entry PASTE: `tmp/qa-thread-guides/PASTE-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-FIRST-MESSAGE.md`
- Result target: `tmp/qa-thread-guides/66-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-RESULT.md`

Execution boundary:

- Read-only investigation.
- No source/data apply.
- No QA simulator run.
- No GPT Pro.
- No commit/push/tag.
- Result write only to `D:/ProjectWS/tmp/qa-thread-guides/66-...md`.

## 5. Simulator / QA Rules To Preserve

- Use dedicated result directories for simulator output.
- Do not use default `tmp/qa-route-simulator-results/` for active packet runs.
- Strict counters remain:
  - `hard > 0`
  - active `response_missing > 0`
  - `qa_focus_review` reappears
  - new P0/P1 regression cluster
- Family-01 generated-artifact gap is documented carry-forward, not a new regression by itself.
- Do not probe `--help` on `scripts/qa-route-simulator.cjs`; prior cross-check found unknown flags can silently fall through.

## 6. Commit / Push Discipline

- Work only in `D:/ProjectWS`.
- Expected branch: `main`.
- Push only to `origin main` after verification.
- Do not touch user backup folders.
- Do not use archived worktrees for current fixes.
- Preserve historical artifacts unless explicitly cleaning them.

For source/data changes:

- Run relevant static checks.
- Run targeted QA when the packet requires it.
- Commit only explicit paths.
- Push after verification.

For docs-only path/handoff changes:

- `git diff --check` is sufficient unless the doc changes also alter runnable commands.

## 7. Next Recommended Action

Proceed with A4 C7 witness manifest investigation from the current `D:/ProjectWS` workspace:

1. Open a Codex-Dev or Codex-QA session.
2. Paste the full body of `tmp/qa-thread-guides/PASTE-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-FIRST-MESSAGE.md`.
3. Wait for `66-TRACK-A-A4-C7-WITNESS-MANIFEST-INVESTIGATION-RESULT.md`.
4. CT reviews 66 and routes the result:
   - no fix needed
   - manifest relink needed
   - source/scope decision needed
   - GPT Pro/content decision needed
   - defer/carry-forward

