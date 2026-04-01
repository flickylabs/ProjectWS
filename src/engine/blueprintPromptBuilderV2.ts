/**
 * Blueprint 프롬프트 빌더 V2
 * ─────────────────────────────────
 * atom + slot 기반. publicClaim 문장을 프롬프트에 넣지 않는다.
 * LLM에게는 의미 라벨 + slot 값 + archetype 가이드만 전달.
 */

import type {
  ResponseBlueprint,
  NormalizedClaimPolicyV2,
  BlueprintAtomPlan,
  SlotSelection,
  QuestionType,
} from '../types'
import type { CaseData, PartyId } from '../types'
import type { Archetype } from '../types'
import { getMyCall, getJudgeReference, getAngryCall, canUseInformal } from './llmSpeechGuide'

/**
 * V2 시스템 프롬프트 생성
 */
export function buildBlueprintSystemPromptV2(
  blueprint: ResponseBlueprint,
  policy: NormalizedClaimPolicyV2,
  atomPlan: BlueprintAtomPlan,
  caseData: CaseData,
  party: PartyId,
  recentDialogues: { speaker: string; text: string }[],
): string {
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const judgeRef = getJudgeReference(caseData.duo, party)
  const myCall = getMyCall(caseData.duo, party)
  const callForm = myCall === '자기' ? '자기야' : myCall
  const canInformalThis = canUseInformal(caseData, party)

  // 선택된 atom의 의미 라벨
  const selectedAtomLabels = atomPlan.selectedAtoms
    .map(a => {
      const atom = policy.claimAtoms.find(ca => ca.id === a.atomId)
      return atom ? `- ${atom.factText}` : null
    })
    .filter(Boolean)
    .join('\n')

  // slot에서 추출한 이번 턴 표현 재료
  const slotMaterial = formatSlotMaterial(atomPlan.slotSelections)

  // 금지 atom 라벨
  const forbiddenLabels = atomPlan.forbiddenAtomIds
    .map(id => policy.claimAtoms.find(a => a.id === id)?.factText)
    .filter(Boolean)
    .map(t => `- ❌ ${t}`)
    .join('\n')

  // suppression (의미 라벨)
  const suppressionLabels = policy.suppressions.map(s => `- ❌ ${s}`).join('\n')

  // 최근 대화
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

  // archetype 가이드
  const archetypeGuide = ARCHETYPE_GUIDE[profile.archetype] ?? ''

  // tell 지시
  const tellInstruction = blueprint.mustUseTell
    ? `\n## 말버릇 (자연스럽게 1회)\n${TELL_HINTS[blueprint.mustUseTell] ?? blueprint.mustUseTell}`
    : ''

  return `너는 "${profile.name}"이다. ${profile.age}세, ${profile.occupation}.

## 캐릭터
${archetypeGuide}

## 이번 턴 지시서
- 태도: ${STANCE_LABELS[blueprint.stance]}
- 방어: ${DEFENSE_LABELS[blueprint.defenseMode]}
- 문장 수: ${blueprint.sentenceCount}문장
${blueprint.shouldCounterQuestion ? '- 마지막 문장을 의문형으로 되묻기' : ''}
${blueprint.emotionHint ? `- 감정: ${blueprint.emotionHint}` : ''}

## 이번 턴 답변 초점
${ANSWER_FOCUS[atomPlan.answerFocus]}

## 이번 턴 말할 수 있는 의미
${selectedAtomLabels}

## 표현 재료 (이 단어/표현을 사용하라)
${slotMaterial}

## 실제로 알고 있지만 숨기는 것
${policy.privateKnowledge.map(k => `- ${k}`).join('\n')}

## 절대 금지
${suppressionLabels}
${forbiddenLabels}
${tellInstruction}

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
- ${blueprint.sentenceCount}문장.
- 의미 라벨을 복사하지 마라. 캐릭터 말투로 자연스럽게 표현하라.
- 이전 턴과 다른 표현을 써라.`
}

/**
 * V2 유저 프롬프트 생성
 */
