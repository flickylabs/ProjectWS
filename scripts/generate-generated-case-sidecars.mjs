import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import {
  GENERATED_CASE_IDS,
  GENERATED_CASE_LOCALES,
  hasHangul,
  shouldTranslateGeneratedCaseString,
} from './generated-case-locale-rules.mjs'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const GENERATED_DIR = path.join(ROOT_DIR, 'src', 'data', 'cases', 'generated')
const CACHE_PATH = path.join(ROOT_DIR, 'tmp', 'generated-case-sidecar-translation-cache.json')
const GLOSSARY_PATH = path.join(ROOT_DIR, 'docs', 'localization', 'glossary.csv')
const DEEP_TRANSLATOR_HELPER = path.join(ROOT_DIR, 'scripts', 'translate-batch-deep-translator.py')
const OVERLAY_KIND = 'generatedCaseSurface'
const OVERLAY_SCOPE = 'full'
const BATCH_MAX_ITEMS = 16
const BATCH_MAX_CHARS = 1800
const REQUEST_DELAY_MS = 550
const googleDisabledTargets = new Set()

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
  const cache = await loadJson(CACHE_PATH, {})
  const glossary = await loadGlossary()

  for (const locale of GENERATED_CASE_LOCALES) {
    const uniqueStrings = new Set()
    const baseCases = []

    for (const caseId of GENERATED_CASE_IDS) {
      const base = await readCaseJson(`${caseId}.json`)
      baseCases.push([caseId, base])
      collectTranslatableStrings(base, [], uniqueStrings)
      for (const category of Object.keys(base.solutions ?? {})) {
        if (hasHangul(category)) uniqueStrings.add(category)
      }
    }

    const pending = [...uniqueStrings].filter((text) => {
      const exact = getGlossaryExact(glossary, text, locale.code)
      return exact == null && cache[cacheKey(locale.code, text)] == null
    })

    console.log(`[case-sidecars] ${locale.code}: ${uniqueStrings.size} strings, ${pending.length} new translations`)
    await translatePendingStrings(locale, pending, cache)
    await saveJson(CACHE_PATH, cache)

    for (const [caseId, base] of baseCases) {
      const existing = await loadJson(path.join(GENERATED_DIR, `${caseId}.${locale.code}.json`), {})
      const overlay = buildOverlay(base, [], locale.code, cache, glossary) ?? {}
      overlay.caseId = caseId
      overlay.locale = locale.code
      overlay.overlayKind = OVERLAY_KIND
      overlay.overlayScope = OVERLAY_SCOPE
      overlay.solutionCategoryLabels = buildSolutionCategoryLabels(base, locale.code, cache, glossary)
      const existingIsGeneratedFull = existing.overlayScope === OVERLAY_SCOPE || existing.overlayKind === 'generated-case-full-overlay-v1'
      if (!existingIsGeneratedFull) mergeExistingOverlay(overlay, existing)
      overlay.caseId = caseId
      overlay.locale = locale.code
      overlay.overlayKind = OVERLAY_KIND
      overlay.overlayScope = OVERLAY_SCOPE

      const outputPath = path.join(GENERATED_DIR, `${caseId}.${locale.code}.json`)
      await fs.writeFile(outputPath, `${JSON.stringify(orderOverlayRoot(overlay), null, 2)}\n`, 'utf8')
      console.log(`[case-sidecars] wrote ${path.relative(ROOT_DIR, outputPath)}`)
    }
  }

  await saveJson(CACHE_PATH, cache)
}

function collectTranslatableStrings(value, pathParts, output) {
  if (typeof value === 'string') {
    if (shouldTranslateGeneratedCaseString(pathParts, value)) output.add(value)
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectTranslatableStrings(item, [...pathParts, index], output))
    return
  }
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    collectTranslatableStrings(child, [...pathParts, key], output)
  }
}

function buildOverlay(value, pathParts, localeCode, cache, glossary) {
  if (typeof value === 'string') {
    if (!shouldTranslateGeneratedCaseString(pathParts, value)) return undefined
    return resolveTranslation(value, localeCode, cache, glossary)
  }

  if (Array.isArray(value)) {
    const objectItemsHaveIds = value.every((item) => item && typeof item === 'object' && !Array.isArray(item) && typeof item.id === 'string')
    if (objectItemsHaveIds) {
      const localizedItems = []
      for (const item of value) {
        const localized = buildOverlayObject(item, pathParts, localeCode, cache, glossary)
        if (localized && Object.keys(localized).some((key) => key !== 'id')) localizedItems.push({ id: item.id, ...localized })
      }
      return localizedItems.length ? localizedItems : undefined
    }

    const localizedItems = value.map((item, index) => buildOverlay(item, [...pathParts, index], localeCode, cache, glossary))
    return localizedItems.some((item) => item !== undefined) ? localizedItems.map((item) => item ?? null) : undefined
  }

  if (!value || typeof value !== 'object') return undefined
  return buildOverlayObject(value, pathParts, localeCode, cache, glossary)
}

