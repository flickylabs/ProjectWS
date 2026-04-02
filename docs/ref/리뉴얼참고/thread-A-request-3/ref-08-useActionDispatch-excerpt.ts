/**
 * useActionDispatch.ts — handleQuestion 핵심 발췌
 * (전체 787줄 중 379~612줄)
 *
 * V2 통합 지점:
 * - 583~608줄: V3 질문 효과 미터 + 이벤트 평가 (여기에 피로도 엔진 삽입)
 * - 493줄: resolveAndApply() (여기를 beatSelectorV2로 교체)
 * - 521~574줄: 상대방 끼어들기 (B-3 강화 대상)
 */

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

  // sameActionRepeats: 같은 쟁점에 같은 질문 유형 3회+ 반복 감지
  const updatedHistory = useGameStore.getState().interrogationHistory[action.target]?.[action.disputeId]
  if (updatedHistory) {
    const sameCount = updatedHistory.questionTypes.filter((t: string) => t === action.questionType).length
    if (sameCount === 3) state.trackMetric('sameActionRepeats')
  }

  // 메트릭 추적
  state.trackMetric('questionsAsked')
  if (!state.processMetrics.bothSidesQuestioned) {
    const otherTarget = action.target === 'a' ? 'b' : 'a'
    const otherAsked = state.dialogueLog.some(d => d.speaker === otherTarget)
    if (otherAsked) state.trackMetric('bothSidesQuestioned')
  }

  // lie 전이 시도 — actionAffinity 점수로 게이팅
  const triggers = questionTypeToTrigger(action.questionType)
  let didTransition = false

  const agent = action.target === 'a' ? state.agentA : state.agentB
  const lieEntry = agent.lieStateMap[action.disputeId]
  const affinityScore = lieEntry ? getAffinityScore(lieEntry.lieMotive, action.questionType) : 1.0
  const affinityGrade = getAffinityGrade(affinityScore)

  // 상성 게이팅: worst → 30%, weak → 60%, else → 100%
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
        const freshAgent = action.target === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
        const qNewState = freshAgent.lieStateMap[action.disputeId]?.currentState
        if (qNewState === 'S5') {
          state.trackMetric('liesCollapsed')
          const isEmpathyOrMotive = action.questionType === 'empathy_approach'
            || triggers.includes('empathy_question')
            || triggers.includes('motive_question')
          if (!isEmpathyOrMotive) {
            state.trackMetric('unsupportedCollapses')
          }
        }
        if (qNewState && (qNewState === 'S4' || qNewState === 'S5')) {
          const caseKey = normalizeCaseKey(state.caseData?.caseId ?? '')
          if (getNarrativeExpansion(caseKey, action.disputeId)) state.trackMetric('deepTruthsUnlocked')
        }
        break
      }
    }
  }

  if (affinityGrade === 'best' || affinityGrade === 'good') {
    state.trackMetric('affinityHits')
  } else if (affinityGrade === 'weak' || affinityGrade === 'worst') {
    state.trackMetric('affinityMisses')
  }

  if (action.questionType === 'empathy_approach') {
    state.changeTrust(action.target, 'trustTowardJudge', 12)
  }

  // ★ V2 교체 지점: resolveAndApply → beatSelectorV2.selectTurnPresentation
  await resolveAndApply(action, action.target, isConfidential)

  // 증거 발견: NPC 응답 이후
  if (didTransition) {
    discoverEvidenceFromQuestioning(action.target, action.disputeId)
  }

  // 회피 판독
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

  // ★ B-3 강화 대상: 상대방 끼어들기
  const opponent: PartyId = action.target === 'a' ? 'b' : 'a'
  const freshState = useGameStore.getState()
  const isSeparated = freshState.separationTarget === action.target
  const opponentAgent = opponent === 'a' ? freshState.agentA : freshState.agentB
  const hasOpponentStake = !!opponentAgent.lieStateMap[action.disputeId]

  if (!isSeparated && hasOpponentStake) {
    const opponentName = opponent === 'a' ? freshState.caseData?.duo.partyA.name : freshState.caseData?.duo.partyB.name
    const targetAgent = action.target === 'a' ? freshState.agentA : freshState.agentB
    const targetLie = targetAgent.lieStateMap[action.disputeId]

    // ① 강제 끼어들기: 비밀 탄로 (S4/S5 전이)
    const secretRevealed = didTransition && targetLie && (targetLie.currentState === 'S4' || targetLie.currentState === 'S5')
    // ② 강제 끼어들기: 책임 전가 S3
    const blameShifted = didTransition && targetLie?.currentState === 'S3'
    // ③ 확률 끼어들기: 감정 기반
    const opponentAngry = opponentAgent.emotionalState.phase === 'angry' || opponentAgent.emotionalState.phase === 'confident'
    const phaseRate: Record<string, number> = { phase3: 0.25, phase4: 0.15, phase5: 0.1 }
    const baseRate = phaseRate[freshState.currentPhase] ?? 0.2
    const probabilisticInterrupt = opponentAngry ? Math.random() < baseRate + 0.25 : Math.random() < baseRate

    const shouldInterrupt = secretRevealed || blameShifted || probabilisticInterrupt

    if (shouldInterrupt) {
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

      const opponentAction: PlayerAction = {
        type: 'question',
        questionType: secretRevealed ? 'fact_pursuit' : action.questionType,
        target: opponent,
        disputeId: action.disputeId,
      }
      await resolveAndApply(opponentAction, opponent)
    }
  }

  trackOptimalPath(action.disputeId, action.questionType)

  // Discovery 체크
  runDiscoveryChecks(action.target, action.disputeId)

  // ★ V2 삽입 지점: 피로도 엔진 + 질문 효과 미터 + 이벤트 평가
  {
    const v3State = useGameStore.getState()
    const v3Agent = action.target === 'a' ? v3State.agentA : v3State.agentB
    const v3Lie = v3Agent.lieStateMap[action.disputeId]
    if (v3Lie) {
      const emotionVal = v3Agent.emotionalState.internalValue
      const emotionTier = emotionVal >= 85 ? 'shutdown' : emotionVal >= 65 ? 'explosive' : emotionVal >= 40 ? 'agitated' : 'calm'
      const stanceGuess = { S0: 'deny', S1: 'hedge', S2: 'partial', S3: 'blame', S4: 'emotional', S5: 'confess' }[v3Lie.currentState] ?? 'deny'
      v3State.applyQuestionEffect(action.questionType, action.target, action.disputeId, stanceGuess, emotionTier)
    }

    // 이벤트 트리거 평가
    const prevState = _lieStateBeforeTransition[`${action.target}:${action.disputeId}`] ?? 'S0'
    const newState = v3Lie?.currentState ?? prevState
    const transitions = prevState !== newState
      ? [{ party: action.target, disputeId: action.disputeId, from: prevState, to: newState }]
      : []
    v3State.evaluateTurnEvents(action.questionType, action.disputeId, transitions)

    // lieState 전이 시각 피드백
    if (prevState !== newState) {
      const pName = action.target === 'a' ? v3State.caseData?.duo.partyA.name : v3State.caseData?.duo.partyB.name
      emitStateTransitionEvent(action.target, action.disputeId, prevState, newState, v3State.turnCount, pName ?? '')
    }
  }

  useGameStore.getState().incrementTurn()
  } finally { questionLock = false }
}
