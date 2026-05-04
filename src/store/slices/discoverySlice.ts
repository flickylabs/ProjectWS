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
import { notifyDisputeEmergence } from '../../engine/readinessEngine'
import { createAppraisal } from '../../engine/evidenceEngine'

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

const SAFE_EMERGENCE_DESCRIPTIONS: Record<string, Record<string, string>> = {
  'family-01': {
    'd-1': '어머니의 판단 능력과 유서 작성 과정이 별도로 확인할 쟁점으로 떠올랐습니다.',
    'd-2': '공증된 유서가 완성된 시점과 당시 어머니 상태 사이에 확인할 대목이 생겼습니다.',
    'd-3': '어머니 통장을 거친 오래된 자금 흐름에서 출처와 전달 순서를 확인해야 합니다.',
    'd-4': '가족 기록 속 민감한 사정이 형제의 침묵과 선택에 영향을 줬을 가능성이 보입니다.',
    'd-5': '두 형제가 어머니 뜻을 서로 다르게 해석한 대목을 함께 정리해야 합니다.',
  },
  'spouse-01': {
    'd-2': '남편 명의의 비밀 계좌가 존재했고, 목돈이 빠져나간 것으로 보입니다.',
    'h-d3': '오피스텔 방문 이후의 연락과 사람 관계를 별도로 확인해야 합니다.',
    'h-d4': '돈의 이동과 오피스텔 방문 사이에 함께 검토할 정황이 생겼습니다.',
  },
}

function normalizeCaseId(caseId?: string): string {
  return String(caseId ?? '').replace(/^case-/, '')
}

function getSafeEmergenceDescription(storeOrCaseId: any, disputeId: string, fallback: string): string {
  const caseId = typeof storeOrCaseId === 'string'
    ? normalizeCaseId(storeOrCaseId)
    : normalizeCaseId(storeOrCaseId?.caseData?.caseId)
  return SAFE_EMERGENCE_DESCRIPTIONS[caseId]?.[disputeId] ?? fallback
}

export interface DiscoverySlice {
  discovery: DiscoveryState

  // ── 초기화 ──
  initDiscovery: (caseData: any) => void

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
    const store = get() as any
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
        emergedVia: via as any,
        isNew: true,
      }

      return {
        discovery: {
          ...d,
          disputeVisibility: vis,
          pendingEmergence: { disputeId, route: via as any, description: safeDescription },
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
    const safeEvent = event
      ? {
          ...event,
          description: getSafeEmergenceDescription(get() as any, event.disputeId, event.description),
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
