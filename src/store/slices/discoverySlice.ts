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
  computeCascadeTargets as _computeCascadeTargets,
  checkEmergence as _checkEmergence,
} from '../../engine/discoveryEngine'
import { notifyDisputeEmergence } from '../../engine/readinessEngine'
import { createAppraisal } from '../../engine/evidenceEngine'
import { getSafeEmergenceDescription } from '../../data/safeEmergenceCopy'
import { emitHiddenDisputeEmerged } from '../../telemetry/wirePoints'
import type { UnsafeAny } from '../../types/lint'


const EMPTY_DISCOVERY: DiscoveryState = {
  judgments: {},
  appraisals: {},
  disputeVisibility: {},
  emotionalSlips: [],
  discoveredTruths: [],
  pendingConfrontation: null,
  deferredVerdicts: {},
  pendingConflict: null,
  pendingEmergence: null,
  pendingSlip: null,
}

function getEmotionalSlipKey(slip: EmotionalSlipEvent): string {
  return `${slip.party}:${slip.sourceDisputeId}:${slip.turn}`
}

const surfacedEmotionalSlipKeys = new Set<string>()

export interface DiscoverySlice {
  discovery: DiscoveryState

  // ── 초기화 ──
  initDiscovery: (caseData: UnsafeAny) => void

  // ── 진실 공방 ──
  /** 진실 공방 모달 트리거 */
  setPendingConfrontation: (event: TruthConfrontationEvent | null) => void
  /** 판결을 일시 보류 — pendingConfrontation에서 deferredVerdicts로 이동 */
  deferVerdict: (event: TruthConfrontationEvent) => void
  /** 보류된 판결 복원 — deferredVerdicts에서 빼서 pendingConfrontation으로 */
  restoreDeferredVerdict: (disputeId: string) => TruthConfrontationEvent | null
  /** 보류 항목 정리 (판결 완료 시) */
  clearDeferredVerdict: (disputeId: string) => void
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
  /** 조합 실험실 등에서 파생 쟁점 visibility를 주입 */
  upsertDisputeVisibility: (entry: DisputeVisibilityEntry) => void

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
    surfacedEmotionalSlipKeys.clear()
    set({ discovery: createInitialDiscoveryState(caseData) })
  },

  // ── 진실 공방 ──
  setPendingConfrontation: (event) => {
    set((prev) => ({
      discovery: { ...prev.discovery, pendingConfrontation: event },
    }))
  },

  deferVerdict: (event) => {
    set((prev) => ({
      discovery: {
        ...prev.discovery,
        pendingConfrontation: null,
        deferredVerdicts: { ...prev.discovery.deferredVerdicts, [event.disputeId]: event },
      },
    }))
  },

  restoreDeferredVerdict: (disputeId) => {
    const current = get().discovery.deferredVerdicts[disputeId]
    if (!current) return null
    set((prev) => {
      const next = { ...prev.discovery.deferredVerdicts }
      delete next[disputeId]
      return {
        discovery: {
          ...prev.discovery,
          pendingConfrontation: current,
          deferredVerdicts: next,
        },
      }
    })
    return current
  },

  clearDeferredVerdict: (disputeId) => {
    set((prev) => {
      const next = { ...prev.discovery.deferredVerdicts }
      delete next[disputeId]
      return { discovery: { ...prev.discovery, deferredVerdicts: next } }
    })
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
    // 숨겨진 쟁점 발현 시 보너스 턴 부여 (동기 호출)
    notifyDisputeEmergence()
    // 타임라인 이벤트
    const store = get() as UnsafeAny
    const wasHidden = store.discovery?.disputeVisibility?.[disputeId]?.visibility === 'hidden'
    const safeDescription = getSafeEmergenceDescription(store, disputeId, description)
    store.pushGameEvent?.({
      id: (store.gameEventLog?.length ?? 0) + 1,
      turn,
      type: 'discovery',
      message: `🔍 새로운 쟁점 발견: ${safeDescription}`,
      timestamp: Date.now(),
    })
    set((prev) => {
      const d = { ...prev.discovery }
      const vis = { ...d.disputeVisibility }
      const entry = vis[disputeId]
      if (!entry || entry.visibility !== 'hidden') return prev

      vis[disputeId] = {
        ...entry,
        visibility: 'emerged',
        emergedAtTurn: turn,
        emergedVia: via as UnsafeAny,
        isNew: true,
      }

      return {
        discovery: {
          ...d,
          disputeVisibility: vis,
          pendingEmergence: { disputeId, route: via as UnsafeAny, description: safeDescription },
        },
      }
    })
    if (wasHidden) emitHiddenDisputeEmerged(disputeId, via, store.caseData?.caseId)
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
    const safeEvent = event
      ? {
          ...event,
          description: getSafeEmergenceDescription(get() as UnsafeAny, event.disputeId, event.description),
        }
      : event
    set((prev) => ({
      discovery: { ...prev.discovery, pendingEmergence: safeEvent },
    }))
  },

  upsertDisputeVisibility: (entry) => {
    set((prev) => ({
      discovery: {
        ...prev.discovery,
        disputeVisibility: {
          ...prev.discovery.disputeVisibility,
          [entry.disputeId]: entry,
        },
      },
    }))
  },

  // ── 감정 실수 ──
  addEmotionalSlip: (slip) => {
    set((prev) => ({
      discovery: {
        ...prev.discovery,
        emotionalSlips: prev.discovery.emotionalSlips.some((item) => getEmotionalSlipKey(item) === getEmotionalSlipKey(slip))
          ? prev.discovery.emotionalSlips
          : [...prev.discovery.emotionalSlips, slip],
        pendingSlip: null,
      },
    }))
  },

  setPendingSlip: (slip) => {
    if (slip) {
      const key = getEmotionalSlipKey(slip)
      if (surfacedEmotionalSlipKeys.has(key)) return
      surfacedEmotionalSlipKeys.add(key)
    }
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
