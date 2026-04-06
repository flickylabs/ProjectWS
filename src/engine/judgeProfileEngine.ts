import type { VerdictInput, ProcessMetrics } from '../types'
import type { PerkId } from './judgePerks'
import { getSolutionOrientationByText } from '../data/solutionOrientations'

// ── 타입 ──

export type JudgeTier = 'apprentice' | 'regular' | 'veteran' | 'senior' | 'legendary'

export interface JudgeProfile {
  inquiryAxis: number      // -100(논리) ~ +100(직관) — UI 호환용 (level * 33)
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

// ── 드리프트 시스템 타입 ──

export interface AxisLevelState {
  level: number       // -3 ~ +3
  progress: number    // 현재 레벨 내 진행도 (0~임계치)
}

export interface JudgeDriftState {
  inquiry: AxisLevelState
  judgment: AxisLevelState
  resolution: AxisLevelState
  casesProcessed: number
  lastUpdated: string
  schemaVersion: 2
}

// ── 초기값 ──

export function createDefaultDriftState(): JudgeDriftState {
  return {
    inquiry: { level: 0, progress: 0 },
    judgment: { level: 0, progress: 0 },
    resolution: { level: 0, progress: 0 },
    casesProcessed: 0,
    lastUpdated: new Date().toISOString(),
    schemaVersion: 2,
  }
}

// ── 단일 사건 성향 계산 ──

export function deriveCaseProfile(
  input: VerdictInput,
  metrics: ProcessMetrics,
  disputes: { id: string; ambiguity?: string; truth: boolean }[],
  caseId?: string,
  solutions?: Record<string, string[]>,
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

  // 축 3: 해결 (원칙 <-> 화해) — solution orientation tag 기반 (Codex 제안 공식)
  let resolution = 0
  if (caseId && solutions) {
    const mapped = input.selectedSolutions.map((entry) => {
      const sep = entry.indexOf('::')
      if (sep < 0) return 'hybrid' as const
      const category = entry.slice(0, sep)
      const optionText = entry.slice(sep + 2)
      return getSolutionOrientationByText(caseId, category, optionText, solutions)
    })
    const total = mapped.length
    const principle = mapped.filter(v => v === 'principle').length
    const reconcile = mapped.filter(v => v === 'reconcile').length
    const orientationMean = total > 0 ? (reconcile - principle) / total : 0
    resolution = Math.round(
      orientationMean * 80 +
      (metrics.bothSidesQuestioned ? 8 : -4) +
      (total > 0 ? 6 : -6),
    )
  } else {
    resolution = Math.round(
      (input.selectedSolutions.length > 0 ? 6 : -6) +
      (metrics.bothSidesQuestioned ? 8 : -4),
    )
  }

  return {
    inquiry: clamp(inquiry, -100, 100),
    judgment: clamp(judgment, -100, 100),
    resolution: clamp(resolution, -100, 100),
  }
}

// ── 드리프트 축 승급/강등 로직 ──

/** 레벨별 승급 임계치: Lv0→1: 3p, Lv1→2: 4p, Lv2→3: 5p */
export function getThreshold(absLevel: number): number {
  return absLevel + 3 // absLevel 0→3, 1→4, 2→5
}

/** 사건 결과 → delta 변환: |caseAxis| < 15 → 0, 15~44 → ±1, >= 45 → ±2 */
export function toDelta(caseAxis: number): number {
  const abs = Math.abs(caseAxis)
  if (abs < 15) return 0
  if (abs < 45) return caseAxis > 0 ? 1 : -1
  return caseAxis > 0 ? 2 : -2
}

/**
 * 축 단계 전이 함수.
 * delta: +1/+2 (양수 방향) 또는 -1/-2 (음수 방향)
 */
export function advanceAxis(state: AxisLevelState, delta: number): AxisLevelState {
  if (delta === 0) return state

  let { level, progress } = state
  const deltaDirection = delta > 0 ? 1 : -1
  const absDelta = Math.abs(delta)

  // 현재 방향 판정: level이 0이면 어느 방향이든 "같은 방향"으로 취급
  const currentDirection = level > 0 ? 1 : level < 0 ? -1 : 0

  if (currentDirection === 0 || currentDirection === deltaDirection) {
    // ── 같은 방향 (또는 Lv0) → progress 증가 ──
    progress += absDelta

    // 승급 루프: progress가 임계치 이상이면 레벨 업
    let absLv = Math.abs(level)
    while (absLv < 3) {
      const threshold = getThreshold(absLv)
      if (progress >= threshold) {
        progress -= threshold
        absLv++
        level = absLv * deltaDirection
      } else {
        break
      }
    }

    // Lv3 cap: 더 이상 올라가지 않음, progress는 현 임계치 내로 제한
    if (Math.abs(level) >= 3) {
      level = 3 * deltaDirection
      progress = Math.min(progress, getThreshold(2)) // cap at Lv2→3 threshold (5)
    }
  } else {
    // ── 반대 방향 → progress 감소 ──
    progress -= absDelta

    if (progress < 0) {
      const overflow = -progress // 남은 delta (양수)
      const absLv = Math.abs(level)

      if (absLv > 1) {
        // Lv2+ → 한 단계 강등, progress는 이전 레벨 임계치의 절반에서 시작
        level = (absLv - 1) * currentDirection
        const prevThreshold = getThreshold(Math.abs(level))
        progress = Math.floor(prevThreshold / 2)
      } else if (absLv === 1) {
        // Lv1 → Lv0으로 강등
        level = 0
        // overflow가 있으면 반대 방향 progress로 전환
        if (overflow > 0) {
          level = deltaDirection
          progress = overflow
          // 바로 승급하지는 않음 (한 사건에서 2단계 점프 방지)
          const threshold = getThreshold(1) // Lv1→2 threshold
          if (progress >= threshold) progress = threshold - 1
        } else {
          progress = 0
        }
      } else {
        // 이미 Lv0 → 반대 방향으로 넘어감 (currentDirection===0일 때는 여기 안 옴)
        level = deltaDirection
        progress = overflow
        const threshold = getThreshold(1)
        if (progress >= threshold) progress = threshold - 1
      }
    }
    // progress가 0 이상이면 그냥 감소만 된 것
  }

  return {
    level: clamp(level, -3, 3),
    progress: Math.max(0, progress),
  }
}

// ── 드리프트 업데이트 ──

export function applyDriftUpdate(
  driftState: JudgeDriftState,
  caseProfile: { inquiry: number; judgment: number; resolution: number },
  metrics: ProcessMetrics,
  selectedSolutionsCount: number,
): JudgeDriftState {
  // 신뢰도 게이트 체크
  const inquiryGate = (metrics.factQuestionsAsked || 0) + (metrics.empathyQuestionsAsked || 0) >= 3
  const resolutionGate = selectedSolutionsCount >= 1 || metrics.bothSidesQuestioned

  const inquiryDelta = toDelta(caseProfile.inquiry)
  const judgmentDelta = toDelta(caseProfile.judgment)
  const resolutionDelta = toDelta(caseProfile.resolution)

  return {
    inquiry: inquiryGate ? advanceAxis(driftState.inquiry, inquiryDelta) : driftState.inquiry,
    judgment: advanceAxis(driftState.judgment, judgmentDelta), // 항상 유효
    resolution: resolutionGate ? advanceAxis(driftState.resolution, resolutionDelta) : driftState.resolution,
    casesProcessed: driftState.casesProcessed + 1,
    lastUpdated: new Date().toISOString(),
    schemaVersion: 2,
  }
}

// ── 누적 프로필 계산 (드리프트 기반) ──

export function deriveJudgeProfile(
  driftState: JudgeDriftState,
  recentTitleHistory?: string[],
  savedPerks?: { major: PerkId | null; minor: PerkId | null },
): JudgeProfile {
  if (driftState.casesProcessed === 0) {
    return {
      inquiryAxis: 0, judgmentAxis: 0, resolutionAxis: 0,
      titleId: 'neutral_observer', subtags: [],
      casesCompleted: 0, tier: 'apprentice',
      majorPerk: null, minorPerk: null, isStabilized: false,
    }
  }

  // level → axis 값 변환: level * 33 (Lv1=±33, Lv2=±66, Lv3=±100 으로 근사)
  const inquiryAxis = clamp(levelToAxis(driftState.inquiry.level), -100, 100)
  const judgmentAxis = clamp(levelToAxis(driftState.judgment.level), -100, 100)
  const resolutionAxis = clamp(levelToAxis(driftState.resolution.level), -100, 100)

  // 칭호 결정: 최근 5건 최빈 칭호가 있으면 사용, 없으면 축값으로 결정
  let titleId: string
  if (recentTitleHistory && recentTitleHistory.length > 0) {
    titleId = getMostFrequentTitle(recentTitleHistory)
  } else {
    titleId = resolveTitle(inquiryAxis, judgmentAxis, resolutionAxis)
  }
  const subtags = resolveSubtags(inquiryAxis, judgmentAxis, resolutionAxis)

  // 성장 시스템
  const casesCompleted = driftState.casesProcessed
  const isStabilized = computeStabilizationFromDrift(driftState)
  const tier = computeTier(casesCompleted, isStabilized)

  // 퍼크 해금: Lv2→minor, Lv3→major (축 값 기준 |66| 이상 → major, |33| 이상 → minor)
  return {
    inquiryAxis, judgmentAxis, resolutionAxis, titleId, subtags,
    casesCompleted, tier,
    majorPerk: savedPerks?.major ?? null,
    minorPerk: savedPerks?.minor ?? null,
    isStabilized,
  }
}

/** level → UI 호환 axis 값: Lv0=0, Lv1=±33, Lv2=±66, Lv3=±100 */
function levelToAxis(level: number): number {
  const abs = Math.abs(level)
  if (abs === 0) return 0
  if (abs === 1) return 33 * Math.sign(level)
  if (abs === 2) return 66 * Math.sign(level)
  return 100 * Math.sign(level) // Lv3
}

/** 최빈 칭호 계산 */
function getMostFrequentTitle(titles: string[]): string {
  const freq: Record<string, number> = {}
  for (const t of titles) {
    freq[t] = (freq[t] || 0) + 1
  }
  let best = titles[0]
  let bestCount = 0
  for (const [t, count] of Object.entries(freq)) {
    if (count > bestCount) {
      best = t
      bestCount = count
    }
  }
  return best
}

/** 안정화 판정 (드리프트 기반): 4건 이상 + |level| >= 1인 축이 하나 이상 */
function computeStabilizationFromDrift(drift: JudgeDriftState): boolean {
  if (drift.casesProcessed < 4) return false
  const hasStrongAxis =
    Math.abs(drift.inquiry.level) >= 1 ||
    Math.abs(drift.judgment.level) >= 1 ||
    Math.abs(drift.resolution.level) >= 1
  return hasStrongAxis
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

// ── 레벨 라벨 (UI용) ──

export const LEVEL_LABELS: Record<number, string> = {
  [-3]: '강',
  [-2]: '중',
  [-1]: '약',
  0: '균형',
  1: '약',
  2: '중',
  3: '강',
}
