import type { EvidenceNode, EvidenceCombination } from '../types'
import type { AppraisalVerdict, EvidenceAppraisalEntry, PartialTrustDetail } from '../types/discovery'

export interface EvidenceRuntimeState {
  id: string
  unlocked: boolean
  presented: boolean
  presentedTo: ('a' | 'b')[]
  investigatedActions: string[]
  confidentialSource?: boolean
}

export function createInitialEvidenceStates(
  evidence: EvidenceNode[],
): Record<string, EvidenceRuntimeState> {
  const map: Record<string, EvidenceRuntimeState> = {}
  for (const e of evidence) {
    map[e.id] = {
      id: e.id,
      unlocked: e.requires.length === 0,
      presented: false,
      presentedTo: [],
      investigatedActions: [],
    }
  }
  return map
}

/** 잠금 해제 체크 — 원본을 mutate하지 않고 새 객체를 반환 */
export function checkUnlocks(
  states: Record<string, EvidenceRuntimeState>,
  evidence: EvidenceNode[],
): { updated: Record<string, EvidenceRuntimeState>; newlyUnlocked: string[] } {
  const newlyUnlocked: string[] = []
  const updated = { ...states }

  for (const e of evidence) {
    const state = updated[e.id]
    if (!state || state.unlocked) continue

    const allRequirementsMet = e.requires.every((reqId) => {
      const reqState = updated[reqId]
      return reqState && (reqState.presented || reqState.unlocked)
    })

    if (allRequirementsMet) {
      updated[e.id] = { ...state, unlocked: true }
      newlyUnlocked.push(e.id)
    }
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
    },
  }
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
