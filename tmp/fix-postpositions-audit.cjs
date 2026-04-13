/**
 * 한국어 조사 오류 검출 + 자동 수정 스크립트
 * 받침 유무에 따른 조사(을/를, 은/는, 이/가, 과/와) 오류를 찾아 수정합니다.
 */
const fs = require('fs')
const path = require('path')
const glob = require('child_process').execSync

// 한글 받침 판별
function hasFinalConsonant(char) {
  const code = char.charCodeAt(0)
  if (code < 0xAC00 || code > 0xD7A3) return null // 한글 아님
  return (code - 0xAC00) % 28 !== 0
}

// 조사 쌍 정의: [잘못된 패턴 regex, 교정 함수]
const RULES = [
  // 받침 없는 글자 + 을 → 를
  { pattern: /([\uAC00-\uD7A3])을(\s|[.?!,…~\-]|$)/g, check: (char) => !hasFinalConsonant(char), fix: '를' },
  // 받침 없는 글자 + 은 → 는
  { pattern: /([\uAC00-\uD7A3])은(\s|[.?!,…~\-]|$)/g, check: (char) => !hasFinalConsonant(char), fix: '는' },
  // 받침 없는 글자 + 이 → 가 (문맥상 조사일 때만)
  { pattern: /([\uAC00-\uD7A3])이(\s)/g, check: (char) => !hasFinalConsonant(char), fix: '가' },
  // 받침 없는 글자 + 과 → 와
  { pattern: /([\uAC00-\uD7A3])과(\s|[.?!,…~\-]|$)/g, check: (char) => !hasFinalConsonant(char), fix: '와' },
  // 받침 있는 글자 + 를 → 을
  { pattern: /([\uAC00-\uD7A3])를(\s|[.?!,…~\-]|$)/g, check: (char) => hasFinalConsonant(char), fix: '을' },
  // 받침 있는 글자 + 는 → 은
  { pattern: /([\uAC00-\uD7A3])는(\s|[.?!,…~\-]|$)/g, check: (char) => hasFinalConsonant(char), fix: '은' },
  // 받침 있는 글자 + 가 → 이
  { pattern: /([\uAC00-\uD7A3])가(\s)/g, check: (char) => hasFinalConsonant(char), fix: '이' },
  // 받침 있는 글자 + 와 → 과
  { pattern: /([\uAC00-\uD7A3])와(\s|[.?!,…~\-]|$)/g, check: (char) => hasFinalConsonant(char), fix: '과' },
]

// 예외 단어 (조사가 아닌 경우)
const EXCEPTIONS = new Set([
  '없는', '있는', '않는', '같은', '없을', '있을', '않을', '같을',
  '하는', '되는', '오는', '가는', '나는', '모든', '이런', '그런', '저런',
  '만든', '얻은', '받은', '본', '한', '된', '온', '간',
  '했을', '됐을', '왔을', '갔을', '봤을',
  '라는', '다는', '는데', '은데', '를까', '을까',
  '에는', '으로는', '에서는', '까지는', '부터는', '만은',
  '에을', '으로을',
  // 동사 활용형
  '없이', '위해', '때문', '하나',
  // "X가" 가 이름인 경우
  '누가', '제가', '내가', '네가', '저가',
])

// 2글자 이상 context로 예외 판별
function isException(prevChar, particle, nextChar, fullMatch) {
  // "~는데", "~는지", "~는걸" 등 연결어미
  if (particle === '는' && nextChar && '데지걸것거게겠'.includes(nextChar)) return true
  if (particle === '은' && nextChar && '데지걸것거게겠'.includes(nextChar)) return true
  // "~을까", "~를까" — 추측
  if ((particle === '을' || particle === '를') && nextChar === '까') return true
  // "~을수", "~를수" — 가능
  if ((particle === '을' || particle === '를') && nextChar === '수') return true
  // 동사 관형형: ~ㄴ/은/는 + 명사 (이건 조사가 아님)
  // 하지만 단순 패턴으로는 구분이 어려우므로, 일반적인 예외만 처리
  return false
}

