// @ts-nocheck — 대규모 파일, 점진적 타입 정리 예정
import { useCallback } from 'react'
import { useGameStore } from '../store/useGameStore'
import { resolveDialogue, generateDynamicFallback } from '../engine/dialogueResolver'
import { resolveLLMDialogue } from '../engine/llmDialogueResolver'
import { generateWitnessTestimony, canCallWitness, determineTestimonyDepth, getDepthSystemMessage } from '../engine/witnessEngine'
import type { PlayerAction, PartyId, QuestionType, DialogueNode } from '../types'
import { playEvidencePresent, playLieCollapse, playEvidenceUnlock, playEvidenceUpgrade, playSeparation } from '../engine/soundEngine'
import { iga, eunneun } from '../utils/korean'
import { showToast, showLLMErrorBanner } from '../components/common/Toast'
import { getAffinityScore, getAffinityGrade } from '../data/actionAffinity'
import { getOptimalPath, getNarrativeExpansion } from '../data/caseEnrichment'
import { normalizeCaseKey } from '../utils/caseHelpers'
import { detectStatementChange } from '../engine/contradictionEngine'
import { runDiscoveryChecks, updateCascadeTargets } from './useDiscoveryIntegration'
import { emitStateTransitionEvent } from '../engine/stateTransitionHelper'
// ── V2 스크립트 전환 엔진 ──
import { hasV2Data, hasStructureV2, getBeatLibrary, getBeatRuntimeState, recordBeatUsed, getActiveLayer, getDisputeRole, getDisputeV2 } from '../engine/v2DataLoader'
import { evaluateQuestionFatigue, commitQuestionFatigue, getSessionFatigueState, setSessionFatigueState } from '../engine/questionFatigueEngine'
import { selectTurnPresentation, deriveAngleTag, deriveResponseIntent } from '../engine/beatSelectorV2'
import { deriveActionQuality, resolveNpcReaction, applyReactionToBlueprint } from '../engine/npcReactionV2'
import {
  evaluateInterjectionOpportunity, commitInterjectionFocus, commitInterjectionChoice,
  getSessionInterjectionTracker, setSessionInterjectionTracker,
  type InterjectionOpportunityV2, type InterjectionChoice,
} from '../engine/interjectionV2'
import { recordRevealedAtom, recordTurnStyle, recordInterjectionChoice as recordInterjectionStyleChoice, recordKeyMoment, recordResolvedLink } from '../engine/phase3LogCollector'
import {
  isMisconceptionDispute, attemptMisconceptionTransition, getMisconceptionState,
  deriveTriggerFromQuestion, deriveTriggerFromEvidence, deriveTriggerFromInterjection,
  deriveTriggerFromLink, applyMisconceptionTrigger, matchTrapSignal, shouldFeedLinkIntoMisconception,
} from '../engine/misconceptionEngine'
import { evaluateLinkEdges } from '../engine/linkEdgeEngine'
import type { BeatScriptV2 } from '../types'
import { toTrustWindowBand } from '../types'
import { getAllTransitionBeats } from '../engine/v3GameLoopLoader'

/** LLM 모드 — AI 필수: 항상 true */
const useLLMMode = true
export function setLLMMode(_enabled: boolean) { /* AI 필수 — 항상 활성 */ }
export function isLLMMode() { return true }

/** 다음 질문에 적용할 토글 모디파이어 */
let _nextConfidential = false
let _nextEvasionTarget: { target: PartyId; disputeId: string } | null = null
/** 다음 resolveAndApply 호출에서 재판관 질문 생성을 스킵 (모순 추궁 등 이미 직접 추가한 경우) */
let _skipNextJudgeQuestion = false
export function setSkipNextJudgeQuestion(skip: boolean) { _skipNextJudgeQuestion = skip }
export function shouldSkipJudgeQuestion(): boolean { const v = _skipNextJudgeQuestion; _skipNextJudgeQuestion = false; return v }

/** 사건카드 질문 텍스트 — LLM에 직접 전달하여 맥락 유지 */
let _dossierQuestionOverride: string | null = null
export function setDossierQuestionOverride(text: string | null) { _dossierQuestionOverride = text }
export function consumeDossierQuestionOverride(): string | null { const v = _dossierQuestionOverride; _dossierQuestionOverride = null; return v }

export function setNextConfidential(on: boolean) { _nextConfidential = on }
export function setNextEvasionReading(target: PartyId, disputeId: string) {
  _nextEvasionTarget = { target, disputeId }
}

let globalDispatchLock = false

// V2 피로도 상태는 questionFatigueEngine.ts의 세션 상태에서 관리

/** GameEventModal에서 V2 끼어들기 allow/block 선택 시 호출 */
export function resolveInterjectionV2(choice: 'allow' | 'block'): void {
  const store = useGameStore.getState()
  const opportunity = store.pendingInterjectionV2
  if (!opportunity) return

  const { tracker: nextTracker, effects } = commitInterjectionChoice(
    getSessionInterjectionTracker(), opportunity, choice, store.turnCount,
  )
  setSessionInterjectionTracker(nextTracker)
  recordInterjectionStyleChoice(choice)

  // 끼어들기 응답 출력
  store.addDialogue({
    speaker: opportunity.interruptor,
    text: opportunity.line,
    relatedDisputes: [opportunity.disputeId],
    turn: store.turnCount,
  })

  // 효과 적용
  const caseId = normalizeCaseKey(store.caseData?.caseId ?? '')
  const runtimeState = getBeatRuntimeState(caseId)

  for (const eff of effects) {
    if (eff.type === 'reset_fatigue') {
      setSessionFatigueState(commitQuestionFatigue({
        turn: store.turnCount,
        party: opportunity.target,
        disputeId: opportunity.disputeId,
        questionType: 'fact_pursuit',
        angleTag: 'context',
        resetReason: 'interjection_allow',
      }, getSessionFatigueState()))
    }
    if (eff.type === 'authority_delta') {
      store.changeTrust(opportunity.target, 'trustTowardJudge', eff.amount * 3)
    }
    if (eff.type === 'reveal_atom') {
      recordRevealedAtom(eff.atomId)
      store.addDialogue({
        speaker: 'system',
        text: `새로운 사실이 드러났습니다.`,
        relatedDisputes: [opportunity.disputeId],
        turn: store.turnCount,
      })
    }
    if (eff.type === 'reveal_link') {
      recordResolvedLink(eff.linkId)
    }
    if (eff.type === 'trap_signal') {
      store.addDialogue({
        speaker: 'system',
        text: `단서 발견: ${eff.signal}`,
        relatedDisputes: [opportunity.disputeId],
        turn: store.turnCount,
      })
    }
    if (eff.type === 'set_flag') {
      runtimeState.flags.add(eff.flag)
    }
    if (eff.type === 'set_resentment') {
      // resentment는 commitInterjectionChoice에서 이미 tracker에 반영됨
    }
    if (eff.type === 'readiness_nudge') {
      // readiness nudge — 향후 readiness engine과 연결
    }
  }

  // Misconception 트리거 (allow 시 infoLevel에 따라 전이 시도)
  if (choice === 'allow' && isMisconceptionDispute(opportunity.disputeId)) {
    const mcTrigger = deriveTriggerFromInterjection({
      disputeId: opportunity.disputeId,
      turn: store.turnCount,
      infoLevel: opportunity.infoLevel as any,
      trapSignal: effects.find(e => e.type === 'trap_signal')?.signal,
    })
    if (mcTrigger) {
      const mcResult = applyMisconceptionTrigger(opportunity.disputeId, mcTrigger)
      if (mcResult?.changed) {
        console.log(`[V2 Misconception via Interjection] ${opportunity.disputeId}: ${mcResult.from}→${mcResult.to}`)
        for (const eff of mcResult.effects) {
          if (eff.type === 'set_flag') runtimeState.flags.add(eff.flag)
          if (eff.type === 'clear_flag') runtimeState.flags.delete(eff.flag)
        }
      }
    }
  }

  // 대기 해제
  store.setPendingInterjectionV2(null)
  console.log(`[V2 Interjection] resolved: ${choice}`, effects.map(e => e.type).join(', '))
}

export function useActionDispatch() {
  const dispatch = useCallback((action: PlayerAction) => {
    if (globalDispatchLock) { console.warn('[dispatch] 이전 액션 처리 중 — 무시'); return }
    const state = useGameStore.getState()

    if (action.type === 'evidence_present') {
      globalDispatchLock = true
      handleEvidencePresent(action).finally(() => { globalDispatchLock = false })
      return
    }
    if (action.type === 'evidence_investigate') {
      globalDispatchLock = true
      handleEvidenceInvestigate(action).finally(() => { globalDispatchLock = false })
      return
    }
    if (action.type === 'call_witness') {
      globalDispatchLock = true
      handleCallWitness(action).finally(() => { globalDispatchLock = false })
      return
    }
    if (action.type === 'question') {
      globalDispatchLock = true
      handleQuestion(action).finally(() => { globalDispatchLock = false })
      return
    }
    if (action.type === 'trust_action') {
      handleTrustAction(action)
      return
    }
    if (action.type === 'mediation') {
      // Phase6_Mediation.tsx에서 직접 처리하므로 여기서는 패스스루
      return
    }
    if (action.type === 'advance_phase') {
      if (state.canAdvancePhase()) state.advancePhase()
      return
    }
  }, [])

  return dispatch
}

