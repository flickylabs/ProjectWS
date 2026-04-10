**Thread A Release-Ready 16 Audit**

Date: `2026-04-10`

Goal:
- Restrict normal play to the actually release-ready cases.
- Prevent `stage3 PASS` from being mistaken for full playable readiness.
- Enforce a hard gate across `generated + scriptedText + phase1 + phase2 + mediation + semantic + stage3`.

Context:
- Previous refined/general-mode case selection included cases that had `scriptedText` but no `phase1/phase2` dialogue files.
- This created false-positive completion signals: structure-level validation passed while actual play still fell back to poor runtime/default text.

What changed:
- Active refined manifest was split into:
  - full-ready `16`
  - backlog `101`
- Added a release-ready audit script:
  - [validate-release-ready-manifest.cjs](D:/ProjectWS/scripts/validate-release-ready-manifest.cjs)
- Added blocking checks for:
  - generated runtime case exists
  - scriptedText exists
  - `phase1` exists
  - `phase2` exists
  - `mediation` exists
  - semantic log is `summary={}` / `PASS`
  - stage3 log is `summary={}` / `PASS`
  - phase dialogue lines do not contain obvious scaffold/fallback tokens

Manifest split artifacts:
- Active manifest:
  - [manifest.json](D:/ProjectWS/src/data/cases/refined/manifest.json)
- Full-ready 16 backup:
  - [full-ready-16-manifest.json](D:/ProjectWS/tmp/full-ready-16-manifest.json)
- Backlog 101:
  - [backlog-101-manifest.json](D:/ProjectWS/tmp/backlog-101-manifest.json)
- Split report:
  - [full-ready-split-report-2026-04-10.json](D:/ProjectWS/tmp/full-ready-split-report-2026-04-10.json)

Important fix during the audit:
- `tenant-02` was failing the new gate because its dedicated pipeline runner was missing the `mediation` generation step.
- Fixed:
  - [tenant-02-run-pipeline.cjs](D:/ProjectWS/scripts/tenant-02-run-pipeline.cjs)
- Re-ran:
  - `node D:/ProjectWS/scripts/tenant-02-run-pipeline.cjs`

Current gate result:
- Audit report:
  - [release-ready-manifest-audit-2026-04-10.json](D:/ProjectWS/tmp/release-ready-manifest-audit-2026-04-10.json)
- Current status:
  - `caseCount: 16`
  - `passCount: 16`
  - `failCount: 0`

Release-ready cases:
- `family-05`
- `family-09`
- `friend-03`
- `friend-07`
- `headline-01`
- `neighbor-03`
- `neighbor-08`
- `partnership-04`
- `partnership-09`
- `spouse-05`
- `spouse-11`
- `spouse-12`
- `tenant-02`
- `tenant-09`
- `workplace-11`
- `workplace-12`

Verification:
- Audit script:
  - [validate-release-ready-manifest.cjs](D:/ProjectWS/scripts/validate-release-ready-manifest.cjs)
- Build log:
  - [release-ready-16-build-20260410.txt](D:/ProjectWS/tmp/release-ready-16-build-20260410.txt)

Next focus:
- Release-quality review and correction of the active 16 cases' actual `Phase0~2` writing quality.
- Keep backlog `101` outside normal play until the same gate can be satisfied.
