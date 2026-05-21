# Thread: SCRIPT_ZH_CN family-01 e-4 叙事同步

Target: ClaudeCode
Role: `SCRIPT_ZH_CN`

## Status

family-01 证据 `e-4` (공증인 메모 기록 / 公证人备忘录) 的韩文原本已在 `main` 上重写为新叙事 (commit `75391d7a`, "e-4 deep sweep")。简体中文 sidecar 仍停留在旧叙事，需要在本 thread 内同步至新叙事。

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

KO 已在 commit `75391d7a` (撰写时的 HEAD) 更新:

- `src/data/scriptedAngles/family-01_angle_catalog.json` — d-2 / scan_sequence 的 label, description, keywords
- `src/data/scriptedAngles/family-01_special_scripts.json` — w-2 (김영수) 证人传唤台词
- `src/data/scriptedAngles/family-01_judge_questions.json` — d-2 scan_sequence + d-1 notarization_flow (text + behaviorHint)
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — b-d-2 scan_sequence S0–S4 (6 锚定文本，共 ~144 variants) + behaviorHint
- `src/data/scriptedText/family-01.json` — a-e-4-late-other (40) / b-e-4 admission (35) / a-d-2-S2 fact-pursuit v6–v10 / b-d-2-S3 fact-pursuit v2 / a-d-1-S5 v1 / 裁判官提问 / 证人传唤

表层 (先前 commit `5700aa93`) 在 zh-CN sidecar 的同步状态也需确认:

- `src/data/cases/generated/family-01.json` e-4 — viewerData / viewerDataByStage / investigationStages / partyContext / v3DepthPlan / description / surfaceDescription / socialGraph
- `src/data/claimPolicies/family-01-structure-v2.json` e-4
- `src/data/evidencePresentationScripts.ts` e-4 — facts / partyFacts / stances
- `src/components/pc/evidence/EvidenceSubViewers.tsx` + `demoEvidenceData.ts` — LogRow filterGroup + buildLogFilterOptions + logFilter_first/amend/status 的 zh-CN 文案

逐文件 KO 差异请通过 `git diff 5700aa93~1 HEAD -- <file>` 核对。

## 必读

- `docs/localization/threads/script-23-claudecode-zh-cn-spouse-01-pilot.md`
- `docs/localization/threads/script-29-claudecode-zh-cn-family-friend-expansion.md`
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `src/data/disclosurePolicy/family-01.json` — truth-leak 规则 (非 S5 不得出现 `90:10` / `减少了自己份额的伪造`)
- Memory `feedback_natural_korean_vs_translationese` — 避免翻译腔，优先使用自然口语化的中文

## 范围 — 允许写入的目标

仅 zh-CN sidecar。不得改动 KO 原本或 EN / JA sidecar。

- `src/data/scriptedText/family-01.zh-CN.json`
- `src/data/scriptedAngles/family-01_angle_catalog.zh-CN.json`
- `src/data/scriptedAngles/family-01_judge_questions.zh-CN.json`
- `src/data/scriptedAngles/family-01_interrogation_answers.zh-CN.json`
- `src/data/scriptedAngles/family-01_special_scripts.zh-CN.json` (如结构允许)
- `src/data/cases/generated/family-01.zh-CN.json`
- `src/data/claimPolicies/family-01-structure-v2.zh-CN.json` (如存在 sidecar)
- `src/data/evidencePresentationScripts.zh-CN.json` (用 Glob 确认实际路径)
- 含 `logFilter_first` / `logFilter_amend` / `logFilter_status` zh-CN locale key 的 UI locale 文件

## 工作流程

1. `git fetch && git checkout main && git pull`，确认到达 `75391d7a` 及以上。
2. 用 `git diff 5700aa93~1 HEAD -- src/data/scriptedAngles/family-01_*.json src/data/scriptedText/family-01.json src/data/cases/generated/family-01.json src/data/claimPolicies/family-01-structure-v2.json` 列出每一处 KO 改动。
3. 对每一处 KO 改动，找到 zh-CN sidecar 中对应的 `id` 并按上述映射替换中文。保留 `id` / `behaviorHint` / `tags` / 顺序。
4. 表层 (case data / viewer / log filter 标签) 同步应用同样的叙事转换。
5. KO 端新增的结构 (LogRow `filterGroup` 字段、keywords 数组里的 `"1차 접수"` / `"수정 접수"`) 在 sidecar 同形时随之同步。
6. 完成前跑全部 validation gates。

## QA / truth-leak 防线

- 阶段 0 / 阶段 1 surface (partyContext, viewerData stage 1, description, socialGraph) 不得露出阶段 2 (`60:40`) 或阶段 3 (母亲状态、回答拖延、催促) 关键词。KO 已清理，zh-CN 也要保持。
- 非 S5 surface 禁出现 `90:10` / "削减自己份额" / "伪造"。S5 披露与 KO disclosure policy 强度对齐。
- 与 `truth-leak-matrix.json` 的 `hidden.zh-CN` 数组比对，避免新增中文措辞落入隐藏词域。

## 验证命令

```powershell
npm run localization:scripts:validate -- --case=family-01 --locale=zh-CN --strict
npm run localization:cases:validate -- --case=family-01 --locale=zh-CN --strict
npm run check:policy -- --locale=zh-CN
npm run qa:lqa
npm run qa:fast
```

如可行也跑一次 `npm run build:pc`。

## 输出目录

`docs/localization/threads/outputs/script-thread-34-zh-cn-family01-e4-narrative-sync/`

必交:

- `SUMMARY.md` — 触及的文件、variants 数、叙事转换符合度记录
- `VARIATION_AUDIT_SUMMARY.json` — 高量 (非 S5) bucket 的锚定多样性仍达标
- `TRUTH_BOUNDARY_SUMMARY.json` — 非 S5 forbidden lexeme 违反数 = 0
- `GIT_LOG.md` — 最终 commit hash

## worktree 卫生

若 spawn 子 agent，先执行 `git config --global --add safe.directory <worktree>` (memory `feedback_codex_worktree_safe_directory`)。任何子 agent 都不得改动 KO 原本。