// ── 증거 제시 ──
let evidencePresentLock = false
async function handleEvidencePresent(action: Extract<PlayerAction, { type: 'evidence_present' }>) {
  if (evidencePresentLock) return
  evidencePresentLock = true
  try {
  const state = useGameStore.getState()
  if (!state.isUnlocked(action.evidenceId)) { evidencePresentLock = false; return }

  const evDef = state.evidenceDefinitions.find((e) => e.id === action.evidenceId)
  if (!evDef) { evidencePresentLock = false; return }

  // 조합 발동 전 스냅샷 (새로 발동된 것만 표시하기 위해)
  const prevTriggeredCount = state.triggeredCombinations.length

  const newUnlocks = state.presentEvidence(action.evidenceId, action.target)

  playEvidencePresent()
  const disputeNames = evDef.proves.map(dId => state.caseData?.disputes.find(d => d.id === dId)?.name ?? dId).join(', ')
  const reliabilityLabel = evDef.reliability === 'hard' ? 'Hard' : 'Soft'
  state.addDialogue({
    speaker: 'system',
    text: `📋 증거 제시: ${evDef.name} [${reliabilityLabel}] → "${disputeNames}"`,
    relatedDisputes: evDef.proves,
    turn: state.turnCount,
  })

  const trigger = evDef.reliability === 'hard' ? 'hard_evidence' : 'soft_evidence'
  let evDidTransition = false
  for (const disputeId of evDef.proves) {
    snapshotLieState(action.target, disputeId)
    const transitioned = state.transitionLie(action.target, disputeId, trigger)
    if (transitioned) {
      notifyLieTransition(action.target, disputeId); evDidTransition = true
      const freshAgent = action.target === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
      const newLieState = freshAgent.lieStateMap[disputeId]?.currentState
      // deepTruthsUnlocked: S4+ 도달 시 narrativeExpansion 존재 여부
      if (newLieState && (newLieState === 'S4' || newLieState === 'S5')) {
        const caseKey = normalizeCaseKey(state.caseData?.caseId ?? '')
        if (getNarrativeExpansion(caseKey, disputeId)) state.trackMetric('deepTruthsUnlocked')
      }
      // immediateAnswerUsed: soft_evidence(즉답 요구)로 S5 도달
      if (newLieState === 'S5' && trigger === 'soft_evidence') {
        state.trackMetric('immediateAnswerUsed')
      }
      // unsupportedCollapses: hard_evidence/trust 없이 S5 도달
      if (newLieState === 'S5' && trigger !== 'hard_evidence') {
        state.trackMetric('unsupportedCollapses')
      }
    }
  }
  if (evDidTransition) state.trackMetric('evidenceEffective')

  // V2: 증거 제시 → misconception 전이 시도
  {
    const v2CaseId = normalizeCaseKey(state.caseData?.caseId ?? '')
    if (hasStructureV2(v2CaseId)) {
      for (const disputeId of evDef.proves) {
        if (isMisconceptionDispute(disputeId)) {
          const mcEvTrigger = deriveTriggerFromEvidence({
            disputeId,
            turn: state.turnCount,
            evidenceId: action.evidenceId,
          })
          if (mcEvTrigger) {
            const mcResult = applyMisconceptionTrigger(disputeId, mcEvTrigger)
            if (mcResult?.changed) {
              console.log(`[V2 Misconception via Evidence] ${disputeId}: ${mcResult.from}→${mcResult.to}`)
              const rState = getBeatRuntimeState(v2CaseId)
              for (const eff of mcResult.effects) {
                if (eff.type === 'set_flag') rState.flags.add(eff.flag)
                if (eff.type === 'clear_flag') rState.flags.delete(eff.flag)
              }
            }
          }
        }
      }
    }
  }

  // V3: 증거 결과 토스트 — 전이 여부에 따라 hold/crack/collapse
  {
    const toastState = useGameStore.getState()
    const resultType = !evDidTransition ? 'hold'
      : evDef.reliability === 'hard' ? 'collapse' : 'crack'
    toastState.setPendingEvidenceResult({ type: resultType, evidenceName: evDef.name })
  }

  changeEmotionWithPhaseTracking(action.target, evDef.reliability === 'hard' ? 15 : 8)

  for (const id of newUnlocks) {
    const def = state.evidenceDefinitions.find((e) => e.id === id)
    if (def) {
      playEvidenceUnlock()
      state.addDialogue({ speaker: 'system', text: `🔓 새로운 증거를 손에 넣었다 — ${def.name}`, relatedDisputes: def.proves, turn: state.turnCount })
    }
  }

  // 증거 조합 격상 — 이번에 새로 발동된 것만 표시
  const freshState = useGameStore.getState()
  const newlyTriggered = freshState.triggeredCombinations.slice(prevTriggeredCount)
  if (newlyTriggered.length > 0) {
    const caseData = freshState.caseData
    if (caseData) {
      for (const comboKey of newlyTriggered) {
        const combo = caseData.evidenceCombinations.find((c) => c.requires.join('+') === comboKey)
        if (combo) {
          const names = combo.requires.map((id) => caseData.evidence.find((e) => e.id === id)?.name ?? id).join(' + ')
          const disputeNames = combo.proves.map(dId => caseData.disputes.find(d => d.id === dId)?.name ?? dId).join(', ')
          playEvidenceUpgrade()
          freshState.addDialogue({
            speaker: 'system',
            text: `🔗 증거 조합 격상! ${names} → "${disputeNames}" 신뢰도 Hard 확정`,
            relatedDisputes: combo.proves,
            turn: freshState.turnCount,
          })
        }
      }
    }
  }

  // NPC 반응 — 증거에 대해 직접 반응하도록 evidence_present 액션 전달
  if (evDef.proves.length > 0) {
    await resolveAndApply(action, action.target)
  }

  // Discovery 체크 — 진실공방/쟁점발현/감정실수/판단충돌
  runDiscoveryChecks(action.target, evDef.proves[0])

  // ── V3: 증거 제시 후 이벤트 트리거 평가 ──
  {
    const v3State = useGameStore.getState()
    const transitions = []
    for (const dId of evDef.proves) {
      const prev = _lieStateBeforeTransition[`${action.target}:${dId}`]
      const v3Agent = action.target === 'a' ? v3State.agentA : v3State.agentB
      const cur = v3Agent.lieStateMap[dId]?.currentState
      if (prev && cur && prev !== cur) {
        transitions.push({ party: action.target, disputeId: dId, from: prev, to: cur })
        const pName = action.target === 'a' ? v3State.caseData?.duo.partyA.name : v3State.caseData?.duo.partyB.name
        emitStateTransitionEvent(action.target, dId, prev, cur, v3State.turnCount, pName ?? '')
      }
    }
    v3State.evaluateTurnEvents('evidence_present', evDef.proves[0], transitions)
  }

  useGameStore.getState().incrementTurn()
  } finally { evidencePresentLock = false }
}

// ── 증인 소환 ──
async function handleCallWitness(action: Extract<PlayerAction, { type: 'call_witness' }>) {
  const state = useGameStore.getState()
  if (!state.caseData) return

  const witness = state.caseData.duo.socialGraph.find(tp => tp.id === action.witnessId)
  if (!witness) return

  const check = canCallWitness(action.witnessId, state.calledWitnesses, state.caseData)
  if (!check.available) {
    state.addDialogue({ speaker: 'system', text: check.reason ?? '증인 소환 불가', relatedDisputes: [], turn: state.turnCount })
    return
  }

  // 비용: 조사 토큰 1개
  if (state.resources.investigationTokens < 1) {
    state.addDialogue({ speaker: 'system', text: '조사 토큰이 모두 소진되었습니다.', relatedDisputes: [], turn: state.turnCount })
    import('../components/layout/CourtHeader').then(m => m.openResourcePopup('invest'))
    return
  }
  state.spend('investigationTokens', 1)
  state.addCalledWitness(action.witnessId)

  // 소환 연출
  state.addDialogue({
    speaker: 'system',
    text: `🧑‍⚖️ 증인 ${witness.name} 소환 — 증언이 시작된다.`,
    relatedDisputes: [],
    turn: state.turnCount,
  })

  // 증언 깊이 결정 (lieState 기반 게이팅)
  const depth = determineTestimonyDepth(witness, state.getLieState)

  // 깊이 제한 시 시스템 메시지 표시
  if (depth !== 'full') {
    const depthMsg = getDepthSystemMessage(depth)
    if (depthMsg) {
      state.addDialogue({
        speaker: 'system',
        text: `💬 ${depthMsg}`,
        relatedDisputes: [],
        turn: state.turnCount,
      })
    }
  }

  // 증언 생성 (LLM 또는 폴백, 깊이 게이팅 적용)
  state.setLLMLoading(true)
  try {
    const recentDialogues = state.dialogueLog.slice(-8)
    const testimony = await generateWitnessTestimony(
      witness, state.caseData, state.agentA, state.agentB, recentDialogues, depth,
    )

    const fresh = useGameStore.getState()
    fresh.setLLMLoading(false)

    // 증언 등록
    fresh.addDialogue({
      speaker: 'witness',
      text: testimony.testimony,
      relatedDisputes: testimony.relatedDisputes,
      turn: fresh.turnCount,
      behaviorHint: testimony.behaviorHint,
      witnessName: witness.name,
      witnessFavor: testimony.favorDirection as 'pro_a' | 'pro_b' | 'neutral' | 'mixed',
    })

    // 편향 방향에 따라 NPC 반응
    const favoredParty: PartyId | null =
      testimony.favorDirection === 'pro_a' ? 'a'
      : testimony.favorDirection === 'pro_b' ? 'b'
      : null

    // 유리한 쪽의 신뢰 상승, 불리한 쪽 감정 동요
    if (favoredParty) {
      const unfavored: PartyId = favoredParty === 'a' ? 'b' : 'a'
      changeEmotionWithPhaseTracking(unfavored, 10)

      // 증언이 직접 목격이면 관련 쟁점의 lie state 전이 시도
      if (witness.witnessedDirectly && testimony.relatedDisputes.length > 0) {
        for (const dId of testimony.relatedDisputes) {
          const transitioned = fresh.transitionLie(unfavored, dId, 'witness_testimony')
          if (transitioned) {
            notifyLieTransition(unfavored, dId)
            fresh.trackMetric('lieTransitions')
            const wAgent = unfavored === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
            const wNewState = wAgent.lieStateMap[dId]?.currentState
            // unsupportedCollapses: 증인 증언만으로 S5 도달
            if (wNewState === 'S5') {
              fresh.trackMetric('unsupportedCollapses')
            }
            // deepTruthsUnlocked: S4+ 도달 시 narrativeExpansion 존재 여부
            if (wNewState && (wNewState === 'S4' || wNewState === 'S5')) {
              const caseKey = normalizeCaseKey(fresh.caseData?.caseId ?? '')
              if (getNarrativeExpansion(caseKey, dId)) fresh.trackMetric('deepTruthsUnlocked')
            }
          }
        }
      }
    }

    // 왜곡된 증언이면 시스템 힌트
    if (testimony.distorted) {
      fresh.addDialogue({
        speaker: 'system',
        text: '💭 증언의 일부가 기억에 의존하고 있다. 다른 증거와 대조해볼 필요가 있다.',
        relatedDisputes: testimony.relatedDisputes,
        turn: fresh.turnCount,
      })
    }

    fresh.trackMetric('questionsAsked')

    // ── 증인 증언으로 인한 진실 발견 ──
    // 증인의 knowledgeScope가 truthTable의 사실과 매칭되면 해당 truth를 발견 처리
    if (witness.knowledgeScope) {
      const freshStore = useGameStore.getState()
      const caseData2 = freshStore.caseData!
      const scope = witness.knowledgeScope

      for (let i = 0; i < caseData2.truthTable.length; i++) {
        const truth = caseData2.truthTable[i]
        const truthId = truth.id ?? `t-${i + 1}`

        // 이미 발견된 truth는 스킵
        if (freshStore.discovery.discoveredTruths.includes(truthId)) continue

        // knowledgeScope에서 truth.fact의 핵심 키워드 매칭
        const keywords = truth.fact
          .replace(/[은는이가을를의에서로도만~,.!?]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length >= 3)
        const matchCount = keywords.filter(kw => scope.includes(kw)).length
        const matchRatio = keywords.length > 0 ? matchCount / keywords.length : 0

        // 40% 이상 키워드 매칭 → 이 증인이 이 사실을 알고 있음
        if (matchRatio >= 0.4) {
          freshStore.addDiscoveredTruth(truthId)

          // 시스템 메시지: 새로운 사실 발견 (진실 내용은 노출하지 않음)
          freshStore.addDialogue({
            speaker: 'system',
            text: `💡 증인 증언으로 새로운 단서가 확인되었습니다. 증거 게시판을 확인해 보십시오.`,
            relatedDisputes: testimony.relatedDisputes,
            turn: freshStore.turnCount,
          })
        }
      }
    }

    // Discovery 체크 — 증인 증언 후 (숨겨진 쟁점 발현 포함)
    const favorParty: 'a' | 'b' = testimony.favorDirection === 'pro_a' ? 'a' : 'b'
    runDiscoveryChecks(favorParty)
  } catch {
    useGameStore.getState().setLLMLoading(false)
    useGameStore.getState().addDialogue({
      speaker: 'system',
      text: '증인 증언 생성에 실패했다.',
      relatedDisputes: [],
      turn: useGameStore.getState().turnCount,
    })
    showToast('증인 증언 생성에 실패했습니다', 'warn')
  }

  useGameStore.getState().incrementTurn()
}

// ── 증거 조사 ──
async function handleEvidenceInvestigate(action: Extract<PlayerAction, { type: 'evidence_investigate' }>) {
  const state = useGameStore.getState()
  const result = state.investigateEvidence(action.evidenceId, action.subAction)
  if (result) state.addDialogue({ speaker: 'system', text: `🔍 ${result}`, relatedDisputes: [], turn: state.turnCount })

  // NPC 반응 — 조사 결과에 대해 반응하도록 LLM 호출
  const evDef = state.evidenceDefinitions.find(e => e.id === action.evidenceId)
  if (evDef?.proves.length) {
    // 증거의 첫 번째 관련 쟁점에서 책임이 더 큰 당사자에게 질문
    const caseData = state.caseData
    const disputeId = evDef.proves[0]
    const dispute = caseData?.disputes.find(d => d.id === disputeId)
    const target: PartyId = (dispute?.correctResponsibility?.a ?? 50) >= 50 ? 'a' : 'b'

    await resolveAndApply(action, target)
  }

  useGameStore.getState().incrementTurn()
}

