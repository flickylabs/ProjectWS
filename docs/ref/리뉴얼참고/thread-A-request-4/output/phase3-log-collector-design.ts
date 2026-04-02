/**
 * Phase3StructuredLog runtime collector design
 * -------------------------------------------
 * 목적:
 * 1) Phase 3 진행 중 structuredLog를 실시간 수집한다.
 * 2) Phase 6 / Result에서 바로 쓸 수 있는 PromptBridgeV2로 변환한다.
 * 3) 기존 엔진 수정은 최소화하고, useActionDispatch / v3GameLoopLoader / dossier success 지점에 훅을 꽂는다.
 *
 * repo 배치 권장:
 *   - src/engine/phase3LogCollector.ts
 *   - src/store/slices/phase3LogSlice.ts
 *
 * 전제:
 * - 공개 로그는 `Phase3StructuredLog` 단일 필드로 유지
 * - 플레이 스타일 집계용 원시 이벤트는 별도 runtime buffer에 쌓고,
 *   Phase 3 종료 직전 최종 playerStyleTags로 축약한다.
 */

import type { LieState } from './agent'
import type { PartyId } from './game'
import type { QuestionType } from './renewal'
import type { AngleTag, BeatScriptV2, FatigueLevel } from './schema-01-beat-script-v2'
import type { DepthLayerId, DisputeV2, LinkEdgeType, MisconceptionState, Phase3StructuredLog } from './schema-02-dispute-v2'

// ─────────────────────────────────────────
// 1. Phase 6 / Result bridge 타입
// ─────────────────────────────────────────

export type RevealedFactSource =
  | 'v2_atom'
  | 'unlock_atom'
  | 'proposed_unlock'
  | 'evidence'
  | 'event'

export interface Phase3AtomIndexEntry {
  atomId: string
  factText: string
  disputeId?: string
  ownerParty?: PartyId
  source: RevealedFactSource
  tags?: string[]
}

export interface ResolvedRevealedFact {
  atomId: string
  factText: string
  disputeId?: string
  source: RevealedFactSource
}

export interface ContestedIssueSummary {
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
  type?: LinkEdgeType
}

export interface Phase3KeyMoment {
  turn: number
  beatId: string
  disputeId: string
  kind: 'transition' | 'evidence_hit' | 'interjection' | 'burst' | 'fatigue'
  line: string
}

export interface Phase3PromptBridgeV2 {
  caseId: string

  structuredLog: Phase3StructuredLog

  resolvedRevealedFacts: ResolvedRevealedFact[]
  contestedIssues: ContestedIssueSummary[]
  disprovedFakeIssueDetails: DisprovedFakeIssueDetail[]
  resolvedLinkDetails: ResolvedLinkDetail[]

  finalEmotions: {
    a: { phase: string; value: number }
    b: { phase: string; value: number }
  }

  lastLinesByParty: { a?: string; b?: string }
  lastMeaningfulBeatIds: string[]
  keyMoments: Phase3KeyMoment[]
}

// ─────────────────────────────────────────
// 2. runtime buffer 타입
// ─────────────────────────────────────────

export interface PlayerStyleHintEvent {
  turn: number
  targetParty?: PartyId
  disputeId?: string
  questionType?: QuestionType
  angleTag?: AngleTag
  fatigueLevel?: FatigueLevel
  issueRole?: string
  interjectionChoice?: 'allow' | 'block'
  usedEvidence?: boolean
  hitRedHerring?: boolean
  disprovedRedHerring?: boolean
  relationCoreUnlocked?: boolean
}

export interface Phase3MomentEvent {
  turn: number
  beatId: string
  disputeId: string
  kind: Phase3KeyMoment['kind']
  line: string
}

export interface Phase3LogCollectorState {
  /** Phase 6에 직접 전달하는 최소 공개 로그 */
  phase3Log: Phase3StructuredLog

  /** playerStyleTags 파생용 원시 이벤트 */
  phase3StyleHints: PlayerStyleHintEvent[]

  /** keyMoments 파생용 런타임 비트/이벤트 로그 */
  phase3MomentEvents: Phase3MomentEvent[]
}

