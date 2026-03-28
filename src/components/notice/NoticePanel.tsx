/**
 * NoticePanel — 게임 내 공지사항 패널
 * TitleScreen에서 접근 가능
 */
import { useState, useEffect } from 'react'
import { noticeApi, type Notice } from '../../api/client'

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  info: { label: '안내', color: '#3498DB' },
  event: { label: '이벤트', color: '#8E24AA' },
  update: { label: '업데이트', color: '#27AE60' },
  maintenance: { label: '점검', color: '#E67E22' },
}

export default function NoticePanel({ onClose }: { onClose: () => void }) {
  const [notices, setNotices] = useState<Notice[]>([])
  const [selected, setSelected] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    noticeApi.list()
      .then(setNotices)
      .catch(() => setNotices([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#FFFDF5', borderRadius: 16, width: '90%', maxWidth: 600,
        maxHeight: '80vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(61,51,40,0.2)',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid rgba(61,51,40,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            {selected ? selected.title : 'Notices'}
          </h2>
          <button
            onClick={() => selected ? setSelected(null) : onClose()}
            style={{
              background: 'none', border: 'none', fontSize: '1.2rem',
              cursor: 'pointer', color: '#7A6E60',
            }}
          >
            {selected ? '\u2190' : '\u2715'}
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '12px 20px' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#A89E90', padding: 40 }}>Loading...</p>
          ) : selected ? (
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <span style={{
                  fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px',
                  borderRadius: 12, color: '#fff',
                  background: TYPE_LABELS[selected.type]?.color || '#999',
                }}>
                  {TYPE_LABELS[selected.type]?.label || selected.type}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#A89E90' }}>
                  {new Date(selected.created_at).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <div style={{
                fontSize: '0.92rem', lineHeight: 1.8, whiteSpace: 'pre-wrap',
                color: '#3D3328',
              }}>
                {selected.content}
              </div>
            </div>
          ) : notices.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#A89E90', padding: 40 }}>
              There are no notices.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {notices.map(n => (
                <button
                  key={n.id}
                  onClick={() => setSelected(n)}
                  style={{
                    background: '#fff', border: '1px solid rgba(61,51,40,0.08)',
                    borderRadius: 10, padding: '12px 16px', cursor: 'pointer',
                    textAlign: 'left', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FFF3D0')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {n.is_pinned ? <span style={{ fontSize: '0.85rem' }}>&#x1F4CC;</span> : null}
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600, padding: '1px 6px',
                      borderRadius: 10, color: '#fff',
                      background: TYPE_LABELS[n.type]?.color || '#999',
                    }}>
                      {TYPE_LABELS[n.type]?.label || n.type}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#A89E90', marginLeft: 'auto' }}>
                      {new Date(n.created_at).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#3D3328' }}>
                    {n.title}
                  </div>
                  <div style={{
                    fontSize: '0.82rem', color: '#7A6E60', marginTop: 4,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {n.content.slice(0, 80)}{n.content.length > 80 ? '...' : ''}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
