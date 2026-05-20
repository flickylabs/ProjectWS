import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, normalizeLocale, type LocaleCode } from './locales.ts'
import { GENERATED_RUNTIME_TEXT } from './runtimeText.generated.ts'

type LocaleText = Record<Exclude<LocaleCode, 'ko'>, string>

const HANGUL_RE = /[\uAC00-\uD7A3]/

export function hasHangulText(value: unknown): boolean {
  return HANGUL_RE.test(String(value ?? ''))
}

export function getRuntimeTextLocale(): LocaleCode {
  try {
    const stored = normalizeLocale(localStorage.getItem(LOCALE_STORAGE_KEY))
    if (stored) return stored
  } catch {
    // Ignore storage access failures in restricted contexts.
  }

  if (typeof document !== 'undefined') {
    const documentLocale = normalizeLocale(document.documentElement.lang)
    if (documentLocale) return documentLocale
  }

  return DEFAULT_LOCALE
}

const EXACT: Record<string, LocaleText> = {
  '대화 중 반복적으로 드러나는 말버릇 정보입니다.': {
    en: 'A recurring speech habit is visible in the dialogue.',
    ja: '会話の中で繰り返し表れる話し方の癖です。',
    'zh-CN': '这是对话中反复显现的说话习惯信息。',
  },
  '증거 조사': { en: 'Evidence Investigation', ja: '証拠調査', 'zh-CN': '证据调查' },
  '증거조사': { en: 'Evidence Investigation', ja: '証拠調査', 'zh-CN': '证据调查' },
  '새 증거 확보': { en: 'New Evidence Secured', ja: '新証拠を確保', 'zh-CN': '已取得新证据' },
  '증거 목록 갱신': { en: 'Evidence List Updated', ja: '証拠リスト更新', 'zh-CN': '证据列表已更新' },
  '좌측 증거 목록에 새 증거가 추가되었습니다.': {
    en: 'New evidence has been added to the evidence notebook.',
    ja: '新しい証拠が証拠ノートに追加されました。',
    'zh-CN': '新的证据已加入证据笔记。',
  },
  '관련 쟁점': { en: 'Related Dispute', ja: '関連争点', 'zh-CN': '相关争议' },
  '보류된 판결': { en: 'Deferred Verdict', ja: '保留中の判断', 'zh-CN': '暂缓判决' },
  '판결 재개': { en: 'Resume Verdict', ja: '判断を再開', 'zh-CN': '恢复判决' },
  '말씀해 주십시오.': { en: 'Please answer.', ja: 'お答えください。', 'zh-CN': '请作答。' },
  '목돈 출금의 경위': { en: 'Circumstances of the lump-sum withdrawal', ja: 'まとまった出金の経緯', 'zh-CN': '大额取款的经过' },
  '공동 자금 해지 절차': { en: 'Joint funds cancellation procedure', ja: '共同資金の解約手続き', 'zh-CN': '共同资金解除流程' },
  '동선과 금전 흐름': { en: 'Route and money flow', ja: '動線と金銭の流れ', 'zh-CN': '动线与资金流向' },
  '유서 작성 과정': { en: 'Will-writing process', ja: '遺書作成の過程', 'zh-CN': '遗嘱撰写过程' },
  '공증 절차의 확인 지점': { en: 'Verification point in the notarization procedure', ja: '公証手続きの確認点', 'zh-CN': '公证流程的确认点' },
  '오래된 자금 흐름': { en: 'Old funds flow', ja: '古い資金の流れ', 'zh-CN': '旧有资金流向' },
  '가족 기록과 침묵': { en: 'Family records and silence', ja: '家族の記録と沈黙', 'zh-CN': '家庭记录与沉默' },
  '어머니 기록의 해석': { en: "Interpretation of the mother's records", ja: '母の記録の解釈', 'zh-CN': '母亲记录的解读' },
  '메시지 선후관계': { en: 'Message chronology', ja: 'メッセージの前後関係', 'zh-CN': '消息先后关系' },
  '예비신랑에게 이어진 부탁': { en: 'Request passed to the fiance', ja: '婚約者へつながった頼み', 'zh-CN': '传到准新郎处的请求' },
  '과거 관계가 끊긴 이유': { en: 'Why the past relationship ended', ja: '過去の関係が途切れた理由', 'zh-CN': '过去关系中断的原因' },
  '단톡방 발언의 책임': { en: 'Responsibility for group-chat statements', ja: 'グループチャット発言の責任', 'zh-CN': '群聊发言责任' },
  '목돈 출금 흔적과 설명되지 않은 사용처를 확인해야 합니다.': {
    en: 'The withdrawal trace and unexplained use of funds need to be checked.',
    ja: 'まとまった出金の痕跡と説明されていない使途を確認する必要があります。',
    'zh-CN': '需要确认大额取款痕迹及尚未说明的用途。',
  },
  '공동 자금 해지 절차와 동의 여부를 확인해야 합니다.': {
    en: 'The joint funds cancellation procedure and consent need to be checked.',
    ja: '共同資金の解約手続きと同意の有無を確認する必要があります。',
    'zh-CN': '需要确认共同资金解除流程及是否获得同意。',
  },
  '동선과 금전 흐름 사이에 함께 검토할 정황이 생겼습니다.': {
    en: 'A circumstance has emerged that links route and money flow for joint review.',
    ja: '動線と金銭の流れを合わせて検討すべき事情が生じました。',
    'zh-CN': '动线与资金流向之间出现了需要一并审查的情况。',
  },
  '유서 작성 시점과 당시 판단 과정을 함께 확인해야 합니다.': {
    en: 'The timing of the will and the decision process at that time need to be checked together.',
    ja: '遺書作成の時点と当時の判断過程を合わせて確認する必要があります。',
    'zh-CN': '需要一并确认遗嘱撰写时间及当时的判断过程。',
  },
  '공증 절차와 문서 작성 시점을 함께 확인해야 합니다.': {
    en: 'The notarization procedure and document drafting time need to be checked together.',
    ja: '公証手続きと文書作成時点を合わせて確認する必要があります。',
    'zh-CN': '需要一并确认公证流程与文件撰写时间。',
  },
  '오래된 자금 흐름에서 출처와 전달 순서를 확인해야 합니다.': {
    en: 'The source and transfer order need to be checked in the old funds flow.',
    ja: '古い資金の流れについて、出所と受け渡し順を確認する必要があります。',
    'zh-CN': '需要在旧有资金流向中确认来源和交付顺序。',
  },
  '가족 기록과 침묵 사이에 확인할 사정이 있습니다.': {
    en: 'There are circumstances to check between the family records and the silence.',
    ja: '家族の記録と沈黙の間に確認すべき事情があります。',
    'zh-CN': '家庭记录与沉默之间存在需要确认的情况。',
  },
  '어머니가 남긴 기록과 두 형제의 해석 차이를 함께 정리해야 합니다.': {
    en: "The mother's records and the two brothers' differing interpretations need to be organized together.",
    ja: '母が残した記録と兄弟二人の解釈の違いを合わせて整理する必要があります。',
    'zh-CN': '需要一并梳理母亲留下的记录和兄弟二人的解读差异。',
  },
  '메시지의 시간 순서와 대응 방식을 확인해야 합니다.': {
    en: 'The message timeline and response pattern need to be checked.',
    ja: 'メッセージの時系列と対応方法を確認する必要があります。',
    'zh-CN': '需要确认消息的时间顺序和应对方式。',
  },
  '예비신랑에게 이어진 부탁의 내용과 경로를 확인해야 합니다.': {
    en: 'The content and route of the request that reached the fiance need to be checked.',
    ja: '婚約者へつながった頼みの内容と経路を確認する必要があります。',
    'zh-CN': '需要确认传到准新郎处的请求内容和路径。',
  },
  '과거 관계가 끊긴 시점과 당시 남은 기록을 별도로 확인해야 합니다.': {
    en: 'The point when the past relationship ended and the remaining records from that time need separate review.',
    ja: '過去の関係が途切れた時点と当時残った記録を別途確認する必要があります。',
    'zh-CN': '需要分别确认过去关系中断的时间点及当时留下的记录。',
  },
  '단톡방 글이 퍼진 과정과 확인 없이 단정한 책임을 정리해야 합니다.': {
    en: 'The spread of the group-chat post and responsibility for judging without verification need to be organized.',
    ja: 'グループチャットの投稿が広がった過程と、確認なしに断定した責任を整理する必要があります。',
    'zh-CN': '需要梳理群聊文字扩散过程以及未经确认就下定论的责任。',
  },
  '검토 대상': { en: 'Review Target', ja: '検討対象', 'zh-CN': '审查对象' },
  '검토': { en: 'Review', ja: '検討', 'zh-CN': '审查' },
  '경위 확인': { en: 'Context Check', ja: '経緯確認', 'zh-CN': '经过确认' },
  '사실추궁': { en: 'Fact Pursuit', ja: '事実追及', 'zh-CN': '事实追问' },
  '사실 추궁': { en: 'Fact Pursuit', ja: '事実追及', 'zh-CN': '事实追问' },
  '동기탐색': { en: 'Motive Search', ja: '動機探索', 'zh-CN': '动机探索' },
  '동기 탐색': { en: 'Motive Search', ja: '動機探索', 'zh-CN': '动机探索' },
  '공감접근': { en: 'Empathy Approach', ja: '共感アプローチ', 'zh-CN': '共情接近' },
  '공감 접근': { en: 'Empathy Approach', ja: '共感アプローチ', 'zh-CN': '共情接近' },
  '정면추궁': { en: 'Direct Pressure', ja: '正面追及', 'zh-CN': '正面追问' },
  '정면 추궁': { en: 'Direct Pressure', ja: '正面追及', 'zh-CN': '正面追问' },
  '질문할': { en: 'questioning', ja: '質問', 'zh-CN': '提问' },
  '증거 제시할': { en: 'presenting evidence', ja: '証拠提示', 'zh-CN': '提交证据' },
  '상대': { en: 'the other party', ja: '相手', 'zh-CN': '对方' },
  '해당 사안': { en: 'the matter at issue', ja: '当該事項', 'zh-CN': '该事项' },
  '개인적인 사정': { en: 'personal circumstances', ja: '個人的な事情', 'zh-CN': '个人情况' },
  '개인적으로는': { en: 'personally', ja: '個人的には', 'zh-CN': '就个人而言' },
  '개인적인 사정을 우선한 판단이 배우자에게 설명하지 않는 선택으로 바뀐 지점': {
    en: 'the point where prioritizing personal circumstances turned into choosing not to explain it to the spouse',
    ja: '個人的な事情を優先した判断が、配偶者へ説明しない選択に変わった時点',
    'zh-CN': '把个人情况置于优先的判断转变为不向配偶说明的那个节点',
  },
  '배우자': { en: 'spouse', ja: '配偶者', 'zh-CN': '配偶' },
  '이웃': { en: 'neighbor', ja: '隣人', 'zh-CN': '邻居' },
  '직장 관계': { en: 'workplace relationship', ja: '職場関係', 'zh-CN': '职场关系' },
  '동업 관계': { en: 'business partnership', ja: '共同事業関係', 'zh-CN': '合伙关系' },
  '가족': { en: 'family', ja: '家族', 'zh-CN': '家人' },
  '임대차 관계': { en: 'tenant-landlord relationship', ja: '賃貸借関係', 'zh-CN': '租赁关系' },
  '친구': { en: 'friends', ja: '友人', 'zh-CN': '朋友' },
  '사건 관계자': { en: 'case-related parties', ja: '事件関係者', 'zh-CN': '案件相关人员' },
  '직접 확인한 사실과 추정을 나눠 듣는다.': {
    en: 'Separate directly verified facts from assumptions.',
    ja: '直接確認した事実と推測を分けて聞き取ります。',
    'zh-CN': '区分听取直接确认的事实与推测。',
  },
  '이 품목들은 누구를 위해 구입한 것입니까?': {
    en: 'Who were these items purchased for?',
    ja: 'これらの品物は誰のために購入したものですか。',
    'zh-CN': '这些物品是为谁购买的？',
  },
  '이 물품들은 누구를 위해 구입한 것입니까?': {
    en: 'Who were these items purchased for?',
    ja: 'これらの物品は誰のために購入したものですか。',
    'zh-CN': '这些物品是为谁购买的？',
  },
  '참고서는 누구를 위해 산 것입니까?': {
    en: 'Who was the study guide bought for?',
    ja: '参考書は誰のために買ったものですか。',
    'zh-CN': '参考书是为谁买的？',
  },
  '이 증거와 관련해 설명해 주시겠습니까?': {
    en: 'Please explain how this evidence relates to the issue.',
    ja: 'この証拠が争点とどう関係するのか説明してください。',
    'zh-CN': '请说明这项证据与争点有什么关系。',
  },
  '오피스텔 방문': { en: 'Officetel Visit', ja: 'オフィステル訪問', 'zh-CN': '公寓式办公楼访问' },
  '새벽 전화': { en: 'Early Morning Phone Call', ja: '未明の電話', 'zh-CN': '凌晨电话' },
  '영수증 물건': { en: 'Receipt Items', ja: '領収書の品目', 'zh-CN': '收据物品' },
  '외도 의심': { en: 'Affair Suspicion', ja: '不貞の疑い', 'zh-CN': '外遇疑点' },
  '금전 흐름': { en: 'Money Flow', ja: '金銭の流れ', 'zh-CN': '资金流向' },
  '문서 출처': { en: 'Document Origin', ja: '文書の出所', 'zh-CN': '文件来源' },
  '관계 맥락': { en: 'Relationship Context', ja: '関係の文脈', 'zh-CN': '关系背景' },
  '메시지 맥락': { en: 'Message Context', ja: 'メッセージの文脈', 'zh-CN': '消息背景' },
  '증인 발언': { en: 'Witness Statement', ja: '証人発言', 'zh-CN': '证人发言' },
  '증거': { en: 'Evidence', ja: '証拠', 'zh-CN': '证据' },
  '관찰': { en: 'Observation', ja: '観察', 'zh-CN': '观察' },
  '수첩': { en: 'Notebook', ja: '手帳', 'zh-CN': '笔记' },
  '기록': { en: 'Record', ja: '記録', 'zh-CN': '记录' },
  '재판관': { en: 'Judge', ja: '裁判官', 'zh-CN': '裁判官' },
  '재판관의 관찰': { en: 'Judge Observation', ja: '裁判官の観察', 'zh-CN': '裁判官观察' },
  '속마음': { en: 'Inner State', ja: '内心', 'zh-CN': '内心状态' },
  '회피형': { en: 'Avoidant', ja: '回避型', 'zh-CN': '回避型' },
  '갈등 회피': { en: 'Conflict Avoidant', ja: '葛藤回避', 'zh-CN': '回避冲突' },
  '공격형': { en: 'Aggressive', ja: '攻撃型', 'zh-CN': '攻击型' },
  '피해자 서사': { en: 'Victim Narrative', ja: '被害者ナラティブ', 'zh-CN': '受害者叙事' },
  '대립형': { en: 'Confrontational', ja: '対立型', 'zh-CN': '对立型' },
  '냉철 논리': { en: 'Cold Logic', ja: '冷静論理', 'zh-CN': '冷静逻辑' },
  '감정 둔화': { en: 'Flattened Affect', ja: '感情鈍化', 'zh-CN': '情感钝化' },
  '감정 무력화': { en: 'Affect Flattening', ja: '感情の無力化', 'zh-CN': '情感弱化' },
  '성급한 정리': { en: 'Premature Summary', ja: '早急な整理', 'zh-CN': '过早总结' },
  '직접 충돌을 피하고 다른 맥락으로 비켜 가려는 성향입니다. 사실 확인 질문에 상대적으로 민감합니다.': {
    en: 'They tend to avoid direct conflict and move into another context. They are relatively sensitive to fact-checking questions.',
    ja: '直接衝突を避け、別の文脈へ逸れようとする傾向です。事実確認の質問に比較的敏感です。',
    'zh-CN': '倾向于避开直接冲突，转向其他语境。对事实确认类提问相对敏感。',
  },
  '갈등 자체를 피하려 하고 불편한 자리가 생기면 말을 줄이거나 결론부터 내리려는 경향이 있습니다.': {
    en: 'They tend to avoid conflict itself, speaking less or jumping to conclusions when the setting becomes uncomfortable.',
    ja: '葛藤そのものを避け、不快な場面になると口数を減らしたり結論から出そうとする傾向があります。',
    'zh-CN': '倾向于回避冲突本身，一旦场面不适就少说话或先下结论。',
  },
  '지적을 받으면 공격적으로 반응하며 주도권을 빼앗기지 않으려는 성향입니다.': {
    en: 'When challenged, they react aggressively and try not to lose control of the exchange.',
    ja: '指摘を受けると攻撃的に反応し、主導権を奪われまいとする傾向です。',
    'zh-CN': '受到指出时会攻击性回应，试图不失去话语主导权。',
  },
  '억울함과 상처를 앞세워 자신의 책임을 희석하려는 경향이 있습니다.': {
    en: 'They tend to foreground hurt and unfairness to dilute their own responsibility.',
    ja: '悔しさや傷つきを前面に出し、自分の責任を薄めようとする傾向があります。',
    'zh-CN': '倾向于突出委屈与受伤，以淡化自身责任。',
  },
  '감정보다 숫자, 순서, 기록을 앞세워 논리적으로 방어하려는 타입입니다.': {
    en: 'They defend with numbers, order, and records before emotion.',
    ja: '感情より数字、順序、記録を前面に出して論理的に防御するタイプです。',
    'zh-CN': '会优先用数字、顺序和记录，而非情绪来进行逻辑防御。',
  },
  '감정을 최소화하고 사실만 건조하게 말해 긴장감을 지우려는 경향이 있습니다.': {
    en: 'They minimize emotion and speak dryly in facts to drain tension from the exchange.',
    ja: '感情を最小化し、事実だけを乾いた調子で話して緊張感を消そうとする傾向があります。',
    'zh-CN': '倾向于压低情绪，只干巴巴地讲事实，以消解紧张感。',
  },
  '전체 흐름을 일찍 닫고 결론부터 요약하려는 경향이 있습니다.': {
    en: 'They tend to close the whole flow early and summarize from the conclusion first.',
    ja: '全体の流れを早めに閉じ、結論から要約しようとする傾向があります。',
    'zh-CN': '倾向于过早收束整体流程，先从结论开始概括。',
  },
  '시간과 숫자를 지나치게 정확히 말하며 사실감을 만들려는 버릇입니다.': {
    en: 'They habitually use overly precise times and numbers to create a sense of factuality.',
    ja: '時間や数字を過度に正確に述べ、事実らしさを作ろうとする癖です。',
    'zh-CN': '习惯过度精确地说时间和数字，以制造事实感。',
  },
  '불편한 지적을 농담으로 흘려 긴장을 피하려는 버릇입니다.': {
    en: 'They deflect uncomfortable points with jokes to avoid tension.',
    ja: '不快な指摘を冗談で流し、緊張を避けようとする癖です。',
    'zh-CN': '习惯用玩笑带过不舒服的指摘，以避开紧张。',
  },
  '질문을 받자마자 역질문으로 반사하거나 주제를 틀려는 습관입니다.': {
    en: 'They reflexively answer questions with counter-questions or try to turn the topic.',
    ja: '質問されるとすぐ逆質問で返したり、話題をずらそうとする習慣です。',
    'zh-CN': '一被提问就反问或试图转移话题的习惯。',
  },
  '불리한 순서를 동선과 기사로 길게 늘어 말하며 핵심을 흐리는 습관입니다.': {
    en: 'They stretch unfavorable order into routes and events, blurring the core point.',
    ja: '不利な順序を動線や出来事で長く引き延ばし、核心をぼかす習慣です。',
    'zh-CN': '习惯把不利的顺序拉长成动线和事件，从而模糊核心。',
  },
  '증거 하나를 과장해 전체 결론으로 바꾸려는 습관입니다.': {
    en: 'They exaggerate one piece of evidence into a full conclusion.',
    ja: '一つの証拠を誇張し、全体の結論へすり替えようとする習慣です。',
    'zh-CN': '习惯夸大一项证据，把它变成整体结论。',
  },
  '행동과 결과만 보고 의도까지 단정하려는 습관입니다.': {
    en: 'They infer intent from action and result alone.',
    ja: '行動と結果だけを見て意図まで断定しようとする習慣です。',
    'zh-CN': '习惯只凭行为和结果就断定意图。',
  },
  '상대 발언 중 유리한 부분만 떼어 반복 인용하는 습관입니다.': {
    en: 'They repeatedly quote only the favorable parts of the other party’s statement.',
    ja: '相手の発言のうち有利な部分だけを切り取り、繰り返し引用する習慣です。',
    'zh-CN': '习惯只截取对方发言中有利的部分反复引用。',
  },
  '영수증이나 숫자를 떼어 나열하며 맥락보다 정보량으로 압도하려는 습관입니다.': {
    en: 'They list receipts or numbers apart from context, overwhelming with information volume.',
    ja: '領収書や数字を切り出して並べ、文脈より情報量で圧倒しようとする習慣です。',
    'zh-CN': '习惯把收据或数字拆开罗列，用信息量压过语境。',
  },
  '박지연': { en: 'Jiyeon Park', ja: 'パク・ジヨン', 'zh-CN': '朴智妍' },
  '이준호': { en: 'Junho Lee', ja: 'イ・ジュノ', 'zh-CN': '李俊浩' },
  '오피스텔 경비': { en: 'Officetel Guard', ja: 'オフィステル警備員', 'zh-CN': '办公公寓保安' },
  '은행 직원': { en: 'Bank Clerk', ja: '銀行スタッフ', 'zh-CN': '银行职员' },
  '박미라': { en: 'Mira Park', ja: 'パク・ミラ', 'zh-CN': '朴美罗' },
  '윤태성': { en: 'Taeseong Yoon', ja: 'ユン・テソン', 'zh-CN': '尹泰成' },
  '윤정후': { en: 'Jeonghoo Yoon', ja: 'ユン・ジョンフ', 'zh-CN': '尹正厚' },
  '최복순': { en: 'Boksoon Choi', ja: 'チェ・ボクスン', 'zh-CN': '崔福顺' },
  '김영수': { en: 'Youngsu Kim', ja: 'キム・ヨンス', 'zh-CN': '金英秀' },
  '박순애': { en: 'Soonae Park', ja: 'パク・スンエ', 'zh-CN': '朴顺爱' },
  '송다은': { en: 'Daeun Song', ja: 'ソン・ダウン', 'zh-CN': '宋多恩' },
  '최수민': { en: 'Sumin Choi', ja: 'チェ・スミン', 'zh-CN': '崔秀敏' },
  '김세라': { en: 'Sera Kim', ja: 'キム・セラ', 'zh-CN': '金世罗' },
  '박준혁': { en: 'Junhyuk Park', ja: 'パク・ジュンヒョク', 'zh-CN': '朴俊赫' },
  '오미경': { en: 'Mikyung Oh', ja: 'オ・ミギョン', 'zh-CN': '吴美京' },
  '학원 데스크 직원': { en: 'academy desk staff', ja: '塾の受付スタッフ', 'zh-CN': '培训机构前台职员' },
  '가전매장 직원': { en: 'home appliance store employee', ja: '家電量販店スタッフ', 'zh-CN': '家电卖场员工' },
  '주방가구 공장 대표': { en: 'kitchen furniture factory representative', ja: 'キッチン家具工場代表', 'zh-CN': '厨房家具厂代表' },
  '자동차부품 가게 운영': { en: 'auto parts shop operator', ja: '自動車部品店経営', 'zh-CN': '汽车零部件店经营者' },
  '온라인 쇼핑몰 CS 직원': { en: 'online shopping mall customer support staff', ja: 'オンラインショップCSスタッフ', 'zh-CN': '网店客服人员' },
  '필라테스 강사': { en: 'Pilates instructor', ja: 'ピラティス講師', 'zh-CN': '普拉提教练' },
  '영수증 묶음 (5장)': { en: 'Receipt Bundle (5)', ja: '領収書の束（5枚）', 'zh-CN': '收据包（5张）' },
  '영수증 묶음 5장': { en: '5 Receipt Packets', ja: '領収書の束5枚', 'zh-CN': '5张收据包' },
  '블랙박스 GPS / 네비 즐겨찾기': { en: 'Black Box GPS / Navigation Favorites', ja: 'ブラックボックスGPS / ナビお気に入り', 'zh-CN': '黑匣子GPS / 导航收藏' },
  '블랙박스 GPS 기록': { en: 'Black Box GPS Recording', ja: 'ブラックボックスGPS記録', 'zh-CN': '黑匣子GPS记录' },
  '통화기록': { en: 'Call Records', ja: '通話記録', 'zh-CN': '通话记录' },
  '발신자 미상 문자': { en: 'Text from Unknown Sender', ja: '発信者不明のメッセージ', 'zh-CN': '未知发件人短信' },
  '이준호의 개인 계좌 출금 내역': { en: "Junho Lee's Personal Account Withdrawal History", ja: 'イ・ジュノの個人口座出金履歴', 'zh-CN': '李俊浩个人账户取款记录' },
  '개인 계좌 출금 내역': { en: 'Personal Account Withdrawal History', ja: '個人口座出金履歴', 'zh-CN': '个人账户取款记录' },
  '투자방 텔레그램 + 송금 기록': { en: 'Investment Chat Telegram + Transfer Records', ja: '投資チャットのTelegram + 送金記録', 'zh-CN': '投资群Telegram + 转账记录' },
  '투자방 텔레그램': { en: 'Investment Chat Telegram', ja: '投資チャットのTelegram', 'zh-CN': '投资群Telegram' },
  '공동 적금 해지 서류': { en: 'Joint Savings Cancellation Documents', ja: '共同積立解約書類', 'zh-CN': '共同储蓄解约文件' },
  '오피스텔 방문과 새벽 전화': { en: 'Officetel Visit and Early Morning Phone Call', ja: 'オフィステル訪問と未明の電話', 'zh-CN': '办公公寓访问与凌晨电话' },
  '남편 명의 계좌의 목돈 출금': { en: "Lump-sum Withdrawal from Husband's Account", ja: '夫名義口座からのまとまった出金', 'zh-CN': '丈夫名下账户的大额取款' },
  '공동 적금 2,000만원 해지 경위': { en: 'Circumstances of the 20 Million Won Joint Savings Cancellation', ja: '共同積立2,000万ウォン解約の経緯', 'zh-CN': '2,000万韩元共同储蓄解约经过' },
  '은폐와 선제행동의 순서': { en: 'Order of Concealment and Preemptive Action', ja: '隠蔽と先制行動の順序', 'zh-CN': '隐瞒与先行动作的顺序' },
  '60:40 유서 사본': { en: '60:40 Will Copy', ja: '60:40の遺書コピー', 'zh-CN': '60:40遗嘱副本' },
  '분배 비율이 적힌 서류 사본': { en: 'Copy of Document with Distribution Ratio', ja: '分配比率が記された書類コピー', 'zh-CN': '写有分配比例的文件副本' },
  '요양원 방문기록': { en: 'Nursing Home Visit Records', ja: '療養院訪問記録', 'zh-CN': '疗养院探访记录' },
  '전 요양보호사 음성증언': { en: "Former Caregiver's Voice Testimony", ja: '元介護職員の音声証言', 'zh-CN': '前护理员录音证言' },
  '공증인 메모 기록': { en: 'Notary Memo Record', ja: '公証人メモ記録', 'zh-CN': '公证人备忘记录' },
  '어머니 자필 유언장 연습본': { en: "Mother's Handwritten Will Practice Copy", ja: '母の自筆遺言書練習本', 'zh-CN': '母亲手写遗嘱练习本' },
  '오래된 계좌 흐름': { en: 'Old Account Flow', ja: '古い口座の流れ', 'zh-CN': '旧账户资金流向' },
  '어머니 일기장': { en: "Mother's Diary", ja: '母の日記帳', 'zh-CN': '母亲日记' },
  '유서 작성과 판단 능력': { en: 'Will Writing and Judgment Capacity', ja: '遺書作成と判断能力', 'zh-CN': '遗嘱撰写与判断能力' },
  '공증일 변경': { en: 'Notarization Date Change', ja: '公証日の変更', 'zh-CN': '公证日期变更' },
  '공증 유서와 별도 문서의 차이': { en: 'Difference Between Notarized Will and Separate Document', ja: '公証遺書と別文書の違い', 'zh-CN': '公证遗嘱与另行文件的差异' },
  '오래된 지원의 출처': { en: 'Source of Old Support', ja: '古い支援の出所', 'zh-CN': '旧有支持的来源' },
  '가족 기록과 침묵의 이유': { en: 'Family Records and Reason for Silence', ja: '家族記録と沈黙の理由', 'zh-CN': '家庭记录与沉默的原因' },
  '어머니의 숨겨진 마음': { en: "Mother's Hidden Feelings", ja: '母の隠された思い', 'zh-CN': '母亲隐藏的心意' },
  '최수민→예비신랑 연락 기록': { en: 'Sumin Choi → Groom-to-be Contact Record', ja: 'チェ・スミン→婚約者連絡記録', 'zh-CN': '崔秀敏→准新郎联系记录' },
  '연락 기록': { en: 'Contact Records', ja: '連絡記録', 'zh-CN': '联系记录' },
  '공통 친구 단톡방 캡처': { en: 'Mutual Friend Group Chat Capture', ja: '共通友人グループチャットのキャプチャ', 'zh-CN': '共同好友群聊截图' },
  '단톡방 캡처': { en: 'Group Chat Capture', ja: 'グループチャットのキャプチャ', 'zh-CN': '群聊截图' },
  '과거 손절 직전 카톡': { en: 'KakaoTalk Messages Just Before the Past Break', ja: '過去の絶交直前のカカオトーク', 'zh-CN': '过去断交前的KakaoTalk消息' },
  '과거 카톡': { en: 'Past KakaoTalk Messages', ja: '過去のカカオトーク', 'zh-CN': '过去的KakaoTalk消息' },
  '예비신랑의 선 넘는 메시지와 최수민의 거절 답장': { en: "Groom-to-be's Overstepping Message and Sumin Choi's Refusal", ja: '婚約者の度を越したメッセージとチェ・スミンの拒絶返信', 'zh-CN': '准新郎越界短信与崔秀敏的拒绝回复' },
  '예비신랑 메시지': { en: 'Groom-to-be Message', ja: '婚約者のメッセージ', 'zh-CN': '准新郎短信' },
  '송다은 아버지와 예비신랑의 문자': { en: "Texts Between Daeun Song's Father and the Groom-to-be", ja: 'ソン・ダウンの父と婚約者のメッセージ', 'zh-CN': '宋多恩父亲与准新郎的短信' },
  '송다은 아버지 문자': { en: "Daeun Song's Father's Text", ja: 'ソン・ダウンの父のメッセージ', 'zh-CN': '宋多恩父亲短信' },
  '과거 송금 기록과 차용증': { en: 'Past Transfer Records and IOU', ja: '過去の送金記録と借用証', 'zh-CN': '过去转账记录与借条' },
  '과거 송금 기록': { en: 'Past Transfer Records', ja: '過去の送金記録', 'zh-CN': '过去转账记录' },
  '과거·현재 대조표': { en: 'Past-Present Comparison Chart', ja: '過去・現在対照表', 'zh-CN': '过去与现在对照表' },
  '대조표': { en: 'Comparison Chart', ja: '対照表', 'zh-CN': '对照表' },
  '9일간의 연락 의도': { en: 'Intent Behind 9 Days of Contact', ja: '9日間の連絡意図', 'zh-CN': '9天联系的意图' },
  '예비신랑의 선 넘는 접근': { en: "Groom-to-be's Overstepping Approach", ja: '婚約者の度を越した接近', 'zh-CN': '准新郎的越界接近' },
  '아버지의 돈 접근 패턴': { en: "Father's Pattern of Accessing Money", ja: '父の金銭接近パターン', 'zh-CN': '父亲接近钱款的模式' },
  '과거 손절의 이유': { en: 'Reason for the Past Break', ja: '過去の絶交理由', 'zh-CN': '过去断交的原因' },
  '단톡방 매도와 명예훼손': { en: 'Group Chat Denigration and Defamation', ja: 'グループチャットでの非難と名誉毀損', 'zh-CN': '群聊贬损与名誉损害' },
  '직접적인 질문을 피하고 절차를 언급합니다': {
    en: 'They avoid direct questions and refer to procedure.',
    ja: '直接的な質問を避け、手続きに言及します。',
    'zh-CN': '会回避直接问题，转而提到程序。',
  },
  '핵심에서 벗어나 다른 이야기로 넘어가려 합니다': {
    en: 'They move away from the core issue and try to shift to another topic.',
    ja: '核心から外れ、別の話へ移ろうとします。',
    'zh-CN': '会偏离核心，试图转到其他话题。',
  },
  '짧고 날카로운 문장으로 반격합니다': {
    en: 'They counter with short, sharp sentences.',
    ja: '短く鋭い言葉で反撃します。',
    'zh-CN': '会用简短尖锐的话反击。',
  },
  '날카로운 문장으로 반격합니다': {
    en: 'They counter with sharp sentences.',
    ja: '鋭い言葉で反撃します。',
    'zh-CN': '会用尖锐的话反击。',
  },
  '질문에 질문으로 되받아칩니다': {
    en: 'They answer questions with counter-questions.',
    ja: '質問に質問で返します。',
    'zh-CN': '会用反问回应问题。',
  },
  '모든 답변을 자신의 피해로 연결합니다': {
    en: 'They connect every answer to their own harm.',
    ja: 'すべての答えを自分の被害につなげます。',
    'zh-CN': '会把所有回答都连接到自己的受害。',
  },
  '"저는요...", "저만..." 식의 표현을 반복합니다': {
    en: 'They repeat phrases like "As for me..." and "Only I..."',
    ja: '「私は……」「私だけ……」のような表現を繰り返します。',
    'zh-CN': '会反复使用“我呢……”“只有我……”这类表达。',
  },
  '숫자와 순서를 과도하게 정밀하게 나열합니다': {
    en: 'They list numbers and order with excessive precision.',
    ja: '数字や順序を過度に細かく並べます。',
    'zh-CN': '会过度精确地罗列数字和顺序。',
  },
  '"첫째, 둘째" 식으로 감정을 배제하고 논리만 씁니다': {
    en: 'They use only logic, excluding emotion with phrases like "first, second."',
    ja: '「第一に、第二に」のように感情を排し、論理だけを使います。',
    'zh-CN': '会用“第一、第二”这类方式排除情绪，只讲逻辑。',
  },
  '감정이 거의 드러나지 않는 단조로운 답변입니다': {
    en: 'Their answers are flat and show almost no emotion.',
    ja: '感情がほとんど出ない単調な回答です。',
    'zh-CN': '回答很平淡，几乎不显露情绪。',
  },
  '"네, 그렇게 했습니다" 식의 극도로 짧은 답변을 합니다': {
    en: 'They give extremely short answers like "Yes, I did."',
    ja: '「はい、そうしました」のような極端に短い回答をします。',
    'zh-CN': '会给出“是，我这么做了”这类极短回答。',
  },
  '핵심을 피하며 사소한 것으로 정리하려 합니다': {
    en: 'They avoid the core issue and try to reduce it to something minor.',
    ja: '核心を避け、些細なこととして整理しようとします。',
    'zh-CN': '会避开核心，试图把问题归结为小事。',
  },
  '"그건 큰 의미가 없고..." 라며 중요한 부분을 넘기려 합니다': {
    en: 'They try to pass over important points by saying, "That does not matter much..."',
    ja: '「それは大した意味がなく……」と言って重要な部分を流そうとします。',
    'zh-CN': '会用“那没什么重要……”来带过关键部分。',
  },
  '핵심을 피하고 절차로 비껴갑니다. 사실 추궁으로 구체성을 끌어내세요.': {
    en: 'They avoid the core issue and sidestep into procedure. Use Fact Pursuit to draw out specifics.',
    ja: '核心を避け、手続きへ逃げます。事実追及で具体性を引き出してください。',
    'zh-CN': '会避开核心并转向程序。用事实追问把具体内容拉出来。',
  },
  '방어적으로 반격합니다. 공감 접근으로 긴장을 먼저 풀어주세요.': {
    en: 'They counter defensively. Use Empathy Approach to lower tension first.',
    ja: '防御的に反撃します。共感アプローチでまず緊張を下げてください。',
    'zh-CN': '会防御性反击。先用共情接近降低紧张。',
  },
  '모든 답변을 자신의 피해로 연결합니다. 동기 탐색으로 내면을 열어보세요.': {
    en: 'They connect every answer to their own harm. Use Motive Search to probe what sits underneath.',
    ja: 'すべての答えを自分の被害につなげます。動機探索で内面を開いてください。',
    'zh-CN': '会把所有回答都连接到自己的受害。用动机探查询问背后的原因。',
  },
  '감정 없이 사실만 읊습니다. 공감 접근으로 균열을 만들어 보세요.': {
    en: 'They only recite facts without emotion. Use Empathy Approach to create a crack.',
    ja: '感情を出さず事実だけを述べます。共感アプローチでほころびを作ってください。',
    'zh-CN': '几乎不带情绪，只陈述事实。用共情接近制造破绽。',
  },
  '감정 표현이 희미합니다. 공감 접근이나 동기 탐색으로 내면을 끌어내세요.': {
    en: 'Their emotional expression is faint. Use Empathy Approach or Motive Search to reveal what is underneath.',
    ja: '感情表現が薄いです。共感アプローチや動機探索で内面を引き出してください。',
    'zh-CN': '情绪表达很淡。用共情接近或动机探查引出内心。',
  },
  '결론부터 요약합니다. 사실 추궁으로 세부에 붙들어 두세요.': {
    en: 'They summarize from the conclusion first. Use Fact Pursuit to hold onto the details.',
    ja: '結論から要約します。事実追及で細部につなぎ止めてください。',
    'zh-CN': '会先从结论开始概括。用事实追问抓住细节。',
  },
  '시간/숫자를 과하게 정확히 말합니다 — 감추고 싶은 것이 있을 수 있습니다': {
    en: 'They state times and numbers too precisely — something may be hidden.',
    ja: '時間や数字を過度に正確に述べます — 隠したいことがあるかもしれません。',
    'zh-CN': '时间和数字说得过于精确 — 可能有想隐藏的内容。',
  },
  '궁지에 몰리면 상대 행동으로 되묻습니다': {
    en: 'When cornered, they turn the question back to the other person’s actions.',
    ja: '追い詰められると、相手の行動を持ち出して問い返します。',
    'zh-CN': '被逼到角落时，会拿对方的行为反问。',
  },
  '핵심 회피를 위해 동선을 장황하게 나열합니다': {
    en: 'They list movements at length to avoid the core issue.',
    ja: '核心を避けるため、動線を長々と並べます。',
    'zh-CN': '为了回避核心，会冗长地罗列动线。',
  },
  '하나의 증거로 모든 것을 단정짓습니다': {
    en: 'They use one piece of evidence to assert everything.',
    ja: '一つの証拠ですべてを断定します。',
    'zh-CN': '会用一项证据断定一切。',
  },
  '상대 행동에서 악의를 즉시 단정합니다': {
    en: 'They immediately assume malice in the other person’s actions.',
    ja: '相手の行動からすぐ悪意を断定します。',
    'zh-CN': '会立即从对方行为中断定恶意。',
  },
  '상대 발언의 약점만 골라 반복합니다': {
    en: 'They repeat only the weak points in the other person’s statement.',
    ja: '相手の発言の弱点だけを選んで繰り返します。',
    'zh-CN': '只挑对方发言中的弱点反复强调。',
  },
  '재판관의 수첩': { en: "Judge's Notebook", ja: '裁判官の手帳', 'zh-CN': '裁判官笔记' },
  '방금 진술': { en: 'Latest Statement', ja: '直前の陳述', 'zh-CN': '刚才的陈述' },
  '닫기': { en: 'Close', ja: '閉じる', 'zh-CN': '关闭' },
  '일시 보류': { en: 'Defer', ja: '一時保留', 'zh-CN': '暂缓' },
  '확인': { en: 'Confirm', ja: '確認', 'zh-CN': '确认' },
  '비어 있음': { en: 'Empty', ja: '空', 'zh-CN': '空' },
  '기초 확인': { en: 'Basic Check', ja: '基本確認', 'zh-CN': '基础确认' },
  '조사 필요': { en: 'Investigation Required', ja: '調査が必要', 'zh-CN': '需要调查' },
  '조사 토큰 부족': { en: 'Not Enough Investigation Tokens', ja: '調査トークン不足', 'zh-CN': '调查令牌不足' },
  '증거 제시': { en: 'Evidence Presented', ja: '証拠提示', 'zh-CN': '提交证据' },
  '증거 제시는 증거 정리 단계부터 가능합니다.': {
    en: 'Evidence can be presented once the evidence organization stage begins.',
    ja: '証拠提示は証拠整理段階から可能です。',
    'zh-CN': '证据提交需从证据整理阶段开始。',
  },
  '이미 답변한 단계': { en: 'Stage Already Answered', ja: '回答済みの段階', 'zh-CN': '该阶段已答复' },
  '직접 진술 붕괴': { en: 'Direct Statement Collapse', ja: '直接陳述の崩れ', 'zh-CN': '直接陈述瓦解' },
  '균열 포착': { en: 'Fracture Detected', ja: '亀裂を確認', 'zh-CN': '发现裂痕' },
  '보류': { en: 'Held', ja: '保留', 'zh-CN': '暂缓' },
  '미확인': { en: 'Unverified', ja: '未確認', 'zh-CN': '未确认' },
  '자신감': { en: 'Confident', ja: '自信', 'zh-CN': '自信' },
  '흔들림': { en: 'Shaken', ja: '揺らぎ', 'zh-CN': '动摇' },
  '증인 심문': { en: 'Witness Examination', ja: '証人尋問', 'zh-CN': '证人询问' },
  '조합 성공': { en: 'Combination Success', ja: '組み合わせ成功', 'zh-CN': '组合成功' },
  '신뢰 접근': { en: 'Trust Approach', ja: '信頼アプローチ', 'zh-CN': '信任接近' },
  '공감 접근 결과 · 신뢰 경로 단서': {
    en: 'Empathy approach result · trust-route clue',
    ja: '共感アプローチ結果・信頼ルートの手がかり',
    'zh-CN': '共情接近结果 · 信任路径线索',
  },
  '경계가 조금씩 풀리고 있다.': {
    en: 'Their guard is slowly coming down.',
    ja: '警戒が少しずつ解けています。',
    'zh-CN': '戒备正在一点点松动。',
  },
  '이 자료는 현재 쟁점에서 확인할 범위를 좁힙니다.': {
    en: 'This material narrows what can be verified in the current dispute.',
    ja: 'この資料は現在の争点で確認すべき範囲を絞ります。',
    'zh-CN': '这份材料缩小了当前争议中需要确认的范围。',
  },
  '이 영수증은 지출 시점과 품목을 확인하게 합니다. 다른 진술과 대조하겠습니다.': {
    en: 'This receipt verifies the spending time and item details. I will compare it with other statements.',
    ja: 'この領収書は支出時点と品目を確認させます。他の陳述と照合します。',
    'zh-CN': '这张收据可确认支出时间和物品明细。我会与其他陈述对照。',
  },
  '이 통화 기록은 연락 시점과 길이를 확인하게 합니다.': {
    en: 'This call record verifies the contact timing and duration.',
    ja: 'この通話記録は連絡時点と長さを確認させます。',
    'zh-CN': '这份通话记录可确认联系时间和时长。',
  },
  '이 동선 자료는 이동 시점과 장소를 확인하게 합니다.': {
    en: 'This route material verifies the movement timing and location.',
    ja: 'この動線資料は移動時点と場所を確認させます。',
    'zh-CN': '这份动线材料可确认移动时间和地点。',
  },
  '이 방문기록은 방문 시점과 빈도를 확인하게 합니다. 다른 증언과 함께 보겠습니다.': {
    en: 'This visit record verifies visit timing and frequency. I will review it with other testimony.',
    ja: 'この訪問記録は訪問時点と頻度を確認させます。他の証言と合わせて見ます。',
    'zh-CN': '这份访问记录可确认访问时间和频率。我会结合其他证言查看。',
  },
  '이 계좌 기록은 돈의 출처와 전달 순서를 확인하게 합니다.': {
    en: 'This account record verifies the source of funds and transfer order.',
    ja: 'この口座記録は資金の出所と受け渡し順序を確認させます。',
    'zh-CN': '这份账户记录可确认资金来源和交付顺序。',
  },
  '이 메시지는 당시 대화의 맥락을 확인하게 합니다.': {
    en: 'This message verifies the context of the conversation at that time.',
    ja: 'このメッセージは当時の会話の文脈を確認させます。',
    'zh-CN': '这条消息可确认当时对话的背景。',
  },
  '이 증언은 결론보다 목격 범위를 확인하게 합니다. 다른 기록과 함께 보겠습니다.': {
    en: 'This testimony verifies the scope of what was witnessed rather than a conclusion. I will review it with other records.',
    ja: 'この証言は結論ではなく目撃範囲を確認させます。他の記録と合わせて見ます。',
    'zh-CN': '这份证言确认的是目击范围而非结论。我会结合其他记录查看。',
  },
  '이 공증인 메모는 공증 자리의 상태와 절차를 확인하게 합니다.': {
    en: 'This notary memo verifies the condition and procedure at the notarization.',
    ja: 'この公証人メモは公証時の状態と手続きを確認させます。',
    'zh-CN': '这份公证人备忘可确认公证现场状态和流程。',
  },
  '이 일기장은 가족 사정의 배경을 확인하게 합니다. 판단에는 다른 기록과의 대조가 필요합니다.': {
    en: 'This diary verifies the background of the family circumstances. Judgment requires comparison with other records.',
    ja: 'この日記帳は家族事情の背景を確認させます。判断には他の記録との照合が必要です。',
    'zh-CN': '这本日记可确认家庭情况背景。判断时需要与其他记录对照。',
  },
  '그 부분은 더 설명드리겠습니다.': {
    en: 'I will explain that part further.',
    ja: 'その部分はさらに説明します。',
    'zh-CN': '那部分我会再说明。',
  },
  '...그 부분은 더 설명드리겠습니다.': {
    en: '...I will explain that part further.',
    ja: '...その部分はさらに説明します。',
    'zh-CN': '……那部分我会再说明。',
  },
  '재판관님, 저는 아직 그 대목을 그렇게 받아들이기 어렵습니다. 제가 본 건 의심스러운 흐름뿐입니다.': {
    en: 'Your Honor, I still find it difficult to accept that point that way. What I saw was only a suspicious pattern.',
    ja: '裁判官、私はまだその点をそのようには受け入れがたいです。私が見たのは疑わしい流れだけです。',
    'zh-CN': '审判官，我现在还很难那样接受这一点。我看到的只是可疑的走向。',
  },
  '...그렇게 연결될 줄은 몰랐습니다.': {
    en: '...I did not expect it to connect like that.',
    ja: '...そこまでつながるとは思いませんでした。',
    'zh-CN': '……没想到会这样联系起来。',
  },
  '방어가 흔들린다': { en: 'The defense is shaking', ja: '防御が揺らいでいる', 'zh-CN': '防线正在动摇' },
  '도망칠 곳이 줄어든다': { en: 'They have fewer places to retreat', ja: '逃げ場が減っています', 'zh-CN': '可退让的空间正在减少' },
  '입을 열 준비가 됐다': { en: 'They are ready to speak', ja: '口を開く準備ができています', 'zh-CN': '对方已准备开口' },
  '말이 달라지기 시작했습니다. 지금 파고들면 숨기고 있던 것이 나올 수 있습니다.': {
    en: 'Their statement has begun to shift. Press now and something hidden may come out.',
    ja: '発言が変わり始めました。今踏み込めば隠していたことが出るかもしれません。',
    'zh-CN': '说法开始变化。现在深入追问，隐藏的内容可能会浮现。',
  },
  '변명이 통하지 않는다는 걸 본인도 느끼고 있습니다. 어떻게 압박하시겠습니까?': {
    en: 'They can feel their excuse no longer works. How will you apply pressure?',
    ja: '本人も弁解が通じないと感じています。どう圧力をかけますか。',
    'zh-CN': '对方也感觉借口已经站不住脚。你要如何施压？',
  },
  '더 숨기는 것보다 말하는 게 나을 수 있다고 느끼기 시작했습니다.': {
    en: 'They are starting to feel that speaking may be better than hiding more.',
    ja: 'これ以上隠すより話した方がよいかもしれないと感じ始めています。',
    'zh-CN': '对方开始觉得，与其继续隐瞒，不如说出来。',
  },
  '"그 말, 아까와 다릅니다" — 사실 추궁': {
    en: '"That differs from what you said earlier" — Fact Pursuit',
    ja: '「その発言は先ほどと違います」— 事実追及',
    'zh-CN': '“这和你刚才说的不一样” — 事实追问',
  },
  '"왜 숨기셨습니까?" — 동기 탐색': {
    en: '"Why did you hide it?" — Motive Search',
    ja: '「なぜ隠したのですか」— 動機探索',
    'zh-CN': '“你为什么隐瞒？” — 动机探索',
  },
  '"이 증거를 보십시오" — 증거 제시': {
    en: '"Look at this evidence" — Present Evidence',
    ja: '「この証拠を見てください」— 証拠提示',
    'zh-CN': '“请看这份证据” — 提交证据',
  },
  '"더 숨길 게 있습니까?" — 정면 추궁': {
    en: '"Is there anything else you are hiding?" — Direct Pressure',
    ja: '「まだ隠していることがありますか」— 正面追及',
    'zh-CN': '“还有什么要隐瞒的吗？” — 正面追问',
  },
  '"사정이 있었겠지요" — 공감 접근': {
    en: '"There must have been circumstances" — Empathy Approach',
    ja: '「事情があったのでしょう」— 共感アプローチ',
    'zh-CN': '“你应该也有苦衷吧” — 共情接近',
  },
  '다른 쟁점으로 화제 전환': {
    en: 'Shift to another dispute',
    ja: '別の争点へ話題を移す',
    'zh-CN': '转向其他争议',
  },
  '"마지막으로 묻겠습니다" — 결정적 질문': {
    en: '"I will ask one final time" — Decisive Question',
    ja: '「最後に尋ねます」— 決定的質問',
    'zh-CN': '“我最后问一次” — 决定性问题',
  },
  '"이것으로 끝내겠습니다" — 증거 제시': {
    en: '"This will settle it" — Present Evidence',
    ja: '「これで終わりにします」— 証拠提示',
    'zh-CN': '“就用这个了结” — 提交证据',
  },
  '"솔직히 말씀하시지요" — 자백 유도': {
    en: '"Please speak honestly" — Draw Confession',
    ja: '「正直に話してください」— 自白誘導',
    'zh-CN': '“请坦白说吧” — 引导坦白',
  },
  '증거를 1단계 이상 조사한 뒤 제시할 수 있습니다.': {
    en: 'Investigate the evidence at least once before presenting it.',
    ja: '証拠を1段階以上調査してから提示できます。',
    'zh-CN': '证据至少调查到第 1 阶段后才能提交。',
  },
  '증인을 다시 부르려면 조사 토큰이 필요합니다.': {
    en: 'An investigation token is required to call the witness again.',
    ja: '証人を再召喚するには調査トークンが必要です。',
    'zh-CN': '再次传唤证人需要调查令牌。',
  },
  '증거가 진술 사이의 틈을 만들었습니다. 관련 쟁점으로 이어서 압박해 보세요.': {
    en: 'The evidence opened a gap between statements. Press the related dispute next.',
    ja: '証拠が陳述の間に隙を作りました。関連争点へ続けて圧力をかけてください。',
    'zh-CN': '证据在陈述之间打开了缺口。接着向相关争议施压。',
  },
  '진술 흐름에서 확인할 지점이 생겼습니다. 추가 질문으로 맥락을 확인하세요.': {
    en: 'A point to verify has appeared in the statement flow. Use another question to confirm the context.',
    ja: '陳述の流れに確認すべき点が生じました。追加質問で文脈を確認してください。',
    'zh-CN': '陈述脉络中出现了需要确认的点。请通过追加提问确认背景。',
  },
  '직접 붕괴까지는 아니지만 기록 가치가 생겼습니다. 다른 증거나 발언과 연결해 다시 시도해 보세요.': {
    en: 'It did not collapse the statement directly, but it is now worth recording. Connect it with other evidence or statements and try again.',
    ja: '直接崩すほどではありませんが、記録する価値が生まれました。他の証拠や発言とつなげて再度試してください。',
    'zh-CN': '还不足以直接击溃陈述，但已有记录价值。请与其他证据或发言连接后再尝试。',
  },
  '상대 진술이 크게 흔들렸습니다. 지금이 다음 질문이나 이의 제기를 붙일 타이밍입니다.': {
    en: 'The opposing statement shook heavily. This is the moment to follow with another question or objection.',
    ja: '相手の陳述が大きく揺らぎました。次の質問や異議を重ねるタイミングです。',
    'zh-CN': '对方陈述已明显动摇。现在适合接上追问或异议。',
  },
  '진실 공방': { en: 'Truth Clash', ja: '真実攻防', 'zh-CN': '真相攻防' },
  '진실 파악': { en: 'Truth Progress', ja: '真相把握', 'zh-CN': '真相进度' },
  '진실 파악 5단계 도달': { en: 'Truth Progress Reached Stage 5', ja: '真相把握が5段階に到達', 'zh-CN': '真相进度达到第 5 阶段' },
  '진실파악 5단계 도달': { en: 'Truth Progress Reached Stage 5', ja: '真相把握が5段階に到達', 'zh-CN': '真相进度达到第 5 阶段' },
  '진실파악 5단계에 도달했습니다.': { en: 'Truth progress reached Stage 5.', ja: '真相把握が5段階に到達しました。', 'zh-CN': '真相进度已达到第 5 阶段。' },
  '진실파악 5단계에 도달했다': { en: 'Truth progress reached Stage 5', ja: '真相把握が5段階に到達', 'zh-CN': '真相进度达到第 5 阶段' },
  '자백 단계': { en: 'Confession Stage', ja: '自白段階', 'zh-CN': '坦白阶段' },
  '방어적 태도를 보이기 시작했다': { en: 'A defensive posture has begun to show', ja: '防御的な態度が見え始めました', 'zh-CN': '开始表现出防御态度' },
  '답변에 변화가 감지된다': { en: 'A change is detected in the answer', ja: '回答の変化を検知', 'zh-CN': '检测到回答变化' },
  '감정이 동요하고 있다': { en: 'Emotion is becoming unsettled', ja: '感情が揺らいでいます', 'zh-CN': '情绪正在动摇' },
  '심리적 압박이 커지고 있다': { en: 'Psychological pressure is rising', ja: '心理的圧迫が高まっています', 'zh-CN': '心理压力正在增加' },
  '진실 공방이 열렸다. 양측 주장을 비교해 판결을 내려야 한다.': {
    en: 'A truth clash has opened. Compare both claims before rendering judgment.',
    ja: '真実攻防が開かれました。双方の主張を比較して判決を下す必要があります。',
    'zh-CN': '真相攻防已开启。需要比较双方主张后作出判断。',
  },
  '판단 충돌': { en: 'Judgment Conflict', ja: '判断の衝突', 'zh-CN': '判断冲突' },
  '기존 판단과 새 정보가 충돌하고 있다.': {
    en: 'The current judgment conflicts with new information.',
    ja: '既存の判断と新情報が衝突しています。',
    'zh-CN': '既有判断与新信息发生冲突。',
  },
  '기존 판단': { en: 'Current Judgment', ja: '既存判断', 'zh-CN': '既有判断' },
  '기존 판단 · 양측 일부 사실': {
    en: 'Current Judgment · Both Sides Partly True',
    ja: '既存判断 · 双方とも一部事実',
    'zh-CN': '既有判断 · 双方部分属实',
  },
  '양측 주장에 각자 맞는 부분과 과장이 섞여 있다고 보았습니다.': {
    en: 'The judgment found that both claims contain valid parts and exaggerations.',
    ja: '双方の主張には、それぞれ正しい部分と誇張が混在していると判断しました。',
    'zh-CN': '判断认为双方主张中各自包含属实部分与夸张。',
  },
  '기존 판단 · 보류': {
    en: 'Current Judgment · Deferred',
    ja: '既存判断 · 保留',
    'zh-CN': '既有判断 · 保留',
  },
  '추가 자료가 더 필요하다고 보았습니다.': {
    en: 'The judgment found that more material is needed.',
    ja: '追加資料がさらに必要だと判断しました。',
    'zh-CN': '判断认为仍需要更多资料。',
  },
  '새 쟁점 발견': { en: 'New Dispute Found', ja: '新しい争点を発見', 'zh-CN': '发现新争议' },
  '새로운 쟁점 발견': { en: 'New Dispute Found', ja: '新しい争点を発見', 'zh-CN': '发现新争议' },
  '새 쟁점': { en: 'New Dispute', ja: '新しい争点', 'zh-CN': '新争议' },
  '증거로 새 쟁점이 드러났습니다.': {
    en: 'The evidence revealed a new dispute.',
    ja: '証拠によって新しい争点が明らかになりました。',
    'zh-CN': '证据揭示了新的争议。',
  },
  '진실 공방에서 새 쟁점이 튀어나왔습니다.': {
    en: 'A new dispute surfaced during the truth clash.',
    ja: '真実攻防の中で新しい争点が浮上しました。',
    'zh-CN': '真相攻防中浮现了新的争议。',
  },
  '증인 진술이 다른 갈래를 열었습니다.': {
    en: 'The witness testimony opened another branch.',
    ja: '証人の陳述が別の分岐を開きました。',
    'zh-CN': '证人陈述打开了另一条线索。',
  },
  '거짓 붕괴로 숨은 쟁점이 드러났습니다.': {
    en: 'A hidden dispute surfaced through the lie collapse.',
    ja: '嘘の崩壊により隠れた争点が明らかになりました。',
    'zh-CN': '谎言瓦解后，隐藏争议浮现。',
  },
  '감정 반응에서 확인할 단서가 생겼습니다.': {
    en: 'The emotional reaction created a clue to verify.',
    ja: '感情反応から確認すべき手がかりが生じました。',
    'zh-CN': '情绪反应中出现了需要确认的线索。',
  },
  '끼어든 발언이 새 쟁점을 열었습니다.': {
    en: 'The interjection opened a new dispute.',
    ja: '割り込んだ発言が新しい争点を開きました。',
    'zh-CN': '插话开启了新的争议。',
  },
  '새 단서가 갈래를 바꿨습니다.': {
    en: 'A new clue changed the branch.',
    ja: '新しい手がかりが分岐を変えました。',
    'zh-CN': '新线索改变了分支。',
  },
  '확인해야 할 범위가 넓어졌습니다': {
    en: 'The scope requiring verification has widened.',
    ja: '確認すべき範囲が広がりました。',
    'zh-CN': '需要确认的范围扩大了。',
  },
  '아직 결론이 아닙니다. 관련 기록과 진술을 더 확인해 쟁점으로 다룰지 판단하십시오.': {
    en: 'This is not yet a conclusion. Review related records and statements before deciding whether to treat it as a dispute.',
    ja: 'まだ結論ではありません。関連記録と陳述をさらに確認し、争点として扱うか判断してください。',
    'zh-CN': '这还不是结论。请继续确认相关记录和陈述，再判断是否作为争议处理。',
  },
  '쟁점 보드 갱신': { en: 'Dispute Board Updated', ja: '争点ボード更新', 'zh-CN': '争议面板已更新' },
  '쟁점 보드 + 재판관 수첩': { en: 'Dispute Board + Judge Notebook', ja: '争点ボード + 裁判官の手帳', 'zh-CN': '争议面板 + 裁判官笔记' },
  '검토 축': { en: 'Review Axis', ja: '検討軸', 'zh-CN': '审查轴' },
  '확인 방향': { en: 'Verification Direction', ja: '確認方針', 'zh-CN': '确认方向' },
  '절차 책임': { en: 'Procedural Responsibility', ja: '手続責任', 'zh-CN': '程序责任' },
  '판단 상태': { en: 'Judgment Status', ja: '判断状態', 'zh-CN': '判断状态' },
  '단서 접근': { en: 'Clue Access', ja: '手がかりへの接近', 'zh-CN': '线索接近' },
  '모순 단서': { en: 'Contradiction Clue', ja: '矛盾の手がかり', 'zh-CN': '矛盾线索' },
  '새 증인 추가': { en: 'New Witness Added', ja: '新しい証人を追加', 'zh-CN': '新增证人' },
  '쟁점 추가': { en: 'Dispute Added', ja: '争点を追加', 'zh-CN': '新增争议' },
  '결정적 질문 해금': { en: 'Decisive Question Unlocked', ja: '決定的質問を解放', 'zh-CN': '解锁决定性问题' },
  '질문 경로 추가': { en: 'Question Route Added', ja: '質問ルートを追加', 'zh-CN': '新增问题路径' },
  '판결 힌트 추가': { en: 'Verdict Hint Added', ja: '判決ヒントを追加', 'zh-CN': '新增判决提示' },
  '단서 기록 추가': { en: 'Clue Record Added', ja: '手がかり記録を追加', 'zh-CN': '新增线索记录' },
  '진술 기록 추가': { en: 'Statement Record Added', ja: '陳述記録を追加', 'zh-CN': '新增陈述记录' },
  '양측 진술과 새로 나온 단서를 대조해 사실관계를 확정합니다.': {
    en: 'Compare both statements with the new clue to establish the facts.',
    ja: '双方の陳述と新たに出た手がかりを照合して事実関係を確定します。',
    'zh-CN': '将双方陈述与新出现的线索对照，以确认事实关系。',
  },
  '절차상 책임이나 위법성도 별도 판단해야 합니다.': {
    en: 'Procedural responsibility or illegality must also be judged separately.',
    ja: '手続上の責任や違法性も別途判断する必要があります。',
    'zh-CN': '程序责任或违法性也需要另行判断。',
  },
  '현재 단계에서는 결론이 아니라 검토 범위만 추가됩니다.': {
    en: 'At this stage, only the review scope is added; this is not a conclusion.',
    ja: '現段階では結論ではなく、検討範囲だけが追加されます。',
    'zh-CN': '当前阶段只增加审查范围，并非结论。',
  },
  '높음': { en: 'High', ja: '高', 'zh-CN': '高' },
  '보통': { en: 'Medium', ja: '中', 'zh-CN': '中' },
  '낮음': { en: 'Low', ja: '低', 'zh-CN': '低' },
  '정리': { en: 'Summary', ja: '整理', 'zh-CN': '整理' },
  '설명': { en: 'Explanation', ja: '説明', 'zh-CN': '说明' },
  '힌트': { en: 'Hint', ja: 'ヒント', 'zh-CN': '提示' },
  '구분': { en: 'Distinction', ja: '区別', 'zh-CN': '区分' },
  '주의': { en: 'Caution', ja: '注意', 'zh-CN': '注意' },
  '필요': { en: 'Needed', ja: '必要', 'zh-CN': '需要' },
  '모호': { en: 'Ambiguous', ja: '曖昧', 'zh-CN': '模糊' },
  '부분': { en: 'Partial', ja: '部分', 'zh-CN': '部分' },
  '핵심': { en: 'Core', ja: '核心', 'zh-CN': '核心' },
  '또는': { en: 'or', ja: 'または', 'zh-CN': '或' },
  '중요도': { en: 'Importance', ja: '重要度', 'zh-CN': '重要度' },
  '모호성': { en: 'Ambiguity', ja: '曖昧さ', 'zh-CN': '模糊度' },
  '필요 증거': { en: 'Required Evidence', ja: '必要証拠', 'zh-CN': '所需证据' },
  '새 충돌 정보': { en: 'New Conflicting Information', ja: '新しい衝突情報', 'zh-CN': '新的冲突信息' },
  '현재 판단 유지': { en: 'Keep Current Judgment', ja: '現在の判断を維持', 'zh-CN': '维持当前判断' },
  '새 정보 기준으로 수정': { en: 'Revise Based on New Information', ja: '新情報を基準に修正', 'zh-CN': '按新信息修正' },
  '확인했습니다': { en: 'Confirmed', ja: '確認しました', 'zh-CN': '已确认' },
  '양쪽 모두 침묵': { en: 'Both sides fall silent', ja: '双方とも沈黙', 'zh-CN': '双方都陷入沉默' },
  '중대한 사실이 드러났습니다': { en: 'A critical fact has been revealed.', ja: '重大な事実が明らかになりました。', 'zh-CN': '重大事实已经显现。' },
  '사건의 전모가 드러나고 있습니다': { en: 'The full outline of the case is emerging.', ja: '事件の全貌が明らかになりつつあります。', 'zh-CN': '案件全貌正在浮现。' },
  '감정 실수 포착': { en: 'Emotional Slip Detected', ja: '感情のほころびを確認', 'zh-CN': '捕捉到情绪失误' },
  '지금은 넘긴다': { en: 'Skip for Now', ja: '今は見送る', 'zh-CN': '暂时跳过' },
  '잠시 보류': { en: 'Defer for Now', ja: 'いったん保留', 'zh-CN': '暂时保留' },
  '관찰에 기록': { en: 'Record in Observations', ja: '観察に記録', 'zh-CN': '记录到观察' },
  '모순 추궁 결과': { en: 'Contradiction Pursuit Result', ja: '矛盾追及の結果', 'zh-CN': '矛盾追问结果' },
  '모순 추궁이 통했습니다': { en: 'Contradiction pursuit worked', ja: '矛盾追及が効きました', 'zh-CN': '矛盾追问奏效' },
  '증거를 제시할': { en: 'presenting evidence', ja: '証拠提示', 'zh-CN': '提交证据' },
  '상대에게': { en: 'to the other party', ja: '相手に', 'zh-CN': '向对方' },
  '상대를': { en: 'the other party', ja: '相手を', 'zh-CN': '对方' },
  '이전 진술': { en: 'Previous Statement', ja: '以前の陳述', 'zh-CN': '此前陈述' },
  '지금 진술': { en: 'Current Statement', ja: '現在の陳述', 'zh-CN': '当前陈述' },
  '이전 발언 A': { en: 'Previous Statement A', ja: '以前の発言A', 'zh-CN': '先前发言A' },
  '현재 발언 B': { en: 'Current Statement B', ja: '現在の発言B', 'zh-CN': '当前发言B' },
  '이전 진술과 지금 진술이 어긋난다. 모순을 찌를 기회다.': {
    en: 'The previous and current statements do not align. This is a chance to press the contradiction.',
    ja: '以前の陳述と現在の陳述が食い違っています。矛盾を突く機会です。',
    'zh-CN': '此前陈述与当前陈述不一致。这是追问矛盾的机会。',
  },
  '이전 진술과 현재 진술 사이에서 모순이 감지되었습니다. 모순을 누적하면 거짓 상태가 흔들리고, 새로운 진술이나 단서가 열릴 수 있습니다.': {
    en: 'A contradiction was detected between the previous and current statements. Accumulating contradictions can shake the lie state and unlock new statements or clues.',
    ja: '以前の陳述と現在の陳述の間に矛盾が検出されました。矛盾を重ねると虚偽状態が揺らぎ、新しい陳述や手がかりが開くことがあります。',
    'zh-CN': '检测到先前陈述与当前陈述之间存在矛盾。累积矛盾可能动摇谎言状态，并开启新的陈述或线索。',
  },
  '진술이 엇갈렸다': { en: 'Statements diverged', ja: '陳述が食い違いました', 'zh-CN': '陈述出现分歧' },
  '진술이 엇갈리기 시작했다. 지금 압박하면 효과적이다.': {
    en: 'The statements have begun to diverge. Pressing now will be effective.',
    ja: '陳述が食い違い始めました。今圧力をかけると効果的です。',
    'zh-CN': '陈述开始出现分歧。现在施压会有效。',
  },
  '모순 발견': { en: 'Contradiction Found', ja: '矛盾を発見', 'zh-CN': '发现矛盾' },
  '왜 어긋나는지': { en: 'Why It Diverges', ja: '食い違う理由', 'zh-CN': '为何不一致' },
  '모순을 찌른다': { en: 'Press the Contradiction', ja: '矛盾を突く', 'zh-CN': '追问矛盾' },
  '추궁하기': { en: 'Press', ja: '追及する', 'zh-CN': '追问' },
  '추궁 완료': { en: 'Pressed', ja: '追及完了', 'zh-CN': '追问完成' },
  '추궁 결과 반응이 크게 흔들렸습니다': {
    en: 'The pursuit shook the response significantly.',
    ja: '追及の結果、反応が大きく揺らぎました。',
    'zh-CN': '追问结果使反应明显动摇。',
  },
  '말씀이 조금씩 달라지고 있습니다': {
    en: 'Your statement is gradually changing.',
    ja: '発言が少しずつ変わっています。',
    'zh-CN': '你的说法正在一点点改变。',
  },
  '처음과 다르게 흔들리는 모습입니다': {
    en: 'You are wavering differently from your initial position.',
    ja: '最初とは違う揺らぎが見えます。',
    'zh-CN': '你表现出的动摇已经不同于最初。',
  },
  '상당히 다른 이야기를 하고 계십니다': {
    en: 'You are now saying something substantially different.',
    ja: 'かなり異なる話をしています。',
    'zh-CN': '你现在说的内容已经相当不同。',
  },
  '처음 입장을 완전히 바꾸셨습니다': {
    en: 'You have completely changed your initial position.',
    ja: '最初の立場を完全に変えました。',
    'zh-CN': '你已经完全改变了最初的立场。',
  },
  '처음 하신 말씀과 지금이 다릅니다': {
    en: 'What you said at first differs from what you are saying now.',
    ja: '最初の発言と今の発言が異なります。',
    'zh-CN': '你最初说的话和现在不同。',
  },
  '격앙 진입: 다음 2턴 동안 질문 차단': {
    en: 'Agitation entered: questions blocked for the next 2 turns',
    ja: '激昂に突入：次の2ターンは質問不可',
    'zh-CN': '进入激动状态：接下来 2 回合禁止提问',
  },
  '그 부분은 이미 말씀드린 그대로입니다. 더 보탤 말은 없네요.': {
    en: 'That part is exactly as I already said. I have nothing more to add.',
    ja: 'その部分はすでに申し上げたとおりです。これ以上付け加えることはありません。',
    'zh-CN': '那部分就像我之前说过的那样。我没有更多要补充的。',
  },
  '…더 드릴 말씀이 없습니다.': {
    en: '...I have nothing more to say.',
    ja: '……これ以上お話しすることはありません。',
    'zh-CN': '……我没有更多要说的了。',
  },
  '이미 다 얘기했습니다. 같은 말 반복하고 싶지 않습니다.': {
    en: 'I have already said everything. I do not want to repeat the same thing.',
    ja: 'もう全部話しました。同じことを繰り返したくありません。',
    'zh-CN': '我已经都说过了。不想重复同样的话。',
  },
  '…전에 말씀드린 그대로입니다.': {
    en: '...It is as I said before.',
    ja: '……前にお話しした通りです。',
    'zh-CN': '……和我之前说的一样。',
  },
  '그 부분은 이미 말씀드린 그대로입니다.': {
    en: 'That part is exactly as I already stated.',
    ja: 'その部分はすでにお話しした通りです。',
    'zh-CN': '那部分就像我已经说过的一样。',
  },
  '…더 보탤 말이 없습니다.': {
    en: '...I have nothing to add.',
    ja: '……付け加えることはありません。',
    'zh-CN': '……没有更多补充。',
  },
  '그 부분은 이미 말씀드린 그대로입니다. 더 드릴 말씀이 없습니다.': {
    en: 'That part is exactly as I already said. I have nothing more to add.',
    ja: 'その部分はすでに申し上げたとおりです。これ以上お話しすることはありません。',
    'zh-CN': '那部分就像我之前说过的那样。我没有更多要补充的。',
  },
  '핵심 사실을 구체적으로 인정한다.': {
    en: 'Admits the core fact specifically.',
    ja: '核心事実を具体的に認める。',
    'zh-CN': '具体承认核心事实。',
  },
  '숨긴 책임을 인정한다.': {
    en: 'Acknowledges responsibility for hiding it.',
    ja: '隠した責任を認める。',
    'zh-CN': '承认隐瞒的责任。',
  },
  '이미 인정한 핵심 사실을 다시 정리한다.': {
    en: 'Restates the core fact already admitted.',
    ja: 'すでに認めた核心事実を整理し直す。',
    'zh-CN': '重新整理已经承认的核心事实。',
  },
  '이미 자백한 사항이라 더 보탤 말이 없는 듯하다.': {
    en: 'Seems to have nothing to add because it was already confessed.',
    ja: 'すでに自白した事項であり、これ以上付け加えることはない様子。',
    'zh-CN': '因已坦白，似乎没有更多补充。',
  },
  '지금은 그 부분을 바로 정리하기 어렵습니다. 질문의 범위를 좁혀 주십시오.': {
    en: 'It is difficult to organize that point directly right now. Please narrow the scope of the question.',
    ja: '今その部分をすぐ整理するのは困難です。質問の範囲を絞ってください。',
    'zh-CN': '现在很难直接整理那部分。请缩小问题范围。',
  },
  '별 의미 없는 연락': { en: 'insignificant contact', ja: '特に意味のない連絡', 'zh-CN': '没有特别意义的联系' },
  '별 의미 없는': { en: 'insignificant', ja: '特に意味のない', 'zh-CN': '没有特别意义的' },
  '단순한 연락': { en: 'simple contact', ja: '単なる連絡', 'zh-CN': '单纯联系' },
  '관계없는 일': { en: 'unrelated matter', ja: '関係のないこと', 'zh-CN': '无关事项' },
  '관계없는': { en: 'unrelated', ja: '関係のない', 'zh-CN': '无关的' },
  '관계없': { en: 'unrelated', ja: '関係なし', 'zh-CN': '无关' },
  '오해입니다': { en: 'It is a misunderstanding.', ja: '誤解です。', 'zh-CN': '这是误会。' },
  '그게 다입니다': { en: 'That is all.', ja: 'それがすべてです。', 'zh-CN': '仅此而已。' },
  '그 정도입니다': { en: 'That is the extent of it.', ja: 'その程度です。', 'zh-CN': '也就这样。' },
  '기억나지 않습니다': { en: 'I do not remember.', ja: '覚えていません。', 'zh-CN': '我不记得。' },
  '모릅니다': { en: 'I do not know.', ja: '分かりません。', 'zh-CN': '我不知道。' },
  '아닙니다': { en: 'No.', ja: '違います。', 'zh-CN': '不是。' },
  '관계 없습니다': { en: 'It is unrelated.', ja: '関係ありません。', 'zh-CN': '没有关系。' },
  '상관 없습니다': { en: 'It has nothing to do with it.', ja: '関係ありません。', 'zh-CN': '没有关系。' },
  '지금은 보류 (나중에 다시 판단)': { en: 'Defer for now (decide later)', ja: '今は保留（後で再判断）', 'zh-CN': '暂时保留（稍后再判断）' },
  '완강히 부정': { en: 'Firm Denial', ja: '強い否認', 'zh-CN': '坚决否认' },
  '동요 중': { en: 'Unsettled', ja: '動揺中', 'zh-CN': '动摇中' },
  '일부 인정': { en: 'Partial Admission', ja: '一部認め', 'zh-CN': '部分承认' },
  '책임 전가': { en: 'Blame Shift', ja: '責任転嫁', 'zh-CN': '责任转嫁' },
  '감정 호소': { en: 'Emotional Appeal', ja: '感情への訴え', 'zh-CN': '情感诉求' },
  '인정': { en: 'Admission', ja: '認め', 'zh-CN': '承认' },
  '추궁 결과': { en: 'Pursuit Result', ja: '追及結果', 'zh-CN': '追问结果' },
  '모순이 쌓이고 있다. 조금 더 추궁하면 균열이 생길 것 같다.': {
    en: 'Contradictions are accumulating. Pressing a little further may create a crack.',
    ja: '矛盾が積み重なっています。もう少し追及すれば亀裂が生まれそうです。',
    'zh-CN': '矛盾正在累积。再追问一点可能会出现裂痕。',
  },
  '법정 장악이 부족합니다.': { en: 'Court control is insufficient.', ja: '法廷掌握力が不足しています。', 'zh-CN': '法庭掌控力不足。' },
  '기록 재정리': { en: 'Review Records', ja: '記録の再整理', 'zh-CN': '重新整理记录' },
  '법정 장악 1을 써서 기록을 다시 훑고 조사 토큰 1을 회복했습니다.': {
    en: 'Spent 1 Court Control to review the record and recovered 1 Investigation Token.',
    ja: '法廷掌握力を1消費して記録を見直し、調査トークンを1回復しました。',
    'zh-CN': '消耗 1 点法庭掌控力重新查看记录，并恢复 1 个调查令牌。',
  },
  '법정 장악이 부족해 기록 재정리를 진행할 수 없습니다.': {
    en: 'Not enough Court Control to review the records.',
    ja: '法廷掌握力が不足しているため、記録の再整理を実行できません。',
    'zh-CN': '法庭掌控力不足，无法重新整理记录。',
  },
  '쟁점 압축': { en: 'Compress Disputes', ja: '争点の圧縮', 'zh-CN': '压缩争议点' },
  '조사 토큰 1을 써서 쟁점을 압축하고 스킬 포인트 1을 회복했습니다.': {
    en: 'Spent 1 Investigation Token to compress disputes and recovered 1 Skill Point.',
    ja: '調査トークンを1消費して争点を圧縮し、スキルポイントを1回復しました。',
    'zh-CN': '消耗 1 个调查令牌压缩争议点，并恢复 1 个技能点。',
  },
  '조사 토큰이 부족해 쟁점 압축을 진행할 수 없습니다.': {
    en: 'Not enough Investigation Tokens to compress disputes.',
    ja: '調査トークンが不足しているため、争点の圧縮を実行できません。',
    'zh-CN': '调查令牌不足，无法压缩争议点。',
  },
  '정숙 선언': { en: 'Call for Order', ja: '静粛宣言', 'zh-CN': '宣布肃静' },
  '스킬 포인트 2를 써서 절차를 정리하고 법정 장악 1을 회복했습니다.': {
    en: 'Spent 2 Skill Points to restore order and recovered 1 Court Control.',
    ja: 'スキルポイントを2消費して手続きを整え、法廷掌握力を1回復しました。',
    'zh-CN': '消耗 2 个技能点整顿程序，并恢复 1 点法庭掌控力。',
  },
  '스킬 포인트가 부족해 정숙 선언을 진행할 수 없습니다.': {
    en: 'Not enough Skill Points to call for order.',
    ja: 'スキルポイントが不足しているため、静粛宣言を実行できません。',
    'zh-CN': '技能点不足，无法宣布肃静。',
  },
  '[분리] 분리 심문 시작 — 3턴간 상대측이 배제됩니다.': {
    en: '[Separate] Separate examination begins — the other side is excluded for 3 turns.',
    ja: '【分離】分離尋問を開始 — 3ターンの間、相手側は除外されます。',
    'zh-CN': '【分离】分离询问开始 — 对方将在 3 回合内被排除。',
  },
  '[분리] 분리 심문 종료 — 상대측이 복귀합니다.': {
    en: '[Separate] Separate examination ended — the other side returns.',
    ja: '【分離】分離尋問終了 — 相手側が戻ります。',
    'zh-CN': '【分离】分离询问结束 — 对方返回。',
  },
  '[비공개] 비공개 심문 — 이 답변은 상대에게 공개되지 않는다.': {
    en: '[Private] Private examination — this answer is not disclosed to the other side.',
    ja: '【非公開】非公開尋問 — この回答は相手に公開されません。',
    'zh-CN': '【保密】保密询问 — 此回答不会向对方公开。',
  },
  '증인 증언 생성에 실패했다.': { en: 'Witness testimony generation failed.', ja: '証人証言の生成に失敗しました。', 'zh-CN': '证人证言生成失败。' },
  '증인 증언 생성에 실패했습니다. 토큰이 반환되었습니다.': {
    en: 'Witness testimony generation failed. The token has been returned.',
    ja: '証人証言の生成に失敗しました。トークンは返還されました。',
    'zh-CN': '证人证言生成失败。令牌已返还。',
  },
  '증언의 일부가 기억에 의존하고 있다. 다른 증거와 대조해볼 필요가 있다.': {
    en: 'Part of the testimony relies on memory. It should be checked against other evidence.',
    ja: '証言の一部は記憶に依存しています。他の証拠と照合する必要があります。',
    'zh-CN': '部分证言依赖记忆。需要与其他证据对照。',
  },
  '증인 증언으로 새로운 단서가 확인되었습니다. 증거 게시판을 확인해 보십시오.': {
    en: 'A new clue was confirmed through witness testimony. Check the evidence board.',
    ja: '証人証言によって新しい手がかりが確認されました。証拠ボードを確認してください。',
    'zh-CN': '通过证人证言确认了新线索。请查看证据面板。',
  },
  '💡 증인 증언으로 새로운 단서가 확인되었습니다. 증거 게시판을 확인해 보십시오.': {
    en: '💡 A new clue was confirmed through witness testimony. Check the evidence board.',
    ja: '💡 証人証言によって新しい手がかりが確認されました。証拠ボードを確認してください。',
    'zh-CN': '💡 通过证人证言确认了新线索。请查看证据面板。',
  },
  '💭 증언의 일부가 기억에 의존하고 있다. 다른 증거와 대조해볼 필요가 있다.': {
    en: '💭 Part of the testimony relies on memory. It should be checked against other evidence.',
    ja: '💭 証言の一部は記憶に依存しています。他の証拠と照合する必要があります。',
    'zh-CN': '💭 部分证言依赖记忆。需要与其他证据对照。',
  },
  '핵심 증언이 포착됐다.': { en: 'Key testimony was captured.', ja: '重要証言を捉えました。', 'zh-CN': '捕捉到关键证言。' },
  '핵심 증언 포착': { en: 'Key Testimony Captured', ja: '重要証言を捕捉', 'zh-CN': '捕捉到关键证言' },
  '핵심 증언을 보류 기록으로 남겼다.': {
    en: 'The key testimony was left as a deferred record.',
    ja: '重要証言を保留記録として残しました。',
    'zh-CN': '关键证言已作为保留记录留下。',
  },
  '기록만 한다': { en: 'Record Only', ja: '記録だけする', 'zh-CN': '仅记录' },
  '당사자에게 확인': { en: 'Confirm with Party', ja: '当事者に確認', 'zh-CN': '向当事人确认' },
  '증인 진술과 당사자 반응이 맞물려 진실이 확정됐다.': {
    en: 'The witness statement and party reaction aligned, confirming the truth.',
    ja: '証人陳述と当事者の反応がかみ合い、真実が確定しました。',
    'zh-CN': '证人陈述与当事人反应相互印证，真相已确认。',
  },
  '증언은 확보됐지만 진실 확정은 보류됐다.': {
    en: 'The testimony was secured, but truth confirmation was deferred.',
    ja: '証言は確保されましたが、真実の確定は保留されました。',
    'zh-CN': '证言已取得，但真相确认暂时保留。',
  },
  '당사자의 감정/신뢰 경로가 아직 열리지 않았습니다.': {
    en: "The party's emotion/trust route has not opened yet.",
    ja: '当事者の感情/信頼ルートがまだ開いていません。',
    'zh-CN': '当事人的情绪/信任路径尚未开启。',
  },
  '이 쟁점을 받칠 추가 증거 또는 증언이 더 필요합니다.': {
    en: 'More evidence or testimony is needed to support this dispute.',
    ja: 'この争点を支える追加証拠または証言がさらに必要です。',
    'zh-CN': '还需要更多证据或证言支撑该争议。',
  },
  '증인 진술로 숨겨진 쟁점이 드러났습니다.': {
    en: 'A hidden dispute was revealed through witness testimony.',
    ja: '証人陳述によって隠れていた争点が明らかになりました。',
    'zh-CN': '通过证人陈述揭示了隐藏争议。',
  },
  '💡 새로운 쟁점이 발견되었습니다.': {
    en: '💡 A new dispute was discovered.',
    ja: '💡 新しい争点が見つかりました。',
    'zh-CN': '💡 发现了新的争议。',
  },
  '발언에서 파생된 새 증거가 좌측 증거 목록에 추가되었습니다.': {
    en: 'New evidence derived from the statement has been added to the evidence notebook.',
    ja: '発言から派生した新証拠が証拠ノートに追加されました。',
    'zh-CN': '由发言衍生的新证据已加入证据笔记。',
  },
  '숨기던 말이 새고 있습니다.': {
    en: 'A hidden statement is leaking out.',
    ja: '隠していた言葉が漏れています。',
    'zh-CN': '隐藏的话正在漏出。',
  },
  '비공개 확인 경로가 열렸습니다 — 공감 접근으로 자백을 이끌어낼 수 있습니다': {
    en: 'A private confirmation route has opened — Empathy Approach can draw out a confession.',
    ja: '非公開確認ルートが開きました — 共感アプローチで自白を引き出せます。',
    'zh-CN': '保密确认路径已开启 — 可用共情接近引导坦白。',
  },
  '동기 탐색 결과 · 쟁점으로 이어질 수 있는 단서': {
    en: 'Motive Search Result · Clue that may lead to a dispute',
    ja: '動機探索結果 · 争点につながる可能性のある手がかり',
    'zh-CN': '动机探索结果 · 可能通向争议的线索',
  },
  '지금 거래 내역을 언급하셨습니다. 해당 금융 기록을 확인하겠습니다.': {
    en: 'You just mentioned the transaction history. I will verify the financial record.',
    ja: '今、取引履歴に言及しました。その金融記録を確認します。',
    'zh-CN': '你刚才提到了交易记录。我会核查相应的金融记录。',
  },
  '메시지 기록이 있다고 하셨습니다. 해당 대화 내용을 확보하겠습니다.': {
    en: 'You said message records exist. I will secure that conversation.',
    ja: 'メッセージ記録があると述べました。その会話内容を確保します。',
    'zh-CN': '你说存在消息记录。我会取得相应的对话内容。',
  },
  '그 장소에 있었다고 인정하셨습니다. 영상 기록을 확인하겠습니다.': {
    en: 'You admitted you were at that location. I will verify the video record.',
    ja: 'その場所にいたことを認めました。映像記録を確認します。',
    'zh-CN': '你承认曾在那个地点。我会核查视频记录。',
  },
  '약속이 있었다고 하셨습니다. 관련 문서를 확인하겠습니다.': {
    en: 'You said there was an agreement. I will verify the related document.',
    ja: '約束があったと述べました。関連文書を確認します。',
    'zh-CN': '你说存在约定。我会核查相关文件。',
  },
  '제3자가 있었다고 하셨습니다. 해당 인물의 증언을 확보하겠습니다.': {
    en: 'You said a third party was present. I will secure that person’s testimony.',
    ja: '第三者がいたと述べました。その人物の証言を確保します。',
    'zh-CN': '你说有第三人在场。我会取得该人的证言。',
  },
  '기록이 존재한다고 하셨습니다. 해당 로그를 확인하겠습니다.': {
    en: 'You said a record exists. I will verify that log.',
    ja: '記録が存在すると述べました。そのログを確認します。',
    'zh-CN': '你说记录存在。我会核查相应日志。',
  },
  '기기를 사용한 사실을 인정하셨습니다. 해당 데이터를 확보하겠습니다.': {
    en: 'You admitted using the device. I will secure that data.',
    ja: '機器を使用した事実を認めました。そのデータを確保します。',
    'zh-CN': '你承认使用过设备。我会取得相应数据。',
  },
  '온라인 게시 사실을 인정하셨습니다. 해당 게시물을 확인하겠습니다.': {
    en: 'You admitted posting it online. I will verify that post.',
    ja: 'オンラインに投稿した事実を認めました。その投稿を確認します。',
    'zh-CN': '你承认曾在网上发布。我会核查相应帖子。',
  },
  '지금 하신 말씀에서 단서가 포착됐습니다. 관련 자료를 확인하겠습니다.': {
    en: 'A clue was detected in what you just said. I will verify the related material.',
    ja: '今の発言から手がかりを捉えました。関連資料を確認します。',
    'zh-CN': '从你刚才的话中捕捉到线索。我会核查相关材料。',
  },
  '새 확인 쟁점': { en: 'New Verification Dispute', ja: '新しい確認争点', 'zh-CN': '新的核查争议' },
  '새로운 단서가 기존 설명과 맞물립니다. 확인해야 할 범위만 추가되었습니다.': {
    en: 'A new clue connects with the existing explanation. Only the scope that needs verification has been added.',
    ja: '新しい手がかりが既存の説明とかみ合っています。確認すべき範囲だけが追加されました。',
    'zh-CN': '新的线索与现有说明相互衔接。仅新增了需要核查的范围。',
  },
  '이미 인정한 쟁점': { en: 'Already admitted dispute', ja: 'すでに認めた争点', 'zh-CN': '已承认的争议' },
  '선행 증거 제시 필요': { en: 'Prior evidence presentation required', ja: '先行証拠の提示が必要', 'zh-CN': '需要先提交前置证据' },
  '오피스텔의 사람들': { en: 'People at the Officetel', ja: 'オフィステルの人々', 'zh-CN': '公寓楼里的人' },
  '오피스텔의 사람을 짚어야겠습니다': {
    en: 'We need to identify the person at the officetel.',
    ja: 'オフィステルにいた人物を確認する必要があります。',
    'zh-CN': '需要确认公寓楼里的那个人。',
  },
  '가족 쪽 정황': { en: 'Family-side Circumstances', ja: '家族側の事情', 'zh-CN': '家人一侧的情况' },
  'dc-6 가족 쪽 정황': { en: 'dc-6 Family-side Circumstances', ja: 'dc-6 家族側の事情', 'zh-CN': 'dc-6 家人一侧的情况' },
  '가족 쪽 돌봄 정황': { en: 'Family Care Circumstances', ja: '家族側の介護事情', 'zh-CN': '家人照护相关情况' },
  '중학교 참고서': { en: 'Middle School Study Guide', ja: '中学校の参考書', 'zh-CN': '初中参考书' },
  '학교 알림': { en: 'School Notice', ja: '学校からの通知', 'zh-CN': '学校通知' },
  '영수증 묶음 속 중학교 참고서와 문자에 섞인 학교 알림이 가족 쪽 정황으로 맞물린다.': {
    en: 'The middle school study guide in the receipt bundle and the school notice mixed into the texts connect as family-side circumstances.',
    ja: '領収書の束にある中学校の参考書と、メッセージに混じった学校通知が、家族側の事情としてつながっています。',
    'zh-CN': '收据包里的初中参考书和短信中夹杂的学校通知，彼此关联为家人一侧的情况。',
  },
  '영수증의 참고서와 문자 속 학교 알림을 함께 보며 가족 쪽 정황을 분리하는 카드': {
    en: 'A card that separates the family-side circumstances by reading the study guide receipt together with the school notice in the texts.',
    ja: '領収書の参考書とメッセージ内の学校通知を合わせて読み、家族側の事情を切り分けるカード。',
    'zh-CN': '将收据中的参考书与短信里的学校通知一起查看，从而拆分出家人一侧情况的卡片。',
  },
  '문자와 구매 품목이 같은 가족 쪽 정황을 가리킵니다. 누구와 관련된 일인지와 왜 숨겼는지를 따로 확인해야 합니다.': {
    en: 'The text and purchased item point to the same family-side circumstance. Who it concerns and why it was hidden must be checked separately.',
    ja: 'メッセージと購入品が同じ家族側の事情を示しています。誰に関わることなのか、なぜ隠したのかを別々に確認する必要があります。',
    'zh-CN': '短信与购买物品指向同一项家人一侧的情况。必须分别确认这与谁有关，以及为什么被隐瞒。',
  },
  '핵심 사실을 더 이상 부인하지 않는다.': {
    en: 'No longer denies the core fact.',
    ja: '核心事実をこれ以上否認しません。',
    'zh-CN': '不再否认核心事实。',
  },
  '증인 증언에 당황하고, 더 이상 버티기 어렵다는 반응을 보인다.': {
    en: 'Startled by the witness testimony and showing that it is difficult to keep resisting.',
    ja: '証人証言に動揺し、これ以上耐えにくい反応を見せています。',
    'zh-CN': '因证人证言而动摇，表现出难以继续抵抗的反应。',
  },
  '핵심 증언에 흔들리지만 아직 자신의 방어를 완전히 내려놓지는 않는다.': {
    en: 'Shaken by the key testimony, but not yet fully dropping the defense.',
    ja: '重要証言に揺らいでいますが、まだ防御を完全には解いていません。',
    'zh-CN': '被关键证言动摇，但尚未完全放下防御。',
  },
  '완벽하게 간파했다! 결정적 순간을 놓치지 않았다.': {
    en: 'Perfectly read it. The decisive moment was not missed.',
    ja: '完璧に見抜きました。決定的な瞬間を逃しませんでした。',
    'zh-CN': '完美看破！没有错过决定性瞬间。',
  },
  '방어가 무너졌지만, 결정적 증거는 놓쳤다...': {
    en: 'The defense collapsed, but the decisive evidence was missed...',
    ja: '防御は崩れましたが、決定的証拠は逃しました……',
    'zh-CN': '防线已崩溃，但错过了决定性证据……',
  },
  '모순을 정확히 짚어냈다!': {
    en: 'The contradiction was pinpointed.',
    ja: '矛盾を正確に突きました。',
    'zh-CN': '准确指出了矛盾！',
  },
  '모순의 핵심을 놓쳤다...': {
    en: 'The core of the contradiction was missed...',
    ja: '矛盾の核心を逃しました……',
    'zh-CN': '错过了矛盾的核心……',
  },
  '…맞습니다. 더 숨기지 않겠습니다. 제가 알고 있는 사실을 정리해 말씀드리겠습니다.': {
    en: '...Yes. I will not hide it anymore. I will organize the facts I know and explain them.',
    ja: '……その通りです。もう隠しません。私が知っている事実を整理してお話しします。',
    'zh-CN': '……是的。我不会再隐瞒。我会整理我知道的事实并说明。',
  },
  '…그 증언까지 나왔습니까. 네, 더 숨기기 어렵겠습니다.': {
    en: '...That testimony has come out too. Yes, it will be difficult to hide any longer.',
    ja: '……その証言まで出ましたか。はい、これ以上隠すのは難しそうです。',
    'zh-CN': '……连那份证言也出来了吗。是的，已经很难再隐瞒了。',
  },
  '…출금 흐름까지 확인됐군요. 제가 설명하겠습니다.': {
    en: '...The withdrawal flow has been confirmed too. I will explain.',
    ja: '……出金の流れまで確認されたのですね。私が説明します。',
    'zh-CN': '……连取款流程也确认了。我来说明。',
  },
  '…그 부분까지 확인됐다면, 저도 피하지 않겠습니다.': {
    en: '...If that part has been confirmed too, I will not avoid it.',
    ja: '……そこまで確認されたなら、私も避けません。',
    'zh-CN': '……如果连那部分也确认了，我也不会回避。',
  },
  '…그 부분까지 확인됐습니까. 제가 아는 대로 말씀드리겠습니다.': {
    en: '...That part has been confirmed too? I will tell you what I know.',
    ja: '……そこまで確認されたのですか。私の知る限り話します。',
    'zh-CN': '……连那部分也确认了吗。我会按我知道的说明。',
  },
  '오피스텔에 간 것은 맞지만, 누구를 만났는지 얘기하기 곤란한 것은 이해해 주셨으면 합니다. 다만, 아내의 의심과는 전혀 다르다는 것만은 분명히 말할 수 있습니다.': {
    en: 'I did go to the officetel, but I hope you understand that it is difficult to say whom I met. I can state clearly, however, that it is nothing like my wife suspects.',
    ja: 'オフィステルに行ったのは事実ですが、誰に会ったのか話しにくい点は理解していただきたいです。ただ、妻の疑いとはまったく違うことだけははっきり言えます。',
    'zh-CN': '我确实去了办公公寓，但希望你理解我很难说明见了谁。不过我可以明确说，这和妻子的怀疑完全不同。',
  },
  '그 증언을 못 들은 척하겠다는 뜻은 아닙니다. 그래도 지금은 제 입장을 바로 접지는 못하겠습니다.': {
    en: 'I am not pretending I did not hear that testimony. Still, I cannot drop my position immediately right now.',
    ja: 'その証言を聞かなかったふりをするつもりではありません。それでも今すぐ自分の立場を下げることはできません。',
    'zh-CN': '我不是装作没听到那份证言。但现在我还不能马上放下自己的立场。',
  },
  '그 증언은 들었습니다. 그래도 지금 바로 결론까지 인정하기는 어렵습니다.': {
    en: 'I heard that testimony. Still, it is difficult to admit the conclusion immediately.',
    ja: 'その証言は聞きました。それでも今すぐ結論まで認めるのは難しいです。',
    'zh-CN': '我听到了那份证言。但现在很难马上承认到结论。',
  },
  '[주의] 같은 접근이 반복되고 있습니다. 다른 질문 유형이나 쟁점을 시도해 보세요.': {
    en: '[Warning] The same approach is being repeated. Try another question type or dispute.',
    ja: '【注意】同じアプローチが繰り返されています。別の質問タイプや争点を試してください。',
    'zh-CN': '【注意】正在重复相同方式。请尝试其他问题类型或争议。',
  },
  '이전에는 부인하던 쟁점이 현재 설명에서는 일부 인정되거나 다른 맥락으로 바뀌었습니다.': {
    en: 'A point that was previously denied is now partly admitted or has shifted into a different context.',
    ja: '以前は否認していた争点が、現在の説明では一部認められるか別の文脈に変わっています。',
    'zh-CN': '此前否认的争议点在当前说明中被部分承认，或转变成了不同语境。',
  },
  '알겠습니다. 더 돌려 말하지 않겠습니다. 숨긴 이유와 제가 한 행동을 이어서 말씀드리겠습니다.': {
    en: 'Understood. I will stop talking around it. I will explain why I hid it and what I did.',
    ja: 'わかりました。もう遠回しには言いません。隠した理由と私がしたことを続けて話します。',
    'zh-CN': '明白。我不会再绕着说。我会继续说明我隐瞒的原因和我做过的事。',
  },
  '말씀드리겠습니다. 감정이 앞섰지만, 피하지 않고 사실관계를 이어서 말하겠습니다.': {
    en: 'I will explain. My emotions came first, but I will not avoid it and will continue with the facts.',
    ja: 'お話しします。感情が先に立ちましたが、避けずに事実関係を続けて話します。',
    'zh-CN': '我会说明。虽然情绪在前，但我不会回避，会继续陈述事实关系。',
  },
  '네. 흥분해서 앞뒤가 흐려졌습니다. 사실관계부터 다시 정리하겠습니다.': {
    en: 'Yes. I got agitated and lost the sequence. I will organize the facts again first.',
    ja: 'はい。興奮して前後が曖昧になりました。事実関係から整理し直します。',
    'zh-CN': '是的。我太激动，前后顺序变乱了。我先重新整理事实关系。',
  },
  '네. 잠시 정리하겠습니다. 제가 아는 사실부터 차례대로 말하겠습니다.': {
    en: 'Yes. Let me organize it for a moment. I will state the facts I know in order.',
    ja: 'はい。少し整理します。私が知っている事実から順番に話します。',
    'zh-CN': '好的。我先整理一下。我会按顺序说出我知道的事实。',
  },
  '...그건... 상황이 복잡했습니다. 제가 처음에 말씀드린 것과 다른 부분이 있었습니다.': {
    en: '...That was... complicated. There were parts that differed from what I first said.',
    ja: '……それは……状況が複雑でした。最初に話したことと違う部分がありました。',
    'zh-CN': '……那件事……情况很复杂。和我一开始说的有不一样的部分。',
  },
  '재판관님, 제 기억이 혼란스러웠던 것 같습니다. 다시 정리하겠습니다.': {
    en: 'Your Honor, I think my memory was confused. I will organize it again.',
    ja: '裁判官、私の記憶が混乱していたようです。整理し直します。',
    'zh-CN': '裁判官，我的记忆似乎有些混乱。我会重新整理。',
  },
  '그건... 제가 말한 것과 다르지 않습니다. 맥락이 다른 것입니다.': {
    en: 'That... is not different from what I said. The context is different.',
    ja: 'それは……私が言ったことと違うわけではありません。文脈が違うのです。',
    'zh-CN': '那……并不和我说的不同。只是背景不同。',
  },
  '…사실, 그것만이 아니었습니다.': {
    en: '...Actually, that was not all.',
    ja: '……実は、それだけではありませんでした。',
    'zh-CN': '……其实，不只是那样。',
  },
  '시선이 흔들리며 잠시 멈춘다.': {
    en: 'Their gaze wavers and they pause for a moment.',
    ja: '視線が揺れ、少し間を置く。',
    'zh-CN': '视线动摇，短暂停顿。',
  },
  '방어적으로 말을 고르며 답한다.': {
    en: 'Answers defensively while choosing words carefully.',
    ja: '防御的に言葉を選びながら答える。',
    'zh-CN': '以防御姿态斟酌措辞回答。',
  },
  '겉으로는 차분하지만 핵심을 피한다.': {
    en: 'Appears calm, but avoids the core point.',
    ja: '表面上は落ち着いているが、核心を避ける。',
    'zh-CN': '表面冷静，但避开核心。',
  },
  '잠시 망설인 뒤 조심스럽게 답한다.': {
    en: 'Hesitates briefly, then answers cautiously.',
    ja: '少しためらってから慎重に答える。',
    'zh-CN': '短暂犹豫后谨慎回答。',
  },
  '감정이 앞선 상태로 반박한다.': {
    en: 'Pushes back with emotion leading the response.',
    ja: '感情が先に立った状態で反論する。',
    'zh-CN': '在情绪先行的状态下反驳。',
  },
  '체념한 목소리로 인정할 부분을 고른다.': {
    en: 'In a resigned voice, chooses what to admit.',
    ja: '諦めた声で認める部分を選ぶ。',
    'zh-CN': '以放弃抵抗的语气选择承认的部分。',
  },
  '조심스럽게 답한다.': {
    en: 'Answers cautiously.',
    ja: '慎重に答える。',
    'zh-CN': '谨慎回答。',
  },
  '무심코 말을 꺼내다 멈칫한다.': {
    en: 'Starts speaking without thinking, then hesitates.',
    ja: '思わず話し出してから、はっと止まる。',
    'zh-CN': '不经意开口后突然迟疑。',
  },
  '말끝이 흔들리며 시선을 피한다.': {
    en: 'The end of the sentence wavers and the gaze turns away.',
    ja: '語尾が揺れ、視線をそらす。',
    'zh-CN': '话尾发颤并移开视线。',
  },
  '설명하다 자신도 모르게 말이 새어 나온다.': {
    en: 'While explaining, a statement slips out before they realize it.',
    ja: '説明しているうちに、思わず言葉が漏れる。',
    'zh-CN': '解释时不自觉地漏出了话。',
  },
  '상대를 탓하다 의도치 않게 단서를 흘린다.': {
    en: 'While blaming the other party, accidentally lets a clue slip.',
    ja: '相手を責める中で、意図せず手がかりを漏らす。',
    'zh-CN': '责怪对方时无意中泄露线索。',
  },
  '감정이 격해지며 입에서 튀어나온다.': {
    en: 'Emotion intensifies and the words burst out.',
    ja: '感情が高ぶり、言葉が口をついて出る。',
    'zh-CN': '情绪激动，话脱口而出。',
  },
  '체념한 듯 결국 내뱉는다.': {
    en: 'Finally says it as if resigned.',
    ja: '諦めたように、ついに口にする。',
    'zh-CN': '像是放弃抵抗般终于说了出来。',
  },
  '잠시 말을 멈추더니 다시 이어간다.': {
    en: 'Stops briefly, then continues.',
    ja: '少し言葉を止めてから、また続ける。',
    'zh-CN': '短暂停顿后继续说。',
  },
  '그때 그 일은… 아, 아닙니다. 그냥 제가 잘못 말했습니다.': {
    en: 'That incident then was... No, never mind. I misspoke.',
    ja: 'あの時のことは……いえ、違います。ただ私が言い間違えました。',
    'zh-CN': '那时那件事……啊，不是。我只是说错了。',
  },
  '그건… 사실 그때…': {
    en: 'That was... actually, at that time...',
    ja: 'それは……実はあの時……',
    'zh-CN': '那是……其实当时……',
  },
  '아니, 그러니까… 그것도 관련이 있긴 한데…': {
    en: 'No, I mean... that is related too, but...',
    ja: 'いえ、つまり……それも関係はありますが……',
    'zh-CN': '不是，我是说……那也确实有关，不过……',
  },
  '그쪽이야말로! …아, 그건 제가 말할 부분이 아니었는데.': {
    en: 'You are the one... Ah, that was not my place to say.',
    ja: 'そちらこそ！……あ、それは私が言うべきことではありませんでした。',
    'zh-CN': '你才是！……啊，那不是我该说的部分。',
  },
  '그게 그렇게 된 건 — 아…': {
    en: 'The reason it happened that way was — ah...',
    ja: 'それがそうなったのは — あ……',
    'zh-CN': '之所以会那样是因为 — 啊……',
  },
  '… 솔직히 말씀드리면, 그것도 있습니다.': {
    en: '...To be honest, that is part of it too.',
    ja: '……正直に言えば、それもあります。',
    'zh-CN': '……坦白说，那也是其中一部分。',
  },
  '매우 불안정': { en: 'Highly Unstable', ja: '非常に不安定', 'zh-CN': '非常不稳定' },
  '불안정': { en: 'Unstable', ja: '不安定', 'zh-CN': '不稳定' },
  '강하게 방어 중': { en: 'Strongly Defensive', ja: '強く防御中', 'zh-CN': '强烈防御中' },
  '재판관님, 잠깐만요. 저도 할 말이 있습니다.': {
    en: 'Your Honor, wait a moment. I have something to say too.',
    ja: '裁判官、少し待ってください。私にも言いたいことがあります。',
    'zh-CN': '裁判官，请稍等。我也有话要说。',
  },
  '재판관님, 지금 하신 말씀은 사실과 다릅니다.': {
    en: 'Your Honor, what was just said is not true.',
    ja: '裁判官、今の発言は事実と違います。',
    'zh-CN': '裁判官，刚才说的与事实不符。',
  },
  'A의': { en: "A's", ja: 'Aの', 'zh-CN': 'A的' },
  'B의': { en: "B's", ja: 'Bの', 'zh-CN': 'B的' },
  '끼어들기': { en: 'Interjection', ja: '割り込み', 'zh-CN': '插话' },
  '제지한다': { en: 'Stop Them', ja: '制止する', 'zh-CN': '制止' },
  '허용한다': { en: 'Allow It', ja: '許可する', 'zh-CN': '允许' },
  '발언을 허용합니다.': { en: 'The statement is allowed.', ja: '発言を許可します。', 'zh-CN': '允许发言。' },
  '계속 말해보세요. 지금의 흐름을 더 확인하겠습니다.': {
    en: 'Continue. I will examine this line further.',
    ja: '続けて話してください。今の流れをさらに確認します。',
    'zh-CN': '请继续说。我会进一步确认当前脉络。',
  },
  '잠시 진정하고, 사실만 다시 정리해 주세요.': {
    en: 'Calm down for a moment and restate only the facts.',
    ja: '少し落ち着いて、事実だけを整理し直してください。',
    'zh-CN': '请先冷静一下，只重新整理事实。',
  },
  '격앙 상태가 이어지고 있다. 사실 추궁과 동기 탐색이 더 강하게 작용할 수 있다.': {
    en: 'The heightened emotion continues. Fact pursuit and motive search may work more strongly now.',
    ja: '高ぶった状態が続いています。事実追及と動機探索がより強く作用する可能性があります。',
    'zh-CN': '激动状态仍在持续。事实追问和动机探索可能更有效。',
  },
  '감정이 가라앉고 있다. 공감 접근으로 다시 사실관계를 정리하기 좋은 흐름이다.': {
    en: 'Emotion is settling. This is a good moment to use empathy and restate the facts.',
    ja: '感情が落ち着きつつあります。共感アプローチで事実関係を整理し直すよい流れです。',
    'zh-CN': '情绪正在平复。适合用共情接近重新整理事实关系。',
  },
  '감정이 격해졌습니다. 반응을 더 밀어붙일지, 잠시 정리할지 판단하세요.': {
    en: 'Emotion has intensified. Decide whether to press the reaction further or pause to organize it.',
    ja: '感情が高ぶりました。反応をさらに押すか、いったん整理するか判断してください。',
    'zh-CN': '情绪已经激化。请判断是继续推进反应，还是暂时整理。',
  },
  '감정 폭발': { en: 'Emotional Outburst', ja: '感情の爆発', 'zh-CN': '情绪爆发' },
  '진정시킨다': { en: 'Calm Them Down', ja: '落ち着かせる', 'zh-CN': '让其冷静' },
  '밀어붙인다': { en: 'Press Harder', ja: '押し切る', 'zh-CN': '继续施压' },
  '판결 완충': { en: 'Judgment Buffer', ja: '判決バッファ', 'zh-CN': '判决缓冲' },
  '증거 제시가 충분히 먹히지 않았다. 완충 스킬을 쓸 수 있다.': {
    en: 'The evidence presentation did not land strongly enough. A buffer skill is available.',
    ja: '証拠提示が十分に効きませんでした。緩衝スキルを使えます。',
    'zh-CN': '证据提交效果不足。可以使用缓冲技能。',
  },
  '증거 제시가 충분히 먹히지 않았습니다. 완충 스킬로 한 번 수습할 수 있습니다.': {
    en: 'The evidence presentation did not land strongly enough. You can recover once with a buffer skill.',
    ja: '証拠提示が十分に効きませんでした。緩衝スキルで一度立て直せます。',
    'zh-CN': '证据提交效果不足。可以用缓冲技能补救一次。',
  },
  '제시를 철회한다': { en: 'Withdraw Presentation', ja: '提示を撤回', 'zh-CN': '撤回提交' },
  '관점을 바꿔 제시한다': { en: 'Present from Another Angle', ja: '観点を変えて提示', 'zh-CN': '换个角度提交' },
  '집요함 추가': { en: 'Persistence Added', ja: '粘り強さ追加', 'zh-CN': '追加坚持度' },
  '같은 쟁점을 너무 오래 밀었다. 질문 각도를 초기화할 수 있다.': {
    en: 'You have pressed the same dispute too long. The question angle can be reset.',
    ja: '同じ争点を長く押しすぎました。質問の角度をリセットできます。',
    'zh-CN': '同一争议追问过久。可以重置提问角度。',
  },
  '같은 쟁점을 너무 오래 밀었습니다. 스킬을 써서 질문 각도를 초기화할 수 있습니다.': {
    en: 'You have pressed the same dispute too long. Use a skill to reset the question angle.',
    ja: '同じ争点を長く押しすぎました。スキルで質問の角度をリセットできます。',
    'zh-CN': '同一争议追问过久。可以使用技能重置提问角度。',
  },
  '같은 접근이 반복되어 더는 진전이 없습니다. 증거, 증인, 다른 질문으로 각도를 바꾸세요.': {
    en: 'The same approach is being repeated and no longer advances the case. Change angles with evidence, a witness, or another question.',
    ja: '同じアプローチが繰り返され、これ以上進展しません。証拠、証人、別の質問で角度を変えてください。',
    'zh-CN': '相同方式反复使用，已经无法继续推进。请用证据、证人或其他问题改变角度。',
  },
  '상대가 이미 방어를 낮추고 있습니다.': {
    en: 'The other party is already lowering their defense.',
    ja: '相手はすでに防御を下げています。',
    'zh-CN': '对方已经在降低防备。',
  },
  '완전 부정이 더 이상 통하지 않습니다': {
    en: 'Total denial no longer works',
    ja: '全面否認はもう通用しません',
    'zh-CN': '彻底否认已不再奏效',
  },
  '시간대 변명이 봉쇄되었습니다': {
    en: 'The timeline excuse has been blocked',
    ja: '時間帯の弁解が封じられました',
    'zh-CN': '时间线借口已被封堵',
  },
  '진술 균열 감지': {
    en: 'Statement fracture detected',
    ja: '陳述の亀裂を検知',
    'zh-CN': '检测到陈述裂痕',
  },
  '부정 진술이 시점 고정되었습니다': {
    en: 'The denial statement has been pinned to its timing',
    ja: '否認陳述が時点に固定されました',
    'zh-CN': '否认陈述已被固定到时间点',
  },
  '감정적 방어선 붕괴 직전': {
    en: 'Emotional defense is near collapse',
    ja: '感情的な防御線が崩壊寸前です',
    'zh-CN': '情绪防线即将崩溃',
  },
  '숨기던 동기가 흘러나오기 시작합니다': {
    en: 'The hidden motive is beginning to leak out',
    ja: '隠していた動機が漏れ始めています',
    'zh-CN': '隐藏的动机开始流露',
  },
  '숨겨진 연결고리가 감지되었습니다': {
    en: 'A hidden connection was detected',
    ja: '隠れたつながりを検知しました',
    'zh-CN': '检测到隐藏关联',
  },
  '비공개 확인 경로가 열리고 있습니다': {
    en: 'A private verification route is opening',
    ja: '非公開確認ルートが開きつつあります',
    'zh-CN': '私下确认路径正在开启',
  },
  '신뢰창구 개방': {
    en: 'Trust Window Opened',
    ja: '信頼窓口が開放',
    'zh-CN': '信任窗口已开启',
  },
  '자발적 시인 가능성이 높아졌습니다': {
    en: 'The chance of voluntary admission has increased',
    ja: '自発的に認める可能性が高まりました',
    'zh-CN': '自愿承认的可能性提高了',
  },
  '상대의 반격 의지가 약해지고 있습니다': {
    en: 'The other party is losing the will to counterattack',
    ja: '相手の反撃意欲が弱まっています',
    'zh-CN': '对方反击意愿正在减弱',
  },
  '동기 탐색으로 숨겨진 연결고리를 발견했습니다 — 새로운 쟁점이 곧 드러날 수 있습니다': {
    en: 'Motive search found a hidden connection — a new dispute may surface soon',
    ja: '動機探索で隠れたつながりを発見しました — 新しい争点がまもなく現れる可能性があります',
    'zh-CN': '动机探索发现了隐藏关联 — 新争议可能很快浮现',
  },
  '말실수가 나왔습니다.': {
    en: 'A slip of the tongue occurred.',
    ja: '失言が出ました。',
    'zh-CN': '出现了口误。',
  },
  '누설 100%에 도달했습니다': {
    en: 'Leak reached 100%',
    ja: '漏れが100%に到達しました',
    'zh-CN': '泄露达到 100%',
  },
  '신뢰 창이 열렸습니다': {
    en: 'Trust window opened',
    ja: '信頼の窓が開きました',
    'zh-CN': '信任窗口已开启',
  },
  '누설 위험': {
    en: 'Leak Risk',
    ja: '漏れリスク',
    'zh-CN': '泄露风险',
  },
  '감정 누설이 한계치에 도달했습니다. 단정하지 말고 기록 가능한 실수와 관련 쟁점을 확인하십시오.': {
    en: 'Emotional leakage has reached its limit. Do not overstate it; check recordable slips and related disputes.',
    ja: '感情の漏れが限界値に達しました。断定せず、記録可能な失言と関連争点を確認してください。',
    'zh-CN': '情绪泄露已达到上限。不要武断，请确认可记录的失误和相关争议。',
  },
  '답변의 빈틈이 커졌습니다. 아직 결론이 아니라 추가 질문과 증거 연결이 필요한 신호입니다.': {
    en: 'The gap in the answer has widened. This is not a conclusion yet; it signals that follow-up questions and evidence links are needed.',
    ja: '回答の隙が大きくなりました。まだ結論ではなく、追加質問と証拠の接続が必要な合図です。',
    'zh-CN': '回答中的破绽扩大了。这还不是结论，而是需要追加提问和连接证据的信号。',
  },
  '공감 접근으로 확인할 수 있는 범위가 넓어졌습니다. 아직 자백은 아니므로 낮은 단계 질문부터 이어가십시오.': {
    en: 'Empathy has widened the range that can be verified. This is not a confession yet, so continue from lower-stage questions.',
    ja: '共感アプローチで確認できる範囲が広がりました。まだ自白ではないため、低い段階の質問から続けてください。',
    'zh-CN': '共情接近扩大了可确认范围。这还不是坦白，请从较低阶段的问题继续。',
  },
  '숨겨진 연결고리가 보입니다.': {
    en: 'A hidden connection is visible.',
    ja: '隠れたつながりが見えます。',
    'zh-CN': '看到了隐藏关联。',
  },
  '동기 탐색 결과': {
    en: 'Motive Search Result',
    ja: '動機探索の結果',
    'zh-CN': '动机探索结果',
  },
  '쟁점으로 이어질 수 있는 단서': {
    en: 'A clue that may lead to a dispute',
    ja: '争点につながる可能性のある手がかり',
    'zh-CN': '可能通向争议的线索',
  },
  '책임을 돌리는 말투가 반복됩니다.': {
    en: 'Responsibility-shifting language is repeating.',
    ja: '責任を転嫁する言い方が繰り返されています。',
    'zh-CN': '推卸责任的说法正在重复出现。',
  },
  '비공개 확인 경로가 열렸습니다': {
    en: 'A private verification route has opened',
    ja: '非公開確認ルートが開きました',
    'zh-CN': '私下确认路径已开启',
  },
  '공감 접근으로 자백을 이끌어낼 수 있습니다': {
    en: 'Empathy may draw out a confession',
    ja: '共感アプローチで自白を引き出せる可能性があります',
    'zh-CN': '共情接近可能引导坦白',
  },
  '추가 추궁': {
    en: 'Press Further',
    ja: 'さらに追及',
    'zh-CN': '继续追问',
  },
  '균열이 생겼습니다. 동기를 탐색해보세요.': {
    en: 'A fracture has opened. Try searching for motive.',
    ja: '亀裂が生じました。動機を探ってください。',
    'zh-CN': '已经出现裂痕。请尝试探索动机。',
  },
  '궁지에 몰렸습니다. 사실을 추궁하세요.': {
    en: 'They are cornered. Press the facts.',
    ja: '窮地に追い込まれています。事実を追及してください。',
    'zh-CN': '对方已被逼入困境。请追问事实。',
  },
  '마음이 열리고 있습니다. 공감으로 접근해보세요.': {
    en: 'They are opening up. Try an empathy approach.',
    ja: '心が開きつつあります。共感で接近してください。',
    'zh-CN': '对方正在敞开心防。请尝试共情接近。',
  },
  '질문 각도 초기화': { en: 'Reset Question Angle', ja: '質問角度リセット', 'zh-CN': '重置提问角度' },
  '추가 질문 없음': { en: 'No More Questions', ja: '追加質問なし', 'zh-CN': '没有更多问题' },
  '지금은 이 증인에게 더 물을 내용이 없습니다.': {
    en: 'There is nothing more to ask this witness right now.',
    ja: '今この証人にさらに尋ねる内容はありません。',
    'zh-CN': '现在没有更多内容可询问这名证人。',
  },
  '증인 재심문': { en: 'Witness Re-examination', ja: '証人再尋問', 'zh-CN': '再次询问证人' },
  '먼저 표면 정황을 확인할 질문을 선택하세요. 답변이 이어질수록 질문이 구체화됩니다.': {
    en: 'Start with a surface-level question. The follow-ups will become more specific as answers continue.',
    ja: 'まず表面的な状況を確認する質問を選んでください。回答が続くほど質問は具体化します。',
    'zh-CN': '先选择一个确认表面情况的问题。随着回答继续，追问会逐步具体化。',
  },
  '앞선 답변을 바탕으로 더 좁혀 물어볼 질문을 선택하세요.': {
    en: 'Choose a narrower follow-up question based on the earlier answer.',
    ja: '先の回答をもとに、さらに絞って尋ねる質問を選んでください。',
    'zh-CN': '请根据此前回答选择更聚焦的追问。',
  },
  '조사': { en: 'Investigation', ja: '調査', 'zh-CN': '调查' },
  '스킬': { en: 'Skill', ja: 'スキル', 'zh-CN': '技能' },
  '지배력': { en: 'Control', ja: '統制力', 'zh-CN': '控制力' },
  '감정 단계 변화': { en: 'Emotion Stage Changed', ja: '感情段階の変化', 'zh-CN': '情绪阶段变化' },
  '감정': { en: 'Emotion', ja: '感情', 'zh-CN': '情绪' },
  '의심': { en: 'Suspicious', ja: '疑念', 'zh-CN': '怀疑' },
  '감정 변화': { en: 'Emotion Change', ja: '感情変化', 'zh-CN': '情绪变化' },
  '신뢰 상태 변화': { en: 'Trust State Changed', ja: '信頼状態の変化', 'zh-CN': '信任状态变化' },
  '감정 상태가 가라앉았습니다': { en: 'Emotional state has settled', ja: '感情状態が落ち着きました', 'zh-CN': '情绪状态已平复' },
  '감정 변화가 확인됐습니다. 아직 결론이 아니라 다음 질문의 흐름을 조정할 신호입니다.': {
    en: 'An emotional shift was confirmed. This is not a conclusion, but a signal to adjust the next question flow.',
    ja: '感情の変化が確認されました。まだ結論ではなく、次の質問の流れを調整する合図です。',
    'zh-CN': '已确认情绪变化。这不是结论，而是调整下一步提问节奏的信号。',
  },
  '감정 상태가 안정됐습니다': { en: 'Emotional state has stabilized', ja: '感情状態が安定しました', 'zh-CN': '情绪状态已稳定' },
  '당사자가 다시 방어 태세를 정돈했습니다. 같은 압박을 반복하기보다 다른 각도를 확인하십시오.': {
    en: 'The party has reset their defensive posture. Check another angle instead of repeating the same pressure.',
    ja: '当事者は再び防御態勢を整えました。同じ圧力を繰り返すより別の角度を確認してください。',
    'zh-CN': '当事人重新整理了防御态势。请换个角度确认，而不是重复同样施压。',
  },
  '감정이 흔들리기 시작했습니다': { en: 'Emotion has begun to waver', ja: '感情が揺らぎ始めました', 'zh-CN': '情绪开始动摇' },
  '답변의 균형이 흔들렸습니다. 기록과 진술을 이어 확인하면 빈틈을 좁힐 수 있습니다.': {
    en: 'The answer has lost balance. Connect records and statements to narrow the gap.',
    ja: '回答の均衡が揺らぎました。記録と陳述を続けて確認すれば隙を狭められます。',
    'zh-CN': '回答的平衡已动摇。继续连接记录与陈述可以缩小破绽。',
  },
  '감정 격앙 단계에 들어갔습니다': { en: 'Emotion has entered an agitated stage', ja: '感情が高ぶった段階に入りました', 'zh-CN': '情绪进入激动阶段' },
  '감정이 크게 올라왔습니다. 무리한 단정은 피하고 모순이나 기록으로 압박할 시점입니다.': {
    en: 'Emotion has risen sharply. Avoid overclaiming and press with contradictions or records.',
    ja: '感情が大きく高まりました。無理な断定は避け、矛盾や記録で圧力をかける時点です。',
    'zh-CN': '情绪明显升高。避免武断结论，应以矛盾或记录施压。',
  },
  '감정 체념 단계에 들어갔습니다': { en: 'Emotion has entered resignation', ja: '感情が諦めの段階に入りました', 'zh-CN': '情绪进入放弃抵抗阶段' },
  '방어가 흔들리고 체념 반응이 보입니다. 자백을 강요하지 말고 확인된 사실부터 정리하십시오.': {
    en: 'The defense is wavering and resignation is visible. Do not force a confession; organize confirmed facts first.',
    ja: '防御が揺らぎ、諦めの反応が見えます。自白を強要せず、確認済みの事実から整理してください。',
    'zh-CN': '防线正在动摇，并出现放弃抵抗反应。不要强迫坦白，先整理已确认事实。',
  },
  '안정': { en: 'Stable', ja: '安定', 'zh-CN': '稳定' },
  '격앙': { en: 'Agitated', ja: '高ぶり', 'zh-CN': '激动' },
  '분노': { en: 'Angry', ja: '怒り', 'zh-CN': '愤怒' },
  '신뢰 상태가 최고치에 도달했습니다. 감정 압박보다 차분한 확인 질문이 자백 경로에 더 적합합니다.': {
    en: 'Trust has reached its peak. Calm verification questions fit the confession route better than emotional pressure.',
    ja: '信頼状態が最高値に達しました。感情的な圧力より、落ち着いた確認質問の方が自白ルートに適しています。',
    'zh-CN': '信任已达到最高值。比起情绪施压，冷静确认更适合坦白路线。',
  },
  '신뢰가 충분히 쌓였습니다. 공감 접근과 비공개 확인 질문의 효율이 높아집니다.': {
    en: 'Enough trust has accumulated. Empathy approaches and private verification questions become more effective.',
    ja: '十分な信頼が積み上がりました。共感アプローチと非公開の確認質問の効率が高まります。',
    'zh-CN': '信任已经充分积累。共情接近和私下确认问题会更有效。',
  },
}

