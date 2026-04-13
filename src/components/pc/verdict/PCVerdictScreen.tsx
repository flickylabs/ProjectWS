import React, { useMemo, useState } from 'react'
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
import CharacterFaceSvg from '../icons/CharacterFaceSvg'
import { CAMPAIGN_STAGE_MAP, getCampaignStageKey } from '../../verdict/VerdictScreen'

type VerdictStep = 'fact' | 'responsibility' | 'solution' | 'confirm'
type FlatItem = { step: VerdictStep; subIdx: number }

const STEPS: { id: VerdictStep; label: string }[] = [
  { id: 'fact', label: '01 쟁점 판단' },
  { id: 'responsibility', label: '02 안건 책임' },
  { id: 'solution', label: '03 해결안' },
  { id: 'confirm', label: '04 판결문' },
]

function getRelLabel(type: string): string {
  const map: Record<string, string> = { spouse: '부부', family: '가족', friend: '친구', neighbor: '이웃', partnership: '동업', workplace: '직장', tenant_landlord: '세입자' }
  return map[type] ?? type
}

function getSolutionIcon(text: string): React.ReactNode {
  if (text.includes('배상') || text.includes('환불') || text.includes('변제'))
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#d4a24e" strokeWidth="1.5"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#d4a24e">$</text></svg>
  if (text.includes('사과') || text.includes('화해') || text.includes('관계'))
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 15l4-4 3 2 4-4 5 5" stroke="#d4a24e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  if (text.includes('계약') || text.includes('합의') || text.includes('조건'))
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="#d4a24e" strokeWidth="1.5"/><line x1="9" y1="8" x2="15" y2="8" stroke="#d4a24e" strokeWidth="1" opacity="0.5"/><line x1="9" y1="12" x2="15" y2="12" stroke="#d4a24e" strokeWidth="1" opacity="0.5"/></svg>
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" stroke="#d4a24e" strokeWidth="1.5" fill="none"/></svg>
}

const SOLUTION_CATEGORY_LABELS: Record<string, string> = {
  '공동재산회복': '공동 재산 회복',
  '신뢰순서분리': '신뢰 순서 분리',
  '봉인정보경계': '봉인 정보 경계',
  '관계재건': '관계 재건',
  '역할재조정': '역할 재조정',
  '소통구조개선': '소통 구조 개선',
  '경계설정': '경계 설정',
  '책임분담': '책임 분담',
  '신뢰회복': '신뢰 회복',
  '금전정리': '금전 정리',
  '재정투명화': '재정 투명화',
  '의사소통': '의사소통',
  '생활규칙': '생활 규칙',
  '법적정리': '법적 정리',
}

/** Check if a dispute has been "discovered" (either party's lieState reached S3+) */
function isDisputeDiscovered(
  disputeId: string,
  lieStateMapA: Record<string, { currentState: string }>,
  lieStateMapB: Record<string, { currentState: string }>,
): boolean {
  const stateNum = (s: string) => {
    const n = parseInt(s.replace('S', ''), 10)
    return isNaN(n) ? 0 : n
  }
  const aState = lieStateMapA[disputeId]?.currentState
  const bState = lieStateMapB[disputeId]?.currentState
  return (aState != null && stateNum(aState) >= 3) || (bState != null && stateNum(bState) >= 3)
}

