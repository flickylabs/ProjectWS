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
import { getMyCall, getJudgeReference, getAngryCall, getRelationLabel } from './llmSpeechGuide'
import { resolveDialogue as fallbackResolve, type ResolvedDialogue } from './dialogueResolver'
import type { PlayerAction, PartyId, DialogueNode, AgentState } from '../types'
import { GamePhase } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'
import type { CaseData } from '../types'
import { useGameStore } from '../store/useGameStore'

export async function resolveLLMDialogue(
  action: PlayerAction,
  agentA: AgentState,
  agentB: AgentState,
  evidenceStates: Record<string, EvidenceRuntimeState>,
  caseData: CaseData,
): Promise<ResolvedDialogue | null> {
  if (action.type !== 'question' && action.type !== 'evidence_present' && action.type !== 'trust_action') {
    return null
  }

  const target: PartyId = 'target' in action ? action.target : 'a'
  const agent = target === 'a' ? agentA : agentB
  const profile = target === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const opponent = target === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  let disputeId = 'disputeId' in action ? (action as { disputeId?: string }).disputeId : undefined

  // evidence_present: 증거에서 쟁점 + 증거 정보 추출
  let evidenceForPrompt: CaseData['evidence'][number] | undefined
  if (action.type === 'evidence_present') {
    evidenceForPrompt = caseData.evidence.find(e => e.id === action.evidenceId)
    if (!disputeId && evidenceForPrompt?.proves.length) {
      disputeId = evidenceForPrompt.proves[0]
    }
  }

  const dispute = disputeId ? caseData.disputes.find((d) => d.id === disputeId) : undefined
  const lieEntry = disputeId ? agent.lieStateMap[disputeId] : undefined

  const store = useGameStore.getState()
  const recentDialogues = store.dialogueLog.slice(-8)
  const presentedEvidence = caseData.evidence.filter(e => evidenceStates[e.id]?.presented)

  const systemPrompt = buildSystemPrompt(profile, opponent, agent, lieEntry, dispute, caseData, target, recentDialogues, presentedEvidence, store.currentPhase)
  const userPrompt = buildUserPrompt(action, dispute, evidenceForPrompt)

  const config = isAgentLoaded() ? getAgentConfig('interrogation') : getPromptConfig('interrogation_system')

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

    // 재판관 질문이 있으면 추가, 없으면 폴백 템플릿 사용
    const store2 = useGameStore.getState()
    const judgeText = parsed.judgeQuestion?.trim()
    if (judgeText) {
      store2.addDialogue({
        speaker: 'judge',
        text: judgeText,
        relatedDisputes: disputeId ? [disputeId] : [],
        turn: store2.turnCount,
      })
    } else {
      // LLM이 재판관 질문을 생성하지 못한 경우 폴백
      const fallbackQuestion = buildFallbackJudgeQuestion(action, caseData, target, dispute)
      if (fallbackQuestion) {
        store2.addDialogue({
          speaker: 'judge',
          text: fallbackQuestion,
          relatedDisputes: disputeId ? [disputeId] : [],
          turn: store2.turnCount,
        })
      }
    }

    return { node: parsed.npcNode, target }
  } catch (error) {
    console.warn('LLM 호출 실패, 폴백:', error)
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
): string {
  const myCall = getMyCall(caseData.duo, party)
  const judgeRef = getJudgeReference(caseData.duo, party)
  const angryCall = getAngryCall(caseData.duo, party)
  const isInformal = ['spouse', 'family', 'friend'].includes(caseData.duo.relationshipType ?? '')
  const callForm = myCall === '자기' ? '자기야' : myCall

  // ── 동적 데이터 블록 조립 ──

  // 말투 형식 가이드
  const formalityGuide = isInformal
    ? `- 상대에게: 반말 (~야, ~잖아, ~거야)`
    : `- 상대에게: 존댓말 (~요, ~습니다)`

  // Phase 깊이 가이드 (어드민에서 관리)
  const phaseGuide = getPhaseGuide(currentPhase)

  // 내가 아는 사실
  const myQuadrant = party === 'a' ? 'a_only' : 'b_only'
  const myFacts = caseData.truthTable.filter(
    (t) => t.quadrant === 'both_know' || t.quadrant === myQuadrant,
  )
  let knownFacts = ''
  if (myFacts.length > 0) {
    knownFacts = `\n당신이 아는 사실:`
    for (const f of myFacts.slice(0, 4)) {
      knownFacts += `\n- ${f.fact}${f.isTrue ? '' : ' (당신은 사실이라 믿지만 오해일 수 있음)'}`
    }
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

    disputeInfo = `\n## 현재 쟁점: "${dispute.name}"\n내용: ${dispute.truthDescription}\n${stateInstructions[lieEntry.currentState] ?? ''}`
    if (!dispute.truth && lieEntry.currentState <= 'S1') {
      disputeInfo += `\n(이 쟁점은 사실이 아닙니다 — 당신은 진짜로 안 했습니다. 억울하게 부정하세요.)`
    }
    disputeInfo += `\n거짓말 동기: ${motiveHints[lieEntry.lieMotive] ?? ''}`
    disputeInfo += `\n⚠️ 이 쟁점("${dispute.name}")에 대해서만 답하세요. 다른 쟁점 이야기를 꺼내지 마세요.`
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
  const ctxFlags = isAgentLoaded() ? getContextFlags('interrogation') : {}
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
  const speechGuideShort = isInformal
    ? `\n말투: 상대에게 반말, 재판관에게 존댓말. "~냐?" 금지→"~야?" 사용.`
    : `\n말투: 상대에게 존댓말(~씨), 재판관에게 존댓말. 격해지면 반말 가능.`

  // ── 변수 맵 조립 ──
  const vars: Record<string, string> = {
    name: me.name,
    age: String(me.age),
    opponent: opponent.name,
    relationship: getRelationLabel(caseData.duo.relationshipType ?? ''),
    context: caseData.context.description,
    speechStyle: me.speechStyle,
    callForm,
    judgeRef,
    angryCall,
    formalityGuide,
    knownFacts,
    disputeInfo,
    emotionInfo,
    evidenceInfo,
    recentDialogue: recentDialogueStr,
    historyContext,
    speechGuideShort,
    phaseTranscript,
    // output 블록용
    disputeName: dispute?.name ?? '해당 사안',
  }

  // ── Agent 블록 조합 우선, 폴백으로 기존 promptManager ──
  if (isAgentLoaded()) {
    return buildAgentPrompt('interrogation', vars, { phase: currentPhase })
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

function buildUserPrompt(action: PlayerAction, dispute?: CaseData['disputes'][number], evidence?: CaseData['evidence'][number]): string {
  const topic = dispute?.name ?? '해당 사안'
  const detail = dispute?.truthDescription ? `\n쟁점 핵심: ${dispute.truthDescription}` : ''

  if (action.type === 'question') {
    const directions: Record<string, string> = {
      fact_pursuit: `재판관이 "${topic}"에 대해 사실을 추궁합니다.${detail}\n이 쟁점의 사실 여부를 캐묻는 질문을 만들고, 이 쟁점에 대해서만 답하세요.`,
      motive_search: `재판관이 "${topic}"에 대해 동기를 탐색합니다.${detail}\n"왜 그랬는지" 파고드는 질문. 이 쟁점의 동기만 다루세요.`,
      empathy_approach: `재판관이 "${topic}"에 대해 공감으로 다가갑니다.${detail}\n부드럽게 마음을 여는 질문. 이 쟁점에 대한 감정만 다루세요.`,
    }
    return directions[action.questionType] ?? `재판관이 ${topic}에 대해 질문합니다.`
  }

  if (action.type === 'evidence_present') {
    const evName = evidence?.name ?? '증거'
    const evDesc = evidence?.description ? `\n증거 내용: ${evidence.description}` : ''
    return `재판관이 "${evName}" 증거를 제시했습니다.${evDesc}\n\n⚠️ "${topic}" 쟁점에 대한 증거입니다. 반드시 이 증거에 대해서만 직접 반응하세요.\n다른 쟁점(폰 확인, 외도 등)으로 넘어가지 마세요. 이 증거가 자신에게 불리하다면 변명하거나 설명하세요.`
  }

  if (action.type === 'trust_action') {
    const prompts: Record<string, string> = {
      confidential_protection: `재판관: "이 말은 상대에게 공개하지 않겠습니다." — 비공개 보장, 솔직해질 수 있습니다.`,
      separation: `재판관이 상대의 개입을 차단했습니다. 안전한 환경에서 말할 수 있습니다.`,
    }
    return prompts[action.actionType] ?? '재판관이 조치를 취했습니다.'
  }

  return '재판관이 질문합니다.'
}

/* ── 응답 파싱 ───────────────────────────── */

interface ParsedLLMResponse {
  judgeQuestion: string
  npcNode: DialogueNode
}

function parseLLMResponse(response: string, speaker: PartyId, disputeId?: string): ParsedLLMResponse {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      const behaviorMatch = parsed.npcResponse?.match(/[（(]([^)）]+)[)）]/)
      const behaviorHint = parsed.behaviorHint || (behaviorMatch ? behaviorMatch[1] : undefined)
      const text = (parsed.npcResponse ?? '').replace(/[（(][^)）]+[)）]/g, '').trim()

      return {
        judgeQuestion: parsed.judgeQuestion ?? '',
        npcNode: {
          id: `llm-${Date.now()}`,
          conditions: disputeId ? { disputeId } : {},
          speaker,
          text: text || response,
          behaviorHint,
          effects: {},
        },
      }
    }
  } catch { /* JSON 파싱 실패 → 폴백 */ }

  const behaviorMatch = response.match(/[（(]([^)）]+)[)）]/)
  const behaviorHint = behaviorMatch ? behaviorMatch[1] : undefined
  const text = response.replace(/[（(][^)）]+[)）]/g, '').trim()

  return {
    judgeQuestion: '',
    npcNode: {
      id: `llm-${Date.now()}`,
      conditions: disputeId ? { disputeId } : {},
      speaker,
      text: text || response,
      behaviorHint,
      effects: {},
    },
  }
}

