# Truth-Leak P0 Fix Batch 2 Result

## Scope

- Branch: `codex/truth-leak-p0-fix-batch2`
- Base: `ab0517e6`
- Case/dispute: `friend-01` / `d-3`
- Channels: `judge_question` 7 variants, `judge_contradiction` 1 variant
- Locale files: KO base `friend-01.json`, plus `friend-01.en.json`, `friend-01.ja.json`, `friend-01.zh-CN.json`
- Policy references: `feedback_truth_leak_prohibition`, `feedback_claude_ko_needs_codex_multilang`

## Detector Summary

- Before: `truth leak findings: 25`
  - `byCase={"friend-01":25}`
  - `byLang={"ko":8,"en":5,"ja":6,"zh-CN":6}`
- After: `truth leak findings: 0`
  - `byCase={}`
  - `byLang={"ko":0,"en":0,"ja":0,"zh-CN":0}`

## Entry Changes

### `judge_question.entries[24].variants[4]`

- KO: `송다은 씨, 그 금전 관련 발언이 결혼 준비와 어떻게 맞물렸습니까.`
- EN: `Ms. Song, how did that money-related wording connect with wedding preparations?`
- JA: `ソン・ダウンさん、その金銭関連の発言は、結婚準備とどう絡みましたか。`
- ZH-CN: `宋多恩女士，那段钱款相关表述与婚礼准备是如何交织的？`
- Rationale: surface phrase preserved as a money-related utterance tied to wedding preparations; hidden borrow-money wording removed.

### `judge_question.entries[25].variants[0]`

- KO: `최수민 씨, 현재의 금전 관련 발언과 과거 경험이 닮았다고 본 근거를 말씀해 주십시오.`
- EN: `Ms. Choi, explain why you saw the current money-related wording as resembling your past experience.`
- JA: `チェ・スミンさん、現在の金銭関連の話と過去の経験が似ていると見た根拠を話してください。`
- ZH-CN: `崔秀敏女士，请说明你认为当前钱款相关表述与过去经历相似的依据。`
- Rationale: preserves the past/current comparison and evidentiary ask while abstracting the leaked request wording.

### `judge_question.entries[26].variants[0]`

- KO: `최수민 씨, 반복되는 금전 관련 발언의 순서를 과거와 현재로 나눠 설명하십시오.`
- EN: `Ms. Choi, separate the repeated money-related wording into past and present, and explain the order.`
- JA: `チェ・スミンさん、繰り返された金銭関連の話の順序を、過去と現在に分けて説明してください。`
- ZH-CN: `崔秀敏女士，请把反复出现的钱款相关表述按过去和现在分开说明顺序。`
- Rationale: keeps the chronology task and repeated-pattern meaning without exposing the exact hidden phrase.

### `judge_question.entries[26].variants[4]`

- KO: `송다은 씨, 아버지의 금전 관련 흐름을 지금도 오해라고 보십니까.`
- EN: `Ms. Song, do you still see the flow of your father's money-related conduct as a misunderstanding?`
- JA: `ソン・ダウンさん、お父様の金銭関連の流れを、今も誤解だと見ていますか。`
- ZH-CN: `宋多恩女士，你现在仍然认为父亲的钱款相关过程是误会吗？`
- Rationale: preserves the father-side interpretation question while replacing the direct demand/request wording with a surface flow.

### `judge_question.entries[29].variants[1]`

- KO: `송다은 씨, 금전 관련 발언을 가족 간 도움으로만 보려 한 이유는 무엇입니까.`
- EN: `Ms. Song, why did you try to see the money-related wording only as help within the family?`
- JA: `ソン・ダウンさん、金銭関連の話を、なぜ家族内の助け合いとしてだけ見ようとしたのですか。`
- ZH-CN: `宋多恩女士，你为什么试图把钱款相关表述只看作家人之间的帮忙？`
- Rationale: keeps Song's framing as family help while removing the hidden request phrase.

### `judge_question.entries[31].variants[2]`

- KO: `두 분, 금전 관련 흐름이 반복됐다는 점을 인정한 뒤 각자 숨긴 이유를 말씀해 주십시오.`
- EN: `Both of you, after acknowledging that the money-related flow repeated, each state why you hid what you hid.`
- JA: `お二人とも、金銭関連の流れが繰り返されたことを認めたうえで、それぞれ隠した理由を話してください。`
- ZH-CN: `两位，请在承认钱款相关流程重复后，各自说明隐瞒的理由。`
- Rationale: preserves repeated-flow admission and hidden-reason prompt across all locales without direct borrow/request wording.

### `judge_question.entries[32].variants[0]`

- KO: `최수민 씨, 같은 금전 관련 발언을 다시 봤을 때 어떤 감정이 올라왔습니까.`
- EN: `Ms. Choi, when you saw the same money-related wording again, what feeling rose in you?`
- JA: `チェ・スミンさん、同じ金銭関連の言葉を再び見た時、どんな感情が湧きましたか。`
- ZH-CN: `崔秀敏女士，当你再次看到同样的钱款相关表述时，心里升起了什么情绪？`
- Rationale: keeps the empathy prompt about seeing the same surface wording again while removing exact hidden wording.

### `judge_contradiction.entries[6].variants[2]`

- KO: `두 분, 금전 관련 발언의 현재 기록과 과거 기억이 만나는 지점을 정리해 주십시오.`
- EN: `Both of you, organize where the current record and past memory meet around the money-related wording.`
- JA: `お二人とも、金銭関連の発言について、現在の記録と過去の記憶が交わる地点を整理してください。`
- ZH-CN: `两位，请整理钱款相关表述中当前记录与过去记忆交汇的地方。`
- Rationale: KO-only leak was abstracted and the other locales were aligned to the same current-record/past-memory contradiction frame.

## Verification

```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs
```

Results:

- `npx tsc -b --noEmit`: PASS
- `npm run qa:fast`: PASS, `static P0=0`, `route P0=0`, `combined P0=0`
- `node scripts/detect-truth-leak.cjs`: PASS, `truth leak findings: 0`

Note: `npm ci` was required in the isolated worktree because `node_modules` was not present; no package files were changed.
