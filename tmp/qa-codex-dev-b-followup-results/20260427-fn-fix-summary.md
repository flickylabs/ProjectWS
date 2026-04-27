# Codex-Dev B Follow-up FN Fix Summary

- Date: 2026-04-27
- HEAD before change: `f03f49f feat(engine): tier-3 disclosure guard MVP — log mode + feature flag default off`
- HEAD after commit: `bd46418 fix(disclosureGuard): catch 보내신 honorific inflection in family-01 paraphrase`
- Commit SHA: `bd46418`
- Scope: `src/engine/disclosureGuard.ts` only, `PARAPHRASE_RULES['family-01']` one rule
- `src/app/pc.css`: untouched / unstaged / UI sub-thread dirty area preserved

## Start Gate

- `git status --short --branch`: `## main...origin/main`, tracked modified file was `src/app/pc.css`; untracked `tmp/*` areas already present.
- `git log --oneline -1`: `f03f49f feat(engine): tier-3 disclosure guard MVP — log mode + feature flag default off`
- `git diff --cached --name-only`: empty
- `git diff --name-only`: exactly `src/app/pc.css`
- `npm run check:all`: PASS, hard 0 / warnings 157

## Rule Before / After

Before:

```ts
{ label: '어머니 통장으로 정기적으로 돈을 보낸' },
```

After:

```ts
{
  label: '어머니 통장으로 정기적으로 돈을 보내(신|시는|고|며|었|던)?',
  matcher: (text) => /어머니\s*통장으로\s*정기적으로\s*돈을\s*보내(신|시는|고|며|었|던)?/.test(text),
},
```

Regex matcher spec:

```text
/어머니\s*통장으로\s*정기적으로\s*돈을\s*보내(신|시는|고|며|었|던)?/
```

## Commands Run

- `npm run build`: PASS
- `npx tsc -b --force`: PASS
- `npm run check:all`: PASS, hard 0 / warnings 157
- QA-T3-GuardLog targeted: PASS via Vite SSR in-memory module load, no new harness file created
- `git add src/engine/disclosureGuard.ts`: exact single-file stage command used
- `git diff --cached --name-only`: exactly `src/engine/disclosureGuard.ts`
- `git commit -m "fix(disclosureGuard): catch 보내신 honorific inflection in family-01 paraphrase"`: created `bd46418`

Note: the first targeted command attempt used the default PowerShell native pipeline and corrupted Korean input to `???`; it was discarded. The same in-memory SSR check was rerun with `$OutputEncoding` and `[Console]::OutputEncoding` set to UTF-8 and passed.

## Verification Results

1. `npm run build`: PASS
2. `npx tsc -b --force`: PASS
3. `npm run check:all`: PASS, hard 0 / warnings 157
4. QA-T3-GuardLog targeted: PASS

Targeted samples:

| Sample | Mode | Result |
|---|---|---|
| `윤정후 씨, 어머니 통장으로 정기적으로 돈을 보내신 사실은 인정하십니까.` | `log` | `action='log'`, matched `어머니 통장으로 정기적으로 돈을 보내(신|시는|고|며|었|던)?` |
| `윤정후 씨, 어머니 통장으로 정기적으로 돈을 보내고 있다는 사실은 인정하십니까.` | `log` | `action='log'`, matched new rule label |
| `윤정후 씨, 어머니 통장으로 정기적으로 돈을 보내며 도우신 사실은 인정하십니까.` | `log` | `action='log'`, matched new rule label |
| `윤정후 씨, 어머니께 돈을 보내셨습니까.` | `log` | `action='pass'` |
| source text above | `off` | `action='pass'` |

Targeted warning count: 3, matching the three `log` detections.

## FP Avoidance

- General remittance expression `윤정후 씨, 어머니께 돈을 보내셨습니까.` returned `action='pass'`.
- The matcher is context-bound to `어머니 통장으로 정기적으로 돈을 ...`, so it does not catch the generic `어머니께 돈을 보내` form.

## Regression Check

- `git diff -- src/engine/disclosureGuard.ts` before commit showed one hunk only: the family-01 rule replacement above.
- Other family-01 paraphrase entries were unchanged.
- `spouse-01` and `friend-01` blocks were unchanged.
- Gating logic (`getDisclosureGuardMode`, `shouldScanContext`, mode behavior, feature flag default `off`) was unchanged.
- No ScriptedText, caseData, UI, policy JSON, wrapper, TC document, baseline tag, or large engine path was modified.

## Post-Commit Working Tree

- `git log --oneline -1`: `bd46418 fix(disclosureGuard): catch 보내신 honorific inflection in family-01 paraphrase`
- `git diff --cached --name-only`: empty
- `git diff --name-only`: `src/app/pc.css`
- `git status --short`: `M src/app/pc.css` plus untracked `tmp/*`
- `src/app/pc.css` remains dirty by design, untouched by Dev-B, unstaged, and preserved for the UI sub-thread.
