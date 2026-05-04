# spouse-01 Disclosure Policy Cross-Check Draft

**Status**: Tier 1 schema draft cross-check.
**Baseline**: `baseline-pre-policy-v1` (`a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3`)
**Runtime impact**: none. No case data, ScriptedText, engine, hook, or component files were changed.

## Scope

Checked sources:

- `docs/disclosure-policy.md`
- `src/data/cases/generated/spouse-01.json`
- `src/data/claimPolicies/spouse-01-v2-atoms.json`
- `src/data/claimPolicies/spouse-01-structure-v2.json`
- `src/data/claimPolicies/spouse-01-game-events-v2.json`
- `src/data/claimPolicies/spouse-01-v3-game-loop-data.json`
- `src/data/scriptedText/spouse-01.json` sample entries

This file records draft findings for `src/data/disclosurePolicy/spouse-01.json`.

## Evidence Surface Map

| ID | caseData `name` | caseData `surfaceName` | Policy result |
|---|---|---|---|
| e-1 | 영수증 묶음 (5장) | 영수증 묶음 5장 | OK. Later summaries contain `조카` truth terms and must be stage-gated. |
| e-2 | 블랙박스 GPS / 네비 즐겨찾기 | 블랙박스 GPS 기록 | OK. Later summaries contain `형네` truth terms and must be stage-gated. |
| e-3 | 통화기록 | 통화기록 | OK. Later summaries contain `형과의 통화` truth terms and must be stage-gated. |
| e-4 | 발신자 미상 문자 | 발신자 미상 문자 | UI must display `surfaceName` consistently. |
| e-5 | 이준호의 개인 계좌 출금 내역 | 개인 계좌 출금 내역 | OK. Purpose terms involving `형` must be gated. |
| e-6 | 투자방 카톡 + 송금 기록 | 투자방 카톡 기록 | OK. `투자 사기` terms must be gated. |
| e-7 | 공동 적금 해지 서류 | 공동 적금 해지 서류 | OK. `위임장 조작` terms must be gated. |

## Dispute Map

Generated caseData has 4 disputes:

- `d-1`: visible, required evidence `e-2`, `e-3`, `e-4`.
- `d-2`: hidden until A `d-1` reaches S3 in current generated caseData.
- `h-d3`: hidden until `d-2` pressure/counter route.
- `h-d4`: hidden until `d-2` and `h-d3` both progress.

`spouse-01-structure-v2.json` has a broader `d-1.requiredEvidence` including `e-1`, `e-2`, `e-3`, `e-4`. The schema draft follows the broader gameplay model for `issueProgression.d-1`, while `surfaceMap` preserves generated caseData source references.

## UI Surface Candidates

These fields contain truth lexemes and are candidates for P7 protection. This is a policy finding only; no runtime path was changed.

| Source field | Source text | Risk | Draft policy |
|---|---|---|---|
| `combinationLab.nodes.e-4.label` | `e-4 발신자 미상 문자` | Low | Keep surface label. |
| `combinationLab.nodes.e-5.label` | `e-5 공동 적금 해지 + 형 계좌 이체` | High if rendered before gate | Replace with `e-5 개인 계좌 출금 내역`. |
| `combinationLab.outputs.dc-1.summary` | `외도 오해를 형네 돌봄으로 뒤집는 카드` | High if rendered as dossier summary | Abstract to `외도 오해를 다른 동선으로 재검토하는 카드`. |
| `combinationLab.outputs.dc-2.judgeHint` | `발신자 미상 문자(e-4)` | Low | Keep surface label. |
| `combinationLab.outputs.dc-4.judgeHint` | `이준호 씨 형의 상황` | High in judge/dossier UI | Use `이준호 씨가 숨긴 사정`. |
| `v3Design.authorityPlacements[1].purpose` | `발신자 미상 문자와 일정 알림을 원본으로 확보` | Low | Keep surface label. |
| `v3Design.authorityPlacements[3].purpose` | `형, 조카, 2,000만 원 같은 실체 명사 강제` | Unknown UI exposure | Mark as `unknown-internal-candidate`; confirm UI path before code fix. |
| `evidence.e-1.v3DepthPlan.Established.summary` | `조카 돌봄을 위한 구매로 확인됨` | Allowed only by player-discovered deep route | Stage-gated; protected channels still surface-only. |
| `evidence.e-2.v3DepthPlan.Context.summary` | `오피스텔 동선과 형네 주소 일치` | Allowed only by player-discovered deep route | Stage-gated; protected channels still surface-only. |
| `evidence.e-4.v3DepthPlan.Established.summary` | `조카 돌봄 관계 직접 증명` | Allowed only by player-discovered deep route | Stage-gated; protected channels still surface-only. |

