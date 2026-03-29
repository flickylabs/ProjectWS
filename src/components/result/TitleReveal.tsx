import { useEffect, useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { evaluateTitles, saveUnlockedTitles, loadUnlockedTitles, type Title } from '../../data/titles'
import Emoji from '../common/Emoji'

export default function TitleReveal() {
  const verdictScore = useGameStore((s) => s.verdictScore)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const turnCount = useGameStore((s) => s.turnCount)
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const skillUseCounts = useGameStore((s) => s.skillUseCounts)
  const caseData = useGameStore((s) => s.caseData)

  const processMetrics = useGameStore((s) => s.processMetrics)
  const [titles, setTitles] = useState<Title[]>([])
  const [newTitles, setNewTitles] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!verdictScore || !caseData) return

    const collapsedA = Object.values(agentA.lieStateMap).filter((e) => e.currentState === 'S5').length
    const collapsedB = Object.values(agentB.lieStateMap).filter((e) => e.currentState === 'S5').length
    const totalLies = Object.keys(agentA.lieStateMap).length + Object.keys(agentB.lieStateMap).length

    const meta = {
      turnsUsed: turnCount,
      evidencePresented: Object.values(evidenceStates).filter((e) => e.presented).length,
      trustActionsUsed: processMetrics.trustActionsUsed,
      skillsUsed: Object.values(skillUseCounts).reduce((a, b) => a + b, 0),
      collapsedDisputes: collapsedA + collapsedB,
      totalDisputes: totalLies,
    }

    const earned = evaluateTitles(verdictScore, verdictInput, meta)
    setTitles(earned)

    // 신규 칭호 확인
    const existing = loadUnlockedTitles()
    const newIds = earned.filter((t) => !existing.includes(t.id)).map((t) => t.id)
    setNewTitles(new Set(newIds))

    // 저장
    if (earned.length > 0) {
      saveUnlockedTitles(earned.map((t) => t.id))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (titles.length === 0) return null

  const rarityColor: Record<string, string> = {
    common: 'border-gray-600 bg-gray-800/40',
    rare: 'border-blue-700 bg-blue-950/30',
    epic: 'border-purple-700 bg-purple-950/30',
    legendary: 'border-amber-600 bg-amber-950/30',
  }

  const rarityLabel: Record<string, string> = {
    common: '일반',
    rare: '희귀',
    epic: '영웅',
    legendary: '전설',
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-amber-400 text-center">획득한 칭호</h3>
      <div className="space-y-2">
        {titles.map((t) => (
          <div key={t.id} className={`border rounded-lg p-3 ${rarityColor[t.rarity]} ${newTitles.has(t.id) ? 'ring-1 ring-amber-500' : ''}`}>
            <div className="flex items-center gap-2">
              <Emoji char={t.icon} size={20} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-200">{t.name}</span>
                  {newTitles.has(t.id) && <span className="text-xs text-amber-400 font-bold">NEW!</span>}
                  <span className={`text-xs ${t.rarity === 'legendary' ? 'text-amber-400' : t.rarity === 'epic' ? 'text-purple-400' : t.rarity === 'rare' ? 'text-blue-400' : 'text-gray-500'}`}>
                    {rarityLabel[t.rarity]}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{t.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