function buildOverlayObject(value, pathParts, localeCode, cache, glossary) {
  const result = {}
  for (const [key, child] of Object.entries(value)) {
    const localized = buildOverlay(child, [...pathParts, key], localeCode, cache, glossary)
    if (localized !== undefined) result[key] = localized
  }
  return Object.keys(result).length ? result : undefined
}

function buildSolutionCategoryLabels(base, localeCode, cache, glossary) {
  const labels = {}
  for (const category of Object.keys(base.solutions ?? {})) {
    labels[category] = hasHangul(category)
      ? resolveTranslation(category, localeCode, cache, glossary)
      : category
  }
  return labels
}

function resolveTranslation(text, localeCode, cache, glossary) {
  return getGlossaryExact(glossary, text, localeCode) ?? cache[cacheKey(localeCode, text)] ?? text
}

async function translatePendingStrings(locale, strings, cache) {
  const batches = makeBatches(strings)
  let done = 0
  for (const batch of batches) {
    const translations = await translateBatchWithFallback(batch, locale.googleTarget)
    for (let index = 0; index < batch.length; index += 1) {
      cache[cacheKey(locale.code, batch[index])] = normalizeTranslation(translations[index])
    }
    done += batch.length
    await saveJson(CACHE_PATH, cache)
    if (done % 64 < batch.length || done === strings.length) {
      console.log(`[case-sidecars] ${locale.code}: translated ${done}/${strings.length}`)
    }
    await sleep(REQUEST_DELAY_MS)
  }
}

async function translateBatchWithFallback(strings, targetLocale) {
  let translated
  try {
    translated = await translateBatch(strings, targetLocale)
  } catch (error) {
    if (strings.length === 1) throw error
    translated = []
    for (const text of strings) {
      translated.push(...await translateBatchWithFallback([text], targetLocale))
      await sleep(REQUEST_DELAY_MS)
    }
  }
  if (translated.length === strings.length) return translated

  const fallback = []
  for (const text of strings) {
    const one = await translateBatch([text], targetLocale)
    fallback.push(one[0] ?? text)
    await sleep(REQUEST_DELAY_MS)
  }
  return fallback
}

async function translateBatch(strings, targetLocale, attempt = 1) {
  if (!googleDisabledTargets.has(targetLocale)) {
    try {
      return await translateBatchGoogle(strings, targetLocale, attempt)
    } catch (error) {
      googleDisabledTargets.add(targetLocale)
      console.warn(`[case-sidecars] Google fallback for ${targetLocale}: ${error.message}`)
    }
  }

  try {
    return await translateBatchDeepTranslator(strings, targetLocale)
  } catch (error) {
    console.warn(`[case-sidecars] deep-translator fallback for ${targetLocale}: ${error.message}`)
    return translateBatchMyMemory(strings, targetLocale)
  }
}

async function translateBatchGoogle(strings, targetLocale, attempt = 1) {
  const endpoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=${encodeURIComponent(targetLocale)}&dt=t`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: new URLSearchParams({ q: strings.join('\n') }),
  })

  if (!response.ok) {
    if (response.status === 429) throw new Error(`Google Translate request failed: ${response.status} ${response.statusText}`)
    if (attempt < 8) {
      await sleep(600 * attempt)
      return translateBatchGoogle(strings, targetLocale, attempt + 1)
    }
    throw new Error(`Google Translate request failed: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()
  const flat = (json[0] ?? []).map((segment) => segment?.[0] ?? '').join('')
  const split = flat.split('\n')
  if (split.length === strings.length + 1 && split.at(-1) === '') split.pop()
  return split
}

