# Codex-Dev A Phase 2.A-2/A-3 Summary

## 1. HEAD
- Baseline before patch: `4e0a1b6 docs(policy): tier-3 guard hardening — paraphrase set + uiSurfaceMap surface`
- Commit: `2e527bd fix(ui): stabilize surface labels and archetype fallback`

## 2. Scope
- A-2 UI surface stabilization for evidence/dossier/dispute display paths.
- A-3 archetype fallback helper and 6 active archetype Korean labels.
- No wrapper, policy JSON/Markdown, runtime guard, or Dev-B engine files changed.

## 3. Commands Run
- `npm run build` PASS
- `npx tsc -b --force` PASS
- `git diff --check` PASS after EOF whitespace cleanup
- `git commit -m "fix(ui): stabilize surface labels and archetype fallback"` PASS

## 4. A-2 Path List
- `src/components/actions/ActionPanel.tsx`
- `src/components/actions/DossierCardPanel.tsx`
- `src/components/actions/DossierHint.tsx`
- `src/components/discovery/DisputeBoard.tsx`
- `src/components/discovery/EvidenceAppraisalModal.tsx`
- `src/components/info/EvidenceBoard.tsx`
- `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx`
- `src/components/pc/hotbar/PCActionsPanel.tsx`
- `src/components/pc/panels/PCRightPanel.tsx`
- `src/components/verdict/EvidenceLegality.tsx`

## 5. A-2 Diff Summary
- Before: several UI/LLM context paths emitted `evidence.name`, `evidence.description`, `card.name`, or event fallback `ev.description` directly.
- After: evidence paths use `state?.deepInvestigated ? canonical : surfaceName/surfaceDescription` branching; dossier and dispute labels use surface-safe labels; event fallback strings use non-spoiler surface copy.

## 6. deepInvestigated Branch Areas
- `ActionPanel`, `DossierCardPanel`, `DossierHint`, `EvidenceAppraisalModal`, `EvidenceBoard`, `PCActionsPanel`, `EvidenceLegality`.
- `PCRightPanel` has no deep investigation state in scope, so it defaults to `surfaceName` and then sanitized node labels.
- `DiscoveryFeedbackWatcher` event descriptions are not `EvidenceNode` data; raw event fallback descriptions were replaced with generic surface-safe copy.

## 7. A-3 Helper
- Added `src/utils/archetypeLabel.ts`.
- API: `getArchetypeLabel(archetype: string | null | undefined): string`.
- Fallback: `기타`, never raw English code.

## 8. A-3 6 Path Areas
- `src/components/court/PartyStatusBar.tsx:160`
- `src/components/layout/CourtHeader.tsx:478`
- `src/components/pc/home/PCCaseBrief.tsx:96/128`
- `src/components/phase/Phase0_CaseIntro.tsx:132/142`

## 9. A-3 Mapping Verification
- `avoidant` -> `회피형`
- `victim_cosplay` -> `피해 호소형`
- `confrontational` -> `정면돌파형`
- `affect_flattening` -> `감정 억제형`
- `cold_logic` -> `냉정 분석형`
- `premature_summary` -> `성급 결론형`
- Missing/unknown -> `기타`

## 10. npm run check:all Result
- Not run for this commit. A-2/A-3 are wrapper-unrelated UI paths per instruction.
- `npm run build` and `npx tsc -b --force` both passed.

## 11. Baseline Regression
- No ScriptedText files changed in this commit.
- Baseline anchor/tag/checksum untouched.

## 12. Known vs New Finding
- Known: chunk-size warnings remain build-only Vite warnings.
- New: none observed in A-2/A-3 scope.
