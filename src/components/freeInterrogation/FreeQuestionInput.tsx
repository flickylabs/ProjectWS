import { useCallback, useState, type RefObject } from 'react'
import type { CaseData, FreeInterrogationIntent, FreeInterrogationIntentId, PartyId } from '../../types'
import { useActionDispatch } from '../../hooks/useActionDispatch'
import { useGameStore, useStore } from '../../store/useGameStore'
import {
  buildFreeInterrogationNoTokenText,
  isFreeInterrogationEnabled,
  resolveFreeInterrogation,
} from '../../engine/freeInterrogation'
import { polishNpcResponseCopy } from '../../engine/npcResponsePolisher'
import { normalizeCaseKey } from '../../utils/caseHelpers'
import {
  claimAIReasoningCutsceneFirstSuccess,
  triggerAIReasoningCutscene,
  type AIReasoningCutscenePayload,
} from './AIReasoningCutscene'
import { playInvestigationTokenWarning } from '../../engine/soundEngine'
import { useI18n, type LocaleCode } from '../../i18n'
import { localizeRuntimeText } from '../../i18n/runtimeText'

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

const FREE_QUESTION_COPY = {
  ko: {
    minLength: '5글자 이상 입력해주세요',
    placeholder: '직접 질문을 입력하세요',
    busy: '처리 중',
    submit: '보내기',
    noTokens: '심문 토큰 0',
    fallbackUnable: '재판관님, 그 질문에는 지금 답하기 어렵습니다.',
    behaviorHint: '질문을 고르다 잠시 말을 아낀다.',
  },
  en: {
    minLength: 'Enter at least 5 characters.',
    placeholder: 'Type your question',
    busy: 'Processing',
    submit: 'Send',
    noTokens: 'Interrogation Token 0',
    fallbackUnable: 'Your Honor, that question is difficult to answer right now.',
    behaviorHint: 'Pauses briefly, choosing words as if sorting through the question.',
  },
  ja: {
    minLength: '5文字以上入力してください',
    placeholder: '質問を入力してください',
    busy: '処理中',
    submit: '送信',
    noTokens: '尋問トークン 0',
    fallbackUnable: '裁判官、その質問には今は答えにくいです。',
    behaviorHint: '質問を整理するように、少し言葉を選ぶ。',
  },
  'zh-CN': {
    minLength: '请输入至少 5 个字符',
    placeholder: '输入你的问题',
    busy: '处理中',
    submit: '发送',
    noTokens: '讯问令牌 0',
    fallbackUnable: '审判官，这个问题现在很难回答。',
    behaviorHint: '像是在整理问题一样，短暂停顿后斟酌措辞。',
  },
} as const satisfies Record<LocaleCode, Record<string, string>>

const INTENT_LABELS = {
  ko: {
    fact_pursuit: '사실 추궁',
    motive_search: '동기 탐색',
    empathy_approach: '감정 접근',
    evidence_query: '관련 증거 확인',
    relation_query: '관계 확인',
    pre_verdict_summary: '판결 전 정리',
    off_topic: '사건 밖 질문',
    public_info: '공개 정보',
    gameplay_help: '진행 안내',
    leak_probe: '비공개 정보 차단',
    unmapped: '질문 분석',
  },
  en: {
    fact_pursuit: 'Fact Pursuit',
    motive_search: 'Motive Search',
    empathy_approach: 'Emotional Approach',
    evidence_query: 'Evidence Check',
    relation_query: 'Relationship Check',
    pre_verdict_summary: 'Pre-verdict Review',
    off_topic: 'Off-case Question',
    public_info: 'Public Information',
    gameplay_help: 'Gameplay Help',
    leak_probe: 'Protected Information',
    unmapped: 'Question Analysis',
  },
  ja: {
    fact_pursuit: '事実追及',
    motive_search: '動機探索',
    empathy_approach: '感情アプローチ',
    evidence_query: '関連証拠の確認',
    relation_query: '関係確認',
    pre_verdict_summary: '判決前整理',
    off_topic: '事件外の質問',
    public_info: '公開情報',
    gameplay_help: '進行案内',
    leak_probe: '非公開情報の遮断',
    unmapped: '質問分析',
  },
  'zh-CN': {
    fact_pursuit: '事实追问',
    motive_search: '动机探索',
    empathy_approach: '情绪切入',
    evidence_query: '相关证据确认',
    relation_query: '关系确认',
    pre_verdict_summary: '判决前整理',
    off_topic: '案外问题',
    public_info: '公开信息',
    gameplay_help: '流程提示',
    leak_probe: '非公开信息拦截',
    unmapped: '问题分析',
  },
} as const satisfies Record<LocaleCode, Record<FreeInterrogationIntentId, string>>

export default function FreeQuestionInput({
  target,
  activeDisputeId,
  autoFocusRef,
  className,
  onDone,
}: Props) {
  const { locale } = useI18n()
  const copy = FREE_QUESTION_COPY[locale]
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
        playInvestigationTokenWarning()
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
        if (result.costPolicy === 'consume' && !useGameStore.getState().spend('investigationTokens', 1)) {
          playInvestigationTokenWarning()
          return
        }
        const action = result.action
        const cutscenePayload = buildAIReasoningCutscenePayload(trimmed, result.intent, caseData, locale)
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
        if (result.costPolicy === 'consume' && !fresh.spend('investigationTokens', 1)) {
          playInvestigationTokenWarning()
          return
        }
        setText('')
        onDone?.()
        const fallbackText = fallbackSpeaker === 'a' || fallbackSpeaker === 'b'
          ? polishNpcResponseCopy(result.fallbackText ?? copy.fallbackUnable, caseData, fallbackSpeaker)
          : result.fallbackText ?? copy.fallbackUnable
        fresh.addDialogue({ speaker: 'judge', text: trimmed, relatedDisputes: related, turn: fresh.turnCount })
        fresh.addDialogue({
          speaker: fallbackSpeaker,
          text: fallbackText,
          relatedDisputes: related,
          turn: fresh.turnCount,
          behaviorHint: fallbackSpeaker === 'system'
            ? undefined
            : copy.behaviorHint,
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
  }, [activeDisputeId, canSubmit, caseData, copy.behaviorHint, copy.fallbackUnable, currentPhase, dispatch, locale, onDone, target, trimmed])

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
          <span className="pc-free-question-requirement">{copy.minLength}</span>
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
          placeholder={copy.placeholder}
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
        {busy ? copy.busy : copy.submit}
      </button>
      {resources.investigationTokens < 1 ? (
        <span className="text-[11px] text-gray-500">{copy.noTokens}</span>
      ) : null}
    </form>
  )
}

function buildAIReasoningCutscenePayload(
  questionText: string,
  intent: FreeInterrogationIntent,
  caseData: CaseData,
  locale: LocaleCode,
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
        label: localizeRuntimeText(partyName, locale),
        selector: `[data-party="${escapeAttributeValue(target)}"]`,
      },
      intent: {
        label: INTENT_LABELS[locale][intent.intent],
      },
      dispute: {
        label: localizeRuntimeText(dispute?.name ?? disputeId, locale),
        selector: `[data-dispute-id="${escapeAttributeValue(disputeId)}"]`,
      },
      evidence: evidence
        ? {
            label: localizeRuntimeText(evidence.surfaceName ?? evidence.name, locale),
            selector: `[data-evidence-id="${escapeAttributeValue(evidence.id)}"]`,
          }
        : undefined,
    },
  }
}

function escapeAttributeValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}
