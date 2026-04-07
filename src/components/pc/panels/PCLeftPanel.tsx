import { useState, useMemo, useCallback, type ReactNode } from 'react'
import { useStore } from '../../../store/useGameStore'
import Emoji from '../../common/Emoji'
import { getEvidenceIconEmoji } from '../../../utils/evidenceIcons'
import { computeSurfacedEvidence } from '../../../engine/evidenceEngine'
import {
  AXIS_LABELS,
  TIER_LABELS,
  TITLE_LABELS,
  deriveJudgeProfile,
  createDefaultDriftState,
  type JudgeDriftState,
} from '../../../engine/judgeProfileEngine'
import type { LieState, LieStateEntry } from '../../../types'
import type { GameEvent } from '../../../store/useGameStore'

// ── LieState badge colors ──
const LIE_STATE_COLORS: Record<string, { bg: string; text: string }> = {
  S0: { bg: 'rgba(139,139,154,0.15)', text: '#8b8b9a' },
  S1: { bg: 'rgba(139,139,154,0.25)', text: '#a0a0b0' },
  S2: { bg: 'rgba(212,162,78,0.15)', text: 'var(--pc-gold-light)' },
  S3: { bg: 'rgba(212,162,78,0.25)', text: 'var(--pc-gold)' },
  S4: { bg: 'rgba(220,100,80,0.20)', text: '#e07060' },
  S5: { bg: 'rgba(100,200,120,0.20)', text: '#70c880' },
}

// ── Evidence type labels ──
const TYPE_LABELS: Record<string, string> = {
  bank: '금융', chat: '메시지', cctv: '영상', contract: '계약서',
  testimony: '진술서', log: '기록물', device: '디지털', sns: 'SNS',
  document: '문서', email: '이메일', photo: '사진', audio: '음성',
  forensic_report: '감정서', platform_log: '로그', access_log: '접근기록',
}

// ── Main Component ──

