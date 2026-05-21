# Thread: SCRIPT_JA family-01 e-4 ナラティブ同期 + KO 自然化 v3 + scriptedAngles 整合

Target: ClaudeCode
Role: `SCRIPT_JA`

## Status

3 層の KO 変更が `main` に着地し、JA サイドカーは 3 層すべてで陳腐化している。本スレッドで一括同期する。

1. **e-4 ナラティブ転換** (commit `75391d7a`, "e-4 deep sweep") — family-01 証拠 `e-4` (공증인 메모 기록 / 公証人メモ記録) を二回訪問のタイムラインに再構成。`evidence e-4` 関連の JA サイドカーを新ナラティブに同期。
2. **KO 自然化 v3** (commit `d957a9c7`, "family-01 scriptedText KO 자연화") — `src/data/scriptedText/family-01.json` 462 行を 8 次元精密ガイド (memory `feedback_natural_korean_precision_guide`) に従って自然な口語に書き換え。ユーザが 30+ アンカーを直接修正し、その学習で広域 sweep を適用。JA サイドカーも同じ 8 次元に基づき、単なる再翻訳ではなく **再自然化** が必要。
3. **scriptedAngles 整合** (commit `9b264f0f`, "family-01 scriptedAngles KO 자연화") — judge_questions 4 アンカー + interrogation_answers 48 文字列を再自然化 (`형이라는 자리` → `형이라는 위치` / `장남이라는 자리` → `장남으로서`; `그게 다입니다` → `그것뿐입니다`)。該当 JA サイドカーを揃える。

surface 層の KO 変更 (viewerData, investigationStages, partyContext, v3DepthPlan, description, socialGraph, evidencePresentationScripts) は先行コミット `5700aa93` で適用済み。これらの JA サイドカーが追従できていなければ、同一スレッドで合わせて整合させる。

## 背景 — e-4 のナラティブ転換

旧ナラティブ (廃止):
- `공증 당일` を「同日の単一イベント」と扱う表現
- `숫자 혼동` / `숫자를 오락가락` — 母親が比率の数字を取り違える描写
- `같은 자리에서 숫자가 달라진` — 同席内で比率が変わったかのような解釈
- ステージ 1 ラベル `일반 기록`
- `절차 압박` という抽象的なラベル表現

新ナラティブ (現行):
- **同じ日に二度の公証訪問**:
  - `1차 접수 (오전)` 10:10 受付 — 遺言公証手続開始 / 相続比率整理 (確認); 10:25 — 遺言者本人確認 + 立会人 2 名 (正常); 11:05 — 押印 + 保管番号付与 (完了)。
  - `수정 접수 (오후)` 17:05 — 文書修正のための再訪要請; 18:57 — 修正遺言の公証手続開始、最終比率 60:40 確認。
  - `상태 메모 (수정 절차 중)` — 午後の修正手続中に記録:
    - 18:32 — 母が疲労を訴え、回答前に休憩を要請
    - 18:39 — 質問の反復で回答が遅れ、水を一杯求める
    - 18:43 — 修正理由を問うと、息子の手助けを得て発話
    - 18:47 — ユン・ジョンフが「今日中に済ませる」と手続を急かす様子
- ステージ開放:
  - ステージ 1: 1차 접수のみ (3 行) — 比率まだなし、特記なし
  - ステージ 2: 1차 + 수정 접수 (5 行) — 60:40 はここで初出
  - ステージ 3: 全 9 行 — 疲労 / 回答遅延 / 息子の助け / 「今日中」発言が露出

フレーズマッピング (KO → JA ガイドライン):

| KO (旧) | KO (新) | JA トーン目標 |
|---|---|---|
| 공증 당일 | 수정 접수 자리 / 1차と수정の二度の手続 | "午後の修正受付の場で" / "朝の受付と午後の修正受付の双方で" |
| 숫자 혼동 / 숫자를 오락가락 / 어머니가 숫자를 혼동 | 어머니가 답변을 늦추심 / 피로를 호소 / 물 한 잔을 청함 / 답변을 잇지 못하심 | "母が回答を遅らせた" / "母が疲労を訴えた" / "母が水を一杯求めた" / "母が回答を続けられなかった" |
| 같은 자리에서 숫자가 달라진 흔적 | 오전엔 비율이 비어 있다가 오후 수정에서 60:40으로 마무리된 흔적 | "朝には比率欄が空のままで、午後の修正で 60:40 として締めくくられた経緯" |
| 절차 압박 / 절차를 밀어붙인 듯 | 오늘 마쳐야 한다며 진행을 재촉 | "「今日中に終える」と言って手続を急かす" / "手続を急かす" |
| 공증 당일 절차에 제가 관여했습니다 | 오후 수정 접수 절차까지 제가 곁에서 끌고 갔습니다 | "午後の修正受付の手続まで、私が傍について進めました" |
| 일반 기록 (ステージ 1 ラベル) | 1차 접수 | "一次受付" / "朝の受付" |
| 공증 당일 11월 5일 (a-d-1-S5 自白) | 공증이 마무리된 11월 5일 | "公証が締めくくられた 11 月 5 日" |

