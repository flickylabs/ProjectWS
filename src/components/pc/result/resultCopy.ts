import type { LocaleCode } from '../../../i18n'
import type { CaseData, ClearanceCategory, VerdictInput } from '../../../types'
import type { JudgeTier } from '../../../engine/judgeProfileEngine'
import type { TraitId } from '../../../engine/judgeProgressionEngine'

export type ResultTab = 'result' | 'verdict_pronounce' | 'epilogue' | 'bonus'

export const RESULT_TAB_IDS: ResultTab[] = ['result', 'verdict_pronounce', 'epilogue', 'bonus']

type RatingKey = 'legendary' | 'excellent' | 'skilled' | 'ordinary' | 'novice' | 'failed'
type FindingKey = 'pending' | 'trueCorrect' | 'trueWrong' | 'falseWrong' | 'falseCorrect' | 'none'
type AxisKey = 'inquiry' | 'judgment' | 'resolution'

const COPY = {
  ko: {
    unitPoint: '점',
    tabs: {
      result: '01 결과 확인',
      verdict_pronounce: '02 판결 선고',
      epilogue: '03 후일담',
      bonus: '04 보너스',
    },
    ratings: {
      legendary: '전설적인 재판관',
      excellent: '훌륭한 재판관',
      skilled: '능숙한 재판관',
      ordinary: '보통의 재판관',
      novice: '미숙한 재판관',
      failed: '판단 실패',
    },
    relationship: {
      spouse: '부부',
      family: '가족',
      friend: '친구',
      neighbor: '이웃',
      partnership: '동업',
      workplace: '직장',
      boss_employee: '직장',
      tenant: '세입자',
      tenant_landlord: '세입자',
      headline: '헤드라인',
      online: '온라인',
      professional: '의료·교육',
      medical_education: '의료·교육',
      civic: '공공·제도',
      public_system: '공공·제도',
    },
    rarity: { common: '일반', rare: '희귀', epic: '영웅', legendary: '전설' },
    finding: {
      pending: '판단 보류',
      trueCorrect: '사실로 판단',
      trueWrong: '상대 주장 사실로 판단',
      falseWrong: '사실 아님으로 판단',
      falseCorrect: '거짓으로 판단',
      none: '미판단',
    },
    meta: { relationship: '관계', disputes: '쟁점', evidence: '증거', caseCount: (count: number) => `${count}개`, evidenceCount: (count: number) => `${count}종` },
    scoreAxes: { insight: '통찰', authority: '권위', wisdom: '지혜', clearance: '달성율' },
    detailView: '상세보기',
    selectedJudgment: '내 판단',
    sections: {
      disputeResult: '쟁점별 판단 결과',
      keyMoments: '결정적 순간',
      resolution: '해결 방향',
      profile: '재판관 성향',
      earnedTitles: '획득한 칭호',
    },
    buttons: { retry: '판결 다시 하기', prev: '< 이전', next: '다음 >', home: '홈으로' },
    judge: { cases: (count: number) => `${count}건`, stable: '안정' },
    aftermath: {
      loading: '후일담을 작성하고 있습니다...',
      empty: '후일담 데이터가 없습니다.',
      noAction: '추가 조치 없이 판결 내용을 따르는 것',
      none: '없음',
      apprentice: '견습 재판관',
    },
    discovery: {
      lies: (count: number) => `거짓말 ${count}건 자백 유도`,
      truths: (count: number) => `숨겨진 진실 ${count}건 발견`,
      disputes: (count: number) => `숨겨진 쟁점 ${count}건 발현`,
    },
    judgmentWords: { true: '사실로 판단', false: '거짓으로 판단', pending: '보류' },
    bonusEnhance: '성향 강화 가능! - 내 정보에서 확인하세요',
    fragmentFooter: '*각 조각은 재판관 성향 성장 재료로 사용할 수 있습니다.',
    noProfile: '첫 번째 재판을 마쳤습니다. 사건을 거듭할수록 성향이 드러납니다.',
    starAria: (count: number) => `별 ${count}개`,
    verdictIntro: (a: string, b: string, relation: string, turns: number) =>
      `본 사건은 ${a}와 ${b}의 ${relation} 간 분쟁으로, 총 ${turns}회의 심리를 거쳐 다음과 같은 판결에 이르렀습니다.`,
  },
  en: {
    unitPoint: 'pts',
    tabs: {
      result: '01 Results',
      verdict_pronounce: '02 Verdict',
      epilogue: '03 Epilogue',
      bonus: '04 Bonus',
    },
    ratings: {
      legendary: 'Legendary Judge',
      excellent: 'Excellent Judge',
      skilled: 'Skilled Judge',
      ordinary: 'Steady Judge',
      novice: 'Novice Judge',
      failed: 'Judgment Failed',
    },
    relationship: {
      spouse: 'Spouses',
      family: 'Family',
      friend: 'Friends',
      neighbor: 'Neighbors',
      partnership: 'Partners',
      workplace: 'Workplace',
      boss_employee: 'Workplace',
      tenant: 'Tenancy',
      tenant_landlord: 'Tenancy',
      headline: 'Headline',
      online: 'Online',
      professional: 'Medical/Education',
      medical_education: 'Medical/Education',
      civic: 'Public System',
      public_system: 'Public System',
    },
    rarity: { common: 'Common', rare: 'Rare', epic: 'Epic', legendary: 'Legendary' },
    finding: {
      pending: 'Judgment deferred',
      trueCorrect: 'Found as fact',
      trueWrong: 'Accepted the opposing claim',
      falseWrong: 'Rejected the fact',
      falseCorrect: 'Found false',
      none: 'Not judged',
    },
    meta: { relationship: 'Relation', disputes: 'Issues', evidence: 'Evidence', caseCount: (count: number) => `${count}`, evidenceCount: (count: number) => `${count}` },
    scoreAxes: { insight: 'Insight', authority: 'Authority', wisdom: 'Wisdom', clearance: 'Clearance' },
    detailView: 'Details',
    selectedJudgment: 'My finding',
    sections: {
      disputeResult: 'Issue Findings',
      keyMoments: 'Key Moments',
      resolution: 'Resolution Direction',
      profile: 'Judge Profile',
      earnedTitles: 'Earned Titles',
    },
    buttons: { retry: 'Redo Verdict', prev: '< Previous', next: 'Next >', home: 'Home' },
    judge: { cases: (count: number) => `${count} cases`, stable: 'stable' },
    aftermath: {
      loading: 'Writing the epilogue...',
      empty: 'No epilogue data is available.',
      noAction: 'following the verdict without additional measures',
      none: 'None',
      apprentice: 'Apprentice Judge',
    },
    discovery: {
      lies: (count: number) => `${count} confession${count === 1 ? '' : 's'} drawn out`,
      truths: (count: number) => `${count} hidden truth${count === 1 ? '' : 's'} found`,
      disputes: (count: number) => `${count} hidden issue${count === 1 ? '' : 's'} emerged`,
    },
    judgmentWords: { true: 'Found as fact', false: 'Found false', pending: 'Deferred' },
    bonusEnhance: 'Trait enhancement available. Check My Info.',
    fragmentFooter: '*Fragments can be used as growth materials for judge traits.',
    noProfile: 'The first trial is complete. Your tendencies will become clearer as you handle more cases.',
    starAria: (count: number) => `${count} star${count === 1 ? '' : 's'}`,
    verdictIntro: (a: string, b: string, relation: string, turns: number) =>
      `This ${relation} dispute between ${a} and ${b} reached a verdict after ${turns} hearing${turns === 1 ? '' : 's'}.`,
  },
  ja: {
    unitPoint: '点',
    tabs: {
      result: '01 結果確認',
      verdict_pronounce: '02 判決言渡し',
      epilogue: '03 後日談',
      bonus: '04 ボーナス',
    },
    ratings: {
      legendary: '伝説の裁判官',
      excellent: '優れた裁判官',
      skilled: '熟練した裁判官',
      ordinary: '標準的な裁判官',
      novice: '未熟な裁判官',
      failed: '判断失敗',
    },
    relationship: {
      spouse: '夫婦',
      family: '家族',
      friend: '友人',
      neighbor: '隣人',
      partnership: '共同事業',
      workplace: '職場',
      boss_employee: '職場',
      tenant: '賃貸',
      tenant_landlord: '賃貸',
      headline: 'ヘッドライン',
      online: 'オンライン',
      professional: '医療・教育',
      medical_education: '医療・教育',
      civic: '公共制度',
      public_system: '公共制度',
    },
    rarity: { common: '一般', rare: '希少', epic: '英雄', legendary: '伝説' },
    finding: {
      pending: '判断保留',
      trueCorrect: '事実と判断',
      trueWrong: '相手側の主張を事実と判断',
      falseWrong: '事実ではないと判断',
      falseCorrect: '虚偽と判断',
      none: '未判断',
    },
    meta: { relationship: '関係', disputes: '争点', evidence: '証拠', caseCount: (count: number) => `${count}件`, evidenceCount: (count: number) => `${count}種` },
    scoreAxes: { insight: '洞察', authority: '権威', wisdom: '知恵', clearance: '達成率' },
    detailView: '詳細',
    selectedJudgment: '自分の判断',
    sections: {
      disputeResult: '争点別判断結果',
      keyMoments: '決定的な場面',
      resolution: '解決方針',
      profile: '裁判官傾向',
      earnedTitles: '獲得称号',
    },
    buttons: { retry: '判決をやり直す', prev: '< 前へ', next: '次へ >', home: 'ホームへ' },
    judge: { cases: (count: number) => `${count}件`, stable: '安定' },
    aftermath: {
      loading: '後日談を作成しています...',
      empty: '後日談データがありません。',
      noAction: '追加措置なしに判決内容に従うこと',
      none: 'なし',
      apprentice: '見習い裁判官',
    },
    discovery: {
      lies: (count: number) => `虚偽の自白を${count}件引き出した`,
      truths: (count: number) => `隠れた真実を${count}件発見`,
      disputes: (count: number) => `隠れた争点が${count}件発現`,
    },
    judgmentWords: { true: '事実と判断', false: '虚偽と判断', pending: '保留' },
    bonusEnhance: '傾向強化が可能です。マイ情報で確認してください。',
    fragmentFooter: '*各フラグメントは裁判官傾向の成長素材として使用できます。',
    noProfile: '最初の裁判を終えました。事件を重ねるほど傾向が見えてきます。',
    starAria: (count: number) => `星${count}個`,
    verdictIntro: (a: string, b: string, relation: string, turns: number) =>
      `本件は${a}と${b}の${relation}をめぐる紛争であり、合計${turns}回の審理を経て次の判決に至りました。`,
  },
  'zh-CN': {
    unitPoint: '分',
    tabs: {
      result: '01 查看结果',
      verdict_pronounce: '02 宣读判决',
      epilogue: '03 后日谈',
      bonus: '04 奖励',
    },
    ratings: {
      legendary: '传奇裁判官',
      excellent: '优秀裁判官',
      skilled: '熟练裁判官',
      ordinary: '普通裁判官',
      novice: '新手裁判官',
      failed: '判断失败',
    },
    relationship: {
      spouse: '夫妻',
      family: '家人',
      friend: '朋友',
      neighbor: '邻里',
      partnership: '合伙',
      workplace: '职场',
      boss_employee: '职场',
      tenant: '租赁',
      tenant_landlord: '租赁',
      headline: '热点事件',
      online: '线上',
      professional: '医疗/教育',
      medical_education: '医疗/教育',
      civic: '公共制度',
      public_system: '公共制度',
    },
    rarity: { common: '普通', rare: '稀有', epic: '史诗', legendary: '传奇' },
    finding: {
      pending: '暂缓判断',
      trueCorrect: '认定为事实',
      trueWrong: '认定对方主张为事实',
      falseWrong: '认定并非事实',
      falseCorrect: '认定为虚假',
      none: '未判断',
    },
    meta: { relationship: '关系', disputes: '争点', evidence: '证据', caseCount: (count: number) => `${count}项`, evidenceCount: (count: number) => `${count}类` },
    scoreAxes: { insight: '洞察', authority: '权威', wisdom: '智慧', clearance: '完成率' },
    detailView: '详情',
    selectedJudgment: '我的判断',
    sections: {
      disputeResult: '各争点判断结果',
      keyMoments: '关键时刻',
      resolution: '解决方向',
      profile: '裁判官倾向',
      earnedTitles: '获得称号',
    },
    buttons: { retry: '重新判决', prev: '< 上一步', next: '下一步 >', home: '返回首页' },
    judge: { cases: (count: number) => `${count}案`, stable: '稳定' },
    aftermath: {
      loading: '正在撰写后日谈...',
      empty: '没有后日谈数据。',
      noAction: '不追加措施，遵照判决内容',
      none: '无',
      apprentice: '见习裁判官',
    },
    discovery: {
      lies: (count: number) => `促成${count}项谎言自白`,
      truths: (count: number) => `发现${count}项隐藏真相`,
      disputes: (count: number) => `浮现${count}项隐藏争点`,
    },
    judgmentWords: { true: '认定为事实', false: '认定为虚假', pending: '暂缓' },
    bonusEnhance: '可强化倾向，请在我的信息中确认。',
    fragmentFooter: '*各碎片可作为裁判官倾向成长材料使用。',
    noProfile: '第一次审判已经完成。随着案件增加，倾向会逐渐显现。',
    starAria: (count: number) => `${count}星`,
    verdictIntro: (a: string, b: string, relation: string, turns: number) =>
      `本案是${a}与${b}之间的${relation}纠纷，经过共${turns}次审理后作出如下判决。`,
  },
} as const