// ── 질문 ──
let questionLock = false
async function handleQuestion(action: Extract<PlayerAction, { type: 'question' }>) {
  if (questionLock) return
  questionLock = true
  try {
  const state = useGameStore.getState()

  // ── 토글 모디파이어 소비 ──
  const isConfidential = _nextConfidential
  _nextConfidential = false
  const evasionTarget = _nextEvasionTarget
  _nextEvasionTarget = null

  if (isConfidential) {
    state.changeTrust(action.target, 'trustTowardJudge', 20)
    state.addDialogue({
      speaker: 'system',
      text: '🔒 비공개 심문 — 이 답변은 상대에게 공개되지 않는다.',
      relatedDisputes: [], turn: state.turnCount,
    })
    state.trackMetric('confidentialUsed')
    state.trackMetric('togglesUsed')
  }

  // 비LLM 모드: 고정 템플릿으로 재판관 질문 먼저 추가
  // LLM 모드: llmDialogueResolver 내부에서 재판관 질문 + NPC 응답 동시 생성
  //           (LLM 실패 시에도 폴백 질문이 자동 생성됨)
  if (!useLLMMode) {
    state.addDialogue({
      speaker: 'judge',
      text: buildQuestionText(action.questionType, action.target, action.disputeId),
      relatedDisputes: [action.disputeId],
      turn: state.turnCount,
    })
  }

  // 심문 이력 기록
  state.trackInterrogation(action.target, action.disputeId, action.questionType, state.turnCount)

  // sameActionRepeats: 같은 쟁점에 같은 질문 유형 3회+ 반복 감지 (임계 돌파 시 1회만)
  const updatedHistory = useGameStore.getState().interrogationHistory[action.target]?.[action.disputeId]
  if (updatedHistory) {
    const sameCount = updatedHistory.questionTypes.filter((t: string) => t === action.questionType).length
    if (sameCount === 3) state.trackMetric('sameActionRepeats')
  }

  // 메트릭 추적
  state.trackMetric('questionsAsked')
  // bothSidesQuestioned: A와 B 모두 질문한 적 있는지 체크
  if (!state.processMetrics.bothSidesQuestioned) {
    const otherTarget = action.target === 'a' ? 'b' : 'a'
    const otherAsked = state.dialogueLog.some(d => d.speaker === otherTarget)
    if (otherAsked) state.trackMetric('bothSidesQuestioned')
  }

  // lie 전이 시도 — actionAffinity 점수로 게이팅
  const triggers = questionTypeToTrigger(action.questionType)
  let didTransition = false

  // 상성 점수 조회: 해당 쟁점의 lieMotive × 질문 유형
  const agent = action.target === 'a' ? state.agentA : state.agentB
  const lieEntry = agent.lieStateMap[action.disputeId]
  const affinityScore = lieEntry ? getAffinityScore(lieEntry.lieMotive, action.questionType) : 1.0
  const affinityGrade = getAffinityGrade(affinityScore)

  // 상성 게이팅: worst(0.70 미만)이면 전이 확률 30%, weak(0.70~0.84)이면 60%, 나머지 100%
  const affinityRoll = Math.random()
  const affinityPass = affinityGrade === 'worst' ? affinityRoll < 0.3
    : affinityGrade === 'weak' ? affinityRoll < 0.6
    : true

  if (affinityPass) {
    snapshotLieState(action.target, action.disputeId)
    for (const trigger of triggers) {
      const transitioned = state.transitionLie(action.target, action.disputeId, trigger)
      if (transitioned) {
        notifyLieTransition(action.target, action.disputeId)
        didTransition = true
        state.trackMetric('lieTransitions')
        // S5 도달 체크
        const freshAgent = action.target === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
        const qNewState = freshAgent.lieStateMap[action.disputeId]?.currentState
        if (qNewState === 'S5') {
          state.trackMetric('liesCollapsed')
          // unsupportedCollapses: 질문만으로 S5 도달 (hard_evidence/trust 아님)
          // empathy_approach, empathy_question, motive_question 제외
          const isEmpathyOrMotive = action.questionType === 'empathy_approach'
            || triggers.includes('empathy_question')
            || triggers.includes('motive_question')
          if (!isEmpathyOrMotive) {
            state.trackMetric('unsupportedCollapses')
          }
        }
        // deepTruthsUnlocked: S4+ 도달 시 narrativeExpansion 존재 여부
        if (qNewState && (qNewState === 'S4' || qNewState === 'S5')) {
          const caseKey = normalizeCaseKey(state.caseData?.caseId ?? '')
          if (getNarrativeExpansion(caseKey, action.disputeId)) state.trackMetric('deepTruthsUnlocked')
        }
        break
      }
    }
  }

  // 상성 메트릭 추적
  if (affinityGrade === 'best' || affinityGrade === 'good') {
    state.trackMetric('affinityHits')
  } else if (affinityGrade === 'weak' || affinityGrade === 'worst') {
    state.trackMetric('affinityMisses')
  }

  if (action.questionType === 'empathy_approach') {
    state.changeTrust(action.target, 'trustTowardJudge', 12)
  }

  // NPC 응답 — V2 structure가 있으면 V2 메커닉 활성화, beat까지 있으면 스크립트 사용
  const v2CaseId = normalizeCaseKey(state.caseData?.caseId ?? '')
  const { useBeatSelectorV2, useQuestionFatigueV2 } = useGameStore.getState().phase3Flags
  const v2StructureAvailable = useBeatSelectorV2 && hasStructureV2(v2CaseId)
  const v2BeatAvailable = v2StructureAvailable && hasV2Data(v2CaseId)
  let v2BeatUsed = false

  if (v2StructureAvailable) {
    const v2Agent = action.target === 'a' ? state.agentA : state.agentB
    const v2Lie = v2Agent.lieStateMap[action.disputeId]
    if (v2Lie) {
      const emotionVal = v2Agent.emotionalState.internalValue
      const emotionTier = emotionVal >= 85 ? 'shutdown' : emotionVal >= 65 ? 'explosive' : emotionVal >= 40 ? 'agitated' : 'calm'
      const stanceGuess = ({ S0: 'deny', S1: 'hedge', S2: 'partial', S3: 'blame', S4: 'emotional', S5: 'confess' })[v2Lie.currentState] ?? 'deny'

      // 1. 쟁점 층/역할 판정
      const runtimeState = getBeatRuntimeState(v2CaseId)
      const layer = getActiveLayer(v2CaseId, action.disputeId, v2Lie.currentState, runtimeState.flags, new Set())
      const issueRole = getDisputeRole(v2CaseId, action.disputeId)
      const trustValue = (action.target === 'a' ? state.agentA : state.agentB).trustState.trustTowardJudge

      // 2. angleTag 파생
      const angleTag = deriveAngleTag({
        questionType: action.questionType,
        layer,
        issueRole,
        blockedVectors: [],
        angleTag: undefined,
      } as any)

      // 3. 피로도 선평가
      const fatigueAssessment = evaluateQuestionFatigue({
        turn: state.turnCount,
        party: action.target,
        disputeId: action.disputeId,
        questionType: action.questionType,
        angleTag,
        resetReason: 'none',
      }, getSessionFatigueState())

      // 4. NPC 확률 반응 (E) — blueprint stance를 순응/저항/역공으로 흔든다
      const actionQuality = deriveActionQuality({
        affinityGrade: affinityGrade as any,
        questionType: action.questionType,
        angleTag,
        disputeKind: issueRole,
        fatigueLevel: fatigueAssessment.fatigueLevel,
        trustWindowValue: trustValue,
        blockedVectors: [],
      })
      const npcReaction = resolveNpcReaction({
        turn: state.turnCount,
        party: action.target,
        disputeId: action.disputeId,
        lieState: v2Lie.currentState,
        lieMotive: v2Lie.lieMotive,
        archetype: (action.target === 'a' ? state.caseData?.duo.partyA.archetype : state.caseData?.duo.partyB.archetype) ?? 'avoidant',
        disputeKind: issueRole,
        questionType: action.questionType,
        angleTag,
        fatigueLevel: fatigueAssessment.fatigueLevel,
        trustWindowValue: trustValue,
        blockedVectors: [],
        quality: actionQuality,
        interjectionTracker: getSessionInterjectionTracker(),
      }, { focusDisputeId: action.disputeId, stance: stanceGuess as any, defenseMode: 'flat_denial' as any, allowedClaimAtoms: [], forbiddenClaimAtoms: [], sentenceCount: 2, shouldCounterQuestion: false })

      // 적용된 stance/defenseMode를 beat selector에 전달
      const appliedStance = npcReaction.appliedStance
      const effectMultiplier = fatigueAssessment.finalMultiplier * npcReaction.effectMultiplier

      // 5. V2 공통 처리: 피로도 커밋 + 미터 + misconception + 로그 (beat 유무와 무관)

      // Phase3 로그 수집: 턴별 스타일
      recordTurnStyle(action.questionType, angleTag)

      // 피로도 커밋
      setSessionFatigueState(commitQuestionFatigue({
        turn: state.turnCount,
        party: action.target,
        disputeId: action.disputeId,
        questionType: action.questionType,
        angleTag,
        resetReason: 'none',
      }, getSessionFatigueState()))

      // V2 미터에 피로도 × 반응 배율 적용
      state.applyQuestionEffect(
        action.questionType, action.target, action.disputeId,
        appliedStance, emotionTier,
        { externalMultiplier: effectMultiplier, bypassLegacyDiminish: true },
      )

      // 역공 시 authority 반영
      if (npcReaction.authorityDelta !== 0) {
        state.changeTrust(action.target, 'trustTowardJudge', npcReaction.authorityDelta * 3)
      }

      // Misconception 전이 시도 (red_herring / shared_misconception 쟁점)
      if (isMisconceptionDispute(action.disputeId)) {
        const lastJudgeLine = state.dialogueLog.filter(d => d.speaker === 'judge').pop()?.text ?? ''
        const matchedTrap = matchTrapSignal(action.disputeId, lastJudgeLine)
        const mcTrigger = deriveTriggerFromQuestion({
          disputeId: action.disputeId,
          turn: state.turnCount,
          questionType: action.questionType,
          angleTag,
          matchedTrapSignal: matchedTrap,
        })
        if (mcTrigger) {
          const mResult = applyMisconceptionTrigger(action.disputeId, mcTrigger)
          if (mResult?.changed) {
            console.log(`[V2 Misconception] ${action.disputeId}: ${mResult.from}→${mResult.to} (${mResult.trigger})`)
            for (const eff of mResult.effects) {
              if (eff.type === 'set_flag') runtimeState.flags.add(eff.flag)
              if (eff.type === 'clear_flag') runtimeState.flags.delete(eff.flag)
            }
          }
        }
      }

      console.log('[V2 Context]', npcReaction.outcome,
        `quality:${npcReaction.quality}`,
        `effect:${npcReaction.effectMultiplier}`,
        `stance:${appliedStance}`,
        `fatigue:${fatigueAssessment.fatigueLevel}`,
        `layer:${layer}`,
        npcReaction.debugNotes.join(' | '))

      // 6. 대사 생성 분기: beat가 있으면 스크립트, 없으면 LLM
      const beatLib = v2BeatAvailable ? getBeatLibrary(v2CaseId) : null
      if (beatLib) {
        const v3Transitions = getAllTransitionBeats(v2CaseId)
        const mergedLib = { beats: beatLib.beats, transitionBeats: v3Transitions }

        const prevLieState = _lieStateBeforeTransition[`${action.target}:${action.disputeId}`] ?? 'S0'
        const pendingTransition = prevLieState !== v2Lie.currentState
          ? { from: prevLieState, to: v2Lie.currentState }
          : null

        const presentation = selectTurnPresentation({
          turn: state.turnCount,
          caseId: v2CaseId,
          party: action.target,
          disputeId: action.disputeId,
          lieState: v2Lie.currentState,
          layer,
          issueRole,
          questionType: action.questionType,
          blueprint: { stance: appliedStance, allowedClaimAtoms: [], forbiddenClaimAtoms: [] },
          emotionTier: emotionTier as any,
          trustWindowValue: trustValue,
          fatigueLevel: fatigueAssessment.fatigueLevel,
          interjectionState: 'none',
          trapState: 'none',
          blockedVectors: [],
          pendingTransition,
          pendingEvent: null,
          flags: runtimeState.flags,
          usedBeatIds: runtimeState.usedBeatIds,
          usedAntiRepeatGroups: runtimeState.usedAntiRepeatGroups,
          beatUseCounts: runtimeState.beatUseCounts,
          cooldownUntilTurn: runtimeState.cooldownUntilTurn,
          angleTag: npcReaction.overrideAngleTag ?? undefined,
        }, mergedLib)

        if (presentation.main) {
          const beat = presentation.main.beat
          const beatLine = 'line' in beat ? beat.line : ''
          const beatHint = 'behaviorHint' in beat ? beat.behaviorHint : ''

          state.addDialogue({
            speaker: 'judge',
            text: buildQuestionText(action.questionType, action.target, action.disputeId),
            relatedDisputes: [action.disputeId],
            turn: state.turnCount,
          })

          state.addDialogue({
            speaker: action.target,
            text: beatLine,
            relatedDisputes: [action.disputeId],
            turn: state.turnCount,
            behaviorHint: beatHint,
          })

          if ('id' in beat && 'schemaVersion' in beat) {
            recordBeatUsed(v2CaseId, beat as BeatScriptV2, state.turnCount)
            const v2Beat = beat as BeatScriptV2
            if (v2Beat.truthEnvelope?.allowAtomIds) {
              for (const atomId of v2Beat.truthEnvelope.allowAtomIds) recordRevealedAtom(atomId)
            }
          }

          if (presentation.telemetry) {
            console.log('[V2 Beat]', presentation.telemetry.lane, presentation.telemetry.selectedBeatId,
              `score:${presentation.telemetry.selectedScore}`)
          }

          v2BeatUsed = true
        }
      }

      // beat 선택 실패 또는 beat 없음 → V2 컨텍스트를 store에 저장하여 LLM에서 참조
      if (!v2BeatUsed) {
        // V2 판정 결과를 LLM 프롬프트에 주입하기 위해 임시 저장
        useGameStore.getState()._v2Context = {
          layer,
          issueRole,
          angleTag,
          responseIntent: deriveResponseIntent({
            questionType: action.questionType,
            fatigueLevel: fatigueAssessment.fatigueLevel,
            issueRole,
            trapState: 'none',
          } as any),
          fatigueLevel: fatigueAssessment.fatigueLevel,
          npcReaction: npcReaction.outcome,
          appliedStance,
          effectMultiplier,
          misconceptionState: getMisconceptionState(action.disputeId),
        }
      }

      // 6. 끼어들기 V2 (D) — focus streak 갱신 + 기회 평가
      if (v2BeatUsed) {
        // focus streak 갱신
        setSessionInterjectionTracker(
          commitInterjectionFocus(getSessionInterjectionTracker(), state.turnCount, action.target),
        )

        // 끼어들기 기회 평가
        const opponent = action.target === 'a' ? 'b' : 'a'
        const freshState = useGameStore.getState()
        const isSeparated = freshState.separationTarget === action.target
        const opponentAgent = opponent === 'a' ? freshState.agentA : freshState.agentB
        const disputeV2 = getDisputeV2(v2CaseId, action.disputeId)

        if (!isSeparated && disputeV2) {
          const prevLieState2 = _lieStateBeforeTransition[`${action.target}:${action.disputeId}`] ?? 'S0'
          const targetLie = v2Agent.lieStateMap[action.disputeId]
          const targetTransition = prevLieState2 !== targetLie?.currentState
            ? { from: prevLieState2, to: targetLie?.currentState ?? prevLieState2 }
            : null

          const opponentProfile = opponent === 'a' ? freshState.caseData?.duo.partyA : freshState.caseData?.duo.partyB
          const opportunity = evaluateInterjectionOpportunity({
            caseId: v2CaseId,
            turn: state.turnCount,
            target: action.target,
            dispute: disputeV2,
            questionType: action.questionType,
            currentLayer: layer,
            interruptor: opponent,
            interruptorEmotionValue: opponentAgent.emotionalState.internalValue,
            interruptorEmotionPhase: opponentAgent.emotionalState.phase,
            targetTransition,
            isSeparated,
            flags: runtimeState.flags,
            tracker: getSessionInterjectionTracker(),
            interruptorArchetype: opponentProfile?.archetype,
          })

          if (opportunity) {
            const opponentName = opponent === 'a' ? freshState.caseData?.duo.partyA.name : freshState.caseData?.duo.partyB.name
            const interruptMsg = opportunity.severity === 'major'
              ? `💥 ${iga(opponentName)} 참지 못하고 강하게 끼어든다!`
              : `💬 ${iga(opponentName)} 참지 못하고 끼어든다!`

            freshState.addDialogue({
              speaker: 'system',
              text: interruptMsg,
              relatedDisputes: [action.disputeId],
              turn: freshState.turnCount,
            })

            // pendingInterjectionV2에 저장 → GameEventModal에서 allow/block 선택
            useGameStore.getState().setPendingInterjectionV2(opportunity)
            console.log('[V2 Interjection]', opportunity.triggerReason, opportunity.infoLevel,
              `streak:${opportunity.focusStreak}`, `chance:${opportunity.chanceApplied}`)
          }
        }
      }
    }
  }

  if (!v2BeatUsed) {
    // 기존 LLM 경로
    await resolveAndApply(action, action.target, isConfidential)
  }

  // 증거 발견: NPC 응답 이후 — 진술 내용에서 단서가 포착된 것처럼 연출
  if (didTransition) {
    discoverEvidenceFromQuestioning(action.target, action.disputeId)
  }

  // ── 회피 판독: 응답 후 거짓말 불안정도 표시 ──
  if (evasionTarget) {
    state.trackMetric('togglesUsed')
    showEvasionReadingResult(evasionTarget.target, evasionTarget.disputeId)
  }

  // 분리심문 턴 소모
  const sepState = useGameStore.getState()
  if (sepState.separationTarget) {
    const prevTurns = sepState.separationTurns
    sepState.tickSeparation()
    if (prevTurns <= 1) {
      useGameStore.getState().addDialogue({
        speaker: 'system',
        text: '🚪 분리 심문 종료 — 상대방이 복귀한다.',
        relatedDisputes: [],
        turn: useGameStore.getState().turnCount,
      })
    }
  }

  // ── 상대방 끼어들기 (구조적 반응 시스템) — V2에서 이미 처리했으면 스킵 ──
  if (!v2BeatUsed) {
  const opponent: PartyId = action.target === 'a' ? 'b' : 'a'
  const freshState = useGameStore.getState()
  const isSeparated = freshState.separationTarget === action.target
  const opponentAgent = opponent === 'a' ? freshState.agentA : freshState.agentB
  const hasOpponentStake = !!opponentAgent.lieStateMap[action.disputeId]

  if (!isSeparated && hasOpponentStake) {
    const opponentName = opponent === 'a' ? freshState.caseData?.duo.partyA.name : freshState.caseData?.duo.partyB.name
    const targetAgent = action.target === 'a' ? freshState.agentA : freshState.agentB
    const targetLie = targetAgent.lieStateMap[action.disputeId]

    // ① 강제 끼어들기: 비밀 탄로 (S4/S5 전이) → 상대 100% 반응
    const secretRevealed = didTransition && targetLie && (targetLie.currentState === 'S4' || targetLie.currentState === 'S5')

    // ② 강제 끼어들기: 상대가 자기를 직접 언급 (책임 전가 S3)
    const blameShifted = didTransition && targetLie?.currentState === 'S3'

    // ③ 확률 끼어들기: 감정 기반 (기존 로직 개선)
    const opponentAngry = opponentAgent.emotionalState.phase === 'angry' || opponentAgent.emotionalState.phase === 'confident'
    const phaseRate: Record<string, number> = { phase3: 0.25, phase4: 0.15, phase5: 0.1 }
    const baseRate = phaseRate[freshState.currentPhase] ?? 0.2
    const probabilisticInterrupt = opponentAngry ? Math.random() < baseRate + 0.25 : Math.random() < baseRate

    const shouldInterrupt = secretRevealed || blameShifted || probabilisticInterrupt

    if (shouldInterrupt) {
      // 끼어들기 유형에 따른 시스템 메시지
      let interruptMsg: string
      if (secretRevealed) {
        interruptMsg = `💥 ${iga(opponentName)} 충격을 받고 끼어든다!`
      } else if (blameShifted) {
        interruptMsg = `😡 ${iga(opponentName)} 참지 못하고 반박한다!`
      } else {
        interruptMsg = `💬 ${iga(opponentName)} 참지 못하고 끼어든다!`
      }

      freshState.addDialogue({
        speaker: 'system',
        text: interruptMsg,
        relatedDisputes: [action.disputeId],
        turn: freshState.turnCount,
      })

      // 상대 반응 — 끼어들기 맥락을 프롬프트에 전달
      const opponentAction: PlayerAction = {
        type: 'question',
        questionType: secretRevealed ? 'fact_pursuit' : action.questionType,
        target: opponent,
        disputeId: action.disputeId,
      }
      await resolveAndApply(opponentAction, opponent)
    }
  }
  } // end !v2BeatUsed interjection guard

  // ── optimalPath 추적 ──
  trackOptimalPath(action.disputeId, action.questionType)

  // Discovery 체크 — 질문 후
  runDiscoveryChecks(action.target, action.disputeId)

  // ── V2: LinkEdge 평가 ──
  if (v2BeatUsed) {
    const linkState = useGameStore.getState()
    const lieStates: Record<string, import('../types').LieState> = {}
    const activeLayers: Record<string, import('../types').IssueLayer> = {}
    const rState = getBeatRuntimeState(v2CaseId)

    for (const [did, entry] of Object.entries(linkState.agentA.lieStateMap)) {
      lieStates[did] = entry.currentState
      activeLayers[did] = getActiveLayer(v2CaseId, did, entry.currentState, rState.flags, new Set())
    }
    for (const [did, entry] of Object.entries(linkState.agentB.lieStateMap)) {
      if (!lieStates[did]) lieStates[did] = entry.currentState
      if (!activeLayers[did]) activeLayers[did] = getActiveLayer(v2CaseId, did, entry.currentState, rState.flags, new Set())
    }

    const linkResults = evaluateLinkEdges({ caseId: v2CaseId, lieStates, flags: rState.flags, activeLayers })

    // linkEdge → misconception 연결
    if (linkResults) {
      for (const activated of linkResults) {
        if (shouldFeedLinkIntoMisconception(activated.edge.fromDisputeId, activated.edge)) {
          const linkTrigger = deriveTriggerFromLink({
            disputeId: activated.edge.fromDisputeId,
            turn: linkState.turnCount,
            linkId: activated.edge.id,
          })
          if (linkTrigger) {
            const mcResult = applyMisconceptionTrigger(activated.edge.fromDisputeId, linkTrigger)
            if (mcResult?.changed) {
              console.log(`[V2 Misconception via Link] ${activated.edge.fromDisputeId}: ${mcResult.from}→${mcResult.to}`)
              for (const eff of mcResult.effects) {
                if (eff.type === 'set_flag') rState.flags.add(eff.flag)
                if (eff.type === 'clear_flag') rState.flags.delete(eff.flag)
              }
            }
          }
        }
      }
    }
  }

  // ── V3: 질문 효과 미터 적용 (V2에서 이미 적용했으면 스킵) ──
  {
    const v3State = useGameStore.getState()
    const v3Agent = action.target === 'a' ? v3State.agentA : v3State.agentB
    const v3Lie = v3Agent.lieStateMap[action.disputeId]
    if (v3Lie && !v2BeatUsed) {
      const emotionVal = v3Agent.emotionalState.internalValue
      const emotionTier = emotionVal >= 85 ? 'shutdown' : emotionVal >= 65 ? 'explosive' : emotionVal >= 40 ? 'agitated' : 'calm'
      // Blueprint의 stance를 근사 — lieState로 추정
      const stanceGuess = { S0: 'deny', S1: 'hedge', S2: 'partial', S3: 'blame', S4: 'emotional', S5: 'confess' }[v3Lie.currentState] ?? 'deny'
      v3State.applyQuestionEffect(action.questionType, action.target, action.disputeId, stanceGuess, emotionTier)
    }

    // ── V3: 이벤트 트리거 평가 ──
    const prevState = _lieStateBeforeTransition[`${action.target}:${action.disputeId}`] ?? 'S0'
    const newState = v3Lie?.currentState ?? prevState
    const transitions = prevState !== newState
      ? [{ party: action.target, disputeId: action.disputeId, from: prevState, to: newState }]
      : []
    v3State.evaluateTurnEvents(action.questionType, action.disputeId, transitions)

    // ── V3: lieState 전이 시각 피드백 ──
    if (prevState !== newState) {
      const pName = action.target === 'a' ? v3State.caseData?.duo.partyA.name : v3State.caseData?.duo.partyB.name
      emitStateTransitionEvent(action.target, action.disputeId, prevState, newState, v3State.turnCount, pName ?? '')
    }
  }

  useGameStore.getState().incrementTurn()
  } finally { questionLock = false }
}

