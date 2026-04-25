/**
 * Confession Scripts — 활성 3사건 자백 발화 데이터
 * ─────────────────────────────────────────────────
 * 체념 진입 시 NPC가 출력하는 사전 작성된 자백 entry.
 * GPT Pro 작성 + Claude 한국어 보정(호칭 7건).
 *
 * 사용 흐름:
 * 1. 캐릭터 emotion ≥ 85 도달 → 체념 진입
 * 2. 시스템 메시지 + 자백 유도 모달 ("자백 유도" / "추가 추궁")
 * 3. "자백 유도" 선택 시 → getConfession(caseId, party, disputeId) → 3단계 dispatch
 * 4. 재판관의 수첩에 등록
 * 5. confessionDispatched flag → 동일 쟁점은 짧은 재진술
 */

import type { PartyId } from '../types'

export interface ConfessionEntry {
  speaker: PartyId
  /** 대표 disputeId (첫 번째). 실제 매칭은 KEY_TO_DISPUTES 통해 다중 매핑 */
  disputeId: string
  /** 자백 직전 hesitation·침묵 깨기 (1문장) */
  preConfession: string
  /** 핵심 자백 본문 (1~3문장. 구체 사실·금액·시점 노출) */
  confessionMain: string
  /** 자백 후 책임 인정·shame 멘트 (1문장) */
  postConfession: string
}

type CaseConfessionMap = Record<string, ConfessionEntry>

/**
 * key → disputeId[] 매핑. 다중 쟁점에 걸친 자백(예: spouse-01 A-h-d3-d4)도 처리.
 */
const KEY_TO_DISPUTES: Record<string, string[]> = {
  // 사건 무관 key → disputes 패턴 (동일 key가 여러 사건에 있어도 disputes는 같음)
  // 사건 분리는 getConfession() 내부에서 caseId 단위로 처리.
  'B-d1': ['d-1'],
  'B-d2': ['d-2'],
  'B-d3': ['d-3'],
  'B-d5': ['d-5'],
  'A-d1': ['d-1'],
  'A-d2': ['d-2'],
  'A-d4': ['d-4'],
  'A-h-d3-d4': ['h-d3', 'h-d4'],
  'B-d1-d2': ['d-1', 'd-2'],
}

/**
 * 보정된 자백 entry 데이터 (호칭 규칙 적용 완료).
 * 출처: gpt-pro-runs/confession-scripts/output/confession-scripts.json
 */
