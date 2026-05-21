# Thread: SCRIPT_ZH_CN family-01 e-5 重新归属 + d-2 叙事分离 同步

Target: ClaudeCode
Role: `SCRIPT_ZH_CN`

## Status

script-thread-34 中 e-4 叙事同步 + KO 自然化 v3 + scriptedAngles 整合已经反映 (cherry-pick `c3e6331a`)。其后 KO main 上又落地 4 个新提交，zh-CN sidecar 尚未跟进。最大的结构变化是：证据 `e-5`「어머니 자필 유언장 연습본 (母亲亲笔遗嘱草稿)」从 dispute `d-2` 移到 `d-5`，并且 d-2 叙事重新锚定到公证程序本身。

需要同步的 KO commit (按时间顺序):
- `7ac600a1` — Phase 1 e-5 重新归属数据 (case data + structure + disclosurePolicy + truth-leak matrix)
- `a856966d` — Phase 2-1 d-2 自白叙事分离 (special_scripts 4 entries)
- `e48eeae1` — Phase 2-2 scriptedAngles + scriptedText d-2 叙事分离 (~720 string)
- `08be3f25` — Phase 2-3 claimPolicies (dossier + events + atoms) ~59 string

当前 zh-CN sidecar 仍把 `e-5` 视为 d-2 证据，d-2 锚定中仍残留 亲笔 / 90:10 / 伪造 / "缩减自己份额" 之类的语言。本 thread 重新同步。

## 背景 — 设计转换

**旧设计 (已废弃)**:
- `e-5` (显示 90:10 的亲笔草稿) 是 dispute `d-2` (「60:40 遗嘱与另行文件的差异」) 的硬证据。
- `e-5` 一旦开放，d-2 的正解便自动暴露 (尹正厚把自己的 90 削减为公证 60)。
- d-2 verdict 同时要求 `e-4` 和 `e-5`。
- d-5 (「母亲隐藏的心意」) 没有 `e-5` 的证据分量，仅作抽象动机层存在。

**新设计 (canonical from `7ac600a1`)**:
- d-2 = **「공증 절차의 개입」/「公证程序的介入」**。仅凭 `e-4` (公证人备忘) 即可到达 verdict。叙事是：上午一次受理时比例栏空缺、下午修订受理时确定为 60:40、母亲状态不稳定、尹正厚催促程序。该介入的动机 **不在 d-2 内下结论**。
- d-5 = **「어머니의 숨겨진 마음」/「母亲隐藏的心意」** — 要求 `e-5` + `e-6` + `e-7`。尹正厚改写母亲遗愿的硬证据，是亲笔 90:10 与公证 60:40 之间的对比本身。
- `e-5` 重新归属: `proves` = `["d-5"]`, `requiredLieState` = `"S5"` (d-4 verdict 之后开放，原先为 d-1 S2)。
- 证据 require 链放松: `e-6.requires` = `["e-4"]` (原 `["e-5"]`); `e-7.requires` = `["e-6"]` (原 `["e-5", "e-6"]`)。

对 d-2 锚定的影响: 亲笔 / 90:10 / 伪造 / "缩减自己份额" 语言全部移除，换为程序语言 (上午一次受理 / 下午修订 / 尹正厚催促 / 母亲状态)。对 d-5 锚定的影响: 亲笔 90:10 → 公证 60:40 的痕迹要作为命名证据出现，而非停留在抽象。

## Tier 1 — 数据文件 (Phase 1, commit `7ac600a1`)

zh-CN sidecar 须镜像这些 KO 数据变更。精确差异请通过 `git diff 7ac600a1~1 7ac600a1 -- <file>` 核对。

- `src/data/cases/generated/family-01.json`
  - d-2: `name`, `truthDescription`, `verdictOptions.{wrong,partial,truth,defer}`, `mediationLink`, `judgmentStatement`, `v3UnlockPlan.{runtimeRule,authoredRule,summary}`, `requiredEvidence`
  - d-5: `truthDescription`, `verdictOptions.truth`, `verdictOptions.defer`, `requiredEvidence`
  - e-5: `proves`, `requiredLieState`, `partyContext.a/b`
  - e-6 `requires`, e-7 `requires`, socialGraph e-5 `linkedDisputeIds`
