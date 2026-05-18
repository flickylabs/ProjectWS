#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const ROOT = path.resolve(__dirname, '..')
const INPUT_DIR = path.join(ROOT, 'docs/localization/non-dialogue-extract/batches/GPT_Result')
const LOCALES = ['en', 'ja', 'zh-CN']
const ALL_LOCALES = ['ko', ...LOCALES]
const ACTIVE_MEDIATION = {
  'spouse-01': 'spouse-v3-01',
  'family-01': 'family-v3-01',
  'friend-01': 'friend-v3-01',
}
const WITNESS_CONSTS = {
  'spouse-01': 'SPOUSE_01_OVERLAYS',
  'family-01': 'FAMILY_01_OVERLAYS',
  'friend-01': 'FRIEND_01_OVERLAYS',
}
const BRAND_REPLACEMENTS = {
  ko: [
    ['솔로몬의 딜레마: 진실의 무게', '솔로몬의 딜레마: 진실의 재판'],
    ['진실의 무게', '진실의 재판'],
  ],
  en: [
    ["Solomon's Dilemma: The Weight of Truth", 'Verdict Zero: Trial of Truth'],
    ["Solomon's Dilemma", 'Verdict Zero'],
    ['Solomon Court', 'Verdict Zero Courtroom'],
    ['The Weight of Truth', 'Trial of Truth'],
  ],
  ja: [
    ['ソロモンのジレンマ：真実の重み', 'ソロモンのジレンマ：真実の裁き'],
    ['ソロモンのジレンマ：真実の重さ', 'ソロモンのジレンマ：真実の裁き'],
    ['ソロモン法廷', '真実の法廷'],
    ['真実の重み', '真実の裁き'],
    ['真実の重さ', '真実の裁き'],
  ],
  'zh-CN': [
    ['所罗门的两难：真相的重量', '真相裁决：零点审判'],
    ['所罗门的两难', '真相裁决'],
    ['真相的重量', '零点审判'],
  ],
}
const DISCLOSURE_REPLACEMENTS = {
  'spouse-01': {
    en: [
      ["supporting his brother's family", 'supporting that household'],
      ["school costs for the child", 'costs for the child'],
      ["lost everything in the investment", 'the investment ended in loss'],
      ["brother's officetel", 'that officetel'],
      ["under brother's name", 'under another name'],
      ["sent to his brother", 'sent to a family member'],
      ["wired to his brother", 'sent to a family member'],
      ["brother's family", 'that household'],
      ["brother's child", 'child'],
      ["brother's debt", 'family debt'],
      ['older brother', 'family member'],
      ['brother', 'family member'],
      ['middle school niece', 'child'],
      ['niece', 'child'],
      ['nephew', 'child'],
      ['Gaeun', 'the child'],
      ['family support', 'support matter'],
      ['power of attorney manipulation', 'document handling issue'],
      ['forged power of attorney', 'document handling issue'],
      ['proxy signature', 'document signature issue'],
      ['signed for someone else', 'handled a signature for someone else'],
      ['investment fraud', 'investment loss issue'],
      ['school supplies', 'supplies'],
      ['school notice', 'schedule notice'],
      ['total loss', 'full loss'],
    ],
    ja: [
      ['兄一家を支えた', 'その世帯を支えた'],
      ['子どもの学費', '子どもの費用'],
      ['他人の代わりに署名', '別人のための署名処理'],
      ['投資で全損', '投資で大きな損失'],
      ['中学生の姪', '子ども'],
      ['兄のオフィステル', 'そのオフィステル'],
      ['兄の借金', '家族の借金'],
      ['兄名義', '別名義'],
      ['兄に渡した', '家族に渡した'],
      ['兄へ送金', '家族へ送金'],
      ['実兄', '家族'],
      ['兄', '家族'],
      ['姪', '子ども'],
      ['甥', '子ども'],
      ['ガウン', 'その子'],
      ['家族支援', '支援の事情'],
      ['委任状偽造', '書類処理の経緯'],
      ['偽造委任状', '書類処理の経緯'],
      ['代理署名', '署名処理の経緯'],
      ['投資詐欺', '投資損失の経緯'],
      ['学用品', '用品'],
      ['学校通知', '予定通知'],
      ['全額損失', '大きな損失'],
    ],
    'zh-CN': [
      ['支援哥哥一家', '支援那个家庭'],
      ['哥哥的孩子', '孩子'],
      ['孩子的学费', '孩子的费用'],
      ['替别人签字', '为别人处理签字'],
      ['投资全损', '投资出现重大损失'],
      ['中学生侄女', '孩子'],
      ['哥哥的办公公寓', '那间办公公寓'],
      ['哥哥的债', '家人的债务'],
      ['哥哥名义', '他人名义'],
      ['转给哥哥', '转给家人'],
      ['汇给哥哥', '汇给家人'],
      ['亲哥哥', '家人'],
      ['哥哥', '家人'],
      ['侄女', '孩子'],
      ['侄子', '孩子'],
      ['佳恩', '那个孩子'],
      ['家人支援', '支援问题'],
      ['委托书造假', '文件处理经过'],
      ['伪造委托书', '文件处理经过'],
      ['代签', '签字处理经过'],
      ['投资诈骗', '投资损失经过'],
      ['学习用品', '用品'],
      ['学校通知', '日程通知'],
      ['全部亏损', '重大亏损'],
    ],
  },
  'family-01': {
    en: [
      ["Yoon Jung-hoo's hidden funding", 'funding from another source'],
      ["protect his brother's identity", 'protect a sensitive identity issue'],
      ["Yoon Jung-hoo's money", 'money from another source'],
      ["Jung-hoo's money", 'money from another source'],
      ["not his father's child", 'a sensitive identity matter'],
      ['not biologically his son', 'a sensitive identity matter'],
      ['not a biological child', 'a sensitive identity matter'],
      ['factory crisis 300 million', 'old factory crisis funding'],
      ['300 million won', 'a large sum'],
      ['reduced his own share', 'changed the share'],
      ["brother's identity", 'identity issue'],
      ['hidden parentage', 'old family matter'],
      ['separate bloodline', 'sensitive family matter'],
      ['not blood-related', 'sensitive identity matter'],
      ['changed inheritance ratio', 'changed ratio'],
      ['birth secret', 'old family matter'],
      ['half-brother', 'sensitive family matter'],
      ['half brother', 'sensitive family matter'],
      ['different bloodline', 'sensitive family matter'],
      ['different father', 'sensitive family matter'],
      ['old regular support', 'old support record'],
      ['management rights crisis', 'management crisis'],
      ['will manipulation', 'will-handling issue'],
      ['Jung-hoo 90', 'one side 90'],
      ['Taesung 10', 'the other side 10'],
      ['90 to 10', 'a different ratio'],
      ['90:10', 'a different ratio'],
    ],
    ja: [
      ['隠された親子関係', '古い家族事情'],
      ['血がつながっていない', '身元に関わる敏感な事情'],
      ['兄を守るため', '身元に関わる事情を守るため'],
      ['自分の取り分を減らした', '取り分を変えた'],
      ['兄のアイデンティティ', '身元に関わる事情'],
      ['出生の秘密', '古い家族事情'],
      ['血縁が違う', '話しづらい家の事情'],
      ['父の血ではない', '身元に関わる敏感な事情'],
      ['実子ではない', '身元に関わる敏感な事情'],
      ['尹正厚の金', '別の出所の金'],
      ['正厚の金', '別の出所の金'],
      ['工場危機の3億', '工場危機の大きな資金'],
      ['3億ウォン', '大きな金額'],
      ['相続比率変更', '比率の変更'],
      ['経営権危機', '経営上の危機'],
      ['遺書操作', '遺書処理の問題'],
      ['正厚90', '片方90'],
      ['泰成10', 'もう片方10'],
      ['90対10', '異なる比率'],
      ['90:10', '異なる比率'],
      ['別の血筋', '話しづらい家の事情'],
      ['異父', '話しづらい家の事情'],
      ['別の父', '話しづらい家の事情'],
      ['別資金', '別の資金'],
      ['古い定期支援', '古い支援記録'],
    ],
    'zh-CN': [
      ['隐藏的亲子关系', '陈年家庭隐情'],
      ['保护哥哥身份', '保护敏感身份问题'],
      ['不是父亲的血脉', '涉及身份的敏感情况'],
      ['尹正厚的钱', '另一来源的钱'],
      ['正厚的钱', '另一来源的钱'],
      ['工厂危机3亿', '工厂危机的一大笔资金'],
      ['3亿韩元', '一大笔钱'],
      ['减少自己的份额', '调整份额'],
      ['哥哥的身份', '身份问题'],
      ['出生秘密', '陈年家庭隐情'],
      ['同母异父', '难以启齿的家事'],
      ['血缘不同', '难以启齿的家事'],
      ['不是亲生子', '涉及身份的敏感情况'],
      ['另一个父亲', '难以启齿的家事'],
      ['长期定期支援', '长期支援记录'],
      ['经营权危机', '经营危机'],
      ['遗书造假', '遗书处理问题'],
      ['正厚90', '一方90'],
      ['泰成10', '另一方10'],
      ['90比10', '不同比例'],
      ['90:10', '不同比例'],
      ['不同血脉', '难以启齿的家事'],
      ['没有血缘', '涉及身份的敏感情况'],
      ['另一笔钱', '另一来源的钱'],
      ['继承比例变更', '比例变更'],
    ],
  },
  'friend-01': {
    en: [
      ['old breakup caused by A\'s father', 'old unresolved reason'],
      ['warning her about the old scam', 'warning her about the old money problem'],
      ['groom-to-be contacted first', 'order of contact'],
      ['not flirting but warning', 'the purpose of the contact'],
      ['fiancé approached first', 'order of contact'],
      ['fiance approached first', 'order of contact'],
      ['fiancé hit on her', 'the contact crossed a line'],
      ['fiance hit on her', 'the contact crossed a line'],
      ['fiancé crossed the line', 'the contact crossed a line'],
      ['fiance crossed the line', 'the contact crossed a line'],
      ['inappropriate messages', 'problematic messages'],
      ['Choi Sumin refused', 'the refusal'],
      ["father's fraud", 'past money problem'],
      ['father extorted money', 'past money problem'],
      ["A's father committed fraud", 'a past money problem'],
      ['investment fraud', 'past money problem'],
      ['unpaid debt', 'unresolved debt'],
      ['same pattern again', 'a similar pattern again'],
      ['same scam pattern', 'similar money pattern'],
      ['could not let it happen again', 'could not ignore it again'],
      ["B's warning intent", 'warning motive'],
      ['not seduction but warning', 'the purpose of the contact'],
      ['old cutoff reason', 'old unresolved reason'],
      ['B could not say it', 'B stayed silent'],
      ['B played the villain again', 'B took the blame again'],
      ['defamation', 'reputation harm'],
      ['father scammed', 'past money problem'],
    ],
    ja: [
      ['過去の絶交はAの父が原因', '昔の未解決の事情'],
      ['同じ詐欺の構図', '似た金銭問題の流れ'],
      ['婚約者からの連絡', '連絡の前後関係'],
      ['父親の金銭問題', '過去の金銭問題'],
      ['婚約者が言い寄った', '連絡が一線を越えた'],
      ['婚約者が近づいた', '連絡が一線を越えた'],
      ['婚約者が先に', '連絡の前後関係'],
      ['一線を越えたメッセージ', '問題のあるメッセージ'],
      ['チェ・スミンの拒絶', '拒絶の事実'],
      ['父の詐欺', '過去の金銭問題'],
      ['父が金を奪った', '過去の金銭問題'],
      ['Aの父が詐欺', '過去の金銭問題'],
      ['投資名目の詐欺', '過去の金銭問題'],
      ['未返済', '未解決の金銭問題'],
      ['同じパターン', '似た流れ'],
      ['また騙される', '同じことが起きる'],
      ['Bの警告意図', '警告の動機'],
      ['誘惑ではなく警告', '接触の目的'],
      ['警告目的', '警告の目的'],
      ['昔の絶交理由', '昔の未解決の事情'],
      ['口説きではない', '接触の目的'],
      ['Bは言えなかった', 'Bは沈黙した'],
      ['Bがまた悪役', 'Bがまた責めを負う'],
      ['名誉毀損', '評判への被害'],
    ],
    'zh-CN': [
      ['过去绝交是A父亲造成的', '过去未解开的原因'],
      ['未婚夫先联系', '联系先后'],
      ['父亲的钱问题', '过去的钱款问题'],
      ['准新郎勾搭', '联系越界'],
      ['准新郎接近', '联系越界'],
      ['准新郎先', '联系先后'],
      ['越界消息', '有问题的消息'],
      ['崔秀敏拒绝', '拒绝一事'],
      ['父亲诈骗', '过去的钱款问题'],
      ['父亲骗钱', '过去的钱款问题'],
      ['A的父亲诈骗', '过去的钱款问题'],
      ['投资名义诈骗', '过去的钱款问题'],
      ['未偿还', '未解决的钱款问题'],
      ['同样骗局', '类似的钱款模式'],
      ['同样模式', '类似模式'],
      ['不能再让她被骗', '不能再坐视不管'],
      ['B的警告意图', '警告动机'],
      ['不是勾引而是警告', '接触目的'],
      ['警告目的', '警告动机'],
      ['过去断交原因', '过去未解开的原因'],
      ['不是调情而是警告', '接触目的'],
      ['B没能说出口', 'B保持沉默'],
      ['B又当恶人', 'B再次承担责难'],
      ['名誉毁损', '名誉受损'],
    ],
  },
}