async function translateBatchMyMemory(strings, targetLocale, attempt = 1) {
  const langPair = `ko|${targetLocale}`
  const endpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(strings.join('\n'))}&langpair=${encodeURIComponent(langPair)}`
  const response = await fetch(endpoint)
  if (!response.ok) {
    if (attempt < 4) {
      await sleep(1000 * attempt)
      return translateBatchMyMemory(strings, targetLocale, attempt + 1)
    }
    throw new Error(`MyMemory request failed: ${response.status} ${response.statusText}`)
  }
  const json = await response.json()
  const translatedText = json?.responseData?.translatedText
  if (typeof translatedText !== 'string') throw new Error('MyMemory returned no translatedText')
  const split = translatedText.replace(/\r/g, '').split('\n')
  if (split.length === strings.length + 1 && split.at(-1) === '') split.pop()
  return split
}

async function translateBatchDeepTranslator(strings, targetLocale) {
  const stdout = await runPythonJson(DEEP_TRANSLATOR_HELPER, [targetLocale], strings)
  const parsed = JSON.parse(stdout)
  if (!Array.isArray(parsed)) throw new Error('deep-translator returned a non-array response')
  return parsed.map((value, index) => String(value ?? strings[index] ?? ''))
}

function runPythonJson(scriptPath, args, payload) {
  return new Promise((resolve, reject) => {
    const child = spawn('python', [scriptPath, ...args], {
      cwd: ROOT_DIR,
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    let stdout = ''
    let stderr = ''
    const timer = setTimeout(() => {
      child.kill()
      reject(new Error('deep-translator helper timed out'))
    }, 120000)
    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')
    child.stdout.on('data', (chunk) => { stdout += chunk })
    child.stderr.on('data', (chunk) => { stderr += chunk })
    child.on('error', (error) => {
      clearTimeout(timer)
      reject(error)
    })
    child.on('close', (code) => {
      clearTimeout(timer)
      if (code === 0) resolve(stdout)
      else reject(new Error(stderr.trim() || `python exited with code ${code}`))
    })
    child.stdin.end(JSON.stringify(payload))
  })
}

function makeBatches(strings) {
  const batches = []
  let current = []
  let currentChars = 0
  for (const text of strings) {
    const nextChars = currentChars + text.length + 1
    if (current.length && (current.length >= BATCH_MAX_ITEMS || nextChars > BATCH_MAX_CHARS)) {
      batches.push(current)
      current = []
      currentChars = 0
    }
    current.push(text)
    currentChars += text.length + 1
  }
  if (current.length) batches.push(current)
  return batches
}

function normalizeTranslation(value) {
  return String(value ?? '').replace(/\r/g, '').trim()
}

function cacheKey(localeCode, text) {
  return `${localeCode}\u0000${text}`
}

function mergeExistingOverlay(target, source) {
  if (!source || typeof source !== 'object') return target
  for (const [key, sourceValue] of Object.entries(source)) {
    if (sourceValue == null) continue
    const targetValue = target[key]
    if (Array.isArray(sourceValue)) {
      target[key] = mergeOverlayArrays(Array.isArray(targetValue) ? targetValue : [], sourceValue)
    } else if (sourceValue && typeof sourceValue === 'object') {
      if (!targetValue || typeof targetValue !== 'object' || Array.isArray(targetValue)) target[key] = {}
      mergeExistingOverlay(target[key], sourceValue)
    } else {
      target[key] = sourceValue
    }
  }
  return target
}

function mergeOverlayArrays(target, source) {
  if (source.every((item) => item && typeof item === 'object' && !Array.isArray(item) && typeof item.id === 'string')) {
    const merged = [...target]
    const byId = new Map(merged.map((item, index) => [item?.id, index]))
    for (const sourceItem of source) {
      const index = byId.get(sourceItem.id)
      if (index == null) merged.push(sourceItem)
      else merged[index] = mergeExistingOverlay({ ...(merged[index] ?? {}) }, sourceItem)
    }
    return merged
  }

  const merged = [...target]
  for (let index = 0; index < source.length; index += 1) {
    const sourceItem = source[index]
    if (sourceItem == null) continue
    if (Array.isArray(sourceItem)) merged[index] = mergeOverlayArrays(Array.isArray(merged[index]) ? merged[index] : [], sourceItem)
    else if (sourceItem && typeof sourceItem === 'object') merged[index] = mergeExistingOverlay({ ...(merged[index] ?? {}) }, sourceItem)
    else merged[index] = sourceItem
  }
  return merged
}

function orderOverlayRoot(overlay) {
  const { caseId, locale, overlayKind, overlayScope, ...rest } = overlay
  return { caseId, locale, overlayKind, overlayScope, ...rest }
}

async function loadGlossary() {
  try {
    const text = await fs.readFile(GLOSSARY_PATH, 'utf8')
    const rows = parseCsv(text)
    const headers = rows.shift() ?? []
    const indexes = Object.fromEntries(headers.map((header, index) => [header, index]))
    const glossary = new Map()
    for (const row of rows) {
      const source = row[indexes.ko]
      if (!source) continue
      glossary.set(source, {
        en: row[indexes.en],
        ja: row[indexes.ja],
        'zh-CN': row[indexes['zh-CN']],
      })
    }
    return glossary
  } catch {
    return new Map()
  }
}

function getGlossaryExact(glossary, text, localeCode) {
  const value = glossary.get(text)?.[localeCode]
  return value && !hasHangul(value) ? value : null
}

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        field += '"'
        index += 1
      } else if (char === '"') {
        quoted = false
      } else {
        field += char
      }
    } else if (char === '"') {
      quoted = true
    } else if (char === ',') {
      row.push(field)
      field = ''
    } else if (char === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (char !== '\r') {
      field += char
    }
  }
  if (field || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

async function readCaseJson(fileName) {
  return loadJson(path.join(GENERATED_DIR, fileName))
}

async function loadJson(filePath, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch (error) {
    if (fallback !== null && error?.code === 'ENOENT') return fallback
    throw error
  }
}

async function saveJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
