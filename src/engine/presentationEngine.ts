/**
 * V4 연출 컨트롤러 엔진.
 *
 * 게임 이벤트를 받아 CSS 클래스 토글 + 사운드 재생 + DOM 조작을 수행.
 * React 컴포넌트와는 이벤트 기반으로 연결 (커스텀 이벤트 또는 직접 호출).
 */

import {
  playLieCollapse,
  playNewFactDiscovery,
  playDisputeDiscovery,
  playContradiction,
  playScoreTick,
  playDramaticReveal,
  playCombineSuccess,
  playDossierUnlock,
  playPhaseTransition,
  playEvidenceUnlock,
} from './soundEngine'
import { shouldPlayCutscene, type VfxTurnContext } from './vfxHierarchyEngine'

// ── 타입 ──

export interface NewFactEvent {
  type: 'new_fact'
  text: string                // 배너에 표시할 사실 요약
  disputeId?: string
  context?: VfxTurnContext
}

export interface DisputeDiscoveryEvent {
  type: 'dispute_discovery'
  disputeId: string           // e.g., 'd-2', 'h-d3', 'h-d4'
  title: string               // e.g., '비자금 3,000만원 출금'
  description: string         // 1줄 설명
  context?: VfxTurnContext
}

export interface ContradictionEvent {
  type: 'contradiction'
  party: 'a' | 'b'
  previousClaim: string
  currentClaim: string
  disputeId: string
  context?: VfxTurnContext
}

export interface ConfessionEvent {
  type: 'confession'
  party: 'a' | 'b'
  partyName: string           // e.g., '박지연'
  context?: VfxTurnContext
}

export interface CombineSuccessEvent {
  type: 'combine_success'
  resultType: 'dispute' | 'upgrade' | 'dossier'
  resultTitle: string
  context?: VfxTurnContext
}

export interface DossierUnlockEvent {
  type: 'dossier_unlock'
  questionText: string
  context?: VfxTurnContext
}

export interface DramaticMomentEvent {
  type: 'dramatic_moment'
  variant: 'account_spy' | 'forgery_reveal' | 'chain_discovery'
  context?: VfxTurnContext
}

export interface ScoreCounterEvent {
  type: 'score_counter'
  targetValue: number
  label: string               // e.g., '통찰', '권위', '지혜'
  onComplete?: () => void
  context?: VfxTurnContext
}

export type PresentationEvent =
  | NewFactEvent
  | DisputeDiscoveryEvent
  | ContradictionEvent
  | ConfessionEvent
  | CombineSuccessEvent
  | DossierUnlockEvent
  | DramaticMomentEvent
  | ScoreCounterEvent

// ── 이벤트 큐 (연출 겹침 방지) ──

const eventQueue: PresentationEvent[] = []
let isProcessing = false

export function emitPresentationEvent(event: PresentationEvent) {
  eventQueue.push(event)
  if (!isProcessing) processNext()
}

async function processNext() {
  if (eventQueue.length === 0) {
    isProcessing = false
    return
  }
  isProcessing = true
  const event = eventQueue.shift()!
  await handleEvent(event)
  processNext()
}

// ── 이벤트 핸들러 ──

async function handleEvent(event: PresentationEvent): Promise<void> {
  switch (event.type) {
    case 'new_fact':
      return handleNewFact(event)
    case 'dispute_discovery':
      return handleDisputeDiscovery(event)
    case 'contradiction':
      return handleContradiction(event)
    case 'confession':
      return handleConfession(event)
    case 'combine_success':
      return handleCombineSuccess(event)
    case 'dossier_unlock':
      return handleDossierUnlock(event)
    case 'dramatic_moment':
      return handleDramaticMoment(event)
    case 'score_counter':
      return handleScoreCounter(event)
  }
}

// ── 개별 연출 구현 ──

/** #1 NEW FACT 배너 */
async function handleNewFact(e: NewFactEvent) {
  playNewFactDiscovery()
  const banner = document.createElement('div')
  banner.className = 'v4-newfact-banner'
  banner.textContent = e.text
  document.body.appendChild(banner)
  await delay(2500)
  banner.remove()
}

/** #2 숨겨진 쟁점 발견 */
async function handleDisputeDiscovery(e: DisputeDiscoveryEvent) {
  if (shouldPlayCutscene('dispute_emergence', normalizeContext(e.context))) {
    playDisputeDiscovery()
    const overlay = document.createElement('div')
    overlay.className = 'v4-dispute-card-overlay'
    overlay.innerHTML = `
      <div class="v4-dispute-card">
        <div class="v4-dispute-card__label">새로운 쟁점 발견</div>
        <div class="v4-dispute-card__title">${escapeHtml(e.title)}</div>
        <div class="v4-dispute-card__desc">${escapeHtml(e.description)}</div>
      </div>
    `
    document.body.appendChild(overlay)
    await delay(3000)
    overlay.remove()
  }
  // 커스텀 이벤트로 UI 업데이트 알림
  window.dispatchEvent(new CustomEvent('v4:dispute-discovered', { detail: { disputeId: e.disputeId } }))
}