main()

function main() {
  const rows = readAllRows()
  const stats = {
    rows: rows.length,
    jsonUpdates: 0,
    messageUpdates: 0,
    witnessUpdates: 0,
    runtimeGenerated: 0,
    brandSanitizations: 0,
    disclosureSanitizations: 0,
    missingTargets: [],
  }

  applyJsonBackedRows(rows, stats)
  applyI18nMessages(rows, stats)
  applyWitnessOverlays(rows, stats)
  generateRuntimeText(rows, stats)
  sanitizeScriptLocaleDisclosure(stats)

  const reportPath = path.join(ROOT, 'docs/localization/non-dialogue-extract/phase3-apply-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(stats, null, 2) + '\n', 'utf8')

  console.log(`phase3 translation apply ok: ${rows.length} rows`)
  console.log(`json updates: ${stats.jsonUpdates}`)
  console.log(`message updates: ${stats.messageUpdates}`)
  console.log(`witness updates: ${stats.witnessUpdates}`)
  console.log(`runtime generated: ${stats.runtimeGenerated}`)
  console.log(`brand sanitizations: ${stats.brandSanitizations}`)
  console.log(`disclosure sanitizations: ${stats.disclosureSanitizations}`)
  console.log(`missing targets: ${stats.missingTargets.length}`)
  console.log(`report=${rel(reportPath)}`)
}

function readAllRows() {
  const files = fs.readdirSync(INPUT_DIR)
    .filter((file) => /_retranslated\.csv$/i.test(file))
    .sort()
  const byKey = new Map()
  for (const file of files) {
    const rows = parseCsv(fs.readFileSync(path.join(INPUT_DIR, file), 'utf8'))
    rows.forEach((row, rowIndex) => {
      byKey.set(rowKey(row), {
        ...row,
        __file: file,
        __row: rowIndex + 2,
      })
    })
  }
  return [...byKey.values()]
}

function rowKey(row) {
  return [row.category, row.source, row.case_id, row.key_path].join('|')
}

function applyJsonBackedRows(rows, stats) {
  const byFile = new Map()
  for (const row of rows) {
    const category = row.category
    if (![
      'case_surface_content',
      'judge_question_script',
      'non_party_scripted_text',
      'question_angle_catalog',
      'mediation_judge_line',
      'phase_dialogue_judge_choice',
    ].includes(category)) continue

    for (const locale of LOCALES) {
      const file = targetJsonFile(row, locale)
      if (!file) continue
      pushMapArray(byFile, file, { row, locale })
    }
  }

  for (const [file, items] of byFile) {
    const data = readJson(file)
    for (const item of items) {
      let value = normalizeCell(item.row[item.locale])
      if (!value) continue
      value = sanitizePublicBrandText(value, item.locale, stats)
      const ok = applyJsonValue(data, item.row, value)
      if (ok) stats.jsonUpdates += 1
      else stats.missingTargets.push({
        file: rel(file),
        category: item.row.category,
        case_id: item.row.case_id,
        key_path: item.row.key_path,
        locale: item.locale,
      })
    }
    writeJson(file, data)
  }
}

function targetJsonFile(row, locale) {
  if (!row.case_id) return null
  if (row.category === 'case_surface_content') {
    return path.join(ROOT, `src/data/cases/generated/${row.case_id}.${locale}.json`)
  }
  if (row.category === 'judge_question_script') {
    return path.join(ROOT, `src/data/scriptedAngles/${row.case_id}_judge_questions.${locale}.json`)
  }
  if (row.category === 'question_angle_catalog') {
    return path.join(ROOT, `src/data/scriptedAngles/${row.case_id}_angle_catalog.${locale}.json`)
  }
  if (row.category === 'non_party_scripted_text') {
    return path.join(ROOT, `src/data/scriptedText/${row.case_id}.${locale}.json`)
  }
  if (row.category === 'phase_dialogue_judge_choice') {
    return path.join(ROOT, `src/data/dialogues/phase1/${row.case_id}.${locale}.json`)
  }
  if (row.category === 'mediation_judge_line') {
    const bundle = ACTIVE_MEDIATION[row.case_id]
    return bundle ? path.join(ROOT, `src/data/dialogues/mediation/${bundle}.${locale}.json`) : null
  }
  return null
}

function applyJsonValue(data, row, value) {
  if (row.category === 'judge_question_script') return applyJudgeQuestionValue(data, row.key_path, value)
  if (row.category === 'phase_dialogue_judge_choice') return applyPhaseDialogueValue(data, row.key_path, value)
  return setPathValue(data, row.key_path, value)
}

function applyJudgeQuestionValue(data, keyPath, value) {
  const match = /^judgeQuestions\[[^\]]+\]\.variants\[([^\]]+)\]\.(text|behaviorHint)$/.exec(keyPath)
  if (!match) return setPathValue(data, keyPath, value)
  const [, variantId, field] = match
  for (const entry of data.judgeQuestions ?? []) {
    const variant = resolveArrayItem(entry.variants, variantId)
    if (!variant) continue
    variant[field] = value
    return true
  }
  return false
}

