/**
 * 판결 준비 상태 배너
 * - 불충분 심리 경고 (16턴 초과 + verdictEligible 미달)
 * - 일반 readiness 힌트 (숫자 숨김, 텍스트만)
 */

import { useGameStore } from '../../store/useGameStore'
import { getReadinessHint } from '../../engine/meterStagingV2'
import Emoji from '../common/Emoji'

export default function ForcedVerdictBanner() {
  const verdictMode = useGameStore((s) => s.verdictMode)
  const turnCount = useGameStore((s) => s.turnCount)
  const readinessState = useGameStore((s) => s.readinessState)

  // 강제 판결 경고 (최우선)
  if (verdictMode === 'forced_incomplete') {
    return (
      <div className="bg-red-950/40 border border-red-700/40 rounded-xl px-3 py-2 mx-3 mb-2 animate-fade-in">
        <div className="flex items-start gap-2">
          <span className="mt-0.5"><Emoji char="⚠️" size={16} /></span>
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

  // readiness 힌트 (일반 진행)
  if (!readinessState || turnCount < 3) return null

  const hint = getReadinessHint(turnCount, readinessState)

  const bgMap = {
    muted: 'bg-zinc-900/40 border-zinc-700/30',
    info: 'bg-blue-950/30 border-blue-700/30',
    ready: 'bg-emerald-950/30 border-emerald-600/30',
  }
  const textMap = {
    muted: 'text-zinc-400',
    info: 'text-blue-400',
    ready: 'text-emerald-400',
  }
  const iconMap = {
    muted: '📋',
    info: '🔍',
    ready: '✅',
  }

  return (
    <div className={`${bgMap[hint.highlight]} border rounded-xl px-3 py-2 mx-3 mb-2`}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5"><Emoji char={iconMap[hint.highlight]} size={16} /></span>
        <div>
          <p className={`text-xs font-semibold ${textMap[hint.highlight]}`}>{hint.label}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{hint.detail}</p>
        </div>
      </div>
    </div>
  )
}
