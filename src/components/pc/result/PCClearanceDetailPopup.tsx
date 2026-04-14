import { useEffect, useMemo } from 'react'
import type { ClearanceCategory, ClearanceResult } from '../../../types'
import type { MiniGameProgress, MiniGameType } from '../../../types/minigame'

interface Props {
  result: ClearanceResult
  minigameProgress: Record<MiniGameType, MiniGameProgress>
  onClose: () => void
}

const CATEGORY_LABELS: Record<ClearanceCategory, string> = {
  evidence: '증거',
  combination: '조합',
  witness: '증인',
  interrogation: '심문',
  dispute: '쟁점',
  minigame: '미니게임',
}

const CATEGORY_ORDER: ClearanceCategory[] = [
  'evidence',
  'combination',
  'witness',
  'interrogation',
  'dispute',
  'minigame',
]

const MINIGAME_LABELS: Record<MiniGameType, string> = {
  memory_match: '조사',
  skill_runner: '스킬',
  whack_a_mole: '법정',
}

const MINIGAME_ORDER: MiniGameType[] = ['memory_match', 'skill_runner', 'whack_a_mole']
const MINIGAME_TARGET = 5

export default function PCClearanceDetailPopup({ result, minigameProgress, onClose }: Props) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const groupedItems = useMemo(() => {
    const groups = CATEGORY_ORDER
      .map((category) => ({
        category,
        label: CATEGORY_LABELS[category],
        items: result.items.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0)

    return groups
  }, [result.items])

  return (
    <div className="pc-clearance-popup" role="dialog" aria-modal="true" aria-label="클리어율 상세">
      <div className="pc-clearance-popup__backdrop" onClick={onClose} />
      <section className="pc-clearance-popup__panel" onClick={(event) => event.stopPropagation()}>
        <header className="pc-clearance-popup__header">
          <div>
            <div className="pc-clearance-popup__eyebrow">CLEARANCE REPORT</div>
            <h2>클리어율 상세</h2>
          </div>
          <button className="pc-clearance-popup__close" onClick={onClose} type="button" aria-label="닫기">
            ×
          </button>
        </header>

        <div className="pc-clearance-popup__summary">
          <div className="pc-clearance-popup__summary-score">
            <strong>{result.percent}%</strong>
            <span>{result.achieved} / {result.total} 항목 달성</span>
          </div>
          <p>모든 체크리스트를 채우고 남은 연결 고리를 없애면 100% 클리어입니다.</p>
        </div>

        <div className="pc-clearance-popup__body">
          {groupedItems.map((group) => (
            <section className="pc-clearance-popup__section" key={group.category}>
              <h3>{group.label}</h3>
              <div className="pc-clearance-popup__list">
                {group.items.map((item) => (
                  <div className={`pc-clearance-popup__item${item.achieved ? ' is-achieved' : ''}`} key={item.id}>
                    <span className="pc-clearance-popup__item-mark">{item.achieved ? '✓' : '○'}</span>
                    <span className="pc-clearance-popup__item-label">{item.label}</span>
                    <strong className="pc-clearance-popup__item-progress">{item.current}/{item.target}</strong>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="pc-clearance-popup__section">
            <h3>놓친 연결 고리</h3>
            {result.missedConnections.length > 0 ? (
              <div className="pc-clearance-popup__list">
                {result.missedConnections.map((connection, index) => (
                  <div className="pc-clearance-popup__item is-missed" key={`${connection.label}-${index}`}>
                    <span className="pc-clearance-popup__item-mark">!</span>
                    <span className="pc-clearance-popup__item-label">{connection.label}</span>
                    <strong className="pc-clearance-popup__item-progress">{connection.a} + {connection.b}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p className="pc-clearance-popup__empty">놓친 조합이 없습니다.</p>
            )}
          </section>

          <section className="pc-clearance-popup__section">
            <h3>미니게임 진행도</h3>
            <div className="pc-clearance-popup__minigames">
              {MINIGAME_ORDER.map((type) => (
                <div className="pc-clearance-popup__minigame-card" key={type}>
                  <span>{MINIGAME_LABELS[type]}</span>
                  <strong>{minigameProgress[type]?.completedRounds ?? 0}/{MINIGAME_TARGET}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="pc-clearance-popup__footer">
          <button className="pc-clearance-popup__button" onClick={onClose} type="button">닫기</button>
        </footer>
      </section>
    </div>
  )
}
