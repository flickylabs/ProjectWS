import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { LieState, LieStateEntry } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcEvidenceSymbolId } from '../icons/pcIconUtils'

const LIE_STATES: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']

function getLieClassName(state: LieState) {
  if (state === 'S0') return 'dp-0'
  if (state === 'S1') return 'dp-1'
  if (state === 'S2') return 'dp-2'
  return 'dp-3'
}

export default function PCDisputeRibbon() {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const setLastFocusedDisputeId = useStore((s) => s.setLastFocusedDisputeId)
  const setPendingEvidenceView = useStore((s) => s.setPendingEvidenceView)

  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [autoExpandedId, setAutoExpandedId] = useState<string | null>(null)
  const [flashId, setFlashId] = useState<string | null>(null)

  useEffect(() => {
    if (!lastFocusedDisputeId) {
      return
    }

    setFlashId(lastFocusedDisputeId)
    if (!pinnedId) {
      setAutoExpandedId(lastFocusedDisputeId)
    }

    const timer = window.setTimeout(() => {
      setFlashId((current) => (current === lastFocusedDisputeId ? null : current))
      if (!pinnedId) {
        setAutoExpandedId((current) => (current === lastFocusedDisputeId ? null : current))
      }
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [lastFocusedDisputeId, pinnedId])

  const getMaxLieState = (disputeId: string): LieState => {
    const entryA = agentA.lieStateMap[disputeId] as LieStateEntry | undefined
    const entryB = agentB.lieStateMap[disputeId] as LieStateEntry | undefined
    const stateA = entryA?.currentState ?? 'S0'
    const stateB = entryB?.currentState ?? 'S0'
    return LIE_STATES.indexOf(stateA) >= LIE_STATES.indexOf(stateB) ? stateA : stateB
  }

  const activeId = pinnedId ?? hoveredId ?? autoExpandedId

  const activeDispute = useMemo(() => {
    return caseData?.disputes.find((dispute) => dispute.id === activeId) ?? null
  }, [activeId, caseData?.disputes])

  const activeEvidence = useMemo(() => {
    if (!activeDispute) {
      return []
    }

    return evidenceDefinitions.filter((evidence) => evidence.proves.includes(activeDispute.id))
  }, [activeDispute, evidenceDefinitions])

  if (!caseData || caseData.disputes.length === 0) {
    return null
  }

  return (
    <div className="pc-dispute-ribbon">
      <div className="pc-dispute-ribbon__bar">
        <span className="pc-dispute-ribbon__label">쟁점</span>
        <div className="pc-dispute-ribbon__track">
          {caseData.disputes.map((dispute, index) => {
            const isActive = activeId === dispute.id
            const isPinned = pinnedId === dispute.id
            const isFocused = lastFocusedDisputeId === dispute.id
            const lieState = getMaxLieState(dispute.id)

            return (
              <button
                className={`pc-dispute-ribbon__chip${isActive ? ' is-active' : ''}${isPinned ? ' is-pinned' : ''}${isFocused ? ' is-focused' : ''}${flashId === dispute.id ? ' is-flash' : ''}`}
                key={dispute.id}
                onClick={() => {
                  setLastFocusedDisputeId(dispute.id)
                  setPinnedId((current) => (current === dispute.id ? null : dispute.id))
                  if (pinnedId === dispute.id) {
                    setAutoExpandedId(null)
                  }
                }}
                onMouseEnter={() => {
                  if (!pinnedId) {
                    setHoveredId(dispute.id)
                  }
                }}
                onMouseLeave={() => {
                  if (!pinnedId) {
                    setHoveredId((current) => (current === dispute.id ? null : current))
                  }
                }}
                title={dispute.name}
                type="button"
              >
                <span className="pc-dispute-ribbon__chip-index">{String(index + 1).padStart(2, '0')}</span>
                {isActive ? <span className="pc-dispute-ribbon__chip-title">{dispute.name}</span> : null}
                <span className={`pc-dispute-ribbon__chip-state ${getLieClassName(lieState)}`}>{lieState}</span>
              </button>
            )
          })}
        </div>
      </div>

      {activeDispute ? (
        <div
          className={`pc-dispute-ribbon__popover${flashId === activeDispute.id ? ' is-flash' : ''}`}
          onMouseEnter={() => {
            if (!pinnedId) {
              setHoveredId(activeDispute.id)
            }
          }}
          onMouseLeave={() => {
            if (!pinnedId) {
              setHoveredId(null)
            }
          }}
        >
          <div className="pc-dispute-ribbon__popover-head">
            <strong>{activeDispute.name}</strong>
            <span className={`pc-dispute-ribbon__state ${getLieClassName(getMaxLieState(activeDispute.id))}`}>
              {getMaxLieState(activeDispute.id)}
            </span>
          </div>
          <p className="pc-dispute-ribbon__popover-copy">{activeDispute.truthDescription}</p>
          <div className="pc-dispute-ribbon__evidence-list">
            {activeEvidence.map((evidence) => {
              const unlocked = evidenceStates[evidence.id]?.unlocked ?? false
              return (
                <button
                  className={`pc-dispute-ribbon__evidence${unlocked ? '' : ' is-locked'}`}
                  key={evidence.id}
                  onClick={() => {
                    if (unlocked) {
                      setPendingEvidenceView(evidence.id)
                    }
                  }}
                  type="button"
                >
                  <PCSvgIcon id={getPcEvidenceSymbolId(evidence.type)} size={14} />
                  <span>{evidence.surfaceName ?? evidence.name}</span>
                  {!unlocked ? <small>잠금</small> : null}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
