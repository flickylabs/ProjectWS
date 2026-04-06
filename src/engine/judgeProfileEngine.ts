import type { VerdictInput, ProcessMetrics } from '../types'
import type { PerkId } from './judgePerks'

// ── 타입 ──

export type JudgeTier = 'apprentice' | 'regular' | 'veteran' | 'senior' | 'legendary'

export interface JudgeProfile {
  inquiryAxis: number      // -100(논리) ~ +100(직관)
  judgmentAxis: number      // -100(엄격) ~ +100(관용)
  resolutionAxis: number    // -100(원칙) ~ +100(화해)
  titleId: string
  subtags: string[]
  // 성장 시스템
  casesCompleted: number
  tier: JudgeTier
  majorPerk: PerkId | null
  minorPerk: PerkId | null
  isStabilized: boolean    // 성향 안정화 여부
}

export interface JudgeCaseTelemetryLite {
  caseId: string
  inquiry: number
  judgment: number
  resolution: number
  date: string
}

// ── 단일 사건 성향 계산 ──

export function deriveCaseProfile(
  input: VerdictInput,
  metrics: ProcessMetrics,
  disputes: { id: string; ambiguity?: string; truth: boolean }[],
): { inquiry: number; judgment: number; resolution: number } {
  // 축 1: 탐구 (논리 성공률 vs 직관 성공률)
  const factTotal = metrics.factQuestionsAsked || 1
  const empathyTotal = metrics.empathyQuestionsAsked || 1
  const factSuccessRate = (metrics.effectiveFactCount || 0) / factTotal
  const empathySuccessRate = (metrics.effectiveEmpathyCount || 0) / empathyTotal
  // 양수 = 직관형(공감 성공률 높음), 음수 = 논리형(사실 성공률 높음)
  const inquiry = Math.round((empathySuccessRate - factSuccessRate) * 100)

  // 축 2: 판결 (엄격 <-> 관용)
  const resps = Object.values(input.responsibility)
  const avgBias = resps.length > 0
    ? resps.reduce((sum, r) => sum + Math.abs(r.a - r.b), 0) / resps.length
    : 50
  // high ambiguity pending = 관용적 판단
  const highAmbPending = disputes.filter(
    d => d.ambiguity === 'high' && input.factFindings[d.id] === 'pending',
  ).length
  const totalDisputes = disputes.length || 1
  const pendingRatio = highAmbPending / totalDisputes
  // 위법 증거 불인정 비율
  const legalEntries = Object.entries(input.evidenceLegality)
  const excludedRatio = legalEntries.length > 0
    ? legalEntries.filter(([, v]) => v === false).length / legalEntries.length
    : 0
  const judgment = Math.round(
    (avgBias / 100 * -60) +     // 편차 높으면 엄격 (음수)
    (pendingRatio * 40) +        // pending 높으면 관용 (양수)
    (excludedRatio * -20) +      // 불인정 많으면 엄격 (음수)
    (metrics.interjectionAllowed * 10),  // 끼어들기 허용 -> 관용
  )

  // 축 3: 해결 (원칙 <-> 화해)
  const solutionCount = input.selectedSolutions.length
  const resolution = Math.round(
    (solutionCount * 15) +
    (metrics.bothSidesQuestioned ? 10 : -10),
  )

  return {
    inquiry: clamp(inquiry, -100, 100),
    judgment: clamp(judgment, -100, 100),
    resolution: clamp(resolution, -100, 100),
  }
}

// ── 누적 프로필 계산 ──

