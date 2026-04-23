import type { StateCreator } from 'zustand'

/**
 * Character Tag Slice
 * ────────────────────
 * NPC archetype 관찰 상태 저장.
 * - 최초 관찰 시 태그 추가 + glow 세팅 → 캐릭터 카드에 등장
 * - 클릭 또는 타이머로 glow 해제
 * - 같은 archetype 재관찰 시 배열 변경 없음(팝업만 재등장)
 */

export interface CharacterTagSlice {
  /** party별로 관찰된 archetype id 목록 (등장 순서 유지) */
  observedArchetypes: { a: string[]; b: string[] }
  /** 현재 반짝이는 태그 key (`${party}:${archetype}`), 없으면 null */
  glowingTagKey: string | null
  /** 관찰 기록 + glow 세팅. 새로 관찰된 경우 true 반환 */
  observeArchetype: (party: 'a' | 'b', archetype: string) => boolean
  /** glow 해제 */
  dismissGlow: () => void
  /** 사건 시작/리셋 시 전체 클리어 */
  resetCharacterTags: () => void
}

export const createCharacterTagSlice: StateCreator<CharacterTagSlice, [], [], CharacterTagSlice> = (set, get) => ({
  observedArchetypes: { a: [], b: [] },
  glowingTagKey: null,

  observeArchetype: (party, archetype) => {
    const current = get().observedArchetypes[party] ?? []
    if (current.includes(archetype)) return false
    set((state) => ({
      observedArchetypes: {
        ...state.observedArchetypes,
        [party]: [...(state.observedArchetypes[party] ?? []), archetype],
      },
      glowingTagKey: `${party}:${archetype}`,
    }))
    return true
  },

  dismissGlow: () => {
    set({ glowingTagKey: null })
  },

  resetCharacterTags: () => {
    set({ observedArchetypes: { a: [], b: [] }, glowingTagKey: null })
  },
})
