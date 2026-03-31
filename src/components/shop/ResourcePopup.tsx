/**
 * 돋보기/번개 클릭 시 나타나는 상태 팝업.
 * - 보유량 / 무료 상한(10)
 * - 10 초과 시 보너스 색상(보라) 표시
 * - 10 미만일 때만 카운트다운 표시
 * - 광고 보기 (10까지만)
 */
import { useState, useEffect } from 'react'
import Emoji from '../common/Emoji'

const FREE_CAP = 10

interface Props {
  type: 'invest' | 'skill'
  current: number
  /** 다음 충전까지 남은 초 (invest, current < 10일 때만 의미 있음) */
  countdown?: number
  /** 오늘 남은 광고 횟수 */
  adRemaining: number
  onWatchAd: () => boolean
  onClose: () => void
}

export default function ResourcePopup({ type, current, countdown, adRemaining, onWatchAd, onClose }: Props) {
  const [countdownSec, setCountdownSec] = useState(countdown ?? 0)
  const [adResult, setAdResult] = useState<string | null>(null)

  const isOverCap = current > FREE_CAP
  const isAtCap = current >= FREE_CAP
  const displayCurrent = current
  const baseAmount = Math.min(current, FREE_CAP)
  const bonusAmount = Math.max(0, current - FREE_CAP)

  useEffect(() => {
    if (type !== 'invest' || isAtCap || !countdown) return
    setCountdownSec(countdown)
    const timer = setInterval(() => {
      setCountdownSec(prev => {
        if (prev <= 1) { clearInterval(timer); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [type, countdown, isAtCap])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}분 ${s < 10 ? '0' : ''}${s}초`
  }

  const icon = type === 'invest' ? '🔍' : '⚡'
  const label = type === 'invest' ? '조사 토큰' : '스킬 포인트'
  const baseColor = type === 'invest' ? 'amber' : 'blue'

  const handleAd = () => {
    const success = onWatchAd()
    if (success) {
      setAdResult('충전 완료!')
      setTimeout(() => setAdResult(null), 1500)
    } else {
      setAdResult(isAtCap ? '무료 상한에 도달했습니다' : '오늘 광고 횟수를 모두 사용했습니다')
      setTimeout(() => setAdResult(null), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 w-[300px] shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-4">
          <Emoji char={icon} size={32} />
          <div>
            <div className="text-sm font-bold text-white">{label}</div>
            <div className="text-xs text-gray-500">
              {type === 'invest' ? '1시간마다 자동 충전 (10까지)' : '이벤트/광고로 획득 (10까지)'}
            </div>
          </div>
        </div>

        {/* 보유량 표시 */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">보유량</span>
            <span className={`font-bold ${isOverCap ? 'text-purple-400' : `text-${baseColor}-400`}`}>
              {displayCurrent}{isOverCap && <span className="text-gray-500"> / {FREE_CAP}+{bonusAmount}</span>}
              {!isOverCap && <span className="text-gray-500"> / {FREE_CAP}</span>}
            </span>
          </div>

          {/* 10칸 기본 바 */}
          <div className="flex gap-0.5">
            {Array.from({ length: FREE_CAP }, (_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-sm transition-all ${
                i < baseAmount
                  ? (type === 'invest' ? 'bg-amber-500' : 'bg-blue-500')
                  : 'bg-gray-800'
              }`} />
            ))}
          </div>

          {/* 보너스 바 (10 초과분) — 보라색 */}
          {isOverCap && (
            <div className="mt-1">
              <div className="text-xs text-purple-400 mb-0.5">보너스 +{bonusAmount}</div>
              <div className="flex gap-0.5">
                {Array.from({ length: Math.min(bonusAmount, 20) }, (_, i) => (
                  <div key={i} className="flex-1 h-2 rounded-sm bg-purple-500" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 카운트다운 — 10 미만일 때만 */}
        {type === 'invest' && !isAtCap && (
          <div className="text-center mb-3 py-2 bg-gray-800/60 rounded-lg">
            <div className="text-xs text-gray-500">다음 충전까지</div>
            <div className="text-lg font-bold text-amber-400">{formatTime(countdownSec)}</div>
          </div>
        )}
        {type === 'invest' && isAtCap && !isOverCap && (
          <div className="text-center mb-3 py-2 bg-emerald-950/30 rounded-lg">
            <div className="text-xs text-emerald-400">무료 상한 도달 — 충전 정지</div>
          </div>
        )}
        {type === 'invest' && isOverCap && (
          <div className="text-center mb-3 py-2 bg-purple-950/30 rounded-lg">
            <div className="text-xs text-purple-400">보너스 보유 중 — 충전 정지</div>
          </div>
        )}

        {/* 광고 보기 — 10까지만 */}
        <button
          onClick={handleAd}
          disabled={adRemaining <= 0 || isAtCap}
          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
            adRemaining > 0 && !isAtCap
              ? `bg-${baseColor}-600 text-gray-950 hover:bg-${baseColor}-500`
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          {isAtCap ? '무료 상한 도달' : adRemaining > 0 ? `광고 보고 충전 (${adRemaining}회 남음)` : '오늘 광고 소진'}
        </button>

        {/* 아이템 구입 */}
        <button
          onClick={() => setAdResult('아이템 상점은 준비 중입니다.')}
          className="w-full mt-2 py-2.5 rounded-xl text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:border-amber-600 active:scale-95"
        >
          🛒 아이템으로 충전
        </button>

        {adResult && (
          <div className="text-center text-xs text-amber-400 mt-2 animate-fade-in">{adResult}</div>
        )}

        <button onClick={onClose} className="w-full mt-2 py-1.5 text-xs text-gray-500 hover:text-gray-300">
          닫기
        </button>
      </div>
    </div>
  )
}