- `src/data/claimPolicies/family-01-structure-v2.json` — d-2/d-5/e-5/e-6/e-7
- `src/data/disclosurePolicy/family-01.json` — disputes.d-2/d-5 surface/truth/truthLexemes + d-2 truthStages stage 0-4 + d-5 truthStages stage 2/3/4
- `docs/localization/non-dialogue-extract/truth-leak-matrix.json` — d-2.hidden / d-5.hidden 在 `7ac600a1` 已对四语 (含 zh-CN) 更新完毕。仅 verify zh-CN 节是否正确

当 zh-CN sidecar 镜像这些结构 (`family-01.zh-CN.json`, `family-01-structure-v2.zh-CN.json` 等) 时，应用相同 shape。

## Tier 2 — 叙事分离 (Phase 2, commits `a856966d` + `e48eeae1` + `08be3f25`)

KO 变更 — 约 **800 string**:

- `src/data/scriptedAngles/family-01_special_scripts.json` — 17 string (d-2 confessions + s5RequestionResponses + judge_evidence_combo + dossier-note-d-2)
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — ~486 string (d-2 anchors)
- `src/data/scriptedText/family-01.json` — ~225 anchor (d-2 anchors + d-2 叙事渗入的 interrogation/evidence_present/dossier/witness/mediation/contradiction/primary_fault/shared_fault/protective_resolution/procedural_caution 区域 + b-d-5-S5 语气整合 3 件)
- `src/data/claimPolicies/family-01-dossier-cards.json` — 6 string (dc-2)
- `src/data/claimPolicies/family-01-game-events.json` — 4 string
- `src/data/claimPolicies/family-01-game-events-v2.json` — 8 string (contradictions[8]/[11] + conflicts[5])
- `src/data/claimPolicies/family-01-v2-atoms.json` — ~41 string (24 amount block exact/rounded 一并 + 6 evidence block + factText + 伪造 lexeme 整合)

对每个 KO 变更，定位 zh-CN sidecar 中对应的 `id` 并改写 zh-CN 文本。目标是读起来像自然的中文被告 / 法官话语 — 不是字面翻译，而是 **重自然化** (与 script-thread-34 使用的 8 维指南一致)。

### 高频 KO 替换 (Phase 2 dominant templates) 与 zh-CN 目标

KO sweep 的重复模板映射到单一规范 zh-CN 收尾。保留 `reveal` / `lieState`。不可乱铺变体。

