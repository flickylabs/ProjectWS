/**
 * Archetype 힌트 엔진
 * ────────────────
 * NPC의 archetype/tell을 직접 노출하지 않고,
 * 첫 2-3턴 반응에서 자연스러운 행동 힌트를 제공한다.
 * 플레이어는 이 힌트를 통해 최적의 심문 전략을 학습한다.
 */

export interface ArchetypeHint {
  /** 힌트 텍스트 (UI에 표시) */
  text: string
  /** 이 행동 패턴에 효과적인 접근법 */
  effectiveApproach: 'fact_pursuit' | 'motive_search' | 'empathy_approach'
  /** 힌트 강도 (subtle/clear) */
  strength: 'subtle' | 'clear'
}

/** archetype별 행동 힌트 테이블 */
const ARCHETYPE_HINTS: Record<string, ArchetypeHint[]> = {
  avoidant: [
    { text: '직접적인 질문을 피하고 절차를 언급합니다', effectiveApproach: 'fact_pursuit', strength: 'subtle' },
    { text: '핵심에서 벗어나 다른 이야기로 넘어가려 합니다', effectiveApproach: 'fact_pursuit', strength: 'clear' },
  ],
  confrontational: [
    { text: '짧고 날카로운 문장으로 반격합니다', effectiveApproach: 'empathy_approach', strength: 'subtle' },
    { text: '질문에 질문으로 되받아칩니다', effectiveApproach: 'empathy_approach', strength: 'clear' },
  ],
  victim_cosplay: [
    { text: '모든 답변을 자신의 피해로 연결합니다', effectiveApproach: 'motive_search', strength: 'subtle' },
    { text: '"저는요...", "저만..." 식의 표현을 반복합니다', effectiveApproach: 'motive_search', strength: 'clear' },
  ],
  cold_logic: [
    { text: '숫자와 순서를 과도하게 정밀하게 나열합니다', effectiveApproach: 'empathy_approach', strength: 'subtle' },
    { text: '"첫째, 둘째" 식으로 감정을 배제하고 논리만 씁니다', effectiveApproach: 'empathy_approach', strength: 'clear' },
  ],
  affect_flattening: [
    { text: '감정이 거의 드러나지 않는 단조로운 답변입니다', effectiveApproach: 'empathy_approach', strength: 'subtle' },
    { text: '"네, 그렇게 했습니다" 식의 극도로 짧은 답변을 합니다', effectiveApproach: 'motive_search', strength: 'clear' },
  ],
  premature_summary: [
    { text: '핵심을 피하며 사소한 것으로 정리하려 합니다', effectiveApproach: 'fact_pursuit', strength: 'subtle' },
    { text: '"그건 큰 의미가 없고..." 라며 중요한 부분을 넘기려 합니다', effectiveApproach: 'fact_pursuit', strength: 'clear' },
  ],
}

/** verbal tell별 부가 힌트 */
const TELL_HINTS: Record<string, string> = {
  over_precision: '시간/숫자를 과하게 정확히 말합니다 — 감추고 싶은 것이 있을 수 있습니다',
  counter_question: '궁지에 몰리면 상대 행동으로 되묻습니다',
  timeline_padding: '핵심 회피를 위해 동선을 장황하게 나열합니다',
  evidence_waving: '하나의 증거로 모든 것을 단정짓습니다',
  motive_jump: '상대 행동에서 악의를 즉시 단정합니다',
  selective_quote: '상대 발언의 약점만 골라 반복합니다',
}

// ── 세션 내 힌트 표시 추적 (NPC별) ──
const _hintsShownCount: Record<string, number> = { a: 0, b: 0 }

/** 세션(사건) 시작 시 초기화 */
export function resetHintTracker(): void {
  _hintsShownCount.a = 0
  _hintsShownCount.b = 0
}

/**
 * 현재 턴에서 보여줄 힌트를 선택한다.
 * 턴 1-2: subtle, 턴 3+: clear (한 번만)
 */
export function selectHint(
  archetype: string,
  tell: string,
  turnNumber: number,
  party: 'a' | 'b',
): ArchetypeHint | null {
  const hintsAlreadyShown = _hintsShownCount[party] ?? 0
  if (hintsAlreadyShown >= 2) return null  // 최대 2회

  const hints = ARCHETYPE_HINTS[archetype]
  if (!hints) return null

  if (turnNumber <= 2 && hintsAlreadyShown === 0) {
    return hints[0]  // subtle hint
  }
  if (turnNumber >= 3 && hintsAlreadyShown === 1) {
    return hints[1]  // clear hint
  }
  return null
}

/** 힌트 표시 후 카운트 증가 */
export function markHintShown(party: 'a' | 'b'): void {
  _hintsShownCount[party] = (_hintsShownCount[party] ?? 0) + 1
}

/**
 * verbal tell 힌트 텍스트 반환
 */
export function getTellHint(tell: string): string | null {
  return TELL_HINTS[tell] ?? null
}
