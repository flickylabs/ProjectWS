import { useEffect, useMemo, useState } from 'react'
import { loadProgressionState, saveProgressionState } from '../../../data/leaderboard'
import type { JudgeProgressionState, TraitId } from '../../../engine/judgeProgressionEngine'
import {
  PERK_TABLE,
  getAllUnlockedPerks,
  getPerkById,
  type PerkDefinition,
} from '../../../engine/judgePerks'
import {
  PCFragmentIcon,
  TRAIT_VISUALS,
  formatPerkRequirementCopy,
  formatPerkUnlockCondition,
} from '../progression/PCJudgeProgressionShared'

interface Props {
  onChange?: (nextState: JudgeProgressionState) => void
  syncKey?: number
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
    emptyLabel: 'Lv3 성향을 달성하면 장착할 수 있습니다.',
  },
  {
    tier: 'minor',
    title: 'Minor 퍼크',
    slotLabel: 'Minor Slot',
    emptyLabel: 'Lv1 성향을 달성하면 장착할 수 있습니다.',
  },
]

const LOCK_ICON = (
  <svg fill="none" height="16" viewBox="0 0 24 24" width="16">
    <path d="M7 11V8.5C7 5.5 9.2 3.5 12 3.5C14.8 3.5 17 5.5 17 8.5V11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    <rect height="9" rx="2.5" stroke="currentColor" strokeWidth="1.8" width="12" x="6" y="11" />
    <path d="M12 15V16.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
  </svg>
)

export default function PCPerkEquipPanel({ onChange, syncKey }: Props) {
  const [state, setState] = useState<JudgeProgressionState>(() => loadProgressionState())

  useEffect(() => {
    setState(loadProgressionState())
  }, [syncKey])

  const unlockedMap = useMemo(() => {
    const next = new Map<PerkDefinition['tier'], Set<string>>()
    next.set('major', new Set(getAllUnlockedPerks(state.traits, 'major').map((perk) => perk.id)))
    next.set('minor', new Set(getAllUnlockedPerks(state.traits, 'minor').map((perk) => perk.id)))
    return next
  }, [state.traits])

  const commitState = (nextState: JudgeProgressionState) => {
    saveProgressionState(nextState)
    setState(nextState)
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
          const traitVisual = equipped ? TRAIT_VISUALS[equipped.requiredTrait as TraitId] : null

          return (
            <div className="pc-perk-slot" key={section.tier}>
              <span className="pc-perk-slot__label">{section.slotLabel}</span>
              <div className="pc-perk-slot__content">
                {traitVisual ? <PCFragmentIcon fragmentId={traitVisual.directionFragment} size={28} /> : null}
                <div>
                  <strong>{equipped?.name ?? '비어 있음'}</strong>
                  <p>{equipped?.description ?? section.emptyLabel}</p>
                </div>
              </div>
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
                <span>해금 {unlockedIds.size}/{allPerks.length}</span>
              </div>

              <div className="pc-perk-list">
                {allPerks.map((perk) => {
                  const unlocked = unlockedIds.has(perk.id)
                  const equipped = section.tier === 'major'
                    ? state.equippedMajor === perk.id
                    : state.equippedMinor === perk.id
                  const traitVisual = TRAIT_VISUALS[perk.requiredTrait]
                  const lockedCopy = formatPerkRequirementCopy(perk.requiredTrait, perk.requiredLevel)

                  return (
                    <article
                      className={`pc-perk-card${unlocked ? ' is-unlocked' : ' is-locked'}${equipped ? ' is-equipped' : ''}`}
                      key={perk.id}
                    >
                      <div className="pc-perk-card__icon">
                        <PCFragmentIcon fragmentId={traitVisual.directionFragment} size={32} />
                        {!unlocked ? <span className="pc-perk-card__veil" /> : null}
                        {!unlocked ? <span className="pc-perk-card__lock">{LOCK_ICON}</span> : null}
                      </div>

                      <div className={`pc-perk-card__copy${unlocked ? '' : ' is-locked'}`}>
                        <div className="pc-perk-card__head">
                          <strong>{perk.name}</strong>
                          {equipped ? <span className="pc-perk-card__badge">장착 중</span> : null}
                        </div>
                        <p>{perk.description}</p>
                        <div className="pc-perk-card__meta">
                          <span>{traitVisual.label}</span>
                          <span>{formatPerkUnlockCondition(perk.requiredTrait, perk.requiredLevel)}</span>
                        </div>
                        {!unlocked ? <div className="pc-perk-card__lock-copy">{lockedCopy}</div> : null}
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
