#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'docs/localization/non-dialogue-extract')
const ACTIVE_CASES = ['spouse-01', 'family-01', 'friend-01']
const LOCALES = ['ko', 'en', 'ja', 'zh-CN']

const NON_TEXT_KEYS = new Set([
  'id',
  'caseId',
  'duoId',
  'locale',
  'overlayKind',
  'overlayScope',
  'schemaVersion',
  'generatedAt',
  'relationshipType',
  'conflictSeed',
  'variableModules',
  'twistModule',
  'difficulty',
  'incomeBracket',
  'archetype',
  'digitalHabit',
  'pcFaceType',
  'type',
  'trigger',
  'category',
  'currentlyResolved',
  'emotionalResidue',
  'relationTo',
  'bias',
  'distortionRisk',
  'slot',
  'sentimentToA',
  'sentimentToB',
  'hiddenAgenda',
  'reliability',
  'completeness',
  'provenance',
  'legitimacy',
  'subjectParty',
  'speaker',
  'party',
  'targetParty',
  'disputeId',
  'evidenceId',
  'witnessId',
  'angleId',
  'questionType',
  'lieState',
  'lieBand',
  'route',
  'key',
  'choiceId',
  'branchCondition',
  'source',
  'sourceRefs',
  'tags',
])

const TEXT_KEY_HINTS = new Set([
  'text',
  'title',
  'subtitle',
  'summary',
  'body',
  'label',
  'description',
  'surfaceName',
  'surfaceDescription',
  'name',
  'occupation',
  'anchorTruth',
  'emotionalBait',
  'resolutionDilemma',
  'triggerAmplifier',
  'speechStyle',
  'fear',
  'dailyRoutine',
  'pattern',
  'toPartner',
  'toJudge',
  'angry',
  'knowledgeScope',
  'surfaceKnowledge',
  'relationToA',
  'relationToB',
  'addressJudge',
  'addressA',
  'addressB',
  'question',
  'testimony',
  'behaviorHint',
  'topic',
  'content',
  'initialContent',
  'revealedContent',
  'finding',
  'findings',
  'reason',
  'hint',
  'lede',
  'tip',
  'result',
  'judge',
])

const rows = []

main()

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  extractI18nMessages()
  extractGeneratedCaseSurfaces()
  extractScriptedAngleCatalogs()
  extractJudgeQuestions()
  extractNonPartyScriptedText()
  extractPhaseDialogueJudgeAndChoices()
  extractMediationJudgeLines()
  extractWitnessTestimony()
  extractHardcodedVisibleLiterals()

  rows.sort((a, b) => {
    return [
      a.category.localeCompare(b.category),
      a.case_id.localeCompare(b.case_id),
      a.source.localeCompare(b.source),
      a.key_path.localeCompare(b.key_path),
    ].find((value) => value !== 0) ?? 0
  })

  const priorityRows = rows.filter(isPriorityTranslationRow)
  const csvPath = path.join(OUT_DIR, 'non_dialogue_text_inventory.csv')
  fs.writeFileSync(csvPath, toCsv(rows), 'utf8')
  fs.writeFileSync(path.join(OUT_DIR, 'translation_priority_inventory.csv'), toCsv(priorityRows), 'utf8')
  fs.writeFileSync(path.join(OUT_DIR, 'README.md'), buildReadme(), 'utf8')
  fs.writeFileSync(path.join(OUT_DIR, 'gpt-pro-translation-brief.md'), buildGptBrief(), 'utf8')

  const summary = summarizeRows(rows)
  console.log(`non-dialogue text extraction ok: ${rows.length} rows, priority=${priorityRows.length} rows`)
  console.log(`output=${path.relative(ROOT, OUT_DIR).replace(/\\/g, '/')}`)
  for (const [category, count] of Object.entries(summary.byCategory)) {
    console.log(`${category}: ${count}`)
  }
}

