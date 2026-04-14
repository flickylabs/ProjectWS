/**
 * MiniGameFrame — 미니게임 공통 래퍼
 * 타이틀 배너 + 회차 표시 + 시간 제한 + 결과 화면 + 재도전/스킵 버튼
 * 공통 3→2→1→Go! 카운트다운 포함
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useStore } from '../../../store/useGameStore'
import { MINIGAME_LABELS, MINIGAME_MAX_ROUNDS, MINIGAME_TOKEN_MAP } from '../../../types/minigame'
import type { MiniGameType } from '../../../types/minigame'
import PCSvgIcon from '../icons/PCSvgIcon'
import { playMiniGameCountdown, playMiniGameStart } from '../../../engine/soundEngine'

const TOKEN_LABELS: Record<string, string> = {
  investigation: '조사 토큰',
  skill: '스킬 포인트',
  court: '법정 지배력',
}

type CountdownPhase = 3 | 2 | 1 | 'go' | null

interface Props {
  children: React.ReactNode
}

export default function MiniGameFrame({ children }: Props) {
  const activeMinigame = useStore((s) => s.activeMinigame)
  const minigameProgress = useStore((s) => s.minigameProgress)
  const cancelMinigame = useStore((s) => s.cancelMinigame)
  const [countdown, setCountdown] = useState<CountdownPhase>(3)
  const prevTypeRef = useRef<string | null>(null)

  useEffect(() => {
    const key = activeMinigame ? `${activeMinigame.type}-${activeMinigame.round}` : null
    if (key && key !== prevTypeRef.current) {
      prevTypeRef.current = key
      setCountdown(3)
    }
  }, [activeMinigame])

  useEffect(() => {
    if (countdown === null) return

    if (countdown === 'go') {
      playMiniGameStart()
      const id = window.setTimeout(() => setCountdown(null), 500)
      return () => window.clearTimeout(id)
    }

    playMiniGameCountdown()
    const id = window.setTimeout(() => {
      if (countdown === 1) setCountdown('go')
      else setCountdown((countdown - 1) as 2 | 1)
    }, 800)
    return () => window.clearTimeout(id)
  }, [countdown])

  if (!activeMinigame) return null

  const { type, round } = activeMinigame
  const progress = minigameProgress[type]
  const tokenType = MINIGAME_TOKEN_MAP[type]
  const label = MINIGAME_LABELS[type]

  return (
    <div className="pc-minigame-backdrop">
      <div className="pc-minigame-frame">
        {/* Header */}
        <div className="pc-minigame-frame__header">
          <div className="pc-minigame-frame__title">
            <span className="pc-minigame-frame__label">{label}</span>
            <span className="pc-minigame-frame__round">Round {round} / {MINIGAME_MAX_ROUNDS}</span>
          </div>
          <div className="pc-minigame-frame__reward">
            성공 시: <strong>{TOKEN_LABELS[tokenType]} +1</strong>
          </div>
          <button className="pc-minigame-frame__close" onClick={cancelMinigame} title="스킵" type="button" aria-label="미니게임 스킵">
            <span aria-hidden="true" style={{ display: 'inline-block', transform: 'rotate(45deg)' }}>
              <PCSvgIcon id="i-plus" size={14} />
            </span>
          </button>
        </div>

        {/* Game area — 카운트다운 종료 후 게임 렌더 */}
        <div className="pc-minigame-frame__body">
          {countdown !== null ? (
            <div className="pc-minigame-countdown">
              <span className={`pc-minigame-countdown__number${countdown === 'go' ? ' is-go' : ''}`}>
                {countdown === 'go' ? 'Go!' : countdown}
              </span>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}

/** 미니게임 런처 버튼 (토큰 UI 옆에 배치) */
export function MiniGameLaunchButton({ type }: { type: MiniGameType }) {
  const progress = useStore((s) => s.minigameProgress[type])
  const startMinigame = useStore((s) => s.startMinigame)

  const remaining = MINIGAME_MAX_ROUNDS - progress.completedRounds
  if (remaining <= 0) return null

  return (
    <button
      className="pc-minigame-launch-btn"
      onClick={() => startMinigame(type)}
      title={`${MINIGAME_LABELS[type]} (${remaining}회 남음)`}
      type="button"
    >
      <span className="pc-minigame-launch-btn__plus">+</span>
      <span className="pc-minigame-launch-btn__count">{remaining}</span>
    </button>
  )
}
