import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useFocusTrap } from '../../../hooks/useFocusTrap'
import { resetFatigueForDossier } from '../../../engine/questionFatigueEngine'
import { getContradictionEvent, getInterjectionEvent, getOutburstEvent } from '../../../engine/v3GameLoopLoader'
import { applyWitnessSlot } from '../../../hooks/useActionDispatch'
import { applyInterjectionBlockResentment } from '../../../engine/interjectionV2'
import { recordInterjectionChoice } from '../../../engine/phase3LogCollector'
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

function isNarrativeReaction(text: string | undefined): boolean {
  if (!text) return false
  return /(부딪힌다|드러난다|흔들린다|뒤집힌다|갈라진다|맞선다|올라오자|설명이|해석이|책임의 방향)/.test(text)
}

function buildContradictionFallbackLine(lieState: string): string {
  if (lieState >= 'S3') return '...그건... 상황이 복잡했습니다. 제가 처음에 말씀드린 것과 다른 부분이 있었습니다.'
  if (lieState >= 'S2') return '재판관님, 제 기억이 혼란스러웠던 것 같습니다. 다시 정리하겠습니다.'
  return '그건... 제가 말한 것과 다르지 않습니다. 맥락이 다른 것입니다.'
}

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
  const trapRef = useFocusTrap<HTMLDivElement>()
  return (
    <div className="pc-discovery-overlay" role="dialog" aria-modal="true" aria-label={title} ref={trapRef}>
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
          ? `${partyName} 씨, 아까 하신 말씀과 지금 말씀이 다릅니다. 어느 쪽이 맞습니까?`
          : `${partyName} 씨, 방금 답변이 앞선 진술과 맞지 않습니다. 정확히 말씀해 주십시오.`,
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      // NPC 답변 — 스크립트 없으면 lieState 기반 fallback 생성
      const agent = pendingEvent.party === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
      const lie = agent.lieStateMap[pendingEvent.disputeId]?.currentState ?? 'S0'
      const reactionIsNarrative = isNarrativeReaction(v3Event?.npcReaction)
      const npcText = reactionIsNarrative
        ? buildContradictionFallbackLine(lie)
        : v3Event?.npcReaction ?? buildContradictionFallbackLine(lie)
      addDialogue({
        speaker: pendingEvent.party,
        text: npcText,
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      if (reactionIsNarrative && v3Event?.npcReaction) {
        addDialogue({
          speaker: 'system',
          text: v3Event.npcReaction,
          relatedDisputes: [pendingEvent.disputeId],
          turn: turnCount,
        })
      }
      addDialogue({
        speaker: 'system',
        text: pendingEvent.severity === 'critical'
          ? `결정적 모순이 드러났다. ${partyName}의 방어가 크게 흔들린다.`
          : `진술이 엇갈리기 시작했다. 지금 압박하면 효과적이다.`,
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
    // V4: 범용 fallback 대사를 캐릭터+상황 맞춤 대사로 교체
    const finalInterjectionText = v3Event?.interjectionLine
      ? interjectionText
      : pendingEvent.severity === 'major'
        ? `재판관님, 잠깐만요. 저도 할 말이 있습니다.`
        : `재판관님, 지금 하신 말씀은 사실과 다릅니다.`

    const handleAllow = () => {
      addDialogue({
        speaker: pendingEvent.party,
        text: finalInterjectionText,
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      addDialogue({
        speaker: 'judge',
        text: '발언을 허용합니다.',
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      trackMetric('interjectionAllowed')
      trackMetric('counterQuestionUsed')
      recordInterjectionChoice('allow')
      changeTrust(pendingEvent.party === 'a' ? 'b' : 'a', 'trustTowardJudge', -3)
      setPendingGameEvent(null)
    }

    const handleBlock = () => {
      // 제지 시 끼어든 당사자에게 resentment 누적 — NPC 반응 가중치에 반영됨
      applyInterjectionBlockResentment(pendingEvent.party, turnCount)
      recordInterjectionChoice('block')
      addDialogue({
        speaker: 'judge',
        text: `${partyName} 씨, 지금은 발언 순서가 아닙니다. 심문을 계속합니다.`,
        relatedDisputes: [pendingEvent.disputeId],
        turn: turnCount,
      })
      setPendingGameEvent(null)
    }

    return (
      <OverlayShell title="끼어들기" subtitle={`${partyName} · ${disputeName}`} tone="blue">
        <div className="pc-discovery-card__body">
          <div className="pc-discovery-card__quote">“{interjectionText}”</div>
        </div>
        <ActionRow>
          <ActionButton onClick={handleBlock}>제지한다</ActionButton>
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
    // v3 outburstLine(1인칭 대사)가 있으면 당사자 말풍선, 없으면 3인칭 서술 → 시스템 메시지
    const outburstLine = v3Event?.outburstLine
    const outburstText = outburstLine ?? pendingEvent.description
    const emitOutburst = (extraSystemTail: string) => {
      if (outburstLine) {
        addDialogue({
          speaker: pendingEvent.party,
          text: outburstLine,
          relatedDisputes: [pendingEvent.disputeId],
          turn: turnCount,
        })
      } else {
        addDialogue({
          speaker: 'system',
          text: pendingEvent.description,
          relatedDisputes: [pendingEvent.disputeId],
          turn: turnCount,
        })
      }
      if (extraSystemTail) {
        addDialogue({
          speaker: 'system',
          text: extraSystemTail,
          relatedDisputes: [pendingEvent.disputeId],
          turn: turnCount,
        })
      }
    }

    const handlePress = () => {
      const state = useGameStore.getState()
      emitOutburst('')
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
      emitOutburst('')
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
          {outburstLine ? (
            <div className="pc-discovery-card__quote">“{outburstText}”</div>
          ) : (
            <div className="pc-discovery-card__narration">{outburstText}</div>
          )}
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
  const pendingGameEvent = useStore((s) => s.pendingGameEvent)
  const pendingPerkChoice = useStore((s) => s.pendingPerkChoice)
  const pendingWitnessChoice = useStore((s) => s.pendingWitnessChoice)

  const visibleKind = useMemo(() => {
    if (discovery.pendingSlip) return 'slip'
    if (discovery.pendingEmergence) return 'emergence'
    if (discovery.pendingConfrontation) return 'confrontation'
    if (discovery.pendingConflict) return 'conflict'
    if (pendingGameEvent) return 'game_event'
    if (pendingPerkChoice) return 'perk'
    if (pendingWitnessChoice) return 'witness_choice'
    return null
  }, [
    discovery.pendingConflict,
    discovery.pendingConfrontation,
    discovery.pendingEmergence,
    discovery.pendingSlip,
    pendingGameEvent,
    pendingPerkChoice,
    pendingWitnessChoice,
  ])

  if (visibleKind === 'slip') return <EmotionalSlipPanel />
  if (visibleKind === 'emergence') return <DisputeEmergencePanel />
  if (visibleKind === 'confrontation') return <TruthConfrontationPanel />
  if (visibleKind === 'conflict') return <JudgmentConflictPanel />
  if (visibleKind === 'game_event') return <GameEventPanel />
  if (visibleKind === 'perk') return <PerkChoicePanel />
  if (visibleKind === 'witness_choice') return <WitnessChoicePanel />

  return null
}

/** 증인 다층 증언 주제 선택 패널 */
function WitnessChoicePanel() {
  const pending = useStore((s) => s.pendingWitnessChoice)
  if (!pending) return null

  return (
    <OverlayShell
      title={pending.isResummon ? '추가 질문' : '증인 심문'}
      subtitle={pending.witnessName}
      tone="green"
    >
      <div className="pc-discovery-card__body">
        <p style={{ fontSize: 13, color: '#8c8fa0', marginBottom: 12 }}>
          {pending.isResummon
            ? `${pending.witnessName}에게 추가로 무엇을 물어보시겠습니까?`
            : `${pending.witnessName}에게 어떤 질문을 하시겠습니까?`}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 16px 16px' }}>
        {pending.slots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => {
              applyWitnessSlot(slot.id)
            }}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '14px 18px', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              color: '#e0ddd6', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(92,201,122,0.3)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(92,201,122,0.06)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
            }}
            type="button"
          >
            {slot.topic}
          </button>
        ))}
      </div>
    </OverlayShell>
  )
}
