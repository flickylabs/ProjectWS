import { useEffect, useRef, useState } from 'react'
import { useGameStore, useStore } from '../../store/useGameStore'
import { chatCompletion } from '../../engine/llmClient'
import { isLLMMode } from '../../hooks/useActionDispatch'
import { updateLatestAftermath } from '../../data/leaderboard'
import { buildResultSystemPrompt, buildResultUserPrompt, formatResultAsNarrative } from '../../engine/phase6ResultPromptV2'
import { resolveScriptedAftermath } from '../../engine/aftermathResolver'
import type { VerdictData, ResultV2Response, CaseMeta } from '../../engine/phase6ResultPromptV2'

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = []
  for (const paragraph of text.split('\n')) {
    let line = ''
    for (const char of paragraph) {
      const test = line + char
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line)
        line = char
      } else {
        line = test
      }
    }
    if (line) lines.push(line)
  }
  return lines
}

let cachedAftermath: string | null = null

export function resetAftermathCache() {
  cachedAftermath = null
}

function getRelationshipLabel(relType: string): string {
  if (relType === 'spouse') return '부부'
  if (relType === 'friend') return '친구'
  if (relType === 'neighbor') return '이웃'
  if (relType === 'partnership') return '동업자'
  if (relType === 'boss_employee') return '직장 관계'
  if (relType === 'tenant_landlord') return '임대인과 임차인'
  if (relType === 'family') return '가족'
  if (relType === 'headline') return '당사자'
  return '당사자'
}

function splitAftermathParagraphs(text: string): string[] {
  return text.split('\n\n').map((item) => item.trim()).filter(Boolean)
}