function applyPhaseDialogueValue(data, keyPath, value) {
  let match = /^dialogues\[([^\]]+)\]\.choice\[([^\]]+)\]\.text$/.exec(keyPath)
  if (match) {
    const entry = resolveBracket(data, 'dialogues', match[1])
      ?? findDialogueEntryByOption(data.dialogues, match[2])
    if (!entry) return false
    const options = Array.isArray(entry.options) ? entry.options : entry.choices
    const option = resolveArrayItem(options, match[2])
    if (!option) return false
    option.text = value
    return true
  }

  match = /^dialogues\[([^\]]+)\]\.[^.]+\.(text|behaviorHint)$/.exec(keyPath)
  if (match) {
    const entry = resolveBracket(data, 'dialogues', match[1])
    if (!entry) return false
    entry[match[2]] = value
    return true
  }

  return setPathValue(data, keyPath, value)
}

function findDialogueEntryByOption(dialogues, optionId) {
  if (!Array.isArray(dialogues)) return undefined
  return dialogues.find((entry) => {
    const options = Array.isArray(entry?.options) ? entry.options : entry?.choices
    return Boolean(resolveArrayItem(options, optionId))
  })
}

function setPathValue(root, keyPath, value) {
  const segments = parsePath(keyPath)
  if (segments.length === 0) return false
  let target = root
  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index]
    const next = segments[index + 1]
    target = resolveSegment(target, segment, next)
    if (target === undefined || target === null) return false
  }

  const last = segments[segments.length - 1]
  if (last.bracket !== null) {
    const child = resolveBracket(target, last.prop, last.bracket)
    if (typeof child !== 'string') return false
    const container = target[last.prop]
    if (Array.isArray(container)) {
      const item = resolveArrayItem(container, last.bracket)
      const index = container.indexOf(item)
      if (index < 0) return false
      container[index] = value
      return true
    }
    target[last.prop][last.bracket] = value
    return true
  }

  if (!target || typeof target !== 'object') return false
  target[last.prop] = value
  return true
}

