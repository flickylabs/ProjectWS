/**
 * judgeTitleEngine.ts — 재판관 타이틀 시스템 v4
 *
 * 조각 9종 → 타이틀 9종 (Lv.0~5) → 장착 2칸
 *
 * 기존 성향 6종 + 퍼크 15종을 폐기하고,
 * 3축 조합 기반 타이틀 9종으로 통합.
 */

import type { FragmentId, FragmentInventory } from './judgeProgressionEngine'

// ── 타이틀 ID ──

export type TitleId =
  | 'cold_judge'        // 냉철한 심판자 (논리+엄격+원칙)
  | 'practical_analyst'  // 실용적 분석가 (논리+엄격+화해)
  | 'careful_mediator'   // 신중한 중재자 (논리+관용+원칙)
  | 'balanced_sage'      // 균형의 현자   (논리+관용+화해)
  | 'instinct_judge'     // 직감의 심판관 (직관+엄격+원칙)
  | 'passion_arbiter'    // 열정의 조정관 (직관+엄격+화해)
  | 'gentle_guardian'    // 온화한 수호자 (직관+관용+원칙)
  | 'warm_mediator'      // 따뜻한 중재자 (직관+관용+화해)
  | 'neutral_observer'   // 중립의 관찰자 (중립×3)

// ── 타이틀 정의 ──

export interface TitleDefinition {
  id: TitleId
  name: string
  subtitle: string
  /** 필요 조각 3종 (축별 1개씩) */
  requiredFragments: [FragmentId, FragmentId, FragmentId]
  /** 레벨별 효과 설명 */
  effects: Record<number, string>
}

export const TITLE_TABLE: readonly TitleDefinition[] = [
  {
    id: 'cold_judge',
    name: '냉철한 심판자',
    subtitle: '법도의 추적자',
    requiredFragments: ['reasoning_fragment', 'severity_fragment', 'jurisprudence_fragment'],
    effects: {
      1: '모순 토큰 추가 +1',
      2: '모순 토큰 추가 +2',
      3: '모순 감지 시 관련 쟁점 하이라이트',
      4: '모순 토큰 추가 +3, 모순 쿨다운 -1턴',
      5: '모순 감지 자동 표시 + 첫 모순 추궁 효과 2배',
    },
  },
  {
    id: 'practical_analyst',
    name: '실용적 분석가',
    subtitle: '해결의 설계자',
    requiredFragments: ['reasoning_fragment', 'severity_fragment', 'reconciliation_fragment'],
    effects: {
      1: '증거 조합 힌트 표시',
      2: '증거 조합 성공 시 추가 정보 획득',
      3: '증거 조사 비용 1 할인 (최소 1)',
      4: '미발견 조합 존재 시 알림',
      5: '첫 증거 조합 자동 발견 + 조사 비용 2 할인',
    },
  },
  {
    id: 'careful_mediator',
    name: '신중한 중재자',
    subtitle: '신뢰의 설계자',
    requiredFragments: ['reasoning_fragment', 'leniency_fragment', 'jurisprudence_fragment'],
    effects: {
      1: '증인 증언 depth +1 보너스',
      2: '증인 실패 시 토큰 환불',
      3: '증인 full depth 도달 시 추가 정보',
      4: '증인 소환 비용 1 할인',
      5: '첫 증인 무료 소환 + depth 항상 +1',
    },
  },
  {
    id: 'balanced_sage',
    name: '균형의 현자',
    subtitle: '공정의 수호자',
    requiredFragments: ['reasoning_fragment', 'leniency_fragment', 'reconciliation_fragment'],
    effects: {
      1: '양측 심문 시 교차 힌트 표시',
      2: '양측 S3+ 도달 시 보너스 조각 +1',
      3: '판결 Wisdom 기본 +3',
      4: '중재 효과 보정 +2',
      5: '양측 동시 심문 가능 + Wisdom +8',
    },
  },
  {
    id: 'instinct_judge',
    name: '직감의 심판관',
    subtitle: '본능의 추적자',
    requiredFragments: ['empathy_fragment', 'severity_fragment', 'jurisprudence_fragment'],
    effects: {
      1: '동기탐색 누설미터 +5 보너스',
      2: '숨겨진 쟁점 발견 확률 증가',
      3: '동기탐색 연속 성공 시 추가 전이',
      4: '누설미터 40%+ 시 자동 힌트',
      5: '숨겨진 쟁점 첫 턴 자동 힌트 + 누설미터 +10',
    },
  },
  {
    id: 'passion_arbiter',
    name: '열정의 조정관',
    subtitle: '정의의 불꽃',
    requiredFragments: ['empathy_fragment', 'severity_fragment', 'reconciliation_fragment'],
    effects: {
      1: '감정 폭발 감지 시 선택지 확장',
      2: '끼어들기 이벤트 시 추가 정보',
      3: '감정 격앙 상태에서 사실추궁 효과 +50%',
      4: '감정 이벤트 발생 빈도 증가',
      5: '감정 폭발 시 자동 전이 + 사실추궁 효과 2배',
    },
  },
  {
    id: 'gentle_guardian',
    name: '온화한 수호자',
    subtitle: '원칙의 품격',
    requiredFragments: ['empathy_fragment', 'leniency_fragment', 'jurisprudence_fragment'],
    effects: {
      1: '공감접근 신뢰도 +3 보너스',
      2: '공감접근 연속 시 피로도 감소',
      3: '신뢰 임계치 -5 (자백 유도 촉진)',
      4: '공감접근 시 상대 감정 상태 표시',
      5: '공감접근 신뢰도 +8, 임계치 -10, 피로도 면역',
    },
  },
  {
    id: 'warm_mediator',
    name: '따뜻한 중재자',
    subtitle: '화해의 길잡이',
    requiredFragments: ['empathy_fragment', 'leniency_fragment', 'reconciliation_fragment'],
    effects: {
      1: '비공개보호 시 신뢰도 추가 +5',
      2: '분리심문 시 솔직도 보너스 증가',
      3: '법정 지배력 행동 시 추가 정보 획득',
      4: '비공개보호 효과 2배',
      5: '법정 지배력 행동 무제한 효과 + 신뢰도 +15',
    },
  },
  {
    id: 'neutral_observer',
    name: '중립의 관찰자',
    subtitle: '균형의 눈',
    requiredFragments: ['inquiry_fragment', 'deliberation_fragment', 'balance_fragment'],
    effects: {
      1: '턴 보너스 +1',
      2: '모든 쟁점 초기 상태 힌트',
      3: '턴 보너스 +2, 교착 피드백 강화',
      4: '첫 턴 모든 액션 효과 +30%',
      5: '턴 보너스 +3, 모든 심문 피로도 감소, 초기 힌트 확장',
    },
  },
] as const