新聞文体や定型訳語 (「公証当日」「数字の混同」など) は使わない。

## ソース確定

### Tier 1 — e-4 ナラティブ (commit `75391d7a`)

KO 更新ファイル:

- `src/data/scriptedAngles/family-01_angle_catalog.json` — d-2 / scan_sequence の label, description, keywords
- `src/data/scriptedAngles/family-01_special_scripts.json` — w-2 (김영수) 証人召喚文
- `src/data/scriptedAngles/family-01_judge_questions.json` — d-2 scan_sequence + d-1 notarization_flow (text + behaviorHint)
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — b-d-2 scan_sequence S0–S4 (6 アンカーテキスト、合計 ~144 variants) + behaviorHint
- `src/data/scriptedText/family-01.json` — a-e-4-late-other (40) / b-e-4 admission (35) / a-d-2-S2 fact-pursuit v6–v10 / b-d-2-S3 fact-pursuit v2 / a-d-1-S5 v1 / 裁判官質問 / 証人召喚

surface 層 (先行 commit `5700aa93`) — JA 反映:

- `src/data/cases/generated/family-01.json` e-4 — viewerData / viewerDataByStage / investigationStages / partyContext / v3DepthPlan / description / surfaceDescription / socialGraph
- `src/data/claimPolicies/family-01-structure-v2.json` e-4
- `src/data/evidencePresentationScripts.ts` e-4 — facts / partyFacts / stances
- `src/components/pc/evidence/EvidenceSubViewers.tsx` + `demoEvidenceData.ts` — LogRow filterGroup + buildLogFilterOptions + logFilter_first/amend/status の JA ローカル

### Tier 2 — KO 自然化 v3 (commit `d957a9c7`、family-01.json 462 行)

`git diff d957a9c7~1 d957a9c7 -- src/data/scriptedText/family-01.json` で全パターン確認。約 **80 アンカー** が下記 8 次元のいずれかに該当。アンカー単位で翻訳すること (search/replace 不可)。

### Tier 3 — scriptedAngles 整合 (commit `9b264f0f`)

KO 更新ファイル:

- `src/data/scriptedAngles/family-01_judge_questions.json` — 4 裁判官質問アンカー (자리 → 위치/장남으로서/순간)
  - `judgeq-d-1-empathy_approach-a-general-v4`
  - `judgeq-d-3-empathy_approach-a-silence_over_pride-v1`
  - `judgeq-d-5-fact_pursuit-a-a_entitlement-v2`
  - `judgeq-d-5-empathy_approach-a-a_entitlement-v1`
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — 48 文字列、2 テンプレート (各 ×24):
  - `공증본과 별도 문서 사이의 차이를 제가 설명해야 합니다. 그게 다입니다.` → `... 그것뿐입니다.`
  - `제가 유언장에 손을 댄 사실을 부인하지 않겠습니다. 그게 다입니다.` → `... 그것뿐입니다.`

各 KO 差分は `git diff 5700aa93~1 HEAD -- <file>` / `git diff d957a9c7~1 d957a9c7 -- ...` / `git diff 9b264f0f~1 9b264f0f -- ...` で確認すること。

## JA 自然化ガイド — 8 次元 (Tier 2 + Tier 3 へ適用)

KO sweep は 8 次元精密ガイドに基づく。同等の変換を日本語に適用し、サイドカーが翻訳調ではなく自然な被告陳述として読めるようにする。被告 (윤태성 / ユン・テソン、長兄) は法廷敬語を保ちつつ、自尊心が触れられたときに肉声がにじむ「節度のある人間」の話法。

### 1. 時制・相 — 継続/累積

KO: `짊어진` → `짊어져 온` (完了相 → 現在完了進行相)。長年背負ってきたニュアンス。

