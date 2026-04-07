import { useState } from 'react'
import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

export default function VerdictSummaryTab() {
  const summary = useStore((s) => s.verdictSummary)
  const [copied, setCopied] = useState(false)

  if (!summary) {
    return (
      <div className="text-center text-gray-500 py-8 text-sm">
        판결문이 생성되지 않았습니다.
      </div>
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary.fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API 실패 시 fallback
      const textarea = document.createElement('textarea')
      textarea.value = summary.fullText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-3">
      {/* 제목 */}
      <h3 className="text-sm font-bold text-amber-400 text-center">
        <Emoji char="📜" size={14} /> {summary.title}
      </h3>

      {/* 사건 요약 */}
      <p className="text-xs text-gray-300 leading-relaxed">{summary.caseSummary}</p>

      {/* 책임 배분 */}
      <div className="bg-gray-800/50 rounded-lg px-3 py-2 space-y-1">
        <div className="text-xs font-semibold text-gray-400">책임 배분</div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-300">{summary.responsibility.partyA}</span>
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${summary.responsibility.percentA}%` }}
            />
          </div>
          <span className="text-xs text-amber-400 font-bold w-8 text-right">
            {summary.responsibility.percentA}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-300">{summary.responsibility.partyB}</span>
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${summary.responsibility.percentB}%` }}
            />
          </div>
          <span className="text-xs text-blue-400 font-bold w-8 text-right">
            {summary.responsibility.percentB}%
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{summary.responsibilityReason}</p>
      </div>

      {/* 결정적 증거 */}
      <div className="bg-gray-800/50 rounded-lg px-3 py-2">
        <div className="text-xs font-semibold text-gray-400 mb-1">결정적 증거</div>
        {summary.keyEvidence.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {summary.keyEvidence.map((e, i) => (
              <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                {e}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-600">진술 분석 위주로 진행</p>
        )}
      </div>

      {/* 결정적 순간 */}
      <div className="bg-gray-800/50 rounded-lg px-3 py-2">
        <div className="text-xs font-semibold text-gray-400 mb-1">결정적 순간</div>
        <p className="text-xs text-gray-300">{summary.keyMoment}</p>
      </div>

      {/* 해결 방향 */}
      <div className="bg-gray-800/50 rounded-lg px-3 py-2">
        <div className="text-xs font-semibold text-gray-400 mb-1">해결 방향</div>
        <p className="text-xs text-gray-300">{summary.resolution}</p>
      </div>

      {/* 재판관 성향 */}
      <p className="text-xs text-gray-500 text-center italic">{summary.judgeStyle}</p>

      {/* 공유 버튼 */}
      <button
        onClick={handleCopy}
        className={`w-full text-xs py-2 rounded-lg font-semibold transition-colors ${
          copied
            ? 'bg-emerald-700 text-emerald-100'
            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
        }`}
      >
        {copied ? '복사 완료!' : '판결문 복사하기'}
      </button>
    </div>
  )
}
