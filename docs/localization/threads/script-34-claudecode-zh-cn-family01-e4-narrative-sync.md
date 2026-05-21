# Thread: SCRIPT_ZH_CN family-01 e-4 叙事同步 + KO 自然化 v3 + scriptedAngles 整合

Target: ClaudeCode
Role: `SCRIPT_ZH_CN`

## Status

3 层 KO 改动已落地 `main`，zh-CN sidecar 在 3 层上均已过期。本 thread 一次性同步全部。

1. **e-4 叙事转换** (commit `75391d7a`, "e-4 deep sweep") — family-01 证据 `e-4` (공증인 메모 기록 / 公证人备忘录) 重构为两次访问的时间线。`evidence e-4` 相关的 zh-CN sidecar 须同步至新叙事。
2. **KO 自然化 v3** (commit `d957a9c7`, "family-01 scriptedText KO 자연화") — `src/data/scriptedText/family-01.json` 462 行按 8 维精密指南 (memory `feedback_natural_korean_precision_guide`) 改写为自然口语韩文。用户亲手修订 30+ 锚定，由此生成广域 sweep。zh-CN sidecar 也须按同样的 8 维 **重新自然化**，而非简单重译。
3. **scriptedAngles 整合** (commit `9b264f0f`, "family-01 scriptedAngles KO 자연화") — judge_questions 4 锚定 + interrogation_answers 48 字符串重新自然化 (`형이라는 자리` → `형이라는 위치` / `장남이라는 자리` → `장남으로서`；`그게 다입니다` → `그것뿐입니다`)。对应的 zh-CN sidecar 须对齐。

表层 (viewerData, investigationStages, partyContext, v3DepthPlan, description, socialGraph, evidencePresentationScripts) 的 KO 改动已在先前 commit `5700aa93` 完成。如其 zh-CN sidecar 未同步，请在同一 thread 内一并处理。

## 背景 — e-4 的叙事转换

旧叙事 (已废弃):
- `공증 당일` 视为同日单次事件
- `숫자 혼동` / `숫자를 오락가락` — 把母亲描绘成把继承比例数字搞混的人
- `같은 자리에서 숫자가 달라진` — 暗示比例在同一场合内被改动
- 阶段 1 标签 `일반 기록`
- `절차 압박` 这种抽象式标签

新叙事 (现行规范):
- **同一天的两次公证访问**:
  - `1차 접수 (오전)` 10:10 受理 — 遗嘱公证程序开始 / 整理继承比例 (确认); 10:25 — 立遗嘱人身份核验 + 2 名见证人到场 (正常); 11:05 — 公证印章 + 编号归档 (完成)。
  - `수정 접수 (오후)` 17:05 — 申请二次到访以修订文书; 18:57 — 修订后遗嘱公证程序开始，最终比例 60:40 确认。
  - `상태 메모 (수정 절차 중)` — 下午修订程序进行过程中的备忘:
    - 18:32 — 母亲表示疲倦，请求在回答前休息
    - 18:39 — 问题重复时回答迟缓，索要一杯水
    - 18:43 — 被问到修订理由时，借儿子之助才发话
    - 18:47 — 尹正厚似在以"今天必须办完"催促程序推进
- 阶段开放:
  - 阶段 1: 仅 1차 접수 (3 行) — 尚无比例，无异常
  - 阶段 2: 1차 + 수정 접수 (5 行) — 60:40 在此首次出现
  - 阶段 3: 全部 9 行 — 疲倦 / 回答迟缓 / 借儿子之助 / "今天必须办完" 等浮现

短语映射 (KO → zh-CN 指南):

