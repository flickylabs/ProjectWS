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
  playCutsceneSfx,
} from './soundEngine'
import { shouldPlayCutscene, type VfxTurnContext } from './vfxHierarchyEngine'
import { getRuntimeTextLocale, localizeRuntimeText } from '../i18n/runtimeText'
import { emitVerdictEntryCutscenePlayed } from '../telemetry/wirePoints'

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

export interface EvidenceDiscoveryEvent {
  type: 'evidence_discovery'
  evidenceId: string
  title: string               // surfaceName ?? name
  description: string         // surfaceDescription ?? description ?? ''
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
  | EvidenceDiscoveryEvent
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
    case 'evidence_discovery':
      return handleEvidenceDiscovery(event)
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
  await waitForPresentationLane()
  playNewFactDiscovery()
  const locale = getRuntimeTextLocale()
  const banner = document.createElement('div')
  banner.className = 'v4-newfact-banner'
  banner.textContent = localizeRuntimeText(e.text, locale)
  document.body.appendChild(banner)
  await delay(2500)
  banner.remove()
}

/** #2 숨겨진 쟁점 발견 */
async function handleDisputeDiscovery(e: DisputeDiscoveryEvent) {
  if (shouldPlayCutscene('dispute_emergence', normalizeContext(e.context))) {
    await waitForPresentationLane()
    playDisputeDiscovery()
    const locale = getRuntimeTextLocale()
    const overlay = document.createElement('div')
    overlay.className = 'v4-dispute-card-overlay'
    overlay.innerHTML = `
      <div class="v4-dispute-card">
        <div class="v4-dispute-card__label">${escapeHtml(localizeRuntimeText('새로운 쟁점 발견', locale))}</div>
        <div class="v4-dispute-card__title">${escapeHtml(localizeRuntimeText(e.title, locale))}</div>
        <div class="v4-dispute-card__desc">${escapeHtml(localizeRuntimeText(e.description, locale))}</div>
      </div>
    `
    document.body.appendChild(overlay)
    await delay(3000)
    overlay.remove()
  }
  // 커스텀 이벤트로 UI 업데이트 알림
  window.dispatchEvent(new CustomEvent('v4:dispute-discovered', { detail: { disputeId: e.disputeId } }))
}

