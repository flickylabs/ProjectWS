/**
 * 불충분 심리 경고 배너
 * 16턴 초과 + verdictEligible 미달 시 표시.
 */

import { useGameStore } from '../../store/useGameStore'

export default function ForcedVerdictBanner() {
  const verdictMode = useGameStore((s) => s.verdictMode)

  if (verdictMode !== 'forced_incomplete') return null

  return (
    <div className="bg-red-950/40 border border-red-700/40 rounded-xl px-3 py-2 mx-3 mb-2 animate-fade-in">
      <div className="flex items-start gap-2">
        <span className="text-sm mt-0.5">⚠️</span>
        <div>
          <p className="text-xs font-semibold text-red-400">불충분 심리</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            핵심 쟁점이 충분히 정리되지 않았습니다. 판결은 가능하지만 신뢰도 감점이 적용됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
