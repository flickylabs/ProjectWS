import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { loadProgressionState, saveProgressionState } from '../../../data/leaderboard'
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
  getTraitMajorPerk,
} from '../progression/PCJudgeProgressionShared'

interface Props {
  onChange?: (nextState: JudgeProgressionState) => void
  syncKey?: number
}

const CONVERSION_ROWS: Array<{
  axisLabel: string
  neutralFragment: FragmentId
  targets: TraitId[]
}> = [
  { axisLabel: '탐구 축', neutralFragment: 'inquiry_fragment', targets: ['logical', 'intuitive'] },
  { axisLabel: '판결 균형', neutralFragment: 'deliberation_fragment', targets: ['strict', 'lenient'] },
  { axisLabel: '해결 축', neutralFragment: 'balance_fragment', targets: ['principled', 'reconciling'] },
]

export default function PCTraitEnhancePanel({ onChange, syncKey }: Props) {
  const [state, setState] = useState<JudgeProgressionState>(() => loadProgressionState())
  const [celebratingTrait, setCelebratingTrait] = useState<TraitId | null>(null)
  const [convertedFragment, setConvertedFragment] = useState<FragmentId | null>(null)

  useEffect(() => {
    setState(loadProgressionState())
  }, [syncKey])

  useEffect(() => {
    if (!celebratingTrait) return
    const timer = window.setTimeout(() => setCelebratingTrait(null), 1300)
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
    saveProgressionState(nextState)
    setState(nextState)
    onChange?.(nextState)
  }

  const handleEnhance = (traitId: TraitId) => {
    const enhanced = enhanceTrait(traitId, state.traits, state.inventory)
    if (!enhanced) return

    commitState({
      ...state,
      inventory: enhanced.inventory,
      traits: enhanced.traits,
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
          <h3>6성향 강화</h3>
        </div>
        <span className={`pc-judge-panel__status${enhanceableCount > 0 ? ' is-hot' : ''}`}>
          강화 가능 {enhanceableCount}개
        </span>
      </header>

      <div className="pc-trait-enhance-panel__grid">
        {TRAIT_ORDER.map((traitId) => {
          const visual = TRAIT_VISUALS[traitId]
          const directionVisual = FRAGMENT_VISUALS[visual.directionFragment]
          const neutralVisual = FRAGMENT_VISUALS[visual.neutralFragment]
          const currentLevel = state.traits[traitId].level
          const directionOwned = state.inventory[visual.directionFragment]
          const neutralOwned = state.inventory[visual.neutralFragment]
          const nextCost = getEnhancementCost(currentLevel)
          const ready = canEnhanceTrait(traitId, state.traits, state.inventory)
          const progressRatio = nextCost
            ? (
              Math.min(directionOwned / nextCost.directionFragments, 1)
              + Math.min(neutralOwned / nextCost.neutralFragments, 1)
            ) / 2
            : 1
          const majorPerk = getTraitMajorPerk(traitId)

          return (
            <article
              className={`pc-trait-card${ready ? ' is-ready' : ''}${celebratingTrait === traitId ? ' is-celebrating' : ''}`}
              key={traitId}
              style={{ '--pc-trait-accent': visual.accent } as CSSProperties}
            >
              <div className="pc-trait-card__top">
                <div className="pc-trait-card__title">
                  <PCFragmentIcon fragmentId={visual.directionFragment} size={36} />
                  <div>
                    <span className="pc-trait-card__eyebrow">{visual.axisLabel}</span>
                    <strong>{visual.label}</strong>
                    <p>{nextCost ? '강화 재료를 모아 다음 레벨을 해금합니다.' : `${majorPerk?.name ?? 'Major 퍼크'} 해금 완료`}</p>
                  </div>
                </div>

                <div className="pc-trait-card__status">
                  <span className={`pc-trait-card__badge${currentLevel >= 3 ? ' is-max' : ''}`}>
                    {currentLevel >= 3 ? 'MAX' : `Lv.${currentLevel}`}
                  </span>
                  <div className="pc-trait-card__levels" aria-label={`${visual.label} 레벨 ${currentLevel}`}>
                    {Array.from({ length: 3 }, (_, index) => (
                      <i className={index < currentLevel ? 'is-filled' : ''} key={index} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="pc-trait-card__meta">
                <span>{visual.axisLabel} 축 전용 성장 경로</span>
                <span>{nextCost ? `다음 Lv.${currentLevel + 1}` : `${majorPerk?.name ?? 'Major 퍼크'} 해금`}</span>
              </div>

              {nextCost ? (
                <>
                  <div className="pc-trait-card__requirement">
                    {directionVisual.name} ×{nextCost.directionFragments} / {neutralVisual.name} ×{nextCost.neutralFragments}
                  </div>

                  <div className="pc-trait-card__progress">
                    <div className="pc-trait-card__progress-track">
                      <i style={{ width: `${Math.round(progressRatio * 100)}%` }} />
                    </div>
                    <span>{Math.round(progressRatio * 100)}%</span>
                  </div>

                  <div className="pc-trait-card__costs">
                    <div className="pc-trait-cost">
                      <span className="pc-trait-cost__label">
                        <PCFragmentIcon fragmentId={visual.directionFragment} size={22} />
                        {directionVisual.name}
                      </span>
                      <strong className={directionOwned >= nextCost.directionFragments ? 'is-enough' : 'is-short'}>
                        {directionOwned} / {nextCost.directionFragments}
                      </strong>
                    </div>
                    <div className="pc-trait-cost">
                      <span className="pc-trait-cost__label">
                        <PCFragmentIcon fragmentId={visual.neutralFragment} size={22} />
                        {neutralVisual.name}
                      </span>
                      <strong className={neutralOwned >= nextCost.neutralFragments ? 'is-enough' : 'is-short'}>
                        {neutralOwned} / {nextCost.neutralFragments}
                      </strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="pc-trait-card__maxed">
                  <span className="pc-trait-card__badge is-max">MAX</span>
                  <div>
                    <strong>{majorPerk?.name ?? 'Major 퍼크'}</strong>
                    <p>{majorPerk?.description ?? '최대 레벨에 도달했습니다.'}</p>
                  </div>
                </div>
              )}

              <button
                className={`pc-judge-action${ready ? ' is-primary' : ''}`}
                disabled={!ready}
                onClick={() => handleEnhance(traitId)}
                type="button"
              >
                강화
              </button>
            </article>
          )
        })}
      </div>

      <section className="pc-trait-convert">
        <div className="pc-trait-convert__header">
          <div>
            <span className="pc-judge-panel__eyebrow">FRAGMENT CONVERT</span>
            <h4>조각 변환</h4>
          </div>
          <span className="pc-trait-convert__rule">중립 조각 {CONVERSION_RATE}개 → 방향 조각 1개</span>
        </div>

        <div className="pc-trait-convert__rows">
          {CONVERSION_ROWS.map((row) => (
            <div className="pc-trait-convert__row" key={row.neutralFragment}>
              <div className="pc-trait-convert__stock">
                <PCFragmentIcon fragmentId={row.neutralFragment} size={28} />
                <div>
                  <strong>{FRAGMENT_VISUALS[row.neutralFragment].name}</strong>
                  <span>{row.axisLabel} 중립 재고 {state.inventory[row.neutralFragment]}개</span>
                </div>
              </div>

              <div className="pc-trait-convert__actions">
                {row.targets.map((traitId) => {
                  const targetVisual = TRAIT_VISUALS[traitId]
                  const targetFragment = targetVisual.directionFragment
                  const disabled = state.inventory[row.neutralFragment] < CONVERSION_RATE

                  return (
                    <button
                      className={`pc-trait-convert__button${convertedFragment === targetFragment ? ' is-firing' : ''}`}
                      disabled={disabled}
                      key={traitId}
                      onClick={() => handleConvert(traitId)}
                      type="button"
                    >
                      <PCFragmentIcon fragmentId={targetFragment} size={24} />
                      <span>중립 조각 ×{CONVERSION_RATE} → {targetVisual.label} 조각 ×1</span>
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
