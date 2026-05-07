import type { LocaleCode } from '../../i18n/locales'
import type { TestimonySlot } from '../../types/witnessTestimony'
import { normalizeCaseKey } from '../../utils/caseHelpers'

type TestimonyTextOverlay = Partial<Pick<TestimonySlot, 'topic' | 'question' | 'testimony' | 'behaviorHint'>>
type LocaleTestimonyOverlay = Record<string, TestimonyTextOverlay>
type CaseTestimonyOverlay = Partial<Record<Exclude<LocaleCode, 'ko'>, LocaleTestimonyOverlay>>

const SPOUSE_01_OVERLAYS: CaseTestimonyOverlay = {
  en: {
    'w1-d1-visit-freq': {
      topic: 'Ask about visit frequency',
      question: 'How often did Mr. Lee Jun-ho visit this officetel?',
      testimony: 'He came two or three times a week. Usually he entered around 7 p.m. and left around 10 p.m. It was fairly regular.',
      behaviorHint: 'calm and factual',
    },
    'w1-d1-resident-info': {
      topic: 'Ask about residents on that floor',
      question: 'Who lives on the floor Mr. Lee visited?',
      testimony: 'Most of the units on that floor are family homes. As far as I know, there is no home where a woman lives alone.',
      behaviorHint: 'recalling from memory',
    },
    'w1-d1-no-single-woman': {
      topic: 'Ask about the residents on that floor',
      question: 'I understand the visit frequency. Is there a woman living alone on that floor?',
      testimony: 'No, there is no unit on that floor where a woman lives alone. Most are family homes, and I understand that unit 302 is occupied by a man living alone.',
      behaviorHint: 'speaks with confidence',
    },
    'w1-d1-kid-spotted': {
      topic: 'Ask whether anyone came with him',
      question: 'Did Mr. Lee always come alone? Have you ever seen him leave with someone?',
      testimony: 'Sometimes I saw him come out with a child around middle-school age. There were times when the child was wearing a school uniform.',
      behaviorHint: 'slowly recalling the memory',
    },
    'w1-d1-core': {
      topic: 'Ask about the resident of unit 302',
      question: 'Can you tell us more about the person living in unit 302?',
      testimony: 'Unit 302 is occupied by a man living alone, but when Mr. Lee came by, I sometimes heard a child laughing from that home. I could smell food too. I assumed he was a friend or relative.',
      behaviorHint: 'careful but certain',
    },
    'w2-d2-cash-withdrawal': {
      topic: 'Ask about Lee Jun-ho’s cash withdrawals',
      question: 'Were there any large withdrawals from Mr. Lee Jun-ho’s account?',
      testimony: 'Yes. Over several months, he withdrew large sums in cash several times. I remember because they were all cash withdrawals, not transfers. The total was about 30 million won.',
      behaviorHint: 'professionally precise',
    },
    'w2-hd3-savings-cancel': {
      topic: 'Ask about the joint savings cancellation',
      question: 'Was this couple’s joint savings account ever canceled?',
      testimony: 'Yes. A jointly held fixed savings account was closed early. Ms. Park Ji-yeon brought a power of attorney, so we processed it.',
      behaviorHint: 'carefully',
    },
    'w2-hd3-savings-cancel-known': {
      topic: 'Ask about the power of attorney',
      question: 'Was there any problem with the power of attorney for the savings cancellation?',
      testimony: 'The signature on the power of attorney did look somewhat different. I tried to check once more, but she said it was urgent, so we processed it.',
      behaviorHint: 'slightly uneasy',
    },
    'w2-d2-cash-pattern': {
      topic: 'Ask about the withdrawal pattern',
      question: 'What was the pattern of the cash withdrawals? All at once, or divided?',
      testimony: 'They were divided over four months: 5 million, 8 million, 7 million, and 10 million won. They were all from the same branch ATM, and it was unusual that he did not use bank transfers.',
      behaviorHint: 'accurate, as if checking records',
    },
    'w2-hd3-signature-doubt': {
      topic: 'Ask what was wrong with the signature',
      question: 'When you say the signature looked different, what exactly was different?',
      testimony: 'The husband’s usual signature is more deliberate, but the signature on the power of attorney looked rushed and loose. I am not a handwriting expert, so I could not be certain.',
      behaviorHint: 'cautiously',
    },
    'w2-hd3-core': {
      topic: 'Ask about the husband’s later reaction',
      question: 'Did Mr. Lee Jun-ho ever come to the bank later about the savings cancellation?',
      testimony: 'Yes. A few weeks later he came in and said, "I never canceled that savings account." He looked very surprised. At that point I thought, "The power of attorney was the problem."',
      behaviorHint: 'with a clear memory',
    },
    'w3-motive-suspicion': {
      topic: 'Ask about Park Ji-yeon’s state of mind',
      question: 'What did Ms. Park Ji-yeon say about her husband?',
      testimony: 'Jiyeon said, "If my husband is cheating, I will protect my money first." She became very anxious after seeing a large amount of money leave his account.',
      behaviorHint: 'worried for her friend',
    },
    'w3-investment-link': {
      topic: 'Ask about the investment chat room',
      question: 'The investment chat room came up. How did Ms. Park Ji-yeon enter it?',
      testimony: 'Well... I did send her the link. People were saying the returns were good. But I truly did not know she would put in that much money.',
      behaviorHint: 'apologetic and hesitant',
    },
    'w3-money-amount': {
      topic: 'Ask about the investment amount',
      question: 'Do you know how much Ms. Park Ji-yeon invested?',
      testimony: 'I heard later it was 20 million won. She said she broke the savings account to put it in... I was shocked when I heard that.',
      behaviorHint: 'visibly shocked',
    },
    'w3-aftermath-call': {
      topic: 'Ask about the investment outcome',
      question: 'What happened with the investment?',
      testimony: 'Jiyeon called me at dawn crying. She said, "All the money is gone." The operator had left the chat room. She said she could never tell her husband and begged me to keep it secret.',
      behaviorHint: 'feels sorry for her friend and holds back tears',
    },
  },
  ja: {
    'w1-d1-visit-freq': {
      topic: '訪問頻度を尋ねる',
      question: 'イ・ジュノさんはこのオフィステルにどれくらい頻繁に来ていましたか。',
      testimony: '週に二、三回は来ていました。たいてい午後7時ごろに入って、午後10時ごろに出ていました。かなり規則的でした。',
      behaviorHint: '淡々と事実を話す',
    },
    'w1-d1-resident-info': {
      topic: 'その階の居住者を尋ねる',
      question: 'イ・ジュノさんが訪れていた階には、どのような人が住んでいますか。',
      testimony: 'その階はほとんどが家族世帯です。女性が一人で住んでいる部屋はないと把握しています。',
      behaviorHint: '記憶をたどりながら',
    },
    'w1-d1-no-single-woman': {
      topic: 'その階の居住構成を尋ねる',
      question: '訪問頻度は分かりました。では、その階に一人暮らしの女性はいますか。',
      testimony: 'いいえ、その階に女性が一人で住んでいる部屋はありません。家族世帯がほとんどで、302号室は男性が一人で住んでいると聞いています。',
      behaviorHint: '確信を持って',
    },
    'w1-d1-kid-spotted': {
      topic: '訪問時に同行者がいたか尋ねる',
      question: 'イ・ジュノさんはいつも一人でしたか。誰かと一緒に出てくるのを見たことはありますか。',
      testimony: '時々、中学生くらいの子どもと一緒に出てくるのを見ました。制服を着ていた時もありました。',
      behaviorHint: 'ゆっくり記憶をたどる',
    },
    'w1-d1-core': {
      topic: '302号室の居住者について尋ねる',
      question: '302号室に住んでいる方について、もう少し詳しく話せますか。',
      testimony: '302号室は男性が一人で住んでいますが、イ・ジュノさんが来ると、その部屋から子どもの笑い声が聞こえることがありました。食事の匂いもしました。友人か親戚なのだろうと思っていました。',
      behaviorHint: '慎重だが確信している',
    },
    'w2-d2-cash-withdrawal': {
      topic: 'イ・ジュノの現金引き出しを尋ねる',
      question: 'イ・ジュノさんの口座から大きな金額が引き出されたことはありますか。',
      testimony: 'はい。数か月にわたり、何度も大きな金額を現金で引き出されました。振込ではなくすべて現金だったので覚えています。総額は約3000万ウォンでした。',
      behaviorHint: '業務的に正確に',
    },
    'w2-hd3-savings-cancel': {
      topic: '共同積金の解約について尋ねる',
      question: 'この夫婦の共同名義の積金が解約されたことはありますか。',
      testimony: 'はい。共同名義の定期積金が中途解約されました。パク・ジヨンさんが委任状を持って来られたので処理しました。',
      behaviorHint: '慎重に',
    },
    'w2-hd3-savings-cancel-known': {
      topic: '積金解約の委任状について尋ねる',
      question: '積金解約時の委任状に問題はありませんでしたか。',
      testimony: '実は委任状の署名が少し違って見えました。もう一度確認しようとしましたが、急ぎだと言われたのでそのまま処理しました。',
      behaviorHint: '少し不安そうに',
    },
    'w2-d2-cash-pattern': {
      topic: '引き出しパターンを尋ねる',
      question: '現金引き出しはどのようなパターンでしたか。一度にですか、分けてですか。',
      testimony: '4か月に分けて引き出されました。500万、800万、700万、1000万ウォンです。すべて同じ支店のATMで、振込を使わない点が少し珍しかったです。',
      behaviorHint: '記録を確認するように正確に',
    },
    'w2-hd3-signature-doubt': {
      topic: '委任状署名の問題を尋ねる',
      question: '署名が違って見えたとは、具体的にどの部分ですか。',
      testimony: 'ご主人の本来の署名はもう少し丁寧な筆跡ですが、委任状の署名は流して書いたように見えました。ただ、私は筆跡鑑定人ではないので確信はできませんでした。',
      behaviorHint: '慎重に',
    },
    'w2-hd3-core': {
      topic: 'その後の夫の反応を尋ねる',
      question: 'イ・ジュノさんが後日、積金解約の件で銀行に来たことはありますか。',
      testimony: 'はい。数週間後に来られて、「積金を解約した覚えはない」とおっしゃいました。かなり驚いた表情でした。その時、私も委任状に問題があったのだと思いました。',
      behaviorHint: '記憶が鮮明に',
    },
    'w3-motive-suspicion': {
      topic: 'パク・ジヨンの心理状態を尋ねる',
      question: 'パク・ジヨンさんは夫についてどんな話をしていましたか。',
      testimony: 'ジヨンは「夫が浮気しているなら、まず自分のお金を守る」と言っていました。夫の口座から大きなお金が出ていくのを見て、とても不安がっていました。',
      behaviorHint: '友人を心配しながら',
    },
    'w3-investment-link': {
      topic: '投資チャットについて尋ねる',
      question: '投資チャットの話が出ましたが、パク・ジヨンさんはどうやってそこに入ったのですか。',
      testimony: 'それは... 私がリンクを送ったのは事実です。利益がいいと噂になっていたので。でも、あんなに大きなお金を入れるとは本当に思いませんでした。',
      behaviorHint: '申し訳なさそうにためらう',
    },
    'w3-money-amount': {
      topic: '投資額を尋ねる',
      question: 'パク・ジヨンさんがいくら投資したか知っていますか。',
      testimony: '後で聞いたら2000万ウォンだったそうです。積金を崩して入れたと... それを聞いて私も本当に驚きました。',
      behaviorHint: '衝撃を受けた表情で',
    },
    'w3-aftermath-call': {
      topic: '投資結果を尋ねる',
      question: '投資の結果はどうなりましたか。',
      testimony: 'ジヨンが明け方に泣きながら電話してきました。「お金が全部なくなった」と。運営者がチャットルームを出てしまったそうです。夫には絶対に言えない、どうか秘密にしてほしいと言っていました。',
      behaviorHint: '友人を気の毒に思い涙をこらえる',
    },
  },
  'zh-CN': {
    'w1-d1-visit-freq': {
      topic: '询问到访频率',
      question: '李俊浩先生多久来一次这栋办公公寓？',
      testimony: '他一周会来两三次。通常晚上7点左右进来，晚上10点左右离开。相当规律。',
      behaviorHint: '平静地陈述事实',
    },
    'w1-d1-resident-info': {
      topic: '询问该楼层住户',
      question: '李俊浩先生去的那一层住着什么人？',
      testimony: '那一层大多是家庭住户。据我所知，没有女性独居的住户。',
      behaviorHint: '一边回忆一边说',
    },
    'w1-d1-no-single-woman': {
      topic: '询问该楼层住户构成',
      question: '到访频率我明白了。那么那一层有女性独居的住户吗？',
      testimony: '没有，那一层没有女性独居的住户。大多是家庭住户，302号据我所知是一位男性独居。',
      behaviorHint: '语气确定',
    },
    'w1-d1-kid-spotted': {
      topic: '询问到访时是否有人同行',
      question: '李俊浩先生总是一个人来吗？你见过他和谁一起出来吗？',
      testimony: '有时我看到他和一个中学生年纪的孩子一起出来。那孩子有时还穿着校服。',
      behaviorHint: '慢慢回忆',
    },
    'w1-d1-core': {
      topic: '询问302号住户',
      question: '能再详细说说住在302号的人吗？',
      testimony: '302号是一位男性独居，但李俊浩先生来的时候，我有时会听到那家传出孩子的笑声，也会闻到饭菜味。所以我以为是朋友或亲戚。',
      behaviorHint: '谨慎但确定',
    },
    'w2-d2-cash-withdrawal': {
      topic: '询问李俊浩的现金取款',
      question: '李俊浩先生的账户有过大额取款吗？',
      testimony: '有。他在几个月里多次大额现金取款。不是转账，全都是现金，所以我记得。总额大约是3000万韩元。',
      behaviorHint: '职业且准确',
    },
    'w2-hd3-savings-cancel': {
      topic: '询问共同储蓄解约',
      question: '这对夫妻的共同储蓄账户曾经解约过吗？',
      testimony: '有。共同名义的定期储蓄被提前解约了。朴智妍女士带来了委托书，所以我们办理了。',
      behaviorHint: '谨慎地',
    },
    'w2-hd3-savings-cancel-known': {
      topic: '询问储蓄解约委托书',
      question: '储蓄解约时的委托书有什么问题吗？',
      testimony: '其实委托书上的签名看起来有点不一样。我本想再确认一次，但她说很急，所以就办理了。',
      behaviorHint: '略显不安',
    },
    'w2-d2-cash-pattern': {
      topic: '询问取款模式',
      question: '现金取款的模式是什么？一次取出，还是分批？',
      testimony: '分四个月取出。500万、800万、700万、1000万韩元。全都是同一家支行的ATM，而且没有使用转账，这一点有些少见。',
      behaviorHint: '像核对记录一样准确',
    },
    'w2-hd3-signature-doubt': {
      topic: '询问委托书签名问题',
      question: '你说签名不一样，具体是哪一部分？',
      testimony: '丈夫原本的签名更工整一些，但委托书上的签名像是潦草写成的。不过我不是笔迹鉴定人，所以不能确定。',
      behaviorHint: '小心地',
    },
    'w2-hd3-core': {
      topic: '询问丈夫之后的反应',
      question: '李俊浩先生后来有因为储蓄解约来过银行吗？',
      testimony: '有。几周后他来银行，说“我从来没有解约过那笔储蓄”。他的表情非常惊讶。那时我也觉得，问题可能出在委托书上。',
      behaviorHint: '记忆清晰',
    },
    'w3-motive-suspicion': {
      topic: '询问朴智妍的心理状态',
      question: '朴智妍女士对丈夫说过什么？',
      testimony: '智妍说过：“如果我丈夫出轨，我要先保住我的钱。”她看到丈夫账户里大笔钱流出后，非常不安。',
      behaviorHint: '担心朋友',
    },
    'w3-investment-link': {
      topic: '询问投资群',
      question: '提到了投资群。朴智妍女士是怎么进入那个群的？',
      testimony: '那个... 链接确实是我发给她的。大家都说收益不错。但我真的不知道她会投那么大一笔钱。',
      behaviorHint: '歉疚而犹豫',
    },
    'w3-money-amount': {
      topic: '询问投资金额',
      question: '你知道朴智妍女士投资了多少钱吗？',
      testimony: '后来听说是2000万韩元。她说是解了储蓄投进去的... 我听到后也吓了一跳。',
      behaviorHint: '表情震惊',
    },
    'w3-aftermath-call': {
      topic: '询问投资结果',
      question: '投资结果怎么样？',
      testimony: '智妍凌晨哭着给我打电话。她说“钱全没了”。群主已经退出聊天室。她说绝对不能告诉丈夫，还求我一定保密。',
      behaviorHint: '心疼朋友，忍着眼泪',
    },
  },
}

