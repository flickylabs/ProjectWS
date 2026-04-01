/**
 * State Transition Feedback — 상태 전이 시각 피드백
 * ─────────────────────────────────
 * NPC의 lieState 변화 + 질문 미터 효과를 실시간으로 보여주는 HUD.
 *
 * 라벨 체계:
 * - 균열 (cracked): S0→S1~S2 — 진술에 틈이 생김
 * - 궁지 (cornered): S2→S3 — 더 이상 부정이 어려움
 * - 개방 (opening): 신뢰창구 개방 시 — 자발적 시인 가능성
 * - 시인 (confessed): S4→S5 — 사실을 인정
 */

import { useState, useEffect, useCallback } from 'react'
import { useGameStore } from '../../store/useGameStore'
import type { LieState } from '../../types'

type TransitionLabel = 'cracked' | 'cornered' | 'opening' | 'confessed' | null

interface TransitionEvent {
  id: number
  label: TransitionLabel
  party: 'a' | 'b'
  disputeId: string
  message: string
  timestamp: number
}

const LABEL_CONFIG: Record<NonNullable<TransitionLabel>, {
  text: string
  icon: string
  bgClass: string
  textClass: string
  borderClass: string
}> = {
  cracked: {
    text: '균열',
    icon: '⚡',
    bgClass: 'bg-yellow-950/80',
    textClass: 'text-yellow-400',
    borderClass: 'border-yellow-600/50',
  },
  cornered: {
    text: '궁지',
    icon: '🔥',
    bgClass: 'bg-orange-950/80',
    textClass: 'text-orange-400',
    borderClass: 'border-orange-500/50',
  },
  opening: {
    text: '개방',
    icon: '💡',
    bgClass: 'bg-blue-950/80',
    textClass: 'text-blue-400',
    borderClass: 'border-blue-500/50',
  },
  confessed: {
    text: '시인',
    icon: '✓',
    bgClass: 'bg-emerald-950/80',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/50',
  },
}

