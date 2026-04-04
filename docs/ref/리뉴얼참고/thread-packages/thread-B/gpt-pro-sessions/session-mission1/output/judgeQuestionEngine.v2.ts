/**
 * 재판관 질문 엔진 V2
 * - lieState 기반 soft/hard 톤 매핑
 * - depth별 질문 풀 순환 선택
 * - evidence_present 12종 확장
 * - subject fallback을 '이 문제'로 조정
 */

import type { QuestionType } from '../types'
import type { CaseData, PartyId } from '../types'
import type { LieState } from '../types'

type Tone = 'soft' | 'hard'
type QuestionPool = {
  [K in QuestionType]: Record<string, Record<Tone, string[]>>
}

const QUESTION_POOL: QuestionPool = {
  "fact_pursuit": {
    "depth_0": {
      "soft": [
        "${name} 씨, ${subject}에 대해 사실 여부를 확인하겠습니다. 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 우선 실제로 있었던 일부터 차례로 설명해 주십시오.",
        "${name} 씨, ${subject}에 대해 아직 선명하지 않은 부분이 있습니다. 당시 상황을 처음부터 말씀해 주시겠습니까?"
      ],
      "hard": [
        "${name} 씨, ${subject}에 대해 바로 본론으로 답해 주십시오. 실제로 어떤 일이 있었습니까?",
        "${name} 씨, ${subject}에 관한 설명이 모호합니다. 흐리지 마시고 확인되는 사실만 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 핵심 경위를 묻고 있습니다. 있었던 일을 분명히 설명해 주십시오."
      ]
    },
    "depth_1": {
      "soft": [
        "${name} 씨, ${subject}에 대해 좀 더 구체적으로 말씀해 주십시오. 정확히 어떤 일이 있었습니까?",
        "${name} 씨, ${subject}에 대해 시점과 경위를 나누어 말씀해 주십시오. 언제, 어떻게 진행됐습니까?",
        "${name} 씨, ${subject}에 관한 설명이 아직 넓습니다. ${name} 씨가 직접 한 행동을 중심으로 말씀해 주십시오."
      ],
      "hard": [
        "${name} 씨, ${subject}에 관해 필요한 부분이 빠져 있습니다. 구체적인 경위를 분명히 말씀해 주십시오.",
        "${name} 씨, ${subject}에 관한 설명이 자꾸 두루뭉술합니다. 시간 순서대로 나누어 답해 주십시오.",
        "${name} 씨, ${subject}에 대해 추상적인 설명은 충분합니다. 누가, 언제, 무엇을 했는지 바로 말씀해 주십시오."
      ]
    },
    "depth_2": {
      "soft": [
        "${name} 씨, ${subject}에 관한 사실관계가 아직 분명하지 않습니다. 정확히 무슨 일이 있었는지 다시 설명해 주십시오.",
        "${name} 씨, ${subject}에 관한 앞선 설명만으로는 판단하기 어렵습니다. 빠진 부분 없이 다시 말씀해 주십시오.",
        "${name} 씨, ${subject}에 관한 말씀이 서로 이어지지 않습니다. 처음과 끝을 분명히 해서 설명해 주십시오."
      ],
      "hard": [
        "${name} 씨, ${subject}에 대한 진술이 부분마다 달라집니다. 어느 설명이 실제인지 분명히 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 확인할수록 빠지는 대목이 보입니다. 핵심 사실을 빼지 말고 다시 답해 주십시오.",
        "${name} 씨, ${subject} 설명은 더는 막연해서는 안 됩니다. 실제 경위를 명확하게 말씀해 주십시오."
      ]
    },
    "depth_3": {
      "soft": [
        "${name} 씨, ${subject}에 관하여 이미 여러 차례 확인했습니다. 진술이 일관되지 않는데, 사실대로 말씀해 주십시오.",
        "${name} 씨, ${subject}에 관해서는 이미 여러 번 들었습니다. 마지막으로 정리하겠습니다. 실제로 있었던 일을 순서대로 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대한 설명이 길어질수록 핵심이 흐려집니다. 이번에는 빠짐없이 정리해서 말씀해 주십시오."
      ],
      "hard": [
        "${name} 씨, ${subject}에 관한 진술이 계속 흔들리고 있습니다. 더는 돌리지 마시고 실제 경위를 분명히 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 서로 맞지 않는 말씀이 반복되고 있습니다. 어느 부분이 사실인지 지금 정리해 주십시오.",
        "${name} 씨, ${subject}에 대해서는 이미 충분히 확인했습니다. 남는 부분만 답하시고, 실제로 있었던 일을 명확히 말씀해 주십시오."
      ]
    }
  },
  "motive_search": {
    "depth_0": {
      "soft": [
        "${name} 씨, ${subject}에 대해 그렇게 판단하신 이유를 설명해 주십시오.",
        "${name} 씨, ${subject}에 대해 어떤 사정을 고려해 그런 선택을 하셨습니까?",
        "${name} 씨, ${subject}에 대해 당시 무엇을 우선으로 보셨는지 말씀해 주시겠습니까?"
      ],
      "hard": [
        "${name} 씨, ${subject}에 대한 이유를 분명히 듣고자 합니다. 왜 그런 판단에 이르렀습니까?",
        "${name} 씨, ${subject}에 대해 그렇게 움직인 배경을 돌리지 말고 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대한 선택의 근거가 무엇이었는지 바로 설명해 주십시오."
      ]
    },
    "depth_1": {
      "soft": [
        "${name} 씨, ${subject}에 대해 그 판단을 하게 된 직접적인 계기가 무엇이었습니까?",
        "${name} 씨, ${subject}에 대해 다른 선택지도 있었을 텐데, 왜 그쪽을 택하셨습니까?",
        "${name} 씨, ${subject}에 대해 그 결정을 내릴 때 가장 크게 작용한 사정이 무엇이었습니까?"
      ],
      "hard": [
        "${name} 씨, ${subject}에 대한 이유 설명이 아직 추상적입니다. 어떤 판단이었는지 구체적으로 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 왜 그렇게 하셨는지 핵심 사유만 남겨서 답해 주십시오.",
        "${name} 씨, ${subject}에 대해 선택의 기준이 무엇이었는지 분명히 설명해 주십시오."
      ]
    },
    "depth_2": {
      "soft": [
        "${name} 씨, ${subject}에 대한 판단 과정을 더 분명히 듣겠습니다. 그때 무엇이 가장 크게 영향을 미쳤습니까?",
        "${name} 씨, ${subject}에 대해 처음 생각과 최종 결정 사이에 무엇이 달라졌는지 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 망설이셨다면 무엇 때문에 결국 그 선택을 하셨는지 설명해 주십시오."
      ],
      "hard": [
        "${name} 씨, ${subject}에 대한 이유가 앞선 설명과 맞지 않는 부분이 있습니다. 어떤 판단이었는지 분명히 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대한 설명이 사정 나열에 머물고 있습니다. 결국 결정하게 만든 이유를 바로 답해 주십시오.",
        "${name} 씨, ${subject}에 대해 책임을 다른 쪽으로 돌리기보다, 본인이 어떤 판단을 했는지 분명히 말씀해 주십시오."
      ]
    },
    "depth_3": {
      "soft": [
        "${name} 씨, ${subject}에 대한 판단 이유를 마지막으로 정리해 주십시오. 그 선택을 하게 된 핵심 사정을 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 여러 차례 설명하셨습니다. 최종적으로 어떤 이유에서 그런 결정을 내리셨습니까?",
        "${name} 씨, ${subject}에 대해 이 자리에서 확인하고 싶은 것은 판단의 출발점입니다. 그 이유를 차분히 정리해 주십시오."
      ],
      "hard": [
        "${name} 씨, ${subject}에 대한 이유 설명이 계속 흔들립니다. 더는 에둘러 말씀하지 마시고 판단 근거를 분명히 답해 주십시오.",
        "${name} 씨, ${subject}에 대해 선택의 이유가 바뀌어 들립니다. 무엇이 실제 판단 기준이었는지 지금 정리해 주십시오.",
        "${name} 씨, ${subject}에 대해 사정 설명은 충분히 들었습니다. 결국 왜 그렇게 하셨는지 간명하게라도 분명히 말씀해 주십시오."
      ]
    }
  },
  "empathy_approach": {
    "depth_0": {
      "soft": [
        "${name} 씨, ${subject}에 대해 당시 어떤 심정이셨는지 말씀해 주시겠습니까?",
        "${name} 씨, ${subject}에 대해 그때 가장 크게 느낀 부담이 무엇이었는지 듣겠습니다.",
        "${name} 씨, ${subject}에 대해 겉으로 드러내지 못했던 마음이 있었다면 차분히 말씀해 주십시오."
      ],
      "hard": [
        "${name} 씨, ${subject}에 대해 감정 설명도 필요합니다. 당시 어떤 마음이었는지 분명히 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 사정이 있었다고 하셨는데, 구체적으로 어떤 심경이었습니까?",
        "${name} 씨, ${subject}에 대해 막연한 어려움이 아니라 실제 느끼신 부담을 말씀해 주십시오."
      ]
    },
    "depth_1": {
      "soft": [
        "${name} 씨, ${subject} 당시 가장 힘들었던 지점이 무엇이었습니까?",
        "${name} 씨, ${subject}에 대해 바로 말하기 어려웠다면 그 이유가 된 마음을 설명해 주십시오.",
        "${name} 씨, ${subject}에 대해 혼자 감당하려 했던 부분이 있었다면 말씀해 주시겠습니까?"
      ],
      "hard": [
        "${name} 씨, ${subject}에 대해 어렵다는 말씀만으로는 부족합니다. 무엇이 가장 부담이었는지 분명히 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 감정을 앞세우고 계신데, 그 감정의 내용이 무엇인지 구체적으로 설명해 주십시오.",
        "${name} 씨, ${subject}에 대해 선뜻 말하지 못한 사정이 있었다면 지금은 흐리지 말고 말씀해 주십시오."
      ]
    },
    "depth_2": {
      "soft": [
        "${name} 씨, ${subject}에 대해 그때 마음을 더 듣겠습니다. 어떤 두려움이나 부담이 있었습니까?",
        "${name} 씨, ${subject}에 대해 판단을 흐리게 만들 만큼 힘들었던 부분이 무엇이었는지 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 겉으로 드러내지 못한 마음이 있었다면 지금 설명해 주십시오."
      ],
      "hard": [
        "${name} 씨, ${subject}에 대해 감정 호소만으로는 충분하지 않습니다. 무엇이 실제 압박으로 작용했는지 분명히 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 힘들었다는 설명은 들었습니다. 그 힘듦이 어떤 선택으로 이어졌는지 구체적으로 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 억울함을 말씀하시기 전에, 그때 어떤 마음 때문에 판단이 달라졌는지 먼저 답해 주십시오."
      ]
    },
    "depth_3": {
      "soft": [
        "${name} 씨, ${subject}에 대한 심정을 마지막으로 정리해 주십시오. 그때 가장 크게 작용한 감정이 무엇이었습니까?",
        "${name} 씨, ${subject}에 대해 여러 차례 설명하셨습니다. 지금은 그때 마음을 차분히 정리해서 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 겉으로 나온 말보다 마음속 부담을 듣고자 합니다. 마지막으로 설명해 주십시오."
      ],
      "hard": [
        "${name} 씨, ${subject}에 대해 감정 설명이 사실관계를 가리면 안 됩니다. 무엇이 실제 심경이었는지 분명히 말씀해 주십시오.",
        "${name} 씨, ${subject}에 대해 더는 막연하게 어려웠다고만 하실 수는 없습니다. 그 마음의 내용이 무엇이었는지 바로 답해 주십시오.",
        "${name} 씨, ${subject}에 대해 감정에 기대는 설명과 실제 심경은 구별되어야 합니다. 본인이 느낀 부담을 정확히 설명해 주십시오."
      ]
    }
  },
  "evidence_present": {
    "depth_0": {
      "soft": [
        "${name} 씨, 방금 제시된 자료가 ${subject}에 어떤 관련이 있는지 설명해 주십시오.",
        "${name} 씨, 지금 확인한 기록이 무엇을 보여 주는지 설명해 주십시오."
      ],
      "hard": [
        "${name} 씨, 이 자료가 제시됐습니다. ${subject}에 어떻게 이어지는지 바로 설명해 주십시오.",
        "${name} 씨, 지금 나온 기록을 그냥 지나갈 수는 없습니다. 이 자료가 무엇을 보여 주는지 분명히 말씀해 주십시오."
      ]
    },
    "depth_1": {
      "soft": [
        "${name} 씨, 방금 자료를 보고도 설명이 충분하지 않았습니다. 어느 부분이 맞고 어느 부분이 다른지 나누어 말씀해 주십시오.",
        "${name} 씨, 이 기록과 앞선 진술 사이에 차이가 보입니다. ${name} 씨의 설명을 구체적으로 듣겠습니다."
      ],
      "hard": [
        "${name} 씨, 자료 내용과 방금 진술이 서로 맞지 않는 부분이 있습니다. 어느 쪽이 실제와 가까운지 분명히 말씀해 주십시오.",
        "${name} 씨, 이 증거가 나왔는데도 설명이 흐립니다. 핵심만 남겨 두고 바로 답해 주십시오."
      ]
    },
    "depth_2": {
      "soft": [
        "${name} 씨, 마지막으로 이 자료를 기준으로 정리하겠습니다. 이 기록이 남게 된 경위를 차례로 말씀해 주십시오.",
        "${name} 씨, 더는 길게 말씀하실 필요 없습니다. 지금 제시된 자료가 의미하는 바를 정확히 설명해 주십시오."
      ],
      "hard": [
        "${name} 씨, 이 자료 앞에서 설명이 계속 달라지고 있습니다. 돌리지 마시고 이 기록이 남은 이유를 바로 말씀해 주십시오.",
        "${name} 씨, 방금 제시된 증거와 어긋나는 진술은 그대로 두기 어렵습니다. 어느 부분이 사실인지 분명하게 정리해 주십시오."
      ]
    }
  }
} as const

