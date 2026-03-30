/**
 * LLM 기반 대화 해석기.
 * Phase 3~5 심문에서 재판관 질문 + NPC 응답을 한 번에 생성한다.
 * 연결 실패 시 기존 대사 트리 폴백.
 *
 * 프롬프트는 웹 어드민(promptManager)에서 관리한다.
 */
import { chatCompletion } from './llmClient'
import { getPrompt, getPromptConfig } from '../api/promptManager'
import { buildAgentPrompt, getAgentConfig, isAgentLoaded, getContextFlags } from '../api/agentManager'
import { getMyCall, getJudgeReference, getAngryCall, getRelationLabel, canUseInformal } from './llmSpeechGuide'
import { resolveDialogue as fallbackResolve, type ResolvedDialogue } from './dialogueResolver'
import type { PlayerAction, PartyId, DialogueNode, AgentState } from '../types'
import { GamePhase } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'
import type { CaseData } from '../types'
import { useGameStore } from '../store/useGameStore'
import { TRUTH_POLICIES, getFallbackPolicy, type LieStateKey } from '../data/truthPolicy'
import { normalizeCaseKey, getRelationshipType } from '../utils/caseHelpers'
import { getPersonalityTags, getActionAffinityForDispute, getNarrativeExpansion } from '../data/caseEnrichment'

export async function resolveLLMDialogue(
  action: PlayerAction,
  agentA: AgentState,
  agentB: AgentState,
  evidenceStates: Record<string, EvidenceRuntimeState>,
  caseData: CaseData,
): Promise<ResolvedDialogue | null> {
  if (action.type !== 'question' && action.type !== 'evidence_present' && action.type !== 'evidence_investigate' && action.type !== 'trust_action' && action.type !== 'mediation') {
    return null
  }

  const store = useGameStore.getState()
  try {
  const target: PartyId = 'target' in action ? action.target : 'a'
  const agent = target === 'a' ? agentA : agentB
  const profile = target === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const opponent = target === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  let disputeId = 'disputeId' in action ? (action as { disputeId?: string }).disputeId : undefined

  // evidence_present / evidence_investigate: 증거에서 쟁점 + 증거 정보 추출
  let evidenceForPrompt: CaseData['evidence'][number] | undefined
  if (action.type === 'evidence_present' || action.type === 'evidence_investigate') {
    evidenceForPrompt = caseData.evidence.find(e => e.id === action.evidenceId)
    if (!disputeId && evidenceForPrompt?.proves.length) {
      disputeId = evidenceForPrompt.proves[0]
    }
  }

  // trust_action: disputeId가 없으면 가장 최근 심문한 쟁점을 자동 추론
  if (!disputeId && action.type === 'trust_action') {
    const recentJudgeEntries = store.dialogueLog
      .filter(d => d.speaker === 'judge' && d.relatedDisputes.length > 0)
    if (recentJudgeEntries.length > 0) {
      disputeId = recentJudgeEntries[recentJudgeEntries.length - 1].relatedDisputes[0]
    }
  }

  const dispute = disputeId ? caseData.disputes.find((d) => d.id === disputeId) : undefined
  const lieEntry = disputeId ? agent.lieStateMap[disputeId] : undefined

  // ── 컨텍스트 필터링 강화 ──
  // 최근 대화: 현재 쟁점 관련 + 최근 것만 (불필요한 다른 쟁점 대화 제외)
  const allRecent = store.dialogueLog.slice(-12)
  const recentDialogues = disputeId
    ? allRecent.filter(d =>
        d.relatedDisputes.length === 0 ||  // 시스템 일반 대화 (쟁점 무관)
        d.relatedDisputes.includes(disputeId!),  // 현재 쟁점 관련만
      ).slice(-8)
    : allRecent.slice(-8)

  // 제시된 증거: 이 대상(target)에게 제시된 것 + 현재 쟁점 관련만 필터
  const presentedEvidence = caseData.evidence.filter(e => {
    const state = evidenceStates[e.id]
    if (!state?.presented || !state.presentedTo.includes(target)) return false
    // 쟁점 필터: 현재 쟁점과 관련된 증거만 (disputeId 없으면 전체)
    if (!disputeId) return true
    return e.proves.includes(disputeId)
  })

  // ── 새 변수 생성: actionContract ──
  const actionContract = buildActionContract(action, lieEntry, store, caseData, target, disputeId)

  // ── 새 변수 생성: trustInfo (v3: JSON 형식) ──
  const trustInfo = JSON.stringify({
    trustTowardJudge: agent.trustState.trustTowardJudge,
    fearOfExposure: agent.trustState.fearOfExposure,
    retaliationWorry: agent.trustState.retaliationWorry,
  })

  // ── 새 변수 생성: skillOverlay ──
  const skillOverlay = buildSkillOverlay(store, target)

  // ── 새 변수 생성: evidenceAxis (v3: JSON 형식) ──
  const evidenceAxis = evidenceForPrompt ? buildEvidenceAxis(evidenceForPrompt) : ''

  // ── 새 변수 생성: investigationResult (#6 — 사건 JSON에서 추출) ──
  const investigationResult = buildInvestigationResult(evidenceForPrompt, evidenceStates)

  // ── focusedDisputeId ──
  const focusedDisputeId = disputeId ?? ''

  // ── 에이전트 라우팅: 액션 유형에 따라 적절한 에이전트 선택 ──
  const agentKey = resolveAgentKey(action, store, target)

  // ── 재판관 질문: 폴백용 템플릿 (LLM이 생성 못 하면 사용) ──
  const fallbackJudgeQuestion = buildJudgeQuestion(action, caseData, target, dispute)

  const systemPrompt = buildSystemPrompt(profile, opponent, agent, lieEntry, dispute, caseData, target, recentDialogues, presentedEvidence, store.currentPhase, actionContract, trustInfo, skillOverlay, evidenceAxis, focusedDisputeId, agentKey, investigationResult)
  const contractResponseMode = (() => { try { return (JSON.parse(actionContract) as { responseMode?: string }).responseMode ?? 'answer_only' } catch { return 'answer_only' } })()
  const userPrompt = buildUserPrompt(action, dispute, evidenceForPrompt, focusedDisputeId, fallbackJudgeQuestion, investigationResult, contractResponseMode, target, caseData)

  const config = isAgentLoaded() ? getAgentConfig(agentKey) : getPromptConfig('interrogation_system')

  try {
    const response = await chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      { temperature: config.temperature, maxTokens: config.maxTokens },
    )

    if (!response.trim()) throw new Error('Empty response')

    const parsed = parseLLMResponse(response, target, disputeId)

    // NPC 응답이 너무 짧으면 폴백으로 전환
    if (!parsed.npcNode.text || parsed.npcNode.text.length < 5) {
      throw new Error('NPC response too short or empty')
    }

    // ── 금지 정보 누출 검증 (#2) ──
    const contract = JSON.parse(actionContract) as { forbiddenTruthIds?: string[] }
    const forbidden = contract.forbiddenTruthIds ?? []
    const leaked = parsed.mentionedTruthIds.filter(id => forbidden.includes(id))
    if (leaked.length > 0) {
      console.warn(`[TruthGuard] 금지 정보 누출 감지: ${leaked.join(', ')}`)
      parsed.mentionedTruthIds = parsed.mentionedTruthIds.filter(id => !forbidden.includes(id))

      // 텍스트 레벨 검증: forbidden truth의 핵심 키워드가 본문에 있는지
      const forbiddenFacts = caseData.truthTable
        .map((t, i) => ({ id: `t-${i + 1}`, fact: t.fact }))
        .filter(t => forbidden.includes(t.id))
      const npcText = parsed.npcNode.text + ' ' + (parsed.requestedFollowup ?? '')
      const textLeaks = forbiddenFacts.filter(f => {
        // 핵심 키워드 추출 (3글자 이상 단어)
        const keywords = f.fact.split(/[\s,·.]+/).filter(w => w.length >= 3)
        // 키워드 중 2개 이상 매칭되면 텍스트 누출로 판단
        const matches = keywords.filter(kw => npcText.includes(kw))
        return matches.length >= 2
      })

      if (textLeaks.length > 0) {
        console.warn(`[TruthGuard] 텍스트 레벨 누출 감지: ${textLeaks.map(t => t.id).join(', ')} — 폴백 전환`)
        // 텍스트 누출 시 폴백 대사로 교체
        parsed.npcNode.text = '재판관님, 그 부분은 제가 말씀드리기 어렵습니다.'
        parsed.npcNode.behaviorHint = '입을 다물고 시선을 내린다.'
        parsed.stance = 'hedge'
        parsed.requestedFollowup = ''
      }
    }

    // 재판관 질문: AI 생성 우선, 없으면 폴백 템플릿
    const finalJudgeQuestion = parsed.judgeQuestion || fallbackJudgeQuestion
    if (finalJudgeQuestion) {
      store.addDialogue({
        speaker: 'judge',
        text: finalJudgeQuestion,
        relatedDisputes: disputeId ? [disputeId] : [],
        turn: store.turnCount,
      })
    }

    // responseMode는 엔진이 강제 (LLM 출력 무시)
    const contractObj2 = JSON.parse(actionContract) as { responseMode?: string; answerStyle?: string }
    return {
      node: parsed.npcNode, target,
      stance: parsed.stance,
      responseMode: contractObj2.responseMode ?? parsed.responseMode,  // 엔진 값 우선
      answerStyle: contractObj2.answerStyle ?? 'factual',
      mentionedTruthIds: parsed.mentionedTruthIds,
      requestedFollowup: parsed.requestedFollowup,
    }
  } catch (error) {
    console.warn('LLM 호출 실패, 폴백:', error)
    return fallbackResolve(action, agentA, agentB, evidenceStates)
  }
  } catch (outerError) {
    console.error('[resolveLLMDialogue] 프롬프트 조립 또는 처리 중 에러:', outerError)
    return fallbackResolve(action, agentA, agentB, evidenceStates)
  }
}

