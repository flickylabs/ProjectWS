/**
 * Game Event Modal — 게임 이벤트 선택 모달
 * ─────────────────────────────────
 * 모순 감지 / 끼어들기 / 감정 폭발 이벤트 발생 시
 * 플레이어에게 2가지 선택지를 제시하는 모달.
 *
 * pendingGameEvent가 Store에 있으면 자동 표시.
 */

import { useGameStore } from '../../store/useGameStore'
import type { GameEventTrigger } from '../../engine/gameEventTriggerEngine'
import {
  getContradictionEvent,
  getInterjectionEvent,
  getOutburstEvent,
} from '../../engine/v3GameLoopLoader'
import { resolveInterjectionV2 } from '../../hooks/useActionDispatch'

export default function GameEventModal() {
  const pendingEvent = useGameStore(s => s.pendingGameEvent)
  const pendingV2 = useGameStore(s => s.pendingInterjectionV2)
  const caseData = useGameStore(s => s.caseData)

  // V2 끼어들기 선택지 (우선)
  if (pendingV2 && caseData) {
    const interruptorName = pendingV2.interruptor === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
    return (
      <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4">
        <div className="bg-gray-900 border border-gray-700/60 rounded-2xl w-full max-w-sm overflow-hidden animate-fade-in shadow-2xl">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{pendingV2.severity === 'major' ? '💥' : '💬'}</span>
              <h3 className="text-sm font-bold text-gray-200">{interruptorName}의 끼어들기</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">{pendingV2.line}</p>
            <div className="flex gap-2">
              <button
                onClick={() => resolveInterjectionV2('allow')}
                className="flex-1 py-2 px-3 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-semibold hover:bg-blue-600/30 transition-colors"
              >
                {pendingV2.choiceLabels[0]}
              </button>
              <button
                onClick={() => resolveInterjectionV2('block')}
                className="flex-1 py-2 px-3 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-semibold hover:bg-red-600/30 transition-colors"
              >
                {pendingV2.choiceLabels[1]}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!pendingEvent || !caseData) return null

  const caseKey = caseData.caseId?.replace(/^case-/, '') ?? ''
  const partyName = pendingEvent.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700/60 rounded-2xl w-full max-w-sm overflow-hidden animate-fade-in shadow-2xl">
        {pendingEvent.type === 'contradiction' && (
          <ContradictionModal event={pendingEvent} caseKey={caseKey} partyName={partyName} />
        )}
        {pendingEvent.type === 'interjection' && (
          <InterjectionModal event={pendingEvent} caseKey={caseKey} partyName={partyName} />
        )}
        {pendingEvent.type === 'emotional_burst' && (
          <EmotionalBurstModal event={pendingEvent} caseKey={caseKey} partyName={partyName} />
        )}
        {pendingEvent.type === 'dispute_emergence' && (
          <DisputeEmergenceModal event={pendingEvent} />
        )}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 모순 감지
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ContradictionModal({ event, caseKey, partyName }: { event: GameEventTrigger; caseKey: string; partyName: string }) {
  const dismiss = useGameStore(s => s.setPendingGameEvent)
  const addDialogue = useGameStore(s => s.addDialogue)
  const turnCount = useGameStore(s => s.turnCount)

  const v3Event = event.scriptSlot?.textId
    ? getContradictionEvent(caseKey, event.scriptSlot.textId)
    : null

  const handlePointOut = () => {
    // 모순 지적 → 효과는 이미 Store에서 적용됨
    addDialogue({
      speaker: 'judge',
      text: v3Event
        ? `${v3Event.statementA} ${v3Event.statementB} — 이 점을 지적합니다.`
        : '진술에 모순이 있습니다. 설명하십시오.',
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    if (v3Event?.npcReaction) {
      addDialogue({
        speaker: event.party,
        text: v3Event.npcReaction,
        relatedDisputes: [event.disputeId],
        turn: turnCount,
      })
    }
    dismiss(null)
  }

  const handleLetGo = () => {
    dismiss(null)
  }

  return (
    <>
      <EventHeader icon="⚡" title="모순 감지" severity={event.severity} color="yellow" />
      <div className="px-4 py-3">
        {v3Event ? (
          <div className="space-y-2">
            <p className="text-xs text-gray-300 leading-relaxed">{v3Event.statementA}</p>
            <p className="text-xs text-amber-400/80 leading-relaxed">{v3Event.statementB}</p>
          </div>
        ) : (
          <p className="text-xs text-gray-300 leading-relaxed">{event.description}</p>
        )}
      </div>
      <div className="flex gap-2 px-4 pb-4">
        <button onClick={handleLetGo}
          className="flex-1 text-xs py-2.5 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700">
          {v3Event?.options.let_go.label ?? '넘어간다'}
        </button>
        <button onClick={handlePointOut}
          className="flex-1 text-xs py-2.5 rounded-xl bg-yellow-700 text-white font-bold hover:bg-yellow-600">
          {v3Event?.options.point_out.label ?? '모순을 지적한다'}
        </button>
      </div>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 끼어들기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function InterjectionModal({ event, caseKey, partyName }: { event: GameEventTrigger; caseKey: string; partyName: string }) {
  const dismiss = useGameStore(s => s.setPendingGameEvent)
  const addDialogue = useGameStore(s => s.addDialogue)
  const changeTrust = useGameStore(s => s.changeTrust)
  const turnCount = useGameStore(s => s.turnCount)
  const trackMetric = useGameStore(s => s.trackMetric)

  const v3Event = event.scriptSlot?.textId
    ? getInterjectionEvent(caseKey, event.scriptSlot.textId)
    : null

  const interjectionText = v3Event?.interjectionLine ?? event.description

  const handleAllow = () => {
    addDialogue({
      speaker: event.party,
      text: interjectionText,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    addDialogue({
      speaker: 'judge',
      text: '발언을 허용합니다.',
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    trackMetric('interjectionAllowed')
    // 권위 감소
    changeTrust(event.party === 'a' ? 'b' : 'a', 'trustTowardJudge', -3)
    dismiss(null)
  }

  const handleBlock = () => {
    addDialogue({
      speaker: 'judge',
      text: '발언을 제지합니다. 차례를 기다리십시오.',
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    dismiss(null)
  }

  return (
    <>
      <EventHeader icon="🗣️" title={`${partyName} 끼어들기`} severity={event.severity} color="orange" />
      <div className="px-4 py-3">
        <div className="bg-gray-800/60 border border-gray-700/30 rounded-lg px-3 py-2">
          <p className="text-xs text-gray-200 leading-relaxed italic">"{interjectionText}"</p>
        </div>
      </div>
      <div className="flex gap-2 px-4 pb-4">
        <button onClick={handleBlock}
          className="flex-1 text-xs py-2.5 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700">
          {v3Event?.options.block.label ?? '제지한다'}
        </button>
        <button onClick={handleAllow}
          className="flex-1 text-xs py-2.5 rounded-xl bg-orange-700 text-white font-bold hover:bg-orange-600">
          {v3Event?.options.allow.label ?? '허용한다'}
        </button>
      </div>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 감정 폭발
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function EmotionalBurstModal({ event, caseKey, partyName }: { event: GameEventTrigger; caseKey: string; partyName: string }) {
  const dismiss = useGameStore(s => s.setPendingGameEvent)
  const addDialogue = useGameStore(s => s.addDialogue)
  const changeTrust = useGameStore(s => s.changeTrust)
  const changeEmotion = useGameStore(s => s.changeEmotion)
  const turnCount = useGameStore(s => s.turnCount)

  const v3Event = event.scriptSlot?.textId
    ? getOutburstEvent(caseKey, event.scriptSlot.textId)
    : null

  const outburstText = v3Event?.outburstLine ?? event.description

  const handlePress = () => {
    addDialogue({
      speaker: event.party,
      text: outburstText,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    addDialogue({
      speaker: 'judge',
      text: '계속하십시오. 이 자리에서 사실대로 말하셔야 합니다.',
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    // 더 압박: 감정 상승 + 누설 위험 증가
    changeEmotion(event.party, 8)
    dismiss(null)
  }

  const handleCalm = () => {
    addDialogue({
      speaker: event.party,
      text: outburstText,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    addDialogue({
      speaker: 'judge',
      text: '잠시 진정하시고, 준비되면 말씀하십시오.',
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    // 진정: 신뢰 상승 + 감정 하락
    changeTrust(event.party, 'trustTowardJudge', 12)
    changeEmotion(event.party, -10)
    dismiss(null)
  }

  return (
    <>
      <EventHeader icon="🔥" title={`${partyName} 감정 폭발`} severity={event.severity} color="red" />
      <div className="px-4 py-3">
        <div className="bg-red-950/30 border border-red-800/30 rounded-lg px-3 py-2">
          <p className="text-xs text-red-200 leading-relaxed italic">"{outburstText}"</p>
        </div>
      </div>
      <div className="flex gap-2 px-4 pb-4">
        <button onClick={handleCalm}
          className="flex-1 text-xs py-2.5 rounded-xl bg-blue-900/60 text-blue-300 font-semibold hover:bg-blue-900/80">
          {v3Event?.options.calm.label ?? '진정시킨다'}
        </button>
        <button onClick={handlePress}
          className="flex-1 text-xs py-2.5 rounded-xl bg-red-700 text-white font-bold hover:bg-red-600">
          {v3Event?.options.press.label ?? '더 압박한다'}
        </button>
      </div>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 새 쟁점 출현
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DisputeEmergenceModal({ event }: { event: GameEventTrigger }) {
  const dismiss = useGameStore(s => s.setPendingGameEvent)

  return (
    <>
      <EventHeader icon="💡" title="새 쟁점 출현" severity={event.severity} color="cyan" />
      <div className="px-4 py-3">
        <p className="text-xs text-gray-300 leading-relaxed">{event.description}</p>
      </div>
      <div className="px-4 pb-4">
        <button onClick={() => dismiss(null)}
          className="w-full text-xs py-2.5 rounded-xl bg-cyan-800/60 text-cyan-300 font-semibold hover:bg-cyan-800/80">
          확인
        </button>
      </div>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공통 헤더
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function EventHeader({ icon, title, severity, color }: {
  icon: string
  title: string
  severity: 'minor' | 'major' | 'critical'
  color: 'yellow' | 'orange' | 'red' | 'cyan'
}) {
  const colorMap = {
    yellow: 'from-yellow-900/40 to-gray-900 border-yellow-600/30 text-yellow-400',
    orange: 'from-orange-900/40 to-gray-900 border-orange-600/30 text-orange-400',
    red: 'from-red-900/40 to-gray-900 border-red-600/30 text-red-400',
    cyan: 'from-cyan-900/40 to-gray-900 border-cyan-600/30 text-cyan-400',
  }

  const severityLabels = { minor: '', major: '!', critical: '!!' }

  return (
    <div className={`bg-gradient-to-b ${colorMap[color]} border-b px-4 py-3`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className={`text-sm font-bold ${colorMap[color].split(' ').pop()}`}>{title}</span>
        {severity !== 'minor' && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-600/30 text-red-400 font-bold ml-auto">
            {severityLabels[severity]}
          </span>
        )}
      </div>
    </div>
  )
}
