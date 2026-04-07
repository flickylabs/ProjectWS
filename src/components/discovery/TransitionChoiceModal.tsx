/**
 * Transition Choice Modal -- 상태 전이 후 전략 선택
 * ─────────────────────────────────
 * lieState 전이 직후 플레이어에게 다음 전략 선택지를 제시.
 * Codex 피드백: "S1->S2 균열 직후 자동 진행 대신 선택지를 주면 에이전시가 살아난다."
 *
 * pendingTransitionChoice가 Store에 있으면 자동 표시.
 */

import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'

interface TransitionOption {
  label: string
  description: string
  icon: string
  actionHint: string  // 추천 다음 액션 타입
  color: string
}

const TRANSITION_OPTIONS: Record<'cracked' | 'cornered' | 'opening', TransitionOption[]> = {
  // S1->S2 균열
  cracked: [
    {
      label: '모순을 더 쌓는다',
      description: '사실 추궁으로 진술의 틈을 넓힙니다',
      icon: '\u26A1',
      actionHint: 'fact_pursuit',
      color: 'blue',
    },
    {
      label: '동기를 판다',
      description: '왜 거짓을 말하는지 동기를 탐색합니다',
      icon: '\uD83D\uDD0D',
      actionHint: 'motive_search',
      color: 'purple',
    },
    {
      label: '증거를 낸다',
      description: '확보한 증거로 압박합니다',
      icon: '\uD83D\uDCCB',
      actionHint: 'evidence_present',
      color: 'amber',
    },
  ],
  // S2->S3 궁지
  cornered: [
    {
      label: '압박을 유지한다',
      description: '더 추궁하여 방어를 무너뜨립니다',
      icon: '\uD83D\uDD25',
      actionHint: 'fact_pursuit',
      color: 'red',
    },
    {
      label: '공감으로 전환한다',
      description: '부드러운 접근으로 자백을 유도합니다',
      icon: '\uD83D\uDC9C',
      actionHint: 'empathy_approach',
      color: 'pink',
    },
    {
      label: '다른 쟁점으로 이동한다',
      description: '다른 쟁점에서 새로운 돌파구를 찾습니다',
      icon: '\u2194\uFE0F',
      actionHint: 'switch_dispute',
      color: 'gray',
    },
  ],
  // S3->S4 개방
  opening: [
    {
      label: '결정적 질문을 한다',
      description: '핵심 질문으로 진실을 끌어냅니다',
      icon: '\u2757',
      actionHint: 'fact_pursuit',
      color: 'yellow',
    },
    {
      label: '증거로 마무리한다',
      description: '결정적 증거를 제시하여 확인합니다',
      icon: '\uD83D\uDCDC',
      actionHint: 'evidence_present',
      color: 'amber',
    },
    {
      label: '자백을 유도한다',
      description: '공감으로 스스로 고백하게 합니다',
      icon: '\uD83C\uDF05',
      actionHint: 'empathy_approach',
      color: 'emerald',
    },
  ],
}

const LABEL_CONFIG: Record<'cracked' | 'cornered' | 'opening', {
  text: string
  icon: string
  gradient: string
  borderColor: string
  titleColor: string
}> = {
  cracked: {
    text: '\uADE0\uC5F4',
    icon: '\u26A1',
    gradient: 'from-yellow-900/40 to-gray-900',
    borderColor: 'border-yellow-600/30',
    titleColor: 'text-yellow-400',
  },
  cornered: {
    text: '\uAD81\uC9C0',
    icon: '\uD83D\uDD25',
    gradient: 'from-orange-900/40 to-gray-900',
    borderColor: 'border-orange-600/30',
    titleColor: 'text-orange-400',
  },
  opening: {
    text: '\uAC1C\uBC29',
    icon: '\uD83C\uDF05',
    gradient: 'from-emerald-900/40 to-gray-900',
    borderColor: 'border-emerald-600/30',
    titleColor: 'text-emerald-400',
  },
}

