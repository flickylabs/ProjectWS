import { useCallback, useEffect, useMemo, useState } from 'react'
import { loadProgressionState, saveProgressionState } from '../../../data/leaderboard'
import {
  FRAGMENT_TABLE,
  createEmptyInventory,
  type FragmentId,
  type FragmentInventory,
  type JudgeProgressionState,
} from '../../../engine/judgeProgressionEngine'
import {
  TITLE_TABLE,
  MAX_SUB_LEVEL,
  canEnhanceAxis,
  enhanceAxis,
  canEquipTitle,
  getTotalLevel,
  getActiveEffect,
  getSubLevelCost,
  getAxisCostItems,
  canExchangeFragments,
  exchangeFragments,
  EXCHANGE_RATE,
  createDefaultTitleLevels,
  createDefaultLoadout,
  getTitleById,
  getTitleResourceBonuses,
  getActiveTitleGameplayNotes,
  type TitleDefinition,
  type TitleId,
  type TitleLevels,
  type TitleLoadout,
} from '../../../engine/judgeTitleEngine'
import type { Resources } from '../../../types'
import {
  FRAGMENT_VISUALS,
  PCFragmentIcon,
} from '../progression/PCJudgeProgressionShared'

interface Props {
  onChange?: (nextState: JudgeProgressionState) => void
  syncKey?: number
}

type RightTab = 'titles' | 'fragments'

const RESOURCE_LABELS: Record<keyof Resources, string> = {
  investigationTokens: '조사 토큰',
  skillPoints: '스킬 포인트',
  courtControl: '법정 장악',
}

