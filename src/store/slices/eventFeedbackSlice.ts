import type { StateCreator } from 'zustand'
import type { PartyId } from '../../types'

/**
 * Event Feedback Slice (Option A 통합 팝업)
 * ──────────────────────────────────────────
 * 4종 팝업(Toast / Archetype 관찰 / Transition 선택 / Discovery 모달)을
 * 단일 큐로 수렴하기 위한 인프라. EventFeedbackCard가 active를 구독해 렌더.
 *
 * 동작 규칙:
 * - enqueue 시 active 없으면 즉시 active로 승격, 있으면 큐 뒤에 push
 * - dismiss는 큐의 head를 shift해 active로 이동 (없으면 null)
 * - 같은 이벤트 중복 방지(dedup)는 호출부에서 처리. 슬라이스는 순수 큐
 */

export type EventFeedbackKind =
  | 'observation'        // archetype 관찰 (자동 소멸 + 태그 수렴)
  | 'state_change'       // S1~S4 상태 전이 (자동 소멸)
  | 'transition_choice'  // cracked/cornered/opening (선택 필수)
  | 'contradiction'      // 모순 발견 (선택 필수)
  | 'emergence'          // 새 쟁점 발견 (선택 필수)
  | 'confrontation'      // 진실 공방 (선택 필수)
  | 'conflict'           // 판단 충돌 (선택 필수)
  | 'emotional_slip'     // 감정 누설 (선택 필수)
  | 'perk_choice'        // 퍼크 선택 (선택 필수)
  | 'witness_choice'     // 증인 주제 선택 (선택 필수)
  | 'evidence_result'    // 증거 제시 결과 (선택 or 자동)
  | 'info'               // 일반 알림 (자동)

export type EventFeedbackTone = 'gold' | 'red' | 'green' | 'blue' | 'neutral' | 'alert'

export interface EventFeedbackAction {
  label: string
  tone?: EventFeedbackTone | 'gray'
  onSelect: () => void
}

export type EventFeedbackCourtBeatType =
  | 'evidence_hit_major'
  | 'evidence_miss'
  | 'notebook_judicial_record'

export type EventFeedbackCourtBeatIntensity = 'focus' | 'impact' | 'breakthrough'
export type EventFeedbackCourtBeatCue = 'evidence' | 'contradiction' | 'notebook' | 'truth'
export type EventFeedbackCourtBeatDestination = 'evidence' | 'dispute' | 'notebook' | 'truth' | 'observation'
export type EventFeedbackVisualEffect =
  | 'screen-shake-light'
  | 'screen-shake-medium'
  | 'screen-shake-heavy'
  | 'screen-flash-white'
  | 'screen-flash-dark'
  | 'screen-freeze'
  | 'vignette-strong'
  | 'vignette-red'
  | 'portrait-shake'
  | 'portrait-desaturate'
  | 'portrait-zoom-in'
  | 'card-slam'
export type EventFeedbackEffectTiming = 'before' | 'during' | 'after'
export type EventFeedbackTier = 'T3'
export type EventFeedbackImpactTone = 'gold' | 'neutral' | 'amber-warning'

export interface EventFeedbackBigTypography {
  text: string
  durationMs: number
  sizeScale?: number
  tone?: EventFeedbackImpactTone
}

export interface EventFeedbackImpactSubtitle {
  text: string
  durationMs: number
  tone: EventFeedbackImpactTone
}

export interface EventFeedbackSplitContent {
  left: { partyId?: PartyId; label?: string; text?: string }
  right: { partyId?: PartyId; label?: string; text?: string }
}

export interface EventFeedbackEvidenceRow {
  id: string
  label: string
  detail?: string
  highlighted?: boolean
  muted?: boolean
}

export interface EventFeedbackCourtBeat {
  beatType: EventFeedbackCourtBeatType
  intensity?: EventFeedbackCourtBeatIntensity
  cue?: EventFeedbackCourtBeatCue
  destination?: EventFeedbackCourtBeatDestination
  visualEffects?: EventFeedbackVisualEffect[]
  effectTiming?: EventFeedbackEffectTiming
  tier?: EventFeedbackTier
  bigTypography?: EventFeedbackBigTypography
  subtitle?: EventFeedbackImpactSubtitle
  layoutVariant?: 'split-vs'
  splitContent?: EventFeedbackSplitContent
  chipLabel?: string
  beatId?: string
  statement?: {
    label?: string
    speakerName?: string
    text: string
    highlightText?: string
  }
  evidence?: {
    id?: string
    title: string
    stageLabel?: string
    rows: EventFeedbackEvidenceRow[]
  }
  portraitReaction?: {
    caseId?: string
    party?: PartyId
    name?: string
    state?: 'neutral' | 'defensive' | 'shaken' | 'resigned' | 'softened' | 'desaturated' | 'zoomed-in' | 'zoom-pulse'
  }
  judgeLine?: string
  reactionLine?: string
  relationshipLine?: string
  notebookEntry?: string
}