/** 상태 전이 시 보여주는 토스트 */
export function StateTransitionToast() {
  const [events, setEvents] = useState<TransitionEvent[]>([])

  const dismiss = useCallback((id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }, [])

  // 자동 dismiss
  useEffect(() => {
    if (events.length === 0) return
    const latest = events[events.length - 1]
    const timer = setTimeout(() => dismiss(latest.id), 2500)
    return () => clearTimeout(timer)
  }, [events, dismiss])

  // Store의 gameEventLog 구독
  const gameEventLog = useGameStore(s => s.gameEventLog)
  useEffect(() => {
    if (gameEventLog.length === 0) return
    const latest = gameEventLog[gameEventLog.length - 1]
    if (latest.type !== 'state_transition') return

    // 메시지에서 라벨 추론
    let label: TransitionLabel = null
    if (latest.message.includes('균열')) label = 'cracked'
    else if (latest.message.includes('궁지')) label = 'cornered'
    else if (latest.message.includes('개방')) label = 'opening'
    else if (latest.message.includes('시인')) label = 'confessed'

    if (!label) return

    setEvents(prev => [...prev, {
      id: latest.id,
      label,
      party: 'a', // 이벤트에서 추출
      disputeId: '',
      message: latest.message,
      timestamp: latest.timestamp,
    }])
  }, [gameEventLog])

  if (events.length === 0) return null

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
      {events.map(event => {
        if (!event.label) return null
        const config = LABEL_CONFIG[event.label]
        return (
          <div
            key={event.id}
            className={`${config.bgClass} ${config.borderClass} border rounded-xl px-4 py-2
              backdrop-blur-sm shadow-lg animate-slide-down pointer-events-auto cursor-pointer`}
            onClick={() => dismiss(event.id)}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{config.icon}</span>
              <span className={`text-xs font-bold ${config.textClass}`}>{config.text}</span>
              <span className="text-[11px] text-gray-400">{event.message}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** 미터 바 HUD — 3개 미터를 컴팩트하게 표시 */
export function QuestionMeterHUD({ party }: { party: 'a' | 'b' }) {
  const meters = useGameStore(s => s.questionMeters[party])
  const meterEffects = useGameStore(s => s.getQuestionMeterEffects(party))

  return (
    <div className="flex items-center gap-3">
      {/* 모순토큰 */}
      <MeterPip
        label="모순"
        value={meters.contradictionTokens}
        max={5}
        active={meterEffects.contradictionActive}
        color="yellow"
      />
      {/* 누설미터 */}
      <MeterBar
        label="누설"
        value={meters.leakMeter}
        max={100}
        warning={meterEffects.leakWarning}
        critical={meterEffects.leakCritical}
        color="orange"
      />
      {/* 신뢰창구 */}
      <MeterBar
        label="신뢰"
        value={meters.trustWindow}
        max={100}
        warning={false}
        critical={false}
        active={meterEffects.trustWindowOpen}
        color="blue"
      />
    </div>
  )
}

/** 이산형 미터 (토큰 형태) */
function MeterPip({ label, value, max, active, color }: {
  label: string
  value: number
  max: number
  active: boolean
  color: 'yellow' | 'orange' | 'blue'
}) {
  const colorMap = {
    yellow: { filled: 'bg-yellow-500', empty: 'bg-gray-700', active: 'text-yellow-400', label: 'text-yellow-500/60' },
    orange: { filled: 'bg-orange-500', empty: 'bg-gray-700', active: 'text-orange-400', label: 'text-orange-500/60' },
    blue: { filled: 'bg-blue-500', empty: 'bg-gray-700', active: 'text-blue-400', label: 'text-blue-500/60' },
  }
  const c = colorMap[color]

  return (
    <div className="flex items-center gap-1">
      <span className={`text-[9px] font-semibold ${active ? c.active : c.label}`}>{label}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i < value ? `${c.filled} ${active ? 'animate-pulse' : ''}` : c.empty
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/** 연속형 미터 (바 형태) */
function MeterBar({ label, value, max, warning, critical, active, color }: {
  label: string
  value: number
  max: number
  warning: boolean
  critical: boolean
  active?: boolean
  color: 'yellow' | 'orange' | 'blue'
}) {
  const pct = Math.round((value / max) * 100)
  const barColor = critical
    ? 'bg-red-500'
    : warning
      ? 'bg-orange-500'
      : active
        ? 'bg-blue-400'
        : color === 'orange'
          ? 'bg-orange-600/60'
          : 'bg-blue-600/60'

  const labelColor = critical
    ? 'text-red-400'
    : warning
      ? 'text-orange-400'
      : active
        ? 'text-blue-400'
        : 'text-gray-500'

  return (
    <div className="flex items-center gap-1">
      <span className={`text-[9px] font-semibold ${labelColor}`}>{label}</span>
      <div className="w-12 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor} ${
            (warning || critical || active) ? 'animate-pulse' : ''
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-[8px] ${labelColor}`}>{pct}%</span>
    </div>
  )
}

/** lieState 변화를 TransitionLabel로 변환 */
export function getTransitionLabel(from: LieState, to: LieState): TransitionLabel {
  const fromRank = STATE_RANK[from]
  const toRank = STATE_RANK[to]

  if (fromRank >= toRank) return null

  if (toRank === 5) return 'confessed'
  if (toRank >= 3) return 'cornered'
  if (toRank >= 1) return 'cracked'

  return null
}

const STATE_RANK: Record<LieState, number> = {
  S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5,
}

/** lieState 전이 시 Store에 이벤트를 푸시하는 헬퍼 */
export function emitStateTransitionEvent(
  party: 'a' | 'b',
  disputeId: string,
  from: LieState,
  to: LieState,
  turn: number,
  partyName: string,
) {
  const label = getTransitionLabel(from, to)
  if (!label) return

  const config = LABEL_CONFIG[label]
  const store = useGameStore.getState()
  store.pushGameEvent({
    id: store.gameEventLog.length + 1,
    turn,
    type: 'state_transition',
    message: `${partyName} — ${config.text}: ${STATE_LABELS[from]} → ${STATE_LABELS[to]}`,
    timestamp: Date.now(),
  })
}

const STATE_LABELS: Record<LieState, string> = {
  S0: '완전 부정', S1: '흔들림', S2: '부분 인정', S3: '전가', S4: '감정 호소', S5: '시인',
}
