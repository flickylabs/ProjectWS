import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Phase } from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
import type { CaseData, LieState, LieStateEntry } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcEvidenceSymbolId } from '../icons/pcIconUtils'
import { useI18n } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'
import { PC_DISPUTE_RIBBON_EXPAND_EVENT, type DisputeRibbonExpandDetail } from './disputeRibbonEvents'
import { PC_VERDICT_CTA_COLLAPSED_EVENT } from './verdictAdvanceEvents'
import { requestVerdictAdvance } from './verdictAdvancePrompt'

const LIE_STATES: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']

function getLieClassName(state: LieState) {
  if (state === 'S0') return 'dp-0'
  if (state === 'S1') return 'dp-1'
  if (state === 'S2') return 'dp-2'
  return 'dp-3'
}

function getTruthFactForDispute(caseData: CaseData, disputeId: string): string | null {
  const index = caseData.disputes.findIndex((dispute) => dispute.id === disputeId)
  if (index < 0) return null
  return caseData.truthTable[index]?.fact ?? null
}

export default function PCDisputeRibbon() {
  const { locale, t } = useI18n()
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const setLastFocusedDisputeId = useStore((s) => s.setLastFocusedDisputeId)
  const setPendingEvidenceView = useStore((s) => s.setPendingEvidenceView)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  // [B-17 D-5] 아직 처리 안 된 pending feedback 메시지의 관련 쟁점 → 탑바 chip 깜빡 유도
  const dialogueLog = useStore((s) => s.dialogueLog)
  const dialoguePendingFeedback = useStore((s) => s.dialoguePendingFeedback)
  const turnCount = useStore((s) => s.turnCount)
  const currentPhase = useStore((s) => s.currentPhase)
  const urgentPendingDisputeIds = useMemo(() => {
    const ids = new Set<string>()
    for (const dlg of dialogueLog) {
      const pf = dialoguePendingFeedback[dlg.id]
      if (!pf || pf.consumed) continue
      const expireAfter = pf.expireAfterTurns ?? 5
      if (turnCount - pf.createdTurn >= expireAfter) continue
      for (const dId of dlg.relatedDisputes ?? []) ids.add(dId)
    }
    return ids
  }, [dialogueLog, dialoguePendingFeedback, turnCount])

  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [autoExpandedId, setAutoExpandedId] = useState<string | null>(null)
  const [vfxExpandedId, setVfxExpandedId] = useState<string | null>(null)
  const [flashId, setFlashId] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [verdictCtaCollapsed, setVerdictCtaCollapsed] = useState(false)

  useLayoutEffect(() => {
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
  }, [lastFocusedDisputeId, pinnedId, turnCount])

  useEffect(() => {
    let timer: number | null = null

    const handleExpandForVfx = (event: Event) => {
      const disputeId = (event as CustomEvent<DisputeRibbonExpandDetail>).detail?.disputeId
      if (!disputeId) return

      if (timer != null) {
        window.clearTimeout(timer)
      }

      setCollapsed(false)
      setVfxExpandedId(disputeId)
      setFlashId(disputeId)
      setAutoExpandedId(disputeId)

      timer = window.setTimeout(() => {
        setVfxExpandedId((current) => (current === disputeId ? null : current))
        setFlashId((current) => (current === disputeId ? null : current))
        setAutoExpandedId((current) => (current === disputeId ? null : current))
        timer = null
      }, 2400)
    }

    window.addEventListener(PC_DISPUTE_RIBBON_EXPAND_EVENT, handleExpandForVfx)
    return () => {
      if (timer != null) {
        window.clearTimeout(timer)
      }
      window.removeEventListener(PC_DISPUTE_RIBBON_EXPAND_EVENT, handleExpandForVfx)
    }
  }, [])

  const canShowCollapsedVerdictCta = useMemo(() => {
    if (currentPhase !== Phase.Interrogation) return false
    return useGameStore.getState().canAdvancePhase()
  }, [agentA, agentB, caseData, currentPhase, disputeVisibility, turnCount])

  useEffect(() => {
    const handleCollapsed = () => setVerdictCtaCollapsed(true)
    window.addEventListener(PC_VERDICT_CTA_COLLAPSED_EVENT, handleCollapsed)
    return () => window.removeEventListener(PC_VERDICT_CTA_COLLAPSED_EVENT, handleCollapsed)
  }, [])

  useEffect(() => {
    if (!canShowCollapsedVerdictCta) {
      setVerdictCtaCollapsed(false)
    }
  }, [canShowCollapsedVerdictCta, currentPhase])

  const getMaxLieState = (disputeId: string): LieState => {
    const entryA = agentA.lieStateMap[disputeId] as LieStateEntry | undefined
    const entryB = agentB.lieStateMap[disputeId] as LieStateEntry | undefined
    const stateA = entryA?.currentState ?? 'S0'
    const stateB = entryB?.currentState ?? 'S0'
    return LIE_STATES.indexOf(stateA) >= LIE_STATES.indexOf(stateB) ? stateA : stateB
  }

  const activeId = vfxExpandedId ?? pinnedId ?? hoveredId ?? autoExpandedId

  const activeDispute = useMemo(() => {
    return caseData?.disputes.find((dispute) => dispute.id === activeId) ?? null
  }, [activeId, caseData?.disputes])

  const activeEvidence = useMemo(() => {
    if (!activeDispute) {
      return []
    }

    return evidenceDefinitions.filter((evidence) => evidence.proves.includes(activeDispute.id))
  }, [activeDispute, evidenceDefinitions])

  const activeLieState = activeDispute ? getMaxLieState(activeDispute.id) : 'S0'
  const activeTruthFact = activeDispute && caseData && activeLieState === 'S5'
    ? getTruthFactForDispute(caseData, activeDispute.id) ?? activeDispute.truthDescription
    : null

  if (!caseData || caseData.disputes.length === 0) {
    return null
  }

  return (
    <div className={`pc-dispute-ribbon${collapsed ? ' is-collapsed' : ''}`}>
      <div className="pc-dispute-ribbon__bar">
        <button
          className="pc-dispute-ribbon__toggle"
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? t('pc.disputeRibbon.open') : t('pc.disputeRibbon.close')}
          type="button"
        >
          <span className="pc-dispute-ribbon__label">{t('pc.disputeRibbon.label')}</span>
          <span className="pc-dispute-ribbon__arrow">{collapsed ? '▼' : '▲'}</span>
        </button>
        <div className="pc-dispute-ribbon__track">
          {caseData.disputes.filter((d) => { const v = disputeVisibility[d.id]; return !v || v.visibility !== 'hidden' }).map((dispute, index) => {
            const isActive = activeId === dispute.id
            const isPinned = pinnedId === dispute.id
            const isFocused = lastFocusedDisputeId === dispute.id
            const lieState = getMaxLieState(dispute.id)
            const disputeName = localizeRuntimeText(dispute.name, locale)

            const isUrgentPending = urgentPendingDisputeIds.has(dispute.id)

            return (
              <button
                className={`pc-dispute-ribbon__chip${isActive ? ' is-active' : ''}${isPinned ? ' is-pinned' : ''}${isFocused ? ' is-focused' : ''}${flashId === dispute.id ? ' is-flash' : ''}${isUrgentPending ? ' is-pending-urgent' : ''}`}
                data-dispute-id={dispute.id}
                data-tutorial-target={dispute.id === 'd-1' ? 'dispute-d1-chip' : undefined}
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
                title={disputeName}
                type="button"
              >
                <span className="pc-dispute-ribbon__chip-index">{String(index + 1).padStart(2, '0')}</span>
                {isActive ? <span className="pc-dispute-ribbon__chip-title">{disputeName}</span> : null}
                <span className={`pc-dispute-ribbon__chip-state ${getLieClassName(lieState)}`}>{lieState}</span>
              </button>
            )
          })}
        </div>
        {verdictCtaCollapsed && canShowCollapsedVerdictCta ? (
          <button
            className="pc-dispute-ribbon__verdict-cta"
            onClick={requestVerdictAdvance}
            type="button"
          >
            <PCSvgIcon id="i-scale" size={14} />
            <span>{t('pc.disputeRibbon.verdictProceed')}</span>
          </button>
        ) : null}
      </div>

      {activeDispute ? (
        <div
          className={`pc-dispute-ribbon__popover${flashId === activeDispute.id ? ' is-flash' : ''}${hoveredId === activeDispute.id ? ' is-hovered' : ''}${pinnedId === activeDispute.id ? ' is-pinned' : ''}`}
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
            <strong>{localizeRuntimeText(activeDispute.name, locale)}</strong>
            <span className={`pc-dispute-ribbon__state ${getLieClassName(activeLieState)}`}>
              {activeLieState}
            </span>
          </div>
          {activeTruthFact ? (
            <div className="pc-dispute-ribbon__truth-revealed-tag" aria-hidden="true">
              <PCSvgIcon id="i-shield" size={11} />
              <span>{t('pc.disputeRibbon.truthRevealed')}</span>
            </div>
          ) : null}
          <p className={`pc-dispute-ribbon__popover-copy${activeTruthFact ? ' pc-dispute-ribbon__popover-copy--truth' : ' pc-dispute-ribbon__popover-copy--muted'}`}>
            {activeTruthFact ? localizeRuntimeText(activeTruthFact, locale) : t('pc.disputeRibbon.revealTruth')}
          </p>
          <div className="pc-dispute-ribbon__evidence-list">
            {activeEvidence.map((evidence) => {
              const unlocked = evidenceStates[evidence.id]?.unlocked ?? false
              const evidenceName = localizeRuntimeText(evidence.surfaceName ?? evidence.name, locale)
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
                  <span>{unlocked ? evidenceName : '???'}</span>
                  {!unlocked ? <small>{t('pc.common.locked')}</small> : null}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