const rotationState = new Map<string, number>()

export function generateJudgeQuestion(
  questionType: QuestionType,
  caseData: CaseData,
  target: PartyId,
  disputeId: string,
  interrogationDepth: number,
  lieState?: LieState,
): string {
  const profile = target === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const dispute = caseData.disputes.find(d => d.id === disputeId)

  if (!dispute) return `${profile.name} 씨, 설명해 주십시오.`

  const name = profile.name
  const subject = extractDisputeSubject(dispute.name)
  const tone = resolveTone(lieState, interrogationDepth)
  const depthKey = resolveDepthKey(questionType, interrogationDepth)
  const templates = QUESTION_POOL[questionType][depthKey]?.[tone]

  if (!templates || templates.length === 0) {
    return `${name} 씨, 설명해 주십시오.`
  }

  const rotationKey = [target, disputeId, questionType, depthKey, tone].join(':')
  const template = pickRotatingTemplate(rotationKey, templates)

  return interpolate(template, {
    name,
    subject,
  })
}

function resolveDepthKey(questionType: QuestionType, interrogationDepth: number): string {
  const maxDepth = questionType === 'evidence_present' ? 2 : 3
  const clamped = Math.max(0, Math.min(interrogationDepth, maxDepth))
  return `depth_${clamped}`
}