function parsePath(keyPath) {
  const parts = []
  let current = ''
  let depth = 0
  for (const char of String(keyPath ?? '')) {
    if (char === '[') depth += 1
    if (char === ']') depth = Math.max(0, depth - 1)
    if (char === '.' && depth === 0) {
      if (current) parts.push(current)
      current = ''
      continue
    }
    current += char
  }
  if (current) parts.push(current)
  return parts.map((part) => {
    const match = /^([^\[]+)(?:\[([^\]]+)\])?$/.exec(part)
    if (!match) return { prop: part, bracket: null }
    return { prop: match[1], bracket: match[2] ?? null }
  })
}

function resolveSegment(target, segment, next) {
  if (!target || typeof target !== 'object') return undefined
  if (segment.bracket === null) {
    if (target[segment.prop] === undefined || target[segment.prop] === null) {
      target[segment.prop] = next?.bracket !== null && next?.bracket !== undefined ? [] : {}
    }
    return target[segment.prop]
  }
  const resolved = resolveBracket(target, segment.prop, segment.bracket)
  if (resolved) return resolved
  if (target[segment.prop] === undefined || target[segment.prop] === null) target[segment.prop] = []
  if (Array.isArray(target[segment.prop])) {
    const created = /^\d+$/.test(segment.bracket) ? {} : { id: segment.bracket }
    if (/^\d+$/.test(segment.bracket)) target[segment.prop][Number(segment.bracket)] = created
    else target[segment.prop].push(created)
    return created
  }
  target[segment.prop][segment.bracket] = {}
  return target[segment.prop][segment.bracket]
}

