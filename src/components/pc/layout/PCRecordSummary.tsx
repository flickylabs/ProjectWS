import { useMemo } from 'react'
import { useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import { hasContradictionComparison } from '../../../utils/contradiction'

const LIE_STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5'] as const

function stateIndex(s: string): number {
  return LIE_STATES.indexOf(s as (typeof LIE_STATES)[number])
}

export default function PCRecordSummary({ onClose }: { onClose: () => void }) {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const dialogueLog = useStore((s) => s.dialogueLog)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)

  // hidden 쟁점 중 아직 emerged 되지 않은 것은 표시하지 않음
  const isVisible = (disputeId: string) => {
    const vis = disputeVisibility[disputeId]
    if (!vis) return true // visibility 정보가 없으면 기본 표시
    return vis.visibility !== 'hidden'
  }

  const confirmedFacts = useMemo(() => {
    if (!caseData) return []
    const facts: { text: string; confirmed: boolean }[] = []

    for (const dispute of caseData.disputes) {
      if (!isVisible(dispute.id)) continue

      const stateA = agentA.lieStateMap[dispute.id]?.currentState ?? 'S0'
      const stateB = agentB.lieStateMap[dispute.id]?.currentState ?? 'S0'
      const maxIdx = Math.max(stateIndex(stateA), stateIndex(stateB))

      if (maxIdx >= 1) {
        facts.push({
          text: `${dispute.name}에 대한 진술 변화 감지`,
          confirmed: maxIdx >= 3,
        })
      }
    }

    // Evidence investigation results
    for (const ev of caseData.evidence) {
      const state = evidenceStates[ev.id]
      if (state?.investigatedActions && state.investigatedActions.length > 0) {
        facts.push({ text: `${ev.surfaceName ?? ev.name} 조사 완료`, confirmed: true })
      }
    }

    return facts
  }, [agentA, agentB, caseData, evidenceStates, disputeVisibility])

  const unresolvedQuestions = useMemo(() => {
    if (!caseData) return []
    return caseData.disputes
      .filter((d) => {
        if (!isVisible(d.id)) return false

        const stateA = agentA.lieStateMap[d.id]?.currentState ?? 'S0'
        const stateB = agentB.lieStateMap[d.id]?.currentState ?? 'S0'
        const maxIdx = Math.max(stateIndex(stateA), stateIndex(stateB))
        return maxIdx < 3
      })
      .map((d) => d.name)
  }, [agentA, agentB, caseData, disputeVisibility])

  const contradictions = useMemo(() => {
    return dialogueLog
      .filter((entry) => hasContradictionComparison(entry.contradictionMeta))
      .map((entry) => ({
        party: entry.contradictionMeta!.party,
        previous: entry.contradictionMeta!.previousClaim,
        current: entry.contradictionMeta!.currentClaim,
      }))
  }, [dialogueLog])

  return (
    <div className="pc-record-summary">
      <div className="pc-record-summary__backdrop" onClick={onClose} />
      <div className="pc-record-summary__panel">
        <div className="pc-record-summary__header">
          <PCSvgIcon id="i-doc" size={20} />
          <h2>기록 정리</h2>
          <button className="pc-record-summary__close" onClick={onClose} type="button">
            <PCSvgIcon id="i-plus" size={14} />
          </button>
        </div>

        <div className="pc-record-summary__body">
          <section className="pc-record-summary__section">
            <h3><PCSvgIcon id="i-shield" size={14} /> 확인된 사실</h3>
            {confirmedFacts.length === 0 ? (
              <p className="pc-record-summary__empty">아직 확인된 사실이 없습니다</p>
            ) : confirmedFacts.map((f, i) => (
              <div className={`pc-record-summary__item ${f.confirmed ? 'is-confirmed' : 'is-partial'}`} key={i}>
                <span>{f.confirmed ? '✓' : '?'}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </section>

          <section className="pc-record-summary__section">
            <h3><PCSvgIcon id="i-search" size={14} /> 미해결 의문</h3>
            {unresolvedQuestions.length === 0 ? (
              <p className="pc-record-summary__empty">모든 쟁점이 충분히 조사되었습니다</p>
            ) : unresolvedQuestions.map((q, i) => (
              <div className="pc-record-summary__item is-question" key={i}>
                <span>•</span>
                <span>{q}</span>
              </div>
            ))}
          </section>

          <section className="pc-record-summary__section">
            <h3><PCSvgIcon id="i-bolt" size={14} /> 모순 발견</h3>
            {contradictions.length === 0 ? (
              <p className="pc-record-summary__empty">발견된 모순이 없습니다</p>
            ) : contradictions.map((c, i) => (
              <div className="pc-record-summary__item is-contradiction" key={i}>
                <span>⚡</span>
                <span>&ldquo;{c.previous}&rdquo; → &ldquo;{c.current}&rdquo;</span>
              </div>
            ))}
          </section>
        </div>

        <div className="pc-record-summary__footer">
          <button className="pc-record-summary__close-btn" onClick={onClose} type="button">닫기</button>
        </div>
      </div>
    </div>
  )
}
