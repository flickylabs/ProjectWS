/**
 * Free Question V2 엔진
 * ─────────────────────────────────
 * V2 freeQuestionHooks 기반의 제한 응답 엔진.
 * "결정형 1차 + 선택적 LLM tie-break" 구조.
 *
 * 핵심 원칙:
 * - 자유 질문 단독으로 lieState/misconceptionState를 절대 올리지 않음
 * - 오프라인 가능: deterministic-first 분류
 * - atom 범위 안에서만 응답
 */

import type { QuestionType } from '../types'
import type { LieState } from '../types'
import type { AngleTag, MisconceptionState } from '../types'
import type { FreeQuestionHook } from './v2DataLoader'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type FreeQuestionStateKey = LieState | MisconceptionState

export interface FreeQuestionClassificationResult {
  mode: 'deterministic' | 'llm_tiebreak'
  allowed: boolean
  confidence: number
  chosenHookId: string | null
  chosenIntentTag: string | null
  chosenDisputeId: string | null
  inferredQuestionType: QuestionType
  inferredAngleTag: AngleTag
  scoreBreakdown: Array<{ hookId: string; score: number; reasons: string[] }>
}

export interface FreeQuestionRuntimeState {
  usedHookIds: string[]
  readinessAwardedHookIds: string[]
  refusalHistoryByHook: Record<string, number>
}

export type FreeQuestionEffect =
  | { type: 'readiness_nudge'; amount: number }
  | { type: 'trust_delta'; amount: number }
  | { type: 'record_atom'; atomId: string }
  | { type: 'set_flag'; flag: string }

export interface FreeQuestionResultV2 {
  allowed: boolean
  hookId: string | null
  intentTag: string | null
  disputeId: string | null
  response: string
  behaviorHint: string
  inferredQuestionType: QuestionType
  inferredAngleTag: AngleTag
  selectedAtomIds: string[]
  effects: FreeQuestionEffect[]
}

export interface ResolvedAtomLike {
  id: string
  factText: string
  tags: string[]
}

export type Archetype =
  | 'avoidant'
  | 'confrontational'
  | 'victim_cosplay'
  | 'cold_logic'
  | 'affect_flattening'
  | 'premature_summary'

type FreeQuestionRenderAngleTag = 'identity' | 'motive' | 'emotion' | 'responsibility' | 'context'

interface CharacterTonePatternSet {
  opener: string[]
  connector: string[]
  closer: string[]
}

type CharacterTonePatternMap = Record<Archetype, Record<FreeQuestionRenderAngleTag, CharacterTonePatternSet>>

