import { useState, useEffect, useRef, useCallback } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { DialogueEntry as DialogueEntryType } from '../../../types'
import { handleContradictionPursue } from '../../../hooks/useActionDispatch'
import Emoji, { replaceEmojisInText } from '../../common/Emoji'

/* ── Color tokens (matching pc-prototype) ── */
const COLORS = {
  blue: '#5b8def',
  blueBg: 'rgba(91,141,239,0.08)',
  blueBdr: 'rgba(91,141,239,0.2)',
  red: '#e06060',
  redBg: 'rgba(224,96,96,0.08)',
  redBdr: 'rgba(224,96,96,0.2)',
  gold: '#d4a24e',
  goldLight: '#e8c172',
  goldBg: 'rgba(212,162,78,0.06)',
  goldBdr: 'rgba(212,162,78,0.18)',
  green: '#50c878',
  greenBg: 'rgba(80,200,120,0.08)',
  greenBdr: 'rgba(80,200,120,0.2)',
  textPrimary: '#dcdce0',
  textSecondary: '#8b8b9a',
  textDim: '#4e4e5c',
} as const

/* ── Emotion avatar helper ── */
function getEmotionEmoji(speaker: string, emotionPhase?: string): string {
  if (speaker === 'judge') return '\u2696\uFE0F'
  const map: Record<string, string> = {
    defensive: '\uD83D\uDE10', confident: '\uD83D\uDE24',
    shaken: '\uD83D\uDE30', angry: '\uD83D\uDE21', resigned: '\uD83D\uDE1E',
  }
  if (emotionPhase && map[emotionPhase]) return map[emotionPhase]
  return speaker === 'a' ? '\uD83D\uDC68' : '\uD83D\uDC69'
}

