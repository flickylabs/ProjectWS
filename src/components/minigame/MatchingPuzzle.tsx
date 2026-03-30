/**
 * 짝 맞추기 미니게임 — 증거 깊이 해금용
 * 6장의 카드(3쌍)를 뒤집어서 짝을 맞추면 성공.
 * 30초 제한, 실패 시 광고/포기 선택.
 */
import { useState, useEffect, useCallback } from 'react'
import Emoji from '../common/Emoji'

interface Props {
  /** 짝 맞추기 힌트 (3쌍 = 6장) */
  pairs: [string, string][]
  onSuccess: () => void
  onFail: () => void
  onWatchAd: () => void
}

interface Card {
  id: number
  text: string
  pairId: number
  flipped: boolean
  matched: boolean
}

export default function MatchingPuzzle({ pairs, onSuccess, onFail, onWatchAd }: Props) {
  const [cards, setCards] = useState<Card[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [result, setResult] = useState<'success' | 'fail' | null>(null)
  const [matchedCount, setMatchedCount] = useState(0)

  // 카드 초기화 (셔플)
  useEffect(() => {
    const allCards: Card[] = []
    pairs.forEach((pair, pairIdx) => {
      allCards.push({ id: pairIdx * 2, text: pair[0], pairId: pairIdx, flipped: false, matched: false })
      allCards.push({ id: pairIdx * 2 + 1, text: pair[1], pairId: pairIdx, flipped: false, matched: false })
    })
    // 셔플
    for (let i = allCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allCards[i], allCards[j]] = [allCards[j], allCards[i]]
    }
    setCards(allCards)
  }, [pairs])

  // 카운트다운
  useEffect(() => {
    if (result) return
    if (timeLeft <= 0) { setResult('fail'); return }
    const timer = setInterval(() => setTimeLeft(t => t - 0.1), 100)
    return () => clearInterval(timer)
  }, [result, timeLeft])

  // 성공 처리
  useEffect(() => {
    if (result === 'success') {
      const timer = setTimeout(onSuccess, 1000)
      return () => clearTimeout(timer)
    }
  }, [result, onSuccess])

  const handleCardClick = useCallback((cardId: number) => {
    if (result) return
    const card = cards.find(c => c.id === cardId)
    if (!card || card.flipped || card.matched) return
    if (selected.length >= 2) return

    // 카드 뒤집기
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, flipped: true } : c))
    const newSelected = [...selected, cardId]
    setSelected(newSelected)

    if (newSelected.length === 2) {
      const first = cards.find(c => c.id === newSelected[0])!
      const second = cards.find(c => c.id === cardId)!

      if (first.pairId === second.pairId) {
        // 매칭 성공
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.pairId === first.pairId ? { ...c, matched: true } : c
          ))
          const newCount = matchedCount + 1
          setMatchedCount(newCount)
          if (newCount >= pairs.length) {
            setResult('success')
          }
          setSelected([])
        }, 500)
      } else {
        // 매칭 실패 — 1초 후 다시 뒤집기
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            newSelected.includes(c.id) ? { ...c, flipped: false } : c
          ))
          setSelected([])
        }, 800)
      }
    }
  }, [cards, selected, result, matchedCount, pairs.length])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-amber-700/50 rounded-2xl p-5 w-[340px] shadow-2xl">
        {result === null && (
          <>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-amber-400">짝을 맞추세요!</span>
              <span className={`text-sm font-bold ${timeLeft < 10 ? 'text-red-400' : 'text-gray-400'}`}>
                {timeLeft.toFixed(1)}초
              </span>
            </div>
            {/* 타이머 바 */}
            <div className="w-full bg-gray-800 rounded-full h-1.5 mb-4">
              <div className="h-1.5 rounded-full bg-amber-500 transition-all" style={{ width: `${(timeLeft / 30) * 100}%` }} />
            </div>
            {/* 카드 그리드 */}
            <div className="grid grid-cols-3 gap-2">
              {cards.map(card => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  disabled={card.flipped || card.matched}
                  className={`h-16 rounded-xl text-xs font-medium transition-all active:scale-95 flex items-center justify-center p-1.5 text-center leading-tight ${
                    card.matched
                      ? 'bg-emerald-900/40 border border-emerald-600/30 text-emerald-400'
                      : card.flipped
                      ? 'bg-amber-900/40 border border-amber-600/30 text-amber-300'
                      : 'bg-gray-800 border border-gray-600 text-gray-400 hover:border-amber-600'
                  }`}
                >
                  {card.flipped || card.matched ? card.text : <Emoji char="❓" size={20} />}
                </button>
              ))}
            </div>
            <div className="text-center text-xs text-gray-600 mt-2">
              {matchedCount}/{pairs.length} 쌍 완료
            </div>
          </>
        )}

        {result === 'success' && (
          <div className="text-center space-y-3 py-4">
            <Emoji char="🎯" size={48} />
            <div className="text-sm font-bold text-emerald-400">모든 짝을 찾았다!</div>
          </div>
        )}

        {result === 'fail' && (
          <div className="text-center space-y-3 py-4">
            <Emoji char="💭" size={48} />
            <div className="text-sm font-bold text-gray-400">시간 초과...</div>
            <div className="flex gap-2">
              <button onClick={onWatchAd} className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-600 text-gray-950 active:scale-95">
                광고 보고 획득
              </button>
              <button onClick={onFail} className="flex-1 py-2 rounded-xl text-xs text-gray-500 bg-gray-800 active:scale-95">
                포기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
