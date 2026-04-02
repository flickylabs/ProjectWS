/**
 * Meter Staging V2 design
 * -----------------------
 * 목적:
 * - leak / trust 수치를 단계형 텍스트로 바꾸고, contradiction token만 기존 pip 유지
 * - 사건카드 해금을 턴 고정에서 조건 해금으로 전환
 * - readinessScore 숫자는 숨기고 판결 가능 힌트만 보여준다.
 *
 * repo 배치 권장:
 *   - src/ui/phase3/meterStagingV2.ts
 *   - QuestionMeterHUD / Dossier unlock chip / Verdict CTA 에서 재사용
 */

import type { QuestionMeterState } from './questionEffectEngine'
import type { ReadinessState } from './renewal'
import { calculateReadinessScore, checkVerdictEligible } from './readinessEngine'

/* -------------------------------------------------------------------------- */
/* 1. types                                                                    */
/* -------------------------------------------------------------------------- */

export type MeterDisplayMode = 'staged' | 'exact'
export type LeakStage = 'stable' | 'shaken' | 'risk' | 'pre_burst'
export type TrustStage = 'closed' | 'ajar' | 'open' | 'wide_open'

export interface MeterStageSpec<TStage extends string> {
  id: TStage
  label: string
  shortLabel: string
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

export type DossierUnlockReason =
  | 'first_crack'
  | 'contradiction_2'
  | 'trust_40'
  | 'turn_6'

export interface DossierUnlockInput {
  turn: number
  alreadyUnlocked: boolean
  hasAnyCrack: boolean
  highestContradictionTokens: number
  highestTrustWindow: number
}

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

/* -------------------------------------------------------------------------- */
/* 2. stage specs                                                              */
/* -------------------------------------------------------------------------- */

export const LEAK_STAGE_SPECS: MeterStageSpec<LeakStage>[] = [
  {
    id: 'stable',
    label: '안정',
    shortLabel: '안정',
    icon: '○',
    tone: 'neutral',
    min: 0,
    maxInclusive: 24,
    helperText: '아직 숨긴 동기가 표면까지 거의 올라오지 않았다.',
  },
  {
    id: 'shaken',
    label: '흔들림',
    shortLabel: '흔들림',
    icon: '◔',
    tone: 'warning',
    min: 25,
    maxInclusive: 49,
    helperText: '방어선 아래에서 동기 흔들림이 감지된다.',
  },
  {
    id: 'risk',
    label: '위험',
    shortLabel: '위험',
    icon: '◑',
    tone: 'warning',
    min: 50,
    maxInclusive: 79,
    helperText: '누설 임계에 도달했다. 숨기던 이유가 새어 나오기 시작한다.',
  },
  {
    id: 'pre_burst',
    label: '폭발직전',
    shortLabel: '폭발직전',
    icon: '●',
    tone: 'danger',
    min: 80,
    maxInclusive: 100,
    helperText: '감정 폭발 또는 slip이 발생하기 직전이다.',
  },
]

export const TRUST_STAGE_SPECS: MeterStageSpec<TrustStage>[] = [
  {
    id: 'closed',
    label: '닫힘',
    shortLabel: '닫힘',
    icon: '🔒',
    tone: 'neutral',
    min: 0,
    maxInclusive: 19,
    helperText: '아직 재판관을 안전한 청자로 보지 않는다.',
  },
  {
    id: 'ajar',
    label: '살짝',
    shortLabel: '살짝',
    icon: '🗝️',
    tone: 'positive',
    min: 20,
    maxInclusive: 39,
    helperText: '경계가 약간 열렸다. 다음 공감이 의미를 만들 수 있다.',
  },
  {
    id: 'open',
    label: '열림',
    shortLabel: '열림',
    icon: '💬',
    tone: 'positive',
    min: 40,
    maxInclusive: 59,
    helperText: '방어를 조금 내려놓기 시작한다. 사건카드 해금 조건으로도 충분하다.',
  },
  {
    id: 'wide_open',
    label: '완전개방',
    shortLabel: '완전개방',
    icon: '🤝',
    tone: 'positive',
    min: 60,
    maxInclusive: 100,
    helperText: '자발적 시인 창구가 실제로 열린 상태다.',
  },
]

/* -------------------------------------------------------------------------- */
/* 3. meter helpers                                                            */
/* -------------------------------------------------------------------------- */

export function getLeakStage(value: number): MeterStageSpec<LeakStage> {
  return findStage(LEAK_STAGE_SPECS, value)
}

export function getTrustStage(value: number): MeterStageSpec<TrustStage> {
  return findStage(TRUST_STAGE_SPECS, value)
}

export function getLeakPresentation(value: number, mode: MeterDisplayMode): MeterPresentation {
  const stage = getLeakStage(value)
  return {
    label: '누설',
    stageLabel: mode === 'exact' ? `${clamp(value, 0, 100)}%` : stage.label,
    icon: stage.icon,
    tone: stage.tone,
    fillPct: clamp(value, 0, 100),
    subLabel: mode === 'exact' ? stage.label : stage.helperText,
  }
}

export function getTrustPresentation(value: number, mode: MeterDisplayMode): MeterPresentation {
  const stage = getTrustStage(value)
  return {
    label: '신뢰',
    stageLabel: mode === 'exact' ? `${clamp(value, 0, 100)}%` : stage.label,
    icon: stage.icon,
    tone: stage.tone,
    fillPct: clamp(value, 0, 100),
    subLabel: mode === 'exact' ? stage.label : stage.helperText,
  }
}

export function getQuestionMeterHudModel(
  meters: QuestionMeterState,
  mode: MeterDisplayMode,
): {
  contradiction: { label: string; value: number; max: number; active: boolean }
  leak: MeterPresentation
  trust: MeterPresentation
} {
  return {
    contradiction: {
      label: '모순',
      value: meters.contradictionTokens,
      max: 5,
      active: meters.contradictionTokens >= 2,
    },
    leak: getLeakPresentation(meters.leakMeter, mode),
    trust: getTrustPresentation(meters.trustWindow, mode),
  }
}

/* -------------------------------------------------------------------------- */
/* 4. 사건카드 해금                                                            */
/* -------------------------------------------------------------------------- */

/**
 * 턴 4 고정을 버리고 조건 해금으로 전환.
 * 우선순위:
 *   1) 첫 균열
 *   2) 모순 2개
 *   3) 신뢰 40
 *   4) 턴 6 안전장치
 */
export function evaluateDossierUnlockV2(input: DossierUnlockInput): DossierUnlockResult {
  if (input.alreadyUnlocked) {
    return {
      unlocked: true,
      newlyUnlocked: false,
      reason: null,
      label: '사건카드 사용 가능',
    }
  }

  if (input.hasAnyCrack) {
    return {
      unlocked: true,
      newlyUnlocked: true,
      reason: 'first_crack',
      label: '첫 균열이 발생해 사건카드가 해금되었습니다.',
    }
  }

  if (input.highestContradictionTokens >= 2) {
    return {
      unlocked: true,
      newlyUnlocked: true,
      reason: 'contradiction_2',
      label: '모순이 쌓여 사건카드가 해금되었습니다.',
    }
  }

  if (input.highestTrustWindow >= 40) {
    return {
      unlocked: true,
      newlyUnlocked: true,
      reason: 'trust_40',
      label: '신뢰 창구가 열려 사건카드가 해금되었습니다.',
    }
  }

  if (input.turn >= 6) {
    return {
      unlocked: true,
      newlyUnlocked: true,
      reason: 'turn_6',
      label: '시간 경과로 사건카드가 안전 해금되었습니다.',
    }
  }

  return {
    unlocked: false,
    newlyUnlocked: false,
    reason: null,
    label: '사건카드는 심문 흐름이 무르익으면 열립니다.',
  }
}

/* -------------------------------------------------------------------------- */
/* 5. readiness hint                                                           */
/* -------------------------------------------------------------------------- */

/**
 * readinessScore는 내부 계산만 유지한다.
 * UI에는 "얼마나 남았는가"를 숫자로 보여주지 않고
 * 넓은 구간 힌트만 전달한다.
 */
export function getReadinessHintV2(
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

  if (breakthroughs < 1 || turn < 8) {
    return {
      level: 'progressing',
      label: '심문이 진행되고 있습니다',
      detail: '쟁점은 열리고 있지만 결정적 돌파는 더 필요합니다.',
      eligible: false,
      highlight: 'info',
    }
  }

  return {
    level: 'progressing',
    label: '심문이 진행되고 있습니다',
    detail: '판결 직전 단계입니다. 핵심 1개만 더 확보하면 됩니다.',
    eligible: false,
    highlight: 'info',
  }
}

/* -------------------------------------------------------------------------- */
/* 6. UI spec                                                                  */
/* -------------------------------------------------------------------------- */

export const METER_STAGE_UI_SPEC = {
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

/**
 * QuestionMeterHUD 교체 스니펫
 *
 * const mode = useSettingsStore(s => s.meterDisplayMode) // 'staged' | 'exact'
 * const hud = getQuestionMeterHudModel(meters, mode)
 *
 * <MeterPip ... contradiction 유지 />
 * <MeterStageBar presentation={hud.leak} />
 * <MeterStageBar presentation={hud.trust} />
 * <ToggleChip label="정밀 수치" value={mode === 'exact'} onChange={...} />
 *
 * 주의:
 * - staged 모드에서도 fillPct는 실제 수치로 유지한다.
 *   즉 "얼마나 차 있는지"는 보이되, 숫자 계산 족보는 가려진다.
 * - exact 모드는 하드코어/디버그 모드에서만 노출 권장.
 */

/**
 * Dossier unlock chip 예시
 *
 * const dossierUnlock = evaluateDossierUnlockV2({
 *   turn,
 *   alreadyUnlocked: dossierUnlocked,
 *   hasAnyCrack,
 *   highestContradictionTokens: Math.max(meters.a.contradictionTokens, meters.b.contradictionTokens),
 *   highestTrustWindow: Math.max(meters.a.trustWindow, meters.b.trustWindow),
 * })
 *
 * if (dossierUnlock.newlyUnlocked) toast(dossierUnlock.label)
 */

/**
 * Verdict CTA 예시
 *
 * const readinessHint = getReadinessHintV2(turn, readiness)
 * <StatusChip tone={readinessHint.highlight}>{readinessHint.label}</StatusChip>
 * <p>{readinessHint.detail}</p>
 */

/* -------------------------------------------------------------------------- */
/* 7. helpers                                                                  */
/* -------------------------------------------------------------------------- */

function findStage<TStage extends string>(
  specs: MeterStageSpec<TStage>[],
  value: number,
): MeterStageSpec<TStage> {
  const normalized = clamp(value, 0, 100)
  return specs.find(spec => normalized >= spec.min && normalized <= spec.maxInclusive) ?? specs[specs.length - 1]
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/* -------------------------------------------------------------------------- */
/* 8. spouse-01 expectation notes                                              */
/* -------------------------------------------------------------------------- */

/**
 * spouse-01 기대값
 * - leak 50 이상이 되면 '위험'으로 노출되어 d-2 / d-4 동기 압박의 손맛을 준다.
 * - trust 40 이상이면 '열림'이 떠서 사건카드 해금과 감정 접근 성공이 동시에 체감된다.
 * - trust 60 이상에서만 '완전개방'으로 바뀌어 기존 confession window와 충돌하지 않는다.
 * - readiness는 숫자를 숨기고도 "지금은 더 파야 하는가"를 텍스트만으로 전달한다.
 */
