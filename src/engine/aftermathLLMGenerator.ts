/**
 * V4 후일담 LLM 생성기.
 * 플레이어의 판결 내용(쟁점별 판단, 안건별 책임, 해결안)을 반영한 맞춤형 후일담을 생성.
 * 스크립트 후일담(aftermathResolver.ts)을 폴백으로 사용.
 */

import type { CaseData, VerdictInput } from '../types'

export interface AftermathLLMInput {
  caseData: CaseData
  verdictInput: VerdictInput
  /** 판결 4단계에서 플레이어가 선택한 구체 내용 */
  verdictDetails: {
    /** Step 1: 쟁점별 판단 (disputeId → 선택한 옵션 텍스트) */
    disputeJudgments: Record<string, string>
    /** Step 2: 안건별 책임 (안건 설명 → 경미~중대 수치 0~100) */
    issueWeights: Record<string, number>
    /** Step 3: 선택한 해결안 */
    selectedResolution: string
  }
  /** 통찰/권위/지혜 점수 */
  scores: { insight: number; authority: number; wisdom: number }
  /** 칭호 */
  title: string
  /** 핵심 발견 (S5 도달, 숨겨진 쟁점 발견 등) */
  keyDiscoveries: string[]
}

/**
 * LLM 후일담 생성을 위한 프롬프트를 조립합니다.
 * 실제 LLM 호출은 외부에서 수행합니다.
 */
export function buildAftermathPrompt(input: AftermathLLMInput): string {
  const { caseData, verdictInput, verdictDetails, scores, title, keyDiscoveries } = input
  const partyA = caseData.duo.partyA
  const partyB = caseData.duo.partyB

  // 책임 비율 계산
  const avgResp = computeAverageResponsibility(caseData, verdictInput)
  const respText = avgResp
    ? `${partyA.name} ${avgResp.a}% : ${partyB.name} ${avgResp.b}%`
    : '판단 보류'

  // 쟁점별 판단 정리
  const judgmentLines = Object.entries(verdictDetails.disputeJudgments)
    .map(([dId, judgment]) => {
      const dispute = caseData.disputes.find(d => d.id === dId)
      return dispute ? `- ${dispute.name}: "${judgment}"` : null
    })
    .filter(Boolean)
    .join('\n')

  // 안건별 책임 정리
  const issueLines = Object.entries(verdictDetails.issueWeights)
    .map(([issue, weight]) => `- ${issue}: ${weight <= 30 ? '경미' : weight <= 70 ? '보통' : '중대'}`)
    .join('\n')

  // 핵심 발견 정리
  const discoveryLines = keyDiscoveries.length > 0
    ? keyDiscoveries.map(d => `- ${d}`).join('\n')
    : '- 특별한 발견 없음'

  // 쟁점별 진실 요약 (truthDescription)
  const truthLines = caseData.disputes
    .filter(d => !d.hidden && d.v3Visibility !== 'hidden')
    .map(d => `- ${d.name}: ${d.truthDescription ?? d.judgmentStatement ?? ''}`)
    .join('\n')

  // 숨겨진 쟁점의 진실
  const hiddenTruthLines = caseData.disputes
    .filter(d => d.hidden || d.v3Visibility === 'hidden')
    .filter(d => keyDiscoveries.some(k => k.includes(d.name) || k.includes(d.id)))
    .map(d => `- [발견됨] ${d.name}: ${d.truthDescription ?? ''}`)
    .join('\n')

  return `당신은 한국 법정 드라마의 내레이터입니다. 재판이 끝난 뒤 후일담을 작성합니다.

## 등장인물
${partyA.name} (${partyA.age}세, ${partyA.occupation})
- 성격: ${partyA.archetype ?? '방어적'}
- 두려움: ${partyA.fear}

${partyB.name} (${partyB.age}세, ${partyB.occupation})
- 성격: ${partyB.archetype ?? '방어적'}
- 두려움: ${partyB.fear}

관계: ${caseData.duo.relationshipType}

## 사건의 진실
${truthLines}
${hiddenTruthLines ? `\n${hiddenTruthLines}` : ''}

## 재판관의 판결
책임 비율: ${respText}
해결안: ${verdictDetails.selectedResolution}

### 쟁점별 판단
${judgmentLines}

### 심문에서 밝혀진 것들
${discoveryLines}

## 작성 지시
3인칭 관찰자 시점. 서술체("~했다", "~였다"). 총 3문단, 각 문단 3~5문장으로 구체적이고 밀도 있게 쓰세요.

**1문단 — 판결 직후**
재판관이 판결을 내리는 순간의 장면. ${partyA.name}과 ${partyB.name} 각각의 표정과 반응. 판결 내용(책임 비율, 해결안)이 발표될 때 두 사람이 어떤 감정을 보이는지. 예상과 달랐는지, 체념했는지, 분노했는지를 구체적으로 묘사.

**2문단 — 드러난 진실의 무게**
심문 과정에서 밝혀진 핵심 사실들이 두 사람의 관계에 어떤 의미인지. 숨겨왔던 것이 드러났을 때의 충격, 혹은 이미 알고 있었지만 말하지 못했던 것의 해방감. 판결 이후 각자가 어떤 선택을 하게 되는지. 구체적 사실(금액, 사건, 행동)을 섞어 서술.

**3문단 — 이후의 삶**
며칠, 몇 주 뒤의 장면. 해결안이 실행되면서 벌어지는 일상의 변화. 관계가 회복되는지 끊어지는지, 또는 새로운 형태로 재편되는지. 마지막 문장은 여운을 남기되 과장 없이 마무리.

줄바꿈 후 **교훈 한 문장**: 이 사건만의 구체적 통찰. 격언이 아니라 이 사건에서만 나올 수 있는 교훈.
예: "숨기는 것이 지키는 것이 되는 순간, 관계는 이미 무너지고 있었다."

## 금지
- 번역체, 기획 용어, "~된 것으로 생각됩니다" 류
- 합니다체 사용 금지
- 감정 과잉 (울었다, 소리쳤다 등 반복)
- 추상적 표현 — 항상 구체적 사실에 기반`
}

function computeAverageResponsibility(caseData: CaseData, verdictInput: VerdictInput): { a: number; b: number } | null {
  let totalA = 0, totalB = 0, count = 0
  for (const dispute of caseData.disputes) {
    const r = verdictInput.responsibility[dispute.id]
    if (!r) continue
    totalA += r.a
    totalB += r.b
    count++
  }
  if (count === 0) return null
  return { a: Math.round(totalA / count), b: Math.round(totalB / count) }
}

/**
 * 후일담 텍스트 후처리.
 * LLM 출력에서 불필요한 마크다운/메타데이터 제거.
 */
export function postProcessAftermath(raw: string): string {
  let text = raw.trim()
  // 마크다운 헤더 제거
  text = text.replace(/^#{1,3}\s+.+$/gm, '').trim()
  // 빈 줄 정리
  text = text.replace(/\n{3,}/g, '\n\n')
  return text
}