export function getResultCopy(locale: LocaleCode) {
  return COPY[locale] ?? COPY.ko
}

export function getResultTabs(locale: LocaleCode) {
  const copy = getResultCopy(locale)
  return RESULT_TAB_IDS.map((id) => ({ id, label: copy.tabs[id] }))
}

function getRatingKey(total: number): RatingKey {
  if (total >= 90) return 'legendary'
  if (total >= 75) return 'excellent'
  if (total >= 60) return 'skilled'
  if (total >= 40) return 'ordinary'
  if (total >= 20) return 'novice'
  return 'failed'
}

export function getResultRating(total: number, locale: LocaleCode): string {
  return getResultCopy(locale).ratings[getRatingKey(total)]
}

export function getRelationLabel(relationshipType: string, locale: LocaleCode): string {
  return getResultCopy(locale).relationship[relationshipType as keyof typeof COPY.ko.relationship] ?? relationshipType
}

export function getRarityLabel(rarity: string, locale: LocaleCode): string {
  return getResultCopy(locale).rarity[rarity as keyof typeof COPY.ko.rarity] ?? rarity
}

export function getFindingLabel(value: 'true' | 'false' | 'pending' | undefined, truth: boolean, locale: LocaleCode): string {
  const key: FindingKey = value === 'pending'
    ? 'pending'
    : value === 'true'
      ? truth ? 'trueCorrect' : 'trueWrong'
      : value === 'false'
        ? truth ? 'falseWrong' : 'falseCorrect'
        : 'none'
  return getResultCopy(locale).finding[key]
}

