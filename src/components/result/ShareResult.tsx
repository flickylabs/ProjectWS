import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

export default function ShareResult() {
  const verdictScore = useGameStore((s) => s.verdictScore)
  const caseData = useGameStore((s) => s.caseData)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!verdictScore || !caseData || !canvasRef.current) return
    const url = renderShareImage(canvasRef.current, verdictScore, caseData.duo.relationshipType)
    setImageUrl(url)
  }, [verdictScore, caseData])

  if (!verdictScore || !caseData) return null

  const text = buildShareText(verdictScore.total, verdictScore.insight, verdictScore.authority, verdictScore.wisdom, caseData.duo.relationshipType)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      alert('클립보드에 복사되었습니다!')
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('클립보드에 복사되었습니다!')
    }
  }

  const handleShareImage = async () => {
    if (!canvasRef.current) return
    try {
      const blob = await new Promise<Blob | null>((res) => canvasRef.current!.toBlob(res, 'image/png'))
      if (!blob) return
      const file = new File([blob], 'solomon-result.png', { type: 'image/png' })
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: '솔로몬 판결 결과', text, files: [file] })
      } else {
        // 파일 공유 불가 → 다운로드
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = 'solomon-result.png'
        a.click()
        URL.revokeObjectURL(a.href)
      }
    } catch { /* 취소 */ }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: '솔로몬 판결 결과', text })
      } catch { /* 취소 */ }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="space-y-3">
      {/* 공유 이미지 미리보기 */}
      <canvas ref={canvasRef} width={600} height={400} className="hidden" />
      {imageUrl && (
        <div className="rounded-lg overflow-hidden border border-gray-700">
          <img src={imageUrl} alt="판결 결과 카드" className="w-full" />
        </div>
      )}

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
        <pre className="text-xs text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{text}</pre>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 rounded-lg text-xs font-semibold transition-colors"
        >
          <Emoji char="📋" size={12} /> 텍스트 복사
        </button>
        <button
          onClick={handleShareImage}
          className="flex-1 bg-amber-700 hover:bg-amber-600 text-white py-2 rounded-lg text-xs font-semibold transition-colors"
        >
          <Emoji char="📤" size={12} /> 이미지 공유
        </button>
      </div>
      {typeof navigator.share === 'function' && (
        <button
          onClick={handleShare}
          className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-xs font-semibold transition-colors"
        >
          텍스트로 공유
        </button>
      )}
    </div>
  )
}

const RELATION_LABELS: Record<string, string> = {
  spouse: '부부', neighbor: '이웃', boss_employee: '직장',
  partnership: '동업', family: '가족', tenant_landlord: '세입자', friend: '친구',
}

function getRating(total: number): string {
  if (total >= 90) return '전설적인 재판관'
  if (total >= 75) return '현명한 재판관'
  if (total >= 60) return '유능한 재판관'
  if (total >= 40) return '보통의 재판관'
  if (total >= 20) return '미숙한 재판관'
  return '재판 실패'
}

function renderShareImage(
  canvas: HTMLCanvasElement,
  score: { total: number; insight: number; authority: number; wisdom: number },
  relationType: string,
): string {
  const W = 600, H = 400
  const ctx = canvas.getContext('2d')!
  const dpr = window.devicePixelRatio || 1
  canvas.width = W * dpr
  canvas.height = H * dpr
  ctx.scale(dpr, dpr)

  // 배경
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#0c0f1a')
  bg.addColorStop(1, '#030712')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // 장식 원
  ctx.globalAlpha = 0.06
  ctx.fillStyle = '#d97706'
  ctx.beginPath(); ctx.arc(W * 0.2, H * 0.3, 120, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(W * 0.8, H * 0.7, 80, 0, Math.PI * 2); ctx.fill()
  ctx.globalAlpha = 1

  // 타이틀
  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 36px Pretendard, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('⚖️ 솔로몬', W / 2, 55)

  // 등급
  ctx.fillStyle = '#9ca3af'
  ctx.font = '16px Pretendard, sans-serif'
  ctx.fillText(getRating(score.total), W / 2, 85)

  // 점수
  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 64px Pretendard, sans-serif'
  ctx.fillText(`${score.total}`, W / 2, 165)
  ctx.fillStyle = '#92710a'
  ctx.font = '20px Pretendard, sans-serif'
  ctx.fillText('점', W / 2 + 50, 165)

  // 바 차트
  const bars = [
    { label: '🔍 통찰', value: score.insight, color: '#60a5fa' },
    { label: '⚖️ 권위', value: score.authority, color: '#fbbf24' },
    { label: '💡 지혜', value: score.wisdom, color: '#34d399' },
  ]
  const barY0 = 210, barH = 22, barGap = 36, barMaxW = 280
  bars.forEach((bar, i) => {
    const y = barY0 + i * barGap
    // 라벨
    ctx.fillStyle = '#d1d5db'
    ctx.font = '14px Pretendard, sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(bar.label, 145, y + 16)
    // 바 배경
    ctx.fillStyle = '#1f2937'
    ctx.beginPath()
    ctx.roundRect(160, y, barMaxW, barH, 4)
    ctx.fill()
    // 바 값
    const w = Math.max(4, (bar.value / 100) * barMaxW)
    ctx.fillStyle = bar.color
    ctx.beginPath()
    ctx.roundRect(160, y, w, barH, 4)
    ctx.fill()
    // 수치
    ctx.fillStyle = '#f3f4f6'
    ctx.font = 'bold 13px Pretendard, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(`${bar.value}`, 160 + barMaxW + 10, y + 16)
  })

  // 사건 유형
  ctx.fillStyle = '#6b7280'
  ctx.font = '13px Pretendard, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(`사건: ${RELATION_LABELS[relationType] ?? relationType} 분쟁`, W / 2, 350)

  // 해시태그
  ctx.fillStyle = '#4b5563'
  ctx.font = '12px Pretendard, sans-serif'
  ctx.fillText('#솔로몬 #법정추리게임', W / 2, 380)

  return canvas.toDataURL('image/png')
}

function buildShareText(total: number, insight: number, authority: number, wisdom: number, relationType: string): string {
  const rating = getRating(total)
  const bars = (v: number) => '█'.repeat(Math.floor(v / 10)) + '░'.repeat(10 - Math.floor(v / 10))

  return `⚖️ 솔로몬 — ${rating}

📊 ${total}점
🔍 통찰 ${bars(insight)} ${insight}
⚖️ 권위 ${bars(authority)} ${authority}
💡 지혜 ${bars(wisdom)} ${wisdom}

사건: ${RELATION_LABELS[relationType] ?? relationType} 분쟁

#솔로몬 #법정추리게임`
}
