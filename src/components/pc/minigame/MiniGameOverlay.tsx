/**
 * MiniGameOverlay — 활성 미니게임이 있으면 MiniGameFrame + 해당 게임 렌더
 * 세션별로 구현된 PC 미니게임을 타입별로 연결한다.
 */
import { useStore } from '../../../store/useGameStore'
import MiniGameFrame from './MiniGameFrame'
import MemoryMatchGame from './MemoryMatchGame'
import SkillRunnerGame from './SkillRunnerGame'
import WhackAMoleGame from './WhackAMoleGame'

export default function MiniGameOverlay() {
  const activeMinigame = useStore((s) => s.activeMinigame)

  if (!activeMinigame) return null

  const { type, round } = activeMinigame

  if (type === 'memory_match') {
    return (
      <MiniGameFrame>
        <MemoryMatchGame round={round} />
      </MiniGameFrame>
    )
  }

  if (type === 'whack_a_mole') {
    return (
      <MiniGameFrame>
        <WhackAMoleGame />
      </MiniGameFrame>
    )
  }

  if (type === 'skill_runner') {
    return (
      <MiniGameFrame>
        <SkillRunnerGame />
      </MiniGameFrame>
    )
  }

  return null
}
