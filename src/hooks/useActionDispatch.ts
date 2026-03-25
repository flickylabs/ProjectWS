import { useCallback } from 'react'
import { useGameStore } from '../store/useGameStore'
import { resolveDialogue } from '../engine/dialogueResolver'
import { resolveLLMDialogue } from '../engine/llmDialogueResolver'
import type { PlayerAction, PartyId, QuestionType, DialogueNode } from '../types'

/** LLM 모드 플래그 — App에서 설정 */
let useLLMMode = false
export function setLLMMode(enabled: boolean) { useLLMMode = enabled }
export function isLLMMode() { return useLLMMode }

export function useActionDispatch() {
  const dispatch = useCallback((action: PlayerAction) => {
    const state = useGameStore.getState()

    if (action.type === 'evidence_present') {
      handleEvidencePresent(action)
      return
    }
    if (action.type === 'evidence_investigate') {
      handleEvidenceInvestigate(action)
      return
    }
    if (action.type === 'question') {
      handleQuestion(action)
      return
    }
    if (action.type === 'trust_action') {
      handleTrustAction(action)
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
async function handleEvidencePresent(action: Extract<PlayerAction, { type: 'evidence_present' }>) {
  const state = useGameStore.getState()
  if (!state.isUnlocked(action.evidenceId)) return

  const evDef = state.evidenceDefinitions.find((e) => e.id === action.evidenceId)
  if (!evDef) return

  const newUnlocks = state.presentEvidence(action.evidenceId, action.target)

  state.addDialogue({ speaker: 'system', text: `📄 증거 제시: ${evDef.name}`, relatedDisputes: evDef.proves, turn: state.turnCount })

  const trigger = evDef.reliability === 'hard' ? 'hard_evidence' : 'soft_evidence'
  for (const disputeId of evDef.proves) {
    const transitioned = state.transitionLie(action.target, disputeId, trigger)
    if (transitioned) notifyLieTransition(action.target, disputeId)
  }

  state.changeEmotion(action.target, evDef.reliability === 'hard' ? 15 : 8)

  for (const id of newUnlocks) {
    const def = state.evidenceDefinitions.find((e) => e.id === id)
    if (def) state.addDialogue({ speaker: 'system', text: `🔓 새로운 증거 확보: ${def.name}`, relatedDisputes: def.proves, turn: state.turnCount })
  }

  // 증거 조합 격상 체크
  const freshEvidenceState = useGameStore.getState()
  const triggered = freshEvidenceState.triggeredCombinations
  if (triggered.length > 0) {
    const caseData = freshEvidenceState.caseData
    if (caseData) {
      for (const comboKey of triggered) {
        const combo = caseData.evidenceCombinations.find((c) => c.requires.join('+') === comboKey)
        if (combo) {
          const names = combo.requires.map((id) => caseData.evidence.find((e) => e.id === id)?.name ?? id).join(' + ')
          freshEvidenceState.addDialogue({
            speaker: 'system',
            text: `⚡ 증거 조합 격상! ${names} → Hard 등급으로 신뢰도 상승`,
            relatedDisputes: combo.proves,
            turn: freshEvidenceState.turnCount,
          })
        }
      }
    }
  }

  // NPC 반응
  const fakeAction: PlayerAction = { type: 'question', questionType: 'fact_fixing', target: action.target, disputeId: evDef.proves[0] ?? '' }
  await resolveAndApply(fakeAction, action.target)

  state.incrementTurn()
}

// ── 증거 조사 ──
function handleEvidenceInvestigate(action: Extract<PlayerAction, { type: 'evidence_investigate' }>) {
  const state = useGameStore.getState()
  const result = state.investigateEvidence(action.evidenceId, action.subAction)
  if (result) state.addDialogue({ speaker: 'system', text: `🔍 ${result}`, relatedDisputes: [], turn: state.turnCount })
}

// ── 질문 ──
async function handleQuestion(action: Extract<PlayerAction, { type: 'question' }>) {
  const state = useGameStore.getState()

  state.addDialogue({
    speaker: 'judge',
    text: buildQuestionText(action.questionType, action.target, action.disputeId),
    relatedDisputes: [action.disputeId],
    turn: state.turnCount,
  })

  // lie 전이 시도
  const trigger = questionTypeToTrigger(action.questionType)
  const transitioned = state.transitionLie(action.target, action.disputeId, trigger)
  if (transitioned) notifyLieTransition(action.target, action.disputeId)

  if (action.questionType === 'empathy') {
    state.changeTrust(action.target, 'trustTowardJudge', 12)
  }

  // NPC 응답 (대상)
  await resolveAndApply(action, action.target)

  // 분리심문 턴 소모
  const sepState = useGameStore.getState()
  if (sepState.separationTarget) {
    const prevTurns = sepState.separationTurns
    sepState.tickSeparation()
    if (prevTurns <= 1) {
      useGameStore.getState().addDialogue({
        speaker: 'system',
        text: '🚪 분리심문이 종료되었습니다. 상대방이 복귀합니다.',
        relatedDisputes: [],
        turn: useGameStore.getState().turnCount,
      })
    }
  }

  // 상대방 끼어들기 (분리심문 중이면 차단)
  const opponent: PartyId = action.target === 'a' ? 'b' : 'a'
  const freshState = useGameStore.getState()
  const isSeparated = freshState.separationTarget === action.target  // 대상과 1:1 분리 중이면 상대 차단
  const opponentAgent = opponent === 'a' ? freshState.agentA : freshState.agentB
  const hasOpponentStake = !!opponentAgent.lieStateMap[action.disputeId]
  const opponentAngry = opponentAgent.emotionalState.phase === 'angry' || opponentAgent.emotionalState.phase === 'confident'

  // Phase별 끼어들기 확률 차등
  const phaseInterruptRate: Record<string, number> = {
    phase3: 0.3,  // 심문: 30%
    phase4: 0.2,  // 증거: 20%
    phase5: 0.15, // 재심문: 15% (재심문에서는 좀 더 통제됨)
  }
  const baseRate = phaseInterruptRate[freshState.currentPhase] ?? 0.25

  if (!isSeparated && hasOpponentStake && (opponentAngry || Math.random() < baseRate)) {
    const opponentName = opponent === 'a' ? freshState.caseData?.duo.partyA.name : freshState.caseData?.duo.partyB.name
    const opponentAction: PlayerAction = { type: 'question', questionType: action.questionType, target: opponent, disputeId: action.disputeId }
    freshState.addDialogue({
      speaker: 'system',
      text: `💬 ${opponentName}이(가) 끼어듭니다.`,
      relatedDisputes: [action.disputeId],
      turn: freshState.turnCount,
    })
    await resolveAndApply(opponentAction, opponent)
  }

  state.incrementTurn()
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

  // 신뢰 행동도 lie 전이 트리거 가능
  const freshState = useGameStore.getState()
  const agent = action.target === 'a' ? freshState.agentA : freshState.agentB
  for (const [disputeId, entry] of Object.entries(agent.lieStateMap)) {
    if (entry.collapseViaTrust && entry.currentState !== 'S5') {
      const transitioned = freshState.transitionLie(action.target, disputeId, `trust_${action.actionType}`)
      if (transitioned) notifyLieTransition(action.target, disputeId)
    }
  }

  await resolveAndApply(action, action.target)

  state.incrementTurn()
}

// ── 공통: LLM 또는 폴백으로 대사 해석 ──
async function resolveAndApply(action: PlayerAction, target: PartyId) {
  const state = useGameStore.getState()
  let node: DialogueNode | null = null

  if (useLLMMode && state.caseData) {
    state.setLLMLoading(true)
    try {
      const result = await resolveLLMDialogue(
        action, state.agentA, state.agentB, state.evidenceStates, state.caseData,
      )
      if (result) node = result.node
    } catch {
      // LLM 실패 → 폴백
    }
    state.setLLMLoading(false)
  }

  if (!node) {
    const result = resolveDialogue(action, state.agentA, state.agentB, state.evidenceStates)
    if (result) node = result.node
  }

  if (node) applyDialogueNode(node, target)
}

function applyDialogueNode(node: DialogueNode, target: PartyId) {
  const state = useGameStore.getState()

  state.addDialogue({
    speaker: node.speaker,
    text: node.text,
    relatedDisputes: node.conditions.disputeId ? [node.conditions.disputeId] : [],
    turn: state.turnCount,
    behaviorHint: node.behaviorHint,
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
    })
  }
}

function notifyLieTransition(party: PartyId, disputeId: string) {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB
  const name = party === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name
  const dispute = state.caseData?.disputes.find((d) => d.id === disputeId)
  const newState = agent.lieStateMap[disputeId]?.currentState
  const labels: Record<string, string> = {
    S1: '동요하기 시작합니다', S2: '일부를 인정했습니다',
    S3: '상대에게 책임을 돌리고 있습니다', S4: '감정적으로 호소하고 있습니다',
    S5: '더 이상 부정하지 않습니다',
  }
  if (newState && labels[newState]) {
    state.addDialogue({ speaker: 'system', text: `⚡ ${name}이(가) "${dispute?.name}" 쟁점에서 ${labels[newState]}`, relatedDisputes: [disputeId], turn: state.turnCount })
  }
}

function questionTypeToTrigger(type: QuestionType): string {
  const map: Record<QuestionType, string> = {
    fact_fixing: 'direct_question', timeline: 'timeline_question', motive: 'motive_question',
    context_expansion: 'context_question', provenance: 'provenance_question', empathy: 'empathy_question',
  }
  return map[type] ?? 'direct_question'
}

function applyTrustEffect(actionType: string, target: PartyId) {
  const s = useGameStore.getState()
  switch (actionType) {
    case 'confidential_protection': s.changeTrust(target, 'trustTowardJudge', 20); s.changeTrust(target, 'fearOfExposure', -15); break
    case 'interruption_block':
      // 분리심문: 조사 토큰 1 소모, 3턴간 상대 배제
      if (s.resources.investigationTokens >= 1) {
        s.spend('investigationTokens', 1)
        s.startSeparation(target, 3)
        s.changeTrust(target, 'retaliationWorry', -10)
        s.addDialogue({ speaker: 'system', text: `🚪 분리심문이 시작됩니다. 3턴간 상대방이 배제됩니다.`, relatedDisputes: [], turn: s.turnCount })
      } else {
        s.addDialogue({ speaker: 'system', text: `조사 토큰이 부족합니다.`, relatedDisputes: [], turn: s.turnCount })
      }
      break
    case 'retaliation_check': s.changeTrust(target, 'retaliationWorry', -25); break
    case 'emotional_stabilization': s.changeTrust(target, 'trustTowardJudge', 8); s.changeEmotion(target, -15); break
    case 'pre_disclosure_consent': s.changeTrust(target, 'trustTowardJudge', 5); break
  }
}

function buildQuestionText(type: QuestionType, target: PartyId, disputeId: string): string {
  const s = useGameStore.getState()
  const name = target === 'a' ? s.caseData?.duo.partyA.name : s.caseData?.duo.partyB.name
  const dispute = s.caseData?.disputes.find((d) => d.id === disputeId)
  const topic = dispute?.name ?? '해당 사안'
  const t: Record<QuestionType, string> = {
    fact_fixing: `${name} 씨, ${topic}에 대해 정확한 사실을 말씀해 주십시오.`,
    timeline: `${name} 씨, ${topic} 당시 시간 순서를 정리해 주십시오.`,
    motive: `${name} 씨, ${topic}에 대해 왜 그런 선택을 하셨습니까?`,
    context_expansion: `${name} 씨, ${topic}의 전후 상황을 말씀해 주십시오.`,
    provenance: `${name} 씨, 그 정보를 어디서 어떻게 알게 되셨습니까?`,
    empathy: `${name} 씨, 말하기 어려우시면 천천히 하셔도 됩니다.`,
  }
  return t[type]
}

function buildTrustActionText(actionType: string, target: PartyId): string {
  const s = useGameStore.getState()
  const name = target === 'a' ? s.caseData?.duo.partyA.name : s.caseData?.duo.partyB.name
  const t: Record<string, string> = {
    confidential_protection: `${name} 씨, 지금 하시는 말씀은 상대방에게 공개하지 않겠습니다.`,
    interruption_block: `상대측은 발언을 중단해 주십시오.`,
    retaliation_check: `${name} 씨, 말씀하신 후 불이익이 걱정되시나요?`,
    emotional_stabilization: `잠시 진정하시고. 준비되시면 천천히 말씀해 주십시오.`,
    pre_disclosure_consent: `${name} 씨, 이 내용을 공개해도 괜찮겠습니까?`,
  }
  return t[actionType] ?? ''
}
