/**
 * 자유 질문 처리 엔진.
 * 2콜 구조: classifier(분류) → responder(응답)
 *
 * 1콜: free_question_classifier — questionType, disputeId 분류 (temp:0.1)
 * 2콜: free_question_responder — 분류 결과 기반 NPC 응답 생성 (temp:0.75)
 */
import { chatCompletion, MODEL_DIALOGUE } from './llmClient'
import { getPrompt, getPromptConfig } from '../api/promptManager'
import { buildAgentPrompt, getAgentConfig, isAgentLoaded } from '../api/agentManager'
import { enforceHonorifics, fixMisdirectedAddress, postProcessNpcText, type PostProcessContext } from './llmDialogueResolver'
import { fixPostpositions } from './koreanPostposition'
import { buildSpeechGuide, getMyCall, getJudgeReference, getAngryCall, getRelationLabel, canUseInformal } from './llmSpeechGuide'
import { eunneun } from '../utils/korean'
import { getTruthThrottle, getArchetypeGuide } from './blueprintPromptBuilderV2'
import type { CaseData, PartyId, QuestionType } from '../types'
import type { AgentState } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'
import { useGameStore } from '../store/useGameStore'
import { getRelationshipType } from '../utils/caseHelpers'

export interface FreeQuestionResult {
  questionType: QuestionType | 'irrelevant'
  disputeId: string | null
  response: string
  behaviorHint: string
  secondaryDisputeId?: string | null
}

interface ClassifierResult {
  questionType: QuestionType | 'irrelevant'
  primaryDisputeId: string | null
  secondaryDisputeId: string | null
  mentionedEvidenceIds: string[]
  confidence: number
}

export interface EvidenceContext {
  name: string
  description: string
  subjectParty?: 'a' | 'b' | 'both'
  provenance: string
  reliability: string
}

export async function processFreeQuestion(
  question: string,
  target: PartyId,
  agentA: AgentState,
  agentB: AgentState,
  caseData: CaseData,
  evidenceStates?: Record<string, EvidenceRuntimeState>,
  evidenceContext?: EvidenceContext,
): Promise<FreeQuestionResult> {
  const agent = target === 'a' ? agentA : agentB
  const party = target === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const opponent = target === 'a' ? caseData.duo.partyB : caseData.duo.partyA

  // ── 1콜: 분류 ──
  const classification = await classifyQuestion(question, caseData, evidenceStates)

  // ── 2콜: 응답 ──
  return generateResponse(question, classification, target, agent, party, opponent, caseData, evidenceContext)
}

/* ── 1콜: classifier ─────────────────────── */

async function classifyQuestion(
  question: string,
  caseData: CaseData,
  evidenceStates?: Record<string, EvidenceRuntimeState>,
): Promise<ClassifierResult> {
  const disputeList = caseData.disputes.map(d => `${d.id}: ${d.name}`).join('\n')

  // 증거 카탈로그: 잠금 해제된 증거만 (플레이어가 아는 증거)
  const evidenceCatalog = caseData.evidence
    .filter(e => !evidenceStates || evidenceStates[e.id]?.unlocked)
    .map(e => `${e.id}: ${e.name}`)
    .join('\n')

  const classifierVars: Record<string, string> = {
    disputeList,
    evidenceCatalog,
  }

  const systemPrompt = isAgentLoaded()
    ? buildAgentPrompt('free_question_classifier', classifierVars)
    : buildClassifierFallbackPrompt(disputeList, evidenceCatalog)

  const config = isAgentLoaded()
    ? getAgentConfig('free_question_classifier')
    : { temperature: 0.1, maxTokens: 180 }

  try {
    const raw = await chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `재판관의 자유 질문을 분류한다.\n질문: "${question}"\n\n규칙:\n- 캐릭터 연기 금지.\n- 입력 질문만 보고 questionType, disputeId, evidence 언급 여부를 분류한다.\n- 출력은 JSON 객체 하나만 한다.` },
      ],
      { temperature: config.temperature, maxTokens: config.maxTokens },
    )

    return parseClassifierResponse(raw)
  } catch {
    return {
      questionType: 'irrelevant',
      primaryDisputeId: null,
      secondaryDisputeId: null,
      mentionedEvidenceIds: [],
      confidence: 0,
    }
  }
}

