import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { duckBgmForImpact, playCourtBeat } from '../../../engine/soundEngine'
import { useGameStore, useStore } from '../../../store/useGameStore'
import type {
  EventFeedbackBigTypography,
  EventFeedbackImpactSubtitle,
  EventFeedbackItem,
  EventFeedbackKind,
  EventFeedbackSplitContent,
  EventFeedbackVisualEffect,
} from '../../../store/slices/eventFeedbackSlice'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import PCSvgIcon from '../icons/PCSvgIcon'
import { useI18n, type LocaleCode } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'
import {
  emitFeedbackAction,
  emitFeedbackDismiss,
  emitFeedbackShown,
  emitImpactBeatPlayed,
  emitT3ClimaxReached,
} from '../../../telemetry/wirePoints'

type Phase = 'appearing' | 'visible' | 'converging' | 'leaving'
type CourtBeatLevel = 'none' | 'focus' | 'impact' | 'breakthrough'
type CourtBeatCue = 'silent' | 'evidence' | 'contradiction' | 'dispute' | 'witness' | 'notebook' | 'truth' | 'emotion' | 'choice'
type CourtBeatDestination = 'none' | 'evidence' | 'witness' | 'dispute' | 'notebook' | 'truth'

interface CourtBeatProfile {
  level: CourtBeatLevel
  cue: CourtBeatCue
  destination: CourtBeatDestination
}

const VISUAL_EFFECT_CLASS: Record<EventFeedbackVisualEffect, string> = {
  'screen-shake-light': 'pc-impact-screen-shake-light',
  'screen-shake-medium': 'pc-impact-screen-shake-medium',
  'screen-shake-heavy': 'pc-impact-screen-shake-heavy',
  'screen-flash-white': 'pc-impact-screen-flash-white',
  'screen-flash-dark': 'pc-impact-screen-flash-dark',
  'screen-freeze': 'pc-impact-screen-freeze',
  'vignette-strong': 'pc-impact-vignette-strong',
  'vignette-red': 'pc-impact-vignette-red',
  'portrait-shake': 'pc-impact-portrait-shake',
  'portrait-desaturate': 'pc-impact-portrait-desaturate',
  'portrait-zoom-in': 'pc-impact-portrait-zoom-in',
  'card-slam': 'pc-impact-card-slam',
}

const VISUAL_EFFECT_DURATION_MS: Record<EventFeedbackVisualEffect, number> = {
  'screen-shake-light': 240,
  'screen-shake-medium': 420,
  'screen-shake-heavy': 680,
  'screen-flash-white': 240,
  'screen-flash-dark': 440,
  'screen-freeze': 240,
  'vignette-strong': 780,
  'vignette-red': 780,
  'portrait-shake': 460,
  'portrait-desaturate': 1100,
  'portrait-zoom-in': 680,
  'card-slam': 480,
}

interface KindMeta {
  tone: 'gold' | 'red' | 'green' | 'blue' | 'neutral'
  defaultAutoMs?: number
}

// PC QA round 2: all autodismiss removed — user must click to close every feedback card.
// Manual close button is rendered automatically when actions are absent and autoMs is null.
const KIND_META: Record<EventFeedbackKind, KindMeta> = {
  observation:        { tone: 'gold' },
  state_change:       { tone: 'gold' },
  transition_choice:  { tone: 'gold' },
  contradiction:      { tone: 'gold' },
  emergence:          { tone: 'gold' },
  confrontation:      { tone: 'gold' },
  conflict:           { tone: 'blue' },
  emotional_slip:     { tone: 'red' },
  perk_choice:        { tone: 'blue' },
  witness_choice:     { tone: 'green' },
  evidence_result:    { tone: 'gold' },
  info:               { tone: 'gold' },
}