// ── 신뢰/보호 행동 ──
async function handleTrustAction(action: Extract<PlayerAction, { type: 'trust_action' }>) {
  const state = useGameStore.getState()

  state.addDialogue({
    speaker: 'judge',
    text: buildTrustActionText(action.actionType, action.target),
    relatedDisputes: [],
    turn: state.turnCount,
  })

  applyTrustEffect(action.actionType, action.target)
  state.trackMetric('trustActionsUsed')

  // 신뢰 행동도 lie 전이 트리거 가능
  const freshState = useGameStore.getState()
  const agent = action.target === 'a' ? freshState.agentA : freshState.agentB
  for (const [disputeId, entry] of Object.entries(agent.lieStateMap)) {
    if (entry.collapseViaTrust && entry.currentState !== 'S5') {
      const trustTrigger = `trust_${action.actionType}`
      const transitioned = freshState.transitionLie(action.target, disputeId, trustTrigger)
      if (transitioned) {
        notifyLieTransition(action.target, disputeId)
        const tAgent = action.target === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
        const tNewState = tAgent.lieStateMap[disputeId]?.currentState
        // deepTruthsUnlocked: S4+ 도달 시 narrativeExpansion 존재 여부
        if (tNewState && (tNewState === 'S4' || tNewState === 'S5')) {
          const caseKey = normalizeCaseKey(freshState.caseData?.caseId ?? '')
          if (getNarrativeExpansion(caseKey, disputeId)) freshState.trackMetric('deepTruthsUnlocked')
        }
      }
    }
  }

  const isConfidential = action.actionType === 'confidential_protection'
  await resolveAndApply(action, action.target, isConfidential)

  useGameStore.getState().incrementTurn()
}

