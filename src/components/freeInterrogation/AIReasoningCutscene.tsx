import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import type { LightningReason } from '../../engine/vfxHierarchyEngine'
import AIReasoningCompactVFX from './AIReasoningCompactVFX'
import { afterDisputeRibbonExpansion, requestDisputeRibbonExpansion } from '../pc/layout/disputeRibbonEvents'
import { useI18n, type LocaleCode } from '../../i18n'
import '../../styles/aiReasoningCutscene.css'

export interface AIReasoningCutsceneChip {
  label: string
  selector?: string
}

export interface AIReasoningCutscenePayload {
  isFirstSuccess: boolean
  questionText: string
  chips: {
    target: AIReasoningCutsceneChip
    intent: Pick<AIReasoningCutsceneChip, 'label'>
    dispute: AIReasoningCutsceneChip
    evidence?: AIReasoningCutsceneChip
  }
}

type ActiveCutscene = AIReasoningCutscenePayload & {
  id: number
  variant: 'major' | 'compact'
  leaving: boolean
}

const CUTSCENE_EVENT = 'solomon:ai-reasoning-cutscene'
const FREE_MAPPING_REASON: LightningReason = 'free_interrogation_mapping'
const majorDurationMs = 6000
const compactDurationMs = 1450
const reducedMajorDurationMs = 1400
const reducedCompactDurationMs = 650

const AI_REASONING_COPY = {
  ko: {
    title: '질문 분석',
    skip: '건너뛰기',
    target: '대상',
    intent: '의도',
    dispute: '쟁점',
    evidence: '증거',
    connectDispute: '쟁점 연결',
    confirmEvidence: '관련 증거 확인',
    routeFixed: '질문 경로 확정',
  },
  en: {
    title: 'Question Analysis',
    skip: 'Skip',
    target: 'Target',
    intent: 'Intent',
    dispute: 'Dispute',
    evidence: 'Evidence',
    connectDispute: 'Connecting dispute',
    confirmEvidence: 'Checking related evidence',
    routeFixed: 'Question route confirmed',
  },
  ja: {
    title: '質問分析',
    skip: 'スキップ',
    target: '対象',
    intent: '意図',
    dispute: '争点',
    evidence: '証拠',
    connectDispute: '争点を接続',
    confirmEvidence: '関連証拠を確認',
    routeFixed: '質問ルート確定',
  },
  'zh-CN': {
    title: '问题分析',
    skip: '跳过',
    target: '对象',
    intent: '意图',
    dispute: '争议点',
    evidence: '证据',
    connectDispute: '连接争议点',
    confirmEvidence: '确认相关证据',
    routeFixed: '问题路径已确认',
  },
} as const satisfies Record<LocaleCode, Record<string, string>>

const firstSuccessByCase = new Set<string>()

export function claimAIReasoningCutsceneFirstSuccess(caseId: string): boolean {
  const key = caseId.replace(/^case-/, '') || 'session'
  if (firstSuccessByCase.has(key)) return false
  firstSuccessByCase.add(key)
  return true
}

export function triggerAIReasoningCutscene(payload: AIReasoningCutscenePayload): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<AIReasoningCutscenePayload>(CUTSCENE_EVENT, { detail: payload }))
}

