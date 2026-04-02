import { useState, useEffect } from 'react'
import { GamePhase } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import { resolveLLMDialogue } from '../../engine/llmDialogueResolver'
import { isLLMMode } from '../../hooks/useActionDispatch'
import { buildBridgeFromStore } from '../../engine/phase6ResultPromptV2'
import { hasV2Data } from '../../engine/v2DataLoader'
import Emoji from '../common/Emoji'
import type { PlayerAction } from '../../types'

type MediationPath = 'immediate' | 'conditional' | 'postpone' | 'fact_first'

export default function Phase6_Mediation() {
  const [selectedPath, setSelectedPath] = useState<MediationPath | null>(null)
  const [loading, setLoading] = useState(false)
  const advancePhase = useGameStore((s) => s.advancePhase)
  const caseData = useGameStore((s) => s.caseData)
  const addDialogue = useGameStore((s) => s.addDialogue)
  const turnCount = useGameStore((s) => s.turnCount)

  // V2 bridge 빌드 (Phase 6 진입 시 1회)
  useEffect(() => {
    if (!caseData) return
    const store = useGameStore.getState()
    if (store.phase3PromptBridge) return // 이미 빌드됨
    const caseKey = caseData.caseId?.replace(/^case-/, '') ?? ''
    if (!hasV2Data(caseKey)) return
    const bridge = buildBridgeFromStore(
      caseKey,
      { emotion: store.agentA.emotionalState.internalValue },
      { emotion: store.agentB.emotionalState.internalValue },
      store.dialogueLog,
      caseData.disputes,
    )
    if (bridge) store.setPhase3PromptBridge(bridge)
  }, [caseData])

  if (!caseData) return null

  const PATHS: { id: MediationPath; label: string; icon: string; desc: string }[] = [
    { id: 'immediate', label: '즉시 판결', icon: '⚖️', desc: '충분히 파악했습니다. 바로 판결하겠습니다.' },
    { id: 'conditional', label: '조건부 조정안', icon: '🤝', desc: '양측에 조건을 제시하고 반응을 봅니다.' },
    { id: 'postpone', label: '일부만 확정, 나머지 보류', icon: '⏸️', desc: '확실한 것만 확정하고 불확실한 부분은 보류합니다.' },
    { id: 'fact_first', label: '사실 확정 후 해결책 논의', icon: '📋', desc: '사실 인정을 먼저 하고, 해결책은 별도로 논의합니다.' },
  ]

  const handleSelect = async (path: MediationPath) => {
    setSelectedPath(path)

    if (path === 'immediate') {
      addDialogue({ speaker: 'judge', text: '심리를 종결하겠습니다. 판결을 내리겠습니다.', relatedDisputes: [], turn: turnCount })
      advancePhase(GamePhase.Phase7_Verdict)
      return
    }

    setLoading(true)

    const pathLabels: Record<string, string> = {
      conditional: '조건부 조정안을 제시하겠습니다',
      postpone: '확실한 사실만 먼저 확정하고, 나머지는 보류하겠습니다',
      fact_first: '사실 관계를 먼저 정리한 후 해결책을 논의하겠습니다',
    }

    addDialogue({
      speaker: 'judge',
      text: pathLabels[path] ?? '',
      relatedDisputes: [],
      turn: turnCount,
    })

    if (isLLMMode()) {
      // mediation_reaction 에이전트로 양측 반응 생성
      const store = useGameStore.getState()
      const mediationAction: PlayerAction = { type: 'mediation', choice: pathToChoice(path) }

      // A 반응
      try {
        store.setLLMLoading(true, 'a')
        const resultA = await resolveLLMDialogue(mediationAction, store.agentA, store.agentB, store.evidenceStates, caseData)
        store.setLLMLoading(false)
        if (resultA) {
          store.addDialogue({ speaker: 'a', text: resultA.node.text, relatedDisputes: [], turn: store.turnCount, behaviorHint: resultA.node.behaviorHint })
        }
      } catch { store.setLLMLoading(false) }

      // B 반응
      try {
        const freshStore = useGameStore.getState()
        freshStore.setLLMLoading(true, 'b')
        const resultB = await resolveLLMDialogue(mediationAction, freshStore.agentA, freshStore.agentB, freshStore.evidenceStates, caseData)
        freshStore.setLLMLoading(false)
        if (resultB) {
          freshStore.addDialogue({ speaker: 'b', text: resultB.node.text, relatedDisputes: [], turn: freshStore.turnCount, behaviorHint: resultB.node.behaviorHint })
        }
      } catch { useGameStore.getState().setLLMLoading(false) }
    } else {
      // 폴백: 고정 반응
      const nameA = caseData.duo.partyA.name
      const nameB = caseData.duo.partyB.name
      const fallbacks: Record<string, string[]> = {
        conditional: [
          `조건이 합리적이라면 고려해 보겠습니다.`,
          `조건에 따라 다르겠지만... 들어는 보겠습니다.`,
        ],
        postpone: [
          `보류라... 결국 다시 와야 한다는 건가요?`,
          `확실한 건 확실하게 해주셨으면 좋겠어요.`,
        ],
        fact_first: [
          `사실 관계부터 정리하는 건 찬성합니다.`,
          `네, 그게 공정할 것 같아요.`,
        ],
      }
      const lines = fallbacks[path] ?? []
      if (lines[0]) addDialogue({ speaker: 'a', text: lines[0], relatedDisputes: [], turn: turnCount })
      if (lines[1]) addDialogue({ speaker: 'b', text: lines[1], relatedDisputes: [], turn: turnCount })
    }

    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <div className="text-center">
        <div className="text-xs text-amber-500 font-semibold">중재안 Phase</div>
        <p className="text-xs text-gray-500 mt-1">판결 방식을 선택하세요.</p>
      </div>

      {!selectedPath && (
        <div className="space-y-2">
          {PATHS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className="w-full text-left border border-gray-700 bg-gray-800/50 hover:border-amber-600 rounded-lg p-3 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Emoji char={p.icon} size={18} />
                <div>
                  <div className="text-sm font-semibold text-gray-200">{p.label}</div>
                  <div className="text-xs text-gray-500">{p.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-4 gap-2">
          <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-400">양측의 반응을 확인하고 있습니다...</span>
        </div>
      )}

      {selectedPath && selectedPath !== 'immediate' && !loading && (
        <div className="text-center pt-2">
          <button
            onClick={() => advancePhase(GamePhase.Phase7_Verdict)}
            className="bg-amber-600 hover:bg-amber-500 text-gray-950 font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
          >
            판결로 진행 →
          </button>
        </div>
      )}
    </div>
  )
}

function pathToChoice(path: MediationPath): 'immediate_verdict' | 'conditional_mediation' | 'postpone_investigation' | 'fact_first_solution_later' {
  const map: Record<MediationPath, 'immediate_verdict' | 'conditional_mediation' | 'postpone_investigation' | 'fact_first_solution_later'> = {
    immediate: 'immediate_verdict',
    conditional: 'conditional_mediation',
    postpone: 'postpone_investigation',
    fact_first: 'fact_first_solution_later',
  }
  return map[path]
}
