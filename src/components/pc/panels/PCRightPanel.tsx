import { useState, useCallback, useMemo } from 'react'
import { useStore } from '../../../store/useGameStore'
import Emoji from '../../common/Emoji'
import type { LieState, EmotionalPhase, DialogueEntry } from '../../../types'
import { getTellHint } from '../../../engine/archetypeHintEngine'

// ── Constants ──

const LIE_STATES: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
const LIE_STATE_LABELS: Record<LieState, string> = {
  S0: '완전 부정', S1: '일부 인정', S2: '핑계', S3: '책임 전가', S4: '감정적', S5: '자백',
}

const EMOTION_LABELS: Record<EmotionalPhase, string> = {
  defensive: '경계', confident: '자신감', shaken: '동요', angry: '격앙', resigned: '체념',
}

const EMOTION_PHASES: EmotionalPhase[] = ['defensive', 'confident', 'shaken', 'angry', 'resigned']

const ARCHETYPE_LABELS: Record<string, string> = {
  avoidant: '회피형', confrontational: '대립형', victim_cosplay: '피해자 행세',
  cold_logic: '냉정 논리', affect_flattening: '감정 무뎌짐', premature_summary: '성급한 정리',
}

// ── Pinned Note ──

interface PinnedNote {
  id: string
  dialogueId: string
  turn: number
  text: string
  speaker: string
  order: number
}

// ── Comparison Tray ──

interface ComparisonSlot {
  note: PinnedNote | null
}

// ── Component ──

