import { useState, useMemo } from 'react'
import type { QuestionType, PartyId } from '../../types'
import type { FreeQuestionResult } from '../../engine/llmFreeQuestion'
import { useValidActions } from '../../hooks/useValidActions'
import { useGameStore, useStore } from '../../store/useGameStore'
import { computeEffectiveness } from '../../engine/questionEffectEngine'
import { getStalemateStatus, getSessionFatigueState } from '../../engine/questionFatigueEngine'
import { getEmotionTier } from '../../engine/discoveryEngine'
import FreeQuestionInput from './FreeQuestionInput'
import Emoji from '../common/Emoji'

export interface QuestionToggles {
  confidential: { unlocked: boolean; on: boolean }
  evasionReading: { unlocked: boolean; on: boolean; affordable: boolean }
}

interface Props {
  target: PartyId | null
  onSelect: (type: QuestionType, disputeId: string) => void
  llmMode?: boolean
  onFreeResult?: (result: FreeQuestionResult, target: PartyId, text: string) => void
  toggles?: QuestionToggles
  onToggle?: (key: 'confidential' | 'evasionReading') => void
}

const CARD_COLORS: Record<string, { bg: string; border: string; glow: string }> = {
  fact_pursuit: { bg: 'from-blue-950/60 to-blue-900/20', border: 'border-blue-700/40', glow: 'shadow-blue-500/10' },
  motive_search: { bg: 'from-purple-950/60 to-purple-900/20', border: 'border-purple-700/40', glow: 'shadow-purple-500/10' },
  empathy_approach: { bg: 'from-pink-950/60 to-pink-900/20', border: 'border-pink-700/40', glow: 'shadow-pink-500/10' },
  relation_buffer: { bg: 'from-teal-950/60 to-teal-900/20', border: 'border-teal-700/40', glow: 'shadow-teal-500/10' },
  private_check: { bg: 'from-emerald-950/60 to-emerald-900/20', border: 'border-emerald-700/40', glow: 'shadow-emerald-500/10' },
  free_question: { bg: 'from-amber-950/60 to-amber-900/20', border: 'border-amber-700/40', glow: 'shadow-amber-500/10' },
}

const CARD_EFFECTS: Record<string, string> = {
  fact_pursuit: '사실을 직접 추궁합니다',
  motive_search: '행동의 진짜 이유를 탐색합니다',
  empathy_approach: '공감으로 신뢰를 얻습니다',
  relation_buffer: '관계 완충 질문으로 신뢰를 선확보합니다',
  private_check: '비공개로 사실을 확인합니다 (방어 반응 없음)',
  free_question: '자유롭게 질문합니다',
}

const CARD_METER_HINTS: Record<string, { meter: string; color: string }> = {
  fact_pursuit: { meter: '모순 토큰 ↑', color: 'text-yellow-500/60' },
  motive_search: { meter: '누설 미터 ↑', color: 'text-orange-500/60' },
  empathy_approach: { meter: '신뢰 창구 ↑', color: 'text-blue-400/60' },
  relation_buffer: { meter: '신뢰 창구 ↑↑', color: 'text-teal-400/60' },
  private_check: { meter: '솔직한 답변 (상태 변화 없음)', color: 'text-emerald-400/60' },
  free_question: { meter: '', color: '' },
}

type CardType = QuestionType | 'free_question' | 'relation_buffer' | 'private_check'