function fixText(text) {
  let result = text
  let fixes = []

  for (const rule of RULES) {
    result = result.replace(rule.pattern, (match, char, after) => {
      if (!rule.check(char)) return match // 이 규칙 대상 아님

      // 예외 체크
      const twoChar = char + match[match.indexOf(char) + 1]
      if (EXCEPTIONS.has(twoChar)) return match

      const origParticle = match[match.indexOf(char) + 1]
      const nextCharIdx = text.indexOf(match) + match.length
      const nextChar = text[nextCharIdx] || ''

      if (isException(char, origParticle, nextChar, match)) return match

      const fixed = char + rule.fix + after
      fixes.push({ from: match.trim(), to: fixed.trim() })
      return fixed
    })
  }

  return { text: result, fixes }
}

// JSON 파일 내의 모든 문자열을 재귀적으로 순회하며 수정
function processValue(val, path) {
  if (typeof val === 'string') {
    const { text, fixes } = fixText(val)
    return { val: text, fixes: fixes.map(f => ({ ...f, path })) }
  }
  if (Array.isArray(val)) {
    let allFixes = []
    const newArr = val.map((item, i) => {
      const { val: newVal, fixes } = processValue(item, `${path}[${i}]`)
      allFixes.push(...fixes)
      return newVal
    })
    return { val: newArr, fixes: allFixes }
  }
  if (val && typeof val === 'object') {
    let allFixes = []
    const newObj = {}
    for (const [k, v] of Object.entries(val)) {
      const { val: newVal, fixes } = processValue(v, `${path}.${k}`)
      allFixes.push(...fixes)
      newObj[k] = newVal
    }
    return { val: newObj, fixes: allFixes }
  }
  return { val, fixes: [] }
}

// 스캔 대상 디렉토리
const SCAN_DIRS = [
  'src/data/dialogues',
  'src/data/scriptedText',
  'src/data/cases/generated',
]

let totalFixes = 0
let totalFiles = 0

for (const dir of SCAN_DIRS) {
  const fullDir = path.join(process.cwd(), dir)
  if (!fs.existsSync(fullDir)) continue

  const files = fs.readdirSync(fullDir, { recursive: true })
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(fullDir, f))

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file, 'utf-8')
      const data = JSON.parse(raw)
      const relPath = path.relative(process.cwd(), file)

      const { val: fixed, fixes } = processValue(data, relPath)

      if (fixes.length > 0) {
        totalFiles++
        totalFixes += fixes.length
        console.log(`\n=== ${relPath} (${fixes.length}건) ===`)
        // 대표 5건만 출력
        fixes.slice(0, 5).forEach(f => {
          console.log(`  ${f.from} → ${f.to}`)
        })
        if (fixes.length > 5) console.log(`  ... 외 ${fixes.length - 5}건`)

        // 실제 수정 적용
        fs.writeFileSync(file, JSON.stringify(fixed, null, 2), 'utf-8')
      }
    } catch (e) {
      // JSON 파싱 오류 무시
    }
  }
}

// 엔진 파일의 템플릿 문자열도 검사 (TS 파일)
const TS_FILES = [
  'src/engine/judgeQuestionEngine.ts',
  'src/engine/stateTransitionHelper.ts',
  'src/engine/verdictSummaryEngine.ts',
  'src/engine/blueprintPromptBuilderV2.ts',
]

for (const tsFile of TS_FILES) {
  const fullPath = path.join(process.cwd(), tsFile)
  if (!fs.existsSync(fullPath)) continue

  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { text: fixed, fixes } = fixText(raw)

  if (fixes.length > 0) {
    totalFiles++
    totalFixes += fixes.length
    console.log(`\n=== ${tsFile} (${fixes.length}건) ===`)
    fixes.slice(0, 5).forEach(f => {
      console.log(`  ${f.from} → ${f.to}`)
    })
    if (fixes.length > 5) console.log(`  ... 외 ${fixes.length - 5}건`)

    fs.writeFileSync(fullPath, fixed, 'utf-8')
  }
}

console.log(`\n총 ${totalFiles}개 파일, ${totalFixes}건 수정 완료`)
