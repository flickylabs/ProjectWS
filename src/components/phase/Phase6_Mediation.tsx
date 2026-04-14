import { useEffect, useState } from 'react'
import { GamePhase, Phase } from '../../types'
import { useGameStore, useStore } from '../../store/useGameStore'
import { resolveLLMDialogue } from '../../engine/llmDialogueResolver'
import { isLLMMode } from '../../hooks/useActionDispatch'
import { getScriptedMediation } from '../../engine/scriptedTextLoader'
import { normalizeCaseKey } from '../../utils/caseHelpers'
import { buildBridgeFromStore } from '../../engine/phase6ResultPromptV2'
import { hasStructureV2 } from '../../engine/v2DataLoader'
import { loadMediationScript } from '../../data/dialogues/mediationScriptLoader'
import PCSvgIcon from '../pc/icons/PCSvgIcon'
import type { PlayerAction } from '../../types'

type MediationPath = 'immediate' | 'conditional' | 'postpone' | 'fact_first'

const PATH_LABELS: Record<MediationPath, { label: string; iconId: string; desc: string; judge: string }> = {
  immediate: {
    label: '즉시 판결',
    iconId: 'i-scale',
    desc: '쟁점이 충분히 드러났으니 바로 판결합니다.',
    judge: '쟁점은 충분히 드러났습니다. 더 늦추지 않고 지금 판결의 기준을 세우겠습니다.',
  },
  conditional: {
    label: '조건부 조정',
    iconId: 'i-heart',
    desc: '서로 받아들일 조건을 묶어 타협점을 찾습니다.',
    judge: '지금은 누가 얼마나 책임을 지는지만 정하면 끝나지 않습니다. 서로 받아들일 조건을 함께 묶어 보며 합의 가능한 선부터 확인하겠습니다.',
  },
  postpone: {
    label: '일부 보류',
    iconId: 'i-doc',
    desc: '확정 가능한 것만 정리하고 나머지는 숨 돌린 뒤 판단합니다.',
    judge: '당장 결론을 서두르면 남는 상처가 더 커질 수 있습니다. 오늘 확정할 사실과 남겨 둘 쟁점을 나눠서 숨 돌릴 틈을 만든 뒤 판단하겠습니다.',
  },
  fact_first: {
    label: '사실 먼저',
    iconId: 'i-search',
    desc: '감정과 해법을 섞기 전에 사실관계부터 고정합니다.',
    judge: '감정과 해법을 먼저 섞으면 판단이 흐려집니다. 사실관계부터 한 줄씩 고정한 뒤 그 위에 책임과 해결책을 얹겠습니다.',
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
    useGameStore.getState().setMediationChoice(path)

    const scriptedPath = mediationScript?.paths?.[path]
    const judgeText = scriptedPath?.judge ?? PATH_LABELS[path].judge
    addDialogue({ speaker: 'judge', text: judgeText, relatedDisputes: [], turn: turnCount })

    if (path === 'immediate') {
      advancePhase(Phase.Verdict)
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

    {
      setLoading(true)
      const store = useGameStore.getState()
      const mediationCaseKey = normalizeCaseKey(caseData.caseId ?? '')
      const resultClass = pathToChoice(path)
      const mediationAction: PlayerAction = { type: 'mediation', choice: resultClass }

      // A 응답: ScriptedText 우선 → LLM 폴백
      const scriptedA = getScriptedMediation(mediationCaseKey, 'a', resultClass)
      if (scriptedA) {
        store.addDialogue({ speaker: 'a', text: scriptedA.text, relatedDisputes: [], turn: store.turnCount, behaviorHint: scriptedA.behaviorHint })
      } else if (isLLMMode()) {
        try {
          store.setLLMLoading(true, 'a')
          const resultA = await resolveLLMDialogue(mediationAction, store.agentA, store.agentB, store.evidenceStates, caseData)
          store.setLLMLoading(false)
          if (resultA) store.addDialogue({ speaker: 'a', text: resultA.node.text, relatedDisputes: [], turn: store.turnCount, behaviorHint: resultA.node.behaviorHint })
        } catch { store.setLLMLoading(false) }
      }

      // B 응답: ScriptedText 우선 → LLM 폴백
      const freshStore = useGameStore.getState()
      const scriptedB = getScriptedMediation(mediationCaseKey, 'b', resultClass)
      if (scriptedB) {
        freshStore.addDialogue({ speaker: 'b', text: scriptedB.text, relatedDisputes: [], turn: freshStore.turnCount, behaviorHint: scriptedB.behaviorHint })
      } else if (isLLMMode()) {
        try {
          freshStore.setLLMLoading(true, 'b')
          const resultB = await resolveLLMDialogue(mediationAction, freshStore.agentA, freshStore.agentB, freshStore.evidenceStates, caseData)
          freshStore.setLLMLoading(false)
          if (resultB) freshStore.addDialogue({ speaker: 'b', text: resultB.node.text, relatedDisputes: [], turn: freshStore.turnCount, behaviorHint: resultB.node.behaviorHint })
        } catch { useGameStore.getState().setLLMLoading(false) }
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
    const lines = (fallbacks as any)[path] ?? ['']
    if (lines[0]) addDialogue({ speaker: 'a', text: lines[0], relatedDisputes: [], turn: turnCount })
    if (lines[1]) addDialogue({ speaker: 'b', text: lines[1], relatedDisputes: [], turn: turnCount })
  }

  return (
    <div className="pc-mediation">
      <div className="pc-mediation__header">
        <PCSvgIcon id="i-scale" size={18} />
        <span className="pc-mediation__title">중재</span>
        <span className="pc-mediation__subtitle">판결 방식을 선택하세요</span>
      </div>

      {!selectedPath ? (
        <div className="pc-mediation__options">
          {(Object.entries(PATH_LABELS) as Array<[MediationPath, typeof PATH_LABELS[MediationPath]]>).map(([id, item]) => (
            <button
              className="pc-mediation__option"
              key={id}
              onClick={() => handleSelect(id)}
              type="button"
            >
              <span className="pc-mediation__option-icon">
                <PCSvgIcon id={item.iconId} size={20} />
              </span>
              <span className="pc-mediation__option-body">
                <span className="pc-mediation__option-label">{item.label}</span>
                <span className="pc-mediation__option-desc">{item.desc}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {loading ? (
        <div className="pc-mediation__loading">
          <div className="pc-mediation__spinner" />
          <span>양측 반응을 확인하고 있습니다...</span>
        </div>
      ) : null}

      {selectedPath && selectedPath !== 'immediate' && !loading ? (
        <div className="pc-mediation__advance">
          <button className="pc-mediation__advance-btn" onClick={() => advancePhase(Phase.Verdict)} type="button">
            <PCSvgIcon id="i-gavel" size={18} />
            <span>판결로 진행</span>
          </button>
        </div>
      ) : null}
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
