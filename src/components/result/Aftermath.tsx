import { useEffect, useState, useRef } from 'react'
import { useGameStore } from '../../store/useGameStore'
import { chatCompletion } from '../../engine/llmClient'
import { isLLMMode } from '../../hooks/useActionDispatch'
import { updateLatestAftermath } from '../../data/leaderboard'
import { buildResultSystemPrompt, buildResultUserPrompt, formatResultAsNarrative } from '../../engine/phase6ResultPromptV2'
import type { VerdictData, ResultV2Response, CaseMeta } from '../../engine/phase6ResultPromptV2'

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
  const aftermathCanvasRef = useRef<HTMLCanvasElement>(null)

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
    if (cachedAftermath) return // 이중 호출 방지
    if (!caseData || !verdictScore) return
    setLoading(true)
    try {
      // V2 bridge가 있으면 구조화 로그 기반 프롬프트 사용
      const bridge = useGameStore.getState().phase3PromptBridge
      if (bridge) {
        const result = await generateAftermathV2(bridge)
        if (result) {
          cachedAftermath = result
          setAftermath(result)
          updateLatestAftermath(result)
          setLoading(false)
          return
        }
        // V2 실패 시 기존 로직으로 fallback
      }

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

      // 3인칭 서술용 관계 명칭 자동 추론
      const relLabel = (() => {
        if (relType === 'spouse') return '부부'
        if (relType === 'friend') return '친구'
        if (relType === 'neighbor') return '이웃'
        if (relType === 'partnership') return '동업자'
        if (relType === 'boss_employee') return '동료'
        if (relType === 'tenant_landlord') return '임대인과 임차인'
        if (relType === 'family') {
          const all = `${callA} ${callB} ${partyA.callTerms?.toJudge ?? ''} ${partyB.callTerms?.toJudge ?? ''}`
          const hasMom = all.includes('엄마') || all.includes('어머니') || all.includes('어머님')
          const hasDad = all.includes('아빠') || all.includes('아버지') || all.includes('아버님')
          const hasSon = all.includes('아들')
          const hasDaughter = all.includes('딸')
          // 부모-자식
          if (hasMom && hasDaughter) return '모녀'
          if (hasMom && (hasSon || !hasDaughter)) return '모자'
          if (hasDad && hasDaughter) return '부녀'
          if (hasDad && (hasSon || !hasDaughter)) return '부자'
          // 형제자매 — 호칭으로 판단
          if (all.includes('언니')) return '자매'
          if (all.includes('누나')) return '남매'
          if (all.includes('오빠')) return '남매'
          if (all.includes('형')) return '형제'
          return '가족'
        }
        return '두 사람'
      })()

      const prompt = `법정 심문 게임의 판결 후일담을 작성하세요.

당사자:
- ${nameA} (${partyA.age ?? ''}세${partyA.occupation ? ', ' + partyA.occupation : ''})
- ${nameB} (${partyB.age ?? ''}세${partyB.occupation ? ', ' + partyB.occupation : ''})
두 사람의 관계: ${relLabel}
대화 시 호칭: ${nameA}→${nameB}: "${callA}", ${nameB}→${nameA}: "${callB}"

★ 3인칭 서술 시 "${relLabel}"로 관계를 표현하세요. 다른 관계 명칭으로 바꾸지 마세요.
배경: ${caseData.context.description.slice(0, 150)}
해결책: ${solutions}
점수: ${verdictScore.total}점 (${endingTone})

규칙:
- 판결 이후 1주~1개월 후 상황을 2~3문단으로 묘사
- 각 문단 2~3문장. 총 270~360자
- 두 사람의 관계 변화와 내면을 담담하게
- 호칭을 나이/관계에 맞게 사용
- 마지막 줄은 반드시 "교훈 한 문장"만. 형식: "~~~" (큰따옴표로 감싼 한 문장). 부연 설명 없이 교훈만.
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
      const errMsg = err instanceof Error ? err.message : String(err)
      console.error('[Aftermath] 후일담 생성 실패:', errMsg)
      const fb = buildFallbackAftermath() + `\n\n⚠️ AI 후일담 생성 실패: ${errMsg.slice(0, 80)}`
      cachedAftermath = fb
      setAftermath(fb)
      updateLatestAftermath(fb)
    }
    setLoading(false)
  }

  const generateAftermathV2 = async (bridge: NonNullable<ReturnType<typeof useGameStore.getState>['phase3PromptBridge']>): Promise<string | null> => {
    if (!caseData || !verdictScore || !verdictInput || !bridge) return null
    try {
      const relLabel = caseData.meta?.relationshipType ?? caseData.duo.relationshipType ?? '두 사람'
      const caseMeta: CaseMeta = {
        caseId: bridge.caseId,
        nameA: caseData.duo.partyA.name,
        nameB: caseData.duo.partyB.name,
        relLabel,
        contextDesc: caseData.context.description.slice(0, 150),
      }
      const endingTone = verdictScore.total >= 75 ? '희망적'
        : verdictScore.total >= 55 ? '씁쓸하지만 의미 있는'
        : verdictScore.total >= 35 ? '아쉽고 불완전한'
        : '씁쓸하고 후회가 남는'
      const verdict: VerdictData = {
        factFindings: verdictInput.factFindings,
        responsibility: verdictInput.responsibility,
        selectedSolutions: verdictInput.selectedSolutions,
        total: verdictScore.total,
        endingTone,
      }
      const systemPrompt = buildResultSystemPrompt()
      const userPrompt = buildResultUserPrompt(bridge, caseMeta, verdict)
        + `\n\n출력은 반드시 위 JSON 형식으로만 답하라. 한국어 소설체로 작성하라.`

      let response = ''
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          response = await chatCompletion(
            [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
            { temperature: 0.85, maxTokens: 600 },
          )
          if (response.trim()) break
        } catch (retryErr) {
          if (attempt === 0) await new Promise(r => setTimeout(r, 2000))
          else throw retryErr
        }
      }

      // JSON 파싱 시도 → 서술형 변환
      try {
        const jsonStr = response.replace(/```json?\s*/g, '').replace(/```/g, '').trim()
        const parsed: ResultV2Response = JSON.parse(jsonStr)
        const narrative = formatResultAsNarrative(parsed)
        if (narrative.length > 50) return narrative
      } catch {
        // JSON 파싱 실패 시 raw text 사용
      }
      if (response.trim().length > 50) return response.trim()
      return null
    } catch (err) {
      console.warn('[Aftermath V2] fallback to legacy:', err)
      return null
    }
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

  const renderAftermathImage = (): string | null => {
    const canvas = aftermathCanvasRef.current
    if (!canvas || !aftermath || !caseData || !verdictScore) return null
    const W = 600, FIXED_H = 600 // 정사각
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1

    const paragraphs = aftermath.split('\n\n')
    const isLastQuote = (i: number) => i === paragraphs.length - 1

    // 본문 줄 수 계산 (높이 동적)
    ctx.font = '14px Pretendard, sans-serif'
    let totalLines = 0
    const paraLines: string[][] = []
    for (const p of paragraphs) {
      const lines = wrapText(ctx, p, W - 80)
      paraLines.push(lines)
      totalLines += lines.length
    }
    const H = FIXED_H // 정사각 고정

    canvas.width = W * dpr; canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    // 배경
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#0c0f1a'); bg.addColorStop(1, '#030712')
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

    // 상단 프레임 라인
    ctx.strokeStyle = '#d9770620'; ctx.lineWidth = 1
    ctx.strokeRect(20, 20, W - 40, H - 40)

    // ⚖️ 이모지 + 타이틀
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 24px Pretendard, sans-serif'; ctx.textAlign = 'center'
    ctx.fillText('⚖️ 솔로몬 — 판결 후일담', W / 2, 55)

    // 점수 + 당사자
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 18px Pretendard, sans-serif'
    ctx.fillText(`${verdictScore.total}점`, W / 2, 85)
    ctx.fillStyle = '#6b7280'; ctx.font = '13px Pretendard, sans-serif'
    ctx.fillText(`${caseData.duo.partyA.name} vs ${caseData.duo.partyB.name}`, W / 2, 105)

    // 구분선
    ctx.strokeStyle = '#374151'; ctx.lineWidth = 0.5
    ctx.beginPath(); ctx.moveTo(60, 118); ctx.lineTo(W - 60, 118); ctx.stroke()

    // 본문 — 단락별 간격
    let y = 140
    paraLines.forEach((lines, pi) => {
      if (isLastQuote(pi)) {
        // 마지막 명언: 중앙 정렬 + 노란색
        ctx.fillStyle = '#fbbf24'; ctx.font = 'italic 14px Pretendard, sans-serif'; ctx.textAlign = 'center'
        lines.forEach(line => { ctx.fillText(line, W / 2, y); y += 20 })
      } else {
        // 본문: 좌측 정렬 + 흰색
        ctx.fillStyle = '#d1d5db'; ctx.font = '14px Pretendard, sans-serif'; ctx.textAlign = 'left'
        lines.forEach(line => { ctx.fillText(line, 40, y); y += 20 })
      }
      y += 12 // 단락 간격
    })

    // 해시태그
    ctx.fillStyle = '#4b5563'; ctx.font = '12px Pretendard, sans-serif'; ctx.textAlign = 'center'
    ctx.fillText('#솔로몬 #법정추리게임', W / 2, H - 30)

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
      <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-5">
        {aftermath.split('\n\n').map((paragraph, i, arr) => (
          <p key={i} className={`text-sm leading-relaxed ${
            i === arr.length - 1
              ? 'text-amber-400 italic mt-5 text-center font-medium'
              : 'text-gray-300 mb-5'
          }`}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* 후일담 이미지 공유 */}
      <canvas ref={aftermathCanvasRef} className="hidden" />
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
