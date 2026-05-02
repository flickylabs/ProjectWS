# friend-01 Disclosure Policy Cross-Check

**Status**: Tier 1 draft cross-check for `friend-01`.
**Runtime**: policy JSON is not imported by runtime code.
**Baseline**: `baseline-pre-policy-v1` (`a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3`)
**Reference stable commits**: `6ee9690` for spouse-01 policy, `2dd17e2` for family-01 policy.

## Case Data Shape

The request described `p.disputes[]` and `p.evidence[]`, but the actual generated file uses top-level arrays:

- `src/data/cases/generated/friend-01.json:disputes[]`
- `src/data/cases/generated/friend-01.json:evidence[]`
- `src/data/cases/generated/friend-01.json:duo.socialGraph[]`

The policy JSON follows the actual generated shape. `_schema.md`, spouse-01 policy files, and family-01 policy files were left unchanged.

## Evidence Surface Map

| Evidence | Truth-bearing source name | Surface policy | Notes |
|---|---|---|---|
| `e-1` | `최수민→예비신랑 연락 기록` | `예비신랑 연락 기록` | Contact count is visible; warning intent is gated. |
| `e-2` | `공통 친구 단톡방 캡처` | same | Safe as public-post evidence; legal/ethical conclusion is gated. |
| `e-3` | `과거 손절 직전 카톡` | same | `돈 문제` is visible, but father/fraud detail is gated. |
| `e-4` | `예비신랑의 선넘는 메시지와 B의 거절 답장` | `예비신랑 메시지와 답장` | Sender direction is high-risk before Original/Context. |
| `e-5` | `송다은 아버지와 예비신랑의 문자` | `아버지와 예비신랑의 문자` | Current money request is visible by depth; pattern conclusion is gated. |
| `e-6` | `과거 송금 영수증 + 문자` | `과거 송금 기록과 문자` | Fraud wording is gated to player-discovered deep route. |
| `e-7` | `과거·현재 대조표` | same | Pattern repetition is a late-route discovery, not protected-channel prompt text. |

## Dispute Map

| Dispute | Initial source state | Policy stage axis | Hidden truth boundary |
|---|---|---|---|
| `d-1` | visible | contact-count surface -> warning intent | Does not auto-solve fiance/father/fraud axes. |
| `d-2` | unlock after d-1 | fiance contact sequence -> B rejection -> later warning context | Father pattern remains gated to d-3/d-4. |
| `d-3` | hidden | current money request -> repeat pattern | Past fraud final truth is gated to d-4. |
| `d-4` | hidden | old money-problem blank -> father fraud -> silence motive | Does not excuse B's silence or A's broadcast. |
| `d-5` | hidden final | public accusation -> repeated villain structure -> responsibility split | B protection motive and A broadcast responsibility must both be established. |

## Witness Surface Map

| Witness | Surface knowledge | Truth-gated knowledge |
|---|---|---|
| `w-1` 김세라 | 단톡방 분위기와 최초 발언 경위 | 확인 없는 동조와 낙인 확산 |
| `w-2` 박준혁 | 예비신랑의 행동 패턴 | 예비신랑이 먼저 접근했다는 선후관계 |
| `w-3` 오미경 | 과거 돈 거래 목격 | A 아버지의 과거 돈 문제와 최수민 피해 |

## UI Surface Candidates

