/**
 * LLM으로 Phase 1(초기 진술)과 Phase 2(즉각 반박) 대사를 동적 생성한다.
 * v2: 프롬프트를 간결하게 하여 GPT-4o-mini 응답 품질 최적화.
 */
import { chatCompletion } from './llmClient'
import type { CaseData, DialogueEntry } from '../types'

export async function generatePhase1Dialogues(caseData: CaseData): Promise<Omit<DialogueEntry, 'id'>[]> {
  const { duo, context, disputes } = caseData
  const nameA = duo.partyA.name
  const nameB = duo.partyB.name
  const disputeList = disputes.map((d) => `${d.id}: ${d.name}`).join(', ')

  const prompt = `법정 심문 게임. ${nameA}(${duo.partyA.speechStyle.slice(0, 30)})와 ${nameB}(${duo.partyB.speechStyle.slice(0, 30)})의 초기 진술.

배경: ${context.description}
쟁점: ${disputeList}

규칙:
- A가 먼저 자기 입장 주장 → B가 끼어들어 반박 → A가 다시 반박 → 점점 격해짐
- 총 12~15개 대사. A와 B가 번갈아. 시스템(재판관 개입) 2~3개 섞어서.
- 70%는 같은 사실을 다른 해석으로, 30%만 모순.
- 각 대사에 (행동 묘사)를 괄호로.
- 한국어 존댓말, 법정.

JSON 배열만 출력. 형식: [{"speaker":"a|b|system","text":"대사 (행동묘사)","relatedDisputes":["d-1"]}]`

  try {
    const response = await chatCompletion(
      [{ role: 'user', content: prompt }],
      { temperature: 0.85, maxTokens: 2000 },
    )
    return parseDialogueArray(response)
  } catch (error) {
    console.warn('Phase 1 LLM 생성 실패:', error)
    return []
  }
}

export async function generatePhase2Dialogues(caseData: CaseData): Promise<Omit<DialogueEntry, 'id'>[]> {
  const { duo, disputes } = caseData
  const nameA = duo.partyA.name
  const nameB = duo.partyB.name

  const prompt = `법정 심문 게임의 즉각 반박.

${nameA}(${duo.partyA.speechStyle.slice(0, 30)}) vs ${nameB}(${duo.partyB.speechStyle.slice(0, 30)})

${nameA} 말버릇: ${duo.partyA.verbalTells.map((v) => v.pattern).slice(0, 2).join(' / ')}
${nameB} 말버릇: ${duo.partyB.verbalTells.map((v) => v.pattern).slice(0, 2).join(' / ')}

규칙:
- 10~12개 대사. A/B 핑퐁 반박.
- 감정이 격해지며 첫 모순 힌트 1개 노출.
- A가 화제를 전환하려 하면 B가 잡아당김.
- B가 과거를 끌어오면 A가 "해결된 일"이라고 방어.
- 마지막에 시스템이 "반박 종료, 심문 시작" 선언.
- (행동 묘사) 포함. 말버릇이 자연스럽게 나와야 함.

JSON 배열만. [{"speaker":"a|b|system","text":"대사 (행동묘사)","relatedDisputes":["d-1"]}]
쟁점 id: ${disputes.map((d) => `${d.id}(${d.name})`).join(', ')}`

  try {
    const response = await chatCompletion(
      [{ role: 'user', content: prompt }],
      { temperature: 0.85, maxTokens: 1500 },
    )
    return parseDialogueArray(response)
  } catch (error) {
    console.warn('Phase 2 LLM 생성 실패:', error)
    return []
  }
}

function parseDialogueArray(response: string): Omit<DialogueEntry, 'id'>[] {
  const json = extractJSON(response)
  const parsed = JSON.parse(json) as Array<{
    speaker: string; text: string; behaviorHint?: string; relatedDisputes?: string[]
  }>

  return parsed.map((d) => {
    // (행동 묘사)를 text에서 추출
    const behaviorMatch = d.text.match(/[（(]([^)）]+)[)）]/)
    const behaviorHint = d.behaviorHint || (behaviorMatch ? behaviorMatch[1] : undefined)
    const text = d.text.replace(/[（(][^)）]+[)）]/g, '').trim()

    return {
      speaker: d.speaker as 'a' | 'b' | 'system',
      text,
      relatedDisputes: d.relatedDisputes ?? [],
      turn: 0,
      behaviorHint,
    }
  })
}

function extractJSON(text: string): string {
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlock) return codeBlock[1].trim()
  const start = text.indexOf('[')
  const end = text.lastIndexOf(']')
  if (start !== -1 && end !== -1) return text.slice(start, end + 1)
  return text
}