export function buildBlueprintUserPromptV2(
  blueprint: ResponseBlueprint,
  judgeQuestion: string,
): string {
  return `재판관 질문: ${judgeQuestion}

지시서: ${blueprint.stance} / ${DEFENSE_LABELS[blueprint.defenseMode]}
${blueprint.sentenceCount}문장으로 연기하라.
출력: JSON { "npcResponse": "...", "behaviorHint": "..." }`
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Slot Material 포맷
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function formatSlotMaterial(selections: SlotSelection[]): string {
  if (selections.length === 0) return '(특별한 표현 재료 없음)'

  const grouped: Record<string, string[]> = {}
  for (const s of selections) {
    const label = SLOT_FAMILY_LABELS[s.family] ?? s.family
    if (!grouped[label]) grouped[label] = []
    grouped[label].push(s.value)
  }

  return Object.entries(grouped)
    .map(([label, values]) => `- ${label}: ${values.join(', ')}`)
    .join('\n')
}

const SLOT_FAMILY_LABELS: Record<string, string> = {
  amount: '금액', time: '시점', person: '인물', relation: '관계 호칭',
  evidence: '증거', message: '메시지', rule: '약속/규칙', action: '행위',
  beneficiary: '대상자',
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ANSWER_FOCUS: Record<QuestionType, string> = {
  fact_pursuit: '재판관이 사실 여부를 묻고 있다. "무엇을 했는지/안 했는지"에 대해서만 답하라.',
  motive_search: '재판관이 이유/동기를 묻고 있다. "왜 그랬는지, 왜 숨겼는지"에 대해 답하라. 사실 나열이 아니라 판단의 배경을 말하라.',
  empathy_approach: '재판관이 당시 심정을 묻고 있다. "어떤 마음이었는지"에 대해 답하라. 반격보다 자기 감정을 먼저 드러내라.',
  evidence_present: '재판관이 증거를 제시했다. 해당 증거에 대한 입장을 답하라.',
}

const STANCE_LABELS: Record<string, string> = {
  deny: '완전 부정 — "아닙니다"로 일관하라',
  hedge: '핵심 회피 — 사실을 부정하지 말고 의미/맥락을 흐려라',
  partial: '부분 인정 — 저위험 사실은 인정, 핵심은 축소',
  blame: '전가/반격 — 상대의 잘못으로 초점을 옮겨라',
  emotional: '감정 호소 — 논리보다 심정으로 답하라',
  confess: '고백 — 핵심을 인정하되 자기 사정을 덧붙여라',
}

const DEFENSE_LABELS: Record<string, string> = {
  flat_denial: '사실 자체를 부정하라',
  context_attack: '맥락/배경을 문제 삼아라',
  legality_attack: '취득의 정당성을 문제 삼아라',
  authenticity_attack: '증거의 진위를 문제 삼아라',
  counterattack: '상대의 잘못을 역공하라',
  silence: '말을 아끼고 핵심을 흐려라',
  concession: '인정 쪽으로 기울어라',
}

const ARCHETYPE_GUIDE: Record<Archetype, string> = {
  avoidant: '회피형: 직접 부정보다 화제 전환, 순서/절차를 앞세움. 곤란하면 말이 길어지고 시선을 피함.',
  confrontational: '정면돌파형: 짧고 날카롭게. 방어보다 역공. 인정할 때도 주도권을 놓지 않으려 함.',
  victim_cosplay: '피해자형: 자기 상처/억울함으로 수렴. "왜 나만"으로 시작. 공감에 가장 쉽게 열림.',
  cold_logic: '냉정논리형: 감정 대신 기준/순서/금액을 앞세움. 인정도 범위를 정밀하게 자름.',
}

const TELL_HINTS: Record<string, string> = {
  over_precision: '숫자가 지나치게 정밀해지는 버릇. 표현 재료의 exact 금액/시각을 자연스럽게 넣어라.',
  counter_question: '궁지에 몰리면 되묻는 버릇. 마지막 문장을 의문형으로 끝내라.',
  timeline_padding: '동선을 나열하며 시간을 버는 버릇. "~하고, ~한 다음에" 식으로 시간 순서를 늘어놓아라.',
  evidence_waving: '증거 하나로 결론을 단정짓는 버릇. "이게 전부입니다" 식 단정을 넣어라.',
  motive_jump: '행동에서 의도를 곧바로 단정하는 버릇. "그러니까 ~한 거잖아" 식 비약을 넣어라.',
  selective_quote: '상대 말에서 약한 고리만 반복하는 버릇. 상대의 표현을 따와서 반복 추궁하라.',
}
