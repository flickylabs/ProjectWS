import type { StateCreator } from 'zustand'
import type { AgentState, LieState, EmotionalPhase } from '../../types'
import type { LieConfig } from '../../types'
import type { Archetype } from '../../types'
import { initializeLieStates, attemptLieTransition } from '../../engine/lieStateMachine'
import { createInitialEmotionalState, updateEmotion } from '../../engine/emotionEngine'
import { createInitialTrustState, updateTrust as updateTrustState } from '../../engine/trustEngine'

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
  transitionLie: (party: 'a' | 'b', disputeId: string, trigger: string) => boolean
  forceSetLieState: (party: 'a' | 'b', disputeId: string, state: LieState) => void
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
      },
      agentB: {
        partyId: 'b',
        lieStateMap: initializeLieStates(lieConfigB),
        emotionalState: createInitialEmotionalState(archetypeB, startEmotionB),
        trustState: createInitialTrustState(),
      },
      archetypeA,
      archetypeB,
      lieConfigsA: lieConfigA,
      lieConfigsB: lieConfigB,
    })
  },

  transitionLie: (party, disputeId, trigger) => {
    const state = get()
    const agent = party === 'a' ? state.agentA : state.agentB
    const configs = party === 'a' ? state.lieConfigsA : state.lieConfigsB
    const entry = agent.lieStateMap[disputeId]
    if (!entry) return false

    // 저장된 실제 config에서 transitions를 가져온다
    const config = configs.find((c) => c.disputeId === disputeId)
    if (!config) return false

    const result = attemptLieTransition(entry, config, trigger, agent)
    if (result.transitioned) {
      const agentKey = party === 'a' ? 'agentA' : 'agentB'
      set({
        [agentKey]: {
          ...agent,
          lieStateMap: {
            ...agent.lieStateMap,
            [disputeId]: { ...entry, currentState: result.to },
          },
        },
      })
      return true
    }
    return false
  },

  forceSetLieState: (party, disputeId, newState) => {
    const state = get()
    const agentKey = party === 'a' ? 'agentA' : 'agentB'
    const agent = state[agentKey]
    const entry = agent.lieStateMap[disputeId]
    if (!entry) return
    set({
      [agentKey]: {
        ...agent,
        lieStateMap: {
          ...agent.lieStateMap,
          [disputeId]: { ...entry, currentState: newState },
        },
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
