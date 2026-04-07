import { useState, useEffect, useCallback, useMemo } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { GameStore } from '../../../store/useGameStore'
import Emoji from '../../common/Emoji'
import type { EmotionalPhase, LieState, PartyId } from '../../../types'
import { computeEffectiveness } from '../../../engine/questionEffectEngine'

// ── Constants ──

const EMOTION_KO: Record<EmotionalPhase, string> = {
  defensive: '경계', confident: '자신감', shaken: '동요', angry: '격앙', resigned: '체념',
}

const LIE_STATES: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']

type HotbarPage = 'interrogation' | 'evidence' | 'special'

interface HotbarSlot {
  key: number           // 1~6
  icon: string          // emoji char
  name: string
  action: (() => void) | null
  locked: boolean
  effectiveness?: 'strong' | 'normal' | 'weak'
}

// ── Page definitions ──

function buildInterrogationSlots(
  targetParty: PartyId,
  lieState: LieState,
  emotionPhase: EmotionalPhase,
  archetype: string,
  meters: { contradictionTokens: number; trustWindow: number },
  dispatch: GameStore['applyQuestionEffect'] | null,
  onFreeQuestion: () => void,
): HotbarSlot[] {
  const emotionTier = emotionPhaseToTier(emotionPhase)

  const factEff = computeEffectiveness('fact_pursuit', lieState, emotionTier, archetype, meters.contradictionTokens, meters.trustWindow)
  const motiveEff = computeEffectiveness('motive_search', lieState, emotionTier, archetype, meters.contradictionTokens, meters.trustWindow)
  const empathyEff = computeEffectiveness('empathy_approach', lieState, emotionTier, archetype, meters.contradictionTokens, meters.trustWindow)

  return [
    { key: 1, icon: '🔍', name: '사실 추궁', locked: false, effectiveness: factEff.level, action: null },
    { key: 2, icon: '💡', name: '동기 탐색', locked: false, effectiveness: motiveEff.level, action: null },
    { key: 3, icon: '🤝', name: '공감 접근', locked: false, effectiveness: empathyEff.level, action: null },
    { key: 4, icon: '💬', name: '자유질문', locked: false, action: onFreeQuestion },
    { key: 5, icon: '🔒', name: '—', locked: true, action: null },
    { key: 6, icon: '🔒', name: '—', locked: true, action: null },
  ]
}

function buildEvidenceSlots(): HotbarSlot[] {
  return [
    { key: 1, icon: '📄', name: '증거 제시', locked: false, action: null },
    { key: 2, icon: '🔬', name: '증거 조사', locked: false, action: null },
    { key: 3, icon: '📎', name: '증거 조합', locked: false, action: null },
    { key: 4, icon: '🗂️', name: '증거 목록', locked: false, action: null },
    { key: 5, icon: '🔒', name: '—', locked: true, action: null },
    { key: 6, icon: '🔒', name: '—', locked: true, action: null },
  ]
}

function buildSpecialSlots(): HotbarSlot[] {
  return [
    { key: 1, icon: '⚡', name: '즉답 요구', locked: false, action: null },
    { key: 2, icon: '👂', name: '회피 판독', locked: false, action: null },
    { key: 3, icon: '🛡️', name: '비공개 보호', locked: false, action: null },
    { key: 4, icon: '👥', name: '증인 소환', locked: false, action: null },
    { key: 5, icon: '✋', name: '분리 심문', locked: false, action: null },
    { key: 6, icon: '🔒', name: '—', locked: true, action: null },
  ]
}

// ── Main Component ──

