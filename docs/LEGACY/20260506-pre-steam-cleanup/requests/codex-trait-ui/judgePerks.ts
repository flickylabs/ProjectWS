// ── 재판관 퍼크 시스템 v2 ── 강화 기반 해금 ──

import type { TraitId } from './judgeProgressionEngine'

export type PerkId =
  // ── Major 퍼크 (Lv3 해금, 1개 장착) ──
  | 'logical_eye'          // 논리: 증거 조사 시 핵심 단서 하이라이트 (상시)
  | 'intuitive_sense'      // 직관: 첫 심문 시 NPC 감정+취약 쟁점 표시
  | 'cold_observation'     // 엄격: NPC 감정 미터 수치 표시 + 폭발 2턴 전 경고 (상시)
  | 'second_chance'        // 관용: 증거 제시/심문 실패 시 철회+재선택 (사건당 3회)
  | 'thorough_investigator' // 원칙: 증거 조합 가능 조합 1개 힌트 표시 (사건당)
  | 'bridge_of_hearts'     // 화해: 공감접근 시 신뢰도 획득량 +50% (상시)
  // ── Minor 퍼크 (Lv1 해금, 1개 장착) ──
  | 'contradiction_sense'  // 논리: 모순 토큰 +2로 시작
  | 'compare_expand'       // 논리: 발언 비교 슬롯 3개 확장
  | 'leak_boost'           // 직관: 누설 미터 초기값 +15%
  | 'fatigue_resist'       // 엄격: 교착 진입 streak 3→4 완화 (상시)
  | 'pattern_alert'        // 엄격: 유사 패턴 발견 시 자동 알림 (상시)
  | 'trust_foundation'     // 관용: 첫 심문에서 trust +10 보너스
  | 'legality_eye'         // 원칙: 위법 증거에 경고 아이콘 상시 표시
  | 'auto_summary'         // 원칙: 매 3턴마다 쟁점 진행도 자동 요약 (상시)
  | 'interjection_preview' // 화해: 끼어들기 시 NPC 반응 미리보기 (상시)

export interface PerkDefinition {
  id: PerkId
  name: string
  description: string
  tier: 'major' | 'minor'
  /** 해금에 필요한 성향 경로 */
  requiredTrait: TraitId
  /** major: Lv3, minor: Lv1 */
  requiredLevel: number
  /** 수치 효과 키-값 */
  effect: Record<string, number>
}