type ResultEvidenceStateMap = Record<string, { presented?: boolean; unlocked?: boolean } | undefined>

function getDisputeEvidenceNames(
  caseData: CaseData,
  evidenceStates: ResultEvidenceStateMap,
  requiredEvidence?: string[],
): string[] {
  const evidenceById = new Map(caseData.evidence.map((e) => [e.id, e]))
  const candidates = (requiredEvidence ?? [])
    .map((id) => evidenceById.get(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))

  const surfaced = candidates.filter((e) => {
    const state = evidenceStates[e.id]
    return state?.presented || state?.unlocked
  })

  const source = surfaced.length > 0 ? surfaced : candidates
  return source
    .map((e) => e.name)
    .filter(Boolean)
    .slice(0, 3)
}

export function buildDisputeMomentLine(
  caseData: CaseData,
  evidenceStates: ResultEvidenceStateMap,
  verdictInput: VerdictInput,
  dispute: CaseData['disputes'][number],
  locale: LocaleCode,
): string {
  const finding = verdictInput.factFindings[dispute.id]
  const evidenceNames = getDisputeEvidenceNames(caseData, evidenceStates, dispute.requiredEvidence)
  const evidenceText = evidenceNames.length > 0 ? evidenceNames.join(', ') : null
  const statement = dispute.judgmentStatement || dispute.truthDescription || dispute.name

  if (locale === 'en') {
    const basis = evidenceText ? `the related materials (${evidenceText})` : 'the submitted record and testimony'
    if (!finding || finding === 'pending') return `${dispute.name}: After reviewing ${basis}, the court left this fact unresolved for the verdict.`
    const correct = (finding === 'true') === dispute.truth
    return correct
      ? `${dispute.name}: The court compared ${basis} and organized the finding around ${statement}.`
      : `${dispute.name}: The court reviewed ${basis}, but the link between record and testimony remained unstable.`
  }

  if (locale === 'ja') {
    const basis = evidenceText ? `関連資料（${evidenceText}）` : '提出された記録と供述'
    if (!finding || finding === 'pending') return `${dispute.name}: ${basis}を検討したものの、判決で確定できる事実としては保留しました。`
    const correct = (finding === 'true') === dispute.truth
    return correct
      ? `${dispute.name}: ${basis}を照合し、${statement}を中心に事実関係を整理しました。`
      : `${dispute.name}: ${basis}を検討しましたが、記録と供述のつながりが十分にかみ合わず、不安定な判断として残りました。`
  }

  if (locale === 'zh-CN') {
    const basis = evidenceText ? `相关材料（${evidenceText}）` : '提交的记录与陈述'
    if (!finding || finding === 'pending') return `${dispute.name}: 虽已审查${basis}，但尚不足以在判决中确认该事实。`
    const correct = (finding === 'true') === dispute.truth
    return correct
      ? `${dispute.name}: 通过对照${basis}，围绕“${statement}”整理了事实关系。`
      : `${dispute.name}: 虽已审查${basis}，但记录与陈述之间的连接仍不充分，判断仍显不稳。`
  }

  const evidenceTextKo = evidenceNames.length > 0
    ? `${evidenceNames.join(', ')}${evidenceNames.length >= 3 ? ' 등 관련 자료를' : ' 자료를'}`
    : '제출된 기록과 진술을'
  if (!finding || finding === 'pending') {
    return `${dispute.name}: ${evidenceTextKo} 검토했지만, 판결에서 확정할 만큼의 사실관계는 아직 보류했습니다.`
  }
  const correct = (finding === 'true') === dispute.truth
  return correct
    ? `${dispute.name}: ${evidenceTextKo} 대조해 ${statement} 쪽으로 사실관계를 정리했습니다.`
    : `${dispute.name}: ${evidenceTextKo} 검토했으나, 기록과 진술의 연결이 충분히 맞물리지 않아 불안정한 판단으로 남았습니다.`
}

export function getSelectedSolutionText(verdictInput: VerdictInput, locale: LocaleCode): string {
  const selectedSolutions = verdictInput.selectedSolutions
    .map((entry) => entry.includes('::') ? entry.slice(entry.indexOf('::') + 2) : entry)
    .filter(Boolean)
  return selectedSolutions.length > 0
    ? selectedSolutions.slice(0, 2).join(', ')
    : getResultCopy(locale).aftermath.noAction
}

function getAverageResponsibility(caseData: CaseData, verdictInput: VerdictInput): number {
  const responsibilities = Object.values(verdictInput.responsibility)
  return responsibilities.length > 0
    ? Math.round(responsibilities.reduce((sum, item) => sum + item.a, 0) / responsibilities.length)
    : 50
}