function extractI18nMessages() {
  const dir = path.join(ROOT, 'src/i18n/messages')
  for (const file of listFiles(dir, (name) => name.endsWith('.ts'))) {
    const objectNames = evaluateConstObjects(file)
    for (const [constName, value] of Object.entries(objectNames)) {
      if (!constName.endsWith('Messages') || !isPlainObject(value)) continue
      for (const key of Object.keys(value.ko ?? {})) {
        addRow({
          category: 'ui_i18n_message',
          source: rel(file),
          case_id: '',
          key_path: key,
          ko: value.ko?.[key],
          en: value.en?.[key],
          ja: value.ja?.[key],
          zhCN: value['zh-CN']?.[key],
          notes: 'UI, system, panel, tooltip, or control label from i18n message bundle.',
        })
      }
    }
  }
}

function extractGeneratedCaseSurfaces() {
  for (const caseId of ACTIVE_CASES) {
    const files = localeJsonFiles(`src/data/cases/generated/${caseId}`)
    const flattenedByLocale = {}
    for (const locale of LOCALES) {
      if (!files[locale]) continue
      flattenedByLocale[locale] = flattenJson(readJson(files[locale]), {
        includeString: includeGeneratedCaseString,
      })
    }

    for (const keyPath of Object.keys(flattenedByLocale.ko ?? {})) {
      addRow({
        category: 'case_surface_content',
        source: 'src/data/cases/generated',
        case_id: caseId,
        key_path: keyPath,
        ko: flattenedByLocale.ko?.[keyPath],
        en: flattenedByLocale.en?.[keyPath],
        ja: flattenedByLocale.ja?.[keyPath],
        zhCN: flattenedByLocale['zh-CN']?.[keyPath],
        notes: 'Case metadata, character profile, dispute, evidence, solution, or evidence-viewer surface text. Party dialogue scripts are not included here.',
      })
    }
  }
}

function extractScriptedAngleCatalogs() {
  for (const caseId of ACTIVE_CASES) {
    const files = localeJsonFiles(`src/data/scriptedAngles/${caseId}_angle_catalog`)
    const flattenedByLocale = flattenLocaleJsonSet(files, includeAngleCatalogString)
    for (const keyPath of Object.keys(flattenedByLocale.ko ?? {})) {
      addRow({
        category: 'question_angle_catalog',
        source: 'src/data/scriptedAngles',
        case_id: caseId,
        key_path: keyPath,
        ko: flattenedByLocale.ko?.[keyPath],
        en: flattenedByLocale.en?.[keyPath],
        ja: flattenedByLocale.ja?.[keyPath],
        zhCN: flattenedByLocale['zh-CN']?.[keyPath],
        notes: 'Free interrogation angle label/description/keywords.',
      })
    }
  }
}

function extractJudgeQuestions() {
  for (const caseId of ACTIVE_CASES) {
    const files = localeJsonFiles(`src/data/scriptedAngles/${caseId}_judge_questions`)
    const flattenedByLocale = flattenLocaleJsonSet(files, includeJudgeQuestionString)
    for (const keyPath of Object.keys(flattenedByLocale.ko ?? {})) {
      addRow({
        category: 'judge_question_script',
        source: 'src/data/scriptedAngles',
        case_id: caseId,
        key_path: keyPath,
        ko: flattenedByLocale.ko?.[keyPath],
        en: flattenedByLocale.en?.[keyPath],
        ja: flattenedByLocale.ja?.[keyPath],
        zhCN: flattenedByLocale['zh-CN']?.[keyPath],
        notes: 'Judge-authored interrogation question or judge behavior hint.',
      })
    }
  }
}

function extractNonPartyScriptedText() {
  for (const caseId of ACTIVE_CASES) {
    const files = localeJsonFiles(`src/data/scriptedText/${caseId}`)
    const flattenedByLocale = {}
    for (const locale of LOCALES) {
      if (!files[locale]) continue
      const data = readJson(files[locale])
      flattenedByLocale[locale] = flattenNonPartyScriptedText(data)
    }

    for (const keyPath of Object.keys(flattenedByLocale.ko ?? {})) {
      addRow({
        category: 'non_party_scripted_text',
        source: 'src/data/scriptedText',
        case_id: caseId,
        key_path: keyPath,
        ko: flattenedByLocale.ko?.[keyPath],
        en: flattenedByLocale.en?.[keyPath],
        ja: flattenedByLocale.ja?.[keyPath],
        zhCN: flattenedByLocale['zh-CN']?.[keyPath],
        notes: 'Scripted text channel without party a/b as speaker: system, judge, witness, dossier, mediation, aftermath, and milestone copy.',
      })
    }
  }
}

