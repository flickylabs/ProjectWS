/**
 * Phase 3 Structured Log 수집기
 * ─────────────────────────────────
 * 게임 중 Phase3StructuredLog를 실시간으로 쌓는다.
 * Phase 3 → Phase 6 전환 시 이 로그를 프롬프트 브릿지에 전달.
 *
 * 수집 시점:
 * - revealedAtoms: beat의 truthEnvelope, StateUnlockAtom 해금, evidence onSuccess
 * - disprovedFakeIssues: red_herring 쟁점의 M4 도달 또는 disproved flag
 * - resolvedLinks: linkEdge 조건 만족 시
 * - relationCoreRevealed: 쟁점의 core 층 최초 해금
 * - playerStyleTags: 턴별 패턴 누적 → 게임 종료 시 태그 파생
 */

import type { Phase3StructuredLog } from '../types'
import type { QuestionType } from '../types'
import type { AngleTag } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 누적 상태
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface StyleAccumulator {
  questionTypeCounts: Record<string, number>
  angleTagCounts: Record<string, number>
  interjectionAllowCount: number
  interjectionBlockCount: number
  evidenceFinishCount: number
  totalTurns: number
}

let _log: Phase3StructuredLog = createInitialLog()
let _style: StyleAccumulator = createInitialStyle()
let _keyMoments: Phase3KeyMoment[] = []

function createInitialLog(): Phase3StructuredLog {
  return {
    revealedAtoms: [],
    disprovedFakeIssues: [],
    resolvedLinks: [],
    relationCoreRevealed: false,
    playerStyleTags: [],
  }
}

