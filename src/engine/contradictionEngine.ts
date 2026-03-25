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
 * 같은 화자의 이전 발언과 현재 발언이 달라졌는지 감지한다.
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
  return last.summary !== newClaim.summary
}
