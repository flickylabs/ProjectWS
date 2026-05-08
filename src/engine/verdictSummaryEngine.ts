/**
 * 판결문 자동 초안 엔진
 * - 순수 함수: ProcessMetrics + 판결 결과 + 성향 정보 → 판결문 초안
 * - 책임 배분 근거, 결정적 증거, 결정적 순간, 해결안, 재판관 성향 반영
 */
import { pp과와, pp이가 } from './koreanPostposition'
import { getCurrentLocale, type LocaleCode } from '../i18n'
import { hasUnexpectedHangulForLocale } from '../i18n/llmLocale'

export interface VerdictSummary {
  /** 판결문 제목 */
  title: string
  /** 사건 요약 (1문장) */
  caseSummary: string
  /** 책임 배분 */
  responsibility: {
    partyA: string
    percentA: number
    partyB: string
    percentB: number
  }
  /** 배분 근거 (2-3문장) */
  responsibilityReason: string
  /** 결정적 증거 */
  keyEvidence: string[]
  /** 결정적 순간 (lieState 전이 시점) */
  keyMoment: string
  /** 선택한 해결안 */
  resolution: string
  /** 재판관 성향 한 줄 */
  judgeStyle: string
  /** 전체 판결문 텍스트 (자동 생성) */
  fullText: string
}

export interface VerdictSummaryInput {
  caseName: string
  partyAName: string
  partyBName: string
  percentA: number
  selectedSolution: string
  keyEvidenceNames: string[]
  keyTransition: { party: string; from: string; to: string } | null
  keyMomentText?: string
  judgeTitle: string
  totalTurns: number
  contradictionsFound: number
  locale?: LocaleCode
}

const LIE_STATE_LABELS: Record<LocaleCode, Record<string, string>> = {
  ko: { S0: '방어', S1: '동요', S2: '변명', S3: '궁지', S4: '한계', S5: '고백' },
  en: { S0: 'defense', S1: 'shaken', S2: 'excuse', S3: 'cornered', S4: 'at the limit', S5: 'confession' },
  ja: { S0: '防御', S1: '動揺', S2: '弁明', S3: '窮地', S4: '限界', S5: '告白' },
  'zh-CN': { S0: '防备', S1: '动摇', S2: '辩解', S3: '被逼入角', S4: '达到极限', S5: '承认' },
}

