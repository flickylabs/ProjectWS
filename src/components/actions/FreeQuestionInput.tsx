import { useState } from 'react'
import type { PartyId } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import { isLLMMode } from '../../hooks/useActionDispatch'
import { processFreeQuestion } from '../../engine/llmFreeQuestion'
import type { FreeQuestionResult } from '../../engine/llmFreeQuestion'
import { canUseFreeQuestionV2, processFreeQuestionV2, buildDisputeAliasMap } from '../../engine/freeQuestionV2'
import { hasStructureV2, getStructureV2, getBeatRuntimeState } from '../../engine/v2DataLoader'
import { getMisconceptionState } from '../../engine/misconceptionEngine'
import { recordRevealedAtom, recordTurnStyle } from '../../engine/phase3LogCollector'
import { normalizeCaseKey } from '../../utils/caseHelpers'
import Emoji from '../common/Emoji'

interface Props {
  target: PartyId | null
  onResult: (result: FreeQuestionResult, target: PartyId, questionText: string) => void
}

export default function FreeQuestionInput({ target, onResult }: Props) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const resources = useGameStore((s) => s.resources)
  const caseData = useGameStore((s) => s.caseData)

  const llmAvailable = isLLMMode()
  const hasTokens = resources.investigationTokens >= 1
  const canAsk = target && text.trim().length >= 2 && llmAvailable && hasTokens && !loading

  const handleSubmit = async () => {
    if (!canAsk || !target || !caseData) return
    setLoading(true)

    const state = useGameStore.getState()
    const v2CaseId = normalizeCaseKey(caseData)
    const v2Active = hasStructureV2(v2CaseId) && state.phase3Flags.useBeatSelectorV2
    const agent = target === 'a' ? state.agentA : state.agentB
    const focusDisputeId = state.disputeBoardAction?.disputeId ?? Object.keys(agent.lieStateMap)[0] ?? ''
    const currentLieState = agent.lieStateMap[focusDisputeId]?.currentState

    // V2 자유 질문 시도
    if (v2Active) {
      const rState = getBeatRuntimeState(v2CaseId)
      const structure = getStructureV2(v2CaseId)
      if (!structure) return
      const hooks = structure.freeQuestionHooks ?? []

      const gateOpen = canUseFreeQuestionV2({
        isV2Case: true,
        turn: state.turnCount,
        activeDisputeId: focusDisputeId,
        currentLieState,
        flags: rState.flags,
      })

      if (gateOpen && hooks.length > 0) {
        const mcState = getMisconceptionState(focusDisputeId) ?? undefined
        // structure-v2의 disputeAliases에서 alias map 구축
        const aliasMap = buildDisputeAliasMap(structure.disputes as Array<{ id: string; name?: string; disputeAliases?: string[] }>)

        const targetParty = target === 'a' ? caseData.parties.a : caseData.parties.b
        const v2Result = processFreeQuestionV2({
          question: text.trim(),
          activeDisputeId: focusDisputeId,
          currentLieState,
          currentMisconceptionState: mcState,
          hooks,
          atomIndex: {}, // atom index는 향후 V2 데이터에서 구축
          runtime: { usedHookIds: [], readinessAwardedHookIds: [], refusalHistoryByHook: {} },
          disputeAliasMap: aliasMap,
          archetype: targetParty.archetype,
        })

        // effect 적용
        for (const eff of v2Result.effects) {
          if (eff.type === 'record_atom') recordRevealedAtom(eff.atomId)
          if (eff.type === 'set_flag') rState.flags.add(eff.flag)
          if (eff.type === 'trust_delta') state.changeTrust(target, 'trustTowardJudge', eff.amount * 3)
        }
        if (v2Result.allowed) {
          recordTurnStyle(v2Result.inferredQuestionType, v2Result.inferredAngleTag)
        }

        // FreeQuestionResult 형태로 변환하여 기존 콜백 호환
        const compatResult: FreeQuestionResult = {
          response: v2Result.response,
          behaviorHint: v2Result.behaviorHint,
          questionType: v2Result.allowed ? v2Result.inferredQuestionType : 'irrelevant',
          disputeId: v2Result.disputeId ?? focusDisputeId,
        }
        const asked = text.trim()
        setText('')
        setLoading(false)
        onResult(compatResult, target, asked)
        return
      }
    }

    // 기존 LLM 경로
    const result = await processFreeQuestion(
      text.trim(), target, state.agentA, state.agentB, caseData,
    )

    const asked = text.trim()
    setText('')
    setLoading(false)
    onResult(result, target, asked)
  }

  if (!llmAvailable) {
    return (
      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 text-center">
        <span className="text-xs text-gray-600">AI 연결 시 자유 질문을 사용할 수 있습니다</span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {!target && (
        <div className="text-center py-3">
          <span className="text-2xl"><Emoji char="👈" size={24} /><Emoji char="👉" size={24} /></span>
          <p className="text-gray-500 text-xs mt-2">먼저 질문할 대상을 선택하세요</p>
        </div>
      )}

      {target && (
        <>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && canAsk) handleSubmit() }}
                placeholder="자유롭게 질문하세요..."
                maxLength={100}
                disabled={loading}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none disabled:opacity-50"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700">{text.length}/100</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!canAsk}
              className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                canAsk
                  ? 'bg-amber-600 text-gray-950 hover:bg-amber-500'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                </span>
              ) : '질문'}
            </button>
          </div>

          {/* 비용 안내 */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-gray-600">
              <Emoji char="🔍" size={12} />
              <span>조사 토큰 1개 소모</span>
              <span className={hasTokens ? 'text-emerald-500' : 'text-red-400'}>
                (잔여: {resources.investigationTokens})
              </span>
            </div>
            {text.trim().length > 0 && text.trim().length < 2 && (
              <span className="text-gray-600">2자 이상 입력</span>
            )}
          </div>

          {/* 팁 */}
          <div className="bg-gray-800/30 border border-gray-700/20 rounded-lg px-3 py-2">
            <div className="text-xs text-gray-600 space-y-0.5">
              <div><Emoji char="💡" size={12} /> 구체적인 질문이 효과적입니다</div>
              <div className="text-gray-700">예: "그날 밤 10시에 어디 있었나요?" "왜 숨긴 거죠?"</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
