/**
 * judgeProgressionEngine.ts — 재판관 성향 시스템 v2
 *
 * 재료 기반 강화 모델:
 *   재판 플레이 → 조각 획득 → 내 정보에서 성향 강화 → 퍼크 장착 → 게임 진입
 *
 * 3축 × 3방향 = 9종 조각
 *   탐구: 추론의 조각(논리) / 탐구의 조각(중립) / 공감의 조각(직관)
 *   심판: 준엄의 조각(엄격) / 심리의 조각(중립) / 이해의 조각(관용)
 *   해결: 법리의 조각(원칙) / 균형의 조각(중립) / 봉합의 조각(화해)
 */

import type { ProcessMetrics } from '../types'
import type { PerkId } from './judgePerks'
import { createDefaultTitleLevels, createDefaultLoadout, type TitleId, type TitleLevels, type TitleLoadout } from './judgeTitleEngine'

// ── 조각 ID ──

export type FragmentAxis = 'inquiry' | 'judgment' | 'resolution'
export type FragmentDirection = 'negative' | 'neutral' | 'positive'

export type FragmentId =
  // 탐구
  | 'reasoning_fragment'   // 추론의 조각 (논리)
  | 'inquiry_fragment'     // 탐구의 조각 (중립)
  | 'empathy_fragment'     // 공감의 조각 (직관)
  // 심판
  | 'severity_fragment'    // 준엄의 조각 (엄격)
  | 'deliberation_fragment' // 심리의 조각 (중립)
  | 'leniency_fragment'    // 이해의 조각 (관용)
  // 해결
  | 'jurisprudence_fragment' // 법리의 조각 (원칙)
  | 'balance_fragment'       // 균형의 조각 (중립)
  | 'reconciliation_fragment' // 봉합의 조각 (화해)

export interface FragmentDefinition {
  id: FragmentId
  name: string
  axis: FragmentAxis
  direction: FragmentDirection
  emoji: string
}

export const FRAGMENT_TABLE: readonly FragmentDefinition[] = [
  // 탐구
  { id: 'reasoning_fragment', name: '추론의 조각', axis: 'inquiry', direction: 'negative', emoji: '🔍' },
  { id: 'inquiry_fragment', name: '탐구의 조각', axis: 'inquiry', direction: 'neutral', emoji: '📖' },
  { id: 'empathy_fragment', name: '공감의 조각', axis: 'inquiry', direction: 'positive', emoji: '💡' },
  // 심판
  { id: 'severity_fragment', name: '준엄의 조각', axis: 'judgment', direction: 'negative', emoji: '⚔️' },
  { id: 'deliberation_fragment', name: '심리의 조각', axis: 'judgment', direction: 'neutral', emoji: '⚖️' },
  { id: 'leniency_fragment', name: '이해의 조각', axis: 'judgment', direction: 'positive', emoji: '🕊️' },
  // 해결
  { id: 'jurisprudence_fragment', name: '법리의 조각', axis: 'resolution', direction: 'negative', emoji: '📜' },
  { id: 'balance_fragment', name: '균형의 조각', axis: 'resolution', direction: 'neutral', emoji: '🏛️' },
  { id: 'reconciliation_fragment', name: '봉합의 조각', axis: 'resolution', direction: 'positive', emoji: '🤝' },
] as const

// ── 조각 인벤토리 ──

export type FragmentInventory = Record<FragmentId, number>

export function createEmptyInventory(): FragmentInventory {
  return {
    reasoning_fragment: 0,
    inquiry_fragment: 0,
    empathy_fragment: 0,
    severity_fragment: 0,
    deliberation_fragment: 0,
    leniency_fragment: 0,
    jurisprudence_fragment: 0,
    balance_fragment: 0,
    reconciliation_fragment: 0,
  }
}

// ── 성향 레벨 ──

export interface TraitLevel {
  level: number  // 0~3
}

/** 6가지 성향 경로 (축 × 방향) */
export type TraitId =
  | 'logical'      // 탐구-논리
  | 'intuitive'    // 탐구-직관
  | 'strict'       // 심판-엄격
  | 'lenient'      // 심판-관용
  | 'principled'   // 해결-원칙
  | 'reconciling'  // 해결-화해

export type TraitLevels = Record<TraitId, TraitLevel>

export function createDefaultTraitLevels(): TraitLevels {
  return {
    logical: { level: 0 },
    intuitive: { level: 0 },
    strict: { level: 0 },
    lenient: { level: 0 },
    principled: { level: 0 },
    reconciling: { level: 0 },
  }
}