| KO (旧) | KO (新) | zh-CN 表达基调 |
|---|---|---|
| 공증 당일 | 수정 접수 자리 / 1차和수정两次手续 | "下午修订受理那一场" / "上午受理与下午修订两道手续" |
| 숫자 혼동 / 숫자를 오락가락 / 어머니가 숫자를 혼동 | 어머니가 답변을 늦추심 / 피로를 호소 / 물 한 잔을 청함 / 답변을 잇지 못하심 | "母亲拖延了回答" / "母亲诉说疲倦" / "母亲要了一杯水" / "母亲接不上话" |
| 같은 자리에서 숫자가 달라진 흔적 | 오전엔 비율이 비어 있다가 오후 수정에서 60:40으로 마무리된 흔적 | "上午比例栏空着，下午修订时才以 60:40 收尾的痕迹" |
| 절차 압박 / 절차를 밀어붙인 듯 | 오늘 마쳐야 한다며 진행을 재촉 | "以'今天必须办完'催促程序" / "催促程序" |
| 공증 당일 절차에 제가 관여했습니다 | 오후 수정 접수 절차까지 제가 곁에서 끌고 갔습니다 | "下午修订受理的程序也是我在旁推进的" |
| 일반 기록 (阶段 1 标签) | 1차 접수 | "首次受理" / "上午受理" |
| 공증 당일 11월 5일 (a-d-1-S5 自白) | 공증이 마무리된 11월 5일 | "公证落定的 11 月 5 日" |

避免新闻体或定型化译法 (例如 "公证当日"、"数字混乱")。

## 真实来源

### Tier 1 — e-4 叙事 (commit `75391d7a`)

KO 更新文件:

- `src/data/scriptedAngles/family-01_angle_catalog.json` — d-2 / scan_sequence 的 label, description, keywords
- `src/data/scriptedAngles/family-01_special_scripts.json` — w-2 (김영수) 证人传唤台词
- `src/data/scriptedAngles/family-01_judge_questions.json` — d-2 scan_sequence + d-1 notarization_flow (text + behaviorHint)
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — b-d-2 scan_sequence S0–S4 (6 锚定文本，共 ~144 variants) + behaviorHint
- `src/data/scriptedText/family-01.json` — a-e-4-late-other (40) / b-e-4 admission (35) / a-d-2-S2 fact-pursuit v6–v10 / b-d-2-S3 fact-pursuit v2 / a-d-1-S5 v1 / 裁判官提问 / 证人传唤

表层 (先前 commit `5700aa93`) — zh-CN sidecar 同步状态:

- `src/data/cases/generated/family-01.json` e-4 — viewerData / viewerDataByStage / investigationStages / partyContext / v3DepthPlan / description / surfaceDescription / socialGraph
- `src/data/claimPolicies/family-01-structure-v2.json` e-4
- `src/data/evidencePresentationScripts.ts` e-4 — facts / partyFacts / stances
- `src/components/pc/evidence/EvidenceSubViewers.tsx` + `demoEvidenceData.ts` — LogRow filterGroup + buildLogFilterOptions + logFilter_first/amend/status 的 zh-CN 文案

### Tier 2 — KO 自然化 v3 (commit `d957a9c7`，family-01.json 462 行)

通过 `git diff d957a9c7~1 d957a9c7 -- src/data/scriptedText/family-01.json` 查看全部模式。约 **80 个锚定** 落在下列 8 维之一。须逐锚定翻译 (不可用 search/replace)。

### Tier 3 — scriptedAngles 整合 (commit `9b264f0f`)

KO 更新文件:

- `src/data/scriptedAngles/family-01_judge_questions.json` — 4 个裁判官提问锚定 (자리 → 위치/장남으로서/순간)
  - `judgeq-d-1-empathy_approach-a-general-v4`
  - `judgeq-d-3-empathy_approach-a-silence_over_pride-v1`
  - `judgeq-d-5-fact_pursuit-a-a_entitlement-v2`
  - `judgeq-d-5-empathy_approach-a-a_entitlement-v1`
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — 48 字符串，2 套模板 (各 ×24):
  - `공증본과 별도 문서 사이의 차이를 제가 설명해야 합니다. 그게 다입니다.` → `... 그것뿐입니다.`
  - `제가 유언장에 손을 댄 사실을 부인하지 않겠습니다. 그게 다입니다.` → `... 그것뿐입니다.`

各 KO 差异请通过 `git diff 5700aa93~1 HEAD -- <file>` / `git diff d957a9c7~1 d957a9c7 -- ...` / `git diff 9b264f0f~1 9b264f0f -- ...` 核对。

## zh-CN 自然化指南 — 8 维 (适用于 Tier 2 + Tier 3)

KO sweep 基于 8 维精密指南。把同等的转换应用到简体中文，使 sidecar 读起来是自然的被告陈述，而非字面照搬。被告 (윤태성 / 尹泰盛，长子) 保持法庭敬语，又在自尊被触动时透出真实的人声 — "克制但有体温"的语气。