function extractPhaseDialogueJudgeAndChoices() {
  for (const caseId of ACTIVE_CASES) {
    const files = localeJsonFiles(`src/data/dialogues/phase1/${caseId}`)
    const byLocale = {}
    for (const locale of LOCALES) {
      if (!files[locale]) continue
      const data = readJson(files[locale])
      byLocale[locale] = {}
      for (const [index, entry] of (data.dialogues ?? []).entries()) {
        const entryKey = entry.id ?? entry.choiceId ?? String(index)
        if (entry.speaker && !['a', 'b', 'choice'].includes(entry.speaker)) {
          if (isHumanText(entry.text)) byLocale[locale][`dialogues[${entryKey}].${entry.speaker}.text`] = entry.text
          if (isHumanText(entry.behaviorHint)) byLocale[locale][`dialogues[${entryKey}].${entry.speaker}.behaviorHint`] = entry.behaviorHint
        }
        if (entry.speaker === 'choice') {
          for (const [optionIndex, option] of (entry.options ?? entry.choices ?? []).entries()) {
            const optionKey = option.id ?? String(optionIndex)
            if (isHumanText(option.text)) byLocale[locale][`dialogues[${entryKey}].choice[${optionKey}].text`] = option.text
          }
        }
      }
    }

    for (const keyPath of Object.keys(byLocale.ko ?? {})) {
      addRow({
        category: 'phase_dialogue_judge_choice',
        source: 'src/data/dialogues/phase1',
        case_id: caseId,
        key_path: keyPath,
        ko: byLocale.ko?.[keyPath],
        en: byLocale.en?.[keyPath],
        ja: byLocale.ja?.[keyPath],
        zhCN: byLocale['zh-CN']?.[keyPath],
        notes: 'Phase 1 system narration and judge choice text. Party a/b dialogue entries are excluded.',
      })
    }
  }
}

function extractMediationJudgeLines() {
  const activeMediation = {
    'spouse-01': 'spouse-v3-01',
    'family-01': 'family-v3-01',
    'friend-01': 'friend-v3-01',
  }
  for (const caseId of ACTIVE_CASES) {
    const bundleId = activeMediation[caseId]
    const files = localeJsonFiles(`src/data/dialogues/mediation/${bundleId}`)
    const byLocale = {}
    for (const locale of LOCALES) {
      if (!files[locale]) continue
      const data = readJson(files[locale])
      byLocale[locale] = {}
      for (const [pathId, pathValue] of Object.entries(data.paths ?? {})) {
        if (isHumanText(pathValue.judge)) byLocale[locale][`paths[${pathId}].judge`] = pathValue.judge
      }
    }

    for (const keyPath of Object.keys(byLocale.ko ?? {})) {
      addRow({
        category: 'mediation_judge_line',
        source: 'src/data/dialogues/mediation',
        case_id: caseId,
        key_path: keyPath,
        ko: byLocale.ko?.[keyPath],
        en: byLocale.en?.[keyPath],
        ja: byLocale.ja?.[keyPath],
        zhCN: byLocale['zh-CN']?.[keyPath],
        notes: 'Mediation path judge line. Party a/b mediation dialogue entries are excluded.',
      })
    }
  }
}

