/**
 * 판결문 자동 초안 엔진
 * - 순수 함수: ProcessMetrics + 판결 결과 + 성향 정보 → 판결문 초안
 * - 책임 배분 근거, 결정적 증거, 결정적 순간, 해결안, 재판관 성향 반영
 */

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
  judgeTitle: string
  totalTurns: number
  contradictionsFound: number
}

const LIE_STATE_LABELS: Record<string, string> = {
  S0: '완전 부정',
  S1: '일부 인정',
  S2: '핑계',
  S3: '책임 전가',
  S4: '감정적 동요',
  S5: '자백',
}

/**
 * 판결문 자동 초안 생성
 */
export function generateVerdictSummary(input: VerdictSummaryInput): VerdictSummary {
  const {
    caseName, partyAName, partyBName, percentA,
    selectedSolution, keyEvidenceNames, keyTransition,
    judgeTitle, totalTurns, contradictionsFound,
  } = input
  const percentB = 100 - percentA

  const title = `판결문 — ${caseName}`

  const caseSummary =
    `본 사건은 ${partyAName}과(와) ${partyBName} 간의 분쟁으로, ` +
    `총 ${totalTurns}턴의 심리를 거쳐 판결에 이르렀습니다.`

  // 책임 배분 근거 (비율에 따라 톤 변화)
  let responsibilityReason: string
  if (percentA > 70) {
    responsibilityReason =
      `심리 과정에서 ${partyAName}의 진술에 ${contradictionsFound}건의 모순이 발견되었으며, ` +
      `주요 증거가 이를 뒷받침합니다. 따라서 ${partyAName}에게 주된 책임이 있다고 판단합니다.`
  } else if (percentA > 55) {
    responsibilityReason =
      `양측 모두 일부 책임이 있으나, 증거와 진술 분석 결과 ` +
      `${partyAName}의 책임이 더 큰 것으로 판단합니다.`
  } else if (percentA >= 45) {
    responsibilityReason =
      `양측의 주장을 종합적으로 검토한 결과, 책임이 비교적 균등하게 분배됩니다.`
  } else if (percentA >= 30) {
    responsibilityReason =
      `양측 모두 일부 책임이 있으나, 증거와 진술 분석 결과 ` +
      `${partyBName}의 책임이 더 큰 것으로 판단합니다.`
  } else {
    responsibilityReason =
      `심리 과정에서 ${partyBName}의 책임이 더 크게 드러났습니다.`
  }

  // 결정적 순간
  let keyMoment = '특별한 전환점 없이 점진적으로 진행되었습니다.'
  if (keyTransition) {
    const fromLabel = LIE_STATE_LABELS[keyTransition.from] ?? keyTransition.from
    const toLabel = LIE_STATE_LABELS[keyTransition.to] ?? keyTransition.to
    keyMoment = `${keyTransition.party}이(가) ${fromLabel}에서 ${toLabel}로 전환된 순간이 결정적이었습니다.`
  }

  const judgeStyle = `본 재판은 "${judgeTitle}" 성향의 재판관에 의해 진행되었습니다.`

  const evidenceText = keyEvidenceNames.length > 0
    ? `결정적 증거로는 ${keyEvidenceNames.join(', ')}이(가) 활용되었습니다.`
    : '특별히 결정적인 증거 없이 진술 분석 위주로 진행되었습니다.'

  const fullText = [
    title,
    '',
    caseSummary,
    '',
    `■ 책임 배분: ${partyAName} ${percentA}% / ${partyBName} ${percentB}%`,
    responsibilityReason,
    '',
    `■ ${evidenceText}`,
    '',
    `■ 결정적 순간: ${keyMoment}`,
    '',
    `■ 해결 방향: ${selectedSolution}`,
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
    resolution: selectedSolution,
    judgeStyle,
    fullText,
  }
}
