/**
 * Free Question 키워드 확장 전략 — Request 5
 * ─────────────────────────────────
 * 결론: 방안 A 채택 (dispute 레벨 `disputeAliases`)
 *
 * 이유:
 * 1) 작성 단가가 가장 낮다.
 *    - 사건당 dispute 5~7개 × alias 4~8개 = 약 20~40 keyword
 *    - hook 6~8개 전체가 이 alias pool을 재사용한다.
 * 2) 현재 deterministic classifier 구조와 가장 잘 맞는다.
 *    - existing score = INTENT_LEXICON + dispute alias + question shape + active dispute bonus
 * 3) 사건별 고유 키워드를 hook마다 반복 입력하지 않아도 된다.
 *
 * 비채택:
 * - 방안 B (`triggerKeywords` per hook): hook 8개 × 3~5개 = 24~40 keyword를
 *   intent 단위로 다시 중복 작성해야 한다.
 * - 방안 C (A+B 혼합): 정밀도는 올라가지만, 기본 배치 템플릿 단계에서 작성 단가가 커진다.
 *
 * 정책:
 * - V2 추가 배치 기본선은 A만 사용한다.
 * - hook-level keyword는 향후 "예외 override"로만 검토한다. 배치 기본 필드에는 넣지 않는다.
 */

import type { Dispute } from './case'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. 결정 요약
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FREE_QUESTION_KEYWORD_STRATEGY_V2 = {
  decision: 'A',
  name: 'dispute_aliases_primary',
  authoringCost: 'low',
  perCaseKeywordLoadEstimate: '20~40 keywords',
  keepsIntentLexiconGlobal: true,
  forbidsPerHookTriggerKeywordsInBatch: true,
} as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. 스키마 patch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 기존 DisputeV2 확장:
 *
 * export interface DisputeV2 extends Dispute {
 *   disputeKind?: DisputeKind
 *   depthLayers?: DisputeDepthLayer[]
 *   linkEdges?: DisputeLinkEdge[]
 *   misconception?: MisconceptionProfile
 * }
 *
 * ↓ 아래 필드 1개만 추가
 */

export interface DisputeV2KeywordPatch extends Dispute {
  /**
   * freeQuestion deterministic classifier용 사건별 고유 키워드.
   * 필수 권장: 4~8개
   *
   * 구성 규칙:
   * - formal noun 1개: 정식 쟁점명/기관명/증거명
   * - colloquial phrase 1~2개: 플레이어가 실제로 칠 법한 표현
   * - concrete token 1~3개: 이름 / 금액 / 장소 / 시간 / 증거 약칭
   * - red_herring면 오해를 부르는 trap 단서 1~2개 포함
   */
  disputeAliases?: string[]
}

export interface DisputeV2Patched extends Dispute {
  disputeKind?: string
  disputeAliases?: string[] // NEW
  depthLayers?: unknown[]
  linkEdges?: unknown[]
  misconception?: unknown
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. JSON 예시
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DISPUTE_ALIAS_PATCH_EXAMPLE_A = {
  id: 'd-1',
  name: '비밀 송금',
  disputeKind: 'core_truth',
  disputeAliases: ['280만원', '비밀 송금', '예약금', '간병비', '최민정', '돌봄센터'],
}

export const DISPUTE_ALIAS_PATCH_EXAMPLE_B = {
  id: 'd-3',
  name: '외도 오해',
  disputeKind: 'red_herring',
  disputeAliases: ['외도', '최민정', '골목', '상담동', '잘린 캡처', '한 줄 메시지'],
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. freeQuestion classifier 입력 patch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ClassifyFreeQuestionInputPatched {
  question: string
  activeDisputeId: string
  currentLieState?: string
  currentMisconceptionState?: string
  hooks: Array<{
    id: string
    intentTag: string
    answerEnvelope: {
      disputeId?: string | null
      preferredAngleTags?: string[]
    }
    allowedAtStates: string[]
  }>
  /**
   * structure-v2 disputes에서 파생한 alias map.
   * loader에서 1회 구성 후 classifier에 주입.
   */
  disputeAliasMap: Record<string, string[]>
}

export function buildDisputeAliasMap(
  disputes: Array<{ id: string; name?: string; disputeAliases?: string[] }>,
): Record<string, string[]> {
  const map: Record<string, string[]> = {}

  for (const dispute of disputes) {
    const base = [
      ...(dispute.name ? [dispute.name] : []),
      ...(dispute.disputeAliases ?? []),
    ].filter(Boolean)

    map[dispute.id] = [...new Set(base)]
  }

  return map
}

/**
 * 기존:
 *   const aliases = DISPUTE_ALIAS[disputeId] ?? []
 *
 * 변경:
 *   const aliases = input.disputeAliasMap[disputeId] ?? []
 *
 * 핵심:
 * - 하드코딩된 spouse/family 전용 alias 사전을 제거
 * - 사건별 structure-v2에서 alias를 로드
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. 템플릿 작성 규칙 (배치용)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const TEMPLATE_RULES_FOR_FREE_QUESTION = [
  '각 dispute에 disputeAliases 4~8개를 반드시 작성한다.',
  '사건별 고유 키워드(이름/금액/장소/증거 약칭/구어 표현)는 disputeAliases에만 넣는다.',
  'hook는 intentTag + answerEnvelope만 작성하고, per-hook triggerKeywords는 기본 템플릿에서 쓰지 않는다.',
] as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. INTENT_LEXICON 정책
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 결론: INTENT_LEXICON은 범용으로 유지한다.
 *
 * 이유:
 * - intent는 "무엇을 묻는가"의 구조 분류다.
 * - 사건별로 바뀌는 것은 대체로 intent가 아니라 entity/금액/장소/증거명이다.
 * - 그 변화량은 disputeAliases가 담당하는 편이 더 맞다.
 *
 * 언제만 확장?
 * - 3개 이상 사건에서 같은 질문군이 반복적으로 tie-break로 밀리고
 * - 기존 intentTag 1개에도 자연스럽게 묶이지 않을 때만
 * - 새 intentTag + 새 글로벌 lexicon row를 추가한다.
 *
 * 즉, 기본 원칙은:
 *   사건별 확장 = disputeAliases
 *   구조적 intent 추가 = 글로벌 INTENT_LEXICON
 */

export const INTENT_LEXICON_POLICY = {
  keepGlobalByDefault: true,
  perCaseIntentExpansion: false,
  addNewIntentOnlyIf: [
    '동일 질문군 누적 miss가 3개 이상 사건에서 반복됨',
    '기존 intentTag로 의미 손실 없이 수용할 수 없음',
  ],
} as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. 운영 메모
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * alias 작성 팁:
 * - 너무 일반적인 단어만 넣지 말 것: "문제", "그 일", "저거" 금지
 * - 반대로 지나치게 긴 문장도 금지
 * - 1~3 음절 구어 표현 + 정식 명칭 + 구체 토큰을 섞을 것
 *
 * 추천 조합:
 *   [정식명, 구어표현, 인명, 금액, 장소, 증거약칭]
 */