function parseClassifierResponse(raw: string): ClassifierResult {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON')
    const parsed = JSON.parse(jsonMatch[0])

    const validTypes: (QuestionType | 'irrelevant')[] = [
      'fact_pursuit', 'motive_search', 'empathy_approach', 'irrelevant',
    ]

    return {
      questionType: validTypes.includes(parsed.questionType) ? parsed.questionType : 'irrelevant',
      primaryDisputeId: parsed.primaryDisputeId ?? null,
      secondaryDisputeId: parsed.secondaryDisputeId ?? null,
      mentionedEvidenceIds: parsed.mentionedEvidenceIds ?? [],
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.5,
    }
  } catch {
    return {
      questionType: 'irrelevant',
      primaryDisputeId: null,
      secondaryDisputeId: null,
      mentionedEvidenceIds: [],
      confidence: 0,
    }
  }
}

/* ── 2콜: responder ──────────────────────── */

async function generateResponse(
  question: string,
  classification: ClassifierResult,
  target: PartyId,
  agent: AgentState,
  party: CaseData['duo']['partyA'],
  opponent: CaseData['duo']['partyA'],
  caseData: CaseData,
  evidenceContext?: EvidenceContext,
): Promise<FreeQuestionResult> {
  const rawCall = getMyCall(caseData.duo, target)
  const myCall = rawCall === '자기' ? '자기야' : rawCall
  const judgeRef = getJudgeReference(caseData.duo, target)
  const angryCall = getAngryCall(caseData.duo, target)

  const relType = getRelationshipType(caseData)
  const canInformalThis = canUseInformal(caseData, target)
  const formalityGuide = canInformalThis
    ? `- 상대에게: 반말 (~야, ~잖아, ~거야)`
    : `- 상대에게: 존댓말 (~요, ~습니다). 감정 격해지면 반말 전환 가능.`

  const lieStates = Object.entries(agent.lieStateMap)
    .map(([dId, entry]) => {
      const dispute = caseData.disputes.find(d => d.id === dId)
      return `${dId}(${dispute?.name ?? '?'}): ${entry.currentState}`
    }).join(', ')

  const disputeList = caseData.disputes.map(d => `${d.id}: ${d.name}`).join('\n')
  const focusedDisputeId = classification.primaryDisputeId ?? ''

  // 현재 쟁점의 disputeInfo 생성
  const dispute = focusedDisputeId
    ? caseData.disputes.find(d => d.id === focusedDisputeId)
    : undefined
  const lieEntry = focusedDisputeId
    ? agent.lieStateMap[focusedDisputeId]
    : undefined

  let disputeInfo = ''
  if (lieEntry && dispute) {
    disputeInfo = `현재 쟁점: "${dispute.name}" (lieState: ${lieEntry.currentState})`
  }

  // ── 게임 맥락 채우기 ──
  const store = useGameStore.getState()
  const dialogueLog = store.dialogueLog ?? []

  // 최근 대화 5턴
  const recentDialogue = dialogueLog
    .slice(-10)
    .map(d => `[${d.speaker}] ${d.text}`)
    .join('\n')

  // 이미 공개된 사실 (S3+ 쟁점의 진실)
  const knownFacts = Object.entries(agent.lieStateMap)
    .filter(([, entry]) => entry.currentState >= 'S3')
    .map(([dId, entry]) => {
      const d = caseData.disputes.find(x => x.id === dId)
      return d ? `${d.name}: ${entry.currentState} (부분 인정됨)` : null
    })
    .filter(Boolean)
    .join('\n')

  // 제시된 증거 목록
  const presentedEvidence = caseData.evidence
    .filter(e => store.evidenceStates?.[e.id]?.presented)
    .map(e => `${e.name} (${e.reliability})`)
    .join(', ')

  // Truth Throttle + Archetype 보강 블록
  let truthThrottleBlock = ''
  let archetypeBlock = ''
  if (lieEntry) {
    truthThrottleBlock = getTruthThrottle(lieEntry.currentState as any)
  }
  if (party.archetype) {
    archetypeBlock = getArchetypeGuide(party.archetype)
  }

  const responderVars: Record<string, string> = {
    name: party.name,
    age: String(party.age),
    occupation: party.occupation ?? '',
    archetype: party.archetype ?? '',
    speechStyle: party.speechStyle,
    opponent: opponent.name,
    relationship: getRelationLabel(relType),
    context: caseData.context.description,
    callForm: myCall,
    judgeRef,
    angryCall,
    formalityGuide,
    lieStates,
    disputeList,
    speechGuide: buildSpeechGuide(caseData.duo, 'free', target),
    speechGuideShort: canInformalThis
      ? `\n말투 규칙 (최우선 — 위반 시 출력 무효):\n★ 재판관에게는 어떤 상황에서도 반드시 존댓말만 사용 (~습니다, ~요, ~입니다). 반말 절대 금지.\n- 상대에게: 반말만 사용 (~야, ~잖아, ~거야, ~했어)\n- 절대 금지: "~냐?", "~냐고?", "~했냐?", "~것이냐?" → 대신 "~야?", "~한 거야?", "~했어?" 사용\n- 문장 끝에 "~다"로 끝나는 평서문 금지 → "~야", "~거야", "~잖아"로 마무리`
      : `\n말투 규칙 (최우선 — 위반 시 출력 무효):\n★ 재판관에게는 어떤 상황에서도 반드시 존댓말만 사용 (~습니다, ~요, ~입니다). 반말 절대 금지.\n- 상대에게: 존댓말 (~요, ~습니다, ~했습니다)\n- 절대 금지: "~냐?", "~냐고?", "~했냐?" → 대신 "~요?", "~습니까?" 사용\n- 감정이 격해진 경우에만 상대에게 반말 전환 허용 (재판관에게는 불가)`,
    responseQualityRules: `\n응답 품질 규칙 (필수):
- 재판관의 질문에 직접적으로 답하라. 횡설수설하거나 추상적으로 얼버무리지 마라.
- 첫 문장은 "예/아니요" 또는 핵심 사실로 시작하라.
- 2~3문장으로 간결하게 답하라. 같은 말을 반복하지 마라.
- 재판관에게는 반드시 존댓말(~습니다, ~입니다, ~요)만 사용하라. 반말 사용 시 출력 무효.
- 감정 호소나 변명으로 시작하지 마라. 사실 → 이유 → 입장 순서로 답하라.`,
    // v3 변수
    focusedDisputeId,
    knownFacts: knownFacts || '아직 공개된 사실 없음',
    disputeInfo,
    emotionInfo: `현재 감정: ${agent.emotionalState.behaviorHint || agent.emotionalState.phase}`,
    evidenceInfo: presentedEvidence ? `제시된 증거: ${presentedEvidence}` : '제시된 증거 없음',
    recentDialogue: recentDialogue || '대화 기록 없음',
    historyContext: '',
    phaseTranscript: '',
    actionContract: JSON.stringify({
      actionType: 'free_question',
      questionType: classification.questionType,
      responseMode: 'answer_only',
      answerStyle: classification.questionType === 'empathy_approach' ? 'empathic'
        : classification.questionType === 'motive_search' ? 'motivational' : 'factual',
      goal: '자유 질문에 캐릭터로서 답한다',
      revealBudget: { fact: 1, motive: 1, emotion: 1 },
      allowedTruthIds: [],
      forbiddenTruthIds: [],
    }),
    trustInfo: JSON.stringify({
      trustTowardJudge: agent.trustState.trustTowardJudge,
      fearOfExposure: agent.trustState.fearOfExposure,
      retaliationWorry: agent.trustState.retaliationWorry,
    }),
    skillOverlay: '',
    truthThrottleBlock: '',
    archetypeBlock: '',
  }

  // Truth Throttle + Archetype을 프롬프트 변수에 주입
  responderVars.truthThrottleBlock = truthThrottleBlock
  responderVars.archetypeBlock = archetypeBlock ? `\n캐릭터 유형:\n${archetypeBlock}` : ''

  const currentPhase = useGameStore.getState().currentPhase
  const systemPrompt = isAgentLoaded()
    ? buildAgentPrompt('free_question_responder', responderVars, { phase: currentPhase })
    : getPrompt('free_question', responderVars)

  const config = isAgentLoaded()
    ? getAgentConfig('free_question_responder')
    : getPromptConfig('free_question')

  // 증거 대질인 경우 증거 맥락 추가
  let evidenceBlock = ''
  if (evidenceContext) {
    const myName = party.name
    const opName = opponent.name
    const isActor = evidenceContext.subjectParty === target
    const isOther = (evidenceContext.subjectParty === 'a' || evidenceContext.subjectParty === 'b') && evidenceContext.subjectParty !== target
    const roleDesc = isActor
      ? `당신(${myName})은 이 증거가 지적하는 행위의 당사자다. 증거 내용에 대해 해명해야 한다.`
      : isOther
      ? `당신(${myName})은 행위 당사자가 아니다. ${opName}의 행위에 대한 증거이므로, 이 증거에 대한 의견이나 맥락을 말해야 한다. ${opName}인 것처럼 변명하지 마라.`
      : `이 증거는 양쪽 모두와 관련된다.`
    evidenceBlock = `\n\n★ 증거 대질 맥락:\n- 증거명: ${evidenceContext.name}\n- 증거 설명: ${evidenceContext.description}\n- 출처: ${evidenceContext.provenance} / 신뢰도: ${evidenceContext.reliability}\n- ${roleDesc}\n- 재판관의 질문은 이 증거를 기반으로 하고 있다. 증거 내용을 고려하여 답변하라.`
  }

  const userMessage = `분류가 끝난 자유 질문에 캐릭터로서 응답한다.\n원문 질문: "${question}"\nclassifier 결과:\n- questionType: ${classification.questionType}\n- focusedDisputeId: ${classification.primaryDisputeId ?? 'null'}\n- secondaryDisputeId: ${classification.secondaryDisputeId ?? 'null'}\n- confidence: ${classification.confidence}${evidenceBlock}\n\n규칙:\n- 분류 결과를 다시 바꾸지 않는다.\n- focusedDisputeId(${classification.primaryDisputeId ?? 'null'})를 중심으로 답한다.\n- 출력은 JSON 객체 하나만 한다.`

  try {
    const raw = await chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      { temperature: config.temperature, maxTokens: config.maxTokens, model: MODEL_DIALOGUE },
    )

    const currentLieState = lieEntry?.currentState ?? 'S0'
    const monetaryRe = /송금|이체|금액|원\b|만원|돈|비용|계좌|환급|보증금|월세|정산|예치|납부|수당|급여|계약금|위약금|배상금|합의금|채무|대출|융자|임대료/
    const focusText = [dispute?.name, dispute?.truthDescription].filter(Boolean).join(' ')
    const hasMonetaryDispute = monetaryRe.test(focusText)
    const ppCtx: PostProcessContext = {
      lieState: currentLieState,
      hasMonetaryDispute,
      partyNames: { nameA: caseData.duo.partyA.name, nameB: caseData.duo.partyB.name },
      speaker: target,
      previousNpcResponse: dialogueLog.filter(d => d.speaker === target).slice(-1)[0]?.text,
    }
    const parsed = parseResponderResponse(raw, ppCtx)
    return {
      questionType: classification.questionType,
      disputeId: classification.primaryDisputeId,
      secondaryDisputeId: classification.secondaryDisputeId,
      response: parsed.response,
      behaviorHint: parsed.behaviorHint,
    }
  } catch {
    return {
      questionType: classification.questionType,
      disputeId: classification.primaryDisputeId,
      response: `... ${eunneun(party.name)} 질문을 이해하지 못한 듯합니다.`,
      behaviorHint: '당황한 표정으로 침묵한다.',
    }
  }
}

