/**
 * 이모지 짝 맞추기 미니게임 — 증거 깊이 해금용
 * 6쌍 = 12장의 이모지 카드를 3x4 그리드로 배치, 45초 제한
 */
import { useState, useEffect, useCallback } from 'react'
import Emoji from '../common/Emoji'

const EMOJI_POOL = ['⚖️', '🔍', '📋', '🔒', '💼', '🏠', '🤝', '🔥', '⭐', '🎯', '📄', '⚡', '💡', '🏆']
const TOTAL_PAIRS = 6
const TIME_LIMIT = 45

interface Props {
  onSuccess: () => void
  onFail: () => void
  onWatchAd: () => void
}

interface Card {
  id: number
  emoji: string
  pairId: number
  flipped: boolean
  matched: boolean
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildCards(): Card[] {
  const chosen = shuffle(EMOJI_POOL).slice(0, TOTAL_PAIRS)
  const cards: Card[] = []
  chosen.forEach((emoji, pairId) => {
    cards.push({ id: pairId * 2,     emoji, pairId, flipped: false, matched: false })
    cards.push({ id: pairId * 2 + 1, emoji, pairId, flipped: false, matched: false })
  })
  return shuffle(cards)
}

export default function MatchingPuzzle({ onSuccess, onFail, onWatchAd }: Props) {
  const [cards, setCards] = useState<Card[]>(() => buildCards())
  const [selected, setSelected] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [result, setResult] = useState<'success' | 'fail' | null>(null)
  const [matchedCount, setMatchedCount] = useState(0)
  const [locked, setLocked] = useState(false)

  // 카운트다운
  useEffect(() => {
    if (result) return
    if (timeLeft <= 0) { setResult('fail'); return }
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 0.1)), 100)
    return () => clearInterval(timer)
  }, [result, timeLeft])

  // 성공 처리
  useEffect(() => {
    if (result === 'success') {
      const timer = setTimeout(onSuccess, 1200)
      return () => clearTimeout(timer)
    }
  }, [result, onSuccess])

  const handleCardClick = useCallback((cardId: number) => {
    if (result || locked) return
    const card = cards.find(c => c.id === cardId)
    if (!card || card.flipped || card.matched) return
    if (selected.length >= 2) return

    setCards(prev => prev.map(c => c.id === cardId ? { ...c, flipped: true } : c))
    const newSelected = [...selected, cardId]
    setSelected(newSelected)

    if (newSelected.length === 2) {
      setLocked(true)
      const first = cards.find(c => c.id === newSelected[0])!
      const second = cards.find(c => c.id === cardId)!

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.pairId === first.pairId ? { ...c, matched: true } : c
          ))
          setMatchedCount(prev => {
            const next = prev + 1
            if (next >= TOTAL_PAIRS) setResult('success')
            return next
          })
          setSelected([])
          setLocked(false)
        }, 500)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            newSelected.includes(c.id) ? { ...c, flipped: false } : c
          ))
          setSelected([])
          setLocked(false)
        }, 800)
      }
    }
  }, [cards, selected, result, locked])

  const timerPct = (timeLeft / TIME_LIMIT) * 100
  const timerColor = timeLeft < 10 ? 'bg-red-500' : timeLeft < 20 ? 'bg-amber-400' : 'bg-emerald-500'

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {result === null && (
        <>
          {/* 상단 헤더 */}
          <div className="w-full max-w-sm px-4 mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-amber-400">짝을 맞추세요!</span>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold tabular-nums ${timeLeft < 10 ? 'text-red-400' : 'text-gray-300'}`}>
                  {Math.ceil(timeLeft)}초
                </span>
                <button
                  onClick={onFail}
                  className="text-xs text-gray-500 hover:text-gray-300 active:scale-95 transition-all px-2 py-1 rounded-lg bg-gray-800 border border-gray-700"
                >
                  ✕ 포기
                </button>
              </div>
            </div>
            {/* 타이머 바 */}
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-100 ${timerColor}`}
                style={{ width: `${timerPct}%` }}
              />
            </div>
          </div>

          {/* 카드 그리드 3x4 */}
          <div className="grid grid-cols-3 gap-3 px-4 w-full max-w-sm">
            {cards.map(card => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.matched || (card.flipped && selected.length < 2)}
                className={`
                  h-20 rounded-2xl flex items-center justify-center
                  transition-transform duration-300 active:scale-95
                  ${card.matched
                    ? 'bg-emerald-900/40 border-2 border-emerald-500/60 scale-95'
                    : card.flipped
                    ? 'bg-amber-900/30 border-2 border-amber-500/60'
                    : 'bg-gray-800 border-2 border-gray-700 hover:border-gray-500'
                  }
                `}
              >
                {card.flipped || card.matched
                  ? <Emoji char={card.emoji} size={36} />
                  : <span className="text-2xl text-gray-600 font-bold">?</span>
                }
              </button>
            ))}
          </div>

          {/* 하단 진행도 */}
          <div className="mt-4 text-sm text-gray-500">
            {matchedCount} / {TOTAL_PAIRS} 쌍 완료
          </div>
        </>
      )}

      {result === 'success' && (
        <div className="text-center space-y-4">
          <Emoji char="🎯" size={64} />
          <div className="text-lg font-bold text-emerald-400">모든 짝을 찾았다!</div>
        </div>
      )}

      {result === 'fail' && (
        <div className="text-center space-y-4 px-8">
          <Emoji char="💭" size={64} />
          <div className="text-base font-bold text-gray-400">시간 초과...</div>
          <div className="flex gap-3">
            <button
              onClick={onWatchAd}
              className="flex-1 py-3 rounded-2xl text-sm font-bold bg-amber-500 text-gray-950 active:scale-95 transition-transform"
            >
              광고 보고 획득
            </button>
            <button
              onClick={onFail}
              className="flex-1 py-3 rounded-2xl text-sm text-gray-400 bg-gray-800 border border-gray-700 active:scale-95 transition-transform"
            >
              포기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
