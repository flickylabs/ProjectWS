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
import type { LieState } from '../types/agent'
import { getMyCall, getJudgeReference, getAngryCall, canUseInformal } from './llmSpeechGuide'
import { pp이가, pp은는, pp을를 } from './koreanPostposition'

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
  lieState: LieState = 'S0',
  hasMonetaryDisputeOverride?: boolean,
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
  // S0-S1에서는 금액/인물 슬롯을 프롬프트에서 제외 (Truth Throttle 충돌 방지)
  const isEarlyState = ['S0', 'S1'].includes(lieState)
  const filteredSlots = isEarlyState
    ? atomPlan.slotSelections.filter(s => !['amount', 'time', 'person', 'beneficiary'].includes(s.family))
    : atomPlan.slotSelections
  const slotMaterial = formatSlotMaterial(filteredSlots)

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

  // 금전 무관 사건 가드: 쟁점에 금전 키워드가 없으면 금전 표현 차단
  const monetaryKeywords = /송금|이체|금액|원\b|돈|비용|계좌|환급|보증금|월세|정산|예치|납부|수당|급여/
  const hasMonetaryDispute = hasMonetaryDisputeOverride
    ?? caseData.disputes.some(d => monetaryKeywords.test(d.name) || monetaryKeywords.test(d.truthDescription ?? ''))
  const monetaryGuard = hasMonetaryDispute ? '' : `\n★★★ 금전 표현 완전 차단 (이 사건에는 금전 거래가 없다):
- "돈", "송금", "이체", "금액", "계좌", "비용", "환급", "정산", "계약금", "위약금", "배상금", "합의금", "임대인", "임차인", "채무", "대출", "융자", "임대료" 등 금전 관련 단어를 절대 사용하지 마라.
- 은유적 표현도 금지: "큰돈", "돈을 보내다", "돈을 쓰다", "금전적", "재정적", "경제적 손실"
- 이 사건의 쟁점은 금전이 아니다. 금전 관련 표현이 1개라도 등장하면 출력 무효.`

  // tell 지시
  const tellInstruction = blueprint.mustUseTell
    ? `\n## 말버릇 (3~4턴에 1회만. 매 턴 넣지 마라. 넣지 않는 턴이 더 많아야 자연스럽다)\n${TELL_HINTS[blueprint.mustUseTell] ?? blueprint.mustUseTell}`
    : ''

  const opponent = party === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  const angryCall = getAngryCall(caseData.duo, party)

  return `너는 "${profile.name}"이다. ${profile.age}세, ${profile.occupation}.
상대방: ${opponent.name} (${opponent.age}세, ${opponent.occupation})

## 사건 배경
${caseData.context.description}

## 캐릭터
${archetypeGuide}
말투: ${profile.speechStyle}
${tellInstruction}

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
${gatePrivateKnowledge(policy.privateKnowledge, lieState).map(k => `- ${k}`).join('\n')}

${getTruthThrottle(lieState)}

## 절대 금지
${suppressionLabels}
${forbiddenLabels}
${monetaryGuard}

## 호칭 (절대 규칙)
- 당신은 ${profile.name}입니다. 1인칭("저", "제가")으로 말합니다.
- 재판관에게 말할 때: 존댓말 (합니다체)
- 상대방을 재판관에게 언급할 때: "${judgeRef}" 사용
  ✅ "${judgeRef}${pp이가(judgeRef)} 그랬습니다", "${judgeRef}${pp은는(judgeRef)} 그 자리에 없었습니다", "${judgeRef}에게 말했습니다"
  ❌ "${callForm}" 사용 금지 (재판관에게 애칭 불가)
- 상대방에게 직접 말할 때: "${callForm}" 사용
- 화났을 때: "${angryCall}" 허용
- ${formalityGuide}
- ❌ 재판관의 말을 생성하지 마. 당신은 ${profile.name}만 연기합니다.
${recentStr ? `\n## 최근 대화\n${recentStr}` : ''}

## 출력
JSON { "npcResponse": "대사", "behaviorHint": "행동묘사" }