function getAftermathAction(solutionText: string, locale: LocaleCode): string {
  const copy = getResultCopy(locale)
  if (!solutionText || solutionText === copy.aftermath.noAction) {
    if (locale === 'en') return 'They first sorted the remaining records separately instead of reaching out immediately.'
    if (locale === 'ja') return '二人はすぐ連絡を取るよりも、まず残った記録をそれぞれ整理しました。'
    if (locale === 'zh-CN') return '两人没有立刻联系，而是先各自整理尚未处理的记录。'
    return '두 사람은 먼저 연락하기보다 각자 남은 기록을 정리했습니다.'
  }
  if (locale === 'en') return `They treated "${solutionText}" as the first practical step, not as another argument.`
  if (locale === 'ja') return `二人は「${solutionText}」を新たな争いではなく、最初の実務的な一歩として受け止めました。`
  if (locale === 'zh-CN') return `两人把“${solutionText}”当作第一步实际行动，而不是新的争执。`
  return `두 사람은 "${solutionText}"를 다시 다투기 위한 말이 아니라 첫 정리의 기준으로 삼았습니다.`
}

function getAftermathLesson(caseId: string, total: number, locale: LocaleCode): string {
  const high = total >= 75
  if (locale === 'en') {
    if (caseId === 'friend-01') return high ? 'Even a late warning must be explained again when it is sincere.' : 'Concern that goes unchecked can quickly become blame.'
    if (caseId === 'family-01') return high ? 'Even the wish to protect family must be rewritten before the facts.' : 'A hidden heart eventually becomes another inheritance.'
    if (caseId === 'spouse-01') return high ? 'Unspoken goodwill still needs explanation before trust.' : 'Silence can leave suspicion longer than a lie.'
    return high ? 'Only after naming responsibility can a relationship find its next sentence.' : 'Certainty without checking wounds people even outside the courtroom.'
  }
  if (locale === 'ja') {
    if (caseId === 'friend-01') return high ? '遅い警告も、本気ならもう一度説明されなければならない。' : '確かめない心配は、すぐに非難へ変わる。'
    if (caseId === 'family-01') return high ? '家族を守るという言葉も、事実の前では書き直される。' : '隠した心は、結局もう一つの相続として残る。'
    if (caseId === 'spouse-01') return high ? '語られなかった善意も、信頼の前では説明を要する。' : '沈黙は時に、嘘より長く疑いを残す。'
    return high ? '責任を語ってから、関係は次の言葉を探し始める。' : '確かめない確信は、法廷の外でも傷になる。'
  }
  if (locale === 'zh-CN') {
    if (caseId === 'friend-01') return high ? '迟来的提醒若是真心，也需要重新说明。' : '未经确认的担心，很容易变成指责。'
    if (caseId === 'family-01') return high ? '所谓守护家人，也必须在事实面前重新书写。' : '隐藏的心意，终会成为另一份继承。'
    if (caseId === 'spouse-01') return high ? '未说出口的善意，在信任面前也需要说明。' : '沉默有时比谎言更久地留下怀疑。'
    return high ? '说清责任之后，关系才找得到下一句话。' : '未经确认的确信，在法庭之外也会留下伤口。'
  }
  if (caseId === 'friend-01') return high ? '늦은 경고도 진심이면 다시 설명되어야 한다.' : '확인하지 않은 걱정은 쉽게 비난이 된다.'
  if (caseId === 'family-01') return high ? '가족을 지킨다는 말도 사실 앞에서 다시 써야 한다.' : '숨긴 마음은 결국 다른 상속으로 남는다.'
  if (caseId === 'spouse-01') return high ? '말하지 않은 선의도 믿음 앞에서는 설명이 필요하다.' : '침묵은 때로 거짓보다 오래 의심을 남긴다.'
  return high ? '책임을 말한 뒤에야 관계는 다음 문장을 찾는다.' : '확인 없는 확신은 법정 밖에서도 상처가 된다.'
}

