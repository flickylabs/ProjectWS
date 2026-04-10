import type { EvidenceNode, EvidenceCombination } from '../types'
import type { AppraisalVerdict, EvidenceAppraisalEntry, PartialTrustDetail } from '../types/discovery'

export interface EvidenceRuntimeState {
  id: string
  unlocked: boolean
  presented: boolean
  presentedTo: ('a' | 'b')[]
  investigatedActions: string[]
  confidentialSource?: boolean
  /** 심층 조사 완료 여부 — 1회 이상 조사 시 true, surface→real 전환 */
  deepInvestigated?: boolean
}

export function createInitialEvidenceStates(
  evidence: EvidenceNode[],
  baseEvidenceIds?: string[],
): Record<string, EvidenceRuntimeState> {
  const map: Record<string, EvidenceRuntimeState> = {}
  const preferredBaseIds = new Set(baseEvidenceIds ?? [])
  const fallbackBaseIds = preferredBaseIds.size > 0
    ? null
    : new Set(
        evidence
          .filter((item) => item.requires.length === 0 && !item.requiredLieState)
          .slice(0, 3)
          .map((item) => item.id),
      )

  for (const e of evidence) {
    map[e.id] = {
      id: e.id,
      unlocked: preferredBaseIds.size > 0
        ? preferredBaseIds.has(e.id)
        : fallbackBaseIds?.has(e.id) ?? false,
      presented: false,
      presentedTo: [],
      investigatedActions: [],
    }
  }
  return map
}

const LIE_STATE_RANK: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }

/**
 * 잠금 해제 체크 — 원본을 mutate하지 않고 새 객체를 반환
 * @param lieStates - dispute별 최대 lieState 맵 (양 파티 통합). 없으면 lieState 조건 무시.
 */
export function checkUnlocks(
  states: Record<string, EvidenceRuntimeState>,
  evidence: EvidenceNode[],
  lieStates?: Record<string, string>,
): { updated: Record<string, EvidenceRuntimeState>; newlyUnlocked: string[] } {
  const newlyUnlocked: string[] = []
  const updated = { ...states }

  for (const e of evidence) {
    const state = updated[e.id]
    if (!state || state.unlocked) continue
    if (e.requires.length === 0 && !e.requiredLieState) continue

    // 선행 증거 조건
    const allRequirementsMet = e.requires.every((reqId) => {
      const reqState = updated[reqId]
      return reqState && (reqState.presented || reqState.unlocked)
    })
    if (!allRequirementsMet) continue

    // lieState 조건: proves에 연결된 dispute 중 하나라도 필요 상태 이상
    if (e.requiredLieState && lieStates) {
      const reqRank = LIE_STATE_RANK[e.requiredLieState] ?? 0
      const disputeIds = e.proves ?? []
      if (disputeIds.length > 0) {
        const maxDisputeRank = Math.max(
          ...disputeIds.map(dId => LIE_STATE_RANK[lieStates[dId] ?? 'S0'] ?? 0)
        )
        if (maxDisputeRank < reqRank) continue
      }
    }

    updated[e.id] = { ...state, unlocked: true }
    newlyUnlocked.push(e.id)
  }

  return { updated, newlyUnlocked }
}

export function checkCombinations(
  states: Record<string, EvidenceRuntimeState>,
  combinations: EvidenceCombination[],
): EvidenceCombination[] {
  return combinations.filter((combo) =>
    combo.requires.every((id) => states[id]?.presented),
  )
}

export function presentEvidence(
  states: Record<string, EvidenceRuntimeState>,
  evidenceId: string,
  target: 'a' | 'b',
): Record<string, EvidenceRuntimeState> {
  const state = states[evidenceId]
  if (!state || !state.unlocked) return states

  return {
    ...states,
    [evidenceId]: {
      ...state,
      presented: true,
      presentedTo: [...new Set([...state.presentedTo, target])],
    },
  }
}

export function investigateEvidence(
  states: Record<string, EvidenceRuntimeState>,
  evidenceId: string,
  subAction: string,
): Record<string, EvidenceRuntimeState> {
  const state = states[evidenceId]
  if (!state || !state.unlocked) return states

  return {
    ...states,
    [evidenceId]: {
      ...state,
      investigatedActions: [...new Set([...state.investigatedActions, subAction])],
      deepInvestigated: true,
    },
  }
}

// ─────────────────────────────────────────
// 조사 단계별 심문 질문 해금
// ─────────────────────────────────────────

/** 현재 조사 횟수 기반으로 해금된 심문 질문 목록 반환 */
export function getUnlockedQuestions(
  evidence: EvidenceNode,
  state: EvidenceRuntimeState,
): { text: string; attackVector: string; stage: number }[] {
  if (!evidence.investigationStages) return []
  const investigatedCount = state.investigatedActions.length
  return evidence.investigationStages
    .filter(s => s.stage <= investigatedCount)
    .map(s => ({ ...s.question, stage: s.stage }))
}