export function deriveJudgeProfile(
  history: JudgeCaseTelemetryLite[],
  savedPerks?: { major: PerkId | null; minor: PerkId | null },
): JudgeProfile {
  if (history.length === 0) {
    return {
      inquiryAxis: 0, judgmentAxis: 0, resolutionAxis: 0,
      titleId: 'neutral_observer', subtags: [],
      casesCompleted: 0, tier: 'apprentice',
      majorPerk: null, minorPerk: null, isStabilized: false,
    }
  }

  // 최근 8건 70% + 전체 30%
  const recent = history.slice(-8)
  const recentAvg = (field: 'inquiry' | 'judgment' | 'resolution') =>
    recent.reduce((s, h) => s + h[field], 0) / recent.length
  const allAvg = (field: 'inquiry' | 'judgment' | 'resolution') =>
    history.reduce((s, h) => s + h[field], 0) / history.length

  const inquiryAxis = Math.round(recentAvg('inquiry') * 0.7 + allAvg('inquiry') * 0.3)
  const judgmentAxis = Math.round(recentAvg('judgment') * 0.7 + allAvg('judgment') * 0.3)
  const resolutionAxis = Math.round(recentAvg('resolution') * 0.7 + allAvg('resolution') * 0.3)

  const titleId = resolveTitle(inquiryAxis, judgmentAxis, resolutionAxis)
  const subtags = resolveSubtags(inquiryAxis, judgmentAxis, resolutionAxis)

  // 성장 시스템
  const casesCompleted = history.length
  const isStabilized = computeStabilization(recent, inquiryAxis, judgmentAxis, resolutionAxis)
  const tier = computeTier(casesCompleted, isStabilized)

  return {
    inquiryAxis, judgmentAxis, resolutionAxis, titleId, subtags,
    casesCompleted, tier,
    majorPerk: savedPerks?.major ?? null,
    minorPerk: savedPerks?.minor ?? null,
    isStabilized,
  }
}

/** 안정화 판정: 최근 8건 표준편차 < 12 && |축| >= 20 */
function computeStabilization(
  recent: JudgeCaseTelemetryLite[],
  inqAxis: number, judAxis: number, resAxis: number,
): boolean {
  if (recent.length < 4) return false // 최소 4건은 있어야 판정
  const stdDev = (arr: number[]) => {
    const mean = arr.reduce((s, v) => s + v, 0) / arr.length
    const variance = arr.reduce((s, v) => s + (v - mean) ** 2, 0) / arr.length
    return Math.sqrt(variance)
  }
  const inqStd = stdDev(recent.map(h => h.inquiry))
  const judStd = stdDev(recent.map(h => h.judgment))
  const resStd = stdDev(recent.map(h => h.resolution))
  const allLowVariance = inqStd < 12 && judStd < 12 && resStd < 12
  const hasStrongAxis = Math.abs(inqAxis) >= 20 || Math.abs(judAxis) >= 20 || Math.abs(resAxis) >= 20
  return allLowVariance && hasStrongAxis
}

/** tier 결정 */
function computeTier(casesCompleted: number, isStabilized: boolean): JudgeTier {
  if (casesCompleted >= 30) return 'legendary'
  if (casesCompleted >= 20) return 'senior'
  if (casesCompleted >= 10) return 'veteran'
  if (casesCompleted >= 5 && isStabilized) return 'regular'
  return 'apprentice'
}

// ── 칭호 결정 ──

function resolveTitle(inq: number, jud: number, res: number): string {
  const isLogical = inq <= -20
  const isIntuitive = inq >= 20
  const isStrict = jud <= -20
  const isLenient = jud >= 20
  const isPrincipled = res <= -20
  const isReconciling = res >= 20

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

function resolveSubtags(inq: number, jud: number, res: number): string[] {
  const tags: string[] = []
  if (inq <= -40) tags.push('증거주의')
  if (inq >= 40) tags.push('온정주의')
  if (jud <= -40) tags.push('엄정주의')
  if (jud >= 40) tags.push('관용주의')
  if (res <= -40) tags.push('법도추구')
  if (res >= 40) tags.push('조정지향')
  return tags
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v))
}

// ── 칭호 라벨 ──

export const TITLE_LABELS: Record<string, { name: string; subtitle: string }> = {
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

// ── 등급 라벨 ──

export const TIER_LABELS: Record<JudgeTier, { name: string; emoji: string }> = {
  apprentice: { name: '견습 재판관', emoji: '📜' },
  regular: { name: '정식 재판관', emoji: '⚖️' },
  veteran: { name: '숙련 재판관', emoji: '🏛️' },
  senior: { name: '수석 재판관', emoji: '🦉' },
  legendary: { name: '전설의 재판관', emoji: '🌟' },
}

// ── 축 라벨 ──

export const AXIS_LABELS = {
  inquiry: { negative: '논리', positive: '직관', label: '탐구' },
  judgment: { negative: '엄격', positive: '관용', label: '판결' },
  resolution: { negative: '원칙', positive: '화해', label: '해결' },
} as const
