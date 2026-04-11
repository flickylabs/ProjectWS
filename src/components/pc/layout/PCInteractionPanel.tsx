import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { handleContradictionPursue, useActionDispatch } from '../../../hooks/useActionDispatch'
import { useGameStore, useStore } from '../../../store/useGameStore'
import type { PartyId, QuestionType } from '../../../types'
import { showToast } from '../../common/Toast'
import PCSvgIcon from '../icons/PCSvgIcon'

export const PC_OPEN_INTERACTION_PANEL_EVENT = 'pc:open-interaction-panel'

type InteractionTone = 'neutral' | 'gold' | 'blue' | 'red' | 'green'
type ToastTone = 'info' | 'success' | 'warn' | 'error'

export interface PcInteractionAction {
  kind:
    | 'focus_dispute'
    | 'open_evidence'
    | 'set_target'
    | 'toast'
    | 'run_question'
    | 'run_special'
    | 'open_summary'
    | 'unlock_summary'
    | 'open_evidence_selection'
    | 'prepare_evidence_present'
    | 'present_evidence'
    | 'open_dispute_picker'
    | 'run_contradiction'
    | 'summon_witness'
    | 'close'
  label: string
  disputeId?: string
  evidenceId?: string
  witnessId?: string
  party?: PartyId
  text?: string
  previousClaim?: string
  currentClaim?: string
  disabled?: boolean
  disabledReason?: string
  toastType?: ToastTone
  questionType?: QuestionType
  specialAction?: 'objection' | 'immediate_answer' | 'separation' | 'confidential_protection' | 'advance_phase'
}

export interface PcInteractionPayload {
  title: string
  subtitle?: string
  body: string
  tone?: InteractionTone
  variant?: 'default' | 'feature' | 'evidence'
  tags?: string[]
  actions?: PcInteractionAction[]
  evidenceId?: string
}

const COPY = {
  caseSummary: '\uC0AC\uAC74 \uC694\uC57D',
  preparing: '\uC900\uBE44 \uC911',
  noCase: '\uD604\uC7AC \uC120\uD0DD\uB41C \uC0AC\uAC74\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.',
  currentDispute: '\uD604\uC7AC \uC7C1\uC810',
  noDispute: '\uC544\uC9C1 \uC120\uD0DD\uB41C \uC7C1\uC810 \uC5C6\uC74C',
  phase: '\uC9C4\uD589 \uB2E8\uACC4',
  turn: '\uD134',
  unlockedEvidence: '\uD574\uAE08 \uC99D\uAC70',
  disputeList: '\uC7C1\uC810 \uBAA9\uB85D',
  viewCurrentDispute: '\uD604\uC7AC \uC7C1\uC810 \uBCF4\uAE30',
  latestEvidence: '\uCD5C\uADFC \uC99D\uAC70 \uC5F4\uB78C',
  targetInfo: '\uB300\uC0C1 \uC815\uBCF4',
  relationship: '\uAD00\uACC4 \uC720\uD615',
  watchingDispute: '\uD604\uC7AC \uC8FC\uC2DC \uC7C1\uC810',
  none: '\uC5C6\uC74C',
  relatedDispute: '\uAD00\uB828 \uC7C1\uC810 \uBCF4\uAE30',
  disputeInfo: '\uC7C1\uC810 \uC815\uBCF4',
  linkedEvidence: '\uC5F0\uACB0 \uC99D\uAC70',
  noLinkedEvidence: '\uC544\uC9C1 \uC5F0\uACB0\uB41C \uC99D\uAC70\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.',
  representativeEvidence: '\uB300\uD45C \uC99D\uAC70 \uC5F4\uB78C',
  presentEvidence: '\uC99D\uAC70 \uC81C\uC2DC',
  noAvailableSelection: '\uC120\uD0DD \uBD88\uAC00',
  noRelevantEvidence: '\uD604\uC7AC \uC7C1\uC810\uACFC \uB300\uC0C1\uC5D0 \uBC14\uB85C \uC5F0\uACB0\uB41C \uC99D\uAC70\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.',
  close: '\uB2EB\uAE30',
  selectMessage: '\uC81C\uC2DC \uBA54\uC2DC\uC9C0 \uC120\uD0DD',
  selectEvidenceBody: '\uC0C1\uB300\uBC29\uC5D0\uAC8C \uB358\uC9C8 \uC99D\uAC70\uB97C \uACE0\uB974\uC138\uC694.',
  presentWay: '\uC81C\uC2DC \uBC29\uC2DD \uC120\uD0DD',
  recommendedQuestion: '\uCD94\uCC9C \uC9C8\uBB38',
  implication: '\uC758\uBBF8',
  directPresent: '\uC99D\uAC70\uB9CC \uC81C\uC2DC',
  chooseDispute: '\uC7C1\uC810 \uC774\uB3D9',
  chooseDisputeBody: '\uC774\uB3D9\uD560 \uC7C1\uC810\uC744 \uC120\uD0DD\uD558\uC138\uC694.',
  cannotMove: '\uC774\uB3D9 \uBD88\uAC00',
  noOtherDispute: '\uC774\uB3D9\uD560 \uB2E4\uB978 \uC7C1\uC810\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.',
  actionSelect: 'ACTION SELECT',
  insufficientSkill: '\uC2A4\uD0AC \uD3EC\uC778\uD2B8\uAC00 \uBD80\uC871\uD569\uB2C8\uB2E4.',
  judgeObjection: '\uC774\uC758 \uC788\uC2B5\uB2C8\uB2E4.',
  immediateDemand: '\uC9C0\uAE08 \uC7C1\uC810\uC5D0 \uB300\uD55C \uC989\uB2F5\uC744 \uC694\uAD6C\uD569\uB2C8\uB2E4.',
} as const