/** 컷씬 성격의 kind만 게임 UI 위에 짧게 띄우고, 선택지가 있는 경우에는 모달로 처리한다. */
const CUTSCENE_KINDS: EventFeedbackKind[] = [
  'observation',
  'evidence_result',
  'transition_choice',
  'state_change',
  'emotional_slip',
  'conflict',
  'emergence',
  'witness_choice',
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

function getStateChangeCue(active: EventFeedbackItem): CourtBeatCue {
  const text = [
    active.title,
    active.subtitle,
    active.body,
    active.quote,
    active.tag,
    active.eyebrow,
    active.meta?.join(' '),
  ].filter(Boolean).join(' ')

  if (/감정|격앙|체념|흔들|emotion/i.test(text)) return 'emotion'
  if (/신뢰|trust/i.test(text)) return 'emotion'
  if (/누설|leak/i.test(text)) return 'emotion'
  return 'truth'
}

function getFeedbackAutoDismissMs(active: EventFeedbackItem, meta: KindMeta): number | undefined {
  // 2026-05-20 사용자 요청: actions/onDefer 없는 popup(= 확인 [Space] 노출)은 절대 auto-dismiss X.
  // VFX가 빠르게 사라져 인지 못하는 문제 해결. 명시적 autoDismissMs 도 무시.
  const hasActions = Array.isArray(active.actions) && active.actions.length > 0
  if (!hasActions && !active.onDefer) return undefined
  return active.autoDismissMs ?? meta.defaultAutoMs
}

function getImpactVisualEffects(active: EventFeedbackItem | null): EventFeedbackVisualEffect[] {
  if (!active) return []
  return active.visualEffects ?? active.courtBeat?.visualEffects ?? []
}

function getImpactBigTypography(active: EventFeedbackItem | null): EventFeedbackBigTypography | undefined {
  return active?.bigTypography ?? active?.courtBeat?.bigTypography
}

function getImpactSubtitle(active: EventFeedbackItem | null): EventFeedbackImpactSubtitle | undefined {
  return active?.impactSubtitle ?? active?.courtBeat?.subtitle
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

  if (active.intensity || active.cue) {
    return {
      level: active.intensity ?? 'impact',
      cue: active.cue ?? 'truth',
      destination: active.destination === 'observation' || !active.destination ? 'none' : active.destination,
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
    return { level: isMajorCutsceneCopy(active) ? 'breakthrough' : 'focus', cue: getStateChangeCue(active), destination: 'truth' }
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

/**
 * 사용자 요청 2026-05-21: popup body는 가급적 문장 단위로 행을 나눈다.
 * - period/!/?/。/！/？ 뒤에 공백이 따라오는 지점에서만 split (lookbehind).
 * - 소수점(2025.11.05) / 약어는 period 뒤 공백이 없어 보존됨.
 * - 이전 구현은 regex match만 push했다가 매치되지 않은 prefix("공증일은 2025.11.")가
 *   누락되는 버그가 있었음 → split 방식으로 전체 텍스트 보존.
 */
function splitBodyIntoSentences(text: string): string[] {
  if (!text) return []
  return text
    .split(/(?<=[.!?。！？])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * 2026-05-22 v3.3: focusTakeover beat-mark의 cue별 아이콘 매핑.
 * panel-pin 마름모 + cue color + 명확 아이콘으로 통일. 기존 +/X/직사각형 막대 추상 형상 제거.
 */
function getBeatPinIcon(cue: CourtBeatCue): string {
  switch (cue) {
    case 'evidence': return 'i-doc'
    case 'witness': return 'i-witness'
    case 'emotion': return 'i-heart'
    case 'contradiction': return 'i-eye'
    case 'truth': return 'i-scale'
    case 'dispute': return 'i-gavel'
    case 'notebook': return 'i-doc'
    case 'choice': return 'i-scale'
    default: return 'i-scale'
  }
}

/**
 * 2026-05-22 v3.3: 일반 popup(alert/modal)의 kind별 아이콘 매핑.
 * 사용자 결정: ± 단순 글리프 대신 kind 의미를 시각적으로 명확 전달.
 */
function getPopupPinIcon(kind: EventFeedbackKind, modal: boolean): string {
  if (modal) {
    switch (kind) {
      case 'state_change': return 'i-heart'
      case 'transition_choice': return 'i-scale'
      case 'witness_choice': return 'i-witness'
      case 'emergence': return 'i-scale'
      case 'contradiction':
      case 'confrontation': return 'i-eye'
      case 'evidence_result': return 'i-doc'
      case 'emotional_slip': return 'i-heart'
      case 'conflict': return 'i-eye'
      case 'perk_choice': return 'i-bulb'
      case 'observation': return 'i-eye'
      case 'info': return 'i-bulb'
      default: return 'i-bulb'
    }
  }
  // alert
  switch (kind) {
    case 'state_change': return 'i-heart'
    case 'evidence_result': return 'i-doc'
    case 'emotional_slip': return 'i-heart'
    case 'observation': return 'i-eye'
    case 'conflict': return 'i-eye'
    case 'info': return 'i-bulb'
    default: return 'i-bulb'
  }
}

function mapBeatPortraitEmotion(state?: string) {
  if (state === 'shaken') return 'shaken' as const
  if (state === 'resigned') return 'resigned' as const
  if (state === 'softened') return 'confident' as const
  if (state === 'zoomed-in' || state === 'zoom-pulse') return 'shaken' as const
  if (state === 'desaturated') return 'resigned' as const
  return 'defensive' as const
}

function getReactionStateLabel(state: string | undefined, locale: LocaleCode): string {
  if (state === 'shaken') return localizeRuntimeText('동요', locale)
  if (state === 'defensive') return localizeRuntimeText('방어', locale)
  if (state === 'resigned') return localizeRuntimeText('체념', locale)
  if (state === 'softened') return localizeRuntimeText('완화', locale)
  if (state === 'desaturated') return localizeRuntimeText('탈색', locale)
  if (state === 'zoomed-in') return localizeRuntimeText('압박', locale)
  if (state === 'zoom-pulse') return localizeRuntimeText('동요', locale)
  if (state === 'neutral') return localizeRuntimeText('중립', locale)
  return localizeRuntimeText('방어', locale)
}

function CourtBeatStamp({ locale }: { locale: LocaleCode }) {
  return (
    <svg className="pc-court-clash__stamp-svg" viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="48" r="37" />
      <circle cx="48" cy="48" r="28" />
      <path d="M30 54h36M36 39h24M39 67h18" />
      <text x="48" y="51" textAnchor="middle">{localizeRuntimeText('기록', locale)}</text>
    </svg>
  )
}

function CourtBeatSplitVs({ active, locale }: { active: EventFeedbackItem; locale: LocaleCode }) {
  const state = useGameStore.getState()
  const caseData = state.caseData
  const content: EventFeedbackSplitContent = active.splitContent ?? active.courtBeat?.splitContent ?? {
    left: {
      partyId: 'a',
      label: active.contrast?.left.label,
      text: active.contrast?.left.text,
    },
    right: {
      partyId: 'b',
      label: active.contrast?.right.label,
      text: active.contrast?.right.text,
    },
  }
  // 2026-05-21: partyId가 명시되지 않은 측은 캐릭터 portrait 대신 저울(i-scale) 아이콘.
  // conflict 모달의 "새 충돌 정보" / "양측 일부 사실" / "판단 보류"처럼 단독 party가 아닌
  // 시스템·재판관 정보를 표시할 때 사용. partyId가 'a'/'b'로 명시되면 기존대로 portrait.
  const leftPartyId = content.left.partyId
  const rightPartyId = content.right.partyId
  const leftParty = leftPartyId === 'b' ? caseData?.duo.partyB : leftPartyId === 'a' ? caseData?.duo.partyA : null
  const rightParty = rightPartyId === 'a' ? caseData?.duo.partyA : rightPartyId === 'b' ? caseData?.duo.partyB : null
  const leftLabel = content.left.label ?? leftParty?.name ?? localizeRuntimeText('기존 판단', locale)
  const rightLabel = content.right.label ?? rightParty?.name ?? localizeRuntimeText('새 충돌 정보', locale)
  const leftPanelClass = leftPartyId ? `is-party-${leftPartyId}` : 'is-system'
  const rightPanelClass = rightPartyId ? `is-party-${rightPartyId}` : 'is-system'

  return (
    <div className="pc-court-split-vs">
      <section className={`pc-court-split-vs__panel ${leftPanelClass}`}>
        <div className="pc-court-split-vs__head">
          {caseData && leftPartyId ? (
            <PCCharacterPortrait
              alt={leftParty?.name ?? ''}
              caseId={caseData.caseId}
              emotion="defensive"
              fallbackSymbolId="i-person"
              party={leftPartyId}
              size={54}
            />
          ) : (
            <PCSvgIcon id="i-scale" size={54} />
          )}
          <span>{localizeRuntimeText(leftLabel, locale)}</span>
        </div>
        <p>{localizeRuntimeText(content.left.text ?? active.contrast?.left.text ?? '', locale)}</p>
      </section>

      <div className="pc-court-split-vs__mark" aria-hidden="true">
        <span>VS</span>
      </div>

      <section className={`pc-court-split-vs__panel ${rightPanelClass}`}>
        <div className="pc-court-split-vs__head">
          {caseData && rightPartyId ? (
            <PCCharacterPortrait
              alt={rightParty?.name ?? ''}
              caseId={caseData.caseId}
              emotion="defensive"
              fallbackSymbolId="i-person"
              party={rightPartyId}
              size={54}
            />
          ) : (
            <PCSvgIcon id="i-scale" size={54} />
          )}
          <span>{localizeRuntimeText(rightLabel, locale)}</span>
        </div>
        <p>{localizeRuntimeText(content.right.text ?? active.contrast?.right.text ?? '', locale)}</p>
      </section>
    </div>
  )
}

function ImpactTypographyOverlay({
  bigTypography,
  subtitle,
  locale,
}: {
  bigTypography?: EventFeedbackBigTypography
  subtitle?: EventFeedbackImpactSubtitle
  locale: LocaleCode
}) {
  if (!bigTypography && !subtitle) return null
  const style = bigTypography?.sizeScale
    ? { '--pc-impact-size-scale': bigTypography.sizeScale } as CSSProperties
    : undefined

  return (
    <div className="pc-impact-typography" aria-hidden="true">
      {bigTypography ? (
        <div
          className={`pc-impact-typography__title tone-${bigTypography.tone ?? 'gold'}`}
          style={style}
        >
          {localizeRuntimeText(bigTypography.text, locale)}
        </div>
      ) : null}
      {subtitle ? (
        <div className={`pc-impact-typography__subtitle tone-${subtitle.tone}`}>
          {localizeRuntimeText(subtitle.text, locale)}
        </div>
      ) : null}
    </div>
  )
}

function CourtBeatClash({ active, locale }: { active: EventFeedbackItem; locale: LocaleCode }) {
  const beat = active.courtBeat
  if (!beat) return null
  const isMiss = beat.beatType === 'evidence_miss'
  const hasDirectPhrase = !isMiss && Boolean(beat.statement?.highlightText)
  const isReview = !isMiss && !hasDirectPhrase
  const reaction = beat.portraitReaction
  const evidenceRows = beat.evidence?.rows ?? []
  const statementName = localizeRuntimeText(beat.statement?.speakerName ?? reaction?.name ?? localizeRuntimeText('당사자', locale), locale)
  const statementLabel = beat.statement?.label
    ?? `${localizeRuntimeText('방금 진술', locale)} · ${statementName}`

  return (
    <div className={`pc-court-clash ${isMiss ? 'is-miss' : hasDirectPhrase ? 'is-hit' : 'is-review'}`}>
      <div className="pc-court-clash__grid">
        <section className="pc-court-clash__statement">
          <div className="pc-court-clash__label">{localizeRuntimeText(statementLabel, locale)}</div>
          <p>{splitHighlightedText(localizeRuntimeText(beat.statement?.text ?? active.body ?? active.title ?? '', locale), beat.statement?.highlightText)}</p>
        </section>

        <div className="pc-court-clash__strike">
          <svg viewBox="0 0 160 52" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id={`court-clash-gradient-${active.id}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgba(216, 178, 91, 0.95)" />
                <stop offset="100%" stopColor="rgba(208, 86, 65, 0.95)" />
              </linearGradient>
            </defs>
            {isReview ? (
              <path className="pc-court-clash__strike-review-line" d="M8 27 C35 18, 57 22, 80 27 C106 34, 132 27, 152 22" stroke={`url(#court-clash-gradient-${active.id})`} />
            ) : (
              <>
                <path className="pc-court-clash__strike-segment pc-court-clash__strike-segment--left" d="M8 27 C35 18, 50 21, 66 25" stroke={`url(#court-clash-gradient-${active.id})`} />
                <path className="pc-court-clash__strike-segment pc-court-clash__strike-segment--right" d="M96 28 C116 34, 132 27, 152 22" stroke={`url(#court-clash-gradient-${active.id})`} />
                <path className="pc-court-clash__strike-gap" d="M76 18 l8 22 M88 14 l-6 13 l12 -1 l-9 14" />
                <path className="pc-court-clash__strike-crack" d="M86 16 l-10 12 l13 0 l-10 14" />
              </>
            )}
          </svg>
          <span>{isMiss ? localizeRuntimeText('검토', locale) : hasDirectPhrase ? 'FRACTURE' : 'REVIEW'}</span>
        </div>

        <section className="pc-court-clash__evidence">
          {beat.chipLabel ? <div className="pc-court-clash__chip">{localizeRuntimeText(beat.chipLabel, locale)}</div> : null}
          <div className="pc-court-clash__label">{localizeRuntimeText('증거', locale)} · {localizeRuntimeText(beat.evidence?.title ?? active.title, locale)}</div>
          {beat.evidence?.stageLabel ? <div className="pc-court-clash__stage">{localizeRuntimeText(beat.evidence.stageLabel, locale)}</div> : null}
          <div className="pc-court-clash__rows">
            {evidenceRows.map((row) => (
              <div
                key={row.id}
                className={`pc-court-clash__row${row.highlighted ? ' is-highlighted' : ''}${row.muted ? ' is-muted' : ''}`}
              >
                <span>{localizeRuntimeText(row.label, locale)}</span>
                {row.detail ? <small>{localizeRuntimeText(row.detail, locale)}</small> : null}
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
          {/* 사용자 요청 2026-05-21 (7th): 이름과 상태(방어 등)를 한 줄에 — 하이픈 구분. */}
          <div className="pc-court-clash__reaction-headline">
            <strong>{localizeRuntimeText(reaction?.name ?? beat.statement?.speakerName ?? localizeRuntimeText('당사자', locale), locale)}</strong>
            <span className="pc-court-clash__reaction-sep" aria-hidden="true">·</span>
            <span>{getReactionStateLabel(reaction?.state, locale)}</span>
          </div>
          {beat.reactionLine ? <p>{localizeRuntimeText(beat.reactionLine, locale)}</p> : null}
        </div>
        <div className="pc-court-clash__destination">
          <CourtBeatStamp locale={locale} />
          <span>{isMiss ? localizeRuntimeText('관찰', locale) : localizeRuntimeText('수첩', locale)}</span>
        </div>
      </div>

      {/* 사용자 요청 2026-05-21 (7th): "재판관" / "재판관의 수첩" 라벨 제거.
          두 블록이 모두 있으면 사이에 납작한 역삼각형 인과 마커 — 위 발언 → 아래 수첩 기록 흐름. */}
      {beat.judgeLine ? (
        <div className="pc-court-clash__judge">
          <p>{localizeRuntimeText(beat.judgeLine, locale)}</p>
        </div>
      ) : null}

      {beat.judgeLine && beat.notebookEntry ? (
        <div className="pc-court-clash__causation-arrow" aria-hidden="true" />
      ) : null}

      {beat.notebookEntry ? (
        <div className="pc-court-clash__notebook">
          <p>{localizeRuntimeText(beat.notebookEntry, locale)}</p>
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
  const { locale } = useI18n()
  const active = useStore((s) => s.activeFeedback)
  const dismiss = useStore((s) => s.dismissActiveFeedback)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [phase, setPhase] = useState<Phase>('appearing')
  const [convergeTransform, setConvergeTransform] = useState<string | null>(null)
  const activeIdRef = useRef<string | null>(null)
  const unlockVfxFiredRef = useRef<string | null>(null)
  const beatSfxFiredRef = useRef<string | null>(null)
  const activeBeat = getCourtBeatProfile(active)
  const visualEffects = getImpactVisualEffects(active)
  const bigTypography = getImpactBigTypography(active)
  const impactSubtitle = getImpactSubtitle(active)

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
    const profile = getCourtBeatProfile(active)
    emitFeedbackShown(
      active.kind,
      active.courtBeat?.intensity ?? active.intensity ?? (profile.level === 'none' ? undefined : profile.level),
      active.courtBeat?.cue ?? active.cue ?? (profile.cue === 'silent' ? undefined : profile.cue),
    )
    const t = window.setTimeout(() => setPhase('visible'), 40)
    return () => window.clearTimeout(t)
  }, [active])

  useEffect(() => {
    if (!active || activeBeat.level === 'none') return
    if (beatSfxFiredRef.current === active.id) return
    beatSfxFiredRef.current = active.id
    const beatId = active.courtBeat?.beatId ?? active.beatId ?? `${active.kind}:${activeBeat.cue}`
    const caseId = useGameStore.getState().caseData?.caseId
    emitImpactBeatPlayed(beatId, activeBeat.level, caseId)
    if ((active.tier ?? active.courtBeat?.tier) === 'T3') {
      emitT3ClimaxReached(caseId, beatId)
    }
    playCourtBeat(activeBeat.cue, activeBeat.level)
  }, [active, activeBeat.cue, activeBeat.level])

  useEffect(() => {
    if (!active || typeof document === 'undefined') return
    const effects = getImpactVisualEffects(active)
    const tier = active.tier ?? active.courtBeat?.tier
    if (effects.length === 0 && tier !== 'T3') return

    const body = document.body
    const timers: number[] = []
    const classes = effects.map((effect) => VISUAL_EFFECT_CLASS[effect])
    classes.forEach((className) => body.classList.add(className))

    if (tier === 'T3') {
      duckBgmForImpact(3500, -30)
    }

    effects.forEach((effect) => {
      timers.push(window.setTimeout(() => {
        body.classList.remove(VISUAL_EFFECT_CLASS[effect])
      }, VISUAL_EFFECT_DURATION_MS[effect]))
    })

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      classes.forEach((className) => body.classList.remove(className))
    }
  }, [active])

  // visible 진입 후 auto-dismiss 스케줄
  useEffect(() => {
    if (!active || phase !== 'visible') return
    const meta = KIND_META[active.kind]
    const autoMs = getFeedbackAutoDismissMs(active, meta)
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

  // 2026-05-20 사용자 요청 (수정 2회): 모든 VFX/popup이 떠 있는 동안 좌/우 패널 항목이
  // backdrop에 가려지지 않고 활성 상태로 보이도록 body class 부여. 특정 케이스(evidence-unlock)에
  // 한정하지 않고 popup lifecycle 전체(appearing → visible → leaving)에서 유지 — `active` 존재
  // 기준으로 적용/해제하여 페이드아웃 중에도 패널이 dim되지 않음.
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!active) return
    document.body.classList.add('pc-vfx-popup-active')
    return () => {
      document.body.classList.remove('pc-vfx-popup-active')
    }
  }, [active])

  // 利앷굅 議곗궗 ?⑤꼸???대┛ ?곹깭?먯꽌 ??利앷굅 而룹뵮???ъ깮?섎㈃ panel backdrop blur媛
  // 醫뚯륫 利앷굅 移대뱶? 踰덇컻瑜??먮━寃?留뚮뱺?? 而룹뵮??active???숈븞留?blur瑜??怨?蹂듦뎄?쒕떎.
  useEffect(() => {
    if (typeof document === 'undefined') return
    const revealInteraction = active?.kind === 'evidence_result' && active.tag === 'evidence-unlock'
    if (!revealInteraction) return
    document.body.classList.add('pc-vfx-reveal-interaction')
    document.body.classList.add('pc-vfx-foreground-resonance')
    return () => {
      document.body.classList.remove('pc-vfx-reveal-interaction')
      document.body.classList.remove('pc-vfx-foreground-resonance')
    }
  }, [active?.id, active?.kind, active?.tag])

  // converging/leaving 醫낅즺 ???ㅼ젣 dismiss + ?섎졃 ?寃?3踰?源쒕묀
  // 2026-05-20 사용자 요청: Space 키로 manual-close popup dismiss.
  // hasActions / onDefer 있는 경우는 무시 (선택 필요 / defer 흐름).
  useEffect(() => {
    if (!active || phase !== 'visible') return
    const actions = Array.isArray(active.actions) ? active.actions : []
    // 2026-05-21 (11th): single-action modal (예: emergence "확인")도 Space로 트리거.
    // 다중 action 또는 onDefer 흐름은 명시 선택 필요 — Space 무시.
    if (actions.length > 1 || active.onDefer) return
    const singleAction = actions.length === 1 ? actions[0] : null
    const handler = (event: KeyboardEvent) => {
      if (event.code !== 'Space') return
      // input/textarea/contenteditable focus 시 Space는 통과
      const target = event.target as HTMLElement | null
      const tag = target?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || target?.isContentEditable) return
      event.preventDefault()
      if (singleAction) {
        emitFeedbackAction(active.kind, 'action_0')
        setPhase('leaving')
        window.setTimeout(() => singleAction.onSelect(), 280)
      } else {
        setPhase('leaving')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, phase])

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
      if (active) emitFeedbackDismiss(active.kind)
      dismiss()
    }, duration)
    return () => window.clearTimeout(timer)
  }, [phase, dismiss, active])

  if (!active) return null

  const meta = KIND_META[active.kind]
  const tone = active.tone ?? meta.tone
  const hasActions = Array.isArray(active.actions) && active.actions.length > 0
  // 2026-05-20 사용자 요청: actions가 없는 popup은 autoDismissMs 유무와 무관하게
  // 확인 [Space] 버튼을 항상 노출 — 너무 빨리 사라지는 인지 부담 해결.
  const showConfirmButton = !hasActions && !active.onDefer

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
  const effectClass = visualEffects.map((effect) => ` is-effect-${effect}`).join('')
  const tierClass = (active.tier ?? active.courtBeat?.tier) ? ` is-tier-${active.tier ?? active.courtBeat?.tier}` : ''
  const rootClass = `pc-event-feedback-root${modal ? ' is-modal' : ' is-alert'}${cutscene ? ' is-cutscene' : ''}${evidenceUnlockCutscene ? ' is-evidence-unlock' : ''}${beatClass}${effectClass}${tierClass} is-phase-${phase}`
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
      <ImpactTypographyOverlay bigTypography={bigTypography} subtitle={impactSubtitle} locale={locale} />
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
        className={`pc-event-feedback-card tone-${tone} kind-${active.kind} is-phase-${phase}${modal ? ' is-modal' : ' is-alert'}${cutscene ? ' is-cutscene' : ''}${evidenceUnlockCutscene ? ' is-evidence-unlock' : ''}${active.courtBeat ? ' is-court-clash-card' : ''}${beatClass}${effectClass}${tierClass}`}
        data-tutorial-target="feedback-card"
        data-resonance-target={cutscene ? 'cutscene-center' : undefined}
        style={cardStyle}
      >
        {/* 2026-05-22 v3.3: focusTakeover beat-mark도 panel-pin 마름모 시스템에 통합.
            기존 막대/추상 형상(span+i) → cue별 명확 아이콘. 36px 크기는 --beat modifier가 유지하여
            popup pin(24px) 대비 climax 강조감 보존. cue color는 기존 --court-beat-accent와 동일. */}
        {focusTakeover && !evidenceUnlockCutscene ? (
          <div
            className={`pc-panel-pin pc-panel-pin--beat pc-panel-pin--cue-${activeBeat.cue}`}
            aria-hidden="true"
          >
            <PCSvgIcon id={getBeatPinIcon(activeBeat.cue)} size={18} />
          </div>
        ) : null}
        {/* 2026-05-22 v3.3: 일반 popup(alert/modal)에 24×24 마름모 pin marker — kind별 아이콘.
            modal(선택 필요)은 cue color, alert(정보 노출)은 soft gold. cutscene/focusTakeover/
            courtBeat은 이미 beat-mark/eye/evidence-mark이 자리 — 위계 중복 회피. */}
        {!cutscene && !focusTakeover && !active.courtBeat ? (
          <div
            className={`pc-panel-pin pc-panel-pin--popup ${modal ? 'pc-panel-pin--popup-modal' : 'pc-panel-pin--popup-alert'}`}
            aria-hidden="true"
          >
            <PCSvgIcon id={getPopupPinIcon(active.kind, modal)} size={13} />
          </div>
        ) : null}
        {/* X 踰꾪듉 ??onDefer ?뺤쓽??移대뱶留?(?? 吏꾩떎 怨듬갑 ?쇱떆 蹂대쪟). ?대┃ ??onDefer ??移대뱶 ?レ쓬. */}
        {active.courtBeat ? (
          <button
            type="button"
            className="pc-event-feedback__close"
            aria-label={localizeRuntimeText('닫기', locale)}
            onClick={() => setPhase('leaving')}
          >
            ×
          </button>
        ) : active.onDefer ? (
          <button
            type="button"
            className="pc-event-feedback__close"
            aria-label={localizeRuntimeText('일시 보류', locale)}
            onClick={() => {
              try { active.onDefer!() } finally { setPhase('leaving') }
            }}
          >
            ×
          </button>
        ) : null}
        {/* 2026-05-22 v3.3: observation eye SVG도 panel-pin 마름모 시스템에 통합.
            기존 52×26 길쭉한 눈 SVG → 24×24 마름모 + i-eye. cue color는 mint (observation의 메타).
            focusTakeover라 위 beat-mark이 이미 노출되는 케이스는 이 조건이 안 들어옴 (cutscene만 해당). */}
        {cutscene && active.kind === 'observation' && !focusTakeover ? (
          <div className="pc-panel-pin pc-panel-pin--observation" aria-hidden="true">
            <PCSvgIcon id="i-eye" size={13} />
          </div>
        ) : null}
        {/* 2026-05-22 v3.3: evidence-unlock cutscene marker도 panel-pin 마름모 시스템에 통합.
            이전 evidence-mark은 34×42 직사각형 stylized로 panel-pin 마름모와 시각 분열 발생.
            mint cue color(evidence)는 --evidence-unlock modifier로 강조 — focusTakeover 외곽
            green glow와 함께 climax 분위기 형성. */}
        {evidenceUnlockCutscene ? (
          <div className="pc-panel-pin pc-panel-pin--evidence-unlock" aria-hidden="true">
            <PCSvgIcon id="i-doc" size={13} />
          </div>
        ) : null}
        {active.courtBeat ? (
          <CourtBeatClash active={active} locale={locale} />
        ) : (
          <>
        {active.eyebrow ? <div className="pc-event-feedback__eyebrow">{localizeRuntimeText(active.eyebrow, locale)}</div> : null}
        {active.subtitle ? <div className="pc-event-feedback__subtitle">{localizeRuntimeText(active.subtitle, locale)}</div> : null}
        {active.title ? <div className="pc-event-feedback__title">{localizeRuntimeText(active.title, locale)}</div> : null}
        {active.body ? (
          <div className="pc-event-feedback__body">
            {splitBodyIntoSentences(localizeRuntimeText(active.body, locale)).map((sentence, i, arr) => (
              <span key={`${active.id}-sentence-${i}`} className="pc-event-feedback__sentence">
                {sentence}{i < arr.length - 1 ? '\n' : ''}
              </span>
            ))}
          </div>
        ) : null}
        {active.bodyLines && active.bodyLines.length > 0 ? (
          <div className="pc-event-feedback__lines">
            {active.bodyLines.map((line, i) => <div key={`${active.id}-line-${i}`}>{localizeRuntimeText(line, locale)}</div>)}
          </div>
        ) : null}
        {active.quote ? <div className="pc-event-feedback__quote">“{localizeRuntimeText(active.quote, locale)}”</div> : null}
        {active.claims ? (
          <div className="pc-event-feedback__claims">
            <div className="pc-event-feedback__claim party-a">
              <strong>{localizeRuntimeText(active.claims.partyA.name, locale)}</strong>
              <p>{localizeRuntimeText(active.claims.partyA.text, locale)}</p>
            </div>
            <div className="pc-event-feedback__claim party-b">
              <strong>{localizeRuntimeText(active.claims.partyB.name, locale)}</strong>
              <p>{localizeRuntimeText(active.claims.partyB.text, locale)}</p>
            </div>
          </div>
        ) : null}
        {active.layoutVariant === 'split-vs' ? (
          <CourtBeatSplitVs active={active} locale={locale} />
        ) : active.contrast ? (
          <div className="pc-event-feedback__contrast">
            <div className="pc-event-feedback__contrast-side is-left">
              <div className="pc-event-feedback__contrast-label">{localizeRuntimeText(active.contrast.left.label, locale)}</div>
              <div className="pc-event-feedback__contrast-text">“{localizeRuntimeText(active.contrast.left.text, locale)}”</div>
            </div>
            <div className="pc-event-feedback__contrast-vs" aria-hidden="true">
              <span>VS</span>
            </div>
            <div className="pc-event-feedback__contrast-side is-right">
              <div className="pc-event-feedback__contrast-label">{localizeRuntimeText(active.contrast.right.label, locale)}</div>
              <div className="pc-event-feedback__contrast-text">“{localizeRuntimeText(active.contrast.right.text, locale)}”</div>
            </div>
          </div>
        ) : null}
        {active.blocks && active.blocks.length > 0 ? (
          <div className="pc-event-feedback__blocks">
            {active.blocks.map((block, i) => (
              <div key={`${active.id}-block-${i}`} className="pc-event-feedback__block">
                <strong>{localizeRuntimeText(block.title, locale)}</strong>
                <p>{localizeRuntimeText(block.text, locale)}</p>
              </div>
            ))}
          </div>
        ) : null}
        {active.meta && active.meta.length > 0 ? (
          <div className="pc-event-feedback__meta">
            {active.meta.map((m, i) => <span key={`${active.id}-meta-${i}`}>{localizeRuntimeText(m, locale)}</span>)}
          </div>
        ) : null}
        {active.tag ? <div className="pc-event-feedback__tag">{localizeRuntimeText(active.tag, locale)}</div> : null}
          </>
        )}

        {hasActions ? (
          <div className={`pc-event-feedback__actions layout-${active.actionsLayout ?? 'horizontal'}`}>
            {active.actions!.map((action, i, arr) => (
              <button
                key={`${active.id}-act-${i}`}
                type="button"
                className={`pc-event-feedback__action tone-${action.tone ?? 'gold'}`}
                onClick={() => {
                  const runAction = action.onSelect
                  emitFeedbackAction(active.kind, `action_${i}`)
                  setPhase('leaving')
                  window.setTimeout(() => {
                    runAction()
                  }, 280)
                }}
              >
                <span>{localizeRuntimeText(action.label, locale)}</span>
                {/* 2026-05-21 (11th): single-action modal에 Space kbd 노출 — dismiss button과 통일. */}
                {arr.length === 1 ? <kbd className="pc-event-feedback__kbd">Space</kbd> : null}
              </button>
            ))}
          </div>
        ) : null}

        {showConfirmButton ? (
          <button
            type="button"
            className="pc-event-feedback__dismiss"
            onClick={() => setPhase('leaving')}
          >
            <span>{active.courtBeat ? localizeRuntimeText('닫기', locale) : localizeRuntimeText('확인', locale)}</span>
            <kbd className="pc-event-feedback__kbd">Space</kbd>
          </button>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}

