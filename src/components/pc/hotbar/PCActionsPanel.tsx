import { useEffect, useMemo, useState } from 'react'
import { processFreeQuestion, type FreeQuestionResult } from '../../../engine/llmFreeQuestion'
import { setNextConfidential, setNextEvasionReading, isLLMMode } from '../../../hooks/useActionDispatch'
import { useActionDispatch } from '../../../hooks/useActionDispatch'
import { useValidActions } from '../../../hooks/useValidActions'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { GamePhase, Phase, type PartyId, type QuestionType, type SkillType, type TrustActionType } from '../../../types'
import EvidencePresenter from '../../actions/EvidencePresenter'
import QuestionSelector, { type QuestionToggles } from '../../actions/QuestionSelector'
import PCSvgIcon from '../icons/PCSvgIcon'
import { playInvestigationTokenWarning } from '../../../engine/soundEngine'
import { useI18n, type MessageKey } from '../../../i18n'

export type PCHotbarPanelView = 'question' | 'evidence' | 'special'

interface Props {
  quickQuestionType: QuestionType | null
  selectedEvidenceId: string | null
  view: PCHotbarPanelView
  onViewChange: (view: PCHotbarPanelView) => void
}

const VIEW_META: Record<PCHotbarPanelView, { iconId: string; labelKey: MessageKey; subtitleKey: MessageKey }> = {
  question: {
    iconId: 'i-sword',
    labelKey: 'pc.actions.view.question.label',
    subtitleKey: 'pc.actions.view.question.subtitle',
  },
  evidence: {
    iconId: 'i-doc',
    labelKey: 'pc.actions.view.evidence.label',
    subtitleKey: 'pc.actions.view.evidence.subtitle',
  },
  special: {
    iconId: 'i-shield',
    labelKey: 'pc.actions.view.special.label',
    subtitleKey: 'pc.actions.view.special.subtitle',
  },
}

const QUICK_QUESTION_LABEL_KEYS: Record<QuestionType, MessageKey> = {
  fact_pursuit: 'pc.actions.quick.fact',
  motive_search: 'pc.actions.quick.motive',
  empathy_approach: 'pc.actions.quick.empathy',
  evidence_present: 'pc.actions.quick.evidence',
}

