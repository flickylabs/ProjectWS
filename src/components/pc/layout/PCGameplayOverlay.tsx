import { useEffect } from 'react'
import { useStore } from '../../../store/useGameStore'
import CutsceneOverlay from '../../discovery/CutsceneOverlay'
import PCMinigameOverlay from './PCMinigameOverlay'
import PCDiscoveryOverlay from './PCDiscoveryOverlay'
import { openPcInteractionPanel } from './PCInteractionPanel'

type TransitionLabel = 'cracked' | 'cornered' | 'opening'

const TRANSITION_META: Record<TransitionLabel, { title: string; tone: 'gold' | 'red' | 'green'; body: string }> = {
  cracked: {
    title: '균열',
    tone: 'gold',
    body: '진술 사이에 틈이 벌어졌습니다. 지금 흐름을 이어 갈 전략을 고르세요.',
  },
  cornered: {
    title: '궁지',
    tone: 'red',
    body: '상대가 압박을 받는 구간입니다. 다음 압박 방향을 선택하세요.',
  },
  opening: {
    title: '개방',
    tone: 'green',
    body: '입을 열기 좋은 순간이 왔습니다. 가장 효율적인 접근을 고르세요.',
  },
}

export default function PCGameplayOverlay() {
  const caseData = useStore((s) => s.caseData)
  const pendingEvidenceResult = useStore((s) => s.pendingEvidenceResult)
  const setPendingEvidenceResult = useStore((s) => s.setPendingEvidenceResult)
  const pendingTransitionChoice = useStore((s) => s.pendingTransitionChoice)
  const setPendingTransitionChoice = useStore((s) => s.setPendingTransitionChoice)

  useEffect(() => {
    if (!pendingEvidenceResult) {
      return
    }

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
  }, [pendingEvidenceResult, setPendingEvidenceResult])

  useEffect(() => {
    if (!pendingTransitionChoice || !caseData) {
      return
    }

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
              label: '모순을 더 쌓는다',
              party: pendingTransitionChoice.party,
              disputeId: pendingTransitionChoice.disputeId,
              questionType: 'fact_pursuit' as const,
            },
            {
              kind: 'run_question' as const,
              label: '동기를 판다',
              party: pendingTransitionChoice.party,
              disputeId: pendingTransitionChoice.disputeId,
              questionType: 'motive_search' as const,
            },
            {
              kind: 'open_evidence_selection' as const,
              label: '증거를 낸다',
              party: pendingTransitionChoice.party,
              disputeId: pendingTransitionChoice.disputeId,
            },
          ]
        : pendingTransitionChoice.label === 'cornered'
          ? [
              {
                kind: 'run_question' as const,
                label: '정면으로 밀어붙인다',
                party: pendingTransitionChoice.party,
                disputeId: pendingTransitionChoice.disputeId,
                questionType: 'fact_pursuit' as const,
              },
              {
                kind: 'run_question' as const,
                label: '공감으로 전환한다',
                party: pendingTransitionChoice.party,
                disputeId: pendingTransitionChoice.disputeId,
                questionType: 'empathy_approach' as const,
              },
              {
                kind: 'open_dispute_picker' as const,
                label: '다른 쟁점으로 이동한다',
                disputeId: pendingTransitionChoice.disputeId,
              },
            ]
          : [
              {
                kind: 'run_question' as const,
                label: '결정적 질문으로 간다',
                party: pendingTransitionChoice.party,
                disputeId: pendingTransitionChoice.disputeId,
                questionType: 'fact_pursuit' as const,
              },
              {
                kind: 'open_evidence_selection' as const,
                label: '증거로 마무리한다',
                party: pendingTransitionChoice.party,
                disputeId: pendingTransitionChoice.disputeId,
              },
              {
                kind: 'run_question' as const,
                label: '자백을 유도한다',
                party: pendingTransitionChoice.party,
                disputeId: pendingTransitionChoice.disputeId,
                questionType: 'empathy_approach' as const,
              },
            ]

    openPcInteractionPanel({
      title: `${meta.title} · ${partyName}`,
      subtitle: disputeName,
      body: meta.body,
      tone: meta.tone,
      variant: 'feature',
      tags: [`${pendingTransitionChoice.from} → ${pendingTransitionChoice.to}`],
      actions,
    })
    setPendingTransitionChoice(null)
  }, [caseData, pendingTransitionChoice, setPendingTransitionChoice])

  return (
    <>
      <CutsceneOverlay />
      <PCMinigameOverlay />
      <PCDiscoveryOverlay />
    </>
  )
}
