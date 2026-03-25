import { useState } from 'react'
import type { PartyId, QuestionType, TrustActionType, SkillType } from '../../types'
import { GamePhase } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import { useActionDispatch } from '../../hooks/useActionDispatch'
import TargetSelector from './TargetSelector'
import QuestionSelector from './QuestionSelector'
import EvidencePresenter from './EvidencePresenter'
import TrustActionPanel from './TrustActionPanel'
import SkillPanel from './SkillPanel'

type Tab = 'question' | 'evidence' | 'trust' | 'skill' | 'advance'

export default function ActionPanel() {
  const [target, setTarget] = useState<PartyId | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('question')
  const dispatch = useActionDispatch()
  const caseData = useGameStore((s) => s.caseData)
  const currentPhase = useGameStore((s) => s.currentPhase)
  const canAdvance = useGameStore((s) => s.canAdvancePhase())
  const advancePhase = useGameStore((s) => s.advancePhase)
  const useSkill = useGameStore((s) => s.useSkill)

  if (!caseData) return null

  const disputes = caseData.disputes.map((d) => ({ id: d.id, name: d.name }))

  const handleQuestion = (questionType: QuestionType, disputeId: string) => {
    if (!target) return
    dispatch({ type: 'question', questionType, target, disputeId })
  }

  const handleEvidence = (evidenceId: string) => {
    if (!target) return
    dispatch({ type: 'evidence_present', evidenceId, target })
  }

  const handleTrustAction = (actionType: TrustActionType) => {
    if (!target) return
    dispatch({ type: 'trust_action', actionType, target })
  }

  const handleSkill = (skillType: SkillType, disputeId?: string) => {
    if (!target) return
    if (!useSkill(skillType)) return

    const state = useGameStore.getState()

    switch (skillType) {
      case 'immediate_answer':
        if (disputeId) {
          const agent = target === 'a' ? state.agentA : state.agentB
          const entry = agent.lieStateMap[disputeId]
          if (entry) {
            const agentKey = target === 'a' ? 'agentA' : 'agentB'
            useGameStore.setState({
              [agentKey]: {
                ...agent,
                lieStateMap: {
                  ...agent.lieStateMap,
                  [disputeId]: { ...entry, currentState: 'S5' as const },
                },
              },
            })
          }
          state.addDialogue({ speaker: 'judge', text: '즉답을 요구합니다. 사실대로 답하십시오.', relatedDisputes: [disputeId], turn: state.turnCount })
          dispatch({ type: 'question', questionType: 'fact_fixing', target, disputeId })
        }
        break
      case 'cross_examination':
        if (disputeId) {
          state.addDialogue({ speaker: 'judge', text: '교차 대질을 실시합니다. 양측 모두 답하십시오.', relatedDisputes: [disputeId], turn: state.turnCount })
          dispatch({ type: 'question', questionType: 'fact_fixing', target: 'a', disputeId })
          setTimeout(() => dispatch({ type: 'question', questionType: 'fact_fixing', target: 'b', disputeId }), 500)
        }
        break
      case 'evasion_reading': {
        const agent = target === 'a' ? state.agentA : state.agentB
        const name = target === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
        state.addDialogue({ speaker: 'system', text: `[회피 신호 판독] ${name}: ${agent.emotionalState.behaviorHint}`, relatedDisputes: [], turn: state.turnCount })
        for (const [dId, lieEntry] of Object.entries(agent.lieStateMap)) {
          if (lieEntry.currentState !== 'S5') {
            const d = caseData.disputes.find((x) => x.id === dId)
            const instability = lieEntry.lieIntensity === 'L1' ? '매우 불안정' : lieEntry.lieIntensity === 'L2' ? '불안정' : '강하게 방어 중'
            state.addDialogue({ speaker: 'system', text: `  → ${d?.name}: ${instability}`, relatedDisputes: [dId], turn: state.turnCount })
          }
        }
        break
      }
      case 'statement_comparison': {
        const conflicts = state.claimGraph.filter((c) => c.status === 'conflict')
        if (conflicts.length > 0) {
          const c = conflicts[0]
          const d = caseData.disputes.find((x) => x.id === c.disputeId)
          state.addDialogue({ speaker: 'system', text: `[진술 대조] "${d?.name}"에서 모순 감지: "${c.summary}"`, relatedDisputes: [c.disputeId], turn: state.turnCount })
        } else {
          state.addDialogue({ speaker: 'system', text: `[진술 대조] 명확한 모순이 아직 감지되지 않았습니다.`, relatedDisputes: [], turn: state.turnCount })
        }
        break
      }
      case 'third_party_summon': {
        const tp = caseData.duo.socialGraph.find((t) => caseData.activeThirdParties.includes(t.id))
        if (tp) {
          state.addDialogue({ speaker: 'system', text: `[제3자 소환] ${tp.name}이(가) 출석했습니다.`, relatedDisputes: [], turn: state.turnCount })
          state.addDialogue({ speaker: 'system', text: `${tp.name}: "${tp.knowledgeScope}"`, relatedDisputes: [], turn: state.turnCount })
        } else {
          state.addDialogue({ speaker: 'system', text: `소환 가능한 제3자가 없습니다.`, relatedDisputes: [], turn: state.turnCount })
        }
        break
      }
      case 'order_warning':
        state.changeEmotion(target, 15)
        state.addDialogue({ speaker: 'judge', text: '질서를 유지하십시오!', relatedDisputes: [], turn: state.turnCount })
        break
      case 'official_record':
        if (disputeId) {
          const claims = state.claimGraph.filter((c) => c.disputeId === disputeId && c.claimant === target)
          if (claims.length > 0) {
            const latest = claims[claims.length - 1]
            state.updateClaimStatus(latest.id, 'official')
            state.addDialogue({ speaker: 'judge', text: `정식 기록 채택: "${latest.summary}"`, relatedDisputes: [disputeId], turn: state.turnCount })
          }
        }
        break
    }
    state.incrementTurn()
  }

  const handleAdvance = () => {
    const nextMap: Record<string, GamePhase> = {
      [GamePhase.Phase3_Interrogation]: GamePhase.Phase4_Evidence,
      [GamePhase.Phase4_Evidence]: GamePhase.Phase5_ReExamination,
      [GamePhase.Phase5_ReExamination]: GamePhase.Phase6_Mediation,
    }
    const next = nextMap[currentPhase]
    if (next) advancePhase(next)
  }

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'question', label: '질문', icon: '❓' },
    { id: 'evidence', label: '증거', icon: '📄' },
    { id: 'trust', label: '신뢰', icon: '🤝' },
    { id: 'skill', label: '스킬', icon: '⚡' },
    { id: 'advance', label: '다음', icon: '➡️' },
  ]

  return (
    <div className="space-y-2">
      {/* 대상 선택 + 탭 바 통합 행 */}
      <div className="flex items-center gap-2">
        <TargetSelector selected={target} onSelect={setTarget} />
        <div className="h-4 w-px bg-gray-800 shrink-0" />
        <div className="flex gap-0.5 flex-1 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 text-xs px-2.5 py-1.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-gray-950 font-bold shadow-sm shadow-amber-600/20'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 내용 */}
      {activeTab === 'question' && <QuestionSelector target={target} onSelect={handleQuestion} />}
      {activeTab === 'evidence' && <EvidencePresenter target={target} onPresent={handleEvidence} />}
      {activeTab === 'trust' && <TrustActionPanel target={target} onAction={handleTrustAction} />}
      {activeTab === 'skill' && <SkillPanel target={target} onUseSkill={handleSkill} disputes={disputes} />}
      {activeTab === 'advance' && (
        <AdvanceTab
          canAdvance={canAdvance}
          onAdvance={handleAdvance}
          currentPhase={currentPhase}
        />
      )}
    </div>
  )
}