### 1. 时态/相 — 持续 / 累积

KO: `짊어진` → `짊어져 온` (完成相 → 持续完成相)。多年承担的语感。

| KO 模式 | zh-CN 对应 |
|---|---|
| 장남으로 버틴 세월 | "作为长子撑过来的这些年" / "身为长子一路扛过来的岁月" (×"作为长子扛起的岁月") |
| 짊어져 온 무게 | "一直背负着的重担" / "这些年扛下来的分量" (×"背起的重担") |
| 내려놓은 적이 없었습니다 | "我从未把它放下过" |

### 2. 委婉推测 — 软化自我描述 ("~것 같다")

KO: `방어부터 나옵니다` → `방어기재가 작동하는 것 같습니다`。说话人在观察自己。

| KO 模式 | zh-CN 对应 |
|---|---|
| 〜것 같습니다 | "好像〜" / "似乎〜" / "我觉得〜" / "大概〜" / "应该是〜" |
| 방어기재가 작동하는 것 같습니다 | "好像是防御机制启动了" / "我觉得是某种自我防御在起作用" |
| 말이 세게 나간 것 같습니다 | "话好像说得比我本意要重" |
| 흔들린 것 같습니다 | "我好像是动摇了" |

心理学/精神分析词汇 (「防御机制」「补偿心理」) 可用 — 与"自我审视"的语气相合。

### 3. 副词/指示词的清理 — 删掉多余的"这么/那么""那个/这个"

KO: `그렇게 가볍게` → `가볍게`; `그 부분` → `그걸`。

| KO 模式 | zh-CN 对应 |
|---|---|
| 가볍게 다뤄지는 | "被轻轻带过" / "被轻易处理" (×"被那么轻地处理") |
| 그걸 흔드는 질문 | "撼动这一点的提问" — 指代要清 |
| 이제 | "如今" / "到现在" / "时至此刻" |

### 4. 庄重与口语的平衡 — 保留"断定/断言"的语气

KO 有意保留 `단정`。被告强势回推，又表明"不下绝对结论"。中文也守住这一语域。

| KO 模式 | zh-CN 对应 |
|---|---|
| 단정지어 말씀드리진 않겠습니다 | "我并不会断言到这种地步" / "我不会就此把话说死" |
| 모든 것을 단정짓진 | "我不会就此断言一切" / "我不会把所有的都钉死" |
| 그렇다고 전부를… | "话虽如此，我也不会把全部……" |

不要用"我可不能那么说啊"之类过于俚化的语气。法庭敬语 + 真实人声。

### 5. 心理/情绪精准化 — 中文惯用

KO 的情感表达是韩语特有的惯用法。中文须用中文的惯用，不可直译。

| KO 模式 | zh-CN 对应 |
|---|---|
| 자존심이 상하더군요 | "自尊心受到了伤害" / "面子上有些挂不住" (×"自尊心发了火") |
| 자존심이 상할 수밖에 없습니다 | "自尊心难免受到伤害" / "面子上难免挂不住" |
| 그 감정부터 치고 올라왔습니다 | "那种情绪率先涌上心头" / "那股情绪先冲了上来" |
| 탐욕으로 느껴졌습니다 | "感觉像是贪欲" (被动感觉，×"我把它解读为贪欲") |
| 분노가 앞섰습니다 | "怒火先冲了上来" / "比起核实事实，愤怒先到了" |

### 6. 主动性 / 主体明示

KO: `유리하게 끝난 결과` → `동생에게만 유리하게 작성됐어요` (被动事件 → 主体明示)。

| KO 模式 | zh-CN 对应 |
|---|---|
| 동생에게만 유리하게 작성됐어요 | "被写成只对弟弟有利的样子" / "那份文书写得只对弟弟有利" |
| 어머니 의지로 | "凭母亲自己的意愿" / "出自母亲本人的意思" |
| 제 의지로 상황을 끌고간 | "凭我自己的意志推动了局面" / "是我主动把局面推到了那里" |

### 7. 汉语化名词复合 — 名词短语比动词短语更自然时

KO: `자주 드나든 점` → `잦은 방문`。中文同样有"双音节复合名词"更自然的场景。

