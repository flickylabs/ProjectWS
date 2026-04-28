# ScriptedText 재생성 정책

> 기준: Caveat 2 Phase 2 Option C, documentation-only. 이 문서는 재생성 실행을 승인하지 않으며, 현재 runtime source와 수동 수정 보존 절차를 기록한다.

## §1 Purpose

이 문서는 활성 ScriptedText runtime bundle의 재생성 정책을 정의한다. 범위는 현재 활성 사건인 `spouse-01`, `family-01`, `friend-01`에 한정한다.

- 어떤 파일이 generated artifact이면서 active runtime source인지 명시한다.
- 현재 확인된 generator의 상태가 canonical인지, stale인지 기록한다.
- historical input directory의 현재 부재 상태와 복원 조건을 기록한다.
- 수동 수정이 향후 재생성에서 유실되지 않도록 registry를 유지한다.
- 재생성 전후에 필요한 제안, 실행, 검증, 승인 절차를 고정한다.

## §2 Generated Artifacts

### §2.1 활성 ScriptedText runtime bundle

다음 파일은 현재 runtime과 simulator가 읽는 활성 ScriptedText source다. 현재 파일들은 18-channel runtime bundle로 취급해야 하며, 재생성 또는 수동 수정 시 기존 channel set을 보존해야 한다.

| File | Status | Format | Modification rule |
|---|---|---|---|
| `src/data/scriptedText/spouse-01.json` | active runtime source | 18-channel runtime bundle | 별도 canonical pathway 확인 후 §6 절차 필요 |
| `src/data/scriptedText/family-01.json` | active runtime source | 18-channel runtime bundle | §5 registry 확인 후 §6 절차 필요 |
| `src/data/scriptedText/friend-01.json` | active runtime source | 18-channel runtime bundle | §5.1 수동 수정 보존 후 §6 절차 필요 |

### §2.2 수동 편집 표면

위 파일들은 단순한 자유 편집 파일이 아니다. 필요한 수동 수정은 허용될 수 있지만, 수정 사유, source, before/after, commit, 검증 결과를 §5에 등록해야 한다. `src/data/cases/generated/*.json` 등 다른 generated case data는 이 문서의 수정 대상이 아니다.

> 참고: `docs/case-generation/scripted-text-channels.md`는 현재 15개 채널과 `system_message_v2`를 reference로 기술하지만, 활성 runtime file은 18개 채널을 가지며 `system_message_v2`를 포함하지 않는다 (대신 `judge_evidence_combo`, `judge_witness_summon`, `rapport_milestone`, `contradict_milestone` 4개가 추가되어 있다). 이는 known documentation discrepancy이며, 향후 reconciliation이 필요하다 (§8 참조).

## §3 Generators

### §3.1 `scripts/assemble-family-friend-bundles.cjs` - STALE / NOT CURRENT CANONICAL

`scripts/assemble-family-friend-bundles.cjs`는 현재 complete canonical regeneration pathway로 취급하면 안 된다.

- Scope: `family-01`, `friend-01`만 포함한다. `spouse-01` config는 없다.
- Expected inputs: 각 사건별 9개 session JSON.
  - `docs/ref/리뉴얼참고/gpt-pro-prompts-family/output/`
  - `docs/ref/리뉴얼참고/gpt-pro-prompts-friend/output/`
  - `session-1-d1-interrogation.json`
  - `session-2-d2-interrogation.json`
  - `session-3-d3-interrogation.json`
  - `session-4-d4d5-interrogation.json`
  - `session-5a-evidence.json`
  - `session-5b-witness.json`
  - `session-5c-dossier.json`
  - `session-5d-aftermath.json`
  - `session-5e-system.json`
- Current inputs: 위 `docs/ref/리뉴얼참고/gpt-pro-prompts-{family,friend}/output/` directories는 현재 working tree에 없다.
- Output format: 6-channel bundle만 생성한다.
  - `interrogation`
  - `evidence_present`
  - `dossier`
  - `witness`
  - `aftermath`
  - `system_message`
- Runtime expectation: 현재 active runtime files는 18-channel runtime bundle이다.
- Write behavior: 기존 output file을 읽어 merge하지 않고 full overwrite한다. overlay, manual-fix marker, fix-applied detection은 없다.

WARNING: Do not run `scripts/assemble-family-friend-bundles.cjs` as-is. If the historical input directories are restored and this script is run, it can overwrite the current 18-channel runtime bundles with 6-channel bundles and drop registered manual fixes.

이 script를 다시 operational surface로 올리려면 먼저 canonical pathway 결정, 18-channel compatibility 보장, §5 registry 보존 방식, §6 검증 계획에 대한 explicit user approval이 필요하다.

### §3.2 `spouse-01` 별도 pathway

`spouse-01`은 `scripts/assemble-family-friend-bundles.cjs`의 CASE_CONFIGS에 포함되어 있지 않다. Phase 1 조사 기준으로 `spouse-01`의 canonical regeneration pathway는 이 문서에서 확정하지 않는다.

`src/data/scriptedText/spouse-01.json`은 현재 effective runtime source로 취급한다. 향후 spouse regeneration은 별도 pathway 확인 후 §6 절차를 따른다. 현재 이 registry에 등록된 `spouse-01` 수동 수정은 없다.

## §4 Historical Input Directories

### §4.1 `docs/ref/리뉴얼참고/gpt-pro-prompts-{family,friend}/output/`

다음 directories는 historical input surface다. 현재 working tree에는 존재하지 않는다.