/* ── 시스템 프롬프트 (어드민 템플릿 + 동적 데이터) ── */

function buildSystemPrompt(
  me: CaseData['duo']['partyA'],
  opponent: CaseData['duo']['partyA'],
  agent: AgentState,
  lieEntry: AgentState['lieStateMap'][string] | undefined,
  dispute: CaseData['disputes'][number] | undefined,
  caseData: CaseData,
  party: PartyId,
  recentDialogues: { speaker: string; text: string }[],
  presentedEvidence: CaseData['evidence'],
  currentPhase: GamePhase,
  actionContract: string,
  trustInfo: string,
  skillOverlay: string,
  evidenceAxis: string,
  focusedDisputeId: string,
  agentKey: string,
  investigationResult: string,
): string {
  const myCall = getMyCall(caseData.duo, party)
  const judgeRef = getJudgeReference(caseData.duo, party)
  const angryCall = getAngryCall(caseData.duo, party)
  const canInformalThis = canUseInformal(caseData, party)
  const callForm = myCall === '자기' ? '자기야' : myCall

  // ── 동적 데이터 블록 조립 ──

  // 말투 형식 가이드 (v6: subtype 기반)
  const formalityGuide = canInformalThis
    ? `- 상대에게: 반말 (~야, ~잖아, ~거야)`
    : `- 상대에게: 존댓말 (~요, ~습니다). 감정 격해지면 반말 전환 가능.`

  // Phase 깊이 가이드 (어드민에서 관리)
  const phaseGuide = getPhaseGuide(currentPhase)

  // 내가 아는 사실 — allowedTruthIds 기반으로만 제공 (truth 누출 방지)
  // 현재 actionContract에서 allowed된 truth만 NPC에게 보여줌
  const contractObj = JSON.parse(actionContract) as { allowedTruthIds?: string[] }
  const allowedIds = contractObj.allowedTruthIds ?? []
  const myQuadrant = party === 'a' ? 'a_only' : 'b_only'

  let knownFacts = ''
  if (allowedIds.length > 0) {
    const allowedFacts = caseData.truthTable
      .map((t, i) => ({ ...t, id: `t-${i + 1}` }))
      .filter(t => allowedIds.includes(t.id))
      .filter(t => t.quadrant === 'both_know' || t.quadrant === myQuadrant)
      .slice(0, 3)
    if (allowedFacts.length > 0) {
      knownFacts = `\n당신이 이번 답변에서 참고할 수 있는 사실:`
      for (const f of allowedFacts) {
        knownFacts += `\n- ${f.fact}`
      }
    }
  } else {
    // allowedTruthIds가 비어있으면 (S0~S1) → 사실을 아예 안 줌
    // NPC는 자기가 아는 범위에서만 답변 (truthDescription 없이)
  }

  // 쟁점 + 거짓말 상태
  let disputeInfo = ''
  if (lieEntry && dispute) {
    const stateInstructions: Record<string, string> = {
      S0: '이 쟁점을 완전히 부정하세요. 자신감 있게.',
      S1: '약간 흔들리고 있습니다. 배경을 설명하되 핵심은 부정하세요.',
      S2: '일부를 인정합니다. "맞지만 이유가 다르다"고 하세요.',
      S3: '상대 탓으로 돌리세요. "내가 그런 건 상대 때문"이라고.',
      S4: '감정적으로 호소하세요. 논리보다 감정으로.',
      S5: '인정합니다. 사실을 인정하되 자기 입장에서 재해석하세요.',
    }
    const motiveHints: Record<string, string> = {
      self_protection: '자기를 보호하려는 마음',
      face_saving: '체면을 지키려는 마음',
      shame_avoidance: '수치심을 피하려는 마음 — 공감 질문에 약함',
      relationship_maintenance: '관계를 지키려는 마음 — 비공개 보장에 약함',
      revenge: '복수심 — 압박에 오히려 공격적',
      third_party_protection: '누군가를 보호하려는 마음',
      career_preservation: '직장/평판을 지키려는 마음',
    }

    // truthDescription을 그대로 주면 LLM이 정답을 보고 시작 → 누출 위험
    // lie state에 맞는 중립 요약만 제공
    const neutralDesc = lieEntry.currentState <= 'S2'
      ? `상대가 "${dispute.name}"에 대해 문제를 제기하고 있다.`  // S0~S2: 쟁점명만, 진실 내용 숨김
      : lieEntry.currentState <= 'S4'
        ? `"${dispute.name}"에 대해 일부 사실이 드러나고 있다.`  // S3~S4: 약간 더 열림
        : dispute.truthDescription  // S5: 전체 공개 (이미 인정한 상태)
    disputeInfo = `\n## 현재 쟁점: "${dispute.name}"\n내용: ${neutralDesc}\n${stateInstructions[lieEntry.currentState] ?? ''}`
    if (!dispute.truth && lieEntry.currentState <= 'S1') {
      disputeInfo += `\n(이 쟁점에서 상대가 주장하는 것은 사실이 아닙니다 — 당신은 진짜로 안 했습니다. 억울하게 부정하세요.)`
    }
    disputeInfo += `\n거짓말 동기: ${motiveHints[lieEntry.lieMotive] ?? ''}`

    // 다른 쟁점 이름을 명시적으로 금지
    const otherDisputes = caseData.disputes.filter(d => d.id !== dispute.id)
    if (otherDisputes.length > 0) {
      disputeInfo += `\n\n⚠️ 중요 — 쟁점 스코핑 규칙:`
      disputeInfo += `\n현재 질문은 "${dispute.name}"에 대한 것입니다. 이 쟁점에만 답하세요.`
      disputeInfo += `\n❌ 절대 언급 금지: ${otherDisputes.map(d => `"${d.name}"`).join(', ')}`
      disputeInfo += `\n이 쟁점과 무관한 사실, 금액, 사건을 꺼내지 마세요.`
    }
  }

  // 감정 + 말버릇
  let emotionInfo = `\n현재 감정: ${agent.emotionalState.behaviorHint || agent.emotionalState.phase}`
  const activeTell = me.verbalTells.find((v) =>
    (v.trigger === 'lying' && lieEntry && lieEntry.currentState <= 'S2') ||
    (v.trigger === 'cornered' && lieEntry && lieEntry.currentState >= 'S3') ||
    (v.trigger === 'emotional' && (agent.emotionalState.phase === 'angry' || agent.emotionalState.phase === 'shaken')),
  )
  if (activeTell) {
    emotionInfo += `\n말버릇 발동: ${activeTell.pattern}`
  }

  // ── 보강 데이터: 성격 태그 + 상성 힌트 + 서사 확장 ──
  let enrichmentInfo = ''
  const caseKey = normalizeCaseKey(caseData)

  // 성격 태그 → NPC 반응 패턴 지시
  const pTags = getPersonalityTags(caseKey)
  const myTags = pTags?.[party]
  if (myTags && myTags.length > 0) {
    const tagDescriptions: Record<string, string> = {
      confrontational: '공격적으로 반격한다', passive_aggressive: '겉으로는 순응하지만 우회적으로 공격한다',
      gaslighting: '상대의 기억이나 판단을 의심하게 만든다', denial_heavy: '강하게 부정하며 버틴다',
      blame_shifting: '책임을 상대에게 돌린다', overly_cooperative: '지나치게 협조적으로 보이려 한다',
      martyr_complex: '자신을 희생자로 연출한다', detail_obsessed: '사소한 디테일에 집착한다',
      emotionally_volatile: '감정 기복이 심하다', calculated_calm: '차분하게 계산적으로 대응한다',
      trust_broken: '신뢰가 깨진 상태로 방어적이다', grudge_holding: '과거 원한을 쉽게 놓지 않는다',
      conflict_avoidant: '갈등을 피하려 한다', authority_challenging: '권위에 도전적이다',
      victim_identity: '자신이 피해자라는 정체성이 강하다', manipulative: '상대를 교묘하게 조종한다',
      shame_sensitive: '수치심에 극도로 민감하다', face_sensitive: '체면을 매우 중시한다',
      fairness_obsessed: '공정함에 집착한다', cold_logical: '감정을 배제하고 논리로만 대응한다',
      selective_quote: '자기에게 유리한 부분만 인용한다', timeline_padding: '시간 순서를 자기 유리하게 조정한다',
      counter_attack: '방어 대신 역공으로 전환한다', avoidant: '질문을 회피하거나 주제를 돌린다',
      relationship_preserving: '관계를 지키려고 양보한다', retaliation_sensitive: '보복을 두려워한다',
      privacy_sensitive: '사생활 노출에 극도로 예민하다',
    }
    const descs = myTags.map(t => tagDescriptions[t] || t).join(', ')
    enrichmentInfo += `\n## 성격 특성\n당신의 대응 패턴: ${descs}\n이 성격 특성이 답변 톤과 전략에 반영되어야 합니다.`
  }

  // 상성 힌트 → NPC가 특정 질문 유형에 저항/취약하도록 유도
  if (dispute) {
    const dAffinity = getActionAffinityForDispute(caseKey, dispute.id)
    if (dAffinity) {
      enrichmentInfo += `\n## 이 쟁점에서의 반응 경향`
      enrichmentInfo += `\n- 가장 위협적인 접근: ${dAffinity.bestActionHint}`
      enrichmentInfo += `\n- 가장 비효과적인 접근에 대한 반응: ${dAffinity.worstActionReaction}`
    }

    // 서사 확장: 해금 조건 충족 시 추가 맥락
    const narr = getNarrativeExpansion(caseKey, dispute.id)
    if (narr && lieEntry && lieEntry.currentState >= 'S4') {
      enrichmentInfo += `\n## 깊은 맥락 (S4+ 해금)\n${narr.deeperReveal}`
    }
  }

  // 제시된 증거
  let evidenceInfo = ''
  if (presentedEvidence.length > 0) {
    evidenceInfo = `\n## 이미 제시된 증거`
    for (const ev of presentedEvidence) {
      evidenceInfo += `\n- ${ev.name}: ${ev.description.slice(0, 60)}`
    }
    evidenceInfo += `\n부정하기 어려운 증거가 있다면 그에 맞게 대응을 바꾸세요.`
  }

  // 최근 대화
  let recentDialogueStr = ''
  if (recentDialogues.length > 0) {
    const speakerNames: Record<string, string> = {
      a: caseData.duo.partyA.name, b: caseData.duo.partyB.name,
      judge: '재판관', system: '시스템', witness: '증인',
    }
    recentDialogueStr = `\n## 최근 대화 (이 맥락을 이어서 답하세요)`
    for (const d of recentDialogues.slice(-5)) {
      recentDialogueStr += `\n${speakerNames[d.speaker] ?? d.speaker}: ${d.text.slice(0, 80)}`
    }
    recentDialogueStr += `\n위 흐름을 끊지 말고 이어가세요. 이전 말과 모순되지 않게.`
  }

  // 심문 이력 컨텍스트
  let historyContext = ''
  try {
    const storeRef = useGameStore.getState()
    const ctx = storeRef.getInterrogationContext(party, dispute?.id ?? '')
    if (ctx.firstTime) {
      historyContext = `\n⚠️ 이 쟁점에 대해 이 사람에게 처음 묻는 질문이다.`
      historyContext += `\n"이미 말씀드렸다" "아까도 말했다" 류의 표현을 절대 쓰지 마세요. 처음 듣는 것처럼 반응하세요.`
      if (ctx.otherPartyAsked) {
        historyContext += `\n(단, 상대방에게는 이미 이 주제가 나왔다. 상대 발언을 들은 상태.)`
      }
      if (ctx.otherPartyRevealed) {
        historyContext += `\n(⚡ 상대방이 이 쟁점에서 비밀을 인정했다. 당신은 그 사실을 알고 있다 — 충격/분노/동요를 보여라.)`
      }
    } else {
      historyContext = `\n이 쟁점에 대해 ${ctx.previousTypes.length}번째 질문이다.`
      historyContext += `\n이전 질문 유형: ${ctx.previousTypes.join(' → ')}`
      historyContext += `\n같은 말을 반복하지 마세요. 이전 답변보다 한 단계 더 깊은 내용을 꺼내세요.`
    }

    // 다른 쟁점에서 이미 밝혀진 사실
    const allHistory = storeRef.interrogationHistory[party] ?? {}
    const revealedDisputes = Object.entries(allHistory)
      .filter(([dId, h]) => h.revealed && dId !== (dispute?.id ?? ''))
      .map(([dId]) => caseData.disputes.find(d => d.id === dId)?.name)
      .filter(Boolean)
    if (revealedDisputes.length > 0) {
      historyContext += `\n\n이미 인정한 다른 쟁점: ${revealedDisputes.join(', ')}`
      historyContext += `\n이미 인정한 것과 모순되는 주장은 하지 마세요. 일관성을 유지하세요.`
    }
  } catch { /* store 접근 실패 시 무시 */ }

  // Phase 1/2 대화 요약 (이전 스테이지에서 양측이 주장한 내용)
  let phaseTranscript = ''
  const ctxFlags = isAgentLoaded() ? getContextFlags(agentKey) : {}
  if (ctxFlags.include_phaseTranscript !== false) {
    try {
      const storeRef = useGameStore.getState()
      const speakerNames: Record<string, string> = {
        a: caseData.duo.partyA.name, b: caseData.duo.partyB.name,
        judge: '재판관', system: '시스템',
      }
      // Phase 1/2 대화만 필터 (turn이 Phase 3 이전인 것들)
      const phase12Dialogues = storeRef.dialogueLog.filter(
        d => d.speaker !== 'system' && d.turn === 0, // Phase 1/2 대사는 turn=0으로 기록됨
      )
      if (phase12Dialogues.length > 0) {
        phaseTranscript = phase12Dialogues
          .slice(0, 12)  // 최대 12개
          .map(d => `${speakerNames[d.speaker] ?? d.speaker}: ${d.text.slice(0, 80)}`)
          .join('\n')
      }
    } catch { /* 접근 실패 시 빈 문자열 */ }
  }

  // 말투 가이드 (짧은 버전)
  const speechGuideShort = canInformalThis
    ? `\n말투 규칙 (최우선 — 위반 시 출력 무효):\n★ 재판관에게는 어떤 상황에서도 반드시 존댓말만 사용 (~습니다, ~요, ~입니다). 반말 절대 금지.\n- 상대에게: 반말만 사용 (~야, ~잖아, ~거야, ~했어)\n- 절대 금지: "~냐?", "~냐고?", "~했냐?", "~것이냐?" → 대신 "~야?", "~한 거야?", "~했어?" 사용\n- 문장 끝에 "~다"로 끝나는 평서문 금지 → "~야", "~거야", "~잖아"로 마무리`
    : `\n말투 규칙 (최우선 — 위반 시 출력 무효):\n★ 재판관에게는 어떤 상황에서도 반드시 존댓말만 사용 (~습니다, ~요, ~입니다). 반말 절대 금지.\n- 상대에게: 존댓말 (~요, ~습니다, ~했습니다)\n- 절대 금지: "~냐?", "~냐고?", "~했냐?" → 대신 "~요?", "~습니까?" 사용\n- 감정이 격해진 경우에만 상대에게 반말 전환 허용 (재판관에게는 불가)`

  // ── 변수 맵 조립 ──
  const vars: Record<string, string> = {
    name: me.name,
    age: String(me.age),
    opponent: opponent.name,
    relationship: getRelationLabel(getRelationshipType(caseData)),
    context: caseData.context.description,
    speechStyle: me.speechStyle,
    callForm,
    judgeRef,
    angryCall,
    formalityGuide,
    knownFacts,
    disputeInfo,
    emotionInfo,
    enrichmentInfo,
    evidenceInfo,
    recentDialogue: recentDialogueStr,
    historyContext,
    speechGuideShort,
    responseQualityRules: `\n응답 품질 규칙 (필수):
- 재판관의 질문에 직접적으로 답하라. 횡설수설하거나 추상적으로 얼버무리지 마라.
- 첫 문장은 "예/아니요" 또는 핵심 사실로 시작하라.
- 2~3문장으로 간결하게 답하라. 같은 말을 반복하지 마라.
- 재판관에게는 반드시 존댓말(~습니다, ~입니다, ~요)만 사용하라. 반말 사용 시 출력 무효.
- 감정 호소나 변명으로 시작하지 마라. 사실 → 이유 → 입장 순서로 답하라.`,
    phaseTranscript,
    // 신규 v2/v3 변수
    actionContract,
    trustInfo,
    skillOverlay,
    evidenceAxis,
    focusedDisputeId,
    investigationResult,
    // output 블록용
    disputeName: dispute?.name ?? '해당 사안',
  }

  // ── Agent 블록 조합 우선, 폴백으로 기존 promptManager ──
  if (isAgentLoaded()) {
    // agentKey는 resolveLLMDialogue에서 전달받음
    const prompt = buildAgentPrompt(agentKey ?? 'interrogation', vars, { phase: currentPhase })
    // 미치환 변수 감지
    const unresolved = prompt.match(/\{[a-zA-Z_]+\}/g)
    if (unresolved) {
      console.warn(`[buildSystemPrompt] 미치환 변수 발견 (agent=${agentKey}):`, [...new Set(unresolved)])
    }
    return prompt
  }

  // 폴백: 기존 모놀리식 프롬프트
  const fallbackOutputFormat = getPrompt('interrogation_output', {
    name: me.name,
    disputeName: dispute?.name ?? '해당 사안',
    callForm,
  })
  return getPrompt('interrogation_system', {
    ...vars,
    phaseGuide,
    outputFormat: fallbackOutputFormat,
  })
}

