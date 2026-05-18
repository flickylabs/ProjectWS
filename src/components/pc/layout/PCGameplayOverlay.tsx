import { useEffect } from 'react'
import { useStore, useGameStore } from '../../../store/useGameStore'
import CutsceneOverlay from '../../discovery/CutsceneOverlay'
import PCDiscoveryOverlay from './PCDiscoveryOverlay'
import {
  openPcInteractionPanel,
  buildEvidenceSelectionPayload,
  buildDisputePickerPayload,
} from './PCInteractionPanel'
import { useActionDispatch, findLinkedDialogueId } from '../../../hooks/useActionDispatch'

type TransitionLabel = 'cracked' | 'cornered' | 'opening'

const TRANSITION_META: Record<TransitionLabel, { title: string; tone: 'gold' | 'red' | 'green'; body: string }> = {
  cracked: {
    title: '방어가 흔들린다',
    tone: 'gold',
    body: '말이 달라지기 시작했습니다. 지금 파고들면 숨기고 있던 것이 나올 수 있습니다.',
  },
  cornered: {
    title: '도망칠 곳이 줄어든다',
    tone: 'red',
    body: '변명이 통하지 않는다는 걸 본인도 느끼고 있습니다. 어떻게 압박하시겠습니까?',
  },
  opening: {
    title: '입을 열 준비가 됐다',
    tone: 'green',
    body: '더 숨기는 것보다 말하는 게 나을 수 있다고 느끼기 시작했습니다.',
  },
}