/** Generate shuffled indices [0..n-1] using Fisher-Yates with a stable seed */
function seededShuffle(seed: string, count: number): number[] {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0
  }
  const arr = Array.from({ length: count }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    hash = (hash * 1664525 + 1013904223) | 0
    const j = ((hash >>> 0) % (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Build 4 options for a dispute */
function buildFactOptions(
  dispute: { id: string; name: string; truthDescription: string; judgmentStatement?: string; verdictOptions?: { wrong: string; partial: string; truth: string; defer: string } },
  nameA: string,
  nameB: string,
  discovered: boolean,
) {
  // 스크립트 생성된 선택지가 있으면 사용
  const vo = dispute.verdictOptions

  const option1Text = vo?.wrong
    ?? (dispute.judgmentStatement ? `이 쟁점은 사실과 다릅니다 — ${nameA} 측 주장이 맞습니다` : `${nameA} 측 주장이 맞습니다`)
  const option2Text = vo?.partial ?? '일부는 사실이나, 핵심 사실관계가 불분명합니다'
  const option3Text = vo?.truth ?? dispute.judgmentStatement ?? dispute.truthDescription
  const option4Text = vo?.defer ?? '보류 — 판단을 유보합니다'

  // Shuffle options 1-3, keep option 4 last
  const shuffledFirst3 = seededShuffle(dispute.id, 3)

  type FactOptionKey = 'wrong' | 'partial' | 'truth' | 'defer'
  type FactOption = { key: FactOptionKey; text: string; mapping: 'true' | 'false' | 'pending'; weight: number; locked?: boolean }

  const baseOptions: FactOption[] = [
    { key: 'wrong', text: option1Text, mapping: 'false', weight: 0 },
    { key: 'partial', text: option2Text, mapping: 'pending', weight: 60 },
    { key: 'truth', text: option3Text, mapping: 'true', weight: 100, locked: !discovered },
  ]

  const shuffled: FactOption[] = shuffledFirst3.map((i) => baseOptions[i])
  shuffled.push({ key: 'defer', text: option4Text, mapping: 'pending', weight: 30 })

  return shuffled
}

/** Seesaw-style scale SVG that tilts based on percentage */
function ScaleSVG({ percentA, nameA, nameB }: { percentA: number; nameA: string; nameB: string }) {
  // percentA가 높으면 A(왼쪽)가 무거워서 내려감 → 음수 tilt = 왼쪽 내려감
  const tilt = -((percentA - 50) / 50) * 12
  return (
    <svg width="400" height="200" viewBox="0 0 400 200" style={{ display: 'block', margin: '12px auto' }}>
      {/* fulcrum */}
      <polygon points="200,140 182,170 218,170" fill="#d4a24e" opacity="0.6" />
      <rect x="165" y="170" width="70" height="6" rx="3" fill="#d4a24e" opacity="0.3" />
      {/* tilting beam group */}
      <g transform={`rotate(${tilt}, 200, 140)`}>
        {/* beam */}
        <rect x="40" y="136" width="320" height="8" rx="4" fill="#d4a24e" />
        {/* left platform */}
        <rect x="45" y="126" width="90" height="10" rx="5" fill="rgba(91,141,239,0.2)" stroke="#5b8def" strokeWidth="1.5" />
        {/* left character face — foreignObject로 CharacterFaceSvg 삽입 */}
        <foreignObject x="62" y="72" width="56" height="56">
          <CharacterFaceSvg party="a" size={56} />
        </foreignObject>
        <text x="90" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b8def">{nameA}</text>
        {/* right platform */}
        <rect x="265" y="126" width="90" height="10" rx="5" fill="rgba(224,96,96,0.2)" stroke="#e06060" strokeWidth="1.5" />
        {/* right character face */}
        <foreignObject x="282" y="72" width="56" height="56">
          <CharacterFaceSvg party="b" size={56} />
        </foreignObject>
        <text x="310" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#e06060">{nameB}</text>
      </g>
    </svg>
  )
}

export default function PCVerdictScreen() {
  const [globalIdx, setGlobalIdx] = useState(0)
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true)
  // Track selected option key per dispute for fact step
  const [factSelections, setFactSelections] = useState<Record<string, string>>({})
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const setVerdictScore = useStore((s) => s.setVerdictScore)
  const setVerdictSummary = useStore((s) => s.setVerdictSummary)
  const advancePhase = useStore((s) => s.advancePhase)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const turnCount = useStore((s) => s.turnCount)
  const resources = useStore((s) => s.resources)
  const agentALieMap = useStore((s) => s.agentA.lieStateMap)
  const agentBLieMap = useStore((s) => s.agentB.lieStateMap)
  if (!caseData) {
    return null
  }

  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  const disputes = caseData.disputes.filter((d) => {
    const vis = disputeVisibility[d.id]
    return !vis || vis.visibility !== 'hidden'
  })
  const activeDisputes = disputes.filter(
    (item) => verdictInput.factFindings[item.id] && verdictInput.factFindings[item.id] !== 'pending',
  )
  const solutionCategories = Object.keys(caseData.solutions)
  const factCount = Object.keys(verdictInput.factFindings).length
  const allFactsJudged = factCount >= disputes.length

  const flatSteps: FlatItem[] = useMemo(
    () => [
      ...disputes.map((_, index) => ({ step: 'fact' as VerdictStep, subIdx: index })),
      ...activeDisputes.map((_, index) => ({ step: 'responsibility' as VerdictStep, subIdx: index })),
      ...solutionCategories.map((_, index) => ({ step: 'solution' as VerdictStep, subIdx: index })),
      { step: 'confirm' as VerdictStep, subIdx: 0 },
    ],
    [activeDisputes, disputes, solutionCategories],
  )

  const safeGlobalIdx = Math.min(globalIdx, flatSteps.length - 1)
  const current = flatSteps[safeGlobalIdx]
  const currentStep = current.step
  const visibleSteps = STEPS

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

  const summaryDisputes = caseData.disputes.filter((d) => {
    const vis = disputeVisibility[d.id]
    return !vis || vis.visibility !== 'hidden'
  }).map((item) => {
    const fact = verdictInput.factFindings[item.id]
    const responsibility = verdictInput.responsibility[item.id]
    return {
      id: item.id,
      name: item.name,
      fact,
      responsibility,
    }
  })

  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name

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
              <span>해결책</span>
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
            {/* ── STEP 1: 쟁점 판단 (multiple choice) ── */}
            {currentStep === 'fact' ? (() => {
              const dispute = disputes[current.subIdx]
              if (!dispute) return null
              const discovered = isDisputeDiscovered(
                dispute.id,
                agentALieMap as Record<string, { currentState: string }>,
                agentBLieMap as Record<string, { currentState: string }>,
              )
              const options = buildFactOptions(dispute, nameA, nameB, discovered)
              const selectedKey = factSelections[dispute.id]

              return (
                <div className="pc-verdict-fact">
                  <div className="pc-verdict-fact__header">
                    <h2 className="pc-verdict-fact__title">{dispute.name}</h2>
                    <p className="pc-verdict-fact__subtitle">이 쟁점에 대한 판단을 선택하세요</p>
                  </div>
                  <div className="pc-verdict-fact__options">
                    {options.map((opt, idx) => {
                      const isLocked = 'locked' in opt && opt.locked
                      const isSelected = selectedKey === opt.key
                      return (
                        <button
                          className={`pc-verdict-fact__option${isSelected ? ' is-selected' : ''}${isLocked ? ' is-locked' : ''}`}
                          key={idx}
                          disabled={isLocked}
                          onClick={() => {
                            if (isLocked) return
                            setFactSelections((prev) => ({ ...prev, [dispute.id]: opt.key }))
                            // 선택한 텍스트를 전역에 저장 — 결과 화면에서 사용
                            const stored = (window as any).__factSelectedTexts ?? {}
                            stored[dispute.id] = opt.text
                            ;(window as any).__factSelectedTexts = stored
                            useGameStore.getState().setFactFinding(dispute.id, opt.mapping)
                            if (autoAdvanceEnabled && current.subIdx < disputes.length - 1) {
                              setTimeout(() => {
                                const nextIdx = flatSteps.findIndex((s) => s.step === 'fact' && s.subIdx === current.subIdx + 1)
                                if (nextIdx >= 0) setGlobalIdx(nextIdx)
                              }, 500)
                            }
                          }}
                          type="button"
                        >
                          <span className="pc-verdict-fact__option-radio">
                            {isLocked ? (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="4" y="7" width="8" height="7" rx="1.5" stroke="#6a6e80" strokeWidth="1.2"/><path d="M6 7V5a2 2 0 014 0v2" stroke="#6a6e80" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            ) : isSelected ? (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="var(--pc-gold-light)" strokeWidth="1.5"/><circle cx="8" cy="8" r="3.5" fill="var(--pc-gold-light)"/></svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#6a6e80" strokeWidth="1.5"/></svg>
                            )}
                          </span>
                          <span className="pc-verdict-fact__option-text">
                            {isLocked ? '아직 밝혀지지 않은 내용입니다' : opt.text}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })() : null}

            {/* ── STEP 2: 안건 책임 ── */}
            {currentStep === 'responsibility' ? (() => {
              const dispute = activeDisputes[current.subIdx]
              if (!dispute) return null
              const resp = verdictInput.responsibility[dispute.id] ?? { a: 50, b: 50 }
              return (
                <div className="pc-verdict-resp">
                  <div className="pc-verdict-resp__header">
                    <h2 className="pc-verdict-resp__title">{dispute.name}</h2>
                    <p className="pc-verdict-resp__subtitle">누구의 책임이 더 크다고 생각하시나요?</p>
                  </div>
                  <div className="pc-verdict-resp__slider-area">
                    <span className="pc-verdict-resp__label is-a">
                      <span className="pc-verdict-resp__avatar is-a">{nameA[0]}</span>
                      {nameA}
                    </span>
                    <div className="pc-verdict-resp__track" style={{ '--a-pct': `${resp.a}%` } as React.CSSProperties}>
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
                        style={{ direction: 'rtl' }}
                      />
                      <div className="pc-verdict-resp__fill" style={{ width: `${resp.a}%` }} />
                    </div>
                    <span className="pc-verdict-resp__label is-b">
                      <span className="pc-verdict-resp__avatar is-b">{nameB[0]}</span>
                      {nameB}
                    </span>
                  </div>
                  <div className="pc-verdict-resp__percent">
                    <span className="is-a">{resp.a}%</span>
                    <span className="is-b">{resp.b}%</span>
                  </div>
                  <ScaleSVG percentA={resp.a} nameA={nameA} nameB={nameB} />
                  <div className="pc-verdict-resp__direction">
                    {resp.a >= 80 ? `${nameA} 측에 주요 책임`
                     : resp.a >= 60 ? `${nameA} 측에 더 큰 책임`
                     : resp.a >= 40 ? '양측 비슷한 책임'
                     : resp.a >= 20 ? `${nameB} 측에 더 큰 책임`
                     : `${nameB} 측에 주요 책임`}
                  </div>
                </div>
              )
            })() : null}

            {/* ── STEP 3: 해결안 ── */}
            {currentStep === 'solution' ? (() => {
              const catKey = solutionCategories[current.subIdx]
              const options = caseData.solutions[catKey] ?? []
              const catLabel = SOLUTION_CATEGORY_LABELS[catKey] ?? catKey
              return (
                <div className="pc-verdict-solution">
                  <div className="pc-verdict-solution__header">
                    <h2 className="pc-verdict-solution__subtitle" style={{ fontSize: 26, fontWeight: 900, color: '#f2efe8', margin: 0 }}>{catLabel}</h2>
                    <p className="pc-verdict-solution__hint" style={{ marginTop: 8 }}>※ 복수 선택 가능합니다.</p>
                  </div>
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
                          <span className="pc-verdict-solution__icon">{getSolutionIcon(opt)}</span>
                          <span>{opt}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })() : null}

            {/* ── STEP 4: 판결문 (confirm) ── */}
            {currentStep === 'confirm' ? (() => {
              return (
                <div className="pc-verdict-confirm">
                  <div className="pc-verdict-confirm__cards">
                    {summaryDisputes.map((item) => {
                      const resp = verdictInput.responsibility[item.id]
                      return (
                        <div className="pc-verdict-confirm__card" key={item.id}>
                          <strong className="pc-verdict-confirm__card-name">{item.name}</strong>
                          {resp ? (
                            <div className="pc-verdict-confirm__card-scale">
                              <ScaleSVG percentA={resp.a} nameA={nameA} nameB={nameB} />
                            </div>
                          ) : null}
                          <span className={`pc-verdict-confirm__badge is-${item.fact ?? 'none'}`}>
                            {item.fact === 'true' ? '사실' : item.fact === 'false' ? '거짓' : item.fact === 'pending' ? '보류' : '미판단'}
                          </span>
                          <span className="pc-verdict-confirm__card-judgment">
                            {item.fact === 'true' ? item.name + ' — 사실로 판단'
                             : item.fact === 'false' ? item.name + ' — 거짓으로 판단'
                             : '판단 보류'}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {verdictInput.selectedSolutions.length > 0 ? (
                    <div className="pc-verdict-confirm__solutions">
                      <h3>선택한 해결안</h3>
                      {verdictInput.selectedSolutions.map((sol, i) => (
                        <div className="pc-verdict-confirm__sol" key={i}>{sol}</div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })() : null}
          </div>

          {/* ── Unified Footer ── */}
          <div className="pc-verdict-footer">
            <button
              className="pc-verdict-footer__button"
              disabled={safeGlobalIdx === 0}
              onClick={() => { setAutoAdvanceEnabled(false); setGlobalIdx(Math.max(safeGlobalIdx - 1, 0)) }}
              type="button"
            >
              &lt; 이전 단계
            </button>

            <span className="pc-verdict-footer__indicator">
              {currentStepIndex + 1} / {visibleSteps.length}
            </span>

            {currentStep === 'confirm' ? (
              <button
                className="pc-verdict-footer__button is-primary"
                disabled={!allFactsJudged}
                onClick={handleSubmit}
                type="button"
              >
                {allFactsJudged ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{marginRight: 6}}>
                      <path d="M4 20h16M8 14l-4 6M12 6l6 6-8 8-6-6 8-8zM14 4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    판결 확정
                  </>
                ) : `모든 쟁점을 먼저 판단하세요 (${factCount}/${disputes.length})`}
              </button>
            ) : (
              <button
                className={`pc-verdict-footer__button is-primary${currentStep === 'solution' && verdictInput.selectedSolutions.length > 0 ? ' is-gold-glow' : ''}`}
                onClick={() => { setAutoAdvanceEnabled(true); setGlobalIdx(Math.min(safeGlobalIdx + 1, flatSteps.length - 1)) }}
                type="button"
              >
                다음 단계 &gt;
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
