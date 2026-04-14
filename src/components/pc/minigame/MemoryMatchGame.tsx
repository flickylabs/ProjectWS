import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { useStore } from '../../../store/useGameStore'
import {
  playCardFlip,
  playCardMatch,
  playCardMismatch,
  playTimerWarning,
  playMiniGameSuccess,
  playMiniGameFail,
} from '../../../engine/soundEngine'

type EvidenceCardId =
  | 'receipt'
  | 'gps'
  | 'call'
  | 'message'
  | 'account'
  | 'kakao'
  | 'document'
  | 'magnifier'
  | 'fingerprint'
  | 'lock'
  | 'gavel'
  | 'scale'

interface EvidenceCardDefinition {
  id: EvidenceCardId
  label: string
  color: string
}

interface MemoryCard {
  id: string
  kind: EvidenceCardId
  faceUp: boolean
  clearing: boolean
  cleared: boolean
}

interface RoundConfig {
  columns: 4 | 6
  rows: 3 | 4
  pairs: number
  timeLimit: number
}

const CARD_LIBRARY: readonly EvidenceCardDefinition[] = [
  { id: 'receipt', label: '영수증', color: '#5cc97a' },
  { id: 'gps', label: 'GPS', color: '#5b8def' },
  { id: 'call', label: '통화', color: '#a78bfa' },
  { id: 'message', label: '문자', color: '#e8c172' },
  { id: 'account', label: '계좌', color: '#e06060' },
  { id: 'kakao', label: '카톡', color: '#f59e0b' },
  { id: 'document', label: '서류', color: '#60c090' },
  { id: 'magnifier', label: '돋보기', color: '#ec4899' },
  { id: 'fingerprint', label: '지문', color: '#38bdf8' },
  { id: 'lock', label: '자물쇠', color: '#8b8b9a' },
  { id: 'gavel', label: '망치', color: '#d4a24e' },
  { id: 'scale', label: '저울', color: '#6366f1' },
] as const

function getRoundConfig(round: number): RoundConfig {
  if (round <= 2) return { columns: 4, rows: 3, pairs: 6, timeLimit: 45 }
  if (round <= 4) return { columns: 4, rows: 4, pairs: 8, timeLimit: 40 }
  return { columns: 6, rows: 4, pairs: 12, timeLimit: 50 }
}

function shuffle<T>(items: readonly T[]): T[] {
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }
  return next
}

function createDeck(round: number): MemoryCard[] {
  const { pairs } = getRoundConfig(round)
  const selected = shuffle(CARD_LIBRARY).slice(0, pairs)

  return shuffle(
    selected.flatMap((card, index) => ([
      { id: `${card.id}-a-${index}`, kind: card.id, faceUp: false, clearing: false, cleared: false },
      { id: `${card.id}-b-${index}`, kind: card.id, faceUp: false, clearing: false, cleared: false },
    ])),
  )
}

function getCardDefinition(kind: EvidenceCardId): EvidenceCardDefinition {
  return CARD_LIBRARY.find((card) => card.id === kind) ?? CARD_LIBRARY[0]
}