export default function PCBottomDock() {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const archetypeA = useStore((s) => s.archetypeA)
  const archetypeB = useStore((s) => s.archetypeB)
  const questionMeters = useStore((s) => s.questionMeters)
  const applyQuestionEffect = useStore((s) => s.applyQuestionEffect)

  const [activePage, setActivePage] = useState<HotbarPage>('interrogation')
  const [targetParty, setTargetParty] = useState<PartyId>('a')
  const [freeQuestionOpen, setFreeQuestionOpen] = useState(false)
  const [freeQuestionText, setFreeQuestionText] = useState('')

  // Derived
  const targetAgent = targetParty === 'a' ? agentA : agentB
  const targetArchetype = targetParty === 'a' ? archetypeA : archetypeB
  const targetProfile = targetParty === 'a' ? caseData?.duo.partyA : caseData?.duo.partyB
  const targetMeters = questionMeters[targetParty]

  // Overall lie state for target
  const overallLieState = useMemo((): LieState => {
    const entries = Object.values(targetAgent.lieStateMap)
    if (entries.length === 0) return 'S0'
    const ranks = entries.map((e) => LIE_STATES.indexOf(e.currentState))
    return LIE_STATES[Math.max(...ranks)]
  }, [targetAgent.lieStateMap])

  const lieProgress = useMemo(() => {
    return (LIE_STATES.indexOf(overallLieState) / (LIE_STATES.length - 1)) * 100
  }, [overallLieState])

  // Build slots
  const slots = useMemo(() => {
    switch (activePage) {
      case 'interrogation':
        return buildInterrogationSlots(
          targetParty, overallLieState, targetAgent.emotionalState.phase,
          targetArchetype, targetMeters, applyQuestionEffect,
          () => setFreeQuestionOpen(true),
        )
      case 'evidence':
        return buildEvidenceSlots()
      case 'special':
        return buildSpecialSlots()
    }
  }, [activePage, targetParty, overallLieState, targetAgent.emotionalState.phase, targetArchetype, targetMeters, applyQuestionEffect])

  // Keyboard handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // F1~F3 page switch
      if (e.key === 'F1') { e.preventDefault(); setActivePage('interrogation'); return }
      if (e.key === 'F2') { e.preventDefault(); setActivePage('evidence'); return }
      if (e.key === 'F3') { e.preventDefault(); setActivePage('special'); return }

      // 1~6 slot activation
      const num = parseInt(e.key)
      if (num >= 1 && num <= 6) {
        e.preventDefault()
        const slot = slots[num - 1]
        if (slot && !slot.locked && slot.action) {
          slot.action()
        }
        return
      }

      // Tab: cycle pages
      if (e.key === 'Tab' && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setActivePage((prev) => {
          if (prev === 'interrogation') return 'evidence'
          if (prev === 'evidence') return 'special'
          return 'interrogation'
        })
        return
      }

      // Esc: close free question
      if (e.key === 'Escape') {
        setFreeQuestionOpen(false)
        return
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [slots])

  const handleFreeQuestionSend = useCallback(() => {
    if (!freeQuestionText.trim()) return
    // TODO: dispatch free question through existing game actions
    setFreeQuestionText('')
    setFreeQuestionOpen(false)
  }, [freeQuestionText])

  if (!caseData) return null

  const partyA = caseData.duo.partyA
  const partyB = caseData.duo.partyB

  return (
    <div
      className="shrink-0 flex flex-col"
      style={{
        background: 'var(--pc-p1)',
        borderTop: '1px solid rgba(212,162,78,0.15)',
      }}
    >
      {/* Free question input */}
      {freeQuestionOpen && (
        <div className="flex items-center gap-3 px-6 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <span className="text-xs font-medium shrink-0" style={{ color: 'var(--pc-gold-light)' }}>
            자유질문
          </span>
          <input
            type="text"
            value={freeQuestionText}
            onChange={(e) => setFreeQuestionText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleFreeQuestionSend(); if (e.key === 'Escape') setFreeQuestionOpen(false) }}
            placeholder="질문을 입력하세요..."
            autoFocus
            className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: 'var(--pc-p4)',
              border: '1px solid rgba(212,162,78,0.2)',
              color: '#dcdce0',
            }}
          />
          <button
            onClick={handleFreeQuestionSend}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: 'rgba(212,162,78,0.15)',
              border: '1px solid rgba(212,162,78,0.3)',
              color: 'var(--pc-gold-light)',
            }}
          >
            전송
          </button>
          <button
            onClick={() => setFreeQuestionOpen(false)}
            className="text-xs px-2 py-1"
            style={{ color: '#4e4e5c' }}
          >
            Esc
          </button>
        </div>
      )}

      {/* Main dock row */}
      <div className="flex items-center gap-4 px-4 py-3">
        {/* Character A card */}
        <CharacterCard
          name={partyA.name}
          emotion={agentA.emotionalState.phase}
          lieProgress={(() => {
            const entries = Object.values(agentA.lieStateMap)
            if (entries.length === 0) return 0
            const ranks = entries.map((e) => LIE_STATES.indexOf(e.currentState))
            return (Math.max(...ranks) / (LIE_STATES.length - 1)) * 100
          })()}
          isTarget={targetParty === 'a'}
          onClick={() => setTargetParty('a')}
        />

        {/* Hotbar center */}
        <div className="flex-1 flex flex-col items-center gap-2">
          {/* Slots */}
          <div className="flex gap-2">
            {slots.map((slot) => (
              <HotbarSlotButton
                key={slot.key}
                slot={slot}
                onClick={() => {
                  if (!slot.locked && slot.action) slot.action()
                }}
              />
            ))}
          </div>

          {/* Page tabs */}
          <div className="flex gap-1">
            {([
              { key: 'interrogation' as HotbarPage, label: 'F1 심문', fKey: 'F1' },
              { key: 'evidence' as HotbarPage, label: 'F2 증거', fKey: 'F2' },
              { key: 'special' as HotbarPage, label: 'F3 특수', fKey: 'F3' },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActivePage(tab.key)}
                className="px-3 py-1 rounded text-xs font-medium transition-all"
                style={{
                  background: activePage === tab.key ? 'rgba(212,162,78,0.12)' : 'transparent',
                  border: activePage === tab.key ? '1px solid rgba(212,162,78,0.3)' : '1px solid transparent',
                  color: activePage === tab.key ? 'var(--pc-gold-light)' : '#4e4e5c',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Character B card */}
        <CharacterCard
          name={partyB.name}
          emotion={agentB.emotionalState.phase}
          lieProgress={(() => {
            const entries = Object.values(agentB.lieStateMap)
            if (entries.length === 0) return 0
            const ranks = entries.map((e) => LIE_STATES.indexOf(e.currentState))
            return (Math.max(...ranks) / (LIE_STATES.length - 1)) * 100
          })()}
          isTarget={targetParty === 'b'}
          onClick={() => setTargetParty('b')}
        />
      </div>
    </div>
  )
}

// ── Sub-components ──

function CharacterCard({ name, emotion, lieProgress, isTarget, onClick }: {
  name: string
  emotion: EmotionalPhase
  lieProgress: number
  isTarget: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all shrink-0"
      style={{
        width: 120,
        background: isTarget ? 'rgba(212,162,78,0.08)' : 'var(--pc-p4)',
        border: isTarget ? '2px solid var(--pc-gold)' : '2px solid transparent',
        boxShadow: isTarget ? '0 0 12px rgba(212,162,78,0.15)' : 'none',
      }}
    >
      <div className="flex items-center gap-1.5">
        <Emoji char="👤" size={16} />
        <span
          className="text-sm font-semibold truncate"
          style={{ color: isTarget ? 'var(--pc-gold-light)' : '#b0b0ba', maxWidth: 72 }}
        >
          {name}
        </span>
      </div>
      <span
        className="text-xs font-medium"
        style={{ color: emotionColor(emotion) }}
      >
        {EMOTION_KO[emotion]}
      </span>
      {/* HP bar (lie progress) */}
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${lieProgress}%`,
            background: lieProgress > 60
              ? 'var(--pc-red)'
              : lieProgress > 30
                ? 'var(--pc-gold)'
                : 'var(--pc-blue)',
          }}
        />
      </div>
    </button>
  )
}

function HotbarSlotButton({ slot, onClick }: { slot: HotbarSlot; onClick: () => void }) {
  const effDot = slot.effectiveness
    ? { strong: 'var(--pc-gold)', normal: '#4e4e5c', weak: 'var(--pc-red)' }[slot.effectiveness]
    : null

  return (
    <button
      onClick={onClick}
      disabled={slot.locked}
      className="relative flex flex-col items-center justify-center rounded-xl transition-all group"
      style={{
        width: 72,
        height: 64,
        background: slot.locked ? 'var(--pc-p4)' : 'rgba(255,255,255,0.03)',
        border: slot.locked ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(255,255,255,0.06)',
        cursor: slot.locked ? 'not-allowed' : 'pointer',
        opacity: slot.locked ? 0.4 : 1,
      }}
      title={slot.locked ? '잠김' : slot.name}
    >
      {/* Key number */}
      <span
        className="absolute top-1 left-1.5 text-xs font-mono"
        style={{ color: '#3a3a44', fontSize: 10 }}
      >
        {slot.key}
      </span>

      {/* Locked overlay */}
      {slot.locked && (
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255,255,255,0.02) 4px, rgba(255,255,255,0.02) 8px)',
          }}
        />
      )}

      {/* Icon */}
      <Emoji char={slot.icon} size={20} />

      {/* Name */}
      <span className="text-xs mt-1 truncate max-w-[60px]" style={{ color: slot.locked ? '#3a3a44' : '#8b8b9a', fontSize: 10 }}>
        {slot.name}
      </span>

      {/* Effectiveness dot */}
      {effDot && !slot.locked && (
        <div
          className="absolute top-1 right-1.5 w-2 h-2 rounded-full"
          style={{ background: effDot, boxShadow: `0 0 4px ${effDot}` }}
          title={slot.effectiveness === 'strong' ? '효과적' : slot.effectiveness === 'weak' ? '비효율적' : '보통'}
        />
      )}
    </button>
  )
}

// ── Utils ──

function emotionPhaseToTier(phase: EmotionalPhase): 'calm' | 'agitated' | 'explosive' | 'shutdown' {
  switch (phase) {
    case 'defensive': return 'calm'
    case 'confident': return 'calm'
    case 'shaken': return 'agitated'
    case 'angry': return 'explosive'
    case 'resigned': return 'shutdown'
  }
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
