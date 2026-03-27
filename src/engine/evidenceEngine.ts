import type { EvidenceNode, EvidenceCombination } from '../types'

export interface EvidenceRuntimeState {
  id: string
  unlocked: boolean
  presented: boolean
  presentedTo: ('a' | 'b')[]
  investigatedActions: string[]
  confidentialSource?: boolean
}

export function createInitialEvidenceStates(
  evidence: EvidenceNode[],
): Record<string, EvidenceRuntimeState> {
  const map: Record<string, EvidenceRuntimeState> = {}
  for (const e of evidence) {
    map[e.id] = {
      id: e.id,
      unlocked: e.requires.length === 0,
      presented: false,
      presentedTo: [],
      investigatedActions: [],
    }
  }
  return map
}

/** 잠금 해제 체크 — 원본을 mutate하지 않고 새 객체를 반환 */
export function checkUnlocks(
  states: Record<string, EvidenceRuntimeState>,
  evidence: EvidenceNode[],
): { updated: Record<string, EvidenceRuntimeState>; newlyUnlocked: string[] } {
  const newlyUnlocked: string[] = []
  const updated = { ...states }

  for (const e of evidence) {
    const state = updated[e.id]
    if (!state || state.unlocked) continue

    const allRequirementsMet = e.requires.every((reqId) => {
      const reqState = updated[reqId]
      return reqState && (reqState.presented || reqState.unlocked)
    })

    if (allRequirementsMet) {
      updated[e.id] = { ...state, unlocked: true }
      newlyUnlocked.push(e.id)
    }
  }

  return { updated, newlyUnlocked }
}

export function checkCombinations(
  states: Record<string, EvidenceRuntimeState>,
  combinations: EvidenceCombination[],
): EvidenceCombination[] {
  return combinations.filter((combo) =>
    combo.requires.every((id) => states[id]?.presented),
  )
}

export function presentEvidence(
  states: Record<string, EvidenceRuntimeState>,
  evidenceId: string,
  target: 'a' | 'b',
): Record<string, EvidenceRuntimeState> {
  const state = states[evidenceId]
  if (!state || !state.unlocked) return states

  return {
    ...states,
    [evidenceId]: {
      ...state,
      presented: true,
      presentedTo: [...new Set([...state.presentedTo, target])],
    },
  }
}

export function investigateEvidence(
  states: Record<string, EvidenceRuntimeState>,
  evidenceId: string,
  subAction: string,
): Record<string, EvidenceRuntimeState> {
  const state = states[evidenceId]
  if (!state || !state.unlocked) return states

  return {
    ...states,
    [evidenceId]: {
      ...state,
      investigatedActions: [...new Set([...state.investigatedActions, subAction])],
    },
  }
}
