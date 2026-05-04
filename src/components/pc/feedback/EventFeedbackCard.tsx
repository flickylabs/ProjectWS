import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { playCourtBeat } from '../../../engine/soundEngine'
import { useGameStore, useStore } from '../../../store/useGameStore'
import type { EventFeedbackItem, EventFeedbackKind } from '../../../store/slices/eventFeedbackSlice'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'

type Phase = 'appearing' | 'visible' | 'converging' | 'leaving'
type CourtBeatLevel = 'none' | 'focus' | 'impact' | 'breakthrough'
type CourtBeatCue = 'silent' | 'evidence' | 'contradiction' | 'dispute' | 'witness' | 'notebook' | 'truth' | 'emotion' | 'choice'
type CourtBeatDestination = 'none' | 'evidence' | 'witness' | 'dispute' | 'notebook' | 'truth'

interface CourtBeatProfile {
  level: CourtBeatLevel
  cue: CourtBeatCue
  destination: CourtBeatDestination
}

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

/** 컷씬 성격의 kind만 게임 UI 위에 짧게 띄우고, 선택지가 있는 경우에는 모달로 처리한다. */
const CUTSCENE_KINDS: EventFeedbackKind[] = [
  'observation',
  'evidence_result',
  'transition_choice',
  'state_change',
  'emotional_slip',
  'conflict',
]

/**
 * Modal 판정:
 * - 선택지가 있는 카드는 Modal
 * - 컷씬 kind는 Alert 모드로 두고 Court Beat 레이어가 시선을 정리한다.
 */
function isModalKind(_kind: EventFeedbackKind, hasActions: boolean): boolean {
  return hasActions
}

function isCutsceneKind(kind: EventFeedbackKind, hasActions: boolean): boolean {
  return !hasActions && CUTSCENE_KINDS.includes(kind)
}

function isMajorCutsceneCopy(active: EventFeedbackItem): boolean {
  const text = [
    active.title,
    active.subtitle,
    active.body,
    active.quote,
    active.tag,
    active.eyebrow,
    active.meta?.join(' '),
    active.blocks?.map((block) => `${block.title} ${block.text}`).join(' '),
  ].filter(Boolean).join(' ')

  const normalized = text.replace(/\s+/g, ' ')
  return /S5|진실|진실\s*파악|누설\s*100|100%|감정\s*(격앙|최고조|체념|방어가\s*흔들|무너)|체념|자백|사실\s*인정|truth|breakthrough/i.test(normalized)
}

function getCourtBeatProfile(active: EventFeedbackItem | null): CourtBeatProfile {
  if (!active) return { level: 'none', cue: 'silent', destination: 'none' }

  if (active.courtBeat) {
    const cue = active.courtBeat.cue ?? (
      active.courtBeat.beatType === 'evidence_hit_major'
        ? 'contradiction'
        : active.courtBeat.beatType === 'notebook_judicial_record'
          ? 'notebook'
          : 'evidence'
    )
    const destination = active.courtBeat.destination ?? (
      active.courtBeat.beatType === 'evidence_miss' ? 'none' : 'notebook'
    )
    return {
      level: active.courtBeat.intensity ?? (active.courtBeat.beatType === 'evidence_miss' ? 'focus' : 'impact'),
      cue,
      destination: destination === 'observation' ? 'none' : destination,
    }
  }

  const hasActions = Array.isArray(active.actions) && active.actions.length > 0

  if (active.kind === 'emergence') {
    return { level: 'breakthrough', cue: 'dispute', destination: 'dispute' }
  }
  if (active.kind === 'evidence_result') {
    return active.tag === 'evidence-unlock'
      ? { level: 'breakthrough', cue: 'evidence', destination: 'evidence' }
      : { level: 'impact', cue: 'evidence', destination: 'evidence' }
  }
  if (active.kind === 'contradiction' || active.kind === 'confrontation') {
    return { level: 'impact', cue: 'contradiction', destination: 'notebook' }
  }
  if (active.kind === 'conflict') {
    return { level: isMajorCutsceneCopy(active) ? 'breakthrough' : 'impact', cue: 'contradiction', destination: 'truth' }
  }
  if (active.kind === 'emotional_slip') {
    return { level: isMajorCutsceneCopy(active) ? 'breakthrough' : 'impact', cue: 'emotion', destination: 'notebook' }
  }
  if (active.kind === 'witness_choice') {
    return { level: 'impact', cue: 'witness', destination: 'witness' }
  }
  if (active.kind === 'transition_choice') {
    return { level: hasActions ? 'impact' : 'focus', cue: 'choice', destination: 'truth' }
  }
  if (active.kind === 'observation') {
    return { level: 'focus', cue: 'notebook', destination: 'notebook' }
  }
  if (active.kind === 'state_change') {
    return { level: isMajorCutsceneCopy(active) ? 'breakthrough' : 'focus', cue: 'truth', destination: 'truth' }
  }
  return { level: 'none', cue: 'silent', destination: 'none' }
}