export default function QuestionSelector({ target, onSelect, llmMode, onFreeResult, toggles, onToggle }: Props) {
  const { questions } = useValidActions(target)
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null)
  const relationBufferAvailable = useStore(s => s.activePerks.relationBufferQuestionAvailable > 0)
  const privateCheckAvailable = useStore(s => s.activePerks.privateCheckAvailable > 0)

  // ── 효과 칩 + 교착 경고용 상태 ──
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const archetypeA = useStore((s) => s.archetypeA)
  const archetypeB = useStore((s) => s.archetypeB)
  const questionMeters = useStore((s) => s.questionMeters)

  // target의 가장 방어적인 dispute 기준으로 보수적 추정
  const effectivenessMap = useMemo(() => {
    if (!target) return {} as Record<string, ReturnType<typeof computeEffectiveness>>
    const agent = target === 'a' ? agentA : agentB
    const archetype = target === 'a' ? archetypeA : archetypeB
    const meters = questionMeters[target]
    const emotionTier = getEmotionTier(agent.emotionalState.internalValue).tier

    // 가장 방어적인(= 가장 낮은) lieState를 찾아 보수적 추정
    let worstLieState = 'S5'
    for (const entry of Object.values(agent.lieStateMap)) {
      const rank = parseInt(entry.currentState.replace('S', ''), 10)
      const worstRank = parseInt(worstLieState.replace('S', ''), 10)
      if (rank < worstRank) worstLieState = entry.currentState
    }

    const types = ['fact_pursuit', 'motive_search', 'empathy_approach'] as const
    const map: Record<string, ReturnType<typeof computeEffectiveness>> = {}
    for (const t of types) {
      map[t] = computeEffectiveness(t, worstLieState, emotionTier, archetype, meters.contradictionTokens, meters.trustWindow)
    }
    return map
  }, [target, agentA, agentB, archetypeA, archetypeB, questionMeters])

  if (!target) return null

  // 관계 완충 카드 선택 시 — empathy_approach로 매핑하되 퍼크 사용 처리
  if (selectedCard === 'relation_buffer') {
    const empathyQ = questions.find(q => q.type === 'empathy_approach')
    if (!empathyQ) { setSelectedCard(null); return null }

    const handleRelationBuffer = (disputeId: string) => {
      // 퍼크 사용 차감
      const store = useGameStore.getState()
      store.consumePerkUse('relationBufferQuestionAvailable')

      // 선제 신뢰 보너스 적용
      store.changeTrust(target!, 'trustTowardJudge', 15)
      const meters = store.questionMeters
      const partyMeter = meters[target!]
      useGameStore.setState({
        questionMeters: {
          ...meters,
          [target!]: { ...partyMeter, trustWindow: Math.min(partyMeter.trustWindow + 20, 100) },
        },
      })
      store.addDialogue({
        speaker: 'system',
        text: '[신뢰의 기반] 관계 완충 질문으로 선제적 신뢰를 확보했습니다.',
        relatedDisputes: [disputeId],
        turn: store.turnCount,
      })

      // empathy_approach로 실행
      onSelect('empathy_approach', disputeId)
      setSelectedCard(null)
    }

    return (
      <div className="space-y-2 animate-fade-in">
        <button onClick={() => setSelectedCard(null)}
          className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1">
          ← 다른 질문 선택
        </button>
        <div className="text-xs text-gray-400 mb-1">
          <Emoji char="&#x1F91D;" size={14} /> <span className="font-semibold">관계 완충</span> — 어떤 쟁점에 대해?
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {empathyQ.disputes.map((d) => (
            <button key={d.id}
              onClick={() => { if (d.enabled) handleRelationBuffer(d.id) }}
              disabled={!d.enabled}
              className={`text-left px-3 py-2.5 rounded-xl border transition-all active:scale-95 ${
                d.enabled
                  ? 'border-teal-600 bg-teal-950/30 hover:border-teal-500 hover:bg-teal-900/40 text-gray-200'
                  : 'border-gray-800/30 bg-gray-900/20 text-gray-700 cursor-not-allowed'
              }`}
            >
              <span className="text-sm">{d.name}</span>
              {!d.enabled && d.reason && <span className="text-xs text-gray-700 block mt-0.5">{d.reason}</span>}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // 비공개 확인권 카드 선택 시 — fact_pursuit로 매핑하되 lie state 변화 없음
  if (selectedCard === 'private_check') {
    const factQ = questions.find(q => q.type === 'fact_pursuit')
    if (!factQ) { setSelectedCard(null); return null }

    const handlePrivateCheck = (disputeId: string) => {
      const store = useGameStore.getState()
      store.consumePerkUse('privateCheckAvailable')

      store.addDialogue({
        speaker: 'system',
        text: '[비공개 확인권] 재판관 전용 확인 질문 — 솔직한 답변을 받되, 거짓말 상태에 영향을 주지 않습니다.',
        relatedDisputes: [disputeId],
        turn: store.turnCount,
      })

      // fact_pursuit로 실행 (useActionDispatch에서 privateCheck 플래그로 lie state 변화 억제)
      onSelect('fact_pursuit', disputeId)
      setSelectedCard(null)
    }

    return (
      <div className="space-y-2 animate-fade-in">
        <button onClick={() => setSelectedCard(null)}
          className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1">
          ← 다른 질문 선택
        </button>
        <div className="text-xs text-gray-400 mb-1">
          <Emoji char="&#x1F50F;" size={14} /> <span className="font-semibold">비공개 확인</span> — 어떤 쟁점에 대해?
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {factQ.disputes.map((d) => (
            <button key={d.id}
              onClick={() => { if (d.enabled) handlePrivateCheck(d.id) }}
              disabled={!d.enabled}
              className={`text-left px-3 py-2.5 rounded-xl border transition-all active:scale-95 ${
                d.enabled
                  ? 'border-emerald-600 bg-emerald-950/30 hover:border-emerald-500 hover:bg-emerald-900/40 text-gray-200'
                  : 'border-gray-800/30 bg-gray-900/20 text-gray-700 cursor-not-allowed'
              }`}
            >
              <span className="text-sm">{d.name}</span>
              {!d.enabled && d.reason && <span className="text-xs text-gray-700 block mt-0.5">{d.reason}</span>}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // 자유 질문 카드 선택 시
  if (selectedCard === 'free_question' && onFreeResult) {
    return (
      <div className="space-y-2 animate-fade-in">
        <button onClick={() => setSelectedCard(null)}
          className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1">
          ← 다른 질문 선택
        </button>
        <FreeQuestionInput target={target} onResult={onFreeResult} />
      </div>
    )
  }

  // 정형 질문 카드 선택 → 쟁점 선택 2단계
  if (selectedCard && selectedCard !== 'free_question') {
    const q = questions.find(q => q.type === selectedCard)
    if (!q) return null

    return (
      <div className="space-y-2 animate-fade-in">
        <button onClick={() => setSelectedCard(null)}
          className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1">
          ← 다른 질문 선택
        </button>
        <div className="text-xs text-gray-400 mb-1">
          <Emoji char={q.icon} size={14} /> <span className="font-semibold">{q.label}</span> — 어떤 쟁점에 대해?
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {q.disputes.map((d) => {
            const stalemateStatus = target ? getStalemateStatus(getSessionFatigueState(), target, d.id) : { level: 'normal' as const, maxStreak: 0 }
            return (
            <button key={d.id}
              onClick={() => { if (d.enabled) { onSelect(q.type, d.id) ; setSelectedCard(null) } }}
              disabled={!d.enabled}
              className={`text-left px-3 py-2.5 rounded-xl border transition-all active:scale-95 ${
                d.enabled
                  ? 'border-gray-600 bg-gray-800/60 hover:border-amber-600 hover:bg-amber-950/30 text-gray-200'
                  : 'border-gray-800/30 bg-gray-900/20 text-gray-700 cursor-not-allowed'
              }`}
            >
              <span className="text-sm">{d.name}</span>
              {!d.enabled && d.reason && <span className="text-xs text-gray-700 block mt-0.5">{d.reason}</span>}
              {d.enabled && stalemateStatus.level === 'warning' && (
                <span className="text-[10px] text-yellow-500 block mt-0.5">{'\u26A0'} 답변이 짧아지고 있습니다</span>
              )}
              {d.enabled && stalemateStatus.level === 'stalemate' && (
                <span className="text-[10px] text-red-400 block mt-0.5">{'\uD83D\uDEAB'} 교착 — 다른 접근을 시도하세요</span>
              )}
            </button>
            )
          })}
        </div>
      </div>
    )
  }

  // 토글 스킬이 하나라도 해금되었는지
  const hasAnyToggle = toggles && (toggles.confidential.unlocked || toggles.evasionReading.unlocked)

  // 카드 그리드 (3종 + 자유 질문)
  return (
    <div className="space-y-2 animate-fade-in">
      {/* ── 토글 스킬 ── */}
      {hasAnyToggle && (
        <div className="flex gap-1.5 mb-1">
          {toggles!.evasionReading.unlocked && (
            <button
              onClick={() => toggles!.evasionReading.affordable && onToggle?.('evasionReading')}
              disabled={!toggles!.evasionReading.affordable}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
                toggles!.evasionReading.on
                  ? 'bg-cyan-900/60 border-cyan-600/60 text-cyan-300 ring-1 ring-cyan-500/30'
                  : toggles!.evasionReading.affordable
                    ? 'bg-gray-800/40 border-gray-700/40 text-gray-400 hover:border-cyan-700'
                    : 'bg-gray-900/20 border-gray-800/20 text-gray-600 opacity-50'
              }`}
            >
              <Emoji char="🔍" size={12} /> 회피 판독 {toggles!.evasionReading.on ? 'ON' : ''} <span className="text-gray-600"><Emoji char="⚡" size={12} />1</span>
            </button>
          )}
          {toggles!.confidential.unlocked && (
            <button
              onClick={() => onToggle?.('confidential')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
                toggles!.confidential.on
                  ? 'bg-emerald-900/60 border-emerald-600/60 text-emerald-300 ring-1 ring-emerald-500/30'
                  : 'bg-gray-800/40 border-gray-700/40 text-gray-400 hover:border-emerald-700'
              }`}
            >
              <Emoji char="🔒" size={12} /> 비공개 {toggles!.confidential.on ? 'ON' : ''}
            </button>
          )}
        </div>
      )}

      {/* ── 질문 카드 그리드 ── */}
      <div className="grid grid-cols-2 gap-2">
        {questions.map((q) => {
          const colors = CARD_COLORS[q.type] ?? CARD_COLORS.fact_pursuit
          const effect = CARD_EFFECTS[q.type] ?? ''
          return (
            <button key={q.type}
              onClick={() => q.anyEnabled && setSelectedCard(q.type)}
              disabled={!q.anyEnabled}
              className={`text-left rounded-xl border p-3 bg-gradient-to-br transition-all active:scale-95 ${
                q.anyEnabled
                  ? `${colors.border} ${colors.bg} hover:shadow-lg ${colors.glow} hover:scale-[1.02]`
                  : 'border-gray-800/30 from-gray-900/30 to-gray-950/30 opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="text-xl mb-1"><Emoji char={q.icon} size={20} /></div>
              <div className={`text-xs font-bold ${q.anyEnabled ? 'text-gray-200' : 'text-gray-600'}`}>{q.label}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-snug">{effect}</div>
              {CARD_METER_HINTS[q.type]?.meter && (
                <div className={`text-[9px] mt-1 font-semibold ${CARD_METER_HINTS[q.type].color}`}>
                  {CARD_METER_HINTS[q.type].meter}
                </div>
              )}
              {q.anyEnabled && effectivenessMap[q.type]?.level === 'strong' && (
                <span className="text-[10px] text-emerald-400 mt-1 block">{'\u25B2'} {effectivenessMap[q.type].hint}</span>
              )}
              {q.anyEnabled && effectivenessMap[q.type]?.level === 'weak' && (
                <span className="text-[10px] text-red-400 mt-1 block">{'\u25BC'} {effectivenessMap[q.type].hint}</span>
              )}
            </button>
          )
        })}
        {/* 관계 완충 카드 — trust_start 퍼크 활성 시 1회 한정 */}
        {relationBufferAvailable && (
          <button
            onClick={() => setSelectedCard('relation_buffer')}
            className={`text-left rounded-xl border p-3 bg-gradient-to-br transition-all active:scale-95 ${CARD_COLORS.relation_buffer.border} ${CARD_COLORS.relation_buffer.bg} hover:shadow-lg ${CARD_COLORS.relation_buffer.glow} hover:scale-[1.02] ring-1 ring-teal-500/20`}
          >
            <div className="text-xl mb-1"><Emoji char="&#x1F91D;" size={20} /></div>
            <div className="text-xs font-bold text-teal-200">관계 완충</div>
            <div className="text-xs text-gray-500 mt-0.5 leading-snug">{CARD_EFFECTS.relation_buffer}</div>
            <div className={`text-[9px] mt-1 font-semibold ${CARD_METER_HINTS.relation_buffer.color}`}>
              {CARD_METER_HINTS.relation_buffer.meter}
            </div>
            <span className="text-[10px] text-teal-400 mt-1 block">퍼크 1회</span>
          </button>
        )}
        {/* 비공개 확인권 카드 — private_check 퍼크 활성 시 1회 한정 */}
        {privateCheckAvailable && (
          <button
            onClick={() => setSelectedCard('private_check')}
            className={`text-left rounded-xl border p-3 bg-gradient-to-br transition-all active:scale-95 ${CARD_COLORS.private_check.border} ${CARD_COLORS.private_check.bg} hover:shadow-lg ${CARD_COLORS.private_check.glow} hover:scale-[1.02] ring-1 ring-emerald-500/20`}
          >
            <div className="text-xl mb-1"><Emoji char="&#x1F50F;" size={20} /></div>
            <div className="text-xs font-bold text-emerald-200">비공개 확인</div>
            <div className="text-xs text-gray-500 mt-0.5 leading-snug">{CARD_EFFECTS.private_check}</div>
            <div className={`text-[9px] mt-1 font-semibold ${CARD_METER_HINTS.private_check.color}`}>
              {CARD_METER_HINTS.private_check.meter}
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">퍼크 1회</span>
          </button>
        )}
        {/* 자유 질문 카드 — V3 게임 루프에서는 비활성 (Blueprint 우회 방지) */}
        {false && llmMode && onFreeResult && (
          <button
            onClick={() => setSelectedCard('free_question')}
            className={`text-left rounded-xl border p-3 bg-gradient-to-br transition-all active:scale-95 ${CARD_COLORS.free_question.border} ${CARD_COLORS.free_question.bg} hover:shadow-lg ${CARD_COLORS.free_question.glow} hover:scale-[1.02]`}
          >
            <div className="text-xl mb-1"><Emoji char="✍️" size={20} /></div>
            <div className="text-xs font-bold text-gray-200">직접 입력</div>
            <div className="text-xs text-gray-500 mt-0.5 leading-snug">{CARD_EFFECTS.free_question}</div>
          </button>
        )}
      </div>
    </div>
  )
}
