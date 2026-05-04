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
      name: '개인 비자금 3,000만원 출금',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 사실은 저도 돈 문제를 숨겼습니다. 제 개인 계좌에서 비자금 3,000만원을 현금으로 빼 형에게 건넸습니다.',
          behaviorHint: '이준호는 시선을 낮추고 손가락을 맞잡은 채 짧게 숨을 고른다.',
        },
        {
          tone: 'attack',
          text: '제 아내가 저를 딴 살림처럼 몰아갔지만, 그 돈 문제도 한쪽 말만으로 보면 안 됩니다. 제가 바로 설명하기 어려운 가족 일이 있었고, 지금은 사용처를 단정하지 말아주셨으면 합니다.',
          behaviorHint: '이준호는 억울함을 누르듯 턱을 굳히고 박지연 쪽을 잠깐 바라본다.',
        },
        {
          tone: 'resignation',
          text: '…이제 숨겨도 소용없겠습니다. 개인 비자금 3,000만원을 출금한 건 맞고, 그 돈은 형에게 갔습니다.',
          behaviorHint: '이준호는 어깨를 떨어뜨리고 한 박자 늦게 재판관을 바라본다.',
        },
      ],
    },
    'h-d3': {
      name: '공동 적금 2,000만원 해지 (위임장 조작)',
      speaker: 'a',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 저도 돈 얘기에서 떳떳하지 못합니다. 제 남편 명의 위임장을 제가 손댔고, 공동 적금 2,000만원을 해지했습니다.',
          behaviorHint: '박지연은 입술을 깨물고 두 손을 무릎 위에 꽉 쥔다.',
        },
        {
          tone: 'attack',
          text: '제 남편이 큰돈을 숨긴 일만 보면 안 됩니다. 제가 공동 적금에 손댄 것도 잘못이지만, 그 사람이 먼저 설명을 피했다는 점도 봐주셔야 합니다.',
          behaviorHint: '박지연은 목소리를 높이려다 멈추고, 억눌린 분노를 삼킨다.',
        },
        {
          tone: 'resignation',
          text: '…더는 적금 얘기를 피할 수 없겠네요. 공동 적금 2,000만원을 해지한 사람은 저입니다, 위임장도 제가 꾸몄습니다.',
          behaviorHint: '박지연은 고개를 숙인 채 마지막 말만 작게 내뱉는다.',
        },
      ],
    },
    'h-d4': {
      name: '은폐와 선제행동의 순서',
      speaker: 'a',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 순서를 제가 제게 유리하게 말했습니다. 계좌를 먼저 들여다본 것도 저였고, 위임장까지 만든 건 돌이킬 수 없는 제 잘못입니다.',
          behaviorHint: '박지연은 말끝을 흐리지 않으려 애쓰며 정면을 바라본다.',
        },
        {
          tone: 'attack',
          text: '그래도 시작은 제 남편이었습니다. 말 못 할 가족 문제와 큰돈을 숨긴 사람이 먼저 있었고, 그 뒤에 저도 무너진 겁니다.',
          behaviorHint: '박지연은 손등으로 눈가를 문지르며 억울함과 죄책감 사이에서 흔들린다.',
        },
        {
          tone: 'resignation',
          text: '…누가 먼저였는지 따지는 것도 결국 다 나와야겠죠. 숨긴 건 제 남편이 먼저였고, 감시와 위임장 조작은 제가 한 일입니다.',
          behaviorHint: '박지연은 더 변명하지 않겠다는 듯 짧게 고개를 끄덕인다.',
        },
      ],
    },
  },
  'family-01': {
    'd-2': {
      name: '60:40 유서의 진짜 의도',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 60:40 유서 그대로도 진실은 아닙니다. 원래 어머니가 남긴 비율은 90:10이었고, 제가 60:40으로 고쳤습니다.',
          behaviorHint: '윤정후는 표정을 거의 바꾸지 않지만 손끝이 미세하게 떨린다.',
        },
        {
          tone: 'attack',
          text: '형은 제가 욕심을 부렸다고 몰아붙이지만, 실제 사정은 그 말만으로 끝나지 않습니다. 그렇다고 서류 문제의 책임이 가벼워지는 건 아닙니다.',
          behaviorHint: '윤정후는 윤태성 쪽을 바라보지 않은 채 낮고 단단하게 말한다.',
        },
        {
          tone: 'resignation',
          text: '…이제는 말해야겠습니다. 60:40이라는 숫자는 어머니가 처음 남긴 그대로가 아닙니다. 제가 손댔습니다.',
          behaviorHint: '윤정후는 오래 접어둔 종이를 꺼내듯 천천히 말을 잇는다.',
        },
      ],
    },
    'd-3': {
      name: '20년 송금의 실체',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 제가 계속 입을 다문 것도 잘못입니다. 20년 동안 어머니께 생활비를 보냈고, 형 공장 일이 급했을 때도 제가 대신 갚았습니다.',
          behaviorHint: '윤정후는 담담한 표정을 유지하지만 숨을 길게 내쉰다.',
        },
        {
          tone: 'attack',
          text: '형이 어머니를 평생 혼자 모셨다는 말만으로는 다 설명이 안 됩니다. 어머니 돈처럼 보였던 것 중 상당수는 제가 보낸 돈이었습니다.',
          behaviorHint: '윤정후는 처음으로 윤태성 쪽을 똑바로 보며 목소리에 힘을 싣는다.',
        },
        {
          tone: 'resignation',
          text: '…그 돈 얘기까지 나오면 더는 숨길 수 없습니다. 매달 보낸 생활비와 형 공장 부도 위기 때 대신 갚은 돈도 같이 봐야 합니다.',
          behaviorHint: '윤정후는 체념한 듯 고개를 작게 끄덕이고 손을 내려놓는다.',
        },
      ],
    },
    'd-4': {
      name: '출생 비밀과 침묵의 이유',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 제가 유서를 고친 건 단순히 돈 때문만은 아니었습니다. 형이 출생의 비밀을 알게 될까 봐, 90:10을 60:40으로 줄였습니다.',
          behaviorHint: '윤정후는 한참 침묵한 뒤, 감정을 누른 목소리로 말한다.',
        },
        {
          tone: 'attack',
          text: '형은 제가 어머니를 이용했다고만 하지만, 저는 형이 감당 못 할 진실을 막으려 했습니다. 그 일기장에 적힌 출생 문제까지 봐야 합니다.',
          behaviorHint: '윤정후는 차갑게 보일 만큼 차분하지만 눈가가 굳어 있다.',
        },
        {
          tone: 'resignation',
          text: '…이 비밀은 끝까지 안 나오길 바랐습니다. 형과 부모님 사이의 출생 문제 때문에 제가 침묵했습니다.',
          behaviorHint: '윤정후는 시선을 바닥에 두고, 더 버티지 못하겠다는 듯 말한다.',
        },
      ],
    },
    'd-5': {
      name: '어머니 이용의 진짜 주체',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 저도 어머니 뜻을 지킨다고 말하면서 결국 제 손으로 고쳤습니다. 보호라는 말 뒤에 형을 제 방식대로 움직인 겁니다.',
          behaviorHint: '윤정후는 처음으로 자기 말을 되짚듯 눈을 감았다 뜬다.',
        },
        {
          tone: 'attack',
          text: '형도 어머니를 그냥 어머니로 두지는 않았습니다. 모셨다는 이유로 유산을 당연하게 여긴 부분까지 함께 봐야 합니다.',
          behaviorHint: '윤정후는 감정을 올리지 않은 채, 오히려 더 선명하게 발음한다.',
        },
        {
          tone: 'resignation',
          text: '…결국 우리 둘 다 어머니를 있는 그대로 두지 못했습니다. 형은 당연한 몫으로, 저는 보호라는 명분으로 어머니 뜻을 건드렸습니다.',
          behaviorHint: '윤정후는 더는 누구를 이기려 하지 않는 표정으로 어깨를 낮춘다.',
        },
      ],
    },
  },
  'friend-01': {
    'd-2': {
      name: '예비신랑의 선넘는 접근',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 제가 다은이 예비신랑에게 계속 연락한 건 맞습니다. 다만 먼저 선을 넘는 메시지를 보낸 건 그쪽이었고, 저는 거절했습니다.',
          behaviorHint: '최수민은 감정을 눌러 담은 얼굴로 휴대폰을 내려다본다.',
        },
        {
          tone: 'attack',
          text: '다은이는 제가 결혼을 망치려 했다고만 말하지만, 먼저 접근한 건 예비신랑이었습니다. 그 메시지를 빼고 제 연락만 보면 안 됩니다.',
          behaviorHint: '최수민은 담담한 목소리로 말하지만 손끝에 힘이 들어간다.',
        },
        {
          tone: 'resignation',
          text: '…이제 그 메시지까지 꺼내야겠네요. 저는 먼저 접근하지 않았고, 선을 넘은 연락을 받은 뒤에야 경고하려 했습니다.',
          behaviorHint: '최수민은 체념한 듯 짧게 웃었다가 곧 표정을 거둔다.',
        },
      ],
    },
    'd-3': {
      name: '아버지의 돈 접근 패턴',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 제가 다은이에게 직접 말하지 못한 건 제 잘못입니다. 다은이 아버지가 예비신랑에게 돈 얘기를 꺼내고 있었고, 저는 그 패턴을 알고 있었습니다.',
          behaviorHint: '최수민은 말을 고르느라 잠시 눈을 내리깐다.',
        },
        {
          tone: 'attack',
          text: '다은이는 제가 결혼을 흔들려고 했다고 하지만, 아버지가 또 돈 문제로 접근하는 걸 보고도 가만히 있을 수는 없었습니다. 제가 본 건 집착이 아니라 반복되는 패턴이었습니다.',
          behaviorHint: '최수민은 차분하게 말하려 하지만 마지막 문장에서 목소리가 조금 떨린다.',
        },
        {
          tone: 'resignation',
          text: '…아버지 돈 얘기는 결국 나오게 되어 있었습니다. 제가 예비신랑에게 연락한 건 그 접근을 막아보려던 겁니다.',
          behaviorHint: '최수민은 오래 참아온 말을 내려놓듯 천천히 고개를 든다.',
        },
      ],
    },
    'd-4': {
      name: '과거 손절과 아버지의 사기',
      speaker: 'b',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 제가 손절당할 때도 끝까지 말하지 못한 게 있습니다. 다은이 아버지가 투자 명목으로 제 돈을 가져갔고, 저는 그걸 사기라고 말할 용기가 없었습니다.',
          behaviorHint: '최수민은 무표정에 가까운 얼굴로, 그러나 아주 천천히 말을 꺼낸다.',
        },
        {
          tone: 'attack',
          text: '다은이는 제가 이유 없이 멀어졌다고 했지만, 진짜 이유는 다은이 아버지와 얽힌 과거 자금 관련 일이었습니다. 제가 악역이 된 건 그 말을 차마 못 했기 때문입니다.',
          behaviorHint: '최수민은 억울함을 삼키듯 잠시 입을 다문 뒤 말을 잇는다.',
        },
        {
          tone: 'resignation',
          text: '…이 얘기까지 하면 다은이도 무너질까 봐 숨겼습니다. 손절의 시작은 제 변덕이 아니라 아버지의 돈 문제였습니다.',
          behaviorHint: '최수민은 시선을 피하지 않지만 눈빛이 급격히 지친다.',
        },
      ],
    },
    'd-5': {
      name: '단톡방 매도와 명예훼손',
      speaker: 'a',
      variants: [
        {
          tone: 'confession',
          text: '재판관님, 제가 확인도 하지 않고 단톡방에 수민이를 몰아세운 건 맞습니다. 그 말들이 수민이에게 어떤 상처가 될지 생각하지 않았습니다.',
          behaviorHint: '송다은은 방금 전까지의 확신이 꺾인 듯 목소리를 낮춘다.',
        },
        {
          tone: 'attack',
          text: '하지만 그쪽도 늘 설명 대신 침묵을 택했습니다. 제가 단정한 건 잘못이지만, 그렇게 혼자 악역처럼 굴면 누가 믿을 수 있겠습니까?',
          behaviorHint: '송다은은 미안함과 원망이 뒤섞인 얼굴로 최수민을 바라본다.',
        },
        {
          tone: 'resignation',
          text: '…단톡방에서 한 말은 돌릴 수 없겠죠. 확인하기 전에 수민이를 매도한 책임은 제가 져야 합니다.',
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
