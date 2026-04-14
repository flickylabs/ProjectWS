/**
 * MiniGameFrame — 미니게임 공통 래퍼
 * 타이틀 배너 + 회차 표시 + 시간 제한 + 결과 화면 + 재도전/스킵 버튼
 */
import { useCallback } from 'react'
import { useStore } from '../../../store/useGameStore'
import { MINIGAME_LABELS, MINIGAME_MAX_ROUNDS, MINIGAME_TOKEN_MAP } from '../../../types/minigame'
import type { MiniGameType } from '../../../types/minigame'
import PCSvgIcon from '../icons/PCSvgIcon'

const TOKEN_LABELS: Record<string, string> = {
  investigation: '조사 토큰',
  skill: '스킬 포인트',
  court: '법정 지배력',
}

interface Props {
  children: React.ReactNode
}

export default function MiniGameFrame({ children }: Props) {
  const activeMinigame = useStore((s) => s.activeMinigame)
  const minigameProgress = useStore((s) => s.minigameProgress)
  const cancelMinigame = useStore((s) => s.cancelMinigame)

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
          <button className="pc-minigame-frame__close" onClick={cancelMinigame} title="스킵" type="button">
            <PCSvgIcon id="i-plus" size={14} />
          </button>
        </div>

        {/* Game area — 각 미니게임 컴포넌트가 children으로 들어옴 */}
        <div className="pc-minigame-frame__body">
          {children}
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
