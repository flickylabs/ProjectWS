import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { handleContradictionPursue, useActionDispatch, suppressTransitionChoice, unsuppressTransitionChoice } from '../../../hooks/useActionDispatch'
import { useGameStore, useStore } from '../../../store/useGameStore'
import type { PartyId, QuestionType } from '../../../types'
import { showToast } from '../../common/Toast'
import PCSvgIcon from '../icons/PCSvgIcon'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { jumpToDialogue } from '../observation/JudgeObservationSection'

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
  body?: string
  tone?: InteractionTone
  variant?: 'default' | 'feature' | 'evidence' | 'dialogue' | 'witness'
  tags?: string[]
  actions?: PcInteractionAction[]
  /** [TC-A1 D1] vs 구도 — 모순 추궁 모달 등에서 좌/우 진술 비교 표시 */
  contrast?: {
    left:  { label: string; text: string }
    right: { label: string; text: string }
  }
  blocks?: { title: string; text: string }[]
  evidenceId?: string
  /** evidence variant: 타입 레이블 (기기, 기록 등) */
  evidenceTypeLabel?: string
  /** evidence variant: 메타 태그 배열 (보통, 기관 등) */
  evidenceMetaTags?: string[]
  /** dialogue variant fields */
  dialogueTurn?: number
  dialogueSpeaker?: string
  dialogueSpeakerName?: string
  dialogueDisputeIds?: string[]
  dialogueBehaviorHint?: string
  /** dialogue variant: 실제 대화 id — 있으면 '바로가기' 버튼 노출 */
  dialogueId?: string
  /** backdrop (화면 덮는 어두운 배경) 여부. 기본 true. false이면 상단 중앙 소프트 팝업으로 렌더 */
  backdrop?: boolean
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
      ...caseData.disputes.filter((d) => !d.hidden && d.v3Visibility !== 'hidden').slice(0, 5).map((dispute, index) => `${index + 1}. ${dispute.name}`),
    ].join('\n'),
    tags: [`${caseData.disputes.filter((d) => !d.hidden && d.v3Visibility !== 'hidden').length}\uAC1C \uC7C1\uC810`, `${unlockedEvidence.length}\uAC1C \uC99D\uAC70`],
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