| KO 模式 | zh-CN 对应 |
|---|---|
| 잦은 방문 | "频繁的拜访" / "频繁的探望" (×"经常出入的事") |
| 어머니 말년의 상황 | "母亲晚年的境况" / "母亲晚年的状况" |
| 이유를 일일이 대지 않은 | "没有把理由一条条说出来" |

### 8. 省略 vs 翻译安全 — 中文可省略，但指代须清晰

中文允许省略主语/宾语，但 KO 已省的地方若指代不明，则要补出。

- KO `갖다 붙이는` → zh-CN: "硬扯到本案上" / "套到这件事上" — 主体/对象由上下文给出。
- KO `이건` (指态度) → zh-CN: "这一点" / "在这一点上"。

## Tier 3 — 明示锚定映射 (judge_questions + interrogation_answers)

数量少，全部列出。逐锚定照搬。

| 锚定 id | KO (新) | zh-CN 目标 |
|---|---|---|
| `judgeq-d-1-empathy_approach-a-general-v4` | 형이라는 위치 때문에 더 일찍 따져 묻지 못한 후회가 있다면 그 마음을 말씀해 주십시오. 그래야 무엇이 본인이 직접 겪은 일이고 무엇이 나중에 알게 된 일인지 가려낼 수 있습니다. | "如果因为兄长这一身份让您未能更早追问，留下了悔意，请把那种心情说出来。这样才能把您亲身经历过的事情和后来才知道的事情区分开。" |
| `judgeq-d-3-empathy_approach-a-silence_over_pride-v1` | 윤태성 씨, 형이라는 위치가 도움을 청하기 어렵게 만드는 면이 있다는 점을 본인도 알고 계실 것입니다. 그 무게가 어떻게 본인에게 작용했는지 먼저 말씀해 주십시오. | "尹泰盛先生，兄长这一身份让人难以向外开口求助，您自己也应当清楚。请先说说，那份重量是怎样作用在您身上的。" |
| `judgeq-d-5-fact_pursuit-a-a_entitlement-v2` | 어머니께서 직접 인정해 주신 몫과 본인이 장남으로서 스스로 더한 몫을 분리해 답해 주십시오. | "请把母亲亲自认可的那一份，与您自己身为长子额外加上去的那一份，分开作答。" |
| `judgeq-d-5-empathy_approach-a-a_entitlement-v1` | 윤태성 씨, 어머니에 대한 장남의 의무가 어느 사이 권리처럼 바뀌는 일은 본인이 의식하기 어려운 결로 일어났을 수 있습니다. 그 변화의 첫 순간을 본인은 어디라고 보십니까. | "尹泰盛先生，对母亲的长子之责，不知何时悄悄变成了类似权利的东西 — 这种转变可能是在您自己也难以察觉的细微脉络里发生的。您把那转变的最初瞬间，落在了哪里？" |

`interrogation_answers` 的 `그것뿐입니다.` 收尾 (48 字符串、2 套模板):
- KO: `공증본과 별도 문서 사이의 차이를 제가 설명해야 합니다. 그것뿐입니다.` → zh-CN:"公证本与另一份文书之间的差异，得由我来解释。仅此而已。"
- KO: `제가 유언장에 손을 댄 사실을 부인하지 않겠습니다. 그것뿐입니다.` → zh-CN:"我不会否认自己动过那份遗嘱。仅此而已。"

24 条用同一模板，不要在模板内部散乱变体。

## Tier 2 — 高频短语映射 (适用于 v3 sweep 全量)

下列 KO 替换在 v3 sweep 中反复出现，作为 zh-CN sidecar 改写的主锚定。每处务必通过 `git diff d957a9c7~1 d957a9c7 -- src/data/scriptedText/family-01.json` 单独核对。