export function buildAftermathFallback(caseData: CaseData, total: number, verdictInput: VerdictInput, locale: LocaleCode): string {
  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const solutionText = getSelectedSolutionText(verdictInput, locale)
  const action = getAftermathAction(solutionText, locale)
  const avgA = getAverageResponsibility(caseData, verdictInput)
  const heavierName = avgA > 55 ? nameA : avgA < 45 ? nameB : null
  const lighterName = avgA > 55 ? nameB : avgA < 45 ? nameA : null
  const lesson = getAftermathLesson(caseData.caseId, total, locale)
  const strong = total >= 75

  if (locale === 'en') {
    const balance = heavierName && lighterName
      ? `${heavierName} nodded first, but it looked closer to exhaustion than acceptance. ${lighterName} only then realized that their own grievance may also have pressed on the other person.`
      : `${nameA} and ${nameB} could not divide the ending into a simple winner and loser. Both still had reasons to feel wronged, which made every next sentence slower.`
    return [
      `${nameA} and ${nameB} left the courtroom without looking directly at each other. What weighed on them was not only that the ruling had ended, but that there was no longer room to pretend they had not heard it. ${balance} The short silence outside the courtroom was no longer a way to push the other person away; it was a pause to avoid ruining the first words after judgment.`,
      `${action} At first, only necessary sentences passed between them. Their replies stayed short, and a few messages were written and erased before being sent. Still, neither began by cutting the other person off with grievance, and that small restraint became the first practical change after the verdict.`,
      strong
        ? `After several weeks, the heat of the dispute had thinned into new boundaries. ${nameA} and ${nameB} did not claim that everything had been repaired, but they no longer denied that the same scene could have left two different memories. A brief check-in came and went without either of them exaggerating it into proof of reconciliation.`
        : `Time did not turn the decision into reconciliation. It remained a line that kept the next injury from growing larger. ${nameA} and ${nameB} still carried discomfort, yet they knew more clearly where the next wound would begin if they repeated the same certainty.`,
      `"${lesson}"`,
    ].join('\n\n')
  }

  if (locale === 'ja') {
    const balance = heavierName && lighterName
      ? `${heavierName}は先にうなずいたものの、そのうなずきは納得よりも疲れに近かった。${lighterName}はその表情を見て、自分の抱えていた悔しさが相手には別の圧力だったかもしれないと気づきました。`
      : `${nameA}と${nameB}は、結末を単純な勝ち負けに分けられませんでした。二人とも少しずつ納得できないものを残していたため、次の言葉は慎重にならざるを得ませんでした。`
    return [
      `${nameA}と${nameB}は、法廷を出るまで互いをまっすぐ見られませんでした。重くのしかかったのは、判決が下ったことだけでなく、もう聞かなかったふりをする余地がなくなったことでした。${balance} 法廷の外の短い沈黙は、相手を遠ざけるためではなく、判決後の最初の言葉を壊さないための間でした。`,
      `${action} 最初は必要な文だけが行き交いました。返信は短く、送る前に書いて消した跡だけが残ることもありました。それでも、以前のように悔しさで相手の言葉を断ち切ることはなく、その小さな抑制が判決後の最初の変化になりました。`,
      strong
        ? `数週間が過ぎると、争いの熱は新しい境界へと変わりました。${nameA}と${nameB}は、すべてが修復されたとは言いませんでしたが、同じ場面を違う記憶として抱えていたことはもう否定しませんでした。短い近況確認が交わされても、どちらもそれを和解の証拠として大げさには扱いませんでした。`
        : `時間が経っても、整理はそのまま和解にはなりませんでした。それでも判決は、次の傷がこれ以上大きくなるのを止める線として残りました。${nameA}と${nameB}はまだ不快感を抱えていましたが、同じ確信を繰り返せばどこからまた傷つくのかを以前よりはっきり知っていました。`,
      `「${lesson}」`,
    ].join('\n\n')
  }

  if (locale === 'zh-CN') {
    const balance = heavierName && lighterName
      ? `${heavierName}先点了头，但那更像疲惫而不是接受。${lighterName}看见那个表情后才意识到，自己抓住的委屈也可能成了压在对方身上的另一种重量。`
      : `${nameA}和${nameB}无法把结局简单分成胜者与败者。两人都还留着一点委屈，所以之后的每句话都不得不更谨慎。`
    return [
      `${nameA}和${nameB}走出法庭时，仍没有直接看向彼此。压在他们心上的不只是判决已经落下，而是再也不能假装没有听见。${balance} 法庭外那段短暂沉默，不再是把对方推开的方式，而是为了不把判决后的第一句话说坏。`,
      `${action} 起初，两人之间只交换必要的话。回复很短，有几次消息写了又删，只留下犹豫的痕迹。即便如此，他们没有像过去那样先用委屈打断对方，这一点克制成了判决后的第一项实际变化。`,
      strong
        ? `几周后，争执的热度慢慢退成新的边界。${nameA}和${nameB}没有说一切都已经修复，却也不再否认同一个场景会留下两种记忆。某天短短问候来回了一次，谁都没有把它夸大成关系恢复的证明。`
        : `时间过去后，整理并没有立刻变成和解。判决更像是一条线，先挡住下一次伤害继续扩大。${nameA}和${nameB}仍带着不适，但他们比以前更清楚，如果重复同样的确信，下一道伤会从哪里开始。`,
      `“${lesson}”`,
    ].join('\n\n')
  }

  const balance = heavierName && lighterName
    ? `${heavierName}는 먼저 고개를 끄덕였지만, 그 끄덕임은 승복보다 피로에 가까웠습니다. ${lighterName}는 그 표정을 보고서야 자신의 억울함이 상대에게는 또 다른 압박이었을 수 있다고 떠올렸습니다.`
    : `${nameA}와 ${nameB}는 결말을 쉽게 승자와 패자로 나누지 못했습니다. 둘 다 조금씩 억울했고, 그래서 다음 문장을 더 조심스럽게 골라야 했습니다.`
  return [
    `${nameA}와 ${nameB}는 법정을 나설 때까지 서로를 바로 보지 못했습니다. 무겁게 다가온 것은 판결이 끝났다는 사실뿐 아니라, 이제 더는 듣지 못한 척할 수 없다는 사실이었습니다. ${balance} 법정 밖의 짧은 침묵은 상대를 밀어내는 침묵이 아니라, 판결 뒤 첫 말을 망치지 않기 위한 멈춤에 가까웠습니다.`,
    `${action} 처음에는 필요한 문장만 오갔습니다. 답장은 짧았고, 몇 번은 쓰다가 지운 흔적만 남았습니다. 그래도 예전처럼 억울함을 앞세워 말을 끊지는 않았고, 그 작은 절제가 판결 뒤 첫 변화가 되었습니다.`,
    strong
      ? `몇 주가 지나자 다툼의 열기는 새로운 경계로 바뀌었습니다. ${nameA}와 ${nameB}는 모든 것이 회복되었다고 말하지 않았지만, 같은 장면을 서로 다르게 기억한다는 사실은 더 이상 부정하지 않았습니다. 짧은 안부가 오갔고, 누구도 그 안부를 화해의 증거로 과장하지 않았습니다.`
      : `시간이 지나도 정리가 곧 화해가 되지는 않았습니다. 다만 판결은 다음 상처가 더 커지기 전에 멈춰 세운 선으로 남았습니다. ${nameA}와 ${nameB}는 아직 불편함을 안고 있었지만, 같은 확신을 반복하면 어디서 다시 상처가 시작되는지 이전보다 선명히 알게 되었습니다.`,
    `"${lesson}"`,
  ].join('\n\n')
}

export function buildVerdictIntro(caseData: CaseData, relationLabel: string, turnCount: number, locale: LocaleCode): string {
  return getResultCopy(locale).verdictIntro(caseData.duo.partyA.name, caseData.duo.partyB.name, relationLabel, turnCount)
}

