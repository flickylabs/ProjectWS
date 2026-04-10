# Thread-E GPT Follow-up Prep (2026-04-09)

## Current Decision

- Wave A 10: keep as-is
- Wave B 10: keep current generated files for now
- Drop later:
  - `neighbor-new-10`
  - `civic-new-07`
- Develop later:
  - waiting for Thread-E revised briefs and CT handoff

## No Immediate Regeneration

There is no additional regeneration work to run now.

The current generator path is ready for:
- targeted DEVELOP-only regeneration
- DROP replacement generation under new case IDs
- parallel failure-only reruns

## Prepared Manifests

- Full Wave A+B 20 snapshot:
  - `scripts/manifests/thread-e-wave-ab-20.json`
- Keep-only 18 snapshot:
  - `scripts/manifests/thread-e-wave-ab-keep18.json`
- Pending DEVELOP regeneration queue:
  - `scripts/manifests/thread-e-develop-regen-pending.json`
- Pending DROP replacement queue:
  - `scripts/manifests/thread-e-drop-replacements-pending.json`

## Intended Use

- Re-validate current Wave A+B 20:
  - `node scripts/run-parallel-case-batch.cjs --manifest scripts/manifests/thread-e-wave-ab-20.json`
- Re-validate current keep-only 18:
  - `node scripts/run-parallel-case-batch.cjs --manifest scripts/manifests/thread-e-wave-ab-keep18.json`
- When CT hands off DEVELOP fixes:
  - fill `thread-e-develop-regen-pending.json`
  - run the manifest in parallel
- When CT hands off DROP replacements:
  - fill `thread-e-drop-replacements-pending.json`
  - run the manifest in parallel

## Notes

- Existing generated files for `neighbor-new-10` and `civic-new-07` are intentionally kept on disk.
- They are excluded only from the prepared keep-only manifest, not deleted.
- Future replacements should use new case IDs and go through the generic Thread-E parser/compiler path.
