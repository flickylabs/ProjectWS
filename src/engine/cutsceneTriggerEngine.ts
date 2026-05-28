/**
 * Cutscene Trigger Engine — 게임 상태 변화에서 컷씬 트리거 판정
 * ─────────────────────────────────
 * shouldTriggerCutscene()으로 이벤트 유형과 데이터를 전달하면
 * CutsceneEvent | null을 반환.
 *
 * 쿨다운/빈도는 vfxHierarchyEngine에서 중앙 관리한다.
 */

import { resetVfxHierarchyState, shouldPlayCutscene } from './vfxHierarchyEngine'

export interface CutsceneEvent {
  type:
    | 'lie_collapse'
    | 'contradiction_hit'
    | 'emotional_burst'
    | 'dispute_emergence'
    | 'evidence_dispute_dual_emergence' // evidence + dispute 동시 등장 컷씬 (2026-05-25)
    | 'phase_transition'
    | 'verdict_gavel'
    | 'truth_reveal_trust'   // 신뢰 자백 (lieState S5 자연 도달)
    | 'truth_reveal_slip'    // 감정 슬립 (격앙 + verbalTell 누설)
    | 'truth_reveal_witness' // 증인 경로 (witness breakthrough)
  data?: {
    partyName?: string
    disputeName?: string
    statement1?: string // 모순 좌측
    statement2?: string // 모순 우측
    phase?: string
    score?: number
    text?: string // 폭발 대사
    caseId?: string
    // ── truth-reveal payload ──
    disputeId?: string
    partyId?: 'a' | 'b'
    route?: 'trust' | 'emotion' | 'witness' // witness breakthrough route
    linkedDisputeId?: string               // slip cascade target
    lieStateBefore?: string
    lieStateAfter?: string
    witnessId?: string
    witnessName?: string
    witnessQuote?: string
    // ── dual emergence payload (evidence + dispute 동시) ──
    evidenceId?: string
    evidenceName?: string
  }
}

/** 유형별 자동 dismiss 시간 (ms) */
export const CUTSCENE_DURATION: Record<CutsceneEvent['type'], number> = {
  lie_collapse: 2500,
  contradiction_hit: 3000,
  emotional_burst: 2000,
  dispute_emergence: 2000,
  /** evidence + dispute 동시 등장 — 레터박스(0.4s) + evidence 카드 소극(1.4s) + dispute 카드 소극(1.4s) + 카메라 closure(0.8s) */
  evidence_dispute_dual_emergence: 4000,
  phase_transition: 2000,
  verdict_gavel: 3000,
  truth_reveal_trust: 13000,    // wide → focus(0.7s) + typing + closure
  truth_reveal_slip: 16000,     // 3단계 (explosive 1.6s + dismay 1.4s + confession typing) + closure
  truth_reveal_witness: 14000,  // focus-witness 1.8s + wide 0.6s + focus-character + typing
}

/** 쿨다운 초기화 (새 사건 시작 시 호출) */
export function resetCutsceneCooldowns(): void {
  resetVfxHierarchyState()
}

// ── 트리거 판정 ──────────────────────────────────────

/**
 * 게임 이벤트에서 컷씬 트리거 여부를 판정한다.
 *
 * @param eventType 게임 이벤트 유형 문자열
 * @param currentTurn 현재 턴 (쿨다운 판정용)
 * @param data 이벤트 부가 데이터
 * @returns 트리거할 CutsceneEvent 또는 null
 */
