import type { StateCreator } from 'zustand'
import { Phase } from '../../types'
import {
  emitTutorialFinished,
  emitTutorialRestartedFromSettings,
  emitTutorialSkipped,
  emitTutorialStarted,
  emitTutorialStepCompleted,
} from '../../telemetry/wirePoints'

export const SPOUSE01_TUTORIAL_STORAGE_KEY = 'solomon.tutorial.spouse01.v1'

export const TUTORIAL_STEP_IDS = [
  'briefing-advance',
  'initial-statement-acknowledge',
  'dispute-focus-d1',
  'target-select-b',
  'question-fact',
  'evidence-investigate-e2',
  'evidence-present-e2-to-b',
  'feedback-acknowledge',
  'observation-hint',
  'tutorial-complete',
] as const

export type TutorialStepId = typeof TUTORIAL_STEP_IDS[number]

type TutorialProgressFlag = {
  skipped: boolean
  completedAt: string | null
}

export interface TutorialState {
  enabled: boolean
  activeCase: 'spouse-01' | null
  currentStepId: TutorialStepId | null
  completedSteps: TutorialStepId[]
  isOverlayVisible: boolean
  startTutorial: (caseId: 'spouse-01') => void
  advanceStep: (stepId: TutorialStepId) => void
  skipTutorial: () => void
  restartTutorial: () => void
  markStepComplete: (stepId: TutorialStepId) => void
}

const DEFAULT_FLAG: TutorialProgressFlag = {
  skipped: false,
  completedAt: null,
}

let tutorialStartedAt = Date.now()

function readProgressFlag(): TutorialProgressFlag {
  if (typeof localStorage === 'undefined') return DEFAULT_FLAG
  try {
    const raw = localStorage.getItem(SPOUSE01_TUTORIAL_STORAGE_KEY)
    if (!raw) return DEFAULT_FLAG
    const parsed = JSON.parse(raw) as Partial<TutorialProgressFlag>
    return {
      skipped: Boolean(parsed.skipped),
      completedAt: typeof parsed.completedAt === 'string' ? parsed.completedAt : null,
    }
  } catch {
    return DEFAULT_FLAG
  }
}

export function shouldRunSpouse01Tutorial(caseId: string | null | undefined): boolean {
  const normalizedCaseId = String(caseId ?? '').replace(/^case-/, '')
  if (normalizedCaseId !== 'spouse-01') return false

  const flag = readProgressFlag()
  return !flag.skipped && !flag.completedAt
}

function writeProgressFlag(flag: TutorialProgressFlag): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(SPOUSE01_TUTORIAL_STORAGE_KEY, JSON.stringify(flag))
  } catch {
    // localStorage can be unavailable in restricted browser contexts.
  }
}

function clearProgressFlag(): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.removeItem(SPOUSE01_TUTORIAL_STORAGE_KEY)
  } catch {
    // localStorage can be unavailable in restricted browser contexts.
  }
}

function emitTutorialTelemetry(type: string, detail: Record<string, unknown> = {}): void {
  const caseId = typeof detail.caseId === 'string' ? detail.caseId : undefined
  const stepId = typeof detail.stepId === 'string' ? detail.stepId : undefined
  if (type === 'started') {
    tutorialStartedAt = Date.now()
    emitTutorialStarted(caseId)
  } else if (type === 'step_completed' && stepId) {
    emitTutorialStepCompleted(stepId, caseId)
  } else if (type === 'skipped') {
    emitTutorialSkipped(stepId, caseId)
  } else if (type === 'finished') {
    emitTutorialFinished((Date.now() - tutorialStartedAt) / 1000, caseId)
  } else if (type === 'restarted_from_settings') {
    tutorialStartedAt = Date.now()
    emitTutorialRestartedFromSettings(caseId)
  }

  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(`tutorial:${type}`, { detail }))
}

function getNextStepId(stepId: TutorialStepId): TutorialStepId | null {
  const index = TUTORIAL_STEP_IDS.indexOf(stepId)
  if (index < 0) return null
  return TUTORIAL_STEP_IDS[index + 1] ?? null
}

export const createTutorialSlice: StateCreator<TutorialState, [], [], TutorialState> = (set, get) => ({
  enabled: false,
  activeCase: null,
  currentStepId: null,
  completedSteps: [],
  isOverlayVisible: false,

  startTutorial: (caseId) => {
    const current = get()
    if (current.enabled && current.activeCase === caseId) return

    const flag = readProgressFlag()
    if (flag.skipped || flag.completedAt) {
      set({
        enabled: false,
        activeCase: null,
        currentStepId: null,
        completedSteps: [],
        isOverlayVisible: false,
      })
      return
    }

    set({
      enabled: true,
      activeCase: caseId,
      currentStepId: TUTORIAL_STEP_IDS[0],
      completedSteps: [],
      isOverlayVisible: true,
    })
    emitTutorialTelemetry('started', { caseId })
  },

  advanceStep: (stepId) => {
    get().markStepComplete(stepId)
  },

  markStepComplete: (stepId) => {
    const state = get()
    if (!state.enabled || state.currentStepId !== stepId || state.activeCase !== 'spouse-01') return

    const completedSteps = state.completedSteps.includes(stepId)
      ? state.completedSteps
      : [...state.completedSteps, stepId]
    const nextStepId = getNextStepId(stepId)

    emitTutorialTelemetry('step_completed', { caseId: state.activeCase, stepId })

    if (!nextStepId) {
      writeProgressFlag({ skipped: false, completedAt: new Date().toISOString() })
      set({
        enabled: false,
        activeCase: null,
        currentStepId: null,
        completedSteps,
        isOverlayVisible: false,
      })
      emitTutorialTelemetry('finished', { caseId: state.activeCase })
      return
    }

    set({
      completedSteps,
      currentStepId: nextStepId,
      isOverlayVisible: true,
    })
  },

  skipTutorial: () => {
    const state = get()
    writeProgressFlag({ skipped: true, completedAt: null })
    set({
      enabled: false,
      activeCase: null,
      currentStepId: null,
      completedSteps: state.completedSteps,
      isOverlayVisible: false,
    })
    emitTutorialTelemetry('skipped', { caseId: state.activeCase, stepId: state.currentStepId })
  },

  restartTutorial: () => {
    const rootState = get() as TutorialState & { currentPhase?: string; caseData?: { caseId?: string } | null }
    if (String(rootState.caseData?.caseId ?? '').replace(/^case-/, '') !== 'spouse-01') return
    const restartStepId: TutorialStepId =
      rootState.currentPhase === Phase.Briefing ? 'briefing-advance'
      : rootState.currentPhase === Phase.Pretrial ? 'initial-statement-acknowledge'
      : 'dispute-focus-d1'

    clearProgressFlag()
    set({
      enabled: true,
      activeCase: 'spouse-01',
      currentStepId: restartStepId,
      completedSteps: [],
      isOverlayVisible: true,
    })
    emitTutorialTelemetry('restarted_from_settings', { caseId: 'spouse-01' })
  },
})