export default function PCGameplayOverlay() {
  const caseData = useStore((s) => s.caseData)
  const pendingEvidenceResult = useStore((s) => s.pendingEvidenceResult)
  const setPendingEvidenceResult = useStore((s) => s.setPendingEvidenceResult)
  const pendingTransitionChoice = useStore((s) => s.pendingTransitionChoice)
  const setPendingTransitionChoice = useStore((s) => s.setPendingTransitionChoice)
  const dispatch = useActionDispatch()

  // 증거 제시 결과: 자동 소멸 카드로 (선택지 없음)
  useEffect(() => {
    if (!pendingEvidenceResult) return

    const descriptor =
      pendingEvidenceResult.type === 'collapse'
        ? {
            title: `${pendingEvidenceResult.evidenceName} 제시 성공`,
            subtitle: '직접 진술 붕괴',
            body: '상대 진술이 크게 흔들렸습니다. 지금이 다음 질문이나 이의 제기를 붙일 타이밍입니다.',
            tone: 'red' as const,
          }
        : pendingEvidenceResult.type === 'crack'
          ? {
              title: `${pendingEvidenceResult.evidenceName} 제시 성공`,
              subtitle: '균열 포착',
              body: '증거가 진술 사이의 틈을 만들었습니다. 관련 쟁점으로 이어서 압박해 보세요.',
              tone: 'gold' as const,
            }
          : {
              title: `${pendingEvidenceResult.evidenceName} 제시`,
              subtitle: '보류',
              body: '직접 붕괴까지는 아니지만 기록 가치가 생겼습니다. 다른 증거나 발언과 연결해 다시 시도해 보세요.',
              tone: 'blue' as const,
            }

    const resultType = pendingEvidenceResult.type
    const evidenceName = pendingEvidenceResult.evidenceName
    const state = useGameStore.getState()

    // Tier 1: collapse/crack은 컷씬 유지 + 공명 발사 (증거 카드로)
    if (resultType === 'collapse' || resultType === 'crack' || pendingEvidenceResult.courtBeat) {
      state.enqueueFeedback({
        kind: 'evidence_result',
        title: descriptor.title,
        subtitle: descriptor.subtitle,
        body: descriptor.body,
        tone: descriptor.tone,
        courtBeat: pendingEvidenceResult.courtBeat,
        autoDismissMs: pendingEvidenceResult.courtBeat ? 1500 : 3200,
      })
      // 증거 결과는 카드 micro 강조로 축소한다.
      const evidenceId = pendingEvidenceResult.evidenceId
      const evidenceSelector = evidenceId
        ? `[data-resonance-target="evidence-${evidenceId}"]`
        : `[data-resonance-target^="evidence-"]:first-of-type`
      window.setTimeout(() => {
        useGameStore.getState().enqueueAura({ targetSelector: evidenceSelector })
      }, 600)
    }

    // 관찰 패널 기록 — 모든 결과(collapse/crack/hold)
    if (
      pendingEvidenceResult.courtBeat?.notebookEntry &&
      pendingEvidenceResult.courtBeat.beatType !== 'evidence_miss'
    ) {
      state.addNotebookEntry({
        turnCount: state.turnCount,
        category: 'critical_contradiction',
        iconId: 'i-doc',
        title: `${evidenceName}로 확인한 모순`,
        summary: pendingEvidenceResult.courtBeat.notebookEntry,
        party: pendingEvidenceResult.courtBeat.portraitReaction?.party,
        linkedDialogueId: findLinkedDialogueId(),
      })
    }

    state.addJudgeObservation({
      turnCount: state.turnCount,
      category: 'evidence',
      iconId: 'i-doc',
      title: descriptor.body,
      summary: `${evidenceName} · ${descriptor.subtitle}`,
      linkedDialogueId: findLinkedDialogueId(),
    })

    setPendingEvidenceResult(null)
  }, [pendingEvidenceResult, setPendingEvidenceResult])

  // 상태 전이 선택지 (cracked / cornered / opening)
  useEffect(() => {
    if (!pendingTransitionChoice || !caseData) return

    const choice = pendingTransitionChoice
    const partyName =
      choice.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
    const disputeName =
      caseData.disputes.find((dispute) => dispute.id === choice.disputeId)?.name
      ?? choice.disputeId
    const meta = TRANSITION_META[choice.label]

    const runQuestion = (questionType: 'fact_pursuit' | 'motive_search' | 'empathy_approach') => {
      dispatch({
        type: 'question',
        questionType,
        target: choice.party,
        disputeId: choice.disputeId,
      } as any)
    }

    const openEvidenceSelection = () => {
      const payload = buildEvidenceSelectionPayload(choice.disputeId, choice.party)
      if (payload) openPcInteractionPanel(payload)
    }

    const openDisputePicker = () => {
      const payload = buildDisputePickerPayload(choice.disputeId)
      if (payload) openPcInteractionPanel(payload)
    }

    const actions =
      choice.label === 'cracked'
        ? [
            { label: `"그 말, 아까와 다릅니다" — 사실 추궁`, tone: 'gold' as const, onSelect: () => runQuestion('fact_pursuit') },
            { label: `"왜 숨기셨습니까?" — 동기 탐색`,       tone: 'gold' as const, onSelect: () => runQuestion('motive_search') },
            { label: `"이 증거를 보십시오" — 증거 제시`,      tone: 'gold' as const, onSelect: openEvidenceSelection },
          ]
        : choice.label === 'cornered'
          ? [
              { label: `"더 숨길 게 있습니까?" — 정면 추궁`, tone: 'red' as const, onSelect: () => runQuestion('fact_pursuit') },
              { label: `"사정이 있었겠지요" — 공감 접근`,     tone: 'gold' as const, onSelect: () => runQuestion('empathy_approach') },
              { label: '다른 쟁점으로 화제 전환',                 tone: 'gold' as const, onSelect: openDisputePicker },
            ]
          : [
              { label: `"마지막으로 묻겠습니다" — 결정적 질문`, tone: 'gold' as const, onSelect: () => runQuestion('fact_pursuit') },
              { label: `"이것으로 끝내겠습니다" — 증거 제시`,    tone: 'gold' as const, onSelect: openEvidenceSelection },
              { label: `"솔직히 말씀하시지요" — 자백 유도`,       tone: 'green' as const, onSelect: () => runQuestion('empathy_approach') },
            ]

    // 컷씬 띠 알림 (actions 없이 자동 소멸) — 선택지는 핫바에서 직접
    // 단, 관찰 패널에는 "제시된 선택지" 요약을 함께 기록 (Modal 세부 기록)
    const choicesSummary = actions
      .map((a) => {
        const parts = a.label.split('—')
        return (parts.length > 1 ? parts.pop() : a.label)?.trim() ?? a.label
      })
      .join(' / ')

    const ovState = useGameStore.getState()
    ovState.enqueueFeedback({
      kind: 'transition_choice',
      body: `${partyName} — ${meta.title}`,
      tone: meta.tone,
      party: choice.party,
      disputeId: choice.disputeId,
    })
    // 관찰 패널 기록 — 전환 상황 발생 + 제시된 선택지
    ovState.addJudgeObservation({
      turnCount: ovState.turnCount,
      category: 'event',
      iconId: 'i-bolt',
      title: meta.title,
      summary: `${partyName} · ${disputeName} — 선택지: ${choicesSummary}`,
      party: choice.party,
      disputeId: choice.disputeId,
      linkedDialogueId: findLinkedDialogueId(choice.party),
    })
    setPendingTransitionChoice(null)
  }, [caseData, pendingTransitionChoice, setPendingTransitionChoice, dispatch])

  return (
    <>
      <CutsceneOverlay />
      <PCDiscoveryOverlay />
    </>
  )
}