const PROFILE_TITLES = {
  ko: {
    cold_judge: { name: '냉철한 심판자', description: '증거와 논리를 중시하며, 엄격한 기준으로 공정한 판결을 내리는 타입입니다.' },
    practical_analyst: { name: '실용적 분석가', description: '논리적 분석을 바탕으로 현실적인 해결책을 찾아내는 타입입니다.' },
    balanced_sage: { name: '균형의 현자', description: '논리적이면서도 관대한 시선으로 원칙을 지키는 타입입니다.' },
    careful_mediator: { name: '신중한 중재자', description: '신중한 분석과 관용적 태도로 양측의 화해를 이끄는 타입입니다.' },
    instinct_judge: { name: '직감의 심판관', description: '직관적 판단과 엄격한 원칙으로 정의를 추구하는 타입입니다.' },
    passion_arbiter: { name: '열정의 조정관', description: '열정적인 공감과 단호한 판단으로 해결을 이끄는 타입입니다.' },
    gentle_guardian: { name: '온화한 수호자', description: '따뜻한 공감과 관대한 시선으로 원칙을 수호하는 타입입니다.' },
    warm_mediator: { name: '따뜻한 중재자', description: '공감과 이해를 바탕으로 양측 모두가 만족하는 화해를 추구하는 타입입니다.' },
    neutral_observer: { name: '중립의 관찰자', description: '편향 없이 균형 잡힌 시선으로 사건을 바라보는 타입입니다.' },
  },
  en: {
    cold_judge: { name: 'Cold Judge', description: 'A judge who favors evidence, logic, and strict standards for fair rulings.' },
    practical_analyst: { name: 'Practical Analyst', description: 'A judge who turns logical analysis into workable resolutions.' },
    balanced_sage: { name: 'Balanced Sage', description: 'A judge who protects principle with both logic and restraint.' },
    careful_mediator: { name: 'Careful Mediator', description: 'A judge who uses careful analysis and measured leniency to guide repair.' },
    instinct_judge: { name: 'Instinctive Judge', description: 'A judge who pursues justice through intuition and firm principles.' },
    passion_arbiter: { name: 'Passionate Arbiter', description: 'A judge who resolves conflict through empathy and decisive judgment.' },
    gentle_guardian: { name: 'Gentle Guardian', description: 'A judge who protects principle with warmth and patience.' },
    warm_mediator: { name: 'Warm Mediator', description: 'A judge who seeks reconciliation both sides can accept.' },
    neutral_observer: { name: 'Neutral Observer', description: 'A judge who reads the case with balanced, unbiased attention.' },
  },
  ja: {
    cold_judge: { name: '冷静な審判者', description: '証拠と論理を重視し、厳格な基準で公正な判断を下すタイプです。' },
    practical_analyst: { name: '実用的分析家', description: '論理的な分析をもとに現実的な解決策を見つけるタイプです。' },
    balanced_sage: { name: '均衡の賢者', description: '論理と寛容さをあわせ持ち、原則を守るタイプです。' },
    careful_mediator: { name: '慎重な仲裁者', description: '慎重な分析と節度ある寛容さで和解を導くタイプです。' },
    instinct_judge: { name: '直感の裁判官', description: '直感的な判断と厳格な原則で正義を追うタイプです。' },
    passion_arbiter: { name: '情熱の調停者', description: '強い共感と断固たる判断で解決へ導くタイプです。' },
    gentle_guardian: { name: '温和な守護者', description: '温かな共感と寛容な視線で原則を守るタイプです。' },
    warm_mediator: { name: '温かな仲裁者', description: '共感と理解をもとに、双方が受け入れられる和解を目指すタイプです。' },
    neutral_observer: { name: '中立の観察者', description: '偏りなく均衡の取れた視線で事件を見るタイプです。' },
  },
  'zh-CN': {
    cold_judge: { name: '冷静审判者', description: '重视证据与逻辑，以严格标准作出公正判决的类型。' },
    practical_analyst: { name: '实用分析者', description: '基于逻辑分析寻找现实解决方案的类型。' },
    balanced_sage: { name: '平衡贤者', description: '兼具逻辑与宽和视角，守住原则的类型。' },
    careful_mediator: { name: '谨慎调解者', description: '以谨慎分析和适度宽容引导双方修复的类型。' },
    instinct_judge: { name: '直觉裁判官', description: '凭直觉判断和严格原则追求正义的类型。' },
    passion_arbiter: { name: '热情仲裁者', description: '以强烈共情和果断判断推动解决的类型。' },
    gentle_guardian: { name: '温和守护者', description: '用温暖共情与宽和视角守护原则的类型。' },
    warm_mediator: { name: '温暖调解者', description: '基于共情与理解，追求双方都能接受的和解。' },
    neutral_observer: { name: '中立观察者', description: '以不偏不倚的平衡视角看待案件的类型。' },
  },
} as const

export function getProfileTitleInfo(titleId: string, locale: LocaleCode) {
  return PROFILE_TITLES[locale][titleId as keyof typeof PROFILE_TITLES.ko] ?? PROFILE_TITLES[locale].neutral_observer
}

export function getProfileDescription(titleId: string, locale: LocaleCode): string {
  return getProfileTitleInfo(titleId, locale).description
}

const TIER_LABELS: Record<LocaleCode, Record<JudgeTier, string>> = {
  ko: { apprentice: '견습 재판관', regular: '정식 재판관', veteran: '숙련 재판관', senior: '수석 재판관', legendary: '전설의 재판관' },
  en: { apprentice: 'Apprentice Judge', regular: 'Regular Judge', veteran: 'Veteran Judge', senior: 'Senior Judge', legendary: 'Legendary Judge' },
  ja: { apprentice: '見習い裁判官', regular: '正式裁判官', veteran: '熟練裁判官', senior: '主席裁判官', legendary: '伝説の裁判官' },
  'zh-CN': { apprentice: '见习裁判官', regular: '正式裁判官', veteran: '熟练裁判官', senior: '首席裁判官', legendary: '传奇裁判官' },
}

export function getJudgeTierLabel(tier: JudgeTier, locale: LocaleCode): string {
  return TIER_LABELS[locale][tier] ?? TIER_LABELS.ko[tier]
}

const AXIS_LABELS: Record<LocaleCode, Record<AxisKey, { negative: string; positive: string; label: string }>> = {
  ko: {
    inquiry: { negative: '논리', positive: '직관', label: '탐구' },
    judgment: { negative: '엄격', positive: '관용', label: '판결' },
    resolution: { negative: '원칙', positive: '화해', label: '해결' },
  },
  en: {
    inquiry: { negative: 'Logic', positive: 'Intuition', label: 'Inquiry' },
    judgment: { negative: 'Strict', positive: 'Lenient', label: 'Judgment' },
    resolution: { negative: 'Principle', positive: 'Reconcile', label: 'Resolution' },
  },
  ja: {
    inquiry: { negative: '論理', positive: '直感', label: '探求' },
    judgment: { negative: '厳格', positive: '寛容', label: '判断' },
    resolution: { negative: '原則', positive: '和解', label: '解決' },
  },
  'zh-CN': {
    inquiry: { negative: '逻辑', positive: '直觉', label: '探究' },
    judgment: { negative: '严格', positive: '宽容', label: '判断' },
    resolution: { negative: '原则', positive: '和解', label: '解决' },
  },
}

export function getAxisLabels(axis: AxisKey, locale: LocaleCode) {
  return AXIS_LABELS[locale][axis]
}

export function getAxisTagLabel(axis: AxisKey, value: number, locale: LocaleCode): string | null {
  if (Math.abs(value) < 12) return null
  const labels = getAxisLabels(axis, locale)
  return value < 0 ? labels.negative : labels.positive
}

const FRAGMENT_LABELS: Record<LocaleCode, Record<string, string>> = {
  ko: {
    reasoning_fragment: '추론',
    inquiry_fragment: '탐구',
    empathy_fragment: '공감',
    severity_fragment: '준엄',
    deliberation_fragment: '심리',
    leniency_fragment: '이해',
    jurisprudence_fragment: '법리',
    balance_fragment: '균형',
    reconciliation_fragment: '봉합',
  },
  en: {
    reasoning_fragment: 'Reasoning',
    inquiry_fragment: 'Inquiry',
    empathy_fragment: 'Empathy',
    severity_fragment: 'Severity',
    deliberation_fragment: 'Deliberation',
    leniency_fragment: 'Leniency',
    jurisprudence_fragment: 'Jurisprudence',
    balance_fragment: 'Balance',
    reconciliation_fragment: 'Reconciliation',
  },
  ja: {
    reasoning_fragment: '推論',
    inquiry_fragment: '探求',
    empathy_fragment: '共感',
    severity_fragment: '厳格',
    deliberation_fragment: '審理',
    leniency_fragment: '理解',
    jurisprudence_fragment: '法理',
    balance_fragment: '均衡',
    reconciliation_fragment: '修復',
  },
  'zh-CN': {
    reasoning_fragment: '推理',
    inquiry_fragment: '探究',
    empathy_fragment: '共情',
    severity_fragment: '严厉',
    deliberation_fragment: '审理',
    leniency_fragment: '理解',
    jurisprudence_fragment: '法理',
    balance_fragment: '平衡',
    reconciliation_fragment: '修复',
  },
}

