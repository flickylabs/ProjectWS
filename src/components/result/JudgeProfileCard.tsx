import { useRef, useCallback } from 'react'
import { TITLE_LABELS, AXIS_LABELS, TIER_LABELS } from '../../engine/judgeProfileEngine'
import type { JudgeProfile } from '../../engine/judgeProfileEngine'

/** 축 미니 바 (카드용) */
function MiniAxisBar({ label, value, negLabel, posLabel }: {
  label: string; value: number; negLabel: string; posLabel: string
}) {
  const pct = (value + 100) / 2
  const barColor = value < 0 ? 'bg-blue-500' : value > 0 ? 'bg-amber-500' : 'bg-gray-500'
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-8 text-gray-400 text-right shrink-0">{label}</span>
      <div className="flex-1 relative h-2.5 bg-gray-700 rounded-full overflow-hidden">
        <div className="absolute left-1/2 top-0 h-full w-px bg-gray-500 z-10" />
        {value < 0 && (
          <div className={`absolute top-0 h-full ${barColor} rounded-r-full`}
            style={{ left: `${pct}%`, width: `${50 - pct}%` }} />
        )}
        {value > 0 && (
          <div className={`absolute top-0 h-full ${barColor} rounded-l-full`}
            style={{ left: '50%', width: `${pct - 50}%` }} />
        )}
      </div>
      <span className="w-10 text-[10px] text-gray-500 shrink-0">
        {value <= -20 ? negLabel : value >= 20 ? posLabel : '-'}
      </span>
    </div>
  )
}

interface JudgeProfileCardProps {
  profile: JudgeProfile
}

