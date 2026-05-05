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

type ManagementTab = 'equip' | 'enhance' | 'fragments'
type SlotKey = keyof TitleLoadout
type MaterialDraft = Partial<Record<FragmentId, number>>

const RESOURCE_LABELS: Record<keyof Resources, string> = {
  investigationTokens: '조사 토큰',
  skillPoints: '스킬 포인트',
  courtControl: '법정 장악',
}

const MANAGEMENT_TABS: Array<{ id: ManagementTab; label: string; desc: string }> = [
  { id: 'equip', label: '장착', desc: '보유 타이틀을 슬롯에 배치합니다.' },
  { id: 'enhance', label: '강화', desc: '판결 조각을 넣어 타이틀 레벨을 올립니다.' },
  { id: 'fragments', label: '판결 조각', desc: '보유 조각을 확인하고 교환합니다.' },
]

export default function PCJudgeProgressionPanel({ onChange, syncKey }: Props) {
  const [state, setState] = useState<JudgeProgressionState>(() => normalizeProgression(loadProgressionState()))
  const [activeTab, setActiveTab] = useState<ManagementTab>('equip')
  const [selectedTitle, setSelectedTitle] = useState<TitleId>('cold_judge')
  const [selectedAxis, setSelectedAxis] = useState(0)
  const [selectedFragment, setSelectedFragment] = useState<FragmentId>('reasoning_fragment')
  const [exchangeOpen, setExchangeOpen] = useState(false)
  const [exchangeSource, setExchangeSource] = useState<FragmentId>('reasoning_fragment')
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

  const handleEnhanceAxis = useCallback((axisIndex: number): boolean => {
    const result = enhanceAxis(selectedTitle, axisIndex, titleLevels, inventory)
    if (!result) return false
    setSynthesizingAxis(axisIndex)
    window.setTimeout(() => setSynthesizingAxis((current) => current === axisIndex ? null : current), 620)
    commitState({
      ...state,
      titleLevels: result.titleLevels,
      inventory: result.inventory,
      lastUpdated: new Date().toISOString(),
    })
    return true
  }, [commitState, inventory, selectedTitle, state, titleLevels])

  const handleEquip = useCallback((slot: SlotKey, titleId: TitleId = selectedTitle) => {
    if (!canEquipTitle(titleId, slot, titleLevels, titleLoadout)) return
    commitState({
      ...state,
      titleLoadout: {
        ...titleLoadout,
        [slot]: titleId,
      },
      lastUpdated: new Date().toISOString(),
    })
  }, [commitState, selectedTitle, state, titleLevels, titleLoadout])

  const handleUnequip = useCallback((slot: SlotKey) => {
    commitState({
      ...state,
      titleLoadout: { ...titleLoadout, [slot]: null },
      lastUpdated: new Date().toISOString(),
    })
  }, [commitState, state, titleLoadout])

  const openExchangeModal = useCallback((sourceId: FragmentId = selectedFragment) => {
    setExchangeSource(sourceId)
    setExchangeTarget((current) => current === sourceId ? firstExchangeTarget(sourceId) : current)
    setExchangeOpen(true)
  }, [selectedFragment])

  const handleSetExchangeSource = useCallback((sourceId: FragmentId) => {
    setExchangeSource(sourceId)
    setExchangeTarget((current) => current === sourceId ? firstExchangeTarget(sourceId) : current)
  }, [])

  const handleExchange = useCallback(() => {
    const next = exchangeFragments(inventory, exchangeSource, exchangeTarget)
    if (!next) return
    commitState({ ...state, inventory: next, lastUpdated: new Date().toISOString() })
  }, [commitState, exchangeSource, exchangeTarget, inventory, state])

  const titleDef = getTitleById(selectedTitle) ?? TITLE_TABLE[0]
  const subs = titleLevels[selectedTitle]
  const totalLv = getTotalLevel(subs)
  const loadoutBonuses = useMemo(() => getLoadoutBonuses(titleLevels, titleLoadout), [titleLevels, titleLoadout])

  return (
    <div className="jp2 jp2--manager">
      <div className="jp2__summary jp2__summary--manager">
        <div>
          <span className="jp2__eyebrow">Judge Management</span>
          <h3>재판관 관리</h3>
          <p>타이틀을 강화하고 장착하면 다음 사건 시작 자원이 달라집니다.</p>
        </div>
        <div className="jp2__bonus-strip" aria-label="현재 장착 보너스">
          {(Object.keys(RESOURCE_LABELS) as Array<keyof Resources>).map((key) => (
            <span key={key} className={`jp2__bonus-pill${loadoutBonuses[key] ? ' is-active' : ''}`}>
              {RESOURCE_LABELS[key]} <b>+{loadoutBonuses[key] ?? 0}</b>
            </span>
          ))}
        </div>
      </div>

      <div className="jp2__top-tabs" role="tablist" aria-label="재판관 관리 메뉴">
        {MANAGEMENT_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`jp2__top-tab${activeTab === tab.id ? ' is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            <strong>{tab.label}</strong>
            <span>{tab.desc}</span>
          </button>
        ))}
      </div>

      {activeTab === 'equip' && (
        <EquipPanel
          titleLevels={titleLevels}
          titleLoadout={titleLoadout}
          selectedTitle={selectedTitle}
          onSelectTitle={setSelectedTitle}
          onEquip={handleEquip}
          onUnequip={handleUnequip}
          onGoEnhance={() => setActiveTab('enhance')}
        />
      )}

      {activeTab === 'enhance' && (
        <EnhancePanel
          titleDef={titleDef}
          titleLevels={titleLevels}
          titleLoadout={titleLoadout}
          selectedTitle={selectedTitle}
          selectedAxis={selectedAxis}
          synthesizingAxis={synthesizingAxis}
          inventory={inventory}
          subs={subs}
          totalLv={totalLv}
          onSelectTitle={setSelectedTitle}
          onSelectAxis={setSelectedAxis}
          onEnhanceAxis={handleEnhanceAxis}
          onEquip={handleEquip}
        />
      )}

      {activeTab === 'fragments' && (
        <FragmentsPanel
          selectedFragment={selectedFragment}
          inventory={inventory}
          onSelectFragment={setSelectedFragment}
          onOpenExchange={openExchangeModal}
        />
      )}

      {exchangeOpen && (
        <FragmentExchangeModal
          inventory={inventory}
          source={exchangeSource}
          target={exchangeTarget}
          onClose={() => setExchangeOpen(false)}
          onExchange={handleExchange}
          onSetSource={handleSetExchangeSource}
          onSetTarget={setExchangeTarget}
        />
      )}
    </div>
  )
}

function EquipPanel({
  titleLevels,
  titleLoadout,
  selectedTitle,
  onSelectTitle,
  onEquip,
  onUnequip,
  onGoEnhance,
}: {
  titleLevels: TitleLevels
  titleLoadout: TitleLoadout
  selectedTitle: TitleId
  onSelectTitle: (id: TitleId) => void
  onEquip: (slot: SlotKey, titleId?: TitleId) => void
  onUnequip: (slot: SlotKey) => void
  onGoEnhance: () => void
}) {
  const ownedTitles = TITLE_TABLE.filter((title) => getTotalLevel(titleLevels[title.id]) >= 1)
  const selectedOwned = ownedTitles.find((title) => title.id === selectedTitle) ?? ownedTitles[0] ?? getTitleById(selectedTitle) ?? TITLE_TABLE[0]
  const selectedLevel = getTotalLevel(titleLevels[selectedOwned.id])
  const selectedBonuses = getTitleResourceBonuses(selectedOwned, selectedLevel)
  const selectedEquipped = titleLoadout.slot1 === selectedOwned.id || titleLoadout.slot2 === selectedOwned.id

  return (
    <div className="jp2__equip-layout">
      <section className="jp2__equip-slots" aria-label="장착 슬롯">
        <SlotDisplay
          label="슬롯 1"
          title={titleLoadout.slot1 ? getTitleById(titleLoadout.slot1) ?? null : null}
          level={titleLoadout.slot1 ? getTotalLevel(titleLevels[titleLoadout.slot1]) : 0}
          onUnequip={() => onUnequip('slot1')}
        />
        <SlotDisplay
          label="슬롯 2"
          title={titleLoadout.slot2 ? getTitleById(titleLoadout.slot2) ?? null : null}
          level={titleLoadout.slot2 ? getTotalLevel(titleLevels[titleLoadout.slot2]) : 0}
          onUnequip={() => onUnequip('slot2')}
        />
      </section>

      <section className="jp2__owned-list" aria-label="보유 타이틀">
        <div className="jp2__section-head">
          <span className="jp2__eyebrow">Owned Titles</span>
          <h4>보유 타이틀</h4>
        </div>
        {ownedTitles.length > 0 ? (
          <div className="jp2__owned-grid">
            {ownedTitles.map((title) => {
              const level = getTotalLevel(titleLevels[title.id])
              const equipped = titleLoadout.slot1 === title.id || titleLoadout.slot2 === title.id
              return (
                <button
                  key={title.id}
                  className={`jp2__owned-title${selectedOwned.id === title.id ? ' is-active' : ''}${equipped ? ' is-equipped' : ''}`}
                  onClick={() => onSelectTitle(title.id)}
                  type="button"
                >
                  <span>{equipped ? '장착 중' : '보유'}</span>
                  <strong>{title.name}</strong>
                  <b>Lv.{level}</b>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="jp2__empty-state">
            <strong>아직 보유한 타이틀이 없습니다.</strong>
            <p>강화 탭에서 원하는 타이틀을 Lv.1 이상으로 올리면 장착할 수 있습니다.</p>
            <button className="jp2__action-btn" onClick={onGoEnhance} type="button">강화하러 가기</button>
          </div>
        )}
      </section>

      <section className="jp2__selected-panel">
        <span className="jp2__eyebrow">Selected Title</span>
        <h3>{selectedOwned.name} <span>Lv.{selectedLevel}</span></h3>
        <p>{selectedOwned.subtitle}</p>
        <div className="jp2__axis-mini">
          {selectedOwned.axes.map((axis, index) => (
            <span key={`${selectedOwned.id}-${axis.label}`}>{axis.label} Lv.{titleLevels[selectedOwned.id][index]}</span>
          ))}
        </div>
        <div className="jp2__bonus-strip jp2__bonus-strip--left">
          {(Object.keys(RESOURCE_LABELS) as Array<keyof Resources>).map((key) => (
            <span key={key} className={`jp2__bonus-pill${selectedBonuses[key] ? ' is-active' : ''}`}>
              {RESOURCE_LABELS[key]} <b>+{selectedBonuses[key] ?? 0}</b>
            </span>
          ))}
        </div>
        <div className="jp2__effect-preview">
          <strong>현재 효과</strong>
          <p>{getActiveEffect(selectedOwned, selectedLevel) || 'Lv.1부터 장착 효과가 열립니다.'}</p>
        </div>
        <div className="jp2__equip-btns">
          {selectedEquipped ? <span className="jp2__equipped-badge">현재 슬롯에 장착 중</span> : null}
          <button className="jp2__action-btn" disabled={!canEquipTitle(selectedOwned.id, 'slot1', titleLevels, titleLoadout)} onClick={() => onEquip('slot1', selectedOwned.id)} type="button">슬롯 1 장착</button>
          <button className="jp2__action-btn" disabled={!canEquipTitle(selectedOwned.id, 'slot2', titleLevels, titleLoadout)} onClick={() => onEquip('slot2', selectedOwned.id)} type="button">슬롯 2 장착</button>
          <button className="jp2__action-btn is-ghost" onClick={onGoEnhance} type="button">강화하기</button>
        </div>
      </section>
    </div>
  )
}

function EnhancePanel({
  titleDef,
  titleLevels,
  titleLoadout,
  selectedTitle,
  selectedAxis,
  synthesizingAxis,
  inventory,
  subs,
  totalLv,
  onSelectTitle,
  onSelectAxis,
  onEnhanceAxis,
  onEquip,
}: {
  titleDef: TitleDefinition
  titleLevels: TitleLevels
  titleLoadout: TitleLoadout
  selectedTitle: TitleId
  selectedAxis: number
  synthesizingAxis: number | null
  inventory: FragmentInventory
  subs: [number, number, number]
  totalLv: number
  onSelectTitle: (id: TitleId) => void
  onSelectAxis: (i: number) => void
  onEnhanceAxis: (i: number) => boolean
  onEquip: (slot: SlotKey, titleId?: TitleId) => void
}) {
  const [materialDraft, setMaterialDraft] = useState<MaterialDraft>({})
  const selectedAxisSafe = Math.max(0, Math.min(2, selectedAxis))
  const axis = titleDef.axes[selectedAxisSafe]
  const subLv = subs[selectedAxisSafe]
  const cost = getSubLevelCost(subLv)
  const costItems = cost ? getAxisCostItems(axis, cost) : []
  const nextLevel = Math.min(MAX_SUB_LEVEL, subLv + 1)
  const canSystemEnhance = canEnhanceAxis(selectedTitle, selectedAxisSafe, titleLevels, inventory)
  const materialsComplete = costItems.length > 0 && costItems.every((item) => (materialDraft[item.fragmentId] ?? 0) >= item.amount)
  const canEnhance = Boolean(cost) && canSystemEnhance && materialsComplete
  const currentEffect = getActiveEffect(titleDef, totalLv)
  const nextEffect = getActiveEffect(titleDef, totalLv + 1)
  const currentBonuses = getTitleResourceBonuses(titleDef, totalLv)
  const nextBonuses = getTitleResourceBonuses(titleDef, totalLv + 1)
  const activeNotes = getActiveTitleGameplayNotes(titleDef, totalLv)
  const nextUnlock = getNextUnlock(titleDef, totalLv)
  const isEquipped = titleLoadout.slot1 === selectedTitle || titleLoadout.slot2 === selectedTitle

  useEffect(() => {
    setMaterialDraft({})
  }, [selectedTitle, selectedAxisSafe, subLv])

  const updateMaterial = (fragmentId: FragmentId, nextValue: number, maxValue: number) => {
    setMaterialDraft((current) => ({
      ...current,
      [fragmentId]: Math.max(0, Math.min(maxValue, nextValue)),
    }))
  }

  const fillMax = () => {
    const next: MaterialDraft = {}
    for (const item of costItems) {
      next[item.fragmentId] = Math.min(item.amount, inventory[item.fragmentId])
    }
    setMaterialDraft(next)
  }

  const clearMaterials = () => setMaterialDraft({})

  const executeEnhance = () => {
    if (!canEnhance) return
    if (onEnhanceAxis(selectedAxisSafe)) setMaterialDraft({})
  }

  return (
    <div className="jp2__enhance-layout">
      <section className={`jp2__forge-panel jp2__forge-panel--focused${synthesizingAxis === selectedAxisSafe ? ' is-synthesizing' : ''}`}>
        <div className="jp2__forge-title">
          <span>{axis.label} 강화</span>
          <b>{subLv >= MAX_SUB_LEVEL ? '최대 강화' : `Lv.${subLv} → Lv.${nextLevel}`}</b>
        </div>

        <div className="jp2__axis-tabs" role="tablist" aria-label="강화 항목 선택">
          {titleDef.axes.map((item, index) => (
            <button
              key={item.label}
              className={`jp2__axis-tab${selectedAxisSafe === index ? ' is-active' : ''}`}
              onClick={() => onSelectAxis(index)}
              type="button"
            >
              <span>{item.label}</span>
              <b>{subs[index] >= MAX_SUB_LEVEL ? 'MAX' : `Lv.${subs[index]}`}</b>
            </button>
          ))}
        </div>

        <div className="jp2__material-board">
          {costItems.length > 0 ? costItems.map((item) => {
            const owned = inventory[item.fragmentId]
            const placed = materialDraft[item.fragmentId] ?? 0
            const maxFill = Math.min(item.amount, owned)
            return (
              <MaterialSlot
                key={item.fragmentId}
                fragmentId={item.fragmentId}
                required={item.amount}
                owned={owned}
                placed={placed}
                onChange={(next) => updateMaterial(item.fragmentId, next, maxFill)}
                onMax={() => updateMaterial(item.fragmentId, maxFill, maxFill)}
              />
            )
          }) : (
            <div className="jp2__forge-max">이 항목은 이미 최대 레벨입니다.</div>
          )}
        </div>

        <div className="jp2__forge-command-row">
          <button className="jp2__action-btn is-ghost" disabled={costItems.length === 0} onClick={clearMaterials} type="button">비우기</button>
          <button className="jp2__action-btn" disabled={costItems.length === 0} onClick={fillMax} type="button">Max</button>
          <button className="jp2__forge-button" disabled={!canEnhance} onClick={executeEnhance} type="button">강화</button>
        </div>

        <p className="jp2__forge-hint">
          각 재료 슬롯을 필요한 수량까지 채우면 강화 버튼이 활성화됩니다. 강화가 완료되면 해당 항목 레벨과 타이틀 총 레벨이 함께 올라갑니다.
        </p>
      </section>

      <aside className="jp2__enhance-info">
        <label className="jp2__title-select">
          <span>타이틀 선택</span>
          <select value={selectedTitle} onChange={(event) => { onSelectTitle(event.target.value as TitleId); onSelectAxis(0) }}>
            {TITLE_TABLE.map((title) => (
              <option key={title.id} value={title.id}>{title.name} · Lv.{getTotalLevel(titleLevels[title.id])}</option>
            ))}
          </select>
        </label>

        <div className="jp2__selected-panel jp2__selected-panel--compact">
          <span className="jp2__eyebrow">Title Detail</span>
          <h3>{titleDef.name} <span>Lv.{totalLv}</span></h3>
          <p>{titleDef.subtitle}</p>
          <div className="jp2__axis-mini">
            {titleDef.axes.map((item, index) => <span key={item.label}>{item.label} Lv.{subs[index]}</span>)}
          </div>
          <div className="jp2__effect-preview">
            <strong>강화 후 변화</strong>
            <p>{nextEffect && nextEffect !== currentEffect ? nextEffect : nextUnlock ? `총 레벨이 오릅니다. 다음 효과는 Lv.${nextUnlock.level}에서 열립니다.` : '최대 단계에 가까워졌습니다.'}</p>
          </div>
          <div className="jp2__bonus-compare">
            {(Object.keys(RESOURCE_LABELS) as Array<keyof Resources>).map((key) => (
              <span key={key}>
                {RESOURCE_LABELS[key]}
                <b>{currentBonuses[key] ?? 0} → {nextBonuses[key] ?? 0}</b>
              </span>
            ))}
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
            <h4>현재 적용 가능 효과</h4>
            {activeNotes.length > 0 ? <p>{activeNotes.join(' · ')}</p> : <p>Lv.1부터 시작 보너스가 열립니다.</p>}
          </div>
          <div className="jp2__equip-btns">
            {isEquipped ? <span className="jp2__equipped-badge">장착 중</span> : null}
            <button className="jp2__action-btn" disabled={!canEquipTitle(selectedTitle, 'slot1', titleLevels, titleLoadout)} onClick={() => onEquip('slot1', selectedTitle)} type="button">슬롯 1 장착</button>
            <button className="jp2__action-btn" disabled={!canEquipTitle(selectedTitle, 'slot2', titleLevels, titleLoadout)} onClick={() => onEquip('slot2', selectedTitle)} type="button">슬롯 2 장착</button>
          </div>
        </div>
      </aside>
    </div>
  )
}

function MaterialSlot({
  fragmentId,
  required,
  owned,
  placed,
  onChange,
  onMax,
}: {
  fragmentId: FragmentId
  required: number
  owned: number
  placed: number
  onChange: (next: number) => void
  onMax: () => void
}) {
  const visual = FRAGMENT_VISUALS[fragmentId]
  const filled = placed >= required
  return (
    <div className={`jp2__material-slot${filled ? ' is-filled' : ''}${owned < required ? ' is-short' : ''}`}>
      <div className="jp2__material-main">
        <PCFragmentIcon fragmentId={fragmentId} size={44} />
        <div>
          <strong>{visual?.name ?? fragmentId}</strong>
          <span>보유 {owned}개</span>
        </div>
      </div>
      <div className="jp2__material-controls">
        <button onClick={() => onChange(placed - 1)} type="button" aria-label={`${visual?.name ?? fragmentId} 1개 빼기`}>−</button>
        <b>{placed}/{required}</b>
        <button onClick={() => onChange(placed + 1)} type="button" aria-label={`${visual?.name ?? fragmentId} 1개 넣기`}>+</button>
        <button className="jp2__material-max" onClick={onMax} type="button">Max</button>
      </div>
    </div>
  )
}

function FragmentsPanel({
  selectedFragment,
  inventory,
  onSelectFragment,
  onOpenExchange,
}: {
  selectedFragment: FragmentId
  inventory: FragmentInventory
  onSelectFragment: (id: FragmentId) => void
  onOpenExchange: (id?: FragmentId) => void
}) {
  const visual = FRAGMENT_VISUALS[selectedFragment]
  const count = inventory[selectedFragment]
  const usedBy = TITLE_TABLE.filter((title) => title.axes.some((axis) => axis.directionFragment === selectedFragment || axis.neutralFragment === selectedFragment))

  return (
    <div className="jp2__fragment-layout">
      <section className="jp2__frag-detail">
        <div className="jp2__frag-hero">
          <PCFragmentIcon fragmentId={selectedFragment} size={64} />
          <div>
            <span className="jp2__eyebrow">Judgment Fragment</span>
            <h3>{visual?.name ?? selectedFragment}</h3>
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
            <p>같은 조각 {EXCHANGE_RATE}개를 다른 판결 조각 1개로 교환할 수 있습니다.</p>
          </div>
        </div>
        <button className="jp2__action-btn" disabled={!canExchangeFragments(inventory, selectedFragment)} onClick={() => onOpenExchange(selectedFragment)} type="button">
          {canExchangeFragments(inventory, selectedFragment) ? '조각 교환' : `${EXCHANGE_RATE}개 이상 필요`}
        </button>
      </section>

      <section className="jp2__fragment-board" aria-label="판결 조각 보유 현황">
        {FRAGMENT_TABLE.map((fragment) => {
          const active = selectedFragment === fragment.id
          const count = inventory[fragment.id]
          const fragmentVisual = FRAGMENT_VISUALS[fragment.id]
          return (
            <button
              key={fragment.id}
              className={`jp2__fragment-card${active ? ' is-active' : ''}`}
              onClick={() => onSelectFragment(fragment.id)}
              type="button"
            >
              <PCFragmentIcon fragmentId={fragment.id} size={34} />
              <strong>{fragmentVisual?.name ?? fragment.name}</strong>
              <span>{count}개</span>
            </button>
          )
        })}
      </section>
    </div>
  )
}

function FragmentExchangeModal({
  inventory,
  source,
  target,
  onClose,
  onExchange,
  onSetSource,
  onSetTarget,
}: {
  inventory: FragmentInventory
  source: FragmentId
  target: FragmentId
  onClose: () => void
  onExchange: () => void
  onSetSource: (id: FragmentId) => void
  onSetTarget: (id: FragmentId) => void
}) {
  const targetOptions = FRAGMENT_TABLE.filter((fragment) => fragment.id !== source)
  const sourceVisual = FRAGMENT_VISUALS[source]
  const targetVisual = FRAGMENT_VISUALS[target]
  const canExchange = source !== target && canExchangeFragments(inventory, source)

  return (
    <div className="jp2__modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="jp2__exchange-modal" role="dialog" aria-modal="true" aria-labelledby="fragment-exchange-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="jp2__modal-close" onClick={onClose} type="button" aria-label="닫기">×</button>
        <div className="jp2__section-head">
          <span className="jp2__eyebrow">Fragment Exchange</span>
          <h3 id="fragment-exchange-title">조각 교환</h3>
        </div>
        <div className="jp2__exchange-selects">
          <label>
            <span>교환 재료</span>
            <select value={source} onChange={(event) => onSetSource(event.target.value as FragmentId)}>
              {FRAGMENT_TABLE.map((fragment) => (
                <option key={fragment.id} value={fragment.id}>
                  {FRAGMENT_VISUALS[fragment.id]?.name ?? fragment.name} · 보유 {inventory[fragment.id]}개
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>교환 대상</span>
            <select value={target} onChange={(event) => onSetTarget(event.target.value as FragmentId)}>
              {targetOptions.map((fragment) => (
                <option key={fragment.id} value={fragment.id}>{FRAGMENT_VISUALS[fragment.id]?.name ?? fragment.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="jp2__exchange-preview">
          <div>
            <PCFragmentIcon fragmentId={source} size={48} />
            <strong>{sourceVisual?.name ?? source}</strong>
            <span>{EXCHANGE_RATE}개 사용</span>
          </div>
          <b>→</b>
          <div>
            <PCFragmentIcon fragmentId={target} size={48} />
            <strong>{targetVisual?.name ?? target}</strong>
            <span>1개 획득</span>
          </div>
        </div>
        <p className="jp2__exchange-rate">현재 보유: {inventory[source]}개 · 교환 비율 {EXCHANGE_RATE}:1</p>
        <div className="jp2__exchange-actions">
          <button className="jp2__action-btn is-ghost" onClick={onClose} type="button">취소</button>
          <button className="jp2__action-btn" disabled={!canExchange} onClick={onExchange} type="button">
            {canExchange ? '교환 실행' : `${EXCHANGE_RATE}개 이상 필요`}
          </button>
        </div>
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
      {title ? <button className="jp2__slot-remove" onClick={onUnequip} type="button" aria-label={`${title.name} 장착 해제`}>해제</button> : null}
    </div>
  )
}

function getLoadoutBonuses(titleLevels: TitleLevels, titleLoadout: TitleLoadout): Partial<Resources> {
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
}

function getNextUnlock(titleDef: TitleDefinition, totalLevel: number): { level: number; effect: string } | null {
  return Object.entries(titleDef.effects)
    .map(([level, effect]) => ({ level: Number(level), effect }))
    .filter((item) => item.level > totalLevel)
    .sort((a, b) => a.level - b.level)[0] ?? null
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
