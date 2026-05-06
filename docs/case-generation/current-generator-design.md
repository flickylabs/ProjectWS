# Current Case Generator Design

Status: pilot-path design for `CASE_GENERATOR_REBUILD`

This document defines the current safe generation pathway for Korean-first Project_Solomon case drafts. It does not approve production promotion and does not revive any archived bulk generator.

## 0. Session-First Rule

Every generated case must start from the selected Session.

The selected Session defines the case's core event. It is not a decorative label for the parties. A case is invalid if it can move to another Session with only superficial renaming.

For example, a `spouse` case must be about a conflict that naturally and specifically belongs inside marriage or a long-term cohabiting partnership: shared marital finances, spouse consent and trust, career sacrifice inside marriage, domestic labor imbalance, family planning, caregiving responsibility, in-law pressure, private information known inside marriage, joint account/loan/lease/insurance obligations, or grounded separation preparation.

Before drafting runtime data, every concept must answer:

1. Why can this case only or best happen in this Session?
2. What would break if the parties were not in this relationship?
3. Which evidence exists because of this relationship?
4. Which witness has relevant access because of this relationship?
5. What final dilemma is emotionally specific to this relationship?

If those answers are weak, reject the concept before schema work.

Every concept packet must also include a human-readable decision brief. Generator notes alone are not enough for controller decisions. The controller must be able to decide the direction without reading raw generation scaffolds or internal notes.

## 0.1 Dispute Angle Rule

Every approved concept must be decomposed into dispute-level Angles before runtime JSON or ScriptedText generation.

An Angle is a specific line of questioning inside one dispute. It is not the same as the dispute title. Each Angle must define:

- `disputeId`
- stable `angleId`
- human-readable label
- what factual line it tests
- valid question types: `fact_pursuit`, `motive_search`, `empathy_approach`
- attack vectors such as `timeline`, `authenticity`, `consent`, `money_flow`, `motive`, `responsibility`, or `relationship_boundary`
- required or strengthening evidence IDs
- relevant witness IDs
- truth boundary: what cannot be said before S5 and what can be said at S5
- surface aliases for judge/system/dossier channels

This Angle plan is required input for:

- `scriptedAngles/{caseId}_angle_catalog.json`
- route-critical judge questions
- NPC interrogation ScriptedText keys
- free interrogation mapping
- evidence `partyContext.questionAngle`
- dossier question prompts
- witness knowledge budgets
- QA route manifests

Do not generate broad generic responses from only a dispute name. The generator must know which Angle is being asked.

## 1. Current Runtime Sources

The active runtime currently reads these surfaces:

| Surface | Active path | Role |
|---|---|---|
| Runtime case JSON | `src/data/cases/generated/{caseId}.json` | Main `CaseData` payload: parties, context, disputes, evidence, truth table, lie configs, solutions, combination lab, V3 design metadata. Runtime `caseLoader.ts` imports every JSON in this directory, then filters by scripted bundle and refined manifest. |
| Refined manifest | `src/data/cases/refined/manifest.json` | Production visibility gate. With `USE_REFINED_ONLY = true`, a new production case must be listed here before normal selection. |
| ScriptedText bundle | `src/data/scriptedText/{caseId}.json` | Case-specific authored responses. Active bundles are 18-channel runtime sources. |
| Phase 1 dialogue | `src/data/dialogues/phase1/{caseId}.json` | Opening/pretrial dialogue. `caseId` field uses `case-{caseId}`. There is no separate active `phase2` file. |
| Mediation dialogue | `src/data/dialogues/mediation/{caseId}.json` or existing V3 naming | Mediation path dialogue. ScriptedText also carries a `mediation` channel, so promotion must verify which runtime surface is authoritative for the pilot. |
| Witness testimony | `src/data/witnessTestimonyData/{caseId}.ts` | Multi-depth witness testimony slots and effects. |
| Claim policy structure | `src/data/claimPolicies/{caseId}-structure-v2.json` | Extended dispute/evidence structure, depth layers, and links used by QA/runtime policy. |
| Claim policy events | `src/data/claimPolicies/{caseId}-game-events.json` and optional `-game-events-v2.json` | Contradictions, interjections, emotional outbursts, and transition beat event data. |
| V2 atoms | `src/data/claimPolicies/{caseId}-v2-atoms.json` | Large claim atom data used by policy/QA surfaces. Pilot generation should defer full atom authoring unless a controller approves scope. |
| Dossier cards | `src/data/claimPolicies/{caseId}-dossier-cards.json` where present | Source-of-truth dossier card surface for family/friend style flows. Spouse currently has `spouse-01-v3-game-loop-data.json` instead. |
| Disclosure policy | `docs/disclosure-policy.md` and `src/data/disclosurePolicy/*.json` | Truth leak policy. The JSON policy is for validation, not runtime import. |
| QA manifests | `tmp/qa-runtime-gate-manifests/`, `tmp/qa-route-simulator-manifests/` | Route/gate coverage fixtures. New pilot manifests start in `tmp/case-generation/{caseId}/qa/`. |

## 2. Outputs A New Case Needs

A production-ready case ultimately needs:

1. `src/data/cases/generated/{caseId}.json`
2. `src/data/scriptedText/{caseId}.json`
3. `src/data/dialogues/phase1/{caseId}.json`
4. witness testimony TypeScript under `src/data/witnessTestimonyData/`
5. claim policy structure and game event JSON under `src/data/claimPolicies/`
6. QA route/gate manifests
7. registration in any index/manifest surface used by runtime selection, especially `src/data/cases/refined/manifest.json`
8. disclosure-policy coverage for new hidden truth lexemes and surface aliases

