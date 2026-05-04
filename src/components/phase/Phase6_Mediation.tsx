import { useMemo } from 'react'
import { Phase } from '../../types'
import { useGameStore, useStore } from '../../store/useGameStore'
import PCSvgIcon from '../pc/icons/PCSvgIcon'

export default function Phase6_Mediation() {
  const advancePhase = useStore((s) => s.advancePhase)
  const setPhase = useStore((s) => s.setPhase)
  const caseData = useStore((s) => s.caseData)
  const addDialogue = useStore((s) => s.addDialogue)
  const turnCount = useStore((s) => s.turnCount)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)

  const unresolvedDisputes = useMemo(() => {
    return (caseData?.disputes ?? []).filter((dispute) => {
      const aState = agentA.lieStateMap[dispute.id]?.currentState
      const bState = agentB.lieStateMap[dispute.id]?.currentState
      return aState !== 'S5' && bState !== 'S5'
    })
  }, [agentA.lieStateMap, agentB.lieStateMap, caseData?.disputes])

  if (!caseData) return null

  const hasUnresolved = unresolvedDisputes.length > 0

  const enterVerdict = () => {
    useGameStore.getState().setMediationChoice('immediate')
    addDialogue({
      speaker: 'judge',
      text: '심문을 마치고 판결에 들어가겠습니다.',
      relatedDisputes: [],
      turn: turnCount,
    })
    advancePhase(Phase.Verdict)
  }

  return (
    <div className="pc-mediation pc-mediation--entry">
      <section className="pc-mediation-entry" role="dialog" aria-modal="true" aria-labelledby="pc-mediation-entry-title">
        <div className="pc-mediation-entry__mark" aria-hidden="true">
          <PCSvgIcon id="i-scale" size={30} />
        </div>
        <div className="pc-mediation-entry__eyebrow">판결 진입</div>
        <h2 id="pc-mediation-entry-title">심문을 마치고 판결에 들어가시겠습니까?</h2>
        <p>심문을 마저 이어나갈지, 바로 판결에 들어갈지 결정합니다.</p>

        {hasUnresolved ? (
          <div className="pc-mediation-entry__warning">
            <strong>아직 확정되지 않은 쟁점이 존재합니다. 이대로 판결을 선고하시겠습니까?</strong>
            <span>판결은 가능하지만, 불완전한 기록으로 평가될 수 있습니다.</span>
          </div>
        ) : null}

        <div className="pc-mediation-entry__actions">
          <button type="button" className="pc-mediation-entry__secondary" onClick={() => setPhase(Phase.Interrogation)}>
            추가 심리
          </button>
          <button type="button" className="pc-mediation-entry__primary" onClick={enterVerdict}>
            판결 선고
          </button>
        </div>
      </section>
    </div>
  )
}