export function openPcInteractionPanel(payload: PcInteractionPayload): void {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent<PcInteractionPayload>(PC_OPEN_INTERACTION_PANEL_EVENT, { detail: payload }))
}

function buildCaseSummaryPayload(): PcInteractionPayload {
  const state = useGameStore.getState()
  const caseData = state.caseData
  const focusedDispute =
    caseData?.disputes.find((dispute) => dispute.id === state.lastFocusedDisputeId) ?? caseData?.disputes[0] ?? null
  const unlockedEvidence = state.evidenceDefinitions.filter((evidence) => state.evidenceStates[evidence.id]?.unlocked)

  if (!caseData) {
    return {
      title: COPY.caseSummary,
      subtitle: COPY.preparing,
      body: COPY.noCase,
      tone: 'neutral',
    }
  }

  return {
    title: COPY.caseSummary,
    subtitle: caseData.caseId.replace(/^case-/, '').toUpperCase(),
    tone: 'gold',
    body: [
      `${COPY.currentDispute}: ${focusedDispute ? focusedDispute.name : COPY.noDispute}`,
      `${COPY.phase}: Phase ${state.currentPhase}`,
      `${COPY.turn}: ${state.turnCount}`,
      `${COPY.unlockedEvidence}: ${unlockedEvidence.length}/${state.evidenceDefinitions.length}`,
      '',
      COPY.disputeList,
      ...caseData.disputes.slice(0, 5).map((dispute, index) => `${index + 1}. ${dispute.name}`),
    ].join('\n'),
    tags: [`${caseData.disputes.length}\uAC1C \uC7C1\uC810`, `${unlockedEvidence.length}\uAC1C \uC99D\uAC70`],
    actions: [
      ...(focusedDispute ? [{ kind: 'focus_dispute' as const, label: COPY.viewCurrentDispute, disputeId: focusedDispute.id }] : []),
      ...(unlockedEvidence[0] ? [{ kind: 'open_evidence' as const, label: COPY.latestEvidence, evidenceId: unlockedEvidence[0].id }] : []),
    ],
  }
}

function buildPartyPayload(party: PartyId): PcInteractionPayload | null {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) {
    return null
  }

  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const focusedDispute = caseData.disputes.find((dispute) => dispute.id === state.lastFocusedDisputeId) ?? caseData.disputes[0] ?? null
  const tone = party === 'a' ? 'blue' : 'red'

  return {
    title: profile.name,
    subtitle: COPY.targetInfo,
    tone,
    body: [
      `${profile.age}\uC138 \u00B7 ${profile.occupation}`,
      '',
      `${COPY.relationship}: ${caseData.duo.relationshipType}`,
      `${COPY.watchingDispute}: ${focusedDispute ? focusedDispute.name : COPY.none}`,
    ].join('\n'),
    tags: [party === 'a' ? '\uB2F9\uC0AC\uC790 A' : '\uB2F9\uC0AC\uC790 B'],
    actions: focusedDispute
      ? [{ kind: 'focus_dispute' as const, label: COPY.relatedDispute, disputeId: focusedDispute.id }]
      : [],
  }
}

