# Codex-Dev B Phase 2 MVP Summary

작성일: 2026-04-27  
세션: Codex-Dev B  
Phase: 2 log mode MVP  
결정된 적용 범위: 옵션 (가) LLM/Fallback only  
상태: 구현 및 검증 완료, commit 미수행

## 1. HEAD

- 시작 HEAD: `acf5d27 fix(scripted): correct p1 stabilization text variants`
- 현재 HEAD: `acf5d27 fix(scripted): correct p1 stabilization text variants`
- Branch status: `## main...origin/main [ahead 4]`
- Tags 확인:
  - `baseline-pre-policy-v1`
  - `baseline-pre-policy-v2`
- Baseline anchors:
  - v1: `a10b801`
  - v2: `acf5d27`

## 2. Scope

- 구현 범위: Tier 3 Guard MVP, log mode 중심.
- 적용 범위: `tryScriptedDialoguePath` miss 이후의 LLM/Fallback 경로.
- ScriptedText 성공 반환은 guard 진입 없음.
- `mode='off'`는 정책 JSON import, lexeme union build, text scan 없이 원문 그대로 반환.
- `mode='log'`는 `console.warn('[disclosure-guard]', ...)`만 수행하고 최종 text 변경 없음.
- `mode='sanitize'` / `mode='block'`은 stub 결과만 반환하며 helper는 text를 변경하지 않음.

## 3. Commands Run

```text
git status --short --branch
git log --oneline -1
git tag -l "baseline-pre-policy-*"
git diff --quiet && git diff --cached --quiet && echo "tracked clean" || echo "tracked dirty"
npm run check:all
npx tsc -b --force
npm run build
npx tsc -b --force
npm run check:all
npx vite build --ssr tmp/qa-codex-dev-b-results/disclosure-guard-smoke.ts --outDir tmp/qa-codex-dev-b-results/guard-smoke-dist --emptyOutDir
node tmp/qa-codex-dev-b-results/guard-smoke-dist/disclosure-guard-smoke.js
git diff --check
```

## 4. Changed Files

Source changes:

- `src/types/disclosure.ts` 신규
  - `DisclosureCaseId`
  - `DisclosureGuardMode`
  - `DisclosureChannelType`
  - `DisclosureEvidenceState`
  - `GuardContext`
  - `GuardResult`
- `src/engine/disclosurePolicyLoader.ts` 신규
  - `import.meta.glob('../data/disclosurePolicy/*.json')`
  - case별 lazy import + memo
- `src/engine/disclosureGuard.ts` 신규
  - feature flag resolution
  - policy JSON forbiddenLexemes + inline paraphrase union
  - gating
  - `blockHiddenTruthLexemes`
- `src/engine/llmDialogueResolver.ts` 수정
  - post-scripted guard helper 추가
  - blueprint result hook
  - existing LLM NPC response hook
  - generated judge question hook in non-scripted paths
  - `fallbackResolve(...)` catch path hook

Verification artifacts:

- `tmp/qa-codex-dev-b-results/disclosure-guard-smoke.ts`
- `tmp/qa-codex-dev-b-results/guard-smoke-dist/**` was generated transiently for the smoke run and removed after verification to avoid copying public assets into results.
- `tmp/qa-codex-dev-b-results/20260427-mvp-summary.md`

## 5. API Spec

Actual API:

```ts
type GuardContext = {
  channel: DisclosureChannelType
  caseId: 'spouse-01' | 'family-01' | 'friend-01'
  lieState?: LieState
  evidenceState?: {
    evidenceId?: string
    unlocked?: boolean
    presented?: boolean
    investigationStage?: number
  }
  party?: 'a' | 'b'
  disputeId?: string
  variant?: string
  dossierStage?: 'early' | 'mid' | 'late'
}

type GuardResult =
  | { action: 'pass' }
  | { action: 'log'; reason: string; matched: string[] }
  | { action: 'sanitize'; reason: string; replacement: string }
  | { action: 'block'; reason: string; matched: string[] }

function blockHiddenTruthLexemes(text: string, context: GuardContext): GuardResult
```

