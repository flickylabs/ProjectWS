/**
 * Judge title progression and loadout effects.
 *
 * A title has three axes. Each axis can be raised from Lv.0 to Lv.5 by
 * synthesizing a directional fragment with a neutral fragment. The sum of the
 * three axes is the title's total level.
 */

import type { Resources } from '../types'
import type { FragmentId, FragmentInventory } from './judgeProgressionEngine'

export type TitleId =
  | 'cold_judge'
  | 'practical_analyst'
  | 'careful_mediator'
  | 'balanced_sage'
  | 'instinct_judge'
  | 'passion_arbiter'
  | 'gentle_guardian'
  | 'warm_mediator'
  | 'neutral_observer'

export interface TitleAxisLevel {
  label: string
  directionFragment: FragmentId
  neutralFragment: FragmentId
  level: number
}

export type TitleSubLevels = [TitleAxisLevel, TitleAxisLevel, TitleAxisLevel]

export interface TitleGameplayEffect {
  startResources?: Partial<Resources>
  note?: string
}

export interface TitleDefinition {
  id: TitleId
  name: string
  subtitle: string
  axes: Array<{
    label: string
    directionFragment: FragmentId
    neutralFragment: FragmentId
  }>
  effects: Record<number, string>
  gameplayEffects?: Record<number, TitleGameplayEffect>
}

