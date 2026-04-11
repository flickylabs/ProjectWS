import { useMemo, useState } from 'react'
import { loadDriftState, saveDriftState } from '../../../data/leaderboard'
import { completeStage } from '../../../data/campaign'
import { checkAndGrantRewards } from '../../../engine/rewardEngine'
import { playGavel } from '../../../engine/soundEngine'
import { calculateVerdict } from '../../../engine/verdictEngine'
import { deriveCaseProfile, applyDriftUpdate } from '../../../engine/judgeProfileEngine'
import { generateVerdictSummary } from '../../../engine/verdictSummaryEngine'
import { recordGameComplete } from '../../../hooks/useLocalStorage'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { GamePhase } from '../../../types'
import { recordHistory } from '../../layout/HistoryPanel'
import { CAMPAIGN_STAGE_MAP, getCampaignStageKey } from '../../verdict/VerdictScreen'

type VerdictStep = 'fact' | 'responsibility' | 'solution' | 'legality' | 'confirm'
type FlatItem = { step: VerdictStep; subIdx: number }

const STEPS: { id: VerdictStep; label: string }[] = [
  { id: 'fact', label: '사실 인정' },
  { id: 'responsibility', label: '책임 배분' },
  { id: 'solution', label: '해결책' },
  { id: 'legality', label: '증거 적법성' },
  { id: 'confirm', label: '판결 확정' },
]

