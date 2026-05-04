# family-01 Disclosure Policy Cross-Check

**Status**: Tier 1 draft cross-check for `family-01`.
**Runtime**: policy JSON is not imported by runtime code.
**Baseline**: `baseline-pre-policy-v1` (`a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3`)
**Reference stable commit**: `6ee9690` for spouse-01 policy files.

## Case Data Shape

The request described `p.disputes[]` and `p.evidence[]`, but the actual generated file uses top-level arrays:

- `src/data/cases/generated/family-01.json:disputes[]`
- `src/data/cases/generated/family-01.json:evidence[]`
- `src/data/cases/generated/family-01.json:duo.socialGraph[]`

The policy JSON follows the actual generated shape. `_schema.md` and all spouse-01 policy files were left unchanged.

## Evidence Surface Map

| Evidence | Truth-bearing source name | Surface policy | Notes |
|---|---|---|---|
| `e-1` | `60:40 유서 사본` | `공증 유서 사본` | The ratio is visible in evidence detail, but protected judge/system/dossier prompts should not infer the hidden 90:10 direction. |
| `e-2` | `요양원 방문기록` | same | Safe as timing evidence; do not state motive before d-1 gate. |
| `e-3` | `전 요양보호사 음성증언` | same | The line about reading paper is player-discovered/witness-gated, not a judge prompt shortcut. |
| `e-4` | `공증인 메모 기록` | `공증인 메모 기록` | Two scans are safe; `90:10 -> 60:40` direction is gated. |
| `e-5` | `어머니 서랍에서 나온 자필 연습본` | `서랍에서 나온 자필 연습본` | Original ratio is gated by evidence depth and d-2 progression. |
| `e-6` | `오래된 계좌 흐름` | `오래된 계좌 흐름` | `20년` may be visible as evidence name, but protected prompts should use `오래된 지원` until gate. |
| `e-7` | `어머니 일기장 사진` | same | Birth-secret content is the highest-risk truth leak; stage-gated only. |

## Dispute Map

| Dispute | Initial source state | Policy stage axis | Hidden truth boundary |
|---|---|---|---|
| `d-1` | visible | 판단능력 전면 부정 -> 도움/개입 경계 | Do not reveal 90:10 or birth secret. |
| `d-2` | unlock after d-1 | 60:40 표면 -> 90:10 원본 -> 자기 몫 축소 조작 | Motive points to d-3/d-4 but does not auto-solve them. |
| `d-3` | hidden | 어머니 돈 표면 -> 정후 돈 장기 지원 | Birth secret remains sealed until e-7/d-4 gate. |
| `d-4` | hidden | 가족 사정 표면 -> birth-secret route | Sensitive details stay sealed beyond established route. |
| `d-5` | hidden final | A entitlement + B protective forgery | Requires both responsibility axes; no one-sided shortcut. |

## Witness Surface Map

| Witness | Surface knowledge | Truth-gated knowledge |
|---|---|---|
| `w-1` 최복순 | 말년 어머니 곁에서 본 유서 관련 행동 | `형 오기 전`, 종이 낭독의 의도 |
| `w-2` 김영수 | 공증 과정 이상 징후 | 같은 날 두 문서, 마지막 재제출자 |
| `w-3` 박순애 | 어머니 속마음을 들은 지인 | 장기 지원 출처, 출생 비밀 암시 |

## UI Surface Candidates

