# DiscoveryFeedbackWatcher i18n Extraction Result

Anchor: `dd7eeac1`  
Source request: `docs/localization/discovery-feedback-watcher-i18n-extraction.md`  
Implemented on: `codex/discovery-feedback-i18n`

## Summary

- Extracted `139` `pc.discovery.feedback.*` message keys into `src/i18n/messages/discovery.ts`.
- Added KO / EN / JA / ZH-CN values for every new key, then registered the bundle in `src/i18n/messages/index.ts`.
- Refactored `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx` to use `useI18n()` plus a local quoted-placeholder wrapper over `fixPostpositions(...)` for Korean particle placeholders.
- Swept all user-facing Korean literals in the watcher. Remaining Hangul in that file is limited to comments and behavior-preserving Korean regex checks.

## Runtime Localization Check

- `EventFeedbackCard.tsx` and `PCDialogueLog.tsx` still render queued feedback/dialogue through `localizeRuntimeText(...)`.
- The new watcher strings are already emitted in the active UI locale. `localizeRuntimeText(...)` returns strings without Hangul unchanged; strings containing dynamic Korean names may still pass through existing name/pattern localization, but the i18n template itself is not double-translated.
- KO output remains compatible with runtime localization and uses the local postposition wrapper only on templates that need Korean particle resolution, including quoted `"{name}"이(가)` patterns.
- No runtime localization cleanup patch was needed outside the watcher.

## Verification

- `npx tsc -b --noEmit`: PASS.
- `npm run qa:fast`: PASS, static P0=0 and route P0=0.
- `node scripts/detect-truth-leak.cjs`: PASS as baseline report, family-01 KO 3 findings unchanged.
- `node scripts/detect-truth-leak.cjs --strict`: FAIL on the same family-01 KO 3 baseline findings.
- `npm run qa:lqa`: FAIL in `verify-translations --strict --scan-applied` with existing cumulative baseline counts: placeholder issues 0, empty translation issues 36,960, total issues 60,458. The command does not reach strict truth-leak because the first step exits nonzero.

## Extracted Key Inventory