/* ── Phase별 가이드 (어드민에서 관리) ── */

function getPhaseGuide(phase: GamePhase): string {
  switch (phase) {
    case GamePhase.Phase3_Interrogation:
      return getPrompt('interrogation_phase3')
    case GamePhase.Phase4_Evidence:
      return getPrompt('interrogation_phase4')
    case GamePhase.Phase5_ReExamination:
      return getPrompt('interrogation_phase5')
    default:
      return ''
  }
}

/* ── 유저 프롬프트 ───────────────────────── */

function buildUserPrompt(
  action: PlayerAction,
  dispute: CaseData['disputes'][number] | undefined,
  evidence: CaseData['evidence'][number] | undefined,
  focusedDisputeId: string,
  judgeQuestion: string,
  investigationResult: string,
  responseMode: string,
  target?: PartyId,
  caseData?: CaseData,
): string {
  const disputeName = dispute?.name ?? '해당 사안'

  // responseMode에 따라 발화 대상을 명시
  const isJudgeOnly = responseMode === 'answer_only' || responseMode === 'private_confession' || responseMode === 'yes_no_first'
  const addressRule = isJudgeOnly
    ? `★ 발화 대상: 재판관. 상대방에게 말하는 것이 아니다.\n★ "자기야", "여보", "오빠" 등 상대 호칭으로 시작 금지. "재판관님"으로 시작하거나 호칭 없이 바로 답하라.\n★ 존댓말(~습니다, ~요)만 사용.\n`
    : `★ 발화 대상: 재판관에게 답한 뒤, 필요 시 상대에게 짧게 1문장만 덧붙일 수 있다.\n★ 재판관에게는 반드시 존댓말(~습니다, ~요). 상대에게는 관계에 맞는 말투.\n`

  const judgeGenRule = `\n★ judgeQuestion 필드: 재판관이 NPC에게 하는 질문을 자연스러운 한국어로 직접 작성하라.\n- "${disputeName}" 쟁점에 대해 질문 유형에 맞는 자연스러운 질문을 만든다.\n- 쟁점명을 그대로 인용하지 말고, 맥락에 맞게 풀어서 질문한다.\n- 재판관 어투: 격식체, 간결, 권위 있는 톤 (예: "~주십시오", "~입니까")\n`

  // ── 심문 (fact_pursuit / motive_search / empathy_approach) ──
  if (action.type === 'question') {
    const questionGuides: Record<string, string> = {
      fact_pursuit: `질문 유형: fact_pursuit (사실 추궁)\n- judgeQuestion은 날짜, 금액, 행위 여부를 구체적으로 묻는 질문이어야 한다.\n- 예: "한지석 씨, 9월 20일 280만원을 송금하신 사실이 있습니까?"`,
      motive_search: `질문 유형: motive_search (동기 탐색)\n- judgeQuestion은 왜 그런 선택을 했는지, 무엇을 숨기려 했는지 묻는 질문이어야 한다.\n- 예: "한지석 씨, 아내에게 알리지 않은 이유가 무엇입니까?"`,
      empathy_approach: `질문 유형: empathy_approach (공감 접근)\n- judgeQuestion은 당시 상황이나 심정을 편하게 말할 수 있도록 유도하는 질문이어야 한다.\n- 예: "한지석 씨, 당시 어떤 어려움이 있으셨는지 말씀해 주시겠습니까?"`,
    }
    const guide = questionGuides[action.questionType] ?? ''
    return `${addressRule}${judgeGenRule}${guide}\nfocusedDisputeId: ${focusedDisputeId}\nfocusedDisputeName: ${disputeName}\n\n규칙:\n- judgeQuestion 필드에 재판관 질문을 자연스럽게 작성한다.\n- npcResponse에는 그 질문에 답한다.\n- 다른 쟁점이나 다른 증거를 새로 끌어오지 않는다.\n- 출력은 JSON 객체 하나만 한다.`
  }

  // ── 증거 제시 ──
  if (action.type === 'evidence_present') {
    // 타깃별 맥락: 행위 당사자인지, 증거 제출/관찰 측인지 구분
    let targetContext = ''
    if (target && caseData && evidence) {
      const relatedDispute = evidence.proves[0] ? caseData.disputes.find(d => d.id === evidence.proves[0]) : undefined
      const quadrant = (relatedDispute as any)?.quadrant as string | undefined
      const myName = target === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
      const opName = target === 'a' ? caseData.duo.partyB.name : caseData.duo.partyA.name
      const isActor = (quadrant === 'a_only' && target === 'a') || (quadrant === 'b_only' && target === 'b')
      const isOther = (quadrant === 'a_only' && target === 'b') || (quadrant === 'b_only' && target === 'a')

      if (isActor) {
        targetContext = `\n★ 당신(${myName})은 이 증거가 지적하는 행위의 당사자다. 증거 내용에 대해 해명하거나 변명해야 한다.\n`
      } else if (isOther) {
        targetContext = `\n★ 당신(${myName})은 이 증거의 행위 당사자가 아니다. ${opName}의 행위에 대한 증거이므로, 당신은 이 증거를 어떻게 확보했는지, 이 증거에 대해 어떻게 생각하는지, 이 증거의 맥락을 설명해야 한다. ${opName}인 것처럼 변명하지 마라.\n`
      }
    }
    return `${addressRule}${targetContext}현재 액션은 evidence_present다.\nfocusedDisputeId: ${focusedDisputeId}\n재판관이 "${evidence?.name ?? '증거'}" 증거를 제시했다.\n증거 설명: ${evidence?.description ?? ''}\n재판관 질문: "${judgeQuestion}"\n\n규칙:\n- 첫 문장은 반드시 현재 증거에 대한 직접 반응이다.\n- 이 증거와 무관한 다른 쟁점을 새로 꺼내지 않는다.\n- judgeQuestion 필드에 재판관 질문을 자연스럽게 작성한다.\n- 출력은 JSON 객체 하나만 한다.`
  }

  // ── 증거 조사 6종 ──
  if (action.type === 'evidence_investigate') {
    const subActionLabels: Record<string, string> = {
      request_original: '원본 확보 결과를 제시했다',
      check_metadata: '메타데이터 확인 결과를 제시했다',
      restore_context: '앞뒤 맥락 복원 결과를 제시했다',
      verify_source: '출처 검증 결과를 제시했다',
      check_edits: '편집 여부 확인 결과를 제시했다',
      question_acquisition: '취득 경위 확인 결과를 제시했다',
    }
    const subActionRules: Record<string, string> = {
      request_original: '원본 확보 결과에 직접 반응한다.',
      check_metadata: '시간, 기기, 수정 이력 등 공개된 조사 결과에만 반응한다.',
      restore_context: '잘린 맥락, 전후 문장, 상황 설명에 직접 반응한다.',
      verify_source: '출처의 신빙성과 전달 경로에 직접 반응한다.',
      check_edits: '편집 흔적 유무에 직접 반응한다.',
      question_acquisition: '취득 정당성과 절차 문제에 직접 반응한다.',
    }
    const label = subActionLabels[action.subAction] ?? '조사 결과를 제시했다'
    const rule = subActionRules[action.subAction] ?? '조사 결과에 직접 반응한다.'
    return `현재 액션은 evidence_investigate.${action.subAction}이다.\nfocusedDisputeId: ${focusedDisputeId}\n재판관이 현재 증거의 ${label}\n조사 결과: ${investigationResult}\n재판관 질문: "${judgeQuestion}"\n\n규칙:\n- ${rule}\n- 출력은 JSON 객체 하나만 한다.`
  }

  // ── 신뢰 액션 (비공개 보호 / 분리심문 등) ──
  if (action.type === 'trust_action') {
    const templates: Record<string, string> = {
      confidential_protection: `현재 액션은 confidential_protection이다.\nfocusedDisputeId: ${focusedDisputeId}\n재판관 질문: "${judgeQuestion}"\n\n상황:\n- 이 답변은 상대에게 즉시 공개되지 않는다.\n- 지금은 재판관에게만 조심스럽게 말할 수 있다.\n\n규칙:\n- private_confession 톤을 우선한다.\n- 출력은 JSON 객체 하나만 한다.`,
      separation: `현재 액션은 separation이다.\nfocusedDisputeId: ${focusedDisputeId}\n재판관 질문: "${judgeQuestion}"\n\n상황:\n- 상대의 개입이 차단된 상태다.\n- 상대를 의식한 공격적 연기를 줄이고 재판관에게만 답한다.\n\n규칙:\n- answer_only 또는 private_confession 톤을 우선한다.\n- 출력은 JSON 객체 하나만 한다.`,
      emotional_stabilization: `현재 액션은 emotional_stabilization이다.\nfocusedDisputeId: ${focusedDisputeId}\n재판관 질문: "${judgeQuestion}"\n\n상황:\n- 재판관이 감정을 가라앉히고 다시 설명할 기회를 줬다.\n\n규칙:\n- 흥분을 조금 가라앉히고, 현재 쟁점에 다시 집중해 답한다.\n- 출력은 JSON 객체 하나만 한다.`,
      retaliation_check: `현재 액션은 retaliation_check다.\nfocusedDisputeId: ${focusedDisputeId}\n재판관 질문: "${judgeQuestion}"\n\n상황:\n- 재판관이 상대의 보복이나 반응을 걱정하는지 확인하고 있다.\n\n규칙:\n- 상대 반응에 대한 두려움, 부담, 망설임을 중심으로 답한다.\n- 출력은 JSON 객체 하나만 한다.`,
    }
    return templates[action.actionType] ?? `재판관이 조치를 취했다.\nfocusedDisputeId: ${focusedDisputeId}\n출력은 JSON 객체 하나만 한다.`
  }

  // ── 중재안 ──
  if (action.type === 'mediation') {
    return `현재 단계는 phase6 중재안이다.\nfocusedDisputeId: ${focusedDisputeId}\n\n재판관 질문: "${judgeQuestion}"\n\n규칙:\n- accept, reject, conditional_accept, counterproposal 중 하나로 반응한다.\n- 이미 드러난 사실과 감정, 손해를 바탕으로만 반응한다.\n- 새 비밀을 갑자기 고백하지 않는다.\n- 출력은 JSON 객체 하나만 한다.`
  }

  return `focusedDisputeId: ${focusedDisputeId}\n재판관 질문: "${judgeQuestion}"\n출력은 JSON 객체 하나만 한다.`
}

