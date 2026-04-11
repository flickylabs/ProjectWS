import { useEffect, useMemo, useState } from 'react'
import { processFreeQuestion, type FreeQuestionResult } from '../../../engine/llmFreeQuestion'
import { setNextConfidential, setNextEvasionReading, isLLMMode } from '../../../hooks/useActionDispatch'
import { useActionDispatch } from '../../../hooks/useActionDispatch'
import { useValidActions } from '../../../hooks/useValidActions'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { GamePhase, type PartyId, type QuestionType, type SkillType, type TrustActionType } from '../../../types'
import EvidencePresenter from '../../actions/EvidencePresenter'
import QuestionSelector, { type QuestionToggles } from '../../actions/QuestionSelector'
import PCSvgIcon from '../icons/PCSvgIcon'

export type PCHotbarPanelView = 'question' | 'evidence' | 'special'

interface Props {
  quickQuestionType: QuestionType | null
  selectedEvidenceId: string | null
  view: PCHotbarPanelView
  onViewChange: (view: PCHotbarPanelView) => void
}

const VIEW_META: Record<PCHotbarPanelView, { iconId: string; label: string; subtitle: string }> = {
  question: {
    iconId: 'i-sword',
    label: '심문 컨트롤',
    subtitle: '현재 쟁점 기준 질문, 자유질문, 보조 토글을 제어합니다.',
  },
  evidence: {
    iconId: 'i-doc',
    label: '증거 컨트롤',
    subtitle: '증거 제시, 조사, 감정, 증인 호출을 한곳에서 처리합니다.',
  },
  special: {
    iconId: 'i-shield',
    label: '특수 행동',
    subtitle: '즉답 요구, 이의 제기, 보호 행동과 단계 진행을 관리합니다.',
  },
}

const QUICK_QUESTION_LABELS: Record<QuestionType, string> = {
  fact_pursuit: '사실 추궁',
  motive_search: '동기 탐색',
  empathy_approach: '공감 접근',
  evidence_present: '증거 제시',
}

