export const MIN_VISIBLE_DISPUTES_FOR_VERDICT = 2

type VerdictGateState = {
  caseData?: {
    disputes?: Array<{
      id: string
      name?: string
      hidden?: boolean
      v3Visibility?: string
    }>
  } | null
  discovery?: {
    disputeVisibility?: Record<string, { visibility?: string }>
  } | null
}

export function getVerdictDisputeGate(state: VerdictGateState) {
  const disputes = state.caseData?.disputes ?? []
  const visibility = state.discovery?.disputeVisibility ?? {}

  const visibleDisputes = disputes.filter((dispute) => {
    const entry = visibility[dispute.id]
    if (entry) {
      return entry.visibility !== 'hidden' && entry.visibility !== 'inactive'
    }
    return dispute.hidden !== true && dispute.v3Visibility !== 'hidden'
  })

  const hiddenDisputes = disputes.filter((dispute) => {
    const entry = visibility[dispute.id]
    if (entry) {
      return entry.visibility === 'hidden'
    }
    return dispute.hidden === true || dispute.v3Visibility === 'hidden'
  })

  return {
    visibleCount: visibleDisputes.length,
    hiddenCount: hiddenDisputes.length,
    visibleDisputeNames: visibleDisputes.map((dispute) => dispute.name ?? dispute.id),
    hiddenDisputeNames: hiddenDisputes.map((dispute) => dispute.name ?? dispute.id),
    hasMinimumVisibleDisputes: visibleDisputes.length >= MIN_VISIBLE_DISPUTES_FOR_VERDICT,
  }
}