export default function JudgeProfileCard({ profile }: JudgeProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const titleInfo = TITLE_LABELS[profile.titleId] ?? TITLE_LABELS.neutral_observer
  const tierInfo = TIER_LABELS[profile.tier]

  const handleDownload = useCallback(async () => {
    const el = cardRef.current
    if (!el) return

    try {
      // Canvas API 기반 이미지 생성 (외부 라이브러리 없이)
      const canvas = document.createElement('canvas')
      const scale = 2 // 고해상도
      const w = el.offsetWidth
      const h = el.offsetHeight
      canvas.width = w * scale
      canvas.height = h * scale

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.scale(scale, scale)

      // 배경
      ctx.fillStyle = '#1a1a2e'
      ctx.roundRect(0, 0, w, h, 16)
      ctx.fill()

      // 테두리
      ctx.strokeStyle = '#3b3b5c'
      ctx.lineWidth = 1
      ctx.roundRect(0, 0, w, h, 16)
      ctx.stroke()

      // 헤더
      ctx.fillStyle = '#9ca3af'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('솔로몬 법정', w / 2, 30)

      // 칭호
      ctx.fillStyle = '#fcd34d'
      ctx.font = 'bold 18px sans-serif'
      ctx.fillText(titleInfo.name, w / 2, 58)
      ctx.fillStyle = '#9ca3af'
      ctx.font = '12px sans-serif'
      ctx.fillText(titleInfo.subtitle, w / 2, 78)

      // 구분선
      ctx.strokeStyle = '#374151'
      ctx.beginPath()
      ctx.moveTo(24, 92)
      ctx.lineTo(w - 24, 92)
      ctx.stroke()

      // 축 바
      const axes = [
        { label: AXIS_LABELS.inquiry.label, value: profile.inquiryAxis, neg: AXIS_LABELS.inquiry.negative, pos: AXIS_LABELS.inquiry.positive },
        { label: AXIS_LABELS.judgment.label, value: profile.judgmentAxis, neg: AXIS_LABELS.judgment.negative, pos: AXIS_LABELS.judgment.positive },
        { label: AXIS_LABELS.resolution.label, value: profile.resolutionAxis, neg: AXIS_LABELS.resolution.negative, pos: AXIS_LABELS.resolution.positive },
      ]

      let y = 110
      for (const axis of axes) {
        const barX = 56
        const barW = w - 100
        const barH = 8
        const pct = (axis.value + 100) / 2

        ctx.fillStyle = '#9ca3af'
        ctx.font = '11px sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText(axis.label, barX - 8, y + 6)

        // 바 배경
        ctx.fillStyle = '#374151'
        ctx.beginPath()
        ctx.roundRect(barX, y, barW, barH, 4)
        ctx.fill()

        // 값 바
        if (axis.value !== 0) {
          ctx.fillStyle = axis.value < 0 ? 'rgba(59,130,246,0.6)' : 'rgba(245,158,11,0.6)'
          const fillLeft = axis.value < 0 ? barX + barW * pct / 100 : barX + barW * 0.5
          const fillW = axis.value < 0 ? barW * (50 - pct) / 100 : barW * (pct - 50) / 100
          ctx.beginPath()
          ctx.roundRect(fillLeft, y, fillW, barH, 2)
          ctx.fill()
        }

        // 방향 라벨
        ctx.fillStyle = '#6b7280'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'left'
        const dirLabel = axis.value <= -20 ? axis.neg : axis.value >= 20 ? axis.pos : ''
        ctx.fillText(dirLabel, barX + barW + 6, y + 7)

        y += 26
      }

      // 구분선
      ctx.strokeStyle = '#374151'
      ctx.beginPath()
      ctx.moveTo(24, y + 4)
      ctx.lineTo(w - 24, y + 4)
      ctx.stroke()

      // 하단 정보
      y += 24
      ctx.fillStyle = '#d1d5db'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`사건 ${profile.casesCompleted}건 | ${tierInfo.name}`, w / 2, y)

      // 서브태그
      if (profile.subtags.length > 0) {
        y += 20
        ctx.fillStyle = '#9ca3af'
        ctx.font = '11px sans-serif'
        ctx.fillText(profile.subtags.map(t => `#${t}`).join(' '), w / 2, y)
      }

      // 다운로드
      const link = document.createElement('a')
      link.download = 'solomon-judge-profile.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('[Solomon] 프로필 카드 다운로드 실패:', err)
    }
  }, [profile, titleInfo, tierInfo])

  return (
    <div className="space-y-3">
      {/* 프로필 카드 (DOM 렌더링) */}
      <div
        ref={cardRef}
        className="bg-[#1a1a2e] border border-gray-700 rounded-2xl p-5 max-w-xs mx-auto"
      >
        {/* 헤더 */}
        <div className="text-center text-xs text-gray-400 mb-3">솔로몬 법정</div>

        {/* 칭호 */}
        <div className="text-center mb-4">
          <div className="text-lg font-bold text-amber-300">{titleInfo.name}</div>
          <div className="text-xs text-gray-400 mt-0.5">{titleInfo.subtitle}</div>
        </div>

        <div className="border-t border-gray-700 my-3" />

        {/* 3축 미니 바 */}
        <div className="space-y-2 mb-3">
          <MiniAxisBar
            label={AXIS_LABELS.inquiry.label}
            value={profile.inquiryAxis}
            negLabel={AXIS_LABELS.inquiry.negative}
            posLabel={AXIS_LABELS.inquiry.positive}
          />
          <MiniAxisBar
            label={AXIS_LABELS.judgment.label}
            value={profile.judgmentAxis}
            negLabel={AXIS_LABELS.judgment.negative}
            posLabel={AXIS_LABELS.judgment.positive}
          />
          <MiniAxisBar
            label={AXIS_LABELS.resolution.label}
            value={profile.resolutionAxis}
            negLabel={AXIS_LABELS.resolution.negative}
            posLabel={AXIS_LABELS.resolution.positive}
          />
        </div>

        <div className="border-t border-gray-700 my-3" />

        {/* 하단 정보 */}
        <div className="text-center">
          <div className="text-xs text-gray-300">
            사건 {profile.casesCompleted}건 | {tierInfo.emoji} {tierInfo.name}
          </div>
          {profile.subtags.length > 0 && (
            <div className="text-[10px] text-gray-500 mt-1">
              {profile.subtags.map(t => `#${t}`).join(' ')}
            </div>
          )}
        </div>
      </div>

      {/* 다운로드 버튼 */}
      <div className="text-center">
        <button
          onClick={handleDownload}
          className="text-xs px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
        >
          이미지로 저장
        </button>
      </div>
    </div>
  )
}
