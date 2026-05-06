# Active Session-Fit Audit (2026-04-10)

## Decision

General mode should keep only session-coherent relationship cases.

Kept in active manifest:
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

Removed from active manifest pending reframing:
- `friend-07`
- `headline-01`
- `spouse-12`
- `workplace-11`

## Why These 4 Were Removed

### `friend-07`
- Base conflict is currently driven more by secret dating, selection favoritism, and multi-channel rumor spread than by the emotional logic of a `friend` session.
- It can likely be saved, but only after the friendship betrayal frame is moved ahead of the scandal frame.

### `headline-01`
- The case itself is strong, but `headline` is a special lane, not a relationship session.
- Keeping it in the same active relationship pool blurs the user's expectation of what a session means.

### `spouse-12`
- The current spine reads first as rumor spread / forged capture / anonymous account scandal.
- The spouse trust-collapse angle exists, but it is not dominant enough yet.

### `workplace-11`
- The strongest frame is currently inventor deletion / broker transfer / concealment conspiracy.
- It needs a clearer boss-employee power imbalance and retaliation frame before it belongs in `boss_employee`.

## Working Principle

Do not force mismatched cases into a session category.

If a case's strongest playable frame does not naturally match its session label, one of these must happen first:
- reframe the case so the session logic is dominant
- move it to a more appropriate lane
- keep it out of the release set

## Immediate Release Rule

For release, a case is active only if all of the following are true:
- session fit is natural
- Phase 1 exists
- Phase 2 exists
- scriptedText exists
- semantic quality is acceptable
- actual play text does not collapse into generator/meta language
