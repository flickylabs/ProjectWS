/**
 * spouse-01 증인 다층 증언 데이터
 *
 * 경비원(w-1): 오피스텔 방문 관련 — 질문 방향에 따라 이준호에 유/불리 분기
 * 은행원(w-2): 비자금 출금 + 적금 해지 — Hidden 쟁점 상태에 따라 분기
 * 박미라(w-3): 박지연 친구 — 투자 사기 경위 + 감정 맥락
 */
import type { TestimonySlot } from '../../types/witnessTestimony'

export const SPOUSE_01_TESTIMONY: TestimonySlot[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 경비원 (w-1) — 오피스텔 방문
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 1차 — 선택지 2개
  {
    id: 'w1-d1-visit-freq',
    witnessId: 'w-1',
    topic: '방문 빈도를 묻는다',
    question: '이준호 씨가 이 오피스텔에 얼마나 자주 방문했습니까?',
    depth: 1,
    testimony: '일주일에 두세 번은 오셨어요. 보통 저녁 7시쯤 들어오셔서 밤 10시쯤 나가셨습니다. 꽤 규칙적이었어요.',
    behaviorHint: '사실대로 담담하게',
    effect: {
      favorDirection: 'pro_a',
      relatedDisputes: ['d-1'],
      emotionDelta: 5,
    },
  },
  {
    id: 'w1-d1-resident-info',
    witnessId: 'w-1',
    topic: '해당 층 거주자를 묻는다',
    question: '이준호 씨가 방문하는 층에는 어떤 분들이 살고 있습니까?',
    depth: 1,
    testimony: '그 층은 대부분 야간에 일하는 분들이 많아서 저녁 시간에도 거의 모든 집이 불이 꺼져있을 때가 많습니다.',
    behaviorHint: '기억을 떠올리며',
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-1'],
    },
  },

  // 2차 — 1차 선택에 따라 분기
  {
    id: 'w1-d1-no-single-woman',
    witnessId: 'w-1',
    topic: '그 층 거주자 구성을 묻는다',
    question: '방문 빈도는 알겠습니다. 그런데 그 층에 혼자 사는 여성이 있습니까?',
    depth: 2,
    testimony: '그 층에 여자 혼자 사는 집은 없는 것 같아요. 여자 분들은 커플이 대부분이고, 아니면 남자 혼자 사는 분들이 대부분입니다.',
    behaviorHint: '확신을 가지고',
    conditions: {
      prevSlotRequired: 'w1-d1-visit-freq',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-1'],
    },
  },

  // 3차 — 핵심 (lieState S2+ 필요)
  {
    id: 'w1-d1-core',
    witnessId: 'w-1',
    topic: '302호 거주자에 대해 묻는다',
    question: '302호에 사는 분에 대해 좀 더 자세히 알려주시겠습니까?',
    depth: 3,
    testimony: '집주인 분께서 숨기시는 듯해서 모르는 척 했지만, 302호는 중학교 교복을 입은 아이와 함께 살고 계신 것으로 알고있습니다. 방문하신 분께 작은아버지라고 부르는 것도 들었구요.',
    behaviorHint: '조심스럽지만 확신',
    conditions: {
      disputeState: { id: 'd-1', minLieState: 'S2', visibility: 'any' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-1'],
      // d-1(외도 의혹) 자백 영역 = 이준호(B). 박지연(A)은 오해한 쪽으로 자백 영역 X.
      // 증인 결정타가 이준호 lieState를 흔들어 S5 자백 발동 유도 (사용자 지적 2026-05-21).
      lieStateNudge: { party: 'b', dispute: 'd-1' },
      emotionDelta: 8,
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 은행원 (w-2) — 비자금 + 적금 해지
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 1차 — 선택지 2개 (하나는 Hidden 쟁점 트리거 가능)
  {
    id: 'w2-d2-cash-withdrawal',
    witnessId: 'w-2',
    topic: '이준호의 현금 출금에 대해 묻는다',
    question: '이준호 씨의 계좌에서 큰 금액이 출금된 적이 있습니까?',
    depth: 1,
    testimony: '네, 수개월에 걸쳐 여러 차례 큰 금액을 현금으로 출금하셨어요. 계좌 이체가 아니라 전부 현금이었기 때문에 기억합니다. 총 3천만 원 정도였습니다.',
    behaviorHint: '업무적으로 정확하게',
    effect: {
      favorDirection: 'pro_a',
      relatedDisputes: ['d-2'],
      emotionDelta: 5,
    },
  },
  {
    id: 'w2-hd3-savings-cancel',
    witnessId: 'w-2',
    topic: '공동 적금 해지 건에 대해 묻는다',
    question: '이 부부의 공동 적금이 해지된 적이 있습니까?',
    depth: 1,
    testimony: '네, 공동명의 정기적금이 중도 해지됐습니다. 박지연 씨가 위임장을 가져오셔서 처리했어요.',
    behaviorHint: '신중하게',
    // Hidden이 아직 숨겨져 있으면 이 증언으로 발현
    conditions: {
      disputeState: { id: 'h-d3', visibility: 'hidden' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['h-d3'],
      emergenceTrigger: 'h-d3',
    },
  },
  {
    id: 'w2-hd3-savings-cancel-known',
    witnessId: 'w-2',
    topic: '적금 해지 위임장에 대해 묻는다',
    question: '적금 해지 시 위임장에 문제는 없었습니까?',
    depth: 1,
    testimony: '사실 위임장 서명이 좀 달라 보였습니다. 한번 더 확인하려고 했는데, 급하다고 하셔서 그냥 처리했어요.',
    behaviorHint: '약간 불안해하며',
    // Hidden이 이미 발현된 경우 → 바로 심층으로
    conditions: {
      disputeState: { id: 'h-d3', visibility: 'emerged' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['h-d3'],
    },
  },

  // 2차 — 비자금 심층
  {
    id: 'w2-d2-cash-pattern',
    witnessId: 'w-2',
    topic: '출금 패턴에 대해 묻는다',
    question: '현금 출금의 패턴이 어땠습니까? 한꺼번에? 나눠서?',
    depth: 2,
    testimony: '4개월에 걸쳐 나눠서 출금하셨어요. 500, 800, 700, 1000만 원. 금액이 커서 ATM으로 출금이 불가하여 창구에서 직접 출금하셨어요. 계좌 이체를 안 하시는 게 좀 특이하게 느껴졌습니다.',
    behaviorHint: '기록을 확인하듯 정확하게',
    conditions: {
      prevSlotRequired: 'w2-d2-cash-withdrawal',
    },
    effect: {
      favorDirection: 'pro_a',
      relatedDisputes: ['d-2'],
    },
  },

  // 2차 — 적금 해지 심층 (Hidden 발현 후)
  {
    id: 'w2-hd3-signature-doubt',
    witnessId: 'w-2',
    topic: '위임장 서명의 문제를 묻는다',
    question: '서명이 달랐다는 게 구체적으로 어떤 부분이었습니까?',
    depth: 2,
    testimony: '서명이 느낌상 달라보이긴 했는데, 제가 필적 감정사도 아니고 확신할 수는 없었습니다. 다만, 그래도 부부이시고 서류를 모두 갖추셨으니 문제 없을 것이라고 생각했습니다.',
    behaviorHint: '조심스럽게',
    conditions: {
      disputeState: { id: 'h-d3', visibility: 'emerged' },
      prevSlotRequired: 'w2-hd3-savings-cancel',
      prevChoiceRequired: 'w2-hd3-savings-cancel',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['h-d3'],
      lieStateNudge: { party: 'a', dispute: 'h-d3' },
    },
  },

  // 3차 — 핵심
  {
    id: 'w2-hd3-core',
    witnessId: 'w-2',
    topic: '이후 남편의 반응을 묻는다',
    question: '이준호 씨가 나중에 적금 해지 건으로 은행에 온 적이 있습니까?',
    depth: 3,
    testimony: '네, 몇 주 뒤에 남편 분이 오셔서 "적금을 해지한 적이 없다"고 하셨어요. 상당히 놀라신 표정이었습니다. 그때 저도 "아, 위임장이 문제였구나" 싶었습니다.',
    behaviorHint: '기억이 선명하게',
    conditions: {
      disputeState: { id: 'h-d3', visibility: 'emerged', minLieState: 'S2' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['h-d3', 'h-d4'],
      lieStateNudge: { party: 'a', dispute: 'h-d3' },
      emotionDelta: 10,
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 박미라 (w-3) — 박지연 친구, 투자방 경위
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 1차
  {
    id: 'w3-motive-suspicion',
    witnessId: 'w-3',
    topic: '박지연의 심리 상태를 묻는다',
    question: '박지연 씨가 남편에 대해 어떤 이야기를 하던가요?',
    depth: 1,
    testimony: '지연이가 "남편이 바람피면 내 돈부터 지키겠다"고 했어요. 남편 통장에서 큰 돈이 빠지는 걸 보고 되게 불안해하더라고요.',
    behaviorHint: '친구를 걱정하며',
    effect: {
      favorDirection: 'mixed',
      relatedDisputes: ['d-1', 'd-2'],
      emotionDelta: 3,
    },
  },
  {
    id: 'w3-investment-link',
    witnessId: 'w-3',
    topic: '투자방에 대해 묻는다',
    question: '투자방 이야기가 나왔는데, 박지연 씨가 어떻게 투자방에 들어가게 됐습니까?',
    depth: 1,
    testimony: '그게... 제가 링크를 보내긴 했어요. 수익이 좋다고 소문이 나서. 근데 그렇게 큰 돈을 넣을 줄은 정말 몰랐습니다.',
    behaviorHint: '미안해하며 머뭇거리며',
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['h-d3'],
    },
  },

  // 2차
  {
    id: 'w3-money-amount',
    witnessId: 'w-3',
    topic: '투자 금액에 대해 묻는다',
    question: '박지연 씨가 얼마를 투자했는지 알고 있습니까?',
    depth: 2,
    testimony: '나중에 들으니 2천만 원이었대요. 적금을 깨서 넣었다고... 저도 그 말 듣고 깜짝 놀랐어요.',
    behaviorHint: '충격받은 표정으로',
    conditions: {
      prevSlotRequired: 'w3-investment-link',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['h-d3'],
      emotionDelta: 5,
    },
  },

  // 3차 — 핵심 (감정적)
  {
    id: 'w3-aftermath-call',
    witnessId: 'w-3',
    topic: '투자 결과를 묻는다',
    question: '투자 결과는 어떻게 됐습니까?',
    depth: 3,
    testimony: '지연이가 새벽에 울면서 전화했어요. "돈이 다 날아갔다"고. 운영자가 채팅방을 나가버렸대요. 남편한테는 절대 말 못 한다고... 저한테 "제발 비밀로 해달라"고 하더라고요.',
    behaviorHint: '친구를 안타까워하며 눈물을 참으며',
    conditions: {
      disputeState: { id: 'h-d3', visibility: 'emerged' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['h-d3'],
      lieStateNudge: { party: 'a', dispute: 'h-d3' },
      emotionDelta: 12,
    },
  },
]
