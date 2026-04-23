import { useEffect } from 'react'
import { useStore } from '../../../store/useGameStore'
import CutsceneOverlay from '../../discovery/CutsceneOverlay'
import PCMinigameOverlay from './PCMinigameOverlay'
import PCDiscoveryOverlay from './PCDiscoveryOverlay'
import { openPcInteractionPanel } from './PCInteractionPanel'

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
  // Discovery/Confrontation 팝업 활성 여부 — 활성 시 transition / evidence-result 팝업은 대기
  const discoveryActive = useStore((s) => Boolean(
    s.discovery.pendingSlip
    || s.discovery.pendingEmergence
    || s.discovery.pendingConfrontation
    || s.discovery.pendingConflict
    || (s as any).pendingGameEvent
    || (s as any).pendingPerkChoice
    || (s as any).pendingWitnessChoice,
  ))

  useEffect(() => {
    if (!pendingEvidenceResult) {
      return
    }
    // Discovery 팝업 활성 중이면 대기 (닫힌 후 재실행)
    if (discoveryActive) return

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

    openPcInteractionPanel({
      ...descriptor,
      variant: 'feature',
    })
    setPendingEvidenceResult(null)
  }, [pendingEvidenceResult, setPendingEvidenceResult, discoveryActive])

  useEffect(() => {
    if (!pendingTransitionChoice || !caseData) {
      return
    }
    // Discovery 팝업 활성 중이면 대기 (닫힌 후 재실행)
    if (discoveryActive) return

    const partyName =
      pendingTransitionChoice.party === 'a'
        ? caseData.duo.partyA.name
        : caseData.duo.partyB.name
    const disputeName =
      caseData.disputes.find((dispute) => dispute.id === pendingTransitionChoice.disputeId)?.name
      ?? pendingTransitionChoice.disputeId
    const meta = TRANSITION_META[pendingTransitionChoice.label]

    const actions =
      pendingTransitionChoice.label === 'cracked'
        ? [
            {
              kind: 'run_question' as const,
              label: `"그 말, 아까와 다릅니다" — 사실 추궁`,
              party: pendingTransitionChoice.party,
              disputeId: pendingTransitionChoice.disputeId,
              questionType: 'fact_pursuit' as const,
            },
            {
              kind: 'run_question' as const,
              label: `"왜 숨기셨습니까?" — 동기 탐색`,
              party: pendingTransitionChoice.party,
              disputeId: pendingTransitionChoice.disputeId,
              questionType: 'motive_search' as const,
            },
            {
              kind: 'open_evidence_selection' as const,
              label: `"이 증거를 보십시오" — 증거 제시`,
              party: pendingTransitionChoice.party,
              disputeId: pendingTransitionChoice.disputeId,
            },
          ]
        : pendingTransitionChoice.label === 'cornered'
          ? [
              {
                kind: 'run_question' as const,
                label: `"더 숨길 게 있습니까?" — 정면 추궁`,
                party: pendingTransitionChoice.party,
                disputeId: pendingTransitionChoice.disputeId,
                questionType: 'fact_pursuit' as const,
              },
              {
                kind: 'run_question' as const,
                label: `"사정이 있었겠지요" — 공감 접근`,
                party: pendingTransitionChoice.party,
                disputeId: pendingTransitionChoice.disputeId,
                questionType: 'empathy_approach' as const,
              },
              {
                kind: 'open_dispute_picker' as const,
                label: '다른 쟁점으로 화제 전환',
                disputeId: pendingTransitionChoice.disputeId,
              },
            ]
          : [
              {
                kind: 'run_question' as const,
                label: `"마지막으로 묻겠습니다" — 결정적 질문`,
                party: pendingTransitionChoice.party,
                disputeId: pendingTransitionChoice.disputeId,
                questionType: 'fact_pursuit' as const,
              },
              {
                kind: 'open_evidence_selection' as const,
                label: `"이것으로 끝내겠습니다" — 증거 제시`,
                party: pendingTransitionChoice.party,
                disputeId: pendingTransitionChoice.disputeId,
              },
              {
                kind: 'run_question' as const,
                label: `"솔직히 말씀하시지요" — 자백 유도`,
                party: pendingTransitionChoice.party,
                disputeId: pendingTransitionChoice.disputeId,
                questionType: 'empathy_approach' as const,
              },
            ]

    openPcInteractionPanel({
      title: `${partyName} — ${meta.title}`,
      subtitle: disputeName,
      body: meta.body,
      tone: meta.tone,
      variant: 'feature',
      actions,
      backdrop: false, // 뒤 채팅을 가리지 않는 소프트 상단 팝업으로 렌더
    })
    setPendingTransitionChoice(null)
  }, [caseData, pendingTransitionChoice, setPendingTransitionChoice, discoveryActive])

  return (
    <>
      <CutsceneOverlay />
      <PCMinigameOverlay />
      <PCDiscoveryOverlay />
    </>
  )
}