const FRAGMENTS: Record<string, LocaleText> = {
  '선택지': { en: 'Choices', ja: '選択肢', 'zh-CN': '选项' },
  '새로운': { en: 'New', ja: '新しい', 'zh-CN': '新的' },
  '새': { en: 'New', ja: '新しい', 'zh-CN': '新的' },
  '사실 추궁': { en: 'Fact Pursuit', ja: '事実追及', 'zh-CN': '事实追问' },
  '동기 탐색': { en: 'Motive Search', ja: '動機探索', 'zh-CN': '动机探索' },
  '공감 접근': { en: 'Empathy Approach', ja: '共感アプローチ', 'zh-CN': '共情接近' },
  '이 쟁점': { en: 'this dispute', ja: 'この争点', 'zh-CN': '该争议' },
  '정면 추궁': { en: 'Direct Pressure', ja: '正面追及', 'zh-CN': '正面追问' },
  '결정적 질문': { en: 'Decisive Question', ja: '決定的質問', 'zh-CN': '决定性问题' },
  '자백 유도': { en: 'Draw Confession', ja: '自白誘導', 'zh-CN': '引导坦白' },
  '비공개 보호': { en: 'Confidential Protection', ja: '非公開保護', 'zh-CN': '保密保护' },
  '분리 심문': { en: 'Separate Examination', ja: '分離尋問', 'zh-CN': '分离询问' },
  '신뢰 경로': { en: 'Trust Route', ja: '信頼ルート', 'zh-CN': '信任路径' },
  '감정 경로': { en: 'Emotion Route', ja: '感情ルート', 'zh-CN': '情绪路径' },
  '조사 1단계': { en: 'Investigation Stage 1', ja: '調査1段階', 'zh-CN': '调查第 1 阶段' },
  '조사 2단계': { en: 'Investigation Stage 2', ja: '調査2段階', 'zh-CN': '调查第 2 阶段' },
  '조사 3단계': { en: 'Investigation Stage 3', ja: '調査3段階', 'zh-CN': '调查第 3 阶段' },
  '진실 단계 번호': { en: 'truth-stage number', ja: '真実段階番号', 'zh-CN': '真相阶段编号' },
  '모순 축적': { en: 'Contradiction buildup', ja: '矛盾の蓄積', 'zh-CN': '矛盾累积' },
  '모순 토큰': { en: 'Contradiction token', ja: '矛盾トークン', 'zh-CN': '矛盾令牌' },
  '모순': { en: 'Contradiction', ja: '矛盾', 'zh-CN': '矛盾' },
  '신뢰': { en: 'Trust', ja: '信頼', 'zh-CN': '信任' },
  '누설': { en: 'Leak', ja: '漏れ', 'zh-CN': '泄露' },
  '균열': { en: 'Fracture', ja: '亀裂', 'zh-CN': '裂痕' },
  '개방': { en: 'Opening', ja: '開放', 'zh-CN': '开放' },
  '시인': { en: 'Admission', ja: '認め', 'zh-CN': '承认' },
  '방어': { en: 'Defensive', ja: '防御', 'zh-CN': '防御' },
  '방어적': { en: 'Defensive', ja: '防御的', 'zh-CN': '防御性' },
  '자신만만': { en: 'Confident', ja: '自信満々', 'zh-CN': '自信满满' },
  '동요': { en: 'Shaken', ja: '動揺', 'zh-CN': '动摇' },
  '변명': { en: 'Excuse', ja: '弁解', 'zh-CN': '辩解' },
  '궁지': { en: 'Cornered', ja: '窮地', 'zh-CN': '陷入困境' },
  '한계': { en: 'Limit', ja: '限界', 'zh-CN': '极限' },
  '고백': { en: 'Confession', ja: '告白', 'zh-CN': '坦白' },
  '체념': { en: 'Resigned', ja: '諦め', 'zh-CN': '放弃抵抗' },
  '미확인': { en: 'Unknown', ja: '未確認', 'zh-CN': '未确认' },
  '완화': { en: 'Softened', ja: '緩和', 'zh-CN': '缓和' },
  '중립': { en: 'Neutral', ja: '中立', 'zh-CN': '中立' },
  '당사자': { en: 'Party', ja: '当事者', 'zh-CN': '当事人' },
  '영수증': { en: 'Receipt', ja: '領収書', 'zh-CN': '收据' },
  '통화 기록': { en: 'Call Records', ja: '通話記録', 'zh-CN': '通话记录' },
  '동선 자료': { en: 'Route Material', ja: '動線資料', 'zh-CN': '动线材料' },
  '방문기록': { en: 'Visit Record', ja: '訪問記録', 'zh-CN': '访问记录' },
  '방문 기록': { en: 'Visit Record', ja: '訪問記録', 'zh-CN': '访问记录' },
  '계좌 기록': { en: 'Account Record', ja: '口座記録', 'zh-CN': '账户记录' },
  '메시지': { en: 'Message', ja: 'メッセージ', 'zh-CN': '消息' },
  '증언 녹취': { en: 'Testimony Transcript', ja: '証言録取', 'zh-CN': '证言记录' },
  '증언 녹취록': { en: 'Testimony Transcript', ja: '証言録取書', 'zh-CN': '证言记录稿' },
  '공증인 메모': { en: 'Notary Memo', ja: '公証人メモ', 'zh-CN': '公证人备忘' },
  '일기장': { en: 'Diary', ja: '日記帳', 'zh-CN': '日记本' },
  '자료': { en: 'Material', ja: '資料', 'zh-CN': '材料' },
  '블랙박스 GPS 기록': { en: 'Black box GPS recording', ja: 'ブラックボックスGPS記録', 'zh-CN': '黑匣子 GPS 记录' },
  '개인 계좌 목돈 출금': { en: 'Personal account lump-sum withdrawal', ja: '個人口座からのまとまった出金', 'zh-CN': '个人账户大额取款' },
  '남편 명의 계좌의 목돈 출금': { en: "Lump-sum withdrawal from the husband's account", ja: '夫名義口座からのまとまった出金', 'zh-CN': '丈夫名义账户的大额取款' },
  '목돈 출금': { en: 'lump-sum withdrawal', ja: 'まとまった出金', 'zh-CN': '大额取款' },
  '답변에 변화가 감지된다': { en: 'A change is detected in the answer', ja: '回答の変化を検知', 'zh-CN': '检测到回答变化' },
  '조합 격상': { en: 'Combination Upgrade', ja: '組み合わせ強化', 'zh-CN': '组合升级' },
  '신뢰도 Hard 확정': { en: 'Reliability confirmed as Hard', ja: '信頼度Hard確定', 'zh-CN': '可信度确认为 Hard' },
}

