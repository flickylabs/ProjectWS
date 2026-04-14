import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { loadProgressionState, saveProgressionState } from '../../../data/leaderboard'
import {
  CONVERSION_RATE,
  convertFragments,
  type FragmentId,
  type JudgeProgressionState,
} from '../../../engine/judgeProgressionEngine'
import {
  TITLE_TABLE,
  MAX_TITLE_LEVEL,
  canLevelUpTitle,
  levelUpTitle,
  getTitleLevelCost,
  canEquipTitle,
  getTitleById,
  type TitleId,
} from '../../../engine/judgeTitleEngine'
import {
  FRAGMENT_VISUALS,
  PCFragmentIcon,
  TRAIT_VISUALS,
} from '../progression/PCJudgeProgressionShared'

interface Props {
  onChange?: (nextState: JudgeProgressionState) => void
  syncKey?: number
}

/** 타이틀에 맞는 accent 색상 (3개 조각 색 중 첫번째) */
function getTitleAccent(titleId: TitleId): string {
  const def = getTitleById(titleId)
  if (!def) return '#888'
  return FRAGMENT_VISUALS[def.requiredFragments[0]]?.color ?? '#888'
}

export default function PCJudgeProgressionPanel({ onChange, syncKey }: Props) {
  const [state, setState] = useState<JudgeProgressionState>(() => loadProgressionState())
  const [selectedTitle, setSelectedTitle] = useState<TitleId>('cold_judge')
  const [celebrating, setCelebrating] = useState<TitleId | null>(null)

  useEffect(() => { setState(loadProgressionState()) }, [syncKey])
  useEffect(() => {
    if (!celebrating) return
    const t = window.setTimeout(() => setCelebrating(null), 1300)
    return () => window.clearTimeout(t)
  }, [celebrating])

  const commitState = useCallback((next: JudgeProgressionState) => {
    saveProgressionState(next)
    setState(next)
    onChange?.(next)
  }, [onChange])

  // ── 선택된 타이틀 데이터 ──
  const titleDef = getTitleById(selectedTitle)!
  const currentLevel = state.titleLevels[selectedTitle]
  const costPerFragment = getTitleLevelCost(currentLevel)
  const ready = canLevelUpTitle(selectedTitle, state.titleLevels, state.inventory)

  const handleLevelUp = () => {
    const result = levelUpTitle(selectedTitle, state.titleLevels, state.inventory)
    if (!result) return
    commitState({
      ...state,
      titleLevels: result.titleLevels,
      inventory: result.inventory,
      lastUpdated: new Date().toISOString(),
    })
    setCelebrating(selectedTitle)
  }

  const handleEquip = (slot: 'slot1' | 'slot2') => {
    if (!canEquipTitle(selectedTitle, slot, state.titleLevels, state.titleLoadout)) return
    const current = state.titleLoadout[slot]
    commitState({
      ...state,
      titleLoadout: {
        ...state.titleLoadout,
        [slot]: current === selectedTitle ? null : selectedTitle,
      },
      lastUpdated: new Date().toISOString(),
    })
  }

  const handleUnequip = (slot: 'slot1' | 'slot2') => {
    commitState({
      ...state,
      titleLoadout: { ...state.titleLoadout, [slot]: null },
      lastUpdated: new Date().toISOString(),
    })
  }

  // 장착 상태
  const isEquippedSlot1 = state.titleLoadout.slot1 === selectedTitle
  const isEquippedSlot2 = state.titleLoadout.slot2 === selectedTitle
  const isEquipped = isEquippedSlot1 || isEquippedSlot2

  // 조각 변환 (선택된 타이틀과 관련된 축 찾기)
  const relatedConversions = useMemo(() => {
    if (!titleDef) return []
    const seen = new Set<string>()
    return titleDef.requiredFragments
      .map(fid => {
        const fv = FRAGMENT_VISUALS[fid]
        if (!fv) return null
        // 이 조각의 축에서 중립 조각 찾기
        const allFragments = Object.entries(FRAGMENT_VISUALS)
        const axisDefs = require('../../../engine/judgeProgressionEngine').FRAGMENT_TABLE as Array<{ id: FragmentId; axis: string; direction: string }>
        const thisFrag = axisDefs.find(f => f.id === fid)
        if (!thisFrag || thisFrag.direction === 'neutral') return null
        const neutral = axisDefs.find(f => f.axis === thisFrag.axis && f.direction === 'neutral')
        if (!neutral || seen.has(neutral.id)) return null
        seen.add(neutral.id)
        const targets = axisDefs.filter(f => f.axis === thisFrag.axis && f.direction !== 'neutral')
        return { neutralId: neutral.id as FragmentId, targets: targets.map(t => t.id as FragmentId) }
      })
      .filter(Boolean) as Array<{ neutralId: FragmentId; targets: FragmentId[] }>
  }, [titleDef])

  const handleConvert = (targetFragId: FragmentId) => {
    const next = convertFragments(state.inventory, targetFragId)
    if (!next) return
    commitState({ ...state, inventory: next, lastUpdated: new Date().toISOString() })
  }

  // 슬롯 표시 데이터
  const slot1Title = state.titleLoadout.slot1 ? getTitleById(state.titleLoadout.slot1) : null
  const slot2Title = state.titleLoadout.slot2 ? getTitleById(state.titleLoadout.slot2) : null

  return (
    <div className="jp">
      {/* ── 1. 장착 슬롯 ── */}
      <div className="jp__equipped">
        <EquipSlotDisplay label="Slot 1" title={slot1Title ?? null} level={state.titleLoadout.slot1 ? state.titleLevels[state.titleLoadout.slot1] : 0} onUnequip={() => handleUnequip('slot1')} />
        <EquipSlotDisplay label="Slot 2" title={slot2Title ?? null} level={state.titleLoadout.slot2 ? state.titleLevels[state.titleLoadout.slot2] : 0} onUnequip={() => handleUnequip('slot2')} />
      </div>

      {/* ── 2. 타이틀 선택바 ── */}
      <div className="jp__selector">
        {TITLE_TABLE.map(t => {
          const lv = state.titleLevels[t.id]
          const canUp = canLevelUpTitle(t.id, state.titleLevels, state.inventory)
          const accent = getTitleAccent(t.id)
          return (
            <button
              key={t.id}
              className={`jp__trait-btn${selectedTitle === t.id ? ' is-active' : ''}${canUp ? ' is-ready' : ''}${celebrating === t.id ? ' is-celebrating' : ''}`}
              onClick={() => setSelectedTitle(t.id)}
              style={{ '--jp-accent': accent } as CSSProperties}
              type="button"
            >
              <PCFragmentIcon fragmentId={t.requiredFragments[0]} size={24} />
              <strong>{t.name}</strong>
              <span className={`jp__trait-lv${lv >= MAX_TITLE_LEVEL ? ' is-max' : ''}`}>
                {lv >= MAX_TITLE_LEVEL ? 'MAX' : lv > 0 ? `Lv.${lv}` : '—'}
              </span>
              {canUp && <span className="jp__trait-badge">!</span>}
            </button>
          )
        })}
      </div>

      {/* ── 3. 타이틀 상세 ── */}
      <div className="jp__detail" style={{ '--jp-accent': getTitleAccent(selectedTitle) } as CSSProperties}>
        <div className="jp__detail-header">
          <div className="jp__detail-icons">
            {titleDef.requiredFragments.map(fid => (
              <PCFragmentIcon key={fid} fragmentId={fid} size={28} />
            ))}
          </div>
          <div>
            <span className="jp__detail-axis">{titleDef.subtitle}</span>
            <h3>{titleDef.name}</h3>
          </div>
          <span className={`jp__detail-level${currentLevel >= MAX_TITLE_LEVEL ? ' is-max' : ''}`}>
            {currentLevel >= MAX_TITLE_LEVEL ? 'MAX' : currentLevel > 0 ? `Lv.${currentLevel} → ${currentLevel + 1}` : 'Lv.0 → 1'}
          </span>
        </div>

        <div className="jp__detail-body">
          {/* 좌: 강화 */}
          <div className="jp__enhance">
            <h4>강화</h4>
            {costPerFragment != null ? (
              <>
                {titleDef.requiredFragments.map(fid => (
                  <CostRow
                    key={fid}
                    fragmentId={fid}
                    label={FRAGMENT_VISUALS[fid]?.name ?? fid}
                    owned={state.inventory[fid]}
                    required={costPerFragment}
                  />
                ))}
                <button
                  className={`jp__enhance-btn${ready ? ' is-ready' : ''}`}
                  disabled={!ready}
                  onClick={handleLevelUp}
                  type="button"
                >
                  {ready ? '★ 레벨업' : '재료 부족'}
                </button>
              </>
            ) : (
              <div className="jp__enhance-maxed">
                <span>최대 레벨 도달</span>
                <strong>Lv.{MAX_TITLE_LEVEL}</strong>
                <p>{titleDef.effects[MAX_TITLE_LEVEL]}</p>
              </div>
            )}

            {/* 변환 */}
            {relatedConversions.map(conv => {
              const neuStock = state.inventory[conv.neutralId]
              const canConvert = neuStock >= CONVERSION_RATE
              return (
                <div className="jp__convert" key={conv.neutralId}>
                  <div className="jp__convert-stock">
                    <PCFragmentIcon fragmentId={conv.neutralId} size={18} />
                    <span>{FRAGMENT_VISUALS[conv.neutralId]?.name} ×{neuStock}</span>
                  </div>
                  <div className="jp__convert-actions">
                    {conv.targets.map(tid => (
                      <button
                        key={tid}
                        className="jp__convert-btn"
                        disabled={!canConvert}
                        onClick={() => handleConvert(tid)}
                        type="button"
                      >
                        → {FRAGMENT_VISUALS[tid]?.shortLabel ?? FRAGMENT_VISUALS[tid]?.name} +1
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* 우: 효과 + 장착 */}
          <div className="jp__perks">
            <h4>레벨별 효과</h4>
            {[1, 2, 3, 4, 5].map(lv => (
              <div key={lv} className={`jp__effect${lv <= currentLevel ? ' is-active' : ''}`}>
                <span className="jp__effect-lv">Lv.{lv}</span>
                <p>{titleDef.effects[lv]}</p>
              </div>
            ))}

            {currentLevel >= 1 && (
              <div className="jp__equip-actions">
                <h4>장착</h4>
                {isEquipped ? (
                  <button className="jp__perk-btn is-equipped" onClick={() => handleUnequip(isEquippedSlot1 ? 'slot1' : 'slot2')} type="button">
                    해제 ({isEquippedSlot1 ? 'Slot 1' : 'Slot 2'})
                  </button>
                ) : (
                  <div className="jp__equip-slots">
                    <button
                      className="jp__perk-btn"
                      disabled={!canEquipTitle(selectedTitle, 'slot1', state.titleLevels, state.titleLoadout)}
                      onClick={() => handleEquip('slot1')}
                      type="button"
                    >
                      Slot 1에 장착
                    </button>
                    <button
                      className="jp__perk-btn"
                      disabled={!canEquipTitle(selectedTitle, 'slot2', state.titleLevels, state.titleLoadout)}
                      onClick={() => handleEquip('slot2')}
                      type="button"
                    >
                      Slot 2에 장착
                    </button>
                  </div>
                )}
              </div>
            )}
            {currentLevel < 1 && <p className="jp__perks-empty">Lv.1 이상에서 장착 가능합니다.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 서브 컴포넌트 ──

function EquipSlotDisplay({ label, title, level, onUnequip }: {
  label: string
  title: import('../../../engine/judgeTitleEngine').TitleDefinition | null
  level: number
  onUnequip: () => void
}) {
  return (
    <div className={`jp__slot${title ? ' is-filled' : ''}`}>
      <span className="jp__slot-label">{label}</span>
      {title && <PCFragmentIcon fragmentId={title.requiredFragments[0]} size={24} />}
      <div>
        <strong>{title ? `${title.name} Lv.${level}` : '비어 있음'}</strong>
        <p>{title ? title.effects[level] ?? '' : '타이틀을 레벨업 후 장착하세요.'}</p>
      </div>
      {title && <button className="jp__slot-unequip" onClick={onUnequip} type="button">✕</button>}
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