function resolveTone(lieState: LieState | undefined, depth: number): Tone {
  if (!lieState) return depth < 2 ? 'soft' : 'hard'

  switch (lieState) {
    case 'S0':
    case 'S1':
    case 'S5':
      return 'soft'
    case 'S2':
      return depth < 2 ? 'soft' : 'hard'
    case 'S3':
    case 'S4':
      return 'hard'
    default:
      return depth < 2 ? 'soft' : 'hard'
  }
}

function pickRotatingTemplate(key: string, templates: string[]): string {
  const index = rotationState.get(key) ?? 0
  rotationState.set(key, index + 1)
  return templates[index % templates.length]
}

function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\$\{(\w+)\}/g, (_, key) => values[key] ?? '')
}

/**
 * 쟁점명에서 재판관 질문에 쓸 수 있는 중립적 소재를 추출한다.
 * Progressive Truth Throttle: 스포일러 단어를 제거해
 * 재판관 질문이 진실을 선제 노출하지 않도록 한다.
 */
function extractDisputeSubject(disputeName: string): string {
  let subject = disputeName.replace(/^[가-힣]+의\s+/, '')

  const spoilerWords =
    /비밀|외도|횡령|착복|사기|배임|도박|폭행|학대|불륜|간통|위조|은닉|유용|탈세/g
  subject = subject.replace(spoilerWords, '')

  subject = subject.replace(/\s*[\d,]+만?\s*원\s*/g, ' ')
  subject = subject.replace(/\d+월\s*\d+일/g, '').replace(/\d+시/g, '')
  subject = subject.trim()

  const words = subject.split(/\s+/).filter(Boolean)
  const unique = words.filter((word, index) => words.indexOf(word) === index)
  subject = unique.join(' ').trim()

  return subject.length >= 2 ? subject : '이 문제'
}