| Source field | Current text | Exposure risk | Draft handling |
|---|---|---|---|
| `combinationLab.outputs.dc-1.summary` | `예비신랑이 먼저 선을 넘었다면...` | High before d-2 | Surface fallback: `선후관계가 다르다면...`. |
| `combinationLab.outputs.dc-2.summary` | `송다은 아버지가 또 같은 방식으로 돈 얘기...` | High before d-3 | Surface fallback: `과거와 닮은 부탁...`. |
| `combinationLab.outputs.dc-4.summary` | `사기 피해와 침묵의 결과` | High before d-4 | Surface fallback: `금전 문제 맥락`. |
| `combinationLab.outputs.dc-5.summary` | `두 번 다 말하지 못해 악역` | Medium if rendered early | Gate to d-5 or use `반복된 오해와 낙인`. |
| `v3Design.authorityPlacements[3].purpose` | `A 아버지의 문자 원본 확보` | Unknown UI exposure | Use `가족 쪽 문자 원본 확보` if rendered early. |
| `v3Design.authorityPlacements[8].purpose` | `돈 접근 패턴이 반복됨` | Unknown UI exposure | Use `자금 부탁의 유사성` if rendered early. |
| `friend-01-dossier-cards.dc-2.description` | `예비신랑이 먼저 경계를 넘었다는 반전` | Dossier risk before solve | Dossier-gated; protected prompt should say `선후관계`. |
| `friend-01-dossier-cards.dc-4.successEffects` | `사기 피해 맥락` | Dossier risk before d-4 | Use `금전 문제 맥락` before gate. |
| `evidence.e-6.v3DepthPlan.Established.summary` | `A 아버지의 사기 패턴 확정` | Allowed only in player-discovered evidence detail | Protected channels remain surface-only. |
| `evidence.e-7.v3DepthPlan.Established.summary` | `A 아버지의 반복 패턴과 B의 반복 침묵 확정` | Allowed only in player-discovered evidence detail | Protected channels remain surface-only. |

## discoveryText Gate Candidates

| Recipe | Inputs | Truth terms | Draft gate |
|---|---|---|---|
| `combine-1` | `e-1`, `e-2` | 확인 없이 프레이밍 | d-1/d-5 early gate + e-1 Original/e-2 Excerpt. |
| `combine-2` | `e-1`, `e-4` | 예비신랑이 먼저, 선넘는 메시지 | d-2 stage 2 + e-4 Original. |
| `combine-3` | `e-5`, `e-6` | 같은 패턴, 아버지 돈 접근 | d-3 stage 3 + e-5/e-6 Original. |
| `combine-4` | `e-4`, `e-7` | 경고였다는 결론 | d-1/d-2 stage 3 + e-7 Original. |
| `combine-5` | `stmt-a-accusation`, `e-2` | 단톡방 확산 | d-5 stage 2 + e-2 Original. |
| `combine-6` | `e-3`, `e-7` | 두 번 다 악역, 반복 침묵 | d-4 stage 3 + d-5 stage 2. |
| `combine-7` | `e-3`, `e-6` | 사기 피해, 손절 원인 | d-4 stage 2 + e-6 Original. |
| `combine-8` | `stmt-b-silence`, `e-4` | 먼저 선을 넘은 쪽 | d-2 stage 2 + e-4 Original. |
| `combine-9` | `stmt-b-silence`, `e-5` | 아버지의 돈 접근 패턴 | d-3 stage 2 + e-5 Original. |
| `combine-10` | `stmt-a-accusation`, `stmt-b-silence` | 서로 다르게 겪은 사건 | d-1 stage 2 + A/B lieState S2. |

## v2 Policy Sample Checks

`friend-01-structure-v2.json` agrees with the policy progression:

- `d-1`: the visible contact count is not the same as intent.
- `d-2`: the fiance crossed the line first, but B's later contact method remains a separate issue.
- `d-3`: current father-to-fiance money request matters because it resembles the old pattern.
- `d-4`: the old cutoff came from A's father fraud and B's silence, not simple betrayal.
- `d-5`: B's protection motive and A's broadcast responsibility must both remain in view.

`friend-01-game-events-v2.json` contains old `h-d3` / `h-d4` dispute IDs in some entries. The current generated caseData uses `d-3` and `d-4`; this draft follows generated caseData.

There is no `friend-01-v3-game-loop-data.json`; the spouse-01 stale v3 loop-data conflict pattern has no direct friend-01 counterpart.

## ScriptedText Sample Checks

Sampled `src/data/scriptedText/friend-01.json`:

- Total scripted variants: 5,082.
- Early interrogation sample stays on repeated contact and visible relationship facts with tags `reveal:none`, `revealGuard:strict`, `disclosure:sealed`.
- `judge_question` sample asks what the contact was meant to convey without exposing father/fraud truths.
- `system_message` sample warns about repeated questioning without exposing truth.

This supports the policy design: the player should progress through message-original depth, witness routes, and pattern comparison rather than repeated generic questioning.