function extractWitnessTestimony() {
  const sourceFiles = {
    'spouse-01': 'src/data/witnessTestimonyData/spouse-01.ts',
    'family-01': 'src/data/witnessTestimonyData/family-01.ts',
    'friend-01': 'src/data/witnessTestimonyData/friend-01.ts',
  }
  const overlayObjects = evaluateConstObjects(path.join(ROOT, 'src/data/witnessTestimonyData/localized.ts'))
  const overlayByCase = {
    'spouse-01': overlayObjects.SPOUSE_01_OVERLAYS ?? {},
    'family-01': overlayObjects.FAMILY_01_OVERLAYS ?? {},
    'friend-01': overlayObjects.FRIEND_01_OVERLAYS ?? {},
  }

  for (const [caseId, relativeFile] of Object.entries(sourceFiles)) {
    const objects = evaluateConstObjects(path.join(ROOT, relativeFile))
    const slots = Object.values(objects).find((value) => Array.isArray(value)) ?? []
    for (const slot of slots) {
      if (!slot?.id) continue
      for (const field of ['topic', 'question', 'testimony', 'behaviorHint']) {
        if (!isHumanText(slot[field])) continue
        const keyPath = `witnessTestimony[${slot.id}].${field}`
        addRow({
          category: 'witness_testimony',
          source: relativeFile,
          case_id: caseId,
          key_path: keyPath,
          ko: slot[field],
          en: overlayByCase[caseId]?.en?.[slot.id]?.[field],
          ja: overlayByCase[caseId]?.ja?.[slot.id]?.[field],
          zhCN: overlayByCase[caseId]?.['zh-CN']?.[slot.id]?.[field],
          notes: 'Witness topic/question/testimony/behavior hint. These are not character A/B dialogue lines.',
        })
      }
    }
  }
}

function extractHardcodedVisibleLiterals() {
  const roots = ['src/app', 'src/components', 'src/engine', 'src/store', 'src/utils']
  const ignored = [
    'src/i18n/',
    'src/data/',
    'src/types/',
  ]
  const seen = new Set()
  for (const root of roots) {
    const absoluteRoot = path.join(ROOT, root)
    if (!fs.existsSync(absoluteRoot)) continue
    for (const file of listFiles(absoluteRoot, (name) => /\.(tsx?|jsx?)$/.test(name))) {
      const relative = rel(file)
      if (ignored.some((prefix) => relative.startsWith(prefix))) continue
      const source = fs.readFileSync(file, 'utf8')
      const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
      walk(sourceFile, (node) => {
        let text = null
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
          text = node.text
        } else if (ts.isJsxText(node)) {
          text = node.getText(sourceFile).replace(/\s+/g, ' ').trim()
        }
        if (!isHumanText(text) || !hasCjk(text)) return
        if (isInternalLiteral(text) || isLargeInternalBlock(text)) return
        const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
        const key = `${relative}:${line + 1}:${text}`
        if (seen.has(key)) return
        seen.add(key)
        addRow({
          category: 'hardcoded_source_literal',
          source: relative,
          case_id: '',
          key_path: `line:${line + 1}`,
          ko: text,
          en: '',
          ja: '',
          zhCN: '',
          notes: 'Visible Korean/CJK source literal outside i18n/data. Review whether it should move into i18n or remain developer-only.',
        })
      })
    }
  }
}

function flattenNonPartyScriptedText(data) {
  const output = {}
  for (const [channelName, channel] of Object.entries(data.channels ?? {})) {
    for (const [entryIndex, entry] of (channel.entries ?? []).entries()) {
      if (isPartyABEntry(entry)) continue
      const entryKey = entry.key ?? `${channelName}-${entryIndex}`
      for (const [variantIndex, variant] of (entry.variants ?? []).entries()) {
        const variantKey = variant.id ?? String(variantIndex)
        if (isHumanText(variant.text)) output[`channels[${channelName}].entries[${entryKey}].variants[${variantKey}].text`] = variant.text
        if (isHumanText(variant.behaviorHint)) output[`channels[${channelName}].entries[${entryKey}].variants[${variantKey}].behaviorHint`] = variant.behaviorHint
      }
    }
  }
  return output
}

function isPartyABEntry(entry) {
  if (entry.party === 'a' || entry.party === 'b') return true
  const tags = Array.isArray(entry.tags) ? entry.tags : []
  return tags.some((tag) => /^(speaker|party):[ab]$/.test(String(tag)))
}

function flattenLocaleJsonSet(files, includeString) {
  const byLocale = {}
  for (const locale of LOCALES) {
    if (!files[locale]) continue
    byLocale[locale] = flattenJson(readJson(files[locale]), { includeString })
  }
  return byLocale
}

function includeGeneratedCaseString(pathParts, value) {
  const key = String(pathParts.at(-1) ?? '')
  if (!isHumanText(value)) return false
  if (NON_TEXT_KEYS.has(key)) return false
  if (pathParts.some((part) => String(part).includes('tags') || String(part).includes('Ids'))) return false
  if (TEXT_KEY_HINTS.has(key)) return true
  return hasCjk(value) && !isInternalLiteral(value)
}

