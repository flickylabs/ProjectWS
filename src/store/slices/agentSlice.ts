import type { StateCreator } from 'zustand'
import type { AgentState, LieState, EmotionalPhase, CaseData, ProcessMetrics } from '../../types'
import type { LieConfig } from '../../types'
import type { Archetype } from '../../types'
import { initializeLieStates, attemptLieTransition, type LieTransitionContext } from '../../engine/lieStateMachine'
import { evaluateTruthBreakthroughGate } from '../../engine/truthBreakthroughEngine'
import type { EvidenceRuntimeState } from '../../engine/evidenceEngine'
import { createInitialEmotionalState, updateEmotion } from '../../engine/emotionEngine'
import { createInitialTrustState, updateTrust as updateTrustState } from '../../engine/trustEngine'
import { applyBridge } from '../../engine/bridgeEngine'
import { emitTruthStageChanged } from '../../telemetry/wirePoints'
import type { UnsafeAny } from '../../types/lint'


export interface AgentSlice {
  agentA: AgentState
  agentB: AgentState
  archetypeA: Archetype
  archetypeB: Archetype
  lieConfigsA: LieConfig[]
  lieConfigsB: LieConfig[]

  initializeAgents: (
    lieConfigA: LieConfig[],
    lieConfigB: LieConfig[],
    archetypeA: Archetype,
    archetypeB: Archetype,
    startEmotionA: EmotionalPhase,
    startEmotionB: EmotionalPhase,
  ) => void
  /** Phase 3 진입 시 브리지 적용 — Phase 1~2에서 인정된 사실 반영 */
  applyPhase3Bridge: (caseId: string) => void
  transitionLie: (party: 'a' | 'b', disputeId: string, trigger: string, context?: LieTransitionContext) => boolean
  forceSetLieState: (party: 'a' | 'b', disputeId: string, state: LieState, context?: LieTransitionContext) => void
  incrementEmpathyAtCurrentState: (party: 'a' | 'b') => void
  changeEmotion: (party: 'a' | 'b', delta: number) => void
  changeTrust: (party: 'a' | 'b', field: 'trustTowardJudge' | 'fearOfExposure' | 'retaliationWorry', delta: number) => void
  getAgent: (party: 'a' | 'b') => AgentState
  getLieState: (party: 'a' | 'b', disputeId: string) => LieState | undefined
}

const emptyAgent: AgentState = {
  partyId: 'a',
  lieStateMap: {},
  emotionalState: { phase: 'defensive', internalValue: 10, behaviorHint: '' },
  trustState: { trustTowardJudge: 30, fearOfExposure: 50, retaliationWorry: 30 },
  empathyAtCurrentState: 0,
}

type AgentSliceRootState = AgentSlice & {
  agentA: AgentState
  agentB: AgentState
  caseData: CaseData | null
  evidenceStates?: Record<string, EvidenceRuntimeState>
  witnessSessions?: Record<string, { heardSlots: string[]; lastChoice: string | null; summonCount: number }>
  processMetrics: ProcessMetrics
  trackMetric: (key: keyof ProcessMetrics, delta?: number) => void
  enqueueFeedback?: (item: UnsafeAny) => string
}

function hasS3Plus(agent: AgentState): boolean {
  return Object.values(agent.lieStateMap).some((entry) => entry.currentState >= 'S3')
}

function shouldTrackBothSidesS3Plus(root: AgentSliceRootState, party: 'a' | 'b', nextAgent: AgentState): boolean {
  if (root.processMetrics.bothSidesS3Plus) return false

  const nextAgentA = party === 'a' ? nextAgent : root.agentA
  const nextAgentB = party === 'b' ? nextAgent : root.agentB

  return hasS3Plus(nextAgentA) && hasS3Plus(nextAgentB)
}

const EMOTION_MILESTONE_COPY: Record<EmotionalPhase, { title: string; body: string; tone: 'gold' | 'red' | 'green' }> = {
  defensive: {
    title: '감정 상태가 가라앉았습니다',
    body: '감정 변화가 확인됐습니다. 아직 결론이 아니라 다음 질문의 흐름을 조정할 신호입니다.',
    tone: 'green',
  },
  confident: {
    title: '감정 상태가 안정됐습니다',
    body: '당사자가 다시 방어 태세를 정돈했습니다. 같은 압박을 반복하기보다 다른 각도를 확인하십시오.',
    tone: 'green',
  },
  shaken: {
    title: '감정이 흔들리기 시작했습니다',
    body: '',
    tone: 'gold',
  },
  angry: {
    title: '감정 격앙 단계에 들어갔습니다',
    body: '감정이 크게 올라왔습니다. 무리한 단정은 피하고 모순이나 기록으로 압박할 시점입니다.',
    tone: 'red',
  },
  resigned: {
    title: '감정 체념 단계에 들어갔습니다',
    body: '방어가 흔들리고 체념 반응이 보입니다. 자백을 강요하지 말고 확인된 사실부터 정리하십시오.',
    tone: 'red',
  },
}