// ── 공통: LLM 또는 폴백으로 대사 해석 ──
async function resolveAndApply(action: PlayerAction, target: PartyId, isConfidential = false) {
  let node: DialogueNode | null = null
  let llmMeta: { stance?: string; responseMode?: string; answerStyle?: string; mentionedTruthIds?: string[] } = {}
  const preState = useGameStore.getState()

  if (useLLMMode && preState.caseData) {
    preState.setLLMLoading(true, target)
    try {
      const freshState = useGameStore.getState()
      const result = await resolveLLMDialogue(
        action, freshState.agentA, freshState.agentB, freshState.evidenceStates, freshState.caseData!,
      )
      if (result) {
        node = result.node
        llmMeta = {
          stance: result.stance,
          responseMode: result.responseMode,
          answerStyle: result.answerStyle,
          mentionedTruthIds: result.mentionedTruthIds,
        }
      }
    } catch (e) {
      // AI 필수 — 실패 시 게임 중단 + 에러 배너
      console.error('[LLM] resolveAndApply 실패:', e)
      showLLMErrorBanner()
      useGameStore.getState().setLLMLoading(false)
      return
    }
    useGameStore.getState().setLLMLoading(false)
  }

  if (!node) {
    // AI 응답 없음 — 에러 배너 표시하고 중단
    console.error('[LLM] AI 응답 없음 — 게임 진행 중단')
    showLLMErrorBanner()
    return
  }

  applyDialogueNode(node, target, isConfidential)

  // LLM 모드: 주장 자동 등록 (stance 기반)
  if (llmMeta.stance && node.conditions?.disputeId) {
    const stanceToConfidence: Record<string, 'high' | 'medium' | 'low'> = {
      deny: 'high', hedge: 'medium', partial_admit: 'medium', admit: 'low', reframe: 'medium',
    }
    const stanceToStatus: Record<string, string> = {
      deny: 'normal', hedge: 'normal', partial_admit: 'changed', admit: 'collapsed', reframe: 'changed',
    }
    const summary = node.text.length > 60 ? node.text.slice(0, 57) + '...' : node.text
    const freshState = useGameStore.getState()

    // 모순 탐지: 이전 주장과 달라졌는지 체크
    const newClaimData = {
      claimant: target,
      disputeId: node.conditions.disputeId,
      summary,
      confidence: stanceToConfidence[llmMeta.stance] ?? 'medium',
      status: (stanceToStatus[llmMeta.stance] ?? 'normal') as any,
      turn: freshState.turnCount,
      isConfidential,
    }
    // 텍스트 기반 모순 감지 제거 — lie state 전이 기반으로 이동 (notifyLieTransition에서 처리)

    freshState.addClaim(newClaimData)
  }
}

// ── 상대방 끼어들기: answer_only 응답 후 반박 근거가 있을 때만 발동 ──
function maybeInterjection(target: PartyId, disputeId?: string) {
  const state = useGameStore.getState()
  if (!state.caseData || !disputeId) return

  // 분리 심문 중이면 끼어들기 완전 차단
  if (state.separationTarget) return

  const otherParty: PartyId = target === 'a' ? 'b' : 'a'
  const otherAgent = otherParty === 'a' ? state.agentA : state.agentB
  const otherLie = otherAgent.lieStateMap[disputeId]

  // ── 트리거 조건: 반박 근거가 있는 경우에만 ──
  // 1) 상대(끼어드는 쪽)가 이 쟁점에 대해 lie 전략이 있어야 함 (관련 있는 쟁점)
  if (!otherLie) return

  // 2) 상대의 거짓말 상태가 S1 이상이어야 함 (S0이면 아직 이 주제에 대해 할 말이 없음)
  if (otherLie.currentState < 'S1') return

  // 3) 이 쟁점에서 양측 다 발언한 적이 있어야 함 (반박할 수 있는 맥락이 있어야)
  const otherClaims = state.claimGraph.filter(c => c.claimant === otherParty && c.disputeId === disputeId)
  const targetClaims = state.claimGraph.filter(c => c.claimant === target && c.disputeId === disputeId)
  if (otherClaims.length === 0 || targetClaims.length === 0) return

  // 4) 확률 게이팅: angry = 60%, shaken/confident = 40%, 나머지 = 20%
  const phase = otherAgent.emotionalState.phase
  const chance = phase === 'angry' ? 0.60 : (phase === 'shaken' || phase === 'confident') ? 0.40 : 0.20
  if (Math.random() > chance) return

  const otherName = otherParty === 'a' ? state.caseData.duo.partyA.name : state.caseData.duo.partyB.name

  // 감정별 끼어들기 첫 마디 (간결하게)
  const interjections: Record<string, string[]> = {
    defensive: ['그건 사실과 다릅니다.', '그건 한쪽 얘기일 뿐입니다.'],
    confident: ['잠깐, 그 부분은 제가 직접 말씀드리겠습니다.'],
    shaken: ['그건... 그렇게 단순한 문제가 아닙니다.'],
    angry: ['아니, 그건 거짓말입니다!', '지금 뭐라고 한 겁니까?!'],
    resigned: ['그 말은 맞지만, 전부는 아닙니다.'],
  }
  const pool = interjections[phase] ?? interjections.defensive
  const text = pool[Math.floor(Math.random() * pool.length)]

  // 반박 근거 (LLM 프롬프트용 — UI에 직접 노출 안 됨)
  const myLastClaim = otherClaims[otherClaims.length - 1].summary
  const opponentLastClaim = targetClaims[targetClaims.length - 1].summary
  const followUp = `${myLastClaim} ||| ${opponentLastClaim}`

  // 대화 로그에 끼어들기 대사 기록
  state.addDialogue({
    speaker: otherParty,
    text,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
    behaviorHint: '끼어들며 말한다.',
  })

  // 딜레이 후 선택지 대기
  setTimeout(() => {
    useGameStore.getState().setPendingInterjection({ party: otherParty, disputeId, text, followUp })
  }, 800)
}

/** 끼어들기 허용 — 추가 정보 획득, 권위 -3 */
export async function allowInterjection() {
  const state = useGameStore.getState()
  const ij = state.pendingInterjection
  if (!ij) return

  const name = ij.party === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name

  // 재판관 허용 메시지
  state.addDialogue({ speaker: 'judge', text: '계속 말씀해 보시죠.', relatedDisputes: [ij.disputeId], turn: state.turnCount })

  // LLM으로 반박 생성
  state.setLLMLoading(true, ij.party)
  try {
    const { chatCompletion, MODEL_DIALOGUE } = await import('../engine/llmClient')
    const caseData = state.caseData!
    const party = ij.party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
    const opponent = ij.party === 'a' ? caseData.duo.partyB : caseData.duo.partyA
    const dispute = caseData.disputes.find(d => d.id === ij.disputeId)

    // 최근 상대방 발언 가져오기 (여러 줄)
    const otherParty = ij.party === 'a' ? 'b' : 'a'
    const recentOpponentLines = state.dialogueLog
      .filter(d => d.speaker === otherParty)
      .slice(-3)
      .map(d => d.text)
      .join('\n')

    // 끼어드는 쪽의 이 쟁점에 대한 기존 주장
    const myClaims = state.claimGraph
      .filter(c => c.claimant === ij.party && c.disputeId === ij.disputeId)
      .map(c => c.summary)
      .slice(-2)
      .join('; ')

    const callForm = party.callTerms?.toPartner ?? opponent.name.slice(1) + '씨'
    const canInformal = party.callTerms?.toPartner && !party.callTerms.toPartner.includes('씨')

    const prompt = `당신은 "${party.name}"(${party.age}세)입니다. 상대: ${opponent.name}.
관계: ${caseData.duo.relationshipType}
상대 호칭: "${callForm}"
현재 쟁점: "${dispute?.name ?? ''}"

## 상대방(${opponent.name})이 방금 한 말:
${recentOpponentLines}

## 이 쟁점에서 당신(${party.name})이 이전에 주장한 내용:
${myClaims || '(아직 이 쟁점에서 발언한 적 없음)'}

## 상황
당신은 상대방의 발언이 사실과 다르다고 생각하여 끼어들었습니다.
상대방의 구체적인 발언 내용에 대해 반박해야 합니다.

★ 핵심 규칙:
- 상대방이 방금 한 말의 어떤 부분이 틀렸는지, 사실과 다른지 구체적으로 지적하라.
- 추상적 동조("소통 부족이 있었던 것은 사실", "오해가 생길 수 있다" 등) 절대 금지.
- 상대 입장에 동의하거나 이해를 표하는 내용 절대 금지. 끼어들기는 반박이다.
- 새로운 사건이나 언급된 적 없는 사실을 지어내지 마라. 이미 나온 내용만 사용.

★ 메시지를 2개로 분리:
1. toJudge: 재판관에게 반박 근거를 제시 (존댓말 ~습니다/~요). 1~2문장.
   - "재판관님, 지금 ${opponent.name}${canInformal ? '이' : '씨가'} ~ 라고 했는데, 사실은 ~입니다." 형태
   - 상대의 말을 인용할 때 상대를 높이지 않는다 (~했다, ~한다)
2. toOpponent: 상대에게 직접 따지는 말 (1문장). 반드시 호칭("${callForm}")으로 시작.
   - "${callForm}, ~" 형태로 시작
   - 상대의 거짓/왜곡을 직접 따지는 날카로운 한 마디

JSON만 출력:
{"toJudge":"재판관에게 할 말","toOpponent":"상대에게 할 말","behaviorHint":"행동 묘사"}`

    const raw = await chatCompletion(
      [{ role: 'user', content: prompt }],
      { temperature: 1.0, maxTokens: 400, model: MODEL_DIALOGUE },
    )

    state.setLLMLoading(false)

    // 파싱
    const match = raw.match(/\{[\s\S]*\}/)
    if (match) {
      const parsed = JSON.parse(match[0])
      const { enforceHonorifics } = await import('../engine/llmDialogueResolver')
      const { fixPostpositions } = await import('../engine/koreanPostposition')

      // 1. 재판관에게 하는 말 (존댓말 강제 + 조사 교정)
      const judgeMsg = fixPostpositions(enforceHonorifics(parsed.toJudge ?? parsed.response ?? ''))
      if (judgeMsg) {
        state.addDialogue({
          speaker: ij.party,
          text: judgeMsg,
          relatedDisputes: [ij.disputeId],
          turn: state.turnCount,
          behaviorHint: parsed.behaviorHint,
        })
      }

      // 2. 상대에게 하는 말 (별도 메시지)
      const opponentMsg = parsed.toOpponent ?? ''
      if (opponentMsg.trim()) {
        state.addDialogue({
          speaker: ij.party,
          text: opponentMsg,
          relatedDisputes: [ij.disputeId],
          turn: state.turnCount,
        })
      }
    } else {
      // 파싱 실패 시 간단한 폴백 (raw 데이터 노출 방지)
      state.addDialogue({
        speaker: ij.party,
        text: `재판관님, ${name === (ij.party === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name) ? '제' : ''} 입장에서 말씀드리면, 지금 상대방이 말한 것과 사실이 다릅니다.`,
        relatedDisputes: [ij.disputeId],
        turn: state.turnCount,
      })
    }
  } catch {
    state.setLLMLoading(false)
    // 실패 시 간단한 폴백 (초기 메시지는 이미 출력됨 → 중복 방지)
    state.addDialogue({
      speaker: ij.party,
      text: '재판관님, 지금 상대방이 한 말은 사실과 다릅니다. 확인해 주십시오.',
      relatedDisputes: [ij.disputeId],
      turn: state.turnCount,
    })
  }

  state.trackMetric('interjectionAllowed')
  state.setPendingInterjection(null)
}

