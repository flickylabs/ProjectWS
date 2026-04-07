// ── 재판관 퍼크 시스템 ──

export type PerkId =
  | 'evidence_preview'      // 논리형 메이저: 증거 1단계 미리보기
  | 'free_summary'          // 직관형 메이저: 요약 1회 무료
  | 'burst_early_warning'   // 엄격형 메이저: 폭발 예고 조기 감지
  | 'penalty_buffer'        // 관용형 메이저: 잘못된 증거 제시 시 철회/재프레이밍 선택지
  | 'extra_invest_token'    // 원칙형 메이저: 조사 토큰 +1
  | 'skill_refund'          // 화해형 메이저: 첫 사건 스킬 조건부 환급
  | 'contradiction_start'   // 논리형 마이너: 모순 토큰 +1 시작
  | 'leak_boost'            // 직관형 마이너: 누설 미터 +5%
  | 'fatigue_extend'        // 엄격형 마이너: 같은 쟁점에서 질문 각도 전환 기회 1회
  | 'trust_start'           // 관용형 마이너: 시작 시 1회 한정 관계 완충 질문 개방
  | 'legality_hint'         // 원칙형 마이너: 위법 증거 감지 힌트
  | 'interjection_upgrade'  // 화해형 마이너: 끼어들기 정보 레벨 +1

export interface PerkDefinition {
  id: PerkId
  name: string
  description: string
  tier: 'major' | 'minor'
  requiredAxis: 'inquiry' | 'judgment' | 'resolution'
  requiredDirection: 'negative' | 'positive'  // negative=논리/엄격/원칙, positive=직관/관용/화해
  /** 수치 효과 */
  effect: Record<string, number>
}

export const PERK_TABLE: PerkDefinition[] = [
  // ── 메이저 퍼크 ──
  {
    id: 'evidence_preview', name: '증거 미리보기', description: '증거 1단계를 턴 소비 없이 확인',
    tier: 'major', requiredAxis: 'inquiry', requiredDirection: 'negative',
    effect: { evidencePreviewCount: 1 },
  },
  {
    id: 'free_summary', name: '무료 요약', description: '요약 1회 무료',
    tier: 'major', requiredAxis: 'inquiry', requiredDirection: 'positive',
    effect: { freeSummaryCount: 1 },
  },
  {
    id: 'burst_early_warning', name: '폭발 예고', description: '감정 폭발 1턴 전 경고',
    tier: 'major', requiredAxis: 'judgment', requiredDirection: 'negative',
    effect: { burstWarningTurns: 1 },
  },
  {
    id: 'penalty_buffer', name: '판결 완충', description: '잘못된 증거 제시 시 첫 1회 철회/재프레이밍 선택지 제공',
    tier: 'major', requiredAxis: 'judgment', requiredDirection: 'positive',
    effect: { penaltyBufferUsesRemaining: 1 },
  },
  {
    id: 'extra_invest_token', name: '추가 조사', description: '조사 토큰 +1로 시작',
    tier: 'major', requiredAxis: 'resolution', requiredDirection: 'negative',
    effect: { extraInvestTokens: 1 },
  },
  {
    id: 'skill_refund', name: '스킬 환급', description: '첫 스킬 사용 시 포인트 환급',
    tier: 'major', requiredAxis: 'resolution', requiredDirection: 'positive',
    effect: { skillRefundCount: 1 },
  },
  // ── 마이너 퍼크 ──
  {
    id: 'contradiction_start', name: '모순 감각', description: '모순 토큰 +1로 시작',
    tier: 'minor', requiredAxis: 'inquiry', requiredDirection: 'negative',
    effect: { firstTargetContradictionBonus: 1 },
  },
  {
    id: 'leak_boost', name: '누설 감지', description: '누설 미터 초기값 +5%',
    tier: 'minor', requiredAxis: 'inquiry', requiredDirection: 'positive',
    effect: { startLeakBoost: 5 },
  },
  {
    id: 'fatigue_extend', name: '집요한 추궁', description: '같은 쟁점에서 질문 각도 전환 기회 1회',
    tier: 'minor', requiredAxis: 'judgment', requiredDirection: 'negative',
    effect: { angleSwitchOpportunity: 1 },
  },
  {
    id: 'trust_start', name: '신뢰의 기반', description: '시작 시 1회 한정 관계 완충 질문 개방',
    tier: 'minor', requiredAxis: 'judgment', requiredDirection: 'positive',
    effect: { relationBufferQuestionAvailable: 1 },
  },
  {
    id: 'legality_hint', name: '법의 눈', description: '위법 증거에 힌트 표시',
    tier: 'minor', requiredAxis: 'resolution', requiredDirection: 'negative',
    effect: { legalityHintEnabled: 1 },
  },
  {
    id: 'interjection_upgrade', name: '경청의 힘', description: '끼어들기 정보 레벨 +1',
    tier: 'minor', requiredAxis: 'resolution', requiredDirection: 'positive',
    effect: { interjectionLevelBoost: 1 },
  },
]

/** 현재 프로필에서 선택 가능한 퍼크 목록 (minor: Lv2+, major: Lv3+) */
export function getAvailablePerks(
  levels: { inquiry: number; judgment: number; resolution: number },
  tier: 'major' | 'minor',
): PerkDefinition[] {
  const threshold = tier === 'minor' ? 2 : 3
  return PERK_TABLE.filter(p => {
    if (p.tier !== tier) return false
    const level = levels[p.requiredAxis]
    if (Math.abs(level) < threshold) return false
    return p.requiredDirection === 'negative' ? level < 0 : level > 0
  })
}

/** 축 값(-100~+100)을 레벨(-3~+3)로 변환 */
export function axisToLevel(axisValue: number): number {
  const sign = axisValue >= 0 ? 1 : -1
  const abs = Math.abs(axisValue)
  if (abs >= 100) return sign * 3
  if (abs >= 50) return sign * 2
  if (abs >= 20) return sign * 1
  return 0
}

/** ID로 퍼크 정의 조회 */
export function getPerkById(id: PerkId): PerkDefinition | undefined {
  return PERK_TABLE.find(p => p.id === id)
}
