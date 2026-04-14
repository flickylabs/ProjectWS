import { useEffect, useMemo, type CSSProperties } from 'react'
import { loadProgressionState } from '../../../data/leaderboard'
import { canEnhanceTrait, type FragmentReward, type TraitId } from '../../../engine/judgeProgressionEngine'
import {
  FRAGMENT_VISUALS,
  PCFragmentIcon,
  TRAIT_ORDER,
  TRAIT_VISUALS,
} from '../progression/PCJudgeProgressionShared'

interface Props {
  rewards: FragmentReward[]
  enhanceableTraits?: TraitId[]
  open?: boolean
  onClose?: () => void
  autoCloseMs?: number
}

export default function PCFragmentRewardOverlay({
  rewards,
  enhanceableTraits,
  open = true,
  onClose,
  autoCloseMs = 3000,
}: Props) {
  const summarizedRewards = useMemo(() => {
    const byFragment = new Map<string, {
      reward: FragmentReward
      reasons: string[]
      isBonus: boolean
    }>()

    rewards.forEach((reward) => {
      const current = byFragment.get(reward.fragmentId)
      const rewardIsBonus = reward.reason.includes('보너스')

      if (!current) {
        byFragment.set(reward.fragmentId, {
          reward: { ...reward },
          reasons: [reward.reason],
          isBonus: rewardIsBonus,
        })
        return
      }

      current.reward.count += reward.count
      current.isBonus = current.isBonus || rewardIsBonus
      if (!current.reasons.includes(reward.reason)) {
        current.reasons.push(reward.reason)
      }
    })

    return Array.from(byFragment.values())
  }, [rewards])

  const resolvedEnhanceableTraits = useMemo(() => {
    if (enhanceableTraits) return enhanceableTraits

    const state = loadProgressionState()
    return TRAIT_ORDER.filter((traitId) => canEnhanceTrait(traitId, state.traits, state.inventory))
  }, [enhanceableTraits])

  useEffect(() => {
    if (!open || !onClose || summarizedRewards.length === 0) return
    const timer = window.setTimeout(() => onClose(), autoCloseMs)
    return () => window.clearTimeout(timer)
  }, [autoCloseMs, onClose, open, summarizedRewards.length])

  if (!open || summarizedRewards.length === 0) {
    return null
  }

  return (
    <div className="pc-fragment-reward-overlay" onClick={onClose} role="presentation">
      <div
        className="pc-fragment-reward-overlay__panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-labelledby="pc-fragment-reward-title"
        aria-modal="true"
      >
        <div className="pc-fragment-reward-overlay__head">
          <div>
            <span className="pc-fragment-reward-overlay__eyebrow">FRAGMENT REWARD</span>
            <h3 id="pc-fragment-reward-title">판결 조각 회수 완료</h3>
          </div>
          <button className="pc-fragment-reward-overlay__close" onClick={onClose} type="button">
            닫기
          </button>
        </div>

        <div className="pc-fragment-reward-overlay__stage" aria-hidden="true">
          <div className="pc-fragment-reward-overlay__origin">판결 중심</div>
          <div className="pc-fragment-reward-overlay__inventory">인벤토리</div>
          {summarizedRewards.map(({ reward, isBonus }, index) => (
            <div
              className={`pc-fragment-reward-flight${isBonus ? ' is-bonus' : ''}`}
              key={reward.fragmentId}
              style={{
                '--pc-flight-delay': `${index * 120}ms`,
                '--pc-flight-x': `${152 + (index % 3) * 28}px`,
                '--pc-flight-y': `${-104 - Math.floor(index / 3) * 20}px`,
              } as CSSProperties}
            >
              <PCFragmentIcon fragmentId={reward.fragmentId} size={38} />
              <b>+{reward.count}</b>
            </div>
          ))}
        </div>

        <div className="pc-fragment-reward-overlay__grid">
          {summarizedRewards.map(({ reward, reasons, isBonus }, index) => (
            <article
              className={`pc-fragment-reward-card${isBonus ? ' is-bonus' : ''}`}
              key={reward.fragmentId}
              style={{ '--pc-reward-delay': `${index * 110}ms` } as CSSProperties}
              title={reasons.join(' · ')}
            >
              <div className="pc-fragment-reward-card__icon">
                <PCFragmentIcon fragmentId={reward.fragmentId} size={46} />
              </div>
              <span className="pc-fragment-reward-card__tag">{isBonus ? 'BONUS' : 'FRAGMENT'}</span>
              <strong>{FRAGMENT_VISUALS[reward.fragmentId].name}</strong>
              <span>{FRAGMENT_VISUALS[reward.fragmentId].shortLabel}</span>
              <b>+{reward.count}</b>
            </article>
          ))}
        </div>

        {resolvedEnhanceableTraits.length > 0 ? (
          <div className="pc-fragment-reward-overlay__alert">
            <strong>성향 강화 가능</strong>
            <div className="pc-fragment-reward-overlay__chips">
              {resolvedEnhanceableTraits.map((traitId) => (
                <span className="pc-fragment-reward-overlay__chip" key={traitId}>
                  {TRAIT_VISUALS[traitId].label}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <button className="pc-judge-action is-primary" onClick={onClose} type="button">
          결과 확인
        </button>
      </div>
    </div>
  )
}