function resolveBracket(target, prop, selector) {
  if (!target || typeof target !== 'object') return undefined
  const value = target[prop]
  if (Array.isArray(value)) return resolveArrayItem(value, selector)
  if (value && typeof value === 'object') return value[selector]
  return undefined
}

function resolveArrayItem(array, selector) {
  if (!Array.isArray(array)) return undefined
  if (/^\d+$/.test(selector)) return array[Number(selector)]
  const found = array.find((item) => {
    if (!item || typeof item !== 'object') return false
    return ['id', 'key', 'disputeId', 'evidenceId', 'witnessId', 'angleId', 'choiceId'].some((key) => item[key] === selector)
  })
  if (found) return found
  return array.length === 1 ? array[0] : undefined
}

function applyI18nMessages(rows, stats) {
  const rowsByFile = new Map()
  for (const row of rows) {
    if (row.category !== 'ui_i18n_message') continue
    if (!/^src\/i18n\/messages\/.+\.ts$/.test(row.source)) continue
    pushMapArray(rowsByFile, path.join(ROOT, row.source), row)
  }

  for (const [file, fileRows] of rowsByFile) {
    const source = fs.readFileSync(file, 'utf8')
    const evaluated = evaluateConstObjects(file)
    const messagesEntry = Object.entries(evaluated).find(([name, value]) => name.endsWith('Messages') && isPlainObject(value))
    const constName = messagesEntry?.[0] ?? `${path.basename(file, '.ts')}Messages`
    const current = messagesEntry?.[1] ?? {}
    const next = {}

    const keys = orderedKeys(current.ko ?? {}, fileRows.map((row) => row.key_path))
    for (const locale of ALL_LOCALES) {
      next[locale] = {}
      for (const key of keys) {
        const row = fileRows.find((item) => item.key_path === key)
        const value = row ? normalizeCell(row[locale]) : normalizeCell(current[locale]?.[key])
        next[locale][key] = sanitizePublicBrandText(value, locale, stats)
      }
    }

    const typeName = extractMessageTypeName(source) ?? `${pascalCase(path.basename(file, '.ts'))}MessageKey`
    fs.writeFileSync(file, renderMessageFile(constName, typeName, next), 'utf8')
    stats.messageUpdates += fileRows.length * ALL_LOCALES.length
  }
}