/* ── LLM이 재판관 질문을 생성하지 못했을 때 폴백 ── */

function buildFallbackJudgeQuestion(
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
        `${myName} 씨, ${topic}에 대해 사실대로 말씀해 주십시오.`,
        `${myName} 씨, ${topic}에 대해 좀 더 구체적으로 설명해 주시겠습니까?`,
      ],
      motive_search: [
        `${myName} 씨, ${topic}을 왜 그렇게 하셨습니까?`,
        `${myName} 씨, 그때 어떤 사정이 있었는지 말씀해 주십시오.`,
      ],
      empathy_approach: [
        `${myName} 씨, ${topic}에 대한 솔직한 마음을 듣고 싶습니다.`,
        `${myName} 씨, ${topic} 당시 심정이 어떠셨습니까?`,
      ],
    }
    const pool = templates[action.questionType] ?? templates.fact_pursuit
    return pool[Math.floor(Math.random() * pool.length)]
  }

  if (action.type === 'evidence_present') {
    return `${myName} 씨, 이 증거에 대해 어떻게 생각하십니까?`
  }

  if (action.type === 'trust_action') {
    return `${myName} 씨, 편하게 말씀하셔도 됩니다.`
  }

  return `${myName} 씨, 한 가지 더 여쭤보겠습니다.`
}
