Thread A touched one additional UI guard related to the optional Combination Lab behavior.

Updated file:
- [D:\ProjectWS\src\components\discovery\DisputeBoard.tsx](D:/ProjectWS/src/components/discovery/DisputeBoard.tsx)

Change:
- `CombinationLabPanel` is now rendered only when `caseData.combinationLab` exists.
- This is a parent-level guard in addition to the panel's own internal null-return.

Reason:
- CT requested that `combinationLab` remain a strictly optional extension.
- Current authored coverage is `headline-01` only.
- The other `116` curated scripted cases should stay on the existing flow with no lab UI surface.

No new store contract was introduced by this guard.
