/**
 * 자유 질문 처리 엔진.
 * 플레이어의 자유 입력을 LLM이 분류하고, NPC 응답을 생성한다.
 *
 * 프롬프트는 웹 어드민(promptManager)에서 관리한다.
 */
import { chatCompletion } from './llmClient'
import { getPrompt, getPromptConfig } from '../api/promptManager'
import { buildAgentPrompt, getAgentConfig, isAgentLoaded } from '../api/agentManager'
import { buildSpeechGuide, getMyCall, getJudgeReference, getAngryCall } from './llmSpeechGuide'
import { eunneun } from '../utils/korean'
import type { CaseData, PartyId, QuestionType } from '../types'
import type { AgentState } from '../types'

export interface FreeQuestionResult {
  questionType: QuestionType | 'irrelevant'
  disputeId: string | null
  response: string
  behaviorHint: string
  secondaryDisputeId?: string | null
}

export async function processFreeQuestion(
  question: string,
  target: PartyId,
  agentA: AgentState,
  agentB: AgentState,
  caseData: CaseData,
): Promise<FreeQuestionResult> {
  const agent = target === 'a' ? agentA : agentB
  const party = target === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const opponent = target === 'a' ? caseData.duo.partyB : caseData.duo.partyA

  const lieStates = Object.entries(agent.lieStateMap)
    .map(([dId, entry]) => {
      const dispute = caseData.disputes.find(d => d.id === dId)
      return `${dId}(${dispute?.name ?? '?'}): ${entry.currentState}`
    }).join(', ')

  const disputeList = caseData.disputes.map(d => `${d.id}: ${d.name}`).join('\n')

  const rawCall = getMyCall(caseData.duo, target)
  const myCall = rawCall === '자기' ? '자기야' : rawCall
  const judgeRef = getJudgeReference(caseData.duo, target)
  const angryCall = getAngryCall(caseData.duo, target)

  const fqVars: Record<string, string> = {
    name: party.name,
    age: String(party.age),
    occupation: party.occupation,
    archetype: party.archetype,
    speechStyle: party.speechStyle,
    verbalTells: party.verbalTells.map(v => `${v.trigger}일 때: ${v.pattern}`).join(' / '),
    emotionalPhase: agent.emotionalState.phase,
    opponent: opponent.name,
    callForm: myCall,
    judgeRef,
    angryCall,
    lieStates,
    disputeList,
    speechGuide: buildSpeechGuide(caseData.duo, 'free', target),
  }

  const systemPrompt = isAgentLoaded()
    ? buildAgentPrompt('free_question', fqVars)
    : getPrompt('free_question', fqVars)

  const config = isAgentLoaded() ? getAgentConfig('free_question') : getPromptConfig('free_question')

  try {
    const raw = await chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `재판관: "${question}"` },
      ],
      { temperature: config.temperature, maxTokens: config.maxTokens },
    )

    return parseFreeQuestionResponse(raw)
  } catch {
    return {
      questionType: 'irrelevant',
      disputeId: null,
      response: `... ${eunneun(party.name)} 질문을 이해하지 못한 듯합니다.`,
      behaviorHint: '당황한 표정으로 침묵한다.',
    }
  }
}

function parseFreeQuestionResponse(raw: string): FreeQuestionResult {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON')
    const parsed = JSON.parse(jsonMatch[0])

    const validTypes: (QuestionType | 'irrelevant')[] = [
      'fact_pursuit', 'motive_search', 'empathy_approach', 'irrelevant',
    ]
    const questionType = validTypes.includes(parsed.questionType) ? parsed.questionType : 'irrelevant'

    const behaviorMatch = parsed.response?.match(/[（(]([^)）]+)[)）]/)
    const behaviorHint = parsed.behaviorHint || (behaviorMatch ? behaviorMatch[1] : '')
    const response = (parsed.response ?? '').replace(/[（(][^)）]+[)）]/g, '').trim()

    return {
      questionType,
      disputeId: parsed.disputeId ?? null,
      secondaryDisputeId: parsed.secondaryDisputeId ?? null,
      response: response || '...',
      behaviorHint,
    }
  } catch {
    return {
      questionType: 'irrelevant',
      disputeId: null,
      response: raw.slice(0, 200),
      behaviorHint: '',
    }
  }
}