export default function PCVerdictScreen() {
  const [globalIdx, setGlobalIdx] = useState(0)
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const setVerdictScore = useStore((s) => s.setVerdictScore)
  const setVerdictSummary = useStore((s) => s.setVerdictSummary)
  const advancePhase = useStore((s) => s.advancePhase)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const turnCount = useStore((s) => s.turnCount)
  const resources = useStore((s) => s.resources)

  if (!caseData) {
    return null
  }

  const disputes = caseData.disputes
  const activeDisputes = disputes.filter(
    (item) => verdictInput.factFindings[item.id] && verdictInput.factFindings[item.id] !== 'pending',
  )
  const solutionCategories = Object.keys(caseData.solutions)
  const factCount = Object.keys(verdictInput.factFindings).length
  const allFactsJudged = factCount >= disputes.length
  const hasLegalityIssue = caseData.evidence.some(
    (item) => (item.legitimacy !== 'lawful' || evidenceStates[item.id]?.confidentialSource) && evidenceStates[item.id]?.presented,
  )

  const flatSteps: FlatItem[] = useMemo(
    () => [
      ...disputes.map((_, index) => ({ step: 'fact' as VerdictStep, subIdx: index })),
      ...activeDisputes.map((_, index) => ({ step: 'responsibility' as VerdictStep, subIdx: index })),
      ...solutionCategories.map((_, index) => ({ step: 'solution' as VerdictStep, subIdx: index })),
      ...(hasLegalityIssue ? [{ step: 'legality' as VerdictStep, subIdx: 0 }] : []),
      { step: 'confirm' as VerdictStep, subIdx: 0 },
    ],
    [activeDisputes, disputes, hasLegalityIssue, solutionCategories],
  )

  const safeGlobalIdx = Math.min(globalIdx, flatSteps.length - 1)
  const current = flatSteps[safeGlobalIdx]
  const currentStep = current.step
  const visibleSteps = STEPS.filter((item) => item.id !== 'legality' || hasLegalityIssue)

  const currentStepIndex = visibleSteps.findIndex((item) => item.id === currentStep)

  const handleSubmit = () => {
    playGavel()
    const processMetrics = useGameStore.getState().processMetrics
    const score = calculateVerdict({
      disputes: caseData.disputes,
      evidence: caseData.evidence,
      evidenceStates,
      input: verdictInput,
      turnsUsed: turnCount,
      courtControlRemaining: resources.courtControl,
      processMetrics,
    })

    setVerdictScore(score)

    const keyEvidenceNames = caseData.evidence
      .filter((item) => evidenceStates[item.id]?.presented)
      .map((item) => item.name)

    const state = useGameStore.getState()
    let keyTransition: { party: string; from: string; to: string } | null = null

    for (const value of Object.values(state.agentA.lieStateMap)) {
      if (value.currentState === 'S5') {
        keyTransition = { party: caseData.duo.partyA.name, from: 'S4', to: 'S5' }
        break
      }
    }

    if (!keyTransition) {
      for (const value of Object.values(state.agentB.lieStateMap)) {
        if (value.currentState === 'S5') {
          keyTransition = { party: caseData.duo.partyB.name, from: 'S4', to: 'S5' }
          break
        }
      }
    }

    const responsibilityEntries = Object.values(verdictInput.responsibility) as { a: number; b: number }[]
    const avgPercentA = responsibilityEntries.length > 0
      ? Math.round(responsibilityEntries.reduce((sum, item) => sum + item.a, 0) / responsibilityEntries.length)
      : 50

    const judgeTitle = score.total >= 90
      ? '전설적인 재판관'
      : score.total >= 75
        ? '훌륭한 재판관'
        : score.total >= 60
          ? '능숙한 재판관'
          : score.total >= 40
            ? '보통의 재판관'
            : '미숙한 재판관'

    const summary = generateVerdictSummary({
      caseName: caseData.context.description || caseData.caseId,
      partyAName: caseData.duo.partyA.name,
      partyBName: caseData.duo.partyB.name,
      percentA: avgPercentA,
      selectedSolution: verdictInput.selectedSolutions.join(', ') || '미선택',
      keyEvidenceNames,
      keyTransition,
      judgeTitle,
      totalTurns: turnCount,
      contradictionsFound: processMetrics.lieTransitions,
    })
    setVerdictSummary(summary)

    recordGameComplete(caseData.caseId, score.total)

    const disputeNames: Record<string, string> = {}
    caseData.disputes.forEach((item) => {
      disputeNames[item.id] = item.name
    })

    const caseTelemetry = deriveCaseProfile(
      verdictInput,
      processMetrics,
      caseData.disputes.map((item) => ({
        id: item.id,
        ambiguity: item.ambiguity,
        truth: item.truth ?? true,
      })),
      caseData.caseId,
      caseData.solutions,
    )

    const currentDrift = loadDriftState()
    const newDrift = applyDriftUpdate(
      currentDrift,
      caseTelemetry,
      processMetrics,
      verdictInput.selectedSolutions.length,
    )
    saveDriftState(newDrift)

    recordHistory({
      caseId: caseData.caseId,
      score: score.total,
      insight: score.insight,
      authority: score.authority,
      wisdom: score.wisdom,
      relationshipType: caseData.duo.relationshipType,
      nameA: caseData.duo.partyA.name,
      nameB: caseData.duo.partyB.name,
      verdictDetail: {
        factFindings: { ...verdictInput.factFindings },
        responsibility: { ...verdictInput.responsibility },
        selectedSolutions: [...verdictInput.selectedSolutions],
        disputeNames,
      },
      caseTelemetry,
    })

    const stageKey = getCampaignStageKey(caseData.caseId, caseData.meta?.relationshipType ?? caseData.duo.relationshipType)
    const stage = CAMPAIGN_STAGE_MAP[stageKey]
    if (stage) {
      completeStage(stage, score.total)
    }

    checkAndGrantRewards()
    advancePhase(GamePhase.Result)
  }

  const summaryDisputes = caseData.disputes.map((item) => {
    const fact = verdictInput.factFindings[item.id]
    const responsibility = verdictInput.responsibility[item.id]
    return {
      id: item.id,
      name: item.name,
      fact,
      responsibility,
    }
  })

  return (
    <div className="pc-verdict-screen">
      <div className="pc-verdict-shell">
        <aside className="pc-verdict-sidebar">
          <div className="pc-verdict-sidebar__eyebrow">VERDICT STUDIO</div>
          <h1>최종 판결</h1>
          <p className="pc-verdict-sidebar__summary">{caseData.context.description}</p>

          <div className="pc-verdict-sidebar__meta">
            <div className="pc-verdict-sidebar__meta-card">
              <span>쟁점</span>
              <strong>{caseData.disputes.length}개</strong>
            </div>
            <div className="pc-verdict-sidebar__meta-card">
              <span>선택 해결책</span>
              <strong>{verdictInput.selectedSolutions.length}개</strong>
            </div>
            <div className="pc-verdict-sidebar__meta-card">
              <span>턴</span>
              <strong>{turnCount}</strong>
            </div>
          </div>

          <div className="pc-verdict-sidebar__steps">
            {visibleSteps.map((item, index) => (
              <button
                className={`pc-verdict-step-link${currentStep === item.id ? ' is-active' : currentStepIndex > index ? ' is-done' : ''}`}
                key={item.id}
                onClick={() => {
                  const nextIdx = flatSteps.findIndex((step) => step.step === item.id)
                  if (nextIdx >= 0) setGlobalIdx(nextIdx)
                }}
                type="button"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.label}</strong>
              </button>
            ))}
          </div>
        </aside>

        <section className="pc-verdict-main">
          <div className="pc-verdict-rail">
            {visibleSteps.map((item, index) => (
              <button
                className={`pc-verdict-rail__chip${currentStep === item.id ? ' is-active' : currentStepIndex > index ? ' is-done' : ''}`}
                key={item.id}
                onClick={() => {
                  const nextIdx = flatSteps.findIndex((step) => step.step === item.id)
                  if (nextIdx >= 0) setGlobalIdx(nextIdx)
                }}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pc-verdict-stage">
            {currentStep === 'fact' ? (() => {
              const dispute = disputes[current.subIdx]
              if (!dispute) return null
              const currentFinding = verdictInput.factFindings[dispute.id]
              return (
                <div className="pc-verdict-fact">
                  <div className="pc-verdict-fact__header">
                    <span className="pc-verdict-fact__num">{current.subIdx + 1}/{disputes.length}</span>
                    <h2 className="pc-verdict-fact__title">{dispute.name}</h2>
                    <p className="pc-verdict-fact__desc">{dispute.truthDescription}</p>
                  </div>
                  <div className="pc-verdict-fact__buttons">
                    {(['false', 'pending', 'true'] as const).map((value) => {
                      const labels = { false: '아니다', pending: '모르겠다', true: '그렇다' }
                      const active = currentFinding === value
                      return (
                        <button
                          className={`pc-verdict-fact__btn is-${value}${active ? ' is-active' : ''}`}
                          key={value}
                          onClick={() => {
                            useGameStore.getState().setFactFinding(dispute.id, value)
                            if (current.subIdx < disputes.length - 1) {
                              const nextIdx = flatSteps.findIndex((s) => s.step === 'fact' && s.subIdx === current.subIdx + 1)
                              if (nextIdx >= 0) setGlobalIdx(nextIdx)
                            }
                          }}
                          type="button"
                        >
                          {labels[value]}
                        </button>
                      )
                    })}
                  </div>
                  <div className="pc-verdict-fact__dots">
                    {disputes.map((d, i) => {
                      const f = verdictInput.factFindings[d.id]
                      return (
                        <button
                          className={`pc-verdict-fact__dot ${f === 'true' ? 'is-true' : f === 'false' ? 'is-false' : f === 'pending' ? 'is-pending' : ''} ${i === current.subIdx ? 'is-current' : ''}`}
                          key={d.id}
                          onClick={() => {
                            const idx = flatSteps.findIndex((s) => s.step === 'fact' && s.subIdx === i)
                            if (idx >= 0) setGlobalIdx(idx)
                          }}
                          type="button"
                        >
                          {i + 1}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })() : null}

            {currentStep === 'responsibility' ? (() => {
              const dispute = activeDisputes[current.subIdx]
              if (!dispute) return null
              const resp = verdictInput.responsibility[dispute.id] ?? { a: 50, b: 50 }
              return (
                <div className="pc-verdict-resp">
                  <h2 className="pc-verdict-resp__title">{dispute.name}</h2>
                  <div className="pc-verdict-resp__slider-area">
                    <span className="pc-verdict-resp__label is-a">{caseData.duo.partyA.name}</span>
                    <div className="pc-verdict-resp__track">
                      <input
                        className="pc-verdict-resp__input"
                        max={100}
                        min={0}
                        onChange={(e) => {
                          const a = Number(e.target.value)
                          useGameStore.getState().setResponsibility(dispute.id, a, 100 - a)
                        }}
                        type="range"
                        value={resp.a}
                      />
                      <div className="pc-verdict-resp__fill" style={{ width: `${resp.a}%` }} />
                    </div>
                    <span className="pc-verdict-resp__label is-b">{caseData.duo.partyB.name}</span>
                  </div>
                  <div className="pc-verdict-resp__percent">
                    <span className="is-a">{resp.a}%</span>
                    <span className="is-b">{resp.b}%</span>
                  </div>
                </div>
              )
            })() : null}

            {currentStep === 'solution' ? (() => {
              const catKey = solutionCategories[current.subIdx]
              const options = caseData.solutions[catKey] ?? []
              return (
                <div className="pc-verdict-solution">
                  <h2 className="pc-verdict-solution__title">해결책 선택</h2>
                  <div className="pc-verdict-solution__grid">
                    {options.map((opt, i) => {
                      const selected = verdictInput.selectedSolutions.includes(opt)
                      return (
                        <button
                          className={`pc-verdict-solution__card${selected ? ' is-selected' : ''}`}
                          key={i}
                          onClick={() => {
                        const store = useGameStore.getState()
                        if (selected) { store.removeSolution(opt) } else { store.selectSolution(opt) }
                      }}
                          type="button"
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })() : null}

            {currentStep === 'legality' ? (
              <div className="pc-verdict-legality">
                <h2>증거 적법성 검토</h2>
                <p>제시된 증거 중 적법성이 의심되는 항목이 있습니다.</p>
              </div>
            ) : null}

            {currentStep === 'confirm' ? (
              <div className="pc-verdict-confirm">
                <div className="pc-verdict-confirm__hero">
                  <div className="pc-verdict-confirm__eyebrow">FINAL REVIEW</div>
                  <h2>판결을 확정할 준비가 되었습니다.</h2>
                  <p>쟁점별 판단, 책임 배분, 해결책을 한 번 더 확인한 뒤 망치를 내리세요.</p>
                </div>

                <div className="pc-verdict-confirm__list">
                  {summaryDisputes.map((item) => (
                    <div className="pc-verdict-confirm__item" key={item.id}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>
                          {item.fact === 'true'
                            ? '사실'
                            : item.fact === 'false'
                              ? '거짓'
                              : item.fact === 'pending'
                                ? '보류'
                                : '미판단'}
                        </span>
                      </div>
                      <em>
                        {item.responsibility
                          ? `${caseData.duo.partyA.name} ${item.responsibility.a}% / ${caseData.duo.partyB.name} ${item.responsibility.b}%`
                          : '책임 배분 대기'}
                      </em>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="pc-verdict-footer">
            <button
              className="pc-verdict-footer__button"
              disabled={safeGlobalIdx === 0}
              onClick={() => setGlobalIdx(Math.max(safeGlobalIdx - 1, 0))}
              type="button"
            >
              이전 단계
            </button>

            {currentStep === 'confirm' ? (
              <button
                className="pc-verdict-footer__button is-primary"
                disabled={!allFactsJudged}
                onClick={handleSubmit}
                type="button"
              >
                {allFactsJudged ? '판결 확정' : `모든 쟁점을 먼저 판단하세요 (${factCount}/${caseData.disputes.length})`}
              </button>
            ) : (
              <button
                className="pc-verdict-footer__button is-primary"
                onClick={() => setGlobalIdx(Math.min(safeGlobalIdx + 1, flatSteps.length - 1))}
                type="button"
              >
                다음 단계
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