export function createInitialPhase3StructuredLog(): Phase3StructuredLog {
  return {
    revealedAtoms: [],
    disprovedFakeIssues: [],
    resolvedLinks: [],
    relationCoreRevealed: false,
    playerStyleTags: [],
  }
}

export function createInitialPhase3LogCollectorState(): Phase3LogCollectorState {
  return {
    phase3Log: createInitialPhase3StructuredLog(),
    phase3StyleHints: [],
    phase3MomentEvents: [],
  }
}

// ─────────────────────────────────────────
// 3. 기본 수집 함수
// ─────────────────────────────────────────

function pushUnique(list: string[], value: string): string[] {
  return list.includes(value) ? list : [...list, value]
}

export function recordRevealedAtom(
  state: Phase3LogCollectorState,
  atomId: string,
): Phase3LogCollectorState {
  return {
    ...state,
    phase3Log: {
      ...state.phase3Log,
      revealedAtoms: pushUnique(state.phase3Log.revealedAtoms, atomId),
    },
  }
}

export function recordDisprovedFakeIssue(
  state: Phase3LogCollectorState,
  disputeId: string,
): Phase3LogCollectorState {
  return {
    ...state,
    phase3Log: {
      ...state.phase3Log,
      disprovedFakeIssues: pushUnique(state.phase3Log.disprovedFakeIssues, disputeId),
    },
  }
}

export function recordResolvedLink(
  state: Phase3LogCollectorState,
  linkId: string,
): Phase3LogCollectorState {
  return {
    ...state,
    phase3Log: {
      ...state.phase3Log,
      resolvedLinks: pushUnique(state.phase3Log.resolvedLinks, linkId),
    },
  }
}

export function markRelationCoreRevealed(
  state: Phase3LogCollectorState,
): Phase3LogCollectorState {
  if (state.phase3Log.relationCoreRevealed) return state
  return {
    ...state,
    phase3Log: {
      ...state.phase3Log,
      relationCoreRevealed: true,
    },
  }
}

export function addPlayerStyleHint(
  state: Phase3LogCollectorState,
  hint: PlayerStyleHintEvent,
): Phase3LogCollectorState {
  return {
    ...state,
    phase3StyleHints: [...state.phase3StyleHints, hint],
  }
}

export function recordKeyMoment(
  state: Phase3LogCollectorState,
  moment: Phase3MomentEvent,
): Phase3LogCollectorState {
  return {
    ...state,
    phase3MomentEvents: [...state.phase3MomentEvents, moment],
  }
}

// ─────────────────────────────────────────
// 4. beat / unlock / link / flag 전용 helper
// ─────────────────────────────────────────

export interface BeatRevealInput {
  beat: BeatScriptV2
  /** atomSelectionEngine이 선택한 실제 atom ids가 있으면 이것을 최우선 사용 */
  selectedAtomIds?: string[]
  turn: number
}

/**
 * 1순위: atomSelectionEngine이 돌려준 selectedAtomIds
 * 2순위: scripted beat의 truthEnvelope.allowAtomIds
 *
 * 현재 BeatSelectorV2가 beat만 반환한다면,
 * `selectedAtomIds`를 함께 반환하도록 얇은 확장을 권장한다.
 */
export function recordRevealedAtomsFromBeat(
  state: Phase3LogCollectorState,
  input: BeatRevealInput,
): Phase3LogCollectorState {
  const candidateIds =
    input.selectedAtomIds && input.selectedAtomIds.length > 0
      ? input.selectedAtomIds
      : input.beat.truthEnvelope?.allowAtomIds ?? []

  let next = state
  for (const atomId of candidateIds) {
    next = recordRevealedAtom(next, atomId)
  }

  return recordKeyMoment(next, {
    turn: input.turn,
    beatId: input.beat.id,
    disputeId: input.beat.disputeId,
    kind:
      input.beat.actionFamily === 'evidence'
        ? 'evidence_hit'
        : input.beat.actionFamily === 'fatigue'
          ? 'fatigue'
          : 'transition',
    line: input.beat.line,
  })
}

export function recordRevealedAtomFromUnlock(
  state: Phase3LogCollectorState,
  atomId: string,
): Phase3LogCollectorState {
  return recordRevealedAtom(state, atomId)
}

