/**
 * Perk Choice Modal -- 퍼크 선택 모달
 * ─────────────────────────────────
 * 퍼크 효과 발동 시 플레이어에게 선택지를 제시.
 *
 * - penalty_buffer: 잘못된 증거 제시 시 철회/재프레이밍 선택
 * - fatigue_extend: 교착 상태에서 각도 전환 기회
 *
 * pendingPerkChoice가 Store에 있으면 자동 표시.
 */

import { useGameStore, useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'
import { resetFatigueForDossier } from '../../engine/questionFatigueEngine'

export default function PerkChoiceModal() {
  const pending = useStore(s => s.pendingPerkChoice)
  const caseData = useStore(s => s.caseData)

  if (!pending || !caseData) return null

  if (pending.type === 'penalty_buffer') {
    return <PenaltyBufferChoice evidenceId={pending.evidenceId} target={pending.target} />
  }

  if (pending.type === 'fatigue_extend') {
    return <FatigueExtendChoice party={pending.party} disputeId={pending.disputeId} />
  }

  return null
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 판결 완충 (penalty_buffer)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PenaltyBufferChoice({ evidenceId, target }: { evidenceId: string; target: 'a' | 'b' }) {
  const dismiss = useStore(s => s.setPendingPerkChoice)
  const consumePerk = useStore(s => s.consumePerkUse)
  const addDialogue = useStore(s => s.addDialogue)
  const turnCount = useStore(s => s.turnCount)
  const setPendingEvidenceResult = useStore(s => s.setPendingEvidenceResult)
  const caseData = useStore(s => s.caseData)

  const evDef = caseData?.evidence.find(e => e.id === evidenceId)
  const evidenceName = evDef?.name ?? evidenceId

  const handleWithdraw = () => {
    consumePerk('penaltyBufferUsesRemaining')

    // 철회: 패널티 없이 증거 제시를 취소
    addDialogue({
      speaker: 'judge',
      text: '이 증거는 다시 검토하겠습니다. 제시를 철회합니다.',
      relatedDisputes: evDef?.proves ?? [],
      turn: turnCount,
    })
    addDialogue({
      speaker: 'system',
      text: `[판결 완충] "${evidenceName}" 제시를 철회했습니다. 패널티 없음.`,
      relatedDisputes: evDef?.proves ?? [],
      turn: turnCount,
    })

    // 증거 결과 토스트를 제거 (hold 토스트가 이미 설정되어 있을 수 있음)
    setPendingEvidenceResult(null)
    dismiss(null)
  }

  const handleReframe = () => {
    consumePerk('penaltyBufferUsesRemaining')

    // 재프레이밍: 감소된 패널티 (감정 변화를 절반으로)
    const state = useGameStore.getState()
    // 원래 hold 시에는 감정 변화가 이미 적용되었으므로, 일부를 되돌림
    state.changeEmotion(target, -4)

    addDialogue({
      speaker: 'judge',
      text: '이 증거의 의미를 다른 관점에서 제시하겠습니다.',
      relatedDisputes: evDef?.proves ?? [],
      turn: turnCount,
    })
    addDialogue({
      speaker: 'system',
      text: `[판결 완충] "${evidenceName}"을 재프레이밍했습니다. 패널티 경감.`,
      relatedDisputes: evDef?.proves ?? [],
      turn: turnCount,
    })
    dismiss(null)
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700/60 rounded-2xl w-full max-w-sm overflow-hidden animate-fade-in shadow-2xl">
        <div className="bg-gradient-to-b from-amber-900/40 to-gray-900 border-b border-amber-600/30 px-4 py-3">
          <div className="flex items-center gap-2">
            <Emoji char="&#x1F6E1;" size={20} />
            <span className="text-sm font-bold text-amber-400">판결 완충</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-600/30 text-amber-400 font-bold ml-auto">퍼크</span>
          </div>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs text-gray-300 leading-relaxed">
            "{evidenceName}" 증거가 효과를 발휘하지 못했습니다.
            <br />판결 완충 퍼크로 대응할 수 있습니다.
          </p>
        </div>
        <div className="flex gap-2 px-4 pb-4">
          <button onClick={handleWithdraw}
            className="flex-1 text-xs py-2.5 rounded-xl bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700 transition-colors">
            <Emoji char="&#x21A9;" size={14} /> 철회
            <span className="block text-[10px] text-gray-500 mt-0.5">패널티 없음</span>
          </button>
          <button onClick={handleReframe}
            className="flex-1 text-xs py-2.5 rounded-xl bg-amber-700 text-white font-bold hover:bg-amber-600 transition-colors">
            <Emoji char="&#x1F504;" size={14} /> 재프레이밍
            <span className="block text-[10px] text-amber-200/70 mt-0.5">패널티 경감</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 집요한 추궁 (fatigue_extend)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function FatigueExtendChoice({ party, disputeId }: { party: 'a' | 'b'; disputeId: string }) {
  const dismiss = useStore(s => s.setPendingPerkChoice)
  const consumePerk = useStore(s => s.consumePerkUse)
  const addDialogue = useStore(s => s.addDialogue)
  const turnCount = useStore(s => s.turnCount)
  const caseData = useStore(s => s.caseData)

  const disputeName = caseData?.disputes.find(d => d.id === disputeId)?.name ?? disputeId
  const partyName = party === 'a' ? caseData?.duo.partyA.name : caseData?.duo.partyB.name

  const handleAngleSwitch = () => {
    consumePerk('angleSwitchOpportunity')

    // 해당 쟁점의 피로도를 리셋
    resetFatigueForDossier(party, disputeId)

    addDialogue({
      speaker: 'system',
      text: `[집요한 추궁] "${disputeName}"에 대한 질문 각도를 전환합니다. 피로도가 리셋되었습니다.`,
      relatedDisputes: [disputeId],
      turn: turnCount,
    })
    dismiss(null)
  }

  const handlePass = () => {
    addDialogue({
      speaker: 'system',
      text: `교착 상태입니다. 다른 쟁점이나 접근을 시도하세요.`,
      relatedDisputes: [disputeId],
      turn: turnCount,
    })
    dismiss(null)
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700/60 rounded-2xl w-full max-w-sm overflow-hidden animate-fade-in shadow-2xl">
        <div className="bg-gradient-to-b from-red-900/40 to-gray-900 border-b border-red-600/30 px-4 py-3">
          <div className="flex items-center gap-2">
            <Emoji char="&#x1F50D;" size={20} />
            <span className="text-sm font-bold text-red-400">교착 상태</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-600/30 text-cyan-400 font-bold ml-auto">퍼크</span>
          </div>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs text-gray-300 leading-relaxed">
            {partyName}의 "{disputeName}" 쟁점에서 교착이 발생했습니다.
            <br />집요한 추궁 퍼크로 질문 각도를 전환할 수 있습니다.
          </p>
        </div>
        <div className="flex gap-2 px-4 pb-4">
          <button onClick={handlePass}
            className="flex-1 text-xs py-2.5 rounded-xl bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700 transition-colors">
            넘어간다
          </button>
          <button onClick={handleAngleSwitch}
            className="flex-1 text-xs py-2.5 rounded-xl bg-cyan-700 text-white font-bold hover:bg-cyan-600 transition-colors">
            <Emoji char="&#x1F503;" size={14} /> 각도 전환
            <span className="block text-[10px] text-cyan-200/70 mt-0.5">피로도 리셋</span>
          </button>
        </div>
      </div>
    </div>
  )
}