export const PERK_TABLE: PerkDefinition[] = [
  // ── Major 퍼크 (Lv3) ──
  {
    id: 'logical_eye', name: '논리의 눈',
    description: '증거 조사 시 핵심 단서가 하이라이트 표시됩니다.',
    tier: 'major', requiredTrait: 'logical', requiredLevel: 3,
    effect: { evidenceHighlightEnabled: 1 },
  },
  {
    id: 'intuitive_sense', name: '직감의 촉',
    description: '첫 심문에서 NPC의 감정 상태와 가장 취약한 쟁점이 표시됩니다.',
    tier: 'major', requiredTrait: 'intuitive', requiredLevel: 3,
    effect: { firstTurnInsightEnabled: 1 },
  },
  {
    id: 'cold_observation', name: '냉정한 관찰',
    description: 'NPC 감정 미터가 수치로 보이며, 감정 폭발 2턴 전에 경고합니다.',
    tier: 'major', requiredTrait: 'strict', requiredLevel: 3,
    effect: { emotionMeterVisible: 1, burstWarningTurns: 2 },
  },
  {
    id: 'second_chance', name: '두 번째 기회',
    description: '잘못된 증거 제시나 심문 실패 시 철회하고 재선택할 수 있습니다. (사건당 3회)',
    tier: 'major', requiredTrait: 'lenient', requiredLevel: 3,
    effect: { retryUsesPerCase: 3 },
  },
  {
    id: 'thorough_investigator', name: '철저한 수사관',
    description: '증거 조합 가능한 조합 1개가 힌트로 표시됩니다.',
    tier: 'major', requiredTrait: 'principled', requiredLevel: 3,
    effect: { combinationHintCount: 1 },
  },
  {
    id: 'bridge_of_hearts', name: '마음의 다리',
    description: '공감접근 시 신뢰도 획득량이 50% 증가합니다.',
    tier: 'major', requiredTrait: 'reconciling', requiredLevel: 3,
    effect: { empathyTrustMultiplier: 50 },
  },

  // ── Minor 퍼크 (Lv1) ──
  {
    id: 'contradiction_sense', name: '모순 감각',
    description: '모순 토큰 +2로 시작합니다.',
    tier: 'minor', requiredTrait: 'logical', requiredLevel: 1,
    effect: { startContradictionBonus: 2 },
  },
  {
    id: 'compare_expand', name: '비교 확장',
    description: '발언 비교 슬롯이 3개로 확장됩니다.',
    tier: 'minor', requiredTrait: 'logical', requiredLevel: 1,
    effect: { compareSlots: 3 },
  },
  {
    id: 'leak_boost', name: '누설 감지',
    description: '누설 미터 초기값 +15%로 시작합니다.',
    tier: 'minor', requiredTrait: 'intuitive', requiredLevel: 1,
    effect: { startLeakBoost: 15 },
  },
  {
    id: 'fatigue_resist', name: '집요한 추궁',
    description: '교착 상태 진입이 streak 3에서 4로 완화됩니다.',
    tier: 'minor', requiredTrait: 'strict', requiredLevel: 1,
    effect: { stalemateStreakExtend: 1 },
  },
  {
    id: 'pattern_alert', name: '선례 감각',
    description: '유사 패턴 발견 시 자동으로 알림이 표시됩니다.',
    tier: 'minor', requiredTrait: 'strict', requiredLevel: 1,
    effect: { patternAlertEnabled: 1 },
  },
  {
    id: 'trust_foundation', name: '신뢰의 기반',
    description: '첫 심문에서 trust +10 보너스를 받습니다.',
    tier: 'minor', requiredTrait: 'lenient', requiredLevel: 1,
    effect: { startTrustBonus: 10 },
  },
  {
    id: 'legality_eye', name: '법의 눈',
    description: '위법 증거에 경고 아이콘이 표시됩니다.',
    tier: 'minor', requiredTrait: 'principled', requiredLevel: 1,
    effect: { legalityHintEnabled: 1 },
  },
  {
    id: 'auto_summary', name: '자동 정리',
    description: '매 3턴마다 쟁점 진행도가 자동으로 요약됩니다.',
    tier: 'minor', requiredTrait: 'principled', requiredLevel: 1,
    effect: { autoSummaryInterval: 3 },
  },
  {
    id: 'interjection_preview', name: '경청의 힘',
    description: '끼어들기 시 NPC 반응을 미리 볼 수 있습니다.',
    tier: 'minor', requiredTrait: 'reconciling', requiredLevel: 1,
    effect: { interjectionPreviewEnabled: 1 },
  },
]

/** 특정 성향에서 해금 가능한 퍼크 목록 */
export function getAvailablePerks(
  traitId: TraitId,
  traitLevel: number,
): PerkDefinition[] {
  return PERK_TABLE.filter(p =>
    p.requiredTrait === traitId && traitLevel >= p.requiredLevel,
  )
}

/** 전체 해금된 퍼크 (장착 선택용) */
export function getAllUnlockedPerks(
  traits: Record<TraitId, { level: number }>,
  tier: 'major' | 'minor',
): PerkDefinition[] {
  return PERK_TABLE.filter(p => {
    if (p.tier !== tier) return false
    const traitLevel = traits[p.requiredTrait]?.level ?? 0
    return traitLevel >= p.requiredLevel
  })
}

/** ID로 퍼크 정의 조회 */
export function getPerkById(id: PerkId): PerkDefinition | undefined {
  return PERK_TABLE.find(p => p.id === id)
}

/** 장착 퍼크 effect 합산 (게임 시작 시 적용) */
export function getEquippedEffects(
  majorId: PerkId | null,
  minorId: PerkId | null,
): Record<string, number> {
  const effects: Record<string, number> = {}
  for (const id of [majorId, minorId]) {
    if (!id) continue
    const perk = getPerkById(id)
    if (!perk) continue
    for (const [key, value] of Object.entries(perk.effect)) {
      effects[key] = (effects[key] ?? 0) + value
    }
  }
  return effects
}
