const DEFAULT_EMERGENCE_TITLE = '새 확인 쟁점'
const DEFAULT_EMERGENCE_DESCRIPTION =
  '새로운 단서가 기존 설명과 맞물립니다. 확인해야 할 범위만 추가되었습니다.'

const SAFE_EMERGENCE_TITLES: Record<string, Record<string, string>> = {
  'family-01': {
    'd-1': '유서 작성 과정',
    'd-2': '공증 절차의 확인 지점',
    'd-3': '오래된 자금 흐름',
    'd-4': '가족 기록과 침묵',
    'd-5': '어머니 기록의 해석',
  },
  'friend-01': {
    'd-2': '메시지 선후관계',
    'd-3': '예비신랑에게 이어진 부탁',
    'd-4': '과거 관계가 끊긴 이유',
    'd-5': '단톡방 발언의 책임',
  },
  'spouse-01': {
    'd-2': '목돈 출금의 경위',
    'h-d3': '공동 자금 해지 절차',
    'h-d4': '동선과 금전 흐름',
  },
}

const SAFE_EMERGENCE_DESCRIPTIONS: Record<string, Record<string, string>> = {
  'family-01': {
    'd-1': '유서 작성 시점과 당시 판단 과정을 함께 확인해야 합니다.',
    'd-2': '공증 절차와 문서 작성 시점을 함께 확인해야 합니다.',
    'd-3': '오래된 자금 흐름에서 출처와 전달 순서를 확인해야 합니다.',
    'd-4': '가족 기록과 침묵 사이에 확인할 사정이 있습니다.',
    'd-5': '어머니가 남긴 기록과 두 형제의 해석 차이를 함께 정리해야 합니다.',
  },
  'friend-01': {
    'd-2': '메시지의 시간 순서와 대응 방식을 확인해야 합니다.',
    'd-3': '예비신랑에게 이어진 부탁의 내용과 경로를 확인해야 합니다.',
    'd-4': '과거 관계가 끊긴 시점과 당시 남은 기록을 별도로 확인해야 합니다.',
    'd-5': '단톡방 글이 퍼진 과정과 확인 없이 단정한 책임을 정리해야 합니다.',
  },
  'spouse-01': {
    'd-2': '목돈 출금 흔적과 설명되지 않은 사용처를 확인해야 합니다.',
    'h-d3': '공동 자금 해지 절차와 동의 여부를 확인해야 합니다.',
    'h-d4': '동선과 금전 흐름 사이에 함께 검토할 정황이 생겼습니다.',
  },
}

function normalizeCaseId(caseId?: string): string {
  return String(caseId ?? '').replace(/^case-/, '')
}

function resolveCaseId(storeOrCaseId: unknown): string {
  if (typeof storeOrCaseId === 'string') return normalizeCaseId(storeOrCaseId)
  const maybeStore = storeOrCaseId as { caseData?: { caseId?: string } } | undefined
  return normalizeCaseId(maybeStore?.caseData?.caseId)
}

export function getSafeEmergenceTitle(
  storeOrCaseId: unknown,
  disputeId: string,
  fallback = DEFAULT_EMERGENCE_TITLE,
): string {
  void fallback
  const caseId = resolveCaseId(storeOrCaseId)
  return SAFE_EMERGENCE_TITLES[caseId]?.[disputeId] ?? DEFAULT_EMERGENCE_TITLE
}

export function getSafeEmergenceDescription(
  storeOrCaseId: unknown,
  disputeId: string,
  fallback = DEFAULT_EMERGENCE_DESCRIPTION,
): string {
  void fallback
  const caseId = resolveCaseId(storeOrCaseId)
  return SAFE_EMERGENCE_DESCRIPTIONS[caseId]?.[disputeId] ?? DEFAULT_EMERGENCE_DESCRIPTION
}
