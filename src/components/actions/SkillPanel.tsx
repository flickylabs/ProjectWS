import type { SkillType, PartyId } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import { SKILL_COSTS, SKILL_LIMITS } from '../../utils/constants'

interface Props {
  target: PartyId | null
  onUseSkill: (skillType: SkillType, disputeId?: string) => void
  disputes: { id: string; name: string }[]
}

const SKILLS: { type: SkillType; label: string; icon: string; desc: string; needsDispute: boolean }[] = [
  {
    type: 'immediate_answer',
    label: '즉답 요구',
    icon: '⚡',
    desc: '다음 1개 질문에 거짓말 불가. lie_state → S5.',
    needsDispute: true,
  },
  {
    type: 'cross_examination',
    label: '교차 대질',
    icon: '⚔️',
    desc: 'A와 B를 동시에 같은 쟁점에 발언. 자동 모순 노출.',
    needsDispute: true,
  },
  {
    type: 'evasion_reading',
    label: '회피 신호 판독',
    icon: '👁️',
    desc: '대상의 현재 행동 징후를 상세히 공개.',
    needsDispute: false,
  },
  {
    type: 'statement_comparison',
    label: '이전 진술 대조',
    icon: '📝',
    desc: '주장 그래프에서 모순 가능성 1개 자동 하이라이트.',
    needsDispute: false,
  },
  {
    type: 'third_party_summon',
    label: '제3자 소환',
    icon: '🧑‍⚖️',
    desc: 'Social Graph의 제3자를 법정에 소환. 1회 질문.',
    needsDispute: false,
  },
  {
    type: 'order_warning',
    label: '질서 유지 경고',
    icon: '🔨',
    desc: '대상의 감정 단계를 1단계 가속.',
    needsDispute: false,
  },
  {
    type: 'official_record',
    label: '정식 기록 채택',
    icon: '📌',
    desc: '발언 하나를 공식 진술로 고정. 이후 모순 시 자동 붕괴.',
    needsDispute: true,
  },
]

export default function SkillPanel({ target, onUseSkill, disputes }: Props) {
  const canUseSkill = useGameStore((s) => s.canUseSkill)
  const resources = useGameStore((s) => s.resources)
  const skillUseCounts = useGameStore((s) => s.skillUseCounts)

  if (!target) {
    return <div className="text-gray-500 text-sm">먼저 대상을 선택하세요.</div>
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-500 font-semibold">특수 스킬</div>

      <div className="grid grid-cols-2 gap-2">
        {SKILLS.map((skill) => {
          const available = canUseSkill(skill.type)
          const cost = SKILL_COSTS[skill.type]
          const limit = SKILL_LIMITS[skill.type]
          const used = skillUseCounts[skill.type] ?? 0

          const costLabel = cost
            ? `${cost.resource === 'skillPoints' ? '⚡' : cost.resource === 'investigationTokens' ? '🔍' : '⚖️'}${cost.amount}`
            : ''
          const limitLabel = limit !== undefined ? `${used}/${limit}회` : ''

          return (
            <div
              key={skill.type}
              className={`border rounded-lg p-2 transition-colors ${
                available
                  ? 'border-gray-700 bg-gray-800/60'
                  : 'border-gray-800 bg-gray-900/60 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{skill.icon}</span>
                  <span className="text-xs font-semibold text-gray-300">{skill.label}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>{costLabel}</span>
                  {limitLabel && <span>· {limitLabel}</span>}
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-2">{skill.desc}</div>

              {skill.needsDispute ? (
                <div className="flex flex-wrap gap-1">
                  {disputes.map((d) => (
                    <button
                      key={d.id}
                      disabled={!available}
                      onClick={() => onUseSkill(skill.type, d.id)}
                      className={`text-xs px-2 py-0.5 rounded transition-colors ${
                        available
                          ? 'bg-gray-700 hover:bg-amber-700 text-gray-300 hover:text-white'
                          : 'bg-gray-800 text-gray-700 cursor-not-allowed'
                      }`}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  disabled={!available}
                  onClick={() => onUseSkill(skill.type)}
                  className={`text-xs px-3 py-1 rounded transition-colors ${
                    available
                      ? 'bg-amber-700 hover:bg-amber-600 text-white'
                      : 'bg-gray-800 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  사용
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