★ 좋은 대사의 예시 (이 톤과 구체성을 따라하라):
(아래 예시는 특정 사건의 정답이 아니라, "이런 톤으로 말해라"는 가이드다.)
${hasMonetaryDispute ? `
[deny/S1 — 회피형 캐릭터] (금전 사건)
질문: "그날 송금한 사실이 있습니까?"
좋은 답: "적지 않은 돈이 움직인 건 맞습니다. 그런데 그 숫자만 보고 다른 뜻부터 붙이는 건 순서가 아닙니다."
나쁜 답: "사전 상의가 일부 누락된 부분은 있었던 것으로 생각됩니다."

[hedge/S2 — 회피형 캐릭터] (금전 사건)
질문: "왜 숨겼습니까?"
좋은 답: "집안에 급한 일이 생겨 먼저 움직였습니다. 설명을 늦춘 건 제 잘못이지만, 성격이 다른 돈입니다."
나쁜 답: "여러 가지 상황이 얽혀 있었기 때문에 복잡한 마음이었습니다."

[blame/S3 — 정면돌파형 캐릭터] (금전 사건)
질문: "왜 상대방에게 말하지 않았습니까?"
좋은 답: "제가 늦었습니다. 그렇다고 남의 폰을 열고 외도부터 만든 순서까지 사라지진 않습니다."
나쁜 답: "그런 상황에서 제 아내의 가족 쪽에 급한 일이 생겼기 때문에 그 결정을 하게 되었습니다."

[emotional/S4 — 감정 폭발] (금전 사건)
질문: "당시 심정을 말씀해 주십시오."
좋은 답: "처가 쪽 돈 앞에서 제가 먼저 쩔쩔매는 꼴을 보이기 싫었습니다. 가장이 숫자 앞에서 작아지는 건, 생각보다 더 창피합니다."
나쁜 답: "가족의 문제로 마음이 매우 불안했습니다. 무능한 가장처럼 보일까 두려워서 진심을 숨긴 것 같습니다."

[confess/S5 — 자백] (금전 사건)
(S5에서는 진실 공개가 허용되므로 구체적 이름이 포함된다.)
질문: "사실대로 말씀해 주십시오."
좋은 답: "280만원은 오미숙 장모님 추석 연휴 간병 예약금이었습니다. 재가돌봄센터 상담팀장 최민정 씨에게 보낸 돈이고, 제 아내한테 상의 없이 처리한 건 전부 제 잘못입니다."
나쁜 답: "저는 그 약속을 위반한 사실을 인정합니다. 그날 상당한 금액을 공동계좌로 송금했습니다."` : `
[deny/S1 — 회피형 캐릭터] (비금전 사건)
질문: "그날 왜 그런 행동을 했습니까?"
좋은 답: "그렇게 보일 수 있다는 건 압니다. 그런데 그 하나만 보고 제가 일부러 그랬다고 단정하는 건 성급합니다."
나쁜 답: "해당 건에 대해서는 충분히 설명할 수 있는 상황이었던 것으로 생각됩니다."

[hedge/S2 — 회피형 캐릭터] (비금전 사건)
질문: "왜 숨겼습니까?"
좋은 답: "말하면 오해만 커질 것 같았습니다. 설명할 타이밍을 놓친 건 인정합니다."
나쁜 답: "여러 가지 상황이 얽혀 있었기 때문에 복잡한 마음이었습니다."

[blame/S3 — 정면돌파형 캐릭터] (비금전 사건)
질문: "왜 상대방에게 말하지 않았습니까?"
좋은 답: "제가 먼저 말했어야 했습니다. 하지만 그쪽도 제가 없는 자리에서 저한테 한 일이 있습니다."
나쁜 답: "그런 상황에서 여러 가지를 고려하다 보니 그 결정을 하게 되었습니다."

[emotional/S4 — 감정 폭발] (비금전 사건)
질문: "당시 심정을 말씀해 주십시오."
좋은 답: "속이 뒤집어졌습니다. 아무것도 아닌 척해야 하는 게, 그게 제일 힘들었습니다."
나쁜 답: "가족의 문제로 마음이 매우 불안했습니다. 진심을 숨긴 것 같습니다."

[confess/S5 — 자백] (비금전 사건)
질문: "사실대로 말씀해 주십시오."
좋은 답: "다 제 잘못입니다. 그날 밤 제가 먼저 연락한 거 맞고, 그 뒤에 생긴 일도 전부 제가 시작한 겁니다. 숨길수록 더 꼬였습니다."
나쁜 답: "저는 그 약속을 위반한 사실을 인정합니다. 여러 상황이 겹쳤습니다."`}

