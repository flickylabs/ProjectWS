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

/**
 * LLM 출력 텍스트에서 잘못된 조사를 교정한다.
 * enforceHonorifics() 뒤에 적용하여 "제 아내이 " → "제 아내가 " 등을 수정.
 */
export function fixPostpositions(text: string): string {
  let result = text

  // 받침 없는 한글 + 잘못된 조사 패턴을 교정
  // 받침 없는 글자: (code - 0xAC00) % 28 === 0
  result = result.replace(/([\uAC00-\uD7A3])이(\s)/g, (match, char, space) => {
    const code = (char as string).charCodeAt(0)
    if ((code - 0xAC00) % 28 === 0) return `${char}가${space}`
    return match
  })

  result = result.replace(/([\uAC00-\uD7A3])을(\s)/g, (match, char, space) => {
    const code = (char as string).charCodeAt(0)
    if ((code - 0xAC00) % 28 === 0) return `${char}를${space}`
    return match
  })

  result = result.replace(/([\uAC00-\uD7A3])은(\s)/g, (match, char, space) => {
    const code = (char as string).charCodeAt(0)
    if ((code - 0xAC00) % 28 === 0) return `${char}는${space}`
    return match
  })

  result = result.replace(/([\uAC00-\uD7A3])과(\s)/g, (match, char, space) => {
    const code = (char as string).charCodeAt(0)
    if ((code - 0xAC00) % 28 === 0) return `${char}와${space}`
    return match
  })

  // 반대 방향도 교정: 받침 있는 글자 + 잘못된 조사
  result = result.replace(/([\uAC00-\uD7A3])가(\s)/g, (match, char, space) => {
    const code = (char as string).charCodeAt(0)
    if ((code - 0xAC00) % 28 !== 0) return `${char}이${space}`
    return match
  })

  result = result.replace(/([\uAC00-\uD7A3])를(\s)/g, (match, char, space) => {
    const code = (char as string).charCodeAt(0)
    if ((code - 0xAC00) % 28 !== 0) return `${char}을${space}`
    return match
  })

  result = result.replace(/([\uAC00-\uD7A3])는(\s)/g, (match, char, space) => {
    const code = (char as string).charCodeAt(0)
    if ((code - 0xAC00) % 28 !== 0) return `${char}은${space}`
    return match
  })

  result = result.replace(/([\uAC00-\uD7A3])와(\s)/g, (match, char, space) => {
    const code = (char as string).charCodeAt(0)
    if ((code - 0xAC00) % 28 !== 0) return `${char}과${space}`
    return match
  })

  return result
}
