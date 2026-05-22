import { useState } from 'react'
import { useGameStore, useStore } from '../../store/useGameStore'
import { MAX_TURNS } from '../../utils/constants'
import { getArchetypeLabel } from '../../utils/archetypeLabel'
import { Phase } from '../../types'
import Emoji from '../common/Emoji'
import PhaseIndicator from '../layout/PhaseIndicator'
import type { UnsafeAny } from '../../types/lint'
import { isPartyFieldExposed, type UiExposureRuntimeContext } from '../../engine/coreCaseAuthorityLoader'
import { normalizeCaseKey } from '../../utils/caseHelpers'

// EmotionGuide는 PartyDetailPopup 내부 탭으로 통합됨

const EMOTION_EMOJI: Record<string, string> = {
  defensive: '😐', confident: '😤', shaken: '😰', angry: '😡', resigned: '😞',
}


export default function PartyStatusBar() {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const separationTarget = useStore((s) => s.separationTarget)
  const [showPartyPopup, setShowPartyPopup] = useState<{ party: 'a' | 'b'; tab: 'info' | 'emotion' } | null>(null)
  const turnCount = useStore((s) => s.turnCount)
  const processMetrics = useStore((s) => s.processMetrics)
  const currentPhase = useStore((s) => s.currentPhase)
  if (!caseData) return null

  const _remainingTurns = MAX_TURNS - turnCount
  const _estimatedScore = Math.min(100,
    processMetrics.liesCollapsed * 10 + processMetrics.evidenceDiscovered * 8
    + processMetrics.evidenceEffective * 5 + processMetrics.freeQuestionsRelevant * 3
  )
  const _isLatePhase = currentPhase === Phase.Interrogation
    || currentPhase === Phase.Mediation
    || currentPhase === Phase.Verdict

  const phaseA = agentA.emotionalState.phase
  const phaseB = agentB.emotionalState.phase
  const aExcluded = separationTarget === 'b'
  const bExcluded = separationTarget === 'a'

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-800/60 bg-gray-900/50 px-4 h-11 shrink-0">
        {/* A: 이모지 → 감정탭, 이름 → 프로필탭 */}
        <div className={`flex items-center gap-1.5 ${aExcluded ? 'opacity-30' : ''}`}>
          <button
            onClick={() => setShowPartyPopup({ party: 'a', tab: 'emotion' })}
            className="active:scale-90 transition-all"
          >
            <Emoji char={aExcluded ? '🚪' : (EMOTION_EMOJI[phaseA] ?? '😐')} size={20} />
          </button>
          <button
            onClick={() => setShowPartyPopup({ party: 'a', tab: 'info' })}
            className="active:scale-95 transition-all"
          >
            <span className="text-sm font-bold text-blue-400">{caseData.duo.partyA.name}</span>
          </button>
        </div>

        {/* 중앙: Phase 표시 */}
        <PhaseIndicator />

        {/* B: 이름 → 프로필탭, 이모지 → 감정탭 */}
        <div className={`flex items-center gap-1.5 ${bExcluded ? 'opacity-30' : ''}`}>
          <button
            onClick={() => setShowPartyPopup({ party: 'b', tab: 'info' })}
            className="active:scale-95 transition-all"
          >
            <span className="text-sm font-bold text-rose-400">{caseData.duo.partyB.name}</span>
          </button>
          <button
            onClick={() => setShowPartyPopup({ party: 'b', tab: 'emotion' })}
            className="active:scale-90 transition-all"
          >
            <Emoji char={bExcluded ? '🚪' : (EMOTION_EMOJI[phaseB] ?? '😐')} size={20} />
          </button>
        </div>
      </div>

      {/* 캐릭터/감정 통합 팝업 */}
      {showPartyPopup && (
        <PartyDetailPopup
          party={showPartyPopup.party}
          initialTab={showPartyPopup.tab}
          caseData={caseData}
          agent={showPartyPopup.party === 'a' ? agentA : agentB}
          onClose={() => setShowPartyPopup(null)}
        />
      )}
    </>
  )
}

