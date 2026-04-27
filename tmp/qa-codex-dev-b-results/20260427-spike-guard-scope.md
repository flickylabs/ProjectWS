# Codex-Dev B Phase 1 Spike: Tier 3 Guard Scope

작성일: 2026-04-27  
세션: Codex-Dev B  
Phase: 1 spike only  
상태: Phase 2 미진입, CT-Main / 사용자 결정 대기

## 1. HEAD / Baseline

- HEAD: `4e0a1b6 docs(policy): tier-3 guard hardening — paraphrase set + uiSurfaceMap surface`
- Baseline anchor: `a10b801` (`baseline-pre-policy-v1`)
- Branch status: `## main...origin/main [ahead 2]`
- Tracked state: `tracked clean`
- 허용 untracked:
  - `tmp/REQUEST-Codex-DevA-P1-Stabilization.md`
  - `tmp/REQUEST-Codex-DevB-Tier3-Guard-MVP.md`
  - `tmp/qa-*`

## 2. Scope

- 수행 범위: Phase 1 MVP 적용 범위 spike
- 작성 파일: `tmp/qa-codex-dev-b-results/20260427-spike-guard-scope.md`
- 코드 변경: 없음
- 금지선 준수:
  - `src/data/scriptedText/**` 수정 없음
  - `src/data/cases/generated/**` 수정 없음
  - `src/components/**` 수정 없음
  - `docs/disclosure-policy.md` 수정 없음
  - `src/data/disclosurePolicy/*.json` 수정 없음
  - wrapper 스크립트 수정 없음

## 3. Commands Run

```text
git status --short --branch
=> ## main...origin/main [ahead 2]
=> ?? tmp/REQUEST-Codex-DevA-P1-Stabilization.md
=> ?? tmp/REQUEST-Codex-DevB-Tier3-Guard-MVP.md
=> ?? tmp/qa-*

git log --oneline -1
=> 4e0a1b6 docs(policy): tier-3 guard hardening — paraphrase set + uiSurfaceMap surface

git diff --quiet && git diff --cached --quiet && echo "tracked clean" || echo "tracked dirty"
=> tracked clean

npm run check:all
=> PASS
=> run-all-checks.cjs: PASS (9/9 hard pass, 1 warn)
=> policy-vs-data-cross-check.cjs: PASS (0 hard issues, 157 warnings)
=> policy-md-json-sync-check.cjs: PASS (0 sync issues)
```

## 4. Resolver Flow Observed

Relevant current flow in `src/engine/llmDialogueResolver.ts`:

- `resolveLLMDialogue` first tries `tryScriptedDialoguePath(...)`; non-null result returns immediately.
- If scripted misses, it tries `tryBlueprintPath(...)`; non-null result returns immediately.
- If blueprint misses, it enters the existing LLM path and returns `parsed.npcNode`.
- Existing LLM errors return `fallbackResolve(...)`.
- `tryBlueprintPath` itself may return LLM-generated `finalText` or a deterministic `fallbackBeat.line`.
- `tryScriptedDialoguePath` post-processes scripted text and returns `processedText`.

This means a true "resolver final text 전체 guard" requires wrapping every return path or introducing a common post-return helper. A narrower "LLM/Fallback only" guard can be inserted after the scripted early return and applied only to blueprint, existing LLM, and fallback results.

## 5. Option (가): LLM/Fallback 응답만 Guard

Definition:

- `tryScriptedDialoguePath(...)` result is not guarded at runtime.
- Guard starts only after scripted path misses.
- Guard covers:
  - blueprint LLM result returned through `tryBlueprintPath`
  - blueprint fallback beat returned through `tryBlueprintPath`
  - existing `chatCompletion` LLM result
  - `fallbackResolve(...)` results from existing LLM error paths

Expected implementation shape for Phase 2 if selected:

- Keep `tryScriptedDialoguePath` flow unchanged.
- Add one small resolver helper such as `applyDisclosureGuardToResolvedDialogue(result, context)`.
- Apply helper at post-scripted return sites:
  - before returning `blueprintResult`
  - before returning existing LLM parsed result
  - before returning `fallbackResolve(...)` in catch paths
- `mode='off'`: helper returns original object without policy import or mutation.
- `mode='log'`: helper logs matches and returns original text unchanged.

