/**
 * 미니게임: 기억 조각 맞추기
 * 심문 중 증거 발견 확률 이벤트를 플레이어 스킬로 전환.
 * 3개의 단서 조각을 3초 안에 순서대로 탭하면 성공.
 * 실패 시 증거 발견 실패. 광고 보기로 즉시 성공 가능.
 */
import { useState, useEffect, useCallback } from 'react'
import Emoji from '../common/Emoji'

interface Props {
  /** 단서 조각 3개 (짧은 텍스트) */
  clues: [string, string, string]
  /** 성공 시 콜백 */
  onSuccess: () => void
  /** 실패 시 콜백 */
  onFail: () => void
  /** 광고 보기 콜백 (100% 성공) */
  onWatchAd: () => void
  /** 제한 시간 (초, 기본 6) */
  timeLimit?: number
}

export default function MemoryPuzzle({ clues, onSuccess, onFail, onWatchAd, timeLimit = 6 }: Props) {
  const [phase, setPhase] = useState<'show' | 'play' | 'result'>('show')
  const [shuffled, setShuffled] = useState<{ text: string; idx: number }[]>([])
  const [tapped, setTapped] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [result, setResult] = useState<'success' | 'fail' | null>(null)

  // 1단계: 정답 순서 보여주기 (3초)
  useEffect(() => {
    const timer = setTimeout(() => {
      // 셔플
      const items = clues.map((text, idx) => ({ text, idx }))
      const shuffledItems = [...items].sort(() => Math.random() - 0.5)
      setShuffled(shuffledItems)
      setPhase('play')
    }, 3000)
    return () => clearTimeout(timer)
  }, [clues])

  // 2단계: 카운트다운
  useEffect(() => {
    if (phase !== 'play') return
    if (timeLeft <= 0) {
      setPhase('result')
      setResult('fail')
      return
    }
    const timer = setInterval(() => setTimeLeft(t => t - 0.1), 100)
    return () => clearInterval(timer)
  }, [phase, timeLeft])

  const handleTap = useCallback((originalIdx: number) => {
    if (phase !== 'play') return
    const expectedIdx = tapped.length
    if (originalIdx === expectedIdx) {
      const newTapped = [...tapped, originalIdx]
      setTapped(newTapped)
      if (newTapped.length === 3) {
        setPhase('result')
        setResult('success')
      }
    } else {
      // 틀림 → 실패
      setPhase('result')
      setResult('fail')
    }
  }, [phase, tapped])

  // 결과 처리
  useEffect(() => {
    if (result === 'success') {
      const timer = setTimeout(onSuccess, 800)
      return () => clearTimeout(timer)
    }
  }, [result, onSuccess])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-amber-700/50 rounded-2xl p-5 w-[320px] shadow-2xl">
        {/* 보여주기 단계 */}
        {phase === 'show' && (
          <div className="text-center space-y-3">
            <div className="text-sm font-bold text-amber-400">단서를 기억하세요!</div>
            <div className="space-y-2">
              {clues.map((clue, i) => (
                <div key={i} className="flex items-center gap-2 bg-amber-950/30 rounded-lg px-3 py-2">
                  <span className="text-amber-400 font-bold text-sm">{i + 1}</span>
                  <span className="text-xs text-gray-300">{clue}</span>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500">위 순서(1→2→3)대로 탭하세요!</div>
          </div>
        )}

        {/* 플레이 단계 */}
        {phase === 'play' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-amber-400">순서대로 탭하세요!</span>
              <span className={`text-sm font-bold ${timeLeft < 1 ? 'text-red-400' : 'text-gray-400'}`}>
                {timeLeft.toFixed(1)}초
              </span>
            </div>
            {/* 타이머 바 */}
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-amber-500 transition-all"
                style={{ width: `${(timeLeft / timeLimit) * 100}%` }}
              />
            </div>
            {/* 셔플된 조각들 */}
            <div className="space-y-2">
              {shuffled.map((item) => {
                const isTapped = tapped.includes(item.idx)
                return (
                  <button
                    key={item.idx}
                    onClick={() => handleTap(item.idx)}
                    disabled={isTapped}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all active:scale-95 ${
                      isTapped
                        ? 'bg-emerald-900/40 border border-emerald-600/30 text-emerald-400'
                        : 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-amber-600'
                    }`}
                  >
                    {isTapped
                      ? <><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold mr-1.5">{tapped.indexOf(item.idx) + 1}</span> {item.text}</>
                      : <><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-700 text-gray-500 text-[10px] font-bold mr-1.5">?</span> {item.text}</>
                    }
                  </button>
                )
              })}
            </div>
            <div className="text-center text-xs text-gray-600">
              {tapped.length}/3 선택
            </div>
          </div>
        )}

        {/* 결과 */}
        {phase === 'result' && (
          <div className="text-center space-y-3">
            {result === 'success' ? (
              <>
                <Emoji char="🎯" size={48} />
                <div className="text-sm font-bold text-emerald-400">단서를 찾았다!</div>
              </>
            ) : (
              <>
                <Emoji char="💭" size={48} />
                <div className="text-sm font-bold text-gray-400">단서를 놓쳤다...</div>
                <div className="flex gap-2">
                  <button
                    onClick={onWatchAd}
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-600 text-gray-950 active:scale-95"
                  >
                    광고 보고 획득
                  </button>
                  <button
                    onClick={onFail}
                    className="flex-1 py-2 rounded-xl text-xs text-gray-500 bg-gray-800 active:scale-95"
                  >
                    포기
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
