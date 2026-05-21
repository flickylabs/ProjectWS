import { useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { TUTORIAL_STEP_IDS, type TutorialStepId } from '../../../store/slices/tutorialSlice'
import { useI18n, type MessageKey } from '../../../i18n'
import {
  getTutorialStep,
  getTutorialStepNumber,
  type TutorialFingerPlacement,
} from './tutorialSteps'

type SpotlightRect = {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
}

type Placement = Exclude<TutorialFingerPlacement, 'auto'>

const SPOTLIGHT_PAD = 8
const MESSAGE_GAP = 24
const CARD_WIDTH = 480
const EDGE_PAD = 16
const HAND_SIZE = 48

function findTutorialTarget(selector: string): HTMLElement | null {
  const selectors = selector.split(',').map((part) => part.trim()).filter(Boolean)
  for (const item of selectors) {
    const target = document.querySelector<HTMLElement>(item)
    if (target) return target
  }
  return null
}

function findAllTutorialTargets(selector: string): { targets: HTMLElement[]; matchedSelector: string | null } {
  // Iterates comma-separated selectors and returns ALL matches from the first
  // selector that yields at least one element. Enables multi-target cycling
  // when a step accepts any of N equivalent choices. Also returns which selector
  // matched so the caller can pick a body-message variant.
  const selectors = selector.split(',').map((part) => part.trim()).filter(Boolean)
  for (const item of selectors) {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(item))
    if (targets.length > 0) return { targets, matchedSelector: item }
  }
  return { targets: [], matchedSelector: null }
}

function boundingRectFromTargets(targets: HTMLElement[]): SpotlightRect | null {
  // Union rect across N targets, then padded/clamped like rectFromElement so the
  // tutorial card has a stable anchor that spans the whole choice group while
  // the hand cycles between individual options.
  if (targets.length === 0) return null
  let left = Infinity
  let top = Infinity
  let right = -Infinity
  let bottom = -Infinity
  for (const t of targets) {
    const r = t.getBoundingClientRect()
    if (r.left < left) left = r.left
    if (r.top < top) top = r.top
    if (r.right > right) right = r.right
    if (r.bottom > bottom) bottom = r.bottom
  }
  const padLeft = Math.max(EDGE_PAD, left - SPOTLIGHT_PAD)
  const padTop = Math.max(EDGE_PAD, top - SPOTLIGHT_PAD)
  const padRight = Math.min(window.innerWidth - EDGE_PAD, right + SPOTLIGHT_PAD)
  const padBottom = Math.min(window.innerHeight - EDGE_PAD, bottom + SPOTLIGHT_PAD)
  return {
    left: padLeft,
    top: padTop,
    right: padRight,
    bottom: padBottom,
    width: Math.max(0, padRight - padLeft),
    height: Math.max(0, padBottom - padTop),
  }
}

function rectFromElement(element: HTMLElement): SpotlightRect {
  const rect = element.getBoundingClientRect()
  const left = Math.max(EDGE_PAD, rect.left - SPOTLIGHT_PAD)
  const top = Math.max(EDGE_PAD, rect.top - SPOTLIGHT_PAD)
  const right = Math.min(window.innerWidth - EDGE_PAD, rect.right + SPOTLIGHT_PAD)
  const bottom = Math.min(window.innerHeight - EDGE_PAD, rect.bottom + SPOTLIGHT_PAD)
  return {
    left,
    top,
    right,
    bottom,
    width: Math.max(0, right - left),
    height: Math.max(0, bottom - top),
  }
}

const RECT_NOISE_THRESHOLD = 1.5