function expandHighlightToReadablePhrase(text: string, highlight: string): string {
  const index = text.indexOf(highlight)
  if (index < 0) return highlight
  const startBreaks = ['.', '!', '?', '。', '！', '？', '\n']
  const endBreaks = ['.', '!', '?', '。', '！', '？', '\n']

  let start = 0
  for (const marker of startBreaks) {
    const markerIndex = text.lastIndexOf(marker, index - 1)
    if (markerIndex >= start) start = markerIndex + marker.length
  }

  let end = text.length
  const highlightEnd = index + highlight.length
  for (const marker of endBreaks) {
    const markerIndex = text.indexOf(marker, highlightEnd)
    if (markerIndex >= 0 && markerIndex + marker.length < end) {
      end = markerIndex + marker.length
    }
  }

  return text.slice(start, end).trim() || highlight
}
function splitHighlightedText(text: string, highlight?: string) {
  if (!highlight) return <>{text}</>
  const expandedHighlight = expandHighlightToReadablePhrase(text, highlight)
  const index = text.indexOf(expandedHighlight)
  if (index < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, index)}
      <span className="pc-court-clash__phrase is-broken">{expandedHighlight}</span>
      {text.slice(index + expandedHighlight.length)}
    </>
  )
}

function mapBeatPortraitEmotion(state?: string) {
  if (state === 'shaken') return 'shaken' as const
  if (state === 'resigned') return 'resigned' as const
  if (state === 'softened') return 'confident' as const
  return 'defensive' as const
}

function CourtBeatStamp() {
  return (
    <svg className="pc-court-clash__stamp-svg" viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="48" r="37" />
      <circle cx="48" cy="48" r="28" />
      <path d="M30 54h36M36 39h24M39 67h18" />
      <text x="48" y="51" textAnchor="middle">기록</text>
    </svg>
  )
}