| KO パターン | JA 対応 |
|---|---|
| 장남으로 버틴 세월 | 「長兄として支えてきた歳月」/「長男として持ちこたえてきた時間」 (×「長兄として支えた歳月」) |
| 짊어져 온 무게 | 「背負ってきた重み」/「担ってきた重荷」 (×「背負った重み」) |
| 내려놓은 적이 없었습니다 | 「下ろしたことなど一度もありませんでした」 |

### 2. 婉曲推量 — 自己描写を和らげる (「〜것 같다」)

KO: `방어부터 나옵니다` → `방어기재가 작동하는 것 같습니다`。発話者が自分の振る舞いを観察する語感。

| KO パターン | JA 対応 |
|---|---|
| 〜것 같습니다 | 「〜のような気がします」/「〜のかもしれません」/「〜と思います」/「〜ように思えます」 |
| 방어기재가 작동하는 것 같습니다 | 「防衛機制が働いているような気がします」/「ある種の防衛が立ち上がるのだと思います」 |
| 말이 세게 나간 것 같습니다 | 「思っていたより強い物言いになってしまったように思います」 |
| 흔들린 것 같습니다 | 「揺さぶられたような気がします」 |

心理学的語彙 (「防衛機制」「補償心理」) は歓迎。自己観察的なトーンに馴染む。

### 3. 副詞・指示語の整理 — 不要な「そんなに」「あの〜」を削る

KO: `그렇게 가볍게` → `가볍게`; `그 부분` → `그걸`。

| KO パターン | JA 対応 |
|---|---|
| 가볍게 다뤄지는 | 「軽く扱われる」 (×「そんなに軽く扱われる」) |
| 그걸 흔드는 질문 | 「それを揺さぶる質問」 — 指示は残す |
| 이제 | 「もはや」/「いまとなっては」 (時制シフト) |

### 4. 格式と口語の均衡 — 「断定」の語感を保持

KO は `단정` を意図的に保持。被告は強く押し返しつつ「決めつけない」姿勢を示す。日本語でも同じレジスタを守る。

| KO パターン | JA 対応 |
|---|---|
| 단정지어 말씀드리진 않겠습니다 | 「断定するように申し上げるつもりはございません」/「言い切るところまでは申しません」 |
| 모든 것을 단정짓진 | 「すべてを決めつけるつもりはありません」 |
| 그렇다고 전부를… | 「だからといってすべてを…」 |

「〜やんない」「〜じゃないっす」のような砕けすぎは不可。法廷敬語のまま自然口語の体温を保つ。

### 5. 心理・感情の精密化 — 日本語の慣用

KO の感情表現は韓国語固有の慣用。日本語では日本語の慣用に置き換える。直訳しない。

| KO パターン | JA 対応 |
|---|---|
| 자존심이 상하더군요 | 「自尊心が傷つきました」/「プライドが傷ついたのです」 (×「自尊心が腹を立てました」) |
| 자존심이 상할 수밖에 없습니다 | 「自尊心が傷つかずにはいられません」/「プライドが傷つくしかありませんでした」 |
| 그 감정부터 치고 올라왔습니다 | 「その感情がまず込み上げてきました」/「その思いが先に突き上げてきました」 |
| 탐욕으로 느껴졌습니다 | 「貪欲のように感じられました」 (受動感覚、×「貪欲だと解釈しました」) |
| 분노가 앞섰습니다 | 「怒りが先に立ちました」/「事実を確かめる前に怒りが先んじました」 |

### 6. 能動性・主体の明示

KO: `유리하게 끝난 결과` → `동생에게만 유리하게 작성됐어요` (受動的成果 → 主体明示)。

| KO パターン | JA 対応 |
|---|---|
| 동생에게만 유리하게 작성됐어요 | 「弟にだけ有利になるよう作成されたのです」/「弟だけが得をするように書かれていました」 |
| 어머니 의지로 | 「母の意思で」/「母自身の意志によって」 (×「母の意のもとで」) |
| 제 의지로 상황을 끌고간 | 「自分の意思で状況を引き連れていった」/「私の判断で局面を進めた」 |

### 7. 漢語名詞化 — 動詞句より名詞句が自然な場面

KO: `자주 드나든 점` → `잦은 방문`。日本語も同じく名詞句で締めると締まる場面が多い。