/** #4 모순 발견 — React 컴포넌트에서 처리하도록 이벤트만 발행 */
async function handleContradiction(e: ContradictionEvent) {
  if (shouldPlayCutscene('contradiction_hit', normalizeContext(e.context))) {
    playContradiction()
  }
  window.dispatchEvent(new CustomEvent('v4:contradiction', { detail: e }))
  await delay(500) // 사운드 여유
}

/** #5 S5 자백 */
async function handleConfession(e: ConfessionEvent) {
  if (!shouldPlayCutscene('truth_breakthrough', normalizeContext(e.context))) return
  playLieCollapse()
  // 배경 오버레이
  const overlay = document.createElement('div')
  overlay.className = 'v4-confession-overlay'
  overlay.innerHTML = `
    <div class="v4-confession-message">
      <div class="v4-confession-message__label">진실파악 5단계 도달</div>
      <div class="v4-confession-message__title">${escapeHtml(e.partyName)}의 방어가 무너졌습니다</div>
    </div>
  `
  document.body.appendChild(overlay)
  await delay(50)
  overlay.classList.add('v4-confession-overlay--active')
  await delay(3000)
  overlay.classList.remove('v4-confession-overlay--active')
  await delay(1500)
  overlay.remove()
}

/** #3 조합 성공 */
async function handleCombineSuccess(e: CombineSuccessEvent) {
  playCombineSuccess()
  window.dispatchEvent(new CustomEvent('v4:combine-success', { detail: e }))
  await delay(800)
}

/** #12 DossierCard 해금 */
async function handleDossierUnlock(e: DossierUnlockEvent) {
  playDossierUnlock()
  window.dispatchEvent(new CustomEvent('v4:dossier-unlock', { detail: e }))
  await delay(600)
}

/** #14, #15 드라마틱 순간 */
async function handleDramaticMoment(e: DramaticMomentEvent) {
  if (e.variant === 'account_spy' || e.variant === 'forgery_reveal') {
    playDramaticReveal()
    // 화면 쉐이크
    const root = document.getElementById('root')
    if (root) {
      root.classList.add('v4-screen-shake')
      setTimeout(() => root.classList.remove('v4-screen-shake'), 300)
    }
    if (e.variant === 'forgery_reveal') {
      // 어둡게 플래시
      const flash = document.createElement('div')
      flash.className = 'v4-dramatic-flash'
      document.body.appendChild(flash)
      await delay(1500)
      flash.remove()
    } else {
      await delay(500)
    }
    // 시스템 메시지
    const msg = e.variant === 'account_spy'
      ? '양쪽 모두 침묵'
      : '중대한 사실이 드러났습니다'
    window.dispatchEvent(new CustomEvent('v4:system-message', { detail: { text: msg } }))
  } else if (e.variant === 'chain_discovery') {
    if (!shouldPlayCutscene('phase_transition', normalizeContext(e.context))) return
    playPhaseTransition()
    window.dispatchEvent(new CustomEvent('v4:system-message', {
      detail: { text: '사건의 전모가 드러나고 있습니다' }
    }))
    await delay(800)
  }
}

/** #8 점수 카운터 애니메이션 */
async function handleScoreCounter(e: ScoreCounterEvent) {
  const duration = 1500
  const steps = 30
  const stepTime = duration / steps
  const increment = e.targetValue / steps

  for (let i = 1; i <= steps; i++) {
    const current = Math.min(Math.round(increment * i), e.targetValue)
    window.dispatchEvent(new CustomEvent('v4:score-update', {
      detail: { label: e.label, value: current, final: i === steps }
    }))
    if (i % 3 === 0) playScoreTick()
    await delay(stepTime)
  }
  e.onComplete?.()
}

// ── 유틸 ──

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function escapeHtml(str: string): string {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

function normalizeContext(context?: VfxTurnContext): VfxTurnContext {
  return {
    turn: context?.turn ?? 0,
    caseId: context?.caseId,
    phase: context?.phase,
  }
}

// ── 외부에서 편하게 쓰는 헬퍼 ──

export const v4Effects = {
  newFact: (text: string, disputeId?: string, context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'new_fact', text, disputeId, context }),

  disputeDiscovered: (disputeId: string, title: string, description: string, context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'dispute_discovery', disputeId, title, description, context }),

  contradiction: (party: 'a' | 'b', prev: string, curr: string, disputeId: string, context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'contradiction', party, previousClaim: prev, currentClaim: curr, disputeId, context }),

  confession: (party: 'a' | 'b', partyName: string, context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'confession', party, partyName, context }),

  combineSuccess: (resultType: 'dispute' | 'upgrade' | 'dossier', title: string, context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'combine_success', resultType, resultTitle: title, context }),

  dossierUnlock: (questionText: string, context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'dossier_unlock', questionText, context }),

  dramaticMoment: (variant: 'account_spy' | 'forgery_reveal' | 'chain_discovery', context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'dramatic_moment', variant, context }),

  scoreCounter: (label: string, target: number, onComplete?: () => void, context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'score_counter', label, targetValue: target, onComplete, context }),

  /** 증거 해금 — 기존 SFX 활용 */
  evidenceUnlock: () => { playEvidenceUnlock() },

  /** 증인 소환 해금 — 기존 SFX + 커스텀 이벤트 */
  witnessUnlock: () => {
    playEvidenceUnlock()
    window.dispatchEvent(new CustomEvent('v4:witness-unlock'))
  },
}