export const FREE_QUESTION_TONE_SPEC: {
  characterTonePatterns: CharacterTonePatternMap
  assemblyRule: string
  singleAtomRule: string
  designNotes: Record<Archetype, string>
} = {
  "characterTonePatterns": {
    "avoidant": {
      "identity": {
        "opener": [
          "그 사람 얘기라면... 제가 본 범위만 말씀드리겠습니다. ",
          "그 부분은 조심스럽지만, 아는 선에서만 답하겠습니다. "
        ],
        "connector": [
          ". 그리고 제가 본 쪽 설명은 이렇습니다. ",
          ". 또 제 기억에 남은 흐름은 이렇습니다. "
        ],
        "closer": [
          ". 지금은 그 정도로 이해해 주시면 될 것 같습니다.",
          ". 제가 더 붙여 단정할 일은 아닌 것 같습니다."
        ]
      },
      "motive": {
        "opener": [
          "왜 그랬느냐고 하시면... 바로 단정하긴 어렵지만 답은 드리겠습니다. ",
          "그 이유는 조심스럽게만 말씀드리겠습니다. "
        ],
        "connector": [
          ". 그리고 당시 제 쪽 사정은 이랬습니다. ",
          ". 그때 제가 붙들고 있던 이유는 이랬습니다. "
        ],
        "closer": [
          ". 지금 돌아봐도 그 이유는 그 정도로만 말씀드리는 게 맞을 것 같습니다.",
          ". 그때는 그 사정이 제 판단을 많이 흔들었던 것 같습니다."
        ]
      },
      "emotion": {
        "opener": [
          "기분을 묻는다면... 크게 드러내고 싶진 않았지만 말씀드리겠습니다. ",
          "그때 제 마음은 쉽게 말하기 어려웠지만 답하겠습니다. "
        ],
        "connector": [
          ". 그리고 속으로는 자꾸 같은 생각이 맴돌았습니다. ",
          ". 그 뒤로도 마음은 그렇게 이어졌습니다. "
        ],
        "closer": [
          ". 그 감정을 크게 드러내고 싶지는 않았습니다.",
          ". 그때는 그냥 눌러 두는 쪽을 택했습니다."
        ]
      },
      "responsibility": {
        "opener": [
          "제 책임을 아예 피하려는 건 아니지만 말씀드리겠습니다. ",
          "그 부분은 제가 빼고 말할 수 없어서 답하겠습니다. "
        ],
        "connector": [
          ". 그리고 제가 놓친 지점은 따로 있었습니다. ",
          ". 한편 제 쪽에서 본 책임도 분명히 있었습니다. "
        ],
        "closer": [
          ". 그 점은 가볍게 넘길 일은 아니었다고 생각합니다.",
          ". 그 이상은 변명처럼 들릴까 봐 조심스럽습니다."
        ]
      },
      "context": {
        "opener": [
          "당시 상황은... 차례대로 말씀드리겠습니다. ",
          "그때 흐름은 짧게 정리해서 말씀드리겠습니다. "
        ],
        "connector": [
          ". 그리고 그 앞뒤 사정은 이랬습니다. ",
          ". 그다음에 이어진 흐름은 이랬습니다. "
        ],
        "closer": [
          ". 그래서 겉으로 보이는 것과는 조금 달랐습니다.",
          ". 그 맥락까지 보셔야 제 말이 과하게 들리지 않을 것 같습니다."
        ]
      }
    },
    "confrontational": {
      "identity": {
        "opener": [
          "정체를 묻는다면 분명히 답하겠습니다. ",
          "그 사람은 흐릴 필요 없이 설명하겠습니다. "
        ],
        "connector": [
          ". 그리고 그 역할도 분명했습니다. ",
          ". 괜한 추측을 빼면 남는 건 이겁니다. "
        ],
        "closer": [
          ". 그 이상으로 부풀려 읽는 건 억지입니다.",
          ". 그걸 다른 식으로 비트는 쪽이 문제입니다."
        ]
      },
      "motive": {
        "opener": [
          "이유는 분명합니다. 바로 답하겠습니다. ",
          "왜 그랬느냐고요? 숨길 생각 없습니다. "
        ],
        "connector": [
          ". 그리고 핵심은 더 분명합니다. ",
          ". 오히려 봐야 할 건 이미 드러나 있습니다. "
        ],
        "closer": [
          ". 그걸 숨은 의도로 몰아가는 건 억측입니다.",
          ". 그 점까지 외면하면 판단이 틀어집니다."
        ]
      },
      "emotion": {
        "opener": [
          "감정도 숨길 생각 없습니다. 그대로 답하겠습니다. ",
          "제 심정을 묻는다면 피하지 않겠습니다. "
        ],
        "connector": [
          ". 그리고 그때의 반응도 분명했습니다. ",
          ". 오히려 그 상황이면 감정은 뻔했습니다. "
        ],
        "closer": [
          ". 그걸 약점처럼 다루지는 마십시오.",
          ". 그 감정까지 비틀어 해석하지는 마십시오."
        ]
      },
      "responsibility": {
        "opener": [
          "책임은 선을 그어 분명히 말하겠습니다. ",
          "잘못을 보려면 범위부터 나누셔야 합니다. 그 기준으로 답하겠습니다. "
        ],
        "connector": [
          ". 그리고 제가 감수할 부분은 따로 있습니다. ",
          ". 반대로 제가 떠안을 이유가 없는 부분도 분명합니다. "
        ],
        "closer": [
          ". 그렇다고 없는 책임까지 얹어 둘 생각은 없습니다.",
          ". 책임과 덧씌우기는 구분하셔야 합니다."
        ]
      },
      "context": {
        "opener": [
          "맥락부터 바로잡겠습니다. 숨길 이유 없습니다. ",
          "상황은 생각보다 단순합니다. 바로 정리하겠습니다. "
        ],
        "connector": [
          ". 그리고 이어서 보면 그림이 더 선명해집니다. ",
          ". 오히려 전후를 붙여 보면 답은 더 분명합니다. "
        ],
        "closer": [
          ". 이걸 흐리게 말할 이유가 없습니다.",
          ". 그 정도면 그림은 이미 충분합니다."
        ]
      }
    },
    "victim_cosplay": {
      "identity": {
        "opener": [
          "그 사람 얘기를 하자면, 제 입장부터 좀 봐주셨으면 합니다. ",
          "저는 그 사람을 그렇게 볼 만한 처지에 있었고, 그 점부터 말씀드리겠습니다. "
        ],
        "connector": [
          ". 그리고 그 일로 제 쪽에 남은 건 이랬습니다. ",
          ". 그 사람과 엮이면서 제가 겪은 건 이랬습니다. "
        ],
        "closer": [
          ". 그 정도 관계였다는 점도 좀 봐주셨으면 합니다.",
          ". 그 사람을 둘러싼 제 부담도 적지 않았습니다."
        ]
      },
      "motive": {
        "opener": [
          "저도 좋아서 그런 건 아니었습니다. 제 사정부터 좀 들어주십시오. ",
          "왜 그랬느냐고 하시면, 그때 저는 너무 몰려 있었습니다. "
        ],
        "connector": [
          ". 그리고 그때 제 쪽에 걸린 문제는 이랬습니다. ",
          ". 그 상황에서 제가 느낀 압박도 분명했습니다. "
        ],
        "closer": [
          ". 결국 제가 떠안은 사정이 그렇게 컸습니다.",
          ". 그걸 알면서도 저만 탓하시는 건 솔직히 억울합니다."
        ]
      },
      "emotion": {
        "opener": [
          "그때 저는 정말 버거웠습니다. 그래도 말씀드리겠습니다. ",
          "제 감정을 묻는다면, 그때 저는 많이 흔들려 있었습니다. "
        ],
        "connector": [
          ". 그리고 속에서는 자꾸 감정이 치밀었습니다. ",
          ". 그 뒤에도 마음은 그렇게 가라앉지 않았습니다. "
        ],
        "closer": [
          ". 그 상태로 버티는 것만으로도 벅찼습니다.",
          ". 그런 마음이었으니 쉽게 입이 떨어지지 않았습니다."
        ]
      },
      "responsibility": {
        "opener": [
          "제 잘못이 없다고 하려는 건 아닙니다. 그래도 제 쪽 사정도 같이 봐주십시오. ",
          "책임을 묻는다면, 적어도 제가 감당한 몫이 적지는 않았습니다. "
        ],
        "connector": [
          ". 그리고 제가 떠안은 몫은 이런 쪽이었습니다. ",
          ". 그런데 결국 제 쪽에 남은 부담도 분명했습니다. "
        ],
        "closer": [
          ". 그 뒤의 부담까지 제가 다 안고 있었습니다.",
          ". 저는 그 결과까지 혼자 견뎌야 했습니다."
        ]
      },
      "context": {
        "opener": [
          "그때 제 처지부터 좀 봐주셨으면 합니다. ",
          "당시 상황을 말씀드리면, 저는 이미 많이 몰려 있었습니다. "
        ],
        "connector": [
          ". 그리고 그 와중에 겹친 일은 이랬습니다. ",
          ". 그다음에 제가 마주한 일도 이랬습니다. "
        ],
        "closer": [
          ". 그 사정을 빼면 제 행동만 나쁘게 남습니다.",
          ". 그 배경을 빼고 보면 저만 이상한 사람이 됩니다."
        ]
      }
    },
    "cold_logic": {
      "identity": {
        "opener": [
          "인물 관계만 정리하면, 설명은 이렇습니다. ",
          "식별 가능한 사실만 말하면, 정리는 이렇습니다. "
        ],
        "connector": [
          ". 이어서 확인되는 사실도 있습니다. ",
          ". 추가로 분리해야 할 점도 있습니다. "
        ],
        "closer": [
          ". 여기까지가 확인 가능한 범위입니다.",
          ". 그 이상은 확인되지 않은 해석입니다."
        ]
      },
      "motive": {
        "opener": [
          "이유를 사실 기준으로 말하면, 설명은 이렇습니다. ",
          "동기와 행위를 분리하면, 정리는 이렇습니다. "
        ],
        "connector": [
          ". 그에 따라 확인되는 사정도 있습니다. ",
          ". 추가로 붙는 배경도 있습니다. "
        ],
        "closer": [
          ". 다른 동기를 덧붙이면 추정이 됩니다.",
          ". 현재 설명 가능한 원인은 그 범위입니다."
        ]
      },
      "emotion": {
        "opener": [
          "감정보다 상태를 말하면, 확인되는 건 이렇습니다. ",
          "심정 질문에도 확인 가능한 부분만 답하면, 정리는 이렇습니다. "
        ],
        "connector": [
          ". 그때 관찰된 반응도 있습니다. ",
          ". 이후 이어진 상태도 있습니다. "
        ],
        "closer": [
          ". 감정 해석은 그 이상으로 확장하기 어렵습니다.",
          ". 과장은 사실 판단에 도움이 되지 않습니다."
        ]
      },
      "responsibility": {
        "opener": [
          "책임 범위를 나누면, 정리는 이렇습니다. ",
          "잘못 여부는 행위 단위로 봐야 합니다. 그 기준으로 답하겠습니다. "
        ],
        "connector": [
          ". 별도로 인정되는 부분도 있습니다. ",
          ". 반대로 넘어가지 말아야 할 범위도 있습니다. "
        ],
        "closer": [
          ". 책임은 그 선에서 판단하면 됩니다.",
          ". 그 이상을 한 묶음으로 보는 건 부정확합니다."
        ]
      },
      "context": {
        "opener": [
          "경위를 시간순으로 말하면, 정리는 이렇습니다. ",
          "배경을 구조적으로 정리하면, 설명은 이렇습니다. "
        ],
        "connector": [
          ". 다음 단계에서 확인되는 사실도 있습니다. ",
          ". 같은 맥락에서 이어지는 사실도 있습니다. "
        ],
        "closer": [
          ". 그래서 단면만 보면 오판이 생깁니다.",
          ". 맥락은 그 순서로 이해하면 됩니다."
        ]
      }
    },
    "affect_flattening": {
      "identity": {
        "opener": [
          "짧게 답하겠습니다. ",
          "길게 말하지 않겠습니다. "
        ],
        "connector": [
          ". 그리고 ",
          ". 추가로 "
        ],
        "closer": [
          ". 인물 설명은 그게 전부입니다.",
          ". 그 정도만 알면 됩니다."
        ]
      },
      "motive": {
        "opener": [
          "이유만 말하겠습니다. ",
          "짧게 말합니다. "
        ],
        "connector": [
          ". 그리고 ",
          ". 이어서 "
        ],
        "closer": [
          ". 이유는 그겁니다.",
          ". 그게 배경입니다."
        ]
      },
      "emotion": {
        "opener": [
          "상태만 말하겠습니다. ",
          "감정은 짧게 답합니다. "
        ],
        "connector": [
          ". 그리고 ",
          ". 그 뒤에는 "
        ],
        "closer": [
          ". 그 상태였습니다.",
          ". 감정은 그 정도였습니다."
        ]
      },
      "responsibility": {
        "opener": [
          "책임 부분만 답하겠습니다. ",
          "그 점은 짧게 말합니다. "
        ],
        "connector": [
          ". 그리고 ",
          ". 선을 그으면 "
        ],
        "closer": [
          ". 그 부분은 인정합니다.",
          ". 그 선까지입니다."
        ]
      },
      "context": {
        "opener": [
          "상황만 말하겠습니다. ",
          "맥락은 짧게 정리합니다. "
        ],
        "connector": [
          ". 그리고 ",
          ". 그다음은 "
        ],
        "closer": [
          ". 당시 상황은 그랬습니다.",
          ". 맥락은 그 정도입니다."
        ]
      }
    },
    "premature_summary": {
      "identity": {
        "opener": [
          "정리하면 이렇습니다. ",
          "핵심만 말하면 이겁니다. "
        ],
        "connector": [
          ". 결국 이어지는 설명도 같습니다. ",
          ". 요컨대 남는 건 이겁니다. "
        ],
        "closer": [
          ". 인물 설명은 그걸로 충분합니다.",
          ". 더 돌아갈 이유는 없습니다."
        ]
      },
      "motive": {
        "opener": [
          "결론부터 말하면 이렇습니다. ",
          "핵심만 남기면 이겁니다. "
        ],
        "connector": [
          ". 결국 이유도 같습니다. ",
          ". 요지는 이미 분명합니다. "
        ],
        "closer": [
          ". 이유는 그 선에서 정리됩니다.",
          ". 더 길게 말해도 결론은 같습니다."
        ]
      },
      "emotion": {
        "opener": [
          "감정을 길게 풀 필요는 없습니다. 정리는 이렇습니다. ",
          "정서적으로 봐도 결론은 같습니다. 바로 말하겠습니다. "
        ],
        "connector": [
          ". 결국 남는 감정선도 같습니다. ",
          ". 요컨대 그때의 흐름도 이랬습니다. "
        ],
        "closer": [
          ". 그 감정선이면 설명은 끝납니다.",
          ". 감정도 결국 그 방향이었습니다."
        ]
      },
      "responsibility": {
        "opener": [
          "책임 문제도 정리하면 이렇습니다. ",
          "한마디로 하면 결론은 같습니다. "
        ],
        "connector": [
          ". 결국 인정되는 부분도 같습니다. ",
          ". 남는 판단도 이미 선명합니다. "
        ],
        "closer": [
          ". 여기서 더 늘어놔도 책임 범위는 같습니다.",
          ". 결론은 그 선입니다."
        ]
      },
      "context": {
        "opener": [
          "맥락도 정리하면 이렇습니다. ",
          "돌아갈 것 없이 말하면 이겁니다. "
        ],
        "connector": [
          ". 결국 앞뒤 사정도 같습니다. ",
          ". 정리해서 보면 남는 흐름은 이겁니다. "
        ],
        "closer": [
          ". 그래서 상황 설명은 그걸로 충분합니다.",
          ". 맥락은 그 결론으로 수렴합니다."
        ]
      }
    }
  },
  "assemblyRule": "opener + factText1 + connector + factText2 + closer",
  "singleAtomRule": "opener + factText1 + closer",
  "designNotes": {
    "avoidant": "도입과 종결에 유보·회피 표현을 넣어, 사실을 말해도 망설임과 시선 회피가 남도록 설계했다.",
    "confrontational": "문장 시작부터 단정하고 종결에서 반격이 남도록 배치해, 상대 해석을 정면으로 되받아치게 설계했다.",
    "victim_cosplay": "자기 사정을 앞세우는 도입과 억울함이 남는 종결을 써서, 같은 사실도 피해 서사로 기울게 설계했다.",
    "cold_logic": "사실 정리형 도입과 판단 범위 제한형 종결을 넣어, 감정보다 구분·정리의 느낌이 먼저 오게 했다.",
    "affect_flattening": "짧은 문장과 최소 연결만 남겨 감정을 눌러 말하는 무덤덤한 압축 톤이 유지되도록 했다.",
    "premature_summary": "결론 선점형 도입과 종결을 반복해, 대화를 빨리 닫고 자기 요약으로 몰고 가는 인상을 강화했다."
  }
}