| Source field | Current text | Exposure risk | Draft handling |
|---|---|---|---|
| `combinationLab.nodes.dc-2.label` | `dc-2 형이 모르던 20년의 돈` | High if rendered before d-3 | Surface fallback: `오래된 지원 흐름`. |
| `combinationLab.outputs.dc-2.judgeHint` | `오래된 지원의 출처` | High in judge/system UI | Surface fallback: `오래된 지원의 출처`. |
| `combinationLab.outputs.dc-4.summary` | `출생 비밀` / `20년 지원` | High before d-4 | Route-gated; protected channels use `민감한 가족 사정`. |
| `v3Design.authorityPlacements[3].purpose` | `조작 동기, 송금 이유, 일기장 내용 같은 실체 명사 강제` | Unknown UI exposure | Marked as unknown-internal-candidate. |
| `v3Design.authorityPlacements[11].purpose` | `출생 비밀을 확실히 열되...` | Unknown UI exposure | Marked as unknown-internal-candidate. |
| `family-01-dossier-cards.dc-4.successEffects` | `출생 비밀... 유서 조작 동기` | Dossier risk if shown before unlock | Should require d-4/e-7 gate or use abstract wording. |
| `evidence.e-7.v3DepthPlan.Context.summary` | `출생 비밀, 20년 지원...` | Allowed only in player-discovered evidence detail | Protected channels remain surface-only. |

## discoveryText Gate Candidates

| Recipe | Inputs | Truth terms | Draft gate |
|---|---|---|---|
| `combine-1` | `e-1`, `e-2` | 윤정후 개입 | d-1 stage 1 + evidence Excerpt. |
| `combine-2` | `e-4`, `e-5` | 90:10, 60:40, 자기 몫 축소 | d-2 stage 2 + e-4/e-5 Original. |
| `combine-3` | `e-5`, `e-6` | 20년 생활비, 윤정후 돈 | d-3 stage 2 + e-6 Original. |
| `combine-4` | `e-6`, `e-7` | 출생 비밀, 형 보호 | d-4 stage 3 + e-6/e-7 Context. |
| `combine-5` | `stmt-b-silence`, `e-4` | 자기 몫을 줄인 이유 | d-2 stage 2 + e-4 Context. |
| `combine-6` | `stmt-b-mother`, `e-6` | 20년간 윤정후가 보낸 돈 | d-3 stage 2 + e-6 Original. |
| `combine-7` | `e-5`, `e-7` | 출생 비밀, 90대10 | d-4 stage 3 + e-5 Original + e-7 Context. |
| `combine-8` | `e-1`, `e-7` | 장남 당연시, 보호 명분 | d-5 stage 2 + e-7 Context. |
| `combine-9` | `stmt-a-heir`, `e-7` | 어머니 뜻 왜곡 | d-5 stage 2 + e-7 Context. |
| `combine-10` | `stmt-a-heir`, `e-6` | 돈과 비밀을 떠안은 동생 | d-3 stage 3 + e-6 Context. |
| `combine-11` | `e-2`, `e-3` | 종이를 읽어드림, 형 오기 전 | d-1 stage 2 + e-2/e-3 Original. |
| `combine-12` | `stmt-a-heir`, `stmt-b-silence` | 비율 뒤에 숨은 사정 | d-2 stage 1 + B lieState S2. |

## v2 Policy Sample Checks

`family-01-structure-v2.json` agrees with the policy progression:

- `d-1`: not a simple dementia yes/no issue; it is judgment capacity plus B's boundary-crossing.
- `d-2`: B forged the will, but the direction was 90:10 to 60:40, reducing B's share.
- `d-3`: A believed the support came from mother; B's money was hidden behind mother's account.
- `d-4`: birth secret connects the 90:10 danger and B's silence.
- `d-5`: both brothers overlaid their own frame on mother's will.

`family-01-game-events-v2.json` includes some full-truth judge lines for S5/full-spoiler contexts. The policy treats these as lieState-gated or late-route text, not protected early prompts.

There is no `family-01-v3-game-loop-data.json`; the stale v3 loop-data conflict pattern found in spouse-01 does not have a direct family-01 counterpart.

## ScriptedText Sample Checks

Sampled `src/data/scriptedText/family-01.json`:

- Total scripted variants: 5,172.
- Early interrogation sample stays on `60:40 유서`, care, and disbelief with tags `reveal:none`, `revealGuard:strict`, `disclosure:sealed`.
- `judge_question` sample asks about visit frequency without direct hidden-truth lexemes.
- `system_message` sample says the same question is looping and points the player toward another angle without exposing truth.

This supports the policy design: the player should progress through evidence depth, witness pressure, and contradiction routes rather than repeated generic questioning.