Assessment:

| Dimension | Result |
|---|---|
| 성능 | Best. Scripted hits avoid policy import, lexeme union build, and text scan. Runtime cost is concentrated on variable/generated paths. |
| FP 위험 | Lowest. ScriptedText has just been policy-hardened and is already covered by static QA; runtime warnings do not flood on curated safe surface lines. |
| 안전성 | Good for MVP target. It protects the least deterministic paths: LLM, blueprint LLM, and fallback after dynamic failure. Scripted regressions still depend on static checks and policy review. |
| 구현 리스크 | Low. Fewer hook points and no need to restructure the resolver's early scripted return. |
| 운영 로그 품질 | Higher signal. Log mode noise mostly indicates generated/fallback text problems rather than known scripted vocabulary. |
| 금지선 적합성 | Strong. No `tryScriptedDialoguePath` bypass and no ScriptedText data edits. |

Residual risk:

- If a scripted line still contains a newly discovered paraphrase leak that static checks missed, runtime will not catch it under option (가).
- This risk is bounded by the current `4e0a1b6` hardening intent and `npm run check:all` baseline: hard 0 / warnings 157.

## 6. Option (나): Resolver 최종 Text 전체 Guard

Definition:

- Every `ResolvedDialogue.node.text` emitted by `resolveLLMDialogue` is guarded.
- Scripted, blueprint, existing LLM, and fallback results all pass through the guard.

Expected implementation shape for Phase 2 if selected:

- Wrap `scriptedResult` before its early return.
- Wrap `blueprintResult` before its early return.
- Wrap existing LLM parsed result before return.
- Wrap `fallbackResolve(...)` catch returns.
- To avoid missed returns, a larger centralization pass may be needed.

Assessment:

| Dimension | Result |
|---|---|
| 성능 | Acceptable but worse than (가). Most common scripted hits now scan policy lexemes. Lazy policy memoization limits repeated import cost, but every guarded turn still scans text. |
| FP 위험 | Highest. ScriptedText intentionally includes surface names, gated admissions, S3+ responsibility distribution, evidence-present late-stage language, and safe paraphrases. These are likely to create log noise now and could become dangerous if sanitize/block is enabled later. |
| 안전성 | Highest in raw coverage. It catches missed ScriptedText leaks, post-processing leaks, and policy/data drift at runtime. |
| 구현 리스크 | Medium. More return points must be wrapped; centralizing final output would touch resolver structure more than the MVP needs. |
| 운영 로그 품질 | Lower signal. Log mode may report known scripted or late-stage allowed language unless gating context is very complete. |
| 금지선 적합성 | Possible, but less conservative. It does not edit ScriptedText, but it double-checks Dev-A's scripted hardening area at runtime. |

Residual risk:

- The guard needs full context to avoid false positives: channel, lieState, evidence stage, dossier timing, witness full/summary state, and late-stage admission context.
- Current Phase 2 allowed write set can derive some of this from `action`, `caseData`, `evidenceStates`, and `lieEntry`, but not every UI/channel nuance is naturally present in the resolver.

## 7. Comparison Summary

| Category | Option (가): LLM/Fallback only | Option (나): All final text |
|---|---|---|
| Primary protection target | Generated and fallback text | All resolver text |
| ScriptedText runtime coverage | No | Yes |
| Dependency on static ScriptedText QA | Higher | Lower |
| Runtime cost | Lower | Higher |
| False positive exposure | Lower | Higher |
| Log-mode signal quality | Higher | Lower |
| Phase 2 implementation size | Smaller | Larger |
| Future sanitize/block readiness | Safer starting point | Needs stronger context first |

## 8. Recommendation

권장 옵션: **옵션 (가) — LLM/Fallback 응답만 guard**

Reason:

1. 의뢰 본질이 "runtime LLM/Fallback guard"이고, Phase 2 MVP는 log mode 중심이다. 가장 불확실한 생성 경로부터 관측하는 편이 MVP 목적에 맞다.
2. ScriptedText는 `4e0a1b6` 정책 hardening과 `check:all` 정적 검증의 직접 대상이다. Phase 1 직후 바로 Scripted까지 runtime 이중 guard하면 log noise와 FP 분석 비용이 커진다.
3. sanitize/block은 이번 MVP에서 stub 영역이다. 나중에 mode를 강화할 때 안전하게 전환하려면, 먼저 동적 경로에서 낮은 FP 로그를 축적하는 편이 운영적으로 안전하다.
4. 구현 리스크가 낮다. `tryScriptedDialoguePath`를 우회하지 않고, scripted early return을 그대로 보존하면서 이후 경로만 감싼다.

