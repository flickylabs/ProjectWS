import type { CaseData, PartyId } from '../types'
import type { ScriptedAngleDefinition } from '../types/scriptedAngleText'
import { normalizeCaseKey } from '../utils/caseHelpers.ts'
import {
  classifyScriptedAnglesFromText,
  GENERAL_SCRIPTED_ANGLE,
  getScriptedAngleDefinitions,
  getScriptedAngleLabel,
  getUnlockedScriptedAngleIds,
} from './scriptedAngleTextLoader.ts'

export const GENERAL_QUESTION_ANGLE = GENERAL_SCRIPTED_ANGLE

export type QuestionAngleDefinition = ScriptedAngleDefinition

export interface QuestionAngleRuntimeContext {
  caseId: string
  caseData?: CaseData | null
  disputeId: string
  target?: PartyId | null
  evidenceStates?: Record<string, { unlocked?: boolean; investigatedActions?: string[]; presented?: boolean }>
  calledWitnesses?: string[]
}

export interface GeneratedQuestionAngleOption {
  id: string
  text: string
  behaviorHint: string
  answerAngle: string
}

const FALLBACK_GENERAL_ANGLE: QuestionAngleDefinition = {
  disputeId: '',
  angleId: GENERAL_QUESTION_ANGLE,
  label: '경위 확인',
  description: '선택한 안건에서 확인된 행동, 기록, 추정을 분리해 확인한다.',
  keywords: [],
  unlockCondition: { defaultUnlocked: true },
}

export function getQuestionAngleDefinitions(caseId: string, disputeId: string): QuestionAngleDefinition[] {
  const definitions = getScriptedAngleDefinitions(normalizeCaseKey(caseId), disputeId)
  if (definitions.length > 0) return definitions
  return [{ ...FALLBACK_GENERAL_ANGLE, disputeId }]
}

export function getQuestionAngleLabel(angleId?: string | null, caseId?: string, disputeId?: string): string {
  if (!angleId) return FALLBACK_GENERAL_ANGLE.label
  if (caseId && disputeId) {
    const label = getScriptedAngleLabel(normalizeCaseKey(caseId), disputeId, angleId)
    if (label) return label
  }
  return getFallbackAngleLabel(angleId)
}

export function getUnlockedQuestionAngleIds(context: QuestionAngleRuntimeContext): string[] {
  const ids = getUnlockedScriptedAngleIds({
    caseId: normalizeCaseKey(context.caseId),
    disputeId: context.disputeId,
    evidenceStates: context.evidenceStates,
    calledWitnesses: context.calledWitnesses,
  })
  if (ids.length > 0) return ids
  return [GENERAL_QUESTION_ANGLE]
}

export function classifyQuestionAnglesFromText(
  caseId: string,
  disputeId: string,
  rawText: string,
  evidenceRef?: string | null,
): string[] {
  const matches = classifyScriptedAnglesFromText(normalizeCaseKey(caseId), disputeId, rawText, evidenceRef)
  return matches.length > 0 ? matches : [GENERAL_QUESTION_ANGLE]
}

export function buildGeneratedQuestionAngleOptions(
  context: QuestionAngleRuntimeContext & { questionType: string; limit?: number; seed?: number },
): GeneratedQuestionAngleOption[] {
  const caseId = normalizeCaseKey(context.caseId)
  const limit = Math.max(1, context.limit ?? 5)
  const partyName = resolvePartyName(context)
  const definitions = getQuestionAngleDefinitions(caseId, context.disputeId)
  const unlocked = new Set(getUnlockedQuestionAngleIds(context))
  const candidates: GeneratedQuestionAngleOption[] = []

  for (const definition of definitions) {
    if (!unlocked.has(definition.angleId)) continue
    const templates = getGenericQuestionTemplates(context.questionType, definition)
    for (let index = 0; index < templates.length; index += 1) {
      candidates.push({
        id: `generated-${caseId}-${context.disputeId}-${context.questionType}-${definition.angleId}-${index + 1}`,
        answerAngle: definition.angleId,
        text: templates[index].replace(/\{name\}/g, partyName),
        behaviorHint: definition.description,
      })
    }
  }

  return shuffleGeneratedOptions(dedupeGeneratedOptions(candidates), context.seed ?? 0).slice(0, limit)
}

