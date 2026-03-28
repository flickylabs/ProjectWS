// @ts-nocheck — 대규모 파일, 점진적 타입 정리 예정
import { useCallback } from 'react'
import { useGameStore } from '../store/useGameStore'
import { resolveDialogue, generateDynamicFallback } from '../engine/dialogueResolver'
import { resolveLLMDialogue } from '../engine/llmDialogueResolver'
import { generateWitnessTestimony, canCallWitness } from '../engine/witnessEngine'
import type { PlayerAction, PartyId, QuestionType, DialogueNode } from '../types'
import { playEvidencePresent, playLieCollapse, playEvidenceUnlock, playEvidenceUpgrade, playSeparation } from '../engine/soundEngine'
import { iga, eunneun } from '../utils/korean'

/** LLM 모드 플래그 — App에서 설정 */
let useLLMMode = false
export function setLLMMode(enabled: boolean) { useLLMMode = enabled }
export function isLLMMode() { return useLLMMode }

/** 다음 질문에 적용할 토글 모디파이어 */
let _nextConfidential = false
let _nextEvasionTarget: { target: PartyId; disputeId: string } | null = null

export function setNextConfidential(on: boolean) { _nextConfidential = on }
export function setNextEvasionReading(target: PartyId, disputeId: string) {
  _nextEvasionTarget = { target, disputeId }
}

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
    if (action.type === 'call_witness') {
      handleCallWitness(action)
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
    if (transitioned) { notifyLieTransition(action.target, disputeId); evDidTransition = true }
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
  }

  useGameStore.getState().incrementTurn()
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

  // 메트릭 추적
  state.trackMetric('questionsAsked')
  // bothSidesQuestioned: A와 B 모두 질문한 적 있는지 체크
  if (!state.processMetrics.bothSidesQuestioned) {
    const otherTarget = action.target === 'a' ? 'b' : 'a'
    const otherAsked = state.dialogueLog.some(d => d.speaker === otherTarget)
    if (otherAsked) state.trackMetric('bothSidesQuestioned')
  }

  // lie 전이 시도
  const triggers = questionTypeToTrigger(action.questionType)
  let didTransition = false
  for (const trigger of triggers) {
    const transitioned = state.transitionLie(action.target, action.disputeId, trigger)
    if (transitioned) {
      notifyLieTransition(action.target, action.disputeId)
      didTransition = true
      state.trackMetric('lieTransitions')
      // S5 도달 체크
      const agent = action.target === 'a' ? state.agentA : state.agentB
      if (agent.lieStateMap[action.disputeId]?.currentState === 'S5') {
        state.trackMetric('liesCollapsed')
      }
      break
    }
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

  useGameStore.getState().incrementTurn()
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

  const isConfidential = action.actionType === 'confidential_protection'
  await resolveAndApply(action, action.target, isConfidential)

  useGameStore.getState().incrementTurn()
}

// ── 공통: LLM 또는 폴백으로 대사 해석 ──
async function resolveAndApply(action: PlayerAction, target: PartyId, isConfidential = false) {
  let node: DialogueNode | null = null
  const preState = useGameStore.getState()

  if (useLLMMode && preState.caseData) {
    preState.setLLMLoading(true, target)
    try {
      // await 후 fresh state로 재로드
      const freshState = useGameStore.getState()
      const result = await resolveLLMDialogue(
        action, freshState.agentA, freshState.agentB, freshState.evidenceStates, freshState.caseData!,
      )
      if (result) node = result.node
    } catch {
      // LLM 실패 → 폴백
    }
    useGameStore.getState().setLLMLoading(false)
  }

  if (!node) {
    // LLM 실패 시 폴백: 재판관 질문이 아직 없으면 고정 템플릿 추가
    const fallbackState = useGameStore.getState()
    if (useLLMMode && action.type === 'question') {
      const lastJudge = fallbackState.dialogueLog.slice(-3).find(d => d.speaker === 'judge')
      if (!lastJudge || lastJudge.turn < fallbackState.turnCount) {
        fallbackState.addDialogue({
          speaker: 'judge',
          text: buildQuestionText(action.questionType, action.target, action.disputeId),
          relatedDisputes: [action.disputeId],
          turn: fallbackState.turnCount,
        })
      }
    }
    const freshState = useGameStore.getState()
    // LLM 모드: 대사 트리(case-001 전용)를 건너뛰고 동적 폴백 직접 사용
    // 비LLM 모드: 기존 대사 트리 매칭 유지
    if (useLLMMode) {
      const agent = target === 'a' ? freshState.agentA : freshState.agentB
      const qt = action.type === 'question' ? action.questionType : undefined
      const disputeId = 'disputeId' in action ? (action as { disputeId?: string }).disputeId : undefined
      node = generateDynamicFallback(target, agent, disputeId, qt)
    } else {
      const result = resolveDialogue(action, freshState.agentA, freshState.agentB, freshState.evidenceStates)
      if (result) node = result.node
    }
  }

  // 폴백도 실패하면 범용 응답 생성
  if (!node) {
    const s = useGameStore.getState()
    const name = target === 'a' ? s.caseData?.duo.partyA.name : s.caseData?.duo.partyB.name
    s.addDialogue({
      speaker: target,
      text: `... ${eunneun(name ?? '당사자')} 할 말을 잃었다.`,
      relatedDisputes: [],
      turn: s.turnCount,
      behaviorHint: '침묵하며 생각에 잠긴다.',
      isConfidential,
    })
    return
  }

  applyDialogueNode(node, target, isConfidential)
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
  state.setPendingMinigame({ type: 'evidence_discovery', evidenceId: ev.id, clues })
  return // 미니게임 결과에서 actuallyDiscoverEvidence 호출
}

