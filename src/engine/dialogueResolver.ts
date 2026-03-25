import type { DialogueNode, DialogueCondition, PlayerAction, PartyId } from '../types'
import type { AgentState } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'
import { interrogationNodes } from '../data/dialogues/phase3-5'

export interface ResolvedDialogue {
  node: DialogueNode
  target: PartyId
}

/**
 * 플레이어 행동과 현재 게임 상태를 기반으로 최적의 대사 노드를 선택한다.
 * LLM 교체 시 이 함수만 바꾸면 된다.
 */
export function resolveDialogue(
  action: PlayerAction,
  agentA: AgentState,
  agentB: AgentState,
  evidenceStates: Record<string, EvidenceRuntimeState>,
): ResolvedDialogue | null {
  // 지원하는 행동 타입만 처리
  if (action.type !== 'question' && action.type !== 'evidence_present' && action.type !== 'trust_action') {
    return null
  }

  const target: PartyId = 'target' in action ? action.target : 'a'
  const agent = target === 'a' ? agentA : agentB
  const disputeId = 'disputeId' in action ? (action as { disputeId?: string }).disputeId : undefined

  // 현재 제시된 증거 목록
  const presentedEvidenceIds = Object.values(evidenceStates)
    .filter((s) => s.presented)
    .map((s) => s.id)

  // 1차: 정확한 조건 매칭
  const exactCandidates = interrogationNodes.filter((node) => {
    if (node.speaker !== target) return false
    return matchesCondition(node.conditions, action, agent, disputeId, presentedEvidenceIds)
  })

  if (exactCandidates.length > 0) {
    const scored = exactCandidates.map((node) => ({
      node,
      score: calculateSpecificity(node.conditions),
    }))
    scored.sort((a, b) => b.score - a.score)
    const topScore = scored[0].score
    const topCandidates = scored.filter((s) => s.score === topScore)
    const selected = topCandidates[Math.floor(Math.random() * topCandidates.length)]
    return { node: selected.node, target }
  }

  // 2차: 같은 쟁점 + 같은 speaker의 가장 가까운 lieState 매칭
  if (disputeId) {
    const lieEntry = agent.lieStateMap[disputeId]
    if (lieEntry) {
      const sameDisputeNodes = interrogationNodes.filter(
        (n) => n.speaker === target && n.conditions.disputeId === disputeId,
      )
      if (sameDisputeNodes.length > 0) {
        // 현재 lieState와 가장 가까운 노드
        const stateOrder = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
        const currentIdx = stateOrder.indexOf(lieEntry.currentState)
        let bestNode = sameDisputeNodes[0]
        let bestDist = 999
        for (const n of sameDisputeNodes) {
          if (n.conditions.lieState) {
            const nodeIdx = stateOrder.indexOf(n.conditions.lieState)
            const dist = Math.abs(nodeIdx - currentIdx)
            if (dist < bestDist) {
              bestDist = dist
              bestNode = n
            }
          }
        }
        return { node: bestNode, target }
      }
    }
  }

  // 3차: 감정 상태 기반 범용 폴백
  const emotionFallback = interrogationNodes.find(
    (node) =>
      node.speaker === target &&
      node.conditions.emotionalPhase === agent.emotionalState.phase &&
      !node.conditions.disputeId,
  )
  if (emotionFallback) return { node: emotionFallback, target }

  // 4차: 최종 범용 폴백 (동적 생성)
  return {
    node: generateDynamicFallback(target, agent, disputeId),
    target,
  }
}