const CONTENT_PHRASES: Record<string, LocaleText> = {
  '지출 시점과 품목': { en: 'spending time and item details', ja: '支出時点と品目', 'zh-CN': '支出时间和物品明细' },
  '연락 시점과 길이': { en: 'contact timing and duration', ja: '連絡時点と長さ', 'zh-CN': '联系时间和时长' },
  '이동 시점과 장소': { en: 'movement timing and location', ja: '移動時点と場所', 'zh-CN': '移动时间和地点' },
  '방문 시점과 빈도': { en: 'visit timing and frequency', ja: '訪問時点と頻度', 'zh-CN': '访问时间和频率' },
  '돈의 출처와 전달 순서': { en: 'source of funds and transfer order', ja: '資金の出所と受け渡し順序', 'zh-CN': '资金来源和交付顺序' },
  '당시 대화의 맥락': { en: 'the context of the conversation at that time', ja: '当時の会話の文脈', 'zh-CN': '当时对话的背景' },
  '목격 범위': { en: 'scope of what was witnessed', ja: '目撃範囲', 'zh-CN': '目击范围' },
  '공증 당시 상태와 절차': { en: 'condition and procedure at the notarization', ja: '公証当時の状態と手続き', 'zh-CN': '公证当时的状态与流程' },
  '가족 사정의 배경': { en: 'background of the family circumstances', ja: '家族事情の背景', 'zh-CN': '家庭情况背景' },
}