export function getFragmentLabel(fragmentId: string, locale: LocaleCode): string {
  return FRAGMENT_LABELS[locale][fragmentId] ?? fragmentId
}

const TRAIT_LABELS: Record<LocaleCode, Record<TraitId, string>> = {
  ko: { logical: '논리', intuitive: '직관', strict: '엄격', lenient: '관용', principled: '원칙', reconciling: '화해' },
  en: { logical: 'Logic', intuitive: 'Intuition', strict: 'Strict', lenient: 'Lenient', principled: 'Principle', reconciling: 'Reconcile' },
  ja: { logical: '論理', intuitive: '直感', strict: '厳格', lenient: '寛容', principled: '原則', reconciling: '和解' },
  'zh-CN': { logical: '逻辑', intuitive: '直觉', strict: '严格', lenient: '宽容', principled: '原则', reconciling: '和解' },
}

export function getTraitLabel(traitId: TraitId, locale: LocaleCode): string {
  return TRAIT_LABELS[locale][traitId] ?? TRAIT_LABELS.ko[traitId]
}

const REWARD_TITLE_LABELS = {
  ko: {
    'perfect-judge': { name: '완벽한 판결', description: '통찰, 권위, 지혜가 모두 80점 이상입니다.' },
    'truth-seeker': { name: '진실 추적자', description: '통찰 90점 이상입니다.' },
    'wise-solomon': { name: '솔로몬의 지혜', description: '지혜 90점 이상입니다.' },
    'iron-judge': { name: '철의 재판관', description: '권위 90점 이상입니다.' },
    'speed-trial': { name: '신속 재판', description: '10턴 이내에 판결했습니다.' },
    'trust-builder': { name: '신뢰의 조정자', description: '신뢰 행동을 3회 이상 사용했습니다.' },
    'full-collapse': { name: '완전 붕괴', description: '모든 쟁점의 거짓말을 붕괴시켰습니다.' },
    'evidence-master': { name: '증거의 장인', description: '증거를 5개 이상 제시했습니다.' },
    'no-skill': { name: '맨손의 재판관', description: '스킬 없이 판결했습니다.' },
    merciful: { name: '자비로운 판결', description: '해결책을 3개 이상 선택했습니다.' },
    cautious: { name: '신중한 판단', description: '하나 이상의 쟁점을 보류했습니다.' },
    'dirty-hands': { name: '더러운 손', description: '위법 증거를 판결 근거로 사용했습니다.' },
    'perfect-clearance': { name: '완벽한 재판관', description: '100% 클리어율로 사건을 마쳤습니다.' },
    'evidence-weaver': { name: '증거의 직조자', description: '모든 조합을 발견했습니다.' },
    'deep-listener': { name: '깊은 경청자', description: '증인의 심층 증언을 충분히 들었습니다.' },
    'resource-master': { name: '자원의 장인', description: '여러 자원을 고르게 사용했습니다.' },
  },
  en: {
    'perfect-judge': { name: 'Perfect Verdict', description: 'Insight, Authority, and Wisdom all reached 80 or higher.' },
    'truth-seeker': { name: 'Truth Seeker', description: 'Insight reached 90 or higher.' },
    'wise-solomon': { name: 'Wisdom of Solomon', description: 'Wisdom reached 90 or higher.' },
    'iron-judge': { name: 'Iron Judge', description: 'Authority reached 90 or higher.' },
    'speed-trial': { name: 'Swift Trial', description: 'Delivered a verdict within 10 turns.' },
    'trust-builder': { name: 'Trust Builder', description: 'Used trust actions at least 3 times.' },
    'full-collapse': { name: 'Full Collapse', description: 'Collapsed every lie across the issues.' },
    'evidence-master': { name: 'Evidence Master', description: 'Presented at least 5 pieces of evidence.' },
    'no-skill': { name: 'Bare-Handed Judge', description: 'Delivered the verdict without using skills.' },
    merciful: { name: 'Merciful Verdict', description: 'Selected at least 3 resolutions.' },
    cautious: { name: 'Careful Judgment', description: 'Deferred at least one issue.' },
    'dirty-hands': { name: 'Dirty Hands', description: 'Used illegal evidence as grounds for the verdict.' },
    'perfect-clearance': { name: 'Perfect Clearance', description: 'Finished the case at 100% clearance.' },
    'evidence-weaver': { name: 'Evidence Weaver', description: 'Found every combination.' },
    'deep-listener': { name: 'Deep Listener', description: 'Heard enough deep witness testimony.' },
    'resource-master': { name: 'Resource Master', description: 'Used multiple resources evenly.' },
  },
  ja: {
    'perfect-judge': { name: '完全な判決', description: '洞察、権威、知恵がすべて80点以上です。' },
    'truth-seeker': { name: '真実の追跡者', description: '洞察が90点以上です。' },
    'wise-solomon': { name: 'ソロモンの知恵', description: '知恵が90点以上です。' },
    'iron-judge': { name: '鉄の裁判官', description: '権威が90点以上です。' },
    'speed-trial': { name: '迅速裁判', description: '10ターン以内に判決しました。' },
    'trust-builder': { name: '信頼の構築者', description: '信頼行動を3回以上使用しました。' },
    'full-collapse': { name: '完全崩壊', description: 'すべての争点の嘘を崩しました。' },
    'evidence-master': { name: '証拠の達人', description: '証拠を5つ以上提示しました。' },
    'no-skill': { name: '素手の裁判官', description: 'スキルを使わずに判決しました。' },
    merciful: { name: '慈悲ある判決', description: '解決策を3つ以上選択しました。' },
    cautious: { name: '慎重な判断', description: '1つ以上の争点を保留しました。' },
    'dirty-hands': { name: '汚れた手', description: '違法証拠を判決根拠として使用しました。' },
    'perfect-clearance': { name: '完全達成の裁判官', description: '100%達成率で事件を終えました。' },
    'evidence-weaver': { name: '証拠の織り手', description: 'すべての組み合わせを発見しました。' },
    'deep-listener': { name: '深い聞き手', description: '証人の深層証言を十分に聞きました。' },
    'resource-master': { name: '資源の達人', description: '複数の資源をバランスよく使用しました。' },
  },
  'zh-CN': {
    'perfect-judge': { name: '完美判决', description: '洞察、权威、智慧均达到80分以上。' },
    'truth-seeker': { name: '真相追踪者', description: '洞察达到90分以上。' },
    'wise-solomon': { name: '所罗门的智慧', description: '智慧达到90分以上。' },
    'iron-judge': { name: '铁面裁判官', description: '权威达到90分以上。' },
    'speed-trial': { name: '迅速审判', description: '在10回合内作出判决。' },
    'trust-builder': { name: '信任构筑者', description: '使用信任行动3次以上。' },
    'full-collapse': { name: '全面崩解', description: '击溃所有争点中的谎言。' },
    'evidence-master': { name: '证据大师', description: '提交至少5项证据。' },
    'no-skill': { name: '赤手裁判官', description: '未使用技能完成判决。' },
    merciful: { name: '仁慈判决', description: '选择至少3项解决方案。' },
    cautious: { name: '谨慎判断', description: '至少暂缓一个争点。' },
    'dirty-hands': { name: '不洁之手', description: '将违法证据作为判决依据。' },
    'perfect-clearance': { name: '完美通关裁判官', description: '以100%完成率结束案件。' },
    'evidence-weaver': { name: '证据编织者', description: '发现全部组合。' },
    'deep-listener': { name: '深度倾听者', description: '充分听取证人的深层证言。' },
    'resource-master': { name: '资源大师', description: '均衡使用多种资源。' },
  },
} as const