function includeAngleCatalogString(pathParts, value) {
  const key = String(pathParts.at(-1) ?? '')
  return isHumanText(value) && ['label', 'description', 'keywordsLocale'].includes(key)
}

function includeJudgeQuestionString(pathParts, value) {
  const key = String(pathParts.at(-1) ?? '')
  return isHumanText(value) && ['text', 'behaviorHint'].includes(key)
}

function flattenJson(value, options, pathParts = [], output = {}) {
  if (typeof value === 'string') {
    if (options.includeString(pathParts, value)) output[toPath(pathParts)] = value
    return output
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const segment = getArraySegment(item, index)
      flattenJson(item, options, [...pathParts, segment], output)
    })
    return output
  }
  if (isPlainObject(value)) {
    for (const [key, child] of Object.entries(value)) {
      flattenJson(child, options, [...pathParts, key], output)
    }
  }
  return output
}

function getArraySegment(item, index) {
  if (isPlainObject(item)) {
    for (const key of ['id', 'key', 'disputeId', 'evidenceId', 'witnessId', 'angleId']) {
      if (typeof item[key] === 'string') return `[${item[key]}]`
    }
  }
  return `[${index}]`
}

function toPath(parts) {
  return parts.join('.').replace(/\.\[/g, '[')
}

function localeJsonFiles(baseWithoutLocale) {
  const result = {}
  const ko = path.join(ROOT, `${baseWithoutLocale}.json`)
  if (fs.existsSync(ko)) result.ko = ko
  for (const locale of LOCALES.filter((item) => item !== 'ko')) {
    const file = path.join(ROOT, `${baseWithoutLocale}.${locale}.json`)
    if (fs.existsSync(file)) result[locale] = file
  }
  return result
}

function evaluateConstObjects(file) {
  const source = fs.readFileSync(file, 'utf8')
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const result = {}
  const identifiers = {}

  function evaluateWithIdentifiers(node) {
    return evaluateExpression(node, identifiers)
  }

  walk(sourceFile, (node) => {
    if (!ts.isVariableDeclaration(node) || !node.initializer || !ts.isIdentifier(node.name)) return
    const value = evaluateWithIdentifiers(node.initializer)
    if (value !== undefined) {
      result[node.name.text] = value
      identifiers[node.name.text] = value
    }
  })

  return result
}

function evaluateExpression(node, identifiers = {}) {
  node = unwrapExpression(node)
  if (!node) return undefined
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (ts.isPrefixUnaryExpression(node)) {
    const value = evaluateExpression(node.operand, identifiers)
    if (typeof value === 'number' && node.operator === ts.SyntaxKind.MinusToken) return -value
  }
  if (ts.isIdentifier(node)) return identifiers[node.text]
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) => evaluateExpression(element, identifiers))
  }
  if (ts.isObjectLiteralExpression(node)) {
    const object = {}
    for (const property of node.properties) {
      if (ts.isSpreadAssignment(property)) {
        const value = evaluateExpression(property.expression, identifiers)
        if (isPlainObject(value)) Object.assign(object, value)
        continue
      }
      if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) continue
      const key = ts.isShorthandPropertyAssignment(property)
        ? property.name.text
        : getPropertyName(property.name)
      if (!key) continue
      object[key] = ts.isShorthandPropertyAssignment(property)
        ? identifiers[property.name.text]
        : evaluateExpression(property.initializer, identifiers)
    }
    return object
  }
  return undefined
}

function unwrapExpression(node) {
  while (
    node &&
    (ts.isAsExpression(node) ||
      ts.isSatisfiesExpression?.(node) ||
      ts.isParenthesizedExpression(node) ||
      ts.isTypeAssertionExpression?.(node))
  ) {
    node = node.expression
  }
  return node
}

function getPropertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text
  return null
}

function walk(node, visitor) {
  visitor(node)
  ts.forEachChild(node, (child) => walk(child, visitor))
}