function exact(value: string, locale: Exclude<LocaleCode, 'ko'>): string | null {
  const trimmed = value.trim()
  return GENERATED_RUNTIME_TEXT[trimmed]?.[locale] ?? EXACT[trimmed]?.[locale] ?? null
}

function phrase(value: string, locale: Exclude<LocaleCode, 'ko'>): string {
  return exact(value, locale) ?? FRAGMENTS[value]?.[locale] ?? value
}

function softLocalize(value: string, locale: Exclude<LocaleCode, 'ko'>): string {
  return localizeRuntimeText(value.trim(), locale)
}

function localizeContentPhrase(value: string, locale: Exclude<LocaleCode, 'ko'>): string {
  return CONTENT_PHRASES[value]?.[locale] ?? localizeRuntimeText(value, locale)
}

function personAddress(value: string, locale: Exclude<LocaleCode, 'ko'>): string {
  const name = softLocalize(value, locale)
  return locale === 'ja' ? `${name}さん` : name
}

function localizeGeneratedJudgeQuestion(value: string, locale: Exclude<LocaleCode, 'ko'>): string | null {
  let match: RegExpMatchArray | null
  const out = (text: LocaleText) => text[locale]

  match = /^(.+?) 씨,\s*(.+?) 관련 실제 사실들을 차례대로 말씀해 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, please state the actual facts about ${topic} in order.`,
      ja: `${party}、${topic}に関する実際の事実を順番に述べてください。`,
      'zh-CN': `${party}，请按顺序说明与${topic}有关的实际事实。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 상대측이 의심을 시작하게 된 경위를 설명해 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, explain how the other side began to suspect ${topic}.`,
      ja: `${party}、相手側が${topic}を疑い始めた経緯を説明してください。`,
      'zh-CN': `${party}，请说明对方开始怀疑${topic}的经过。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 직전에는 어떤 일이 있었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, what happened immediately before ${topic}?`,
      ja: `${party}、${topic}の直前に何がありましたか。`,
      'zh-CN': `${party}，在${topic}之前发生了什么？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시 옆에 있었거나 내용을 들은 사람이 있었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, was anyone beside you or did anyone hear what happened during ${topic}?`,
      ja: `${party}、${topic}の当時、そばにいた人や内容を聞いた人はいましたか。`,
      'zh-CN': `${party}，在${topic}当时，旁边有人或有人听到相关内容吗？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 이후에 누구에게 먼저 말했는지 말씀해 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, state whom you told first after ${topic}.`,
      ja: `${party}、${topic}の後、最初に誰へ話したのか述べてください。`,
      'zh-CN': `${party}，请说明在${topic}之后你先告诉了谁。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 관해 직접 본 것과 나중에 들은 것을 나누어 말씀해 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, separate what you saw directly about ${topic} from what you heard later.`,
      ja: `${party}、${topic}について直接見たことと後から聞いたことを分けて述べてください。`,
      'zh-CN': `${party}，请把关于${topic}你亲眼看到的事和后来听说的事分开说明。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에서 시간 순서가 중요합니다\. 먼저 일어난 일부터 짚어 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, the sequence matters in ${topic}. Start with what happened first.`,
      ja: `${party}、${topic}では時系列が重要です。先に起きたことから確認してください。`,
      'zh-CN': `${party}，${topic}中的时间顺序很重要。请从最先发生的事开始说明。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 관련해서 확인할 수 있는 메시지나 계좌 기록이 있습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, are there messages or account records that can verify ${topic}?`,
      ja: `${party}、${topic}を確認できるメッセージや口座記録はありますか。`,
      'zh-CN': `${party}，是否有可以确认${topic}的消息或账户记录？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 (.+?) 씨의 말과 다른 부분이 있습니다\. 어느 쪽이 사실입니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    const other = personAddress(match[3], locale)
    return out({
      en: `${party}, your statement about ${topic} differs from ${other}'s. Which side is true?`,
      ja: `${party}、${topic}について${other}の発言と異なる部分があります。どちらが事実ですか。`,
      'zh-CN': `${party}，关于${topic}，你的说法与${other}不同。哪一方是事实？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 관련 상대측이 문제 삼는 내용들에 대해 상세하게 말씀해 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, explain in detail the points the other side raises about ${topic}.`,
      ja: `${party}、${topic}について相手側が問題視している内容を詳しく述べてください。`,
      'zh-CN': `${party}，请详细说明对方就${topic}提出问题的内容。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대한 말씀이 앞뒤가 맞지 않습니다\. 지금 확인된 사실만 답하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, your statement about ${topic} does not line up. Answer only with confirmed facts.`,
      ja: `${party}、${topic}についての発言は前後が合いません。今確認された事実だけ答えてください。`,
      'zh-CN': `${party}，你关于${topic}的说法前后不一致。请只回答目前已确认的事实。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시의 시간을 더 흐리지 마십시오\. 직전과 직후의 행동을 분명히 말하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, do not blur the timing around ${topic}. State clearly what you did immediately before and after.`,
      ja: `${party}、${topic}当時の時間をこれ以上曖昧にしないでください。直前と直後の行動を明確に述べてください。`,
      'zh-CN': `${party}，不要再模糊${topic}当时的时间。请明确说明前后行动。`,
    })
  }

  match = /^(.+?) 씨에게 묻습니다,\s*(.+?)에 대해 직접 본 사실과 추측을 섞지 말고 구분하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, do not mix direct facts and assumptions about ${topic}. Separate them.`,
      ja: `${party}に尋ねます。${topic}について直接見た事実と推測を混ぜずに分けてください。`,
      'zh-CN': `${party}，关于${topic}，请不要混淆亲眼所见和推测，请加以区分。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 관련 기록이 남아 있다면 무엇이 남아 있는지 바로 말씀하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, if records remain about ${topic}, state exactly what remains.`,
      ja: `${party}、${topic}に関する記録が残っているなら、何が残っているのかすぐ述べてください。`,
      'zh-CN': `${party}，如果还有关于${topic}的记录，请马上说明留下了什么。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 씨의 설명과 충돌하는 부분이 있습니다\. (.+?)에서 어느 대목을 부인하십니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const other = personAddress(match[2], locale)
    const topic = softLocalize(match[3], locale)
    return out({
      en: `${party}, part of this conflicts with ${other}'s explanation. Which part of ${topic} do you deny?`,
      ja: `${party}、${other}の説明と衝突する部分があります。${topic}のどの箇所を否認しますか。`,
      'zh-CN': `${party}，其中有与${other}说明相冲突的部分。你否认${topic}中的哪一处？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 말을 바꾼 이유부터 설명하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, first explain why your statement about ${topic} changed.`,
      ja: `${party}、${topic}について発言を変えた理由から説明してください。`,
      'zh-CN': `${party}，请先说明你为何改变了关于${topic}的说法。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시 누가 있었는지 숨김없이 밝히십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, state without hiding who was present during ${topic}.`,
      ja: `${party}、${topic}の当時誰がいたのか、隠さず明らかにしてください。`,
      'zh-CN': `${party}，请如实说明${topic}当时有哪些人在场。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 전후로 연락한 사람과 내용을 빠짐없이 말씀하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, state everyone you contacted before and after ${topic}, and what was said.`,
      ja: `${party}、${topic}の前後に連絡した相手と内容を漏れなく述べてください。`,
      'zh-CN': `${party}，请完整说明${topic}前后联系过的人和内容。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에서 본인에게 불리한 부분을 피하고 있습니다\. 그 부분까지 답하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, you are avoiding the part of ${topic} that is unfavorable to you. Answer that part as well.`,
      ja: `${party}、${topic}でご自身に不利な部分を避けています。その部分まで答えてください。`,
      'zh-CN': `${party}，你正在回避${topic}中对你不利的部分。请连同那部分一起回答。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 관해 지금 모른다고 넘길 수 없습니다\. 알고 있는 사실을 끝까지 말하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, you cannot dismiss ${topic} by saying you do not know. State every fact you know.`,
      ja: `${party}、${topic}について今「知らない」で済ませることはできません。知っている事実を最後まで述べてください。`,
      'zh-CN': `${party}，关于${topic}，现在不能用“不知道”带过。请把你知道的事实说完。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 그렇게 판단한 결정적 이유가 무엇이었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, what was the decisive reason you judged ${topic} that way?`,
      ja: `${party}、${topic}についてそのように判断した決定的な理由は何でしたか。`,
      'zh-CN': `${party}，你如此判断${topic}的决定性理由是什么？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시 다른 선택지를 생각해 보셨습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, did you consider another choice at the time of ${topic}?`,
      ja: `${party}、${topic}の当時、別の選択肢を考えましたか。`,
      'zh-CN': `${party}，在${topic}当时你考虑过其他选择吗？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에서 왜 하필 그 시점에 움직였는지 설명해 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, explain why you acted at that exact point in ${topic}.`,
      ja: `${party}、${topic}でなぜその時点に動いたのか説明してください。`,
      'zh-CN': `${party}，请说明你为什么偏偏在${topic}的那个时间点采取行动。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 관련해서 가장 먼저 지키려 했던 것은 무엇입니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, what were you trying to protect first in relation to ${topic}?`,
      ja: `${party}、${topic}に関して最初に守ろうとしたものは何ですか。`,
      'zh-CN': `${party}，关于${topic}，你最先想守住的是什么？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 누구의 말을 가장 크게 의식했습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, whose words weighed most on you regarding ${topic}?`,
      ja: `${party}、${topic}について誰の言葉を最も意識しましたか。`,
      'zh-CN': `${party}，关于${topic}，你最在意谁的话？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시 (.+?) 씨에게 바로 말하지 않은 이유가 있습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    const other = personAddress(match[3], locale)
    return out({
      en: `${party}, was there a reason you did not tell ${other} immediately during ${topic}?`,
      ja: `${party}、${topic}の当時、${other}にすぐ話さなかった理由はありますか。`,
      'zh-CN': `${party}，在${topic}当时，你没有马上告诉${other}是有原因的吗？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에서 손해를 감수하고도 그렇게 한 이유를 말씀해 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, explain why you did that in ${topic} even while accepting a loss.`,
      ja: `${party}、${topic}で損を引き受けてまでそうした理由を述べてください。`,
      'zh-CN': `${party}，请说明你在${topic}中即使承受损失也那样做的理由。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 숨기거나 미룬 이유가 있었다면 지금 말씀하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, if there was a reason you hid or delayed ${topic}, state it now.`,
      ja: `${party}、${topic}を隠したり先延ばしにした理由があったなら、今話してください。`,
      'zh-CN': `${party}，如果你隐瞒或推迟说明${topic}有原因，请现在说出来。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 본인이 옳다고 믿은 근거는 무엇이었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, what made you believe you were right about ${topic}?`,
      ja: `${party}、${topic}について自分が正しいと信じた根拠は何でしたか。`,
      'zh-CN': `${party}，关于${topic}，你相信自己是对的依据是什么？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시 가장 피하고 싶었던 결과가 무엇이었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, what outcome did you most want to avoid during ${topic}?`,
      ja: `${party}、${topic}の当時、最も避けたかった結果は何でしたか。`,
      'zh-CN': `${party}，在${topic}当时，你最想避免的结果是什么？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대한 이유를 계속 피해 가고 있습니다\. 왜 그렇게 했는지 직접 답하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, you keep avoiding the reason for ${topic}. Answer directly why you did it.`,
      ja: `${party}、${topic}の理由を避け続けています。なぜそうしたのか直接答えてください。`,
      'zh-CN': `${party}，你一直在回避${topic}的理由。请直接回答为什么那样做。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에서 본인을 보호하려 한 겁니까,\s*(.+?) 씨를 속이려 한 겁니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    const other = personAddress(match[3], locale)
    return out({
      en: `${party}, in ${topic}, were you protecting yourself or deceiving ${other}?`,
      ja: `${party}、${topic}では自分を守ろうとしたのですか、それとも${other}を欺こうとしたのですか。`,
      'zh-CN': `${party}，在${topic}中，你是在保护自己，还是在欺骗${other}？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 관련 사실을 숨긴 목적이 무엇이었는지 분명히 말씀하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, state clearly the purpose of hiding facts related to ${topic}.`,
      ja: `${party}、${topic}に関する事実を隠した目的が何だったのか、明確に述べてください。`,
      'zh-CN': `${party}，请明确说明隐瞒${topic}相关事实的目的是什么。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시 불리해질 것을 알고도 진행한 이유가 무엇입니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, why did you proceed with ${topic} even knowing it could work against you?`,
      ja: `${party}、${topic}の当時、不利になると分かっていながら進めた理由は何ですか。`,
      'zh-CN': `${party}，在${topic}当时，你明知会变得不利仍继续推进的理由是什么？`,
    })
  }

  match = /^(.+?) 씨에게 묻습니다,\s*(.+?)에서 책임을 피하려 한 의도가 있었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, did you intend to avoid responsibility in ${topic}?`,
      ja: `${party}に尋ねます。${topic}で責任を避けようとする意図はありましたか。`,
      'zh-CN': `${party}，请回答，你在${topic}中是否有逃避责任的意图？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 선의였다고만 말하지 마십시오\. 실제로 얻으려 한 것이 무엇입니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, do not simply say ${topic} was done in good faith. What were you actually trying to gain?`,
      ja: `${party}、${topic}について善意だったとだけ言わないでください。実際に得ようとしたものは何ですか。`,
      'zh-CN': `${party}，不要只说${topic}是出于善意。你实际想得到什么？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 지금까지 말하지 않은 이유가 변명인지 사정인지 구분해 말씀하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, distinguish whether your reason for not speaking about ${topic} until now was an excuse or a circumstance.`,
      ja: `${party}、${topic}について今まで話さなかった理由が弁解なのか事情なのか、区別して述べてください。`,
      'zh-CN': `${party}，请区分你至今没有说明${topic}的理由究竟是借口还是实际情况。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에서 가장 먼저 계산한 것은 돈입니까,\s*관계입니까,\s*체면입니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, in ${topic}, what did you weigh first: money, relationship, or face?`,
      ja: `${party}、${topic}で最初に計算したのはお金ですか、関係ですか、体面ですか。`,
      'zh-CN': `${party}，在${topic}中，你最先盘算的是钱、关系，还是面子？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 관련해서 상대가 알면 불리하다고 판단한 대목이 무엇입니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, what part of ${topic} did you think would hurt you if the other side knew?`,
      ja: `${party}、${topic}に関して、相手が知れば不利になると判断した箇所はどこですか。`,
      'zh-CN': `${party}，关于${topic}，你认为对方知道后会对你不利的是哪一部分？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 지금도 같은 선택을 했을 거라고 보십니까\? 그 이유까지 답하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, do you think you would still make the same choice about ${topic}? Answer with the reason as well.`,
      ja: `${party}、${topic}について今でも同じ選択をしたと思いますか。その理由まで答えてください。`,
      'zh-CN': `${party}，关于${topic}，你认为现在仍会作出同样选择吗？请连同理由一起回答。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시 가장 먼저 든 감정이 무엇이었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, what was the first emotion you felt during ${topic}?`,
      ja: `${party}、${topic}の当時、最初に浮かんだ感情は何でしたか。`,
      'zh-CN': `${party}，在${topic}当时，你最先产生的情绪是什么？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 이후에 밤에는 잠을 제대로 주무셨습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, after ${topic}, were you able to sleep properly at night?`,
      ja: `${party}、${topic}の後、夜はきちんと眠れましたか。`,
      'zh-CN': `${party}，在${topic}之后，你晚上睡得好吗？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 말하지 못한 마음이 있었다면 말씀해 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, if there was a feeling you could not express about ${topic}, please say it.`,
      ja: `${party}、${topic}について言えなかった気持ちがあるなら話してください。`,
      'zh-CN': `${party}，关于${topic}，如果有说不出口的感受，请说出来。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시 누구에게 가장 서운했습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, who hurt you most during ${topic}?`,
      ja: `${party}、${topic}の当時、誰に最も寂しさや不満を感じましたか。`,
      'zh-CN': `${party}，在${topic}当时，你最对谁感到失望？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에서 가장 두려웠던 일이 무엇이었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, what frightened you most in ${topic}?`,
      ja: `${party}、${topic}で最も恐れていたことは何でしたか。`,
      'zh-CN': `${party}，在${topic}中，你最害怕的是什么？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 이야기를 떠올리면 지금도 후회되는 장면이 있습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, when you think back on ${topic}, is there a moment you still regret?`,
      ja: `${party}、${topic}の話を思い出すと、今でも後悔する場面はありますか。`,
      'zh-CN': `${party}，回想${topic}时，现在仍有后悔的场面吗？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 (.+?) 씨가 알아주길 바랐던 마음이 있었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    const other = personAddress(match[3], locale)
    return out({
      en: `${party}, was there something about ${topic} that you wanted ${other} to understand?`,
      ja: `${party}、${topic}について${other}に分かってほしい気持ちはありましたか。`,
      'zh-CN': `${party}，关于${topic}，你是否希望${other}理解你的某种心情？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시 혼자 감당하려 했던 이유가 있습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, was there a reason you tried to bear ${topic} alone?`,
      ja: `${party}、${topic}の当時、一人で抱えようとした理由はありますか。`,
      'zh-CN': `${party}，在${topic}当时，你试图独自承受是有原因的吗？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 이야기를 하는 지금 가장 힘든 부분은 무엇입니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, what is the hardest part of talking about ${topic} now?`,
      ja: `${party}、${topic}について話している今、最もつらい部分は何ですか。`,
      'zh-CN': `${party}，现在谈起${topic}时，最难受的部分是什么？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 스스로도 인정하기 어려웠던 감정이 있었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, was there an emotion about ${topic} that was hard for even you to admit?`,
      ja: `${party}、${topic}について自分でも認めにくかった感情はありましたか。`,
      'zh-CN': `${party}，关于${topic}，是否有连你自己也难以承认的情绪？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 마음이 힘들다는 점은 알겠습니다\. 그래도 어떤 감정이 행동으로 이어졌는지 말씀하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, I understand ${topic} was emotionally difficult. Still, state which emotion led to action.`,
      ja: `${party}、${topic}について心がつらかったことは分かります。それでも、どの感情が行動につながったのか述べてください。`,
      'zh-CN': `${party}，我理解${topic}让你心里难受。但仍请说明是哪种情绪导致了行动。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 두려웠다는 말만으로는 부족합니다\. 무엇이 가장 두려웠는지 정확히 답하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, saying you were afraid about ${topic} is not enough. State exactly what you feared most.`,
      ja: `${party}、${topic}について怖かったというだけでは足りません。何が最も怖かったのか正確に答えてください。`,
      'zh-CN': `${party}，只说你害怕${topic}还不够。请准确回答你最害怕什么。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에서 상처받은 마음과 숨긴 사실을 나누어 말씀하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, separate the hurt you felt in ${topic} from the facts you hid.`,
      ja: `${party}、${topic}で傷ついた気持ちと隠した事実を分けて述べてください。`,
      'zh-CN': `${party}，请把你在${topic}中受伤的心情和隐瞒的事实分开说明。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 때문에 (.+?) 씨를 원망했다면 그 이유를 분명히 말하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    const other = personAddress(match[3], locale)
    return out({
      en: `${party}, if you resented ${other} because of ${topic}, state the reason clearly.`,
      ja: `${party}、${topic}のために${other}を恨んだのなら、その理由を明確に述べてください。`,
      'zh-CN': `${party}，如果你因${topic}而怨恨${other}，请明确说明理由。`,
    })
  }

  match = /^(.+?) 씨에게 묻습니다,\s*(.+?) 당시 죄책감이 있었습니까,\s*아니면 억울함이 더 컸습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, during ${topic}, did you feel guilt, or was your sense of unfairness stronger?`,
      ja: `${party}に尋ねます。${topic}の当時、罪悪感がありましたか、それとも悔しさの方が大きかったですか。`,
      'zh-CN': `${party}，请回答，在${topic}当时你有负罪感，还是委屈更强？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 감정 뒤에 숨어서는 안 됩니다\. 그 감정이 어떤 선택을 낳았습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, you cannot hide behind emotion about ${topic}. What choice did that emotion produce?`,
      ja: `${party}、${topic}について感情の陰に隠れてはいけません。その感情はどんな選択につながりましたか。`,
      'zh-CN': `${party}，关于${topic}，你不能躲在情绪后面。那种情绪导致了怎样的选择？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 이야기를 떠올리기 싫더라도 지금은 답해야 합니다\. 가장 후회되는 대목을 말하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, even if you do not want to revisit ${topic}, you must answer now. State what you regret most.`,
      ja: `${party}、${topic}を思い出したくなくても、今は答えなければなりません。最も後悔している点を述べてください。`,
      'zh-CN': `${party}，即使你不愿回想${topic}，现在也必须回答。请说出最后悔的部分。`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에서 본인이 상처받은 만큼 상대도 다쳤다는 점을 알고 있었습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, in ${topic}, did you know the other side was hurt as much as you were?`,
      ja: `${party}、${topic}で自分が傷ついた分、相手も傷ついたと分かっていましたか。`,
      'zh-CN': `${party}，在${topic}中，你是否知道对方也像你一样受了伤？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?)에 대해 미안함이 있었다면 왜 그때 말하지 않았습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, if you felt sorry about ${topic}, why did you not say so then?`,
      ja: `${party}、${topic}について申し訳なさがあったなら、なぜその時言わなかったのですか。`,
      'zh-CN': `${party}，如果你对${topic}感到抱歉，为什么当时没有说？`,
    })
  }

  match = /^(.+?) 씨,\s*(.+?) 당시의 마음을 말하되,\s*책임질 부분을 흐리지 말고 답하십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    const topic = softLocalize(match[2], locale)
    return out({
      en: `${party}, describe how you felt during ${topic}, but do not blur the part you are responsible for.`,
      ja: `${party}、${topic}当時の気持ちを話しつつ、責任を負う部分を曖昧にせず答えてください。`,
      'zh-CN': `${party}，请说明${topic}当时的心情，但不要模糊你应承担责任的部分。`,
    })
  }

  match = /^(.+?) 씨,\s*그 시간대에 정확히 어디에 계셨는지 다시 한번 말씀해 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    return out({
      en: `${party}, state once more exactly where you were during that time period.`,
      ja: `${party}、その時間帯に正確にどこにいたのか、もう一度述べてください。`,
      'zh-CN': `${party}，请再说明一次你在那个时间段准确在哪里。`,
    })
  }

  match = /^(.+?) 씨,\s*지금 하시는 말씀은 다른 당사자에게 공개하지 않겠습니다\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    return out({
      en: `${party}, what you say now will not be disclosed to the other party.`,
      ja: `${party}、今の発言は他の当事者には公開しません。`,
      'zh-CN': `${party}，你现在所说的内容不会向另一方公开。`,
    })
  }

  match = /^상대측은 발언을 중단해 주십시오\.$/.exec(value)
  if (match) {
    return out({
      en: 'The other side will stop speaking.',
      ja: '相手側は発言を中止してください。',
      'zh-CN': '请对方停止发言。',
    })
  }

  match = /^(.+?) 씨,\s*방금 전 답변과 지금 말씀이 조금 다른 것 같습니다\. 정리해 주시겠습니까\?$/.exec(value)
    ?? /^(.+?) 씨,\s*아까 하신 말씀과 지금 말씀 사이에 차이가 있습니다\. 혹시 빠뜨린 부분이 있으신 겁니까\?$/.exec(value)
    ?? /^(.+?) 씨,\s*이 부분에 대해 처음 답변하셨을 때와 지금 말씀이 좀 다릅니다\. 왜 달라졌는지 설명해 주시겠습니까\?$/.exec(value)
    ?? /^(.+?) 씨,\s*처음 하신 말씀과 지금 흐름이 좀 다릅니다\. 어떤 부분에서 생각이 바뀌신 건지 말씀해 주십시오\.$/.exec(value)
    ?? /^(.+?) 씨,\s*같은 사안에 대해 두 번 다르게 말씀하셨습니다\. 기억을 정리해 주시겠습니까\?$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    return out({
      en: `${party}, your current statement differs from your earlier answer. Please clarify what changed.`,
      ja: `${party}、現在の発言は先ほどの回答と異なります。何が変わったのか整理してください。`,
      'zh-CN': `${party}，你现在的说法与先前回答不同。请说明哪里发生了变化。`,
    })
  }

  match = /^(.+?) 씨,\s*아까 하신 말씀과 지금 하시는 말씀이 맞지 않습니다\. 어느 쪽이 사실입니까\?$/.exec(value)
    ?? /^(.+?) 씨,\s*진술이 바뀌고 있습니다\. 처음 말씀을 유지하시는 겁니까,\s*지금 말씀이 맞는 겁니까\?$/.exec(value)
    ?? /^(.+?) 씨,\s*이 쟁점에 대해 처음 답변과 지금 답변이 다릅니다\. 무엇 때문에 바뀐 겁니까\?$/.exec(value)
    ?? /^(.+?) 씨,\s*앞뒤가 맞지 않습니다\. 정확히 말씀해 주십시오\.$/.exec(value)
    ?? /^(.+?) 씨,\s*이전 답변과 지금 답변 사이에 모순이 있습니다\. 이 차이를 넘기기 어렵습니다\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    return out({
      en: `${party}, the earlier and current answers do not align. Which one is true?`,
      ja: `${party}、以前の回答と現在の回答が合いません。どちらが事実ですか。`,
      'zh-CN': `${party}，此前回答和现在回答不一致。哪一个才是事实？`,
    })
  }

  match = /^(.+?) 씨,\s*지금 하시는 말씀은 아까와 완전히 다릅니다\. 어느 쪽이 진실입니까\?$/.exec(value)
    ?? /^(.+?) 씨,\s*더 이상 넘어갈 수 없습니다\. 처음 하신 말씀과 지금 말씀이 정면으로 충돌합니다\.$/.exec(value)
    ?? /^(.+?) 씨,\s*진술이 크게 바뀌었습니다\. 왜 달라졌습니까\?$/.exec(value)
    ?? /^(.+?) 씨,\s*처음 하신 말과 지금 말 중 어느 쪽이 사실입니까\? 분명히 답하십시오\.$/.exec(value)
    ?? /^(.+?) 씨,\s*말씀이 계속 바뀌고 있습니다\. 이제 정확히 해 주십시오\.$/.exec(value)
  if (match) {
    const party = personAddress(match[1], locale)
    return out({
      en: `${party}, your statement has changed sharply. Answer clearly which version is true.`,
      ja: `${party}、発言が大きく変わっています。どちらが事実なのか明確に答えてください。`,
      'zh-CN': `${party}，你的说法出现明显变化。请明确回答哪一个版本才是真实的。`,
    })
  }

  return null
}

function applyPatterns(value: string, locale: Exclude<LocaleCode, 'ko'>): string {
  const trimmed = value.trim()
  const exactValue = exact(trimmed, locale)
  if (exactValue) return value.replace(trimmed, exactValue)

  const generatedJudgeQuestion = localizeGeneratedJudgeQuestion(trimmed, locale)
  if (generatedJudgeQuestion) return value.replace(trimmed, generatedJudgeQuestion)

  if (trimmed.includes(' / ')) {
    const localizedParts = trimmed.split(/\s+\/\s+/).map((part) => localizeRuntimeText(part, locale))
    const joined = localizedParts.join(' / ')
    if (joined !== trimmed) return value.replace(trimmed, joined)
  }

  let match: RegExpMatchArray | null = /^(…|\.\.\.)\s*(.+)$/.exec(trimmed)
  if (match) {
    const body = localizeRuntimeText(match[2], locale)
    return value.replace(trimmed, `${match[1]}${body}`)
  }

  match = /^(\d+)단계\s*→\s*(\d+)단계$/.exec(trimmed)
  if (match) {
    const [, from, to] = match
    return ({
      en: `Stage ${from} → Stage ${to}`,
      ja: `${from}段階 → ${to}段階`,
      'zh-CN': `第 ${from} 阶段 → 第 ${to} 阶段`,
    } as LocaleText)[locale]
  }

  match = /^(\d+)단계$/.exec(trimmed)
  if (match) {
    const stage = match[1]
    return ({
      en: `Stage ${stage}`,
      ja: `${stage}段階`,
      'zh-CN': `第 ${stage} 阶段`,
    } as LocaleText)[locale]
  }

  match = /^선행:\s+"(.+?)"\s+추궁 필요$/.exec(trimmed)
  if (match) {
    const dispute = softLocalize(match[1], locale)
    return ({
      en: `Prerequisite: press "${dispute}" first`,
      ja: `前提：「${dispute}」を先に追及する必要があります`,
      'zh-CN': `前置条件：需要先追问“${dispute}”`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 방어가 무너졌습니다$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject}'s defense has collapsed.`,
      ja: `${subject}の防御が崩れました。`,
      'zh-CN': `${subject}的防线已瓦解。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*끼어들기$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} Interjection`,
      ja: `${subject}の割り込み`,
      'zh-CN': `${subject}插话`,
    } as LocaleText)[locale]
  }

  match = /^제시는 취소합니다\. 다시 구성해서 제시하세요\.$/.exec(trimmed)
  if (match) {
    return ({
      en: 'The presentation is withdrawn. Rebuild and present it again.',
      ja: '提示は取り消します。構成し直して提示してください。',
      'zh-CN': '提交已撤回。请重新组织后再提交。',
    } as LocaleText)[locale]
  }

  match = /^이제\s+"(.+?)"(?:을|를)\s*별도 쟁점으로 추적합니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Now tracking "${subject}" as a separate dispute.`,
      ja: `これから「${subject}」を別個の争点として追跡します。`,
      'zh-CN': `现在将“${subject}”作为单独争议追踪。`,
    } as LocaleText)[locale]
  }

  match = /^조사\s*(\d+)단계$/.exec(trimmed)
  if (match) {
    const stage = match[1]
    return ({
      en: `Investigation Stage ${stage}`,
      ja: `調査${stage}段階`,
      'zh-CN': `调查第 ${stage} 阶段`,
    } as LocaleText)[locale]
  }

  match = /^조사\s*(\d+)단계에는 조사 토큰\s*(\d+)개가 필요합니다\.$/.exec(trimmed)
  if (match) {
    const [, stage, count] = match
    return ({
      en: `Investigation Stage ${stage} requires ${count} investigation token${count === '1' ? '' : 's'}.`,
      ja: `調査${stage}段階には調査トークン${count}個が必要です。`,
      'zh-CN': `调查第 ${stage} 阶段需要 ${count} 个调查令牌。`,
    } as LocaleText)[locale]
  }

  match = /^조사\s*(\d+)단계 답변은 이미 받았습니다\. 다음 조사 단계가 열리면 다시 제시할 수 있습니다\.$/.exec(trimmed)
  if (match) {
    const stage = match[1]
    return ({
      en: `Investigation Stage ${stage} has already been answered. Present it again when the next investigation stage opens.`,
      ja: `調査${stage}段階の回答はすでに受けています。次の調査段階が開いたら再度提示できます。`,
      'zh-CN': `调查第 ${stage} 阶段的回答已经取得。下一调查阶段开启后可再次提交。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)에서\s*(.+?)(?:을|를)\s*추가로 확인할 대목이 생겼습니다\.$/.exec(trimmed)
  if (match) {
    const [, subject, content] = match
    const source = softLocalize(subject, locale)
    const what = localizeContentPhrase(content, locale)
    return ({
      en: `Additional points now need checking in ${source}: ${what}.`,
      ja: `${source}で追加確認すべき点が生じました: ${what}。`,
      'zh-CN': `${source}中出现了需要追加确认的内容：${what}。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)에서\s*(.+?)(?:을|를)\s*대조할 대목이 생겼습니다\.$/.exec(trimmed)
  if (match) {
    const [, subject, content] = match
    const source = softLocalize(subject, locale)
    const what = localizeContentPhrase(content, locale)
    return ({
      en: `A point now needs comparison in ${source}: ${what}.`,
      ja: `${source}で照合すべき点が生じました: ${what}。`,
      'zh-CN': `${source}中出现了需要对照的内容：${what}。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)에서\s*(.+?)(?:을|를)\s*확인할 대목이 생겼습니다\.$/.exec(trimmed)
  if (match) {
    const [, subject, content] = match
    const source = softLocalize(subject, locale)
    const what = localizeContentPhrase(content, locale)
    return ({
      en: `A point now needs verification in ${source}: ${what}.`,
      ja: `${source}で確認すべき点が生じました: ${what}。`,
      'zh-CN': `${source}中出现了需要确认的内容：${what}。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)에서 추가로 확인할 대목이 생겼습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Additional points now need checking in ${subject}.`,
      ja: `${subject}で追加確認すべき点が生じました。`,
      'zh-CN': `${subject}中出现了需要追加确认的内容。`,
    } as LocaleText)[locale]
  }

  match = /^이 (.+?)만으로는 현재 쟁점을 직접 판단하기 어렵습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `This ${subject} alone is not enough to judge the current dispute directly.`,
      ja: `この${subject}だけでは現在の争点を直接判断するのは困難です。`,
      'zh-CN': `仅凭这项${subject}难以直接判断当前争议。`,
    } as LocaleText)[locale]
  }

  match = /^이 (.+?)만으로는 방금 진술을 직접 뒤집기 어렵습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `This ${subject} alone is not enough to directly overturn the latest statement.`,
      ja: `この${subject}だけでは直前の陳述を直接覆すのは困難です。`,
      'zh-CN': `仅凭这项${subject}难以直接推翻刚才的陈述。`,
    } as LocaleText)[locale]
  }

  match = /^이 (.+?)은 방금 진술과 맞지 않습니다\. 확인 범위를 다시 짚겠습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `This ${subject} does not match the latest statement. I will revisit the verification scope.`,
      ja: `この${subject}は直前の陳述と合いません。確認範囲をもう一度整理します。`,
      'zh-CN': `这项${subject}与刚才的陈述不符。我会重新梳理确认范围。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)에 비추어,\s*방금 진술은 그대로 받아들이기 어렵습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `In light of ${subject}, the latest statement is difficult to accept as is.`,
      ja: `${subject}に照らすと、直前の陳述はそのまま受け入れにくいです。`,
      'zh-CN': `根据${subject}，刚才的陈述难以照单接受。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 관련성을 현재 쟁점과 별도로 검토합니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} will be reviewed separately from the current dispute.`,
      ja: `${subject}の関連性を現在の争点とは別に検討します。`,
      'zh-CN': `${subject}的关联性将与当前争议分开审查。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*진실 단계 (?:번호|변화)로 확보되었습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} was secured as a truth-stage clue.`,
      ja: `${subject}が真実段階の手がかりとして確保されました。`,
      'zh-CN': `${subject}已作为真相阶段线索取得。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*좌측 증거 목록에 추가되었습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} has been added to the evidence notebook.`,
      ja: `${subject}が証拠ノートに追加されました。`,
      'zh-CN': `${subject}已加入证据笔记。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*조사 결과로 확보되었습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} was secured through the investigation result.`,
      ja: `${subject}が調査結果として確保されました。`,
      'zh-CN': `${subject}已通过调查结果取得。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*심문 중 새 증거로 확보되었습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} was secured as new evidence during interrogation.`,
      ja: `${subject}が尋問中に新証拠として確保されました。`,
      'zh-CN': `${subject}已在询问中作为新证据取得。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*붕괴 보상으로 확보되었습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} was secured as a collapse reward.`,
      ja: `${subject}が崩壊報酬として確保されました。`,
      'zh-CN': `${subject}已作为瓦解奖励取得。`,
    } as LocaleText)[locale]
  }

  match = /^관련 쟁점:\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Related Dispute: ${subject}`,
      ja: `関連争点: ${subject}`,
      'zh-CN': `相关争议：${subject}`,
    } as LocaleText)[locale]
  }

  match = /^연결 쟁점:\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Linked Dispute: ${subject}`,
      ja: `連結争点: ${subject}`,
      'zh-CN': `关联争议：${subject}`,
    } as LocaleText)[locale]
  }

  match = /^새 정보:\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `New Information: ${subject}`,
      ja: `新情報: ${subject}`,
      'zh-CN': `新信息：${subject}`,
    } as LocaleText)[locale]
  }

  match = /^중요도:\s*(.+)$/.exec(trimmed)
  if (match) {
    const value = softLocalize(match[1], locale)
    return ({
      en: `Importance: ${value}`,
      ja: `重要度: ${value}`,
      'zh-CN': `重要度：${value}`,
    } as LocaleText)[locale]
  }

  match = /^모호성:\s*(.+)$/.exec(trimmed)
  if (match) {
    const value = softLocalize(match[1], locale)
    return ({
      en: `Ambiguity: ${value}`,
      ja: `曖昧さ: ${value}`,
      'zh-CN': `模糊度：${value}`,
    } as LocaleText)[locale]
  }

  match = /^필요 증거:\s*(\d+)개$/.exec(trimmed)
  if (match) {
    const count = match[1]
    return ({
      en: `Required Evidence: ${count}`,
      ja: `必要証拠: ${count}件`,
      'zh-CN': `所需证据：${count}个`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*-\s*(.+?)를 제시합니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    const stage = softLocalize(match[2], locale)
    return ({
      en: `${subject} — ${stage} is presented.`,
      ja: `${subject} — ${stage}を提示します。`,
      'zh-CN': `提交${subject} — ${stage}。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*[—-]\s*(.+?)를 제시합니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    const stage = softLocalize(match[2], locale)
    return ({
      en: `${subject} — ${stage} is presented.`,
      ja: `${subject} — ${stage}を提示します。`,
      'zh-CN': `提交${subject} — ${stage}。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 주장이 더 설득력 있습니다$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `${party}'s claim is more persuasive`,
      ja: `${party}の主張の方が説得力があります`,
      'zh-CN': `${party}的主张更有说服力`,
    } as LocaleText)[locale]
  }

  match = /^양쪽 모두 일부만 사실입니다$/.exec(trimmed)
  if (match) {
    return ({
      en: 'Both sides are only partly true',
      ja: '双方とも一部だけが事実です',
      'zh-CN': '双方都只有部分属实',
    } as LocaleText)[locale]
  }

  match = /^지금은 보류\s*\(나중에 다시 판단\)$/.exec(trimmed)
  if (match) {
    return ({
      en: 'Defer for now (judge again later)',
      ja: '今は保留（後で再判断）',
      'zh-CN': '暂时保留（稍后重新判断）',
    } as LocaleText)[locale]
  }

  match = /^증거 제시:\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Evidence Presented: ${subject}`,
      ja: `証拠提示: ${subject}`,
      'zh-CN': `提交证据：${subject}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)에게 증거 제시(?:\s*·\s*조사\s*(\d+)단계)?$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const stage = match[2]
    return ({
      en: `Present evidence to ${party}${stage ? ` · Investigation Stage ${stage}` : ''}`,
      ja: `${party}に証拠提示${stage ? ` · 調査${stage}段階` : ''}`,
      'zh-CN': `向${party}提交证据${stage ? ` · 调查第 ${stage} 阶段` : ''}`,
    } as LocaleText)[locale]
  }

  match = /^조사\s*(\d+)단계 답변은 이미 받았습니다\. 다음 조사 단계가 열리면 다시 제시할 수 있습니다\.$/.exec(trimmed)
  if (match) {
    const stage = match[1]
    return ({
      en: `The Investigation Stage ${stage} answer has already been received. You can present it again when the next investigation stage opens.`,
      ja: `調査${stage}段階の回答はすでに受けています。次の調査段階が開いたら再提示できます。`,
      'zh-CN': `调查第 ${stage} 阶段的回答已经收到。下一调查阶段开启后可以再次提交。`,
    } as LocaleText)[locale]
  }

  match = /^🔍\s*새로운 쟁점 발견:\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `New dispute found: ${subject}`,
      ja: `新しい争点を発見: ${subject}`,
      'zh-CN': `发现新争议：${subject}`,
    } as LocaleText)[locale]
  }

  match = /^새 쟁점이 드러났다\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `A new dispute emerged — ${subject}`,
      ja: `新しい争点が浮上 — ${subject}`,
      'zh-CN': `新争议浮现 — ${subject}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s+이제\s+"(.+?)"(?:을|를)\s*별도 쟁점으로 추적합니다\.$/.exec(trimmed)
  if (match) {
    const routeLine = softLocalize(match[1], locale)
    const subject = softLocalize(match[2], locale)
    return ({
      en: `${routeLine} Now tracking "${subject}" as a separate dispute.`,
      ja: `${routeLine} これから「${subject}」を別個の争点として追跡します。`,
      'zh-CN': `${routeLine} 现在将“${subject}”作为单独争议追踪。`,
    } as LocaleText)[locale]
  }

  match = /^"(.+?)"(?:이|가)\s*별도 쟁점으로 추가되었습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `"${subject}" has been added as a separate dispute.`,
      ja: `「${subject}」が別個の争点として追加されました。`,
      'zh-CN': `“${subject}”已作为单独争议添加。`,
    } as LocaleText)[locale]
  }

  match = /^새로운 증거를 손에 넣었다\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `New evidence acquired — ${subject}`,
      ja: `新証拠を入手 — ${subject}`,
      'zh-CN': `取得新证据 — ${subject}`,
    } as LocaleText)[locale]
  }

  match = /^(?:새 쟁점|New Dispute)\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `New Dispute — ${subject}`,
      ja: `新しい争点 — ${subject}`,
      'zh-CN': `新争议 — ${subject}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\.\s*관련 증거\s*(\d+)개와 증인\/발언을 대조해 사실관계를 확정합니다\.\s*절차상 책임이나 위법성도 별도 판단해야 합니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    const count = match[2]
    return ({
      en: `${subject}. Compare ${count} related evidence item${count === '1' ? '' : 's'} with witness or statement records to establish the facts. Procedural responsibility or illegality must also be judged separately.`,
      ja: `${subject}。関連証拠${count}件と証人・発言を照合して事実関係を確定します。手続上の責任や違法性も別途判断する必要があります。`,
      'zh-CN': `${subject}。将 ${count} 个相关证据与证人或发言对照，以确认事实关系。程序责任或违法性也需要另行判断。`,
    } as LocaleText)[locale]
  }

  match = /^관련 증거\s*(\d+)개와 증인\/발언을 대조해 사실관계를 확정합니다\.$/.exec(trimmed)
  if (match) {
    const count = match[1]
    return ({
      en: `Compare ${count} related evidence item${count === '1' ? '' : 's'} with witness or statement records to establish the facts.`,
      ja: `関連証拠${count}件と証人・発言を照合して事実関係を確定します。`,
      'zh-CN': `将 ${count} 个相关证据与证人或发言对照，以确认事实关系。`,
    } as LocaleText)[locale]
  }

  match = /^새(?:로운)? 증거:\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `New Evidence: ${subject}`,
      ja: `新証拠: ${subject}`,
      'zh-CN': `新证据：${subject}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:을|를)\s*중심으로 양측 설명이 어디서 갈라지는지 확인합니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Check where both explanations diverge around ${subject}.`,
      ja: `${subject}を中心に、双方の説明がどこで分かれるか確認します。`,
      'zh-CN': `围绕${subject}确认双方说明在哪处分歧。`,
    } as LocaleText)[locale]
  }

  match = /^조합 결과:\s*(.+?)(?:\n(.+))?$/.exec(trimmed)
  if (match) {
    const label = softLocalize(match[1], locale)
    const summary = match[2] ? `\n${softLocalize(match[2], locale)}` : ''
    return ({
      en: `Combination Result: ${label}${summary}`,
      ja: `組み合わせ結果: ${label}${summary}`,
      'zh-CN': `组合结果：${label}${summary}`,
    } as LocaleText)[locale]
  }

  match = /^증거 조합 격상!\s*(.+?)\s*→\s*"(.+?)"\s*신뢰도 Hard 확정$/.exec(trimmed)
  if (match) {
    const evidenceNames = match[1].split(/\s*\+\s*/).map((item) => softLocalize(item, locale)).join(' + ')
    const disputeNames = match[2].split(/\s*,\s*/).map((item) => softLocalize(item, locale)).join(', ')
    return ({
      en: `Evidence combination upgraded! ${evidenceNames} → "${disputeNames}" Reliability confirmed as Hard`,
      ja: `証拠の組み合わせが格上げされました！${evidenceNames} →「${disputeNames}」信頼度Hard確定`,
      'zh-CN': `证据组合已升级！${evidenceNames} → “${disputeNames}” 可信度确认为 Hard`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)로 확인한 모순$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Contradiction confirmed with ${subject}`,
      ja: `${subject}で確認した矛盾`,
      'zh-CN': `通过 ${subject} 确认的矛盾`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*제시 성공$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} Presentation Succeeded`,
      ja: `${subject}の提示成功`,
      'zh-CN': `${subject}提交成功`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*제시는 취소합니다\. 다시 구성해서 제시하세요\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} presentation is withdrawn. Rebuild and present it again.`,
      ja: `${subject}の提示は取り消します。構成し直して提示してください。`,
      'zh-CN': `${subject}的提交已撤回。请重新组织后再提交。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 제시 관점을 조정해 패널티를 줄였습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Adjusted the presentation angle for ${subject} and reduced the penalty.`,
      ja: `${subject}の提示観点を調整し、ペナルティを軽減しました。`,
      'zh-CN': `已调整 ${subject} 的提交角度并降低惩罚。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*제시$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} Presented`,
      ja: `${subject}を提示`,
      'zh-CN': `已提交 ${subject}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*[—-]\s*(균열|궁지|개방|시인):\s*(.+?)\s*→\s*(.+)$/.exec(trimmed)
  if (match) {
    const [, subject, label, from, to] = match
    return `${softLocalize(subject, locale)} — ${phrase(label, locale)}: ${phrase(from.trim(), locale)} → ${phrase(to.trim(), locale)}`
  }

  match = /^거짓말 단계\s*(.+?)\s*→\s*(.+)$/.exec(trimmed)
  if (match) {
    return ({
      en: `Lie Stage ${match[1]} → ${match[2]}`,
      ja: `嘘段階 ${match[1]} → ${match[2]}`,
      'zh-CN': `谎言阶段 ${match[1]} → ${match[2]}`,
    } as LocaleText)[locale]
  }

  match = /^감정\s*([+-]\d+)$/.exec(trimmed)
  if (match) {
    return ({
      en: `Emotion ${match[1]}`,
      ja: `感情 ${match[1]}`,
      'zh-CN': `情绪 ${match[1]}`,
    } as LocaleText)[locale]
  }

  match = /^감정\s+(?!변화:)(.+?)\s*→\s*(.+)$/.exec(trimmed)
  if (match) {
    const from = phrase(match[1].trim(), locale)
    const to = phrase(match[2].trim(), locale)
    return ({
      en: `Emotion ${from} → ${to}`,
      ja: `感情 ${from} → ${to}`,
      'zh-CN': `情绪 ${from} → ${to}`,
    } as LocaleText)[locale]
  }

  match = /^감정 변화:\s*(.+?)\s+(\d+)\s*→\s*(.+?)\s+(\d+)$/.exec(trimmed)
  if (match) {
    const [, from, fromValue, to, toValue] = match
    const fromLabel = phrase(from.trim(), locale)
    const toLabel = phrase(to.trim(), locale)
    return ({
      en: `Emotion Change: ${fromLabel} ${fromValue} → ${toLabel} ${toValue}`,
      ja: `感情変化: ${fromLabel} ${fromValue} → ${toLabel} ${toValue}`,
      'zh-CN': `情绪变化：${fromLabel} ${fromValue} → ${toLabel} ${toValue}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 감정 변화:\s*(.+?)\s*→\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    const from = phrase(match[2].trim(), locale)
    const to = phrase(match[3].trim(), locale)
    return ({
      en: `${subject}'s emotion changed: ${from} → ${to}`,
      ja: `${subject}の感情変化: ${from} → ${to}`,
      'zh-CN': `${subject}的情绪变化：${from} → ${to}`,
    } as LocaleText)[locale]
  }

  match = /^격앙 진입:\s*다음\s*(\d+)턴 동안 질문 차단$/.exec(trimmed)
  if (match) {
    const turns = match[1]
    return ({
      en: `Agitation Entered: Questions blocked for the next ${turns} turns`,
      ja: `高ぶり突入: 次の${turns}ターンは質問不可`,
      'zh-CN': `进入激动：接下来 ${turns} 回合无法提问`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*씨,\s*(.+?)(?:을|를)\s*바로 말하지 못한 이유를 본인 판단 중심으로 말씀해 주십시오\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const subject = softLocalize(match[2], locale)
    return ({
      en: `${party}, explain from your own judgment why you could not address ${subject} directly.`,
      ja: `${party}さん、${subject}をすぐに話せなかった理由を、ご自身の判断を中心に説明してください。`,
      'zh-CN': `${party}，请以你自己的判断为中心说明为什么没能直接说出${subject}。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)에서 망설였던 지점과 실제로 한 선택을 나눠 설명해 주십시오\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Separate where you hesitated on ${subject} from the choice you actually made.`,
      ja: `${subject}でためらった点と、実際に取った選択を分けて説明してください。`,
      'zh-CN': `请分开说明你在${subject}上犹豫的地方，以及实际作出的选择。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:을|를)\s*숨기거나 늦춘 판단이 있었다면, 그 판단이 어디서 시작됐는지 말씀해 주십시오\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `If there was a decision to hide or delay ${subject}, explain where that decision began.`,
      ja: `${subject}を隠したり遅らせたりする判断があったなら、その判断がどこから始まったのか話してください。`,
      'zh-CN': `如果曾决定隐瞒或推迟说明${subject}，请说明这个判断从哪里开始。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:을|를)\s*두고 상대가 오해한 부분과 본인이 책임질 부분을 분리해 주십시오\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Separate what the other party misunderstood about ${subject} from what you are responsible for.`,
      ja: `${subject}について相手が誤解した部分と、ご自身が責任を負う部分を分けてください。`,
      'zh-CN': `请分清对方对${subject}的误解，以及你本人应承担责任的部分。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*씨,\s*(.+?)(?:을|를)\s*처음부터 꺼내지 못한 사정을 기록에 맞춰 말씀해 주십시오\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const subject = softLocalize(match[2], locale)
    return ({
      en: `${party}, explain according to the record why you could not bring up ${subject} from the beginning.`,
      ja: `${party}さん、${subject}を最初から切り出せなかった事情を記録に沿って話してください。`,
      'zh-CN': `${party}，请根据记录说明为什么一开始没能提出${subject}。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*씨,\s*(.+?)(?:을|를)\s*떠올릴 때 가장 먼저 걸리는 마음부터 차분히 말씀해 주십시오\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const subject = softLocalize(match[2], locale)
    return ({
      en: `${party}, when you think of ${subject}, calmly start with the feeling that weighs on you first.`,
      ja: `${party}さん、${subject}を思い浮かべるとき、まず引っかかる気持ちから落ち着いて話してください。`,
      'zh-CN': `${party}，想到${subject}时，请先从最放不下的感受开始冷静说明。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:을|를)\s*설명하는 과정에서 마음이 흔들린 순간이 있었다면 그 장면부터 말씀해 주십시오\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `If your feelings wavered while explaining ${subject}, start with that moment.`,
      ja: `${subject}を説明する中で気持ちが揺れた瞬間があったなら、その場面から話してください。`,
      'zh-CN': `如果在说明${subject}的过程中情绪有过动摇，请从那个场面说起。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*상대에게 어떻게 받아들여졌는지, 지금 먼저 설명하고 싶은 부분을 말씀해 주십시오\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Explain first how you think ${subject} was received by the other party.`,
      ja: `${subject}が相手にどう受け止められたのか、今まず説明したい部分を話してください。`,
      'zh-CN': `请先说明你认为${subject}被对方如何理解，以及现在最想先解释的部分。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:을|를)\s*늦게 말한 이유가 두려움 때문이었는지 설명해 주십시오\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Explain whether fear is why you spoke about ${subject} late.`,
      ja: `${subject}を遅れて話した理由が恐れだったのか説明してください。`,
      'zh-CN': `请说明你迟迟才说出${subject}，是否是因为害怕。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*씨,\s*(.+?)(?:과|와)\s*관련해 지금 바로잡고 싶은 말이 있다면 말씀하십시오\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const subject = softLocalize(match[2], locale)
    return ({
      en: `${party}, if there is anything you want to correct now about ${subject}, say it.`,
      ja: `${party}さん、${subject}について今訂正したいことがあれば話してください。`,
      'zh-CN': `${party}，关于${subject}，如果现在有想纠正的话，请说出来。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*씨,\s*(.+?)에서 본인이 직접 확인한 장면부터 시간순으로 말씀해 주십시오\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const subject = softLocalize(match[2], locale)
    return ({
      en: `${party}, start with the scene you directly verified in ${subject}, in chronological order.`,
      ja: `${party}さん、${subject}でご自身が直接確認した場面から時系列で話してください。`,
      'zh-CN': `${party}，请从你在${subject}中直接确认的场面开始，按时间顺序说明。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*씨,\s*(.+?)(?:과|와)\s*관련해 본인이 직접 한 행동과 나중에 알게 된 일을 나눠 말씀해 주십시오\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const subject = softLocalize(match[2], locale)
    return ({
      en: `${party}, separate what you personally did about ${subject} from what you learned later.`,
      ja: `${party}さん、${subject}に関してご自身が直接した行動と、後から知ったことを分けて話してください。`,
      'zh-CN': `${party}，请分开说明关于${subject}你本人直接做过的事，以及后来才知道的事。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:을|를)\s*상대가 다르게 받아들인 이유가 무엇인지, 확인된 장면 중심으로 설명해 주십시오\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Explain why the other party understood ${subject} differently, focusing on verified scenes.`,
      ja: `${subject}を相手が違って受け止めた理由を、確認済みの場面を中心に説明してください。`,
      'zh-CN': `请以已确认的场面为中心说明，对方为什么会不同地理解${subject}。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)에서 빠뜨렸거나 늦게 설명한 사실이 있다면 그 시점부터 말씀해 주십시오\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `If there is a fact you omitted or explained late in ${subject}, start from that point.`,
      ja: `${subject}で抜けていた事実や遅れて説明した事実があるなら、その時点から話してください。`,
      'zh-CN': `如果在${subject}中有遗漏或迟迟才说明的事实，请从那个时间点开始说明。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*씨,\s*(.+?)(?:을|를)\s*판단하려면 먼저 무엇을 확인해야 하는지 답해 주십시오\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const subject = softLocalize(match[2], locale)
    return ({
      en: `${party}, answer what must be checked first to judge ${subject}.`,
      ja: `${party}さん、${subject}を判断するにはまず何を確認すべきか答えてください。`,
      'zh-CN': `${party}，请回答要判断${subject}，首先必须确认什么。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?) 씨,\s*아까 하신 말씀과 지금 말씀이 다릅니다\. 어느 쪽이 맞습니까\?$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `${party}, what you said earlier and what you are saying now differ. Which is correct?`,
      ja: `${party}さん、先ほどの発言と今の発言が違います。どちらが正しいのですか。`,
      'zh-CN': `${party}，你之前说的话和现在说的不一样。哪一边是正确的？`,
    } as LocaleText)[locale]
  }

  match = /^(.+?) 씨,\s*방금 답변이 앞선 진술과 맞지 않습니다\. 정확히 말씀해 주십시오\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `${party}, that answer does not match your earlier statement. Please state it accurately.`,
      ja: `${party}さん、今の回答は先ほどの陳述と合いません。正確に話してください。`,
      'zh-CN': `${party}，刚才的回答与此前陈述不一致。请准确说明。`,
    } as LocaleText)[locale]
  }

  match = /^결정적 모순이 드러났다\.\s*(.+?)의 방어가 크게 흔들린다\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `A critical contradiction has surfaced. ${party}'s defense is shaken hard.`,
      ja: `決定的な矛盾が明らかになりました。${party}の防御が大きく揺らぎます。`,
      'zh-CN': `关键矛盾已经暴露。${party}的防线明显动摇。`,
    } as LocaleText)[locale]
  }

  match = /^💥\s*모순 추궁이 통했습니다\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const summary = match[1].split(/\s*\/\s*/).map((item) => softLocalize(item, locale)).join(' / ')
    return ({
      en: `💥 Contradiction pursuit worked — ${summary}`,
      ja: `💥 矛盾追及が効きました — ${summary}`,
      'zh-CN': `💥 矛盾追问奏效 — ${summary}`,
    } as LocaleText)[locale]
  }

  match = /^🔒\s*(.+?)(?:이|가)\s*모순 추궁의 충격으로 답변을 거부합니다\.\s*\((\d+)턴간 질문 불가\)$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const turns = match[2]
    return ({
      en: `🔒 ${party} refuses to answer after the shock of the contradiction pursuit. (No questions for ${turns} turns)`,
      ja: `🔒 ${party}は矛盾追及の衝撃で回答を拒否しています。（${turns}ターン質問不可）`,
      'zh-CN': `🔒 ${party}因矛盾追问的冲击而拒绝回答。（${turns}回合内无法提问）`,
    } as LocaleText)[locale]
  }

  match = /^🔒\s*(.+?)(?:이|가)\s*격앙 상태입니다\.\s*(\d+)턴 동안\s*(.+?)\s*수 없습니다\.\s*(.+?)에게 진행하거나 다른 행동을 선택해 주세요\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const turns = match[2]
    const blocked = softLocalize(match[3], locale)
    const other = softLocalize(match[4], locale)
    return ({
      en: `🔒 ${party} is agitated. ${blocked} is unavailable for ${turns} turns. Continue with ${other} or choose another action.`,
      ja: `🔒 ${party}は高ぶり状態です。${turns}ターンの間、${blocked}は使えません。${other}へ進めるか、別の行動を選んでください。`,
      'zh-CN': `🔒 ${party}处于激动状态。${turns} 回合内无法${blocked}。请转向${other}或选择其他行动。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:은|는)\s*이 쟁점에 대해 이미 자백했습니다\. 다른 쟁점이나 다른 당사자로 진행해 주세요\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `${party} has already confessed on this dispute. Proceed with another dispute or another party.`,
      ja: `${party}はこの争点についてすでに自白しています。別の争点または別の当事者で進めてください。`,
      'zh-CN': `${party}已就该争议坦白。请推进其他争议或其他当事人。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?) 씨,\s*지금 인정한 핵심을 분명히 정리해 주십시오\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `${party}, clearly summarize the core point you just admitted.`,
      ja: `${party}さん、今認めた核心を明確に整理してください。`,
      'zh-CN': `${party}，请明确整理你刚才承认的核心内容。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 저항이 무너졌습니다\. 자백을 유도할 수 있는 상태입니다\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `${party}'s resistance has collapsed. They are now ready for a confession prompt.`,
      ja: `${party}の抵抗が崩れました。自白を誘導できる状態です。`,
      'zh-CN': `${party}的抵抗已瓦解。现在可以引导坦白。`,
    } as LocaleText)[locale]
  }

  match = /^완벽하게 간파했다!\s*새 증거가 해금된다\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const evidence = softLocalize(match[1], locale)
    return ({
      en: `Perfectly read it. New evidence unlocks — ${evidence}`,
      ja: `完璧に見抜きました。新証拠が解放されます — ${evidence}`,
      'zh-CN': `完美看破！新证据已解锁 — ${evidence}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 방어가 흔들렸다!\s*진술이 달라지기 시작한다\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `${party}'s defense shook. The statement is starting to change.`,
      ja: `${party}の防御が揺らぎました。陳述が変わり始めています。`,
      'zh-CN': `${party}的防线动摇了。陈述开始发生变化。`,
    } as LocaleText)[locale]
  }

  match = /^💡\s*(.+?)에게 심리적 압박을 가했다\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `💡 Applied psychological pressure to ${party}.`,
      ja: `💡 ${party}に心理的圧迫をかけました。`,
      'zh-CN': `💡 对${party}施加了心理压力。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 진술 흐름에서 어긋남이 감지되었습니다\. 모순을 찌르면 다음 단서가 열릴 수 있습니다\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `A divergence was detected in ${party}'s statement flow. Pressing the contradiction may open the next clue.`,
      ja: `${party}の陳述の流れに食い違いが検知されました。矛盾を突けば次の手がかりが開く可能性があります。`,
      'zh-CN': `检测到${party}的陈述脉络出现偏差。追问矛盾可能开启下一条线索。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 진술에서 이전과 다른 점이 발견되었습니다\.\s*[—-]\s*추궁하기$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `A difference from an earlier statement was found in ${party}'s testimony. — Press`,
      ja: `${party}の陳述に以前と異なる点が見つかりました。— 追及する`,
      'zh-CN': `在${party}的陈述中发现了与此前不同之处。— 追问`,
    } as LocaleText)[locale]
  }

  match = /^이 접근으로는 더 이상 진전이 어렵습니다\.\s*(.+?)(?:으로|로)\s*전환하거나,\s*(.+?)\s*씨를 심문하거나,\s*다른 쟁점을 시도해 보세요\.$/.exec(trimmed)
  if (match) {
    const alternatives = match[1].split(/\s*또는\s*/).map((item) => softLocalize(item, locale))
    const joiner = ({ en: ' or ', ja: 'または', 'zh-CN': '或' } as LocaleText)[locale]
    const altText = alternatives.join(joiner)
    const party = softLocalize(match[2], locale)
    return ({
      en: `This approach is no longer making progress. Switch to ${altText}, examine ${party}, or try another dispute.`,
      ja: `このアプローチではこれ以上進展が難しいです。${altText}に切り替えるか、${party}さんを尋問するか、別の争点を試してください。`,
      'zh-CN': `这种方式已难以继续推进。请改用${altText}，询问${party}，或尝试其他争议。`,
    } as LocaleText)[locale]
  }

  match = /^이전:\s*(.+)$/.exec(trimmed)
  if (match) {
    const statement = localizeRuntimeText(match[1], locale)
    return ({
      en: `Previous: ${statement}`,
      ja: `以前: ${statement}`,
      'zh-CN': `此前：${statement}`,
    } as LocaleText)[locale]
  }

  match = /^현재:\s*(.+)$/.exec(trimmed)
  if (match) {
    const statement = localizeRuntimeText(match[1], locale)
    return ({
      en: `Current: ${statement}`,
      ja: `現在: ${statement}`,
      'zh-CN': `当前：${statement}`,
    } as LocaleText)[locale]
  }

  match = /^추궁 결과\s*-\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Pursuit Result - ${subject}`,
      ja: `追及結果 - ${subject}`,
      'zh-CN': `追问结果 - ${subject}`,
    } as LocaleText)[locale]
  }

  match = /^증거 해금:\s*(.+)$/.exec(trimmed)
  if (match) {
    const evidence = match[1].split(/\s*,\s*/).map((item) => softLocalize(item, locale)).join(', ')
    return ({
      en: `Evidence Unlocked: ${evidence}`,
      ja: `証拠解放: ${evidence}`,
      'zh-CN': `证据解锁：${evidence}`,
    } as LocaleText)[locale]
  }

  match = /^새 증거:\s*(.+)$/.exec(trimmed)
  if (match) {
    const evidence = softLocalize(match[1], locale)
    return ({
      en: `New Evidence: ${evidence}`,
      ja: `新証拠: ${evidence}`,
      'zh-CN': `新证据：${evidence}`,
    } as LocaleText)[locale]
  }

  match = /^진실 파악:\s*(.+)$/.exec(trimmed)
  if (match) {
    return ({
      en: `Truth Progress: ${localizeRuntimeText(match[1], locale)}`,
      ja: `真相把握: ${localizeRuntimeText(match[1], locale)}`,
      'zh-CN': `真相进度：${localizeRuntimeText(match[1], locale)}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?) 씨,\s*지금은 발언 순서가 아닙니다\. 심문을 계속합니다\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `${party}, it is not your turn to speak. The examination will continue.`,
      ja: `${party}さん、今は発言の順番ではありません。尋問を続けます。`,
      'zh-CN': `${party}，现在还不是你的发言顺序。询问继续。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*끼어들려 한다\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const subject = softLocalize(match[2], locale)
    return ({
      en: `${party} tries to interject — ${subject}`,
      ja: `${party}が割り込もうとしています — ${subject}`,
      'zh-CN': `${party}试图插话 — ${subject}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*·\s*(.+?)\s*[—-]\s*선택지:\s*(.+)$/.exec(trimmed)
  if (match) {
    const [, party, dispute, choices] = match
    const localizedChoices = choices.split(/\s*\/\s*/).map((item) => softLocalize(item, locale)).join(' / ')
    return ({
      en: `${softLocalize(party, locale)} · ${softLocalize(dispute, locale)} — Choices: ${localizedChoices}`,
      ja: `${softLocalize(party, locale)} · ${softLocalize(dispute, locale)} — 選択肢: ${localizedChoices}`,
      'zh-CN': `${softLocalize(party, locale)} · ${softLocalize(dispute, locale)} — 选项：${localizedChoices}`,
    } as LocaleText)[locale]
  }

  match = /^기존 판단 · (.+?) 쪽 주장$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `Current Judgment · ${party}'s Claim`,
      ja: `既存判断 · ${party}側の主張`,
      'zh-CN': `既有判断 · ${party}一方主张`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 주장에 설득력을 두었습니다\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    return ({
      en: `The judgment gave weight to ${party}'s claim.`,
      ja: `${party}の主張に説得力があると判断しました。`,
      'zh-CN': `判断认为${party}的主张更具说服力。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 신뢰가 최고치에 도달했습니다$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject}'s trust has reached its peak.`,
      ja: `${subject}の信頼が最高値に達しました。`,
      'zh-CN': `${subject}的信任已达到最高值。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 신뢰 경로가 열렸습니다$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject}'s trust route has opened.`,
      ja: `${subject}の信頼ルートが開きました。`,
      'zh-CN': `${subject}的信任路径已开启。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 속마음\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    const state = softLocalize(match[2], locale)
    return ({
      en: `${subject}'s inner state — ${state}`,
      ja: `${subject}の内心 — ${state}`,
      'zh-CN': `${subject}的内心状态 — ${state}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 감정이 격해졌습니다$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject}'s emotion has intensified.`,
      ja: `${subject}の感情が高ぶりました。`,
      'zh-CN': `${subject}的情绪激动起来。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*폭발 직전이다!$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} is on the verge of an outburst.`,
      ja: `${subject}は爆発寸前です。`,
      'zh-CN': `${subject}快要爆发了。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*흔들리고 있다\.\.\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} is wavering...`,
      ja: `${subject}が揺らいでいます……`,
      'zh-CN': `${subject}正在动摇……`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*지쳐 보인다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} looks worn down.`,
      ja: `${subject}は疲れ切って見えます。`,
      'zh-CN': `${subject}看起来已经疲惫。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\s*자신감을 되찾았다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} has regained confidence.`,
      ja: `${subject}は自信を取り戻しました。`,
      'zh-CN': `${subject}重新找回了自信。`,
    } as LocaleText)[locale]
  }

  match = /^…사실,\s*(.+?)\s*건도 함께 봐주셔야 합니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `...Actually, you need to look at ${subject} as well.`,
      ja: `……実は、${subject}の件も一緒に見ていただく必要があります。`,
      'zh-CN': `……其实，${subject}这件事也需要一起看。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)에게 이어 물을 지점이 열렸다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `A follow-up point has opened for ${subject}.`,
      ja: `${subject}に続けて尋ねるポイントが開きました。`,
      'zh-CN': `已开启可继续询问 ${subject} 的要点。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 답변이 이 쟁점의 핵심과 맞닿아 있습니다\.\s*(.+?) 씨에게 직접 확인하시겠습니까\?$/.exec(trimmed)
  if (match) {
    const witness = softLocalize(match[1], locale)
    const party = softLocalize(match[2], locale)
    return ({
      en: `${witness}'s answer touches the core of this dispute. Confirm it directly with ${party}?`,
      ja: `${witness}の回答はこの争点の核心に触れています。${party}さんに直接確認しますか？`,
      'zh-CN': `${witness}的回答触及该争议核心。要直接向${party}确认吗？`,
    } as LocaleText)[locale]
  }

  match = /^(.+?) 씨,\s*방금 (.+?)의 증언은 "(.+?)" 쟁점의 핵심과 맞닿아 있습니다\. 이 부분을 직접 확인하겠습니다\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const witness = softLocalize(match[2], locale)
    const dispute = softLocalize(match[3], locale)
    return ({
      en: `${party}, ${witness}'s testimony just now touches the core of the "${dispute}" dispute. I will confirm this directly.`,
      ja: `${party}さん、先ほどの${witness}の証言は「${dispute}」争点の核心に触れています。この部分を直接確認します。`,
      'zh-CN': `${party}，刚才${witness}的证言触及“${dispute}”争议的核心。我将直接确认这一点。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가) 증언대에 섰다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} has taken the witness stand.`,
      ja: `${subject}が証言台に立ちました。`,
      'zh-CN': `${subject}已站上证人席。`,
    } as LocaleText)[locale]
  }

  match = /^증인\s*(.+?)\s*소환\s*[—-]\s*증언이 시작된다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Witness ${subject} summoned — testimony begins.`,
      ja: `証人${subject}召喚 — 証言が始まります。`,
      'zh-CN': `传唤证人 ${subject} — 证言开始。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 방어가 무너지고 자백 단계에 들어갔습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject}'s defense has collapsed and they have entered the confession stage.`,
      ja: `${subject}の防御が崩れ、自白段階に入りました。`,
      'zh-CN': `${subject}的防线已瓦解，进入坦白阶段。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 자백\s*-\s*(.+)$/.exec(trimmed)
  if (match) {
    return ({
      en: `${softLocalize(match[1], locale)} Confession - ${softLocalize(match[2], locale)}`,
      ja: `${softLocalize(match[1], locale)}の自白 - ${softLocalize(match[2], locale)}`,
      'zh-CN': `${softLocalize(match[1], locale)}的坦白 - ${softLocalize(match[2], locale)}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)(?:이|가)\(가\)\s*체념 상태에 빠졌습니다\. 핵심 진실을 자백받을 수 있습니다\. 추가 추궁으로 더 큰 자백을 노릴 수도 있습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `${subject} has fallen into resignation. You can draw out the core truth, or press further for a larger confession.`,
      ja: `${subject}は諦め状態に入りました。核心の真実を自白させられます。さらに追及すれば、より大きな自白を狙える場合もあります。`,
      'zh-CN': `${subject}已陷入放弃抵抗状态。可以引导其坦白核心真相，也可以继续追问以争取更大的坦白。`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 결정적 진술\s*-\s*(.+)$/.exec(trimmed)
  if (match) {
    return ({
      en: `${softLocalize(match[1], locale)} Decisive Statement - ${softLocalize(match[2], locale)}`,
      ja: `${softLocalize(match[1], locale)}の決定的陳述 - ${softLocalize(match[2], locale)}`,
      'zh-CN': `${softLocalize(match[1], locale)}的决定性陈述 - ${softLocalize(match[2], locale)}`,
    } as LocaleText)[locale]
  }

  match = /^모순 발견\s*-\s*(.+)$/.exec(trimmed)
  if (match) {
    return ({
      en: `Contradiction Found - ${softLocalize(match[1], locale)}`,
      ja: `矛盾を発見 - ${softLocalize(match[1], locale)}`,
      'zh-CN': `发现矛盾 - ${softLocalize(match[1], locale)}`,
    } as LocaleText)[locale]
  }

  match = /^쟁점 파악\s*-\s*(.+)$/.exec(trimmed)
  if (match) {
    return ({
      en: `Dispute Probe - ${softLocalize(match[1], locale)}`,
      ja: `争点把握 - ${softLocalize(match[1], locale)}`,
      'zh-CN': `争议掌握 - ${softLocalize(match[1], locale)}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*쟁점의 질문 피로도를 초기화했습니다\. 다른 각도로 다시 밀 수 있습니다\.$/.exec(trimmed)
  if (match) {
    const subject = softLocalize(match[1], locale)
    return ({
      en: `Question fatigue for ${subject} has been reset. You can press it again from another angle.`,
      ja: `${subject}争点の質問疲労度をリセットしました。別の角度から再度押せます。`,
      'zh-CN': `${subject}争议的提问疲劳已重置。可以换个角度继续推进。`,
    } as LocaleText)[locale]
  }

  match = /^누설 위험\s*(\d+)%$/.exec(trimmed)
  if (match) {
    return ({
      en: `Leak Risk ${match[1]}%`,
      ja: `漏れリスク ${match[1]}%`,
      'zh-CN': `泄露风险 ${match[1]}%`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)의 답변에서 "(.+?)" 쟁점과 이어질 수 있는 연결고리를 확인했습니다\. 아직 결론은 아니며, 증거·증언으로 검증해야 합니다\.$/.exec(trimmed)
  if (match) {
    const party = softLocalize(match[1], locale)
    const dispute = softLocalize(match[2], locale)
    return ({
      en: `A connection that may link ${party}'s answer to the "${dispute}" dispute was confirmed. This is not a conclusion yet and must be verified with evidence and testimony.`,
      ja: `${party}の回答から「${dispute}」争点につながる可能性のある接点を確認しました。まだ結論ではなく、証拠・証言で検証する必要があります。`,
      'zh-CN': `已从${party}的回答中确认到可能关联“${dispute}”争议的线索。这还不是结论，必须用证据和证言验证。`,
    } as LocaleText)[locale]
  }

  match = /^상대의 반격 의지가\s*(\d+)턴간 약화됩니다$/.exec(trimmed)
  if (match) {
    return ({
      en: `The other party's will to counterattack is weakened for ${match[1]} turns`,
      ja: `相手の反撃意欲が${match[1]}ターン弱まります`,
      'zh-CN': `对方的反击意愿将在 ${match[1]} 回合内减弱`,
    } as LocaleText)[locale]
  }

  match = /^모순\s*(\d+)개 축적\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const [, count, rest] = match
    return ({
      en: `${count} contradictions accumulated — ${localizeRuntimeText(rest, locale)}`,
      ja: `矛盾${count}件蓄積 — ${localizeRuntimeText(rest, locale)}`,
      'zh-CN': `已累积 ${count} 个矛盾 — ${localizeRuntimeText(rest, locale)}`,
    } as LocaleText)[locale]
  }

  match = /^모순 토큰\s*\+(\d+)\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const [, count, rest] = match
    return ({
      en: `Contradiction Token +${count} — ${localizeRuntimeText(rest, locale)}`,
      ja: `矛盾トークン +${count} — ${localizeRuntimeText(rest, locale)}`,
      'zh-CN': `矛盾令牌 +${count} — ${localizeRuntimeText(rest, locale)}`,
    } as LocaleText)[locale]
  }

  match = /^모순 토큰\s*\+(\d+)$/.exec(trimmed)
  if (match) {
    return ({
      en: `Contradiction Token +${match[1]}`,
      ja: `矛盾トークン +${match[1]}`,
      'zh-CN': `矛盾令牌 +${match[1]}`,
    } as LocaleText)[locale]
  }

  match = /^누설\s*\+(\d+)%\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const [, value, rest] = match
    return ({
      en: `Leak +${value}% — ${localizeRuntimeText(rest, locale)}`,
      ja: `漏れ +${value}% — ${localizeRuntimeText(rest, locale)}`,
      'zh-CN': `泄露 +${value}% — ${localizeRuntimeText(rest, locale)}`,
    } as LocaleText)[locale]
  }

  match = /^누설미터\s*\+(\d+)%\s*\((\d+)%\)$/.exec(trimmed)
  if (match) {
    const [, gain, total] = match
    return ({
      en: `Leak Meter +${gain}% (${total}%)`,
      ja: `漏れメーター +${gain}% (${total}%)`,
      'zh-CN': `泄露计量 +${gain}%（${total}%）`,
    } as LocaleText)[locale]
  }

  match = /^신뢰\s*([+-]\d+)(.*)$/.exec(trimmed)
  if (match) {
    const rest = match[2].trim()
    if (!rest) return `${phrase('신뢰', locale)} ${match[1]}`
    const joiner = /^[—-]/.test(rest) ? ' — ' : ' '
    const restText = rest.replace(/^[—-]\s*/, '')
    return `${phrase('신뢰', locale)} ${match[1]}${joiner}${localizeRuntimeText(restText, locale)}`
  }

  match = /^누설미터\s*(\d+)%\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const [, value, rest] = match
    return ({
      en: `Leak meter ${value}% — ${localizeRuntimeText(rest, locale)}`,
      ja: `漏れメーター${value}% — ${localizeRuntimeText(rest, locale)}`,
      'zh-CN': `泄露计量 ${value}% — ${localizeRuntimeText(rest, locale)}`,
    } as LocaleText)[locale]
  }

  match = /^(.+?)\s*·\s*(.+)$/.exec(trimmed)
  if (match) {
    const [, left, right] = match
    return `${softLocalize(left, locale)} · ${softLocalize(right, locale)}`
  }

  match = /^(.+?)\s*[—-]\s*(.+)$/.exec(trimmed)
  if (match) {
    const [, left, right] = match
    return `${softLocalize(left, locale)} — ${softLocalize(right, locale)}`
  }

  return value
}