/* ── 응답 파싱 (v3: stance/mentionedTruthIds/requestedFollowup) ── */

type NpcStance = 'deny' | 'hedge' | 'partial_admit' | 'admit' | 'reframe'

interface ParsedLLMResponse {
  npcNode: DialogueNode
  stance: NpcStance
  mentionedTruthIds: string[]
  responseMode: string
  requestedFollowup: string
  judgeQuestion: string
}

const VALID_STANCES: NpcStance[] = ['deny', 'hedge', 'partial_admit', 'admit', 'reframe']

function parseLLMResponse(response: string, speaker: PartyId, disputeId?: string): ParsedLLMResponse {
  const fallback: ParsedLLMResponse = {
    npcNode: {
      id: `llm-${Date.now()}`,
      conditions: disputeId ? { disputeId } : {},
      speaker,
      text: response.replace(/[（(][^)）]+[)）]/g, '').trim().slice(0, 300) || '...',
      behaviorHint: response.match(/[（(]([^)）]+)[)）]/)?.[1],
      effects: {},
    },
    stance: 'hedge',
    mentionedTruthIds: [],
    responseMode: 'answer_then_counter',
    requestedFollowup: '',
    judgeQuestion: '',
  }

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return fallback

    const parsed = JSON.parse(jsonMatch[0])

    // npcResponse 파싱 (괄호 행동묘사 분리)
    const rawText = parsed.npcResponse ?? ''
    const behaviorFromText = rawText.match(/[（(]([^)）]+)[)）]/)?.[1]
    const text = rawText.replace(/[（(][^)）]+[)）]/g, '').trim()

    if (!text || text.length < 3) return fallback

    // 후처리: 재판관에게 반말 → 존댓말 강제 변환 + 호칭 오용 수정
    const polished = enforceHonorifics(fixMisdirectedAddress(text))

    return {
      npcNode: {
        id: `llm-${Date.now()}`,
        conditions: disputeId ? { disputeId } : {},
        speaker,
        text: polished,
        behaviorHint: parsed.behaviorHint || behaviorFromText,
        effects: {},
      },
      stance: VALID_STANCES.includes(parsed.stance) ? parsed.stance : 'hedge',
      mentionedTruthIds: Array.isArray(parsed.mentionedTruthIds) ? parsed.mentionedTruthIds : [],
      responseMode: parsed.responseMode ?? 'answer_then_counter',
      requestedFollowup: parsed.requestedFollowup ?? '',
      judgeQuestion: parsed.judgeQuestion ?? '',
    }
  } catch {
    return fallback
  }
}