function AdvanceTab({ canAdvance, onAdvance, currentPhase }: { canAdvance: boolean; onAdvance: () => void; currentPhase: GamePhase }) {
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const evidenceDefinitions = useGameStore((s) => s.evidenceDefinitions)
  const turnCount = useGameStore((s) => s.turnCount)

  // 진행 상황 계산
  const allLies = [...Object.values(agentA.lieStateMap), ...Object.values(agentB.lieStateMap)]
  const collapsed = allLies.filter((e) => e.currentState === 'S5').length
  const totalLies = allLies.length
  const presentedCount = Object.values(evidenceStates).filter((e) => e.presented).length
  const unlockedCount = evidenceDefinitions.filter((e) => evidenceStates[e.id]?.unlocked).length
  const totalEvidence = evidenceDefinitions.length

  const phaseLabels: Record<string, string> = {
    [GamePhase.Phase3_Interrogation]: '증거 제시 단계',
    [GamePhase.Phase4_Evidence]: '재심문 단계',
    [GamePhase.Phase5_ReExamination]: '중재안 단계',
  }
  const nextLabel = phaseLabels[currentPhase] ?? '다음 단계'

  // 상황별 힌트
  const hints: string[] = []
  if (collapsed === 0) hints.push('아직 붕괴된 쟁점이 없습니다. 증거를 제시하거나 질문을 이어가세요.')
  else if (collapsed < totalLies) hints.push(`${collapsed}/${totalLies} 쟁점 붕괴. 남은 쟁점을 더 파고들 수 있습니다.`)
  else hints.push('모든 쟁점이 붕괴되었습니다. 판결로 넘어가도 좋습니다.')

  if (presentedCount === 0 && currentPhase === GamePhase.Phase3_Interrogation) {
    hints.push('증거 탭에서 증거를 제시해보세요.')
  }
  if (unlockedCount > presentedCount) {
    hints.push(`미제시 증거가 ${unlockedCount - presentedCount}개 남아 있습니다.`)
  }

  return (
    <div className="space-y-3 py-1">
      {/* 진행 요약 */}
      <div className="grid grid-cols-3 gap-2">
        <MiniStat label="쟁점 붕괴" value={`${collapsed}/${totalLies}`} good={collapsed > 0} />
        <MiniStat label="증거 제시" value={`${presentedCount}/${totalEvidence}`} good={presentedCount > 0} />
        <MiniStat label="진행 턴" value={`${turnCount}`} good={true} />
      </div>

      {/* 힌트 */}
      <div className="space-y-1">
        {hints.map((h, i) => (
          <div key={i} className="text-xs text-gray-500 flex items-start gap-1">
            <span className="text-amber-600 shrink-0">💡</span>
            <span>{h}</span>
          </div>
        ))}
      </div>

      {/* 전환 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={onAdvance}
          disabled={!canAdvance}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            canAdvance ? 'bg-amber-600 hover:bg-amber-500 text-gray-950' : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          {nextLabel} →
        </button>
      </div>
    </div>
  )
}

function MiniStat({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="bg-gray-800/40 rounded px-2 py-1.5 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`text-sm font-bold ${good ? 'text-emerald-400' : 'text-gray-600'}`}>{value}</div>
    </div>
  )
}
