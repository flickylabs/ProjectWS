import { useState, useEffect } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'
import { loadGeneratedCases } from '../../data/cases/caseLoader'
import { saveCaseProgress } from '../phase/CaseMap'
import ScoreBreakdown from './ScoreBreakdown'
import TruthReveal from './TruthReveal'
import Aftermath, { resetAftermathCache } from './Aftermath'
import TitleReveal from './TitleReveal'
import ShareResult from './ShareResult'
import JudgeProfileReport from './JudgeProfileReport'
import Emoji from '../common/Emoji'
import { resetPrefetch } from '../phase/Phase0_CaseIntro'

type ResultTab = 'score' | 'truth' | 'titles' | 'aftermath' | 'profile' | 'share'

export default function ResultScreen() {
  const verdictScore = useGameStore((s) => s.verdictScore)
  const caseData = useGameStore((s) => s.caseData)
  const initializeCase = useGameStore((s) => s.initializeCase)
  const [tab, setTab] = useState<ResultTab>('score')

  // 클리어 시 진행도 저장
  useEffect(() => {
    if (verdictScore && caseData) {
      saveCaseProgress(caseData.caseId, verdictScore.total)
    }
  }, [verdictScore, caseData])

  if (!verdictScore || !caseData) return null

  const stars = verdictScore.total >= 75 ? 3 : verdictScore.total >= 55 ? 2 : verdictScore.total >= 35 ? 1 : 0

  // 세션(홈)으로 나가기
  const handleExit = () => {
    resetAftermathCache()
    useGameStore.getState().clearSavedGame()
    useGameStore.setState({ caseData: null })
    useGameStore.getState().setPhase(GamePhase.Phase0_CaseIntro)
    useGameStore.getState().clearDialogue()
  }

  // 다음 사건 (같은 세션의 다음 케이스)
  const handleNextCase = () => {
    const allCases = loadGeneratedCases()
    const relType = caseData.duo.relationshipType
    const diffOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
    const sessionCases = allCases
      .filter(c => c.duo.relationshipType === relType)
      .sort((a, b) => (diffOrder[a.meta?.difficulty ?? 'medium'] ?? 1) - (diffOrder[b.meta?.difficulty ?? 'medium'] ?? 1))
    const currentIdx = sessionCases.findIndex(c => c.caseId === caseData.caseId)
    const nextCase = sessionCases[currentIdx + 1]
    if (nextCase) {
      resetPrefetch()
      initializeCase(nextCase)
    } else {
      handleExit() // 마지막 사건이면 세션으로 나감
    }
  }

  // 다시 판결하기 (같은 사건, 판결 단계로)
  const handleRetry = () => {
    useGameStore.getState().resetVerdict()
    useGameStore.getState().setPhase(GamePhase.Phase7_Verdict)
  }

  // 다음 사건 존재 여부
  const hasNextCase = (() => {
    const allCases = loadGeneratedCases()
    const relType = caseData.duo.relationshipType
    const diffOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
    const sessionCases = allCases
      .filter(c => c.duo.relationshipType === relType)
      .sort((a, b) => (diffOrder[a.meta?.difficulty ?? 'medium'] ?? 1) - (diffOrder[b.meta?.difficulty ?? 'medium'] ?? 1))
    const currentIdx = sessionCases.findIndex(c => c.caseId === caseData.caseId)
    return currentIdx < sessionCases.length - 1
  })()

  const TABS: { id: ResultTab; label: string }[] = [
    { id: 'score', label: '평가' },
    { id: 'truth', label: '진실' },
    { id: 'titles', label: '칭호' },
    { id: 'aftermath', label: '후일담' },
    { id: 'profile', label: '성향' },
    { id: 'share', label: '공유' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="w-full max-w-md max-h-[90vh] flex flex-col bg-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden animate-scale-in">
      {/* 히어로 헤더 — 애니메이션 */}
      <div className="text-center pt-8 pb-4 px-4 bg-gradient-to-b from-amber-950/20 to-transparent">
        <div className="text-5xl mb-3 animate-scale-in"><Emoji char="⚖️" size={48} /></div>
        <h2 className="text-lg font-bold animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>판결이 완료되었습니다</h2>
        <div className="text-3xl font-bold text-amber-400 mt-2 animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>{verdictScore.total}<span className="text-lg text-amber-500/60 ml-1">점</span></div>
        <div className="text-sm text-gray-400 mt-1 animate-slide-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>{getRating(verdictScore.total)}</div>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-gray-800 px-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 text-xs font-semibold transition-colors ${
              tab === t.id ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {tab === 'score' && <ScoreBreakdown score={verdictScore} />}
        {tab === 'truth' && <TruthReveal />}
        {tab === 'titles' && <TitleReveal />}
        {/* Aftermath는 항상 마운트 — 결과 진입 시 미리 생성, 탭 아닐 때 숨김 */}
        <div className={tab === 'aftermath' ? '' : 'hidden'}><Aftermath /></div>
        {tab === 'profile' && <JudgeProfileReport />}
        {tab === 'share' && <ShareResult />}
      </div>

      {/* 별점 표시 */}
      <div className="text-center py-2">
        {[1, 2, 3].map(i => (
          <span key={i} className={`text-2xl mx-0.5 ${i <= stars ? 'text-amber-400' : 'text-gray-700'}`}>
            <Emoji char="★" size={24} />
          </span>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="border-t border-gray-800 px-4 py-3 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={handleExit}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            나가기
          </button>
          {hasNextCase && (
            <button
              onClick={handleNextCase}
              className="flex-1 bg-amber-600 hover:bg-amber-500 text-gray-950 font-bold py-2.5 rounded-xl transition-colors text-sm"
            >
              <Emoji char="⚖️" size={14} /> 다음 사건
            </button>
          )}
        </div>
        <button
          onClick={handleRetry}
          className="w-full text-xs py-1.5 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <Emoji char="🔄" size={12} /> 다시 판결하기
        </button>
      </div>
    </div>
    </div>
  )
}

function getRating(total: number): string {
  if (total >= 90) return '전설적인 재판관'
  if (total >= 75) return '현명한 재판관'
  if (total >= 60) return '유능한 재판관'
  if (total >= 40) return '보통의 재판관'
  if (total >= 20) return '미숙한 재판관'
  return '재판 실패'
}
