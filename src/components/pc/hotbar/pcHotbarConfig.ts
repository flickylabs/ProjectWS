import type { QuestionType } from '../../../types'

export const HOTBAR_DRAG_TYPE = 'application/x-solomon-hotbar-item'
export const HOTBAR_SLOT_COUNT = 6

export const HOTBAR_PAGES = ['interrogation', 'evidence', 'special'] as const

export type HotbarPage = typeof HOTBAR_PAGES[number]
export type HotbarQuestionType = Extract<QuestionType, 'fact_pursuit' | 'motive_search' | 'empathy_approach'>
export type HotbarSpecialAction =
  | 'objection'
  | 'immediate_answer'
  | 'separation'
  | 'confidential_protection'
  | 'advance_phase'

export type HotbarSlotConfig =
  | { kind: 'question'; questionType: HotbarQuestionType }
  | { kind: 'free_question' }
  | { kind: 'emotion_analysis' }
  | { kind: 'appraise' }
  | { kind: 'evidence'; evidenceId: string }
  | { kind: 'special'; action: HotbarSpecialAction }
  | { kind: 'empty' }

export type HotbarLayout = Record<HotbarPage, HotbarSlotConfig[]>

const QUESTION_TYPES: HotbarQuestionType[] = ['fact_pursuit', 'motive_search', 'empathy_approach']
const SPECIAL_ACTIONS: HotbarSpecialAction[] = [
  'objection',
  'immediate_answer',
  'separation',
  'confidential_protection',
  'advance_phase',
]

function fillSlots(slots: HotbarSlotConfig[]): HotbarSlotConfig[] {
  return [...slots, ...Array.from({ length: Math.max(0, HOTBAR_SLOT_COUNT - slots.length) }, () => ({ kind: 'empty' } as const))]
    .slice(0, HOTBAR_SLOT_COUNT)
}

export function createDefaultHotbarLayout(unlockedEvidenceIds: string[]): HotbarLayout {
  return {
    interrogation: fillSlots([
      { kind: 'question', questionType: 'fact_pursuit' },
      { kind: 'question', questionType: 'motive_search' },
      { kind: 'question', questionType: 'empathy_approach' },
      { kind: 'free_question' },
      { kind: 'emotion_analysis' },
    ]),
    evidence: fillSlots(unlockedEvidenceIds.slice(0, HOTBAR_SLOT_COUNT).map((evidenceId) => ({ kind: 'evidence', evidenceId }))),
    special: fillSlots([
      { kind: 'appraise' },
      { kind: 'special', action: 'objection' },
      { kind: 'special', action: 'immediate_answer' },
      { kind: 'special', action: 'separation' },
      { kind: 'special', action: 'confidential_protection' },
      { kind: 'special', action: 'advance_phase' },
    ]),
  }
}

function isQuestionType(value: unknown): value is HotbarQuestionType {
  return QUESTION_TYPES.includes(value as HotbarQuestionType)
}

function isSpecialAction(value: unknown): value is HotbarSpecialAction {
  return SPECIAL_ACTIONS.includes(value as HotbarSpecialAction)
}

function normalizeSlotConfig(value: unknown, availableEvidenceIds: Set<string>): HotbarSlotConfig {
  if (!value || typeof value !== 'object') {
    return { kind: 'empty' }
  }

  const slot = value as Partial<HotbarSlotConfig>
  switch (slot.kind) {
    case 'question':
      return isQuestionType(slot.questionType) ? { kind: 'question', questionType: slot.questionType } : { kind: 'empty' }
    case 'free_question':
      return { kind: 'free_question' }
    case 'emotion_analysis':
      return { kind: 'emotion_analysis' }
    case 'appraise':
      return { kind: 'appraise' }
    case 'evidence':
      return typeof slot.evidenceId === 'string' && availableEvidenceIds.has(slot.evidenceId)
        ? { kind: 'evidence', evidenceId: slot.evidenceId }
        : { kind: 'empty' }
    case 'special':
      return isSpecialAction(slot.action) ? { kind: 'special', action: slot.action } : { kind: 'empty' }
    case 'empty':
      return { kind: 'empty' }
    default:
      return { kind: 'empty' }
  }
}

export function sanitizeHotbarLayout(value: unknown, unlockedEvidenceIds: string[]): HotbarLayout {
  const evidenceIdSet = new Set(unlockedEvidenceIds)
  const fallback = createDefaultHotbarLayout(unlockedEvidenceIds)

  if (!value || typeof value !== 'object') {
    return fallback
  }

  const layout = value as Partial<Record<HotbarPage, unknown>>
  const next = { ...fallback }

  for (const page of HOTBAR_PAGES) {
    const pageSlots = Array.isArray(layout[page]) ? layout[page] : []
    next[page] = fillSlots(pageSlots.map((slot) => normalizeSlotConfig(slot, evidenceIdSet)))
  }

  return next
}