export default function PCActionsPanel({
  quickQuestionType,
  selectedEvidenceId,
  view,
  onViewChange,
}: Props) {
  const dispatch = useActionDispatch()
  const { t } = useI18n()
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
    if (!state.spend('investigationTokens', 1)) {
      playInvestigationTokenWarning()
      return
    }
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
          text: t('pc.interaction.secondaryCrack', { disputeId: result.secondaryDisputeId }),
          relatedDisputes: [result.secondaryDisputeId],
          turn: state.turnCount,
        })
      }
    } else if (result.questionType === 'irrelevant') {
      state.addDialogue({
        speaker: 'system',
        text: t('pc.interaction.irrelevantQuestion'),
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
    const evidenceState = state.evidenceStates[evidenceId]
    const evidenceDisplay = {
      name: evidenceState?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name),
      description: evidenceState?.deepInvestigated ? evidence.description : (evidence.surfaceDescription ?? evidence.description),
    }

    state.presentEvidence(evidenceId, targetParty)
    const targetName = targetParty === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
    const reliabilityLabel = evidence.reliability === 'hard'
      ? t('pc.actions.evidence.reliability.hard')
      : t('pc.actions.evidence.reliability.soft')
    const disputeNames = evidence.proves
      .map((disputeId) => caseData.disputes.find((item) => item.id === disputeId)?.name ?? disputeId)
      .join(', ')

    for (const disputeId of evidence.proves) {
      state.transitionLie(targetParty, disputeId, evidence.reliability === 'hard' ? 'hard_evidence' : 'soft_evidence')
    }

    state.changeEmotion(targetParty, evidence.reliability === 'hard' ? 15 : 8)
    state.addDialogue({
      speaker: 'judge',
      text: t('pc.actions.dialogue.presentEvidence', {
        target: targetName,
        evidence: evidenceDisplay.name,
        reliability: reliabilityLabel,
        disputes: disputeNames,
        question,
      }),
      relatedDisputes: evidence.proves,
      turn: state.turnCount,
    })

    const evidenceContext = {
      name: evidenceDisplay.name,
      description: evidenceDisplay.description,
      subjectParty: evidence.subjectParty,
      provenance: evidence.provenance,
      reliability: evidence.reliability,
    }

    state.setLLMLoading(true, targetParty)
    try {
      const result = await processFreeQuestion(t('pc.actions.dialogue.evidencePrompt', { evidence: evidenceDisplay.name, question }), targetParty, state.agentA, state.agentB, caseData, undefined, evidenceContext)
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
      text: t('pc.actions.dialogue.objection'),
      relatedDisputes: [],
      turn: state.turnCount,
    })
    state.changeEmotion(targetParty, 12)
    for (const dispute of caseData.disputes) {
      state.transitionLie(targetParty, dispute.id, 'direct_question')
    }
    state.addDialogue({
      speaker: 'system',
      text: t('pc.actions.dialogue.reactionShaken', {
        name: targetParty === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name,
      }),
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
      text: t('pc.actions.dialogue.immediateDemand'),
        relatedDisputes: [disputeId],
        turn: state.turnCount,
      })
      dispatch({ type: 'question', questionType: 'fact_pursuit', target: targetParty, disputeId })
    }
    // incrementTurn()은 dispatch된 question 핸들러에서 수행 — 이중 소비 방지
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
  const phaseAdvanceLabel = getAdvanceLabel(currentPhase, t)
  const viewMeta = VIEW_META[view]

  return (
    <section className="pc-control-panel">
      <div className="pc-control-header">
        <div>
          <div className="pc-control-eyebrow">{t('pc.actions.consoleEyebrow')}</div>
          <div className="pc-control-title-row">
            <PCSvgIcon id={viewMeta.iconId} size={18} />
            <strong>{t(viewMeta.labelKey)}</strong>
          </div>
          <p className="pc-control-subtitle">{t(viewMeta.subtitleKey)}</p>
        </div>

        <div className="pc-control-header-side">
          <div className="pc-control-meta">
            <span className={`pc-control-pill${targetParty === 'a' ? ' party-a' : ' party-b'}`}>
              {t('pc.common.target')}: {selectedTargetName}
            </span>
            {focusedDisputeName ? (
              <span className="pc-control-pill">
                {t('pc.common.currentDispute')}: {focusedDisputeName}
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
            {t(VIEW_META[panelView].labelKey)}
          </button>
        ))}
      </div>

      {view === 'question' && quickQuestionType ? (
        <div className="pc-control-quick">
          <div>
            <div className="pc-control-quick-label">{t(QUICK_QUESTION_LABEL_KEYS[quickQuestionType])}</div>
            <div className="pc-control-quick-text">
              {t('pc.actions.quick.help')}
            </div>
          </div>
        </div>
      ) : null}

      {view === 'evidence' && selectedEvidence ? (
        <div className="pc-control-quick">
          <div>
            <div className="pc-control-quick-label">{t('pc.common.selectedEvidence')}</div>
            <div className="pc-control-quick-title">{selectedEvidence.surfaceName ?? selectedEvidence.name}</div>
            <div className="pc-control-quick-text">
              {t('pc.actions.evidence.quickHelp')}
            </div>
          </div>
          <button
            className="pc-control-quick-btn"
            onClick={() => handlePresentEvidence(selectedEvidence.id)}
            type="button"
          >
            {t('pc.actions.evidence.presentNow')}
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
              description={t('pc.actions.special.objection.desc')}
              iconId="i-bolt"
              label={t('pc.actions.special.objection.label')}
              meta={t('pc.actions.special.objection.meta', { points: resources.skillPoints })}
              onClick={handleObjection}
            />

            <ActionCard
              active={phaseAtLeast(currentPhase, GamePhase.Phase4_Evidence) && canUseSkill('immediate_answer')}
              description={t('pc.actions.special.immediate.desc')}
              iconId="i-sword"
              label={t('pc.actions.special.immediate.label')}
              meta={phaseAtLeast(currentPhase, GamePhase.Phase4_Evidence) ? t('pc.actions.special.immediate.meta.ready') : t('pc.actions.special.immediate.meta.locked')}
              onClick={() => setExpandedSpecialId((current) => current === 'immediate' ? null : 'immediate')}
            />

            <ActionCard
              active
              description={t('pc.actions.special.separation.desc')}
              iconId="i-shield"
              label={t('pc.court.control.separation')}
              meta={t('pc.actions.special.separation.meta')}
              onClick={() => handleTrustAction('separation')}
            />

            <ActionCard
              active={phaseAtLeast(currentPhase, GamePhase.Phase5_ReExamination)}
              description={t('pc.actions.special.confidential.desc')}
              iconId="i-lock"
              label={t('pc.court.control.confidentialProtection')}
              meta={phaseAtLeast(currentPhase, GamePhase.Phase5_ReExamination) ? t('pc.actions.special.confidential.meta.ready') : t('pc.actions.special.confidential.meta.locked')}
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
    [Phase.Briefing]: 0,
    [Phase.Pretrial]: 1,
    [GamePhase.Phase2_Rebuttal]: 2,
    [Phase.Interrogation]: 3,
    [GamePhase.Phase4_Evidence]: 4,
    [GamePhase.Phase5_ReExamination]: 5,
    [Phase.Mediation]: 6,
    [Phase.Verdict]: 7,
    [Phase.Result]: 8,
  }

  return phaseOrder[current] >= phaseOrder[required]
}

function getAdvanceLabel(phase: GamePhase, t: (key: MessageKey, values?: Record<string, string | number>) => string): string {
  switch (phase) {
    case Phase.Interrogation:
      return t('pc.actions.advance.evidence')
    case GamePhase.Phase4_Evidence:
      return t('pc.actions.advance.finalInterrogation')
    case GamePhase.Phase5_ReExamination:
      return t('pc.actions.advance.verdict')
    default:
      return t('pc.actions.advance.next')
  }
}
