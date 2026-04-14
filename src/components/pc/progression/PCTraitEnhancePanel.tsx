import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { saveProgressionState } from '../../../data/leaderboard'
import {
  CONVERSION_RATE,
  canEnhanceTrait,
  convertFragments,
  enhanceTrait,
  getEnhancementCost,
  type FragmentId,
  type JudgeProgressionState,
  type TraitId,
} from '../../../engine/judgeProgressionEngine'
import {
  FRAGMENT_VISUALS,
  PCFragmentIcon,
  TRAIT_ORDER,
  TRAIT_VISUALS,
} from './PCJudgeProgressionShared'

interface Props {
  progressionState: JudgeProgressionState
  onChange?: (nextState: JudgeProgressionState) => void
}

const CONVERSION_ROWS: {
  axisLabel: string
  neutralFragment: FragmentId
  targets: TraitId[]
}[] = [
  {
    axisLabel: '탐구 중립',
    neutralFragment: 'inquiry_fragment',
    targets: ['logical', 'intuitive'],
  },
  {
    axisLabel: '재판 중립',
    neutralFragment: 'deliberation_fragment',
    targets: ['strict', 'lenient'],
  },
  {
    axisLabel: '해결 중립',
    neutralFragment: 'balance_fragment',
    targets: ['principled', 'reconciling'],
  },
]