/**
 * 재판관에게 답하면서 상대 호칭으로 시작하는 오류 수정.
 * @public — llmFreeQuestion.ts에서도 사용
 * "자기야, ~" → "재판관님, ~" 등
 */
export function fixMisdirectedAddress(text: string): string {
  // 상대방 호칭으로 문장이 시작하는 패턴을 재판관님으로 교체
  const partnerAddresses = [
    '자기야,', '자기야 ', '자기,', '자기 ',
    '여보,', '여보 ',
    '오빠,', '오빠 ', '언니,', '언니 ',
    '형,', '형 ', '누나,', '누나 ',
  ]
  let result = text
  for (const addr of partnerAddresses) {
    if (result.startsWith(addr)) {
      result = '재판관님, ' + result.slice(addr.length).trimStart()
      break
    }
    // 문장 중간에서도 "자기야," 등을 제거
    result = result.replace(new RegExp(`\\. ${addr.replace(',', ',')}`, 'g'), '. 재판관님, ')
  }
  return result
}

/**
 * 반말 문장 끝을 존댓말로 강제 변환.
 * 재판관에게 답하는 NPC 대사에서 반말이 섞이는 문제를 후처리로 해결.
 */
export function enforceHonorifics(text: string): string {
  // 문장 단위로 분리 (마침표, 물음표, 느낌표 기준)
  return text.replace(/([^.?!…]+[.?!…]?)/g, (sentence) => {
    const trimmed = sentence.trimEnd()
    if (!trimmed) return sentence

    // 이미 존댓말이면 스킵
    if (/(?:습니다|입니다|습니까|세요|에요|해요|인가요|나요|던가요|을까요|겠습니다|드립니다|합니다|됩니다|봅니다|싶습니다|같습니다|있습니다|없습니다|았습니다|었습니다|겠어요|줄게요|할게요)[.?!…]*$/.test(trimmed)) {
      return sentence
    }

    // 반말 패턴 → 존댓말 변환 (문장 끝 기준)
    const replacements: [RegExp, string][] = [
      // 평서문 — ~어/~아 종결
      [/던 거야([.…]*)$/, '던 겁니다$1'],
      [/은 거야([.…]*)$/, '은 겁니다$1'],
      [/인 거야([.…]*)$/, '인 겁니다$1'],
      [/거야([.…]*)$/, '겁니다$1'],
      [/아니야([.…]*)$/, '아닙니다$1'],
      [/했어([.…]*)$/, '했습니다$1'],
      [/없어([.…]*)$/, '없습니다$1'],
      [/있어([.…]*)$/, '있습니다$1'],
      [/같아([.…]*)$/, '같습니다$1'],
      [/몰라([.…]*)$/, '모릅니다$1'],
      [/그래([.…]*)$/, '그렇습니다$1'],
      [/맞아([.…]*)$/, '맞습니다$1'],
      [/싶어([.…]*)$/, '싶습니다$1'],
      [/됐어([.…]*)$/, '됐습니다$1'],
      [/봤어([.…]*)$/, '봤습니다$1'],
      [/알아([.…]*)$/, '압니다$1'],
      [/몰랐어([.…]*)$/, '몰랐습니다$1'],
      [/났어([.…]*)$/, '났습니다$1'],
      [/왔어([.…]*)$/, '왔습니다$1'],
      [/갔어([.…]*)$/, '갔습니다$1'],
      [/줬어([.…]*)$/, '줬습니다$1'],
      [/뒀어([.…]*)$/, '뒀습니다$1'],
      [/썼어([.…]*)$/, '썼습니다$1'],
      [/넣었어([.…]*)$/, '넣었습니다$1'],
      [/보냈어([.…]*)$/, '보냈습니다$1'],
      [/받았어([.…]*)$/, '받았습니다$1'],
      [/냈어([.…]*)$/, '냈습니다$1'],
      // 평서문 — ~지/~든/~데 종결
      [/했지([.…]*)$/, '했죠$1'],
      [/거든([.…]*)$/, '거든요$1'],
      [/잖아([.…]*)$/, '잖아요$1'],
      [/인데([.…]*)$/, '인데요$1'],
      [/하지([.…]*)$/, '하죠$1'],
      [/는데([.…]*)$/, '는데요$1'],
      [/한데([.…]*)$/, '한데요$1'],
      [/니까([.…]*)$/, '니까요$1'],
      // 의문문
      [/거야\?$/, '겁니까?'],
      [/했어\?$/, '했습니까?'],
      [/없어\?$/, '없습니까?'],
      [/있어\?$/, '있습니까?'],
      [/맞아\?$/, '맞습니까?'],
      [/뭐야\?$/, '뭡니까?'],
      [/왜야\?$/, '왜입니까?'],
      [/인가\?$/, '인가요?'],
      [/알아\?$/, '압니까?'],
      [/했지\?$/, '했죠?'],
      [/잖아\?$/, '잖아요?'],
      // 감탄/강조
      [/잖아!$/, '잖아요!'],
      [/거야!$/, '겁니다!'],
      [/했어!$/, '했습니다!'],
    ]

    let result = trimmed
    for (const [pattern, replacement] of replacements) {
      if (pattern.test(result)) {
        result = result.replace(pattern, replacement)
        break
      }
    }
    // 원래 후행 공백 복원
    return result + sentence.slice(trimmed.length)
  })
}

