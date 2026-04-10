# Thread A Crisis Report (2026-04-10)

## Summary

Thread A is reporting a structural failure in how release readiness has been judged.

The problem is not just that some scripts are awkward.
The deeper issue is that:
- story-to-session mapping was not treated as a hard gate
- Phase 0~2 play quality was not treated as a release blocker
- stage/scripted validator PASS was incorrectly allowed to stand in for actual playable quality

As a result, Thread A produced too much infrastructure and too many generated assets without enough separation between:
- story design
- session-fit judgment
- generator output
- black-box play QA

This needs orchestration-level restructuring, not another local patch cycle.

## Current Status

### What is still usable

These are salvageable and should not be thrown away:
- generator/compiler pipeline
- runtime/scripted validators
- generated case JSON base data
- redesign/story boost source documents
- batch execution and manifest separation tools
- viewer/media contract groundwork

Current rough inventory:
- generated cases: `188`
- scripted bundles: `119`
- phase1 files: `86`
- phase2 files: `86`
- mediation files: `119`

### What is not reliable

These are not safe to treat as release-ready:
- current session-to-story assignments
- Phase 0~2 dialogue quality
- witness/evidence/aftermath/system scaffold quality
- release-ready determination that depends mainly on validator PASS

## Immediate Correction Already Applied

General mode was reduced from `16` active cases to `12` provisional cases.

Current active manifest:
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

Reference:
- [D:\ProjectWS\src\data\cases\refined\manifest.json](D:/ProjectWS/src/data/cases/refined/manifest.json)
- [D:\ProjectWS\docs\ref\scripted-text\thread-a-active12-session-fit-audit-2026-04-10.md](D:/ProjectWS/docs/ref/scripted-text/thread-a-active12-session-fit-audit-2026-04-10.md)
- [D:\ProjectWS\tmp\session-reframe-backlog-4.json](D:/ProjectWS/tmp/session-reframe-backlog-4.json)

Important: even these `12` are only the provisional session-coherent set. They are not being claimed as final release-quality cases yet.

## Root Cause

Thread A was effectively handling too many responsibilities at once:
- story/session mapping
- generator design
- scripted production
- phase generation
- media generation
- validator design
- release readiness judgment

That overload created a false positive loop:
- structure passed
- validators passed
- manifest passed
- but actual play text and session identity were still wrong

## Required Re-Orchestration

### Thread E
Owns:
- story concept
- session fit
- reclassification / reframing / removal decisions

Thread E should decide whether a case naturally belongs in a session before Thread A generates release content for it.

### Thread A
Owns:
- compiler/generator
- hard gates
- deterministic content scaffolding
- regeneration tools

Thread A should not be the final authority on whether a story belongs to a session.

### Thread C
Owns:
- black-box QA
- phase-by-phase play testing
- release blocker reporting

Thread C should test against actual play, not only validator output.

### Thread B
Owns:
- UI consumption
- presentation quality
- viewer/readability issues

## New Release Rule

A case must not be considered release-ready unless all of the following are true:
- session fit is natural
- generated runtime case exists
- scripted bundle exists
- Phase 1 exists
- Phase 2 exists
- mediation exists if required for the flow
- semantic/scripted validators pass
- actual play text is not obviously scaffold/meta/generic
- evidence presentation is readable enough for player judgment

## Recommended Next Steps

1. Freeze expansion.
Do not add more cases until the release set logic is stable.

2. Keep only the provisional active set.
Do not allow backlog or reframing candidates into general mode.

3. Treat story/session fit as a pre-generation gate.
If a case does not naturally fit its session, do not try to repair it with script tone.

4. Have Thread C run black-box testing on the provisional active set only.
Focus on:
- first screen
- Phase 0
- Phase 1
- Phase 2
- evidence readability
- witness/aftermath tone

5. Have Thread A repair generator scaffolds only after the case is confirmed session-valid.

## Bottom Line

This is not a “few bad lines” problem.
It is an orchestration problem:
- wrong role boundaries
- wrong release gates
- too much trust placed in structural PASS

Thread A is explicitly asking CT to re-orchestrate responsibilities before further release work proceeds.