function applyFragments(value: string, locale: Exclude<LocaleCode, 'ko'>): string {
  return Object.entries(FRAGMENTS)
    .sort((a, b) => b[0].length - a[0].length)
    .reduce((text, [source, translations]) => text.split(source).join(translations[locale]), value)
}

const reportedMissingRuntimeText = new Set<string>()

function reportMissingRuntimeText(value: string, locale: Exclude<LocaleCode, 'ko'>): void {
  if (typeof console === 'undefined') return
  const key = `${locale}:${value}`
  if (reportedMissingRuntimeText.has(key)) return
  reportedMissingRuntimeText.add(key)
  console.warn(`[i18n] Missing runtime translation (${locale}):`, value)
}

export function localizeRuntimeText(
  value: unknown,
  locale: LocaleCode = getRuntimeTextLocale(),
): string {
  const text = String(value ?? '')
  if (!text || locale === 'ko' || !hasHangulText(text)) return text

  const targetLocale = locale as Exclude<LocaleCode, 'ko'>
  const patterned = applyPatterns(text, targetLocale)
  const localized = applyFragments(patterned, targetLocale)
  if (hasHangulText(localized)) reportMissingRuntimeText(localized, targetLocale)
  return localized
}

export function localizeRuntimeArray(
  values: string[] | undefined,
  locale: LocaleCode = getRuntimeTextLocale(),
): string[] | undefined {
  return values?.map((value) => localizeRuntimeText(value, locale))
}