export function recordRevealedAtomFromDossierSuccess(
  state: Phase3LogCollectorState,
  revealAtomId: string | undefined,
): Phase3LogCollectorState {
  if (!revealAtomId) return state
  return recordRevealedAtom(state, revealAtomId)
}

export interface LinkResolutionInput {
  linkId: string
  relatedFlags?: string[]
}

export function recordResolvedLinkWithFlags(
  state: Phase3LogCollectorState,
  input: LinkResolutionInput,
): Phase3LogCollectorState {
  let next = recordResolvedLink(state, input.linkId)

  for (const flag of input.relatedFlags ?? []) {
    if (flag.endsWith('.red_herring_disproved') || flag.includes('red_herring_disproved')) {
      const disputeId = flag.split('.')[0]?.replace(/_/g, '-') ?? ''
      if (disputeId) next = recordDisprovedFakeIssue(next, disputeId)
    }
  }

  return next
}

export function recordCoreLayerUnlock(
  state: Phase3LogCollectorState,
  turn: number,
  disputeId: string,
  beatId: string,
  line: string,
): Phase3LogCollectorState {
  let next = markRelationCoreRevealed(state)
  next = addPlayerStyleHint(next, {
    turn,
    disputeId,
    relationCoreUnlocked: true,
  })
  return recordKeyMoment(next, {
    turn,
    beatId,
    disputeId,
    kind: 'transition',
    line,
  })
}

// ─────────────────────────────────────────
// 5. playerStyleTags 파생 규칙
// ─────────────────────────────────────────

export function derivePlayerStyleTags(
  hints: PlayerStyleHintEvent[],
  structuredLog: Phase3StructuredLog,
): string[] {
  const tags = new Set<string>()

  const angleCounts = new Map<AngleTag, number>()
  let evidenceCount = 0
  let empathyOnOpenCount = 0
  let targetSwitches = 0
  let lastTarget: PartyId | undefined
  let allowInterjectionCount = 0
  let blockInterjectionCount = 0
  let highFatigueRepeats = 0
  let redHerringPressCount = 0

  for (const hint of hints) {
    if (hint.angleTag) {
      angleCounts.set(hint.angleTag, (angleCounts.get(hint.angleTag) ?? 0) + 1)
    }

    if (hint.usedEvidence) evidenceCount += 1
    if (hint.interjectionChoice === 'allow') allowInterjectionCount += 1
    if (hint.interjectionChoice === 'block') blockInterjectionCount += 1
    if (hint.hitRedHerring) redHerringPressCount += 1

    if (hint.questionType === 'empathy_approach' && hint.issueRole && hint.issueRole !== 'red_herring') {
      empathyOnOpenCount += 1
    }

    if (hint.fatigueLevel === 'high' || hint.fatigueLevel === 'exhausted') {
      highFatigueRepeats += 1
    }

    if (hint.targetParty && lastTarget && hint.targetParty !== lastTarget) {
      targetSwitches += 1
    }
    if (hint.targetParty) lastTarget = hint.targetParty
  }

  if ((angleCounts.get('timeline') ?? 0) >= 4) tags.add('presses_timeline')
  if ((angleCounts.get('responsibility') ?? 0) >= 4) tags.add('presses_responsibility')
  if ((angleCounts.get('context') ?? 0) >= 3 && evidenceCount >= 2) tags.add('builds_context_before_finishing')
  if (empathyOnOpenCount >= 2) tags.add('shows_empathy_when_open')
  if (highFatigueRepeats >= 2) tags.add('loops_same_angle')
  if (targetSwitches >= 3) tags.add('switches_targets_well')
  if (allowInterjectionCount >= 2) tags.add('allows_interjection')
  if (blockInterjectionCount >= 2) tags.add('blocks_interjection')
  if (redHerringPressCount >= 2) tags.add('trap_chaser')
  if (structuredLog.disprovedFakeIssues.length >= 1) tags.add('red_herring_disprover')
  if (evidenceCount >= 3) tags.add('evidence_finisher')
  if (structuredLog.relationCoreRevealed) tags.add('relation_core_hunter')

  return [...tags]
}

export function finalizePlayerStyleTags(
  state: Phase3LogCollectorState,
): Phase3LogCollectorState {
  return {
    ...state,
    phase3Log: {
      ...state.phase3Log,
      playerStyleTags: derivePlayerStyleTags(state.phase3StyleHints, state.phase3Log),
    },
  }
}

