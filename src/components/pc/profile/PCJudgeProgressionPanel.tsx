import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
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
  PERK_TABLE,
  getAllUnlockedPerks,
  getPerkById,
  type PerkDefinition,
} from '../../../engine/judgePerks'
import {
  FRAGMENT_VISUALS,
  PCFragmentIcon,
  TRAIT_ORDER,
  TRAIT_VISUALS,
  getTraitMajorPerk,
  formatPerkUnlockCondition,
} from '../progression/PCJudgeProgressionShared'

interface Props {
  onChange?: (nextState: JudgeProgressionState) => void
  syncKey?: number
}

const AXIS_ROWS: Array<{ axisLabel: string; neutralFragment: FragmentId; traits: [TraitId, TraitId] }> = [
  { axisLabel: '탐구', neutralFragment: 'inquiry_fragment', traits: ['logical', 'intuitive'] },
  { axisLabel: '심판', neutralFragment: 'deliberation_fragment', traits: ['strict', 'lenient'] },
  { axisLabel: '해결', neutralFragment: 'balance_fragment', traits: ['principled', 'reconciling'] },
]

export default function PCJudgeProgressionPanel({ onChange, syncKey }: Props) {
  const [state, setState] = useState<JudgeProgressionState>(() => loadProgressionState())
  const [selectedTrait, setSelectedTrait] = useState<TraitId>('logical')
  const [celebratingTrait, setCelebratingTrait] = useState<TraitId | null>(null)
  const [convertedFragment, setConvertedFragment] = useState<FragmentId | null>(null)

  useEffect(() => { setState(loadProgressionState()) }, [syncKey])
  useEffect(() => {
    if (!celebratingTrait) return
    const t = window.setTimeout(() => setCelebratingTrait(null), 1300)
    return () => window.clearTimeout(t)
  }, [celebratingTrait])
  useEffect(() => {
    if (!convertedFragment) return
    const t = window.setTimeout(() => setConvertedFragment(null), 950)
    return () => window.clearTimeout(t)
  }, [convertedFragment])

  const commitState = useCallback((next: JudgeProgressionState) => {
    saveProgressionState(next)
    setState(next)
    onChange?.(next)
  }, [onChange])

  const unlockedPerks = useMemo(() => ({
    major: new Set(getAllUnlockedPerks(state.traits, 'major').map(p => p.id)),
    minor: new Set(getAllUnlockedPerks(state.traits, 'minor').map(p => p.id)),
  }), [state.traits])

  // ── 선택된 성향 관련 데이터 ──
  const tv = TRAIT_VISUALS[selectedTrait]
  const currentLevel = state.traits[selectedTrait].level
  const nextCost = getEnhancementCost(currentLevel)
  const ready = canEnhanceTrait(selectedTrait, state.traits, state.inventory)
  const dirOwned = state.inventory[tv.directionFragment]
  const neuOwned = state.inventory[tv.neutralFragment]
  const majorPerk = getTraitMajorPerk(selectedTrait)
  const relatedPerks = PERK_TABLE.filter(p => p.requiredTrait === selectedTrait)

  const handleEnhance = () => {
    const result = enhanceTrait(selectedTrait, state.traits, state.inventory)
    if (!result) return
    commitState({ ...state, inventory: result.inventory, traits: result.traits, lastUpdated: new Date().toISOString() })
    setCelebratingTrait(selectedTrait)
  }

  const handleConvert = (targetTrait: TraitId) => {
    const frag = TRAIT_VISUALS[targetTrait].directionFragment
    const next = convertFragments(state.inventory, frag)
    if (!next) return
    commitState({ ...state, inventory: next, lastUpdated: new Date().toISOString() })
    setConvertedFragment(frag)
  }

  const handleTogglePerk = (perk: PerkDefinition) => {
    const unlocked = unlockedPerks[perk.tier].has(perk.id)
    if (!unlocked) return
    const key = perk.tier === 'major' ? 'equippedMajor' : 'equippedMinor'
    const current = perk.tier === 'major' ? state.equippedMajor : state.equippedMinor
    commitState({ ...state, [key]: current === perk.id ? null : perk.id, lastUpdated: new Date().toISOString() })
  }

  const equippedMajor = (state.equippedMajor ? getPerkById(state.equippedMajor) : null) ?? null
  const equippedMinor = (state.equippedMinor ? getPerkById(state.equippedMinor) : null) ?? null

  return (
    <div className="jp">
      {/* ── 1. 장착 슬롯 ── */}
      <div className="jp__equipped">
        <EquipSlot label="Major" perk={equippedMajor} empty="Lv3 성향 달성 시 해금" />
        <EquipSlot label="Minor" perk={equippedMinor} empty="Lv1 성향 달성 시 해금" />
      </div>

      {/* ── 2. 성향 선택바 ── */}
      <div className="jp__selector">
        {TRAIT_ORDER.map(tid => {
          const v = TRAIT_VISUALS[tid]
          const lv = state.traits[tid].level
          const canUp = canEnhanceTrait(tid, state.traits, state.inventory)
          return (
            <button
              key={tid}
              className={`jp__trait-btn${selectedTrait === tid ? ' is-active' : ''}${canUp ? ' is-ready' : ''}${celebratingTrait === tid ? ' is-celebrating' : ''}`}
              onClick={() => setSelectedTrait(tid)}
              style={{ '--jp-accent': v.accent } as CSSProperties}
              type="button"
            >
              <PCFragmentIcon fragmentId={v.directionFragment} size={28} />
              <strong>{v.label}</strong>
              <span className={`jp__trait-lv${lv >= 3 ? ' is-max' : ''}`}>
                {lv >= 3 ? 'MAX' : `Lv.${lv}`}
              </span>
              <div className="jp__trait-dots">
                {[0, 1, 2].map(i => <i key={i} className={i < lv ? 'is-on' : ''} />)}
              </div>
              {canUp && <span className="jp__trait-badge">!</span>}
            </button>
          )
        })}
      </div>

      {/* ── 3. 선택 성향 상세 ── */}
      <div className="jp__detail" style={{ '--jp-accent': tv.accent } as CSSProperties}>
        <div className="jp__detail-header">
          <PCFragmentIcon fragmentId={tv.directionFragment} size={40} />
          <div>
            <span className="jp__detail-axis">{tv.axisLabel} 축</span>
            <h3>{tv.label}</h3>
          </div>
          <span className={`jp__detail-level${currentLevel >= 3 ? ' is-max' : ''}`}>
            {currentLevel >= 3 ? 'MAX' : `Lv.${currentLevel} → ${currentLevel + 1}`}
          </span>
        </div>

        <div className="jp__detail-body">
          {/* 좌: 강화 */}
          <div className="jp__enhance">
            <h4>강화</h4>
            {nextCost ? (
              <>
                <CostRow
                  fragmentId={tv.directionFragment}
                  label={FRAGMENT_VISUALS[tv.directionFragment].name}
                  owned={dirOwned}
                  required={nextCost.directionFragments}
                />
                <CostRow
                  fragmentId={tv.neutralFragment}
                  label={FRAGMENT_VISUALS[tv.neutralFragment].name}
                  owned={neuOwned}
                  required={nextCost.neutralFragments}
                />
                <button
                  className={`jp__enhance-btn${ready ? ' is-ready' : ''}`}
                  disabled={!ready}
                  onClick={handleEnhance}
                  type="button"
                >
                  {ready ? '★ 강화하기' : '재료 부족'}
                </button>
              </>
            ) : (
              <div className="jp__enhance-maxed">
                <span>최대 레벨 도달</span>
                <strong>{majorPerk?.name}</strong>
                <p>{majorPerk?.description}</p>
              </div>
            )}

            {/* 변환 (선택된 축만) */}
            {AXIS_ROWS.filter(r => r.traits.includes(selectedTrait)).map(row => {
              const neuStock = state.inventory[row.neutralFragment]
              const canConvert = neuStock >= CONVERSION_RATE
              return (
                <div className="jp__convert" key={row.neutralFragment}>
                  <div className="jp__convert-stock">
                    <PCFragmentIcon fragmentId={row.neutralFragment} size={20} />
                    <span>{FRAGMENT_VISUALS[row.neutralFragment].name} ×{neuStock}</span>
                  </div>
                  <div className="jp__convert-actions">
                    {row.traits.map(tid => (
                      <button
                        key={tid}
                        className={`jp__convert-btn${convertedFragment === TRAIT_VISUALS[tid].directionFragment ? ' is-firing' : ''}`}
                        disabled={!canConvert}
                        onClick={() => handleConvert(tid)}
                        type="button"
                      >
                        → {TRAIT_VISUALS[tid].label} +1
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* 우: 퍼크 */}
          <div className="jp__perks">
            <h4>퍼크</h4>
            {relatedPerks.map(perk => {
              const unlocked = unlockedPerks[perk.tier].has(perk.id)
              const equipped = perk.tier === 'major'
                ? state.equippedMajor === perk.id
                : state.equippedMinor === perk.id
              return (
                <div
                  key={perk.id}
                  className={`jp__perk${unlocked ? ' is-unlocked' : ' is-locked'}${equipped ? ' is-equipped' : ''}`}
                >
                  <div className="jp__perk-head">
                    <span className="jp__perk-tier">{perk.tier === 'major' ? '★' : '•'}</span>
                    <div>
                      <strong>{perk.name}</strong>
                      <span className="jp__perk-cond">
                        {unlocked ? (perk.tier === 'major' ? 'Major' : 'Minor') : formatPerkUnlockCondition(perk.requiredTrait, perk.requiredLevel)}
                      </span>
                    </div>
                    {equipped && <span className="jp__perk-badge">장착 중</span>}
                  </div>
                  <p>{perk.description}</p>
                  {unlocked && (
                    <button
                      className={`jp__perk-btn${equipped ? ' is-equipped' : ''}`}
                      onClick={() => handleTogglePerk(perk)}
                      type="button"
                    >
                      {equipped ? '해제' : '장착'}
                    </button>
                  )}
                  {!unlocked && <span className="jp__perk-lock">🔒 {formatPerkUnlockCondition(perk.requiredTrait, perk.requiredLevel)}</span>}
                </div>
              )
            })}
            {relatedPerks.length === 0 && <p className="jp__perks-empty">이 성향에 연결된 퍼크가 없습니다.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 서브 컴포넌트 ──

function EquipSlot({ label, perk, empty }: { label: string; perk: PerkDefinition | null; empty: string }) {
  const traitVisual = perk ? TRAIT_VISUALS[perk.requiredTrait as TraitId] : null
  return (
    <div className={`jp__slot${perk ? ' is-filled' : ''}`}>
      <span className="jp__slot-label">{label}</span>
      {traitVisual && <PCFragmentIcon fragmentId={traitVisual.directionFragment} size={24} />}
      <div>
        <strong>{perk?.name ?? '비어 있음'}</strong>
        <p>{perk?.description ?? empty}</p>
      </div>
    </div>
  )
}

function CostRow({ fragmentId, label, owned, required }: { fragmentId: FragmentId; label: string; owned: number; required: number }) {
  const ratio = Math.min(owned / required, 1)
  const enough = owned >= required
  return (
    <div className="jp__cost">
      <div className="jp__cost-label">
        <PCFragmentIcon fragmentId={fragmentId} size={20} />
        <span>{label}</span>
      </div>
      <div className="jp__cost-bar">
        <div className="jp__cost-track"><i style={{ width: `${Math.round(ratio * 100)}%` }} /></div>
        <strong className={enough ? 'is-enough' : 'is-short'}>{owned}/{required}</strong>
      </div>
    </div>
  )
}
