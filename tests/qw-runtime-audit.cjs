/**
 * qw-runtime-audit.cjs — V6 런타임 품질 스캐너
 *
 * 입력: tests/transcripts/<caseId>.json 또는 tests/transcripts/<caseId>-rN.json
 *       (run-84-headless.cjs 전사본 형식)
 *
 * 출력: 표준출력 + 지정 경로(--output <path>)에 audit JSON
 *
 * 검사 대상: V6 집중-8 (호칭 혼종) / 집중-9 (Placeholder) / 집중-10 (경계 오염)
 *            + V5 집중-1 (조사 오류) / FORBID (금지 10종)
 *
 * 턴 변환: 기존 전사본 1 entry → V6 turn 2개 (judge 질문 + party 응답)
 *
 * 사용법:
 *   node tests/qw-runtime-audit.cjs --input tests/transcripts/spouse-01.json --output tmp/qw-v6-r14-audit.json
 *   node tests/qw-runtime-audit.cjs --input tests/transcripts/spouse-01.json   # stdout only
 */
const fs = require('fs')
const path = require('path')

// ── 검출 패턴 정의 ──

const HON_JUDGE = /재판관님/
// 호격(vocative) 검출: 공백+쉼표 조합(동사어미와 충돌) 피하고, 쉼표/감탄/의문만 허용
// 추가: 빈출 동사어미 stem 배제 lookbehind
const HON_PARTNER = /(자기야[,!?]|(?<![가-힣])너[,!?]|(?<![되어아이우으오해하히짖알봤같잖많있없싫좋알려내나해하이들먹받갔올따여녀나러려거기])[가-힣](아|야)[,!?])/
const ENDING_INFORMAL = /(았어\?|었어\?|잖아\.|잖아\?|지\?|ㄴ데\?)/
const ENDING_FORMAL = /(습니다|십니다|ㅂ니다)/
const INDIRECT_REF = /제\s*(남편|아내|친구|형|동생|언니|오빠|부모님|어머니|아버지)/

const PLACEHOLDER_PATTERNS = [
  { type: '9-a', re: /\([이가]\)/ },
  { type: '9-b', re: /\([은는]\)/ },
  { type: '9-c', re: /\([을를]\)/ },
  { type: '9-d', re: /\([과와]\)/ },
  { type: '9-e', re: /\([으]?로\)/ },
  { type: '9-f', re: /\{[A-Z]+\}/ },
  { type: '9-g', re: /\{[a-z_]+\}/ },
]

const FORBID_PATTERNS = [
  { type: 'forbid_라고하셨', re: /라고 하셨/ },
  { type: 'forbid_내용확인', re: /내용이 확인/ },
  { type: 'forbid_태도변화', re: /태도에 변화/ },
  { type: 'forbid_흐름나타남', re: /흐름이 나타납니다/ },
  { type: 'forbid_된것으로', re: /된 것으로 생각됩니다/ },
  { type: 'forbid_부득이', re: /부득이하게/ },
  { type: 'forbid_인지', re: /인지하고 있/ },
  { type: 'forbid_사전상의', re: /사전 상의|사전 협의/ },
  { type: 'forbid_미리말씀', re: /미리 말씀드리지 못한/ },
  { type: 'forbid_특정X', re: /특정 (사항|문제|상황|부분|내용)/ },
]

const SYSTEM_TONE = /(한다|했다|되었다|섰다)\.$/

// 집중-8 FP 완화: 내부 따옴표 안쪽 제거 후 검사
function stripInnerQuotes(text) {
  // 큰따옴표 안쪽 내용을 제거 (재인용)
  return text.replace(/"[^"]*"/g, '').replace(/'[^']*'/g, '')
}

// ── 전사본 → V6 turns 변환 ──

function convertTranscript(tr) {
  const turns = []
  let turnNo = 0
  for (const entry of tr.turns || []) {
    // judge 질문
    if (entry.judgeQuestion) {
      turnNo++
      turns.push({
        turnNo,
        speaker: 'judge',
        role: 'question',
        content: entry.judgeQuestion,
        phase: inferPhase(entry.label, entry.action),
        lieState: entry.lieState,
        eventType: null,
        origEntry: entry.turn,
      })
    }
    // party 응답
    if (entry.npcResponse) {
      turnNo++
      turns.push({
        turnNo,
        speaker: entry.party === 'a' ? 'A' : 'B',
        role: 'response',
        content: entry.npcResponse,
        phase: inferPhase(entry.label, entry.action),
        lieState: entry.lieState,
        eventType: entry.evidenceId ? 'evidence_present' : null,
        origEntry: entry.turn,
      })
    }
  }
  return turns
}

function inferPhase(label, action) {
  // 라벨 패턴 heuristic: 심문=3, 증거제시=4, 재심문=5, 모순=3/5, 중재=6, 판결=7
  if (!label) return 3
  if (/증거/.test(label)) return 4
  if (/재심문|재/.test(label)) return 5
  if (/중재|조정/.test(label)) return 6
  if (/판결|해결/.test(label)) return 7
  return 3
}

