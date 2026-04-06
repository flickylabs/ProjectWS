import { useMemo } from 'react'
import { loadExtendedHistory } from '../../data/leaderboard'
import { deriveJudgeProfile, TITLE_LABELS, AXIS_LABELS } from '../../engine/judgeProfileEngine'
import type { JudgeCaseTelemetryLite } from '../../engine/judgeProfileEngine'

/** 3축 바 컴포넌트: 중앙 0, 좌 -100, 우 +100 */
function AxisBar({ label, value, negLabel, posLabel }: {
  label: string
  value: number
  negLabel: string
  posLabel: string
}) {
  // value -100~+100 -> position 0~100%
  const pct = (value + 100) / 2
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span className={value < 0 ? 'text-blue-400' : value > 0 ? 'text-amber-400' : 'text-gray-400'}>
          {value > 0 ? '+' : ''}{value}
        </span>
      </div>
      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
        {/* 중앙선 */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-gray-600 z-10" />
        {/* 값 바 */}
        {value < 0 && (
          <div
            className="absolute top-0 h-full bg-blue-500/60 rounded-r-full"
            style={{ left: `${pct}%`, width: `${50 - pct}%` }}
          />
        )}
        {value > 0 && (
          <div
            className="absolute top-0 h-full bg-amber-500/60 rounded-l-full"
            style={{ left: '50%', width: `${pct - 50}%` }}
          />
        )}
        {/* 마커 */}
        <div
          className="absolute top-0 h-full w-1.5 bg-white rounded-full z-20 shadow"
          style={{ left: `calc(${pct}% - 3px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
        <span>{negLabel}</span>
        <span>{posLabel}</span>
      </div>
    </div>
  )
}

export default function JudgeProfileReport() {
  const { profile, currentTelemetry, totalGames } = useMemo(() => {
    const history = loadExtendedHistory()
    const withTelemetry = history.filter(e => e.caseTelemetry != null)
    const telemetryEntries: JudgeCaseTelemetryLite[] = withTelemetry.map(e => ({
      caseId: e.caseId,
      inquiry: e.caseTelemetry!.inquiry,
      judgment: e.caseTelemetry!.judgment,
      resolution: e.caseTelemetry!.resolution,
      date: e.date,
    }))
    const prof = deriveJudgeProfile(telemetryEntries)
    // 가장 최근 항목의 telemetry (현재 사건)
    const current = withTelemetry.length > 0 ? withTelemetry[0].caseTelemetry : null
    return { profile: prof, currentTelemetry: current, totalGames: withTelemetry.length }
  }, [])

  const titleInfo = TITLE_LABELS[profile.titleId] ?? TITLE_LABELS.neutral_observer

  return (
    <div className="space-y-5">
      {/* 칭호 */}
      <div className="text-center">
        <div className="text-lg font-bold text-amber-300">{titleInfo.name}</div>
        <div className="text-xs text-gray-400 mt-0.5">{titleInfo.subtitle}</div>
        {profile.subtags.length > 0 && (
          <div className="flex justify-center gap-1.5 mt-2">
            {profile.subtags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3축 게이지 */}
      <div className="bg-gray-800/50 rounded-xl p-4">
        <div className="text-xs text-gray-400 mb-3 font-semibold">
          {totalGames > 1 ? `누적 성향 (${totalGames}건)` : '성향 분석'}
        </div>
        <AxisBar
          label={AXIS_LABELS.inquiry.label}
          value={profile.inquiryAxis}
          negLabel={AXIS_LABELS.inquiry.negative}
          posLabel={AXIS_LABELS.inquiry.positive}
        />
        <AxisBar
          label={AXIS_LABELS.judgment.label}
          value={profile.judgmentAxis}
          negLabel={AXIS_LABELS.judgment.negative}
          posLabel={AXIS_LABELS.judgment.positive}
        />
        <AxisBar
          label={AXIS_LABELS.resolution.label}
          value={profile.resolutionAxis}
          negLabel={AXIS_LABELS.resolution.negative}
          posLabel={AXIS_LABELS.resolution.positive}
        />
      </div>

      {/* 이번 사건 vs 누적 비교 (2건 이상일 때만) */}
      {currentTelemetry && totalGames > 1 && (
        <div className="bg-gray-800/50 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-2 font-semibold">이번 사건</div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {(['inquiry', 'judgment', 'resolution'] as const).map(axis => {
              const current = currentTelemetry[axis]
              const cumulative = axis === 'inquiry' ? profile.inquiryAxis
                : axis === 'judgment' ? profile.judgmentAxis
                : profile.resolutionAxis
              const diff = current - cumulative
              return (
                <div key={axis} className="bg-gray-900/50 rounded-lg p-2">
                  <div className="text-gray-500 mb-1">{AXIS_LABELS[axis].label}</div>
                  <div className={current < 0 ? 'text-blue-400 font-bold' : current > 0 ? 'text-amber-400 font-bold' : 'text-gray-300 font-bold'}>
                    {current > 0 ? '+' : ''}{current}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${diff > 0 ? 'text-amber-500' : diff < 0 ? 'text-blue-500' : 'text-gray-600'}`}>
                    {diff > 0 ? `+${diff}` : diff < 0 ? `${diff}` : '='} vs 누적
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 설명 */}
      <div className="text-xs text-gray-500 text-center leading-relaxed">
        {getProfileDescription(profile.titleId)}
      </div>
    </div>
  )
}

function getProfileDescription(titleId: string): string {
  const descriptions: Record<string, string> = {
    cold_judge: '증거와 논리를 중시하며, 엄격한 기준으로 공정한 판결을 내리는 타입입니다.',
    practical_analyst: '논리적 분석을 바탕으로 현실적인 해결책을 찾아내는 타입입니다.',
    balanced_sage: '논리적이면서도 관대한 시선으로 원칙을 지키는 타입입니다.',
    careful_mediator: '신중한 분석과 관용적 태도로 양측의 화해를 이끄는 타입입니다.',
    instinct_judge: '직관적 판단과 엄격한 원칙으로 정의를 추구하는 타입입니다.',
    passion_arbiter: '열정적인 공감과 단호한 판단으로 해결을 이끄는 타입입니다.',
    gentle_guardian: '따뜻한 공감과 관대한 시선으로 원칙을 수호하는 타입입니다.',
    warm_mediator: '공감과 이해를 바탕으로 양측 모두가 만족하는 화해를 추구하는 타입입니다.',
    neutral_observer: '편향 없이 균형 잡힌 시선으로 사건을 바라보는 타입입니다.',
  }
  return descriptions[titleId] ?? descriptions.neutral_observer
}
