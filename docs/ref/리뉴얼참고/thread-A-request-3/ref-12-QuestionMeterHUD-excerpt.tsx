/**
 * StateTransitionFeedback.tsx — QuestionMeterHUD 발췌
 * (전체 파일에서 133~252줄)
 *
 * F 요청에서 변경 대상:
 * - MeterBar의 value/pct 직접 표시 → 4단계 텍스트로 교체
 * - 하드코어 모드 토글 추가
 */

/** 미터 바 HUD — 3개 미터를 컴팩트하게 표시 */
export function QuestionMeterHUD({ party }: { party: 'a' | 'b' }) {
  const meters = useGameStore(s => s.questionMeters[party])
  const meterEffects = {
    contradictionActive: meters.contradictionTokens >= 2,
    leakWarning: meters.leakMeter >= 50,
    leakCritical: meters.leakMeter >= 80,
    trustWindowOpen: meters.trustWindow >= 60,
  }

  return (
    <div className="flex items-center gap-3">
      {/* 모순토큰 — 이산형, 변경 없음 */}
      <MeterPip
        label="모순"
        value={meters.contradictionTokens}
        max={5}
        active={meterEffects.contradictionActive}
        color="yellow"
      />
      {/* 누설미터 — 현재: 0~100% 바 표시 → 변경: 4단계 */}
      <MeterBar
        label="누설"
        value={meters.leakMeter}
        max={100}
        warning={meterEffects.leakWarning}
        critical={meterEffects.leakCritical}
        color="orange"
      />
      {/* 신뢰창구 — 현재: 0~100% 바 표시 → 변경: 4단계 */}
      <MeterBar
        label="신뢰"
        value={meters.trustWindow}
        max={100}
        warning={false}
        critical={false}
        active={meterEffects.trustWindowOpen}
        color="blue"
      />
    </div>
  )
}

/** 이산형 미터 (토큰 형태) — 변경 없음 */
function MeterPip({ label, value, max, active, color }: {
  label: string; value: number; max: number; active: boolean
  color: 'yellow' | 'orange' | 'blue'
}) {
  // ... (현재 코드 유지)
}

/** 연속형 미터 (바 형태) — ★ 단계화 대상 */
function MeterBar({ label, value, max, warning, critical, active, color }: {
  label: string; value: number; max: number
  warning: boolean; critical: boolean; active?: boolean
  color: 'yellow' | 'orange' | 'blue'
}) {
  const pct = Math.round((value / max) * 100)
  // ★ 현재: pct를 그대로 표시 → 변경: 4단계 텍스트
  // <span className={`text-[8px] ${labelColor}`}>{pct}%</span>
  // ↓
  // <span className={`text-[8px] ${labelColor}`}>{stageLabel}</span>

  const barColor = critical ? 'bg-red-500'
    : warning ? 'bg-orange-500'
    : active ? 'bg-blue-400'
    : color === 'orange' ? 'bg-orange-600/60' : 'bg-blue-600/60'

  return (
    <div className="flex items-center gap-1">
      <span className={`text-[9px] font-semibold ${labelColor}`}>{label}</span>
      <div className="w-12 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-[8px] ${labelColor}`}>{pct}%</span>
    </div>
  )
}
