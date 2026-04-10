# Thread A Salvage Status (2026-04-10)

## What Is Still Usable

- Generator/validator infrastructure is present and runnable.
- Generated case data exists for 188 cases.
- Scripted bundles exist for 119 cases.
- Phase1/Phase2 files exist for 86 cases each.
- Mediation files exist for 119 cases.
- Active general-mode manifest is currently reduced to 12 cases to stop obviously mismatched content from shipping.

## What Was Wrong

- Release completion was judged too heavily by stage3/scripted validators.
- Session-fit was not treated as a hard gate.
- Phase0~2 play quality was not treated as a release blocker.
- Some generated system/evidence/witness scaffolds are still meta/generic.
- Some phase overrides contain stale names or wrong framing.

## Immediate Safe Position

Active release candidates in manifest:
- `family-05`
- `family-09`
- `friend-03`
- `neighbor-03`
- `neighbor-08`
- `partnership-04`
- `partnership-09`
- `spouse-05`
- `spouse-11`
- `tenant-02`
- `tenant-09`
- `workplace-12`

Removed from active set pending reframing:
- 'friend-07'
- 'headline-01'
- 'spouse-12'
- 'workplace-11'

## Salvageability

Not all 5 days are lost. The following are reusable:
- compiler/generator pipeline
- runtime/scripted validators
- case authoring docs and redesign docs
- generated case data as raw material
- media/viewer contract groundwork

The content layer that must be re-evaluated is:
- session-to-story mapping
- phase dialogue wording
- witness/evidence/aftermath scaffolds
- release gating criteria
