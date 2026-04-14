/**
 * family-01 증인 다층 증언 데이터
 *
 * 전 요양보호사(w-1): 어머니 상태와 유서 진행 과정의 분위기
 * 공증사무실 직원(w-2): 두 번 제출된 유서와 비율 변화의 방향
 * 어머니의 이웃(w-3): 생활비의 성격과 출생 비밀의 무게
 */
import type { TestimonySlot } from '../../types/witnessTestimony'

export const FAMILY_01_TESTIMONY: TestimonySlot[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 전 요양보호사 (w-1) — 어머니 판단력, 유서 과정
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 1차 — 선택지 2개
  {
    id: 'w1-d1-visit-comfort',
    witnessId: 'w-1',
    topic: '둘째 아들 방문 때 반응을 묻는다',
    question: '둘째 아들이 찾아오면 어머니 반응이 어땠습니까?',
    depth: 1,
    testimony: '그분 오시면 표정이 조금 풀리긴 했어요. 그래서 저는 처음엔 반가운 사람인가 보다 했습니다.',
    behaviorHint: '담담하게',
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-1'],
      emotionDelta: 4,
    },
  },
  {
    id: 'w1-d1-paper-reading',
    witnessId: 'w-1',
    topic: '문서를 읽어주는 장면을 묻는다',
    question: '문서를 읽어주는 장면을 본 적 있습니까?',
    depth: 1,
    testimony: '네, 종이 읽어드리는 건 몇 번 봤습니다. 그 장면만 놓고 보면 저도 좀 신경 쓰이긴 했어요.',
    behaviorHint: '조심스럽게',
    effect: {
      favorDirection: 'pro_a',
      relatedDisputes: ['d-2', 'd-5'],
      emotionDelta: 5,
    },
  },

  // 2차 — 1차 선택에 따라 분기
  {
    id: 'w1-d2-clarity-fluctuation',
    witnessId: 'w-1',
    topic: '상태가 일정했는지 묻는다',
    question: '반가워했다는 것과 판단이 가능했다는 건 다른 문제입니다. 상태는 어땠습니까?',
    depth: 2,
    testimony: '맞습니다. 어떤 날은 제 질문에도 또박또박 답했고, 어떤 날은 손을 잡아도 멍하셨습니다. 늘 또렷했다고는 못 하겠어요.',
    behaviorHint: '사실만 정리하듯',
    conditions: {
      prevSlotRequired: 'w1-d1-visit-comfort',
    },
    effect: {
      favorDirection: 'mixed',
      relatedDisputes: ['d-1'],
      lieStateNudge: { party: 'b', dispute: 'd-1' },
      emotionDelta: 6,
    },
  },
  {
    id: 'w1-d2-before-brother-arrives',
    witnessId: 'w-1',
    topic: '마무리하자는 말의 맥락을 묻는다',
    question: '종이를 읽어드리던 날, 윤정후 씨가 따로 한 말이 있었습니까?',
    depth: 2,
    testimony: '있었습니다. 윤정후 씨가 “형님 오시기 전에 마무리하자”고 했어요. 다만 그 말은 욕심이라기보다, 그날 또 큰소리 날까 봐 조심하는 느낌에 가까웠습니다.',
    behaviorHint: '신중하게 고르며',
    conditions: {
      prevSlotRequired: 'w1-d1-paper-reading',
    },
    effect: {
      favorDirection: 'mixed',
      relatedDisputes: ['d-2', 'd-5'],
      lieStateNudge: { party: 'a', dispute: 'd-5' },
      emotionDelta: 7,
    },
  },

  // 3차 — 핵심
  {
    id: 'w1-d3-avoid-conflict',
    witnessId: 'w-1',
    topic: '그 과정의 실제 분위기를 묻는다',
    question: '증인 기준으로 답하십시오. 그 과정은 어머니를 몰아간 장면이었습니까, 다툼을 피하려는 장면이었습니까?',
    depth: 3,
    testimony: '제가 옆에서 본 바로는 다툼을 피하려는 쪽이었습니다. 형님이 오시면 실제로 말소리가 커졌고, 그때마다 어머님이 어깨를 움츠리셨어요. 그래서 저는 둘째 아들이 어머니를 이용했다기보다, 겁먹지 않게 끝내려 한 걸로 봤습니다.',
    behaviorHint: '조심스럽지만 분명하게',
    conditions: {
      disputeState: { id: 'd-5', minLieState: 'S2', visibility: 'any' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-5', 'd-1'],
      lieStateNudge: { party: 'a', dispute: 'd-5' },
      emotionDelta: 10,
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 공증사무실 직원 (w-2) — 유서 비율 변화, 조작 방향
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 1차 — 선택지 2개
  {
    id: 'w2-d1-two-visits',
    witnessId: 'w-2',
    topic: '같은 날 두 번 온 사실을 묻는다',
    question: '그날 같은 사람이 두 번 찾아온 일이 있었습니까?',
    depth: 1,
    testimony: '네, 같은 분이 같은 날 두 번 오셔서 기억합니다. 흔한 일은 아닙니다.',
    behaviorHint: '업무적으로 정확하게',
    effect: {
      favorDirection: 'pro_a',
      relatedDisputes: ['d-2'],
      emotionDelta: 4,
    },
  },
  {
    id: 'w2-d1-document-balance',
    witnessId: 'w-2',
    topic: '두 서류의 인상을 묻는다',
    question: '처음 가져온 서류와 다시 가져온 서류의 인상이 달랐습니까?',
    depth: 1,
    testimony: '달랐습니다. 처음 것은 한쪽으로 많이 기운 느낌이었고, 다시 낸 것은 그보다 조금 균형 잡혀 보였어요.',
    behaviorHint: '차분하게',
    effect: {
      favorDirection: 'mixed',
      relatedDisputes: ['d-2'],
      emotionDelta: 5,
    },
  },

  // 2차 — 1차 선택에 따라 분기
  {
    id: 'w2-d2-same-submitter',
    witnessId: 'w-2',
    topic: '누가 다시 제출했는지 묻는다',
    question: '두 번 다 누가 접수창구에 섰습니까?',
    depth: 2,
    testimony: '두 번 다 윤정후 씨가 접수창구에 서셨습니다. 서류를 도로 챙겨갔다가 다시 가져오신 것도 그분이었습니다.',
    behaviorHint: '기억이 선명하다는 듯',
    conditions: {
      prevSlotRequired: 'w2-d1-two-visits',
    },
    effect: {
      favorDirection: 'pro_a',
      relatedDisputes: ['d-2'],
      lieStateNudge: { party: 'b', dispute: 'd-2' },
      emotionDelta: 6,
    },
  },
  {
    id: 'w2-d2-ratio-change',
    witnessId: 'w-2',
    topic: '비율이 어떻게 바뀌었는지 묻는다',
    question: '그 차이를 숫자로 설명하십시오. 어떻게 바뀌었습니까?',
    depth: 2,
    testimony: '첫 서류는 윤정후 90, 윤태성 10이었고, 두 번째는 윤정후 60, 윤태성 40으로 바뀌었습니다. 숫자만 보면 자기 몫을 줄여서 다시 낸 셈이었습니다.',
    behaviorHint: '분명하게',
    conditions: {
      prevSlotRequired: 'w2-d1-document-balance',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-2'],
      lieStateNudge: { party: 'a', dispute: 'd-2' },
      emotionDelta: 8,
    },
  },

  // 3차 — 핵심
  {
    id: 'w2-d3-benefit-direction',
    witnessId: 'w-2',
    topic: '수정이 누구 이익 방향이었는지 묻는다',
    question: '그 변경을 보고 증인께서는 누구 이익 쪽으로 움직인 수정이라고 판단했습니까?',
    depth: 3,
    testimony: '적어도 자기 몫을 늘리려는 수정은 아니었습니다. 접수창구에서 본 결과만 놓고 말하면, 윤정후 씨가 자기 비율을 90에서 60으로 낮춘 문서를 다시 낸 겁니다. 그래서 저는 그날의 수정이 탐욕 쪽이라기보다, 형이 받을 충격을 좀 줄여보려는 조정처럼 보였습니다.',
    behaviorHint: '신중하지만 또렷하게',
    conditions: {
      disputeState: { id: 'd-2', minLieState: 'S2', visibility: 'any' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-2', 'd-5'],
      lieStateNudge: { party: 'a', dispute: 'd-2' },
      emotionDelta: 9,
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 어머니의 이웃/지인 (w-3) — 생활비의 성격, 출생 비밀
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 1차 — 선택지 2개
  {
    id: 'w3-d1-living-support',
    witnessId: 'w-3',
    topic: '생활비 사정을 묻는다',
    question: '어머니가 생활비 사정에 대해 하신 말이 있었습니까?',
    depth: 1,
    testimony: '생활비 걱정을 오래 하셨습니다. 그래도 작은아들이 보내주는 게 있어서 버틴다고 하신 적은 있어요.',
    behaviorHint: '차분히 떠올리며',
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-3'],
      emotionDelta: 4,
    },
  },
  {
    id: 'w3-d1-secret-burden',
    witnessId: 'w-3',
    topic: '큰아들이 몰라야 한다는 말을 묻는다',
    question: '어머니가 큰아들이 몰라야 한다고 한 일이 있었습니까?',
    depth: 1,
    testimony: '있었습니다. 어떤 일은 그 아들이 끝까지 몰라야 한다고 몇 번 말씀하셨어요. 말할 때마다 표정이 많이 무거웠습니다.',
    behaviorHint: '낮게 말하며',
    effect: {
      favorDirection: 'mixed',
      relatedDisputes: ['d-4'],
      emotionDelta: 5,
    },
  },

  // 2차 — 1차 선택에 따라 분기
  {
    id: 'w3-d2-money-nature',
    witnessId: 'w-3',
    topic: '그 돈의 성격을 묻는다',
    question: '그 돈이 어떤 성격이라고 들었습니까? 누가 누구를 돕는 돈이었습니까?',
    depth: 2,
    testimony: '윤정후 씨가 매달 생활비처럼 보내는 돈이라고 들었습니다. 그리고 큰돈 한 번 나갈 때는 “태성이 일 막는 데 썼다”고 어머니가 직접 말씀하셨어요.',
    behaviorHint: '분명히 기억나는 부분만 짚으며',
    conditions: {
      prevSlotRequired: 'w3-d1-living-support',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-3'],
      lieStateNudge: { party: 'a', dispute: 'd-3' },
      emotionDelta: 7,
    },
  },
  {
    id: 'w3-d2-secret-reason',
    witnessId: 'w-3',
    topic: '왜 숨겨야 한다고 했는지 묻는다',
    question: '큰아들이 몰라야 한다고 한 이유를 들은 게 있습니까?',
    depth: 2,
    testimony: '어머니가 정확한 말은 아끼셨지만, “태성이는 그 사실 알면 사람 무너진다”고 했어요. 그리고 “정후가 그 짐을 혼자 진다”는 말도 했습니다.',
    behaviorHint: '조심스럽게',
    conditions: {
      prevSlotRequired: 'w3-d1-secret-burden',
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-4'],
      lieStateNudge: { party: 'a', dispute: 'd-4' },
      emotionDelta: 6,
    },
  },

  // 3차 — 핵심
  {
    id: 'w3-d3-why-kept-secret',
    witnessId: 'w-3',
    topic: '윤정후 씨가 왜 비밀을 숨겼는지 묻는다',
    question: '증인이 들은 말을 종합하면, 윤정후 씨가 왜 그 비밀을 숨겼다고 보십니까?',
    depth: 3,
    testimony: '유산 더 받으려고 숨긴 사람 말투가 아니었습니다. 어머니가 먼저 “태성이는 끝까지 몰라야 한다”고 붙잡았고, 윤정후 씨는 그 말대로 형이 무너지지 않게 막는 쪽이었어요. 그래서 저는 이 집안의 중심이 돈다툼보다 출생 비밀과 죄책감에 더 가까웠다고 봅니다.',
    behaviorHint: '무겁게, 그러나 흔들림 없이',
    conditions: {
      disputeState: { id: 'd-4', minLieState: 'S2', visibility: 'any' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-4', 'd-3', 'd-5'],
      lieStateNudge: { party: 'a', dispute: 'd-4' },
      emotionDelta: 11,
    },
  },
]