## Open Questions for CT/User

1. Whether `combinationLab.nodes.*.label` and `outputs.*.judgeHint` are rendered before discovery gates.
2. Whether dossier `successEffects` are visible before a dossier card is solved.
3. Whether `v3Design.authorityPlacements.*.purpose` is rendered or design-only metadata.
4. Whether birth-secret details require a separate sealed-detail policy beyond `e-7` Context/Established.

## Source Conflict Found

No direct family-01 equivalent of the spouse-01 stale amount-axis conflict was found. The meaningful caution is different:

- Some `family-01-game-events-v2.json` S5/full-spoiler lines include complete truths and should remain late-route or confession-only.
- Some `combinationLab` and `dossierCards` fields contain truth-bearing labels or effects and need UI-path confirmation before any runtime fix.

No source data was changed in this Tier 1 draft.

## Result

Cross-check is sufficient for a Tier 1 `family-01` schema draft and full 5-dispute `issueProgression` draft. It is not sufficient for runtime guard or UI fix work. Next step after CT/user approval should be either:

- expand `friend-01` using the same schema and validation procedure, or
- start Tier 2 policy-vs-data cross-check scripts.

## Validation Run

Executed after drafting:

| Check | Result | Note |
|---|---|---|
| JSON parse | PASS | `family-01.json` is valid JSON. |
| 7-section policy shape | PASS | `surfaceMap`, `forbiddenLexemes`, `channelAuthority`, `lieStateGate`, `uiSurfaceMap`, `discoveryText`, `issueProgression` present. |
| 5-dispute progression | PASS | `d-1` through `d-5` are all `sample-complete` with stages 0-4 and required stage fields. |
| Korean field presence | PASS | Every dispute `title`, every stage `name`, and every stage `surfaceClaim` contains Korean text. |
| literal question mark check | PASS | Quoted `"?"` count 0, quoted `"??"` count 0. Total `?` count 2, both from intentional Korean question sentences in UI candidate text. |
| UTF-8 hex sample | PASS | `d-1` stage 0 `surfaceClaim` includes Korean UTF-8 bytes (`EA/EB/EC...`) and no `0x3F` replacement byte. |
| spouse-01 / `_schema.md` preservation | PASS | `git diff 6ee9690 -- src/data/disclosurePolicy/spouse-01.json src/data/disclosurePolicy/spouse-01-cross-check.md src/data/disclosurePolicy/_schema.md` is empty. |
| Runtime import search | PASS | No `disclosurePolicy` imports found in `src/engine`, `src/components`, `src/hooks`, `src/app`, or `src/store`. |
| ScriptedText checksum sample | PASS | `src/data/scriptedText/family-01.json` remains `c0393287b94b282c56b445f8b278350715e4b0c4ff65d9e56dc623696dbcd940`. |
| caseData checksum sample | PASS | `src/data/cases/generated/family-01.json` remains `281b8741eee0c6fa6198be0f034f33eb3ca7ae679511e680bd0f875391f172ff`. |
| spouse baseline checksum sample | PASS | `spouse-01` ScriptedText and caseData checksums remain `8298ead7...` and `d3c1377f...`. |
| `tmp/detect-truth-leak.cjs` | PASS | 0 leak candidates across spouse/family/friend. |
| v6 lieState/evidence/archetype/meter specialists | PASS | Hard issue count 0. `v6-liestate-flow` still reports 772 candidate issues, matching the known semantic-review backlog. |
| v3/v4/v5 specialist checks | PASS | No residual issues reported. |
| `tmp/precheck-matrix.cjs` | Existing warning/fail output | Reports 10 existing HIGH `missing_disputeId_in_channel` entries for family/friend `d-5`. This predates this policy draft and was not introduced by these files. |
| `git diff --check` | PASS | No whitespace errors in the new policy files. |

The precheck scripts rewrote their tracked JSON result files during execution. Those generated side effects were restored to `HEAD`; only the new family disclosure policy draft files and request file remain untracked.
