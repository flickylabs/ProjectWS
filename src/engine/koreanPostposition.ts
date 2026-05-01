/**
 * 한국어 조사 헬퍼
 * ─────────────────────────────────
 * 받침(종성) 유무에 따라 올바른 조사를 선택한다.
 * 예: postposition("제 아내", "이", "가") → "가"
 *     postposition("제 남편", "이", "가") → "이"
 */

/**
 * 단어의 마지막 글자 받침 유무에 따라 적절한 조사를 반환한다.
 * @param word - 조사를 붙일 단어
 * @param withFinal - 받침 있을 때 조사 (예: "이", "을", "은", "과")
 * @param withoutFinal - 받침 없을 때 조사 (예: "가", "를", "는", "와")
 */
export function postposition(word: string, withFinal: string, withoutFinal: string): string {
  const lastChar = word.charAt(word.length - 1)
  const code = lastChar.charCodeAt(0)
  // 한글 유니코드 범위: 0xAC00 ~ 0xD7A3
  if (code >= 0xAC00 && code <= 0xD7A3) {
    return ((code - 0xAC00) % 28 !== 0) ? withFinal : withoutFinal
  }
  // 한글이 아닌 경우 (숫자, 영문 등) 기본값
  return withoutFinal
}

/** "이/가" 조사 */
export function pp이가(word: string): string { return postposition(word, '이', '가') }

/** "을/를" 조사 */
export function pp을를(word: string): string { return postposition(word, '을', '를') }

/** "은/는" 조사 */
export function pp은는(word: string): string { return postposition(word, '은', '는') }

/** "과/와" 조사 */
export function pp과와(word: string): string { return postposition(word, '과', '와') }

function resolveParticlePlaceholder(word: string, withFinal: string, withoutFinal: string): string {
  return `${word}${postposition(word, withFinal, withoutFinal)}`
}

/**
 * LLM 출력 텍스트에서 안전한 범위의 조사/어법만 교정한다.
 *
 * 예전 구현은 모든 "한글+가/는/를/와"를 조사로 보고 역방향 치환했다.
 * 그 결과 "누군가" 내부의 "군가"까지 "군이"로 바뀌는 식의 런타임 손상이
 * 발생했다. 이 함수는 명시적 플레이스홀더와 확실한 비문만 고친다.
 */
export function fixPostpositions(text: string): string {
  let result = text

  result = result.replace(/([가-힣A-Za-z0-9]+)이\(가\)/g, (_match, word: string) =>
    resolveParticlePlaceholder(word, '이', '가'))
  result = result.replace(/([가-힣A-Za-z0-9]+)\(이\)가/g, (_match, word: string) =>
    resolveParticlePlaceholder(word, '이', '가'))
  result = result.replace(/([가-힣A-Za-z0-9]+)은\(는\)/g, (_match, word: string) =>
    resolveParticlePlaceholder(word, '은', '는'))
  result = result.replace(/([가-힣A-Za-z0-9]+)\(은\)는/g, (_match, word: string) =>
    resolveParticlePlaceholder(word, '은', '는'))
  result = result.replace(/([가-힣A-Za-z0-9]+)을\(를\)/g, (_match, word: string) =>
    resolveParticlePlaceholder(word, '을', '를'))
  result = result.replace(/([가-힣A-Za-z0-9]+)\(을\)를/g, (_match, word: string) =>
    resolveParticlePlaceholder(word, '을', '를'))
  result = result.replace(/([가-힣A-Za-z0-9]+)과\(와\)/g, (_match, word: string) =>
    resolveParticlePlaceholder(word, '과', '와'))
  result = result.replace(/([가-힣A-Za-z0-9]+)\(과\)와/g, (_match, word: string) =>
    resolveParticlePlaceholder(word, '과', '와'))

  // ── "만을" → "만" 교정 (번역체 이중 조사) ──
  // "이름만을 보고" → "이름만 보고", "이름만을." → "이름만."
  result = result.replace(/만을(?=[\s.?!…,]|$)/g, '만')

  // ── "없은" → "없는" 교정 (관형형 활용 오류) ──
  // "없은 일" → "없는 일", "있은 날" → "있는 날" (관형 문맥)
  result = result.replace(/없은/g, '없는')
  result = result.replace(/있은(?=\s*[가-힣])/g, '있는')

  // 이미 손상되어 들어온 대표적인 후처리 결과를 되돌린다.
  result = result.replace(/누군이(?=[\s.?!…,]|$)/g, '누군가')
  result = result.replace(/누군은(?=[\s.?!…,]|$)/g, '누군가는')
  result = result.replace(/누군을(?=[\s.?!…,]|$)/g, '누군가를')
  result = result.replace(/누군과(?=[\s.?!…,]|$)/g, '누군가와')
  result = result.replace(/합니까요/g, '합니까')
  result = result.replace(/아가 혼자/g, '조카 혼자')

  return result
}