## discoveryText Gate Candidates

| Recipe | Inputs | Truth terms | Draft gate |
|---|---|---|---|
| `combine-1` | `e-1`, `e-2` | none direct | Player evidence-combine; safe surface fallback still provided. |
| `combine-2` | `e-1`, `e-4` | `형`, `가은이`, `중학생 조카`, `조카 학교 알림` | Requires `e-1` Context + `e-4` Original + `d-1` truthStage 3. |
| `combine-3` | `e-5`, `e-3` | `형 쪽`, `비자금` | Requires `e-3` Original + `e-5` Original + `d-2` truthStage 2. |
| `combine-4` | `e-6`, `e-7` | `위임장 조작` | Requires `e-6` Original + `e-7` Original + `h-d3` truthStage 3. |
| `combine-5` | `stmt-a-protect`, `e-7` | `위조된 위임장` | Requires `e-7` Context + `h-d3` truthStage 3. |
| `combine-6` | `stmt-b-family`, `e-4` | `형`, `돌봄` | Requires B lieState S3 + `e-4` Original + `d-1` truthStage 3. |
| `combine-7` | `stmt-b-family`, `stmt-a-protect` | none direct | Requires d-1/h-d3 progression but no direct truth term. |

## v2/v3 Policy Sample Checks

`spouse-01-v2-atoms.json` sample:

- A `d-1` S0 fact atom uses 오피스텔, time, and spouse framing, not `형`/`조카`.
- This matches `issueProgression.d-1.stage0` and the S0 forbidden lexeme rule.

`spouse-01-v3-game-loop-data.json` sample:

- B `d-1` S3 atom says B could not talk about family care because in-law conflict might recur.
- This matches the draft rule that S3 can partially disclose family context in NPC speech, while judge/system/dossier remain surface-only.

`spouse-01-game-events-v2.json` sample:

- `spouse-01-d-1-a-S2-c1` stays within A's suspicion and expression conflict, not hidden truth.
- `spouse-01-d-1-a-S3-c1` introduces notice awareness but does not itself reveal `형`/`조카`.

## ScriptedText Sample Checks

Sampled `src/data/scriptedText/spouse-01.json`:

- Total variants: 4,677.
- `a|d-1|S0|fact_pursuit` variant uses 오피스텔 pattern and spouse suspicion, with tags `reveal:none`, `revealGuard:strict`, `disclosure:sealed`.
- `a|d-1|S1|fact_pursuit` variant references safe visible items such as 머리끈, 틴트, 헤어롤.

This supports the draft rule that early `d-1` truthStage should not advance by repeated questioning alone. It needs evidence depth or a clean contradiction/rapport route.

## Source Conflict Found During Full Progression Draft

While expanding `issueProgression` for `d-2`, `h-d3`, and `h-d4`, the policy draft followed `docs/disclosure-policy.md` and `src/data/cases/generated/spouse-01.json` as the current truth source. The older loop data below still contains amount-axis wording that conflicts with that source.

