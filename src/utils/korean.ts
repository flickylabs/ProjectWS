/**
 * 한국어 조사 처리 유틸리티.
 * 마지막 글자의 받침(종성) 유무에 따라 올바른 조사를 선택한다.
 */

/** 마지막 글자에 받침이 있는지 판별 */
function hasFinalConsonant(text: string): boolean {
  if (!text) return false
  const last = text.charCodeAt(text.length - 1)
  // 한글 음절 범위: 0xAC00 ~ 0xD7A3
  if (last < 0xAC00 || last > 0xD7A3) {
    // 숫자 끝: 0,1,3,6,7,8 → 받침 있음 / 2,4,5,9 → 없음
    const digit = text[text.length - 1]
    if (/[0-9]/.test(digit)) {
      return '0136780'.includes(digit) // 영(0),일(1),삼(3),육(6),칠(7),팔(8),공(0)
    }
    // 영문 끝: 받침 판별 어려우므로 받침 없음으로 처리
    return false
  }
  return (last - 0xAC00) % 28 !== 0
}

/** 이/가 */
export function iga(name: string): string {
  return name + (hasFinalConsonant(name) ? '이' : '가')
}

/** 은/는 */
export function eunneun(name: string): string {
  return name + (hasFinalConsonant(name) ? '은' : '는')
}

/** 을/를 */
export function eulreul(name: string): string {
  return name + (hasFinalConsonant(name) ? '을' : '를')
}

/** 과/와 */
export function gwawa(name: string): string {
  return name + (hasFinalConsonant(name) ? '과' : '와')
}

/** 으로/로 */
export function euro(name: string): string {
  return name + (hasFinalConsonant(name) ? '으로' : '로')
}

/** nameMap 타입: 사건 JSON의 이름 매핑 테이블 */
export type NameMap = Record<string, string>

/**
 * 대사 템플릿의 이름 플레이스홀더를 치환한다.
 *
 * 문법:
 *   {A}      → nameMap["A"] (이름만)
 *   {B}      → nameMap["B"]
 *   {T1}     → nameMap["T1"] (제3자)
 *   {A:이}   → nameMap["A"] + 이/가
 *   {T3:을}  → nameMap["T3"] + 을/를
 *   지원 조사: 이(이/가), 은(은/는), 을(을/를), 과(과/와), 로(으로/로)
 */
export function resolveNameTemplate(template: string, nameMap: NameMap): string
/** @deprecated 하위 호환용 — nameA, nameB만 받는 오버로드 */
export function resolveNameTemplate(template: string, nameA: string, nameB: string): string
export function resolveNameTemplate(
  template: string,
  nameMapOrA: NameMap | string,
  nameB?: string,
): string {
  const particleFns: Record<string, (n: string) => string> = {
    '이': iga,
    '은': eunneun,
    '을': eulreul,
    '과': gwawa,
    '로': euro,
  }

  // 하위 호환: 문자열 두 개가 들어오면 nameMap으로 변환
  const map: NameMap =
    typeof nameMapOrA === 'string'
      ? { A: nameMapOrA, B: nameB ?? '' }
      : nameMapOrA

  return template.replace(
    /\{([A-Z][A-Z0-9]*)(?::([이은을과로]))?\}/g,
    (_match, key, particle) => {
      const name = map[key]
      if (!name) return _match // 매핑 없으면 원본 유지
      if (particle && particleFns[particle]) {
        return particleFns[particle](name)
      }
      return name
    },
  )
}

/**
 * 출력 표면에서 발생한 한국어 호칭 깨짐을 보정한다.
 *
 * 일부 후처리/LLM 응답 경로에서 "어머님" 계열 표현이
 * 일반 상대 지칭어와 잘못 결합되어 "어머상대방이"처럼 표시되는
 * 사례가 있었다. 저장된 세이브/대화 로그에도 적용될 수 있도록
 * 렌더 직전 텍스트에 한 번 더 통과시킨다.
 */
export function sanitizeKoreanSurfaceText(value: string): string {
  if (!value) return value

  return value
    .replace(/어머상대방께서/g, '어머님께서')
    .replace(/어머상대방께/g, '어머님께')
    .replace(/어머상대방이/g, '어머님께서')
    .replace(/어머상대방은/g, '어머님께서는')
    .replace(/어머상대방을/g, '어머님을')
    .replace(/어머상대방의/g, '어머님의')
    .replace(/어머상대방/g, '어머님')
}
