import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { handleContradictionPursue, useActionDispatch, suppressTransitionChoice, unsuppressTransitionChoice } from '../../../hooks/useActionDispatch'
import { useGameStore, useStore } from '../../../store/useGameStore'
import type { PartyId, QuestionType } from '../../../types'
import { showToast } from '../../common/Toast'
import PCSvgIcon from '../icons/PCSvgIcon'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { jumpToDialogue } from '../observation/JudgeObservationSection'
import { getWitnessPortraitPath } from '../../../utils/witnessPortraits'
import { sanitizeKoreanSurfaceText } from '../../../utils/korean'
import { emitVerdictCtaCollapsed } from './verdictAdvanceEvents'
import { translate, useI18n, type LocaleCode, type MessageKey } from '../../../i18n'
import { getRuntimeTextLocale, localizeRuntimeText } from '../../../i18n/runtimeText'
import type { UnsafeAny } from '../../../types/lint'


export const PC_OPEN_INTERACTION_PANEL_EVENT = 'pc:open-interaction-panel'
export const PC_CLOSE_INTERACTION_PANEL_EVENT = 'pc:close-interaction-panel'

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
    | 'collapse_verdict_cta'
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
  get caseSummary() { return translate('pc.interaction.caseSummary') },
  get preparing() { return translate('pc.interaction.preparing') },
  get noCase() { return translate('pc.interaction.noCase') },
  get currentDispute() { return translate('pc.common.currentDispute') },
  get noDispute() { return translate('pc.common.none') },
  get phase() { return translate('pc.interaction.phase') },
  get turn() { return translate('pc.interaction.turn') },
  get unlockedEvidence() { return translate('pc.interaction.unlockedEvidence') },
  get disputeList() { return translate('pc.interaction.disputeList') },
  get viewCurrentDispute() { return translate('pc.interaction.viewCurrentDispute') },
  get latestEvidence() { return translate('pc.interaction.latestEvidence') },
  get targetInfo() { return translate('pc.interaction.targetInfo') },
  get relationship() { return translate('pc.interaction.relationship') },
  get watchingDispute() { return translate('pc.interaction.watchingDispute') },
  get none() { return translate('pc.common.none') },
  get relatedDispute() { return translate('pc.common.relatedDispute') },
  get disputeInfo() { return translate('pc.interaction.disputeInfo') },
  get linkedEvidence() { return translate('pc.interaction.linkedEvidence') },
  get noLinkedEvidence() { return translate('pc.interaction.noLinkedEvidence') },
  get representativeEvidence() { return translate('pc.interaction.representativeEvidence') },
  get presentEvidence() { return translate('pc.interaction.presentEvidence') },
  get noAvailableSelection() { return translate('pc.interaction.noAvailableSelection') },
  get noRelevantEvidence() { return translate('pc.interaction.noRelevantEvidence') },
  get close() { return translate('pc.common.close') },
  get selectMessage() { return translate('pc.interaction.selectMessage') },
  get selectEvidenceBody() { return translate('pc.interaction.selectEvidenceBody') },
  get presentWay() { return translate('pc.interaction.presentWay') },
  get recommendedQuestion() { return translate('pc.interaction.recommendedQuestion') },
  get implication() { return translate('pc.interaction.implication') },
  get directPresent() { return translate('pc.interaction.directPresent') },
  get chooseDispute() { return translate('pc.interaction.chooseDispute') },
  get chooseDisputeBody() { return translate('pc.interaction.chooseDisputeBody') },
  get cannotMove() { return translate('pc.interaction.cannotMove') },
  get noOtherDispute() { return translate('pc.interaction.noOtherDispute') },
  get actionSelect() { return translate('pc.interaction.actionSelect') },
  get insufficientSkill() { return translate('pc.interaction.insufficientSkill') },
  get judgeObjection() { return translate('pc.actions.dialogue.objection') },
  get immediateDemand() { return translate('pc.actions.dialogue.immediateDemand') },
} as const

const PANEL_ACTION_CLOSE_DELAY_MS = 140

function localizePanelText(value: string | undefined | null): string {
  return localizeRuntimeText(sanitizeKoreanSurfaceText(value ?? ''), getRuntimeTextLocale())
}