/* ── 재판관 질문 생성 (엔진 우선 — 템플릿 기반) ── */

function buildJudgeQuestion(
  action: PlayerAction,
  caseData: CaseData,
  target: PartyId,
  dispute?: CaseData['disputes'][number],
): string {
  const myName = target === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
  const opName = target === 'a' ? caseData.duo.partyB.name : caseData.duo.partyA.name

  // 쟁점명에서 대상 이름 제거
  let topic = dispute?.name ?? '해당 사안'
  const myGiven = myName.slice(1)
  const opGiven = opName.slice(1)
  if (topic.includes(myGiven + '의 ')) topic = topic.replace(myGiven + '의 ', '')
  if (topic.includes(opGiven + '의 ')) topic = topic.replace(opGiven + '의 ', '상대방의 ')

  if (action.type === 'question') {
    const templates: Record<string, string[]> = {
      fact_pursuit: [
        `${myName} 씨, ${topic}에 대해 정확히 어떤 일이 있었는지 날짜와 경위를 말씀해 주십시오.`,
        `${myName} 씨, ${topic} 건에 대해 본인의 행위와 그 시점을 구체적으로 설명해 주시겠습니까.`,
        `${myName} 씨, ${topic}이 사실입니까? 사실관계를 정확히 확인하겠습니다.`,
      ],
      motive_search: [
        `${myName} 씨, ${topic} 건에서 그런 판단을 내린 이유가 무엇입니까?`,
        `${myName} 씨, 왜 그 시점에 ${topic}을 결정하셨는지 설명해 주십시오.`,
        `${myName} 씨, ${topic}의 동기와 배경을 구체적으로 말씀해 주십시오.`,
      ],
      empathy_approach: [
        `${myName} 씨, ${topic} 당시 어떤 상황에 놓여 계셨는지 말씀해 주시겠습니까.`,
        `${myName} 씨, ${topic}에 대해 그런 선택을 하게 된 당시의 심정을 듣고 싶습니다.`,
        `${myName} 씨, ${topic}과 관련해서 당시 어떤 어려움이 있었는지 편하게 말씀해 주십시오.`,
      ],
    }
    const pool = templates[action.questionType] ?? templates.fact_pursuit
    return pool[Math.floor(Math.random() * pool.length)]
  }

  if (action.type === 'evidence_present') {
    const evDef = caseData.evidence.find(e => e.id === action.evidenceId)
    const evName = evDef?.name ?? '이 증거'

    // 증거가 증명하는 쟁점의 quadrant로 타깃별 질문 분기
    const relatedDispute = evDef?.proves[0] ? caseData.disputes.find(d => d.id === evDef.proves[0]) : undefined
    const quadrant = (relatedDispute as any)?.quadrant as string | undefined
    const isTargetTheActor = (quadrant === 'a_only' && target === 'a') || (quadrant === 'b_only' && target === 'b')
    const isTargetTheOther = (quadrant === 'a_only' && target === 'b') || (quadrant === 'b_only' && target === 'a')

    if (isTargetTheActor) {
      // 행위 당사자에게 → 해명/추궁
      const templates = [
        `${myName} 씨, '${evName}'을 제시합니다. 이 내용이 사실입니까? 해명해 주십시오.`,
        `${myName} 씨, '${evName}'에 기록된 내용에 대해 직접 설명해 주시겠습니까.`,
        `${myName} 씨, '${evName}'을 보고 계십니다. 이 사실관계가 맞는지 확인해 주십시오.`,
      ]
      return templates[Math.floor(Math.random() * templates.length)]
    } else if (isTargetTheOther) {
      // 상대방에게 → 취득 경위, 편집 여부, 인지 시점
      const templates = [
        `${myName} 씨, '${evName}'을 어떻게 확보하셨습니까? 취득 경위를 설명해 주십시오.`,
        `${myName} 씨, '${evName}'을 처음 확인한 시점과 경위에 대해 말씀해 주십시오.`,
        `${myName} 씨, '${evName}'이 원본 그대로인지, 편집이나 가공이 있었는지 확인하겠습니다.`,
      ]
      return templates[Math.floor(Math.random() * templates.length)]
    } else {
      // 양쪽 모두 해당 또는 quadrant 정보 없음 → 일반 질문
      const templates = [
        `${myName} 씨, '${evName}'을 제시합니다. 이 자료에 대해 설명해 주십시오.`,
        `${myName} 씨, '${evName}'을 확인하셨습니까? 이 내용에 대해 어떻게 생각하십니까.`,
      ]
      return templates[Math.floor(Math.random() * templates.length)]
    }
  }

  if (action.type === 'evidence_investigate') {
    const subLabels: Record<string, string> = {
      request_original: `${myName} 씨, 이 증거의 원본을 확인했습니다. 이에 대해 하실 말씀이 있습니까?`,
      check_metadata: `${myName} 씨, 이 증거의 생성 시점과 수정 이력을 확인했습니다.`,
      restore_context: `${myName} 씨, 이 증거의 앞뒤 맥락을 복원했습니다. 설명해 주시겠습니까?`,
      verify_source: `${myName} 씨, 이 증거의 출처를 검증했습니다.`,
      check_edits: `${myName} 씨, 이 증거의 편집 여부를 확인했습니다.`,
      question_acquisition: `${myName} 씨, 이 증거가 어떻게 확보되었는지 확인했습니다.`,
    }
    return subLabels[action.subAction] ?? `${myName} 씨, 이 조사 결과에 대해 어떻게 생각하십니까?`
  }

  if (action.type === 'trust_action') {
    const trustTemplates: Record<string, string[]> = {
      confidential_protection: [
        `${myName} 씨, 이 말은 상대에게 즉시 공개되지 않습니다. 편하게 말씀해 주세요.`,
        `${myName} 씨, 지금 하시는 말씀은 비공개입니다. 솔직하게 말씀하셔도 됩니다.`,
      ],
      separation: [
        `${myName} 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. ${topic}에 대해 다시 설명해 주시겠습니까?`,
        `${myName} 씨, 지금은 방해 없이 말씀하실 수 있습니다. 편하게 얘기해 주세요.`,
      ],
      emotional_stabilization: [
        `${myName} 씨, ${topic} 때문에 감정이 올라온 건 이해합니다. 잠시 정리하시고 다시 설명해 주시겠습니까?`,
      ],
      retaliation_check: [
        `${myName} 씨, ${topic}에 관해 지금 말을 아끼는 이유가 있으시다면 말씀해 주십시오.`,
      ],
    }
    const pool = trustTemplates[action.actionType] ?? [`${myName} 씨, 편하게 말씀하셔도 됩니다.`]
    return pool[Math.floor(Math.random() * pool.length)]
  }

  return `${myName} 씨, 한 가지 더 여쭤보겠습니다.`
}