/** 끼어들기 제지 — 정보 미획득, 권위 +2 */
export function denyInterjection() {
  const state = useGameStore.getState()
  const ij = state.pendingInterjection
  if (!ij) return

  const name = ij.party === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name

  // 재판관 제지 메시지
  state.addDialogue({ speaker: 'judge', text: `${name} 씨, 발언 순서를 지켜 주십시오.`, relatedDisputes: [ij.disputeId], turn: state.turnCount })

  // 제지됨 시스템 메시지
  state.addDialogue({ speaker: 'system', text: `🔇 ${name}의 발언이 제지되었다.`, relatedDisputes: [ij.disputeId], turn: state.turnCount })

  state.setPendingInterjection(null)
}

function applyDialogueNode(node: DialogueNode, target: PartyId, isConfidential = false) {
  const state = useGameStore.getState()

  state.addDialogue({
    speaker: node.speaker,
    text: node.text,
    relatedDisputes: node.conditions.disputeId ? [node.conditions.disputeId] : [],
    turn: state.turnCount,
    behaviorHint: node.behaviorHint,
    isConfidential,
  })

  const effects = node.effects
  if (effects.lieTransition) {
    state.forceSetLieState(target, effects.lieTransition.disputeId, effects.lieTransition.to)
    notifyLieTransition(target, effects.lieTransition.disputeId)
  }
  if (effects.emotionalDelta) changeEmotionWithPhaseTracking(target, effects.emotionalDelta)
  if (effects.trustDelta) state.changeTrust(target, effects.trustDelta.field, effects.trustDelta.delta)
  if (effects.evidenceUnlock) {
    const evStates = state.evidenceStates
    if (evStates[effects.evidenceUnlock] && !evStates[effects.evidenceUnlock].unlocked) {
      state.presentEvidence(effects.evidenceUnlock, target)
      // 비공개 보호 하에 해금된 증거에 confidentialSource 마킹
      if (isConfidential) {
        state.markEvidenceConfidential(effects.evidenceUnlock)
      }
    }
  }
  if (effects.claimUpdate) {
    state.addClaim({
      claimant: target,
      disputeId: effects.claimUpdate.disputeId,
      summary: effects.claimUpdate.summary,
      confidence: effects.claimUpdate.confidence,
      status: 'normal',
      turn: state.turnCount,
      isConfidential,
    })
  }
}

const PHASE_LABELS: Record<string, string> = {
  defensive: '방어적',
  confident: '자신만만',
  shaken: '동요',
  angry: '분노',
  resigned: '체념',
}

/**
 * changeEmotion 래퍼 — phase 변경 시 시스템 메시지를 대화 로그에 추가.
 */
function changeEmotionWithPhaseTracking(party: PartyId, delta: number) {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB
  const prevPhase = agent.emotionalState.phase
  state.changeEmotion(party, delta)
  const newAgent = party === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
  const newPhase = newAgent.emotionalState.phase
  if (newPhase !== prevPhase) {
    const name = party === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name
    const prevLabel = PHASE_LABELS[prevPhase] ?? prevPhase
    const newLabel = PHASE_LABELS[newPhase] ?? newPhase

    let emotionText: string
    switch (newPhase) {
      case 'angry':
        emotionText = `💢 ${iga(name ?? '')} 폭발 직전이다!`
        break
      case 'shaken':
        emotionText = `😰 ${iga(name ?? '')} 흔들리고 있다...`
        break
      case 'resigned':
        emotionText = `😞 ${iga(name ?? '')} 지쳐 보인다.`
        break
      case 'confident':
        emotionText = `😤 ${iga(name ?? '')} 자신감을 되찾았다.`
        break
      default:
        emotionText = `🎭 ${name}의 감정 변화: ${prevLabel} → ${newLabel}`
    }

    useGameStore.getState().addDialogue({
      speaker: 'system',
      text: emotionText,
      relatedDisputes: [],
      turn: useGameStore.getState().turnCount,
    })
  }
}

/**
 * 심문으로 인한 증거 발견.
 * NPC 응답 이후 호출 — 진술 내용에서 증거 단서가 포착된 것처럼 연출.
 * 거짓말 상태, 감정, 쟁점에 따라 발견 확률과 메시지가 달라짐.
 */
function discoverEvidenceFromQuestioning(party: PartyId, disputeId: string) {
  const state = useGameStore.getState()
  if (!state.caseData) return

  const name = party === 'a' ? state.caseData.duo.partyA.name : state.caseData.duo.partyB.name
  const agent = party === 'a' ? state.agentA : state.agentB
  const lieEntry = agent.lieStateMap[disputeId]
  const dispute = state.caseData.disputes.find(d => d.id === disputeId)

  // 이 쟁점을 증명하는 잠긴 증거 찾기 (선행 조건 충족된 것만)
  const lockedRelated = state.evidenceDefinitions.filter(e => {
    const rs = state.evidenceStates[e.id]
    if (!rs || rs.unlocked) return false
    if (!e.proves.includes(disputeId)) return false
    // requires 조건 체크: 선행 증거가 모두 해금되어야 함
    if (e.requires && e.requires.length > 0) {
      const allRequiresMet = e.requires.every(reqId => state.evidenceStates[reqId]?.unlocked)
      if (!allRequiresMet) return false
    }
    return true
  })

  if (lockedRelated.length === 0) return

  // 발견 확률: 거짓말 상태가 깊을수록 높음
  const chanceByState: Record<string, number> = {
    S0: 0.15, S1: 0.25, S2: 0.40, S3: 0.55, S4: 0.70, S5: 0.90,
  }
  const chance = chanceByState[lieEntry?.currentState ?? 'S0'] ?? 0.2
  if (Math.random() > chance) return

  const ev = lockedRelated[0]

  // 미니게임 트리거 — 성공 시 증거 해금
  const clues: [string, string, string] = [
    ev.description?.slice(0, 30) ?? '단서 1',
    dispute?.name ?? '단서 2',
    name + '의 진술에서 발견',
  ]
  const lieState = lieEntry?.currentState ?? 'S0'

  // 증거 발견 → MemoryPuzzle(순서 맞추기) 고정
  const minigameVariant = 'memory' as const

  state.setPendingMinigame({ type: 'evidence_discovery', evidenceId: ev.id, clues, npcName: name, lieState, party, minigameVariant })
  return // 미니게임 결과에서 actuallyDiscoverEvidence 호출
}

/** 미니게임 성공 시 실제 증거 해금 — 5단 대화 연출 */
export function actuallyDiscoverEvidence(evidenceId: string) {
  const state = useGameStore.getState()
  if (!state.caseData) return

  const ev = state.evidenceDefinitions.find(e => e.id === evidenceId)
  if (!ev) return

  const mg = state.pendingMinigame
  const name = mg?.npcName ?? '증인'
  const lieState = mg?.lieState ?? 'S2'
  const party = mg?.party ?? 'a'

  const { probe, slip, confirm } = getDiscoveryLines(ev, name, lieState)

  // 1) 재판관 유도 질문 — 허점을 파고든다
  state.addDialogue({
    speaker: 'judge',
    text: probe,
    relatedDisputes: ev.proves,
    turn: state.turnCount,
  })

  // 2) 당사자 실수 대사 — 무심코 단서를 흘린다
  state.addDialogue({
    speaker: party,
    text: slip,
    relatedDisputes: ev.proves,
    turn: state.turnCount,
    behaviorHint: getSlipBehavior(lieState),
  })

  // 3) 시스템: 증거 포착
  state.addDialogue({
    speaker: 'system',
    text: `🔍 ${name}의 말에서 새로운 증거를 확보했다`,
    relatedDisputes: ev.proves,
    turn: state.turnCount,
  })

  // 4) 재판관 확인 선언
  state.addDialogue({
    speaker: 'judge',
    text: confirm,
    relatedDisputes: ev.proves,
    turn: state.turnCount,
  })

  // 5) 시스템: 증거 해금
  useGameStore.setState((prev) => ({
    evidenceStates: {
      ...prev.evidenceStates,
      [evidenceId]: { ...prev.evidenceStates[evidenceId], unlocked: true },
    },
  }))
  playEvidenceUnlock()
  state.trackMetric('evidenceDiscovered')
  state.addDialogue({
    speaker: 'system',
    text: `🔓 새 증거: ${ev.name}`,
    relatedDisputes: ev.proves,
    turn: state.turnCount,
  })
}

/** 거짓말 상태에 따른 실수 행동 묘사 */
function getSlipBehavior(lieState: string): string {
  const behaviors: Record<string, string> = {
    S0: '무심코 말을 꺼내다 멈칫한다.',
    S1: '말끝이 흔들리며 시선을 피한다.',
    S2: '설명하다 자신도 모르게 말이 새어 나온다.',
    S3: '상대를 탓하다 의도치 않게 단서를 흘린다.',
    S4: '감정이 격해지며 입에서 튀어나온다.',
    S5: '체념한 듯 결국 내뱉는다.',
  }
  return behaviors[lieState] ?? '잠시 말을 멈추더니 다시 이어간다.'
}

/** 증거 유형 + 거짓말 상태에 따른 재판관 유도·당사자 실수·재판관 확인 */
function getDiscoveryLines(
  ev: { name: string; type: string },
  npcName: string,
  lieState: string,
): { probe: string; slip: string; confirm: string } {
  // 거짓말 상태별 실수 맥락 (당사자가 말을 흘리는 방식)
  const slipContext: Record<string, string> = {
    S0: '그때 그 일은… 아, 아닙니다. 그냥 제가 잘못 말했습니다.',
    S1: '그건… 사실 그때…',
    S2: '아니, 그러니까… 그것도 관련이 있긴 한데…',
    S3: '그쪽이야말로! …아, 그건 제가 말할 부분이 아니었는데.',
    S4: '그게 그렇게 된 건 — 아…',
    S5: '… 솔직히 말씀드리면, 그것도 있습니다.',
  }
  const ctx = slipContext[lieState] ?? '…'

  // 증거 유형별 3단 대사 — probe(유도) → slip(실수) → confirm(확인)
  const typeLines: Record<string, { probe: string; slip: string; confirm: string }> = {
    bank: {
      probe: `${npcName} 씨, 당시 금전 흐름에 대해 좀 더 구체적으로 설명해 주시겠습니까.`,
      slip: `${ctx} 그 돈 문제는… 거래 내역을 보시면 아시겠지만…`,
      confirm: `지금 거래 내역을 언급하셨습니다. 해당 금융 기록을 확인하겠습니다.`,
    },
    chat: {
      probe: `${npcName} 씨, 당시 상대방과 연락을 주고받은 적이 있습니까.`,
      slip: `${ctx} 그때 주고받은 메시지가 있긴 한데…`,
      confirm: `메시지 기록이 있다고 하셨습니다. 해당 대화 내용을 확보하겠습니다.`,
    },
    cctv: {
      probe: `${npcName} 씨, 그 시간대에 정확히 어디에 계셨는지 다시 한번 말씀해 주십시오.`,
      slip: `${ctx} 그 시간에 거기 있었던 건 맞는데… 카메라가 있는 줄은…`,
      confirm: `해당 장소에 있었다고 인정하셨습니다. 영상 기록을 확인하겠습니다.`,
    },
    contract: {
      probe: `${npcName} 씨, 혹시 사전에 서로 합의하거나 약속한 부분이 있었습니까.`,
      slip: `${ctx} 그때 서로 약속한 게 있긴 했습니다…`,
      confirm: `약속이 있었다고 하셨습니다. 관련 문서를 확인하겠습니다.`,
    },
    testimony: {
      probe: `${npcName} 씨, 그 상황을 목격하거나 알고 있는 다른 사람이 있습니까.`,
      slip: `${ctx} 그 자리에 다른 사람도 있었는데…`,
      confirm: `제3자가 있었다고 하셨습니다. 해당 인물의 증언을 확보하겠습니다.`,
    },
    log: {
      probe: `${npcName} 씨, 당시 상황을 뒷받침할 기록이 남아 있습니까.`,
      slip: `${ctx} 기록을 보면 알 수 있을 텐데…`,
      confirm: `기록이 존재한다고 하셨습니다. 해당 로그를 확인하겠습니다.`,
    },
    device: {
      probe: `${npcName} 씨, 그 시점에 휴대폰이나 기기를 사용하신 적이 있습니까.`,
      slip: `${ctx} 그때 폰으로 확인한 건 맞는데…`,
      confirm: `기기를 사용한 사실을 인정하셨습니다. 해당 데이터를 확보하겠습니다.`,
    },
    sns: {
      probe: `${npcName} 씨, 이 건과 관련해 온라인에 게시하거나 공유한 적이 있습니까.`,
      slip: `${ctx} 그게 온라인에 올라간 건 맞지만…`,
      confirm: `온라인 게시 사실을 인정하셨습니다. 해당 게시물을 확인하겠습니다.`,
    },
  }

  return typeLines[ev.type] ?? {
    probe: `${npcName} 씨, 이 부분에 대해 좀 더 자세히 설명해 주시겠습니까.`,
    slip: `${ctx} 그것도 사실 관련이 있긴 합니다…`,
    confirm: `지금 하신 말씀에서 단서가 포착됐습니다. 관련 자료를 확인하겠습니다.`,
  }
}

