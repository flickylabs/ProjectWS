import { useEffect, useState } from 'react'
import { GamePhase } from '../types'
import { useGameStore } from '../store/useGameStore'
import { checkConnection, getProviderName } from '../engine/llmClient'
import { setLLMMode, isLLMMode } from '../hooks/useActionDispatch'
import { getRandomCase, getCaseCount, getCaseCountByType } from '../data/cases'
import { generatePhase1Dialogues, generatePhase2Dialogues } from '../engine/llmPhaseDialogue'
import type { StageDefinition } from '../data/campaign'
import CourtLayout from '../components/layout/CourtLayout'
import PhaseTransition from '../components/layout/PhaseTransition'
import Tutorial from '../components/layout/Tutorial'
import Phase0_CaseIntro from '../components/phase/Phase0_CaseIntro'
import AutoDialoguePhase from '../components/phase/AutoDialoguePhase'
import Phase6_Mediation from '../components/phase/Phase6_Mediation'
import CampaignScreen from '../components/phase/CampaignScreen'
import ActionPanel from '../components/actions/ActionPanel'
import VerdictScreen from '../components/verdict/VerdictScreen'
import ResultScreen from '../components/result/ResultScreen'
import HistoryPanel from '../components/layout/HistoryPanel'
import { phase1Dialogues } from '../data/dialogues/phase1'
import { phase2Dialogues } from '../data/dialogues/phase2'
import { buildGenericPhase1, buildGenericPhase2 } from '../data/dialogues/generic-phase1'

export default function App() {
  const currentPhase = useGameStore((s) => s.currentPhase)
  const caseData = useGameStore((s) => s.caseData)

  if (!caseData) return <TitleScreen />

  if (currentPhase === GamePhase.Phase0_CaseIntro) {
    return <div className="h-screen bg-gray-950 text-gray-100 max-w-lg mx-auto"><Phase0_CaseIntro /></div>
  }
  if (currentPhase === GamePhase.Result) {
    return <div className="h-screen bg-gray-950 text-gray-100 max-w-lg mx-auto"><ResultScreen /></div>
  }

  return (
    <>
      <PhaseTransition />
      <Tutorial />
      <CourtLayout actionPanel={getActionPanel(currentPhase)} />
    </>
  )
}

function TitleScreen() {
  const [llmStatus, setLlmStatus] = useState<{ connected: boolean; provider?: string; modelId?: string; error?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [showCampaign, setShowCampaign] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const initializeCase = useGameStore((s) => s.initializeCase)
  const caseCount = getCaseCount()
  const caseCounts = getCaseCountByType()

  useEffect(() => {
    checkConnection().then(setLlmStatus)
  }, [])

  const handleStart = (relationshipType?: string) => {
    setLLMMode(llmStatus?.connected ?? false)
    const caseData = getRandomCase(relationshipType)
    initializeCase(caseData)
  }

  const handleCampaignStage = (stage: StageDefinition) => {
    setLLMMode(llmStatus?.connected ?? false)
    const caseData = getRandomCase(stage.relationshipType || undefined)
    initializeCase(caseData)
  }

  if (showCampaign) {
    return <CampaignScreen onSelectStage={handleCampaignStage} onBack={() => setShowCampaign(false)} />
  }

  const handleRetry = async () => {
    setLoading(true)
    setLlmStatus(await checkConnection())
    setLoading(false)
  }

  const RELATION_LABELS: Record<string, string> = {
    spouse: '부부', neighbor: '이웃', boss_employee: '직장',
    partnership: '동업', family: '가족', tenant_landlord: '세입자', friend: '친구',
  }

  return (
    <div className="h-screen bg-gray-950 text-gray-100 flex flex-col max-w-lg mx-auto">
      {showHistory && <HistoryPanel onClose={() => setShowHistory(false)} />}

      {/* 히어로 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 bg-gradient-to-b from-amber-950/20 via-gray-950 to-gray-950">
        <div className="text-center space-y-3 w-full">
          <div className="text-6xl animate-pulse-glow inline-block">⚖️</div>
          <h1 className="text-3xl font-bold text-amber-400 tracking-tight">솔로몬</h1>
          <p className="text-sm text-gray-500 leading-relaxed">AI 둘의 싸움을<br />인간의 지혜로 재판하는 게임</p>
        </div>
      </div>

      {/* 하단 액션 영역 */}
      <div className="px-5 pb-8 space-y-3">
        {/* 메인 버튼 */}
        <button
          onClick={() => handleStart()}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-600/20 active:scale-95"
        >
          ⚖️ 재판 시작
          <span className="block text-xs font-normal opacity-60 mt-0.5">사건 {caseCount}개 중 랜덤 선택</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowCampaign(true)}
            className="bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 font-semibold py-3 rounded-xl transition-colors ring-1 ring-gray-700/50 text-sm"
          >
            📖 캠페인
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 font-semibold py-3 rounded-xl transition-colors ring-1 ring-gray-700/50 text-sm"
          >
            📜 판결 기록
          </button>
        </div>

        {/* 관계 유형 선택 */}
        {caseCount > 1 && (
          <div className="flex flex-wrap gap-1.5 justify-center pt-1">
            {Object.entries(caseCounts).map(([type, count]) => (
              <button
                key={type}
                onClick={() => handleStart(type)}
                className="text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 px-2.5 py-1 rounded-full transition-colors"
              >
                {RELATION_LABELS[type] ?? type} {count}
              </button>
            ))}
          </div>
        )}

        {/* LLM + 상태 */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {llmStatus === null && <span className="text-xs text-gray-600">연결 확인 중...</span>}
          {llmStatus?.connected && (
            <span className="text-xs text-emerald-500/70">● AI 연결됨</span>
          )}
          {llmStatus && !llmStatus.connected && (
            <button onClick={handleRetry} disabled={loading} className="text-xs text-gray-600 hover:text-gray-400">
              {loading ? '확인 중...' : '● AI 미연결 (탭하여 재시도)'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function getActionPanel(phase: GamePhase) {
  const caseData = useGameStore.getState().caseData
  const llmMode = isLLMMode()

  switch (phase) {
    case GamePhase.Phase1_InitialStatement: {
      // 하드코딩 사건은 전용 대사, 생성 사건은 범용 대사 또는 LLM
      const isHardcoded = caseData?.caseId === 'case-001'
      const fallback = isHardcoded ? phase1Dialogues : (caseData ? buildGenericPhase1(caseData) : phase1Dialogues)
      return (
        <AutoDialoguePhase
          dialogues={fallback}
          llmGenerator={llmMode && caseData ? () => generatePhase1Dialogues(caseData) : undefined}
          nextPhase={GamePhase.Phase2_Rebuttal}
          nextLabel="반박 단계로"
        />
      )
    }
    case GamePhase.Phase2_Rebuttal: {
      const isHardcoded = caseData?.caseId === 'case-001'
      const fallback = isHardcoded ? phase2Dialogues : (caseData ? buildGenericPhase2(caseData) : phase2Dialogues)
      return (
        <AutoDialoguePhase
          dialogues={fallback}
          llmGenerator={llmMode && caseData ? () => generatePhase2Dialogues(caseData) : undefined}
          nextPhase={GamePhase.Phase3_Interrogation}
          nextLabel="심문 시작"
        />
      )
    }
    case GamePhase.Phase3_Interrogation:
    case GamePhase.Phase4_Evidence:
    case GamePhase.Phase5_ReExamination:
      return <ActionPanel />
    case GamePhase.Phase6_Mediation:
      return <Phase6_Mediation />
    case GamePhase.Phase7_Verdict:
      return <VerdictScreen />
    default:
      return null
  }
}
