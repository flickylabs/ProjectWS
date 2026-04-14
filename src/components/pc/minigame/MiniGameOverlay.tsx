/**
 * MiniGameOverlay — 활성 미니게임이 있으면 MiniGameFrame + 해당 게임 렌더
 * 각 게임 컴포넌트(MemoryMatchGame, SkillRunnerGame, WhackAMoleGame)는
 * 별도 세션에서 구현 예정. 현재는 placeholder.
 */
import { useStore } from '../../../store/useGameStore'
import MiniGameFrame from './MiniGameFrame'
import MemoryMatchGame from './MemoryMatchGame'
import SkillRunnerGame from './SkillRunnerGame'
import WhackAMoleGame from './WhackAMoleGame'

export default function MiniGameOverlay() {
  const activeMinigame = useStore((s) => s.activeMinigame)
  const completeMinigame = useStore((s) => s.completeMinigame)

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

  return (
    <MiniGameFrame>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, gap: 16 }}>
        <p style={{ color: '#8b8b9a', fontSize: 14 }}>
          {type === 'skill_runner' ? '스킬 러너 게임' : '두더지 잡기 게임'}
          {' '}(Round {round})
        </p>
        <p style={{ color: '#4e4e5c', fontSize: 12 }}>구현 예정 — 테스트용 버튼</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => completeMinigame(true)}
            style={{ padding: '8px 20px', background: 'rgba(92,201,122,0.15)', border: '1px solid rgba(92,201,122,0.3)', borderRadius: 8, color: '#5cc97a', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
            type="button"
          >
            성공 (테스트)
          </button>
          <button
            onClick={() => completeMinigame(false)}
            style={{ padding: '8px 20px', background: 'rgba(224,96,96,0.15)', border: '1px solid rgba(224,96,96,0.3)', borderRadius: 8, color: '#e06060', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
            type="button"
          >
            실패 (테스트)
          </button>
        </div>
      </div>
    </MiniGameFrame>
  )
}