const FAMILY_01_OVERLAYS: CaseTestimonyOverlay = {
  en: {
    'w1-d1-visit-comfort': {
      topic: 'Ask about her reaction when the younger son visited',
      question: 'How did the mother react when the younger son came to visit?',
      testimony: 'When he came, her expression did soften a little. At first I thought he must be someone she was glad to see.',
      behaviorHint: 'calmly',
    },
    'w1-d1-paper-reading': {
      topic: 'Ask about the scene of reading documents',
      question: 'Did you ever see anyone reading documents to her?',
      testimony: 'Yes, I saw him read papers to her several times. Looking only at that scene, it bothered me a little too.',
      behaviorHint: 'cautiously',
    },
    'w1-d2-clarity-fluctuation': {
      topic: 'Ask whether her condition was consistent',
      question: 'Being pleased to see him and being able to judge are different issues. What was her condition like?',
      testimony: 'That is correct. Some days she answered my questions clearly, and other days she stared blankly even when I held her hand. I cannot say she was always lucid.',
      behaviorHint: 'stating only the facts',
    },
    'w1-d2-before-brother-arrives': {
      topic: 'Ask about the context of finishing things up',
      question: 'On the day the paper was read to her, did Mr. Yoon Jeong-hoo say anything separately?',
      testimony: 'He did. Mr. Yoon Jeong-hoo said, "Let us finish before my older brother comes." But it felt less like greed and more like caution because there might be another loud argument that day.',
      behaviorHint: 'choosing words carefully',
    },
    'w1-d3-avoid-conflict': {
      topic: 'Ask about the real atmosphere of the process',
      question: 'Answer from your own perspective. Was that process a scene of pressuring the mother, or a scene of trying to avoid conflict?',
      testimony: 'From what I saw beside them, it was closer to avoiding conflict. When the older brother came, voices really did get louder, and each time the mother hunched her shoulders. So I saw the younger son as trying to finish it without frightening her, not as using her.',
      behaviorHint: 'careful but clear',
    },
    'w2-d1-two-visits': {
      topic: 'Ask whether the same person came twice that day',
      question: 'Did the same person come to the office twice that day?',
      testimony: 'Yes, the same person came twice on the same day, so I remember it. That is not common.',
      behaviorHint: 'professionally precise',
    },
    'w2-d1-document-balance': {
      topic: 'Ask about the impression of the two documents',
      question: 'Did the first document and the resubmitted document feel different?',
      testimony: 'They did. The first one felt heavily tilted to one side, and the resubmitted one looked a little more balanced.',
      behaviorHint: 'calmly',
    },
    'w2-d2-same-submitter': {
      topic: 'Ask who resubmitted the document',
      question: 'Who stood at the reception desk both times?',
      testimony: 'Both times it was Mr. Yoon Jeong-hoo. He was also the one who took the documents back and brought them again.',
      behaviorHint: 'as if the memory is clear',
    },
    'w2-d2-ratio-change': {
      topic: 'Ask how the ratio changed',
      question: 'Explain the difference in numbers. How did it change?',
      testimony: 'The first document was Yoon Jeong-hoo 90 and Yoon Tae-seong 10. The second was changed to Yoon Jeong-hoo 60 and Yoon Tae-seong 40. Judging only by the numbers, he reduced his own share and submitted it again.',
      behaviorHint: 'clearly',
    },
    'w2-d3-benefit-direction': {
      topic: 'Ask whose benefit the revision served',
      question: 'When you saw that change, whose benefit did you think the revision moved toward?',
      testimony: 'At the very least, it was not a revision to increase his own share. Based only on what I saw at the desk, Mr. Yoon Jeong-hoo brought back a document lowering his ratio from 90 to 60. So the revision looked less like greed and more like an adjustment to soften the shock for his brother.',
      behaviorHint: 'careful but distinct',
    },
    'w3-d1-living-support': {
      topic: 'Ask about the regular support payments',
      question: 'Did the mother ever say anything about money coming in regularly?',
      testimony: 'She worried about money for a long time. Still, she once said she could endure because the younger son sent money every month.',
      behaviorHint: 'recalling calmly',
    },
    'w3-d1-secret-burden': {
      topic: 'Ask about saying the older son must not know',
      question: 'Did the mother ever say there was something the older son must not know?',
      testimony: 'Yes. She said several times that one matter had to stay unknown to that son until the end. Whenever she said it, her expression became very heavy.',
      behaviorHint: 'speaking quietly',
    },
    'w3-d2-money-nature': {
      topic: 'Ask what kind of money it was',
      question: 'What did you hear that money was for? Who was helping whom?',
      testimony: 'I heard it was money Mr. Yoon Jeong-hoo sent every month to his mother’s account. And when the 300 million won went out, the mother herself said it was money being sent toward Tae-seong’s factory.',
      behaviorHint: 'pointing only to what is clearly remembered',
    },
    'w3-d2-secret-reason': {
      topic: 'Ask why it had to be hidden',
      question: 'Did you hear why the older son must not know?',
      testimony: 'The mother avoided exact words, but she said, "If Tae-seong learns that fact, he will collapse as a person." She also said, "Jeong-hoo carries that burden alone."',
      behaviorHint: 'cautiously',
    },
    'w3-d3-why-kept-secret': {
      topic: 'Ask why Yoon Jeong-hoo kept the secret',
      question: 'Putting together what you heard, why do you think Mr. Yoon Jeong-hoo kept that secret?',
      testimony: 'It was not the tone of someone hiding something to get more inheritance. The mother first held on to him and said, "Tae-seong must never know," and Mr. Yoon Jeong-hoo was trying to keep his brother from falling apart as she asked. So I think the center of this family was closer to a birth secret and guilt than to a fight over money.',
      behaviorHint: 'heavy, but steady',
    },
  },
  ja: {
    'w1-d1-visit-comfort': {
      topic: '次男が訪れた時の反応を尋ねる',
      question: '次男が訪ねて来ると、お母様の反応はどうでしたか。',
      testimony: 'その方が来ると、表情が少し和らぎました。だから最初は、会えてうれしい人なのだと思いました。',
      behaviorHint: '淡々と',
    },
    'w1-d1-paper-reading': {
      topic: '書類を読み聞かせる場面を尋ねる',
      question: '書類を読み聞かせる場面を見たことはありますか。',
      testimony: 'はい、紙を読んであげているのは何度か見ました。その場面だけを見ると、私も少し気になりました。',
      behaviorHint: '慎重に',
    },
    'w1-d2-clarity-fluctuation': {
      topic: '状態が一定だったか尋ねる',
      question: '喜んだことと判断できたことは別問題です。状態はどうでしたか。',
      testimony: 'その通りです。私の質問にきちんと答える日もあれば、手を握ってもぼんやりしている日もありました。いつもはっきりしていたとは言えません。',
      behaviorHint: '事実だけを整理するように',
    },
    'w1-d2-before-brother-arrives': {
      topic: '終わらせようという言葉の文脈を尋ねる',
      question: '紙を読んでいた日、ユン・ジョンフさんが別に言ったことはありましたか。',
      testimony: 'ありました。ユン・ジョンフさんが「兄さんが来る前に終わらせよう」と言いました。ただ、その言葉は欲というより、その日また大声になるのを避けたいという慎重さに近く感じました。',
      behaviorHint: '慎重に言葉を選ぶ',
    },
    'w1-d3-avoid-conflict': {
      topic: 'その過程の実際の雰囲気を尋ねる',
      question: '証人の基準で答えてください。その過程はお母様を追い込む場面でしたか、それとも争いを避けようとする場面でしたか。',
      testimony: 'そばで見た限りでは、争いを避けようとする側でした。兄さんが来ると実際に声が大きくなり、そのたびにお母様は肩をすくめていました。だから私は、次男がお母様を利用したというより、怖がらせずに終わらせようとしていたと見ました。',
      behaviorHint: '慎重だがはっきりと',
    },
    'w2-d1-two-visits': {
      topic: '同じ日に二度来た事実を尋ねる',
      question: 'その日、同じ人が二度訪ねて来たことはありましたか。',
      testimony: 'はい、同じ方が同じ日に二度来られたので覚えています。よくあることではありません。',
      behaviorHint: '業務的に正確に',
    },
    'w2-d1-document-balance': {
      topic: '二つの書類の印象を尋ねる',
      question: '最初に持って来た書類と、再提出された書類の印象は違いましたか。',
      testimony: '違いました。最初のものは片方に大きく偏っている感じで、出し直されたものはそれより少し均衡が取れて見えました。',
      behaviorHint: '落ち着いて',
    },
    'w2-d2-same-submitter': {
      topic: '誰が再提出したか尋ねる',
      question: '二回とも受付に立ったのは誰でしたか。',
      testimony: '二回ともユン・ジョンフさんでした。書類をいったん持ち帰って、また持って来たのもその方です。',
      behaviorHint: '記憶が鮮明なように',
    },
    'w2-d2-ratio-change': {
      topic: '比率がどう変わったか尋ねる',
      question: 'その違いを数字で説明してください。どう変わりましたか。',
      testimony: '最初の書類はユン・ジョンフ90、ユン・テソン10で、二つ目はユン・ジョンフ60、ユン・テソン40に変わっていました。数字だけ見れば、自分の取り分を減らして出し直したことになります。',
      behaviorHint: 'はっきりと',
    },
    'w2-d3-benefit-direction': {
      topic: '修正が誰の利益に向いていたか尋ねる',
      question: 'その変更を見て、証人は誰の利益に向かう修正だと判断しましたか。',
      testimony: '少なくとも、自分の取り分を増やそうとする修正ではありませんでした。受付で見た結果だけで言えば、ユン・ジョンフさんは自分の比率を90から60に下げた書類を出し直したのです。だからその日の修正は、欲というより、兄が受ける衝撃を少し和らげる調整のように見えました。',
      behaviorHint: '慎重だが明瞭に',
    },
    'w3-d1-living-support': {
      topic: '定期支援金の事情を尋ねる',
      question: 'お母様は定期的に入るお金について話したことがありますか。',
      testimony: 'お金の心配を長くしていました。それでも、次男が毎月送ってくれるお金があるから持ちこたえられる、と話したことはあります。',
      behaviorHint: '落ち着いて思い出しながら',
    },
    'w3-d1-secret-burden': {
      topic: '長男が知らない方がいいという言葉を尋ねる',
      question: 'お母様が、長男には知られてはいけないと言ったことはありましたか。',
      testimony: 'ありました。あることはその息子が最後まで知らない方がいい、と何度かおっしゃいました。言うたびに表情がとても重くなりました。',
      behaviorHint: '低い声で',
    },
    'w3-d2-money-nature': {
      topic: 'そのお金の性格を尋ねる',
      question: 'そのお金はどのような性格だと聞きましたか。誰が誰を助けるお金でしたか。',
      testimony: 'ユン・ジョンフさんがお母様の口座に毎月送っているお金だと聞きました。そして3億ウォンが出る時は、「テソンの工場の方へ送るお金」だとお母様が直接おっしゃいました。',
      behaviorHint: 'はっきり覚えている部分だけを示す',
    },
    'w3-d2-secret-reason': {
      topic: 'なぜ隠す必要があったか尋ねる',
      question: '長男が知らない方がいいと言った理由を聞いたことはありますか。',
      testimony: 'お母様は正確な言葉を避けましたが、「テソンはその事実を知ったら人として崩れてしまう」と言いました。それから「ジョンフがその重荷を一人で背負っている」とも言っていました。',
      behaviorHint: '慎重に',
    },
    'w3-d3-why-kept-secret': {
      topic: 'ユン・ジョンフがなぜ秘密を隠したか尋ねる',
      question: '証人が聞いた話を総合すると、ユン・ジョンフさんはなぜその秘密を隠したと思いますか。',
      testimony: '遺産を多く受け取るために隠した人の口ぶりではありませんでした。お母様が先に「テソンは最後まで知らない方がいい」と頼み、ユン・ジョンフさんはその通りに兄が崩れないようにしていました。だから私は、この家の中心は金銭争いよりも出生の秘密と罪悪感に近かったと思います。',
      behaviorHint: '重く、しかし揺らがずに',
    },
  },
  'zh-CN': {
    'w1-d1-visit-comfort': {
      topic: '询问次子来访时的反应',
      question: '次子来看望时，母亲的反应如何？',
      testimony: '他来的时候，她的表情会稍微软下来。所以我一开始以为，他是她见了会高兴的人。',
      behaviorHint: '平静地',
    },
    'w1-d1-paper-reading': {
      topic: '询问读文件的场面',
      question: '你见过有人给她读文件吗？',
      testimony: '见过。我看过几次他给她读纸上的内容。只看那个场面，我也觉得有些在意。',
      behaviorHint: '谨慎地',
    },
    'w1-d2-clarity-fluctuation': {
      topic: '询问状态是否稳定',
      question: '她高兴见到他，和她是否有判断能力，是两回事。她的状态怎么样？',
      testimony: '是的。有些日子她能清楚回答我的问题，有些日子我握住她的手，她也只是发呆。我不能说她一直都很清醒。',
      behaviorHint: '只整理事实',
    },
    'w1-d2-before-brother-arrives': {
      topic: '询问“先结束”的语境',
      question: '读那张纸的当天，尹正厚先生有单独说过什么吗？',
      testimony: '有。尹正厚先生说过：“哥哥来之前把这件事结束吧。”不过那句话听起来不像贪心，更像是担心那天又会大声争吵，所以很小心。',
      behaviorHint: '谨慎措辞',
    },
    'w1-d3-avoid-conflict': {
      topic: '询问过程中的真实气氛',
      question: '请按证人的判断回答。那个过程是在逼迫母亲，还是在试图避免争吵？',
      testimony: '以我在旁边看到的情况，更接近于避免争吵。哥哥来了之后，声音确实会变大，每次母亲都会缩起肩膀。所以我认为次子不是在利用母亲，而是在尽量不要让她害怕地把事情结束。',
      behaviorHint: '谨慎但明确',
    },
    'w2-d1-two-visits': {
      topic: '询问同一天来过两次的事实',
      question: '那天同一个人来过两次吗？',
      testimony: '有。同一个人同一天来了两次，所以我记得。这并不常见。',
      behaviorHint: '职业且准确',
    },
    'w2-d1-document-balance': {
      topic: '询问两份文件的印象',
      question: '第一次带来的文件和后来重新提交的文件，给人的印象不同吗？',
      testimony: '不同。第一份感觉很偏向一方，重新提交的那份看起来比前一份更平衡一些。',
      behaviorHint: '沉着地',
    },
    'w2-d2-same-submitter': {
      topic: '询问是谁重新提交的',
      question: '两次都是谁站在受理窗口前？',
      testimony: '两次都是尹正厚先生。把文件拿回去后又重新带来的也是他。',
      behaviorHint: '像是记忆清楚',
    },
    'w2-d2-ratio-change': {
      topic: '询问比例如何改变',
      question: '请用数字说明差异。比例是怎么变的？',
      testimony: '第一份文件是尹正厚90、尹泰成10，第二份改成了尹正厚60、尹泰成40。只看数字的话，相当于是他减少了自己的份额后重新提交。',
      behaviorHint: '清楚地',
    },
    'w2-d3-benefit-direction': {
      topic: '询问修改朝向谁的利益',
      question: '看到这个变更后，你认为这个修改是朝谁的利益方向移动？',
      testimony: '至少不是为了增加他自己的份额。从受理窗口看到的结果来说，尹正厚先生重新提交的是把自己的比例从90降到60的文件。所以我看来，那天的修改不像贪婪，更像是想稍微减轻哥哥受到的冲击。',
      behaviorHint: '谨慎但清晰',
    },
    'w3-d1-living-support': {
      topic: '询问定期支援金情况',
      question: '母亲有没有说过定期进账的钱？',
      testimony: '她长期担心钱的问题。不过她曾说过，因为小儿子每个月寄钱来，她才能撑下去。',
      behaviorHint: '平静回忆',
    },
    'w3-d1-secret-burden': {
      topic: '询问“大儿子不能知道”的话',
      question: '母亲有没有说过，有些事大儿子不能知道？',
      testimony: '有。她说过好几次，有件事那个儿子直到最后都不能知道。每次说到这件事，她的表情都非常沉重。',
      behaviorHint: '低声说',
    },
    'w3-d2-money-nature': {
      topic: '询问那笔钱的性质',
      question: '你听说那笔钱是什么性质？是谁在帮助谁？',
      testimony: '我听说那是尹正厚先生每个月打到母亲账户里的钱。而3亿韩元转出时，母亲亲口说那是“要送到泰成工厂那边的钱”。',
      behaviorHint: '只指出清楚记得的部分',
    },
    'w3-d2-secret-reason': {
      topic: '询问为什么必须隐瞒',
      question: '你听说过为什么大儿子不能知道吗？',
      testimony: '母亲没有把话说得很具体，但她说过：“泰成如果知道那个事实，人会垮掉。”她也说过：“正厚一个人背着那个负担。”',
      behaviorHint: '小心地',
    },
    'w3-d3-why-kept-secret': {
      topic: '询问尹正厚为何隐瞒秘密',
      question: '综合你听到的话，你认为尹正厚先生为什么隐瞒那个秘密？',
      testimony: '那不是为了多拿遗产而隐瞒的人会有的语气。是母亲先抓着他说“泰成到最后都不能知道”，尹正厚先生则按照她的话，想阻止哥哥崩溃。所以我认为这个家的核心，比起金钱争夺，更接近出生秘密和罪疚感。',
      behaviorHint: '沉重但坚定',
    },
  },
}

