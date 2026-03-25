import { useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
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

  const handleReplay = () => initializeCase(caseData)

  const TABS: { id: ResultTab; label: string }[] = [
    { id: 'score', label: '평가' },
    { id: 'truth', label: '진실' },
    { id: 'titles', label: '칭호' },
    { id: 'aftermath', label: '후일담' },
    { id: 'share', label: '공유' },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="text-center pt-6 pb-3 px-4">
        <div className="text-4xl mb-2">⚖️</div>
        <h2 className="text-lg font-bold">판결이 완료되었습니다</h2>
        <div className="text-2xl font-bold text-amber-400 mt-1">{verdictScore.total}점</div>
        <div className="text-xs text-gray-500">{getRating(verdictScore.total)}</div>
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

      {/* 재시작 */}
      <div className="border-t border-gray-800 px-4 py-3 text-center">
        <button
          onClick={handleReplay}
          className="bg-amber-600 hover:bg-amber-500 text-gray-950 font-bold px-8 py-2.5 rounded-lg transition-colors text-sm"
        >
          다시 재판하기
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
