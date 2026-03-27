import { useGameStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

export default function ShareResult() {
  const verdictScore = useGameStore((s) => s.verdictScore)
  const caseData = useGameStore((s) => s.caseData)

  if (!verdictScore || !caseData) return null

  const text = buildShareText(verdictScore.total, verdictScore.insight, verdictScore.authority, verdictScore.wisdom, caseData.duo.relationshipType)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      alert('클립보드에 복사되었습니다!')
    } catch {
      // 폴백: 텍스트 선택
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('클립보드에 복사되었습니다!')
    }
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
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
        <pre className="text-xs text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{text}</pre>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 rounded-lg text-xs font-semibold transition-colors"
        >
          <Emoji char="📋" size={12} /> 복사
        </button>
        {typeof navigator.share === 'function' && (
          <button
            onClick={handleShare}
            className="flex-1 bg-amber-700 hover:bg-amber-600 text-white py-2 rounded-lg text-xs font-semibold transition-colors"
          >
            <Emoji char="📤" size={12} /> 공유
          </button>
        )}
      </div>
    </div>
  )
}

function buildShareText(total: number, insight: number, authority: number, wisdom: number, relationType: string): string {
  const rating = total >= 90 ? '전설적인 재판관' : total >= 75 ? '현명한 재판관' : total >= 60 ? '유능한 재판관' : total >= 40 ? '보통의 재판관' : '미숙한 재판관'
  const bars = (v: number) => '█'.repeat(Math.floor(v / 10)) + '░'.repeat(10 - Math.floor(v / 10))

  const relationLabels: Record<string, string> = {
    spouse: '부부', neighbor: '이웃', boss_employee: '직장',
    partnership: '동업', family: '가족', tenant_landlord: '세입자', friend: '친구',
  }

  return `⚖️ 솔로몬 — ${rating}

📊 ${total}점
🔍 통찰 ${bars(insight)} ${insight}
⚖️ 권위 ${bars(authority)} ${authority}
💡 지혜 ${bars(wisdom)} ${wisdom}

사건: ${relationLabels[relationType] ?? relationType} 분쟁

#솔로몬 #법정추리게임`
}
