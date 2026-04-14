import { useEffect, useMemo, useState } from 'react'
import { saveProgressionState } from '../../../data/leaderboard'
import {
  type JudgeProgressionState,
  type TraitId,
} from '../../../engine/judgeProgressionEngine'
import {
  PERK_TABLE,
  getAllUnlockedPerks,
  getPerkById,
  type PerkDefinition,
} from '../../../engine/judgePerks'
import {
  PCFragmentIcon,
  TRAIT_VISUALS,
  formatPerkUnlockCondition,
} from './PCJudgeProgressionShared'

interface Props {
  progressionState: JudgeProgressionState
  onChange?: (nextState: JudgeProgressionState) => void
}

const PERK_SECTIONS: Array<{
  tier: 'major' | 'minor'
  title: string
  slotLabel: string
  emptyLabel: string
}> = [
  {
    tier: 'major',
    title: 'Major 퍼크',
    slotLabel: 'Major Slot',
    emptyLabel: 'Lv3 성향 퍼크를 장착하세요',
  },
  {
    tier: 'minor',
    title: 'Minor 퍼크',
    slotLabel: 'Minor Slot',
    emptyLabel: 'Lv1 성향 퍼크를 장착하세요',
  },
]

export default function PCPerkEquipPanel({
  progressionState,
  onChange,
}: Props) {
  const [state, setState] = useState(progressionState)

  useEffect(() => {
    setState(progressionState)
  }, [progressionState])

  const unlockedMap = useMemo(() => {
    const next = new Map<PerkDefinition['tier'], Set<string>>()
    next.set(
      'major',
      new Set(getAllUnlockedPerks(state.traits, 'major').map((perk) => perk.id)),
    )
    next.set(
      'minor',
      new Set(getAllUnlockedPerks(state.traits, 'minor').map((perk) => perk.id)),
    )
    return next
  }, [state.traits])

  const commitState = (nextState: JudgeProgressionState) => {
    setState(nextState)
    saveProgressionState(nextState)
    onChange?.(nextState)
  }

  const handleToggle = (perk: PerkDefinition) => {
    const unlocked = unlockedMap.get(perk.tier)?.has(perk.id)
    if (!unlocked) return

    if (perk.tier === 'major') {
      commitState({
        ...state,
        equippedMajor: state.equippedMajor === perk.id ? null : perk.id,
        lastUpdated: new Date().toISOString(),
      })
      return
    }

    commitState({
      ...state,
      equippedMinor: state.equippedMinor === perk.id ? null : perk.id,
      lastUpdated: new Date().toISOString(),
    })
  }

  return (
    <section className="pc-judge-panel pc-perk-equip-panel">
      <header className="pc-judge-panel__header">
        <div>
          <span className="pc-judge-panel__eyebrow">PERK LOADOUT</span>
          <h3>퍼크 장착</h3>
        </div>
      </header>

      <div className="pc-perk-equip-panel__slots">
        {PERK_SECTIONS.map((section) => {
          const equippedId = section.tier === 'major' ? state.equippedMajor : state.equippedMinor
          const equipped = equippedId ? getPerkById(equippedId) : null

          return (
            <div className="pc-perk-slot" key={section.tier}>
              <span className="pc-perk-slot__label">{section.slotLabel}</span>
              <strong>{equipped?.name ?? '비어 있음'}</strong>
              <p>{equipped?.description ?? section.emptyLabel}</p>
            </div>
          )
        })}
      </div>

      <div className="pc-perk-equip-panel__sections">
        {PERK_SECTIONS.map((section) => {
          const allPerks = PERK_TABLE.filter((perk) => perk.tier === section.tier)
          const unlockedIds = unlockedMap.get(section.tier) ?? new Set<string>()

          return (
            <section className="pc-perk-section" key={section.tier}>
              <div className="pc-perk-section__header">
                <h4>{section.title}</h4>
                <span>
                  해금 {unlockedIds.size}/{allPerks.length}
                </span>
              </div>

              <div className="pc-perk-list">
                {allPerks.map((perk) => {
                  const unlocked = unlockedIds.has(perk.id)
                  const equipped = section.tier === 'major'
                    ? state.equippedMajor === perk.id
                    : state.equippedMinor === perk.id
                  const traitVisual = TRAIT_VISUALS[perk.requiredTrait as TraitId]

                  return (
                    <article
                      className={`pc-perk-card${unlocked ? ' is-unlocked' : ' is-locked'}${equipped ? ' is-equipped' : ''}`}
                      key={perk.id}
                    >
                      <div className="pc-perk-card__icon">
                        <PCFragmentIcon fragmentId={traitVisual.directionFragment} size={32} />
                        {!unlocked ? <span className="pc-perk-card__veil" /> : null}
                      </div>

                      <div className="pc-perk-card__copy">
                        <div className="pc-perk-card__head">
                          <strong>{unlocked ? perk.name : '잠긴 퍼크'}</strong>
                          {equipped ? <span className="pc-perk-card__badge">장착 중</span> : null}
                        </div>
                        <p>{unlocked ? perk.description : '해금 조건을 만족하면 장착할 수 있습니다.'}</p>
                        <div className="pc-perk-card__meta">
                          <span>{traitVisual.label}</span>
                          <span>{formatPerkUnlockCondition(perk.requiredTrait, perk.requiredLevel)}</span>
                        </div>
                      </div>

                      <button
                        className={`pc-judge-action${equipped ? ' is-ghost' : unlocked ? ' is-primary' : ''}`}
                        disabled={!unlocked}
                        onClick={() => handleToggle(perk)}
                        type="button"
                      >
                        {!unlocked ? '잠김' : equipped ? '해제' : '장착'}
                      </button>
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </section>
  )
}
