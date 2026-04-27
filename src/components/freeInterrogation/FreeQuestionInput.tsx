import { useCallback, useMemo, useState, type RefObject } from 'react'
import type { CaseData, FreeInterrogationIntent, FreeInterrogationIntentId, PartyId } from '../../types'
import { useActionDispatch } from '../../hooks/useActionDispatch'
import { useGameStore, useStore } from '../../store/useGameStore'
import {
  getFreeInterrogationMode,
  isFreeInterrogationEnabled,
  resolveFreeInterrogation,
} from '../../engine/freeInterrogation'
import { normalizeCaseKey } from '../../utils/caseHelpers'
import {
  claimAIReasoningCutsceneFirstSuccess,
  triggerAIReasoningCutscene,
  type AIReasoningCutscenePayload,
} from './AIReasoningCutscene'

interface Props {
  target: PartyId | null
  activeDisputeId?: string | null
  autoFocusRef?: RefObject<HTMLInputElement | null>
  className?: string
  onDone?: () => void
}

export default function FreeQuestionInput({
  target,
  activeDisputeId,
  autoFocusRef,
  className,
  onDone,
}: Props) {
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const dispatch = useActionDispatch()
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const resources = useStore((s) => s.resources)
  const mode = getFreeInterrogationMode()
  const enabled = isFreeInterrogationEnabled()

  const remaining = 100 - text.length
  const trimmed = text.trim()
  const canSubmit = enabled && !!caseData && !!target && trimmed.length >= 2 && remaining >= 0 && !busy

  const metaText = useMemo(() => {
    if (!enabled) return '비활성화됨'
    if (!target) return '대상 선택 필요'
    if (trimmed.length > 0 && trimmed.length < 2) return '2자 이상'
    return mode === 'preview' ? 'Preview' : 'On'
  }, [enabled, mode, target, trimmed.length])

  const submit = useCallback(async () => {
    if (!canSubmit || !caseData || !target) return

    setBusy(true)
    try {
      const state = useGameStore.getState()
      const result = await resolveFreeInterrogation(trimmed, {
        caseId: normalizeCaseKey(caseData),
        caseData,
        currentPhase,
        target,
        activeDisputeId,
        agentA: state.agentA,
        agentB: state.agentB,
        evidenceStates: state.evidenceStates,
      })

      if (result.status === 'dispatch' && result.action) {
        useGameStore.getState().spend('investigationTokens', 1)
        dispatch(result.action)
        const cutscenePayload = buildAIReasoningCutscenePayload(trimmed, result.intent, caseData)
        if (cutscenePayload) {
          triggerAIReasoningCutscene(cutscenePayload)
        }
      } else {
        const fallbackTarget = target
        const related = result.intent.mapped.disputeId ? [result.intent.mapped.disputeId] : []
        const fresh = useGameStore.getState()
        fresh.spend('investigationTokens', 1)
        fresh.addDialogue({ speaker: 'judge', text: trimmed, relatedDisputes: related, turn: fresh.turnCount })
        fresh.addDialogue({
          speaker: fallbackTarget,
          text: result.fallbackText ?? '재판관님, 그 질문에는 지금 답하기 어렵습니다.',
          relatedDisputes: related,
          turn: fresh.turnCount,
          behaviorHint: '질문을 고르다 잠시 말을 아낀다.',
          source: 'fallback',
        })
        fresh.incrementTurn()
      }

      setText('')
      onDone?.()
    } finally {
      setBusy(false)
    }
  }, [activeDisputeId, canSubmit, caseData, currentPhase, onDone, target, trimmed])

  if (!enabled) return null

  return (
    <form
      className={className ?? 'flex items-center gap-2'}
      onSubmit={(event) => {
        event.preventDefault()
        void submit()
      }}
    >
      <div className="relative flex-1">
        <input
          ref={autoFocusRef}
          className="w-full rounded-lg border border-amber-700/40 bg-gray-950/70 px-3 py-2 pr-16 text-sm text-gray-100 outline-none transition focus:border-amber-500 disabled:opacity-60"
          disabled={busy || resources.investigationTokens < 1}
          maxLength={100}
          onChange={(event) => setText(event.target.value.slice(0, 100))}
          placeholder="직접 질문을 입력하세요"
          type="text"
          value={text}
        />
        <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[11px] ${remaining < 10 ? 'text-amber-300' : 'text-gray-500'}`}>
          {text.length}/100
        </span>
      </div>
      <button
        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
          canSubmit && resources.investigationTokens >= 1
            ? 'bg-amber-500 text-gray-950 hover:bg-amber-400'
            : 'bg-gray-800 text-gray-500'
        }`}
        disabled={!canSubmit || resources.investigationTokens < 1}
        type="submit"
      >
        {busy ? '처리 중' : '질문'}
      </button>
      <span className="text-[11px] text-gray-500">{resources.investigationTokens < 1 ? '토큰 부족' : metaText}</span>
    </form>
  )
}

const INTENT_LABELS: Record<FreeInterrogationIntentId, string> = {
  fact_pursuit: '사실 추궁',
  motive_search: '동기 탐색',
  empathy_approach: '감정 접근',
  evidence_query: '관련 증거 확인',
  relation_query: '관계 확인',
  pre_verdict_summary: '판결 전 정리',
  unmapped: '질문 분석',
}

function buildAIReasoningCutscenePayload(
  questionText: string,
  intent: FreeInterrogationIntent,
  caseData: CaseData,
): AIReasoningCutscenePayload | null {
  const target = intent.mapped.target
  const disputeId = intent.mapped.disputeId
  if (intent.intent === 'unmapped' || !target || !disputeId) return null

  const dispute = caseData.disputes.find((item) => item.id === disputeId)
  const evidence = intent.mapped.evidenceRef
    ? caseData.evidence.find((item) => item.id === intent.mapped.evidenceRef)
    : null
  const partyName = target === 'a'
    ? caseData.duo.partyA.name
    : caseData.duo.partyB.name

  return {
    isFirstSuccess: claimAIReasoningCutsceneFirstSuccess(normalizeCaseKey(caseData)),
    questionText,
    chips: {
      target: {
        label: partyName,
        selector: `[data-party="${escapeAttributeValue(target)}"]`,
      },
      intent: {
        label: INTENT_LABELS[intent.intent],
      },
      dispute: {
        label: dispute?.name ?? disputeId,
        selector: `[data-dispute-id="${escapeAttributeValue(disputeId)}"]`,
      },
      evidence: evidence
        ? {
            label: evidence.surfaceName ?? evidence.name,
            selector: `[data-evidence-id="${escapeAttributeValue(evidence.id)}"]`,
          }
        : undefined,
    },
  }
}

function escapeAttributeValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}