export function buildEvidenceSelectionPayload(disputeId: string, party: PartyId): PcInteractionPayload | null {
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
  const otherPartyName = party === 'a' ? caseData.duo.partyB.name : caseData.duo.partyA.name
  // 모든 unlocked + related + 미제시 증거를 표시. subjectParty 비매칭은 disabled로 표시.
  const linkedEvidence = state.evidenceDefinitions.filter((evidence) => {
    const unlocked = state.evidenceStates[evidence.id]?.unlocked
    const related = evidence.proves.includes(disputeId)
    const alreadyPresented = state.evidenceStates[evidence.id]?.presentedTo?.includes(party) ?? false
    return Boolean(unlocked && related && !alreadyPresented)
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
    actions: linkedEvidence.map((evidence) => {
      const relevant = !evidence.subjectParty || evidence.subjectParty === 'both' || evidence.subjectParty === party
      return {
        kind: 'prepare_evidence_present' as const,
        label: evidence.surfaceName ?? evidence.name,
        evidenceId: evidence.id,
        disputeId,
        party,
        disabled: !relevant,
        disabledReason: !relevant ? `${otherPartyName} 측 증거입니다. ${partyName}에게는 추궁 효과가 없습니다.` : undefined,
      }
    }),
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

export function buildDisputePickerPayload(currentDisputeId: string): PcInteractionPayload | null {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) {
    return null
  }

  const vis = state.discovery.disputeVisibility
  const currentDispute = caseData.disputes.find((item) => item.id === currentDisputeId)
  const candidates = caseData.disputes.filter((item) => item.id !== currentDisputeId && (!vis[item.id] || vis[item.id].visibility !== 'hidden'))

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
  const savedPayloadRef = useRef<PcInteractionPayload | null>(null)

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<PcInteractionPayload>
      setPayload(customEvent.detail ?? null)
    }

    window.addEventListener(PC_OPEN_INTERACTION_PANEL_EVENT, handler)
    return () => window.removeEventListener(PC_OPEN_INTERACTION_PANEL_EVENT, handler)
  }, [])

  // SVG 뷰어 닫힐 때 증거 팝업 복귀
  useEffect(() => {
    const handler = () => {
      if (savedPayloadRef.current) {
        setPayload(savedPayloadRef.current)
        savedPayloadRef.current = null
      }
    }
    window.addEventListener('pc:evidence-viewer-closed', handler)
    return () => window.removeEventListener('pc:evidence-viewer-closed', handler)
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
        // 증거 열람: SVG 뷰어 열기 → 닫으면 이 팝업으로 복귀
        savedPayloadRef.current = payload
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
          suppressTransitionChoice()
          dispatch({
            type: 'evidence_present',
            evidenceId: action.evidenceId,
            target: action.party,
          })
          setTimeout(unsuppressTransitionChoice, 2000)
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
          // 전략 패널에서 실행한 액션 → 연속 전략 선택 차단
          suppressTransitionChoice()
          dispatch({
            type: 'question',
            questionType: action.questionType,
            target: action.party,
            disputeId: action.disputeId,
          })
          // 액션 처리 완료 후 차단 해제 (비동기 처리 후)
          setTimeout(unsuppressTransitionChoice, 2000)
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
            showToast('스킬 포인트가 부족합니다.', 'warn')
            break
          }
          window.dispatchEvent(new CustomEvent('pc:court-control-used', {
            detail: { action: 'immediate_answer', label: '즉답 요구' },
          }))
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
          // courtControl은 applyTrustEffect에서 차감 (이중 과금 방지)
          if (!state.canAfford('courtControl', 1)) {
            showToast('법정 지배력이 부족합니다.', 'warn')
            break
          }
          dispatch({ type: 'trust_action', actionType: 'separation', target })
          break
        }

        if (action.specialAction === 'confidential_protection') {
          // courtControl은 applyTrustEffect에서 차감 (이중 과금 방지)
          if (!state.canAfford('courtControl', 1)) {
            showToast('법정 지배력이 부족합니다.', 'warn')
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
        window.dispatchEvent(new Event('pc:open-record-summary'))
        setPayload(null)
        return
      case 'unlock_summary': {
        const state = useGameStore.getState()
        if (state.resources.skillPoints < 3) {
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
          const store = useGameStore.getState()
          store.pushGameEvent({
            id: store.gameEventLog.length + 1,
            turn: store.turnCount,
            type: 'event_trigger',
            message: `🗣️ 증인 소환: ${action.label.replace(/\s*(재)?소환$/, '')}`,
            timestamp: Date.now(),
          })
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

  const softPopup = payload.backdrop === false
  const wrapperClass = softPopup ? 'pc-interaction-softpop' : 'pc-interaction-overlay'
  const cardExtra = softPopup ? ' pc-interaction-card--softpop' : ''

  return createPortal(
    <div className={wrapperClass} onClick={softPopup ? undefined : closePanel}>
      <div
        className={`pc-interaction-card tone-${payload.tone ?? 'neutral'}${payload.variant === 'feature' ? ' pc-interaction-card--feature' : ''}${cardExtra}`}
        onClick={(event) => event.stopPropagation()}
      >
        {payload.variant === 'dialogue' ? null : payload.variant === 'evidence' ? (
          <div className="pc-interaction-card__header pc-interaction-card__header--evidence">
            <div className="pc-ev-header-left">
              <div className="pc-ev-header-top">
                {payload.evidenceTypeLabel ? <span className="pc-ev-header-type">{payload.evidenceTypeLabel}</span> : null}
                {payload.evidenceMetaTags?.map((tag) => (
                  <span className="pc-ev-header-meta-tag" key={tag}>{tag}</span>
                ))}
              </div>
              <div className="pc-interaction-card__title">{payload.title}</div>
            </div>
            <button className="pc-interaction-card__close" onClick={closePanel} type="button">
              &times;
            </button>
          </div>
        ) : (
          <div className="pc-interaction-card__header">
            <div>
              {payload.subtitle ? <div className="pc-interaction-card__subtitle">{payload.subtitle}</div> : null}
              <div className="pc-interaction-card__title">{payload.title}</div>
            </div>
            <button className="pc-interaction-card__close" onClick={closePanel} type="button">
              &times;
            </button>
          </div>
        )}

        {payload.tags && payload.tags.length > 0 ? (
          <div className="pc-interaction-card__tags">
            {payload.tags.map((tag) => (
              <span className="pc-interaction-card__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {payload.variant === 'dialogue' ? (
          <DialogueDetailSection payload={payload} onClose={closePanel} />
        ) : payload.variant === 'witness' ? (
          <WitnessDetailSection onAction={handleAction} />
        ) : payload.variant === 'evidence' ? (
          <div className="pc-interaction-card__body pc-ev-body-wrap">
            <span>{payload.body}</span>
            {payload.evidenceId ? (
              <button className="pc-ev-viewer-btn" onClick={() => handleAction({ kind: 'open_evidence', label: '증거 열람', evidenceId: payload.evidenceId })} type="button">
                증거 열람
              </button>
            ) : null}
          </div>
        ) : payload.contrast ? (
          // [TC-A1 D1] vs 구도 — 모순 추궁 모달이 모순 감지 모달과 동일한 좌/우 + VS 형태로 통일
          <div className="pc-interaction-card__contrast-wrap">
            {payload.body ? <div className="pc-interaction-card__contrast-intro">{payload.body}</div> : null}
            <div className="pc-interaction-card__contrast">
              <div className="pc-interaction-card__contrast-side is-left">
                <div className="pc-interaction-card__contrast-label">{payload.contrast.left.label}</div>
                <div className="pc-interaction-card__contrast-text">"{payload.contrast.left.text}"</div>
              </div>
              <div className="pc-interaction-card__contrast-vs" aria-hidden="true">
                <span>VS</span>
              </div>
              <div className="pc-interaction-card__contrast-side is-right">
                <div className="pc-interaction-card__contrast-label">{payload.contrast.right.label}</div>
                <div className="pc-interaction-card__contrast-text">"{payload.contrast.right.text}"</div>
              </div>
            </div>
            {payload.blocks?.length ? (
              <div className="pc-interaction-card__contrast-intro">
                {payload.blocks.map((block) => (
                  <div key={block.title}>
                    <strong>{block.title}</strong>: {block.text}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="pc-interaction-card__body">{payload.body}</div>
        )}

        {payload.variant === 'evidence' && payload.evidenceId ? (
          <EvidenceDetailSection evidenceId={payload.evidenceId} onClose={() => setPayload(null)} />
        ) : null}

        {payload.variant !== 'witness' && payload.actions && payload.actions.length > 0 ? (
          <div className="pc-interaction-card__actions">
            {payload.actions.filter((a) => !(payload.variant === 'evidence' && a.kind === 'open_evidence')).map((action) => (
              <button
                className={`pc-interaction-card__action${action.disabled ? ' is-disabled' : ''}${action.kind === 'open_evidence' ? ' is-viewer-link' : ''}`}
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

function EvidenceDetailSection({ evidenceId, onClose }: { evidenceId: string; onClose?: () => void }) {
  const dispatch = useActionDispatch()
  const caseData = useStore((s) => s.caseData)
  const evidenceStates = useStore((s) => s.evidenceStates)
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
    dispatch({ type: 'evidence_investigate', evidenceId, subAction: revealKey } as any)
  }

  // 첫 조사(0→1)는 무료 열람, 2·3회차는 토큰 1 소비
  const investigateCostLabel = investigatedKeys.size === 0 ? '-0' : '-1'

  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const presentedToA = state?.presentedTo?.includes('a') ?? false
  const presentedToB = state?.presentedTo?.includes('b') ?? false
  // subjectParty 분기 — 비매칭 측에 제시 = 게임 메커니즘상 효과 X
  const subjectParty = evidence.subjectParty ?? 'both'
  const aRelevant = subjectParty === 'both' || subjectParty === 'a'
  const bRelevant = subjectParty === 'both' || subjectParty === 'b'

  return (
    <div className="pc-ev-detail">
      {/* Dispute section */}
      {disputes.length > 0 ? (
        <div className="pc-ev-detail__dispute-section">
          <span className="pc-ev-detail__dispute-label">주요 쟁점</span>
          <div className="pc-ev-detail__dispute-names">
            {disputes.map((d) => (
              <span className="pc-ev-detail__dispute" key={d.id}>{d.name}</span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Investigation stages */}
      {stages.length > 0 ? (
        <div className="pc-ev-detail__stages">
          <span className="pc-ev-detail__stages-label">조사 단계</span>
          {stages.map((stage) => {
            // is-ready 일 때만 전체 영역을 버튼으로 (전체 클릭 가능, 안쪽 별도 버튼 X)
            if (stage.unlockable && !stage.revealed) {
              return (
                <button
                  className="pc-ev-detail__stage is-ready"
                  key={stage.index}
                  onClick={() => handleInvestigate(stage.revealKey)}
                  type="button"
                >
                  <span className="pc-ev-detail__stage-num">?</span>
                  <div className="pc-ev-detail__stage-body">
                    <span className="pc-ev-detail__investigate-cost"><PCSvgIcon id="i-search" size={18} /> {investigateCostLabel}</span>
                    <span className="pc-ev-detail__investigate-label">조사 시도</span>
                  </div>
                </button>
              )
            }
            return (
              <div className={`pc-ev-detail__stage ${stage.revealed ? 'is-open' : 'is-locked'}`} key={stage.index}>
                <span className="pc-ev-detail__stage-num">
                  {stage.revealed ? '✓' : <PCSvgIcon id="i-lock" size={14} />}
                </span>
                <div className="pc-ev-detail__stage-body">
                  {stage.revealed ? (
                    <span className="pc-ev-detail__stage-a">{evidence.investigationResults[stage.revealKey]}</span>
                  ) : (
                    <span className="pc-ev-detail__stage-lock">조사 단계 {stage.stage} — 해금 필요</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : null}

      {/* Present buttons — A/B split. subjectParty 비매칭 측은 disabled + 사유 표시 */}
      <div className="pc-ev-detail__present">
        <button
          className={`pc-ev-detail__present-btn is-a${presentedToA ? ' is-done' : ''}${!aRelevant ? ' is-mismatch' : ''}`}
          disabled={presentedToA || !aRelevant}
          title={!aRelevant ? `${nameB} 측 증거 — ${nameA}에게 제시 효과 없음` : (presentedToA ? '이미 제시함' : undefined)}
          onClick={() => {
            if (!presentedToA && aRelevant) {
              onClose?.()
              window.setTimeout(() => {
                dispatch({ type: 'evidence_present', evidenceId, target: 'a' })
              }, 220)
            }
          }}
          type="button"
        >
          <span className="pc-ev-detail__present-avatar">
            <PCCharacterPortrait alt={nameA} caseId={caseData.caseId} emotion="defensive" fallbackSymbolId="i-person" party="a" size={28} />
          </span>
          <span>{presentedToA ? `${nameA} 제시 완료` : !aRelevant ? `${nameA} (대상 아님)` : `${nameA}에게 제시`}</span>
        </button>
        <button
          className={`pc-ev-detail__present-btn is-b${presentedToB ? ' is-done' : ''}${!bRelevant ? ' is-mismatch' : ''}`}
          disabled={presentedToB || !bRelevant}
          title={!bRelevant ? `${nameA} 측 증거 — ${nameB}에게 제시 효과 없음` : (presentedToB ? '이미 제시함' : undefined)}
          onClick={() => {
            if (!presentedToB && bRelevant) {
              onClose?.()
              window.setTimeout(() => {
                dispatch({ type: 'evidence_present', evidenceId, target: 'b' })
              }, 220)
            }
          }}
          type="button"
        >
          <span className="pc-ev-detail__present-avatar">
            <PCCharacterPortrait alt={nameB} caseId={caseData.caseId} emotion="defensive" fallbackSymbolId="i-person" party="b" size={28} />
          </span>
          <span>{presentedToB ? `${nameB} 제시 완료` : !bRelevant ? `${nameB} (대상 아님)` : `${nameB}에게 제시`}</span>
        </button>
      </div>
    </div>
  )
}

const SPEAKER_TONE_CLASS: Record<string, string> = {
  a: 'is-a',
  b: 'is-b',
  judge: 'is-judge',
  witness: 'is-witness',
  system: 'is-system',
}

function DialogueDetailSection({ payload, onClose }: { payload: PcInteractionPayload; onClose: () => void }) {
  const caseData = useStore((s) => s.caseData)
  const disputes = caseData?.disputes ?? []
  const relatedIds = payload.dialogueDisputeIds ?? []
  const relatedNames = relatedIds.map((id) => disputes.find((d) => d.id === id)?.name).filter(Boolean) as string[]
  const speakerClass = SPEAKER_TONE_CLASS[payload.dialogueSpeaker ?? ''] ?? ''
  const speakerIconId = payload.dialogueSpeaker === 'a' ? 'i-man'
    : payload.dialogueSpeaker === 'b' ? 'i-woman'
    : payload.dialogueSpeaker === 'judge' ? 'i-scale'
    : payload.dialogueSpeaker === 'witness' ? 'i-witness'
    : 'i-bulb'
  const party = payload.dialogueSpeaker === 'a' || payload.dialogueSpeaker === 'b'
    ? payload.dialogueSpeaker
    : null
  return (
    <div className={`pc-dialogue-popup${speakerClass ? ` pc-dialogue-popup--${speakerClass}` : ''}`}>
      <div className="pc-dialogue-popup__header-row">
        <div className="pc-dialogue-popup__identity">
          <span className={`pc-dialogue-popup__portrait ${speakerClass}`}>
            {party ? (
              <PCCharacterPortrait
                alt={payload.dialogueSpeakerName}
                caseId={caseData?.caseId}
                emotion="defensive"
                fallbackSymbolId={speakerIconId}
                party={party}
                size={34}
              />
            ) : (
              <PCSvgIcon id={speakerIconId} size={18} />
            )}
          </span>
          <div className="pc-dialogue-popup__speaker-copy">
            <span className="pc-dialogue-popup__label">발언 기록</span>
            <span className="pc-dialogue-popup__name-line">
              <span className={`pc-dialogue-popup__speaker ${speakerClass}`}>
                {payload.dialogueSpeakerName ?? '시스템'}
              </span>
              {relatedNames.length > 0 ? (
                <span className="pc-dialogue-popup__inline-chips" aria-label="관련 쟁점">
                  {relatedNames.map((name, i) => (
                    <span className="pc-dialogue-popup__dispute-name" key={`${name}:${i}`}>{name}</span>
                  ))}
                </span>
              ) : null}
            </span>
          </div>
        </div>
        <div className="pc-dialogue-popup__controls">
          <span className="pc-dialogue-popup__turn">Turn {payload.dialogueTurn ?? 0}</span>
          {payload.dialogueId ? (
            <button
              className="pc-dialogue-popup__goto"
              onClick={() => {
                const id = payload.dialogueId
                onClose()
                if (id) {
                  window.setTimeout(() => jumpToDialogue(id), 220)
                }
              }}
              type="button"
              title="해당 메시지로 이동"
            >
              바로가기
            </button>
          ) : null}
          <button className="pc-dialogue-popup__close" onClick={onClose} type="button" aria-label="닫기">&times;</button>
        </div>
      </div>

      <div className="pc-dialogue-popup__divider" />

      <div className="pc-dialogue-popup__body">
        <div className="pc-dialogue-popup__speech">{payload.body}</div>
        {payload.dialogueBehaviorHint ? (
          <p className="pc-dialogue-popup__observation">{payload.dialogueBehaviorHint}</p>
        ) : null}
      </div>
    </div>
  )
}

function WitnessDetailSection({ onAction }: { onAction: (action: PcInteractionAction) => void }) {
  const caseData = useStore((s) => s.caseData)
  const calledWitnesses = useStore((s) => s.calledWitnesses)
  const unlockedWitnessIds = useStore((s) => s.unlockedWitnessIds)

  if (!caseData) return null

  // socialGraph entries 모두 표시. slot whitelist 제거 — 신규 사건의
  // close_friend / neutral_observer / community_witness 등이 누락되던 결함 fix.
  const witnesses = caseData.duo.socialGraph

  return (
    <div className="pc-witness-panel">
      {witnesses.map((w) => {
        const called = calledWitnesses.includes(w.id)
        const slotLabel = w.slot === 'institutional' ? '기관 증인' : '관련인'
        const gated = (w.unlockedByDossier ?? []).length > 0
        const locked = gated && !unlockedWitnessIds.includes(w.id)
        return (
          <div className={`pc-witness-card${called ? ' is-called' : ''}${locked ? ' is-locked' : ''}`} key={w.id}>
            <div className="pc-witness-card__info">
              <span className="pc-witness-card__name">{locked ? '???' : w.name}</span>
              <span className="pc-witness-card__meta">{slotLabel}{locked ? ' · 잠김' : ''}</span>
              <span className="pc-witness-card__scope">
                {locked ? '조합으로 단서를 확보해야 소환할 수 있습니다' : (w.knowledgeScope ?? '관련 사실에 대해 알고 있음')}
              </span>
            </div>
            <button
              className={`pc-witness-card__btn${called ? ' is-done' : ''}${locked ? ' is-locked' : ''}`}
              disabled={locked}
              onClick={() => !locked && onAction({ kind: 'summon_witness', label: `${w.name} 소환`, witnessId: w.id })}
              type="button"
            >
              {locked ? '잠김' : called ? '재소환' : '소환'}
            </button>
          </div>
        )
      })}
    </div>
  )
}
