/**
 * friend-01 증인 다층 증언 데이터
 *
 * 공통 친구(w-1): 단톡방 낙인과 명예 훼손의 시작점
 * 직장 후배(w-2): 예비신랑의 선 넘는 접근과 연락 맥락
 * 카페 사장(w-3): 송다은 아버지의 돈 접근과 과거 손절의 실제 계기
 */
import type { TestimonySlot } from '../../types/witnessTestimony'

export const FRIEND_01_TESTIMONY: TestimonySlot[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 공통 친구 (w-1) — 단톡방 낙인, 명예 훼손
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 1차 — 선택지 2개
  {
    id: 'w1-d1-chat-mood',
    witnessId: 'w-1',
    topic: '단톡방 분위기를 묻는다',
    question: '그 캡처가 올라온 직후 단톡방 분위기가 어떻게 흘렀습니까?',
    depth: 1,
    testimony: '처음엔 다들 놀랐어요. 연락 횟수만 보이니까 솔직히 저도 수민이가 선을 넘은 걸로 생각했습니다.',
    behaviorHint: '머쓱해하며 솔직하게',
    effect: {
      favorDirection: 'pro_a',
      relatedDisputes: ['d-1', 'd-5'],
      emotionDelta: 4,
    },
  },
  {
    id: 'w1-d1-frame-wording',
    witnessId: 'w-1',
    topic: '처음 붙은 말의 방향을 묻는다',
    question: '송다은 씨가 그 캡처를 올릴 때 어떤 식으로 설명했습니까?',
    depth: 1,
    testimony: '그냥 기록만 올린 게 아니라, 예전에도 계속 비슷했다는 식으로 말이 번졌습니다. 그래서 분위기가 더 한쪽으로 쏠렸어요.',
    behaviorHint: '기억을 더듬으며',
    effect: {
      favorDirection: 'mixed',
      relatedDisputes: ['d-1', 'd-5'],
      emotionDelta: 5,
    },
  },

  // 2차 — 1차 선택에 따라 분기
  {
    id: 'w1-d2-no-one-checked',
    witnessId: 'w-1',
    topic: '직접 확인한 사람이 있었는지 묻는다',
    question: '그 뒤에 최수민 씨에게 직접 사정을 물은 사람이 있었습니까?',
    depth: 2,
    testimony: '없었습니다. 다들 캡처를 보고 바로 편이 갈렸어요. 저도 그때는 분위기에 눌려서 따로 연락을 못 했습니다.',
    behaviorHint: '미안해하며',
    conditions: {
      prevSlotRequired: 'w1-d1-chat-mood',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-5'],
      lieStateNudge: { party: 'a', dispute: 'd-5' },
      emotionDelta: 6,
    },
  },
  {
    id: 'w1-d2-blame-spread',
    witnessId: 'w-1',
    topic: '비난이 번진 속도를 묻는다',
    question: '그 말이 붙은 뒤 비난은 얼마나 빨리 번졌습니까?',
    depth: 2,
    testimony: '몇 분 만에 벌어졌어요. 다은이가 “수민이가 내 남자한테 또 연락하고 있다”고 올리자, 바로 “결혼을 앞두고 있는데 왜 또 저러냐”는 말이 쏟아졌습니다.',
    behaviorHint: '답답해하며',
    conditions: {
      prevSlotRequired: 'w1-d1-frame-wording',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-5', 'd-1'],
      lieStateNudge: { party: 'a', dispute: 'd-5' },
      emotionDelta: 7,
    },
  },

  // 3차 — 핵심
  {
    id: 'w1-d3-first-conclusion',
    witnessId: 'w-1',
    topic: '누가 먼저 결론을 만들었는지 묻는다',
    question: '증인 기준으로 답하십시오. 그날 누가 먼저 결론을 만들어 버렸습니까?',
    depth: 3,
    testimony: '순서가 분명했습니다. 다은이 얘기로만 상황을 판단했고, 그 말이 단톡방 기준이 돼버렸어요. 수민이 얘기는 아무도 듣지 않았습니다.',
    behaviorHint: '미안함을 담아 단호하게',
    conditions: {
      disputeState: { id: 'd-5', minLieState: 'S2', visibility: 'any' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-5', 'd-1'],
      lieStateNudge: { party: 'a', dispute: 'd-5' },
      emotionDelta: 9,
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 직장 후배/동료 (w-2) — 예비신랑의 접근, 연락 맥락
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 1차 — 선택지 2개
  {
    id: 'w2-d1-after-work-talk',
    witnessId: 'w-2',
    topic: '회식 뒤 언급을 묻는다',
    question: '회식 자리 뒤에 선배가 최수민 씨 이야기를 꺼낸 적이 있습니까?',
    depth: 1,
    testimony: '네, 그분 얘길 한 적 있습니다. 처음엔 그냥 호감 정도로 가볍게 말하는 줄 알았어요.',
    behaviorHint: '조심스럽게',
    effect: {
      favorDirection: 'mixed',
      relatedDisputes: ['d-2'],
      emotionDelta: 4,
    },
  },
  {
    id: 'w2-d1-contact-reaction',
    witnessId: 'w-2',
    topic: '문제 뒤 반응을 묻는다',
    question: '연락 문제가 불거진 뒤 선배 반응은 어땠습니까?',
    depth: 1,
    testimony: '겉으로는 귀찮다는 식이었어요. 그런데 억울해서 화내는 사람보다는, 불편해하는 쪽에 더 가까워 보였습니다.',
    behaviorHint: '눈치를 보며',
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-1', 'd-2'],
      emotionDelta: 5,
    },
  },

  // 2차 — 1차 선택에 따라 분기
  {
    id: 'w2-d2-flirt-remark',
    witnessId: 'w-2',
    topic: '구체적으로 어떤 말을 했는지 묻는다',
    question: '호감이라고 하셨는데, 구체적으로 어떤 말을 했습니까?',
    depth: 2,
    testimony: '선배가 “그 필라테스 하는 친구 괜찮더라”, “다은이 친구만 아니었어도 진작 꼬셨을 텐데” 이런 말을 했습니다. 약혼한 사람이 할 말은 아니었어요.',
    behaviorHint: '못마땅해하며',
    conditions: {
      prevSlotRequired: 'w2-d1-after-work-talk',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-2'],
      lieStateNudge: { party: 'a', dispute: 'd-2' },
      emotionDelta: 7,
    },
  },
  {
    id: 'w2-d2-why-looked-caught',
    witnessId: 'w-2',
    topic: '왜 들킨 사람처럼 보였는지 묻는다',
    question: '왜 그렇게 보였는지, 들은 말을 기준으로 설명하십시오.',
    depth: 2,
    testimony: '선배가 저한테 “괜히 잘못 건드렸다가 일이 커졌다”는 식으로 툭 말한 적이 있어요. 그래서 저는 최수민 씨 연락이 갑자기 시작된 건 아니라고 봤습니다.',
    behaviorHint: '작게 한숨 쉬며',
    conditions: {
      prevSlotRequired: 'w2-d1-contact-reaction',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-1', 'd-2'],
      lieStateNudge: { party: 'a', dispute: 'd-1' },
      emotionDelta: 6,
    },
  },

  // 3차 — 핵심
  {
    id: 'w2-d3-rejection-ignored',
    witnessId: 'w-2',
    topic: '거절 뒤에도 선을 넘었는지 묻는다',
    question: '증인 판단이 아니라 본 장면으로 답하십시오. 선배가 먼저 선을 넘었다고 볼 정황이 있었습니까?',
    depth: 3,
    testimony: '있었습니다. 선배가 휴대폰을 보여주면서 “친구 남자친구니까 이러지 말라네” 하고 웃어넘긴 적이 있어요. 거절 답장을 받고도 “도도한 척 튕기네. 결국 넘어 올 거면서”라고 했습니다. 제가 본 건 최수민 씨 집착이 아니라, 선배 쪽의 가벼운 들이댐이었습니다.',
    behaviorHint: '불쾌했던 기억을 꺼내며',
    conditions: {
      disputeState: { id: 'd-2', minLieState: 'S2', visibility: 'any' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-2', 'd-1'],
      lieStateNudge: { party: 'a', dispute: 'd-1' },
      emotionDelta: 10,
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 카페 사장/동네 지인 (w-3) — 송다은 아버지의 돈 접근, 과거 손절
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 1차 — 선택지 2개
  {
    id: 'w3-d1-crying-scene',
    witnessId: 'w-3',
    topic: '그날 손님 상태를 묻는다',
    question: '몇 년 전 카페에서 그날, 최수민 씨 상태가 어땠습니까?',
    depth: 1,
    testimony: '젊은 손님 한 분이 대화 끝나고 혼자 남아서 한참 울었어요. 그냥 서운해서 우는 얼굴은 아니었습니다.',
    behaviorHint: '조심스럽게 회상하며',
    effect: {
      favorDirection: 'mixed',
      relatedDisputes: ['d-4'],
      emotionDelta: 4,
    },
  },
  {
    id: 'w3-d1-money-pressure',
    witnessId: 'w-3',
    topic: '대화 분위기를 묻는다',
    question: '그 자리 대화 분위기는 부탁에 가까웠습니까, 압박에 가까웠습니까?',
    depth: 1,
    testimony: '처음엔 부탁처럼 들렸는데, 들을수록 거절 못 하게 몰아붙이는 쪽에 가까웠어요. 돈 얘기라는 건 알겠더라고요.',
    behaviorHint: '찜찜해하며',
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-3'],
      emotionDelta: 5,
    },
  },

  // 2차 — 1차 선택에 따라 분기
  {
    id: 'w3-d2-overheard-phrase',
    witnessId: 'w-3',
    topic: '울기 전 들은 말을 묻는다',
    question: '울기 전에 어떤 말이 오갔는지 들은 게 있습니까?',
    depth: 2,
    testimony: '네. 그 남성분이 “한 번만 더 도와달라”고 했습니다. 그 젊은 분은 “왜 저한테 그러세요”라고 했고요. 한두 번 있었던 일 같지 않았습니다.',
    behaviorHint: '낮게 말하며',
    conditions: {
      prevSlotRequired: 'w3-d1-crying-scene',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-3', 'd-4'],
      lieStateNudge: { party: 'a', dispute: 'd-4' },
      emotionDelta: 7,
    },
  },
  {
    id: 'w3-d2-father-identity',
    witnessId: 'w-3',
    topic: '그 남성이 누구였는지 묻는다',
    question: '그 중년 남성이 누구였는지 나중에 알게 됐습니까?',
    depth: 2,
    testimony: '나중에 듣고 다은 씨 아버님인 걸 알았습니다. 며칠 뒤 제가 다은 씨한테 요새 자주 안 오시냐고 무슨 일 있으시냐고 묻자, “수민이랑 절교했다”는 말만 짧게 했습니다.',
    behaviorHint: '난처해하며',
    conditions: {
      prevSlotRequired: 'w3-d1-money-pressure',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-4', 'd-3'],
      lieStateNudge: { party: 'a', dispute: 'd-4' },
      emotionDelta: 6,
    },
  },

  // 3차 — 핵심
  {
    id: 'w3-d3-breakup-cause',
    witnessId: 'w-3',
    topic: '과거 손절 원인을 묻는다',
    question: '그날 장면을 기준으로 보면, 과거 손절 원인은 무엇에 더 가까워 보였습니까?',
    depth: 3,
    testimony: '제가 본 건 돈 문제였습니다. 다은 씨 아버님이 수민 씨에게 무리한 부탁을 한 듯하고, 수민 씨 혼자 무너진 것 같아요. 이건 두 친구가 아니라 아버님 쪽에 문제가 있었다고 생각해요.',
    behaviorHint: '신중하지만 단호하게',
    conditions: {
      disputeState: { id: 'd-4', minLieState: 'S2', visibility: 'any' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-4', 'd-3'],
      lieStateNudge: { party: 'a', dispute: 'd-4' },
      emotionDelta: 11,
    },
  },
]
