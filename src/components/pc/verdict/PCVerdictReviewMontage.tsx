import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../../../store/useGameStore'

interface Props {
  onComplete: () => void
}

export default function PCVerdictReviewMontage({ onComplete }: Props) {
  const caseData = useStore((s) => s.caseData)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const judgments = useStore((s) => s.discovery.judgments)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  const [done, setDone] = useState(false)
  const completedRef = useRef(false)

  const finish = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    setDone(true)
    window.setTimeout(onComplete, 180)
  }, [onComplete])

  useEffect(() => {
    const timer = window.setTimeout(finish, 4000)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [finish])

  const keyEvidence = useMemo(() => {
    return evidenceDefinitions
      .map((evidence) => ({ evidence, state: evidenceStates[evidence.id] }))
      .filter((item) => item.state?.presented || item.state?.unlocked)
      .sort((a, b) => {
        const presentedDelta = Number(Boolean(b.state?.presented)) - Number(Boolean(a.state?.presented))
        if (presentedDelta !== 0) return presentedDelta
        return (b.evidence.reliability === 'hard' ? 1 : 0) - (a.evidence.reliability === 'hard' ? 1 : 0)
      })
      .slice(0, 3)
  }, [evidenceDefinitions, evidenceStates])

  const collapsedLieCount = useMemo(() => {
    const entries = [
      ...Object.values(agentA.lieStateMap ?? {}),
      ...Object.values(agentB.lieStateMap ?? {}),
    ]
    return entries.filter((entry) => entry.currentState === 'S5').length
  }, [agentA.lieStateMap, agentB.lieStateMap])

  const unresolvedDisputes = useMemo(() => {
    return (caseData?.disputes ?? [])
      .filter((dispute) => {
        const visibility = disputeVisibility[dispute.id]?.visibility
        if (visibility === 'hidden') return false
        return !judgments[dispute.id] || judgments[dispute.id].judgment === 'undetermined'
      })
      .slice(0, 3)
  }, [caseData?.disputes, disputeVisibility, judgments])

  return (
    <div
      className={`pc-verdict-review-montage${done ? ' is-done' : ''}`}
      onClick={finish}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') finish()
      }}
    >
      <div className="pc-verdict-review-montage__scanline" aria-hidden="true" />
      <section className="pc-verdict-review-montage__content" aria-label="판결 전 기록 검토">
        <div className="pc-verdict-review-montage__eyebrow">기록 검토</div>
        <h2>판결 전 마지막 정리</h2>

        <div className="pc-verdict-review-montage__evidence">
          {keyEvidence.length > 0 ? keyEvidence.map((item, index) => (
            <article
              className="pc-verdict-review-montage__card"
              key={item.evidence.id}
              style={{ animationDelay: `${index * 1.2}s` }}
            >
              <span>{item.evidence.reliability === 'hard' ? 'Hard' : 'Soft'}</span>
              <strong>{item.evidence.surfaceName ?? item.evidence.name}</strong>
              <p>{item.evidence.meta?.stageLabel ?? item.evidence.type}</p>
            </article>
          )) : (
            <article className="pc-verdict-review-montage__card is-empty">
              <span>Record</span>
              <strong>제시된 증거 없음</strong>
              <p>진술 기록을 기준으로 판단합니다.</p>
            </article>
          )}
        </div>

        <div className="pc-verdict-review-montage__summary">
          <div>
            <span>붕괴한 거짓말</span>
            <strong>{collapsedLieCount}</strong>
          </div>
          <div>
            <span>미해결 쟁점</span>
            <strong>{unresolvedDisputes.length}</strong>
          </div>
        </div>

        {unresolvedDisputes.length > 0 ? (
          <div className="pc-verdict-review-montage__unresolved">
            {unresolvedDisputes.map((dispute) => <span key={dispute.id}>{dispute.name}</span>)}
          </div>
        ) : null}
      </section>
    </div>
  )
}
