import { useMemo, type CSSProperties } from 'react'
import type { FragmentReward, TraitId } from '../../../engine/judgeProgressionEngine'
import {
  FRAGMENT_VISUALS,
  PCFragmentIcon,
  TRAIT_VISUALS,
} from './PCJudgeProgressionShared'

interface Props {
  rewards: FragmentReward[]
  enhanceableTraits: TraitId[]
  open: boolean
  onClose: () => void
}

export default function PCFragmentRewardOverlay({
  rewards,
  enhanceableTraits,
  open,
  onClose,
}: Props) {
  const summarizedRewards = useMemo(() => {
    const byFragment = new Map<string, { reward: FragmentReward; reasons: string[] }>()

    rewards.forEach((reward) => {
      const current = byFragment.get(reward.fragmentId)
      if (!current) {
        byFragment.set(reward.fragmentId, {
          reward: { ...reward },
          reasons: [reward.reason],
        })
        return
      }

      current.reward.count += reward.count
      if (!current.reasons.includes(reward.reason)) {
        current.reasons.push(reward.reason)
      }
    })

    return Array.from(byFragment.values())
  }, [rewards])

  if (!open || summarizedRewards.length === 0) {
    return null
  }

  return (
    <div className="pc-fragment-reward-overlay" onClick={onClose} role="presentation">
      <div
        className="pc-fragment-reward-overlay__panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pc-fragment-reward-title"
      >
        <div className="pc-fragment-reward-overlay__head">
          <div>
            <span className="pc-fragment-reward-overlay__eyebrow">FRAGMENT REWARD</span>
            <h3 id="pc-fragment-reward-title">판결 조각 획득</h3>
          </div>
          <button className="pc-fragment-reward-overlay__close" onClick={onClose} type="button">
            닫기
          </button>
        </div>

        <div className="pc-fragment-reward-overlay__grid">
          {summarizedRewards.map(({ reward, reasons }, index) => (
            <article
              className="pc-fragment-reward-card"
              key={reward.fragmentId}
              style={{ '--pc-reward-delay': `${index * 110}ms` } as CSSProperties}
              title={reasons.join(' · ')}
            >
              <div className="pc-fragment-reward-card__icon">
                <PCFragmentIcon fragmentId={reward.fragmentId} size={46} />
              </div>
              <strong>{FRAGMENT_VISUALS[reward.fragmentId].name}</strong>
              <span>{FRAGMENT_VISUALS[reward.fragmentId].symbol}</span>
              <b>+{reward.count}</b>
            </article>
          ))}
        </div>

        {enhanceableTraits.length > 0 ? (
          <div className="pc-fragment-reward-overlay__alert">
            <strong>성향 강화 가능!</strong>
            <div className="pc-fragment-reward-overlay__chips">
              {enhanceableTraits.map((traitId) => (
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