// ── 레벨업 비용 ──

/** 각 조각별 소비량 (3종 각각 동일) */
const LEVEL_COSTS: Record<number, number> = {
  0: 2,   // Lv.0→1: ×2 × 3종 = 6
  1: 4,   // Lv.1→2: ×4 × 3종 = 12
  2: 6,   // Lv.2→3: ×6 × 3종 = 18
  3: 9,   // Lv.3→4: ×9 × 3종 = 27
  4: 12,  // Lv.4→5: ×12 × 3종 = 36
}

export const MAX_TITLE_LEVEL = 5

export function getTitleLevelCost(currentLevel: number): number | null {
  return LEVEL_COSTS[currentLevel] ?? null
}

/** 레벨업 가능 여부 */
export function canLevelUpTitle(
  titleId: TitleId,
  titleLevels: TitleLevels,
  inventory: FragmentInventory,
): boolean {
  const level = titleLevels[titleId]
  if (level >= MAX_TITLE_LEVEL) return false

  const cost = LEVEL_COSTS[level]
  if (cost == null) return false

  const def = TITLE_TABLE.find(t => t.id === titleId)!
  return def.requiredFragments.every(fid => inventory[fid] >= cost)
}

/** 레벨업 실행 */
export function levelUpTitle(
  titleId: TitleId,
  titleLevels: TitleLevels,
  inventory: FragmentInventory,
): { titleLevels: TitleLevels; inventory: FragmentInventory } | null {
  if (!canLevelUpTitle(titleId, titleLevels, inventory)) return null

  const level = titleLevels[titleId]
  const cost = LEVEL_COSTS[level]!
  const def = TITLE_TABLE.find(t => t.id === titleId)!

  const newInventory = { ...inventory }
  for (const fid of def.requiredFragments) {
    newInventory[fid] -= cost
  }

  const newLevels = { ...titleLevels, [titleId]: level + 1 }
  return { titleLevels: newLevels, inventory: newInventory }
}

// ── 타이틀 레벨 상태 ──

export type TitleLevels = Record<TitleId, number>

export function createDefaultTitleLevels(): TitleLevels {
  return {
    cold_judge: 0,
    practical_analyst: 0,
    careful_mediator: 0,
    balanced_sage: 0,
    instinct_judge: 0,
    passion_arbiter: 0,
    gentle_guardian: 0,
    warm_mediator: 0,
    neutral_observer: 0,
  }
}

// ── 장착 ──

export interface TitleLoadout {
  slot1: TitleId | null
  slot2: TitleId | null
}

export function createDefaultLoadout(): TitleLoadout {
  return { slot1: null, slot2: null }
}

/** 장착 가능 여부 (Lv.1 이상 + 중복 방지) */
export function canEquipTitle(
  titleId: TitleId,
  slot: 'slot1' | 'slot2',
  titleLevels: TitleLevels,
  loadout: TitleLoadout,
): boolean {
  if (titleLevels[titleId] < 1) return false
  const otherSlot = slot === 'slot1' ? 'slot2' : 'slot1'
  return loadout[otherSlot] !== titleId
}

// ── 활성 효과 수집 ──

export interface ActiveTitleEffect {
  titleId: TitleId
  level: number
  description: string
}

export function getActiveTitleEffects(
  titleLevels: TitleLevels,
  loadout: TitleLoadout,
): ActiveTitleEffect[] {
  const effects: ActiveTitleEffect[] = []
  for (const slot of [loadout.slot1, loadout.slot2]) {
    if (!slot) continue
    const level = titleLevels[slot]
    if (level < 1) continue
    const def = TITLE_TABLE.find(t => t.id === slot)!
    effects.push({
      titleId: slot,
      level,
      description: def.effects[level] ?? '',
    })
  }
  return effects
}

/** 타이틀 정의 조회 */
export function getTitleById(titleId: TitleId): TitleDefinition | undefined {
  return TITLE_TABLE.find(t => t.id === titleId)
}
