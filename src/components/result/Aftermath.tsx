import { useEffect, useState, useRef } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { chatCompletion } from '../../engine/llmClient'
import { isLLMMode } from '../../hooks/useActionDispatch'
import { updateLatestAftermath } from '../../data/leaderboard'

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = []
  for (const paragraph of text.split('\n')) {
    let line = ''
    for (const char of paragraph) {
      const test = line + char
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line); line = char
      } else { line = test }
    }
    if (line) lines.push(line)
  }
  return lines
}

// 후일담 캐시 — 한 번 생성되면 같은 세션에서 고정
let cachedAftermath: string | null = null

export function resetAftermathCache() { cachedAftermath = null }

export default function Aftermath() {
  const caseData = useGameStore((s) => s.caseData)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const verdictScore = useGameStore((s) => s.verdictScore)
  const [aftermath, setAftermath] = useState<string | null>(cachedAftermath)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (cachedAftermath) return // 이미 생성된 후일담이 있으면 재생성하지 않음
    if (!caseData || !verdictScore) return

    if (isLLMMode()) {
      generateAftermath()
    } else {
      const fb = buildFallbackAftermath()
      cachedAftermath = fb
      setAftermath(fb)
      updateLatestAftermath(fb)
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

      const prompt = `법정 심문 게임의 판결 후일담을 작성하세요.

당사자: ${nameA}(${partyA.age ?? ''}세) vs ${nameB}(${partyB.age ?? ''}세)
관계: ${relType}${familyRel ? `(${familyRel})` : ''}. 호칭: ${callA}/${callB}
배경: ${caseData.context.description.slice(0, 150)}
해결책: ${solutions}
점수: ${verdictScore.total}점 (${endingTone})

규칙:
- 판결 이후 1주~1개월 후 상황을 2~3문단으로 묘사
- 두 사람의 관계 변화와 내면을 담담하게
- 호칭을 나이/관계에 맞게 사용
- 마지막 한 줄: 교훈이나 여운
- 한국어 소설체`

      // 재시도 로직 (최대 2회)
      let response = ''
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          response = await chatCompletion(
            [{ role: 'user', content: prompt }],
            { temperature: 0.85, maxTokens: 500 },
          )
          if (response.trim()) break
        } catch (retryErr) {
          console.warn(`[Aftermath] 시도 ${attempt + 1} 실패:`, retryErr)
          if (attempt === 0) await new Promise(r => setTimeout(r, 2000)) // 2초 대기 후 재시도
          else throw retryErr
        }
      }
      cachedAftermath = response
      setAftermath(response)
      updateLatestAftermath(response)
    } catch (err) {
      console.error('[Aftermath] 후일담 생성 실패:', err)
      const fb = buildFallbackAftermath()
      cachedAftermath = fb
      setAftermath(fb)
      updateLatestAftermath(fb)
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

  const aftermathCanvasRef = useRef<HTMLCanvasElement>(null)

  const renderAftermathImage = (): string | null => {
    const canvas = aftermathCanvasRef.current
    if (!canvas || !aftermath || !caseData) return null
    const W = 600, H = 500
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    canvas.width = W * dpr; canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    // 배경
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#0c0f1a'); bg.addColorStop(1, '#030712')
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

    // 타이틀
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 28px Pretendard, sans-serif'; ctx.textAlign = 'center'
    ctx.fillText('⚖️ 솔로몬 — 판결 후일담', W / 2, 45)

    // 당사자
    ctx.fillStyle = '#9ca3af'; ctx.font = '14px Pretendard, sans-serif'
    ctx.fillText(`${caseData.duo.partyA.name} vs ${caseData.duo.partyB.name}`, W / 2, 75)

    // 후일담 본문
    ctx.fillStyle = '#d1d5db'; ctx.font = '14px Pretendard, sans-serif'; ctx.textAlign = 'left'
    const lines = wrapText(ctx, aftermath.replace(/\n\n/g, '\n'), W - 80)
    lines.slice(0, 18).forEach((line, i) => ctx.fillText(line, 40, 110 + i * 22))

    // 해시태그
    ctx.fillStyle = '#4b5563'; ctx.font = '12px Pretendard, sans-serif'; ctx.textAlign = 'center'
    ctx.fillText('#솔로몬 #법정추리게임 #후일담', W / 2, H - 20)

    return canvas.toDataURL('image/png')
  }

  const handleShareAftermath = async () => {
    const canvas = aftermathCanvasRef.current
    if (!canvas || !aftermath) return
    renderAftermathImage()
    try {
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'))
      if (!blob) return
      const file = new File([blob], 'solomon-aftermath.png', { type: 'image/png' })
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: '솔로몬 판결 후일담', files: [file] })
      } else {
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
        a.download = 'solomon-aftermath.png'; a.click(); URL.revokeObjectURL(a.href)
      }
    } catch { /* 취소 */ }
  }

  const handleDownloadAftermath = () => {
    const canvas = aftermathCanvasRef.current
    if (!canvas || !aftermath) return
    renderAftermathImage()
    const a = document.createElement('a'); a.href = canvas.toDataURL('image/png')
    a.download = 'solomon-aftermath.png'; a.click()
  }

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

      {/* 후일담 이미지 공유 */}
      <canvas ref={aftermathCanvasRef} width={600} height={500} className="hidden" />
      <div className="flex gap-2">
        <button onClick={handleDownloadAftermath}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-xs font-semibold border border-gray-700">
          이미지 저장
        </button>
        <button onClick={handleShareAftermath}
          className="flex-1 bg-amber-700 hover:bg-amber-600 text-white py-2 rounded-lg text-xs font-semibold">
          공유하기
        </button>
      </div>
    </div>
  )
}
