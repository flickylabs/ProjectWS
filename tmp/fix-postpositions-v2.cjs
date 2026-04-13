/**
 * 한국어 조사 오류 정밀 검출 + 수정 v2
 * 확실한 오류만 수정. 동사 활용형/이름/합성어 오탐 방지.
 */
const fs = require('fs')
const path = require('path')

function hasBatchim(char) {
  const code = char.charCodeAt(0)
  if (code < 0xAC00 || code > 0xD7A3) return null
  return (code - 0xAC00) % 28 !== 0
}

// 동사/형용사 어간 끝음절 (활용형에서 은/는/을/를이 붙을 수 있는 경우)
// 예: 하+는, 되+는, 없+는, 있+는, 같+은 등
const VERB_STEMS = new Set([
  '하', '되', '지', '시', '나', '오', '가', '서', '주', '보', '두', '써', '해',
  '내', '세', '대', '래', '매', '때', '새', '채', '패', '제', '께', '테', '네',
  '수', '바', '소', '모', '노', '로', '도', '고', '조', '토', '포', '호', '요',
  '리', '기', '비', '미', '피', '치', '니', '디', '시', '이', '히',
  '어', '여', '더', '며', '러', '너', '거', '저', '커', '터', '퍼',
  '위', '뒤', '쉬', '취', '추', '투', '부', '무', '루', '누', '구', '두', '푸', '후', '우', '쿠', '수', '주',
])

// 확실한 예외 단어 (2글자)
const WORD_EXCEPTIONS = new Set([
  // 이름에 흔한 패턴
  '가은', '다은', '수민', '지은', '서은', '채은', '하은', '유은', '민은',
  // 일반 단어 (조사 아님)
  '사이', '아이', '여기', '거기', '여과', '자과', '치과', '교과', '학과',
  '사과', '결과', '성과', '효과', '원과', '평가', '진가', '대가', '물가',
  '경과', '통과', '과과',
  '모이', '보이', '쏘이', '죄과', '과실',
  '없는', '있는', '않는', '같는', '많는', '없을', '있을', '않을', '같을', '많을',
  '했을', '됐을', '왔을', '갔을', '봤을', '줬을', '넣을', '앉을', '잃을',
  '했는', '됐는', '왔는', '갔는', '봤는', '줬는', '넣는', '앉는', '잃는',
  '만은', '만을', '까는', '까을',
  // 연결어미/부사
  '나는', '너는', '저는', '누는',
])

// 3글자 예외 (끝 2글자)
const SUFFIX_EXCEPTIONS = new Set([
  '에는', '로는', '고는', '서는', '지는', '면은', '데는',
  '에을', '로을', '고을', '서을',
  '까지', '부터', '에서', '으로', '에게', '한테',
])

let totalFixes = 0
let totalFiles = 0
const allFixLog = []

function fixTextPrecise(text) {
  const fixes = []

  // 받침 없는 글자 + 을 → 를 (가장 명확한 패턴)
  let result = text.replace(/([\uAC00-\uD7A3])(을)([\s.?!,…~\-"""'''])/g, (match, char, particle, after) => {
    if (hasBatchim(char) !== false) return match // 받침 있으면 정상
    const twoChar = char + particle
    if (WORD_EXCEPTIONS.has(twoChar)) return match
    if (VERB_STEMS.has(char)) return match // 동사 어간일 수 있음
    fixes.push({ from: char + particle, to: char + '를', context: match.trim() })
    return char + '를' + after
  })

  // 받침 없는 글자 + 은 → 는 (관형형이 아닌 확실한 경우만)
  // "X은 Y이다", "X은," 패턴만 수정 (뒤에 공백/문장부호)
  result = result.replace(/([\uAC00-\uD7A3])(은)([\s,."""'''])/g, (match, char, particle, after) => {
    if (hasBatchim(char) !== false) return match
    const twoChar = char + particle
    if (WORD_EXCEPTIONS.has(twoChar)) return match
    if (VERB_STEMS.has(char)) return match
    fixes.push({ from: char + particle, to: char + '는', context: match.trim() })
    return char + '는' + after
  })

  // 받침 있는 글자 + 를 → 을
  result = result.replace(/([\uAC00-\uD7A3])(를)([\s.?!,…~\-"""'''])/g, (match, char, particle, after) => {
    if (hasBatchim(char) !== true) return match // 받침 없으면 정상
    const twoChar = char + particle
    if (WORD_EXCEPTIONS.has(twoChar)) return match
    fixes.push({ from: char + particle, to: char + '을', context: match.trim() })
    return char + '을' + after
  })

  // 받침 있는 글자 + 는 → 은 (매우 조심 — 동사 관형형이 대부분)
  // 이건 너무 오탐이 많아서 스킵. 받침+는 은 거의 다 관형형.

  return { text: result, fixes }
}

function processJSON(data, filepath) {
  const jsonStr = JSON.stringify(data)
  const { text: fixedStr, fixes } = fixTextPrecise(jsonStr)

  if (fixes.length > 0) {
    return { data: JSON.parse(fixedStr), fixes }
  }
  return { data, fixes: [] }
}

// 대상 파일
const SCAN_DIRS = [
  'src/data/dialogues/phase1',
  'src/data/dialogues/phase2',
  'src/data/dialogues/mediation',
  'src/data/scriptedText',
  'src/data/cases/generated',
]

for (const dir of SCAN_DIRS) {
  const fullDir = path.join(process.cwd(), dir)
  if (!fs.existsSync(fullDir)) continue

  const files = []
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(path.join(d, entry.name))
      else if (entry.name.endsWith('.json') && !entry.name.includes('_archive')) files.push(path.join(d, entry.name))
    }
  }
  walk(fullDir)

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file, 'utf-8')
      const data = JSON.parse(raw)
      const relPath = path.relative(process.cwd(), file)
      const { data: fixed, fixes } = processJSON(data, relPath)

      if (fixes.length > 0) {
        totalFiles++
        totalFixes += fixes.length
        console.log(`${relPath}: ${fixes.length}건`)
        fixes.slice(0, 8).forEach(f => console.log(`  "${f.from}" → "${f.to}"`))
        if (fixes.length > 8) console.log(`  ... 외 ${fixes.length - 8}건`)

        fs.writeFileSync(file, JSON.stringify(fixed, null, 2), 'utf-8')
      }
    } catch (e) { /* skip */ }
  }
}

// TS 엔진 파일의 템플릿 문자열도 검사
const TS_FILES = [
  'src/engine/judgeQuestionEngine.ts',
]

for (const tsFile of TS_FILES) {
  const fullPath = path.join(process.cwd(), tsFile)
  if (!fs.existsSync(fullPath)) continue
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { text: fixed, fixes } = fixTextPrecise(raw)
  if (fixes.length > 0) {
    totalFiles++
    totalFixes += fixes.length
    console.log(`${tsFile}: ${fixes.length}건`)
    fixes.forEach(f => console.log(`  "${f.from}" → "${f.to}"`))
    fs.writeFileSync(fullPath, fixed, 'utf-8')
  }
}

console.log(`\n=== 총 ${totalFiles}개 파일, ${totalFixes}건 수정 ===`)