## Open Questions for CT/User

1. Whether `combinationLab.outputs.*.summary` and `judgeHint` are rendered before discovery gates.
2. Whether dossier `successEffects` are visible before a dossier card is solved.
3. Whether `v3Design.authorityPlacements.*.purpose` is rendered or design-only metadata.
4. Whether stale `h-d3` / `h-d4` entries in `friend-01-game-events-v2.json` are dead data or still consumed by any channel.

## Source Conflict Found

No direct truth-axis contradiction was found in generated caseData. One stale identifier issue was found:

- `friend-01-game-events-v2.json` uses `h-d3` and `h-d4` in some contradiction entries.
- Current generated caseData uses `d-3` and `d-4`.
- Policy follows generated caseData. If those old entries are rendered, they should be handled as a separate P4/P7-safe cleanup after UI/channel usage is confirmed.

No source data was changed in this Tier 1 draft.

## Result

Cross-check is sufficient for a Tier 1 `friend-01` schema draft and full 5-dispute `issueProgression` draft. It is not sufficient for runtime guard or UI fix work. Next step after CT/user approval should be either:

- start Tier 2 policy-vs-data cross-check scripts, or
- use user spot-check samples to test the completed three-case policy set.

## Validation Run

Executed after drafting:

| Check | Result | Note |
|---|---|---|
| JSON parse | PASS | `friend-01.json` is valid JSON. |
| 7-section policy shape | PASS | `surfaceMap`, `forbiddenLexemes`, `channelAuthority`, `lieStateGate`, `uiSurfaceMap`, `discoveryText`, `issueProgression` present. |
| 5-dispute progression | PASS | `d-1` through `d-5` are all `sample-complete` with stages 0-4 and required stage fields. |
| Korean field presence | PASS | Every dispute `title`, every stage `name`, and every stage `surfaceClaim` contains Korean text. |
| literal question mark check | PASS | Quoted `"?"` count 0, quoted `"??"` count 0, total `?` count 0. |
| UTF-8 hex sample | PASS | `d-1` stage 0 `surfaceClaim` includes Korean UTF-8 bytes (`EC B5 9C EC 88 98...`) and no `0x3F` replacement byte. |
| spouse-01 / family-01 / `_schema.md` preservation | PASS | `git diff 2dd17e2 -- src/data/disclosurePolicy/_schema.md src/data/disclosurePolicy/spouse-01.json src/data/disclosurePolicy/spouse-01-cross-check.md src/data/disclosurePolicy/family-01.json src/data/disclosurePolicy/family-01-cross-check.md` is empty. |
| Runtime import search | PASS | No `disclosurePolicy` imports found in `src/engine`, `src/components`, `src/hooks`, `src/app`, or `src/store`. |
| ScriptedText checksum sample | PASS | `src/data/scriptedText/friend-01.json` remains `4135dfb8d90c9c9b40fcbeb3815e668029ab35723af725d699f22a2f4831db97`. |
| caseData checksum sample | PASS | `src/data/cases/generated/friend-01.json` remains `4b742b920ee1572bd577ddefc496e4b7be5e2f764cd3f642253b3af29a0be911`. |
| spouse/family baseline checksum sample | PASS | spouse and family ScriptedText/caseData checksums remain unchanged. |
| `tmp/detect-truth-leak.cjs` | PASS | 0 leak candidates across spouse/family/friend. |
| v6 lieState/evidence/archetype/meter specialists | PASS | Hard issue count 0. `v6-liestate-flow` still reports 772 candidate issues, matching the known semantic-review backlog. |
| v3/v4/v5 specialist checks | PASS | No residual issues reported. |
| `tmp/precheck-matrix.cjs` | Existing warning/fail output | Reports 10 existing HIGH `missing_disputeId_in_channel` entries for family/friend `d-5`. This predates this policy draft and was not introduced by these files. |
| `git diff --check` | PASS | No whitespace errors in the new policy files. |

The precheck scripts rewrote their tracked JSON result files during execution. Those generated side effects were restored to `HEAD`; only the new friend disclosure policy draft files and request file remain untracked.