/* ── ActionContract 생성 (v3: JSON 형식) ── */

function buildActionContract(
  action: PlayerAction,
  lieEntry: AgentState['lieStateMap'][string] | undefined,
  store: ReturnType<typeof useGameStore.getState>,
  caseData: CaseData,
  party: PartyId,
  disputeId: string | undefined,
): string {
  const state = lieEntry?.currentState ?? 'S0'
  const stateNum = parseInt(state.slice(1))

  // 액션별 설정
  const goalMap: Record<string, string> = {
    fact_pursuit: '날짜·금액·행위 여부를 고정한다',
    motive_search: '숨긴 이유와 자기정당화 동기를 끌어낸다',
    empathy_approach: '수치심·두려움·관계유지 동기를 낮은 톤으로 끌어낸다',
    evidence_present: '현재 증거에 대한 직접 반응과 해명을 끌어낸다',
    evidence_investigate: '조사 결과에 대한 직접 반응을 끌어낸다',
    confidential_protection: '상대에게 못 하던 말을 재판관에게만 하게 한다',
    separation: '상대 눈치를 덜 보고 현재 쟁점에 집중하게 한다',
    emotional_stabilization: '감정을 가라앉히고 현재 쟁점에 다시 집중하게 한다',
    retaliation_check: '상대 보복에 대한 두려움과 부담을 파악한다',
  }

  // actionType + questionType 결정
  let actionType = action.type
  let questionType: string | undefined
  if (action.type === 'question') questionType = action.questionType
  const goalKey = questionType ?? (action.type === 'trust_action' ? action.actionType : action.type)

  // responseMode 결정 — 환경 상태 (발화 대상 제어)
  let responseMode = 'answer_then_counter'
  if (action.type === 'evidence_present' || action.type === 'evidence_investigate') {
    responseMode = 'evidence_rebuttal'
  } else if (store.separationTarget === party) {
    responseMode = 'answer_only'
  } else if (action.type === 'trust_action') {
    if (action.actionType === 'confidential_protection') responseMode = 'private_confession'
    else if (action.actionType === 'separation') responseMode = 'answer_only'
    else responseMode = 'answer_then_counter'
  } else if (action.type === 'question') {
    // 모든 심문은 answer_only (empathy 포함). 감정 톤은 answerStyle로 분리.
    responseMode = 'answer_only'
  }

  // answerStyle 결정 — 감정 톤 (발화 스타일 제어)
  let answerStyle = 'factual'
  if (questionType === 'fact_pursuit') answerStyle = 'factual'
  else if (questionType === 'motive_search') answerStyle = 'motivational'
  else if (questionType === 'empathy_approach') answerStyle = 'empathic'
  if (responseMode === 'private_confession') answerStyle = 'private'

  // revealBudget
  const factBudget = (questionType === 'fact_pursuit' || actionType === 'evidence_present') ? Math.min(stateNum + 1, 3) : Math.min(stateNum, 2)
  const motiveBudget = questionType === 'motive_search' ? Math.min(stateNum + 1, 3) : Math.min(stateNum, 1)
  const emotionBudget = (questionType === 'empathy_approach' || answerStyle === 'empathic' || answerStyle === 'private') ? Math.min(stateNum + 1, 3) : Math.min(stateNum, 2)

  const contract: Record<string, unknown> = {
    actionType,
    ...(questionType ? { questionType } : {}),
    ...(action.type === 'trust_action' ? { trustActionType: action.actionType } : {}),
    responseMode,
    answerStyle,
    goal: goalMap[goalKey] ?? '현재 쟁점에 답한다',
    revealBudget: { fact: factBudget, motive: motiveBudget, emotion: emotionBudget },
    allowedTruthIds: getTruthIds(caseData, party, disputeId, state, 'allowed'),
    forbiddenTruthIds: getTruthIds(caseData, party, disputeId, state, 'forbidden'),
  }

  return JSON.stringify(contract)
}