/** 아직 잠긴 심문 질문 목록 (힌트 표시용) */
export function getLockedQuestions(
  evidence: EvidenceNode,
  state: EvidenceRuntimeState,
): { stage: number; hint: string }[] {
  if (!evidence.investigationStages) return []
  const investigatedCount = state.investigatedActions.length
  return evidence.investigationStages
    .filter(s => s.stage > investigatedCount)
    .map(s => ({ stage: s.stage, hint: `조사를 ${s.stage - investigatedCount}회 더 진행하면 새로운 질문이 열립니다` }))
}

// ─────────────────────────────────────────
// 증거 감별 (Evidence Appraisal)
// ─────────────────────────────────────────

/** 감별에 필요한 최소 조사 횟수 */
const MIN_INVESTIGATIONS_FOR_APPRAISAL = 2

/** 증거를 감별할 수 있는 상태인지 */
export function canAppraise(
  state: EvidenceRuntimeState,
): boolean {
  return state.unlocked && state.investigatedActions.length >= MIN_INVESTIGATIONS_FOR_APPRAISAL
}

/** 감별 결과 생성 */
export function createAppraisal(
  evidenceId: string,
  verdict: AppraisalVerdict,
  partialDetails: PartialTrustDetail[],
  turn: number,
): EvidenceAppraisalEntry {
  return {
    evidenceId,
    verdict,
    partialDetails: verdict === 'partial' ? partialDetails : [],
    turnAppraised: turn,
    wasCorrect: null,  // 게임 종료 시 채점
  }
}

// ─────────────────────────────────────────
// 증거 표면화 (Evidence Surfacing)
// ─────────────────────────────────────────

export interface SurfaceResult {
  /** 표면화된 증거 IDs (최대 4: base 3 + contextual 1) */
  surfacedIds: string[]
  /** 잠김 상태로 보이는 증거 IDs (해금되었지만 표면화 안 됨) */
  dimmedIds: string[]
  /** 보강 슬롯이 열린 증거 (key: 메인 증거 ID, value: 보강 증거 ID[]) */
  reinforcements: Record<string, string[]>
}

/**
 * 표면화 증거 선별 — 기본 3장 + 현재 쟁점 관련 1장
 * @param evidenceStates 현재 증거 런타임 상태
 * @param evidence 전체 증거 노드 배열
 * @param currentDisputeId 현재 집중 쟁점 (있으면 관련 증거 1장 추가)
 * @param baseEvidenceIds 기본 3장 고정 증거 IDs (사건 데이터에서 제공)
 */
export function computeSurfacedEvidence(
  evidenceStates: Record<string, EvidenceRuntimeState>,
  evidence: EvidenceNode[],
  currentDisputeId: string | null,
  baseEvidenceIds: string[],
): SurfaceResult {
  const surfacedIds: string[] = []
  const dimmedIds: string[] = []
  const reinforcements: Record<string, string[]> = {}

  // 1. 기본 3장: 해금 여부와 무관하게 항상 표면
  for (const id of baseEvidenceIds.slice(0, 3)) {
    if (evidenceStates[id]?.unlocked) {
      surfacedIds.push(id)
    }
  }

  // 2. 현재 쟁점 관련 1장: proves에 currentDisputeId가 포함된 해금된 증거 중
  //    아직 surfaced가 아닌 첫 번째
  if (currentDisputeId) {
    const contextual = evidence.find(e =>
      !surfacedIds.includes(e.id) &&
      evidenceStates[e.id]?.unlocked &&
      e.proves?.includes(currentDisputeId)
    )
    if (contextual) surfacedIds.push(contextual.id)
  }

  // 3. 나머지 해금된 증거는 dimmed
  for (const e of evidence) {
    if (!surfacedIds.includes(e.id) && evidenceStates[e.id]?.unlocked) {
      dimmedIds.push(e.id)
    }
  }

  // 4. 보강 슬롯: surfaced 증거에 대해, 같은 proves를 가진 dimmed 증거를 보강으로 연결
  for (const sid of surfacedIds) {
    const surfNode = evidence.find(e => e.id === sid)
    if (!surfNode?.proves) continue
    const reinforcing = dimmedIds.filter(did => {
      const dNode = evidence.find(e => e.id === did)
      return dNode?.proves?.some(p => surfNode.proves!.includes(p))
    })
    if (reinforcing.length > 0) {
      reinforcements[sid] = reinforcing
    }
  }

  return { surfacedIds, dimmedIds, reinforcements }
}

/** 부분 신뢰 시 신뢰하는 조사 항목만 추출 */
export function getTrustedInvestigationResults(
  evidence: EvidenceNode,
  appraisal: EvidenceAppraisalEntry | undefined,
): Record<string, string> {
  if (!appraisal || appraisal.verdict !== 'partial') {
    return evidence.investigationResults
  }

  const trusted: Record<string, string> = {}
  for (const detail of appraisal.partialDetails) {
    if (detail.trusted && evidence.investigationResults[detail.subAction]) {
      trusted[detail.subAction] = evidence.investigationResults[detail.subAction]
    }
  }
  return trusted
}
