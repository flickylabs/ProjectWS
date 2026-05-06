# Readability Risks — zh-CN PC UI Translation

Severity scale:
- **P0** — breaks layout, breaks composition, or wrong meaning. Must fix before merge.
- **P1** — works on default 1920×1080 but at risk on Steam Deck (1280×800) or `data-screen-bucket=sm`.
- **P2** — minor polish; native reviewer may want to tweak.

| # | severity | key | zh-CN text | why risky | shorter / better alternative |
| --- | --- | --- | --- | --- | --- |
| 1 | P0 | pc.notes.unseen | （未确认条目 {count} 项） | KR source `(미확인 항목 N개)` is composed inline (prefix + count + suffix). Direct concat in JSX produces `（未确认条目0` because CN closes with `项）` not `개)`. **Refactor required.** | Use full template `pc.notes.unseen = '（未确认条目 {count} 项）'` and pass count via `t(key, { count })`. |
| 2 | P0 | pc.common.moreCount (`외`) | 等 {count} 项 | KR `${count}외 ...` is a count-prefix that does not transfer. Treating `외` as a single key produces broken Chinese. | Refactor every call site that interpolates with the bare `외` literal to call `t('pc.common.moreCount', { count })`. |
| 3 | P0 | pc.home.resolutionConfirm.body | {count} 秒后将自动恢复原分辨率。 | KR `${seconds}초 후 이전 해상도로 돌아갑니다.` puts the count first; the previous draft key only carried the trailing fragment. Without `{count}` the message reads `秒后将自动恢复原分辨率。` (no number). | Already templated above — Codex must update PCHomeScreen.tsx to call `t(key, { count: seconds })`. |
| 4 | P0 | pc.verdictAdvance.modal.body | 当前已揭示的争议点 {revealed} 项，仍有 {hidden} 项未揭示。是否仍要直接进入判决？ | KR composes 3 fragments + counts inline. Word order in CN differs and cannot be reassembled with the KR fragment ordering. | One template carrying both placeholders; replace fragment keys (`bodyHead/bodyMid/bodyTail`) with this single key. |
| 5 | P0 | pc.recordSummary.moreConvincing | 判定 {party} 一方的主张更具说服力。 | KR `{partyName} 측의 주장이 더 설득력 있다고 판단했습니다.` contains `{partyName}`. Without the `{party}` placeholder the sentence reads as a generic "more persuasive" with no subject. | Keep `{party}` placeholder; Codex must wire the partyName through. |
| 6 | P1 | pc.actions.interrogation.subtitle | 基于当前争议点控制提问、自由提问与辅助开关。 | 22 chars; on `data-screen-bucket=sm` (1366×768) hotbar subtitle row sometimes ellipsizes. | `控制当前争议点的提问与开关。` (14 chars) |
| 7 | P1 | pc.actions.evidence.subtitle | 在同一处管理证据出示、调查、鉴定与传唤证人。 | 22 chars; same risk as above. | `集中管理证据出示、调查、鉴定与证人传唤。` (~20 chars) |
| 8 | P1 | pc.gameplay.held.body | 虽未直接崩塌，但已具备记录价值。请尝试与其他证据或发言连结后再次推进。 | 33 chars in cut-in modal; sm bucket may force 3 lines and overflow vertical box. | `尚未直接崩塌，但值得记录。可与其他证据或发言连结后再试。` (26 chars) |
| 9 | P1 | pc.gameplay.statementCollapse.body | 对方陈述大幅动摇。现在正适合衔接下一道追问或异议。 | 23 chars; OK on default but tight on sm. | `对方陈述大幅动摇，正适合接下一道追问或异议。` (21 chars) |
| 10 | P1 | pc.gameplay.crackDetected.body | 证据在陈述之间撕开了一道缝。可顺势压向相关争议点。 | 22 chars OK but `撕开了一道缝` may feel literary; some reviewers prefer plainer game UI. | `证据让陈述出现裂缝，可乘势压向相关争议点。` |
| 11 | P1 | pc.session.* description fields | (12 strings) | All session descriptions are 18–24 char single sentences. Card design likely uses fixed height; CN denser than KR so verify wrap behavior on Steam Deck. | n/a — visual QA gate. |
| 12 | P1 | pc.intro.slide1.body | 通过提问、证据与判断串联，分辨彼此不同真相的模拟法庭游戏。 | 27 chars; CN typewriter timing should be re-tuned. CN reads ~1.5× density of KR per character. | n/a — speed knob, not text. |
| 13 | P1 | pc.settings.about.creditsBody | 所罗门的法庭 — 以人类智慧裁决两个 AI 之争的回放推理游戏 | 29 chars in single-row credits block; verify alignment. | Alternative split: `所罗门的法庭` / `以人类智慧裁决两个 AI 之争的回放推理游戏` |
| 14 | P1 | pc.settings.data.resetDescription | 将删除存档槽、案件进度、裁判官倾向、成就与档案，操作不可撤销。 | 30 chars; settings panel description is two-line zone — verify line break. | Could split into 2 sentences for safety. |
| 15 | P2 | pc.home.judgeAxes.verdict.left (엄격) | 严正 | KR source uses `엄격` here but `엄정` for the same trait elsewhere → both folded to 严正 in CN. Visually consistent but loses the slight KR nuance "strict tone". | Optionally render `严格` here to mirror KR exactly; recommend keeping `严正` for cross-screen consistency. |
| 16 | P2 | pc.home.judgeAxes.resolution.right (봉합) | 调和 | Literal 缝合 wrong; 调和 is right. But `调和` is also reused for `화해` (reconciliation) in PCJudgeProgressionShared, so two KR concepts collapse to one CN word. Only matters if both surfaces appear together. | Native review can confirm or split into 弥合 vs 调和. |
| 17 | P2 | pc.emotion.resignation (체념) | 放弃 | `체념` ≈ resigned acceptance; `放弃` = give up. Slight nuance loss. | Consider 默许 or 认命 if hover tooltip shows the meter; 放弃 is acceptable as a 2-char meter label. |
| 18 | P2 | pc.rarity.epic (영웅) | 史诗 | KR literal 영웅 = "hero" but CN gaming convention uses 史诗 for tier 3 (common/rare/epic/legendary). 英雄 would feel off. | Keep 史诗. |
| 19 | P2 | pc.interaction.objection (이의 있습니다.) | 反对！ | Picked Phoenix-Wright dramatic tone. If product wants formal courtroom register, switch to `我提出异议。` | See GLOSSARY_DELTA. |
| 20 | P2 | pc.profile.trait.axis.judgment (심판 축) | 审判轴 | KR source uses `심판 축` here vs `판결(균형)` on home → two KR words for same axis. CN mirrors the inconsistency. | Recommend KR-side fix first. |
| 21 | P2 | pc.term.investigationToken (조사 토큰) | 调查代币 | `代币` reads slightly like a crypto/casino token in modern CN. `调查点数` more game-UI-natural. | Glossary entry currently locks 调查代币; flag for native review. See GLOSSARY_DELTA. |

## Layout summary
- 4 P0 risks (all composition/template refactors). All five (#1–5) are blocking unless Codex applies the templated keys.
- 10 P1 risks centered on hotbar subtitles, lie-state cut-in bodies, and the credits/reset descriptions. Need Steam Deck visual QA pass.
- 7 P2 risks are nuance/glossary items for native reviewer.