| KO パターン | JA 対応 |
|---|---|
| 잦은 방문 | 「頻繁な訪問」 (×「頻繁に出入りしたこと」) |
| 어머니 말년의 상황 | 「母の晩年の状況」/「晩年の母の境遇」 |
| 이유를 일일이 대지 않은 | 「理由をひとつひとつ挙げなかった」 |

### 8. 省略 vs 翻訳安全 — 指示が曖昧にならない範囲で省略

日本語は主語省略の言語だが、KO 側で省略された語の中で指示が曖昧になる箇所は明示する。

- KO `갖다 붙이는` → JA: 「(この件に) 結びつける」「(本件に) 当てはめる」 — 何を何に結びつけるかは文脈で明示。
- KO `이건` (態度を指す) → JA: 「この点だけは」/「この一点においては」。

## Tier 3 — 明示アンカーマッピング (judge_questions + interrogation_answers)

小規模・全部リストアップ。アンカー単位でコピーすること。

| アンカー id | KO (新) | JA 目標 |
|---|---|---|
| `judgeq-d-1-empathy_approach-a-general-v4` | 형이라는 위치 때문에 더 일찍 따져 묻지 못한 후회가 있다면 그 마음을 말씀해 주십시오. 그래야 무엇이 본인이 직접 겪은 일이고 무엇이 나중에 알게 된 일인지 가려낼 수 있습니다. | 「兄という立場のために、もっと早く問いただせなかったという悔いがあるのでしたら、その気持ちをお話しください。そうして初めて、ご本人が直接体験したことと、後で知ったことを切り分けられます。」 |
| `judgeq-d-3-empathy_approach-a-silence_over_pride-v1` | 윤태성 씨, 형이라는 위치가 도움을 청하기 어렵게 만드는 면이 있다는 점을 본인도 알고 계실 것입니다. 그 무게가 어떻게 본인에게 작용했는지 먼저 말씀해 주십시오. | 「ユン・テソンさん、兄という立場が助けを求めにくくさせる面があることは、ご自身もお分かりのはずです。その重みがどのようにご自身に働いてきたのかを、まずお話しください。」 |
| `judgeq-d-5-fact_pursuit-a-a_entitlement-v2` | 어머니께서 직접 인정해 주신 몫과 본인이 장남으로서 스스로 더한 몫을 분리해 답해 주십시오. | 「お母様が直接認めてくださった取り分と、ご自身が長男としてみずから上乗せした取り分とを、分けてお答えください。」 |
| `judgeq-d-5-empathy_approach-a-a_entitlement-v1` | 윤태성 씨, 어머니에 대한 장남의 의무가 어느 사이 권리처럼 바뀌는 일은 본인이 의식하기 어려운 결로 일어났을 수 있습니다. 그 변화의 첫 순간을 본인은 어디라고 보십니까. | 「ユン・テソンさん、お母様に対する長男の義務がいつしか権利のように変質してゆくということは、ご自身では気づきにくい筋目で起きていたかもしれません。その変化の最初の瞬間を、ご自身ではどこに置いておられますか。」 |

`interrogation_answers` の `그것뿐입니다.` 締め (48 文字列、2 テンプレート):
- KO: `공증본과 별도 문서 사이의 차이를 제가 설명해야 합니다. 그것뿐입니다.` → JA:「公証本と別文書との違いを、私が説明しなければなりません。それだけです。」
- KO: `제가 유언장에 손을 댄 사실을 부인하지 않겠습니다. 그것뿐입니다.` → JA:「私が遺言書に手を入れた事実は否定しません。それだけです。」

24 件ずつ単一テンプレートで揃える (テンプレート内で言い回しを散らさない)。

## Tier 2 — 高頻度フレーズマッピング (v3 sweep 全体に適用)

これらの KO 置換は v3 sweep 全体で繰り返し出現する。JA サイドカー改訂時の主アンカー。各箇所は `git diff d957a9c7~1 d957a9c7 -- src/data/scriptedText/family-01.json` で個別確認。

