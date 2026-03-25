import { useState } from 'react'
import { GamePhase } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import { chatCompletion } from '../../engine/llmClient'
import { isLLMMode } from '../../hooks/useActionDispatch'

type MediationPath = 'immediate' | 'conditional' | 'postpone' | 'fact_first'

export default function Phase6_Mediation() {
  const [selectedPath, setSelectedPath] = useState<MediationPath | null>(null)
  const [mediationResponse, setMediationResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const advancePhase = useGameStore((s) => s.advancePhase)
  const caseData = useGameStore((s) => s.caseData)
  const addDialogue = useGameStore((s) => s.addDialogue)
  const turnCount = useGameStore((s) => s.turnCount)

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

    // 조건부 조정 / 보류 / 사실우선 → 양측 반응 생성
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
      try {
        const prompt = buildMediationPrompt(caseData, path)
        const response = await chatCompletion(
          [{ role: 'user', content: prompt }],
          { temperature: 0.8, maxTokens: 500 },
        )
        setMediationResponse(response)

        // 양측 반응을 대화 로그에 추가
        const lines = response.split('\n').filter((l) => l.trim())
        for (const line of lines) {
          const speaker = line.startsWith('A:') ? 'a' as const
            : line.startsWith('B:') ? 'b' as const
            : 'system' as const
          const text = line.replace(/^[AB]:\s*/, '').replace(/^시스템:\s*/, '')
          if (text) {
            addDialogue({ speaker, text, relatedDisputes: [], turn: turnCount })
          }
        }
      } catch {
        setMediationResponse(null)
      }
    } else {
      // 폴백: 고정 반응
      const nameA = caseData.duo.partyA.name
      const nameB = caseData.duo.partyB.name
      const fallbacks: Record<string, string[]> = {
        conditional: [
          `${nameA}: ... 조건이 합리적이라면 고려해 보겠습니다.`,
          `${nameB}: 조건에 따라 다르겠지만... 들어는 보겠습니다.`,
        ],
        postpone: [
          `${nameA}: 보류라... 결국 다시 와야 한다는 건가요?`,
          `${nameB}: 확실한 건 확실하게 해주셨으면 좋겠어요.`,
        ],
        fact_first: [
          `${nameA}: 사실 관계부터 정리하는 건 찬성합니다.`,
          `${nameB}: 네, 그게 공정할 것 같아요.`,
        ],
      }
      for (const text of fallbacks[path] ?? []) {
        const speaker = text.startsWith(nameA) ? 'a' as const : 'b' as const
        addDialogue({ speaker, text: text.replace(/^[^:]+:\s*/, ''), relatedDisputes: [], turn: turnCount })
      }
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
                <span className="text-lg">{p.icon}</span>
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

function buildMediationPrompt(caseData: CaseData, path: MediationPath): string {
  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const disputes = caseData.disputes.map((d) => d.name).join(', ')

  const pathDesc: Record<string, string> = {
    conditional: '재판관이 조건부 조정안을 제시했습니다. 양측이 어떤 조건이면 수용할 수 있는지 반응합니다.',
    postpone: '재판관이 확실한 사실만 확정하고 나머지를 보류하겠다고 했습니다. 양측이 반응합니다.',
    fact_first: '재판관이 사실 관계부터 정리하겠다고 했습니다. 양측이 반응합니다.',
  }

  return `법정 심문 게임입니다. ${nameA}와 ${nameB}가 분쟁 중입니다.
쟁점: ${disputes}
${nameA} 성격: ${caseData.duo.partyA.speechStyle}
${nameB} 성격: ${caseData.duo.partyB.speechStyle}

${pathDesc[path]}

A:와 B:로 시작하는 짧은 반응을 2~3줄씩 작성하세요. 각자 성격에 맞게.
한국어로 법정 어투.`
}

type CaseData = import('../../types').CaseData