export default function AIReasoningCutscene() {
  const { locale } = useI18n()
  const copy = AI_REASONING_COPY[locale]
  const [active, setActive] = useState<ActiveCutscene | null>(null)
  const autoTimerRef = useRef<number | null>(null)
  const closeTimerRef = useRef<number | null>(null)
  const lineTimerRef = useRef<number | null>(null)
  const auraTimerRef = useRef<number | null>(null)

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const clearSequenceTimers = useCallback(() => {
    for (const timer of [autoTimerRef.current, lineTimerRef.current, auraTimerRef.current]) {
      if (timer != null) window.clearTimeout(timer)
    }
    autoTimerRef.current = null
    lineTimerRef.current = null
    auraTimerRef.current = null
  }, [])

  const clearAllTimers = useCallback(() => {
    clearSequenceTimers()
    if (closeTimerRef.current != null) window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }, [clearSequenceTimers])

  const close = useCallback((fast = false) => {
    clearSequenceTimers()
    if (closeTimerRef.current != null) window.clearTimeout(closeTimerRef.current)
    setActive((current) => current ? { ...current, leaving: true } : current)
    closeTimerRef.current = window.setTimeout(() => {
      setActive(null)
      closeTimerRef.current = null
    }, fast ? 180 : 360)
  }, [clearSequenceTimers])

  useEffect(() => {
    const handler = (event: Event) => {
      const payload = (event as CustomEvent<AIReasoningCutscenePayload>).detail
      if (!payload || !payload.questionText || !payload.chips?.target || !payload.chips?.dispute) return
      clearAllTimers()
      setActive({
        ...payload,
        id: Date.now(),
        variant: payload.isFirstSuccess ? 'major' : 'compact',
        leaving: false,
      })
    }

    window.addEventListener(CUTSCENE_EVENT, handler)
    return () => {
      clearAllTimers()
      window.removeEventListener(CUTSCENE_EVENT, handler)
    }
  }, [clearAllTimers])

  useEffect(() => {
    if (!active) return
    if (active.leaving) return

    const isMajor = active.variant === 'major'
    const lineDelay = reducedMotion ? 160 : isMajor ? 2450 : 280
    const auraDelay = reducedMotion ? 320 : isMajor ? 3850 : 830
    const duration = reducedMotion
      ? isMajor ? reducedMajorDurationMs : reducedCompactDurationMs
      : isMajor ? majorDurationMs : compactDurationMs

    lineTimerRef.current = window.setTimeout(() => enqueueConnectionLines(active), lineDelay)
    auraTimerRef.current = window.setTimeout(() => enqueueAuras(active), auraDelay)
    autoTimerRef.current = window.setTimeout(() => close(), duration)

    return clearSequenceTimers
  }, [active, clearSequenceTimers, close, reducedMotion])

  if (!active) return null

  if (active.variant === 'compact') {
    return (
      <div className={`ai-rc-root${active.leaving ? ' is-leaving' : ''}`}>
        <AIReasoningCompactVFX payload={active} />
      </div>
    )
  }

  const chipList = [
    { key: 'target', title: copy.target, chip: active.chips.target },
    { key: 'intent', title: copy.intent, chip: active.chips.intent },
    { key: 'dispute', title: copy.dispute, chip: active.chips.dispute },
    active.chips.evidence ? { key: 'evidence', title: copy.evidence, chip: active.chips.evidence } : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <div
      className={`ai-rc-root ai-rc-root--major${active.leaving ? ' is-leaving' : ''}`}
      role="dialog"
      aria-label={copy.title}
      onClick={() => close(true)}
      onKeyDown={(event) => {
        if (event.key === 'Escape' || event.key === ' ') close(true)
      }}
      tabIndex={0}
    >
      <div className="ai-rc ai-rc--major" onClick={(event) => event.stopPropagation()}>
        <div className="ai-rc__board-lines" aria-hidden="true" />
        <div className="ai-rc__header">
          <span>{copy.title}</span>
          <button className="ai-rc__skip" onClick={() => close(true)} type="button">
            {copy.skip}
          </button>
        </div>

        <p className="ai-rc__question">{active.questionText}</p>

        <div className="ai-rc__chips">
          {chipList.map((item) => (
            <div
              className={`ai-rc-chip ai-rc-chip--${item.key}`}
              data-ai-cutscene-chip={item.key}
              key={item.key}
            >
              <span className="ai-rc-chip__title">{item.title}</span>
              <strong>{item.chip.label}</strong>
            </div>
          ))}
        </div>

        <div className="ai-rc__trace" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="ai-rc__status-rail">
          <span>{copy.connectDispute}</span>
          <span>{copy.confirmEvidence}</span>
          <strong>{copy.routeFixed}</strong>
        </div>
      </div>
    </div>
  )
}

function enqueueConnectionLines(payload: ActiveCutscene): void {
  const connections = getConnectionTargets(payload)

  const primary = connections.find((item) => item.key === 'dispute')
    ?? connections.find((item) => item.key === 'evidence')
    ?? connections[0]
  if (!primary) return

  const enqueue = () => {
    useGameStore.getState().enqueueResonance({
      fromSelector: `[data-ai-cutscene-chip="${primary.key}"]`,
      toSelector: primary.selector,
      reason: FREE_MAPPING_REASON,
      targetKey: `ai-reasoning-${primary.key}`,
    })
  }

  const disputeId = primary.key === 'dispute' ? extractDisputeIdFromSelector(primary.selector) : null
  if (disputeId) {
    requestDisputeRibbonExpansion(disputeId)
    afterDisputeRibbonExpansion(enqueue)
    return
  }

  enqueue()
}

function enqueueAuras(payload: ActiveCutscene): void {
  const targets = getConnectionTargets(payload)
  const disputeId = targets
    .map((item) => extractDisputeIdFromSelector(item.selector))
    .find((value): value is string => Boolean(value))

  const enqueue = () => {
    const store = useGameStore.getState()
    for (const item of targets) {
      store.enqueueAura({ targetSelector: item.selector })
    }
  }

  if (disputeId) {
    requestDisputeRibbonExpansion(disputeId)
    afterDisputeRibbonExpansion(enqueue)
    return
  }

  enqueue()
}

function getConnectionTargets(payload: AIReasoningCutscenePayload): Array<{ key: string; selector: string }> {
  const candidates = [
    { key: 'target', selector: payload.chips.target.selector },
    { key: 'dispute', selector: payload.chips.dispute.selector },
    { key: 'evidence', selector: payload.chips.evidence?.selector },
  ]

  return candidates
    .map((item) => ({ key: item.key, selector: toQuerySelector(item.selector) }))
    .filter((item): item is { key: string; selector: string } => Boolean(item.selector))
}

function toQuerySelector(selector?: string): string | null {
  const trimmed = selector?.trim()
  if (!trimmed) return null
  if (trimmed.startsWith('[') || trimmed.startsWith('.') || trimmed.startsWith('#')) return trimmed

  const attrMatch = /^(data-[\w-]+)=(.+)$/.exec(trimmed)
  if (!attrMatch) return trimmed

  return `[${attrMatch[1]}="${escapeAttributeValue(attrMatch[2])}"]`
}

function extractDisputeIdFromSelector(selector?: string): string | null {
  const match = selector?.match(/\[data-dispute-id="([^"]+)"\]/)
  return match?.[1] ?? null
}

function escapeAttributeValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}
