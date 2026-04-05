/**
 * 재판관 질문 엔진 V2
 * ─────────────────────────────────
 * - lieState 기반 soft/hard 톤 매핑
 * - depth별 질문 풀 순환 선택 (84종+)
 * - evidence_present 12종 확장
 * - subject fallback '이 문제'
 * - extractDisputeSubject 스포일러 방지 유지
 */

import type { QuestionType } from '../types'
import type { CaseData, PartyId } from '../types'
import type { LieState } from '../types'

type Tone = 'soft' | 'hard'
type QuestionPool = {
  [K in QuestionType]: Record<string, Record<Tone, string[]>>
}

const QUESTION_POOL: QuestionPool = {
  fact_pursuit: {
    depth_0: {
      soft: [
        '${name} 씨, ${subject}에 대해 사실 여부를 확인하겠습니다. 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대해 우선 실제로 있었던 일부터 차례로 설명해 주십시오.',
        '${name} 씨, ${subject}에 대해 아직 선명하지 않은 부분이 있습니다. 당시 상황을 처음부터 말씀해 주시겠습니까?',
      ],
      hard: [
        '${name} 씨, ${subject}에 대해 바로 본론으로 답해 주십시오. 실제로 어떤 일이 있었습니까?',
        '${name} 씨, ${subject}에 관한 설명이 모호합니다. 흐리지 마시고 확인되는 사실만 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대해 핵심 경위를 묻고 있습니다. 있었던 일을 분명히 설명해 주십시오.',
      ],
    },
    depth_1: {
      soft: [
        '${name} 씨, ${subject}에 대해 좀 더 구체적으로 말씀해 주십시오. 정확히 어떤 일이 있었습니까?',
        '${name} 씨, ${subject}에 대해 시점과 경위를 나누어 말씀해 주십시오. 언제, 어떻게 진행됐습니까?',
        '${name} 씨, ${subject}에 관한 설명이 아직 넓습니다. ${name} 씨가 직접 한 행동을 중심으로 말씀해 주십시오.',
      ],
      hard: [
        '${name} 씨, ${subject}에 관해 필요한 부분이 빠져 있습니다. 구체적인 경위를 분명히 말씀해 주십시오.',
        '${name} 씨, ${subject}에 관한 설명이 자꾸 두루뭉술합니다. 시간 순서대로 나누어 답해 주십시오.',
        '${name} 씨, ${subject}에 대해 추상적인 설명은 충분합니다. 누가, 언제, 무엇을 했는지 바로 말씀해 주십시오.',
      ],
    },
    depth_2: {
      soft: [
        '${name} 씨, ${subject}에 관한 사실관계가 아직 분명하지 않습니다. 정확히 무슨 일이 있었는지 다시 설명해 주십시오.',
        '${name} 씨, ${subject}에 관한 앞선 설명만으로는 판단하기 어렵습니다. 빠진 부분 없이 다시 말씀해 주십시오.',
        '${name} 씨, ${subject}에 관한 말씀이 서로 이어지지 않습니다. 처음과 끝을 분명히 해서 설명해 주십시오.',
      ],
      hard: [
        '${name} 씨, ${subject}에 대한 진술이 부분마다 달라집니다. 어느 설명이 실제인지 분명히 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대해 확인할수록 빠지는 대목이 보입니다. 핵심 사실을 빼지 말고 다시 답해 주십시오.',
        '${name} 씨, ${subject}에 관한 설명은 더는 막연해서는 안 됩니다. 실제 경위를 명확하게 말씀해 주십시오.',
      ],
    },
    depth_3: {
      soft: [
        '${name} 씨, ${subject}에 관하여 이미 여러 차례 확인했습니다. 진술이 일관되지 않는데, 사실대로 말씀해 주십시오.',
        '${name} 씨, ${subject}에 관해서는 이미 여러 번 들었습니다. 마지막으로 정리하겠습니다. 실제로 있었던 일을 순서대로 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대한 설명이 길어질수록 핵심이 흐려집니다. 이번에는 빠짐없이 정리해서 말씀해 주십시오.',
      ],
      hard: [
        '${name} 씨, ${subject}에 관한 진술이 계속 흔들리고 있습니다. 더는 돌리지 마십시오. 실제로 무슨 일이 있었습니까?',
        '${name} 씨, ${subject}에 대해 앞뒤가 맞지 않는 진술이 반복되고 있습니다. 어느 쪽이 사실인지 지금 분명히 답해 주십시오.',
        '${name} 씨, ${subject}에 대해 충분히 기회를 드렸습니다. 빠뜨리신 사실이 있다면 지금 말씀하십시오. 더는 기회가 없을 수 있습니다.',
      ],
    },
  },
  motive_search: {
    depth_0: {
      soft: [
        '${name} 씨, ${subject}에 대해 그렇게 판단하신 이유를 설명해 주십시오.',
        '${name} 씨, ${subject}에 대해 어떤 사정을 고려해 그런 선택을 하셨습니까?',
        '${name} 씨, ${subject}에 대해 당시 무엇을 우선으로 보셨는지 말씀해 주시겠습니까?',
      ],
      hard: [
        '${name} 씨, ${subject}에 대한 이유를 분명히 듣고자 합니다. 왜 그런 판단에 이르렀습니까?',
        '${name} 씨, ${subject}에 대해 그렇게 움직인 배경을 돌리지 말고 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대한 선택의 근거가 무엇이었는지 바로 설명해 주십시오.',
      ],
    },
    depth_1: {
      soft: [
        '${name} 씨, ${subject}에 대해 그 판단을 하게 된 직접적인 계기가 무엇이었습니까?',
        '${name} 씨, ${subject}에 대해 다른 선택지도 있었을 텐데, 왜 그쪽을 택하셨습니까?',
        '${name} 씨, ${subject}에 대해 그 결정을 내릴 때 가장 크게 작용한 사정이 무엇이었습니까?',
      ],
      hard: [
        '${name} 씨, ${subject}에 대한 이유 설명이 아직 추상적입니다. 어떤 판단이었는지 구체적으로 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대해 왜 그렇게 하셨는지 핵심 사유만 남겨서 답해 주십시오.',
        '${name} 씨, ${subject}에 대해 선택의 기준이 무엇이었는지 분명히 설명해 주십시오.',
      ],
    },
    depth_2: {
      soft: [
        '${name} 씨, ${subject}에 대해 다른 방법도 생각해 보셨을 텐데, 왜 결국 이 길을 선택하셨습니까?',
        '${name} 씨, ${subject}에 대해 처음 생각과 최종 결정 사이에 무엇이 달라졌는지 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대해 망설이셨다면 무엇 때문에 결국 그 선택을 하셨는지 설명해 주십시오.',
      ],
      hard: [
        '${name} 씨, ${subject}에 대해 그 선택 외에 다른 길은 정말 없었습니까? 왜 그것만이 유일한 방법이었는지 설명해 주십시오.',
        '${name} 씨, ${subject}에 대해 설명이 사정 나열에 머물고 있습니다. 결국 그 판단을 내린 결정적 이유가 무엇이었습니까?',
        '${name} 씨, ${subject}에 대해 책임을 다른 쪽으로 돌리기보다, 본인이 왜 그런 판단을 했는지 분명히 말씀해 주십시오.',
      ],
    },
    depth_3: {
      soft: [
        '${name} 씨, ${subject}에 대해 여러 차례 설명하셨습니다. 최종적으로 어떤 이유에서 그런 결정을 내리셨습니까?',
        '${name} 씨, ${subject}에 대해 돌이켜 보면 그 판단의 출발점이 무엇이었다고 생각하십니까?',
        '${name} 씨, ${subject}에 대해 같은 상황이 다시 온다면 같은 선택을 하시겠습니까? 그 이유를 말씀해 주십시오.',
      ],
      hard: [
        '${name} 씨, ${subject}에 대한 이유가 계속 바뀌고 있습니다. 그 선택 외에 다른 길이 정말 없었습니까? 설명이 부족합니다.',
        '${name} 씨, ${subject}에 대해 선택의 이유가 바뀌어 들립니다. 무엇이 실제 판단 기준이었는지 지금 정리해 주십시오.',
        '${name} 씨, ${subject}에 대해 사정 설명은 충분히 들었습니다. 결국 왜 그 방법밖에 없었는지, 핵심만 답해 주십시오.',
      ],
    },
  },
  empathy_approach: {
    depth_0: {
      soft: [
        '${name} 씨, ${subject}에 대해 그 상황에서 어떤 마음이셨는지 말씀해 주시겠습니까?',
        '${name} 씨, ${subject}에 대해 당시 가장 먼저 든 감정이 무엇이었는지 듣고 싶습니다.',
        '${name} 씨, ${subject}에 대해 겉으로 드러내지 못했던 마음이 있었다면 차분히 말씀해 주십시오.',
      ],
      hard: [
        '${name} 씨, ${subject}에 대해 그때 솔직히 어떤 마음이셨습니까? 있는 그대로 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대해 사정이 있었다고 하셨는데, 그때 심정이 어떠셨는지 구체적으로 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대해 당시 느끼신 감정부터 먼저 들어 보겠습니다. 솔직하게 말씀해 주십시오.',
      ],
    },
    depth_1: {
      soft: [
        '${name} 씨, ${subject}에 대해 그때 느꼈던 감정을 솔직하게 말씀해 주십시오.',
        '${name} 씨, ${subject} 건으로 당시 가장 힘들었던 지점이 무엇이었습니까?',
        '${name} 씨, ${subject}에 대해 혼자 감당하려 했던 부분이 있었다면 말씀해 주시겠습니까?',
      ],
      hard: [
        '${name} 씨, ${subject}에 대해 어렵다고만 하셨는데, 그 안에 어떤 감정이 있었는지 좀 더 구체적으로 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대해 바로 말하기 어려웠던 이유가 있을 겁니다. 그때 어떤 마음이 발목을 잡았습니까?',
        '${name} 씨, ${subject}에 대해 쉽지 않은 이야기인 건 압니다. 그래도 그때 심정을 좀 더 들려주십시오.',
      ],
    },
    depth_2: {
      soft: [
        '${name} 씨, 숨기고 싶은 마음은 이해합니다. 하지만 이 자리에서만은 ${subject}에 대해 솔직해 주십시오.',
        '${name} 씨, ${subject}에 대해 당시 가장 두려웠던 것이 무엇이었는지 말씀해 주시겠습니까?',
        '${name} 씨, ${subject}에 대해 아직 꺼내지 못한 마음이 있다면, 지금 이 자리에서 말씀해 주십시오.',
      ],
      hard: [
        '${name} 씨, 지금까지 말씀하신 것 외에, ${subject}에 대해 당시 정말로 두려웠던 것이 무엇이었습니까?',
        '${name} 씨, ${subject}에 대해 힘들었다는 말씀은 들었습니다. 그 안에 어떤 감정이 있었는지, 조금만 더 솔직해 주십시오.',
        '${name} 씨, ${subject}에 대해 말씀을 아끼고 계신 것 같습니다. 그때 마음속에서 가장 컸던 감정이 무엇이었습니까?',
      ],
    },
    depth_3: {
      soft: [
        '${name} 씨, ${subject}에 대해 이 사건에서 가장 후회되는 순간은 언제입니까?',
        '${name} 씨, ${subject}에 대해 지금 돌이켜 보면 그때 자신에게 무슨 말을 해 주고 싶으십니까?',
        '${name} 씨, ${subject}에 대해 이 자리에서 꼭 전하고 싶은 마음이 있다면 말씀해 주십시오.',
      ],
      hard: [
        '${name} 씨, ${subject}에 대해 지금 이 순간 상대방에게 하고 싶은 말이 있다면 무엇입니까?',
        '${name} 씨, ${subject}에 대해 끝까지 감추고 싶었던 마음이 있지 않습니까? 이 자리에서만은 말씀해 주십시오.',
        '${name} 씨, ${subject}에 대해 모든 설명을 들었습니다. 마지막으로, 그때 가장 견디기 어려웠던 감정이 무엇이었습니까?',
      ],
    },
  },
  evidence_present: {
    depth_0: {
      soft: [
        '${name} 씨, 방금 제시된 자료가 ${subject}에 어떤 관련이 있는지 설명해 주십시오.',
        '${name} 씨, 지금 확인한 기록이 무엇을 보여 주는지 설명해 주십시오.',
      ],
      hard: [
        '${name} 씨, 이 자료가 제시됐습니다. ${subject}에 어떻게 이어지는지 바로 설명해 주십시오.',
        '${name} 씨, 지금 나온 기록을 그냥 지나갈 수는 없습니다. 이 자료가 무엇을 보여 주는지 분명히 말씀해 주십시오.',
      ],
    },
    depth_1: {
      soft: [
        '${name} 씨, 방금 자료를 보고도 설명이 충분하지 않았습니다. 어느 부분이 맞고 어느 부분이 다른지 나누어 말씀해 주십시오.',
        '${name} 씨, 이 기록과 앞선 진술 사이에 차이가 보입니다. ${name} 씨의 설명을 구체적으로 듣겠습니다.',
      ],
      hard: [
        '${name} 씨, 자료 내용과 방금 진술이 서로 맞지 않는 부분이 있습니다. 어느 쪽이 실제와 가까운지 분명히 말씀해 주십시오.',
        '${name} 씨, 이 증거가 나왔는데도 설명이 흐립니다. 핵심만 남겨 두고 바로 답해 주십시오.',
      ],
    },
    depth_2: {
      soft: [
        '${name} 씨, 마지막으로 이 자료를 기준으로 정리하겠습니다. 이 기록이 남게 된 경위를 차례로 말씀해 주십시오.',
        '${name} 씨, 더는 길게 말씀하실 필요 없습니다. 지금 제시된 자료가 의미하는 바를 정확히 설명해 주십시오.',
      ],
      hard: [
        '${name} 씨, 이 자료 앞에서 설명이 계속 달라지고 있습니다. 돌리지 마시고 이 기록이 남은 이유를 바로 말씀해 주십시오.',
        '${name} 씨, 방금 제시된 증거와 어긋나는 진술은 그대로 두기 어렵습니다. 어느 부분이 사실인지 분명하게 정리해 주십시오.',
      ],
    },
  },
} as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 질문 순환 선택 상태
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const rotationState = new Map<string, number>()

/** 게임 세션 초기화 시 호출하여 순환 상태를 리셋한다 */
export function resetQuestionRotation(): void {
  rotationState.clear()
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 메인 엔트리
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 엔진 기반 재판관 질문 생성.
 * lieState + depth + questionType → tone + 순환 변형 선택
 */
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

  return interpolate(template, { name, subject })
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 함수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

function pickRotatingTemplate(key: string, templates: readonly string[]): string {
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
