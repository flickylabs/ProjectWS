import type { DialogueNode } from '../../types'

/**
 * Phase 3~5 대사 트리.
 * 모든 쟁점 × 주요 질문유형 × lieState 조합을 커버한다.
 */
export const interrogationNodes: DialogueNode[] = [

  // ══════════════════════════════════════════════════
  //  D-1: 공동통장 무단 인출 — A(민준)
  // ══════════════════════════════════════════════════

  // ── S0 전면 부정 ──
  {
    id: 'a-d1-s0-fact', conditions: { disputeId: 'd-1', questionType: 'fact_fixing', lieState: 'S0' }, speaker: 'a',
    text: '300만원이요? 아닙니다. 그 정도 큰 금액을 뺀 적은 없습니다. 소소한 추석 비용이었을 겁니다.',
    behaviorHint: '"정확히"라는 표현이 등장한다. Verbal Tell.',
    effects: { claimUpdate: { disputeId: 'd-1', summary: '큰 금액 인출 부정', confidence: 'high' } },
  },
  {
    id: 'a-d1-s0-timeline', conditions: { disputeId: 'd-1', questionType: 'timeline', lieState: 'S0' }, speaker: 'a',
    text: '추석 전후로 여러 지출이 있었으니까요. 정확히 9월 초에... 선물이랑 경조사비를 냈습니다. 큰 돈은 아니었어요.',
    behaviorHint: '날짜를 과하게 정확히 기억한다.',
    effects: { lieTransition: { disputeId: 'd-1', to: 'S1' }, emotionalDelta: 5 },
  },
  {
    id: 'a-d1-s0-motive', conditions: { disputeId: 'd-1', questionType: 'motive', lieState: 'S0' }, speaker: 'a',
    text: '왜 돈을 빼겠습니까? 가장으로서 가정을 지키고 있는 사람인데. 제가 그런 사람으로 보이십니까?',
    behaviorHint: '도덕론으로 비약. Verbal Tell.',
    effects: {},
  },
  {
    id: 'a-d1-s0-context', conditions: { disputeId: 'd-1', questionType: 'context_expansion', lieState: 'S0' }, speaker: 'a',
    text: '추석 때는 원래 돈이 많이 나갑니다. 양가 선물에 경조사에... 서연 씨도 알잖아요. 매년 그랬습니다.',
    effects: { emotionalDelta: 3 },
  },
  {
    id: 'a-d1-s0-empathy', conditions: { disputeId: 'd-1', questionType: 'empathy', lieState: 'S0' }, speaker: 'a',
    text: '... 감사합니다. 사실 돈 얘기가 나오면 좀 불편해요. 집에서도 항상 그게 스트레스였으니까요.',
    effects: { trustDelta: { field: 'trustTowardJudge', delta: 12 }, emotionalDelta: 5 },
  },

  // ── S1 맥락 추가 ──
  {
    id: 'a-d1-s1-fact', conditions: { disputeId: 'd-1', questionType: 'fact_fixing', lieState: 'S1' }, speaker: 'a',
    text: '... 좀 큰 지출이 있긴 했습니다. 추석 선물이랑 경조사비가 겹쳐서요. 하지만 모두 합당한 용도였습니다.',
    effects: { claimUpdate: { disputeId: 'd-1', summary: '큰 지출 인정, 합당한 용도 주장', confidence: 'medium' } },
  },
  {
    id: 'a-d1-s1-motive', conditions: { disputeId: 'd-1', questionType: 'motive', lieState: 'S1' }, speaker: 'a',
    text: '서연 씨한테 미리 말하기가... 돈 얘기만 나오면 예민해지니까요. 혼자 해결하려 했습니다.',
    effects: { emotionalDelta: 8 },
  },
  {
    id: 'a-d1-s1-provenance', conditions: { disputeId: 'd-1', questionType: 'provenance', lieState: 'S1' }, speaker: 'a',
    text: '영수증이요? 경조사비를 영수증 받고 내는 사람이 어디 있습니까. 그건 좀...',
    behaviorHint: '화제를 전환하려 한다.',
    effects: { emotionalDelta: 5 },
  },

  // ── S2 부분 인정 (E1 제시 후) ──
  {
    id: 'a-d1-s2-fact', conditions: { disputeId: 'd-1', questionType: 'fact_fixing', lieState: 'S2', evidencePresented: ['e-1'] }, speaker: 'a',
    text: '... 네, 300만원을 인출한 건 맞습니다. 하지만 이유가 있었어요. 서연 씨한테 미리 말하기 어려웠습니다.',
    behaviorHint: '시선이 내려가고 목소리가 작아진다.',
    effects: { claimUpdate: { disputeId: 'd-1', summary: '300만원 인출 인정', confidence: 'low' }, emotionalDelta: 10 },
  },
  {
    id: 'a-d1-s2-motive', conditions: { disputeId: 'd-1', questionType: 'motive', lieState: 'S2' }, speaker: 'a',
    text: '처가에 갈 때 체면이... 서연 씨 오빠는 좋은 차 타고 오고, 저는... 그 압박감이 있었습니다.',
    effects: { emotionalDelta: 8 },
  },
  {
    id: 'a-d1-s2-context', conditions: { disputeId: 'd-1', questionType: 'context_expansion', lieState: 'S2' }, speaker: 'a',
    text: '매년 추석이 되면 서연 씨 가족 앞에서 위축되거든요. 올해는 특히 심했어요. 그래서 무리를 한 거예요.',
    effects: { emotionalDelta: 10 },
  },
  {
    id: 'a-d1-s2-empathy', conditions: { disputeId: 'd-1', questionType: 'empathy', lieState: 'S2' }, speaker: 'a',
    text: '... 감사합니다. 솔직히 추석 때 처갓집 가면 항상 비교당합니다. 체면이 무너지는 게 싫었어요. 그래서 돈을 빼서...',
    behaviorHint: '긴 한숨 후 천천히 말한다. 처음으로 본심.',
    effects: { lieTransition: { disputeId: 'd-1', to: 'S5' }, emotionalDelta: 20, claimUpdate: { disputeId: 'd-1', summary: '체면 압박이 진짜 동기임을 인정', confidence: 'high' } },
  },

  // ── S3 책임 전가 ──
  {
    id: 'a-d1-s3-fact', conditions: { disputeId: 'd-1', lieState: 'S3' }, speaker: 'a',
    text: '서연 씨가 평소에 돈 얘기만 하면 예민하게 안 굴었으면 저도 미리 말했을 겁니다.',
    behaviorHint: '책임을 상대에게 돌리고 있다.',
    effects: { emotionalDelta: 10 },
  },

  // ── S5 인정 ──
  {
    id: 'a-d1-s5', conditions: { disputeId: 'd-1', lieState: 'S5' }, speaker: 'a',
    text: '... 제가 잘못했습니다. 300만원을 동의 없이 쓴 건 변명의 여지가 없습니다.',
    behaviorHint: '한숨과 함께 고개를 숙인다.',
    effects: { claimUpdate: { disputeId: 'd-1', summary: '무단 인출 전면 인정', confidence: 'high' } },
  },


  // ══════════════════════════════════════════════════
  //  D-2: 도박 사용 — A(민준)
  // ══════════════════════════════════════════════════

  // ── S0 ──
  {
    id: 'a-d2-s0-fact', conditions: { disputeId: 'd-2', questionType: 'fact_fixing', lieState: 'S0' }, speaker: 'a',
    text: '도박이요? 저는 도박 같은 건 하지 않습니다.',
    behaviorHint: '눈을 깜빡이는 빈도가 늘어난다.',
    effects: { claimUpdate: { disputeId: 'd-2', summary: '도박 전면 부정', confidence: 'high' } },
  },
  {
    id: 'a-d2-s0-motive', conditions: { disputeId: 'd-2', questionType: 'motive', lieState: 'S0' }, speaker: 'a',
    text: '왜 도박을 하겠습니까. 가정이 있는 사람이. 이건 서연 씨의 상상입니다.',
    behaviorHint: '도덕 비약. Verbal Tell.',
    effects: {},
  },
  {
    id: 'a-d2-s0-timeline', conditions: { disputeId: 'd-2', questionType: 'timeline', lieState: 'S0' }, speaker: 'a',
    text: '인출한 돈은 추석 비용으로 썼습니다. 선물, 경조사... 시간 순서대로 말씀드리면... 9월 초에 백화점에서...',
    behaviorHint: '과잉 정밀한 타임라인. 외운 듯한 느낌.',
    effects: { emotionalDelta: 5 },
  },
  {
    id: 'a-d2-s0-context', conditions: { disputeId: 'd-2', questionType: 'context_expansion', lieState: 'S0' }, speaker: 'a',
    text: '추석 비용이 많이 들었다고 말씀드렸잖아요. 그 이상 무슨 설명이 필요합니까?',
    behaviorHint: '짜증이 섞인 어조. 추가 설명을 거부.',
    effects: { emotionalDelta: 8 },
  },
  {
    id: 'a-d2-s0-empathy', conditions: { disputeId: 'd-2', questionType: 'empathy', lieState: 'S0' }, speaker: 'a',
    text: '... 말씀 감사합니다. 솔직히... 돈 문제로 스트레스를 많이 받고 있긴 합니다.',
    behaviorHint: '공감에 잠시 멈칫. 입술을 꾹 다문다.',
    effects: { trustDelta: { field: 'trustTowardJudge', delta: 12 }, emotionalDelta: 5 },
  },
  {
    id: 'a-d2-s0-provenance', conditions: { disputeId: 'd-2', questionType: 'provenance', lieState: 'S0' }, speaker: 'a',
    text: '도박이라는 얘기를 어디서 들으셨는지 모르겠지만, 근거 없는 의혹입니다.',
    effects: { emotionalDelta: 5 },
  },

  // ── S1 ──
  {
    id: 'a-d2-s1-fact', conditions: { disputeId: 'd-2', questionType: 'fact_fixing', lieState: 'S1' }, speaker: 'a',
    text: '... 예전에 한두 번 스포츠 베팅을 한 적은 있습니다. 하지만 오래 전 일이고, 지금은 안 합니다.',
    behaviorHint: '"한두 번"이라는 축소 표현.',
    effects: { claimUpdate: { disputeId: 'd-2', summary: '과거 소액 베팅 인정, 현재 부정', confidence: 'medium' }, emotionalDelta: 10 },
  },
  {
    id: 'a-d2-s1-motive', conditions: { disputeId: 'd-2', questionType: 'motive', lieState: 'S1' }, speaker: 'a',
    text: '그때는... 스트레스 해소용이었어요. 소액이었고 금방 그만뒀습니다. 지금과는 관계없어요.',
    effects: { emotionalDelta: 8 },
  },
  {
    id: 'a-d2-s1-context', conditions: { disputeId: 'd-2', questionType: 'context_expansion', lieState: 'S1' }, speaker: 'a',
    text: '2년 전에 잠깐... 회사에서 힘든 시기가 있었거든요. 그때 잠깐 빠졌다가 바로 끊었습니다.',
    effects: { emotionalDelta: 10 },
  },

  // ── S2 (E2 제시 후) ──
  {
    id: 'a-d2-s2-fact', conditions: { disputeId: 'd-2', questionType: 'fact_fixing', lieState: 'S2', evidencePresented: ['e-2'] }, speaker: 'a',
    text: '... 네, 200만원을 베팅 사이트에 넣었습니다. 이건... 중독이 아니라 한 번의 실수입니다.',
    behaviorHint: '목소리가 떨린다. 수치심.',
    effects: { claimUpdate: { disputeId: 'd-2', summary: '200만원 도박 인정', confidence: 'low' }, emotionalDelta: 20 },
  },
  {
    id: 'a-d2-s2-motive', conditions: { disputeId: 'd-2', questionType: 'motive', lieState: 'S2' }, speaker: 'a',
    text: '추석 비용을 빨리 메꾸려고... 한 번만 크게 따면 원금 회복할 수 있을 거라고 생각했어요. 바보 같죠.',
    effects: { emotionalDelta: 15 },
  },
  {
    id: 'a-d2-s2-context', conditions: { disputeId: 'd-2', questionType: 'context_expansion', lieState: 'S2' }, speaker: 'a',
    text: '처갓집 비용이 부담되면서 100만원을 먼저 쓰고... 나머지를 메꾸려고 베팅을 한 건데, 그것마저 잃었습니다.',
    effects: { emotionalDelta: 15 },
  },

  // ── S4 감정 호소 ──
  {
    id: 'a-d2-s4', conditions: { disputeId: 'd-2', lieState: 'S4' }, speaker: 'a',
    text: '추석 때 처가에 가면 매번 비교당합니다. 그 압박감이 얼마나 큰지 아십니까... 저도 잘못한 걸 알아요.',
    behaviorHint: '눈이 붉어지며 감정이 올라온다.',
    effects: { emotionalDelta: 15 },
  },

  // ── S5 (신뢰 루트) ──
  {
    id: 'a-d2-s5-trust', conditions: { disputeId: 'd-2', lieState: 'S5', trustActionUsed: 'confidential_protection' }, speaker: 'a',
    text: '... 비공개로 해주시는 거죠? 2년 전에도 도박으로 빚을 진 적이 있습니다. 겨우 갚았는데... 이번에 또 손을 댔습니다.',
    behaviorHint: '떨리는 목소리. 고개를 숙인다.',
    effects: { claimUpdate: { disputeId: 'd-2', summary: '[비공개] 도박 재발 + 과거 빚 자발 고백', confidence: 'high' } },
  },
  {
    id: 'a-d2-s5-pressure', conditions: { disputeId: 'd-2', lieState: 'S5' }, speaker: 'a',
    text: '... 네. 도박입니다. 200만원 썼습니다. 변명하지 않겠습니다.',
    behaviorHint: '단답. 시선이 탁자에 고정.',
    effects: { claimUpdate: { disputeId: 'd-2', summary: '도박 사용 인정', confidence: 'high' } },
  },


  // ══════════════════════════════════════════════════
  //  D-3: 외도 의혹 — A(민준) - 실제로 외도 아님
  // ══════════════════════════════════════════════════

  // ── S0 (진짜 안 했으므로 억울한 부정) ──
  {
    id: 'a-d3-s0-fact', conditions: { disputeId: 'd-3', questionType: 'fact_fixing', lieState: 'S0' }, speaker: 'a',
    text: '외도라니요. 그 사람은 제 거래처... 아, 업무상 만난 분입니다. 서연 씨가 오해하고 있는 겁니다.',
    behaviorHint: '"거래처"에서 "업무상"으로 수정. 말을 바꾸려다 멈칫.',
    effects: { claimUpdate: { disputeId: 'd-3', summary: '업무 만남 주장, 외도 부정', confidence: 'high' } },
  },
  {
    id: 'a-d3-s0-timeline', conditions: { disputeId: 'd-3', questionType: 'timeline', lieState: 'S0' }, speaker: 'a',
    text: '카페 만남은 정확히 9월 3일, 7일, 12일이었습니다. 모두 퇴근 후 잠깐 만난 겁니다.',
    behaviorHint: '과잉 정밀. 날짜를 너무 정확히 기억. Verbal Tell.',
    effects: { emotionalDelta: 5 },
  },
  {
    id: 'a-d3-s0-motive', conditions: { disputeId: 'd-3', questionType: 'motive', lieState: 'S0' }, speaker: 'a',
    text: '외도의 동기요? 동기가 있을 리가 없잖아요, 안 했으니까. 서연 씨를 사랑합니다.',
    behaviorHint: '억울한 어조. 진심으로 부정하지만 숨기는 것도 있다.',
    effects: {},
  },
  {
    id: 'a-d3-s0-context', conditions: { disputeId: 'd-3', questionType: 'context_expansion', lieState: 'S0' }, speaker: 'a',
    text: '서연 씨가 의심을 시작한 건 제 휴대폰 메시지를 보고 나서입니다. 하지만 그건 맥락이 잘린 거예요.',
    effects: { emotionalDelta: 5 },
  },
  {
    id: 'a-d3-s0-provenance', conditions: { disputeId: 'd-3', questionType: 'provenance', lieState: 'S0' }, speaker: 'a',
    text: '서연 씨가 제 휴대폰을 몰래 봐서 일부 메시지만 캡처한 겁니다. 전체 대화를 보면 전혀 다른 내용이에요.',
    effects: { emotionalDelta: 5 },
  },
  {
    id: 'a-d3-s0-empathy', conditions: { disputeId: 'd-3', questionType: 'empathy', lieState: 'S0' }, speaker: 'a',
    text: '... 솔직히 억울합니다. 정말 외도가 아닌데 아무도 안 믿어주니까요. 근데... 제가 숨긴 게 있긴 합니다. 외도는 아니고...',
    behaviorHint: '억울함이 진심으로 느껴진다. 뭔가 말하려다 멈춘다.',
    effects: { trustDelta: { field: 'trustTowardJudge', delta: 15 }, emotionalDelta: 10, lieTransition: { disputeId: 'd-3', to: 'S1' } },
  },

  // ── S1 (뭔가 숨기는 건 인정) ──
  {
    id: 'a-d3-s1-fact', conditions: { disputeId: 'd-3', questionType: 'fact_fixing', lieState: 'S1' }, speaker: 'a',
    text: '외도는 아닙니다. 하지만... 그 사람을 만난 건 사실이에요. 이유가 다를 뿐입니다.',
    effects: { claimUpdate: { disputeId: 'd-3', summary: '만남은 인정, 외도는 아니라고 주장', confidence: 'medium' } },
  },
  {
    id: 'a-d3-s1-motive', conditions: { disputeId: 'd-3', questionType: 'motive', lieState: 'S1' }, speaker: 'a',
    text: '외도가 아니라면 왜 숨겼냐고요? ... 서연이한테 깜짝으로 준비하는 게 있었거든요.',
    behaviorHint: '말끝을 흐린다.',
    effects: { emotionalDelta: 8 },
  },
  {
    id: 'a-d3-s1-context', conditions: { disputeId: 'd-3', questionType: 'context_expansion', lieState: 'S1' }, speaker: 'a',
    text: '그 분을 만난 건 특별한 목적이 있어서였어요. 업무는 아니고... 개인적인 일인데, 나쁜 일은 아닙니다.',
    effects: { emotionalDelta: 5 },
  },

  // ── S2 (E4 카드내역 제시 후) ──
  {
    id: 'a-d3-s2-fact', conditions: { disputeId: 'd-3', questionType: 'fact_fixing', lieState: 'S2', evidencePresented: ['e-4'] }, speaker: 'a',
    text: '네, 카페에서 2인분을 결제한 건 맞습니다. 하지만 그건... 상담을 받고 있었습니다.',
    behaviorHint: '말끝을 흐린다. 뭔가 더 말하려다 멈춘다.',
    effects: { claimUpdate: { disputeId: 'd-3', summary: '"상담"이라고만 언급', confidence: 'low' }, emotionalDelta: 10 },
  },
  {
    id: 'a-d3-s2-motive', conditions: { disputeId: 'd-3', questionType: 'motive', lieState: 'S2' }, speaker: 'a',
    text: '상담의 목적은... 가족을 위한 건데, 아직 말씀드리기 어렵습니다. 외도가 아닌 건 확실합니다.',
    effects: { emotionalDelta: 8 },
  },

  // ── S5 (E6 보험사 기록 공개 후) ──
  {
    id: 'a-d3-s5', conditions: { disputeId: 'd-3', lieState: 'S5', evidencePresented: ['e-6'] }, speaker: 'a',
    text: '... 보험 설계사를 만나고 있었습니다. 가족 종합보험을 알아보려고요. 서연이랑 아이 보장을 넣으려고 했는데... 몰래 준비해서 깜짝 선물하려고 했습니다.',
    behaviorHint: '후회와 안도가 섞인 표정.',
    effects: { claimUpdate: { disputeId: 'd-3', summary: '보험 상담이었음 확정. 외도 아님.', confidence: 'high' } },
  },
  {
    id: 'a-d3-s5-general', conditions: { disputeId: 'd-3', lieState: 'S5' }, speaker: 'a',
    text: '사실은... 보험 설계사를 만난 겁니다. 가족 보험을 알아보고 있었어요. 서연이한테 깜짝 선물하려고 했는데 이렇게 될 줄은...',
    effects: { claimUpdate: { disputeId: 'd-3', summary: '보험 상담이 실체. 외도가 아님.', confidence: 'high' } },
  },


  // ══════════════════════════════════════════════════
  //  D-3: 외도 의혹 — B(서연)
  // ══════════════════════════════════════════════════

  // ── S0 (외도라고 확신) ──
  {
    id: 'b-d3-s0-fact', conditions: { disputeId: 'd-3', questionType: 'fact_fixing', lieState: 'S0' }, speaker: 'b',
    text: '제가 직접 봤어요. 휴대폰에 "오늘 저녁에 만나요"라는 메시지, 하트 이모티콘. 이게 업무 메시지인가요?',
    behaviorHint: '"분명히"를 강조한다.',
    effects: { claimUpdate: { disputeId: 'd-3', summary: '메시지 기반 외도 확신', confidence: 'high' } },
  },
  {
    id: 'b-d3-s0-timeline', conditions: { disputeId: 'd-3', questionType: 'timeline', lieState: 'S0' }, speaker: 'b',
    text: '이 사람이 늦게 들어온 날들이 있어요. 9월 들어서 일주일에 두세 번은. 그때마다 "야근"이라고 했는데, 거짓말이었어요.',
    effects: { emotionalDelta: 5 },
  },
  {
    id: 'b-d3-s0-motive', conditions: { disputeId: 'd-3', questionType: 'motive', lieState: 'S0' }, speaker: 'b',
    text: '왜 외도를 했냐고요? 그걸 제가 어떻게 알아요! 저 사람한테 물어보세요!',
    behaviorHint: '분노. 질문 자체에 화가 난다.',
    effects: { emotionalDelta: 10 },
  },
  {
    id: 'b-d3-s0-context', conditions: { disputeId: 'd-3', questionType: 'context_expansion', lieState: 'S0' }, speaker: 'b',
    text: '전부터 좀 이상했어요. 갑자기 외모에 신경 쓰고, 핸드폰을 엎어놓고, 비밀번호도 바꾸고. 그래서 의심이 시작된 거예요.',
    effects: { emotionalDelta: 5 },
  },
  {
    id: 'b-d3-s0-provenance', conditions: { disputeId: 'd-3', questionType: 'provenance', lieState: 'S0' }, speaker: 'b',
    text: '메시지를 어떻게 봤냐고요? ... 그건 지금 중요한 게 아니잖아요.',
    behaviorHint: '화제 전환. Verbal Tell.',
    effects: { emotionalDelta: 5 },
  },
  {
    id: 'b-d3-s0-empathy', conditions: { disputeId: 'd-3', questionType: 'empathy', lieState: 'S0' }, speaker: 'b',
    text: '... 무섭고 화가 나요. 10년을 같이 살았는데 이런 배신을 당하다니. 아이도 있는데...',
    behaviorHint: '감정이 풀리며 눈물.',
    effects: { trustDelta: { field: 'trustTowardJudge', delta: 15 }, emotionalDelta: 10 },
  },

  // ── S1 (흔들림) ──
  {
    id: 'b-d3-s1-fact', conditions: { disputeId: 'd-3', questionType: 'fact_fixing', lieState: 'S1' }, speaker: 'b',
    text: '... 전체 대화를 본 건 아니에요. 그 부분만 캡처했어요. 하지만 "만나요 ♥"인데 뭐가 다를 수 있어요?',
    effects: { claimUpdate: { disputeId: 'd-3', summary: '부분 캡처 인정, 여전히 외도 주장', confidence: 'medium' } },
  },
  {
    id: 'b-d3-s1-motive', conditions: { disputeId: 'd-3', questionType: 'motive', lieState: 'S1' }, speaker: 'b',
    text: '제가 왜 과장을 하겠어요? 진짜 그렇게 보였으니까 그런 거예요. 엄마한테 말한 것도... 확신이 있었으니까요.',
    effects: { emotionalDelta: 8 },
  },

  // ── S2 (오해 가능성 직면) ──
  {
    id: 'b-d3-s2-fact', conditions: { disputeId: 'd-3', questionType: 'fact_fixing', lieState: 'S2' }, speaker: 'b',
    text: '... 보험 상담이라고요? 그럼 왜 숨겼어요? 떳떳하면 말했겠죠.',
    effects: { claimUpdate: { disputeId: 'd-3', summary: '보험 상담 가능성은 인정, 숨긴 것에 대한 의심', confidence: 'low' }, emotionalDelta: 15 },
  },
  {
    id: 'b-d3-s2-motive', conditions: { disputeId: 'd-3', questionType: 'motive', lieState: 'S2' }, speaker: 'b',
    text: '제가 왜 확신했냐면... 이 사람이 평소에 말을 안 하니까. 뭘 해도 숨기니까 의심이 갈 수밖에 없었어요.',
    effects: { emotionalDelta: 10 },
  },

  // ── S4 (진실 직면 후 혼란) ──
  {
    id: 'b-d3-s4', conditions: { disputeId: 'd-3', lieState: 'S4', evidencePresented: ['e-6'] }, speaker: 'b',
    text: '... 보험이었다고요? 그럼 제가... 저는 왜 그렇게 확신했을까요. 분명히 바람이라고 생각했는데...',
    behaviorHint: '혼란과 당혹. 오해를 직면.',
    effects: { emotionalDelta: 20 },
  },

  // ── S5 수용 ──
  {
    id: 'b-d3-s5', conditions: { disputeId: 'd-3', lieState: 'S5' }, speaker: 'b',
    text: '... 제가 너무 성급했나 봐요. 일부만 보고 단정 지어버렸어요. 이 사람이 평소에 말을 안 하니까 의심이 갈 수밖에...',
    behaviorHint: '눈가가 붉어진다.',
    effects: { claimUpdate: { disputeId: 'd-3', summary: '오해 인정. 소통 부재 탓으로 재프레이밍.', confidence: 'high' } },
  },


  // ══════════════════════════════════════════════════
  //  D-4: 휴대폰 무단 열람 — B(서연)
  // ══════════════════════════════════════════════════

  // ── S0 ──
  {
    id: 'b-d4-s0-fact', conditions: { disputeId: 'd-4', questionType: 'fact_fixing', lieState: 'S0' }, speaker: 'b',
    text: '그날 밤에 이 사람 폰이 계속 울렸어요. 한밤중에. 불안해서 확인한 건데, 그게 잘못인가요?',
    behaviorHint: '감정적으로 정당화.',
    effects: { claimUpdate: { disputeId: 'd-4', summary: '열람 인정, 불안이 이유', confidence: 'medium' } },
  },
  {
    id: 'b-d4-s0-motive', conditions: { disputeId: 'd-4', questionType: 'motive', lieState: 'S0' }, speaker: 'b',
    text: '남편이 바람을 피우는 것 같은데 가만히 있으라고요? 진실을 알 권리가 있잖아요.',
    effects: { emotionalDelta: 8 },
  },
  {
    id: 'b-d4-s0-timeline', conditions: { disputeId: 'd-4', questionType: 'timeline', lieState: 'S0' }, speaker: 'b',
    text: '9월 10일 밤 11시쯤이었어요. 이 사람이 잠들고 나서. 폰이 울리길래...',
    effects: { emotionalDelta: 5 },
  },
  {
    id: 'b-d4-s0-context', conditions: { disputeId: 'd-4', questionType: 'context_expansion', lieState: 'S0' }, speaker: 'b',
    text: '그 전부터 의심이 쌓여 있었어요. 늦게 들어오고, 돈이 사라지고, 핸드폰을 감추고. 그날 밤이 한계점이었어요.',
    effects: { emotionalDelta: 5 },
  },
  {
    id: 'b-d4-s0-empathy', conditions: { disputeId: 'd-4', questionType: 'empathy', lieState: 'S0' }, speaker: 'b',
    text: '... 사실 무서웠어요. 이 사람이 점점 멀어지는 것 같고... 확인이라도 해야 마음이 놓일 것 같았어요.',
    behaviorHint: '방어가 풀리며 솔직해진다.',
    effects: { trustDelta: { field: 'trustTowardJudge', delta: 15 }, emotionalDelta: 10, lieTransition: { disputeId: 'd-4', to: 'S2' } },
  },
  {
    id: 'b-d4-s0-provenance', conditions: { disputeId: 'd-4', questionType: 'provenance', lieState: 'S0' }, speaker: 'b',
    text: '지문으로 열었어요. 제 지문이 등록되어 있거든요. 예전에 서로 등록해둔 거예요.',
    effects: { emotionalDelta: 5 },
  },

  // ── S2 (E5 제시 후) ──
  {
    id: 'b-d4-s2-fact', conditions: { disputeId: 'd-4', questionType: 'fact_fixing', lieState: 'S2', evidencePresented: ['e-5'] }, speaker: 'b',
    text: '... 네, 지문으로 열었어요. 잠든 사이에. 그리고 캡처했어요. 잘못한 거... 알아요.',
    behaviorHint: '고개를 숙인다.',
    effects: { claimUpdate: { disputeId: 'd-4', summary: '무단 열람 + 캡처 전면 인정', confidence: 'high' }, emotionalDelta: 15 },
  },

  // ── S5 ──
  {
    id: 'b-d4-s5', conditions: { disputeId: 'd-4', lieState: 'S5' }, speaker: 'b',
    text: '사생활을 침해한 건 맞아요. 변명하지 않을게요. 다만 그만큼 불안했다는 것만은 알아주세요.',
    effects: { claimUpdate: { disputeId: 'd-4', summary: '사생활 침해 인정', confidence: 'high' } },
  },


  // ══════════════════════════════════════════════════
  //  D-5: 보험 상담 (제3자 비밀)
  // ══════════════════════════════════════════════════

  {
    id: 'a-d5-s0-fact', conditions: { disputeId: 'd-5', questionType: 'fact_fixing', lieState: 'S0' }, speaker: 'a',
    text: '보험이요? ... 아직 확정된 건 아니라서 말씀드리기가 어렵습니다.',
    behaviorHint: '화제를 전환하려 한다.',
    effects: {},
  },
  {
    id: 'a-d5-s0-motive', conditions: { disputeId: 'd-5', questionType: 'motive', lieState: 'S0' }, speaker: 'a',
    text: '그건... 개인적인 사안이라 지금은 말씀드리기 어렵습니다.',
    effects: {},
  },
  {
    id: 'a-d5-trust', conditions: { disputeId: 'd-5', trustActionUsed: 'confidential_protection' }, speaker: 'a',
    text: '... 비밀로 해주시는 거죠? 사실 서연이랑 아이 보험을 알아보고 있었습니다. 깜짝 선물로요. 그래서 보험 설계사를 만났는데 서연이가 그 메시지를 외도로 오해한 거예요.',
    behaviorHint: '안도와 후회가 섞인 표정.',
    effects: { lieTransition: { disputeId: 'd-5', to: 'S5' }, emotionalDelta: 15, evidenceUnlock: 'e-6', claimUpdate: { disputeId: 'd-5', summary: '[비공개] 보험 상담이 외도 오해의 실체', confidence: 'high' } },
  },
  {
    id: 'b-d5-s0-fact', conditions: { disputeId: 'd-5', questionType: 'fact_fixing', lieState: 'S0' }, speaker: 'b',
    text: '보험 상담이요? 저는 그런 얘기를 들은 적이 없는데요. 이 사람이 또 뭘 숨기고 있나요?',
    effects: {},
  },


  // ══════════════════════════════════════════════════
  //  신뢰 루트 전용 노드
  // ══════════════════════════════════════════════════

  {
    id: 'a-d2-trust-confidential', conditions: { disputeId: 'd-2', trustActionUsed: 'confidential_protection', lieState: 'S1' }, speaker: 'a',
    text: '... 비공개로 해주시는 거죠? 사실 다시 도박을 했습니다. 서연이한테는 절대 말할 수 없어요. 2년 전에도 빚을 졌었거든요.',
    behaviorHint: '떨리는 목소리.',
    effects: { lieTransition: { disputeId: 'd-2', to: 'S5' }, emotionalDelta: 25, trustDelta: { field: 'fearOfExposure', delta: -30 }, claimUpdate: { disputeId: 'd-2', summary: '[비공개] 도박 재발 + 과거 빚 자발 고백', confidence: 'high' } },
  },
  {
    id: 'b-d4-trust-stabilize', conditions: { disputeId: 'd-4', trustActionUsed: 'emotional_stabilization', lieState: 'S0' }, speaker: 'b',
    text: '... 고마워요, 진정할 시간을 주셔서. 사실 저도 알아요 잘못한 거. 한밤중에 몰래 폰을 본 건 좋은 방법이 아니었어요.',
    behaviorHint: '눈물을 닦으며 차분하게.',
    effects: { lieTransition: { disputeId: 'd-4', to: 'S2' }, emotionalDelta: -10, trustDelta: { field: 'trustTowardJudge', delta: 10 }, claimUpdate: { disputeId: 'd-4', summary: '무단 열람 자발 인정', confidence: 'high' } },
  },
  {
    id: 'b-d3-trust-retaliation', conditions: { disputeId: 'd-3', trustActionUsed: 'retaliation_check', lieState: 'S1' }, speaker: 'b',
    text: '... 솔직히 말하면 제가 엄마한테 좀 과장해서 말한 건 있어요. 의심이었는데 "확실하다"고 말해버렸어요.',
    behaviorHint: '시선을 아래로. 목소리가 작아진다.',
    effects: { lieTransition: { disputeId: 'd-3', to: 'S2' }, emotionalDelta: 15, trustDelta: { field: 'retaliationWorry', delta: -15 }, claimUpdate: { disputeId: 'd-3', summary: '장모에게 외도 의혹 과장 전달 인정', confidence: 'high' } },
  },
]
