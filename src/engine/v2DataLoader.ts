/**
 * V2 데이터 로더 — BeatScript V2 + Structure V2
 * ─────────────────────────────────
 * BeatScript V2 풀셋과 Structure V2(쟁점 확장/증거 타이밍)를
 * 런타임에 등록하고 조회하는 모듈.
 *
 * beatSelectorV2와 questionFatigueEngine이 이 로더에서 데이터를 가져간다.
 */

import type { TransitionBeat, PartyId } from '../types'
import type { LieState } from '../types'
import type { BeatScriptV2, IssueLayer, IssueRole, MisconceptionState } from '../types'
import type { DisputeV2, DisputeLinkEdge, DisputeDepthLayer } from '../types'
import type { EvidenceNodeV2, EvidenceTimingMetadata } from '../types'
import type { BeatLibraryV2 } from './beatSelectorV2'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 데이터 구조
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface StructureV2Data {
  caseId: string
  disputes: DisputeV2[]
  evidence: EvidenceNodeV2[]
  freeQuestionHooks?: FreeQuestionHook[]
  phase3LogHints?: Phase3LogHints
}

export interface FreeQuestionHook {
  id: string
  intentTag: string
  description: string
  allowedAtStates: (LieState | MisconceptionState)[]
  allowedIssueRoles: IssueRole[]
  answerEnvelope: {
    disputeId: string
    allowAtomIds?: string[]
    forbidAtomIds?: string[]
    preferredAngleTags?: string[]
  }
  refusalTemplates: string[]
}

export interface Phase3LogHints {
  relationCoreDisputes: string[]
  playerStyleTagCandidates: string[]
}