Phase 1 spec 대비 추가:

- `variant?: string`: log payload 식별용.
- `dossierStage?: 'early' | 'mid' | 'late'`: dossier early/mid/late gate 표현용.
- `DisclosureEvidenceState.investigationStage`: `evidence_present` stage 0/1 vs late gate 표현용.

## 6. Feature Flag Spec

Env key:

- `VITE_DISCLOSURE_GUARD_MODE`

Allowed values:

- `off`
- `log`
- `sanitize`
- `block`

Default:

- `off`

Priority implemented in `getDisclosureGuardMode()`:

1. URL query param: `?guard=log`
2. localStorage: `solomon-disclosure-guard-mode`
3. env: `VITE_DISCLOSURE_GUARD_MODE`
4. default: `off`

Mode behavior:

- `off`: returns pass before policy load / scan.
- `log`: scans and warns; text unchanged.
- `sanitize`: stub result; text unchanged by resolver helper.
- `block`: stub result; text unchanged by resolver helper.

## 7. Gating Alignment

Policy source: `docs/disclosure-policy.md` §4.1 gating box.

Implemented block/scan targets:

- `judge_question`
- `judge_contradiction`
- `judge_evidence_combo`
- `judge_witness_summon`
- `system_message`
- `dossier` when `dossierStage` is omitted or `early`
- `evidence_discovery`
- NPC `interrogation` / `contradiction_pursuit` when `lieState ∈ {S0,S1,S2}`
- `evidence_present` when `investigationStage <= 1`

Implemented pass targets:

- `aftermath`
- `emotional_overload`
- `mediation`
- `witness_full`
- NPC S3+
- `evidence_present` late stage (`investigationStage >= 2`)
- `dossier` mid/late when context supplies `dossierStage`

Ambiguous lexeme handling:

- `혈연` 단독 not registered; narrowed `혈연이 다른` only.
- `가로` not registered.
- `같은 패턴` 단독 not registered; narrowed `같은 패턴 반복` / `같은 방식으로 돈 얘기`.
- `뜯` uses a context matcher requiring nearby father/money/fraud-related terms.

D1 lieState tonal mismatch:

- Not implemented by design. This remains Tier 4+/LLM review scope.

## 8. Lexeme Sources

Runtime union:

- `src/data/disclosurePolicy/{caseId}.json` `forbiddenLexemes`
- Inline paraphrase set from `docs/disclosure-policy.md` §4.1, §4.2, §4.3

No changes made to:

- `docs/disclosure-policy.md`
- `src/data/disclosurePolicy/*.json`

## 9. Hook Locations

`src/engine/llmDialogueResolver.ts`:

- `tryScriptedDialoguePath` success remains immediate return:
  - `scriptedResult !== null` returns before guard.
- `blueprintResult` hook:
  - variant `blueprint-result`
- existing LLM judge question hook:
  - variant `llm-judge-question`
  - channel `judge_question`
- existing LLM NPC response hook:
  - variant `llm-npc-response`
- fallback catch hooks:
  - variant `legacy-fallback-inner`
  - variant `legacy-fallback-outer`
- blueprint judge question hooks:
  - variant `blueprint-judge-question`
  - variant `blueprint-fallback-judge-question`

The returned `ResolvedDialogue.node.text` is not mutated in any mode by the resolver helper.

## 10. Verification Results

`npm run build`:

- PASS
- includes `tsc -b --force && vite build`
- Vite emitted existing large chunk warning only.

`npx tsc -b --force`:

- PASS

`npm run check:all`:

- PASS
- `run-all-checks.cjs`: PASS, 9/9 hard pass, 1 warn
- `policy-vs-data-cross-check.cjs`: PASS, 0 hard issues, 157 warnings
- `policy-md-json-sync-check.cjs`: PASS, 0 sync issues

`git diff --check`:

- PASS
- PowerShell/git printed existing CRLF warnings for generated tmp JSON files, but no whitespace errors.

## 11. mode='off' Verification

Smoke input:

