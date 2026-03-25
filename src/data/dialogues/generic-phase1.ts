import type { DialogueEntry } from '../../types'
import type { CaseData } from '../../types'

/**
 * LLM 없이 생성 사건의 Phase 1 대사를 만드는 범용 템플릿.
 * 사건 데이터에서 이름, 쟁점, 배경을 가져와 동적으로 구성한다.
 */
export function buildGenericPhase1(caseData: CaseData): Omit<DialogueEntry, 'id'>[] {
  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const disputes = caseData.disputes
  const context = caseData.context.description

  // 핵심 쟁점 2개 선택 (weight high 우선)
  const sorted = [...disputes].sort((a, b) => {
    const w = { high: 3, medium: 2, low: 1 }
    return (w[b.weight] ?? 0) - (w[a.weight] ?? 0)
  })
  const main = sorted[0]
  const sub = sorted[1]

  return [
    { speaker: 'system', text: '양측의 초기 진술을 듣겠습니다.', relatedDisputes: [], turn: 0 },
    {
      speaker: 'a',
      text: `재판관님, 저는 억울합니다. ${nameB} 씨가 상황을 왜곡하고 있습니다. ${main?.name ?? '이 문제'}에 대해 먼저 말씀드리겠습니다.`,
      relatedDisputes: main ? [main.id] : [],
      turn: 0,
      behaviorHint: '신중하게 말을 시작한다.',
    },
    {
      speaker: 'b',
      text: `왜곡이요? ${nameA} 씨야말로 사실을 숨기고 있잖아요!`,
      relatedDisputes: main ? [main.id] : [],
      turn: 0,
      behaviorHint: '참지 못하고 끼어든다.',
    },
    {
      speaker: 'a',
      text: `지금 제 차례입니다. 재판관님, 배경을 설명드리면... ${context.slice(0, 80)}`,
      relatedDisputes: [],
      turn: 0,
    },
    {
      speaker: 'b',
      text: `배경이요? ${main?.name ?? '이 일'}을 숨기려고 돌려 말하는 거 아니에요?`,
      relatedDisputes: main ? [main.id] : [],
      turn: 0,
      behaviorHint: '의심하는 눈빛.',
    },
    {
      speaker: 'a',
      text: `그건 ${nameB} 씨가 오해하는 겁니다. 저는 나름의 이유가 있었어요.`,
      relatedDisputes: main ? [main.id] : [],
      turn: 0,
      behaviorHint: '말끝을 흐린다.',
    },
    ...(sub ? [
      {
        speaker: 'b' as const,
        text: `이유요? 그럼 ${sub.name}은 어떻게 설명할 건데요? 그것도 이유가 있었나요?`,
        relatedDisputes: [sub.id],
        turn: 0,
        behaviorHint: '두 번째 쟁점을 끌어온다.',
      },
      {
        speaker: 'a' as const,
        text: `그건... 지금 그 얘기가 아니잖아요.`,
        relatedDisputes: [sub.id],
        turn: 0,
        behaviorHint: '화제를 전환하려 한다.',
      },
    ] : []),
    {
      speaker: 'b',
      text: `재판관님, 이 사람은 맨날 이래요. 숨기고, 돌려 말하고, 들키면 변명하고.`,
      relatedDisputes: [],
      turn: 0,
      behaviorHint: '감정이 격해진다.',
    },
    { speaker: 'system', text: '양측 모두 진정해 주십시오.', relatedDisputes: [], turn: 0 },
    {
      speaker: 'b',
      text: `정리하면요. ${main?.name ?? '핵심 문제'}에 대해 ${nameA} 씨가 숨기고 있는 게 있고, 저는 진실을 알 권리가 있습니다.`,
      relatedDisputes: main ? [main.id] : [],
      turn: 0,
      behaviorHint: '감정을 누르며 정리한다.',
    },
  ]
}

export function buildGenericPhase2(caseData: CaseData): Omit<DialogueEntry, 'id'>[] {
  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name

  return [
    { speaker: 'system', text: '양측에게 반박 기회를 드리겠습니다.', relatedDisputes: [], turn: 0 },
    {
      speaker: 'a',
      text: `${nameB} 씨가 감정적으로 몰아가고 있습니다. 사실만 보면 다릅니다.`,
      relatedDisputes: [],
      turn: 0,
      behaviorHint: '침착을 유지하려 한다.',
    },
    {
      speaker: 'b',
      text: `감정적이라고요? 이게 감정의 문제인가요?`,
      relatedDisputes: [],
      turn: 0,
      behaviorHint: '목소리가 높아진다.',
    },
    {
      speaker: 'a',
      text: `저도 할 말이 있습니다. ${nameB} 씨도 완전히 깨끗한 건 아니잖아요.`,
      relatedDisputes: [],
      turn: 0,
      behaviorHint: '반격을 시작한다.',
    },
    {
      speaker: 'b',
      text: `뭐가요? 구체적으로 말해보세요!`,
      relatedDisputes: [],
      turn: 0,
    },
    {
      speaker: 'a',
      text: `그건... 심문 때 말씀드리겠습니다.`,
      relatedDisputes: [],
      turn: 0,
      behaviorHint: '시선을 피한다.',
    },
    {
      speaker: 'b',
      text: `봐요, 또 숨기잖아요!`,
      relatedDisputes: [],
      turn: 0,
      behaviorHint: '분노가 터진다.',
    },
    { speaker: 'system', text: '반박이 종료되었습니다. 재판관의 심문이 시작됩니다.', relatedDisputes: [], turn: 0 },
  ]
}
