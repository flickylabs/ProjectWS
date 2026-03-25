import { useEffect, useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { chatCompletion } from '../../engine/llmClient'
import { isLLMMode } from '../../hooks/useActionDispatch'

export default function Aftermath() {
  const caseData = useGameStore((s) => s.caseData)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const verdictScore = useGameStore((s) => s.verdictScore)
  const [aftermath, setAftermath] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!caseData || !verdictScore) return

    if (isLLMMode()) {
      generateAftermath()
    } else {
      setAftermath(buildFallbackAftermath())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const generateAftermath = async () => {
    if (!caseData || !verdictScore) return
    setLoading(true)
    try {
      const nameA = caseData.duo.partyA.name
      const nameB = caseData.duo.partyB.name
      const solutions = verdictInput.selectedSolutions.join(', ') || '특별한 해결책 없음'
      const score = `통찰 ${verdictScore.insight}, 권위 ${verdictScore.authority}, 지혜 ${verdictScore.wisdom}`

      const prompt = `법정 심문 추리 게임의 판결 후일담을 작성하세요.

당사자: ${nameA} vs ${nameB}
관계: ${caseData.duo.relationshipType}
배경: ${caseData.context.description}
선택한 해결책: ${solutions}
판결 점수: ${score}

## 규칙
- 판결 이후 1주일~1개월 후의 상황을 2~3문단으로 묘사
- 선택한 해결책이 실제로 어떤 영향을 미쳤는지
- 두 사람의 관계가 어떻게 변했는지
- 점수가 높으면 긍정적, 낮으면 부정적 결과
- 한국어로. 소설처럼 담담한 문체.
- 마지막에 한 줄로 교훈이나 여운을 남겨주세요.`

      const response = await chatCompletion(
        [{ role: 'user', content: prompt }],
        { temperature: 0.9, maxTokens: 500 },
      )
      setAftermath(response)
    } catch {
      setAftermath(buildFallbackAftermath())
    }
    setLoading(false)
  }

  const buildFallbackAftermath = (): string => {
    if (!caseData || !verdictScore) return ''
    const nameA = caseData.duo.partyA.name
    const nameB = caseData.duo.partyB.name
    const total = verdictScore.total

    if (total >= 75) {
      return `판결 이후, ${nameA}와 ${nameB}는 조심스럽게 대화를 시작했습니다. 완전한 화해는 아니었지만, 서로의 입장을 이해하려는 노력이 보였습니다.\n\n재판관의 판결이 두 사람에게 거울이 되었습니다. 자신의 잘못을 직시하는 것, 그것이 변화의 시작이었습니다.\n\n— 진실은 아프지만, 그 아픔이 치유의 시작이 되기도 한다.`
    }
    if (total >= 50) {
      return `${nameA}는 판결을 받아들였지만, ${nameB}는 여전히 불만이 있었습니다. 완벽한 판결은 아니었을지 모릅니다.\n\n그래도 사실이 밝혀진 것만으로 둘 다 조금은 가벼워진 듯했습니다.\n\n— 모든 판결이 완벽할 수는 없다. 중요한 것은 진실에 가까이 가려는 노력이다.`
    }
    return `판결은 두 사람 모두를 만족시키지 못했습니다. ${nameA}도, ${nameB}도 재판관의 판단에 의문을 품었습니다.\n\n핵심을 놓친 판결은 때로 상황을 더 악화시키기도 합니다.\n\n— 지혜로운 판결은 사실을 아는 것만으로는 부족하다. 사람을 이해해야 한다.`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 gap-2">
        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-gray-400">후일담을 작성하고 있습니다...</span>
      </div>
    )
  }

  if (!aftermath) return null

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-amber-400 text-center">판결 이후</h3>
      <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
        {aftermath.split('\n\n').map((paragraph, i) => (
          <p key={i} className={`text-sm leading-relaxed ${
            i === aftermath.split('\n\n').length - 1
              ? 'text-amber-400/80 italic mt-3 text-center'
              : 'text-gray-300 mb-3'
          }`}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