export interface BeatsV2Data {
  caseId: string
  schemaVersion: string
  beats: BeatScriptV2[]
  coverageSummary?: Record<string, unknown>
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 저장소
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const structureRegistry: Map<string, StructureV2Data> = new Map()
const beatsRegistry: Map<string, BeatsV2Data> = new Map()

/** 런타임 상태: 사용된 beat ID, antiRepeat 그룹, 사용 횟수, 쿨다운 */
const beatRuntimeState: Map<string, {
  usedBeatIds: Set<string>
  usedAntiRepeatGroups: Set<string>
  beatUseCounts: Record<string, number>
  cooldownUntilTurn: Record<string, number>
  flags: Set<string>
}> = new Map()

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 등록/초기화
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function registerStructureV2(data: StructureV2Data): void {
  structureRegistry.set(data.caseId, data)

  // misconception 쟁점 자동 등록 (동적 import로 순환 참조 방지)
  import('./misconceptionEngine').then(({ registerMisconceptionDispute }) => {
  for (const dispute of data.disputes) {
    if (dispute.misconception && (dispute.disputeKind === 'red_herring' || dispute.disputeKind === 'shared_misconception')) {
      registerMisconceptionDispute(dispute.id, dispute.misconception)
    }
  }
  }).catch(() => { /* misconceptionEngine 미사용 환경에서는 무시 */ })
}

export function registerBeatsV2(data: BeatsV2Data): void {
  beatsRegistry.set(data.caseId, data)
  beatRuntimeState.set(data.caseId, {
    usedBeatIds: new Set(),
    usedAntiRepeatGroups: new Set(),
    beatUseCounts: {},
    cooldownUntilTurn: {},
    flags: new Set(),
  })
}

export function resetV2State(caseId: string): void {
  const state = beatRuntimeState.get(caseId)
  if (state) {
    state.usedBeatIds.clear()
    state.usedAntiRepeatGroups.clear()
    state.beatUseCounts = {}
    state.cooldownUntilTurn = {}
    state.flags.clear()
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 조회 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** BeatSelector용 라이브러리 반환 */
export function getBeatLibrary(caseId: string): BeatLibraryV2 | null {
  const beats = beatsRegistry.get(caseId)
  if (!beats) return null

  // transitionBeats는 기존 v3GameLoopLoader에서 가져옴
  // 여기서는 beats만 제공하고 transition은 외부에서 합성
  return {
    beats: beats.beats,
    transitionBeats: [], // 외부에서 v3GameLoopLoader의 transitionBeats와 합성
  }
}

/** 런타임 상태 조회 */
export function getBeatRuntimeState(caseId: string) {
  const state = beatRuntimeState.get(caseId)
  if (!state) {
    return {
      usedBeatIds: [] as string[],
      usedAntiRepeatGroups: [] as string[],
      beatUseCounts: {} as Record<string, number>,
      cooldownUntilTurn: {} as Record<string, number>,
      flags: new Set<string>(),
    }
  }
  return {
    usedBeatIds: [...state.usedBeatIds],
    usedAntiRepeatGroups: [...state.usedAntiRepeatGroups],
    beatUseCounts: state.beatUseCounts,
    cooldownUntilTurn: state.cooldownUntilTurn,
    flags: state.flags,
  }
}

/** beat 사용 기록 (선택 후 호출) */
export function recordBeatUsed(caseId: string, beat: BeatScriptV2, currentTurn: number): void {
  const state = beatRuntimeState.get(caseId)
  if (!state) return

  state.usedBeatIds.add(beat.id)
  state.beatUseCounts[beat.id] = (state.beatUseCounts[beat.id] ?? 0) + 1

  if (beat.cooldownTurns) {
    state.cooldownUntilTurn[beat.id] = currentTurn + beat.cooldownTurns
  }

  if (beat.antiRepeatGroup) {
    state.usedAntiRepeatGroups.add(beat.antiRepeatGroup)
  }

  if (beat.setFlags) {
    for (const flag of beat.setFlags) state.flags.add(flag)
  }
  if (beat.clearFlags) {
    for (const flag of beat.clearFlags) state.flags.delete(flag)
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Structure V2 조회
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 쟁점의 V2 확장 정보 */
export function getDisputeV2(caseId: string, disputeId: string): DisputeV2 | null {
  const structure = structureRegistry.get(caseId)
  if (!structure) return null
  return structure.disputes.find(d => d.id === disputeId) ?? null
}

/** 쟁점의 현재 활성 층 판정 */
export function getActiveLayer(
  caseId: string,
  disputeId: string,
  lieState: LieState,
  flags: Set<string>,
  resolvedEvidenceIds: Set<string>,
): IssueLayer {
  const dispute = getDisputeV2(caseId, disputeId)
  if (!dispute?.depthLayers) return 'surface'

  const STATE_RANK: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5, M0: 0, M1: 1, M2: 2, M3: 3, M4: 4 }

  // 가장 깊은 해금된 층 찾기 (역순)
  const layers = dispute.depthLayers
  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i]
    if (!layer.unlockCondition) continue // 조건 없으면 항상 열림

    const cond = layer.unlockCondition
    let met = true

    if (cond.requireDisputes) {
      for (const req of cond.requireDisputes) {
        const reqRank = STATE_RANK[lieState] ?? 0
        const minRank = STATE_RANK[req.minState] ?? 0
        if (req.id === disputeId && reqRank < minRank) met = false
      }
    }

    if (cond.requireFlags) {
      for (const flag of cond.requireFlags) {
        if (!flags.has(flag)) met = false
      }
    }

    if (cond.requireEvidenceIds) {
      for (const eid of cond.requireEvidenceIds) {
        if (!resolvedEvidenceIds.has(eid)) met = false
      }
    }

    if (met) return layer.id
  }

  return 'surface'
}

/** 쟁점의 역할 (core_truth / sub_truth / red_herring / shared_misconception) */
export function getDisputeRole(caseId: string, disputeId: string): IssueRole {
  const dispute = getDisputeV2(caseId, disputeId)
  return dispute?.disputeKind ?? 'core_truth'
}

/** 증거 타이밍 메타 조회 */
export function getEvidenceTimingMeta(caseId: string, evidenceId: string): EvidenceTimingMetadata | undefined {
  const structure = structureRegistry.get(caseId)
  if (!structure) return undefined
  const ev = structure.evidence.find(e => e.id === evidenceId) as EvidenceNodeV2 | undefined
  return ev?.timing
}

/** 모든 링크 엣지 조회 (사건 레벨 flatten) */
export function getAllLinkEdges(caseId: string): DisputeLinkEdge[] {
  const structure = structureRegistry.get(caseId)
  if (!structure) return []
  return structure.disputes.flatMap(d => d.linkEdges ?? [])
}

/** Structure V2 전체 조회 */
export function getStructureV2(caseId: string): StructureV2Data | null {
  return structureRegistry.get(caseId) ?? null
}

/** Structure V2만 있으면 V2 메커닉 활성화 (하이브리드 모드) */
export function hasStructureV2(caseId: string): boolean {
  return structureRegistry.has(caseId)
}

/** V2 beat까지 있으면 스크립트 모드 (V3 점진 적용용) */
export function hasV2Data(caseId: string): boolean {
  return beatsRegistry.has(caseId) && structureRegistry.has(caseId)
}
