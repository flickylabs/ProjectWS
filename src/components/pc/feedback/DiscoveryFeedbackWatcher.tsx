import { useEffect, useRef } from 'react'
import { useStore, useGameStore } from '../../../store/useGameStore'
import { resetFatigueForDossier } from '../../../engine/questionFatigueEngine'
import { getContradictionEvent, getInterjectionEvent, getOutburstEvent } from '../../../engine/v3GameLoopLoader'
import { applyWitnessSlot } from '../../../hooks/useActionDispatch'
import { recordInterjectionChoice } from '../../../engine/phase3LogCollector'
import { stripOutputCodename } from '../../../utils/combinationLabels'
import type { TruthJudgment } from '../../../types/discovery'

/**
 * Discovery 9종 pending 상태를 감시해 통합 피드백 큐로 보내는 Watcher.
 * 기존 PCDiscoveryOverlay 의 각 Panel 을 큐 기반 카드로 치환.
 */

const ROUTE_LABELS: Record<string, string> = {
  evidence: '증거로 새 쟁점이 드러났습니다.',
  truth_confrontation: '진실 공방에서 새 쟁점이 튀어나왔습니다.',
  witness: '증인 진술이 다른 갈래를 열었습니다.',
  lie_collapse: '거짓 붕괴로 숨은 쟁점이 드러났습니다.',
  emotional_slip: '감정 실수로 숨은 쟁점이 드러났습니다.',
}

const JUDGMENT_LABELS: Record<TruthJudgment, string> = {
  believe_a: 'A의 주장이 더 설득력 있습니다',
  believe_b: 'B의 주장이 더 설득력 있습니다',
  both_partial: '양쪽 모두 일부만 사실입니다',
  undetermined: '아직 보류하겠습니다',
}

function isNarrativeReaction(text: string | undefined): boolean {
  if (!text) return false
  return /(부딪힌다|드러난다|흔들린다|뒤집힌다|갈라진다|맞선다|올라오자|설명이|해석이|책임의 방향)/.test(text)
}

function buildContradictionFallbackLine(lieState: string): string {
  if (lieState >= 'S3') return '...그건... 상황이 복잡했습니다. 제가 처음에 말씀드린 것과 다른 부분이 있었습니다.'
  if (lieState >= 'S2') return '재판관님, 제 기억이 혼란스러웠던 것 같습니다. 다시 정리하겠습니다.'
  return '그건... 제가 말한 것과 다르지 않습니다. 맥락이 다른 것입니다.'
}

