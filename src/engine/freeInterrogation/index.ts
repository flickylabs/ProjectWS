import { classifyFreeInterrogationIntent } from './intentClassifier'
import { mapFreeInterrogationContext } from './contextMapper'
import { selectFreeInterrogationFallbackText } from './fallback'
import {
  buildFreeInterrogationContextualFallback,
  buildFreeInterrogationOffTopicRedirect,
  buildFreeInterrogationPublicAnswer,
  resolveFreeInterrogationPublicSpeaker,
} from './publicInfo'
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
export * from './publicInfo'
export * from './questionPolicy'

const VALID_MODES: FreeInterrogationMode[] = ['off', 'preview', 'on']
const MIN_FALLBACK_CONTEXT_CONFIDENCE = 0.65

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

  if (mapped.intent === 'off_topic') {
    return {
      status: 'fallback',
      route: 'off_topic_redirect',
      costPolicy: 'no_cost',
      turnPolicy: 'no_advance',
      dialogueSpeaker: 'system',
      intent: mapped,
      fallbackText: buildFreeInterrogationOffTopicRedirect(),
      reason: 'off_topic',
    }
  }

  if (mapped.intent === 'public_info') {
    return {
      status: 'fallback',
      route: 'public_answer',
      costPolicy: 'no_cost',
      turnPolicy: 'no_advance',
      dialogueSpeaker: resolveFreeInterrogationPublicSpeaker(mapped.raw, context),
      intent: mapped,
      fallbackText: buildFreeInterrogationPublicAnswer(mapped.raw, context),
      reason: 'public_info',
    }
  }

  if (mapped.intent === 'leak_probe') {
    const fallbackContext = buildFallbackContext(context, mapped)
    const fallback = buildMappedFallback(fallbackContext, 'leak_probe')
    const outputReason = 'reason' in fallback ? fallback.reason : 'leak_probe'
    return {
      status: 'fallback',
      route: 'guard_fallback',
      costPolicy: 'no_cost',
      turnPolicy: 'no_advance',
      dialogueSpeaker: fallbackContext.target ?? 'system',
      intent: mapped,
      fallbackText: buildFreeInterrogationContextualFallback(context, fallbackContext, 'leak_probe', fallback.text),
      reason: outputReason,
    }
  }

  if (context.currentPhase !== GamePhase.Phase3_Interrogation) {
    const fallbackContext = buildFallbackContext(context, mapped)
    const fallback = buildMappedFallback(fallbackContext, 'phase_not_interrogation')
    const outputReason = 'reason' in fallback ? fallback.reason : 'phase_not_interrogation'
    return {
      status: 'fallback',
      route: 'phase_redirect',
      costPolicy: 'no_cost',
      turnPolicy: 'no_advance',
      dialogueSpeaker: fallbackContext.target ?? 'system',
      intent: mapped,
      fallbackText: buildFreeInterrogationContextualFallback(context, fallbackContext, 'phase_not_interrogation', fallback.text),
      reason: outputReason,
    }
  }

  if (actionTarget && actionDisputeId && questionType) {
    return {
      status: 'dispatch',
      route: 'case_dispatch',
      costPolicy: 'consume',
      turnPolicy: 'advance',
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
  const fallbackReason = resolveFallbackReason(mapped)
  const fallback = buildMappedFallback(fallbackContext, fallbackReason)
  const reason = 'reason' in fallback ? fallback.reason : 'context_mapping_failed'

  return {
    status: 'fallback',
    route: 'mapping_fallback',
    costPolicy: 'no_cost',
    turnPolicy: 'no_advance',
    dialogueSpeaker: fallbackContext.target ?? 'system',
    intent: mapped,
    fallbackText: buildFreeInterrogationContextualFallback(context, fallbackContext, fallbackReason, fallback.text),
    reason,
  }
}

function buildFallbackContext(
  context: FreeInterrogationRuntimeContext,
  mapped: FreeInterrogationResolution['intent'],
): FreeInterrogationFallbackContext {
  const canUseAmbientDispute = mapped.intent !== 'unmapped' &&
    mapped.intent !== 'evidence_query' &&
    mapped.intent !== 'off_topic' &&
    mapped.intent !== 'public_info' &&
    mapped.intent !== 'leak_probe' &&
    mapped.confidence >= MIN_FALLBACK_CONTEXT_CONFIDENCE
  const fallbackDisputeId = mapped.mapped.disputeId ?? (canUseAmbientDispute ? context.activeDisputeId ?? null : null)
  const fallbackTarget = mapped.mapped.target ?? context.target

  return {
    caseId: context.caseId,
    target: fallbackTarget,
    disputeId: fallbackDisputeId,
    intent: mapped.intent,
    lieState: resolveLieState(context, fallbackTarget, fallbackDisputeId),
    evidenceRef: mapped.mapped.evidenceRef,
    rawText: mapped.raw,
  }
}

function resolveFallbackReason(mapped: FreeInterrogationResolution['intent']): string {
  if (mapped.intent === 'off_topic') return 'off_topic'
  if (mapped.intent === 'public_info') return 'public_info'
  if (mapped.intent === 'leak_probe') return 'leak_probe'
  if (mapped.intent === 'unmapped') return 'unmapped_intent'
  if (mapped.confidence < MIN_FALLBACK_CONTEXT_CONFIDENCE) return 'low_confidence_mapping'
  if (mapped.intent === 'evidence_query' && !mapped.mapped.evidenceRef) return 'evidence_unavailable'
  return 'context_mapping_failed'
}

function buildMappedFallback(context: FreeInterrogationFallbackContext, reason = 'context_mapping_failed') {
  if (
    (context.caseId !== 'spouse-01' && context.caseId !== 'family-01' && context.caseId !== 'friend-01') ||
    (context.target !== 'a' && context.target !== 'b')
  ) {
    return {
      text: '재판관님, 지금은 공개된 기록 안에서 확인할 수 있는 부분만 다루겠습니다.',
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