function addRow({ category, source, case_id, key_path, ko, en, ja, zhCN, notes }) {
  rows.push({
    id: stableId(category, source, case_id, key_path),
    category,
    source,
    case_id,
    key_path,
    ko: normalizeCell(ko),
    en: normalizeCell(en),
    ja: normalizeCell(ja),
    'zh-CN': normalizeCell(zhCN),
    notes: normalizeCell(notes),
  })
}

function stableId(...parts) {
  return parts
    .join('|')
    .replace(/[^a-zA-Z0-9가-힣一-龥ぁ-んァ-ン_.:-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 180)
}

function normalizeCell(value) {
  if (value === undefined || value === null) return ''
  return String(value).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
}

function isHumanText(value) {
  if (typeof value !== 'string') return false
  const text = value.trim()
  if (!text) return false
  if (text.length <= 1) return false
  if (isInternalLiteral(text)) return false
  return /[A-Za-z가-힣一-龥ぁ-んァ-ン]/.test(text)
}

function hasCjk(value) {
  return /[가-힣一-龥ぁ-んァ-ン]/.test(String(value ?? ''))
}

function isInternalLiteral(value) {
  const text = String(value ?? '').trim()
  if (!text) return true
  if (/^[a-z0-9_.:/#-]+$/i.test(text) && !/\s/.test(text)) return true
  if (/^(true|false|null|undefined)$/i.test(text)) return true
  if (/^#[0-9a-f]{3,8}$/i.test(text)) return true
  if (/^\d+(\.\d+)?$/.test(text)) return true
  return false
}

function isLargeInternalBlock(value) {
  const text = String(value ?? '')
  if (text.length > 900) return true
  if (text.split('\n').length > 8) return true
  return false
}

function toCsv(items) {
  const headers = ['id', 'category', 'source', 'case_id', 'key_path', 'ko', 'en', 'ja', 'zh-CN', 'notes']
  return [
    headers.join(','),
    ...items.map((row) => headers.map((key) => csvEscape(row[key])).join(',')),
  ].join('\n') + '\n'
}

function csvEscape(value) {
  const text = String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function buildReadme() {
  const summary = summarizeRows(rows)
  const priorityRows = rows.filter(isPriorityTranslationRow)
  const prioritySummary = summarizeRows(priorityRows)
  const categoryLines = Object.entries(summary.byCategory)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([category, count]) => `| ${category} | ${count} |`)
    .join('\n')
  const priorityCategoryLines = Object.entries(prioritySummary.byCategory)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([category, count]) => `| ${category} | ${count} |`)
    .join('\n')
  const caseLines = Object.entries(summary.byCase)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([caseId, count]) => `| ${caseId || '(global)'} | ${count} |`)
    .join('\n')

  return `# Non-Dialogue Text Extract

Generated by \`node scripts/extract-non-dialogue-text.cjs\`.

This inventory is intended for retranslation of UI, system, evidence, judge, panel, and other non-party-dialogue text. It deliberately excludes character A/B dialogue lines where the speaker or scripted party is \`a\` or \`b\`.

## Files

- \`non_dialogue_text_inventory.csv\`: wide CSV with \`ko\`, \`en\`, \`ja\`, and \`zh-CN\` columns.
- \`translation_priority_inventory.csv\`: first-pass CSV for translation work. It keeps player-facing data/UI categories and excludes lower-priority hardcoded engine literals.
- \`gpt-pro-translation-brief.md\`: prompt brief for external translation/review.

## Counts

Total rows: ${rows.length}
Priority rows: ${priorityRows.length}

| Category | Rows |
| --- | ---: |
${categoryLines}

## Priority Counts

| Category | Rows |
| --- | ---: |
${priorityCategoryLines}

| Case | Rows |
| --- | ---: |
${caseLines}

## Included

- i18n UI/system/panel/button/tooltip messages from \`src/i18n/messages/*\`
- generated case surface text from \`src/data/cases/generated/*\`
- evidence names, evidence descriptions, evidence-viewer text, disputes, profiles, solutions, and case metadata
- judge question scripts from \`src/data/scriptedAngles/*_judge_questions*.json\`
- question angle labels/descriptions from \`src/data/scriptedAngles/*_angle_catalog*.json\`
- non-party scripted channels from \`src/data/scriptedText/*.json\`: system, judge, witness, dossier, mediation, aftermath, milestone copy
- Phase 1 system narration and judge choice options
- active mediation judge lines
- witness testimony topic/question/testimony/behavior hints
- Korean/CJK hardcoded source literals outside \`src/i18n\` and \`src/data\`

## Excluded

- Phase 1 dialogue entries with \`speaker: "a"\` or \`speaker: "b"\`
- active mediation dialogue entries with \`speaker: "a"\` or \`speaker: "b"\`
- scripted text entries with \`party: "a"\` or \`party: "b"\`
- \`*_interrogation_answers*.json\`, which is party A/B answer script
- most internal IDs, schema keys, tags, enum values, file paths, and code-only strings

## Recommended Use

Start translation work with \`translation_priority_inventory.csv\`. Use \`non_dialogue_text_inventory.csv\` as an audit/backstop when checking whether any visible source literal was missed.
`
}

function buildGptBrief() {
  return `# GPT Pro 5.5 Translation Brief: Non-Dialogue Text

Use \`translation_priority_inventory.csv\` as the source inventory for the first pass. Use \`non_dialogue_text_inventory.csv\` only as an audit/backstop if you need to inspect lower-priority hardcoded source literals.

## Goal

Rewrite non-dialogue localization for English, Japanese, and Simplified Chinese so it reads like native UI/game text, not literal Korean courtroom machine translation.

Character A/B dialogue scripts are intentionally out of scope. Do not rewrite party A/B spoken dialogue unless a row is explicitly included in this CSV.

## Columns

- \`id\`: stable row identifier.
- \`category\`: source category.
- \`source\`: source file or folder.
- \`case_id\`: empty for global UI, otherwise active case id.
- \`key_path\`: source key/path.
- \`ko\`: Korean source/fallback text.
- \`en\`, \`ja\`, \`zh-CN\`: current translations to review and replace.
- \`notes\`: extraction context.

## Translation Rules

1. Preserve placeholders exactly, including braces: \`{count}\`, \`{party}\`, \`{name}\`, \`{phase}\`, etc.
2. Preserve stable IDs, case IDs, speaker IDs, evidence IDs, and schema terms when they appear in \`key_path\`; translate only visible text columns.
3. Translate by function and local convention, not by Korean literal wording.
   - Korean \`블랙박스\` for a car recording device should become context-appropriate terms such as \`dashcam\` in English, \`ドライブレコーダー\` in Japanese, and \`行车记录仪\` in Simplified Chinese.
   - \`오피스텔\` needs locale-aware handling. In English, use \`officetel\` only if the Korean setting matters; otherwise clarify as \`studio apartment/officetel\` on first use where needed.
   - \`재판관\` in this game is closer to a neutral adjudicator/judge. Choose one term per locale and keep it consistent.
4. UI labels should be concise. System and judge text can be natural but should stay clear and controlled.
5. Evidence names should sound like in-game evidence objects, not legal pleadings.
6. Avoid over-formal legalese unless the Korean source is explicitly formal.
7. Keep tone consistent with a serious courtroom mystery game.

## Deliverable

Return a CSV with the same row order and the same columns, replacing only \`en\`, \`ja\`, and \`zh-CN\`. If a source row needs a Korean wording fix, add a short reviewer note separately rather than changing \`ko\`.
`
}

function summarizeRows(items) {
  const byCategory = {}
  const byCase = {}
  for (const row of items) {
    byCategory[row.category] = (byCategory[row.category] ?? 0) + 1
    byCase[row.case_id] = (byCase[row.case_id] ?? 0) + 1
  }
  return { byCategory, byCase }
}

function isPriorityTranslationRow(row) {
  if (row.category !== 'hardcoded_source_literal') return true
  if (row.source.startsWith('src/app/')) return true
  if (row.source.startsWith('src/components/')) return true
  if (row.source.startsWith('src/store/')) return true
  if (row.source.startsWith('src/utils/')) return true
  return false
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function listFiles(dir, predicate, result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      listFiles(full, predicate, result)
    } else if (predicate(entry.name, full)) {
      result.push(full)
    }
  }
  return result
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/')
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