export function shouldTriggerCutscene(
  eventType: string,
  currentTurn: number,
  data?: Record<string, unknown>,
): CutsceneEvent | null {
  let result: CutsceneEvent | null = null

  switch (eventType) {
    // S5 전이 시
    case 'lie_collapse': {
      const type = 'lie_collapse' as const
      if (!shouldPlayCutscene(type, { turn: currentTurn, caseId: data?.caseId as string | undefined, phase: data?.phase as string | undefined })) return null
      result = {
        type,
        data: {
          partyName: data?.partyName as string | undefined,
          disputeName: data?.disputeName as string | undefined,
        },
      }
      break
    }

    // 모순 지적 성공 시
    case 'contradiction_hit': {
      const type = 'contradiction_hit' as const
      if (!shouldPlayCutscene(type, { turn: currentTurn, caseId: data?.caseId as string | undefined, phase: data?.phase as string | undefined })) return null
      result = {
        type,
        data: {
          statement1: data?.statement1 as string | undefined,
          statement2: data?.statement2 as string | undefined,
          partyName: data?.partyName as string | undefined,
        },
      }
      break
    }

    // 감정 폭발 이벤트 시
    case 'emotional_burst': {
      const type = 'emotional_burst' as const
      if (!shouldPlayCutscene(type, { turn: currentTurn, caseId: data?.caseId as string | undefined, phase: data?.phase as string | undefined })) return null
      result = {
        type,
        data: {
          text: data?.text as string | undefined,
          partyName: data?.partyName as string | undefined,
        },
      }
      break
    }

    // 새 쟁점 발현 시
    case 'dispute_emergence': {
      const type = 'dispute_emergence' as const
      if (!shouldPlayCutscene(type, { turn: currentTurn, caseId: data?.caseId as string | undefined, phase: data?.phase as string | undefined })) return null
      result = {
        type,
        data: {
          disputeName: data?.disputeName as string | undefined,
        },
      }
      break
    }

    // 새 evidence 등재 — 시각 표현은 evidence_result popup(EventFeedbackCard)으로 통일.
    // (별도 DOM overlay cutscene 미사용 — 2026-05-28 popup 통일 정책)

    // evidence + dispute 동시 등장 (예: spouse-01 e-10 책 본체 + d-3 내연녀 임신 의심)
    case 'evidence_dispute_dual_emergence': {
      const type = 'evidence_dispute_dual_emergence' as const
      if (!shouldPlayCutscene(type, { turn: currentTurn, caseId: data?.caseId as string | undefined, phase: data?.phase as string | undefined })) return null
      result = {
        type,
        data: {
          evidenceId: data?.evidenceId as string | undefined,
          evidenceName: data?.evidenceName as string | undefined,
          disputeId: data?.disputeId as string | undefined,
          disputeName: data?.disputeName as string | undefined,
          caseId: data?.caseId as string | undefined,
        },
      }
      break
    }

    // Phase 전환 시
    case 'phase_transition': {
      const type = 'phase_transition' as const
      if (!shouldPlayCutscene(type, { turn: currentTurn, caseId: data?.caseId as string | undefined, phase: data?.phase as string | undefined })) return null
      result = {
        type,
        data: {
          phase: data?.phase as string | undefined,
        },
      }
      break
    }

    // 신뢰 자백 / 감정 슬립 / 증인 경로 — 진실 발견 3 경로
    case 'truth_reveal_trust':
    case 'truth_reveal_slip':
    case 'truth_reveal_witness': {
      const type = eventType as 'truth_reveal_trust' | 'truth_reveal_slip' | 'truth_reveal_witness'
      if (!shouldPlayCutscene(type, { turn: currentTurn, caseId: data?.caseId as string | undefined, phase: data?.phase as string | undefined })) return null
      result = {
        type,
        data: {
          caseId: data?.caseId as string | undefined,
          disputeId: data?.disputeId as string | undefined,
          disputeName: data?.disputeName as string | undefined,
          partyId: data?.partyId as 'a' | 'b' | undefined,
          partyName: data?.partyName as string | undefined,
          route: data?.route as 'trust' | 'emotion' | 'witness' | undefined,
          linkedDisputeId: data?.linkedDisputeId as string | undefined,
          lieStateBefore: data?.lieStateBefore as string | undefined,
          lieStateAfter: data?.lieStateAfter as string | undefined,
          witnessId: data?.witnessId as string | undefined,
          witnessName: data?.witnessName as string | undefined,
          witnessQuote: data?.witnessQuote as string | undefined,
        },
      }
      break
    }

    // 최종 판결 시
    case 'verdict_gavel': {
      const type = 'verdict_gavel' as const
      if (!shouldPlayCutscene(type, { turn: currentTurn, caseId: data?.caseId as string | undefined, phase: data?.phase as string | undefined })) return null
      result = {
        type,
        data: {
          score: data?.score as number | undefined,
        },
      }
      break
    }

    default:
      return null
  }

  return result
}
