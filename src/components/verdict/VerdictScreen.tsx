import { useState } from 'react'
import { useGameStore, useStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'
import { calculateVerdict } from '../../engine/verdictEngine'
import { generateVerdictSummary } from '../../engine/verdictSummaryEngine'
import { recordGameComplete } from '../../hooks/useLocalStorage'
import { recordHistory } from '../layout/HistoryPanel'
import { completeStage } from '../../data/campaign'
import { playGavel } from '../../engine/soundEngine'
import { checkAndGrantRewards } from '../../engine/rewardEngine'
import { deriveCaseProfile, applyDriftUpdate } from '../../engine/judgeProfileEngine'
import { loadDriftState, saveDriftState } from '../../data/leaderboard'
import FactChecklist from './FactChecklist'
import ResponsibilitySlider from './ResponsibilitySlider'
import SolutionPicker from './SolutionPicker'
import EvidenceLegality from './EvidenceLegality'
import Emoji from '../common/Emoji'

type VerdictStep = 'fact' | 'responsibility' | 'solution' | 'legality' | 'confirm'

const STEPS: { id: VerdictStep; label: string; icon: string }[] = [
  { id: 'fact', label: '사실 인정', icon: '①' },
  { id: 'responsibility', label: '책임 배분', icon: '②' },
  { id: 'solution', label: '해결책', icon: '③' },
  { id: 'legality', label: '증거 정당성', icon: '④' },
  { id: 'confirm', label: '확정', icon: '⚖️' },
]

type FlatItem = { step: VerdictStep; subIdx: number }

export default function VerdictScreen() {
  const [globalIdx, setGlobalIdx] = useState(0)
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const setVerdictScore = useStore((s) => s.setVerdictScore)
  const setVerdictSummary = useStore((s) => s.setVerdictSummary)
  const advancePhase = useStore((s) => s.advancePhase)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const turnCount = useStore((s) => s.turnCount)
  const resources = useStore((s) => s.resources)

  if (!caseData) return null

  const disputes = caseData.disputes
  const activeDisputes = disputes.filter(
    (d) => verdictInput.factFindings[d.id] && verdictInput.factFindings[d.id] !== 'pending',
  )
  const solutionCategories = Object.keys(caseData.solutions)
  const factCount = Object.keys(verdictInput.factFindings).length
  const allFactsJudged = factCount >= disputes.length
  const hasLegalityIssue = caseData.evidence.some(
    (e) => (e.legitimacy !== 'lawful' || evidenceStates[e.id]?.confidentialSource) && evidenceStates[e.id]?.presented,
  )

  // flat 진행 목록 계산
  const flatSteps: FlatItem[] = [
    ...disputes.map((_, i) => ({ step: 'fact' as VerdictStep, subIdx: i })),
    ...activeDisputes.map((_, i) => ({ step: 'responsibility' as VerdictStep, subIdx: i })),
    ...solutionCategories.map((_, i) => ({ step: 'solution' as VerdictStep, subIdx: i })),
    ...(hasLegalityIssue ? [{ step: 'legality' as VerdictStep, subIdx: 0 }] : []),
    { step: 'confirm' as VerdictStep, subIdx: 0 },
  ]

  const safeGlobalIdx = Math.min(globalIdx, flatSteps.length - 1)
  const current = flatSteps[safeGlobalIdx]

  const goNext = () => setGlobalIdx(Math.min(safeGlobalIdx + 1, flatSteps.length - 1))
  const goPrev = () => setGlobalIdx(Math.max(safeGlobalIdx - 1, 0))

  // dot 클릭: 해당 step+subIdx를 globalIdx로 변환
  const handleFactDotClick = (i: number) => {
    const idx = flatSteps.findIndex((f) => f.step === 'fact' && f.subIdx === i)
    if (idx >= 0) setGlobalIdx(idx)
  }
  const handleRespDotClick = (i: number) => {
    const idx = flatSteps.findIndex((f) => f.step === 'responsibility' && f.subIdx === i)
    if (idx >= 0) setGlobalIdx(idx)
  }
  const handleSolDotClick = (i: number) => {
    const idx = flatSteps.findIndex((f) => f.step === 'solution' && f.subIdx === i)
    if (idx >= 0) setGlobalIdx(idx)
  }

  // 현재 step 결정 (step indicator용)
  const currentStep = current.step

  // step indicator: 상위 step 기준으로 현재 위치 표시
  const visibleSteps = STEPS.filter((s) => s.id !== 'legality' || hasLegalityIssue)
  const stepIndicatorIdx = visibleSteps.findIndex((s) => s.id === currentStep)

  const handleSubmit = () => {
    playGavel()
    const processMetrics = useGameStore.getState().processMetrics
    const score = calculateVerdict({
      disputes: caseData.disputes, evidence: caseData.evidence, evidenceStates,
      input: verdictInput, turnsUsed: turnCount, courtControlRemaining: resources.courtControl,
      processMetrics,
    })
    setVerdictScore(score)

    // 판결문 자동 초안 생성
    {
      // 결정적 증거: presented 상태인 증거 이름
      const keyEvidenceNames = caseData.evidence
        .filter(e => evidenceStates[e.id]?.presented)
        .map(e => e.name)

      // 결정적 순간: lieState 전이가 가장 많이 일어난 파티 기준
      const agentA = useGameStore.getState().agentA
      const agentB = useGameStore.getState().agentB
      let keyTransition: { party: string; from: string; to: string } | null = null
      // A/B 중 S5에 도달한 쟁점이 있으면 그것을 결정적 순간으로
      for (const [, v] of Object.entries(agentA.lieStateMap)) {
        const ls = v as { currentState: string }
        if (ls.currentState === 'S5') {
          keyTransition = { party: caseData.duo.partyA.name, from: 'S4', to: 'S5' }
          break
        }
      }
      if (!keyTransition) {
        for (const [, v] of Object.entries(agentB.lieStateMap)) {
          const ls = v as { currentState: string }
          if (ls.currentState === 'S5') {
            keyTransition = { party: caseData.duo.partyB.name, from: 'S4', to: 'S5' }
            break
          }
        }
      }

      // 평균 책임 배분 계산
      const respEntries = Object.values(verdictInput.responsibility) as { a: number; b: number }[]
      const avgPercentA = respEntries.length > 0
        ? Math.round(respEntries.reduce((sum, r) => sum + r.a, 0) / respEntries.length)
        : 50

      const judgeTitle = score.total >= 90 ? '전설적인 재판관'
        : score.total >= 75 ? '현명한 재판관'
        : score.total >= 60 ? '유능한 재판관'
        : score.total >= 40 ? '보통의 재판관' : '미숙한 재판관'

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
    }

    recordGameComplete(caseData.caseId, score.total)
    // 쟁점명 맵 생성
    const disputeNames: Record<string, string> = {}
    caseData.disputes.forEach(d => { disputeNames[d.id] = d.name })

    // 재판관 성향 telemetry 계산
    const caseTelemetry = deriveCaseProfile(
      verdictInput,
      processMetrics,
      caseData.disputes.map(d => ({
        id: d.id,
        ambiguity: (d as any).ambiguity,
        truth: (d as any).truth ?? true,
      })),
      caseData.caseId,
      caseData.solutions,
    )

    // 드리프트 상태 업데이트
    const currentDrift = loadDriftState()
    const newDrift = applyDriftUpdate(
      currentDrift,
      caseTelemetry,
      processMetrics,
      verdictInput.selectedSolutions.length,
    )
    saveDriftState(newDrift)

    recordHistory({
      caseId: caseData.caseId, score: score.total,
      insight: score.insight, authority: score.authority, wisdom: score.wisdom,
      relationshipType: caseData.duo.relationshipType,
      nameA: caseData.duo.partyA.name, nameB: caseData.duo.partyB.name,
      verdictDetail: {
        factFindings: { ...verdictInput.factFindings },
        responsibility: { ...verdictInput.responsibility },
        selectedSolutions: [...verdictInput.selectedSolutions],
        disputeNames,
      },
      caseTelemetry,
    })
    // 캠페인 Stage 진행 (관계 유형으로 매칭)
    const stageMap: Record<string, number> = {
      neighbor: 1, spouse: 2, boss_employee: 3,
      partnership: 4, family: 5, tenant_landlord: 6,
    }
    const stage = stageMap[caseData.duo.relationshipType]
    if (stage) completeStage(stage, score.total)
    // 보상 체크 및 지급 (verdictScore가 store에 저장된 직후 호출)
    checkAndGrantRewards()
    advancePhase(GamePhase.Result)
  }

  return (
    <div className="flex flex-col">
      {/* 스텝 표시기 */}
      <div className="flex items-center justify-center gap-1 py-2 border-b border-gray-800">
        {visibleSteps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1">
            <button
              onClick={() => {
                // 상위 step 버튼 클릭 시 해당 step의 첫 항목으로 이동
                const idx = flatSteps.findIndex((f) => f.step === s.id)
                if (idx >= 0) setGlobalIdx(idx)
              }}
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                currentStep === s.id ? 'bg-amber-600 text-gray-950 font-bold' :
                stepIndicatorIdx > i ? 'bg-gray-700 text-gray-300' :
                'bg-gray-800 text-gray-500'
              }`}
            >
              {s.id === 'confirm' ? <Emoji char={s.icon} size={12} /> : s.icon}
            </button>
            {i < visibleSteps.length - 1 && <span className="text-gray-700 text-xs">›</span>}
          </div>
        ))}
      </div>

      {/* 스텝 내용 */}
      <div className="overflow-y-auto px-1 py-2 max-h-[50vh]">
        {currentStep === 'fact' && (
          <FactChecklist
            currentIdx={current.subIdx}
            onChangeIdx={handleFactDotClick}
          />
        )}
        {currentStep === 'responsibility' && (
          <ResponsibilitySlider
            currentIdx={current.subIdx}
            onChangeIdx={handleRespDotClick}
          />
        )}
        {currentStep === 'solution' && (
          <SolutionPicker
            currentIdx={current.subIdx}
            onChangeIdx={handleSolDotClick}
          />
        )}
        {currentStep === 'legality' && <EvidenceLegality />}
        {currentStep === 'confirm' && (
          <div className="space-y-3 px-2">
            <div className="text-center">
              <div className="text-4xl mb-2 animate-pulse-glow"><Emoji char="⚖️" size={36} /></div>
              <h3 className="text-sm font-bold text-amber-400">판결을 선언합니다</h3>
              <p className="text-xs text-gray-600 mt-1">아래 내용으로 확정됩니다</p>
            </div>
            {caseData.disputes.map((d) => {
              const f = verdictInput.factFindings[d.id]
              const r = verdictInput.responsibility[d.id]
              return (
                <div key={d.id} className="bg-gray-800/40 rounded px-2.5 py-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-300">{d.name}</span>
                    <span className={f === 'true' ? 'text-emerald-400' : f === 'false' ? 'text-red-400' : 'text-gray-500'}>
                      {f === 'true' ? '사실' : f === 'false' ? '거짓' : f === 'pending' ? '보류' : '미판단'}
                    </span>
                  </div>
                  {r && <div className="text-gray-600">{caseData.duo.partyA.name} {r.a}% / {caseData.duo.partyB.name} {r.b}%</div>}
                </div>
              )
            })}
            {verdictInput.selectedSolutions.length > 0 && (
              <div className="text-xs text-gray-500">해결책 {verdictInput.selectedSolutions.length}개 선택</div>
            )}
          </div>
        )}
      </div>

      {/* 네비게이션 */}
      <div className="flex items-center justify-between px-2 py-2 border-t border-gray-800">
        <button onClick={goPrev} disabled={safeGlobalIdx === 0}
          className={`text-xs px-3 py-1.5 rounded-lg ${safeGlobalIdx === 0 ? 'text-gray-700' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
          ← 이전
        </button>
        {currentStep === 'confirm' ? (
          <button onClick={handleSubmit} disabled={!allFactsJudged}
            className={`text-xs px-5 py-2 rounded-lg font-bold ${allFactsJudged ? 'bg-amber-600 hover:bg-amber-500 text-gray-950' : 'bg-gray-800 text-gray-600'}`}>
            {allFactsJudged ? <><Emoji char="⚖️" size={12} /> 판결 확정</> : <><Emoji char="⚖️" size={12} /> 모든 쟁점을 판단하세요 ({factCount}/{caseData.disputes.length})</>}
          </button>
        ) : (
          <button onClick={goNext} className="text-xs px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white">
            다음 →
          </button>
        )}
      </div>
    </div>
  )
}