const EMOTION_PHASE_LABELS: Record<EmotionalPhase, string> = {
  defensive: '방어',
  confident: '안정',
  shaken: '동요',
  angry: '격앙',
  resigned: '체념',
}

function getPartyName(root: AgentSliceRootState, party: 'a' | 'b'): string {
  return party === 'a'
    ? root.caseData?.duo.partyA.name ?? '당사자 A'
    : root.caseData?.duo.partyB.name ?? '당사자 B'
}

function maybeEnqueueEmotionMilestone(
  root: AgentSliceRootState,
  party: 'a' | 'b',
  prev: AgentState['emotionalState'],
  next: AgentState['emotionalState'],
) {
  if (!root.enqueueFeedback) return
  if (prev.phase === next.phase) return
  if (next.internalValue <= prev.internalValue) return
  if (next.phase === 'defensive' || next.phase === 'confident') return

  const copy = EMOTION_MILESTONE_COPY[next.phase]
  const name = getPartyName(root, party)
  root.enqueueFeedback({
    kind: 'state_change',
    eyebrow: '감정 단계 변화',
    title: `${name} · ${copy.title}`,
    body: copy.body,
    tag: `감정 ${EMOTION_PHASE_LABELS[prev.phase]} → ${EMOTION_PHASE_LABELS[next.phase]}`,
    party,
    tone: copy.tone,
    autoDismissMs: next.phase === 'shaken' ? 2400 : 3200,
  })
}

function trustMilestone(prev: number, next: number): 70 | 100 | null {
  if (prev < 100 && next >= 100) return 100
  if (prev < 70 && next >= 70) return 70
  return null
}

function maybeEnqueueTrustMilestone(
  root: AgentSliceRootState,
  party: 'a' | 'b',
  field: keyof AgentState['trustState'],
  prev: number,
  next: number,
) {
  if (!root.enqueueFeedback) return
  if (field !== 'trustTowardJudge') return
  const milestone = trustMilestone(prev, next)
  if (!milestone) return

  const name = getPartyName(root, party)
  root.enqueueFeedback({
    kind: 'state_change',
    eyebrow: '신뢰 상태 변화',
    title: milestone >= 100 ? `${name}의 신뢰가 최고치에 도달했습니다` : `${name}의 신뢰 경로가 열렸습니다`,
    body: milestone >= 100
      ? '신뢰 상태가 최고치에 도달했습니다. 감정 압박보다 차분한 확인 질문이 자백 경로에 더 적합합니다.'
      : '신뢰가 충분히 쌓였습니다. 공감 접근과 비공개 확인 질문의 효율이 높아집니다.',
    tag: `신뢰 ${milestone}%`,
    party,
    tone: milestone >= 100 ? 'gold' : 'green',
    autoDismissMs: milestone >= 100 ? 3200 : 2400,
  })
}