function parseResponderResponse(raw: string, ppCtx?: PostProcessContext): { response: string; behaviorHint: string } {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON')
    const parsed = JSON.parse(jsonMatch[0])

    // output_json_npc 형식 (npcResponse) 또는 기존 형식 (response) 모두 지원
    const responseText = parsed.npcResponse ?? parsed.response ?? ''
    const behaviorMatch = responseText.match(/[（(]([^)）]+)[)）]/)
    const behaviorHint = parsed.behaviorHint || (behaviorMatch ? behaviorMatch[1] : '')
    const rawResponse = responseText.replace(/[（(][^)）]+[)）]/g, '').trim()
    // 전체 후처리 파이프라인 적용 (TruthThrottle/클리셰 필터/금액 보호 포함)
    const response = ppCtx ? postProcessNpcText(rawResponse, ppCtx) : fixPostpositions(enforceHonorifics(fixMisdirectedAddress(rawResponse)))

    // S0-S1 회피 패턴 감지 → 플레이어에게 힌트 제공
    let finalHint = behaviorHint
    if (!finalHint && ppCtx?.lieState && ['S0', 'S1'].includes(ppCtx.lieState)) {
      const evasionPattern = /해당 금액|그 사람|그곳|그 쪽|그때|해당 시기|그 건/
      if (evasionPattern.test(response)) {
        finalHint = '구체적인 내용을 언급하지 않으려 한다.'
      }
    }

    return { response: response || '...', behaviorHint: finalHint }
  } catch {
    return { response: raw.slice(0, 200), behaviorHint: '' }
  }
}

/* ── 폴백: classifier 에이전트 미로드 시 ── */

function buildClassifierFallbackPrompt(disputeList: string, evidenceCatalog: string): string {
  return `플레이어가 재판관 역할로 질문합니다. 이 질문을 분류만 하세요.

## 쟁점 목록
${disputeList}

## 증거 목록
${evidenceCatalog}

## 분류 기준
- fact_pursuit: 사실, 날짜, 금액, 장소를 묻는 질문
- motive_search: 이유, 의도, 동기를 묻는 질문
- empathy_approach: 감정, 상처, 두려움을 묻는 질문
- irrelevant: 쟁점과 무관한 질문

## 출력 (JSON만)
{"questionType":"fact_pursuit|motive_search|empathy_approach|irrelevant","primaryDisputeId":"d-1 또는 null","secondaryDisputeId":"null","mentionedEvidenceIds":[],"confidence":0.85}`
}
