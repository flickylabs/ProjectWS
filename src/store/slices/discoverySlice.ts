import type { StateCreator } from 'zustand'
import type {
  DiscoveryState,
  TruthJudgment,
  PlayerJudgmentEntry,
  TruthConfrontationEvent,
  JudgmentConflictEvent,
  AppraisalVerdict,
  EvidenceAppraisalEntry,
  PartialTrustDetail,
  DisputeVisibilityEntry,
  EmotionalSlipEvent,
} from '../../types/discovery'
import type { PartyId } from '../../types'
import {
  createInitialDiscoveryState,
  computeCascadeTargets,
  checkEmergence,
} from '../../engine/discoveryEngine'
import { createAppraisal } from '../../engine/evidenceEngine'

const EMPTY_DISCOVERY: DiscoveryState = {
  judgments: {},
  appraisals: {},
  disputeVisibility: {},
  emotionalSlips: [],
  discoveredTruths: [],
  pendingConfrontation: null,
  pendingConflict: null,
  pendingEmergence: null,
  pendingSlip: null,
}

export interface DiscoverySlice {
  discovery: DiscoveryState

  // ── 초기화 ──
  initDiscovery: (caseData: any) => void

  // ── 진실 공방 ──
  /** 진실 공방 모달 트리거 */
  setPendingConfrontation: (event: TruthConfrontationEvent | null) => void
  /** 판단 기록 */
  submitJudgment: (disputeId: string, judgment: TruthJudgment, turn: number) => void
  /** 판단 수정 */
  reviseJudgment: (disputeId: string, newJudgment: TruthJudgment, turn: number) => void
  /** 판단 충돌 이벤트 */
  setPendingConflict: (event: JudgmentConflictEvent | null) => void

  // ── 증거 감별 ──
  submitAppraisal: (evidenceId: string, verdict: AppraisalVerdict, partialDetails: PartialTrustDetail[], turn: number) => void

  // ── 숨겨진 쟁점 ──
  /** 쟁점 발현 */
  emergeDispute: (disputeId: string, via: string, turn: number, description: string) => void
  /** 발현 알림 확인 (N 뱃지 제거) */
  acknowledgeEmergence: (disputeId: string) => void
  /** 쟁점 비활성화 */
  deactivateDispute: (disputeId: string) => void
  /** 발현 대기 이벤트 설정 */
  setPendingEmergence: (event: DiscoveryState['pendingEmergence']) => void

  // ── 감정 실수 ──
  addEmotionalSlip: (slip: EmotionalSlipEvent) => void
  setPendingSlip: (slip: EmotionalSlipEvent | null) => void

  // ── 진실 발견 ──
  addDiscoveredTruth: (truthId: string) => void

  // ── 조회 ──
  getJudgment: (disputeId: string) => PlayerJudgmentEntry | undefined
  getAppraisal: (evidenceId: string) => EvidenceAppraisalEntry | undefined
  getDisputeVisibility: (disputeId: string) => DisputeVisibilityEntry | undefined
  getVisibleDisputesForParty: (party: PartyId) => DisputeVisibilityEntry[]
}

