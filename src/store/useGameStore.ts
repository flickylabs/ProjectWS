import { create } from 'zustand'
import { createPhaseSlice, type PhaseSlice } from './slices/phaseSlice'
import { createAgentSlice, type AgentSlice } from './slices/agentSlice'
import { createResourceSlice, type ResourceSlice } from './slices/resourceSlice'
import { createEvidenceSlice, type EvidenceSlice } from './slices/evidenceSlice'
import { createDialogueSlice, type DialogueSlice } from './slices/dialogueSlice'
import { createVerdictSlice, type VerdictSlice } from './slices/verdictSlice'
import type { CaseData } from '../types'
import { GamePhase } from '../types'

export type GameStore = PhaseSlice & AgentSlice & ResourceSlice & EvidenceSlice & DialogueSlice & VerdictSlice & {
  caseData: CaseData | null
  lieConfigs: { a: CaseData['lieConfigA']; b: CaseData['lieConfigB'] } | null
  isLLMLoading: boolean
  setLLMLoading: (loading: boolean) => void
  separationTarget: 'a' | 'b' | null
  separationTurns: number
  startSeparation: (target: 'a' | 'b', turns: number) => void
  tickSeparation: () => void
  initializeCase: (caseData: CaseData) => void
}

export const useGameStore = create<GameStore>()((...args) => {
  const [set] = args

  return {
    ...createPhaseSlice(...args),
    ...createAgentSlice(...args),
    ...createResourceSlice(...args),
    ...createEvidenceSlice(...args),
    ...createDialogueSlice(...args),
    ...createVerdictSlice(...args),

    caseData: null,
    lieConfigs: null,
    isLLMLoading: false,
    setLLMLoading: (loading: boolean) => set({ isLLMLoading: loading }),
    separationTarget: null,
    separationTurns: 0,
    startSeparation: (target, turns) => set({ separationTarget: target, separationTurns: turns }),
    tickSeparation: () => {
      const s = useGameStore.getState()
      if (s.separationTurns <= 1) {
        set({ separationTarget: null, separationTurns: 0 })
      } else {
        set({ separationTurns: s.separationTurns - 1 })
      }
    },

    initializeCase: (caseData: CaseData) => {
      const store = useGameStore.getState()

      // 사건 데이터 저장
      set({ caseData, lieConfigs: { a: caseData.lieConfigA, b: caseData.lieConfigB } })

      // Phase 초기화
      store.setPhase(GamePhase.Phase0_CaseIntro)

      // 에이전트 초기화
      store.initializeAgents(
        caseData.lieConfigA,
        caseData.lieConfigB,
        caseData.duo.partyA.archetype,
        caseData.duo.partyB.archetype,
        'defensive',    // A 시작 감정
        'angry',        // B 시작 감정 (직선형)
      )

      // 리소스 초기화
      store.initResources()

      // 증거 초기화
      store.initEvidence(caseData.evidence, caseData.evidenceCombinations)

      // 대화 초기화
      store.clearDialogue()

      // 판결 초기화
      store.resetVerdict()
    },
  }
})
