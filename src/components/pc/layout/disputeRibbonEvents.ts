export const PC_DISPUTE_RIBBON_EXPAND_EVENT = 'pc:expand-dispute-ribbon'

export interface DisputeRibbonExpandDetail {
  disputeId: string
}

export function requestDisputeRibbonExpansion(disputeId: string): void {
  if (typeof window === 'undefined' || !disputeId) return
  window.dispatchEvent(new CustomEvent<DisputeRibbonExpandDetail>(PC_DISPUTE_RIBBON_EXPAND_EVENT, {
    detail: { disputeId },
  }))
}

export function afterDisputeRibbonExpansion(callback: () => void): void {
  if (typeof window === 'undefined') {
    callback()
    return
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback)
  })
}
