# Chain Unlock Flow Diagram

Date: 2026-04-27

## Before

```text
A d-1 fact_pursuit repeat
  -> lie transition reaches progressed state
  -> discoverEvidenceFromQuestioning()
  -> related locked evidence auto-discovered
  -> e-4 truth-name display risk
  -> DiscoveryIntegration / generic GameEventTrigger emergence
  -> d-2 / hidden disputes can cascade open
  -> early hook dialogue can leak B's family/cash truth
```

## After

```text
A d-1 fact_pursuit repeat
  -> lie transition may progress
  -> discoverEvidenceFromQuestioning(questionType = fact_pursuit)
  -> return without auto-discovery
  -> no e-4 auto-unlock from fact_pursuit alone
  -> no d-2 emergence until e-4 has evidence stage
  -> no h-d3 emergence until d-2 + e-5
  -> no h-d4 emergence until d-2 + h-d3 + e-6 + e-7
```

## Allowed Route

```text
Player earns evidence stage through authored discovery path
  -> UI displays surfaceName until deep investigation
  -> DiscoveryIntegration checks spouse-01 gate
  -> only then emerge next dispute
```

## Guard Locations

- `src/hooks/useActionDispatch.ts`
  - `questionType === 'fact_pursuit'` returns before evidence auto-discovery.
  - `requiredLieState` is checked before related evidence unlock.
- `src/hooks/useDiscoveryIntegration.ts`
  - spouse-01 route gates enforce evidence-stage prerequisites.
- `src/engine/gameEventTriggerEngine.ts`
  - broad hidden-dispute fallback is disabled.
