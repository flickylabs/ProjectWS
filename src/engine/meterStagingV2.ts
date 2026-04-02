/**
 * Meter Staging V2 — 미터 단계화 + 사건카드 해금 + readiness 힌트
 * ─────────────────────────────────
 * - leak / trust 수치를 단계형 텍스트로 교체
 * - 사건카드 해금: 턴 고정 → 조건 해금
 * - readinessScore는 숨기고 텍스트 힌트만 표시
 */

import type { QuestionMeterState } from './questionEffectEngine'
import type { ReadinessState } from '../types'
import { calculateReadinessScore, checkVerdictEligible } from './readinessEngine'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type MeterDisplayMode = 'staged' | 'exact'
export type LeakStage = 'stable' | 'shaken' | 'risk' | 'pre_burst'
export type TrustStage = 'closed' | 'ajar' | 'open' | 'wide_open'

export interface MeterStageSpec<TStage extends string> {
  id: TStage
  label: string
  icon: string
  tone: 'neutral' | 'warning' | 'danger' | 'positive'
  min: number
  maxInclusive: number
  helperText: string
}

export interface MeterPresentation {
  label: string
  stageLabel: string
  icon: string
  tone: MeterStageSpec<string>['tone']
  fillPct: number
  subLabel: string
}

export type DossierUnlockReason = 'first_crack' | 'contradiction_2' | 'trust_40' | 'turn_6'

export interface DossierUnlockResult {
  unlocked: boolean
  newlyUnlocked: boolean
  reason: DossierUnlockReason | null
  label: string
}

export type ReadinessHintLevel = 'not_enough' | 'progressing' | 'ready'