// ── 성향 → 축/방향 매핑 ──

export interface TraitMeta {
  id: TraitId
  name: string
  axis: FragmentAxis
  direction: 'negative' | 'positive'
  directionFragment: FragmentId
  neutralFragment: FragmentId
}

export const TRAIT_META: readonly TraitMeta[] = [
  { id: 'logical', name: '논리', axis: 'inquiry', direction: 'negative', directionFragment: 'reasoning_fragment', neutralFragment: 'inquiry_fragment' },
  { id: 'intuitive', name: '직관', axis: 'inquiry', direction: 'positive', directionFragment: 'empathy_fragment', neutralFragment: 'inquiry_fragment' },
  { id: 'strict', name: '엄격', axis: 'judgment', direction: 'negative', directionFragment: 'severity_fragment', neutralFragment: 'deliberation_fragment' },
  { id: 'lenient', name: '관용', axis: 'judgment', direction: 'positive', directionFragment: 'leniency_fragment', neutralFragment: 'deliberation_fragment' },
  { id: 'principled', name: '원칙', axis: 'resolution', direction: 'negative', directionFragment: 'jurisprudence_fragment', neutralFragment: 'balance_fragment' },
  { id: 'reconciling', name: '화해', axis: 'resolution', direction: 'positive', directionFragment: 'reconciliation_fragment', neutralFragment: 'balance_fragment' },
] as const

// ── 강화 비용 테이블 ──

export interface EnhancementCost {
  directionFragments: number
  neutralFragments: number
}

/** Lv0→1: 방향3+중립5, Lv1→2: 방향6+중립10, Lv2→3: 방향10+중립16 */
const ENHANCEMENT_COSTS: Record<number, EnhancementCost> = {
  0: { directionFragments: 3, neutralFragments: 5 },
  1: { directionFragments: 6, neutralFragments: 10 },
  2: { directionFragments: 10, neutralFragments: 16 },
}

export function getEnhancementCost(currentLevel: number): EnhancementCost | null {
  return ENHANCEMENT_COSTS[currentLevel] ?? null
}

/** 강화 가능 여부 체크 */
export function canEnhanceTrait(
  traitId: TraitId,
  traits: TraitLevels,
  inventory: FragmentInventory,
): boolean {
  const trait = traits[traitId]
  if (trait.level >= 3) return false

  const meta = TRAIT_META.find(m => m.id === traitId)!
  const cost = ENHANCEMENT_COSTS[trait.level]
  if (!cost) return false

  return (
    inventory[meta.directionFragment] >= cost.directionFragments &&
    inventory[meta.neutralFragment] >= cost.neutralFragments
  )
}

/** 강화 실행 — 인벤토리 차감 + 레벨 증가. 새 상태 반환 */
export function enhanceTrait(
  traitId: TraitId,
  traits: TraitLevels,
  inventory: FragmentInventory,
): { traits: TraitLevels; inventory: FragmentInventory } | null {
  if (!canEnhanceTrait(traitId, traits, inventory)) return null

  const meta = TRAIT_META.find(m => m.id === traitId)!
  const cost = ENHANCEMENT_COSTS[traits[traitId].level]!

  const newInventory = { ...inventory }
  newInventory[meta.directionFragment] -= cost.directionFragments
  newInventory[meta.neutralFragment] -= cost.neutralFragments

  const newTraits = { ...traits }
  newTraits[traitId] = { level: traits[traitId].level + 1 }

  return { traits: newTraits, inventory: newInventory }
}

// ── 조각 변환: 중립 3개 → 방향 1개 ──

export const CONVERSION_RATE = 3  // 중립 3개당 방향 1개

/** 변환 가능 여부 */
export function canConvertFragments(
  inventory: FragmentInventory,
  sourceNeutralId: FragmentId,
): boolean {
  const def = FRAGMENT_TABLE.find(f => f.id === sourceNeutralId)
  if (!def || def.direction !== 'neutral') return false
  return inventory[sourceNeutralId] >= CONVERSION_RATE
}

/** 변환 실행: 같은 축의 중립 조각 → 원하는 방향 조각 */
export function convertFragments(
  inventory: FragmentInventory,
  targetDirectionId: FragmentId,
  count: number = 1,
): FragmentInventory | null {
  const target = FRAGMENT_TABLE.find(f => f.id === targetDirectionId)
  if (!target || target.direction === 'neutral') return null

  const neutral = FRAGMENT_TABLE.find(f => f.axis === target.axis && f.direction === 'neutral')
  if (!neutral) return null

  const neutralCost = count * CONVERSION_RATE
  if (inventory[neutral.id] < neutralCost) return null

  const next = { ...inventory }
  next[neutral.id] -= neutralCost
  next[targetDirectionId] += count
  return next
}

