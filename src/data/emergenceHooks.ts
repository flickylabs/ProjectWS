/**
 * 새 쟁점 emerge 시 NPC 화제 전환 hook 발화.
 * 출처: gpt-pro-runs/npc-hook-and-judge-questions/output/proposals-A-npc-hooks.json
 *
 * 사용:
 *   getEmergenceHook(caseId, disputeId, lieState)
 *   → { speaker, text, behaviorHint } 또는 null (데이터 없는 경우)
 *
 * 변형 선택 전략 (lieState 기반):
 *   S0~S2: attack 톤 (아직 인정 안 한 상태이므로 상대 공격)
 *   S3~S4: confession 톤 (책임 전가/감정 단계 — 자기 잘못 인정 시작)
 *   S5: resignation 톤 (자백 도달 — 체념)
 */

import type { LieState, PartyId } from '../types'

export type EmergenceHookTone = 'confession' | 'attack' | 'resignation'

export interface EmergenceHookVariant {
  tone: EmergenceHookTone
  text: string
  behaviorHint: string
}

export interface EmergenceHook {
  name: string
  speaker: PartyId
  variants: EmergenceHookVariant[]
}

const HOOKS: Record<string, Record<string, EmergenceHook>> = {
  'spouse-01': {
    'd-2': {
      name: '목돈 출금의 경위',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 돈 흐름에 제가 설명하지 않은 부분이 있습니다. 다만 지금은 출금 경위와 사용처를 차례로 확인해야 합니다.',
          behaviorHint: '이준호는 시선을 낮추고 손가락을 맞잡은 채 짧게 숨을 고른다.',
        },
        {
          tone: 'attack',
          text: '제 아내의 의심만으로 돈 문제까지 결론낼 수는 없습니다. 기록의 순서와 제가 설명을 미룬 이유를 함께 봐주십시오.',
          behaviorHint: '이준호는 억울함을 누르듯 턱을 굳히고 박지연 쪽을 잠깐 바라본다.',
        },
        {
          tone: 'resignation',
          text: '…더 피하지 않겠습니다. 목돈이 움직인 경위는 기록대로 확인하겠습니다.',
          behaviorHint: '이준호는 어깨를 떨어뜨리고 한 박자 늦게 재판관을 바라본다.',
        },
      ],
    },
    'h-d3': {
      name: '공동 자금 해지 절차',
      speaker: 'a',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 공동 자금 절차에도 제가 답해야 할 부분이 있습니다. 동의 여부와 처리 순서를 먼저 확인해야 합니다.',
          behaviorHint: '박지연은 입술을 깨물고 두 손을 무릎 위에 꽉 쥔다.',
        },
        {
          tone: 'attack',
          text: '제 남편 말만으로 절차가 모두 설명되는 것은 아닙니다. 누가 어떤 권한으로 처리했는지부터 봐주십시오.',
          behaviorHint: '박지연은 목소리를 높이려다 멈추고, 억눌린 분노를 삼킨다.',
        },
        {
          tone: 'resignation',
          text: '…공동 자금 이야기도 피할 수 없겠네요. 처리 과정은 기록에 맞춰 설명하겠습니다.',
          behaviorHint: '박지연은 고개를 숙인 채 마지막 말만 작게 내뱉는다.',
        },
      ],
    },
    'h-d4': {
      name: '동선과 금전 흐름',
      speaker: 'a',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 동선과 돈 흐름을 따로 떼어 설명하기 어려운 지점이 있습니다. 순서대로 봐 주십시오.',
          behaviorHint: '박지연은 말끝을 흐리지 않으려 애쓰며 정면을 바라본다.',
        },
        {
          tone: 'attack',
          text: '시작이 누구였는지보다, 어떤 기록이 먼저 남았는지가 중요합니다. 동선과 금전 흐름을 분리해서 봐주십시오.',
          behaviorHint: '박지연은 손등으로 눈가를 문지르며 억울함과 죄책감 사이에서 흔들린다.',
        },
        {
          tone: 'resignation',
          text: '…누가 먼저 숨겼는지를 말하기 전에, 남은 기록부터 정리하겠습니다.',
          behaviorHint: '박지연은 더 변명하지 않겠다는 듯 짧게 고개를 끄덕인다.',
        },
      ],
    },
  },
  'family-01': {
    'd-2': {
      name: '공증 절차의 확인 지점',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 공증 문서만으로는 전체 경위를 단정하기 어렵습니다. 작성 시점과 절차를 함께 확인해야 합니다.',
          behaviorHint: '윤정후는 표정을 거의 바꾸지 않지만 손끝이 미세하게 떨린다.',
        },
        {
          tone: 'attack',
          text: '형은 제가 문서 문제를 모두 만든 것처럼 말하지만, 실제 사정은 그 말만으로 끝나지 않습니다. 절차와 기록을 같이 봐주십시오.',
          behaviorHint: '윤정후는 윤태성 쪽을 바라보지 않은 채 낮고 단단하게 말한다.',
        },
        {
          tone: 'resignation',
          text: '…이제는 공증 절차와 문서 작성 시점을 함께 말씀드려야 할 것 같습니다.',
          behaviorHint: '윤정후는 오래 접어둔 종이를 꺼내듯 천천히 말을 잇는다.',
        },
      ],
    },
    'd-3': {
      name: '오래된 자금 흐름',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 오래된 자금 흐름은 출처와 전달 순서를 나눠 봐야 합니다. 제가 계속 입을 다문 것도 잘한 일은 아닙니다.',
          behaviorHint: '윤정후는 담담한 표정을 유지하지만 숨을 길게 내쉰다.',
        },
        {
          tone: 'attack',
          text: '형이 어머님을 평생 혼자 모셨다는 말만으로는 다 설명되지 않습니다. 통장에 남은 흐름을 그대로 봐주십시오.',
          behaviorHint: '윤정후는 처음으로 윤태성 쪽을 똑바로 보며 목소리에 힘을 싣는다.',
        },
        {
          tone: 'resignation',
          text: '…그 돈 이야기까지 나오면 피할 수 없습니다. 입금과 전달 순서를 같이 봐야 합니다.',
          behaviorHint: '윤정후는 체념한 듯 고개를 작게 끄덕이고 손을 내려놓는다.',
        },
      ],
    },
    'd-4': {
      name: '가족 기록과 침묵',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 제가 말하지 않은 가족 사정이 있습니다. 지금은 결론보다 어떤 기록을 확인해야 하는지가 먼저입니다.',
          behaviorHint: '윤정후는 한참 침묵한 뒤, 감정을 누른 목소리로 말한다.',
        },
        {
          tone: 'attack',
          text: '형은 제가 어머님을 이용했다고만 하지만, 제가 왜 말을 막았는지도 봐야 합니다. 그 기록에 가족 사정이 남아 있습니다.',
          behaviorHint: '윤정후는 차갑게 보일 만큼 차분하지만 눈가가 굳어 있다.',
        },
        {
          tone: 'resignation',
          text: '…그 기록은 끝까지 나오지 않길 바랐습니다. 그래도 남은 기록대로 설명하겠습니다.',
          behaviorHint: '윤정후는 시선을 바닥에 두고, 더 버티지 못하겠다는 듯 말한다.',
        },
      ],
    },
    'd-5': {
      name: '어머니 기록의 해석',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 어머니 기록은 저희 둘의 해석을 다시 보게 합니다. 누구 책임인지 단정하기 전에 기록을 정리해야 합니다.',
          behaviorHint: '윤정후는 처음으로 자기 말을 되짚듯 눈을 감았다 뜬다.',
        },
        {
          tone: 'attack',
          text: '형도 어머님 마음을 전부 안다고 단정할 수는 없습니다. 남은 기록과 저희가 받아들인 방식까지 봐야 합니다.',
          behaviorHint: '윤정후는 감정을 올리지 않은 채, 오히려 더 선명하게 발음한다.',
        },
        {
          tone: 'resignation',
          text: '…결국 저희 둘 다 어머님 뜻을 온전히 보지 못했습니다. 기록을 기준으로 다시 말씀드리겠습니다.',
          behaviorHint: '윤정후는 더는 누구를 이기려 하지 않는 표정으로 어깨를 낮춘다.',
        },
      ],
    },
  },
  'friend-01': {
    'd-2': {
      name: '메시지 선후관계',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 그 메시지들은 첫인상만으로 결론내기 어렵습니다. 시간 순서와 답장을 함께 확인해야 합니다.',
          behaviorHint: '최수민은 감정을 눌러 담은 얼굴로 휴대폰을 내려다본다.',
        },
        {
          tone: 'attack',
          text: '송다은 씨는 제가 결혼을 망치려 했다고 말하지만, 먼저 어떤 말이 오갔는지부터 봐야 합니다.',
          behaviorHint: '최수민은 담담한 목소리로 말하지만 손끝에 힘이 들어간다.',
        },
        {
          tone: 'resignation',
          text: '…그 메시지 순서까지 봐야겠네요. 제가 왜 연락을 이어갔는지는 기록을 보고 설명하겠습니다.',
          behaviorHint: '최수민은 체념한 듯 짧게 웃었다가 곧 표정을 거둔다.',
        },
      ],
    },
    'd-3': {
      name: '예비신랑에게 이어진 부탁',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 예비신랑에게 이어진 부탁은 경로와 문구를 따로 확인해야 합니다. 제가 바로 말하지 못한 부분이 있습니다.',
          behaviorHint: '최수민은 말을 고르느라 잠시 눈을 내리깐다.',
        },
        {
          tone: 'attack',
          text: '다은 씨는 제가 결혼을 흔들었다고 하지만, 부탁이 어떤 경로로 이어졌는지 먼저 확인해야 합니다.',
          behaviorHint: '최수민은 차분하게 말하려 하지만 마지막 문장에서 목소리가 조금 떨린다.',
        },
        {
          tone: 'resignation',
          text: '…그 부탁 이야기도 결국 나오게 되어 있었습니다. 제가 연락한 이유는 그 흐름 안에서 봐야 합니다.',
          behaviorHint: '최수민은 오래 참아온 말을 내려놓듯 천천히 고개를 든다.',
        },
      ],
    },
    'd-4': {
      name: '과거 관계가 끊긴 이유',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 과거 관계가 끊긴 이유는 제가 바로 말하지 못한 부분입니다. 남은 기록부터 확인해야 합니다.',
          behaviorHint: '최수민은 무표정에 가까운 얼굴로, 그러나 아주 천천히 말을 꺼낸다.',
        },
        {
          tone: 'attack',
          text: '다은 씨는 제가 이유 없이 멀어졌다고 하지만, 그때 남은 기록과 침묵의 이유를 따로 봐야 합니다.',
          behaviorHint: '최수민은 억울함을 삼키듯 잠시 입을 다문 뒤 말을 잇는다.',
        },
        {
          tone: 'resignation',
          text: '…이 이야기가 나오면 다은 씨도 흔들릴까 봐 피했습니다. 그래도 남은 기록대로 말씀드리겠습니다.',
          behaviorHint: '최수민은 시선을 피하지 않지만 눈빛이 급격히 지친다.',
        },
      ],
    },
    'd-5': {
      name: '단톡방 발언의 책임',
      speaker: 'a',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 단톡방 발언은 확인 순서와 확산 과정을 따로 봐야 합니다. 제가 단정한 부분이 있었는지도 봐주십시오.',
          behaviorHint: '송다은은 방금 전까지의 확신이 꺾인 듯 목소리를 낮춘다.',
        },
        {
          tone: 'attack',
          text: '그때는 저도 예민한 상태라 조용히 넘기기 어려웠습니다. 제 말이 지나쳤을 수도 있다는 건 느끼고 있습니다.',
          behaviorHint: '송다은은 미안함과 원망이 뒤섞인 얼굴로 최수민을 바라본다.',
        },
        {
          tone: 'resignation',
          text: '…단톡방에서 한 말은 되돌릴 수 없습니다. 확인하기 전에 단정한 책임은 제가 설명하겠습니다.',
          behaviorHint: '송다은은 더 반박하지 못하고 손에 쥔 휴대폰을 내려놓는다.',
        },
      ],
    },
  },
}