function CourtBeatClash({ active }: { active: EventFeedbackItem }) {
  const beat = active.courtBeat
  if (!beat) return null
  const isMiss = beat.beatType === 'evidence_miss'
  const hasDirectPhrase = !isMiss && Boolean(beat.statement?.highlightText)
  const reaction = beat.portraitReaction
  const evidenceRows = beat.evidence?.rows ?? []

  return (
    <div className={`pc-court-clash ${isMiss ? 'is-miss' : hasDirectPhrase ? 'is-hit' : 'is-review'}`}>
      <div className="pc-court-clash__grid">
        <section className="pc-court-clash__statement">
          <div className="pc-court-clash__label">방금 진술 · {beat.statement?.speakerName ?? reaction?.name ?? '당사자'}</div>
          <p>{splitHighlightedText(beat.statement?.text ?? active.body ?? active.title ?? '', beat.statement?.highlightText)}</p>
        </section>

        <div className="pc-court-clash__strike" aria-hidden="true">
          <svg viewBox="0 0 160 52" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`court-clash-gradient-${active.id}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgba(216, 178, 91, 0.95)" />
                <stop offset="100%" stopColor="rgba(208, 86, 65, 0.95)" />
              </linearGradient>
            </defs>
            <path d="M8 26 C48 16, 86 36, 152 22" stroke={`url(#court-clash-gradient-${active.id})`} />
            <path className="pc-court-clash__strike-crack" d="M86 16 l-10 12 l13 0 l-10 14" />
          </svg>
          <span>{isMiss ? '검토' : hasDirectPhrase ? 'FRACTURE' : 'REVIEW'}</span>
        </div>

        <section className="pc-court-clash__evidence">
          <div className="pc-court-clash__label">증거 · {beat.evidence?.title ?? active.title}</div>
          {beat.evidence?.stageLabel ? <div className="pc-court-clash__stage">{beat.evidence.stageLabel}</div> : null}
          <div className="pc-court-clash__rows">
            {evidenceRows.map((row) => (
              <div
                key={row.id}
                className={`pc-court-clash__row${row.highlighted ? ' is-highlighted' : ''}${row.muted ? ' is-muted' : ''}`}
              >
                <span>{row.label}</span>
                {row.detail ? <small>{row.detail}</small> : null}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="pc-court-clash__reaction">
        <div className={`pc-court-clash__portrait state-${reaction?.state ?? 'neutral'}`}>
          {reaction?.caseId && reaction.party ? (
            <PCCharacterPortrait
              alt={reaction.name ?? ''}
              caseId={reaction.caseId}
              emotion={mapBeatPortraitEmotion(reaction.state)}
              fallbackSymbolId="i-person"
              party={reaction.party}
              size={72}
            />
          ) : (
            <span>{reaction?.name?.slice(0, 2) ?? '??'}</span>
          )}
        </div>
        <div className="pc-court-clash__reaction-copy">
          <strong>{reaction?.name ?? beat.statement?.speakerName ?? '당사자'}</strong>
          <span>{reaction?.state === 'shaken' ? 'shaken' : reaction?.state ?? 'defensive'}</span>
          {beat.reactionLine ? <p>{beat.reactionLine}</p> : null}
        </div>
        <div className="pc-court-clash__destination">
          <CourtBeatStamp />
          <span>{isMiss ? '관찰' : '수첩'}</span>
        </div>
      </div>

      {beat.judgeLine ? (
        <div className="pc-court-clash__judge">
          <span>Judge</span>
          <p>{beat.judgeLine}</p>
        </div>
      ) : null}

      {beat.notebookEntry ? (
        <div className="pc-court-clash__notebook">
          <span>Judicial record</span>
          <p>{beat.notebookEntry}</p>
        </div>
      ) : null}
    </div>
  )
}

/**
 * ?듯빀 ?대깽???쇰뱶諛?移대뱶 (Option A)
 * ?????????????????????????????????
 * - activeFeedback ??援щ룆??1嫄댁뵫 ?쒖감 ?뚮뜑
 * - actions ?덉쑝硫??좎? ?좏깮 ?꾩닔, ?놁쑝硫?autoDismissMs 寃쎄낵 ???먮룞 ?뚮㈇
 * - observation + convergeToTag ???대떦 ?뚰떚 archetype ?쒓렇濡??섎졃 ?좊땲硫붿씠?? * - ?곷떒 以묒븰 怨좎젙, backdrop ?놁쓬 (梨꾪똿 怨꾩냽 ?쏀옒)
 */
export default function EventFeedbackCard() {
  const active = useStore((s) => s.activeFeedback)
  const dismiss = useStore((s) => s.dismissActiveFeedback)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [phase, setPhase] = useState<Phase>('appearing')
  const [convergeTransform, setConvergeTransform] = useState<string | null>(null)
  const activeIdRef = useRef<string | null>(null)
  const unlockVfxFiredRef = useRef<string | null>(null)
  const beatSfxFiredRef = useRef<string | null>(null)
  const activeBeat = getCourtBeatProfile(active)

  // active 변경 시 phase 초기화
  useEffect(() => {
    if (!active) {
      activeIdRef.current = null
      unlockVfxFiredRef.current = null
      beatSfxFiredRef.current = null
      setPhase('appearing')
      setConvergeTransform(null)
      return
    }
    if (activeIdRef.current === active.id) return
    activeIdRef.current = active.id
    beatSfxFiredRef.current = null
    setPhase('appearing')
    setConvergeTransform(null)
    const t = window.setTimeout(() => setPhase('visible'), 40)
    return () => window.clearTimeout(t)
  }, [active])

  useEffect(() => {
    if (!active || activeBeat.level === 'none') return
    if (beatSfxFiredRef.current === active.id) return
    beatSfxFiredRef.current = active.id
    playCourtBeat(activeBeat.cue, activeBeat.level)
  }, [active, activeBeat.cue, activeBeat.level])

  // visible 진입 후 auto-dismiss 스케줄
  useEffect(() => {
    if (!active || phase !== 'visible') return
    const meta = KIND_META[active.kind]
    const autoMs = active.courtBeat ? active.autoDismissMs : (active.autoDismissMs ?? meta.defaultAutoMs)
    if (autoMs == null) return

    const timer = window.setTimeout(() => {
      // ?섎졃 ?寃??곗꽑?쒖쐞: convergeTargetSelector(媛?대뱶 而룹뵮) > convergeToTag(archetype)
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
  }, [active, phase])

  // ??利앷굅 ?뺣낫 而룹뵮? 寃?뺣씈 ?먯껜?먯꽌 醫뚯륫 利앷굅 移대뱶濡?踰덇컻媛 ?섍????몄??쒕떎.
  useEffect(() => {
    if (!active || phase !== 'visible') return
    if (active.kind !== 'evidence_result' || active.tag !== 'evidence-unlock' || !active.convergeTargetSelector) return
    if (unlockVfxFiredRef.current === active.id) return
    unlockVfxFiredRef.current = active.id

    const targetSelector = active.convergeTargetSelector
    const timer = window.setTimeout(() => {
      const state = useGameStore.getState()
      state.enqueueAura({ targetSelector, style: 'electric' })
      state.enqueueResonance({
        fromSelector: '[data-resonance-target="cutscene-center"]',
        toSelector: targetSelector,
        reason: 'evidence_unlock',
        targetKey: `evidence-unlock:${targetSelector}`,
        style: 'absorb',
      })
    }, 140)
    return () => window.clearTimeout(timer)
  }, [active, phase])

  // 利앷굅 議곗궗 ?⑤꼸???대┛ ?곹깭?먯꽌 ??利앷굅 而룹뵮???ъ깮?섎㈃ panel backdrop blur媛
  // 醫뚯륫 利앷굅 移대뱶? 踰덇컻瑜??먮━寃?留뚮뱺?? 而룹뵮??active???숈븞留?blur瑜??怨?蹂듦뎄?쒕떎.
  useEffect(() => {
    if (typeof document === 'undefined') return
    const revealInteraction = active?.kind === 'evidence_result' && active.tag === 'evidence-unlock'
    if (!revealInteraction) return
    document.body.classList.add('pc-vfx-reveal-interaction')
    return () => {
      document.body.classList.remove('pc-vfx-reveal-interaction')
    }
  }, [active?.id, active?.kind, active?.tag])

  // converging/leaving 醫낅즺 ???ㅼ젣 dismiss + ?섎졃 ?寃?3踰?源쒕묀
  useEffect(() => {
    if (phase !== 'converging' && phase !== 'leaving') return
    const duration = phase === 'converging' ? 520 : 260
    const timer = window.setTimeout(() => {
        // 목적지가 있으면 한 번 더 펄스 처리
        if (phase === 'converging' && active?.convergeTargetSelector) {
        const target = document.querySelector<HTMLElement>(active.convergeTargetSelector)
        if (target) {
          target.classList.add('pc-dialogue-jump-pulse')
          window.setTimeout(() => target.classList.remove('pc-dialogue-jump-pulse'), 3350)
        }
      }
      dismiss()
    }, duration)
    return () => window.clearTimeout(timer)
  }, [phase, dismiss, active])

  if (!active) return null

  const meta = KIND_META[active.kind]
  const tone = active.tone ?? meta.tone
  const hasActions = Array.isArray(active.actions) && active.actions.length > 0
  const autoMs = active.courtBeat ? active.autoDismissMs : (active.autoDismissMs ?? meta.defaultAutoMs)
  const manualCloseOnly = !hasActions && autoMs == null

  const cardStyle = phase === 'converging' && convergeTransform
    ? { transform: convergeTransform, opacity: 0 }
    : undefined

  const modal = isModalKind(active.kind, hasActions)
  const cutscene = isCutsceneKind(active.kind, hasActions)
  const evidenceUnlockCutscene = cutscene && active.kind === 'evidence_result' && active.tag === 'evidence-unlock'
  const focusTakeover = activeBeat.level !== 'none'
  const beatClass = focusTakeover
    ? ` is-focus-takeover is-beat-${activeBeat.level} is-cue-${activeBeat.cue} is-destination-${activeBeat.destination}`
    : ''
  const rootClass = `pc-event-feedback-root${modal ? ' is-modal' : ' is-alert'}${cutscene ? ' is-cutscene' : ''}${evidenceUnlockCutscene ? ' is-evidence-unlock' : ''}${beatClass} is-phase-${phase}`
  // 而룹뵮(?먮룞?뚮㈇ ?뚮┝ 4醫?: 諛곌꼍 ?대┃ ??利됱떆 ?リ린. ?좏깮 ?꾩닔 紐⑤떖? 李⑤떒.
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
      {focusTakeover ? (
        <div className="pc-court-beat-stage" aria-hidden="true">
          <div className="pc-court-beat-stage__curtain" />
          <div className="pc-court-beat-stage__spotlight" />
          <div className="pc-court-beat-stage__rails" />
          <div className="pc-court-beat-stage__pulse" />
        </div>
      ) : null}
      <div
        ref={cardRef}
        className={`pc-event-feedback-card tone-${tone} kind-${active.kind} is-phase-${phase}${modal ? ' is-modal' : ' is-alert'}${cutscene ? ' is-cutscene' : ''}${evidenceUnlockCutscene ? ' is-evidence-unlock' : ''}${active.courtBeat ? ' is-court-clash-card' : ''}${beatClass}`}
        data-resonance-target={cutscene ? 'cutscene-center' : undefined}
        style={cardStyle}
      >
        {focusTakeover && !evidenceUnlockCutscene ? (
          <div className="pc-event-feedback__beat-mark" aria-hidden="true">
            <span />
            <i />
          </div>
        ) : null}
        {/* X 踰꾪듉 ??onDefer ?뺤쓽??移대뱶留?(?? 吏꾩떎 怨듬갑 ?쇱떆 蹂대쪟). ?대┃ ??onDefer ??移대뱶 ?レ쓬. */}
        {active.courtBeat ? (
          <button
            type="button"
            className="pc-event-feedback__close"
            aria-label="닫기"
            onClick={() => setPhase('leaving')}
          >
            ×
          </button>
        ) : active.onDefer ? (
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
        {/* kind-observation: ?곷떒 Eye SVG (?ъ갑 ?쒓컙 媛뺤“, ?묎쾶) */}
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
        {evidenceUnlockCutscene ? (
          <div className="pc-event-feedback__evidence-mark" aria-hidden="true">
            <span />
          </div>
        ) : null}
        {active.courtBeat ? (
          <CourtBeatClash active={active} />
        ) : (
          <>
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
          </>
        )}

        {hasActions ? (
          <div className={`pc-event-feedback__actions layout-${active.actionsLayout ?? 'horizontal'}`}>
            {active.actions!.map((action, i) => (
              <button
                key={`${active.id}-act-${i}`}
                type="button"
                className={`pc-event-feedback__action tone-${action.tone ?? 'gold'}`}
                onClick={() => {
                  const runAction = action.onSelect
                  setPhase('leaving')
                  window.setTimeout(() => {
                    runAction()
                  }, 280)
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
            {active.courtBeat ? '닫기' : '확인'}
          </button>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}