/** 회피 판독 결과 표시 — 해당 쟁점의 거짓말 불안정도 공개 */
function showEvasionReadingResult(party: PartyId, disputeId: string) {
  const state = useGameStore.getState()
  if (!state.caseData) return
  const agent = party === 'a' ? state.agentA : state.agentB
  const name = party === 'a' ? state.caseData.duo.partyA.name : state.caseData.duo.partyB.name
  const dispute = state.caseData.disputes.find(d => d.id === disputeId)
  const lieEntry = agent.lieStateMap[disputeId]

  if (!lieEntry || !dispute) return

  const intensityLabel = (lieEntry as any).lieIntensity === 'L1' ? '매우 불안정'
    : (lieEntry as any).lieIntensity === 'L2' ? '불안정'
    : '강하게 방어 중'
  const stateLabel: Record<string, string> = {
    S0: '완강히 부정', S1: '동요 중', S2: '일부 인정', S3: '책임 전가', S4: '감정 호소', S5: '인정',
  }

  state.addDialogue({
    speaker: 'system',
    text: `🔍 ${name}의 속마음 — ${intensityLabel}`,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
  })
}

/** lie state 전이 이전 상태를 추적하기 위한 스냅샷 */
const _lieStateBeforeTransition: Record<string, string> = {}

/** 전이 시도 전에 호출하여 이전 상태 저장 */
export function snapshotLieState(party: PartyId, disputeId: string) {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB
  const current = agent.lieStateMap[disputeId]?.currentState ?? 'S0'
  _lieStateBeforeTransition[`${party}:${disputeId}`] = current
}

function notifyLieTransition(party: PartyId, disputeId: string) {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB
  const name = party === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name
  const dispute = state.caseData?.disputes.find((d) => d.id === disputeId)
  const newState = agent.lieStateMap[disputeId]?.currentState
  const prevState = _lieStateBeforeTransition[`${party}:${disputeId}`] ?? 'S0'

  // S4/S5에 도달하면 revealed 마킹
  if (newState && (newState === 'S4' || newState === 'S5')) {
    state.markRevealed(party, disputeId)
  }
  const labels: Record<string, string> = {
    S1: '방어적 태도를 보이기 시작했다',
    S2: '답변에 변화가 감지된다',
    S3: '감정이 동요하고 있다',
    S4: '심리적 압박이 커지고 있다',
    S5: '진술 태도가 크게 변했다',
  }
  if (newState && labels[newState]) {
    if (newState === 'S5') playLieCollapse()
    const icon = newState >= 'S4' ? '💥' : '⚡'
    const text = newState === 'S5'
      ? `🔥 결정적 순간 — ${name}의 진술 태도가 크게 변했다!`
      : `${icon} ${name} — ${labels[newState]}`
    state.addDialogue({ speaker: 'system', text, relatedDisputes: [disputeId], turn: state.turnCount })

    // S5 도달 시 진실 발견 + 정답지 기록
    if (newState === 'S5' && dispute) {
      playLieCollapse()

      // 관련 truthTable에서 해당 쟁점의 진실 찾아서 발견 처리
      const caseData = state.caseData
      if (caseData) {
        const disputeIdx = caseData.disputes.findIndex(d => d.id === disputeId)
        if (disputeIdx >= 0) {
          const truthId = caseData.truthTable[disputeIdx]?.id ?? `t-${disputeIdx + 1}`
          const truth = caseData.truthTable[disputeIdx]

          // 진실 발견 기록
          if (!state.discovery.discoveredTruths.includes(truthId)) {
            state.addDiscoveredTruth(truthId)
            // 시스템 메시지: 진실 발견 (구체 내용은 증거 게시판에서 확인)
            state.addDialogue({
              speaker: 'system',
              text: `✅ 결정적 진술이 확보되었습니다. 증거 게시판에서 확인하십시오.`,
              relatedDisputes: [disputeId],
              turn: state.turnCount,
            })
          }

          // 정답지에 자동 기록
          state.setFactFinding(disputeId, dispute.truth ? 'true' : 'false')
        }
      }
    }
  }

  // ── 모순 감지: 부정→인정 전이 시 이전 주장과의 실질적 모순 ──
  // S0/S1(부정) → S2+(인정) 으로 넘어갈 때만 모순 발생 (같은 구간 내 전이는 모순 아님)
  const DENIAL_STATES = ['S0', 'S1']
  const ADMISSION_STATES = ['S2', 'S3', 'S4', 'S5']
  const crossedBoundary = DENIAL_STATES.includes(prevState) && ADMISSION_STATES.includes(newState ?? '')

  if (crossedBoundary && dispute) {
    // 이전 부정 단계에서의 주장 찾기
    const prevClaims = state.claimGraph.filter(
      (c) => c.claimant === party && c.disputeId === disputeId,
    )
    if (prevClaims.length > 0) {
      const previousClaim = prevClaims[prevClaims.length - 1].summary

      // 입장 변화 설명 생성 (프로그래밍 기반, LLM 불필요)
      const transitionDesc: Record<string, string> = {
        'S0→S2': `이전 답변과 달리, 태도에 변화가 감지됩니다`,
        'S0→S3': `이전 답변과 달리, 감정적으로 동요하고 있습니다`,
        'S0→S4': `이전 답변과 달리, 심리적 압박을 받고 있는 듯합니다`,
        'S0→S5': `이전 답변과 크게 달라진 태도를 보이고 있습니다`,
        'S1→S2': `이전 답변과 달리, 태도에 변화가 감지됩니다`,
        'S1→S3': `이전 답변과 달리, 감정적으로 동요하고 있습니다`,
        'S1→S4': `이전 답변과 달리, 심리적 압박을 받고 있는 듯합니다`,
        'S1→S5': `이전 답변과 크게 달라진 태도를 보이고 있습니다`,
      }
      const desc = transitionDesc[`${prevState}→${newState}`] ?? `이전 진술과 입장이 달라졌습니다`

      state.addDialogue({
        speaker: 'system',
        text: `⚡ ${name}의 진술에서 이전과 다른 점이 발견되었다 — 탭하여 추궁`,
        relatedDisputes: [disputeId],
        turn: state.turnCount,
        contradictionMeta: {
          party,
          disputeId,
          previousClaim,
          currentClaim: desc,
        },
      })
    }
  }
}

/** lie_collapse 미니게임 성공 시 추가 보상 처리 */
export function applyLieCollapseSuccess(disputeId: string, party: PartyId) {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB

  // 관련 잠긴 증거 1개 해금 시도
  const lockedEv = state.evidenceDefinitions.find(
    (e) => e.proves.includes(disputeId) && !state.evidenceStates[e.id]?.unlocked
  )

  if (lockedEv) {
    useGameStore.setState((prev) => ({
      evidenceStates: {
        ...prev.evidenceStates,
        [lockedEv.id]: { ...prev.evidenceStates[lockedEv.id], unlocked: true },
      },
    }))
    playEvidenceUnlock()
    state.addDialogue({
      speaker: 'system',
      text: `🔥 완벽하게 간파했다! 새 증거가 해금된다 — ${lockedEv.name}`,
      relatedDisputes: lockedEv.proves,
      turn: state.turnCount,
    })
  } else {
    state.addDialogue({
      speaker: 'system',
      text: `🔥 완벽하게 간파했다! 결정적 순간을 놓치지 않았다.`,
      relatedDisputes: [disputeId],
      turn: state.turnCount,
    })
  }
}

/** lie_collapse 미니게임 실패 시 처리 */
export function applyLieCollapseFail(disputeId: string) {
  const state = useGameStore.getState()
  state.addDialogue({
    speaker: 'system',
    text: `방어가 무너졌지만, 결정적 증거는 놓쳤다...`,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
  })
}

/** contradiction 미니게임 성공 시 처리 */
export function applyContradictionSuccess(disputeId: string, target: PartyId) {
  const state = useGameStore.getState()
  const name = target === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name
  const dispute = state.caseData?.disputes.find(d => d.id === disputeId)

  // 모순 짚어냄 메시지
  state.addDialogue({
    speaker: 'system',
    text: `⚡ 모순을 정확히 짚어냈다!`,
    relatedDisputes: disputeId ? [disputeId] : [],
    turn: state.turnCount,
  })

  // 보상 1: 감정 +15 (큰 동요)
  changeEmotionWithPhaseTracking(target, 15)

  // 보상 2: 거짓말 전이 시도
  const transitioned = state.transitionLie(target, disputeId, 'hard_evidence')
  if (transitioned) {
    notifyLieTransition(target, disputeId)
    state.addDialogue({
      speaker: 'system',
      text: `🔓 ${name}의 방어가 흔들렸다! 진술 태도에 변화가 감지된다.`,
      relatedDisputes: [disputeId],
      turn: state.turnCount,
    })
  } else {
    state.addDialogue({
      speaker: 'system',
      text: `💡 ${name}에게 심리적 압박을 가했다.`,
      relatedDisputes: [disputeId],
      turn: state.turnCount,
    })
  }
}

/** contradiction 미니게임 실패 시 처리 */
export function applyContradictionFail(disputeId: string) {
  const state = useGameStore.getState()
  state.addDialogue({
    speaker: 'system',
    text: `모순의 핵심을 놓쳤다...`,
    relatedDisputes: disputeId ? [disputeId] : [],
    turn: state.turnCount,
  })
}

function questionTypeToTrigger(type: QuestionType): string[] {
  const map: Record<QuestionType, string[]> = {
    fact_pursuit: ['direct_question', 'timeline_question'],
    motive_search: ['motive_question', 'context_question'],
    empathy_approach: ['empathy_question', 'provenance_question'],
  }
  return map[type] ?? ['direct_question']
}

function applyTrustEffect(actionType: string, target: PartyId) {
  const s = useGameStore.getState()
  switch (actionType) {
    case 'confidential_protection': s.changeTrust(target, 'trustTowardJudge', 20); s.changeTrust(target, 'fearOfExposure', -15); break
    case 'separation':
      // 분리심문: 조사 토큰 1 소모, 3턴간 상대 배제
      if (s.resources.investigationTokens >= 1) {
        s.spend('investigationTokens', 1)
        s.startSeparation(target, 3)
        playSeparation()
        s.changeTrust(target, 'retaliationWorry', -10)
        s.addDialogue({ speaker: 'system', text: `🚪 분리 심문 시작 — 3턴간 상대방이 배제된다.`, relatedDisputes: [], turn: s.turnCount })
      } else {
        s.addDialogue({ speaker: 'system', text: `조사 토큰이 부족합니다.`, relatedDisputes: [], turn: s.turnCount })
      }
      break
  }
}