/** 새 evidence 등재 — dispute card 와 동일 패밀리, 청록 톤. */
async function handleEvidenceDiscovery(e: EvidenceDiscoveryEvent) {
  if (shouldPlayCutscene('evidence_unlock', normalizeContext(e.context))) {
    await waitForPresentationLane()
    playEvidenceUnlock()
    const locale = getRuntimeTextLocale()
    const overlay = document.createElement('div')
    overlay.className = 'v4-evidence-card-overlay'
    overlay.innerHTML = `
      <div class="v4-evidence-card">
        <div class="v4-evidence-card__label">${escapeHtml(localizeRuntimeText('새로운 증거 등재', locale))}</div>
        <div class="v4-evidence-card__title">${escapeHtml(localizeRuntimeText(e.title, locale))}</div>
        ${e.description ? `<div class="v4-evidence-card__desc">${escapeHtml(localizeRuntimeText(e.description, locale))}</div>` : ''}
      </div>
    `
    document.body.appendChild(overlay)
    await delay(2500)
    overlay.remove()
  }
  window.dispatchEvent(new CustomEvent('v4:evidence-discovered', { detail: { evidenceId: e.evidenceId } }))
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
  await waitForPresentationLane()
  playLieCollapse()
  const locale = getRuntimeTextLocale()
  const partyName = localizeRuntimeText(e.partyName, locale)
  // 배경 오버레이
  const overlay = document.createElement('div')
  overlay.className = 'v4-confession-overlay'
  overlay.innerHTML = `
    <div class="v4-confession-message">
      <div class="v4-confession-message__label">${escapeHtml(localizeRuntimeText('진실파악 5단계 도달', locale))}</div>
      <div class="v4-confession-message__title">${escapeHtml(localizeRuntimeText(`${partyName}의 방어가 무너졌습니다`, locale))}</div>
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
  await waitForPresentationLane()
  playCombineSuccess()
  window.dispatchEvent(new CustomEvent('v4:combine-success', { detail: e }))
  await delay(800)
}

/** #12 DossierCard 해금 */
async function handleDossierUnlock(e: DossierUnlockEvent) {
  await waitForPresentationLane(1200)
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
    const locale = getRuntimeTextLocale()
    const msg = e.variant === 'account_spy'
      ? '양쪽 모두 침묵'
      : '중대한 사실이 드러났습니다'
    window.dispatchEvent(new CustomEvent('v4:system-message', { detail: { text: localizeRuntimeText(msg, locale) } }))
  } else if (e.variant === 'chain_discovery') {
    if (!shouldPlayCutscene('phase_transition', normalizeContext(e.context))) return
    playPhaseTransition()
    const locale = getRuntimeTextLocale()
    window.dispatchEvent(new CustomEvent('v4:system-message', {
      detail: { text: localizeRuntimeText('사건의 전모가 드러나고 있습니다', locale) }
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

async function waitForPresentationLane(maxMs = 2600): Promise<void> {
  if (typeof document === 'undefined') return
  const startedAt = Date.now()
  while (Date.now() - startedAt < maxMs) {
    const busy = document.querySelector(
      [
        '.pc-event-feedback-root.is-modal',
        '.pc-event-feedback-root.is-focus-takeover',
        '.pc-interaction-overlay',
        '.pc-combination-success',
        '.v4-confession-overlay',
        '.v4-dispute-card-overlay',
        '.v4-evidence-card-overlay',
      ].join(', ')
    )
    if (!busy) return
    await delay(120)
  }
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

export async function verdictEntryCutscene(): Promise<void> {
  if (typeof document === 'undefined') return
  await waitForPresentationLane(800)

  const locale = getRuntimeTextLocale()
  const overlay = document.createElement('div')
  overlay.className = 'pc-verdict-entry-cutscene'
  overlay.innerHTML = `
    <div class="pc-verdict-entry-cutscene__blackout"></div>
    <div class="pc-verdict-entry-cutscene__gavel" aria-hidden="true">
      <svg viewBox="0 0 96 96" role="img">
        <rect x="23" y="14" width="50" height="20" rx="5"></rect>
        <rect x="44" y="32" width="8" height="42" rx="3"></rect>
        <ellipse cx="48" cy="80" rx="24" ry="6"></ellipse>
      </svg>
    </div>
    <div class="pc-verdict-entry-cutscene__title">${escapeHtml(localizeRuntimeText('최종 판단', locale))}</div>
    <div class="pc-verdict-entry-cutscene__flash"></div>
  `
  document.body.appendChild(overlay)
  requestAnimationFrame(() => overlay.classList.add('is-active'))

  const gavelTimer = window.setTimeout(() => {
    playCutsceneSfx('verdict_gavel')
  }, 1800)

  await delay(2500)
  window.clearTimeout(gavelTimer)
  overlay.classList.add('is-leaving')
  await delay(120)
  overlay.remove()
  emitVerdictEntryCutscenePlayed()
  window.dispatchEvent(new CustomEvent('pc:verdict-entry-cutscene-played'))
}

// ── 외부에서 편하게 쓰는 헬퍼 ──

export const v4Effects = {
  newFact: (text: string, disputeId?: string, context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'new_fact', text, disputeId, context }),

  disputeDiscovered: (disputeId: string, title: string, description: string, context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'dispute_discovery', disputeId, title, description, context }),

  evidenceDiscovered: (evidenceId: string, title: string, description: string, context?: VfxTurnContext) =>
    emitPresentationEvent({ type: 'evidence_discovery', evidenceId, title, description, context }),

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