function orderedKeys(currentKo, updateKeys) {
  const keys = []
  for (const key of Object.keys(currentKo)) keys.push(key)
  for (const key of updateKeys) {
    if (!keys.includes(key)) keys.push(key)
  }
  return keys
}

function renderMessageFile(constName, typeName, messages) {
  return [
    "import type { LocaleCode } from '../locales'",
    '',
    `export const ${constName} = {`,
    ...ALL_LOCALES.flatMap((locale) => renderObjectProperty(locale, messages[locale], 2)),
    `} as const satisfies Record<LocaleCode, Record<string, string>>`,
    '',
    `export type ${typeName} = keyof typeof ${constName}.ko`,
    '',
  ].join('\n')
}

function renderObjectProperty(key, value, indent) {
  const pad = ' '.repeat(indent)
  const lines = [`${pad}${quoteKey(key)}: {`]
  for (const [childKey, childValue] of Object.entries(value)) {
    lines.push(`${pad}  ${quoteKey(childKey)}: ${JSON.stringify(childValue)},`)
  }
  lines.push(`${pad}},`)
  return lines
}

function quoteKey(key) {
  return /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key)
}

function extractMessageTypeName(source) {
  const match = /export\s+type\s+(\w+)\s*=\s*keyof\s+typeof\s+\w+\.ko/.exec(source)
  return match?.[1] ?? null
}

function applyWitnessOverlays(rows, stats) {
  const witnessRows = rows.filter((row) => row.category === 'witness_testimony')
  const overlay = {}
  for (const row of witnessRows) {
    const match = /^witnessTestimony\[([^\]]+)\]\.([A-Za-z0-9_]+)$/.exec(row.key_path)
    if (!match) continue
    const [, slotId, field] = match
    const caseId = row.case_id
    for (const locale of LOCALES) {
      overlay[caseId] ??= {}
      overlay[caseId][locale] ??= {}
      overlay[caseId][locale][slotId] ??= {}
      overlay[caseId][locale][slotId][field] = sanitizePublicBrandText(normalizeCell(row[locale]), locale, stats)
      stats.witnessUpdates += 1
    }
  }

  const file = path.join(ROOT, 'src/data/witnessTestimonyData/localized.ts')
  fs.writeFileSync(file, renderWitnessFile(overlay), 'utf8')
}

function renderWitnessFile(overlay) {
  const lines = [
    "import type { LocaleCode } from '../../i18n/locales'",
    "import type { TestimonySlot } from '../../types/witnessTestimony'",
    "import { normalizeCaseKey } from '../../utils/caseHelpers'",
    '',
    "type TestimonyTextOverlay = Partial<Pick<TestimonySlot, 'topic' | 'question' | 'testimony' | 'behaviorHint'>>",
    'type LocaleTestimonyOverlay = Record<string, TestimonyTextOverlay>',
    "type CaseTestimonyOverlay = Partial<Record<Exclude<LocaleCode, 'ko'>, LocaleTestimonyOverlay>>",
    '',
  ]

  for (const caseId of Object.keys(WITNESS_CONSTS)) {
    lines.push(`const ${WITNESS_CONSTS[caseId]}: CaseTestimonyOverlay = ${renderTsObject(overlay[caseId] ?? {}, 0)}`)
    lines.push('')
  }

  lines.push('const TESTIMONY_OVERLAYS: Record<string, CaseTestimonyOverlay> = {')
  for (const [caseId, constName] of Object.entries(WITNESS_CONSTS)) {
    lines.push(`  ${JSON.stringify(caseId)}: ${constName},`)
  }
  lines.push('}')
  lines.push('')
  lines.push(`export function localizeWitnessTestimonySlots(
  caseId: string | undefined,
  slots: TestimonySlot[],
  locale: LocaleCode,
): TestimonySlot[] {
  if (locale === 'ko') return slots

  const caseKey = normalizeCaseKey(caseId ?? '')
  const overlay = TESTIMONY_OVERLAYS[caseKey]?.[locale]
  if (!overlay) return slots

  return slots.map((slot) => {
    const translated = overlay[slot.id]
    return translated ? { ...slot, ...translated } : slot
  })
}`)
  lines.push('')
  return lines.join('\n')
}