// ── 재판 결과 → 조각 획득 ──

export interface FragmentReward {
  fragmentId: FragmentId
  count: number
  reason: string
}

interface CaseAxisValues {
  inquiry: number   // -100 ~ +100
  judgment: number
  resolution: number
}

/**
 * 축별 조각 배분:
 *   |값| ≥ 45 → 해당 방향 3개
 *   |값| 15~44 → 해당 방향 2개 + 중립 1개
 *   |값| < 15 → 중립 2개
 */
function computeAxisFragments(
  axis: FragmentAxis,
  value: number,
): FragmentReward[] {
  const neg = FRAGMENT_TABLE.find(f => f.axis === axis && f.direction === 'negative')!
  const neutral = FRAGMENT_TABLE.find(f => f.axis === axis && f.direction === 'neutral')!
  const pos = FRAGMENT_TABLE.find(f => f.axis === axis && f.direction === 'positive')!

  const abs = Math.abs(value)
  const dir = value >= 0 ? pos : neg

  if (abs >= 45) {
    return [{ fragmentId: dir.id, count: 3, reason: `${dir.name} (강한 편향)` }]
  }
  if (abs >= 15) {
    return [
      { fragmentId: dir.id, count: 2, reason: `${dir.name} (일관된 편향)` },
      { fragmentId: neutral.id, count: 1, reason: `${neutral.name} (부분 균형)` },
    ]
  }
  return [{ fragmentId: neutral.id, count: 2, reason: `${neutral.name} (균형 플레이)` }]
}

export interface BonusConditions {
  bothSidesS3Plus: boolean
  perfectClearance: boolean
  isFirstPlay: boolean
  allCombinationsFound: boolean
  allWitnessesCalled: boolean
}

/** 보너스 조각 계산 */
function computeBonusFragments(
  caseAxes: CaseAxisValues,
  conditions: BonusConditions,
): FragmentReward[] {
  const rewards: FragmentReward[] = []

  if (conditions.bothSidesS3Plus) {
    // 탐구 축 방향 조각 +1
    const dir: FragmentDirection = caseAxes.inquiry >= 0 ? 'positive' : 'negative'
    const frag = FRAGMENT_TABLE.find(f => f.axis === 'inquiry' && f.direction === dir)!
    rewards.push({ fragmentId: frag.id, count: 1, reason: '양측 S3+ 도달 보너스' })
  }

  if (conditions.perfectClearance) {
    // 전 축 중립 조각 +1
    for (const axis of ['inquiry', 'judgment', 'resolution'] as FragmentAxis[]) {
      const neutral = FRAGMENT_TABLE.find(f => f.axis === axis && f.direction === 'neutral')!
      rewards.push({ fragmentId: neutral.id, count: 1, reason: '100% 달성도 보너스' })
    }
  }

  if (conditions.isFirstPlay) {
    // 모든 기본 조각 +1 (획득하는 방향/중립 각각)
    for (const axis of ['inquiry', 'judgment', 'resolution'] as FragmentAxis[]) {
      const neutral = FRAGMENT_TABLE.find(f => f.axis === axis && f.direction === 'neutral')!
      rewards.push({ fragmentId: neutral.id, count: 1, reason: '첫 플레이 보너스' })
    }
  }

  if (conditions.allCombinationsFound) {
    const dir: FragmentDirection = caseAxes.inquiry >= 0 ? 'positive' : 'negative'
    const frag = FRAGMENT_TABLE.find(f => f.axis === 'inquiry' && f.direction === dir)!
    rewards.push({ fragmentId: frag.id, count: 1, reason: '전체 증거 조합 발견 보너스' })
  }

  if (conditions.allWitnessesCalled) {
    const dir: FragmentDirection = caseAxes.judgment >= 0 ? 'positive' : 'negative'
    const frag = FRAGMENT_TABLE.find(f => f.axis === 'judgment' && f.direction === dir)!
    rewards.push({ fragmentId: frag.id, count: 1, reason: '전체 증인 소환 보너스' })
  }

  return rewards
}

/** 사건 결과로부터 전체 조각 보상 계산 */
export function computeCaseRewards(
  caseAxes: CaseAxisValues,
  bonus: BonusConditions,
): FragmentReward[] {
  const base = [
    ...computeAxisFragments('inquiry', caseAxes.inquiry),
    ...computeAxisFragments('judgment', caseAxes.judgment),
    ...computeAxisFragments('resolution', caseAxes.resolution),
  ]
  const bonusRewards = computeBonusFragments(caseAxes, bonus)
  return [...base, ...bonusRewards]
}