export default function DiscoveryFeedbackWatcher() {
  const pendingConfrontation = useStore((s) => s.discovery?.pendingConfrontation)
  const pendingConflict      = useStore((s) => s.discovery?.pendingConflict)
  const pendingEmergence     = useStore((s) => s.discovery?.pendingEmergence)
  const pendingSlip          = useStore((s) => s.discovery?.pendingSlip)
  const pendingGameEvent     = useStore((s) => s.pendingGameEvent)
  const pendingPerkChoice    = useStore((s) => s.pendingPerkChoice)
  const pendingWitnessChoice = useStore((s) => s.pendingWitnessChoice)

  // 큐에 이미 넣은 pending id 추적 (중복 방지)
  const enqueuedRef = useRef<Set<string>>(new Set())

  // 진실 공방
  useEffect(() => {
    if (!pendingConfrontation) return
    const key = `confrontation:${pendingConfrontation.disputeId}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const dispute = caseData.disputes.find((d) => d.id === pendingConfrontation.disputeId)
    const partyA = caseData.duo.partyA.name
    const partyB = caseData.duo.partyB.name

    const judgments: TruthJudgment[] = ['believe_a', 'believe_b', 'both_partial', 'undetermined']

    state.enqueueFeedback({
      kind: 'confrontation',
      eyebrow: '진실 공방',
      title: dispute?.name ?? pendingConfrontation.disputeId,
      claims: {
        partyA: { name: partyA, text: pendingConfrontation.claimA.summary },
        partyB: { name: partyB, text: pendingConfrontation.claimB.summary },
      },
      tone: 'gold',
      actionsLayout: 'vertical',
      actions: [
        ...judgments.map((value) => ({
          label: JUDGMENT_LABELS[value].replace('A의', `${partyA}의`).replace('B의', `${partyB}의`),
          tone: 'gold' as const,
          onSelect: () => {
            useGameStore.getState().submitJudgment(pendingConfrontation.disputeId, value, useGameStore.getState().turnCount)
            enqueuedRef.current.delete(key)
          },
        })),
        {
          label: '지금은 보류',
          tone: 'gray',
          onSelect: () => {
            useGameStore.getState().setPendingConfrontation(null)
            enqueuedRef.current.delete(key)
          },
        },
      ],
    })
  }, [pendingConfrontation])

  // 판단 충돌 (양측 contrast + VS)
  useEffect(() => {
    if (!pendingConflict) return
    const key = `conflict:${pendingConflict.disputeId}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const dispute = caseData.disputes.find((d) => d.id === pendingConflict.disputeId)
    const partyA = caseData.duo.partyA.name
    const partyB = caseData.duo.partyB.name

    // 기존 판단 쪽 파티 → dialogueLog에서 해당 party의 최근 관련 발언 추출
    const beliefParty =
      pendingConflict.currentJudgment === 'believe_a' ? 'a' :
      pendingConflict.currentJudgment === 'believe_b' ? 'b' : null

    let leftLabel = '기존 판단'
    let leftText = ''
    if (beliefParty) {
      const partyName = beliefParty === 'a' ? partyA : partyB
      const recentStatement = [...state.dialogueLog].reverse().find((d) =>
        d.speaker === beliefParty && (d.relatedDisputes ?? []).includes(pendingConflict.disputeId)
      )
      leftLabel = `기존 판단 · ${partyName} 쪽 주장`
      leftText = recentStatement?.text ?? `${partyName}의 주장에 설득력을 두었습니다.`
    } else if (pendingConflict.currentJudgment === 'both_partial') {
      leftLabel = '기존 판단 · 양측 일부 사실'
      leftText = '양측 주장에 각자 맞는 부분과 과장이 섞여 있다고 보았습니다.'
    } else {
      leftLabel = '기존 판단 · 보류'
      leftText = '추가 자료가 더 필요하다고 보았습니다.'
    }

    state.enqueueFeedback({
      kind: 'conflict',
      eyebrow: '판단 충돌',
      title: dispute?.name ?? pendingConflict.disputeId,
      contrast: {
        left:  { label: leftLabel, text: leftText },
        right: { label: '새 충돌 정보', text: pendingConflict.conflictingInfo },
      },
      tone: 'gold',
      actions: [
        {
          label: '현재 판단 유지',
          tone: 'gray',
          onSelect: () => {
            useGameStore.getState().setPendingConflict(null)
            enqueuedRef.current.delete(key)
          },
        },
        {
          label: '새 정보 기준으로 수정',
          tone: 'gold',
          onSelect: () => {
            const current = pendingConflict.currentJudgment
            let next: TruthJudgment = 'both_partial'
            if (current === 'believe_a') next = 'believe_b'
            else if (current === 'believe_b') next = 'believe_a'
            useGameStore.getState().reviseJudgment(pendingConflict.disputeId, next, useGameStore.getState().turnCount)
            enqueuedRef.current.delete(key)
          },
        },
      ],
    })
  }, [pendingConflict])

  // 새 쟁점 발견
  useEffect(() => {
    if (!pendingEmergence) return
    const key = `emergence:${pendingEmergence.disputeId}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const dispute = caseData.disputes.find((d) => d.id === pendingEmergence.disputeId)

    state.enqueueFeedback({
      kind: 'emergence',
      eyebrow: '새 쟁점 발견',
      subtitle: ROUTE_LABELS[pendingEmergence.route] ?? '새 단서가 갈래를 바꿨습니다.',
      title: dispute?.name ?? pendingEmergence.disputeId,
      body: stripOutputCodename(pendingEmergence.description),
      tone: 'gold',
      actions: [
        {
          label: '쟁점 보드에 반영',
          tone: 'gold',
          onSelect: () => {
            useGameStore.getState().acknowledgeEmergence(pendingEmergence.disputeId)
            enqueuedRef.current.delete(key)
          },
        },
      ],
    })
  }, [pendingEmergence])

  // 감정 실수 포착
  useEffect(() => {
    if (!pendingSlip) return
    const key = `slip:${pendingSlip.sourceDisputeId}:${pendingSlip.turn}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const partyData = pendingSlip.party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
    const sourceDispute = caseData.disputes.find((d) => d.id === pendingSlip.sourceDisputeId)
    const linkedDispute = pendingSlip.linkedDisputeId
      ? caseData.disputes.find((d) => d.id === pendingSlip.linkedDisputeId)
      : null

    const meta: string[] = []
    if (sourceDispute) meta.push(`관련 쟁점: ${sourceDispute.name}`)
    if (linkedDispute) meta.push(`연결 쟁점: ${linkedDispute.name}`)

    state.enqueueFeedback({
      kind: 'emotional_slip',
      eyebrow: '감정 실수 포착',
      title: partyData.name,
      quote: pendingSlip.slipText,
      meta,
      tone: 'red',
      actions: [
        {
          label: '지금은 넘긴다',
          tone: 'gray',
          onSelect: () => {
            useGameStore.getState().setPendingSlip(null)
            enqueuedRef.current.delete(key)
          },
        },
        {
          label: '진실 공방에 반영',
          tone: 'red',
          onSelect: () => {
            useGameStore.getState().addEmotionalSlip(pendingSlip)
            enqueuedRef.current.delete(key)
          },
        },
      ],
    })
  }, [pendingSlip])

  // Game event (contradiction / interjection / emotional_burst)
  useEffect(() => {
    if (!pendingGameEvent) return
    const ev = pendingGameEvent
    const key = `gameevent:${ev.type}:${ev.disputeId}:${ev.scriptSlot?.textId ?? 'x'}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const caseKey = caseData.caseId.replace(/^case-/, '')
    const disputeName = caseData.disputes.find((d) => d.id === ev.disputeId)?.name ?? ev.disputeId
    const partyName = ev.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

    const releaseKey = () => enqueuedRef.current.delete(key)

    if (ev.type === 'contradiction') {
      const v3Event = ev.scriptSlot?.textId ? getContradictionEvent(caseKey, ev.scriptSlot.textId) : null

      const handlePointOut = () => {
        const s = useGameStore.getState()
        for (const effect of (ev.deferredEffects ?? [])) {
          switch (effect.type) {
            case 'lie_advance':
              for (let i = 0; i < effect.steps; i += 1) {
                s.transitionLie(effect.party, effect.disputeId, 'event_contradiction_pointout')
              }
              break
            case 'emotion_spike':
              s.changeEmotion(effect.party, effect.delta)
              break
          }
        }
        s.addDialogue({
          speaker: 'judge',
          text: v3Event
            ? `${partyName} 씨, 아까 하신 말씀과 지금 말씀이 다릅니다. 어느 쪽이 맞습니까?`
            : `${partyName} 씨, 방금 답변이 앞선 진술과 맞지 않습니다. 정확히 말씀해 주십시오.`,
          relatedDisputes: [ev.disputeId],
          turn: s.turnCount,
        })
        const agent = ev.party === 'a' ? s.agentA : s.agentB
        const lie = agent.lieStateMap[ev.disputeId]?.currentState ?? 'S0'
        const reactionIsNarrative = isNarrativeReaction(v3Event?.npcReaction)
        const npcText = reactionIsNarrative
          ? buildContradictionFallbackLine(lie)
          : v3Event?.npcReaction ?? buildContradictionFallbackLine(lie)
        s.addDialogue({ speaker: ev.party, text: npcText, relatedDisputes: [ev.disputeId], turn: s.turnCount })
        if (reactionIsNarrative && v3Event?.npcReaction) {
          s.addDialogue({ speaker: 'system', text: v3Event.npcReaction, relatedDisputes: [ev.disputeId], turn: s.turnCount })
        }
        s.addDialogue({
          speaker: 'system',
          text: ev.severity === 'critical'
            ? `결정적 모순이 드러났다. ${partyName}의 방어가 크게 흔들린다.`
            : `진술이 엇갈리기 시작했다. 지금 압박하면 효과적이다.`,
          relatedDisputes: [ev.disputeId],
          turn: s.turnCount,
        })
        s.setPendingGameEvent(null)
        releaseKey()
      }

      const contrastPayload = v3Event
        ? {
            left:  { label: '이전 진술', text: v3Event.statementA },
            right: { label: '지금 진술', text: v3Event.statementB },
          }
        : undefined

      state.enqueueFeedback({
        kind: 'contradiction',
        eyebrow: '모순 감지',
        subtitle: `${disputeName} · ${partyName}`,
        body: contrastPayload ? undefined : ev.description,
        contrast: contrastPayload,
        tone: 'gold',
        actions: [
          { label: '지금은 넘긴다', tone: 'gray', onSelect: () => { useGameStore.getState().setPendingGameEvent(null); releaseKey() } },
          { label: '모순을 찌른다', tone: 'gold', onSelect: handlePointOut },
        ],
      })
      return
    }

    if (ev.type === 'interjection') {
      const v3Event = ev.scriptSlot?.textId ? getInterjectionEvent(caseKey, ev.scriptSlot.textId) : null
      const interjectionText = v3Event?.interjectionLine
        ? v3Event.interjectionLine
        : ev.severity === 'major'
          ? '재판관님, 잠깐만요. 저도 할 말이 있습니다.'
          : '재판관님, 지금 하신 말씀은 사실과 다릅니다.'

      const handleAllow = () => {
        const s = useGameStore.getState()
        s.addDialogue({ speaker: ev.party, text: interjectionText, relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.addDialogue({ speaker: 'judge', text: '발언을 허용합니다.', relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.trackMetric('interjectionAllowed')
        s.trackMetric('counterQuestionUsed')
        recordInterjectionChoice('allow')
        s.changeTrust(ev.party === 'a' ? 'b' : 'a', 'trustTowardJudge', -3)
        s.setPendingGameEvent(null)
        releaseKey()
      }
      const handleBlock = () => {
        const s = useGameStore.getState()
        recordInterjectionChoice('block')
        s.addDialogue({
          speaker: 'judge',
          text: `${partyName} 씨, 지금은 발언 순서가 아닙니다. 심문을 계속합니다.`,
          relatedDisputes: [ev.disputeId],
          turn: s.turnCount,
        })
        s.setPendingGameEvent(null)
        releaseKey()
      }

      state.enqueueFeedback({
        kind: 'contradiction',
        eyebrow: '끼어들기',
        subtitle: `${partyName} · ${disputeName}`,
        quote: interjectionText,
        tone: 'blue',
        actions: [
          { label: '제지한다', tone: 'gray', onSelect: handleBlock },
          { label: '허용한다', tone: 'blue', onSelect: handleAllow },
        ],
      })
      return
    }

    if (ev.type === 'emotional_burst') {
      const v3Event = ev.scriptSlot?.textId ? getOutburstEvent(caseKey, ev.scriptSlot.textId) : null
      const outburstLine = v3Event?.outburstLine
      const outburstText = outburstLine ?? ev.description

      const emitOutburst = () => {
        const s = useGameStore.getState()
        if (outburstLine) {
          s.addDialogue({ speaker: ev.party, text: outburstLine, relatedDisputes: [ev.disputeId], turn: s.turnCount })
        } else {
          s.addDialogue({ speaker: 'system', text: ev.description, relatedDisputes: [ev.disputeId], turn: s.turnCount })
        }
      }
      const handlePress = () => {
        const s = useGameStore.getState()
        emitOutburst()
        s.addDialogue({ speaker: 'judge', text: '계속 말해보세요. 지금의 흐름을 더 확인하겠습니다.', relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.changeEmotion(ev.party, 8)
        const meters = s.questionMeters
        const partyMeter = meters[ev.party]
        useGameStore.setState({
          questionMeters: { ...meters, [ev.party]: { ...partyMeter, leakMeter: Math.min(partyMeter.leakMeter + 10, 100) } },
        })
        s.addDialogue({ speaker: 'system', text: '사실 추궁이나 동기 탐색이 더 잘 먹히는 구간입니다.', relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.setPendingGameEvent(null)
        releaseKey()
      }
      const handleCalm = () => {
        const s = useGameStore.getState()
        emitOutburst()
        s.addDialogue({ speaker: 'judge', text: '잠시 진정하고, 사실만 다시 정리해 주세요.', relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.changeTrust(ev.party, 'trustTowardJudge', 12)
        s.changeEmotion(ev.party, -10)
        const meters = s.questionMeters
        const partyMeter = meters[ev.party]
        useGameStore.setState({
          questionMeters: { ...meters, [ev.party]: { ...partyMeter, trustWindow: Math.min(partyMeter.trustWindow + 15, 100) } },
        })
        s.addDialogue({ speaker: 'system', text: '공감 접근의 효율이 높아졌습니다.', relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.setPendingGameEvent(null)
        releaseKey()
      }

      state.enqueueFeedback({
        kind: 'emotional_slip',
        eyebrow: '감정 폭발',
        subtitle: `${partyName} · ${disputeName}`,
        quote: outburstLine ? outburstText : undefined,
        body: outburstLine ? undefined : outburstText,
        tone: 'red',
        actions: [
          { label: '진정시킨다', tone: 'gray', onSelect: handleCalm },
          { label: '밀어붙인다', tone: 'red', onSelect: handlePress },
        ],
      })
      return
    }
  }, [pendingGameEvent])

  // 퍼크 선택
  useEffect(() => {
    if (!pendingPerkChoice) return
    const pp = pendingPerkChoice
    const key = `perk:${pp.type}:${(pp as any).evidenceId ?? (pp as any).disputeId}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const releaseKey = () => enqueuedRef.current.delete(key)

    if (pp.type === 'penalty_buffer') {
      const evidence = caseData.evidence.find((e) => e.id === pp.evidenceId)
      const evidenceName = evidence?.name ?? pp.evidenceId

      state.enqueueFeedback({
        kind: 'perk_choice',
        eyebrow: '판결 완충',
        title: evidenceName,
        body: '증거 제시가 충분히 먹히지 않았습니다. 완충 스킬로 한 번 수습할 수 있습니다.',
        tone: 'gold',
        actions: [
          {
            label: '제시를 철회한다',
            tone: 'gray',
            onSelect: () => {
              const s = useGameStore.getState()
              s.consumePerkUse('penaltyBufferUsesRemaining')
              s.addDialogue({
                speaker: 'judge',
                text: `${evidenceName} 제시는 취소합니다. 다시 구성해서 제시하세요.`,
                relatedDisputes: evidence?.proves ?? [],
                turn: s.turnCount,
              })
              s.setPendingEvidenceResult(null)
              s.setPendingPerkChoice(null)
              releaseKey()
            },
          },
          {
            label: '관점을 바꿔 제시한다',
            tone: 'gold',
            onSelect: () => {
              const s = useGameStore.getState()
              s.consumePerkUse('penaltyBufferUsesRemaining')
              s.changeEmotion(pp.target, -4)
              s.addDialogue({
                speaker: 'system',
                text: `${evidenceName}의 제시 관점을 조정해 패널티를 줄였습니다.`,
                relatedDisputes: evidence?.proves ?? [],
                turn: s.turnCount,
              })
              s.setPendingPerkChoice(null)
              releaseKey()
            },
          },
        ],
      })
      return
    }

    if (pp.type === 'fatigue_extend') {
      const disputeName = caseData.disputes.find((d) => d.id === pp.disputeId)?.name ?? pp.disputeId
      const partyName = pp.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

      state.enqueueFeedback({
        kind: 'perk_choice',
        eyebrow: '집요함 추가',
        title: `${partyName} · ${disputeName}`,
        body: '같은 쟁점을 너무 오래 밀었습니다. 스킬을 써서 질문 각도를 초기화할 수 있습니다.',
        tone: 'blue',
        actions: [
          {
            label: '지금은 넘긴다',
            tone: 'gray',
            onSelect: () => {
              useGameStore.getState().setPendingPerkChoice(null)
              releaseKey()
            },
          },
          {
            label: '질문 각도 초기화',
            tone: 'blue',
            onSelect: () => {
              const s = useGameStore.getState()
              s.consumePerkUse('angleSwitchOpportunity')
              resetFatigueForDossier(pp.party, pp.disputeId)
              s.addDialogue({
                speaker: 'system',
                text: `${disputeName} 쟁점의 질문 피로도를 초기화했습니다. 다른 각도로 다시 밀 수 있습니다.`,
                relatedDisputes: [pp.disputeId],
                turn: s.turnCount,
              })
              s.setPendingPerkChoice(null)
              releaseKey()
            },
          },
        ],
      })
    }
  }, [pendingPerkChoice])

  // 증인 심문
  useEffect(() => {
    if (!pendingWitnessChoice) return
    const pc = pendingWitnessChoice
    const key = `witness:${pc.witnessId}:${pc.isResummon ? 're' : 'first'}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const releaseKey = () => enqueuedRef.current.delete(key)

    state.enqueueFeedback({
      kind: 'witness_choice',
      eyebrow: pc.isResummon ? '추가 질문' : '증인 심문',
      title: pc.witnessName,
      body: pc.isResummon
        ? `${pc.witnessName}에게 추가로 무엇을 물어보시겠습니까?`
        : `${pc.witnessName}에게 어떤 질문을 하시겠습니까?`,
      tone: 'green',
      actionsLayout: 'vertical',
      actions: pc.slots.map((slot) => ({
        label: slot.topic,
        tone: 'green',
        onSelect: () => {
          applyWitnessSlot(slot.id)
          releaseKey()
        },
      })),
    })
  }, [pendingWitnessChoice])

  return null
}