export interface ReadinessHintResult {
  level: ReadinessHintLevel
  label: string
  detail: string
  eligible: boolean
  highlight: 'muted' | 'info' | 'ready'
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 단계 스펙
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LEAK_STAGES: MeterStageSpec<LeakStage>[] = [
  { id: 'stable', label: '안정', icon: '○', tone: 'neutral', min: 0, maxInclusive: 24, helperText: '숨긴 동기가 표면까지 거의 올라오지 않았다.' },
  { id: 'shaken', label: '흔들림', icon: '◔', tone: 'warning', min: 25, maxInclusive: 49, helperText: '방어선 아래에서 동기 흔들림이 감지된다.' },
  { id: 'risk', label: '위험', icon: '◑', tone: 'warning', min: 50, maxInclusive: 79, helperText: '숨기던 이유가 새어 나오기 시작한다.' },
  { id: 'pre_burst', label: '폭발직전', icon: '●', tone: 'danger', min: 80, maxInclusive: 100, helperText: '감정 폭발 직전이다.' },
]

export const TRUST_STAGES: MeterStageSpec<TrustStage>[] = [
  { id: 'closed', label: '닫힘', icon: '🔒', tone: 'neutral', min: 0, maxInclusive: 19, helperText: '아직 재판관을 안전한 청자로 보지 않는다.' },
  { id: 'ajar', label: '살짝', icon: '🗝️', tone: 'positive', min: 20, maxInclusive: 39, helperText: '경계가 약간 열렸다.' },
  { id: 'open', label: '열림', icon: '💬', tone: 'positive', min: 40, maxInclusive: 59, helperText: '방어를 조금 내려놓기 시작한다.' },
  { id: 'wide_open', label: '완전개방', icon: '🤝', tone: 'positive', min: 60, maxInclusive: 100, helperText: '자발적 시인 창구가 열린 상태다.' },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 미터 단계화 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function getLeakStageSpec(value: number): MeterStageSpec<LeakStage> {
  return findStage(LEAK_STAGES, value)
}

export function getTrustStageSpec(value: number): MeterStageSpec<TrustStage> {
  return findStage(TRUST_STAGES, value)
}

export function getLeakPresentation(value: number, mode: MeterDisplayMode): MeterPresentation {
  const stage = getLeakStageSpec(value)
  return {
    label: '누설',
    stageLabel: mode === 'exact' ? `${clamp(value)}%` : stage.label,
    icon: stage.icon,
    tone: stage.tone,
    fillPct: clamp(value),
    subLabel: mode === 'exact' ? stage.label : stage.helperText,
  }
}

export function getTrustPresentation(value: number, mode: MeterDisplayMode): MeterPresentation {
  const stage = getTrustStageSpec(value)
  return {
    label: '신뢰',
    stageLabel: mode === 'exact' ? `${clamp(value)}%` : stage.label,
    icon: stage.icon,
    tone: stage.tone,
    fillPct: clamp(value),
    subLabel: mode === 'exact' ? stage.label : stage.helperText,
  }
}

export function getMeterHudModel(meters: QuestionMeterState, mode: MeterDisplayMode) {
  return {
    contradiction: { label: '모순', value: meters.contradictionTokens, max: 5, active: meters.contradictionTokens >= 2 },
    leak: getLeakPresentation(meters.leakMeter, mode),
    trust: getTrustPresentation(meters.trustWindow, mode),
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 사건카드 해금
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function evaluateDossierUnlock(input: {
  turn: number
  alreadyUnlocked: boolean
  hasAnyCrack: boolean
  highestContradictionTokens: number
  highestTrustWindow: number
}): DossierUnlockResult {
  if (input.alreadyUnlocked) {
    return { unlocked: true, newlyUnlocked: false, reason: null, label: '사건카드 사용 가능' }
  }
  if (input.hasAnyCrack) {
    return { unlocked: true, newlyUnlocked: true, reason: 'first_crack', label: '첫 균열이 발생해 사건카드가 해금되었습니다.' }
  }
  if (input.highestContradictionTokens >= 2) {
    return { unlocked: true, newlyUnlocked: true, reason: 'contradiction_2', label: '모순이 쌓여 사건카드가 해금되었습니다.' }
  }
  if (input.highestTrustWindow >= 40) {
    return { unlocked: true, newlyUnlocked: true, reason: 'trust_40', label: '신뢰 창구가 열려 사건카드가 해금되었습니다.' }
  }
  if (input.turn >= 6) {
    return { unlocked: true, newlyUnlocked: true, reason: 'turn_6', label: '시간 경과로 사건카드가 안전 해금되었습니다.' }
  }
  return { unlocked: false, newlyUnlocked: false, reason: null, label: '사건카드는 심문 흐름이 무르익으면 열립니다.' }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Readiness 힌트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function getReadinessHint(
  turn: number,
  readiness: ReadinessState,
): ReadinessHintResult {
  const eligibility = checkVerdictEligible(turn, readiness)
  if (eligibility.eligible) {
    return {
      level: 'ready',
      label: '판결을 내릴 수 있습니다',
      detail: '핵심 근거가 충분히 쌓였습니다.',
      eligible: true,
      highlight: 'ready',
    }
  }

  const score = calculateReadinessScore(readiness)
  const progressed = readiness.crackedDisputeCount + readiness.resolvedDisputeCount
  const breakthroughs = readiness.resolvedDisputeCount + readiness.fullCollapseCount + readiness.confessionCount

  if (score < 3 || progressed < 1 || turn < 4) {
    return {
      level: 'not_enough',
      label: '아직 충분한 근거가 없습니다',
      detail: '초기 진술을 흔들 만한 단서가 더 필요합니다.',
      eligible: false,
      highlight: 'muted',
    }
  }

  return {
    level: 'progressing',
    label: '심문이 진행되고 있습니다',
    detail: breakthroughs < 1 || turn < 8
      ? '쟁점은 열리고 있지만 결정적 돌파는 더 필요합니다.'
      : '판결 직전 단계입니다. 핵심 1개만 더 확보하면 됩니다.',
    eligible: false,
    highlight: 'info',
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UI 스펙 (단계별 tailwind 클래스)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const METER_UI_SPEC = {
  leak: {
    stable: { textClass: 'text-zinc-300', barClass: 'bg-zinc-500/60' },
    shaken: { textClass: 'text-amber-300', barClass: 'bg-amber-500/70' },
    risk: { textClass: 'text-orange-300', barClass: 'bg-orange-500/80' },
    pre_burst: { textClass: 'text-red-300', barClass: 'bg-red-500' },
  },
  trust: {
    closed: { textClass: 'text-slate-300', barClass: 'bg-slate-500/60' },
    ajar: { textClass: 'text-cyan-300', barClass: 'bg-cyan-500/65' },
    open: { textClass: 'text-blue-300', barClass: 'bg-blue-500/80' },
    wide_open: { textClass: 'text-teal-300', barClass: 'bg-teal-400' },
  },
} as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 유틸
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function findStage<T extends string>(specs: MeterStageSpec<T>[], value: number): MeterStageSpec<T> {
  const v = clamp(value)
  return specs.find(s => v >= s.min && v <= s.maxInclusive) ?? specs[specs.length - 1]
}

function clamp(v: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, v))
}