function generateRuntimeText(rows, stats) {
  const map = {}
  const runtimeRows = rows.filter((row) => {
    if (row.category === 'hardcoded_source_literal') return true
    return row.category === 'ui_i18n_message' && !row.source.startsWith('src/i18n/messages/')
  })

  for (const row of runtimeRows) {
    const ko = normalizeCell(row.ko)
    if (!ko || !/[\uAC00-\uD7A3]/.test(ko)) continue
    map[ko] = {
      en: sanitizePublicBrandText(normalizeCell(row.en), 'en', stats),
      ja: sanitizePublicBrandText(normalizeCell(row.ja), 'ja', stats),
      'zh-CN': sanitizePublicBrandText(normalizeCell(row['zh-CN']), 'zh-CN', stats),
    }
  }

  const file = path.join(ROOT, 'src/i18n/runtimeText.generated.ts')
  fs.writeFileSync(file, renderRuntimeTextGenerated(map), 'utf8')
  stats.runtimeGenerated = Object.keys(map).length
}

function renderRuntimeTextGenerated(map) {
  return [
    "import type { LocaleCode } from './locales.ts'",
    '',
    "type GeneratedRuntimeText = Record<Exclude<LocaleCode, 'ko'>, string>",
    '',
    'export const GENERATED_RUNTIME_TEXT: Record<string, GeneratedRuntimeText> = {',
    ...Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b, 'ko'))
      .map(([key, value]) => `  ${JSON.stringify(key)}: ${renderTsObject(value, 2)},`),
    '}',
    '',
  ].join('\n')
}

function sanitizeScriptLocaleDisclosure(stats) {
  for (const caseId of ACTIVE_CASES()) {
    for (const locale of LOCALES) {
      sanitizeScriptedTextFile(caseId, locale, stats)
      sanitizeAngleFile(caseId, locale, 'angle_catalog', stats)
      sanitizeAngleFile(caseId, locale, 'judge_questions', stats)
      sanitizeAngleFile(caseId, locale, 'interrogation_answers', stats)
      sanitizePhaseDialogueFile(caseId, locale, stats)
      sanitizeMediationFile(caseId, ACTIVE_MEDIATION[caseId], locale, stats)
    }
  }
}

function ACTIVE_CASES() {
  return Object.keys(ACTIVE_MEDIATION)
}

function sanitizeScriptedTextFile(caseId, locale, stats) {
  const file = path.join(ROOT, `src/data/scriptedText/${caseId}.${locale}.json`)
  if (!fs.existsSync(file)) return
  const data = readJson(file)
  let changed = false
  for (const channel of Object.values(data.channels ?? {})) {
    for (const entry of channel.entries ?? []) {
      for (const variant of entry.variants ?? []) {
        if (isTruthStageAllowed(entry.lieState ?? variant.lieState)) continue
        const nextText = sanitizeDisclosureText(variant.text, caseId, locale, stats)
        if (nextText !== variant.text) {
          variant.text = nextText
          changed = true
        }
      }
    }
  }
  if (changed) writeJson(file, data)
}

function sanitizeAngleFile(caseId, locale, suffix, stats) {
  const file = path.join(ROOT, `src/data/scriptedAngles/${caseId}_${suffix}.${locale}.json`)
  if (!fs.existsSync(file)) return
  const data = readJson(file)
  let changed = false

  if (suffix === 'angle_catalog') {
    for (const angle of data.angles ?? []) {
      for (const field of ['label', 'description']) {
        const nextText = sanitizeDisclosureText(angle[field], caseId, locale, stats)
        if (nextText !== angle[field]) {
          angle[field] = nextText
          changed = true
        }
      }
    }
  } else {
    const collection = suffix === 'judge_questions' ? data.judgeQuestions : data.answers
    for (const entry of collection ?? []) {
      for (const variant of entry.variants ?? []) {
        if (isTruthStageAllowed(entry.lieState ?? variant.lieState)) continue
        const nextText = sanitizeDisclosureText(variant.text, caseId, locale, stats)
        if (nextText !== variant.text) {
          variant.text = nextText
          changed = true
        }
      }
    }
  }

  if (changed) writeJson(file, data)
}

function sanitizePhaseDialogueFile(caseId, locale, stats) {
  const file = path.join(ROOT, `src/data/dialogues/phase1/${caseId}.${locale}.json`)
  if (!fs.existsSync(file)) return
  const data = readJson(file)
  let changed = false
  for (const dialogue of data.dialogues ?? []) {
    const nextDialogueText = sanitizeDisclosureText(dialogue.text, caseId, locale, stats)
    if (nextDialogueText !== dialogue.text) {
      dialogue.text = nextDialogueText
      changed = true
    }
    const options = Array.isArray(dialogue.options) ? dialogue.options : dialogue.choices
    for (const option of options ?? []) {
      const nextChoiceText = sanitizeDisclosureText(option.text, caseId, locale, stats)
      if (nextChoiceText !== option.text) {
        option.text = nextChoiceText
        changed = true
      }
    }
  }
  if (changed) writeJson(file, data)
}