function MemoryMatchIcon({ kind, className }: { kind: EvidenceCardId; className?: string }) {
  const baseProps = {
    className,
    viewBox: '0 0 64 64',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  } as const

  const strokeProps = {
    stroke: 'currentColor',
    strokeWidth: 4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  let content: ReactNode

  switch (kind) {
    case 'receipt':
      content = (
        <>
          <path {...strokeProps} d="M20 10H42L52 20V54L47 50L42 54L37 50L32 54L27 50L22 54L20 52V10Z" />
          <path {...strokeProps} d="M28 26H44" />
          <path {...strokeProps} d="M28 34H44" />
          <path {...strokeProps} d="M28 42H38" />
        </>
      )
      break
    case 'gps':
      content = (
        <>
          <path {...strokeProps} d="M32 54C32 54 18 40.8 18 29C18 21.3 24.3 15 32 15C39.7 15 46 21.3 46 29C46 40.8 32 54 32 54Z" />
          <path {...strokeProps} d="M32 34C34.7614 34 37 31.7614 37 29C37 26.2386 34.7614 24 32 24C29.2386 24 27 26.2386 27 29C27 31.7614 29.2386 34 32 34Z" />
        </>
      )
      break
    case 'call':
      content = (
        <>
          <path {...strokeProps} d="M22 16L28 26L22 30C25.9 37.6 31.9 43.7 39.6 47.7L44 41L54 47V53C54 55.2 52.2 57 50 57C27.4 57 7 36.6 7 14C7 11.8 8.8 10 11 10H17L22 16Z" />
        </>
      )
      break
    case 'message':
      content = (
        <>
          <path {...strokeProps} d="M14 18H50V40H31L22 48V40H14V18Z" />
          <path {...strokeProps} d="M22 27H42" />
          <path {...strokeProps} d="M22 33H36" />
        </>
      )
      break
    case 'account':
      content = (
        <>
          <path {...strokeProps} d="M12 24L32 14L52 24" />
          <path {...strokeProps} d="M16 24V46" />
          <path {...strokeProps} d="M26 24V46" />
          <path {...strokeProps} d="M38 24V46" />
          <path {...strokeProps} d="M48 24V46" />
          <path {...strokeProps} d="M12 46H52" />
          <path {...strokeProps} d="M10 52H54" />
        </>
      )
      break
    case 'kakao':
      content = (
        <>
          <path {...strokeProps} d="M15 19H49V37H37L26 46V37H15V19Z" />
          <path {...strokeProps} d="M24 27H24.02" />
          <path {...strokeProps} d="M32 27H32.02" />
          <path {...strokeProps} d="M40 27H40.02" />
        </>
      )
      break
    case 'document':
      content = (
        <>
          <path {...strokeProps} d="M18 10H38L48 20V54H18V10Z" />
          <path {...strokeProps} d="M38 10V20H48" />
          <path {...strokeProps} d="M24 30H42" />
          <path {...strokeProps} d="M24 38H42" />
          <path {...strokeProps} d="M24 46H34" />
        </>
      )
      break
    case 'magnifier':
      content = (
        <>
          <path {...strokeProps} d="M28 44C36.8366 44 44 36.8366 44 28C44 19.1634 36.8366 12 28 12C19.1634 12 12 19.1634 12 28C12 36.8366 19.1634 44 28 44Z" />
          <path {...strokeProps} d="M39.5 39.5L52 52" />
        </>
      )
      break
    case 'fingerprint':
      content = (
        <>
          <path {...strokeProps} d="M32 16C39.7 16 46 22.3 46 30C46 36.2 43.4 40.3 43.4 45.8C43.4 49.1 44.4 52 46 54" />
          <path {...strokeProps} d="M32 22C36.4 22 40 25.6 40 30C40 36.1 36.4 39.6 36.4 45.2C36.4 48.6 37.2 51.3 38.8 54" />
          <path {...strokeProps} d="M24 30C24 37.2 20 41.3 20 47C20 49.9 20.8 52.2 22 54" />
          <path {...strokeProps} d="M18 30C18 22.3 24.3 16 32 16" />
          <path {...strokeProps} d="M32 28C33.7 28 35 29.3 35 31C35 35.6 30.4 38 30.4 44C30.4 47.5 31.2 50.7 32.8 54" />
        </>
      )
      break
    case 'lock':
      content = (
        <>
          <path {...strokeProps} d="M20 29V21C20 14.4 25.4 9 32 9C38.6 9 44 14.4 44 21V29" />
          <path {...strokeProps} d="M17 29H47V55H17V29Z" />
          <path {...strokeProps} d="M32 38V46" />
        </>
      )
      break
    case 'gavel':
      content = (
        <>
          <path {...strokeProps} d="M20 16L32 28" />
          <path {...strokeProps} d="M28 12L40 24" />
          <path {...strokeProps} d="M36 20L44 12L52 20L44 28L36 20Z" />
          <path {...strokeProps} d="M14 34L32 52" />
          <path {...strokeProps} d="M18 48H42" />
        </>
      )
      break
    case 'scale':
      content = (
        <>
          <path {...strokeProps} d="M32 12V48" />
          <path {...strokeProps} d="M18 20H46" />
          <path {...strokeProps} d="M24 20L18 34" />
          <path {...strokeProps} d="M40 20L46 34" />
          <path {...strokeProps} d="M12 34H24C24 39.5 19.6 44 14 44C8.4 44 4 39.5 4 34H12Z" />
          <path {...strokeProps} d="M40 34H52C52 39.5 47.6 44 42 44C36.4 44 32 39.5 32 34H40Z" />
          <path {...strokeProps} d="M22 54H42" />
        </>
      )
      break
    default:
      content = null
  }

  return <svg {...baseProps}>{content}</svg>
}

function ResultIcon({ type }: { type: 'success' | 'fail' }) {
  const stroke = type === 'success' ? '#e8c172' : '#e06060'

  return (
    <svg
      aria-hidden
      className="pc-memory-match__result-icon"
      fill="none"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {type === 'success' ? (
        <>
          <path d="M22 33L29 40L44 24" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          <path d="M32 58C46.3594 58 58 46.3594 58 32C58 17.6406 46.3594 6 32 6C17.6406 6 6 17.6406 6 32C6 46.3594 17.6406 58 32 58Z" stroke={stroke} strokeWidth="4" />
        </>
      ) : (
        <>
          <path d="M22 18V34L32 40L42 34V18L32 12L22 18Z" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M32 24V31" stroke={stroke} strokeLinecap="round" strokeWidth="4" />
          <path d="M32 47V47.5" stroke={stroke} strokeLinecap="round" strokeWidth="5" />
          <path d="M10 54H54" stroke={stroke} strokeLinecap="round" strokeWidth="4" />
        </>
      )}
    </svg>
  )
}

export default function MemoryMatchGame({ round }: { round: number }) {
  const completeMinigame = useStore((state) => state.completeMinigame)
  const cancelMinigame = useStore((state) => state.cancelMinigame)
  const [cards, setCards] = useState<MemoryCard[]>(() => createDeck(round))
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isResolving, setIsResolving] = useState(false)
  const [gameState, setGameState] = useState<'playing' | 'failed' | 'success'>('playing')
  const [timeLeft, setTimeLeft] = useState(getRoundConfig(round).timeLimit)
  const deadlineRef = useRef<number>(Date.now() + getRoundConfig(round).timeLimit * 1000)
  const timeoutIdsRef = useRef<number[]>([])

  const roundConfig = getRoundConfig(round)
  const clearedPairs = cards.filter((card) => card.cleared).length / 2

  const clearScheduled = useCallback(() => {
    for (const timeoutId of timeoutIdsRef.current) {
      window.clearTimeout(timeoutId)
    }
    timeoutIdsRef.current = []
  }, [])

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(() => {
      timeoutIdsRef.current = timeoutIdsRef.current.filter((activeId) => activeId !== timeoutId)
      callback()
    }, delay)
    timeoutIdsRef.current.push(timeoutId)
  }, [])

  const resetGame = useCallback(() => {
    clearScheduled()
    const config = getRoundConfig(round)
    deadlineRef.current = Date.now() + config.timeLimit * 1000
    setCards(createDeck(round))
    setSelectedIds([])
    setIsResolving(false)
    setGameState('playing')
    setTimeLeft(config.timeLimit)
  }, [clearScheduled, round])

  useEffect(() => {
    resetGame()
    return clearScheduled
  }, [clearScheduled, resetGame])

  useEffect(() => {
    if (gameState !== 'playing') return undefined

    const updateTimer = () => {
      const remaining = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000))
      setTimeLeft((current) => {
        if (current !== remaining && remaining > 0 && remaining <= 10) playTimerWarning()
        return current === remaining ? current : remaining
      })

      if (remaining > 0) return

      clearScheduled()
      setSelectedIds([])
      setIsResolving(false)
      playMiniGameFail()
      setGameState('failed')
    }

    updateTimer()

    const intervalId = window.setInterval(updateTimer, 250)
    return () => window.clearInterval(intervalId)
  }, [clearScheduled, gameState])

  useEffect(() => {
    if (gameState !== 'playing' || cards.length === 0) return
    if (!cards.every((card) => card.cleared)) return

    clearScheduled()
    setIsResolving(false)
    setSelectedIds([])
    playMiniGameSuccess()
    setGameState('success')
  }, [cards, clearScheduled, gameState])

  useEffect(() => {
    if (gameState !== 'success') return undefined

    const timeoutId = window.setTimeout(() => {
      completeMinigame(true)
    }, 420)

    return () => window.clearTimeout(timeoutId)
  }, [completeMinigame, gameState])

  const handleCardClick = (cardId: string) => {
    if (gameState !== 'playing' || isResolving || selectedIds.length >= 2 || selectedIds.includes(cardId)) return

    const clickedCard = cards.find((card) => card.id === cardId)
    if (!clickedCard || clickedCard.faceUp || clickedCard.cleared || clickedCard.clearing) return

    playCardFlip()
    const nextSelectedIds = [...selectedIds, cardId]

    setCards((current) => current.map((card) => (
      card.id === cardId
        ? { ...card, faceUp: true }
        : card
    )))
    setSelectedIds(nextSelectedIds)

    if (nextSelectedIds.length < 2) return

    const [firstId, secondId] = nextSelectedIds
    const firstCard = cards.find((card) => card.id === firstId)
    const secondCard = cards.find((card) => card.id === secondId) ?? clickedCard
    const isMatch = Boolean(firstCard && secondCard && firstCard.kind === secondCard.kind)

    setIsResolving(true)

    if (isMatch) {
      playCardMatch()
      setCards((current) => current.map((card) => (
        nextSelectedIds.includes(card.id)
          ? { ...card, faceUp: true, clearing: true }
          : card
      )))

      schedule(() => {
        setCards((current) => current.map((card) => (
          nextSelectedIds.includes(card.id)
            ? { ...card, faceUp: false, clearing: false, cleared: true }
            : card
        )))
        setSelectedIds([])
        setIsResolving(false)
      }, 650)
      return
    }

    playCardMismatch()
    schedule(() => {
      setCards((current) => current.map((card) => (
        nextSelectedIds.includes(card.id)
          ? { ...card, faceUp: false }
          : card
      )))
      setSelectedIds([])
      setIsResolving(false)
    }, 800)
  }

  const gridStyle = {
    '--memory-cols': String(roundConfig.columns),
    '--memory-rows': String(roundConfig.rows),
  } as CSSProperties

  return (
    <div className="pc-memory-match">
      <div className="pc-memory-match__status">
        <div className="pc-memory-match__status-copy">
          <p className="pc-memory-match__eyebrow">조사 토큰 확보</p>
          <h3 className="pc-memory-match__title">같은 증거 카드를 두 장씩 찾으세요.</h3>
          <p className="pc-memory-match__subtitle">
            {roundConfig.columns}×{roundConfig.rows} 그리드
            {' · '}
            {clearedPairs}/{roundConfig.pairs}쌍 확보
          </p>
        </div>
        <div className={`pc-memory-match__timer ${timeLeft <= 10 ? 'is-critical' : ''}`}>
          <span className="pc-memory-match__timer-label">남은 시간</span>
          <strong>{timeLeft}s</strong>
        </div>
      </div>

      <div
        className={`pc-memory-match__grid ${gameState !== 'playing' ? 'is-paused' : ''}`}
        data-cols={roundConfig.columns}
        style={gridStyle}
      >
        {cards.map((card) => {
          const definition = getCardDefinition(card.kind)
          const isFlipped = card.faceUp || card.clearing || card.cleared
          const isDisabled = gameState !== 'playing' || isResolving || card.cleared || card.clearing || card.faceUp

          return (
            <button
              key={card.id}
              aria-label={`${definition.label} 카드`}
              className={[
                'pc-memory-card',
                isFlipped ? 'is-flipped' : '',
                card.clearing ? 'is-clearing' : '',
                card.cleared ? 'is-cleared' : '',
              ].filter(Boolean).join(' ')}
              disabled={isDisabled}
              onClick={() => handleCardClick(card.id)}
              type="button"
            >
              <span className="pc-memory-card__inner">
                <span className="pc-memory-card__face pc-memory-card__face--back">
                  <span className="pc-memory-card__back-badge">?</span>
                </span>
                <span
                  className="pc-memory-card__face pc-memory-card__face--front"
                  style={{ '--memory-card-color': definition.color } as CSSProperties}
                >
                  <MemoryMatchIcon className="pc-memory-card__icon" kind={card.kind} />
                  <span className="pc-memory-card__label">{definition.label}</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {gameState === 'success' && (
        <div className="pc-memory-match__result is-success">
          <ResultIcon type="success" />
          <div className="pc-memory-match__result-copy">
            <h4>증거 확보 완료</h4>
            <p>조사 토큰을 지급하고 다음 흐름으로 돌아갑니다.</p>
          </div>
        </div>
      )}

      {gameState === 'failed' && (
        <div className="pc-memory-match__result is-fail">
          <ResultIcon type="fail" />
          <div className="pc-memory-match__result-copy">
            <h4>시간이 초과되었습니다</h4>
            <p>같은 회차를 다시 시도하거나 이번 보상은 건너뛸 수 있습니다.</p>
          </div>
          <div className="pc-memory-match__result-actions">
            <button className="pc-memory-match__result-button is-primary" onClick={resetGame} type="button">
              재도전
            </button>
            <button className="pc-memory-match__result-button" onClick={cancelMinigame} type="button">
              스킵
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
