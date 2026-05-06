# spouse-02 Controller Plan

Status: `PROJECT_CONTROL_TOWER` decision record, revised after Session-first correction

## Controller Decisions

| Topic | Decision |
| --- | --- |
| Relationship type | `spouse` |
| Production case ID | `spouse-02` |
| Draft workspace ID | `spouse-02` |
| Source language | Korean first |
| Initial registration | Hidden QA-only draft first; do not add to `src/data/cases/refined/manifest.json` until playable QA passes |
| First playable QA ScriptedText scope | Route-critical minimum channels allowed |
| Production ScriptedText scope | Full 18-channel coverage required before production promotion unless explicitly waived |
| `v2-atoms` | Defer until the route and case graph are stable |
| Mediation surface | Treat both ScriptedText `mediation` and `dialogues/mediation` as required before production; route-critical ScriptedText mediation can come first |
| Existing active cases | Do not regenerate or modify existing active cases |

## Rejected Direction

The previous concept direction `누수 전날의 보험신청` is rejected.

Reason:

- It is structurally a housing/repair/compensation dispute.
- The parties happen to be spouses, but the core event does not require the spouse Session.
- It could move to roommate, family, landlord-tenant, or neighbor Session with superficial renaming.
- It should not be salvaged by adding spouse details after the fact.

`spouse-02` must restart from a Session-first concept.

## Recommended Generation Flow

The case should not be generated as one large blob. Use these gates.

### Gate 1. Big Concept

Output:

- 3 spouse-case concepts.
- One recommended concept.
- No runtime JSON yet.

Review focus:

- Is the case distinct from `spouse-01`?
- Is the misunderstanding playable?
- Does the anchor truth support 4-5 disputes and 5-7 evidence items?
- Does it avoid overly sensitive or hard-to-localize material?

### Gate 2. Truth And Surface Architecture

Output:

- Anchor truth.
- Hidden truth lexeme list.
- Allowed surface aliases.
- Initial/hidden disputes.
- Evidence stage boundaries.

Review focus:

- No premature truth leakage.
- Judge/system/dossier copy can stay surface-only.
- The truth can be discovered through evidence and questioning, not exposition.

### Gate 3. Gameplay Graph

Output:

- Dispute graph.
- Evidence graph.
- Combination lab outline.
- Unlock conditions.
- Witness knowledge budgets.
- QA route outline.

Review focus:

- Every hidden dispute has a clean unlock path.
- Every decisive claim has supporting evidence.
- Red herrings are fair, not arbitrary.
- The route simulator can cover the case.

### Gate 4. Runtime Case Draft

Output:

- `tmp/case-generation/spouse-02/draft/case-data.json`
- Policy notes.
- Promotion risks.

Review focus:

- Schema compatibility.
- Surface names and descriptions.
- Correct responsibility totals.
- Evidence dependencies.

### Gate 5. Scripted And Dialogue Drafts

Output:

- Route-critical ScriptedText entries first.
- Phase 1 dialogue.
- Witness testimony.
- Mediation draft.

Review focus:

- Korean naturalness.
- Speaker voice consistency.
- Hidden-truth gating.
- No generated text reveals late-stage truth early.

### Gate 6. QA And Promotion Proposal

Output:

- Case-specific QA route manifests.
- Validation results.
- Exact production copy plan.

Review focus:

- Build and policy checks pass.
- Hidden QA-only playtest passes.
- Only then register in refined manifest.

## Next Worker Request

Send `docs/case-generation/threads/02-codex-spouse-02-concept-brief.md` to `CASE_GENERATOR_REBUILD`.