```text
channel=judge_question
caseId=family-01
lieState=S0
text=유서를 손댄 정황을 바로 단정할 수 있습니까?
guard=?guard=off
```

Actual result:

```json
{ "action": "pass" }
```

Code path:

- `applyDisclosureGuardToText` returns before `ensureDisclosurePolicyLoaded(...)` when mode is `off`.
- `blockHiddenTruthLexemes` also returns pass before scan when mode is `off`.

Conclusion:

- `mode='off'` has game-flow impact 0 and text mutation 0.

## 12. mode='log' Verification

Smoke command:

```text
npx vite build --ssr tmp/qa-codex-dev-b-results/disclosure-guard-smoke.ts --outDir tmp/qa-codex-dev-b-results/guard-smoke-dist --emptyOutDir
node tmp/qa-codex-dev-b-results/guard-smoke-dist/disclosure-guard-smoke.js
```

Actual family CT-Cross P1 style sample:

```text
[disclosure-guard] {
  variant: 'smoke-family-judge-p1',
  channel: 'judge_question',
  lieState: 'S0',
  matched: [ '유서를 손댄', '자기 몫을 줄' ],
  text: '유서를 손댄 정황과 자기 몫을 줄인 이유를 설명해 보십시오.'
}
```

Actual friend evidence_discovery sample:

```text
[disclosure-guard] {
  variant: 'smoke-friend-evidence-discovery',
  channel: 'evidence_discovery',
  lieState: undefined,
  matched: [ '선을 넘는 메시지' ],
  text: '선을 넘는 메시지를 보고도 왜 바로 말하지 않았습니까?'
}
```

Returned results:

```json
{
  "familyLogResult": {
    "action": "log",
    "reason": "hidden-truth-lexeme-match",
    "matched": ["유서를 손댄", "자기 몫을 줄"]
  },
  "friendLogResult": {
    "action": "log",
    "reason": "hidden-truth-lexeme-match",
    "matched": ["선을 넘는 메시지"]
  }
}
```

Conclusion:

- `mode='log'` emits the required `console.warn('[disclosure-guard]', { variant, channel, lieState, matched, text })`.
- Final text remains unchanged.

## 13. ScriptedText Flow Check

`tryScriptedDialoguePath(...)` call remains before all guard hooks.

Current flow:

```ts
const scriptedResult = tryScriptedDialoguePath(...)
if (scriptedResult !== null) return scriptedResult
```

No edits to:

- `src/data/scriptedText/{caseId}.json`
- `src/data/cases/generated/{caseId}.json`
- `src/components/**/*.tsx`
- `src/utils/archetypeLabel.ts`

S-1 6 P0 영역:

- Dev-A stabilization completed before this Phase 2 baseline.
- Runtime guard does not double-scan successful ScriptedText by design.
- Therefore corrected ScriptedText variants do not trigger new runtime guard logs in this implementation.

## 14. Known vs New Findings

Known baseline warnings preserved:

- `policy-vs-data-cross-check.cjs`: 157 warnings
- `legacy-precheck-matrix`: 10 known family/friend d-5 HIGH issues

New findings:

- None requiring code changes within Dev-B scope.

Out-of-scope notes:

- Option (나), resolver final text 전체 guard including ScriptedText, remains Tier 3.5+ follow-up.
- D1 tonal mismatch remains Tier 4+/LLM review scope.
- Dynamic LLM sampling harness remains P-5 separate request.

## 15. Final Working Tree State

Expected tracked source changes:

- `src/engine/llmDialogueResolver.ts`

Expected untracked source additions:

- `src/engine/disclosureGuard.ts`
- `src/engine/disclosurePolicyLoader.ts`
- `src/types/disclosure.ts`

Expected result additions:

- `tmp/qa-codex-dev-b-results/20260427-spike-guard-scope.md`
- `tmp/qa-codex-dev-b-results/20260427-mvp-summary.md`
- `tmp/qa-codex-dev-b-results/disclosure-guard-smoke.ts`

Commit:

- Not created by Codex-Dev B in this turn.
