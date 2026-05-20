export function shouldBypassSpaceDismiss(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null
  if (!element) return false

  const tag = element.tagName?.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return true
  if (element.isContentEditable) return true

  return Boolean(element.closest?.('button, a, [contenteditable="true"], [contenteditable=""]'))
}
