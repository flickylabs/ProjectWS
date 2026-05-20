/**
 * family-01 증인 다층 증언 데이터
 *
 * 전 요양보호사(w-1): 어머니 상태와 유서 진행 과정의 분위기
 * 공증사무실 직원(w-2): 두 번 제출된 유서와 비율 변화의 방향
 * 어머니의 이웃(w-3): 정기 지원금의 성격과 출생 비밀의 무게
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
    testimony: '있었습니다. 윤정후 씨가 “형님 오시기 전에 마무리하자”고 했어요. 다만 그 말은 또 큰소리 날까 봐 조심하는 느낌에 가까웠습니다.',
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
    testimony: '제가 옆에서 본 바로는 다툼을 피하려는 쪽이었습니다. 형님이 오시면 실제로 말소리가 커졌고, 그때마다 어머님이 어깨를 움츠리셨어요. 그래서 저는 둘째 아들이 어머니를 겁먹지 않게 보호하려 한 걸로 느꼈습니다.',
    behaviorHint: '조심스럽지만 분명하게',
    conditions: {
      disputeState: { id: 'd-4', minLieState: 'S2', visibility: 'any' },
    },
    effect: {
      favorDirection: 'pro_b',
      relatedDisputes: ['d-4', 'd-1'],
      lieStateNudge: { party: 'a', dispute: 'd-4' },
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
    topic: '같은 날 두 번 방문한 사실을 묻는다',
    question: '그날 같은 댁을 두 번 방문하신 일이 있었습니까?',
    depth: 1,
    testimony: '네, 작성을 마치시고 다시 찾으셔서 같은 날 저녁에 다시 방문을 했습니다. 흔한 일은 아닙니다.',
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
    question: '처음 작성한 서류와 다시 작성한 서류의 인상이 달랐습니까?',
    depth: 1,
    testimony: '첫 서류와 두 번째 서류의 내용이 달랐습니다. 아드님들에 대한 상속 비율이 변경되었어요.',
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
    topic: '두 번째 방문 때 어머니 상태를 묻는다',
    question: '두 번째 방문 때 어머님 상태는 어땠습니까?',
    depth: 2,
    testimony: '사실 두 번째 찾아뵀을 때는 어머님 상태가 좋아보이지 않았습니다. 바로 오전에 뵀는데 저를 기억하지 못하시더라구요.',
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
    topic: '비율 변경에 대한 인상을 묻는다',
    question: '두 서류 비율 변경을 보고 의심이 들지는 않았습니까?',
    depth: 2,
    testimony: '다만 의심을 하지 않았던 게, 두 번째 서류보다 첫 번째 서류 내용이 좀 이상하게 느껴졌었어요. 그래서 조금 더 일반적인 수준으로 바꾸신 거구나 생각만 했습니다.',
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
    topic: '수정 과정의 인상을 묻는다',
    question: '그 변경 과정에서 증인께서 받은 인상은 어떠했습니까?',
    depth: 3,
    testimony: '사실 윤정후 씨가 기억이 희미하신 어머님께 대답을 유도하는 것처럼 느껴졌습니다. 하지만 크게 의심을 하지 않았던 게, 본인 비율을 일부러 낮출 일은 없지 않습니까? 따라서 미리 합의하신 내용일 거라 생각을 했습니다.',
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
  // 어머니의 이웃/지인 (w-3) — 정기 지원금의 성격, 출생 비밀
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 1차 — 선택지 2개
  {
    id: 'w3-d1-living-support',
    witnessId: 'w-3',
    topic: '정기 지원금 사정을 묻는다',
    question: '어머니가 정기적으로 들어오는 돈에 대해 하신 말이 있었습니까?',
    depth: 1,
    testimony: '돈 걱정을 오래 하셨습니다. 그래도 작은아들이 달마다 용돈을 보내줘서 버틴다고 했어요.',
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
    testimony: '있었습니다. 어떤 일은 끝까지 몰라야 한다고 몇 번을 얘기했어요. 그래서 그게 대체 뭐냐고 물어도 말해주지는 않았어요.',
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
    topic: '큰아들 공장 위기와 해결 경위를 묻는다',
    question: '큰아들 공장 사정에 대해 들으신 게 있습니까?',
    depth: 2,
    testimony: '큰아들 공장이 어려워서 큰일이라고 하더니, 얼마 지나지 않아 다행히 해결했다고 했어요. 그래서 어떻게 해결했냐고 하니 잘 키운 아들 덕이라고만 하더라구요.',
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
    testimony: '정확하게 얘기한 적은 없지만, “큰 애가 자존심이 강해서 사실을 알게 되면 무너질 거다”라고 했어요. 그리고 “둘째가 모든 짐을 혼자 짊어지고 있다”라고도 했습니다.',
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
    topic: '어머니가 두 아들에 대해 어떤 걱정을 하셨는지 묻는다',
    question: '어머니께서 두 아들에 대해 평소 어떤 걱정을 하셨습니까?',
    depth: 3,
    testimony: '그저 두 아들 걱정 뿐이었습니다. 큰 아들이 자꾸 사업에 집착하는 게 혹여 본인이 아버지 친자가 아닌 것을 눈치채고 성공에 목을 매는 게 아닌가 걱정을 했고, 작은 아들로부터 받은 돈까지 큰 아들에게 모두 보냈다보니 유산이라도 작은 아들에게 돌려줘야 한다고 말한 적이 있어요.',
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
