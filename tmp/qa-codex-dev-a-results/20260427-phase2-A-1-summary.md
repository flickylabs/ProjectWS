# Codex-Dev A Phase 2.A-1 Summary

## 1. HEAD
- Before A-1: `2e527bd fix(ui): stabilize surface labels and archetype fallback`
- A-1 commit: `acf5d27bd45fe8a43d03c0d2a35b16ad1ae6dfa8 fix(scripted): correct p1 stabilization text variants`

## 2. Scope
- ScriptedText `text` field corrections only.
- Files changed: `src/data/scriptedText/family-01.json`, `src/data/scriptedText/friend-01.json`, `src/data/scriptedText/spouse-01.json`.
- No wrapper, whitelist, policy, runtime guard, or baseline-v1 tag/checksum changes.

## 3. Commands Run
- `git diff --name-only` -> only 3 ScriptedText files.
- `git diff -- src/data/scriptedText/{case}.json | Select-String -Pattern '"id":'` -> 23 expected IDs.
- Node exact set validation -> `VALIDATION_PASS exact 23 text-only changes`.
- Dirty-tree `npm run check:all` -> expected FAIL, `v3-stage-aware 8 hard / 14931 variants`.
- `git diff --check -- src/data/scriptedText/...` PASS.
- `git commit -m "fix(scripted): correct p1 stabilization text variants"` PASS.
- Post-commit `npm run check:all` PASS, `v3-stage-aware 0 hard / 14931 variants`, policy cross-check `0 hard issues, 157 warnings`.

## 4. Git Diff Area Check
- `family-01.json`: 15 text replacements.
- `friend-01.json`: 5 text replacements.
- `spouse-01.json`: 3 text replacements.
- Total: 23 insertions / 23 deletions.

## 5. Variant ID List
- family-01: `judgeq-d-4-motive-search-3-v1`, `judgeq-d-3-fact_pursuit-1-v1`, `b-d-3-S2-fact-pursuit-v2`, `b-d-3-S2-fact-pursuit-v5`, `judgeq-d-2-fact-pursuit-4-v3`, `judgeq-d-2-motive-search-3-v3`, `judgeq-d-2-empathy-approach-3-v3`, `judgeq-d-3-fact-pursuit-1-v5`, `judgeq-d-3-fact-pursuit-2-v3`, `judgeq-d-4-empathy-approach-4-v1`, `judgec-d-2-soft-v5`, `judgec-d-2-mid-v5`, `judgec-d-3-soft-v3`, `a-d-5-S0-fact-pursuit-v1`, `a-d-5-S0-fact-pursuit-v2`.
- friend-01: `judgeq-d-3-fact_pursuit-1-v1`, `judgeq-d-2-fact_pursuit-2-v1`, `judgec-d-2-hard-v1`, `b-d-4-S2-fact-pursuit-v1`, `discover-b-e-4-capture-v1`.
- spouse-01: `b-d-2-S2-empathy-approach-v7`, `a-d-1-S1-motive-search-v2`, `a-d-1-S2-fact-pursuit-v3`.

