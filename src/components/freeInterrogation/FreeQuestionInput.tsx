import { useCallback, useState, type RefObject } from 'react'
import type { CaseData, FreeInterrogationIntent, FreeInterrogationIntentId, PartyId } from '../../types'
import { useActionDispatch } from '../../hooks/useActionDispatch'
import { useGameStore, useStore } from '../../store/useGameStore'
import {
  buildFreeInterrogationNoTokenText,
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
  autoFocusRef?: RefObject<HTMLTextAreaElement | null>
  className?: string
  onDone?: () => void
}

const MIN_QUESTION_LENGTH = 5
const MAX_QUESTION_LENGTH = 100
const PANEL_CLOSE_BEFORE_RESULT_DELAY_MS = 140

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
  const enabled = isFreeInterrogationEnabled()

  const remaining = MAX_QUESTION_LENGTH - text.length
  const trimmed = text.trim()
  const canSubmit = enabled && !!caseData && !!target && trimmed.length >= MIN_QUESTION_LENGTH && remaining >= 0 && !busy
  const showLengthHint = trimmed.length > 0 && trimmed.length < MIN_QUESTION_LENGTH

  const resizeTextarea = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`
  }, [])

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
        calledWitnesses: state.calledWitnesses,
      })

      if (result.costPolicy === 'consume' && useGameStore.getState().resources.investigationTokens < 1) {
        const fresh = useGameStore.getState()
        fresh.addDialogue({
          speaker: 'system',
          text: buildFreeInterrogationNoTokenText(),
          relatedDisputes: result.intent.mapped.disputeId ? [result.intent.mapped.disputeId] : [],
          turn: fresh.turnCount,
        })
        return
      }

      if (result.status === 'dispatch' && result.action) {
        if (result.costPolicy === 'consume' && !useGameStore.getState().spend('investigationTokens', 1)) return
        const action = result.action
        const cutscenePayload = buildAIReasoningCutscenePayload(trimmed, result.intent, caseData)
        setText('')
        onDone?.()
        window.setTimeout(() => {
          dispatch(action)
          if (cutscenePayload) {
            triggerAIReasoningCutscene(cutscenePayload)
          }
        }, PANEL_CLOSE_BEFORE_RESULT_DELAY_MS)
        return
      } else {
        const fallbackSpeaker = result.dialogueSpeaker ?? target ?? 'system'
        const related = result.intent.mapped.disputeId ? [result.intent.mapped.disputeId] : []
        const fresh = useGameStore.getState()
        if (result.costPolicy === 'consume' && !fresh.spend('investigationTokens', 1)) return
        setText('')
        onDone?.()
        fresh.addDialogue({ speaker: 'judge', text: trimmed, relatedDisputes: related, turn: fresh.turnCount })
        fresh.addDialogue({
          speaker: fallbackSpeaker,
          text: result.fallbackText ?? '재판관님, 그 질문에는 지금 답하기 어렵습니다.',
          relatedDisputes: related,
          turn: fresh.turnCount,
          behaviorHint: fallbackSpeaker === 'system'
            ? undefined
            : '질문을 고르다 잠시 말을 아낀다.',
          source: 'fallback',
        })
        if (result.turnPolicy === 'advance') {
          fresh.incrementTurn()
        }
        return
      }

    } finally {
      setBusy(false)
    }
  }, [activeDisputeId, canSubmit, caseData, currentPhase, dispatch, onDone, target, trimmed])

  if (!enabled) return null

  return (
    <form
      className={className ?? 'flex items-center gap-2'}
      onSubmit={(event) => {
        event.preventDefault()
        void submit()
      }}
    >
      <div className="pc-free-question-field relative flex-1">
        {showLengthHint ? (
          <span className="pc-free-question-requirement">5글자 이상 입력해주세요</span>
        ) : null}
        <textarea
          ref={autoFocusRef}
          className="pc-free-question-textarea w-full rounded-lg border border-amber-700/40 bg-gray-950/70 px-3 py-2 pr-16 text-sm text-gray-100 outline-none transition focus:border-amber-500 disabled:opacity-60"
          disabled={busy}
          maxLength={MAX_QUESTION_LENGTH}
          onChange={(event) => {
            const el = event.currentTarget
            setText(el.value.slice(0, MAX_QUESTION_LENGTH))
            window.requestAnimationFrame(() => resizeTextarea(el))
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              void submit()
            }
          }}
          placeholder="직접 질문을 입력하세요"
          rows={1}
          value={text}
        />
        <span className={`pc-free-question-count absolute right-3 top-1/2 -translate-y-1/2 text-[11px] ${remaining < 10 ? 'text-amber-300' : 'text-gray-500'}`}>
          {text.length}/100
        </span>
      </div>
      <button
        className={`pc-free-question-submit rounded-lg px-3 py-2 text-sm font-semibold transition ${
          canSubmit
            ? 'bg-amber-500 text-gray-950 hover:bg-amber-400'
            : 'bg-gray-800 text-gray-500'
        }`}
        disabled={!canSubmit}
        type="submit"
      >
        {busy ? '처리 중' : '보내기'}
      </button>
      {resources.investigationTokens < 1 ? (
        <span className="text-[11px] text-gray-500">심문 토큰 0</span>
      ) : null}
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
  off_topic: '사건 밖 질문',
  public_info: '공개 정보',
  gameplay_help: '진행 도움',
  leak_probe: '비공개 정보 차단',
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
