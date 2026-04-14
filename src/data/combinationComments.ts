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
    // GPT Pro 생성 후 삽입 예정
  ],
  'friend-01': [
    // GPT Pro 생성 후 삽입 예정
  ],
  'family-01': [
    // GPT Pro 생성 후 삽입 예정
  ],
}

/** 특정 사건+레시피의 재판관 코멘트를 조회 */
export function getCombinationComment(caseKey: string, recipeId: string): string | null {
  const normalized = caseKey.replace(/^case-/, '')
  const list = COMMENTS[normalized]
  if (!list) return null
  return list.find((c) => c.recipeId === recipeId)?.comment ?? null
}
