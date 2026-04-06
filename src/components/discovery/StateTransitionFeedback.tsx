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
import { createPortal } from 'react-dom'
import { useGameStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'
import type { LieState } from '../../types'
import { getMeterHudModel, type MeterDisplayMode } from '../../engine/meterStagingV2'
import { getPostTransitionRecommendation } from '../../engine/stateTransitionHelper'

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
    icon: '🌅',
    bgClass: 'bg-emerald-950/80',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-800/50',
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
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Emoji char={config.icon} size={18} />
                <span className={`text-xs font-bold ${config.textClass}`}>{config.text}</span>
                <span className="text-[11px] text-gray-400">{event.message}</span>
              </div>
              {(() => {
                const rec = getPostTransitionRecommendation(event.label)
                return rec ? (
                  <div className="text-[11px] text-amber-400/80 pl-6">
                    <Emoji char="💡" size={12} /> {rec.message}
                  </div>
                ) : null
              })()}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** 미터 바 HUD — meterStagingV2 엔진 기반 */
const METER_INFO: Record<string, { icon: string; title: string; desc: string }> = {
  contradiction: { icon: '💥', title: '모순 토큰', desc: '당사자의 진술에서 모순을 발견하면 쌓입니다.\n모순이 누적될수록 거짓말이 흔들리고,\n결정적 순간에 추궁할 수 있습니다.' },
  leak: { icon: '🕳️', title: '누설 미터', desc: '당사자가 실수로 정보를 흘릴 때 올라갑니다.\n높아지면 새로운 증거 단서가 드러나지만,\n너무 높으면 당사자가 경계합니다.' },
  trust: { icon: '🤝', title: '신뢰 창구', desc: '공감 접근이나 부드러운 질문으로 올립니다.\n신뢰가 충분하면 자발적 고백을 유도하거나\n숨겨진 정보를 얻을 수 있습니다.' },
}

export function QuestionMeterHUD({ party }: { party: 'a' | 'b' }) {
  const meters = useGameStore(s => s.questionMeters[party])
  const hardcoreMode = useGameStore(s => s.phase3Flags?.useBeatSelectorV2 === false)
  const mode: MeterDisplayMode = hardcoreMode ? 'exact' : 'staged'
  const hud = getMeterHudModel(meters, mode)
  const [showInfo, setShowInfo] = useState<string | null>(null)

  const info = showInfo ? METER_INFO[showInfo] : null

  return (
    <>
      <div className="flex items-stretch gap-1 w-full">
        <MeterPip
          label={hud.contradiction.label}
          value={hud.contradiction.value}
          max={hud.contradiction.max}
          active={hud.contradiction.active}
          color="yellow"
          onClick={() => setShowInfo('contradiction')}
        />
        <MeterBar
          label={hud.leak.label}
          value={meters.leakMeter}
          max={100}
          warning={meters.leakMeter >= 50}
          critical={meters.leakMeter >= 80}
          color="orange"
          stageLabel={hud.leak.stageLabel}
          onClick={() => setShowInfo('leak')}
        />
        <MeterBar
          label={hud.trust.label}
          value={meters.trustWindow}
          max={100}
          warning={false}
          critical={false}
          active={meters.trustWindow >= 60}
          color="blue"
          stageLabel={hud.trust.stageLabel}
          onClick={() => setShowInfo('trust')}
        />
      </div>

      {/* Stat 설명 모달 — Portal로 body에 직접 렌더링하여 z-index 문제 해결 */}
      {info && createPortal(
        <div className="fixed inset-0 z-[9999] bg-gray-950/80 backdrop-blur-sm flex items-center justify-center px-5" onClick={() => setShowInfo(null)}>
          <div className="bg-gray-900 border border-gray-700/60 rounded-2xl p-5 w-full max-w-sm animate-scale-in shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-3">
              <Emoji char={info.icon} size={32} />
            </div>
            <h3 className="text-base font-bold text-gray-100 text-center mb-2">{info.title}</h3>
            <p className="text-sm text-gray-300 text-center whitespace-pre-line leading-relaxed mb-4">{info.desc}</p>
            <button onClick={() => setShowInfo(null)}
              className="w-full py-2.5 rounded-xl text-sm font-bold bg-amber-600 text-gray-950 active:scale-95">확인</button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

/** 이산형 미터 (토큰) — 좌: 라벨, 하단: pip 바 */
function MeterPip({ label, value, max, active, color, onClick }: {
  label: string
  value: number
  max: number
  active: boolean
  color: 'yellow' | 'orange' | 'blue'
  onClick?: () => void
}) {
  const colorMap = {
    yellow: { filled: 'bg-yellow-400', filledGlow: 'shadow-[0_0_4px_rgba(250,204,21,0.5)]', empty: 'bg-gray-700/50', active: 'text-yellow-400', label: 'text-yellow-500/60', ring: 'ring-yellow-500/15', bg: 'bg-yellow-500/[0.04]' },
    orange: { filled: 'bg-orange-400', filledGlow: 'shadow-[0_0_4px_rgba(251,146,60,0.5)]', empty: 'bg-gray-700/50', active: 'text-orange-400', label: 'text-orange-500/60', ring: 'ring-orange-500/15', bg: 'bg-orange-500/[0.04]' },
    blue:   { filled: 'bg-blue-400',   filledGlow: 'shadow-[0_0_4px_rgba(96,165,250,0.5)]',  empty: 'bg-gray-700/50', active: 'text-blue-400',   label: 'text-blue-500/60',   ring: 'ring-blue-500/15',   bg: 'bg-blue-500/[0.04]' },
  }
  const c = colorMap[color]

  return (
    <div onClick={onClick} className={`flex flex-col justify-between rounded-lg px-2 py-1.5 flex-1 min-w-0 ring-1 cursor-pointer hover:brightness-110 active:scale-[0.97] transition-all ${active ? `${c.bg} ${c.ring}` : 'bg-white/[0.015] ring-white/[0.04]'}`}>
      {/* 상단: 라벨 */}
      <span className={`text-[10px] font-bold mb-1 ${active ? c.active : c.label}`}>{label}</span>
      {/* 하단: pip 도트 — 균등 분포 */}
      <div className="flex justify-between">
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i < value ? `${c.filled} ${active ? c.filledGlow : ''}` : c.empty
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/** 연속형 미터 (바) — 좌상: 라벨, 우상: 단계(작게), 하단: 바 */
function MeterBar({ label, value, max, warning, critical, active, color, stageLabel, onClick }: {
  label: string
  value: number
  max: number
  warning: boolean
  critical: boolean
  active?: boolean
  color: 'yellow' | 'orange' | 'blue'
  stageLabel?: string
  onClick?: () => void
}) {
  const pct = Math.round((value / max) * 100)
  const barColor = critical
    ? 'bg-red-500'
    : warning
      ? 'bg-orange-400'
      : active
        ? 'bg-blue-400'
        : color === 'orange'
          ? 'bg-orange-600/40'
          : 'bg-blue-600/40'

  const labelColor = critical
    ? 'text-red-400'
    : warning
      ? 'text-orange-400'
      : active
        ? 'text-blue-400'
        : 'text-gray-500'

  const stageColor = critical
    ? 'text-red-400/60'
    : warning
      ? 'text-orange-400/60'
      : active
        ? 'text-blue-400/60'
        : 'text-gray-600'

  const isHighlight = warning || critical || active
  const ringColor = critical ? 'ring-red-500/15' : warning ? 'ring-orange-500/15' : active ? 'ring-blue-500/15' : 'ring-white/[0.04]'
  const bgColor = critical ? 'bg-red-500/[0.04]' : warning ? 'bg-orange-500/[0.04]' : active ? 'bg-blue-500/[0.04]' : 'bg-white/[0.015]'

  return (
    <div onClick={onClick} className={`flex flex-col justify-between rounded-lg px-2 py-1.5 flex-1 min-w-0 ring-1 cursor-pointer hover:brightness-110 active:scale-[0.97] transition-all ${bgColor} ${ringColor}`}>
      {/* 상단: 라벨(좌) + 단계(우, 작게) */}
      <div className="flex items-baseline justify-between mb-1">
        <span className={`text-[10px] font-bold ${labelColor}`}>{label}</span>
        <span className={`text-[9px] ${stageColor}`}>{stageLabel ?? `${pct}%`}</span>
      </div>
      {/* 하단: 바 */}
      <div className="w-full h-1.5 bg-gray-800/60 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// getTransitionLabel, emitStateTransitionEvent는 engine/stateTransitionHelper.ts로 분리됨
export { getTransitionLabel, emitStateTransitionEvent } from '../../engine/stateTransitionHelper'