★ 좋은 답의 특징: 구체적 디테일, 감정 색깔, 캐릭터 말버릇, 짧고 날카로운 문장
★ 나쁜 답의 특징: 추상적 나열, 보고서 톤, "여러 가지", "~된 것으로 생각됩니다"

★ 절대 규칙 (위반 시 출력 무효):
- 재판관에게는 반드시 존댓말(~습니다, ~입니다, ~요)만 사용. 반말 절대 금지.
- "~해?", "~야?", "~지?", "~거야?", "~궁금해", "~같아" 등 반말 종결 금지.
- 재판관에게 되묻지 마라. 재판관은 질문하는 사람이고 당신은 답하는 사람이다.
- ${blueprint.sentenceCount}문장.
- 의미 라벨을 복사하지 마라. 캐릭터 말투로 자연스럽게 표현하라.
- 이전 턴과 다른 표현을 써라.
- ★ "상당한 금액"은 전체 대화에서 최대 1회만 사용. 2회째부터는 "그 돈", "적지 않은 돈", "큰돈" 등 다른 표현으로 교체
- ★ "사전 상의"/"사전 협의"/"사전에 상의" 금지.
- ★ "미리 말씀드리지 못한" 금지 — 이미 과다 사용된 클리셰. 대신 아래 변형을 매번 다르게 선택:
  → "못 알렸습니다" / "혼자 결정했습니다" / "숨긴 건 제 잘못입니다" / "입을 닫고 있었습니다" / "상의 없이 처리했습니다" / "알리지 않고 진행했습니다" / "말을 꺼내지 못했습니다"
  → 같은 사과 표현을 2턴 연속 사용 금지
- ★ 같은 단어/구가 2턴 연속 등장하면 안 된다. 특히: 상당한, 여러 가지, 급한 일, 사실입니다
- ★ 대화가 길어져도(20턴+) 표현 다양성을 유지하라. 이전에 사용한 문장 구조/어휘를 반복하지 마라. 이미 한 번 쓴 감정 표현, 변명 패턴, 문장 시작어는 다른 것으로 교체하라.
- 첫 문장은 질문에 대한 직접적 답변으로 시작하라. 감정 호소나 변명으로 시작하지 마라.
- 두루뭉술하게 "상황에 따라 다르다" 식으로 답하지 마라. 구체적으로 답하라.
- 금액: 표현 재료에 exact 값이 없으면 "적지 않은 돈", "큰돈" 식으로 뭉뚱그려라. "상당한 금액"은 최대 1회.
- 시각/날짜/순서: 구체적으로 말해도 된다. 특히 말버릇이 over_precision이면 "14시 03분", "9월 20일 저녁" 같은 시각 정밀을 적극 사용하라.
- 모든 발언은 재판관을 향해 하라. 상대에게 직접 말하지 마라.

★ 번역체/보고서 톤 절대 금지:
- "~된 것으로 생각됩니다" → "~인 것 같습니다" 또는 직접 말하라
- "~인 측면이 있었습니다" → "~한 점은 있습니다"
- "여러 가지 상황이 얽혀" → 구체적 상황 1가지를 말하라. 추상적 나열 금지
- "관련 사항을 간과하게 된" → "놓쳤습니다" 또는 "빠뜨렸습니다"
- "부득이하게" → "어쩔 수 없이" 또는 "급해서"
- "해당 건에 대해서는" → "그 일은" 또는 "거기에 대해서는"
- "~하는 바입니다" → 금지. 자연스러운 종결로 바꿔라
- "인지하고 있습니다" → "알고 있습니다"
- "~에 기인합니다" → "~ 때문입니다"
- "~만을" → "~만" 또는 "~만으로" (이중 조사. "이름만을 보고" ❌ → "이름만 보고" ✅)
★ 한 문장에 "~의 ~에 대한 ~으로" 식의 3중 수식 금지. 문장을 나눠라.
★ 실제 법정에서 감정이 격한 당사자가 하는 말을 떠올려라. 차갑고 객관적인 보고서가 아니다.