export function openPcInteractionPanel(payload: PcInteractionPayload): void {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent<PcInteractionPayload>(PC_OPEN_INTERACTION_PANEL_EVENT, { detail: payload }))
}

export function closePcInteractionPanel(): void {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new Event(PC_CLOSE_INTERACTION_PANEL_EVENT))
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
      `${COPY.currentDispute}: ${focusedDispute ? localizePanelText(focusedDispute.name) : COPY.noDispute}`,
      `${COPY.phase}: Phase ${state.currentPhase}`,
      `${COPY.turn}: ${state.turnCount}`,
      `${COPY.unlockedEvidence}: ${unlockedEvidence.length}/${state.evidenceDefinitions.length}`,
      '',
      COPY.disputeList,
      ...caseData.disputes.filter((d) => !d.hidden && d.v3Visibility !== 'hidden').slice(0, 5).map((dispute, index) => `${index + 1}. ${localizePanelText(dispute.name)}`),
    ].join('\n'),
    tags: [
      translate('pc.interaction.disputeCount', {
        count: caseData.disputes.filter((d) => !d.hidden && d.v3Visibility !== 'hidden').length,
      }),
      translate('pc.interaction.evidenceCount', { count: unlockedEvidence.length }),
    ],
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
    title: localizePanelText(profile.name),
    subtitle: COPY.targetInfo,
    tone,
    body: [
      translate('pc.interaction.ageOccupation', { age: profile.age, occupation: localizePanelText(profile.occupation) }),
      '',
      `${COPY.relationship}: ${localizePanelText(caseData.duo.relationshipType)}`,
      `${COPY.watchingDispute}: ${focusedDispute ? localizePanelText(focusedDispute.name) : COPY.none}`,
    ].join('\n'),
    tags: [party === 'a' ? translate('pc.interaction.partyA') : translate('pc.interaction.partyB')],
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
    title: localizePanelText(dispute.name),
    subtitle: COPY.disputeInfo,
    tone: 'gold',
    body: [
      `${COPY.linkedEvidence} ${unlockedEvidence.length}/${linkedEvidence.length}`,
      '',
      linkedEvidence.length > 0
        ? linkedEvidence.slice(0, 4).map((evidence, index) => `${index + 1}. ${localizePanelText(evidence.surfaceName ?? evidence.name)}`).join('\n')
        : COPY.noLinkedEvidence,
    ].join('\n'),
    tags: [
      translate('pc.interaction.disputeNumber', { number: caseData.disputes.findIndex((item) => item.id === disputeId) + 1 }),
      translate('pc.interaction.linkedCount', { count: linkedEvidence.length }),
    ],
    actions: unlockedEvidence[0]
      ? [{ kind: 'open_evidence' as const, label: COPY.representativeEvidence, evidenceId: unlockedEvidence[0].id }]
      : [],
  }
}

function getEvidenceInvestigationStage(state?: { investigatedActions?: string[] }): number {
  return state?.investigatedActions?.length ?? 0
}

function getEvidencePresentedStages(
  state: { presentedStagesByParty?: Partial<Record<PartyId, number[]>> } | undefined,
  party: PartyId,
): number[] {
  return state?.presentedStagesByParty?.[party] ?? []
}

function isEvidencePresentedForCurrentStage(
  state: { investigatedActions?: string[]; presentedStagesByParty?: Partial<Record<PartyId, number[]>> } | undefined,
  party: PartyId,
): boolean {
  const stage = getEvidenceInvestigationStage(state)
  return stage > 0 && getEvidencePresentedStages(state, party).includes(stage)
}

function getEvidencePresentDisabledReason(
  state: { investigatedActions?: string[]; presentedStagesByParty?: Partial<Record<PartyId, number[]>> } | undefined,
  party: PartyId,
  partyName: string,
  otherPartyName: string,
  relevant: boolean,
): string | undefined {
  if (!relevant) {
    return translate('pc.interaction.evidenceOtherParty', { otherParty: otherPartyName, party: partyName })
  }
  const stage = getEvidenceInvestigationStage(state)
  if (stage <= 0) {
    return translate('pc.interaction.evidenceNeedsInvestigation')
  }
  if (isEvidencePresentedForCurrentStage(state, party)) {
    return translate('pc.interaction.evidenceStageAnswered', { stage })
  }
  return undefined
}