| KO (旧) | KO (新) | zh-CN 目标 |
|---|---|---|
| 자필 연습본이 나오면 제 단정도 흔들릴 수밖에 없습니다 | 공증 절차에 다른 정황이 드러나면 제 단정도 흔들릴 수밖에 없습니다 | 「公证程序里若另有情况浮现，我的断言也难免动摇。」 |
| 자필 연습본과 공증본이 다르다면, 제가 믿었던 조작 방향도 다시 봐야 합니다 | 공증 절차에 다른 동기가 있었다면, 제가 믿었던 조작 방향도 다시 봐야 합니다 | 「如果公证程序里有别的动机，我所相信的操控方向也得重新审视。」 |
| 90:10에서 60:40으로 바뀐 흐름을 보니 단순히 동생이 더 받으려 했다는 말은 맞지 않습니다. 제 단정도 책임져야 합니다 | 정후가 진행을 재촉하며 절차에 깊이 개입한 흐름을 보니 단순히 동생이 더 받으려 했다는 말은 맞지 않습니다. 제 단정도 책임져야 합니다 | 「看到正厚催促进度、深度介入程序的脉络，单说弟弟想多拿一些并不成立。我自己的断言也得承担起来。」 |
| 자필 연습본과 공증본의 방향을 함께 보면 제 첫 의심은 단순하지 않았습니다 | 공증 절차의 흐름을 함께 보면 제 첫 의심은 단순하지 않았습니다 | 「把公证程序的脉络并起来看，我最初的怀疑并不简单。」 |
| 자필 연습본과 공증본을 함께 보니 제가 처음 말한 탐욕의 그림만으로는 설명되지 않습니다. 이제는 공증본만 보고 판단할 수 없다는 점을 인정합니다 | 절차 안의 진행 압박과 어머니 상태를 함께 보니 제가 처음 말한 탐욕의 그림만으로는 설명되지 않습니다. 이제는 공증본만 보고 판단할 수 없다는 점을 인정합니다 | 「把程序中的进度压力和母亲的状态合起来看，我最初描绘的贪欲已无法解释一切。如今我承认，仅凭公证本无法作出判断。」 |
| 동생이 자기 몫을 줄인 변경이었다는 점까지 확인했습니다. 그래도 어머니 문서를 바꾼 책임은 별도로 남습니다 | 정후가 절차에서 진행을 재촉했다는 점까지 확인했습니다. 그래도 절차에 손댄 책임은 별도로 남습니다 | 「我已确认到正厚在程序中催促了进度。即便如此，对程序动手的责任仍单独存在。」 |
| 자필 연습본의 방향을 보고 나니 제 의심도 틀어진 부분이 있습니다 | 절차의 흐름을 보고 나니 제 의심도 틀어진 부분이 있습니다 | 「看了程序的脉络，我的怀疑也有偏差的部分。」 |
| 자필 연습본의 90:10을 공증본 60:40으로 바꾼 사실은 인정합니다. 제 몫을 줄인 변경이어도 위조 책임은 남습니다 | 공증 오후 수정에서 진행을 재촉한 사실은 인정합니다. 그 절차에 손댄 책임은 남습니다 | 「我承认在公证下午修订时催促了进度。对那道程序动手的责任仍在。」 |
| 공증본과 자필 연습본 사이에 제가 만든 차이가 있었습니다. 형을 지키려 했다는 말로 어머니 뜻을 고친 책임이 사라지지는 않습니다 | 공증 절차에 제가 깊이 개입한 부분이 있었습니다. 그 동기로 어머니 상태에 작용한 책임이 사라지지는 않습니다 | 「我确实在公证程序里深度介入过。即便那是出于动机，作用于母亲状态的责任也不会消失。」 |
| 제가 유언장에 손을 댄 사실을 부인하지 않겠습니다 → 자필 연습본과 공증본의 차이는 제가 만든 것입니다 | 제가 공증 절차에 손을 댄 사실을 부인하지 않겠습니다 → 오후 수정 단계에서 진행을 빨리 끌고 간 것은 제 책임입니다 | 「我不会否认自己对公证程序动过手。在下午修订阶段把进度推快是我的责任。」 |
| 공증본은 60:40으로 남았고 자필 연습본은 달랐습니다. 그 차이를 만든 사람이 저라는 점을 인정합니다 | 공증본은 60:40으로 남았고 그 자리에 도달하는 절차를 제가 끌고 갔습니다. 그 절차 책임을 제가 인정합니다 | 「公证本停在 60:40，把程序推到那里的人是我。这份程序上的责任，我承认。」 |
| 자필 연습본과 공증본이 다르게 남은 경위는 기록으로 확인해야 합니다 | 공증 절차의 경위는 기록으로 확인해야 합니다 | 「公证程序的经过须凭记录来核实。」 |
| 자필 연습본을 언제 봤는지와 공증본이 어떻게 남았는지는 분리해 답하겠습니다 | 오전 1차 접수의 흐름과 오후 수정 접수의 진행은 분리해 답하겠습니다 | 「上午一次受理的脉络与下午修订受理的进行，我会分开作答。」 |
| 어머니 문서가 다르게 남은 책임은 따져야 합니다. 다만 그 책임을 지금 제 위조로 단정할 수는 없습니다 | 공증 절차에 손댄 책임은 따져야 합니다. 다만 그 책임이 어떤 동기였는지는 별도로 봐야 합니다 | 「对公证程序动手的责任必须追究。不过那份责任出于何种动机，得另作审视。」 |
| 공증본이 60:40으로 남은 과정에 제 책임이 있습니다. 왜 그렇게 됐는지는 자필 연습본과 함께 설명하겠습니다 | 공증본이 60:40으로 남은 과정에 제 책임이 있습니다. 왜 그렇게 됐는지는 어머니 상태와 진행 압박을 함께 설명하겠습니다 | 「公证本停在 60:40 的过程里有我的责任。为何如此，我会连同母亲的状态和进度压力一并说明。」 |
| 두 문서 사이에 제가 만든 차이가 있었다는 점은 피하지 않겠습니다. 다만 왜 그렇게 했는지는 자필 연습본의 내용과 함께 봐야 합니다 | 공증 절차에 제가 깊이 개입했다는 점은 피하지 않겠습니다. 다만 왜 그렇게 했는지는 어머니 상태와 진행 압박을 함께 봐야 합니다 | 「我不会回避自己在公证程序里深度介入这件事。不过为什么这样做，得连同母亲的状态和进度压力一起看。」 |
| 자필 연습본과 공증본이 다르게 남은 이유에 제 판단이 들어갔습니다. 그 책임은 설명하겠습니다 | 공증 절차의 진행 속도에 제 판단이 들어갔습니다. 그 책임은 설명하겠습니다 | 「我的判断介入了公证程序的进度节奏。这份责任，我会说明。」 |
| 제가 유언장에 손을 댄 사실은 부인하지 않겠습니다. 자필 연습본과 공증본의 차이가 그 핵심입니다 | 제가 공증 절차에 손을 댄 사실은 부인하지 않겠습니다. 오후 수정 단계에서 진행을 재촉한 것이 그 핵심입니다 | 「我不会否认自己对公证程序动过手。在下午修订阶段催促了进度，这才是核心。」 |
| 위조 책임이라는 말이 무겁다는 걸 압니다 | 절차 개입 책임이라는 말이 무겁다는 걸 압니다 | 「我知道『程序介入责任』这几个字分量重。」 |

