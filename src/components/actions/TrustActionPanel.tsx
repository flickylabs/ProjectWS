import type { TrustActionType, PartyId } from '../../types'
import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

interface Props {
  target: PartyId | null
  onAction: (actionType: TrustActionType) => void
}

const TRUST_ACTIONS: { type: TrustActionType; label: string; icon: string; desc: string; effect: string }[] = [
  {
    type: 'confidential_protection',
    label: '비공개 보호',
    icon: '🔒',
    desc: '이 내용은 상대에게 공개하지 않겠다고 약속',
    effect: '신뢰 +20, 공포 -15',
  },
  {
    type: 'separation',
    label: '분리 심문',
    icon: '🚪',
    desc: '상대를 3턴간 배제하고 1:1로 심문 (조사토큰 1)',
    effect: '보복 우려 -10, 3턴간 끼어들기 차단',
  },
]

export default function TrustActionPanel({ target, onAction }: Props) {
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)

  if (!target) {
    return <div className="text-gray-500 text-sm">먼저 대상을 선택하세요.</div>
  }

  const agent = target === 'a' ? agentA : agentB
  const trust = agent.trustState

  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-500 font-semibold">신뢰 / 보호 행동</div>

      {/* 현재 신뢰 상태 미리보기 */}
      <div className="flex gap-3 text-xs">
        <TrustMeter label="신뢰" value={trust.trustTowardJudge} color="emerald" />
        <TrustMeter label="공포" value={trust.fearOfExposure} color="orange" />
        <TrustMeter label="보복 우려" value={trust.retaliationWorry} color="red" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {TRUST_ACTIONS.map((action) => {
          const disabled = false
          return (
            <button
              key={action.type}
              onClick={() => !disabled && onAction(action.type)}
              disabled={disabled}
              className={`text-left border rounded-lg p-2 transition-colors ${
                disabled
                  ? 'border-gray-800 bg-gray-900 text-gray-700 cursor-not-allowed'
                  : 'border-gray-700 bg-gray-800/60 hover:border-emerald-600 text-gray-300'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Emoji char={action.icon} size={14} />
                <span className="text-xs font-semibold">{action.label}</span>
              </div>
              <div className="text-xs text-gray-500">{action.desc}</div>
              <div className="text-xs text-emerald-600 mt-1">{action.effect}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TrustMeter({ label, value, color }: { label: string; value: number; color: string }) {
  const barColors: Record<string, string> = {
    emerald: 'bg-emerald-600',
    orange: 'bg-orange-600',
    red: 'bg-red-600',
  }
  const textColors: Record<string, string> = {
    emerald: 'text-emerald-400',
    orange: 'text-orange-400',
    red: 'text-red-400',
  }
  return (
    <div className="flex-1">
      <div className="flex justify-between mb-0.5">
        <span className="text-gray-500">{label}</span>
        <span className={textColors[color]}>{value}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1">
        <div className={`h-1 rounded-full ${barColors[color]}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
