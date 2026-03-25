import type { DialogueEntry } from '../../types'

/** Phase 2: 즉각 반박 — 감정 온도가 올라가며 핵심 모순 힌트가 노출된다. */
export const phase2Dialogues: Omit<DialogueEntry, 'id'>[] = [
  {
    speaker: 'system',
    text: '양측에게 상대 진술에 대한 반박 기회를 드리겠습니다.',
    relatedDisputes: [],
    turn: 0,
  },
  {
    speaker: 'a',
    text: '서연 씨가 과거를 자꾸 끌어오는 건 감정적인 겁니다. 3년 전 보증 건은 이 사건과 관계없습니다.',
    relatedDisputes: ['d-1'],
    turn: 0,
    behaviorHint: '어깨를 펴고 침착하게 반박을 시작한다.',
  },
  {
    speaker: 'b',
    text: '관계없다고요? 그때도 돈을 숨기고 거짓말했잖아요. 패턴이에요, 패턴!',
    relatedDisputes: ['d-1'],
    turn: 0,
    behaviorHint: '"패턴"을 두 번 반복한다.',
  },
  {
    speaker: 'a',
    text: '그리고 그 메시지 건은... 맥락이 있습니다. 서연 씨가 일부만 잘라서 캡처한 거예요. 전체를 보면 전혀 다른 내용입니다.',
    relatedDisputes: ['d-3'],
    turn: 0,
    behaviorHint: '"맥락"이라는 단어에서 미세하게 목소리가 낮아진다.',
  },
  {
    speaker: 'b',
    text: '그럼 전체를 보여주세요! 못 보여주는 거 아니에요?',
    relatedDisputes: ['d-3'],
    turn: 0,
    behaviorHint: '도발하듯 몸을 앞으로 기울인다.',
  },
  {
    speaker: 'a',
    text: '그건... 개인적인 내용이 섞여 있어서...',
    relatedDisputes: ['d-3'],
    turn: 0,
    behaviorHint: '말끝을 흐린다. 시선이 바닥으로.',
  },
  {
    speaker: 'b',
    text: '봐요, 또 숨기잖아요. 맨날 이래요 이 사람은!',
    relatedDisputes: ['d-3'],
    turn: 0,
    behaviorHint: '분노가 터져 나온다.',
  },
  {
    speaker: 'a',
    text: '숨기는 게 아니라 — 서연 씨, 서연 씨는 제 휴대폰을 한밤중에 몰래 열어서 캡처한 건 어떻게 설명할 건데요?',
    relatedDisputes: ['d-4'],
    turn: 0,
    behaviorHint: '반격으로 전환. 처음으로 서연을 직접 공격.',
  },
  {
    speaker: 'b',
    text: '... 그건, 그때 폰이 계속 울려서 —',
    relatedDisputes: ['d-4'],
    turn: 0,
    behaviorHint: '잠시 당황한다. 말이 작아진다.',
  },
  {
    speaker: 'a',
    text: '한밤중에 제 지문도 아닌 서연 씨 지문으로 열었잖아요. 불안해서? 그게 이유가 됩니까?',
    relatedDisputes: ['d-4'],
    turn: 0,
    behaviorHint: '이 부분에서는 확신을 가지고 공격한다.',
  },
  {
    speaker: 'b',
    text: '남편이 바람을 피우는 것 같은데 가만히 있으라고요?! 저도 무서웠다고요!',
    relatedDisputes: ['d-3', 'd-4'],
    turn: 0,
    behaviorHint: '감정이 극에 달한다. 눈물이 글썽.',
  },
  {
    speaker: 'system',
    text: '반박이 종료되었습니다. 양측의 주장이 첨예하게 대립하고 있습니다. 이제 재판관의 심문이 시작됩니다.',
    relatedDisputes: [],
    turn: 0,
  },
]