### 自白模板 (special_scripts d-2 + s5RequestionResponses)

| KO (新) | zh-CN 目标 |
|---|---|
| 정후가 오후 수정 공증에서 어머니 상태가 불안정한데도 진행을 재촉했다는 사실을 받아들입니다. 그래도 절차 개입 책임은 남습니다 | 「我接受这一事实：正厚在下午修订公证时，明知母亲状态不稳，仍然催促了进度。即便如此，那份程序介入的责任仍在。」 |
| 공증 오후 수정에서 어머니가 답변을 잇지 못하시는데도 제가 진행을 빨리 끌고 갔습니다. 그 절차에 손댄 책임은 제 몫입니다 | 「在公证下午修订时，母亲已经接不上回答，我却把进度推得更快。对那道程序动手的责任，归我。」 |
| 공증 절차의 흐름에 관해서도 그 범위 안에서만 설명하겠습니다 (s5RequestionResponses 收尾) | 「关于公证程序的脉络，我也只在那一范围内陈述。」 |
| 절차 개입 책임에 관해서도 그 범위 안에서만 설명하겠습니다 | 「关于程序介入的责任，我也只在那一范围内陈述。」 |
| 공증 절차 안에서 진행 순서와 어머니 상태의 흔적이 맞지 않습니다. 그 진행 순서와 제출 단계를 확인해야 합니다 (judge_evidence_combo) | 「公证程序之内，进行顺序与母亲状态的痕迹对不上。必须核实那一进行顺序与提交阶段。」 |
| 절차에 손댄 동기가 통념적 탐욕과 다르더라도 절차 개입 책임은 사라지지 않는다 (dossier note) | 「即便对程序动手的动机不同于通常的贪欲，程序介入的责任也不会消失。」 |
| 공증 절차의 진행 압박과 어머니 상태의 작용은 본인이 인정한 단계에서만 기록한다 (dossier note) | 「公证程序的进度压力和母亲状态的作用，只在当事人承认的阶段进行记录。」 |

### v2-atoms amount-block dominant template

24 amount block 整体替换:

