import type { LocaleCode } from '../../i18n/locales'
import type { TestimonySlot } from '../../types/witnessTestimony'
import { normalizeCaseKey } from '../../utils/caseHelpers'

type TestimonyTextOverlay = Partial<Pick<TestimonySlot, 'topic' | 'question' | 'testimony' | 'behaviorHint'>>
type LocaleTestimonyOverlay = Record<string, TestimonyTextOverlay>
type CaseTestimonyOverlay = Partial<Record<Exclude<LocaleCode, 'ko'>, LocaleTestimonyOverlay>>

const SPOUSE_01_OVERLAYS: CaseTestimonyOverlay = {
  en: {
    "w1-d1-core": {
      behaviorHint: "cautious but certain",
      question: "Can you tell us more about the person living in unit 302?",
      testimony: "I pretended not to notice because the resident seemed to be hiding it, but I understand that unit 302 is home to someone living with a child in a middle school uniform. I also heard the child call the visitor \"uncle.\"",
      topic: "Ask about the resident of unit 302",
    },
    "w1-d1-no-single-woman": {
      behaviorHint: "with conviction",
      question: "I understand the visit frequency. But is there a woman living alone on that floor?",
      testimony: "I do not think there are any homes on that floor where a woman lives alone. Most of the women there live as couples; otherwise, it is mostly men living alone.",
      topic: "Ask about the resident makeup of that floor",
    },
    "w1-d1-resident-info": {
      behaviorHint: "recalling the memory",
      question: "What kind of residents live on the floor Mr. Lee Jun-ho visits?",
      testimony: "Many of the people on that floor work nights, so even in the evening the lights are usually off in almost every unit.",
      topic: "Ask about the residents of that floor",
    },
    "w1-d1-visit-freq": {
      behaviorHint: "calmly and truthfully",
      question: "How often did Mr. Lee Jun-ho visit this officetel?",
      testimony: "He came two or three times a week. Usually he entered around 7 p.m. and left around 10 p.m. It was fairly regular.",
      topic: "Ask about visit frequency",
    },
    "w2-d2-cash-pattern": {
      behaviorHint: "precisely, as if checking records",
      question: "What was the cash withdrawal pattern? All at once? In parts?",
      testimony: "He withdrew it in parts over four months: ₩5M, ₩8M, ₩7M, and ₩10M. The amounts were too large to withdraw by ATM, so he made the withdrawals directly at the teller counter. It felt a little unusual that he was not using bank transfers.",
      topic: "Ask about the withdrawal pattern",
    },
    "w2-d2-cash-withdrawal": {
      behaviorHint: "professionally and precisely",
      question: "Was a large amount ever withdrawn from Mr. Lee Jun-ho’s account?",
      testimony: "Yes. Over several months, he withdrew large sums in cash several times. I remember because it was all cash, not bank transfers. It totaled about ₩30M.",
      topic: "Ask about Lee Jun-ho’s cash withdrawals",
    },
    "w2-hd3-core": {
      behaviorHint: "with a clear memory",
      question: "Did Mr. Lee Jun-ho later come to the bank about the savings cancellation?",
      testimony: "Yes. Mr. Lee Jun-ho came a few weeks later and said, \"I never cancelled the savings account.\" He looked very surprised. That was when I thought, \"Ah, the power of attorney was the problem.\"",
      topic: "Ask about the husband’s later reaction",
    },
    "w2-hd3-savings-cancel-known": {
      behaviorHint: "slightly anxious",
      question: "Was there any issue with the power of attorney when the savings account was cancelled?",
      testimony: "Honestly, the signature on the power of attorney looked a little different. I tried to check once more, but she said it was urgent, so I processed it.",
      topic: "Ask about the power of attorney for the savings cancellation",
    },
    "w2-hd3-savings-cancel": {
      behaviorHint: "carefully",
      question: "Was this couple’s joint savings account ever cancelled?",
      testimony: "Yes. A joint-name installment savings account was cancelled early. Ms. Park Ji-yeon brought a power of attorney, so I processed it.",
      topic: "Ask about the joint savings cancellation",
    },
    "w2-hd3-signature-doubt": {
      behaviorHint: "carefully",
      question: "Specifically, what was different about the signature?",
      testimony: "The signature did feel different, but I am not a handwriting expert, so I could not be certain. Since they were a married couple and all the required documents were there, I thought it would be fine.",
      topic: "Ask about the issue with the power-of-attorney signature",
    },
    "w3-aftermath-call": {
      behaviorHint: "holding back tears, pained for her friend",
      question: "What happened with the investment?",
      testimony: "Jiyeon called me at dawn, crying. She said, \"All the money is gone.\" The operator had left the chat room. She said she could never tell her husband... and asked me, \"Please keep it secret.\"",
      topic: "Ask about the investment result",
    },
    "w3-investment-link": {
      behaviorHint: "hesitant and apologetic",
      question: "The investment chat has come up. How did Ms. Park Ji-yeon end up joining it?",
      testimony: "Well... I did send her the link. People said the returns were good. But I really did not know she would put in that much money.",
      topic: "Ask about the investment chat",
    },
    "w3-money-amount": {
      behaviorHint: "with a shocked expression",
      question: "Do you know how much Ms. Park Ji-yeon invested?",
      testimony: "I heard later it was ₩20M. She said she broke the savings account to put it in... I was shocked when I heard that too.",
      topic: "Ask about the investment amount",
    },
    "w3-motive-suspicion": {
      behaviorHint: "worried for her friend",
      question: "What did Ms. Park Ji-yeon say about her husband?",
      testimony: "Jiyeon said, \"If my husband is cheating, I will protect my money first.\" She became very anxious after seeing a large sum leave her husband’s bankbook.",
      topic: "Ask about Park Ji-yeon’s state of mind",
    },
  },
  ja: {
    "w1-d1-core": {
      behaviorHint: "慎重だが確信している",
      question: "302号室に住んでいる方について、もう少し詳しく話していただけますか。",
      testimony: "住人の方が隠しているようだったので知らないふりをしていましたが、302号室は中学校の制服を着た子どもと一緒に暮らしていると把握しています。訪問された方を「叔父さん」と呼ぶのも聞きました。",
      topic: "302号室の居住者について尋ねる",
    },
    "w1-d1-no-single-woman": {
      behaviorHint: "確信を持って",
      question: "訪問頻度は分かりました。ですが、その階に一人で暮らす女性はいますか。",
      testimony: "その階に女性が一人で暮らしている家はないと思います。女性の方はカップルで住んでいる場合がほとんどで、それ以外は男性の一人暮らしがほとんどです。",
      topic: "その階の居住者構成について尋ねる",
    },
    "w1-d1-resident-info": {
      behaviorHint: "記憶をたどりながら",
      question: "イ・ジュノさんが訪問する階には、どのような方々が住んでいますか。",
      testimony: "その階は夜間に働く方が多いので、夕方の時間帯でもほとんどの住戸の明かりが消えていることが多いです。",
      topic: "該当階の居住者について尋ねる",
    },
    "w1-d1-visit-freq": {
      behaviorHint: "事実どおり淡々と",
      question: "イ・ジュノさんはこのオフィステルにどれくらい頻繁に訪問しましたか。",
      testimony: "週に二、三回は来ていました。たいてい午後7時ごろに入り、夜10時ごろに出ていました。かなり規則的でした。",
      topic: "訪問頻度について尋ねる",
    },
    "w2-d2-cash-pattern": {
      behaviorHint: "記録を確認するように正確に",
      question: "現金出金のパターンはどうでしたか。一度にですか、分けてですか。",
      testimony: "4か月にわたって分けて出金されました。500万、800万、700万、1,000万ウォンです。金額が大きくATMでは出金できないため、窓口で直接出金されました。振込を使わないのが少し珍しく感じました。",
      topic: "出金パターンについて尋ねる",
    },
    "w2-d2-cash-withdrawal": {
      behaviorHint: "業務的に正確に",
      question: "イ・ジュノさんの口座から大きな金額が出金されたことはありますか。",
      testimony: "はい。数か月にわたり、何度も大きな金額を現金で出金していました。振込ではなくすべて現金だったので覚えています。合計で3,000万ウォンほどでした。",
      topic: "イ・ジュノの現金出金について尋ねる",
    },
    "w2-hd3-core": {
      behaviorHint: "記憶が鮮明に",
      question: "イ・ジュノさんは後で積立預金の解約件で銀行に来たことがありますか。",
      testimony: "はい。数週間後にご主人がいらっしゃって、「積立預金を解約したことはない」とおっしゃいました。かなり驚いた表情でした。その時、私も「ああ、委任状が問題だったのか」と思いました。",
      topic: "その後の夫の反応について尋ねる",
    },
    "w2-hd3-savings-cancel-known": {
      behaviorHint: "少し不安そうに",
      question: "積立預金の解約時、委任状に問題はありませんでしたか。",
      testimony: "実は委任状の署名が少し違って見えました。もう一度確認しようとしたのですが、急いでいると言われ、そのまま処理しました。",
      topic: "積立預金解約の委任状について尋ねる",
    },
    "w2-hd3-savings-cancel": {
      behaviorHint: "慎重に",
      question: "この夫婦の共同積立預金が解約されたことはありますか。",
      testimony: "はい、共同名義の定期積立預金が中途解約されました。パク・ジヨンさんが委任状を持って来られたので処理しました。",
      topic: "共同積立預金の解約件について尋ねる",
    },
    "w2-hd3-signature-doubt": {
      behaviorHint: "慎重に",
      question: "署名が違ったというのは、具体的にどの部分でしたか。",
      testimony: "署名は感覚的に違って見えはしましたが、私は筆跡鑑定人でもありませんし、確信はできませんでした。ただ、それでもご夫婦ですし、書類もすべてそろっていたので、問題はないだろうと思いました。",
      topic: "委任状の署名の問題について尋ねる",
    },
    "w3-aftermath-call": {
      behaviorHint: "友人を痛ましく思い、涙をこらえながら",
      question: "投資の結果はどうなりましたか。",
      testimony: "ジヨンが明け方に泣きながら電話してきました。「お金が全部なくなった」と。運営者がチャットルームを出てしまったそうです。夫には絶対言えないと……私に「お願いだから秘密にして」と言いました。",
      topic: "投資結果について尋ねる",
    },
    "w3-investment-link": {
      behaviorHint: "申し訳なさそうにためらいながら",
      question: "投資チャットの話が出ましたが、パク・ジヨンさんはどうやって投資チャットに入ることになったのですか。",
      testimony: "それは……私がリンクを送ったのは事実です。収益が良いと噂になっていたので。でも、あんな大金を入れるとは本当に思いませんでした。",
      topic: "投資チャットについて尋ねる",
    },
    "w3-money-amount": {
      behaviorHint: "衝撃を受けた表情で",
      question: "パク・ジヨンさんがいくら投資したか知っていますか。",
      testimony: "後で聞いたら2,000万ウォンだったそうです。積立預金を崩して入れたと……私もそれを聞いて本当に驚きました。",
      topic: "投資額について尋ねる",
    },
    "w3-motive-suspicion": {
      behaviorHint: "友人を心配しながら",
      question: "パク・ジヨンさんは夫についてどんな話をしていましたか。",
      testimony: "ジヨンは「夫が浮気しているなら、まず自分のお金を守る」と言っていました。夫の通帳から大金が出ていくのを見て、とても不安がっていました。",
      topic: "パク・ジヨンの心理状態について尋ねる",
    },
  },
  "zh-CN": {
    "w1-d1-core": {
      behaviorHint: "谨慎但确定",
      question: "能再详细说说住在302号的人吗？",
      testimony: "那位住户似乎想隐瞒，所以我装作不知道，但据我了解，302号是和一个穿初中校服的孩子一起生活的。我也听见那个孩子称呼来访的人为“叔叔”。",
      topic: "询问302号住户",
    },
    "w1-d1-no-single-woman": {
      behaviorHint: "带着确信",
      question: "探访频率我明白了。那么那一层有独居女性吗？",
      testimony: "那一层好像没有女性独居的住户。女性住户大多是情侣同住，其他则多是男性独居。",
      topic: "询问该楼层住户构成",
    },
    "w1-d1-resident-info": {
      behaviorHint: "回忆着",
      question: "李俊浩先生探访的那一层住着什么样的人？",
      testimony: "那一层住户大多是晚上工作的人，所以就算是傍晚，也经常几乎每户都关着灯。",
      topic: "询问该楼层住户",
    },
    "w1-d1-visit-freq": {
      behaviorHint: "如实而平静地",
      question: "李俊浩先生多久来一次这处韩式商住公寓？",
      testimony: "他每周会来两三次。通常晚上7点左右进去，晚上10点左右离开。相当规律。",
      topic: "询问探访频率",
    },
    "w2-d2-cash-pattern": {
      behaviorHint: "像确认记录一样准确地",
      question: "现金取款的模式是怎样的？一次性？还是分开取？",
      testimony: "他在4个月里分几次取款。500万、800万、700万、1000万韩元。金额太大，ATM取不了，所以是在柜台直接取款的。没有用账户转账，这点让我觉得有些特别。",
      topic: "询问取款模式",
    },
    "w2-d2-cash-withdrawal": {
      behaviorHint: "业务性而准确地",
      question: "李俊浩先生的账户里曾经有大额取款吗？",
      testimony: "有。几个月里，他多次以现金取出大额款项。我记得是因为不是转账，全部都是现金。总共约3000万韩元。",
      topic: "询问李俊浩的现金取款",
    },
    "w2-hd3-core": {
      behaviorHint: "记忆清晰地",
      question: "李俊浩先生后来有没有因为储蓄账户解约一事来过银行？",
      testimony: "有。几周后，丈夫先生过来，说“我从来没有解约过储蓄账户”。他表情相当震惊。那时我也觉得，“啊，问题出在委托书上”。",
      topic: "询问之后丈夫的反应",
    },
    "w2-hd3-savings-cancel-known": {
      behaviorHint: "略显不安地",
      question: "储蓄账户解约时，委托书没有问题吗？",
      testimony: "其实委托书上的签名看起来有些不一样。我想再确认一次，但她说很急，所以就处理了。",
      topic: "询问储蓄账户解约委托书",
    },
    "w2-hd3-savings-cancel": {
      behaviorHint: "谨慎地",
      question: "这对夫妻的共同储蓄账户曾被解约吗？",
      testimony: "有，共同名义的定期储蓄账户被提前解约了。朴智妍女士带来委托书，所以我办理了。",
      topic: "询问共同储蓄账户解约一事",
    },
    "w2-hd3-signature-doubt": {
      behaviorHint: "谨慎地",
      question: "签名不同，具体是哪里不同？",
      testimony: "签名看上去感觉有点不一样，但我不是笔迹鉴定师，也不能确定。不过，毕竟他们是夫妻，文件也都齐全，我以为不会有问题。",
      topic: "询问委托书签名的问题",
    },
    "w3-aftermath-call": {
      behaviorHint: "为朋友心疼，强忍泪水",
      question: "投资结果如何？",
      testimony: "智妍凌晨哭着给我打电话。她说“钱全没了”。运营者已经退出了聊天群。她说绝对不能告诉丈夫……还对我说“拜托你帮我保密”。",
      topic: "询问投资结果",
    },
    "w3-investment-link": {
      behaviorHint: "带着歉意犹豫地",
      question: "提到了投资群，朴智妍女士是怎么进入投资群的？",
      testimony: "那个……链接确实是我发给她的。因为大家都说收益不错。但我真的不知道她会投入那么大一笔钱。",
      topic: "询问投资群",
    },
    "w3-money-amount": {
      behaviorHint: "表情震惊地",
      question: "你知道朴智妍女士投资了多少钱吗？",
      testimony: "后来听说是2000万韩元。她说是解了储蓄账户投进去的……我听到后也吓了一跳。",
      topic: "询问投资金额",
    },
    "w3-motive-suspicion": {
      behaviorHint: "担心朋友地",
      question: "朴智妍女士对丈夫说过什么？",
      testimony: "智妍说过：“如果我丈夫出轨，我要先守住我的钱。”她看到丈夫存折里大笔钱流出后，非常不安。",
      topic: "询问朴智妍的心理状态",
    },
  },
}