| KO (旧) | KO (新) | JA トーン目標 |
|---|---|---|
| 저는 그 선에서 물러서지 않습니다 | 이건 양보 못 합니다 | 「これだけは譲れません。」/「ここは引きません。」 |
| 그 선에서 먼저 인정합니다 | 거기까지는 인정하겠습니다 | 「そこまでは認めます。」 |
| 다만 전부를 단정하진 않겠습니다 | 그렇다고 전부를 단정지어 말씀드리진 않겠습니다 / 그렇다고 모든 것을 단정짓진 않겠습니다 | 「だからといって、すべてを言い切るつもりはございません。」/「すべてを決めつけるつもりはありません。」 |
| 감정을 보태고 싶지 않았습니다 | 괜히 감정을 더 섞고 싶지 않았어요 | 「いたずらに感情を持ち込みたくはなかったのです。」 |
| 그 감정이 먼저 올라왔습니다 | 그 감정부터 치고 올라왔습니다 | 「その感情がまず込み上げてきました。」 |
| 한 발 물러서도 핵심은 같습니다 | 한 발 양보해도 결론은 같습니다 | 「一歩譲っても、結論は変わりません。」 |
| 그 한마디가 제 안에서 크게 남았습니다 | 그 한마디가 제 안에 두고두고 남았어요 | 「あの一言が私の中にずっと残りました。」 |
| 장남으로 살아온 자리 / 장남이라는 자리 | 장남으로 짊어져 온 무게/체면/자존심 | 「長男として背負ってきた重み」/「長男の体面」 |
| 형이라는 자리 | 형이라는 위치 / 형으로서의 체면 | 「兄という立場」/「兄としての体面」 |
| 형이라는 자리를 끝내 붙든다 (behaviorHint) | 형으로서의 체면을 끝내 놓지 않는다 | 「兄としての体面を最後まで手放さない」 |
| 단정으로 덮는다 (behaviorHint) | 단호한 말투로 눌러 덮는 듯하다 | 「断固とした口ぶりで押さえつけるように覆い隠す」 |
| 잘라 말하진 (verb form) | 단정지어 말씀드리진 | 「言い切るところまでは申しません」/「断定するように申し上げるつもりはございません」 |
| 발끈 (psychological flash) | 자존심이 상하더군요 / 자존심이 상할 수밖에 없습니다 | 「プライドが傷ついたのです」/「自尊心が傷つかずにはいられません」 |
| 그렇게 자주 드나든 점 | 잦은 방문 | 「頻繁な訪問」 |
| 어머니 뜻만으로 | 어머니 의지로 | 「母の意思で」 |
| 유리하게 끝난 결과 | 동생에게만 유리하게 작성됐어요 | 「弟にだけ有利になるよう作成されたのです」 |
| 어머니 말년 모습 | 어머니 말년의 상황 | 「母の晩年の状況」 |

迷ったときは「自然な日本語の対応」を優先し、字面の翻訳を避ける。被告の語感は「格式ある法廷敬語+人間味のある肉声」。新聞文体や行政文体ではない。

## 必読

- `docs/localization/threads/script-22-claudecode-ja-spouse-01-pilot.md`
- `docs/localization/threads/script-28-claudecode-ja-family-friend-expansion.md`
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `src/data/disclosurePolicy/family-01.json` — truth-leak ルール (`90:10` / `自分の取り分を減らした偽造` を非 S5 で出さない)
- Memory `feedback_natural_korean_vs_translationese` — 翻訳調を避け、自然な口語に寄せる

## スコープ — 書き込み許可対象

JA サイドカーのみ。KO 原本および EN / zh-CN サイドカーは触らない。

- `src/data/scriptedText/family-01.ja.json` ← **Tier 1 (e-4) + Tier 2 (v3 sweep, 80+ アンカー)**
- `src/data/scriptedAngles/family-01_angle_catalog.ja.json` ← Tier 1 (d-2 label)
- `src/data/scriptedAngles/family-01_judge_questions.ja.json` ← Tier 1 (d-2 + d-1) + **Tier 3 (4 자리 アンカー)**
- `src/data/scriptedAngles/family-01_interrogation_answers.ja.json` ← Tier 1 (b-d-2 S0–S4) + **Tier 3 (48 그것뿐입니다 文字列)**
- `src/data/scriptedAngles/family-01_special_scripts.ja.json` (構造上サポートされる場合)
- `src/data/cases/generated/family-01.ja.json`
- `src/data/claimPolicies/family-01-structure-v2.ja.json` (サイドカーが存在する場合)
- `src/data/evidencePresentationScripts.ja.json` (Glob で実体を確認)
- `logFilter_first` / `logFilter_amend` / `logFilter_status` の JA ロケールキーを保持する UI ロケールファイル

## 作業手順