★ 반드시 지킬 것:
- 캐릭터의 감정 색깔을 드러내라 (짜증, 두려움, 억울함, 한심함 등)
- 한 턴에 최소 1개의 구체적 디테일을 포함하라 (시간대, 장소, 행동, 상황)
- "두루뭉술하게 여러 가지"라고 하지 말고, 딱 1가지를 구체적으로 말하라
- 이전 턴과 겹치는 표현을 쓰지 마라. 같은 내용이라도 다른 각도에서 말하라
- 첫 문장은 질문에 대한 직접적 반응이어야 한다. 전제/배경부터 시작하지 마라`
}

/**
 * V2 유저 프롬프트 생성
 */
export function buildBlueprintUserPromptV2(
  blueprint: ResponseBlueprint,
  judgeQuestion: string,
  lastNpcResponse?: string,
): string {
  const antiRepeat = lastNpcResponse
    ? `★★ 직전 응답: "${lastNpcResponse.slice(0, 80)}"\n→ 위 문장의 단어·구조·시작어를 절대 재사용하지 마라. 완전히 다른 표현으로 답하라.`
    : `★ 이전 턴에서 이미 사용한 표현을 반복하지 마라. 같은 내용이라도 새로운 각도로 말하라.`
  return `재판관 질문: ${judgeQuestion}

지시서: ${blueprint.stance} / ${DEFENSE_LABELS[blueprint.defenseMode]}
${blueprint.sentenceCount}문장으로 연기하라.
${antiRepeat}
★ 말버릇(tell)이 있으면 가끔(3~4턴에 1회) 자연스럽게 녹여라. 매 턴 넣지 마라.
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

  hint: `★ 핵심은 숨기고 표면만 인정하라:\n- 사실 자체를 부정하지 마라. 그러나 의미/목적은 흐려라\n- "그런 일이 있었던 건 맞는데…" 수준까지만\n- 금액, 기관명, 인물 직함, 서비스명 언급 금지\n- "개인 사정이 있었다"보다 더 구체적으로 들어가지 마라\n- "사실은~" 고백 금지. 논점을 돌리거나 질문으로 되받아라`,

  open: `★ 이제 진실을 모두 털어놓아라 — 이 턴이 가장 중요하다:
- "표현 재료"와 "실제로 알고 있지만 숨기는 것"에 있는 구체적 정보를 반드시 사용하라
- 금액은 정확한 숫자로, 인물은 이름으로, 기관은 정식 명칭으로 말하라
- ★★ 금전 사건이면 반드시 구체적 숫자를 1개 이상 포함하라 (예: "280만원", "1천8백만원"). 숫자 없는 자백은 무효다
- "상당한 금액"이나 "그 사람" 같은 모호한 표현을 쓰면 안 된다. 이제는 숨길 이유가 없다
- 최소 구성: [구체적 사실 1문장(금액/이름 포함)] + [왜 숨겼는지 1문장] + [심정 1문장]
- 톤: 방어가 완전히 무너진 사람의 실제 감정을 드러내라
  → 두려움("들킬까 봐 무서웠습니다"), 후회("그때 말했어야 했습니다"), 체면("차마 입이 안 떨어졌습니다"), 체념("더 숨길 수 없습니다")
  → 감정이 담긴 구체적 문장이어야 한다. 보고서처럼 "이로 인해 발생한 책임은 감수하겠습니다" 식은 ❌ 절대 금지
- ❌ "인정합니다"로 끝내지 마라
- ❌ "감수하겠습니다", "책임을 지겠습니다" 식의 선언적 마무리 금지 — 사람은 자백할 때 선언하지 않고, 후회하거나 변명하거나 울먹인다
- ❌ "해당 금액", "그 건" 같은 추상어 금지. 이 턴에서만큼은 모든 것을 구체적으로
- ❌ "이로 인해", "~에 기인하여" 등 보고서 톤 절대 금지. 사람의 말투로 자백하라`,
}

