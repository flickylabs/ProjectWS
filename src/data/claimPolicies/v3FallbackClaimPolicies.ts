import type { CaseData, ClaimPolicy, LieState, V3GameLoopData } from '../../types'

type PartyId = 'a' | 'b'
type CasePolicies = Record<PartyId, Record<string, Record<LieState, ClaimPolicy>>>

const LIE_STATES: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
const STATE_INDEX: Record<LieState, number> = {
  S0: 0,
  S1: 1,
  S2: 2,
  S3: 3,
  S4: 4,
  S5: 5,
}
const LEAK_BY_STATE: Record<LieState, ClaimPolicy['emotionalLeakRisk']> = {
  S0: 'low',
  S1: 'low',
  S2: 'mid',
  S3: 'mid',
  S4: 'high',
  S5: 'high',
}

function uniqTexts(items: Array<string | null | undefined>): string[] {
  return [...new Set(items.map((item) => String(item || '').trim()).filter(Boolean))]
}

function getAtomsForState(data: V3GameLoopData, party: PartyId, disputeId: string, state: LieState) {
  return data.stateUnlockAtoms?.[party]?.[disputeId]?.[state] ?? []
}

function collectAtomTexts(data: V3GameLoopData, party: PartyId, disputeId: string, state: LieState, mode: 'upTo' | 'after') {
  return LIE_STATES
    .filter((candidate) => (mode === 'upTo'
      ? STATE_INDEX[candidate] <= STATE_INDEX[state]
      : STATE_INDEX[candidate] > STATE_INDEX[state]))
    .flatMap((candidate) => getAtomsForState(data, party, disputeId, candidate))
    .map((atom) => atom.factText)
}

function getTransitionLines(data: V3GameLoopData, party: PartyId, disputeId: string, state: LieState): string[] {
  return (data.transitionBeats ?? [])
    .filter((beat) => beat.party === party && beat.disputeId === disputeId && (beat.fromState === state || beat.toState === state))
    .map((beat) => beat.line)
}

export function buildV3FallbackClaimPolicies(caseData: CaseData, data: V3GameLoopData): CasePolicies {
  const policies = { a: {}, b: {} } as CasePolicies

  for (const party of ['a', 'b'] as const) {
    for (const dispute of caseData.disputes ?? []) {
      policies[party][dispute.id] = {} as Record<LieState, ClaimPolicy>

      for (const state of LIE_STATES) {
        const currentAtoms = getAtomsForState(data, party, dispute.id, state).map((atom) => atom.factText)
        const knownAtoms = collectAtomTexts(data, party, dispute.id, state, 'upTo')
        const hiddenAtoms = collectAtomTexts(data, party, dispute.id, state, 'after')
        const transitionLines = getTransitionLines(data, party, dispute.id, state)

        const publicClaim = uniqTexts([
          ...currentAtoms,
          currentAtoms.length === 0 ? `${dispute.name}에 대해서는 아직 다툼의 여지가 있다는 입장입니다.` : null,
        ]).slice(0, 3)

        const privateKnowledge = uniqTexts([
          ...knownAtoms,
          ...transitionLines,
          `${dispute.name}의 경위를 더 알고 있지만 아직 전부 드러내지 않고 있습니다.`,
        ]).slice(0, 4)

        const suppressions = uniqTexts([
          ...hiddenAtoms,
          hiddenAtoms.length === 0 ? `${dispute.name}에 관한 추가 정황을 아직 숨기고 있습니다.` : null,
        ]).slice(0, 3)

        policies[party][dispute.id][state] = {
          disputeId: dispute.id,
          state,
          publicClaim,
          privateKnowledge,
          suppressions,
          emotionalLeakRisk: LEAK_BY_STATE[state],
          tellPool: [],
        }
      }
    }
  }

  return policies
}
