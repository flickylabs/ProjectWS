import type { CaseData, VerdictInput, VerdictResultSnapshot } from '../types'
import type { VerdictSummary } from './verdictSummaryEngine'
import { pp과와, pp은는 } from './koreanPostposition'
import { resolveScriptedAftermath } from './aftermathResolver'

export type VerdictScoreLike = {
  total: number
  insight: number
  authority: number
  wisdom: number
}

export function getVerdictRatingLabel(score: number): string {
  if (score >= 90) return '전설'
  if (score >= 75) return '우수'
  if (score >= 60) return '양호'
  if (score >= 40) return '보통'
  return '미흡'
}

export function getRelationshipLabelForSnapshot(caseData: CaseData): string {
  const relType = caseData.meta?.relationshipType ?? caseData.duo.relationshipType
  const labels: Record<string, string> = {
    spouse: '부부',
    friend: '친구',
    neighbor: '이웃',
    partnership: '동업',
    boss_employee: '직장',
    workplace: '직장',
    tenant_landlord: '세입자',
    tenant: '세입자',
    family: '가족',
    headline: '헤드라인',
    online: '온라인',
    professional: '의료·전문직',
    civic: '공공·시민',
    public_system: '공공·시민',
    medical_education: '의료·교육',
  }
  return labels[relType] ?? '당사자'
}

export function buildDefaultAftermath(caseData: CaseData, score: VerdictScoreLike, verdictInput: VerdictInput): string {
  const scripted = resolveScriptedAftermath(caseData, verdictInput)
  if (scripted?.text) return scripted.text

  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const pA = pp과와(nameA)
  const pB = pp은는(nameB)
  const solutions = verdictInput.selectedSolutions
    .map((entry) => entry.includes('::') ? entry.slice(entry.indexOf('::') + 2) : entry)
    .map((entry) => entry.trim().replace(/[.。]+$/g, ''))
    .filter(Boolean)
  const solutionText = solutions.slice(0, 2).join('. ') || '판결문에 적힌 조치'

  if (score.total >= 75) {
    return `${nameA}${pA} ${nameB}${pB} 판결 직후에도 쉽게 웃지는 못했지만, 두 사람은 적어도 무엇을 바로잡아야 하는지 같은 문장으로 받아들였다. 법정 밖으로 나서는 동안 남은 침묵은 패배감보다 정리해야 할 말의 무게에 가까웠다.\n\n며칠 뒤 두 사람은 ${solutionText}을 기준으로 다시 연락했다. 감정은 여전히 조심스러웠지만, 이전처럼 확인하지 않은 말로 상대를 밀어붙이는 일은 줄었다.\n\n한 달이 지나자 판결은 두 사람 사이에서 차가운 기록이 아니라 다시 같은 실수를 반복하지 않기 위한 기준선이 되었다. 관계가 완전히 회복된 것은 아니었으나, 적어도 책임을 덮지 않고 다음 행동을 고르는 쪽으로 움직였다.\n\n\"책임을 적어야 관계도 다시 읽힌다.\"`
  }

  if (score.total >= 50) {
    return `${nameA}${pA} ${nameB}${pB} 판결을 받아들였지만, 누구도 완전히 만족한 얼굴은 아니었다. 그래도 법정의 결론은 억울함을 더 키우기 전에 멈춰 세운 최소한의 기준이 되었다.\n\n이후 두 사람은 ${solutionText}을 두고 필요한 말만 주고받았다. 불만은 남았지만, 같은 오해가 어디에서 반복되는지는 서로 알고 있었다.\n\n시간이 지나도 정리가 곧 화해가 되지는 않았다. 다만 이번에는 감정이 앞서기 전에 기록과 절차를 확인해야 한다는 사실만큼은 남았다.\n\n\"오해를 멈추는 첫 절차는 확인이다.\"`
  }

  return `${nameA}${pA} ${nameB}${pB} 판결 뒤에도 쉽게 자리를 뜨지 못했다. 결론은 나왔지만, 사건의 감정까지 설득하기에는 아직 남은 말이 많았다.\n\n선택된 조치는 ${solutionText}이었으나, 두 사람은 그것이 충분한지 끝내 같은 표정을 짓지 못했다. 그래도 이번 판결은 더 큰 오해로 번지기 전에 멈춰 서야 할 지점을 표시했다.\n\n며칠 뒤의 일상은 이전과 비슷했지만, 두 사람은 같은 방식으로 돌아가지는 못했다. 감정이 앞서기 전에 확인해야 한다는 사실만큼은 법정 밖에도 남았다.\n\n\"확인 없는 말은 법정 밖에서도 판결이 된다.\"`
}

export function buildVerdictResultSnapshot(args: {
  caseData: CaseData
  verdictInput: VerdictInput
  score: VerdictScoreLike
  verdictSummary?: VerdictSummary
  aftermath?: string
}): VerdictResultSnapshot {
  const { caseData, verdictInput, score, verdictSummary, aftermath } = args
  return {
    version: 1,
    capturedAt: new Date().toISOString(),
    caseTitle: caseData.meta?.title ?? `${caseData.duo.partyA.name} vs ${caseData.duo.partyB.name}`,
    relationshipLabel: getRelationshipLabelForSnapshot(caseData),
    score: {
      total: score.total,
      insight: score.insight,
      authority: score.authority,
      wisdom: score.wisdom,
      rating: getVerdictRatingLabel(score.total),
    },
    factFindings: caseData.disputes.map((dispute) => ({
      id: dispute.id,
      name: dispute.name,
      finding: verdictInput.factFindings[dispute.id] ?? 'pending',
      truth: dispute.truth,
    })),
    selectedSolutions: [...verdictInput.selectedSolutions],
    verdictSummary,
    aftermath,
  }
}
