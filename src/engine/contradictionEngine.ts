import type { ClaimNode } from '../types'

export interface ContradictionResult {
  found: boolean
  claimA?: ClaimNode
  claimB?: ClaimNode
  disputeId: string
}

/**
 * 주장 그래프에서 같은 쟁점에 대한 A/B 발언 간 모순을 탐지한다.
 */
export function detectContradictions(claims: ClaimNode[]): ContradictionResult[] {
  const byDispute = new Map<string, { a: ClaimNode[]; b: ClaimNode[] }>()

  for (const claim of claims) {
    if (!byDispute.has(claim.disputeId)) {
      byDispute.set(claim.disputeId, { a: [], b: [] })
    }
    byDispute.get(claim.disputeId)![claim.claimant].push(claim)
  }

  const results: ContradictionResult[] = []

  for (const [disputeId, sides] of byDispute) {
    if (sides.a.length > 0 && sides.b.length > 0) {
      // 양측 모두 발언한 쟁점 → 모순 가능성
      const latestA = sides.a[sides.a.length - 1]
      const latestB = sides.b[sides.b.length - 1]

      if (latestA.status !== 'collapsed' && latestB.status !== 'collapsed') {
        results.push({
          found: true,
          claimA: latestA,
          claimB: latestB,
          disputeId,
        })
      }
    }
  }

  return results
}

/**
 * 같은 화자의 이전 발언과 현재 발언이 실질적으로 모순되는지 1차 필터링.
 * 이 함수는 빠른 사전 필터만 하고, 실제 모순 판정은 LLM이 수행한다.
 * confidence/status 변화가 있어야 후보로 올린다.
 */
export function detectStatementChange(
  claims: ClaimNode[],
  newClaim: Omit<ClaimNode, 'id'>,
): boolean {
  const previous = claims.filter(
    (c) => c.claimant === newClaim.claimant && c.disputeId === newClaim.disputeId,
  )

  if (previous.length === 0) return false

  const last = previous[previous.length - 1]

  // 완전히 같으면 모순 아님
  if (last.summary === newClaim.summary) return false

  // 핵심: confidence 또는 status가 변했을 때만 후보
  // deny→admit, high→low 등 실질적 입장 변화가 있어야 의미 있음
  const stanceChanged = last.confidence !== newClaim.confidence
  const statusChanged = last.status !== newClaim.status

  if (!stanceChanged && !statusChanged) return false

  return true
}

/**
 * LLM을 사용하여 두 진술이 실제로 모순되는지 판정.
 * 1차 필터(detectStatementChange) 통과 후 호출.
 * @returns 모순이면 핵심 차이점 설명, 아니면 null
 */
export async function verifyContradictionWithLLM(
  previousClaim: string,
  currentClaim: string,
  disputeName: string,
  npcName: string,
): Promise<string | null> {
  try {
    const { chatCompletion } = await import('./llmClient')
    const raw = await chatCompletion(
      [{
        role: 'user',
        content: `아래 두 진술이 실질적으로 모순되는지 판정하세요.

당사자: ${npcName}
쟁점: ${disputeName}

이전 진술: "${previousClaim}"
현재 진술: "${currentClaim}"

판정 기준:
- 같은 내용을 다른 표현으로 말한 것은 모순이 아닙니다.
- 감정 표현이나 강조 방식만 달라진 것은 모순이 아닙니다.
- 모순이란: 사실관계가 다르거나(했다→안 했다), 입장이 바뀌었거나(부정→인정), 구체적 내용이 상충하는 것입니다.

JSON만 출력:
{"isContradiction": true/false, "reason": "모순이면 핵심 차이점 1문장, 아니면 빈 문자열"}`,
      }],
      { temperature: 0.1, maxTokens: 100 },
    )

    const match = raw.match(/\{[\s\S]*\}/)
    if (match) {
      const parsed = JSON.parse(match[0])
      if (parsed.isContradiction && parsed.reason) {
        return parsed.reason
      }
    }
    return null
  } catch {
    // LLM 실패 시 모순이 아닌 것으로 처리 (false positive 방지)
    return null
  }
}