export const TITLE_TABLE: readonly TitleDefinition[] = [
  {
    id: 'cold_judge',
    name: '냉철한 심판자',
    subtitle: '모순을 좁히고 법정 장악을 지킨다',
    axes: [
      { label: '논리', directionFragment: 'reasoning_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '엄정', directionFragment: 'severity_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '원칙', directionFragment: 'jurisprudence_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: {
      1: '시작 법정 장악 +1',
      3: '무관한 증거를 냈을 때 절차 경고가 더 명확해진다',
      6: '시작 법정 장악 추가 +1',
      9: '첫 강한 모순 지적 후 재판관 수첩 기록이 더 선명해진다',
      12: '시작 법정 장악 추가 +1',
      15: '사실 추궁 흐름에서 실수 페널티를 한 번 완화한다',
    },
    gameplayEffects: {
      1: { startResources: { courtControl: 1 }, note: '시작 법정 장악 +1' },
      6: { startResources: { courtControl: 1 }, note: '시작 법정 장악 추가 +1' },
      12: { startResources: { courtControl: 1 }, note: '시작 법정 장악 추가 +1' },
    },
  },
  {
    id: 'practical_analyst',
    name: '실용적 분석가',
    subtitle: '증거 조사와 조합을 오래 끌고 간다',
    axes: [
      { label: '논리', directionFragment: 'reasoning_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '엄정', directionFragment: 'severity_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '화해', directionFragment: 'reconciliation_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: {
      1: '시작 조사 토큰 +1',
      3: '조합 가능한 단서가 있을 때 표시가 더 빨리 뜬다',
      6: '시작 조사 토큰 추가 +1',
      9: '증거 조합 결과의 목적지 표시가 강화된다',
      12: '시작 조사 토큰 추가 +1',
      15: '첫 조합 실수의 자원 손실을 한 번 완화한다',
    },
    gameplayEffects: {
      1: { startResources: { investigationTokens: 1 }, note: '시작 조사 토큰 +1' },
      6: { startResources: { investigationTokens: 1 }, note: '시작 조사 토큰 추가 +1' },
      12: { startResources: { investigationTokens: 1 }, note: '시작 조사 토큰 추가 +1' },
    },
  },
  {
    id: 'careful_mediator',
    name: '신중한 중재자',
    subtitle: '증인과 관계 질문을 안정적으로 운용한다',
    axes: [
      { label: '논리', directionFragment: 'reasoning_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '관용', directionFragment: 'leniency_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '원칙', directionFragment: 'jurisprudence_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: {
      1: '시작 스킬 포인트 +1',
      3: '증인 관련 질문의 절차 피드백이 강화된다',
      6: '시작 법정 장악 +1',
      9: '증인 재소환 시 같은 질문 반복 경고가 더 빨리 뜬다',
      12: '시작 스킬 포인트 추가 +1',
      15: '첫 증인 타이밍 실수를 한 번 완화한다',
    },
    gameplayEffects: {
      1: { startResources: { skillPoints: 1 }, note: '시작 스킬 포인트 +1' },
      6: { startResources: { courtControl: 1 }, note: '시작 법정 장악 +1' },
      12: { startResources: { skillPoints: 1 }, note: '시작 스킬 포인트 추가 +1' },
    },
  },
  {
    id: 'balanced_sage',
    name: '균형의 현자',
    subtitle: '조사, 심문, 절차를 고르게 보강한다',
    axes: [
      { label: '논리', directionFragment: 'reasoning_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '관용', directionFragment: 'leniency_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '화해', directionFragment: 'reconciliation_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: {
      1: '시작 조사 토큰 +1',
      3: '자원 회복 액션의 설명이 더 구체화된다',
      6: '시작 스킬 포인트 +1',
      9: '관찰과 수첩의 목적지 표시가 강화된다',
      12: '시작 법정 장악 +1',
      15: '시작 자원 균형 보너스가 모두 적용된다',
    },
    gameplayEffects: {
      1: { startResources: { investigationTokens: 1 }, note: '시작 조사 토큰 +1' },
      6: { startResources: { skillPoints: 1 }, note: '시작 스킬 포인트 +1' },
      12: { startResources: { courtControl: 1 }, note: '시작 법정 장악 +1' },
    },
  },
  {
    id: 'instinct_judge',
    name: '직감의 심판관',
    subtitle: '숨은 반응을 빨리 잡아낸다',
    axes: [
      { label: '직감', directionFragment: 'empathy_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '엄정', directionFragment: 'severity_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '원칙', directionFragment: 'jurisprudence_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: {
      1: '시작 조사 토큰 +1',
      3: '감정 변화 관찰이 더 빠르게 표시된다',
      6: '시작 스킬 포인트 +1',
      9: '방어가 흔들리는 순간의 컷씬 우선순위가 올라간다',
      12: '시작 조사 토큰 추가 +1',
      15: '첫 숨은 반응을 놓쳤을 때 관찰 힌트를 남긴다',
    },
    gameplayEffects: {
      1: { startResources: { investigationTokens: 1 }, note: '시작 조사 토큰 +1' },
      6: { startResources: { skillPoints: 1 }, note: '시작 스킬 포인트 +1' },
      12: { startResources: { investigationTokens: 1 }, note: '시작 조사 토큰 추가 +1' },
    },
  },
  {
    id: 'passion_arbiter',
    name: '열정의 조정관',
    subtitle: '감정 고조를 밀어붙이는 힘이 있다',
    axes: [
      { label: '직감', directionFragment: 'empathy_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '엄정', directionFragment: 'severity_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '화해', directionFragment: 'reconciliation_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: {
      1: '시작 스킬 포인트 +1',
      3: '감정 추궁 선택지의 위험 표시가 명확해진다',
      6: '시작 법정 장악 +1',
      9: '격앙 상태에서 판사 경고가 한 번 늦게 뜬다',
      12: '시작 스킬 포인트 추가 +1',
      15: '감정 루트의 첫 과열 페널티를 한 번 완화한다',
    },
    gameplayEffects: {
      1: { startResources: { skillPoints: 1 }, note: '시작 스킬 포인트 +1' },
      6: { startResources: { courtControl: 1 }, note: '시작 법정 장악 +1' },
      12: { startResources: { skillPoints: 1 }, note: '시작 스킬 포인트 추가 +1' },
    },
  },
  {
    id: 'gentle_guardian',
    name: '온화한 수호자',
    subtitle: '당사자를 보호하며 진술을 끌어낸다',
    axes: [
      { label: '직감', directionFragment: 'empathy_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '관용', directionFragment: 'leniency_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '원칙', directionFragment: 'jurisprudence_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: {
      1: '시작 법정 장악 +1',
      3: '공감 질문 실패 시 관찰 피드백이 더 부드러워진다',
      6: '시작 스킬 포인트 +1',
      9: '신뢰 피크가 관찰 영역에 더 명확히 남는다',
      12: '시작 법정 장악 추가 +1',
      15: '첫 신뢰 하락을 한 번 완화한다',
    },
    gameplayEffects: {
      1: { startResources: { courtControl: 1 }, note: '시작 법정 장악 +1' },
      6: { startResources: { skillPoints: 1 }, note: '시작 스킬 포인트 +1' },
      12: { startResources: { courtControl: 1 }, note: '시작 법정 장악 추가 +1' },
    },
  },
  {
    id: 'warm_mediator',
    name: '따뜻한 중재자',
    subtitle: '설명과 수용을 만들어 내는 방향에 강하다',
    axes: [
      { label: '직감', directionFragment: 'empathy_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '관용', directionFragment: 'leniency_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '화해', directionFragment: 'reconciliation_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: {
      1: '시작 스킬 포인트 +1',
      3: '신뢰 질문의 결과 문구가 더 명확해진다',
      6: '시작 법정 장악 +1',
      9: '조건부 조정 힌트가 더 빨리 정리된다',
      12: '시작 조사 토큰 +1',
      15: '신뢰 루트 첫 자원 소모를 한 번 완화한다',
    },
    gameplayEffects: {
      1: { startResources: { skillPoints: 1 }, note: '시작 스킬 포인트 +1' },
      6: { startResources: { courtControl: 1 }, note: '시작 법정 장악 +1' },
      12: { startResources: { investigationTokens: 1 }, note: '시작 조사 토큰 +1' },
    },
  },
  {
    id: 'neutral_observer',
    name: '중립의 관찰자',
    subtitle: '치우치지 않은 기본기를 높인다',
    axes: [
      { label: '탐구', directionFragment: 'inquiry_fragment', neutralFragment: 'inquiry_fragment' },
      { label: '숙의', directionFragment: 'deliberation_fragment', neutralFragment: 'deliberation_fragment' },
      { label: '균형', directionFragment: 'balance_fragment', neutralFragment: 'balance_fragment' },
    ],
    effects: {
      1: '시작 조사 토큰 +1',
      3: '관찰 기록이 더 안정적으로 묶인다',
      6: '시작 스킬 포인트 +1',
      9: '약한 관찰이 중복될 때 자동 병합된다',
      12: '시작 법정 장악 +1',
      15: '시작 자원 균형 보너스가 모두 적용된다',
    },
    gameplayEffects: {
      1: { startResources: { investigationTokens: 1 }, note: '시작 조사 토큰 +1' },
      6: { startResources: { skillPoints: 1 }, note: '시작 스킬 포인트 +1' },
      12: { startResources: { courtControl: 1 }, note: '시작 법정 장악 +1' },
    },
  },
] as const

export const MAX_SUB_LEVEL = 5

export interface SubLevelCost {
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

export type TitleLevels = Record<TitleId, [number, number, number]>

export function createDefaultTitleLevels(): TitleLevels {
  const zero: [number, number, number] = [0, 0, 0]
  return {
    cold_judge: [...zero],
    practical_analyst: [...zero],
    careful_mediator: [...zero],
    balanced_sage: [...zero],
    instinct_judge: [...zero],
    passion_arbiter: [...zero],
    gentle_guardian: [...zero],
    warm_mediator: [...zero],
    neutral_observer: [...zero],
  }
}

export function getTotalLevel(subLevels: [number, number, number]): number {
  return subLevels[0] + subLevels[1] + subLevels[2]
}

export function getActiveEffect(titleDef: TitleDefinition, totalLevel: number): string {
  let best = ''
  for (const [lv, desc] of Object.entries(titleDef.effects)) {
    if (totalLevel >= Number(lv)) best = desc
  }
  return best
}

export function getAxisCostItems(
  axis: TitleDefinition['axes'][number],
  cost: SubLevelCost,
): Array<{ fragmentId: FragmentId; amount: number }> {
  const items: Array<{ fragmentId: FragmentId; amount: number }> = []
  for (const item of [
    { fragmentId: axis.directionFragment, amount: cost.direction },
    { fragmentId: axis.neutralFragment, amount: cost.neutral },
  ]) {
    const existing = items.find((costItem) => costItem.fragmentId === item.fragmentId)
    if (existing) existing.amount += item.amount
    else items.push({ ...item })
  }
  return items
}

export function canEnhanceAxis(
  titleId: TitleId,
  axisIndex: number,
  titleLevels: TitleLevels,
  inventory: FragmentInventory,
): boolean {
  const subs = titleLevels[titleId]
  if (subs[axisIndex] >= MAX_SUB_LEVEL) return false
  const cost = SUB_LEVEL_COSTS[subs[axisIndex]]
  if (!cost) return false
  const def = TITLE_TABLE.find((title) => title.id === titleId)
  const axis = def?.axes[axisIndex]
  if (!axis) return false
  return getAxisCostItems(axis, cost).every((item) => inventory[item.fragmentId] >= item.amount)
}

export function enhanceAxis(
  titleId: TitleId,
  axisIndex: number,
  titleLevels: TitleLevels,
  inventory: FragmentInventory,
): { titleLevels: TitleLevels; inventory: FragmentInventory } | null {
  if (!canEnhanceAxis(titleId, axisIndex, titleLevels, inventory)) return null
  const subs = [...titleLevels[titleId]] as [number, number, number]
  const cost = SUB_LEVEL_COSTS[subs[axisIndex]]
  const def = TITLE_TABLE.find((title) => title.id === titleId)
  const axis = def?.axes[axisIndex]
  if (!cost || !axis) return null
  const newInventory = { ...inventory }
  for (const item of getAxisCostItems(axis, cost)) {
    newInventory[item.fragmentId] -= item.amount
  }
  subs[axisIndex] += 1
  return { titleLevels: { ...titleLevels, [titleId]: subs }, inventory: newInventory }
}

export interface TitleLoadout {
  slot1: TitleId | null
  slot2: TitleId | null
}

export function createDefaultLoadout(): TitleLoadout {
  return { slot1: null, slot2: null }
}

export function canEquipTitle(
  titleId: TitleId,
  slot: 'slot1' | 'slot2',
  titleLevels: TitleLevels,
  loadout: TitleLoadout,
): boolean {
  if (getTotalLevel(titleLevels[titleId]) < 1) return false
  const other = slot === 'slot1' ? 'slot2' : 'slot1'
  return loadout[other] !== titleId
}

export interface ActiveTitleEffect {
  titleId: TitleId
  totalLevel: number
  description: string
}

export function getActiveTitleEffects(
  titleLevels: TitleLevels,
  loadout: TitleLoadout,
): ActiveTitleEffect[] {
  const effects: ActiveTitleEffect[] = []
  for (const slot of [loadout.slot1, loadout.slot2]) {
    if (!slot) continue
    const total = getTotalLevel(titleLevels[slot])
    if (total < 1) continue
    const def = TITLE_TABLE.find((title) => title.id === slot)
    if (!def) continue
    effects.push({ titleId: slot, totalLevel: total, description: getActiveEffect(def, total) })
  }
  return effects
}

export function getTitleById(titleId: TitleId): TitleDefinition | undefined {
  return TITLE_TABLE.find((title) => title.id === titleId)
}

function addResourceBonus(target: Partial<Resources>, bonus?: Partial<Resources>): Partial<Resources> {
  if (!bonus) return target
  for (const key of Object.keys(bonus) as Array<keyof Resources>) {
    target[key] = (target[key] ?? 0) + (bonus[key] ?? 0)
  }
  return target
}

export function getTitleResourceBonuses(titleDef: TitleDefinition, totalLevel: number): Partial<Resources> {
  const bonuses: Partial<Resources> = {}
  for (const [level, effect] of Object.entries(titleDef.gameplayEffects ?? {})) {
    if (totalLevel >= Number(level)) addResourceBonus(bonuses, effect.startResources)
  }
  return bonuses
}

export function getLoadoutResourceBonuses(
  titleLevels: TitleLevels,
  loadout: TitleLoadout,
): Partial<Resources> {
  const bonuses: Partial<Resources> = {}
  for (const titleId of [loadout.slot1, loadout.slot2]) {
    if (!titleId) continue
    const def = getTitleById(titleId)
    if (!def) continue
    addResourceBonus(bonuses, getTitleResourceBonuses(def, getTotalLevel(titleLevels[titleId])))
  }
  return bonuses
}

export function applyTitleResourceBonuses(
  baseResources: Resources,
  titleLevels: TitleLevels,
  loadout: TitleLoadout,
): Resources {
  const bonuses = getLoadoutResourceBonuses(titleLevels, loadout)
  return {
    investigationTokens: baseResources.investigationTokens + (bonuses.investigationTokens ?? 0),
    skillPoints: baseResources.skillPoints + (bonuses.skillPoints ?? 0),
    courtControl: baseResources.courtControl + (bonuses.courtControl ?? 0),
  }
}

export function getActiveTitleGameplayNotes(titleDef: TitleDefinition, totalLevel: number): string[] {
  return Object.entries(titleDef.gameplayEffects ?? {})
    .filter(([level]) => totalLevel >= Number(level))
    .map(([, effect]) => effect.note)
    .filter((note): note is string => Boolean(note))
}

export const EXCHANGE_RATE = 3

export function canExchangeFragments(inventory: FragmentInventory, sourceId: FragmentId): boolean {
  return inventory[sourceId] >= EXCHANGE_RATE
}

export function exchangeFragments(
  inventory: FragmentInventory,
  sourceId: FragmentId,
  targetId: FragmentId,
): FragmentInventory | null {
  if (sourceId === targetId) return null
  if (inventory[sourceId] < EXCHANGE_RATE) return null
  const next = { ...inventory }
  next[sourceId] -= EXCHANGE_RATE
  next[targetId] += 1
  return next
}