/* ── SkillOverlay 생성 (v3 형식) ─────────── */

function buildSkillOverlay(
  store: ReturnType<typeof useGameStore.getState>,
  target: PartyId,
): string {
  const parts: string[] = []

  if (store.separationTarget === target) {
    parts.push('[분리심문 활성]')
    parts.push('- responseMode: answer_only')
    parts.push('- 상대 직접 언급, 도발, 과시적 연기를 줄인다')
    parts.push('- retaliationWorry 감소 상태')
  }

  return parts.join('\n')
}

/* ── EvidenceAxis 생성 (v3: JSON 형식) ───── */

function buildEvidenceAxis(evidence: CaseData['evidence'][number]): string {
  const ev = evidence as CaseData['evidence'][number] & {
    reliability?: string
    completeness?: string
    provenance?: string
    legitimacy?: string
  }
  return JSON.stringify({
    reliability: ev.reliability ?? ev.type ?? 'unknown',
    completeness: ev.completeness ?? 'original',
    provenance: ev.provenance ?? 'direct',
    legitimacy: ev.legitimacy ?? 'lawful',
  })
}

/* ── InvestigationResult 추출 (#6) ───────── */

function buildInvestigationResult(
  evidence: CaseData['evidence'][number] | undefined,
  evidenceStates: Record<string, EvidenceRuntimeState>,
): string {
  if (!evidence) return ''
  const state = evidenceStates[evidence.id]
  if (!state || state.investigatedActions.length === 0) return ''

  // 사건 JSON의 investigationResults에서 수행된 조사 결과만 추출
  // 값이 문자열일 수도 있고, { result: string } 객체일 수도 있음
  const results = (evidence as CaseData['evidence'][number] & { investigationResults?: Record<string, string | { result: string }> }).investigationResults
  if (!results) return ''

  return state.investigatedActions
    .filter(action => results[action] != null)
    .map(action => {
      const val = results[action] as string | { result: string } | undefined
      const text = typeof val === 'string' ? val : (val && typeof val === 'object' && 'result' in val) ? val.result : ''
      return `${action}: ${text}`
    })
    .join('\n')
}

/* ── 에이전트 라우팅 ─────────────────────── */

function resolveAgentKey(
  action: PlayerAction,
  store: ReturnType<typeof useGameStore.getState>,
  target: PartyId,
): string {
  // 중재안 → mediation_reaction
  if (action.type === 'mediation') return 'mediation_reaction'

  // 증거 제시/조사 → evidence_reaction
  if (action.type === 'evidence_present' || action.type === 'evidence_investigate') return 'evidence_reaction'

  // 비공개 보호 또는 분리심문 → interrogation_private
  if (action.type === 'trust_action') return 'interrogation_private'
  if (store.separationTarget === target) return 'interrogation_private'

  // 일반 심문 → interrogation (공개)
  return 'interrogation'
}

/* ── truthIds 조회 (v4 truthPolicy 기반) ── */

function getTruthIds(
  caseData: CaseData,
  party: PartyId,
  disputeId: string | undefined,
  lieState: string,
  field: 'allowed' | 'forbidden',
): string[] {
  if (!disputeId) return []

  const caseKey = normalizeCaseKey(caseData)
  const stateKey = lieState as LieStateKey

  // 1. v4 정책에서 정확한 매핑 찾기 (정규화된 키 사용)
  const policy = TRUTH_POLICIES[caseKey]?.[party]?.[disputeId]?.[stateKey]
  if (policy) return policy[field]

  // 2. 폴백: 일반 규칙 적용
  const allTruthIds = caseData.truthTable.map((_, i) => `t-${i + 1}`)
  const dispute = caseData.disputes.find(d => d.id === disputeId)
  const anchorTruthIds = dispute ? [`t-${parseInt(disputeId.split('-')[1])}`] : []
  const fallback = getFallbackPolicy(allTruthIds, anchorTruthIds, stateKey)
  return fallback[field]
}
