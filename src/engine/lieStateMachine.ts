// @ts-nocheck — 점진적 타입 정리 예정
import type { LieState, LieStateEntry, AgentState } from '../types'
import type { LieConfig } from '../types'
import { TRUST_THRESHOLDS } from '../utils/constants'

export interface TransitionResult {
  transitioned: boolean
  from: LieState
  to: LieState
  trigger: string
}

export interface LieTransitionContext {
  allowS5?: boolean
  breakthroughRoute?: 'emotion' | 'trust' | 'explicit'
}

export function attemptLieTransition(
  entry: LieStateEntry,
  config: LieConfig,
  trigger: string,
  agentState: AgentState,
  context: LieTransitionContext = {},
): TransitionResult {
  const currentState = entry.currentState
  const noTransition: TransitionResult = {
    transitioned: false,
    from: currentState,
    to: currentState,
    trigger,
  }

  // 이미 S5면 더 이상 전이 없음
  if (currentState === 'S5') return noTransition

  // 신뢰 루트: collapseViaTrust + trust 임계치 + 공감/신뢰 트리거
  if (
    entry.collapseViaTrust &&
    agentState.trustState.trustTowardJudge >= TRUST_THRESHOLDS.voluntaryConfession &&
    (trigger.includes('empathy') || trigger.includes('trust') || trigger.includes('confidential'))
  ) {
    return gateS5Transition(
      { transitioned: true, from: currentState, to: 'S5', trigger: 'voluntary_confession' },
      context,
    )
  }

  // 동기별 특수 전이
  const motiveSkip = getMotiveSkipTransition(entry, trigger, agentState)
  if (motiveSkip) return gateS5Transition(motiveSkip, context)

  // config의 transitions에서 매칭
  const matchedTransition = config.transitions.find(
    (t) => t.from === currentState && matchesTrigger(t.trigger, trigger),
  )

  if (matchedTransition) {
    return gateS5Transition({
      transitioned: true,
      from: currentState,
      to: matchedTransition.to as LieState,
      trigger,
    }, context)
  }

  // 매칭 안 되면: 하드 증거는 최소 한 단계 진행 보장
  if (trigger.includes('hard_evidence') && currentState !== 'S5') {
    const nextState = getNextState(currentState)
    if (nextState) {
      return gateS5Transition({ transitioned: true, from: currentState, to: nextState, trigger }, context)
    }
  }

  // V4 폴백: 모든 question trigger에 대해 1단계 전이 허용
  // (config에 정확한 trigger가 없어도, 같은 from state의 전이가 있으면 실행)
  const QUESTION_TRIGGERS = ['direct_question', 'timeline_question', 'motive_question', 'context_question', 'empathy_question', 'provenance_question']
  if (QUESTION_TRIGGERS.includes(trigger) && currentState !== 'S5') {
    const sameFromTransition = config.transitions.find(t => t.from === currentState)
    if (sameFromTransition) {
      return gateS5Transition(
        { transitioned: true, from: currentState, to: sameFromTransition.to as LieState, trigger },
        context,
      )
    }
    // 그래도 없으면 단순 다음 단계
    const nextState = getNextState(currentState)
    if (nextState) {
      return gateS5Transition({ transitioned: true, from: currentState, to: nextState, trigger }, context)
    }
  }

  // 증인 증언: 직접 목격(soft_evidence 수준)이면 한 단계 진행 시도
  if (trigger === 'witness_testimony' && currentState <= 'S2') {
    const nextState = getNextState(currentState)
    if (nextState) {
      return gateS5Transition({ transitioned: true, from: currentState, to: nextState, trigger }, context)
    }
  }

  return noTransition
}

function gateS5Transition(result: TransitionResult, context: LieTransitionContext): TransitionResult {
  if (!result.transitioned || result.to !== 'S5' || context.allowS5) return result

  if (result.from === 'S4') {
    return {
      transitioned: false,
      from: result.from,
      to: result.from,
      trigger: `${result.trigger}:truth_gate_held`,
    }
  }

  return {
    transitioned: true,
    from: result.from,
    to: 'S4',
    trigger: `${result.trigger}:truth_gate_held`,
  }
}

function getMotiveSkipTransition(
  entry: LieStateEntry,
  trigger: string,
  agentState: AgentState,
): TransitionResult | null {
  const { currentState, lieMotive } = entry

  // LM-4 복수: S2에서 S3 건너뛰고 S4로
  if (lieMotive === 'revenge' && currentState === 'S2' && trigger.includes('responsibility')) {
    return { transitioned: true, from: 'S2', to: 'S4', trigger }
  }

  // LM-3 제3자 보호: 보호 보장 시 S3→S5
  if (
    lieMotive === 'third_party_protection' &&
    currentState === 'S3' &&
    (trigger.includes('trust') || trigger.includes('retaliation')) &&
    agentState.trustState.retaliationWorry < 30
  ) {
    return { transitioned: true, from: 'S3', to: 'S5', trigger: 'protection_assured' }
  }

  // LM-7 관계 유지: 신뢰 높으면 S4→S5
  if (
    lieMotive === 'relationship_maintenance' &&
    currentState === 'S4' &&
    (trigger.includes('trust') || trigger.includes('empathy')) &&
    agentState.trustState.trustTowardJudge >= TRUST_THRESHOLDS.confidentialAcceptance
  ) {
    return { transitioned: true, from: 'S4', to: 'S5', trigger: 'voluntary_confession' }
  }

  return null
}

function getNextState(current: LieState): LieState | null {
  const order: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
  const idx = order.indexOf(current)
  return idx < order.length - 1 ? order[idx + 1] : null
}

function matchesTrigger(configTrigger: string, actualTrigger: string): boolean {
  // 정확히 일치
  if (configTrigger === actualTrigger) return true

  // config에서 _or_로 분리된 복수 조건
  const parts = configTrigger.split('_or_')

  for (const part of parts) {
    // 부분 문자열 포함 (양방향)
    if (actualTrigger.includes(part) || part.includes(actualTrigger)) return true

    // 핵심 키워드 추출 후 매칭
    const keywords = part.split('_')
    const actualKeywords = actualTrigger.split('_')
    const overlap = keywords.filter((k) => actualKeywords.some((ak) => ak.includes(k) || k.includes(ak)))
    if (overlap.length >= 2) return true
  }

  return false
}

export function initializeLieStates(configs: LieConfig[]): Record<string, LieStateEntry> {
  const map: Record<string, LieStateEntry> = {}
  for (const config of configs) {
    map[config.disputeId] = {
      disputeId: config.disputeId,
      lieType: config.lieType,
      lieIntensity: config.lieIntensity,
      lieMotive: config.lieMotive,
      currentState: config.initialState,
      collapseViaTrust: config.collapseViaTrust,
    }
  }
  return map
}