export default function PCActionsPanel({
  quickQuestionType,
  selectedEvidenceId,
  view,
  onViewChange,
}: Props) {
  const dispatch = useActionDispatch()
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const resources = useStore((s) => s.resources)
  const targetParty = useStore((s) => s.pcTargetParty)
  const setDisputeBoardAction = useStore((s) => s.setDisputeBoardAction)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const canAdvance = useStore((s) => s.canAdvancePhase())
  const advancePhase = useStore((s) => s.advancePhase)
  const useSkill = useStore((s) => s.useSkill)
  const canUseSkill = useStore((s) => s.canUseSkill)

  const [confidentialOn, setConfidentialOn] = useState(false)
  const [evasionReadingOn, setEvasionReadingOn] = useState(false)
  const [expandedSpecialId, setExpandedSpecialId] = useState<string | null>(null)

  const { questions } = useValidActions(targetParty)
  const llmMode = isLLMMode()

  const focusedDisputeId = useMemo(() => {
    return lastFocusedDisputeId ?? caseData?.disputes[0]?.id ?? null
  }, [caseData?.disputes, lastFocusedDisputeId])

  const focusedDisputeName = useMemo(() => {
    if (!focusedDisputeId) {
      return null
    }
    return caseData?.disputes.find((dispute) => dispute.id === focusedDisputeId)?.name ?? null
  }, [caseData?.disputes, focusedDisputeId])

  const selectedEvidence = useMemo(() => {
    if (!selectedEvidenceId) {
      return null
    }
    return evidenceDefinitions.find((evidence) => evidence.id === selectedEvidenceId) ?? null
  }, [evidenceDefinitions, selectedEvidenceId])

  const quickQuestion = useMemo(() => {
    if (!quickQuestionType) {
      return null
    }
    return questions.find((question) => question.type === quickQuestionType) ?? null
  }, [quickQuestionType, questions])

  const quickQuestionDispute = useMemo(() => {
    if (!quickQuestion || !focusedDisputeId) {
      return null
    }
    return quickQuestion.disputes.find((dispute) => dispute.id === focusedDisputeId) ?? null
  }, [focusedDisputeId, quickQuestion])

  const disputeOptions = useMemo(() => {
    return (caseData?.disputes ?? []).map((dispute) => ({ id: dispute.id, name: dispute.name }))
  }, [caseData?.disputes])

  useEffect(() => {
    if (targetParty && focusedDisputeId) {
      setDisputeBoardAction({ disputeId: focusedDisputeId, party: targetParty })
    }
  }, [focusedDisputeId, setDisputeBoardAction, targetParty])

  if (!caseData || !targetParty) {
    return null
  }

  const toggles: QuestionToggles = {
    evasionReading: {
      unlocked: phaseAtLeast(currentPhase, GamePhase.Phase4_Evidence),
      on: evasionReadingOn,
      affordable: resources.skillPoints >= 1,
    },
    confidential: {
      unlocked: phaseAtLeast(currentPhase, GamePhase.Phase5_ReExamination),
      on: confidentialOn,
    },
  }

  const handleToggle = (key: 'confidential' | 'evasionReading') => {
    if (key === 'confidential') {
      setConfidentialOn((current) => !current)
    }
    if (key === 'evasionReading' && resources.skillPoints >= 1) {
      setEvasionReadingOn((current) => !current)
    }
  }

  const handleQuestion = (questionType: QuestionType, disputeId: string) => {
    if (confidentialOn) {
      setNextConfidential(true)
      setConfidentialOn(false)
    }

    if (evasionReadingOn) {
      useGameStore.getState().spend('skillPoints', 1)
      setNextEvasionReading(targetParty, disputeId)
      setEvasionReadingOn(false)
    }

    dispatch({ type: 'question', questionType, target: targetParty, disputeId })
  }

  const handleFreeResult = (result: FreeQuestionResult, party: PartyId, text: string) => {
    const state = useGameStore.getState()
    state.spend('investigationTokens', 1)
    state.addDialogue({
      speaker: 'judge',
      text,
      relatedDisputes: result.disputeId ? [result.disputeId] : [],
      turn: state.turnCount,
    })
    state.addDialogue({
      speaker: party,
      text: result.response,
      relatedDisputes: result.disputeId ? [result.disputeId] : [],
      turn: state.turnCount,
      behaviorHint: result.behaviorHint,
    })

    if (result.questionType !== 'irrelevant' && result.disputeId) {
      state.trackMetric('freeQuestionsRelevant')
      const transitions = ({
        fact_pursuit: ['direct_question', 'timeline_question'],
        motive_search: ['motive_question', 'context_question'],
        empathy_approach: ['empathy_question', 'provenance_question'],
      } as Record<string, string[]>)[result.questionType] ?? ['direct_question']

      for (const transition of transitions) {
        if (state.transitionLie(party, result.disputeId, transition)) {
          break
        }
      }

      state.changeEmotion(party, 5)

      if (result.secondaryDisputeId) {
        for (const transition of transitions) {
          if (state.transitionLie(party, result.secondaryDisputeId, transition)) {
            break
          }
        }
        state.addDialogue({
          speaker: 'system',
          text: `추가 균열 감지: ${result.secondaryDisputeId}`,
          relatedDisputes: [result.secondaryDisputeId],
          turn: state.turnCount,
        })
      }
    } else if (result.questionType === 'irrelevant') {
      state.addDialogue({
        speaker: 'system',
        text: '쟁점과 직접 연결되지 않는 질문입니다.',
        relatedDisputes: [],
        turn: state.turnCount,
      })
    }

    state.incrementTurn()
  }

  const handlePresentEvidence = (evidenceId: string) => {
    dispatch({ type: 'evidence_present', evidenceId, target: targetParty })
  }

  const handleConfrontEvidence = async (evidenceId: string, question: string) => {
    const state = useGameStore.getState()
    const evidence = state.evidenceDefinitions.find((item) => item.id === evidenceId)
    if (!evidence) {
      return
    }

    state.presentEvidence(evidenceId, targetParty)
    state.addDialogue({
      speaker: 'system',
      text: `증거 제시: ${evidence.name}`,
      relatedDisputes: evidence.proves,
      turn: state.turnCount,
    })

    for (const disputeId of evidence.proves) {
      state.transitionLie(targetParty, disputeId, evidence.reliability === 'hard' ? 'hard_evidence' : 'soft_evidence')
    }

    state.changeEmotion(targetParty, evidence.reliability === 'hard' ? 15 : 8)
    state.addDialogue({
      speaker: 'judge',
      text: question,
      relatedDisputes: evidence.proves,
      turn: state.turnCount,
    })

    const evidenceContext = {
      name: evidence.name,
      description: evidence.description,
      subjectParty: evidence.subjectParty,
      provenance: evidence.provenance,
      reliability: evidence.reliability,
    }

    state.setLLMLoading(true, targetParty)
    try {
      const result = await processFreeQuestion(`[증거 "${evidence.name}"] ${question}`, targetParty, state.agentA, state.agentB, caseData, undefined, evidenceContext)
      const freshState = useGameStore.getState()
      freshState.setLLMLoading(false)
      freshState.addDialogue({
        speaker: targetParty,
        text: result.response,
        relatedDisputes: result.disputeId ? [result.disputeId] : [],
        turn: freshState.turnCount,
        behaviorHint: result.behaviorHint,
      })

      if (result.questionType !== 'irrelevant' && result.disputeId) {
        const transitions = ({
          fact_pursuit: ['direct_question', 'timeline_question'],
          motive_search: ['motive_question', 'context_question'],
          empathy_approach: ['empathy_question', 'provenance_question'],
        } as Record<string, string[]>)[result.questionType] ?? ['direct_question']

        for (const transition of transitions) {
          if (freshState.transitionLie(targetParty, result.disputeId, transition)) {
            break
          }
        }
      }

      freshState.incrementTurn()
    } catch {
      useGameStore.getState().setLLMLoading(false)
    }
  }

  const handleObjection = () => {
    if (resources.skillPoints < 1) {
      return
    }

    const state = useGameStore.getState()
    state.addDialogue({
      speaker: 'judge',
      text: '이의 있습니다.',
      relatedDisputes: [],
      turn: state.turnCount,
    })
    state.changeEmotion(targetParty, 12)
    for (const dispute of caseData.disputes) {
      state.transitionLie(targetParty, dispute.id, 'direct_question')
    }
    state.addDialogue({
      speaker: 'system',
      text: `${targetParty === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name}의 반응이 흔들립니다.`,
      relatedDisputes: [],
      turn: state.turnCount,
    })
    state.spend('skillPoints', 1)
    state.incrementTurn()
  }

  const handleSkill = (skillType: SkillType, disputeId?: string) => {
    if (!useSkill(skillType)) {
      return
    }

    const state = useGameStore.getState()
    if (skillType === 'immediate_answer' && disputeId) {
      const agent = targetParty === 'a' ? state.agentA : state.agentB
      const entry = agent.lieStateMap[disputeId]
      if (entry) {
        useGameStore.setState({
          [targetParty === 'a' ? 'agentA' : 'agentB']: {
            ...agent,
            lieStateMap: {
              ...agent.lieStateMap,
              [disputeId]: {
                ...entry,
                currentState: 'S5',
              },
            },
          },
        })
      }

      state.addDialogue({
        speaker: 'judge',
        text: '즉답을 요구합니다.',
        relatedDisputes: [disputeId],
        turn: state.turnCount,
      })
      dispatch({ type: 'question', questionType: 'fact_pursuit', target: targetParty, disputeId })
    }

    state.incrementTurn()
  }

  const handleTrustAction = (actionType: TrustActionType) => {
    dispatch({ type: 'trust_action', actionType, target: targetParty })
  }

  const handleAdvance = () => {
    if (!canAdvance) {
      return
    }
    advancePhase()
  }

  const selectedTargetName = targetParty === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
  const phaseAdvanceLabel = getAdvanceLabel(currentPhase)

  return (
    <section className="pc-control-panel">
      <div className="pc-control-header">
        <div>
          <div className="pc-control-eyebrow">TACTICAL CONSOLE</div>
          <div className="pc-control-title-row">
            <PCSvgIcon id={VIEW_META[view].iconId} size={18} />
            <strong>{VIEW_META[view].label}</strong>
          </div>
          <p className="pc-control-subtitle">{VIEW_META[view].subtitle}</p>
        </div>

        <div className="pc-control-header-side">
          <div className="pc-control-meta">
            <span className={`pc-control-pill${targetParty === 'a' ? ' party-a' : ' party-b'}`}>
              대상: {selectedTargetName}
            </span>
            {focusedDisputeName ? (
              <span className="pc-control-pill">
                현재 쟁점: {focusedDisputeName}
              </span>
            ) : null}
          </div>
          <button
            className={`pc-control-advance${canAdvance ? '' : ' disabled'}`}
            onClick={handleAdvance}
            type="button"
          >
            <span aria-hidden="true">&#8594;</span>
            {phaseAdvanceLabel}
          </button>
        </div>
      </div>

      <div className="pc-control-nav">
        {(['question', 'evidence', 'special'] as const).map((panelView) => (
          <button
            className={`pc-control-tab${view === panelView ? ' active' : ''}`}
            key={panelView}
            onClick={() => onViewChange(panelView)}
            type="button"
          >
            <PCSvgIcon id={VIEW_META[panelView].iconId} size={14} />
            {VIEW_META[panelView].label}
          </button>
        ))}
      </div>

      {view === 'question' && quickQuestionType ? (
        <div className="pc-control-quick">
          <div>
            <div className="pc-control-quick-label">{QUICK_QUESTION_LABELS[quickQuestionType]}</div>
            <div className="pc-control-quick-text">
              핫바 슬롯을 클릭하면 쟁점과 질문을 선택할 수 있습니다.
            </div>
          </div>
        </div>
      ) : null}

      {view === 'evidence' && selectedEvidence ? (
        <div className="pc-control-quick">
          <div>
            <div className="pc-control-quick-label">선택된 증거</div>
            <div className="pc-control-quick-title">{selectedEvidence.surfaceName ?? selectedEvidence.name}</div>
            <div className="pc-control-quick-text">
              슬롯에서 고른 증거를 바로 제시하거나, 아래 패널에서 조사와 대면질문까지 이어갈 수 있습니다.
            </div>
          </div>
          <button
            className="pc-control-quick-btn"
            onClick={() => handlePresentEvidence(selectedEvidence.id)}
            type="button"
          >
            지금 바로 제시
          </button>
        </div>
      ) : null}

      <div className="pc-control-body">
        {view === 'question' ? (
          <QuestionSelector
            key={`${targetParty}-${view}`}
            llmMode={llmMode}
            onFreeResult={handleFreeResult}
            onSelect={handleQuestion}
            onToggle={handleToggle}
            target={targetParty}
            toggles={toggles}
          />
        ) : null}

        {view === 'evidence' ? (
          <EvidencePresenter
            key={`${targetParty}-${view}`}
            llmMode={llmMode}
            onConfront={handleConfrontEvidence}
            onPresent={handlePresentEvidence}
            target={targetParty}
          />
        ) : null}

        {view === 'special' ? (
          <div className="pc-control-special-grid">
            <ActionCard
              active
              description="상대의 주장 전체를 강하게 흔들어 균열을 만든다."
              iconId="i-bolt"
              label="이의 제기"
              meta={`스킬 포인트 ${resources.skillPoints}`}
              onClick={handleObjection}
            />

            <ActionCard
              active={phaseAtLeast(currentPhase, GamePhase.Phase4_Evidence) && canUseSkill('immediate_answer')}
              description="선택한 쟁점을 강제로 끝까지 몰아붙인다."
              iconId="i-sword"
              label="즉답 요구"
              meta={phaseAtLeast(currentPhase, GamePhase.Phase4_Evidence) ? '쟁점 선택 필요' : 'Phase 4 이후 해금'}
              onClick={() => setExpandedSpecialId((current) => current === 'immediate' ? null : 'immediate')}
            />

            <ActionCard
              active
              description="일시적으로 당사자를 분리해 압박 환경을 바꾼다."
              iconId="i-shield"
              label="분리 심문"
              meta="조사 토큰 1 필요"
              onClick={() => handleTrustAction('separation')}
            />

            <ActionCard
              active={phaseAtLeast(currentPhase, GamePhase.Phase5_ReExamination)}
              description="비공개 보호를 약속해 방어 반응을 낮춘다."
              iconId="i-lock"
              label="비공개 보호"
              meta={phaseAtLeast(currentPhase, GamePhase.Phase5_ReExamination) ? '신뢰/공포 수치 조정' : 'Phase 5 이후 해금'}
              onClick={() => handleTrustAction('confidential_protection')}
            />

            {expandedSpecialId === 'immediate' ? (
              <div className="pc-control-disputes">
                {disputeOptions.map((dispute) => (
                  <button
                    className="pc-control-dispute-btn"
                    key={dispute.id}
                    onClick={() => handleSkill('immediate_answer', dispute.id)}
                    type="button"
                  >
                    {dispute.name}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function ActionCard({
  active,
  description,
  iconId,
  label,
  meta,
  onClick,
}: {
  active: boolean
  description: string
  iconId: string
  label: string
  meta: string
  onClick: () => void
}) {
  return (
    <button
      className={`pc-control-action-card${active ? '' : ' disabled'}`}
      disabled={!active}
      onClick={onClick}
      type="button"
    >
      <div className="pc-control-action-top">
        <span className="pc-control-action-icon">
          <PCSvgIcon id={iconId} size={18} />
        </span>
        <strong>{label}</strong>
      </div>
      <p>{description}</p>
      <span className="pc-control-action-meta">{meta}</span>
    </button>
  )
}

function phaseAtLeast(current: GamePhase, required: GamePhase): boolean {
  const phaseOrder: Record<GamePhase, number> = {
    [GamePhase.Phase0_CaseIntro]: 0,
    [GamePhase.Phase1_InitialStatement]: 1,
    [GamePhase.Phase2_Rebuttal]: 2,
    [GamePhase.Phase3_Interrogation]: 3,
    [GamePhase.Phase4_Evidence]: 4,
    [GamePhase.Phase5_ReExamination]: 5,
    [GamePhase.Phase6_Mediation]: 6,
    [GamePhase.Phase7_Verdict]: 7,
    [GamePhase.Result]: 8,
  }

  return phaseOrder[current] >= phaseOrder[required]
}

function getAdvanceLabel(phase: GamePhase): string {
  switch (phase) {
    case GamePhase.Phase3_Interrogation:
      return '증거 정리 단계로'
    case GamePhase.Phase4_Evidence:
      return '최종 심문 단계로'
    case GamePhase.Phase5_ReExamination:
      return '중재 단계로'
    default:
      return '다음 단계'
  }
}