const FRIEND_01_OVERLAYS: CaseTestimonyOverlay = {
  en: {
    'w1-d1-chat-mood': {
      topic: 'Ask about the group chat atmosphere',
      question: 'How did the group chat atmosphere change right after that screenshot was posted?',
      testimony: 'At first everyone was shocked. Since only the number of contacts was visible, honestly, I also thought that person had crossed the line.',
      behaviorHint: 'awkward but honest',
    },
    'w1-d1-frame-wording': {
      topic: 'Ask about the first framing words',
      question: 'How did Ms. Song Da-eun describe the screenshot when she posted it?',
      testimony: 'She did not simply post the record. The talk spread as if something similar had happened before. That made the atmosphere lean even more to one side.',
      behaviorHint: 'searching memory',
    },
    'w1-d2-no-one-checked': {
      topic: 'Ask whether anyone checked directly',
      question: 'After that, did anyone ask Ms. Choi Soo-min directly what had happened?',
      testimony: 'No. Everyone chose sides right after seeing the screenshot. I was also pressed by the atmosphere and did not contact her separately.',
      behaviorHint: 'apologetic',
    },
    'w1-d2-blame-spread': {
      topic: 'Ask how fast the blame spread',
      question: 'After that label attached to her, how quickly did the blame spread?',
      testimony: 'It barely took a few minutes. Once Ms. Song Da-eun posted, "Soo-min is contacting my man again," comments like "Why is she doing that before a wedding?" poured out immediately.',
      behaviorHint: 'frustrated',
    },
    'w1-d3-first-conclusion': {
      topic: 'Ask who created the conclusion first',
      question: 'Answer from your own perspective. Who made the conclusion first that day?',
      testimony: 'The order was clear. Ms. Song Da-eun first framed it as "she did it again," and that became the standard in the group chat. No one listened to Ms. Choi Soo-min’s side.',
      behaviorHint: 'firm, with apology',
    },
    'w2-d1-after-work-talk': {
      topic: 'Ask about remarks after the company dinner',
      question: 'After the company dinner, did your senior ever bring up Ms. Choi Soo-min?',
      testimony: 'Yes, he mentioned her. At first I thought he was just casually saying he found her attractive.',
      behaviorHint: 'cautiously',
    },
    'w2-d1-contact-reaction': {
      topic: 'Ask about his reaction after the contact issue',
      question: 'After the contact issue came up, how did your senior react?',
      testimony: 'Outwardly, he acted annoyed. But he seemed less like someone angry from unfairness and more like someone uncomfortable because he had been caught.',
      behaviorHint: 'watching the room',
    },
    'w2-d2-flirt-remark': {
      topic: 'Ask exactly what he said',
      question: 'You said he showed interest. What exactly did he say?',
      testimony: 'He said things like, "That Pilates woman is nice," and "Would it be weird if I asked her to get coffee without Da-eun knowing?" It was not something an engaged man should say.',
      behaviorHint: 'disapproving',
    },
    'w2-d2-why-looked-caught': {
      topic: 'Ask why he looked caught',
      question: 'Explain why he looked that way, based on what you heard.',
      testimony: 'He once said to me, almost offhand, "I made it worse by touching it first." That is why I do not think Ms. Choi Soo-min’s contact suddenly began out of nowhere.',
      behaviorHint: 'with a small sigh',
    },
    'w2-d3-rejection-ignored': {
      topic: 'Ask whether he crossed the line after being rejected',
      question: 'Answer based on what you saw, not your judgment. Was there a circumstance showing your senior crossed the line first?',
      testimony: 'Yes. He once showed me his phone and laughed, saying, "She says I should not do this because I am her friend’s boyfriend." Even after receiving a rejection, he said, "She will come around at least once." What I saw was not Ms. Choi Soo-min’s obsession, but his light, pushy approach.',
      behaviorHint: 'recalling an unpleasant memory',
    },
    'w3-d1-crying-scene': {
      topic: 'Ask about the customer’s condition that day',
      question: 'At the cafe a few years ago, what was Ms. Choi Soo-min’s condition that day?',
      testimony: 'A young customer stayed alone after the conversation and cried for a long time. It did not look like a face crying just from hurt feelings.',
      behaviorHint: 'recalling cautiously',
    },
    'w3-d1-money-pressure': {
      topic: 'Ask about the tone of the conversation',
      question: 'Did the conversation at that table sound closer to a request or to pressure?',
      testimony: 'At first it sounded like a request, but the more I listened, the more it felt like he was cornering her so she could not refuse. I could tell it was about money.',
      behaviorHint: 'uneasy',
    },
    'w3-d2-overheard-phrase': {
      topic: 'Ask what was said before she cried',
      question: 'Did you hear what was said before she started crying?',
      testimony: 'Yes. The man said, "If you cover this just this once, I will pay you back soon." The young woman said, "Why are you doing this to me again?" It did not sound like it had happened only once or twice.',
      behaviorHint: 'speaking quietly',
    },
    'w3-d2-father-identity': {
      topic: 'Ask who the man was',
      question: 'Did you later find out who that middle-aged man was?',
      testimony: 'I later heard in the neighborhood that he was Ms. Song Da-eun’s father. A few days later I asked Da-eun if that day was all right, and she only said briefly, "I ended things with Soo-min."',
      behaviorHint: 'awkward',
    },
    'w3-d3-breakup-cause': {
      topic: 'Ask about the cause of the earlier break',
      question: 'Based on what you saw that day, what did the cause of the earlier break look closer to?',
      testimony: 'What I saw was not a friend changing her mind, but a money problem. Ms. Song Da-eun’s father pressed Ms. Choi Soo-min, and Ms. Choi Soo-min fell apart alone without being able to tell Da-eun. If the relationship broke after that, the first crack came closer from the adult, not from the friend.',
      behaviorHint: 'careful but firm',
    },
  },
  ja: {
    'w1-d1-chat-mood': {
      topic: 'グループチャットの雰囲気を尋ねる',
      question: 'そのスクリーンショットが上がった直後、グループチャットの雰囲気はどう流れましたか。',
      testimony: '最初はみんな驚きました。連絡回数だけが見えていたので、正直、私もその人が一線を越えたのだと思いました。',
      behaviorHint: '気まずそうに正直に',
    },
    'w1-d1-frame-wording': {
      topic: '最初についた言葉の方向を尋ねる',
      question: 'ソン・ダウンさんはそのスクリーンショットを上げる時、どのように説明しましたか。',
      testimony: 'ただ記録だけを上げたのではなく、以前にも似たことがあったという感じで話が広がりました。それで雰囲気がさらに一方に傾きました。',
      behaviorHint: '記憶を探りながら',
    },
    'w1-d2-no-one-checked': {
      topic: '直接確認した人がいたか尋ねる',
      question: 'その後、チェ・スミンさんに直接事情を聞いた人はいましたか。',
      testimony: 'いませんでした。みんなスクリーンショットを見てすぐに立場を決めました。私もその時は雰囲気に押されて、別に連絡できませんでした。',
      behaviorHint: '申し訳なさそうに',
    },
    'w1-d2-blame-spread': {
      topic: '非難が広がった速さを尋ねる',
      question: 'その言葉がついた後、非難はどれくらい早く広がりましたか。',
      testimony: 'ほとんど数分もかかりませんでした。ソン・ダウンさんが「スミンがまた私の男に連絡している」と上げると、すぐに「結婚を控えてなぜそんなことをするのか」という言葉があふれました。',
      behaviorHint: 'もどかしそうに',
    },
    'w1-d3-first-conclusion': {
      topic: '誰が先に結論を作ったか尋ねる',
      question: '証人の基準で答えてください。その日、誰が先に結論を作ってしまいましたか。',
      testimony: '順序ははっきりしていました。ソン・ダウンさんが先に「またやった」という形で断定し、その言葉がグループチャットの基準になってしまいました。チェ・スミンさん側の話は誰も聞きませんでした。',
      behaviorHint: '申し訳なさを込めて断固と',
    },
    'w2-d1-after-work-talk': {
      topic: '会食後の言及を尋ねる',
      question: '会食の後、先輩がチェ・スミンさんの話を出したことはありますか。',
      testimony: 'はい、その方の話をしたことがあります。最初は、ただ好感を軽く口にしているのだと思いました。',
      behaviorHint: '慎重に',
    },
    'w2-d1-contact-reaction': {
      topic: '問題後の反応を尋ねる',
      question: '連絡問題が表に出た後、先輩の反応はどうでしたか。',
      testimony: '表向きは面倒くさそうにしていました。でも、不当で怒っている人というより、見つかって居心地が悪い人に近く見えました。',
      behaviorHint: '様子をうかがいながら',
    },
    'w2-d2-flirt-remark': {
      topic: '具体的に何を言ったか尋ねる',
      question: '好感と言いましたが、具体的にどんなことを言いましたか。',
      testimony: '先輩は「あのピラティスをしている人、いいよな」「ダウンに内緒でコーヒーでも誘ったら変かな」などと言いました。婚約している人が言うことではありませんでした。',
      behaviorHint: '不快そうに',
    },
    'w2-d2-why-looked-caught': {
      topic: 'なぜ見つかった人のように見えたか尋ねる',
      question: 'なぜそう見えたのか、聞いた言葉を基準に説明してください。',
      testimony: '先輩が私に「余計にこっちから触って事が大きくなった」とぽろっと言ったことがあります。だから私は、チェ・スミンさんの連絡が突然始まったわけではないと思いました。',
      behaviorHint: '小さくため息をつきながら',
    },
    'w2-d3-rejection-ignored': {
      topic: '拒絶後も一線を越えたか尋ねる',
      question: '証人の判断ではなく、見た場面で答えてください。先輩が先に一線を越えたと見られる事情はありましたか。',
      testimony: 'ありました。先輩が携帯を見せながら、「友達の彼氏だからやめろってさ」と笑い流したことがあります。拒絶の返信を受けても、「一度くらいはこっちに来るだろう」と言っていました。私が見たのはチェ・スミンさんの執着ではなく、先輩側の軽い押しでした。',
      behaviorHint: '不快だった記憶を取り出しながら',
    },
    'w3-d1-crying-scene': {
      topic: 'その日の客の状態を尋ねる',
      question: '数年前、カフェでその日、チェ・スミンさんの状態はどうでしたか。',
      testimony: '若いお客様が一人、会話が終わった後に残って長く泣いていました。ただ寂しくて泣く顔ではありませんでした。',
      behaviorHint: '慎重に回想しながら',
    },
    'w3-d1-money-pressure': {
      topic: '会話の雰囲気を尋ねる',
      question: 'その場の会話はお願いに近かったですか、それとも圧迫に近かったですか。',
      testimony: '最初はお願いのように聞こえましたが、聞けば聞くほど断れないように追い込む側に近かったです。お金の話だということは分かりました。',
      behaviorHint: '釈然としない様子で',
    },
    'w3-d2-overheard-phrase': {
      topic: '泣く前に聞いた言葉を尋ねる',
      question: '泣く前にどんな言葉が交わされたか、聞いたことはありますか。',
      testimony: 'はい。その男性が「今回だけ防いでくれればすぐ返す」と言いました。その若い方は「なぜまた私にそんなことをするんですか」と言っていました。一度や二度のことではなさそうでした。',
      behaviorHint: '低い声で',
    },
    'w3-d2-father-identity': {
      topic: 'その男性が誰だったか尋ねる',
      question: 'その中年男性が誰だったか、後で分かりましたか。',
      testimony: '後で近所で聞いて分かりました。ソン・ダウンさんのお父様でした。数日後、私がダウンさんにその日は大丈夫だったか尋ねると、「スミンとは終わらせた」とだけ短く言いました。',
      behaviorHint: '困ったように',
    },
    'w3-d3-breakup-cause': {
      topic: '過去の絶縁原因を尋ねる',
      question: 'その日の場面を基準に見ると、過去の絶縁原因は何に近く見えましたか。',
      testimony: '私が見たのは友人の心変わりではなく、お金の問題でした。ソン・ダウンさんのお父様がチェ・スミンさんを責め、チェ・スミンさんはダウンさんに言えないまま一人で崩れていました。その後に関係が切れたのなら、先にひびを入れたのは友人ではなく大人の側に近かったです。',
      behaviorHint: '慎重だが断固として',
    },
  },
  'zh-CN': {
    'w1-d1-chat-mood': {
      topic: '询问群聊气氛',
      question: '那张截图发出来后，群聊气氛是怎么变化的？',
      testimony: '一开始大家都很震惊。因为只看得到联系次数，说实话，我当时也以为那个人越界了。',
      behaviorHint: '尴尬但诚实',
    },
    'w1-d1-frame-wording': {
      topic: '询问最初定性的说法',
      question: '宋多恩女士发那张截图时，是怎么说明的？',
      testimony: '她不是单纯上传记录，而是把话说成以前也发生过类似的事。所以气氛更偏向一边了。',
      behaviorHint: '一边回忆一边说',
    },
    'w1-d2-no-one-checked': {
      topic: '询问是否有人直接确认',
      question: '之后有人直接问过崔秀敏女士事情经过吗？',
      testimony: '没有。大家看了截图就立刻站队了。我当时也被气氛压住，没有另外联系她。',
      behaviorHint: '带着歉意',
    },
    'w1-d2-blame-spread': {
      topic: '询问指责扩散速度',
      question: '贴上那个说法后，指责扩散得有多快？',
      testimony: '几乎没过几分钟。宋多恩女士发出“秀敏又联系我男人”之后，马上就有人说“都快结婚了，她为什么这样”。',
      behaviorHint: '感到憋闷',
    },
    'w1-d3-first-conclusion': {
      topic: '询问谁先制造结论',
      question: '请按证人的判断回答。那天是谁先制造了结论？',
      testimony: '顺序很清楚。宋多恩女士先用“她又那样了”的方式下了定论，那句话就成了群聊里的标准。没有人听崔秀敏女士那边的说法。',
      behaviorHint: '带着歉意但坚定',
    },
    'w2-d1-after-work-talk': {
      topic: '询问聚餐后的提及',
      question: '公司聚餐之后，你的前辈提起过崔秀敏女士吗？',
      testimony: '有，他提过她。一开始我以为他只是轻描淡写地说有好感。',
      behaviorHint: '谨慎地',
    },
    'w2-d1-contact-reaction': {
      topic: '询问联系问题后的反应',
      question: '联系问题曝光后，你的前辈反应如何？',
      testimony: '表面上他装作很烦。但他看起来不像是因为委屈而生气，更像是被发现后不自在。',
      behaviorHint: '看着周围气氛',
    },
    'w2-d2-flirt-remark': {
      topic: '询问具体说过什么',
      question: '你说他有好感，具体他说了什么？',
      testimony: '他说过“那个练普拉提的女生不错啊”“不让多恩知道，约她喝一次咖啡会不会很奇怪”之类的话。那不是订婚的人该说的话。',
      behaviorHint: '不赞同地',
    },
    'w2-d2-why-looked-caught': {
      topic: '询问为什么像被抓到的人',
      question: '请根据你听到的话说明，为什么你会这样看。',
      testimony: '他曾经随口对我说过：“是我先去碰，才把事情弄大了。”所以我认为，崔秀敏女士的联系并不是突然从无到有开始的。',
      behaviorHint: '轻轻叹气',
    },
    'w2-d3-rejection-ignored': {
      topic: '询问被拒后是否仍越界',
      question: '不要说判断，请按你看到的场面回答。有没有情况显示你的前辈先越界？',
      testimony: '有。他曾经给我看手机，笑着说：“她说我是朋友的男朋友，所以不能这样。”收到拒绝回复后，他还说“总有一次会过来的吧”。我看到的不是崔秀敏女士的执着，而是前辈那边轻率的靠近。',
      behaviorHint: '说起令人不快的记忆',
    },
    'w3-d1-crying-scene': {
      topic: '询问当天客人的状态',
      question: '几年前在咖啡店那天，崔秀敏女士是什么状态？',
      testimony: '有位年轻客人谈话结束后一个人留下来哭了很久。那不是单纯因为难过而哭的表情。',
      behaviorHint: '谨慎回想',
    },
    'w3-d1-money-pressure': {
      topic: '询问对话气氛',
      question: '那次对话的气氛更像请求，还是更像施压？',
      testimony: '一开始听起来像请求，但越听越像把人逼到不能拒绝。我能听出来是在说钱。',
      behaviorHint: '感到不舒服',
    },
    'w3-d2-overheard-phrase': {
      topic: '询问她哭前听到的话',
      question: '她哭之前，你听到他们说了什么吗？',
      testimony: '听到了。那个男人说：“这次你只要帮我挡一下，我很快还你。”那个年轻人说：“你为什么又这样对我？”听起来不像只有一两次。',
      behaviorHint: '低声说',
    },
    'w3-d2-father-identity': {
      topic: '询问那个男人是谁',
      question: '你后来知道那个中年男人是谁了吗？',
      testimony: '后来我在附近听说了。他是宋多恩女士的父亲。几天后我问多恩那天还好吗，她只短短地说了一句：“我和秀敏结束了。”',
      behaviorHint: '为难地',
    },
    'w3-d3-breakup-cause': {
      topic: '询问过去断交的原因',
      question: '以那天的场面来看，过去断交的原因更接近什么？',
      testimony: '我看到的不是朋友变心，而是钱的问题。宋多恩女士的父亲逼迫崔秀敏女士，崔秀敏女士无法告诉多恩，一个人崩溃了。如果之后关系断了，那么先制造裂痕的更像是大人那边，而不是朋友。',
      behaviorHint: '谨慎但坚定',
    },
  },
}

const TESTIMONY_OVERLAYS: Record<string, CaseTestimonyOverlay> = {
  'spouse-01': SPOUSE_01_OVERLAYS,
  'family-01': FAMILY_01_OVERLAYS,
  'friend-01': FRIEND_01_OVERLAYS,
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