export default function PCLeftPanel() {
  return (
    <div className="flex flex-col h-full">
      <DisputeSection />
      <EvidenceSection />
      <MeterSection />
      <JudgeProfileSection />
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1: 쟁점 현황
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DisputeSection() {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const setLastFocusedDisputeId = useStore((s) => s.setLastFocusedDisputeId)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)

  const [expandedId, setExpandedId] = useState<string | null>(null)

  const disputes = caseData?.disputes ?? []

  // Compute max lie state across both parties per dispute
  const getMaxLieState = useCallback((disputeId: string): LieState => {
    const entryA = agentA.lieStateMap[disputeId] as LieStateEntry | undefined
    const entryB = agentB.lieStateMap[disputeId] as LieStateEntry | undefined
    const stateA = entryA?.currentState ?? 'S0'
    const stateB = entryB?.currentState ?? 'S0'
    const rank = (s: string) => parseInt(s.replace('S', ''), 10)
    return rank(stateA) >= rank(stateB) ? stateA : stateB
  }, [agentA.lieStateMap, agentB.lieStateMap])

  const handleClick = useCallback((disputeId: string) => {
    setLastFocusedDisputeId(disputeId)
    setExpandedId((prev) => prev === disputeId ? null : disputeId)
  }, [setLastFocusedDisputeId])

  if (!caseData || disputes.length === 0) {
    return (
      <PanelSection icon="⚡" title="쟁점" count={0}>
        <p className="text-sm" style={{ color: '#4e4e5c' }}>심문 진행 시 쟁점이 표시됩니다</p>
      </PanelSection>
    )
  }

  return (
    <PanelSection icon="⚡" title="쟁점" count={disputes.length}>
      <div className="flex flex-col gap-1.5">
        {disputes.map((d, i) => {
          const lieState = getMaxLieState(d.id)
          const isActive = d.id === lastFocusedDisputeId
          const isExpanded = d.id === expandedId
          const colors = LIE_STATE_COLORS[lieState] ?? LIE_STATE_COLORS.S0

          // Related evidence for expanded view
          const relatedEvidence = isExpanded
            ? evidenceDefinitions.filter((e) => e.proves?.includes(d.id))
            : []

          return (
            <div key={d.id}>
              <button
                className="w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2.5"
                style={{
                  background: isActive
                    ? 'rgba(212,162,78,0.08)'
                    : 'rgba(255,255,255,0.02)',
                  border: isActive
                    ? '1px solid rgba(212,162,78,0.20)'
                    : '1px solid transparent',
                }}
                onClick={() => handleClick(d.id)}
              >
                {/* Number */}
                <span
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: isActive ? 'rgba(212,162,78,0.20)' : 'rgba(255,255,255,0.05)',
                    color: isActive ? 'var(--pc-gold)' : '#4e4e5c',
                  }}
                >
                  {i + 1}
                </span>

                {/* Name */}
                <span
                  className="flex-1 text-sm font-medium truncate"
                  style={{ color: isActive ? 'var(--pc-gold-light)' : '#a0a0b0' }}
                >
                  {d.name}
                </span>

                {/* LieState Badge */}
                <span
                  className="shrink-0 text-xs font-mono font-semibold px-1.5 py-0.5 rounded"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {lieState}
                </span>

                {/* Expand indicator */}
                <span
                  className="shrink-0 text-xs transition-transform duration-200"
                  style={{
                    color: '#4e4e5c',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▾
                </span>
              </button>

              {/* Expanded: related evidence */}
              {isExpanded && relatedEvidence.length > 0 && (
                <div
                  className="ml-8 mt-1 mb-2 pl-3 flex flex-col gap-1"
                  style={{ borderLeft: '2px solid rgba(212,162,78,0.12)' }}
                >
                  {relatedEvidence.map((e) => (
                    <div key={e.id} className="flex items-center gap-2 text-xs py-1" style={{ color: '#6e6e80' }}>
                      <span>{getEvidenceIconEmoji(e.type)}</span>
                      <span className="truncate">{e.surfaceName ?? e.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </PanelSection>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2: 증거
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function EvidenceSection() {
  const evidenceStates = useStore((s) => s.evidenceStates)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const recommendedEvidenceIds = useStore((s) => s.recommendedEvidenceIds)
  const evidenceReinforcements = useStore((s) => s.evidenceReinforcements)

  const surfaceResult = useMemo(() => {
    if (evidenceDefinitions.length === 0) return null
    const unlockedIds = evidenceDefinitions
      .filter((e) => evidenceStates[e.id]?.unlocked)
      .map((e) => e.id)
    const baseEvidenceIds = unlockedIds.slice(0, 3)
    return computeSurfacedEvidence(evidenceStates, evidenceDefinitions, lastFocusedDisputeId, baseEvidenceIds)
  }, [evidenceStates, evidenceDefinitions, lastFocusedDisputeId])

  if (!surfaceResult || evidenceDefinitions.length === 0) {
    return (
      <PanelSection icon="📄" title="증거" count={0}>
        <p className="text-sm" style={{ color: '#4e4e5c' }}>발견된 증거가 여기에 표시됩니다</p>
      </PanelSection>
    )
  }

  const { surfacedIds, dimmedIds, reinforcements } = surfaceResult
  const totalUnlocked = surfacedIds.length + dimmedIds.length

  return (
    <PanelSection icon="📄" title="증거" count={totalUnlocked}>
      <div className="flex flex-col gap-2">
        {/* Surfaced evidence: full cards */}
        {surfacedIds.map((id) => {
          const node = evidenceDefinitions.find((e) => e.id === id)
          if (!node) return null
          const state = evidenceStates[id]
          const isRecommended = recommendedEvidenceIds.includes(id)
          const reinforcementCount = reinforcements[id]?.length ?? 0

          return (
            <EvidenceCard
              key={id}
              id={id}
              name={state?.deepInvestigated ? node.name : (node.surfaceName ?? node.name)}
              type={node.type}
              isRecommended={isRecommended}
              reinforcementCount={reinforcementCount}
              dimmed={false}
              presented={state?.presented ?? false}
            />
          )
        })}

        {/* Dimmed evidence: grayed cards */}
        {dimmedIds.map((id) => {
          const node = evidenceDefinitions.find((e) => e.id === id)
          if (!node) return null
          const state = evidenceStates[id]

          return (
            <EvidenceCard
              key={id}
              id={id}
              name={node.surfaceName ?? node.name}
              type={node.type}
              isRecommended={false}
              reinforcementCount={0}
              dimmed
              presented={state?.presented ?? false}
            />
          )
        })}
      </div>
    </PanelSection>
  )
}

function EvidenceCard({ id, name, type, isRecommended, reinforcementCount, dimmed, presented }: {
  id: string
  name: string
  type: string
  isRecommended: boolean
  reinforcementCount: number
  dimmed: boolean
  presented: boolean
}) {
  const setPendingEvidenceView = useStore((s) => s.setPendingEvidenceView)

  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer"
      onDoubleClick={() => { if (!dimmed) setPendingEvidenceView(id) }}
      style={{
        background: dimmed ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.03)',
        border: isRecommended
          ? '1px solid rgba(212,162,78,0.25)'
          : '1px solid rgba(255,255,255,0.04)',
        opacity: dimmed ? 0.45 : 1,
      }}
      draggable={!dimmed}
      title={dimmed ? '추가 조사가 필요합니다' : name}
    >
      {/* Icon */}
      <span className="shrink-0 text-base">{getEvidenceIconEmoji(type)}</span>

      {/* Name + type */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate" style={{ color: dimmed ? '#4e4e5c' : '#b0b0c0' }}>
          {name}
        </div>
        <div className="text-xs" style={{ color: '#4e4e5c' }}>
          {TYPE_LABELS[type] ?? type}
          {presented && <span className="ml-1.5" style={{ color: 'var(--pc-gold)' }}>제시됨</span>}
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-1.5 shrink-0">
        {isRecommended && (
          <span
            className="text-xs font-semibold px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(212,162,78,0.15)', color: 'var(--pc-gold)' }}
          >
            추천
          </span>
        )}
        {reinforcementCount > 0 && (
          <span
            className="text-xs font-bold px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(212,162,78,0.12)', color: 'var(--pc-gold)' }}
          >
            +{reinforcementCount}
          </span>
        )}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3: 미터
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MeterSection() {
  const questionMeters = useStore((s) => s.questionMeters)
  const gameEventLog = useStore((s) => s.gameEventLog)
  const [showLog, setShowLog] = useState(false)

  // Use party 'a' meters as primary display (both are shown conceptually as combined)
  const meterA = questionMeters.a
  const meterB = questionMeters.b

  // Combine meters: show the max of both parties
  const contradiction = Math.min(
    Math.max(meterA.contradictionTokens, meterB.contradictionTokens) * 20,
    100,
  )
  const leak = Math.max(meterA.leakMeter, meterB.leakMeter)
  const trust = Math.max(meterA.trustWindow, meterB.trustWindow)

  // Filter meter-related events for change log
  const meterEvents = useMemo(() => {
    return gameEventLog
      .filter((e: GameEvent) => e.meter != null)
      .slice(-5)
      .reverse()
  }, [gameEventLog])

  return (
    <PanelSection icon="📊" title="미터">
      <div className="flex flex-col gap-3">
        <MeterBar label="모순" color="var(--pc-red, #e07060)" value={contradiction} />
        <MeterBar label="누설" color="var(--pc-gold)" value={leak} />
        <MeterBar label="신뢰" color="var(--pc-blue, #60a0e0)" value={trust} />
      </div>

      {/* Change log toggle */}
      {meterEvents.length > 0 && (
        <div className="mt-3">
          <button
            className="text-xs font-medium transition-colors duration-150"
            style={{ color: '#4e4e5c' }}
            onClick={() => setShowLog(!showLog)}
          >
            변화 기록 {showLog ? '▴' : '▾'}
          </button>

          {showLog && (
            <div className="mt-2 flex flex-col gap-1">
              {meterEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="text-xs px-2 py-1.5 rounded"
                  style={{ background: 'rgba(255,255,255,0.02)', color: '#6e6e80' }}
                >
                  <span className="font-mono mr-1.5" style={{ color: '#4e4e5c' }}>T{ev.turn}</span>
                  {ev.message}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </PanelSection>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4: 재판관 성향
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function JudgeProfileSection() {
  const [expanded, setExpanded] = useState(false)

  // Load drift state from localStorage
  const driftState = useMemo((): JudgeDriftState => {
    try {
      const raw = localStorage.getItem('solomon-judge-drift')
      if (raw) return JSON.parse(raw)
    } catch { /* ignore */ }
    return createDefaultDriftState()
  }, [])

  const profile = useMemo(() => {
    try {
      const rawPerks = localStorage.getItem('solomon-judge-perks')
      const perks = rawPerks ? JSON.parse(rawPerks) : undefined
      return deriveJudgeProfile(driftState, undefined, perks)
    } catch {
      return deriveJudgeProfile(driftState)
    }
  }, [driftState])

  const tierInfo = TIER_LABELS[profile.tier]
  const titleInfo = TITLE_LABELS[profile.titleId] ?? TITLE_LABELS.neutral_observer

  // Summary line
  const summaryText = `${tierInfo.name} · ${driftState.casesProcessed}건`

  return (
    <PanelSection icon="⚖️" title="재판관 성향">
      {/* Summary (always visible) */}
      <button
        className="w-full flex items-center justify-between text-sm"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Emoji char={tierInfo.emoji} size={16} />
          <span style={{ color: '#a0a0b0' }}>{summaryText}</span>
          {titleInfo && (
            <span className="text-xs" style={{ color: '#4e4e5c' }}>{titleInfo.name}</span>
          )}
        </div>
        <span
          className="text-xs transition-transform duration-200"
          style={{ color: '#4e4e5c', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▾
        </span>
      </button>

      {/* Expanded: 3 axis bars + perks */}
      {expanded && (
        <div className="mt-4 flex flex-col gap-4">
          {/* Axis bars */}
          {(['inquiry', 'judgment', 'resolution'] as const).map((axis) => {
            const labels = AXIS_LABELS[axis]
            const level = driftState[axis].level
            const axisValue = profile[`${axis}Axis` as 'inquiryAxis' | 'judgmentAxis' | 'resolutionAxis']
            // Normalize to 0~100 for bar display (center = 50)
            const barPosition = 50 + (axisValue / 2)

            return (
              <div key={axis}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium" style={{ color: '#6e6e80' }}>
                    {labels.label}
                  </span>
                  <span className="text-xs font-mono" style={{ color: '#4e4e5c' }}>
                    {level > 0 ? `+${level}` : level === 0 ? '0' : `${level}`}
                    {' '}
                    <span style={{ color: axisValue < 0 ? '#e07060' : axisValue > 0 ? '#60a0e0' : '#6e6e80' }}>
                      {axisValue < 0 ? labels.negative : axisValue > 0 ? labels.positive : '균형'}
                    </span>
                  </span>
                </div>

                {/* Axis bar: negative ← center → positive */}
                <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--pc-p4)' }}>
                  {/* Center marker */}
                  <div
                    className="absolute top-0 bottom-0 w-px"
                    style={{ left: '50%', background: 'rgba(255,255,255,0.08)' }}
                  />
                  {/* Value indicator */}
                  <div
                    className="absolute top-0 bottom-0 rounded-full transition-all duration-700"
                    style={{
                      left: axisValue < 0 ? `${barPosition}%` : '50%',
                      width: `${Math.abs(axisValue) / 2}%`,
                      background: axisValue < 0
                        ? 'linear-gradient(90deg, #e0706088, #e07060)'
                        : 'linear-gradient(90deg, #60a0e088, #60a0e0)',
                    }}
                  />
                </div>

                {/* Negative / Positive labels */}
                <div className="flex justify-between mt-0.5">
                  <span className="text-[10px]" style={{ color: '#3a3a48' }}>{labels.negative}</span>
                  <span className="text-[10px]" style={{ color: '#3a3a48' }}>{labels.positive}</span>
                </div>
              </div>
            )
          })}

          {/* Perks */}
          {(profile.majorPerk || profile.minorPerk) && (
            <div className="pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
              <div className="text-xs font-medium mb-2" style={{ color: '#4e4e5c' }}>장착 퍼크</div>
              <div className="flex gap-2">
                {profile.majorPerk && (
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{ background: 'rgba(212,162,78,0.12)', color: 'var(--pc-gold)' }}
                  >
                    {profile.majorPerk}
                  </span>
                )}
                {profile.minorPerk && (
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{ background: 'rgba(255,255,255,0.04)', color: '#6e6e80' }}
                  >
                    {profile.minorPerk}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Subtags */}
          {profile.subtags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {profile.subtags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(255,255,255,0.03)', color: '#6e6e80' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </PanelSection>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shared sub-components
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PanelSection({ icon, title, count, children }: {
  icon: string; title: string; count?: number; children: ReactNode
}) {
  return (
    <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Emoji char={icon} size={14} />
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#4e4e5c' }}>
          {title}
        </span>
        {count !== undefined && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: 'var(--pc-p4)', color: '#8b8b9a' }}
          >
            {count}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

function MeterBar({ label, color, value }: { label: string; color: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium w-8" style={{ color: '#4e4e5c' }}>{label}</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--pc-p4)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${Math.min(value, 100)}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
      <span className="text-sm font-medium tabular-nums w-9 text-right" style={{ color: '#4e4e5c' }}>
        {value}%
      </span>
    </div>
  )
}