/**
 * caseId + disputeId의 hook speaker 조회 (변형 선택 전에 lieState 가져오기 위함)
 */
export function getEmergenceHookSpeaker(caseId: string, disputeId: string): PartyId | null {
  return HOOKS[caseId]?.[disputeId]?.speaker ?? null
}

/**
 * caseId + disputeId + 화자의 lieState 기반으로 적절한 hook 변형 선택.
 * - S0~S2: attack 톤 (인정 전 → 상대 공격)
 * - S3~S4: confession 톤 (책임 전가/감정 → 자기 잘못 인정 시작)
 * - S5: resignation 톤 (자백 도달 → 체념)
 *
 * 데이터 없는 경우 null 반환 — 호출자가 generic fallback 사용.
 */
export function getEmergenceHook(
  caseId: string,
  disputeId: string,
  speakerLieState?: LieState,
): { speaker: PartyId; text: string; behaviorHint: string; name: string } | null {
  const caseHooks = HOOKS[caseId]
  if (!caseHooks) return null
  const hook = caseHooks[disputeId]
  if (!hook) return null

  const tone: EmergenceHookTone =
    speakerLieState === 'S5' ? 'resignation'
    : speakerLieState === 'S3' || speakerLieState === 'S4' ? 'confession'
    : 'attack'

  const variant = hook.variants.find((v) => v.tone === tone) ?? hook.variants[0]
  return {
    speaker: hook.speaker,
    text: variant.text,
    behaviorHint: variant.behaviorHint,
    name: hook.name,
  }
}
