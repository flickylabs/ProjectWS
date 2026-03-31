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

      // 사실 판단 결과
      const factResults = Object.entries(verdictInput.factFindings)
        .map(([id, val]) => {
          const dispute = caseData.disputes.find(d => d.id === id)
          return dispute ? `${dispute.name}: ${val === 'true' ? '사실' : val === 'false' ? '허위' : val === 'pending' ? '판단 보류' : '모호'}` : ''
        })
        .filter(Boolean).join('\n')

      // 책임 배분
      const respResults = Object.entries(verdictInput.responsibility)
        .map(([id, val]) => {
          const dispute = caseData.disputes.find(d => d.id === id)
          return dispute ? `${dispute.name}: ${nameA} ${val.a}% / ${nameB} ${val.b}%` : ''
        })
        .filter(Boolean).join('\n')

      const endingTone = verdictScore.total >= 75 ? '희망적이고 성장하는 톤'
        : verdictScore.total >= 55 ? '씁쓸하지만 의미 있는 톤'
        : verdictScore.total >= 35 ? '아쉽고 불완전한 톤'
        : '씁쓸하고 후회가 남는 톤'

      const partyA = caseData.duo.partyA
      const partyB = caseData.duo.partyB
      const relType = caseData.meta?.relationshipType ?? caseData.duo.relationshipType ?? ''
      const familyRel = caseData.meta?.relationshipState ?? caseData.meta?.familyRelation ?? ''
      const callA = partyA.callTerms?.toPartner ?? ''
      const callB = partyB.callTerms?.toPartner ?? ''

      const prompt = `법정 심문 추리 게임의 판결 후일담을 작성하세요.

당사자:
- ${nameA} (${partyA.age ?? ''}세, ${partyA.occupation ?? ''})
- ${nameB} (${partyB.age ?? ''}세, ${partyB.occupation ?? ''})
관계 유형: ${relType}${familyRel ? ` (${familyRel})` : ''}
호칭: ${nameA}→${nameB}: "${callA}", ${nameB}→${nameA}: "${callB}"
배경: ${caseData.context.description}

★ 두 사람의 나이와 관계에 맞는 호칭을 사용하세요. 형/누나/오빠/언니 등을 혼동하지 마세요.

## 재판관의 판결
사실 판단:
${factResults}

책임 배분:
${respResults}

선택한 해결책: ${solutions}
판결 점수: ${score} (총점 ${verdictScore.total})

## 규칙
- 톤: ${endingTone}
- 판결 이후 1주일~1개월 후의 상황을 3~4문단으로 묘사
- 사실 판단과 책임 배분이 두 사람에게 어떤 영향을 미쳤는지 구체적으로
- 선택한 해결책의 실제 결과를 보여줘 (잘된 점, 안 된 점 모두)
- 두 사람이 각각 무엇을 느꼈는지 내면까지 묘사
- 점수 75+ : 판결이 전환점이 되어 관계가 회복되는 방향
- 점수 55~74: 일부는 해결됐지만 완전하지 않은 여운
- 점수 35~54: 판결이 또 다른 갈등의 씨앗을 남김
- 점수 ~34: 판결이 상황을 악화시킴
- 한국어. 소설처럼 담담하고 현실적인 문체.
- 마지막 문단은 한 줄로 교훈이나 여운을 남겨주세요.`

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
