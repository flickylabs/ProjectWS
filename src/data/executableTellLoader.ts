/**
 * ExecutableVerbalTell 데이터 로더
 * ─────────────────────────────────
 * GPT가 생성한 캐릭터별 실행 가능 tell 규칙을 로드한다.
 * 데이터가 없으면 빈 배열 반환 → blueprint에서 tell 선택 생략.
 */

import type { ExecutableVerbalTell } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 데이터 저장소: caseId → party → ExecutableVerbalTell[]
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const registry: Record<string, Record<'a' | 'b', ExecutableVerbalTell[]>> = {}

/**
 * ExecutableVerbalTell 데이터를 등록한다.
 */
export function registerExecutableTells(
  caseId: string,
  party: 'a' | 'b',
  tells: ExecutableVerbalTell[],
): void {
  if (!registry[caseId]) registry[caseId] = { a: [], b: [] }
  registry[caseId][party] = tells
}

/**
 * 특정 사건/당사자의 ExecutableVerbalTell 목록을 조회한다.
 */
export function getExecutableTells(
  caseId: string,
  party: 'a' | 'b',
): ExecutableVerbalTell[] {
  return registry[caseId]?.[party] ?? []
}
