# Project_Solomon Steam Achievements

Initial canonical achievement IDs for Steamworks setup.

| ID | Display name | Unlock condition draft |
| --- | --- | --- |
| `ACH_FIRST_CASE_CLEARED` | First Verdict | Clear any case once. |
| `ACH_PERFECT_VERDICT` | Perfect Verdict | Finish a case with a top-tier verdict score. |
| `ACH_TRUTH_BREAKTHROUGH` | Truth Breakthrough | Trigger a major truth reveal or confession path. |
| `ACH_EVIDENCE_MASTER` | Evidence Master | Resolve a case after using all required evidence paths. |
| `ACH_MEDIATION_SUCCESS` | Mediation Success | Complete a mediation phase with a successful outcome. |
| `ACH_NO_HINT_CLEAR` | Clear-Eyed Judge | Clear a case without using hint-style assistance. |
| `ACH_ALL_BASE_CASES_CLEARED` | Circuit Complete | Clear all base release cases. |
| `ACH_JUDGE_LEVEL_10` | Seasoned Arbiter | Reach judge progression level 10. |
| `ACH_STREAK_7_DAYS` | Seven-Day Bench | Play or check in across a 7-day streak. |
| `ACH_STEAM_DECK_SESSION` | Handheld Hearing | Start or complete a session on Steam Deck. |

## Steamworks setup

Create matching achievement API names in Steamworks using the IDs above. Keep the API names stable even if display names change later.

## Runtime notes

The Electron bridge uses this same default list when `STEAM_ACHIEVEMENT_IDS` is not set. If Steamworks adds/removes IDs later, update both this document and `DEFAULT_ACHIEVEMENT_IDS` in `electron/steamworks-bridge.cjs`, or set:

```env
STEAM_ACHIEVEMENT_IDS=ACH_FIRST_CASE_CLEARED,ACH_PERFECT_VERDICT,...
```

Unlock integration is not wired to gameplay events yet. The next implementation pass should map result/progression events to these IDs through `steamAchievements.unlock(id)`.
