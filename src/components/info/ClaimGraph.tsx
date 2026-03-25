import { useGameStore } from '../../store/useGameStore'
import type { ClaimStatus } from '../../types'

const STATUS_STYLE: Record<ClaimStatus, { border: string; icon: string }> = {
  normal: { border: 'border-gray-700', icon: '' },
  conflict: { border: 'border-red-700', icon: '⚡' },
  changed: { border: 'border-yellow-700', icon: '🔄' },
  official: { border: 'border-blue-600', icon: '📌' },
  collapsed: { border: 'border-emerald-700 line-through', icon: '✅' },
}

export default function ClaimGraph() {
  const claimGraph = useGameStore((s) => s.claimGraph)
  const caseData = useGameStore((s) => s.caseData)

  if (!caseData) return null

  // 쟁점별로 그룹화
  const byDispute = new Map<string, typeof claimGraph>()
  for (const claim of claimGraph) {
    if (!byDispute.has(claim.disputeId)) byDispute.set(claim.disputeId, [])
    byDispute.get(claim.disputeId)!.push(claim)
  }

  if (byDispute.size === 0) {
    return (
      <div className="text-xs text-gray-600 px-1">
        심문이 시작되면 주장이 여기에 정리됩니다.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="text-xs text-gray-500 font-semibold px-1">주장 그래프</div>
      {[...byDispute.entries()].map(([disputeId, claims]) => {
        const dispute = caseData.disputes.find((d) => d.id === disputeId)
        return (
          <div key={disputeId} className="space-y-1">
            <div className="text-xs text-gray-400 font-semibold">{dispute?.name}</div>
            {claims.map((c) => {
              const style = STATUS_STYLE[c.status]
              const nameColor = c.claimant === 'a' ? 'text-blue-400' : 'text-rose-400'
              const name = c.claimant === 'a'
                ? caseData.duo.partyA.name
                : caseData.duo.partyB.name
              return (
                <div key={c.id} className={`border rounded px-2 py-1 ${style.border} bg-gray-800/30`}>
                  <div className="flex items-center gap-1">
                    {style.icon && <span className="text-xs">{style.icon}</span>}
                    <span className={`text-xs font-semibold ${nameColor}`}>{name}</span>
                  </div>
                  <div className={`text-xs text-gray-400 ${c.status === 'collapsed' ? 'line-through' : ''}`}>
                    {c.summary}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
