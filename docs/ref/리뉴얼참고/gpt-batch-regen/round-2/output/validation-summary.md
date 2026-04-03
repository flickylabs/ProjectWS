# Regenerated tells-beats summary

All four cases were regenerated into TypeScript and JSON pairs.

| caseId | executableTells | beatScripts |
|---|---:|---:|
| partnership-01 | 6 | 36 |
| partnership-03 | 6 | 36 |
| partnership-06 | 6 | 36 |
| partnership-07 | 6 | 36 |

Checks passed:
- `tellPool` references all resolve to `executableTells`.
- `beatScripts` IDs are unique and follow the expected pattern.
- `afterEvidence` values resolve against the source case JSON evidence IDs.
- Each `(party, dispute)` beat set contains the 6 expected beat types.