export default function PCTraitEnhancePanel({
  progressionState,
  onChange,
}: Props) {
  const [state, setState] = useState(progressionState)
  const [celebratingTrait, setCelebratingTrait] = useState<TraitId | null>(null)
  const [convertedFragment, setConvertedFragment] = useState<FragmentId | null>(null)

  useEffect(() => {
    setState(progressionState)
  }, [progressionState])

  useEffect(() => {
    if (!celebratingTrait) return
    const timer = window.setTimeout(() => setCelebratingTrait(null), 1350)
    return () => window.clearTimeout(timer)
  }, [celebratingTrait])

  useEffect(() => {
    if (!convertedFragment) return
    const timer = window.setTimeout(() => setConvertedFragment(null), 950)
    return () => window.clearTimeout(timer)
  }, [convertedFragment])

  const enhanceableCount = useMemo(
    () => TRAIT_ORDER.filter((traitId) => canEnhanceTrait(traitId, state.traits, state.inventory)).length,
    [state.inventory, state.traits],
  )

  const commitState = (nextState: JudgeProgressionState) => {
    setState(nextState)
    saveProgressionState(nextState)
    onChange?.(nextState)
  }

  const handleEnhance = (traitId: TraitId) => {
    const next = enhanceTrait(traitId, state.traits, state.inventory)
    if (!next) return

    commitState({
      ...state,
      inventory: next.inventory,
      traits: next.traits,
      lastUpdated: new Date().toISOString(),
    })
    setCelebratingTrait(traitId)
  }

  const handleConvert = (targetTrait: TraitId) => {
    const targetFragment = TRAIT_VISUALS[targetTrait].directionFragment
    const nextInventory = convertFragments(state.inventory, targetFragment)
    if (!nextInventory) return

    commitState({
      ...state,
      inventory: nextInventory,
      lastUpdated: new Date().toISOString(),
    })
    setConvertedFragment(targetFragment)
  }

  return (
    <section className="pc-judge-panel pc-trait-enhance-panel">
      <header className="pc-judge-panel__header">
        <div>
          <span className="pc-judge-panel__eyebrow">TRAIT ENHANCE</span>
          <h3>성향 강화</h3>
        </div>
        <span className={`pc-judge-panel__status${enhanceableCount > 0 ? ' is-hot' : ''}`}>
          강화 가능 {enhanceableCount}개
        </span>
      </header>

      <div className="pc-trait-enhance-panel__grid">
        {TRAIT_ORDER.map((traitId) => {
          const visual = TRAIT_VISUALS[traitId]
          const currentLevel = state.traits[traitId].level
          const directionOwned = state.inventory[visual.directionFragment]
          const neutralOwned = state.inventory[visual.neutralFragment]
          const nextCost = getEnhancementCost(currentLevel)
          const canEnhance = canEnhanceTrait(traitId, state.traits, state.inventory)
          const progressRatio = nextCost
            ? ((Math.min(directionOwned / nextCost.directionFragments, 1) + Math.min(neutralOwned / nextCost.neutralFragments, 1)) / 2)
            : 1

          return (
            <article
              className={`pc-trait-card${canEnhance ? ' is-ready' : ''}${celebratingTrait === traitId ? ' is-celebrating' : ''}`}
              key={traitId}
              style={{ '--pc-trait-accent': visual.accent } as CSSProperties}
            >
              <div className="pc-trait-card__top">
                <div className="pc-trait-card__title">
                  <PCFragmentIcon fragmentId={visual.directionFragment} size={34} />
                  <div>
                    <strong>{visual.label}</strong>
                    <p>{visual.axisLabel} 축 특화</p>
                  </div>
                </div>
                <div className="pc-trait-card__levels" aria-label={`${visual.label} 레벨 ${currentLevel}`}>
                  {Array.from({ length: 4 }, (_, index) => (
                    <i className={index <= currentLevel ? 'is-filled' : ''} key={index} />
                  ))}
                </div>
              </div>

              <div className="pc-trait-card__meta">
                <span>현재 Lv.{currentLevel}</span>
                <span>{nextCost ? `다음 Lv.${currentLevel + 1}` : '최대 레벨'}</span>
              </div>

              <div className="pc-trait-card__progress">
                <div className="pc-trait-card__progress-track">
                  <i style={{ width: `${Math.round(progressRatio * 100)}%` }} />
                </div>
                <span>{Math.round(progressRatio * 100)}%</span>
              </div>

              {nextCost ? (
                <div className="pc-trait-card__costs">
                  <div className="pc-trait-cost">
                    <span className="pc-trait-cost__label">
                      <PCFragmentIcon fragmentId={visual.directionFragment} size={22} />
                      {FRAGMENT_VISUALS[visual.directionFragment].name}
                    </span>
                    <strong className={directionOwned >= nextCost.directionFragments ? 'is-enough' : ''}>
                      {directionOwned}/{nextCost.directionFragments}
                    </strong>
                  </div>
                  <div className="pc-trait-cost">
                    <span className="pc-trait-cost__label">
                      <PCFragmentIcon fragmentId={visual.neutralFragment} size={22} />
                      {FRAGMENT_VISUALS[visual.neutralFragment].name}
                    </span>
                    <strong className={neutralOwned >= nextCost.neutralFragments ? 'is-enough' : ''}>
                      {neutralOwned}/{nextCost.neutralFragments}
                    </strong>
                  </div>
                </div>
              ) : (
                <div className="pc-trait-card__maxed">
                  모든 요구치를 완료했습니다.
                </div>
              )}

              <button
                className={`pc-judge-action${canEnhance ? ' is-primary' : ''}`}
                disabled={!canEnhance}
                onClick={() => handleEnhance(traitId)}
                type="button"
              >
                {currentLevel >= 3 ? '최대 강화' : '강화'}
              </button>
            </article>
          )
        })}
      </div>

      <section className="pc-trait-convert">
        <div className="pc-trait-convert__header">
          <div>
            <span className="pc-judge-panel__eyebrow">FRAGMENT CONVERT</span>
            <h4>중립 조각 변환</h4>
          </div>
          <span className="pc-trait-convert__rule">
            중립 {CONVERSION_RATE}개 → 방향 1개
          </span>
        </div>

        <div className="pc-trait-convert__rows">
          {CONVERSION_ROWS.map((row) => (
            <div className="pc-trait-convert__row" key={row.neutralFragment}>
              <div className="pc-trait-convert__stock">
                <PCFragmentIcon fragmentId={row.neutralFragment} size={28} />
                <div>
                  <strong>{row.axisLabel}</strong>
                  <span>
                    {FRAGMENT_VISUALS[row.neutralFragment].name} {state.inventory[row.neutralFragment]}개 보유
                  </span>
                </div>
              </div>

              <div className="pc-trait-convert__actions">
                {row.targets.map((traitId) => {
                  const targetVisual = TRAIT_VISUALS[traitId]
                  const disabled = state.inventory[row.neutralFragment] < CONVERSION_RATE

                  return (
                    <button
                      className={`pc-trait-convert__button${convertedFragment === targetVisual.directionFragment ? ' is-firing' : ''}`}
                      disabled={disabled}
                      key={traitId}
                      onClick={() => handleConvert(traitId)}
                      type="button"
                    >
                      <PCFragmentIcon fragmentId={targetVisual.directionFragment} size={24} />
                      <span>{targetVisual.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
