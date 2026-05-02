import type { StateCreator } from 'zustand'
import type { PartyId } from '../../types'

/**
 * Judge Notebook Slice — "재판관의 수첩"
 * ──────────────────────────────────────
 * '재판관의 관찰'(JudgeObservationSlice)이 진행 중 일어나는 모든 관찰의 누적이라면,
 * '재판관의 수첩'은 게임에 영향을 주는 **결정적 사건**만 기록.
 *
 * 등록 트리거 (Phase C 인프라가 자동 호출 예정):
 * - 자백 (confession) — NPC가 핵심 사실을 자백한 순간
 * - 결정적 모순 (critical_contradiction) — 모순 추궁이 lieState 전이를 유발한 경우
 * - 핵심 발화 (key_statement) — S5 도달 + 구체 정보 노출 발화
 */

export type JudgeNotebookCategory =
  | 'confession'              // 자백
  | 'critical_contradiction'  // 결정적 모순
  | 'key_statement'           // 핵심 발화
  | 'dispute_probe'           // 쟁점 파악
  | 'dispute_emergence'       // 새 쟁점 발현

export interface JudgeNotebookEntry {
  id: string
  createdAt: number
  turnCount: number
  category: JudgeNotebookCategory
  /** PCSvgIcon id. 미지정 시 category 기본값 */
  iconId?: string
  /** 한 줄 제목 — 사건의 핵심 */
  title: string
  /** 보조 설명 (1~2줄) */
  summary?: string
  party?: PartyId
  disputeId?: string
  /** 채팅 jump 타겟 — dialogueLog entry id */
  linkedDialogueId?: string
  read: boolean
}

export interface JudgeNotebookSlice {
  notebookEntries: JudgeNotebookEntry[]
  /** 새 entry 등록. dedup: 같은 turn + 같은 category + 같은 party + 같은 title 중복 무시 */
  addNotebookEntry: (item: Omit<JudgeNotebookEntry, 'id' | 'createdAt' | 'read'>) => string | null
  markNotebookEntryRead: (id: string) => void
  markAllNotebookRead: () => void
  clearNotebookEntries: () => void
}

let notebookIdCounter = 0
function nextNotebookId(): string {
  notebookIdCounter += 1
  return `nb-${Date.now().toString(36)}-${notebookIdCounter.toString(36)}`
}

export const createJudgeNotebookSlice: StateCreator<JudgeNotebookSlice, [], [], JudgeNotebookSlice> = (set) => ({
  notebookEntries: [],

  addNotebookEntry: (item) => {
    let createdId: string | null = null
    set((state) => {
      // dedup — 같은 turn + 같은 category + 같은 party + 같은 title 중복 무시
      const exactDuplicate = state.notebookEntries.find((entry) =>
        entry.turnCount === item.turnCount &&
        entry.category === item.category &&
        (entry.party ?? null) === (item.party ?? null) &&
        entry.title === item.title,
      )
      if (exactDuplicate) {
        createdId = exactDuplicate.id
        return state
      }
      const id = nextNotebookId()
      const entry: JudgeNotebookEntry = {
        ...item,
        id,
        createdAt: Date.now(),
        read: false,
      }
      createdId = id
      return { notebookEntries: [...state.notebookEntries, entry] }
    })
    return createdId
  },

  markNotebookEntryRead: (id) => {
    set((state) => ({
      notebookEntries: state.notebookEntries.map((entry) =>
        entry.id === id ? { ...entry, read: true } : entry,
      ),
    }))
  },

  markAllNotebookRead: () => {
    set((state) => ({
      notebookEntries: state.notebookEntries.map((entry) => ({ ...entry, read: true })),
    }))
  },

  clearNotebookEntries: () => {
    set({ notebookEntries: [] })
  },
})