const FAMILY_01_OVERLAYS: CaseTestimonyOverlay = {
  en: {
    "w1-d1-paper-reading": {
      behaviorHint: "cautiously",
      question: "Have you ever seen a scene where a document was read to her?",
      testimony: "Yes, I saw papers being read to her a few times. Looking only at that scene, it did make me a bit uneasy too.",
      topic: "Ask about the scene where a document was read to her",
    },
    "w1-d1-visit-comfort": {
      behaviorHint: "calmly",
      question: "How did the mother react when the second son visited?",
      testimony: "When he came, her expression did soften a little. So at first I thought he must be someone she was glad to see.",
      topic: "Ask about the mother's reaction when the second son visited",
    },
    "w1-d2-before-brother-arrives": {
      behaviorHint: "choosing carefully",
      question: "On the day he read the paper to her, did Mr. Yoon Jeong-hu say anything separately?",
      testimony: "Yes. Mr. Yoon Jeong-hu said, “Let's finish before my older brother arrives.” But that felt more like caution, as if he was worried voices would rise again.",
      topic: "Ask the context of the remark about finishing",
    },
    "w1-d2-clarity-fluctuation": {
      behaviorHint: "as if organizing only the facts",
      question: "Being glad to see someone and being capable of judgment are different matters. What was her condition?",
      testimony: "That is right. Some days she answered my questions clearly, and some days she seemed dazed even when I held her hand. I cannot say she was always clear.",
      topic: "Ask whether her condition was consistent",
    },
    "w1-d3-avoid-conflict": {
      behaviorHint: "cautious but clear",
      question: "Answer from your standpoint as a witness. Was that process a scene of driving the mother into something, or a scene of avoiding conflict?",
      testimony: "From what I saw beside them, it was closer to avoiding conflict. When the older brother came, voices really did get louder, and each time their mother hunched her shoulders. So I felt the second son was trying to protect Mother from being frightened.",
      topic: "Ask about the actual atmosphere of the process",
    },
    "w2-d1-document-balance": {
      behaviorHint: "calmly",
      question: "Were the contents of the first document and the second document different?",
      testimony: "The first document and the second document had different contents. The inheritance ratios for the sons had been changed.",
      topic: "Ask about the difference between the first and second documents",
    },
    "w2-d1-two-visits": {
      behaviorHint: "professionally and precisely",
      question: "Did you visit the same home twice on the same day?",
      testimony: "Yes. After finishing the drafting, they asked for me again, so I visited the same home again that evening. It is not common.",
      topic: "Ask about visiting the same home twice on the same day",
    },
    "w2-d2-ratio-change": {
      behaviorHint: "clearly",
      question: "Why did you not suspect the change at the time?",
      testimony: "The reason I did not suspect it much was that the first document felt a little strange compared with the second one. I only thought they had changed it to a more ordinary level.",
      topic: "Ask why the ratio change did not seem suspicious",
    },
    "w2-d2-same-submitter": {
      behaviorHint: "as if the memory is clear",
      question: "How was the mother's condition during the second visit?",
      testimony: "To be honest, during the second visit the mother did not look well. Just that morning I had seen her, but she did not remember me.",
      topic: "Ask about the mother's condition during the second visit",
    },
    "w2-d3-benefit-direction": {
      behaviorHint: "cautious but distinct",
      question: "When you watched the process, did it look as if Mr. Yoon Jeong-hu was leading the answers?",
      testimony: "To be honest, it felt as if Mr. Yoon Jeong-hu was guiding the mother, whose memory was faint, toward certain answers. But I did not suspect it much because he would not lower his own share on purpose, would he? So I thought it must have been something they had agreed on beforehand.",
      topic: "Ask whether the answers seemed guided",
    },
    "w3-d1-living-support": {
      behaviorHint: "recalling calmly",
      question: "Did the mother say anything about money coming in regularly?",
      testimony: "She worried about money for a long time. Still, she said she was getting by because the younger son sent her a small allowance every month.",
      topic: "Ask about the regular support money",
    },
    "w3-d1-secret-burden": {
      behaviorHint: "speaking low",
      question: "Did the mother say there was something that had to remain unknown?",
      testimony: "Yes. She said several times that some things had to remain unknown until the end. Even when I asked what on earth she meant, she would not tell me.",
      topic: "Ask about the burden of the secret",
    },
    "w3-d2-money-nature": {
      behaviorHint: "pointing only to what she clearly remembers",
      question: "What did you hear about how the older son's factory problem was resolved?",
      testimony: "She said it was a serious matter because her older son's factory was in trouble, but not long after that she said it had thankfully been resolved. When I asked how, she only said it was thanks to the son she had raised well.",
      topic: "Ask about the nature of the money",
    },
    "w3-d2-secret-reason": {
      behaviorHint: "cautiously",
      question: "Did you hear why the older son had to be kept from knowing?",
      testimony: "She never said it exactly, but she said, “The older one has too much pride. If he learns the truth, it will break him.” She also said, “The second son is carrying every burden alone.”",
      topic: "Ask why it had to be hidden",
    },
    "w3-d3-why-kept-secret": {
      behaviorHint: "heavily, but without wavering",
      question: "Considering everything you heard, why do you think Mr. Yoon Jeong-hu hid that secret?",
      testimony: "It was only worry for her two sons. She worried that her older son kept clinging to business perhaps because he had noticed that he himself was not his father's biological son, and was clinging to success because of that. And since she had sent even the money she received from the younger son to the older son, she once said that at least the inheritance should be returned to the younger son.",
      topic: "Ask why Mr. Yoon Jeong-hu hid the secret",
    },
  },
  ja: {
    "w1-d1-paper-reading": {
      behaviorHint: "慎重に",
      question: "書類を読み聞かせる場面を見たことはありますか。",
      testimony: "はい、紙を読み聞かせるところは何度か見ました。その場面だけで見ると、私も少し気になりました。",
      topic: "書類を読み聞かせる場面を尋ねる",
    },
    "w1-d1-visit-comfort": {
      behaviorHint: "淡々と",
      question: "次男が訪ねてくると、母の反応はどうでしたか。",
      testimony: "その方が来ると、表情が少し和らぎました。だから私は最初、会えてうれしい人なのだろうと思いました。",
      topic: "次男の訪問時の反応を尋ねる",
    },
    "w1-d2-before-brother-arrives": {
      behaviorHint: "慎重に選びながら",
      question: "紙を読み聞かせていた日、ユン・ジョンフさんが別に何か言ったことはありましたか。",
      testimony: "ありました。ユン・ジョンフさんが「兄さんが来る前に終わらせよう」と言いました。ただ、その言葉は欲というより、その日また大きな声が出るのを避けようとする感じに近かったです。",
      topic: "終わらせようという言葉の文脈を尋ねる",
    },
    "w1-d2-clarity-fluctuation": {
      behaviorHint: "事実だけを整理するように",
      question: "喜んでいたことと、判断が可能だったことは別問題です。状態はどうでしたか。",
      testimony: "その通りです。ある日は私の質問にもはっきり答え、ある日は手を握ってもぼんやりしていました。いつもはっきりしていたとは言えません。",
      topic: "状態が一定だったのかを尋ねる",
    },
    "w1-d3-avoid-conflict": {
      behaviorHint: "慎重だがはっきりと",
      question: "証人の立場から答えてください。その過程は、母を追い込む場面でしたか。それとも争いを避けようとする場面でしたか。",
      testimony: "私がそばで見た限りでは、争いを避ける方でした。お兄様が来ると実際に声が大きくなり、そのたびにお母様は肩をすくめていました。だから私は、次男が母を利用したというより、怖がらせないよう終わらせようとしたのだと見ました。",
      topic: "その過程の実際の雰囲気を尋ねる",
    },
    "w2-d1-document-balance": {
      behaviorHint: "落ち着いて",
      question: "最初に持ち込まれた書類と、再び持ち込まれた書類の印象は違いましたか。",
      testimony: "違いました。最初のものはかなり一方に偏っている印象で、出し直されたものはそれより少し均衡が取れて見えました。",
      topic: "二つの書類の印象を尋ねる",
    },
    "w2-d1-two-visits": {
      behaviorHint: "業務的に正確に",
      question: "その日、同じ人が二度訪ねてきたことはありましたか。",
      testimony: "はい。同じ方が同じ日に二度来られたので覚えています。よくあることではありません。",
      topic: "同じ日に二度来た事実を尋ねる",
    },
    "w2-d2-ratio-change": {
      behaviorHint: "はっきりと",
      question: "その違いを数字で説明してください。どう変わりましたか。",
      testimony: "最初の書類はユン・ジョンフ90、ユン・テソン10で、二つ目はユン・ジョンフ60、ユン・テソン40に変わっていました。数字だけを見ると、自分の取り分を減らして出し直したことになります。",
      topic: "比率がどう変わったのかを尋ねる",
    },
    "w2-d2-same-submitter": {
      behaviorHint: "記憶が鮮明であるかのように",
      question: "二度とも誰が受付窓口に立ちましたか。",
      testimony: "二度ともユン・ジョンフさんが受付窓口に立ちました。書類をいったん持ち帰り、また持ってこられたのもその方です。",
      topic: "誰が再提出したのかを尋ねる",
    },
    "w2-d3-benefit-direction": {
      behaviorHint: "慎重だが明瞭に",
      question: "その変更を見て、証人は誰の利益の方向に動いた修正だと判断しましたか。",
      testimony: "少なくとも、自分の取り分を増やす修正ではありませんでした。受付窓口で見た結果だけで言えば、ユン・ジョンフさんが自分の比率を90から60に下げた書類を出し直したのです。だから私は、その日の修正は欲というより、兄が受ける衝撃を少し減らそうとする調整のように見えました。",
      topic: "修正が誰の利益の方向だったのかを尋ねる",
    },
    "w3-d1-living-support": {
      behaviorHint: "落ち着いて思い出しながら",
      question: "母は定期的に入ってくるお金について何か話していましたか。",
      testimony: "お金の心配は長くしていました。それでも、次男が毎月送ってくれるお金があるから持ちこたえている、と言ったことはあります。",
      topic: "定期支援金の事情を尋ねる",
    },
    "w3-d1-secret-burden": {
      behaviorHint: "低く話しながら",
      question: "母は、長男が知らないでいなければならないことがあると言っていましたか。",
      testimony: "ありました。あることは、その息子が最後まで知らないでいなければならないと何度かおっしゃいました。そう話すたびに、表情はとても重かったです。",
      topic: "長男が知らないでいなければならないという言葉を尋ねる",
    },
    "w3-d2-money-nature": {
      behaviorHint: "はっきり覚えている部分だけを指摘しながら",
      question: "そのお金はどういう性質のものだと聞きましたか。誰が誰を助けるお金でしたか。",
      testimony: "ユン・ジョンフさんがお母様の口座に毎月送っていたお金だと聞きました。そして3億ウォンが出ていく時には、「テソンの工場の方へ送るお金」だとお母様が直接おっしゃいました。",
      topic: "そのお金の性質を尋ねる",
    },
    "w3-d2-secret-reason": {
      behaviorHint: "慎重に",
      question: "長男が知らないでいなければならない理由を聞いたことはありますか。",
      testimony: "お母様は正確な言葉を避けましたが、「テソンはその事実を知れば崩れてしまう」と言っていました。そして「ジョンフがその荷を一人で背負っている」とも話しました。",
      topic: "なぜ隠さなければならなかったのかを尋ねる",
    },
    "w3-d3-why-kept-secret": {
      behaviorHint: "重く、しかし揺らがずに",
      question: "証人が聞いたことを総合すると、ユン・ジョンフさんはなぜその秘密を隠したのだと思いますか。",
      testimony: "遺産を多く受け取るために隠した人の口ぶりではありませんでした。お母様が先に「テソンには最後まで知らせてはいけない」と引き留め、ユン・ジョンフさんはその言葉どおり、兄が崩れないように防ぐ側でした。だから私は、この家の中心はお金争いより、出生の秘密と罪悪感に近いものだと見ています。",
      topic: "ユン・ジョンフさんがなぜ秘密を隠したのかを尋ねる",
    },
  },
  "zh-CN": {
    "w1-d1-paper-reading": {
      behaviorHint: "谨慎地",
      question: "您见过把文件读给她听的场景吗？",
      testimony: "是的，我见过几次把纸读给她听。只看那个场景，我也有点在意。",
      topic: "询问把文件读给她听的场景",
    },
    "w1-d1-visit-comfort": {
      behaviorHint: "平静地",
      question: "二儿子来探望时，母亲反应如何？",
      testimony: "那位一来，她的表情确实会稍微放松。所以我一开始以为他是她想见的人。",
      topic: "询问二儿子来访时的反应",
    },
    "w1-d2-before-brother-arrives": {
      behaviorHint: "谨慎斟酌地",
      question: "读纸给她听的那天，尹正厚先生另外说过什么吗？",
      testimony: "有。尹正厚先生说过：“在哥哥来之前结束吧。”不过那句话与其说是贪心，不如说更像是担心那天又会有大声争吵而小心。",
      topic: "询问“结束吧”这句话的语境",
    },
    "w1-d2-clarity-fluctuation": {
      behaviorHint: "像是在整理事实",
      question: "高兴见到对方和能够判断是两回事。她的状态如何？",
      testimony: "没错。有些日子她能清楚回答我的问题，有些日子即使握住她的手也发愣。不能说她一直清醒。",
      topic: "询问状态是否稳定",
    },
    "w1-d3-avoid-conflict": {
      behaviorHint: "谨慎但明确地",
      question: "请从证人的角度回答。那个过程是在逼迫母亲，还是在避免争吵？",
      testimony: "就我在旁边看到的情况，更接近于避免争吵。哥哥一来，声音确实会变大，每次母亲都会缩起肩膀。所以我觉得二儿子与其说利用母亲，不如说是想在她害怕之前结束。",
      topic: "询问那个过程的实际气氛",
    },
    "w2-d1-document-balance": {
      behaviorHint: "冷静地",
      question: "最初带来的文件和后来再次带来的文件，印象有不同吗？",
      testimony: "有不同。第一份感觉很偏向一边，重新提交的那份看起来比它稍微平衡一些。",
      topic: "询问两份文件的印象",
    },
    "w2-d1-two-visits": {
      behaviorHint: "业务性而准确地",
      question: "那天同一个人来过两次吗？",
      testimony: "是的。同一个人在同一天来了两次，所以我记得。这并不常见。",
      topic: "询问同一天来过两次的事实",
    },
    "w2-d2-ratio-change": {
      behaviorHint: "明确地",
      question: "请用数字说明那个差异。是如何改变的？",
      testimony: "第一份文件是尹正厚90、尹泰成10，第二份变成尹正厚60、尹泰成40。只看数字，就是减少了自己的份额后重新提交。",
      topic: "询问比例如何变化",
    },
    "w2-d2-same-submitter": {
      behaviorHint: "像是记忆很清晰",
      question: "两次都是谁站在受理窗口？",
      testimony: "两次都是尹正厚先生站在受理窗口。把文件拿回去后又带回来的人也是他。",
      topic: "询问是谁重新提交的",
    },
    "w2-d3-benefit-direction": {
      behaviorHint: "谨慎但清楚地",
      question: "看到那个变更时，证人认为那是朝谁的利益方向进行的修改？",
      testimony: "至少那不是为了增加自己份额的修改。只从受理窗口看到的结果来说，尹正厚先生重新提交了把自己比例从90降到60的文件。所以在我看来，那天的修改与其说是贪心，不如说像是想稍微减轻哥哥受到的冲击的一种调整。",
      topic: "询问修改朝谁的利益方向变化",
    },
    "w3-d1-living-support": {
      behaviorHint: "平静回想地",
      question: "母亲有没有说过定期进来的钱？",
      testimony: "她长期担心钱。不过她说过，因为小儿子每个月寄来的钱，才能撑下去。",
      topic: "询问定期支援金的情况",
    },
    "w3-d1-secret-burden": {
      behaviorHint: "低声地",
      question: "母亲有没有说过，有件事大儿子不能知道？",
      testimony: "有。她说过好几次，有件事那个儿子必须到最后都不知道。每次说起时，她的表情都很沉重。",
      topic: "询问“大儿子不能知道”的话",
    },
    "w3-d2-money-nature": {
      behaviorHint: "只指出清楚记得的部分",
      question: "您听说那笔钱是什么性质？是谁在帮助谁的钱？",
      testimony: "我听说那是尹正厚先生每个月汇到母亲账户的钱。还有3亿韩元转出去时，母亲亲口说那是“送到泰成工厂那边的钱”。",
      topic: "询问那笔钱的性质",
    },
    "w3-d2-secret-reason": {
      behaviorHint: "谨慎地",
      question: "您听过为什么不能让大儿子知道吗？",
      testimony: "母亲没有说得很明确，但她说过：“泰成如果知道那个事实，人会垮掉。”还说过：“正厚一个人背着那个负担。”",
      topic: "询问为什么必须隐瞒",
    },
    "w3-d3-why-kept-secret": {
      behaviorHint: "沉重但不动摇地",
      question: "综合证人听到的话，您认为尹正厚先生为什么隐藏那个秘密？",
      testimony: "那不是为了多拿遗产而隐瞒的人的语气。母亲先抓着他说“泰成必须到最后都不知道”，尹正厚先生则是照那句话，站在防止哥哥崩溃的一边。所以我认为这个家的中心，比起争钱，更接近于出生秘密和罪恶感。",
      topic: "询问尹正厚先生为什么隐藏秘密",
    },
  },
}