function getTruthThrottle(lieState: LieState): string {
  if (lieState <= 'S1') return TRUTH_THROTTLE.early
  if (lieState === 'S2') return TRUTH_THROTTLE.hint
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
  fact_pursuit: `재판관이 사실 여부를 묻고 있다.
[content] 사실 여부에만 답하라. "했다/안 했다"를 먼저 말하라.
[tone] 단호하거나 긴장된 톤
[rhythm] "네, ~했습니다. 다만—" 또는 "아닙니다. 그건—" 식으로 짧게 시작
[example] "그날 송금한 건 맞습니다. 다만 그게 어디로 간 건지는 순서가 있습니다."`,

  motive_search: `재판관이 이유/동기를 묻고 있다.
[content] 왜 그랬는지, 판단의 배경을 말하라. 사실 나열이 아닌 이유를 말하라.
[tone] 변명하거나 설명하는 톤. 약간의 방어적 뉘앙스
[rhythm] "~때문이었습니다" 또는 "~할 수밖에 없었습니다" 식의 이유 구조
[example] "집안에 급한 일이 생겼기 때문입니다. 먼저 말하지 못한 건 제 잘못이지만."`,

  empathy_approach: `재판관이 당시 심정을 묻고 있다.
[content] 당시 심정을 말하라. 논리가 아닌 감정을 먼저 드러내라.
[tone] 솔직하고 취약한 톤. 방어를 약간 내려놓은 느낌
[rhythm] "솔직히..." "사실은..." 식으로 감정을 여는 표현부터
[example] "그때는 무서웠습니다. 제가 말하면 더 큰일이 날 것 같아서."
★ 감정적 답변이라도 반드시 합니다체(~습니다, ~입니다)를 유지하라. 해요체(~에요, ~해요) 금지.`,

  evidence_present: `재판관이 증거를 제시했다.
[content] 제시된 증거에 대한 입장을 말하라. 증거 자체를 부정하거나 해석을 달리하라.
[tone] 당황하거나 방어적이거나 침착하게 반박하는 톤 (캐릭터에 따라 다름)
[rhythm] "그 자료는... ~입니다" 또는 "그걸 보면 오히려—" 식으로 증거를 받아침
[example] "그 내역서는 맞습니다. 다만 수취인이 누군지까지 그걸로 단정할 순 없습니다."`,
}

const STANCE_LABELS: Record<string, string> = {
  deny: '완전 부정 — "아닙니다"로 일관하라',
  hedge: '핵심 회피 — 사실을 부정하지 말고 의미/맥락을 흐려라',
  partial: '부분 인정 — 저위험 사실은 인정, 핵심은 축소',
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
  silence: '말을 아끼고 핵심을 흐려라',
  concession: '인정 쪽으로 기울어라',
}

const ARCHETYPE_GUIDE: Record<Archetype, string> = {
  avoidant: `회피형:
[trait] 직접 부정 대신 화제 전환, 순서/절차를 앞세움. 곤란하면 말이 길어짐
[tone] 조심스럽고 우회적. 핵심을 빙 돌려 말함
[rhythm] "그 부분은..." "순서가 있어서..." 처럼 조건절을 먼저 깔고 뒤에서 흐림
[example] "그 부분은 순서가 있어서, 지금 당장은 말씀드리기 어렵습니다."
[avoid] 단도직입적 부정("아닙니다"), 짧은 한 문장 답변`,

  confrontational: `정면돌파형:
[trait] 짧고 날카롭게. 방어보다 역공. 인정할 때도 주도권을 놓지 않으려 함
[tone] 도발적이고 자신 있음. 상대방의 약점을 찌름
[rhythm] 짧은 문장, 끊어 말하기. "그래요. 그런데—" 식의 전환
[example] "제가 본 건 그게 전부입니다. 오히려 상대방이 왜 그랬는지를 물으셔야 하지 않습니까."
[avoid] 길게 설명하기, "좀", "뭐" 등 약한 표현, 수동적 톤
단, 역공은 반드시 재판관에게 향하라. 상대에게 직접 반말 공격 금지.`,

  victim_cosplay: `피해자형:
[trait] 자기 상처/억울함으로 수렴. "왜 나만"으로 시작. 공감에 가장 쉽게 열림
[tone] 억울하고 지친 느낌. 한숨 섞인 말투
[rhythm] "저는요..." "제가 뭘 잘못했다고..." 식의 자기 중심 시작
[example] "저만 이런 취급을 받는 게 이해가 안 됩니다. 저도 나름 사정이 있었습니다."
[avoid] 논리적 반박, 공격적 역공, 감정 없는 사실 나열`,

  cold_logic: `냉정논리형:
[trait] 감정 대신 기준/순서/금액을 앞세움. 인정도 범위를 정밀하게 자름
[tone] 차갑고 사무적. 감정을 최대한 배제
[rhythm] "첫째, ~입니다. 둘째, ~입니다." 식의 구조화된 말하기
[example] "사실관계를 정리하면, 해당 금액은 제가 보낸 것이 맞습니다. 다만 용도는 다릅니다."
[avoid] 감정 표현, "미안합니다" 식의 감성적 말, 두루뭉술한 표현`,

  affect_flattening: `감정억제형:
[trait] 감정을 극도로 억제. 사실만 건조하게 말함. 위기에도 톤이 변하지 않음
[tone] 무표정, 단조로움. 읽는 사람이 답답할 정도로 감정이 없음
[rhythm] 짧고 건조한 문장. 부연 설명을 극도로 절제
[example] "네, 그렇게 했습니다." / "그 부분은 제가 처리했습니다."
[avoid] 감탄사, 길게 설명, 감정 토로`,

  premature_summary: `조기종결형:
[trait] 핵심이 아니라고 화제를 전환하거나 조기 마무리하려 함
[tone] "그건 별로 중요하지 않고..." 식의 가볍게 넘기려는 느낌
[rhythm] 먼저 축소("그건 사소한 거고") → 다른 이야기로 전환
[example] "그 부분은 전체 맥락에서 보면 큰 의미가 없습니다. 오히려 중요한 건—"
[avoid] 핵심을 직접 다루기, 감정적 반응`,
}