/** 보상을 인벤토리에 적용 */
export function applyRewardsToInventory(
  inventory: FragmentInventory,
  rewards: FragmentReward[],
): FragmentInventory {
  const next = { ...inventory }
  for (const r of rewards) {
    next[r.fragmentId] += r.count
  }
  return next
}

// ── 칭호 결정 (3축 최고 레벨 조합) ──

export type JudgeTitleId =
  | 'cold_judge' | 'practical_analyst' | 'balanced_sage' | 'careful_mediator'
  | 'instinct_judge' | 'passion_arbiter' | 'gentle_guardian' | 'warm_mediator'
  | 'neutral_observer'

export function resolveTitle(traits: TraitLevels): JudgeTitleId {
  // 각 축에서 더 높은 쪽 결정
  const inqDir = traits.logical.level >= traits.intuitive.level ? 'logical' : 'intuitive'
  const judDir = traits.strict.level >= traits.lenient.level ? 'strict' : 'lenient'
  const resDir = traits.principled.level >= traits.reconciling.level ? 'principled' : 'reconciling'

  const inqLv = traits[inqDir].level
  const judLv = traits[judDir].level
  const resLv = traits[resDir].level

  // 모든 축 Lv0이면 중립
  if (inqLv === 0 && judLv === 0 && resLv === 0) return 'neutral_observer'

  const isLogical = inqDir === 'logical' && inqLv >= 1
  const isIntuitive = inqDir === 'intuitive' && inqLv >= 1
  const isStrict = judDir === 'strict' && judLv >= 1
  const isLenient = judDir === 'lenient' && judLv >= 1
  const isPrincipled = resDir === 'principled' && resLv >= 1
  const isReconciling = resDir === 'reconciling' && resLv >= 1

  if (isLogical && isStrict && isPrincipled) return 'cold_judge'
  if (isLogical && isStrict && isReconciling) return 'practical_analyst'
  if (isLogical && isLenient && isPrincipled) return 'balanced_sage'
  if (isLogical && isLenient && isReconciling) return 'careful_mediator'
  if (isIntuitive && isStrict && isPrincipled) return 'instinct_judge'
  if (isIntuitive && isStrict && isReconciling) return 'passion_arbiter'
  if (isIntuitive && isLenient && isPrincipled) return 'gentle_guardian'
  if (isIntuitive && isLenient && isReconciling) return 'warm_mediator'

  return 'neutral_observer'
}

export const TITLE_LABELS: Record<JudgeTitleId, { name: string; subtitle: string }> = {
  cold_judge: { name: '냉철한 심판자', subtitle: '법도의 추적자' },
  practical_analyst: { name: '실용적 분석가', subtitle: '해결의 설계자' },
  balanced_sage: { name: '균형의 현자', subtitle: '공정의 수호자' },
  careful_mediator: { name: '신중한 중재자', subtitle: '신뢰의 설계자' },
  instinct_judge: { name: '직감의 심판관', subtitle: '본능의 추적자' },
  passion_arbiter: { name: '열정의 조정관', subtitle: '정의의 불꽃' },
  gentle_guardian: { name: '온화한 수호자', subtitle: '원칙의 품격' },
  warm_mediator: { name: '따뜻한 중재자', subtitle: '화해의 길잡이' },
  neutral_observer: { name: '중립의 관찰자', subtitle: '균형의 눈' },
}

// ── 성장 등급 ──

export type JudgeTier = 'apprentice' | 'regular' | 'veteran' | 'senior' | 'legendary'

export function computeTier(casesCompleted: number, maxTraitLevel: number): JudgeTier {
  if (casesCompleted >= 30) return 'legendary'
  if (casesCompleted >= 20) return 'senior'
  if (casesCompleted >= 10) return 'veteran'
  if (casesCompleted >= 5 && maxTraitLevel >= 1) return 'regular'
  return 'apprentice'
}

export const TIER_LABELS: Record<JudgeTier, { name: string; emoji: string }> = {
  apprentice: { name: '견습 재판관', emoji: '📜' },
  regular: { name: '정식 재판관', emoji: '⚖️' },
  veteran: { name: '숙련 재판관', emoji: '🏛️' },
  senior: { name: '수석 재판관', emoji: '🦉' },
  legendary: { name: '전설의 재판관', emoji: '🌟' },
}

// ── 축 라벨 (UI용) ──