function getGenericQuestionTemplates(questionType: string, definition: QuestionAngleDefinition): string[] {
  const label = definition.angleId === GENERAL_QUESTION_ANGLE
    ? '해당 안건'
    : definition.label || '해당 안건'
  const description = definition.description || label

  if (questionType === 'motive_search') {
    return [
      `{name} 씨, ${label}에서 늦게 말했거나 숨긴 대목이 있다면 그 이유부터 설명하십시오.`,
      `${description} 그중 실제 이유와 나중에 붙은 해명을 구분해 주십시오.`,
      `${label}을 말하지 못하게 만든 가장 큰 부담이 무엇이었습니까.`,
      `${label}에서 상대가 오해한 부분과 본인이 책임져야 할 부분을 나눠 말씀하십시오.`,
      `{name} 씨, ${label}을 처음부터 말하지 못한 사정을 구체적으로 설명하십시오.`,
    ]
  }

  if (questionType === 'empathy_approach') {
    return [
      `{name} 씨, ${label}을 꺼내기 어려웠다면 그때의 감정부터 말씀해 주십시오.`,
      `${description} 그 과정에서 마음이 흔들린 순간이 있었습니까.`,
      `${label} 때문에 상대에게 상처를 준 부분을 지금은 어떻게 보고 있습니까.`,
      `${label}을 늦게 말한 이유가 두려움 때문이었는지 설명해 주십시오.`,
      `{name} 씨, ${label}과 관련해 지금 바로잡고 싶은 말이 있다면 말씀하십시오.`,
    ]
  }

  return [
    `{name} 씨, ${label}에서 직접 한 일과 나중에 알게 된 일을 나눠 말씀하십시오.`,
    `${description} 기록으로 확인되는 부분과 아직 다투는 부분을 구분해 주십시오.`,
    `${label}을 상대가 다르게 받아들인 이유가 무엇인지 설명하십시오.`,
    `${label}에서 빠뜨렸거나 늦게 설명한 사실이 있습니까.`,
    `{name} 씨, ${label}을 판단할 때 먼저 확인해야 할 행동부터 정리하십시오.`,
  ]
}

function getFallbackAngleLabel(angleId: string): string {
  const fallback: Record<string, string> = {
    [GENERAL_QUESTION_ANGLE]: '경위 확인',
    visit_route: '오피스텔 방문',
    call_record: '새벽 전화',
    family_items: '영수증 물건',
    affair_denial: '외도 의심',
    money_flow: '금전 흐름',
    document_origin: '문서 출처',
    relationship_context: '관계 맥락',
    message_context: '메시지 맥락',
    witness_context: '증인 발언',
  }
  return fallback[angleId] ?? angleId
}

function resolvePartyName(context: QuestionAngleRuntimeContext): string {
  if (!context.caseData || !context.target) return '당사자'
  return context.target === 'a'
    ? context.caseData.duo.partyA.name
    : context.caseData.duo.partyB.name
}

function dedupeGeneratedOptions(options: GeneratedQuestionAngleOption[]): GeneratedQuestionAngleOption[] {
  const seen = new Set<string>()
  const result: GeneratedQuestionAngleOption[] = []
  for (const option of options) {
    const key = option.text.replace(/\s+/g, ' ').trim()
    if (!key || seen.has(key)) continue
    seen.add(key)
    result.push(option)
  }
  return result
}

function shuffleGeneratedOptions(options: GeneratedQuestionAngleOption[], seed: number): GeneratedQuestionAngleOption[] {
  return [...options].sort((a, b) => stableGeneratedScore(`${seed}:${a.id}:${a.text}`) - stableGeneratedScore(`${seed}:${b.id}:${b.text}`))
}

function stableGeneratedScore(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}