export interface EventFeedbackItem {
  id: string
  kind: EventFeedbackKind
  title?: string
  subtitle?: string
  body?: string
  /** Court beat 없이도 쓰는 임팩트 envelope. 기존 subtitle 문자열과 충돌하지 않게 별도 필드로 둔다. */
  intensity?: EventFeedbackCourtBeatIntensity
  cue?: EventFeedbackCourtBeatCue
  destination?: EventFeedbackCourtBeatDestination
  visualEffects?: EventFeedbackVisualEffect[]
  effectTiming?: EventFeedbackEffectTiming
  tier?: EventFeedbackTier
  bigTypography?: EventFeedbackBigTypography
  impactSubtitle?: EventFeedbackImpactSubtitle
  layoutVariant?: 'split-vs'
  splitContent?: EventFeedbackSplitContent
  chipLabel?: string
  beatId?: string
  /** 본문 여러 줄 (body 뒤에 세로로 나열) */
  bodyLines?: string[]
  /** 강조 인용문 ("..." 디자인) */
  quote?: string
  /** 양측 주장 비교 (진실 공방 등) */
  claims?: {
    partyA: { name: string; text: string }
    partyB: { name: string; text: string }
  }
  /** 모순 대치 (모순 감지 전용 — 좌/우 대치 + 중앙 VS) */
  contrast?: {
    left: { label: string; text: string }
    right: { label: string; text: string }
  }
  /** 하단 메타 정보 (관련 쟁점 등 작게 표시) */
  meta?: string[]
  /** block 리스트 (제목 + 설명) — 판단 충돌/감정 실수 등 */
  blocks?: { title: string; text: string }[]
  /** Court Beat v1: statement/evidence clash and judicial record visual payload. */
  courtBeat?: EventFeedbackCourtBeat
  tone?: EventFeedbackTone
  /** 카드 상단 라벨 (ex: "재판관의 관찰") */
  eyebrow?: string
  /** 카드 하단 태그 (ex: "피해자 서사") */
  tag?: string
  /** observation 수렴 타겟 파티 */
  party?: PartyId
  /** observation 수렴 타겟 archetype id */
  archetype?: string
  /** 관련 쟁점 ID (disputeId) */
  disputeId?: string
  /** 있으면 유저 선택 필수, 없으면 autoDismissMs 기준으로 자동 소멸 */
  actions?: EventFeedbackAction[]
  /** 자동 소멸 지연(ms). 미지정 시 kind별 기본값 (card 쪽에서 결정) */
  autoDismissMs?: number
  /** observation 전용: 해당 파티의 archetype 태그로 수렴 애니메이션 재생 */
  convergeToTag?: boolean
  /** 가이드 컷씬: 임의의 타겟 selector로 수렴 + 수렴 완료 후 타겟 3번 깜빡 */
  convergeTargetSelector?: string
  /** 액션 레이아웃: 기본 horizontal, 긴 리스트(증인 주제 등)는 vertical */
  actionsLayout?: 'horizontal' | 'vertical'
  /** 카드 우상단 X 버튼 — 클릭 시 호출 (확정 액션 없이 나중에 다시 처리할 때) */
  onDefer?: () => void
}

/** 자잘 알림 kind — Minor 티커 폐기 (관찰 패널로 흡수). 호환용 빈 배열 유지 */
export const MINOR_FEEDBACK_KINDS: EventFeedbackKind[] = []

export interface EventFeedbackSlice {
  /** Major 큐 (중요 알림 — 한 번에 하나씩 순차) */
  feedbackQueue: EventFeedbackItem[]
  activeFeedback: EventFeedbackItem | null
  /** Minor 스트림 (자잘 알림 — 동시 표시, 토스트식) */
  minorStream: EventFeedbackItem[]
  /** 큐에 이벤트 추가. kind 에 따라 Major 큐 또는 Minor 스트림으로 자동 라우팅 */
  enqueueFeedback: (item: Omit<EventFeedbackItem, 'id'>) => string
  /** Major active 제거 + 큐 head를 active로 승격 */
  dismissActiveFeedback: () => void
  /** Minor 스트림에서 특정 id 제거 */
  dismissMinorFeedback: (id: string) => void
  /** 전부 비움 (사건 시작/리셋 시 호출) */
  clearFeedbackQueue: () => void
}

let feedbackIdCounter = 0
function nextFeedbackId(): string {
  feedbackIdCounter += 1
  return `ef-${Date.now().toString(36)}-${feedbackIdCounter.toString(36)}`
}

const MINOR_MAX = 4

export const createEventFeedbackSlice: StateCreator<EventFeedbackSlice, [], [], EventFeedbackSlice> = (set) => ({
  feedbackQueue: [],
  activeFeedback: null,
  minorStream: [],

  enqueueFeedback: (item) => {
    const id = nextFeedbackId()
    const entry: EventFeedbackItem = { ...item, id }
    const isMinor = MINOR_FEEDBACK_KINDS.includes(item.kind)

    if (isMinor) {
      set((state) => ({
        minorStream: [...state.minorStream, entry].slice(-MINOR_MAX),
      }))
      return id
    }

    set((state) => {
      if (!state.activeFeedback) {
        return { activeFeedback: entry, feedbackQueue: state.feedbackQueue }
      }
      return { feedbackQueue: [...state.feedbackQueue, entry] }
    })
    return id
  },

  dismissActiveFeedback: () => {
    set((state) => {
      if (state.feedbackQueue.length === 0) {
        return { activeFeedback: null, feedbackQueue: [] }
      }
      const [next, ...rest] = state.feedbackQueue
      return { activeFeedback: next, feedbackQueue: rest }
    })
  },

  dismissMinorFeedback: (id) => {
    set((state) => ({
      minorStream: state.minorStream.filter((item) => item.id !== id),
    }))
  },

  clearFeedbackQueue: () => {
    set({ feedbackQueue: [], activeFeedback: null, minorStream: [] })
  },
})