export const createDiscoverySlice: StateCreator<DiscoverySlice, [], [], DiscoverySlice> = (set, get) => ({
  discovery: { ...EMPTY_DISCOVERY },

  // ── 초기화 ──
  initDiscovery: (caseData) => {
    set({ discovery: createInitialDiscoveryState(caseData) })
  },

  // ── 진실 공방 ──
  setPendingConfrontation: (event) => {
    set((prev) => ({
      discovery: { ...prev.discovery, pendingConfrontation: event },
    }))
  },

  submitJudgment: (disputeId, judgment, turn) => {
    set((prev) => {
      const d = { ...prev.discovery }
      const judgments = { ...d.judgments }

      // 연쇄 추론 대상은 store 루트에서 caseData 접근이 필요하므로
      // 여기서는 빈 배열로 초기화, 통합 레이어에서 채움
      judgments[disputeId] = {
        disputeId,
        judgment,
        turnMade: turn,
        revisions: [],
        cascadeTargets: [],
      }

      return { discovery: { ...d, judgments, pendingConfrontation: null } }
    })
  },

  reviseJudgment: (disputeId, newJudgment, turn) => {
    set((prev) => {
      const d = { ...prev.discovery }
      const judgments = { ...d.judgments }
      const existing = judgments[disputeId]
      if (!existing) return prev

      judgments[disputeId] = {
        ...existing,
        judgment: newJudgment,
        revisions: [
          ...existing.revisions,
          { from: existing.judgment, to: newJudgment, turn },
        ],
      }

      return { discovery: { ...d, judgments, pendingConflict: null } }
    })
  },

  setPendingConflict: (event) => {
    set((prev) => ({
      discovery: { ...prev.discovery, pendingConflict: event },
    }))
  },

  // ── 증거 감별 ──
  submitAppraisal: (evidenceId, verdict, partialDetails, turn) => {
    set((prev) => {
      const d = { ...prev.discovery }
      const appraisals = { ...d.appraisals }
      appraisals[evidenceId] = createAppraisal(evidenceId, verdict, partialDetails, turn)
      return { discovery: { ...d, appraisals } }
    })
  },

  // ── 숨겨진 쟁점 ──
  emergeDispute: (disputeId, via, turn, description) => {
    set((prev) => {
      const d = { ...prev.discovery }
      const vis = { ...d.disputeVisibility }
      const entry = vis[disputeId]
      if (!entry || entry.visibility !== 'hidden') return prev

      vis[disputeId] = {
        ...entry,
        visibility: 'emerged',
        emergedAtTurn: turn,
        emergedVia: via as any,
        isNew: true,
      }

      return {
        discovery: {
          ...d,
          disputeVisibility: vis,
          pendingEmergence: { disputeId, route: via as any, description },
        },
      }
    })
  },

  acknowledgeEmergence: (disputeId) => {
    set((prev) => {
      const d = { ...prev.discovery }
      const vis = { ...d.disputeVisibility }
      const entry = vis[disputeId]
      if (!entry) return prev

      vis[disputeId] = { ...entry, isNew: false }
      return {
        discovery: { ...d, disputeVisibility: vis, pendingEmergence: null },
      }
    })
  },

  deactivateDispute: (disputeId) => {
    set((prev) => {
      const d = { ...prev.discovery }
      const vis = { ...d.disputeVisibility }
      const entry = vis[disputeId]
      if (!entry) return prev

      vis[disputeId] = { ...entry, visibility: 'inactive' }
      return { discovery: { ...d, disputeVisibility: vis } }
    })
  },

  setPendingEmergence: (event) => {
    set((prev) => ({
      discovery: { ...prev.discovery, pendingEmergence: event },
    }))
  },

  // ── 감정 실수 ──
  addEmotionalSlip: (slip) => {
    set((prev) => ({
      discovery: {
        ...prev.discovery,
        emotionalSlips: [...prev.discovery.emotionalSlips, slip],
        pendingSlip: null,
      },
    }))
  },

  setPendingSlip: (slip) => {
    set((prev) => ({
      discovery: { ...prev.discovery, pendingSlip: slip },
    }))
  },

  // ── 진실 발견 ──
  addDiscoveredTruth: (truthId) => {
    set((prev) => {
      const d = prev.discovery
      if (d.discoveredTruths.includes(truthId)) return prev
      return {
        discovery: {
          ...d,
          discoveredTruths: [...d.discoveredTruths, truthId],
        },
      }
    })
  },

  // ── 조회 ──
  getJudgment: (disputeId) => get().discovery.judgments[disputeId],
  getAppraisal: (evidenceId) => get().discovery.appraisals[evidenceId],
  getDisputeVisibility: (disputeId) => get().discovery.disputeVisibility[disputeId],

  getVisibleDisputesForParty: (party) => {
    const vis = get().discovery.disputeVisibility
    return Object.values(vis).filter((entry) => {
      if (entry.visibility === 'hidden') return false
      return entry.relevantParties.includes(party)
    })
  },
})