/* ── Single message row ── */
function PCMessageBubble({ entry, animate }: { entry: DialogueEntryType; animate: boolean }) {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const nameA = caseData?.duo.partyA.name ?? 'A'
  const nameB = caseData?.duo.partyB.name ?? 'B'

  const [displayText, setDisplayText] = useState(animate ? '' : entry.text)
  const [done, setDone] = useState(!animate)

  useEffect(() => {
    if (!animate && !done) { setDisplayText(entry.text); setDone(true) }
  }, [animate, done, entry.text])

  useEffect(() => {
    if (!animate) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayText(entry.text.slice(0, i))
      if (i >= entry.text.length) { clearInterval(interval); setDone(true) }
    }, 15)
    return () => clearInterval(interval)
  }, [animate, entry.text])

  /* ── System messages ── */
  if (entry.speaker === 'system') {
    return (
      <div className="flex justify-center" style={{ animation: 'msgIn .3s ease' }}>
        <div
          className="flex items-center gap-2"
          style={{
            fontSize: 15, color: COLORS.gold,
            padding: '8px 24px', borderRadius: 24,
            background: 'rgba(212,162,78,0.05)',
            border: '1px solid rgba(212,162,78,0.1)',
          }}
        >
          {replaceEmojisInText(displayText, 16)}
        </div>
      </div>
    )
  }

  /* ── Witness messages ── */
  if (entry.speaker === 'witness') {
    const favor = entry.witnessFavor
    const witnessName = entry.witnessName ?? '\uC99D\uC778'
    const align = favor === 'pro_a' ? 'flex-start' : favor === 'pro_b' ? 'flex-end' : 'center'
    const flexDir = favor === 'pro_b' ? 'row-reverse' as const : 'row' as const
    const cornerStyle = favor === 'pro_a'
      ? { borderTopLeftRadius: 4 }
      : favor === 'pro_b'
        ? { borderTopRightRadius: 4 }
        : {}

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: align, animation: 'msgIn .3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, maxWidth: '78%', flexDirection: flexDir }}>
          {/* Avatar */}
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0, marginTop: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: COLORS.greenBg, border: `1px solid ${COLORS.greenBdr}`,
          }}>
            <Emoji char="\uD83E\uDDD1\u200D\u2696\uFE0F" size={24} />
          </div>
          {/* Body */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: favor === 'pro_b' ? 'flex-end' : 'flex-start' }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: COLORS.green }}>{witnessName}</div>
            <div style={{
              padding: '14px 20px', borderRadius: 18, fontSize: 18, lineHeight: 1.75,
              background: COLORS.greenBg, border: `1px solid ${COLORS.greenBdr}`,
              color: COLORS.textPrimary, ...cornerStyle,
            }}>
              {displayText}
              {!done && <span style={{ color: COLORS.green }} className="animate-pulse">|</span>}
              {done && entry.behaviorHint && (
                <div style={{ fontSize: 13, color: 'rgba(80,200,120,0.5)', marginTop: 8, fontStyle: 'italic', borderTop: `1px solid ${COLORS.greenBdr}`, paddingTop: 8 }}>
                  {entry.behaviorHint}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── Judge messages ── */
  if (entry.speaker === 'judge') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'msgIn .3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, maxWidth: '68%' }}>
          {/* Avatar */}
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0, marginTop: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: COLORS.goldBg, border: `1px solid ${COLORS.goldBdr}`,
          }}>
            <Emoji char="\u2696\uFE0F" size={24} />
          </div>
          {/* Body */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: COLORS.gold }}>
              {'\uC7AC\uD310\uAD00'}
            </div>
            <div style={{
              padding: '14px 20px', borderRadius: 14, fontSize: 18, lineHeight: 1.75, fontWeight: 500,
              background: COLORS.goldBg, border: `1px solid ${COLORS.goldBdr}`, color: COLORS.textPrimary,
            }}>
              {displayText}
              {!done && <span style={{ color: COLORS.gold }} className="animate-pulse">|</span>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── Party A / B messages ── */
  const isA = entry.speaker === 'a'
  const name = isA ? nameA : nameB
  const emotionPhase = isA ? agentA?.emotionalState?.phase : agentB?.emotionalState?.phase
  const avatar = getEmotionEmoji(entry.speaker, emotionPhase)

  const palette = isA
    ? { color: COLORS.blue, bg: COLORS.blueBg, bdr: COLORS.blueBdr }
    : { color: COLORS.red, bg: COLORS.redBg, bdr: COLORS.redBdr }

  const align = isA ? 'flex-start' : 'flex-end'
  const flexDir = isA ? 'row' as const : 'row-reverse' as const
  const cornerStyle = isA ? { borderTopLeftRadius: 4 } : { borderTopRightRadius: 4 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: align, animation: 'msgIn .3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, maxWidth: '78%', flexDirection: flexDir }}>
        {/* Avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0, marginTop: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: palette.bg, border: `1px solid ${palette.bdr}`,
        }}>
          <Emoji char={avatar} size={24} />
        </div>
        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isA ? 'flex-start' : 'flex-end' }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: palette.color, paddingLeft: isA ? 2 : 0, paddingRight: isA ? 0 : 2 }}>
            {name}
            {emotionPhase && emotionPhase !== 'defensive' && (
              <span style={{
                marginLeft: 8, fontSize: 12,
                color: emotionPhase === 'angry' ? 'rgba(224,96,96,0.6)'
                  : emotionPhase === 'shaken' ? 'rgba(234,179,8,0.6)'
                  : emotionPhase === 'confident' ? 'rgba(80,200,120,0.6)'
                  : COLORS.textDim,
              }}>
                {emotionPhase === 'angry' ? '\uACA9\uC559' : emotionPhase === 'shaken' ? '\uB3D9\uC694' : emotionPhase === 'confident' ? '\uC790\uC2E0\uAC10' : emotionPhase === 'resigned' ? '\uCCB4\uB150' : ''}
              </span>
            )}
          </div>
          <div style={{
            padding: '14px 20px', borderRadius: 18, fontSize: 18, lineHeight: 1.75,
            background: entry.isConfidential ? 'rgba(128,90,213,0.08)' : palette.bg,
            border: `1px solid ${entry.isConfidential ? 'rgba(128,90,213,0.25)' : palette.bdr}`,
            color: COLORS.textPrimary, textAlign: 'left', ...cornerStyle,
          }}>
            {entry.isConfidential && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#a78bfa' }}>
                <span>\uD83D\uDD12</span><span>\uBE44\uACF5\uAC1C \uC9C4\uC220</span>
              </div>
            )}
            {displayText}
            {!done && <span style={{ color: COLORS.gold }} className="animate-pulse">|</span>}
            {done && entry.behaviorHint && (
              <div style={{ fontSize: 13, color: 'rgba(139,139,154,0.5)', marginTop: 8, fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 8 }}>
                {entry.behaviorHint}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main PCDialogueLog ── */
export default function PCDialogueLog() {
  const dialogueLog = useStore((s) => s.dialogueLog)
  const isLLMLoading = useStore((s) => s.isLLMLoading)
  const llmTarget = useStore((s) => s.llmLoadingTarget)
  const caseData = useStore((s) => s.caseData)
  const bottomRef = useRef<HTMLDivElement>(null)

  const [pendingContradiction, setPendingContradiction] = useState<NonNullable<DialogueEntryType['contradictionMeta']> | null>(null)

  // Auto-scroll on new messages
  useEffect(() => {
    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
    return () => clearTimeout(timer)
  }, [dialogueLog.length])

  const handleConfirmPursue = useCallback(async () => {
    if (!pendingContradiction) return
    const { party, disputeId, previousClaim, currentClaim } = pendingContradiction
    setPendingContradiction(null)
    await handleContradictionPursue(party, disputeId, previousClaim, currentClaim)
  }, [pendingContradiction])

  const npcName = pendingContradiction && caseData
    ? (pendingContradiction.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name)
    : ''

  const visibleEntries = dialogueLog.filter(e => !e.isHidden)

  return (
    <>
      {/* Keyframe for message entrance animation */}
      <style>{`
        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {visibleEntries.length === 0 && !isLLMLoading && (
        <div style={{ textAlign: 'center', color: COLORS.textDim, fontSize: 16, paddingTop: 120 }}>
          사건이 시작되면 대화가 여기에 표시됩니다.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {visibleEntries.map((entry, i) => {
          // Contradiction system entries get special treatment
          if (entry.speaker === 'system' && entry.contradictionMeta) {
            return (
              <div key={entry.id} className="flex justify-center" style={{ animation: 'msgIn .3s ease' }}>
                <button
                  onClick={() => setPendingContradiction(entry.contradictionMeta!)}
                  style={{
                    fontSize: 15, padding: '10px 28px', borderRadius: 24, cursor: 'pointer',
                    background: 'rgba(212,162,78,0.08)', border: '1px solid rgba(212,162,78,0.2)',
                    color: COLORS.goldLight, fontWeight: 600, fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,162,78,0.14)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(212,162,78,0.08)' }}
                >
                  <Emoji char="\u26A1" size={16} />
                  <span>{entry.text.replace('\u2014 \uD0ED\uD558\uC5EC \uCD94\uAD81', '').trim()}</span>
                  <span style={{ fontSize: 12, color: COLORS.textDim, marginLeft: 4 }}>
                    클릭하여 추궁
                  </span>
                </button>
              </div>
            )
          }

          return (
            <PCMessageBubble
              key={entry.id}
              entry={entry}
              animate={i === visibleEntries.length - 1}
            />
          )
        })}
      </div>

      {/* LLM Loading indicator */}
      {isLLMLoading && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
          justifyContent: llmTarget === 'b' ? 'flex-end' : 'flex-start',
        }}>
          <div className="gavel-loading" style={{ fontSize: 20 }}><Emoji char="\u2696\uFE0F" size={20} /></div>
          <span style={{ fontSize: 14, color: COLORS.textDim }}>응답 중...</span>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} />

      {/* ── Contradiction confirm modal ── */}
      {pendingContradiction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(7,7,12,0.85)' }}
          onClick={() => setPendingContradiction(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--pc-p1, #0c0c14)', border: '1px solid rgba(212,162,78,0.25)',
              borderRadius: 20, width: '100%', maxWidth: 520,
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '20px 24px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <Emoji char="\u26A1" size={22} />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.goldLight, margin: 0 }}>
                모순 추궁
              </h2>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px' }}>
              <p style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 16 }}>
                {npcName}의 진술에서 모순이 발견되었습니다.
              </p>

              <div style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: 16, marginBottom: 12,
              }}>
                <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 6 }}>이전 주장</div>
                <p style={{ fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.6, margin: 0 }}>
                  "{pendingContradiction.previousClaim}"
                </p>
              </div>

              <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: COLORS.gold, margin: '8px 0' }}>
                \u2195 모순
              </div>

              <div style={{
                background: 'rgba(212,162,78,0.04)', border: '1px solid rgba(212,162,78,0.12)',
                borderRadius: 14, padding: 16, marginBottom: 16,
              }}>
                <div style={{ fontSize: 12, color: COLORS.gold, marginBottom: 6 }}>현재 주장</div>
                <p style={{ fontSize: 15, color: COLORS.goldLight, lineHeight: 1.6, margin: 0 }}>
                  "{pendingContradiction.currentClaim}"
                </p>
              </div>

              <p style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.6 }}>
                이 모순을 추궁하면 거짓말 상태가 흔들리고, 핵심 진실에 더 가까워질 수 있습니다.
              </p>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex', gap: 10, padding: '0 24px 24px',
            }}>
              <button
                onClick={() => setPendingContradiction(null)}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                  color: COLORS.textSecondary, fontSize: 15, fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.15s',
                }}
              >
                넘어가기
              </button>
              <button
                onClick={handleConfirmPursue}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 12,
                  background: 'linear-gradient(135deg, #b8862d, #d4a24e)', border: 'none',
                  color: '#07070c', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.15s',
                }}
              >
                모순 추궁하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
