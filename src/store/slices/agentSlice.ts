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
    const state = get()
    const agentKey = party === 'a' ? 'agentA' : 'agentB'
    const archetype = party === 'a' ? state.archetypeA : state.archetypeB
    const agent = state[agentKey]
    set({
      [agentKey]: {
        ...agent,
        emotionalState: updateEmotion(agent.emotionalState, delta, archetype),
      },
    })
  },

  changeTrust: (party, field, delta) => {
    const state = get()
    const agentKey = party === 'a' ? 'agentA' : 'agentB'
    const agent = state[agentKey]
    set({
      [agentKey]: {
        ...agent,
        trustState: updateTrustState(agent.trustState, field, delta),
      },
    })
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
