/**
 * AdCountdown — 광고 시청 시뮬레이션 모달 (3초 카운트다운)
 * 모든 미니게임의 "광고 보고 획득" 버튼 클릭 시 표시
 */
import { useState, useEffect } from 'react'

interface Props {
  onComplete: () => void
  onCancel: () => void
}

export default function AdCountdown({ onComplete, onCancel }: Props) {
  const [count, setCount] = useState(3)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (count <= 0) {
      setDone(true)
      const t = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count, onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <div
        style={{
          background: '#1a1a2e',
          border: '1px solid rgba(245,158,11,0.4)',
          borderRadius: 20,
          padding: '40px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          minWidth: 260,
          boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
        }}
      >
        {done ? (
          <>
            <div style={{ fontSize: '2.5rem' }}>✅</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399' }}>
              보상 획득!
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 600 }}>
              광고 시청 중...
            </div>
            <div
              style={{
                fontSize: '3.5rem',
                fontWeight: 900,
                color: '#f59e0b',
                lineHeight: 1,
                minWidth: 60,
                textAlign: 'center',
              }}
            >
              {count}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>
              잠시 후 보상이 지급됩니다
            </div>
            <button
              onClick={onCancel}
              style={{
                marginTop: 4,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10,
                color: '#9ca3af',
                fontSize: '0.8rem',
                padding: '6px 20px',
                cursor: 'pointer',
              }}
            >
              취소
            </button>
          </>
        )}
      </div>
    </div>
  )
}