const SUMMARY_COPY = {
  ko: {
    unselected: '미선택',
    title: (caseName: string) => `판결문 — ${caseName}`,
    caseSummary: (partyA: string, partyB: string, turns: number) =>
      `본 사건은 ${partyA}${pp과와(partyA)} ${partyB} 간의 분쟁으로, 총 ${turns}턴의 심리를 거쳐 판결에 이르렀습니다.`,
    reasonAHeavy: (party: string, contradictions: number) =>
      `심리 과정에서 ${party}의 진술에 ${contradictions}건의 모순이 발견되었으며, 주요 증거가 이를 뒷받침합니다. 따라서 ${party}에게 주된 책임이 있다고 판단합니다.`,
    reasonAGreater: (party: string) => `양측 모두 일부 책임이 있으나, 증거와 진술 분석 결과 ${party}의 책임이 더 큰 것으로 판단합니다.`,
    reasonEven: '양측의 주장을 종합적으로 검토한 결과, 책임이 비교적 균등하게 분배됩니다.',
    reasonBGreater: (party: string) => `양측 모두 일부 책임이 있으나, 증거와 진술 분석 결과 ${party}의 책임이 더 큰 것으로 판단합니다.`,
    reasonBHeavy: (party: string) => `심리 과정에서 ${party}의 책임이 더 크게 드러났습니다.`,
    defaultMoment: '특별한 전환점 없이 점진적으로 진행되었습니다.',
    transitionMoment: (party: string, from: string, to: string) => `${party}${pp이가(party)} ${from}에서 ${to}로 전환된 순간이 결정적이었습니다.`,
    judgeStyle: (judgeTitle: string) => `본 재판은 "${judgeTitle}" 성향의 재판관에 의해 진행되었습니다.`,
    evidence: (names: string[]) => names.length > 0
      ? `결정적 증거로는 ${names.join(', ')} 등이 활용되었습니다.`
      : '특별히 결정적인 증거 없이 진술 분석 위주로 진행되었습니다.',
    labels: {
      responsibility: '책임 배분',
      keyMoment: '결정적 순간',
      resolution: '해결 방향',
    },
  },
  en: {
    unselected: 'No resolution selected',
    title: (caseName: string) => `Verdict Record — ${caseName}`,
    caseSummary: (partyA: string, partyB: string, turns: number) =>
      `This case concerns a dispute between ${partyA} and ${partyB}, reaching a verdict after ${turns} turns of examination.`,
    reasonAHeavy: (party: string, contradictions: number) =>
      `${party}'s statements showed ${contradictions} contradiction(s) during the examination, and the key evidence supported that reading. Primary responsibility was therefore placed on ${party}.`,
    reasonAGreater: (party: string) => `Both sides carried some responsibility, but the evidence and testimony placed greater responsibility on ${party}.`,
    reasonEven: 'After reviewing both sides, responsibility was distributed relatively evenly.',
    reasonBGreater: (party: string) => `Both sides carried some responsibility, but the evidence and testimony placed greater responsibility on ${party}.`,
    reasonBHeavy: (party: string) => `The examination showed heavier responsibility on ${party}.`,
    defaultMoment: 'The case progressed gradually without a single decisive turning point.',
    transitionMoment: (party: string, from: string, to: string) => `${party}'s shift from ${from} to ${to} became the decisive moment.`,
    judgeStyle: (judgeTitle: string) => `This trial was conducted by a judge with the "${judgeTitle}" profile.`,
    evidence: (names: string[]) => names.length > 0
      ? `The decisive evidence included ${names.join(', ')}.`
      : 'The verdict relied mainly on testimony analysis rather than a single decisive evidence item.',
    labels: {
      responsibility: 'Responsibility',
      keyMoment: 'Decisive Moment',
      resolution: 'Resolution',
    },
  },
  ja: {
    unselected: '未選択',
    title: (caseName: string) => `判決記録 — ${caseName}`,
    caseSummary: (partyA: string, partyB: string, turns: number) =>
      `本件は${partyA}と${partyB}の間の紛争であり、全${turns}ターンの審理を経て判決に至りました。`,
    reasonAHeavy: (party: string, contradictions: number) =>
      `審理の過程で${party}の供述には${contradictions}件の矛盾が確認され、主要な証拠もそれを裏づけました。そのため、${party}に主たる責任があると判断しました。`,
    reasonAGreater: (party: string) => `双方に一定の責任はありますが、証拠と供述の分析から${party}の責任がより重いと判断しました。`,
    reasonEven: '双方の主張を総合的に検討した結果、責任は比較的均等に配分されます。',
    reasonBGreater: (party: string) => `双方に一定の責任はありますが、証拠と供述の分析から${party}の責任がより重いと判断しました。`,
    reasonBHeavy: (party: string) => `審理の過程で${party}の責任がより重く明らかになりました。`,
    defaultMoment: '特定の転換点はなく、審理は段階的に進みました。',
    transitionMoment: (party: string, from: string, to: string) => `${party}が${from}から${to}へ移った瞬間が決定的でした。`,
    judgeStyle: (judgeTitle: string) => `本裁判は「${judgeTitle}」タイプの裁判官によって進められました。`,
    evidence: (names: string[]) => names.length > 0
      ? `決定的な証拠として、${names.join('、')}などが用いられました。`
      : '特に決定的な証拠はなく、供述分析を中心に進められました。',
    labels: {
      responsibility: '責任配分',
      keyMoment: '決定的な瞬間',
      resolution: '解決方針',
    },
  },
  'zh-CN': {
    unselected: '未选择',
    title: (caseName: string) => `判决记录 — ${caseName}`,
    caseSummary: (partyA: string, partyB: string, turns: number) =>
      `本案是${partyA}与${partyB}之间的纠纷，经过共 ${turns} 回合审理后作出裁决。`,
    reasonAHeavy: (party: string, contradictions: number) =>
      `审理过程中，${party}的陈述出现了 ${contradictions} 处矛盾，关键证据也支持这一判断。因此，主要责任由${party}承担。`,
    reasonAGreater: (party: string) => `双方均承担一定责任，但结合证据与陈述分析，${party}承担更大责任。`,
    reasonEven: '综合审查双方主张后，责任分配较为接近。',
    reasonBGreater: (party: string) => `双方均承担一定责任，但结合证据与陈述分析，${party}承担更大责任。`,
    reasonBHeavy: (party: string) => `审理过程中，${party}的责任更为明显。`,
    defaultMoment: '案件没有单一决定性转折，而是逐步推进至结论。',
    transitionMoment: (party: string, from: string, to: string) => `${party}从${from}转入${to}的瞬间成为关键转折。`,
    judgeStyle: (judgeTitle: string) => `本次审判由“${judgeTitle}”类型的裁判官主持。`,
    evidence: (names: string[]) => names.length > 0
      ? `决定性证据包括${names.join('、')}等。`
      : '本次审理主要依靠陈述分析，并无单一决定性证据。',
    labels: {
      responsibility: '责任分配',
      keyMoment: '关键时刻',
      resolution: '解决方向',
    },
  },
} as const satisfies Record<LocaleCode, unknown>