function _StatPill({ icon, value, max, color }: { icon: string; value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <Emoji char={icon} size={14} />
      <span className={`text-sm font-bold ${value === 0 ? 'text-red-400' : color}`}>{value}<span className="text-gray-600 font-normal">/{max}</span></span>
    </div>
  )
}

/** 캐릭터 + 감정 통합 팝업 — 탭 토글 전환 */
function PartyDetailPopup({ party, initialTab, caseData, agent, onClose }: {
  party: 'a' | 'b'; initialTab: 'info' | 'emotion'; caseData: UnsafeAny; agent: UnsafeAny; onClose: () => void
}) {
  const [tab, setTab] = useState<'info' | 'emotion'>(initialTab)
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const nameColor = party === 'a' ? 'text-blue-400' : 'text-rose-400'
  const ringColor = party === 'a' ? 'ring-blue-500/40' : 'ring-rose-500/40'
  const emo = agent.emotionalState
  const lieEntries = Object.entries(agent.lieStateMap) as [string, UnsafeAny][]
  const turnCount = useGameStore.getState().turnCount

  const hasAnyCollapse = lieEntries.some(([, e]) => e.currentState === 'S5')
  const hasAllCollapse = lieEntries.length > 0 && lieEntries.every(([, e]) => e.currentState === 'S5')
  const hasShaken = emo.phase === 'shaken' || emo.phase === 'angry' || emo.phase === 'resigned'
  const advancedTurns = turnCount >= 5
  const resolvedDisputeIds = new Set(
    lieEntries.filter(([, e]) => e.currentState === 'S5').map(([id]) => id),
  )

  // η: Authority.uiExposure.fieldPolicy 게이트 (Authority 부재 시 DEFAULT_FIELD_GATE fallback).
  // line 168 Critical P0 (fear가 hasShaken만으로 노출) → after_any_collapse 정책으로 강화.
  const caseKey = normalizeCaseKey(caseData)
  const fieldPrefix = party === 'a' ? 'partyA' : 'partyB'
  const exposureCtx: UiExposureRuntimeContext = {
    advancedTurns,
    hasShaken,
    hasAnyCollapse,
    hasAllCollapse,
    verdictDelivered: false,
    resolvedDisputeIds,
  }
  const fearExposure = isPartyFieldExposed(caseKey, `${fieldPrefix}.fear`, exposureCtx)
  const speechStyleExposure = isPartyFieldExposed(caseKey, `${fieldPrefix}.speechStyle`, exposureCtx)
  const sensitiveExposure = isPartyFieldExposed(caseKey, `${fieldPrefix}.sensitivePoints`, exposureCtx)

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/80 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm max-h-[75vh] overflow-y-auto animate-fade-in" onClick={e => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center gap-3 p-4 pb-2">
          <div className={`w-11 h-11 rounded-full bg-gray-800 ring-2 ${ringColor} flex items-center justify-center text-xl`}>
            <Emoji char={EMOTION_EMOJI[emo.phase] ?? '😐'} size={20} />
          </div>
          <div className="flex-1">
            <h3 className={`text-base font-bold ${nameColor}`}>{profile.name}</h3>
            <p className="text-xs text-gray-500">{profile.age}세 · {profile.occupation}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg"><Emoji char="✕" size={16} /></button>
        </div>

        {/* 탭 토글 */}
        <div className="flex mx-4 mb-3 bg-gray-800/60 rounded-lg p-0.5">
          <button
            onClick={() => setTab('info')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold transition-all ${
              tab === 'info'
                ? 'bg-gray-700 text-gray-200 shadow-sm'
                : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            <Emoji char="👤" size={12} /> 캐릭터 정보
          </button>
          <button
            onClick={() => setTab('emotion')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold transition-all ${
              tab === 'emotion'
                ? 'bg-gray-700 text-gray-200 shadow-sm'
                : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            <Emoji char={EMOTION_EMOJI[emo.phase] ?? '😐'} size={12} /> 감정 상태
          </button>
        </div>

        <div className="px-4 pb-4">
          {/* ── 캐릭터 정보 탭 ── */}
          {tab === 'info' && (
            <div className="animate-fade-in">
              <InfoRow label="성격" value={getArchetypeLabel(profile.archetype)} />
              {speechStyleExposure.exposed
                ? <InfoRow label="말투" value={profile.speechStyle} />
                : <LockedRow label="말투" hint={speechStyleExposure.lockedHint ?? '5턴 이상 진행 시 해금'} />}
              {fearExposure.exposed
                ? <InfoRow label="두려움" value={profile.fear} />
                : <LockedRow label="두려움" hint={fearExposure.lockedHint ?? '거짓말 완전 붕괴 시 해금'} />}

              {/* 쟁점별 상태 */}
              <div className="space-y-1 mt-3">
                <div className="text-xs text-gray-500 mb-1">쟁점별 상태</div>
                {lieEntries.map(([dId, entry]) => {
                  const dispute = caseData.disputes.find((d: UnsafeAny) => d.id === dId)
                  return (
                    <div key={dId} className="flex items-center justify-between text-xs bg-gray-800/40 rounded-lg px-2.5 py-2">
                      <span className="text-gray-300">{dispute?.name ?? dId}</span>
                      <span className={entry.currentState === 'S5' ? 'text-emerald-400 font-bold' : 'text-gray-500'}>
                        {getLieStateLabel(entry.currentState)}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* 민감 포인트 */}
              {sensitiveExposure.exposed ? (
                <div className="mt-3">
                  <div className="text-xs text-gray-500 mb-1">민감 포인트</div>
                  <div className="flex flex-wrap gap-1">
                    {profile.sensitivePoints?.map((sp: string, i: number) => (
                      <span key={i} className="text-xs bg-red-950/30 text-red-400 border border-red-800/30 rounded-full px-2 py-0.5">{sp}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <LockedRow label="민감 포인트" hint={sensitiveExposure.lockedHint ?? '거짓말 완전 붕괴 시 해금'} />
                </div>
              )}
            </div>
          )}

          {/* ── 감정 상태 탭 ── */}
          {tab === 'emotion' && (
            <div className="animate-fade-in">
              <EmotionGuideContent emotionValue={emo.internalValue} emotionPhase={emo.phase} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** 감정 안내 콘텐츠 — 팝업 내부 탭용 (인라인) */
function EmotionGuideContent({ emotionValue, emotionPhase: _emotionPhase }: { emotionValue: number; emotionPhase: string }) {
  const TIERS = [
    { tier: 'calm', min: 0, max: 30, label: '침착', icon: '🛡️', desc: '방어력이 높아 거짓말을 흔들기 어렵습니다. 논리적으로 답변하여 빈틈이 적습니다.', bg: 'bg-blue-950/40', border: 'border-blue-700/40', text: 'text-blue-400', slipInfo: '' },
    { tier: 'agitated', min: 30, max: 60, label: '동요', icon: '😰', desc: '균형 상태입니다. 질문 효과가 보통이며, 안정적으로 심문을 진행할 수 있습니다.', bg: 'bg-yellow-950/40', border: 'border-yellow-700/40', text: 'text-yellow-400', slipInfo: '' },
    { tier: 'explosive', min: 60, max: 85, label: '격앙', icon: '💢', desc: '방어력이 약해져 거짓말 전이가 쉬워집니다. 흥분 상태에서 실수로 자백할 수 있지만, 더 밀면 체념 상태에 빠집니다.', bg: 'bg-red-950/40', border: 'border-red-700/40', text: 'text-red-400', slipInfo: '실수 자백 확률: 30% | 거짓말 전이 1.5배' },
    { tier: 'shutdown', min: 85, max: 100, label: '체념', icon: '🔒', desc: '응답을 거부합니다. 2턴간 이 당사자에게 질문할 수 없습니다. 공감 접근으로 감정을 낮춰야 합니다.', bg: 'bg-gray-800/40', border: 'border-gray-600/40', text: 'text-gray-400', slipInfo: '' },
  ]
  const currentTier = TIERS.find(t => emotionValue >= t.min && emotionValue < t.max) ?? TIERS[TIERS.length - 1]

  return (
    <>
      {/* 수치 바 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500">감정 수치</span>
          <span className={`text-xs font-bold ${currentTier.text}`}>{Math.round(emotionValue)} / 100</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="relative w-full h-full">
            <div className="absolute inset-y-0 left-0 bg-blue-600/40" style={{ width: '30%' }} />
            <div className="absolute inset-y-0 left-[30%] bg-yellow-600/40" style={{ width: '30%' }} />
            <div className="absolute inset-y-0 left-[60%] bg-red-600/40" style={{ width: '25%' }} />
            <div className="absolute inset-y-0 left-[85%] bg-gray-600/40" style={{ width: '15%' }} />
            <div className="absolute top-0 h-full w-1 bg-white rounded-full shadow-lg shadow-white/50" style={{ left: `${Math.min(emotionValue, 100)}%` }} />
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-blue-500">침착</span>
          <span className="text-[10px] text-yellow-500">동요</span>
          <span className="text-[10px] text-red-500">격앙</span>
          <span className="text-[10px] text-gray-500">체념</span>
        </div>
      </div>

      {/* 구간 설명 */}
      <div className="space-y-2">
        {TIERS.map((tier) => {
          const isCurrent = currentTier.tier === tier.tier
          return (
            <div key={tier.tier} className={`rounded-xl border p-3 transition-all ${tier.border} ${isCurrent ? `${tier.bg} ring-1 ring-white/10` : 'bg-gray-800/20 opacity-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Emoji char={tier.icon} size={14} />
                <span className={`text-xs font-bold ${isCurrent ? tier.text : 'text-gray-500'}`}>{tier.label} ({tier.min}~{tier.max})</span>
                {isCurrent && <span className="text-[10px] bg-white/10 text-white/70 px-1.5 py-0.5 rounded-full">현재</span>}
              </div>
              <p className={`text-xs leading-relaxed ${isCurrent ? 'text-gray-300' : 'text-gray-600'}`}>{tier.desc}</p>
              {tier.slipInfo && isCurrent && (
                <div className="mt-2 text-[10px] text-red-400 bg-red-950/30 rounded-lg px-2 py-1">{tier.slipInfo}</div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-xs text-gray-400 py-1.5 border-b border-gray-800/40">
      <span className="text-gray-300 font-semibold">{label}:</span> {value}
    </div>
  )
}

function LockedRow({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="text-xs text-gray-600 py-1.5 border-b border-gray-800/40">
      <span className="font-semibold">{label}:</span> <Emoji char="🔒" size={12} /> <span className="text-gray-700">{hint}</span>
    </div>
  )
}

function _getEmotionLabel(phase: string) {
  const map: Record<string, string> = {
    defensive: '방어적 — 신중하게 말을 고르고 있습니다',
    confident: '자신감 — 자기 주장에 확신을 가지고 있습니다',
    shaken: '동요 — 흔들리고 있지만 아직 부정하고 있습니다',
    angry: '격앙 — 감정이 격해져 있습니다',
    resigned: '체념 — 더 이상 숨기려 하지 않습니다',
  }
  return map[phase] ?? phase
}

function getLieStateLabel(state: string) {
  const map: Record<string, string> = {
    S0: '방어', S1: '동요', S2: '변명', S3: '궁지', S4: '한계', S5: '고백',
  }
  return map[state] ?? state
}