function rectsApproxEqual(a: SpotlightRect | null, b: SpotlightRect | null): boolean {
  if (!a && !b) return true
  if (!a || !b) return false
  return (
    Math.abs(a.left - b.left) < RECT_NOISE_THRESHOLD &&
    Math.abs(a.top - b.top) < RECT_NOISE_THRESHOLD &&
    Math.abs(a.width - b.width) < RECT_NOISE_THRESHOLD &&
    Math.abs(a.height - b.height) < RECT_NOISE_THRESHOLD
  )
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function resolvePlacement(rect: SpotlightRect | null, requested: TutorialFingerPlacement): Placement {
  if (!rect) return 'bottom'
  if (requested === 'auto') return rect.top > window.innerHeight / 2 ? 'top' : 'bottom'
  return requested
}

function getMessageStyle(rect: SpotlightRect | null, placement: Placement): CSSProperties {
  const maxLeft = Math.max(EDGE_PAD, window.innerWidth - CARD_WIDTH - EDGE_PAD)
  if (!rect) {
    return {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: `min(${CARD_WIDTH}px, calc(100vw - ${EDGE_PAD * 2}px))`,
    }
  }

  if (placement === 'left' || placement === 'right') {
    const left = placement === 'left'
      ? rect.left - CARD_WIDTH - MESSAGE_GAP
      : rect.right + MESSAGE_GAP
    return {
      left: clamp(left, EDGE_PAD, maxLeft),
      top: clamp(rect.top + rect.height / 2 - 86, EDGE_PAD, window.innerHeight - 190),
      width: `min(${CARD_WIDTH}px, calc(100vw - ${EDGE_PAD * 2}px))`,
    }
  }

  const top = placement === 'top'
    ? rect.top - MESSAGE_GAP - 150
    : rect.bottom + MESSAGE_GAP

  return {
    left: clamp(rect.left + rect.width / 2 - CARD_WIDTH / 2, EDGE_PAD, maxLeft),
    top: clamp(top, EDGE_PAD, window.innerHeight - 190),
    width: `min(${CARD_WIDTH}px, calc(100vw - ${EDGE_PAD * 2}px))`,
  }
}

function getHandStyle(rect: SpotlightRect | null, _placement: Placement): CSSProperties {
  if (!rect) {
    return {
      left: '50%',
      top: 'calc(50% + 120px)',
      transform: 'translate(-50%, -50%)',
    }
  }

  // Fingertip in the hand SVG sits at ~(37%, 13%) of the 48px element — not
  // at (50%, top). Position the hand so the fingertip itself lands on the
  // target's click point: horizontally centered on it, and vertically below
  // its center (so the hand body hangs below the button text). The CSS press
  // animation uses matching transform-origin so the contact point stays fixed.
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const FINGERTIP_BELOW_CENTER = 20
  const FINGERTIP_FROM_HAND_LEFT = Math.round(HAND_SIZE * 0.37)
  const FINGERTIP_FROM_HAND_TOP = Math.round(HAND_SIZE * 0.13)
  return {
    left: centerX - FINGERTIP_FROM_HAND_LEFT,
    top: centerY + FINGERTIP_BELOW_CENTER - FINGERTIP_FROM_HAND_TOP,
  }
}

function TutorialHandIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M10.7 4.5c1.2 0 2.1.9 2.1 2.1v8.1l1.1-1.1a2 2 0 0 1 2.8 0l.7.7.9-.9a2 2 0 0 1 2.8 0l.7.7.5-.5a2 2 0 0 1 3.3.8c.3 1.2.2 2.8-.2 4.7l-.9 4.2a6.5 6.5 0 0 1-6.4 5.2h-3.6a6.4 6.4 0 0 1-5.2-2.7l-4.2-5.9a2.1 2.1 0 0 1 .5-3l.2-.1a2.4 2.4 0 0 1 3 .4V6.6c0-1.2.8-2.1 1.9-2.1Z" />
      <path d="M12.8 15v4.8M16.9 14.4v5.1M20.9 14.1v5.5" />
    </svg>
  )
}

function TutorialInfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="7.4" r="1.3" fill="currentColor" />
      <path d="M12 10.8 v6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export default function PCTutorialOverlay() {
  const { t } = useI18n()
  const maskId = useId().replace(/:/g, '')
  const caseId = useStore((state) => state.caseData?.caseId)
  const enabled = useStore((state) => state.enabled)
  const activeCase = useStore((state) => state.activeCase)
  const currentStepId = useStore((state) => state.currentStepId)
  const isOverlayVisible = useStore((state) => state.isOverlayVisible)
  const activeFeedback = useStore((state) => state.activeFeedback)
  const startTutorial = useStore((state) => state.startTutorial)
  const skipTutorial = useStore((state) => state.skipTutorial)
  const markStepComplete = useStore((state) => state.markStepComplete)
  const storeSnapshot = useGameStore((state) => state)
  const [rect, setRect] = useState<SpotlightRect | null>(null)
  // 2026-05-20: spotlightRect 별도 분리 — hand는 좁은 target에, spotlight(mask/blocker/ring)
  // 은 더 넓은 영역에 (예: viewer 닫기 step에서 hand는 ×, spotlight는 viewer 전체).
  const [spotlightRect, setSpotlightRect] = useState<SpotlightRect | null>(null)
  const [targetMissing, setTargetMissing] = useState(false)
  const [feedbackSeen, setFeedbackSeen] = useState(false)
  const [guideCollapsed, setGuideCollapsed] = useState(false)
  const [collapsing, setCollapsing] = useState(false)
  const [cycleIndex, setCycleIndex] = useState(0)
  const [cycleTargetCount, setCycleTargetCount] = useState(1)
  const [cardRect, setCardRect] = useState<SpotlightRect | null>(null)
  const [matchedSelector, setMatchedSelector] = useState<string | null>(null)
  const scrollRequestedRef = useRef<TutorialStepId | null>(null)

  useEffect(() => {
    setGuideCollapsed(false)
    setCollapsing(false)
    setCycleIndex(0)
    setMatchedSelector(null)
  }, [currentStepId])

  const closeGuideCard = useCallback(() => {
    setCollapsing(true)
    window.setTimeout(() => {
      setGuideCollapsed(true)
      setCollapsing(false)
    }, 240)
  }, [])

  const step = useMemo(() => getTutorialStep(currentStepId), [currentStepId])
  // spotlightRect가 있으면 mask/blocker/ring/card 배치에 우선 사용. hand만 작은 target rect 따름.
  const maskRect = spotlightRect ?? rect
  const placement = resolvePlacement(maskRect, step?.fingerPlacement ?? 'auto')
  const messageStyle = getMessageStyle(cardRect ?? maskRect, placement)
  const handStyle = getHandStyle(rect, placement)
  const stepNumber = getTutorialStepNumber(currentStepId)
  const bodyMessageBase = (step?.bodyVariants && matchedSelector ? step.bodyVariants[matchedSelector] : null) ?? step?.messageKey

  useEffect(() => {
    if (String(caseId ?? '').replace(/^case-/, '') === 'spouse-01') {
      startTutorial('spouse-01')
    }
  }, [caseId, startTutorial])

  const updateTargetRect = useCallback(() => {
    if (!step || currentStepId === 'tutorial-complete') {
      setRect(null)
      setSpotlightRect(null)
      setCardRect(null)
      setTargetMissing(false)
      setCycleTargetCount(1)
      setMatchedSelector(null)
      return
    }

    const { targets, matchedSelector: matched } = findAllTutorialTargets(step.targetSelector)
    if (targets.length === 0) {
      setRect(null)
      setSpotlightRect(null)
      setCardRect(null)
      setTargetMissing(true)
      setCycleTargetCount(1)
      setMatchedSelector(null)
      return
    }

    setCycleTargetCount(targets.length)
    setMatchedSelector(matched)
    const currentIdx = targets.length > 0 ? cycleIndex % targets.length : 0
    const target = targets[currentIdx] ?? targets[0]

    if (scrollRequestedRef.current !== currentStepId) {
      scrollRequestedRef.current = currentStepId
      target.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })
      window.setTimeout(() => setRect(rectFromElement(target)), 180)
    }

    setTargetMissing(false)
    const newRect = rectFromElement(target)
    setRect((prev) => (rectsApproxEqual(prev, newRect) ? prev : newRect))
    // 2026-05-20: spotlightSelector가 있으면 mask/blocker/ring을 더 넓은 영역으로.
    const spotlightElement = step.spotlightSelector ? findTutorialTarget(step.spotlightSelector) : null
    const newSpotlightRect = spotlightElement ? rectFromElement(spotlightElement) : null
    setSpotlightRect((prev) => (rectsApproxEqual(prev, newSpotlightRect) ? prev : newSpotlightRect))
    // Card placement: cardAnchorSelector wins (lets card sit outside the wrapping
    // panel/modal), then bounding rect across all targets (stable during hand cycling),
    // then the single active target.
    const anchorElement = step.cardAnchorSelector ? findTutorialTarget(step.cardAnchorSelector) : null
    const newCardRect = anchorElement
      ? rectFromElement(anchorElement)
      : newSpotlightRect
        ? newSpotlightRect
        : targets.length > 1
          ? boundingRectFromTargets(targets)
          : newRect
    setCardRect((prev) => (rectsApproxEqual(prev, newCardRect) ? prev : newCardRect))
  }, [currentStepId, step, cycleIndex])

  useEffect(() => {
    scrollRequestedRef.current = null
    updateTargetRect()
  }, [currentStepId, updateTargetRect])

  useEffect(() => {
    if (!enabled || !isOverlayVisible) return

    const onChange = () => updateTargetRect()
    window.addEventListener('resize', onChange)
    window.addEventListener('scroll', onChange, true)
    const observer = new MutationObserver(onChange)
    // Watch only DOM tree changes (new/removed nodes). Attribute changes (e.g., button
    // hover class toggles) intentionally excluded so hover doesn't re-trigger rect calc
    // and shake the overlay. Real layout shifts still propagate via resize/scroll/interval.
    observer.observe(document.body, { childList: true, subtree: true })
    const interval = window.setInterval(onChange, 400)

    return () => {
      window.removeEventListener('resize', onChange)
      window.removeEventListener('scroll', onChange, true)
      observer.disconnect()
      window.clearInterval(interval)
    }
  }, [enabled, isOverlayVisible, updateTargetRect])

  useEffect(() => {
    if (!enabled || !isOverlayVisible) return
    if (cycleTargetCount <= 1) return
    const interval = window.setInterval(() => {
      setCycleIndex((idx) => (idx + 1) % cycleTargetCount)
    }, 1500)
    return () => window.clearInterval(interval)
  }, [enabled, isOverlayVisible, cycleTargetCount, currentStepId])

  useEffect(() => {
    if (!enabled || activeCase !== 'spouse-01' || !step?.completionCondition.storeSelector) return
    if (step.completionCondition.storeSelector(useGameStore.getState())) {
      markStepComplete(step.id)
    }
  }, [activeCase, enabled, markStepComplete, step, storeSnapshot])

  useEffect(() => {
    if (currentStepId !== 'feedback-acknowledge') {
      setFeedbackSeen(false)
      return
    }
    if (activeFeedback) {
      setFeedbackSeen(true)
      return
    }
    if (feedbackSeen) {
      markStepComplete('feedback-acknowledge')
    }
  }, [activeFeedback, currentStepId, feedbackSeen, markStepComplete])

  // 2026-05-20 사용자 요청 변경: observation-hint / tutorial-complete의 auto timer 제거 →
  // 클릭 완료로 전환. judge-observation-intro / record-summary-intro도 click 완료.

  // record-summary-intro: open 후 close까지 기다린 다음 완료 (modal 안 내용 확인 후 진행).
  // 2026-05-20 후속2 사용자 요청: 그냥 넘어가는 게 아니라 close까지 wait.
  useEffect(() => {
    if (!enabled || currentStepId !== 'record-summary-intro') return
    let opened = false
    const onOpen = () => { opened = true }
    const onClose = () => {
      if (opened) markStepComplete('record-summary-intro')
    }
    window.addEventListener('pc:open-record-summary', onOpen)
    window.addEventListener('pc:close-record-summary', onClose)
    return () => {
      window.removeEventListener('pc:open-record-summary', onOpen)
      window.removeEventListener('pc:close-record-summary', onClose)
    }
  }, [currentStepId, enabled, markStepComplete])

  // 2026-05-20 사용자 보고 fix: evidence-view-open step 활성 시 [증거 열람] 버튼이 없으면
  // (= e-2 detail 패널이 닫힌 상태) e-2 카드를 재클릭하여 패널 복구. 진행 차단 방지.
  useEffect(() => {
    if (!enabled || currentStepId !== 'evidence-view-open') return
    if (!targetMissing) return
    const timer = window.setTimeout(() => {
      const viewBtn = document.querySelector<HTMLElement>('[data-tutorial-target="evidence-e2-view-btn"]')
      if (viewBtn) return // 이미 복구됨
      const e2Card = document.querySelector<HTMLElement>('[data-tutorial-target="evidence-e2-card"]')
      if (e2Card) e2Card.click()
    }, 300)
    return () => window.clearTimeout(timer)
  }, [currentStepId, enabled, targetMissing])

  // 2026-05-20 사용자 요청: tutorial-complete step에서 Space 키로 dismiss.
  useEffect(() => {
    if (!enabled || currentStepId !== 'tutorial-complete') return
    const handler = (event: KeyboardEvent) => {
      if (event.code !== 'Space') return
      const target = event.target as HTMLElement | null
      const tag = target?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || target?.isContentEditable) return
      event.preventDefault()
      markStepComplete('tutorial-complete')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentStepId, enabled, markStepComplete])

  // judge-observation-intro / observation-hint: 짧은 auto(3.5s)는 generic 핸들러가 처리.
  // 다만 사용자가 섹션을 클릭하여 drawer를 열면 auto를 취소하고 7s 추가 대기 — drawer
  // 닫기까지 시간 확보. (정확한 drawer-close 감지 대신 시간 버퍼로 단순화.)
  useEffect(() => {
    if (!enabled) return
    if (currentStepId !== 'judge-observation-intro' && currentStepId !== 'observation-hint') return
    const targetSelector = currentStepId === 'judge-observation-intro'
      ? '[data-tutorial-target="judge-observation-section"]'
      : '[data-tutorial-target="judge-notebook-section"]'
    const stepIdToComplete = currentStepId
    let extendedTimer: number | null = null
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target?.closest(targetSelector)) return
      // 클릭 감지 — drawer가 열렸을 가능성. 7s 후 자동 완료(닫기 시간 확보).
      if (extendedTimer) window.clearTimeout(extendedTimer)
      extendedTimer = window.setTimeout(() => markStepComplete(stepIdToComplete), 7000)
    }
    window.addEventListener('click', handler, true)
    return () => {
      window.removeEventListener('click', handler, true)
      if (extendedTimer) window.clearTimeout(extendedTimer)
    }
  }, [currentStepId, enabled, markStepComplete])

  // PC QA round 2 A-3: generic auto-advance for view-only intro steps (emotion-
  // trust / evidence-detail / combination / speech-note). Each spotlights an
  // info surface for a few seconds, then advances on its own. record-summary /
  // judge-observation / observation-hint / tutorial-complete은 click 완료라 제외.
  // 2026-05-21: activeFeedback popup이 떠있는 동안에는 timer 시작 안 함.
  // (evidence-investigate-e2 → combination-intro 전환 시 popup이 떠 있는 채로
  //  3.5s가 흘러 사용자가 조합 안내를 인지 못하고 사라지는 사고 영역.)
  useEffect(() => {
    if (!enabled || !step) return
    if (step.completionCondition.type !== 'state-mutation') return
    if (step.completionCondition.actionType !== 'auto') return
    if (activeFeedback) return
    const timer = window.setTimeout(() => markStepComplete(step.id), 3500)
    return () => window.clearTimeout(timer)
  }, [activeFeedback, currentStepId, enabled, markStepComplete, step])

  if (!enabled || activeCase !== 'spouse-01' || !isOverlayVisible || !step) {
    return null
  }

  const title = t(`${step.messageKey}.title` as MessageKey)
  const body = t(`${bodyMessageBase ?? step.messageKey}.body` as MessageKey)

  return createPortal(
    <div className="tutorial-overlay-root" aria-live="polite">
      <svg className="tutorial-overlay-backdrop" aria-hidden="true">
        <defs>
          <mask id={`tutorial-mask-${maskId}`}>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {maskRect ? (
              <rect
                x={maskRect.left}
                y={maskRect.top}
                width={maskRect.width}
                height={maskRect.height}
                rx="10"
                fill="black"
              />
            ) : null}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.40)"
          mask={`url(#tutorial-mask-${maskId})`}
        />
      </svg>

      {maskRect ? (
        <>
          <div className="tutorial-blocker" style={{ left: 0, top: 0, right: 0, height: maskRect.top }} />
          <div className="tutorial-blocker" style={{ left: 0, top: maskRect.bottom, right: 0, bottom: 0 }} />
          <div className="tutorial-blocker" style={{ left: 0, top: maskRect.top, width: maskRect.left, height: maskRect.height }} />
          <div className="tutorial-blocker" style={{ left: maskRect.right, top: maskRect.top, right: 0, height: maskRect.height }} />
          <div
            className={`tutorial-spotlight-ring${currentStepId === 'observation-hint' ? ' is-double-pulse' : ''}`}
            style={{ left: maskRect.left, top: maskRect.top, width: maskRect.width, height: maskRect.height }}
          />
        </>
      ) : (
        <div className="tutorial-blocker tutorial-blocker--full" />
      )}

      {currentStepId === 'tutorial-complete' ? null : (
        <div className={`tutorial-hand-pointer is-${placement}`} style={handStyle}>
          <TutorialHandIcon />
        </div>
      )}

      {guideCollapsed ? null : (
        <section
          key={`card-${currentStepId}`}
          className={`tutorial-message-card${collapsing ? ' is-collapsing' : ''}${currentStepId === 'tutorial-complete' ? ' is-final' : ''}`}
          style={currentStepId === 'tutorial-complete' ? undefined : messageStyle}
          data-tutorial-target={currentStepId === 'tutorial-complete' ? 'tutorial-complete' : undefined}
        >
          <button
            type="button"
            className="tutorial-message-card__pin"
            onClick={closeGuideCard}
            aria-label={t('pc.tutorial.spouse01.close-button' as MessageKey)}
            title={t('pc.tutorial.spouse01.close-button' as MessageKey)}
          >
            <TutorialInfoIcon />
          </button>
          <button
            type="button"
            className="tutorial-message-card__close-x"
            onClick={closeGuideCard}
            aria-label={t('pc.tutorial.spouse01.close-button' as MessageKey)}
            title={t('pc.tutorial.spouse01.close-button' as MessageKey)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </button>
          <div className="tutorial-message-card__header">
            <div className="tutorial-message-card__badge" aria-hidden="true">Tutorial · Guide</div>
            <span className="tutorial-message-card__counter">{stepNumber}/{TUTORIAL_STEP_IDS.length}</span>
            {targetMissing ? (
              <span className="tutorial-message-card__waiting">{t('pc.tutorial.spouse01.waiting-target' as MessageKey)}</span>
            ) : null}
          </div>
          <h2>{title}</h2>
          <p>{body}</p>
          {currentStepId === 'tutorial-complete' ? (
            <button
              type="button"
              className="tutorial-message-card__confirm"
              onClick={() => markStepComplete('tutorial-complete')}
            >
              <span>{t('pc.tutorial.spouse01.confirm-button' as MessageKey)}</span>
              <kbd className="pc-event-feedback__kbd">Space</kbd>
            </button>
          ) : null}
        </section>
      )}

      {guideCollapsed ? (
        <button
          className="tutorial-top-button tutorial-top-button--reopen"
          type="button"
          onClick={() => setGuideCollapsed(false)}
        >
          <TutorialInfoIcon />
          <span>{t('pc.tutorial.spouse01.reopen-button' as MessageKey)}</span>
        </button>
      ) : (
        <button
          className="tutorial-top-button tutorial-skip-button"
          type="button"
          onClick={skipTutorial}
        >
          {t('pc.tutorial.spouse01.skip-button' as MessageKey)}
        </button>
      )}
    </div>,
    document.body,
  )
}