function normalizeSelectedSolutionText(text: string, locale: LocaleCode): string {
  return text
    .split(',')
    .map((item) => {
      const separatorIndex = item.indexOf('::')
      const visibleText = separatorIndex >= 0 ? item.slice(separatorIndex + 2) : item
      return visibleText.trim().replace(/[.。]+$/g, '').trim()
    })
    .filter((item) => item && !hasUnexpectedHangulForLocale(item, locale))
    .join('. ')
}

/**
 * 판결문 자동 초안 생성
 */
export function generateVerdictSummary(input: VerdictSummaryInput): VerdictSummary {
  const {
    caseName, partyAName, partyBName, percentA,
    selectedSolution, keyEvidenceNames, keyTransition,
    judgeTitle, totalTurns, contradictionsFound, keyMomentText,
  } = input
  const locale = input.locale ?? getCurrentLocale()
  const copy = SUMMARY_COPY[locale]
  const percentB = 100 - percentA
  const selectedSolutionText = normalizeSelectedSolutionText(selectedSolution, locale) || copy.unselected

  const title = copy.title(caseName)

  const caseSummary = copy.caseSummary(partyAName, partyBName, totalTurns)

  // 책임 배분 근거 (비율에 따라 톤 변화)
  let responsibilityReason: string
  if (percentA > 70) {
    responsibilityReason = copy.reasonAHeavy(partyAName, contradictionsFound)
  } else if (percentA > 55) {
    responsibilityReason = copy.reasonAGreater(partyAName)
  } else if (percentA >= 45) {
    responsibilityReason = copy.reasonEven
  } else if (percentA >= 30) {
    responsibilityReason = copy.reasonBGreater(partyBName)
  } else {
    responsibilityReason = copy.reasonBHeavy(partyBName)
  }

  // 결정적 순간
  let keyMoment = keyMomentText?.trim() || copy.defaultMoment
  if (!keyMomentText && keyTransition) {
    const labels = LIE_STATE_LABELS[locale]
    const fromLabel = labels[keyTransition.from] ?? keyTransition.from
    const toLabel = labels[keyTransition.to] ?? keyTransition.to
    keyMoment = copy.transitionMoment(keyTransition.party, fromLabel, toLabel)
  }

  const judgeStyle = copy.judgeStyle(judgeTitle)

  const evidenceText = copy.evidence(keyEvidenceNames)

  const fullText = [
    title,
    '',
    caseSummary,
    '',
    `■ ${copy.labels.responsibility}: ${partyAName} ${percentA}% / ${partyBName} ${percentB}%`,
    responsibilityReason,
    '',
    `■ ${evidenceText}`,
    '',
    `■ ${copy.labels.keyMoment}: ${keyMoment}`,
    '',
    `■ ${copy.labels.resolution}: ${selectedSolutionText}`,
    '',
    judgeStyle,
  ].join('\n')

  return {
    title,
    caseSummary,
    responsibility: { partyA: partyAName, percentA, partyB: partyBName, percentB },
    responsibilityReason,
    keyEvidence: keyEvidenceNames,
    keyMoment,
    resolution: selectedSolutionText,
    judgeStyle,
    fullText,
  }
}