/** 미니게임 성공 시 실제 증거 해금 */
export function actuallyDiscoverEvidence(evidenceId: string) {
  const state = useGameStore.getState()
  if (!state.caseData) return

  const ev = state.evidenceDefinitions.find(e => e.id === evidenceId)
  if (!ev) return

  const name = 'NPC'
  const lieState = 'S2'

  useGameStore.setState((prev) => ({
    evidenceStates: {
      ...prev.evidenceStates,
      [evidenceId]: { ...prev.evidenceStates[evidenceId], unlocked: true },
    },
  }))

  const reason = getDiscoveryReason(ev, name, lieState, ev.proves[0] ?? '')

  playEvidenceUnlock()
  state.trackMetric('evidenceDiscovered')
  state.addDialogue({
    speaker: 'system',
    text: reason,
    relatedDisputes: ev.proves,
    turn: state.turnCount,
  })
}

/** 증거 유형 + 상황에 따른 발견 사유 메시지 생성 */
function getDiscoveryReason(
  ev: { name: string; type: string },
  npcName: string,
  lieState: string,
  disputeName: string,
): string {
  // 거짓말 상태에 따른 발견 맥락
  const context: Record<string, string> = {
    S0: '말하다 실수로',
    S1: '흔들리면서',
    S2: '인정하다가',
    S3: '상대 탓을 하다',
    S4: '감정이 격해지며',
    S5: '결국 인정하면서',
  }
  const ctxText = context[lieState] ?? '대화 중'

  // 증거 유형별 발견 사유
  const n = iga(npcName)
  const typeReasons: Record<string, string[]> = {
    bank:       [`${n} ${ctxText} 금전 거래를 언급했다`, `관련 금융 기록을 확보했다`],
    chat:       [`${n} ${ctxText} 메시지 기록의 존재를 언급했다`, `해당 대화 내용을 확보했다`],
    cctv:       [`${n} ${ctxText} 특정 장소를 언급했다`, `해당 위치의 영상 기록을 확보했다`],
    contract:   [`${n} ${ctxText} 약속/계약을 언급했다`, `관련 문서를 확보했다`],
    testimony:  [`${n} ${ctxText} 제3자를 언급했다`, `해당 인물의 증언을 확보했다`],
    log:        [`${n} ${ctxText} 기록의 존재를 언급했다`, `관련 로그를 확보했다`],
    device:     [`${n} ${ctxText} 기기 사용을 언급했다`, `해당 기기 데이터를 확보했다`],
    sns:        [`${n} ${ctxText} SNS 활동을 언급했다`, `해당 게시물을 확보했다`],
  }

  const reasons = typeReasons[ev.type] ?? [`${npcName}의 진술에서 단서가 포착됐다`, `관련 자료를 확보했다`]

  return `📎 ${reasons[0]} → ${reasons[1]}\n🔓 새 증거: ${ev.name}`
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
