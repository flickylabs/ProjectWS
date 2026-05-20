import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { AgentState } from '../../../types/agent'
import type { CaseData } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { hasContradictionComparison } from '../../../utils/contradiction'
import { shouldBypassSpaceDismiss } from '../../../utils/keyboardDismiss'
import type { TruthJudgment } from '../../../types/discovery'
import { translate } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'

const LIE_STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5'] as const

type Dispute = CaseData['disputes'][number]
type Evidence = CaseData['evidence'][number]
type DisputeVisibilityMap = Record<string, { visibility?: string }>

interface ProgressRow {
  label: string
  achieved: number
  total: number
  detail: string
}

interface JudgmentSummaryItem {
  disputeId: string
  disputeName: string
  judgment: TruthJudgment
  text: string
  confirmed: boolean
  stage: number
}

const JUDGMENT_OPTIONS: TruthJudgment[] = ['believe_a', 'believe_b', 'both_partial', 'undetermined']

function stateIndex(state: string): number {
  return Math.max(LIE_STATES.indexOf(state as (typeof LIE_STATES)[number]), 0)
}

function getMaxTruthStage(disputeId: string, agentA: AgentState, agentB: AgentState): number {
  const stateA = agentA.lieStateMap[disputeId]?.currentState ?? 'S0'
  const stateB = agentB.lieStateMap[disputeId]?.currentState ?? 'S0'
  return Math.max(stateIndex(stateA), stateIndex(stateB))
}

function isDisputeVisible(dispute: Dispute, visibility: DisputeVisibilityMap): boolean {
  const entry = visibility[dispute.id]
  if (entry) return entry.visibility !== 'hidden'
  return !dispute.hidden && dispute.v3Visibility !== 'hidden'
}

function getEvidenceStageTotal(evidence: Evidence): number {
  return Math.max(evidence.investigationStages?.length ?? 0, 1)
}

function formatCount(row: ProgressRow): string {
  return `${row.achieved}/${row.total}`
}

function getJudgmentLabel(judgment: TruthJudgment, caseData: CaseData): string {
  const partyA = caseData.duo.partyA.name
  const partyB = caseData.duo.partyB.name

  switch (judgment) {
    case 'believe_a':
      return translate('pc.recordSummary.moreConvincing', { party: partyA })
    case 'believe_b':
      return translate('pc.recordSummary.moreConvincing', { party: partyB })
    case 'both_partial':
      return translate('pc.record.judgment.bothPartial')
    case 'undetermined':
      return translate('pc.record.judgment.undetermined')
    default:
      return translate('pc.record.judgment.default')
  }
}

function getTruthFactForDispute(caseData: CaseData, disputeId: string): string | null {
  const index = caseData.disputes.findIndex((dispute) => dispute.id === disputeId)
  if (index < 0) return null
  return caseData.truthTable[index]?.fact ?? null
}