## 6. Before/After Text
| Case | Variant | Before | After |
|---|---|---|---|
| family-01 | `a-d-5-S0-fact-pursuit-v1` | 제 동생이 어머니를 이용한 겁니다. 유서를 손댄 것만 봐도 답이 나옵니다. | 제 동생이 어머니를 이용했다는 정황은 보입니다. 유서가 달라진 과정만 봐도 그렇게 생각합니다. |
| family-01 | `a-d-5-S0-fact-pursuit-v2` | 자기 몫을 줄였든 늘렸든 상관없습니다. 어머니가 정한 문서를 손으로 고쳤다면 이용한 겁니다. | 비율이 어떻게 보이는지는 핵심이 아닙니다. 어머니가 정한 문서가 달라졌다면 이용당했다는 정황은 보입니다. |
| family-01 | `b-d-3-S2-fact-pursuit-v2` | 어머니 통장으로 꾸준히 돈을 넣었습니다. 생활비가 비는 달이 많았습니다. | 매달 도와드릴 일이 있었습니다. 자주 드나들 사정도 생겼습니다. |
| family-01 | `b-d-3-S2-fact-pursuit-v5` | 정기적이라고 불러도 될 만큼 보냈습니다. 제 형 쪽 생활이 그렇게 이어진 정황을 타고 버틴 건 맞습니다. | 정기적이라고 부를 만한 흐름은 있었습니다. 다만 그 돈이 어디에 어떻게 쓰였는지는 한마디로 자르기 어렵습니다. |
| family-01 | `judgec-d-2-mid-v5` | 윤정후 씨, 자기 몫을 줄였다는 사정이 있어도 위조 책임은 남습니다. 그 판단을 답해 주십시오. | 윤정후 씨, 어떤 사정이 있었더라도 문서가 달라진 책임은 남습니다. 그 판단을 답해 주십시오. |
| family-01 | `judgec-d-2-soft-v5` | 윤정후 씨, 자기 몫을 줄였다는 사실과 문서를 고친 책임을 함께 설명해 주십시오. | 윤정후 씨, 문서가 달라진 과정과 그 책임을 함께 설명해 주십시오. |
| family-01 | `judgec-d-3-soft-v3` | 윤정후 씨, 생활비와 공장 자금까지 이어진다면 처음 설명이 너무 작았습니다. 이유를 말씀해 주십시오. | 윤정후 씨, 정기적인 지원과 사업 쪽 자금 흐름까지 이어진다면 처음 설명이 너무 작았습니다. 이유를 말씀해 주십시오. |
| family-01 | `judgeq-d-2-empathy-approach-3-v3` | 윤정후 씨, 자기 몫을 줄였다는 사실도 말하지 못한 이유가 두려움이었습니까. | 윤정후 씨, 문서가 달라진 사정을 바로 말하지 못한 데에는 두려움이 있었습니까. |
| family-01 | `judgeq-d-2-fact-pursuit-4-v3` | 윤정후 씨, 자기 몫을 줄였더라도 문서를 고친 책임은 인정하십니까. | 윤정후 씨, 문서가 달라진 과정에 본인이 관여한 부분은 어디까지 인정하십니까. |
| family-01 | `judgeq-d-2-motive-search-3-v3` | 윤정후 씨, 자기 몫을 줄이면서도 왜 법적 위험을 감수하셨습니까. | 윤정후 씨, 그런 변경까지 감수하게 된 이유는 무엇입니까. |
| family-01 | `judgeq-d-3-fact_pursuit-1-v1` | 윤정후 씨, 어머니 통장으로 정기적으로 돈을 보내신 사실은 인정하십니까. | 윤정후 씨, 어머니께 정기적인 지원이 있었던 사실은 인정하십니까. |
| family-01 | `judgeq-d-3-fact-pursuit-1-v5` | 두 분, 생활비와 공장 자금의 출처를 구분해 말씀해 주십시오. | 두 분, 정기적인 지원과 사업 쪽 자금 흐름을 구분해 말씀해 주십시오. |
| family-01 | `judgeq-d-3-fact-pursuit-2-v3` | 윤정후 씨, 매달 보낸 돈과 공장 자금이 같은 흐름인지 설명해 주십시오. | 윤정후 씨, 매달 이어진 지원과 사업 쪽 자금이 같은 흐름인지 설명해 주십시오. |
| family-01 | `judgeq-d-4-empathy-approach-4-v1` | 윤정후 씨, 지금 가장 후회되는 건 말하지 않은 일입니까, 유서를 고친 일입니까. | 윤정후 씨, 지금 가장 후회되는 건 숨겨 온 사정입니까, 문서가 달라진 과정입니까. |
| family-01 | `judgeq-d-4-motive-search-3-v1` | 윤정후 씨, 출생에 관한 사실이 원본 유서를 고친 판단과 어떻게 연결됩니까. | 윤정후 씨, 민감한 가족 사정과 유서 변경 판단이 어떻게 연결됩니까. |
| friend-01 | `b-d-4-S2-fact-pursuit-v1` | 다은이 아버지가 제 돈을 가져간 게 맞습니다. | 재판관님, 그때도 비슷한 일이 있었다는 이야기는 들었습니다. |
| friend-01 | `discover-b-e-4-capture-v1` | 지금 결혼이 깨질까 봐라고 하셨습니다. 먼저 선을 넘는 메시지를 보고도 송다은 씨에게 곧바로 알리지 않은 이유가 그것이었습니까. | 지금 결혼이 깨질까 봐라고 하셨습니다. 먼저 선을 넘는 메시지를 봤다고 하셨는데, 그 시점에 송다은 씨에게 곧바로 알리지 않은 이유가 그것이었습니까. |
| friend-01 | `judgec-d-2-hard-v1` | 최수민 씨, 거절했다는 기록을 숨긴 선택이 오해를 만들었습니다. 책임을 피하지 마십시오. | 최수민 씨, 그때의 기록을 숨긴 선택이 오해를 키웠습니다. 책임을 피하지 마십시오. |
| friend-01 | `judgeq-d-2-fact_pursuit-2-v1` | 최수민 씨, 선을 넘은 말에 어떻게 거절했는지 차분히 말씀하십시오. | 최수민 씨, 부담스러운 말이 오갔을 때 어떻게 선을 그었는지 차분히 말씀하십시오. |
| friend-01 | `judgeq-d-3-fact_pursuit-1-v1` | 최수민 씨, 송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸 사실을 언제 알았습니까. | 최수민 씨, 그 무렵 가족 쪽에서 돈 이야기가 오갔다는 사실을 언제 알았습니까. |
| spouse-01 | `a-d-1-S1-motive-search-v2` | 제 남편이 아무 설명도 안 하니까 저는 남은 흔적이라도 봐야 했습니다. 사람이 안 말해주면 물건이라도 말해주잖아요. | 제 남편이 아무 설명도 안 하니까 저는 남은 흔적이라도 봐야 했습니다. 사람이 말해 주지 않으면, 물건이라면 말해 주지 않습니까. |
| spouse-01 | `a-d-1-S2-fact-pursuit-v3` | 설명 한마디만 해주면 됐는데, 돌아오는 건 짜증과 한숨뿐이었습니다. 숨기는 게 있으니까 그러는 거잖아요. | 설명 한마디만 해주면 됐는데, 돌아오는 건 짜증과 한숨뿐이었습니다. 숨기는 게 있으니까 그런 건 아닙니까. |
| spouse-01 | `b-d-2-S2-empathy-approach-v7` | 재판관님… 가족을 돕는 일이 급했습니다. 그 말을 꺼내는 게 아직도 어렵습니다. | 재판관님… 말을 흐리기 어려웠던 사정이 있었습니다. 그 말을 꺼내는 게 아직도 어렵습니다. |

