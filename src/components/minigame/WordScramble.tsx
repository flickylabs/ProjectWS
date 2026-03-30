/**
 * 미니게임: 언어 모순 찾아내기
 * 진술 문장을 단어 단위로 분해해서 섞어 놓으면,
 * 유저가 올바른 순서로 재조합해야 한다.
 * 30초 제한, 틀리면 3초 감점, 전부 맞으면 성공.
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import Emoji from '../common/Emoji'

interface Props {
  /** 원문 단어 배열 (정답 순서) */
  words: string[]
  /** 성공 시 */
  onSuccess: () => void
  /** 실패 시 */
  onFail: () => void
  /** 광고 보고 즉시 성공 */
  onWatchAd: () => void
}

type CheckResult = 'correct' | 'wrong' | null

const TOTAL_TIME = 30
const PENALTY = 3

export default function WordScramble({ words, onSuccess, onFail, onWatchAd }: Props) {
  // 셔플된 단어 목록 (원래 인덱스 보존)
  const [shuffledWords] = useState<{ word: string; id: number }[]>(() => {
    const items = words.map((word, i) => ({ word, id: i }))
    return [...items].sort(() => Math.random() - 0.5)
  })

  // 슬롯에 배치된 카드 id 목록 (null = 빈 슬롯)
  const [slots, setSlots] = useState<(number | null)[]>(Array(words.length).fill(null))

  // 아직 배치되지 않은 카드 id 목록
  const [available, setAvailable] = useState<number[]>(() =>
    words.map((_, i) => i).sort(() => Math.random() - 0.5)
  )

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [result, setResult] = useState<'success' | 'fail' | null>(null)

  // 체크 시 각 슬롯의 정오 표시 (1초간 유지 후 초기화)
  const [checkResults, setCheckResults] = useState<CheckResult[]>(Array(words.length).fill(null))
  const [isChecking, setIsChecking] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 카운트다운
  useEffect(() => {
    if (result !== null || isChecking) return

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        const next = parseFloat((t - 0.1).toFixed(1))
        if (next <= 0) {
          clearInterval(timerRef.current!)
          setResult('fail')
          return 0
        }
        return next
      })
    }, 100)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [result, isChecking])

  // 성공 처리
  useEffect(() => {
    if (result === 'success') {
      const t = setTimeout(onSuccess, 900)
      return () => clearTimeout(t)
    }
  }, [result, onSuccess])

  const allFilled = slots.every(s => s !== null)

  // 단어 카드 탭 → 다음 빈 슬롯에 배치
  const handleWordTap = useCallback((cardId: number) => {
    if (result !== null || isChecking) return
    const nextEmptyIdx = slots.findIndex(s => s === null)
    if (nextEmptyIdx === -1) return

    setSlots(prev => {
      const next = [...prev]
      next[nextEmptyIdx] = cardId
      return next
    })
    setAvailable(prev => prev.filter(id => id !== cardId))
  }, [slots, result, isChecking])

  // 슬롯 탭 → 다시 available로 반환
  const handleSlotTap = useCallback((slotIdx: number) => {
    if (result !== null || isChecking) return
    const cardId = slots[slotIdx]
    if (cardId === null) return

    setSlots(prev => {
      const next = [...prev]
      next[slotIdx] = null
      return next
    })
    setAvailable(prev => [...prev, cardId])
  }, [slots, result, isChecking])

  // 확인 버튼
  const handleCheck = useCallback(() => {
    if (!allFilled || result !== null || isChecking) return

    // 정오 판정
    const results: CheckResult[] = slots.map((cardId, slotIdx) => {
      if (cardId === null) return null
      return cardId === slotIdx ? 'correct' : 'wrong'
    })

    setCheckResults(results)
    setIsChecking(true)

    const allCorrect = results.every(r => r === 'correct')

    setTimeout(() => {
      setIsChecking(false)
      setCheckResults(Array(words.length).fill(null))

      if (allCorrect) {
        setResult('success')
      } else {
        // 오답 슬롯만 available로 반환, 타임 패널티
        const wrongIds: number[] = []
        const newSlots = slots.map((cardId, i) => {
          if (results[i] === 'wrong') {
            if (cardId !== null) wrongIds.push(cardId)
            return null
          }
          return cardId
        })
        setSlots(newSlots)
        setAvailable(prev => [...prev, ...wrongIds])
        setTimeLeft(t => {
          const next = parseFloat((t - PENALTY).toFixed(1))
          return next <= 0 ? 0 : next
        })
      }
    }, 1000)
  }, [allFilled, result, isChecking, slots, words.length])

  const timerRatio = timeLeft / TOTAL_TIME
  const timerColor = timerRatio > 0.4 ? 'bg-amber-500' : timerRatio > 0.2 ? 'bg-orange-500' : 'bg-red-500'

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* 포기 버튼 */}
      <div className="absolute top-4 right-4">
        <button onClick={onFail} className="text-xs text-gray-500 hover:text-gray-300 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700">✕ 포기</button>
      </div>
      <div className="w-full max-w-sm px-6">

        {result === null && (
          <>
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-amber-400">글자를 올바른 순서로 배치하세요!</span>
              <span className={`text-sm font-mono font-bold tabular-nums ${timeLeft < 6 ? 'text-red-400' : 'text-gray-400'}`}>
                {timeLeft.toFixed(1)}초
              </span>
            </div>

            {/* 카운트다운 바 */}
            <div className="w-full bg-gray-800 rounded-full h-1.5 mb-4">
              <div
                className={`h-1.5 rounded-full transition-all duration-100 ${timerColor}`}
                style={{ width: `${timerRatio * 100}%` }}
              />
            </div>

            {/* 배치 영역 (슬롯) */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1.5">배치 영역</div>
              <div className="flex flex-wrap gap-1.5 min-h-[44px]">
                {slots.map((cardId, slotIdx) => {
                  const check = checkResults[slotIdx]
                  const word = cardId !== null ? shuffledWords.find(w => w.id === cardId)?.word : null

                  let slotClass = 'border-2 border-dashed border-gray-700 rounded-lg'
                  if (cardId !== null && check === null) {
                    slotClass = 'bg-gray-800 border border-gray-600 rounded-lg'
                  } else if (check === 'correct') {
                    slotClass = 'bg-emerald-900/40 border border-emerald-600 rounded-lg'
                  } else if (check === 'wrong') {
                    slotClass = 'bg-red-900/40 border border-red-600 rounded-lg'
                  }

                  return (
                    <button
                      key={slotIdx}
                      onClick={() => handleSlotTap(slotIdx)}
                      disabled={cardId === null || isChecking}
                      className={`
                        relative px-2 py-1.5 text-sm min-w-[36px] text-center
                        transition-all active:scale-95 cursor-pointer
                        ${slotClass}
                        ${cardId !== null ? 'animate-fade-in' : ''}
                      `}
                    >
                      {word !== null ? (
                        <span className="text-gray-200">{word}</span>
                      ) : (
                        <span className="text-transparent select-none">_</span>
                      )}
                      {/* O/X 뱃지 */}
                      {check === 'correct' && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] flex items-center justify-center font-bold">
                          O
                        </span>
                      )}
                      {check === 'wrong' && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                          X
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 단어 카드 영역 */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1.5">글자 카드</div>
              <div className="flex flex-wrap gap-1.5 min-h-[44px]">
                {available.map(cardId => {
                  const word = shuffledWords.find(w => w.id === cardId)?.word ?? ''
                  return (
                    <button
                      key={cardId}
                      onClick={() => handleWordTap(cardId)}
                      disabled={isChecking}
                      className="
                        bg-gray-800 border border-gray-600 rounded-lg px-2 py-1.5 text-sm
                        text-gray-200 transition-all active:scale-95
                        hover:border-amber-600 hover:bg-gray-700
                        animate-fade-in
                      "
                    >
                      {word}
                    </button>
                  )
                })}
                {available.length === 0 && (
                  <div className="text-xs text-gray-600 py-2">모든 글자가 배치되었습니다</div>
                )}
              </div>
            </div>

            {/* 확인 버튼 */}
            <button
              onClick={handleCheck}
              disabled={!allFilled || isChecking}
              className={`
                w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95
                ${allFilled && !isChecking
                  ? 'bg-amber-600 text-gray-950 hover:bg-amber-500'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                }
              `}
            >
              {isChecking ? '채점 중...' : '확인'}
            </button>

            {/* 진행 힌트 */}
            {!allFilled && (
              <div className="text-center text-xs text-gray-600 mt-2">
                단어 카드를 탭하면 슬롯에 배치됩니다
              </div>
            )}
          </>
        )}

        {/* 결과 화면 */}
        {result !== null && (
          <div className="text-center space-y-4 py-2">
            {result === 'success' ? (
              <>
                <Emoji char="🎯" size={48} />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-emerald-400">모순을 밝혀냈다!</div>
                  <div className="text-xs text-gray-500">문장을 완벽하게 재조합했습니다</div>
                </div>
              </>
            ) : (
              <>
                <Emoji char="⏳" size={48} />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-gray-400">시간이 초과됐다...</div>
                  <div className="text-xs text-gray-600">문장을 완성하지 못했습니다</div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={onWatchAd}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-600 text-gray-950 active:scale-95 hover:bg-amber-500"
                  >
                    광고 보고 성공
                  </button>
                  <button
                    onClick={onFail}
                    className="flex-1 py-2.5 rounded-xl text-xs text-gray-500 bg-gray-800 active:scale-95 hover:bg-gray-700"
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
