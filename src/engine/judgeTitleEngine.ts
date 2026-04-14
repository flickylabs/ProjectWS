/**
 * judgeTitleEngine.ts — 재판관 타이틀 시스템 v5
 *
 * 9종 타이틀 × 3축 서브레벨(각 0~5) = 합산 최대 15Lv
 * 각 축 강화에 방향 조각 + 중립 조각 소비
 */

import { FRAGMENT_TABLE, type FragmentId, type FragmentInventory } from './judgeProgressionEngine'

// ── 타이틀 ID ──

export type TitleId =
  | 'cold_judge' | 'practical_analyst' | 'careful_mediator' | 'balanced_sage'
  | 'instinct_judge' | 'passion_arbiter' | 'gentle_guardian' | 'warm_mediator'
  | 'neutral_observer'

// ── 축 서브레벨 ──

export interface TitleAxisLevel {
  label: string               // 표시명 (예: 논리, 엄격, 원칙)
  directionFragment: FragmentId
  neutralFragment: FragmentId
  level: number               // 0~5
}

export type TitleSubLevels = [TitleAxisLevel, TitleAxisLevel, TitleAxisLevel]

// ── 타이틀 정의 ──

export interface TitleDefinition {
  id: TitleId
  name: string
  subtitle: string
  /** 3축 조각 정의 */
  axes: Array<{
    label: string
    directionFragment: FragmentId
    neutralFragment: FragmentId
  }>
  /** 합산 레벨별 효과 */
  effects: Record<number, string>
}

