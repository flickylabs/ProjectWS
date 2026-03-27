/**
 * LLM으로 Phase 1(초기 진술)과 Phase 2(즉각 반박) 대사를 동적 생성한다.
 */
import { chatCompletion } from './llmClient'
import { buildSpeechGuide, getHonorifics, getRelationLabel } from './llmSpeechGuide'
import type { CaseData, DialogueEntry } from '../types'

export async function generatePhase1Dialogues(caseData: CaseData): Promise<Omit<DialogueEntry, 'id'>[]> {
  const { duo, context, disputes } = caseData
  const nameA = duo.partyA.name
  const nameB = duo.partyB.name
  const disputeList = disputes.map((d) => `${d.id}: ${d.name}`).join(', ')
  const relLabel = getRelationLabel(duo.relationshipType)

  const prompt = `법정 심문 게임. ${nameA}(${duo.partyA.speechStyle.slice(0, 50)})와 ${nameB}(${duo.partyB.speechStyle.slice(0, 50)})의 초기 진술.
관계: ${relLabel}

배경: ${context.description}
쟁점: ${disputeList}

${buildSpeechGuide(duo, 'phase1')}

## 대사 규칙
- A가 먼저 재판관에게 자기 입장 진술(존댓말) → B가 끼어들어 반박(반말) → A가 대응 → 점점 격해짐
- 총 8~10개 대사. A와 B가 번갈아. 시스템(재판관 개입) 1~2개 섞어서.
- 각 대사는 2~3문장으로 완결. 중간에 자르지 마세요.
- (행동 묘사)를 대사 끝에 괄호로.

JSON 배열만 출력.
⚠️ speaker 필드는 반드시 소문자 "a", "b", "system" 중 하나만 사용하세요. 이름을 넣지 마세요.
형식: [{"speaker":"a","text":"대사 (행동묘사)","relatedDisputes":["d-1"]}]`

  try {
    const response = await chatCompletion(
      [{ role: 'user', content: prompt }],
      { temperature: 0.85, maxTokens: 4000 },
    )
    return parseDialogueArray(response, nameA, nameB)
  } catch (error) {
    console.warn('Phase 1 LLM 생성 실패:', error)
    return []
  }
}

export async function generatePhase2Dialogues(caseData: CaseData): Promise<Omit<DialogueEntry, 'id'>[]> {
  const { duo, disputes } = caseData
  const nameA = duo.partyA.name
  const nameB = duo.partyB.name
  const { aCallsB, bCallsA } = getHonorifics(duo)
  const relLabel = getRelationLabel(duo.relationshipType)

  const prompt = `법정 심문 게임의 즉각 반박.
관계: ${relLabel}

${nameA}(${duo.partyA.speechStyle.slice(0, 50)}) vs ${nameB}(${duo.partyB.speechStyle.slice(0, 50)})

${nameA} 말버릇: ${duo.partyA.verbalTells.map((v) => v.pattern).slice(0, 2).join(' / ')}
${nameB} 말버릇: ${duo.partyB.verbalTells.map((v) => v.pattern).slice(0, 2).join(' / ')}

${buildSpeechGuide(duo, 'phase2')}

## 대사 규칙
- 6~8개 대사. 서로에게 직접 따지는 반박. 감정 격화 + 첫 모순 힌트 1개.
- A가 화제 전환 시도 → B가 잡아당김.
- 마지막에 시스템이 "반박 종료, 심문 시작" 선언.
- 각 대사는 2~3문장. 중간에 자르지 마세요.
- (행동 묘사) 포함. 말버릇 자연스럽게.

JSON 배열만. ⚠️ speaker는 반드시 소문자 "a", "b", "system"만 사용.
[{"speaker":"a","text":"대사 (행동묘사)","relatedDisputes":["d-1"]}]
쟁점 id: ${disputes.map((d) => `${d.id}(${d.name})`).join(', ')}`

  try {
    const response = await chatCompletion(
      [{ role: 'user', content: prompt }],
      { temperature: 0.85, maxTokens: 3000 },
    )
    return parseDialogueArray(response, nameA, nameB)
  } catch (error) {
    console.warn('Phase 2 LLM 생성 실패:', error)
    return []
  }
}

/** LLM이 반환하는 speaker 값을 정규화 (이름 매칭 포함) */
function normalizeSpeaker(raw: string, nameA?: string, nameB?: string): 'a' | 'b' | 'system' {
  const s = raw.toLowerCase().trim()
  // 기본 키워드 매칭
  if (s === 'a' || s === 'partya' || s === 'party_a') return 'a'
  if (s === 'b' || s === 'partyb' || s === 'party_b') return 'b'
  if (s === 'system' || s === 'judge' || s === '재판관' || s === '시스템') return 'system'
  // 캐릭터 이름 매칭 (LLM이 이름을 직접 반환하는 경우)
  if (nameA && s === nameA.toLowerCase()) return 'a'
  if (nameB && s === nameB.toLowerCase()) return 'b'
  // 이름 부분 매칭 (성만 또는 이름만)
  if (nameA && (s.includes(nameA.toLowerCase()) || nameA.toLowerCase().includes(s))) return 'a'
  if (nameB && (s.includes(nameB.toLowerCase()) || nameB.toLowerCase().includes(s))) return 'b'
  return 'system'
}

function parseDialogueArray(response: string, nameA?: string, nameB?: string): Omit<DialogueEntry, 'id'>[] {
  const json = extractJSON(response)
  const parsed = JSON.parse(json) as Array<{
    speaker: string; text: string; behaviorHint?: string; relatedDisputes?: string[]
  }>

  return parsed.map((d) => {
    const behaviorMatch = d.text.match(/[（(]([^)）]+)[)）]/)
    const behaviorHint = d.behaviorHint || (behaviorMatch ? behaviorMatch[1] : undefined)
    const text = d.text.replace(/[（(][^)）]+[)）]/g, '').trim()

    return {
      speaker: normalizeSpeaker(d.speaker, nameA, nameB),
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
