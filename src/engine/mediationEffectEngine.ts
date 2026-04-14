/**
 * mediationEffectEngine.ts — Phase 6 중재 유형별 Phase 7 점수 보정
 *
 * mediationEffects.json의 score_modifiers를 런타임 컨텍스트로 평가하여
 * insight/authority/wisdom 보정 delta를 계산합니다.
 */

import type { MediationChoice } from '../store/slices/phaseSlice'
import mediationEffectsData from '../data/mediationEffects.json'

interface ScoreModifierRule {
  when: string
  delta: number
}

interface MediationPathEffect {
  score_modifiers: {
    insight: ScoreModifierRule[]
    authority: ScoreModifierRule[]
    wisdom: ScoreModifierRule[]
  }
  aftermath_tone_bias: string[]
}

/** 점수 보정 계산에 필요한 런타임 컨텍스트 */
export interface MediationScoreContext {
  /** 고모호 쟁점 중 사실 판단 완료된 수 */
  resolved_high_weight_count: number
  /** 전체 고모호 쟁점 수 */
  high_weight_total: number
  /** pending 판정 수 */
  pending_count: number
  /** 총 쟁점 수 */
  total_disputes: number
  /** 사용 턴 수 */
  turnsUsed: number
  /** 위법 증거 인정 수 */
  illegal_evidence_admitted_count: number
  /** 극단 책임 배분(90:10 이상) 쟁점 수 */
  extreme_blame_dispute_count: number
  /** 선택한 솔루션 수 */
  selected_solutions_count: number
  /** final 태그 솔루션 선택 수 */
  selected_final_solution_count: number
  /** temporary 태그 솔루션 선택 수 */
  selected_temporary_solution_count: number
  /** mutual 태그 솔루션 선택 수 */
  selected_mutual_solution_count: number
  /** one-sided 솔루션 선택 수 */
  selected_one_sided_solution_count: number
  /** 솔루션 커버리지 (양측 모두 커버하면 'both') */
  selected_solution_side_coverage: 'both' | 'a_only' | 'b_only' | 'none'
  /** fact-record 계열 솔루션 선택 수 */
  selected_fact_record_solution_count: number
  /** 책임 비율 갭 평균 (|a-b|) */
  responsibility_gap_average: number
  /** 고모호 쟁점 중 pending인 수 */
  high_ambiguity_pending_count: number
  /** 저/중 모호 쟁점 중 resolved 수 */
  resolved_low_or_medium_ambiguity_count: number
  /** 발견된 개인정보 증거 수 */
  discovered_privacy_evidence_count: number
  /** 증거 적법성 판단 완료 수 */
  evidence_legality_judged_count: number
  /** 비밀 보호 증거 수 */
  confidential_evidence_protected_count: number
}

/**
 * 조건 문자열을 평가합니다.
 * 안전하게 단순 비교 연산만 지원 (eval 사용 안 함).
 */
function evaluateCondition(when: string, ctx: MediationScoreContext): boolean {
  // && 분리하여 모든 절 충족 여부 확인
  const clauses = when.split('&&').map(c => c.trim())
  return clauses.every(clause => evaluateSingleClause(clause, ctx as unknown as Record<string, unknown>))
}

function evaluateSingleClause(clause: string, ctx: Record<string, unknown>): boolean {
  // "key == value", "key >= value", "key <= value", "key > value", "key < value"
  const match = clause.match(/^(\w+)\s*(==|>=|<=|>|<|!=)\s*(.+)$/)
  if (!match) return false

  const [, key, op, rawValue] = match
  const left = ctx[key]
  if (left === undefined) return false

  // 우변 해석: 숫자, 문자열, 다른 컨텍스트 키, floor() 표현
  let right: unknown
  const floorMatch = rawValue.match(/^floor\((\w+)\s*\/\s*(\d+)\)$/)
  if (floorMatch) {
    const fKey = floorMatch[1]
    const fDiv = Number(floorMatch[2])
    right = Math.floor(Number(ctx[fKey] ?? 0) / fDiv)
  } else if (rawValue === 'both' || rawValue === 'none' || rawValue === 'a_only' || rawValue === 'b_only') {
    right = rawValue
  } else if (ctx[rawValue] !== undefined) {
    right = ctx[rawValue]
  } else {
    right = Number(rawValue)
  }

  const l = typeof left === 'number' ? left : String(left)
  const r = typeof right === 'number' ? right : String(right)

  switch (op) {
    case '==': return l === r
    case '!=': return l !== r
    case '>=': return (l as number) >= (r as number)
    case '<=': return (l as number) <= (r as number)
    case '>': return (l as number) > (r as number)
    case '<': return (l as number) < (r as number)
    default: return false
  }
}

/** 특정 중재 유형에 대한 점수 보정 delta 계산 */
export function computeMediationScoreModifiers(
  choice: MediationChoice,
  ctx: MediationScoreContext,
): { insight: number; authority: number; wisdom: number } {
  if (!choice) return { insight: 0, authority: 0, wisdom: 0 }

  const pathEffect = (mediationEffectsData.phase7_effects as Record<string, MediationPathEffect>)[choice]
  if (!pathEffect) return { insight: 0, authority: 0, wisdom: 0 }

  const { score_modifiers, path_balance_rule } = pathEffect as MediationPathEffect & {
    path_balance_rule?: { max_net_dimension_delta: number; per_dimension_cap: number }
  }
  const cap = path_balance_rule?.per_dimension_cap ?? 6
  const netCap = path_balance_rule?.max_net_dimension_delta ?? 10

  let insight = 0
  let authority = 0
  let wisdom = 0

  for (const rule of score_modifiers.insight) {
    if (evaluateCondition(rule.when, ctx)) {
      insight += rule.delta
    }
  }
  for (const rule of score_modifiers.authority) {
    if (evaluateCondition(rule.when, ctx)) {
      authority += rule.delta
    }
  }
  for (const rule of score_modifiers.wisdom) {
    if (evaluateCondition(rule.when, ctx)) {
      wisdom += rule.delta
    }
  }

  // per-dimension cap
  insight = Math.max(-cap, Math.min(cap, insight))
  authority = Math.max(-cap, Math.min(cap, authority))
  wisdom = Math.max(-cap, Math.min(cap, wisdom))

  // net cap
  const net = Math.abs(insight) + Math.abs(authority) + Math.abs(wisdom)
  if (net > netCap) {
    const scale = netCap / net
    insight = Math.round(insight * scale)
    authority = Math.round(authority * scale)
    wisdom = Math.round(wisdom * scale)
  }

  return { insight, authority, wisdom }
}

/** 후일담 톤 바이어스 조회 */
export function getAftermathToneBias(choice: MediationChoice): string[] {
  if (!choice) return []
  const pathEffect = (mediationEffectsData.phase7_effects as Record<string, MediationPathEffect>)[choice]
  return pathEffect?.aftermath_tone_bias ?? []
}