| Key | KO | EN | JA | ZH-CN |
|---|---|---|---|---|
| `pc.discovery.feedback.fallback.contradictionSurface` | 진술 흐름에서 확인할 지점이 생겼습니다. 추가 질문으로 맥락을 확인하세요. | A point in the statement flow needs review. Ask more questions to check the context. | 供述の流れに確認すべき点あり。追加質問で文脈を確認。 | 陈述流程中出现需要确认的点。通过追加提问确认语境。 |
| `pc.discovery.feedback.fallback.emotionalBurstSurface` | 감정이 격해졌습니다. 반응을 더 밀어붙일지, 잠시 정리할지 판단하세요. | Emotion is running high. Decide whether to press further or pause and reset. | 感情が高ぶっている。さらに押すか、一度整理するか判断。 | 情绪正在升高。判断是继续施压，还是暂时整理。 |
| `pc.discovery.feedback.route.evidence` | 증거로 새 쟁점이 드러났습니다. | Evidence has revealed a new issue. | 証拠から新たな争点が明らかに。 | 证据揭示了新的争议点。 |
| `pc.discovery.feedback.route.truthConfrontation` | 진실 공방에서 새 쟁점이 튀어나왔습니다. | A truth confrontation has pushed out a new issue. | 真相の攻防から新たな争点が浮上。 | 真相交锋中冒出了新的争议点。 |
| `pc.discovery.feedback.route.witness` | 증인 진술이 다른 갈래를 열었습니다. | Witness testimony has opened another branch. | 証人供述が別の分岐を開いた。 | 证人陈述打开了另一条分支。 |
| `pc.discovery.feedback.route.lieCollapse` | 거짓 붕괴로 숨은 쟁점이 드러났습니다. | A lie collapse has revealed a hidden issue. | 嘘の崩れから隠れた争点が明らかに。 | 谎言崩塌揭示了隐藏争议点。 |
| `pc.discovery.feedback.route.emotionalSlip` | 감정 반응에서 확인할 단서가 생겼습니다. | An emotional reaction has exposed a lead to check. | 感情反応から確認すべき手がかりが発生。 | 情绪反应暴露了需要确认的线索。 |
| `pc.discovery.feedback.route.interjection` | 끼어든 발언이 새 쟁점을 열었습니다. | An interjection has opened a new issue. | 割り込み発言が新たな争点を開いた。 | 插话打开了新的争议点。 |
| `pc.discovery.feedback.route.default` | 새 단서가 갈래를 바꿨습니다. | A new lead has shifted the path. | 新たな手がかりで流れが変化。 | 新线索改变了走向。 |
| `pc.discovery.feedback.judgment.believeParty` | {party}의 주장이 더 설득력 있습니다 | {party}'s claim is more convincing | {party}側の主張のほうが説得力あり | {party}一方的主张更有说服力 |
| `pc.discovery.feedback.judgment.bothPartial` | 양쪽 모두 일부만 사실입니다 | Both sides are only partly true | 双方とも一部のみ事実 | 双方都只有部分属实 |
| `pc.discovery.feedback.judgment.undetermined` | 지금은 보류 (나중에 다시 판단) | Defer for now (judge later) | 今は保留（後で再判断） | 暂时保留（稍后再判断） |
| `pc.discovery.feedback.dispute.weight.high` | 높음 | High | 高 | 高 |
| `pc.discovery.feedback.dispute.weight.medium` | 보통 | Medium | 中 | 中 |
| `pc.discovery.feedback.dispute.weight.low` | 낮음 | Low | 低 | 低 |
| `pc.discovery.feedback.dispute.ambiguity.high` | 높음 | High | 高 | 高 |
| `pc.discovery.feedback.dispute.ambiguity.medium` | 보통 | Medium | 中 | 中 |
| `pc.discovery.feedback.dispute.ambiguity.mid` | 보통 | Medium | 中 | 中 |
| `pc.discovery.feedback.dispute.ambiguity.low` | 낮음 | Low | 低 | 低 |
| `pc.discovery.feedback.dispute.ambiguity.none` | 낮음 | Low | 低 | 低 |
| `pc.discovery.feedback.dispute.defaultName` | 새 쟁점 | New issue | 新たな争点 | 新争议点 |
| `pc.discovery.feedback.dispute.privateWithdrawalSummary` | 목돈 출금 흔적과 설명되지 않은 사용처를 확인해야 합니다. | Review the large withdrawal trace and the unexplained use of funds. | まとまった出金の痕跡と説明されていない使途を確認。 | 需要确认大额取款痕迹和未说明的用途。 |
| `pc.discovery.feedback.dispute.evidenceText.withCount` | 관련 증거 {count}개와 증인/발언을 대조해 사실관계를 확정합니다. | Compare {count} related evidence items with witness and statement records to confirm the facts. | 関連証拠{count}件と証人／発言を照合し、事実関係を確定。 | 将 {count} 个相关证据与证人/发言对照，确认事实关系。 |
| `pc.discovery.feedback.dispute.evidenceText.fallback` | 양측 진술과 새로 나온 단서를 대조해 사실관계를 확정합니다. | Compare both statements with the new clues to confirm the facts. | 双方の供述と新たな手がかりを照合し、事実関係を確定。 | 将双方陈述与新线索对照，确认事实关系。 |
| `pc.discovery.feedback.dispute.legalText.withIssue` | 절차상 책임이나 위법성도 별도 판단해야 합니다. | Procedural responsibility or illegality must also be judged separately. | 手続上の責任や違法性も別途判断が必要。 | 程序责任或违法性也需要另行判断。 |
| `pc.discovery.feedback.dispute.legalText.fallback` | 현재 단계에서는 결론이 아니라 검토 범위만 추가됩니다. | At this stage, this only adds review scope, not a conclusion. | 現段階では結論ではなく、検討範囲のみ追加。 | 当前阶段不是结论，只是追加审查范围。 |
| `pc.discovery.feedback.dispute.block.axisTitle` | 검토 축 | Review Axis | 検討軸 | 审查轴 |
| `pc.discovery.feedback.dispute.block.axisText` | {axis}을(를) 중심으로 양측 설명이 어디서 갈라지는지 확인합니다. | Check where both explanations diverge around {axis}. | {axis}を中心に、双方の説明がどこで分かれるか確認。 | 围绕{axis}确认双方说明从何处分岔。 |
| `pc.discovery.feedback.dispute.block.confirmDirection` | 확인 방향 | Check Direction | 確認方向 | 确认方向 |
| `pc.discovery.feedback.dispute.block.procedureResponsibility` | 절차 책임 | Procedural Responsibility | 手続責任 | 程序责任 |
| `pc.discovery.feedback.dispute.block.judgmentStatus` | 판단 상태 | Judgment Status | 判断状態 | 判断状态 |
| `pc.discovery.feedback.dispute.meta.weight` | 중요도: {weight} | Importance: {weight} | 重要度: {weight} | 重要度：{weight} |
| `pc.discovery.feedback.dispute.meta.ambiguity` | 모호성: {ambiguity} | Ambiguity: {ambiguity} | 曖昧さ: {ambiguity} | 模糊度：{ambiguity} |
| `pc.discovery.feedback.dispute.meta.requiredEvidence` | 필요 증거: {count}개 | Required evidence: {count} | 必要証拠: {count}件 | 所需证据：{count}个 |
| `pc.discovery.feedback.dispute.body.withRoute` | {route} 이제 "{name}"을(를) 별도 쟁점으로 추적합니다. | {route} Now track "{name}" as a separate issue. | {route} これから「{name}」を別争点として追跡。 | {route} 现在将“{name}”作为单独争议点追踪。 |
| `pc.discovery.feedback.dispute.body.added` | "{name}"이(가) 별도 쟁점으로 추가되었습니다. | "{name}" has been added as a separate issue. | 「{name}」が別争点として追加された。 | “{name}”已作为单独争议点追加。 |
| `pc.discovery.feedback.outburst.followUp.press.hasLine` | 알겠습니다. 더 돌려 말하지 않겠습니다. 숨긴 이유와 제가 한 행동을 이어서 말씀드리겠습니다. | Understood. I will not talk around it anymore. I will explain why I hid it and what I did. | 分かりました。もう遠回しには言いません。隠した理由と自分の行動を続けて話します。 | 我明白。不再绕着说了。我会继续说明隐瞒的原因和我做过的事。 |
| `pc.discovery.feedback.outburst.followUp.press.noLine` | 말씀드리겠습니다. 감정이 앞섰지만, 피하지 않고 사실관계를 이어서 말하겠습니다. | I will explain. Emotion got ahead of me, but I will keep stating the facts instead of avoiding them. | 話します。感情が先に出ましたが、避けずに事実関係を続けて話します。 | 我会说。虽然情绪先上来了，但我不会回避，会继续说明事实关系。 |
| `pc.discovery.feedback.outburst.followUp.calm.hasLine` | 네. 흥분해서 앞뒤가 흐려졌습니다. 사실관계부터 다시 정리하겠습니다. | Yes. I was agitated and lost the sequence. I will sort out the facts first. | はい。興奮して前後が曖昧になりました。事実関係から整理し直します。 | 是。我刚才太激动，前后有些混乱。我先从事实关系重新整理。 |
| `pc.discovery.feedback.outburst.followUp.calm.noLine` | 네. 잠시 정리하겠습니다. 제가 아는 사실부터 차례대로 말하겠습니다. | Yes. I will take a moment and explain the facts I know in order. | はい。少し整理します。私が知っている事実から順に話します。 | 是。我先整理一下。从我知道的事实开始按顺序说。 |
| `pc.discovery.feedback.contradiction.fallbackLine.s3` | ...그건... 상황이 복잡했습니다. 제가 처음에 말씀드린 것과 다른 부분이 있었습니다. | ...That was... complicated. Some of what I said at first was different. | ...それは...状況が複雑でした。最初に話したことと違う部分がありました。 | ……那件事……情况很复杂。我最开始说的内容里确实有不同的部分。 |
| `pc.discovery.feedback.contradiction.fallbackLine.s2` | 재판관님, 제 기억이 혼란스러웠던 것 같습니다. 다시 정리하겠습니다. | Your Honor, I think my memory was confused. I will restate it. | 裁判官、私の記憶が混乱していたようです。整理し直します。 | 法官，我的记忆可能有些混乱。我重新整理一下。 |
| `pc.discovery.feedback.contradiction.fallbackLine.s0` | 그건... 제가 말한 것과 다르지 않습니다. 맥락이 다른 것입니다. | That is... not different from what I said. The context is different. | それは...私が言ったことと違いません。文脈が違うだけです。 | 那件事……和我说过的并不矛盾。只是语境不同。 |
| `pc.discovery.feedback.confrontation.observationTitle` | 진실 공방이 열렸다. 양측 주장을 비교해 판결을 내려야 한다. | Truth confrontation opened. Compare both claims and make a judgment. | 真相の攻防が開始。双方の主張を比較し、判断が必要。 | 真相交锋已开启。需要比较双方主张并作出判断。 |
| `pc.discovery.feedback.confrontation.notebookTitle` | 진실 공방 - {dispute} | Truth Confrontation - {dispute} | 真相の攻防 - {dispute} | 真相交锋 - {dispute} |
| `pc.discovery.feedback.confrontation.eyebrow` | 진실 공방 | Truth Confrontation | 真相の攻防 | 真相交锋 |
| `pc.discovery.feedback.conflict.left.default` | 기존 판단 | Current Judgment | 既存判断 | 既有判断 |
| `pc.discovery.feedback.conflict.left.partyClaim` | 기존 판단 · {party} 쪽 주장 | Current Judgment · {party}'s side | 既存判断 · {party}側の主張 | 既有判断 · {party}一方主张 |
| `pc.discovery.feedback.conflict.left.partyConviction` | {party}의 주장에 설득력을 두었습니다. | {party}'s claim was treated as convincing. | {party}側の主張に説得力を置いた。 | 已将{party}的主张视为更有说服力。 |
| `pc.discovery.feedback.conflict.left.bothPartialLabel` | 기존 판단 · 양측 일부 사실 | Current Judgment · Both partly true | 既存判断 · 双方一部事実 | 既有判断 · 双方部分属实 |
| `pc.discovery.feedback.conflict.left.bothPartialText` | 양측 주장에 각자 맞는 부분과 과장이 섞여 있다고 보았습니다. | Both claims seemed to mix valid points with exaggeration. | 双方の主張に、それぞれ合う部分と誇張が混ざっていると見た。 | 判断双方主张中各有相符部分，也夹杂夸张。 |
| `pc.discovery.feedback.conflict.left.deferredLabel` | 기존 판단 · 보류 | Current Judgment · Deferred | 既存判断 · 保留 | 既有判断 · 保留 |
| `pc.discovery.feedback.conflict.left.deferredText` | 추가 자료가 더 필요하다고 보았습니다. | More material seemed necessary. | 追加資料がさらに必要と見た。 | 判断仍需要更多资料。 |
| `pc.discovery.feedback.conflict.observationTitle` | 기존 판단과 새 정보가 충돌하고 있다. | The current judgment conflicts with new information. | 既存判断と新情報が衝突中。 | 既有判断与新信息正在冲突。 |
| `pc.discovery.feedback.conflict.notebookTitle` | 판단 충돌 - {dispute} | Judgment Conflict - {dispute} | 判断衝突 - {dispute} | 判断冲突 - {dispute} |
| `pc.discovery.feedback.conflict.notebookNewInfo` | 새 정보: {info} | New info: {info} | 新情報: {info} | 新信息：{info} |
| `pc.discovery.feedback.conflict.eyebrow` | 판단 충돌 | Judgment Conflict | 判断衝突 | 判断冲突 |
| `pc.discovery.feedback.conflict.vs` | VS | VS | VS | VS |
| `pc.discovery.feedback.conflict.newInfoLabel` | 새 충돌 정보 | New Conflict Info | 新たな衝突情報 | 新冲突信息 |
| `pc.discovery.feedback.conflict.action.keepCurrent` | 현재 판단 유지 | Keep Current Judgment | 現在の判断を維持 | 维持当前判断 |
| `pc.discovery.feedback.conflict.action.revise` | 새 정보 기준으로 수정 | Revise by New Info | 新情報基準で修正 | 按新信息修正 |
| `pc.discovery.feedback.viewShift.hookA` | 사건이 완전히 다르게 보인다 | The case looks completely different | 事件がまったく違って見える | 案件看起来完全不同了 |
| `pc.discovery.feedback.viewShift.hookB` | 어디서부터 어긋났을까 | Where did it start to go wrong? | どこから食い違ったのか | 究竟从哪里开始错位？ |
| `pc.discovery.feedback.emergence.bigType` | 새로운 쟁점 | New Issue | 新たな争点 | 新争议点 |
| `pc.discovery.feedback.emergence.eyebrow` | 새 쟁점 발견 | New Issue Found | 新争点発見 | 发现新争议点 |
| `pc.discovery.feedback.emergence.subtitleChain` | "{sourceName}"을(를) 확인하는 과정에서 다른 쟁점이 보입니다 | Another issue is emerging while checking "{sourceName}" | 「{sourceName}」を確認する過程で別の争点が見える | 确认“{sourceName}”的过程中，看到了其他争议点 |
| `pc.discovery.feedback.emergence.subtitleFallback` | 확인해야 할 범위가 넓어졌습니다 | The scope to check has expanded | 確認すべき範囲が広がった | 需要确认的范围扩大了 |
| `pc.discovery.feedback.emergence.bodyChain` | "{sourceName}" 쟁점을 확인하는 과정에서 "{disputeName}"이(가) 새 쟁점으로 떠올랐습니다. 아직 결론은 아닙니다. 관련 기록과 진술을 더 확인한 뒤, 쟁점으로 다룰지 판단해주세요. | While checking the "{sourceName}" issue, "{disputeName}" surfaced as a new issue. This is not a conclusion yet. Check the related records and statements, then decide whether to treat it as an issue. | 「{sourceName}」争点を確認する過程で、「{disputeName}」が新たな争点として浮上。まだ結論ではない。関連記録と供述をさらに確認し、争点として扱うか判断。 | 确认“{sourceName}”争议点的过程中，“{disputeName}”浮现为新的争议点。这还不是结论。请继续确认相关记录和陈述，再判断是否作为争议点处理。 |
| `pc.discovery.feedback.emergence.bodyFallback` | 아직 결론은 아닙니다. 관련 기록과 진술을 더 확인한 뒤, 쟁점으로 다룰지 판단해주세요. | This is not a conclusion yet. Check the related records and statements, then decide whether to treat it as an issue. | まだ結論ではない。関連記録と供述をさらに確認し、争点として扱うか判断。 | 这还不是结论。请继续确认相关记录和陈述，再判断是否作为争议点处理。 |
| `pc.discovery.feedback.emergence.tag` | 쟁점 보드 갱신 | Issue Board Updated | 争点ボード更新 | 争议点看板已更新 |
| `pc.discovery.feedback.emergence.sysMsgChain` | "{sourceName}"을(를) 확인하는 과정에서 새 쟁점이 드러났다 - {disputeName} | A new issue surfaced while checking "{sourceName}" - {disputeName} | 「{sourceName}」を確認する過程で新たな争点が浮上 - {disputeName} | 确认“{sourceName}”的过程中浮现了新的争议点 - {disputeName} |
| `pc.discovery.feedback.emergence.sysMsgFallback` | 새 쟁점이 드러났다 — {disputeName} | A new issue surfaced — {disputeName} | 新たな争点が浮上 — {disputeName} | 浮现了新的争议点 — {disputeName} |
| `pc.discovery.feedback.emergence.notebookTitle` | 새 쟁점 - {dispute} | New Issue - {dispute} | 新争点 - {dispute} | 新争议点 - {dispute} |
| `pc.discovery.feedback.emergence.tagWithJudge` | 쟁점 보드 + 재판관 수첩 | Issue Board + Judge Notes | 争点ボード + 裁判官メモ | 争议点看板 + 法官手册 |
| `pc.discovery.feedback.emergence.action.confirm` | 확인했습니다 | Confirmed | 確認済み | 已确认 |
| `pc.discovery.feedback.emergence.hookFallback.withName` | …사실, {disputeName} 건도 함께 봐주셔야 합니다. | ...Actually, you also need to look at {disputeName}. | …実は、{disputeName}の件も一緒に見ていただく必要があります。 | ……其实，{disputeName}那件事也需要一起看看。 |
| `pc.discovery.feedback.emergence.hookFallback.generic` | …사실, 그것만이 아니었습니다. | ...Actually, that was not all. | …実は、それだけではありませんでした。 | ……其实，不只是那样。 |
| `pc.discovery.feedback.emergence.hookFallback.behaviorHint` | 시선이 흔들리며 잠시 멈춘다. | Their eyes waver, then they pause. | 視線が揺れ、少し止まる。 | 视线动摇，短暂停住。 |
| `pc.discovery.feedback.emotionMistake.meta.sourceDispute` | 관련 쟁점: {dispute} | Related issue: {dispute} | 関連争点: {dispute} | 相关争议点：{dispute} |
| `pc.discovery.feedback.emotionMistake.meta.linkedDispute` | 연결 쟁점: {dispute} | Linked issue: {dispute} | 連結争点: {dispute} | 关联争议点：{dispute} |
| `pc.discovery.feedback.emotionMistake.summary` | {party} · 감정 실수 포착 | {party} · Emotional Slip Caught | {party} · 感情ミス捕捉 | {party} · 捕捉到情绪失误 |
| `pc.discovery.feedback.emotionMistake.eyebrow` | 감정 실수 포착 | Emotional Slip Caught | 感情ミス捕捉 | 捕捉到情绪失误 |
| `pc.discovery.feedback.action.skip` | 지금은 넘긴다 | Skip for Now | 今は見送る | 暂时跳过 |
| `pc.discovery.feedback.emotionMistake.action.record` | 관찰에 기록 | Record Observation | 観察に記録 | 记录到观察 |
| `pc.discovery.feedback.contradiction.effect.lieStage` | 거짓말 단계 {before} → {after} | Lie stage {before} → {after} | 嘘段階 {before} → {after} | 谎言阶段 {before} → {after} |
| `pc.discovery.feedback.contradiction.effect.emotion` | 감정 {delta} | Emotion {delta} | 感情 {delta} | 情绪 {delta} |
| `pc.discovery.feedback.contradiction.judgeQuestion.withEvent` | {party} 씨, 아까 하신 말씀과 지금 말씀이 다릅니다. 어느 쪽이 맞습니까? | {party}, what you said earlier conflicts with what you are saying now. Which is correct? | {party}さん、先ほどの話と今の話が違います。どちらが正しいですか。 | {party}，你刚才说的话和现在说的不一致。哪一边是准确的？ |
| `pc.discovery.feedback.contradiction.judgeQuestion.fallback` | {party} 씨, 방금 답변이 앞선 진술과 맞지 않습니다. 정확히 말씀해 주십시오. | {party}, that answer does not match your earlier statement. State it accurately. | {party}さん、今の答えは先の供述と合いません。正確に話してください。 | {party}，刚才的回答与此前陈述不一致。请准确说明。 |
| `pc.discovery.feedback.contradiction.result.critical` | 결정적 모순이 드러났다. {party}의 방어가 크게 흔들린다. | A decisive contradiction surfaced. {party}'s defense is badly shaken. | 決定的な矛盾が露呈。{party}の防御が大きく揺らぐ。 | 决定性矛盾暴露。{party}的防线大幅动摇。 |
| `pc.discovery.feedback.contradiction.result.standard` | 진술이 엇갈리기 시작했다. 지금 압박하면 효과적이다. | Statements are beginning to diverge. Pressing now will be effective. | 供述が食い違い始めた。今押せば効果的。 | 陈述开始错位。现在施压会有效。 |
| `pc.discovery.feedback.contradiction.result.summary` | {party} · 모순 추궁 결과 | {party} · Contradiction Pressure Result | {party} · 矛盾追及結果 | {party} · 矛盾追问结果 |
| `pc.discovery.feedback.contradiction.success` | 💥 모순 추궁이 통했습니다 — {effects} | 💥 Contradiction pressure worked — {effects} | 💥 矛盾追及が効いた — {effects} | 💥 矛盾追问奏效 — {effects} |
| `pc.discovery.feedback.contradiction.blocked` | 🔒 {party}이(가) 모순 추궁의 충격으로 답변을 거부합니다. (2턴간 질문 불가) | 🔒 {party} refuses to answer under the shock of contradiction pressure. (Cannot question for 2 turns) | 🔒 {party}は矛盾追及の衝撃で返答を拒否。（2ターン質問不可） | 🔒 {party}受到矛盾追问冲击，拒绝回答。（2回合内不可提问） |
| `pc.discovery.feedback.contradiction.previousLabel` | 이전 진술 | Previous Statement | 以前の供述 | 此前陈述 |
| `pc.discovery.feedback.contradiction.currentLabel` | 지금 진술 | Current Statement | 現在の供述 | 当前陈述 |
| `pc.discovery.feedback.contradiction.safeFallbackBody` | {party}의 진술 흐름에서 어긋남이 감지되었습니다. 모순을 찌르면 다음 단서가 열릴 수 있습니다. | {party}'s statement flow shows a mismatch. Pressing the contradiction may open the next clue. | {party}の供述の流れに食い違いを感知。矛盾を突けば次の手がかりが開く可能性あり。 | {party}的陈述流程中检测到错位。指出矛盾可能打开下一条线索。 |
| `pc.discovery.feedback.contradiction.observationTitle` | 이전 진술과 지금 진술이 어긋난다. 모순을 찌를 기회다. | Previous and current statements conflict. This is a chance to press the contradiction. | 以前の供述と現在の供述が食い違う。矛盾を突く機会。 | 此前陈述与当前陈述相互错位。这是指出矛盾的机会。 |
| `pc.discovery.feedback.contradiction.sysMsg` | 진술이 엇갈렸다 — {party} · {dispute} | Statements diverged — {party} · {dispute} | 供述が食い違った — {party} · {dispute} | 陈述发生错位 — {party} · {dispute} |
| `pc.discovery.feedback.contradiction.eyebrow` | 모순 발견 | Contradiction Found | 矛盾発見 | 发现矛盾 |
| `pc.discovery.feedback.contradiction.reasonLabel` | 왜 어긋나는지 | Why It Conflicts | 食い違う理由 | 错位原因 |
| `pc.discovery.feedback.contradiction.action.pointOut` | 모순을 찌른다 | Press the Contradiction | 矛盾を突く | 指出矛盾 |
| `pc.discovery.feedback.interject.fallback.major` | 재판관님, 잠깐만요. 저도 할 말이 있습니다. | Your Honor, wait. I have something to say too. | 裁判官、少し待ってください。私にも言うことがあります。 | 法官，请等一下。我也有话要说。 |
| `pc.discovery.feedback.interject.fallback.minor` | 재판관님, 지금 하신 말씀은 사실과 다릅니다. | Your Honor, what was just said is not true. | 裁判官、今の話は事実と違います。 | 法官，刚才说的内容与事实不符。 |
| `pc.discovery.feedback.judge.allowSpeak` | 발언을 허용합니다. | Permission to speak granted. | 発言を許可します。 | 允许发言。 |
| `pc.discovery.feedback.judge.rejectInterject` | {party} 씨, 지금은 발언 순서가 아닙니다. 심문을 계속합니다. | {party}, this is not your turn to speak. The questioning continues. | {party}さん、今は発言順ではありません。尋問を続けます。 | {party}，现在还不是你的发言顺序。审讯继续。 |
| `pc.discovery.feedback.interject.sysMsg` | {party}이(가) 끼어들려 한다 — {dispute} | {party} tries to interject — {dispute} | {party}が割り込もうとしている — {dispute} | {party}试图插话 — {dispute} |
| `pc.discovery.feedback.interject.eyebrow` | 끼어들기 | Interjection | 割り込み | 插话 |
| `pc.discovery.feedback.interject.action.block` | 제지한다 | Stop Them | 制止 | 制止 |
| `pc.discovery.feedback.interject.action.allow` | 허용한다 | Allow | 許可 | 允许 |
| `pc.discovery.feedback.outburst.lieJump` | 감정이 격해지며 더 솔직한 진술이 나왔다 - {dispute} 단계 {before} → {after} | Emotion surged and a more candid statement came out - {dispute} stage {before} → {after} | 感情が高ぶり、より率直な供述が出た - {dispute} 段階 {before} → {after} | 情绪升高，出现更坦率的陈述 - {dispute} 阶段 {before} → {after} |
| `pc.discovery.feedback.outburst.pressJudge` | 계속 말해보세요. 지금의 흐름을 더 확인하겠습니다. | Keep going. I will check this flow further. | 続けて話してください。今の流れをさらに確認します。 | 继续说。我会进一步确认现在的走向。 |
| `pc.discovery.feedback.outburst.calmJudge` | 잠시 진정하고, 사실만 다시 정리해 주세요. | Calm down for a moment and restate only the facts. | いったん落ち着いて、事実だけを整理し直してください。 | 先冷静一下，只重新整理事实。 |
| `pc.discovery.feedback.outburst.pressObservationTitle` | 격앙 상태가 이어지고 있다. 사실 추궁과 동기 탐색이 더 강하게 작용할 수 있다. | The agitated state continues. Fact pressure and motive probing may work more strongly. | 激昂状態が継続。事実追及と動機探索がより強く作用する可能性。 | 激动状态仍在持续。事实追问和动机探索可能更强烈地发挥作用。 |
| `pc.discovery.feedback.outburst.calmObservationTitle` | 감정이 가라앉고 있다. 공감 접근으로 다시 사실관계를 정리하기 좋은 흐름이다. | Emotion is settling. An empathetic approach can help reorganize the facts. | 感情が落ち着きつつある。共感的接近で事実関係を整理しやすい流れ。 | 情绪正在回落。共情式接近更适合重新整理事实关系。 |
| `pc.discovery.feedback.outburst.summary` | {party} · 감정 폭발 | {party} · Emotional Outburst | {party} · 感情爆発 | {party} · 情绪爆发 |
| `pc.discovery.feedback.outburst.eyebrow` | 감정 폭발 | Emotional Outburst | 感情爆発 | 情绪爆发 |
| `pc.discovery.feedback.outburst.title` | {party}의 감정이 격해졌습니다 | {party}'s emotion is running high | {party}の感情が高ぶっている | {party}的情绪正在升高 |
| `pc.discovery.feedback.outburst.action.calm` | 진정시킨다 | Calm Them | 落ち着かせる | 让其冷静 |
| `pc.discovery.feedback.outburst.action.press` | 밀어붙인다 | Press Further | 押し切る | 继续施压 |
| `pc.discovery.feedback.perk.penalty.observationTitle` | 증거 제시가 충분히 먹히지 않았다. 완충 스킬을 쓸 수 있다. | The evidence presentation did not land enough. A buffer skill is available. | 証拠提示が十分に効かなかった。緩衝スキルを使用可能。 | 证据出示效果不足。可以使用缓冲技能。 |
| `pc.discovery.feedback.perk.penalty.summary` | {evidence} · 판결 완충 | {evidence} · Verdict Buffer | {evidence} · 判決緩衝 | {evidence} · 裁决缓冲 |
| `pc.discovery.feedback.perk.penalty.eyebrow` | 판결 완충 | Verdict Buffer | 判決緩衝 | 裁决缓冲 |
| `pc.discovery.feedback.perk.penalty.body` | 증거 제시가 충분히 먹히지 않았습니다. 완충 스킬로 한 번 수습할 수 있습니다. | The evidence presentation did not land enough. Use the buffer skill to recover once. | 証拠提示が十分に効かなかった。緩衝スキルで一度立て直せる。 | 证据出示效果不足。可以用缓冲技能挽回一次。 |
| `pc.discovery.feedback.perk.penalty.action.withdraw` | 제시를 철회한다 | Withdraw Presentation | 提示を取り下げる | 撤回出示 |
| `pc.discovery.feedback.perk.penalty.dialogue.withdraw` | {evidence} 제시는 취소합니다. 다시 구성해서 제시하세요. | Presentation of {evidence} is canceled. Reframe it before presenting again. | {evidence}の提示は取り消します。構成し直して提示してください。 | 取消出示{evidence}。请重新组织后再出示。 |
| `pc.discovery.feedback.perk.penalty.action.reframe` | 관점을 바꿔 제시한다 | Reframe Presentation | 観点を変えて提示 | 换个角度出示 |
| `pc.discovery.feedback.perk.penalty.dialogue.reframe` | {evidence}의 제시 관점을 조정해 패널티를 줄였습니다. | Adjusted the presentation angle for {evidence} and reduced the penalty. | {evidence}の提示観点を調整し、ペナルティを減らしました。 | 已调整{evidence}的出示角度，降低了惩罚。 |
| `pc.discovery.feedback.perk.fatigue.observationTitle` | 같은 쟁점을 너무 오래 밀었다. 질문 각도를 초기화할 수 있다. | This issue has been pressed too long. The question angle can be reset. | 同じ争点を押しすぎた。質問角度を初期化可能。 | 同一争议点追问过久。可以重置提问角度。 |
| `pc.discovery.feedback.perk.fatigue.eyebrow` | 집요함 추가 | Persistence Added | 粘り強さ追加 | 追加执着 |
| `pc.discovery.feedback.perk.fatigue.body` | 같은 쟁점을 너무 오래 밀었습니다. 스킬을 써서 질문 각도를 초기화할 수 있습니다. | This issue has been pressed too long. Use the skill to reset the question angle. | 同じ争点を押しすぎた。スキルで質問角度を初期化できる。 | 同一争议点追问过久。可以使用技能重置提问角度。 |
| `pc.discovery.feedback.perk.fatigue.action.resetAngle` | 질문 각도 초기화 | Reset Question Angle | 質問角度を初期化 | 重置提问角度 |
| `pc.discovery.feedback.perk.fatigue.dialogue.reset` | {dispute} 쟁점의 질문 피로도를 초기화했습니다. 다른 각도로 다시 밀 수 있습니다. | Reset question fatigue for the {dispute} issue. You can press again from another angle. | {dispute}争点の質問疲労度を初期化しました。別角度から再度押せます。 | 已重置{dispute}争议点的提问疲劳度。可以从其他角度继续推进。 |
| `pc.discovery.feedback.witness.observation.resummon` | {witness}에게 이어 물을 지점이 열렸다. | A follow-up point opened for {witness}. | {witness}に続けて聞く点が開いた。 | 已打开继续询问{witness}的切入点。 |
| `pc.discovery.feedback.witness.observation.first` | {witness}이(가) 증언대에 섰다. | {witness} has taken the witness stand. | {witness}が証言台に立った。 | {witness}站上了证人席。 |
| `pc.discovery.feedback.witness.summary.resummon` | 증인 재심문 | Witness Re-questioning | 証人再尋問 | 证人再询问 |
| `pc.discovery.feedback.witness.summary.first` | 증인 심문 | Witness Questioning | 証人尋問 | 证人询问 |
| `pc.discovery.feedback.witness.eyebrow` | 증인 심문 | Witness Questioning | 証人尋問 | 证人询问 |
| `pc.discovery.feedback.witness.body.resummon` | 앞선 답변을 바탕으로 더 좁혀 물어볼 질문을 선택하세요. | Choose a narrower follow-up question based on the previous answer. | 前の答えを踏まえ、さらに絞って聞く質問を選択。 | 基于此前回答，选择进一步缩窄的问题。 |
| `pc.discovery.feedback.witness.body.first` | 먼저 표면 정황을 확인할 질문을 선택하세요. 답변이 이어질수록 질문이 구체화됩니다. | First choose a question to check the surface circumstances. The questions become more specific as answers continue. | まず表面状況を確認する質問を選択。答えが続くほど質問が具体化。 | 先选择确认表面情况的问题。随着回答继续，问题会逐步具体化。 |
