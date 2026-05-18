#!/usr/bin/env node
/**
 * Generate Codex Phase 2 LQA thread briefs from template.
 *
 * Usage:
 *   node scripts/generate-lqa-thread-briefs.cjs
 *
 * Output:
 *   docs/design/translation-lqa-phase/threads/thread-{id}-{case}-{lang}.md (× 9)
 *   docs/design/translation-lqa-phase/threads/thread-beta10-ui-global.md
 *
 * Re-runnable. Overwrites existing thread brief files.
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const TEMPLATE_DIR = path.join(ROOT, 'docs/design/translation-lqa-phase')
const OUT_DIR = path.join(TEMPLATE_DIR, 'threads')
const TEMPLATE_CASE_LANG = path.join(TEMPLATE_DIR, 'codex-thread-template-case-lang.md')
const TEMPLATE_UI = path.join(TEMPLATE_DIR, 'codex-thread-template-ui.md')

const CASES = ['spouse-01', 'family-01', 'friend-01']
const LANGS = [
  { code: 'en', name: 'English' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
]

const SAMPLE_STRATEGY = {
  ui_i18n_message:        { method: '100% 전수', estCells: 'all UI keys (~979)' },
  case_surface_content:   { method: '10% 무작위 + 위배 의심(Phase 0 검출) 100%', estCells: '~200 sampled' },
  judge_question_script:  { method: 'stratified 15% 무작위 + 100% truth-leak 키워드 + 100% meta-question 검출 (v[0]·v[last] 우선)', estCells: '~600-800 sampled' },
  non_party_scripted_text:{ method: '10% 무작위 + 의심 100%', estCells: '~300 sampled' },
  question_angle_catalog: { method: '20% 무작위', estCells: '~80 sampled' },
  witness_testimony:      { method: '20% 무작위 + 의심 100%', estCells: '~150 sampled' },
}

const LANG_SPECIFIC_CHECKS = {
  en: `- 직역 영문 명사구 사전 위배 (the X figure / X bracket / X track 등 ~30종)
- 영문 길이 spike: KO length × 2.5 + 24 초과 시 노트 (이미 알려진 자연 확장 다수)
- 인명 표기: glossary "Park Ji-yeon" / "Lee Jun-ho" / "Yoon Tae-seong" / "Yoon Jeong-hu" 강제`,
  ja: `- 조사 휴리스틱 위배 (が/は/を 단순 패턴, 명사+を+명사 nonsense 등)
- 한자/카타카나 표기 통일 (인명 카타카나 권장)
- 합쇼체/てください 톤 일관 (재판관 발화)`,
  'zh-CN': `- 한국어식 어순 (X的Y是, X与Y之间的Z, 对X的Y来说) 회피
- 简化字 통일 (繁體字 잔류 0)
- 호칭 "先生" / "女士" 일관`,
}

function caseLangThreadId(caseIdx, langIdx) {
  return 'β' + (caseIdx * LANGS.length + langIdx + 1)
}

function sourceFilesForCaseLang(caseId, lang) {
  return [
    `- \`src/data/cases/generated/${caseId}.${lang}.json\``,
    `- \`src/data/dialogues/mediation/${caseId.replace('-01', '-v3-01')}.${lang}.json\``,
    `- \`src/data/dialogues/phase1/${caseId}.${lang}.json\``,
    `- \`src/data/scriptedAngles/${caseId}_angle_catalog.${lang}.json\``,
    `- \`src/data/scriptedAngles/${caseId}_judge_questions.${lang}.json\``,
    `- \`src/data/scriptedText/${caseId}.${lang}.json\``,
  ].join('\n')
}

function koBaselineFiles(caseId) {
  return [
    `- \`src/data/cases/generated/${caseId}.json\``,
    `- \`src/data/scriptedAngles/${caseId}_angle_catalog.json\``,
    `- \`src/data/scriptedAngles/${caseId}_judge_questions.json\``,
    `- \`src/data/scriptedText/${caseId}.json\``,
  ].join('\n')
}

function sampleTable(caseId) {
  const categories = [
    ['case_surface_content', SAMPLE_STRATEGY.case_surface_content],
    ['judge_question_script', SAMPLE_STRATEGY.judge_question_script],
    ['non_party_scripted_text', SAMPLE_STRATEGY.non_party_scripted_text],
    ['question_angle_catalog', SAMPLE_STRATEGY.question_angle_catalog],
    ['witness_testimony', SAMPLE_STRATEGY.witness_testimony],
  ]
  let md = '| Category | 표본 방법 | 추정 cell |\n|---|---|---|\n'
  for (const [cat, info] of categories) {
    md += `| ${cat} | ${info.method} | ${info.estCells} |\n`
  }
  return md
}

function generateCaseLangBrief(template, caseIdx, langIdx) {
  const caseId = CASES[caseIdx]
  const lang = LANGS[langIdx]
  const threadId = caseLangThreadId(caseIdx, langIdx)
  const outputPath = `docs/design/translation-lqa-phase/reports/${caseId}_${lang.code}.csv`
  const sampleSeed = `${caseId}-${lang.code}-2026-05-19`

  const substitutions = {
    THREAD_ID: threadId,
    CASE: caseId,
    LANG: lang.code,
    LANG_NAME: lang.name,
    OUTPUT_PATH: outputPath,
    DATE: '2026-05-19',
    SOURCE_FILES: sourceFilesForCaseLang(caseId, lang.code),
    KO_BASELINE_FILES: koBaselineFiles(caseId),
    SAMPLE_TABLE: sampleTable(caseId),
    SAMPLE_SEED: sampleSeed,
    LANG_SPECIFIC_CHECKS: LANG_SPECIFIC_CHECKS[lang.code],
    COMMIT_SUMMARY: '<thread 종료 시 채울 것: P0/P1/P2 카운트 + hot category>',
    ROW_COUNT: '<thread 종료 시 채울 것>',
    P0_COUNT: '<채울 것>',
    P1_COUNT: '<채울 것>',
    P2_COUNT: '<채울 것>',
  }

  let out = template
  for (const [k, v] of Object.entries(substitutions)) {
    out = out.split(`{{${k}}}`).join(v)
  }
  return { threadId, caseId, lang: lang.code, content: out }
}

function generateUiBrief(template) {
  const substitutions = {
    DATE: '2026-05-19',
    COMMIT_SUMMARY: '<thread 종료 시 채울 것: lang별 P0/P1/P2>',
  }
  let out = template
  for (const [k, v] of Object.entries(substitutions)) {
    out = out.split(`{{${k}}}`).join(v)
  }
  return { threadId: 'β10', content: out }
}

function main() {
  if (!fs.existsSync(TEMPLATE_CASE_LANG)) {
    console.error('Template missing:', TEMPLATE_CASE_LANG)
    process.exit(1)
  }
  if (!fs.existsSync(TEMPLATE_UI)) {
    console.error('Template missing:', TEMPLATE_UI)
    process.exit(1)
  }
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true })
  }

  const templateCaseLang = fs.readFileSync(TEMPLATE_CASE_LANG, 'utf8')
  const templateUi = fs.readFileSync(TEMPLATE_UI, 'utf8')

  const generated = []

  for (let ci = 0; ci < CASES.length; ci++) {
    for (let li = 0; li < LANGS.length; li++) {
      const { threadId, caseId, lang, content } = generateCaseLangBrief(templateCaseLang, ci, li)
      const fname = `thread-${threadId.replace('β', 'beta')}-${caseId}-${lang}.md`
      const fpath = path.join(OUT_DIR, fname)
      fs.writeFileSync(fpath, content, 'utf8')
      generated.push({ threadId, file: path.relative(ROOT, fpath) })
    }
  }

  const uiResult = generateUiBrief(templateUi)
  const uiFname = 'thread-beta10-ui-global.md'
  const uiPath = path.join(OUT_DIR, uiFname)
  fs.writeFileSync(uiPath, uiResult.content, 'utf8')
  generated.push({ threadId: 'β10', file: path.relative(ROOT, uiPath) })

  console.log(`Generated ${generated.length} Codex thread briefs:`)
  for (const g of generated) {
    console.log(`  ${g.threadId.padEnd(4)} → ${g.file}`)
  }
}

main()
