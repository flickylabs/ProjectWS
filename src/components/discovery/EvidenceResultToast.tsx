/**
 * 증거 제시 결과 토스트 — 버팀/균열/붕괴 3단계 시각 피드백
 * GPT 의견 3, 4 기반.
 */

import { useEffect, useState } from 'react'

export type EvidenceResultType = 'hold' | 'crack' | 'collapse'

interface Props {
  result: EvidenceResultType
  evidenceName: string
  onDone: () => void
}

const CONFIG: Record<EvidenceResultType, {
  label: string
  icon: string
  color: string
  bg: string
  border: string
  description: string
}> = {
  hold: {
    label: '버팀',
    icon: '🛡️',
    color: 'text-gray-400',
    bg: 'bg-gray-800/80',
    border: 'border-gray-700/50',
    description: '상대가 방어를 유지했습니다.',
  },
  crack: {
    label: '균열',
    icon: '⚡',
    color: 'text-orange-400',
    bg: 'bg-orange-950/60',
    border: 'border-orange-600/50',
    description: '방어에 금이 갔습니다!',
  },
  collapse: {
    label: '붕괴',
    icon: '💥',
    color: 'text-red-400',
    bg: 'bg-red-950/60',
    border: 'border-red-600/50',
    description: '방어선이 무너졌습니다!',
  },
}

export default function EvidenceResultToast({ result, evidenceName, onDone }: Props) {
  const [visible, setVisible] = useState(true)
  const cfg = CONFIG[result]

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 300)
    }, result === 'collapse' ? 2500 : 1800)
    return () => clearTimeout(timer)
  }, [result, onDone])

  return (
    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className={`${cfg.bg} ${cfg.border} border rounded-xl px-4 py-3 shadow-lg max-w-xs ${
        result === 'collapse' ? 'animate-shake' : result === 'crack' ? 'animate-scale-in' : ''
      }`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{cfg.icon}</span>
          <div>
            <div className={`text-sm font-bold ${cfg.color}`}>{cfg.label}</div>
            <div className="text-[11px] text-gray-400">{cfg.description}</div>
          </div>
        </div>
        <div className="text-[10px] text-gray-500 mt-1">{evidenceName}</div>
      </div>
    </div>
  )
}
