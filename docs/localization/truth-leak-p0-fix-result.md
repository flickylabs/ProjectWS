# Truth-Leak P0 Fix Result

작업 브랜치: `codex/truth-leak-p0-fix`

기준 커밋: `5161004e`

## Summary

- P0 대상 6 entries만 수정했다.
- 답변 variants, truth-leak matrix, glossary, 디자인 의도 잔존 5건은 수정하지 않았다.
- JA `family-01` dossier overlay의 `questionText` 누락은 대상 3 entries에 localized `questionText`를 추가하는 방식으로 처리했다.

## Detect Truth Leak

| Run | Total | byCase | byLang |
| --- | ---: | --- | --- |
| Before | 11 | `{"family-01":6,"friend-01":5}` | `{"ko":7,"en":1,"ja":0,"zh-CN":3}` |
| After | 5 | `{"family-01":3,"friend-01":2}` | `{"ko":2,"en":0,"ja":0,"zh-CN":3}` |

잔존 5건은 의뢰서에서 별개 task로 분리한 디자인 의도 baseline이다.

## Abstraction Pattern

- `출생 비밀` / `birth secret` / `出生的秘密`는 `민감한 가족 사정` / `sensitive family matter` / `敏感な家族の事情` / `敏感家庭往事`로 치환했다. 진입 질문의 강도는 유지하되 출생 관련 진실 keyword를 제거했다.
- `악역을 자처` 계열은 `불리한 위치` 또는 `책임을 떠안았다는 시각`으로 낮췄다. 재판관이 사실을 확정해 말하지 않도록 `시각/view/見方/看法` 프레이밍을 사용했다.
- `돈을 빌려 달라는 말` + `경고 연락` 동시 노출은 `금전 관련 발언` + `반복된 연락`으로 낮췄다. 시점 대조 질문의 기능은 유지하면서 d-1/d-3 hidden keyword를 모두 제거했다.

## Entry Changes

### family-01 dc-4.b.q1 early

| Lang | Before | After |
| --- | --- | --- |
| KO | 윤정후 씨, 형의 출생 비밀을 언제 알게 되었고, 그 뒤 왜 혼자 감당하려 하셨습니까? | 윤정후 씨, 형과 관련된 민감한 가족 사정을 언제 알게 되었고, 그 뒤 왜 혼자 감당하려 하셨습니까? |
| EN | Jeong-hoo Yoon, when did you find out about the secret of your brother’s birth, and why did you try to handle it alone after that? | Jeong-hoo Yoon, when did you find out about the sensitive family matter regarding your brother, and why did you try to handle it alone after that? |
| JA | `<missing>` | ユン・ジョンフさん、お兄さんに関わる敏感な家族の事情をいつ知り、その後なぜ一人で抱えようとしたのですか。 |
| ZH-CN | 尹正虎，你是什么时候知道你哥哥出生的秘密的？之后你为什么要独自处理这件事？ | 尹正虎，你是什么时候知道关于你哥哥的敏感家庭往事的？之后你为什么要独自处理这件事？ |

### family-01 dc-4.b.q1 mid

| Lang | Before | After |
| --- | --- | --- |
| KO | 윤정후 씨, 형의 출생 비밀을 언제 알게 되었고, 그 뒤 왜 혼자 감당하려 하셨습니까? | 윤정후 씨, 형과 관련된 민감한 가족 사정을 언제 알게 되었고, 그 뒤 왜 혼자 감당하려 하셨습니까? |
| EN | Jeong-hoo Yoon, when did you find out about the secret of your brother’s birth, and why did you try to handle it alone after that? | Jeong-hoo Yoon, when did you find out about the sensitive family matter regarding your brother, and why did you try to handle it alone after that? |
| JA | `<missing>` | ユン・ジョンフさん、お兄さんに関わる敏感な家族の事情をいつ知り、その後なぜ一人で抱えようとしたのですか。 |
| ZH-CN | 尹正虎，你是什么时候知道你哥哥出生的秘密的？之后你为什么要独自处理这件事？ | 尹正虎，你是什么时候知道关于你哥哥的敏感家庭往事的？之后你为什么要独自处理这件事？ |

### family-01 dc-4.b.q1 late

| Lang | Before | After |
| --- | --- | --- |
| KO | 윤정후 씨, 형의 출생 비밀을 언제 알게 되었고, 그 뒤 왜 혼자 감당하려 하셨습니까? | 윤정후 씨, 형과 관련된 민감한 가족 사정을 언제 알게 되었고, 그 뒤 왜 혼자 감당하려 하셨습니까? |
| EN | Jeong-hoo Yoon, when did you find out about the secret of your brother’s birth, and why did you try to handle it alone after that? | Jeong-hoo Yoon, when did you find out about the sensitive family matter regarding your brother, and why did you try to handle it alone after that? |
| JA | `<missing>` | ユン・ジョンフさん、お兄さんに関わる敏感な家族の事情をいつ知り、その後なぜ一人で抱えようとしたのですか。 |
| ZH-CN | 尹正虎，你是什么时候知道你哥哥出生的秘密的？之后你为什么要独自处理这件事？ | 尹正虎，你是什么时候知道关于你哥哥的敏感家庭往事的？之后你为什么要独自处理这件事？ |