function getInvestigationTokenCostForStage(stage: number): number {
  if (stage <= 1) return 0
  return stage === 2 ? 1 : 2
}

function formatPresentButtonLabel(partyName: string, stage: number, presented: boolean, relevant: boolean): string {
  if (presented) {
    return translate('pc.interaction.presentDone', { party: partyName, stage })
  }
  if (!relevant) {
    return translate('pc.interaction.notTarget', { party: partyName })
  }
  if (stage <= 0) {
    return translate('pc.interaction.presentAfterInvestigation')
  }
  return translate('pc.interaction.presentToParty', { party: partyName })
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

  const partyName = localizePanelText(party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name)
  const otherPartyName = localizePanelText(party === 'a' ? caseData.duo.partyB.name : caseData.duo.partyA.name)
  // 모든 unlocked + related + 미제시 증거를 표시. subjectParty 비매칭은 disabled로 표시.
  const linkedEvidence = state.evidenceDefinitions.filter((evidence) => {
    const unlocked = state.evidenceStates[evidence.id]?.unlocked
    const related = evidence.proves.includes(disputeId)
    return Boolean(unlocked && related)
  })

  if (linkedEvidence.length === 0) {
    return {
      title: COPY.presentEvidence,
      subtitle: COPY.noAvailableSelection,
      body: COPY.noRelevantEvidence,
      tone: 'gold',
      tags: [partyName, localizePanelText(dispute.name)],
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
    tags: [partyName, localizePanelText(dispute.name)],
    actions: linkedEvidence.map((evidence) => {
      const evidenceState = state.evidenceStates[evidence.id]
      const stage = getEvidenceInvestigationStage(evidenceState)
      const relevant = !evidence.subjectParty || evidence.subjectParty === 'both' || evidence.subjectParty === party
      const disabledReason = getEvidencePresentDisabledReason(evidenceState, party, partyName, otherPartyName, relevant)
      return {
        kind: 'prepare_evidence_present' as const,
        label: `${localizePanelText(evidence.surfaceName ?? evidence.name)}${stage > 0 ? ` · ${translate('pc.interaction.stageSuffix', { stage })}` : ''}`,
        evidenceId: evidence.id,
        disputeId,
        party,
        disabled: Boolean(disabledReason),
        disabledReason,
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

  const partyName = localizePanelText(party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name)
  const otherPartyName = localizePanelText(party === 'a' ? caseData.duo.partyB.name : caseData.duo.partyA.name)
  const context = party === 'a' ? evidence.partyContext?.a : evidence.partyContext?.b
  const evidenceState = state.evidenceStates[evidenceId]
  const currentStage = getEvidenceInvestigationStage(evidenceState)
  const relevant = !evidence.subjectParty || evidence.subjectParty === 'both' || evidence.subjectParty === party
  const disabledReason = getEvidencePresentDisabledReason(evidenceState, party, partyName, otherPartyName, relevant)

  return {
    title: localizePanelText(evidence.surfaceName ?? evidence.name),
    subtitle: COPY.presentWay,
    body: [
      translate('pc.interaction.evidencePromptBody', { party: partyName }),
      '',
      context?.questionAngle ? `${COPY.recommendedQuestion}: ${localizePanelText(context.questionAngle)}` : translate('pc.interaction.noRecommendedQuestion'),
      context?.implication ? `${COPY.implication}: ${localizePanelText(context.implication)}` : '',
    ].filter(Boolean).join('\n'),
    tone: 'gold',
    tags: [partyName, localizePanelText(dispute.name), currentStage > 0 ? translate('pc.interaction.stageSuffix', { stage: currentStage }) : translate('pc.interaction.investigationNeeded')],
    actions: [
      {
        kind: 'present_evidence',
        label: context?.questionAngle ? localizePanelText(context.questionAngle) : COPY.directPresent,
        evidenceId,
        disputeId,
        party,
        disabled: Boolean(disabledReason),
        disabledReason,
      },
      {
        kind: 'present_evidence',
        label: COPY.directPresent,
        evidenceId,
        disputeId,
        party,
        disabled: Boolean(disabledReason),
        disabledReason,
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
      tags: currentDispute ? [localizePanelText(currentDispute.name)] : undefined,
      actions: [{ kind: 'close', label: COPY.close }],
    }
  }

  return {
    title: COPY.chooseDispute,
    subtitle: translate('pc.interaction.targetChange'),
    body: COPY.chooseDisputeBody,
    tone: 'blue',
    tags: currentDispute ? [localizePanelText(currentDispute.name)] : undefined,
    actions: candidates.map((dispute) => ({
      kind: 'focus_dispute' as const,
      label: localizePanelText(dispute.name),
      disputeId: dispute.id,
    })),
  }
}

export default function PCInteractionPanel() {
  const { locale, t: _t } = useI18n()
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
    const closeHandler = () => {
      savedPayloadRef.current = null
      setPayload(null)
    }

    window.addEventListener(PC_OPEN_INTERACTION_PANEL_EVENT, handler)
    window.addEventListener(PC_CLOSE_INTERACTION_PANEL_EVENT, closeHandler)
    return () => {
      window.removeEventListener(PC_OPEN_INTERACTION_PANEL_EVENT, handler)
      window.removeEventListener(PC_CLOSE_INTERACTION_PANEL_EVENT, closeHandler)
    }
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

  const closePanel = () => {
    savedPayloadRef.current = null
    setPayload(null)
  }

  const runAfterPanelClose = (fn: () => void) => {
    closePanel()
    window.setTimeout(fn, PANEL_ACTION_CLOSE_DELAY_MS)
  }

  const handleAction = (action: PcInteractionAction) => {
    if (action.disabled) {
      if (action.disabledReason) {
        showToast(localizeRuntimeText(action.disabledReason, locale), 'info')
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
          runAfterPanelClose(() => {
            dispatch({
              type: 'evidence_present',
              evidenceId: action.evidenceId!,
              target: action.party!,
            })
            window.setTimeout(unsuppressTransitionChoice, 2000)
          })
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
          showToast(localizeRuntimeText(sanitizeKoreanSurfaceText(action.text), locale), action.toastType ?? 'info')
        }
        break
      case 'run_question':
        if (action.party && action.disputeId && action.questionType) {
          setTargetParty(action.party)
          setLastFocusedDisputeId(action.disputeId)
          // 전략 패널에서 실행한 액션 → 연속 전략 선택 차단
          suppressTransitionChoice()
          runAfterPanelClose(() => {
            dispatch({
              type: 'question',
              questionType: action.questionType!,
              target: action.party!,
              disputeId: action.disputeId!,
            })
            window.setTimeout(unsuppressTransitionChoice, 2000)
          })
          return
        }
        break
      case 'run_special': {
        const state = useGameStore.getState()
        const target = action.party ?? state.pcTargetParty
        if (!target || !action.specialAction) {
          break
        }

        if (action.specialAction === 'objection') {
          if (state.resources.skillPoints < 1) {
            showToast(COPY.insufficientSkill, 'warn')
            break
          }
          runAfterPanelClose(() => {
            const latest = useGameStore.getState()
            if (!latest.spend('skillPoints', 1)) return
            latest.addDialogue({ speaker: 'judge', text: COPY.judgeObjection, relatedDisputes: [], turn: latest.turnCount })
            latest.changeEmotion(target, 12)
            for (const dispute of latest.caseData?.disputes ?? []) {
              latest.transitionLie(target, dispute.id, 'direct_question')
            }
            latest.incrementTurn()
          })
          return
        }

        if (action.specialAction === 'immediate_answer') {
          if (!action.disputeId) {
            break
          }
          if (state.resources.skillPoints < 1) {
            showToast(COPY.insufficientSkill, 'warn')
            break
          }
          runAfterPanelClose(() => {
            const latest = useGameStore.getState()
            if (!latest.spend('skillPoints', 1)) return
            window.dispatchEvent(new CustomEvent('pc:court-control-used', {
              detail: { action: 'immediate_answer', label: translate('pc.court.control.immediateAnswer') },
            }))
            const currentEntry = (target === 'a' ? state.agentA : state.agentB).lieStateMap[action.disputeId!]
            if (!currentEntry) {
              return
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
            latest.addDialogue({
              speaker: 'judge',
              text: COPY.immediateDemand,
              relatedDisputes: [action.disputeId!],
              turn: latest.turnCount,
            })
            setLastFocusedDisputeId(action.disputeId!)
            dispatch({ type: 'question', questionType: 'fact_pursuit', target, disputeId: action.disputeId! })
          })
          return
        }

        if (action.specialAction === 'separation') {
          // courtControl은 applyTrustEffect에서 차감 (이중 과금 방지)
          if (!state.canAfford('courtControl', 1)) {
            showToast(translate('pc.actions.toast.insufficientControl'), 'warn')
            break
          }
          runAfterPanelClose(() => {
            dispatch({ type: 'trust_action', actionType: 'separation', target })
          })
          return
        }

        if (action.specialAction === 'confidential_protection') {
          // courtControl은 applyTrustEffect에서 차감 (이중 과금 방지)
          if (!state.canAfford('courtControl', 1)) {
            showToast(translate('pc.actions.toast.insufficientControl'), 'warn')
            break
          }
          runAfterPanelClose(() => {
            dispatch({ type: 'trust_action', actionType: 'confidential_protection', target })
          })
          return
        }

        if (action.specialAction === 'advance_phase' && state.canAdvancePhase()) {
          runAfterPanelClose(() => {
            useGameStore.getState().advancePhase()
          })
          return
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
          runAfterPanelClose(() => {
            handleContradictionPursue(action.party!, action.disputeId!, action.previousClaim!, action.currentClaim!)
          })
          return
        }
        break
      case 'summon_witness':
        if (action.witnessId) {
          runAfterPanelClose(() => {
            dispatch({ type: 'call_witness', witnessId: action.witnessId! })
            const store = useGameStore.getState()
            const witnessName = localizeRuntimeText(
              store.caseData?.duo.socialGraph.find((witness) => witness.id === action.witnessId)?.name ?? action.label,
              locale,
            )
            store.pushGameEvent({
              id: store.gameEventLog.length + 1,
              turn: store.turnCount,
              type: 'event_trigger',
              message: translate('pc.interaction.summonToast', {
                name: witnessName,
              }),
              timestamp: Date.now(),
            })
          })
          return
        }
        break
      case 'collapse_verdict_cta':
        closePanel()
        emitVerdictCtaCollapsed()
        return
      case 'close':
      default:
        break
    }

    setPayload(null)
  }

  if (!payload) {
    return null
  }

  const rawBody = localizeRuntimeText(sanitizeKoreanSurfaceText(payload.body ?? ''), locale)
  const sanitizedBody = rawBody
  const softPopup = payload.backdrop === false
  const wrapperClass = softPopup ? 'pc-interaction-softpop' : 'pc-interaction-overlay'
  const cardExtra = `${softPopup ? ' pc-interaction-card--softpop' : ''}${payload.contrast ? ' pc-interaction-card--contrast' : ''}`

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
                {payload.evidenceTypeLabel ? <span className="pc-ev-header-type">{localizeRuntimeText(payload.evidenceTypeLabel, locale)}</span> : null}
                {payload.evidenceMetaTags?.map((tag) => (
                  <span className="pc-ev-header-meta-tag" key={tag}>{localizeRuntimeText(tag, locale)}</span>
                ))}
              </div>
              <div className="pc-interaction-card__title">{localizeRuntimeText(payload.title, locale)}</div>
            </div>
            <button className="pc-interaction-card__close" onClick={closePanel} type="button">
              &times;
            </button>
          </div>
        ) : (
          <div className="pc-interaction-card__header">
            <div>
              {payload.subtitle ? <div className="pc-interaction-card__subtitle">{localizeRuntimeText(payload.subtitle, locale)}</div> : null}
              <div className="pc-interaction-card__title">{localizeRuntimeText(payload.title, locale)}</div>
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
                {localizeRuntimeText(tag, locale)}
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
            <span>{sanitizedBody}</span>
            {payload.evidenceId ? (
              <button className="pc-ev-viewer-btn" onClick={() => handleAction({ kind: 'open_evidence', label: translate('pc.interaction.openEvidence'), evidenceId: payload.evidenceId })} type="button">
                {translate('pc.interaction.openEvidence')}
              </button>
            ) : null}
          </div>
        ) : payload.contrast ? (
          // [TC-A1 D1] vs 구도 — 모순 추궁 모달이 모순 감지 모달과 동일한 좌/우 + VS 형태로 통일
          <div className="pc-interaction-card__contrast-wrap">
            {sanitizedBody ? <div className="pc-interaction-card__contrast-intro">{sanitizedBody}</div> : null}
            <div className="pc-interaction-card__contrast">
              <div className="pc-interaction-card__contrast-side is-left">
                <div className="pc-interaction-card__contrast-label">{localizeRuntimeText(payload.contrast.left.label, locale)}</div>
                <div className="pc-interaction-card__contrast-text">"{localizeRuntimeText(sanitizeKoreanSurfaceText(payload.contrast.left.text), locale)}"</div>
              </div>
              <div className="pc-interaction-card__contrast-vs" aria-hidden="true">
                <span>VS</span>
              </div>
              <div className="pc-interaction-card__contrast-side is-right">
                <div className="pc-interaction-card__contrast-label">{localizeRuntimeText(payload.contrast.right.label, locale)}</div>
                <div className="pc-interaction-card__contrast-text">"{localizeRuntimeText(sanitizeKoreanSurfaceText(payload.contrast.right.text), locale)}"</div>
              </div>
            </div>
            {payload.blocks?.length ? (
              <div className="pc-interaction-card__contrast-intro">
                {payload.blocks.map((block) => (
                  <div key={block.title}>
                    <strong>{localizeRuntimeText(block.title, locale)}</strong>: {localizeRuntimeText(sanitizeKoreanSurfaceText(block.text), locale)}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="pc-interaction-card__body">{sanitizedBody}</div>
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
                title={action.disabledReason ? localizeRuntimeText(action.disabledReason, locale) : undefined}
                disabled={action.disabled}
                type="button"
              >
                {localizeRuntimeText(action.label, locale)}
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
  const { locale, t } = useI18n()
  const dispatch = useActionDispatch()
  const caseData = useStore((s) => s.caseData)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const _lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)

  if (!caseData) return null
  const evidence = caseData.evidence.find((e) => e.id === evidenceId)
  if (!evidence) return null

  const state = evidenceStates[evidence.id]
  const _meta = evidence.meta
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
    dispatch({ type: 'evidence_investigate', evidenceId, subAction: revealKey } as UnsafeAny)
  }

  // 조사 토큰: 1단계 0개, 2단계 1개, 3단계 2개
  const currentStage = getEvidenceInvestigationStage(state)

  const nameA = localizeRuntimeText(caseData.duo.partyA.name, locale)
  const nameB = localizeRuntimeText(caseData.duo.partyB.name, locale)
  const presentedToA = isEvidencePresentedForCurrentStage(state, 'a')
  const presentedToB = isEvidencePresentedForCurrentStage(state, 'b')
  // subjectParty 분기 — 비매칭 측에 제시 = 게임 메커니즘상 효과 X
  const subjectParty = evidence.subjectParty ?? 'both'
  const aRelevant = subjectParty === 'both' || subjectParty === 'a'
  const bRelevant = subjectParty === 'both' || subjectParty === 'b'
  const aDisabledReason = getEvidencePresentDisabledReason(state, 'a', nameA, nameB, aRelevant)
  const bDisabledReason = getEvidencePresentDisabledReason(state, 'b', nameB, nameA, bRelevant)

  return (
    <div className="pc-ev-detail" data-tutorial-target={evidenceId === 'e-2' ? 'evidence-e2-detail' : undefined}>
      {/* Dispute section */}
      {disputes.length > 0 ? (
        <div className="pc-ev-detail__dispute-section">
          <span className="pc-ev-detail__dispute-label">{translate('pc.interaction.majorDispute')}</span>
          <div className="pc-ev-detail__dispute-names">
            {disputes.map((d) => (
              <span className="pc-ev-detail__dispute" key={d.id}>{localizeRuntimeText(d.name, locale)}</span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Investigation stages */}
      {stages.length > 0 ? (
        <div className="pc-ev-detail__stages">
          <span className="pc-ev-detail__stages-label">{translate('pc.interaction.investigationStage')}</span>
          {stages.map((stage) => {
            const investigateCostLabel = `-${getInvestigationTokenCostForStage(stage.stage)}`
            // is-ready 일 때만 전체 영역을 버튼으로 (전체 클릭 가능, 안쪽 별도 버튼 X)
            if (stage.unlockable && !stage.revealed) {
              return (
                <button
                  className="pc-ev-detail__stage is-ready"
                  data-tutorial-target={evidenceId === 'e-2' ? 'evidence-e2-investigate-action' : undefined}
                  key={stage.index}
                  onClick={() => handleInvestigate(stage.revealKey)}
                  type="button"
                >
                  <span className="pc-ev-detail__stage-num">?</span>
                  <div className="pc-ev-detail__stage-body">
                    <span className="pc-ev-detail__investigate-cost"><PCSvgIcon id="i-search" size={18} /> {investigateCostLabel}</span>
                    <span className="pc-ev-detail__investigate-label">{translate('pc.interaction.investigate')}</span>
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
                    <span className="pc-ev-detail__stage-a">{formatLocalizedCaseText(evidence.investigationResults[stage.revealKey], locale, t)}</span>
                  ) : (
                    <span className="pc-ev-detail__stage-lock">{translate('pc.interaction.stageLocked', { stage: stage.stage })}</span>
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
          className={`pc-ev-detail__present-btn is-a${presentedToA ? ' is-done' : ''}${!aRelevant ? ' is-mismatch' : ''}${currentStage <= 0 ? ' is-stage-locked' : ''}`}
          disabled={Boolean(aDisabledReason)}
          title={aDisabledReason}
          onClick={() => {
            if (!aDisabledReason) {
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
          <span>{formatPresentButtonLabel(nameA, currentStage, presentedToA, aRelevant)}</span>
        </button>
        <button
          className={`pc-ev-detail__present-btn is-b${presentedToB ? ' is-done' : ''}${!bRelevant ? ' is-mismatch' : ''}${currentStage <= 0 ? ' is-stage-locked' : ''}`}
          data-tutorial-target={evidenceId === 'e-2' ? 'evidence-present-e2-to-b' : undefined}
          disabled={Boolean(bDisabledReason)}
          title={bDisabledReason}
          onClick={() => {
            if (!bDisabledReason) {
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
          <span>{formatPresentButtonLabel(nameB, currentStage, presentedToB, bRelevant)}</span>
        </button>
      </div>
    </div>
  )
}

function formatLocalizedCaseText(value: string | undefined, locale: LocaleCode, _t: (key: MessageKey) => string): string {
  if (!value) return ''
  return localizeRuntimeText(sanitizeKoreanSurfaceText(value), locale)
}

const SPEAKER_TONE_CLASS: Record<string, string> = {
  a: 'is-a',
  b: 'is-b',
  judge: 'is-judge',
  witness: 'is-witness',
  system: 'is-system',
}

function DialogueDetailSection({ payload, onClose }: { payload: PcInteractionPayload; onClose: () => void }) {
  const { locale } = useI18n()
  const caseData = useStore((s) => s.caseData)
  const disputes = caseData?.disputes ?? []
  const relatedIds = payload.dialogueDisputeIds ?? []
  const relatedNames = relatedIds
    .map((id) => disputes.find((d) => d.id === id)?.name)
    .filter(Boolean)
    .map((name) => localizeRuntimeText(name, locale)) as string[]
  const body = localizeRuntimeText(sanitizeKoreanSurfaceText(payload.body ?? ''), locale)
  const behaviorHint = payload.dialogueBehaviorHint ? localizeRuntimeText(sanitizeKoreanSurfaceText(payload.dialogueBehaviorHint), locale) : undefined
  const speakerName = payload.dialogueSpeakerName
    ? localizeRuntimeText(payload.dialogueSpeakerName, locale)
    : translate('pc.common.system')
  const speakerClass = SPEAKER_TONE_CLASS[payload.dialogueSpeaker ?? ''] ?? ''
  const speakerIconId = payload.dialogueSpeaker === 'a' ? 'i-man'
    : payload.dialogueSpeaker === 'b' ? 'i-woman'
    : payload.dialogueSpeaker === 'judge' ? 'i-scale'
    : payload.dialogueSpeaker === 'witness' ? 'i-witness'
    : 'i-bulb'
  const party = payload.dialogueSpeaker === 'a' || payload.dialogueSpeaker === 'b'
    ? payload.dialogueSpeaker
    : null
  const witnessPortrait = payload.dialogueSpeaker === 'witness'
    ? getWitnessPortraitPath(caseData?.caseId, null, payload.dialogueSpeakerName)
    : null
  return (
    <div className={`pc-dialogue-popup${speakerClass ? ` pc-dialogue-popup--${speakerClass}` : ''}`}>
      <div className="pc-dialogue-popup__header-row">
        <div className="pc-dialogue-popup__identity">
          <span className={`pc-dialogue-popup__portrait ${speakerClass}`}>
            {party ? (
              <PCCharacterPortrait
                alt={speakerName}
                caseId={caseData?.caseId}
                emotion="defensive"
                fallbackSymbolId={speakerIconId}
                party={party}
                size={34}
              />
            ) : witnessPortrait ? (
              <img alt={speakerName} src={witnessPortrait} />
            ) : (
              <PCSvgIcon id={speakerIconId} size={18} />
            )}
          </span>
          <div className="pc-dialogue-popup__speaker-copy">
            <span className="pc-dialogue-popup__label">{translate('pc.interaction.dialogueRecord')}</span>
            <span className="pc-dialogue-popup__name-line">
              <span className={`pc-dialogue-popup__speaker ${speakerClass}`}>
                {speakerName}
              </span>
              {relatedNames.length > 0 ? (
                <span className="pc-dialogue-popup__inline-chips" aria-label={translate('pc.interaction.relatedDisputeAria')}>
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
              title={translate('pc.interaction.gotoMessage')}
            >
              {translate('pc.interaction.goto')}
            </button>
          ) : null}
          <button className="pc-dialogue-popup__close" onClick={onClose} type="button" aria-label={translate('pc.common.close')}>&times;</button>
        </div>
      </div>

      <div className="pc-dialogue-popup__divider" />

      <div className="pc-dialogue-popup__body">
        <div className="pc-dialogue-popup__speech">{body}</div>
        {behaviorHint ? (
          <p className="pc-dialogue-popup__observation">{behaviorHint}</p>
        ) : null}
      </div>
    </div>
  )
}

function WitnessDetailSection({ onAction }: { onAction: (action: PcInteractionAction) => void }) {
  const { locale } = useI18n()
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
        const slotLabel = w.slot === 'institutional'
          ? translate('pc.interaction.witnessInstitution')
          : translate('pc.interaction.witnessRelated')
        const gated = (w.unlockedByDossier ?? []).length > 0
        const locked = gated && !unlockedWitnessIds.includes(w.id)
        const portrait = getWitnessPortraitPath(caseData.caseId, w.id, w.name)
        const witnessName = localizeRuntimeText(w.name, locale)
        const knowledgeScope = w.knowledgeScope
          ? localizeRuntimeText(sanitizeKoreanSurfaceText(w.knowledgeScope), locale)
          : translate('pc.interaction.witnessDefaultScope')
        return (
          <div className={`pc-witness-card${called ? ' is-called' : ''}${locked ? ' is-locked' : ''}`} key={w.id}>
            <span className="pc-witness-card__portrait" aria-hidden>
              {!locked && portrait ? (
                <img alt="" src={portrait} />
              ) : (
                <PCSvgIcon id="i-witness" size={22} />
              )}
            </span>
            <div className="pc-witness-card__info">
              <span className="pc-witness-card__name">{locked ? '???' : witnessName}</span>
              <span className="pc-witness-card__meta">{slotLabel}{locked ? ` · ${translate('pc.interaction.witnessLocked')}` : ''}</span>
              <span className="pc-witness-card__scope">
                {locked ? translate('pc.interaction.witnessLockedScope') : knowledgeScope}
              </span>
            </div>
            <button
              className={`pc-witness-card__btn${called ? ' is-done' : ''}${locked ? ' is-locked' : ''}`}
              disabled={locked}
              onClick={() => !locked && onAction({ kind: 'summon_witness', label: translate('pc.interaction.witnessSummon', { name: witnessName }), witnessId: w.id })}
              type="button"
            >
              {locked ? translate('pc.interaction.witnessLocked') : called ? translate('pc.interaction.witnessAdditional') : translate('pc.interaction.witnessSummonButton')}
            </button>
          </div>
        )
      })}
    </div>
  )
}