Follow-up proposal:

- Phase 2는 옵션 (가)로 log mode MVP를 구현한다.
- 7일 이상 log 운영 후, ScriptedText runtime guard가 필요하면 option (나)를 별도 Tier 3.5로 전환 검토한다.
- option (나) 전환 전에는 context completeness를 먼저 보강해야 한다: evidence stage, dossier timing, witness full/summary, late-stage admission gate.

## 9. Planned API Spec If Phase 2 Is Confirmed

```ts
type GuardContext = {
  channel: ChannelType
  caseId: 'spouse-01' | 'family-01' | 'friend-01'
  lieState?: LieState
  evidenceState?: EvidenceState
  party?: 'a' | 'b'
  disputeId?: string
}

type GuardResult =
  | { action: 'pass' }
  | { action: 'log'; reason: string; matched: string[] }
  | { action: 'sanitize'; reason: string; replacement: string }
  | { action: 'block'; reason: string; matched: string[] }

function blockHiddenTruthLexemes(text: string, context: GuardContext): GuardResult
```

Phase 2 file plan if confirmed:

- `src/types/disclosure.ts`
- `src/engine/disclosurePolicyLoader.ts`
- `src/engine/disclosureGuard.ts`
- `src/engine/llmDialogueResolver.ts`

## 10. Feature Flag Spec If Phase 2 Is Confirmed

- Env key: `VITE_DISCLOSURE_GUARD_MODE`
- Values: `off | log | sanitize | block`
- Default: `off`
- Priority:
  1. URL query param: `?guard=log`
  2. localStorage: `solomon-disclosure-guard-mode`
  3. env: `VITE_DISCLOSURE_GUARD_MODE`
  4. default: `off`

Mode behavior:

- `off`: no policy import, no scan, no result mutation.
- `log`: scan and `console.warn('[disclosure-guard]', ...)`; final text unchanged.
- `sanitize`: stub only in MVP.
- `block`: stub only in MVP.

## 11. Gating Policy Alignment

Policy source checked: `docs/disclosure-policy.md` §4.1 lines 170-176.

Required 3-case common gating:

- Block targets:
  - `judge_question`
  - `judge_contradiction`
  - `judge_evidence_combo`
  - `judge_witness_summon`
  - `system_message`
  - `dossier` guide
  - `evidence_discovery`
  - NPC `interrogation` / `contradiction_pursuit` when `lieState ∈ {S0, S1, S2}`
- Pass targets:
  - `aftermath`
  - `emotional_overload`
  - `mediation`
  - witness `*full*`
  - NPC S3+ gated responsibility distribution context
  - NPC S4+ free
  - S5 confession
- Special:
  - `evidence_present`: stage 0/1 block, late stage gated
  - `dossier`: early block, mid/late gated
  - ambiguous lexemes require context-window check or narrowed lexeme

Option (가) alignment:

- Applies naturally to NPC interrogation / evidence-present generated paths after scripted miss.
- Does not cover static UI channels in this Phase 2 write set.
- Keeps mode `off` impact at zero and mode `log` read-only.

Option (나) alignment:

- Needs more context to avoid warning allowed scripted late-stage lines.
- Safer only after context completeness is proven.

## 12. Verification Status

- `npm run check:all`: PASS before spike; hard 0 / warnings 157 preserved at start.
- `npm run build`: not run in Phase 1 because no code implementation occurred.
- `mode='off'` impact: not implemented yet; Phase 2 requirement.
- `mode='log'` output sample: not implemented yet; Phase 2 requirement.

## 13. CT-Main / User Decision Required

Decision needed before Phase 2:

- Approve option (가): LLM/Fallback 응답만 guard
- Or require option (나): resolver final text 전체 guard

Codex-Dev B will not start Phase 2 until CT-Main / user confirms the selected option.