// ─────────────────────────────────────────
// 6. atom / link resolver index
// ─────────────────────────────────────────

export interface Phase3LogResolverInput {
  v2Atoms: {
    claimPolicies: Record<string, Record<string, Record<string, { claimAtoms: Array<{ id: string; factText: string; tags?: string[] }> }>>>
  }
  v3GameLoop: {
    stateUnlockAtoms?: Record<string, Record<string, Record<string, Array<{ id: string; factText: string; tags?: string[] }>>>>
  }
  structureV2?: {
    proposedUnlockAtoms?: Array<{ id: string; factText: string; tags?: string[]; sourceDisputeId?: string; ownerParty?: PartyId }>
    disputes?: Array<DisputeV2>
  }
}

export interface Phase3AtomIndex {
  [atomId: string]: Phase3AtomIndexEntry
}

export function buildPhase3AtomIndex(
  input: Phase3LogResolverInput,
): Phase3AtomIndex {
  const index: Phase3AtomIndex = {}

  // 1) v2 atoms
  for (const [party, disputeMap] of Object.entries(input.v2Atoms.claimPolicies ?? {})) {
    for (const [disputeId, stateMap] of Object.entries(disputeMap ?? {})) {
      for (const state of Object.values(stateMap ?? {})) {
        for (const atom of state.claimAtoms ?? []) {
          if (!index[atom.id]) {
            index[atom.id] = {
              atomId: atom.id,
              factText: atom.factText,
              disputeId,
              ownerParty: party as PartyId,
              source: 'v2_atom',
              tags: atom.tags,
            }
          }
        }
      }
    }
  }

  // 2) v3 unlock atoms
  for (const [party, disputeMap] of Object.entries(input.v3GameLoop.stateUnlockAtoms ?? {})) {
    for (const [disputeId, stateMap] of Object.entries(disputeMap ?? {})) {
      for (const atoms of Object.values(stateMap ?? {})) {
        for (const atom of atoms ?? []) {
          if (!index[atom.id]) {
            index[atom.id] = {
              atomId: atom.id,
              factText: atom.factText,
              disputeId,
              ownerParty: party as PartyId,
              source: 'unlock_atom',
              tags: atom.tags,
            }
          }
        }
      }
    }
  }

  // 3) proposed unlock atoms
  for (const atom of input.structureV2?.proposedUnlockAtoms ?? []) {
    if (!index[atom.id]) {
      index[atom.id] = {
        atomId: atom.id,
        factText: atom.factText,
        disputeId: atom.sourceDisputeId,
        ownerParty: atom.ownerParty,
        source: 'proposed_unlock',
        tags: atom.tags,
      }
    }
  }

  return index
}

export function resolveRevealedFacts(
  revealedAtomIds: string[],
  atomIndex: Phase3AtomIndex,
): ResolvedRevealedFact[] {
  return revealedAtomIds
    .map(atomId => atomIndex[atomId])
    .filter(Boolean)
    .map(entry => ({
      atomId: entry.atomId,
      factText: entry.factText,
      disputeId: entry.disputeId,
      source: entry.source,
    }))
}

// ─────────────────────────────────────────
// 7. contested issue / fake issue / link detail 빌더
// ─────────────────────────────────────────

const LIE_RANK: Record<LieState, number> = {
  S0: 0,
  S1: 1,
  S2: 2,
  S3: 3,
  S4: 4,
  S5: 5,
}

const MISCONCEPTION_RANK: Record<MisconceptionState, number> = {
  M0: 0,
  M1: 1,
  M2: 2,
  M3: 3,
  M4: 4,
}

export interface ContestedIssueInput {
  disputes: DisputeV2[]
  lieStatesByDispute: Record<string, LieState | undefined>
  misconceptionStatesByDispute?: Record<string, MisconceptionState | undefined>
  structuredLog: Phase3StructuredLog
  resolvedRevealedFacts: ResolvedRevealedFact[]
}