1. `git fetch && git checkout main && git pull` で `9b264f0f` 以降に追従。
2. 3 層の KO 差分を全列挙:
   - Tier 1 (e-4 ナラティブ): `git diff 5700aa93~1 75391d7a -- src/data/scriptedAngles/family-01_*.json src/data/scriptedText/family-01.json src/data/cases/generated/family-01.json src/data/claimPolicies/family-01-structure-v2.json`
   - Tier 2 (KO 自然化 v3): `git diff d957a9c7~1 d957a9c7 -- src/data/scriptedText/family-01.json` (≈80 アンカー)
   - Tier 3 (scriptedAngles 整合): `git diff 9b264f0f~1 9b264f0f -- src/data/scriptedAngles/family-01_*.json` (4 + 48)
3. 各 KO 変更について JA サイドカーの該当 `id` を特定し、JA を置換:
   - **Tier 1**: 「背景 — e-4 のナラティブ転換」のマッピングに従う。
   - **Tier 2**: JA 自然化 8 次元ガイド + 高頻度フレーズマッピング表を適用。**目標は再翻訳ではなく再自然化**。現行 JA サイドカーが字義訳 (例「私はその線から退きません。」) のままなら、KO 原意を保ったまま自然な日本語 (「これだけは譲れません。」) に書き換える。
   - **Tier 3**: 明示アンカーマッピング表をそのままコピー。
   `id` / `behaviorHint` / `tags` / 配列順は保持。behaviorHint は KO のみで JA 翻訳不要。
4. surface 層 (case data / viewer / log filter ラベル) にも同じ転換を適用。
5. KO 側で新たに増えた構造 (LogRow `filterGroup` フィールド、keywords 配列の `"1차 접수"` / `"수정 접수"`) はサイドカーが同形なら追従する。
6. validation gates を最後にすべて通す。

## QA / truth-leak ガード

- ステージ 0 / ステージ 1 表面 (partyContext, viewerData stage 1, description, socialGraph) でステージ 2 (`60:40`) / ステージ 3 (母の状態、回答遅延、急かし) キーワードを露出させない。KO 側は除去済み。
- `90:10` / 「自分の取り分を減らした」/「偽造」は非 S5 で禁止。S5 では KO の disclosure policy に揃った強度で開示する。
- `truth-leak-matrix.json` の `hidden.ja` 配列に既定された語との重複を避ける。
- **多様性保持 (Tier 2 で重要)**: KO v3 sweep は繰り返し締め (例 `이건 양보 못 합니다`、`한 발 양보해도 결론은 같습니다`、`그 한마디가 제 안에 두고두고 남았어요`) を多数 variant にわたり一貫して書き換えている。各繰り返し KO 締めは **単一の正規 JA 締め** にマッピングし、テンプレートの均一性を保つ — むやみに散らさないこと。非 S5 高ボリュームバケット全体としては ≥3 opener アンカー / ≥3 closer アンカー (異なる KO アンカー由来) を維持。

## バリデーションコマンド

```powershell
npm run localization:scripts:validate -- --case=family-01 --locale=ja --strict
npm run localization:cases:validate -- --case=family-01 --locale=ja --strict
npm run check:policy -- --locale=ja
npm run qa:lqa
npm run qa:fast
npm run qa:cutscene
```

可能なら `npm run build:pc` も実行。

## 成果物ディレクトリ

`docs/localization/threads/outputs/script-thread-33-ja-family01-e4-narrative-sync/`

必須:

- `SUMMARY.md` — 触れたファイル、variants 数 (Tier 1 e-4 / Tier 2 v3 sweep / Tier 3 scriptedAngles)、ナラティブ転換準拠ノート、自然化トーン審査ノート
- `NATURALIZATION_AUDIT.md` — Tier 2 + Tier 3 について: 10 アンカーをスポット監査し KO 変更前後 + JA 変更前後を並記。8 次元のうち適用したものを明示。既存 JA がすでに自然と判断して保留したアンカーは一行で justification を併記。
- `VARIATION_AUDIT_SUMMARY.json` — 高ボリュームバケット (非 S5) のアンカー多様性が維持されていること + テンプレート均一性 (繰り返し KO 締め → 単一 JA 締め) も確認
- `TRUTH_BOUNDARY_SUMMARY.json` — 非 S5 forbidden lexeme violations = 0
- `GIT_LOG.md` — 最終コミットハッシュ

## worktree 衛生

サブエージェントを spawn する場合は `git config --global --add safe.directory <worktree>` を先に実行 (memory `feedback_codex_worktree_safe_directory`)。KO 原本はどのサブエージェントからも編集しない。