function sanitizeMediationFile(caseId, mediationId, locale, stats) {
  if (!mediationId) return
  const file = path.join(ROOT, `src/data/dialogues/mediation/${mediationId}.${locale}.json`)
  if (!fs.existsSync(file)) return
  const data = readJson(file)
  let changed = false
  for (const pathValue of Object.values(data.paths ?? {})) {
    const nextJudgeText = sanitizeDisclosureText(pathValue.judge, caseId, locale, stats)
    if (nextJudgeText !== pathValue.judge) {
      pathValue.judge = nextJudgeText
      changed = true
    }
    for (const dialogue of pathValue.dialogues ?? []) {
      const nextDialogueText = sanitizeDisclosureText(dialogue.text, caseId, locale, stats)
      if (nextDialogueText !== dialogue.text) {
        dialogue.text = nextDialogueText
        changed = true
      }
    }
  }
  if (changed) writeJson(file, data)
}

function sanitizeDisclosureText(value, caseId, locale, stats) {
  if (typeof value !== 'string' || value === '') return value
  return applyReplacementList(value, disclosureReplacements(caseId, locale), locale, stats, 'disclosureSanitizations')
}

function sanitizePublicBrandText(value, locale, stats) {
  if (typeof value !== 'string' || value === '') return value
  return applyReplacementList(value, BRAND_REPLACEMENTS[locale] ?? [], locale, stats, 'brandSanitizations')
}

function disclosureReplacements(caseId, locale) {
  return DISCLOSURE_REPLACEMENTS[caseId]?.[locale] ?? []
}

function applyReplacementList(value, replacements, locale, stats, statKey) {
  let next = value
  const ordered = [...replacements].sort((a, b) => b[0].length - a[0].length)
  for (const [from, to] of ordered) {
    if (!from) continue
    if (locale === 'en') {
      const pattern = new RegExp(escapeRegExp(from), 'gi')
      next = next.replace(pattern, () => to)
    } else {
      next = next.split(from).join(to)
    }
  }
  if (next !== value && stats?.[statKey] !== undefined) stats[statKey] += 1
  return next
}

function isTruthStageAllowed(value) {
  return value === 'S5' || value === 's5'
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function renderTsObject(value, indent) {
  if (typeof value === 'string') return JSON.stringify(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    const pad = ' '.repeat(indent)
    const childPad = ' '.repeat(indent + 2)
    return `[\n${value.map((item) => `${childPad}${renderTsObject(item, indent + 2)},`).join('\n')}\n${pad}]`
  }
  if (isPlainObject(value)) {
    const entries = Object.entries(value)
    if (entries.length === 0) return '{}'
    const pad = ' '.repeat(indent)
    const childPad = ' '.repeat(indent + 2)
    return `{\n${entries.map(([key, child]) => `${childPad}${quoteKey(key)}: ${renderTsObject(child, indent + 2)},`).join('\n')}\n${pad}}`
  }
  return JSON.stringify(value)
}

function evaluateConstObjects(file) {
  const source = fs.readFileSync(file, 'utf8')
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const result = {}
  const identifiers = {}

  walk(sourceFile, (node) => {
    if (!ts.isVariableDeclaration(node) || !node.initializer || !ts.isIdentifier(node.name)) return
    const value = evaluateExpression(node.initializer, identifiers)
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
  if (ts.isIdentifier(node)) return identifiers[node.text]
  if (ts.isArrayLiteralExpression(node)) return node.elements.map((element) => evaluateExpression(element, identifiers))
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

function parseCsv(text) {
  const matrix = []
  let row = []
  let cell = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    const next = text[index + 1]
    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"'
        index += 1
      } else if (char === '"') {
        quoted = false
      } else {
        cell += char
      }
      continue
    }

    if (char === '"') quoted = true
    else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n') {
      row.push(cell)
      if (row.some((value) => value !== '')) matrix.push(row)
      row = []
      cell = ''
    } else if (char !== '\r') {
      cell += char
    }
  }

  if (cell || row.length) {
    row.push(cell)
    if (row.some((value) => value !== '')) matrix.push(row)
  }

  const headers = matrix.shift() ?? []
  return matrix.map((values) => {
    const object = {}
    headers.forEach((header, index) => {
      object[header] = values[index] ?? ''
    })
    return object
  })
}

function readJson(file) {
  if (!fs.existsSync(file)) throw new Error(`Missing target JSON: ${rel(file)}`)
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

function pushMapArray(map, key, value) {
  const list = map.get(key) ?? []
  list.push(value)
  map.set(key, list)
}

function normalizeCell(value) {
  if (value === undefined || value === null) return ''
  return String(value).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
}

function pascalCase(value) {
  return value
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join('')
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/')
}