function buildDisputePayload(disputeId: string): PcInteractionPayload | null {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) {
    return null
  }

  const dispute = caseData.disputes.find((item) => item.id === disputeId)
  if (!dispute) {
    return null
  }

  const linkedEvidence = state.evidenceDefinitions.filter((evidence) => evidence.proves.includes(disputeId))
  const unlockedEvidence = linkedEvidence.filter((evidence) => state.evidenceStates[evidence.id]?.unlocked)

  return {
    title: dispute.name,
    subtitle: COPY.disputeInfo,
    tone: 'gold',
    body: [
      `${COPY.linkedEvidence} ${unlockedEvidence.length}/${linkedEvidence.length}`,
      '',
      linkedEvidence.length > 0
        ? linkedEvidence.slice(0, 4).map((evidence, index) => `${index + 1}. ${evidence.surfaceName ?? evidence.name}`).join('\n')
        : COPY.noLinkedEvidence,
    ].join('\n'),
    tags: [
      `\uC7C1\uC810 ${caseData.disputes.findIndex((item) => item.id === disputeId) + 1}`,
      `${linkedEvidence.length}\uAC1C \uC5F0\uACB0`,
    ],
    actions: unlockedEvidence[0]
      ? [{ kind: 'open_evidence' as const, label: COPY.representativeEvidence, evidenceId: unlockedEvidence[0].id }]
      : [],
  }
}

function buildEvidenceSelectionPayload(disputeId: string, party: PartyId): PcInteractionPayload | null {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) {
    return null
  }

  const dispute = caseData.disputes.find((item) => item.id === disputeId)
  if (!dispute) {
    return null
  }

  const partyName = party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
  const linkedEvidence = state.evidenceDefinitions.filter((evidence) => {
    const unlocked = state.evidenceStates[evidence.id]?.unlocked
    const related = evidence.proves.includes(disputeId)
    const relevant = !evidence.subjectParty || evidence.subjectParty === 'both' || evidence.subjectParty === party
    const alreadyPresented = state.evidenceStates[evidence.id]?.presentedTo?.includes(party) ?? false
    return Boolean(unlocked && related && relevant && !alreadyPresented)
  })

  if (linkedEvidence.length === 0) {
    return {
      title: COPY.presentEvidence,
      subtitle: COPY.noAvailableSelection,
      body: COPY.noRelevantEvidence,
      tone: 'gold',
      tags: [partyName, dispute.name],
      actions: [
        { kind: 'focus_dispute', label: COPY.relatedDispute, disputeId },
        { kind: 'close', label: COPY.close },
      ],
    }
  }

  return {
    title: COPY.presentEvidence,
    subtitle: COPY.selectMessage,
    body: COPY.selectEvidenceBody,
    tone: 'gold',
    tags: [partyName, dispute.name],
    actions: linkedEvidence.map((evidence) => ({
      kind: 'prepare_evidence_present' as const,
      label: evidence.surfaceName ?? evidence.name,
      evidenceId: evidence.id,
      disputeId,
      party,
    })),
  }
}

function buildEvidencePromptPayload(evidenceId: string, disputeId: string, party: PartyId): PcInteractionPayload | null {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) {
    return null
  }

  const evidence = state.evidenceDefinitions.find((item) => item.id === evidenceId)
  const dispute = caseData.disputes.find((item) => item.id === disputeId)
  if (!evidence || !dispute) {
    return null
  }

  const partyName = party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
  const context = party === 'a' ? evidence.partyContext?.a : evidence.partyContext?.b

  return {
    title: evidence.surfaceName ?? evidence.name,
    subtitle: COPY.presentWay,
    body: [
      `${partyName}\uC5D0\uAC8C \uC774 \uC99D\uAC70\uB97C \uC5B4\uB5A4 \uAD00\uC810\uC73C\uB85C \uB358\uC9C8\uC9C0 \uACE0\uB974\uC138\uC694.`,
      '',
      context?.questionAngle ? `${COPY.recommendedQuestion}: ${context.questionAngle}` : '\uCD94\uCC9C \uC9C8\uBB38 \uC5C6\uC74C',
      context?.implication ? `${COPY.implication}: ${context.implication}` : '',
    ].filter(Boolean).join('\n'),
    tone: 'gold',
    tags: [partyName, dispute.name],
    actions: [
      {
        kind: 'present_evidence',
        label: context?.questionAngle ?? COPY.directPresent,
        evidenceId,
        disputeId,
        party,
      },
      {
        kind: 'present_evidence',
        label: COPY.directPresent,
        evidenceId,
        disputeId,
        party,
      },
    ],
  }
}

