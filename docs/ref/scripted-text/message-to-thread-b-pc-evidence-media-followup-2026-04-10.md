PC evidence media follow-up is complete.

What changed:
- Added `viewerData.media` generation for the remaining displayable evidence shells:
  - `log`
  - `contract`
  - `testimony`
- Replaced placeholder-style media shells with readable SVG renderers that reflect actual payload data for:
  - `bank` / `financial_record` / `receipt`
  - `chat` / `email`
  - `cctv` / `photo_video` / `video` / `dashcam`
  - `device`
  - `sns` / `social_post`
  - `log`
  - `contract` / `document` / `institutional_note` / `estimate`
  - `testimony` / `medical_record` / `forensic_report`
- Re-enriched all generated runtime cases with the updated runtime media builder.
- Added reusable audit scripts:
  - [refresh-pc-evidence-media.cjs](D:/ProjectWS/scripts/refresh-pc-evidence-media.cjs)
  - [report-missing-evidence-media.cjs](D:/ProjectWS/scripts/report-missing-evidence-media.cjs)
- Fixed media merge behavior so refresh now replaces stale placeholder media with the new readable SVG payloads.

Current result:
- active general-mode refined set is now restricted to the full-ready `16` cases
- refined evidence `102`
- refined evidence with media `102`
- refined missing-media evidence `0`

Verification files:
- Coverage report: [pc-evidence-media-report-2026-04-10.json](D:/ProjectWS/tmp/pc-evidence-media-report-2026-04-10.json)
- Missing-media inventory: [pc-evidence-missing-media-report-2026-04-10.json](D:/ProjectWS/tmp/pc-evidence-missing-media-report-2026-04-10.json)
- Build log: [release-ready-16-build-20260410.txt](D:/ProjectWS/tmp/release-ready-16-build-20260410.txt)

Compatibility note:
- Keep `viewerData.meta.type` as the raw evidence expression type.
- Keep `viewerData.meta.viewerType` as the normalized renderer routing key.
- The new media payloads are still deterministic SVG-backed assets, not external photo assets, but they now render readable evidence content rather than decorative placeholder shells.
