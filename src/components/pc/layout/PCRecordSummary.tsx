import { useMemo } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { AgentState } from '../../../types/agent'
import type { CaseData } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { hasContradictionComparison } from '../../../utils/contradiction'
import type { TruthJudgment } from '../../../types/discovery'

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
      return `${partyA} 쪽 주장이 더 설득력 있다고 판단했습니다.`
    case 'believe_b':
      return `${partyB} 쪽 주장이 더 설득력 있다고 판단했습니다.`
    case 'both_partial':
      return '양쪽 주장에 각각 사실과 과장이 섞여 있다고 판단했습니다.'
    case 'undetermined':
      return '아직 판단을 보류했습니다.'
    default:
      return '판단 기록이 남아 있습니다.'
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
  const calledWitnesses = useStore((s) => s.calledWitnesses)

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
        label: '쟁점 공개',
        achieved: visibleDisputes.length,
        total: caseData.disputes.length,
        detail: hiddenDisputeCount > 0 ? `숨겨진 쟁점 ${hiddenDisputeCount}개 남음` : '모든 쟁점이 열렸습니다',
      },
      {
        label: '진실파악 완료',
        achieved: truthCompleteCount,
        total: caseData.disputes.length,
        detail: '쟁점별 5단계 도달 기준',
      },
      {
        label: '증거 해금',
        achieved: unlockedEvidenceCount,
        total: caseData.evidence.length,
        detail: '좌측 증거 목록에 열린 증거',
      },
      {
        label: '증거 조사',
        achieved: completedEvidenceStages,
        total: totalEvidenceStages,
        detail: '증거별 조사 단계 합산',
      },
      {
        label: '증거 제시',
        achieved: presentedEvidenceCount,
        total: caseData.evidence.length,
        detail: '심문 중 당사자에게 제시한 증거',
      },
      {
        label: '증인 심문',
        achieved: calledWitnessCount,
        total: witnessTotal,
        detail: witnessTotal > 0 ? '소환 완료한 증인 수' : '이 사건의 등록 증인이 없습니다',
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
            : `${dispute.name}: 진실파악 5단계에 도달했습니다.`,
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
          text: `${dispute.name}: ${getJudgmentLabel(judgment.judgment, caseData)} 진실파악 ${stage}/5`,
          confirmed: stage >= 5,
        }
      })
      .filter((item): item is { text: string; confirmed: boolean } => Boolean(item))
  }, [agentA, agentB, caseData, judgments, visibleDisputes])

  const unresolvedQuestions = useMemo(() => {
    if (!caseData) return []
    const questions: string[] = []

    if (hiddenDisputeCount > 0) {
      questions.push(`아직 드러나지 않은 쟁점 ${hiddenDisputeCount}개가 남아 있습니다.`)
    }

    for (const dispute of visibleDisputes) {
      const stage = getMaxTruthStage(dispute.id, agentA, agentB)
      const judgment = judgments[dispute.id]
      if (stage < 5) {
        if (judgment && judgment.judgment !== 'undetermined') {
          questions.push(`${dispute.name}: 내 판단은 기록됐지만 진실파악은 ${stage}/5입니다. 반대 진술이나 추가 증거로 검증해야 합니다.`)
        } else {
          questions.push(`${dispute.name}: 아직 판단 기록이 없습니다. 당사자 진술, 증거 제시, 증인 심문 중 하나로 기준을 세워야 합니다.`)
        }
      }
    }

    const incompleteEvidence = caseData.evidence.filter((evidence) => {
      const total = getEvidenceStageTotal(evidence)
      const done = evidenceStates[evidence.id]?.investigatedActions?.length ?? 0
      return evidenceStates[evidence.id]?.unlocked && done < total
    })
    if (incompleteEvidence.length > 0) {
      questions.push(`추가 조사 가능한 증거 ${incompleteEvidence.length}개가 남아 있습니다.`)
    }

    const lockedEvidence = caseData.evidence.filter((evidence) => !evidenceStates[evidence.id]?.unlocked)
    if (lockedEvidence.length > 0) {
      questions.push(`아직 해금되지 않은 증거 ${lockedEvidence.length}개가 남아 있습니다.`)
    }

    const unpresentedEvidence = caseData.evidence.filter((evidence) => {
      const state = evidenceStates[evidence.id]
      return state?.unlocked && !state.presented
    })
    if (unpresentedEvidence.length > 0) {
      questions.push(`열렸지만 당사자에게 제시하지 않은 증거 ${unpresentedEvidence.length}개가 남아 있습니다.`)
    }

    const uncalledWitnesses = caseData.duo.socialGraph.filter((witness) => !calledWitnesses.includes(witness.id))
    if (uncalledWitnesses.length > 0) {
      questions.push(`아직 심문하지 않은 증인 ${uncalledWitnesses.length}명이 남아 있습니다.`)
    }

    return questions
  }, [agentA, agentB, calledWitnesses, caseData, evidenceStates, hiddenDisputeCount, judgments, visibleDisputes])

  return (
    <div className="pc-record-summary">
      <div className="pc-record-summary__backdrop" onClick={onClose} />
      <div className="pc-record-summary__panel">
        <div className="pc-record-summary__header">
          <PCSvgIcon id="i-doc" size={20} />
          <h2>기록 정리</h2>
          <button className="pc-record-summary__close" onClick={onClose} type="button" aria-label="닫기">
            <PCSvgIcon id="i-plus" size={14} />
          </button>
        </div>

        <div className="pc-record-summary__body">
          <section className="pc-record-summary__section pc-record-summary__section--progress">
            <h3><PCSvgIcon id="i-search" size={14} /> 클리어 진행 현황</h3>
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
            <h3><PCSvgIcon id="i-shield" size={14} /> 확인된 사실 <span className="pc-record-summary__count">{confirmedFacts.length}/{visibleDisputes.length}</span></h3>
            {confirmedFacts.length === 0 ? (
              <p className="pc-record-summary__empty">아직 쟁점 단위로 확정된 진실이 없습니다.</p>
            ) : confirmedFacts.map((fact, index) => (
              <div className={`pc-record-summary__item ${fact.confirmed ? 'is-confirmed' : 'is-partial'}`} key={`${fact.text}-${index}`}>
                <span>{fact.confirmed ? '✓' : '판'}</span>
                <span>{fact.text}</span>
              </div>
            ))}
          </section>

          <section className="pc-record-summary__section">
            <h3><PCSvgIcon id="i-scale" size={14} /> 내 판단 <span className="pc-record-summary__count">{myJudgments.length}</span></h3>
            {myJudgments.length === 0 ? (
              <p className="pc-record-summary__empty">아직 재판관 판단으로 정리한 쟁점이 없습니다.</p>
            ) : myJudgments.map((judgment, index) => (
              <div className={`pc-record-summary__item ${judgment.confirmed ? 'is-confirmed' : 'is-partial'}`} key={`${judgment.text}-${index}`}>
                <span>{judgment.confirmed ? '확' : '판'}</span>
                <span>{judgment.text}</span>
              </div>
            ))}
          </section>

          <section className="pc-record-summary__section">
            <h3><PCSvgIcon id="i-search" size={14} /> 미해결 의문 <span className="pc-record-summary__count">{unresolvedQuestions.length}</span></h3>
            {unresolvedQuestions.length === 0 ? (
              <p className="pc-record-summary__empty">전체 사건 기준으로 남은 쟁점, 증거, 증인 확인 항목이 없습니다.</p>
            ) : unresolvedQuestions.map((question, index) => (
              <div className="pc-record-summary__item is-question" key={`${question}-${index}`}>
                <span>?</span>
                <span>{question}</span>
              </div>
            ))}
          </section>

          <section className="pc-record-summary__section">
            <h3><PCSvgIcon id="i-bolt" size={14} /> 모순 발견 <span className="pc-record-summary__count">{contradictions.length}</span></h3>
            {contradictions.length === 0 ? (
              <p className="pc-record-summary__empty">아직 비교 가능한 발언 충돌은 없습니다. 같은 쟁점에서 다른 질문 유형이나 증거 제시로 진술 변화를 확인하세요.</p>
            ) : contradictions.map((contradiction, index) => (
              <div className="pc-record-summary__item is-contradiction" key={`${contradiction.previous}-${index}`}>
                <span>!</span>
                <span>&ldquo;{contradiction.previous}&rdquo; ↔ &ldquo;{contradiction.current}&rdquo; {contradiction.reason ? `- ${contradiction.reason}` : ''} 다음 행동: 추궁하기로 비교를 확정하세요.</span>
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