| KO field | KO 新 | zh-CN 目标 |
|---|---|---|
| `exact` | 오전 1차 비율 공란을 오후 수정에서 60대 40으로 확정 | 「上午一次受理时的比例空缺，于下午修订中确定为 60 比 40」 |
| `rounded` | 오전 1차 공란→오후 수정 확정 | 「上午一次空缺→下午修订确定」 |
| `neutral` | (그 비율 keep) | 「那一比例」(keep) |

evidence-block 6 件:

| KO 新 | zh-CN 目标 |
|---|---|
| 공증인 메모 기록과 오전 1차 비율 공란 | 「公证人备忘记录与上午一次受理的比例空缺」 |
| 공증인 메모와 절차 흐름 | 「公证人备忘与程序脉络」 |

### action.exact 字段 — KEEP

`action.exact` = 「유서 비율 변경」(v2-atoms 中 24 次) 是 d-2 surface fact 的标识符，不含亲笔 / 90:10 lexeme。译为稳定的中文标签，如 **「遗嘱比例变更」**，并在 24 次中保持统一。

## d-5 zh-CN 强化 (小)

zh-CN d-5 锚定在 KO 已携带 `e-5` 证据分量的地方需如实呈现。主要位置 (KO 已变更):

- d-5 truthDescription (KO 新): "...어머니가 자필 연습본에 남긴 90:10을 정후가 공증 60:40으로 줄인 것이 그 대표 흔적이다..." — zh-CN 目标: **「...母亲在亲笔草稿中留下的 90:10 被正厚在公证里缩为 60:40，这就是它的代表性痕迹...」**
- d-5 verdictOptions.truth (KO 新): "...자필 연습본 90:10이 공증본 60:40으로 바뀐 흐름이 그 대표 사례다..." — zh-CN 目标: **「...亲笔草稿的 90:10 转为公证本的 60:40 这条脉络，就是其代表例...」**
- d-5 disputes.truth (disclosurePolicy, KO 新): 同 shape — zh-CN 目标 mirror。
- b-d-5-S5-motive-search v6/v7/v10 (scriptedText): KO 「위조 책임」 → 「절차 개입 책임」。zh-CN 目标: 「伪造责任」 → 「程序介入责任」。

KO 侧不携带亲笔 / 90:10 的 d-5 锚定，禁止新增此类提及。

## 范围 — 允许写入的目标

仅 zh-CN sidecar。不得改动 KO 原本、EN / JA sidecar，及 `behaviorHint` (KO 内部字段)。

- `src/data/scriptedText/family-01.zh-CN.json` — 主体
- `src/data/scriptedAngles/family-01_interrogation_answers.zh-CN.json` — 主体
- `src/data/scriptedAngles/family-01_special_scripts.zh-CN.json` — 自白 + s5RequestionResponses + judge_evidence_combo + dossier-note
- `src/data/scriptedAngles/family-01_judge_questions.zh-CN.json` — 仅在 `7ac600a1`→`08be3f25` 触动 KO 锚定时 (用 `git diff` 验证)
- `src/data/scriptedAngles/family-01_angle_catalog.zh-CN.json` — verify
- `src/data/cases/generated/family-01.zh-CN.json` — Phase 1 数据同步
- `src/data/claimPolicies/family-01-structure-v2.zh-CN.json` (如 sidecar 存在)
- `src/data/claimPolicies/family-01-dossier-cards.zh-CN.json` (如 sidecar 存在)
- `src/data/claimPolicies/family-01-v2-atoms.zh-CN.json` (如 sidecar 存在)
- `src/data/claimPolicies/family-01-game-events.zh-CN.json` / `family-01-game-events-v2.zh-CN.json` (如 sidecar 存在)
- `src/data/disclosurePolicy/family-01.json` 的 zh-CN 语言字段 (若四语在同一文件，仅 `disputes.d-2` / `disputes.d-5` / d-2 truthStages / d-5 truthStages 的 zh-CN 部分如 KO 变更已传递到 zh-CN 翻译字段则更新)
- `docs/localization/non-dialogue-extract/truth-leak-matrix.json` zh-CN 区段 — `7ac600a1` 已更新; 仅 verify

