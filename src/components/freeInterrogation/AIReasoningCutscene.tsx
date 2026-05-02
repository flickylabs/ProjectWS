import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import type { LightningReason } from '../../engine/vfxHierarchyEngine'
import AIReasoningCompactVFX from './AIReasoningCompactVFX'
import { afterDisputeRibbonExpansion, requestDisputeRibbonExpansion } from '../pc/layout/disputeRibbonEvents'
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
    { key: 'target', title: '대상', chip: active.chips.target },
    { key: 'intent', title: '의도', chip: active.chips.intent },
    { key: 'dispute', title: '쟁점', chip: active.chips.dispute },
    active.chips.evidence ? { key: 'evidence', title: '증거', chip: active.chips.evidence } : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <div
      className={`ai-rc-root ai-rc-root--major${active.leaving ? ' is-leaving' : ''}`}
      role="dialog"
      aria-label="질문 분석"
      onClick={() => close(true)}
      onKeyDown={(event) => {
        if (event.key === 'Escape' || event.key === ' ') close(true)
      }}
      tabIndex={0}
    >
      <div className="ai-rc ai-rc--major" onClick={(event) => event.stopPropagation()}>
        <div className="ai-rc__board-lines" aria-hidden="true" />
        <div className="ai-rc__header">
          <span>질문 분석</span>
          <button className="ai-rc__skip" onClick={() => close(true)} type="button">
            건너뛰기
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
          <span>쟁점 연결</span>
          <span>관련 증거 확인</span>
          <strong>질문 경로 확정</strong>
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