function buildQuestionText(type: QuestionType, target: PartyId, disputeId: string): string {
  const s = useGameStore.getState()
  if (!s.caseData) return '말씀해 주십시오.'
  const myName = target === 'a' ? s.caseData.duo.partyA.name : s.caseData.duo.partyB.name
  const opName = target === 'a' ? s.caseData.duo.partyB.name : s.caseData.duo.partyA.name
  const dispute = s.caseData.disputes.find((d) => d.id === disputeId)
  const agent = target === 'a' ? s.agentA : s.agentB
  const lieEntry = agent.lieStateMap[disputeId]
  const lieState = lieEntry?.currentState ?? 'S0'
  const turn = s.turnCount

  // 쟁점명에서 대상 이름을 제거하고 자연스러운 주제로 변환
  // "세린의 새벽 휴대폰 열람" → 대상이 세린이면 "새벽에 휴대폰을 보신 것"
  // "지석의 비밀 송금 280만원" → 대상이 지석이면 "비밀 송금 280만원"
  const rawTopic = dispute?.name ?? '해당 사안'
  const myGiven = myName.slice(1)  // 성 제거
  const opGiven = opName.slice(1)
  let topic = rawTopic
  // 대상 본인의 이름이 쟁점에 있으면 제거 → "~에 대해"가 자연스러움
  if (topic.includes(myGiven + '의 ')) {
    topic = topic.replace(myGiven + '의 ', '')
  } else if (topic.includes(myGiven + '이 ') || topic.includes(myGiven + '가 ')) {
    topic = topic.replace(new RegExp(myGiven + '[이가] '), '')
  }
  // 상대 이름은 "상대방의"로 치환
  if (topic.includes(opGiven + '의 ')) {
    topic = topic.replace(opGiven + '의 ', '상대방의 ')
  }

  // 질문 유형별 + lieState별 질문
  if (type === 'fact_pursuit') {
    if (lieState >= 'S3') return `${myName} 씨, 계속 돌려 말씀하시는데 — ${topic}, 정직하게 답해 주십시오.`
    const pool = [
      `${myName} 씨, ${topic}에 대해 사실대로 말씀해 주십시오.`,
      `${myName} 씨, ${topic} 당시 정확히 어떤 일이 있었습니까?`,
      `${myName} 씨, ${topic}에 대해 빠뜨린 부분이 있지 않습니까?`,
      `${myName} 씨, 아까 말씀하신 내용 중 ${topic}과 맞지 않는 부분이 있습니다. 설명해 주시겠습니까?`,
    ]
    return pool[(turn + disputeId.charCodeAt(disputeId.length - 1)) % pool.length]
  }

  if (type === 'motive_search') {
    if (lieState >= 'S3') return `${myName} 씨, 상대방 탓만 하지 마시고 ${topic}에 대한 본인의 생각을 말씀해 주십시오.`
    const pool = [
      `${myName} 씨, ${topic}을 왜 그렇게 하셨습니까?`,
      `${myName} 씨, ${topic} 당시 어떤 사정이 있었습니까?`,
      `${myName} 씨, 다른 방법도 있었을 텐데 왜 하필 그렇게 하셨는지 말씀해 주십시오.`,
      `${myName} 씨, ${topic}의 배경을 좀 더 설명해 주시겠습니까?`,
    ]
    return pool[(turn + disputeId.charCodeAt(disputeId.length - 1)) % pool.length]
  }

  // 공감 접근 — 부드럽지만 동정이 아닌 진심으로
  const pool = [
    `${myName} 씨, ${topic}에 대해서 — 그때 어떤 마음이셨는지 솔직하게 말씀해 주시겠습니까.`,
    `${myName} 씨, ${topic} 당시 심정이 어떠셨습니까? 편하게 말씀해 주세요.`,
    `${myName} 씨, ${topic}에 대한 솔직한 마음을 듣고 싶습니다.`,
    `${myName} 씨, 이 부분이 쉽지 않으시겠지만 — ${topic}에 대한 본심을 말씀해 주시겠습니까.`,
  ]
  return pool[(turn + disputeId.charCodeAt(disputeId.length - 1)) % pool.length]
}

function buildTrustActionText(actionType: string, target: PartyId): string {
  const s = useGameStore.getState()
  const name = target === 'a' ? s.caseData?.duo.partyA.name : s.caseData?.duo.partyB.name
  const t: Record<string, string> = {
    confidential_protection: `${name} 씨, 지금 하시는 말씀은 상대방에게 공개하지 않겠습니다.`,
    separation: `상대측은 발언을 중단해 주십시오.`,
  }
  return t[actionType] ?? ''
}

/** optimalPath 추적 — 액션이 필수/보너스 경로에 해당하는지 체크 */
function trackOptimalPath(disputeId: string, actionType: string) {
  const state = useGameStore.getState()
  if (!state.caseData) return
  const caseKey = normalizeCaseKey(state.caseData.caseId)
  const path = getOptimalPath(caseKey, disputeId)
  if (!path) return

  // requiredActions 체크 (예: ["fact_pursuit", "evidence_present:e-1"])
  const matchesRequired = path.requiredActions.some(ra => ra === actionType || ra.startsWith(actionType))
  if (matchesRequired) state.trackMetric('requiredPathsCovered')

  // bonusActions 체크
  const matchesBonus = path.bonusActions.some(ba => ba === actionType || ba.startsWith(actionType))
  if (matchesBonus) state.trackMetric('bonusPathsCovered')
}

// ── 모순 추궁 ──
export async function handleContradictionPursue(
  party: PartyId,
  disputeId: string,
  previousClaim: string,
  currentClaim: string,
) {
  if (globalDispatchLock) return
  globalDispatchLock = true
  try {
    const state = useGameStore.getState()
    if (!state.caseData) return

    const npcName = party === 'a'
      ? state.caseData.duo.partyA.name
      : state.caseData.duo.partyB.name
    const dispute = state.caseData.disputes.find(d => d.id === disputeId)

    // 템플릿 기반 모순 추궁 질문 생성 (LLM 불필요, 즉시 생성)
    const lieEntry = (party === 'a' ? state.agentA : state.agentB).lieStateMap[disputeId]
    const currentLieState = lieEntry?.currentState ?? 'S0'
    const judgeQuestion = buildContradictionQuestion(npcName, previousClaim, currentClaim, currentLieState)

    state.addDialogue({
      speaker: 'judge',
      text: judgeQuestion,
      relatedDisputes: [disputeId],
      turn: state.turnCount,
    })

    // 모순 맥락을 시스템 메시지로 LLM 컨텍스트에 포함 (UI 표시 안 함, 프롬프트용)
    state.addDialogue({
      speaker: 'system',
      text: `[모순 추궁 맥락] 이전: "${previousClaim.slice(0, 60)}" → 현재: "${currentClaim.slice(0, 60)}". 이 모순에 대해 해명해야 합니다.`,
      relatedDisputes: [disputeId],
      turn: state.turnCount,
      isHidden: true,
    })

    // LLM으로 NPC 응답 생성 — 재판관 질문은 이미 추가했으므로 스킵
    _skipNextJudgeQuestion = true
    const action: PlayerAction = {
      type: 'question',
      questionType: 'fact_pursuit',
      target: party,
      disputeId,
    }
    await resolveAndApply(action, party)

    // 모순 추궁은 거짓말 전이에 유리 — 추가 전이 시도
    snapshotLieState(party, disputeId)
    const transitioned = state.transitionLie(party, disputeId, 'contradiction_pursuit')
    if (transitioned) {
      notifyLieTransition(party, disputeId)
      state.trackMetric('lieTransitions')
      const freshAgent = party === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
      if (freshAgent.lieStateMap[disputeId]?.currentState === 'S5') {
        state.trackMetric('liesCollapsed')
      }
    }

    // 감정 상승 (모순 추궁은 압박이 강함)
    changeEmotionWithPhaseTracking(party, 12)

    // Discovery 체크
    runDiscoveryChecks(party, disputeId)

    useGameStore.getState().incrementTurn()
  } finally {
    globalDispatchLock = false
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 모순 추궁 질문 템플릿 (15종: soft 5 + mid 5 + hard 5)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ContradictionTone = 'soft' | 'mid' | 'hard'

const CONTRADICTION_TEMPLATES: Record<ContradictionTone, string[]> = {
  soft: [
    '${name} 씨, 앞서 \'${prev}\'라고 하셨습니다. 그런데 현재 기록에는 \'${curr}\'라는 내용이 보입니다. 기억이 달라진 것인지 차분히 설명해 주시겠습니까?',
    '${name} 씨, 조금 전 진술의 핵심은 \'${prev}\'였습니다. 반면 지금 정리되는 내용은 \'${curr}\'입니다. 어느 부분에서 설명이 바뀐 것인지 짚어 주시겠습니까?',
    '${name} 씨, 제가 적어 둔 이전 답변은 \'${prev}\'입니다. 그런데 지금은 \'${curr}\'라는 흐름이 나타납니다. 두 내용을 어떻게 이해해야 합니까?',
    '${name} 씨, 처음 말씀은 \'${prev}\' 쪽이었는데, 현재는 \'${curr}\'라는 방향이 보입니다. 기억 차이인지, 표현 차이인지 말씀해 주십시오.',
    '${name} 씨, 앞선 답변과 지금 드러나는 흐름 사이에 간격이 있습니다. 이전에는 \'${prev}\'라고 하셨고, 현재 기록에는 \'${curr}\'라는 내용이 남아 있습니다. 어느 쪽이 더 가까운 설명인지 말씀해 주시겠습니까?',
  ],
  mid: [
    '${name} 씨, 앞서 \'${prev}\'라고 하셨는데, 현재는 \'${curr}\'라는 내용이 확인됩니다. 입장이 달라진 이유를 분명히 설명해 주십시오.',
    '${name} 씨, \'${prev}\'라는 이전 진술과 지금 \'${curr}\'로 정리되는 내용은 그대로 이어지기 어렵습니다. 어느 쪽을 기준으로 받아들여야 합니까?',
    '${name} 씨, 제가 기록한 답변은 \'${prev}\'입니다. 그런데 현재 진술의 흐름은 \'${curr}\' 쪽으로 움직이고 있습니다. 왜 이렇게 달라졌는지 설명하십시오.',
    '${name} 씨, 조금 전까지는 \'${prev}\'라는 취지였는데, 이제는 \'${curr}\'라는 내용이 드러납니다. 무엇 때문에 설명이 달라졌는지 답하십시오.',
    '${name} 씨, 이전 답변의 요지는 \'${prev}\'였고, 지금 정리되는 내용은 \'${curr}\'입니다. 이 차이를 그대로 넘길 수는 없으니, 정확히 정리해 주십시오.',
  ],
  hard: [
    '${name} 씨, 이전 진술은 \'${prev}\'였는데, 현재는 \'${curr}\'라는 변화가 나타납니다. 더 이상 모호하게 말씀하지 말고, 어느 설명을 기준으로 판단해야 하는지 분명히 답하십시오.',
    '${name} 씨, 분명히 \'${prev}\'라고 하셨습니다. 그런데 현재 기록은 \'${curr}\'로 바뀌어 있습니다. 이 차이가 왜 생겼는지 분명히 설명하십시오.',
    '${name} 씨, 처음 답변은 \'${prev}\'였고, 지금은 \'${curr}\'라는 방향으로 내용이 움직였습니다. 이렇게 달라진 이상, 한 문장으로 넘기지 말고 정확한 경위를 말씀하십시오.',
    '${name} 씨, 앞선 진술과 지금 확인되는 내용이 서로 맞지 않습니다. 앞선 진술은 \'${prev}\'였고, 지금 확인되는 내용은 \'${curr}\'입니다. 설명 없이 지나갈 수 없으니, 핵심을 분명히 밝히십시오.',
    '${name} 씨, 지금 나타난 진술 변화는 가볍게 볼 수 없습니다. 이전에는 \'${prev}\'였는데 현재는 \'${curr}\'라는 흐름이 확인됩니다. 어느 시점부터 설명이 달라졌는지 명확히 답하십시오.',
  ],
}

const _contradictionRotation = new Map<string, number>()

function resolveContradictionTone(lieState: string): ContradictionTone {
  if (lieState === 'S0' || lieState === 'S1') return 'soft'
  if (lieState === 'S2') return 'mid'
  return 'hard'
}

function buildContradictionQuestion(
  name: string,
  previousClaim: string,
  currentClaim: string,
  lieState: string,
): string {
  const tone = resolveContradictionTone(lieState)
  const templates = CONTRADICTION_TEMPLATES[tone]
  const key = `contradiction:${name}:${tone}`
  const idx = _contradictionRotation.get(key) ?? 0
  _contradictionRotation.set(key, idx + 1)
  const template = templates[idx % templates.length]

  const prev = previousClaim.length > 50 ? previousClaim.slice(0, 47) + '…' : previousClaim
  const curr = currentClaim.length > 50 ? currentClaim.slice(0, 47) + '…' : currentClaim

  return template
    .replace(/\$\{name\}/g, name)
    .replace(/\$\{prev\}/g, prev)
    .replace(/\$\{curr\}/g, curr)
}
