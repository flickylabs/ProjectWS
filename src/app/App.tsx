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
    <div className="h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center px-4 max-w-lg mx-auto">
      <div className="text-center space-y-5 w-full">
        <div className="text-5xl">⚖️</div>
        <h1 className="text-3xl font-bold text-amber-400">솔로몬</h1>
        <p className="text-xs text-gray-500">AI 둘의 싸움을 인간의 지혜로 재판하는 게임</p>

        {/* LLM 상태 */}
        <div className={`border rounded-lg p-2.5 text-xs ${
          llmStatus === null ? 'border-gray-700' :
          llmStatus.connected ? 'border-emerald-800 bg-emerald-950/30' : 'border-yellow-800 bg-yellow-950/30'
        }`}>
          {llmStatus === null && <span className="text-gray-500">LLM 연결 확인 중...</span>}
          {llmStatus?.connected && (
            <span className="text-emerald-400">✓ {getProviderName()} 연결됨 {llmStatus.modelId && <span className="text-gray-500 ml-1">({llmStatus.modelId})</span>}</span>
          )}
          {llmStatus && !llmStatus.connected && (
            <div className="space-y-1.5">
              <span className="text-yellow-400">⚠ {llmStatus.error}</span>
              <button onClick={handleRetry} disabled={loading} className="block w-full bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                {loading ? '확인 중...' : '다시 연결'}
              </button>
            </div>
          )}
        </div>

        {/* 사건 수 */}
        <div className="text-xs text-gray-600">
          등록된 사건: {caseCount}개
          {caseCount > 1 && <span className="ml-1">({Object.entries(caseCounts).map(([k, v]) => `${RELATION_LABELS[k] ?? k} ${v}`).join(', ')})</span>}
        </div>

        {/* 모드 선택 */}
        <div className="space-y-2">
          <button
            onClick={() => handleStart()}
            className="w-full bg-amber-600 hover:bg-amber-500 text-gray-950 font-bold py-3 rounded-lg transition-colors"
          >
            ⚖️ 빠른 시작
            <span className="block text-xs font-normal opacity-70">랜덤 사건으로 바로 시작</span>
          </button>
          <button
            onClick={() => setShowCampaign(true)}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold py-3 rounded-lg transition-colors border border-gray-700"
          >
            📖 캠페인 모드
            <span className="block text-xs font-normal text-gray-500">Stage 1~10 순서대로 도전</span>
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="w-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 py-2 rounded-lg transition-colors text-sm border border-gray-800"
          >
            📜 판결 기록
          </button>
        </div>

        {showHistory && <HistoryPanel onClose={() => setShowHistory(false)} />}

        {/* 관계 유형 선택 (사건 2개 이상일 때) */}
        {caseCount > 1 && (
          <div className="space-y-2">
            <div className="text-xs text-gray-500">또는 관계 유형 선택:</div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {Object.entries(caseCounts).map(([type, count]) => (
                <button
                  key={type}
                  onClick={() => handleStart(type)}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {RELATION_LABELS[type] ?? type} ({count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LLM 없을 때 안내 */}
        {llmStatus && !llmStatus.connected && (
          <div className="text-xs text-gray-600">
            LLM 없이도 플레이 가능합니다. 연결하면 AI가 더 자연스러운 대사를 생성합니다.
          </div>
        )}
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
