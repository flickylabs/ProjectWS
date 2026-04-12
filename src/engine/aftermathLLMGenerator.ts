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

  return `당신은 한국 법정 드라마의 내레이터입니다. 재판이 끝난 후의 후일담을 3인칭 관찰 시점으로 작성해주세요.

## 사건 정보
- 사건: ${caseData.meta?.title ?? ''}
- ${partyA.name} (${partyA.age}세, ${partyA.occupation}): ${partyA.fear}
- ${partyB.name} (${partyB.age}세, ${partyB.occupation}): ${partyB.fear}

## 재판관의 판결
책임 비율: ${respText}
해결안: ${verdictDetails.selectedResolution}

### 쟁점별 판단
${judgmentLines}

### 안건별 책임 평가
${issueLines}

### 심문 중 핵심 발견
${discoveryLines}

### 재판관 평가
- 통찰: ${scores.insight}점, 권위: ${scores.authority}점, 지혜: ${scores.wisdom}점
- 칭호: ${title}

## 작성 규칙
1. 3인칭 관찰 시점 (내레이터)
2. 3~4문단, 각 문단 2~3문장
3. 1문단: 판결 직후 두 사람의 반응 (판결 내용 반영)
4. 2문단: 판결이 각자의 삶에 미치는 영향 (해결안 반영)
5. 3문단: 숨겨졌던 것들이 드러난 후의 변화 (핵심 발견 반영)
6. 마지막에 줄바꿈 후 교훈 한 문장: 이 사건에서 얻을 수 있는 삶의 교훈을 한 줄로 남긴다. 격언이나 명언이 아니라, 이 사건만의 구체적 통찰이어야 한다. 예: "숨기는 것이 지키는 것이 되는 순간, 관계는 이미 무너지고 있었다."
7. 실명 사용 (${partyA.name}, ${partyB.name})
8. 합니다체가 아닌 서술체 ("~했다", "~였다")
9. 번역체 금지, 기획 용어 금지
10. 감정 과잉 금지 — 담담하되 깊이 있게`
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
