# Pilot Case Generation Plan

Status: approved pilot direction by `PROJECT_CONTROL_TOWER`

## 1. Proposed Pilot

Use a spouse relationship pilot first.

Reasoning:

- `spouse-01` has the richest active policy documentation.
- Disclosure policy includes a full spouse case body, while family/friend policy bodies are still partially deferred.
- The active runtime already exercises spouse-specific phase1, scripted text, claim policy, witness, and QA manifest surfaces.

Session-first correction:

- `spouse` is not a cosmetic relationship label. The central event must naturally belong inside a marriage or long-term partnership.
- A concept is invalid if it can move to a neighbor, workplace, family, friend, or tenant Session with only superficial renaming.
- For `spouse-02`, concepts should be built from spouse-native engines such as shared marital finances, spouse consent and trust, career sacrifice inside marriage, domestic labor imbalance, family planning, caregiving responsibility, in-law pressure, private information known inside marriage, joint account/loan/lease/insurance obligations, or grounded separation preparation.
- Generic repair, housing, compensation, workplace, or privacy disputes must be rejected even if the parties are named as spouses.

Draft case ID:

- `spouse-02` while under `tmp/case-generation/`

Production case ID:

- `spouse-02`

## 2. Naming Rule

Draft IDs:

```text
{relationship}-pilot-{NN}
```

Examples:

- `spouse-pilot-01`
- `family-pilot-01`
- `friend-pilot-01`

Production IDs:

```text
{relationship}-{NN}
```

Examples:

- `spouse-02`
- `family-02`
- `friend-02`

Runtime field convention:

- file name and ScriptedText `caseId`: no `case-` prefix, for example `spouse-pilot-01`
- runtime case JSON `caseId` and phase1 `caseId`: `case-{caseId}`, for example `case-spouse-pilot-01`

## 3. Required Draft Files

The generator creates a deterministic draft directory:

```text
tmp/case-generation/{caseId}/
  README.md
  input/
    brief.md
  draft/
    case-data.json
    scripted-text.json
    phase1-dialogue.json
    witness-testimony.ts
    claim-policy-structure-v2.json
    game-events.json
  manifests/
    reference-check.json
    output-manifest.json
    promotion-checklist.md
  qa/
    route-manifest.stub.json
```

## 4. Staged Generation Order

1. Case brief
   - Session-first decision test
   - human-readable controller decision brief
   - dispute-level Angle plan
   - relationship type
   - title
   - core misunderstanding
   - anchor truth
   - emotional bait
   - resolution dilemma
   - hidden truth lexeme list
   - surface aliases

2. Runtime case JSON draft
   - parties
   - context
   - disputes
   - evidence
   - truth table
   - lie configs
   - solutions
   - combination lab outline
   - evidence `partyContext.questionAngle` aligned to the Angle plan

3. Safety and policy pass
   - hidden truth gating
   - surface names
   - evidence stage boundaries
   - dispute unlock conditions
   - judge/system/dossier text restrictions
   - Angle-specific truth boundaries

4. Minimal ScriptedText draft
   - target 18-channel structure
   - initially fill only channels needed for pilot route validation
   - expand channel coverage after schema compatibility is confirmed
   - generate route-critical entries by `disputeId + angleId + questionType + lieState`, not by dispute title alone

5. Phase 1 dialogue
   - no anchor truth leakage
   - angry callTerm use if needed
   - choice branches only where runtime currently supports them

6. Witness testimony
   - 3 witnesses, 3 depths each as the active pattern
   - witness knowledge budgets must not exceed route gating

7. QA manifests
   - one linear route
   - one evidence-heavy route
   - one dossier/witness route
   - one hidden-dispute or late-stage route if the case has hidden disputes
   - each route should name the primary Angle being tested

8. Runtime promotion proposal
   - exact production paths
   - changed registry/manifests
   - validation result paths
   - remaining risks

## 5. Review Checkpoints

Controller review is required at these points:

1. Session-first concept approval before any full draft content is written
2. human-readable decision brief approval; generator notes alone are not sufficient
3. dispute Angle plan approval before runtime JSON work
4. brief approval before runtime JSON work
5. schema review after `case-data.json` draft is filled
6. disclosure review before ScriptedText expansion
7. QA manifest review before route simulator integration
8. final promotion approval before any `src/data/**` write

## 6. QA Commands

Run after docs/script changes:

```powershell
npm run build:pc
npm run check:policy
npm run check:sync
```

Run for the generator scaffold:

```powershell
node scripts/generate-case-draft.mjs --case-id spouse-pilot-01 --relationship spouse --brief docs/case-generation/pilot-case-brief-template.md --out tmp/case-generation --dry-run
```

After a real pilot draft exists, add case-specific route checks from an isolated result directory rather than overwriting shared QA results.

## 7. Controller Decisions Needed Before Production Promotion

- Whether the selected concept is truly spouse-native and cannot be moved to another Session by renaming.
- Whether the dispute Angle plan covers every fact line the player must test.
- Chapter placement beyond `spouse-02`.
- Whether any concept-stage sensitivity risk should block the case before full generation.
- Whether full 18-channel ScriptedText is complete enough for production promotion.
- When to add `v2-atoms` after route validation.
- Whether mediation consistency requires both ScriptedText `mediation` and `dialogues/mediation` before hidden QA.
- When to register `spouse-02` in the refined manifest after hidden QA passes.

## 8. Approved Controller Defaults

- First pilot relationship type: `spouse`.
- Draft and production ID: `spouse-02`.
- Route-critical ScriptedText is acceptable for the first playable QA.
- Full 18-channel ScriptedText coverage is required before production promotion unless explicitly waived.
- `v2-atoms` are deferred until the route and case graph are stable.
- `spouse-02` remains hidden QA-only until playtest/QA passes; do not add it to `src/data/cases/refined/manifest.json` at initial draft stage.