const CONFESSION_DATA: Record<string, CaseConfessionMap> = {
  'spouse-01': {
    'B-d1': {
      speaker: 'b',
      disputeId: 'd-1',
      preConfession: '…재판관님, 그 오피스텔에 간 건 맞습니다.',
      confessionMain: '그곳은 형 집입니다. 퇴근 후에 중2 조카가 혼자 있는 시간이 길어서, 제 아내에게 말하지 않고 매일 들러 2~3시간씩 머물렀습니다.',
      postConfession: '외도가 아니었지만, 숨긴 것은 제 잘못입니다.',
    },
    'B-d2': {
      speaker: 'b',
      disputeId: 'd-2',
      preConfession: '더 숨기지 않겠습니다, 재판관님.',
      confessionMain: '저장하지 않은 번호는 형 번호입니다. 형이 개인회생 중인 사실을 아내에게 숨기려고 일부러 이름을 저장하지 않았고, 형도 \'제수씨한테 말 마\', \'내 사정 알려지면 안 돼\'라고 보냈습니다.',
      postConfession: '형의 일까지 드러내기 싫어서 말을 미뤘습니다.',
    },
    'B-d3': {
      speaker: 'b',
      disputeId: 'd-3',
      preConfession: '…재판관님, 이건 액수까지 말씀드리겠습니다.',
      confessionMain: '2,000만원입니다. 제 아내 몰래 모아둔 돈에서 빼서 형에게 현금으로 직접 전했습니다. 형이 개인회생 중이라 통장으로는 받을 수 없다고 했습니다.',
      postConfession: '이 부분은 제가 책임지겠습니다.',
    },
    'A-d4': {
      speaker: 'a',
      disputeId: 'd-4',
      preConfession: '재판관님, 한 가지 인정하겠습니다.',
      confessionMain: '공동 적금을 해지한 뒤 받은 돈 일부를 투자방에 넣었습니다. 그 사람들 말이 너무 그럴듯해서 믿었고, 결국 3,000만원을 사기당했습니다.',
      postConfession: '속았다는 말로 제 책임이 없어지는 건 아닙니다.',
    },
    'A-h-d3-d4': {
      speaker: 'a',
      disputeId: 'h-d3',
      preConfession: '재판관님, 이건 제가 피할 수 없는 일입니다.',
      confessionMain: '제 남편 몰래 공동 적금을 해지했고, 위임장 서명은 제가 흉내 냈습니다. 그 돈을 투자방에 넣었다가 3,000만원을 잃었습니다. 두려워서 그랬고, 그날 한 번이면 끝날 줄 알았습니다.',
      postConfession: '그게 사문서위조라는 점도 부정하지 않고, 이 일은 제가 책임지겠습니다.',
    },
  },
  'family-01': {
    'B-d1-d2': {
      speaker: 'b',
      disputeId: 'd-1',
      preConfession: '…말씀드리겠습니다, 재판관님.',
      confessionMain: '처음 유서는 어머니 뜻대로 제가 90%, 형이 10%를 받는 90:10이었습니다. 어머니 의식이 흐려진 뒤 제가 형에게 60%, 제게 40%가 가도록 60:40으로 바꾸자고 권했고, 공증 자리에서 동의는 받았지만 그때 의사 능력이 온전했다고 말하기 어렵습니다.',
      postConfession: '어머니가 형을 두고 가는 것을 아파하셨다는 말로 제 개입이 사라지지는 않습니다.',
    },
    'B-d3': {
      speaker: 'b',
      disputeId: 'd-3',
      preConfession: '재판관님, 송금 내역도 숨기지 않겠습니다.',
      confessionMain: '20년간 어머니 통장으로 형의 생활비를 보냈습니다. 형 공장이 부도난 뒤 형이 버티기 어려웠고, 어머니 동의와 부탁으로 제가 그 정리를 맡았습니다.',
      postConfession: '어머니 마지막 부탁이 형을 도와달라는 것이었습니다.',
    },
    'A-d2': {
      speaker: 'a',
      disputeId: 'd-2',
      preConfession: '…재판관님, 잠시만 말씀드리겠습니다.',
      confessionMain: '…사실은 어머니 일기와 말 속에서 제가 친아들이 아닐 수도 있다는 걸 어렴풋이 알고 있었습니다. 60%를 받고도 더 받으려고 한 건 돈만의 문제가 아니라, 어머니가 저를 아들로 인정했다는 걸 붙잡고 싶어서였습니다.',
      postConfession: '목소리를 높인 건 화가 나서만이 아니라 무서워서였습니다.',
    },
  },
  'friend-01': {
    'B-d3': {
      speaker: 'b',
      disputeId: 'd-3',
      preConfession: '…재판관님, 아저씨가 저한테도 그러셨습니다.',
      confessionMain: '다은이 아버지가 저에게 여러 차례 돈을 부탁했습니다. 다 합치면 5,000만원 가까이 빌려드렸고, 돌아온 돈은 일부뿐이었습니다.',
      postConfession: '다은이한테는 차마 말 못했고, 제가 참았어야 했습니다.',
    },
    'B-d5': {
      speaker: 'b',
      disputeId: 'd-5',
      preConfession: '제가 먼저 연락한 건 아닙니다, 재판관님.',
      confessionMain: '먼저 연락한 건 다은이 예비신랑이었습니다. 9일 동안 17건의 연락도 예비신랑 쪽 발신이 많았고, 저는 \'이건 다은이를 통해 얘기하시는 게 좋을 것 같습니다\'라고 선을 그었습니다. 다은이를 위해 그분이 다른 마음을 갖지 않으시길 바라서 경고했습니다.',
      postConfession: '다은이를 지키려 했지만, 제 침묵이 오히려 일을 키웠습니다.',
    },
    'A-d1': {
      speaker: 'a',
      disputeId: 'd-1',
      preConfession: '…제가 너무 빨리 결론을 내렸습니다, 재판관님.',
      confessionMain: '저는 단톡방에 캡처를 올리고, 전후 맥락도 없이 수민이를 집착하는 여자처럼 몰았습니다. 9일 동안 17건 연락이 오간 것만 봤고, 누가 먼저 얼마나 보냈는지는 확인하지 않았습니다.',
      postConfession: '수민이한테 먼저 물어봤어야 했습니다.',
    },
    'A-d4': {
      speaker: 'a',
      disputeId: 'd-4',
      preConfession: '재판관님, 사실은 알고 있었습니다.',
      confessionMain: '아빠가 수민이에게 돈을 빌리고 갚지 않은 일을 알고 있었습니다. 너무 미안해서 수민이 앞에서는 모르는 척했고, 이번 일도 그 침묵의 연장이었습니다.',
      postConfession: '제가 숨긴 사실 때문에 수민이를 더 나쁜 사람으로 만들었습니다.',
    },
  },
}

/**
 * 사건 + 화자 + 쟁점 ID로 자백 entry 조회.
 * - h-d3·h-d4 같은 다중 쟁점은 같은 entry 반환
 * - 매칭 없으면 null
 */
export function getConfession(caseId: string, party: PartyId, disputeId: string): ConfessionEntry | null {
  const caseMap = CONFESSION_DATA[caseId]
  if (!caseMap) return null

  // 1차: speaker + disputeId가 정확히 일치하는 entry 검색
  for (const [key, entry] of Object.entries(caseMap)) {
    if (entry.speaker !== party) continue
    const disputes = KEY_TO_DISPUTES[key]
    if (!disputes) continue
    if (disputes.includes(disputeId)) return entry
  }
  return null
}

/**
 * 사건의 모든 자백 entry 반환 (디버깅·전체 조회용).
 */
export function getAllConfessions(caseId: string): ConfessionEntry[] {
  const caseMap = CONFESSION_DATA[caseId]
  if (!caseMap) return []
  return Object.values(caseMap)
}
