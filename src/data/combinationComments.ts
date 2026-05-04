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
    { recipeId: 'combine-4', comment: '해지 서류 3천만 원과 투자방 송금 3천만 원이 정확히 맞물립니다. 빠진 돈의 행선지가 확정됐습니다.' },
    { recipeId: 'combine-5', comment: '“제 몫을 지키려 했다”는 말과 위조된 위임장이 한 방향을 가리킵니다. 3천만 원 해지가 자각된 행위였는지 따져야겠습니다.' },
    { recipeId: 'combine-6', comment: '가족 쪽 일이라는 말에 구체성이 붙습니다. 숨긴 이유도 봐야겠습니다.' },
  ],
  'friend-01': [
    { recipeId: 'combine-1', comment: '연락 기록과 단톡방 반응의 시간 순서가 의미심장합니다.' },
    { recipeId: 'combine-2', comment: '먼저 선을 넘은 정황이 있다면, 곧장 알리지 못한 이유도 함께 봐야겠습니다.' },
    { recipeId: 'combine-3', comment: '돈 접근이 되풀이됐다면, 혼자 막으려 한 이유를 짚어야겠습니다.' },
    { recipeId: 'combine-4', comment: '예비신랑 메시지와 대조표가 같은 방향을 가리키는군요.' },
    { recipeId: 'combine-5', comment: '직접 확인 없이 단톡방 결론이 먼저였군요. 이 순서는 반드시 짚고 넘어가야겠습니다.' },
    { recipeId: 'combine-6', comment: '과거 카톡과 대조표가 닿는군요. 이번 연락의 맥락을 다시 봐야겠습니다.' },
  ],
  'family-01': [
    { recipeId: 'combine-1', comment: '유서 비율이 정해진 무렵, 방문 기록이 눈에 띕니다. 함께 봐야 합니다.' },
    { recipeId: 'combine-2', comment: '자기 몫을 줄이는 쪽으로 바꿨다면, 그 이유는 분명히 물어야겠습니다.' },
    { recipeId: 'combine-3', comment: '원본 유서의 비율과 20년 송금이 이어집니다. 숫자만의 문제는 아닙니다.' },
    { recipeId: 'combine-4', comment: '송금 기록과 일기장을 보면, 60대 40이 왜 필요했는지 따져야겠습니다.' },
    { recipeId: 'combine-5', comment: '말을 아끼는 태도와 공증본이 맞물립니다. 바뀐 방향을 다시 봐야 합니다.' },
    { recipeId: 'combine-6', comment: '어머니 뜻만으로는 부족합니다. 20년 생활비 출처를 짚어야겠습니다.' },
  ],
}

/** 특정 사건+레시피의 재판관 코멘트를 조회 */
export function getCombinationComment(caseKey: string, recipeId: string): string | null {
  const normalized = caseKey.replace(/^case-/, '')
  const list = COMMENTS[normalized]
  if (!list) return null
  return list.find((c) => c.recipeId === recipeId)?.comment ?? null
}
