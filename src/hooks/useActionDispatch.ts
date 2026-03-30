// @ts-nocheck — 대규모 파일, 점진적 타입 정리 예정
import { useCallback } from 'react'
import { useGameStore } from '../store/useGameStore'
import { resolveDialogue, generateDynamicFallback } from '../engine/dialogueResolver'
import { resolveLLMDialogue } from '../engine/llmDialogueResolver'
import { generateWitnessTestimony, canCallWitness } from '../engine/witnessEngine'
import type { PlayerAction, PartyId, QuestionType, DialogueNode } from '../types'
import { playEvidencePresent, playLieCollapse, playEvidenceUnlock, playEvidenceUpgrade, playSeparation } from '../engine/soundEngine'
import { iga, eunneun } from '../utils/korean'
import { showToast, showLLMErrorBanner } from '../components/common/Toast'
import { getAffinityScore, getAffinityGrade } from '../data/actionAffinity'
import { getOptimalPath, getNarrativeExpansion } from '../data/caseEnrichment'
import { normalizeCaseKey } from '../utils/caseHelpers'

/** LLM 모드 — AI 필수: 항상 true */
const useLLMMode = true
export function setLLMMode(_enabled: boolean) { /* AI 필수 — 항상 활성 */ }
export function isLLMMode() { return true }

/** 다음 질문에 적용할 토글 모디파이어 */
let _nextConfidential = false
let _nextEvasionTarget: { target: PartyId; disputeId: string } | null = null

export function setNextConfidential(on: boolean) { _nextConfidential = on }
export function setNextEvasionReading(target: PartyId, disputeId: string) {
  _nextEvasionTarget = { target, disputeId }
}

let globalDispatchLock = false

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

  state.changeEmotion(action.target, evDef.reliability === 'hard' ? 15 : 8)

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
    state.addDialogue({ speaker: 'system', text: '조사 토큰이 부족하다.', relatedDisputes: [], turn: state.turnCount })
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

  // 증언 생성 (LLM 또는 폴백)
  state.setLLMLoading(true)
  try {
    const recentDialogues = state.dialogueLog.slice(-8)
    const testimony = await generateWitnessTestimony(
      witness, state.caseData, state.agentA, state.agentB, recentDialogues,
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
      fresh.changeEmotion(unfavored, 10)

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
          state.trackMetric('unsupportedCollapses')
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

  // NPC 응답 — LLM 모드에서는 재판관 질문 + NPC 응답이 함께 생성됨
  await resolveAndApply(action, action.target, isConfidential)

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

  // ── 상대방 끼어들기 (구조적 반응 시스템) ──
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

  // ── optimalPath 추적 ──
  trackOptimalPath(action.disputeId, action.questionType)

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
    freshState.addClaim({
      claimant: target,
      disputeId: node.conditions.disputeId,
      summary,
      confidence: stanceToConfidence[llmMeta.stance] ?? 'medium',
      status: (stanceToStatus[llmMeta.stance] ?? 'normal') as any,
      turn: freshState.turnCount,
      isConfidential,
    })
  }
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
  if (effects.emotionalDelta) state.changeEmotion(target, effects.emotionalDelta)
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

  // 이 쟁점을 증명하는 잠긴 증거 찾기
  const lockedRelated = state.evidenceDefinitions.filter(e => {
    const rs = state.evidenceStates[e.id]
    if (!rs || rs.unlocked) return false
    return e.proves.includes(disputeId)
  })

  if (lockedRelated.length === 0) return

  // 발견 확률: 거짓말 상태가 깊을수록 높음
  const chanceByState: Record<string, number> = {
    S0: 0.15, S1: 0.30, S2: 0.50, S3: 0.65, S4: 0.80, S5: 1.0,
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
  state.setPendingMinigame({ type: 'evidence_discovery', evidenceId: ev.id, clues, npcName: name, lieState, party })
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
    text: `🔍 ${name}의 속마음 — "${dispute.name}": ${intensityLabel}`,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
  })
}

function notifyLieTransition(party: PartyId, disputeId: string) {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB
  const name = party === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name
  const dispute = state.caseData?.disputes.find((d) => d.id === disputeId)
  const newState = agent.lieStateMap[disputeId]?.currentState

  // S4/S5에 도달하면 revealed 마킹
  if (newState && (newState === 'S4' || newState === 'S5')) {
    state.markRevealed(party, disputeId)
  }
  const labels: Record<string, string> = {
    S1: '표정이 흔들린다!',
    S2: '일부를 인정하기 시작했다!',
    S3: '상대 탓을 하기 시작한다!',
    S4: '감정에 호소하기 시작했다!',
    S5: '결국 입을 열었다!',
  }
  if (newState && labels[newState]) {
    if (newState === 'S5') playLieCollapse()
    const icon = newState >= 'S4' ? '💥' : '⚡'
    state.addDialogue({ speaker: 'system', text: `${icon} ${name} — "${dispute?.name}" | ${labels[newState]}`, relatedDisputes: [disputeId], turn: state.turnCount })
  }
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
