import type { LocaleCode } from './locales.ts'

type GeneratedRuntimeText = Record<Exclude<LocaleCode, 'ko'>, string>

export const GENERATED_RUNTIME_TEXT: Record<string, GeneratedRuntimeText> = {
  "- 1주 뒤, 1개월 뒤, 남은 여파 순으로 전개한다.": {
    en: "- Develop it in this order: one week later, one month later, remaining aftermath.",
    ja: "- 1週間後、1か月後、残された余波の順に展開する。",
    "zh-CN": "- 按照一周后、一个月后、剩余影响的顺序展开。",
  },
  "- 마지막 교훈 문장은 반드시 큰따옴표로 감싼다.": {
    en: "- The final lesson sentence must be enclosed in double quotation marks.",
    ja: "- 最後の教訓文は必ず二重引用符で囲む。",
    "zh-CN": "- 最后的教训句必须用双引号括起来。",
  },
  "- 마지막 문단은 후일담 전체를 관통하는 짧은 교훈이나 명언 같은 한 문장만 쓴다.": {
    en: "- The final paragraph must contain only one short lesson or quote-like sentence that runs through the whole epilogue.",
    ja: "- 最後の段落は、後日談全体を貫く短い教訓または名言のような1文だけにする。",
    "zh-CN": "- 最后一段只能写一句贯穿整个后日谈的简短教训或格言式句子。",
  },
  "- 보고서체가 아니라 소설처럼 자연스럽게 쓴다.": {
    en: "- Write naturally, like fiction, not in a report style.",
    ja: "- 報告書調ではなく、小説のように自然に書く。",
    "zh-CN": "- 不要写成报告体，要像小说一样自然。",
  },
  "- 본문 3개 문단과 마지막 교훈 1문장, 총 4개 문단으로 쓴다.": {
    en: "- Write a total of 4 paragraphs: 3 body paragraphs and a final one-sentence lesson.",
    ja: "- 本文3段落と最後の教訓1文、合計4段落で書く。",
    "zh-CN": "- 全文共 4 段：正文 3 段，最后 1 段为一句教训。",
  },
  "- 본문 각 문단은 2문장 또는 3문장으로 제한한다.": {
    en: "- Limit each body paragraph to 2 or 3 sentences.",
    ja: "- 本文の各段落は2文または3文に制限する。",
    "zh-CN": "- 正文每段限制为 2 句或 3 句。",
  },
  "-12만원": {
    en: "-₩120K",
    ja: "-12万ウォン",
    "zh-CN": "-12万韩元",
  },
  "-15만원": {
    en: "-₩150K",
    ja: "-15万ウォン",
    "zh-CN": "-15万韩元",
  },
  "-30만원": {
    en: "-₩300K",
    ja: "-30万ウォン",
    "zh-CN": "-30万韩元",
  },
  "-38만원": {
    en: "-₩380K",
    ja: "-38万ウォン",
    "zh-CN": "-38万韩元",
  },
  "-45만원": {
    en: "-₩450K",
    ja: "-45万ウォン",
    "zh-CN": "-45万韩元",
  },
  "-7만원": {
    en: "-₩70K",
    ja: "-7万ウォン",
    "zh-CN": "-7万韩元",
  },
  "-8만원": {
    en: "-₩80K",
    ja: "-8万ウォン",
    "zh-CN": "-8万韩元",
  },
  "— 보류": {
    en: "— Deferred",
    ja: "— 保留",
    "zh-CN": "— 保留",
  },
  "— 어떤 쟁점에 대해?": {
    en: "— Which issue?",
    ja: "— どの争点について？",
    "zh-CN": "— 针对哪个争议点？",
  },
  "— 추궁하기": {
    en: "— Press",
    ja: "— 追及する",
    "zh-CN": "— 追问",
  },
  "??? (선행 증거 필요)": {
    en: "??? (prior evidence required)",
    ja: "???（先行証拠が必要）",
    "zh-CN": "???（需要前置证据）",
  },
  "??? 숨겨진 쟁점": {
    en: "??? Hidden Issue",
    ja: "??? 隠れた争点",
    "zh-CN": "??? 隐藏争议点",
  },
  "...그건... 상황이 복잡했습니다. 제가 처음에 말씀드린 것과 다른 부분이 있었습니다.": {
    en: "...That... the situation was complicated. Some parts were different from what I first said.",
    ja: "…それは…状況が複雑でした。最初にお話ししたことと違う部分がありました。",
    "zh-CN": "……那件事……情况很复杂。和我一开始说的有些地方不一样。",
  },
  "…사실, 그것만이 아니었습니다.": {
    en: "...Actually, that was not all.",
    ja: "…実は、それだけではありませんでした。",
    "zh-CN": "……其实，不只是那样。",
  },
  "· 만료:": {
    en: "· Expires:",
    ja: "・期限:",
    "zh-CN": "· 过期：",
  },
  "· 보유": {
    en: "· Owned",
    ja: "・所持",
    "zh-CN": "· 拥有",
  },
  "· 토큰 부족": {
    en: "· not enough tokens",
    ja: "・トークン不足",
    "zh-CN": "· 令牌不足",
  },
  "\" 쟁점에서 교착이 발생했습니다.": {
    en: "\" issue has reached a stalemate.",
    ja: "」の争点で膠着が発生しました。",
    "zh-CN": "”这一争议点陷入僵局。",
  },
  "\" 증거가 효과를 발휘하지 못했습니다.": {
    en: "\" did not take effect as evidence.",
    ja: "」は証拠として効果を発揮しませんでした。",
    "zh-CN": "”未能作为证据发挥效果。",
  },
  "\"그 말, 아까와 다릅니다\" — 사실 추궁": {
    en: "\"That differs from what you said earlier\" — Press for Facts",
    ja: "「その言葉、さっきと違います」— 事実追及",
    "zh-CN": "“这话和刚才不一样” — 事实追问",
  },
  "\"더 숨길 게 있습니까?\" — 정면 추궁": {
    en: "\"Is there anything else you are hiding?\" — Direct Press",
    ja: "「まだ隠していることがありますか？」— 正面追及",
    "zh-CN": "“还有什么要隐瞒的吗？” — 正面追问",
  },
  "\"마지막으로 묻겠습니다\" — 결정적 질문": {
    en: "\"I will ask one last time\" — Decisive Question",
    ja: "「最後にお聞きします」— 決定的質問",
    "zh-CN": "“最后问一次” — 决定性问题",
  },
  "\"사정이 있었겠지요\" — 공감 접근": {
    en: "\"There must have been circumstances\" — Empathy Approach",
    ja: "「事情があったのでしょう」— 共感アプローチ",
    "zh-CN": "“想必是有些情况吧” — 共情接近",
  },
  "\"솔직히 말씀하시지요\" — 자백 유도": {
    en: "\"Please speak honestly\" — Draw a Confession",
    ja: "「正直にお話しください」— 自白誘導",
    "zh-CN": "“请坦白说吧” — 引导自白",
  },
  "\"오늘 좀 큰 결심을 했다. 후회 없이 살자. #새출발\"": {
    en: "\"I made a pretty big decision today. Live with no regrets. #NewStart\"",
    ja: "「今日は少し大きな決心をした。後悔なく生きよう。#新しい出発」",
    "zh-CN": "“今天做了个挺大的决定。活得不留遗憾吧。#重新开始”",
  },
  "\"왜 숨기셨습니까?\" — 동기 탐색": {
    en: "\"Why did you hide it?\" — Motive Probe",
    ja: "「なぜ隠したのですか？」— 動機探索",
    "zh-CN": "“为什么要隐瞒？” — 动机探查",
  },
  "\"이 증거를 보십시오\" — 증거 제시": {
    en: "\"Look at this evidence\" — Present Evidence",
    ja: "「この証拠を見てください」— 証拠提示",
    "zh-CN": "“请看这项证据” — 出示证据",
  },
  "\"이것으로 끝내겠습니다\" — 증거 제시": {
    en: "\"I will end with this\" — Present Evidence",
    ja: "「これで終わりにします」— 証拠提示",
    "zh-CN": "“我就以此作结” — 出示证据",
  },
  "(결과 없음)": {
    en: "(No results)",
    ja: "（結果なし）",
    "zh-CN": "（无结果）",
  },
  "(잔여:": {
    en: "(Remaining:",
    ja: "(残り:",
    "zh-CN": "(剩余:",
  },
  "(진행중)": {
    en: "(In Progress)",
    ja: "（進行中）",
    "zh-CN": "（进行中）",
  },
  "[기재 없음]": {
    en: "[No entry]",
    ja: "［記載なし］",
    "zh-CN": "［未填写］",
  },
  "[비공개 확인권] 재판관 전용 확인 질문 — 솔직한 답변을 받되, 거짓말 상태에 영향을 주지 않습니다.": {
    en: "[Private Check] Judge-only confirmation question — receive an honest answer without affecting lie status.",
    ja: "[非公開確認権] 裁判官専用の確認質問 — 正直な答えを得ますが、嘘の状態には影響しません。",
    "zh-CN": "[不公开确认权] 法官专用确认问题 — 获得坦率回答，但不影响谎言状态。",
  },
  "[비교 보관함] 쟁점 비교:": {
    en: "[Comparison Vault] Issue Comparison:",
    ja: "[比較保管庫] 争点比較:",
    "zh-CN": "[比较保管室] 争议点比较：",
  },
  "[솔로몬] 게임 중 통신 오류 신고": {
    en: "[Solomon] Report an in-game connection error",
    ja: "[ソロモン] ゲーム中の通信エラー報告",
    "zh-CN": "[包青天的抉择] 游戏中通信错误报告",
  },
  "[신뢰의 기반] 관계 완충 질문으로 선제적 신뢰를 확보했습니다.": {
    en: "[Trust Foundation] A relationship-buffering question secured trust in advance.",
    ja: "[信頼の基盤] 関係緩衝の質問で先行して信頼を確保しました。",
    "zh-CN": "[信任基础] 通过关系缓冲问题预先取得了信任。",
  },
  "[EvidenceBoard] evidenceDefinitions 비어있음 — caseData에서 복구": {
    en: "[EvidenceBoard] evidenceDefinitions empty — restored from caseData",
    ja: "[EvidenceBoard] evidenceDefinitions が空 — caseDataから復元",
    "zh-CN": "[EvidenceBoard] evidenceDefinitions 为空 — 已从 caseData 恢复",
  },
  "[EvidencePresenter] evidenceDefinitions 비어있음 — caseData에서 복구": {
    en: "[EvidencePresenter] evidenceDefinitions empty — recovering from caseData",
    ja: "[EvidencePresenter] evidenceDefinitions が空 — caseData から復元",
    "zh-CN": "[EvidencePresenter] evidenceDefinitions 为空 — 从 caseData 恢复",
  },
  "[Solomon] 리뉴얼 데이터 등록 실패 (게임은 계속 진행 가능):": {
    en: "[Solomon] Failed to register renewal data (game can continue):",
    ja: "[Solomon] リニューアルデータの登録に失敗しました（ゲームは続行可能）:",
    "zh-CN": "[Solomon] 续新版数据注册失败（游戏仍可继续）：",
  },
  "[Solomon] 사건에 쟁점이 없습니다:": {
    en: "[Solomon] Case has no issues:",
    ja: "[Solomon] 事件に争点がありません:",
    "zh-CN": "[Solomon] 案件没有争议点：",
  },
  "[Solomon] 프로필 카드 다운로드 실패:": {
    en: "[Solomon] Profile card download failed:",
    ja: "[Solomon] プロフィールカードのダウンロードに失敗しました:",
    "zh-CN": "[Solomon] 个人资料卡下载失败：",
  },
  "{index}번째 영수증 보기": {
    en: "View receipt {index}",
    ja: "{index}枚目のレシートを見る",
    "zh-CN": "查看第 {index} 张收据",
  },
  "{index}쪽": {
    en: "Page {index}",
    ja: "{index}ページ",
    "zh-CN": "第{index}页",
  },
  "{owner}의 휴대폰": {
    en: "{owner}'s Phone",
    ja: "{owner}の携帯電話",
    "zh-CN": "{owner}的手机",
  },
  "{period} / 거래 원장 출력본": {
    en: "{period} / Transaction ledger printout",
    ja: "{period} / 取引元帳出力",
    "zh-CN": "{period} / 交易台账打印件",
  },
  "{total}건 중 {shown}건 표시 / {source} 제출 사본": {
    en: "{total} total, {shown} shown / {source} submission copy",
    ja: "{total}件中{shown}件を表示／{source}提出写し",
    "zh-CN": "显示{total}条中的{shown}条 / {source}提交副本",
  },
  "*각 조각은 재판관 성향 성장 재료로 사용할 수 있습니다.": {
    en: "*Each fragment can be used as growth material for Judge Disposition.",
    ja: "*各フラグメントは裁判官傾向の成長素材として使用できます。",
    "zh-CN": "*各碎片可作为法官倾向成长材料使用。",
  },
  "/3 선택": {
    en: "/3 selected",
    ja: "/3 選択",
    "zh-CN": "/3 已选",
  },
  "#새출발": {
    en: "#NewStart",
    ja: "#新しい出発",
    "zh-CN": "#重新开始",
  },
  "#솔로몬 #법정추리게임": {
    en: "#Solomon #CourtroomMysteryGame",
    ja: "#ソロモン #法廷推理ゲーム",
    "zh-CN": "#所罗门 #法庭推理游戏",
  },
  "#솔로몬 #판결후일담": {
    en: "#Solomon #VerdictEpilogue",
    ja: "#ソロモン #判決後日談",
    "zh-CN": "#所罗门 #裁决后日谈",
  },
  "← 나가기": {
    en: "← Exit",
    ja: "← 終了",
    "zh-CN": "← 退出",
  },
  "← 다른 질문 선택": {
    en: "← Choose Another Question",
    ja: "← 別の質問を選択",
    "zh-CN": "← 选择其他问题",
  },
  "← 뒤로": {
    en: "← Back",
    ja: "← 戻る",
    "zh-CN": "← 返回",
  },
  "← 목록": {
    en: "← List",
    ja: "← 一覧",
    "zh-CN": "← 列表",
  },
  "← 사건 정보 다시 보기": {
    en: "← Review Case Info",
    ja: "← 事件情報を見直す",
    "zh-CN": "← 重新查看案件信息",
  },
  "← 이전": {
    en: "← Previous",
    ja: "← 前へ",
    "zh-CN": "← 上一步",
  },
  "← 이전 프레임": {
    en: "← Previous Frame",
    ja: "← 前のフレーム",
    "zh-CN": "← 上一帧",
  },
  "← 홈": {
    en: "← Home",
    ja: "← ホーム",
    "zh-CN": "← 首页",
  },
  "+1 강화 시 효과": {
    en: "Effect at +1 Enhancement",
    ja: "+1強化時の効果",
    "zh-CN": "+1强化时效果",
  },
  "| 성향 안정화 필요": {
    en: "| Disposition stabilization required",
    ja: "| 傾向安定化が必要",
    "zh-CN": "| 需要稳定倾向",
  },
  "─── 서명: 최민준 ─── 날짜: 2025.09.30 ───": {
    en: "─── Signature: Choi Min-jun ─── Date: 2025.09.30 ───",
    ja: "─── 署名：チェ・ミンジュン ─── 日付：2025.09.30 ───",
    "zh-CN": "─── 签名：崔敏俊 ─── 日期：2025.09.30 ───",
  },
  "▲ 접기": {
    en: "▲ Collapse",
    ja: "▲ 閉じる",
    "zh-CN": "▲ 收起",
  },
  "○ 확인중": {
    en: "○ Checking",
    ja: "○ 確認中",
    "zh-CN": "○ 正在确认",
  },
  "● 연결끊김": {
    en: "● Disconnected",
    ja: "● 接続切断",
    "zh-CN": "● 连接已断开",
  },
  "● AI 미연결": {
    en: "● AI disconnected",
    ja: "● AI未接続",
    "zh-CN": "● AI 未连接",
  },
  "● AI 연결됨": {
    en: "● AI connected",
    ja: "● AI接続済み",
    "zh-CN": "● AI 已连接",
  },
  "⚖️ 권위": {
    en: "⚖️ Authority",
    ja: "⚖️ 権威",
    "zh-CN": "⚖️ 权威",
  },
  "⚖️ 솔로몬": {
    en: "⚖️ Solomon",
    ja: "⚖️ ソロモン",
    "zh-CN": "⚖️ 所罗门",
  },
  "⚖️ 솔로몬의 판결 후일담": {
    en: "⚖️ Solomon Verdict Epilogue",
    ja: "⚖️ ソロモンの判決後日談",
    "zh-CN": "⚖️ 所罗门裁决后日谈",
  },
  "⚠ LLM 미연결 — 하드코딩 대사로 플레이": {
    en: "⚠ LLM not connected — playing with hardcoded dialogue",
    ja: "⚠ LLM未接続 — ハードコード台詞でプレイ",
    "zh-CN": "⚠ LLM 未连接 — 使用硬编码台词游玩",
  },
  "✓ 수령 완료": {
    en: "✓ Claimed",
    ja: "✓ 受領済み",
    "zh-CN": "✓ 已领取",
  },
  "✕ 포기": {
    en: "✕ Give Up",
    ja: "✕ 諦める",
    "zh-CN": "✕ 放弃",
  },
  "🎯 다른 쟁점까지 흔들렸다!": {
    en: "🎯 Another issue was shaken too!",
    ja: "🎯 別の争点まで揺らいだ！",
    "zh-CN": "🎯 其他争议点也被动摇了！",
  },
  "🏅 업적 (": {
    en: "🏅 Achievements (",
    ja: "🏅 実績 (",
    "zh-CN": "🏅 成就 (",
  },
  "💡 새로운 사실이 해금되었습니다. 증거 게시판을 확인하십시오.": {
    en: "💡 New facts have been unlocked. Check the evidence board.",
    ja: "💡 新しい事実が解放されました。証拠掲示板を確認してください。",
    "zh-CN": "💡 新事实已解锁。请查看证据看板。",
  },
  "💡 지혜": {
    en: "💡 Wisdom",
    ja: "💡 知恵",
    "zh-CN": "💡 智慧",
  },
  "💭 쟁점에서 벗어난 질문이다.": {
    en: "💭 This question is off the issue.",
    ja: "💭 争点から外れた質問です。",
    "zh-CN": "💭 这个问题偏离了争议点。",
  },
  "📋 진술 분석 완료 — 탭해서 확인하자.": {
    en: "📋 Statement analysis complete — tap to review.",
    ja: "📋 陳述分析完了 — タップして確認しましょう。",
    "zh-CN": "📋 陈述分析完成 — 点击查看。",
  },
  "📋 진술 분석에 실패했습니다.": {
    en: "📋 Statement analysis failed.",
    ja: "📋 陳述分析に失敗しました。",
    "zh-CN": "📋 陈述分析失败。",
  },
  "📦 일괄 수령": {
    en: "📦 Claim All",
    ja: "📦 一括受領",
    "zh-CN": "📦 一键领取",
  },
  "📬 우편함": {
    en: "📬 Mailbox",
    ja: "📬 郵便箱",
    "zh-CN": "📬 邮箱",
  },
  "🔍 통찰": {
    en: "🔍 Insight",
    ja: "🔍 洞察",
    "zh-CN": "🔍 洞察",
  },
  "🔍 회피 판독 토글 해금": {
    en: "🔍 Evasion Read toggle unlocked",
    ja: "🔍 回避判読トグル解放",
    "zh-CN": "🔍 回避判读开关已解锁",
  },
  "🔒 비공개 보호 토글 해금": {
    en: "🔒 Private Protection toggle unlocked",
    ja: "🔒 非公開保護トグル解放",
    "zh-CN": "🔒 非公开保护开关已解锁",
  },
  "01 결과 확인": {
    en: "01 Results",
    ja: "01 結果確認",
    "zh-CN": "01 查看结果",
  },
  "02 판결 선고": {
    en: "02 Verdict",
    ja: "02 判決言渡し",
    "zh-CN": "02 宣读裁决",
  },
  "03 후일담": {
    en: "03 Epilogue",
    ja: "03 後日談",
    "zh-CN": "03 后日谈",
  },
  "04 보너스": {
    en: "04 Bonus",
    ja: "04 ボーナス",
    "zh-CN": "04 奖励",
  },
  "0분 42초": {
    en: "0m 42s",
    ja: "0分42秒",
    "zh-CN": "0分42秒",
  },
  "① 사실 인정": {
    en: "① Fact Finding",
    ja: "① 事実認定",
    "zh-CN": "① 事实认定",
  },
  "100% 클리어율로 사건을 마쳤습니다.": {
    en: "Finished the case with a 100% completion rate.",
    ja: "100%達成率で事件を終えました。",
    "zh-CN": "以100%完成率结束案件。",
  },
  "10턴 이내에 판결했습니다.": {
    en: "Delivered a verdict within 10 turns.",
    ja: "10ターン以内に判決しました。",
    "zh-CN": "在10回合内作出裁决。",
  },
  "11분 02초": {
    en: "11m 02s",
    ja: "11分02秒",
    "zh-CN": "11分02秒",
  },
  "133만": {
    en: "₩1.33M",
    ja: "133万ウォン",
    "zh-CN": "133万韩元",
  },
  "13만": {
    en: "₩130K",
    ja: "13万ウォン",
    "zh-CN": "13万韩元",
  },
  "163만": {
    en: "₩1.63M",
    ja: "163万ウォン",
    "zh-CN": "163万韩元",
  },
  "178만": {
    en: "₩1.78M",
    ja: "178万ウォン",
    "zh-CN": "178万韩元",
  },
  "190만": {
    en: "₩1.9M",
    ja: "190万ウォン",
    "zh-CN": "190万韩元",
  },
  "1개 획득": {
    en: "Get 1",
    ja: "1個獲得",
    "zh-CN": "获得1个",
  },
  "1분 05초": {
    en: "1m 05s",
    ja: "1分05秒",
    "zh-CN": "1分05秒",
  },
  "② 책임 배분": {
    en: "② Responsibility Allocation",
    ja: "② 責任配分",
    "zh-CN": "② 责任分配",
  },
  "2~8자, 리더보드에 표시됩니다.": {
    en: "2–8 characters, shown on the leaderboard.",
    ja: "2〜8文字。リーダーボードに表示されます。",
    "zh-CN": "2～8个字符，将显示在排行榜上。",
  },
  "2025년 9월": {
    en: "September 2025",
    ja: "2025年9月",
    "zh-CN": "2025年9月",
  },
  "22:10 LTE 전환": {
    en: "22:10 Switched to LTE",
    ja: "22:10 LTEへ切替",
    "zh-CN": "22:10 切换至LTE",
  },
  "22:14 뱅킹앱 실행": {
    en: "22:14 Banking app opened",
    ja: "22:14 銀行アプリ起動",
    "zh-CN": "22:14 打开银行App",
  },
  "22:19 뱅킹앱 종료": {
    en: "22:19 Banking app closed",
    ja: "22:19 銀行アプリ終了",
    "zh-CN": "22:19 关闭银行App",
  },
  "22:20 메신저 실행": {
    en: "22:20 Messenger opened",
    ja: "22:20 メッセンジャー起動",
    "zh-CN": "22:20 打开聊天软件",
  },
  "22:25 Wi-Fi 복귀 (자택)": {
    en: "22:25 Returned to Wi-Fi (home)",
    ja: "22:25 Wi-Fi復帰（自宅）",
    "zh-CN": "22:25 恢复Wi-Fi（家中）",
  },
  "22:35 갤러리 실행": {
    en: "22:35 Gallery opened",
    ja: "22:35 ギャラリー起動",
    "zh-CN": "22:35 打开相册",
  },
  "22:48 메신저 종료": {
    en: "22:48 Messenger closed",
    ja: "22:48 メッセンジャー終了",
    "zh-CN": "22:48 关闭聊天软件",
  },
  "23:05 LTE 전환": {
    en: "23:05 Switched to LTE",
    ja: "23:05 LTEへ切替",
    "zh-CN": "23:05 切换至LTE",
  },
  "28만": {
    en: "₩280K",
    ja: "28万ウォン",
    "zh-CN": "28万韩元",
  },
  "2분 10초": {
    en: "2m 10s",
    ja: "2分10秒",
    "zh-CN": "2分10秒",
  },
  "2자 이상 입력": {
    en: "Enter at least 2 characters",
    ja: "2文字以上入力",
    "zh-CN": "请输入至少2个字符",
  },
  "③ 해결책 선택": {
    en: "③ Select Solutions",
    ja: "③ 解決策を選択",
    "zh-CN": "③ 选择解决方案",
  },
  "363만": {
    en: "₩3.63M",
    ja: "363万ウォン",
    "zh-CN": "363万韩元",
  },
  "3번 맞추세요!": {
    en: "Hit it 3 times!",
    ja: "3回成功させてください！",
    "zh-CN": "命中3次！",
  },
  "3분 12초": {
    en: "3m 12s",
    ja: "3分12秒",
    "zh-CN": "3分12秒",
  },
  "3성 클리어": {
    en: "3-Star Clears",
    ja: "3星クリア",
    "zh-CN": "三星通关",
  },
  "3축 평균": {
    en: "Three-Axis Average",
    ja: "3軸平均",
    "zh-CN": "三轴平均",
  },
  "3턴간 1:1 환경": {
    en: "1-on-1 for 3 turns",
    ja: "3ターンの1対1環境",
    "zh-CN": "3回合内一对一环境",
  },
  "④ 증거 정당성 판단": {
    en: "④ Decide Evidence Legality",
    ja: "④ 証拠の適法性判断",
    "zh-CN": "④ 判断证据合法性",
  },
  "470만": {
    en: "₩4.7M",
    ja: "470万ウォン",
    "zh-CN": "470万韩元",
  },
  "5글자 이상 입력해주세요": {
    en: "Please enter at least 5 characters.",
    ja: "5文字以上入力してください",
    "zh-CN": "请输入至少 5 个字符",
  },
  "5분 18초": {
    en: "5m 18s",
    ja: "5分18秒",
    "zh-CN": "5分18秒",
  },
  "5턴 이상 진행 시 해금": {
    en: "Unlocks after 5+ turns",
    ja: "5ターン以上進行で解放",
    "zh-CN": "进行5回合以上后解锁",
  },
  "6성향 강화": {
    en: "Six-Trait Enhancement",
    ja: "6性向強化",
    "zh-CN": "六项倾向强化",
  },
  "8분 33초": {
    en: "8m 33s",
    ja: "8分33秒",
    "zh-CN": "8分33秒",
  },
  "가 계 부": {
    en: "HOUSEHOLD LEDGER",
    ja: "家 計 簿",
    "zh-CN": "家 计 簿",
  },
  "가계부 사본": {
    en: "Household Ledger Copy",
    ja: "家計簿の写し",
    "zh-CN": "账本副本",
  },
  "가계부 좀 보여줘": {
    en: "Show me the household ledger.",
    ja: "家計簿を見せて。",
    "zh-CN": "把账本给我看看。",
  },
  "가까워서 더 쉽게 상처가 남는 관계": {
    en: "A bond where closeness makes wounds linger",
    ja: "近いからこそ傷が残りやすい関係",
    "zh-CN": "因亲近而更容易留下伤口的关系",
  },
  "가장 가깝고도 먼 사이": {
    en: "The closest yet most distant bond",
    ja: "最も近くて遠い関係",
    "zh-CN": "最近也最远的关系",
  },
  "가족": {
    en: "Family",
    ja: "家族",
    "zh-CN": "家人",
  },
  "가족 간 유산·돌봄·관계 갈등": {
    en: "Family conflict over inheritance, care, and relationships",
    ja: "家族間の遺産・介護・関係をめぐる葛藤",
    "zh-CN": "家人之间围绕遗产、照护与关系的矛盾",
  },
  "가족 분쟁에서 감정적 호소로 사실을 흐리는 패턴이 반복됩니다. 구체적 날짜와 금액을 물어보세요.": {
    en: "Family disputes often repeat a pattern of clouding facts with emotional appeals. Ask for specific dates and amounts.",
    ja: "家族紛争では、感情的な訴えで事実を曖昧にするパターンが繰り返されます。具体的な日付と金額を尋ねてください。",
    "zh-CN": "家庭纠纷中常会反复出现用情绪诉求模糊事实的模式。请询问具体日期和金额。",
  },
  "가족 쪽 돌봄 정황": {
    en: "Family Care Circumstances",
    ja: "家族側の介護事情",
    "zh-CN": "家族方面的照护情况",
  },
  "가족 쪽 정황": {
    en: "Family Circumstances",
    ja: "家族側の事情",
    "zh-CN": "家族方面的情况",
  },
  "가족의 마음도 사실 앞에서 다시 읽혀야 한다.": {
    en: "A family's feelings must also be reread in the face of facts.",
    ja: "家族の思いも、事実の前で読み直されなければならない。",
    "zh-CN": "家人的心意，也要在事实面前重新读过。",
  },
  "각 영역에서 적절한 해결책을 선택하세요.": {
    en: "Select an appropriate solution for each area.",
    ja: "各領域で適切な解決策を選択してください。",
    "zh-CN": "请在每个领域选择合适的解决方案。",
  },
  "각 재료 슬롯을 필요한 수량까지 채우면 강화 버튼이 활성화됩니다. 강화가 완료되면 해당 항목 레벨과 칭호 총 레벨이 함께 올라갑니다.": {
    en: "Fill each material slot to the required quantity to activate the Enhance button. When enhancement is complete, the item level and total title level both increase.",
    ja: "各素材スロットを必要数まで満たすと、強化ボタンが有効になります。強化が完了すると、該当項目のレベルと称号総レベルが一緒に上がります。",
    "zh-CN": "将各材料槽位填至所需数量后，强化按钮会启用。强化完成后，该项目等级与称号总等级会一起提升。",
  },
  "각도 전환": {
    en: "Change Angle",
    ja: "角度を変更",
    "zh-CN": "转换角度",
  },
  "갈등 자체를 피하려하고 불편한 자리가 생기면 말을 줄이거나 결론부터 내리려는 경향이 있습니다.": {
    en: "Tends to avoid conflict itself; when an uncomfortable scene arises, they speak less or jump straight to conclusions.",
    ja: "葛藤そのものを避け、不快な場になると口数を減らしたり結論から出そうとする傾向があります。",
    "zh-CN": "倾向于回避冲突本身；一旦出现不舒服的场面，就减少发言或先下结论。",
  },
  "갈등 회피": {
    en: "Conflict Avoidance",
    ja: "葛藤回避",
    "zh-CN": "冲突回避",
  },
  "감별 확정": {
    en: "Confirm Appraisal",
    ja: "鑑別を確定",
    "zh-CN": "确认鉴别",
  },
  "감정 격앙 단계에 들어갔습니다": {
    en: "Entered the agitated emotion stage",
    ja: "感情激昂段階に入りました",
    "zh-CN": "已进入情绪激昂阶段",
  },
  "감정 누설이 한계치에 도달했습니다. 단정하지 말고 기록 가능한 실수와 관련 쟁점을 확인하십시오.": {
    en: "Emotional leakage has reached its limit. Do not jump to conclusions; check recordable mistakes and related issues.",
    ja: "感情の漏出が限界値に達しました。断定せず、記録可能な失言と関連する争点を確認してください。",
    "zh-CN": "情绪泄露已达到上限。不要断定，请确认可记录的失误和相关争议点。",
  },
  "감정 단계 변화": {
    en: "Emotion Stage Changed",
    ja: "感情段階の変化",
    "zh-CN": "情绪阶段变化",
  },
  "감정 단서": {
    en: "Emotion Clue",
    ja: "感情の手がかり",
    "zh-CN": "情绪线索",
  },
  "감정 무력화": {
    en: "Emotional Neutralization",
    ja: "感情無力化",
    "zh-CN": "情绪钝化",
  },
  "감정 반응에서 확인할 단서가 생겼습니다.": {
    en: "An emotional reaction has produced a clue to check.",
    ja: "感情反応から確認すべき手がかりが生まれました。",
    "zh-CN": "情绪反应中出现了需要确认的线索。",
  },
  "감정 변화 유발 시 해금": {
    en: "Unlocks when an emotion shift is triggered",
    ja: "感情変化を起こすと解放",
    "zh-CN": "触发情绪变化后解锁",
  },
  "감정 변화가 확인됐습니다. 아직 결론이 아니라 다음 질문의 흐름을 조정할 신호입니다.": {
    en: "An emotional shift has been confirmed. This is not a conclusion yet, but a signal to adjust the flow of your next questions.",
    ja: "感情の変化が確認されました。まだ結論ではなく、次の質問の流れを調整する合図です。",
    "zh-CN": "已确认情绪变化。这还不是结论，而是调整下一步提问走向的信号。",
  },
  "감정 상태": {
    en: "Emotional State",
    ja: "感情状態",
    "zh-CN": "情绪状态",
  },
  "감정 상태가 가라앉았습니다": {
    en: "Emotional state has settled down",
    ja: "感情状態が落ち着きました",
    "zh-CN": "情绪状态已平复",
  },
  "감정 상태가 안정됐습니다": {
    en: "Emotional state has stabilized",
    ja: "感情状態が安定しました",
    "zh-CN": "情绪状态已稳定",
  },
  "감정 수치": {
    en: "Emotion Score",
    ja: "感情値",
    "zh-CN": "情绪数值",
  },
  "감정 실수 포착": {
    en: "Emotional Slip Detected",
    ja: "感情の失言を捕捉",
    "zh-CN": "捕捉情绪失误",
  },
  "감정 억제형": {
    en: "Emotion-Suppression Type",
    ja: "感情抑制型",
    "zh-CN": "情绪压抑型",
  },
  "감정 접근": {
    en: "Emotion Approach",
    ja: "感情アプローチ",
    "zh-CN": "情绪切入",
  },
  "감정 체념 단계에 들어갔습니다": {
    en: "Entered the resigned emotion stage",
    ja: "感情諦め段階に入りました",
    "zh-CN": "已进入情绪放弃阶段",
  },
  "감정 폭발": {
    en: "Emotional Outburst",
    ja: "感情爆発",
    "zh-CN": "情绪爆发",
  },
  "감정보다 숫자, 순서, 기록을 앞세워 논리적으로 방어하려는 타입입니다.": {
    en: "A type that defends logically by putting numbers, sequence, and records ahead of emotion.",
    ja: "感情より数字、順序、記録を前面に出して論理的に防御しようとするタイプです。",
    "zh-CN": "比起情绪，更倾向于用数字、顺序和记录进行逻辑防御的类型。",
  },
  "감정을 최소화하고 사실만 건조하게 말해 긴장감을 지우려는 경향이 있습니다.": {
    en: "Tends to minimize emotion and state only facts dryly to erase tension.",
    ja: "感情を最小限に抑え、事実だけを淡々と話して緊張感を消そうとする傾向があります。",
    "zh-CN": "倾向于尽量压低情绪，只干巴巴地陈述事实，以消除紧张感。",
  },
  "감정이 가라앉고 있다. 공감 접근으로 다시 사실관계를 정리하기 좋은 흐름이다.": {
    en: "Emotions are settling. This is a good flow to reframe the facts through an empathy approach.",
    ja: "感情が落ち着きつつあります。共感アプローチで事実関係を改めて整理しやすい流れです。",
    "zh-CN": "情绪正在平复。适合用共情接近重新梳理事实关系。",
  },
  "감정이 격해졌습니다. 반응을 더 밀어붙일지, 잠시 정리할지 판단하세요.": {
    en: "Emotions have escalated. Decide whether to push the reaction further or pause to regroup.",
    ja: "感情が高ぶっています。反応をさらに押すか、少し整理するか判断してください。",
    "zh-CN": "情绪已经激化。请判断是继续施压，还是暂时整理。",
  },
  "감정이 크게 올라왔습니다. 무리한 단정은 피하고 모순이나 기록으로 압박할 시점입니다.": {
    en: "Emotions have risen sharply. Avoid forced assumptions; this is the time to press with contradictions or records.",
    ja: "感情が大きく高まりました。無理な断定は避け、矛盾や記録で圧迫する時点です。",
    "zh-CN": "情绪已明显升高。避免强行断定，此时应以矛盾或记录施压。",
  },
  "감정이 크게 흔들렸습니다.": {
    en: "Their emotions were badly shaken.",
    ja: "感情が大きく揺らぎました。",
    "zh-CN": "情绪发生剧烈波动。",
  },
  "감정이 한계까지 밀리며 진술이 흔들린 점": {
    en: "Emotions were pushed to the limit, causing the statement to waver.",
    ja: "感情が限界まで高まり、供述が揺らいだ点",
    "zh-CN": "情绪被推到极限后，陈述发生动摇",
  },
  "감정이 흔들리기 시작했습니다": {
    en: "Emotions are starting to waver",
    ja: "感情が揺らぎ始めました",
    "zh-CN": "情绪开始动摇",
  },
  "감정적 실수 포착": {
    en: "Emotional Slip Detected",
    ja: "感情のほころびを確認",
    "zh-CN": "捕捉到情绪失误",
  },
  "강점": {
    en: "Strengths",
    ja: "強み",
    "zh-CN": "优势",
  },
  "강제 판결이 진행됩니다.": {
    en: "will be used for a forced verdict.",
    ja: "強制判決が進行します。",
    "zh-CN": "进入强制裁决。",
  },
  "강화": {
    en: "Enhance",
    ja: "強化",
    "zh-CN": "强化",
  },
  "강화 가능": {
    en: "Enhancement Available",
    ja: "強化可能",
    "zh-CN": "可强化",
  },
  "강화 항목 선택": {
    en: "Select Enhancement Item",
    ja: "強化項目を選択",
    "zh-CN": "选择强化项目",
  },
  "같은 쟁점을 너무 오래 밀었다. 질문 각도를 초기화할 수 있다.": {
    en: "You pushed the same issue too long. You can reset the question angle.",
    ja: "同じ争点を長く押しすぎました。質問の角度を初期化できます。",
    "zh-CN": "同一个争议点追得太久了。可以重置提问角度。",
  },
  "같은 쟁점을 너무 오래 밀었습니다. 스킬을 써서 질문 각도를 초기화할 수 있습니다.": {
    en: "You pushed the same issue too long. Use a skill to reset the question angle.",
    ja: "同じ争点を長く押しすぎました。スキルを使って質問の角度を初期化できます。",
    "zh-CN": "同一个争议点追得太久了。可以使用技能重置提问角度。",
  },
  "같은 증거 카드를 두 장씩 찾으세요.": {
    en: "Find matching pairs of evidence cards.",
    ja: "同じ証拠カードを2枚ずつ見つけてください。",
    "zh-CN": "请找出成对的相同证据卡。",
  },
  "같은 회차를 다시 시도하거나 이번 보상은 건너뛸 수 있습니다.": {
    en: "You can retry the same round or skip this reward.",
    ja: "同じ回を再試行するか、今回の報酬をスキップできます。",
    "zh-CN": "可以重新尝试同一回合，或跳过本次奖励。",
  },
  "개 · 교환 비율": {
    en: "items · Exchange Ratio",
    ja: "個・交換比率",
    "zh-CN": "个 · 交换比例",
  },
  "개 (선행 증거 필요)": {
    en: "items (prerequisite evidence needed)",
    ja: "件（先行証拠が必要）",
    "zh-CN": "个（需要前置证据）",
  },
  "개 → 방향 조각 1개": {
    en: "items → 1 Direction Fragment",
    ja: "個 → 方向のかけら1個",
    "zh-CN": "个 → 1个方向碎片",
  },
  "개 사용": {
    en: "used",
    ja: "個使用",
    "zh-CN": "个使用",
  },
  "개 선택": {
    en: "selected",
    ja: "件選択",
    "zh-CN": "个已选",
  },
  "개를 다른 판결 조각 1개로 교환할 수 있습니다.": {
    en: "can be exchanged for 1 different verdict fragment.",
    ja: "個で別の判決のかけら1個と交換できます。",
    "zh-CN": "个可交换为1个其他裁决碎片。",
  },
  "개방": {
    en: "Opening",
    ja: "開放",
    "zh-CN": "打开",
  },
  "개요": {
    en: "Overview",
    ja: "概要",
    "zh-CN": "概要",
  },
  "개인 계좌 이동 카드": {
    en: "Personal Account Transfer Card",
    ja: "個人口座移動カード",
    "zh-CN": "个人账户转移卡",
  },
  "개인 계좌 출금의 사용처": {
    en: "Use of Personal Account Withdrawals",
    ja: "個人口座出金の使途",
    "zh-CN": "个人账户取款用途",
  },
  "거래금액": {
    en: "Transaction Amount",
    ja: "取引金額",
    "zh-CN": "交易金额",
  },
  "거래일": {
    en: "Transaction Date",
    ja: "取引日",
    "zh-CN": "交易日",
  },
  "거래확인": {
    en: "Transaction Check",
    ja: "取引確認",
    "zh-CN": "交易确认",
  },
  "거짓 붕괴로 숨은 쟁점이 드러났습니다.": {
    en: "A collapsed lie has revealed a hidden issue.",
    ja: "嘘の崩壊により隠れた争点が明らかになりました。",
    "zh-CN": "谎言崩塌揭示了隐藏争议点。",
  },
  "거짓말 붕괴": {
    en: "Lie Collapse",
    ja: "嘘の崩壊",
    "zh-CN": "谎言瓦解",
  },
  "거짓말 붕괴 달성 시 해금": {
    en: "Unlocks when Lie Collapse is achieved",
    ja: "嘘の崩壊達成で解放",
    "zh-CN": "达成谎言瓦解后解锁",
  },
  "거짓말 전이": {
    en: "Lie Transfer",
    ja: "嘘の遷移",
    "zh-CN": "谎言转移",
  },
  "거짓말을 간파했다!": {
    en: "Lie Exposed!",
    ja: "嘘を見抜いた！",
    "zh-CN": "识破谎言！",
  },
  "거짓으로 판단": {
    en: "Found False",
    ja: "虚偽と判断",
    "zh-CN": "认定为虚假",
  },
  "건 |": {
    en: "cases |",
    ja: "件 |",
    "zh-CN": "件 |",
  },
  "건 완료": {
    en: "cases completed",
    ja: "件完了",
    "zh-CN": "件已完成",
  },
  "건)": {
    en: "cases)",
    ja: "件)",
    "zh-CN": "件）",
  },
  "건너뛰기": {
    en: "Skip",
    ja: "スキップ",
    "zh-CN": "跳过",
  },
  "검토": {
    en: "Review",
    ja: "検討",
    "zh-CN": "审查",
  },
  "검토 축": {
    en: "Review Axis",
    ja: "検討軸",
    "zh-CN": "审查轴",
  },
  "게임 설정": {
    en: "Game Settings",
    ja: "ゲーム設定",
    "zh-CN": "游戏设置",
  },
  "게임 일시정지": {
    en: "Game Paused",
    ja: "ゲーム一時停止",
    "zh-CN": "游戏暂停",
  },
  "게임 플레이 중 배경 음악": {
    en: "Background music during gameplay",
    ja: "ゲームプレイ中のBGM",
    "zh-CN": "游戏过程中的背景音乐",
  },
  "격앙": {
    en: "Agitated",
    ja: "激昂",
    "zh-CN": "激昂",
  },
  "격앙 — 감정이 격해져 있습니다": {
    en: "Agitated — emotions are running high",
    ja: "激昂 — 感情が高ぶっています",
    "zh-CN": "激动 — 情绪正在升高",
  },
  "격앙 — 감정이 격해졌습니다": {
    en: "Agitated — emotions are heightened",
    ja: "激昂 — 感情が高ぶっています",
    "zh-CN": "激昂 — 情绪已经激化",
  },
  "격앙 상태": {
    en: "Agitated State",
    ja: "激昂状態",
    "zh-CN": "激动状态",
  },
  "격앙 상태가 이어지고 있다. 사실 추궁과 동기 탐색이 더 강하게 작용할 수 있다.": {
    en: "The heightened state continues. Fact press and motive probe may work more strongly.",
    ja: "激高状態が続いています。事実追及と動機探索がより強く作用する可能性があります。",
    "zh-CN": "激昂状态仍在持续。事实追问和动机探查可能会更强烈地起效。",
  },
  "견습": {
    en: "Apprentice",
    ja: "見習い",
    "zh-CN": "见习",
  },
  "견습 재판관": {
    en: "Apprentice Judge",
    ja: "見習い裁判官",
    "zh-CN": "见习法官",
  },
  "결과": {
    en: "Results",
    ja: "結果",
    "zh-CN": "结果",
  },
  "결정적 단서": {
    en: "Critical Clue",
    ja: "決定的手がかり",
    "zh-CN": "关键线索",
  },
  "결정적 모순을 지적했습니다! 방어가 크게 흔들립니다.": {
    en: "A decisive contradiction was identified. The defense is badly shaken.",
    ja: "決定的な矛盾を指摘しました。防御が大きく揺らぎます。",
    "zh-CN": "已指出决定性矛盾。防线大幅动摇。",
  },
  "결정적 순간": {
    en: "Decisive Moment",
    ja: "決定的瞬間",
    "zh-CN": "决定性瞬间",
  },
  "결정적 증거": {
    en: "Decisive Evidence",
    ja: "決定的証拠",
    "zh-CN": "决定性证据",
  },
  "결정적 증거를 제시하여 확인합니다": {
    en: "Confirm by presenting decisive evidence.",
    ja: "決定的な証拠を提示して確認します。",
    "zh-CN": "出示决定性证据进行确认。",
  },
  "결정적 질문 가능": {
    en: "Decisive Question Available",
    ja: "決定的質問可能",
    "zh-CN": "可使用决定性问题",
  },
  "결정적 질문 해금": {
    en: "Decisive Question Unlocked",
    ja: "決定的質問を解放",
    "zh-CN": "解锁决定性问题",
  },
  "결정적 질문을 한다": {
    en: "Ask the Decisive Question",
    ja: "決定的な質問をする",
    "zh-CN": "提出决定性问题",
  },
  "결제금액": {
    en: "Payment Amount",
    ja: "支払額",
    "zh-CN": "支付金额",
  },
  "경계 설정": {
    en: "Set Boundaries",
    ja: "境界設定",
    "zh-CN": "边界设定",
  },
  "경조사가 좀 있었어": {
    en: "There were some family occasions.",
    ja: "冠婚葬祭がいくつかあったんだ。",
    "zh-CN": "有些红白事。",
  },
  "계속": {
    en: "Continue",
    ja: "続ける",
    "zh-CN": "继续",
  },
  "계속 말해보세요. 지금의 흐름을 더 확인하겠습니다.": {
    en: "Continue. I will check this flow further.",
    ja: "続けて話してください。今の流れをさらに確認します。",
    "zh-CN": "请继续说。我会进一步确认当前流向。",
  },
  "계속하기": {
    en: "Continue",
    ja: "続ける",
    "zh-CN": "继续",
  },
  "계속하십시오. 이 자리에서 사실대로 말하셔야 합니다.": {
    en: "Continue. In this courtroom, you must tell the truth.",
    ja: "続けてください。この場では事実を話さなければなりません。",
    "zh-CN": "继续。你必须在这里如实说明。",
  },
  "계약서": {
    en: "Contract",
    ja: "契約書",
    "zh-CN": "合同",
  },
  "계약서 밖에서 터지는 현실": {
    en: "Reality that erupts beyond the contract",
    ja: "契約書の外で噴き出す現実",
    "zh-CN": "合同之外爆发的现实",
  },
  "계좌": {
    en: "Account",
    ja: "口座",
    "zh-CN": "账户",
  },
  "계좌 이체 내역": {
    en: "Bank Transfer Records",
    ja: "口座振込明細",
    "zh-CN": "账户转账明细",
  },
  "고백": {
    en: "Confession",
    ja: "告白",
    "zh-CN": "坦白",
  },
  "고정됨": {
    en: "Pinned",
    ja: "固定済み",
    "zh-CN": "已固定",
  },
  "공감": {
    en: "Empathy",
    ja: "共感",
    "zh-CN": "共情",
  },
  "공감 접근으로 확인할 수 있는 범위가 넓어졌습니다. 아직 자백은 아니므로 낮은 단계 질문부터 이어가십시오.": {
    en: "The range you can confirm through empathy approach has widened. This is not a confession yet, so continue from lower-stage questions.",
    ja: "共感アプローチで確認できる範囲が広がりました。まだ自白ではないため、低い段階の質問から続けてください。",
    "zh-CN": "通过共情接近可确认的范围扩大了。这还不是自白，请从低阶段问题继续。",
  },
  "공감 접근이 효과적입니다.": {
    en: "An empathy approach will be effective.",
    ja: "共感アプローチが効果的です。",
    "zh-CN": "共情接近会有效。",
  },
  "공감 접근이나 부드러운 질문으로 올립니다.\n신뢰가 충분하면 자발적 고백을 유도하거나\n숨겨진 정보를 얻을 수 있습니다.": {
    en: "Raised through empathy approaches or gentle questions.\nWith enough trust, you can draw out a voluntary confession\nor obtain hidden information.",
    ja: "共感アプローチや穏やかな質問で上昇します。\n信頼が十分なら、自発的な告白を促したり\n隠された情報を得たりできます。",
    "zh-CN": "通过共情接近或温和提问来提升。\n信任足够时，可以引导自愿坦白，\n或获得隐藏信息。",
  },
  "공감과 이해를 바탕으로 양측 모두가 만족하는 화해를 추구하는 타입입니다.": {
    en: "A type that seeks a settlement both sides can accept, based on empathy and understanding.",
    ja: "共感と理解をもとに、双方が納得できる和解を追求するタイプです。",
    "zh-CN": "基于共情与理解，追求双方都能接受的和解的类型。",
  },
  "공감으로 스스로 고백하게 합니다": {
    en: "Use empathy to make them confess on their own.",
    ja: "共感によって自ら告白させます。",
    "zh-CN": "以共情促使其主动坦白。",
  },
  "공감으로 신뢰를 얻습니다": {
    en: "Build trust through empathy",
    ja: "共感で信頼を得ます",
    "zh-CN": "通过共情取得信任",
  },
  "공감으로 전환한다": {
    en: "Shift to Empathy",
    ja: "共感に切り替える",
    "zh-CN": "转向共情",
  },
  "공개 발언의 순서": {
    en: "Order of Public Statements",
    ja: "公開発言の順序",
    "zh-CN": "公开发言的顺序",
  },
  "공개 여론전과 평판 붕괴가 얽힌 특집 사건": {
    en: "A special case entangled in a public opinion battle and reputational collapse",
    ja: "公開の世論戦と評判の崩壊が絡む特集事件",
    "zh-CN": "牵涉公开舆论战与声誉崩塌的特别案件",
  },
  "공개 정보": {
    en: "Public Info",
    ja: "公開情報",
    "zh-CN": "公开信息",
  },
  "공개범위": {
    en: "Visibility Scope",
    ja: "公開範囲",
    "zh-CN": "公开范围",
  },
  "공개성과 파장이 커질수록 판단은 더 무거워집니다.": {
    en: "As publicity and impact grow, judgment becomes heavier.",
    ja: "公開性と波紋が大きくなるほど、判断は重くなります。",
    "zh-CN": "公开性与影响越大，判断越沉重。",
  },
  "공격": {
    en: "Attack",
    ja: "攻撃",
    "zh-CN": "攻击",
  },
  "공격형": {
    en: "Aggressive Type",
    ja: "攻撃型",
    "zh-CN": "攻击型",
  },
  "공공·제도": {
    en: "Public Systems",
    ja: "公共制度",
    "zh-CN": "公共制度",
  },
  "공동 재산 회복": {
    en: "Joint Property Recovery",
    ja: "共有財産の回復",
    "zh-CN": "共同财产恢复",
  },
  "공동 적금 권한 카드": {
    en: "Joint Savings Authority Card",
    ja: "共同積立預金の権限カード",
    "zh-CN": "共同储蓄账户权限卡",
  },
  "공동 적금 해지 경위": {
    en: "Circumstances of the Joint Savings Cancellation",
    ja: "共同積立預金の解約経緯",
    "zh-CN": "共同储蓄账户解约经过",
  },
  "공유": {
    en: "Share",
    ja: "共有",
    "zh-CN": "分享",
  },
  "공유하기": {
    en: "Share",
    ja: "共有する",
    "zh-CN": "分享",
  },
  "공적 절차와 개인의 사정이 같은 장면 안에서 맞붙습니다.": {
    en: "Public procedure and private circumstances clash in the same scene.",
    ja: "公的手続きと個人の事情が同じ場面でぶつかります。",
    "zh-CN": "公共程序与个人情况在同一场景中交锋。",
  },
  "공증": {
    en: "Notarization",
    ja: "公証",
    "zh-CN": "公证",
  },
  "공지사항": {
    en: "Notices",
    ja: "お知らせ",
    "zh-CN": "公告",
  },
  "공지사항을 불러올 수 없습니다.": {
    en: "Unable to load notices.",
    ja: "お知らせを読み込めません。",
    "zh-CN": "无法加载公告。",
  },
  "공포": {
    en: "Fear",
    ja: "恐れ",
    "zh-CN": "恐惧",
  },
  "과거 손절의 빈칸": {
    en: "The Missing Piece in the Past Break",
    ja: "過去の絶交の空白",
    "zh-CN": "过往断交的空白",
  },
  "과거 손절의 진짜 원인": {
    en: "Real Reason for Cutting Ties in the Past",
    ja: "過去の絶交の本当の原因",
    "zh-CN": "过去断交的真正原因",
  },
  "과거 이력": {
    en: "Past History",
    ja: "過去の経緯",
    "zh-CN": "过往经历",
  },
  "과정밀 진술": {
    en: "Over-Precise Statement",
    ja: "過精密な陳述",
    "zh-CN": "过度精确陈述",
  },
  "관계": {
    en: "Relationship",
    ja: "関係",
    "zh-CN": "关系",
  },
  "관계 완충": {
    en: "Relationship Buffer",
    ja: "関係緩衝",
    "zh-CN": "关系缓冲",
  },
  "관계 완충 질문으로 신뢰를 선확보합니다": {
    en: "Secure trust first with a relationship-buffering question",
    ja: "関係緩衝の質問で先に信頼を確保します",
    "zh-CN": "通过关系缓冲问题预先取得信任",
  },
  "관계 유형별 성적": {
    en: "Scores by Relationship Type",
    ja: "関係タイプ別成績",
    "zh-CN": "按关系类型统计成绩",
  },
  "관계 재건": {
    en: "Rebuild Relationship",
    ja: "関係の再構築",
    "zh-CN": "关系重建",
  },
  "관계 확인": {
    en: "Check Relationship",
    ja: "関係確認",
    "zh-CN": "确认关系",
  },
  "관련 인물": {
    en: "Related Figures",
    ja: "関係者",
    "zh-CN": "相关人物",
  },
  "관련 쟁점:": {
    en: "Related Issue:",
    ja: "関連争点:",
    "zh-CN": "相关争议点：",
  },
  "관련 증거": {
    en: "Related Evidence",
    ja: "関連証拠",
    "zh-CN": "相关证据",
  },
  "관련 증거 확인": {
    en: "Check Related Evidence",
    ja: "関連証拠を確認",
    "zh-CN": "确认相关证据",
  },
  "관련 참조": {
    en: "Related References",
    ja: "関連参照",
    "zh-CN": "相关参照",
  },
  "관련성 높은 증거입니다": {
    en: "Highly relevant evidence",
    ja: "関連性の高い証拠です",
    "zh-CN": "高度相关的证据",
  },
  "관련인": {
    en: "Related Person",
    ja: "関係者",
    "zh-CN": "相关人",
  },
  "관용": {
    en: "Leniency",
    ja: "寛容",
    "zh-CN": "宽容",
  },
  "관점을 바꿔 제시한다": {
    en: "Present from Another Angle",
    ja: "観点を変えて提示する",
    "zh-CN": "换个角度出示",
  },
  "관찰에 기록": {
    en: "Record in Observation",
    ja: "観察に記録",
    "zh-CN": "记录到观察",
  },
  "광고 보고 성공": {
    en: "Watch Ad to Clear",
    ja: "広告を見てクリア",
    "zh-CN": "看广告通关",
  },
  "광고 보고 획득": {
    en: "Watch Ad to Claim",
    ja: "広告を見て獲得",
    "zh-CN": "看广告领取",
  },
  "광고 보기": {
    en: "Watch Ad",
    ja: "広告を見る",
    "zh-CN": "观看广告",
  },
  "광고 시청 중...": {
    en: "Watching ad...",
    ja: "広告視聴中...",
    "zh-CN": "正在观看广告...",
  },
  "교착 — 다른 접근을 시도하세요": {
    en: "Stalemate — try another approach",
    ja: "膠着 — 別のアプローチを試してください",
    "zh-CN": "僵持 — 请尝试其他接近方式",
  },
  "교착 상태": {
    en: "Stalemate",
    ja: "膠着状態",
    "zh-CN": "僵局",
  },
  "교착 상태입니다. 다른 쟁점이나 접근을 시도하세요.": {
    en: "This is a stalemate. Try another issue or approach.",
    ja: "膠着状態です。別の争点やアプローチを試してください。",
    "zh-CN": "当前陷入僵局。请尝试其他争议点或接近方式。",
  },
  "교환 대상": {
    en: "Exchange Target",
    ja: "交換対象",
    "zh-CN": "交换目标",
  },
  "교환 실행": {
    en: "Execute Exchange",
    ja: "交換実行",
    "zh-CN": "执行交换",
  },
  "교환 재료": {
    en: "Exchange Materials",
    ja: "交換素材",
    "zh-CN": "交换材料",
  },
  "교환할 위치를 탭하세요": {
    en: "Tap a position to swap",
    ja: "交換する位置をタップしてください",
    "zh-CN": "点击要交换的位置",
  },
  "구멍에 빠졌습니다": {
    en: "You fell into a hole",
    ja: "穴に落ちました",
    "zh-CN": "掉进了洞里",
  },
  "구체적인 질문이 효과적입니다": {
    en: "Specific questions work best",
    ja: "具体的な質問が効果的です",
    "zh-CN": "具体的问题更有效",
  },
  "궁지": {
    en: "Cornered",
    ja: "窮地",
    "zh-CN": "困境",
  },
  "권위": {
    en: "Authority",
    ja: "権威",
    "zh-CN": "权威",
  },
  "권위 90점 이상입니다.": {
    en: "Authority is 90 or higher.",
    ja: "権威が90点以上です。",
    "zh-CN": "权威达到90分以上。",
  },
  "귀책": {
    en: "Fault",
    ja: "帰責",
    "zh-CN": "归责",
  },
  "균열": {
    en: "Fracture",
    ja: "亀裂",
    "zh-CN": "裂痕",
  },
  "균열 포착": {
    en: "Crack Detected",
    ja: "亀裂を捕捉",
    "zh-CN": "捕捉裂痕",
  },
  "균형": {
    en: "Balanced",
    ja: "均衡",
    "zh-CN": "均衡",
  },
  "균형 상태입니다. 질문 효과가 보통이며, 안정적으로 심문을 진행할 수 있습니다.": {
    en: "A balanced state. Question effects are normal, and questioning can proceed steadily.",
    ja: "均衡状態です。質問効果は普通で、安定して尋問を進められます。",
    "zh-CN": "处于平衡状态。问题效果普通，可以稳定推进询问。",
  },
  "그건... 제가 말한 것과 다르지 않습니다. 맥락이 다른 것입니다.": {
    en: "That is... not different from what I said. The context is different.",
    ja: "それは…私が言ったことと違うわけではありません。文脈が違うのです。",
    "zh-CN": "那个……并不是和我说的不一样。只是语境不同。",
  },
  "그렇다": {
    en: "Yes",
    ja: "はい",
    "zh-CN": "是",
  },
  "글자 카드": {
    en: "Letter Card",
    ja: "文字カード",
    "zh-CN": "文字卡",
  },
  "글자를 올바른 순서로 배치하세요!": {
    en: "Arrange the letters in the correct order!",
    ja: "文字を正しい順に並べてください！",
    "zh-CN": "请按正确顺序排列文字！",
  },
  "금액": {
    en: "Amount",
    ja: "金額",
    "zh-CN": "金额",
  },
  "금융거래 내역": {
    en: "Financial Transactions",
    ja: "金融取引明細",
    "zh-CN": "金融交易明细",
  },
  "금융거래 내역 조회표": {
    en: "Financial Transaction Lookup Sheet",
    ja: "金融取引明細照会表",
    "zh-CN": "金融交易明细查询表",
  },
  "금전 정리": {
    en: "Settle Finances",
    ja: "金銭整理",
    "zh-CN": "金钱整理",
  },
  "기관": {
    en: "Agency",
    ja: "機関",
    "zh-CN": "机构",
  },
  "기관확인": {
    en: "Agency Check",
    ja: "機関確認",
    "zh-CN": "机构确认",
  },
  "기록": {
    en: "Record",
    ja: "記録",
    "zh-CN": "记录",
  },
  "기록 대장": {
    en: "Record Register",
    ja: "記録台帳",
    "zh-CN": "记录台账",
  },
  "기록 없음": {
    en: "No records",
    ja: "記録なし",
    "zh-CN": "暂无记录",
  },
  "기록 재정리": {
    en: "Reorganize Records",
    ja: "記録の再整理",
    "zh-CN": "重新整理记录",
  },
  "기록 페이지": {
    en: "Record Page",
    ja: "記録ページ",
    "zh-CN": "记录页面",
  },
  "기록 필터": {
    en: "Record Filter",
    ja: "記録フィルター",
    "zh-CN": "记录筛选",
  },
  "기록과 관계가 동시에 흔들리는 자리": {
    en: "Where records and relationships shake at once",
    ja: "記録と関係が同時に揺らぐ場所",
    "zh-CN": "记录与关系同时动摇的位置",
  },
  "기존 비교 보관함을 확장한 실험실입니다. 증거와 노트를 교차 조합할 수 있습니다.": {
    en: "An expanded lab built from the existing Comparison Vault. Cross-combine evidence and notes.",
    ja: "既存の比較保管庫を拡張したラボです。証拠とノートを交差して組み合わせられます。",
    "zh-CN": "这是扩展后的比较保管室。可交叉组合证据与笔记。",
  },
  "기존 판단": {
    en: "Prior Judgment",
    ja: "既存判断",
    "zh-CN": "原有判断",
  },
  "기존 판단 · 보류": {
    en: "Prior Judgment · Deferred",
    ja: "既存判断・保留",
    "zh-CN": "原有判断 · 暂缓",
  },
  "기존 판단 · 양측 일부 사실": {
    en: "Prior Judgment · Partial Truth on Both Sides",
    ja: "既存判断・双方一部事実",
    "zh-CN": "原有判断 · 双方各有部分事实",
  },
  "기존 판단과 새 정보가 충돌하고 있다.": {
    en: "The prior judgment conflicts with new information.",
    ja: "既存の判断と新情報が衝突しています。",
    "zh-CN": "原有判断正在与新信息冲突。",
  },
  "기존 판단과 충돌": {
    en: "Conflicts with Prior Judgment",
    ja: "既存判断と衝突",
    "zh-CN": "与既有判断冲突",
  },
  "기타": {
    en: "Other",
    ja: "その他",
    "zh-CN": "其他",
  },
  "기타 연결": {
    en: "Other Connections",
    ja: "その他の接続",
    "zh-CN": "其他连接",
  },
  "기현": {
    en: "Gi-hyeon",
    ja: "ギヒョン",
    "zh-CN": "基贤",
  },
  "김세라": {
    en: "Kim Se-ra",
    ja: "キム・セラ",
    "zh-CN": "金世罗",
  },
  "김영수": {
    en: "Kim Yeong-su",
    ja: "キム・ヨンス",
    "zh-CN": "金英秀",
  },
  "김태호": {
    en: "Kim Tae-ho",
    ja: "キム・テホ",
    "zh-CN": "金泰浩",
  },
  "끼어든 발언에서 새 쟁점이 드러났습니다.": {
    en: "A new issue emerged from the interruption.",
    ja: "割り込んだ発言から新しい争点が明らかになりました。",
    "zh-CN": "插话中显现出新的争议点。",
  },
  "끼어든 발언이 새 쟁점을 열었습니다.": {
    en: "An interruption has opened a new issue.",
    ja: "割り込んだ発言が新しい争点を開きました。",
    "zh-CN": "插入的发言开启了新的争议点。",
  },
  "끼어들기": {
    en: "Interruption",
    ja: "割り込み",
    "zh-CN": "插话",
  },
  "나가기": {
    en: "Exit",
    ja: "終了",
    "zh-CN": "退出",
  },
  "나중에 판단": {
    en: "Judge Later",
    ja: "後で判断",
    "zh-CN": "稍后判断",
  },
  "난이도:": {
    en: "Difficulty:",
    ja: "難易度:",
    "zh-CN": "难度：",
  },
  "남은 턴": {
    en: "Turns Left",
    ja: "残りターン",
    "zh-CN": "剩余回合",
  },
  "낭떠러지로 떨어져 재판이 중단되었습니다.": {
    en: "You fell off a cliff, interrupting the trial.",
    ja: "崖から落ち、裁判が中断されました。",
    "zh-CN": "从悬崖坠落，审理被中断。",
  },
  "낮음": {
    en: "Low",
    ja: "低",
    "zh-CN": "低",
  },
  "내 기록": {
    en: "My Records",
    ja: "自分の記録",
    "zh-CN": "我的记录",
  },
  "내 판단": {
    en: "My Judgment",
    ja: "自分の判断",
    "zh-CN": "我的判断",
  },
  "냉정 논리": {
    en: "Cool Logic",
    ja: "冷静な論理",
    "zh-CN": "冷静逻辑",
  },
  "냉정 분석형": {
    en: "Calm Analyst Type",
    ja: "冷静分析型",
    "zh-CN": "冷静分析型",
  },
  "넘어가기": {
    en: "Skip",
    ja: "見送る",
    "zh-CN": "跳过",
  },
  "넘어간다": {
    en: "Let It Pass",
    ja: "見送る",
    "zh-CN": "放过",
  },
  "네. 잠시 정리하겠습니다. 제가 아는 사실부터 차례대로 말하겠습니다.": {
    en: "Yes. Let me gather myself. I will explain what I know in order.",
    ja: "はい。少し整理します。私が知っている事実から順に話します。",
    "zh-CN": "是的。请让我稍微整理一下。我会从自己知道的事实开始按顺序说明。",
  },
  "네. 흥분해서 앞뒤가 흐려졌습니다. 사실관계부터 다시 정리하겠습니다.": {
    en: "Yes. I was upset and lost the thread. I will organize the facts again from the start.",
    ja: "はい。興奮して前後が曖昧になりました。事実関係から改めて整理します。",
    "zh-CN": "是的。我太激动，前后说得不清楚。我会先重新整理事实关系。",
  },
  "네트워크 연결이 끊어졌습니다": {
    en: "Network connection lost",
    ja: "ネットワーク接続が切断されました",
    "zh-CN": "网络连接已断开",
  },
  "네트워크가 복구되었습니다": {
    en: "Network connection restored",
    ja: "ネットワーク接続が復旧しました",
    "zh-CN": "网络连接已恢复",
  },
  "노드 선택": {
    en: "Select Nodes",
    ja: "ノード選択",
    "zh-CN": "选择节点",
  },
  "노트": {
    en: "Notes",
    ja: "ノート",
    "zh-CN": "笔记",
  },
  "논리": {
    en: "Logic",
    ja: "論理",
    "zh-CN": "逻辑",
  },
  "논리적 분석을 바탕으로 현실적인 해결책을 찾아내는 타입입니다.": {
    en: "A type that finds realistic solutions through logical analysis.",
    ja: "論理的分析をもとに現実的な解決策を見つけるタイプです。",
    "zh-CN": "基于逻辑分析寻找现实解决方案的类型。",
  },
  "논리적이면서도 관대한 시선으로 원칙을 지키는 타입입니다.": {
    en: "A type that upholds principles with both logic and a generous perspective.",
    ja: "論理的でありながら寛容な視線で原則を守るタイプです。",
    "zh-CN": "以逻辑且宽容的视角守护原则的类型。",
  },
  "농담 방패": {
    en: "Joke Shield",
    ja: "冗談の盾",
    "zh-CN": "玩笑盾牌",
  },
  "높음": {
    en: "High",
    ja: "高",
    "zh-CN": "高",
  },
  "놓쳤다...": {
    en: "Missed...",
    ja: "見逃した...",
    "zh-CN": "错过了...",
  },
  "놓친 연결 고리": {
    en: "Missed Links",
    ja: "見逃した接続",
    "zh-CN": "遗漏的连接",
  },
  "놓친 조합이 없습니다.": {
    en: "No missed combinations.",
    ja: "見逃した組み合わせはありません。",
    "zh-CN": "没有遗漏的组合。",
  },
  "누가 어머니의 뜻을 왜곡했는지": {
    en: "Who Distorted Mother's Wishes",
    ja: "誰が母の意思を歪曲したのか",
    "zh-CN": "谁歪曲了母亲的意愿",
  },
  "누구 경조사인데?": {
    en: "Whose family occasion?",
    ja: "誰の冠婚葬祭？",
    "zh-CN": "谁家的红白事？",
  },
  "누나": {
    en: "Older Sister",
    ja: "姉",
    "zh-CN": "姐姐",
  },
  "누락 문맥: 이전/이후 게시글 미확보": {
    en: "Missing context: previous/following posts not secured.",
    ja: "欠落文脈：前後の投稿は未確保。",
    "zh-CN": "缺失语境：未取得前后帖子。",
  },
  "누설 100%에 도달했습니다": {
    en: "Leak reached 100%",
    ja: "漏出が100%に到達しました",
    "zh-CN": "泄露已达到 100%",
  },
  "누설 미터 ↑": {
    en: "Leak Meter ↑",
    ja: "漏洩メーター ↑",
    "zh-CN": "泄露计量 ↑",
  },
  "누설 위험": {
    en: "Leak Risk",
    ja: "漏出リスク",
    "zh-CN": "泄露风险",
  },
  "느리게": {
    en: "Slow",
    ja: "遅い",
    "zh-CN": "慢速",
  },
  "능숙한 재판관": {
    en: "Skilled Judge",
    ja: "熟練裁判官",
    "zh-CN": "熟练法官",
  },
  "늦은 경고도 설명되지 않으면 상처로 남는다.": {
    en: "Even a late warning leaves a wound if it is never explained.",
    ja: "遅い警告も、説明されなければ傷として残る。",
    "zh-CN": "迟来的警告若不被说明，也会留下伤口。",
  },
  "닉네임": {
    en: "Nickname",
    ja: "ニックネーム",
    "zh-CN": "昵称",
  },
  "닉네임 설정": {
    en: "Set Nickname",
    ja: "ニックネーム設定",
    "zh-CN": "设置昵称",
  },
  "다른 쟁점에서 새로운 돌파구를 찾습니다": {
    en: "Look for a new breakthrough in another issue.",
    ja: "別の争点で新たな突破口を探します。",
    "zh-CN": "在其他争议点中寻找新突破口。",
  },
  "다른 쟁점으로 이동한다": {
    en: "Move to Another Issue",
    ja: "別の争点へ移る",
    "zh-CN": "转向其他争议点",
  },
  "다른 쟁점으로 화제 전환": {
    en: "Shift to Another Issue",
    ja: "別の争点へ話題転換",
    "zh-CN": "转向其他争议点",
  },
  "다시 도전": {
    en: "Try Again",
    ja: "再挑戦",
    "zh-CN": "再次挑战",
  },
  "다시 시도": {
    en: "Try Again",
    ja: "もう一度",
    "zh-CN": "重试",
  },
  "다시 시작": {
    en: "Restart",
    ja: "再起動",
    "zh-CN": "重新开始",
  },
  "다시 판결하기": {
    en: "Judge Again",
    ja: "もう一度判決する",
    "zh-CN": "重新裁决",
  },
  "다음": {
    en: "Next",
    ja: "次へ",
    "zh-CN": "下一步",
  },
  "다음 →": {
    en: "Next →",
    ja: "次へ →",
    "zh-CN": "下一步 →",
  },
  "다음 단계까지": {
    en: "To Next Step",
    ja: "次の段階まで",
    "zh-CN": "距离下一阶段",
  },
  "다음 단계로": {
    en: "To Next Step",
    ja: "次の段階へ",
    "zh-CN": "进入下一阶段",
  },
  "다음 등급까지": {
    en: "To Next Rank",
    ja: "次のランクまで",
    "zh-CN": "距离下一等级",
  },
  "다음 사건": {
    en: "Next Case",
    ja: "次の事件",
    "zh-CN": "下一案件",
  },
  "다음 증거는 취득 과정에 문제가 있을 수 있습니다. 판결 근거로 사용할지 결정하세요.": {
    en: "The following evidence may have issues in how it was obtained. Decide whether to use it as a basis for the verdict.",
    ja: "次の証拠は取得過程に問題がある可能性があります。判決の根拠として使用するか決定してください。",
    "zh-CN": "以下证据的取得过程可能存在问题。请决定是否将其用作裁决依据。",
  },
  "다음 프레임 →": {
    en: "Next Frame →",
    ja: "次のフレーム →",
    "zh-CN": "下一帧 →",
  },
  "다혜": {
    en: "Da-hye",
    ja: "ダヘ",
    "zh-CN": "多惠",
  },
  "단가": {
    en: "Unit Price",
    ja: "単価",
    "zh-CN": "单价",
  },
  "단계": {
    en: "Stage",
    ja: "段階",
    "zh-CN": "阶段",
  },
  "단서": {
    en: "Clue",
    ja: "手がかり",
    "zh-CN": "线索",
  },
  "단서 기록 추가": {
    en: "Clue Record Added",
    ja: "手がかり記録追加",
    "zh-CN": "新增线索记录",
  },
  "단서를 기억하세요!": {
    en: "Memorize the clues!",
    ja: "手がかりを覚えてください！",
    "zh-CN": "请记住线索！",
  },
  "단서를 놓쳤다...": {
    en: "Clue missed...",
    ja: "手がかりを逃した...",
    "zh-CN": "错过线索...",
  },
  "단서를 찾았다!": {
    en: "Clue found!",
    ja: "手がかりを見つけた！",
    "zh-CN": "找到线索！",
  },
  "단어 카드를 탭하면 슬롯에 배치됩니다": {
    en: "Tap word cards to place them in slots",
    ja: "単語カードをタップするとスロットに配置されます",
    "zh-CN": "点击单词卡即可放入槽位",
  },
  "단체 대화방": {
    en: "Group Chat Room",
    ja: "グループチャットルーム",
    "zh-CN": "群聊房间",
  },
  "단톡방 발언의 확인 여부와 확산 책임": {
    en: "Whether the Group Chat Statement Was Verified and Responsibility for Its Spread",
    ja: "グループチャット発言の確認有無と拡散責任",
    "zh-CN": "群聊发言是否经过确认及扩散责任",
  },
  "닫기": {
    en: "Close",
    ja: "閉じる",
    "zh-CN": "关闭",
  },
  "달성율": {
    en: "Completion Rate",
    ja: "達成率",
    "zh-CN": "完成率",
  },
  "답변의 균형이 흔들렸습니다. 기록과 진술을 이어 확인하면 빈틈을 좁힐 수 있습니다.": {
    en: "The balance of the answer has wavered. Connect the records and statements to narrow the gaps.",
    ja: "回答の均衡が揺らぎました。記録と陳述をつなげて確認すれば、隙を狭められます。",
    "zh-CN": "回答的平衡发生动摇。结合记录与陈述继续确认，可以缩小破绽。",
  },
  "답변의 빈틈이 커졌습니다. 아직 결론이 아니라 추가 질문과 증거 연결이 필요한 신호입니다.": {
    en: "The gap in the answer has widened. This is not a conclusion yet, but a signal that more questions and evidence connections are needed.",
    ja: "回答の隙が大きくなりました。まだ結論ではなく、追加質問と証拠のつながりが必要だという合図です。",
    "zh-CN": "回答中的破绽变大了。这还不是结论，而是需要追加提问并连接证据的信号。",
  },
  "답변이 궁지에 몰리며 진술의 일관성이 흔들린 점": {
    en: "The statement’s consistency wavered when the answer was pressed into a corner.",
    ja: "追い詰められる中で供述の一貫性が揺らいだ点",
    "zh-CN": "回答被逼入角后，陈述一致性发生动摇",
  },
  "답변이 짧아지고 있습니다": {
    en: "Answers are getting shorter",
    ja: "返答が短くなっています",
    "zh-CN": "回答正在变短",
  },
  "당사자": {
    en: "Party",
    ja: "当事者",
    "zh-CN": "当事人",
  },
  "당사자 소개": {
    en: "Party Profiles",
    ja: "当事者紹介",
    "zh-CN": "当事人介绍",
  },
  "당사자 A": {
    en: "Party A",
    ja: "当事者A",
    "zh-CN": "当事人A",
  },
  "당사자 B": {
    en: "Party B",
    ja: "当事者B",
    "zh-CN": "当事人B",
  },
  "당사자가 다시 방어 태세를 정돈했습니다. 같은 압박을 반복하기보다 다른 각도를 확인하십시오.": {
    en: "The party has regained a defensive posture. Rather than repeating the same pressure, check from another angle.",
    ja: "当事者は再び防御態勢を整えました。同じ圧迫を繰り返すより、別の角度を確認してください。",
    "zh-CN": "当事人重新整理了防御态势。与其重复同样的施压，不如从其他角度确认。",
  },
  "당사자가 실수로 정보를 흘릴 때 올라갑니다.\n높아지면 새로운 증거 단서가 드러나지만,\n너무 높으면 당사자가 경계합니다.": {
    en: "Rises when a party accidentally lets information slip.\nA higher meter reveals new evidence clues,\nbut if it rises too far, the party becomes guarded.",
    ja: "当事者がうっかり情報を漏らすと上昇します。\n高まると新しい証拠の手がかりが現れますが、\n高すぎると当事者が警戒します。",
    "zh-CN": "当当事人不慎透露信息时会上升。\n数值升高会显现新的证据线索，\n但过高会让当事人警觉。",
  },
  "당사자에게 질문하여\n거짓말을 흔들고\n진실에 가까워지세요.": {
    en: "Question the parties,\nshake their lies,\nand move closer to the truth.",
    ja: "当事者に質問し、\n嘘を揺さぶり、\n真実に近づいてください。",
    "zh-CN": "向当事人提问，\n动摇谎言，\n逐步接近真相。",
  },
  "당사자의 감정이 변합니다.\n너무 몰아붙이면 체념 상태에 빠지고,\n적절히 압박하면 자백을 유도할 수 있습니다.": {
    en: "A party’s emotions will change.\nPush too hard and they may become resigned;\napply the right pressure to draw out a confession.",
    ja: "当事者の感情は変化します。\n追い詰めすぎると諦念状態に陥り、\n適切に圧迫すれば自白を促せます。",
    "zh-CN": "当事人的情绪会变化。\n逼得太紧会陷入认命状态；\n适度施压则可引导供认。",
  },
  "당사자의 진술에서 모순을 발견하면 쌓입니다.\n모순이 누적될수록 거짓말이 흔들리고,\n결정적 순간에 추궁할 수 있습니다.": {
    en: "Builds when you find contradictions in a party’s statement.\nAs contradictions accumulate, lies begin to shake,\nand you can press at the decisive moment.",
    ja: "当事者の供述に矛盾を見つけると蓄積します。\n矛盾が重なるほど嘘は揺らぎ、\n決定的な瞬間に追及できます。",
    "zh-CN": "发现当事人陈述中的矛盾时会累积。\n矛盾越多，谎言越会动摇，\n并可在决定性瞬间追问。",
  },
  "당신은 재판관입니다.\n양쪽 당사자의 주장을 듣고\n진실을 밝혀 공정한 판결을 내리세요.": {
    en: "You are the Judge.\nListen to both parties’ claims,\nuncover the truth, and deliver a fair verdict.",
    ja: "あなたは裁判官です。\n双方の当事者の主張を聞き、\n真実を明らかにして公正な判決を下してください。",
    "zh-CN": "你是法官。\n请听取双方当事人的主张，\n查明真相并作出公正裁决。",
  },
  "당신의 첫 번째 사건이\n기다리고 있습니다.": {
    en: "Your first case\nis waiting.",
    ja: "あなたの最初の事件が\n待っています。",
    "zh-CN": "你的第一个案件\n正在等待。",
  },
  "당신의 판단:": {
    en: "Your Judgment:",
    ja: "あなたの判断:",
    "zh-CN": "你的判断：",
  },
  "당신의 판단은?": {
    en: "Your judgment?",
    ja: "あなたの判断は？",
    "zh-CN": "你的判断是？",
  },
  "대사 속도": {
    en: "Dialogue Speed",
    ja: "台詞速度",
    "zh-CN": "台词速度",
  },
  "대사 자동 재생": {
    en: "Auto-Play Dialogue",
    ja: "台詞の自動再生",
    "zh-CN": "自动播放台词",
  },
  "대상": {
    en: "Target",
    ja: "対象",
    "zh-CN": "对象",
  },
  "대상·내용": {
    en: "Subject · Details",
    ja: "対象·内容",
    "zh-CN": "对象·内容",
  },
  "대상을 선택하세요": {
    en: "Select a target",
    ja: "対象を選択してください",
    "zh-CN": "请选择对象",
  },
  "대조 필요": {
    en: "Needs Check",
    ja: "照合必要",
    "zh-CN": "需要核对",
  },
  "대화 중 반복적으로 드러나는 말버릇 정보입니다.": {
    en: "Speech habit info that appears repeatedly in conversation.",
    ja: "会話中に繰り返し現れる口癖情報です。",
    "zh-CN": "对话中反复显现的口头习惯信息。",
  },
  "대화 캡처 페이지": {
    en: "Chat Screenshot Page",
    ja: "会話スクリーンショットページ",
    "zh-CN": "对话截图页面",
  },
  "댓글": {
    en: "Comments",
    ja: "コメント",
    "zh-CN": "评论",
  },
  "댓글과 게시물, 캡처와 여론이 사건의 흐름을 바꿉니다.": {
    en: "Comments and posts, screenshots and public opinion change the flow of a case.",
    ja: "コメントと投稿、スクリーンショットと世論が事件の流れを変えます。",
    "zh-CN": "评论与帖子、截图与舆论改变案件的流向。",
  },
  "더 많은 정보가 필요합니다": {
    en: "More information is needed.",
    ja: "さらに情報が必要です。",
    "zh-CN": "需要更多信息。",
  },
  "더 보기 ↓": {
    en: "Show More ↓",
    ja: "もっと見る ↓",
    "zh-CN": "查看更多 ↓",
  },
  "더 숨기는 것보다 말하는 게 나을 수 있다고 느끼기 시작했습니다.": {
    en: "They are starting to feel that talking may be better than hiding more.",
    ja: "これ以上隠すより、話したほうがいいかもしれないと感じ始めています。",
    "zh-CN": "对方开始觉得，与其继续隐瞒，不如说出来。",
  },
  "더 압박한다": {
    en: "Press Harder",
    ja: "さらに圧迫する",
    "zh-CN": "继续施压",
  },
  "더 이상 레벨업이 불가합니다.": {
    en: "No further level-up is possible.",
    ja: "これ以上レベルアップできません。",
    "zh-CN": "无法继续升级。",
  },
  "더 추궁하여 방어를 무너뜨립니다": {
    en: "Press further to break down the defense.",
    ja: "さらに追及して防御を崩します。",
    "zh-CN": "进一步追问，瓦解防御。",
  },
  "더보기 ▼": {
    en: "More ▼",
    ja: "もっと見る ▼",
    "zh-CN": "查看更多 ▼",
  },
  "데이터 송수신에 일시적인 문제가 발생했습니다": {
    en: "A temporary problem occurred while sending or receiving data",
    ja: "データ送受信に一時的な問題が発生しました",
    "zh-CN": "数据收发暂时出现问题",
  },
  "도망칠 곳이 줄어든다": {
    en: "The Escape Routes Are Shrinking",
    ja: "逃げ場が減っていく",
    "zh-CN": "可逃避的余地正在减少",
  },
  "도전 가능": {
    en: "Available",
    ja: "挑戦可能",
    "zh-CN": "可挑战",
  },
  "도전하기": {
    en: "Start Challenge",
    ja: "挑戦する",
    "zh-CN": "开始挑战",
  },
  "돈과 믿음이 어긋나는 순간": {
    en: "When money and trust fall out of alignment",
    ja: "お金と信頼がずれる瞬間",
    "zh-CN": "金钱与信任错位的瞬间",
  },
  "돋보기": {
    en: "Magnifier",
    ja: "虫眼鏡",
    "zh-CN": "放大镜",
  },
  "돌봄과 기대, 의무와 애틋함이 서로를 시험합니다.": {
    en: "Care and expectation, duty and affection test one another.",
    ja: "介護と期待、義務と愛惜が互いを試します。",
    "zh-CN": "照护与期待、义务与眷恋相互考验。",
  },
  "돌파": {
    en: "Breakthrough",
    ja: "突破",
    "zh-CN": "突破",
  },
  "동기 단서": {
    en: "Motive Clue",
    ja: "動機の手がかり",
    "zh-CN": "动机线索",
  },
  "동기 비약": {
    en: "Motive Leap",
    ja: "動機の飛躍",
    "zh-CN": "动机跳跃",
  },
  "동기 탐색": {
    en: "Motive Probe",
    ja: "動機探索",
    "zh-CN": "动机探查",
  },
  "동기 탐색 결과 · 쟁점으로 이어질 수 있는 단서": {
    en: "Motive Probe Result · Clue that may lead to an issue",
    ja: "動機探索結果 · 争点につながる可能性のある手がかり",
    "zh-CN": "动机探查结果 · 可能引向争议点的线索",
  },
  "동기 탐색으로 숨겨진 연결고리를 발견했습니다 — 새로운 쟁점이 곧 드러날 수 있습니다": {
    en: "Motive probe uncovered a hidden connection — a new issue may soon surface",
    ja: "動機探索で隠れたつながりを発見しました — 新たな争点がまもなく現れる可能性があります",
    "zh-CN": "通过动机探查发现了隐藏关联——新的争议点可能很快浮现",
  },
  "동료 증언": {
    en: "Coworker Testimony",
    ja: "同僚の証言",
    "zh-CN": "同事证言",
  },
  "동선 늘리기": {
    en: "Stretching the Route",
    ja: "動線引き延ばし",
    "zh-CN": "拉长动线",
  },
  "동선 단서": {
    en: "Timeline Clue",
    ja: "時系列の手がかり",
    "zh-CN": "时间线线索",
  },
  "동업": {
    en: "Partnership",
    ja: "共同事業",
    "zh-CN": "合伙",
  },
  "동업 분쟁에서는 계약서 vs 실제 운영의 괴리가 핵심입니다. 서면 기록을 집중 조사하세요.": {
    en: "In partnership disputes, the gap between the contract and actual operations is key. Focus on written records.",
    ja: "共同事業の紛争では、契約書と実際の運営のずれが核心です。書面記録を重点的に調べてください。",
    "zh-CN": "合伙纠纷中，合同与实际运营之间的落差是关键。请重点调查书面记录。",
  },
  "동업자": {
    en: "Business Partner",
    ja: "共同事業者",
    "zh-CN": "合伙人",
  },
  "동업자 간 금전·신뢰 분쟁": {
    en: "Money and trust disputes between business partners",
    ja: "共同事業者間の金銭・信頼紛争",
    "zh-CN": "合伙人之间的金钱与信任纠纷",
  },
  "동요": {
    en: "Shaken",
    ja: "動揺",
    "zh-CN": "动摇",
  },
  "동요 — 흔들리고 있습니다": {
    en: "Shaken — visibly unsettled",
    ja: "動揺 — 揺らいでいます",
    "zh-CN": "动摇 — 正在动摇",
  },
  "동요 — 흔들리고 있지만 아직 부정하고 있습니다": {
    en: "Shaken — rattled, but still denying it",
    ja: "動揺 — 揺らいでいますが、まだ否定しています",
    "zh-CN": "动摇 — 已经动摇，但仍在否认",
  },
  "두 내용이 같은 사실관계를 서로 다르게 설명하고 있어 추가 확인이 필요합니다.": {
    en: "These two accounts describe the same facts differently, so further confirmation is needed.",
    ja: "この2つの内容は同じ事実関係を異なる形で説明しているため、追加確認が必要です。",
    "zh-CN": "这两段内容对同一事实关系作出了不同说明，需要进一步确认。",
  },
  "두 사람 사이에 쌓인 감정의 역사": {
    en: "The emotional history built up between the two",
    ja: "二人の間に積み重なった感情の歴史",
    "zh-CN": "两人之间累积的情绪历史",
  },
  "두 사람은 당장 결론을 크게 말하기보다, 다시 확인해야 할 기록과 남은 말을 먼저 나누어 적었다.": {
    en: "The two did not rush to declare a conclusion; instead, they first separated the records to check again from the words left unsaid.",
    ja: "二人はすぐに結論を大きく語るよりも、再確認すべき記録と残った言葉を先に分けて書き出した。",
    "zh-CN": "两人没有急着大声宣告结论，而是先把需要重新确认的记录和没说完的话分别写下。",
  },
  "두 사람은 먼저 연락하기보다 각자 남은 기록을 정리했습니다.": {
    en: "Rather than contacting each other immediately, the two first sorted through their remaining records.",
    ja: "二人はすぐに連絡を取るよりも、まず残った記録をそれぞれ整理しました。",
    "zh-CN": "两人没有立刻联系，而是先各自整理尚未处理的记录。",
  },
  "두려움": {
    en: "Fear",
    ja: "恐れ",
    "zh-CN": "恐惧",
  },
  "등장하는 사건은 가상이며, 실제 판례와 다를 수 있습니다": {
    en: "All cases are fictional and may differ from real precedents",
    ja: "登場する事件は架空であり、実際の判例とは異なる場合があります",
    "zh-CN": "出现的案件均为虚构，可能与实际判例不同",
  },
  "디지털 기기": {
    en: "Digital Device",
    ja: "デジタル機器",
    "zh-CN": "数字设备",
  },
  "따뜻한 공감과 관대한 시선으로 원칙을 수호하는 타입입니다.": {
    en: "A type that protects principles through warm empathy and a generous perspective.",
    ja: "温かな共感と寛容な視線で原則を守るタイプです。",
    "zh-CN": "以温暖共情和宽容视角守护原则的类型。",
  },
  "또? 지난달도 그랬잖아": {
    en: "Again? You said that last month too.",
    ja: "また？ 先月もそう言ってたじゃない。",
    "zh-CN": "又来？上个月不也是这样吗？",
  },
  "레벨별 효과": {
    en: "Effects by Level",
    ja: "レベル別効果",
    "zh-CN": "分等级效果",
  },
  "리더보드": {
    en: "Leaderboard",
    ja: "リーダーボード",
    "zh-CN": "排行榜",
  },
  "마이너 퍼크": {
    en: "Minor Perks",
    ja: "マイナーパーク",
    "zh-CN": "次要特权",
  },
  "말년 유서 작성 경위와 개입 정도": {
    en: "Late-Life Will Writing and Degree of Involvement",
    ja: "晩年の遺言書作成経緯と介入度",
    "zh-CN": "晚年遗嘱撰写经过与介入程度",
  },
  "말년의 종이": {
    en: "Paper from the Final Years",
    ja: "晩年の紙",
    "zh-CN": "晚年的纸张",
  },
  "말버릇": {
    en: "Speech Habit",
    ja: "口癖",
    "zh-CN": "口头习惯",
  },
  "말실수가 나왔습니다.": {
    en: "A slip of the tongue has emerged.",
    ja: "失言が出ました。",
    "zh-CN": "出现了口误。",
  },
  "말씀드리겠습니다. 감정이 앞섰지만, 피하지 않고 사실관계를 이어서 말하겠습니다.": {
    en: "I will explain. My emotions got ahead of me, but I will not avoid it and will continue with the facts.",
    ja: "お話しします。感情が先走りましたが、避けずに事実関係を続けて話します。",
    "zh-CN": "我会说明。虽然情绪先冲了出来，但我不会回避，会继续说明事实关系。",
  },
  "말이 달라지기 시작했습니다. 지금 파고들면 숨기고 있던 것이 나올 수 있습니다.": {
    en: "Their story is starting to change. Dig in now, and something hidden may come out.",
    ja: "発言が変わり始めました。今踏み込めば、隠していたことが出てくるかもしれません。",
    "zh-CN": "对方的话开始变化。现在深入追问，可能会带出隐藏的内容。",
  },
  "말투": {
    en: "Speech Style",
    ja: "話し方",
    "zh-CN": "说话方式",
  },
  "말투:": {
    en: "Speech Style:",
    ja: "話し方:",
    "zh-CN": "说话方式：",
  },
  "망치": {
    en: "Gavel",
    ja: "木槌",
    "zh-CN": "法槌",
  },
  "맥락": {
    en: "Context",
    ja: "文脈",
    "zh-CN": "语境",
  },
  "맥락 단서": {
    en: "Context Clue",
    ja: "文脈の手がかり",
    "zh-CN": "背景线索",
  },
  "맥락 복원": {
    en: "Restore Context",
    ja: "文脈を復元",
    "zh-CN": "还原语境",
  },
  "맨날 나중에래": {
    en: "It's always 'later.'",
    ja: "いつも後でって言う。",
    "zh-CN": "每次都说晚点。",
  },
  "먼저 대상을 선택하세요.": {
    en: "Select a target first.",
    ja: "先に対象を選択してください。",
    "zh-CN": "请先选择对象。",
  },
  "먼저 질문할 대상을 선택하세요": {
    en: "Select a target first",
    ja: "先に質問対象を選択してください",
    "zh-CN": "请先选择提问对象",
  },
  "먼저 표면 정황을 확인할 질문을 선택하세요. 답변이 이어질수록 질문이 구체화됩니다.": {
    en: "First choose a question to check the surface circumstances. As answers continue, the questions become more specific.",
    ja: "まず表面上の状況を確認する質問を選んでください。回答が続くほど、質問は具体化します。",
    "zh-CN": "请先选择用于确认表面情况的问题。随着回答推进，问题会逐渐具体。",
  },
  "메신저: 새 메시지 1건": {
    en: "Messenger: 1 new message",
    ja: "メッセンジャー：新着メッセージ1件",
    "zh-CN": "聊天软件：1条新消息",
  },
  "메이저 퍼크": {
    en: "Major Perks",
    ja: "メジャーパーク",
    "zh-CN": "主要特权",
  },
  "메이저 퍼크는 숙련 등급(10건) 이상에서 해금": {
    en: "Major perks unlock at Skilled rank (10 cases) or higher",
    ja: "メジャーパークは熟練ランク（10件）以上で解放",
    "zh-CN": "主要特权在熟练等级（10 件）以上解锁",
  },
  "메일과 규정, 평가와 소문이 일의 얼굴을 바꿔 놓습니다.": {
    en: "Emails and rules, evaluations and rumors change the face of work.",
    ja: "メールと規定、評価と噂が仕事の顔を変えてしまいます。",
    "zh-CN": "邮件与规定、评价与传闻改变工作的面貌。",
  },
  "메타데이터": {
    en: "Metadata",
    ja: "メタデータ",
    "zh-CN": "元数据",
  },
  "명성 등급": {
    en: "Reputation Rank",
    ja: "名声ランク",
    "zh-CN": "声望等级",
  },
  "명성 포인트": {
    en: "Reputation Points",
    ja: "名声ポイント",
    "zh-CN": "声望点数",
  },
  "명예의 전당": {
    en: "Hall of Fame",
    ja: "殿堂",
    "zh-CN": "名人堂",
  },
  "명예의 전당 기록이 없습니다.": {
    en: "No Hall of Fame records.",
    ja: "殿堂入り記録はありません。",
    "zh-CN": "暂无名人堂记录。",
  },
  "모든 글자가 배치되었습니다": {
    en: "All letters have been placed",
    ja: "すべての文字が配置されました",
    "zh-CN": "所有文字已放置",
  },
  "모든 쟁점 S3 이상 도달": {
    en: "Reach S3+ on All Issues",
    ja: "すべての争点でS3以上に到達",
    "zh-CN": "所有争议点达到S3以上",
  },
  "모든 쟁점을 판단하세요 (": {
    en: "Judge all issues (",
    ja: "すべての争点を判断してください (",
    "zh-CN": "请判断所有争议点 (",
  },
  "모든 쟁점의 거짓말을 붕괴시켰습니다.": {
    en: "Broke down the lie behind every issue.",
    ja: "すべての争点の嘘を崩しました。",
    "zh-CN": "击溃所有争议点中的谎言。",
  },
  "모든 조합을 발견했습니다.": {
    en: "Found every combination.",
    ja: "すべての組み合わせを発見しました。",
    "zh-CN": "发现全部组合。",
  },
  "모든 증거 제시": {
    en: "Present All Evidence",
    ja: "すべての証拠を提示",
    "zh-CN": "提交全部证据",
  },
  "모든 증거 풀조사": {
    en: "Fully Investigate All Evidence",
    ja: "すべての証拠を完全調査",
    "zh-CN": "完整调查全部证据",
  },
  "모든 증거 해금": {
    en: "Unlock All Evidence",
    ja: "すべての証拠を解放",
    "zh-CN": "解锁全部证据",
  },
  "모든 증인 소환": {
    en: "Summon All Witnesses",
    ja: "すべての証人を召喚",
    "zh-CN": "召唤全部证人",
  },
  "모든 증인을 소환했다.": {
    en: "All witnesses have been summoned.",
    ja: "すべての証人を召喚しました。",
    "zh-CN": "已传唤所有证人。",
  },
  "모든 짝을 찾았다!": {
    en: "All pairs found!",
    ja: "すべてのペアを見つけた！",
    "zh-CN": "已找出全部配对！",
  },
  "모든 체크리스트를 채우고 남은 연결 고리를 없애면 100% 클리어입니다.": {
    en: "Reach 100% by completing every checklist item and clearing all remaining links.",
    ja: "すべてのチェック項目を満たし、残った接続をなくすと100%達成です。",
    "zh-CN": "完成全部清单并消除剩余连接后即可达到100%。",
  },
  "모르겠다": {
    en: "Unsure",
    ja: "わからない",
    "zh-CN": "不确定",
  },
  "모순 발견": {
    en: "Contradiction Found",
    ja: "矛盾発見",
    "zh-CN": "发现矛盾",
  },
  "모순 추궁": {
    en: "Press Contradiction",
    ja: "矛盾を追及",
    "zh-CN": "追问矛盾",
  },
  "모순 추궁 성공": {
    en: "Successfully Press a Contradiction",
    ja: "矛盾の追及に成功",
    "zh-CN": "成功追问矛盾",
  },
  "모순 토큰 ↑": {
    en: "Contradiction Token ↑",
    ja: "矛盾トークン ↑",
    "zh-CN": "矛盾令牌 ↑",
  },
  "모순을 넘겼습니다. 모순 토큰은 유지됩니다.": {
    en: "You let the contradiction pass. The contradiction token remains.",
    ja: "矛盾を見送りました。矛盾トークンは維持されます。",
    "zh-CN": "已放过该矛盾。矛盾令牌仍会保留。",
  },
  "모순을 밝혀냈다!": {
    en: "Contradiction Exposed!",
    ja: "矛盾を暴いた！",
    "zh-CN": "揭开矛盾！",
  },
  "모순을 지적한다": {
    en: "Point Out Contradiction",
    ja: "矛盾を指摘する",
    "zh-CN": "指出矛盾",
  },
  "모순을 지적했습니다! 방어가 흔들립니다.": {
    en: "A contradiction was identified. The defense is shaken.",
    ja: "矛盾を指摘しました。防御が揺らぎます。",
    "zh-CN": "已指出矛盾。防线开始动摇。",
  },
  "모순을 찌른다": {
    en: "Press the Contradiction",
    ja: "矛盾を突く",
    "zh-CN": "追问矛盾",
  },
  "모순을 파고든다": {
    en: "Dig Into the Contradiction",
    ja: "矛盾を掘り下げる",
    "zh-CN": "深挖矛盾",
  },
  "모호": {
    en: "Ambiguous",
    ja: "曖昧",
    "zh-CN": "模糊",
  },
  "모호성이 높은 쟁점": {
    en: "High-Ambiguity Issue",
    ja: "曖昧性の高い争点",
    "zh-CN": "高模糊性争议点",
  },
  "목돈 출금 흔적과 설명되지 않은 사용처를 확인해야 합니다.": {
    en: "Check the large withdrawal trail and where the money went without explanation.",
    ja: "まとまった出金の痕跡と、説明されていない使途を確認する必要があります。",
    "zh-CN": "需要确认大额取款痕迹，以及未说明的用途。",
  },
  "무슨 결심? ㅋㅋ": {
    en: "What decision? lol",
    ja: "何の決心？笑",
    "zh-CN": "什么决定？哈哈",
  },
  "무엇을 먼저 숨겼는지": {
    en: "What Was Hidden First",
    ja: "何を先に隠したのか",
    "zh-CN": "最先隐瞒了什么",
  },
  "무작위": {
    en: "Random",
    ja: "ランダム",
    "zh-CN": "随机",
  },
  "문 하나 사이의 생활 전쟁": {
    en: "A domestic war across a single door",
    ja: "扉一枚を挟んだ生活戦争",
    "zh-CN": "一门之隔的生活战争",
  },
  "문서 사본": {
    en: "Document Copy",
    ja: "文書写し",
    "zh-CN": "文件副本",
  },
  "문자": {
    en: "Text",
    ja: "メッセージ",
    "zh-CN": "短信",
  },
  "문자와 구매 품목이 같은 가족 쪽 정황을 가리킵니다. 누구와 관련된 일인지와 왜 숨겼는지를 따로 확인해야 합니다.": {
    en: "The text messages and purchased items point to the same family circumstances. You need to separately confirm who they concern and why they were hidden.",
    ja: "メッセージと購入品は同じ家族側の事情を示しています。誰に関することか、なぜ隠したのかを別々に確認する必要があります。",
    "zh-CN": "短信和购买物品指向同一条家族方面的情况。需要分别确认这与谁有关，以及为什么被隐瞒。",
  },
  "문장을 완벽하게 재조합했습니다": {
    en: "You perfectly reconstructed the sentence",
    ja: "文を完璧に再構成しました",
    "zh-CN": "已完美重组句子",
  },
  "문장을 완성하지 못했습니다": {
    en: "Could not complete the sentence",
    ja: "文を完成できませんでした",
    "zh-CN": "未能完成句子",
  },
  "문제가 반복되면 아래 버튼으로 알려주세요.": {
    en: "If the problem continues, let us know with the button below.",
    ja: "問題が繰り返される場合は、下のボタンからお知らせください。",
    "zh-CN": "如果问题反复出现，请通过下方按钮告知我们。",
  },
  "묻어둔 일": {
    en: "Buried Matter",
    ja: "伏せられた出来事",
    "zh-CN": "被埋藏的事",
  },
  "미감별": {
    en: "Unassessed",
    ja: "未判定",
    "zh-CN": "未鉴别",
  },
  "미공개": {
    en: "Undisclosed",
    ja: "非公開",
    "zh-CN": "未公开",
  },
  "미기록": {
    en: "Unrecorded",
    ja: "未記録",
    "zh-CN": "未记录",
  },
  "미니게임 스킵": {
    en: "Skip Minigame",
    ja: "ミニゲームをスキップ",
    "zh-CN": "跳过小游戏",
  },
  "미발견": {
    en: "Undiscovered",
    ja: "未発見",
    "zh-CN": "未发现",
  },
  "미선택": {
    en: "Not Selected",
    ja: "未選択",
    "zh-CN": "未选择",
  },
  "미숙": {
    en: "Inexperienced",
    ja: "未熟",
    "zh-CN": "生疏",
  },
  "미숙한 재판관": {
    en: "Novice Judge",
    ja: "未熟な裁判官",
    "zh-CN": "生疏法官",
  },
  "미완료": {
    en: "Incomplete",
    ja: "未完了",
    "zh-CN": "未完成",
  },
  "미판단": {
    en: "Undecided",
    ja: "未判断",
    "zh-CN": "未判断",
  },
  "미해명 사항": {
    en: "Unexplained Points",
    ja: "未解明事項",
    "zh-CN": "未说明事项",
  },
  "민감 포인트": {
    en: "Sensitive Points",
    ja: "敏感ポイント",
    "zh-CN": "敏感点",
  },
  "민감한 가족 사정": {
    en: "Sensitive Family Circumstances",
    ja: "デリケートな家族事情",
    "zh-CN": "敏感的家庭情况",
  },
  "민아": {
    en: "Min-a",
    ja: "ミナ",
    "zh-CN": "敏雅",
  },
  "민준": {
    en: "Min-jun",
    ja: "ミンジュン",
    "zh-CN": "民俊",
  },
  "믿고 맡긴 만큼 더 무거워지는 책임": {
    en: "Responsibility Grows Heavier with Trust",
    ja: "信じて任せた分だけ重くなる責任",
    "zh-CN": "越是信任托付，责任越重",
  },
  "밀어붙인다": {
    en: "Push Harder",
    ja: "押し切る",
    "zh-CN": "继续施压",
  },
  "바로 판결할 수도 있고, 조건부 조정이나 일부 보류를 선택할 수도 있습니다. 미확정 쟁점이 있으면 더 심리할 수 있습니다.": {
    en: "You can issue a verdict now, choose conditional mediation, or defer part of the case. If any issue remains unresolved, you may examine it further.",
    ja: "すぐ判決を出すことも、条件付き調整や一部保留を選ぶこともできます。未確定の争点があれば、さらに審理できます。",
    "zh-CN": "你可以直接作出判决，也可以选择有条件调解或部分保留。若仍有未确定争议点，可继续审理。",
  },
  "박미라": {
    en: "Park Mi-ra",
    ja: "パク・ミラ",
    "zh-CN": "朴美罗",
  },
  "박서연": {
    en: "Park Seo-yeon",
    ja: "パク・ソヨン",
    "zh-CN": "朴瑞妍",
  },
  "박순애": {
    en: "Park Sun-ae",
    ja: "パク・スネ",
    "zh-CN": "朴顺爱",
  },
  "박준혁": {
    en: "Park Jun-hyeok",
    ja: "パク・ジュンヒョク",
    "zh-CN": "朴俊赫",
  },
  "반격 억제": {
    en: "Counterattack Suppressed",
    ja: "反撃抑制",
    "zh-CN": "反击抑制",
  },
  "반박": {
    en: "Rebuttal",
    ja: "反論",
    "zh-CN": "反驳",
  },
  "반박 진술": {
    en: "Rebuttal Statement",
    ja: "反論陳述",
    "zh-CN": "反驳陈述",
  },
  "반복 연락의 겉면": {
    en: "Surface of Repeated Contact",
    ja: "繰り返す連絡の表面",
    "zh-CN": "反复联系的表象",
  },
  "반복 연락의 목적과 방식": {
    en: "Purpose and Pattern of Repeated Contact",
    ja: "繰り返された連絡の目的と方式",
    "zh-CN": "重复联系的目的与方式",
  },
  "반복된 부탁 흐름": {
    en: "Pattern of Repeated Requests",
    ja: "繰り返された頼みの流れ",
    "zh-CN": "反复请求的脉络",
  },
  "받기": {
    en: "Claim",
    ja: "受け取る",
    "zh-CN": "领取",
  },
  "발견": {
    en: "Discovery",
    ja: "発見",
    "zh-CN": "发现",
  },
  "발견된 모순": {
    en: "Contradictions Found",
    ja: "発見された矛盾",
    "zh-CN": "发现的矛盾",
  },
  "발견한 증거를 제시하면\n당사자의 거짓말이\n더 빨리 무너집니다.": {
    en: "Present discovered evidence\nto make a party’s lies\ncollapse faster.",
    ja: "発見した証拠を提示すると、\n当事者の嘘が\nより早く崩れます。",
    "zh-CN": "出示已发现的证据，\n可让当事人的谎言\n更快瓦解。",
  },
  "발신": {
    en: "Outgoing",
    ja: "発信",
    "zh-CN": "发出",
  },
  "발신자 미상": {
    en: "Unknown Sender",
    ja: "送信者不明",
    "zh-CN": "未知发件人",
  },
  "발언을 제지합니다. 차례를 기다리십시오.": {
    en: "Stop the statement. Wait your turn.",
    ja: "発言を制止します。順番をお待ちください。",
    "zh-CN": "制止发言。请等待轮到你。",
  },
  "발언을 허용합니다.": {
    en: "I will allow the statement.",
    ja: "発言を許可します。",
    "zh-CN": "允许发言。",
  },
  "발언이 끼어들었습니다.": {
    en: "A statement has interrupted the flow.",
    ja: "発言が割り込みました。",
    "zh-CN": "有人插话。",
  },
  "방금 진술": {
    en: "Latest Statement",
    ja: "直前の陳述",
    "zh-CN": "刚才陈述",
  },
  "방문 동선 카드": {
    en: "Visit Route Card",
    ja: "訪問動線カード",
    "zh-CN": "探访动线卡",
  },
  "방문 및 처리 기록": {
    en: "Visit & Handling Records",
    ja: "訪問および処理記録",
    "zh-CN": "访问及处理记录",
  },
  "방문 이유와 통화 맥락": {
    en: "Visit Reason and Call Context",
    ja: "訪問理由と通話の文脈",
    "zh-CN": "探访理由与通话语境",
  },
  "방어": {
    en: "Defensive",
    ja: "防御",
    "zh-CN": "防御",
  },
  "방어 붕괴": {
    en: "Defense Collapse",
    ja: "防御崩壊",
    "zh-CN": "防御瓦解",
  },
  "방어 완화": {
    en: "Defense Eased",
    ja: "防御緩和",
    "zh-CN": "防御缓和",
  },
  "방어가 흔들리고 체념 반응이 보입니다. 자백을 강요하지 말고 확인된 사실부터 정리하십시오.": {
    en: "The defense is wavering and signs of resignation are visible. Do not force a confession; organize the confirmed facts first.",
    ja: "防御が揺らぎ、諦めの反応が見えます。自白を強要せず、確認済みの事実から整理してください。",
    "zh-CN": "防御正在动摇，并出现放弃反应。不要强迫自白，请先整理已确认的事实。",
  },
  "방어가 흔들린다": {
    en: "Defense Is Shaking",
    ja: "防御が揺らぐ",
    "zh-CN": "防御开始动摇",
  },
  "방어력이 높아 거짓말을 흔들기 어렵습니다. 논리적으로 답변하여 빈틈이 적습니다.": {
    en: "High defense makes lies hard to shake. Answers logically, leaving few openings.",
    ja: "防御力が高く、嘘を揺さぶりにくい状態です。論理的に答えるため隙が少なめです。",
    "zh-CN": "防御力较高，谎言难以动摇。会以逻辑方式回答，破绽较少。",
  },
  "방어선이 무너졌습니다!": {
    en: "The defensive line has collapsed.",
    ja: "防御線が崩れました。",
    "zh-CN": "防线已经瓦解。",
  },
  "방어에 금이 갔습니다!": {
    en: "Their defense has cracked.",
    ja: "防御に亀裂が入りました。",
    "zh-CN": "防线出现了裂痕。",
  },
  "방어적 — 신중하게 말을 고르고 있습니다": {
    en: "Defensive — choosing words carefully",
    ja: "防御的 — 慎重に言葉を選んでいます",
    "zh-CN": "防御 — 正在谨慎措辞",
  },
  "방어적 — 신중하게 말을 고릅니다": {
    en: "Defensive — choosing words carefully",
    ja: "防御的 — 慎重に言葉を選びます",
    "zh-CN": "防御性 — 谨慎斟酌措辞",
  },
  "배경 상황": {
    en: "Background",
    ja: "背景状況",
    "zh-CN": "背景情况",
  },
  "배경음악": {
    en: "Background Music",
    ja: "BGM",
    "zh-CN": "背景音乐",
  },
  "배분": {
    en: "Allocation",
    ja: "配分",
    "zh-CN": "分配",
  },
  "배치된 글자를 탭하면 교환할 수 있습니다": {
    en: "Tap a placed letter to swap it",
    ja: "配置済みの文字をタップすると交換できます",
    "zh-CN": "点击已放置的文字即可交换",
  },
  "뱅킹앱: 이체 완료 (200만원)": {
    en: "Banking app: Transfer completed (₩2M)",
    ja: "銀行アプリ：振込完了（200万ウォン）",
    "zh-CN": "银行App：转账完成（200万韩元）",
  },
  "뱅킹앱: 잔액 부족 알림": {
    en: "Banking app: Low balance alert",
    ja: "銀行アプリ：残高不足通知",
    "zh-CN": "银行App：余额不足提醒",
  },
  "범인 +1": {
    en: "Culprit +1",
    ja: "犯人 +1",
    "zh-CN": "犯人 +1",
  },
  "범인 제압 +1": {
    en: "Subdue Culprit +1",
    ja: "犯人制圧 +1",
    "zh-CN": "制服犯人 +1",
  },
  "법리": {
    en: "Legal Reasoning",
    ja: "法理",
    "zh-CN": "法理",
  },
  "법적 정리": {
    en: "Legal Settlement",
    ja: "法的整理",
    "zh-CN": "法律整理",
  },
  "법정 대화형 게임의 후일담을 한국어로 작성하라.": {
    en: "Write the epilogue for an interactive courtroom game in English.",
    ja: "法廷対話型ゲームの後日談を日本語で書きなさい。",
    "zh-CN": "请用简体中文撰写法庭互动游戏的后日谈。",
  },
  "법정 장악": {
    en: "Courtroom Control",
    ja: "法廷掌握",
    "zh-CN": "法庭掌控",
  },
  "법정 장악 1을 써서 기록을 다시 훑고 조사 토큰 1을 회복했습니다.": {
    en: "Spent 1 Courtroom Control to review the record again and recover 1 Investigation Token.",
    ja: "法廷統制1を使って記録を再確認し、調査トークン1を回復しました。",
    "zh-CN": "消耗 1 点法庭控制重新查看记录，并恢复 1 个调查代币。",
  },
  "법정 장악을 확보했습니다.": {
    en: "Courtroom Control secured.",
    ja: "法廷掌握を確保しました。",
    "zh-CN": "已取得法庭掌控。",
  },
  "법정 장악이 부족해 기록 재정리를 진행할 수 없습니다.": {
    en: "Not enough Courtroom Control to reorganize the records.",
    ja: "法廷統制が不足しているため、記録の再整理を進められません。",
    "zh-CN": "法庭控制不足，无法重新整理记录。",
  },
  "법정 통제": {
    en: "Courtroom Control",
    ja: "法廷統制",
    "zh-CN": "法庭控制",
  },
  "변명": {
    en: "Excuse",
    ja: "弁明",
    "zh-CN": "辩解",
  },
  "변명이 통하지 않는다는 걸 본인도 느끼고 있습니다. 어떻게 압박하시겠습니까?": {
    en: "They can feel their excuses no longer work. How will you press them?",
    ja: "言い訳が通じないことを本人も感じています。どう圧迫しますか？",
    "zh-CN": "对方也感觉到借口已经行不通。你要如何施压？",
  },
  "변제": {
    en: "Repayment",
    ja: "弁済",
    "zh-CN": "清偿",
  },
  "보내기": {
    en: "Send",
    ja: "送信",
    "zh-CN": "发送",
  },
  "보너스": {
    en: "Bonus",
    ja: "ボーナス",
    "zh-CN": "奖励",
  },
  "보류": {
    en: "Deferred",
    ja: "保留",
    "zh-CN": "暂缓",
  },
  "보류된 판결": {
    en: "Deferred Verdict",
    ja: "保留中の判決",
    "zh-CN": "已暂缓裁决",
  },
  "보복 우려": {
    en: "Fear of Retaliation",
    ja: "報復への恐れ",
    "zh-CN": "报复顾虑",
  },
  "보복 우려 -10, 3턴간 끼어들기 차단": {
    en: "Fear of retaliation -10, blocks interruptions for 3 turns",
    ja: "報復への恐れ -10、3ターン割り込みを遮断",
    "zh-CN": "报复顾虑 -10，阻止插话3回合",
  },
  "보상 조각": {
    en: "Reward Fragments",
    ja: "報酬フラグメント",
    "zh-CN": "奖励碎片",
  },
  "보상 획득": {
    en: "Reward Acquired",
    ja: "報酬獲得",
    "zh-CN": "获得奖励",
  },
  "보상 획득!": {
    en: "Reward Claimed!",
    ja: "報酬獲得！",
    "zh-CN": "获得奖励！",
  },
  "보스 +3": {
    en: "Boss +3",
    ja: "ボス +3",
    "zh-CN": "Boss +3",
  },
  "보스 범인 제압 +3": {
    en: "Subdue Boss Culprit +3",
    ja: "ボス犯人制圧 +3",
    "zh-CN": "制服Boss犯人 +3",
  },
  "보유": {
    en: "Owned",
    ja: "所持",
    "zh-CN": "拥有",
  },
  "보유 조각을 확인하고 교환합니다.": {
    en: "Check and exchange owned fragments.",
    ja: "所持しているかけらを確認し、交換します。",
    "zh-CN": "查看并交换持有碎片。",
  },
  "보유 칭호": {
    en: "Owned Titles",
    ja: "所持称号",
    "zh-CN": "拥有称号",
  },
  "보유 칭호를 슬롯에 배치합니다.": {
    en: "Place an owned title in a slot.",
    ja: "所持称号をスロットに配置します。",
    "zh-CN": "将拥有称号放入槽位。",
  },
  "보조 증거": {
    en: "Supporting Evidence",
    ja: "補助証拠",
    "zh-CN": "辅助证据",
  },
  "보증금, 하자, 책임 회피가 좁은 공간 안에서 충돌합니다.": {
    en: "Deposits, defects, and evasion of responsibility collide in a narrow space.",
    ja: "保証金、瑕疵、責任回避が狭い空間で衝突します。",
    "zh-CN": "押金、瑕疵与责任回避在狭小空间中冲突。",
  },
  "보통": {
    en: "Medium",
    ja: "普通",
    "zh-CN": "中等",
  },
  "보통의 재판관": {
    en: "Average Judge",
    ja: "普通の裁判官",
    "zh-CN": "普通法官",
  },
  "봉인 정보 경계": {
    en: "Boundaries for Sealed Information",
    ja: "封印情報の境界",
    "zh-CN": "封存信息边界",
  },
  "봉합": {
    en: "Repair",
    ja: "修復",
    "zh-CN": "修复",
  },
  "부가": {
    en: "Supplementary",
    ja: "補足",
    "zh-CN": "附加",
  },
  "부가세": {
    en: "VAT",
    ja: "消費税",
    "zh-CN": "增值税",
  },
  "부드러운 접근으로 자백을 유도합니다": {
    en: "Use a gentler approach to draw out a confession.",
    ja: "穏やかなアプローチで自白を促します。",
    "zh-CN": "用温和接近引导供认。",
  },
  "부부": {
    en: "Married Couple",
    ja: "夫婦",
    "zh-CN": "夫妻",
  },
  "부부 간 갈등과 신뢰 문제": {
    en: "Marital conflict and trust issues",
    ja: "夫婦間の葛藤と信頼問題",
    "zh-CN": "夫妻间的矛盾与信任问题",
  },
  "부분": {
    en: "Partial",
    ja: "部分",
    "zh-CN": "部分",
  },
  "부분 신뢰": {
    en: "Partial Trust",
    ja: "部分信頼",
    "zh-CN": "部分信任",
  },
  "부재중·변경": {
    en: "Missed/Changed",
    ja: "不在・変更",
    "zh-CN": "未接·变更",
  },
  "분류": {
    en: "Category",
    ja: "分類",
    "zh-CN": "分类",
  },
  "분리 심문": {
    en: "Separate Questioning",
    ja: "分離尋問",
    "zh-CN": "分开询问",
  },
  "분리 심문 사용": {
    en: "Use Separate Questioning",
    ja: "分離尋問を使用",
    "zh-CN": "使用分开询问",
  },
  "분석 완료 — 탭해서 확인": {
    en: "Analysis complete — tap to view",
    ja: "分析完了 — タップして確認",
    "zh-CN": "分析完成 — 点击查看",
  },
  "불러오는 중...": {
    en: "Loading...",
    ja: "読み込み中...",
    "zh-CN": "加载中...",
  },
  "불리한 순서를 동선과 기사로 길게 늘어 말하며 핵심을 흐리는 습관입니다.": {
    en: "A habit of stretching unfavorable sequences into long explanations of movements and accounts, blurring the key point.",
    ja: "不利な順序を動線や事情で長く引き延ばして話し、核心をぼかす癖です。",
    "zh-CN": "习惯把不利顺序用动线和说法拖长，模糊核心。",
  },
  "불만이 남지만 질서는 세운 결말": {
    en: "An ending where discontent remains, but order is restored",
    ja: "不満は残るが秩序を立てた結末",
    "zh-CN": "仍有不满但建立起秩序的结局",
  },
  "불충분 심리": {
    en: "Insufficient Review",
    ja: "審理不十分",
    "zh-CN": "审理不足",
  },
  "불편한 지적을 농담으로 흉려 긴장을 피하려는 버릇입니다.": {
    en: "A habit of brushing off uncomfortable criticism with jokes to avoid tension.",
    ja: "不快な指摘を冗談で流し、緊張を避けようとする癖です。",
    "zh-CN": "习惯用玩笑带过不舒服的指摘，以回避紧张。",
  },
  "블랙박스 GPS 로그 — {count}건": {
    en: "Dashcam GPS Log — {count} entries",
    ja: "ドライブレコーダーGPSログ — {count}件",
    "zh-CN": "行车记录仪 GPS 日志 — {count}条",
  },
  "비공개": {
    en: "Private",
    ja: "非公開",
    "zh-CN": "不公开",
  },
  "비공개 경로": {
    en: "Private Route",
    ja: "非公開経路",
    "zh-CN": "非公开路径",
  },
  "비공개 보호": {
    en: "Private Protection",
    ja: "非公開保護",
    "zh-CN": "不公开保护",
  },
  "비공개 보호 사용": {
    en: "Use Private Protection",
    ja: "非公開保護を使用",
    "zh-CN": "使用非公开保护",
  },
  "비공개 보호 약속": {
    en: "Confidentiality Promise",
    ja: "非公開保護の約束",
    "zh-CN": "不公开保护承诺",
  },
  "비공개 보호 토글이 해금됩니다.\nAI 진술 분석도 사용 가능합니다.": {
    en: "The private-info protection toggle is unlocked.\nAI statement analysis also becomes available.",
    ja: "非公開保護トグルが解放されます。\nAI供述分析も使用できます。",
    "zh-CN": "非公开信息保护开关将解锁。\n也可使用 AI 陈述分析。",
  },
  "비공개 약속을 어기면 권위 점수가 크게 감소합니다.": {
    en: "Breaking a confidentiality promise will greatly reduce your Authority score.",
    ja: "非公開の約束を破ると権威スコアが大きく減少します。",
    "zh-CN": "违反不公开承诺会大幅降低权威分数。",
  },
  "비공개 정보 차단": {
    en: "Block Private Info",
    ja: "非公開情報の遮断",
    "zh-CN": "拦截非公开信息",
  },
  "비공개 진술": {
    en: "Private Statement",
    ja: "非公開陳述",
    "zh-CN": "不公开陈述",
  },
  "비공개 확인": {
    en: "Private Check",
    ja: "非公開確認",
    "zh-CN": "不公开确认",
  },
  "비공개 확인 경로가 열렸습니다": {
    en: "Private Confirmation Route Opened",
    ja: "非公開確認ルートが開きました",
    "zh-CN": "不公开确认路径已开启",
  },
  "비공개 확인 경로가 열렸습니다 — 공감 접근으로 자백을 이끌어낼 수 있습니다": {
    en: "A private confirmation route has opened — empathy approach may draw out a confession",
    ja: "非公開確認ルートが開きました — 共感アプローチで自白を引き出せる可能性があります",
    "zh-CN": "不公开确认路径已开启——可以通过共情接近引出自白",
  },
  "비공개로 사실을 확인합니다 (방어 반응 없음)": {
    en: "Confirm facts privately (no defensive reaction)",
    ja: "非公開で事実を確認します（防御反応なし）",
    "zh-CN": "不公开确认事实（无防御反应）",
  },
  "비교": {
    en: "Compare",
    ja: "比較",
    "zh-CN": "比较",
  },
  "비교 보관함 (퍼크 1회)": {
    en: "Comparison Vault (1 perk use)",
    ja: "比較保管庫（パーク1回）",
    "zh-CN": "比较保管室（1次特权）",
  },
  "비교 확정": {
    en: "Confirm Comparison",
    ja: "比較確定",
    "zh-CN": "确认比较",
  },
  "비밀 ㅎㅎ": {
    en: "Secret lol",
    ja: "秘密（笑）",
    "zh-CN": "秘密，哈哈",
  },
  "비어 있음": {
    en: "Empty",
    ja: "空",
    "zh-CN": "空",
  },
  "빠르게": {
    en: "Fast",
    ja: "速い",
    "zh-CN": "快速",
  },
  "사건": {
    en: "Case",
    ja: "事件",
    "zh-CN": "案件",
  },
  "사건 개요": {
    en: "Case Overview",
    ja: "事件概要",
    "zh-CN": "案件概要",
  },
  "사건 밖 질문": {
    en: "Off-Case Question",
    ja: "事件外の質問",
    "zh-CN": "案件外问题",
  },
  "사건 소개": {
    en: "Case Intro",
    ja: "事件紹介",
    "zh-CN": "案件介绍",
  },
  "사건 시작": {
    en: "Start Case",
    ja: "事件開始",
    "zh-CN": "开始案件",
  },
  "사건 준비 중": {
    en: "Case in Preparation",
    ja: "事件準備中",
    "zh-CN": "案件准备中",
  },
  "사건을 중단하시겠습니까?": {
    en: "Quit this case?",
    ja: "この事件を中断しますか？",
    "zh-CN": "要中断本案件吗？",
  },
  "사건의 배경과 당사자를 확인합니다.": {
    en: "Review the case background and parties.",
    ja: "事件の背景と当事者を確認します。",
    "zh-CN": "确认案件背景与当事人。",
  },
  "사건이 시작되면 대화가 여기에 표시됩니다.": {
    en: "Dialogue will appear here once the case begins.",
    ja: "事件が始まると、ここに会話が表示されます。",
    "zh-CN": "案件开始后，对话会显示在这里。",
  },
  "사건이 완전히 다르게 보인다": {
    en: "The Case Shifts",
    ja: "事件が一変する",
    "zh-CN": "案件骤变",
  },
  "사건카드 — 증거 묶음으로 핵심 질문": {
    en: "Case Card — core question from bundled evidence",
    ja: "事件カード — 証拠の束で核心質問",
    "zh-CN": "案件卡 — 用证据组提出核心问题",
  },
  "사람들 사이의 갈등 —\n누가 옳고 누가 그른지,\n답은 단순하지 않습니다.": {
    en: "Conflicts between people—\nwho is right and who is wrong\nis rarely simple.",
    ja: "人と人との葛藤――\n誰が正しく誰が間違っているのか、\n答えは単純ではありません。",
    "zh-CN": "人与人之间的冲突——\n谁对谁错，\n答案并不简单。",
  },
  "사랑, 생활비, 침묵이 한 식탁에서 부딪힙니다.": {
    en: "Love, living expenses, and silence collide at one table.",
    ja: "愛、生活費、沈黙が一つの食卓でぶつかります。",
    "zh-CN": "爱、生活费与沉默在同一张餐桌上碰撞。",
  },
  "사랑과 의심 사이, 감정이 증거가 되는 순간": {
    en: "Between love and suspicion, emotion becomes evidence",
    ja: "愛と疑いの間で、感情が証拠になる瞬間",
    "zh-CN": "在爱与怀疑之间，情绪成为证据的瞬间",
  },
  "사실 아님으로 판단": {
    en: "Found Not Factual",
    ja: "事実ではないと判断",
    "zh-CN": "认定并非事实",
  },
  "사실 인정": {
    en: "Fact Finding",
    ja: "事実認定",
    "zh-CN": "事实认定",
  },
  "사실 인정 → 책임 배분 → 해결책 선택. 위법 증거를 판결 근거로 쓰면 권위 점수가 떨어집니다.": {
    en: "Find the facts → assign responsibility → choose a remedy. Using illegal evidence as grounds for a verdict will lower your Authority score.",
    ja: "事実認定 → 責任配分 → 解決策選択。違法な証拠を判決根拠に使うと、権威スコアが下がります。",
    "zh-CN": "认定事实 → 分配责任 → 选择解决方案。若将违法证据作为判决依据，权威分数会下降。",
  },
  "사실 인정 단계에서 판단한 쟁점이 없습니다.": {
    en: "No issues were judged in the fact-finding step.",
    ja: "事実認定段階で判断した争点がありません。",
    "zh-CN": "事实认定阶段没有已判断的争议点。",
  },
  "사실 적중도": {
    en: "Fact Accuracy",
    ja: "事実的中度",
    "zh-CN": "事实命中度",
  },
  "사실 추궁": {
    en: "Press Facts",
    ja: "事実追及",
    "zh-CN": "事实追问",
  },
  "사실 추궁이나 동기 탐색이 효과적입니다.": {
    en: "Pressing facts or probing motive will be effective.",
    ja: "事実追及や動機探索が効果的です。",
    "zh-CN": "事实追问或动机探查会有效。",
  },
  "사실 해금": {
    en: "Fact Unlocked",
    ja: "事実解放",
    "zh-CN": "事实解锁",
  },
  "사실로 판단": {
    en: "Found as Fact",
    ja: "事実と判断",
    "zh-CN": "认定为事实",
  },
  "사실을 직접 추궁합니다": {
    en: "Press the facts directly",
    ja: "事実を直接追及します",
    "zh-CN": "直接追问事实",
  },
  "사용처": {
    en: "Uses",
    ja: "使途",
    "zh-CN": "用途",
  },
  "삭제된 메시지 3건": {
    en: "3 deleted messages",
    ja: "削除されたメッセージ3件",
    "zh-CN": "已删除消息3条",
  },
  "상대 발언 중 유리한 부분만 떼어 반복 인용하는 습관입니다.": {
    en: "A habit of repeatedly quoting only favorable parts of the other party's statement.",
    ja: "相手の発言のうち有利な部分だけを切り出し、繰り返し引用する癖です。",
    "zh-CN": "习惯只截取对方发言中有利的部分反复引用。",
  },
  "상대 주장 사실로 판단": {
    en: "Opposing Claim Found as Fact",
    ja: "相手側の主張を事実と判断",
    "zh-CN": "认定对方主张为事实",
  },
  "상대 주장에 대한 반박을 듣습니다.": {
    en: "Listen to rebuttals against the opposing claim.",
    ja: "相手の主張に対する反論を聞きます。",
    "zh-CN": "听取对对方主张的反驳。",
  },
  "상대 진술이 크게 흔들렸습니다. 지금이 다음 질문이나 이의 제기를 붙일 타이밍입니다.": {
    en: "The opposing statement has shaken badly. Now is the time to add the next question or objection.",
    ja: "相手の陳述が大きく揺らぎました。今が次の質問や異議を差し込むタイミングです。",
    "zh-CN": "对方陈述大幅动摇。现在正是接上下一问或提出异议的时机。",
  },
  "상대·번호": {
    en: "Other Party · Number",
    ja: "相手·番号",
    "zh-CN": "对方·号码",
  },
  "상대가 방어를 유지했습니다.": {
    en: "The other party held their defense.",
    ja: "相手は防御を維持しました。",
    "zh-CN": "对方维持了防御。",
  },
  "상대를 3턴간 배제하고 1:1로 심문 (조사토큰 1)": {
    en: "Exclude the other party for 3 turns and question 1-on-1 (1 Investigation Token)",
    ja: "相手を3ターン排除し、1対1で尋問（調査トークン1）",
    "zh-CN": "将对方排除3回合，进行1对1询问（调查令牌1）",
  },
  "상대방": {
    en: "Counterparty",
    ja: "相手方",
    "zh-CN": "对方",
  },
  "상세 결과가 저장되지 않은 기록입니다.": {
    en: "Detailed results were not saved for this record.",
    ja: "詳細結果が保存されていない記録です。",
    "zh-CN": "该记录未保存详细结果。",
  },
  "상세보기": {
    en: "View Details",
    ja: "詳細を見る",
    "zh-CN": "查看详情",
  },
  "상처와 미해결이 함께 남는 결말": {
    en: "An ending where wounds and unresolved questions remain together",
    ja: "傷と未解決がともに残る結末",
    "zh-CN": "伤痕与未解决之处并存的结局",
  },
  "상태 진행": {
    en: "State Progress",
    ja: "状態進行",
    "zh-CN": "状态进展",
  },
  "상품명": {
    en: "Item Name",
    ja: "品名",
    "zh-CN": "商品名",
  },
  "상품코드": {
    en: "Product Code",
    ja: "商品コード",
    "zh-CN": "商品代码",
  },
  "새 단서가 갈래를 바꿨습니다.": {
    en: "A new clue changed the branch.",
    ja: "新しい手がかりが分岐を変えました。",
    "zh-CN": "新线索改变了分支。",
  },
  "새 쟁점": {
    en: "New Issue",
    ja: "新しい争点",
    "zh-CN": "新争议点",
  },
  "새 쟁점 발견": {
    en: "New Issue Found",
    ja: "新しい争点発見",
    "zh-CN": "发现新争议点",
  },
  "새 정보 기준으로 수정": {
    en: "Revise Based on New Info",
    ja: "新情報を基準に修正",
    "zh-CN": "根据新信息修正",
  },
  "새 증인 추가": {
    en: "New Witness Added",
    ja: "新しい証人追加",
    "zh-CN": "新增证人",
  },
  "새 충돌 정보": {
    en: "New Conflicting Info",
    ja: "新たな衝突情報",
    "zh-CN": "新的冲突信息",
  },
  "새로운 쟁점": {
    en: "New Issue",
    ja: "新たな争点",
    "zh-CN": "新的争议点",
  },
  "새로운 쟁점이 드러났습니다": {
    en: "A new issue has emerged.",
    ja: "新しい争点が明らかになりました",
    "zh-CN": "新的争议点已浮现",
  },
  "새로운 정보가 기존 판단과 다른 방향을 가리킵니다. 판단을 수정하시겠습니까?": {
    en: "New information points in a different direction from your prior judgment. Revise your judgment?",
    ja: "新しい情報が既存判断とは異なる方向を示しています。判断を修正しますか？",
    "zh-CN": "新的信息指向与既有判断不同的方向。要修正判断吗？",
  },
  "생활 규칙": {
    en: "Household Rules",
    ja: "生活ルール",
    "zh-CN": "生活规则",
  },
  "서로의 불만이 남지만 최소한의 질서는 세운 결말": {
    en: "An ending where grievances remain, but a minimum order is restored",
    ja: "互いの不満は残るものの、最低限の秩序を立てた結末",
    "zh-CN": "彼此仍有不满，但建立起最低秩序的结局",
  },
  "서류": {
    en: "Documents",
    ja: "書類",
    "zh-CN": "文件",
  },
  "서연": {
    en: "Seo-yeon",
    ja: "ソヨン",
    "zh-CN": "瑞妍",
  },
  "선례 감각": {
    en: "Precedent Sense",
    ja: "先例感覚",
    "zh-CN": "先例感",
  },
  "선례 감각 힌트가 제공되었습니다": {
    en: "Precedent Sense hint provided",
    ja: "先例感覚のヒントが提供されました",
    "zh-CN": "已提供先例感提示",
  },
  "선택 인용": {
    en: "Selective Quoting",
    ja: "選択引用",
    "zh-CN": "选择性引用",
  },
  "선택한 칭호를 장착합니다.": {
    en: "Equip the selected title.",
    ja: "選択した称号を装着します。",
    "zh-CN": "装备所选称号。",
  },
  "선후관계 확인": {
    en: "Check the Sequence",
    ja: "前後関係の確認",
    "zh-CN": "确认先后关系",
  },
  "설정": {
    en: "Settings",
    ja: "設定",
    "zh-CN": "设置",
  },
  "성격": {
    en: "Personality",
    ja: "性格",
    "zh-CN": "性格",
  },
  "성격:": {
    en: "Personality:",
    ja: "性格:",
    "zh-CN": "性格：",
  },
  "성공 시:": {
    en: "On Success:",
    ja: "成功時：",
    "zh-CN": "成功时：",
  },
  "성급 결론형": {
    en: "Hasty Conclusion Type",
    ja: "早急結論型",
    "zh-CN": "草率结论型",
  },
  "성급한 정리": {
    en: "Hasty Summary",
    ja: "性急な整理",
    "zh-CN": "草率整理",
  },
  "성향": {
    en: "Disposition",
    ja: "傾向",
    "zh-CN": "倾向",
  },
  "성향 강화 가능": {
    en: "Disposition Enhancement Available",
    ja: "傾向強化が可能",
    "zh-CN": "可强化倾向",
  },
  "성향 강화 가능! - 내 정보에서 확인하세요": {
    en: "Disposition can be enhanced. Check My Info.",
    ja: "傾向を強化できます。マイ情報で確認してください。",
    "zh-CN": "可强化倾向。请在我的信息中确认。",
  },
  "성향 분석": {
    en: "Disposition Analysis",
    ja: "傾向分析",
    "zh-CN": "倾向分析",
  },
  "세 ·": {
    en: "years old ·",
    ja: "歳・",
    "zh-CN": "岁 ·",
  },
  "세상이 보는 사건은 무게가 다르다": {
    en: "A case seen by the world carries a different weight",
    ja: "世間が見る事件は重みが違う",
    "zh-CN": "被世人注视的案件有不同分量",
  },
  "세션 복원 중...": {
    en: "Restoring session...",
    ja: "セッションを復元中...",
    "zh-CN": "正在恢复会话...",
  },
  "세션 선택": {
    en: "Select Session",
    ja: "セッション選択",
    "zh-CN": "选择场次",
  },
  "세입자": {
    en: "Tenant",
    ja: "借主",
    "zh-CN": "租客",
  },
  "소요시간": {
    en: "Duration",
    ja: "所要時間",
    "zh-CN": "耗时",
  },
  "소음과 시선, 경계와 배려가 일상 전체를 흔듭니다.": {
    en: "Noise and gazes, boundaries and consideration shake everyday life.",
    ja: "騒音と視線、境界と配慮が日常全体を揺さぶります。",
    "zh-CN": "噪音与视线、界限与体谅撼动整个日常。",
  },
  "소통 구조 개선": {
    en: "Improve Communication Structure",
    ja: "対話構造の改善",
    "zh-CN": "沟通结构改善",
  },
  "소환": {
    en: "Summon",
    ja: "召喚",
    "zh-CN": "传唤",
  },
  "소환 완료 (": {
    en: "Summon Complete (",
    ja: "召喚完了 (",
    "zh-CN": "传唤完成 (",
  },
  "속기사 녹취 내용": {
    en: "Stenographer Transcript",
    ja: "速記録内容",
    "zh-CN": "速记转录内容",
  },
  "속기사 녹취 요약 / 음성 원본 대조": {
    en: "Stenographer Transcript Summary / Audio Original Cross-check",
    ja: "速記録要約／音声原本照合",
    "zh-CN": "速记转录摘要 / 原始音频核对",
  },
  "속도": {
    en: "Speed",
    ja: "速度",
    "zh-CN": "速度",
  },
  "솔로몬": {
    en: "Solomon",
    ja: "ソロモン",
    "zh-CN": "所罗门",
  },
  "솔로몬 법정": {
    en: "Verdict Zero Courtroomroom",
    ja: "真実の法廷",
    "zh-CN": "所罗门法庭",
  },
  "솔로몬 판결 결과": {
    en: "Solomon Verdict Result",
    ja: "ソロモン判決結果",
    "zh-CN": "所罗门裁决结果",
  },
  "솔로몬 후일담": {
    en: "Solomon Epilogue",
    ja: "ソロモン後日談",
    "zh-CN": "所罗门后日谈",
  },
  "솔직한 답변 (상태 변화 없음)": {
    en: "Honest answer (no status change)",
    ja: "正直な答え（状態変化なし）",
    "zh-CN": "坦率回答（状态无变化）",
  },
  "수동 조합": {
    en: "Manual Combinations",
    ja: "手動組み合わせ",
    "zh-CN": "手动组合",
  },
  "수동 조합 완수": {
    en: "Complete Manual Combinations",
    ja: "手動組み合わせを完了",
    "zh-CN": "完成手动组合",
  },
  "수량": {
    en: "Quantity",
    ja: "数量",
    "zh-CN": "数量",
  },
  "수습": {
    en: "Trainee",
    ja: "研修",
    "zh-CN": "实习",
  },
  "수신·방문": {
    en: "Incoming/Visit",
    ja: "受信・訪問",
    "zh-CN": "接收·访问",
  },
  "수아": {
    en: "Su-a",
    ja: "スア",
    "zh-CN": "秀雅",
  },
  "수집": {
    en: "Collection",
    ja: "収集",
    "zh-CN": "收藏",
  },
  "수집한 증거와 심문 결과를 바탕으로\n판결을 내립니다.": {
    en: "Deliver a verdict based on collected evidence\nand questioning results.",
    ja: "収集した証拠と尋問結果をもとに\n判決を下します。",
    "zh-CN": "根据收集的证据和询问结果\n作出裁决。",
  },
  "수첩": {
    en: "Notebook",
    ja: "手帳",
    "zh-CN": "笔记",
  },
  "수혜 단서": {
    en: "Beneficiary Clue",
    ja: "受益者の手がかり",
    "zh-CN": "受益人线索",
  },
  "숙련": {
    en: "Skilled",
    ja: "熟練",
    "zh-CN": "熟练",
  },
  "숙의": {
    en: "Deliberation",
    ja: "熟議",
    "zh-CN": "审议",
  },
  "순서대로 클릭하세요!": {
    en: "Click in order!",
    ja: "順番にクリックしてください！",
    "zh-CN": "请按顺序点击！",
  },
  "숨겨진 연결고리가 보입니다.": {
    en: "A hidden connection is visible.",
    ja: "隠れたつながりが見えます。",
    "zh-CN": "可以看到隐藏关联。",
  },
  "숨겨진 진실": {
    en: "Hidden Truth",
    ja: "隠された真実",
    "zh-CN": "隐藏真相",
  },
  "숨기던 말이 새고 있습니다.": {
    en: "Hidden words are starting to slip out.",
    ja: "隠していた言葉が漏れ始めています。",
    "zh-CN": "隐藏的话正在泄露出来。",
  },
  "숨긴 마음은 결국 다른 상속으로 남는다.": {
    en: "Hidden feelings eventually remain as another inheritance.",
    ja: "隠した心は、結局もう一つの相続として残る。",
    "zh-CN": "隐藏的心意，终会成为另一份继承。",
  },
  "숨긴 사정 카드": {
    en: "Hidden Circumstances Card",
    ja: "隠された事情カード",
    "zh-CN": "隐情卡",
  },
  "숨긴 이유를 캔다": {
    en: "Probe the Reason for Hiding",
    ja: "隠した理由を探る",
    "zh-CN": "追查隐瞒理由",
  },
  "숨김과 금전 이동 순서 카드": {
    en: "Concealment and Money Movement Sequence Card",
    ja: "隠蔽と資金移動の順序カード",
    "zh-CN": "隐瞒与资金流向顺序卡",
  },
  "숨은 쟁점 전부 발현": {
    en: "Reveal All Hidden Issues",
    ja: "すべての隠れた争点を発現",
    "zh-CN": "显现全部隐藏争议点",
  },
  "스코어보드": {
    en: "Scoreboard",
    ja: "スコアボード",
    "zh-CN": "计分榜",
  },
  "스킬": {
    en: "Skill",
    ja: "スキル",
    "zh-CN": "技能",
  },
  "스킬 러너 게임 화면": {
    en: "Skill Runner Game Screen",
    ja: "スキルランナーゲーム画面",
    "zh-CN": "技能跑酷游戏画面",
  },
  "스킬 없이 판결했습니다.": {
    en: "Delivered a verdict without using skills.",
    ja: "スキルを使わずに判決しました。",
    "zh-CN": "未使用技能完成裁决。",
  },
  "스킬 포인트": {
    en: "Skill Points",
    ja: "スキルポイント",
    "zh-CN": "技能点",
  },
  "스킬 포인트 2를 써서 절차를 정리하고 법정 장악 1을 회복했습니다.": {
    en: "Spent 2 Skill Points to clarify procedure and recover 1 Courtroom Control.",
    ja: "スキルポイント2を使って手続きを整理し、法廷統制1を回復しました。",
    "zh-CN": "消耗 2 点技能点整理程序，并恢复 1 点法庭控制。",
  },
  "스킬 포인트:": {
    en: "Skill Points:",
    ja: "スキルポイント:",
    "zh-CN": "技能点：",
  },
  "스킬 포인트가 부족합니다 (": {
    en: "Not enough skill points (",
    ja: "スキルポイントが不足しています (",
    "zh-CN": "技能点不足 (",
  },
  "스킬 포인트가 부족해 정숙 선언을 진행할 수 없습니다.": {
    en: "Not enough Skill Points to call for order.",
    ja: "スキルポイントが不足しているため、静粛宣言を行えません。",
    "zh-CN": "技能点不足，无法宣布肃静。",
  },
  "스킵": {
    en: "Skip",
    ja: "スキップ",
    "zh-CN": "跳过",
  },
  "슬라이더를 밀어 누구의 잘못이 더 큰지 정하세요.": {
    en: "Move the slider to decide who is more at fault.",
    ja: "スライダーを動かして、どちらの責任が大きいか決めてください。",
    "zh-CN": "移动滑块，决定谁的过错更大。",
  },
  "슬롯": {
    en: "Slot",
    ja: "スロット",
    "zh-CN": "槽位",
  },
  "슬롯 1": {
    en: "Slot 1",
    ja: "スロット1",
    "zh-CN": "槽位1",
  },
  "슬롯 2": {
    en: "Slot 2",
    ja: "スロット2",
    "zh-CN": "槽位2",
  },
  "시각": {
    en: "Time",
    ja: "時刻",
    "zh-CN": "时间",
  },
  "시간 종료": {
    en: "Time Up",
    ja: "時間終了",
    "zh-CN": "时间结束",
  },
  "시간 초과...": {
    en: "Time's up...",
    ja: "時間切れ...",
    "zh-CN": "时间到...",
  },
  "시간과 숫자를 지나치게 정확히 말하며 사실감을 만들려는 버릇입니다.": {
    en: "A habit of stating times and numbers with excessive precision to create a sense of reality.",
    ja: "時間と数字を過度に正確に述べ、事実味を作ろうとする癖です。",
    "zh-CN": "习惯把时间和数字说得过分精确，以制造真实感。",
  },
  "시간이 지나면서 사건은 승패보다 남은 거리의 문제로 바뀌었다. 두 사람은 쉽게 예전처럼 돌아가지는 못했지만, 같은 상처가 어디서 시작됐는지는 조금 더 선명하게 알게 되었다. 그 이해는 화해라고 부르기에는 작았지만, 다음 말을 망치지 않기 위한 최소한의 변화였다.": {
    en: "As time passed, the case shifted from winning or losing to the distance that remained. They could not easily return to how they had been, but they came to see more clearly where the same wound had begun. That understanding was too small to call reconciliation, but it was the smallest change needed to keep the next words from falling apart.",
    ja: "時間が経つにつれ、事件は勝敗よりも残された距離の問題へと変わった。二人は簡単に以前のようには戻れなかったが、同じ傷がどこから始まったのかは少しはっきり分かるようになった。その理解は和解と呼ぶには小さかったが、次の言葉を壊さないための最低限の変化だった。",
    "zh-CN": "随着时间过去，案件从胜负转成了剩余距离的问题。两人很难轻易回到从前，但他们更清楚同一道伤是从哪里开始的。那份理解还小得不能称作和解，却至少成了不让下一句话立刻崩坏的变化。",
  },
  "시간이 초과됐다...": {
    en: "Time ran out...",
    ja: "時間切れになった...",
    "zh-CN": "时间用完了...",
  },
  "시간이 초과되었습니다": {
    en: "Time Expired",
    ja: "時間切れです",
    "zh-CN": "时间已到",
  },
  "시민 -2": {
    en: "Civilian -2",
    ja: "市民 -2",
    "zh-CN": "市民 -2",
  },
  "시민 오인 타격 -2": {
    en: "Mistaken Civilian Hit -2",
    ja: "市民誤認攻撃 -2",
    "zh-CN": "误击市民 -2",
  },
  "시선이 흔들리며 잠시 멈춘다.": {
    en: "Their gaze wavers, and they pause briefly.",
    ja: "視線が揺れ、しばらく止まる。",
    "zh-CN": "视线动摇，短暂停住。",
  },
  "시인": {
    en: "Admission",
    ja: "認める",
    "zh-CN": "承认",
  },
  "신뢰": {
    en: "Trust",
    ja: "信頼",
    "zh-CN": "信任",
  },
  "신뢰 / 보호 행동": {
    en: "Trust / Protection Action",
    ja: "信頼 / 保護行動",
    "zh-CN": "信任 / 保护行动",
  },
  "신뢰 +20, 공포 -15": {
    en: "Trust +20, Fear -15",
    ja: "信頼 +20、恐れ -15",
    "zh-CN": "信任 +20，恐惧 -15",
  },
  "신뢰 상태 변화": {
    en: "Trust State Changed",
    ja: "信頼状態の変化",
    "zh-CN": "信任状态变化",
  },
  "신뢰 상태가 최고치에 도달했습니다. 감정 압박보다 차분한 확인 질문이 자백 경로에 더 적합합니다.": {
    en: "Trust has reached its maximum. Calm confirmation questions are more suitable for the confession route than emotional pressure.",
    ja: "信頼状態が最高値に達しました。感情的な圧迫より、落ち着いた確認質問のほうが自白ルートに適しています。",
    "zh-CN": "信任状态已达到最高值。相比情绪施压，冷静的确认问题更适合自白路径。",
  },
  "신뢰 순서 분리": {
    en: "Separate Trust-Rebuilding Steps",
    ja: "信頼回復手順の分離",
    "zh-CN": "信任恢复步骤分离",
  },
  "신뢰 창구 ↑": {
    en: "Trust Window ↑",
    ja: "信頼窓口 ↑",
    "zh-CN": "信任窗口 ↑",
  },
  "신뢰 창구 ↑↑": {
    en: "Trust Window ↑↑",
    ja: "信頼窓口 ↑↑",
    "zh-CN": "信任窗口 ↑↑",
  },
  "신뢰 창이 열렸습니다": {
    en: "Trust Window Opened",
    ja: "信頼ウィンドウが開きました",
    "zh-CN": "信任窗口已开启",
  },
  "신뢰 탭에서 비공개 진술 보호, 감정 안정화를 사용해보세요. 압박만으로는 나오지 않는 진실이 있습니다.": {
    en: "Use private statement protection and emotional stabilization in the Trust tab. Some truths will not surface through pressure alone.",
    ja: "信頼タブで非公開供述の保護や感情の安定化を使ってみましょう。圧迫だけでは出てこない真実があります。",
    "zh-CN": "可在信任页使用私密陈述保护和情绪稳定。有些真相仅靠施压不会浮现。",
  },
  "신뢰 판정": {
    en: "Trust Rating",
    ja: "信頼判定",
    "zh-CN": "信任判定",
  },
  "신뢰 행동을 3회 이상 사용했습니다.": {
    en: "Used trust actions at least 3 times.",
    ja: "信頼行動を3回以上使用しました。",
    "zh-CN": "使用信任行动3次以上。",
  },
  "신뢰 회복": {
    en: "Restore Trust",
    ja: "信頼回復",
    "zh-CN": "信任恢复",
  },
  "신뢰가 충분히 쌓였습니다. 공감 접근과 비공개 확인 질문의 효율이 높아집니다.": {
    en: "Trust has built up enough. Empathy approach and private confirmation questions are now more effective.",
    ja: "信頼が十分に積み上がりました。共感アプローチと非公開確認質問の効率が高まります。",
    "zh-CN": "信任已经充分累积。共情接近与不公开确认问题的效率会提高。",
  },
  "신원": {
    en: "Identity",
    ja: "身元",
    "zh-CN": "身份",
  },
  "신중하게 생각해주세요!": {
    en: "so think carefully.",
    ja: "慎重に考えてください。",
    "zh-CN": "请慎重考虑。",
  },
  "신중한 분석과 관용적 태도로 양측의 화해를 이끄는 타입입니다.": {
    en: "A type that guides both sides toward settlement through careful analysis and a tolerant attitude.",
    ja: "慎重な分析と寛容な態度で双方の和解を導くタイプです。",
    "zh-CN": "以谨慎分析和宽容态度引导双方和解的类型。",
  },
  "실수 자백 확률": {
    en: "Slip Confession Chance",
    ja: "失言による自白確率",
    "zh-CN": "失言供认概率",
  },
  "실수 자백 확률: 30% | 거짓말 전이 1.5배": {
    en: "Slip confession chance: 30% | Lie transfer ×1.5",
    ja: "失言による自白確率: 30% | 嘘の遷移 1.5倍",
    "zh-CN": "失言供认概率：30% | 谎言转移1.5倍",
  },
  "실제 진실:": {
    en: "Actual Truth:",
    ja: "実際の真実:",
    "zh-CN": "实际真相：",
  },
  "심리": {
    en: "Hearing",
    ja: "審理",
    "zh-CN": "审理",
  },
  "심문": {
    en: "Questioning",
    ja: "尋問",
    "zh-CN": "询问",
  },
  "심문 개시": {
    en: "Start Questioning",
    ja: "尋問開始",
    "zh-CN": "开始询问",
  },
  "심문 과정에서 추가 쟁점이 드러날 수 있습니다": {
    en: "Additional issues may emerge during questioning",
    ja: "尋問の過程で追加の争点が明らかになる場合があります",
    "zh-CN": "询问过程中可能会出现新的争议点",
  },
  "심문 시작": {
    en: "Begin Interrogation",
    ja: "尋問開始",
    "zh-CN": "开始审问",
  },
  "심문 중 거짓말이 붕괴된 쟁점": {
    en: "Issue where a lie broke down during questioning",
    ja: "尋問中に嘘が崩れた争点",
    "zh-CN": "询问中谎言崩塌的争议点",
  },
  "심문 토큰 0": {
    en: "Questioning Tokens 0",
    ja: "尋問トークン 0",
    "zh-CN": "询问令牌 0",
  },
  "심문을 더 진행하면 새로운 질문이 열립니다": {
    en: "Continue questioning to unlock new questions",
    ja: "尋問をさらに進めると新しい質問が開きます",
    "zh-CN": "继续询问可解锁新的问题",
  },
  "심문을 마저 이어나갈지, 바로 판결에 들어갈지 결정합니다.": {
    en: "Decide whether to continue questioning or move straight to the verdict.",
    ja: "尋問を続けるか、すぐ判決に進むかを決定します。",
    "zh-CN": "决定是继续询问，还是直接进入裁决。",
  },
  "심문을 마치고 판결에 들어가겠습니다.": {
    en: "The questioning is now closed. We will proceed to the verdict.",
    ja: "尋問を終え、判決に入ります。",
    "zh-CN": "询问到此结束，进入裁决阶段。",
  },
  "심문을 마치고 판결에 들어가시겠습니까?": {
    en: "End questioning and proceed to the verdict?",
    ja: "尋問を終えて判決に進みますか？",
    "zh-CN": "要结束询问并进入裁决吗？",
  },
  "심문을 마치고 판결에 들어갈지 결정합니다.": {
    en: "Decide whether to end questioning and enter the verdict.",
    ja: "尋問を終え、判決に入るか決定します。",
    "zh-CN": "决定是否结束询问并进入裁决。",
  },
  "심문을 통해 진실을 밝혀야 합니다": {
    en: "Reveal the truth through questioning",
    ja: "尋問を通じて真実を明らかにしてください",
    "zh-CN": "请通过询问查明真相",
  },
  "심문이 시작되면 주장이 여기에 정리됩니다.": {
    en: "Once questioning begins, claims will be organized here.",
    ja: "尋問が始まると、主張がここに整理されます。",
    "zh-CN": "询问开始后，主张会整理在这里。",
  },
  "심문하고, 증거를 들이밀고,\n숨겨진 진실을 밝혀내세요.": {
    en: "Question them, confront them with evidence,\nand uncover the hidden truth.",
    ja: "尋問し、証拠を突きつけ、\n隠された真実を明らかにしてください。",
    "zh-CN": "进行询问，出示证据，\n揭开隐藏的真相。",
  },
  "쌍 완료": {
    en: "Pair Complete",
    ja: "ペア完成",
    "zh-CN": "配对完成",
  },
  "쓴 사실이 남아 있어도 정리 방향은 비교적 분명한 결말": {
    en: "A relatively clear ending, even with bitter facts left on record",
    ja: "苦い事実が残っていても、整理の方向は比較的明確な結末",
    "zh-CN": "即使留下苦涩事实，整理方向也较为明确的结局",
  },
  "아니다": {
    en: "No",
    ja: "いいえ",
    "zh-CN": "不是",
  },
  "아니요": {
    en: "No",
    ja: "いいえ",
    "zh-CN": "否",
  },
  "아래 내용으로 확정됩니다": {
    en: "The following will be finalized",
    ja: "以下の内容で確定します",
    "zh-CN": "将按以下内容确认",
  },
  "아무 곳이나 터치하면 시연이 종료됩니다": {
    en: "Touch anywhere to end the demo",
    ja: "どこかをタッチするとデモが終了します",
    "zh-CN": "触摸任意位置即可结束演示",
  },
  "아버지의 현재 부탁과 과거 유사성": {
    en: "Father's Current Request and Past Similarities",
    ja: "父の現在の頼みと過去の類似性",
    "zh-CN": "父亲当前请求与过去的相似性",
  },
  "아직 결론이 아닙니다. 관련 기록과 진술을 더 확인해 쟁점으로 다룰지 판단하십시오.": {
    en: "This is not a conclusion yet. Check related records and statements further, then decide whether to treat it as an issue.",
    ja: "まだ結論ではありません。関連記録と陳述をさらに確認し、争点として扱うか判断してください。",
    "zh-CN": "这还不是结论。请进一步确认相关记录和陈述，再判断是否作为争议点处理。",
  },
  "아직 이 층은 잠겨 있습니다.": {
    en: "This layer is still locked.",
    ja: "まだこの層はロックされています。",
    "zh-CN": "这一层尚未解锁。",
  },
  "아직 제시하지 않은 핵심 증거입니다": {
    en: "Key evidence not yet presented",
    ja: "まだ提示していない核心証拠です",
    "zh-CN": "尚未出示的核心证据",
  },
  "아직 판결 기록이 없습니다.": {
    en: "No verdict records yet.",
    ja: "判決記録はまだありません。",
    "zh-CN": "尚无裁决记录。",
  },
  "아직 확정되지 않은 쟁점이 존재합니다. 이대로 판결을 선고하시겠습니까?": {
    en: "Some issues remain unresolved. Deliver the verdict as it stands?",
    ja: "まだ確定していない争点があります。このまま判決を言い渡しますか？",
    "zh-CN": "仍有尚未确认的争议点。要就此宣告裁决吗？",
  },
  "아직 획득한 칭호가 없습니다.": {
    en: "No titles earned yet.",
    ja: "まだ獲得した称号はありません。",
    "zh-CN": "尚未获得任何称号。",
  },
  "안내": {
    en: "Notice",
    ja: "案内",
    "zh-CN": "公告",
  },
  "안정": {
    en: "Stable",
    ja: "安定",
    "zh-CN": "稳定",
  },
  "알 수 없는 오류": {
    en: "Unknown error",
    ja: "不明なエラー",
    "zh-CN": "未知错误",
  },
  "알겠습니다. 더 돌려 말하지 않겠습니다. 숨긴 이유와 제가 한 행동을 이어서 말씀드리겠습니다.": {
    en: "Understood. I will not talk around it anymore. I will explain why I hid it and what I did.",
    ja: "わかりました。これ以上遠回しには言いません。隠した理由と、私がしたことを続けてお話しします。",
    "zh-CN": "我明白了。我不会再绕着说了。接下来会说明我隐瞒的理由，以及我做过的事。",
  },
  "압박을 유지한다": {
    en: "Maintain Pressure",
    ja: "圧迫を維持する",
    "zh-CN": "维持施压",
  },
  "앞선 답변을 바탕으로 더 좁혀 물어볼 질문을 선택하세요.": {
    en: "Select a question that narrows the issue based on the previous answer.",
    ja: "前の回答をもとに、さらに絞って尋ねる質問を選んでください。",
    "zh-CN": "请根据先前的回答，选择进一步缩小范围的问题。",
  },
  "앱 사용 기록": {
    en: "App Usage History",
    ja: "アプリ使用履歴",
    "zh-CN": "App使用记录",
  },
  "약속과 배신, 질투와 진심이 가장 가까운 사이를 시험합니다.": {
    en: "Promises and betrayal, jealousy and sincerity test the closest bonds.",
    ja: "約束と裏切り、嫉妬と本心が最も近い関係を試します。",
    "zh-CN": "承诺与背叛、嫉妒与真心考验最亲近的关系。",
  },
  "약점": {
    en: "Weaknesses",
    ja: "弱み",
    "zh-CN": "弱点",
  },
  "양쪽 다 일부만 사실": {
    en: "Both Are Partly True",
    ja: "双方とも一部のみ事実",
    "zh-CN": "双方都只有部分属实",
  },
  "양쪽 모두 일부만 사실입니다": {
    en: "Both sides are only partly true",
    ja: "双方とも一部だけが事実です",
    "zh-CN": "双方都只有一部分属实",
  },
  "양쪽 부분적 사실": {
    en: "Both Partially True",
    ja: "双方に部分的事実",
    "zh-CN": "双方都有部分事实",
  },
  "양측 모두 부분적으로만 사실을 말하고 있습니다": {
    en: "Both sides are telling only part of the truth.",
    ja: "双方とも部分的にのみ事実を話しています。",
    "zh-CN": "双方都只说出了部分事实。",
  },
  "양측 모두 이 사실을 알지 못했습니다. 이 발견은 사건의 전제를 근본적으로 바꿀 수 있습니다.": {
    en: "Neither side knew this fact. This discovery may fundamentally change the premise of the case.",
    ja: "双方ともこの事実を知りませんでした。この発見は事件の前提を根本から変える可能性があります。",
    "zh-CN": "双方都不知道这一事实。这个发现可能从根本上改变案件前提。",
  },
  "양측 모두 이 사안에 대해 잘못 알고 있었습니다. 진실은 양쪽 주장과 다릅니다.": {
    en: "Both sides misunderstood this matter. The truth differs from both claims.",
    ja: "双方ともこの件について誤解していました。真実は双方の主張と異なります。",
    "zh-CN": "双方都误会了这件事。真相与双方主张都不同。",
  },
  "양측 주장에 각자 맞는 부분과 과장이 섞여 있다고 보았습니다.": {
    en: "You judged that both sides' claims contain truths and exaggerations.",
    ja: "双方の主張には、それぞれ正しい部分と誇張が混ざっていると見ました。",
    "zh-CN": "你判断双方主张中各自混有符合事实的部分和夸大。",
  },
  "양측 진술과 새로 나온 단서를 대조해 사실관계를 확정합니다.": {
    en: "Compare both statements against new clues to establish the facts.",
    ja: "双方の陳述と新たに出た手がかりを照合し、事実関係を確定します。",
    "zh-CN": "对照双方陈述和新出现的线索，确认事实关系。",
  },
  "양측의 주장을 잘 들어보세요. 누가 더 그럴듯한지가 아니라, 어디서 모순이 보이는지 집중하세요.": {
    en: "Listen closely to both sides. Do not ask who sounds more convincing; focus on where contradictions appear.",
    ja: "双方の主張をよく聞いてください。どちらがもっともらしいかではなく、どこに矛盾が見えるかに集中しましょう。",
    "zh-CN": "请仔细听取双方主张。重点不是谁更像是真的，而是哪里出现了矛盾。",
  },
  "양측의 책임을 비교적 균등하게 본 판단이 이번 판결의 핵심 기준이 되었습니다.": {
    en: "This verdict centers on weighing both parties’ responsibility relatively evenly.",
    ja: "双方の責任を比較的均等に見た判断が、今回の判決の核心になりました。",
    "zh-CN": "本次裁决的核心，是较为均衡地看待双方责任。",
  },
  "양측의 첫 진술을 듣습니다.\n대화를 탭하면 다음으로 넘어갑니다.": {
    en: "Listen to both sides’ opening statements.\nTap the dialogue to continue.",
    ja: "双方の最初の陳述を聞きます。\n会話をタップすると次へ進みます。",
    "zh-CN": "听取双方的初始陈述。\n点击对话进入下一步。",
  },
  "어디서부터 어긋났을까": {
    en: "Where did it go wrong",
    ja: "どこから食い違ったのか",
    "zh-CN": "从哪里开始偏离",
  },
  "어떤 조사 결과를 신뢰합니까?": {
    en: "Which findings do you trust?",
    ja: "どの調査結果を信頼しますか？",
    "zh-CN": "你信任哪些调查结果？",
  },
  "어머니의 공책": {
    en: "Mother's Notebook",
    ja: "母のノート",
    "zh-CN": "母亲的笔记本",
  },
  "어머니의 뜻": {
    en: "Mother's Wishes",
    ja: "母の意思",
    "zh-CN": "母亲的意愿",
  },
  "어머님": {
    en: "mother",
    ja: "お母様",
    "zh-CN": "母亲",
  },
  "어머님께": {
    en: "to mother",
    ja: "お母様に",
    "zh-CN": "给母亲",
  },
  "어머님께서": {
    en: "mother",
    ja: "お母様が",
    "zh-CN": "母亲",
  },
  "어머님께서는": {
    en: "mother",
    ja: "お母様は",
    "zh-CN": "母亲",
  },
  "어머님을": {
    en: "mother",
    ja: "お母様を",
    "zh-CN": "母亲",
  },
  "어머님의": {
    en: "mother's",
    ja: "お母様の",
    "zh-CN": "母亲的",
  },
  "억울함과 미해결 지점이 함께 남는 불완전한 결말": {
    en: "An incomplete ending where grievance and unresolved points remain together",
    ja: "悔しさと未解決の点がともに残る不完全な結末",
    "zh-CN": "委屈与未解决之处并存的不完整结局",
  },
  "억울함과 상처를 앞세워 자신의 책임을 희석하려는 경향이 있습니다.": {
    en: "Tends to foreground grievance and hurt to dilute their own responsibility.",
    ja: "悔しさや傷を前面に出し、自分の責任を薄めようとする傾向があります。",
    "zh-CN": "倾向于把委屈和伤害摆在前面，以淡化自己的责任。",
  },
  "엄정": {
    en: "Strictness",
    ja: "厳正",
    "zh-CN": "严正",
  },
  "업데이트": {
    en: "Update",
    ja: "アップデート",
    "zh-CN": "更新",
  },
  "없음": {
    en: "None",
    ja: "なし",
    "zh-CN": "无",
  },
  "에게 질문": {
    en: "— Question",
    ja: "に質問",
    "zh-CN": "— 询问",
  },
  "에게 해당하는 쟁점이 없습니다": {
    en: "has no matching issues.",
    ja: "に該当する争点はありません",
    "zh-CN": "没有对应的争议点",
  },
  "에게는 추궁 효과가 없습니다.": {
    en: "is not affected by pressure.",
    ja: "には追及効果がありません。",
    "zh-CN": "不受追问影响。",
  },
  "여러 자원을 고르게 사용했습니다.": {
    en: "Used multiple resources evenly.",
    ja: "複数の資源をバランスよく使用しました。",
    "zh-CN": "均衡使用多种资源。",
  },
  "역량 분석 (이번 시즌)": {
    en: "Ability Analysis (This Season)",
    ja: "能力分析（今シーズン）",
    "zh-CN": "能力分析（本赛季）",
  },
  "역질문": {
    en: "Counterquestion",
    ja: "逆質問",
    "zh-CN": "反问",
  },
  "역할 재조정": {
    en: "Readjust Roles",
    ja: "役割の再調整",
    "zh-CN": "角色再调整",
  },
  "연결 쟁점:": {
    en: "Linked Issue:",
    ja: "連結争点:",
    "zh-CN": "关联争议点：",
  },
  "연결 확인 중...": {
    en: "Checking connection...",
    ja: "接続を確認中...",
    "zh-CN": "正在检查连接...",
  },
  "연결고리": {
    en: "Link",
    ja: "つながり",
    "zh-CN": "关联",
  },
  "연인": {
    en: "Lovers",
    ja: "恋人",
    "zh-CN": "恋人",
  },
  "열정적인 공감과 단호한 판단으로 해결을 이끄는 타입입니다.": {
    en: "A type that drives resolution with passionate empathy and firm judgment.",
    ja: "情熱的な共感と断固とした判断で解決へ導くタイプです。",
    "zh-CN": "以热情共情和果断判断推动解决的类型。",
  },
  "영수증": {
    en: "Receipt",
    ja: "レシート",
    "zh-CN": "收据",
  },
  "영수증 {current} / {total}": {
    en: "Receipt {current} / {total}",
    ja: "レシート {current} / {total}",
    "zh-CN": "收据 {current} / {total}",
  },
  "영수증 나열": {
    en: "Receipt Listing",
    ja: "レシート羅列",
    "zh-CN": "罗列收据",
  },
  "영수증 묶음 목록": {
    en: "Receipt Bundle List",
    ja: "レシート束一覧",
    "zh-CN": "收据组列表",
  },
  "영수증 묶음 속 중학교 참고서와 문자에 섞인 학교 알림이 가족 쪽 정황으로 맞물린다.": {
    en: "The middle-school workbook in the bundle of receipts and the school notice mixed into the text messages point to the same family circumstances.",
    ja: "レシート束の中学校参考書と、メッセージに混じった学校通知が、家族側の事情としてつながります。",
    "zh-CN": "收据包里的初中参考书和短信中夹杂的学校通知，都指向同一条家族方面的情况。",
  },
  "영수증 페이지 선택": {
    en: "Select Receipt Page",
    ja: "レシートページ選択",
    "zh-CN": "选择收据页",
  },
  "영수증의 참고서와 문자 속 학교 알림을 함께 보며 가족 쪽 정황을 분리하는 카드": {
    en: "A card that separates the family circumstances by viewing the workbook in the receipt together with the school notice in the text messages.",
    ja: "レシートの参考書とメッセージ内の学校通知を合わせて見て、家族側の事情を切り分けるカード。",
    "zh-CN": "将收据中的参考书与短信里的学校通知结合查看，用来区分家族方面情况的卡片。",
  },
  "영수증이나 숫자를 떼어 나열하며 맥락보다 정보량으로 압도하려는 습관입니다.": {
    en: "A habit of listing receipts or numbers in isolation, overwhelming with volume instead of context.",
    ja: "レシートや数字を切り出して並べ、文脈より情報量で圧倒しようとする癖です。",
    "zh-CN": "习惯把收据或数字单独罗列，用信息量而不是语境压倒对方。",
  },
  "영웅": {
    en: "Epic",
    ja: "エピック",
    "zh-CN": "史诗",
  },
  "예: \"그날 밤 10시에 어디 있었나요?\" \"왜 숨긴 거죠?\"": {
    en: "Example: “Where were you at 10 that night?” “Why did you hide it?”",
    ja: "例:「その夜10時にどこにいましたか？」「なぜ隠したのですか？」",
    "zh-CN": "例：“那晚10点你在哪里？”“为什么要隐瞒？”",
  },
  "예비신랑과 최수민 사이의 선후관계": {
    en: "Order of Events Between the Fiancé and Choi Su-min",
    ja: "婚約者とチェ・スミンの先後関係",
    "zh-CN": "未婚夫与崔秀敏之间的先后关系",
  },
  "오답": {
    en: "Incorrect",
    ja: "不正解",
    "zh-CN": "错误",
  },
  "오래된 가족 사정과 침묵의 이유": {
    en: "Old Family Circumstances and Reason for Silence",
    ja: "古い家族事情と沈黙の理由",
    "zh-CN": "旧日家庭情况与沉默理由",
  },
  "오류 신고하기": {
    en: "Report Error",
    ja: "エラーを報告",
    "zh-CN": "报告错误",
  },
  "오류가 발생했습니다": {
    en: "An error occurred",
    ja: "エラーが発生しました",
    "zh-CN": "发生错误",
  },
  "오미경": {
    en: "Oh Mi-gyeong",
    ja: "オ・ミギョン",
    "zh-CN": "吴美京",
  },
  "오빠": {
    en: "Older Brother",
    ja: "兄",
    "zh-CN": "哥哥",
  },
  "오피스텔 경비": {
    en: "Officetel Security Guard",
    ja: "オフィステル警備員",
    "zh-CN": "韩式商住公寓保安",
  },
  "오피스텔의 사람을 짚어야겠습니다": {
    en: "We need to identify the person at the officetel.",
    ja: "オフィステルの人物を見極める必要があります。",
    "zh-CN": "需要指出韩式商住公寓里的人。",
  },
  "오해 상태": {
    en: "Misunderstanding Status",
    ja: "誤解状態",
    "zh-CN": "误会状态",
  },
  "오해 해소": {
    en: "Misunderstanding Resolved",
    ja: "誤解解消",
    "zh-CN": "误会解除",
  },
  "온라인": {
    en: "Online",
    ja: "オンライン",
    "zh-CN": "线上",
  },
  "완료": {
    en: "Complete",
    ja: "完了",
    "zh-CN": "完成",
  },
  "완전성:": {
    en: "Completeness:",
    ja: "完全性:",
    "zh-CN": "完整性：",
  },
  "완화": {
    en: "Eased",
    ja: "緩和",
    "zh-CN": "缓和",
  },
  "왜 답이 없어?": {
    en: "Why aren't you answering?",
    ja: "なんで返事しないの？",
    "zh-CN": "为什么不回？",
  },
  "왜 숨기는지, 진짜 동기를 탐색합니다": {
    en: "Explore why they hid it and what the real motive is.",
    ja: "なぜ隠すのか、本当の動機を探ります。",
    "zh-CN": "探查为何隐瞒，以及真正动机。",
  },
  "왜 어긋나는지": {
    en: "Why They Conflict",
    ja: "食い違う理由",
    "zh-CN": "为何不一致",
  },
  "왜 전체가 아닌 일부만 제출하셨습니까?": {
    en: "Why did you submit only part of it, not the whole?",
    ja: "なぜ全体ではなく一部だけを提出したのですか？",
    "zh-CN": "为什么只提交一部分，而不是全部？",
  },
  "요구사항:": {
    en: "Requirements:",
    ja: "要件:",
    "zh-CN": "要求：",
  },
  "요약": {
    en: "Summary",
    ja: "要約",
    "zh-CN": "摘要",
  },
  "요약 활성화": {
    en: "Enable Summary",
    ja: "要約を有効化",
    "zh-CN": "启用摘要",
  },
  "요약 활성화에 스킬 포인트 3개가 소모됩니다.": {
    en: "Enabling Summary costs 3 skill points.",
    ja: "要約の有効化にはスキルポイント3個を消費します。",
    "zh-CN": "启用摘要会消耗 3 个技能点。",
  },
  "우람": {
    en: "U-ram",
    ja: "ウラム",
    "zh-CN": "禹蓝",
  },
  "우정과 거래가 겹치는 순간, 감정의 온도가 달라집니다.": {
    en: "When friendship and transactions overlap, the emotional temperature changes.",
    ja: "友情と取引が重なる瞬間、感情の温度が変わります。",
    "zh-CN": "当友情与交易重叠，情绪的温度会随之改变。",
  },
  "우편이 없습니다.": {
    en: "No mail.",
    ja: "郵便はありません。",
    "zh-CN": "没有邮件。",
  },
  "원로": {
    en: "Elder",
    ja: "元老",
    "zh-CN": "元老",
  },
  "원본": {
    en: "Original",
    ja: "原本",
    "zh-CN": "原件",
  },
  "원본 영수증 사본 · 조사 단계별 열람 기록": {
    en: "Original Receipt Copy · Viewing Record by Investigation Stage",
    ja: "原本レシート写し · 調査段階別閲覧記録",
    "zh-CN": "原始收据副本 · 按调查阶段开放的阅览记录",
  },
  "원본 요청": {
    en: "Request Original",
    ja: "原本を要求",
    "zh-CN": "请求原件",
  },
  "원본 확인": {
    en: "Check Original",
    ja: "原本確認",
    "zh-CN": "确认原件",
  },
  "원본대조": {
    en: "Original Verification",
    ja: "原本照合",
    "zh-CN": "原件核对",
  },
  "원칙": {
    en: "Principle",
    ja: "原則",
    "zh-CN": "原则",
  },
  "위 내용이 사실이라고 판단하십니까?": {
    en: "Do you judge the above to be true?",
    ja: "上記の内容を事実だと判断しますか？",
    "zh-CN": "你判断上述内容属实吗？",
  },
  "위 순서(1→2→3)대로 클릭하세요!": {
    en: "Click in the order shown above (1→2→3)!",
    ja: "上の順番（1→2→3）どおりにクリックしてください！",
    "zh-CN": "请按上方顺序（1→2→3）点击！",
  },
  "위도/경도": {
    en: "Latitude/Longitude",
    ja: "緯度/経度",
    "zh-CN": "纬度/经度",
  },
  "위법": {
    en: "Illegal",
    ja: "違法",
    "zh-CN": "违法",
  },
  "위법 증거 사용 시 권위 점수가 감소합니다.": {
    en: "Using illegal evidence will reduce your Authority score.",
    ja: "違法証拠を使用すると権威スコアが減少します。",
    "zh-CN": "使用违法证据会降低权威分数。",
  },
  "위법 증거를 판결 근거로 사용했습니다.": {
    en: "Used illegal evidence as grounds for the verdict.",
    ja: "違法証拠を判決根拠として使用しました。",
    "zh-CN": "将违法证据作为裁决依据。",
  },
  "위법 취득": {
    en: "Illegally Obtained",
    ja: "違法取得",
    "zh-CN": "违法取得",
  },
  "위치": {
    en: "Location",
    ja: "位置",
    "zh-CN": "位置",
  },
  "유능한 재판관": {
    en: "Capable Judge",
    ja: "有能な裁判官",
    "zh-CN": "能干法官",
  },
  "유사 사건 데이터가 충분하지 않습니다. 다양한 각도로 심문을 시도하세요.": {
    en: "There is not enough similar-case data. Try questioning from several angles.",
    ja: "類似事件のデータが十分ではありません。さまざまな角度から尋問を試してください。",
    "zh-CN": "相似案件数据不足。请尝试从多个角度询问。",
  },
  "유사 패턴 힌트 제공": {
    en: "Provides similar-pattern hints",
    ja: "類似パターンのヒントを提供",
    "zh-CN": "提供相似模式提示",
  },
  "유서 변경 방향": {
    en: "Direction of Will Changes",
    ja: "遺書変更の方向",
    "zh-CN": "遗书变更方向",
  },
  "유서 비율 변경의 방향과 동기": {
    en: "Direction and Motive Behind the Will Ratio Change",
    ja: "遺言書の比率変更の方向と動機",
    "zh-CN": "遗嘱比例变更的方向与动机",
  },
  "유진": {
    en: "Yu-jin",
    ja: "ユジン",
    "zh-CN": "裕珍",
  },
  "유효 질문": {
    en: "Valid Questions",
    ja: "有効質問",
    "zh-CN": "有效问题",
  },
  "으로": {
    en: "as",
    ja: "として",
    "zh-CN": "作为",
  },
  "은행 직원": {
    en: "Bank Clerk",
    ja: "銀行職員",
    "zh-CN": "银行职员",
  },
  "은행을 떠납니다": {
    en: "Leaves the bank.",
    ja: "銀行を出ます。",
    "zh-CN": "离开银行。",
  },
  "을 어느 슬롯에 장착할지 선택하세요.": {
    en: "Choose which slot to equip it in.",
    ja: "どちらのスロットに装着するか選択してください。",
    "zh-CN": "请选择要装备到哪个槽位。",
  },
  "응답 중...": {
    en: "Responding...",
    ja: "応答中...",
    "zh-CN": "回复中……",
  },
  "응답을 거부합니다. 2턴간 이 당사자에게 질문할 수 없습니다. 공감 접근으로 감정을 낮춰야 합니다.": {
    en: "Refuses to respond. You cannot question this party for 2 turns. Lower their emotion with an empathy approach.",
    ja: "応答を拒否します。2ターンの間、この当事者に質問できません。共感アプローチで感情を下げる必要があります。",
    "zh-CN": "拒绝回应。2回合内无法向该当事人提问。需要通过共情接近降低情绪。",
  },
  "응원해!": {
    en: "I'm rooting for you!",
    ja: "応援してる！",
    "zh-CN": "支持你！",
  },
  "의 발언에서 바로 추궁할 수 있는 불일치가 발견되었습니다.": {
    en: "’s statement contains an inconsistency you can press immediately.",
    ja: "の発言から、すぐに追及できる不一致が見つかりました。",
    "zh-CN": "的发言中发现了可立即追问的不一致。",
  },
  "의 주장": {
    en: "’s Claim",
    ja: "の主張",
    "zh-CN": "的主张",
  },
  "의도": {
    en: "Intent",
    ja: "意図",
    "zh-CN": "意图",
  },
  "의료·교육": {
    en: "Healthcare & Education",
    ja: "医療・教育",
    "zh-CN": "医疗/教育",
  },
  "의사소통": {
    en: "Communication",
    ja: "意思疎通",
    "zh-CN": "沟通",
  },
  "의심": {
    en: "Questionable",
    ja: "疑義あり",
    "zh-CN": "存疑",
  },
  "의심 판정": {
    en: "Suspicion Rating",
    ja: "疑い判定",
    "zh-CN": "怀疑判定",
  },
  "이 거래 내역에 대해 설명하십시오.": {
    en: "Explain these transaction details.",
    ja: "この取引内訳について説明してください。",
    "zh-CN": "请说明这份交易明细。",
  },
  "이 게시물을 직접 올리셨습니까?": {
    en: "Did you post this yourself?",
    ja: "この投稿を直接上げましたか？",
    "zh-CN": "这条帖子是你亲自发布的吗？",
  },
  "이 계약 내용을 인정하십니까?": {
    en: "Do you admit the terms of this contract?",
    ja: "この契約内容を認めますか？",
    "zh-CN": "你承认这份合同内容吗？",
  },
  "이 기기 데이터를 확인하셨습니까?": {
    en: "Did you check this device data?",
    ja: "この機器データを確認しましたか？",
    "zh-CN": "你确认过这份设备数据吗？",
  },
  "이 기록에 대해 설명하십시오.": {
    en: "Explain this record.",
    ja: "この記録について説明してください。",
    "zh-CN": "请说明这份记录。",
  },
  "이 내용은 상대에게 공개하지 않겠다고 약속": {
    en: "Promise not to reveal this to the other party",
    ja: "この内容を相手に開示しないと約束",
    "zh-CN": "承诺不向对方公开此内容",
  },
  "이 대화 내용이 사실입니까?": {
    en: "Is this conversation accurate?",
    ja: "この会話内容は事実ですか？",
    "zh-CN": "这段对话内容属实吗？",
  },
  "이 발생했습니다. 다음 전략을 선택하세요.": {
    en: "occurred. Choose your next strategy.",
    ja: "が発生しました。次の戦略を選択してください。",
    "zh-CN": "已发生。请选择下一步策略。",
  },
  "이 사건에는 조합 실험실 데이터가 없습니다.": {
    en: "This case has no Combination Lab data.",
    ja: "この事件には組み合わせラボのデータがありません。",
    "zh-CN": "本案件没有组合实验室数据。",
  },
  "이 시즌의 기록이 없습니다.": {
    en: "No records for this season.",
    ja: "このシーズンの記録はありません。",
    "zh-CN": "本赛季暂无记录。",
  },
  "이 영상에 찍힌 게 본인이 맞습니까?": {
    en: "Is that you in this video?",
    ja: "この映像に映っているのは本人ですか？",
    "zh-CN": "视频中拍到的是你本人吗？",
  },
  "이 점을 지적합니다.": {
    en: "I will point this out.",
    ja: "この点を指摘します。",
    "zh-CN": "我指出这一点。",
  },
  "이 조합에는 아직 authoring된 결과가 없습니다.": {
    en: "This combination has no authored result yet.",
    ja: "この組み合わせにはまだ作成済みの結果がありません。",
    "zh-CN": "该组合尚无已编写结果。",
  },
  "이 증거가 조작되지 않았다고 확신합니까?": {
    en: "Are you certain this evidence was not manipulated?",
    ja: "この証拠が操作されていないと断言できますか？",
    "zh-CN": "你确定这份证据没有被操纵吗？",
  },
  "이 증거는 다시 검토하겠습니다. 제시를 철회합니다.": {
    en: "I will review this evidence again. I withdraw its presentation.",
    ja: "この証拠は改めて検討します。提示を撤回します。",
    "zh-CN": "这项证据我会重新审查。撤回出示。",
  },
  "이 증거는 비공개를 약속하고 얻은 진술에서 나왔습니다.": {
    en: "This evidence came from a statement obtained under a promise of confidentiality.",
    ja: "この証拠は、非公開を約束して得た陳述から出たものです。",
    "zh-CN": "该证据来自在承诺不公开后取得的陈述。",
  },
  "이 증거를 어떻게 판단합니까?": {
    en: "How do you assess this evidence?",
    ja: "この証拠をどう判断しますか？",
    "zh-CN": "你如何判断这项证据？",
  },
  "이 증거만으로는 부족한데, 추가로 증명할 수 있습니까?": {
    en: "This evidence alone is not enough. Can you prove it further?",
    ja: "この証拠だけでは不十分です。追加で証明できますか？",
    "zh-CN": "仅凭这份证据还不够。你能进一步证明吗？",
  },
  "이 증거에 대해 설명하십시오.": {
    en: "Explain this evidence.",
    ja: "この証拠について説明してください。",
    "zh-CN": "请说明这份证据。",
  },
  "이 증거의 의미를 다른 관점에서 제시하겠습니다.": {
    en: "I will present the meaning of this evidence from another angle.",
    ja: "この証拠の意味を別の観点から提示します。",
    "zh-CN": "我会从另一个角度说明这项证据的意义。",
  },
  "이 증거의 출처를 설명하십시오.": {
    en: "Explain the source of this evidence.",
    ja: "この証拠の出どころを説明してください。",
    "zh-CN": "请说明这份证据的来源。",
  },
  "이 증언 내용에 대해 어떻게 생각하십니까?": {
    en: "What is your response to this testimony?",
    ja: "この証言内容についてどう考えますか？",
    "zh-CN": "你如何看待这份证言内容？",
  },
  "이 질문을 사용할 수 있습니다": {
    en: "This question can be used.",
    ja: "この質問を使用できます",
    "zh-CN": "可以使用这个问题",
  },
  "이 판단은 이후 심문 방향에 영향을 줍니다. 새로운 증거가 나오면 판단을 수정할 수 있습니다.": {
    en: "This judgment will affect the direction of later questioning. You can revise it if new evidence appears.",
    ja: "この判断は以後の尋問方針に影響します。新しい証拠が出た場合は判断を修正できます。",
    "zh-CN": "该判断会影响后续询问方向。若出现新证据，可以修正判断。",
  },
  "이미 기록된 결론입니다. 다른 조합을 시도해 주세요.": {
    en: "This conclusion is already recorded. Try another combination.",
    ja: "すでに記録された結論です。別の組み合わせを試してください。",
    "zh-CN": "该结论已记录。请尝试其他组合。",
  },
  "이미지 저장": {
    en: "Save Image",
    ja: "画像を保存",
    "zh-CN": "保存图片",
  },
  "이미지로 저장": {
    en: "Save as Image",
    ja: "画像として保存",
    "zh-CN": "保存为图片",
  },
  "이번 달 좀 빠듯해": {
    en: "Things are tight this month.",
    ja: "今月は少し厳しい。",
    "zh-CN": "这个月有点紧。",
  },
  "이번 시즌 기록 없음": {
    en: "No records this season",
    ja: "今シーズンの記録なし",
    "zh-CN": "本赛季暂无记录",
  },
  "이벤트": {
    en: "Event",
    ja: "イベント",
    "zh-CN": "活动",
  },
  "이상 필요)": {
    en: "or higher required)",
    ja: "以上が必要）",
    "zh-CN": "以上）",
  },
  "이웃": {
    en: "Neighbors",
    ja: "隣人",
    "zh-CN": "邻里",
  },
  "이웃 간 분쟁과 생활 갈등": {
    en: "Neighborhood disputes and everyday conflict",
    ja: "隣人間の紛争と生活上の対立",
    "zh-CN": "邻里纠纷与生活矛盾",
  },
  "이웃 분쟁에서는 시간대별 사건 정리가 돌파구입니다. 타임라인을 꼼꼼히 추궁하세요.": {
    en: "In neighbor disputes, organizing events by time can be the breakthrough. Press the timeline carefully.",
    ja: "隣人トラブルでは、時間帯ごとの出来事の整理が突破口になります。タイムラインを丁寧に追及してください。",
    "zh-CN": "邻里纠纷中，按时间段梳理事件可能成为突破口。请仔细追问时间线。",
  },
  "이의 있습니다!": {
    en: "Objection!",
    ja: "異議あり！",
    "zh-CN": "我有异议！",
  },
  "이의 제기, 분리 심문 등\n특수 행동에 사용됩니다.\n전략적으로 아껴 사용하세요.": {
    en: "Used for special actions such as objections\nand separate questioning.\nSave them strategically.",
    ja: "異議申し立て、分離尋問などの\n特殊行動に使用します。\n戦略的に温存してください。",
    "zh-CN": "用于异议、分开询问等\n特殊行动。\n请有策略地保留使用。",
  },
  "이전": {
    en: "Previous",
    ja: "前へ",
    "zh-CN": "上一步",
  },
  "이전 발언 A": {
    en: "Previous Statement A",
    ja: "以前の発言A",
    "zh-CN": "先前发言A",
  },
  "이전 부부 사건에서 비슷한 금전 은폐 패턴이 있었습니다. 공동 지출 내역을 추궁하면 모순이 드러날 수 있습니다.": {
    en: "A similar pattern of concealed money appeared in a previous spousal case. Press the joint spending records and contradictions may emerge.",
    ja: "以前の夫婦事件でも似た金銭隠しのパターンがありました。共同支出の明細を追及すると矛盾が出るかもしれません。",
    "zh-CN": "此前的夫妻案件中也出现过类似的金钱隐瞒模式。追问共同支出明细，可能会暴露矛盾。",
  },
  "이전 진술": {
    en: "Previous Statement",
    ja: "以前の陳述",
    "zh-CN": "先前陈述",
  },
  "이전 진술과 지금 진술이 어긋난다. 모순을 찌를 기회다.": {
    en: "The previous and current statements conflict. This is a chance to press the contradiction.",
    ja: "以前の陳述と現在の陳述が食い違っています。矛盾を突く機会です。",
    "zh-CN": "先前陈述与当前陈述不一致。这是追问矛盾的机会。",
  },
  "이전 플레이 기록에는 후일담이 저장되어 있지 않습니다. 앞으로 완료되는 플레이는 후일담까지 함께 저장됩니다.": {
    en: "Previous play records do not have epilogues saved. Future completed playthroughs will save epilogues as well.",
    ja: "以前のプレイ記録には後日談が保存されていません。今後完了したプレイでは後日談も保存されます。",
    "zh-CN": "之前的游玩记录没有保存后日谈。之后完成的游玩会一并保存后日谈。",
  },
  "이전 Stage를 완료하면 해금": {
    en: "Unlocks after completing the previous Stage",
    ja: "前のStageを完了すると解放",
    "zh-CN": "完成上一 Stage 后解锁",
  },
  "이해": {
    en: "Understanding",
    ja: "理解",
    "zh-CN": "理解",
  },
  "인벤토리": {
    en: "Inventory",
    ja: "インベントリ",
    "zh-CN": "背包",
  },
  "인호": {
    en: "In-ho",
    ja: "イノ",
    "zh-CN": "仁浩",
  },
  "일 남음": {
    en: "days left",
    ja: "日後終了",
    "zh-CN": "天后结束",
  },
  "일반": {
    en: "Common",
    ja: "一般",
    "zh-CN": "普通",
  },
  "일부": {
    en: "Partial",
    ja: "一部",
    "zh-CN": "部分",
  },
  "일시 보류": {
    en: "Temporarily Deferred",
    ja: "一時保留",
    "zh-CN": "暂时搁置",
  },
  "일시정지": {
    en: "Paused",
    ja: "一時停止",
    "zh-CN": "已暂停",
  },
  "일자·시각": {
    en: "Date & Time",
    ja: "日付・時刻",
    "zh-CN": "日期·时间",
  },
  "읽음": {
    en: "Read",
    ja: "既読",
    "zh-CN": "已读",
  },
  "임대 분쟁에서는 원상복구/보증금 쟁점이 타 사건과 유사 패턴을 보입니다. 사진 증거가 결정적입니다.": {
    en: "In rental disputes, restoration and deposit issues often follow patterns from other cases. Photo evidence is decisive.",
    ja: "賃貸トラブルでは、原状回復や保証金の争点が他の事件と似たパターンを示します。写真証拠が決定的です。",
    "zh-CN": "租赁纠纷中，恢复原状与押金争议点常呈现与其他案件相似的模式。照片证据很关键。",
  },
  "임대인·임차인 간 분쟁": {
    en: "Disputes between landlord and tenant",
    ja: "貸主・借主間の紛争",
    "zh-CN": "房东与租客之间的纠纷",
  },
  "임대인과 임차인": {
    en: "Landlord and Tenant",
    ja: "貸主と借主",
    "zh-CN": "房东与租客",
  },
  "입문": {
    en: "Beginner",
    ja: "入門",
    "zh-CN": "入门",
  },
  "입을 열 준비가 됐다": {
    en: "Ready to Speak",
    ja: "口を開く準備ができた",
    "zh-CN": "已准备开口",
  },
  "입출금·잔액 대조": {
    en: "Deposits/Withdrawals & Balance Check",
    ja: "入出金・残高照合",
    "zh-CN": "收支与余额核对",
  },
  "자동 실행": {
    en: "Auto Run",
    ja: "自動実行",
    "zh-CN": "自动执行",
  },
  "자동 조합": {
    en: "Auto Combinations",
    ja: "自動組み合わせ",
    "zh-CN": "自动组合",
  },
  "자동 조합 완수": {
    en: "Complete Auto Combinations",
    ja: "自動組み合わせを完了",
    "zh-CN": "完成自动组合",
  },
  "자료를": {
    en: "materials",
    ja: "資料を",
    "zh-CN": "资料",
  },
  "자물쇠": {
    en: "Lock",
    ja: "錠前",
    "zh-CN": "锁",
  },
  "자백": {
    en: "Confession",
    ja: "自白",
    "zh-CN": "供认",
  },
  "자백을 유도한다": {
    en: "Draw Out a Confession",
    ja: "自白を促す",
    "zh-CN": "引导供认",
  },
  "자신감": {
    en: "Confident",
    ja: "自信",
    "zh-CN": "自信",
  },
  "자신감 — 자기 주장에 확신을 가지고 있습니다": {
    en: "Confident — certain of their own claim",
    ja: "自信 — 自分の主張に確信を持っています",
    "zh-CN": "自信 — 对自己的主张确信不疑",
  },
  "자신감 — 확신을 가지고 있습니다": {
    en: "Confident — sure of themselves",
    ja: "自信 — 確信を持っています",
    "zh-CN": "自信 — 充满确信",
  },
  "자유롭게 질문하세요...": {
    en: "Ask freely...",
    ja: "自由に質問してください...",
    "zh-CN": "请自由提问……",
  },
  "자유롭게 질문합니다": {
    en: "Ask freely",
    ja: "自由に質問します",
    "zh-CN": "自由提问",
  },
  "자필 사본": {
    en: "Handwritten Copy",
    ja: "自筆写し",
    "zh-CN": "手写副本",
  },
  "잔액": {
    en: "Balance",
    ja: "残高",
    "zh-CN": "余额",
  },
  "잠시 진정하고, 사실만 다시 정리해 주세요.": {
    en: "Please calm down for a moment and restate only the facts.",
    ja: "少し落ち着いて、事実だけを改めて整理してください。",
    "zh-CN": "请暂时冷静下来，只重新整理事实。",
  },
  "잠시 진정하시고, 준비되면 말씀하십시오.": {
    en: "Take a moment to calm down. Speak when you are ready.",
    ja: "少し落ち着いて、準備ができたら話してください。",
    "zh-CN": "请先冷静一下，准备好后再说。",
  },
  "잠시 후 보상이 지급됩니다": {
    en: "Reward will be granted shortly",
    ja: "まもなく報酬が支給されます",
    "zh-CN": "奖励稍后发放",
  },
  "잠재 증거 (": {
    en: "Potential Evidence (",
    ja: "潜在証拠（",
    "zh-CN": "潜在证据（",
  },
  "장기 지원 흐름": {
    en: "Long-Term Support Trail",
    ja: "長期支援の流れ",
    "zh-CN": "长期资助流向",
  },
  "장기 지원금의 실제 출처": {
    en: "Actual Source of Long-Term Support Funds",
    ja: "長期支援金の実際の出どころ",
    "zh-CN": "长期支援金的实际来源",
  },
  "장애물에 연속으로 걸려 스킬 조각을 놓쳤습니다.": {
    en: "You hit obstacles in a row and missed the skill fragment.",
    ja: "障害物に連続で引っかかり、スキルのかけらを逃しました。",
    "zh-CN": "连续撞上障碍，错过了技能碎片。",
  },
  "장착": {
    en: "Equip",
    ja: "装着",
    "zh-CN": "装备",
  },
  "장착 슬롯 선택": {
    en: "Select Equip Slot",
    ja: "装着スロット選択",
    "zh-CN": "选择装备槽位",
  },
  "장착 중": {
    en: "Equipped",
    ja: "装着中",
    "zh-CN": "装备中",
  },
  "장착 중인 칭호": {
    en: "Equipped Title",
    ja: "装着中の称号",
    "zh-CN": "已装备称号",
  },
  "장착 하기": {
    en: "Equip",
    ja: "装着する",
    "zh-CN": "装备",
  },
  "재도전": {
    en: "Retry",
    ja: "再挑戦",
    "zh-CN": "重新挑战",
  },
  "재심문": {
    en: "Re-questioning",
    ja: "再尋問",
    "zh-CN": "再次询问",
  },
  "재심문 & 신뢰 루트": {
    en: "Re-examination & Trust Route",
    ja: "再尋問＆信頼ルート",
    "zh-CN": "再审问与信任路线",
  },
  "재정 투명화": {
    en: "Financial Transparency",
    ja: "財務の透明化",
    "zh-CN": "财务透明化",
  },
  "재정리 선언": {
    en: "Declare Reorganization",
    ja: "再整理宣言",
    "zh-CN": "宣布重新整理",
  },
  "재판 시작 →": {
    en: "Start Trial →",
    ja: "裁判開始 →",
    "zh-CN": "开始审理 →",
  },
  "재판 실패": {
    en: "Trial Failed",
    ja: "裁判失敗",
    "zh-CN": "审理失败",
  },
  "재판 준비 완료": {
    en: "Trial Ready",
    ja: "裁判準備完了",
    "zh-CN": "审理准备完成",
  },
  "재판관": {
    en: "Judge",
    ja: "裁判官",
    "zh-CN": "法官",
  },
  "재판관 관리 메뉴": {
    en: "Judge Management Menu",
    ja: "裁判官管理メニュー",
    "zh-CN": "法官管理菜单",
  },
  "재판관 성향": {
    en: "Judge Disposition",
    ja: "裁判官傾向",
    "zh-CN": "法官倾向",
  },
  "재판관 퍼크": {
    en: "Judge Perks",
    ja: "裁判官パーク",
    "zh-CN": "法官特权",
  },
  "재판관님, 그 질문에는 지금 답하기 어렵습니다.": {
    en: "Your Honor, I cannot answer that question right now.",
    ja: "裁判官、その質問には今は答えにくいです。",
    "zh-CN": "法官，这个问题现在很难回答。",
  },
  "재판관님, 잠깐만요. 저도 할 말이 있습니다.": {
    en: "Your Honor, wait a moment. I have something to say too.",
    ja: "裁判官、少し待ってください。私にも言いたいことがあります。",
    "zh-CN": "法官，请等一下。我也有话要说。",
  },
  "재판관님, 제 기억이 혼란스러웠던 것 같습니다. 다시 정리하겠습니다.": {
    en: "Your Honor, I think my memory was confused. I will sort it out again.",
    ja: "裁判官、私の記憶が混乱していたようです。改めて整理します。",
    "zh-CN": "法官，我的记忆可能有些混乱。我会重新整理。",
  },
  "재판관님, 지금 하신 말씀은 사실과 다릅니다.": {
    en: "Your Honor, what you just said is not true.",
    ja: "裁判官、今のお言葉は事実と違います。",
    "zh-CN": "法官，您刚才说的话与事实不符。",
  },
  "재판관의 수첩": {
    en: "Judge's Notebook",
    ja: "裁判官の手帳",
    "zh-CN": "法官笔记",
  },
  "재프레이밍": {
    en: "Reframe",
    ja: "リフレーミング",
    "zh-CN": "重新框定",
  },
  "재해석 단서": {
    en: "Reinterpretation Clue",
    ja: "再解釈の手がかり",
    "zh-CN": "重新解读线索",
  },
  "쟁점": {
    en: "Issue",
    ja: "争点",
    "zh-CN": "争议点",
  },
  "쟁점 깊이": {
    en: "Issue Depth",
    ja: "争点の深度",
    "zh-CN": "争议点深度",
  },
  "쟁점 보드 + 재판관 수첩": {
    en: "Issue Board + Judge's Notebook",
    ja: "争点ボード＋裁判官の手帳",
    "zh-CN": "争议点板 + 法官笔记",
  },
  "쟁점 보드 갱신": {
    en: "Issue Board Updated",
    ja: "争点ボード更新",
    "zh-CN": "争议点板已更新",
  },
  "쟁점 압축": {
    en: "Condense Issues",
    ja: "争点の圧縮",
    "zh-CN": "压缩争议点",
  },
  "쟁점 연결": {
    en: "Connect Issue",
    ja: "争点をつなぐ",
    "zh-CN": "连接争议点",
  },
  "쟁점 추가": {
    en: "Issue Added",
    ja: "争点追加",
    "zh-CN": "新增争议点",
  },
  "쟁점 클릭하여 고정": {
    en: "Click an issue to pin it",
    ja: "争点をクリックして固定",
    "zh-CN": "点击争议点以固定",
  },
  "쟁점 현황": {
    en: "Issue Status",
    ja: "争点状況",
    "zh-CN": "争议点状态",
  },
  "쟁점 현황 자동 정리": {
    en: "Auto-Organize Issue Status",
    ja: "争点状況の自動整理",
    "zh-CN": "自动整理争议点状态",
  },
  "쟁점 현황이 정리되었습니다": {
    en: "Issue status has been organized",
    ja: "争点の状況を整理しました",
    "zh-CN": "争议点状态已整理",
  },
  "쟁점·주장·증거를 한 눈에 볼 수 있습니다.": {
    en: "View issues, claims, and evidence at a glance.",
    ja: "争点・主張・証拠を一目で確認できます。",
    "zh-CN": "可一目了然地查看争议点、主张与证据。",
  },
  "쟁점별 상태": {
    en: "Status by Issue",
    ja: "争点別状態",
    "zh-CN": "按争议点显示状态",
  },
  "쟁점별 판단 결과": {
    en: "Judgment by Issue",
    ja: "争点別判断結果",
    "zh-CN": "各争议点判断结果",
  },
  "저울": {
    en: "Scales",
    ja: "天秤",
    "zh-CN": "天平",
  },
  "저장": {
    en: "Save",
    ja: "保存",
    "zh-CN": "保存",
  },
  "저장된 보상 기록이 없습니다.": {
    en: "No saved reward records.",
    ja: "保存された報酬記録がありません。",
    "zh-CN": "没有保存的奖励记录。",
  },
  "저장된 칭호 기록이 없습니다.": {
    en: "No saved title records.",
    ja: "保存された称号記録がありません。",
    "zh-CN": "没有保存的称号记录。",
  },
  "적법": {
    en: "Legal",
    ja: "適法",
    "zh-CN": "合法",
  },
  "적법성": {
    en: "Legality",
    ja: "適法性",
    "zh-CN": "合法性",
  },
  "적요": {
    en: "Description",
    ja: "摘要",
    "zh-CN": "摘要",
  },
  "전 요양보호사 음성증언": {
    en: "Former Caregiver Audio Testimony",
    ja: "元介護職員の音声証言",
    "zh-CN": "前护理员语音证言",
  },
  "전문성, 보호 의무, 해명의 온도가 정면으로 충돌합니다.": {
    en: "Expertise, duty of care, and the tone of explanation collide head-on.",
    ja: "専門性、保護義務、説明の温度が正面から衝突します。",
    "zh-CN": "专业性、保护义务与说明的温度正面冲突。",
  },
  "전설": {
    en: "Legendary",
    ja: "伝説",
    "zh-CN": "传说",
  },
  "전설의 재판관": {
    en: "Legendary Judge",
    ja: "伝説の裁判官",
    "zh-CN": "传奇法官",
  },
  "전설적인 재판관": {
    en: "Legendary Judge",
    ja: "伝説の裁判官",
    "zh-CN": "传奇法官",
  },
  "전언 포함": {
    en: "Includes Hearsay",
    ja: "伝聞含む",
    "zh-CN": "含转述",
  },
  "전체": {
    en: "All",
    ja: "全体",
    "zh-CN": "全部",
  },
  "전체 쟁점 압박": {
    en: "Pressure All Issues",
    ja: "全争点への圧迫",
    "zh-CN": "压迫全部争议点",
  },
  "전체 흐름을 일찍 닫고 결론부터 요약하려는 경향이 있습니다.": {
    en: "Tends to close the overall flow early and summarize from the conclusion.",
    ja: "全体の流れを早く閉じ、結論から要約しようとする傾向があります。",
    "zh-CN": "倾向于过早收束整体流程，并先从结论开始概括。",
  },
  "전해 들음": {
    en: "Heard Secondhand",
    ja: "伝聞",
    "zh-CN": "听他人转述",
  },
  "절차상 책임이나 위법성도 별도 판단해야 합니다.": {
    en: "Procedural responsibility or illegality must also be judged separately.",
    ja: "手続き上の責任や違法性も別途判断する必要があります。",
    "zh-CN": "程序责任或违法性也需要另行判断。",
  },
  "점 남았습니다.": {
    en: "points remaining.",
    ja: "点残っています。",
    "zh-CN": "分。",
  },
  "점검": {
    en: "Maintenance",
    ja: "メンテナンス",
    "zh-CN": "维护",
  },
  "접속 기록": {
    en: "Connection Log",
    ja: "接続記録",
    "zh-CN": "连接记录",
  },
  "정답 책임:": {
    en: "Correct Responsibility:",
    ja: "正解の責任:",
    "zh-CN": "正确责任：",
  },
  "정리와 회복이 함께 보이는 결말": {
    en: "An ending that shows both resolution and recovery",
    ja: "整理と回復がともに見える結末",
    "zh-CN": "整理与恢复并存的结局",
  },
  "정면돌파형": {
    en: "Head-On Type",
    ja: "正面突破型",
    "zh-CN": "正面突破型",
  },
  "정산과 분담, 약속과 책임이 서로 다른 계산을 드러냅니다.": {
    en: "Settlements and shares, promises and responsibilities reveal different calculations.",
    ja: "精算と分担、約束と責任が異なる計算を露わにします。",
    "zh-CN": "结算与分担、承诺与责任显露出不同的计算。",
  },
  "정숙 선언": {
    en: "Call for Order",
    ja: "静粛宣言",
    "zh-CN": "宣布肃静",
  },
  "정식": {
    en: "Full",
    ja: "正式",
    "zh-CN": "正式",
  },
  "정확": {
    en: "Correct",
    ja: "正解",
    "zh-CN": "正确",
  },
  "제3자": {
    en: "Third Party",
    ja: "第三者",
    "zh-CN": "第三方",
  },
  "제도가 흔들리면 모두가 불안해진다": {
    en: "When institutions waver, everyone becomes uneasy",
    ja: "制度が揺らぐと、誰もが不安になる",
    "zh-CN": "当制度动摇，所有人都会不安",
  },
  "제시": {
    en: "Present",
    ja: "提示",
    "zh-CN": "出示",
  },
  "제시 가능 (": {
    en: "Available to Present (",
    ja: "提示可能（",
    "zh-CN": "可出示（",
  },
  "제시 완료 (": {
    en: "Presented (",
    ja: "提示済み（",
    "zh-CN": "已出示（",
  },
  "제시를 철회한다": {
    en: "Withdraw the Presentation",
    ja: "提示を撤回する",
    "zh-CN": "撤回出示",
  },
  "제지한다": {
    en: "Stop Them",
    ja: "制止する",
    "zh-CN": "制止",
  },
  "제출된 기록과 진술을": {
    en: "submitted records and statements",
    ja: "提出された記録と供述を",
    "zh-CN": "提交的记录与陈述",
  },
  "제출자 보관 계좌": {
    en: "Submitter-held Account",
    ja: "提出者保管口座",
    "zh-CN": "提交人保管账户",
  },
  "조각 ×1": {
    en: "Fragment ×1",
    ja: "かけら×1",
    "zh-CN": "碎片×1",
  },
  "조각 교환": {
    en: "Fragment Exchange",
    ja: "かけら交換",
    "zh-CN": "碎片交换",
  },
  "조각 변환": {
    en: "Fragment Conversion",
    ja: "かけら変換",
    "zh-CN": "碎片转换",
  },
  "조건": {
    en: "Condition",
    ja: "条件",
    "zh-CN": "条件",
  },
  "조사": {
    en: "Investigation",
    ja: "調査",
    "zh-CN": "调查",
  },
  "조사 완료": {
    en: "Investigation Complete",
    ja: "調査完了",
    "zh-CN": "调查完成",
  },
  "조사 토큰": {
    en: "Investigation Tokens",
    ja: "調査トークン",
    "zh-CN": "调查代币",
  },
  "조사 토큰 1개 소모": {
    en: "Uses 1 Investigation Token",
    ja: "調査トークンを1個消費",
    "zh-CN": "消耗1个调查令牌",
  },
  "조사 토큰 1을 써서 쟁점을 압축하고 스킬 포인트 1을 회복했습니다.": {
    en: "Spent 1 Investigation Token to condense the issues and recover 1 Skill Point.",
    ja: "調査トークン1を使って争点を圧縮し、スキルポイント1を回復しました。",
    "zh-CN": "消耗 1 个调查代币压缩争议点，并恢复 1 点技能点。",
  },
  "조사 토큰:": {
    en: "Investigation Tokens:",
    ja: "調査トークン:",
    "zh-CN": "调查令牌：",
  },
  "조사 토큰을 지급하고 다음 흐름으로 돌아갑니다.": {
    en: "Award investigation tokens and return to the next flow.",
    ja: "調査トークンを支給し、次の流れに戻ります。",
    "zh-CN": "发放调查代币，并返回下一段流程。",
  },
  "조사 토큰이 부족해 쟁점 압축을 진행할 수 없습니다.": {
    en: "Not enough Investigation Tokens to condense the issues.",
    ja: "調査トークンが不足しているため、争点の圧縮を進められません。",
    "zh-CN": "调查代币不足，无法压缩争议点。",
  },
  "조사 필요": {
    en: "Needs Investigation",
    ja: "調査が必要",
    "zh-CN": "需要调查",
  },
  "조사:": {
    en: "Investigation:",
    ja: "調査:",
    "zh-CN": "调查：",
  },
  "조사가 충분히 진행되어 바로 사용 가능합니다": {
    en: "Investigation is far enough along to use this now",
    ja: "調査が十分進み、すぐに使用できます",
    "zh-CN": "调查进展充分，现在可直接使用",
  },
  "조사를 통해 증거의 실체가 드러났습니다": {
    en: "Investigation revealed the true nature of this evidence.",
    ja: "調査により証拠の実体が明らかになりました。",
    "zh-CN": "通过调查，证据的实质已经显现。",
  },
  "조작": {
    en: "Manipulation",
    ja: "操作",
    "zh-CN": "操纵",
  },
  "조작 여부": {
    en: "Manipulation Check",
    ja: "操作の有無",
    "zh-CN": "是否被操纵",
  },
  "조합 가능한 노드를 찾지 못했습니다.": {
    en: "No combinable nodes found.",
    ja: "組み合わせ可能なノードが見つかりませんでした。",
    "zh-CN": "未找到可组合的节点。",
  },
  "조합 결과: 오피스텔의 사람들": {
    en: "Combination Result: People at the Officetel",
    ja: "組み合わせ結果: オフィステルの人々",
    "zh-CN": "组合结果：韩式商住公寓里的人",
  },
  "조합 실행": {
    en: "Run Combination",
    ja: "組み合わせ実行",
    "zh-CN": "执行组合",
  },
  "조합 실행에 실패했습니다.": {
    en: "Failed to run combination.",
    ja: "組み合わせ実行に失敗しました。",
    "zh-CN": "组合执行失败。",
  },
  "조합 실험실": {
    en: "Combination Lab",
    ja: "組み合わせラボ",
    "zh-CN": "组合实验室",
  },
  "조회 계좌": {
    en: "Queried Account",
    ja: "照会口座",
    "zh-CN": "查询账户",
  },
  "조회 기간 미상": {
    en: "Lookup period unknown",
    ja: "照会期間不明",
    "zh-CN": "查询期间不明",
  },
  "종료": {
    en: "Exit",
    ja: "終了",
    "zh-CN": "结束",
  },
  "종합": {
    en: "Overall",
    ja: "総合",
    "zh-CN": "综合",
  },
  "주목": {
    en: "Key",
    ja: "注目",
    "zh-CN": "重点",
  },
  "주요 쟁점": {
    en: "Key Issues",
    ja: "主要争点",
    "zh-CN": "主要争议点",
  },
  "주장": {
    en: "Claim",
    ja: "主張",
    "zh-CN": "主张",
  },
  "주장 그래프": {
    en: "Claim Graph",
    ja: "主張グラフ",
    "zh-CN": "主张图",
  },
  "주체": {
    en: "subject",
    ja: "主体",
    "zh-CN": "主体",
  },
  "준엄": {
    en: "Strictness",
    ja: "厳格",
    "zh-CN": "严格",
  },
  "중립": {
    en: "Neutral",
    ja: "中立",
    "zh-CN": "中立",
  },
  "중립 재고": {
    en: "Neutral Stock",
    ja: "中立在庫",
    "zh-CN": "中立库存",
  },
  "중점 거래 {count}건 표시 · 제출용 사본": {
    en: "{count} key transactions shown · Copy for submission",
    ja: "重点取引{count}件を表示・提出用写し",
    "zh-CN": "显示{count}笔重点交易 · 提交用副本",
  },
  "중학교 참고서": {
    en: "Middle-School Workbook",
    ja: "中学校の参考書",
    "zh-CN": "初中参考书",
  },
  "즉답 요구": {
    en: "Demand an Immediate Answer",
    ja: "即答要求",
    "zh-CN": "要求即答",
  },
  "증거": {
    en: "Evidence",
    ja: "証拠",
    "zh-CN": "证据",
  },
  "증거 감별": {
    en: "Evidence Appraisal",
    ja: "証拠鑑別",
    "zh-CN": "证据鉴别",
  },
  "증거 과장": {
    en: "Evidence Exaggeration",
    ja: "証拠誇張",
    "zh-CN": "证据夸大",
  },
  "증거 발견": {
    en: "Evidence Found",
    ja: "証拠発見",
    "zh-CN": "发现证据",
  },
  "증거 보드": {
    en: "Evidence Board",
    ja: "証拠ボード",
    "zh-CN": "证据板",
  },
  "증거 사본": {
    en: "Evidence Copy",
    ja: "証拠写し",
    "zh-CN": "证据副本",
  },
  "증거 심리": {
    en: "Evidence Hearing",
    ja: "証拠審理",
    "zh-CN": "证据审理",
  },
  "증거 심리 단계에서 해금": {
    en: "Unlocks in the evidence review phase",
    ja: "証拠審理段階で解放",
    "zh-CN": "在证据审理阶段解锁",
  },
  "증거 정당성": {
    en: "Evidence Legality",
    ja: "証拠の適法性",
    "zh-CN": "证据合法性",
  },
  "증거 제시": {
    en: "Present Evidence",
    ja: "証拠提示",
    "zh-CN": "出示证据",
  },
  "증거 제시가 충분히 먹히지 않았다. 완충 스킬을 쓸 수 있다.": {
    en: "Presenting the evidence did not land well enough. You can use a buffer skill.",
    ja: "証拠提示が十分に効きませんでした。緩衝スキルを使えます。",
    "zh-CN": "证据出示没有充分奏效。可以使用缓冲技能。",
  },
  "증거 제시가 충분히 먹히지 않았습니다. 완충 스킬로 한 번 수습할 수 있습니다.": {
    en: "The evidence presentation did not land well enough. You can recover once with a buffer skill.",
    ja: "証拠提示が十分に効きませんでした。緩衝スキルで一度立て直せます。",
    "zh-CN": "证据出示没有充分奏效。可以用缓冲技能挽回一次。",
  },
  "증거 제시는 증거 정리 단계부터 가능합니다.": {
    en: "Evidence can be presented starting from the evidence organization stage.",
    ja: "証拠提示は証拠整理段階から可能です。",
    "zh-CN": "从证据整理阶段起可以出示证据。",
  },
  "증거 제시와 즉답 요구가\n해금됩니다.": {
    en: "Evidence presentation and demands for immediate answers\nare unlocked.",
    ja: "証拠提示と即答要求が\n解放されます。",
    "zh-CN": "将解锁出示证据与要求立即回答。",
  },
  "증거 카드 발동 중...": {
    en: "Activating evidence card...",
    ja: "証拠カードを発動中...",
    "zh-CN": "正在发动证据卡...",
  },
  "증거 하나를 과장해 전체 결론으로 바꾸려는 습관입니다.": {
    en: "A habit of exaggerating one piece of evidence into an overall conclusion.",
    ja: "証拠一つを誇張し、全体の結論に変えようとする癖です。",
    "zh-CN": "习惯夸大一项证据，并把它变成整体结论。",
  },
  "증거 확보 완료": {
    en: "Evidence Secured",
    ja: "証拠確保完了",
    "zh-CN": "证据已取得",
  },
  "증거 효과": {
    en: "Evidence Effect",
    ja: "証拠効果",
    "zh-CN": "证据效果",
  },
  "증거:": {
    en: "Evidence:",
    ja: "証拠:",
    "zh-CN": "证据:",
  },
  "증거가 진술 사이의 틈을 만들었습니다. 관련 쟁점으로 이어서 압박해 보세요.": {
    en: "The evidence opened a gap between statements. Continue pressing through the related issue.",
    ja: "証拠が陳述の間に隙間を作りました。関連争点につなげて圧迫してみてください。",
    "zh-CN": "证据在陈述之间撕开了缝隙。请接到相关争议点继续施压。",
  },
  "증거나 노트를 2개 이상 올리면 가능한 조합을 찾습니다.": {
    en: "Place at least two pieces of evidence or notes to find possible combinations.",
    ja: "証拠またはノートを2つ以上置くと、可能な組み合わせを探します。",
    "zh-CN": "放入至少两个证据或笔记后，会寻找可用组合。",
  },
  "증거로 마무리한다": {
    en: "Finish with Evidence",
    ja: "証拠で締める",
    "zh-CN": "用证据收尾",
  },
  "증거로 새 쟁점이 드러났습니다.": {
    en: "New evidence has revealed a new issue.",
    ja: "証拠によって新しい争点が明らかになりました。",
    "zh-CN": "证据揭示了新的争议点。",
  },
  "증거를 1단계 이상 조사한 뒤 제시할 수 있습니다.": {
    en: "You can present evidence after investigating it to stage 1 or higher.",
    ja: "証拠を1段階以上調査した後に提示できます。",
    "zh-CN": "证据调查到1阶段以上后即可出示。",
  },
  "증거를 5개 이상 제시했습니다.": {
    en: "Presented at least 5 pieces of evidence.",
    ja: "証拠を5つ以上提示しました。",
    "zh-CN": "提交至少5项证据。",
  },
  "증거를 들이민다": {
    en: "Confront with Evidence",
    ja: "証拠を突きつける",
    "zh-CN": "拿出证据逼问",
  },
  "증거를 조사하거나\n자유 질문을 할 때 소모됩니다.\n시간이 지나면 자동 충전됩니다.": {
    en: "Consumed when investigating evidence\nor asking free questions.\nRecharges automatically over time.",
    ja: "証拠を調査したり\n自由質問をしたりすると消費されます。\n時間経過で自動回復します。",
    "zh-CN": "调查证据或\n自由提问时会消耗。\n会随时间自动恢复。",
  },
  "증거와 논리를 중시하며, 엄격한 기준으로 공정한 판결을 내리는 타입입니다.": {
    en: "A type that values evidence and logic, delivering fair verdicts by strict standards.",
    ja: "証拠と論理を重視し、厳格な基準で公正な判決を下すタイプです。",
    "zh-CN": "重视证据与逻辑，并以严格标准作出公正裁决的类型。",
  },
  "증언 정보": {
    en: "Testimony Info",
    ja: "証言情報",
    "zh-CN": "证言信息",
  },
  "증언자": {
    en: "Testifier",
    ja: "証言者",
    "zh-CN": "证言人",
  },
  "증인": {
    en: "Witness",
    ja: "証人",
    "zh-CN": "证人",
  },
  "증인 소환": {
    en: "Summon Witness",
    ja: "証人召喚",
    "zh-CN": "传唤证人",
  },
  "증인 심문": {
    en: "Witness Questioning",
    ja: "証人尋問",
    "zh-CN": "证人询问",
  },
  "증인 심층 증언 도달": {
    en: "Reach In-Depth Witness Testimony",
    ja: "証人の深層証言に到達",
    "zh-CN": "触发证人深层证言",
  },
  "증인 진술이 다른 갈래를 열었습니다.": {
    en: "Witness testimony has opened another branch.",
    ja: "証人の陳述が別の分岐を開きました。",
    "zh-CN": "证人陈述开启了另一条分支。",
  },
  "증인의 심층 증언을 충분히 들었습니다.": {
    en: "Listened fully to the witness’s in-depth testimony.",
    ja: "証人の深層証言を十分に聞きました。",
    "zh-CN": "充分听取证人的深层证言。",
  },
  "지금 바빠 나중에 얘기하자": {
    en: "I'm busy now. Let's talk later.",
    ja: "今忙しい。後で話そう。",
    "zh-CN": "我现在忙，晚点再说。",
  },
  "지금 진술": {
    en: "Current Statement",
    ja: "現在の陳述",
    "zh-CN": "当前陈述",
  },
  "지금은 넘긴다": {
    en: "Let It Pass for Now",
    ja: "今は流す",
    "zh-CN": "现在略过",
  },
  "지금은 보류 (나중에 다시 판단)": {
    en: "Defer for Now (Judge Later)",
    ja: "今は保留（後で再判断）",
    "zh-CN": "现在暂缓（稍后再判断）",
  },
  "지금은 이 조합을 실행할 수 없습니다.": {
    en: "This combination cannot be run right now.",
    ja: "今はこの組み合わせを実行できません。",
    "zh-CN": "现在无法执行该组合。",
  },
  "지급": {
    en: "Grant",
    ja: "支給",
    "zh-CN": "发放",
  },
  "지문": {
    en: "Fingerprint",
    ja: "指紋",
    "zh-CN": "指纹",
  },
  "지배력": {
    en: "Control",
    ja: "支配力",
    "zh-CN": "掌控力",
  },
  "지적을 받으면 공격적으로 반응하며 주도권을 빼앗기지 않으려는 성향입니다.": {
    en: "When challenged, they react aggressively and try not to lose control.",
    ja: "指摘を受けると攻撃的に反応し、主導権を奪われまいとする傾向です。",
    "zh-CN": "被指出问题时会攻击性反应，并试图不失去主导权。",
  },
  "지지": {
    en: "Supports",
    ja: "支持",
    "zh-CN": "支持",
  },
  "지혜": {
    en: "Wisdom",
    ja: "知恵",
    "zh-CN": "智慧",
  },
  "지혜 90점 이상입니다.": {
    en: "Wisdom is 90 or higher.",
    ja: "知恵が90点以上です。",
    "zh-CN": "智慧达到90分以上。",
  },
  "직감": {
    en: "Intuition",
    ja: "直感",
    "zh-CN": "直觉",
  },
  "직관적 판단과 엄격한 원칙으로 정의를 추구하는 타입입니다.": {
    en: "A type that pursues justice through intuitive judgment and strict principles.",
    ja: "直感的判断と厳格な原則で正義を追求するタイプです。",
    "zh-CN": "凭借直觉判断和严格原则追求正义的类型。",
  },
  "직장": {
    en: "Workplace",
    ja: "職場",
    "zh-CN": "职场",
  },
  "직장 관계": {
    en: "Workplace Relationship",
    ja: "職場関係",
    "zh-CN": "职场关系",
  },
  "직장 내 갈등과 권력 관계": {
    en: "Workplace conflict and power dynamics",
    ja: "職場内の葛藤と権力関係",
    "zh-CN": "职场矛盾与权力关系",
  },
  "직장 동료, 5년 근무": {
    en: "Coworker, 5 years with the company",
    ja: "職場の同僚、勤務5年",
    "zh-CN": "职场同事，任职5年",
  },
  "직장 분쟁에서는 지시의 구두/서면 여부가 핵심입니다. 메신저 기록을 확인하세요.": {
    en: "In workplace disputes, whether instructions were verbal or written is key. Check messenger records.",
    ja: "職場トラブルでは、指示が口頭だったか書面だったかが核心です。メッセンジャー記録を確認してください。",
    "zh-CN": "职场纠纷中，指示是口头还是书面是关键。请确认聊天记录。",
  },
  "직접 목격 진술": {
    en: "Direct Eyewitness Statement",
    ja: "直接目撃陳述",
    "zh-CN": "直接目击陈述",
  },
  "직접 붕괴까지는 아니지만 기록 가치가 생겼습니다. 다른 증거나 발언과 연결해 다시 시도해 보세요.": {
    en: "It is not a direct collapse, but it is worth recording. Connect it with other evidence or statements and try again.",
    ja: "直接崩壊とまではいきませんが、記録する価値が生まれました。他の証拠や発言とつなげて再度試してください。",
    "zh-CN": "还不到直接崩塌，但已有记录价值。请与其他证据或发言关联后再试。",
  },
  "직접 입력": {
    en: "Direct Input",
    ja: "直接入力",
    "zh-CN": "直接输入",
  },
  "직접 진술 붕괴": {
    en: "Direct Statement Collapse",
    ja: "直接陳述崩壊",
    "zh-CN": "直接陈述崩塌",
  },
  "직접 질문을 입력하세요": {
    en: "Enter your question.",
    ja: "質問を入力してください",
    "zh-CN": "输入你的问题",
  },
  "직접 질문하고 증거를 제시하여\n진실을 밝히는 핵심 단계입니다.": {
    en: "This is the key stage: ask direct questions\nand present evidence to uncover the truth.",
    ja: "直接質問し、証拠を提示して\n真実を明らかにする核心段階です。",
    "zh-CN": "这是核心阶段：直接提问并出示证据，\n查明真相。",
  },
  "직접 충돌을 피하고 다른 맥락으로 비켜 가려는 성향입니다. 사실 확인 질문에 상대적으로 민감합니다.": {
    en: "A tendency to avoid direct conflict and sidestep into another context. Relatively sensitive to fact-checking questions.",
    ja: "直接衝突を避け、別の文脈へそらそうとする傾向です。事実確認の質問に比較的敏感です。",
    "zh-CN": "倾向于避开直接冲突，转向其他语境。对事实确认类问题相对敏感。",
  },
  "진술": {
    en: "Statements",
    ja: "陳述",
    "zh-CN": "陈述",
  },
  "진술 균열": {
    en: "Statement Fracture",
    ja: "陳述の亀裂",
    "zh-CN": "陈述裂痕",
  },
  "진술 기록 추가": {
    en: "Statement Record Added",
    ja: "陳述記録追加",
    "zh-CN": "新增陈述记录",
  },
  "진술 분석": {
    en: "Statement Analysis",
    ja: "陳述分析",
    "zh-CN": "陈述分析",
  },
  "진술 분석 결과": {
    en: "Statement Analysis Result",
    ja: "陳述分析結果",
    "zh-CN": "陈述分析结果",
  },
  "진술 분석 위주로 진행": {
    en: "Focused on statement analysis",
    ja: "陳述分析を中心に進行",
    "zh-CN": "以陈述分析为主进行",
  },
  "진술 시점 고정": {
    en: "Fix Statement Timing",
    ja: "陳述時点の固定",
    "zh-CN": "固定陈述时间点",
  },
  "진술 흐름에서 확인할 지점이 생겼습니다. 추가 질문으로 맥락을 확인하세요.": {
    en: "A point to check has emerged in the statement flow. Use follow-up questions to confirm the context.",
    ja: "陳述の流れに確認すべき点が生まれました。追加質問で文脈を確認してください。",
    "zh-CN": "陈述流向中出现了需要确认的点。请通过追加提问确认语境。",
  },
  "진술 A": {
    en: "Statement A",
    ja: "陳述A",
    "zh-CN": "陈述A",
  },
  "진술 B": {
    en: "Statement B",
    ja: "陳述B",
    "zh-CN": "陈述B",
  },
  "진술에 모순이 있습니다. 설명하십시오.": {
    en: "There is a contradiction in your statement. Explain.",
    ja: "供述に矛盾があります。説明してください。",
    "zh-CN": "陈述存在矛盾。请说明。",
  },
  "진술의 틈을 잡아 집요하게 추궁합니다": {
    en: "Press persistently on gaps in the statement.",
    ja: "供述の隙を捉えて執拗に追及します。",
    "zh-CN": "抓住陈述漏洞持续追问。",
  },
  "진술이 엇갈리기 시작했다. 지금 압박하면 효과적이다.": {
    en: "Statements are starting to diverge. Pressing now will be effective.",
    ja: "陳述が食い違い始めました。今圧迫すれば効果的です。",
    "zh-CN": "陈述开始出现分歧。现在施压会很有效。",
  },
  "진실": {
    en: "Truth",
    ja: "真実",
    "zh-CN": "真相",
  },
  "진실 공방": {
    en: "Truth Dispute",
    ja: "真実攻防",
    "zh-CN": "真相攻防",
  },
  "진실 공방에 활용": {
    en: "Use in Truth Clash",
    ja: "真実攻防で活用",
    "zh-CN": "用于真相交锋",
  },
  "진실 공방에서 새 쟁점이 튀어나왔습니다.": {
    en: "A new issue has surfaced in the truth dispute.",
    ja: "真実攻防の中で新しい争点が浮上しました。",
    "zh-CN": "真相攻防中冒出了新的争议点。",
  },
  "진실 공방이 열렸다. 양측 주장을 비교해 판결을 내려야 한다.": {
    en: "The dispute over the truth has begun. Compare both sides' claims and render a verdict.",
    ja: "真実をめぐる攻防が始まった。双方の主張を比較し、判決を下さなければならない。",
    "zh-CN": "真相攻防已经开启。必须比较双方主张并作出裁决。",
  },
  "진우": {
    en: "Jin-woo",
    ja: "ジヌ",
    "zh-CN": "振宇",
  },
  "진위": {
    en: "Veracity",
    ja: "真偽",
    "zh-CN": "真伪",
  },
  "진정시킨다": {
    en: "Calm Them Down",
    ja: "落ち着かせる",
    "zh-CN": "安抚",
  },
  "진행": {
    en: "Progress",
    ja: "進行",
    "zh-CN": "进度",
  },
  "진행 안내": {
    en: "Progress Guide",
    ja: "進行案内",
    "zh-CN": "流程提示",
  },
  "질문": {
    en: "Question",
    ja: "質問",
    "zh-CN": "问题",
  },
  "질문 3유형 모두 사용": {
    en: "Use All 3 Question Types",
    ja: "3種類すべての質問を使用",
    "zh-CN": "使用全部3种提问类型",
  },
  "질문 각도 초기화": {
    en: "Reset Question Angle",
    ja: "質問角度を初期化",
    "zh-CN": "重置提问角度",
  },
  "질문 경로 추가": {
    en: "Question Route Added",
    ja: "質問経路追加",
    "zh-CN": "新增提问路径",
  },
  "질문 경로 확정": {
    en: "Question Route Confirmed",
    ja: "質問ルート確定",
    "zh-CN": "问题路径已确认",
  },
  "질문 분석": {
    en: "Question Analysis",
    ja: "質問分析",
    "zh-CN": "问题分析",
  },
  "질문 없이 제시": {
    en: "Present Without a Question",
    ja: "質問なしで提示",
    "zh-CN": "不带问题出示",
  },
  "질문과 함께 제시하면 더 효과적입니다:": {
    en: "More effective when presented with a question:",
    ja: "質問と一緒に提示するとより効果的です:",
    "zh-CN": "配合问题出示会更有效：",
  },
  "질문을 고르다 잠시 말을 아낀다.": {
    en: "They pause briefly, choosing their words.",
    ja: "質問を整理するように、少し言葉を選ぶ。",
    "zh-CN": "像是在整理问题一样，短暂停顿后斟酌措辞。",
  },
  "질문을 받자마자 역질문으로 반사하거나 주제를 틀려는 습관입니다.": {
    en: "A habit of bouncing back with a counterquestion or changing the subject as soon as a question is asked.",
    ja: "質問を受けるとすぐ逆質問で返したり、話題をそらしたりする癖です。",
    "zh-CN": "一被提问就立刻反问或转移话题的习惯。",
  },
  "집요한 추궁 퍼크로 질문 각도를 전환할 수 있습니다.": {
    en: "Use the Persistent Press perk to change the question angle.",
    ja: "執拗な追及パークで質問の角度を変えられます。",
    "zh-CN": "可以用持续追问特权转换问题角度。",
  },
  "집요함 추가": {
    en: "Add Persistence",
    ja: "粘り強さ追加",
    "zh-CN": "增加执着",
  },
  "짝을 맞추세요!": {
    en: "Match the pairs!",
    ja: "ペアを合わせてください！",
    "zh-CN": "请配对！",
  },
  "채팅 입력 상태": {
    en: "Chat Input Status",
    ja: "チャット入力状態",
    "zh-CN": "聊天输入状态",
  },
  "책임 단서": {
    en: "Responsibility Clue",
    ja: "責任の手がかり",
    "zh-CN": "责任线索",
  },
  "책임 배분": {
    en: "Responsibility Allocation",
    ja: "責任配分",
    "zh-CN": "责任分配",
  },
  "책임 분담": {
    en: "Share Responsibility",
    ja: "責任分担",
    "zh-CN": "责任分担",
  },
  "책임을 돌리는 말투가 반복됩니다.": {
    en: "A blame-shifting tone keeps repeating.",
    ja: "責任を転嫁する口調が繰り返されています。",
    "zh-CN": "推卸责任的语气反复出现。",
  },
  "챕터별 진행률": {
    en: "Progress by Chapter",
    ja: "チャプター別進行率",
    "zh-CN": "按章节显示进度",
  },
  "처리 중": {
    en: "Processing",
    ja: "処理中",
    "zh-CN": "处理中",
  },
  "철회": {
    en: "Withdraw",
    ja: "撤回",
    "zh-CN": "撤回",
  },
  "첨부 보상": {
    en: "Attached Reward",
    ja: "添付報酬",
    "zh-CN": "附件奖励",
  },
  "첫 번째 재판을 마쳤습니다. 사건을 거듭할수록 성향이 드러납니다.": {
    en: "Your first trial is complete. Your disposition will become clearer as you take on more cases.",
    ja: "最初の裁判を終えました。事件を重ねるほど傾向が見えてきます。",
    "zh-CN": "第一次审判已经完成。随着案件增加，倾向会逐渐显现。",
  },
  "체념": {
    en: "Resigned",
    ja: "諦め",
    "zh-CN": "放弃",
  },
  "체념 — 더 이상 숨기려 하지 않습니다": {
    en: "Resigned — no longer trying to hide anything",
    ja: "諦め — これ以上隠そうとしていません",
    "zh-CN": "放弃 — 不再试图隐瞒",
  },
  "체념 — 더 이상 숨기지 않습니다": {
    en: "Resigned — hiding nothing more",
    ja: "諦念 — もう隠しません",
    "zh-CN": "认命 — 不再隐瞒",
  },
  "초기 진술": {
    en: "Opening Statements",
    ja: "冒頭陳述",
    "zh-CN": "开场陈述",
  },
  "초기 진술 듣기 →": {
    en: "Hear Opening Statements →",
    ja: "初期陳述を聞く →",
    "zh-CN": "听取初始陈述 →",
  },
  "초기 진술/반박 단계에서 대사를 자동으로 재생합니다": {
    en: "Automatically play dialogue during initial statement and rebuttal stages.",
    ja: "冒頭陳述／反論段階で台詞を自動再生します。",
    "zh-CN": "在初始陈述/反驳阶段自动播放台词。",
  },
  "초기 진술을 들을 준비가 되셨습니까?": {
    en: "Are you ready to hear the opening statements?",
    ja: "初期陳述を聞く準備はできましたか？",
    "zh-CN": "准备好听取初始陈述了吗？",
  },
  "초기화": {
    en: "Reset",
    ja: "初期化",
    "zh-CN": "重置",
  },
  "초록 구간에서 탭하세요!": {
    en: "Tap in the green zone!",
    ja: "緑のゾーンでタップ！",
    "zh-CN": "在绿色区域点击！",
  },
  "총 판결": {
    en: "Total Verdicts",
    ja: "総判決数",
    "zh-CN": "总裁决数",
  },
  "총 플레이": {
    en: "Total Plays",
    ja: "総プレイ数",
    "zh-CN": "总游玩次数",
  },
  "총점": {
    en: "Total Score",
    ja: "総合スコア",
    "zh-CN": "总分",
  },
  "최고 레벨에 도달하여": {
    en: "Max level reached,",
    ja: "最高レベルに到達したため",
    "zh-CN": "已达到最高等级，",
  },
  "최고 점수": {
    en: "Best Score",
    ja: "最高スコア",
    "zh-CN": "最高分数",
  },
  "최근 사건": {
    en: "Recent Case",
    ja: "最近の事件",
    "zh-CN": "最近案件",
  },
  "최근 알림": {
    en: "Recent Notifications",
    ja: "最近の通知",
    "zh-CN": "最近通知",
  },
  "최대 단계에 가까워졌습니다.": {
    en: "Nearing the maximum stage.",
    ja: "最大段階に近づきました。",
    "zh-CN": "已接近最高阶段。",
  },
  "최대 레벨에 도달했습니다.": {
    en: "Maximum level reached.",
    ja: "最大レベルに到達しました。",
    "zh-CN": "已达到最高等级。",
  },
  "최민준": {
    en: "Choi Min-jun",
    ja: "チェ・ミンジュン",
    "zh-CN": "崔敏俊",
  },
  "최민준 — 읽음": {
    en: "Choi Min-jun — Read",
    ja: "チェ・ミンジュン — 既読",
    "zh-CN": "崔敏俊 — 已读",
  },
  "최민준 씨가 9월에 급하게 돈이 필요하다고 했습니다. 경조사라고 했는데, 구체적으로 누구 경조사인지는 말하지 않았습니다. 평소와 달리 좀 초조해 보였고, 점심시간에 자주 전화를 받으러 나갔습니다.": {
    en: "Choi Min-jun said he urgently needed money in September. He said it was for family occasions, but he never said exactly whose. He seemed more anxious than usual and often stepped out at lunch to take calls.",
    ja: "チェ・ミンジュンさんは9月に急にお金が必要だと言っていました。冠婚葬祭だと言っていましたが、具体的に誰のことかは話しませんでした。普段と違って少し焦っているように見え、昼休みによく電話を受けに外へ出ていました。",
    "zh-CN": "崔敏俊说他9月急需用钱。他说是红白事，但没有具体说是谁家的事。他看起来比平时更焦躁，午休时也经常出去接电话。",
  },
  "최민준 휴대폰": {
    en: "Choi Min-jun's Phone",
    ja: "チェ・ミンジュンの携帯電話",
    "zh-CN": "崔敏俊的手机",
  },
  "최민준이 은행에 입장합니다": {
    en: "Choi Min-jun enters the bank.",
    ja: "チェ・ミンジュンが銀行に入ります。",
    "zh-CN": "崔敏俊进入银行。",
  },
  "최복순": {
    en: "Choi Bok-sun",
    ja: "チェ・ボクスン",
    "zh-CN": "崔福顺",
  },
  "최종 판결": {
    en: "Final Verdict",
    ja: "最終判決",
    "zh-CN": "最终判决",
  },
  "최종 판단": {
    en: "Final Judgment",
    ja: "最終判断",
    "zh-CN": "最终判断",
  },
  "추가 심리": {
    en: "Continue Hearing",
    ja: "追加審理",
    "zh-CN": "继续审理",
  },
  "추가 자료가 더 필요하다고 보았습니다.": {
    en: "You judged that more materials are needed.",
    ja: "追加資料がさらに必要だと見ました。",
    "zh-CN": "你判断还需要更多资料。",
  },
  "추가 조치 없이 판결 내용을 따르는 것": {
    en: "Follow the verdict without further action",
    ja: "追加措置なしに判決内容に従うこと",
    "zh-CN": "不追加措施，遵照裁决内容",
  },
  "추궁하기": {
    en: "Press",
    ja: "追及する",
    "zh-CN": "追问",
  },
  "추론": {
    en: "Reasoning",
    ja: "推論",
    "zh-CN": "推理",
  },
  "추천": {
    en: "Recommended",
    ja: "おすすめ",
    "zh-CN": "推荐",
  },
  "추천 증거": {
    en: "Recommended Evidence",
    ja: "推奨証拠",
    "zh-CN": "推荐证据",
  },
  "축 전용 성장 경로": {
    en: "Axis-Specific Growth Path",
    ja: "軸専用成長経路",
    "zh-CN": "轴专用成长路径",
  },
  "출력은 JSON 한 개 또는 자연어 후일담 본문만 허용한다.": {
    en: "Output must be either a single JSON object or the epilogue text in natural language.",
    ja: "出力はJSON 1個、または自然文の後日談本文のみを許可する。",
    "zh-CN": "输出仅允许为一个 JSON，或自然语言形式的后日谈正文。",
  },
  "출처 확인": {
    en: "Verify Source",
    ja: "出どころ確認",
    "zh-CN": "确认来源",
  },
  "충돌": {
    en: "Conflicts",
    ja: "衝突",
    "zh-CN": "冲突",
  },
  "취득 경위": {
    en: "Acquisition Details",
    ja: "取得経緯",
    "zh-CN": "取得经过",
  },
  "취소": {
    en: "Cancel",
    ja: "キャンセル",
    "zh-CN": "取消",
  },
  "측 증거 (": {
    en: "'s Evidence (",
    ja: "側の証拠（",
    "zh-CN": "方证据（",
  },
  "친구": {
    en: "Friend",
    ja: "友人",
    "zh-CN": "朋友",
  },
  "친구 간 배신·금전·관계 갈등": {
    en: "Conflict between friends over betrayal, money, and relationships",
    ja: "友人間の裏切り・金銭・関係をめぐる葛藤",
    "zh-CN": "朋友之间围绕背叛、金钱与关系的矛盾",
  },
  "친구 간 분쟁에서는 구두 약속의 해석 차이가 핵심입니다. 제3자 증언이 결정적일 수 있습니다.": {
    en: "In disputes between friends, differing interpretations of verbal promises are often key. Third-party testimony may be decisive.",
    ja: "友人同士の紛争では、口約束の解釈の違いが核心です。第三者の証言が決定打になることがあります。",
    "zh-CN": "朋友之间的纠纷中，口头约定的理解差异往往是关键。第三方证言可能具有决定性。",
  },
  "친구만": {
    en: "Friends Only",
    ja: "友人のみ",
    "zh-CN": "仅好友",
  },
  "침묵은 때로 거짓보다 오래 의심을 남긴다.": {
    en: "Silence can leave suspicion longer than a lie.",
    ja: "沈黙は時に、嘘より長く疑いを残す。",
    "zh-CN": "沉默有时比谎言更久地留下怀疑。",
  },
  "침묵은 때로 선의보다 오래 의심을 남긴다.": {
    en: "Silence sometimes leaves suspicion longer than goodwill.",
    ja: "沈黙は時に、善意より長く疑いを残す。",
    "zh-CN": "沉默有时比善意更久地留下怀疑。",
  },
  "침착": {
    en: "Calm",
    ja: "冷静",
    "zh-CN": "冷静",
  },
  "칭호": {
    en: "Title",
    ja: "称号",
    "zh-CN": "称号",
  },
  "칭호 상세보기": {
    en: "Title Details",
    ja: "称号詳細",
    "zh-CN": "称号详情",
  },
  "칭호 선택": {
    en: "Select Title",
    ja: "称号選択",
    "zh-CN": "选择称号",
  },
  "칭호 컬렉션 (": {
    en: "Title Collection (",
    ja: "称号コレクション (",
    "zh-CN": "称号收藏 (",
  },
  "칭호를 장착하세요": {
    en: "Equip a title",
    ja: "称号を装着してください",
    "zh-CN": "请装备称号",
  },
  "카카오톡 대화": {
    en: "KakaoTalk Chat",
    ja: "カカオトーク会話",
    "zh-CN": "KakaoTalk聊天",
  },
  "카카오톡 대화 기록 — 2025.09.10~09.25": {
    en: "KakaoTalk Chat Log — 2025.09.10–09.25",
    ja: "カカオトーク会話記録 — 2025.09.10〜09.25",
    "zh-CN": "KakaoTalk聊天记录 — 2025.09.10～09.25",
  },
  "카톡": {
    en: "KakaoTalk",
    ja: "カカオトーク",
    "zh-CN": "KakaoTalk",
  },
  "캐릭터 정보": {
    en: "Character Info",
    ja: "キャラクター情報",
    "zh-CN": "角色信息",
  },
  "캐릭터의 심리 상태 힌트를 표시합니다": {
    en: "Show hints about each character’s psychological state.",
    ja: "キャラクターの心理状態のヒントを表示します。",
    "zh-CN": "显示角色心理状态提示。",
  },
  "캠페인 모드": {
    en: "Campaign Mode",
    ja: "キャンペーンモード",
    "zh-CN": "战役模式",
  },
  "캡처 범위: 원본 삭제됨, B(박서연)가 캡처 제출": {
    en: "Capture scope: original deleted; B (Park Seo-yeon) submitted the capture.",
    ja: "キャプチャ範囲：原本削除済み、B（パク・ソヨン）がキャプチャを提出。",
    "zh-CN": "截图范围：原帖已删除，由B（朴瑞妍）提交截图。",
  },
  "클리어": {
    en: "Cleared",
    ja: "クリア",
    "zh-CN": "已通关",
  },
  "클리어 ·": {
    en: "Cleared ·",
    ja: "クリア ·",
    "zh-CN": "已通关 ·",
  },
  "클리어!": {
    en: "Cleared!",
    ja: "クリア！",
    "zh-CN": "通关！",
  },
  "클리어율 상세": {
    en: "Completion Details",
    ja: "達成率詳細",
    "zh-CN": "完成率详情",
  },
  "타이핑 애니메이션 속도": {
    en: "Typing Animation Speed",
    ja: "タイピングアニメーション速度",
    "zh-CN": "打字动画速度",
  },
  "탐구": {
    en: "Inquiry",
    ja: "探求",
    "zh-CN": "探究",
  },
  "탐구 축": {
    en: "Inquiry Axis",
    ja: "探究軸",
    "zh-CN": "探究轴",
  },
  "탐지 버튼": {
    en: "Detect Button",
    ja: "検知ボタン",
    "zh-CN": "侦测按钮",
  },
  "태준": {
    en: "Tae-jun",
    ja: "テジュン",
    "zh-CN": "泰俊",
  },
  "턴 / 최대": {
    en: "turns / max",
    ja: "ターン / 最大",
    "zh-CN": "回合 / 最大",
  },
  "테스트용 — 출시 시 제거 예정": {
    en: "For testing — remove before release",
    ja: "テスト用 — リリース時に削除予定",
    "zh-CN": "测试用 — 发布时移除",
  },
  "통계": {
    en: "Stats",
    ja: "統計",
    "zh-CN": "统计",
  },
  "통계를 표시하려면 먼저 사건을 플레이하세요.": {
    en: "Play a case first to view stats.",
    ja: "統計を表示するには、まず事件をプレイしてください。",
    "zh-CN": "请先游玩案件，才能显示统计。",
  },
  "통계를 표시하려면 사건을 플레이하세요.": {
    en: "Play a case to display statistics.",
    ja: "統計を表示するには事件をプレイしてください。",
    "zh-CN": "请游玩案件以显示统计。",
  },
  "통신사": {
    en: "Carrier",
    ja: "通信会社",
    "zh-CN": "通信运营商",
  },
  "통신이 원활한 환경에서 다시 시도해 주세요.": {
    en: "Please try again on a stable connection.",
    ja: "通信が安定した環境で再度お試しください。",
    "zh-CN": "请在网络稳定的环境下重试。",
  },
  "통신확인": {
    en: "Communications Check",
    ja: "通信確認",
    "zh-CN": "通信确认",
  },
  "통찰": {
    en: "Insight",
    ja: "洞察",
    "zh-CN": "洞察",
  },
  "통찰 90점 이상입니다.": {
    en: "Insight is 90 or higher.",
    ja: "洞察が90点以上です。",
    "zh-CN": "洞察达到90分以上。",
  },
  "통찰, 권위, 지혜가 모두 80점 이상입니다.": {
    en: "Insight, Authority, and Wisdom are all 80 or higher.",
    ja: "洞察・権威・知恵がすべて80点以上です。",
    "zh-CN": "洞察、权威、智慧均达到80分以上。",
  },
  "통화": {
    en: "Call",
    ja: "通話",
    "zh-CN": "通话",
  },
  "통화 기록": {
    en: "Call Records",
    ja: "通話記録",
    "zh-CN": "通话记录",
  },
  "통화 기록 대장": {
    en: "Call Log Register",
    ja: "通話記録台帳",
    "zh-CN": "通话记录台账",
  },
  "통화시간·메시지": {
    en: "Call Duration · Message",
    ja: "通話時間·メッセージ",
    "zh-CN": "通话时间·消息",
  },
  "특별": {
    en: "Special",
    ja: "特別",
    "zh-CN": "特别",
  },
  "특별한 해결책 없음": {
    en: "No Special Solution",
    ja: "特別な解決策なし",
    "zh-CN": "无特殊解决方案",
  },
  "특이사항: 09.05, 09.12, 09.25 송금일에 동일번호(7821) 집중 통화": {
    en: "Notes: Calls to the same number (7821) were concentrated on remittance dates 09.05, 09.12, and 09.25.",
    ja: "特記事項：09.05、09.12、09.25の送金日に同一番号（7821）への通話が集中。",
    "zh-CN": "特别事项：09.05、09.12、09.25转账日集中拨打同一号码（7821）。",
  },
  "특정 쟁점 즉시 붕괴": {
    en: "Immediately Break a Specific Issue",
    ja: "特定の争点を即時崩す",
    "zh-CN": "立即击破特定争议点",
  },
  "파생 노드": {
    en: "Derived Node",
    ja: "派生ノード",
    "zh-CN": "派生节点",
  },
  "판결": {
    en: "Verdict",
    ja: "判決",
    "zh-CN": "裁决",
  },
  "판결 검토로": {
    en: "To Verdict Review",
    ja: "判決確認へ",
    "zh-CN": "进入裁决复核",
  },
  "판결 결과 카드": {
    en: "Verdict Result Card",
    ja: "判決結果カード",
    "zh-CN": "裁决结果卡",
  },
  "판결 균형": {
    en: "Verdict Balance",
    ja: "判決バランス",
    "zh-CN": "裁决平衡",
  },
  "판결 근거로 사용": {
    en: "Use as Basis for Verdict",
    ja: "判決の根拠として使用",
    "zh-CN": "用作裁决依据",
  },
  "판결 기록": {
    en: "Verdict Records",
    ja: "判決記録",
    "zh-CN": "裁决记录",
  },
  "판결 선고": {
    en: "Deliver Verdict",
    ja: "判決を言い渡す",
    "zh-CN": "宣告裁决",
  },
  "판결 완충": {
    en: "Verdict Buffer",
    ja: "判決緩衝",
    "zh-CN": "裁决缓冲",
  },
  "판결 완충 퍼크로 대응할 수 있습니다.": {
    en: "The Verdict Buffer perk can counter this.",
    ja: "判決緩衝パークで対応できます。",
    "zh-CN": "可以用裁决缓冲特权应对。",
  },
  "판결 이후": {
    en: "After the Verdict",
    ja: "判決後",
    "zh-CN": "裁决之后",
  },
  "판결 재개": {
    en: "Resume Verdict",
    ja: "判決を再開",
    "zh-CN": "恢复裁决",
  },
  "판결 전 정리": {
    en: "Pre-Verdict Review",
    ja: "判決前整理",
    "zh-CN": "裁决前整理",
  },
  "판결 조각 보유 현황": {
    en: "Verdict Fragment Inventory",
    ja: "判決のかけら所持状況",
    "zh-CN": "裁决碎片持有情况",
  },
  "판결 조각 회수 완료": {
    en: "Verdict Fragment Recovered",
    ja: "判決フラグメント回収完了",
    "zh-CN": "裁决碎片回收完成",
  },
  "판결 조각을 넣어 칭호 레벨을 올립니다.": {
    en: "Use verdict fragments to raise title levels.",
    ja: "判決のかけらを入れて称号レベルを上げます。",
    "zh-CN": "投入裁决碎片以提升称号等级。",
  },
  "판결 준비도": {
    en: "Verdict Readiness",
    ja: "判決準備度",
    "zh-CN": "裁决准备度",
  },
  "판결 중심": {
    en: "Verdict Core",
    ja: "判決の核心",
    "zh-CN": "裁决核心",
  },
  "판결 진입": {
    en: "Proceed to Verdict",
    ja: "判決へ進む",
    "zh-CN": "进入裁决",
  },
  "판결 힌트 추가": {
    en: "Verdict Hint Added",
    ja: "判決ヒント追加",
    "zh-CN": "新增裁决提示",
  },
  "판결문": {
    en: "Written Verdict",
    ja: "判決文",
    "zh-CN": "裁决书",
  },
  "판결문 복사하기": {
    en: "Copy Written Verdict",
    ja: "判決文をコピー",
    "zh-CN": "复制裁决书",
  },
  "판결문 요약": {
    en: "Verdict Summary",
    ja: "判決要約",
    "zh-CN": "裁决摘要",
  },
  "판결문이 생성되지 않았습니다.": {
    en: "No written verdict has been generated.",
    ja: "判決文が生成されていません。",
    "zh-CN": "尚未生成裁决书。",
  },
  "판결에서 제외": {
    en: "Exclude from Verdict",
    ja: "判決から除外",
    "zh-CN": "从裁决中排除",
  },
  "판결은 가능하지만, 불완전한 기록으로 평가될 수 있습니다.": {
    en: "You may deliver a verdict, but it may be assessed as based on an incomplete record.",
    ja: "判決は可能ですが、不完全な記録に基づく評価と見なされる可能性があります。",
    "zh-CN": "可以作出裁决，但可能会被评价为基于不完整记录。",
  },
  "판결을 내려보세요!": {
    en: "Deliver your verdict!",
    ja: "判決を下しましょう！",
    "zh-CN": "作出你的裁决！",
  },
  "판결을 선언합니다": {
    en: "Declare the Verdict",
    ja: "判決を宣言します",
    "zh-CN": "宣告裁决",
  },
  "판결이 완료되었습니다": {
    en: "Verdict Completed",
    ja: "判決が完了しました",
    "zh-CN": "裁决已完成",
  },
  "판단": {
    en: "Judgment",
    ja: "判断",
    "zh-CN": "判断",
  },
  "판단 보류": {
    en: "Judgment Deferred",
    ja: "判断保留",
    "zh-CN": "暂缓判断",
  },
  "판단 상태": {
    en: "Judgment Status",
    ja: "判断状態",
    "zh-CN": "判断状态",
  },
  "판단 수정": {
    en: "Revise Judgment",
    ja: "判断を修正",
    "zh-CN": "修正判断",
  },
  "판단 실패": {
    en: "Judgment Failed",
    ja: "判断失敗",
    "zh-CN": "判断失败",
  },
  "판단 충돌": {
    en: "Judgment Conflict",
    ja: "判断衝突",
    "zh-CN": "判断冲突",
  },
  "판단 확정": {
    en: "Confirm Judgment",
    ja: "判断を確定",
    "zh-CN": "确认判断",
  },
  "판단:": {
    en: "Judgment:",
    ja: "判断:",
    "zh-CN": "判断：",
  },
  "패널티 경감": {
    en: "Reduced Penalty",
    ja: "ペナルティ軽減",
    "zh-CN": "减轻惩罚",
  },
  "패널티 없음": {
    en: "No Penalty",
    ja: "ペナルティなし",
    "zh-CN": "无惩罚",
  },
  "퍼크": {
    en: "Perk",
    ja: "パーク",
    "zh-CN": "特权",
  },
  "퍼크 1회": {
    en: "1 Perk Use",
    ja: "パーク1回",
    "zh-CN": "1次特权",
  },
  "퍼크 장착": {
    en: "Equip Perk",
    ja: "パーク装着",
    "zh-CN": "装备特权",
  },
  "퍼크는 정식 등급(5건 + 성향 안정화) 이상에서 해금됩니다": {
    en: "Perks unlock at Full rank or higher (5 cases + stabilized disposition)",
    ja: "パークは正式ランク（5件＋傾向安定化）以上で解放されます",
    "zh-CN": "特权在正式等级以上解锁（5 件 + 倾向稳定）",
  },
  "편집": {
    en: "Edit",
    ja: "編集",
    "zh-CN": "编辑",
  },
  "편집 검사": {
    en: "Check Edits",
    ja: "編集チェック",
    "zh-CN": "检查编辑痕迹",
  },
  "편함과 선 넘음의 한 끗 차이": {
    en: "The fine line between comfort and crossing a line",
    ja: "気安さと一線越えの紙一重",
    "zh-CN": "亲近与越界只差一线",
  },
  "편향 없이 균형 잡힌 시선으로 사건을 바라보는 타입입니다.": {
    en: "A type that views cases with a balanced, unbiased perspective.",
    ja: "偏りなく均衡の取れた視線で事件を見るタイプです。",
    "zh-CN": "以无偏见且均衡的视角看待案件的类型。",
  },
  "편향도": {
    en: "Bias",
    ja: "偏り度",
    "zh-CN": "偏向度",
  },
  "평가": {
    en: "Evaluation",
    ja: "評価",
    "zh-CN": "评价",
  },
  "평균": {
    en: "Average",
    ja: "平均",
    "zh-CN": "平均",
  },
  "평균 점수": {
    en: "Average Score",
    ja: "平均スコア",
    "zh-CN": "平均分数",
  },
  "평온한 상태.": {
    en: "Calm state.",
    ja: "平穏な状態。",
    "zh-CN": "平静状态。",
  },
  "포기": {
    en: "Give Up",
    ja: "諦める",
    "zh-CN": "放弃",
  },
  "포커스가 이동해 잠시 멈췄습니다.": {
    en: "Focus moved, so the game paused briefly.",
    ja: "フォーカスが移動したため、一時停止しました。",
    "zh-CN": "焦点已移动，游戏暂时暂停。",
  },
  "표면 정보만 확인 가능합니다. 조사하면 상세 내용이 드러납니다.": {
    en: "Only surface information is available. Investigate to reveal the details.",
    ja: "表面情報のみ確認できます。調査すると詳細が明らかになります。",
    "zh-CN": "目前只能确认表面信息。调查后会显现详细内容。",
  },
  "표시 기준": {
    en: "Display Basis",
    ja: "表示基準",
    "zh-CN": "显示标准",
  },
  "프로필": {
    en: "Profile",
    ja: "プロフィール",
    "zh-CN": "个人资料",
  },
  "프로필 카드 보기": {
    en: "View Profile Card",
    ja: "プロフィールカードを見る",
    "zh-CN": "查看个人资料卡",
  },
  "플레이 기록": {
    en: "Play History",
    ja: "プレイ履歴",
    "zh-CN": "游玩记录",
  },
  "피로도 리셋": {
    en: "Reset Fatigue",
    ja: "疲労度リセット",
    "zh-CN": "重置疲劳度",
  },
  "피해 호소형": {
    en: "Victim-Appeal Type",
    ja: "被害訴え型",
    "zh-CN": "受害申诉型",
  },
  "피해자 서사": {
    en: "Victim Narrative",
    ja: "被害者の物語",
    "zh-CN": "受害者叙事",
  },
  "필요": {
    en: "Needed",
    ja: "必要",
    "zh-CN": "需要",
  },
  "하나 이상의 쟁점을 보류했습니다.": {
    en: "Deferred at least one issue.",
    ja: "1つ以上の争点を保留しました。",
    "zh-CN": "至少暂缓一个争议点。",
  },
  "하단에서 대상(민준/서연)을 선택하고, 질문 유형과 쟁점을 골라 질문하세요. 비활성화된 선택지는 현재 의미 없는 조합입니다.": {
    en: "Select a target (Min-jun/Seo-yeon) at the bottom, then choose a question type and issue. Disabled options are combinations that currently have no effect.",
    ja: "下部で対象（ミンジュン／ソヨン）を選び、質問タイプと争点を選んで質問してください。無効な選択肢は、現時点では意味のない組み合わせです。",
    "zh-CN": "请在底部选择对象（民俊/瑞妍），再选择提问类型和争议点进行提问。灰掉的选项表示当前没有意义的组合。",
  },
  "하루동안 보지 않기": {
    en: "Hide for Today",
    ja: "今日は表示しない",
    "zh-CN": "今天不再显示",
  },
  "학교 알림": {
    en: "School Notice",
    ja: "学校通知",
    "zh-CN": "学校通知",
  },
  "한계": {
    en: "Limit",
    ja: "限界",
    "zh-CN": "限制",
  },
  "합계": {
    en: "Total",
    ja: "小計",
    "zh-CN": "合计",
  },
  "항목": {
    en: "Item",
    ja: "項目",
    "zh-CN": "项目",
  },
  "해결": {
    en: "Resolution",
    ja: "解決",
    "zh-CN": "解决",
  },
  "해결 방향": {
    en: "Resolution Direction",
    ja: "解決方向",
    "zh-CN": "解决方向",
  },
  "해결 적절성": {
    en: "Resolution Fit",
    ja: "解決の適切性",
    "zh-CN": "解决适切度",
  },
  "해결 축": {
    en: "Resolution Axis",
    ja: "解決軸",
    "zh-CN": "解决轴",
  },
  "해결책": {
    en: "Solution",
    ja: "解決策",
    "zh-CN": "解决方案",
  },
  "해결책을 3개 이상 선택했습니다.": {
    en: "Selected at least 3 solutions.",
    ja: "解決策を3つ以上選択しました。",
    "zh-CN": "选择至少3项解决方案。",
  },
  "해금": {
    en: "Unlock",
    ja: "解放",
    "zh-CN": "解锁",
  },
  "해금 조건: 쟁점 진전 필요": {
    en: "Unlock condition: advance the issue",
    ja: "解放条件: 争点の進展が必要",
    "zh-CN": "解锁条件：推进争议点",
  },
  "해제": {
    en: "Unequip",
    ja: "解除",
    "zh-CN": "解除",
  },
  "핵심": {
    en: "Key Point",
    ja: "核心",
    "zh-CN": "核心",
  },
  "핵심 쟁점이 충분히 정리되지 않았습니다. 판결은 가능하지만 신뢰도 감점이 적용됩니다.": {
    en: "Key issues have not been sufficiently organized. You may issue a verdict, but a reliability penalty will apply.",
    ja: "核心争点が十分に整理されていません。判決は可能ですが、信頼度の減点が適用されます。",
    "zh-CN": "核心争议点尚未充分整理。可以作出裁决，但会受到可信度扣分。",
  },
  "핵심 질문으로 진실을 끌어냅니다": {
    en: "Draw out the truth with the key question.",
    ja: "核心となる質問で真実を引き出します。",
    "zh-CN": "用核心问题引出真相。",
  },
  "행동 선택": {
    en: "Choose Action",
    ja: "行動選択",
    "zh-CN": "选择行动",
  },
  "행동 징후 표시": {
    en: "Show Behavior Cues",
    ja: "行動の兆候を表示",
    "zh-CN": "显示行为迹象",
  },
  "행동과 결과만 보고 의도까지 단정하려는 습관입니다.": {
    en: "A habit of judging intent from actions and results alone.",
    ja: "行動と結果だけを見て、意図まで断定しようとする癖です。",
    "zh-CN": "习惯只看行动和结果，就连意图也一起断定。",
  },
  "행동의 진짜 이유를 탐색합니다": {
    en: "Probe the real reason behind the action",
    ja: "行動の本当の理由を探ります",
    "zh-CN": "探查行动背后的真实理由",
  },
  "허용한다": {
    en: "Allow It",
    ja: "許可する",
    "zh-CN": "允许",
  },
  "헤드라인": {
    en: "Headline",
    ja: "見出し",
    "zh-CN": "标题",
  },
  "현금을 인출합니다. 금액: 200만원": {
    en: "Withdraws cash. Amount: ₩2M",
    ja: "現金を引き出します。金額：200万ウォン",
    "zh-CN": "提取现金。金额：200万韩元",
  },
  "현대판 솔로몬이 되어\n판결을 내려보세요!": {
    en: "Become a modern Solomon\nand deliver your verdict.",
    ja: "現代のソロモンとなり、\n判決を下しましょう。",
    "zh-CN": "成为现代所罗门，\n作出你的裁决吧。",
  },
  "현명한 재판관": {
    en: "Wise Judge",
    ja: "賢明な裁判官",
    "zh-CN": "睿智法官",
  },
  "현재": {
    en: "Current",
    ja: "現在",
    "zh-CN": "当前",
  },
  "현재 공지사항이 없습니다.": {
    en: "No notices at the moment.",
    ja: "現在お知らせはありません。",
    "zh-CN": "当前没有公告。",
  },
  "현재 단계에서는 결론이 아니라 검토 범위만 추가됩니다.": {
    en: "At this stage, only the review scope is added, not a conclusion.",
    ja: "現段階では結論ではなく、検討範囲だけが追加されます。",
    "zh-CN": "当前阶段增加的只是审查范围，并非结论。",
  },
  "현재 대상의 반응 방식과 흔들림 포인트를 요약한 성향 정보입니다.": {
    en: "Trait info summarizing the current target's response style and weak points.",
    ja: "現在の対象の反応方式と揺らぎポイントを要約した性向情報です。",
    "zh-CN": "概括当前对象的反应方式与动摇点的倾向信息。",
  },
  "현재 발언 B": {
    en: "Current Statement B",
    ja: "現在の発言B",
    "zh-CN": "当前发言B",
  },
  "현재 상대방이 강하게 부정 중이므로, 감정보다 증거 기반 추궁이 효과적입니다.": {
    en: "The other party is strongly denying it right now, so evidence-based pressure will work better than emotional appeals.",
    ja: "現在、相手は強く否認しています。感情よりも証拠に基づく追及が効果的です。",
    "zh-CN": "当前对方正在强烈否认，因此基于证据的追问比情绪攻势更有效。",
  },
  "현재 슬롯에 장착 중": {
    en: "Equipped in Current Slot",
    ja: "現在のスロットに装着中",
    "zh-CN": "已装备在当前槽位",
  },
  "현재 쟁점과 직접 연결됩니다": {
    en: "Directly tied to the current issue",
    ja: "現在の争点に直接つながります",
    "zh-CN": "与当前争议点直接相关",
  },
  "현재 진술": {
    en: "Current Statement",
    ja: "現在の供述",
    "zh-CN": "当前陈述",
  },
  "현재 진행 상황은 저장되지 않습니다.": {
    en: "Current progress will not be saved.",
    ja: "現在の進行状況は保存されません。",
    "zh-CN": "当前进度不会保存。",
  },
  "현재 판단 유지": {
    en: "Keep Current Judgment",
    ja: "現在の判断を維持",
    "zh-CN": "维持当前判断",
  },
  "현재 효과": {
    en: "Current Effect",
    ja: "現在の効果",
    "zh-CN": "当前效果",
  },
  "형이 집을 비우는 시간이 길어서 조카 혼자 있는 날이 많았습니다. 제가 아니면... 누가 합니까.": {
    en: "My brother was away from home for long hours, so there were many days when my nephew was alone. If I did not... who would?",
    ja: "兄が家を空ける時間が長く、甥が一人でいる日が多かったんです。私がやらなければ……誰がやるんですか。",
    "zh-CN": "我哥经常长时间不在家，侄子很多时候都是一个人。不是我去的话……还能有谁？",
  },
  "홈으로": {
    en: "Home",
    ja: "ホームへ",
    "zh-CN": "返回首页",
  },
  "화면 밖 진실은 더 늦게 드러난다": {
    en: "The truth beyond the screen emerges later",
    ja: "画面の外の真実はもっと遅れて明らかになる",
    "zh-CN": "屏幕外的真相更晚浮现",
  },
  "화해": {
    en: "Reconciliation",
    ja: "和解",
    "zh-CN": "和解",
  },
  "확보한 증거로 빠져나갈 길을 막습니다": {
    en: "Use secured evidence to block every escape route.",
    ja: "確保した証拠で逃げ道を塞ぎます。",
    "zh-CN": "用已掌握的证据堵住退路。",
  },
  "확보한 증거를 대상에게 제시하면 거짓말이 붕괴됩니다. 증거 탭에서 4축 정보(신뢰도/완전성/출처/정당성)를 확인하세요.": {
    en: "Present secured evidence to the target to break down lies. Check the Evidence tab for four-axis details: reliability, completeness, source, and legitimacy.",
    ja: "確保した証拠を対象に提示すると、嘘が崩れます。証拠タブで4軸情報（信頼度／完全性／出所／正当性）を確認してください。",
    "zh-CN": "向对象出示已取得的证据，可击破谎言。请在证据页查看四项信息：可信度、完整性、来源、正当性。",
  },
  "확실도": {
    en: "Certainty",
    ja: "確実度",
    "zh-CN": "确信度",
  },
  "확인": {
    en: "Check",
    ja: "確認",
    "zh-CN": "确认",
  },
  "확인 — 쟁점 목록에 추가됨": {
    en: "Confirm — added to issue list",
    ja: "確認 — 争点リストに追加済み",
    "zh-CN": "确认 — 已加入争议点列表",
  },
  "확인 방향": {
    en: "Direction to Check",
    ja: "確認方向",
    "zh-CN": "确认方向",
  },
  "확인 없는 확신은 법정 밖에서도 상처가 된다.": {
    en: "Conviction without confirmation leaves wounds even beyond the courtroom.",
    ja: "確かめない確信は、法廷の外でも傷になる。",
    "zh-CN": "未经确认的确信，在法庭之外也会留下伤口。",
  },
  "확인 적용": {
    en: "Apply",
    ja: "適用",
    "zh-CN": "应用",
  },
  "확인하지 않은 걱정은 쉽게 비난이 된다.": {
    en: "Unchecked concern easily turns into blame.",
    ja: "確認しない心配は、すぐ非難に変わる。",
    "zh-CN": "未经确认的担心，很容易变成指责。",
  },
  "확인하지 않은 마음은 관계 밖에서 다시 돌아온다.": {
    en: "Unchecked feelings return from outside the relationship.",
    ja: "確かめない思いは、関係の外から戻ってくる。",
    "zh-CN": "未经确认的心意，会从关系之外再次回来。",
  },
  "확인해야 할 범위가 넓어졌습니다": {
    en: "The scope to check has widened",
    ja: "確認すべき範囲が広がりました",
    "zh-CN": "需要确认的范围扩大了",
  },
  "확인했습니다": {
    en: "Confirmed",
    ja: "確認しました",
    "zh-CN": "已确认",
  },
  "확정": {
    en: "Finalize",
    ja: "確定",
    "zh-CN": "确认",
  },
  "활성화 (": {
    en: "Enable (",
    ja: "有効化 (",
    "zh-CN": "启用 (",
  },
  "회사 선배... 결혼이랑 장례식": {
    en: "A senior coworker... a wedding and a funeral.",
    ja: "会社の先輩……結婚式と葬式。",
    "zh-CN": "公司前辈……婚礼和葬礼。",
  },
  "회피 판독": {
    en: "Evasion Read",
    ja: "回避判読",
    "zh-CN": "回避识别",
  },
  "회피형": {
    en: "Avoidant Type",
    ja: "回避型",
    "zh-CN": "回避型",
  },
  "획득 카드": {
    en: "Acquired Cards",
    ja: "獲得カード",
    "zh-CN": "获得卡片",
  },
  "획득한 칭호": {
    en: "Earned Title",
    ja: "獲得した称号",
    "zh-CN": "获得的称号",
  },
  "효과음": {
    en: "Sound Effects",
    ja: "効果音",
    "zh-CN": "音效",
  },
  "후일담": {
    en: "Epilogue",
    ja: "後日談",
    "zh-CN": "后日谈",
  },
  "후일담 데이터가 없습니다.": {
    en: "No epilogue data available.",
    ja: "後日談データがありません。",
    "zh-CN": "没有后日谈数据。",
  },
  "후일담을 작성하고 있습니다...": {
    en: "Writing the epilogue...",
    ja: "後日談を作成しています...",
    "zh-CN": "正在撰写后日谈...",
  },
  "후일담을 정리하고 있습니다...": {
    en: "Preparing the epilogue...",
    ja: "後日談を整理しています...",
    "zh-CN": "正在整理后日谈...",
  },
  "후일담이 저장되지 않은 기록입니다.": {
    en: "No epilogue was saved for this record.",
    ja: "後日談が保存されていない記録です。",
    "zh-CN": "该记录未保存后日谈。",
  },
  "후회와 거리감이 크게 남는 결말": {
    en: "An ending where regret and distance remain strongly",
    ja: "後悔と距離感が大きく残る結末",
    "zh-CN": "后悔与疏离感强烈残留的结局",
  },
  "훌륭한 재판관": {
    en: "Excellent Judge",
    ja: "優秀な裁判官",
    "zh-CN": "优秀法官",
  },
  "희귀": {
    en: "Rare",
    ja: "レア",
    "zh-CN": "稀有",
  },
  "A 주장": {
    en: "A's Claim",
    ja: "Aの主張",
    "zh-CN": "A方主张",
  },
  "A 측": {
    en: "Side A",
    ja: "A側",
    "zh-CN": "A方",
  },
  "A 측 주장을 신뢰합니다": {
    en: "Trust A’s Claim",
    ja: "A側の主張を信頼します",
    "zh-CN": "信任A方主张",
  },
  "A의 주장이 더 설득력 있습니다": {
    en: "A's claim is more persuasive",
    ja: "Aの主張のほうが説得力があります",
    "zh-CN": "A方主张更有说服力",
  },
  "A측": {
    en: "Side A",
    ja: "A側",
    "zh-CN": "A方",
  },
  "A편": {
    en: "A-leaning",
    ja: "A寄り",
    "zh-CN": "偏A方",
  },
  "AI 연결": {
    en: "AI Connection",
    ja: "AI接続",
    "zh-CN": "AI 连接",
  },
  "AI 연결 시 자유 질문을 사용할 수 있습니다": {
    en: "Free questions are available when AI is connected",
    ja: "AI接続時に自由質問を使用できます",
    "zh-CN": "连接 AI 后可使用自由提问",
  },
  "AI가 전체 진술을 정리 · 모순 탐지": {
    en: "AI summarizes all statements and detects contradictions",
    ja: "AIが全陳述を整理・矛盾を検出",
    "zh-CN": "AI整理全部陈述并检测矛盾",
  },
  "ATM 기기 앞에 서있습니다": {
    en: "Standing in front of the ATM.",
    ja: "ATM端末の前に立っています。",
    "zh-CN": "站在ATM机前。",
  },
  "B 주장": {
    en: "B's Claim",
    ja: "Bの主張",
    "zh-CN": "B方主张",
  },
  "B 측": {
    en: "Side B",
    ja: "B側",
    "zh-CN": "B方",
  },
  "B 측 주장을 신뢰합니다": {
    en: "Trust B’s Claim",
    ja: "B側の主張を信頼します",
    "zh-CN": "信任B方主张",
  },
  "B의": {
    en: "B's",
    ja: "Bの",
    "zh-CN": "B的",
  },
  "B의 주장이 더 설득력 있습니다": {
    en: "B's claim is more persuasive",
    ja: "Bの主張のほうが説得力があります",
    "zh-CN": "B方主张更有说服力",
  },
  "B측": {
    en: "Side B",
    ja: "B側",
    "zh-CN": "B方",
  },
  "B편": {
    en: "B-leaning",
    ja: "B寄り",
    "zh-CN": "偏B方",
  },
  "CCTV 캡처": {
    en: "CCTV Capture",
    ja: "CCTVキャプチャ",
    "zh-CN": "CCTV截图",
  },
  "dc-6 가족 쪽 정황": {
    en: "dc-6 Family Circumstances",
    ja: "dc-6 家族側の事情",
    "zh-CN": "dc-6 家族方面的情况",
  },
  "DEV 치트키": {
    en: "DEV Cheats",
    ja: "DEVチートキー",
    "zh-CN": "DEV 作弊键",
  },
  "DossierCard 전부 사용": {
    en: "Use Every DossierCard",
    ja: "DossierCardをすべて使用",
    "zh-CN": "使用全部DossierCard",
  },
  "hidden combo · 첫 성공 시 포인트 환급 적용": {
    en: "hidden combo · points refunded on first success",
    ja: "hidden combo · 初回成功時にポイント還元",
    "zh-CN": "hidden combo · 首次成功时返还点数",
  },
  "Lv.1부터 장착 효과가 열립니다.": {
    en: "Equip effects unlock from Lv.1.",
    ja: "Lv.1から装着効果が解放されます。",
    "zh-CN": "从Lv.1起解锁装备效果。",
  },
  "Lv1 성향을 달성하면 장착할 수 있습니다.": {
    en: "Can be equipped after reaching a Lv1 trait.",
    ja: "Lv1性向を達成すると装着できます。",
    "zh-CN": "达成Lv1倾向后可装备。",
  },
  "Lv3 성향을 달성하면 장착할 수 있습니다.": {
    en: "Can be equipped after reaching a Lv3 trait.",
    ja: "Lv3性向を達成すると装着できます。",
    "zh-CN": "达成Lv3倾向后可装备。",
  },
  "Major 퍼크": {
    en: "Major Perk",
    ja: "Majorパーク",
    "zh-CN": "主要特权",
  },
  "Minor 퍼크": {
    en: "Minor Perk",
    ja: "Minorパーク",
    "zh-CN": "次要特权",
  },
  "Phase 전환, 붕괴, 증거 등 효과음": {
    en: "Sound effects for phase changes, collapses, evidence, and more",
    ja: "Phase切替、崩壊、証拠などの効果音",
    "zh-CN": "阶段切换、瓦解、证据等音效",
  },
  "SNS 게시글": {
    en: "SNS Post",
    ja: "SNS投稿",
    "zh-CN": "社交媒体帖子",
  },
  "Space/↑/W를 짧게 누르면 낮게, 길게 누르면 더 높이 점프합니다.": {
    en: "Press Space/↑/W briefly for a low jump, or hold longer to jump higher.",
    ja: "Space/↑/Wを短く押すと低く、長く押すとより高くジャンプします。",
    "zh-CN": "短按 Space/↑/W 可低跳，长按可跳得更高。",
  },
  "Space로 다시 시작할 수 있습니다.": {
    en: "Press Space to restart.",
    ja: "Spaceで再開できます。",
    "zh-CN": "可按 Space 重新开始。",
  },
  "T7 \"경조사비 + 영수증\"": {
    en: "T7 \"Family Occasion Expenses + Receipts\"",
    ja: "T7「冠婚葬祭費＋領収書」",
    "zh-CN": "T7“红白事费用 + 收据”",
  },
  "Wi-Fi: 자택 (iptime_choi)": {
    en: "Wi-Fi: Home (iptime_choi)",
    ja: "Wi-Fi：自宅（iptime_choi）",
    "zh-CN": "Wi-Fi：家中（iptime_choi）",
  },
}