const FRIEND_01_OVERLAYS: CaseTestimonyOverlay = {
  en: {
    "w1-d1-chat-mood": {
      behaviorHint: "awkward but honest",
      question: "How did the group chat atmosphere change right after that screenshot was posted?",
      testimony: "At first everyone was shocked. Since only the number of contacts was visible, honestly, I also thought that person had crossed the line.",
      topic: "Ask about the group chat atmosphere",
    },
    "w1-d1-frame-wording": {
      behaviorHint: "searching memory",
      question: "How did Ms. Song Da-eun describe the screenshot when she posted it?",
      testimony: "She did not simply post the record. The talk spread as if something similar had happened before. That made the atmosphere lean even more to one side.",
      topic: "Ask about the first framing words",
    },
    "w1-d2-blame-spread": {
      behaviorHint: "frustrated",
      question: "After that label attached to her, how quickly did the blame spread?",
      testimony: "It barely took a few minutes. Once Ms. Song Da-eun posted, \"Su-min is contacting my man again,\" comments like \"Why is she doing that before a wedding?\" poured out immediately.",
      topic: "Ask how fast the blame spread",
    },
    "w1-d2-no-one-checked": {
      behaviorHint: "apologetic",
      question: "After that, did anyone ask Ms. Choi Su-min directly what had happened?",
      testimony: "No. Everyone chose sides right after seeing the screenshot. I was also pressed by the atmosphere and did not contact her separately.",
      topic: "Ask whether anyone checked directly",
    },
    "w1-d3-first-conclusion": {
      behaviorHint: "firm, with apology",
      question: "Answer from your own perspective. Who made the conclusion first that day?",
      testimony: "The order was clear. Ms. Song Da-eun first framed it as \"she did it again,\" and that became the standard in the group chat. No one listened to Ms. Choi Su-min’s side.",
      topic: "Ask who created the conclusion first",
    },
    "w2-d1-after-work-talk": {
      behaviorHint: "cautiously",
      question: "After the company dinner, did your senior ever bring up Ms. Choi Su-min?",
      testimony: "Yes, he mentioned her. At first I thought he was just casually saying he found her attractive.",
      topic: "Ask about remarks after the company dinner",
    },
    "w2-d1-contact-reaction": {
      behaviorHint: "watching the room",
      question: "After the contact issue came up, how did your senior react?",
      testimony: "Outwardly, he acted annoyed. But he seemed less like someone angry from unfairness and more like someone uncomfortable because he had been caught.",
      topic: "Ask about his reaction after the contact issue",
    },
    "w2-d2-flirt-remark": {
      behaviorHint: "disapproving",
      question: "You said he showed interest. What exactly did he say?",
      testimony: "He said things like, \"That Pilates woman is nice,\" and \"Would it be weird if I asked her to get coffee without Da-eun knowing?\" It was not something an engaged man should say.",
      topic: "Ask exactly what he said",
    },
    "w2-d2-why-looked-caught": {
      behaviorHint: "with a small sigh",
      question: "Explain why he looked that way, based on what you heard.",
      testimony: "He once said to me, almost offhand, \"I made it worse by touching it first.\" That is why I do not think Ms. Choi Su-min’s contact suddenly began out of nowhere.",
      topic: "Ask why he looked caught",
    },
    "w2-d3-rejection-ignored": {
      behaviorHint: "recalling an unpleasant memory",
      question: "Answer based on what you saw, not your judgment. Was there a circumstance showing your senior crossed the line first?",
      testimony: "Yes. He once showed me his phone and laughed, saying, \"She says I should not do this because I am her friend’s boyfriend.\" Even after receiving a rejection, he said, \"She will come around at least once.\" What I saw was not Ms. Choi Su-min’s obsession, but his light, pushy approach.",
      topic: "Ask whether he crossed the line after being rejected",
    },
    "w3-d1-crying-scene": {
      behaviorHint: "recalling cautiously",
      question: "At the cafe a few years ago, what was Ms. Choi Su-min’s condition that day?",
      testimony: "A young customer stayed alone after the conversation and cried for a long time. It did not look like a face crying just from hurt feelings.",
      topic: "Ask about the customer’s condition that day",
    },
    "w3-d1-money-pressure": {
      behaviorHint: "uneasy",
      question: "Did the conversation at that table sound closer to a request or to pressure?",
      testimony: "At first it sounded like a request, but the more I listened, the more it felt like he was cornering her so she could not refuse. I could tell it was about money.",
      topic: "Ask about the tone of the conversation",
    },
    "w3-d2-father-identity": {
      behaviorHint: "awkward",
      question: "Did you later find out who that middle-aged man was?",
      testimony: "I later heard in the neighborhood that he was Ms. Song Da-eun's father. A few days later, when I asked Da-eun whether she was all right after that day, she only said, \"I ended things with Su-min.\"",
      topic: "Ask who the man was",
    },
    "w3-d2-overheard-phrase": {
      behaviorHint: "speaking quietly",
      question: "Did you hear what was said before she started crying?",
      testimony: "Yes. The man said, \"If you cover this just this once, I will pay you back soon.\" The young woman said, \"Why are you doing this to me again?\" It did not sound like it had happened only once or twice.",
      topic: "Ask what was said before she cried",
    },
    "w3-d3-breakup-cause": {
      behaviorHint: "careful but firm",
      question: "Based on what you saw that day, what did the cause of the earlier break look closer to?",
      testimony: "What I saw was not a friend changing her mind, but a money problem. Ms. Song Da-eun's father pressed Ms. Choi Su-min, and Ms. Choi Su-min fell apart alone without being able to tell Da-eun. If the relationship broke after that, the first crack came more from the adult than from the friend.",
      topic: "Ask about the cause of the earlier break",
    },
  },
  ja: {
    "w1-d1-chat-mood": {
      behaviorHint: "気まずそうに正直に",
      question: "そのスクリーンショットが上がった直後、グループチャットの雰囲気はどう流れましたか。",
      testimony: "最初はみんな驚きました。連絡回数だけが見えていたので、正直、私もその人が一線を越えたのだと思いました。",
      topic: "グループチャットの雰囲気を尋ねる",
    },
    "w1-d1-frame-wording": {
      behaviorHint: "記憶を探りながら",
      question: "ソン・ダウンさんはそのスクリーンショットを上げる時、どのように説明しましたか。",
      testimony: "ただ記録だけを上げたのではなく、以前にも似たことがあったという感じで話が広がりました。それで雰囲気がさらに一方に傾きました。",
      topic: "最初についた言葉の方向を尋ねる",
    },
    "w1-d2-blame-spread": {
      behaviorHint: "もどかしそうに",
      question: "その言葉がついた後、非難はどれくらい早く広がりましたか。",
      testimony: "ほとんど数分もかかりませんでした。ソン・ダウンさんが「スミンがまた私の男に連絡している」と上げると、すぐに「結婚を控えてなぜそんなことをするのか」という言葉があふれました。",
      topic: "非難が広がった速さを尋ねる",
    },
    "w1-d2-no-one-checked": {
      behaviorHint: "申し訳なさそうに",
      question: "その後、チェ・スミンさんに直接事情を聞いた人はいましたか。",
      testimony: "いませんでした。みんなスクリーンショットを見てすぐに立場を決めました。私もその時は雰囲気に押されて、別に連絡できませんでした。",
      topic: "直接確認した人がいたか尋ねる",
    },
    "w1-d3-first-conclusion": {
      behaviorHint: "申し訳なさを込めて断固と",
      question: "証人の基準で答えてください。その日、誰が先に結論を作ってしまいましたか。",
      testimony: "順序ははっきりしていました。ソン・ダウンさんが先に「またやった」という形で断定し、その言葉がグループチャットの基準になってしまいました。チェ・スミンさん側の話は誰も聞きませんでした。",
      topic: "誰が先に結論を作ったか尋ねる",
    },
    "w2-d1-after-work-talk": {
      behaviorHint: "慎重に",
      question: "会食の後、先輩がチェ・スミンさんの話を出したことはありますか。",
      testimony: "はい、その方の話をしたことがあります。最初は、ただ好感を軽く口にしているのだと思いました。",
      topic: "会食後の言及を尋ねる",
    },
    "w2-d1-contact-reaction": {
      behaviorHint: "様子をうかがいながら",
      question: "連絡問題が表に出た後、先輩の反応はどうでしたか。",
      testimony: "表向きは面倒くさそうにしていました。でも、不当で怒っている人というより、見つかって居心地が悪い人に近く見えました。",
      topic: "問題後の反応を尋ねる",
    },
    "w2-d2-flirt-remark": {
      behaviorHint: "不快そうに",
      question: "好感と言いましたが、具体的にどんなことを言いましたか。",
      testimony: "先輩は「あのピラティスをしている人、いいよな」「ダウンに内緒でコーヒーでも誘ったら変かな」などと言いました。婚約している人が言うことではありませんでした。",
      topic: "具体的に何を言ったか尋ねる",
    },
    "w2-d2-why-looked-caught": {
      behaviorHint: "小さくため息をつきながら",
      question: "なぜそう見えたのか、聞いた言葉を基準に説明してください。",
      testimony: "先輩が私に「余計にこっちから触って事が大きくなった」とぽろっと言ったことがあります。だから私は、チェ・スミンさんの連絡が突然始まったわけではないと思いました。",
      topic: "なぜ見つかった人のように見えたか尋ねる",
    },
    "w2-d3-rejection-ignored": {
      behaviorHint: "不快だった記憶を取り出しながら",
      question: "証人の判断ではなく、見た場面で答えてください。先輩が先に一線を越えたと見られる事情はありましたか。",
      testimony: "ありました。先輩が携帯を見せながら、「友達の彼氏だからやめろってさ」と笑い流したことがあります。拒絶の返信を受けても、「一度くらいはこっちに来るだろう」と言っていました。私が見たのはチェ・スミンさんの執着ではなく、先輩側の軽い押しでした。",
      topic: "拒絶後も一線を越えたか尋ねる",
    },
    "w3-d1-crying-scene": {
      behaviorHint: "慎重に回想しながら",
      question: "数年前、カフェでその日、チェ・スミンさんの状態はどうでしたか。",
      testimony: "若いお客様が一人、会話が終わった後に残って長く泣いていました。ただ寂しくて泣く顔ではありませんでした。",
      topic: "その日の客の状態を尋ねる",
    },
    "w3-d1-money-pressure": {
      behaviorHint: "釈然としない様子で",
      question: "その場の会話はお願いに近かったですか、それとも圧迫に近かったですか。",
      testimony: "最初はお願いのように聞こえましたが、聞けば聞くほど断れないように追い込む側に近かったです。お金の話だということは分かりました。",
      topic: "会話の雰囲気を尋ねる",
    },
    "w3-d2-father-identity": {
      behaviorHint: "困ったように",
      question: "その中年男性が誰だったか、後で分かりましたか。",
      testimony: "後で近所で聞いて分かりました。ソン・ダウンさんのお父様でした。数日後、私がダウンさんにその日は大丈夫だったか尋ねると、「スミンとは終わらせた」とだけ短く言いました。",
      topic: "その男性が誰だったか尋ねる",
    },
    "w3-d2-overheard-phrase": {
      behaviorHint: "低い声で",
      question: "泣く前にどんな言葉が交わされたか、聞いたことはありますか。",
      testimony: "はい。その男性が「今回だけ防いでくれればすぐ返す」と言いました。その若い方は「なぜまた私にそんなことをするんですか」と言っていました。一度や二度のことではなさそうでした。",
      topic: "泣く前に聞いた言葉を尋ねる",
    },
    "w3-d3-breakup-cause": {
      behaviorHint: "慎重だが断固として",
      question: "その日の場面を基準に見ると、過去の絶縁原因は何に近く見えましたか。",
      testimony: "私が見たのは友人の心変わりではなく、お金の問題でした。ソン・ダウンさんのお父様がチェ・スミンさんを責め、チェ・スミンさんはダウンさんに言えないまま一人で崩れていました。その後に関係が切れたのなら、先にひびを入れたのは友人ではなく大人の側に近かったです。",
      topic: "過去の絶縁原因を尋ねる",
    },
  },
  "zh-CN": {
    "w1-d1-chat-mood": {
      behaviorHint: "尴尬但诚实",
      question: "那张截图发出来后，群聊气氛是怎么变化的？",
      testimony: "一开始大家都很震惊。因为只看得到联系次数，说实话，我当时也以为那个人越界了。",
      topic: "询问群聊气氛",
    },
    "w1-d1-frame-wording": {
      behaviorHint: "一边回忆一边说",
      question: "宋多恩女士发那张截图时，是怎么说明的？",
      testimony: "她不是单纯上传记录，而是把话说成以前也发生过类似的事。所以气氛更偏向一边了。",
      topic: "询问最初定性的说法",
    },
    "w1-d2-blame-spread": {
      behaviorHint: "感到憋闷",
      question: "贴上那个说法后，指责扩散得有多快？",
      testimony: "几乎没过几分钟。宋多恩女士发出“秀敏又联系我男人”之后，马上就有人说“都快结婚了，她为什么这样”。",
      topic: "询问指责扩散速度",
    },
    "w1-d2-no-one-checked": {
      behaviorHint: "带着歉意",
      question: "之后有人直接问过崔秀敏女士事情经过吗？",
      testimony: "没有。大家看了截图就立刻站队了。我当时也被气氛压住，没有另外联系她。",
      topic: "询问是否有人直接确认",
    },
    "w1-d3-first-conclusion": {
      behaviorHint: "带着歉意但坚定",
      question: "请按证人的判断回答。那天是谁先制造了结论？",
      testimony: "顺序很清楚。宋多恩女士先用“她又那样了”的方式下了定论，那句话就成了群聊里的标准。没有人听崔秀敏女士那边的说法。",
      topic: "询问谁先制造结论",
    },
    "w2-d1-after-work-talk": {
      behaviorHint: "谨慎地",
      question: "公司聚餐之后，你的前辈提起过崔秀敏女士吗？",
      testimony: "有，他提过她。一开始我以为他只是轻描淡写地说有好感。",
      topic: "询问聚餐后的提及",
    },
    "w2-d1-contact-reaction": {
      behaviorHint: "看着周围气氛",
      question: "联系问题曝光后，你的前辈反应如何？",
      testimony: "表面上他装作很烦。但他看起来不像是因为委屈而生气，更像是被发现后不自在。",
      topic: "询问联系问题后的反应",
    },
    "w2-d2-flirt-remark": {
      behaviorHint: "不赞同地",
      question: "你说他有好感，具体他说了什么？",
      testimony: "他说过“那个练普拉提的女生不错啊”“不让多恩知道，约她喝一次咖啡会不会很奇怪”之类的话。那不是订婚的人该说的话。",
      topic: "询问具体说过什么",
    },
    "w2-d2-why-looked-caught": {
      behaviorHint: "轻轻叹气",
      question: "请根据你听到的话说明，为什么你会这样看。",
      testimony: "他曾经随口对我说过：“是我先去碰，才把事情弄大了。”所以我认为，崔秀敏女士的联系并不是突然从无到有开始的。",
      topic: "询问为什么像被抓到的人",
    },
    "w2-d3-rejection-ignored": {
      behaviorHint: "说起令人不快的记忆",
      question: "不要说判断，请按你看到的场面回答。有没有情况显示你的前辈先越界？",
      testimony: "有。他曾经给我看手机，笑着说：“她说我是朋友的男朋友，所以不能这样。”收到拒绝回复后，他还说“总有一次会过来的吧”。我看到的不是崔秀敏女士的执着，而是前辈那边轻率的靠近。",
      topic: "询问被拒后是否仍越界",
    },
    "w3-d1-crying-scene": {
      behaviorHint: "谨慎回想",
      question: "几年前在咖啡店那天，崔秀敏女士是什么状态？",
      testimony: "有位年轻客人谈话结束后一个人留下来哭了很久。那不是单纯因为难过而哭的表情。",
      topic: "询问当天客人的状态",
    },
    "w3-d1-money-pressure": {
      behaviorHint: "感到不舒服",
      question: "那次对话的气氛更像请求，还是更像施压？",
      testimony: "一开始听起来像请求，但越听越像把人逼到不能拒绝。我能听出来是在说钱。",
      topic: "询问对话气氛",
    },
    "w3-d2-father-identity": {
      behaviorHint: "为难地",
      question: "你后来知道那个中年男人是谁了吗？",
      testimony: "后来我在附近听说了。他是宋多恩女士的父亲。几天后我问多恩那天还好吗，她只短短地说了一句：“我和秀敏结束了。”",
      topic: "询问那个男人是谁",
    },
    "w3-d2-overheard-phrase": {
      behaviorHint: "低声说",
      question: "她哭之前，你听到他们说了什么吗？",
      testimony: "听到了。那个男人说：“这次你只要帮我挡一下，我很快还你。”那个年轻人说：“你为什么又这样对我？”听起来不像只有一两次。",
      topic: "询问她哭前听到的话",
    },
    "w3-d3-breakup-cause": {
      behaviorHint: "谨慎但坚定",
      question: "以那天的场面来看，过去断交的原因更接近什么？",
      testimony: "我看到的不是朋友变心，而是钱的问题。宋多恩女士的父亲逼迫崔秀敏女士，崔秀敏女士无法告诉多恩，一个人崩溃了。如果之后关系断了，那么先制造裂痕的更像是大人那边，而不是朋友。",
      topic: "询问过去断交的原因",
    },
  },
}

const TESTIMONY_OVERLAYS: Record<string, CaseTestimonyOverlay> = {
  "spouse-01": SPOUSE_01_OVERLAYS,
  "family-01": FAMILY_01_OVERLAYS,
  "friend-01": FRIEND_01_OVERLAYS,
}

export function localizeWitnessTestimonySlots(
  caseId: string | undefined,
  slots: TestimonySlot[],
  locale: LocaleCode,
): TestimonySlot[] {
  if (locale === 'ko') return slots

  const caseKey = normalizeCaseKey(caseId ?? '')
  const overlay = TESTIMONY_OVERLAYS[caseKey]?.[locale]
  if (!overlay) return slots

  return slots.map((slot) => {
    const translated = overlay[slot.id]
    return translated ? { ...slot, ...translated } : slot
  })
}