function buildDisputePickerPayload(currentDisputeId: string): PcInteractionPayload | null {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) {
    return null
  }

  const currentDispute = caseData.disputes.find((item) => item.id === currentDisputeId)
  const candidates = caseData.disputes.filter((item) => item.id !== currentDisputeId)

  if (candidates.length === 0) {
    return {
      title: COPY.chooseDispute,
      subtitle: COPY.cannotMove,
      body: COPY.noOtherDispute,
      tone: 'blue',
      tags: currentDispute ? [currentDispute.name] : undefined,
      actions: [{ kind: 'close', label: COPY.close }],
    }
  }

  return {
    title: COPY.chooseDispute,
    subtitle: '\uB300\uC0C1 \uBCC0\uACBD',
    body: COPY.chooseDisputeBody,
    tone: 'blue',
    tags: currentDispute ? [currentDispute.name] : undefined,
    actions: candidates.map((dispute) => ({
      kind: 'focus_dispute' as const,
      label: dispute.name,
      disputeId: dispute.id,
    })),
  }
}

export default function PCInteractionPanel() {
  const dispatch = useActionDispatch()
  const setLastFocusedDisputeId = useStore((s) => s.setLastFocusedDisputeId)
  const setPendingEvidenceView = useStore((s) => s.setPendingEvidenceView)
  const setTargetParty = useStore((s) => s.setPcTargetParty)
  const setPcSummaryUnlocked = useStore((s) => s.setPcSummaryUnlocked)

  const [payload, setPayload] = useState<PcInteractionPayload | null>(null)

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<PcInteractionPayload>
      setPayload(customEvent.detail ?? null)
    }

    window.addEventListener(PC_OPEN_INTERACTION_PANEL_EVENT, handler)
    return () => window.removeEventListener(PC_OPEN_INTERACTION_PANEL_EVENT, handler)
  }, [])

  useEffect(() => {
    if (!payload) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPayload(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [payload])

  const closePanel = () => setPayload(null)

  const handleAction = (action: PcInteractionAction) => {
    if (action.disabled) {
      if (action.disabledReason) {
        showToast(action.disabledReason, 'info')
      }
      return
    }

    switch (action.kind) {
      case 'focus_dispute': {
        const disputeId = action.disputeId ?? null
        setLastFocusedDisputeId(disputeId)
        if (disputeId) {
          const nextPayload = buildDisputePayload(disputeId)
          if (nextPayload) {
            setPayload(nextPayload)
            return
          }
        }
        break
      }
      case 'open_evidence':
        // 증거 열람: PCEvidenceViewer 오버레이로 증거 내용 표시
        setPendingEvidenceView(action.evidenceId ?? null)
        setPayload(null)
        return
      case 'open_evidence_selection':
        if (action.party && action.disputeId) {
          const nextPayload = buildEvidenceSelectionPayload(action.disputeId, action.party)
          if (nextPayload) {
            setPayload(nextPayload)
            return
          }
        }
        break
      case 'prepare_evidence_present':
        if (action.party && action.evidenceId && action.disputeId) {
          const nextPayload = buildEvidencePromptPayload(action.evidenceId, action.disputeId, action.party)
          if (nextPayload) {
            setPayload(nextPayload)
            return
          }
        }
        break
      case 'present_evidence':
        if (action.party && action.evidenceId) {
          setTargetParty(action.party)
          if (action.disputeId) {
            setLastFocusedDisputeId(action.disputeId)
          }
          dispatch({
            type: 'evidence_present',
            evidenceId: action.evidenceId,
            target: action.party,
          })
          setPayload(null)
          return
        }
        break
      case 'open_dispute_picker':
        if (action.disputeId) {
          const nextPayload = buildDisputePickerPayload(action.disputeId)
          if (nextPayload) {
            setPayload(nextPayload)
            return
          }
        }
        break
      case 'set_target':
        if (action.party) {
          setTargetParty(action.party)
          const nextPayload = buildPartyPayload(action.party)
          if (nextPayload) {
            setPayload(nextPayload)
            return
          }
        }
        break
      case 'toast':
        if (action.text) {
          showToast(action.text, action.toastType ?? 'info')
        }
        break
      case 'run_question':
        if (action.party && action.disputeId && action.questionType) {
          setTargetParty(action.party)
          setLastFocusedDisputeId(action.disputeId)
          dispatch({
            type: 'question',
            questionType: action.questionType,
            target: action.party,
            disputeId: action.disputeId,
          })
        }
        break
      case 'run_special': {
        const state = useGameStore.getState()
        const target = action.party ?? state.pcTargetParty
        if (!target || !action.specialAction) {
          break
        }

        if (action.specialAction === 'objection') {
          if (!state.spend('skillPoints', 1)) {
            break
          }
          state.addDialogue({ speaker: 'judge', text: COPY.judgeObjection, relatedDisputes: [], turn: state.turnCount })
          state.changeEmotion(target, 12)
          for (const dispute of state.caseData?.disputes ?? []) {
            state.transitionLie(target, dispute.id, 'direct_question')
          }
          state.incrementTurn()
          break
        }

        if (action.specialAction === 'immediate_answer') {
          if (!action.disputeId) {
            break
          }
          if (!state.spend('skillPoints', 1)) {
            break
          }
          const currentEntry = (target === 'a' ? state.agentA : state.agentB).lieStateMap[action.disputeId]
          if (!currentEntry) {
            break
          }
          useGameStore.setState((prev) => target === 'a'
            ? {
                agentA: {
                  ...prev.agentA,
                  lieStateMap: {
                    ...prev.agentA.lieStateMap,
                    [action.disputeId!]: { ...prev.agentA.lieStateMap[action.disputeId!], currentState: 'S5' },
                  },
                },
              }
            : {
                agentB: {
                  ...prev.agentB,
                  lieStateMap: {
                    ...prev.agentB.lieStateMap,
                    [action.disputeId!]: { ...prev.agentB.lieStateMap[action.disputeId!], currentState: 'S5' },
                  },
                },
              })
          state.addDialogue({
            speaker: 'judge',
            text: COPY.immediateDemand,
            relatedDisputes: [action.disputeId],
            turn: state.turnCount,
          })
          setLastFocusedDisputeId(action.disputeId)
          dispatch({ type: 'question', questionType: 'fact_pursuit', target, disputeId: action.disputeId })
          break
        }

        if (action.specialAction === 'separation') {
          if (!state.spend('investigationTokens', 1)) {
            break
          }
          dispatch({ type: 'trust_action', actionType: 'separation', target })
          break
        }

        if (action.specialAction === 'confidential_protection') {
          if (!state.spend('skillPoints', 1)) {
            break
          }
          dispatch({ type: 'trust_action', actionType: 'confidential_protection', target })
          break
        }

        if (action.specialAction === 'advance_phase' && state.canAdvancePhase()) {
          state.advancePhase()
        }
        break
      }
      case 'open_summary':
        setPayload(buildCaseSummaryPayload())
        return
      case 'unlock_summary': {
        const state = useGameStore.getState()
        if (state.globalSkillPoints < 3) {
          showToast(COPY.insufficientSkill, 'warn')
          return
        }
        state.spend('skillPoints', 3)
        setPcSummaryUnlocked(true)
        setPayload(buildCaseSummaryPayload())
        return
      }
      case 'run_contradiction':
        if (action.party && action.disputeId && action.previousClaim && action.currentClaim) {
          handleContradictionPursue(action.party, action.disputeId, action.previousClaim, action.currentClaim)
        }
        break
      case 'summon_witness':
        if (action.witnessId) {
          dispatch({ type: 'call_witness', witnessId: action.witnessId })
        }
        break
      case 'close':
      default:
        break
    }

    setPayload(null)
  }

  if (!payload) {
    return null
  }

  return createPortal(
    <div className="pc-interaction-overlay" onClick={closePanel}>
      <div
        className={`pc-interaction-card tone-${payload.tone ?? 'neutral'}${payload.variant === 'feature' ? ' pc-interaction-card--feature' : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pc-interaction-card__header">
          <div>
            {payload.subtitle ? <div className="pc-interaction-card__subtitle">{payload.subtitle}</div> : null}
            <div className="pc-interaction-card__title">{payload.title}</div>
          </div>

          <button className="pc-interaction-card__close" onClick={closePanel} type="button">
            &times;
          </button>
        </div>

        {payload.tags && payload.tags.length > 0 ? (
          <div className="pc-interaction-card__tags">
            {payload.tags.map((tag) => (
              <span className="pc-interaction-card__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="pc-interaction-card__body">{payload.body}</div>

        {payload.variant === 'evidence' && payload.evidenceId ? (
          <EvidenceDetailSection evidenceId={payload.evidenceId} />
        ) : null}

        {payload.actions && payload.actions.length > 0 ? (
          <div className="pc-interaction-card__actions">
            {payload.actions.map((action) => (
              <button
                className={`pc-interaction-card__action${action.disabled ? ' is-disabled' : ''}`}
                key={`${action.kind}:${action.label}:${action.disputeId ?? action.evidenceId ?? action.party ?? ''}`}
                onClick={() => handleAction(action)}
                title={action.disabledReason}
                disabled={action.disabled}
                type="button"
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}

function EvidenceDetailSection({ evidenceId }: { evidenceId: string }) {
  const dispatch = useActionDispatch()
  const caseData = useStore((s) => s.caseData)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const investigateEvidence = useStore((s) => s.investigateEvidence)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)

  if (!caseData) return null
  const evidence = caseData.evidence.find((e) => e.id === evidenceId)
  if (!evidence) return null

  const state = evidenceStates[evidence.id]
  const meta = evidence.meta
  const disputes = caseData.disputes.filter((d) => evidence.proves.includes(d.id))
  const investigatedKeys = new Set(state?.investigatedActions ?? [])

  // Determine stage states: revealed / unlockable / locked
  const stages = (evidence.investigationStages ?? []).map((stage, i) => {
    const revealed = investigatedKeys.has(stage.revealKey)
    const allPreviousRevealed = (evidence.investigationStages ?? [])
      .slice(0, i)
      .every((prev) => investigatedKeys.has(prev.revealKey))
    const unlockable = !revealed && allPreviousRevealed
    return { ...stage, revealed, unlockable, index: i }
  })

  const handleInvestigate = (revealKey: string) => {
    investigateEvidence(evidenceId, revealKey)
  }

  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const presentedToA = state?.presentedTo?.includes('a') ?? false
  const presentedToB = state?.presentedTo?.includes('b') ?? false

  return (
    <div className="pc-ev-detail">
      {/* Meta + disputes row */}
      <div className="pc-ev-detail__meta">
        <span className="pc-ev-detail__tag is-trust">{meta?.trustLabel ?? (evidence.reliability === 'hard' ? '하드 증거' : '소프트 증거')}</span>
        <span className="pc-ev-detail__tag is-source">{meta?.sourceLabel ?? '출처 불명'}</span>
        {disputes.map((d) => (
          <span className="pc-ev-detail__dispute" key={d.id}>{d.name}</span>
        ))}
      </div>

      {/* Investigation stages */}
      {stages.length > 0 ? (
        <div className="pc-ev-detail__stages">
          <span className="pc-ev-detail__stages-label">조사 단계</span>
          {stages.map((stage) => (
            <div className={`pc-ev-detail__stage ${stage.revealed ? 'is-open' : stage.unlockable ? 'is-ready' : 'is-locked'}`} key={stage.index}>
              <span className="pc-ev-detail__stage-num">
                {stage.revealed ? '✓' : stage.unlockable ? '?' : '🔒'}
              </span>
              <div className="pc-ev-detail__stage-body">
                {stage.revealed ? (
                  <span className="pc-ev-detail__stage-a">{evidence.investigationResults[stage.revealKey]}</span>
                ) : stage.unlockable ? (
                  <button className="pc-ev-detail__investigate-btn" onClick={() => handleInvestigate(stage.revealKey)} type="button">
                    조사 시도
                  </button>
                ) : (
                  <span className="pc-ev-detail__stage-lock">조사 단계 {stage.stage} — 해금 필요</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Present buttons — A/B split */}
      <div className="pc-ev-detail__present">
        <button
          className={`pc-ev-detail__present-btn is-a${presentedToA ? ' is-done' : ''}`}
          disabled={presentedToA}
          onClick={() => {
            if (!presentedToA) {
              dispatch({ type: 'evidence_present', evidenceId, target: 'a' })
            }
          }}
          type="button"
        >
          <PCSvgIcon id="i-man" size={24} />
          <span>{presentedToA ? `${nameA} 제시 완료` : `${nameA}에게 제시`}</span>
        </button>
        <button
          className={`pc-ev-detail__present-btn is-b${presentedToB ? ' is-done' : ''}`}
          disabled={presentedToB}
          onClick={() => {
            if (!presentedToB) {
              dispatch({ type: 'evidence_present', evidenceId, target: 'b' })
            }
          }}
          type="button"
        >
          <PCSvgIcon id="i-woman" size={24} />
          <span>{presentedToB ? `${nameB} 제시 완료` : `${nameB}에게 제시`}</span>
        </button>
      </div>
    </div>
  )
}
