import { useEffect, useState } from 'react'
import { GamePhase } from '../../types'
import { useGameStore, useStore } from '../../store/useGameStore'
import { resolveLLMDialogue } from '../../engine/llmDialogueResolver'
import { isLLMMode } from '../../hooks/useActionDispatch'
import { buildBridgeFromStore } from '../../engine/phase6ResultPromptV2'
import { hasStructureV2 } from '../../engine/v2DataLoader'
import { loadMediationScript } from '../../data/dialogues/mediationScriptLoader'
import Emoji from '../common/Emoji'
import type { PlayerAction } from '../../types'

type MediationPath = 'immediate' | 'conditional' | 'postpone' | 'fact_first'

const PATH_LABELS: Record<MediationPath, { label: string; icon: string; desc: string; judge: string }> = {
  immediate: {
    label: '즉시 판결',
    icon: '⚖️',
    desc: '정리된 쟁점을 기준으로 바로 판단합니다.',
    judge: '정리된 쟁점을 기준으로 즉시 판단하겠습니다. 판결 단계로 넘어가겠습니다.',
  },
  conditional: {
    label: '조건부 조정',
    icon: '🤝',
    desc: '핵심 책임을 나눈 뒤 조건부 조정을 먼저 제시합니다.',
    judge: '핵심 책임을 분리한 조건부 조정을 먼저 제시하겠습니다.',
  },
  postpone: {
    label: '일부 보류',
    icon: '📝',
    desc: '확정 가능한 사실만 먼저 고정하고 나머지는 보류합니다.',
    judge: '확정 가능한 사실만 먼저 고정하고 나머지는 보류하겠습니다.',
  },
  fact_first: {
    label: '사실 먼저',
    icon: '🔍',
    desc: '해결책보다 사실관계부터 먼저 정리합니다.',
    judge: '사실관계만 먼저 정리하고 해결책은 그 뒤에 조율하겠습니다.',
  },
}

export default function Phase6_Mediation() {
  const [selectedPath, setSelectedPath] = useState<MediationPath | null>(null)
  const [loading, setLoading] = useState(false)
  const advancePhase = useStore((s) => s.advancePhase)
  const caseData = useStore((s) => s.caseData)
  const addDialogue = useStore((s) => s.addDialogue)
  const turnCount = useStore((s) => s.turnCount)
  const mediationScript = loadMediationScript(caseData?.caseId ?? '')

  useEffect(() => {
    if (!caseData) return
    const store = useGameStore.getState()
    if (store.phase3PromptBridge) return
    const caseKey = caseData.caseId?.replace(/^case-/, '') ?? ''
    if (!hasStructureV2(caseKey)) return
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

  const handleSelect = async (path: MediationPath) => {
    setSelectedPath(path)

    const scriptedPath = mediationScript?.paths?.[path]
    const judgeText = scriptedPath?.judge ?? PATH_LABELS[path].judge
    addDialogue({ speaker: 'judge', text: judgeText, relatedDisputes: [], turn: turnCount })

    if (path === 'immediate') {
      advancePhase(GamePhase.Phase7_Verdict)
      return
    }

    if (scriptedPath?.dialogues?.length) {
      for (const line of scriptedPath.dialogues) {
        addDialogue({
          speaker: line.speaker,
          text: line.text,
          relatedDisputes: line.relatedDisputes,
          turn: turnCount,
          behaviorHint: line.behaviorHint ?? undefined,
        })
      }
      return
    }

    if (isLLMMode()) {
      setLoading(true)
      const store = useGameStore.getState()
      const mediationAction: PlayerAction = { type: 'mediation', choice: pathToChoice(path) }

      try {
        store.setLLMLoading(true, 'a')
        const resultA = await resolveLLMDialogue(mediationAction, store.agentA, store.agentB, store.evidenceStates, caseData)
        store.setLLMLoading(false)
        if (resultA) {
          store.addDialogue({
            speaker: 'a',
            text: resultA.node.text,
            relatedDisputes: [],
            turn: store.turnCount,
            behaviorHint: resultA.node.behaviorHint,
          })
        }
      } catch {
        store.setLLMLoading(false)
      }

      try {
        const freshStore = useGameStore.getState()
        freshStore.setLLMLoading(true, 'b')
        const resultB = await resolveLLMDialogue(mediationAction, freshStore.agentA, freshStore.agentB, freshStore.evidenceStates, caseData)
        freshStore.setLLMLoading(false)
        if (resultB) {
          freshStore.addDialogue({
            speaker: 'b',
            text: resultB.node.text,
            relatedDisputes: [],
            turn: freshStore.turnCount,
            behaviorHint: resultB.node.behaviorHint,
          })
        }
      } catch {
        useGameStore.getState().setLLMLoading(false)
      }

      setLoading(false)
      return
    }

    const fallbacks: Record<Exclude<MediationPath, 'immediate'>, string[]> = {
      conditional: [
        '조건이 공정하다면 조정을 들을 수 있습니다. 다만 먼저 고정할 선은 분명해야 합니다.',
        '조건 자체는 검토할 수 있습니다. 다만 한쪽 책임만 먼저 굳어지는 방식은 받아들이기 어렵습니다.',
      ],
      postpone: [
        '보류 자체는 받아들일 수 있습니다. 다만 오늘 선을 그어야 할 쟁점까지 흐려지면 안 됩니다.',
        '섣부른 단정보다는 보류가 낫습니다. 그렇다고 면책처럼 보이지는 않게 정리해 주십시오.',
      ],
      fact_first: [
        '사실부터 정리하는 방식에는 동의합니다. 해결책보다 기록과 경위를 먼저 고정해야 합니다.',
        '해결책을 서두르기보다 사실을 먼저 정리하는 편이 공정합니다. 감정과 책임을 분리해 봐야 합니다.',
      ],
    }
    const lines = fallbacks[path]
    if (lines[0]) addDialogue({ speaker: 'a', text: lines[0], relatedDisputes: [], turn: turnCount })
    if (lines[1]) addDialogue({ speaker: 'b', text: lines[1], relatedDisputes: [], turn: turnCount })
  }

  return (
    <div className="space-y-3">
      <div className="text-center">
        <div className="text-xs text-amber-500 font-semibold">중재 Phase</div>
        <p className="text-xs text-gray-500 mt-1">판결 방식을 선택하세요.</p>
      </div>

      {!selectedPath && (
        <div className="space-y-2">
          {(Object.entries(PATH_LABELS) as Array<[MediationPath, typeof PATH_LABELS[MediationPath]]>).map(([id, item]) => (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              className="w-full text-left border border-gray-700 bg-gray-800/50 hover:border-amber-600 rounded-lg p-3 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Emoji char={item.icon} size={18} />
                <div>
                  <div className="text-sm font-semibold text-gray-200">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-4 gap-2">
          <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-400">양측 반응을 확인하고 있습니다...</span>
        </div>
      )}

      {selectedPath && selectedPath !== 'immediate' && !loading && (
        <div className="text-center pt-2">
          <button
            onClick={() => advancePhase(GamePhase.Phase7_Verdict)}
            className="bg-amber-600 hover:bg-amber-500 text-gray-950 font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
          >
            판결로 진행
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