不存在或不镜像结构的 sidecar 可跳过 — 用 `Glob` 先确认。

## 工作流程

1. `git fetch && git checkout main && git pull`，确认到达 `08be3f25` 及以上。
2. 按提交列出 KO 差异:
   - Phase 1 数据: `git diff 7ac600a1~1 7ac600a1 -- src/data/cases/generated/family-01.json src/data/claimPolicies/family-01-structure-v2.json src/data/disclosurePolicy/family-01.json docs/localization/non-dialogue-extract/truth-leak-matrix.json`
   - Phase 2-1 confessions: `git diff a856966d~1 a856966d -- src/data/scriptedAngles/family-01_special_scripts.json`
   - Phase 2-2 主 sweep: `git diff e48eeae1~1 e48eeae1 -- src/data/scriptedAngles/family-01_interrogation_answers.json src/data/scriptedAngles/family-01_special_scripts.json src/data/scriptedText/family-01.json`
   - Phase 2-3 claimPolicies: `git diff 08be3f25~1 08be3f25 -- src/data/claimPolicies/family-01-dossier-cards.json src/data/claimPolicies/family-01-game-events.json src/data/claimPolicies/family-01-game-events-v2.json src/data/claimPolicies/family-01-v2-atoms.json`
3. 对每个 KO 变更，定位 zh-CN sidecar 对应 `id` 并按上述映射表改写。重复 KO 模板用单一规范 zh-CN 收尾。保留 `id`, `tags`, 顺序, `behaviorHint`。
4. 数据文件 (Phase 1) 的结构变更 (`requiredEvidence` 等) 仅在 zh-CN sidecar 含该字段时镜像; 否则集中于 `text` / `name` / `truthDescription` / `verdictOptions` 的翻译。
5. 完成前跑全部 validation gates。

## QA / truth-leak 防线

- d-2 锚定 (任何层) 不得含 zh-CN 对应的「亲笔」「90:10」「伪造」「缩减自己份额」「草稿」之类表达。镜像 KO sweep。
- d-5 锚定仅在 KO 侧有时含「亲笔 90:10」「公证 60:40」相关 — 一般在 d-5 stage 2 motive 层之后及 `e-5` 证据呈现。
- d-1 / d-3 / d-4 锚定不得新获「亲笔」「90:10」「伪造」相关; 此前提及草稿的 cross-reference 改为程序文脉 (例如「周边的程序文脉」)。
- `truth-leak-matrix.json` zh-CN 区段: d-2.hidden 为程序集合，d-5.hidden 含亲笔→公证缩减的条目。两者均已在 `7ac600a1` 更新 — 仅 verify。
- **多样性保留 (Tier 2 关键)**: 每条重复 KO 模板对应单一规范 zh-CN 收尾。非 S5 高量桶整体须维持 ≥3 个 opener 锚定 / ≥3 个 closer 锚定 (来自不同 KO 锚定)。

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

`docs/localization/threads/outputs/script-thread-37-zh-cn-family01-e5-reassignment-sync/`

必交:

- `SUMMARY.md` — 触及的文件、按 tier 的 variants 数 (Tier 1 数据 / Tier 2 叙事分离)、叙事转换符合度记录
- `NARRATIVE_SPLIT_AUDIT.md` — 抽 10 个锚定做点检，列出 d-2 锚定已完全去除 亲笔 / 90:10 / 伪造 / 自己份额 之类的语言，以及 d-5 锚定在该处携带 90:10 → 60:40 缩减。
- `VARIATION_AUDIT_SUMMARY.json` — 锚定多样性维持 + 模板均一性
- `TRUTH_BOUNDARY_SUMMARY.json` — d-2 forbidden lexeme 违反数 = 0, d-5 叙事在该处出现
- `GIT_LOG.md` — 最终 commit hash

## worktree 卫生

若 spawn 子 agent，先执行 `git config --global --add safe.directory <worktree>` (memory `feedback_codex_worktree_safe_directory`)。任何子 agent 都不得改动 KO 原本。
