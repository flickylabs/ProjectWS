import { useCallback, useEffect, useState } from 'react'
import { loadProgressionState, saveProgressionState } from '../../../data/leaderboard'
import {
  FRAGMENT_TABLE,
  createEmptyInventory,
  type FragmentId,
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
  canExchangeFragments,
  exchangeFragments,
  EXCHANGE_RATE,
  createDefaultTitleLevels,
  createDefaultLoadout,
  getTitleById,
  type TitleId,
} from '../../../engine/judgeTitleEngine'
import {
  FRAGMENT_VISUALS,
  PCFragmentIcon,
} from '../progression/PCJudgeProgressionShared'

interface Props {
  onChange?: (nextState: JudgeProgressionState) => void
  syncKey?: number
}

type RightTab = 'titles' | 'fragments'

export default function PCJudgeProgressionPanel({ onChange, syncKey }: Props) {
  const [state, setState] = useState<JudgeProgressionState>(() => loadProgressionState())
  const [rightTab, setRightTab] = useState<RightTab>('titles')
  const [selectedTitle, setSelectedTitle] = useState<TitleId>('cold_judge')
  const [selectedFragment, setSelectedFragment] = useState<FragmentId>('reasoning_fragment')
  const [exchangeTarget, setExchangeTarget] = useState<FragmentId | null>(null)
  const [showExchangeConfirm, setShowExchangeConfirm] = useState(false)

  useEffect(() => { setState(loadProgressionState()) }, [syncKey])

  const titleLevels = state.titleLevels ?? createDefaultTitleLevels()
  const titleLoadout = state.titleLoadout ?? createDefaultLoadout()
  const inventory = state.inventory ?? createEmptyInventory()

  const commitState = useCallback((next: JudgeProgressionState) => {
    saveProgressionState(next)
    setState(next)
    onChange?.(next)
  }, [onChange])

  // ── 타이틀 강화 ──
  const handleEnhanceAxis = (axisIndex: number) => {
    if (!confirm('이 축을 강화하시겠습니까? 조각이 소비됩니다.')) return
    const result = enhanceAxis(selectedTitle, axisIndex, titleLevels, inventory)
    if (!result) return
    commitState({ ...state, titleLevels: result.titleLevels, inventory: result.inventory, lastUpdated: new Date().toISOString() })
  }

  // ── 타이틀 장착 ──
  const handleEquip = (slot: 'slot1' | 'slot2') => {
    if (!canEquipTitle(selectedTitle, slot, titleLevels, titleLoadout)) return
    commitState({
      ...state,
      titleLoadout: { ...titleLoadout, [slot]: titleLoadout[slot] === selectedTitle ? null : selectedTitle },
      lastUpdated: new Date().toISOString(),
    })
  }

  const handleUnequip = (slot: 'slot1' | 'slot2') => {
    commitState({ ...state, titleLoadout: { ...titleLoadout, [slot]: null }, lastUpdated: new Date().toISOString() })
  }

  // ── 조각 교환 ──
  const handleExchange = () => {
    if (!exchangeTarget) return
    const next = exchangeFragments(inventory, selectedFragment, exchangeTarget)
    if (!next) return
    commitState({ ...state, inventory: next, lastUpdated: new Date().toISOString() })
    setShowExchangeConfirm(false)
    setExchangeTarget(null)
  }

  const titleDef = getTitleById(selectedTitle)!
  const subs = titleLevels[selectedTitle]
  const totalLv = getTotalLevel(subs)
  const activeEffect = getActiveEffect(titleDef, totalLv)
  const isEquipped = titleLoadout.slot1 === selectedTitle || titleLoadout.slot2 === selectedTitle

  // 슬롯 데이터
  const slot1Def = titleLoadout.slot1 ? getTitleById(titleLoadout.slot1) : null
  const slot2Def = titleLoadout.slot2 ? getTitleById(titleLoadout.slot2) : null

  return (
    <div className="jp2">
      {/* ── 상단: 장착 슬롯 ── */}
      <div className="jp2__slots">
        <SlotDisplay label="SLOT 1" title={slot1Def ?? null} level={titleLoadout.slot1 ? getTotalLevel(titleLevels[titleLoadout.slot1]) : 0} onUnequip={() => handleUnequip('slot1')} />
        <SlotDisplay label="SLOT 2" title={slot2Def ?? null} level={titleLoadout.slot2 ? getTotalLevel(titleLevels[titleLoadout.slot2]) : 0} onUnequip={() => handleUnequip('slot2')} />
      </div>

      {/* ── 좌우 분할 ── */}
      <div className="jp2__split">

        {/* 좌: 상세 패널 */}
        <div className="jp2__left">
          {rightTab === 'titles' ? (
            <TitleDetailPanel
              titleDef={titleDef}
              subs={subs}
              totalLv={totalLv}
              activeEffect={activeEffect}
              inventory={inventory}
              titleLevels={titleLevels}
              titleLoadout={titleLoadout}
              isEquipped={isEquipped}
              selectedTitle={selectedTitle}
              onEnhanceAxis={handleEnhanceAxis}
              onEquip={handleEquip}
            />
          ) : (
            <FragmentDetailPanel
              fragmentId={selectedFragment}
              inventory={inventory}
              exchangeTarget={exchangeTarget}
              showConfirm={showExchangeConfirm}
              onSetTarget={setExchangeTarget}
              onShowConfirm={setShowExchangeConfirm}
              onExchange={handleExchange}
            />
          )}
        </div>

        {/* 우: 선택 패널 */}
        <div className="jp2__right">
          <div className="jp2__toggle">
            <button className={`jp2__toggle-btn${rightTab === 'titles' ? ' is-active' : ''}`} onClick={() => setRightTab('titles')} type="button">재판관 타이틀</button>
            <button className={`jp2__toggle-btn${rightTab === 'fragments' ? ' is-active' : ''}`} onClick={() => setRightTab('fragments')} type="button">판결 조각</button>
          </div>

          {rightTab === 'titles' ? (
            <div className="jp2__grid">
              {TITLE_TABLE.map(t => {
                const lv = getTotalLevel(titleLevels[t.id])
                const active = selectedTitle === t.id
                return (
                  <button key={t.id} className={`jp2__card${active ? ' is-active' : ''}`} onClick={() => setSelectedTitle(t.id)} type="button">
                    <strong>{t.name}</strong>
                    <span className="jp2__card-lv">{lv > 0 ? `Lv.${lv}` : '—'}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="jp2__grid">
              {FRAGMENT_TABLE.map(f => {
                const active = selectedFragment === f.id
                const count = inventory[f.id]
                const vis = FRAGMENT_VISUALS[f.id]
                return (
                  <button key={f.id} className={`jp2__card${active ? ' is-active' : ''}`} onClick={() => setSelectedFragment(f.id)} type="button">
                    <PCFragmentIcon fragmentId={f.id} size={28} />
                    <strong>{vis?.name ?? f.name}</strong>
                    <span className="jp2__card-count">×{count}</span>
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

// ── 타이틀 상세 패널 ──

function TitleDetailPanel({ titleDef, subs, totalLv, activeEffect, inventory, titleLevels, titleLoadout, isEquipped, selectedTitle, onEnhanceAxis, onEquip }: {
  titleDef: NonNullable<ReturnType<typeof getTitleById>>
  subs: [number, number, number]
  totalLv: number
  activeEffect: string
  inventory: Record<FragmentId, number>
  titleLevels: ReturnType<typeof createDefaultTitleLevels>
  titleLoadout: ReturnType<typeof createDefaultLoadout>
  isEquipped: boolean
  selectedTitle: TitleId
  onEnhanceAxis: (i: number) => void
  onEquip: (slot: 'slot1' | 'slot2') => void
}) {
  return (
    <div className="jp2__detail">
      <div className="jp2__detail-head">
        <div>
          <div className="jp2__detail-tags">
            {titleDef.axes.map(a => <span key={a.label} className="jp2__tag">{a.label}</span>)}
          </div>
          <h3>{titleDef.name} <span className="jp2__detail-lv">Lv.{totalLv}</span></h3>
          {activeEffect && <p className="jp2__detail-effect">+ {activeEffect}</p>}
        </div>
      </div>

      <div className="jp2__axes">
        {titleDef.axes.map((axis, i) => {
          const subLv = subs[i]
          const cost = getSubLevelCost(subLv)
          const canUp = canEnhanceAxis(selectedTitle, i, titleLevels, inventory)
          const costItems = cost
            ? [
                { fragmentId: axis.directionFragment, amount: cost.direction },
                { fragmentId: axis.neutralFragment, amount: cost.neutral },
              ].reduce<Array<{ fragmentId: FragmentId; amount: number }>>((items, item) => {
                const existing = items.find((costItem) => costItem.fragmentId === item.fragmentId)
                if (existing) existing.amount += item.amount
                else items.push({ ...item })
                return items
              }, [])
            : []

          return (
            <div className="jp2__axis" key={axis.label}>
              <div className="jp2__axis-head">
                <strong>{axis.label}</strong>
                <span className="jp2__axis-lv">{subLv >= MAX_SUB_LEVEL ? 'MAX' : `Lv.${subLv}`}</span>
              </div>
              {cost ? (
                <div className="jp2__axis-cost">
                  {costItems.map((item) => {
                    const visual = FRAGMENT_VISUALS[item.fragmentId]
                    const owned = inventory[item.fragmentId]
                    return (
                      <span key={item.fragmentId}>
                        {visual?.name ?? item.fragmentId} ×{item.amount}{' '}
                        <b className={owned >= item.amount ? 'ok' : 'no'}>({owned})</b>
                      </span>
                    )
                  })}
                </div>
              ) : (
                <div className="jp2__axis-cost"><span className="jp2__axis-max">최대 레벨</span></div>
              )}
              {cost && canUp && (
                <button className="jp2__axis-btn" onClick={() => onEnhanceAxis(i)} type="button">강화</button>
              )}
            </div>
          )
        })}
      </div>

      <div className="jp2__detail-effects">
        <h4>레벨별 효과</h4>
        {Object.entries(titleDef.effects).map(([lv, desc]) => (
          <div key={lv} className={`jp2__effect-row${totalLv >= Number(lv) ? ' is-active' : ''}`}>
            <span>Lv.{lv}</span>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      <div className="jp2__detail-actions">
        {isEquipped ? (
          <span className="jp2__equipped-badge">착용 중</span>
        ) : totalLv >= 1 ? (
          <div className="jp2__equip-btns">
            <button className="jp2__action-btn" disabled={!canEquipTitle(selectedTitle, 'slot1', titleLevels, titleLoadout)} onClick={() => onEquip('slot1')} type="button">Slot 1 착용</button>
            <button className="jp2__action-btn" disabled={!canEquipTitle(selectedTitle, 'slot2', titleLevels, titleLoadout)} onClick={() => onEquip('slot2')} type="button">Slot 2 착용</button>
          </div>
        ) : (
          <span className="jp2__lock-hint">Lv.1 이상에서 착용 가능</span>
        )}
      </div>
    </div>
  )
}

// ── 조각 상세 패널 ──

function FragmentDetailPanel({ fragmentId, inventory, exchangeTarget, showConfirm, onSetTarget, onShowConfirm, onExchange }: {
  fragmentId: FragmentId
  inventory: Record<FragmentId, number>
  exchangeTarget: FragmentId | null
  showConfirm: boolean
  onSetTarget: (id: FragmentId | null) => void
  onShowConfirm: (v: boolean) => void
  onExchange: () => void
}) {
  const vis = FRAGMENT_VISUALS[fragmentId]
  const fragDef = FRAGMENT_TABLE.find(f => f.id === fragmentId)
  const count = inventory[fragmentId]
  const canExchange = canExchangeFragments(inventory, fragmentId)

  // 이 조각을 사용하는 타이틀 목록
  const usedBy = TITLE_TABLE.filter(t => t.axes.some(a => a.directionFragment === fragmentId || a.neutralFragment === fragmentId))

  // 교환 대상 목록 (자기 자신 제외)
  const exchangeOptions = FRAGMENT_TABLE.filter(f => f.id !== fragmentId)

  return (
    <div className="jp2__frag-detail">
      <div className="jp2__frag-hero">
        <PCFragmentIcon fragmentId={fragmentId} size={64} />
        <div>
          <h3>{vis?.name ?? fragmentId}</h3>
          <span className="jp2__frag-count">보유 ×{count}</span>
        </div>
      </div>

      <div className="jp2__frag-info">
        <div className="jp2__frag-section">
          <h4>얻는 방법</h4>
          <p>{fragDef?.direction === 'neutral'
            ? '균형 잡힌 플레이 시 획득. 축 값이 중립에 가까울수록 많이 획득합니다.'
            : `${fragDef?.direction === 'negative' ? '논리적/엄격한/원칙적' : '공감적/관대한/화해적'} 플레이 시 획득. 해당 축 성향이 강할수록 많이 획득합니다.`
          }</p>
        </div>
        <div className="jp2__frag-section">
          <h4>사용처</h4>
          <div className="jp2__frag-usedby">
            {usedBy.map(t => <span key={t.id}>{t.name}</span>)}
          </div>
        </div>
      </div>

      <div className="jp2__frag-exchange">
        <h4>교환하기</h4>
        {!showConfirm ? (
          <button className="jp2__action-btn" disabled={!canExchange} onClick={() => { onSetTarget(exchangeOptions[0]?.id ?? null); onShowConfirm(true) }} type="button">
            {canExchange ? '교환하기' : `${EXCHANGE_RATE}개 이상 필요`}
          </button>
        ) : (
          <div className="jp2__exchange-flow">
            <div className="jp2__exchange-row">
              <div className="jp2__exchange-from">
                <PCFragmentIcon fragmentId={fragmentId} size={28} />
                <span>{vis?.name} ×{EXCHANGE_RATE}</span>
              </div>
              <span className="jp2__exchange-arrow">→</span>
              <div className="jp2__exchange-to">
                <select value={exchangeTarget ?? ''} onChange={e => onSetTarget(e.target.value as FragmentId)}>
                  {exchangeOptions.map(f => (
                    <option key={f.id} value={f.id}>{FRAGMENT_VISUALS[f.id]?.name ?? f.name} ×1</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="jp2__exchange-rate">교환비: {EXCHANGE_RATE}:1</p>
            <div className="jp2__exchange-actions">
              <button className="jp2__action-btn is-confirm" onClick={() => { if (confirm(`${vis?.name} ${EXCHANGE_RATE}개를 교환하시겠습니까?`)) onExchange() }} type="button">확인</button>
              <button className="jp2__action-btn is-cancel" onClick={() => { onShowConfirm(false); onSetTarget(null) }} type="button">취소</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── 슬롯 표시 ──

function SlotDisplay({ label, title, level, onUnequip }: {
  label: string; title: ReturnType<typeof getTitleById> | null; level: number; onUnequip: () => void
}) {
  return (
    <div className={`jp2__slot${title ? ' is-filled' : ''}`}>
      <span className="jp2__slot-label">{label}</span>
      <div className="jp2__slot-info">
        <strong>{title ? `${title.name} Lv.${level}` : '비어 있음'}</strong>
        <p>{title ? getActiveEffect(title, level) : '타이틀을 착용하세요'}</p>
      </div>
      {title && <button className="jp2__slot-remove" onClick={onUnequip} type="button">✕</button>}
    </div>
  )
}