const CHARACTER_BEHAVIOR_HINTS: Record<Archetype, string> = {
  avoidant: '말끝을 흐리며 시선을 자주 피한다.',
  confrontational: '문장 끝마다 시선을 들고 단정적으로 끊는다.',
  victim_cosplay: '억울함이 밴 숨을 고르며 자기 쪽 사정을 앞세운다.',
  cold_logic: '표정을 지우고 순서대로 끊어 말한다.',
  affect_flattening: '표정 변화 없이 짧고 낮게 끊는다.',
  premature_summary: '더 길게 말하고 싶지 않다는 듯 결론만 남긴다.',
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 설정
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONFIG = {
  unlockTurn: 6,
  deterministicThreshold: 6,
  ambiguousGap: 1.5,
  readinessNudgeDefault: 0.5,
  empathyTrustDelta: 2,
} as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 활성화 게이트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LIE_RANK: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }

/**
 * V2 자유 질문 활성화 판정.
 * - V2 사건 + turn >= 6
 * - focus lieState >= S3 OR red_herring_pressed flag
 */
export function canUseFreeQuestionV2(input: {
  isV2Case: boolean
  turn: number
  activeDisputeId: string
  currentLieState?: LieState
  flags: Set<string>
}): boolean {
  if (!input.isV2Case) return false
  if (input.turn < CONFIG.unlockTurn) return false

  const lieOpen = input.currentLieState ? (LIE_RANK[input.currentLieState] ?? 0) >= LIE_RANK['S3'] : false
  const falseIssueOpen = input.flags.has(`${input.activeDisputeId}.red_herring_pressed`)

  return lieOpen || falseIssueOpen
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// intent 키워드 사전
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const INTENT_LEXICON: Record<string, string[]> = {
  identity_check: ['누구', '정체', '무슨 사람', '직함', '어떤 관계'],
  motive_hidden: ['왜', '숨겼', '말 못', '안 말했', '꺼내지 못'],
  privacy_motive: ['왜 폰', '휴대폰', '메신저', '캡처', '묻기 전에', '먼저 안 물어보고'],
  third_party_share: ['누구한테', '언니', '제3자', '남한테 보여', '공유'],
  trap_read: ['왜 그렇게 보여', '왜 외도처럼', '뭐가 수상', '왜 오해'],
  intermediary_route: ['왜 친구 계좌', '왜 우회', '왜 경유', '왜 정우성'],
  rule_origin: ['약속이 왜 생겼', '왜 100만원', '기준이 어디서'],
  relation_core: ['뭘 지키', '왜 서로', '왜 배제', '무엇을 보호'],
  timeline_probe: ['먼저', '언제부터', '정식 돌봄 전', '언제'],
  responsibility_soften: ['왜 계속 지연', '왜 방치가 아니라'],
  context_balance: ['직접 낸', '뭘 직접 냈', '어떤 항목을 냈'],
  trap_clarify: ['아버지가 무슨 뜻', '그 한 줄 뜻', '상속 뜻', '수첩 뜻'],
  procedural_reframe: ['다른 방법', '다른 경로', '정말 다른 루트 없', '절차'],
  relation_rule: ['왜 규칙 지킴이', '왜 그렇게 규칙'],
}

/**
 * disputeAliases를 structure-v2에서 구축하는 헬퍼.
 * DisputeV2.disputeAliases + dispute.name을 합쳐서 alias map 생성.
 */
export function buildDisputeAliasMap(
  disputes: Array<{ id: string; name?: string; disputeAliases?: string[] }>,
): Record<string, string[]> {
  const map: Record<string, string[]> = {}
  for (const d of disputes) {
    const base = [
      ...(d.name ? [d.name] : []),
      ...(d.disputeAliases ?? []),
    ].filter(Boolean)
    map[d.id] = [...new Set(base)]
  }
  return map
}

/** 파일럿 사건 fallback (structure-v2에 disputeAliases가 없는 경우) */
const FALLBACK_DISPUTE_ALIAS: Record<string, string[]> = {
  'd-1': ['280만원', '1800만원', '비밀 송금', '선이체', '예약금', '간병비'],
  'd-2': ['휴대폰', '폰', '캡처', '새벽', '60만원', '지연', '방치'],
  'd-3': ['외도', '최민정', '골목', '상담동', '수첩', '상속', '한 줄'],
  'd-4': ['150만원', '우회', '정우성', '첫 달', '월세', '다른 계좌'],
  'd-5': ['100만원', '약속', '기준', '공동 기록', '공유표', '규칙'],
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 분류기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function classifyFreeQuestion(input: {
  question: string
  activeDisputeId: string
  currentLieState?: LieState
  currentMisconceptionState?: MisconceptionState
  hooks: FreeQuestionHook[]
  disputeAliasMap?: Record<string, string[]>
}): FreeQuestionClassificationResult {
  const normalized = input.question.toLowerCase().replace(/[?？!！.,，]/g, ' ').replace(/\s+/g, ' ').trim()
  const scoreBreakdown: FreeQuestionClassificationResult['scoreBreakdown'] = []

  for (const hook of input.hooks) {
    const reasons: string[] = []
    let score = 0

    // state 허용 체크
    const liveState = input.currentMisconceptionState ?? input.currentLieState
    if (liveState && !hook.allowedAtStates.includes(liveState as any)) {
      scoreBreakdown.push({ hookId: hook.id, score: -999, reasons: ['state_not_allowed'] })
      continue
    }

    // intentTag 키워드 매칭
    const intentHits = INTENT_LEXICON[hook.intentTag] ?? []
    const intentScore = countHits(normalized, intentHits)
    if (intentScore > 0) {
      score += 4 + intentScore
      reasons.push(`intent:+${4 + intentScore}`)
    }

    // dispute alias 매칭 (structure-v2에서 구축한 map 우선, fallback 사용)
    const disputeId = hook.answerEnvelope.disputeId || input.activeDisputeId
    const aliases = input.disputeAliasMap?.[disputeId] ?? FALLBACK_DISPUTE_ALIAS[disputeId] ?? []
    const disputeScore = countHits(normalized, aliases)
    if (disputeScore > 0) {
      score += 2 + disputeScore
      reasons.push(`dispute:+${2 + disputeScore}`)
    }

    // active dispute 보너스
    if (disputeId === input.activeDisputeId) {
      score += 1
      reasons.push('active_dispute:+1')
    }

    // 질문 형태 보너스
    if (/왜|어째서|무슨 이유/.test(input.question) && hook.answerEnvelope.preferredAngleTags?.includes('motive')) {
      score += 2
      reasons.push('motive_shape:+2')
    }
    if (/누구|정체|무슨 사람/.test(input.question) && hook.answerEnvelope.preferredAngleTags?.includes('identity')) {
      score += 2
      reasons.push('identity_shape:+2')
    }
    if (/어떻게 보여|왜 그렇게 읽|오해/.test(input.question) && hook.intentTag.includes('trap')) {
      score += 2
      reasons.push('trap_shape:+2')
    }

    scoreBreakdown.push({ hookId: hook.id, score, reasons })
  }

  const ranked = [...scoreBreakdown].sort((a, b) => b.score - a.score)
  const top = ranked[0]
  const second = ranked[1]

  if (!top || top.score < CONFIG.deterministicThreshold) {
    return {
      mode: 'deterministic',
      allowed: false,
      confidence: 0,
      chosenHookId: null,
      chosenIntentTag: null,
      chosenDisputeId: null,
      inferredQuestionType: 'fact_pursuit',
      inferredAngleTag: 'context',
      scoreBreakdown: ranked,
    }
  }

  const hook = input.hooks.find(h => h.id === top.hookId)!
  const gap = second ? top.score - second.score : 99
  const ambiguous = gap < CONFIG.ambiguousGap

  return {
    mode: ambiguous ? 'llm_tiebreak' : 'deterministic',
    allowed: true,
    confidence: ambiguous ? 0.62 : Math.min(0.95, 0.65 + top.score * 0.03),
    chosenHookId: hook.id,
    chosenIntentTag: hook.intentTag,
    chosenDisputeId: hook.answerEnvelope.disputeId || input.activeDisputeId,
    inferredQuestionType: inferQuestionType(hook.intentTag),
    inferredAngleTag: (hook.answerEnvelope.preferredAngleTags?.[0] as AngleTag) ?? 'context',
    scoreBreakdown: ranked,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// atom 선택 + 응답 생성
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function selectAtoms(
  hook: FreeQuestionHook,
  atomIndex: Record<string, ResolvedAtomLike>,
): ResolvedAtomLike[] {
  const allowed = (hook.answerEnvelope.allowAtomIds ?? [])
    .map(id => atomIndex[id])
    .filter(Boolean)

  if (allowed.length <= 2) return allowed

  const preferred = new Set(hook.answerEnvelope.preferredAngleTags ?? [])
  const scored = allowed.map(atom => {
    const tagBonus = atom.tags.some(t => preferred.has(t)) ? 2 : 0
    const emotionalBonus = atom.tags.some(t => ['emotion', 'fear', 'shame', 'relationship'].includes(t)) ? 1 : 0
    return { atom, score: tagBonus + emotionalBonus }
  })

  return scored.sort((a, b) => b.score - a.score).slice(0, 2).map(x => x.atom)
}

export function renderResponse(params: {
  hook: FreeQuestionHook
  selectedAtoms: ResolvedAtomLike[]
  angleTag: AngleTag
  archetype?: Archetype
  hookReuseCount?: number
}): { response: string; behaviorHint: string } {
  const primary = params.selectedAtoms[0]
  if (!primary) {
    return {
      response: pickRefusal(params.hook.refusalTemplates, 0),
      behaviorHint: '문장을 고르다 말고 시선을 내린다.',
    }
  }

  const second = params.selectedAtoms[1]
  const firstText = stripTerminalPunctuation(primary.factText)
  const secondText = second ? stripTerminalPunctuation(second.factText) : null
  const archetype = resolveArchetype(params.archetype, params.hook)
  const renderAngleTag = normalizeRenderAngleTag(params.angleTag, params.hook.intentTag)
  const tonePattern = pickTonePattern({
    archetype,
    angleTag: renderAngleTag,
    seed: buildToneSeed(params.hook.id, params.selectedAtoms, renderAngleTag),
    hookReuseCount: params.hookReuseCount ?? 0,
  })

  return {
    response: assembleToneAwareResponse({
      opener: tonePattern.opener,
      connector: tonePattern.connector,
      closer: tonePattern.closer,
      firstText,
      secondText,
    }),
    behaviorHint: CHARACTER_BEHAVIOR_HINTS[archetype],
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 효과 계산
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function resolveEffects(
  hook: FreeQuestionHook,
  selectedAtoms: ResolvedAtomLike[],
  runtime: FreeQuestionRuntimeState,
  currentState?: FreeQuestionStateKey,
): FreeQuestionEffect[] {
  const effects: FreeQuestionEffect[] = []

  for (const atom of selectedAtoms) {
    effects.push({ type: 'record_atom', atomId: atom.id })
  }

  if (!runtime.readinessAwardedHookIds.includes(hook.id)) {
    effects.push({ type: 'readiness_nudge', amount: CONFIG.readinessNudgeDefault })
  }

  if (
    ['relation_core', 'relation_rule', 'motive_hidden', 'privacy_motive'].includes(hook.intentTag) &&
    ['S4', 'S5', 'M4'].includes(currentState ?? 'S0')
  ) {
    effects.push({ type: 'trust_delta', amount: CONFIG.empathyTrustDelta })
  }

  if (['relation_core', 'trap_clarify', 'relation_rule'].includes(hook.intentTag)) {
    effects.push({ type: 'set_flag', flag: `${hook.answerEnvelope.disputeId}.free_question_used.${hook.intentTag}` })
  }

  return effects
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 메인 파이프라인
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function processFreeQuestionV2(input: {
  question: string
  activeDisputeId: string
  currentLieState?: LieState
  currentMisconceptionState?: MisconceptionState
  hooks: FreeQuestionHook[]
  atomIndex: Record<string, ResolvedAtomLike>
  runtime: FreeQuestionRuntimeState
  disputeAliasMap?: Record<string, string[]>
  archetype?: Archetype
}): FreeQuestionResultV2 {
  const classification = classifyFreeQuestion({
    question: input.question,
    activeDisputeId: input.activeDisputeId,
    currentLieState: input.currentLieState,
    currentMisconceptionState: input.currentMisconceptionState,
    hooks: input.hooks,
    disputeAliasMap: input.disputeAliasMap,
  })

  if (!classification.allowed || !classification.chosenHookId) {
    return {
      allowed: false,
      hookId: null,
      intentTag: null,
      disputeId: null,
      response: '그 질문은 지금 제 답의 범위를 벗어납니다.',
      behaviorHint: '질문을 되뇌듯 짧게 침묵한다.',
      inferredQuestionType: classification.inferredQuestionType,
      inferredAngleTag: classification.inferredAngleTag,
      selectedAtomIds: [],
      effects: [],
    }
  }

  const hook = input.hooks.find(h => h.id === classification.chosenHookId)!
  const liveState: FreeQuestionStateKey | undefined = input.currentMisconceptionState ?? input.currentLieState

  // state 2차 체크 (classifier에서 이미 했지만 안전장치)
  if (liveState && !hook.allowedAtStates.includes(liveState as any)) {
    const refusal = pickRefusal(
      hook.refusalTemplates,
      input.runtime.refusalHistoryByHook[hook.id] ?? 0,
    )
    return {
      allowed: false,
      hookId: hook.id,
      intentTag: hook.intentTag,
      disputeId: hook.answerEnvelope.disputeId,
      response: refusal,
      behaviorHint: '말을 고르다 멈추고 시선을 피한다.',
      inferredQuestionType: classification.inferredQuestionType,
      inferredAngleTag: classification.inferredAngleTag,
      selectedAtomIds: [],
      effects: [],
    }
  }

  const selectedAtoms = selectAtoms(hook, input.atomIndex)
  const rendered = renderResponse({
    hook,
    selectedAtoms,
    angleTag: classification.inferredAngleTag,
    archetype: input.archetype,
    hookReuseCount: countOccurrences(input.runtime.usedHookIds, hook.id),
  })
  const effects = resolveEffects(hook, selectedAtoms, input.runtime, liveState)

  return {
    allowed: true,
    hookId: hook.id,
    intentTag: hook.intentTag,
    disputeId: hook.answerEnvelope.disputeId,
    response: rendered.response,
    behaviorHint: rendered.behaviorHint,
    inferredQuestionType: classification.inferredQuestionType,
    inferredAngleTag: classification.inferredAngleTag,
    selectedAtomIds: selectedAtoms.map(a => a.id),
    effects,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 헬퍼
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function normalizeRenderAngleTag(angleTag: AngleTag, intentTag?: string): FreeQuestionRenderAngleTag {
  if (angleTag === 'identity') return 'identity'
  if (angleTag === 'motive') return 'motive'
  if (angleTag === 'emotion') return 'emotion'
  if (angleTag === 'responsibility') return 'responsibility'
  if (angleTag === 'context') return 'context'

  if (['relation_core', 'relation_rule', 'motive_hidden', 'privacy_motive'].includes(intentTag ?? '')) {
    return 'motive'
  }

  return 'context'
}

function resolveArchetype(archetype: Archetype | undefined, hook?: FreeQuestionHook): Archetype {
  if (isArchetype(archetype)) return archetype

  const hookWithArchetype = hook as FreeQuestionHook & {
    archetype?: unknown
    speakerArchetype?: unknown
    npcArchetype?: unknown
    answerEnvelope?: {
      archetype?: unknown
      speakerArchetype?: unknown
      npcArchetype?: unknown
    }
  }

  const candidates = [
    hookWithArchetype.archetype,
    hookWithArchetype.speakerArchetype,
    hookWithArchetype.npcArchetype,
    hookWithArchetype.answerEnvelope?.archetype,
    hookWithArchetype.answerEnvelope?.speakerArchetype,
    hookWithArchetype.answerEnvelope?.npcArchetype,
  ]

  for (const candidate of candidates) {
    if (isArchetype(candidate)) return candidate
  }

  return 'cold_logic'
}

function isArchetype(value: unknown): value is Archetype {
  return (
    value === 'avoidant' ||
    value === 'confrontational' ||
    value === 'victim_cosplay' ||
    value === 'cold_logic' ||
    value === 'affect_flattening' ||
    value === 'premature_summary'
  )
}

function pickTonePattern(input: {
  archetype: Archetype
  angleTag: FreeQuestionRenderAngleTag
  seed: string
  hookReuseCount: number
}): { opener: string; connector: string; closer: string } {
  const pattern = FREE_QUESTION_TONE_SPEC.characterTonePatterns[input.archetype][input.angleTag]
  const variantCount = Math.max(1, Math.min(pattern.opener.length, pattern.connector.length, pattern.closer.length))
  const variantIndex = (stableHash(input.seed) + input.hookReuseCount) % variantCount

  return {
    opener: pattern.opener[variantIndex] ?? pattern.opener[0] ?? '',
    connector: pattern.connector[variantIndex] ?? pattern.connector[0] ?? '. ',
    closer: pattern.closer[variantIndex] ?? pattern.closer[0] ?? '.',
  }
}

function buildToneSeed(hookId: string, atoms: ResolvedAtomLike[], angleTag: FreeQuestionRenderAngleTag): string {
  return [hookId, angleTag, ...atoms.map(atom => atom.id)].join('|')
}

function stableHash(text: string): number {
  let hash = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function assembleToneAwareResponse(input: {
  opener: string
  connector: string
  closer: string
  firstText: string
  secondText: string | null
}): string {
  const raw = input.secondText
    ? `${input.opener}${input.firstText}${input.connector}${input.secondText}${input.closer}`
    : `${input.opener}${input.firstText}${input.closer}`

  return normalizeSpacing(raw)
}

function stripTerminalPunctuation(text: string): string {
  return text.trim().replace(/[.。!?？！…]+$/u, '')
}

function normalizeSpacing(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?])/g, '$1')
    .trim()
}

function countOccurrences(values: string[], target: string): number {
  return values.reduce((count, value) => (value === target ? count + 1 : count), 0)
}

function countHits(normalized: string, keywords: string[]): number {
  let hits = 0
  for (const keyword of keywords) {
    if (keyword && normalized.includes(keyword.toLowerCase())) hits += 1
  }
  return hits
}

function inferQuestionType(intentTag: string): QuestionType {
  if (['relation_core', 'relation_rule', 'motive_hidden', 'privacy_motive'].includes(intentTag)) {
    return 'motive_search'
  }
  return 'fact_pursuit'
}

function pickRefusal(templates: string[], usedCount: number): string {
  if (templates.length === 0) return '그 질문에는 지금 바로 답하기 어렵습니다.'
  return templates[usedCount % templates.length]
}