export default function PCRightPanel() {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const archetypeA = useStore((s) => s.archetypeA)
  const archetypeB = useStore((s) => s.archetypeB)
  const dialogueLog = useStore((s) => s.dialogueLog)
  const questionMeters = useStore((s) => s.questionMeters)

  // Local state: current target, pinned notes, comparison tray, timeline collapse
  const [targetParty, setTargetParty] = useState<'a' | 'b'>('a')
  const [pinnedNotes, setPinnedNotes] = useState<PinnedNote[]>([])
  const [comparisonSlots, setComparisonSlots] = useState<[ComparisonSlot, ComparisonSlot]>([
    { note: null }, { note: null },
  ])
  const [timelineOpen, setTimelineOpen] = useState(false)
  const [highlightedDialogueId, setHighlightedDialogueId] = useState<string | null>(null)
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  // Derived: target agent state
  const agent = targetParty === 'a' ? agentA : agentB
  const archetype = targetParty === 'a' ? archetypeA : archetypeB
  const profile = targetParty === 'a' ? caseData?.duo.partyA : caseData?.duo.partyB
  const meters = questionMeters[targetParty]

  // Lie state: pick highest/representative state from lieStateMap
  const lieStates = useMemo(() => {
    return Object.entries(agent.lieStateMap).map(([disputeId, entry]) => ({
      disputeId,
      state: entry.currentState,
    }))
  }, [agent.lieStateMap])

  const overallLieState = useMemo(() => {
    if (lieStates.length === 0) return 'S0' as LieState
    const ranks = lieStates.map((ls) => LIE_STATES.indexOf(ls.state))
    const maxRank = Math.max(...ranks)
    return LIE_STATES[maxRank]
  }, [lieStates])

  const overallLieRank = LIE_STATES.indexOf(overallLieState)

  // Tell hint
  const tellHint = useMemo(() => {
    const tells = profile?.verbalTells
    if (!tells || tells.length === 0) return null
    return getTellHint(tells[0].type)
  }, [profile])

  // Pin/unpin
  const togglePin = useCallback((entry: DialogueEntry) => {
    setPinnedNotes((prev) => {
      const exists = prev.find((n) => n.dialogueId === entry.id)
      if (exists) return prev.filter((n) => n.dialogueId !== entry.id)
      return [...prev, {
        id: `pin-${entry.id}`,
        dialogueId: entry.id,
        turn: entry.turn,
        text: entry.text,
        speaker: entry.speaker,
        order: prev.length,
      }]
    })
  }, [])

  const isPinned = useCallback((id: string) => {
    return pinnedNotes.some((n) => n.dialogueId === id)
  }, [pinnedNotes])

  // Add to comparison tray (Shift+click)
  const addToComparison = useCallback((note: PinnedNote) => {
    setComparisonSlots((prev) => {
      if (!prev[0].note) return [{ note }, prev[1]]
      if (!prev[1].note) return [prev[0], { note }]
      return prev // both full
    })
  }, [])

  const clearComparisonSlot = useCallback((idx: 0 | 1) => {
    setComparisonSlots((prev) => {
      const next = [...prev] as [ComparisonSlot, ComparisonSlot]
      next[idx] = { note: null }
      return next
    })
  }, [])

  // Drag reorder
  const handleDragStart = useCallback((idx: number) => {
    setDragIdx(idx)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === idx) return
    setPinnedNotes((prev) => {
      const next = [...prev]
      const [moved] = next.splice(dragIdx, 1)
      next.splice(idx, 0, moved)
      return next
    })
    setDragIdx(idx)
  }, [dragIdx])

  const handleDragEnd = useCallback(() => {
    setDragIdx(null)
  }, [])

  // Important dialogue entries (system-flagged or from agents with contradictions)
  const importantEntries = useMemo(() => {
    return dialogueLog.filter((entry) =>
      !entry.isHidden && (
        entry.contradictionMeta ||
        entry.behaviorHint ||
        (entry.speaker === 'a' || entry.speaker === 'b')
      ),
    ).slice(-30) // last 30
  }, [dialogueLog])

  // Timeline events from dialogueLog
  const timelineEvents = useMemo(() => {
    return dialogueLog
      .filter((e) => !e.isHidden && e.speaker === 'system')
      .map((e) => ({
        id: e.id,
        turn: e.turn,
        text: e.text,
        revealed: true,
      }))
  }, [dialogueLog])

  if (!caseData) {
    return (
      <div className="flex flex-col h-full">
        <PanelSection icon="👤" title="대상">
          <p className="text-sm" style={{ color: '#4e4e5c' }}>사건을 선택해 주세요</p>
        </PanelSection>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* ── Section 1: 심문 대상 ── */}
      <PanelSection icon="👤" title="심문 대상">
        {/* Target toggle */}
        <div className="flex gap-2 mb-4">
          {(['a', 'b'] as const).map((party) => {
            const p = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
            const isActive = targetParty === party
            return (
              <button
                key={party}
                onClick={() => setTargetParty(party)}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: isActive ? 'rgba(212,162,78,0.12)' : 'var(--pc-p4)',
                  border: isActive ? '1px solid rgba(212,162,78,0.4)' : '1px solid transparent',
                  color: isActive ? 'var(--pc-gold-light)' : '#8b8b9a',
                }}
              >
                {p.name}
              </button>
            )
          })}
        </div>

        {/* Profile info */}
        {profile && (
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold" style={{ color: '#dcdce0' }}>{profile.name}</span>
              <span className="text-xs" style={{ color: '#4e4e5c' }}>{profile.age}세 / {profile.occupation}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Tag color="var(--pc-gold)">{ARCHETYPE_LABELS[archetype] ?? archetype}</Tag>
              {profile.verbalTells?.[0] && (
                <Tag color="var(--pc-blue)">{profile.verbalTells[0].type.replace(/_/g, ' ')}</Tag>
              )}
            </div>
            {tellHint && (
              <p className="text-xs mt-1" style={{ color: '#6e6e7a', lineHeight: '1.5' }}>
                <Emoji char="💡" size={12} /> {tellHint}
              </p>
            )}
          </div>
        )}

        {/* Lie State Step Bar */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-xs font-medium" style={{ color: '#4e4e5c' }}>거짓말 상태</span>
            <span className="text-xs font-semibold" style={{ color: 'var(--pc-gold)' }}>
              {overallLieState} — {LIE_STATE_LABELS[overallLieState]}
            </span>
          </div>
          <div className="flex gap-1">
            {LIE_STATES.map((state, idx) => {
              const rank = LIE_STATES.indexOf(state)
              const isPassed = rank < overallLieRank
              const isCurrent = rank === overallLieRank
              const isLocked = rank > overallLieRank
              return (
                <div
                  key={state}
                  className="flex-1 relative group"
                  title={`${state}: ${LIE_STATE_LABELS[state]}`}
                >
                  <div
                    className="h-2.5 rounded-sm transition-all"
                    style={{
                      background: isPassed
                        ? 'var(--pc-gold)'
                        : isCurrent
                          ? 'linear-gradient(90deg, var(--pc-gold), rgba(212,162,78,0.5))'
                          : 'var(--pc-p4)',
                      opacity: isLocked ? 0.3 : 1,
                      boxShadow: isCurrent ? '0 0 6px rgba(212,162,78,0.3)' : 'none',
                    }}
                  />
                  <span
                    className="block text-center mt-1"
                    style={{
                      fontSize: 9,
                      color: isCurrent ? 'var(--pc-gold-light)' : '#4e4e5c',
                      fontWeight: isCurrent ? 600 : 400,
                    }}
                  >
                    {state}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Emotion Gauge */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-xs font-medium" style={{ color: '#4e4e5c' }}>감정 상태</span>
            <span className="text-xs font-semibold" style={{ color: emotionColor(agent.emotionalState.phase) }}>
              {EMOTION_LABELS[agent.emotionalState.phase]}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--pc-p4)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${agent.emotionalState.internalValue}%`,
                background: `linear-gradient(90deg, ${emotionColor(agent.emotionalState.phase)}88, ${emotionColor(agent.emotionalState.phase)})`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            {EMOTION_PHASES.map((phase) => (
              <span
                key={phase}
                style={{
                  fontSize: 9,
                  color: agent.emotionalState.phase === phase ? emotionColor(phase) : '#3a3a44',
                  fontWeight: agent.emotionalState.phase === phase ? 600 : 400,
                }}
              >
                {EMOTION_LABELS[phase]}
              </span>
            ))}
          </div>
        </div>
      </PanelSection>

      {/* ── Section 2: 핵심 발언 노트 ── */}
      <PanelSection icon="📌" title="핵심 발언 노트" count={pinnedNotes.length}>
        {pinnedNotes.length === 0 && importantEntries.length === 0 && (
          <p className="text-sm" style={{ color: '#4e4e5c' }}>심문 중 중요한 발언을 핀으로 고정하세요</p>
        )}

        {/* Pinned notes */}
        {pinnedNotes.map((note, idx) => (
          <div
            key={note.id}
            className="flex items-start gap-2 px-2 py-2 rounded-lg mb-1.5 cursor-pointer group"
            style={{ background: 'rgba(212,162,78,0.06)', border: '1px solid rgba(212,162,78,0.12)' }}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            onMouseEnter={() => setHighlightedDialogueId(note.dialogueId)}
            onMouseLeave={() => setHighlightedDialogueId(null)}
            onClick={(e) => {
              if (e.shiftKey) addToComparison(note)
              else togglePin({ id: note.dialogueId, speaker: note.speaker as 'a' | 'b', text: note.text, turn: note.turn, relatedDisputes: [] })
            }}
          >
            <span className="text-xs shrink-0 mt-0.5 tabular-nums" style={{ color: '#4e4e5c' }}>T{note.turn}</span>
            <p className="text-xs flex-1 line-clamp-2" style={{ color: '#b0b0ba' }}>{note.text}</p>
            <button
              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              title="핀 해제"
            >
              <Emoji char="📌" size={12} />
            </button>
          </div>
        ))}

        {/* Recent important entries (unpinned) */}
        {importantEntries.slice(-8).map((entry) => {
          if (isPinned(entry.id)) return null
          return (
            <div
              key={entry.id}
              className="flex items-start gap-2 px-2 py-1.5 rounded mb-1 cursor-pointer group hover:bg-white/[0.02]"
              onMouseEnter={() => setHighlightedDialogueId(entry.id)}
              onMouseLeave={() => setHighlightedDialogueId(null)}
              onClick={(e) => {
                if (e.shiftKey) {
                  const note: PinnedNote = {
                    id: `pin-${entry.id}`, dialogueId: entry.id,
                    turn: entry.turn, text: entry.text, speaker: entry.speaker, order: pinnedNotes.length,
                  }
                  addToComparison(note)
                } else {
                  togglePin(entry)
                }
              }}
            >
              <span className="text-xs shrink-0 mt-0.5 tabular-nums" style={{ color: '#3a3a44' }}>T{entry.turn}</span>
              <p className="text-xs flex-1 line-clamp-2" style={{ color: '#6e6e7a' }}>{entry.text}</p>
              {entry.contradictionMeta && (
                <span className="shrink-0" title="모순 감지"><Emoji char="⚠️" size={11} /></span>
              )}
              <button
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                title="핀 고정"
              >
                <Emoji char="📍" size={11} />
              </button>
            </div>
          )
        })}
      </PanelSection>

      {/* ── Section 3: 비교 트레이 ── */}
      <PanelSection icon="⚖️" title="비교 트레이">
        <div className="flex gap-2 mb-2">
          {comparisonSlots.map((slot, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-lg p-2 min-h-[48px] relative"
              style={{
                background: slot.note ? 'rgba(212,162,78,0.06)' : 'var(--pc-p4)',
                border: slot.note ? '1px solid rgba(212,162,78,0.15)' : '1px dashed rgba(255,255,255,0.06)',
              }}
            >
              {slot.note ? (
                <>
                  <p className="text-xs line-clamp-2" style={{ color: '#b0b0ba' }}>{slot.note.text}</p>
                  <button
                    className="absolute top-1 right-1 text-xs"
                    style={{ color: '#4e4e5c' }}
                    onClick={() => clearComparisonSlot(idx as 0 | 1)}
                    title="비우기"
                  >
                    <Emoji char="❌" size={10} />
                  </button>
                </>
              ) : (
                <p className="text-xs text-center" style={{ color: '#3a3a44' }}>
                  슬롯 {idx === 0 ? 'A' : 'B'}
                </p>
              )}
            </div>
          ))}
        </div>
        {comparisonSlots[0].note && comparisonSlots[1].note && (
          <button
            className="w-full py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: 'rgba(212,162,78,0.12)',
              border: '1px solid rgba(212,162,78,0.3)',
              color: 'var(--pc-gold-light)',
            }}
          >
            비교하기
          </button>
        )}
      </PanelSection>

      {/* ── Section 4: 사건 타임라인 (collapsible) ── */}
      <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <button
          className="flex items-center gap-2 w-full text-left"
          onClick={() => setTimelineOpen(!timelineOpen)}
        >
          <Emoji char="⏱️" size={14} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#4e4e5c' }}>
            타임라인
          </span>
          <span
            className="text-xs ml-auto transition-transform"
            style={{ color: '#4e4e5c', transform: timelineOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            ▶
          </span>
        </button>

        {timelineOpen && (
          <div className="mt-3 pl-3 border-l-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {timelineEvents.length === 0 && (
              <p className="text-xs" style={{ color: '#3a3a44' }}>아직 밝혀진 사건이 없습니다</p>
            )}
            {timelineEvents.map((evt) => (
              <div key={evt.id} className="flex items-start gap-2 mb-2.5">
                <div
                  className="w-2 h-2 rounded-full mt-1 shrink-0"
                  style={{ background: evt.revealed ? 'var(--pc-gold)' : 'var(--pc-p4)' }}
                />
                <div>
                  <span className="text-xs tabular-nums" style={{ color: '#4e4e5c' }}>T{evt.turn}</span>
                  <p className="text-xs" style={{ color: evt.revealed ? '#8b8b9a' : '#3a3a44' }}>
                    {evt.revealed ? evt.text : '???'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Sub-components ──

function PanelSection({ icon, title, count, children }: {
  icon: string; title: string; count?: number; children: React.ReactNode
}) {
  return (
    <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Emoji char={icon} size={14} />
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#4e4e5c' }}>
          {title}
        </span>
        {count !== undefined && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--pc-p4)', color: '#8b8b9a' }}>
            {count}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}30`,
        color,
      }}
    >
      {children}
    </span>
  )
}

function emotionColor(phase: EmotionalPhase): string {
  switch (phase) {
    case 'defensive': return '#8b8b9a'
    case 'confident': return 'var(--pc-blue)'
    case 'shaken': return 'var(--pc-gold)'
    case 'angry': return 'var(--pc-red)'
    case 'resigned': return '#6e6e7a'
  }
}
