import { useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { playClick } from '../../engine/soundEngine'
import Emoji from '../common/Emoji'

export default function FactChecklist() {
  const caseData = useGameStore((s) => s.caseData)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const setFactFinding = useGameStore((s) => s.setFactFinding)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const [currentIdx, setCurrentIdx] = useState(0)

  if (!caseData) return null

  const disputes = caseData.disputes
  const d = disputes[currentIdx]
  const current = verdictInput.factFindings[d.id] ?? null
  const lieA = agentA.lieStateMap[d.id]
  const lieB = agentB.lieStateMap[d.id]
  const collapsed = lieA?.currentState === 'S5' || lieB?.currentState === 'S5'
  const judgedCount = Object.keys(verdictInput.factFindings).length

  const handleSwipe = (value: 'true' | 'false' | 'pending') => {
    playClick()
    setFactFinding(d.id, value)
    // 자동으로 다음 쟁점
    if (currentIdx < disputes.length - 1) {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 300)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-amber-400">① 사실 인정</h3>
        <span className="text-xs text-gray-500">{judgedCount}/{disputes.length} 판단</span>
      </div>

      {/* 쟁점 카드 — 1개씩 표시 */}
      <div className="relative">
        <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-4 min-h-[120px] animate-fade-in" key={d.id}>
          {/* 상단 정보 */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              d.weight === 'high' ? 'bg-red-900/50 text-red-400' :
              d.weight === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
              'bg-gray-700 text-gray-400'
            }`}>
              {d.weight === 'high' ? '핵심' : d.weight === 'medium' ? '중요' : '부가'}
            </span>
            <span className="text-xs text-gray-600">{currentIdx + 1} / {disputes.length}</span>
          </div>

          {/* 쟁점명 + 진실 설명 */}
          <p className="text-base font-bold text-gray-100 leading-snug mb-1">{d.name}</p>
          <p className="text-xs text-gray-400 leading-relaxed mb-2 border-l-2 border-amber-600/30 pl-2">
            {d.judgmentStatement ?? d.truthDescription?.split(/[.!?]/)[0]?.trim()?.slice(0, 50) ?? ''}
          </p>

          {/* 붕괴 여부 */}
          {collapsed && (
            <div className="text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 rounded-lg px-2 py-1 mb-3">
              <Emoji char="⚡" size={12} /> 심문 중 거짓말이 붕괴된 쟁점
            </div>
          )}

          {/* 판정 안내 */}
          <div className="text-xs text-gray-500 mb-2">위 내용이 사실이라고 판단하십니까?</div>

          {/* 판정 버튼 */}
          <div className="flex gap-2">
            <SwipeButton
              label="아니다"
              icon="✕"
              active={current === 'false'}
              onClick={() => handleSwipe('false')}
            />
            <SwipeButton
              label="모르겠다"
              icon="—"
              active={current === 'pending'}
              onClick={() => handleSwipe('pending')}
            />
            <SwipeButton
              label="그렇다"
              icon="○"
              active={current === 'true'}
              onClick={() => handleSwipe('true')}
            />
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 — 전체 쟁점 dot */}
      <div className="flex items-center justify-center gap-2">
        {disputes.map((dd, i) => {
          const v = verdictInput.factFindings[dd.id]
          return (
            <button
              key={dd.id}
              onClick={() => setCurrentIdx(i)}
              className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                i === currentIdx ? 'ring-2 ring-amber-400 scale-110' : ''
              } ${
                v ? 'bg-amber-600 text-gray-950' : 'bg-gray-800 text-gray-500'
              }`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SwipeButton({ label, icon, active, onClick }: {
  label: string; icon: string; active: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 border rounded-xl py-3 font-bold transition-all active:scale-95 ${
        active
          ? 'bg-amber-600 text-gray-950 border-amber-500 shadow-lg shadow-amber-500/20 scale-105'
          : 'bg-gray-800/60 text-gray-400 border-gray-700 hover:border-amber-600 hover:bg-amber-950/20'
      }`}
    >
      <div className="text-lg"><Emoji char={icon} size={18} /></div>
      <div className="text-xs mt-0.5">{label}</div>
    </button>
  )
}