// ── Audit ──

function audit(turns) {
  const issues = []
  const counts = {
    '8-a': 0, '8-b': 0, '8-c': 0, '8-d': 0,
    '9-a': 0, '9-b': 0, '9-c': 0, '9-d': 0, '9-e': 0, '9-f': 0, '9-g': 0,
    '10-a': 0, '10-b': 0, '10-c': 0, '10-d': 0, '10-e': 0,
    forbid: 0,
  }
  for (const t of turns) {
    const content = t.content || ''
    // 집중-8 (NPC 대사만)
    if (t.speaker === 'A' || t.speaker === 'B') {
      const stripped = stripInnerQuotes(content)
      const j = HON_JUDGE.test(stripped)
      const p = HON_PARTNER.test(stripped)
      const i = ENDING_INFORMAL.test(stripped)
      const f = ENDING_FORMAL.test(stripped)
      const ind = INDIRECT_REF.test(stripped)
      if (j && p) { counts['8-a']++; issues.push(mkIssue('8-a', t, '재판관 호칭 + 상대 호격 공존')) }
      if (j && i) { counts['8-b']++; issues.push(mkIssue('8-b', t, '재판관 호칭 + 반말 종결')) }
      if (f && i) { counts['8-c']++; issues.push(mkIssue('8-c', t, '합니다체 + 반말 종결 혼재')) }
      if (ind && p) { counts['8-d']++; issues.push(mkIssue('8-d', t, '간접지칭 + 상대 호격 공존')) }
    }
    // 집중-9 (모든 턴)
    for (const { type, re } of PLACEHOLDER_PATTERNS) {
      if (re.test(content)) { counts[type]++; issues.push(mkIssue(type, t, 'Placeholder 미치환')) }
    }
    // FORBID (모든 턴)
    for (const { type, re } of FORBID_PATTERNS) {
      if (re.test(content)) { counts.forbid++; issues.push(mkIssue(type, t, '금지 패턴')) }
    }
    // 집중-10 경계 오염
    if (t.speaker === 'system' && t.role === 'response') {
      counts['10-a']++; issues.push(mkIssue('10-a', t, 'system speaker를 대사로'))
    }
    if ((t.speaker === 'A' || t.speaker === 'B') && (!content || content === 'undefined' || content.trim() === '')) {
      counts['10-b']++; issues.push(mkIssue('10-b', t, '빈 NPC 응답'))
    }
    if ((t.speaker === 'A' || t.speaker === 'B') && SYSTEM_TONE.test(content)) {
      counts['10-c']++; issues.push(mkIssue('10-c', t, 'NPC가 관찰자 서술체'))
    }
    if (t.speaker === 'judge' && /저는|제가/.test(content)) {
      counts['10-d']++; issues.push(mkIssue('10-d', t, '재판관이 1인칭 대화체'))
    }
  }
  return { counts, issues }
}

function mkIssue(type, t, note) {
  return {
    type,
    turnNo: t.turnNo,
    speaker: t.speaker,
    phase: t.phase,
    lieState: t.lieState,
    origEntry: t.origEntry,
    note,
    content: (t.content || '').slice(0, 150),
  }
}

// ── 엔트리 포인트 ──

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = {}
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) opts.input = args[++i]
    else if (args[i] === '--output' && args[i + 1]) opts.output = args[++i]
    else if (args[i] === '--round' && args[i + 1]) opts.round = args[++i]
    else if (args[i] === '--scenario' && args[i + 1]) opts.scenario = args[++i]
  }
  return opts
}

function main() {
  const opts = parseArgs()
  if (!opts.input) {
    console.error('usage: node tests/qw-runtime-audit.cjs --input <transcript.json> [--output <audit.json>] [--round NN] [--scenario "desc"]')
    process.exit(1)
  }
  if (!fs.existsSync(opts.input)) {
    console.error(`입력 파일 없음: ${opts.input}`)
    process.exit(1)
  }
  const tr = JSON.parse(fs.readFileSync(opts.input, 'utf8'))
  const turns = convertTranscript(tr)
  const { counts, issues } = audit(turns)

  const report = {
    round: opts.round || null,
    caseId: tr.caseId,
    scenario: opts.scenario || 'default',
    sourceTranscript: opts.input,
    totalTurns: turns.length,
    counts,
    issues,
    generatedAt: new Date().toISOString(),
  }

  console.log(`\n=== ${tr.caseId} (${turns.length} turns) ===`)
  console.log('counts:', JSON.stringify(counts))
  if (issues.length) {
    console.log(`\n상위 5건:`)
    for (const iss of issues.slice(0, 5)) {
      console.log(`  [${iss.type}] turn${iss.turnNo} ${iss.speaker}: ${iss.content.slice(0, 80)}`)
    }
  } else {
    console.log('이슈 없음.')
  }

  if (opts.output) {
    const outDir = path.dirname(opts.output)
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(opts.output, JSON.stringify(report, null, 2), 'utf8')
    console.log(`\nsaved: ${opts.output}`)
  }
}

if (require.main === module) main()

module.exports = { convertTranscript, audit }
