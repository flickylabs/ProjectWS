/**
 * LLM 기반 대화 해석기 v2.
 * 시스템 프롬프트를 간결하고 정확하게 구성하여 응답 품질을 높인다.
 * 연결 실패 시 기존 대사 트리 폴백.
 */
import { chatCompletion } from './llmClient'
import { resolveDialogue as fallbackResolve, type ResolvedDialogue } from './dialogueResolver'
import type { PlayerAction, PartyId, DialogueNode, AgentState } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'
import type { CaseData } from '../types'

export async function resolveLLMDialogue(
  action: PlayerAction,
  agentA: AgentState,
  agentB: AgentState,
  evidenceStates: Record<string, EvidenceRuntimeState>,
  caseData: CaseData,
): Promise<ResolvedDialogue | null> {
  if (action.type !== 'question' && action.type !== 'evidence_present' && action.type !== 'trust_action') {
    return null
  }

  const target: PartyId = 'target' in action ? action.target : 'a'
  const agent = target === 'a' ? agentA : agentB
  const profile = target === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const opponent = target === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  const disputeId = 'disputeId' in action ? (action as { disputeId?: string }).disputeId : undefined
  const dispute = disputeId ? caseData.disputes.find((d) => d.id === disputeId) : undefined
  const lieEntry = disputeId ? agent.lieStateMap[disputeId] : undefined

  const systemPrompt = buildSystemPrompt(profile, opponent, agent, lieEntry, dispute, caseData, target)
  const userPrompt = buildUserPrompt(action, dispute, profile.name)

  try {
    const response = await chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      { temperature: 0.85, maxTokens: 150 },
    )

    if (!response.trim()) throw new Error('Empty response')

    const parsed = parseLLMResponse(response, target, disputeId)
    return { node: parsed, target }
  } catch (error) {
    console.warn('LLM 호출 실패, 폴백:', error)
    return fallbackResolve(action, agentA, agentB, evidenceStates)
  }
}

function buildSystemPrompt(
  me: CaseData['duo']['partyA'],
  opponent: CaseData['duo']['partyA'],
  agent: AgentState,
  lieEntry: AgentState['lieStateMap'][string] | undefined,
  dispute: CaseData['disputes'][number] | undefined,
  caseData: CaseData,
  party: PartyId,
): string {
  // 핵심만 간결하게. GPT-4o-mini는 짧은 프롬프트에서 더 잘 작동.
  const lines: string[] = []

  // 페르소나 (2줄)
  lines.push(`당신은 ${me.name}(${me.age}세, ${me.occupation}).`)
  lines.push(`성격: ${me.speechStyle}`)

  // 상황 (1줄)
  lines.push(`법정에서 ${opponent.name}과(와) 분쟁 중. 배경: ${caseData.context.description}`)

  // 내가 아는 사실 (핵심만)
  const myQuadrant = party === 'a' ? 'a_only' : 'b_only'
  const myFacts = caseData.truthTable.filter(
    (t) => t.quadrant === 'both_know' || t.quadrant === myQuadrant,
  )
  if (myFacts.length > 0) {
    lines.push(`\n당신이 아는 사실:`)
    for (const f of myFacts.slice(0, 4)) {
      lines.push(`- ${f.fact}${f.isTrue ? '' : ' (당신은 사실이라 믿지만 오해일 수 있음)'}`)
    }
  }

  // 현재 쟁점 + 거짓말 상태 (핵심)
  if (lieEntry && dispute) {
    const stateInstructions: Record<string, string> = {
      S0: '이 쟁점을 완전히 부정하세요. 자신감 있게.',
      S1: '약간 흔들리고 있습니다. 배경을 설명하되 핵심은 부정하세요.',
      S2: '일부를 인정합니다. "맞지만 이유가 다르다"고 하세요.',
      S3: '상대 탓으로 돌리세요. "내가 그런 건 상대 때문"이라고.',
      S4: '감정적으로 호소하세요. 논리보다 감정으로.',
      S5: '인정합니다. 사실을 인정하되 자기 입장에서 재해석하세요.',
    }
    const motiveHints: Record<string, string> = {
      self_protection: '자기를 보호하려는 마음',
      face_saving: '체면을 지키려는 마음',
      shame_avoidance: '수치심을 피하려는 마음 — 공감 질문에 약함',
      relationship_maintenance: '관계를 지키려는 마음 — 비공개 보장에 약함',
      revenge: '복수심 — 압박에 오히려 공격적',
      third_party_protection: '누군가를 보호하려는 마음',
      career_preservation: '직장/평판을 지키려는 마음',
    }

    lines.push(`\n쟁점: "${dispute.name}"`)
    lines.push(stateInstructions[lieEntry.currentState] ?? '')

    if (!dispute.truth && lieEntry.currentState <= 'S1') {
      lines.push(`(이 쟁점은 사실이 아닙니다 — 당신은 진짜로 안 했습니다. 억울하게 부정하세요.)`)
    }

    lines.push(`거짓말 동기: ${motiveHints[lieEntry.lieMotive] ?? ''}`)
  }

  // 감정 (1줄)
  lines.push(`\n현재 감정: ${agent.emotionalState.behaviorHint || agent.emotionalState.phase}`)

  // 말버릇 (1줄)
  const activeTell = me.verbalTells.find((v) =>
    (v.trigger === 'lying' && lieEntry && lieEntry.currentState <= 'S2') ||
    (v.trigger === 'cornered' && lieEntry && lieEntry.currentState >= 'S3') ||
    (v.trigger === 'emotional' && (agent.emotionalState.phase === 'angry' || agent.emotionalState.phase === 'shaken')),
  )
  if (activeTell) {
    lines.push(`말버릇 발동: ${activeTell.pattern}`)
  }

  // 규칙 (필수 3줄)
  lines.push(`\n규칙: 1~2문장. 한국어 존댓말. 법정 상황. (행동 묘사)를 괄호로 넣으세요.`)

  return lines.join('\n')
}