## 7. 9-Dimension Preservation Verification
- Archetype voice: family B remains affect-flattening measured/deflective; family A remains defensive blame with hedging; friend B remains guarded S2; spouse A/B retain victim-cosplay/avoidant registers.
- lieState gate: S0 entries now hedge instead of asserting truth; S2 entries avoid full confession; judge prompts remain question/contradiction prompts.
- Question dimension: `fact_pursuit`, `motive_search`, `empathy_approach`, and contradiction tone preserved by unchanged tags.
- Speaker/register: judge prompts keep formal `OO 씨`; NPC answers keep judge-formal style.
- Truth lexeme/paraphrase: direct phrases called out in request were removed or abstracted.
- behaviorHint alignment: unchanged; revised text remains compatible with existing behavior hints.
- Tags: unchanged for all 23 entries.
- SourceRefs/status: unchanged for all 23 entries.
- Scope: exactly 23 `text` fields, no structural or metadata edits.

## 8. npm run check:all Result
- Working tree dirty before commit: expected FAIL, `v3-stage-aware 8 hard / 14931 variants`.
- After A-1 commit: PASS, `v3-stage-aware 0 hard / 14931 variants`.
- Policy-vs-data cross-check: PASS, `0 hard issues, 157 warnings`.
- Policy MD/JSON sync: PASS.

## 9. Baseline Regression
- A-guarded flow succeeded: once A-1 was committed, `git HEAD` became the implicit baseline and wrapper passed.
- `baseline-pre-policy-v1` / `a10b801` untouched.

## 10. Known vs New Finding
- Known: policy-vs-data warnings remain 157 baseline-known.
- New: dirty working tree `v3-stage-aware 8 hard` observed as expected for A-guarded ScriptedText edits before commit.