export const createAgentSlice: StateCreator<AgentSlice, [], [], AgentSlice> = (set, get) => ({
  agentA: { ...emptyAgent, partyId: 'a' },
  agentB: { ...emptyAgent, partyId: 'b' },
  archetypeA: 'avoidant',
  archetypeB: 'confrontational',
  lieConfigsA: [],
  lieConfigsB: [],

  initializeAgents: (lieConfigA, lieConfigB, archetypeA, archetypeB, startEmotionA, startEmotionB) => {
    set({
      agentA: {
        partyId: 'a',
        lieStateMap: initializeLieStates(lieConfigA),
        emotionalState: createInitialEmotionalState(archetypeA, startEmotionA),
        trustState: createInitialTrustState(),
        empathyAtCurrentState: 0,
      },
      agentB: {
        partyId: 'b',
        lieStateMap: initializeLieStates(lieConfigB),
        emotionalState: createInitialEmotionalState(archetypeB, startEmotionB),
        trustState: createInitialTrustState(),
        empathyAtCurrentState: 0,
      },
      archetypeA,
      archetypeB,
      lieConfigsA: lieConfigA,
      lieConfigsB: lieConfigB,
    })
  },

  applyPhase3Bridge: (caseId) => {
    const state = get()
    set({
      agentA: {
        ...state.agentA,
        lieStateMap: applyBridge(caseId, 'a', state.agentA.lieStateMap),
      },
      agentB: {
        ...state.agentB,
        lieStateMap: applyBridge(caseId, 'b', state.agentB.lieStateMap),
      },
    })
  },

  transitionLie: (party, disputeId, trigger, context = {}) => {
    const state = get() as AgentSliceRootState
    const agent = party === 'a' ? state.agentA : state.agentB
    const configs = party === 'a' ? state.lieConfigsA : state.lieConfigsB
    const entry = agent.lieStateMap[disputeId]
    if (!entry) return false

    // 저장된 실제 config에서 transitions를 가져온다
    const config = configs.find((c) => c.disputeId === disputeId)
    if (!config) return false

    const gate = evaluateTruthBreakthroughGate({
      caseData: state.caseData,
      evidenceStates: state.evidenceStates,
      witnessSessions: state.witnessSessions,
      party,
      disputeId,
      agent,
      trigger,
      bypass: context.allowS5,
    })
    const result = attemptLieTransition(entry, config, trigger, agent, {
      ...context,
      allowS5: context.allowS5 ?? gate.canBreakthrough,
      breakthroughRoute: context.breakthroughRoute ?? (gate.route === 'blocked' ? undefined : gate.route),
    })
    if (result.transitioned) {
      const agentKey = party === 'a' ? 'agentA' : 'agentB'
      const nextAgent: AgentState = {
        ...agent,
        lieStateMap: {
          ...agent.lieStateMap,
          [disputeId]: { ...entry, currentState: result.to },
        },
        empathyAtCurrentState: 0,
      }

      set({
        [agentKey]: nextAgent,
      })
      emitTruthStageChanged(party, disputeId, entry.currentState, result.to, state.caseData?.caseId)
      if (shouldTrackBothSidesS3Plus(state, party, nextAgent)) {
        state.trackMetric('bothSidesS3Plus')
      }
      return true
    }
    return false
  },

  forceSetLieState: (party, disputeId, newState, context = {}) => {
    const state = get() as AgentSliceRootState
    const agentKey = party === 'a' ? 'agentA' : 'agentB'
    const agent = state[agentKey]
    const entry = agent.lieStateMap[disputeId]
    if (!entry) return
    let targetState = newState
    if (newState === 'S5' && !context.allowS5) {
      const gate = evaluateTruthBreakthroughGate({
        caseData: state.caseData,
        evidenceStates: state.evidenceStates,
        witnessSessions: state.witnessSessions,
        party,
        disputeId,
        agent,
        trigger: 'force_set_lie_state',
        bypass: context.allowS5,
      })
      if (!gate.canBreakthrough) {
        targetState = entry.currentState === 'S5' ? 'S5' : 'S4'
      }
    }
    const didTransition = entry.currentState !== targetState
    const nextAgent: AgentState = {
      ...agent,
      lieStateMap: {
        ...agent.lieStateMap,
        [disputeId]: { ...entry, currentState: targetState },
      },
      empathyAtCurrentState: didTransition ? 0 : agent.empathyAtCurrentState,
    }
    set({
      [agentKey]: nextAgent,
    })
    if (didTransition) {
      emitTruthStageChanged(party, disputeId, entry.currentState, targetState, state.caseData?.caseId)
    }
    if (didTransition && shouldTrackBothSidesS3Plus(state, party, nextAgent)) {
      state.trackMetric('bothSidesS3Plus')
    }
  },

  incrementEmpathyAtCurrentState: (party) => {
    const state = get()
    const agentKey = party === 'a' ? 'agentA' : 'agentB'
    const agent = state[agentKey]
    set({
      [agentKey]: {
        ...agent,
        empathyAtCurrentState: agent.empathyAtCurrentState + 1,
      },
    })
  },

  changeEmotion: (party, delta) => {
    const state = get() as AgentSliceRootState
    const agentKey = party === 'a' ? 'agentA' : 'agentB'
    const archetype = party === 'a' ? state.archetypeA : state.archetypeB
    const agent = state[agentKey]
    const nextEmotion = updateEmotion(agent.emotionalState, delta, archetype)
    set({
      [agentKey]: {
        ...agent,
        emotionalState: nextEmotion,
      },
    })
    maybeEnqueueEmotionMilestone(state, party, agent.emotionalState, nextEmotion)
  },

  changeTrust: (party, field, delta) => {
    const state = get() as AgentSliceRootState
    const agentKey = party === 'a' ? 'agentA' : 'agentB'
    const agent = state[agentKey]
    const nextTrust = updateTrustState(agent.trustState, field, delta)
    set({
      [agentKey]: {
        ...agent,
        trustState: nextTrust,
      },
    })
    maybeEnqueueTrustMilestone(state, party, field, agent.trustState[field], nextTrust[field])
  },

  getAgent: (party) => {
    const state = get()
    return party === 'a' ? state.agentA : state.agentB
  },

  getLieState: (party, disputeId) => {
    const state = get()
    const agent = party === 'a' ? state.agentA : state.agentB
    return agent.lieStateMap[disputeId]?.currentState
  },
})
