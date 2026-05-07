import { useEffect, useState, useCallback } from 'react'
import { localizeRuntimeText } from '../../../i18n/runtimeText'

type TokenType = 'investigation' | 'skill' | 'court'

interface SpendNotification {
  id: number
  type: TokenType
  amount: number
  x: number
  y: number
}

const TOKEN_LABELS: Record<TokenType, string> = {
  investigation: '조사',
  skill: '스킬',
  court: '지배력',
}

const TOKEN_COLORS: Record<TokenType, string> = {
  investigation: '#5cc97a',
  skill: '#5b8def',
  court: '#d4a24e',
}

const TOKEN_SELECTORS: Record<TokenType, string> = {
  investigation: '[data-pc-token="investigation"]',
  skill: '[data-pc-token="skill"]',
  court: '[data-pc-token="court"]',
}

let notifId = 0

export default function TokenSpendEffect() {
  const [notifications, setNotifications] = useState<SpendNotification[]>([])

  const handleSpend = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail as { type?: string; amount?: number }
    if (!isTokenType(detail?.type)) return

    const tokenType = detail.type
    const anchor = resolveAnchor(tokenType)
    triggerAnchorPulse(tokenType)

    setNotifications((prev) => {
      const sameTypeCount = prev.filter((notif) => notif.type === tokenType).length
      return [
        ...prev,
        {
          id: ++notifId,
          type: tokenType,
          amount: detail.amount ?? 1,
          x: anchor.x,
          y: anchor.y - (sameTypeCount * 18),
        },
      ]
    })

    const id = notifId
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 1200)
  }, [])

  useEffect(() => {
    window.addEventListener('pc:token-spend', handleSpend)
    return () => window.removeEventListener('pc:token-spend', handleSpend)
  }, [handleSpend])

  if (notifications.length === 0) return null

  return (
    <div className="pc-token-spend-container">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="pc-token-spend-float"
          style={{
            color: TOKEN_COLORS[notif.type],
            left: notif.x,
            top: notif.y,
          }}
        >
          <span className="pc-token-spend-float__label">{localizeRuntimeText(TOKEN_LABELS[notif.type])}</span>
          <span className="pc-token-spend-float__amount">-{notif.amount}</span>
        </div>
      ))}
    </div>
  )
}

/** 토큰 소비 이벤트 발화 헬퍼 */
export function emitTokenSpend(type: TokenType, amount = 1) {
  window.dispatchEvent(new CustomEvent('pc:token-spend', { detail: { type, amount } }))
}

function isTokenType(value: string | undefined): value is TokenType {
  return value === 'investigation' || value === 'skill' || value === 'court'
}

function resolveAnchor(type: TokenType): { x: number; y: number } {
  const anchor = document.querySelector<HTMLElement>(TOKEN_SELECTORS[type])
  if (anchor) {
    const rect = anchor.getBoundingClientRect()
    return {
      x: rect.left + (rect.width / 2),
      y: rect.top + 8,
    }
  }

  const fallback = {
    investigation: { x: window.innerWidth - 244, y: 82 },
    skill: { x: window.innerWidth - 170, y: 82 },
    court: { x: window.innerWidth - 96, y: 82 },
  } satisfies Record<TokenType, { x: number; y: number }>

  return fallback[type]
}

function triggerAnchorPulse(type: TokenType) {
  const anchor = document.querySelector<HTMLElement>(TOKEN_SELECTORS[type])
  if (!anchor) return

  const pulseId = `${type}-${Date.now()}`
  anchor.dataset.pcPulseId = pulseId
  anchor.classList.remove('pc-token-pulse')
  void anchor.offsetWidth
  anchor.classList.add('pc-token-pulse')

  window.setTimeout(() => {
    if (anchor.dataset.pcPulseId === pulseId) {
      anchor.classList.remove('pc-token-pulse')
      delete anchor.dataset.pcPulseId
    }
  }, 320)
}