export default function Aftermath() {
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const verdictScore = useStore((s) => s.verdictScore)
  const [aftermath, setAftermath] = useState<string | null>(cachedAftermath)
  const [loading, setLoading] = useState(false)
  const aftermathCanvasRef = useRef<HTMLCanvasElement>(null)

  const setResolvedAftermath = (text: string) => {
    cachedAftermath = text
    setAftermath(text)
    updateLatestAftermath(text)
  }

  useEffect(() => {
    if (cachedAftermath) return
    if (!caseData || !verdictScore) return

    const scripted = resolveScriptedAftermath(caseData, verdictInput)
    if (scripted) {
      setResolvedAftermath(scripted.text)
      return
    }

    if (isLLMMode()) {
      void generateAftermath()
    } else {
      setResolvedAftermath(buildFallbackAftermath())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const generateAftermath = async () => {
    if (cachedAftermath) return
    if (!caseData || !verdictScore) return

    const scripted = resolveScriptedAftermath(caseData, verdictInput)
    if (scripted) {
      setResolvedAftermath(scripted.text)
      return
    }

    setLoading(true)
    try {
      const bridge = useGameStore.getState().phase3PromptBridge
      if (bridge) {
        const v2 = await generateAftermathV2(bridge)
        if (v2) {
          setResolvedAftermath(v2)
          setLoading(false)
          return
        }
      }

      const nameA = caseData.duo.partyA.name
      const nameB = caseData.duo.partyB.name
      const relLabel = getRelationshipLabel(caseData.meta?.relationshipType ?? caseData.duo.relationshipType ?? '')
      const selectedSolutions = verdictInput.selectedSolutions.length > 0
        ? verdictInput.selectedSolutions.join(', ')
        : '특별한 해결책 없음'
      const scoreTone = verdictScore.total >= 75
        ? '쓴 사실이 남아 있어도 정리 방향은 비교적 분명한 결말'
        : verdictScore.total >= 55
          ? '서로의 불만이 남지만 최소한의 질서는 세운 결말'
          : '억울함과 미해결 지점이 함께 남는 불완전한 결말'

      const prompt = [
        '법정 대화형 게임의 후일담을 한국어로 작성하라.',
        `당사자: ${nameA}, ${nameB}`,
        `관계: ${relLabel}`,
        `사건 배경: ${caseData.context.description.slice(0, 180)}`,
        `선택한 해결책: ${selectedSolutions}`,
        `판결 점수 분위기: ${scoreTone}`,
        '요구사항:',
        '- 3개 문단으로 쓴다.',
        '- 각 문단은 2문장 또는 3문장으로 제한한다.',
        '- 1주 뒤, 1개월 뒤, 남은 여파 순으로 전개한다.',
        '- 마지막 문단 마지막 문장만 짧은 여운 문장으로 쓴다.',
        '- 보고서체가 아니라 소설처럼 자연스럽게 쓴다.',
      ].join('\n')

      const response = await chatCompletion(
        [{ role: 'user', content: prompt }],
        { temperature: 0.9, maxTokens: 420 },
      )

      setResolvedAftermath(response.trim() || buildFallbackAftermath())
    } catch {
      setResolvedAftermath(buildFallbackAftermath())
    } finally {
      setLoading(false)
    }
  }

  const generateAftermathV2 = async (bridge: NonNullable<ReturnType<typeof useGameStore.getState>['phase3PromptBridge']>): Promise<string | null> => {
    if (!caseData || !verdictScore) return null
    try {
      const relLabel = getRelationshipLabel(caseData.meta?.relationshipType ?? caseData.duo.relationshipType ?? '')
      const caseMeta: CaseMeta = {
        caseId: bridge.caseId,
        nameA: caseData.duo.partyA.name,
        nameB: caseData.duo.partyB.name,
        relLabel,
        contextDesc: caseData.context.description.slice(0, 150),
      }
      const endingTone = verdictScore.total >= 75
        ? '정리와 회복이 함께 보이는 결말'
        : verdictScore.total >= 55
          ? '불만이 남지만 질서는 세운 결말'
          : verdictScore.total >= 35
            ? '상처와 미해결이 함께 남는 결말'
            : '후회와 거리감이 크게 남는 결말'
      const verdict: VerdictData = {
        factFindings: verdictInput.factFindings,
        responsibility: verdictInput.responsibility,
        selectedSolutions: verdictInput.selectedSolutions,
        total: verdictScore.total,
        endingTone,
      }
      const systemPrompt = buildResultSystemPrompt()
      const userPrompt = buildResultUserPrompt(bridge, caseMeta, verdict)
        + '\n\n출력은 JSON 한 개 또는 자연어 후일담 본문만 허용한다.'

      const response = await chatCompletion(
        [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
        { temperature: 0.9, maxTokens: 600 },
      )

      try {
        const jsonStr = response.replace(/```json?\s*/g, '').replace(/```/g, '').trim()
        const parsed: ResultV2Response = JSON.parse(jsonStr)
        const narrative = formatResultAsNarrative(parsed)
        if (narrative.length > 50) return narrative
      } catch {
        // raw text fallback
      }

      const trimmed = response.trim()
      return trimmed.length > 50 ? trimmed : null
    } catch {
      return null
    }
  }

  const buildFallbackAftermath = (): string => {
    if (!caseData || !verdictScore) return ''
    const nameA = caseData.duo.partyA.name
    const nameB = caseData.duo.partyB.name
    const total = verdictScore.total

    if (total >= 75) {
      return `${nameA}와 ${nameB}는 판결 직후에는 여전히 굳은 표정이었지만, 적어도 무엇이 문제였는지는 같은 문장으로 말할 수 있게 되었다.\n\n일주일쯤 지나자 서로를 향한 비난은 조금 줄었고, 대신 앞으로 지켜야 할 선과 절차를 다시 확인하는 대화가 시작됐다.\n\n완전한 화해는 아니어도, 이번에는 같은 실수를 반복하지 않겠다는 말만은 남았다.`
    }
    if (total >= 50) {
      return `${nameA}와 ${nameB}는 판결을 받아들였지만, 누구도 완전히 만족한 얼굴은 아니었다.\n\n한 달이 지나도 억울함과 불만은 남았지만, 적어도 무엇을 다시 건드리면 같은 싸움이 반복되는지는 서로 알고 있었다.\n\n정리가 곧 화해는 아니지만, 더 크게 무너지는 일은 막아 낸 결말이었다.`
    }
    return `${nameA}와 ${nameB}는 판결 뒤에도 쉽게 자리를 뜨지 못했다.\n\n사실이 드러났다고 해서 감정이 정리된 것은 아니었고, 남은 말들은 대부분 다음 갈등의 씨앗처럼 방 안에 남아 있었다.\n\n이번 결말은 봉합보다 경고에 가까웠다.`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 gap-2">
        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-gray-400">후일담을 정리하고 있습니다...</span>
      </div>
    )
  }

  if (!aftermath) return null

  const renderAftermathImage = (): string | null => {
    const canvas = aftermathCanvasRef.current
    if (!canvas || !caseData || !verdictScore) return null

    const W = 600
    const H = 600
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    const dpr = window.devicePixelRatio || 1
    const paragraphs = splitAftermathParagraphs(aftermath)

    ctx.font = '14px Pretendard, sans-serif'
    const paragraphLines = paragraphs.map((item) => wrapText(ctx, item, W - 80))

    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#0c0f1a')
    bg.addColorStop(1, '#030712')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    ctx.strokeStyle = '#d9770620'
    ctx.lineWidth = 1
    ctx.strokeRect(20, 20, W - 40, H - 40)

    ctx.fillStyle = '#fbbf24'
    ctx.font = 'bold 24px Pretendard, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('⚖️ 솔로몬의 판결 후일담', W / 2, 55)

    ctx.font = 'bold 18px Pretendard, sans-serif'
    ctx.fillText(`${verdictScore.total}점`, W / 2, 85)
    ctx.fillStyle = '#6b7280'
    ctx.font = '13px Pretendard, sans-serif'
    ctx.fillText(`${caseData.duo.partyA.name} vs ${caseData.duo.partyB.name}`, W / 2, 105)

    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 0.5
    ctx.beginPath()
    ctx.moveTo(60, 118)
    ctx.lineTo(W - 60, 118)
    ctx.stroke()

    let y = 140
    paragraphLines.forEach((lines, index) => {
      const isLast = index === paragraphLines.length - 1
      ctx.fillStyle = isLast ? '#fbbf24' : '#d1d5db'
      ctx.font = isLast ? 'italic 14px Pretendard, sans-serif' : '14px Pretendard, sans-serif'
      ctx.textAlign = isLast ? 'center' : 'left'
      lines.forEach((line) => {
        ctx.fillText(line, isLast ? W / 2 : 40, y)
        y += 20
      })
      y += 12
    })

    ctx.fillStyle = '#4b5563'
    ctx.font = '12px Pretendard, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('#솔로몬 #판결후일담', W / 2, H - 30)

    return canvas.toDataURL('image/png')
  }

  const handleShareAftermath = async () => {
    const canvas = aftermathCanvasRef.current
    if (!canvas) return
    renderAftermathImage()
    try {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!blob) return
      const file = new File([blob], 'solomon-aftermath.png', { type: 'image/png' })
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: '솔로몬 후일담', files: [file] })
      } else {
        const anchor = document.createElement('a')
        anchor.href = URL.createObjectURL(blob)
        anchor.download = 'solomon-aftermath.png'
        anchor.click()
        URL.revokeObjectURL(anchor.href)
      }
    } catch {
      // share cancelled
    }
  }

  const handleDownloadAftermath = () => {
    const canvas = aftermathCanvasRef.current
    if (!canvas) return
    renderAftermathImage()
    const anchor = document.createElement('a')
    anchor.href = canvas.toDataURL('image/png')
    anchor.download = 'solomon-aftermath.png'
    anchor.click()
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-amber-400 text-center">판결 이후</h3>
      <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-5">
        {splitAftermathParagraphs(aftermath).map((paragraph, index, all) => (
          <p
            key={index}
            className={`text-sm leading-relaxed ${
              index === all.length - 1
                ? 'text-amber-400 italic mt-5 text-center font-medium'
                : 'text-gray-300 mb-5'
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <canvas ref={aftermathCanvasRef} className="hidden" />
      <div className="flex gap-2">
        <button
          onClick={handleDownloadAftermath}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-xs font-semibold border border-gray-700"
        >
          이미지 저장
        </button>
        <button
          onClick={handleShareAftermath}
          className="flex-1 bg-amber-700 hover:bg-amber-600 text-white py-2 rounded-lg text-xs font-semibold"
        >
          공유하기
        </button>
      </div>
    </div>
  )
}
