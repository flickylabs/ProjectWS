/**
 * NoticePanel — 공지 팝업 (스와이프 카드 형태)
 * 활성화된 공지를 가로 스와이프로 넘김
 * 하루동안 보지않기 체크박스 포함
 */
import { useState, useEffect, useRef, useCallback } from 'react'
import { noticeApi, type Notice } from '../../api/client'

const TYPE_LABELS: Record<string, { label: string; color: string; emoji: string }> = {
  info: { label: '안내', color: '#3498DB', emoji: '📢' },
  event: { label: '이벤트', color: '#8E24AA', emoji: '🎉' },
  update: { label: '업데이트', color: '#27AE60', emoji: '🔄' },
  maintenance: { label: '점검', color: '#E67E22', emoji: '🔧' },
}

/** 하루동안 보지않기 체크 */
function isDismissedToday(): boolean {
  const dismissed = localStorage.getItem('solomon_notice_dismissed')
  if (!dismissed) return false
  return dismissed === new Date().toISOString().slice(0, 10)
}

function dismissForToday(): void {
  localStorage.setItem('solomon_notice_dismissed', new Date().toISOString().slice(0, 10))
}

interface Props {
  onClose: () => void
  /** true이면 자동 팝업 모드 (하루동안 보지않기 표시) */
  autoPopup?: boolean
}

export default function NoticePanel({ onClose, autoPopup = false }: Props) {
  const [notices, setNotices] = useState<Notice[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [dismissChecked, setDismissChecked] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // 터치/드래그 스와이프
  const startX = useRef(0)
  const deltaX = useRef(0)
  const [swiping, setSwiping] = useState(false)
  const [swipeOffset, setSwipeOffset] = useState(0)

  useEffect(() => {
    noticeApi.list()
      .then(list => setNotices(list.filter(n => n.is_active)))
      .catch(() => setNotices([]))
      .finally(() => setLoading(false))
  }, [])

  const goTo = useCallback((idx: number) => {
    setCurrentIndex(Math.max(0, Math.min(idx, notices.length - 1)))
    setExpanded(false)
    setSwipeOffset(0)
  }, [notices.length])

  const handleClose = () => {
    if (dismissChecked) dismissForToday()
    onClose()
  }

  // 터치 이벤트
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; setSwiping(true) }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!swiping) return
    deltaX.current = e.touches[0].clientX - startX.current
    setSwipeOffset(deltaX.current)
  }
  const onTouchEnd = () => {
    setSwiping(false)
    if (Math.abs(deltaX.current) > 60) {
      if (deltaX.current < 0 && currentIndex < notices.length - 1) goTo(currentIndex + 1)
      else if (deltaX.current > 0 && currentIndex > 0) goTo(currentIndex - 1)
      else setSwipeOffset(0)
    } else { setSwipeOffset(0) }
    deltaX.current = 0
  }

  // 마우스 드래그
  const onMouseDown = (e: React.MouseEvent) => { startX.current = e.clientX; setSwiping(true) }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!swiping) return
    deltaX.current = e.clientX - startX.current
    setSwipeOffset(deltaX.current)
  }
  const onMouseUp = () => { onTouchEnd() }

  if (loading) return null
  if (notices.length === 0) return null

  const current = notices[currentIndex]
  const typeInfo = TYPE_LABELS[current?.type] || TYPE_LABELS.info

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={handleClose}>
      <div
        style={{
          background: '#FFFDF5', borderRadius: 20, width: '90%', maxWidth: 440,
          boxShadow: '0 12px 40px rgba(61,51,40,0.25)',
          overflow: 'hidden', position: 'relative',
          transform: `translateX(${swipeOffset * 0.3}px)`,
          transition: swiping ? 'none' : 'transform 0.3s ease',
        }}
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => { if (swiping) onMouseUp() }}
      >
        {/* 상단 바 */}
        <div style={{
          background: typeInfo.color, padding: '14px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.1rem' }}>{typeInfo.emoji}</span>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>{typeInfo.label}</span>
          </div>
          <button onClick={handleClose} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
            width: 28, height: 28, borderRadius: 14, cursor: 'pointer', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {/* 카드 본문 */}
        <div style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: '0.78rem', color: '#A89E90', marginBottom: 6 }}>
            {new Date(current.created_at).toLocaleDateString('ko-KR')}
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#3D3328', marginBottom: 12 }}>
            {current.title}
          </h3>
          <div style={{
            fontSize: '0.88rem', lineHeight: 1.7, color: '#5A5047',
            maxHeight: expanded ? 'none' : 120, overflow: 'hidden',
            whiteSpace: 'pre-wrap',
          }}>
            {current.content}
          </div>
          {current.content.length > 200 && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              style={{
                background: 'none', border: 'none', color: typeInfo.color,
                fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', marginTop: 4,
              }}
            >더 보기 ↓</button>
          )}
        </div>

        {/* 페이지 인디케이터 */}
        {notices.length > 1 && (
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 6, padding: '0 24px 12px',
          }}>
            {notices.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === currentIndex ? 20 : 8, height: 8,
                  borderRadius: 4, border: 'none', cursor: 'pointer',
                  background: i === currentIndex ? typeInfo.color : 'rgba(61,51,40,0.15)',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        )}

        {/* 하단: 하루동안 보지않기 + 페이지 번호 */}
        <div style={{
          borderTop: '1px solid rgba(61,51,40,0.08)',
          padding: '12px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {autoPopup ? (
            <label style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: '0.8rem', color: '#A89E90', cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={dismissChecked}
                onChange={e => setDismissChecked(e.target.checked)}
                style={{ accentColor: typeInfo.color }}
              />
              하루동안 보지 않기
            </label>
          ) : <div />}
          <span style={{ fontSize: '0.78rem', color: '#A89E90' }}>
            {currentIndex + 1} / {notices.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export { isDismissedToday }
