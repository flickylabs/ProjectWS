/**
 * 자유 질문 처리 엔진.
 * 플레이어의 자유 입력을 LLM이 분류하고, NPC 응답을 생성한다.
 */
import { chatCompletion } from './llmClient'
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

  const systemPrompt = `당신은 법정 심문 게임의 NPC "${party.name}"입니다.

## 캐릭터
- 이름: ${party.name} (${party.age}세, ${party.occupation})
- 성격: ${party.archetype}
- 말투: ${party.speechStyle}
- 말버릇: ${party.verbalTells.map(v => `${v.trigger}일 때: ${v.pattern}`).join(' / ')}
- 현재 감정: ${agent.emotionalState.phase}
- 상대: ${opponent.name}
- 호칭: 상대를 "${myCall}"로 부름. 재판관에게 상대 언급 시 "${judgeRef}". 감정 폭발 시 "${angryCall}".

## 현재 거짓말 상태
${lieStates}
(S0=완강히 부정, S1=동요, S2=일부 인정, S3=책임 전가, S4=감정 호소, S5=인정)

## 쟁점 목록
${disputeList}

${buildSpeechGuide(caseData.duo, 'free', target)}

## 규칙
1. 재판관의 자유 질문에 캐릭터로서 대답하세요.
2. lieState S0~S3이면 절대 진실을 완전히 고백하지 마세요. 회피, 부분 인정, 책임 전가.
3. lieState S4~S5이면 더 솔직하게 답변.
4. 말투와 말버릇을 반영하세요.
5. 답변은 2~3문장. 행동 묘사는 넣지 말고 behaviorHint에 따로 적으세요.

## 출력 형식 (JSON만)
{"questionType":"fact_pursuit|motive_search|empathy_approach|irrelevant","disputeId":"d-1~d-5 중 관련 있는 것, 없으면 null","secondaryDisputeId":"두 번째 쟁점 또는 null","response":"NPC 대사만 (괄호 행동묘사 넣지 마)","behaviorHint":"행동/표정 묘사만 따로"}`

  try {
    const raw = await chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `재판관: "${question}"` },
      ],
      { temperature: 0.7, maxTokens: 400 },
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
