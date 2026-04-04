/**
 * Blueprint 기반 프롬프트 빌더
 * ─────────────────────────────────
 * ResponseBlueprint를 LLM이 연기할 수 있는 프롬프트로 변환한다.
 *
 * 핵심 원칙: LLM은 의미를 결정하지 않는다. blueprint를 연기만 한다.
 */

import type { ResponseBlueprint, ClaimPolicy, QuestionType } from '../types'
import type { CaseData, PartyId } from '../types'
import type { Archetype } from '../types'
import type { LieState } from '../types/agent'
import { getMyCall, getJudgeReference, getAngryCall, canUseInformal } from './llmSpeechGuide'
import { getBridgeEntry } from './bridgeEngine'

/**
 * Blueprint 기반 시스템 프롬프트를 생성한다.
 */
export function buildBlueprintSystemPrompt(
  blueprint: ResponseBlueprint,
  claimPolicy: ClaimPolicy,
  caseData: CaseData,
  party: PartyId,
  recentDialogues: { speaker: string; text: string }[],
  questionType: QuestionType = 'fact_pursuit',
  lieState: LieState = 'S0',
): string {
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const opponent = party === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  const judgeRef = getJudgeReference(caseData.duo, party)
  const myCall = getMyCall(caseData.duo, party)
  const angryCall = getAngryCall(caseData.duo, party)
  const callForm = myCall === '자기' ? '자기야' : myCall
  const canInformalThis = canUseInformal(caseData, party)

  const dispute = caseData.disputes.find(d => d.id === blueprint.focusDisputeId)
  const disputeName = dispute?.name ?? '해당 사안'

  const bridgeEntry = getBridgeEntry(caseData.caseId?.replace(/^case-/, '') ?? '', party, blueprint.focusDisputeId)
  const admittedFacts = bridgeEntry?.alreadyPubliclyAdmitted ?? []

  // 최근 대화 (최대 4개, 간결하게)
  const speakerNames: Record<string, string> = {
    a: caseData.duo.partyA.name, b: caseData.duo.partyB.name,
    judge: '재판관', system: '시스템',
  }
  const recentStr = recentDialogues.slice(-4).map(
    d => `${speakerNames[d.speaker] ?? d.speaker}: ${d.text.slice(0, 60)}`
  ).join('\n')

  const formalityGuide = canInformalThis
    ? `상대에게: 반말 (~야, ~잖아, ~거야)`
    : `상대에게: 존댓말 (~요, ~습니다)`

  // tell 지시 — mustUseTell이 있을 때만, 구체적으로
  const tellInstruction = blueprint.mustUseTell
    ? `\n## 말버릇 (자연스럽게 1회 섞어라)\n${TELL_HINTS[blueprint.mustUseTell] ?? `"${blueprint.mustUseTell}" 버릇을 자연스럽게 발현`}`
    : ''

  // archetype별 연기 지시
  const archetypeGuide = ARCHETYPE_GUIDE[profile.archetype] ?? ''

  return `너는 "${profile.name}"이다. ${profile.age}세, ${profile.occupation}.

## 캐릭터 (이 성격대로 연기하라)
${archetypeGuide}

## 이번 턴 지시서
- 쟁점: ${disputeName}
- 태도: ${STANCE_LABELS[blueprint.stance]}
- 방어: ${DEFENSE_LABELS[blueprint.defenseMode]}
- 문장 수: ${blueprint.sentenceCount}문장
${blueprint.shouldCounterQuestion ? '- 마지막 문장을 의문형으로 되묻기' : ''}
${blueprint.emotionHint ? `- 감정: ${blueprint.emotionHint}` : ''}

## 이번 턴 답변 초점
${ANSWER_FOCUS[questionType]}

## 말해도 되는 주장
${claimPolicy.publicClaim.map(c => `- ${c}`).join('\n')}

## 실제로 알고 있지만 숨기는 것 (연기의 재료)
${gatePrivateKnowledge(claimPolicy.privateKnowledge, lieState).map(k => `- ${k}`).join('\n')}

${getTruthThrottle(lieState)}

## 금지
${blueprint.forbiddenClaimAtoms.map(f => `- ❌ ${f}`).join('\n')}
${blueprint.bannedLexemes?.length ? `- 금지 단어: ${blueprint.bannedLexemes.join(', ')}` : ''}
${tellInstruction}
${admittedFacts.length > 0 ? `\n## 이미 인정한 사실 (재부정 금지)\n${admittedFacts.map(f => `- ${f}`).join('\n')}` : ''}

## 호칭
- 재판관: 존댓말 (~습니다, ~요)
- 상대 언급(재판관에게): "${judgeRef}"
- 상대에게 직접: "${callForm}"
- ${formalityGuide}
${recentStr ? `\n## 최근 대화\n${recentStr}` : ''}

## 출력
JSON { "npcResponse": "대사", "behaviorHint": "행동묘사" }

★ 절대 규칙 (위반 시 출력 무효):
- 재판관에게는 반드시 존댓말(~습니다, ~입니다, ~요)만 사용. 반말 절대 금지.
- "~해?", "~야?", "~지?", "~거야?", "~궁금해", "~같아" 등 반말 종결 금지.
- 재판관에게 되묻지 마라. 재판관은 질문하는 사람이고 당신은 답하는 사람이다.
- ${blueprint.sentenceCount}문장. 같은 표현 반복 금지.
- 말해도 되는 주장 범위 안에서만 발언.
- 이전 턴과 다른 표현을 써라.
- 금액·날짜를 정확한 숫자로 말하지 마라. "상당한 금액", "그 무렵" 식으로 뭉뚱그려라. (단, 말버릇 지시가 있으면 그때만 허용)
- 모든 발언은 재판관을 향해 하라. 상대에게 직접 말하지 마라.`
}

/**
 * Blueprint 기반 유저 프롬프트를 생성한다.
 */
export function buildBlueprintUserPrompt(
  blueprint: ResponseBlueprint,
  judgeQuestion: string,
  disputeName: string,
): string {
  return `재판관 질문: ${judgeQuestion}

지시서 요약: ${blueprint.stance} / ${DEFENSE_LABELS[blueprint.defenseMode]}
${blueprint.sentenceCount}문장으로 연기하라.
출력: JSON { "npcResponse": "...", "behaviorHint": "..." }`
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Progressive Truth Throttle
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TRUTH_THROTTLE: Record<string, string> = {
  early: `★ 진실 차단 (이 캐릭터는 아직 진실을 밝힐 단계가 아니다):
- 송금의 실제 목적이나 수취인의 정체를 절대 말하지 마라
- 기관명, 서비스명, 직함을 절대 말하지 마라
- 제3자의 역할이나 관계를 절대 말하지 마라
- "사실은~", "실은~" 으로 시작하는 고백 금지
- 모호하게 회피하거나 부정만 하라`,

  partial: `★ 부분적으로 인정하되, 핵심 진실은 아직 숨겨라:
- 금액의 대략적 규모만 인정 가능 ("적지 않은 돈")
- 목적은 "개인 사정"/"가족 일" 수준까지만
- 구체적 기관명, 인물 직함, 서비스명 금지
- 상대방 탓으로 돌리기 가능`,

  blame: `★ 상대의 잘못을 부각하며 자신의 행위를 정당화하라:
- 자신의 행위 사실은 인정하되 이유는 "어쩔 수 없었다" 수준
- 구체적 진실(기관명, 서비스명)은 아직 금지
- 상대의 행동이 더 문제였다고 초점 전환`,

  open: `★ 이제 진실을 말할 수 있다. 구체적인 이름, 기관명, 목적을 포함하라.`,
}

function getTruthThrottle(lieState: LieState): string {
  if (lieState <= 'S1') return TRUTH_THROTTLE.early
  if (lieState === 'S2') return TRUTH_THROTTLE.partial
  if (lieState === 'S3') return TRUTH_THROTTLE.blame
  return TRUTH_THROTTLE.open
}

function gatePrivateKnowledge(items: string[], lieState: LieState): string[] {
  if (!items.length) return items
  if (lieState <= 'S2') return items.slice(0, 1)
  if (lieState === 'S3') return items.slice(0, 2)
  return items // S4-S5: all
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ANSWER_FOCUS: Record<QuestionType, string> = {
  fact_pursuit: `재판관이 사실 여부를 묻고 있다.
- "무엇을 했는지/안 했는지"에 대해서만 답하라.
- 감정 호소나 동기 변명을 먼저 꺼내지 마라.
- 시점, 금액, 행위를 구체적으로 답하되, blueprint 태도에 맞게.`,

  motive_search: `재판관이 이유/동기를 묻고 있다.
- "왜 그랬는지, 왜 숨겼는지, 무엇이 두려웠는지"에 대해 답하라.
- 사실 나열이 아니라 판단의 배경을 말하라.
- "~할 수밖에 없었다", "~가 걱정되어서" 같은 동기 중심 표현을 써라.`,

  empathy_approach: `재판관이 당시 심정을 묻고 있다.
- "어떤 마음이었는지, 무엇이 가장 힘들었는지"에 대해 답하라.
- 반격이나 사실 변명보다 자기 감정을 먼저 드러내라.
- 단, 캐릭터 성격에 맞게 — 직접적이든 우회적이든.
★ 감정적 답변이라도 반드시 합니다체(~습니다, ~입니다)를 유지하라. 해요체(~에요, ~해요) 금지.`,

  evidence_present: `재판관이 증거를 제시했다.
- 해당 증거에 대한 입장(인정/반박/맥락 공격)을 답하라.
- blueprint의 방어 방식에 맞게 대응하라.`,
}

const STANCE_LABELS: Record<string, string> = {
  deny: '완전 부정 — "아닙니다"로 일관하라',
  hedge: '핵심 회피 — 사실 자체를 부정하지 말고, 의미/맥락/용도를 흐려라. "순서가 있다", "설명이 필요하다"식으로.',
  partial: '부분 인정 — 저위험 사실은 인정하되 핵심은 축소하라',
  blame: '전가/반격 — 상대의 잘못을 재판관에게 호소하라. 상대에게 직접 말하지 말고, "저 사람이~", "상대방이~" 식으로 3인칭으로 언급하라.',
  emotional: '감정 호소 — 논리보다 심정으로 답하라',
  confess: '고백 — 핵심을 인정하되 자기 사정을 덧붙여라',
}

const DEFENSE_LABELS: Record<string, string> = {
  flat_denial: '사실 자체를 부정하라',
  context_attack: '맥락/배경을 문제 삼아라',
  legality_attack: '취득의 정당성을 문제 삼아라',
  authenticity_attack: '증거의 진위를 문제 삼아라',
  counterattack: '상대의 잘못을 역공하라',
  silence: '말을 아끼고 핵심을 흐려라. 길게 설명하지 마라.',
  concession: '더 버티기 어려우니 인정 쪽으로 기울어라',
}

/** archetype별 연기 가이드 */
const ARCHETYPE_GUIDE: Record<Archetype, string> = {
  avoidant: '회피형: 직접 부정보다 화제 전환, 순서/절차를 앞세움. 곤란하면 말이 길어지고 시선을 피함. 감정을 잘 드러내지 않음.',
  confrontational: '정면돌파형: 짧고 날카롭게. 방어보다 역공을 선호. 인정할 때도 주도권을 놓지 않으려 함. 단, 역공은 반드시 재판관에게 향하라. 상대에게 직접 반말 공격 금지.',
  victim_cosplay: '피해자형: 자기 상처/억울함으로 수렴. 방어도 "왜 나만"으로 시작. 공감에 가장 쉽게 열림.',
  cold_logic: '냉정논리형: 감정 대신 기준/순서/금액을 앞세움. 인정도 범위를 정밀하게 자름. 감정이 묻어나오면 더 건조해짐.',
  affect_flattening: '감정둔화형: 감정 표현이 극도로 억제됨. 사실만 나열하고 감정어를 거의 쓰지 않음. 무표정하고 단조로운 어조.',
  premature_summary: '조기정리형: 대화를 빨리 마무리하려 함. "결론은~", "정리하면~"을 자주 씀. 상세 설명을 건너뛰려 함.',
}

/** tell별 구체적 발현 힌트 */
const TELL_HINTS: Record<string, string> = {
  over_precision: '거짓말할 때 숫자가 지나치게 정밀해지는 버릇. 표현 재료에 있는 정확한 수치를 자연스럽게 1회 넣어라. 단, 매 문장 첫 머리에 넣지 마라.',
  counter_question: '궁지에 몰리면 답 대신 되묻는 버릇. 마지막 문장을 "~는 어떻게 설명하실 겁니까?" 식 의문형으로 끝내라.',
  timeline_padding: '핵심을 미루려고 동선을 나열하는 버릇. "~하고, ~한 다음에, ~해서" 식으로 시간 순서를 늘어놓아라.',
  evidence_waving: '증거 하나로 결론을 단정짓는 버릇. "이게 전부입니다", "이걸로 충분합니다" 식 단정을 1회 넣어라.',
  motive_jump: '행동에서 의도를 곧바로 단정하는 버릇. "그러니까 ~한 거잖아", "결국 ~하려고 한 거지" 식 비약을 넣어라.',
  selective_quote: '상대 말에서 약한 고리만 반복하는 버릇. 상대의 표현 일부를 그대로 따와서 반복 추궁하라.',
}