### friend-01 d-4 motive_search depth 4 v4

Variant: `judgeq-d-4-motive_search-4-v4`

| Lang | Before | After |
| --- | --- | --- |
| KO | 최수민 씨, 악역을 자처한 방식이 반복된 이유를 설명하십시오. | 최수민 씨, 자신을 불리한 위치에 둔 선택이 반복된 이유를 설명하십시오. |
| EN | Ms. Choi, explain why the pattern of making yourself the villain repeated. | Ms. Choi, explain why the choice to put yourself in a difficult position repeated. |
| JA | チェ・スミンさん、悪役を自ら引き受けるやり方が繰り返された理由を説明してください。 | チェ・スミンさん、自ら不利な立場を引き受ける選択が繰り返された理由を説明してください。 |
| ZH-CN | 崔秀敏女士，请说明为什么自愿承担坏人角色的方式反复出现。 | 崔秀敏女士，请说明为什么主动承担不利位置的选择反复出现。 |

### friend-01 d-4 empathy_approach depth 3 v2

Variant: `judgeq-d-4-empathy_approach-3-v2`

| Lang | Before | After |
| --- | --- | --- |
| KO | 송다은 씨, 최수민 씨가 악역을 자처했다는 말이 어떻게 들립니까. | 송다은 씨, 최수민 씨가 책임을 떠안았다는 시각은 어떻게 들립니까. |
| EN | Ms. Song, how does it sound to hear that Ms. Choi chose to be the villain? | Ms. Song, how does the view that Ms. Choi took the burden on herself sound to you? |
| JA | ソン・ダウンさん、チェ・スミンさんが悪役を引き受けたという言葉は、どう聞こえますか。 | ソン・ダウンさん、チェ・スミンさんが自分で責任を抱えたという見方は、どう聞こえますか。 |
| ZH-CN | 宋多恩女士，听到崔秀敏女士自愿承担坏人角色这句话，你是什么感受？ | 宋多恩女士，听到崔秀敏女士把责任揽到自己身上的这种看法，你是什么感受？ |

### friend-01 d-3 fact_pursuit depth 2 v3

Variant: `judgeq-d-3-fact_pursuit-2-v3`

| Lang | Before | After |
| --- | --- | --- |
| KO | 두 분, 돈을 빌려 달라는 말과 경고 연락이 겹친 시점을 자료에 맞춰 말씀하십시오. | 두 분, 금전 관련 발언과 반복된 연락이 겹친 시점을 자료에 맞춰 말씀하십시오. |
| EN | Both of you, match the point where the money request and the warning contact overlapped to the materials. | Both of you, match the point where the money-related conversation and the repeated outreach overlapped to the materials. |
| JA | お二人とも、お金を貸してほしいという話と警告の連絡が重なった時点を、資料に沿って話してください。 | お二人とも、金銭に関する話と繰り返された連絡が重なった時点を、資料に沿って話してください。 |
| ZH-CN | 两位，请根据资料说明借钱的话与警告联系重叠的时间点。 | 两位，请根据资料说明金钱相关对话与反复联系重叠的时间点。 |

## JA Schema Gap

`src/data/scriptedText/family-01.ja.json`의 `dc-4.b.q1|early`, `dc-4.b.q1|mid`, `dc-4.b.q1|late`는 기존에 `questionText`가 없었다. 같은 entry의 답변 variants는 이미 JA overlay에 있으므로, 대상 3 entries에만 JA `questionText`를 추가했다.

`src/engine/scriptedTextLoader.ts`의 현재 locale overlay merge는 variant `text`/`behaviorHint`만 병합하므로, 이번 추가는 dossier 답변 variant runtime을 바꾸지 않는다. 다만 non-dialogue 원천 데이터와 truth-leak scan 대상 필드가 4언어 모두 같은 추상도 텍스트를 갖도록 schema gap을 닫는다.

## Verification

- `node scripts/detect-truth-leak.cjs`: PASS, findings 11 -> 5
- `npm run qa:fast`: PASS, static P0=0, route P0=0, combined P0=0
- `npx tsc -b --noEmit`: PASS after `npm ci`

Additional note: `npm run localization:scripts:validate` was run as a schema sanity check, but it fails on pre-existing `spouse-01` dialogue truth lexemes unrelated to this batch.
