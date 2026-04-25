import type { StateCreator } from 'zustand'
import type { PartyId } from '../../types'

/**
 * Judge Observation Slice
 * ───────────────────────
 * "재판관의 관찰" — 휘발성 얼럿 대신 좌측 패널에 상설 기록되는 영역.
 * Tier 2(토스트 대체) + Tier 3(Modal 결과 기록) + Tier 1(컷씬 후 수렴) 모두 수렴.
 *
 * 인프라 역할만 담당. 어떤 이벤트가 들어올지는 호출부(useActionDispatch,
 * DiscoveryFeedbackWatcher 등)에서 결정.
 */

export type JudgeObservationCategory =
  | 'archetype'      // archetype 관찰
  | 'state'          // 거짓말 단계 변화
  | 'contradiction'  // 모순 / 끼어들기
  | 'slip'           // 감정 누설 / 폭발
  | 'evidence'       // 증거 제시 결과
  | 'event'          // 전이 선택 / 퍼크 / 증인 / 진실 공방 결과 등

export interface JudgeObservation {
  id: string
  createdAt: number
  turnCount: number
  category: JudgeObservationCategory
  /** PCSvgIcon id. 미지정 시 category 기본값 */
  iconId?: string
  /** 한 줄 제목 */
  title: string
  /** 보조 설명 (한 줄, 없으면 title만 표시) */
  summary?: string
  party?: PartyId
  archetype?: string
  disputeId?: string
  evidenceId?: string
  /** S3에서 채팅 jump 타겟 — dialogueLog entry id (string) */
  linkedDialogueId?: string
  read: boolean
}

/** 공명선(번개) 발사 요청 */
export interface ResonanceRequest {
  id: string
  fromSelector: string
  toSelector: string
  createdAt: number
}

/** 요소 주변 전기 테두리(aura) 요청 */
export interface AuraRequest {
  id: string
  targetSelector: string
  createdAt: number
}

export interface JudgeObservationSlice {
  judgeObservations: JudgeObservation[]
  observationHistoryOpen: boolean
  /** 새 관찰 등록. 반환값은 생성된 id */
  addJudgeObservation: (item: Omit<JudgeObservation, 'id' | 'createdAt' | 'read'>) => string
  markObservationRead: (id: string) => void
  markAllObservationsRead: () => void
  setObservationHistoryOpen: (open: boolean) => void
  clearJudgeObservations: () => void
  /** 공명선 큐 */
  pendingResonances: ResonanceRequest[]
  enqueueResonance: (req: Omit<ResonanceRequest, 'id' | 'createdAt'>) => string
  dismissResonance: (id: string) => void
  /** 전기 테두리 큐 */
  pendingAuras: AuraRequest[]
  enqueueAura: (req: Omit<AuraRequest, 'id' | 'createdAt'>) => string
  dismissAura: (id: string) => void
}

let obsIdCounter = 0
function nextObsId(): string {
  obsIdCounter += 1
  return `obs-${Date.now().toString(36)}-${obsIdCounter.toString(36)}`
}

let resonanceIdCounter = 0
function nextResonanceId(): string {
  resonanceIdCounter += 1
  return `res-${Date.now().toString(36)}-${resonanceIdCounter.toString(36)}`
}
let auraIdCounter = 0
function nextAuraId(): string {
  auraIdCounter += 1
  return `aura-${Date.now().toString(36)}-${auraIdCounter.toString(36)}`
}

export const createJudgeObservationSlice: StateCreator<JudgeObservationSlice, [], [], JudgeObservationSlice> = (set) => ({
  judgeObservations: [],
  observationHistoryOpen: false,
  pendingResonances: [],
  pendingAuras: [],

  addJudgeObservation: (item) => {
    const id = nextObsId()
    const entry: JudgeObservation = {
      ...item,
      id,
      createdAt: Date.now(),
      read: false,
    }
    set((state) => {
      // [결함 3 픽스] 관찰 과다 발동 dedup + 통합
      // 1) 완전 중복 (turn+category+title+party 동일) → 무시, 기존 id 그대로 반환
      const exactDuplicate = state.judgeObservations.find((o) =>
        o.turnCount === entry.turnCount &&
        o.category === entry.category &&
        o.title === entry.title &&
        (o.party ?? null) === (entry.party ?? null),
      )
      if (exactDuplicate) {
        return state
      }
      // 2) 같은 턴 + 같은 party + 같은 category 가 이미 있으면 최신 것으로 교체 (통합)
      //    예: contradiction 카테고리에 "변화 감지" + "방어 흔들" 동시 발생 → 마지막 1개만
      const sameTurnSameCategoryIdx = state.judgeObservations.findIndex((o) =>
        o.turnCount === entry.turnCount &&
        o.category === entry.category &&
        (o.party ?? null) === (entry.party ?? null),
      )
      if (sameTurnSameCategoryIdx >= 0) {
        const updated = [...state.judgeObservations]
        updated[sameTurnSameCategoryIdx] = entry
        return { judgeObservations: updated }
      }
      return { judgeObservations: [...state.judgeObservations, entry] }
    })
    return id
  },

  markObservationRead: (id) => {
    set((state) => ({
      judgeObservations: state.judgeObservations.map((obs) =>
        obs.id === id ? { ...obs, read: true } : obs,
      ),
    }))
  },

  markAllObservationsRead: () => {
    set((state) => ({
      judgeObservations: state.judgeObservations.map((obs) => ({ ...obs, read: true })),
    }))
  },

  setObservationHistoryOpen: (open) => {
    set({ observationHistoryOpen: open })
  },

  clearJudgeObservations: () => {
    set({ judgeObservations: [], observationHistoryOpen: false, pendingResonances: [], pendingAuras: [] })
  },

  enqueueResonance: (req) => {
    const id = nextResonanceId()
    const entry: ResonanceRequest = { ...req, id, createdAt: Date.now() }
    set((state) => ({ pendingResonances: [...state.pendingResonances, entry] }))
    return id
  },

  dismissResonance: (id) => {
    set((state) => ({
      pendingResonances: state.pendingResonances.filter((r) => r.id !== id),
    }))
  },

  enqueueAura: (req) => {
    const id = nextAuraId()
    const entry: AuraRequest = { ...req, id, createdAt: Date.now() }
    set((state) => ({ pendingAuras: [...state.pendingAuras, entry] }))
    return id
  },

  dismissAura: (id) => {
    set((state) => ({
      pendingAuras: state.pendingAuras.filter((a) => a.id !== id),
    }))
  },
})
