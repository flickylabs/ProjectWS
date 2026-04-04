import type { StateCreator } from 'zustand'
import type { EvidenceNode, EvidenceCombination } from '../../types'
import {
  createInitialEvidenceStates,
  checkUnlocks,
  checkCombinations,
  presentEvidence as presentEv,
  investigateEvidence as investigateEv,
  type EvidenceRuntimeState,
} from '../../engine/evidenceEngine'

export interface EvidenceSlice {
  evidenceStates: Record<string, EvidenceRuntimeState>
  evidenceDefinitions: EvidenceNode[]
  evidenceCombinations: EvidenceCombination[]
  triggeredCombinations: string[]

  initEvidence: (evidence: EvidenceNode[], combinations: EvidenceCombination[]) => void
  presentEvidence: (evidenceId: string, target: 'a' | 'b') => string[]
  investigateEvidence: (evidenceId: string, subAction: string) => string | null
  markEvidenceConfidential: (evidenceId: string) => void
  isUnlocked: (evidenceId: string) => boolean
  isPresented: (evidenceId: string) => boolean
  getUnlockedEvidence: () => EvidenceNode[]
}

export const createEvidenceSlice: StateCreator<EvidenceSlice, [], [], EvidenceSlice> = (set, get) => ({
  evidenceStates: {},
  evidenceDefinitions: [],
  evidenceCombinations: [],
  triggeredCombinations: [],

  initEvidence: (evidence, combinations) => {
    set({
      evidenceDefinitions: evidence,
      evidenceCombinations: combinations,
      evidenceStates: createInitialEvidenceStates(evidence),
      triggeredCombinations: [],
    })
  },

  presentEvidence: (evidenceId, target) => {
    const { evidenceStates, evidenceDefinitions, evidenceCombinations } = get()

    // 증거 제시 (immutable)
    const afterPresent = presentEv(evidenceStates, evidenceId, target)

    // 잠금 해제 체크 (immutable) — lieState 조건 포함
    const LIE_RANK: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
    const agentA = (get() as any).agentA
    const agentB = (get() as any).agentB
    const lieStates: Record<string, string> = {}
    if (agentA?.lieStateMap) {
      for (const [dId, entry] of Object.entries(agentA.lieStateMap)) {
        const st = (entry as any).currentState ?? 'S0'
        lieStates[dId] = (LIE_RANK[st] ?? 0) >= (LIE_RANK[lieStates[dId] ?? 'S0'] ?? 0) ? st : lieStates[dId]
      }
    }
    if (agentB?.lieStateMap) {
      for (const [dId, entry] of Object.entries(agentB.lieStateMap)) {
        const st = (entry as any).currentState ?? 'S0'
        lieStates[dId] = (LIE_RANK[st] ?? 0) >= (LIE_RANK[lieStates[dId] ?? 'S0'] ?? 0) ? st : lieStates[dId]
      }
    }
    const { updated, newlyUnlocked } = checkUnlocks(afterPresent, evidenceDefinitions, lieStates)

    // 조합 체크 (이미 발동된 조합은 제외)
    const combos = checkCombinations(updated, evidenceCombinations)
    const existing = new Set(get().triggeredCombinations)
    const newComboIds = combos.map((c) => c.requires.join('+')).filter(id => !existing.has(id))

    set({
      evidenceStates: updated,
      triggeredCombinations: [...existing, ...newComboIds],
    })

    return newlyUnlocked
  },

  investigateEvidence: (evidenceId, subAction) => {
    const { evidenceStates, evidenceDefinitions } = get()
    const afterInvestigate = investigateEv(evidenceStates, evidenceId, subAction)

    // checkUnlocks 호출: 조사 후 잠금 해제 조건 확인
    const LIE_RANK: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
    const agentA = (get() as any).agentA
    const agentB = (get() as any).agentB
    const lieStates: Record<string, string> = {}
    if (agentA?.lieStateMap) {
      for (const [dId, entry] of Object.entries(agentA.lieStateMap)) {
        const st = (entry as any).currentState ?? 'S0'
        lieStates[dId] = (LIE_RANK[st] ?? 0) >= (LIE_RANK[lieStates[dId] ?? 'S0'] ?? 0) ? st : lieStates[dId]
      }
    }
    if (agentB?.lieStateMap) {
      for (const [dId, entry] of Object.entries(agentB.lieStateMap)) {
        const st = (entry as any).currentState ?? 'S0'
        lieStates[dId] = (LIE_RANK[st] ?? 0) >= (LIE_RANK[lieStates[dId] ?? 'S0'] ?? 0) ? st : lieStates[dId]
      }
    }
    const { updated } = checkUnlocks(afterInvestigate, evidenceDefinitions, lieStates)

    set({ evidenceStates: updated })

    const def = evidenceDefinitions.find((e) => e.id === evidenceId)
    return def?.investigationResults[subAction] ?? null
  },

  markEvidenceConfidential: (evidenceId) => {
    const { evidenceStates } = get()
    const state = evidenceStates[evidenceId]
    if (!state) return
    set({
      evidenceStates: {
        ...evidenceStates,
        [evidenceId]: { ...state, confidentialSource: true },
      },
    })
  },

  isUnlocked: (evidenceId) => {
    return get().evidenceStates[evidenceId]?.unlocked ?? false
  },

  isPresented: (evidenceId) => {
    return get().evidenceStates[evidenceId]?.presented ?? false
  },

  getUnlockedEvidence: () => {
    const { evidenceStates, evidenceDefinitions } = get()
    return evidenceDefinitions.filter((e) => evidenceStates[e.id]?.unlocked)
  },
})