function buildUserPrompt(action: PlayerAction, dispute?: CaseData['disputes'][number], myName?: string): string {
  const topic = dispute?.name ?? '해당 사안'

  if (action.type === 'question') {
    const prompts: Record<string, string> = {
      fact_fixing: `재판관: "${myName} 씨, ${topic}에 대해 정확한 사실을 말씀해 주십시오."`,
      timeline: `재판관: "${myName} 씨, ${topic} 당시 시간 순서를 정리해 주십시오."`,
      motive: `재판관: "${myName} 씨, ${topic}에 대해 왜 그런 선택을 하셨습니까?"`,
      context_expansion: `재판관: "${myName} 씨, ${topic}의 전후 상황을 말씀해 주십시오."`,
      provenance: `재판관: "${myName} 씨, 그 정보를 어디서 어떻게 알게 되셨습니까?"`,
      empathy: `재판관: "${myName} 씨, 말하기 어려우시면 천천히 하셔도 됩니다."`,
    }
    return prompts[action.questionType] ?? `재판관이 ${topic}에 대해 질문합니다.`
  }

  if (action.type === 'evidence_present') {
    return `재판관이 ${topic} 관련 증거를 제시했습니다. 이 증거에 대해 반응하세요.`
  }

  if (action.type === 'trust_action') {
    const prompts: Record<string, string> = {
      confidential_protection: `재판관: "이 말은 상대에게 공개하지 않겠습니다." — 비공개가 보장되었으니 솔직해질 수 있습니다.`,
      interruption_block: `재판관이 상대의 개입을 차단했습니다. 안전한 환경에서 말할 수 있습니다.`,
      retaliation_check: `재판관: "말씀하신 후 불이익이 걱정되시나요?" — 걱정에 대해 솔직히 답하세요.`,
      emotional_stabilization: `재판관이 진정할 시간을 주었습니다. 감정이 가라앉고 더 솔직해질 수 있습니다.`,
      pre_disclosure_consent: `재판관: "이 내용을 공개해도 괜찮겠습니까?" — 신뢰 수준에 따라 답하세요.`,
    }
    return prompts[action.actionType] ?? '재판관이 조치를 취했습니다.'
  }

  return '재판관이 질문합니다.'
}

function parseLLMResponse(response: string, speaker: PartyId, disputeId?: string): DialogueNode {
  // (행동 묘사)를 추출
  const behaviorMatch = response.match(/[（(]([^)）]+)[)）]/)
  const behaviorHint = behaviorMatch ? behaviorMatch[1] : undefined
  const text = response.replace(/[（(][^)）]+[)）]/g, '').trim()

  return {
    id: `llm-${Date.now()}`,
    conditions: disputeId ? { disputeId } : {},
    speaker,
    text: text || response,
    behaviorHint,
    effects: {},
  }
}