/** 대사 트리에 매칭 노드가 전혀 없을 때 동적으로 폴백 대사를 생성 */
function generateDynamicFallback(
  target: PartyId,
  agent: AgentState,
  disputeId?: string,
): DialogueNode {
  const phase = agent.emotionalState.phase
  const lieEntry = disputeId ? agent.lieStateMap[disputeId] : undefined
  const lieState = lieEntry?.currentState ?? 'S0'

  // lieState + emotion에 기반한 자연스러운 폴백
  const responses: Record<string, Record<string, string>> = {
    S0: {
      defensive: '그 부분에 대해서는... 제가 아는 바로는 그렇지 않습니다.',
      confident: '그건 전혀 사실이 아닙니다. 확실히 말씀드릴 수 있습니다.',
      shaken: '그건... 아닌데... 왜 그런 질문을 하시는 거죠?',
      angry: '자꾸 그런 식으로 몰아가시면 곤란합니다!',
      resigned: '... 그 질문에는 대답하고 싶지 않습니다.',
    },
    S1: {
      defensive: '그 부분은... 좀 복잡한 사정이 있습니다.',
      confident: '거기에는 나름의 이유가 있었습니다.',
      shaken: '... 그래요, 뭔가가 있긴 했는데, 생각하시는 것과는 달라요.',
      angry: '맥락을 모르시면서 단정 짓지 마세요!',
      resigned: '... 네, 뭔가 있긴 있었습니다.',
    },
    S2: {
      defensive: '인정하는 부분도 있지만, 전부는 아닙니다.',
      confident: '그 부분은 맞습니다. 하지만 이유가 중요합니다.',
      shaken: '... 맞아요. 근데 왜 그랬는지를 들어주세요.',
      angry: '맞다고요! 하지만 상대도 잘못한 게 있잖아요!',
      resigned: '... 네, 맞습니다. 그건 제 잘못입니다.',
    },
    S3: {
      defensive: '제가 그렇게 한 건 상대방 때문입니다.',
      confident: '누구라도 그 상황이면 그렇게 했을 겁니다.',
      shaken: '저도 하고 싶어서 한 게 아니에요... 상대가 그렇게 만든 거예요.',
      angry: '이게 다 저 사람 때문이라는 걸 왜 모르세요?!',
      resigned: '... 어쩔 수 없었어요. 그 사람이 그렇게 만들었으니까요.',
    },
    S4: {
      defensive: '이런 상황에서 제가 어떻게 해야 했겠습니까...',
      confident: '제 입장에서 생각해 보세요. 정말 힘들었습니다.',
      shaken: '... 제발 이해해 주세요. 저도 힘들었어요.',
      angry: '저만 나쁜 사람인 건가요?! 저도 피해자예요!',
      resigned: '... 더 이상 뭐라고 해야 할지 모르겠어요.',
    },
    S5: {
      defensive: '... 네, 인정합니다.',
      confident: '사실대로 말씀드리겠습니다.',
      shaken: '... 맞아요. 다 맞아요.',
      angry: '그래요, 맞습니다. 됐죠?',
      resigned: '... 네. 말씀하신 대로입니다.',
    },
  }

  const stateResponses = responses[lieState] ?? responses['S0']
  const text = stateResponses[phase] ?? stateResponses['defensive']

  const behaviorHints: Record<string, string> = {
    defensive: '신중하게 단어를 고르며 말한다.',
    confident: '또렷한 목소리로 말한다.',
    shaken: '말이 느려지고 불안한 모습.',
    angry: '감정이 섞인 목소리.',
    resigned: '작은 목소리로 답한다.',
  }

  return {
    id: `fallback-${target}-${Date.now()}`,
    conditions: {},
    speaker: target,
    text,
    behaviorHint: behaviorHints[phase],
    effects: {},
  }
}

function matchesCondition(
  cond: DialogueCondition,
  action: PlayerAction,
  agent: AgentState,
  disputeId: string | undefined,
  presentedEvidence: string[],
): boolean {
  // disputeId 매칭
  if (cond.disputeId && cond.disputeId !== disputeId) return false

  // ── 핵심 수정: 행동 타입 엄격 매칭 ──
  // trustActionUsed가 있는 노드는 반드시 trust_action일 때만 매칭
  if (cond.trustActionUsed) {
    if (action.type !== 'trust_action') return false
    if (cond.trustActionUsed !== action.actionType) return false
  }

  // questionType이 있는 노드는 반드시 question일 때만 매칭
  if (cond.questionType) {
    if (action.type !== 'question') return false
    if (cond.questionType !== action.questionType) return false
  }

  // lieState 매칭
  if (cond.lieState && disputeId) {
    const entry = agent.lieStateMap[disputeId]
    if (!entry || entry.currentState !== cond.lieState) return false
  }

  // evidencePresented 매칭
  if (cond.evidencePresented && cond.evidencePresented.length > 0) {
    const allPresented = cond.evidencePresented.every((id) => presentedEvidence.includes(id))
    if (!allPresented) return false
  }

  // emotionalPhase 매칭 (폴백 노드용 — 다른 조건이 없는 경우에만)
  if (cond.emotionalPhase && agent.emotionalState.phase !== cond.emotionalPhase) return false

  return true
}

function calculateSpecificity(cond: DialogueCondition): number {
  let score = 0
  if (cond.disputeId) score += 10
  if (cond.questionType) score += 5
  if (cond.lieState) score += 8
  if (cond.evidencePresented && cond.evidencePresented.length > 0) score += 12
  if (cond.trustActionUsed) score += 7
  if (cond.emotionalPhase) score += 3
  return score
}

export function resolveEvidenceReaction(
  evidenceId: string,
  target: PartyId,
  agentA: AgentState,
  agentB: AgentState,
  evidenceStates: Record<string, EvidenceRuntimeState>,
  disputeIds: string[],
): ResolvedDialogue | null {
  for (const disputeId of disputeIds) {
    const fakeAction: PlayerAction = {
      type: 'question',
      questionType: 'fact_fixing',
      target,
      disputeId,
    }
    const result = resolveDialogue(fakeAction, agentA, agentB, evidenceStates)
    if (result) return result
  }
  return null
}
