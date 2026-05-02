export const PC_VERDICT_CTA_COLLAPSED_EVENT = 'pc:verdict-cta-collapsed'

export function emitVerdictCtaCollapsed(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(PC_VERDICT_CTA_COLLAPSED_EVENT))
}
