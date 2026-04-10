import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { resetFatigueForDossier } from '../../../engine/questionFatigueEngine'
import { getContradictionEvent, getInterjectionEvent, getOutburstEvent } from '../../../engine/v3GameLoopLoader'
import { resolveInterjectionV2 } from '../../../hooks/useActionDispatch'
import { useGameStore, useStore } from '../../../store/useGameStore'
import type { TruthJudgment } from '../../../types/discovery'

type Tone = 'gold' | 'blue' | 'red' | 'green' | 'neutral'

const ROUTE_LABELS: Record<string, string> = {
  evidence: '증거로 새 쟁점이 드러났습니다.',
  truth_confrontation: '진실 공방에서 새 쟁점이 튀어나왔습니다.',
  witness: '증인 진술이 다른 갈래를 열었습니다.',
  lie_collapse: '거짓 붕괴로 숨은 쟁점이 surfaced 됐습니다.',
  emotional_slip: '감정 실수로 숨은 쟁점이 드러났습니다.',
}

const JUDGMENT_OPTIONS: { value: TruthJudgment; label: string; description: string }[] = [
  { value: 'believe_a', label: 'A의 주장이 더 설득력 있습니다.', description: 'A 쪽 진술과 증거가 더 탄탄합니다.' },
  { value: 'believe_b', label: 'B의 주장이 더 설득력 있습니다.', description: 'B 쪽 진술과 증거가 더 탄탄합니다.' },
  { value: 'both_partial', label: '양쪽 모두 일부만 사실입니다.', description: '서로의 주장에 각자 맞는 부분과 과장이 섞여 있습니다.' },
  { value: 'undetermined', label: '아직 보류하겠습니다.', description: '판단을 고정하기 전에 추가 자료가 더 필요합니다.' },
]

function OverlayShell({
  title,
  subtitle,
  tone,
  children,
}: {
  title: string
  subtitle?: string
  tone: Tone
  children: ReactNode
}) {
  return (
    <div className="pc-discovery-overlay">
      <div className={`pc-discovery-card tone-${tone}`}>
        <div className="pc-discovery-card__header">
          {subtitle ? <div className="pc-discovery-card__subtitle">{subtitle}</div> : null}
          <div className="pc-discovery-card__title">{title}</div>
        </div>
        {children}
      </div>
    </div>
  )
}

function ActionRow({ children }: { children: ReactNode }) {
  return <div className="pc-discovery-card__actions">{children}</div>
}

