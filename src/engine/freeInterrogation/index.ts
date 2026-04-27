import { classifyFreeInterrogationIntent } from './intentClassifier'
import { mapFreeInterrogationContext } from './contextMapper'
import { selectFreeInterrogationFallbackText } from './fallback'
import { GamePhase } from '../../types'
import type {
  FreeInterrogationFallbackContext,
  FreeInterrogationMode,
  FreeInterrogationResolution,
  FreeInterrogationRuntimeContext,
} from '../../types/freeInterrogation'
import type { FreeInterrogationGuardContext } from '../../types/freeInterrogationGuard'

export * from './fallback'
export * from './guard'
export * from './heuristic'
export * from './intentClassifier'
export * from './contextMapper'

const VALID_MODES: FreeInterrogationMode[] = ['off', 'preview', 'on']

export function getFreeInterrogationMode(): FreeInterrogationMode {
  const raw = import.meta.env.VITE_FREE_INTERROGATION_MODE
  return typeof raw === 'string' && VALID_MODES.includes(raw as FreeInterrogationMode)
    ? raw as FreeInterrogationMode
    : 'off'
}

export function isFreeInterrogationEnabled(): boolean {
  return getFreeInterrogationMode() !== 'off'
}

export async function resolveFreeInterrogation(
  rawText: string,
  context: FreeInterrogationRuntimeContext,
): Promise<FreeInterrogationResolution> {
  const intent = await classifyFreeInterrogationIntent(rawText, context, {
    enableLlmFallback: getFreeInterrogationMode() === 'on',
  })
  const mapped = mapFreeInterrogationContext(intent, context)
  const actionTarget = mapped.mapped.target
  const actionDisputeId = mapped.mapped.disputeId
  const questionType = mapped.mapped.interrogationType

  if (context.currentPhase !== GamePhase.Phase3_Interrogation) {
    const fallbackContext = buildFallbackContext(context, mapped)
    const fallback = buildMappedFallback(fallbackContext, 'phase_not_interrogation')
    return {
      status: 'fallback',
      intent: mapped,
      fallbackText: fallback.text,
      reason: 'reason' in fallback ? fallback.reason : 'phase_not_interrogation',
    }
  }

  if (actionTarget && actionDisputeId && questionType) {
    return {
      status: 'dispatch',
      intent: mapped,
      action: {
        type: 'question',
        questionType,
        target: actionTarget,
        disputeId: actionDisputeId,
        freeInterrogation: {
          rawText: mapped.raw,
          intent: mapped.intent,
          confidence: mapped.confidence,
          evidenceRef: mapped.mapped.evidenceRef,
        },
      },
    }
  }

  const fallbackContext = buildFallbackContext(context, mapped)
  const fallback = buildMappedFallback(fallbackContext)

  return {
    status: 'fallback',
    intent: mapped,
    fallbackText: fallback.text,
    reason: 'reason' in fallback ? fallback.reason : 'context_mapping_failed',
  }
}

function buildFallbackContext(
  context: FreeInterrogationRuntimeContext,
  mapped: FreeInterrogationResolution['intent'],
): FreeInterrogationFallbackContext {
  return {
    caseId: context.caseId,
    target: mapped.mapped.target ?? context.target,
    disputeId: mapped.mapped.disputeId ?? context.activeDisputeId ?? null,
    intent: mapped.intent,
    lieState: resolveLieState(context, mapped.mapped.target ?? context.target, mapped.mapped.disputeId ?? context.activeDisputeId),
    evidenceRef: mapped.mapped.evidenceRef,
    rawText: mapped.raw,
  }
}

function buildMappedFallback(context: FreeInterrogationFallbackContext, reason = 'context_mapping_failed') {
  if (
    (context.caseId !== 'spouse-01' && context.caseId !== 'family-01' && context.caseId !== 'friend-01') ||
    (context.target !== 'a' && context.target !== 'b')
  ) {
    return {
      text: '재판관님, 그 질문에는 지금 답하기 어렵습니다.',
      reason: 'free-interrogation-unmapped',
    }
  }

  const caseId = context.caseId as FreeInterrogationGuardContext['caseId']
  const guardContext: FreeInterrogationGuardContext = {
    caseId,
    party: context.target,
    lieState: context.lieState === 'S0' ||
      context.lieState === 'S1' ||
      context.lieState === 'S2' ||
      context.lieState === 'S3' ||
      context.lieState === 'S4' ||
      context.lieState === 'S5'
      ? context.lieState
      : undefined,
    disputeId: context.disputeId,
    intent: context.intent,
    question: context.rawText,
    evidenceId: context.evidenceRef,
    variant: 'free-interrogation-resolution',
  }

  return selectFreeInterrogationFallbackText(
    guardContext,
    context.intent === 'unmapped' ? 'unmapped_intent' : reason,
    context.rawText,
    [{
      dimension: context.intent === 'unmapped' ? 'unmapped_intent' : 'intent_mismatch',
      reason: context.intent === 'unmapped' ? 'free interrogation input is unmapped' : 'free interrogation mapping is incomplete',
    }],
  )
}

function resolveLieState(
  context: FreeInterrogationRuntimeContext,
  target: FreeInterrogationFallbackContext['target'],
  disputeId?: string | null,
): string | undefined {
  if (!target || !disputeId) return undefined
  const agent = target === 'a' ? context.agentA : context.agentB
  return agent.lieStateMap[disputeId]?.currentState
}
