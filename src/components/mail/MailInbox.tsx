/**
 * MailInbox — 게임 내 우편함
 * 탭 구분: 전체 / 미수령 보상 / 읽음
 * 일괄 수령 + 한국어 UI
 */
import { useState, useEffect, useCallback } from 'react'
import { mailApi, type Mail } from '../../api/client'

function getPlayerId(): string {
  const stored = localStorage.getItem('solomon-profile')
  if (stored) { try { return JSON.parse(stored).playerId } catch { /* */ } }
  return 'anonymous'
}

const REWARD_ICONS: Record<string, string> = { coin: '🪙', item: '🎁', title: '🏅', invest: '🔍', skill: '⚡' }

type Tab = 'all' | 'unclaimed' | 'read'

export default function MailInbox({ onClose }: { onClose: () => void }) {
  const [mails, setMails] = useState<Mail[]>([])
  const [selected, setSelected] = useState<Mail | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('all')
  const [claiming, setClaiming] = useState(false)

  const playerId = getPlayerId()

  const load = useCallback(() => {
    mailApi.getPlayerMail(playerId)
      .then(setMails)
      .catch(() => setMails([]))
      .finally(() => setLoading(false))
  }, [playerId])

  useEffect(() => { load() }, [load])

  const handleSelect = async (mail: Mail) => {
    setSelected(mail)
    if (!mail.is_read) {
      await mailApi.markRead(mail.id, playerId).catch(() => {})
      setMails(prev => prev.map(m => m.id === mail.id ? { ...m, is_read: 1 } : m))
    }
  }

  const handleClaim = async (mailId: number) => {
    try {
      await mailApi.claimReward(mailId, playerId)
      setMails(prev => prev.map(m => m.id === mailId ? { ...m, reward_claimed: 1 } : m))
      if (selected?.id === mailId) setSelected(prev => prev ? { ...prev, reward_claimed: 1 } : null)
    } catch { /* already claimed */ }
  }

  const handleClaimAll = async () => {
    setClaiming(true)
    const unclaimed = mails.filter(m => m.reward_type && !m.reward_claimed)
    for (const m of unclaimed) {
      await handleClaim(m.id)
    }
    setClaiming(false)
  }

  const filtered = tab === 'unclaimed'
    ? mails.filter(m => m.reward_type && !m.reward_claimed)
    : tab === 'read'
      ? mails.filter(m => m.is_read)
      : mails

  const unreadCount = mails.filter(m => !m.is_read).length
  const unclaimedCount = mails.filter(m => m.reward_type && !m.reward_claimed).length

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: '#FFFDF5', borderRadius: 16, width: '90%', maxWidth: 480,
        maxHeight: '85vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(61,51,40,0.2)',
      }} onClick={e => e.stopPropagation()}>

        {/* 헤더 */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid rgba(61,51,40,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {selected ? (
            <>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', color: '#7A6E60' }}>← 뒤로</button>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: '#7A6E60' }}>✕</button>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                📬 우편함
                {unreadCount > 0 && <span style={{ background: '#E74C3C', color: '#fff', fontSize: '0.65rem', padding: '2px 7px', borderRadius: 10, fontWeight: 600 }}>{unreadCount}</span>}
              </h2>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: '#7A6E60' }}>✕</button>
            </>
          )}
        </div>

        {/* 상세 보기 */}
        {selected ? (
          <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
            <div style={{ fontSize: '0.78rem', color: '#A89E90', marginBottom: 8 }}>
              {selected.sender} · {new Date(selected.created_at).toLocaleDateString('ko-KR')}
              {selected.expires_at && <> · 만료: {new Date(selected.expires_at).toLocaleDateString('ko-KR')}</>}
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#3D3328', marginBottom: 12 }}>{selected.title}</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.8, whiteSpace: 'pre-wrap', color: '#5A5047', marginBottom: 20 }}>
              {selected.content}
            </div>

            {selected.reward_type && (
              <div style={{
                background: selected.reward_claimed ? '#F5F5F5' : 'linear-gradient(135deg, #FFF8EC, #FFF3D0)',
                borderRadius: 12, padding: '16px',
                border: selected.reward_claimed ? '1px solid #E0E0E0' : '1px solid #FFD666',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: selected.reward_claimed ? 0 : 12 }}>
                  <span style={{ fontSize: '1.5rem' }}>{REWARD_ICONS[selected.reward_type] || '🎁'}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{selected.reward_type} ×{selected.reward_amount}</div>
                    <div style={{ fontSize: '0.78rem', color: '#7A6E60' }}>첨부 보상</div>
                  </div>
                  {selected.reward_claimed ? (
                    <span style={{ marginLeft: 'auto', fontSize: '0.82rem', color: '#A89E90' }}>✓ 수령 완료</span>
                  ) : (
                    <button onClick={() => handleClaim(selected.id)} style={{
                      marginLeft: 'auto', background: '#FFD666', border: 'none', borderRadius: 8,
                      padding: '8px 18px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', color: '#3D3328',
                    }}>받기</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* 탭 + 일괄수령 */}
            <div style={{ padding: '10px 20px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
              {([['all', '전체'], ['unclaimed', `미수령 ${unclaimedCount}`], ['read', '읽음']] as [Tab, string][]).map(([t, label]) => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  fontSize: '0.82rem', fontWeight: 600,
                  background: tab === t ? '#3D3328' : 'transparent', color: tab === t ? '#FFD666' : '#7A6E60',
                }}>{label}</button>
              ))}
              {unclaimedCount > 0 && (
                <button onClick={handleClaimAll} disabled={claiming} style={{
                  marginLeft: 'auto', padding: '6px 12px', borderRadius: 8, border: '1px solid #FFD666',
                  background: '#FFF8EC', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, color: '#B8860B',
                }}>{claiming ? '수령 중...' : '📦 일괄 수령'}</button>
              )}
            </div>

            {/* 우편 목록 */}
            <div style={{ flex: 1, overflow: 'auto', padding: '12px 20px' }}>
              {loading ? (
                <p style={{ textAlign: 'center', color: '#A89E90', padding: 40 }}>불러오는 중...</p>
              ) : filtered.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#A89E90', padding: 40 }}>
                  {tab === 'unclaimed' ? '미수령 보상이 없습니다.' : '우편이 없습니다.'}
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {filtered.map(m => (
                    <button key={m.id} onClick={() => handleSelect(m)} style={{
                      background: m.is_read ? '#fff' : '#FFFBF0',
                      border: '1px solid rgba(61,51,40,0.08)',
                      borderRadius: 12, padding: '14px 16px', cursor: 'pointer',
                      textAlign: 'left', transition: 'all 0.15s',
                      borderLeft: m.is_read ? '3px solid transparent' : '3px solid #FFD666',
                      display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                      {/* 아이콘 */}
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: m.reward_type && !m.reward_claimed ? '#FFF3D0' : '#F5F5F5',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', flexShrink: 0,
                      }}>
                        {m.reward_type ? (REWARD_ICONS[m.reward_type] || '🎁') : '📨'}
                      </div>

                      {/* 내용 */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {!m.is_read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E74C3C', flexShrink: 0 }} />}
                          <span style={{
                            fontWeight: m.is_read ? 400 : 700, fontSize: '0.9rem', color: '#3D3328',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>{m.title}</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#A89E90', marginTop: 2 }}>
                          {m.sender} · {new Date(m.created_at).toLocaleDateString('ko-KR')}
                        </div>
                      </div>

                      {/* 보상 뱃지 */}
                      {m.reward_type && !m.reward_claimed && (
                        <div style={{
                          background: '#FFD666', borderRadius: 6, padding: '4px 8px',
                          fontSize: '0.7rem', fontWeight: 700, color: '#3D3328', flexShrink: 0,
                        }}>받기</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