function createInitialStyle(): StyleAccumulator {
  return {
    questionTypeCounts: {},
    angleTagCounts: {},
    interjectionAllowCount: 0,
    interjectionBlockCount: 0,
    evidenceFinishCount: 0,
    totalTurns: 0,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API — 수집
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function resetPhase3Log(): void {
  _log = createInitialLog()
  _style = createInitialStyle()
  _keyMoments = []
}

/** beat 선택 후 / StateUnlockAtom 해금 후 / evidence onSuccess 후 호출 */
export function recordRevealedAtom(atomId: string): void {
  if (!_log.revealedAtoms.includes(atomId)) {
    _log.revealedAtoms.push(atomId)
  }
}

/** red_herring 쟁점이 M4(clarified)에 도달했을 때 */
export function recordDisprovedFakeIssue(disputeId: string): void {
  if (!_log.disprovedFakeIssues.includes(disputeId)) {
    _log.disprovedFakeIssues.push(disputeId)
  }
}

/** linkEdge 조건 만족 시 */
export function recordResolvedLink(linkId: string): void {
  if (!_log.resolvedLinks.includes(linkId)) {
    _log.resolvedLinks.push(linkId)
  }
}

/** 쟁점의 core 층이 최초로 해금되었을 때 */
export function markRelationCoreRevealed(): void {
  _log.relationCoreRevealed = true
}

/** 매 턴 질문 유형/angleTag 기록 — playerStyleTags 파생용 */
export function recordTurnStyle(questionType: QuestionType, angleTag: AngleTag): void {
  _style.questionTypeCounts[questionType] = (_style.questionTypeCounts[questionType] ?? 0) + 1
  _style.angleTagCounts[angleTag] = (_style.angleTagCounts[angleTag] ?? 0) + 1
  _style.totalTurns++
}

/** 끼어들기 선택 기록 */
export function recordInterjectionChoice(choice: 'allow' | 'block'): void {
  if (choice === 'allow') _style.interjectionAllowCount++
  else _style.interjectionBlockCount++
}

/** 증거 finisher 사용 기록 */
export function recordEvidenceFinish(): void {
  _style.evidenceFinishCount++
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API — 조회
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 현재까지 수집된 로그 반환 (playerStyleTags는 이 시점에 파생) */
export function getPhase3StructuredLog(): Phase3StructuredLog {
  return {
    ..._log,
    playerStyleTags: derivePlayerStyleTags(_style),
  }
}

/** 수집 상태 직접 접근 (디버그용) */
export function getPhase3LogRaw(): Phase3StructuredLog {
  return _log
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// playerStyleTags 파생
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function derivePlayerStyleTags(style: StyleAccumulator): string[] {
  const tags: string[] = []
  const total = style.totalTurns || 1

  // 질문 유형 편향
  const factRatio = (style.questionTypeCounts['fact_pursuit'] ?? 0) / total
  const empathyRatio = (style.questionTypeCounts['empathy_approach'] ?? 0) / total
  const motiveRatio = (style.questionTypeCounts['motive_search'] ?? 0) / total

  if (factRatio >= 0.5) tags.push('pressure_heavy')
  if (empathyRatio >= 0.3) tags.push('shows_empathy_when_open')
  if (motiveRatio >= 0.3) tags.push('motive_hunter')

  // angleTag 편향
  const timelineRatio = (style.angleTagCounts['timeline'] ?? 0) / total
  const responsibilityRatio = (style.angleTagCounts['responsibility'] ?? 0) / total
  const emotionRatio = (style.angleTagCounts['emotion'] ?? 0) / total

  if (timelineRatio >= 0.3) tags.push('presses_timeline')
  if (responsibilityRatio >= 0.3) tags.push('presses_responsibility')
  if (emotionRatio >= 0.3) tags.push('relation_core_hunter')

  // 끼어들기 성향
  if (style.interjectionAllowCount >= 2) tags.push('allows_interjection')
  if (style.interjectionBlockCount >= 2) tags.push('blocks_interjection')

  // 증거 마무리
  if (style.evidenceFinishCount >= 2) tags.push('evidence_finisher')

  // red herring 추적
  if (_log.disprovedFakeIssues.length > 0) tags.push('trap_resolver')

  // 관계 핵심 도달
  if (_log.relationCoreRevealed) tags.push('relation_core_reached')

  return tags
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Phase 6 / Result 브릿지 변환
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ResolvedRevealedFact {
  atomId: string
  factText: string
  disputeId?: string
  source: 'v2_atom' | 'unlock_atom' | 'proposed_unlock' | 'evidence' | 'event'
}

export interface Phase3KeyMoment {
  turn: number
  beatId: string
  disputeId: string
  kind: 'transition' | 'evidence_hit' | 'interjection' | 'burst' | 'fatigue'
  line: string
}

export interface ContestedIssue {
  disputeId: string
  label: string
  status: 'open' | 'narrowed' | 'mostly_resolved'
  summaries: string[]
}

export interface DisprovedFakeIssueDetail {
  disputeId: string
  label: string
  clarifySummary: string
}

export interface ResolvedLinkDetail {
  linkId: string
  summary: string
}

export type ToneProfile = 'direct' | 'balanced' | 'empathetic'

export interface Phase3PromptBridgeV2 {
  caseId: string
  structuredLog: Phase3StructuredLog
  resolvedRevealedFacts: ResolvedRevealedFact[]
  contestedIssues: ContestedIssue[]
  disprovedFakeIssueDetails: DisprovedFakeIssueDetail[]
  resolvedLinkDetails: ResolvedLinkDetail[]
  toneProfile: ToneProfile
  finalEmotions: {
    a: { phase: string; value: number }
    b: { phase: string; value: number }
  }
  lastLinesByParty: { a?: string; b?: string }
  lastMeaningfulBeatIds: string[]
  keyMoments: Phase3KeyMoment[]
}

/** 키 모멘트 기록 (beat 선택 직후 호출) */
export function recordKeyMoment(moment: Phase3KeyMoment): void {
  _keyMoments.push(moment)
}

/** Phase 3 → Phase 6 전환 시 호출하여 프롬프트 브릿지 생성 */
export function buildPhase3PromptBridge(
  caseId: string,
  atomIndex: Record<string, { factText: string; disputeId?: string; source: ResolvedRevealedFact['source'] }>,
  finalEmotions: Phase3PromptBridgeV2['finalEmotions'],
  lastLinesByParty: Phase3PromptBridgeV2['lastLinesByParty'],
  disputeIndex?: Record<string, { label: string; summaries: string[]; clarifyOutcomeLabel?: string }>,
  linkIndex?: Record<string, { summary: string }>,
): Phase3PromptBridgeV2 {
  const log = getPhase3StructuredLog()

  const resolvedRevealedFacts = log.revealedAtoms
    .map(atomId => {
      const entry = atomIndex[atomId]
      if (!entry) return null
      return { atomId, factText: entry.factText, disputeId: entry.disputeId, source: entry.source }
    })
    .filter(Boolean) as ResolvedRevealedFact[]

  // contestedIssues: disputeIndex에서 disproved 제외
  const contestedIssues: ContestedIssue[] = []
  const disprovedFakeIssueDetails: DisprovedFakeIssueDetail[] = []
  if (disputeIndex) {
    for (const [dId, info] of Object.entries(disputeIndex)) {
      if (log.disprovedFakeIssues.includes(dId)) {
        disprovedFakeIssueDetails.push({
          disputeId: dId,
          label: info.label,
          clarifySummary: info.clarifyOutcomeLabel ?? `${info.label} 오해가 해소됨`,
        })
      } else {
        // 드러난 atom이 있으면 narrowed, 아니면 open
        const revealedForDispute = resolvedRevealedFacts.filter(f => f.disputeId === dId)
        const status: ContestedIssue['status'] =
          revealedForDispute.length >= 3 ? 'mostly_resolved' :
          revealedForDispute.length >= 1 ? 'narrowed' : 'open'
        contestedIssues.push({
          disputeId: dId,
          label: info.label,
          status,
          summaries: info.summaries,
        })
      }
    }
  }

  // resolvedLinkDetails
  const resolvedLinkDetails: ResolvedLinkDetail[] = log.resolvedLinks.map(linkId => ({
    linkId,
    summary: linkIndex?.[linkId]?.summary ?? linkId,
  }))

  // lastMeaningfulBeatIds: 최근 keyMoments에서 beatId 추출
  const lastMeaningfulBeatIds = _keyMoments.slice(-3).map(m => m.beatId)

  const toneProfile = deriveToneProfile(log.playerStyleTags)

  return {
    caseId,
    structuredLog: log,
    resolvedRevealedFacts,
    contestedIssues,
    disprovedFakeIssueDetails,
    resolvedLinkDetails,
    toneProfile,
    finalEmotions,
    lastLinesByParty,
    lastMeaningfulBeatIds,
    keyMoments: _keyMoments.slice(-8), // 최대 8개 digest
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// toneProfile 파생
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function deriveToneProfile(playerStyleTags: string[]): ToneProfile {
  const directSignals = ['presses_timeline', 'presses_responsibility', 'evidence_finisher', 'blocks_interjection']
  const empatheticSignals = ['shows_empathy_when_open', 'relation_core_hunter', 'allows_interjection']

  const directScore = playerStyleTags.filter(tag => directSignals.includes(tag)).length
  const empatheticScore = playerStyleTags.filter(tag => empatheticSignals.includes(tag)).length

  if (directScore >= empatheticScore + 2) return 'direct'
  if (empatheticScore >= directScore + 2) return 'empathetic'
  return 'balanced'
}

// _keyMoments 리셋은 resetPhase3Log()에 포함됨