export const TITLE_TABLE: readonly TitleDefinition[] = [
  {
    id: 'cold_judge', name: '냉철한 심판자', subtitle: '법도의 추적자',
    axes: [
      { label: '논리', directionFragment: 'reasoning_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '엄격', directionFragment: 'severity_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '원칙', directionFragment: 'jurisprudence_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: { 1: '모순 토큰 +1', 3: '모순 감지 시 쟁점 하이라이트', 6: '모순 토큰 +2', 9: '모순 쿨다운 -1턴', 12: '첫 모순 추궁 효과 2배', 15: '모순 감지 자동 표시 + 토큰 +3' },
  },
  {
    id: 'practical_analyst', name: '실용적 분석가', subtitle: '해결의 설계자',
    axes: [
      { label: '논리', directionFragment: 'reasoning_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '엄격', directionFragment: 'severity_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '화해', directionFragment: 'reconciliation_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: { 1: '증거 조합 힌트 표시', 3: '조합 성공 시 추가 정보', 6: '증거 조사 비용 1 할인', 9: '미발견 조합 알림', 12: '조사 비용 2 할인', 15: '첫 조합 자동 발견' },
  },
  {
    id: 'careful_mediator', name: '신중한 중재자', subtitle: '신뢰의 설계자',
    axes: [
      { label: '논리', directionFragment: 'reasoning_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '관용', directionFragment: 'leniency_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '원칙', directionFragment: 'jurisprudence_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: { 1: '증인 depth +1', 3: '증인 실패 토큰 환불', 6: '증인 full depth 추가 정보', 9: '증인 소환 비용 1 할인', 12: '증인 depth 항상 +1', 15: '첫 증인 무료' },
  },
  {
    id: 'balanced_sage', name: '균형의 현자', subtitle: '공정의 수호자',
    axes: [
      { label: '논리', directionFragment: 'reasoning_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '관용', directionFragment: 'leniency_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '화해', directionFragment: 'reconciliation_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: { 1: '양측 교차 힌트', 3: 'Wisdom 기본 +3', 6: '양측 S3+ 보너스 조각', 9: '중재 효과 +2', 12: 'Wisdom +8', 15: '양측 동시 심문 가능' },
  },
  {
    id: 'instinct_judge', name: '직감의 심판관', subtitle: '본능의 추적자',
    axes: [
      { label: '직관', directionFragment: 'empathy_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '엄격', directionFragment: 'severity_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '원칙', directionFragment: 'jurisprudence_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: { 1: '누설미터 +5', 3: '숨겨진 쟁점 발견 확률 증가', 6: '동기탐색 연속 추가 전이', 9: '누설미터 40%+ 자동 힌트', 12: '누설미터 +10', 15: '숨겨진 쟁점 첫 턴 자동 힌트' },
  },
  {
    id: 'passion_arbiter', name: '열정의 조정관', subtitle: '정의의 불꽃',
    axes: [
      { label: '직관', directionFragment: 'empathy_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '엄격', directionFragment: 'severity_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '화해', directionFragment: 'reconciliation_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: { 1: '감정 폭발 선택지 확장', 3: '끼어들기 추가 정보', 6: '격앙 시 사실추궁 +50%', 9: '감정 이벤트 빈도 증가', 12: '사실추궁 2배', 15: '감정 폭발 자동 전이' },
  },
  {
    id: 'gentle_guardian', name: '온화한 수호자', subtitle: '원칙의 품격',
    axes: [
      { label: '직관', directionFragment: 'empathy_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '관용', directionFragment: 'leniency_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '원칙', directionFragment: 'jurisprudence_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: { 1: '공감 신뢰 +3', 3: '공감 피로도 감소', 6: '자백 임계치 -5', 9: '감정 상태 표시', 12: '신뢰 +8, 임계치 -10', 15: '공감 피로 면역' },
  },
  {
    id: 'warm_mediator', name: '따뜻한 중재자', subtitle: '화해의 길잡이',
    axes: [
      { label: '직관', directionFragment: 'empathy_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '관용', directionFragment: 'leniency_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '화해', directionFragment: 'reconciliation_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: { 1: '비공개보호 신뢰 +5', 3: '분리심문 솔직도 보너스', 6: '법정 지배력 추가 정보', 9: '비공개보호 2배', 12: '신뢰 +15', 15: '법정 지배력 무제한' },
  },
  {
    id: 'neutral_observer', name: '중립의 관찰자', subtitle: '균형의 눈',
    axes: [
      { label: '탐구', directionFragment: 'inquiry_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '심리', directionFragment: 'deliberation_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '균형', directionFragment: 'balance_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: { 1: '턴 +1', 3: '초기 상태 힌트', 6: '턴 +2, 교착 피드백 강화', 9: '첫 턴 효과 +30%', 12: '심문 피로도 감소', 15: '턴 +3, 초기 힌트 확장' },
  },
] as const

// ── 서브레벨 비용 ──

export const MAX_SUB_LEVEL = 5

interface SubLevelCost {
  direction: number
  neutral: number
}

const SUB_LEVEL_COSTS: Record<number, SubLevelCost> = {
  0: { direction: 2, neutral: 3 },
  1: { direction: 4, neutral: 5 },
  2: { direction: 6, neutral: 8 },
  3: { direction: 8, neutral: 10 },
  4: { direction: 10, neutral: 12 },
}

export function getSubLevelCost(currentSubLevel: number): SubLevelCost | null {
  return SUB_LEVEL_COSTS[currentSubLevel] ?? null
}

// ── 타이틀 레벨 상태 ──

/** 각 타이틀의 3축 서브레벨 */
export type TitleLevels = Record<TitleId, [number, number, number]>

export function createDefaultTitleLevels(): TitleLevels {
  const zero: [number, number, number] = [0, 0, 0]
  return {
    cold_judge: [...zero], practical_analyst: [...zero], careful_mediator: [...zero],
    balanced_sage: [...zero], instinct_judge: [...zero], passion_arbiter: [...zero],
    gentle_guardian: [...zero], warm_mediator: [...zero], neutral_observer: [...zero],
  }
}

/** 합산 레벨 */
export function getTotalLevel(subLevels: [number, number, number]): number {
  return subLevels[0] + subLevels[1] + subLevels[2]
}

/** 현재 합산 레벨에서 활성화된 최고 효과 */
export function getActiveEffect(titleDef: TitleDefinition, totalLevel: number): string {
  let best = ''
  for (const [lv, desc] of Object.entries(titleDef.effects)) {
    if (totalLevel >= Number(lv)) best = desc
  }
  return best
}

// ── 축별 강화 ──

export function canEnhanceAxis(
  titleId: TitleId, axisIndex: number,
  titleLevels: TitleLevels, inventory: FragmentInventory,
): boolean {
  const subs = titleLevels[titleId]
  if (subs[axisIndex] >= MAX_SUB_LEVEL) return false
  const cost = SUB_LEVEL_COSTS[subs[axisIndex]]
  if (!cost) return false
  const def = TITLE_TABLE.find(t => t.id === titleId)!
  const axis = def.axes[axisIndex]
  return inventory[axis.directionFragment] >= cost.direction
    && inventory[axis.neutralFragment] >= cost.neutral
}

export function enhanceAxis(
  titleId: TitleId, axisIndex: number,
  titleLevels: TitleLevels, inventory: FragmentInventory,
): { titleLevels: TitleLevels; inventory: FragmentInventory } | null {
  if (!canEnhanceAxis(titleId, axisIndex, titleLevels, inventory)) return null
  const subs = [...titleLevels[titleId]] as [number, number, number]
  const cost = SUB_LEVEL_COSTS[subs[axisIndex]]!
  const def = TITLE_TABLE.find(t => t.id === titleId)!
  const axis = def.axes[axisIndex]
  const newInv = { ...inventory }
  newInv[axis.directionFragment] -= cost.direction
  newInv[axis.neutralFragment] -= cost.neutral
  subs[axisIndex] += 1
  return { titleLevels: { ...titleLevels, [titleId]: subs }, inventory: newInv }
}

// ── 장착 ──

export interface TitleLoadout {
  slot1: TitleId | null
  slot2: TitleId | null
}

export function createDefaultLoadout(): TitleLoadout {
  return { slot1: null, slot2: null }
}

export function canEquipTitle(
  titleId: TitleId, slot: 'slot1' | 'slot2',
  titleLevels: TitleLevels, loadout: TitleLoadout,
): boolean {
  if (getTotalLevel(titleLevels[titleId]) < 1) return false
  const other = slot === 'slot1' ? 'slot2' : 'slot1'
  return loadout[other] !== titleId
}

// ── 활성 효과 ──

export interface ActiveTitleEffect {
  titleId: TitleId
  totalLevel: number
  description: string
}

export function getActiveTitleEffects(
  titleLevels: TitleLevels, loadout: TitleLoadout,
): ActiveTitleEffect[] {
  const effects: ActiveTitleEffect[] = []
  for (const slot of [loadout.slot1, loadout.slot2]) {
    if (!slot) continue
    const total = getTotalLevel(titleLevels[slot])
    if (total < 1) continue
    const def = TITLE_TABLE.find(t => t.id === slot)!
    effects.push({ titleId: slot, totalLevel: total, description: getActiveEffect(def, total) })
  }
  return effects
}

export function getTitleById(titleId: TitleId): TitleDefinition | undefined {
  return TITLE_TABLE.find(t => t.id === titleId)
}

// ── 조각 교환 ──

export const EXCHANGE_RATE = 3  // 3:1 교환

export function canExchangeFragments(inventory: FragmentInventory, sourceId: FragmentId): boolean {
  return inventory[sourceId] >= EXCHANGE_RATE
}

export function exchangeFragments(
  inventory: FragmentInventory, sourceId: FragmentId, targetId: FragmentId,
): FragmentInventory | null {
  if (sourceId === targetId) return null
  if (inventory[sourceId] < EXCHANGE_RATE) return null
  const next = { ...inventory }
  next[sourceId] -= EXCHANGE_RATE
  next[targetId] += 1
  return next
}