export default function PCJudgeProgressionPanel({ onChange, syncKey }: Props) {
  const [state, setState] = useState<JudgeProgressionState>(() => normalizeProgression(loadProgressionState()))
  const [rightTab, setRightTab] = useState<RightTab>('titles')
  const [selectedTitle, setSelectedTitle] = useState<TitleId>('cold_judge')
  const [selectedAxis, setSelectedAxis] = useState(0)
  const [selectedFragment, setSelectedFragment] = useState<FragmentId>('reasoning_fragment')
  const [exchangeTarget, setExchangeTarget] = useState<FragmentId>('inquiry_fragment')
  const [synthesizingAxis, setSynthesizingAxis] = useState<number | null>(null)

  useEffect(() => {
    setState(normalizeProgression(loadProgressionState()))
  }, [syncKey])

  const titleLevels = state.titleLevels ?? createDefaultTitleLevels()
  const titleLoadout = state.titleLoadout ?? createDefaultLoadout()
  const inventory = state.inventory ?? createEmptyInventory()

  const commitState = useCallback((next: JudgeProgressionState) => {
    saveProgressionState(next)
    setState(next)
    onChange?.(next)
  }, [onChange])

  const handleEnhanceAxis = useCallback((axisIndex: number) => {
    const result = enhanceAxis(selectedTitle, axisIndex, titleLevels, inventory)
    if (!result) return
    setSynthesizingAxis(axisIndex)
    window.setTimeout(() => setSynthesizingAxis((current) => current === axisIndex ? null : current), 620)
    commitState({
      ...state,
      titleLevels: result.titleLevels,
      inventory: result.inventory,
      lastUpdated: new Date().toISOString(),
    })
  }, [commitState, inventory, selectedTitle, state, titleLevels])

  const handleEquip = useCallback((slot: 'slot1' | 'slot2') => {
    if (!canEquipTitle(selectedTitle, slot, titleLevels, titleLoadout)) return
    commitState({
      ...state,
      titleLoadout: {
        ...titleLoadout,
        [slot]: titleLoadout[slot] === selectedTitle ? null : selectedTitle,
      },
      lastUpdated: new Date().toISOString(),
    })
  }, [commitState, selectedTitle, state, titleLevels, titleLoadout])

  const handleUnequip = useCallback((slot: 'slot1' | 'slot2') => {
    commitState({
      ...state,
      titleLoadout: { ...titleLoadout, [slot]: null },
      lastUpdated: new Date().toISOString(),
    })
  }, [commitState, state, titleLoadout])

  const handleExchange = useCallback(() => {
    const next = exchangeFragments(inventory, selectedFragment, exchangeTarget)
    if (!next) return
    commitState({ ...state, inventory: next, lastUpdated: new Date().toISOString() })
  }, [commitState, exchangeTarget, inventory, selectedFragment, state])

  const titleDef = getTitleById(selectedTitle) ?? TITLE_TABLE[0]
  const subs = titleLevels[selectedTitle]
  const totalLv = getTotalLevel(subs)
  const activeEffect = getActiveEffect(titleDef, totalLv)
  const isEquipped = titleLoadout.slot1 === selectedTitle || titleLoadout.slot2 === selectedTitle
  const activeNotes = getActiveTitleGameplayNotes(titleDef, totalLv)

  const selectedAxisSafe = Math.max(0, Math.min(2, selectedAxis))

  const loadoutBonuses = useMemo(() => {
    const bonuses: Partial<Resources> = {}
    for (const titleId of [titleLoadout.slot1, titleLoadout.slot2]) {
      if (!titleId) continue
      const def = getTitleById(titleId)
      if (!def) continue
      const titleBonus = getTitleResourceBonuses(def, getTotalLevel(titleLevels[titleId]))
      for (const key of Object.keys(titleBonus) as Array<keyof Resources>) {
        bonuses[key] = (bonuses[key] ?? 0) + (titleBonus[key] ?? 0)
      }
    }
    return bonuses
  }, [titleLevels, titleLoadout])

  return (
    <div className="jp2 jp2--forge">
      <div className="jp2__summary">
        <div>
          <span className="jp2__eyebrow">Judge Loadout</span>
          <h3>타이틀 장착 효과</h3>
        </div>
        <div className="jp2__bonus-strip">
          {(Object.keys(RESOURCE_LABELS) as Array<keyof Resources>).map((key) => (
            <span key={key} className={`jp2__bonus-pill${loadoutBonuses[key] ? ' is-active' : ''}`}>
              {RESOURCE_LABELS[key]} <b>+{loadoutBonuses[key] ?? 0}</b>
            </span>
          ))}
        </div>
      </div>

      <div className="jp2__slots">
        <SlotDisplay
          label="SLOT 1"
          title={titleLoadout.slot1 ? getTitleById(titleLoadout.slot1) ?? null : null}
          level={titleLoadout.slot1 ? getTotalLevel(titleLevels[titleLoadout.slot1]) : 0}
          onUnequip={() => handleUnequip('slot1')}
        />
        <SlotDisplay
          label="SLOT 2"
          title={titleLoadout.slot2 ? getTitleById(titleLoadout.slot2) ?? null : null}
          level={titleLoadout.slot2 ? getTotalLevel(titleLevels[titleLoadout.slot2]) : 0}
          onUnequip={() => handleUnequip('slot2')}
        />
      </div>

      <div className="jp2__split">
        <div className="jp2__left">
          {rightTab === 'titles' ? (
            <TitleDetailPanel
              titleDef={titleDef}
              subs={subs}
              totalLv={totalLv}
              activeEffect={activeEffect}
              activeNotes={activeNotes}
              inventory={inventory}
              titleLevels={titleLevels}
              titleLoadout={titleLoadout}
              isEquipped={isEquipped}
              selectedTitle={selectedTitle}
              selectedAxis={selectedAxisSafe}
              synthesizingAxis={synthesizingAxis}
              onSelectAxis={setSelectedAxis}
              onEnhanceAxis={handleEnhanceAxis}
              onEquip={handleEquip}
            />
          ) : (
            <FragmentDetailPanel
              fragmentId={selectedFragment}
              inventory={inventory}
              exchangeTarget={exchangeTarget}
              onSetTarget={setExchangeTarget}
              onExchange={handleExchange}
            />
          )}
        </div>

        <div className="jp2__right">
          <div className="jp2__toggle">
            <button className={`jp2__toggle-btn${rightTab === 'titles' ? ' is-active' : ''}`} onClick={() => setRightTab('titles')} type="button">타이틀 합성</button>
            <button className={`jp2__toggle-btn${rightTab === 'fragments' ? ' is-active' : ''}`} onClick={() => setRightTab('fragments')} type="button">판결 조각</button>
          </div>

          {rightTab === 'titles' ? (
            <div className="jp2__grid jp2__grid--titles">
              {TITLE_TABLE.map((title) => {
                const lv = getTotalLevel(titleLevels[title.id])
                const active = selectedTitle === title.id
                const equipped = titleLoadout.slot1 === title.id || titleLoadout.slot2 === title.id
                return (
                  <button key={title.id} className={`jp2__card${active ? ' is-active' : ''}${equipped ? ' is-equipped' : ''}`} onClick={() => { setSelectedTitle(title.id); setSelectedAxis(0) }} type="button">
                    <span className="jp2__card-kicker">{equipped ? '장착 중' : lv > 0 ? '보유' : '미합성'}</span>
                    <strong>{title.name}</strong>
                    <span className="jp2__card-lv">Lv.{lv}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="jp2__grid jp2__grid--fragments">
              {FRAGMENT_TABLE.map((fragment) => {
                const active = selectedFragment === fragment.id
                const count = inventory[fragment.id]
                const visual = FRAGMENT_VISUALS[fragment.id]
                return (
                  <button key={fragment.id} className={`jp2__card${active ? ' is-active' : ''}`} onClick={() => { setSelectedFragment(fragment.id); if (exchangeTarget === fragment.id) setExchangeTarget(firstExchangeTarget(fragment.id)) }} type="button">
                    <PCFragmentIcon fragmentId={fragment.id} size={30} />
                    <strong>{visual?.name ?? fragment.name}</strong>
                    <span className="jp2__card-count">{count}개</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TitleDetailPanel({
  titleDef,
  subs,
  totalLv,
  activeEffect,
  activeNotes,
  inventory,
  titleLevels,
  titleLoadout,
  isEquipped,
  selectedTitle,
  selectedAxis,
  synthesizingAxis,
  onSelectAxis,
  onEnhanceAxis,
  onEquip,
}: {
  titleDef: TitleDefinition
  subs: [number, number, number]
  totalLv: number
  activeEffect: string
  activeNotes: string[]
  inventory: FragmentInventory
  titleLevels: TitleLevels
  titleLoadout: TitleLoadout
  isEquipped: boolean
  selectedTitle: TitleId
  selectedAxis: number
  synthesizingAxis: number | null
  onSelectAxis: (i: number) => void
  onEnhanceAxis: (i: number) => void
  onEquip: (slot: 'slot1' | 'slot2') => void
}) {
  const axis = titleDef.axes[selectedAxis]
  const subLv = subs[selectedAxis]
  const cost = getSubLevelCost(subLv)
  const canUp = canEnhanceAxis(selectedTitle, selectedAxis, titleLevels, inventory)
  const costItems = cost ? getAxisCostItems(axis, cost) : []
  const nextLevel = Math.min(MAX_SUB_LEVEL, subLv + 1)
  const titleBonuses = getTitleResourceBonuses(titleDef, totalLv)

  return (
    <div className="jp2__detail">
      <div className="jp2__detail-head">
        <div>
          <div className="jp2__detail-tags">
            {titleDef.axes.map((item) => <span key={item.label} className="jp2__tag">{item.label}</span>)}
          </div>
          <h3>{titleDef.name} <span className="jp2__detail-lv">Lv.{totalLv}</span></h3>
          <p className="jp2__detail-subtitle">{titleDef.subtitle}</p>
          {activeEffect ? <p className="jp2__detail-effect">{activeEffect}</p> : <p className="jp2__detail-effect is-muted">Lv.1부터 장착과 시작 보너스가 열립니다.</p>}
        </div>
      </div>

      <div className="jp2__axis-tabs" role="tablist" aria-label="타이틀 축 선택">
        {titleDef.axes.map((item, index) => (
          <button
            key={item.label}
            className={`jp2__axis-tab${selectedAxis === index ? ' is-active' : ''}`}
            onClick={() => onSelectAxis(index)}
            type="button"
          >
            <span>{item.label}</span>
            <b>{subs[index] >= MAX_SUB_LEVEL ? 'MAX' : `Lv.${subs[index]}`}</b>
          </button>
        ))}
      </div>

      <div className={`jp2__forge-panel${synthesizingAxis === selectedAxis ? ' is-synthesizing' : ''}`}>
        <div className="jp2__forge-title">
          <span>{axis.label} 축 합성</span>
          <b>{subLv >= MAX_SUB_LEVEL ? '최대 강화' : `Lv.${subLv} → Lv.${nextLevel}`}</b>
        </div>
        <div className="jp2__forge-lane">
          {costItems.length > 0 ? costItems.map((item) => (
            <ForgeSocket key={item.fragmentId} fragmentId={item.fragmentId} amount={item.amount} owned={inventory[item.fragmentId]} />
          )) : (
            <div className="jp2__forge-max">이 축은 이미 최대 레벨입니다.</div>
          )}
          <div className="jp2__forge-core" aria-hidden="true">
            <span className="jp2__forge-core-ring" />
            <span className="jp2__forge-core-label">합성</span>
          </div>
          <button
            className="jp2__forge-button"
            disabled={!cost || !canUp}
            onClick={() => onEnhanceAxis(selectedAxis)}
            type="button"
          >
            {cost ? '조각 얹고 합성' : '최대 레벨'}
          </button>
        </div>
        <p className="jp2__forge-hint">
          방향 조각과 중립 조각을 함께 소비해 해당 축을 강화합니다. 장착한 타이틀은 다음 사건 시작 자원에 즉시 반영됩니다.
        </p>
      </div>

      <div className="jp2__detail-effects">
        <h4>레벨별 효과</h4>
        {Object.entries(titleDef.effects).map(([level, desc]) => (
          <div key={level} className={`jp2__effect-row${totalLv >= Number(level) ? ' is-active' : ''}`}>
            <span>Lv.{level}</span>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      <div className="jp2__active-bonuses">
        <h4>현재 장착 시 시작 보너스</h4>
        <div className="jp2__bonus-strip">
          {(Object.keys(RESOURCE_LABELS) as Array<keyof Resources>).map((key) => (
            <span key={key} className={`jp2__bonus-pill${titleBonuses[key] ? ' is-active' : ''}`}>
              {RESOURCE_LABELS[key]} <b>+{titleBonuses[key] ?? 0}</b>
            </span>
          ))}
        </div>
        {activeNotes.length > 0 ? <p>{activeNotes.join(' · ')}</p> : <p>아직 적용 중인 게임 보너스가 없습니다.</p>}
      </div>

      <div className="jp2__detail-actions">
        {isEquipped ? (
          <span className="jp2__equipped-badge">현재 슬롯에 장착 중</span>
        ) : totalLv >= 1 ? (
          <div className="jp2__equip-btns">
            <button className="jp2__action-btn" disabled={!canEquipTitle(selectedTitle, 'slot1', titleLevels, titleLoadout)} onClick={() => onEquip('slot1')} type="button">Slot 1 장착</button>
            <button className="jp2__action-btn" disabled={!canEquipTitle(selectedTitle, 'slot2', titleLevels, titleLoadout)} onClick={() => onEquip('slot2')} type="button">Slot 2 장착</button>
          </div>
        ) : (
          <span className="jp2__lock-hint">Lv.1 이상 합성해야 슬롯에 장착할 수 있습니다.</span>
        )}
      </div>
    </div>
  )
}

function ForgeSocket({ fragmentId, amount, owned }: { fragmentId: FragmentId; amount: number; owned: number }) {
  const visual = FRAGMENT_VISUALS[fragmentId]
  const enough = owned >= amount
  return (
    <div className={`jp2__forge-socket${enough ? ' has-enough' : ' is-short'}`}>
      <PCFragmentIcon fragmentId={fragmentId} size={42} />
      <div>
        <strong>{visual?.shortLabel ?? fragmentId}</strong>
        <span>필요 {amount} · 보유 {owned}</span>
      </div>
    </div>
  )
}

function FragmentDetailPanel({
  fragmentId,
  inventory,
  exchangeTarget,
  onSetTarget,
  onExchange,
}: {
  fragmentId: FragmentId
  inventory: FragmentInventory
  exchangeTarget: FragmentId
  onSetTarget: (id: FragmentId) => void
  onExchange: () => void
}) {
  const visual = FRAGMENT_VISUALS[fragmentId]
  const count = inventory[fragmentId]
  const canExchange = canExchangeFragments(inventory, fragmentId)
  const usedBy = TITLE_TABLE.filter((title) => title.axes.some((axis) => axis.directionFragment === fragmentId || axis.neutralFragment === fragmentId))
  const exchangeOptions = FRAGMENT_TABLE.filter((fragment) => fragment.id !== fragmentId)

  return (
    <div className="jp2__frag-detail">
      <div className="jp2__frag-hero">
        <PCFragmentIcon fragmentId={fragmentId} size={64} />
        <div>
          <span className="jp2__eyebrow">Judgment Fragment</span>
          <h3>{visual?.name ?? fragmentId}</h3>
          <span className="jp2__frag-count">보유 {count}개</span>
        </div>
      </div>

      <div className="jp2__frag-info">
        <div className="jp2__frag-section">
          <h4>사용처</h4>
          <div className="jp2__frag-usedby">
            {usedBy.map((title) => <span key={title.id}>{title.name}</span>)}
          </div>
        </div>
        <div className="jp2__frag-section">
          <h4>조각 교환</h4>
          <p>같은 조각 {EXCHANGE_RATE}개를 다른 판결 조각 1개로 바꿉니다. 특정 타이틀을 밀어야 할 때만 쓰는 보정 장치입니다.</p>
        </div>
      </div>

      <div className="jp2__exchange-flow">
        <div className="jp2__exchange-row">
          <div className="jp2__exchange-from">
            <PCFragmentIcon fragmentId={fragmentId} size={30} />
            <span>{visual?.shortLabel ?? fragmentId} {EXCHANGE_RATE}개</span>
          </div>
          <span className="jp2__exchange-arrow">→</span>
          <div className="jp2__exchange-to">
            <select value={exchangeTarget} onChange={(event) => onSetTarget(event.target.value as FragmentId)}>
              {exchangeOptions.map((fragment) => (
                <option key={fragment.id} value={fragment.id}>{FRAGMENT_VISUALS[fragment.id]?.name ?? fragment.name} 1개</option>
              ))}
            </select>
          </div>
        </div>
        <button className="jp2__action-btn" disabled={!canExchange} onClick={onExchange} type="button">
          {canExchange ? '교환 실행' : `${EXCHANGE_RATE}개 이상 필요`}
        </button>
      </div>
    </div>
  )
}

function SlotDisplay({
  label,
  title,
  level,
  onUnequip,
}: {
  label: string
  title: TitleDefinition | null
  level: number
  onUnequip: () => void
}) {
  const bonuses = title ? getTitleResourceBonuses(title, level) : {}
  const bonusText = title
    ? (Object.keys(bonuses) as Array<keyof Resources>)
      .filter((key) => bonuses[key])
      .map((key) => `${RESOURCE_LABELS[key]} +${bonuses[key]}`)
      .join(' · ')
    : '타이틀을 장착하세요'

  return (
    <div className={`jp2__slot${title ? ' is-filled' : ''}`}>
      <span className="jp2__slot-label">{label}</span>
      <div className="jp2__slot-info">
        <strong>{title ? `${title.name} Lv.${level}` : '비어 있음'}</strong>
        <p>{bonusText || getActiveEffect(title!, level)}</p>
      </div>
      {title ? <button className="jp2__slot-remove" onClick={onUnequip} type="button" aria-label={`${title.name} 장착 해제`}>×</button> : null}
    </div>
  )
}

function normalizeProgression(state: JudgeProgressionState): JudgeProgressionState {
  return {
    ...state,
    inventory: state.inventory ?? createEmptyInventory(),
    titleLevels: state.titleLevels ?? createDefaultTitleLevels(),
    titleLoadout: state.titleLoadout ?? createDefaultLoadout(),
  }
}

function firstExchangeTarget(sourceId: FragmentId): FragmentId {
  return FRAGMENT_TABLE.find((fragment) => fragment.id !== sourceId)?.id ?? 'inquiry_fragment'
}
