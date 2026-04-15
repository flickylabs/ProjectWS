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
    case 'receipt': // 영수증 — 찢어진 종이 + 선
      content = (
        <>
          <path {...strokeProps} d="M18 8H46V52L41 48L36 52L32 48L28 52L23 48L18 52V8Z" />
          <path {...strokeProps} d="M26 20H42" />
          <path {...strokeProps} d="M26 28H38" />
          <path {...strokeProps} d="M26 36H44" />
        </>
      )
      break
    case 'gps': // 위치핀 — 방울 + 십자
      content = (
        <>
          <path {...strokeProps} d="M32 56C32 56 14 38 14 26C14 16.1 22 8 32 8C42 8 50 16.1 50 26C50 38 32 56 32 56Z" />
          <path {...strokeProps} d="M32 20V32" />
          <path {...strokeProps} d="M26 26H38" />
        </>
      )
      break
    case 'call': // 전화기 — 곡선 수화기
      content = (
        <>
          <path {...strokeProps} d="M14 24C14 24 16 14 26 10L30 18L24 24C28 32 32 36 40 40L46 34L54 38C50 48 40 50 40 50" />
          <path {...strokeProps} d="M40 50C26 50 14 38 14 24" />
        </>
      )
      break
    case 'message': // 말풍선 — 둥근 꼬리
      content = (
        <>
          <path {...strokeProps} d="M10 14H54V38C54 40 52 42 50 42H24L16 52V42H14C12 42 10 40 10 38V14Z" />
          <circle cx="24" cy="28" r="2.5" fill="currentColor" />
          <circle cx="32" cy="28" r="2.5" fill="currentColor" />
          <circle cx="40" cy="28" r="2.5" fill="currentColor" />
        </>
      )
      break
    case 'account': // 은행 — 삼각 지붕 + 기둥
      content = (
        <>
          <path {...strokeProps} d="M8 26L32 10L56 26" />
          <path {...strokeProps} d="M14 26V48" />
          <path {...strokeProps} d="M26 26V48" />
          <path {...strokeProps} d="M38 26V48" />
          <path {...strokeProps} d="M50 26V48" />
          <path {...strokeProps} d="M8 48H56" />
          <path {...strokeProps} d="M6 54H58" />
        </>
      )
      break
    case 'kakao': // 스마트폰 — 둥근 사각 + 홈버튼
      content = (
        <>
          <rect {...strokeProps} x="18" y="6" width="28" height="52" rx="4" />
          <path {...strokeProps} d="M18 14H46" />
          <path {...strokeProps} d="M18 48H46" />
          <circle cx="32" cy="53" r="2" fill="currentColor" />
        </>
      )
      break
    case 'document': // 클립보드 — 상단 집게
      content = (
        <>
          <rect {...strokeProps} x="14" y="14" width="36" height="44" rx="3" />
          <path {...strokeProps} d="M24 14V10C24 8 26 6 28 6H36C38 6 40 8 40 10V14" />
          <path {...strokeProps} d="M22 28H42" />
          <path {...strokeProps} d="M22 36H42" />
          <path {...strokeProps} d="M22 44H34" />
        </>
      )
      break
    case 'magnifier': // 돋보기 — 큰 원 + 손잡이
      content = (
        <>
          <circle {...strokeProps} cx="28" cy="28" r="18" />
          <path {...strokeProps} d="M40 40L54 54" strokeWidth={5} />
        </>
      )
      break
    case 'fingerprint': // 지문 — 동심원 아크
      content = (
        <>
          <path {...strokeProps} d="M32 52C32 52 22 44 22 32C22 26 26 22 32 22C38 22 42 26 42 32C42 44 32 52 32 52" />
          <path {...strokeProps} d="M32 44C28 40 28 36 28 32C28 28.7 29.3 26 32 26C34.7 26 36 28.7 36 32C36 36 36 40 32 44" />
          <circle cx="32" cy="32" r="2" fill="currentColor" />
        </>
      )
      break
    case 'lock': // 자물쇠 — 고리 + 열쇠구멍
      content = (
        <>
          <path {...strokeProps} d="M20 28V20C20 12.3 25.4 6 32 6C38.6 6 44 12.3 44 20V28" />
          <rect {...strokeProps} x="14" y="28" width="36" height="28" rx="4" />
          <circle cx="32" cy="40" r="3" fill="currentColor" />
          <path {...strokeProps} d="M32 43V50" />
        </>
      )
      break
    case 'gavel': // 망치 — 법봉
      content = (
        <>
          <rect {...strokeProps} x="34" y="8" width="20" height="12" rx="3" transform="rotate(45 44 14)" />
          <path {...strokeProps} d="M28 28L14 42" strokeWidth={5} />
          <path {...strokeProps} d="M8 50H40" />
          <path {...strokeProps} d="M12 56H36" />
        </>
      )
      break
    case 'scale': // 저울 — 균형
      content = (
        <>
          <path {...strokeProps} d="M32 8V50" />
          <path {...strokeProps} d="M14 18H50" />
          <path {...strokeProps} d="M14 18L8 34H20" />
          <path {...strokeProps} d="M50 18L56 34H44" />
          <path {...strokeProps} d="M8 34C8 38 11.6 42 14 42C16.4 42 20 38 20 34" />
          <path {...strokeProps} d="M44 34C44 38 47.6 42 50 42C52.4 42 56 38 56 34" />
          <path {...strokeProps} d="M22 56H42" />
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
          <h3 className="pc-memory-match__title">같은 증거 카드를 두 장씩 찾으세요.</h3>
        </div>
        <div className={`pc-memory-match__timer ${timeLeft <= 10 ? 'is-critical' : ''}`}>
          <strong>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline',verticalAlign:'middle',marginRight:4}}><circle cx="12" cy="13" r="9"/><polyline points="12 9 12 13 15 15"/><path d="M9 2h6"/><path d="M12 2v2"/></svg>
            {timeLeft}s
          </strong>
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