| Source field | Existing wording | Conflict | Policy handling |
|---|---|---|---|
| `dossierCards.dc-3.description` / `challenge` | `공동 적금 2,000만 원을 형에게 줄 권리` | Confirmed B money axis is personal 비자금 2,000만 원 sent toward his brother, not joint savings 3,000만 원. | `d-2` progression treats B's money as personal cash/비자금 2,000만 원 and does not use this stale joint-savings wording. |
| `dossierCards.dc-4.description` | `A가 ... 2,000만 원을 옮긴 이유` | Confirmed A hidden money axis is 공동 적금 2,000만 원 해지, 위임장 조작, and investment loss. | `h-d3` progression treats A's axis as 공동 적금 2,000만 원 plus authorization/document misconduct. |
| `officialRecordRecommendations` | `B가 배우자 동의 없이 3,000만 원을 형에게 보냈다.` | Confirmed B delivered/used 2,000만 원 personal cash toward family support; the 3,000만 원 figure belongs to A's joint-savings axis. | Official-record wording should be considered a stale source candidate before any UI or dossier rendering. |
| `hiddenDisputePlans.h-d3.name` | `아내의 2,000만 원 송금...` | Confirmed `h-d3` is 공동 적금 2,000만 원 해지 / 위임장 조작 / 투자 사기. | `h-d3` title and truth stages use the confirmed 3,000만 원 axis. |

No source data was changed in this Tier 1 draft. If any of the stale v3 loop-data fields are rendered, they should become a later P4/P7-safe cleanup task after UI exposure is confirmed.

## Open Questions for CT/User

1. Whether `combinationLab.nodes.*.label` is rendered in the current PC UI. If yes, this becomes a P7 UI fix candidate.
2. Whether `v3Design.authorityPlacements.*.purpose` is rendered or only design metadata.
3. Whether `v3DepthPlan.Context/Established.summary` is shown only in player-discovered evidence detail. If shown in judge/system/dossier contexts, it needs a surface override.
4. Whether witness IDs `w-1`, `w-2`, `w-3` should be formalized in caseData or remain policy-level references until the witness system is expanded.

## Result

Cross-check is sufficient for a Tier 1 schema draft and the spouse-01 `issueProgression` full draft. It is not sufficient for runtime guard or UI fix work. Next step after CT/user approval should be either:

- start Tier 2 policy-vs-data cross-check scripts, or
- schedule a separate stale v3 loop-data cleanup only if the conflicted fields are confirmed to render in player-facing UI.

## Validation Run

Executed after the full `d-2` / `h-d3` / `h-d4` progression redraft:

| Check | Result | Note |
|---|---|---|
| JSON parse | PASS | `spouse-01.json` is valid JSON. |
| `d-1` preservation | PASS | `issueProgression.disputes.d-1` hash matches `19e4c4e` exactly: `0b39d43fdf20b9872b55704a103ad2ff3c15abfd802861f7d328200f0f8006f6`. |
| Korean field presence | PASS | `d-2`, `h-d3`, and `h-d4` all have Korean text in `title`, every stage `name`, and every stage `surfaceClaim`. |
| literal question mark check | PASS | Quoted `"?"` count 0, quoted `"??"` count 0; total `?` count remains 1, identical to `19e4c4e`. |
| UTF-8 hex sample | PASS | `d-2` stage 0 `surfaceClaim` starts with `EA B0 9C EC 9D B8...`; no `0x3F` replacement byte in the sampled Korean text. |
| Runtime import search | PASS | No `disclosurePolicy` imports found in `src/engine`, `src/components`, `src/hooks`, `src/app`, or `src/store`. |
| ScriptedText checksum sample | PASS | `src/data/scriptedText/spouse-01.json` remains `8298ead7a41c5245998808e03cc87ad3c4b3c534860bcb04470081493f0bc4f7`. |
| caseData checksum sample | PASS | `src/data/cases/generated/spouse-01.json` remains `d3c1377fd8ec0222c4f5761e0ff46c31117be4d097d31b905dff82f40d25e48a`. |
| `tmp/detect-truth-leak.cjs` | PASS | 0 leak candidates across spouse/family/friend. |
| v6 lieState/evidence/archetype/meter specialists | PASS | Hard issue count 0. `v6-liestate-flow` still reports 772 candidate issues, matching the known semantic-review backlog. |
| v3/v4/v5 specialist checks | PASS | No residual issues reported. |
| `tmp/precheck-matrix.cjs` | Existing warning/fail output | Reports 10 existing HIGH `missing_disputeId_in_channel` entries for family/friend `d-5`. This is unrelated to the spouse-01 policy schema draft and was not introduced by this work. |

The precheck scripts rewrote their tracked JSON result files during execution. Those generated side effects were restored to `HEAD`; only the new disclosure policy draft files remain changed.