| KO (旧) | KO (新) | zh-CN 表达基调 |
|---|---|---|
| 저는 그 선에서 물러서지 않습니다 | 이건 양보 못 합니다 | "这一点我不能让步。" / "在这一点上我不会退。" |
| 그 선에서 먼저 인정합니다 | 거기까지는 인정하겠습니다 | "到这一步我可以承认。" |
| 다만 전부를 단정하진 않겠습니다 | 그렇다고 전부를 단정지어 말씀드리진 않겠습니다 / 그렇다고 모든 것을 단정짓진 않겠습니다 | "话虽如此，我也不会把全部都说死。" / "但我并不会就此断言一切。" |
| 감정을 보태고 싶지 않았습니다 | 괜히 감정을 더 섞고 싶지 않았어요 | "我不想再徒添情绪。" |
| 그 감정이 먼저 올라왔습니다 | 그 감정부터 치고 올라왔습니다 | "那种情绪率先涌上心头。" |
| 한 발 물러서도 핵심은 같습니다 | 한 발 양보해도 결론은 같습니다 | "即便退让一步，结论也一样。" |
| 그 한마디가 제 안에서 크게 남았습니다 | 그 한마디가 제 안에 두고두고 남았어요 | "那一句话在我心里久久地留着。" |
| 장남으로 살아온 자리 / 장남이라는 자리 | 장남으로 짊어져 온 무게/체면/자존심 | "身为长子一路背负的重担" / "长子的体面" |
| 형이라는 자리 | 형이라는 위치 / 형으로서의 체면 | "兄长这一身份" / "作为兄长的体面" |
| 형이라는 자리를 끝내 붙든다 (behaviorHint) | 형으로서의 체면을 끝내 놓지 않는다 | "把兄长的体面紧紧攥到最后" |
| 단정으로 덮는다 (behaviorHint) | 단호한 말투로 눌러 덮는 듯하다 | "似乎用果断的口吻把它强行压下" |
| 잘라 말하진 (verb form) | 단정지어 말씀드리진 | "我并不会断言到这种地步" |
| 발끈 (psychological flash) | 자존심이 상하더군요 / 자존심이 상할 수밖에 없습니다 | "自尊心受到了伤害" / "自尊心难免受到伤害" |
| 그렇게 자주 드나든 점 | 잦은 방문 | "频繁的拜访" |
| 어머니 뜻만으로 | 어머니 의지로 | "凭母亲的意愿" |
| 유리하게 끝난 결과 | 동생에게만 유리하게 작성됐어요 | "被写成只对弟弟有利的样子" |
| 어머니 말년 모습 | 어머니 말년의 상황 | "母亲晚年的境况" |

判断不定时优先选"自然的中文对应"，避免字面直译。被告语感是 "庄重的法庭敬语 + 有真实体温的人声" — 不是新闻体或公文体。

## 必读

- `docs/localization/threads/script-23-claudecode-zh-cn-spouse-01-pilot.md`
- `docs/localization/threads/script-29-claudecode-zh-cn-family-friend-expansion.md`
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `src/data/disclosurePolicy/family-01.json` — truth-leak 规则 (非 S5 不得出现 `90:10` / `减少了自己份额的伪造`)
- Memory `feedback_natural_korean_vs_translationese` — 避免翻译腔，优先使用自然口语化的中文

## 范围 — 允许写入的目标

仅 zh-CN sidecar。不得改动 KO 原本或 EN / JA sidecar。

- `src/data/scriptedText/family-01.zh-CN.json` ← **Tier 1 (e-4) + Tier 2 (v3 sweep, 80+ 锚定)**
- `src/data/scriptedAngles/family-01_angle_catalog.zh-CN.json` ← Tier 1 (d-2 label)
- `src/data/scriptedAngles/family-01_judge_questions.zh-CN.json` ← Tier 1 (d-2 + d-1) + **Tier 3 (4 个 자리 锚定)**
- `src/data/scriptedAngles/family-01_interrogation_answers.zh-CN.json` ← Tier 1 (b-d-2 S0–S4) + **Tier 3 (48 条 그것뿐입니다 字符串)**
- `src/data/scriptedAngles/family-01_special_scripts.zh-CN.json` (如结构允许)
- `src/data/cases/generated/family-01.zh-CN.json`
- `src/data/claimPolicies/family-01-structure-v2.zh-CN.json` (如存在 sidecar)
- `src/data/evidencePresentationScripts.zh-CN.json` (用 Glob 确认实际路径)
- 含 `logFilter_first` / `logFilter_amend` / `logFilter_status` zh-CN locale key 的 UI locale 文件

## 工作流程