function ActionButton({
  children,
  tone = 'neutral',
  onClick,
  disabled,
}: {
  children: ReactNode
  tone?: Tone
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      className={`pc-discovery-card__action tone-${tone}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function JudgmentConflictPanel() {
  const discovery = useStore((s) => s.discovery)
  const setPendingConflict = useStore((s) => s.setPendingConflict)
  const reviseJudgment = useStore((s) => s.reviseJudgment)
  const turnCount = useStore((s) => s.turnCount)
  const caseData = useStore((s) => s.caseData)
  const event = discovery.pendingConflict

  if (!event || !caseData) {
    return null
  }

  const dispute = caseData.disputes.find((item) => item.id === event.disputeId)
  const partyAName = caseData.duo.partyA.name
  const partyBName = caseData.duo.partyB.name
  const labels: Record<TruthJudgment, string> = {
    believe_a: `${partyAName} 쪽 주장`,
    believe_b: `${partyBName} 쪽 주장`,
    both_partial: '양측 모두 일부 사실',
    undetermined: '판단 보류',
  }

  const handleRevise = () => {
    let nextJudgment: TruthJudgment = 'both_partial'
    if (event.currentJudgment === 'believe_a') nextJudgment = 'believe_b'
    else if (event.currentJudgment === 'believe_b') nextJudgment = 'believe_a'
    reviseJudgment(event.disputeId, nextJudgment, turnCount)
  }

  return (
    <OverlayShell title="판단 충돌" subtitle={dispute?.name ?? event.disputeId} tone="gold">
      <div className="pc-discovery-card__body">
        <div className="pc-discovery-card__block">
          <strong>기존 판단</strong>
          <p>{labels[event.currentJudgment]}</p>
        </div>
        <div className="pc-discovery-card__block">
          <strong>새 충돌 정보</strong>
          <p>{event.conflictingInfo}</p>
        </div>
      </div>
      <ActionRow>
        <ActionButton onClick={() => setPendingConflict(null)}>현재 판단 유지</ActionButton>
        <ActionButton onClick={handleRevise} tone="gold">새 정보 기준으로 수정</ActionButton>
      </ActionRow>
    </OverlayShell>
  )
}

function TruthConfrontationPanel() {
  const discovery = useStore((s) => s.discovery)
  const submitJudgment = useStore((s) => s.submitJudgment)
  const setPendingConfrontation = useStore((s) => s.setPendingConfrontation)
  const turnCount = useStore((s) => s.turnCount)
  const caseData = useStore((s) => s.caseData)
  const event = discovery.pendingConfrontation
  const [selected, setSelected] = useState<TruthJudgment | null>(null)

  useEffect(() => {
    setSelected(null)
  }, [event?.disputeId])

  if (!event || !caseData) {
    return null
  }

  const dispute = caseData.disputes.find((item) => item.id === event.disputeId)
  const partyAName = caseData.duo.partyA.name
  const partyBName = caseData.duo.partyB.name

  return (
    <OverlayShell title="진실 공방" subtitle={dispute?.name ?? event.disputeId} tone="gold">
      <div className="pc-discovery-card__body">
        <div className="pc-discovery-card__claims">
          <div className="pc-discovery-card__claim party-a">
            <strong>{partyAName}</strong>
            <p>{event.claimA.summary}</p>
          </div>
          <div className="pc-discovery-card__claim party-b">
            <strong>{partyBName}</strong>
            <p>{event.claimB.summary}</p>
          </div>
        </div>
        <div className="pc-discovery-card__option-list">
          {JUDGMENT_OPTIONS.map((option) => (
            <button
              className={`pc-discovery-card__option${selected === option.value ? ' is-selected' : ''}`}
              key={option.value}
              onClick={() => setSelected(option.value)}
              type="button"
            >
              <strong>{option.label.replace('A', partyAName).replace('B', partyBName)}</strong>
              <span>{option.description}</span>
            </button>
          ))}
        </div>
      </div>
      <ActionRow>
        <ActionButton onClick={() => setPendingConfrontation(null)}>지금은 보류</ActionButton>
        <ActionButton
          disabled={!selected}
          onClick={() => selected && submitJudgment(event.disputeId, selected, turnCount)}
          tone="gold"
        >
          판단 확정
        </ActionButton>
      </ActionRow>
    </OverlayShell>
  )
}

function DisputeEmergencePanel() {
  const discovery = useStore((s) => s.discovery)
  const acknowledgeEmergence = useStore((s) => s.acknowledgeEmergence)
  const caseData = useStore((s) => s.caseData)
  const event = discovery.pendingEmergence

  if (!event || !caseData) {
    return null
  }

  const dispute = caseData.disputes.find((item) => item.id === event.disputeId)

  return (
    <OverlayShell
      title="새 쟁점 발견"
      subtitle={ROUTE_LABELS[event.route] ?? '새 단서가 갈래를 바꿨습니다.'}
      tone="gold"
    >
      <div className="pc-discovery-card__body">
        <div className="pc-discovery-card__block">
          <strong>{dispute?.name ?? event.disputeId}</strong>
          <p>{event.description}</p>
        </div>
      </div>
      <ActionRow>
        <ActionButton onClick={() => acknowledgeEmergence(event.disputeId)} tone="gold">
          쟁점 보드에 반영
        </ActionButton>
      </ActionRow>
    </OverlayShell>
  )
}

function EmotionalSlipPanel() {
  const discovery = useStore((s) => s.discovery)
  const addEmotionalSlip = useStore((s) => s.addEmotionalSlip)
  const setPendingSlip = useStore((s) => s.setPendingSlip)
  const caseData = useStore((s) => s.caseData)
  const slip = discovery.pendingSlip

  if (!slip || !caseData) {
    return null
  }

  const partyData = slip.party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const sourceDispute = caseData.disputes.find((item) => item.id === slip.sourceDisputeId)
  const linkedDispute = slip.linkedDisputeId
    ? caseData.disputes.find((item) => item.id === slip.linkedDisputeId)
    : null

  return (
    <OverlayShell title="감정 실수 포착" subtitle={partyData.name} tone="red">
      <div className="pc-discovery-card__body">
        <div className="pc-discovery-card__quote">“{slip.slipText}”</div>
        <div className="pc-discovery-card__meta-list">
          {sourceDispute ? <span>관련 쟁점: {sourceDispute.name}</span> : null}
          {linkedDispute ? <span>연결 쟁점: {linkedDispute.name}</span> : null}
        </div>
      </div>
      <ActionRow>
        <ActionButton onClick={() => setPendingSlip(null)}>지금은 넘긴다</ActionButton>
        <ActionButton onClick={() => addEmotionalSlip(slip)} tone="red">진실 공방에 반영</ActionButton>
      </ActionRow>
    </OverlayShell>
  )
}

function PendingInterjectionPanel() {
  const pendingV2 = useStore((s) => s.pendingInterjectionV2)
  const caseData = useStore((s) => s.caseData)

  if (!pendingV2 || !caseData) {
    return null
  }

  const interruptorName = pendingV2.interruptor === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

  return (
    <OverlayShell title="끼어들기 발생" subtitle={interruptorName} tone="blue">
      <div className="pc-discovery-card__body">
        <div className="pc-discovery-card__quote">“{pendingV2.line}”</div>
      </div>
      <ActionRow>
        <ActionButton onClick={() => resolveInterjectionV2('allow')} tone="blue">
          {pendingV2.choiceLabels[0]}
        </ActionButton>
        <ActionButton onClick={() => resolveInterjectionV2('block')}>
          {pendingV2.choiceLabels[1]}
        </ActionButton>
      </ActionRow>
    </OverlayShell>
  )
}

function GameEventPanel() {
  const pendingEvent = useStore((s) => s.pendingGameEvent)
  const caseData = useStore((s) => s.caseData)
  const addDialogue = useStore((s) => s.addDialogue)
  const changeEmotion = useStore((s) => s.changeEmotion)
  const changeTrust = useStore((s) => s.changeTrust)
  const setPendingGameEvent = useStore((s) => s.setPendingGameEvent)
  const trackMetric = useStore((s) => s.trackMetric)
  const turnCount = useStore((s) => s.turnCount)

  if (!pendingEvent || !caseData) {
    return null
  }

  const caseKey = caseData.caseId.replace(/^case-/, '')
  const disputeName =
    caseData.disputes.find((item) => item.id === pendingEvent.disputeId)?.name
    ?? pendingEvent.disputeId
  const partyName = pendingEvent.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

  if (pendingEvent.type === 'contradiction') {
    const v3Event = pendingEvent.scriptSlot?.textId
      ? getContradictionEvent(caseKey, pendingEvent.scriptSlot.textId)
      : null

    const handlePointOut = () => {
      const state = useGameStore.getState()
      for (const effect of pendingEvent.deferredEffects ?? []) {
        switch (effect.type) {
          case 'lie_advance':
            for (let index = 0; index < effect.steps; index += 1) {
              state.transitionLie(effect.party, effect.disputeId, 'event_contradiction_pointout')
            }
            break
          case 'emotion_spike':
            state.changeEmotion(effect.party, effect.delta)
            break
          case 'block_defense':
            break
        }
      }

      addDialogue({
        speaker: 'judge',
        text: v3Event
          ? `${v3Event.statementA} ${v3Event.statementB} 사이의 모순을 지적합니다.`
          : '진술 사이의 모순을 지적합니다. 해명을 요구합니다.',
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      if (v3Event?.npcReaction) {
        addDialogue({
          speaker: pendingEvent.party,
          text: v3Event.npcReaction,
          relatedDisputes: [pendingEvent.disputeId],
          turn: turnCount,
        })
      }
      addDialogue({
        speaker: 'system',
        text: pendingEvent.severity === 'critical'
          ? '결정적 모순이 드러났습니다. 다음 행동의 압박력이 커집니다.'
          : '모순이 드러났습니다. 다음 질문의 효율이 높아집니다.',
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      setPendingGameEvent(null)
    }

    return (
      <OverlayShell title="모순 감지" subtitle={`${disputeName} · ${partyName}`} tone="gold">
        <div className="pc-discovery-card__body">
          <div className="pc-discovery-card__block">
            <strong>감지된 포인트</strong>
            <p>{v3Event ? `${v3Event.statementA}\n${v3Event.statementB}` : pendingEvent.description}</p>
          </div>
        </div>
        <ActionRow>
          <ActionButton onClick={() => setPendingGameEvent(null)}>지금은 넘긴다</ActionButton>
          <ActionButton onClick={handlePointOut} tone="gold">
            모순을 찌른다
          </ActionButton>
        </ActionRow>
      </OverlayShell>
    )
  }

  if (pendingEvent.type === 'interjection') {
    const v3Event = pendingEvent.scriptSlot?.textId
      ? getInterjectionEvent(caseKey, pendingEvent.scriptSlot.textId)
      : null
    const interjectionText = v3Event?.interjectionLine ?? pendingEvent.description

    const handleAllow = () => {
      addDialogue({
        speaker: pendingEvent.party,
        text: interjectionText,
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      addDialogue({
        speaker: 'judge',
        text: '발언을 허용합니다. 계속 진행하세요.',
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      trackMetric('interjectionAllowed')
      changeTrust(pendingEvent.party === 'a' ? 'b' : 'a', 'trustTowardJudge', -3)
      setPendingGameEvent(null)
    }

    return (
      <OverlayShell title="끼어들기" subtitle={`${partyName} · ${disputeName}`} tone="blue">
        <div className="pc-discovery-card__body">
          <div className="pc-discovery-card__quote">“{interjectionText}”</div>
        </div>
        <ActionRow>
          <ActionButton onClick={() => setPendingGameEvent(null)}>제지한다</ActionButton>
          <ActionButton onClick={handleAllow} tone="blue">
            허용한다
          </ActionButton>
        </ActionRow>
      </OverlayShell>
    )
  }

  if (pendingEvent.type === 'emotional_burst') {
    const v3Event = pendingEvent.scriptSlot?.textId
      ? getOutburstEvent(caseKey, pendingEvent.scriptSlot.textId)
      : null
    const outburstText = v3Event?.outburstLine ?? pendingEvent.description

    const handlePress = () => {
      const state = useGameStore.getState()
      addDialogue({
        speaker: pendingEvent.party,
        text: outburstText,
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      addDialogue({
        speaker: 'judge',
        text: '계속 말해보세요. 지금의 흐름을 더 확인하겠습니다.',
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      changeEmotion(pendingEvent.party, 8)
      const meters = state.questionMeters
      const partyMeter = meters[pendingEvent.party]
      useGameStore.setState({
        questionMeters: {
          ...meters,
          [pendingEvent.party]: { ...partyMeter, leakMeter: Math.min(partyMeter.leakMeter + 10, 100) },
        },
      })
      addDialogue({
        speaker: 'system',
        text: '사실 추궁이나 동기 탐색이 더 잘 먹히는 구간입니다.',
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      setPendingGameEvent(null)
    }

    const handleCalm = () => {
      const state = useGameStore.getState()
      addDialogue({
        speaker: pendingEvent.party,
        text: outburstText,
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      addDialogue({
        speaker: 'judge',
        text: '잠시 진정하고, 사실만 다시 정리해 주세요.',
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      changeTrust(pendingEvent.party, 'trustTowardJudge', 12)
      changeEmotion(pendingEvent.party, -10)
      const meters = state.questionMeters
      const partyMeter = meters[pendingEvent.party]
      useGameStore.setState({
        questionMeters: {
          ...meters,
          [pendingEvent.party]: { ...partyMeter, trustWindow: Math.min(partyMeter.trustWindow + 15, 100) },
        },
      })
      addDialogue({
        speaker: 'system',
        text: '공감 접근의 효율이 높아졌습니다.',
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      setPendingGameEvent(null)
    }

    return (
      <OverlayShell title="감정 폭발" subtitle={`${partyName} · ${disputeName}`} tone="red">
        <div className="pc-discovery-card__body">
          <div className="pc-discovery-card__quote">“{outburstText}”</div>
        </div>
        <ActionRow>
          <ActionButton onClick={handleCalm}>진정시킨다</ActionButton>
          <ActionButton onClick={handlePress} tone="red">
            밀어붙인다
          </ActionButton>
        </ActionRow>
      </OverlayShell>
    )
  }

  return null
}

function PerkChoicePanel() {
  const pendingPerkChoice = useStore((s) => s.pendingPerkChoice)
  const setPendingPerkChoice = useStore((s) => s.setPendingPerkChoice)
  const consumePerkUse = useStore((s) => s.consumePerkUse)
  const addDialogue = useStore((s) => s.addDialogue)
  const turnCount = useStore((s) => s.turnCount)
  const setPendingEvidenceResult = useStore((s) => s.setPendingEvidenceResult)
  const caseData = useStore((s) => s.caseData)

  if (!pendingPerkChoice || !caseData) {
    return null
  }

  if (pendingPerkChoice.type === 'penalty_buffer') {
    const evidence = caseData.evidence.find((item) => item.id === pendingPerkChoice.evidenceId)
    const evidenceName = evidence?.name ?? pendingPerkChoice.evidenceId

    const handleWithdraw = () => {
      consumePerkUse('penaltyBufferUsesRemaining')
      addDialogue({
        speaker: 'judge',
        text: `${evidenceName} 제시는 취소합니다. 다시 구성해서 제시하세요.`,
        relatedDisputes: evidence?.proves ?? [],
        turn: turnCount,
      })
      setPendingEvidenceResult(null)
      setPendingPerkChoice(null)
    }

    const handleReframe = () => {
      consumePerkUse('penaltyBufferUsesRemaining')
      useGameStore.getState().changeEmotion(pendingPerkChoice.target, -4)
      addDialogue({
        speaker: 'system',
        text: `${evidenceName}의 제시 관점을 조정해 패널티를 줄였습니다.`,
        relatedDisputes: evidence?.proves ?? [],
        turn: turnCount,
      })
      setPendingPerkChoice(null)
    }

    return (
      <OverlayShell title="판결 완충" subtitle={evidenceName} tone="gold">
        <div className="pc-discovery-card__body">
          <p>증거 제시가 충분히 먹히지 않았습니다. 완충 스킬로 한 번 수습할 수 있습니다.</p>
        </div>
        <ActionRow>
          <ActionButton onClick={handleWithdraw}>제시를 철회한다</ActionButton>
          <ActionButton onClick={handleReframe} tone="gold">관점을 바꿔 제시한다</ActionButton>
        </ActionRow>
      </OverlayShell>
    )
  }

  if (pendingPerkChoice.type === 'fatigue_extend') {
    const disputeName = caseData.disputes.find((item) => item.id === pendingPerkChoice.disputeId)?.name ?? pendingPerkChoice.disputeId
    const partyName = pendingPerkChoice.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

    const handleAngleSwitch = () => {
      consumePerkUse('angleSwitchOpportunity')
      resetFatigueForDossier(pendingPerkChoice.party, pendingPerkChoice.disputeId)
      addDialogue({
        speaker: 'system',
        text: `${disputeName} 쟁점의 질문 피로도를 초기화했습니다. 다른 각도로 다시 밀 수 있습니다.`,
        relatedDisputes: [pendingPerkChoice.disputeId],
        turn: turnCount,
      })
      setPendingPerkChoice(null)
    }

    return (
      <OverlayShell title="집요함 추가" subtitle={`${partyName} · ${disputeName}`} tone="blue">
        <div className="pc-discovery-card__body">
          <p>같은 쟁점을 너무 오래 밀었습니다. 스킬을 써서 질문 각도를 초기화할 수 있습니다.</p>
        </div>
        <ActionRow>
          <ActionButton onClick={() => setPendingPerkChoice(null)}>지금은 넘긴다</ActionButton>
          <ActionButton onClick={handleAngleSwitch} tone="blue">질문 각도 초기화</ActionButton>
        </ActionRow>
      </OverlayShell>
    )
  }

  return null
}

export default function PCDiscoveryOverlay() {
  const discovery = useStore((s) => s.discovery)
  const pendingInterjectionV2 = useStore((s) => s.pendingInterjectionV2)
  const pendingGameEvent = useStore((s) => s.pendingGameEvent)
  const pendingPerkChoice = useStore((s) => s.pendingPerkChoice)

  const visibleKind = useMemo(() => {
    if (discovery.pendingSlip) return 'slip'
    if (discovery.pendingEmergence) return 'emergence'
    if (discovery.pendingConfrontation) return 'confrontation'
    if (discovery.pendingConflict) return 'conflict'
    if (pendingInterjectionV2) return 'interjection_v2'
    if (pendingGameEvent) return 'game_event'
    if (pendingPerkChoice) return 'perk'
    return null
  }, [
    discovery.pendingConflict,
    discovery.pendingConfrontation,
    discovery.pendingEmergence,
    discovery.pendingSlip,
    pendingGameEvent,
    pendingInterjectionV2,
    pendingPerkChoice,
  ])

  if (visibleKind === 'slip') return <EmotionalSlipPanel />
  if (visibleKind === 'emergence') return <DisputeEmergencePanel />
  if (visibleKind === 'confrontation') return <TruthConfrontationPanel />
  if (visibleKind === 'conflict') return <JudgmentConflictPanel />
  if (visibleKind === 'interjection_v2') return <PendingInterjectionPanel />
  if (visibleKind === 'game_event') return <GameEventPanel />
  if (visibleKind === 'perk') return <PerkChoicePanel />

  return null
}
