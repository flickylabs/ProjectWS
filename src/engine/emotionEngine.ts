import type { EmotionalPhase, EmotionalState } from '../types'
import type { Archetype } from '../types'

const BEHAVIOR_HINTS: Record<Archetype, Record<EmotionalPhase, string>> = {
  avoidant: {
    defensive: '답변 전에 시선을 아래로 향하고, 단어를 고르듯 천천히 말한다.',
    confident: '어깨를 펴고 단정한 어조로 말한다. 상대를 보지 않으려 한다.',
    shaken: '말이 길어지기 시작하고, "정확히"라는 표현이 반복된다.',
    angry: '목소리가 낮아지며 "제가 그런 사람으로 보이십니까"를 반복한다.',
    resigned: '한숨과 함께 시선이 탁자로 내려간다. 답변이 짧아진다.',
  },
  confrontational: {
    defensive: '팔짱을 끼고 빠르게 반박한다. 상대를 자주 가리킨다.',
    confident: '목소리가 커지고 단정적으로 말한다. "분명히"를 자주 쓴다.',
    shaken: '말이 빨라지고 같은 표현을 반복한다. 눈이 불안하게 움직인다.',
    angry: '자리에서 일어서려 하고, 목소리가 높아진다. 감정이 앞선다.',
    resigned: '고개를 숙이고 한 마디씩 끊어 말한다. 눈가가 붉어진다.',
  },
  victim_cosplay: {
    defensive: '약한 목소리로 억울함을 호소한다. 눈물이 글썽인다.',
    confident: '또렷한 목소리로 피해 사실을 나열한다.',
    shaken: '손이 떨리기 시작하고 말이 더듬어진다.',
    angry: '"왜 저만 이런 일을..."이라며 분노와 슬픔이 섞인다.',
    resigned: '체념한 듯 조용히 고개를 끄덕인다.',
  },
  cold_logic: {
    defensive: '차분하게 논리를 나열한다. 감정을 드러내지 않는다.',
    confident: '데이터와 사실을 조목조목 제시한다.',
    shaken: '말이 느려지고, 평소 안 하던 망설임이 보인다.',
    angry: '어조가 날카로워지고, 상대의 논리를 공격한다.',
    resigned: '짧은 단답형으로 바뀌고, 더 이상 반박하지 않는다.',
  },
  affect_flattening: {
    defensive: '무표정하게 사실만 나열한다. 감정어를 거의 쓰지 않는다.',
    confident: '단조로운 어조로 담담하게 설명한다.',
    shaken: '평소보다 더 짧아지고, 침묵이 길어진다.',
    angry: '표정은 변하지 않지만 목소리가 미세하게 떨린다.',
    resigned: '아무런 감정 없이 고개만 끄덕인다.',
  },
  premature_summary: {
    defensive: '"결론부터 말씀드리면"으로 시작하며 빠르게 정리하려 한다.',
    confident: '"정리하면 이렇습니다"라며 자신감 있게 요약한다.',
    shaken: '정리하려다 말이 꼬이기 시작한다.',
    angry: '"그래서 결국 뭘 원하시는 겁니까"라며 조급해한다.',
    resigned: '"더 드릴 말씀이 없습니다"로 대화를 끊으려 한다.',
  },
}

const PHASE_THRESHOLDS: { phase: EmotionalPhase; min: number }[] = [
  { phase: 'resigned', min: 80 },
  { phase: 'angry', min: 60 },
  { phase: 'shaken', min: 40 },
  { phase: 'confident', min: 20 },
  { phase: 'defensive', min: 0 },
]

export function getEmotionalPhase(value: number): EmotionalPhase {
  for (const t of PHASE_THRESHOLDS) {
    if (value >= t.min) return t.phase
  }
  return 'defensive'
}

export function getBehaviorHint(archetype: Archetype, phase: EmotionalPhase): string {
  return BEHAVIOR_HINTS[archetype]?.[phase] ?? ''
}

export function updateEmotion(
  current: EmotionalState,
  delta: number,
  archetype: Archetype,
): EmotionalState {
  const newValue = Math.max(0, Math.min(100, current.internalValue + delta))
  const newPhase = getEmotionalPhase(newValue)
  return {
    phase: newPhase,
    internalValue: newValue,
    behaviorHint: getBehaviorHint(archetype, newPhase),
  }
}

export function createInitialEmotionalState(archetype: Archetype, startPhase: EmotionalPhase): EmotionalState {
  const phaseToValue: Record<EmotionalPhase, number> = {
    defensive: 10,
    confident: 30,
    shaken: 50,
    angry: 70,
    resigned: 90,
  }
  const value = phaseToValue[startPhase]
  return {
    phase: startPhase,
    internalValue: value,
    behaviorHint: getBehaviorHint(archetype, startPhase),
  }
}