export const AXIS_LABELS = {
  inquiry: { negative: '논리', positive: '직관', label: '탐구' },
  judgment: { negative: '엄격', positive: '관용', label: '심판' },
  resolution: { negative: '원칙', positive: '화해', label: '해결' },
} as const

// ── 전체 상태 (localStorage 직렬화 대상) ──

export interface JudgeProgressionState {
  inventory: FragmentInventory
  traits: TraitLevels
  /** @deprecated v4 — 퍼크 폐지, titleLevels + titleLoadout 사용 */
  equippedMajor: PerkId | null
  /** @deprecated v4 — 퍼크 폐지, titleLevels + titleLoadout 사용 */
  equippedMinor: PerkId | null
  /** 타이틀 9종 레벨 (v4) */
  titleLevels: TitleLevels
  /** 타이틀 장착 2슬롯 (v4) */
  titleLoadout: TitleLoadout
  casesCompleted: number
  lastUpdated: string
  schemaVersion: 4
}

export function createDefaultProgressionState(): JudgeProgressionState {
  return {
    inventory: createEmptyInventory(),
    traits: createDefaultTraitLevels(),
    equippedMajor: null,
    equippedMinor: null,
    titleLevels: createDefaultTitleLevels(),
    titleLoadout: createDefaultLoadout(),
    casesCompleted: 0,
    lastUpdated: new Date().toISOString(),
    schemaVersion: 4,
  }
}

// ── 기존 드리프트 상태 마이그레이션 ──

interface LegacyAxisLevelState {
  level: number
  progress: number
}

interface LegacyDriftState {
  inquiry: LegacyAxisLevelState
  judgment: LegacyAxisLevelState
  resolution: LegacyAxisLevelState
  casesProcessed: number
  schemaVersion: 2
}

/**
 * 기존 v2 드리프트 → v3 재료 기반으로 마이그레이션.
 * 기존 레벨을 성향 레벨로 직접 매핑하고,
 * 남은 progress를 조각 수로 변환하여 인벤토리에 넣음.
 */
export function migrateDriftToProgression(
  drift: LegacyDriftState,
  savedPerks: { major: string | null; minor: string | null },
): JudgeProgressionState {
  const traits = createDefaultTraitLevels()
  const inventory = createEmptyInventory()

  function migrateAxis(
    axis: LegacyAxisLevelState,
    negTrait: TraitId,
    posTrait: TraitId,
    negFrag: FragmentId,
    neutralFrag: FragmentId,
    posFrag: FragmentId,
  ) {
    const absLevel = Math.min(3, Math.abs(axis.level))
    if (axis.level < 0) {
      traits[negTrait] = { level: absLevel }
      // progress를 조각으로 변환 (대략적)
      inventory[negFrag] += axis.progress * 2
      inventory[neutralFrag] += axis.progress
    } else if (axis.level > 0) {
      traits[posTrait] = { level: absLevel }
      inventory[posFrag] += axis.progress * 2
      inventory[neutralFrag] += axis.progress
    } else {
      inventory[neutralFrag] += axis.progress * 2
    }
  }

  migrateAxis(drift.inquiry, 'logical', 'intuitive', 'reasoning_fragment', 'inquiry_fragment', 'empathy_fragment')
  migrateAxis(drift.judgment, 'strict', 'lenient', 'severity_fragment', 'deliberation_fragment', 'leniency_fragment')
  migrateAxis(drift.resolution, 'principled', 'reconciling', 'jurisprudence_fragment', 'balance_fragment', 'reconciliation_fragment')

  return {
    inventory,
    traits,
    equippedMajor: (savedPerks.major as PerkId) ?? null,
    equippedMinor: (savedPerks.minor as PerkId) ?? null,
    titleLevels: createDefaultTitleLevels(),
    titleLoadout: createDefaultLoadout(),
    casesCompleted: drift.casesProcessed,
    lastUpdated: new Date().toISOString(),
    schemaVersion: 4,
  }
}

// ── 하위 호환 유틸 ──

/** 축 값(-100~+100)을 레벨(-3~+3)로 변환 (하위 호환) */
export function axisToLevel(axisValue: number): number {
  const sign = axisValue >= 0 ? 1 : -1
  const abs = Math.abs(axisValue)
  if (abs >= 100) return sign * 3
  if (abs >= 50) return sign * 2
  if (abs >= 20) return sign * 1
  return 0
}

// ── caseAxis 계산 (기존 deriveCaseProfile 재활용) ──

export { deriveCaseProfile } from './judgeProfileEngine'
