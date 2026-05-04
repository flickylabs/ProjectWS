/**
 * 조합 재판관 코멘트 데이터
 * GPT Pro에서 생성한 코멘트를 여기에 삽입합니다.
 *
 * 사용: 조합 성공 시 재판관이 한마디 하는 코멘트
 */

export interface CombinationComment {
  recipeId: string
  comment: string
}

/** 사건별 조합 코멘트 */
const COMMENTS: Record<string, CombinationComment[]> = {
  'spouse-01': [
    { recipeId: 'combine-1', comment: '결제 시점과 출입 시간이 맞물립니다. 동선을 함께 보시지요.' },
    { recipeId: 'combine-2', comment: '문자 내용과 구매 품목이 맞물립니다. 가족 쪽 정황을 따로 확인해야겠습니다.' },
    { recipeId: 'combine-3', comment: '새벽 통화 뒤 개인 계좌 3천만 원이 현금으로 나갔습니다. 받는 쪽부터 따져볼 만합니다.' },
    { recipeId: 'combine-4', comment: '해지 서류 3천만 원과 투자방 송금 2천만 원이 정확히 맞물립니다. 투자방으로 흘러간 2천만 원의 행선지가 확정됐습니다.' },
    { recipeId: 'combine-5', comment: '“제 몫을 지키려 했다”는 말과 위조된 위임장이 한 방향을 가리킵니다. 3천만 원 해지가 자각된 행위였는지 따져야겠습니다.' },
    { recipeId: 'combine-6', comment: '가족 쪽 일이라는 말에 구체성이 붙습니다. 숨긴 이유도 봐야겠습니다.' },
  ],
  'friend-01': [
    { recipeId: 'combine-1', comment: '연락 기록과 단톡방 반응의 시간 순서가 의미심장합니다.' },
    { recipeId: 'combine-2', comment: '먼저 선을 넘은 정황이 있다면, 곧장 알리지 못한 이유도 함께 봐야겠습니다.' },
    { recipeId: 'combine-3', comment: '돈 접근이 되풀이됐다면, 혼자 막으려 한 이유를 짚어야겠습니다.' },
    { recipeId: 'combine-4', comment: '예비신랑 메시지와 대조표가 같은 방향을 가리키는군요.' },
    { recipeId: 'combine-5', comment: '직접 확인 없이 단톡방 결론이 먼저였군요. 이 순서는 반드시 짚고 넘어가야겠습니다.' },
    { recipeId: 'combine-6', comment: '과거 텔레그램과 대조표가 닿는군요. 이번 연락의 맥락을 다시 봐야겠습니다.' },
    { recipeId: 'combine-7', comment: '과거 텔레그램과 송금 기록이 맞물립니다. 손절의 원인을 돈 문제와 분리해 볼 수 없습니다.' },
    { recipeId: 'combine-8', comment: '자책 발언과 예비신랑 메시지가 같은 지점을 가리킵니다. 누가 먼저 선을 넘었는지 확인하겠습니다.' },
    { recipeId: 'combine-9', comment: '최수민 씨의 침묵과 송다은 씨 아버지의 문자가 연결됩니다. 말하지 못한 경로를 따져야겠습니다.' },
    { recipeId: 'combine-10', comment: '단정과 자책이 같은 사건을 반대편에서 가리킵니다. 두 사람의 시야를 나눠 보겠습니다.' },
  ],
  'family-01': [
    { recipeId: 'combine-1', comment: '유서 비율과 방문 시점이 겹칩니다. 작성 과정에서 누가 곁에 있었는지 확인해야 합니다.' },
    { recipeId: 'combine-2', comment: '공증인 메모와 자필 연습본이 맞물립니다. 공증본과 별도 문서의 관계를 확인해야겠습니다.' },
    { recipeId: 'combine-3', comment: '자필 연습본과 오래된 계좌 흐름이 이어집니다. 어머니 통장을 거친 돈의 출처부터 다시 봐야 합니다.' },
    { recipeId: 'combine-4', comment: '오래된 계좌 흐름과 일기장이 맞물립니다. 침묵의 이유가 단순한 돈 문제를 넘어섭니다.' },
    { recipeId: 'combine-5', comment: '말을 아끼는 태도와 공증 기록이 맞물립니다. 비율 변경의 이유를 분리해 보겠습니다.' },
    { recipeId: 'combine-6', comment: '어머니 뜻이라는 말 뒤에 오래된 송금 흐름이 있습니다. 생활비 출처를 짚어야겠습니다.' },
    { recipeId: 'combine-7', comment: '자필 연습본과 어머니 일기장이 같은 방향을 가리킵니다. 감춘 이유를 따져야겠습니다.' },
    { recipeId: 'combine-8', comment: '유서 비율과 어머니 기록이 부딪힙니다. 어머니 뜻의 해석을 다시 정리해야 합니다.' },
    { recipeId: 'combine-9', comment: '장남 몫을 당연시한 말과 어머니 기록이 충돌합니다. 최종 책임 구조로 이어집니다.' },
    { recipeId: 'combine-10', comment: '상속 감정과 오래된 지원 흐름이 맞물립니다. 누가 무엇을 떠안았는지 확인하겠습니다.' },
    { recipeId: 'combine-11', comment: '방문 기록과 요양보호사 증언이 겹칩니다. 도움과 개입의 경계를 다시 보겠습니다.' },
    { recipeId: 'combine-12', comment: '상속 감정과 침묵이 같은 빈칸을 가리킵니다. 비율 뒤의 사정을 확인해야 합니다.' },
  ],
}

/** 특정 사건+레시피의 재판관 코멘트를 조회 */
export function getCombinationComment(caseKey: string, recipeId: string): string | null {
  const normalized = caseKey.replace(/^case-/, '')
  const list = COMMENTS[normalized]
  if (!list) return null
  return list.find((c) => c.recipeId === recipeId)?.comment ?? null
}

