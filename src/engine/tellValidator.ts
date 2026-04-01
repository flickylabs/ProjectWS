/**
 * VerbalTell 검증 엔진
 * ─────────────────────────────────
 * LLM 응답에서 tell이 실제로 발현됐는지 검증한다.
 * 미발현 시 재생성 판단 또는 수동 주입 여부를 반환.
 *
 * ExecutableVerbalTell의 lexicalHooks, sentenceShape, cadence를 기반으로
 * post-process 검증을 수행.
 */

import type { ExecutableVerbalTell, SentenceShape } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 검증 결과 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface TellValidationResult {
  /** 검증 통과 여부 */
  passed: boolean
  /** lexicalHooks 중 매칭된 것 */
  matchedHooks: string[]
  /** sentenceShape 매칭 여부 */
  shapeMatched: boolean
  /** 실패 시 조치 권고 */
  recommendation: 'accept' | 'retry' | 'inject_hint'
  /** 실패 이유 */
  failReason?: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * LLM 응답 텍스트에서 tell 발현 여부를 검증한다.
 *
 * @param text - LLM이 생성한 NPC 응답 텍스트
 * @param tell - 이번 턴에 발현해야 하는 tell (mustUseTell로 지정된 것)
 * @returns 검증 결과 + 조치 권고
 */
export function validateTell(
  text: string,
  tell: ExecutableVerbalTell,
): TellValidationResult {
  // 1. lexicalHooks 매칭 검사 (최소 1개)
  const matchedHooks = tell.lexicalHooks.filter(hook => text.includes(hook))
  const hooksPassed = matchedHooks.length > 0

  // 2. sentenceShape 매칭 검사
  const shapeMatched = tell.sentenceShape
    ? checkSentenceShape(text, tell.sentenceShape)
    : true // shape가 없으면 자동 통과

  // 3. 종합 판정
  const passed = hooksPassed // lexicalHooks가 핵심. shape는 보조 신호.

  if (passed) {
    return { passed: true, matchedHooks, shapeMatched, recommendation: 'accept' }
  }

  // 실패: 조치 권고 결정
  // shape만 맞고 hooks가 없는 경우 → 가볍게 통과 (inject_hint)
  if (shapeMatched && !hooksPassed) {
    return {
      passed: false,
      matchedHooks,
      shapeMatched,
      recommendation: 'inject_hint',
      failReason: `tell "${tell.id}": lexicalHooks 미매칭 (shape는 통과)`,
    }
  }

  // 둘 다 실패 → retry 권고
  return {
    passed: false,
    matchedHooks,
    shapeMatched,
    recommendation: 'retry',
    failReason: `tell "${tell.id}": lexicalHooks ${matchedHooks.length}/${tell.lexicalHooks.length}, shape ${shapeMatched ? 'OK' : 'FAIL'}`,
  }
}

/**
 * tell 발현이 실패했을 때 behaviorHint에 삽입할 힌트 텍스트를 생성.
 * 'inject_hint' 권고 시 사용.
 */
export function generateTellHint(tell: ExecutableVerbalTell): string {
  switch (tell.sentenceShape) {
    case 'number_first':
      return '정확한 숫자를 먼저 언급하며 감정을 숨긴다.'
    case 'question_end':
      return '답 대신 되묻는다.'
    case 'enumeration':
      return '행동을 나열하며 시간을 번다.'
    case 'echo_repeat':
      return '상대의 말을 되풀이하며 압박한다.'
    case 'conditional':
      return '"만약 ~라면" 식으로 조건을 건다.'
    case 'self_reference':
      return '자기 경험을 꺼내며 정당화한다.'
    default:
      return `"${tell.lexicalHooks[0] ?? ''}" 류의 표현을 사용한다.`
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 턴별 cadence 추적
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** tellId → 마지막 발현 턴 */
const lastUsedTurn: Map<string, number> = new Map()

/**
 * cadence 규칙에 따라 이번 턴에 tell을 발현해야 하는지 판단.
 */
export function shouldActivateTell(
  tell: ExecutableVerbalTell,
  currentTurn: number,
): boolean {
  const lastTurn = lastUsedTurn.get(tell.id) ?? -999

  switch (tell.cadence) {
    case 'every_turn':
      return true
    case 'once_every_2_turns':
      return currentTurn - lastTurn >= 2
    case 'max_once_per_turn':
      return currentTurn !== lastTurn
    case 'on_trigger_only':
      return true // mustUseTell로 지정된 경우에만 호출됨
  }
}

/**
 * tell 발현을 기록한다 (cadence 추적용).
 */
export function recordTellUsed(tellId: string, turn: number): void {
  lastUsedTurn.set(tellId, turn)
}

/**
 * cadence 추적 초기화 (케이스 시작 시).
 */
export function resetTellTracker(): void {
  lastUsedTurn.clear()
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — sentenceShape 검사
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkSentenceShape(text: string, shape: SentenceShape): boolean {
  switch (shape) {
    case 'number_first':
      // 문장이 숫자/금액/시각으로 시작하는지
      return /^[0-9０-９]|^[일이삼사오육칠팔구십백천만억]/.test(text.trim())

    case 'question_end':
      // 마지막 문장이 의문형으로 끝나는지
      return /[?？]$|까\s*[.。]?\s*$|나요\s*[.。]?\s*$|잖아\s*[.。]?\s*$|거야\s*[?？]?\s*$|인가요|입니까/.test(text.trim())

    case 'enumeration':
      // 쉼표/나열 구조가 있는지 (3개 이상 항목)
      return (text.match(/,|、|·/g) ?? []).length >= 2 || /고,?\s*.+고,?\s*.+/.test(text)

    case 'echo_repeat':
      // 같은 단어/구가 2회 이상 반복되는지
      const words = text.split(/[\s,·.?!]+/).filter(w => w.length >= 2)
      const wordSet = new Set<string>()
      for (const w of words) {
        if (wordSet.has(w)) return true
        wordSet.add(w)
      }
      return false

    case 'conditional':
      return /만약|~라면|~다면|경우에|그랬으면|했더라면/.test(text)

    case 'self_reference':
      return /제가|저는|저의|내가|나는/.test(text)

    default:
      return true
  }
}