const OPTION_COLORS: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  blue:    { bg: 'bg-blue-900/30',    border: 'border-blue-700/40',    text: 'text-blue-300',    hover: 'hover:bg-blue-900/50' },
  purple:  { bg: 'bg-purple-900/30',  border: 'border-purple-700/40',  text: 'text-purple-300',  hover: 'hover:bg-purple-900/50' },
  amber:   { bg: 'bg-amber-900/30',   border: 'border-amber-700/40',   text: 'text-amber-300',   hover: 'hover:bg-amber-900/50' },
  red:     { bg: 'bg-red-900/30',     border: 'border-red-700/40',     text: 'text-red-300',     hover: 'hover:bg-red-900/50' },
  pink:    { bg: 'bg-pink-900/30',    border: 'border-pink-700/40',    text: 'text-pink-300',    hover: 'hover:bg-pink-900/50' },
  gray:    { bg: 'bg-gray-800/40',    border: 'border-gray-600/40',    text: 'text-gray-300',    hover: 'hover:bg-gray-700/50' },
  yellow:  { bg: 'bg-yellow-900/30',  border: 'border-yellow-700/40',  text: 'text-yellow-300',  hover: 'hover:bg-yellow-900/50' },
  emerald: { bg: 'bg-emerald-900/30', border: 'border-emerald-700/40', text: 'text-emerald-300', hover: 'hover:bg-emerald-900/50' },
}

export default function TransitionChoiceModal() {
  const pending = useStore(s => s.pendingTransitionChoice)
  const caseData = useStore(s => s.caseData)
  const dismiss = useStore(s => s.setPendingTransitionChoice)
  const addDialogue = useStore(s => s.addDialogue)
  const turnCount = useStore(s => s.turnCount)
  const setDisputeBoardAction = useStore(s => s.setDisputeBoardAction)

  if (!pending || !caseData) return null

  const config = LABEL_CONFIG[pending.label]
  const options = TRANSITION_OPTIONS[pending.label]
  const partyName = pending.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
  const disputeName = caseData.disputes.find(d => d.id === pending.disputeId)?.name ?? pending.disputeId

  const handleChoice = (option: TransitionOption) => {
    addDialogue({
      speaker: 'system',
      text: `[${config.text}] ${option.label} -- ${option.description}`,
      relatedDisputes: [pending.disputeId],
      turn: turnCount,
    })

    // evidence_present나 switch_dispute가 아닌 경우, 현재 쟁점+파티로 라우팅
    if (option.actionHint !== 'evidence_present' && option.actionHint !== 'switch_dispute') {
      setDisputeBoardAction({ disputeId: pending.disputeId, party: pending.party })
    }

    dismiss(null)
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700/60 rounded-2xl w-full max-w-sm overflow-hidden animate-fade-in shadow-2xl">
        {/* 헤더 */}
        <div className={`bg-gradient-to-b ${config.gradient} border-b ${config.borderColor} px-4 py-3`}>
          <div className="flex items-center gap-2">
            <Emoji char={config.icon} size={20} />
            <span className={`text-sm font-bold ${config.titleColor}`}>
              {config.text} -- {partyName}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            "{disputeName}" 쟁점에서 {config.text}이 발생했습니다. 다음 전략을 선택하세요.
          </p>
        </div>

        {/* 선택지 */}
        <div className="px-4 py-3 space-y-2">
          {options.map((option, idx) => {
            const c = OPTION_COLORS[option.color] ?? OPTION_COLORS.gray
            return (
              <button
                key={idx}
                onClick={() => handleChoice(option)}
                className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all active:scale-[0.97] ${c.bg} ${c.border} ${c.hover}`}
              >
                <div className="flex items-center gap-2">
                  <Emoji char={option.icon} size={16} />
                  <span className={`text-xs font-bold ${c.text}`}>{option.label}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5 pl-6">{option.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