export function getRewardTitleInfo(title: { id: string; name?: string; description?: string }, locale: LocaleCode) {
  return REWARD_TITLE_LABELS[locale][title.id as keyof typeof REWARD_TITLE_LABELS.ko]
    ?? (locale === 'ko' ? { name: title.name ?? title.id, description: title.description ?? '' } : { name: title.id.replace(/-/g, ' '), description: '' })
}

const CLEARANCE_CATEGORY_LABELS: Record<LocaleCode, Record<ClearanceCategory, string>> = {
  ko: { evidence: '증거', combination: '조합', witness: '증인', interrogation: '심문', dispute: '쟁점' },
  en: { evidence: 'Evidence', combination: 'Combinations', witness: 'Witnesses', interrogation: 'Questioning', dispute: 'Issues' },
  ja: { evidence: '証拠', combination: '組み合わせ', witness: '証人', interrogation: '尋問', dispute: '争点' },
  'zh-CN': { evidence: '证据', combination: '组合', witness: '证人', interrogation: '询问', dispute: '争点' },
}

export function getClearanceCategoryLabel(category: ClearanceCategory, locale: LocaleCode): string {
  return CLEARANCE_CATEGORY_LABELS[locale][category] ?? CLEARANCE_CATEGORY_LABELS.ko[category]
}

const CLEARANCE_ITEM_LABELS: Record<LocaleCode, Record<string, string>> = {
  ko: {
    'evidence-unlocked': '모든 증거 해금',
    'evidence-presented': '모든 증거 제시',
    'evidence-investigated': '모든 증거 풀조사',
    'combination-auto': '자동 조합 완수',
    'combination-manual': '수동 조합 완수',
    'dossier-used': 'DossierCard 전부 사용',
    'witness-called': '모든 증인 소환',
    'witness-depth': '증인 심층 증언 도달',
    'question-triad': '질문 3유형 모두 사용',
    'contradiction-success': '모순 추궁 성공',
    'hidden-emerged': '숨은 쟁점 전부 발현',
    'disputes-s3': '모든 쟁점 S3 이상 도달',
    'separation-used': '분리 심문 사용',
    'confidential-used': '비공개 보호 사용',
  },
  en: {
    'evidence-unlocked': 'Unlock all evidence',
    'evidence-presented': 'Present all evidence',
    'evidence-investigated': 'Fully investigate all evidence',
    'combination-auto': 'Complete auto combinations',
    'combination-manual': 'Complete manual combinations',
    'dossier-used': 'Use every DossierCard',
    'witness-called': 'Call every witness',
    'witness-depth': 'Reach deep witness testimony',
    'question-triad': 'Use all 3 question types',
    'contradiction-success': 'Succeed with contradiction pursuit',
    'hidden-emerged': 'Reveal all hidden issues',
    'disputes-s3': 'Raise every issue to S3 or higher',
    'separation-used': 'Use separated questioning',
    'confidential-used': 'Use confidential protection',
  },
  ja: {
    'evidence-unlocked': 'すべての証拠を解放',
    'evidence-presented': 'すべての証拠を提示',
    'evidence-investigated': 'すべての証拠を完全調査',
    'combination-auto': '自動組み合わせを完了',
    'combination-manual': '手動組み合わせを完了',
    'dossier-used': 'DossierCardをすべて使用',
    'witness-called': 'すべての証人を召喚',
    'witness-depth': '証人の深層証言に到達',
    'question-triad': '3種類の質問をすべて使用',
    'contradiction-success': '矛盾追及に成功',
    'hidden-emerged': '隠れた争点をすべて発現',
    'disputes-s3': 'すべての争点をS3以上へ到達',
    'separation-used': '分離尋問を使用',
    'confidential-used': '非公開保護を使用',
  },
  'zh-CN': {
    'evidence-unlocked': '解锁全部证据',
    'evidence-presented': '提交全部证据',
    'evidence-investigated': '完整调查全部证据',
    'combination-auto': '完成自动组合',
    'combination-manual': '完成手动组合',
    'dossier-used': '使用全部 DossierCard',
    'witness-called': '传唤全部证人',
    'witness-depth': '抵达证人深层证言',
    'question-triad': '使用全部3类问题',
    'contradiction-success': '矛盾追问成功',
    'hidden-emerged': '显现全部隐藏争点',
    'disputes-s3': '全部争点达到S3以上',
    'separation-used': '使用分离询问',
    'confidential-used': '使用非公开保护',
  },
}

export function getClearanceItemLabel(itemId: string, fallback: string, locale: LocaleCode): string {
  return CLEARANCE_ITEM_LABELS[locale][itemId] ?? (locale === 'ko' ? fallback : itemId.replace(/-/g, ' '))
}

export function getMissedConnectionKindLabel(kind: 'auto' | 'manual' | 'other', locale: LocaleCode): string {
  const labels = {
    ko: { auto: '자동 조합', manual: '수동 조합', other: '기타 연결' },
    en: { auto: 'Auto Combination', manual: 'Manual Combination', other: 'Other Link' },
    ja: { auto: '自動組み合わせ', manual: '手動組み合わせ', other: 'その他の接続' },
    'zh-CN': { auto: '自动组合', manual: '手动组合', other: '其他连接' },
  } as const
  return labels[locale][kind]
}

export function formatCountSuffix(count: number, locale: LocaleCode): string {
  if (locale === 'ko') return `${count}건`
  if (locale === 'ja') return `${count}件`
  if (locale === 'zh-CN') return `${count}项`
  return `${count}`
}
