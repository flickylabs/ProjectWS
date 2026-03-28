/**
 * LLM으로 Phase 1(초기 진술)과 Phase 2(즉각 반박) 대사를 동적 생성한다.
 *
 * 프롬프트는 웹 어드민(promptManager)에서 관리한다.
 */
import { chatCompletion } from './llmClient'
import { getPrompt, getPromptConfig } from '../api/promptManager'
import { buildAgentPrompt, getAgentConfig, isAgentLoaded } from '../api/agentManager'
import { buildSpeechGuide, getRelationLabel } from './llmSpeechGuide'
import type { CaseData, DialogueEntry } from '../types'

export async function generatePhase1Dialogues(caseData: CaseData): Promise<Omit<DialogueEntry, 'id'>[]> {
  const { duo, context, disputes } = caseData
  const nameA = duo.partyA.name
  const nameB = duo.partyB.name
  const disputeList = disputes.map((d) => `${d.id}: ${d.name}`).join(', ')
  const relLabel = getRelationLabel(duo.relationshipType)

  const p1Vars = {
    nameA,
    speechStyleA: duo.partyA.speechStyle.slice(0, 50),
    nameB,
    speechStyleB: duo.partyB.speechStyle.slice(0, 50),
    relationship: relLabel,
    context: context.description,
    disputeList,
    speechGuide: buildSpeechGuide(duo, 'phase1'),
  }

  const prompt = isAgentLoaded()
    ? buildAgentPrompt('phase1_generator', p1Vars)
    : getPrompt('phase1_generation', p1Vars)

  const config = isAgentLoaded() ? getAgentConfig('phase1_generator') : getPromptConfig('phase1_generation')

  try {
    const response = await chatCompletion(
      [{ role: 'user', content: prompt }],
      { temperature: config.temperature, maxTokens: config.maxTokens },
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
  const relLabel = getRelationLabel(duo.relationshipType)

  const p2Vars = {
    nameA,
    speechStyleA: duo.partyA.speechStyle.slice(0, 50),
    nameB,
    speechStyleB: duo.partyB.speechStyle.slice(0, 50),
    relationship: relLabel,
    verbalTellsA: duo.partyA.verbalTells.map((v) => v.pattern).slice(0, 2).join(' / '),
    verbalTellsB: duo.partyB.verbalTells.map((v) => v.pattern).slice(0, 2).join(' / '),
    speechGuide: buildSpeechGuide(duo, 'phase2'),
    disputeListWithNames: disputes.map((d) => `${d.id}(${d.name})`).join(', '),
  }

  const prompt = isAgentLoaded()
    ? buildAgentPrompt('phase2_generator', p2Vars)
    : getPrompt('phase2_generation', p2Vars)

  const config = isAgentLoaded() ? getAgentConfig('phase2_generator') : getPromptConfig('phase2_generation')

  try {
    const response = await chatCompletion(
      [{ role: 'user', content: prompt }],
      { temperature: config.temperature, maxTokens: config.maxTokens },
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
