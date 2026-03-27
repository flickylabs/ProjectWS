import { useGameStore } from '../../store/useGameStore'

interface Props {
  onClose: () => void
}

export default function TestimonyModal({ onClose }: Props) {
  const analysis = useGameStore((s) => s.testimonyAnalysis)
  const caseData = useGameStore((s) => s.caseData)

  if (!analysis || !caseData) return null

  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm max-h-[75vh] overflow-y-auto animate-scale-in" onClick={e => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            <h3 className="text-sm font-bold text-amber-400">진술 분석 결과</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg">✕</button>
        </div>

        <div className="p-4 space-y-4">
          {/* A의 주장 */}
          {analysis.claimsA.length > 0 && (
            <AnalysisSection
              icon="🔵"
              title={`${nameA}의 핵심 주장`}
              items={analysis.claimsA}
              color="blue"
            />
          )}

          {/* B의 주장 */}
          {analysis.claimsB.length > 0 && (
            <AnalysisSection
              icon="🔴"
              title={`${nameB}의 핵심 주장`}
              items={analysis.claimsB}
              color="rose"
            />
          )}

          {/* 모순 */}
          {analysis.contradictions.length > 0 && (
            <AnalysisSection
              icon="⚠️"
              title="발견된 모순"
              items={analysis.contradictions}
              color="amber"
            />
          )}

          {/* 미해명 */}
          {analysis.unknowns.length > 0 && (
            <AnalysisSection
              icon="❓"
              title="미해명 사항"
              items={analysis.unknowns}
              color="gray"
            />
          )}
        </div>

        <div className="px-4 pb-4">
          <button onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold transition-all active:scale-95">
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

const COLOR_MAP: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  blue:  { border: 'border-blue-800/40', bg: 'bg-blue-950/20', text: 'text-blue-300', dot: 'bg-blue-500' },
  rose:  { border: 'border-rose-800/40', bg: 'bg-rose-950/20', text: 'text-rose-300', dot: 'bg-rose-500' },
  amber: { border: 'border-amber-800/40', bg: 'bg-amber-950/20', text: 'text-amber-300', dot: 'bg-amber-500' },
  gray:  { border: 'border-gray-700/40', bg: 'bg-gray-800/20', text: 'text-gray-400', dot: 'bg-gray-500' },
}

function AnalysisSection({ icon, title, items, color }: {
  icon: string; title: string; items: string[]; color: string
}) {
  const c = COLOR_MAP[color] ?? COLOR_MAP.gray

  return (
    <div className={`border ${c.border} ${c.bg} rounded-xl p-3`}>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-sm">{icon}</span>
        <span className={`text-xs font-bold ${c.text}`}>{title}</span>
      </div>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`} />
            <p className="text-xs text-gray-300 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
