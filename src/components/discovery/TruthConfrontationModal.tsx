/**
 * 진실 공방 모달 — 양측 상반된 주장에 대해 플레이어가 판단
 */
import { useState } from 'react'
import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'
import type { TruthJudgment } from '../../types/discovery'

const JUDGMENT_OPTIONS: { value: TruthJudgment; label: string; icon: string; desc: string }[] = [
  { value: 'believe_a', label: 'A의 주장이 진실이다', icon: '🔵', desc: 'A 측 주장을 신뢰합니다' },
  { value: 'believe_b', label: 'B의 주장이 진실이다', icon: '🔴', desc: 'B 측 주장을 신뢰합니다' },
  { value: 'both_partial', label: '양쪽 다 일부만 사실이다', icon: '🟡', desc: '양측 모두 부분적으로만 사실을 말하고 있습니다' },
  { value: 'undetermined', label: '아직 판단할 수 없다', icon: '⬜', desc: '더 많은 정보가 필요합니다' },
]

export default function TruthConfrontationModal() {
  const { discovery, submitJudgment, setPendingConfrontation, turnCount, caseData } = useStore((s) => s)
  const event = discovery.pendingConfrontation
  const [selected, setSelected] = useState<TruthJudgment | null>(null)

  if (!event || !caseData) return null

  const dispute = caseData.disputes.find((d) => d.id === event.disputeId)
  const partyAName = caseData.duo.partyA.name
  const partyBName = caseData.duo.partyB.name

  const handleSubmit = () => {
    if (!selected) return
    submitJudgment(event.disputeId, selected, turnCount)
  }

  const handleSkip = () => {
    setPendingConfrontation(null)
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4" onClick={handleSkip}>
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Emoji char="⚖️" size={22} />
            <h2 className="text-base font-bold text-amber-400">진실 공방</h2>
          </div>
          <button onClick={handleSkip} className="text-gray-500 hover:text-gray-300 text-lg active:scale-95">✕</button>
        </div>

        {/* 쟁점 정보 */}
        <div className="px-5 pt-4 pb-2">
          <div className="text-xs text-gray-500 mb-1">쟁점</div>
          <div className="text-sm font-medium text-gray-200">{dispute?.name ?? event.disputeId}</div>
        </div>

        {/* 양측 주장 대비 */}
        <div className="px-5 py-3 space-y-3">
          {/* A 주장 */}
          <div className="bg-blue-950/30 border border-blue-800/40 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Emoji char="🔵" size={14} />
              <span className="text-xs font-medium text-blue-400">{partyAName}의 주장</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{event.claimA.summary}</p>
          </div>

          {/* VS */}
          <div className="flex justify-center">
            <span className="text-xs text-gray-600 font-bold tracking-widest">VS</span>
          </div>

          {/* B 주장 */}
          <div className="bg-rose-950/30 border border-rose-800/40 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Emoji char="🔴" size={14} />
              <span className="text-xs font-medium text-rose-400">{partyBName}의 주장</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{event.claimB.summary}</p>
          </div>
        </div>

        {/* 판단 선택지 */}
        <div className="px-5 py-3 space-y-2">
          <div className="text-xs text-gray-500 mb-2">당신의 판단은?</div>
          {JUDGMENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={`w-full text-left rounded-xl border p-3 transition-all active:scale-[0.98] ${
                selected === opt.value
                  ? 'bg-amber-900/40 border-amber-600/60 ring-1 ring-amber-500/30'
                  : 'bg-gray-800/40 border-gray-700/40 hover:bg-gray-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <Emoji char={opt.icon} size={16} />
                <span className={`text-sm font-medium ${selected === opt.value ? 'text-amber-300' : 'text-gray-300'}`}>
                  {opt.label.replace('A', partyAName).replace('B', partyBName)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-6">{opt.desc}</p>
            </button>
          ))}
        </div>

        {/* 안내 */}
        <div className="px-5 py-2">
          <p className="text-xs text-gray-600 leading-relaxed">
            이 판단은 이후 심문 방향에 영향을 줍니다. 새로운 증거가 나오면 판단을 수정할 수 있습니다.
          </p>
        </div>

        {/* 하단 버튼 */}
        <div className="px-5 pb-5 pt-2 flex gap-2">
          <button
            onClick={handleSkip}
            className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-400 text-sm font-medium active:scale-95 hover:bg-gray-700"
          >
            나중에 판단
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold active:scale-95 transition-all ${
              selected
                ? 'bg-amber-600 text-gray-950 hover:bg-amber-500'
                : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
            }`}
          >
            판단 확정
          </button>
        </div>
      </div>
    </div>
  )
}
