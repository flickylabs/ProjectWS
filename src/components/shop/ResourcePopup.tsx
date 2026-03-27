/**
 * 돋보기/번개 클릭 시 나타나는 상태 팝업.
 * - 현재 보유량 / 최대치
 * - 다음 충전까지 카운트다운 (돋보기만)
 * - 광고 보기 버튼
 */
import { useState, useEffect } from 'react'
import Emoji from '../common/Emoji'

interface Props {
  type: 'invest' | 'skill'
  current: number
  max: number
  /** 다음 충전까지 남은 초 (invest만) */
  countdown?: number
  /** 오늘 남은 광고 횟수 */
  adRemaining: number
  onWatchAd: () => boolean
  onClose: () => void
}

export default function ResourcePopup({ type, current, max, countdown, adRemaining, onWatchAd, onClose }: Props) {
  const [countdownSec, setCountdownSec] = useState(countdown ?? 0)
  const [adResult, setAdResult] = useState<string | null>(null)

  // 카운트다운 틱
  useEffect(() => {
    if (type !== 'invest' || !countdown) return
    setCountdownSec(countdown)
    const timer = setInterval(() => {
      setCountdownSec(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [type, countdown])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}분 ${s < 10 ? '0' : ''}${s}초`
  }

  const icon = type === 'invest' ? '🔍' : '⚡'
  const label = type === 'invest' ? '조사 토큰' : '스킬 포인트'
  const rechargeInfo = type === 'invest' ? '1시간마다 1개 자동 충전' : '이벤트 보상으로 획득'

  const handleAd = () => {
    const success = onWatchAd()
    if (success) {
      setAdResult('충전 완료!')
      setTimeout(() => setAdResult(null), 1500)
    } else {
      setAdResult(current >= max ? '이미 가득 찼습니다' : '오늘 광고 횟수를 모두 사용했습니다')
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
            <div className="text-xs text-gray-500">{rechargeInfo}</div>
          </div>
        </div>

        {/* 보유량 바 */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">보유량</span>
            <span className="text-amber-400 font-bold">{current} / {max}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${type === 'invest' ? 'bg-amber-500' : 'bg-blue-500'}`}
              style={{ width: `${(current / max) * 100}%` }}
            />
          </div>
          {/* 개별 칸 표시 */}
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: max }, (_, i) => (
              <div key={i} className={`flex-1 h-1 rounded-sm ${i < current ? (type === 'invest' ? 'bg-amber-500' : 'bg-blue-500') : 'bg-gray-800'}`} />
            ))}
          </div>
        </div>

        {/* 카운트다운 (돋보기만) */}
        {type === 'invest' && current < max && (
          <div className="text-center mb-3 py-2 bg-gray-800/60 rounded-lg">
            <div className="text-xs text-gray-500">다음 충전까지</div>
            <div className="text-lg font-bold text-amber-400">{formatTime(countdownSec)}</div>
          </div>
        )}
        {type === 'invest' && current >= max && (
          <div className="text-center mb-3 py-2 bg-emerald-950/30 rounded-lg">
            <div className="text-xs text-emerald-400">가득 찼습니다</div>
          </div>
        )}

        {/* 광고 보기 */}
        <button
          onClick={handleAd}
          disabled={adRemaining <= 0 || current >= max}
          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
            adRemaining > 0 && current < max
              ? 'bg-amber-600 text-gray-950 hover:bg-amber-500'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          {adRemaining > 0 ? `광고 보고 충전 (${adRemaining}회 남음)` : '오늘 광고 소진'}
        </button>

        {adResult && (
          <div className="text-center text-xs text-amber-400 mt-2 animate-fade-in">{adResult}</div>
        )}

        {/* 닫기 */}
        <button onClick={onClose} className="w-full mt-2 py-1.5 text-xs text-gray-500 hover:text-gray-300">
          닫기
        </button>
      </div>
    </div>
  )
}
