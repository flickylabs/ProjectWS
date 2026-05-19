import { useMemo, useState } from 'react'
import { Phase } from '../../types'
import { useGameStore, useStore } from '../../store/useGameStore'
import PCSvgIcon from '../pc/icons/PCSvgIcon'
import PCVerdictReviewMontage from '../pc/verdict/PCVerdictReviewMontage'
import { verdictEntryCutscene } from '../../engine/presentationEngine'
import { getVerdictDisputeGate } from '../../engine/verdictAdvanceGate'

export default function Phase6_Mediation() {
  const advancePhase = useStore((s) => s.advancePhase)
  const setPhase = useStore((s) => s.setPhase)
  const caseData = useStore((s) => s.caseData)
  const addDialogue = useStore((s) => s.addDialogue)
  const turnCount = useStore((s) => s.turnCount)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const [reviewing, setReviewing] = useState(false)
  const [enteringVerdict, setEnteringVerdict] = useState(false)

  const unresolvedDisputes = useMemo(() => {
    return (caseData?.disputes ?? []).filter((dispute) => {
      const aState = agentA.lieStateMap[dispute.id]?.currentState
      const bState = agentB.lieStateMap[dispute.id]?.currentState
      return aState !== 'S5' && bState !== 'S5'
    })
  }, [agentA.lieStateMap, agentB.lieStateMap, caseData?.disputes])

  // PC QA round 2 A-1: surface visible/hidden dispute counts so the standalone
  // hidden-dispute pre-modal can be removed and this is the single decision screen.
  const disputeGate = useMemo(() => getVerdictDisputeGate(useGameStore.getState()), [caseData, agentA, agentB])

  if (!caseData) return null

  const hasUnresolved = unresolvedDisputes.length > 0
  const hasHiddenDisputes = disputeGate.hiddenCount > 0

  const enterVerdict = () => {
    if (reviewing || enteringVerdict) return
    useGameStore.getState().setMediationChoice('immediate')
    addDialogue({
      speaker: 'judge',
      text: '심문을 마치고 판결에 들어가겠습니다.',
      relatedDisputes: [],
      turn: turnCount,
    })
    setReviewing(true)
  }

  const completeReview = async () => {
    if (enteringVerdict) return
    setEnteringVerdict(true)
    await verdictEntryCutscene()
    advancePhase(Phase.Verdict)
  }

  if (reviewing) return <PCVerdictReviewMontage onComplete={completeReview} />

  return (
    <div className="pc-mediation pc-mediation--entry">
      <section className="pc-mediation-entry" role="dialog" aria-modal="true" aria-labelledby="pc-mediation-entry-title">
        <div className="pc-mediation-entry__mark" aria-hidden="true">
          <PCSvgIcon id="i-scale" size={30} />
        </div>
        <div className="pc-mediation-entry__eyebrow">판결</div>
        <h2 id="pc-mediation-entry-title">심문을 마치고 판결에 들어가시겠습니까?</h2>
        <p>심문을 더 이어갈지, 바로 판결로 들어갈지 결정합니다.</p>

        <div className="pc-mediation-entry__dispute-tags">
          <span className="pc-mediation-entry__tag is-visible">공개 쟁점 {disputeGate.visibleCount}</span>
          {hasHiddenDisputes ? (
            <span className="pc-mediation-entry__tag is-hidden">숨은 쟁점 {disputeGate.hiddenCount}</span>
          ) : null}
        </div>

        {hasUnresolved || hasHiddenDisputes ? (
          <div className="pc-mediation-entry__warning">
            <strong>아직 정리되지 않은 쟁점이 있습니다. 이대로 선고하시겠습니까?</strong>
            <span>{hasHiddenDisputes
              ? '미발견 쟁점이 남아 있으면 판결 기록이 불완전하다고 평가될 수 있습니다.'
              : '선고는 가능하지만, 판결 기록이 불완전하다고 평가될 수 있습니다.'}</span>
          </div>
        ) : null}

        <div className="pc-mediation-entry__actions">
          <button type="button" className="pc-mediation-entry__secondary" onClick={() => setPhase(Phase.Interrogation)}>
            추가 심문
          </button>
          <button type="button" className="pc-mediation-entry__primary" onClick={enterVerdict}>
            선고로 진행
          </button>
        </div>
      </section>
    </div>
  )
}
