import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useStore } from '../../../store/useGameStore'
import type { EventFeedbackKind } from '../../../store/slices/eventFeedbackSlice'

type Phase = 'appearing' | 'visible' | 'converging' | 'leaving'

interface KindMeta {
  tone: 'gold' | 'red' | 'green' | 'blue' | 'neutral'
  defaultAutoMs?: number
}

const KIND_META: Record<EventFeedbackKind, KindMeta> = {
  observation:        { tone: 'gold',    defaultAutoMs: 2000 },
  state_change:       { tone: 'gold',    defaultAutoMs: 2000 },
  transition_choice:  { tone: 'gold',    defaultAutoMs: 2000 },
  contradiction:      { tone: 'gold' },
  emergence:          { tone: 'gold' },
  confrontation:      { tone: 'gold' },
  conflict:           { tone: 'blue' },
  emotional_slip:     { tone: 'red' },
  perk_choice:        { tone: 'blue' },
  witness_choice:     { tone: 'green' },
  evidence_result:    { tone: 'gold',    defaultAutoMs: 2000 },
  info:               { tone: 'gold',    defaultAutoMs: 2000 },
}

/** 컷씬 스타일 대상 kind — 얇은 검정 띠, 자동 소멸, 좌측 하단 관찰 패널로 수렴 */
const CUTSCENE_KINDS: EventFeedbackKind[] = ['observation', 'evidence_result', 'transition_choice']

/**
 * Modal 모드 판정:
 * - 선택지 있는 카드만 Modal (유저 선택 필수 — backdrop blur로 게임 정지 느낌)
 * - 컷씬 kind는 Alert 모드 (띠만 뜨고 게임 UI 계속 보임, backdrop 없음)
 */
function isModalKind(_kind: EventFeedbackKind, hasActions: boolean): boolean {
  return hasActions
}

function isCutsceneKind(kind: EventFeedbackKind, hasActions: boolean): boolean {
  return !hasActions && CUTSCENE_KINDS.includes(kind)
}

/**
 * 통합 이벤트 피드백 카드 (Option A)
 * ─────────────────────────────────
 * - activeFeedback 을 구독해 1건씩 순차 렌더
 * - actions 있으면 유저 선택 필수, 없으면 autoDismissMs 경과 후 자동 소멸
 * - observation + convergeToTag 는 해당 파티 archetype 태그로 수렴 애니메이션
 * - 상단 중앙 고정, backdrop 없음 (채팅 계속 읽힘)
 */
