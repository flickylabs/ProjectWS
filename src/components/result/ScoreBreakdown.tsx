import { useEffect, useState } from 'react'
import type { VerdictScore } from '../../types'

interface Props {
  score: VerdictScore
}

export default function ScoreBreakdown({ score }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <AnimatedGauge label="통찰" value={score.insight} icon="🔍" desc="사실 적중도" delay={0} />
        <AnimatedGauge label="권위" value={score.authority} icon="⚖️" desc="법정 통제" delay={300} />
        <AnimatedGauge label="지혜" value={score.wisdom} icon="💡" desc="해결 적절성" delay={600} />
      </div>
    </div>
  )
}

function AnimatedGauge({ label, value, icon, desc, delay }: {
  label: string; value: number; icon: string; desc: string; delay: number
}) {
  const [displayed, setDisplayed] = useState(0)
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      // 숫자 카운트업
      let current = 0
      const interval = setInterval(() => {
        current += 2
        if (current >= value) {
          current = value
          clearInterval(interval)
        }
        setDisplayed(current)
      }, 20)

      // 바 애니메이션
      setBarWidth(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  const color = value >= 70 ? 'emerald' : value >= 40 ? 'yellow' : 'red'
  const textColor = `text-${color}-400`
  const barColor = `bg-${color}-600`

  // Tailwind doesn't support dynamic class names, so use style
  const colorMap = { emerald: '#34d399', yellow: '#facc15', red: '#f87171' }
  const barColorHex = colorMap[color]

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-3 text-center">
      <div className="text-lg mb-1">{icon}</div>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-2xl font-bold" style={{ color: barColorHex }}>{displayed}</div>
      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2 overflow-hidden">
        <div
          className="h-1.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${barWidth}%`, backgroundColor: barColorHex }}
        />
      </div>
      <div className="text-xs text-gray-600 mt-1">{desc}</div>
    </div>
  )
}
