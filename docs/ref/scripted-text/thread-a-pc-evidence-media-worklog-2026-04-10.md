**Thread A PC Evidence Media Worklog**

Date: `2026-04-10`

Goal:
- Add real media payload fields to runtime evidence data so Thread B PC evidence viewers can render actual images instead of text-only fallbacks.

Changed files:
- [case.ts](D:/ProjectWS/src/types/case.ts)
- [demoEvidenceData.ts](D:/ProjectWS/src/components/pc/evidence/demoEvidenceData.ts)
- [PCEvidenceViewer.tsx](D:/ProjectWS/src/components/pc/evidence/PCEvidenceViewer.tsx)
- [EvidenceSubViewers.tsx](D:/ProjectWS/src/components/pc/evidence/EvidenceSubViewers.tsx)
- [pc.css](D:/ProjectWS/src/app/pc.css)
- [runtime-gameplay-enricher.cjs](D:/ProjectWS/scripts/lib/runtime-gameplay-enricher.cjs)

What changed:
- Added shared `viewerData.media` contract with:
  - `imageUrl`
  - `thumbnailUrl`
  - `posterUrl`
  - `width`
  - `height`
  - `alt`
  - `caption`
  - `frameImages[]`
  - `screenshotImages[]`
- Preserved raw `viewerData.meta.type` such as `photo_video`, `photo`, `video`, `dashcam`, `financial_record`, `receipt`, `social_post`.
- Added `viewerData.meta.viewerType` as normalized display routing key for the PC viewer.
- Updated runtime evidence enrichment so media payloads are generated for:
  - `cctv`, `photo`, `photo_video`, `video`, `dashcam`
  - `device`
  - `sns`, `social_post`
  - `chat`, `email`
  - `bank`, `financial_record`, `receipt`, `spreadsheet`
- Added actual media rendering block to the existing PC evidence viewer instead of building a new screen.
- Re-enriched all generated case JSON files after the generator change.

Verification:
- Build passed:
  - `npm run build:pc`
- Coverage report:
  - [pc-evidence-media-report-2026-04-10.json](D:/ProjectWS/tmp/pc-evidence-media-report-2026-04-10.json)
- Current counts:
  - `generated cases`: `188`
  - `generated evidence`: `1226`
  - `generated evidence with media`: `481`
  - `refined cases`: `117`
  - `refined evidence`: `798`
  - `refined evidence with media`: `337`

Important compatibility note:
- Thread B should use `viewerData.meta.type` as the raw evidence expression type.
- Thread B should use `viewerData.meta.viewerType` or existing normalization only for display routing.
- Cases without `viewerData.media` should continue rendering with the old text-first subview flow.

Follow-up expansion:
- Added generated media shells for `log`, `contract`, and `testimony` viewer types in the runtime enricher.
- Re-ran media enrichment across all generated runtime cases.
- Added reusable scripts:
  - [refresh-pc-evidence-media.cjs](D:/ProjectWS/scripts/refresh-pc-evidence-media.cjs)
  - [report-missing-evidence-media.cjs](D:/ProjectWS/scripts/report-missing-evidence-media.cjs)

Follow-up verification:
- Updated coverage report:
  - [pc-evidence-media-report-2026-04-10.json](D:/ProjectWS/tmp/pc-evidence-media-report-2026-04-10.json)
- Missing-media inventory:
  - [pc-evidence-missing-media-report-2026-04-10.json](D:/ProjectWS/tmp/pc-evidence-missing-media-report-2026-04-10.json)
- Current counts after the follow-up pass:
  - `generated cases`: `188`
  - `generated evidence`: `1226`
  - `generated evidence with media`: `1226`
  - `refined cases`: `117`
  - `refined evidence`: `798`
  - `refined evidence with media`: `798`
  - `refined missing media`: `0`
- Build passed:
  - [thread-a-pc-evidence-media-build-20260410-followup.txt](D:/ProjectWS/tmp/thread-a-pc-evidence-media-build-20260410-followup.txt)

Readable SVG upgrade:
- Replaced placeholder-style media shells with readable SVG renderers that reflect actual evidence payload data.
- Added data-aware SVG renderers in [runtime-gameplay-enricher.cjs](D:/ProjectWS/scripts/lib/runtime-gameplay-enricher.cjs) for:
  - `bank` / `financial_record` / `receipt`
  - `chat` / `email`
  - `cctv` / `photo_video` / `video` / `dashcam`
  - `device`
  - `sns` / `social_post`
  - `log`
  - `contract` / `document` / `institutional_note` / `estimate`
  - `testimony` / `medical_record` / `forensic_report`
- Fixed media merge behavior so refreshed SVG media replaces stale placeholder media during re-enrichment.

Readable SVG verification:
- Active general-mode set is now restricted to the `full-ready 16` cases.
- Current refined counts after the readable-SVG pass:
  - `refined cases`: `16`
  - `refined evidence`: `102`
  - `refined evidence with media`: `102`
  - `refined missing-media evidence`: `0`
- Build passed:
  - [release-ready-16-build-20260410.txt](D:/ProjectWS/tmp/release-ready-16-build-20260410.txt)