export default function EventFeedbackCard() {
  const active = useStore((s) => s.activeFeedback)
  const dismiss = useStore((s) => s.dismissActiveFeedback)
  // 미니게임 활성 중엔 카드 대기 (미니게임은 아직 통합 대상 외)
  const minigameActive = useStore((s) => Boolean((s as any).pendingMinigame))
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [phase, setPhase] = useState<Phase>('appearing')
  const [convergeTransform, setConvergeTransform] = useState<string | null>(null)
  const activeIdRef = useRef<string | null>(null)

  // active 이 바뀌면 phase 초기화
  useEffect(() => {
    if (!active) {
      activeIdRef.current = null
      setPhase('appearing')
      setConvergeTransform(null)
      return
    }
    if (activeIdRef.current === active.id) return
    activeIdRef.current = active.id
    setPhase('appearing')
    setConvergeTransform(null)
    const t = window.setTimeout(() => setPhase('visible'), 40)
    return () => window.clearTimeout(t)
  }, [active])

  // visible 진입 시 auto-dismiss 스케줄
  useEffect(() => {
    if (!active || phase !== 'visible' || minigameActive) return
    const meta = KIND_META[active.kind]
    const autoMs = active.autoDismissMs ?? meta.defaultAutoMs
    if (autoMs == null) return

    const timer = window.setTimeout(() => {
      // 수렴 타겟 우선순위: convergeTargetSelector(가이드 컷씬) > convergeToTag(archetype)
      let targetEl: HTMLElement | null = null
      if (active.convergeTargetSelector) {
        targetEl = document.querySelector<HTMLElement>(active.convergeTargetSelector)
      } else if (active.kind === 'observation' && active.convergeToTag && active.party && active.archetype) {
        targetEl = document.querySelector<HTMLElement>(`[data-archetype-tag="${active.party}:${active.archetype}"]`)
      }
      const cardEl = cardRef.current
      if (targetEl && cardEl) {
        const tr = targetEl.getBoundingClientRect()
        const cr = cardEl.getBoundingClientRect()
        const dx = (tr.left + tr.width / 2) - (cr.left + cr.width / 2)
        const dy = (tr.top + tr.height / 2) - (cr.top + cr.height / 2)
        setConvergeTransform(`translate(${dx}px, ${dy}px) scale(0.15)`)
        setPhase('converging')
        return
      }
      setPhase('leaving')
    }, autoMs)
    return () => window.clearTimeout(timer)
  }, [active, phase, minigameActive])

  // converging/leaving 종료 후 실제 dismiss + 수렴 타겟 2번 깜빡
  useEffect(() => {
    if (phase !== 'converging' && phase !== 'leaving') return
    const duration = phase === 'converging' ? 520 : 260
    const timer = window.setTimeout(() => {
      // 수렴 타겟이 있으면 2번 깜빡 트리거
      if (phase === 'converging' && active?.convergeTargetSelector) {
        const target = document.querySelector<HTMLElement>(active.convergeTargetSelector)
        if (target) {
          target.classList.add('pc-dialogue-jump-pulse')
          window.setTimeout(() => target.classList.remove('pc-dialogue-jump-pulse'), 1400)
        }
      }
      dismiss()
    }, duration)
    return () => window.clearTimeout(timer)
  }, [phase, dismiss, active])

  if (!active) return null
  // 미니게임 활성 시 카드 대기 (미니게임 모달이 우선)
  if (minigameActive) return null

  const meta = KIND_META[active.kind]
  const tone = active.tone ?? meta.tone
  const hasActions = Array.isArray(active.actions) && active.actions.length > 0
  const autoMs = active.autoDismissMs ?? meta.defaultAutoMs
  const manualCloseOnly = !hasActions && autoMs == null

  const cardStyle = phase === 'converging' && convergeTransform
    ? { transform: convergeTransform, opacity: 0 }
    : undefined

  const modal = isModalKind(active.kind, hasActions)
  const cutscene = isCutsceneKind(active.kind, hasActions)
  const rootClass = `pc-event-feedback-root${modal ? ' is-modal' : ' is-alert'}${cutscene ? ' is-cutscene' : ''} is-phase-${phase}`
  // 컷씬(자동소멸 알림 4종): 배경 클릭 시 즉시 닫기. 선택 필수 모달은 차단.
  const allowBackdropDismiss = cutscene

  return createPortal(
    <div
      className={rootClass}
      aria-live={modal ? 'assertive' : 'polite'}
      role={modal ? 'dialog' : undefined}
      onClick={allowBackdropDismiss ? (e) => {
        if (e.target === e.currentTarget) setPhase('leaving')
      } : undefined}
    >
      <div
        ref={cardRef}
        className={`pc-event-feedback-card tone-${tone} kind-${active.kind} is-phase-${phase}${modal ? ' is-modal' : ' is-alert'}${cutscene ? ' is-cutscene' : ''}`}
        data-resonance-target={cutscene ? 'cutscene-center' : undefined}
        style={cardStyle}
      >
        {/* X 버튼 — onDefer 정의된 카드만 (예: 진실 공방 일시 보류). 클릭 시 onDefer 후 카드 닫음. */}
        {active.onDefer ? (
          <button
            type="button"
            className="pc-event-feedback__close"
            aria-label="일시 보류"
            onClick={() => {
              try { active.onDefer!() } finally { setPhase('leaving') }
            }}
          >
            ×
          </button>
        ) : null}
        {/* kind-observation: 상단 Eye SVG (포착 순간 강조, 작게) */}
        {cutscene && active.kind === 'observation' ? (
          <div className="pc-event-feedback__eye" aria-hidden="true">
            <svg viewBox="0 0 64 32" width="52" height="26">
              <defs>
                <radialGradient id="efb-eye-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(232,193,114,0.9)" />
                  <stop offset="60%" stopColor="rgba(232,193,114,0.35)" />
                  <stop offset="100%" stopColor="rgba(232,193,114,0)" />
                </radialGradient>
              </defs>
              <path
                d="M 3 16 Q 32 2 61 16 Q 32 30 3 16 Z"
                fill="none"
                stroke="rgba(232,193,114,0.85)"
                strokeWidth="1.1"
              />
              <circle cx="32" cy="16" r="7" fill="url(#efb-eye-glow)" />
              <circle cx="32" cy="16" r="4" fill="rgba(232,193,114,0.98)" />
              <circle cx="32" cy="16" r="1.6" fill="#0a0906" />
              <circle cx="33" cy="15" r="0.7" fill="rgba(255,245,215,0.95)" />
            </svg>
          </div>
        ) : null}
        {active.eyebrow ? <div className="pc-event-feedback__eyebrow">{active.eyebrow}</div> : null}
        {active.subtitle ? <div className="pc-event-feedback__subtitle">{active.subtitle}</div> : null}
        {active.title ? <div className="pc-event-feedback__title">{active.title}</div> : null}
        {active.body ? <div className="pc-event-feedback__body">{active.body}</div> : null}
        {active.bodyLines && active.bodyLines.length > 0 ? (
          <div className="pc-event-feedback__lines">
            {active.bodyLines.map((line, i) => <div key={`${active.id}-line-${i}`}>{line}</div>)}
          </div>
        ) : null}
        {active.quote ? <div className="pc-event-feedback__quote">“{active.quote}”</div> : null}
        {active.claims ? (
          <div className="pc-event-feedback__claims">
            <div className="pc-event-feedback__claim party-a">
              <strong>{active.claims.partyA.name}</strong>
              <p>{active.claims.partyA.text}</p>
            </div>
            <div className="pc-event-feedback__claim party-b">
              <strong>{active.claims.partyB.name}</strong>
              <p>{active.claims.partyB.text}</p>
            </div>
          </div>
        ) : null}
        {active.contrast ? (
          <div className="pc-event-feedback__contrast">
            <div className="pc-event-feedback__contrast-side is-left">
              <div className="pc-event-feedback__contrast-label">{active.contrast.left.label}</div>
              <div className="pc-event-feedback__contrast-text">“{active.contrast.left.text}”</div>
            </div>
            <div className="pc-event-feedback__contrast-vs" aria-hidden="true">
              <span>VS</span>
            </div>
            <div className="pc-event-feedback__contrast-side is-right">
              <div className="pc-event-feedback__contrast-label">{active.contrast.right.label}</div>
              <div className="pc-event-feedback__contrast-text">“{active.contrast.right.text}”</div>
            </div>
          </div>
        ) : null}
        {active.blocks && active.blocks.length > 0 ? (
          <div className="pc-event-feedback__blocks">
            {active.blocks.map((block, i) => (
              <div key={`${active.id}-block-${i}`} className="pc-event-feedback__block">
                <strong>{block.title}</strong>
                <p>{block.text}</p>
              </div>
            ))}
          </div>
        ) : null}
        {active.meta && active.meta.length > 0 ? (
          <div className="pc-event-feedback__meta">
            {active.meta.map((m, i) => <span key={`${active.id}-meta-${i}`}>{m}</span>)}
          </div>
        ) : null}
        {active.tag ? <div className="pc-event-feedback__tag">{active.tag}</div> : null}

        {hasActions ? (
          <div className={`pc-event-feedback__actions layout-${active.actionsLayout ?? 'horizontal'}`}>
            {active.actions!.map((action, i) => (
              <button
                key={`${active.id}-act-${i}`}
                type="button"
                className={`pc-event-feedback__action tone-${action.tone ?? 'gold'}`}
                onClick={() => {
                  try { action.onSelect() } finally { setPhase('leaving') }
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}

        {manualCloseOnly ? (
          <button
            type="button"
            className="pc-event-feedback__dismiss"
            onClick={() => setPhase('leaving')}
          >
            확인
          </button>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