export function deriveContestedIssues(
  input: ContestedIssueInput,
): ContestedIssueSummary[] {
  return input.disputes
    .filter(dispute => !input.structuredLog.disprovedFakeIssues.includes(dispute.id))
    .map(dispute => {
      const lieState = input.lieStatesByDispute[dispute.id]
      const misconceptionState = input.misconceptionStatesByDispute?.[dispute.id]

      let status: ContestedIssueSummary['status'] = 'open'

      if (dispute.disputeKind === 'red_herring' && misconceptionState) {
        const rank = MISCONCEPTION_RANK[misconceptionState]
        status = rank >= 4 ? 'mostly_resolved' : rank >= 3 ? 'narrowed' : 'open'
      } else if (lieState) {
        const rank = LIE_RANK[lieState]
        status = rank >= 4 ? 'mostly_resolved' : rank >= 3 ? 'narrowed' : 'open'
      }

      const summaries = input.resolvedRevealedFacts
        .filter(fact => fact.disputeId === dispute.id)
        .slice(0, 3)
        .map(fact => fact.factText)

      return {
        disputeId: dispute.id,
        label: dispute.name,
        status,
        summaries,
      }
    })
}

export function deriveDisprovedFakeIssueDetails(
  disputes: DisputeV2[],
  structuredLog: Phase3StructuredLog,
): DisprovedFakeIssueDetail[] {
  return structuredLog.disprovedFakeIssues
    .map(disputeId => disputes.find(d => d.id === disputeId))
    .filter(Boolean)
    .map(dispute => ({
      disputeId: dispute!.id,
      label: dispute!.name,
      clarifySummary: dispute!.judgmentStatement ?? dispute!.truthDescription,
    }))
}

export function deriveResolvedLinkDetails(
  disputes: DisputeV2[],
  structuredLog: Phase3StructuredLog,
): ResolvedLinkDetail[] {
  const linkIndex = new Map<string, { summary: string; type?: LinkEdgeType }>()

  for (const dispute of disputes) {
    for (const edge of dispute.linkEdges ?? []) {
      linkIndex.set(edge.id, {
        summary: edge.uiLabel ?? `${edge.fromDisputeId} → ${edge.toDisputeId}`,
        type: edge.type,
      })
    }
  }

  return structuredLog.resolvedLinks
    .map(linkId => ({
      linkId,
      summary: linkIndex.get(linkId)?.summary ?? linkId,
      type: linkIndex.get(linkId)?.type,
    }))
}

// ─────────────────────────────────────────
// 8. keyMoments / bridge builder
// ─────────────────────────────────────────

export function extractKeyMoments(
  events: Phase3MomentEvent[],
  limit: number = 8,
): Phase3KeyMoment[] {
  return [...events]
    .sort((a, b) => a.turn - b.turn)
    .slice(-limit)
    .map(event => ({
      turn: event.turn,
      beatId: event.beatId,
      disputeId: event.disputeId,
      kind: event.kind,
      line: event.line,
    }))
}

export interface BuildPhase3PromptBridgeInput {
  caseId: string
  collector: Phase3LogCollectorState
  resolverInput: Phase3LogResolverInput
  disputes: DisputeV2[]
  lieStatesByDispute: Record<string, LieState | undefined>
  misconceptionStatesByDispute?: Record<string, MisconceptionState | undefined>
  finalEmotions: {
    a: { phase: string; value: number }
    b: { phase: string; value: number }
  }
  lastLinesByParty: { a?: string; b?: string }
  lastMeaningfulBeatIds: string[]
}

export function buildPhase3PromptBridgeV2(
  input: BuildPhase3PromptBridgeInput,
): Phase3PromptBridgeV2 {
  const finalized = finalizePlayerStyleTags(input.collector)
  const atomIndex = buildPhase3AtomIndex(input.resolverInput)
  const resolvedRevealedFacts = resolveRevealedFacts(finalized.phase3Log.revealedAtoms, atomIndex)

  return {
    caseId: input.caseId,
    structuredLog: finalized.phase3Log,
    resolvedRevealedFacts,
    contestedIssues: deriveContestedIssues({
      disputes: input.disputes,
      lieStatesByDispute: input.lieStatesByDispute,
      misconceptionStatesByDispute: input.misconceptionStatesByDispute,
      structuredLog: finalized.phase3Log,
      resolvedRevealedFacts,
    }),
    disprovedFakeIssueDetails: deriveDisprovedFakeIssueDetails(input.disputes, finalized.phase3Log),
    resolvedLinkDetails: deriveResolvedLinkDetails(input.disputes, finalized.phase3Log),
    finalEmotions: input.finalEmotions,
    lastLinesByParty: input.lastLinesByParty,
    lastMeaningfulBeatIds: input.lastMeaningfulBeatIds,
    keyMoments: extractKeyMoments(finalized.phase3MomentEvents),
  }
}