export default function PCRecordSummary({ onClose }: { onClose: () => void }) {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const dialogueLog = useStore((s) => s.dialogueLog)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  const judgments = useStore((s) => s.discovery.judgments)
  const reviseJudgment = useStore((s) => s.reviseJudgment)
  const turnCount = useStore((s) => s.turnCount)
  const calledWitnesses = useStore((s) => s.calledWitnesses)
  const [editingJudgmentId, setEditingJudgmentId] = useState<string | null>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (editingJudgmentId) {
        if (event.key === 'Escape') {
          setEditingJudgmentId(null)
        }
        return
      }
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.code !== 'Space') return
      if (shouldBypassSpaceDismiss(event.target)) return
      event.preventDefault()
      onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [editingJudgmentId, onClose])

  const visibleDisputes = useMemo(() => {
    if (!caseData) return []
    return caseData.disputes.filter((dispute) => isDisputeVisible(dispute, disputeVisibility))
  }, [caseData, disputeVisibility])

  const hiddenDisputeCount = useMemo(() => {
    if (!caseData) return 0
    return caseData.disputes.length - visibleDisputes.length
  }, [caseData, visibleDisputes.length])

  const contradictions = useMemo(() => {
    return dialogueLog
      .filter((entry) => hasContradictionComparison(entry.contradictionMeta))
      .map((entry) => ({
        previous: entry.contradictionMeta!.previousClaim,
        current: entry.contradictionMeta!.currentClaim,
        reason: entry.contradictionMeta!.reason,
      }))
  }, [dialogueLog])

  const progressRows = useMemo<ProgressRow[]>(() => {
    if (!caseData) return []

    const truthCompleteCount = caseData.disputes.filter((dispute) => getMaxTruthStage(dispute.id, agentA, agentB) >= 5).length
    const unlockedEvidenceCount = caseData.evidence.filter((evidence) => evidenceStates[evidence.id]?.unlocked).length
    const presentedEvidenceCount = caseData.evidence.filter((evidence) => evidenceStates[evidence.id]?.presented).length
    const totalEvidenceStages = caseData.evidence.reduce((sum, evidence) => sum + getEvidenceStageTotal(evidence), 0)
    const completedEvidenceStages = caseData.evidence.reduce((sum, evidence) => {
      const total = getEvidenceStageTotal(evidence)
      const completed = evidenceStates[evidence.id]?.investigatedActions?.length ?? 0
      return sum + Math.min(completed, total)
    }, 0)
    const calledWitnessCount = new Set(calledWitnesses).size
    const witnessTotal = caseData.duo.socialGraph.length

    return [
      {
        label: translate('pc.record.progress.disputes.label'),
        achieved: visibleDisputes.length,
        total: caseData.disputes.length,
        detail: hiddenDisputeCount > 0
          ? translate('pc.record.progress.disputes.hidden', { count: hiddenDisputeCount })
          : translate('pc.record.progress.disputes.allOpen'),
      },
      {
        label: translate('pc.record.progress.truth.label'),
        achieved: truthCompleteCount,
        total: caseData.disputes.length,
        detail: translate('pc.record.progress.truth.detail'),
      },
      {
        label: translate('pc.record.progress.evidenceUnlock.label'),
        achieved: unlockedEvidenceCount,
        total: caseData.evidence.length,
        detail: translate('pc.record.progress.evidenceUnlock.detail'),
      },
      {
        label: translate('pc.record.progress.evidenceInvestigation.label'),
        achieved: completedEvidenceStages,
        total: totalEvidenceStages,
        detail: translate('pc.record.progress.evidenceInvestigation.detail'),
      },
      {
        label: translate('pc.record.progress.evidencePresent.label'),
        achieved: presentedEvidenceCount,
        total: caseData.evidence.length,
        detail: translate('pc.record.progress.evidencePresent.detail'),
      },
      {
        label: translate('pc.record.progress.witness.label'),
        achieved: calledWitnessCount,
        total: witnessTotal,
        detail: witnessTotal > 0
          ? translate('pc.record.progress.witness.called')
          : translate('pc.record.progress.witness.none'),
      },
    ]
  }, [agentA, agentB, calledWitnesses, caseData, evidenceStates, hiddenDisputeCount, visibleDisputes.length])

  const confirmedFacts = useMemo(() => {
    if (!caseData) return []
    const facts: { text: string; confirmed: boolean }[] = []

    for (const dispute of visibleDisputes) {
      const stage = getMaxTruthStage(dispute.id, agentA, agentB)

      if (stage >= 5) {
        const truthFact = getTruthFactForDispute(caseData, dispute.id)
        facts.push({
          text: truthFact
            ? `${dispute.name}: ${truthFact}`
            : translate('pc.record.factConfirmed', { dispute: dispute.name }),
          confirmed: true,
        })
      }
    }

    return facts
  }, [agentA, agentB, caseData, visibleDisputes])

  const myJudgments = useMemo(() => {
    if (!caseData) return []
    return visibleDisputes
      .map((dispute) => {
        const judgment = judgments[dispute.id]
        if (!judgment) return null
        const stage = getMaxTruthStage(dispute.id, agentA, agentB)
        return {
          disputeId: dispute.id,
          disputeName: dispute.name,
          judgment: judgment.judgment,
          text: translate('pc.record.judgmentText', {
            dispute: dispute.name,
            judgment: getJudgmentLabel(judgment.judgment, caseData),
            stage,
          }),
          confirmed: stage >= 5,
          stage,
        }
      })
      .filter((item): item is JudgmentSummaryItem => Boolean(item))
  }, [agentA, agentB, caseData, judgments, visibleDisputes])

  const editingJudgment = useMemo(() => {
    return myJudgments.find((item) => item.disputeId === editingJudgmentId) ?? null
  }, [editingJudgmentId, myJudgments])

  const unresolvedQuestions = useMemo(() => {
    if (!caseData) return []
    const questions: string[] = []

    if (hiddenDisputeCount > 0) {
      questions.push(translate('pc.record.unresolved.hiddenDisputes', { count: hiddenDisputeCount }))
    }

    for (const dispute of visibleDisputes) {
      const stage = getMaxTruthStage(dispute.id, agentA, agentB)
      const judgment = judgments[dispute.id]
      if (stage < 5) {
        if (judgment && judgment.judgment !== 'undetermined') {
          questions.push(translate('pc.record.unresolved.partialJudgment', { dispute: dispute.name, stage }))
        } else {
          questions.push(translate('pc.record.unresolved.noJudgment', { dispute: dispute.name }))
        }
      }
    }

    const incompleteEvidence = caseData.evidence.filter((evidence) => {
      const total = getEvidenceStageTotal(evidence)
      const done = evidenceStates[evidence.id]?.investigatedActions?.length ?? 0
      return evidenceStates[evidence.id]?.unlocked && done < total
    })
    if (incompleteEvidence.length > 0) {
      questions.push(translate('pc.record.unresolved.incompleteEvidence', { count: incompleteEvidence.length }))
    }

    const lockedEvidence = caseData.evidence.filter((evidence) => !evidenceStates[evidence.id]?.unlocked)
    if (lockedEvidence.length > 0) {
      questions.push(translate('pc.record.unresolved.lockedEvidence', { count: lockedEvidence.length }))
    }

    const unpresentedEvidence = caseData.evidence.filter((evidence) => {
      const state = evidenceStates[evidence.id]
      return state?.unlocked && !state.presented
    })
    if (unpresentedEvidence.length > 0) {
      questions.push(translate('pc.record.unresolved.unpresentedEvidence', { count: unpresentedEvidence.length }))
    }

    const uncalledWitnesses = caseData.duo.socialGraph.filter((witness) => !calledWitnesses.includes(witness.id))
    if (uncalledWitnesses.length > 0) {
      questions.push(translate('pc.record.unresolved.uncalledWitnesses', { count: uncalledWitnesses.length }))
    }

    return questions
  }, [agentA, agentB, calledWitnesses, caseData, evidenceStates, hiddenDisputeCount, judgments, visibleDisputes])

  return (
    <div className="pc-record-summary" data-tutorial-target="record-summary">
      <div className="pc-record-summary__backdrop" onClick={onClose} />
      <div className="pc-record-summary__panel">
        <div className="pc-record-summary__header">
          <PCSvgIcon id="i-doc" size={20} />
          <h2>{translate('pc.record.title')}</h2>
          <button className="pc-record-summary__close" onClick={onClose} type="button" aria-label={translate('pc.common.close')}>
            <PCSvgIcon id="i-plus" size={14} />
          </button>
        </div>

        <div className="pc-record-summary__body">
          <section className="pc-record-summary__section pc-record-summary__section--progress">
            <h3><PCSvgIcon id="i-search" size={14} /> {translate('pc.record.progressTitle')}</h3>
            <div className="pc-record-summary__progress-grid">
              {progressRows.map((row) => {
                const percent = row.total > 0 ? Math.min(100, Math.round((row.achieved / row.total) * 100)) : 0
                return (
                  <div className="pc-record-summary__progress" key={row.label}>
                    <div className="pc-record-summary__progress-top">
                      <span>{row.label}</span>
                      <strong>{formatCount(row)}</strong>
                    </div>
                    <div className="pc-record-summary__progress-bar" aria-hidden="true">
                      <span style={{ width: `${percent}%` }} />
                    </div>
                    <small>{row.detail}</small>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="pc-record-summary__section">
            <h3><PCSvgIcon id="i-shield" size={14} /> {translate('pc.record.confirmedFacts')} <span className="pc-record-summary__count">{confirmedFacts.length}/{visibleDisputes.length}</span></h3>
            {confirmedFacts.length === 0 ? (
              <p className="pc-record-summary__empty">{translate('pc.record.noConfirmedFacts')}</p>
            ) : confirmedFacts.map((fact, index) => (
              <div className={`pc-record-summary__item ${fact.confirmed ? 'is-confirmed' : 'is-partial'}`} key={`${fact.text}-${index}`}>
                <span>{fact.confirmed ? '✓' : translate('pc.record.icon.judgment')}</span>
                <span>{fact.text}</span>
              </div>
            ))}
          </section>

          <section className="pc-record-summary__section">
            <h3><PCSvgIcon id="i-scale" size={14} /> {translate('pc.record.myJudgment')} <span className="pc-record-summary__count">{myJudgments.length}</span></h3>
            {myJudgments.length === 0 ? (
              <p className="pc-record-summary__empty">{translate('pc.record.noJudgments')}</p>
            ) : myJudgments.map((judgment, index) => (
              <button
                className={`pc-record-summary__item pc-record-summary__item-button ${judgment.confirmed ? 'is-confirmed' : 'is-partial'}`}
                key={`${judgment.disputeId}-${index}`}
                onClick={() => setEditingJudgmentId(judgment.disputeId)}
                type="button"
              >
                <span>{judgment.confirmed ? translate('pc.record.icon.confirmed') : translate('pc.record.icon.judgment')}</span>
                <span>{judgment.text}</span>
                <small>{translate('pc.record.edit')}</small>
              </button>
            ))}
          </section>

          <section className="pc-record-summary__section">
            <h3><PCSvgIcon id="i-search" size={14} /> {translate('pc.record.unresolved')} <span className="pc-record-summary__count">{unresolvedQuestions.length}</span></h3>
            {unresolvedQuestions.length === 0 ? (
              <p className="pc-record-summary__empty">{translate('pc.record.noUnresolved')}</p>
            ) : unresolvedQuestions.map((question, index) => (
              <div className="pc-record-summary__item is-question" key={`${question}-${index}`}>
                <span>?</span>
                <span>{question}</span>
              </div>
            ))}
          </section>

          <section className="pc-record-summary__section">
            <h3><PCSvgIcon id="i-bolt" size={14} /> {translate('pc.record.contradictions')} <span className="pc-record-summary__count">{contradictions.length}</span></h3>
            {contradictions.length === 0 ? (
              <p className="pc-record-summary__empty">{translate('pc.record.noContradictions')}</p>
            ) : contradictions.map((contradiction, index) => (
              <div className="pc-record-summary__item is-contradiction" key={`${contradiction.previous}-${index}`}>
                <span>!</span>
                <span>{translate('pc.record.contradictionAction', {
                  previous: contradiction.previous,
                  current: contradiction.current,
                  reason: contradiction.reason ? `- ${contradiction.reason}` : '',
                })}</span>
              </div>
            ))}
          </section>
        </div>

        <div className="pc-record-summary__footer">
          <button className="pc-record-summary__close-btn pc-event-feedback__dismiss" onClick={onClose} type="button">
            <span>{localizeRuntimeText('확인')}</span>
            <kbd className="pc-event-feedback__kbd">Space</kbd>
          </button>
        </div>
      </div>

      {caseData && editingJudgment ? (
        <div className="pc-record-judgment-modal" role="dialog" aria-label={translate('pc.record.editJudgment')}>
          <div className="pc-record-judgment-modal__backdrop" onClick={() => setEditingJudgmentId(null)} />
          <div className="pc-record-judgment-modal__panel">
            <header className="pc-record-judgment-modal__header">
              <span><PCSvgIcon id="i-scale" size={16} /> {translate('pc.record.editJudgment')}</span>
              <button onClick={() => setEditingJudgmentId(null)} type="button" aria-label={translate('pc.common.close')}>×</button>
            </header>
            <div className="pc-record-judgment-modal__body">
              <p className="pc-record-judgment-modal__eyebrow">{editingJudgment.disputeName}</p>
              <div className="pc-record-judgment-modal__current">
                <span>{translate('pc.record.currentJudgment')}</span>
                <strong>{getJudgmentLabel(editingJudgment.judgment, caseData)}</strong>
                <small>{translate('pc.record.truthStage', { stage: editingJudgment.stage })}</small>
              </div>
              <div className="pc-record-judgment-modal__options">
                {JUDGMENT_OPTIONS.map((option) => {
                  const selected = option === editingJudgment.judgment
                  return (
                    <button
                      className={`pc-record-judgment-modal__option${selected ? ' is-selected' : ''}`}
                      key={option}
                      onClick={() => {
                        if (selected) {
                          setEditingJudgmentId(null)
                          return
                        }
                        reviseJudgment(editingJudgment.disputeId, option, turnCount)
                        setEditingJudgmentId(null)
                      }}
                      type="button"
                    >
                      <span>{selected ? translate('pc.common.current') : translate('pc.common.change')}</span>
                      <strong>{getJudgmentLabel(option, caseData)}</strong>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