| Path | Current status | Git history summary |
|---|---|---|
| `docs/ref/리뉴얼참고/gpt-pro-prompts-family/output/` | absent | `8625986`에서 prompt/output files 추가, `574d563`에서 삭제 |
| `docs/ref/리뉴얼참고/gpt-pro-prompts-friend/output/` | absent | `8625986`에서 prompt/output files 추가, `574d563`에서 삭제 |

Phase 1 조사 기준으로 두 directory와 9개 expected session JSON은 git history에서 복원 가능하지만, 현재 worktree에 tracked 또는 untracked copy는 없다. `574d563` 삭제는 rename으로 감지되지 않았다.

Restoration policy: 위 historical input directories를 복원하려면 explicit user approval과 coordinated regeneration plan이 먼저 필요하다. 복원만으로 현재 18-channel runtime bundle을 재현한다고 가정하면 안 된다.

## §5 Manual Fix Registry

### §5.1 `friend-01` - `b-e-1-early-self-v1`

| Field | Value |
|---|---|
| Case | `friend-01` |
| Commit | `8e07b0a02e3d19d6d8211dfc5596afbd5fa74cd2` (`8e07b0a`) |
| Date | 2026-04-28 |
| File | `src/data/scriptedText/friend-01.json` |
| Channel/key/variant | `channels.evidence_present.entries[key=b\|e-1\|early\|self].variants[id=b-e-1-early-self-v1]` |
| Before | `연락한 건 맞습니다.` |
| After | `최근 9일 동안 전화도 했고 문자도 보냈습니다. 기록 그대로입니다.` |
| Reason | Track A round-20260428 `qa_focus_review` d-1 focus mismatch fix |
| Source | GPT Pro-authored adjacent variant text reused from `gpt-pro-runs/judge-messages-v3/_master/assets-friend-01/gpt-pro-package/` project artifacts |
| Baseline tag | `baseline-pre-policy-v3-track-a-friend-01` -> `8e07b0a` |
| Result docs | `tmp/qa-thread-guides/24-CODEX-DEV-TRACK-A-FRIEND-01-RESULT.md`, `tmp/qa-thread-guides/26-POST-PUSH-CONFIRMATION-TRACK-A-FRIEND-01-RESULT.md` |
| Preservation rule | Any future regeneration must keep the `After` text or explicitly reapply it before validation and approval |

### §5.2 `family-01` manual fixes

Current registry status: NONE.

`family-01` shares the same stale assembler scope and historical input-dir absence risk as `friend-01`. Any future `family-01` manual fix must be registered here with the same metadata shape: file, channel/key/variant, before, after, source, reason, commit/date, validation result, baseline tag if applicable, and result docs.

### §5.3 `spouse-01` manual fixes

Current registry status: NONE.

`spouse-01` is not generated by `scripts/assemble-family-friend-bundles.cjs`. Any future `spouse-01` manual fix must still be registered here, but its generator/pathway note must identify the separate canonical pathway used for that case.

## §6 Regeneration Policy

Any future regeneration of `src/data/scriptedText/*.json` must follow this 5-step process.

1. Identify current canonical pathway. Do not use `scripts/assemble-family-friend-bundles.cjs` as-is. If the pathway is unknown, stop and document the gap before changing runtime data.
2. Verify output format compatibility. The proposed pathway must preserve the current 18-channel runtime bundle format and must not collapse the output to the 6-channel assembler format.
3. Cross-check §5 manual fix registry. Confirm every registered manual fix is present in the regenerated output. If a fix is missing, reapply it from §5 before validation.
4. Run targeted simulator validation after regeneration. Use the 24/26 pattern with dedicated result directories, not the default `tmp/qa-route-simulator-results/`. For code-affecting regeneration packets, include the established static checks from those result docs before commit approval.
5. Get explicit user approval before commit or push. Regeneration output, validation result paths, and any tag changes must be listed for approval. No commit, push, or tag movement is implied by this document.

Registry updates are mandatory. If regeneration creates, preserves, or changes a manual fix, update §5 in the same packet before requesting commit approval.

## §7 Family-01 Parity Note

`family-01` and `friend-01` share the same stale assembler scope in `scripts/assemble-family-friend-bundles.cjs` and the same missing historical input-dir pattern under `docs/ref/리뉴얼참고/gpt-pro-prompts-{family,friend}/output/`.

Current `family-01` registry status is NONE, but its risk profile matches `friend-01`: immediate accidental regeneration through this assembler is blocked by absent inputs, while latent overwrite risk appears if the historical input directory is restored and the stale assembler is run.

Any future `family-01` fix must be registered in §5.2 and must follow the §6 5-step regeneration policy.

## §8 Future Updates

The following decisions are deferred to separate packets:

- Decide the current canonical ScriptedText regeneration pathway for active cases.
- Deprecate, update, or replace `scripts/assemble-family-friend-bundles.cjs`.
- Decide whether to restore `docs/ref/리뉴얼참고/gpt-pro-prompts-{family,friend}/output/`.
- Enter Option A only with explicit source restoration scope and user approval.
- Enter Option B only with explicit overlay or stale-generator guard scope and user approval.
- Enter Option D only with explicit CI or pre-commit guard scope and user approval.
- Reconcile `docs/case-generation/scripted-text-channels.md` (15-channel reference) with the current 18-channel runtime: incorporate the 4 newer channels (`judge_evidence_combo`, `judge_witness_summon`, `rapport_milestone`, `contradict_milestone`) and clean up `system_message_v2` references.

When any deferred decision is resolved, update §3, §4, and §5 as needed before using the decision for regeneration.
