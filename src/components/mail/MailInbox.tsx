/**
 * MailInbox — 게임 내 우편함
 * TitleScreen에서 접근 가능
 */
import { useState, useEffect, useCallback } from 'react'
import { mailApi, type Mail, type MailReward } from '../../api/client'

function getPlayerId(): string {
  const stored = localStorage.getItem('solomon-profile')
  if (stored) {
    try { return JSON.parse(stored).playerId } catch { /* ignore */ }
  }
  return 'anonymous'
}

const REWARD_ICONS: Record<string, string> = {
  coin: '\uD83E\uDE99',
  item: '\uD83C\uDF81',
  title: '\uD83C\uDFC5',
}

export default function MailInbox({ onClose }: { onClose: () => void }) {
  const [mails, setMails] = useState<Mail[]>([])
  const [selected, setSelected] = useState<Mail | null>(null)
  const [loading, setLoading] = useState(true)
  const [claimResult, setClaimResult] = useState<MailReward | null>(null)

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
    setClaimResult(null)
    if (!mail.is_read) {
      await mailApi.markRead(mail.id, playerId).catch(() => {})
      setMails(prev => prev.map(m => m.id === mail.id ? { ...m, is_read: 1 } : m))
    }
  }

  const handleClaim = async () => {
    if (!selected) return
    try {
      const result = await mailApi.claimReward(selected.id, playerId)
      setClaimResult(result.reward)
      setMails(prev => prev.map(m => m.id === selected.id ? { ...m, reward_claimed: 1 } : m))
      setSelected(prev => prev ? { ...prev, reward_claimed: 1 } : null)
    } catch {
      // already claimed or error
    }
  }

  const unreadCount = mails.filter(m => !m.is_read).length

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
            {selected ? selected.title : (
              <>Mailbox {unreadCount > 0 && <span style={{
                background: '#E74C3C', color: '#fff', fontSize: '0.7rem',
                padding: '1px 7px', borderRadius: 10, marginLeft: 8, fontWeight: 600,
              }}>{unreadCount}</span>}</>
            )}
          </h2>
          <button
            onClick={() => selected ? (setSelected(null), setClaimResult(null)) : onClose()}
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
              <div style={{ fontSize: '0.8rem', color: '#A89E90', marginBottom: 12 }}>
                From: {selected.sender} &middot; {new Date(selected.created_at).toLocaleDateString('ko-KR')}
                {selected.expires_at && (
                  <> &middot; Expires: {new Date(selected.expires_at).toLocaleDateString('ko-KR')}</>
                )}
              </div>
              <div style={{
                fontSize: '0.92rem', lineHeight: 1.8, whiteSpace: 'pre-wrap',
                color: '#3D3328', marginBottom: 20,
              }}>
                {selected.content}
              </div>

              {/* Reward Section */}
              {selected.reward_type && (
                <div style={{
                  background: selected.reward_claimed ? '#F2F3F4' : '#FFF3D0',
                  borderRadius: 10, padding: '14px 18px',
                  border: selected.reward_claimed ? '1px solid rgba(0,0,0,0.05)' : '1px solid #FFD666',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: '1.2rem' }}>
                      {REWARD_ICONS[selected.reward_type] || '\uD83C\uDF81'}
                    </span>
                    <span style={{ fontWeight: 700 }}>
                      {selected.reward_type.toUpperCase()} x{selected.reward_amount}
                    </span>
                  </div>

                  {claimResult ? (
                    <div style={{ color: '#27AE60', fontWeight: 600, fontSize: '0.9rem' }}>
                      Reward claimed!
                    </div>
                  ) : selected.reward_claimed ? (
                    <div style={{ color: '#A89E90', fontSize: '0.85rem' }}>
                      Already claimed
                    </div>
                  ) : (
                    <button
                      onClick={handleClaim}
                      style={{
                        background: '#FFD666', border: 'none', borderRadius: 8,
                        padding: '8px 20px', fontWeight: 700, cursor: 'pointer',
                        fontSize: '0.9rem', color: '#3D3328',
                      }}
                    >
                      Claim Reward
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : mails.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#A89E90', padding: 40 }}>
              Your mailbox is empty.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {mails.map(m => (
                <button
                  key={m.id}
                  onClick={() => handleSelect(m)}
                  style={{
                    background: m.is_read ? '#fff' : '#FFF8EC',
                    border: '1px solid rgba(61,51,40,0.08)',
                    borderRadius: 10, padding: '12px 16px', cursor: 'pointer',
                    textAlign: 'left', transition: 'all 0.15s',
                    borderLeft: m.is_read ? undefined : '3px solid #FFD666',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FFF3D0')}
                  onMouseLeave={e => (e.currentTarget.style.background = m.is_read ? '#fff' : '#FFF8EC')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {!m.is_read && <span style={{
                      width: 8, height: 8, borderRadius: '50%', background: '#E74C3C',
                      display: 'inline-block', flexShrink: 0,
                    }} />}
                    <span style={{
                      fontWeight: m.is_read ? 400 : 700, fontSize: '0.92rem', color: '#3D3328',
                      flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {m.title}
                    </span>
                    {m.reward_type && !m.reward_claimed && (
                      <span style={{ fontSize: '0.85rem' }}>
                        {REWARD_ICONS[m.reward_type] || '\uD83C\uDF81'}
                      </span>
                    )}
                    <span style={{ fontSize: '0.75rem', color: '#A89E90', flexShrink: 0 }}>
                      {new Date(m.created_at).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '0.82rem', color: '#7A6E60',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    paddingLeft: m.is_read ? 0 : 16,
                  }}>
                    {m.sender} — {m.content.slice(0, 60)}{m.content.length > 60 ? '...' : ''}
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
