import { useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'
import { getRandomCase } from '../../data/cases'
import ScoreBreakdown from './ScoreBreakdown'
import TruthReveal from './TruthReveal'
import Aftermath from './Aftermath'
import TitleReveal from './TitleReveal'
import ShareResult from './ShareResult'

type ResultTab = 'score' | 'truth' | 'titles' | 'aftermath' | 'share'

export default function ResultScreen() {
  const verdictScore = useGameStore((s) => s.verdictScore)
  const caseData = useGameStore((s) => s.caseData)
  const initializeCase = useGameStore((s) => s.initializeCase)
  const [tab, setTab] = useState<ResultTab>('score')

  if (!verdictScore || !caseData) return null

  // 홈으로
  const handleHome = () => {
    useGameStore.setState({ caseData: null })
    useGameStore.getState().setPhase(GamePhase.Phase0_CaseIntro)
    useGameStore.getState().clearDialogue()
  }

  // 다음 재판 (새 사건)
  const handleReplay = () => {
    const newCase = getRandomCase()
    initializeCase(newCase)
  }

  // 다시 판결하기 (같은 사건, 판결 단계로)
  const handleRetry = () => {
    useGameStore.getState().resetVerdict()
    useGameStore.getState().setPhase(GamePhase.Phase7_Verdict)
  }

  const TABS: { id: ResultTab; label: string }[] = [
    { id: 'score', label: '평가' },
    { id: 'truth', label: '진실' },
    { id: 'titles', label: '칭호' },
    { id: 'aftermath', label: '후일담' },
    { id: 'share', label: '공유' },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* 히어로 헤더 — 애니메이션 */}
      <div className="text-center pt-8 pb-4 px-4 bg-gradient-to-b from-amber-950/20 to-transparent">
        <div className="text-5xl mb-3 animate-scale-in">⚖️</div>
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
        {tab === 'aftermath' && <Aftermath />}
        {tab === 'share' && <ShareResult />}
      </div>

      {/* 하단 버튼 */}
      <div className="border-t border-gray-800 px-4 py-3 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={handleHome}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            🏠 홈으로
          </button>
          <button
            onClick={handleReplay}
            className="flex-1 bg-amber-600 hover:bg-amber-500 text-gray-950 font-bold py-2.5 rounded-xl transition-colors text-sm"
          >
            ⚖️ 다음 재판
          </button>
        </div>
        <button
          onClick={handleRetry}
          className="w-full text-xs py-1.5 text-gray-500 hover:text-gray-300 transition-colors"
        >
          🔄 다시 판결하기
        </button>
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
