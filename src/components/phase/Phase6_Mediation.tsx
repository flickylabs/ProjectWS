import { useMemo, useState } from 'react'
import { Phase } from '../../types'
import { useGameStore, useStore } from '../../store/useGameStore'
import PCSvgIcon from '../pc/icons/PCSvgIcon'
import PCVerdictReviewMontage from '../pc/verdict/PCVerdictReviewMontage'
import { verdictEntryCutscene } from '../../engine/presentationEngine'
import { getVerdictDisputeGate } from '../../engine/verdictAdvanceGate'
import { useI18n } from '../../i18n'

export default function Phase6_Mediation() {
  const advancePhase = useStore((s) => s.advancePhase)
  const setPhase = useStore((s) => s.setPhase)
  const caseData = useStore((s) => s.caseData)
  const addDialogue = useStore((s) => s.addDialogue)
  const turnCount = useStore((s) => s.turnCount)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const { t } = useI18n()
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
      text: t('pc.mediation.entry.dialogue'),
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
        {/* 2026-05-22 v3.3: 원형 58px mark → 24px 마름모 panel-pin으로 통합. dispute cue color(밝은 골드)
            로 verdict 진입 의미 표지. 다른 모달 marker와 시각 정렬. */}
        <div className="pc-panel-pin pc-panel-pin--dispute" aria-hidden="true">
          <PCSvgIcon id="i-scale" size={13} />
        </div>
        <div className="pc-mediation-entry__eyebrow">{t('pc.mediation.entry.eyebrow')}</div>
        <h2 id="pc-mediation-entry-title">{t('pc.mediation.entry.title')}</h2>
        <p>{t('pc.mediation.entry.body')}</p>

        <div className="pc-mediation-entry__dispute-tags">
          <span className="pc-mediation-entry__tag is-visible">
            {t('pc.mediation.entry.visibleTag', { count: disputeGate.visibleCount })}
          </span>
          {hasHiddenDisputes ? (
            <span className="pc-mediation-entry__tag is-hidden">
              {t('pc.mediation.entry.hiddenTag', { count: disputeGate.hiddenCount })}
            </span>
          ) : null}
        </div>

        {hasUnresolved || hasHiddenDisputes ? (
          <div className="pc-mediation-entry__warning">
            <strong>{t('pc.mediation.entry.warning.title')}</strong>
            <span>{hasHiddenDisputes
              ? t('pc.mediation.entry.warning.hiddenBody')
              : t('pc.mediation.entry.warning.unresolvedBody')}</span>
          </div>
        ) : null}

        <div className="pc-mediation-entry__actions">
          <button type="button" className="pc-mediation-entry__secondary" onClick={() => setPhase(Phase.Interrogation)}>
            {t('pc.mediation.entry.secondary')}
          </button>
          <button type="button" className="pc-mediation-entry__primary" onClick={enterVerdict}>
            {t('pc.mediation.entry.primary')}
          </button>
        </div>
      </section>
    </div>
  )
}