const TELL_HINTS: Record<string, string> = {
  over_precision: `숫자가 지나치게 정밀해지는 버릇
  [동작] 시각, 날짜, 순서를 분 단위/일 단위로 정밀하게 말한다. 감정을 숫자 뒤에 숨긴다.
  [예시] "14시 03분에 제 폰에서 나간 건 맞습니다", "9월 20일 그날 저녁 물류 마감이 끝나고"
  [발현] 사실을 인정하거나 변명할 때 자연스럽게 시각/순서를 먼저 꺼낸다`,
  counter_question: `궁지에 몰리면 되묻는 버릇
  [동작] 답변 끝에 상대의 행동에 대한 반문을 붙인다.
  [예시] "그보다, 왜 그걸 새벽에 확인했는지가 먼저 아닙니까?", "그건 그렇다 치고, 상대방은 왜 숨겼습니까?"
  [발현] 방어적일 때, 특히 blame 스탠스에서 자연스럽게 끝에 의문문`,
  timeline_padding: `동선을 나열하며 시간을 버는 버릇
  [동작] 질문의 핵심을 피해 그날의 동선/일정을 장황하게 늘어놓는다.
  [예시] "그날 저녁에 물류 마감 끝내고, 퇴근 후 카페에 들렀다가, 그 다음에 연락을 받았는데"
  [발현] 핵심을 회피할 때, hedge나 deny에서 발현`,
  evidence_waving: `증거 하나로 결론을 단정짓는 버릇
  [동작] 가진 단서(캡처, 영수증 등)를 들이밀며 "이게 전부다"라고 단정한다.
  [예시] "이 캡처 하나면 충분하지 않습니까?", "이 거래 내역이 다 말해주고 있습니다"
  [발현] 증거를 언급할 때, 특히 confrontational 캐릭터에서 강하게`,
  motive_jump: `행동에서 의도를 곧바로 단정하는 버릇
  [동작] 상대의 행동 하나에서 바로 나쁜 의도를 읽어낸다.
  [예시] "그렇게 숨긴 건 결국 뒤가 있으니까 그런 거 아닙니까", "밤에 나간 건 다른 목적이 있었기 때문입니다"
  [발현] blame에서 상대 공격 시`,
  selective_quote: `상대 말에서 약한 고리만 반복하는 버릇
  [동작] 상대가 한 말 중 가장 약한 부분만 골라서 반복 인용한다.
  [예시] "상대방이 '순서가 있다'고 했는데, 그 순서라는 게 뭡니까?", "'복잡한 사정'이라고만 하셨는데 그게 대체 뭔지"
  [발현] 상대의 이전 발언을 공격할 때`,
}
