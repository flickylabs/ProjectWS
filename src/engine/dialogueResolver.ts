import type { CaseData, DialogueNode, PlayerAction, PartyId } from '../types'
import type { AgentState } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'

export interface ResolvedDialogue {
  node: DialogueNode
  target: PartyId
  /** v3: LLM response stance (deny/hedge/partial_admit/admit/reframe) */
  stance?: string
  /** v6: forced response mode */
  responseMode?: string
  /** v6: response style (factual/motivational/empathic/private) */
  answerStyle?: string
  /** v3: truth IDs mentioned by the LLM */
  mentionedTruthIds?: string[]
  /** v3: requested follow-up signal */
  requestedFollowup?: string
}

const LIE_STATE_RANK: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }

/**
 * Legacy static dialogue tables are intentionally not consulted here.
 * All live cases, including future generated cases, must resolve through
 * case scripts/LLM first and use this case-aware fallback only as a guardrail.
 */
export function resolveDialogue(
  action: PlayerAction,
  agentA: AgentState,
  agentB: AgentState,
  _evidenceStates: Record<string, EvidenceRuntimeState>,
  caseData?: CaseData,
): ResolvedDialogue | null {
  if (action.type !== 'question' && action.type !== 'evidence_present' && action.type !== 'trust_action') {
    return null
  }

  const target: PartyId = 'target' in action ? action.target : 'a'
  const agent = target === 'a' ? agentA : agentB
  const disputeId = 'disputeId' in action ? (action as { disputeId?: string }).disputeId : undefined
  const questionType = action.type === 'question' ? action.questionType : undefined

  return {
    node: generateDynamicFallback(target, agent, disputeId, questionType, caseData),
    target,
  }
}

export function generateDynamicFallback(
  target: PartyId,
  agent: AgentState,
  disputeId?: string,
  questionType?: string,
  caseData?: CaseData,
): DialogueNode {
  const text = caseData
    ? getCaseAwareFallbackText(target, agent, disputeId, questionType, caseData)
    : getNoCaseFallbackText(agent, questionType)

  return {
    id: `fallback-${caseData?.caseId ?? 'generic'}-${target}-${Date.now()}`,
    conditions: disputeId ? { disputeId } : {},
    speaker: target,
    text,
    behaviorHint: getFallbackBehavior(agent),
    effects: {},
  }
}

function getCaseAwareFallbackText(
  target: PartyId,
  agent: AgentState,
  disputeId: string | undefined,
  questionType: string | undefined,
  caseData: CaseData,
): string {
  const other = target === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  const dispute = disputeId ? caseData.disputes.find((d) => d.id === disputeId) : undefined
  const subject = dispute?.name ?? '그 부분'
  const lieState = disputeId ? agent.lieStateMap[disputeId]?.currentState ?? 'S0' : 'S0'
  const rank = LIE_STATE_RANK[lieState] ?? 0

  if (questionType === 'motive_search') {
    if (rank >= 4) {
      return `${subject}에 대해 제가 피하던 이유가 있었습니다. ${other.name} 씨에게 바로 말하지 못한 사정이 있었지만, 그걸 변명으로 삼지는 않겠습니다.`
    }
    if (rank >= 2) {
      return `${subject}과 관련해 숨긴 대목이 있는 건 맞습니다. 다만 이유를 한 문장으로 단정하면 또 다른 오해가 생길 것 같습니다.`
    }
    return `${subject}에 그런 의도가 있었다고 단정하긴 어렵습니다. 제가 확인한 행동과 추측을 나눠서 봐 주셨으면 합니다.`
  }

  if (questionType === 'empathy_approach') {
    if (rank >= 4) {
      return `말씀하신 취지는 알겠습니다. ${subject}에서 제가 책임져야 할 부분을 더는 감추지 않겠습니다.`
    }
    if (agent.emotionalState.phase === 'angry') {
      return `지금은 감정이 앞서서 바로 인정하기 어렵습니다. 그래도 ${subject}에 대해 사실과 추측은 구분해서 말하겠습니다.`
    }
    return `그렇게 물어봐 주신 건 알겠습니다. 다만 ${subject}에 대해 아직 말하기 어려운 부분이 있습니다.`
  }

  if (rank >= 5) {
    return `${subject}에 대해서는 더 숨기지 않겠습니다. 제가 인정해야 할 사실과 제 판단을 나눠 말씀드리겠습니다.`
  }
  if (rank >= 3) {
    return `${subject}과 관련해 제가 설명하지 않은 대목이 있습니다. 다만 아직 전부를 단정해서 말하긴 어렵습니다.`
  }
  if (target === 'a') {
    return `${subject}은 제가 의심을 거두지 못한 부분입니다. ${other.name} 씨의 설명과 기록이 맞지 않는 대목부터 확인하고 싶습니다.`
  }
  return `${subject}에 대해 오해받는 부분이 있습니다. 제가 한 행동과 ${other.name} 씨가 추측한 부분을 구분해서 말씀드리겠습니다.`
}

function getNoCaseFallbackText(agent: AgentState, questionType?: string): string {
  if (questionType === 'motive_search') {
    return '그렇게 행동한 이유를 단정하기 전에, 제가 실제로 한 일과 추측된 부분을 나눠서 말씀드리겠습니다.'
  }
  if (questionType === 'empathy_approach') {
    return agent.emotionalState.phase === 'angry'
      ? '지금은 감정이 앞서지만, 제가 책임질 부분과 아닌 부분은 구분해서 말하겠습니다.'
      : '그렇게 물어봐 주신 건 알겠습니다. 다만 아직 말하기 어려운 부분이 있습니다.'
  }
  return '확인된 사실과 제 판단을 나눠서 말씀드리겠습니다.'
}

function getFallbackBehavior(agent: AgentState): string {
  const hints: Record<string, string> = {
    defensive: '방어적으로 말을 고르며 답한다.',
    confident: '겉으로는 차분하지만 핵심을 피한다.',
    shaken: '잠시 망설인 뒤 조심스럽게 답한다.',
    angry: '감정이 앞선 상태로 반박한다.',
    resigned: '체념한 목소리로 인정할 부분을 고른다.',
  }
  return hints[agent.emotionalState.phase] ?? '조심스럽게 답한다.'
}

export function resolveEvidenceReaction(
  _evidenceId: string,
  target: PartyId,
  agentA: AgentState,
  agentB: AgentState,
  evidenceStates: Record<string, EvidenceRuntimeState>,
  disputeIds: string[],
  caseData?: CaseData,
): ResolvedDialogue | null {
  for (const disputeId of disputeIds) {
    const fakeAction: PlayerAction = {
      type: 'question',
      questionType: 'fact_pursuit',
      target,
      disputeId,
    }
    const result = resolveDialogue(fakeAction, agentA, agentB, evidenceStates, caseData)
    if (result) return result
  }
  return null
}