All generated drafts must stay under `tmp/case-generation/` until controller approval.

## 3. Mandatory Pilot Outputs

The first pilot should be a compatibility pilot, not a content-scale run. Mandatory draft outputs are:

| Draft output | Draft path |
|---|---|
| case brief | `tmp/case-generation/{caseId}/input/brief.md` |
| runtime case JSON scaffold | `tmp/case-generation/{caseId}/draft/case-data.json` |
| ScriptedText scaffold with 18-channel target list | `tmp/case-generation/{caseId}/draft/scripted-text.json` |
| Phase 1 dialogue scaffold | `tmp/case-generation/{caseId}/draft/phase1-dialogue.json` |
| witness testimony scaffold | `tmp/case-generation/{caseId}/draft/witness-testimony.ts` |
| claim policy structure scaffold | `tmp/case-generation/{caseId}/draft/claim-policy-structure-v2.json` |
| game events scaffold | `tmp/case-generation/{caseId}/draft/game-events.json` |
| QA route manifest stub | `tmp/case-generation/{caseId}/qa/route-manifest.stub.json` |
| reference check manifest | `tmp/case-generation/{caseId}/manifests/reference-check.json` |
| promotion checklist | `tmp/case-generation/{caseId}/manifests/promotion-checklist.md` |

These files are not production-ready content. They are a deterministic workspace for authoring, review, and compatibility checks.

## 4. Deferred Outputs

The following are deferred until the pilot schema passes review:

- full autonomous ScriptedText content generation
- bulk generation across relationship types
- translation files for English, Japanese, or Simplified Chinese
- `v2-atoms` generation
- production writes to `src/data/**`
- refined manifest registration
- Steam/release packaging changes
- regeneration of existing active cases

## 5. Schema Risks And Known Mismatches

Current risks found while comparing docs and active files:

1. `docs/case-generation/scripted-text-channels.md` documents 15 channels and includes `system_message_v2`, but active bundles use 18 channels and do not include `system_message_v2`.
2. `src/types/scriptedText.ts` strictly models the older 6-channel shape, while `scriptedTextLoader.ts` reads additional channels dynamically.
3. `src/types/case.ts` does not model every active JSON field. Active cases include `sensitivityTags` and `v3Design`, but the runtime loader mostly passes them through as raw data.
4. `caseLoader.ts` filters production cases by both scripted bundle existence and `src/data/cases/refined/manifest.json`.
5. `schemas.md`, `quality-rules.md`, and `scripted-text-channels.md` appear to contain useful rules, but some local terminal reads show encoding corruption. Treat active runtime files as the stronger source when a doc/runtime mismatch exists.
6. `family-01` has a documented dossier/combination-lab generated-artifact gap in `regeneration-policy.md`; do not use it as a clean promotion template without reading that section.
7. Disclosure policy is stricter than plain schema validation. Surface names, system/judge/dossier text, and evidence discovery text must not reveal hidden truth before player discovery.

## 6. Safe Generation Path

The pilot generator is staged:

1. Apply the Session-first decision test from section 0.
2. Create Korean concept options plus a controller-readable decision brief.
3. Get controller approval for one concept before detailed generation.
4. Create a dispute Angle plan as defined in section 0.1.
5. Author Korean case brief from `pilot-case-brief-template.md`.
6. Run `scripts/generate-case-draft.mjs` with explicit `--brief`, `--out`, `--case-id`, and `--relationship`.
7. Review generated scaffolds under `tmp/case-generation/{caseId}/`.
8. Fill `case-data.json` first and run structural review against active examples.
9. Add minimal ScriptedText only after the case JSON, dispute IDs, evidence IDs, surface map, and Angle plan are stable.
10. Add Phase 1 dialogue, witness testimony, and QA route stubs.
11. Run validation commands.
12. Prepare a promotion proposal. Do not copy into `src/data/**` until the controller approves.

## 7. Validation Commands

Baseline commands required after script/docs changes:

```powershell
npm run build:pc
npm run check:policy
npm run check:sync
```

Generator dry-run example:

```powershell
node scripts/generate-case-draft.mjs --case-id spouse-pilot-01 --relationship spouse --brief docs/case-generation/pilot-case-brief-template.md --out tmp/case-generation --dry-run
```

Generator write example for a reviewed brief:

```powershell
node scripts/generate-case-draft.mjs --case-id spouse-pilot-01 --relationship spouse --brief tmp/case-generation/spouse-pilot-01/input/brief.md --out tmp/case-generation
```

The script must refuse writes outside `tmp/case-generation/`.

## 8. Promotion Process

Promotion is a separate controller-approved operation:

1. Confirm final production `caseId`. Draft IDs may use `{relationship}-pilot-01`; production IDs should use the chapter sequence approved by `PROJECT_CONTROL_TOWER`.
2. Check every generated file against active case examples and disclosure policy.
3. Verify no hidden truth lexemes appear in surface-only channels.
4. Run the QA route/gate manifests from an isolated result directory.
5. Copy approved files from `tmp/case-generation/{caseId}/draft/` to exact production paths.
6. Add any required registrations, including refined manifest and loaders/indexes if needed.
7. Run `npm run build:pc`, `npm run check:policy`, and `npm run check:sync`.
8. Report changed paths, validation results, and unresolved risks to the controller.

No production promotion, commit, or push is implied by this document.
