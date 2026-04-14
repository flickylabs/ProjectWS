import { useEffect, useRef } from 'react'

/**
 * 모달/오버레이용 포커스 트랩.
 * - 마운트 시 컨테이너 내 첫 포커서블 요소로 포커스 이동
 * - Tab/Shift+Tab이 컨테이너 밖으로 나가지 않음
 * - 언마운트 시 이전 포커스 복원
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    previousFocusRef.current = document.activeElement as HTMLElement | null

    const focusables = getFocusableElements(container)
    if (focusables.length > 0) {
      (focusables[0] as HTMLElement).focus()
    } else {
      container.setAttribute('tabindex', '-1')
      container.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const elements = getFocusableElements(container)
      if (elements.length === 0) return

      const first = elements[0] as HTMLElement
      const last = elements[elements.length - 1] as HTMLElement

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [])

  return containerRef
}

function getFocusableElements(container: HTMLElement): NodeListOf<HTMLElement> {
  return container.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )
}