1. `git fetch && git checkout main && git pull`，确认到达 `9b264f0f` 及以上。
2. 列出 3 层 KO 改动:
   - Tier 1 (e-4 叙事): `git diff 5700aa93~1 75391d7a -- src/data/scriptedAngles/family-01_*.json src/data/scriptedText/family-01.json src/data/cases/generated/family-01.json src/data/claimPolicies/family-01-structure-v2.json`
   - Tier 2 (KO 自然化 v3): `git diff d957a9c7~1 d957a9c7 -- src/data/scriptedText/family-01.json` (≈80 锚定)
   - Tier 3 (scriptedAngles 整合): `git diff 9b264f0f~1 9b264f0f -- src/data/scriptedAngles/family-01_*.json` (4 + 48)
3. 对每一处 KO 改动，找到 zh-CN sidecar 中对应的 `id` 并替换中文:
   - **Tier 1**: 按 "背景 — e-4 的叙事转换" 中的映射处理。
   - **Tier 2**: 应用 zh-CN 自然化 8 维指南 + 高频短语映射表。**目标是再自然化，不只是再翻译**。若现行 zh-CN sidecar 仍是字面翻译 (例如 "我不会从那条线上退下来。")，须在不改变 KO 原意的前提下改写为自然中文 ("这一点我不能让步。")。
   - **Tier 3**: 直接按明示锚定映射表逐条照搬。
   保留 `id` / `behaviorHint` / `tags` / 顺序。`behaviorHint` 仅为 KO 内部使用，无需翻译。
4. 表层 (case data / viewer / log filter 标签) 同步应用同样的叙事转换。
5. KO 端新增的结构 (LogRow `filterGroup` 字段、keywords 数组里的 `"1차 접수"` / `"수정 접수"`) 在 sidecar 同形时随之同步。
6. 完成前跑全部 validation gates。

## QA / truth-leak 防线

- 阶段 0 / 阶段 1 surface (partyContext, viewerData stage 1, description, socialGraph) 不得露出阶段 2 (`60:40`) 或阶段 3 (母亲状态、回答拖延、催促) 关键词。KO 已清理，zh-CN 也要保持。
- 非 S5 surface 禁出现 `90:10` / "削减自己份额" / "伪造"。S5 披露与 KO disclosure policy 强度对齐。
- 与 `truth-leak-matrix.json` 的 `hidden.zh-CN` 数组比对，避免新增中文措辞落入隐藏词域。
- **多样性保留 (Tier 2 关键)**: KO v3 sweep 在多条 variants 上把重复出现的收尾 (例如 `이건 양보 못 합니다`、`한 발 양보해도 결론은 같습니다`、`그 한마디가 제 안에 두고두고 남았어요`) 一致地改写过。每一条重复的 KO 收尾须映射到 **单一规范的 zh-CN 收尾**，保持模板均匀性 — 不可乱铺变体。非 S5 高量桶整体仍须维持 ≥3 个 opener 锚定 / ≥3 个 closer 锚定 (来自不同 KO 锚定)。

## 验证命令

```powershell
npm run localization:scripts:validate -- --case=family-01 --locale=zh-CN --strict
npm run localization:cases:validate -- --case=family-01 --locale=zh-CN --strict
npm run check:policy -- --locale=zh-CN
npm run qa:lqa
npm run qa:fast
npm run qa:cutscene
```

如可行也跑一次 `npm run build:pc`。

## 输出目录

`docs/localization/threads/outputs/script-thread-34-zh-cn-family01-e4-narrative-sync/`

必交:

- `SUMMARY.md` — 触及的文件、各层 variants 数 (Tier 1 e-4 / Tier 2 v3 sweep / Tier 3 scriptedAngles)、叙事转换符合度记录、自然化语感审计记录
- `NATURALIZATION_AUDIT.md` — 针对 Tier 2 + Tier 3: 抽 10 个锚定做点检，列出 KO 改前/改后 + zh-CN 改前/改后，说明落到 8 维中的哪些维度。若判断现行 zh-CN 已经够自然而保留，写一行 justification。
- `VARIATION_AUDIT_SUMMARY.json` — 非 S5 高量桶的锚定多样性仍达标 + 模板均一性 (重复 KO 收尾 → 单一 zh-CN 收尾) 也合格
- `TRUTH_BOUNDARY_SUMMARY.json` — 非 S5 forbidden lexeme 违反数 = 0
- `GIT_LOG.md` — 最终 commit hash

## worktree 卫生

若 spawn 子 agent，先执行 `git config --global --add safe.directory <worktree>` (memory `feedback_codex_worktree_safe_directory`)。任何子 agent 都不得改动 KO 原本。
