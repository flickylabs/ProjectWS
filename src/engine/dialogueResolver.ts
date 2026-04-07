import type { DialogueNode, DialogueCondition, PlayerAction, PartyId } from '../types'
import type { AgentState } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'
import { interrogationNodes } from '../data/dialogues/phase3-5'
import { useGameStore } from '../store/useGameStore'

export interface ResolvedDialogue {
  node: DialogueNode
  target: PartyId
  /** v3: LLM이 반환한 태도 (deny/hedge/partial_admit/admit/reframe) */
  stance?: string
  /** v6: 엔진이 강제한 응답 모드 */
  responseMode?: string
  /** v6: 감정 톤 (factual/motivational/empathic/private) */
  answerStyle?: string
  /** v3: LLM이 이번 답변에서 언급한 truth IDs */
  mentionedTruthIds?: string[]
  /** v3: 다음에 파고들 포인트 */
  requestedFollowup?: string
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
  const qt = action.type === 'question' ? action.questionType : undefined
  return {
    node: generateDynamicFallback(target, agent, disputeId, qt),
    target,
  }
}

/** 대사 트리에 매칭 노드가 전혀 없을 때 동적으로 폴백 대사를 생성 */
export function generateDynamicFallback(
  target: PartyId,
  agent: AgentState,
  disputeId?: string,
  questionType?: string,
): DialogueNode {
  const phase = agent.emotionalState.phase
  const lieEntry = disputeId ? agent.lieStateMap[disputeId] : undefined
  const lieState = lieEntry?.currentState ?? 'S0'
  const qt = questionType ?? 'fact_pursuit'

  // 질문 유형 × lieState × emotion 기반 폴백
  // 사실 추궁: 사실/부정 중심
  const factResponses: Record<string, Record<string, string>> = {
    S0: {
      defensive: '그런 사실은 없습니다. 제가 아는 한 전혀 다릅니다.',
      confident: '아닙니다, 절대 아닙니다. 확인해 보십시오.',
      shaken: '그건... 사실이 아닌데요. 왜 그런 걸 묻는 거죠?',
      angry: '아니라고 말씀드렸습니다! 없는 일을 있다고 하지 마세요!',
      resigned: '... 아닙니다. 그건 사실이 아닙니다.',
    },
    S1: { defensive: '복잡한 사정이 있었습니다. 겉으로 보이는 것과 다릅니다.', confident: '사실은 그렇지 않습니다. 나름의 이유가 있었어요.', shaken: '뭔가 있긴 했는데... 생각하시는 그런 건 아닙니다.', angry: '상황도 모르면서 단정 짓지 마세요!', resigned: '... 네, 뭔가 있긴 했습니다.' },
    S2: { defensive: '일부는 맞지만 전부는 아닙니다. 중요한 건 맥락입니다.', confident: '네, 그 부분은 인정합니다. 하지만 이유를 들어보세요.', shaken: '맞아요... 근데 전부를 말하기가 어렵습니다.', angry: '그래요 맞다고요! 그런데 상대는요?', resigned: '... 네, 맞습니다.' },
    S3: { defensive: '제가 그랬다 해도, 원인은 상대에게 있습니다.', confident: '누구라도 그 상황이면 같은 선택을 했을 겁니다.', shaken: '저도 원해서 한 게 아니에요...', angry: '다 상대 때문이에요! 왜 그걸 모르세요!', resigned: '어쩔 수 없었어요.' },
    S4: { defensive: '제 입장에서 어떻게 해야 했겠습니까...', confident: '제 상황을 한번 생각해 보세요.', shaken: '... 이해해 주세요. 정말 힘들었어요.', angry: '저만 나쁜 사람인가요?!', resigned: '... 더 할 말이 없습니다.' },
    S5: { defensive: '... 네, 사실입니다.', confident: '사실대로 말씀드리겠습니다.', shaken: '... 맞아요, 다 맞아요.', angry: '그래요. 맞습니다. 됐습니까?', resigned: '... 네. 말씀하신 대로입니다.' },
  }

  // 동기 탐색: 이유/동기 중심
  const motiveResponses: Record<string, Record<string, string>> = {
    S0: {
      defensive: '그럴 이유가 없었습니다. 동기 자체가 존재하지 않아요.',
      confident: '왜 그랬겠습니까? 그런 일 자체가 없었으니까요.',
      shaken: '왜라뇨... 저는 그런 의도가 전혀 없었습니다.',
      angry: '제가 왜 그래야 합니까! 이유를 만들지 마세요!',
      resigned: '... 이유를 물으실 일이 아닙니다.',
    },
    S1: { defensive: '사정이 있었습니다. 단순하게 볼 문제가 아니에요.', confident: '나름의 이유가 있었지만, 지금은 말씀드리기 어렵습니다.', shaken: '... 그때는 그렇게 할 수밖에 없었어요.', angry: '제 사정을 알지도 못하면서!', resigned: '... 이유가 있긴 했습니다.' },
    S2: { defensive: '이유를 말씀드리자면... 저도 궁지에 몰려 있었습니다.', confident: '인정합니다. 하지만 그때의 제 입장을 이해해 주세요.', shaken: '... 두려워서요. 솔직히 무서웠습니다.', angry: '이유요? 상대가 먼저 저를 밀어붙였으니까요!', resigned: '... 다른 방법이 없었어요.' },
    S3: { defensive: '제가 그런 건 상대가 먼저 그랬기 때문입니다.', confident: '이유를 물으신다면, 상대에게 물어보세요.', shaken: '상대가 그렇게 만들어놓고...', angry: '다 그 사람 때문이라고요!', resigned: '... 어쩔 수 없었습니다.' },
    S4: { defensive: '그때 저는... 정말 막막했습니다.', confident: '힘든 상황이었습니다. 그게 유일한 선택이었어요.', shaken: '... 무너지기 직전이었어요. 이해해 주세요.', angry: '저도 피해자예요! 왜 저한테만...', resigned: '... 지쳤어요. 그냥 지쳤습니다.' },
    S5: { defensive: '... 솔직히 말씀드리면, 두려웠습니다.', confident: '이제 말할 수 있습니다. 그때 저는...', shaken: '... 숨기고 싶었어요. 부끄러웠으니까요.', angry: '알겠어요. 제가 그랬습니다. 이유는... 자격이 없다고 느꼈으니까요.', resigned: '... 제가 약해서 그랬습니다.' },
  }

  // 공감 접근: 감정/심경 중심, 더 부드러운 톤
  const empathyResponses: Record<string, Record<string, string>> = {
    S0: {
      defensive: '... 감사합니다. 하지만 제가 할 말은 달라지지 않습니다.',
      confident: '괜찮습니다. 저는 떳떳하니까요.',
      shaken: '... 감사합니다. 그런데 정말 그런 일은 없었어요.',
      angry: '동정은 필요 없습니다. 사실만 밝혀주세요.',
      resigned: '... 고마운데요. 정말 아닙니다.',
    },
    S1: { defensive: '... 감사합니다. 사실 좀 힘들긴 합니다.', confident: '괜찮습니다만... 복잡한 사정이 있었어요.', shaken: '... 고맙습니다. 사실 잠을 못 자고 있어요.', angry: '... 지금 위로하시는 건가요, 심문하시는 건가요?', resigned: '... 네, 쉽지 않았습니다.' },
    S2: { defensive: '... 인정하기 어렵지만, 제가 잘못한 부분이 있습니다.', confident: '감사합니다. 사실... 후회하고 있습니다.', shaken: '... 말하기 어렵지만... 제 잘못도 있어요.', angry: '... 고마워요. 근데 상대도 잘못한 건 알아주세요.', resigned: '... 네. 제가 잘못했습니다.' },
    S3: { defensive: '... 저도 피해자라는 걸 알아주셨으면 합니다.', confident: '감사합니다. 사실 상대 때문에 그럴 수밖에 없었어요.', shaken: '... 저도 상처받았어요. 그걸 아무도 안 물어봤어요.', angry: '... 왜 저한테만 이래요. 저도 힘들었다고요.', resigned: '... 네, 둘 다 잘못했어요.' },
    S4: { defensive: '... 감사합니다. 정말... 감사합니다.', confident: '... 솔직히 말하면, 많이 후회합니다.', shaken: '... (눈물) 이해해 주셔서 감사합니다.', angry: '... 감사한데요, 저는 억울해요.', resigned: '... 다 제 탓이에요.' },
    S5: { defensive: '... 이제 솔직히 말씀드리겠습니다.', confident: '감사합니다. 숨기고 있던 게 있습니다.', shaken: '... 사실은요... (한참 뒤) 제가 그랬습니다.', angry: '... 그래요. 이제 다 말할게요.', resigned: '... 다 말씀드리겠습니다. 듣기 불편하실 수 있습니다.' },
  }

  const responseMap: Record<string, Record<string, Record<string, string>>> = {
    fact_pursuit: factResponses,
    motive_search: motiveResponses,
    empathy_approach: empathyResponses,
  }

  const selectedResponses = responseMap[qt] ?? factResponses
  const stateResponses = selectedResponses[lieState] ?? selectedResponses['S0']
  let text = stateResponses[phase] ?? stateResponses['defensive']

  // 중복 방지: 직전 대사와 동일하면 다른 감정 변형을 시도
  const recentTexts = useGameStore.getState().dialogueLog
    .filter((d: import('../types').DialogueEntry) => d.speaker === target)
    .slice(-3)
    .map((d: import('../types').DialogueEntry) => d.text)
  if (recentTexts.includes(text)) {
    const alternatives = Object.values(stateResponses).filter(t => t !== text && !recentTexts.includes(t))
    if (alternatives.length > 0) {
      text = alternatives[Math.floor(Math.random() * alternatives.length)]
    }
  }

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
  // 새 타입(3종)이 레거시 값(대사 트리)과 매칭되도록 매핑
  if (cond.questionType) {
    if (action.type !== 'question') return false
    const legacyMap: Record<string, string[]> = {
      fact_pursuit: ['fact_fixing', 'timeline'],
      motive_search: ['motive', 'context_expansion'],
      empathy_approach: ['empathy', 'provenance'],
    }
    const allowed = legacyMap[action.questionType] ?? [action.questionType]
    if (!allowed.includes(cond.questionType) && cond.questionType !== action.questionType) return false
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
  _evidenceId: string,
  target: PartyId,
  agentA: AgentState,
  agentB: AgentState,
  evidenceStates: Record<string, EvidenceRuntimeState>,
  disputeIds: string[],
): ResolvedDialogue | null {
  for (const disputeId of disputeIds) {
    const fakeAction: PlayerAction = {
      type: 'question',
      questionType: 'fact_pursuit',
      target,
      disputeId,
    }
    const result = resolveDialogue(fakeAction, agentA, agentB, evidenceStates)
    if (result) return result
  }
  return null
}