// ─────────────────────────────────────────
// 9. useActionDispatch / loader 통합 포인트
// ─────────────────────────────────────────

/**
 * 권장 통합 순서
 *
 * handleQuestion():
 * 1. fatigue assessment 계산
 * 2. beatSelectorV2.selectTurnPresentation(...)
 * 3. selectedBeat + selectedAtomIds를 recordRevealedAtomsFromBeat(...)
 * 4. addPlayerStyleHint({
 *      turn,
 *      targetParty,
 *      disputeId,
 *      questionType,
 *      angleTag,
 *      fatigueLevel,
 *      issueRole,
 *      usedEvidence: questionType === 'evidence_present',
 *      hitRedHerring: issueRole === 'red_herring'
 *    })
 * 5. transition / evidence_hit / fatigue lane이면 recordKeyMoment(...)
 *
 * v3GameLoopLoader / unlock 처리:
 * - StateUnlockAtom이 실제로 해금된 시점에 recordRevealedAtomFromUnlock(atomId)
 * - unlock된 layer가 core면 recordCoreLayerUnlock(...)
 *
 * DossierCardPanel onSuccess:
 * - revealAtom이 있으면 recordRevealedAtomFromDossierSuccess(revealAtom)
 *
 * link resolution:
 * - structureV2 linkEdge effect가 발동할 때 recordResolvedLink(linkId)
 *
 * interjection modal:
 * - 허용 시 addPlayerStyleHint({ interjectionChoice: 'allow', ... })
 * - 제지 시 addPlayerStyleHint({ interjectionChoice: 'block', ... })
 *
 * red herring clarification:
 * - misconceptionState가 M4에 진입하면 recordDisprovedFakeIssue(disputeId)
 * - 또는 `*.red_herring_disproved` flag를 감지해 동일하게 기록
 */

// ─────────────────────────────────────────
// 10. thin patch 예시
// ─────────────────────────────────────────

export interface BeatSelectionRuntimeResult {
  beat?: BeatScriptV2 | null
  selectedAtomIds?: string[]
  angleTag?: AngleTag
  fatigueLevel?: FatigueLevel
  issueRole?: string
}

export function applyBeatSelectionToCollector(
  state: Phase3LogCollectorState,
  params: {
    turn: number
    targetParty: PartyId
    disputeId: string
    questionType: QuestionType
    result: BeatSelectionRuntimeResult
  },
): Phase3LogCollectorState {
  let next = state

  if (params.result.beat) {
    next = recordRevealedAtomsFromBeat(next, {
      beat: params.result.beat,
      selectedAtomIds: params.result.selectedAtomIds,
      turn: params.turn,
    })
  }

  next = addPlayerStyleHint(next, {
    turn: params.turn,
    targetParty: params.targetParty,
    disputeId: params.disputeId,
    questionType: params.questionType,
    angleTag: params.result.angleTag,
    fatigueLevel: params.result.fatigueLevel,
    issueRole: params.result.issueRole,
    usedEvidence: params.questionType === 'evidence_present',
    hitRedHerring: params.result.issueRole === 'red_herring',
  })

  return next
}

/**
 * 테스트 시나리오 권장
 *
 * 1) spouse-01 d-3 red_herring 해소
 *    - e-3/e-4 이후 M4 도달
 *    - disprovedFakeIssues = ['d-3']
 *    - resolvedRevealedFacts에 clarify atom 포함
 *    - contestedIssues에서 d-3이 제외되는지 확인
 *
 * 2) family-01 d-1 core unlock
 *    - S3→S4 이후 core layer 최초 해금
 *    - relationCoreRevealed === true
 *    - playerStyleTags에 relation_core_hunter 후보 반영
 *
 * 3) interjection allow/block style tag
 *    - allow 2회 → allows_interjection
 *    - block 2회 → blocks_interjection
 *    - high fatigue 반복 2회 → loops_same_angle
 */
