/**
 * TokenSpendEffect — 토큰 소비 시 플로팅 "-1" 텍스트 + 아이콘 pulse
 *
 * 사용법: window.dispatchEvent(new CustomEvent('pc:token-spend', { detail: { type, amount } }))
 * type: 'investigation' | 'skill' | 'court'
 */
import { useEffect, useState, useCallback } from 'react'

interface SpendNotification {
  id: number
  type: 'investigation' | 'skill' | 'court'
  amount: number
}

const TOKEN_LABELS: Record<string, string> = {
  investigation: '조사',
  skill: '스킬',
  court: '지배력',
}

const TOKEN_COLORS: Record<string, string> = {
  investigation: '#5cc97a',
  skill: '#5b8def',
  court: '#d4a24e',
}

let notifId = 0

export default function TokenSpendEffect() {
  const [notifications, setNotifications] = useState<SpendNotification[]>([])

  const handleSpend = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail as { type: string; amount: number }
    if (!detail?.type) return
    const id = ++notifId
    const notif: SpendNotification = {
      id,
      type: detail.type as SpendNotification['type'],
      amount: detail.amount ?? 1,
    }
    setNotifications((prev) => [...prev, notif])
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
          style={{ color: TOKEN_COLORS[notif.type] ?? '#d4a24e' }}
        >
          <span className="pc-token-spend-float__label">{TOKEN_LABELS[notif.type]}</span>
          <span className="pc-token-spend-float__amount">-{notif.amount}</span>
        </div>
      ))}
    </div>
  )
}

/** 토큰 소비 이벤트 발화 헬퍼 */
export function emitTokenSpend(type: 'investigation' | 'skill' | 'court', amount = 1) {
  window.dispatchEvent(new CustomEvent('pc:token-spend', { detail: { type, amount } }))
}
